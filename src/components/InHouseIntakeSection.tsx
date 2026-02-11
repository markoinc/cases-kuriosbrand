import { Button } from "@/components/ui/button";
import { Users, Target, Wrench, GraduationCap, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const InHouseIntakeSection = () => {
  const services = [
    {
      icon: Target,
      title: "Diagnose Intake Failures",
      description: "We audit your current intake process and identify exactly where cases are leaking from your pipeline."
    },
    {
      icon: Wrench,
      title: "Implement Proven SOPs",
      description: "Battle-tested intake scripts, objection handling frameworks, and follow-up sequences that convert."
    },
    {
      icon: Users,
      title: "Deploy CRM + Dialer",
      description: "Full tech stack setup including CRM configuration, dialer integration, and automation workflows."
    },
    {
      icon: GraduationCap,
      title: "Recruit & Train Reps",
      description: "We help you find, hire, and train high-performing intake specialists who understand PI law."
    }
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative overflow-hidden" id="build-intake-team">
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
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">Long-Term Partnership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
              Build Your Elite Intake Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Ready to stop outsourcing and own your intake? We help firms transition from outsourced intake 
              to an internal team that crushes — with ongoing support and optimization.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in-up animation-delay-100">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-card border-2 border-border p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(218_100%_60%/0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary/10 border-2 border-primary/30">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground uppercase mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Journey Path */}
          <div className="bg-card border-2 border-border p-8 sm:p-10 mb-12 animate-fade-in-up animation-delay-200">
            <h3 className="text-xl font-bold text-foreground uppercase mb-6 text-center">
              Your Path to Intake Independence
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground font-bold text-lg mb-3">
                  1
                </div>
                <h4 className="font-bold text-foreground mb-2">Start With Us</h4>
                <p className="text-sm text-muted-foreground">
                  We handle all intake while you focus on litigation
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground font-bold text-lg mb-3">
                  2
                </div>
                <h4 className="font-bold text-foreground mb-2">Hybrid Transition</h4>
                <p className="text-sm text-muted-foreground">
                  We train your team while co-managing overflow
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground font-bold text-lg mb-3">
                  3
                </div>
                <h4 className="font-bold text-foreground mb-2">Full Independence</h4>
                <p className="text-sm text-muted-foreground">
                  Your internal team runs the show with our support
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono text-foreground">Ongoing Optimization Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono text-foreground">Performance Benchmarking</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-mono text-foreground">Scalable Partnership</span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              className="btn-hover w-full sm:w-auto max-w-full min-w-0 whitespace-normal text-center text-base sm:text-lg px-6 sm:px-10 py-6 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_20px_hsl(218_100%_60%/0.3)] font-bold uppercase tracking-wide"
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

export default InHouseIntakeSection;
