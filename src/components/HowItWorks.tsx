import { Filter, Rocket, Users, ArrowDown, FileSignature } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Filter,
      title: "Define Your Criteria",
      description: "Tell us your ideal case profile—location, injury severity, case value thresholds, intake capacity.",
    },
    {
      number: "02",
      icon: Rocket,
      title: "We Launch & Convert",
      description: "We handle demand generation, verification, qualification, and intake execution. You approve, we execute.",
    },
    {
      number: "03",
      icon: FileSignature,
      title: "Receive Signed Cases",
      description: "Signed retainers delivered directly to your CRM. No intake burden. Ready to litigate.",
    }
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative" id="how-it-works">
      <div className="container-kurios relative">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tight">
            How Does It Work?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto font-mono">
            From click to closed case in 3 steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-0">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div 
                  className="bg-card border-2 border-border p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(218_100%_60%/0.15)] animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-20 bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                        <step.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xs border-2 border-primary">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="text-center sm:text-left flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 uppercase">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-base sm:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden sm:flex justify-center py-4">
                    <ArrowDown className="h-6 w-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
