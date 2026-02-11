import kuriosLogo from "@/assets/kurios-logo.png";
import { Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "About Mark", href: "#founder" },
    { label: "FAQ", href: "#faq" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "TCPA Compliance", href: "/tcpa" },
    { label: "ABA Disclaimer", href: "/aba-disclaimer" },
  ];

  return (
    <footer className="bg-charcoal section-padding border-t-2 border-border">
      <div className="container-kurios">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left">
            <img
              src={kuriosLogo}
              alt="KURIOS"
              className="h-8 sm:h-10 w-auto mb-4 brightness-0 invert mx-auto sm:mx-0"
              width="120"
              height="40"
              loading="lazy"
              decoding="async"
            />
            <p className="text-primary-foreground/70 text-sm font-mono mb-4">
              Exclusive, OTP-verified MVA leads for growth-minded personal injury law firms.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              <a
                href="https://www.linkedin.com/in/mark-gundrum-kurios/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/kuriosleads/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-primary-foreground font-bold mb-4 font-mono uppercase text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="text-primary-foreground font-bold mb-4 font-mono uppercase text-sm tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/60 text-sm font-mono mb-2">
            © 2025 KuriosBrand LLC. All Rights Reserved.
          </p>
          <p className="text-primary-foreground/50 text-xs font-mono max-w-2xl mx-auto">
            KURIOS is a lead generation service provider. We are not a law firm and do not provide legal advice. 
            Attorney advertising rules and regulations vary by state.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
