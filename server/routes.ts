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

  async function translateText(text: string, from: string, to: string): Promise<string> {
    if (!text || !text.trim()) return text;
    const MAX_CHUNK = 4500;
    if (text.length <= MAX_CHUNK) {
      const result = await translate(text, { from, to, forceBatch: true });
      return result.text;
    }
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks: string[] = [];
    let current = "";
    for (const s of sentences) {
      if ((current + s).length > MAX_CHUNK && current) {
        chunks.push(current);
        current = s;
      } else {
        current += s;
      }
    }
    if (current) chunks.push(current);
    const translated: string[] = [];
    for (const chunk of chunks) {
      const result = await translate(chunk, { from, to, forceBatch: true });
      translated.push(result.text);
    }
    return translated.join("");
  }

  async function translateHtml(html: string, from: string, to: string): Promise<string> {
    if (!html || !html.trim()) return html;
    const bannerPh = "XBNRX";
    const tableParts: string[] = [];
    let processed = html.replace(/\[TABLE\]([\s\S]*?)\[\/TABLE\]/g, (_, data) => {
      tableParts.push(data);
      return `XTBLX${tableParts.length - 1}XTBLX`;
    });
    for (let i = 0; i < tableParts.length; i++) {
      const rows = tableParts[i].split(";;");
      const translatedRows: string[] = [];
      for (const row of rows) {
        const cells = row.split("|");
        const translatedCells: string[] = [];
        for (const cell of cells) {
          const trimmed = cell.trim();
          if (!trimmed) { translatedCells.push(cell); continue; }
          try {
            const t = await translateText(trimmed, from, to);
            translatedCells.push(t.trim());
          } catch { translatedCells.push(cell); }
        }
        translatedRows.push(translatedCells.join("|"));
      }
      tableParts[i] = translatedRows.join(";;");
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
      if (node.childNodes) {
        for (const child of node.childNodes) {
          collectText(child);
        }
      }
    }
    collectText(root);
    for (const tn of textNodes) {
      try {
        const trimmed = tn.original.trim();
        if (!trimmed) continue;
        const translated = await translateText(trimmed, from, to);
        const leading = tn.original.match(/^\s*/)?.[0] || "";
        const trailing = tn.original.match(/\s*$/)?.[0] || "";
        tn.node.rawText = leading + translated.trim() + trailing;
      } catch {
        // keep original on failure
      }
    }
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
