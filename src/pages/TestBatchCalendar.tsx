import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import kuriosLogo from "@/assets/kurios-logo.png";

const TestBatchCalendar = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // Lazy load iframe when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    if (iframeContainerRef.current) {
      observer.observe(iframeContainerRef.current);
    }

    // Also load after a short delay as fallback
    const timeout = setTimeout(() => setShouldLoadIframe(true), 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // Load HighLevel script only when iframe is about to load
  useEffect(() => {
    if (!shouldLoadIframe) return;
    
    const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [shouldLoadIframe]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-2 border-border">
        <div className="container-kurios">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={kuriosLogo} 
                alt="KURIOS" 
                className="h-10 md:h-10 w-auto" 
                width="160"
                height="40"
              />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="min-h-[calc(100vh-80px)] py-12">
          <div className="container-kurios">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 mb-6">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-mono text-sm uppercase tracking-wider">
                    Qualified
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary-foreground mb-4">
                  Based on your answers, we should talk.
                </h2>
                <p className="text-lg text-muted-foreground">
                  Pick a time below for a 30-minute call. We'll walk through your current setup and see if there's a fit.
                </p>
              </div>

              <div 
                ref={iframeContainerRef}
                className="bg-card border-2 border-border p-2 sm:p-6 -mx-4 sm:mx-0 animate-fade-in-up animation-delay-200"
                style={{ minHeight: "600px" }}
              >
                {!iframeLoaded && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="ml-3 text-muted-foreground">Loading calendar...</span>
                  </div>
                )}
                {shouldLoadIframe && (
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/Ghy9ldvFnYt7IB5yKDfV" 
                    style={{ 
                      width: "100%", 
                      minHeight: "1000px", 
                      border: "none", 
                      overflow: "hidden",
                      display: iframeLoaded ? "block" : "none"
                    }}
                    scrolling="no"
                    id="vkuoeK55ojaSIUInFqX7_1770852443848"
                    title="Book a Discovery Call"
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                  />
                )}
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="outline" className="font-mono uppercase tracking-wide">
                  <Link to="/">
                    Return to Homepage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TestBatchCalendar;
