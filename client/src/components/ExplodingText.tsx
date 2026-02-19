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
  prevX: number;
  prevY: number;
  scatterX: number;
  scatterY: number;
  rotation: number;
  scatterRotation: number;
  delay: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
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
    const centerX = w / 2;
    const centerY = h / 2;
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
    const textStartX = centerX - totalW / 2;
    tCtx.fillStyle = "rgba(255,255,255,0.3)";
    tCtx.fillText("i", textStartX, centerY);
    tCtx.fillStyle = "#ffffff";
    tCtx.fillText("GAMING", textStartX + iW, centerY);

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
    minTX = Math.max(0, minTX - 2);
    minTY = Math.max(0, minTY - 2);
    maxTX = Math.min(w, maxTX + 2);
    maxTY = Math.min(h, maxTY + 2);

    const baseTile = mobile ? 20 : 24;
    const tiles: Tile[] = [];

    const colWidths: number[] = [];
    let cx2 = minTX;
    while (cx2 < maxTX) {
      const tw = baseTile + Math.floor((Math.random() - 0.5) * 12);
      colWidths.push(Math.min(tw, maxTX - cx2));
      cx2 += tw;
    }
    const rowHeights: number[] = [];
    let cy2 = minTY;
    while (cy2 < maxTY) {
      const th = baseTile + Math.floor((Math.random() - 0.5) * 10);
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
        for (let sy = curY; sy < curY + rh && !hasText; sy += 3) {
          for (let sx = curX; sx < curX + cw && !hasText; sx += 3) {
            const idx = (Math.floor(sy) * Math.ceil(w) + Math.floor(sx)) * 4;
            if (idx >= 0 && idx < pixels.length && pixels[idx + 3] > 30) hasText = true;
          }
        }

        if (hasText) {
          const tileCX = curX + cw / 2;
          const tileCY = curY + rh / 2;
          const angle = Math.atan2(tileCY - centerY, tileCX - centerX) + (Math.random() - 0.5) * 0.8;
          const dist = 300 + Math.random() * 700;
          const distFromCenter = Math.sqrt((tileCX - centerX) ** 2 + (tileCY - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

          tiles.push({
            srcX: curX, srcY: curY, w: cw, h: rh,
            originX: curX + cw / 2, originY: curY + rh / 2,
            x: curX + cw / 2, y: curY + rh / 2,
            prevX: curX + cw / 2, prevY: curY + rh / 2,
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

    const sparks: Spark[] = [];
    const maxSparks = mobile ? 120 : 350;

    const meshEdges: MeshEdge[] = [];
    const meshStep = Math.max(3, Math.floor(tiles.length / 180));
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
    const P_EXPLODE = 0.55;
    const P_HOLD = 0.25;
    const P_ASSEMBLE = 2.0;
    const P_MESH_FADE = 0.5;
    const TOTAL = P_ZOOM + P_SPIN + P_EXPLODE + P_HOLD + P_ASSEMBLE + P_MESH_FADE;

    const start = performance.now();
    let shakeX = 0, shakeY = 0;
    let flashAlpha = 0;

    function easeOut3(t: number) { return 1 - (1 - t) ** 3; }
    function easeOut4(t: number) { return 1 - (1 - t) ** 4; }
    function easeIn2(t: number) { return t * t; }
    function easeIn3(t: number) { return t * t * t; }
    function easeIO2(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }
    function easeIO3(t: number) { return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2; }

    function drawSolidText(scale: number, rot: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(centerX, centerY);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);
      ctx.drawImage(textCanvas, 0, 0);
      ctx.restore();
    }

    function drawTiles(alpha: number, showStreaks: boolean) {
      for (const tile of tiles) {
        if (showStreaks) {
          const dx = tile.x - tile.prevX;
          const dy = tile.y - tile.prevY;
          const speed = Math.sqrt(dx * dx + dy * dy);
          if (speed > 4) {
            ctx.save();
            ctx.globalAlpha = Math.min(0.25, speed * 0.008) * alpha;
            ctx.strokeStyle = "rgba(180,220,255,1)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tile.x, tile.y);
            ctx.lineTo(tile.x - dx * 1.2, tile.y - dy * 1.2);
            ctx.stroke();
            ctx.restore();
          }
        }

        ctx.save();
        ctx.translate(tile.x, tile.y);
        ctx.rotate(tile.rotation);
        ctx.globalAlpha = alpha;
        ctx.drawImage(textCanvas, tile.srcX, tile.srcY, tile.w, tile.h, -tile.w / 2, -tile.h / 2, tile.w, tile.h);

        if (Math.abs(tile.rotation) > 0.01) {
          ctx.strokeStyle = `rgba(120,180,255,${0.12 * alpha})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-tile.w / 2, -tile.h / 2, tile.w, tile.h);
        }

        ctx.restore();
      }
    }

    function updateSparks(dt: number) {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 60 * dt;
        s.vx *= 0.98;
        s.life -= dt;
        if (s.life <= 0) sparks.splice(i, 1);
      }
    }

    function spawnSparks(count: number) {
      for (let i = 0; i < count && sparks.length < maxSparks; i++) {
        const src = tiles[Math.floor(Math.random() * tiles.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * 400;
        sparks.push({
          x: src.x, y: src.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.3 + Math.random() * 0.7,
          maxLife: 0.3 + Math.random() * 0.7,
          size: 1 + Math.random() * 2,
        });
      }
    }

    function drawSparks() {
      for (const s of sparks) {
        const lr = s.life / s.maxLife;
        ctx.save();
        ctx.globalAlpha = lr * 0.8;
        ctx.fillStyle = "#ddeeff";
        ctx.shadowColor = "rgba(150,200,255,0.6)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * lr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawMesh(strength: number) {
      if (strength <= 0.01) return;
      ctx.save();
      ctx.strokeStyle = `rgba(100,170,255,${0.18 * strength})`;
      ctx.lineWidth = 0.5;
      ctx.shadowColor = `rgba(80,150,255,${0.15 * strength})`;
      ctx.shadowBlur = 3;
      for (const e of meshEdges) {
        const a = tiles[e.a], b = tiles[e.b];
        if (!a || !b) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 140) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(140,200,255,${0.35 * strength})`;
      for (const idx of meshPts) {
        const p = tiles[idx];
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawFlash() {
      if (flashAlpha <= 0.01) return;
      ctx.save();
      const g = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(w, h) * 0.6);
      g.addColorStop(0, `rgba(220,240,255,${flashAlpha})`);
      g.addColorStop(0.4, `rgba(100,180,255,${flashAlpha * 0.4})`);
      g.addColorStop(1, "rgba(50,100,200,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    function scatterTiles(t: number) {
      for (const tile of tiles) {
        tile.prevX = tile.x;
        tile.prevY = tile.y;
        const pt = Math.max(0, Math.min(1, (t - tile.delay * 1.5) / (1 - tile.delay * 1.5)));
        const e = easeIn3(pt);
        tile.x = tile.originX + (tile.scatterX - tile.originX) * e;
        tile.y = tile.originY + (tile.scatterY - tile.originY) * e;
        tile.rotation = tile.scatterRotation * e;
      }
    }

    function assembleTiles(t: number) {
      for (const tile of tiles) {
        tile.prevX = tile.x;
        tile.prevY = tile.y;
        const pt = Math.max(0, Math.min(1, (t - tile.delay) / (1 - tile.delay)));
        const e = easeOut4(pt);
        tile.x = tile.scatterX + (tile.originX - tile.scatterX) * e;
        tile.y = tile.scatterY + (tile.originY - tile.scatterY) * e;
        tile.rotation = tile.scatterRotation * (1 - e);
      }
    }

    let prevTime = start;

    function frame() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      const el = (now - start) / 1000;

      ctx.save();
      ctx.translate(shakeX, shakeY);
      ctx.clearRect(-10, -10, w + 20, h + 20);

      if (el >= TOTAL) {
        drawTiles(1.0, false);
        ctx.restore();
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

      updateSparks(dt);

      if (el < e1) {
        const t = el / P_ZOOM;
        const scale = 5.0 - 3.0 * easeIO2(t);
        drawSolidText(scale, 0, 0.3 + 0.7 * t);
        shakeX = 0; shakeY = 0; flashAlpha = 0;

      } else if (el < e2) {
        const t = (el - e1) / P_SPIN;
        const e = easeIO3(t);
        const scale = 2.0 - 1.0 * e;
        const rot = e * Math.PI * 2;
        drawSolidText(scale, rot, 1.0);
        shakeX = 0; shakeY = 0;
        if (t > 0.95) flashAlpha = easeIn2((t - 0.95) / 0.05) * 0.5;

      } else if (el < e3) {
        const t = (el - e2) / P_EXPLODE;
        scatterTiles(t);

        flashAlpha = Math.max(0, 0.5 * (1 - t * 3));
        const shakeDecay = Math.max(0, 1 - t * 4);
        shakeX = (Math.random() - 0.5) * 5 * shakeDecay;
        shakeY = (Math.random() - 0.5) * 5 * shakeDecay;

        const solidFade = 1 - easeIn2(Math.min(t * 6, 1));
        if (solidFade > 0.01) drawSolidText(1, 0, solidFade);

        drawTiles(1.0, true);
        if (t < 0.25) spawnSparks(mobile ? 6 : 15);
        drawSparks();
        drawFlash();

      } else if (el < e4) {
        shakeX = 0; shakeY = 0; flashAlpha = 0;
        for (const tile of tiles) {
          tile.prevX = tile.x; tile.prevY = tile.y;
          tile.x = tile.scatterX; tile.y = tile.scatterY; tile.rotation = tile.scatterRotation;
        }
        drawTiles(0.85, false);
        drawSparks();

      } else if (el < e5) {
        const t = (el - e4) / P_ASSEMBLE;
        assembleTiles(t);
        shakeX = 0; shakeY = 0;

        const meshIn = easeOut3(Math.min(t * 1.5, 1));
        const meshOut = easeIn2(Math.max(0, (t - 0.7) / 0.3));
        const meshStrength = meshIn * (1 - meshOut);

        drawTiles(1.0, t < 0.6);
        drawMesh(meshStrength);
        drawSparks();

      } else {
        const t = (el - e5) / P_MESH_FADE;
        const meshFade = 1 - easeIn2(Math.min(t, 1));
        shakeX = 0; shakeY = 0;

        for (const tile of tiles) {
          tile.x = tile.originX; tile.y = tile.originY; tile.rotation = 0;
        }
        drawTiles(1.0, false);
        if (meshFade > 0.01) drawMesh(meshFade);
      }

      ctx.restore();
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
