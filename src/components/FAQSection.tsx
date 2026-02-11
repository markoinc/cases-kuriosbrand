import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is the minimum commitment?",
      answer: "We require a test batch of 30-50 leads to establish a baseline. After that, we scale based on your capacity. No long-term contracts."
    },
    {
      question: "How scalable is this?",
      answer: "We run paid digital ads, allowing us to scale volume up or down based on your firm's intake capacity without significant delay."
    },
    {
      question: "How much does each lead cost?",
      answer: "Pricing is tailored to your specific criteria—location, case type, and volume. Book a call and we'll provide a custom quote within 24 hours."
    },
    {
      question: "How do you verify lead quality?",
      answer: "Every lead goes through OTP PIN verification. They must confirm their phone number and provide detailed accident information before delivery to your firm."
    },
    {
      question: "How are leads delivered?",
      answer: "Leads are delivered in real-time directly to your CRM. We integrate with Filevine, Litify, Salesforce, Law Ruler, LeadDocket, and most major intake systems."
    },
    {
      question: "Are leads exclusive to my firm?",
      answer: "100% exclusive. Each lead is delivered only to your firm—never shared, resold, or recycled. You're the only attorney who will contact that potential client."
    },
    {
      question: "How quickly can I start receiving leads?",
      answer: "Most firms are receiving leads within 5-7 business days of launch. We handle all the setup—ad creatives, targeting, and integrations."
    }
  ];

  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 relative" id="faq">
      <div className="container-kurios">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 mb-4">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono font-medium text-primary uppercase tracking-wide">Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4 animate-fade-in-up animation-delay-200">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-card border-2 border-border px-6 hover:border-primary/50 transition-all data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_15px_hsl(218_100%_60%/0.15)]"
              >
                <AccordionTrigger 
                  className="text-left hover:no-underline text-foreground font-semibold py-5 focus:outline-none text-base sm:text-lg"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm sm:text-base leading-relaxed font-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
