import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-progress";

/*
 * Apoios visuais ligados ao discurso da página (não ilustrações soltas):
 *
 *  - Curva      → a "curva" do mercado/da média. Tubo escuro que se desenha
 *                 na entrada e ganha inclinação com o scroll.
 *  - Ponto      → o talento "fora da curva": único acento de cor da cena,
 *                 flutua acima do fim da curva, ligado a ela por um fio.
 *  - Degraus    → as cinco fases do processo seletivo; sobem um a um
 *                 conforme o usuário desce até a dobra do processo.
 *  - Grade      → papel milimetrado ao fundo, quase invisível: contexto de
 *                 gráfico/finanças sem competir com o texto.
 *
 * Cores em hex fixo (materiais Three.js não leem variáveis CSS).
 */
const FOREST = "#0f5a35";
const FOREST_DEEP = "#062e1b";
const MINT = "#5A8770";
const LIME = "#B9F53B";
const PAPER = "#f4f2ee";

/** lerp independente do framerate */
const damp = (a: number, b: number, dt: number, k = 4) => THREE.MathUtils.lerp(a, b, 1 - Math.exp(-k * dt));

/** Curva de crescimento que se desenha (drawRange) e inclina com o scroll. */
function GrowthCurve({ compact }: { compact: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const draw = useRef(0);

  const { geometry, total, end } = useMemo(() => {
    // Câmera em z=10, fov 38: meia-largura visível ≈ 5.5 (desktop 16:9) e
    // ≈ 1.6 (mobile 9:19.5); meia-altura ≈ 3.4. A curva termina no vazio à
    // direita do título, e o ponto flutua acima dela.
    const pts = compact
      ? [new THREE.Vector3(-1.9, -2.7, 0), new THREE.Vector3(-1.0, -2.4, 0), new THREE.Vector3(-0.1, -1.8, 0), new THREE.Vector3(0.7, -1.0, 0), new THREE.Vector3(1.35, 0.3, 0)]
      : [new THREE.Vector3(-6.2, -3.1, 0), new THREE.Vector3(-3.6, -2.8, 0), new THREE.Vector3(-1.2, -2.2, 0), new THREE.Vector3(0.8, -1.6, 0), new THREE.Vector3(2.3, -0.9, 0), new THREE.Vector3(3.5, -0.2, 0), new THREE.Vector3(4.3, 0.5, 0)];
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
    const geometry = new THREE.TubeGeometry(curve, 160, compact ? 0.06 : 0.09, 12, false);
    return { geometry, total: geometry.index!.count, end: pts[pts.length - 1] };
  }, [compact]);

  useFrame((s, dt) => {
    // desenha em ~2 s na entrada, depois estende levemente com o scroll
    const target = Math.min(1, s.clock.elapsedTime / 2.2);
    draw.current = damp(draw.current, target, dt, 3);
    geometry.setDrawRange(0, Math.floor(total * draw.current));
    if (group.current) {
      group.current.rotation.z = damp(group.current.rotation.z, scrollState.progress * 0.35 + scrollState.mouseY * -0.03, dt);
      group.current.rotation.y = damp(group.current.rotation.y, scrollState.mouseX * 0.12, dt);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry}>
        <meshStandardMaterial color={FOREST} roughness={0.55} metalness={0.25} />
      </mesh>
      <Outlier at={end} compact={compact} />
    </group>
  );
}

/** O talento fora da curva: ponto de luz acima do fim da curva, preso por um fio. */
function Outlier({ at, compact }: { at: THREE.Vector3; compact: boolean }) {
  const sphere = useRef<THREE.Mesh>(null);
  const line = useRef<THREE.Line>(null);
  const lift = compact ? 1.15 : 1.4;

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([at.x, at.y, at.z, at.x, at.y + lift, at.z], 3));
    return g;
  }, [at, lift]);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    const y = at.y + lift + Math.sin(t * 1.3) * 0.18;
    const x = at.x + Math.sin(t * 0.7) * 0.08;
    if (sphere.current) {
      sphere.current.position.set(x, y, at.z);
      const appear = THREE.MathUtils.smoothstep(t, 2.0, 3.0);
      const k = damp(sphere.current.scale.x, appear, dt, 5);
      sphere.current.scale.setScalar(k);
    }
    if (line.current) {
      const pos = line.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      pos.setXYZ(1, x, y - (compact ? 0.16 : 0.22), at.z);
      pos.needsUpdate = true;
      (line.current.material as THREE.LineBasicMaterial).opacity = THREE.MathUtils.smoothstep(t, 2.2, 3.2) * 0.45;
    }
  });

  return (
    <>
      {/* @ts-expect-error — <line> é o primitivo THREE.Line no R3F, não o SVG */}
      <line ref={line} geometry={lineGeo}>
        <lineBasicMaterial color={PAPER} transparent opacity={0} />
      </line>
      <mesh ref={sphere} position={[at.x, at.y + lift, at.z]} scale={0}>
        <sphereGeometry args={[compact ? 0.12 : 0.18, 32, 32]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.4} roughness={0.35} />
      </mesh>
      <pointLight position={[at.x, at.y + lift, at.z + 1]} intensity={compact ? 6 : 10} distance={7} color={LIME} />
    </>
  );
}

/** Cinco degraus — as fases do processo. Sobem conforme o scroll se aproxima da dobra do processo. */
function Steps() {
  const refs = useRef<THREE.Mesh[]>([]);
  const heights = [0.5, 1, 1.5, 2, 2.5];
  useFrame((_, dt) => {
    // progresso 0..1 entre o Hero e o fim do processo (~0.3 do documento)
    const p = THREE.MathUtils.clamp(scrollState.progress / 0.3, 0, 1);
    refs.current.forEach((m, i) => {
      if (!m) return;
      const on = THREE.MathUtils.smoothstep(p, i * 0.16, i * 0.16 + 0.3);
      const h = 0.12 + heights[i] * on;
      m.scale.y = damp(m.scale.y, h, dt, 5);
      m.position.y = -3.4 + m.scale.y / 2;
    });
  });
  return (
    <group position={[-5.2, 0, -2]} rotation={[0.12, 0.5, 0]}>
      {heights.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }} position={[i * 0.66, -3.4, 0]} scale={[1, 0.12, 1]}>
          <boxGeometry args={[0.62, 1, 0.9]} />
          <meshStandardMaterial color={i === 4 ? MINT : FOREST} roughness={0.6} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/** Grade de fundo (papel milimetrado), quase invisível. */
function Grid() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(60, 60, FOREST_DEEP, FOREST_DEEP);
    const m = g.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0.35;
    m.depthWrite = false;
    return g;
  }, []);
  return <primitive object={grid} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -6]} />;
}

/** Parallax do conjunto com o mouse + deriva vertical com o scroll. */
function Rig({ children, compact }: { children: React.ReactNode; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.x = damp(g.position.x, scrollState.mouseX * (compact ? 0.1 : 0.3), dt);
    g.position.y = damp(g.position.y, -scrollState.mouseY * 0.15 + Math.sin(scrollState.progress * Math.PI) * 0.8, dt);
  });
  return <group ref={ref}>{children}</group>;
}

export type SceneCanvasProps = { compact: boolean; active: boolean };

export default function SceneCanvas({ compact, active }: SceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, compact ? 1.25 : 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} color={PAPER} />
      <directionalLight position={[-6, -2, 4]} intensity={0.5} color={MINT} />

      <Rig compact={compact}>
        <Grid />
        <GrowthCurve compact={compact} />
        {!compact && <Steps />}
      </Rig>

      <fog attach="fog" args={["#0a0a0a", 9, 20]} />
    </Canvas>
  );
}
