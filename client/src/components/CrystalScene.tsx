import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createFourPointStar(outer: number, inner: number, depth: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const pts = 4;
  for (let i = 0; i < pts * 2; i++) {
    const angle = (i * Math.PI) / pts - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: depth * 0.4, bevelSize: depth * 0.3, bevelSegments: 3 });
}

function createSixPointStar(outer: number, inner: number, depth: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const pts = 6;
  for (let i = 0; i < pts * 2; i++) {
    const angle = (i * Math.PI) / pts - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: depth * 0.3, bevelSize: depth * 0.2, bevelSegments: 3 });
}

function createDiamondStar(size: number, depth: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, size);
  shape.lineTo(size * 0.25, size * 0.25);
  shape.lineTo(size, 0);
  shape.lineTo(size * 0.25, -size * 0.25);
  shape.lineTo(0, -size);
  shape.lineTo(-size * 0.25, -size * 0.25);
  shape.lineTo(-size, 0);
  shape.lineTo(-size * 0.25, size * 0.25);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: depth * 0.5, bevelSize: depth * 0.4, bevelSegments: 2 });
}

function GlowingStar({
  geometry,
  position,
  scale,
  rotSpeed,
  color,
  emissive,
  opacity,
  scrollMul,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  emissive: number;
  opacity: number;
  scrollMul: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const curY = useRef(baseY);
  const t = useRef(Math.random() * 100);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 15), [geometry]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt;
    ref.current.rotation.x += rotSpeed[0] * dt;
    ref.current.rotation.y += rotSpeed[1] * dt;
    ref.current.rotation.z += rotSpeed[2] * dt;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const target = baseY - scroll * scrollMul * 0.001 + Math.sin(t.current * 0.4) * 0.2;
    curY.current += (target - curY.current) * 0.04;
    ref.current.position.y = curY.current;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.08}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive * 0.3}
          transparent
          opacity={opacity * 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={opacity * 0.7} />
      </lineSegments>
    </group>
  );
}

function StarField() {
  const star4 = useMemo(() => createFourPointStar(1, 0.32, 0.15), []);
  const star6 = useMemo(() => createSixPointStar(1, 0.48, 0.12), []);
  const diamond = useMemo(() => createDiamondStar(1, 0.1), []);
  const star4sm = useMemo(() => createFourPointStar(1, 0.28, 0.1), []);

  const stars = useMemo(() => [
    { geo: star4, pos: [4.0, 1.8, -1] as [number, number, number], scale: 0.28, rot: [0.15, 0.25, 0.08] as [number, number, number], color: "#60CFFF", em: 1.2, op: 0.65, sc: 0.7 },
    { geo: star6, pos: [-4.2, 1.0, -0.8] as [number, number, number], scale: 0.22, rot: [0.12, -0.18, 0.1] as [number, number, number], color: "#00BBFF", em: 1.0, op: 0.55, sc: 1.0 },
    { geo: diamond, pos: [3.5, -2.0, -1.5] as [number, number, number], scale: 0.18, rot: [-0.1, 0.2, 0.15] as [number, number, number], color: "#80DFFF", em: 1.4, op: 0.5, sc: 1.2 },
    { geo: star4sm, pos: [-3.8, -2.8, -2] as [number, number, number], scale: 0.15, rot: [0.18, 0.1, -0.12] as [number, number, number], color: "#40BFFF", em: 0.9, op: 0.45, sc: 0.6 },
    { geo: star6, pos: [1.2, 3.0, -2.5] as [number, number, number], scale: 0.14, rot: [0.1, -0.14, 0.18] as [number, number, number], color: "#60CFFF", em: 0.8, op: 0.35, sc: 0.5 },
    { geo: diamond, pos: [-1.5, 3.5, -1.8] as [number, number, number], scale: 0.12, rot: [-0.15, 0.2, 0.08] as [number, number, number], color: "#00CCFF", em: 1.1, op: 0.4, sc: 0.8 },
    { geo: star4, pos: [5.5, -0.2, -2.5] as [number, number, number], scale: 0.1, rot: [0.08, 0.15, -0.1] as [number, number, number], color: "#80DFFF", em: 0.7, op: 0.3, sc: 0.9 },
    { geo: star4sm, pos: [-5.5, -1.2, -1.5] as [number, number, number], scale: 0.13, rot: [0.12, -0.08, 0.14] as [number, number, number], color: "#60CFFF", em: 1.0, op: 0.4, sc: 0.4 },
    { geo: star6, pos: [0.3, -4.0, -2] as [number, number, number], scale: 0.16, rot: [0.14, 0.16, 0.06] as [number, number, number], color: "#00AAEE", em: 0.9, op: 0.4, sc: 1.1 },
    { geo: diamond, pos: [-2.5, -5.0, -1] as [number, number, number], scale: 0.11, rot: [-0.12, 0.18, 0.1] as [number, number, number], color: "#40BFFF", em: 1.3, op: 0.35, sc: 0.7 },
    { geo: star4, pos: [2.8, -6.5, -2.5] as [number, number, number], scale: 0.2, rot: [0.1, -0.12, 0.08] as [number, number, number], color: "#60CFFF", em: 1.1, op: 0.5, sc: 0.8 },
    { geo: star4sm, pos: [-4.5, -7.0, -1.5] as [number, number, number], scale: 0.09, rot: [0.16, 0.14, -0.06] as [number, number, number], color: "#80DFFF", em: 0.8, op: 0.3, sc: 0.6 },
  ], [star4, star6, diamond, star4sm]);

  return (
    <>
      {stars.map((s, i) => (
        <GlowingStar
          key={i}
          geometry={s.geo}
          position={s.pos}
          scale={s.scale}
          rotSpeed={s.rot}
          color={s.color}
          emissive={s.em}
          opacity={s.op}
          scrollMul={s.sc}
        />
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 4]} intensity={0.8} color="#60CFFF" distance={20} />
      <pointLight position={[-5, -2, 3]} intensity={0.5} color="#00AAEE" distance={15} />
      <pointLight position={[0, 5, 2]} intensity={0.4} color="#80DFFF" distance={12} />
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
        <StarField />
      </Canvas>
    </div>
  );
}
