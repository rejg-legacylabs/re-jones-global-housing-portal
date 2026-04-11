import { Link } from "react-router-dom";

const quickLinks = [
  { label: "About", path: "/about" },
  { label: "Housing Programs", path: "/programs" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Referral Process", path: "/referral-process" },
];

const supportLinks = [
  { label: "Partner Referrals", path: "/partners" },
  { label: "Housing Inquiry", path: "/apply" },
  { label: "Community Impact", path: "/impact" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center">
                <span className="font-heading font-bold text-accent-foreground text-base">RE</span>
              </div>
              <div className="leading-tight">
                <span className="font-heading font-semibold text-base tracking-wide">RE Jones Global</span>
                <span className="block text-xs text-primary-foreground/70 tracking-widest uppercase">Housing</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Providing structured, supportive housing pathways for individuals working to rebuild stability and move forward with dignity.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent mb-5">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-accent mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>RE Jones Global Housing</p>
              <p>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Send us a message →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} RE Jones Global. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Structured Housing. Restored Dignity. Stronger Communities.
          </p>
        </div>
      </div>
    </footer>
  );
}