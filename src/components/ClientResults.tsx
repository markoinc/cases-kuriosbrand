import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, TrendingUp, DollarSign, Users, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";

interface ClientResult {
  state: string;
  stateCode: string;
  costPerCase: string;
  conversionRate: string;
  casesPerMonth: string;
  highlight: string;
}

const clientResults: ClientResult[] = [
  {
    state: "Texas",
    stateCode: "TX",
    costPerCase: "$1,700-$2,000",
    conversionRate: "15%",
    casesPerMonth: "20+",
    highlight: "500+ cases signed through partnerships"
  },
  {
    state: "Florida",
    stateCode: "FL",
    costPerCase: "$1,200",
    conversionRate: "5%+",
    casesPerMonth: "30+",
    highlight: "Active client since early 2020"
  },
  {
    state: "Arizona / Utah",
    stateCode: "AZ/UT",
    costPerCase: "$1,200",
    conversionRate: "5%+",
    casesPerMonth: "80+",
    highlight: "Highest volume region"
  },
  {
    state: "Louisiana",
    stateCode: "LA",
    costPerCase: "<$2,000",
    conversionRate: "5%+",
    casesPerMonth: "30+",
    highlight: "Client since March 2021"
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    costPerCase: "$1,854",
    conversionRate: "15-20%",
    casesPerMonth: "15+",
    highlight: "Philadelphia metro focus"
  },
  {
    state: "Georgia",
    stateCode: "GA",
    costPerCase: "<$2,000",
    conversionRate: "15-25%",
    casesPerMonth: "20+",
    highlight: "$200-$350 cost per lead"
  },
  {
    state: "New Mexico",
    stateCode: "NM",
    costPerCase: "$2,000",
    conversionRate: "15%",
    casesPerMonth: "10+",
    highlight: "High-value trucking case focus"
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    costPerCase: "<$1,500",
    conversionRate: "15%",
    casesPerMonth: "15+",
    highlight: "Client since May 2020"
  },
  {
    state: "New York",
    stateCode: "NY",
    costPerCase: "<$2,000",
    conversionRate: "15%",
    casesPerMonth: "10+",
    highlight: "Expanding firm partnerships"
  }
];

const ClientResults = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { state: userState, stateCode: userStateCode, loading: geoLoading } = useGeoLocation();

  // Reorder results to show user's state first if it exists
  const orderedResults = useMemo(() => {
    if (geoLoading || !userState) return clientResults;
    
    const matchIndex = clientResults.findIndex(
      (result) => 
        result.state.toLowerCase() === userState.toLowerCase() ||
        result.stateCode === userStateCode ||
        result.state.toLowerCase().includes(userState.toLowerCase())
    );
    
    if (matchIndex === -1) return clientResults;
    
    const matched = clientResults[matchIndex];
    const rest = clientResults.filter((_, i) => i !== matchIndex);
    return [matched, ...rest];
  }, [userState, userStateCode, geoLoading]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const delay = currentIndex === 0 ? 5000 : 4000;
    
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % orderedResults.length);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isAutoPlaying, orderedResults.length, currentIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + orderedResults.length) % orderedResults.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % orderedResults.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const current = orderedResults[currentIndex];
  const isUserState = !geoLoading && userState && (
    current.state.toLowerCase() === userState.toLowerCase() ||
    current.stateCode === userStateCode ||
    current.state.toLowerCase().includes(userState.toLowerCase())
  );

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-charcoal relative overflow-hidden" id="client-results">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-kurios relative">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">Partner Performance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
            Real Numbers From Real Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Performance data from active campaigns in 30+ states.
          </p>
        </div>

        {/* Client Tenure Callout */}
        <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-100">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-2 border-accent/30">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent font-mono">Many clients with us for 4+ years</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          {/* Main result card */}
          <div className="relative bg-card border-2 border-border p-6 sm:p-8 shadow-[0_0_30px_hsl(218_100%_60%/0.1)] min-h-[280px] transition-all duration-300 hover:border-primary/50">
            {/* State badge */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-foreground">{current.state}</span>
              <span className="bg-primary/10 border-2 border-primary/30 px-3 py-1 text-sm text-primary font-mono font-medium">
                {current.stateCode}
              </span>
              {isUserState && (
                <span className="bg-accent/20 border-2 border-accent/40 px-2 py-0.5 text-xs text-accent font-bold uppercase tracking-wide animate-pulse">
                  Your State
                </span>
              )}
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
              <div className="text-center p-3 sm:p-4 bg-muted border-2 border-border">
                <DollarSign className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-lg sm:text-2xl font-bold text-foreground font-mono">{current.costPerCase}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">Per Case</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-muted border-2 border-border">
                <TrendingUp className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-lg sm:text-2xl font-bold text-foreground font-mono">{current.conversionRate}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">Conversion</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-muted border-2 border-border">
                <Users className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-lg sm:text-2xl font-bold text-foreground font-mono">{current.casesPerMonth}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">Cases/Mo</p>
              </div>
            </div>

            {/* Highlight */}
            <div className="bg-accent/10 border-l-4 border-accent px-4 py-3">
              <p className="text-foreground font-medium">{current.highlight}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="border-2 border-border hover:border-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {orderedResults.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-primary w-6" 
                      : "bg-border w-2 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to ${orderedResults[index].state} results`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="border-2 border-border hover:border-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground/70 text-center mt-8 max-w-2xl mx-auto italic font-mono">
            *Results reflect established partnerships. Many clients have been with us for years, resulting in optimized costs. New clients may see different initial performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientResults;
