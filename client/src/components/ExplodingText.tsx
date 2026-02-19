import { useRef, useEffect, useState, useCallback, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  w: number;
  h: number;
  life: number;
  maxLife: number;
  alpha: number;
}

interface MeshPoint {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

interface MeshTriangle {
  a: number;
  b: number;
  c: number;
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

    const textW = maxTX - minTX;
    const textH = maxTY - minTY;

    const edgePoints: { x: number; y: number }[] = [];
    const step = mobile ? 6 : 4;
    for (let y = minTY; y <= maxTY; y += step) {
      for (let x = minTX; x <= maxTX; x += step) {
        const idx = (Math.floor(y) * canvasW + Math.floor(x)) * 4;
        if (idx < 0 || idx >= pixels.length) continue;
        const a = pixels[idx + 3];
        if (a > 30) {
          let isEdge = false;
          for (const [dx, dy] of [[-step,0],[step,0],[0,-step],[0,step]]) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= w || ny < 0 || ny >= h) { isEdge = true; break; }
            const ni = (Math.floor(ny) * canvasW + Math.floor(nx)) * 4;
            if (ni < 0 || ni >= pixels.length || pixels[ni + 3] < 30) { isEdge = true; break; }
          }
          if (isEdge) edgePoints.push({ x, y });
        }
      }
    }

    const meshPoints: MeshPoint[] = [];
    const meshSpacing = mobile ? 25 : 18;
    for (let y = minTY; y <= maxTY; y += meshSpacing) {
      for (let x = minTX; x <= maxTX; x += meshSpacing) {
        const idx = (Math.floor(y) * canvasW + Math.floor(x)) * 4;
        if (idx >= 0 && idx < pixels.length && pixels[idx + 3] > 20) {
          meshPoints.push({
            x: x + (Math.random() - 0.5) * meshSpacing * 0.3,
            y: y + (Math.random() - 0.5) * meshSpacing * 0.3,
            ox: x, oy: y,
          });
        }
      }
    }
    for (let i = 0; i < edgePoints.length; i += 3) {
      meshPoints.push({
        x: edgePoints[i].x,
        y: edgePoints[i].y,
        ox: edgePoints[i].x,
        oy: edgePoints[i].y,
      });
    }

    const meshTriangles: MeshTriangle[] = [];
    const maxMeshDist = meshSpacing * 2.5;
    for (let i = 0; i < meshPoints.length; i++) {
      const dists: { idx: number; d: number }[] = [];
      for (let j = 0; j < meshPoints.length; j++) {
        if (i === j) continue;
        const dx = meshPoints[i].x - meshPoints[j].x;
        const dy = meshPoints[i].y - meshPoints[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxMeshDist) dists.push({ idx: j, d });
      }
      dists.sort((a, b) => a.d - b.d);
      for (let k = 0; k < Math.min(dists.length - 1, 3); k++) {
        for (let l = k + 1; l < Math.min(dists.length, 4); l++) {
          const a = i, b = dists[k].idx, c = dists[l].idx;
          const key = [a, b, c].sort((x, y) => x - y).join(",");
          const exists = meshTriangles.some(t => {
            const k2 = [t.a, t.b, t.c].sort((x, y) => x - y).join(",");
            return k2 === key;
          });
          if (!exists) meshTriangles.push({ a, b, c });
        }
      }
    }

    const particles: Particle[] = [];
    const maxParticles = mobile ? 150 : 400;

    function spawnEdgeParticles(count: number, speed: number) {
      for (let i = 0; i < count && particles.length < maxParticles; i++) {
        const ep = edgePoints[Math.floor(Math.random() * edgePoints.length)];
        if (!ep) continue;
        const angle = Math.atan2(ep.y - textCY, ep.x - textCX) + (Math.random() - 0.5) * 1.2;
        const spd = speed * (0.5 + Math.random());
        particles.push({
          x: ep.x,
          y: ep.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 8,
          w: 2 + Math.random() * 5,
          h: 1 + Math.random() * 3,
          life: 1.5 + Math.random() * 2.5,
          maxLife: 1.5 + Math.random() * 2.5,
          alpha: 0.6 + Math.random() * 0.4,
        });
      }
    }

    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 15 * dt;
        p.vx *= 0.995;
        p.rotation += p.rotSpeed * dt;
        p.life -= dt;
        if (p.life <= 0) particles.splice(i, 1);
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const lr = Math.max(0, p.life / p.maxLife);
        if (lr < 0.01) continue;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = lr * p.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    function drawMesh(strength: number) {
      if (strength <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = strength;

      ctx.strokeStyle = `rgba(200,220,255,${0.25 * strength})`;
      ctx.lineWidth = 0.8;
      for (const tri of meshTriangles) {
        const a = meshPoints[tri.a], b = meshPoints[tri.b], c = meshPoints[tri.c];
        if (!a || !b || !c) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = `rgba(200,230,255,${0.5 * strength})`;
      for (const p of meshPoints) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function drawSolidText(scaleX: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(textCX, textCY);
      ctx.scale(scaleX, 1);
      ctx.translate(-textCX, -textCY);
      ctx.drawImage(textCanvas, 0, 0);
      ctx.restore();
    }

    const P_APPEAR = 0.3;
    const P_ROTATE = 1.2;
    const P_MESH = 0.6;
    const P_EXPLODE = 0.8;
    const P_FLOAT = 2.0;
    const P_FADE = 0.6;
    const TOTAL = P_APPEAR + P_ROTATE + P_MESH + P_EXPLODE + P_FLOAT + P_FADE;

    const start = performance.now();
    let prevTime = start;
    let particlesBurst = false;

    function easeOut3(t: number) { return 1 - (1 - t) ** 3; }
    function easeIO2(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

    function frame() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      const el = (now - start) / 1000;

      ctx.clearRect(0, 0, w, h);

      if (el >= TOTAL) {
        drawSolidText(1, 1);
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 600);
        return;
      }

      updateParticles(dt);

      const e1 = P_APPEAR;
      const e2 = e1 + P_ROTATE;
      const e3 = e2 + P_MESH;
      const e4 = e3 + P_EXPLODE;
      const e5 = e4 + P_FLOAT;

      if (el < e1) {
        const t = el / P_APPEAR;
        drawSolidText(1, easeOut3(t));
      } else if (el < e2) {
        const t = (el - e1) / P_ROTATE;
        const rotProgress = easeIO2(t);
        const angle = rotProgress * Math.PI * 2;
        const scaleX = Math.cos(angle);
        const absScale = Math.abs(scaleX);
        const alpha = 0.3 + 0.7 * absScale;
        drawSolidText(scaleX < 0 ? -absScale : absScale, alpha);
      } else if (el < e3) {
        const t = (el - e2) / P_MESH;
        drawSolidText(1, 1);
        drawMesh(easeOut3(t));
      } else if (el < e4) {
        const t = (el - e3) / P_EXPLODE;
        drawSolidText(1, 1);

        const meshStrength = 1.0;
        drawMesh(meshStrength);

        if (!particlesBurst) {
          particlesBurst = true;
          spawnEdgeParticles(mobile ? 80 : 250, mobile ? 80 : 150);
        }
        if (t < 0.5) {
          spawnEdgeParticles(mobile ? 3 : 8, mobile ? 50 : 100);
        }

        drawParticles();
      } else if (el < e5) {
        const t = (el - e4) / P_FLOAT;
        drawSolidText(1, 1);

        const meshFade = 1 - easeOut3(Math.min(t * 1.5, 1)) * 0.3;
        drawMesh(meshFade);
        drawParticles();
      } else {
        const t = (el - e5) / P_FADE;
        drawSolidText(1, 1);

        const meshFade = Math.max(0, 0.7 * (1 - easeOut3(t)));
        drawMesh(meshFade);
        drawParticles();
      }

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
