import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

type Stage = "hero" | "survey" | "thankyou" | "disqualified";

interface SurveyAnswers {
  email: string;
  position: string;
  firmUrl: string;
  volume: string;
  intake: string;
  costPerCase: string;
}

const Qualify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [stage, setStage] = useState<Stage>("hero");
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    email: "",
    position: "",
    firmUrl: "",
    volume: "",
    intake: "",
    costPerCase: "",
  });
  const [disqualifyReason, setDisqualifyReason] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [certificationChecked, setCertificationChecked] = useState(false);
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  const totalSteps = 3;

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

  // Send initial info when user starts the quiz
  const sendEmailToWebhook = async (data: { email: string; position: string; firmUrl: string }) => {
    const payload = {
      email: data.email,
      position: data.position,
      firm_url: data.firmUrl,
      source: "kurios_qualification_quiz",
      quiz_started_at: new Date().toISOString(),
    };
    await sendToWebhook(payload);
  };

  // Send full quiz data when user completes the quiz (after budget question)
  const sendQuizDataToWebhook = async (data: SurveyAnswers) => {
    // Map answers to human-readable values for HighLevel custom fields
    const volumeMap: Record<string, string> = {
      "building": "Building (5-10 cases/month)",
      "scaling": "Scaling (10-20 cases/month)",
      "established": "Established (20-40 cases/month)",
      "high-volume": "High Volume (40-75 cases/month)",
      "enterprise": "Enterprise (75+ cases/month)"
    };

    const intakeMap: Record<string, string> = {
      "in-house-dedicated": "In-house dedicated intake team",
      "in-house-shared": "In-house staff handling intake alongside other duties",
      "answering-service": "Answering service or call center",
      "attorneys-handle": "Attorneys handle intake directly",
      "hybrid": "Hybrid (combination of methods)",
      "building-team": "Currently building/hiring intake team"
    };

    const costPerCaseMap: Record<string, string> = {
      "under-1500": "Under $1,500",
      "1500-2000": "$1,500 - $2,000",
      "2000-3000": "$2,000 - $3,000",
      "3000-plus": "$3,000+",
      "not-sure": "Not sure"
    };

    const payload = {
      email: data.email,
      position: data.position,
      firm_url: data.firmUrl,
      quiz_current_volume: volumeMap[data.volume] || data.volume,
      quiz_intake_team: intakeMap[data.intake] || data.intake,
      quiz_cost_per_case: costPerCaseMap[data.costPerCase] || data.costPerCase,
      quiz_qualified: "Yes",
      quiz_completed_at: new Date().toISOString(),
      source: "lt_focused_lp",
      // Include UTM parameters for attribution tracking
      ...utmParams,
    };

    await sendToWebhook(payload);
  };

  const handleTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    // Branching logic for volume question (step 1)
    if (currentStep === 1) {
      if (answers.volume === "building") {
        setDisqualifyReason("volume");
        handleTransition(() => setStage("disqualified"));
        return;
      }
    }
    
    // Branching logic for intake question (step 2)
    if (currentStep === 2) {
      if (answers.intake === "attorneys-handle" || answers.intake === "building-team") {
        setDisqualifyReason("intake");
        handleTransition(() => setStage("disqualified"));
        return;
      }
    }
    
    if (currentStep === 3) {
      // Disqualify if cost per case is too low
      if (answers.costPerCase === "under-1500") {
        setDisqualifyReason("cost");
        handleTransition(() => setStage("disqualified"));
        return;
      }
      // Send full quiz data to HighLevel webhook before redirecting to calendar
      sendQuizDataToWebhook(answers);
      navigate("/test-batch-calendar");
      return;
    }
    
    handleTransition(() => setCurrentStep(prev => prev + 1));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      handleTransition(() => setCurrentStep(prev => prev - 1));
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return answers.volume !== "";
      case 2: return answers.intake !== "";
      case 3: return answers.costPerCase !== "";
      default: return false;
    }
  };

  const isHeroValid = () => {
    const emailValid = answers.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email);
    const positionValid = answers.position.trim() !== "";
    return emailValid && positionValid && certificationChecked;
  };

  const handleStartQuiz = () => {
    handleTransition(() => setStage("survey"));
  };

  // Preload HighLevel script when survey starts for faster calendar load
  useEffect(() => {
    if (stage === "survey") {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "https://link.msgsndr.com/js/form_embed.js";
      link.as = "script";
      document.head.appendChild(link);
    }
  }, [stage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-2 border-border">
        <div className="container-kurios">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={kuriosLogo} alt="KURIOS" className="h-10 md:h-10 w-auto" />
            </Link>
            {stage === "survey" && (
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground font-mono text-sm">
                  Step {currentStep}/{totalSteps}
                </span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* STAGE 1: Hero */}
        {stage === "hero" && (
          <section className="min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden py-8 lg:py-0">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 blur-[30px] pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/15 blur-[50px] pointer-events-none" />
            
            <div className="container-kurios relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Founder Image - hidden on mobile, smaller on tablet */}
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
                        width="320"
                        height="320"
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
                      Qualification Required
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-primary-foreground leading-tight mb-4 lg:mb-6">
                    Not Every Firm Is{" "}
                    <span className="text-primary">Built to Scale</span>{" "}
                    the Same Way
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
                    Just 3 quick questions to see if we're the right fit—takes less than 60 seconds.
                  </p>

                  <div className="max-w-md mx-auto lg:mx-0 space-y-3">
                    <Input
                      type="email"
                      placeholder="Work email"
                      value={answers.email}
                      onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                      className="h-12 lg:h-14 text-base lg:text-lg px-4 lg:px-6 bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/60"
                    />
                    <Input
                      type="text"
                      placeholder="Your role (e.g., Partner, Marketing Director)"
                      value={answers.position}
                      onChange={(e) => setAnswers({ ...answers, position: e.target.value })}
                      className="h-12 lg:h-14 text-base lg:text-lg px-4 lg:px-6 bg-card border-2 border-border focus:border-primary placeholder:text-muted-foreground/60"
                    />
                    <Input
                      type="url"
                      placeholder="Law firm website"
                      value={answers.firmUrl}
                      onChange={(e) => setAnswers({ ...answers, firmUrl: e.target.value })}
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
                      onClick={handleStartQuiz}
                      disabled={!isHeroValid()}
                      className="w-full btn-hover text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8 h-auto bg-primary hover:bg-primary/90 border-2 border-primary shadow-[0_0_30px_hsl(218_100%_60%/0.4)] font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Qualification Quiz
                      <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </div>

                  <p className="mt-4 lg:mt-6 text-muted-foreground font-mono text-sm">
                    ⏱ 3 questions → less than 60 seconds
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 2: Survey */}
        {stage === "survey" && (
          <section className="min-h-[calc(100vh-80px)] flex items-center py-12">
            <div className="container-kurios">
              <div className="max-w-2xl mx-auto">
                {/* Step 1: Current Intake Volume */}
                {currentStep === 1 && (
                  <SurveyStep
                    headline="How many MVA cases are you signing per month right now?"
                    subheadline="This helps us gauge your current intake capacity. Firms at different stages need different things—what works at 5 cases/month often breaks at 25."
                  >
                    <RadioGroup 
                      value={answers.volume} 
                      onValueChange={(value) => setAnswers({...answers, volume: value})}
                      className="space-y-4"
                    >
                      <RadioOption value="building" label="Building" description="5–10 cases/month" />
                      <RadioOption value="scaling" label="Scaling" description="10–20 cases/month" />
                      <RadioOption value="established" label="Established" description="20–40 cases/month" />
                      <RadioOption value="high-volume" label="High Volume" description="40–75 cases/month" />
                      <RadioOption value="enterprise" label="Enterprise" description="75+ cases/month" />
                    </RadioGroup>
                    
                    {answers.volume && (
                      <QualificationFeedback type={answers.volume === "building" ? "warning" : "positive"}>
                        {answers.volume === "building" && (
                          <>Our model delivers 80-100 leads monthly, designed for firms signing 10+ cases/month. At 5-10 cases, our volume may overwhelm your current capacity.</>
                        )}
                        {answers.volume === "scaling" && (
                          <>This range is where operational efficiency becomes critical. Adding volume without adding overhead is the challenge—our model handles the lead gen so your team can focus on conversion.</>
                        )}
                        {answers.volume === "established" && (
                          <>At this level, you have systems that work. The question becomes optimization—lowering cost-per-case while maintaining quality. That is exactly where performance-based partnerships excel.</>
                        )}
                        {answers.volume === "high-volume" && (
                          <>High-volume firms benefit most from our approach because inefficiencies multiply at scale. Even small improvements in lead quality translate to significant margin gains.</>
                        )}
                        {answers.volume === "enterprise" && (
                          <>Enterprise-level operations need enterprise-level consistency. Our system is built to maintain quality at scale—no degradation as volume increases.</>
                        )}
                      </QualificationFeedback>
                    )}
                  </SurveyStep>
                )}

                {/* Step 2: Intake Team */}
                {currentStep === 2 && (
                  <SurveyStep
                    headline="How does your firm handle intake?"
                    subheadline="Intake is where deals are won or lost. A lead that waits 30 minutes is half as likely to sign as one contacted in 5. We've seen great marketing campaigns fail because the intake couldn't keep up—so we ask upfront."
                  >
                    <RadioGroup 
                      value={answers.intake} 
                      onValueChange={(value) => setAnswers({...answers, intake: value})}
                      className="space-y-4"
                    >
                      <RadioOption value="in-house-dedicated" label="Dedicated intake team" description="Staff whose only job is signing cases" />
                      <RadioOption value="in-house-shared" label="Shared responsibilities" description="Staff handling intake alongside other duties" />
                      <RadioOption value="answering-service" label="Answering service" description="Call center or external service handles first contact" />
                      <RadioOption value="attorneys-handle" label="Attorneys handle intake" description="Lawyers take calls and sign cases directly" />
                      <RadioOption value="hybrid" label="Hybrid approach" description="Combination of methods depending on time/case type" />
                      <RadioOption value="building-team" label="Building our team" description="Currently hiring or training intake staff" />
                    </RadioGroup>
                    
                    {answers.intake && (
                      <QualificationFeedback type={(answers.intake === "attorneys-handle" || answers.intake === "building-team") ? "warning" : "positive"}>
                        {answers.intake === "in-house-dedicated" && (
                          <>Ideal setup. Dedicated intake teams convert at significantly higher rates because response time and follow-up consistency are built into the role. This means our leads get worked properly.</>
                        )}
                        {answers.intake === "in-house-shared" && (
                          <>This is common and workable. The key question is response time—can someone get back to leads within 5 minutes during business hours? If yes, conversion rates stay healthy.</>
                        )}
                        {answers.intake === "answering-service" && (
                          <>Answering services ensure no lead goes unanswered, which is critical. The trade-off is sometimes lower conversion on complex cases. We can work with this if handoff to your team is fast.</>
                        )}
                        {answers.intake === "attorneys-handle" && (
                          <>Attorney-led intake can produce high-quality conversions, but our model requires leads to be contacted within 5 minutes. Unless attorneys are available throughout the day to respond immediately, leads go cold and your cost-per-case climbs. Most firms with attorney-only intake aren't ready for the volume we generate.</>
                        )}
                        {answers.intake === "hybrid" && (
                          <>Hybrid approaches often capture the best of both worlds—fast response times with skilled follow-up. The key is making sure handoffs are seamless so leads do not fall through cracks.</>
                        )}
                        {answers.intake === "building-team" && (
                          <>We've seen this create a timing problem. When we start generating leads before intake is fully operational, response times suffer and leads go cold. Most firms in this position see 30-50% lower conversion rates. We'd recommend connecting once your team is trained and ready to handle volume.</>
                        )}
                      </QualificationFeedback>
                    )}
                  </SurveyStep>
                )}

                {/* Step 3: Cost Per Signed Case */}
                {currentStep === 3 && (
                  <SurveyStep
                    headline="What are you currently paying per signed MVA case?"
                    subheadline="Understanding your current acquisition cost helps us assess whether our model will improve your margins. Different lead sources and markets produce very different numbers."
                  >
                    <RadioGroup 
                      value={answers.costPerCase} 
                      onValueChange={(value) => setAnswers({...answers, costPerCase: value})}
                      className="space-y-4"
                    >
                      <RadioOption value="under-1500" label="Under $1,500" description="Typically organic or referral-heavy" />
                      <RadioOption value="1500-2000" label="$1,500 – $2,000" description="Efficient paid acquisition" />
                      <RadioOption value="2000-3000" label="$2,000 – $3,000" description="Common for competitive markets" />
                      <RadioOption value="3000-plus" label="$3,000+" description="High-cost markets or premium cases" />
                      <RadioOption value="not-sure" label="Not sure" description="We can help you calculate this" />
                    </RadioGroup>
                    
                    {answers.costPerCase && (
                      <QualificationFeedback type={answers.costPerCase === "under-1500" ? "warning" : "positive"}>
                        {answers.costPerCase === "under-1500" && (
                          <>At this cost per case, our model may not add significant value. We typically work with firms spending $1,500+ per signed case where our pre-screening and verification process creates meaningful margin improvements.</>
                        )}
                        {answers.costPerCase === "1500-2000" && (
                          <>Solid range. You're already running efficient acquisition. We typically see firms in this range benefit most from our pre-screened leads—adding volume while maintaining or improving cost efficiency.</>
                        )}
                        {answers.costPerCase === "2000-3000" && (
                          <>Common for competitive markets. At this cost, even small improvements in lead quality and conversion rate create meaningful margin gains. That's exactly what we're built for.</>
                        )}
                        {answers.costPerCase === "3000-plus" && (
                          <>Premium market or high-value cases. At this investment level, lead quality becomes critical—a bad lead costs real money. Our verification process is designed to eliminate waste before it reaches your team.</>
                        )}
                        {answers.costPerCase === "not-sure" && (
                          <>No problem—many firms don't track this closely. We can help you establish baseline metrics so you can measure ROI accurately from day one.</>
                        )}
                      </QualificationFeedback>
                    )}
                  </SurveyStep>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="font-mono uppercase tracking-wide"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    className="btn-hover bg-primary hover:bg-primary/90 font-mono uppercase tracking-wide"
                  >
                    {currentStep === totalSteps ? "Submit" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAGE 3: Thank You */}
        {stage === "thankyou" && (
          <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
            <div className="container-kurios">
              <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-foreground mb-4">
                    Application Received – You're In!
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    We review every qualified firm personally. Expect a response within 24–48 hours.
                  </p>
                </div>

                <Button asChild className="btn-hover font-mono uppercase tracking-wide">
                  <Link to="/">
                    Return to Homepage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Disqualified */}
        {stage === "disqualified" && (
          <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
            <div className="container-kurios">
              <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-black text-primary-foreground mb-4">
                    {disqualifyReason === "volume" && "We work best with higher-volume firms."}
                    {disqualifyReason === "intake" && "Timing matters more than you'd think."}
                    {disqualifyReason === "cost" && "Our model works best at higher acquisition costs."}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {disqualifyReason === "volume" && 
                      "Our model delivers 80-100 leads per month, designed for firms signing 10+ cases monthly. At your current volume, our lead flow would likely overwhelm your intake capacity. We'd recommend scaling your internal operations first, then reconnecting when you're ready for higher volume."}
                    {disqualifyReason === "intake" && 
                      "Our leads need to be contacted within 5 minutes to convert well. Without a dedicated intake team ready to respond immediately, we've seen firms burn through budget with poor close rates. We'd rather wait until your team is in place than set you up for frustration."}
                    {disqualifyReason === "cost" && 
                      "At your current cost per signed case, you're already operating efficiently—likely through referrals or organic channels. Our model delivers the most value for firms paying $1,500+ per case, where our pre-screening and verification process creates meaningful margin improvements. Keep doing what's working!"}
                  </p>
                </div>

                <Button asChild variant="outline" className="font-mono uppercase tracking-wide">
                  <Link to="/">
                    Return to Homepage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// Survey Step Wrapper
const SurveyStep = ({ 
  headline, 
  subheadline, 
  children 
}: { 
  headline: string; 
  subheadline: string; 
  children: React.ReactNode;
}) => (
  <div className="animate-fade-in-up">
    <h2 className="text-2xl sm:text-3xl font-black text-primary-foreground mb-4">
      {headline}
    </h2>
    <p className="text-muted-foreground mb-8">
      {subheadline}
    </p>
    {children}
  </div>
);

// Qualification Feedback Component
const QualificationFeedback = ({ 
  type, 
  children 
}: { 
  type: "positive" | "warning"; 
  children: React.ReactNode;
}) => (
  <div className={`mt-6 p-4 border-l-4 animate-fade-in ${
    type === "positive" 
      ? "border-l-green-500 bg-green-500/10" 
      : "border-l-yellow-500 bg-yellow-500/10"
  }`}>
    <div className="flex items-start gap-3">
      {type === "positive" ? (
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
      )}
      <p className={`text-sm ${type === "positive" ? "text-green-200" : "text-yellow-200"}`}>
        {children}
      </p>
    </div>
  </div>
);

// Radio Option Component
const RadioOption = ({ 
  value, 
  label, 
  description,
  highlight = false
}: { 
  value: string; 
  label: string; 
  description?: string;
  highlight?: boolean;
}) => (
  <Label 
    htmlFor={value}
    className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all ${
      highlight 
        ? "border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10" 
        : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
    }`}
  >
    <RadioGroupItem value={value} id={value} className="mt-1" />
    <div className="flex-1">
      <span className="font-semibold text-foreground block">{label}</span>
      {description && (
        <span className="text-muted-foreground text-sm">{description}</span>
      )}
    </div>
  </Label>
);

export default Qualify;
