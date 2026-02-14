import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Clock, CheckCircle, FileSignature } from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";

// Lazy load heavy animations to improve LCP
const DataFlowAnimation = lazy(() => import("@/components/DataFlowAnimation"));

const mockPayloads = [
  {
    event: "LEAD_CAPTURED",
    data: { source: "Meta Ads", verified: true }
  },
  {
    event: "OTP_VERIFIED",
    data: { phone: "+1 (555) ***-7842", status: "confirmed" }
  },
  {
    event: "INTAKE_QUALIFIED",
    data: { type: "MVA", injury_severity: "high" }
  },
  {
    event: "CASE_SIGNED",
    data: { retainer: "executed", crm: "Filevine" }
  }
];

const TerminalAnimation = () => {
  const [currentPayloadIndex, setCurrentPayloadIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<number[]>([0]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLines(prev => {
        if (prev.length >= 4) {
          setCurrentPayloadIndex(i => (i + 1) % mockPayloads.length);
          return [0];
        }
        return [...prev, prev.length];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const formatJSON = (obj: object) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div 
      ref={terminalRef}
      className="bg-charcoal border-2 border-primary/40 p-4 sm:p-6 font-mono text-sm shadow-[0_0_15px_hsl(218_100%_60%/0.1)] overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-destructive/80" />
          <div className="w-3 h-3 bg-yellow-500/80" />
          <div className="w-3 h-3 bg-green-500/80" />
        </div>
        <span className="text-muted-foreground text-xs ml-2 truncate">KURIOS_INTAKE_ENGINE</span>
      </div>

      {/* Terminal Content - Fixed height to prevent layout shift */}
      <div className="h-[200px] overflow-hidden">
        <div className="text-muted-foreground mb-3">
          <span className="text-accent">$</span> kurios --convert
        </div>
        
        <div className="space-y-2">
          {displayedLines.map((lineIndex) => {
            const payload = mockPayloads[(currentPayloadIndex + lineIndex) % mockPayloads.length];
            return (
              <div key={`${currentPayloadIndex}-${lineIndex}`} className="opacity-0 animate-[fade-in-up_0.3s_ease-out_forwards]">
                <div className="text-green-400 mb-1 text-xs">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">{payload.event}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <pre className="text-foreground/90 text-xs whitespace-pre-wrap break-all">
                  {formatJSON(payload.data)}
                </pre>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center gap-1 text-accent mt-2">
          <span>▶</span>
          <span className="animate-terminal-blink">_</span>
        </div>
      </div>
    </div>
  );
};

// Minimal terminal placeholder for instant LCP
const TerminalPlaceholder = () => (
  <div className="bg-charcoal border-2 border-primary/40 p-4 sm:p-6 font-mono text-sm shadow-[0_0_15px_hsl(218_100%_60%/0.1)] h-[276px]">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 bg-destructive/80" />
        <div className="w-3 h-3 bg-yellow-500/80" />
        <div className="w-3 h-3 bg-green-500/80" />
      </div>
      <span className="text-muted-foreground text-xs ml-2">KURIOS_INTAKE_ENGINE</span>
    </div>
    <div className="text-muted-foreground mb-3">
      <span className="text-accent">$</span> kurios --convert
    </div>
    <div className="text-green-400 text-xs">[LEAD_CAPTURED]</div>
    <pre className="text-foreground/90 text-xs">{"{"} "source": "Meta Ads" {"}"}</pre>
  </div>
);

const HeroSection = () => {
  const [showAnimations, setShowAnimations] = useState(false);
  
  // Delay heavy animations until after LCP
  useEffect(() => {
    const timer = requestIdleCallback(() => setShowAnimations(true), { timeout: 1000 });
    return () => cancelIdleCallback(timer);
  }, []);
  
  return (
    <section className="relative bg-charcoal py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden w-full">
      {/* Animated PI Data Flow Background - lazy loaded */}
      {showAnimations && (
        <Suspense fallback={null}>
          <DataFlowAnimation />
        </Suspense>
      )}
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/60 pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Glow accents - hidden on mobile to prevent overflow */}
      <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-primary/20 blur-[50px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-accent/15 blur-[30px] pointer-events-none" />
      
      <div className="container-kurios relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Headlines */}
          <div className="animate-fade-in-up min-w-0">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 border-2 border-primary/30">
                <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-primary font-mono">PI CASE ACQUISITION PARTNER</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 sm:mb-8 leading-[1.05] tracking-tight uppercase">
              <span className="block">WE SIGN MVA CASES.</span>
              <span className="block text-primary glow-text">YOU RECEIVE THEM.</span>
              <span className="block text-muted-foreground text-lg sm:text-3xl md:text-4xl font-bold mt-2">7 SIGNED CASES IN 30 DAYS</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Stop buying leads. Start receiving signed retainers. ~$2,900 per signed case. We fund the ads, run the intake, and deliver cases ready to litigate or settle.
            </p>

            {/* CTA */}
            <div className="mb-6">
              <Button 
                size="lg" 
                className="btn-hover w-full sm:w-auto max-w-full min-w-0 whitespace-normal text-center text-sm sm:text-xl px-6 sm:px-14 py-5 sm:py-8 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_10px_hsl(218_100%_60%/0.15)] font-bold uppercase tracking-wide"
                asChild
              >
              <a href="/qualify">
                  Apply for Signed Cases
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-6 sm:w-6" />
                </a>
              </Button>
            </div>

            {/* Anti-Risk Text */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent" />
                No Monthly Retainer
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent" />
                TCPA Compliant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent" />
                UPL-Aware Process
              </span>
            </div>
          </div>

          {/* Right Side - Live Intake Terminal */}
          <div className="animate-fade-in-up animation-delay-200 min-w-0">
            <div className="mb-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// LIVE INTAKE ENGINE</span>
            </div>
            {/* Show placeholder immediately, animate after idle */}
            {showAnimations ? <TerminalAnimation /> : <TerminalPlaceholder />}
            
            {/* Trust indicators below terminal */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm font-mono">87% Partner Retention</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileSignature className="h-4 w-4 text-accent" />
                <span className="text-sm font-mono">Closed Cases</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm font-mono">Ready to Litigate or Settle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
