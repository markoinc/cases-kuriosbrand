import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import LazySection from "@/components/LazySection";
import StickyCTA from "@/components/StickyCTA";
import ChatWidget from "@/components/ChatWidget";

// Lazy load below-fold sections
const PartnershipModel = lazy(() => import("@/components/PartnershipModel"));
const ServiceTiers = lazy(() => import("@/components/ServiceTiers"));
const TrustStats = lazy(() => import("@/components/TrustStats"));
const ClientResults = lazy(() => import("@/components/ClientResults"));
const ComparisonTable = lazy(() => import("@/components/ComparisonTable"));
const ValueProposition = lazy(() => import("@/components/ValueProposition"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const ComplianceSection = lazy(() => import("@/components/ComplianceSection"));
const FounderSection = lazy(() => import("@/components/FounderSection"));
const InHouseIntakeSection = lazy(() => import("@/components/InHouseIntakeSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const TestBatchProtocol = lazy(() => import("@/components/TestBatchProtocol"));
const Footer = lazy(() => import("@/components/Footer"));

// Minimal loading placeholder
const SectionPlaceholder = () => (
  <div className="min-h-[200px]" aria-hidden="true" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* Above-fold: loaded immediately */}
        <HeroSection />
        <TrustBar />
        
        {/* Below-fold: lazy loaded when approaching viewport */}
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <PartnershipModel />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <ServiceTiers />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <TrustStats />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <ClientResults />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <ComparisonTable />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <ValueProposition />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <HowItWorks />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <ComplianceSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <FounderSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <InHouseIntakeSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <FAQSection />
          </Suspense>
        </LazySection>
        
        <LazySection>
          <Suspense fallback={<SectionPlaceholder />}>
            <TestBatchProtocol />
          </Suspense>
        </LazySection>
      </main>
      
      <LazySection>
        <Suspense fallback={<SectionPlaceholder />}>
          <Footer />
        </Suspense>
      </LazySection>
      
      {/* Sticky CTA - shows after scrolling past header */}
      <StickyCTA />
      
      {/* Chat widget - homepage only */}
      <ChatWidget />
    </div>
  );
};

export default Index;
