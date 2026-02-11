import { ArrowRight, Users } from "lucide-react";

const TrustBar = () => {
  const logos = [
    "TrustedForm",
    "Jornaya",
    "TCPA Compliant",
    "SOC 2",
    "HIPAA Ready",
  ];
  
  const retentionStat = "87% of partners renew after 90 days";

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-card border-y-2 border-border py-4 sm:py-5">
      <div className="container-kurios">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Mobile: Retention stat + Auto-scrolling slider */}
          <div className="w-full sm:hidden">
            <div className="flex items-center justify-center gap-2 text-accent font-mono font-semibold text-sm mb-3">
              <Users className="h-4 w-4" />
              <span>{retentionStat}</span>
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-8 animate-scroll-left">
                {duplicatedLogos.map((logo, index) => (
                  <div 
                    key={index}
                    className="text-sm font-mono text-muted-foreground opacity-70 whitespace-nowrap flex-shrink-0"
                  >
                    [{logo}]
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Static display with proper spacing */}
          <div className="hidden sm:flex items-center gap-8">
            {/* Retention stat - prominent */}
            <div className="flex items-center gap-2 text-accent font-mono font-semibold text-sm whitespace-nowrap border-r border-border pr-8">
              <Users className="h-4 w-4" />
              <span>{retentionStat}</span>
            </div>
            {logos.map((logo, index) => (
              <div 
                key={index}
                className="text-sm font-mono text-muted-foreground opacity-50 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default whitespace-nowrap"
              >
                [{logo}]
              </div>
            ))}
          </div>

          {/* CTA */}
          <a 
            href="/qualify"
            className="flex items-center gap-2 text-primary font-mono font-semibold text-sm hover:text-accent transition-colors group whitespace-nowrap"
          >
            <span>APPLY_NOW</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
