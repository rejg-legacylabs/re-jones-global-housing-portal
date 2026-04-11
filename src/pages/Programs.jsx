import { Home, Shield, ClipboardCheck, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const communityImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/14bd431ee_generated_ab4b3b5d.png";

const programs = [
  {
    icon: Home,
    title: "Transitional Housing",
    description: "Our core housing program provides safe, structured living environments for individuals transitioning from instability — including post-incarceration, shelter stays, or other disruptions — into a stable housing situation.",
    features: [
      "Furnished living spaces in well-maintained properties",
      "Structured environment with clear community expectations",
      "Support for building daily routines and independence",
      "Duration based on individual progress and goals",
    ],
  },
  {
    icon: Shield,
    title: "Housing Stabilization Support",
    description: "For residents working toward independent living, we provide supportive resources and guidance to help maintain housing stability and prevent a return to instability.",
    features: [
      "Resource navigation and community connections",
      "Employment readiness and job search support",
      "Life skills development and financial literacy",
      "Ongoing check-ins during stabilization period",
    ],
  },
  {
    icon: Users,
    title: "Structured Living Environment",
    description: "Our housing communities operate on shared expectations of respect, accountability, and mutual support. This structured approach creates a safe, productive environment for all residents.",
    features: [
      "Community guidelines focused on respect and responsibility",
      "Supportive peer environment with shared accountability",
      "Clean, safe, well-maintained living spaces",
      "Regular community check-ins and resident engagement",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit an Inquiry or Referral",
    description: "Individuals or referring organizations begin by submitting a housing inquiry through our online form or by contacting our team directly.",
  },
  {
    step: "02",
    title: "Internal Review & Screening",
    description: "Our team reviews every inquiry to assess need, fit, and current housing availability. Not all inquiries result in placement — we evaluate each case carefully.",
  },
  {
    step: "03",
    title: "Suitability Assessment",
    description: "Qualified applicants are invited for an assessment and interview to discuss their situation, goals, and readiness for structured housing.",
  },
  {
    step: "04",
    title: "Placement Decision & Move-In",
    description: "If approved, we work with the individual (and referring organization, if applicable) to coordinate move-in and orientation to the housing community.",
  },
];

export default function Programs() {
  return (
    <div>
      <PageHero
        title="Housing Programs & Services"
        description="RE Jones Global Housing offers structured, supportive housing services designed to help individuals stabilize their lives and build a foundation for long-term independence."
      />

      {/* Programs */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="What We Provide"
          description="Our housing services are built around three core pillars: safe transitional housing, stabilization support, and a structured community environment."
        />
        <div className="space-y-12 mt-8">
          {programs.map((program, i) => (
            <div key={program.title} className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-md bg-accent/10 flex items-center justify-center">
                    <program.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-xl lg:text-2xl text-foreground mb-3">{program.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{program.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {program.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-foreground">
                          <ClipboardCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-64 lg:h-96">
        <img src={communityImage} alt="Modern community room in residential housing" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/40" />
      </section>

      {/* Move-In Pathway */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="The Pathway"
          title="From Inquiry to Move-In"
          description="Housing placement follows a structured review process. This ensures the right fit for every individual and protects the integrity of our housing community."
        />
        <div className="max-w-3xl mx-auto mt-10">
          {processSteps.map((item, i) => (
            <div key={item.step} className="flex gap-6 mb-8 last:mb-0">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                  {item.step}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="pb-8">
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/apply">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2">
              Submit a Housing Inquiry
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Important Note */}
      <section className="bg-muted py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Important Information</h3>
          <p className="text-muted-foreground leading-relaxed">
            Housing placement is not guaranteed. All inquiries and referrals are reviewed internally on a case-by-case basis. Approval depends on individual readiness, program fit, and current housing availability. RE Jones Global Housing reserves the right to make all placement decisions.
          </p>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}