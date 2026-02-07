import { useRef, useMemo, useState, useEffect, useCallback } from "react";
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

function WaveStrip({ scrollUnits }: { scrollUnits: React.MutableRefObject<number> }) {
  const tRef = useRef(0);
  const lineCount = 30;
  const segments = 200;

  const totalHeight = 60;

  const lines = useMemo(() => {
    const result: {
      geometry: THREE.BufferGeometry;
      line: THREE.Line;
      spreadOffset: number;
      phase: number;
      zBase: number;
    }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const frac = (i / (lineCount - 1)) - 0.5;
      const spreadOffset = frac * 3;
      const phase = (i / lineCount) * Math.PI * 0.6;
      const zBase = -1.5 + (Math.random() - 0.5) * 1.2;

      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        points.push(new THREE.Vector3(0, 0, zBase));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const color = LINE_COLORS[i % LINE_COLORS.length];
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.15,
      });
      const line = new THREE.Line(geo, mat);

      result.push({ geometry: geo, line, spreadOffset, phase, zBase });
    }
    return result;
  }, []);

  useFrame((_, dt) => {
    tRef.current += dt * 0.4;
    const scroll = scrollUnits.current;

    for (const l of lines) {
      const pos = l.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const y = -t * totalHeight;

        const sineX = Math.sin(t * Math.PI * 2.5) * 8;

        const envelope = Math.sin(t * Math.PI);
        const wave1 = Math.sin(t * Math.PI * 5 + tRef.current + l.phase) * 0.5 * envelope;
        const wave2 = Math.sin(t * Math.PI * 3 + tRef.current * 0.6 + l.phase * 1.3) * 0.3 * envelope;

        const perpWave = wave1 + wave2;

        arr[s * 3] = sineX + l.spreadOffset + perpWave * 0.5;
        arr[s * 3 + 1] = y + scroll + perpWave * 0.3;
        arr[s * 3 + 2] = l.zBase + Math.sin(t * Math.PI * 3 + tRef.current * 0.3 + l.phase) * 0.3 * envelope;
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
  const scrollRef = useRef(0);

  useFrame(() => {
    if (typeof window !== "undefined") {
      const scrollPx = window.scrollY;
      const viewH = window.innerHeight;
      const unitsPerScreen = 7;
      scrollRef.current = (scrollPx / viewH) * unitsPerScreen;
    }
  });

  return (
    <>
      <WaveStrip scrollUnits={scrollRef} />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);
  if (isMobile) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <WaveLinesScene />
      </Canvas>
    </div>
  );
}
