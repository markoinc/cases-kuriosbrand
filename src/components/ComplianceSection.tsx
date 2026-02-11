import { Shield, Lock, FileCheck, Scale, CheckCircle, AlertTriangle } from "lucide-react";

const ComplianceSection = () => {
  const compliancePoints = [
    {
      icon: Lock,
      title: "TCPA Compliance",
      description: "Every lead includes proper consent documentation. TrustedForm certificates and Jornaya LeadID on every submission."
    },
    {
      icon: Shield,
      title: "OTP Verification",
      description: "One-time password verification confirms real phone numbers owned by real prospects with genuine intent."
    },
    {
      icon: Scale,
      title: "UPL-Aware Process",
      description: "Intake workflows designed with legal ethics in mind. We never provide legal advice or cross professional boundaries."
    },
    {
      icon: FileCheck,
      title: "State-Specific Guardrails",
      description: "Different states have different rules. Our intake protocols adapt to local bar requirements and regulations."
    }
  ];

  return (
    <section className="bg-charcoal py-16 sm:py-20 md:py-24 relative overflow-x-hidden" id="compliance">
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
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono font-medium text-accent uppercase tracking-wide">Compliance & Trust</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground uppercase tracking-tight mb-4">
              Built for Legal Compliance
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We understand the unique regulatory requirements of personal injury law. 
              Every process is designed with oversight, accountability, and compliance at the core.
            </p>
          </div>

          {/* Compliance Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in-up animation-delay-100">
            {compliancePoints.map((point, index) => (
              <div 
                key={index}
                className="bg-card border-2 border-border p-6 sm:p-8 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-accent/10 border-2 border-accent/30">
                    <point.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground uppercase mb-2">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Oversight Statement */}
          <div className="bg-muted border-2 border-border p-8 sm:p-10 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 p-3 bg-primary/10 border-2 border-primary/30">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground uppercase mb-3">
                  Oversight-First Process Design
                </h3>
                <p className="text-muted-foreground mb-4">
                  We build intake systems that protect your firm. Every call is recorded. Every lead is documented. 
                  Every compliance requirement is tracked. You maintain full visibility into the entire conversion pipeline.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm font-mono text-muted-foreground">Recorded Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm font-mono text-muted-foreground">Full Audit Trail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm font-mono text-muted-foreground">Real-Time Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-300">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-card border-2 border-border">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">TrustedForm Certified</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-card border-2 border-border">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">Jornaya LeadID</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-card border-2 border-border">
              <FileCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">TCPA Documentation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
