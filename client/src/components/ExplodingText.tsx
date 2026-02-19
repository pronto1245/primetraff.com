import { useRef, useEffect, useState, useCallback, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  aspect: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  born: number;
}

interface MeshPt { x: number; y: number }
interface MeshEdge { a: number; b: number }

function isMobile(): boolean {
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mobile = isMobile();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";
    const ctx = canvas.getContext("2d", { alpha: true })!;
    ctx.scale(dpr, dpr);

    let fontSize: number;
    let textX: number;
    let textCY: number;
    const targetEl = targetRef?.current;
    let letterSpacing = 0;
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const cs = window.getComputedStyle(targetEl);
      fontSize = parseFloat(cs.fontSize);
      const ls = cs.letterSpacing;
      if (ls && ls !== "normal") letterSpacing = parseFloat(ls) || 0;
      textX = rect.left;
      textCY = rect.top + rect.height / 2;
    } else {
      fontSize = Math.min(vw * 0.15, vh * 0.4);
      textX = vw * 0.08;
      textCY = vh * 0.42;
    }

    const offC = document.createElement("canvas");
    offC.width = Math.ceil(vw);
    offC.height = Math.ceil(vh);
    const oCtx = offC.getContext("2d")!;
    const fontStr = `900 ${fontSize}px 'Inter', 'Arial Black', sans-serif`;
    oCtx.font = fontStr;
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "left";
    if (letterSpacing !== 0) {
      (oCtx as any).letterSpacing = letterSpacing + "px";
    }
    const iW = oCtx.measureText("i").width;
    oCtx.fillStyle = "rgba(255,255,255,0.3)";
    oCtx.fillText("i", textX, textCY);
    oCtx.fillStyle = "#ffffff";
    oCtx.fillText("GAMING", textX + iW, textCY);
    const totalW = oCtx.measureText("iGAMING").width;
    const textCX = textX + totalW / 2;

    const imgData = oCtx.getImageData(0, 0, Math.ceil(vw), Math.ceil(vh));
    const px = imgData.data;
    const cw = Math.ceil(vw);

    let minTX = vw, maxTX = 0, minTY = vh, maxTY = 0;
    for (let y = 0; y < vh; y += 3) {
      for (let x = 0; x < vw; x += 3) {
        if (px[(y * cw + x) * 4 + 3] > 20) {
          if (x < minTX) minTX = x;
          if (x > maxTX) maxTX = x;
          if (y < minTY) minTY = y;
          if (y > maxTY) maxTY = y;
        }
      }
    }
    minTX = Math.max(0, minTX - 6);
    minTY = Math.max(0, minTY - 6);
    maxTX = Math.min(vw, maxTX + 6);
    maxTY = Math.min(vh, maxTY + 6);

    const edgePts: { x: number; y: number; nx: number; ny: number }[] = [];
    const es = mobile ? 4 : 2;
    for (let y = minTY; y <= maxTY; y += es) {
      for (let x = minTX; x <= maxTX; x += es) {
        const idx = (Math.floor(y) * cw + Math.floor(x)) * 4;
        if (idx < 0 || idx >= px.length || px[idx + 3] <= 30) continue;
        let isEdge = false, enx = 0, eny = 0;
        for (const [dx, dy] of [[-es, 0], [es, 0], [0, -es], [0, es]] as [number, number][]) {
          const nx2 = x + dx, ny2 = y + dy;
          if (nx2 < 0 || nx2 >= vw || ny2 < 0 || ny2 >= vh) { isEdge = true; enx -= dx; eny -= dy; continue; }
          const ni = (Math.floor(ny2) * cw + Math.floor(nx2)) * 4;
          if (ni < 0 || ni >= px.length || px[ni + 3] < 30) { isEdge = true; enx -= dx; eny -= dy; }
        }
        if (isEdge) {
          const len = Math.sqrt(enx * enx + eny * eny) || 1;
          edgePts.push({ x, y, nx: enx / len, ny: eny / len });
        }
      }
    }

    const maxMP = mobile ? 160 : 400;
    let mg = mobile ? 22 : 14;
    const tw = maxTX - minTX, th = maxTY - minTY;
    if ((tw / mg) * (th / mg) * 0.5 > maxMP) mg = Math.ceil(Math.sqrt((tw * th * 0.5) / maxMP));

    const meshPts: MeshPt[] = [];
    for (let y = minTY; y <= maxTY; y += mg) {
      for (let x = minTX; x <= maxTX; x += mg) {
        if (meshPts.length >= maxMP) break;
        const idx = (Math.floor(y) * cw + Math.floor(x)) * 4;
        if (idx >= 0 && idx < px.length && px[idx + 3] > 20) {
          meshPts.push({ x: x + (Math.random() - 0.5) * mg * 0.15, y: y + (Math.random() - 0.5) * mg * 0.15 });
        }
      }
    }
    for (let i = 0; i < edgePts.length && meshPts.length < maxMP; i += (mobile ? 5 : 3)) {
      meshPts.push({ x: edgePts[i].x, y: edgePts[i].y });
    }

    const meshEdges: MeshEdge[] = [];
    const maxD = mg * 2.2;
    for (let i = 0; i < meshPts.length; i++) {
      for (let j = i + 1; j < meshPts.length; j++) {
        const dx = meshPts[i].x - meshPts[j].x, dy = meshPts[i].y - meshPts[j].y;
        if (Math.abs(dx) < maxD && Math.abs(dy) < maxD && Math.sqrt(dx * dx + dy * dy) < maxD) {
          meshEdges.push({ a: i, b: j });
        }
      }
    }

    const particles: Particle[] = [];
    const maxPart = mobile ? 200 : 600;
    let time = 0;

    const T_ZOOM_IN = 1.0;
    const T_ZOOM_ROTATE = 1.5;
    const T_SETTLE = 1.0;
    const T_REST = 0.8;
    const T_MESH_IN = 0.8;
    const T_BURST = 0.6;
    const T_SPREAD = 1.2;
    const T_RETURN = 1.5;
    const T_FINAL = 0.6;
    const TOTAL = T_ZOOM_IN + T_ZOOM_ROTATE + T_SETTLE + T_REST + T_MESH_IN + T_BURST + T_SPREAD + T_RETURN + T_FINAL;

    function spawnBurst(count: number, spdMin: number, spdMax: number) {
      for (let i = 0; i < count && particles.length < maxPart; i++) {
        const ep = edgePts[Math.floor(Math.random() * edgePts.length)];
        if (!ep) continue;
        const angle = Math.atan2(ep.ny, ep.nx) + (Math.random() - 0.5) * 1.0;
        const spd = spdMin + Math.random() * (spdMax - spdMin);
        particles.push({
          x: ep.x + ep.nx * 3, y: ep.y + ep.ny * 3,
          originX: ep.x, originY: ep.y,
          vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
          size: (1.2 + Math.random() * 4) * (mobile ? 0.7 : 1),
          aspect: 0.25 + Math.random() * 0.75,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 8,
          alpha: 0.4 + Math.random() * 0.6,
          born: time,
        });
      }
    }

    function easeOut(t: number) { return 1 - (1 - Math.min(Math.max(t, 0), 1)) ** 3; }
    function easeInOut(t: number) { t = Math.min(Math.max(t, 0), 1); return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

    function drawText(scaleX: number, scaleY: number, alpha: number, glowRadius = 0) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.translate(textCX, textCY);
      ctx.scale(Math.max(0.01, scaleX), Math.max(0.01, scaleY));
      ctx.translate(-textCX, -textCY);
      if (glowRadius > 0) {
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = glowRadius;
      }
      ctx.drawImage(offC, 0, 0);
      if (glowRadius > 0) {
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    function drawMesh(opacity: number) {
      if (opacity < 0.005 || meshPts.length === 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(140,190,255,${0.3 * opacity})`;
      ctx.lineWidth = 0.8;
      for (const e of meshEdges) {
        const a = meshPts[e.a], b = meshPts[e.b];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(200,225,255,${0.5 * opacity})`;
      for (const p of meshPts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawParticles() {
      for (const p of particles) {
        const age = time - p.born;
        let a = p.alpha;
        if (age < 0.08) a *= age / 0.08;
        if (a < 0.01) continue;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = "#ffffff";
        const w = p.size, h = p.size * p.aspect;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      }
    }

    function drawDecoPlus(x: number, y: number, size: number, opacity: number, rot: number) {
      if (opacity < 0.01) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
      ctx.moveTo(0, -size); ctx.lineTo(0, size);
      ctx.stroke();
      ctx.restore();
    }

    function drawDecoCircle(x: number, y: number, r: number, opacity: number) {
      if (opacity < 0.01) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawDecoDots(x: number, y: number, opacity: number) {
      if (opacity < 0.01) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      const gap = 14;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          ctx.beginPath();
          ctx.arc(x + col * gap, y + row * gap, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    let burstW1 = false, burstW2 = false, burstW3 = false;
    const startT = performance.now();
    let prevT = startT;

    const decoPlus = { x: vw * 0.15, y: vh * 0.2 };
    const decoCircle = { x: vw * 0.82, y: vh * 0.18 };
    const decoDots = { x: vw * 0.75, y: vh * 0.65 };

    function frame() {
      const now = performance.now();
      const dt = Math.min((now - prevT) / 1000, 0.05);
      prevT = now;
      time = (now - startT) / 1000;

      ctx.clearRect(0, 0, vw, vh);

      if (time >= TOTAL) {
        drawText(1, 1, 1);
        drawMesh(0.15);
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        timeoutRef.current = setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 500);
        return;
      }

      const e1 = T_ZOOM_IN;
      const e2 = e1 + T_ZOOM_ROTATE;
      const e3 = e2 + T_SETTLE;
      const e4 = e3 + T_REST;
      const e5 = e4 + T_MESH_IN;
      const e6 = e5 + T_BURST;
      const e7 = e6 + T_SPREAD;
      const e8 = e7 + T_RETURN;

      let returnStrength = 0;
      if (time > e7) {
        returnStrength = easeInOut((time - e7) / T_RETURN);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (returnStrength > 0.01) {
          const dx = p.originX - p.x, dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            const force = 250 * returnStrength * returnStrength;
            p.vx += (dx / dist) * force * dt;
            p.vy += (dy / dist) * force * dt;
          }
          p.vx *= 0.93;
          p.vy *= 0.93;

          if (dist < 3 && returnStrength > 0.85) {
            p.alpha -= dt * 3;
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }
          }
        } else {
          p.vy += 6 * dt;
          p.vx *= 0.997;
          p.vy *= 0.997;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotSpeed * dt;
        if (time - p.born > 10) { particles.splice(i, 1); }
      }

      let decoOpacity = 0;
      if (time > e3 && time < e7) {
        const fadeIn = easeOut((time - e3) / 0.5);
        const fadeOut = time > e6 ? 1 - easeOut((time - e6) / 0.8) : 1;
        decoOpacity = fadeIn * fadeOut;
      }

      if (time < e1) {
        const t = time / T_ZOOM_IN;
        const scale = 4.0 - 3.0 * easeOut(t);
        const glow = 40 * (1 - easeOut(t));
        drawText(scale, scale, easeOut(t) * 0.9, glow);

      } else if (time < e2) {
        const t = (time - e1) / T_ZOOM_ROTATE;
        const eased = easeInOut(t);
        const angle = eased * Math.PI * 2;
        const cosA = Math.cos(angle);
        const scaleX = Math.max(Math.abs(cosA), 0.03);
        const scaleDown = 1.0 + (1 - eased) * 0.15;
        const alpha = 0.3 + 0.7 * scaleX;
        drawText(scaleX * scaleDown, scaleDown, alpha);

      } else if (time < e3) {
        const t = (time - e2) / T_SETTLE;
        drawText(1, 1, 0.9 + easeOut(t) * 0.1);
        drawDecoPlus(decoPlus.x, decoPlus.y, 8, decoOpacity * 0.3, time * 0.5);

      } else if (time < e4) {
        drawText(1, 1, 1);
        drawDecoPlus(decoPlus.x, decoPlus.y, 8, decoOpacity * 0.6, time * 0.5);
        drawDecoCircle(decoCircle.x, decoCircle.y, 12, decoOpacity * 0.4);
        drawDecoDots(decoDots.x, decoDots.y, decoOpacity * 0.5);

      } else if (time < e5) {
        const t = (time - e4) / T_MESH_IN;
        drawText(1, 1, 1);
        drawMesh(easeOut(t));
        drawDecoPlus(decoPlus.x, decoPlus.y, 8, decoOpacity * 0.6, time * 0.5);
        drawDecoCircle(decoCircle.x, decoCircle.y, 12, decoOpacity * 0.4);
        drawDecoDots(decoDots.x, decoDots.y, decoOpacity * 0.5);

      } else if (time < e6) {
        const t = (time - e5) / T_BURST;
        drawText(1, 1, 1);
        drawMesh(1);

        if (!burstW1) { burstW1 = true; spawnBurst(mobile ? 90 : 300, mobile ? 80 : 130, mobile ? 180 : 300); }
        if (t > 0.3 && !burstW2) { burstW2 = true; spawnBurst(mobile ? 50 : 150, mobile ? 60 : 100, mobile ? 150 : 250); }
        if (t > 0.6 && !burstW3) { burstW3 = true; spawnBurst(mobile ? 30 : 80, mobile ? 40 : 70, mobile ? 100 : 180); }

        drawParticles();
        drawDecoPlus(decoPlus.x, decoPlus.y, 8, decoOpacity * 0.5, time * 0.5);
        drawDecoCircle(decoCircle.x, decoCircle.y, 12, decoOpacity * 0.3);

      } else if (time < e7) {
        const t = (time - e6) / T_SPREAD;
        drawText(1, 1, 1);
        drawMesh(1 - t * 0.05);
        if (t < 0.3) spawnBurst(mobile ? 1 : 3, 20, 60);
        drawParticles();

      } else if (time < e8) {
        drawText(1, 1, 1);
        const rt = (time - e7) / T_RETURN;
        drawMesh(0.95 - easeOut(rt) * 0.4);
        drawParticles();

      } else {
        const t = (time - e8) / T_FINAL;
        drawText(1, 1, 1);
        const meshFade = Math.max(0.15, 0.55 * (1 - easeOut(t)));
        drawMesh(meshFade);
        drawParticles();
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd, targetRef]);

  useEffect(() => {
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (rm) { setIsActive(false); onAnimationEnd(); return; }
    const t = setTimeout(startAnimation, 100);
    return () => { clearTimeout(t); cancelAnimationFrame(animRef.current); if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [startAnimation, onAnimationEnd]);

  if (!isActive) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      zIndex: 9999, pointerEvents: "none",
      opacity: fadingOut ? 0 : 1, transition: "opacity 0.5s ease-out",
    }}>
      <canvas ref={canvasRef} style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none",
      }} />
    </div>
  );
}
