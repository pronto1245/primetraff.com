import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowingTorus({
  position,
  scale,
  rotSpeed,
  color,
  tubeRadius,
  scrollMul,
}: {
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  tubeRadius: number;
  scrollMul: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const curY = useRef(baseY);
  const t = useRef(Math.random() * 100);

  const geo = useMemo(() => new THREE.TorusGeometry(1, tubeRadius, 24, 64), [tubeRadius]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt;
    ref.current.rotation.x += rotSpeed[0] * dt;
    ref.current.rotation.y += rotSpeed[1] * dt;
    ref.current.rotation.z += rotSpeed[2] * dt;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const target = baseY - scroll * scrollMul * 0.001 + Math.sin(t.current * 0.3) * 0.15;
    curY.current += (target - curY.current) * 0.04;
    ref.current.position.y = curY.current;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <mesh geometry={geo} scale={1.15}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function WireframeSphere({
  position,
  scale,
  rotSpeed,
  color,
  scrollMul,
}: {
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  scrollMul: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const curY = useRef(baseY);
  const t = useRef(Math.random() * 100);

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt;
    ref.current.rotation.x += rotSpeed[0] * dt;
    ref.current.rotation.y += rotSpeed[1] * dt;
    ref.current.rotation.z += rotSpeed[2] * dt;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const target = baseY - scroll * scrollMul * 0.001 + Math.sin(t.current * 0.35) * 0.2;
    curY.current += (target - curY.current) * 0.04;
    ref.current.position.y = curY.current;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function FloatingHexagon({
  position,
  scale,
  rotSpeed,
  color,
  scrollMul,
}: {
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  scrollMul: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const curY = useRef(baseY);
  const t = useRef(Math.random() * 100);

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    return new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1 });
  }, []);

  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 15), [geo]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt;
    ref.current.rotation.x += rotSpeed[0] * dt;
    ref.current.rotation.y += rotSpeed[1] * dt;
    ref.current.rotation.z += rotSpeed[2] * dt;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const target = baseY - scroll * scrollMul * 0.001 + Math.sin(t.current * 0.25) * 0.18;
    curY.current += (target - curY.current) * 0.04;
    ref.current.position.y = curY.current;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

function OrbitRing({
  position,
  scale,
  rotSpeed,
  color,
  scrollMul,
}: {
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  scrollMul: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const curY = useRef(baseY);
  const t = useRef(Math.random() * 100);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1, 0.015, 8, 80), []);
  const dotGeo = useMemo(() => new THREE.SphereGeometry(0.06, 12, 12), []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt;
    ref.current.rotation.x += rotSpeed[0] * dt;
    ref.current.rotation.y += rotSpeed[1] * dt;
    ref.current.rotation.z += rotSpeed[2] * dt;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const target = baseY - scroll * scrollMul * 0.001 + Math.sin(t.current * 0.2) * 0.12;
    curY.current += (target - curY.current) * 0.04;
    ref.current.position.y = curY.current;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={ringGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
          transparent
          opacity={0.45}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh geometry={dotGeo} position={[1, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={3.0}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function TechScene() {
  return (
    <>
      <GlowingTorus position={[4.5, 2.0, -1.5]} scale={0.55} rotSpeed={[0.2, 0.35, 0.05]} color="#0099FF" tubeRadius={0.08} scrollMul={0.8} />
      <GlowingTorus position={[-4.0, -1.5, -2]} scale={0.4} rotSpeed={[-0.15, 0.25, 0.1]} color="#00CCFF" tubeRadius={0.06} scrollMul={1.0} />
      <GlowingTorus position={[2.0, -5.5, -1]} scale={0.35} rotSpeed={[0.1, -0.2, 0.15]} color="#0088DD" tubeRadius={0.1} scrollMul={0.6} />

      <WireframeSphere position={[-3.5, 2.5, -2.5]} scale={0.7} rotSpeed={[0.08, 0.12, 0.05]} color="#60CFFF" scrollMul={0.5} />
      <WireframeSphere position={[3.0, -3.0, -2]} scale={0.5} rotSpeed={[-0.1, 0.08, 0.12]} color="#40BFFF" scrollMul={0.9} />
      <WireframeSphere position={[0.5, 4.0, -3]} scale={0.35} rotSpeed={[0.06, -0.1, 0.08]} color="#80DFFF" scrollMul={0.4} />

      <FloatingHexagon position={[5.0, -0.5, -1.8]} scale={0.35} rotSpeed={[0.1, 0.2, 0.08]} color="#00BBFF" scrollMul={0.7} />
      <FloatingHexagon position={[-5.0, -4.0, -1.5]} scale={0.3} rotSpeed={[-0.08, 0.15, 0.12]} color="#0099FF" scrollMul={0.8} />
      <FloatingHexagon position={[-1.5, -7.0, -2]} scale={0.25} rotSpeed={[0.12, -0.1, 0.06]} color="#60CFFF" scrollMul={0.5} />

      <OrbitRing position={[-2.0, 0.5, -1]} scale={0.6} rotSpeed={[0.3, 0.15, 0.1]} color="#00AAEE" scrollMul={0.6} />
      <OrbitRing position={[1.5, -6.0, -2]} scale={0.45} rotSpeed={[-0.2, 0.25, 0.08]} color="#0099FF" scrollMul={0.9} />
      <OrbitRing position={[4.0, 3.5, -2.5]} scale={0.3} rotSpeed={[0.15, -0.18, 0.12]} color="#60CFFF" scrollMul={0.4} />

      <ambientLight intensity={0.3} />
      <pointLight position={[5, 3, 4]} intensity={1.0} color="#0099FF" distance={25} />
      <pointLight position={[-5, -2, 3]} intensity={0.7} color="#00CCFF" distance={20} />
      <pointLight position={[0, 5, 2]} intensity={0.5} color="#60CFFF" distance={15} />
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
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <TechScene />
      </Canvas>
    </div>
  );
}
