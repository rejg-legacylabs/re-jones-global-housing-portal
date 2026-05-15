import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home as HomeIcon, Users, Handshake, Shield, Heart, Building2 } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";
import CTABanner from "../components/shared/CTABanner";

const heroImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/8193a4729_generated_4fbef46c.png";
const interiorImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/5db47d755_generated_6aa2a130.png";

const gatewayCards = [
  {
    icon: HomeIcon,
    title: "Submit a Housing Inquiry",
    description: "Individuals seeking housing support can submit an inquiry to begin the review process.",
    link: "/apply",
    linkLabel: "Get Started",
  },
  {
    icon: Users,
    title: "Refer Someone",
    description: "Case managers, social workers, and community organizations can refer individuals for housing placement.",
    link: "/referral-process",
    linkLabel: "Learn About Referrals",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Courts, treatment programs, nonprofits, and agencies can become referral partners for priority bed access.",
    link: "/partners",
    linkLabel: "Become a Partner",
  },
];

const pillars = [
  {
    icon: Shield,
    title: "100% Drug & Alcohol Free",
    description: "Every REJG Legacy Properties home is a structured, sober environment built around accountability, house rules, and mutual respect.",
  },
  {
    icon: Heart,
    title: "Dignity-Centered Approach",
    description: "Every person deserves a safe place to call home while they work toward self-sufficiency. We uphold the dignity of every resident.",
  },
  {
    icon: Building2,
    title: "Pathway to Stability",
    description: "Housing is the foundation. From that foundation, individuals can pursue employment, recovery, education, and reconnection with their community.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Residential building at golden hour" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-accent mb-4">
              REJG Legacy Properties — A RE Jones Global LLC Company
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              Dignity Begins<br />
              <span className="text-accent">with a Door.</span>
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed mb-4 max-w-xl">
              REJG Legacy Properties provides 100% drug and alcohol free structured housing for justice-impacted individuals, homeless veterans, and turned-out foster youth across Austin, Texas.
            </p>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-10 max-w-xl">
              Stable housing is the first step toward lasting change. We provide the foundation — structure, accountability, and dignity — for people ready to rebuild their lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2 w-full sm:w-auto">
                  Submit a Housing Inquiry
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/partners">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body font-semibold text-sm tracking-wide uppercase px-8 w-full sm:w-auto">
                  Partner With Us
                </Button>
              </Link>
            </div>
            <div className="flex gap-6 mt-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-xs text-primary-foreground/50 uppercase tracking-wider">Drug & Alcohol Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Austin</div>
                <div className="text-xs text-primary-foreground/50 uppercase tracking-wider">Texas Based</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">737-999-0256</div>
                <div className="text-xs text-primary-foreground/50 uppercase tracking-wider">Direct Line</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Cards */}
      <section className="relative -mt-8 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gatewayCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-card border border-border rounded-lg p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <card.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.description}</p>
              <span className="text-sm font-body font-semibold text-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                {card.linkLabel}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              label="What We Do"
              title="Structured Sober Housing for People Rebuilding Their Lives"
              description="REJG Legacy Properties provides 100% drug and alcohol free structured living environments for individuals transitioning from instability to self-sufficiency. Our housing is more than a roof — it is the foundation upon which lives are rebuilt."
              centered={false}
            />
            <div className="space-y-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mt-0.5">
                    <pillar.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-base text-foreground mb-1">{pillar.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" aria-hidden="true" />
            <img
              src={interiorImage}
              alt="Warm, well-furnished residential room representing transitional housing"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Who We Serve Preview */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Who We Serve"
            title="Housing for Those Working Toward Stability"
            description="REJG Legacy Properties serves individuals referred through courts, treatment programs, nonprofits, and social service agencies across Central Texas."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              "Justice-impacted individuals seeking stable, sober housing",
              "Homeless veterans needing structured transitional housing",
              "Turned-out foster youth aging out of the system",
              "Individuals referred through courts, probation, or treatment programs"
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 border-l-4 border-l-accent">
                <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/who-we-serve">
              <Button variant="outline" className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
                Learn More About Who We Serve
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Referral Partners"
          title="Who Can Refer to REJG Legacy Properties"
          description="We work with courts, treatment programs, probation, nonprofits, and VA services to place individuals quickly and professionally."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            { org: "Travis County Pretrial Services", type: "Court / Pretrial" },
            { org: "Integral Care", type: "Mental Health Authority" },
            { org: "Austin Recovery Network", type: "Recovery Services" },
            { org: "CommUnity Care", type: "Community Health" },
            { org: "VA HUD-VASH", type: "Veteran Services" },
            { org: "Probation & Parole Offices", type: "Supervision" },
          ].map((p) => (
            <div key={p.org} className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <span className="text-accent font-bold text-sm">✓</span>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{p.org}</div>
                <div className="text-xs text-muted-foreground">{p.type}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/partners">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2 px-8">
              Become a Referral Partner
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Referral Process Preview */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How It Works"
            title="The Path to Housing Placement"
            description="Our referral and placement process is structured to ensure the right fit for every individual."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {[
              { step: "01", title: "Inquiry or Referral", desc: "Individuals or organizations submit a housing inquiry or referral through our intake process." },
              { step: "02", title: "Internal Review", desc: "Our team reviews every submission to evaluate need, fit, and current availability." },
              { step: "03", title: "Assessment & Interview", desc: "Qualified applicants are invited for a suitability assessment and interview." },
              { step: "04", title: "Placement Decision", desc: "Placement decisions are made based on fit, readiness, and available housing." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span className="text-5xl font-heading font-bold text-accent/20 mb-2 block">{item.step}</span>
                <h4 className="font-heading font-semibold text-base text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/referral-process">
              <Button variant="outline" className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
                Full Referral Process
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Housing Stability Matters */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why It Matters"
            title="Housing Stability Changes Everything"
            description="When people have a safe, stable, sober place to live, every other part of their life improves. Employment becomes possible. Recovery has a foundation. Families can reconnect. Communities grow stronger."
            light
          />
          <div className="grid sm:grid-cols-3 gap-8 mt-8 text-center">
            {[
              { stat: "85%", label: "of residents maintain housing stability through program completion" },
              { stat: "3x", label: "more likely to secure employment with stable housing" },
              { stat: "70%", label: "reduction in recidivism with supportive housing" },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-5xl lg:text-6xl font-heading font-bold text-accent block mb-3">{item.stat}</span>
                <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs mx-auto">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <a href="tel:7379990256">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2">
                  Call 737-999-0256
                </Button>
              </a>
              <a href="mailto:rejglegacyproperties@gmail.com">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body font-semibold text-sm tracking-wide uppercase px-8">
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </div>
  );
}