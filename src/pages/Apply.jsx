import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import PageHero from "../components/shared/PageHero";
import { toast } from "sonner";

const inquiryTypes = [
  { value: "individual", label: "I am seeking housing for myself" },
  { value: "referral_for_someone", label: "I am referring someone else" },
  { value: "organization_referral", label: "I am submitting an organizational referral" },
];

const programOptions = [
  { value: "transitional_housing", label: "Transitional Housing" },
  { value: "housing_stabilization", label: "Housing Stabilization Support" },
  { value: "structured_living", label: "Structured Living Environment" },
  { value: "not_sure", label: "Not Sure / Need Guidance" },
];

const stepLabels = ["Contact Information", "Your Situation", "Review & Submit"];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    inquiry_type: "",
    current_housing_situation: "",
    referral_source: "",
    program_interest: "",
    summary_of_need: "",
    organization_name: "",
    organization_contact: "",
    organization_phone: "",
    consent_to_contact: false,
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const canProceedStep0 = form.full_name && form.email && form.inquiry_type;
  const canProceedStep1 = form.summary_of_need;
  const canSubmit = form.consent_to_contact;

  const handleSubmit = async () => {
    if (!form.consent_to_contact) {
      toast.error("Please provide consent to be contacted.");
      return;
    }
    setLoading(true);
    await base44.entities.HousingInquiry.create(form);
    setLoading(false);
    setSubmitted(true);
    toast.success("Housing inquiry submitted successfully!");
  };

  const isOrgReferral = form.inquiry_type === "organization_referral";

  if (submitted) {
    return (
      <div>
        <PageHero title="Housing Inquiry" description="Your inquiry has been received." />
        <section className="py-16 lg:py-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-lg p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-3">Thank You</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your housing inquiry has been submitted. Our team will review your submission and respond within 3–7 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              Submitting an inquiry does not guarantee housing placement. All inquiries are reviewed internally based on individual circumstances, program fit, and current availability.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Housing Inquiry"
        description="Complete the form below to submit a housing inquiry. Whether you are seeking housing for yourself, referring someone, or submitting an organizational referral, this is the place to start."
      />

      <section className="py-16 lg:py-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-semibold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-body hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
          {/* Step 0: Contact Info */}
          {step === 0 && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-1">Contact Information</h3>
              <p className="text-sm text-muted-foreground mb-4">Provide your contact details and let us know what type of inquiry this is.</p>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input id="full_name" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Inquiry Type *</Label>
                <Select value={form.inquiry_type} onValueChange={(v) => updateField("inquiry_type", v)}>
                  <SelectTrigger><SelectValue placeholder="Select inquiry type" /></SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {isOrgReferral && (
                <div className="space-y-4 border-t border-border pt-6">
                  <h4 className="font-heading font-semibold text-base text-foreground">Organization Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="org_name">Organization Name</Label>
                    <Input id="org_name" value={form.organization_name} onChange={(e) => updateField("organization_name", e.target.value)} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="org_contact">Contact Person</Label>
                      <Input id="org_contact" value={form.organization_contact} onChange={(e) => updateField("organization_contact", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org_phone">Organization Phone</Label>
                      <Input id="org_phone" type="tel" value={form.organization_phone} onChange={(e) => updateField("organization_phone", e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(1)} disabled={!canProceedStep0} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Situation */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-1">Your Situation</h3>
              <p className="text-sm text-muted-foreground mb-4">Help us understand the housing need so we can review your inquiry effectively.</p>
              <div className="space-y-2">
                <Label htmlFor="housing_situation">Current Housing Situation</Label>
                <Input id="housing_situation" placeholder="e.g., currently in shelter, recently released, couch surfing" value={form.current_housing_situation} onChange={(e) => updateField("current_housing_situation", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral_source">Referral Source</Label>
                <Input id="referral_source" placeholder="e.g., parole officer, case manager, self-referral" value={form.referral_source} onChange={(e) => updateField("referral_source", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Program Interest</Label>
                <Select value={form.program_interest} onValueChange={(v) => updateField("program_interest", v)}>
                  <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                  <SelectContent>
                    {programOptions.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Summary of Need *</Label>
                <Textarea id="summary" rows={5} placeholder="Please describe the housing need, goals, and any relevant circumstances. The more detail you provide, the better we can evaluate your inquiry." value={form.summary_of_need} onChange={(e) => updateField("summary_of_need", e.target.value)} />
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(0)} className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  Review <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-1">Review & Submit</h3>
              <p className="text-sm text-muted-foreground mb-4">Please review your information before submitting.</p>
              <div className="bg-muted rounded-lg p-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="text-foreground font-medium">{form.full_name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email:</span><span className="text-foreground font-medium">{form.email}</span></div>
                {form.phone && <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="text-foreground font-medium">{form.phone}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Inquiry Type:</span><span className="text-foreground font-medium capitalize">{form.inquiry_type?.replace(/_/g, " ")}</span></div>
                {form.current_housing_situation && <div className="flex justify-between"><span className="text-muted-foreground">Current Situation:</span><span className="text-foreground font-medium">{form.current_housing_situation}</span></div>}
                {form.program_interest && <div className="flex justify-between"><span className="text-muted-foreground">Program Interest:</span><span className="text-foreground font-medium capitalize">{form.program_interest?.replace(/_/g, " ")}</span></div>}
                {isOrgReferral && form.organization_name && <div className="flex justify-between"><span className="text-muted-foreground">Organization:</span><span className="text-foreground font-medium">{form.organization_name}</span></div>}
              </div>
              {form.summary_of_need && (
                <div className="bg-muted rounded-lg p-6 text-sm">
                  <span className="text-muted-foreground block mb-2">Summary of Need:</span>
                  <p className="text-foreground">{form.summary_of_need}</p>
                </div>
              )}
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="consent"
                  checked={form.consent_to_contact}
                  onCheckedChange={(checked) => updateField("consent_to_contact", checked)}
                />
                <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I consent to being contacted by RE Jones Global Housing regarding this inquiry. I understand that submitting this form does not guarantee housing placement and that all inquiries are subject to internal review.
                </Label>
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} disabled={!canSubmit || loading} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  {loading ? "Submitting..." : "Submit Inquiry"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6 max-w-lg mx-auto">
          All inquiries are treated with confidentiality and respect. Submitting an inquiry does not guarantee placement. RE Jones Global Housing reviews all submissions on a case-by-case basis.
        </p>
      </section>
    </div>
  );
}