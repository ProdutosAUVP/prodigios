# E-mails transacionais — AUVP Carreiras

Modelos HTML (tabelas + CSS inline, prontos para Gmail, Outlook e Apple Mail) com a estética da LP: fundo `ink`, cartão `graphite`, texto em papel e **lime só no botão e no check de sucesso**. Cada e-mail também tem uma versão `.txt` para o corpo alternativo, o que ajuda na entregabilidade.

```bash
npm run emails:build
```

Para outro domínio nos links do rodapé: `EMAIL_SITE_URL=https://carreiras.auvp.com.br/ npm run emails:build`.

Abra `emails/html/index.html` no navegador para ver todos lado a lado.

## Arquivos

| Arquivo | Papel |
|---|---|
| `emails.mjs` | copy de cada e-mail (assunto, pré-cabeçalho, gatilho, blocos) — **edite aqui** |
| `build.mjs` | layout, blocos e tokens de cor; gera o HTML e o texto |
| `html/` | saída gerada (não editar à mão) |

Blocos disponíveis: `check`, `kicker`, `title`, `p`, `box` (tabela de detalhes), `steps` (lista numerada como as fases da LP), `button`, `note`, `divider`, `sign`.

## Regras de conteúdo

- **Sem oferta nem publicidade** (Termos, item 9). O rodapé de todos diz isso e traz o canal `dpo@auvp.com.br`, os links do Aviso de Privacidade e dos Termos, e a controladora (HOLDING SUPERNOVA LTDA, CNPJ 51.197.828/0001-12).
- Linguagem simples, pensada para quem tem 14 a 17 anos, e neutra em gênero ("recebeu um convite", não "foi convidado/a").
- Todo convite reforça que **não é contratação e não garante vaga**. Resultados reforçam a **revisão humana**.
- Acessibilidade: sempre "não é necessário enviar laudo, diagnóstico ou CID".
- Participantes de 14 a 17 anos recebem o `07` (com o pedido de autorização), nunca o `06`.

## Catálogo

| Arquivo | Assunto | Quando enviar | Variáveis |
|---|---|---|---|
| `01-inscricao-recebida` | Recebemos sua inscrição no AUVP Carreiras | Logo após o envio do formulário da LP | `nome`, `instituicao`, `serie_curso`, `contato`, `acessibilidade_resumo` |
| `02-convite-desafio` | Seu Desafio de Potencial está marcado | Quando a equipe define a data do Desafio | `nome`, `data_desafio`, `horario_desafio`, `duracao`, `formato`, `link_desafio`, `prazo_adaptacao` |
| `03-lembrete-desafio` | Lembrete: seu Desafio de Potencial é {{quando}} | 24 h (ou outro prazo) antes do Desafio | `nome`, `quando`, `data_desafio`, `horario_desafio`, `formato`, `link_desafio` |
| `04-adaptacao-confirmada` | Sua adaptação para o Desafio está confirmada | Quando o recurso de acessibilidade pedido é confirmado | `nome`, `recurso`, `como_funciona`, `data_desafio` |
| `05-desafio-concluido` | Recebemos suas respostas do Desafio de Potencial | Quando a pessoa termina o Desafio | `nome`, `prazo_retorno` |
| `06-convite-proxima-etapa` | Você recebeu um convite para a próxima etapa | Após revisão humana, 18 anos ou mais | `nome`, `etapa`, `data_etapa`, `formato`, `link_confirmacao`, `prazo_confirmacao` |
| `07-convite-proxima-etapa-menor` | Você recebeu um convite para a próxima etapa | Após revisão humana, 14 a 17 anos | `nome`, `etapa`, `data_etapa`, `link_autorizacao`, `prazo_autorizacao` |
| `08-autorizacao-responsavel` | Pedido de autorização: {{nome_participante}} no AUVP Carreiras | Ao responsável legal, quando o e-mail dele é informado no Termo de Autorização | `nome_responsavel`, `nome_participante`, `etapa`, `data_etapa`, `link_autorizacao`, `prazo_autorizacao` |
| `09-autorizacao-confirmada` | Autorização recebida: você segue no AUVP Carreiras | Quando o Termo de Autorização assinado chega | `nome`, `etapa`, `data_etapa`, `proximos_passos` |
| `10-nao-selecionado` | Sobre a sua participação no AUVP Carreiras | Após revisão humana, para quem não segue | `nome`, `data_eliminacao` |
| `11-direitos-pedido-recebido` | Recebemos seu pedido sobre seus dados · protocolo {{protocolo}} | Pedido de acesso, correção, exclusão, desistência ou revisão | `nome`, `protocolo`, `tipo_pedido`, `data_pedido`, `prazo_resposta` |
| `12-direitos-pedido-concluido` | Seu pedido sobre seus dados foi concluído · protocolo {{protocolo}} | Pedido de direitos atendido | `nome`, `protocolo`, `tipo_pedido`, `data_conclusao`, `resumo_resultado`, `resultado` |

As variáveis estão no formato `{{nome}}` (Mustache/Handlebars, aceito pela maioria das ferramentas). Se a sua usar outra sintaxe (`*|NOME|*`, `%%nome%%`), faça a troca na hora de importar.

## Logo

O cabeçalho usa o nome "AUVP Carreiras" em texto, porque Gmail e Outlook não exibem SVG. Para usar o olho AUVP, publique um PNG 2x (ex.: 96×60) e troque a primeira célula do cabeçalho em `build.mjs` por um `<img>` com `alt="AUVP Carreiras"`.
