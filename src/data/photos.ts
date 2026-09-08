/**
 * Fotografia humanizada — placeholders de alta qualidade (Unsplash CDN).
 * Jovens em ambiente de foco/tecnologia. Cada entrada tem um `tone` usado
 * como fallback (gradiente da marca) caso a imagem não carregue.
 *
 * Para trocar pelas fotos oficiais: substitua `src` por um arquivo em
 * src/assets/ (import) ou por uma URL própria. Mantenha as proporções.
 */
export type Photo = {
  id: string;
  src: string;
  alt: string;
  tone: "forest" | "mint" | "lime";
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos: Record<string, Photo> = {
  heroA: {
    id: "heroA",
    src: u("photo-1522202176988-66273c2fd55f", 1400),
    alt: "Jovens colaborando em frente a laptops em um ambiente de trabalho",
    tone: "forest",
  },
  heroB: {
    id: "heroB",
    src: u("photo-1573164713988-8665fc963095", 900),
    alt: "Jovem concentrada em um laptop com código na tela",
    tone: "mint",
  },
  heroC: {
    id: "heroC",
    src: u("photo-1519389950473-47ba0277781c", 900),
    alt: "Equipe reunida em torno de um computador",
    tone: "lime",
  },
  culture: {
    id: "culture",
    src: u("photo-1552664730-d307ca884978", 1600),
    alt: "Time discutindo ideias em um quadro branco",
    tone: "forest",
  },
  trailsTech: {
    id: "trailsTech",
    src: u("photo-1531482615713-2afd69097998", 900),
    alt: "Jovem desenvolvedor trabalhando com múltiplas telas",
    tone: "mint",
  },
  trailsGrowth: {
    id: "trailsGrowth",
    src: u("photo-1556761175-b413da4baf72", 900),
    alt: "Time de marketing analisando métricas em uma reunião",
    tone: "lime",
  },
  trailsBiz: {
    id: "trailsBiz",
    src: u("photo-1517245386807-bb43f82c33c4", 900),
    alt: "Jovens profissionais conversando em um escritório moderno",
    tone: "forest",
  },
  ctaSide: {
    id: "ctaSide",
    src: u("photo-1521737711867-e3b97375f902", 1000),
    alt: "Grupo de jovens em uma reunião de trabalho descontraída",
    tone: "mint",
  },
};
