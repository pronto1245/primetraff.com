import { useRef, useEffect, useState, useCallback, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  aspectRatio: number;
  alpha: number;
  born: number;
  returning: boolean;
}

interface MeshPoint { x: number; y: number }
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
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const cs = window.getComputedStyle(targetEl);
      fontSize = parseFloat(cs.fontSize);
      textX = rect.left;
      textCY = rect.top + rect.height / 2;
    } else {
      fontSize = Math.min(vw * 0.18, vh * 0.45);
      textX = vw * 0.1;
      textCY = vh * 0.45;
    }

    const offCanvas = document.createElement("canvas");
    offCanvas.width = Math.ceil(vw);
    offCanvas.height = Math.ceil(vh);
    const oCtx = offCanvas.getContext("2d")!;
    oCtx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "left";

    const iW = oCtx.measureText("i").width;
    oCtx.fillStyle = "rgba(255,255,255,0.3)";
    oCtx.fillText("i", textX, textCY);
    oCtx.fillStyle = "#ffffff";
    oCtx.fillText("GAMING", textX + iW, textCY);

    const totalW = oCtx.measureText("iGAMING").width;
    const textCX = textX + totalW / 2;

    const imgData = oCtx.getImageData(0, 0, Math.ceil(vw), Math.ceil(vh));
    const pxData = imgData.data;
    const cw = Math.ceil(vw);

    let minX = vw, maxX = 0, minY = vh, maxY = 0;
    for (let y = 0; y < vh; y += 3) {
      for (let x = 0; x < vw; x += 3) {
        if (pxData[(y * cw + x) * 4 + 3] > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    minX = Math.max(0, minX - 4);
    minY = Math.max(0, minY - 4);
    maxX = Math.min(vw, maxX + 4);
    maxY = Math.min(vh, maxY + 4);

    const edgePoints: { x: number; y: number; nx: number; ny: number }[] = [];
    const step = mobile ? 4 : 2;
    for (let y = minY; y <= maxY; y += step) {
      for (let x = minX; x <= maxX; x += step) {
        const idx = (Math.floor(y) * cw + Math.floor(x)) * 4;
        if (idx < 0 || idx >= pxData.length) continue;
        if (pxData[idx + 3] <= 30) continue;
        let isEdge = false;
        let enx = 0, eny = 0;
        for (const [dx, dy] of [[-step, 0], [step, 0], [0, -step], [0, step]] as [number, number][]) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || nx >= vw || ny < 0 || ny >= vh) { isEdge = true; enx -= dx; eny -= dy; continue; }
          const ni = (Math.floor(ny) * cw + Math.floor(nx)) * 4;
          if (ni < 0 || ni >= pxData.length || pxData[ni + 3] < 30) { isEdge = true; enx -= dx; eny -= dy; }
        }
        if (isEdge) {
          const len = Math.sqrt(enx * enx + eny * eny) || 1;
          edgePoints.push({ x, y, nx: enx / len, ny: eny / len });
        }
      }
    }

    const maxMeshPts = mobile ? 180 : 450;
    let meshGrid = mobile ? 22 : 14;
    const tw = maxX - minX;
    const th = maxY - minY;
    const est = (tw / meshGrid) * (th / meshGrid) * 0.5;
    if (est > maxMeshPts) meshGrid = Math.ceil(Math.sqrt((tw * th * 0.5) / maxMeshPts));

    const meshPts: MeshPoint[] = [];
    for (let y = minY; y <= maxY; y += meshGrid) {
      for (let x = minX; x <= maxX; x += meshGrid) {
        if (meshPts.length >= maxMeshPts) break;
        const idx = (Math.floor(y) * cw + Math.floor(x)) * 4;
        if (idx >= 0 && idx < pxData.length && pxData[idx + 3] > 20) {
          meshPts.push({ x: x + (Math.random() - 0.5) * meshGrid * 0.15, y: y + (Math.random() - 0.5) * meshGrid * 0.15 });
        }
      }
    }
    for (let i = 0; i < edgePoints.length && meshPts.length < maxMeshPts; i += (mobile ? 4 : 2)) {
      meshPts.push({ x: edgePoints[i].x, y: edgePoints[i].y });
    }

    const meshEdges: MeshEdge[] = [];
    const maxEdgeDist = meshGrid * 2.2;
    const edgeSet = new Set<string>();
    for (let i = 0; i < meshPts.length; i++) {
      for (let j = i + 1; j < meshPts.length; j++) {
        const dx = meshPts[i].x - meshPts[j].x;
        const dy = meshPts[i].y - meshPts[j].y;
        if (Math.abs(dx) < maxEdgeDist && Math.abs(dy) < maxEdgeDist) {
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxEdgeDist) {
            const key = i + "," + j;
            if (!edgeSet.has(key)) { edgeSet.add(key); meshEdges.push({ a: i, b: j }); }
          }
        }
      }
    }

    const particles: Particle[] = [];
    const maxP = mobile ? 220 : 650;
    let animTime = 0;

    const PHASE = {
      APPEAR_END: 0.8,
      ROTATE_END: 2.0,
      MESH_END: 2.6,
      BURST_END: 3.2,
      SPREAD_END: 4.5,
      RETURN_END: 6.0,
      SETTLE_END: 6.6,
    };

    function spawnFromEdges(count: number, speedMin: number, speedMax: number) {
      for (let i = 0; i < count && particles.length < maxP; i++) {
        const ep = edgePoints[Math.floor(Math.random() * edgePoints.length)];
        if (!ep) continue;
        const outAngle = Math.atan2(ep.ny, ep.nx) + (Math.random() - 0.5) * 1.2;
        const spd = speedMin + Math.random() * (speedMax - speedMin);
        particles.push({
          x: ep.x + ep.nx * 2,
          y: ep.y + ep.ny * 2,
          originX: ep.x,
          originY: ep.y,
          vx: Math.cos(outAngle) * spd,
          vy: Math.sin(outAngle) * spd,
          size: (1.5 + Math.random() * 4) * (mobile ? 0.8 : 1),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 10,
          aspectRatio: 0.3 + Math.random() * 0.7,
          alpha: 0.5 + Math.random() * 0.5,
          born: animTime,
          returning: false,
        });
      }
    }

    function updateParticles(dt: number, returnStrength: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = animTime - p.born;

        if (returnStrength > 0.01) {
          p.returning = true;
        }

        if (p.returning) {
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.5) {
            const force = 220 * returnStrength * returnStrength;
            p.vx += (dx / dist) * force * dt;
            p.vy += (dy / dist) * force * dt;
          }
          p.vx *= 0.94;
          p.vy *= 0.94;
        } else {
          p.vy += 8 * dt;
          p.vx *= 0.997;
          p.vy *= 0.997;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotSpeed * dt;

        if (p.returning) {
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 2 && returnStrength > 0.8) {
            particles.splice(i, 1);
            continue;
          }
        }

        if (age > 8) {
          particles.splice(i, 1);
        }
      }
    }

    function drawText(scaleX: number, alpha: number, skew = 0) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.translate(textCX, textCY);
      if (skew !== 0) ctx.transform(1, 0, skew, 1, 0, 0);
      ctx.scale(Math.max(0.01, scaleX), 1);
      ctx.translate(-textCX, -textCY);
      ctx.drawImage(offCanvas, 0, 0);
      ctx.restore();
    }

    function drawMesh(opacity: number, scaleX = 1, skew = 0) {
      if (opacity < 0.005 || meshPts.length === 0) return;
      ctx.save();
      if (scaleX !== 1 || skew !== 0) {
        ctx.translate(textCX, textCY);
        if (skew !== 0) ctx.transform(1, 0, skew, 1, 0, 0);
        ctx.scale(Math.max(0.01, scaleX), 1);
        ctx.translate(-textCX, -textCY);
      }
      ctx.strokeStyle = `rgba(150,200,255,${0.35 * opacity})`;
      ctx.lineWidth = 1;
      for (const e of meshEdges) {
        const a = meshPts[e.a], b = meshPts[e.b];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(200,230,255,${0.6 * opacity})`;
      for (const p of meshPts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawParticles() {
      for (const p of particles) {
        const age = animTime - p.born;
        let a = p.alpha;
        if (age < 0.1) a *= age / 0.1;
        if (p.returning) {
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) a *= dist / 15;
        }
        if (a < 0.01) continue;

        ctx.save();
        ctx.globalAlpha = a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = "#ffffff";
        const w = p.size;
        const h = p.size * p.aspectRatio;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      }
    }

    function easeOut(t: number) { return 1 - (1 - t) ** 3; }
    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

    let burstWave1 = false;
    let burstWave2 = false;
    let burstWave3 = false;

    const startTime = performance.now();
    let prevTime = startTime;

    function frame() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      animTime = (now - startTime) / 1000;

      ctx.clearRect(0, 0, vw, vh);

      if (animTime >= PHASE.SETTLE_END) {
        drawText(1, 1);
        cancelAnimationFrame(animRef.current);
        setFadingOut(true);
        setTimeout(() => { setIsActive(false); onAnimationEnd(); }, 500);
        return;
      }

      let returnStrength = 0;
      if (animTime > PHASE.SPREAD_END) {
        const rt = (animTime - PHASE.SPREAD_END) / (PHASE.RETURN_END - PHASE.SPREAD_END);
        returnStrength = easeInOut(Math.min(rt, 1));
      }
      updateParticles(dt, returnStrength);

      if (animTime < PHASE.APPEAR_END) {
        const t = animTime / PHASE.APPEAR_END;
        drawText(1, easeOut(t));

      } else if (animTime < PHASE.ROTATE_END) {
        const t = (animTime - PHASE.APPEAR_END) / (PHASE.ROTATE_END - PHASE.APPEAR_END);
        const eased = easeInOut(t);
        const angle = eased * Math.PI * 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const scaleX = Math.max(Math.abs(cosA), 0.03);
        const skew = sinA * 0.12;
        const alpha = 0.3 + 0.7 * scaleX;
        drawText(scaleX, alpha, skew);

        const meshT = Math.max(0, (t - 0.4) / 0.6);
        if (meshT > 0) drawMesh(easeOut(meshT) * 0.4, scaleX, skew);

      } else if (animTime < PHASE.MESH_END) {
        const t = (animTime - PHASE.ROTATE_END) / (PHASE.MESH_END - PHASE.ROTATE_END);
        drawText(1, 1);
        drawMesh(0.4 + easeOut(t) * 0.6);

      } else if (animTime < PHASE.BURST_END) {
        const t = (animTime - PHASE.MESH_END) / (PHASE.BURST_END - PHASE.MESH_END);
        drawText(1, 1);
        drawMesh(1);

        if (!burstWave1) {
          burstWave1 = true;
          spawnFromEdges(mobile ? 100 : 350, mobile ? 80 : 120, mobile ? 200 : 320);
        }
        if (t > 0.3 && !burstWave2) {
          burstWave2 = true;
          spawnFromEdges(mobile ? 50 : 150, mobile ? 60 : 90, mobile ? 160 : 260);
        }
        if (t > 0.65 && !burstWave3) {
          burstWave3 = true;
          spawnFromEdges(mobile ? 30 : 80, mobile ? 40 : 60, mobile ? 120 : 200);
        }

        drawParticles();

      } else if (animTime < PHASE.SPREAD_END) {
        const t = (animTime - PHASE.BURST_END) / (PHASE.SPREAD_END - PHASE.BURST_END);
        drawText(1, 1);
        drawMesh(1 - t * 0.1);

        if (t < 0.3) spawnFromEdges(mobile ? 1 : 3, 20, 60);

        drawParticles();

      } else if (animTime < PHASE.RETURN_END) {
        drawText(1, 1);
        const rt = (animTime - PHASE.SPREAD_END) / (PHASE.RETURN_END - PHASE.SPREAD_END);
        drawMesh(0.9 - easeOut(rt) * 0.4);
        drawParticles();

      } else {
        const t = (animTime - PHASE.RETURN_END) / (PHASE.SETTLE_END - PHASE.RETURN_END);
        drawText(1, 1);
        drawMesh(Math.max(0, 0.5 * (1 - easeOut(t))));
        drawParticles();
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd, targetRef]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) { setIsActive(false); onAnimationEnd(); return; }
    const timer = setTimeout(startAnimation, 150);
    return () => { clearTimeout(timer); cancelAnimationFrame(animRef.current); };
  }, [startAnimation, onAnimationEnd]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 9999, pointerEvents: "none",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
