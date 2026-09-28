/** Idade mínima para o Desafio de Potencial (LGPD art. 14 / Termos, item 4). */
export const MIN_AGE = 14;

/** Idade em anos completos na data `today`, a partir de "AAAA-MM-DD". `null` se a data for inválida. */
export function ageOn(isoDate: string, today = new Date()): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  let age = today.getFullYear() - y;
  const month = today.getMonth() + 1;
  if (month < mo || (month === mo && today.getDate() < d)) age--;
  return age;
}

/** Hoje em "AAAA-MM-DD" no fuso local (para o `max` do input de data). */
export function todayIso(today = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}
