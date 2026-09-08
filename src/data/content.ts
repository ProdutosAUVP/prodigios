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
  eyebrow: "Programa de talentos · AUVP",
  title: ["Um programa para", "talentos fora", "da curva."],
  subtitle:
    "Para estudantes de qualquer curso e qualquer idade que querem entrar no mercado com garra, vontade de aprender e foco em alta performance.",
  primaryCta: "Quero me inscrever",
  secondaryCta: "Conhecer as trilhas",
} as const;

export const intro = {
  label: "Para estudantes de qualquer curso e qualquer idade",
  statement:
    "O programa é voltado para talentos que desejam ingressar no mercado de trabalho com garra e vontade de aprender, focado em alta performance.",
} as const;

export const process = {
  label: "Processo seletivo",
  title: "As fases do nosso processo seletivo",
  steps: [
    { n: "01", title: "Inscrição", text: "Preenchimento de dados e envio de informações." },
    { n: "02", title: "Testes", text: "Avaliações de perfil, lógica e nivelamento." },
    { n: "03", title: "Desafio / Case", text: "Resolução de problemas práticos baseados no dia a dia." },
    { n: "04", title: "Entrevistas", text: "Bate-papo com líderes, gestores e RH." },
    { n: "05", title: "Aprovação e Contratação", text: "Oferta final e início da jornada." },
  ],
} as const;

export const trails = {
  label: "Trilhas",
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
  label: "Sem barreiras",
  title: "O que NÃO fazemos questão que você tenha",
  items: [
    { title: "Inglês fluente", text: "Não é um requisito obrigatório para a maioria das vagas." },
    { title: "Experiência prévia", text: "Buscamos muito mais o potencial e a vontade do que o currículo." },
    { title: "Diploma de faculdade de ponta", text: "Valorizamos o seu esforço real e capacidade de entrega." },
  ],
} as const;

export const culture = {
  label: "Cultura",
  title: "A nossa cultura, a verdade nua e crua",
  statement:
    "Foco extremo em resultados, transparência e meritocracia. Aqui valorizamos quem tem proatividade, “sentimento de dono” e assume responsabilidades sem medo de errar rápido e consertar rápido.",
  pillars: ["Resultados", "Transparência", "Meritocracia", "Sentimento de dono"],
} as const;

export const benefits = {
  label: "Benefícios",
  title: "Benefícios e incentivos para a jornada",
  items: [
    { title: "Remuneração competitiva", text: "Remuneração competitiva com o mercado." },
    { title: "Bônus por desempenho", text: "Bônus atrelado ao desempenho e metas." },
    { title: "Cursos e treinamentos", text: "Acesso completo aos cursos e treinamentos da AUVP." },
    { title: "Crescimento acelerado", text: "Oportunidades reais de crescimento acelerado." },
  ],
} as const;

export const learn = {
  label: "Jornada",
  title: "O que você vai aprender na jornada e os requisitos da entrega",
  items: [
    "Visão sistêmica e estratégica de negócios.",
    "Execução prática com foco em métricas.",
    "Trabalho colaborativo em uma equipe de alta performance.",
  ],
} as const;

export const notFor = {
  label: "Sinceridade",
  title: "Para quem NÃO é o nosso programa",
  items: [
    "Pessoas que buscam rotinas engessadas e previsíveis.",
    "Quem não lida bem com pressão, mudanças rápidas ou feedbacks diretos.",
    "Profissionais que evitam assumir grandes desafios.",
  ],
} as const;

export const cta = {
  label: "Próximos passos e Inscrição",
  title: "Garanta sua chance.",
  text: "Garanta sua chance de participar de um dos processos seletivos mais transformadores do mercado preenchendo os dados e aplicando para a vaga ideal para o seu perfil.",
  button: "Aplicar para a vaga",
} as const;

export const nav = [
  { href: "#processo", label: "Processo" },
  { href: "#trilhas", label: "Trilhas" },
  { href: "#cultura", label: "Cultura" },
  { href: "#beneficios", label: "Benefícios" },
] as const;
