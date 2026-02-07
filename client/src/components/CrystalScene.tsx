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

function ZigZagLines({ scrollY }: { scrollY: number }) {
  const tRef = useRef(0);
  const lineCount = 30;
  const segmentsPerLeg = 60;
  const legCount = 8;
  const totalSegments = segmentsPerLeg * legCount;
  const legHeight = 7;
  const xLeft = -12;
  const xRight = 12;

  const lines = useMemo(() => {
    const result: {
      geometry: THREE.BufferGeometry;
      line: THREE.Line;
      spreadOffset: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const frac = (i / (lineCount - 1)) - 0.5;
      const spreadOffset = frac * 2.5;
      const phase = (i / lineCount) * Math.PI * 0.8;

      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= totalSegments; s++) {
        points.push(new THREE.Vector3(0, 0, -1.5 + (Math.random() - 0.5) * 1.0));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const color = LINE_COLORS[i % LINE_COLORS.length];
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.15,
      });
      const line = new THREE.Line(geo, mat);

      result.push({ geometry: geo, line, spreadOffset, phase });
    }
    return result;
  }, [lineCount, totalSegments]);

  useFrame((_, dt) => {
    tRef.current += dt * 0.4;

    for (const l of lines) {
      const pos = l.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let s = 0; s <= totalSegments; s++) {
        const leg = Math.floor(s / segmentsPerLeg);
        const legFrac = (s % segmentsPerLeg) / segmentsPerLeg;
        const goingRight = leg % 2 === 0;

        const yBase = -(leg * legHeight + legFrac * legHeight);

        let xBase: number;
        if (goingRight) {
          xBase = xRight + (xLeft - xRight) * legFrac;
        } else {
          xBase = xLeft + (xRight - xLeft) * legFrac;
        }

        const globalFrac = s / totalSegments;
        const envelope = Math.sin(globalFrac * Math.PI);
        const localEnvelope = Math.sin(legFrac * Math.PI);
        const env = Math.max(envelope, localEnvelope * 0.5);

        const dx = goingRight ? -1 : 1;
        const dy = -1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / len;
        const perpY = dx / len;

        const wave1 = Math.sin(legFrac * Math.PI * 4 + tRef.current + l.phase + leg * 1.5) * 0.5 * env;
        const wave2 = Math.sin(legFrac * Math.PI * 2.5 + tRef.current * 0.6 + l.phase * 1.3 + leg) * 0.3 * env;
        const wave3 = Math.sin(legFrac * Math.PI * 6 + tRef.current * 1.2 + l.phase * 0.7 + leg * 2) * 0.12 * env;
        const totalWave = wave1 + wave2 + wave3;

        arr[s * 3] = xBase + perpX * (totalWave + l.spreadOffset * 0.3);
        arr[s * 3 + 1] = yBase + perpY * totalWave + l.spreadOffset * 0.15;
        arr[s * 3 + 2] = -1.5 + Math.sin(legFrac * Math.PI * 3 + tRef.current * 0.3 + l.phase + leg) * 0.2 * env;
      }

      pos.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -scrollY, 0]}>
      {lines.map((l, i) => (
        <primitive key={i} object={l.line} />
      ))}
    </group>
  );
}

function ScrollTracker({ onScroll }: { onScroll: (y: number) => void }) {
  useFrame(() => {
    if (typeof window !== "undefined") {
      const scrollPx = window.scrollY;
      const viewH = window.innerHeight;
      const unitsPerScreen = 7;
      onScroll((scrollPx / viewH) * unitsPerScreen);
    }
  });
  return null;
}

function WaveLinesScene() {
  const scrollRef = useRef(0);

  return (
    <>
      <ScrollTracker onScroll={(y) => { scrollRef.current = y; }} />
      <InnerScene scrollRef={scrollRef} />
      <ambientLight intensity={0.1} />
    </>
  );
}

function InnerScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = scrollRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      <ZigZagLines scrollY={0} />
    </group>
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
