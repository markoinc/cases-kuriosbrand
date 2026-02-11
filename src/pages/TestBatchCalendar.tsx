import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import kuriosLogo from "@/assets/kurios-logo.png";

const TestBatchCalendar = () => {
  // Load HighLevel script on mount
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-2 border-border">
        <div className="container-kurios">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={kuriosLogo} alt="KURIOS" className="h-10 md:h-10 w-auto" />
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

              <div className="bg-card border-2 border-border p-2 sm:p-6 -mx-4 sm:mx-0 animate-fade-in-up animation-delay-200">
                <iframe 
                  src="https://api.leadconnectorhq.com/widget/booking/Ghy9ldvFnYt7IB5yKDfV" 
                  style={{ width: "100%", minHeight: "1000px", border: "none", overflow: "hidden" }}
                  scrolling="no"
                  id="vkuoeK55ojaSIUInFqX7_1770852443848"
                  title="Book a Discovery Call"
                />
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
