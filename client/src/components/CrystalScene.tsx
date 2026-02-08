import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LINE_COLORS = [
  "#00DDFF", "#00CCEE", "#00BBDD", "#00AACC", "#0099BB",
  "#0088AA", "#007799", "#006688", "#00BBFF", "#00EECC",
  "#00DDAA", "#00CC99", "#00FFDD", "#00EEBB", "#00DDBB",
  "#22CCDD", "#11BBCC", "#00AABB", "#33DDEE", "#44EEFF",
  "#00FFE0", "#00EED0", "#00DDC0", "#00CCB0", "#00BBA0",
  "#55EEFF", "#66FFEE", "#00FFCC", "#22EEDD", "#33FFEE",
];

function WaveBundle({
  lineCount,
  startX,
  startY,
  endX,
  endY,
  baseSpread,
  speedMul,
  phaseBase,
}: {
  lineCount: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  baseSpread: number;
  speedMul: number;
  phaseBase: number;
}) {
  const segments = 120;
  const tRef = useRef(phaseBase);

  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const perpX = -dy / length;
  const perpY = dx / length;

  const lines = useMemo(() => {
    const result: {
      geometry: THREE.BufferGeometry;
      line: THREE.Line;
      spreadOffset: number;
      phase: number;
      zOff: number;
    }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const frac = lineCount === 1 ? 0 : (i / (lineCount - 1)) - 0.5;
      const spreadOffset = frac * baseSpread;
      const zOff = -1.5 + (Math.random() - 0.5) * 1.5;
      const phase = (i / lineCount) * Math.PI * 0.8;

      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const x = startX + dx * t + perpX * spreadOffset;
        const y = startY + dy * t + perpY * spreadOffset;
        points.push(new THREE.Vector3(x, y, zOff));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const color = LINE_COLORS[i % LINE_COLORS.length];
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18 + Math.random() * 0.15,
      });
      const line = new THREE.Line(geo, mat);

      result.push({ geometry: geo, line, spreadOffset, phase, zOff });
    }
    return result;
  }, [lineCount, startX, startY, endX, endY, baseSpread, perpX, perpY, dx, dy, segments]);

  useFrame((_, dt) => {
    tRef.current += dt * 0.4 * speedMul;

    for (const l of lines) {
      const pos = l.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const baseX = startX + dx * t + perpX * l.spreadOffset;
        const baseY = startY + dy * t + perpY * l.spreadOffset;

        const envelope = Math.sin(t * Math.PI);
        const wave1 = Math.sin(t * Math.PI * 4 + tRef.current + l.phase) * 0.6 * envelope;
        const wave2 = Math.sin(t * Math.PI * 2.5 + tRef.current * 0.6 + l.phase * 1.3) * 0.35 * envelope;
        const wave3 = Math.sin(t * Math.PI * 6 + tRef.current * 1.2 + l.phase * 0.7) * 0.15 * envelope;
        const totalWave = wave1 + wave2 + wave3;

        arr[s * 3] = baseX + perpX * totalWave;
        arr[s * 3 + 1] = baseY + perpY * totalWave;
        arr[s * 3 + 2] = l.zOff + Math.sin(t * Math.PI * 3 + tRef.current * 0.3 + l.phase) * 0.2 * envelope;
      }

      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l.line} />
      ))}
    </group>
  );
}

function WaveLinesScene() {
  return (
    <>
      <WaveBundle
        lineCount={30}
        startX={9} startY={7}
        endX={-9} endY={-7}
        baseSpread={2.5}
        speedMul={1}
        phaseBase={0}
      />

      <ambientLight intensity={0.1} />
    </>
  );
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
  if ("ontouchstart" in window) return true;
  if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) return true;
  const ua = navigator.userAgent || "";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && "ontouchend" in document) return true;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true;
  return false;
}

export default function CrystalScene() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isMobileOrTablet()) return;
    if (window.innerWidth >= 768 && window.innerHeight >= 500 && WebGLCheck()) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", pointerEvents: "none" }}
        onCreated={() => {}}
      >
        <WaveLinesScene />
      </Canvas>
    </div>
  );
}
