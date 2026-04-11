import { TrendingUp, Users, Home, Heart } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const neighborhoodImage = "/__generating__/img_54ab6e7afc3c.png";

const stats = [
  { icon: Home, value: "85%", label: "Housing Stability Rate", description: "of residents maintain stable housing through program completion" },
  { icon: TrendingUp, value: "3x", label: "Employment Impact", description: "more likely to secure and maintain employment with stable housing" },
  { icon: Users, value: "70%", label: "Reduced Recidivism", description: "reduction in return to incarceration among supported housing residents" },
  { icon: Heart, value: "90%", label: "Community Satisfaction", description: "of residents report improved quality of life during their stay" },
];

const impacts = [
  {
    title: "Reducing Instability",
    description: "Every person placed in stable housing is one fewer person cycling through shelters, emergency rooms, or the criminal justice system. Our housing breaks the cycle of instability by providing the structure and support people need to stay housed.",
  },
  {
    title: "Creating Safer Transitions",
    description: "The period immediately after incarceration, shelter stays, or other disruptions is the most critical. Our housing provides a safe landing during this vulnerable time — reducing the risk of relapse, re-offending, or returning to homelessness.",
  },
  {
    title: "Supporting Employment & Self-Sufficiency",
    description: "Stable housing is the single most important predictor of employment success. When people have a consistent address, a safe place to sleep, and the structure to maintain a routine, they can pursue and keep meaningful work.",
  },
  {
    title: "Rebuilding Families & Relationships",
    description: "Housing instability fractures families. By providing a dignified living environment, we give residents the space to reconnect with children, partners, and family members — rebuilding the relationships that sustain long-term recovery.",
  },
  {
    title: "Strengthening Communities",
    description: "When individuals stabilize, communities strengthen. Our residents become contributing members of their neighborhoods — working, volunteering, supporting others, and demonstrating that second chances work when backed by real support.",
  },
];

export default function Impact() {
  return (
    <div>
      <PageHero
        title="Community Impact"
        description="RE Jones Global Housing exists to reduce instability, create safer transitions, and strengthen communities. The impact of this work extends far beyond individual residents — it ripples through families, neighborhoods, and entire communities."
      />

      {/* Stats */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="By the Numbers"
          title="The Impact of Stable Housing"
          description="Research and outcomes consistently demonstrate the transformative power of supportive housing."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-7 text-center border-t-4 border-t-accent">
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <span className="text-4xl font-heading font-bold text-foreground block mb-1">{stat.value}</span>
              <span className="text-sm font-body font-semibold text-foreground block mb-2">{stat.label}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-64 lg:h-96">
        <img src={neighborhoodImage} alt="Peaceful residential neighborhood at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white text-center px-4 max-w-3xl leading-tight">
            When People Are Housed,<br />
            <span className="text-accent">Everything Changes.</span>
          </p>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="The Bigger Why"
          title="How Our Work Creates Change"
          description="The impact of stable housing reaches into every area of a person's life — and beyond, into the broader community."
        />
        <div className="space-y-6 max-w-4xl mx-auto mt-8">
          {impacts.map((impact, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-8 border-l-4 border-l-accent">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-3">{impact.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Stakeholders */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            label="For Partners & Funders"
            title="Investing in What Works"
            description="Supportive housing is one of the most cost-effective interventions available for reducing homelessness, recidivism, and emergency service utilization."
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            For every dollar invested in supportive housing, communities save multiple dollars in reduced emergency room visits, jail costs, shelter expenses, and social service utilization. RE Jones Global Housing is committed to being part of this proven solution — delivering measurable outcomes for the individuals we serve and the communities we operate in.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            We welcome conversations with funders, policymakers, and community leaders who want to learn more about our model and explore partnership opportunities.
          </p>
        </div>
      </section>

      <CTABanner
        title="Want to Make an Impact?"
        description="Partner with RE Jones Global Housing to help more people access the stable housing they need to rebuild their lives."
        primaryLink="/partners"
        primaryLabel="Become a Partner"
        secondaryLink="/contact"
        secondaryLabel="Contact Us"
      />
    </div>
  );
}