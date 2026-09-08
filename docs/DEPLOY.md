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

Campos enviados: `nome`, `email`, `trilha` (`tech` \| `growth` \| `biz`).

## CI em pull requests

`.github/workflows/ci.yml` roda `npm run lint`, `npm run typecheck` e `npm run build` em todo PR e em pushes fora da `main`.

## Verificação local do build

```bash
npm run build
npm run preview   # http://127.0.0.1:4173/prodigios/
```
