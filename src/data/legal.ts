/**
 * Textos das páginas legais (privacidade.html e termos.html).
 *
 * - Termos: transcrição da versão 1.0 (15/09/2026) enviada pelo jurídico.
 * - Aviso de Privacidade completo: RASCUNHO redigido a partir do aviso
 *   resumido e dos Termos. Precisa de validação do jurídico/DPO antes de
 *   publicar (em especial as bases legais do item 5).
 *
 * Cada seção tem parágrafos (`p`) e/ou lista (`list`); `after` vem depois da lista.
 */

export type LegalSection = { h: string; p?: readonly string[]; list?: readonly string[]; after?: readonly string[] };
export type LegalDoc = {
  slug: "privacidade" | "termos";
  kicker: string;
  title: string;
  version: string;
  lead?: readonly string[];
  sections: readonly LegalSection[];
  pdf?: string;
};

export const privacy: LegalDoc = {
  slug: "privacidade",
  kicker: "AUVP Carreiras · Desafio de Potencial",
  title: "Aviso de Privacidade",
  version: "Versão 1.0 · 28 de setembro de 2026",
  lead: [
    "Este Aviso explica, de forma simples, como a AUVP usa os seus dados pessoais quando você se inscreve no AUVP Carreiras e participa do Desafio de Potencial. Ele complementa os Termos de Participação e Ciência.",
    "Se você tem entre 14 e 17 anos, este texto foi escrito para você. Se algo não ficar claro, fale com a gente pelo e-mail dpo@auvp.com.br.",
  ],
  sections: [
    {
      h: "1. Quem é o responsável pelos seus dados",
      p: [
        "A controladora dos dados tratados nesta etapa é a HOLDING SUPERNOVA LTDA. (\"AUVP\" ou \"SUPERNOVA\"), empresa do grupo AUVP, inscrita no CNPJ sob o nº 51.197.828/0001-12.",
        "O canal do Encarregado pelo Tratamento de Dados Pessoais (DPO) é o e-mail dpo@auvp.com.br.",
      ],
    },
    {
      h: "2. Quem pode participar",
      p: [
        "O Desafio de Potencial é destinado a pessoas com 14 anos completos ou mais. Se a data de nascimento informada indicar menos de 14 anos, o formulário não continua e nenhum dado é gravado, nem parcialmente.",
        "Quem tem entre 14 e 17 anos pode fazer o Desafio depois de ler este Aviso e os Termos. Se for selecionado para etapas que exijam formalização, a autorização do responsável legal será pedida por documento específico enviado pela AUVP. Todo tratamento de dados de adolescentes é feito no seu melhor interesse, como determinam o art. 14 da LGPD e o Estatuto da Criança e do Adolescente.",
      ],
    },
    {
      h: "3. Quais dados usamos",
      p: ["Pedimos apenas o necessário para organizar a atividade e fazer a seleção inicial:"],
      list: [
        "nome completo;",
        "data de nascimento (para confirmar a idade mínima);",
        "escola ou instituição de ensino;",
        "ano/série ou curso;",
        "e-mail e/ou telefone;",
        "se você precisa de alguma adaptação ou recurso de acessibilidade e qual;",
        "suas respostas ao Desafio, a pontuação e a classificação geradas a partir delas;",
        "o registro da sua confirmação de idade e da ciência sobre os Termos (data, hora e versão dos textos).",
      ],
      after: [
        "Não pedimos CPF, RG, endereço, renda familiar, dados bancários, documentos ou dados dos seus pais ou responsáveis nesta etapa.",
        "Para pedir uma adaptação de acessibilidade, não é necessário enviar laudo, diagnóstico ou CID. Essa informação é usada só para oferecer a adaptação e não entra na avaliação.",
      ],
    },
    {
      h: "4. Para que usamos seus dados",
      list: [
        "organizar o Desafio de Potencial e combinar com você, por e-mail ou telefone, data, horário e forma de acesso;",
        "oferecer as adaptações de acessibilidade que você pedir;",
        "corrigir suas respostas, calcular sua pontuação e sua classificação;",
        "identificar participantes que poderão ser convidados para as próximas etapas do AUVP Carreiras ou para processos seletivos da AUVP;",
        "atender seus pedidos de direitos e cumprir obrigações legais.",
      ],
    },
    {
      h: "5. Com base em quê usamos seus dados",
      p: [
        "Usamos seus dados para realizar procedimentos preliminares ligados a uma possível futura oportunidade profissional, a pedido do próprio participante (art. 7º, V, da LGPD), e, quando necessário, para cumprir obrigações legais (art. 7º, II). Informações de acessibilidade que revelem dados de saúde são tratadas apenas para garantir igualdade de condições na atividade, nos limites do art. 11 da LGPD.",
        "A confirmação de idade e a declaração de ciência que você marca antes de enviar seus dados registram que você leu as informações e quer participar voluntariamente. Elas não são um consentimento genérico, não autorizam o uso dos dados para outras finalidades e não são uma promessa de contratação.",
      ],
    },
    {
      h: "6. Como avaliamos e quem decide",
      p: [
        "Algumas questões do Desafio são corrigidas automaticamente pela ferramenta usada pela AUVP. A decisão sobre quem será convidado para a próxima etapa sempre passa por uma pessoa da nossa equipe.",
        "Atingir determinada pontuação não significa que você será chamado. Você pode pedir a revisão de uma decisão pelo e-mail dpo@auvp.com.br.",
      ],
    },
    {
      h: "7. O que não fazemos",
      p: [
        "Seus dados não serão usados para publicidade, venda de produtos ou serviços, remarketing, envio de ofertas ou inclusão em listas comerciais. Não vendemos seus dados.",
      ],
    },
    {
      h: "8. Com quem compartilhamos",
      list: [
        "com a ferramenta usada para aplicar e corrigir o Desafio, que trata os dados apenas conforme nossas instruções;",
        "com as empresas do grupo AUVP ligadas às oportunidades do programa, de acordo com as vagas e os requisitos de cada uma;",
        "com autoridades públicas, somente quando a lei exigir.",
      ],
    },
    {
      h: "9. Por quanto tempo guardamos",
      p: [
        "Se você não for convidado para a próxima etapa, seus dados serão guardados por até 12 meses a partir da sua participação e depois eliminados.",
        "Se você for convidado, os dados ficam guardados enquanto durar o processo seletivo e, depois, apenas pelo tempo necessário para cumprir obrigações legais. Você pode pedir a exclusão antes disso a qualquer momento.",
      ],
    },
    {
      h: "10. Como protegemos seus dados",
      p: [
        "Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda ou uso indevido. O acesso é restrito às pessoas da equipe que precisam dele para organizar e avaliar o Desafio.",
      ],
    },
    {
      h: "11. Seus direitos",
      p: ["A qualquer momento, pelo e-mail dpo@auvp.com.br, você pode:"],
      list: [
        "desistir de participar, sem nenhuma penalidade;",
        "saber se tratamos seus dados e pedir uma cópia deles;",
        "corrigir dados incompletos, errados ou desatualizados;",
        "pedir que seus dados sejam apagados;",
        "saber com quem compartilhamos seus dados;",
        "pedir a revisão, por uma pessoa, de uma decisão sobre a sua participação.",
      ],
      after: [
        "Se você tem menos de 18 anos, seu responsável legal também pode fazer esses pedidos em seu nome. Respondemos em até 15 dias. Você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
    },
    {
      h: "12. Mudanças neste Aviso",
      p: [
        "Se este Aviso mudar de forma relevante, avisaremos pelo contato que você informou. A versão e a data ficam sempre no topo desta página.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "termos",
  kicker: "AUVP Carreiras · Desafio de Potencial",
  title: "Termos de Participação e Ciência",
  version: "Versão 1.0 · 15 de setembro de 2026",
  pdf: "termos-de-participacao-auvp-carreiras.pdf",
  lead: [
    "Este documento explica, de forma simples, como funciona o AUVP Carreiras e o Desafio de Potencial.",
    "A participação nesta primeira etapa é voluntária. Se você tem entre 14 e 17 anos, poderá participar do Desafio, mas a autorização do seu responsável legal será necessária antes de avançar para as próximas etapas do processo seletivo.",
  ],
  sections: [
    {
      h: "1. Sobre o AUVP Carreiras",
      p: [
        "O AUVP Carreiras é uma iniciativa da HOLDING SUPERNOVA LTDA. (\"AUVP\" ou \"SUPERNOVA\") criada para conhecer, avaliar e desenvolver jovens com potencial para futuras oportunidades profissionais no ecossistema AUVP.",
        "O Programa é destinado a jovens de 14 a 21 anos e pode ser uma porta de entrada para oportunidades de aprendizagem profissional, estágio, trainee e outras posições compatíveis com a idade, escolaridade e os requisitos de cada vaga.",
        "Participar do AUVP Carreiras ou do Desafio de Potencial não significa contratação. Esta participação também não cria contrato de trabalho, estágio ou aprendizagem, não garante uma vaga e não significa que o participante seguirá automaticamente para as próximas etapas.",
      ],
    },
    {
      h: "2. Como funciona o Desafio de Potencial",
      p: [
        "Durante palestras, ações educacionais e outras iniciativas da AUVP, os participantes poderão receber um convite para acessar o Desafio de Potencial por QR Code ou outro canal indicado.",
        "O Desafio de Potencial é uma atividade voluntária, um quiz criado para conhecer melhor os participantes e identificar possíveis talentos que possam ter interesse em futuras oportunidades na AUVP.",
        "Responder ao quiz não significa se inscrever em um processo seletivo, nem coloca o participante automaticamente em um processo de seleção. O participante poderá, posteriormente, ser convidado pela AUVP para conhecer uma oportunidade ou participar de um processo seletivo, mas isso dependerá dos critérios do Programa e das oportunidades disponíveis.",
        "A realização do quiz, sua pontuação ou classificação não garantem convite, aprovação, entrevista, vaga ou contratação.",
      ],
    },
    {
      h: "3. Fluxo do Programa",
      p: ["O fluxo previsto está ilustrado na versão em PDF destes Termos, disponível no fim desta página."],
    },
    {
      h: "4. Quem pode participar",
      p: [
        "O Desafio está disponível para pessoas com 14 anos completos ou mais.",
        "Antes de começar, o participante deverá confirmar sua idade. Quem tiver menos de 14 anos não poderá continuar neste fluxo.",
        "A participação é gratuita, livre e voluntária. Você pode decidir não participar ou parar a qualquer momento, sem qualquer penalidade.",
      ],
    },
    {
      h: "5. Participantes menores de 18 anos",
      p: [
        "Quem tem entre 14 e 17 anos poderá realizar o Desafio depois de receber as informações sobre a atividade e sobre o tratamento de seus dados pessoais.",
        "Neste primeiro momento, não será necessária autorização prévia do responsável legal para fazer o Desafio.",
        "Se o adolescente for selecionado depois da avaliação, a AUVP poderá entrar em contato para informar sobre a possibilidade de avançar no processo.",
        "Para seguir para as próximas etapas que exigirem essa formalização, será necessária a ciência e autorização do responsável legal, por meio de documento específico enviado pela AUVP.",
        "Sem essa autorização, o adolescente não avançará para as atividades que dependam dela.",
        "Para participantes com 18 anos ou mais, não é necessária autorização do responsável legal.",
      ],
    },
    {
      h: "6. Avaliação, classificação e revisão humana",
      p: [
        "As respostas poderão ser corrigidas e avaliadas para gerar pontuação e classificação.",
        "Questões objetivas poderão ser corrigidas automaticamente pela ferramenta utilizada pela AUVP. As decisões relevantes sobre seleção e convite de participantes terão supervisão ou revisão humana.",
        "A AUVP poderá selecionar participantes de acordo com os critérios do Programa e com as oportunidades disponíveis.",
        "Por isso, atingir determinada pontuação não significa que o participante será necessariamente chamado para a próxima etapa.",
      ],
    },
    {
      h: "7. Dados pessoais utilizados nesta etapa",
      p: ["Para realizar o Desafio e fazer a seleção inicial, a SUPERNOVA poderá tratar apenas os dados necessários para essa finalidade, como:"],
      list: [
        "nome;",
        "idade;",
        "instituição de ensino;",
        "ano/série ou curso;",
        "e-mail;",
        "telefone;",
        "respostas dadas no Desafio;",
        "pontuação e classificação; e",
        "registros necessários para a avaliação.",
      ],
      after: [
        "Nesta primeira etapa, não serão solicitados, como regra, CPF, RG, endereço residencial completo, renda familiar, dados bancários, documentos dos responsáveis legais ou outros dados que não sejam necessários para a finalidade informada.",
        "A Política de Privacidade da Holding Supernova explica com mais detalhes quais dados são tratados, por quê, por quanto tempo, com quem podem ser compartilhados e quais são os direitos dos titulares.",
      ],
    },
    {
      h: "8. Controlador e compartilhamento com empresas do grupo",
      p: [
        "A HOLDING SUPERNOVA LTDA. é a controladora dos dados tratados nesta etapa do AUVP Carreiras e do Desafio de Potencial.",
        "A SUPERNOVA faz parte de um grupo econômico com outras empresas, e as oportunidades profissionais do AUVP Carreiras poderão estar relacionadas às diferentes empresas do grupo, de acordo com as vagas e os requisitos de cada oportunidade.",
      ],
    },
    {
      h: "9. Uso para marketing e outras finalidades",
      p: [
        "Os dados fornecidos para participar do Desafio não serão usados automaticamente para publicidade, divulgação de produtos ou serviços, remarketing ou inclusão em listas comerciais.",
        "Qualquer outra finalidade de tratamento será informada ao participante de acordo com as regras aplicáveis.",
      ],
    },
    {
      h: "10. Acessibilidade e proteção do participante",
      p: [
        "Se você precisar de algum recurso ou adaptação para realizar o Desafio, avise a AUVP pelo canal disponibilizado.",
        "Não será necessário apresentar, como regra, diagnóstico, laudo médico ou indicação de CID para solicitar uma adaptação razoável.",
        "O Programa deve garantir igualdade de oportunidades, respeito, segurança e não discriminação, sempre no melhor interesse do adolescente participante.",
      ],
    },
    {
      h: "11. Privacidade, retenção e direitos",
      p: [
        "Os dados pessoais serão tratados de acordo com a Lei nº 13.709/2018 (LGPD) e com os princípios aplicáveis ao tratamento de dados pessoais.",
        "Os dados não serão guardados por tempo indefinido. Os prazos e critérios de retenção estão descritos na Política de Privacidade da Holding Supernova e nos procedimentos internos do Programa.",
        "Os titulares poderão exercer os direitos previstos na LGPD pelo canal dpo@auvp.com.br.",
      ],
    },
    {
      h: "12. Ciência e manifestação voluntária",
      p: [
        "A confirmação de idade, a ciência sobre o funcionamento do Desafio e a manifestação voluntária de interesse em participar serão realizadas eletronicamente, em campo próprio disponibilizado na página imediatamente anterior ao início do questionário, mediante marcação das respectivas opções pelo participante.",
        "Para prosseguir ao Desafio, o participante deverá confirmar, na página indicada no item anterior:",
      ],
      list: [
        "I. que possui 14 (quatorze) anos completos ou mais; e",
        "II. que leu as informações disponibilizadas, compreendeu a finalidade do Desafio de Potencial AUVP Carreiras e deseja participar voluntariamente da atividade.",
      ],
      after: [
        "A manifestação realizada nessa etapa registra a ciência e a vontade do participante em realizar o Desafio, não constituindo consentimento genérico para o tratamento de dados pessoais, autorização para utilização de seus dados para finalidades distintas das informadas, nem promessa ou autorização de contratação.",
        "Os tratamentos de dados pessoais necessários à realização, avaliação, classificação e seleção inicial no âmbito do Desafio serão realizados conforme as finalidades, bases legais e condições descritas na Política de Privacidade da Holding Supernova, disponibilizada ao participante antes do início da atividade.",
      ],
    },
  ],
};
