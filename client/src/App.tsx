import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";

const BlogAdminPage = lazy(() => import("@/pages/blog-admin"));

function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#001030",
        zIndex: 99999,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="rgba(0,136,204,0.3)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#0088CC"
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
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/admin/blog">
        <Suspense fallback={<PageLoader />}>
          <BlogAdminPage />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
