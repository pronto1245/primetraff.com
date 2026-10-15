import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderPage } from "./ssr";

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

  const indexPath = path.resolve(distPath, "index.html");
  const template = fs.readFileSync(indexPath, "utf-8");

  // index: false so "/" goes through server rendering below instead of the empty shell.
  app.use(express.static(distPath, { index: false }));

  // Known SPA routes — serve with 200
  const knownRoutes = ["/", "/affiliates", "/advertisers", "/blog", "/privacy", "/admin/blog"];
  app.use("*", async (req, res) => {
    const pathname = req.path;
    const isKnown = knownRoutes.includes(pathname) ||
      pathname.startsWith("/blog/") ||
      pathname.startsWith("/uploads/") ||
      pathname.startsWith("/assets/");

    if (isKnown && req.method === "GET") {
      const rendered = await renderPage(template, pathname);
      if (rendered) {
        return res.status(rendered.status).type("html").send(rendered.html);
      }
    }

    const status = isKnown ? 200 : 404;
    res.status(status).type("html").send(template);
  });
}
