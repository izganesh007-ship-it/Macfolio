"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// module-level pointer (canvas is pointer-events-none, so track on window)
const pointer = { x: 0, y: 0 };

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const k = Math.min(delta * 3, 1);
    ref.current.rotation.y += (pointer.x * 0.18 - ref.current.rotation.y) * k;
    ref.current.rotation.x += (-pointer.y * 0.12 - ref.current.rotation.x) * k;
  });
  return <group ref={ref}>{children}</group>;
}

type BlobProps = {
  position: [number, number, number];
  color: string;
  size?: number;
  distort?: number;
  speed?: number;
  wireframe?: boolean;
};

function Blob({ position, color, size = 1.4, distort = 0.35, speed = 1.4, wireframe = false }: BlobProps) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) { mesh.current.rotation.x += delta * 0.08; mesh.current.rotation.y += delta * 0.1; }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, wireframe ? 1 : 16]} />
        {wireframe ? (
          <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
        ) : (
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.25}
            distort={distort} speed={speed} transparent opacity={0.4}
            roughness={0.2} metalness={0.1} />
        )}
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  useEffect(() => {
    const h = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const violet = dark ? "#7c3aed" : "#8b5cf6";
  const accent = dark ? "#22d3ee" : "#6366f1";

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={dark ? 0.6 : 0.9} />
        <directionalLight position={[4, 6, 3]} intensity={dark ? 0.8 : 1.1} />
        <Rig>
          <Blob position={[3.4, 1.3, -2]} color={violet} size={1.5} />
          <Blob position={[-3.8, -1.5, -3]} color={accent} size={1.1} distort={0.45} speed={1.8} />
          <Blob position={[0.5, 2.1, -5]} color={violet} size={2.4} wireframe />
          <Blob position={[-2.2, 1.8, -6]} color={accent} size={1.6} wireframe />
        </Rig>
      </Canvas>
    </div>
  );
}
