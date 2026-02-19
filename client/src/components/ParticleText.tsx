import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function sampleTextPixels(
  text: string,
  fontSize: number,
  gridStep: number
): { x: number; y: number }[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  const metrics = ctx.measureText(text);
  const w = Math.ceil(metrics.width) + 20;
  const h = fontSize + 20;
  canvas.width = w;
  canvas.height = h;
  ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "top";
  ctx.fillText(text, 10, 10);
  const imgData = ctx.getImageData(0, 0, w, h);
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += gridStep) {
    for (let x = 0; x < w; x += gridStep) {
      const idx = (y * w + x) * 4;
      if (imgData.data[idx + 3] > 128) {
        points.push({ x: x - w / 2, y: -(y - h / 2) });
      }
    }
  }
  return points;
}

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const startTime = useRef(performance.now());
  const ASSEMBLE_DURATION = 2.0;
  const SCATTER_RADIUS = 25;

  const { positions, scatterPositions, phases, count } = useMemo(() => {
    const gridStep = window.innerWidth > 1200 ? 4 : 5;
    const fontSize = window.innerWidth > 1200 ? 120 : window.innerWidth > 768 ? 90 : 70;
    const sampled = sampleTextPixels("iGAMING", fontSize, gridStep);
    const scale = 0.06;
    const cnt = sampled.length;
    const pos = new Float32Array(cnt * 3);
    const scatter = new Float32Array(cnt * 3);
    const phs = new Float32Array(cnt);

    for (let i = 0; i < cnt; i++) {
      pos[i * 3] = sampled[i].x * scale;
      pos[i * 3 + 1] = sampled[i].y * scale;
      pos[i * 3 + 2] = 0;

      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const r = SCATTER_RADIUS * (0.3 + Math.random() * 0.7);
      scatter[i * 3] = Math.cos(angle1) * Math.sin(angle2) * r;
      scatter[i * 3 + 1] = Math.sin(angle1) * Math.sin(angle2) * r;
      scatter[i * 3 + 2] = Math.cos(angle2) * r * 0.3;

      phs[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, scatterPositions: scatter, phases: phs, count: cnt };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(count * 3), 3));
    return geo;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const elapsed = (performance.now() - startTime.current) / 1000;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const assembleProgress = Math.min(elapsed / ASSEMBLE_DURATION, 1);
    const eased = 1 - Math.pow(1 - assembleProgress, 3);

    for (let i = 0; i < count; i++) {
      const tx = positions[i * 3];
      const ty = positions[i * 3 + 1];
      const tz = positions[i * 3 + 2];
      const sx = scatterPositions[i * 3];
      const sy = scatterPositions[i * 3 + 1];
      const sz = scatterPositions[i * 3 + 2];

      let x = sx + (tx - sx) * eased;
      let y = sy + (ty - sy) * eased;
      let z = sz + (tz - sz) * eased;

      if (assembleProgress >= 1) {
        const breathe = Math.sin(elapsed * 0.8 + phases[i]) * 0.04;
        const breathe2 = Math.cos(elapsed * 0.6 + phases[i] * 1.3) * 0.03;
        x = tx + breathe;
        y = ty + breathe2;
        z = tz + Math.sin(elapsed * 0.5 + phases[i] * 0.7) * 0.02;
      }

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.12,
      color: new THREE.Color("#00CCFF"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function WebGLCheck() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function isMobileOrTablet() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;
  const ua = navigator.userAgent || "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && "ontouchend" in document) return true;
  return false;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function ParticleText() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isMobileOrTablet()) return;
    if (prefersReducedMotion()) return;
    if (window.innerWidth >= 768 && window.innerHeight >= 500 && WebGLCheck()) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
