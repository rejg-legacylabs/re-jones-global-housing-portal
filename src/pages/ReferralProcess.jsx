import { ArrowRight, FileText, Search, UserCheck, Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Submission",
    description: "A referring organization or individual submits a housing inquiry or referral. This can be done through our online inquiry form or by contacting our team directly. The submission should include basic information about the individual, their current situation, and the referring organization (if applicable).",
  },
  {
    icon: Search,
    step: "02",
    title: "Internal Review",
    description: "Our housing team reviews every submission. We evaluate the individual's needs, circumstances, and readiness for structured housing. We also assess current housing availability and program fit. This review typically takes 3–7 business days.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Assessment & Interview",
    description: "If the initial review indicates a potential fit, we invite the individual for a suitability assessment and interview. This is an opportunity for both the applicant and our team to discuss expectations, goals, and the structure of our housing program.",
  },
  {
    icon: Home,
    step: "04",
    title: "Placement Decision",
    description: "Based on the review and assessment, our team makes a placement decision. If approved, we coordinate move-in logistics, orientation to the housing community, and initial check-in scheduling. If not approved, we communicate this clearly and, where possible, provide alternative resource information.",
  },
];

const referralChecklist = [
  "Individual's full name and contact information",
  "Current housing situation and immediate needs",
  "Referral source and organization details",
  "Relevant background information (criminal justice involvement, recovery status, etc.)",
  "Any current case management or program participation",
  "Reason for housing referral and goals",
  "Emergency contact information",
];

export default function ReferralProcess() {
  return (
    <div>
      <PageHero
        title="Referral Process"
        description="We accept housing referrals from approved community organizations, social service agencies, and through individual inquiries. Every referral is reviewed carefully to ensure the right fit for both the individual and our housing community."
      />

      {/* How Referrals Work */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="The Process"
          title="The Path to Stability"
          description="Our referral and placement process is designed to be clear, fair, and thorough. Here's how it works from start to finish."
        />
        <div className="max-w-4xl mx-auto mt-10">
          {steps.map((item, i) => (
            <div key={item.step} className="flex gap-6 lg:gap-8 mb-10 last:mb-0">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-3" />
                )}
              </div>
              <div className="pb-6">
                <span className="text-xs font-body font-semibold tracking-widest uppercase text-accent mb-1 block">Step {item.step}</span>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Include */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionHeading
                label="What to Include"
                title="Referral Checklist"
                description="Referring organizations should include as much of the following information as possible when submitting a referral."
                centered={false}
              />
              <ul className="space-y-3 mt-2">
                {referralChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <FileText className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
              <div className="flex items-start gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-accent shrink-0" />
                <h3 className="font-heading font-semibold text-lg text-foreground">Important to Know</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Referrals are accepted but not automatically approved.</strong> Every referral is evaluated on its own merits. We assess individual readiness, program fit, and current availability before making any placement decision.
                </p>
                <p>
                  <strong className="text-foreground">Availability matters.</strong> Housing placement depends on current capacity. If no beds are available, qualified applicants may be placed on a waitlist and contacted when space opens.
                </p>
                <p>
                  <strong className="text-foreground">Intake is an internal process.</strong> Once a referral is approved, our team handles all intake and onboarding directly. Referring organizations are kept informed as appropriate.
                </p>
                <p>
                  <strong className="text-foreground">Timeline varies.</strong> The review process typically takes 3–7 business days, though this may vary based on volume and complexity. We communicate clearly at every stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-heading font-semibold text-2xl text-foreground mb-5">Ready to Submit a Referral?</h3>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Whether you're a case manager, probation officer, social worker, or community organization, we welcome your referrals. Submit a housing inquiry to get started.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/apply">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2">
              Submit a Housing Inquiry
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/partners">
            <Button variant="outline" className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
              Become a Referral Partner
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}