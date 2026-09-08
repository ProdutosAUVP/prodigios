# Conteúdo e fotografia

## Copy

Toda a copy da página vive em `src/data/content.ts`, seção por seção, e é a única fonte de verdade — os componentes não têm texto hardcoded. O texto reproduz o briefing ([briefing-original.md](briefing-original.md)) com o nome atualizado para **AUVP Prodígios**.

Para alterar um texto, edite o objeto correspondente (`hero`, `process`, `trails`, `notRequired`, `culture`, `benefits`, `learn`, `notFor`, `cta`, `nav`). Alguns componentes destacam palavras específicas (por exemplo `garra`, `aprender,`, `alta`, `performance.` na `Intro`; `resultados,`, `transparência`, `meritocracia.` na `Culture`) via um `Set` no próprio componente — ajuste-o se a frase mudar.

## Sem eyebrows

A página não usa *eyebrows* (a etiqueta pequena em caixa alta acima dos títulos). Cada dobra abre direto no título display; frases do briefing que eram etiquetas viraram títulos de verdade (`intro.title`, `cta.formTitle`). A classe `.label` continua existindo para etiquetas funcionais (carimbo "Opcional", "Trilha 1", rótulos de formulário).

## Fotografia humanizada

`src/data/photos.ts` mapeia cada foto usada na página. Hoje são **placeholders de alta qualidade** do Unsplash (jovens em ambiente de foco/tecnologia) servidos pelo CDN deles.

Cada entrada tem:

| Campo | Uso |
|---|---|
| `src` | URL (ou import de `src/assets/`) |
| `alt` | texto alternativo — obrigatório |
| `tone` | `forest` \| `mint` \| `lime` — gradiente de fallback se a imagem não carregar |

O componente `<Photo>` aplica: recorte (`clip-slant`, `clip-arch`, `clip-blob` ou radius), sobreposição com a cor da marca (`overlay`, 0–1), degradê inferior e fade-in no `onLoad`. Se o `src` falhar, o gradiente do `tone` fica no lugar e a composição não quebra.

### Trocando pelas fotos oficiais

1. Coloque os arquivos em `src/assets/photos/` (WebP, largura máxima ~1600px para o Hero/Cultura e ~900px para cards).
2. Importe e substitua o `src` em `photos.ts`:

```ts
import heroA from "@/assets/photos/hero-a.webp";
// ...
heroA: { id: "heroA", src: heroA, alt: "…", tone: "forest" },
```

3. Mantenha as proporções usadas nos componentes (`aspect-[4/5]`, `aspect-[3/4]`, `aspect-[5/4]`, `aspect-[4/3]`).

## Imagem de compartilhamento (OG)

`public/og.png` (1200×630) é referenciada no `index.html`. Substitua pelo arquivo oficial mantendo o nome.
