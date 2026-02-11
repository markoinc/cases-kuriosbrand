import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, FileSignature, ArrowRight, Shield, Zap, Users } from "lucide-react";

const ServiceTiers = () => {
  const tiers = [
    {
      tier: "Tier 1",
      name: "OTP-Qualified Exclusive Leads",
      description: "For firms with strong in-house intake teams",
      icon: Shield,
      features: [
        "One-time-password verified",
        "TCPA compliant documentation",
        "100% exclusive delivery",
        "15% avg conversion rate on leads",
        "TrustedForm & Jornaya certified",
        "$2,000 avg cost per case"
      ],
      ideal: "Firms with 3+ dedicated intake reps",
      highlight: false
    },
    {
      tier: "Tier 2",
      name: "Qualified Warm Handoffs",
      description: "Eliminate 'your leads suck' objections forever",
      icon: Phone,
      features: [
        "Pre-qualified by our MVA intake team",
        "Live transfers during business hours",
        "50% conversion rate on transfers",
        "Intent verification before transfer",
        "Recorded calls for quality assurance",
        "$2,500 avg cost per case"
      ],
      ideal: "Firms struggling with lead response time",
      highlight: false
    },
    {
      tier: "Tier 3",
      name: "Signed Cases Delivered",
      description: "Full intake execution — click to signed retainer",
      icon: FileSignature,
      features: [
        "We close the retainer for you",
        "$3,000 avg cost per signed case",
        "87% of partners renew after 90 days",
        "State-specific compliance guardrails",
        "Zero intake burden on your team"
      ],
      ideal: "Firms who want cases, not leads",
      highlight: true
    }
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative overflow-hidden" id="service-tiers">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-kurios relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">3-Tier Service Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
              Choose Your Level of Support
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Whether you need verified leads, warm transfers, or full case closing — we scale with your intake capacity.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {tiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative flex flex-col p-6 sm:p-8 border-2 transition-all duration-300 animate-fade-in-up ${
                  tier.highlight 
                    ? 'bg-primary border-primary shadow-[0_0_8px_hsl(218_100%_60%/0.08)]' 
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-[0_0_10px_hsl(218_100%_60%/0.08)]'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 border-2 flex-shrink-0 ${
                      tier.highlight 
                        ? 'bg-primary-foreground/10 border-primary-foreground/30' 
                        : 'bg-primary/10 border-primary/30'
                    }`}>
                      <tier.icon className={`h-7 w-7 ${tier.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    
                    <span className={`text-base font-mono font-bold uppercase tracking-wide ${
                      tier.highlight ? 'text-primary-foreground/90' : 'text-foreground'
                    }`}>
                      {tier.tier}
                    </span>
                  </div>
                  
                  <h3 className={`text-xl sm:text-2xl font-bold uppercase mt-1 mb-2 ${
                    tier.highlight ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {tier.name}
                  </h3>
                  
                  <p className={`text-sm ${tier.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          tier.highlight ? 'text-primary-foreground' : 'text-accent'
                        }`} />
                        <span className={`text-sm ${tier.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t ${tier.highlight ? 'border-primary-foreground/20' : 'border-border'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className={`h-4 w-4 ${tier.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`} />
                    <span className={`text-xs font-mono ${tier.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      Ideal for: {tier.ideal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up animation-delay-300">
            <Button 
              size="lg" 
              className="btn-hover w-full sm:w-auto max-w-full min-w-0 whitespace-normal text-center text-base sm:text-lg px-6 sm:px-10 py-6 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_10px_hsl(218_100%_60%/0.15)] font-bold uppercase tracking-wide"
              asChild
            >
              <a href="/qualify">
                Apply to Sign More Cases
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;
