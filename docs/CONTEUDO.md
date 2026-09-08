# Conteúdo e fotografia

## Copy

Toda a copy da página vive em `src/data/content.ts`, seção por seção, e é a única fonte de verdade — os componentes não têm texto hardcoded. O texto reproduz o briefing ([briefing-original.md](briefing-original.md)) com o nome atualizado para **AUVP Prodígios**.

Para alterar um texto, edite o objeto correspondente (`hero`, `process`, `trails`, `notRequired`, `culture`, `benefits`, `learn`, `notFor`, `cta`, `nav`). Alguns componentes destacam palavras específicas (por exemplo `garra`, `aprender,`, `alta`, `performance.` na `Intro`; `resultados,`, `transparência`, `meritocracia.` na `Culture`) via um `Set` no próprio componente — ajuste-o se a frase mudar.

## Sem eyebrows

A página não usa *eyebrows* (a etiqueta pequena em caixa alta acima dos títulos). Cada dobra abre direto no título display; frases do briefing que eram etiquetas viraram títulos de verdade (`intro.title`, `cta.formTitle`). A classe `.label` continua existindo para etiquetas funcionais (carimbo "Opcional", "Trilha 1", rótulos de formulário).

## Fotografia

`src/data/photos.ts` mapeia cada foto usada na página. São **fotos oficiais da AUVP**, vindas do repositório [ProdutosAUVP/etica](https://github.com/ProdutosAUVP/etica) (código de ética) e convertidas para WebP em `src/assets/photos/` (largura máxima 900–1400px, qualidade 78, EXIF removido; ~650 KB no total).

| Arquivo | Origem em `etica` | Onde aparece |
|---|---|---|
| `hero-arco.webp` | `imagem que acompanha item 5.1.jpg` | Hero, foto-âncora em arco |
| `hero-bandeira.webp` | `item 5 - imagem diversidade.webp` (recorte quadrado) | Hero, foto menor sobreposta |
| `cultura-tatuagens.webp` | `item 3 - imagem diversidade.jpg` | Cultura |
| `trilha-tecnologia.webp` | `imagem que acompanha item 4.jpg` | Trilha 1 — Tecnologia |
| `trilha-growth.webp` | `item 4 - imagem diversidade.webp` | Trilha 2 — Growth & Marketing |
| `trilha-negocios.webp` | `item 2 - imagem ultrawide crescimento.webp` | Trilha 3 — Negócios & Finanças |
| `inscricao-trofeu.webp` | `item 1 - imagem vertical quem somos.webp` | Inscrição |
| `evento-plateia.webp` | `imagem que acompanha itens 10, 11 e 12..jpg` | reserva (não usada) |

Para regerar a partir dos originais, o script usado está descrito abaixo (Node + `sharp`, fora do projeto):

```js
sharp(origem).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(destino)
```

Cada entrada tem:

| Campo | Uso |
|---|---|
| `src` | import de `src/assets/photos/` |
| `alt` | texto alternativo — obrigatório |
| `tone` | `forest` \| `mint` \| `lime` — escolhe uma das três variações de gradiente **cinza** de fallback (nomes históricos) |
| `position` | `object-position` do recorte (ex.: `center 30%` para preservar rostos) |

O componente `<Photo>` aplica: raio de 12px (ou o arco `.clip-arch`), véu neutro (`overlay`, 0–1, em `--ink`), degradê inferior e fade-in no `onLoad`. Se o `src` falhar, um gradiente de cinza (`tone`) fica no lugar e a composição não quebra.

### Trocando uma foto

1. Gere o WebP em `src/assets/photos/` (largura máxima ~1400px; retrato para Hero, Cultura e Inscrição, paisagem para as Trilhas).
2. Importe e aponte o `src` em `photos.ts`, ajustando `alt` e `position`.
3. Os componentes recortam por `object-fit: cover` nas proporções `aspect-[4/5]` (Hero, Cultura, Inscrição), `aspect-square` (foto menor do Hero) e `aspect-[4/3]` (Trilhas).

Os cinco SVGs de valores que também vivem em `etica` (Manda a Real, Divide o Rum, Sangue nos Olhos, Impiedoso, Imediato) não são usados aqui: os pilares da dobra Cultura seguem o texto do briefing.

## Imagem de compartilhamento (OG)

`public/og.png` (1200×630) é referenciada no `index.html`. Substitua pelo arquivo oficial mantendo o nome.
