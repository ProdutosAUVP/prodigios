# Deploy no GitHub Pages

## Primeira vez

1. No repositório, abra **Settings → Pages** e em **Build and deployment → Source** escolha **GitHub Actions**.
2. Faça push na branch `main`. O workflow `.github/workflows/deploy.yml` roda lint, typecheck, build e publica `dist/`.
3. A página fica em `https://<org>.github.io/prodigios/`.

O workflow também aceita disparo manual (**Actions → Deploy to GitHub Pages → Run workflow**).

## Base path

O Vite builda com `base: "/prodigios/"` (nome do repositório). Se o repositório for renomeado, ajuste:

- `VITE_BASE` no `deploy.yml` (ou o padrão em `vite.config.ts`);
- o redirect em `public/404.html`.

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

`privacidade.html` (Aviso de Privacidade completo) e `termos.html` (Termos de Participação e Ciência) são entradas extras do Vite (`build.rollupOptions.input`), com texto em `src/data/legal.ts`. O PDF original dos Termos fica em `public/termos-de-participacao-auvp-carreiras.pdf`. Ao mudar um texto legal, suba a versão em `legal.ts` **e** em `privacyNotice` (`content.ts`), que é o que vai no envio.

## E-mails transacionais

Modelos em `emails/` (`npm run emails:build`). Ver [`emails/README.md`](../emails/README.md).

## CI em pull requests

`.github/workflows/ci.yml` roda `npm run lint`, `npm run typecheck` e `npm run build` em todo PR e em pushes fora da `main`.

## Verificação local do build

```bash
npm run build
npm run preview   # http://127.0.0.1:4173/prodigios/
```
