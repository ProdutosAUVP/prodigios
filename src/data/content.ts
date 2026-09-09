/**
 * Copy oficial da página — fonte única de verdade para todos os componentes.
 * Programa: AUVP Prodígios.
 */

export const site = {
  name: "AUVP Prodígios",
  tagline: "Um programa para talentos fora da curva.",
  applyUrl: import.meta.env.VITE_APPLY_URL || "#inscricao",
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || "",
} as const;

export const hero = {
  title: ["Um programa", "para talentos", "fora da curva."],
  facts: ["Qualquer curso", "Qualquer idade", "Três trilhas de carreira"],
  badge: "3 trilhas · 5 fases · 1 carreira",
  band: ["Um programa para talentos fora da curva", "Tecnologia", "Growth & Marketing", "Negócios & Finanças"],
  ring: "Talentos fora da curva • AUVP Prodígios • ",
  subtitle:
    "Para estudantes de qualquer curso e qualquer idade que querem entrar no mercado aprendendo rápido, entregando de verdade e jogando em alta performance.",
  primaryCta: "Quero me inscrever",
  secondaryCta: "Conhecer as trilhas",
} as const;

export const intro = {
  title: "Isso não é um programa de estágio.",
  statement:
    "É a porta de entrada para quem quer assumir responsabilidade de verdade, cedo. Sem curso certo, sem idade certa, sem currículo perfeito: aqui o que pesa é a entrega, e a régua é alta.",
  /** palavras da declaração que ficam em lime (comparação exata, com pontuação) */
  emphasis: ["responsabilidade", "entrega,", "alta."],
} as const;

export const process = {
  title: "As fases do nosso processo seletivo",
  lead: "Cinco etapas, sem atalho. Cada uma filtra de verdade.",
  closing: "Cinco fases. Nenhum atalho.",
  steps: [
    { n: "01", title: "Inscrição", text: "Preenchimento de dados e envio de informações." },
    { n: "02", title: "Testes", text: "Avaliações de perfil, lógica e nivelamento." },
    { n: "03", title: "Desafio / Case", text: "Resolução de problemas práticos baseados no dia a dia." },
    { n: "04", title: "Entrevistas", text: "Bate-papo com líderes, gestores e RH." },
    { n: "05", title: "Aprovação e Contratação", text: "Oferta final e início da jornada." },
  ],
} as const;

export const trails = {
  title: "Um programa, três trilhas, uma carreira",
  subtitle: "Desenvolva-se em áreas essenciais para o crescimento do ecossistema:",
  items: [
    {
      id: "tech",
      n: "Trilha 1",
      title: "Tecnologia",
      areas: ["Desenvolvimento", "Dados", "Produto"],
      blurb: "Construa o que ainda não existe. Código, dados e produto a serviço de quem investe.",
    },
    {
      id: "growth",
      n: "Trilha 2",
      title: "Growth & Marketing",
      areas: ["Vendas", "Aquisição", "Conteúdo"],
      blurb: "Faça o ecossistema crescer. Funil, narrativa e números que viram resultado.",
    },
    {
      id: "biz",
      n: "Trilha 3",
      title: "Negócios & Finanças",
      areas: ["Atendimento", "Sucesso do Cliente", "Investimentos"],
      blurb: "Cuide de quem confia na AUVP. Relacionamento, estratégia e mercado financeiro.",
    },
  ],
} as const;

export const notRequired = {
  title: "O que NÃO fazemos questão que você tenha",
  items: [
    { title: "Inglês fluente", text: "Não é um requisito obrigatório para a maioria das vagas." },
    { title: "Experiência prévia", text: "Buscamos muito mais o potencial e a vontade do que o currículo." },
    { title: "Diploma de faculdade de ponta", text: "Valorizamos o seu esforço real e capacidade de entrega." },
  ],
} as const;

export const culture = {
  title: "A nossa cultura, a verdade nua e crua",
  statement:
    "Foco extremo em resultados, transparência e meritocracia. Aqui valorizamos quem tem proatividade, puxa a responsabilidade para si e não tem medo de errar rápido e consertar rápido.",
  /** palavras do manifesto que ficam em destaque (comparação exata, com pontuação) */
  emphasis: ["resultados,", "transparência", "meritocracia.", "responsabilidade"],
  pillars: ["Resultados", "Transparência", "Meritocracia", "Responsabilidade"],
} as const;

export const benefits = {
  title: "Benefícios e incentivos para a jornada",
  items: [
    { title: "Remuneração competitiva", text: "Remuneração competitiva com o mercado." },
    { title: "Bônus por desempenho", text: "Bônus atrelado ao desempenho e metas." },
    { title: "Cursos e treinamentos", text: "Acesso completo aos cursos e treinamentos da AUVP." },
    { title: "Crescimento acelerado", text: "Oportunidades reais de crescimento acelerado." },
  ],
} as const;

export const learn = {
  title: "O que você vai aprender na jornada",
  items: [
    "Visão sistêmica e estratégica de negócios.",
    "Execução prática com foco em métricas.",
    "Trabalho colaborativo em uma equipe de alta performance.",
  ],
} as const;

export const notFor = {
  title: "Para quem NÃO é o nosso programa",
  items: [
    "Pessoas que buscam rotinas engessadas e previsíveis.",
    "Quem não lida bem com pressão, mudanças rápidas ou feedbacks diretos.",
    "Profissionais que evitam assumir grandes desafios.",
  ],
} as const;

export const cta = {
  title: "Garanta sua chance.",
  formTitle: "Próximos passos e inscrição",
  text: "Garanta sua chance de participar de um dos processos seletivos mais transformadores do mercado preenchendo os dados e aplicando para a vaga ideal para o seu perfil.",
  button: "Aplicar para a vaga",
} as const;

export const nav = [
  { href: "#processo", label: "Processo" },
  { href: "#trilhas", label: "Trilhas" },
  { href: "#cultura", label: "Cultura" },
  { href: "#beneficios", label: "Benefícios" },
] as const;
