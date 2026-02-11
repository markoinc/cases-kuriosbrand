import { DollarSign, Users, Target, FileCheck, Scale, Wallet, FileSignature } from "lucide-react";

const PartnershipModel = () => {
  const kuriosDoes = [
    { icon: DollarSign, text: "We fund the marketing & ad spend." },
    { icon: Target, text: "We generate high-intent demand." },
    { icon: FileCheck, text: "We qualify, verify & convert prospects." },
  ];

  const youDo = [
    { icon: Users, text: "You receive signed cases, ready to litigate or settle." },
    { icon: FileSignature, text: "We already closed the retainer." },
    { icon: Wallet, text: "You collect the settlement." },
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-kurios relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30 mb-4">
              <Scale className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono font-medium text-accent uppercase tracking-wide">The Partnership Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
              We Own The Front End.
            </h2>
            <p className="text-xl sm:text-2xl text-primary font-bold">
              You focus on winning cases.
            </p>
          </div>

          {/* Split Cards */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Column 1: What Kurios Does */}
            <div className="bg-card border-2 border-border p-8 sm:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(218_100%_60%/0.15)] animate-fade-in-up">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 border-2 border-primary/30">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground uppercase">What Kurios Does</h3>
                  <p className="text-sm font-mono text-muted-foreground">[WE_TAKE_THE_RISK]</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {kuriosDoes.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-2 bg-primary/5 border-2 border-primary/20 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: What You Do */}
            <div className="bg-primary border-2 border-primary p-8 sm:p-10 shadow-[0_0_30px_hsl(218_100%_60%/0.3)] animate-fade-in-up animation-delay-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary-foreground/10 border-2 border-primary-foreground/30">
                  <Scale className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground uppercase">What You Do</h3>
                  <p className="text-sm font-mono text-primary-foreground/70">[YOU_TAKE_THE_PROFIT]</p>
                </div>
              </div>
              
              <div className="space-y-5">
                {youDo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-2 bg-primary-foreground/10 border-2 border-primary-foreground/20 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-primary-foreground font-medium text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipModel;
