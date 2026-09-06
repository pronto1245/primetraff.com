import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const uploadsPath = path.resolve(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsPath));

  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Known SPA routes — serve with 200
  const knownRoutes = ["/", "/affiliates", "/advertisers", "/blog", "/privacy", "/admin/blog"];
  app.use("*", (req, res) => {
    const pathname = req.path;
    const isKnown = knownRoutes.includes(pathname) ||
      pathname.startsWith("/blog/") ||
      pathname.startsWith("/uploads/") ||
      pathname.startsWith("/assets/");
    const status = isKnown ? 200 : 404;
    res.status(status).sendFile(path.resolve(distPath, "index.html"));
  });
}
