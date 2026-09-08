/**
 * Estado de scroll compartilhado entre o DOM (Lenis/GSAP) e a cena 3D (R3F),
 * sem re-render de React: a cena lê os valores dentro de useFrame.
 */
export const scrollState = {
  /** 0..1 do documento inteiro */
  progress: 0,
  /** velocidade normalizada do Lenis (px/frame aproximado) */
  velocity: 0,
  /** posição do mouse normalizada (-1..1) */
  mouseX: 0,
  mouseY: 0,
  /** 1 = cena em destaque (dobra escura), 0.15 = discreta (dobra clara) */
  sceneIntensity: 1,
};
