import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const doorImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/5d6c24fb3_generated_1fad0980.png";

const populations = [
  {
    title: "Justice-Impacted Individuals",
    description: "Men and women who are rebuilding their lives after incarceration. Our structured housing provides the stability needed to maintain compliance, pursue employment, and reintegrate into the community.",
  },
  {
    title: "Individuals Rebuilding After Instability",
    description: "People who have experienced homelessness, housing loss, or extended periods of instability and are actively working to regain their footing with housing as their foundation.",
  },
  {
    title: "People Working Toward Employment & Self-Sufficiency",
    description: "Residents who are committed to building independence through employment, education, or vocational training — and need a stable living environment to make that possible.",
  },
  {
    title: "Individuals Referred Through Approved Organizations",
    description: "People referred by parole and probation offices, reentry organizations, social service agencies, and other community partners who can speak to an individual's readiness and goals.",
  },
  {
    title: "People in Recovery",
    description: "Individuals maintaining sobriety and actively participating in recovery who need a structured, supportive environment free from the triggers of their previous living situations.",
  },
];

const expectations = [
  "Active participation in their own stability plan",
  "Respect for community guidelines and fellow residents",
  "Engagement in employment, education, or approved programming",
  "Compliance with all housing and program requirements",
  "Honesty and open communication with housing staff",
  "A genuine commitment to moving forward",
];

export default function WhoWeServe() {
  return (
    <div>
      <PageHero
        title="Who We Serve"
        description="RE Jones Global Housing provides structured housing for individuals who are actively working to rebuild their lives. Our residents are people who deserve a stable foundation — and who are willing to do the work required to build on it."
      />

      {/* Populations */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Residents"
          title="People Working Toward a Better Future"
          description="We serve individuals who are committed to change and who need safe, structured housing to support their journey. Our housing is available to people who meet our intake criteria and are referred through approved channels."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
          {populations.map((pop, i) => (
            <div key={i} className={`bg-card border border-border rounded-lg p-7 ${i === populations.length - 1 && populations.length % 2 !== 0 ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}`}>
              <div className="w-2 h-2 rounded-full bg-accent mb-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{pop.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pop.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image + Expectations */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" aria-hidden="true" />
              <img
                src={doorImage}
                alt="Hand turning a key in a door lock, symbolizing new beginnings"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div>
              <SectionHeading
                label="What We Ask"
                title="Expectations of Our Residents"
                description="Housing with RE Jones Global is a partnership. We provide the environment and support — but residents must bring their commitment and effort."
                centered={false}
              />
              <ul className="space-y-3">
                {expectations.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Respectful Note */}
      <section className="py-16 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-heading font-semibold text-2xl text-foreground mb-5">A Note About Our Approach</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not define people by their past circumstances. Our residents are individuals with goals, potential, and the desire to build something better. RE Jones Global Housing is here to support that journey — with structure, accountability, and genuine care.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you or someone you know may benefit from our housing services, we encourage you to reach out. Every inquiry is treated with respect and confidentiality.
        </p>
        <div className="mt-8">
          <Link to="/apply">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2">
              Submit a Housing Inquiry
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <CTABanner
        title="Are You a Referring Organization?"
        description="Learn about our referral process and how to partner with RE Jones Global Housing."
        primaryLink="/partners"
        primaryLabel="Partner With Us"
        secondaryLink="/referral-process"
        secondaryLabel="Referral Process"
      />
    </div>
  );
}