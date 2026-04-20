import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SYSTEM_PROMPT = `You are an AI Assistant for RE Jones Global Housing, a nonprofit providing structured housing for individuals rebuilding their lives. You are helpful, professional, and focused on partner organizations.

Your knowledge base includes:
- Housing program descriptions (Transitional Housing, Housing Stabilization Support, Structured Living Environment)
- Referral process (inquiry submission, internal review, assessment/interview, placement decision)
- Partner eligibility and partnership benefits
- Contact information and partner application process
- Frequently asked questions about services

RULES:
1. Only answer questions about RE Jones Global Housing, referral processes, housing programs, partnership, and eligibility
2. Do not provide medical, legal, or mental health advice
3. Direct users to contact the organization directly for specific cases or accommodations
4. Be warm, professional, and dignity-centered in tone
5. Keep responses concise and actionable
6. If asked about unrelated topics, politely redirect to RE Jones Global Housing services

If you don't know an answer or it's outside your scope, say: "I don't have that information. Please contact us directly at [suggest contact form link]."`;

const HOUSING_CONTEXT = `
RE JONES GLOBAL HOUSING - PARTNER INFORMATION

PROGRAMS:
1. Transitional Housing - Up to 18-24 months of structured housing for individuals in transition
2. Housing Stabilization Support - Medium-term support for those establishing housing stability
3. Structured Living Environment - Longer-term supportive housing with ongoing community connection

REFERRAL PROCESS:
Step 1: Inquiry/Referral - Submit through our online form or contact us
Step 2: Internal Review - We evaluate need, fit, and availability
Step 3: Assessment & Interview - Qualified applicants meet with our team
Step 4: Placement Decision - Based on fit, readiness, and housing availability

PARTNER ELIGIBILITY:
- Nonprofits, government agencies, reentry organizations
- Parole/probation departments, healthcare providers, faith-based organizations
- Must have active referral relationships and shared mission values

AVAILABLE HOUSING MODELS:
- Per-bed placements (individual rooms with structured support)
- Turnkey programs (full program implementation with our staff support)
- Flexible terms based on organizational needs

CONTACT:
Phone: Available during business hours
Email: Through our contact form
Apply to partner: Submit partnership inquiry form on our website
`;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: `${SYSTEM_PROMPT}\n\nCONTEXT:\n${HOUSING_CONTEXT}`,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || 'API error' },
        { status: response.status }
      );
    }

    const assistantMessage = data.content[0]?.text || '';
    return Response.json({ message: assistantMessage });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});