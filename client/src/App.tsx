import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import { lazy, Suspense, useEffect } from "react";
import NotFound from "@/pages/not-found";
import { CookieConsent } from "@/components/cookie-consent";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

const LandingPage    = lazy(() => import("@/pages/landing"));
const BlogPage       = lazy(() => import("@/pages/blog"));
const BlogPostPage   = lazy(() => import("@/pages/blog-post"));
const AffiliatesPage = lazy(() => import("@/pages/affiliates"));
const AdvertisersPage= lazy(() => import("@/pages/advertisers"));
const BlogAdminPage  = lazy(() => import("@/pages/blog-admin"));
const PrivacyPage    = lazy(() => import("@/pages/privacy"));

function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        zIndex: 99999,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="rgba(59,130,246,0.3)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeDasharray="80 50"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/affiliates" component={AffiliatesPage} />
        <Route path="/advertisers" component={AdvertisersPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/admin/blog" component={BlogAdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
          <CookieConsent />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
