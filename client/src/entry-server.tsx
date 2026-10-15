// Server-side render entry. Built separately (vite build --ssr) and used by
// server/ssr.ts in production so crawlers and link previews receive the real
// page HTML instead of an empty <div id="root">.
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, dehydrate, type DehydratedState } from "@tanstack/react-query";
import { AppShell } from "./App";
import { getQueryFn } from "./lib/queryClient";

export type Prefill = Array<{ queryKey: unknown[]; data: unknown }>;

export type RenderResult = {
  html: string;
  state: DehydratedState;
};

export function render(url: string, prefill: Prefill = []): Promise<RenderResult> {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: getQueryFn({ on401: "throw" }),
        staleTime: Infinity,
        retry: false,
      },
    },
  });
  for (const { queryKey, data } of prefill) {
    queryClient.setQueryData(queryKey, data);
  }

  const path = url.split("?")[0] || "/";

  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
    });
    sink.on("finish", () => resolve({ html, state: dehydrate(queryClient) }));

    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error(`SSR timeout for ${path}`));
    }, 10_000);

    const stream = renderToPipeableStream(
      <Router ssrPath={path}>
        <AppShell queryClient={queryClient} />
      </Router>,
      {
        // Wait for every lazy page chunk so the output is the full page,
        // not the loading spinner.
        onAllReady() {
          clearTimeout(timeout);
          stream.pipe(sink);
        },
        onShellError(err) {
          clearTimeout(timeout);
          reject(err);
        },
        onError(err) {
          console.error("[ssr]", path, err);
        },
      },
    );
  });
}
