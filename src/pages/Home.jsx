import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home as HomeIcon, Users, Handshake, Shield, Heart, Building2, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const heroImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/8193a4729_generated_4fbef46c.png";
const interiorImage = "https://media.base44.com/images/public/69da98c225a706a681e19690/5db47d755_generated_6aa2a130.png";

const C = {
  navy: "#0f1e35",
  navyMid: "#162840",
  warm: "#faf8f4",
  warmMid: "#f0ece4",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  green: "#1a7a4a",
  greenLight: "#22a060",
  greenPale: "#e8f5ee",
  border: "rgba(201,168,76,0.2)",
  text: "#1a2332",
  muted: "#6b7a8d",
};

const glass = (extra = {}) => ({
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${C.border}`,
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(15,30,53,0.1), inset 0 1px 0 rgba(201,168,76,0.15)",
  transition: "all 0.25s ease",
  ...extra,
});

function FloatCard({ icon: Icon, title, desc, link, cta, color }) {
  const [h, setH] = useState(false);
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          ...glass(),
          padding: 28,
          transform: h ? "translateY(-6px)" : "translateY(0)",
          boxShadow: h
            ? `0 20px 48px rgba(15,30,53,0.18), 0 0 0 2px ${color}`
            : "0 8px 32px rgba(15,30,53,0.1)",
          borderColor: h ? color : C.border,
          cursor: "pointer",
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Icon style={{ width: 24, height: 24, color }} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: "0 0 8px 0" }}>{title}</h3>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 16px 0" }}>{desc}</p>
        <span style={{ fontSize: 13, fontWeight: 700, color, display: "flex", alignItems: "center", gap: 6 }}>
          {cta} <ArrowRight style={{ width: 14, height: 14, transform: h ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s" }} />
        </span>
      </div>
    </Link>
  );
}

function StatCard({ stat, label, color }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ ...glass(), padding: "24px 20px", textAlign: "center", transform: h ? "translateY(-4px)" : "translateY(0)", borderColor: h ? color : C.border }}
    >
      <div style={{ fontSize: 40, fontWeight: 900, color, lineHeight: 1, marginBottom: 8 }}>{stat}</div>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

function PartnerCard({ org, type }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ ...glass(), padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, transform: h ? "translateY(-3px)" : "translateY(0)", borderColor: h ? C.green : C.border }}
    >
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: h ? C.green : C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
        <CheckCircle style={{ width: 16, height: 16, color: h ? "#fff" : C.green, transition: "all 0.2s" }} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{org}</div>
        <div style={{ fontSize: 11, color: C.muted }}>{type}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroHover, setHeroHover] = useState(false);

  return (
    <div style={{ background: C.warm, fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{opacity:0.6} 50%{opacity:1} 100%{opacity:0.6} }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: C.navy, color: "#fff", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={heroImage} alt="REJG Legacy Properties" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy} 40%, rgba(15,30,53,0.85) 70%, rgba(26,122,74,0.15) 100%)` }} />
        </div>

        {/* Floating orbs */}
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)`, animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "20%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, rgba(26,122,74,0.08) 0%, transparent 70%)`, animation: "float 8s ease-in-out infinite reverse" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.12)", border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 24, padding: "6px 16px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, animation: "shimmer 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.goldLight, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                REJG Legacy Properties — A RE Jones Global LLC Company
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 20px 0" }}>
              Dignity Begins<br />
              <span style={{ color: C.gold }}>with a Door.</span>
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.75)", margin: "0 0 12px 0", maxWidth: 560 }}>
              REJG Legacy Properties provides <strong style={{ color: "#fff" }}>100% drug and alcohol free</strong> structured housing
              for justice-impacted individuals, homeless veterans, and turned-out foster youth across Austin, Texas.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: "0 0 36px 0", maxWidth: 520 }}>
              Stable housing is the first step toward lasting change. Structure, accountability, and dignity — for people ready to rebuild.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <Link to="/apply" style={{ textDecoration: "none" }}>
                <button style={{ padding: "14px 28px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.navy, border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", boxShadow: `0 4px 20px rgba(201,168,76,0.35)` }}>
                  Submit a Housing Inquiry →
                </button>
              </Link>
              <Link to="/partners" style={{ textDecoration: "none" }}>
                <button style={{ padding: "14px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  Partner With Us
                </button>
              </Link>
            </div>

            {/* Quick stats inline */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { val: "100%", label: "Drug & Alcohol Free" },
                { val: "Austin", label: "Central Texas" },
                { val: "737-999-0256", label: "Call Direct" },
              ].map(s => (
                <div key={s.val}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GATEWAY CARDS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: -40, position: "relative", zIndex: 10 }}>
          <FloatCard icon={HomeIcon} title="Submit a Housing Inquiry" desc="Individuals seeking housing can submit an inquiry to begin our structured review process." link="/apply" cta="Get Started" color={C.green} />
          <FloatCard icon={Users} title="Refer Someone" desc="Case managers, social workers, courts, and organizations can refer individuals for placement." link="/referral-process" cta="Learn About Referrals" color={C.gold} />
          <FloatCard icon={Handshake} title="Partner With Us" desc="Courts, treatment programs, and nonprofits can partner for priority bed access and fast placement." link="/partners" cta="Become a Partner" color={C.navy} />
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>What We Do</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.text, margin: "0 0 20px 0", lineHeight: 1.15 }}>
              Structured Sober Housing for People Rebuilding Their Lives
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, margin: "0 0 36px 0" }}>
              REJG Legacy Properties provides 100% drug and alcohol free structured living environments
              for individuals transitioning from instability to self-sufficiency. Our housing is more than
              a roof — it is the foundation upon which lives are rebuilt.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: Shield, title: "100% Drug & Alcohol Free", desc: "Every home is a structured, sober environment with house rules, accountability, and zero tolerance.", color: C.green },
                { icon: Heart, title: "Dignity-Centered Approach", desc: "Every person deserves a safe place to call home. We uphold the dignity of every resident.", color: C.gold },
                { icon: Building2, title: "Pathway to Stability", desc: "Housing is the foundation. From here, individuals can pursue employment, recovery, and community.", color: C.navy },
              ].map(p => (
                <div key={p.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <p.icon style={{ width: 22, height: 22, color: p.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -16, left: -16, width: 80, height: 80, borderTop: `3px solid ${C.gold}44`, borderLeft: `3px solid ${C.gold}44`, borderRadius: "12px 0 0 0" }} />
            <img src={interiorImage} alt="REJG Legacy Properties home" style={{ width: "100%", borderRadius: 16, boxShadow: "0 24px 64px rgba(15,30,53,0.18)" }} />
            <div style={{ position: "absolute", bottom: -16, right: -16, width: 80, height: 80, borderBottom: `3px solid ${C.green}44`, borderRight: `3px solid ${C.green}44`, borderRadius: "0 0 12px 0" }} />
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section style={{ background: C.warmMid, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Who We Serve</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.text, margin: "0 0 16px 0" }}>Housing for Those Working Toward Stability</h2>
            <p style={{ fontSize: 15, color: C.muted, maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>
              We serve individuals referred through courts, treatment programs, nonprofits, and agencies across Central Texas.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: "⚖️", pop: "Justice-Impacted Individuals", desc: "Formerly incarcerated individuals seeking stable, sober housing post-release." },
              { icon: "🎖️", pop: "Homeless Veterans", desc: "Veterans needing structured transitional housing and support services." },
              { icon: "🏠", pop: "Turned-Out Foster Youth", desc: "Young adults aging out of the foster care system without a safe home." },
              { icon: "🔄", pop: "Treatment Graduates", desc: "Individuals completing inpatient or outpatient drug & alcohol treatment programs." },
              { icon: "🤝", pop: "Agency-Referred Individuals", desc: "Clients referred by partner courts, probation offices, nonprofits, and service agencies." },
            ].map(p => (
              <div key={p.pop} style={{ ...glass(), padding: 24, borderLeft: `4px solid ${C.green}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderLeftColor = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderLeftColor = C.green; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 6 }}>{p.pop}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/who-we-serve" style={{ textDecoration: "none" }}>
              <button style={{ padding: "12px 28px", background: "transparent", color: C.green, border: `2px solid ${C.green}`, borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                Learn More About Who We Serve →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNER ORGS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Referral Partners</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.text, margin: "0 0 16px 0" }}>Who Refers to REJG Legacy Properties</h2>
          <p style={{ fontSize: 15, color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            We work with courts, treatment programs, probation offices, and nonprofit agencies to place individuals quickly and professionally.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 36 }}>
          <PartnerCard org="Travis County Pretrial Services" type="Court / Pretrial" />
          <PartnerCard org="Integral Care" type="Mental Health Authority" />
          <PartnerCard org="Austin Recovery Network" type="Recovery Services" />
          <PartnerCard org="CommUnity Care" type="Community Health" />
          <PartnerCard org="VA HUD-VASH" type="Veteran Services" />
          <PartnerCard org="TDCJ Parole & Probation" type="Supervision Officers" />
          <PartnerCard org="SAFE Alliance" type="Safety & Housing" />
          <PartnerCard org="LifeWorks" type="Youth & Family" />
          <PartnerCard org="HOH Foundation" type="Nonprofit Partner" />
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/partners" style={{ textDecoration: "none" }}>
            <button style={{ padding: "14px 32px", background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, boxShadow: `0 4px 20px rgba(26,122,74,0.3)` }}>
              Become a Referral Partner →
            </button>
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: C.warmMid, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.text, margin: "0 0 16px 0" }}>The Path to Housing Placement</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { step: "01", title: "Inquiry or Referral", desc: "Individuals or organizations submit a housing inquiry or referral through our intake process." },
              { step: "02", title: "Internal Review", desc: "Our team reviews every submission for eligibility, fit, and current bed availability." },
              { step: "03", title: "Assessment & Interview", desc: "Qualified applicants are contacted within 24 hours for a suitability assessment." },
              { step: "04", title: "Placement & Move-In", desc: "Placement decisions are made based on fit and readiness. Move-in coordinated within 48 hours." },
            ].map(s => (
              <div key={s.step} style={{ ...glass(), padding: 28 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: `${C.gold}40`, lineHeight: 1, marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/referral-process" style={{ textDecoration: "none" }}>
              <button style={{ padding: "12px 28px", background: "transparent", color: C.green, border: `2px solid ${C.green}`, borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                Full Referral Process →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Why It Matters</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 16px 0" }}>Housing Stability Changes Everything</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
              When people have a safe, stable, sober place to live, every other part of their life improves.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
            <StatCard stat="85%" label="of residents maintain housing stability through program completion" color={C.gold} />
            <StatCard stat="3x" label="more likely to secure employment with stable housing" color={C.greenLight} />
            <StatCard stat="70%" label="reduction in recidivism associated with supportive housing" color={C.gold} />
          </div>
          <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <a href="tel:7379990256" style={{ textDecoration: "none" }}>
              <button style={{ padding: "14px 28px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.navy, border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Phone style={{ width: 16, height: 16 }} /> 737-999-0256
              </button>
            </a>
            <a href="mailto:rejglegacyproperties@gmail.com" style={{ textDecoration: "none" }}>
              <button style={{ padding: "14px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Mail style={{ width: 16, height: 16 }} /> Email Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
      <section style={{ background: C.warmMid, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            { icon: Phone, val: "737-999-0256", label: "Call or Text", href: "tel:7379990256" },
            { icon: Mail, val: "rejglegacyproperties@gmail.com", label: "Email", href: "mailto:rejglegacyproperties@gmail.com" },
            { icon: MapPin, val: "Austin, Texas", label: "Central Texas Service Area", href: "/contact" },
          ].map(c => (
            <a key={c.val} href={c.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <c.icon style={{ width: 18, height: 18, color: C.green }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{c.val}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{c.label}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}