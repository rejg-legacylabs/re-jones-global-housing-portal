# Lead Forwarding Deploy Notes (re-jones-global-housing-portal)

This website forwards every captured lead (HousingInquiry, ContactSubmission,
PartnerInquiry) to the **legacy-properties** Base44 ops app so housing
operations can act on every inquiry from a single inbox.

## Required env vars

Set these in the Base44 dashboard for this app (Settings -> Environment):

| Name | Value |
| --- | --- |
| `HOUSING_OPS_BASE_URL` | Functions base URL of the legacy-properties app, e.g. `https://app.base44.com/apps/<ops-app-id>` |
| `HOUSING_WEBSITE_OUTBOUND_SECRET` | Long random string. Must match the value the ops app reads as `HOUSING_WEBSITE_INBOUND_SECRET` to validate `x-housing-website-secret`. |

Generate the secret with e.g. `openssl rand -hex 32` and store it in 1Password
before pasting into both apps' env config.

## Functions

- `forwardLeadToOps` — invoked by the page submit handlers (`Apply`,
  `Contact`, `Partners`) immediately after the entity is created. POSTs to
  `${HOUSING_OPS_BASE_URL}/functions/receiveExternalReferral` with header
  `x-housing-website-secret: <secret>`. On failure, enqueues the payload to
  `OutboundLeadQueue` and writes an `AuditLog` entry.
- `retryFailedLeadForwards` — scheduled every 5 minutes; drains
  `OutboundLeadQueue` with exponential backoff (1m, 2m, 4m, ... up to 8
  attempts).

## Entities added

- `OutboundLeadQueue` — failed-forward retry queue.
- `AuditLog` — append-only audit trail for all forward attempts.

## Deploy steps

1. Merge this PR.
2. Add both env vars in the Base44 dashboard.
3. In the Base44 dashboard -> Functions -> `retryFailedLeadForwards`, set a
   schedule of `*/5 * * * *` (every 5 minutes).
4. Deploy. Base44 will pick up the new entities on next publish.

## Smoke test

1. Submit a fake `Contact` form on the live site.
2. Confirm a `ContactSubmission` row was created (existing behavior).
3. Confirm an `AuditLog` row with `action_type=lead_forward_success` exists.
4. Confirm the lead appears in the legacy-properties ops app inbox.
5. Negative test: temporarily rotate `HOUSING_WEBSITE_OUTBOUND_SECRET` on the
   website only. Resubmit. You should see an `OutboundLeadQueue` row with
   `status=pending`. Restore the secret; within 5 minutes the queue row
   should flip to `status=succeeded`.

## Cross-app dependency — ACTION REQUIRED ON OPS APP

The ops app (`legacy-properties`) does NOT currently have a
`receiveExternalReferral` server function. A separate PR against
`legacy-properties` is required to add it. That handler must:

- Validate the `x-housing-website-secret` header against its own
  `HOUSING_WEBSITE_INBOUND_SECRET` env var.
- Dedupe by `idempotency_key` (also passed as `x-idempotency-key` header).
- Persist the lead into the ops app's referral / inquiry entity.
- Return 2xx on success.

Until that handler is in place, leads will queue in `OutboundLeadQueue` with
`status=pending` and retry on the schedule.
