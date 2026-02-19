import { useRef, useEffect, useState, useCallback } from "react";

interface Tile {
  srcX: number;
  srcY: number;
  w: number;
  h: number;
  originX: number;
  originY: number;
  x: number;
  y: number;
  scatterX: number;
  scatterY: number;
  rotation: number;
  scatterRotation: number;
  delay: number;
}

interface DecoShard {
  originX: number;
  originY: number;
  x: number;
  y: number;
  scatterX: number;
  scatterY: number;
  w: number;
  h: number;
  baseAngle: number;
  rotation: number;
  scatterRotation: number;
  alpha: number;
  delay: number;
}

interface MeshEdge {
  a: number;
  b: number;
}

function isMobile() {
  if (typeof window === "undefined") return true;
  const ua = navigator.userAgent || "";
  if (/Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && "ontouchend" in document) return true;
  return window.matchMedia?.("(pointer: coarse)")?.matches || false;
}

export default function ExplodingText({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const animRef = useRef<number>(0);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";

    const ctx = canvas.getContext("2d", { alpha: true })!;
    ctx.scale(dpr, dpr);

    const w = vw;
    const h = vh;
    const cx = w / 2;
    const cy = h / 2;
    const mobile = isMobile();
    const fontSize = Math.min(w * 0.22, h * 0.55);

    const textCanvas = document.createElement("canvas");
    textCanvas.width = Math.ceil(w);
    textCanvas.height = Math.ceil(h);
    const tCtx = textCanvas.getContext("2d")!;

    tCtx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    tCtx.textBaseline = "middle";
    tCtx.textAlign = "left";
    const iW = tCtx.measureText("i").width;
    const gW = tCtx.measureText("GAMING").width;
    const totalW = iW + gW;
    const textX = cx - totalW / 2;

    tCtx.fillStyle = "rgba(255,255,255,0.3)";
    tCtx.fillText("i", textX, cy);
    tCtx.fillStyle = "#ffffff";
    tCtx.fillText("GAMING", textX + iW, cy);

    const imgData = tCtx.getImageData(0, 0, Math.ceil(w), Math.ceil(h));
    const pixels = imgData.data;

    let minTX = w, maxTX = 0, minTY = h, maxTY = 0;
    for (let y = 0; y < h; y += 4) {
      for (let x = 0; x < w; x += 4) {
        if (pixels[(y * Math.ceil(w) + x) * 4 + 3] > 20) {
          if (x < minTX) minTX = x;
          if (x > maxTX) maxTX = x;
          if (y < minTY) minTY = y;
          if (y > maxTY) maxTY = y;
        }
      }
    }
    minTX = Math.max(0, minTX - 4);
    minTY = Math.max(0, minTY - 4);
    maxTX = Math.min(w, maxTX + 4);
    maxTY = Math.min(h, maxTY + 4);

    const baseTile = mobile ? 18 : 22;
    const tiles: Tile[] = [];

    const colWidths: number[] = [];
    let cx2 = minTX;
    while (cx2 < maxTX) {
      const tw = baseTile + Math.floor((Math.random() - 0.5) * 10);
      colWidths.push(Math.min(tw, maxTX - cx2));
      cx2 += tw;
    }
    const rowHeights: number[] = [];
    let cy2 = minTY;
    while (cy2 < maxTY) {
      const th = baseTile + Math.floor((Math.random() - 0.5) * 8);
      rowHeights.push(Math.min(th, maxTY - cy2));
      cy2 += th;
    }

    let curY = minTY;
    for (let ri = 0; ri < rowHeights.length; ri++) {
      const rh = rowHeights[ri];
      let curX = minTX;
      for (let ci = 0; ci < colWidths.length; ci++) {
        const cw = colWidths[ci];

        let hasText = false;
        const checkStep = 3;
        for (let sy = curY; sy < curY + rh && !hasText; sy += checkStep) {
          for (let sx = curX; sx < curX + cw && !hasText; sx += checkStep) {
            const idx = (Math.floor(sy) * Math.ceil(w) + Math.floor(sx)) * 4;
            if (idx >= 0 && idx < pixels.length && pixels[idx + 3] > 30) {
              hasText = true;
            }
          }
        }

        if (hasText) {
          const tileCX = curX + cw / 2;
          const tileCY = curY + rh / 2;
          const angle = Math.atan2(tileCY - cy, tileCX - cx) + (Math.random() - 0.5) * 1.0;
          const dist = 300 + Math.random() * 700;
          const distFromCenter = Math.sqrt((tileCX - cx) ** 2 + (tileCY - cy) ** 2);
          const maxDist = Math.sqrt(cx * cx + cy * cy);

          const bleed = 1;
          const sX = Math.max(0, curX - bleed);
          const sY = Math.max(0, curY - bleed);
          const sW = Math.min(cw + bleed * 2, w - sX);
          const sH = Math.min(rh + bleed * 2, h - sY);

          tiles.push({
            srcX: sX,
            srcY: sY,
            w: sW,
            h: sH,
            originX: sX + sW / 2,
            originY: sY + sH / 2,
            x: sX + sW / 2,
            y: sY + sH / 2,
            scatterX: tileCX + Math.cos(angle) * dist,
            scatterY: tileCY + Math.sin(angle) * dist,
            rotation: 0,
            scatterRotation: (Math.random() - 0.5) * Math.PI * 4,
            delay: (distFromCenter / maxDist) * 0.15,
          });
        }
        curX += cw;
      }
      curY += rh;
    }

    if (tiles.length === 0) {
      ctx.drawImage(textCanvas, 0, 0);
      setFadingOut(true);
      setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 400);
      return;
    }

    const decos: DecoShard[] = [];
    const decoCount = mobile ? 100 : 250;
    for (let i = 0; i < decoCount; i++) {
      const src = tiles[Math.floor(Math.random() * tiles.length)];
      if (!src) continue;
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * 900;
      const r = Math.random();
      let dw: number, dh: number;
      if (r < 0.4) { dw = 3 + Math.random() * 8; dh = 1 + Math.random() * 3; }
      else if (r < 0.8) { dw = 8 + Math.random() * 18; dh = 2 + Math.random() * 4; }
      else { dw = 18 + Math.random() * 25; dh = 2 + Math.random() * 5; }
      decos.push({
        originX: src.originX,
        originY: src.originY,
        x: src.originX,
        y: src.originY,
        scatterX: src.originX + Math.cos(angle) * dist,
        scatterY: src.originY + Math.sin(angle) * dist,
        w: dw, h: dh,
        baseAngle: Math.random() * Math.PI,
        rotation: 0,
        scatterRotation: (Math.random() - 0.5) * Math.PI * 6,
        alpha: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.2,
      });
    }

    const meshEdges: MeshEdge[] = [];
    const meshStep = Math.max(3, Math.floor(tiles.length / 200));
    const meshPts: number[] = [];
    for (let i = 0; i < tiles.length; i += meshStep) meshPts.push(i);
    for (let i = 0; i < meshPts.length; i++) {
      let n1 = -1, n2 = -1, d1 = Infinity, d2 = Infinity;
      const pi = tiles[meshPts[i]];
      for (let j = 0; j < meshPts.length; j++) {
        if (i === j) continue;
        const pj = tiles[meshPts[j]];
        const d = (pi.originX - pj.originX) ** 2 + (pi.originY - pj.originY) ** 2;
        if (d < d1) { d2 = d1; n2 = n1; d1 = d; n1 = meshPts[j]; }
        else if (d < d2) { d2 = d; n2 = meshPts[j]; }
      }
      if (n1 >= 0) meshEdges.push({ a: meshPts[i], b: n1 });
      if (n2 >= 0) meshEdges.push({ a: meshPts[i], b: n2 });
    }

    const P_ZOOM = 0.6;
    const P_SPIN = 1.0;
    const P_EXPLODE = 0.5;
    const P_HOLD = 0.3;
    const P_ASSEMBLE = 1.8;
    const P_MESH_FADE = 0.5;
    const TOTAL = P_ZOOM + P_SPIN + P_EXPLODE + P_HOLD + P_ASSEMBLE + P_MESH_FADE;

    const start = performance.now();

    function easeOut3(t: number) { return 1 - (1 - t) ** 3; }
    function easeIn2(t: number) { return t * t; }
    function easeIO2(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }
    function easeIO3(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; }

    function drawSolidText(scale: number, rot: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(textCanvas, 0, 0);
      ctx.restore();
    }

    function drawTiles(alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      for (const t of tiles) {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.rotation);
        ctx.drawImage(textCanvas, t.srcX, t.srcY, t.w, t.h, -t.w / 2, -t.h / 2, t.w, t.h);
        ctx.restore();
      }
      ctx.restore();
    }

    function drawDecos(alpha: number) {
      if (alpha <= 0) return;
      for (const d of decos) {
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation + d.baseAngle);
        ctx.globalAlpha = d.alpha * alpha;
        ctx.fillStyle = "#fff";
        ctx.fillRect(-d.w / 2, -d.h / 2, d.w, d.h);
        ctx.restore();
      }
    }

    function drawMesh(strength: number) {
      if (strength <= 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(150,200,255,${0.25 * strength})`;
      ctx.lineWidth = 0.8;
      for (const e of meshEdges) {
        const a = tiles[e.a], b = tiles[e.b];
        if (!a || !b) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 180) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(180,220,255,${0.35 * strength})`;
      for (const idx of meshPts) {
        const p = tiles[idx];
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function scatterTiles(t: number) {
      for (const tile of tiles) {
        const pt = Math.max(0, Math.min(1, (t - tile.delay * 1.5) / (1 - tile.delay * 1.5)));
        const e = easeIn2(pt);
        tile.x = tile.originX + (tile.scatterX - tile.originX) * e;
        tile.y = tile.originY + (tile.scatterY - tile.originY) * e;
        tile.rotation = tile.scatterRotation * e;
      }
    }

    function assembleTiles(t: number) {
      for (const tile of tiles) {
        const pt = Math.max(0, Math.min(1, (t - tile.delay) / (1 - tile.delay)));
        const e = easeOut3(pt);
        tile.x = tile.scatterX + (tile.originX - tile.scatterX) * e;
        tile.y = tile.scatterY + (tile.originY - tile.scatterY) * e;
        tile.rotation = tile.scatterRotation * (1 - e);
      }
    }

    function scatterDecos(t: number) {
      for (const d of decos) {
        const pt = Math.max(0, Math.min(1, (t - d.delay) / (1 - d.delay)));
        const e = easeIn2(pt);
        d.x = d.originX + (d.scatterX - d.originX) * e;
        d.y = d.originY + (d.scatterY - d.originY) * e;
        d.rotation = d.scatterRotation * e;
      }
    }

    function assembleDecos(t: number) {
      for (const d of decos) {
        const pt = Math.max(0, Math.min(1, (t - d.delay) / (1 - d.delay)));
        const e = easeOut3(pt);
        d.x = d.scatterX + (d.originX - d.scatterX) * e;
        d.y = d.scatterY + (d.originY - d.scatterY) * e;
        d.rotation = d.scatterRotation * (1 - e);
      }
    }

    function frame() {
      const el = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      if (el >= TOTAL) {
        drawSolidText(1, 0, 1);
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 400);
        return;
      }

      const e1 = P_ZOOM;
      const e2 = e1 + P_SPIN;
      const e3 = e2 + P_EXPLODE;
      const e4 = e3 + P_HOLD;
      const e5 = e4 + P_ASSEMBLE;

      if (el < e1) {
        const t = el / P_ZOOM;
        const scale = 5.0 - 3.0 * easeIO2(t);
        drawSolidText(scale, 0, 0.4 + 0.6 * t);

      } else if (el < e2) {
        const t = (el - e1) / P_SPIN;
        const e = easeIO3(t);
        const scale = 2.0 - 1.0 * e;
        const rot = e * Math.PI * 2;
        drawSolidText(scale, rot, 1.0);

      } else if (el < e3) {
        const t = (el - e2) / P_EXPLODE;
        scatterTiles(t);
        scatterDecos(t);

        const solidFade = 1 - easeIn2(Math.min(t * 4, 1));
        if (solidFade > 0.01) drawSolidText(1, 0, solidFade);

        drawTiles(1.0);
        drawDecos(1.0);

      } else if (el < e4) {
        for (const tile of tiles) {
          tile.x = tile.scatterX; tile.y = tile.scatterY; tile.rotation = tile.scatterRotation;
        }
        for (const d of decos) {
          d.x = d.scatterX; d.y = d.scatterY; d.rotation = d.scatterRotation;
        }
        drawTiles(0.85);
        drawDecos(0.85);

      } else if (el < e5) {
        const t = (el - e4) / P_ASSEMBLE;
        assembleTiles(t);
        assembleDecos(t);

        const decoFade = 1 - easeIn2(Math.max(0, (t - 0.4) / 0.6));
        const meshStrength = easeOut3(Math.min(t * 1.5, 1));

        drawTiles(1.0);
        drawDecos(decoFade);
        drawMesh(meshStrength * (1 - easeIn2(Math.max(0, (t - 0.8) / 0.2))));

      } else {
        const t = (el - e5) / P_MESH_FADE;
        for (const tile of tiles) {
          tile.x = tile.originX; tile.y = tile.originY; tile.rotation = 0;
        }

        const meshFade = 1 - easeIn2(Math.min(t, 1));
        drawTiles(1.0);
        if (meshFade > 0.01) drawMesh(meshFade);
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 100);
    return () => { clearTimeout(timer); cancelAnimationFrame(animRef.current); };
  }, [startAnimation]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.4s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
