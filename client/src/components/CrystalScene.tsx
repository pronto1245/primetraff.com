import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CrystalStar({ position, scale = 1, rotationSpeed = 0.3, color = "#4dc9f6" }: { position: [number, number, number]; scale?: number; rotationSpeed?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.IcosahedronGeometry(1, 0);
    return shape;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.35}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2}
        side={THREE.DoubleSide}
      />
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
    </mesh>
  );
}

function CrystalOctahedron({ position, scale = 1, rotationSpeed = 0.2, color = "#0088CC" }: { position: [number, number, number]; scale?: number; rotationSpeed?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.OctahedronGeometry(1, 0);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.4;
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.3}
        roughness={0.05}
        metalness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2.5}
        side={THREE.DoubleSide}
      />
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color={color} transparent opacity={0.7} />
      </lineSegments>
    </mesh>
  );
}

function CrystalDodecahedron({ position, scale = 1, rotationSpeed = 0.15, color = "#00AAEE" }: { position: [number, number, number]; scale?: number; rotationSpeed?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.DodecahedronGeometry(1, 0);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.6;
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.25}
        roughness={0.05}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={2}
        side={THREE.DoubleSide}
      />
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
    </mesh>
  );
}

function CrystalTetrahedron({ position, scale = 1, rotationSpeed = 0.25, color = "#66BBEE" }: { position: [number, number, number]; scale?: number; rotationSpeed?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    return new THREE.TetrahedronGeometry(1, 0);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.3}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2}
        side={THREE.DoubleSide}
      />
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#4dc9f6" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -3, 3]} intensity={0.4} color="#0088CC" />
      <pointLight position={[-4, 2, 0]} intensity={0.6} color="#0088CC" distance={15} />
      <pointLight position={[4, -2, 0]} intensity={0.4} color="#4dc9f6" distance={15} />
      <pointLight position={[0, 4, -3]} intensity={0.3} color="#66BBEE" distance={12} />

      <CrystalStar position={[-6, 2, -3]} scale={1.2} rotationSpeed={0.2} color="#0088CC" />
      <CrystalOctahedron position={[6, 1, -2]} scale={1.5} rotationSpeed={0.15} color="#0099DD" />
      <CrystalDodecahedron position={[-4, -3.5, -4]} scale={1.0} rotationSpeed={0.12} color="#00AAEE" />
      <CrystalTetrahedron position={[5, -3, -3]} scale={0.9} rotationSpeed={0.22} color="#4dc9f6" />
      <CrystalStar position={[-7, -1, -5]} scale={0.6} rotationSpeed={0.28} color="#66BBEE" />
      <CrystalOctahedron position={[7, 3, -4]} scale={0.7} rotationSpeed={0.14} color="#0088CC" />
      <CrystalTetrahedron position={[-5.5, 3.5, -5]} scale={0.5} rotationSpeed={0.18} color="#00BBFF" />
      <CrystalDodecahedron position={[4.5, -1, -6]} scale={0.5} rotationSpeed={0.16} color="#0077BB" />
    </>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
