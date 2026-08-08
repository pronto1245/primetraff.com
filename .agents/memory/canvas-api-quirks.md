---
name: Canvas API quirks
description: Working patterns for applyCanvasActions iframe shapes
---
- `create` action validates `w`/`h`, NOT `width`/`height` — wrong keys give an opaque "procedure init failed validation" error.
- **How to apply:** create a minimal shape (building state) first, then `update` with `shapeType: "iframe"`, `url`, `state: "live"`, `suggestedActions`.
- Mockup preview URL pattern: `<dev-domain>/__mockup/preview/<path-under-mockups>`; the vite sandbox listens on a random PORT (check workflow logs) and proxies under `/__mockup/`.
