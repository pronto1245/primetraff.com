import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DiagonalStripe({
  from,
  to,
  color,
  opacity,
  speed,
  direction,
  waveAmp,
  waveFreq,
  phaseOffset,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  opacity: number;
  speed: number;
  direction: 1 | -1;
  waveAmp: number;
  waveFreq: number;
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(phaseOffset);
  const segments = 100;

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const frac = i / segments;
      const x = from[0] + (to[0] - from[0]) * frac;
      const y = from[1] + (to[1] - from[1]) * frac;
      const z = from[2] + (to[2] - from[2]) * frac;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [from, to, segments]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    [color, opacity]
  );

  const lineObj = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  const perpX = -dy / len;
  const perpY = dx / len;

  useFrame((_, dt) => {
    t.current += dt * speed * direction;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i <= segments; i++) {
      const frac = i / segments;
      const baseX = from[0] + (to[0] - from[0]) * frac;
      const baseY = from[1] + (to[1] - from[1]) * frac;
      const baseZ = from[2] + (to[2] - from[2]) * frac;

      const wave = Math.sin(frac * Math.PI * waveFreq + t.current) * waveAmp;
      const wave2 = Math.sin(frac * Math.PI * waveFreq * 2.2 + t.current * 0.7 + 1.0) * waveAmp * 0.3;
      const offset = wave + wave2;

      arr[i * 3] = baseX + perpX * offset;
      arr[i * 3 + 1] = baseY + perpY * offset;
      arr[i * 3 + 2] = baseZ + Math.sin(frac * Math.PI * 3 + t.current * 0.4) * waveAmp * 0.5;
    }

    pos.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <primitive object={lineObj} />
    </group>
  );
}

function StripesScene() {
  const stripes = useMemo(() => [
    { from: [-8, 5, -1] as [number,number,number], to: [8, -5, -1] as [number,number,number], color: "#0099FF", opacity: 0.4, speed: 0.9, direction: 1 as const, waveAmp: 0.4, waveFreq: 3, phase: 0 },
    { from: [8, 5, -1.5] as [number,number,number], to: [-8, -5, -1.5] as [number,number,number], color: "#00DDFF", opacity: 0.35, speed: 0.7, direction: -1 as const, waveAmp: 0.5, waveFreq: 2.5, phase: 1.5 },
    { from: [-8, 3, -2] as [number,number,number], to: [8, -7, -2] as [number,number,number], color: "#FF6B35", opacity: 0.3, speed: 0.6, direction: 1 as const, waveAmp: 0.35, waveFreq: 4, phase: 3 },
    { from: [8, 4, -0.5] as [number,number,number], to: [-8, -6, -0.5] as [number,number,number], color: "#A855F7", opacity: 0.3, speed: 0.8, direction: -1 as const, waveAmp: 0.45, waveFreq: 2.8, phase: 2 },
    { from: [-8, 6, -2.5] as [number,number,number], to: [8, -4, -2.5] as [number,number,number], color: "#22D3EE", opacity: 0.25, speed: 0.5, direction: 1 as const, waveAmp: 0.3, waveFreq: 3.5, phase: 4 },
    { from: [8, 6, -1.2] as [number,number,number], to: [-8, -4, -1.2] as [number,number,number], color: "#10B981", opacity: 0.3, speed: 0.75, direction: -1 as const, waveAmp: 0.4, waveFreq: 3.2, phase: 0.8 },

    { from: [-8, -1, -1.8] as [number,number,number], to: [8, -9, -1.8] as [number,number,number], color: "#0077CC", opacity: 0.3, speed: 0.65, direction: 1 as const, waveAmp: 0.35, waveFreq: 2.6, phase: 5 },
    { from: [8, 0, -2.2] as [number,number,number], to: [-8, -8, -2.2] as [number,number,number], color: "#F59E0B", opacity: 0.25, speed: 0.55, direction: -1 as const, waveAmp: 0.4, waveFreq: 3, phase: 1 },
    { from: [-8, 7, -0.8] as [number,number,number], to: [8, -3, -0.8] as [number,number,number], color: "#EC4899", opacity: 0.2, speed: 0.85, direction: 1 as const, waveAmp: 0.3, waveFreq: 4.2, phase: 2.5 },
    { from: [8, 7, -1.6] as [number,number,number], to: [-8, -3, -1.6] as [number,number,number], color: "#60CFFF", opacity: 0.35, speed: 0.7, direction: -1 as const, waveAmp: 0.5, waveFreq: 2.2, phase: 3.5 },
    { from: [-8, 2, -2.8] as [number,number,number], to: [8, -8, -2.8] as [number,number,number], color: "#8B5CF6", opacity: 0.2, speed: 0.45, direction: 1 as const, waveAmp: 0.25, waveFreq: 3.8, phase: 6 },
    { from: [8, 2, -0.3] as [number,number,number], to: [-8, -8, -0.3] as [number,number,number], color: "#06B6D4", opacity: 0.28, speed: 0.6, direction: -1 as const, waveAmp: 0.35, waveFreq: 3.4, phase: 4.5 },
  ], []);

  return (
    <>
      {stripes.map((s, i) => (
        <DiagonalStripe
          key={i}
          from={s.from}
          to={s.to}
          color={s.color}
          opacity={s.opacity}
          speed={s.speed}
          direction={s.direction}
          waveAmp={s.waveAmp}
          waveFreq={s.waveFreq}
          phaseOffset={s.phase}
        />
      ))}
      <ambientLight intensity={0.15} />
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
        <StripesScene />
      </Canvas>
    </div>
  );
}
