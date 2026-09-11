/**
 * Copy oficial da página — fonte única de verdade para todos os componentes.
 * Programa: AUVP Future.
 */

export const site = {
  name: "AUVP Future",
  tagline: "O programa para pessoas acima da média.",
  applyUrl: import.meta.env.VITE_APPLY_URL || "#inscricao",
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || "",
} as const;

export const hero = {
  title: ["O programa", "para pessoas", "acima da média"],
  facts: ["Qualquer curso", "Qualquer idade", "Três trilhas de carreira"],
  badge: "3 trilhas · 5 fases · 1 carreira",
  band: ["O programa para pessoas acima da média", "Tecnologia", "Growth & Marketing", "Negócios & Finanças"],
  ring: "Pessoas acima da média • AUVP Future • ",
  subtitle:
    "Para estudantes de qualquer curso ou idade que querem jogar o jogo de quem constrói o mercado na prática.",
  primaryCta: "Quero me inscrever",
  secondaryCta: "Conhecer as trilhas",
} as const;

export const about = {
  title: "O que é a AUVP?",
  items: [
    { stat: "60 mil+", title: "A maior escola de investimentos do Brasil", text: "Mais de 60 mil investidores formados." },
    { stat: "Top 1", title: "Ranking BTG Pactual", text: "Primeiro lugar no ranking de consultoria pelo segundo ano consecutivo." },
    { stat: "4 frentes", title: "Soluções financeiras integradas", text: "Educação, consultoria patrimonial, inteligência para o agronegócio e soluções internacionais." },
    { stat: "Cultura", title: "Compromisso inegociável com nossos valores", text: "Inovação e crescimento só acontecem quando a cultura interna é sólida." },
  ],
} as const;

export const intro = {
  title: "Isso não é um programa de estágio",
  statement:
    "Não contratamos papéis. Contratamos capacidade de execução. Nosso programa nasceu para reunir quem tem sangue nos olhos e quer construir uma carreira sólida.",
  /** palavras da declaração que ficam em lime (comparação exata, com pontuação) */
  emphasis: ["execução.", "sangue", "nos", "olhos"],
} as const;

export const process = {
  title: "As fases do nosso processo seletivo",
  lead: "Cinco etapas. Zero atalhos.",
  steps: [
    { n: "01", title: "Inscrição", text: "Preenchimento de dados e envio de informações." },
    { n: "02", title: "Testes", text: "Avaliações de perfil, lógica e nivelamento." },
    { n: "03", title: "Desafio / Case", text: "Resolução de problemas práticos baseados no dia a dia." },
    { n: "04", title: "Entrevistas", text: "Bate-papo com líderes, gestores e RH." },
    { n: "05", title: "Aprovação e Contratação", text: "Oferta final e início da jornada." },
  ],
} as const;

export const trails = {
  title: "Você escolhe a área e nós te ensinamos o resto.",
  subtitle: "Desenvolva-se em áreas essenciais para o crescimento do nosso ecossistema:",
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
  title: "Potencial e vontade pesam mais que currículo.",
  lead: "Por isso, NÃO fazemos questão que você tenha:",
  items: [
    { title: "Inglês fluente", text: "Saber resolver o problema em português claro vale dez vezes mais do que falar termos bonitos em inglês." },
    { title: "Experiência prévia", text: "Nosso foco é o seu desenvolvimento." },
    { title: "Diploma de faculdade", text: "Valorizamos o seu esforço e a sua capacidade de entregar resultados." },
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
  title: "Você tem o perfil que a gente procura?",
  formTitle: "Próximos passos e inscrição",
  text: "Preencha seus dados e garanta sua inscrição no nosso banco de talentos.",
  button: "Garantir minha inscrição",
} as const;

export const nav = [
  { href: "#processo", label: "Processo" },
  { href: "#trilhas", label: "Trilhas" },
  { href: "#cultura", label: "Cultura" },
  { href: "#beneficios", label: "Benefícios" },
] as const;
