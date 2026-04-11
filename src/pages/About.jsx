import { Shield, Heart, Users, Target } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const windowImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/7be852296_generated_631015db.png";

const values = [
  {
    icon: Shield,
    title: "Structure & Accountability",
    description: "We believe structure is essential to rebuilding. Our housing environments operate on clear expectations and consistent accountability — not as punishment, but as the scaffolding people need to regain footing.",
  },
  {
    icon: Heart,
    title: "Dignity & Respect",
    description: "Every resident is treated with the respect and dignity they deserve. We do not define people by their past. We meet them where they are and support their path forward.",
  },
  {
    icon: Users,
    title: "Community & Connection",
    description: "Isolation undermines recovery. Our housing fosters community — a network of people who are all working toward something better, surrounded by support and shared accountability.",
  },
  {
    icon: Target,
    title: "Purposeful Placement",
    description: "We do not place people randomly. Every placement is reviewed for fit, readiness, and mutual benefit. This protects residents, neighbors, and the integrity of our housing program.",
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        title="About RE Jones Global Housing"
        description="RE Jones Global is committed to providing structured, supportive housing for individuals working to rebuild their lives. Our housing work is grounded in the belief that every person deserves a stable foundation — and that stable housing is the starting point for lasting change."
      />

      {/* Mission */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading
              label="Our Purpose"
              title="Why This Work Matters"
              centered={false}
            />
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Across communities, thousands of people are trying to rebuild their lives after incarceration, homelessness, addiction, or other disruptions. They are working to find employment, maintain sobriety, rebuild family relationships, and reintegrate into their communities. But without stable housing, those goals remain out of reach.
              </p>
              <p>
                RE Jones Global Housing exists to bridge that gap. We provide transitional and stabilization housing in structured, well-maintained environments — places where people can live with dignity while they do the hard work of putting their lives back together.
              </p>
              <p>
                This is not emergency shelter. This is purposeful housing — designed to support people who are ready to move forward but need a stable place to land while they build the foundation for long-term independence.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" aria-hidden="true" />
            <img
              src={windowImage}
              alt="Sunrise through a residential window symbolizing hope and new beginnings"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Why Transitional Housing */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="The Foundation"
            title="Why Transitional Housing Matters"
            description="Transitional housing fills a critical gap between crisis intervention and permanent independent living. It provides the structure and time needed for individuals to stabilize, build resources, and prepare for the next chapter."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            {[
              {
                title: "Reduces Recidivism",
                text: "Research consistently shows that access to stable housing significantly reduces the likelihood of reincarceration. Housing provides the stability needed to maintain compliance, employment, and recovery."
              },
              {
                title: "Supports Recovery",
                text: "For people in recovery from substance use, a structured living environment with clear expectations and community support is critical to maintaining sobriety and building healthy routines."
              },
              {
                title: "Enables Employment",
                text: "Without a stable address, employment is nearly impossible to find or maintain. Transitional housing gives people the consistent base they need to pursue and keep work."
              },
              {
                title: "Rebuilds Family Connections",
                text: "Stable housing provides a dignified space where individuals can begin reconnecting with family — rebuilding trust and relationships that were disrupted during periods of instability."
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8 border-t-4 border-t-accent">
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Values"
          title="What We Stand For"
          description="Our work is guided by core principles that shape every decision, every placement, and every interaction."
        />
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value) => (
            <div key={value.title} className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mt-0.5">
                <value.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-accent mb-3">Our Commitment</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight mb-6">
              Serious About Housing. Serious About People.
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              RE Jones Global is not a temporary fix. We are building a housing infrastructure that serves communities for the long term — operated with the professionalism, accountability, and care that this work demands. Every resident who walks through our doors deserves a real chance. That is what we are here to provide.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}