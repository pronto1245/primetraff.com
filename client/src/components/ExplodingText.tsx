import { useRef, useEffect, useState, useCallback } from "react";

interface Shard {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scatterX: number;
  scatterY: number;
  w: number;
  h: number;
  rotation: number;
  targetRotation: number;
  scatterRotation: number;
  alpha: number;
  color: string;
  delay: number;
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

    const fontSize = h * 0.85;
    ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    ctx.textBaseline = "top";
    ctx.letterSpacing = `-${fontSize * 0.05}px`;

    const iText = "i";
    const gamingText = "GAMING";
    const iMetrics = ctx.measureText(iText);
    const gamingMetrics = ctx.measureText(gamingText);
    const totalWidth = iMetrics.width + gamingMetrics.width;
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
    offCtx.fillText(gamingText, textX + iMetrics.width, textY);

    const imgData = offCtx.getImageData(0, 0, Math.ceil(w), Math.ceil(h));
    const mobile = isMobileOrTablet();
    const gridStep = mobile ? 8 : 5;
    const shards: Shard[] = [];
    const centerX = w / 2;
    const centerY = h / 2;

    for (let py = 0; py < h; py += gridStep) {
      for (let px = 0; px < w; px += gridStep) {
        const idx = (py * Math.ceil(w) + px) * 4;
        const a = imgData.data[idx + 3];
        if (a > 50) {
          const r = imgData.data[idx];
          const g = imgData.data[idx + 1];
          const b = imgData.data[idx + 2];

          const angleFromCenter = Math.atan2(py - centerY, px - centerX);
          const spreadAngle = angleFromCenter + (Math.random() - 0.5) * 1.2;
          const dist = 300 + Math.random() * 800;

          const shardW = gridStep * (0.6 + Math.random() * 0.8);
          const shardH = gridStep * (0.3 + Math.random() * 0.5);

          const distFromCenter = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
          const delayFactor = distFromCenter / maxDist;

          shards.push({
            x: 0,
            y: 0,
            targetX: px,
            targetY: py,
            scatterX: px + Math.cos(spreadAngle) * dist,
            scatterY: py + Math.sin(spreadAngle) * dist,
            w: shardW,
            h: shardH,
            rotation: 0,
            targetRotation: 0,
            scatterRotation: (Math.random() - 0.5) * Math.PI * 4,
            alpha: a / 255,
            color: `${r},${g},${b}`,
            delay: delayFactor * 0.15,
          });
        }
      }
    }

    const SCATTER_DURATION = 0.5;
    const HOLD_DURATION = 0.2;
    const ASSEMBLE_DURATION = 2.0;
    const FADE_DURATION = 0.4;
    const TOTAL = SCATTER_DURATION + HOLD_DURATION + ASSEMBLE_DURATION + FADE_DURATION;
    const startTime = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeInQuad(t: number) {
      return t * t;
    }

    function drawShard(s: Shard, globalAlpha: number) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = s.alpha * globalAlpha;
      ctx.fillStyle = `rgba(${s.color},1)`;
      ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h);
      ctx.restore();
    }

    function drawConnections(assembled: boolean, progress: number, globalAlpha: number) {
      if (!assembled || shards.length < 20) return;
      const step = Math.max(1, Math.floor(shards.length / 60));
      ctx.strokeStyle = `rgba(180,220,255,${0.08 * progress * globalAlpha})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < shards.length - step; i += step) {
        const a = shards[i];
        const b = shards[i + step];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
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
        }, 350);
        return;
      }

      let globalAlpha = 1;
      const fadeStart = SCATTER_DURATION + HOLD_DURATION + ASSEMBLE_DURATION;
      if (elapsed > fadeStart) {
        globalAlpha = 1 - (elapsed - fadeStart) / FADE_DURATION;
      }

      let isAssembling = false;
      let assembleProgress = 0;

      for (const s of shards) {
        const adjustedElapsed = Math.max(0, elapsed - s.delay);

        if (adjustedElapsed < SCATTER_DURATION) {
          const t = easeInQuad(adjustedElapsed / SCATTER_DURATION);
          s.x = s.targetX + (s.scatterX - s.targetX) * t;
          s.y = s.targetY + (s.scatterY - s.targetY) * t;
          s.rotation = s.scatterRotation * t;
        } else if (adjustedElapsed < SCATTER_DURATION + HOLD_DURATION) {
          s.x = s.scatterX;
          s.y = s.scatterY;
          s.rotation = s.scatterRotation;
        } else {
          isAssembling = true;
          const at = (adjustedElapsed - SCATTER_DURATION - HOLD_DURATION) / ASSEMBLE_DURATION;
          const eased = easeOutCubic(Math.min(at, 1));
          assembleProgress = Math.max(assembleProgress, eased);
          s.x = s.scatterX + (s.targetX - s.scatterX) * eased;
          s.y = s.scatterY + (s.targetY - s.scatterY) * eased;
          s.rotation = s.scatterRotation * (1 - eased);
        }

        drawShard(s, globalAlpha);
      }

      if (isAssembling) {
        drawConnections(true, assembleProgress, globalAlpha);
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 150);
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
        transition: "opacity 0.35s ease-out",
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
