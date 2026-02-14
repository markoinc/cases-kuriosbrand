import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Target } from "lucide-react";

const TestBatchProtocol = () => {
  return (
    <section className="bg-charcoal py-14 sm:py-20 md:py-24 relative overflow-x-hidden" id="contact">
      {/* Background glow - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[30px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 blur-[30px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container-kurios relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30 mb-4">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono font-medium text-accent uppercase tracking-wide">Prove It First</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground uppercase tracking-tight mb-4 sm:mb-6 px-2">
              7 Signed Cases in 30 Days
            </h2>
            <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto px-4">
              No credits. No excuses. No fine print. We deliver signed MVA retainers to your firm — qualified, verified, ready for your docket. That's the standard.
            </p>
          </div>

          {/* Trust Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mb-10 animate-fade-in-up animation-delay-100">
            {["~$2,900 per signed case", "We fund all ad spend", "No retainers or setup fees"].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 text-primary-foreground/90">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-base sm:text-lg font-mono font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="text-center animate-fade-in-up animation-delay-200 px-4 sm:px-0">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground btn-hover w-full sm:w-auto max-w-full min-w-0 whitespace-normal text-center text-sm sm:text-xl px-6 sm:px-14 py-5 sm:py-7 h-auto border-2 border-accent shadow-[0_0_12px_hsl(218_100%_60%/0.2)] font-bold uppercase tracking-wide"
              asChild
            >
              <a href="/qualify">
                <Target className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                Apply for Signed Cases
                <ArrowRight className="ml-2 h-4 w-4 sm:h-6 sm:w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestBatchProtocol;
