import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "client", "public", "uploads");
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
      const parsed = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(parsed);
      res.status(201).json(post);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.patch("/api/blog/:id", checkAdmin, async (req, res) => {
    try {
      const updateSchema = insertBlogPostSchema.partial();
      const parsed = updateSchema.parse(req.body);
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

  return httpServer;
}
