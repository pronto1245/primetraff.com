import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = [
  "#0099FF", "#00CCFF", "#00DDFF", "#0077CC", "#60CFFF",
  "#A855F7", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981",
  "#22D3EE", "#06B6D4", "#FF6B35", "#3B82F6", "#14B8A6",
  "#6366F1", "#F472B6", "#34D399", "#FBBF24", "#38BDF8",
];

function DiagonalHairBundle({
  count,
  fromCorner,
  toCorner,
  spread,
  direction,
  speedBase,
  waveAmpBase,
}: {
  count: number;
  fromCorner: [number, number];
  toCorner: [number, number];
  spread: number;
  direction: 1 | -1;
  speedBase: number;
  waveAmpBase: number;
}) {
  const segments = 80;
  const tRef = useRef(Math.random() * 20);

  const dx = toCorner[0] - fromCorner[0];
  const dy = toCorner[1] - fromCorner[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  const perpX = -dy / len;
  const perpY = dx / len;

  const lines = useMemo(() => {
    const result: {
      geometry: THREE.BufferGeometry;
      line: THREE.Line;
      offset: number;
      zOff: number;
      waveAmp: number;
      waveFreq: number;
      speed: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
      const offset = ((i / (count - 1)) - 0.5) * spread;
      const zOff = -1 - Math.random() * 2;
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const frac = s / segments;
        const bx = fromCorner[0] + dx * frac + perpX * offset;
        const by = fromCorner[1] + dy * frac + perpY * offset;
        points.push(new THREE.Vector3(bx, by, zOff));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const color = COLORS[i % COLORS.length];
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.18,
      });
      const line = new THREE.Line(geo, mat);
      result.push({
        geometry: geo,
        line,
        offset,
        zOff,
        waveAmp: waveAmpBase * (0.6 + Math.random() * 0.8),
        waveFreq: 2 + Math.random() * 3,
        speed: speedBase * (0.5 + Math.random() * 1.0),
        phase: Math.random() * Math.PI * 2,
      });
    }
    return result;
  }, [count, fromCorner, toCorner, spread, speedBase, waveAmpBase, dx, dy, perpX, perpY, segments]);

  useFrame((_, dt) => {
    tRef.current += dt;
    for (const l of lines) {
      const pos = l.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const time = tRef.current * l.speed * direction;
      for (let s = 0; s <= segments; s++) {
        const frac = s / segments;
        const bx = fromCorner[0] + dx * frac + perpX * l.offset;
        const by = fromCorner[1] + dy * frac + perpY * l.offset;
        const wave = Math.sin(frac * Math.PI * l.waveFreq + time + l.phase) * l.waveAmp;
        const wave2 = Math.sin(frac * Math.PI * l.waveFreq * 1.7 + time * 0.6 + l.phase + 2) * l.waveAmp * 0.25;
        arr[s * 3] = bx + perpX * (wave + wave2);
        arr[s * 3 + 1] = by + perpY * (wave + wave2);
        arr[s * 3 + 2] = l.zOff + Math.sin(frac * Math.PI * 2.5 + time * 0.35) * l.waveAmp * 0.4;
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

function HairFieldScene() {
  return (
    <>
      <DiagonalHairBundle
        count={35}
        fromCorner={[-8, 6]}
        toCorner={[8, -6]}
        spread={3}
        direction={1}
        speedBase={0.7}
        waveAmpBase={0.2}
      />
      <DiagonalHairBundle
        count={35}
        fromCorner={[8, 6]}
        toCorner={[-8, -6]}
        spread={3}
        direction={-1}
        speedBase={0.6}
        waveAmpBase={0.25}
      />
      <DiagonalHairBundle
        count={20}
        fromCorner={[-8, 3]}
        toCorner={[8, -9]}
        spread={2}
        direction={1}
        speedBase={0.5}
        waveAmpBase={0.18}
      />
      <DiagonalHairBundle
        count={20}
        fromCorner={[8, 3]}
        toCorner={[-8, -9]}
        spread={2}
        direction={-1}
        speedBase={0.55}
        waveAmpBase={0.22}
      />
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
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <HairFieldScene />
      </Canvas>
    </div>
  );
}
