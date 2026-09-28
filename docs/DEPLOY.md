# Deploy

Dois destinos funcionam com o mesmo código: **Vercel** (recomendado) e **GitHub Pages**. O base path se ajusta sozinho (`vite.config.ts`): `/` quando o build roda na Vercel (`VERCEL=1`), `/prodigios/` fora dela. `VITE_BASE` sempre tem prioridade.

## Vercel

### Primeira vez

1. Em **Add New → Project**, importe o repositório. O `vercel.json` já define instalação (`npm ci`), build (`npm run build`), saída (`dist`) e framework (Vite); não mude nada na tela de configuração.
2. Em **Settings → Environment Variables**, marcando **Production** e **Preview**:

   | Nome | Valor |
   |---|---|
   | `VITE_FORM_ENDPOINT` | endpoint que recebe as inscrições (obrigatório em produção; sem ele o formulário fica em modo demonstração) |
   | `VITE_APPLY_URL` | opcional: troca os botões "Quero me inscrever" por um link externo |

   Não é preciso definir `VITE_BASE`.
3. Faça o deploy. Cada PR ganha um preview próprio; a `main` vai para produção.

### Domínio próprio

Em **Settings → Domains**, adicione o domínio (ex.: `carreiras.auvp.com.br`) e crie no DNS o registro que a Vercel indicar (CNAME para `cname.vercel-dns.com` em subdomínio). Depois, regere os e-mails com o domínio final, para os links do rodapé:

```bash
EMAIL_SITE_URL=https://carreiras.auvp.com.br/ npm run emails:build
```

### O que o `vercel.json` faz

- `cleanUrls`: as páginas legais ficam em `/privacidade` e `/termos` (quem acessar `.html` é redirecionado).
- Cache de 1 ano, imutável, para `/assets/*` (arquivos com hash no nome).
- Cabeçalhos de segurança: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` (sem câmera, microfone ou localização) e HSTS.
- Rotas inexistentes caem em `public/404.html`, que manda para a home do ambiente (`/` na Vercel, `/prodigios/` no Pages).

## GitHub Pages

Se a Vercel for o único destino, desative o Pages (**Settings → Pages**) ou remova `.github/workflows/deploy.yml`. O `ci.yml` continua rodando os checks nos PRs.

### Primeira vez

1. No repositório, abra **Settings → Pages** e em **Build and deployment → Source** escolha **GitHub Actions**.
2. Faça push na branch `main`. O workflow `.github/workflows/deploy.yml` roda lint, typecheck, build e publica `dist/`.
3. A página fica em `https://<org>.github.io/prodigios/`.

O workflow também aceita disparo manual (**Actions → Deploy to GitHub Pages → Run workflow**).

### Base path e domínio próprio no Pages

O Vite builda com `base: "/prodigios/"` (nome do repositório). Se o repositório for renomeado, ajuste:

- `VITE_BASE` no `deploy.yml` (ou o padrão em `vite.config.ts`);
- o prefixo testado em `public/404.html`.

Para **domínio próprio** (ex.: `prodigios.auvp.com.br`):

1. `VITE_BASE: /` no workflow;
2. crie `public/CNAME` com o domínio;
3. configure o DNS (CNAME para `<org>.github.io`) e o domínio em Settings → Pages.

## Formulário de inscrição

O formulário em `CTA.tsx` faz `POST` JSON para `VITE_FORM_ENDPOINT`. Sem a variável, roda em modo demonstração (mostra a confirmação sem enviar).

No GitHub: **Settings → Secrets and variables → Actions**

| Tipo | Nome | Exemplo |
|---|---|---|
| Secret | `FORM_ENDPOINT` | `https://formspree.io/f/xxxxxxxx` |
| Variable | `APPLY_URL` | `https://auvp.gupy.io/...` (opcional — troca os botões "Quero me inscrever" por link externo) |

Campos enviados (JSON): `nome`, `data_nascimento` (AAAA-MM-DD), `instituicao`, `serie_curso`, `email`, `telefone` (pelo menos um dos dois), `acessibilidade` (`nao` \| `sim`), `acessibilidade_recurso`, `confirma_14_anos` e `ciencia_termos` (sempre `true`), `versao_aviso_privacidade`, `versao_termos` e `enviado_em` (ISO). Guarde as versões e o horário: são a prova da ciência de cada participante.

### Proteção de dados (LGPD art. 14)

- **Menores de 14 anos:** a LP bloqueia no navegador e não envia nada. **O endpoint também precisa recusar** (HTTP 422, sem gravar) qualquer `data_nascimento` com menos de 14 anos completos, e qualquer envio sem `confirma_14_anos` e `ciencia_termos` iguais a `true`, porque a checagem do navegador pode ser contornada.
- Não aceite nem grave campos além dos listados (nada de CPF, RG, endereço, renda, dados bancários ou dos responsáveis).
- `acessibilidade_recurso` pode revelar dado de saúde: acesso restrito a quem organiza a adaptação, fora da planilha de avaliação.
- Retenção: quem não receber convite tem os dados eliminados em até 12 meses.
- Sem pixels, analytics de terceiros ou remarketing nesta página.

## Páginas legais

`privacidade.html` (Aviso de Privacidade completo) e `termos.html` (Termos de Participação e Ciência), servidas como `/privacidade` e `/termos`, são entradas extras do Vite (`build.rollupOptions.input`), com texto em `src/data/legal.ts`. O PDF original dos Termos fica em `public/termos-de-participacao-auvp-carreiras.pdf`. Ao mudar um texto legal, suba a versão em `legal.ts` **e** em `privacyNotice` (`content.ts`), que é o que vai no envio.

## E-mails transacionais

Modelos em `emails/` (`npm run emails:build`). Ver [`emails/README.md`](../emails/README.md).

## CI em pull requests

`.github/workflows/ci.yml` roda `npm run lint`, `npm run typecheck` e `npm run build` em todo PR e em pushes fora da `main`.

## Verificação local do build

```bash
npm run build
npm run preview   # http://127.0.0.1:4173/prodigios/
```
