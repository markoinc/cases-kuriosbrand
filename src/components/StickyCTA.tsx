import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the header height (~80px)
      // This means the header would have "disappeared" if it wasn't sticky
      const headerHeight = 80;
      setIsVisible(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border-t-2 border-primary shadow-lg">
        <div className="container-kurios py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-sm md:text-base font-mono font-semibold text-foreground">
                Ready to scale your caseload?
              </p>
            </div>
            <Button 
              className="btn-hover border-2 border-primary font-mono uppercase tracking-wide flex-1 sm:flex-none" 
              asChild
            >
              <a href="/qualify" className="flex items-center justify-center gap-2">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
// Force deploy 1769923563
