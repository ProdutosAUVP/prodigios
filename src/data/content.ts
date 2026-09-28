/**
 * Copy oficial da página — fonte única de verdade para todos os componentes.
 * Programa: AUVP Carreiras.
 */

export const site = {
  name: "AUVP Carreiras",
  tagline: "O programa para pessoas acima da média.",
  applyUrl: import.meta.env.VITE_APPLY_URL || "#inscricao",
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || "",
  /** páginas legais geradas no próprio build (ver vite.config.ts) */
  privacyUrl: `${import.meta.env.BASE_URL}privacidade.html`,
  termsUrl: `${import.meta.env.BASE_URL}termos.html`,
  controller: "HOLDING SUPERNOVA LTDA",
  cnpj: "51.197.828/0001-12",
  dpoEmail: "dpo@auvp.com.br",
} as const;

export const hero = {
  title: ["O programa", "para pessoas", "acima da média"],
  facts: ["Qualquer curso", "De 14 a 21 anos", "Três trilhas de carreira"],
  badge: "3 trilhas · 5 fases · 1 carreira",
  band: ["O programa para pessoas acima da média", "Tecnologia", "Growth & Marketing", "Negócios & Finanças"],
  ring: "Pessoas acima da média • AUVP Carreiras • ",
  subtitle:
    "Para estudantes de qualquer curso, de 14 a 21 anos, que querem jogar o jogo de quem constrói o mercado na prática.",
  primaryCta: "Quero me inscrever",
  secondaryCta: "Conhecer as trilhas",
} as const;

export const about = {
  title: "O que é a AUVP?",
  /** `stat` só quando o dado existe no documento (60 mil+, Top 1); sem ele, o título vira a manchete do card */
  items: [
    { stat: "60 mil+", title: "A maior escola de investimentos do Brasil", text: "Mais de 60 mil investidores formados." },
    { stat: "Top 1", title: "Ranking BTG Pactual", text: "Primeiro lugar no ranking de consultoria pelo segundo ano consecutivo." },
    { title: "Soluções financeiras integradas", text: "Educação, consultoria e proteção patrimonial, inteligência para o agronegócio e soluções internacionais." },
    { title: "Compromisso inegociável com nossos valores", text: "Inovação e crescimento só acontecem quando a cultura interna é sólida." },
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
  text: "Preencha seus dados e garanta sua inscrição no nosso banco de talentos. O Desafio de Potencial acontece depois: data e acesso são combinados com você por e-mail.",
  button: "Garantir minha inscrição",
  help: "Leva menos de um minuto.",
  sideLabel: "Sua carreira",
  sideTitle: "Começa aqui.",

  /** Etapa 1: dados. Só o necessário (LGPD art. 14): sem CPF, RG, endereço, renda, dados bancários ou dos responsáveis. */
  fields: {
    nome: { label: "Nome completo", placeholder: "Seu nome" },
    nascimento: { label: "Data de nascimento" },
    instituicao: { label: "Escola ou instituição de ensino", placeholder: "Onde você estuda" },
    serie: { label: "Ano/série ou curso", placeholder: "Ex.: 2º ano do ensino médio, Administração" },
    email: { label: "E-mail", placeholder: "voce@exemplo.com" },
    telefone: { label: "Telefone", placeholder: "(11) 90000-0000" },
  },
  contactHint: "Informe pelo menos um contato: e-mail ou telefone.",
  contactError: "Preencha o e-mail ou o telefone para a gente conseguir falar com você.",
  accessibility: {
    question: "Você necessita de alguma adaptação ou recurso de acessibilidade para realizar esta atividade?",
    no: "Não",
    yes: "Sim",
    whichLabel: "Qual adaptação ou recurso?",
    whichPlaceholder: "Conte o que ajudaria você a fazer o Desafio",
    note: "Não é necessário enviar laudo, diagnóstico ou CID.",
  },
  next: "Continuar",
  /** aviso sob o botão da etapa 1; os trechos 1 e 3 viram links */
  legalNote: ["Na próxima etapa você lê o ", "Aviso de Privacidade", " e os ", "Termos de Participação", " antes de enviar."],

  /** Etapa 2: aviso de privacidade resumido + ciência. Lido antes de qualquer envio. */
  noticeTitle: "Antes de enviar, leia com atenção",
  back: "Voltar e revisar meus dados",

  /** Bloqueio de menores de 14 anos: nada é enviado nem guardado. */
  blocked: {
    title: "Obrigado pelo interesse!",
    text: "O Desafio de Potencial AUVP é destinado a pessoas com 14 anos completos ou mais. Por isso, não é possível continuar agora. Obrigado pelo interesse!",
    back: "Voltar ao início",
  },

  sending: "Enviando…",
  doneTitle: "Inscrição recebida.",
  doneText: "Fique de olho no seu e-mail: é por lá que vamos combinar o Desafio de Potencial.",
  doneAgain: "Enviar outra",
  error: "Não conseguimos enviar agora. Tente novamente em instantes.",
  demo: "Modo demonstração — configure VITE_FORM_ENDPOINT para receber inscrições.",
} as const;

/**
 * Aviso de Privacidade resumido do Desafio de Potencial (texto do jurídico,
 * com o nome do programa atualizado para AUVP Carreiras). Versões registradas
 * junto com a inscrição para provar a qual texto a pessoa deu ciência.
 */
export const privacyNotice = {
  version: "1.0",
  termsVersion: "1.0 (15/09/2026)",
  intro:
    "O Desafio de Potencial AUVP é uma atividade voluntária e gratuita, criada para conhecer diferentes formas de raciocínio, aprendizagem e resolução de problemas. Suas respostas e seu resultado poderão ser usados pela AUVP para identificar participantes que poderão ser convidados para as próximas etapas do Programa AUVP Carreiras ou para processos seletivos da AUVP. Fazer o Desafio não garante convite, vaga ou contratação.",
  age: "Este Desafio é destinado a pessoas com 14 anos completos ou mais.",
  heading: "Como usamos seus dados",
  items: [
    { label: "Quem é o responsável", text: "HOLDING SUPERNOVA LTDA (grupo AUVP), CNPJ 51.197.828/0001-12." },
    { label: "O que pedimos", text: "nome, data de nascimento, escola ou instituição de ensino, ano/série ou curso, e-mail e telefone, além das suas respostas ao Desafio. Não pedimos CPF, documentos, endereço, renda ou dados dos seus pais nesta etapa." },
    { label: "Para que usamos", text: "organizar a atividade, corrigir suas respostas, calcular sua pontuação e identificar participantes que poderão ser convidados para as próximas etapas." },
    { label: "Como avaliamos", text: "algumas questões são corrigidas automaticamente, mas a decisão sobre quem será convidado sempre passa por uma pessoa da nossa equipe." },
    { label: "O que não fazemos", text: "seus dados não serão usados para publicidade, venda de produtos ou envio de ofertas." },
    { label: "Com quem compartilhamos", text: "apenas com a ferramenta usada para aplicar o Desafio e com as empresas do grupo AUVP ligadas às oportunidades do programa." },
    { label: "Por quanto tempo guardamos", text: "se você não for convidado para a próxima etapa, seus dados serão guardados por até 12 meses e depois eliminados." },
    { label: "Seus direitos", text: "você pode desistir a qualquer momento, pedir para ver, corrigir ou apagar seus dados e pedir a revisão de uma decisão pelo e-mail dpo@auvp.com.br." },
  ],
  /** "Para saber mais, leia o {privacy} e os {terms}." */
  more: ["Para saber mais, leia o ", "Aviso de Privacidade completo", " e os ", "Termos de Participação", "."],
  checks: {
    age: "Confirmo que tenho 14 anos completos ou mais.",
    /** o trecho do meio vira link para os Termos */
    terms: [
      "Declaro que li as informações acima e os ",
      "Termos de Participação",
      ", compreendi a finalidade do Desafio de Potencial AUVP Carreiras e desejo participar voluntariamente da atividade.",
    ],
  },
} as const;

/** Links legais do rodapé e da inscrição */
export const legal = {
  privacy: "Aviso de Privacidade",
  terms: "Termos de Participação",
  dpo: "Seus dados:",
} as const;

export const nav = [
  { href: "#processo", label: "Processo" },
  { href: "#trilhas", label: "Trilhas" },
  { href: "#cultura", label: "Cultura" },
  { href: "#beneficios", label: "Benefícios" },
] as const;
