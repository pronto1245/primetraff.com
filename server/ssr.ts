// Production server-side rendering: turns the SPA shell into full HTML per page,
// with page-specific <title>, description, canonical and Open Graph tags.
// Any failure falls back to the plain SPA shell, so the site never breaks.
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { storage } from "./storage";

const SITE = "https://primetraff.com";
const CACHE_TTL_MS = 5 * 60 * 1000;

type Meta = { title: string; description: string };

const PAGE_META: Record<string, Meta> = {
  "/": {
    title: "PrimeTraff — Партнерская программа для гемблинг вертикали",
    description:
      "PrimeTraff — партнерская программа для арбитражников в iGaming: CPA, RevShare и гибридные модели, персональный менеджер, выплаты по графику без задержек.",
  },
  "/affiliates": {
    title: "Вебмастерам — PrimeTraff",
    description:
      "Условия для вебмастеров и арбитражных команд: офферы гемблинга и беттинга, CPA и RevShare, индивидуальные ставки, PWA и креативы для запуска.",
  },
  "/advertisers": {
    title: "Рекламодателям — PrimeTraff",
    description:
      "Трафик для гемблинг и беттинг брендов: проверенные вебмастера, контроль качества игроков, Tier-1, Европа, СНГ, Азия и LatAm.",
  },
  "/blog": {
    title: "Блог об арбитраже трафика в гемблинге — PrimeTraff",
    description:
      "Статьи об арбитраже iGaming-трафика: источники, связки, ГЕО, метрики LTV, NGR и GGR, антифрод и работа с партнерками.",
  },
  "/privacy": {
    title: "Политика конфиденциальности — PrimeTraff",
    description: "Политика конфиденциальности PrimeTraff: какие данные мы собираем и как их используем.",
  },
};

// Pages rendered on the server. Everything else (admin, unknown paths) keeps
// the plain SPA shell.
function isSsrPath(p: string) {
  return p in PAGE_META || /^\/blog\/[^/]+$/.test(p);
}

type RenderFn = (
  url: string,
  prefill: Array<{ queryKey: unknown[]; data: unknown }>,
) => Promise<{ html: string; state: unknown }>;

let renderFn: RenderFn | null = null;
let renderLoad: Promise<RenderFn | null> | null = null;

function loadRender(): Promise<RenderFn | null> {
  if (renderFn) return Promise.resolve(renderFn);
  if (!renderLoad) {
    const entry = path.resolve(__dirname, "server", "entry-server.js");
    renderLoad = (async () => {
      if (!fs.existsSync(entry)) {
        console.warn("[ssr] entry-server.js not found, serving SPA shell only");
        return null;
      }
      // Native dynamic import (kept out of esbuild's require() rewrite):
      // the SSR bundle is an ES module.
      const dynImport = new Function("u", "return import(u)") as (u: string) => Promise<any>;
      const mod = await dynImport(pathToFileURL(entry).href);
      renderFn = mod.render as RenderFn;
      return renderFn;
    })().catch((err) => {
      console.error("[ssr] failed to load entry-server.js", err);
      renderLoad = null;
      return null;
    });
  }
  return renderLoad;
}

const cache = new Map<string, { html: string; at: number }>();

export function clearSsrCache() {
  cache.clear();
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function setTag(html: string, re: RegExp, replacement: string) {
  return re.test(html) ? html.replace(re, replacement) : html;
}

function applyMeta(template: string, meta: Meta, pagePath: string, image?: string) {
  const url = SITE + (pagePath === "/" ? "/" : pagePath);
  const title = esc(meta.title);
  const desc = esc(meta.description);
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}" />`);
  html = setTag(html, /<meta name="twitter:url" content="[^"]*"\s*\/?>/, `<meta name="twitter:url" content="${url}" />`);
  html = setTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`);
  html = setTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${desc}" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  if (image) {
    const img = esc(image.startsWith("http") ? image : SITE + image);
    html = setTag(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${img}" />`);
    html = setTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${img}" />`);
  }
  return html;
}

// JSON as plain data the browser can read back, without data being able to close the <script>.
function serializeState(state: unknown) {
  return JSON.stringify(state)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Returns full HTML for a page, or null to fall back to the SPA shell.
 * `status` is 404 for an unknown blog post.
 */
export async function renderPage(
  template: string,
  pagePath: string,
): Promise<{ html: string; status: number } | null> {
  if (!isSsrPath(pagePath)) return null;

  const cached = cache.get(pagePath);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return { html: cached.html, status: 200 };
  }

  const render = await loadRender();
  if (!render) return null;

  try {
    let meta: Meta | undefined = PAGE_META[pagePath];
    let image: string | undefined;
    const prefill: Array<{ queryKey: unknown[]; data: unknown }> = [];

    if (pagePath === "/blog") {
      const posts = await storage.listBlogPosts({ publishedOnly: true });
      // Same shape the browser gets from /api/blog (dates as strings).
      prefill.push({ queryKey: ["/api/blog"], data: JSON.parse(JSON.stringify(posts)) });
    } else if (pagePath.startsWith("/blog/")) {
      const slug = decodeURIComponent(pagePath.slice("/blog/".length));
      const post = await storage.getBlogPostBySlug(slug);
      if (!post || !post.isPublished) return { html: template, status: 404 };
      prefill.push({ queryKey: ["/api/blog", slug], data: JSON.parse(JSON.stringify(post)) });
      meta = {
        title: `${post.titleRu} — PrimeTraff`,
        description: stripHtml(post.excerptRu).slice(0, 300),
      };
      image = post.coverImage ?? undefined;
    }
    if (!meta) return null;

    const { html: appHtml, state } = await render(pagePath, prefill);
    let html = applyMeta(template, meta, pagePath, image);
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div><script>window.__RQ_STATE__=${serializeState(state)}</script>`,
    );

    cache.set(pagePath, { html, at: Date.now() });
    return { html, status: 200 };
  } catch (err) {
    console.error("[ssr] render failed for", pagePath, err);
    return null;
  }
}
