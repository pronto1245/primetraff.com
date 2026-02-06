import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useScrollY() {
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

function createStarGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const outerR = 2.2;
  const innerR = 1.0;
  const spikes = 6;
  const layers = 5;
  const depthRange = 1.2;

  for (let layer = 0; layer < layers; layer++) {
    const z = (layer / (layers - 1) - 0.5) * depthRange;
    const layerScale = 1 - Math.abs(z) * 0.3;
    const angleOffset = (layer * Math.PI) / (spikes * 2);

    const ringPoints: THREE.Vector3[] = [];
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes + angleOffset;
      const r = (i % 2 === 0 ? outerR : innerR) * layerScale;
      ringPoints.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z));
    }

    for (let i = 0; i < ringPoints.length; i++) {
      points.push(ringPoints[i]);
      points.push(ringPoints[(i + 1) % ringPoints.length]);
    }

    if (layer > 0) {
      const prevZ = ((layer - 1) / (layers - 1) - 0.5) * depthRange;
      const prevScale = 1 - Math.abs(prevZ) * 0.3;
      const prevOffset = ((layer - 1) * Math.PI) / (spikes * 2);

      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes + angleOffset;
        const r = (i % 2 === 0 ? outerR : innerR) * layerScale;
        const prevAngle = (i * Math.PI) / spikes + prevOffset;
        const prevR = (i % 2 === 0 ? outerR : innerR) * prevScale;

        points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z));
        points.push(new THREE.Vector3(Math.cos(prevAngle) * prevR, Math.sin(prevAngle) * prevR, prevZ));
      }
    }
  }

  for (let i = 0; i < spikes; i++) {
    const angle = (i * 2 * Math.PI) / spikes;
    points.push(new THREE.Vector3(0, 0, -depthRange * 0.6));
    points.push(new THREE.Vector3(Math.cos(angle) * outerR * 0.5, Math.sin(angle) * outerR * 0.5, 0));
    points.push(new THREE.Vector3(0, 0, depthRange * 0.6));
    points.push(new THREE.Vector3(Math.cos(angle) * outerR * 0.5, Math.sin(angle) * outerR * 0.5, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
}

function createCrystalGeometry(): THREE.BufferGeometry {
  const vertices: number[] = [];

  const topTip = [0, 3.2, 0];
  const bottomTip = [0, -2.8, 0];

  const upperRing = [
    [0.8, 1.8, 0.6],
    [-0.3, 2.0, 0.9],
    [-0.9, 1.6, 0.1],
    [-0.5, 1.9, -0.7],
    [0.4, 1.7, -0.8],
    [0.9, 1.9, -0.1],
  ];

  const midRing = [
    [1.4, 0.3, 1.0],
    [0.2, 0.1, 1.5],
    [-1.2, 0.4, 0.8],
    [-1.5, 0.0, -0.3],
    [-0.6, 0.2, -1.3],
    [0.7, -0.1, -1.4],
    [1.5, 0.1, -0.2],
  ];

  const lowerRing = [
    [0.9, -1.5, 0.7],
    [-0.4, -1.3, 1.0],
    [-1.0, -1.6, 0.0],
    [-0.6, -1.4, -0.8],
    [0.5, -1.7, -0.6],
    [1.1, -1.5, -0.2],
  ];

  function addTriangle(a: number[], b: number[], c: number[]) {
    vertices.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
  }

  for (let i = 0; i < upperRing.length; i++) {
    addTriangle(topTip, upperRing[i], upperRing[(i + 1) % upperRing.length]);
  }

  for (let i = 0; i < upperRing.length; i++) {
    const j = Math.floor((i / upperRing.length) * midRing.length);
    const j2 = (j + 1) % midRing.length;
    addTriangle(upperRing[i], midRing[j], upperRing[(i + 1) % upperRing.length]);
    addTriangle(upperRing[(i + 1) % upperRing.length], midRing[j], midRing[j2]);
  }

  for (let i = 0; i < midRing.length; i++) {
    const j = Math.floor((i / midRing.length) * lowerRing.length);
    const j2 = (j + 1) % lowerRing.length;
    addTriangle(midRing[i], lowerRing[j], midRing[(i + 1) % midRing.length]);
    addTriangle(midRing[(i + 1) % midRing.length], lowerRing[j], lowerRing[j2]);
  }

  for (let i = 0; i < lowerRing.length; i++) {
    addTriangle(bottomTip, lowerRing[(i + 1) % lowerRing.length], lowerRing[i]);
  }

  const geometry = new THREE.BufferGeometry();
  const arr = new Float32Array(vertices);
  geometry.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function CrystalStar({ scrollY }: { scrollY: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const starEdges = useMemo(() => createStarGeometry(), []);

  const glowMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0.2, 0.6, 1.0),
    transparent: true,
    opacity: 0.7,
    linewidth: 1,
  }), []);

  const innerGlowMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0.5, 0.8, 1.0),
    transparent: true,
    opacity: 0.35,
    linewidth: 1,
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollY.current ?? 0;
    const scrollFactor = scroll * 0.001;

    groupRef.current.rotation.z = t * 0.15 + scrollFactor * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15 + scrollFactor * 0.3;
    groupRef.current.rotation.y = Math.cos(t * 0.08) * 0.1 + scrollFactor * 0.2;

    groupRef.current.position.y = Math.sin(t * 0.3) * 0.15 - scrollFactor * 0.8;
    groupRef.current.position.x = -3.5 + Math.sin(t * 0.2) * 0.1;

    const s = 1 + Math.sin(t * 0.5) * 0.03;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} position={[-3.5, 0.5, 0]}>
      <lineSegments geometry={starEdges} material={glowMaterial} />
      <lineSegments geometry={starEdges} material={innerGlowMaterial} scale={0.75} />
      <lineSegments geometry={starEdges} material={innerGlowMaterial} scale={0.5} rotation={[0, 0, Math.PI / 6]} />
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={new THREE.Color(0.3, 0.7, 1.0)} transparent opacity={0.15} />
      </mesh>
      <pointLight color="#4499ff" intensity={2} distance={8} decay={2} />
    </group>
  );
}

function IceCrystal({ scrollY }: { scrollY: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const crystalGeo = useMemo(() => createCrystalGeometry(), []);

  const edgesGeo = useMemo(() => {
    return new THREE.EdgesGeometry(crystalGeo, 15);
  }, [crystalGeo]);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.6, 0.85, 1.0),
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide,
  }), []);

  const innerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.4, 0.75, 1.0),
    transparent: true,
    opacity: 0.1,
    roughness: 0.1,
    side: THREE.DoubleSide,
  }), []);

  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0.5, 0.8, 1.0),
    transparent: true,
    opacity: 0.5,
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollY.current ?? 0;
    const scrollFactor = scroll * 0.001;

    groupRef.current.rotation.y = t * 0.12 + scrollFactor * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.2 + scrollFactor * 0.2;
    groupRef.current.rotation.z = Math.cos(t * 0.06) * 0.1;

    groupRef.current.position.y = Math.sin(t * 0.25) * 0.2 - scrollFactor * 0.6;
    groupRef.current.position.x = 3.8 + Math.cos(t * 0.15) * 0.1;

    const s = 1 + Math.sin(t * 0.4) * 0.02;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} position={[3.8, 0, 0]}>
      <mesh geometry={crystalGeo} material={glassMaterial} />
      <mesh geometry={crystalGeo} material={innerMaterial} scale={0.85} />
      <lineSegments geometry={edgesGeo} material={edgeMaterial} />
      <pointLight color="#66bbff" intensity={1.5} distance={6} decay={2} />
      <pointLight color="#88ccff" intensity={0.8} distance={4} decay={2} position={[0, 1, 0]} />
    </group>
  );
}

function Scene() {
  const scrollY = useScrollY();

  return (
    <>
      <ambientLight intensity={0.15} color="#aaddff" />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#88bbff" />
      <directionalLight position={[-3, 3, -5]} intensity={0.2} color="#6699cc" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#4488cc" distance={15} />
      <CrystalStar scrollY={scrollY} />
      <IceCrystal scrollY={scrollY} />
    </>
  );
}

export default function CrystalScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.9 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
