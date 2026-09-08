# Briefing original

> Prompt recebido para a construção da página. O programa foi renomeado para **AUVP Prodígios** durante o desenvolvimento; o restante do conteúdo segue este texto.

Atue como um Engenheiro de Front-end Sênior e Especialista em UI/UX. Sua tarefa é desenvolver a Landing Page para o programa "AUVP Jovens Talentos", criando uma experiência imersiva, séria, mas com interações divertidas.

**1. Base de Conteúdo (Copy da Página)**
Utilize o texto abaixo para estruturar todas as seções e tipografia da página:

[INÍCIO DO CONTEÚDO]
AUVP Jovens Talentos
Um programa para talentos fora da curva.

Para estudantes de qualquer curso e qualquer idade
O programa é voltado para talentos que desejam ingressar no mercado de trabalho com garra e vontade de aprender, focado em alta performance.

As fases do nosso processo seletivo
1. Inscrição: Preenchimento de dados e envio de informações.
2. Testes: Avaliações de perfil, lógica e nivelamento.
3. Desafio / Case: Resolução de problemas práticos baseados no dia a dia.
4. Entrevistas: Bate-papo com líderes, gestores e RH.
5. Aprovação e Contratação: Oferta final e início da jornada.

Um programa, três trilhas, uma carreira
Desenvolva-se em áreas essenciais para o crescimento do ecossistema:
* Trilha 1: Tecnologia (Desenvolvimento, Dados, Produto)
* Trilha 2: Growth & Marketing (Vendas, Aquisição, Conteúdo)
* Trilha 3: Negócios & Finanças (Atendimento, Sucesso do Cliente, Investimentos)

O que NÃO fazemos questão que você tenha
* Inglês fluente: Não é um requisito obrigatório para a maioria das vagas.
* Experiência prévia: Buscamos muito mais o potencial e a vontade do que o currículo.
* Diploma de faculdade de ponta: Valorizamos o seu esforço real e capacidade de entrega.

A nossa cultura, a verdade nua e crua
Foco extremo em resultados, transparência e meritocracia. Aqui valorizamos quem tem proatividade, "sentimento de dono" e assume responsabilidades sem medo de errar rápido e consertar rápido.

Benefícios e incentivos para a jornada
* Remuneração competitiva com o mercado.
* Bônus atrelado ao desempenho e metas.
* Acesso completo aos cursos e treinamentos da AUVP.
* Oportunidades reais de crescimento acelerado.

O que você vai aprender na jornada e os requisitos da entrega
* Visão sistêmica e estratégica de negócios.
* Execução prática com foco em métricas.
* Trabalho colaborativo em uma equipe de alta performance.

Para quem NÃO é o nosso programa
* Pessoas que buscam rotinas engessadas e previsíveis.
* Quem não lida bem com pressão, mudanças rápidas ou feedbacks diretos.
* Profissionais que evitam assumir grandes desafios.

Próximos passos e Inscrição
Garanta sua chance de participar de um dos processos seletivos mais transformadores do mercado preenchendo os dados e aplicando para a vaga ideal para o seu perfil.
[FIM DO CONTEÚDO]

**2. Identidade Visual e Design System**
A página deve ser séria e de alta performance. Acesse, analise e importe os tokens da marca (cores, tipografia, espaçamentos, componentes) do Design System no repositório: `https://github.com/ProdutosAUVP/central`. Aplique esses padrões de forma sutil, garantindo consistência com a marca.

**3. Experiência, Scroll Divertido e Requisitos Visuais**
* **Scroll Interativo e Divertido:** A navegação deve ser a grande estrela. Use bibliotecas como GSAP (ScrollTrigger), Framer Motion ou Lenis. Implemente seções que se transformam ao rolar (ex: elementos que se montam na tela, textos com efeito de "reveal", parallax suave em imagens, e possivelmente uma seção com scroll horizontal para as "Fases do Processo" ou "Trilhas"). O usuário deve sentir prazer e curiosidade ao descer a página.
* **Loading Screen:** Um estado de carregamento inicial elegante que faça uma transição criativa para o Hero da página.
* **Elementos 3D:** Integre objetos 3D (Three.js/React Three Fiber) relacionados a finanças, tech ou crescimento. Eles devem flutuar no background, reagir ao movimento do mouse ou girar sutilmente conforme o scroll do usuário.
* **Fotografia Humanizada:** Use placeholders de alta qualidade para fotos de jovens em ambiente de foco/tecnologia. Aplique recortes modernos, assimetria nos grids e sobreposições sutis com as cores da marca.
* **Micro-interações:** Cards, botões e listas devem ter feedbacks visuais divertidos e elásticos no hover.

**4. Instruções de Execução**
1. Extraia e configure as variáveis do repositório indicado.
2. Estruture a aplicação em componentes modulares (Hero, Process, Trails, Culture, Benefits, CTA).
3. Implemente as lógicas de scroll e 3D garantindo que não prejudiquem a performance (use lazy loading).
4. Escreva código limpo, responsivo para mobile e pronto para produção.