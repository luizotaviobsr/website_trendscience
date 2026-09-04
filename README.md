# Handoff: Trendscience — Site institucional

## Overview

Trendscience é um grupo de representação médica focado em medicina integrativa e conduta clínica. O site institucional apresenta a operação, o portfólio de categorias terapêuticas, os pilares que sustentam a entrega (curadoria, credenciamento, farmacêutico, rastreabilidade, portfólio, rede, suporte, representante), FAQ e CTAs para "Fale conosco".

O objetivo do site: comunicar seriedade operacional a médicos prescritores e mostrar que a Trendscience opera com prescrição, credenciamento de farmácias, conferência lote a lote e representantes credenciados — nunca venda direta ao paciente.

## About the Design Files

Os arquivos deste pacote são **referências de design construídas em HTML** — protótipos que mostram intenção visual e comportamento, **não** código de produção para copiar diretamente.

A tarefa do desenvolvedor é **recriar estes designs HTML no ambiente do codebase existente** (React/Next.js, Vue/Nuxt, Astro, SvelteKit, Webflow, etc.), usando os padrões e bibliotecas do projeto. Se não houver ainda um ambiente definido, escolha o framework mais apropriado (recomendação: **Next.js + Tailwind + Framer Motion / GSAP** para reproduzir as animações scroll-triggered).

## Fidelity

**High-fidelity (hifi).** Os mockups são pixel-perfect: cores finais, tipografia final, espaçamentos, interações e animações prontas. O desenvolvedor deve recriar a UI com fidelidade pixel usando as bibliotecas do codebase alvo.

Algumas seções usam animações scroll-triggered (GSAP + ScrollTrigger + Lenis). Se o codebase alvo não usa GSAP, substituir por Framer Motion / Motion One preservando timings e easings.

## Screens / Views

O site é uma **single page** com blocos verticais sequenciais + rodapé. Ordem dos blocos:

### 1. Header (fixo no topo)
- **Purpose:** navegação global sempre visível
- **Layout:** `position: fixed; top: 0`, grid 3 colunas (logo esquerda, menu central, CTA direita). Padding lateral 32px, padding vertical 14px.
- **Background:** transparente sobre hero, branco (`#FFFFFF`) quando `.is--dark` (aplicado via scroll trigger após sair do hero)
- **Componentes:**
  - **Logo:** SVG `assets/trendscience-logo.svg` (variação clara sobre hero) / `assets/trendscience-icon.svg`. Tamanho fixo — desktop 200px de largura, mobile menor via media query.
  - **Menu central:** links "Portfólio", "Como funciona", "Provas", "Sobre", "Notícias", "FAQ" — cada um branco sobre hero, preto (`#042A2B`) sobre header claro; font-size 0.8em desktop; hover reduz opacity para 0.65.
  - **CTA "Fale Conosco"** (canto direito): botão com backdrop-filter blur, borda 1px `#f1f1f10d`, background `#f1f1f126` sobre hero, `#042A2B` sólido sobre header claro. Padding 14px 24px, border-radius 5px, font-size 0.8em.

### 2. Hero
- **Purpose:** primeira impressão, headline principal, chamada ao Representante
- **Layout:** full-viewport `100vw × 100vh`, sticky ao topo. Padding 8em/32px/28px. Imagem de fundo cobrindo toda a área com overlay linear gradient `rgba(0,0,0,0.55) → rgba(0,0,0,0.15) 50% → rgba(0,0,0,0.35)`.
- **Background image:** `assets/hero-lente.jpg` ou `assets/hero-helice.jpg` (imagem científica/lente com tom escuro).
- **Componentes:**
  - **H1 "Apoiamos o médico. Acompanhamos o tratamento."** — cor branca, font-size 4em desktop / 6em mobile, line-height 1, font-weight 500, tracking `-0.02em`, largura 82ch.
  - **Parágrafo:** texto branco 1.2em explicando a proposta (55ch de largura).
  - **CTA principal:** botão branco sobre fundo escuro "Fale Conosco" com seta.
  - **Nota:** o botão "Como funciona" **foi removido** por decisão do cliente. Não incluir.

### 3. Categorias / Portfólio ("Organizado como o médico pensa")
- **Purpose:** apresentar as 9 áreas terapêuticas
- **Layout:** slider horizontal com scroll-snap. Título "Organizado como o médico pensa." (h2 3.5em, `#042A2B`), padding 52px 32px 24px.
- **Cards (9):** cada card `21.8em × 38em`, background branco, border-radius 8px, padding 10px. Cada um contém uma foto (`assets/cat-01-longevidade.jpg` ... `assets/cat-09-insumos.jpg`) em `18em` de altura + título abaixo.
- Categorias: Longevidade, Metabolismo, Performance, Hormonal, Cognição, Recuperação, Estética, Imunidade, Insumos.

### 4. Bloco "Operamos onde a conduta médica não admite improviso" (4 cards escuros)
- **Purpose:** os 4 pilares do que oferecemos ao cliente/médico
- **Layout:** background escuro `#042A2B`. Padding 112px 32px. Título grande centrado (h2, cor branca, 5em).
- **Grid:** 4 colunas iguais no desktop, gap 16px.
- **Cards:** cada card tem imagem full-bleed no topo + título + descrição curta abaixo, background transparente sobre a seção escura. Imagens em `assets/pilar-*.jpg` (representante, entrega, portfólio, rastreabilidade).

### 5. Bloco de imagens flutuantes / scroll-triggered ("Somos a ponte entre a indústria...")
- **Purpose:** contar a operação com sequência scroll-driven
- **Layout:** section com height ~200vh, `position: sticky` interno para revelar imagens uma por vez conforme o usuário rola.
- **Animação:** GSAP + ScrollTrigger controla o fade/reveal das imagens (`assets/origins-importado.jpg`, `assets/origins-nacional.jpg`, `assets/bancada.jpg`).
- **Texto central grande** em cada estágio (`.central_words`, cor branca, 3.4em).

### 6. Bloco "O que sustenta a nossa entrega" (3 cards brancos)
- **Purpose:** os 3 diferenciais operacionais da Trendscience (backstage: como opera)
- **Layout:** background branco `#FFFFFF`. Padding 112px 32px. Título esquerda (`h2 3.5em`), grid de 3 cards à direita ou abaixo.
- **Nota:** este bloco foi adicionado depois do bloco de textos flutuantes por pedido do cliente e usa o **mesmo padrão visual do bloco 2** (mas com fundo branco em vez de escuro, e 3 cards em vez de 4). Botão "Fale conosco" abaixo dos cards.

### 7. Bloco imagem full-width "A ciência de facilitar o trabalho de quem cuida." (CTA final antes do FAQ)
- **Purpose:** CTA emocional com imagem de representante
- **Layout:** section `100vh` (`.just_beginning`), imagem de fundo `assets/representante.jpg` cobrindo tudo, overlay escuro `rgba(0,0,0,0.44)`.
- **Conteúdo centralizado vertical:**
  - **H2** "A ciência de facilitar / o trabalho de quem cuida." — branco, **50px** fixo, font-weight 400, line-height 1, com quebra `<br>` após "facilitar".
  - **Botão "Fale Conosco"** branco com seta preta abaixo.

### 8. FAQ
- **Purpose:** responder objeções
- **Layout:** 2 colunas. Esquerda (sticky): título "Respostas para decidir com clareza." (h2 3.5em) + card "Precisa de ajuda? Fale com um Representante" + botão "Fale conosco". Direita: lista de accordions.
- **Accordion:** cada item tem borda superior dashed `#1b245133`, título 1.15em, ícone `+` que rotaciona 45° ao abrir. Conteúdo com `<p>` e `<ul>` para listas.
- **Perguntas atuais:**
  1. Como funciona, do pedido à entrega?
  2. Como um produto chega ao médico?
  3. Quem entra na rede de fornecedores?
  4. O que acontece se um lote não passa?
  5. Vocês vendem direto ao paciente?

### 9. Footer
- **Purpose:** navegação secundária, contato, redes sociais, big wordmark
- **Layout / padding:** `.footer { background:#FFFFFF; color:#042A2B; padding: 80px 32px 40px; }`. `.wrapper_footer` sem padding lateral (para não duplicar os 32px do footer).
- **Estrutura vertical (top → bottom):**
  1. **Menu (4 colunas):** `.menu_footer` grid `repeat(4, 1fr)` gap 32px.
     - Col 1 "Descubra": Portfólio, Como funciona, Provas, Sobre, Notícias, FAQ
     - Col 2 "Legal": Política de Privacidade, Política de Cookies, Terms & Conditions
     - Col 3 vazia (ou reservada)
     - Col 4 "Contact": telefone `+55 (11) 0000-0000`, email (Cloudflare email-decode), + **Socials** logo abaixo (Instagram, LinkedIn, YouTube, Facebook) em ícones PNG 26×26 filtrados para 100% preto.
     - Títulos das colunas em Inter Tight 15px, semi-transparent `#042A2B` a 0.55.
     - Links Inter Tight 18px, `#042A2B` sólido, hover diminui opacidade.
  2. **Big wordmark:** SVG `assets/trendscience-wordmark.svg`, largura 100% do container, `fill="#0A4547"` (Petrol 700). Margin-bottom 56px sobre o menu, 40px acima do divider. Ordem CSS: `order: 2` no grid (fica **depois** do menu na renderização).
  3. **Divider:** linha 1px `rgba(4,42,43,0.12)`, largura 100%, margem 56px 0 24px.
  4. **Last line:** `.last_line` flex space-between:
     - Esquerda: "2026 © Trendscience · Grupo de representação médica" (Inter Tight 14px, `rgba(4,42,43,0.55)`)
     - Direita: "By: Trendscience Team" (mesmo estilo)

## Interactions & Behavior

- **Smooth scroll:** Lenis inicializado no boot (`assets/vendor/lenis.min.js`). ScrollTrigger integrado.
- **Header dark on scroll:** header troca para fundo branco (`.is--dark`) após passar o hero via `ScrollTrigger`.
- **Slider de categorias:** drag horizontal com scroll-snap (não usa Splide neste bloco — usa scroll nativo).
- **Slider de cards (outros blocos, se ativos):** Splide + Draggable GSAP.
- **Bloco scroll-triggered:** section com `.track { height: 400vh }` + `.background_fix { position: sticky }` + timeline GSAP que fade in/out `.central_words._1/_2/_3` conforme progress.
- **Text reveal:** `SplitText` para dividir headlines em char/word e animar entrada (opacity 0 → 1, y 20px → 0, stagger 0.03, ease `power3.out`).
- **Accordion:** click no `.accordion-item` toggle a classe `.is--open` — anima `.item_content-wrapper` height (auto via GSAP) e rotaciona `.icon_wrapper img` 45deg.
- **Botões:** transition `all .45s`, hover muda border-color de `#242424` para `#6d6d6d`.
- **Links:** transition `.4s`, hover opacity 0.65.
- **Botão "Fale Conosco" (variante flow):** existe um FlowButton (Radix-style, ver seção Componentes) com micro-interação de círculo preto que expande do centro no hover.

## State Management

Site institucional estático — sem state complexo. Estado local por componente:

- **FAQ:** cada accordion controla seu próprio `isOpen: boolean`.
- **Header:** `isDark: boolean` derivado de scroll position.
- **Slider categorias:** posição de scroll horizontal (nativa).
- **Bloco scroll-triggered:** `progress: 0-1` derivado do ScrollTrigger (não precisa React state).
- Nenhum data fetching — todo o conteúdo é estático em copy PT-BR.

## Design Tokens

### Colors

| Token | Hex | Uso |
|---|---|---|
| Petrol 900 (`--black`) | `#042A2B` | texto principal, backgrounds escuros, headings sobre branco |
| Petrol 700 | `#0A4547` | big wordmark do footer, acentos |
| Petrol Signal (`--teal-signal`) | `#00D6B4` | (definido no root; uso restrito) |
| Teal (`--teal`) | `#007A7D` | (definido no root; uso restrito) |
| Gray de fundo (`--gray`) | `#D6F2F0` | background do body (fora dos blocos escuros) |
| White (`--white`) | `#FFFFFF` | cards, footer, headings sobre escuro |
| Black text alpha | `rgba(4,42,43,0.55)` | copyright, títulos de coluna do footer |
| Black divider alpha | `rgba(4,42,43,0.12)` | dividers, borders |

### Typography

- **Family:** `Inter Tight, Arial, sans-serif` (única família em uso). Weight 400/500.
- **Body:** 1vw base (fluído — cuidado ao portar; fixar em 16px se preferir tipografia fixa).
- **H1 hero:** 4em / 500 / line-height 1 / tracking `-0.02em`
- **H2 grande (like_h1):** 5.4em / 500 / line-height 1 (branco, sobre escuro)
- **H2 padrão:** 3.5em / 500 / line-height 1
- **H2 CTA final "A ciência...":** **50px fixo** / 400 / line-height 1
- **Item title (accordion, cards):** 1.15em / 500 / line-height 1.2
- **Body paragraph:** 1.05em / 500 / line-height 1.5
- **Footer link:** 18px / 500 (Inter Tight)
- **Footer title:** 15px / 500 / opacity 0.55
- **Footer copyright:** 14px / 400 / `rgba(4,42,43,0.55)`

### Spacing scale

- Global padding lateral: **32px** desktop, 20px tablet, 16px mobile
- Wrapper de seção `.wrapper_general`: `padding: 112px 32px` (72px mobile)
- Wrapper de slider `.wrapper_slider`: `padding: 52px 32px 24px`
- Footer: `padding: 80px 32px 40px`; divider margin `56px 0 24px`
- Grid gap padrão: 16px (cards), 32px (menu footer), 12-16px (interno)

### Border radius

- Cards principais (`.splide__slide`, `.module_box`): **8px**
- Cards secundários (image thumbnails, `.box_image`, `.slide_image`): **6px**
- Botões (`.button_general`): **4px**
- Tags e pill elements: **4-5px**
- Ícones circulares (social, plus): **100%**

### Shadows

Muito discretos. Cards não têm sombra visível (design flat sobre `#D6F2F0`). Se necessário: `box-shadow: 0 4px 12px rgba(4,42,43,0.06)`.

### Motion

- Duration padrão: `0.4s` (links/hover) / `0.45s` (botões, cards)
- Duration entrada hero/text-reveal: `0.6-0.9s`
- Easing padrão: `cubic-bezier(.165,.84,.44,1)` (GSAP `power3.out`) para entradas; `power2.inOut` para transições
- Scroll: Lenis default (duration 1.2s, easing exponencial)

## Assets

Todos em `assets/`:

### Imagens JPG (conteúdo)
- `hero-lente.jpg` / `hero-helice.jpg` — hero backgrounds
- `cat-01-longevidade.jpg` ... `cat-09-insumos.jpg` — 9 cards de categoria
- `pilar-representante.jpg`, `pilar-entrega.jpg`, `pilar-portfolio.jpg`, `pilar-rastreabilidade.jpg`, `pilar-farmaceutico.jpg`, `pilar-rede.jpg`, `pilar-suporte.jpg` — cards de pilares
- `origins-importado.jpg`, `origins-nacional.jpg`, `bancada.jpg` — bloco scroll-triggered
- `representante.jpg` — CTA final "A ciência de facilitar..."
- `scroll-bg.jpg` / `scroll-bg.avif` — background alternativo scroll

### SVGs (logos e ícones)
- `trendscience-logo.svg` — logo completo com ícone (header)
- `trendscience-icon.svg` — versão só ícone
- `trendscience-wordmark.svg` — wordmark grande do footer, `fill="#0A4547"`
- `icons/arrow.svg` — seta dos botões
- `icons/plus.svg` — ícone do accordion FAQ

### Ícones sociais (PNG 26×26 aplicadas com CSS filter para preto)
- `social/instagram.png`, `social/linkedin.png`, `social/youtube.png`, `social/facebook.png`

### Fontes
- `fonts/` — variantes Inter Tight (usadas via `@font-face` no `webflow.css`)

### Vendor JS
- `vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`, `vendor/SplitText.min.js`, `vendor/Draggable.min.js`, `vendor/ScrollToPlugin.min.js` — animações
- `vendor/lenis.min.js` — smooth scroll
- `vendor/jquery.min.js`, `vendor/webflow-bundle.js` — Webflow runtime (pode ser removido se recriando do zero fora do Webflow)

### CSS
- `webflow.css` — reset + estilos Webflow gerados (~160KB). No handoff serve de referência dos tokens; **não copiar cru** — reimplementar em Tailwind / CSS-in-JS do target.
- `footer-redesign.css` — overrides específicos do footer (referência da versão final).

## Components (chave)

### FlowButton (fornecido pelo cliente)

Botão pill com animação de círculo preto que expande do centro no hover, seta que desliza. Referência React + Tailwind:

```tsx
'use client';
import { ArrowRight } from 'lucide-react';

export function FlowButton({ text = "Fale Conosco" }: { text?: string }) {
  return (
    <button className="group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]">
      <ArrowRight className="absolute w-4 h-4 left-[-25%] stroke-[#111111] fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">{text}</span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
      <ArrowRight className="absolute w-4 h-4 right-4 stroke-[#111111] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </button>
  );
}
```

O cliente pediu para **padronizar todos os botões CTA do site com o visual do FlowButton**. Aplicar em: hero, cards de pilar, FAQ, bloco "A ciência de facilitar..." e footer.

### Header CTA (variante compacta do FlowButton)
Mesma animação, tamanho menor: `px-6 py-2.5`, text `0.8em`, sem borda visível (backdrop blur + `#f1f1f126` sobre hero).

### Accordion FAQ
Item com borda dashed top, título grande, `+` que rotaciona. Ver bloco 8.

## Responsive behavior

Breakpoints (Webflow default):
- **991px** — tablet: reduz padding lateral para 20px, headings reduzem, grid do bloco pilares vai para 2 colunas
- **767px** — mobile: padding 16px, hero reorganiza (right_side vai abaixo), sliders convertem para full-width, cards viram lista vertical, menu do footer vira 2 colunas
- **479px** — mobile pequeno: cards ficam 100% largura, big wordmark do footer reduz margin

Cuidado: o wordmark do footer sempre 100% da largura do container do footer (largura completa menos 32px de padding lateral).

## Fixes recentes aplicados (contexto do handoff)

1. **Cor do big wordmark do footer:** definido `fill="#0A4547"` diretamente no SVG (Petrol 700). O CSS `color:` no `<img>` não propaga para SVG externo.
2. **Alinhamento do footer (2 rodadas):**
   - Removido o `padding-left/right: 32px` do `.wrapper_footer` que duplicava os 32px já do `.footer`.
   - Adicionado override `.footer .flexbox_footer, .footer .last_line { margin-left: 0 !important; margin-right: 0 !important }` para neutralizar as margens de 32px que vinham do `webflow.css` original.
   - Resultado: todos os elementos do footer (menu, big wordmark, socials, divider, last_line) alinham com `.wrapper_general` em `left: 32px` / `right: viewport − 32px`. **Ao portar para novo codebase:** basta aplicar `padding: 80px 32px 40px` no `<footer>` e não adicionar margens laterais nos filhos.
3. **Bloco "A ciência de facilitar..."** — h2 fixo em `50px` (font-weight 400), height `100vh` travado (`.just_beginning { height: 100vh !important }`).
4. **Header logo:** largura fixa via CSS var `--logo-w` (tweak): desktop 200px, mobile 120px.
5. **Botão "Como funciona"** removido do hero — não incluir.
6. **Copy final dos CTAs:** todos "Fale Conosco" (não "Como funciona", não "Fale conosco" minúsculo).
7. **Ícones do FAQ (`+`):** os 5 `<img src="assets/icons/plus.svg">` dentro de `.plus_icon` foram substituídos por **SVG inline** (paths idênticos ao arquivo original). Motivo: o preview embedded falhava ao carregar o SVG externo com `naturalWidth: 0`, deixando os 5 quadrados cinzas do FAQ vazios. Solução robusta: inline SVG bypassa qualquer caching/parsing quirk. **Ao portar:** use um componente `<PlusIcon />` do lucide-react ou renderize o SVG inline direto no JSX.
8. **Renomeação para `index.html`:** o arquivo principal agora se chama `index.html` (era `Trendscience.html`). Todas as ~150+ referências internas `href="Trendscience.html"` foram substituídas por `href="#"` — o site é single-page e esses hrefs eram placeholders. **Ao portar:** substituir por rotas reais (`href="/portfolio"`, `href="/contato"` etc.) quando as páginas existirem, ou manter como âncoras internas (`href="#more"`, `#faq`, etc.).
9. **Remover script Cloudflare:** o `<script src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">` só funciona sob proxy Cloudflare completo. Em Worker isolado ou hosting alternativo, dá 404 (não crítico, só decodifica o email obfuscado do footer). Sugestão: substituir o `[email protected]` obfuscado do footer por texto simples ou um formulário de contato real.

## Files

Arquivos incluídos neste handoff:

- `index.html` — HTML principal (referência do site inteiro). Já com todas as fixes: ícones FAQ inline, links single-page `#`, footer alinhado, cor final do wordmark.
- `assets/trendscience-wordmark.svg` — big wordmark do footer (com `fill="#0A4547"`)
- `assets/trendscience-logo.svg` — logo do header
- `assets/trendscience-icon.svg` — apenas ícone
- `assets/footer-redesign.css` — overrides do footer
- `assets/icons/arrow.svg` — seta dos botões
- `assets/icons/plus.svg` — ícone `+` do accordion FAQ (referência; no HTML já está inline)

Imagens JPG (`cat-*`, `pilar-*`, `hero-*`, `origins-*`, `bancada.jpg`, `representante.jpg`) e ícones sociais **não estão empacotados** neste handoff (arquivos grandes). Solicitar do cliente ou reexportar do Figma. Lista completa acima em **Assets**.

Fontes (`assets/fonts/`) e vendor JS (`assets/vendor/`) — se o codebase alvo já tiver alternativas (Tailwind + Framer Motion, por exemplo), não são necessários. Se recriar em Webflow, manter.

## Recommended stack (para Genspark Code / desenvolvedor externo)

- **Framework:** Next.js 14 App Router
- **Styling:** Tailwind CSS + CSS variables para tokens
- **Font:** `next/font/google` → Inter Tight (weights 400, 500)
- **Animations:** Framer Motion (transições básicas) + GSAP + ScrollTrigger (blocos scroll-triggered complexos)
- **Smooth scroll:** `@studio-freight/lenis` (ou Framer Motion `useScroll`)
- **Icons:** `lucide-react` para setas e ícones sistema
- **Imagens:** `next/image` com placeholder blur
- **Deploy:** Vercel (edge, otimização de imagem nativa)
