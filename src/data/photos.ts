/**
 * Fotografia oficial da AUVP — arquivos de ProdutosAUVP/etica, convertidos
 * para WebP (largura máx. 900–1400px, qualidade 78) em src/assets/photos/.
 * Cada entrada tem um `tone` usado como fallback (gradiente da marca) caso a
 * imagem não carregue, e `position` para o recorte (`object-position`).
 *
 * Para trocar uma foto: substitua o arquivo em src/assets/photos/ mantendo a
 * proporção aproximada, ou aponte `src` para um novo import.
 */
import heroArco from "@/assets/photos/hero-arco.webp";
import heroBandeira from "@/assets/photos/hero-bandeira.webp";
import culturaTatuagens from "@/assets/photos/cultura-tatuagens.webp";
import trilhaTecnologia from "@/assets/photos/trilha-tecnologia.webp";
import trilhaGrowth from "@/assets/photos/trilha-growth.webp";
import trilhaNegocios from "@/assets/photos/trilha-negocios.webp";
import inscricaoTrofeu from "@/assets/photos/inscricao-trofeu.webp";
import eventoPlateia from "@/assets/photos/evento-plateia.webp";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  tone: "forest" | "mint" | "lime";
  /** object-position do recorte; default "center" */
  position?: string;
};

export const photos: Record<string, Photo> = {
  /** Hero — foto-âncora em arco */
  heroB: {
    id: "heroB",
    src: heroArco,
    alt: "Colaboradora da AUVP sorrindo em um encontro do time",
    tone: "forest",
    position: "center 30%",
  },
  /** Hero — foto menor sobreposta */
  heroA: {
    id: "heroA",
    src: heroBandeira,
    alt: "Time da AUVP segurando a bandeira pirata no palco de um evento",
    tone: "mint",
  },
  /** Cultura — o símbolo tatuado nos braços do time */
  culture: {
    id: "culture",
    src: culturaTatuagens,
    alt: "Braços de colaboradores da AUVP com o símbolo da empresa tatuado, unidos ao centro",
    tone: "forest",
    position: "center 40%",
  },
  trailsTech: {
    id: "trailsTech",
    src: trilhaTecnologia,
    alt: "Time da AUVP reunido no escritório olhando para a câmera",
    tone: "mint",
    position: "center 35%",
  },
  trailsGrowth: {
    id: "trailsGrowth",
    src: trilhaGrowth,
    alt: "Time da AUVP no palco de um evento, com os dedos em riste",
    tone: "lime",
  },
  trailsBiz: {
    id: "trailsBiz",
    src: trilhaNegocios,
    alt: "Palco de premiação com o logo da AUVP Capital e o ranking Best Performer",
    tone: "forest",
    position: "center 40%",
  },
  /** Inscrição — troféu erguido */
  ctaSide: {
    id: "ctaSide",
    src: inscricaoTrofeu,
    alt: "Integrante da AUVP erguendo um troféu no palco",
    tone: "mint",
    position: "center 20%",
  },
  /** Reserva — plateia em evento interno (não usada no momento) */
  evento: {
    id: "evento",
    src: eventoPlateia,
    alt: "Plateia de colaboradores em um evento interno da AUVP",
    tone: "forest",
  },
};
