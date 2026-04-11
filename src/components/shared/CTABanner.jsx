import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTABanner({
  title = "Ready to Take the Next Step?",
  description = "Whether you're seeking housing support or looking to partner with us, we're here to help.",
  primaryLink = "/apply",
  primaryLabel = "Submit a Housing Inquiry",
  secondaryLink = "/contact",
  secondaryLabel = "Contact Us",
}) {
  return (
    <section className="bg-primary text-primary-foreground py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-5">
          {title}
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={primaryLink}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-8 gap-2">
              {primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={secondaryLink}>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body font-semibold text-sm tracking-wide uppercase px-8">
              {secondaryLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}