import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Referrals", path: "/referral-process" },
  { label: "Partners", path: "/partners" },
  { label: "Impact", path: "/impact" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-sm bg-accent flex items-center justify-center">
              <span className="font-heading font-bold text-accent-foreground text-sm lg:text-base">RP</span>
            </div>
            <div className="leading-tight">
              <span className="font-heading font-semibold text-sm lg:text-base tracking-wide">REJG Legacy Properties</span>
              <span className="block text-[10px] lg:text-xs text-primary-foreground/70 tracking-widest uppercase">A RE Jones Global LLC Company</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-body font-medium transition-colors rounded-md ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-primary-foreground/80 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/apply">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase px-5">
                Housing Inquiry
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 text-sm font-body font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-accent bg-primary-foreground/5"
                    : "text-primary-foreground/80 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-primary-foreground/10">
              <Link to="/apply" onClick={() => setOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-sm tracking-wide uppercase">
                  Housing Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}