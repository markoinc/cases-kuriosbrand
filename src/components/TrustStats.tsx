import { useEffect, useState, useRef } from "react";
import { Shield, Clock, Users, TrendingUp, DollarSign } from "lucide-react";

// Static value for leads delivered - no more random numbers
const LEADS_DELIVERED = 27500;

const stats = [
  {
    icon: Users,
    value: LEADS_DELIVERED,
    suffix: "+",
    label: "Leads Delivered",
    description: "OTP-verified MVA leads",
  },
  {
    icon: Clock,
    value: "87",
    suffix: "%",
    label: "Retention Rate",
    description: "Clients who stay & scale",
    isRange: true,
  },
  {
    icon: TrendingUp,
    value: "3-7",
    suffix: "x",
    label: "Avg. Client ROI",
    description: "Return on ad spend",
    isRange: true,
  },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

const StatCard = ({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) => {
  const numericValue = typeof stat.value === 'number' ? stat.value : 0;
  const count = useCountUp(numericValue, 2000, isVisible);
  const Icon = stat.icon;
  const isRange = 'isRange' in stat && stat.isRange;

  return (
    <div
      className="relative group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card border-2 border-border p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_10px_hsl(218_100%_60%/0.1)]">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border-2 border-primary/30 text-primary mb-4 group-hover:border-primary transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-1">
          {isRange ? stat.value : count}
          <span className="text-primary">{stat.suffix}</span>
        </div>
        <div className="font-semibold text-foreground mb-1 uppercase text-sm tracking-wide">{stat.label}</div>
        <div className="text-sm font-mono text-muted-foreground">{stat.description}</div>
      </div>
    </div>
  );
};

const TrustStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-muted">
      <div className="container-kurios">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 mb-4">
            <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">By The Numbers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tight">
            Results That Speak For Themselves
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We deliver verified, high-intent MVA leads that convert — backed by real performance data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border-2 border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">
              All leads include TrustedForm certificate & Jornaya LeadID
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
