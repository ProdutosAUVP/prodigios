import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-progress";

/* Cores em hex fixo (HSL dos tokens → hex): verde AUVP, mint #5A8770, lime da LP. */
const FOREST = "#0b5a33";
const MINT = "#5A8770";
const LIME = "#B9F53B";
const PAPER = "#f4f2ee";

const glass = { roughness: 0.15, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.2, transmission: 0, envMapIntensity: 1 } as const;

/** Flutuação suave (substitui <Float> do drei: menos ~350 KB no chunk 3D). */
function Float({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1, seed }: {
  children: React.ReactNode; speed?: number; rotationIntensity?: number; floatIntensity?: number; seed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    const g = ref.current;
    if (!g) return;
    const t = seed + s.clock.elapsedTime * speed;
    g.rotation.x = (Math.cos(t / 4) / 8) * rotationIntensity;
    g.rotation.y = (Math.sin(t / 4) / 8) * rotationIntensity;
    g.rotation.z = (Math.sin(t / 4) / 20) * rotationIntensity;
    g.position.y = (Math.sin(t / 1.5) / 6) * floatIntensity;
  });
  return <group ref={ref}>{children}</group>;
}

/** Moeda — finanças. */
function Coin(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.6 + scrollState.progress * Math.PI * 4;
  });
  return (
    <group ref={ref} {...props}>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
        <meshPhysicalMaterial color={LIME} {...glass} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
        <torusGeometry args={[0.72, 0.05, 16, 64]} />
        <meshStandardMaterial color={FOREST} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
        <torusGeometry args={[0.72, 0.05, 16, 64]} />
        <meshStandardMaterial color={FOREST} roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

/** Gráfico de barras — crescimento; as barras "sobem" com o scroll. */
function Bars(props: JSX.IntrinsicElements["group"]) {
  const refs = useRef<THREE.Mesh[]>([]);
  const heights = useMemo(() => [0.6, 1.1, 1.7, 2.4], []);
  useFrame(() => {
    const p = THREE.MathUtils.clamp(scrollState.progress * 3, 0, 1);
    refs.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.25 + heights[i] * THREE.MathUtils.smoothstep(p, i * 0.12, 0.7 + i * 0.1);
      m.scale.y = THREE.MathUtils.lerp(m.scale.y, h, 0.08);
      m.position.y = m.scale.y / 2;
    });
  });
  return (
    <group {...props}>
      {heights.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }} position={[(i - 1.5) * 0.55, 0, 0]} castShadow>
          <boxGeometry args={[0.38, 1, 0.38]} />
          <meshPhysicalMaterial color={i === 3 ? LIME : i === 2 ? MINT : FOREST} {...glass} />
        </mesh>
      ))}
    </group>
  );
}

/** Nó de toro — tech / rede. */
function Knot(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.25 + scrollState.progress * Math.PI;
    ref.current.rotation.z = scrollState.progress * Math.PI * 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <torusKnotGeometry args={[0.7, 0.22, 160, 24]} />
      <meshPhysicalMaterial color={MINT} {...glass} roughness={0.25} />
    </mesh>
  );
}

/** Icosaedro em wireframe — dados. */
function Ico(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = -s.clock.elapsedTime * 0.2 - scrollState.progress * Math.PI * 2;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <group ref={ref} {...props}>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color={PAPER} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial color={LIME} {...glass} />
      </mesh>
    </group>
  );
}

/** Grupo raiz: parallax com o mouse + deriva vertical/rotação com o scroll. */
function Rig({ children, compact }: { children: React.ReactNode; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, dt); // lerp independente do framerate
    const targetX = scrollState.mouseX * (compact ? 0.15 : 0.45);
    const targetY = -scrollState.mouseY * 0.25;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetX + scrollState.progress * Math.PI * 0.5, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetY, k);
    // Sobe conforme o scroll para dar sensação de profundidade nas dobras
    g.position.y = THREE.MathUtils.lerp(g.position.y, Math.sin(scrollState.progress * Math.PI * 2) * 1.2, k);
    g.position.x = THREE.MathUtils.lerp(g.position.x, scrollState.mouseX * 0.25, k);
  });
  return <group ref={ref}>{children}</group>;
}

export type SceneCanvasProps = { compact: boolean; active: boolean };

export default function SceneCanvas({ compact, active }: SceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, compact ? 1.25 : 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 6]} intensity={2.2} color={PAPER} />
      <pointLight position={[-6, -3, 4]} intensity={18} color={LIME} />
      <pointLight position={[6, 2, -4]} intensity={12} color={MINT} />

      <Rig compact={compact}>
        <Float seed={7} speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
          <Coin position={compact ? [1.6, 2.3, -1] : [3.6, 1.8, -1]} scale={compact ? 0.7 : 0.9} />
        </Float>
        <Float seed={14} speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
          <Bars position={compact ? [-2.2, -2.6, -2] : [4.8, -2.6, -2]} rotation={[0.2, -0.6, 0]} scale={compact ? 0.7 : 0.85} />
        </Float>
        {!compact && (
          <Float seed={21} speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
            <Knot position={[-4.6, 1.2, -3]} scale={0.9} />
          </Float>
        )}
        <Float seed={28} speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
          <Ico position={compact ? [2, -1.6, -4] : [-3.2, -2.4, -4]} scale={compact ? 0.75 : 1} />
        </Float>
      </Rig>

      <fog attach="fog" args={["#0a0a0a", 8, 18]} />
    </Canvas>
  );
}
