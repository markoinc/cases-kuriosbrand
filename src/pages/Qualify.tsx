import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
// Use optimized WebP images from public folder
const kuriosLogo = "/kurios-logo.webp";
const markGundrum = "/mark-gundrum-opt.webp";

const Qualify = () => {
  const navigate = useNavigate();
  const [certificationChecked, setCertificationChecked] = useState(false);

  // Preload HighLevel script for faster calendar load
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://link.msgsndr.com/js/form_embed.js";
    link.as = "script";
    document.head.appendChild(link);
  }, []);

  const handleSubmit = () => {
    if (!certificationChecked) return;
    navigate("/test-batch-calendar");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-2 border-border">
        <div className="container-kurios">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={kuriosLogo} alt="KURIOS" className="h-10 md:h-10 w-auto" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden py-8 lg:py-0">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 blur-[30px] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/15 blur-[50px] pointer-events-none" />
          
          <div className="container-kurios relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Founder Image - hidden on mobile */}
              <div className="hidden lg:flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[30px] scale-110" />
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 overflow-hidden border-4 border-primary/40 shadow-[0_0_30px_hsl(218_100%_60%/0.15)]">
                    <img 
                      src={markGundrum} 
                      alt="Mark Gundrum - Founder of Kurios"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary px-4 py-2 font-mono text-sm text-primary-foreground">
                    MARK GUNDRUM
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in-up animation-delay-200">
                <div className="inline-block bg-primary/10 border border-primary/30 px-4 py-2 mb-4 lg:mb-6">
                  <span className="text-primary font-mono text-sm uppercase tracking-wider">
                    Book Your Strategy Call
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-primary-foreground leading-tight mb-4 lg:mb-6">
                  Ready to Scale Your{" "}
                  <span className="text-primary">MVA Caseload?</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
                  Confirm below and pick a time that works for you.
                </p>

                <div className="max-w-md mx-auto lg:mx-0 space-y-4">
                  <div className="flex items-start space-x-3 text-left p-4 bg-card/50 border border-border rounded-lg">
                    <Checkbox
                      id="certification"
                      checked={certificationChecked}
                      onCheckedChange={(checked) => setCertificationChecked(checked === true)}
                      className="mt-1 h-5 w-5 border-2 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label 
                      htmlFor="certification" 
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I certify that I am a law firm representative interested in MVA cases and leads, and I am <strong className="text-foreground">NOT</strong> an agency or vendor trying to sell services.
                    </Label>
                  </div>
                  <Button 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!certificationChecked}
                    className="w-full btn-hover text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_30px_hsl(218_100%_60%/0.4)] font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book My Call
                    <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>

                <p className="mt-4 lg:mt-6 text-muted-foreground font-mono text-sm">
                  ⏱ Takes less than 2 minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Qualify;
