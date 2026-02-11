import { Check, X, Zap } from "lucide-react";

const ComparisonTable = () => {
  const comparisons = [
    {
      feature: "Time to Launch",
      kurios: { text: "5-7 Days", status: "text-good" },
      internal: { text: "4-6 Weeks", status: "text-bad" },
      cheap: { text: "7-14 Days", status: "text-bad" },
      agency: { text: "2-4 Weeks", status: "text-bad" },
    },
    {
      feature: "Signed Case Delivery",
      kurios: { status: "good" },
      internal: { status: "good" },
      cheap: { status: "bad" },
      agency: { status: "bad" },
    },
    {
      feature: "Live Warm Transfers",
      kurios: { status: "good" },
      internal: { status: "good" },
      cheap: { status: "bad" },
      agency: { status: "bad" },
    },
    {
      feature: "MVA-Trained Intake Team",
      kurios: { status: "good" },
      internal: { text: "You hire & train", status: "text-neutral" },
      cheap: { status: "bad" },
      agency: { status: "bad" },
    },
    {
      feature: "What You Get",
      kurios: { text: "Signed retainers", status: "text-good" },
      internal: { text: "Varies widely", status: "text-neutral" },
      cheap: { text: "Cold leads", status: "text-bad" },
      agency: { text: "Leads only", status: "text-bad" },
    },
    {
      feature: "Pricing Model",
      kurios: { text: "Pay per signed case", status: "text-good" },
      internal: { text: "Salary + benefits + overhead", status: "text-bad" },
      cheap: { text: "Pay per lead", status: "text-neutral" },
      agency: { text: "Retainer + ad spend", status: "text-bad" },
    },
  ];

  const StatusIcon = ({ status, text }: { status: string; text?: string }) => {
    if (status === "good") return <Check className="h-6 w-6 text-accent mx-auto" strokeWidth={3} />;
    if (status === "bad") return <X className="h-6 w-6 text-red-500 mx-auto" strokeWidth={3} />;
    if (status === "text-good") return <span className="text-accent font-semibold italic">{text}</span>;
    if (status === "text-bad") return <span className="text-red-500 font-medium italic">{text}</span>;
    if (status === "text-neutral") return <span className="text-muted-foreground font-medium italic">{text}</span>;
    return null;
  };

  return (
    <section className="bg-charcoal py-16 sm:py-20 md:py-24 relative overflow-x-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-kurios relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">See The Difference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground uppercase tracking-tight">
              Why Firms Choose Kurios
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block animate-fade-in-up animation-delay-100">
            <div className="bg-card border-2 border-border overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-5 bg-muted border-b-2 border-border">
                <div className="p-6"></div>
                <div className="p-6 text-center bg-muted/80">
                  <span className="font-bold text-foreground uppercase text-lg tracking-wide">Kurios</span>
                </div>
                <div className="p-6 text-center">
                  <span className="font-medium text-muted-foreground text-sm">Internal Intake Team</span>
                </div>
                <div className="p-6 text-center">
                  <span className="font-medium text-muted-foreground text-sm">Cheap Lead Vendors</span>
                </div>
                <div className="p-6 text-center">
                  <span className="font-medium text-muted-foreground text-sm">Marketing Agency</span>
                </div>
              </div>

              {/* Table Body */}
              {comparisons.map((row, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-5 ${index !== comparisons.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="p-5 font-semibold text-foreground flex items-center text-sm">
                    {row.feature}
                  </div>
                  <div className="p-5 bg-muted/30 flex items-center justify-center text-center">
                    <StatusIcon status={row.kurios.status} text={row.kurios.text} />
                  </div>
                  <div className="p-5 flex items-center justify-center text-center">
                    <StatusIcon status={row.internal.status} text={row.internal.text} />
                  </div>
                  <div className="p-5 flex items-center justify-center text-center">
                    <StatusIcon status={row.cheap.status} text={row.cheap.text} />
                  </div>
                  <div className="p-5 flex items-center justify-center text-center">
                    <StatusIcon status={row.agency.status} text={row.agency.text} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4 animate-fade-in-up animation-delay-100">
            {comparisons.map((row, index) => (
              <div key={index} className="bg-card border-2 border-border overflow-hidden">
                <div className="p-4 bg-muted border-b-2 border-border">
                  <h3 className="font-mono font-bold text-foreground uppercase text-sm">{row.feature}</h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="p-4 bg-primary/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase">Kurios</span>
                    <StatusIcon status={row.kurios.status} text={row.kurios.text} />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Internal Team</span>
                    <StatusIcon status={row.internal.status} text={row.internal.text} />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Cheap Leads</span>
                    <StatusIcon status={row.cheap.status} text={row.cheap.text} />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Agency</span>
                    <StatusIcon status={row.agency.status} text={row.agency.text} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
