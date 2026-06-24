import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";
import translate from "google-translate-api-x";
import { parse as parseHtml } from "node-html-parser";

function sanitizeHtml(html: string): string {
  if (!html) return html;
  let result = html;
  result = result.replace(/&amp;nbsp;/gi, " ");
  result = result.replace(/&nbsp;/gi, " ");
  result = result.replace(/\u00A0/g, " ");
  result = result.replace(/\s+style\s*=\s*"[^"]*"/gi, "");
  result = result.replace(/\s+style\s*=\s*'[^']*'/gi, "");
  result = result.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  result = result.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  const bannerPh = "___BANNER_PH___";
  const tablePhs: string[] = [];
  result = result.replace(/\[TABLE\]([\s\S]*?)\[\/TABLE\]/g, (_, data) => {
    tablePhs.push(data);
    return `___TABLE_PH_${tablePhs.length - 1}___`;
  });
  result = result.replace(/\[BANNER\]/g, bannerPh);
  result = result.replace(/<p>\s*<\/p>/g, "");
  result = result.replace(new RegExp(bannerPh, "g"), "[BANNER]");
  tablePhs.forEach((data, i) => {
    result = result.replace(`___TABLE_PH_${i}___`, `[TABLE]${data}[/TABLE]`);
  });
  result = result.replace(/(?!<pre[^>]*>|<code[^>]*>) {2,}/g, " ");
  return result.trim();
}

function sanitizePostContent(body: any): any {
  const sanitized = { ...body };
  if (sanitized.contentRu) sanitized.contentRu = sanitizeHtml(sanitized.contentRu);
  if (sanitized.contentEn) sanitized.contentEn = sanitizeHtml(sanitized.contentEn);
  return sanitized;
}

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "primetraff2026";

function checkAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/blog", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const publishedOnly = req.query.published !== "false";
      const posts = await storage.listBlogPosts({ category: category || undefined, publishedOnly });
      res.json(posts);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || !post.isPublished) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog", checkAdmin, async (req, res) => {
    try {
      const sanitized = sanitizePostContent(req.body);
      const parsed = insertBlogPostSchema.parse(sanitized);
      const post = await storage.createBlogPost(parsed);
      res.status(201).json(post);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.patch("/api/blog/:id", checkAdmin, async (req, res) => {
    try {
      const sanitized = sanitizePostContent(req.body);
      const updateSchema = insertBlogPostSchema.partial();
      const parsed = updateSchema.parse(sanitized);
      const post = await storage.updateBlogPost(req.params.id, parsed);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/blog/:id", checkAdmin, async (req, res) => {
    try {
      const ok = await storage.deleteBlogPost(req.params.id);
      if (!ok) return res.status(404).json({ error: "Post not found" });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/upload", checkAdmin, upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  });

  app.get("/api/blog-admin", checkAdmin, async (req, res) => {
    try {
      const posts = await storage.listBlogPosts({ publishedOnly: false });
      res.json(posts);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  const MAX_SEGMENT = 4000; // max chars per single segment before chunking
  const MAX_BATCH_CHARS = 4500; // max chars per batch group sent to API

  // Translate a single possibly-long text with sentence chunking as safety net
  async function translateSingle(text: string, from: string, to: string): Promise<string> {
    if (text.length <= MAX_SEGMENT) {
      const r = await translate(text, { from, to, forceBatch: false });
      return r.text;
    }
    // Split into sentence chunks
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks: string[] = [];
    let cur = "";
    for (const s of sentences) {
      if ((cur + s).length > MAX_SEGMENT && cur) { chunks.push(cur); cur = s; }
      else cur += s;
    }
    if (cur) chunks.push(cur);
    const parts = await Promise.all(chunks.map(c => translate(c, { from, to, forceBatch: false }).then(r => r.text).catch(() => c)));
    return parts.join("");
  }

  // Translate many short texts efficiently using opaque ID markers (immune to translation)
  // Each segment is wrapped as: ⟨TX_<id>⟩text⟨/TX_<id>⟩ — angled brackets rarely survive translation intact,
  // so we map by ID found in output rather than relying on split position.
  async function translateBatch(texts: string[], from: string, to: string): Promise<string[]> {
    if (texts.length === 0) return [];

    // Separate long texts (translate individually) from short ones (batch)
    const results: string[] = new Array(texts.length).fill("");
    const shortIndices: number[] = [];
    const longIndices: number[] = [];
    texts.forEach((t, i) => (t.length > MAX_SEGMENT ? longIndices : shortIndices).push(i));

    // Translate long texts individually (with chunking), isolated failures preserved
    await Promise.all(longIndices.map(async i => {
      try { results[i] = await translateSingle(texts[i], from, to); }
      catch { results[i] = texts[i]; }
    }));

    if (shortIndices.length === 0) return results;

    // Group short texts into batches by char budget
    const groups: number[][] = [];
    let curGroup: number[] = [];
    let curLen = 0;
    for (const i of shortIndices) {
      const segLen = texts[i].length + 20; // +20 for marker overhead
      if (curLen + segLen > MAX_BATCH_CHARS && curGroup.length > 0) {
        groups.push(curGroup); curGroup = [i]; curLen = segLen;
      } else { curGroup.push(i); curLen += segLen; }
    }
    if (curGroup.length) groups.push(curGroup);

    // Translate each group; on failure fall back to originals per group (not whole batch)
    for (const group of groups) {
      try {
        const id = () => Math.random().toString(36).slice(2, 8);
        const markers = group.map(() => id());
        const tagged = group.map((gi, k) => `TX${markers[k]}BX${texts[gi]}TX${markers[k]}EX`).join(" ");
        const res = await translate(tagged, { from, to, forceBatch: false });
        const translated = res.text;
        group.forEach((gi, k) => {
          const rx = new RegExp(`TX${markers[k]}BX([\\s\\S]*?)TX${markers[k]}EX`);
          const m = translated.match(rx);
          results[gi] = m ? m[1].trim() : texts[gi];
        });
      } catch {
        // Per-group failure: keep originals
        group.forEach(gi => { results[gi] = texts[gi]; });
      }
    }

    return results;
  }

  async function translateText(text: string, from: string, to: string): Promise<string> {
    if (!text || !text.trim()) return text;
    const [result] = await translateBatch([text], from, to);
    return result ?? text;
  }

  async function translateHtml(html: string, from: string, to: string): Promise<string> {
    if (!html || !html.trim()) return html;
    const bannerPh = "XBNRX";
    const tableParts: string[] = [];
    let processed = html.replace(/\[TABLE\]([\s\S]*?)\[\/TABLE\]/g, (_, data) => {
      tableParts.push(data);
      return `XTBLX${tableParts.length - 1}XTBLX`;
    });

    // Translate table cells in batch with per-cell fallback
    for (let i = 0; i < tableParts.length; i++) {
      const rows = tableParts[i].split(";;");
      const allCells: string[] = [];
      const cellMap: { r: number; c: number }[] = [];
      rows.forEach((row, r) => {
        row.split("|").forEach((cell, c) => {
          if (cell.trim()) { allCells.push(cell.trim()); cellMap.push({ r, c }); }
        });
      });
      const translated = await translateBatch(allCells, from, to);
      const rowArrays = rows.map(r => r.split("|"));
      cellMap.forEach(({ r, c }, idx) => { rowArrays[r][c] = translated[idx] ?? rowArrays[r][c]; });
      tableParts[i] = rowArrays.map(r => r.join("|")).join(";;");
    }

    processed = processed.replace(/\[BANNER\]/g, bannerPh);
    const root = parseHtml(processed, { comment: true });
    const textNodes: { node: any; original: string }[] = [];
    function collectText(node: any) {
      if (node.nodeType === 3) {
        const txt = node.rawText.trim();
        if (txt && txt !== bannerPh && !txt.match(/^XTBLX\d+XTBLX$/)) {
          textNodes.push({ node, original: node.rawText });
        }
      }
      if (node.childNodes) for (const child of node.childNodes) collectText(child);
    }
    collectText(root);

    // Batch-translate all nodes; each node has individual fallback via marker system
    const originals = textNodes.map(tn => tn.original.trim());
    const translatedNodes = await translateBatch(originals, from, to);
    textNodes.forEach((tn, idx) => {
      const leading = tn.original.match(/^\s*/)?.[0] || "";
      const trailing = tn.original.match(/\s*$/)?.[0] || "";
      tn.node.rawText = leading + (translatedNodes[idx] ?? tn.original.trim()) + trailing;
    });

    let result = root.toString();
    result = result.replace(new RegExp(bannerPh, "g"), "[BANNER]");
    tableParts.forEach((data, i) => {
      result = result.replace(`XTBLX${i}XTBLX`, `[TABLE]${data}[/TABLE]`);
    });
    return result;
  }

  app.post("/api/translate", checkAdmin, async (req, res) => {
    try {
      const { direction, title, excerpt, content } = req.body;
      if (!direction || !["ru2en", "en2ru"].includes(direction)) {
        return res.status(400).json({ error: "Invalid direction. Use 'ru2en' or 'en2ru'" });
      }
      const from = direction === "ru2en" ? "ru" : "en";
      const to = direction === "ru2en" ? "en" : "ru";
      const results: any = {};
      if (title) results.title = await translateText(title, from, to);
      if (excerpt) results.excerpt = await translateText(excerpt, from, to);
      if (content) results.content = await translateHtml(content, from, to);
      res.json(results);
    } catch (e: any) {
      console.error("Translation error:", e.message);
      res.status(500).json({ error: "Ошибка перевода: " + (e.message || "Попробуйте позже") });
    }
  });

  return httpServer;
}
