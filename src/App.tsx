import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Critical route - loaded immediately
import Index from "./pages/Index";

// Non-critical routes - lazy loaded
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const TCPACompliance = lazy(() => import("./pages/TCPACompliance"));
const ABADisclaimer = lazy(() => import("./pages/ABADisclaimer"));
const Login = lazy(() => import("./pages/Login"));
const Qualify = lazy(() => import("./pages/Qualify"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const TestBatchCalendar = lazy(() => import("./pages/TestBatchCalendar"));
const AiSeo = lazy(() => import("./pages/AiSeo"));

const queryClient = new QueryClient();

// Minimal page loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/qualify" element={<Qualify />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/test-batch-calendar" element={<TestBatchCalendar />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/tcpa" element={<TCPACompliance />} />
            <Route path="/aba-disclaimer" element={<ABADisclaimer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ai-seo" element={<AiSeo />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
