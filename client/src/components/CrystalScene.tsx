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

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function serpentinePath(progress: number, halfWidth: number, rowHeight: number, turnRadius: number) {
  const rowSpan = halfWidth * 2;
  const totalRowLen = rowSpan + Math.PI * turnRadius;

  const totalDist = progress * totalRowLen;
  const rowIndex = Math.floor(progress);
  const localProgress = progress - rowIndex;

  const straightLen = rowSpan;
  const turnLen = Math.PI * turnRadius;
  const localDist = localProgress * totalRowLen;

  let x: number, y: number;
  const goingRight = rowIndex % 2 === 0;

  if (localDist <= straightLen) {
    const frac = localDist / straightLen;
    if (goingRight) {
      x = -halfWidth + frac * rowSpan;
    } else {
      x = halfWidth - frac * rowSpan;
    }
    y = -rowIndex * rowHeight;
  } else {
    const turnDist = localDist - straightLen;
    const turnFrac = turnDist / turnLen;
    const angle = turnFrac * Math.PI;

    if (goingRight) {
      x = halfWidth - Math.sin(angle) * turnRadius;
      y = -rowIndex * rowHeight - (1 - Math.cos(angle)) * turnRadius * 0.5 - turnFrac * (rowHeight - turnRadius);
    } else {
      x = -halfWidth + Math.sin(angle) * turnRadius;
      y = -rowIndex * rowHeight - (1 - Math.cos(angle)) * turnRadius * 0.5 - turnFrac * (rowHeight - turnRadius);
    }
  }

  return { x, y };
}

function FlowingLines() {
  const tRef = useRef(0);
  const scrollRef = useRef(0);
  const lineCount = 30;
  const segments = 500;

  const halfWidth = 7;
  const rowHeight = 4;
  const numRows = 20;
  const totalPathLen = numRows;

  const lines = useMemo(() => {
    const result: {
      geometry: THREE.BufferGeometry;
      line: THREE.Line;
      lateralOffset: number;
      phase: number;
      zBase: number;
    }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const frac = (i / (lineCount - 1)) - 0.5;
      const lateralOffset = frac * 0.6;
      const phase = (i / lineCount) * Math.PI * 2;
      const zBase = -2 + (Math.random() - 0.5) * 0.6;

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

      result.push({ geometry: geo, line, lateralOffset, phase, zBase });
    }
    return result;
  }, []);

  useFrame((_, dt) => {
    tRef.current += dt * 0.3;

    if (typeof window !== "undefined") {
      const scrollPx = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docH > 0 ? scrollPx / docH : 0;
    }

    const totalYExtent = numRows * rowHeight;
    const cameraYOffset = scrollRef.current * totalYExtent;

    for (const l of lines) {
      const pos = l.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const progress = t * totalPathLen;

        const rowIndex = Math.floor(progress);
        const localFrac = progress - rowIndex;
        const goingRight = rowIndex % 2 === 0;

        let x: number, y: number;

        const straightFrac = 0.75;

        if (localFrac <= straightFrac) {
          const sf = localFrac / straightFrac;
          if (goingRight) {
            x = -halfWidth + sf * halfWidth * 2;
          } else {
            x = halfWidth - sf * halfWidth * 2;
          }
          y = -rowIndex * rowHeight;
        } else {
          const turnFrac = (localFrac - straightFrac) / (1 - straightFrac);
          const angle = turnFrac * Math.PI;

          const endX = goingRight ? halfWidth : -halfWidth;
          const nextStartX = goingRight ? halfWidth : -halfWidth;

          x = endX + (goingRight ? -1 : 1) * Math.sin(angle) * 1.5;
          y = -rowIndex * rowHeight - smoothstep(turnFrac) * rowHeight;
        }

        const wave1 = Math.sin(t * Math.PI * 12 + tRef.current + l.phase) * 0.25;
        const wave2 = Math.sin(t * Math.PI * 20 + tRef.current * 1.5 + l.phase * 1.3) * 0.1;

        const finalX = x + l.lateralOffset + wave2 * 0.3;
        const finalY = y + cameraYOffset + wave1 + l.lateralOffset * 0.3;
        const finalZ = l.zBase + Math.sin(t * Math.PI * 6 + tRef.current * 0.4 + l.phase) * 0.25;

        arr[s * 3] = finalX;
        arr[s * 3 + 1] = finalY;
        arr[s * 3 + 2] = finalZ;
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

function Scene() {
  return (
    <>
      <FlowingLines />
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
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
