import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import CTABanner from "../components/shared/CTABanner";

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "What is RE Jones Global Housing?",
        a: "RE Jones Global Housing provides structured, supportive housing for individuals working to rebuild their lives after periods of instability. We offer transitional housing, housing stabilization support, and structured living environments designed to help residents regain footing and move toward long-term independence.",
      },
      {
        q: "Is RE Jones Global Housing a shelter?",
        a: "No. Our housing is not emergency shelter. We provide transitional and stabilization housing for individuals who are actively working toward self-sufficiency. Our residents are in a structured environment with expectations for participation, accountability, and progress toward their goals.",
      },
      {
        q: "Where is RE Jones Global Housing located?",
        a: "We operate housing properties in the communities we serve. For specific location information related to your inquiry, please contact us directly through our Contact page or Housing Inquiry form.",
      },
    ],
  },
  {
    category: "Eligibility & Applications",
    items: [
      {
        q: "Who can apply for housing?",
        a: "Our housing is available to individuals who meet our intake criteria, including those who are justice-impacted, rebuilding after homelessness or instability, and those referred through approved community organizations. We assess every inquiry individually based on need, readiness, and program fit.",
      },
      {
        q: "Is housing guaranteed if I submit an inquiry?",
        a: "No. Submitting a housing inquiry does not guarantee placement. All inquiries are reviewed internally, and placement decisions are based on individual circumstances, program fit, and current housing availability.",
      },
      {
        q: "What documents might I need?",
        a: "Documentation requirements vary, but you may be asked to provide identification, proof of referral source, any relevant court or program documentation, and emergency contact information. Our team will advise you on specific requirements during the review process.",
      },
    ],
  },
  {
    category: "Referrals",
    items: [
      {
        q: "How do referrals work?",
        a: "Referrals can be submitted by individuals, case managers, parole/probation officers, social workers, and community organizations through our Housing Inquiry form. Every referral is reviewed by our team, and we follow up directly with the referring party and the individual.",
      },
      {
        q: "How long does the review process take?",
        a: "The initial review typically takes 3–7 business days. More complex cases or periods of high volume may take longer. We communicate clearly throughout the process and keep referring organizations informed as appropriate.",
      },
      {
        q: "Can anyone refer someone for housing?",
        a: "Yes, referrals can come from approved organizations, community partners, or individuals themselves. However, referrals from established partner organizations may receive additional context that supports the review process.",
      },
    ],
  },
  {
    category: "After Submission",
    items: [
      {
        q: "What happens after I submit a housing inquiry?",
        a: "After submission, our team reviews your inquiry. If it meets initial criteria, we'll contact you to schedule an assessment or request additional information. If housing is not available or the fit is not appropriate, we'll communicate that clearly and, where possible, provide alternative resource information.",
      },
      {
        q: "How will I be contacted?",
        a: "We will contact you using the information you provide in your inquiry — typically by email or phone. Make sure the contact information you submit is accurate and up to date.",
      },
      {
        q: "What if I'm not approved for placement?",
        a: "If your inquiry does not result in placement, we will notify you of the decision. Where possible, we may suggest alternative resources or programs that may better fit your current needs.",
      },
    ],
  },
  {
    category: "Partnerships",
    items: [
      {
        q: "How can my organization become a referral partner?",
        a: "Organizations interested in partnering with RE Jones Global Housing can complete our Partner Interest Form on the Partners page. Our team will follow up to discuss partnership details, referral processes, and communication expectations.",
      },
      {
        q: "What types of organizations can partner with you?",
        a: "We work with nonprofits, government agencies, parole and probation offices, reentry organizations, healthcare providers, faith-based organizations, and other community agencies that serve populations who may benefit from structured housing.",
      },
      {
        q: "Do you provide status updates on referrals?",
        a: "Yes. We maintain open communication with our referral partners and provide appropriate status updates throughout the review and placement process, while respecting individual privacy.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        description="Find answers to common questions about RE Jones Global Housing, our services, the referral process, and how to get started."
      />

      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqs.map((section) => (
          <div key={section.category} className="mb-12 last:mb-0">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 pb-3 border-b border-border">
              {section.category}
            </h3>
            <Accordion type="multiple" className="space-y-3">
              {section.items.map((faq, i) => (
                <AccordionItem key={i} value={`${section.category}-${i}`} className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-accent/30">
                  <AccordionTrigger className="text-left font-heading font-semibold text-base text-foreground py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="text-center mt-12 pt-8 border-t border-border">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Still Have Questions?</h4>
          <p className="text-muted-foreground mb-6">We're here to help. Reach out to our team and we'll get back to you.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="outline" className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
                Submit a Housing Inquiry <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}