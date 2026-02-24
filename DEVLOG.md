# 🐉 Dev Diary — Chimaera Brasilis


---

## Entry #4 — The "Exit Animation" Hell (February 23–24, 2026)

### Fighting for Fluidity (and User Demands)

Today was one of those days where the simplest things turned into a nightmare. Most of the time was spent fighting CSS transitions and JS timers to get the "back" animation right. It was exhausting. I worked on this completely fed up, but at least it's done. 

The interesting part? All these refinements—from the specific exit sequence to the layout tweaks—were part of a deliberate **UX Research** effort. I moved beyond casual feedback and formalized the process:
- **Questions & Forms**: Created a list of formalized questions and a feedback form to gather structured data.
- **User Testing**: Ran testing sessions with family members (cousins) to observe real reactions to the navigation flow. 
They were right about the friction, but implementing the fix was a special kind of hell.

- **The Exit Struggle**: Implementation of a two-phase sequential animation for the article exit. Phase 1 animates the grid resizing (60/40 to 70/30) while hiding the circle to avoid flashes. Phase 2 handles the circle fade-in only after the layout is stable.
- **`anim-lock`**: Had to implement a global interaction lock because multiple clicks during animations were breaking everything. Critical for stability, but a pain to debug.
- **Routing & SEO**: Earlier today I also managed to implement the History API for shareable links (`/?artigo=X`) and finally set up proper SEO tags.

---

### Entrada #4 — O Inferno da "Animação de Saída" (23–24 de Fevereiro, 2026) 🇧🇷

#### Lutando pela Fluidez (e pelas Demandas dos Usuários)

Hoje foi um daqueles dias em que as coisas simples viraram um pesadelo. Passei a maior parte do tempo brigando com transições CSS e timers de JS pra fazer a animação de "voltar" funcionar direito. Foi exaustivo. Trabalhei nisso completamente de saco cheio, mas pelo menos tá entregue.

O detalhe? Todo esse refinamento—desde a sequência de saída até os ajustes de layout—foi parte de um esforço de **Pesquisa de UX**. Saí do feedback informal e formalizei a parada:
- **Formulários e Perguntas**: Criei uma lista de perguntas formalizadas e um formulário para colher dados estruturados.
- **Testes de Usuário**: Fiz sessões de teste com primos e primas para ver na prática como os usuários reagiam ao fluxo de navegação.
Eles estavam certos sobre onde a experiência estava travada, mas implementar a solução foi um inferno particular.

- **A Luta na Saída**: Implementação de uma animação sequencial em duas fases para a saída do artigo. A Fase 1 anima o redimensionamento do grid enquanto esconde o círculo para evitar flashes. A Fase 2 faz o fade-in do círculo só depois que o layout está estável.
- **`anim-lock`**: Tive que implementar um bloqueio global de interação porque múltiplos cliques durante as animações estavam quebrando tudo. Crítico para a estabilidade, mas um porre de debugar.
- **Roteamento & SEO**: Mais cedo também implementei a History API para links compartilháveis (`/?artigo=X`) e finalmente configurei as tags de SEO corretamente.

---

## Entry #3 — Mobile Header & Safari Polish (February 19–20, 2026)

### Optimization for iPhone 11 (Safari)

Focused on resolving critical UI regressions on mobile Safari. The challenge was maintaining the "editorial" feel while providing functional navigation that strictly adheres to the viewport constraints.

- **Header Behavior**: Reimplemented the mobile header to use a dual-layer strategy. The `mobile-editorial-layer` now collapses gracefully on scroll, while the `mobile-functional-layer` (tabs) sticks to the top with a permanent background.
- **Safari `position: sticky` Fixes**: Addressed the common issue where sticky elements jitter or fail to stick in Safari by adjusting the `z-index` stacking context and ensuring the parent container had no `overflow: hidden` conflicts.
- **Fluid Layout**: Refined the transition between the desktop and mobile headers to avoid flashes of unstyled content (FOUC) during load.

---

### Entrada #3 — Header Mobile & Polimento Safari (19–20 de Fevereiro, 2026) 🇧🇷

#### Otimização para iPhone 11 (Safari)

Foco em resolver regressões críticas de UI no Safari mobile. O desafio era manter a sensação "editorial" enquanto fornecia uma navegação funcional que respeitasse rigorosamente os limites da viewport.

- **Comportamento do Header**: Reimplementado o header mobile para usar uma estratégia de camada dupla. A `mobile-editorial-layer` agora colapsa suavemente no scroll, enquanto a `mobile-functional-layer` (abas) fixa no topo com fundo permanente.
- **Fix do `position: sticky` no Safari**: Corrigido o problema comum onde elementos sticky tremem ou falham no Safari, ajustando o contexto de `z-index` e garantindo que os containers pais não tivessem conflitos de `overflow`.

---

## Entry #2 — Responsiveness & Fluid Motion (February 14–15, 2026)

### Adapting for 4K and XR

The "Sem Conforto" aesthetic shouldn't translate to a broken UI. I expanded the testing range to include extreme viewports.

- **4K Support**: Implemented max-width locks and centering for article content to prevent overly long lines (bad readability).
- **Responsiveness**: Fixed horizontal scrolling issues on iPhone XR. Adjusted the `article-card` padding and the circle graphic positioning to ensure they never overflow the viewport.
- **Circle Squeeze Effect**: Refined the CSS animation for the hero circle. Introduced a high-viscosity `cubic-bezier(0.19, 1, 0.22, 1)` and a slight over-expansion (`scale(1.02)`) followed by a "settling" pulse. This gives the graphic a physical weight, like it's squeezing into place.

---

### Entrada #2 — Responsividade & Movimento Fluido (14–15 de Fevereiro, 2026) 🇧🇷

#### Adaptando para 4K e XR

A estética "Sem Conforto" não deve se traduzir em uma UI quebrada. Expandimos os testes para incluir viewports extremos.

- **Suporte 4K**: Implementado locks de max-width para o conteúdo dos artigos para evitar linhas excessivamente longas.
- **Responsividade**: Corrigido o scroll horizontal no iPhone XR. Ajustado padding dos `article-card` e o posicionamento do círculo gráfico.
- **Efeito "Squeeze" no Círculo**: Refinada a animação CSS do círculo hero. Introduzido um `cubic-bezier(0.19, 1, 0.22, 1)` de alta viscosidade e uma sobre-expansão leve seguida por um pulso de "assentamento". Isso dá ao gráfico um peso físico.

---

## Entry #1 — Kickoff & Content Spark (February 12–14, 2026)

### Context

*Chimaera Brasilis* is a critical reading project of contemporary Brazilian culture. The aesthetic is inspired by high-contrast editorial design, brutalist elements, and a focus on friction over comfort.

- **Base Scaffold**: Vanilla HTML/CSS/JS with a focus on semantic structure.
- **Dynamic Content**: Implemented `script.js` to handle article injection and view switching (Articles / Browse / About) without page reloads.
- **Visual Foundation**: Sourced high-impact images from Unsplash to set the tone for the criticism.

---

### 💬 Real talk...

Guys, to be honest, I completely forgot to create a DevLog in the beginning. I basically did the whole initial setup in one sitting, just flowing with the ideas. It was meant to be a quick thing, but after seeing the amount of feedback and the evolution of the versions (especially the mobile Polish), I decided to keep pushing the project forward. "Sem Conforto" became a mantra, but the development process is starting to feel very comfortable now.

---

### 💬 Na real...

Galera, na real eu acabei esquecendo de criar um DevLog no começo. Fiz praticamente tudo em uma sentada só, no puro fluxo de ideia. Era pra ser algo rápido, mas vendo a quantidade de feedbacks e a evolução das versões (especialmente o polimento mobile), resolvi continuar tocando o projeto. O "Sem Conforto" virou um mantra, mas o processo de desenvolvimento tá ficando bem confortável agora.

---

**Stack:** `HTML` · `CSS` · `JavaScript` · `Vanilla`

`#gamedev` `#webdev` `#design` `#brutalism` `#chimaerabrasilis` `#devdiary`
