import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// Use optimized WebP images from public folder
const kuriosLogo = "/kurios-logo.webp";
const markGundrum = "/mark-gundrum-opt.webp";
import { supabase } from "@/integrations/supabase/client";

interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface FormData {
  email: string;
  position: string;
  firmUrl: string;
}

const Qualify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    position: "",
    firmUrl: "",
  });
  const [certificationChecked, setCertificationChecked] = useState(false);
  const [utmParams, setUtmParams] = useState<UtmParams>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Capture UTM parameters on page load
  useEffect(() => {
    const params: UtmParams = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
    
    utmKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    });
    
    if (Object.keys(params).length > 0) {
      setUtmParams(params);
      console.log("UTM params captured:", params);
    }
  }, [searchParams]);

  // Preload HighLevel script for faster calendar load
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://link.msgsndr.com/js/form_embed.js";
    link.as = "script";
    document.head.appendChild(link);
  }, []);

  // Send webhook via edge function proxy
  const sendToWebhook = async (payload: Record<string, unknown>) => {
    try {
      console.log("Sending webhook payload:", payload);
      
      const { data, error } = await supabase.functions.invoke('webhook-proxy', {
        body: payload,
      });
      
      if (error) {
        console.error("Webhook error:", error);
      } else {
        console.log("Webhook sent successfully:", data);
      }
    } catch (error) {
      console.error("Webhook submission error:", error);
    }
  };

  const isFormValid = () => {
    const emailValid = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const positionValid = formData.position.trim() !== "";
    return emailValid && positionValid && certificationChecked;
  };

  const handleSubmit = async () => {
    if (!isFormValid() || isSubmitting) return;
    
    setIsSubmitting(true);

    // Fire Meta Pixel AddToCart event if fbq exists
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'Qualification Form Submit',
        content_category: 'MVA Lead Gen',
      });
    }

    // Send to webhook
    const payload = {
      email: formData.email,
      position: formData.position,
      firm_url: formData.firmUrl,
      source: "cases_subdomain",
      submitted_at: new Date().toISOString(),
      ...utmParams,
    };
    
    await sendToWebhook(payload);

    // Navigate to calendar
    navigate("/test-batch-calendar");
  };

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
        <section className="min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden py-8 lg:py-0">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 blur-[30px] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/15 blur-[50px] pointer-events-none" />
          
          <div className="container-kurios relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Founder Image - hidden on mobile */}
              <div className="hidden lg:flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[30px] scale-110" />
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 overflow-hidden border-4 border-primary/40 shadow-[0_0_30px_hsl(218_100%_60%/0.15)]">
                    <img 
                      src={markGundrum} 
                      alt="Mark Gundrum - Founder of Kurios"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary px-4 py-2 font-mono text-sm text-primary-foreground">
                    MARK GUNDRUM
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in-up animation-delay-200">
                <div className="inline-block bg-primary/10 border border-primary/30 px-4 py-2 mb-4 lg:mb-6">
                  <span className="text-primary font-mono text-sm uppercase tracking-wider">
                    Book Your Strategy Call
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-primary-foreground leading-tight mb-4 lg:mb-6">
                  Ready to Scale Your{" "}
                  <span className="text-primary">MVA Caseload?</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
                  Enter your details below and pick a time that works for you.
                </p>

                <div className="max-w-md mx-auto lg:mx-0 space-y-3">
                  <Input
                    type="email"
                    placeholder="Work email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 lg:h-14 text-base lg:text-lg px-4 lg:px-6 bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/60"
                  />
                  <Input
                    type="text"
                    placeholder="Your role (e.g., Partner, Marketing Director)"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="h-12 lg:h-14 text-base lg:text-lg px-4 lg:px-6 bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/60"
                  />
                  <Input
                    type="url"
                    placeholder="Law firm website"
                    value={formData.firmUrl}
                    onChange={(e) => setFormData({ ...formData, firmUrl: e.target.value })}
                    className="h-12 lg:h-14 text-base lg:text-lg px-4 lg:px-6 bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/60"
                  />
                  <div className="flex items-start space-x-3 text-left">
                    <Checkbox
                      id="certification"
                      checked={certificationChecked}
                      onCheckedChange={(checked) => setCertificationChecked(checked === true)}
                      className="mt-1 h-5 w-5 border-2 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label 
                      htmlFor="certification" 
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I certify that I am a law firm representative interested in MVA cases and leads, and I am <strong className="text-foreground">NOT</strong> an agency or vendor trying to sell services.
                    </Label>
                  </div>
                  <Button 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full btn-hover text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_30px_hsl(218_100%_60%/0.4)] font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Loading..." : "Book My Call"}
                    <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>

                <p className="mt-4 lg:mt-6 text-muted-foreground font-mono text-sm">
                  ⏱ Takes less than 2 minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Qualify;
