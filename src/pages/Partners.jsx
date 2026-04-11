import { useState } from "react";
import { ArrowRight, Building2, Shield, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import PageHero from "../components/shared/PageHero";
import SectionHeading from "../components/shared/SectionHeading";
import { toast } from "sonner";

const partnerTypes = [
  { value: "nonprofit", label: "Nonprofit Organization" },
  { value: "government_agency", label: "Government Agency" },
  { value: "parole_probation", label: "Parole / Probation Office" },
  { value: "reentry_organization", label: "Reentry Organization" },
  { value: "healthcare_provider", label: "Healthcare Provider" },
  { value: "faith_based", label: "Faith-Based Organization" },
  { value: "other", label: "Other" },
];

const benefits = [
  {
    icon: Building2,
    title: "Structured Referral Pathway",
    description: "Access a clear, reliable process for referring individuals in your care to safe, structured housing.",
  },
  {
    icon: Shield,
    title: "Accountability & Communication",
    description: "Receive status updates on referrals and maintain open communication with our housing team.",
  },
  {
    icon: Users,
    title: "Shared Mission",
    description: "Partner with an organization that shares your commitment to helping people rebuild and move forward.",
  },
];

export default function Partners() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    organization_name: "",
    contact_name: "",
    email: "",
    phone: "",
    organization_type: "",
    partnership_interest: "",
    referral_volume_estimate: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.organization_name || !form.contact_name || !form.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await base44.entities.PartnerInquiry.create(form);
    setLoading(false);
    setSubmitted(true);
    toast.success("Partnership inquiry submitted successfully!");
  };

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <PageHero
        title="Partner & Organization Referrals"
        description="RE Jones Global Housing works with community organizations, government agencies, and social service providers to connect individuals with the structured housing they need. Become a referral partner and help the people you serve access safe, supportive housing."
      />

      {/* Benefits */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Partnership"
          title="Why Partner With RE Jones Global"
          description="Our referral partnerships are built on mutual respect, clear communication, and a shared commitment to helping people rebuild their lives."
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="w-14 h-14 rounded-md bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <b.icon className="w-7 h-7 text-accent" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{b.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How It Works"
            title="Becoming a Referral Partner"
            description="The process for becoming a referral partner is straightforward."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-8">
            {[
              { step: "01", title: "Express Interest", desc: "Complete the partner interest form below with your organization's details." },
              { step: "02", title: "Introduction Call", desc: "Our team will schedule a call to discuss partnership details and referral processes." },
              { step: "03", title: "Establish Process", desc: "We'll set up communication channels and referral submission procedures." },
              { step: "04", title: "Begin Referring", desc: "Start submitting referrals for individuals in your care who may benefit from our housing." },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-4xl font-heading font-bold text-accent/20 mb-2 block">{item.step}</span>
                <h4 className="font-heading font-semibold text-base text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            label="Get Started"
            title="Partner Interest Form"
            description="Complete the form below to express interest in becoming a referral partner. Our team will follow up within 3–5 business days."
          />

          {submitted ? (
            <div className="bg-card border border-border rounded-lg p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Thank You</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your partnership inquiry has been received. Our team will review your submission and follow up within 3–5 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 lg:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org_name">Organization Name *</Label>
                  <Input id="org_name" value={form.organization_name} onChange={(e) => updateField("organization_name", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_name">Contact Name *</Label>
                  <Input id="contact_name" value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="p_email">Email *</Label>
                  <Input id="p_email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p_phone">Phone</Label>
                  <Input id="p_phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Organization Type</Label>
                <Select value={form.organization_type} onValueChange={(v) => updateField("organization_type", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {partnerTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest">Partnership Interest</Label>
                <Input id="interest" placeholder="What are you looking for in a housing partner?" value={form.partnership_interest} onChange={(e) => updateField("partnership_interest", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Estimated Annual Referral Volume</Label>
                <Input id="volume" placeholder="e.g., 5–10 referrals per year" value={form.referral_volume_estimate} onChange={(e) => updateField("referral_volume_estimate", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p_message">Additional Information</Label>
                <Textarea id="p_message" rows={4} placeholder="Tell us about your organization and how we might work together." value={form.message} onChange={(e) => updateField("message", e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                {loading ? "Submitting..." : "Submit Partner Inquiry"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}