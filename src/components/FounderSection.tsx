import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import markGundrum from "@/assets/mark-gundrum.png";

const FounderSection = () => {
  return (
    <section className="bg-charcoal section-padding relative overflow-x-hidden" id="founder">
      <div className="hidden sm:block absolute top-20 right-10 w-72 h-72 bg-primary/15 blur-[50px] pointer-events-none" />
      
      <div className="container-kurios relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-foreground uppercase tracking-tight">
              Meet Your Growth Partner
            </h2>
          </div>

          <div className="bg-card border-2 border-border p-6 sm:p-8 md:p-12 animate-fade-in-up animation-delay-200 hover:border-primary/50 transition-all hover:shadow-[0_0_25px_hsl(218_100%_60%/0.15)]">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 overflow-hidden border-2 border-primary/30">
                  <img 
                    src={markGundrum} 
                    alt="Mark Gundrum - Founder of Kurios"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2 uppercase">
                  Mark Gundrum
                </h3>
                <p className="text-primary font-mono font-medium mb-4">
                  Founder, KuriosBrand LLC
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Mark Gundrum, founder of Kurios, brings years of legal marketing and performance lead generation experience. He's committed to helping growth-minded law practices compete—and win—with data, speed, and client care.
                </p>

                <Button 
                  className="btn-hover border-2 border-primary font-mono uppercase tracking-wide"
                  asChild
                >
                  <a href="/qualify">
                    Apply to Sign More Cases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
