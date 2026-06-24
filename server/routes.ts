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

  const SEP = " |||SPLIT||| ";
  const MAX_BATCH = 4000;

  async function translateBatch(texts: string[], from: string, to: string): Promise<string[]> {
    if (texts.length === 0) return [];
    // Split into groups that fit within MAX_BATCH chars
    const groups: string[][] = [];
    let current: string[] = [];
    let currentLen = 0;
    for (const t of texts) {
      if (currentLen + t.length + SEP.length > MAX_BATCH && current.length > 0) {
        groups.push(current);
        current = [t];
        currentLen = t.length;
      } else {
        current.push(t);
        currentLen += t.length + SEP.length;
      }
    }
    if (current.length) groups.push(current);

    const results: string[] = [];
    for (const group of groups) {
      const joined = group.join(SEP);
      const res = await translate(joined, { from, to, forceBatch: false });
      const parts = res.text.split(/\s*\|\|\|SPLIT\|\|\|\s*/);
      for (let i = 0; i < group.length; i++) {
        results.push(parts[i] !== undefined ? parts[i] : group[i]);
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

    // Translate table cells in batch
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

    // Translate all text nodes in batch
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
