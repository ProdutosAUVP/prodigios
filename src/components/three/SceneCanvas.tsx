import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { scrollState } from "@/lib/scroll-progress";

/*
 * Apoio visual, não ilustração — na linguagem do traço da AUVP Analítica
 * (lp-etfs): linha fina que sobe para sempre, ponta acesa, rastro que esmaece
 * até o fundo, e uma rede de pontos leve com profundidade.
 *
 *  - Traço   → ondulação em torno de uma reta que sobe; a fase anda, então a
 *              linha parece subir sem fim. Não é gráfico: sem eixo, ponto ou
 *              rótulo, e sempre em movimento — o que impede a leitura como
 *              histórico. A ponta é o único acento de cor (lime): o talento
 *              fora da curva.
 *  - Rede    → pontos que derivam num volume raso, ligados quando próximos,
 *              atraídos pelo cursor. Profundidade real: parallax com o mouse.
 *
 * Cores em hex fixo (materiais Three.js não leem variáveis CSS).
 */
const PAPER = new THREE.Color("#f4f2ee");
const LIME = new THREE.Color("#B9F53B");
const INK = new THREE.Color("#0a0a0a");

const damp = (a: number, b: number, dt: number, k = 4) => THREE.MathUtils.lerp(a, b, 1 - Math.exp(-k * dt));

/** Sprite radial para a luz da ponta (gerado em canvas — sem asset externo). */
function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.12)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/** O traço: linha fina que ondula em torno de uma reta ascendente, com a ponta acesa. */
function Trace({ compact }: { compact: boolean }) {
  const { size } = useThree();
  const N = 220;
  const cfg = compact
    ? { x0: -2.4, x1: 1.3, y0: -2.9, slope: 1.16, amp: 0.26, k: 2.6, z: 0 }
    : { x0: -7.5, x1: 4.6, y0: -3.3, slope: 0.36, amp: 0.55, k: 1.15, z: 0 };

  const geometry = useMemo(() => new LineGeometry(), []);
  const material = useMemo(
    () => new LineMaterial({ vertexColors: true, linewidth: compact ? 1.4 : 1.8, transparent: true, depthWrite: false }),
    [compact],
  );
  const line = useMemo(() => new Line2(geometry, material), [geometry, material]);
  const glow = useGlowTexture();
  const spark = useRef<THREE.Sprite>(null);
  const halo = useRef<THREE.Sprite>(null);
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => new Float32Array(N * 3), []);
  const colors = useMemo(() => new Float32Array(N * 3), []);

  useEffect(() => {
    material.resolution.set(size.width, size.height);
  }, [material, size]);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    const phase = t * 0.9;
    const reveal = THREE.MathUtils.smoothstep(t, 0.2, 2.4); // desenha na entrada
    const tmp = new THREE.Color();
    let tipX = cfg.x0, tipY = cfg.y0;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const x = THREE.MathUtils.lerp(cfg.x0, cfg.x1, u);
      const y = cfg.y0 + cfg.slope * (x - cfg.x0) + Math.sin(x * cfg.k - phase) * cfg.amp * (0.35 + 0.65 * u);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = cfg.z + Math.cos(x * 0.7 + phase * 0.3) * 0.15;
      // rastro: transparente (= cor do fundo) no início, papel perto da ponta,
      // lime só no último trecho; a revelação da entrada "desenha" a linha.
      const fade = Math.pow(u, 1.6) * (u < reveal ? 1 : 0);
      tmp.copy(INK).lerp(PAPER, fade * 0.75);
      if (u > 0.93) tmp.lerp(LIME, (u - 0.93) / 0.07);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
      tipX = x;
      tipY = y;
    }
    geometry.setPositions(positions);
    geometry.setColors(colors);

    const on = THREE.MathUtils.smoothstep(t, 2.0, 2.8);
    if (spark.current) {
      spark.current.position.set(tipX, tipY, cfg.z + 0.05);
      spark.current.scale.setScalar((compact ? 0.28 : 0.4) * on);
    }
    if (halo.current) {
      halo.current.position.set(tipX, tipY, cfg.z);
      const pulse = 1 + Math.sin(t * 2.2) * 0.12;
      halo.current.scale.setScalar((compact ? 1.1 : 1.7) * on * pulse);
    }
    if (group.current) {
      group.current.rotation.z = damp(group.current.rotation.z, scrollState.progress * 0.25 - scrollState.mouseY * 0.02, dt);
      group.current.rotation.y = damp(group.current.rotation.y, scrollState.mouseX * 0.08, dt);
    }
  });

  return (
    <group ref={group}>
      <primitive object={line} />
      <sprite ref={halo} scale={0}>
        <spriteMaterial map={glow} color={LIME} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <sprite ref={spark} scale={0}>
        <spriteMaterial map={glow} color={"#ffffff"} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
    </group>
  );
}

/** Rede de pontos com profundidade: derivam, ligam-se quando próximos, seguem o cursor. */
function Network({ compact }: { compact: boolean }) {
  const count = compact ? 34 : 70;
  const bounds = compact ? { x: 2.2, y: 3.6, z: 1.5 } : { x: 7.5, y: 4.2, z: 2 };
  const linkDist = compact ? 1.0 : 1.45;

  const pts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        p: new THREE.Vector3((Math.random() * 2 - 1) * bounds.x, (Math.random() * 2 - 1) * bounds.y, -1 - Math.random() * bounds.z),
        v: new THREE.Vector3((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, 0),
      })),
    [count, bounds.x, bounds.y, bounds.z],
  );
  const pointPos = useMemo(() => new Float32Array(count * 3), [count]);
  const maxLinks = (count * (count - 1)) / 2;
  const linkPos = useMemo(() => new Float32Array(maxLinks * 6), [maxLinks]);
  const linkCol = useMemo(() => new Float32Array(maxLinks * 6), [maxLinks]);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const linksGeo = useRef<THREE.BufferGeometry>(null);
  const mouse = useMemo(() => new THREE.Vector3(), []);

  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    const appear = THREE.MathUtils.smoothstep(t, 0.6, 3);
    mouse.set(scrollState.mouseX * (compact ? 1.6 : 5.5), -scrollState.mouseY * 3.4, -1.5);
    const hasMouse = scrollState.mouseX !== 0 || scrollState.mouseY !== 0;

    pts.forEach((o, i) => {
      o.p.addScaledVector(o.v, dt);
      if (o.p.x > bounds.x) o.p.x = -bounds.x; else if (o.p.x < -bounds.x) o.p.x = bounds.x;
      if (o.p.y > bounds.y) o.p.y = -bounds.y; else if (o.p.y < -bounds.y) o.p.y = bounds.y;
      if (hasMouse) {
        const d = o.p.distanceTo(mouse);
        if (d < 2.6 && d > 0.3) o.p.addScaledVector(mouse.clone().sub(o.p).normalize(), dt * 0.25);
      }
      pointPos[i * 3] = o.p.x;
      pointPos[i * 3 + 1] = o.p.y;
      pointPos[i * 3 + 2] = o.p.z;
    });

    let n = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = pts[i].p, b = pts[j].p;
        const d = a.distanceTo(b);
        if (d < linkDist) {
          const k = (1 - d / linkDist) * 0.3 * appear;
          linkPos.set([a.x, a.y, a.z, b.x, b.y, b.z], n * 6);
          linkCol.set([k, k, k, k, k, k], n * 6);
          n++;
        }
      }
    }
    if (pointsGeo.current) {
      pointsGeo.current.getAttribute("position").needsUpdate = true;
      (pointsGeo.current.getAttribute("position") as THREE.BufferAttribute).setUsage(THREE.DynamicDrawUsage);
    }
    if (linksGeo.current) {
      linksGeo.current.getAttribute("position").needsUpdate = true;
      linksGeo.current.getAttribute("color").needsUpdate = true;
      linksGeo.current.setDrawRange(0, n * 2);
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[pointPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color={PAPER} size={compact ? 0.045 : 0.055} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry ref={linksGeo}>
          <bufferAttribute attach="attributes-position" args={[linkPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[linkCol, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/** Parallax do conjunto com o mouse + leve deriva vertical com o scroll. */
function Rig({ children, compact }: { children: React.ReactNode; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.x = damp(g.position.x, scrollState.mouseX * (compact ? 0.06 : 0.22), dt);
    g.position.y = damp(g.position.y, -scrollState.mouseY * 0.12 + Math.sin(scrollState.progress * Math.PI) * 0.6, dt);
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
      <Rig compact={compact}>
        <Network compact={compact} />
        <Trace compact={compact} />
      </Rig>
      <fog attach="fog" args={["#0a0a0a", 9, 16]} />
    </Canvas>
  );
}
