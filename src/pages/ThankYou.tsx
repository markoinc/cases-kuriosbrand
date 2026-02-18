import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Calendar } from "lucide-react";

const kuriosLogo = "/kurios-logo.webp";

const ThankYou = () => {
  // Fire Schedule pixel when thank you page loads
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Schedule', {
        content_name: 'Discovery Call Booked',
        content_category: 'MVA Lead Gen',
        status: 'confirmed',
      });
      console.log('[Meta Pixel] Schedule event fired - thank you page');
    }
  }, []);

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

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="container-kurios">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-8 animate-fade-in-up">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 animate-fade-in-up animation-delay-100">
              You're All Set!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
              Your discovery call has been booked. Check your email for the calendar invite and meeting details.
            </p>
            
            <div className="bg-card border-2 border-border p-6 mb-8 animate-fade-in-up animation-delay-300">
              <div className="flex items-center justify-center gap-3 text-primary">
                <Calendar className="h-6 w-6" />
                <span className="font-mono text-lg">Calendar invite sent to your email</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button asChild size="lg" className="font-mono uppercase tracking-wide">
                <Link to="/">
                  Back to Homepage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
