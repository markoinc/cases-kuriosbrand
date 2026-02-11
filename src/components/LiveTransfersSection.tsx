import { Phone, Users, TrendingUp, Headphones, Clock, CheckCircle } from "lucide-react";

const LiveTransfersSection = () => {
  const capabilities = [
    {
      icon: Users,
      title: "MVA-Trained Intake Team",
      description: "Not a generic call center. Our intake specialists understand personal injury law, case qualification, and how to convert hesitant prospects."
    },
    {
      icon: Phone,
      title: "Live Warm Transfers",
      description: "Prospects pre-qualified in real time and transferred directly to your intake team during business hours. No cold callbacks required."
    },
    {
      icon: TrendingUp,
      title: "50% Conversion on Transfers",
      description: "Average conversion from transfer to signed case. We track and optimize every metric."
    },
    {
      icon: Headphones,
      title: "Inbound & Outbound Flows",
      description: "We handle speed-to-lead on fresh prospects and work aged leads through strategic outbound campaigns."
    }
  ];

  return (
    <section className="bg-charcoal py-16 sm:py-20 md:py-24 relative overflow-x-hidden" id="live-transfers">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-kurios relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30 mb-4">
              <Phone className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono font-medium text-accent uppercase tracking-wide">Live Transfers & Case Conversion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground uppercase tracking-tight mb-4">
              We Don't Just Generate Leads.
            </h2>
            <p className="text-xl sm:text-2xl text-primary font-bold mb-4">
              We Convert Demand Into Signed Cases.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our MVA-trained intake team qualifies prospects in real time and delivers warm handoffs — 
              eliminating the "your leads suck" objection once and for all.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in-up animation-delay-100">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-card border-2 border-border p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(218_100%_60%/0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary/10 border-2 border-primary/30">
                    <capability.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground uppercase mb-2">{capability.title}</h3>
                    <p className="text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Differentiator */}
          <div className="bg-primary border-2 border-primary p-8 sm:p-10 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0 p-4 bg-primary-foreground/10 border-2 border-primary-foreground/30">
                <Clock className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground uppercase mb-2">
                  Speed-to-Lead That Actually Converts
                </h3>
                <p className="text-primary-foreground/80 text-lg">
                  We respond to leads in under 60 seconds. Our intake specialists verify intent, qualify the case, 
                  and transfer warm prospects directly to your team — or sign the retainer on your behalf.
                </p>
              </div>
            </div>
          </div>

          {/* White Label Note */}
          <div className="mt-8 text-center animate-fade-in-up animation-delay-300">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted border-2 border-border">
              <CheckCircle className="h-5 w-5 text-accent" />
              <p className="text-sm font-mono text-muted-foreground">
                All services can be <span className="text-primary font-semibold">white-labeled as your firm's intake team</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTransfersSection;
