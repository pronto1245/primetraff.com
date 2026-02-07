import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WavyRibbon({
  yPos,
  zPos,
  color,
  opacity,
  speed,
  direction,
  amplitude,
  frequency,
  ribbonWidth,
  phaseOffset,
}: {
  yPos: number;
  zPos: number;
  color: string;
  opacity: number;
  speed: number;
  direction: 1 | -1;
  amplitude: number;
  frequency: number;
  ribbonWidth: number;
  phaseOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = useRef(phaseOffset);

  const segments = 120;
  const length = 16;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array((segments + 1) * 2 * 3);
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * length - length / 2;
      const topIdx = i * 2;
      const botIdx = i * 2 + 1;

      vertices[topIdx * 3] = x;
      vertices[topIdx * 3 + 1] = ribbonWidth / 2;
      vertices[topIdx * 3 + 2] = 0;

      vertices[botIdx * 3] = x;
      vertices[botIdx * 3 + 1] = -ribbonWidth / 2;
      vertices[botIdx * 3 + 2] = 0;

      if (i < segments) {
        const a = topIdx;
        const b = botIdx;
        const c = topIdx + 2;
        const d = botIdx + 2;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [segments, length, ribbonWidth]);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    t.current += dt * speed * direction;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * length - length / 2;
      const wave = Math.sin(x * frequency + t.current) * amplitude;
      const wave2 = Math.sin(x * frequency * 0.6 + t.current * 0.7 + 1.5) * amplitude * 0.3;
      const y = wave + wave2;

      const topIdx = i * 2;
      const botIdx = i * 2 + 1;

      arr[topIdx * 3 + 1] = y + ribbonWidth / 2;
      arr[topIdx * 3 + 2] = Math.cos(x * frequency * 0.8 + t.current * 0.5) * amplitude * 0.4;

      arr[botIdx * 3 + 1] = y - ribbonWidth / 2;
      arr[botIdx * 3 + 2] = Math.cos(x * frequency * 0.8 + t.current * 0.5) * amplitude * 0.4;
    }

    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, yPos, zPos]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function WavyLineRibbon({
  yPos,
  zPos,
  color,
  opacity,
  speed,
  direction,
  amplitude,
  frequency,
  phaseOffset,
}: {
  yPos: number;
  zPos: number;
  color: string;
  opacity: number;
  speed: number;
  direction: 1 | -1;
  amplitude: number;
  frequency: number;
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(phaseOffset);

  const segments = 150;
  const length = 18;

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * length - length / 2;
      points.push(new THREE.Vector3(x, 0, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [segments, length]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity }), [color, opacity]);

  const lineObj = useMemo(() => {
    const l = new THREE.Line(geometry, material);
    return l;
  }, [geometry, material]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    t.current += dt * speed * direction;

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * length - length / 2;
      arr[i * 3 + 1] = Math.sin(x * frequency + t.current) * amplitude
        + Math.sin(x * frequency * 1.8 + t.current * 1.3 + 2.0) * amplitude * 0.25;
      arr[i * 3 + 2] = Math.cos(x * frequency * 0.7 + t.current * 0.6) * amplitude * 0.5;
    }

    pos.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, yPos, zPos]}>
      <primitive object={lineObj} />
    </group>
  );
}

function RibbonScene() {
  return (
    <>
      <WavyRibbon yPos={3.0} zPos={-2} color="#0088DD" opacity={0.25} speed={0.8} direction={1} amplitude={0.5} frequency={0.8} ribbonWidth={0.06} phaseOffset={0} />
      <WavyRibbon yPos={1.5} zPos={-1.5} color="#00AAFF" opacity={0.2} speed={0.6} direction={-1} amplitude={0.6} frequency={0.6} ribbonWidth={0.04} phaseOffset={2} />
      <WavyRibbon yPos={-0.5} zPos={-2.5} color="#0077CC" opacity={0.18} speed={0.9} direction={1} amplitude={0.45} frequency={0.9} ribbonWidth={0.05} phaseOffset={4} />
      <WavyRibbon yPos={-2.5} zPos={-1} color="#00BBFF" opacity={0.22} speed={0.7} direction={-1} amplitude={0.55} frequency={0.7} ribbonWidth={0.04} phaseOffset={1} />
      <WavyRibbon yPos={-4.5} zPos={-2} color="#0099EE" opacity={0.15} speed={0.5} direction={1} amplitude={0.4} frequency={1.0} ribbonWidth={0.03} phaseOffset={3} />

      <WavyLineRibbon yPos={2.2} zPos={-1} color="#60CFFF" opacity={0.35} speed={1.0} direction={-1} amplitude={0.4} frequency={0.9} phaseOffset={0.5} />
      <WavyLineRibbon yPos={0.3} zPos={-3} color="#40BFFF" opacity={0.25} speed={0.7} direction={1} amplitude={0.5} frequency={0.7} phaseOffset={2.5} />
      <WavyLineRibbon yPos={-1.8} zPos={-1.5} color="#80DFFF" opacity={0.3} speed={0.85} direction={-1} amplitude={0.35} frequency={1.1} phaseOffset={1.5} />
      <WavyLineRibbon yPos={-3.8} zPos={-2.5} color="#00CCFF" opacity={0.2} speed={0.6} direction={1} amplitude={0.45} frequency={0.8} phaseOffset={3.5} />
      <WavyLineRibbon yPos={4.2} zPos={-2} color="#0099FF" opacity={0.28} speed={0.75} direction={1} amplitude={0.3} frequency={1.0} phaseOffset={5} />

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 3, 4]} intensity={0.6} color="#0099FF" distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={0.4} color="#00CCFF" distance={15} />
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
        <RibbonScene />
      </Canvas>
    </div>
  );
}
