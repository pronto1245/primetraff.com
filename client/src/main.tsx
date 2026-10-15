import { createRoot, hydrateRoot } from "react-dom/client";
import { hydrate, type DehydratedState } from "@tanstack/react-query";
import App from "./App";
import { queryClient } from "./lib/queryClient";
import "./index.css";

declare global {
  interface Window {
    __RQ_STATE__?: DehydratedState;
  }
}

const rootEl = document.getElementById("root")!;

// Data the server already used to render this page (blog list / post),
// so the first client render matches the server HTML.
if (window.__RQ_STATE__) {
  hydrate(queryClient, window.__RQ_STATE__);
  delete window.__RQ_STATE__;
}

if (rootEl.hasChildNodes()) {
  // Page was rendered on the server: attach to the existing HTML.
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
