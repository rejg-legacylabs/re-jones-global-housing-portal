// forwardLeadToOps
// Server function called from page submit handlers RIGHT AFTER a lead-capture
// entity (HousingInquiry, ContactSubmission, PartnerInquiry) is created.
//
// It builds the payload expected by the legacy-properties ops app's
// `receiveExternalReferral` inbound function, POSTs it with the shared-secret
// header, and:
//   - on success: writes an AuditLog success row
//   - on failure: writes the payload to OutboundLeadQueue for retry AND
//                 writes an AuditLog failure row
//
// Required env vars (set in Base44 dashboard):
//   HOUSING_OPS_BASE_URL              e.g. https://app.base44.com/apps/<ops-app-id>
//   HOUSING_WEBSITE_OUTBOUND_SECRET   shared secret with the ops app

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.27';

type Source = 'Apply' | 'Contact' | 'Partners';
type EntityType = 'HousingInquiry' | 'ContactSubmission' | 'PartnerInquiry';

const SOURCE_TO_ENTITY: Record<Source, EntityType> = {
  Apply: 'HousingInquiry',
  Contact: 'ContactSubmission',
  Partners: 'PartnerInquiry',
};

interface ForwardRequest {
  source: Source;
  record_id: string;
  fields: Record<string, unknown>;
  // Optional: when called from retry job, reuse the original idempotency key
  idempotency_key?: string;
}

function buildOpsPayload(
  entityType: EntityType,
  recordId: string,
  fields: Record<string, unknown>,
  idempotencyKey: string,
) {
  // Map website fields -> ops app `receiveExternalReferral` shape.
  // Ops app expects:
  //   { referral_type, source_record_id, source_app, idempotency_key, contact: {...}, details: {...} }
  const f = fields as Record<string, string | boolean | undefined>;

  const base = {
    source_app: 're-jones-global-housing-portal',
    source_record_id: recordId,
    source_entity: entityType,
    idempotency_key: idempotencyKey,
    submitted_at: new Date().toISOString(),
  };

  if (entityType === 'HousingInquiry') {
    return {
      ...base,
      referral_type: 'housing_inquiry',
      contact: {
        name: f.full_name,
        email: f.email,
        phone: f.phone,
      },
      organization: {
        name: f.organization_name,
        contact: f.organization_contact,
        phone: f.organization_phone,
      },
      details: {
        inquiry_type: f.inquiry_type,
        current_housing_situation: f.current_housing_situation,
        referral_source: f.referral_source,
        program_interest: f.program_interest,
        summary_of_need: f.summary_of_need,
        consent_to_contact: f.consent_to_contact,
      },
    };
  }

  if (entityType === 'PartnerInquiry') {
    return {
      ...base,
      referral_type: 'partner_inquiry',
      contact: {
        name: f.contact_name,
        email: f.email,
        phone: f.phone,
      },
      organization: {
        name: f.organization_name,
        type: f.organization_type,
      },
      details: {
        partnership_interest: f.partnership_interest,
        referral_volume_estimate: f.referral_volume_estimate,
        message: f.message,
      },
    };
  }

  // ContactSubmission
  return {
    ...base,
    referral_type: 'contact_submission',
    contact: {
      name: f.name,
      email: f.email,
      phone: f.phone,
    },
    details: {
      inquiry_category: f.inquiry_category,
      message: f.message,
    },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const base44 = createClientFromRequest(req);

  let body: ForwardRequest;
  try {
    body = (await req.json()) as ForwardRequest;
  } catch (_e) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const entityType = SOURCE_TO_ENTITY[body.source];
  if (!entityType || !body.record_id || !body.fields) {
    return Response.json(
      { error: 'Missing source, record_id, or fields' },
      { status: 400 },
    );
  }

  const baseUrl = Deno.env.get('HOUSING_OPS_BASE_URL');
  const secret = Deno.env.get('HOUSING_WEBSITE_OUTBOUND_SECRET');
  if (!baseUrl || !secret) {
    return Response.json(
      { error: 'HOUSING_OPS_BASE_URL and HOUSING_WEBSITE_OUTBOUND_SECRET must be set' },
      { status: 500 },
    );
  }

  const idempotencyKey = body.idempotency_key ?? crypto.randomUUID();
  const payload = buildOpsPayload(entityType, body.record_id, body.fields, idempotencyKey);
  const targetApp = 'legacy-properties';
  const url = `${baseUrl.replace(/\/$/, '')}/functions/receiveExternalReferral`;

  const startedAt = Date.now();
  let httpStatus: number | undefined;
  let lastError: string | undefined;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-housing-website-secret': secret,
        'x-idempotency-key': idempotencyKey,
      },
      body: JSON.stringify(payload),
    });
    httpStatus = res.status;

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      lastError = `HTTP ${res.status}: ${text.slice(0, 500)}`;
      throw new Error(lastError);
    }

    await base44.entities.AuditLog.create({
      action_type: 'lead_forward_success',
      entity_type: entityType,
      entity_id: body.record_id,
      target_app: targetApp,
      success: true,
      latency_ms: Date.now() - startedAt,
      idempotency_key: idempotencyKey,
      http_status: httpStatus,
    });

    return Response.json({ ok: true, idempotency_key: idempotencyKey });
  } catch (err) {
    lastError = lastError ?? (err instanceof Error ? err.message : String(err));

    // Queue for retry
    try {
      await base44.entities.OutboundLeadQueue.create({
        source_lead_entity_type: entityType,
        source_lead_entity_id: body.record_id,
        target_app: targetApp,
        payload,
        status: 'pending',
        attempts: 1,
        last_error: lastError,
        idempotency_key: idempotencyKey,
        next_attempt_at: new Date(Date.now() + 60_000).toISOString(),
      });
    } catch (queueErr) {
      console.error('Failed to enqueue retry:', queueErr);
    }

    await base44.entities.AuditLog.create({
      action_type: 'lead_forward_failure',
      entity_type: entityType,
      entity_id: body.record_id,
      target_app: targetApp,
      success: false,
      error: lastError,
      latency_ms: Date.now() - startedAt,
      idempotency_key: idempotencyKey,
      http_status: httpStatus,
    });

    // Return 202: lead was captured locally and queued for retry — don't surface
    // a hard failure to the visitor. Ops will pick it up via retry job.
    return Response.json(
      { ok: false, queued: true, idempotency_key: idempotencyKey, error: lastError },
      { status: 202 },
    );
  }
});
