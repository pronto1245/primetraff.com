import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  w: number;
  h: number;
  rotation: number;
  scatterRotation: number;
  alpha: number;
  color: string;
  delay: number;
}

interface TriEdge {
  a: number;
  b: number;
}

function isMobileOrTablet() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;
  const ua = navigator.userAgent || "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && "ontouchend" in document) return true;
  if (window.matchMedia?.("(pointer: coarse)")?.matches) return true;
  return false;
}

export default function ExplodingText({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const animRef = useRef<number>(0);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const centerX = w / 2;
    const centerY = h / 2;

    const fontSize = h * 0.85;
    ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    ctx.textBaseline = "top";

    const iText = "i";
    const gamingText = "GAMING";
    const iWidth = ctx.measureText(iText).width;
    const gamingWidth = ctx.measureText(gamingText).width;
    const totalWidth = iWidth + gamingWidth;
    const textX = (w - totalWidth) / 2;
    const textY = (h - fontSize * 0.78) / 2;

    const offscreen = document.createElement("canvas");
    offscreen.width = Math.ceil(w);
    offscreen.height = Math.ceil(h);
    const offCtx = offscreen.getContext("2d")!;
    offCtx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    offCtx.textBaseline = "top";
    offCtx.fillStyle = "rgba(255,255,255,0.3)";
    offCtx.fillText(iText, textX, textY);
    offCtx.fillStyle = "#ffffff";
    offCtx.fillText(gamingText, textX + iWidth, textY);

    const imgData = offCtx.getImageData(0, 0, Math.ceil(w), Math.ceil(h));
    const mobile = isMobileOrTablet();
    const gridStep = mobile ? 9 : 5;
    const particles: Particle[] = [];

    for (let py = 0; py < h; py += gridStep) {
      for (let px = 0; px < w; px += gridStep) {
        const idx = (py * Math.ceil(w) + px) * 4;
        const a = imgData.data[idx + 3];
        if (a > 50) {
          const r = imgData.data[idx];
          const g = imgData.data[idx + 1];
          const b = imgData.data[idx + 2];

          const angleFromCenter = Math.atan2(py - centerY, px - centerX);
          const spread = angleFromCenter + (Math.random() - 0.5) * 0.8;
          const dist = 250 + Math.random() * 700;

          const shardW = gridStep * (0.5 + Math.random() * 0.8);
          const shardH = gridStep * (0.2 + Math.random() * 0.5);

          const distFromCenter = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            scatterX: px + Math.cos(spread) * dist,
            scatterY: py + Math.sin(spread) * dist,
            w: shardW,
            h: shardH,
            rotation: 0,
            scatterRotation: (Math.random() - 0.5) * Math.PI * 6,
            alpha: a / 255,
            color: `${r},${g},${b}`,
            delay: (distFromCenter / maxDist) * 0.12,
          });
        }
      }
    }

    const meshEdges: TriEdge[] = [];
    const meshStep = Math.max(4, Math.floor(particles.length / 300));
    const meshParticles: number[] = [];
    for (let i = 0; i < particles.length; i += meshStep) {
      meshParticles.push(i);
    }
    for (let i = 0; i < meshParticles.length; i++) {
      const pi = meshParticles[i];
      let closest1 = -1, closest2 = -1;
      let d1 = Infinity, d2 = Infinity;
      for (let j = 0; j < meshParticles.length; j++) {
        if (i === j) continue;
        const pj = meshParticles[j];
        const dx = particles[pi].originX - particles[pj].originX;
        const dy = particles[pi].originY - particles[pj].originY;
        const d = dx * dx + dy * dy;
        if (d < d1) { d2 = d1; closest2 = closest1; d1 = d; closest1 = pj; }
        else if (d < d2) { d2 = d; closest2 = pj; }
      }
      if (closest1 >= 0) meshEdges.push({ a: pi, b: closest1 });
      if (closest2 >= 0) meshEdges.push({ a: pi, b: closest2 });
    }

    const PHASE1_ZOOM = 1.0;
    const PHASE2_SHRINK_SPIN = 1.0;
    const PHASE3_EXPLODE = 0.5;
    const PHASE4_HOLD = 0.3;
    const PHASE5_ASSEMBLE = 1.8;
    const PHASE6_SETTLE = 0.5;
    const TOTAL = PHASE1_ZOOM + PHASE2_SHRINK_SPIN + PHASE3_EXPLODE + PHASE4_HOLD + PHASE5_ASSEMBLE + PHASE6_SETTLE;

    const startTime = performance.now();

    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
    function easeInQuad(t: number) { return t * t; }
    function easeInOutQuad(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function drawTextScaled(scale: number, rot: number, opacity: number) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(centerX, centerY);
      ctx.rotate(rot);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);

      ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText(iText, textX, textY);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(gamingText, textX + iWidth, textY);
      ctx.restore();
    }

    function drawParticle(p: Particle, globalAlpha: number) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha * globalAlpha;
      ctx.fillStyle = `rgb(${p.color})`;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    function drawMesh(progress: number, globalAlpha: number) {
      if (progress <= 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(180,220,255,${0.15 * progress * globalAlpha})`;
      ctx.lineWidth = 0.6;
      for (const edge of meshEdges) {
        const pa = particles[edge.a];
        const pb = particles[edge.b];
        if (!pa || !pb) continue;
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(200,230,255,${0.25 * progress * globalAlpha})`;
      for (let i = 0; i < meshParticles.length; i++) {
        const pi = meshParticles[i];
        const p = particles[pi];
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function frame() {
      const elapsed = (performance.now() - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      if (elapsed >= TOTAL) {
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        setTimeout(() => {
          setIsActive(false);
          onAnimationEnd();
        }, 400);
        return;
      }

      const t1End = PHASE1_ZOOM;
      const t2End = t1End + PHASE2_SHRINK_SPIN;
      const t3End = t2End + PHASE3_EXPLODE;
      const t4End = t3End + PHASE4_HOLD;
      const t5End = t4End + PHASE5_ASSEMBLE;

      if (elapsed < t1End) {
        const t = elapsed / PHASE1_ZOOM;
        const scale = 4.0 - (4.0 - 2.5) * easeInOutQuad(t);
        drawTextScaled(scale, 0, 0.7 + 0.3 * t);

      } else if (elapsed < t2End) {
        const t = (elapsed - t1End) / PHASE2_SHRINK_SPIN;
        const eased = easeInOutQuad(t);
        const scale = 2.5 - (2.5 - 1.0) * eased;
        const rot = eased * Math.PI * 0.15;
        drawTextScaled(scale, rot, 1.0);

      } else if (elapsed < t3End) {
        const t = (elapsed - t2End) / PHASE3_EXPLODE;
        const eased = easeInQuad(t);

        for (const p of particles) {
          const pt = Math.min(1, Math.max(0, (t - p.delay * 2) / (1 - p.delay * 2)));
          const pe = easeInQuad(pt);
          p.x = p.originX + (p.scatterX - p.originX) * pe;
          p.y = p.originY + (p.scatterY - p.originY) * pe;
          p.rotation = p.scatterRotation * pe;
          drawParticle(p, 1.0);
        }

        if (eased < 0.5) {
          drawTextScaled(1.0, Math.PI * 0.15, 1.0 - eased * 2);
        }

      } else if (elapsed < t4End) {
        for (const p of particles) {
          p.x = p.scatterX;
          p.y = p.scatterY;
          p.rotation = p.scatterRotation;
          drawParticle(p, 0.8);
        }

      } else if (elapsed < t5End) {
        const t = (elapsed - t4End) / PHASE5_ASSEMBLE;
        const eased = easeOutCubic(t);

        for (const p of particles) {
          const pt = Math.min(1, Math.max(0, (t - p.delay) / (1 - p.delay)));
          const pe = easeOutCubic(pt);
          p.x = p.scatterX + (p.originX - p.scatterX) * pe;
          p.y = p.scatterY + (p.originY - p.scatterY) * pe;
          p.rotation = p.scatterRotation * (1 - pe);
          drawParticle(p, 1.0);
        }

        drawMesh(eased, 1.0);

      } else {
        const t = (elapsed - t5End) / PHASE6_SETTLE;
        const meshFade = 1.0 - easeInQuad(t);

        for (const p of particles) {
          p.x = p.originX;
          p.y = p.originY;
          p.rotation = 0;
          drawParticle(p, 1.0);
        }

        drawMesh(meshFade, 1.0);
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 100);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
    };
  }, [startAnimation]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20"
      style={{
        pointerEvents: "none",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.4s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
