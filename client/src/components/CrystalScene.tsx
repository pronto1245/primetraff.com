import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useScrollRef() {
  const scrollRef = useRef(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollRef.current = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollRef;
}

function createStellatedIcosahedron(): THREE.BufferGeometry {
  const t = (1 + Math.sqrt(5)) / 2;
  const baseVerts: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];

  const len = Math.sqrt(1 + t * t);
  for (let i = 0; i < baseVerts.length; i++) {
    baseVerts[i][0] /= len;
    baseVerts[i][1] /= len;
    baseVerts[i][2] /= len;
  }

  const icoFaces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const stellationHeight = 1.8;
  const positions: number[] = [];

  for (const [a, b, c] of icoFaces) {
    const vA = new THREE.Vector3(...baseVerts[a]);
    const vB = new THREE.Vector3(...baseVerts[b]);
    const vC = new THREE.Vector3(...baseVerts[c]);

    const center = new THREE.Vector3().add(vA).add(vB).add(vC).divideScalar(3);
    const normal = center.clone().normalize();
    const tip = normal.multiplyScalar(stellationHeight);

    positions.push(
      vA.x, vA.y, vA.z, vB.x, vB.y, vB.z, tip.x, tip.y, tip.z,
      vB.x, vB.y, vB.z, vC.x, vC.y, vC.z, tip.x, tip.y, tip.z,
      vC.x, vC.y, vC.z, vA.x, vA.y, vA.z, tip.x, tip.y, tip.z,
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function StarCrystal({
  position,
  rotationSpeed,
  scrollRef,
  scrollMultiplier,
}: {
  position: [number, number, number];
  rotationSpeed: number;
  scrollRef: React.RefObject<number>;
  scrollMultiplier: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const stellatedGeo = useMemo(() => createStellatedIcosahedron(), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(stellatedGeo, 12), [stellatedGeo]);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0.15, 0.45, 0.9),
        transparent: true,
        opacity: 0.12,
        roughness: 0.05,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  const innerGlassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0.2, 0.55, 1.0),
        transparent: true,
        opacity: 0.06,
        roughness: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  );

  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0.3, 0.75, 1.0),
        transparent: true,
        opacity: 0.65,
      }),
    []
  );

  const innerEdgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(0.5, 0.85, 1.0),
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current ?? 0;
    const sf = scroll * 0.001;

    groupRef.current.rotation.y = t * rotationSpeed + sf * scrollMultiplier;
    groupRef.current.rotation.x = t * rotationSpeed * 0.3 + Math.sin(t * 0.2) * 0.1;
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;

    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.4) * 0.15 - sf * 0.5;
    groupRef.current.position.x =
      position[0] + Math.sin(t * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={stellatedGeo} material={glassMat} />
      <mesh geometry={stellatedGeo} material={innerGlassMat} scale={0.7} />
      <lineSegments geometry={edgesGeo} material={edgeMat} />
      <lineSegments geometry={edgesGeo} material={innerEdgeMat} scale={0.7} />
      <pointLight color="#3399ff" intensity={2} distance={8} decay={2} />
    </group>
  );
}

function Scene() {
  const scrollRef = useScrollRef();

  return (
    <>
      <ambientLight intensity={0.2} color="#88bbff" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#aaddff" />
      <directionalLight position={[-5, -3, 3]} intensity={0.3} color="#6699cc" />
      <pointLight position={[0, 0, 6]} intensity={0.4} color="#4488cc" distance={20} />

      <StarCrystal
        position={[-4.5, 0.5, 0]}
        rotationSpeed={0.15}
        scrollRef={scrollRef}
        scrollMultiplier={0.5}
      />
      <StarCrystal
        position={[4.5, 0, 0]}
        rotationSpeed={-0.12}
        scrollRef={scrollRef}
        scrollMultiplier={0.4}
      />
    </>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
