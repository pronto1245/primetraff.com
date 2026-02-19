import { useRef, useEffect, useState, useCallback, type RefObject } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  vz: number;
  rotation: number;
  rotSpeed: number;
  w: number;
  h: number;
  life: number;
  maxLife: number;
  baseAlpha: number;
  returnPhase: boolean;
}

interface MeshPoint {
  x: number;
  y: number;
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
    for (let y = 0; y < h; y += 3) {
      for (let x = 0; x < w; x += 3) {
        if (pixels[(y * canvasW + x) * 4 + 3] > 20) {
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

    const edgePoints: { x: number; y: number; nx: number; ny: number }[] = [];
    const edgeStep = mobile ? 4 : 2;
    for (let y = minTY; y <= maxTY; y += edgeStep) {
      for (let x = minTX; x <= maxTX; x += edgeStep) {
        const idx = (Math.floor(y) * canvasW + Math.floor(x)) * 4;
        if (idx < 0 || idx >= pixels.length) continue;
        const a = pixels[idx + 3];
        if (a > 30) {
          let isEdge = false;
          let enx = 0, eny = 0;
          for (const [dx, dy] of [[-edgeStep,0],[edgeStep,0],[0,-edgeStep],[0,edgeStep]]) {
            const nx2 = x + dx, ny2 = y + dy;
            if (nx2 < 0 || nx2 >= w || ny2 < 0 || ny2 >= h) {
              isEdge = true;
              enx -= dx; eny -= dy;
              continue;
            }
            const ni = (Math.floor(ny2) * canvasW + Math.floor(nx2)) * 4;
            if (ni < 0 || ni >= pixels.length || pixels[ni + 3] < 30) {
              isEdge = true;
              enx -= dx; eny -= dy;
            }
          }
          if (isEdge) {
            const len = Math.sqrt(enx * enx + eny * eny) || 1;
            edgePoints.push({ x, y, nx: enx / len, ny: eny / len });
          }
        }
      }
    }

    const maxMeshPts = mobile ? 200 : 500;
    let meshGrid = mobile ? 20 : 12;
    const meshPts: MeshPoint[] = [];
    
    const textAreaW = maxTX - minTX;
    const textAreaH = maxTY - minTY;
    const estPts = (textAreaW / meshGrid) * (textAreaH / meshGrid) * 0.6;
    if (estPts > maxMeshPts) {
      meshGrid = Math.ceil(Math.sqrt((textAreaW * textAreaH * 0.6) / maxMeshPts));
    }

    for (let y = minTY; y <= maxTY; y += meshGrid) {
      for (let x = minTX; x <= maxTX; x += meshGrid) {
        if (meshPts.length >= maxMeshPts) break;
        const idx = (Math.floor(y) * canvasW + Math.floor(x)) * 4;
        if (idx >= 0 && idx < pixels.length && pixels[idx + 3] > 20) {
          meshPts.push({
            x: x + (Math.random() - 0.5) * meshGrid * 0.2,
            y: y + (Math.random() - 0.5) * meshGrid * 0.2,
          });
        }
      }
    }
    const edgeStride = mobile ? 3 : 2;
    for (let i = 0; i < edgePoints.length && meshPts.length < maxMeshPts; i += edgeStride) {
      meshPts.push({ x: edgePoints[i].x, y: edgePoints[i].y });
    }

    const meshTris: MeshTriangle[] = [];
    const maxD = meshGrid * 2.0;
    const triSet = new Set<string>();
    for (let i = 0; i < meshPts.length; i++) {
      const near: { idx: number; d: number }[] = [];
      for (let j = 0; j < meshPts.length; j++) {
        if (i === j) continue;
        const dx = meshPts[i].x - meshPts[j].x;
        const dy = meshPts[i].y - meshPts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) near.push({ idx: j, d });
      }
      near.sort((a, b) => a.d - b.d);
      const limit = Math.min(near.length, 6);
      for (let k = 0; k < limit - 1; k++) {
        for (let l = k + 1; l < limit; l++) {
          const ids = [i, near[k].idx, near[l].idx].sort((a, b) => a - b);
          const key = ids.join(",");
          if (!triSet.has(key)) {
            triSet.add(key);
            meshTris.push({ a: ids[0], b: ids[1], c: ids[2] });
          }
        }
      }
    }

    const particles: Particle[] = [];
    const maxParticles = mobile ? 250 : 700;
    const perspective = 800;

    function project3d(x: number, y: number, z: number) {
      const cz = Math.max(z, -perspective + 50);
      const scale = perspective / (perspective + cz);
      return {
        sx: textCX + (x - textCX) * scale,
        sy: textCY + (y - textCY) * scale,
        scale: Math.max(0.1, scale),
      };
    }

    function spawnBurst(count: number, speedMin: number, speedMax: number, lifeMin: number, lifeMax: number, sizeScale: number) {
      for (let i = 0; i < count && particles.length < maxParticles; i++) {
        const ep = edgePoints[Math.floor(Math.random() * edgePoints.length)];
        if (!ep) continue;
        const outAngle = Math.atan2(ep.ny, ep.nx);
        const spread = (Math.random() - 0.5) * 1.4;
        const angle = outAngle + spread;
        const spd = speedMin + Math.random() * (speedMax - speedMin);
        const life = lifeMin + Math.random() * (lifeMax - lifeMin);
        const zSpd = (Math.random() - 0.5) * 150;

        particles.push({
          x: ep.x + ep.nx * 2,
          y: ep.y + ep.ny * 2,
          z: (Math.random() - 0.5) * 80,
          originX: ep.x,
          originY: ep.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          vz: zSpd,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 12,
          w: (1.5 + Math.random() * 5) * sizeScale,
          h: (0.8 + Math.random() * 3) * sizeScale,
          life,
          maxLife: life,
          baseAlpha: 0.5 + Math.random() * 0.5,
          returnPhase: false,
        });
      }
    }

    function spawnAmbient(count: number) {
      for (let i = 0; i < count && particles.length < maxParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const textW = maxTX - minTX;
        const textH = maxTY - minTY;
        const dist = Math.max(textW, textH) * (0.3 + Math.random() * 0.8);
        const px = textCX + Math.cos(angle) * dist;
        const py = textCY + Math.sin(angle) * dist;
        const spd = 15 + Math.random() * 50;
        const life = 1.5 + Math.random() * 2;

        particles.push({
          x: px, y: py,
          z: (Math.random() - 0.5) * 200,
          originX: textCX + Math.cos(angle) * 20,
          originY: textCY + Math.sin(angle) * 20,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 10,
          vz: (Math.random() - 0.5) * 60,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 6,
          w: 1 + Math.random() * 3,
          h: 0.5 + Math.random() * 1.5,
          life, maxLife: life,
          baseAlpha: 0.2 + Math.random() * 0.3,
          returnPhase: false,
        });
      }
    }

    let globalReturnStrength = 0;

    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (globalReturnStrength > 0.01) {
          p.returnPhase = true;
        }

        if (p.returnPhase) {
          const pullStrength = 200 * globalReturnStrength * globalReturnStrength;
          
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dz = 0 - p.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

          p.vx += (dx / dist) * pullStrength * dt;
          p.vy += (dy / dist) * pullStrength * dt;
          p.vz += (dz / dist) * pullStrength * dt * 0.5;

          p.vx *= 0.96;
          p.vy *= 0.96;
          p.vz *= 0.95;
        } else {
          p.vy += 5 * dt;
          p.vx *= 0.998;
          p.vy *= 0.998;
          p.vz *= 0.99;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.rotation += p.rotSpeed * dt;
        p.life -= dt;

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const lr = Math.max(0, p.life / p.maxLife);
        if (lr < 0.01) continue;
        const { sx, sy, scale } = project3d(p.x, p.y, p.z);
        const sz = Math.max(0.15, scale);
        
        let alpha = p.baseAlpha;
        if (lr > 0.9) {
          alpha *= (1 - lr) / 0.1;
        } else if (lr < 0.15) {
          alpha *= lr / 0.15;
        }

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(p.rotation);
        ctx.scale(sz, sz);
        ctx.globalAlpha = alpha * Math.min(1, sz + 0.3);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    function drawMesh(strength: number) {
      if (strength <= 0.005) return;
      ctx.save();

      ctx.strokeStyle = `rgba(170,200,255,${0.4 * strength})`;
      ctx.lineWidth = 1.2;
      for (const tri of meshTris) {
        const a = meshPts[tri.a], b = meshPts[tri.b], c = meshPts[tri.c];
        if (!a || !b || !c) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = `rgba(200,230,255,${0.7 * strength})`;
      const dotR = 2.0;
      for (const p of meshPts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function drawSolidText(scaleX: number, alpha: number, skewAmount = 0) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(textCX, textCY);
      if (skewAmount !== 0) {
        ctx.transform(1, 0, skewAmount, 1, 0, 0);
      }
      ctx.scale(scaleX, 1);
      ctx.translate(-textCX, -textCY);
      ctx.drawImage(textCanvas, 0, 0);
      ctx.restore();
    }

    function drawMeshTransformed(strength: number, scaleX: number, skewAmount = 0) {
      if (strength <= 0.005) return;
      ctx.save();
      ctx.translate(textCX, textCY);
      if (skewAmount !== 0) {
        ctx.transform(1, 0, skewAmount, 1, 0, 0);
      }
      ctx.scale(scaleX, 1);
      ctx.translate(-textCX, -textCY);
      drawMesh(strength);
      ctx.restore();
    }

    const P_APPEAR = 0.25;
    const P_ROTATE = 1.4;
    const P_MESH_IN = 0.4;
    const P_BURST = 0.8;
    const P_SPREAD = 1.8;
    const P_RETURN = 1.5;
    const P_SETTLE = 0.6;
    const TOTAL = P_APPEAR + P_ROTATE + P_MESH_IN + P_BURST + P_SPREAD + P_RETURN + P_SETTLE;

    const start = performance.now();
    let prevTime = start;
    let burstDone = false;
    let burst2Done = false;
    let burst3Done = false;

    function easeOut(t: number) { return 1 - (1 - t) ** 3; }
    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

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

      const e1 = P_APPEAR;
      const e2 = e1 + P_ROTATE;
      const e3 = e2 + P_MESH_IN;
      const e4 = e3 + P_BURST;
      const e5 = e4 + P_SPREAD;
      const e6 = e5 + P_RETURN;

      if (el >= e5) {
        const returnT = Math.min((el - e5) / P_RETURN, 1);
        globalReturnStrength = easeInOut(returnT);
      } else {
        globalReturnStrength = 0;
      }

      updateParticles(dt);

      if (el < e1) {
        const t = el / P_APPEAR;
        drawSolidText(1, easeOut(t));

      } else if (el < e2) {
        const t = (el - e1) / P_ROTATE;
        const eased = easeInOut(t);
        const angle = eased * Math.PI * 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const scaleX = Math.max(Math.abs(cosA), 0.02);
        const skew = sinA * 0.12;
        const alpha = 0.25 + 0.75 * scaleX;

        drawSolidText(scaleX, alpha, skew);

        const meshT = Math.max(0, (t - 0.3) / 0.7);
        if (meshT > 0) {
          drawMeshTransformed(easeOut(meshT) * 0.5, scaleX, skew);
        }

      } else if (el < e3) {
        const t = (el - e2) / P_MESH_IN;
        drawSolidText(1, 1);
        drawMesh(0.5 + easeOut(t) * 0.5);

      } else if (el < e4) {
        const t = (el - e3) / P_BURST;
        drawSolidText(1, 1);
        drawMesh(1.0);

        if (!burstDone) {
          burstDone = true;
          spawnBurst(mobile ? 120 : 400, mobile ? 80 : 140, mobile ? 200 : 350, 3.0, 5.5, 1.3);
          spawnAmbient(mobile ? 40 : 100);
        }
        if (t > 0.25 && !burst2Done) {
          burst2Done = true;
          spawnBurst(mobile ? 60 : 180, mobile ? 50 : 100, mobile ? 150 : 250, 2.5, 5.0, 1.0);
        }
        if (t > 0.55 && !burst3Done) {
          burst3Done = true;
          spawnBurst(mobile ? 30 : 80, mobile ? 30 : 60, mobile ? 100 : 180, 2.0, 4.0, 0.8);
        }

        if (t < 0.8) {
          spawnBurst(mobile ? 1 : 4, 20, 80, 2.0, 3.5, 0.6);
        }

        drawParticles();

      } else if (el < e5) {
        const t = (el - e4) / P_SPREAD;
        drawSolidText(1, 1);

        const meshStr = 1.0 - easeOut(Math.min(t * 0.5, 1)) * 0.1;
        drawMesh(meshStr);

        if (t < 0.3) {
          spawnBurst(mobile ? 1 : 2, 15, 50, 1.5, 2.5, 0.5);
        }

        drawParticles();

      } else if (el < e6) {
        const t = (el - e5) / P_RETURN;
        drawSolidText(1, 1);

        const meshStr = 0.9 - easeOut(t) * 0.3;
        drawMesh(meshStr);
        drawParticles();

      } else {
        const t = (el - e6) / P_SETTLE;
        const fadeEased = easeOut(t);
        drawSolidText(1, 1);

        const meshStr = Math.max(0, 0.6 * (1 - fadeEased));
        drawMesh(meshStr);
        drawParticles();
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
  }, [onAnimationEnd, targetRef]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) {
      setIsActive(false);
      onAnimationEnd();
      return;
    }
    const timer = setTimeout(startAnimation, 200);
    return () => { clearTimeout(timer); cancelAnimationFrame(animRef.current); };
  }, [startAnimation, onAnimationEnd]);

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
