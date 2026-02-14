import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// Optimized WebP from public folder
const kuriosLogo = "/kurios-logo.webp";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#founder" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b-2 ${
        isScrolled ? "bg-card/95 backdrop-blur-md border-border" : "bg-card border-transparent"
      }`}
    >
      <div className="container-kurios">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - LCP element, prioritized */}
          <a href="#" className="flex-shrink-0">
            <img 
              src={kuriosLogo} 
              alt="KURIOS" 
              className="h-10 md:h-10 w-auto"
              width="120"
              height="40"
              fetchPriority="high"
              decoding="sync"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-mono font-medium uppercase text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-hover border-2 border-primary font-mono uppercase tracking-wide" asChild>
              <a href="/qualify">
                Apply Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-mono font-medium uppercase text-sm tracking-wide py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="w-full mt-2 border-2 border-primary font-mono uppercase tracking-wide" asChild>
                <a href="/qualify">
                  Apply Now
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
