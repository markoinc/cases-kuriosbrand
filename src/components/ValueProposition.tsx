import { CheckCircle, XCircle, Sparkles } from "lucide-react";

const ValueProposition = () => {
  const benefits = [
    "Convert Demand Into Closed Cases",
    "We Fund Your Marketing Spend",
    "Launch in 5-7 Days, Start Signing Cases"
  ];

  const noList = [
    "No monthly retainers",
    "No long-term contracts",
    "No upfront setup fees"
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative overflow-hidden" id="value">
      <div className="container-kurios">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-mono font-medium text-accent uppercase tracking-wide">Why Choose Kurios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
            Stop Chasing Leads. Start Signing Cases.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit}
              className="flex items-start gap-4 p-6 bg-card border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(218_100%_60%/0.15)] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <p className="text-lg sm:text-xl font-semibold text-foreground leading-snug">
                {benefit}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card border-2 border-border p-8 sm:p-10 animate-fade-in-up animation-delay-300">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">What You Won't Find Here</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {noList.map((item) => (
              <div 
                key={item}
                className="flex items-center gap-3 justify-center p-4 bg-destructive/5 border-2 border-destructive/20"
              >
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <span className="text-base font-medium text-foreground font-mono">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center animate-fade-in-up animation-delay-400">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 border-2 border-primary/20">
            <div className="w-2 h-2 bg-accent animate-pulse" />
            <p className="text-base sm:text-lg text-foreground font-mono">
              <span className="text-primary font-bold">~$3,000 Avg Cost Per Signed Case</span> — Measurable outcomes, not just leads
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
