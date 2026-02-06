import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createFourPointStarGeometry(outerRadius: number, innerRadius: number, depth: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const points = 4;
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const extrudeSettings = {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.3,
    bevelSize: depth * 0.2,
    bevelSegments: 2,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function createSixPointStarGeometry(outerRadius: number, innerRadius: number, depth: number): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const points = 6;
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const extrudeSettings = {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.25,
    bevelSize: depth * 0.15,
    bevelSegments: 2,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function GlowingStar({
  geometry,
  position,
  scale,
  rotationSpeed,
  color,
  emissiveIntensity,
  opacity,
  scrollFactor,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  color: string;
  emissiveIntensity: number;
  opacity: number;
  scrollFactor: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetY = useRef(position[1]);
  const currentY = useRef(position[1]);
  const baseY = position[1];
  const time = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    time.current += delta;

    groupRef.current.rotation.x += rotationSpeed[0] * delta;
    groupRef.current.rotation.y += rotationSpeed[1] * delta;
    groupRef.current.rotation.z += rotationSpeed[2] * delta;

    const scrollOffset = (typeof window !== "undefined" ? window.scrollY : 0) * scrollFactor * 0.001;
    targetY.current = baseY - scrollOffset + Math.sin(time.current * 0.5) * 0.15;
    currentY.current += (targetY.current - currentY.current) * 0.05;
    groupRef.current.position.y = currentY.current;
  });

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={opacity * 0.5} />
      </lineSegments>
    </group>
  );
}

function StarField() {
  const fourPointGeo = useMemo(() => createFourPointStarGeometry(1, 0.35, 0.12), []);
  const sixPointGeo = useMemo(() => createSixPointStarGeometry(1, 0.5, 0.1), []);
  const fourPointSmall = useMemo(() => createFourPointStarGeometry(1, 0.3, 0.08), []);

  const stars = useMemo(() => [
    { geo: fourPointGeo, pos: [4.2, 1.5, -2] as [number, number, number], scale: 0.12, rot: [0.2, 0.3, 0.1] as [number, number, number], color: "#60CFFF", emissive: 0.8, opacity: 0.5, scroll: 0.6 },
    { geo: sixPointGeo, pos: [-4.5, 0.8, -1.5] as [number, number, number], scale: 0.1, rot: [0.15, -0.2, 0.12] as [number, number, number], color: "#00AAEE", emissive: 0.6, opacity: 0.4, scroll: 0.9 },
    { geo: fourPointSmall, pos: [3.0, -2.5, -1] as [number, number, number], scale: 0.07, rot: [-0.1, 0.25, 0.15] as [number, number, number], color: "#80DFFF", emissive: 1.0, opacity: 0.35, scroll: 1.1 },
    { geo: sixPointGeo, pos: [-3.2, -3.0, -2.5] as [number, number, number], scale: 0.08, rot: [0.18, 0.12, -0.08] as [number, number, number], color: "#40BFFF", emissive: 0.7, opacity: 0.3, scroll: 0.7 },
    { geo: fourPointGeo, pos: [1.5, 2.5, -3] as [number, number, number], scale: 0.06, rot: [0.12, -0.15, 0.2] as [number, number, number], color: "#60CFFF", emissive: 0.5, opacity: 0.25, scroll: 0.5 },
    { geo: fourPointSmall, pos: [-1.8, 3.0, -2] as [number, number, number], scale: 0.05, rot: [-0.18, 0.22, 0.1] as [number, number, number], color: "#00CCFF", emissive: 0.9, opacity: 0.3, scroll: 0.8 },
    { geo: sixPointGeo, pos: [5.0, -0.5, -3] as [number, number, number], scale: 0.055, rot: [0.1, 0.18, -0.12] as [number, number, number], color: "#80DFFF", emissive: 0.6, opacity: 0.2, scroll: 1.0 },
    { geo: fourPointGeo, pos: [-5.2, -1.5, -2] as [number, number, number], scale: 0.065, rot: [0.14, -0.1, 0.16] as [number, number, number], color: "#60CFFF", emissive: 0.7, opacity: 0.25, scroll: 0.4 },
  ], [fourPointGeo, sixPointGeo, fourPointSmall]);

  return (
    <>
      {stars.map((star, i) => (
        <GlowingStar
          key={i}
          geometry={star.geo}
          position={star.pos}
          scale={star.scale}
          rotationSpeed={star.rot}
          color={star.color}
          emissiveIntensity={star.emissive}
          opacity={star.opacity}
          scrollFactor={star.scroll}
        />
      ))}

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 3]} intensity={0.4} color="#60CFFF" distance={15} />
      <pointLight position={[-4, -2, 2]} intensity={0.3} color="#00AAEE" distance={12} />
    </>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}
