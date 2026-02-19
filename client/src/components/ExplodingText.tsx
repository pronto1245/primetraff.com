import { useRef, useEffect, useState, useCallback } from "react";

interface Shard {
  x: number;
  y: number;
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  w: number;
  h: number;
  baseAngle: number;
  rotation: number;
  scatterRotation: number;
  alpha: number;
  color: string;
  delay: number;
  type: "small" | "medium" | "large";
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

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const w = vw;
    const h = vh;
    const centerX = w / 2;
    const centerY = h / 2;

    const fontSize = Math.min(w * 0.22, h * 0.55);
    ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    ctx.textBaseline = "middle";

    const offscreen = document.createElement("canvas");
    offscreen.width = Math.ceil(w);
    offscreen.height = Math.ceil(h);
    const offCtx = offscreen.getContext("2d")!;
    offCtx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    offCtx.textBaseline = "middle";

    const iText = "i";
    const gamingText = "GAMING";
    const iWidth = offCtx.measureText(iText).width;
    const gamingWidth = offCtx.measureText(gamingText).width;
    const totalWidth = iWidth + gamingWidth;
    const startTextX = centerX - totalWidth / 2;

    offCtx.textAlign = "left";
    offCtx.fillStyle = "rgba(255,255,255,0.3)";
    offCtx.fillText(iText, startTextX, centerY);
    offCtx.fillStyle = "#ffffff";
    offCtx.fillText(gamingText, startTextX + iWidth, centerY);

    const imgData = offCtx.getImageData(0, 0, Math.ceil(w), Math.ceil(h));
    const mobile = isMobileOrTablet();
    const gridStep = mobile ? 10 : 6;
    const shards: Shard[] = [];

    for (let py = 0; py < h; py += gridStep) {
      for (let px = 0; px < w; px += gridStep) {
        const idx = (py * Math.ceil(w) + px) * 4;
        const a = imgData.data[idx + 3];
        if (a > 50) {
          const r = imgData.data[idx];
          const g = imgData.data[idx + 1];
          const b = imgData.data[idx + 2];

          const angleFromCenter = Math.atan2(py - centerY, px - centerX);
          const spread = angleFromCenter + (Math.random() - 0.5) * 0.9;
          const dist = 250 + Math.random() * 800;

          const distFromCenter = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

          const rnd = Math.random();
          let type: "small" | "medium" | "large";
          let shardW: number, shardH: number;

          if (rnd < 0.5) {
            type = "small";
            shardW = 2 + Math.random() * 4;
            shardH = 1 + Math.random() * 2;
          } else if (rnd < 0.85) {
            type = "medium";
            shardW = 5 + Math.random() * 10;
            shardH = 1.5 + Math.random() * 3;
          } else {
            type = "large";
            shardW = 12 + Math.random() * 18;
            shardH = 2 + Math.random() * 4;
          }

          shards.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            scatterX: px + Math.cos(spread) * dist,
            scatterY: py + Math.sin(spread) * dist,
            w: shardW,
            h: shardH,
            baseAngle: (Math.random() - 0.5) * Math.PI,
            rotation: 0,
            scatterRotation: (Math.random() - 0.5) * Math.PI * 5,
            alpha: a / 255,
            color: `${r},${g},${b}`,
            delay: (distFromCenter / maxDist) * 0.12,
            type,
          });
        }
      }
    }

    const meshEdges: TriEdge[] = [];
    const meshStep = Math.max(3, Math.floor(shards.length / 350));
    const meshIndices: number[] = [];
    for (let i = 0; i < shards.length; i += meshStep) {
      meshIndices.push(i);
    }
    for (let i = 0; i < meshIndices.length; i++) {
      const pi = meshIndices[i];
      let c1 = -1, c2 = -1;
      let d1 = Infinity, d2 = Infinity;
      for (let j = 0; j < meshIndices.length; j++) {
        if (i === j) continue;
        const pj = meshIndices[j];
        const dx = shards[pi].originX - shards[pj].originX;
        const dy = shards[pi].originY - shards[pj].originY;
        const d = dx * dx + dy * dy;
        if (d < d1) { d2 = d1; c2 = c1; d1 = d; c1 = pj; }
        else if (d < d2) { d2 = d; c2 = pj; }
      }
      if (c1 >= 0) meshEdges.push({ a: pi, b: c1 });
      if (c2 >= 0) meshEdges.push({ a: pi, b: c2 });
    }

    const PHASE1_ZOOM = 0.8;
    const PHASE2_SHRINK_SPIN = 0.8;
    const PHASE3_EXPLODE = 0.5;
    const PHASE4_HOLD = 0.3;
    const PHASE5_ASSEMBLE = 1.6;
    const PHASE6_MERGE = 1.2;
    const TOTAL = PHASE1_ZOOM + PHASE2_SHRINK_SPIN + PHASE3_EXPLODE + PHASE4_HOLD + PHASE5_ASSEMBLE + PHASE6_MERGE;

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
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText(iText, startTextX, centerY);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(gamingText, startTextX + iWidth, centerY);
      ctx.restore();
    }

    function drawShard(s: Shard, globalAlpha: number, scaleMul: number = 1) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation + s.baseAngle);
      ctx.scale(scaleMul, scaleMul);
      ctx.globalAlpha = s.alpha * globalAlpha;
      ctx.fillStyle = `rgb(${s.color})`;

      ctx.beginPath();
      const hw = s.w / 2;
      const hh = s.h / 2;
      ctx.moveTo(-hw, -hh);
      ctx.lineTo(hw * 0.8, -hh * 0.6);
      ctx.lineTo(hw, hh * 0.4);
      ctx.lineTo(hw * 0.3, hh);
      ctx.lineTo(-hw * 0.7, hh * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawMesh(progress: number, globalAlpha: number) {
      if (progress <= 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(180,220,255,${0.2 * progress * globalAlpha})`;
      ctx.lineWidth = 0.7;
      for (const edge of meshEdges) {
        const pa = shards[edge.a];
        const pb = shards[edge.b];
        if (!pa || !pb) continue;
        const dx = pa.x - pb.x;
        const dy = pa.y - pb.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(200,230,255,${0.3 * progress * globalAlpha})`;
      for (let i = 0; i < meshIndices.length; i++) {
        const pi = meshIndices[i];
        const p = shards[pi];
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
        const scale = 5.0 - (5.0 - 2.5) * easeInOutQuad(t);
        drawTextScaled(scale, 0, 0.6 + 0.4 * t);

      } else if (elapsed < t2End) {
        const t = (elapsed - t1End) / PHASE2_SHRINK_SPIN;
        const eased = easeInOutQuad(t);
        const scale = 2.5 - (2.5 - 1.0) * eased;
        const rot = eased * Math.PI * 0.12;
        drawTextScaled(scale, rot, 1.0);

      } else if (elapsed < t3End) {
        const t = (elapsed - t2End) / PHASE3_EXPLODE;

        for (const s of shards) {
          const pt = Math.min(1, Math.max(0, (t - s.delay * 2) / (1 - s.delay * 2)));
          const pe = easeInQuad(pt);
          s.x = s.originX + (s.scatterX - s.originX) * pe;
          s.y = s.originY + (s.scatterY - s.originY) * pe;
          s.rotation = s.scatterRotation * pe;
          drawShard(s, 1.0);
        }

        const textFade = 1.0 - easeInQuad(Math.min(t * 3, 1));
        if (textFade > 0) {
          drawTextScaled(1.0, Math.PI * 0.12, textFade);
        }

      } else if (elapsed < t4End) {
        for (const s of shards) {
          s.x = s.scatterX;
          s.y = s.scatterY;
          s.rotation = s.scatterRotation;
          drawShard(s, 0.8);
        }

      } else if (elapsed < t5End) {
        const t = (elapsed - t4End) / PHASE5_ASSEMBLE;
        const eased = easeOutCubic(t);

        for (const s of shards) {
          const pt = Math.min(1, Math.max(0, (t - s.delay) / (1 - s.delay)));
          const pe = easeOutCubic(pt);
          s.x = s.scatterX + (s.originX - s.scatterX) * pe;
          s.y = s.scatterY + (s.originY - s.scatterY) * pe;
          s.rotation = s.scatterRotation * (1 - pe);
          const nearEnd = Math.max(0, (pe - 0.7) / 0.3);
          const growScale = 1.0 + nearEnd * 0.3;
          drawShard(s, 1.0, growScale);
        }

        drawMesh(eased, 1.0);

      } else {
        const t = (elapsed - t5End) / PHASE6_MERGE;
        const eased = easeInOutQuad(Math.min(t, 1));
        const meshFade = 1.0 - easeInQuad(Math.min(t * 2, 1));

        const growScale = 1.0 + eased * 2.5;

        for (const s of shards) {
          s.x = s.originX;
          s.y = s.originY;
          s.rotation = 0;
          drawShard(s, 1.0, growScale);
        }

        if (meshFade > 0) {
          drawMesh(meshFade, 1.0);
        }
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
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
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
