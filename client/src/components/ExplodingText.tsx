import { useRef, useEffect, useState, useCallback, type RefObject } from "react";

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
  alpha: number;
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

interface Props {
  onAnimationEnd: () => void;
  targetRef?: RefObject<HTMLElement | null>;
}

export default function ExplodingText({ onAnimationEnd, targetRef }: Props) {
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
    const mobile = isMobile();

    let fontSize: number;
    let textStartX: number;
    let textCenterY: number;

    const targetEl = targetRef?.current;
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const cs = window.getComputedStyle(targetEl);
      fontSize = parseFloat(cs.fontSize);
      textStartX = rect.left;
      textCenterY = rect.top + rect.height / 2;
    } else {
      fontSize = Math.min(w * 0.18, h * 0.45);
      textStartX = w * 0.1;
      textCenterY = h * 0.45;
    }

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

    tCtx.fillStyle = "rgba(255,255,255,0.3)";
    tCtx.fillText("i", textStartX, textCenterY);
    tCtx.fillStyle = "#ffffff";
    tCtx.fillText("GAMING", textStartX + iW, textCenterY);

    const textCX = textStartX + totalW / 2;
    const textCY = textCenterY;

    const imgData = tCtx.getImageData(0, 0, Math.ceil(w), Math.ceil(h));
    const pixels = imgData.data;
    const canvasW = Math.ceil(w);

    let minTX = w, maxTX = 0, minTY = h, maxTY = 0;
    for (let y = 0; y < h; y += 4) {
      for (let x = 0; x < w; x += 4) {
        if (pixels[(y * canvasW + x) * 4 + 3] > 20) {
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

    const baseTile = mobile ? 16 : 20;
    const tiles: Tile[] = [];

    const colWidths: number[] = [];
    let cx2 = minTX;
    while (cx2 < maxTX) {
      const tw = baseTile + Math.floor((Math.random() - 0.5) * 8);
      colWidths.push(Math.min(tw, maxTX - cx2));
      cx2 += tw;
    }
    const rowHeights: number[] = [];
    let cy2 = minTY;
    while (cy2 < maxTY) {
      const th = baseTile + Math.floor((Math.random() - 0.5) * 6);
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
            const idx = (Math.floor(sy) * canvasW + Math.floor(sx)) * 4;
            if (idx >= 0 && idx < pixels.length && pixels[idx + 3] > 30) hasText = true;
          }
        }

        if (hasText) {
          const tileCX = curX + cw / 2;
          const tileCY = curY + rh / 2;
          const angle = Math.atan2(tileCY - textCY, tileCX - textCX) + (Math.random() - 0.5) * 0.8;
          const screenDiag = Math.sqrt(w * w + h * h);
          const dist = screenDiag * 0.5 + Math.random() * screenDiag * 0.6;
          const distFromCenter = Math.sqrt((tileCX - textCX) ** 2 + (tileCY - textCY) ** 2);
          const maxDist = Math.sqrt((maxTX - minTX) ** 2 + (maxTY - minTY) ** 2) / 2 || 200;

          tiles.push({
            srcX: curX, srcY: curY, w: cw, h: rh,
            originX: tileCX, originY: tileCY,
            x: tileCX, y: tileCY,
            prevX: tileCX, prevY: tileCY,
            scatterX: tileCX + Math.cos(angle) * dist,
            scatterY: tileCY + Math.sin(angle) * dist,
            rotation: 0,
            scatterRotation: (Math.random() - 0.5) * Math.PI * 4,
            delay: Math.min(0.2, (distFromCenter / maxDist) * 0.2),
            alpha: 1,
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
    const maxSparks = mobile ? 100 : 300;

    const meshEdges: MeshEdge[] = [];
    const meshStep = Math.max(3, Math.floor(tiles.length / 150));
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
    const P_HOLD = 0.2;
    const P_ASSEMBLE = 2.2;
    const P_SETTLE = 0.8;
    const TOTAL = P_ZOOM + P_SPIN + P_EXPLODE + P_HOLD + P_ASSEMBLE + P_SETTLE;

    const start = performance.now();
    let shakeX = 0, shakeY = 0;
    let flashAlpha = 0;
    let completionSparked = false;

    function easeOut3(t: number) { return 1 - (1 - t) ** 3; }
    function easeOut4(t: number) { return 1 - (1 - t) ** 4; }
    function easeIn2(t: number) { return t * t; }
    function easeIn3(t: number) { return t * t * t; }
    function easeIO2(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }
    function easeIO3(t: number) { return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2; }

    function drawSolidText(scale: number, rot: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(textCX, textCY);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.translate(-textCX, -textCY);
      ctx.drawImage(textCanvas, 0, 0);
      ctx.restore();
    }

    function drawTiles(showStreaks: boolean) {
      for (const tile of tiles) {
        if (tile.alpha < 0.01) continue;

        if (showStreaks) {
          const dx = tile.x - tile.prevX;
          const dy = tile.y - tile.prevY;
          const speed = Math.sqrt(dx * dx + dy * dy);
          if (speed > 4) {
            ctx.save();
            ctx.globalAlpha = Math.min(0.2, speed * 0.006) * tile.alpha;
            ctx.strokeStyle = "rgba(180,220,255,1)";
            ctx.lineWidth = 1.5;
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
        ctx.globalAlpha = tile.alpha;
        ctx.drawImage(textCanvas, tile.srcX, tile.srcY, tile.w, tile.h, -tile.w / 2, -tile.h / 2, tile.w, tile.h);

        if (Math.abs(tile.rotation) > 0.05) {
          ctx.strokeStyle = `rgba(120,180,255,${0.08 * tile.alpha})`;
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
        const a2 = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 350;
        sparks.push({
          x: src.x, y: src.y,
          vx: Math.cos(a2) * speed, vy: Math.sin(a2) * speed,
          life: 0.3 + Math.random() * 0.6,
          maxLife: 0.3 + Math.random() * 0.6,
          size: 1 + Math.random() * 2,
        });
      }
    }

    function drawSparks() {
      for (const s of sparks) {
        const lr = s.life / s.maxLife;
        ctx.save();
        ctx.globalAlpha = lr * 0.7;
        ctx.fillStyle = "#ddeeff";
        ctx.shadowColor = "rgba(150,200,255,0.5)";
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * lr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawMesh(strength: number) {
      if (strength <= 0.01) return;
      ctx.save();
      ctx.strokeStyle = `rgba(100,170,255,${0.15 * strength})`;
      ctx.lineWidth = 0.5;
      for (const e of meshEdges) {
        const a = tiles[e.a], b = tiles[e.b];
        if (!a || !b) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(140,200,255,${0.3 * strength})`;
      for (const idx of meshPts) {
        const p = tiles[idx];
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawFlash() {
      if (flashAlpha <= 0.01) return;
      ctx.save();
      const g = ctx.createRadialGradient(textCX, textCY, 0, textCX, textCY, Math.max(w, h) * 0.5);
      g.addColorStop(0, `rgba(220,240,255,${flashAlpha})`);
      g.addColorStop(0.4, `rgba(100,180,255,${flashAlpha * 0.3})`);
      g.addColorStop(1, "rgba(50,100,200,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    function drawLightSweep(t: number) {
      if (t <= 0 || t >= 1) return;
      const sweepX = minTX + (maxTX - minTX + 120) * t - 60;
      ctx.save();
      const grad = ctx.createLinearGradient(sweepX - 60, 0, sweepX + 60, 0);
      grad.addColorStop(0, "rgba(200,230,255,0)");
      grad.addColorStop(0.4, `rgba(200,230,255,${0.35 * (1 - Math.abs(t - 0.5) * 2)})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${0.5 * (1 - Math.abs(t - 0.5) * 2)})`);
      grad.addColorStop(0.6, `rgba(200,230,255,${0.35 * (1 - Math.abs(t - 0.5) * 2)})`);
      grad.addColorStop(1, "rgba(200,230,255,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad;
      ctx.fillRect(minTX - 10, minTY - 10, maxTX - minTX + 20, maxTY - minTY + 20);
      ctx.restore();
    }

    function drawGlowPulse(strength: number) {
      if (strength <= 0.01) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = `rgba(100,180,255,${0.6 * strength})`;
      ctx.shadowBlur = 20 * strength;
      ctx.globalAlpha = 0.15 * strength;
      ctx.drawImage(textCanvas, 0, 0);
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
        tile.alpha = 1;
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
        tile.alpha = 1;
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
        for (const tile of tiles) {
          tile.x = tile.originX; tile.y = tile.originY; tile.rotation = 0; tile.alpha = 1;
        }
        drawTiles(false);
        ctx.restore();
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 600);
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
        const scale = 4.0 - 2.0 * easeIO2(t);
        drawSolidText(scale, 0, 0.3 + 0.7 * t);
        shakeX = 0; shakeY = 0; flashAlpha = 0;

      } else if (el < e2) {
        const t = (el - e1) / P_SPIN;
        const e = easeIO3(t);
        const scale = 2.0 - 1.0 * e;
        const rot = e * Math.PI * 2;
        drawSolidText(scale, rot, 1.0);
        shakeX = 0; shakeY = 0;
        if (t > 0.93) flashAlpha = easeIn2((t - 0.93) / 0.07) * 0.4;

      } else if (el < e3) {
        const t = (el - e2) / P_EXPLODE;
        scatterTiles(t);

        flashAlpha = Math.max(0, 0.4 * (1 - t * 3));
        const shakeDecay = Math.max(0, 1 - t * 4);
        shakeX = (Math.random() - 0.5) * 4 * shakeDecay;
        shakeY = (Math.random() - 0.5) * 4 * shakeDecay;

        const solidFade = 1 - easeIn2(Math.min(t * 5, 1));
        if (solidFade > 0.01) drawSolidText(1, 0, solidFade);

        drawTiles(true);
        if (t < 0.3) spawnSparks(mobile ? 5 : 12);
        drawSparks();
        drawFlash();

      } else if (el < e4) {
        shakeX = 0; shakeY = 0; flashAlpha = 0;
        for (const tile of tiles) {
          tile.prevX = tile.x; tile.prevY = tile.y;
          tile.x = tile.scatterX; tile.y = tile.scatterY;
          tile.rotation = tile.scatterRotation; tile.alpha = 0.8;
        }
        drawTiles(false);
        drawSparks();

      } else if (el < e5) {
        const t = (el - e4) / P_ASSEMBLE;
        assembleTiles(t);
        shakeX = 0; shakeY = 0;

        const meshIn = easeOut3(Math.min(t * 1.5, 1));
        const meshOut = easeIn2(Math.max(0, (t - 0.65) / 0.35));
        const meshStrength = meshIn * (1 - meshOut);

        drawTiles(t < 0.5);
        drawMesh(meshStrength);
        drawSparks();

        if (t > 0.85) {
          const completionT = (t - 0.85) / 0.15;
          const pulse = Math.sin(completionT * Math.PI) * 0.8;
          drawGlowPulse(pulse);
          if (completionT < 0.3 && !completionSparked) {
            completionSparked = true;
            spawnSparks(mobile ? 15 : 40);
          }
        }

      } else {
        const t = (el - e5) / P_SETTLE;
        shakeX = 0; shakeY = 0;

        for (const tile of tiles) {
          tile.x = tile.originX; tile.y = tile.originY; tile.rotation = 0; tile.alpha = 1;
        }
        drawTiles(false);

        const meshFade = 1 - easeIn2(Math.min(t * 1.5, 1));
        if (meshFade > 0.01) drawMesh(meshFade);

        const sweepT = easeIO2(Math.min(t / 0.7, 1));
        drawLightSweep(sweepT);

        const glowT = Math.sin(Math.min(t, 1) * Math.PI) * 0.6;
        drawGlowPulse(glowT);

        drawSparks();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd, targetRef]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 200);
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
        transition: "opacity 0.6s ease-out",
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
