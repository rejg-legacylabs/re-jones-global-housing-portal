import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import PageHero from "../components/shared/PageHero";
import { toast } from "sonner";

const categories = [
  { value: "general_inquiry", label: "General Inquiry" },
  { value: "partner_inquiry", label: "Partnership Inquiry" },
  { value: "referral_question", label: "Referral Question" },
  { value: "media_inquiry", label: "Media Inquiry" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry_category: "",
    message: "",
  });

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await base44.entities.ContactSubmission.create(form);
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        description="Have a question about our housing services, the referral process, or partnership opportunities? We're here to help. Reach out and our team will respond within 2–3 business days."
      />

      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">Get In Touch</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're an individual seeking housing information, a community organization interested in referring someone, or a potential partner — we welcome your inquiry.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-foreground mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground">Use the contact form to reach our team</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-foreground mb-1">Phone</h4>
                  <p className="text-sm text-muted-foreground">Available during business hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm text-foreground mb-1">Location</h4>
                  <p className="text-sm text-muted-foreground">Serving communities across our service area</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-muted rounded-lg p-6">
              <h4 className="font-heading font-semibold text-base text-foreground mb-2">Response Time</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We typically respond to contact form submissions within 2–3 business days. For urgent housing matters, please indicate this in your message.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-card border border-border rounded-lg p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">Message Sent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you for reaching out. Our team will review your message and respond within 2–3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 lg:p-10 space-y-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-1">Send a Message</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="c_name">Name *</Label>
                    <Input id="c_name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c_email">Email *</Label>
                    <Input id="c_email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="c_phone">Phone</Label>
                    <Input id="c_phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Inquiry Category</Label>
                    <Select value={form.inquiry_category} onValueChange={(v) => updateField("inquiry_category", v)}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c_message">Message *</Label>
                  <Textarea id="c_message" rows={6} placeholder="How can we help you?" value={form.message} onChange={(e) => updateField("message", e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase gap-2">
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}