document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const logoContainer = document.querySelector('.logo-container');
    const articleFullContainer = document.getElementById('article-full-content');
    const circle = document.querySelector('.circle');
    const circleImage = document.querySelector('.circle-image');
    const articlesContainer = document.getElementById('articles-container');
    const browseContainer = document.getElementById('browse-container');
    const activeTagName = document.getElementById('active-tag-name');
    const mobileHeader = document.querySelector('.mobile-header');

    let lockedCover = null;
    let transitionTimer = null;
    let expansionTimer = null;
    let pulseOffTimer = null;

    // Security: Basic HTML escaper for XSS prevention
    function escapeHTML(str) {
        if (!str) return "";
        return str.replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    }

    // Canonical 10 Tags
    const CANONICAL_TAGS = [
        'Anime', 'Mangá', 'Arte & Design', 'Música', 'Literatura',
        'Séries', 'Cinema', 'Animação', 'Quadrinhos', 'Jogos'
    ];

    // Central Data Store
    const contentData = [
        {
            id: "1",
            type: "article",
            date: "15 FEV 2026",
            author: "Rafael Moura",
            authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
            authorBio: "Rafael Moura escreve sobre narrativas contemporâneas, imagem e cultura pop. Colabora com projetos editoriais independentes e pesquisa formas seriadas no cinema e no audiovisual.",
            title: "O Cinema Invisível",
            description: "Entre o que se vê e o que insiste fora de quadro, o cinema contemporâneo aprende a desaparecer para continuar operando.",
            tags: ["Cinema", "Arte & Design"],
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
            body: `
                <p>Há um tipo de cinema que não se impõe pela imagem, mas pelo deslocamento. Ele não grita, não organiza o olhar, não promete revelação. Opera no intervalo — no que fica de fora, no que escapa ao enquadramento, no que insiste depois da sessão. É um cinema que se torna visível justamente quando parece desaparecer.</p>
                <p>Chamá-lo de “invisível” não é elogio à sutileza nem defesa da discrição como valor estético. Trata-se de outra coisa: uma recusa em se apresentar como espetáculo autossuficiente. Nesse cinema, a imagem não encerra o sentido; ela o adianta e o retarda ao mesmo tempo.</p>
                <blockquote>"O invisível não é o que falta à imagem, mas o que ela se recusa a entregar."</blockquote>
                <p>A experiência começa, quase sempre, com uma frustração. Nada acontece como esperado. O conflito não se resolve, o gesto não se completa, o plano permanece tempo demais. A narrativa se recusa a organizar o mundo para o espectador. E é nesse ponto que a leitura confortável costuma falhar.</p>
                <p>Em muitos filmes contemporâneos — especialmente aqueles que orbitam festivais, circuitos alternativos ou margens industriais — a imagem funciona menos como prova e mais como indício. O que importa não é o que vemos, mas o que somos obrigados a sustentar sem garantia. O fora de campo deixa de ser recurso técnico e passa a ser posição ética.</p>
                <p>Esse cinema não compete com a avalanche imagética da cultura pop; ele a desloca. Enquanto franquias e narrativas seriadas buscam presença constante, reconhecimento imediato e repetição de signos, o cinema invisível trabalha com atraso, rarefação e silêncio. Ele não quer capturar atenção — quer desorganizar hábitos.</p>
                <blockquote>"O cinema invisível não pede adesão. Ele exige atenção."</blockquote>
                <p>Isso implica uma mudança no modo de ler filmes. Não basta perguntar “do que se trata” ou “o que o filme quer dizer”. A pergunta mais incômoda é outra: o que esse filme faz com o meu olhar? Como ele reorganiza tempo, expectativa e presença? O que permanece depois que a imagem some?</p>
                <p>Nesse sentido, o invisível não é ausência, mas persistência. Algo que continua operando fora da tela, na memória, no incômodo, na dificuldade de nomear. Um cinema que não se fecha na sessão, nem se resolve no discurso.</p>
                <p>Talvez seja por isso que ele incomode tanto. Em um regime de imagens que exige visibilidade constante, desaparecer pode ser o gesto mais radical. E ler esse cinema — sem conforto, sem garantias — é aceitar que nem toda imagem existe para ser consumida. Algumas existem para resistir.</p>
            `
        },
        {
            id: "2",
            type: "article",
            date: "22 FEV 2026",
            author: "Luana Ribeiro",
            authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
            authorBio: "Luana Ribeiro escreve sobre narrativas seriadas, cultura pop e política da forma. Pesquisa a relação entre repetição, afetos e consumo cultural no audiovisual contemporâneo.",
            title: "A Série Não Quer Terminar",
            description: "Quando uma série se recusa a acabar, o problema não é narrativo — é temporal, afetivo e político.",
            tags: ["Séries"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
            body: `
                <p>Toda série promete um fim, mesmo quando constrói sua força na permanência. Essa promessa — muitas vezes vaga, distante ou adiada — sustenta a relação entre obra e espectador. Assistimos porque algo vai se resolver. Mas e quando a série claramente não quer terminar?</p>
                <p>Não se trata apenas de extensões artificiais, temporadas extras ou decisões de mercado evidentes. Há séries que operam desde o início a partir da recusa do fechamento. O conflito não avança em linha reta, os personagens giram em torno das mesmas faltas, e a narrativa aprende a sobreviver da própria repetição.</p>
                <blockquote>"A forma seriada não é construída para concluir; é construída para retornar."</blockquote>
                <p>Cada episódio reorganiza o que já foi visto. Cada temporada reinscreve o mesmo conjunto de temas, afetos e impasses. O sentido não avança — ele se acumula. Assistir a uma série longa é aceitar que o tempo não trabalha a favor da resolução, mas da insistência.</p>
                <p>O problema não é que a série se alonga demais. É que nós esperamos dela uma saída. Esse tipo de narrativa produz uma relação específica com o espectador. Não se trata mais de expectativa, mas de habitação. A série se torna um espaço recorrente, quase doméstico, onde conflitos permanecem ativos, mas nunca decisivos.</p>
                <blockquote>"A série não quer terminar porque o fim encerraria o que ela produz de mais eficaz: a permanência."</blockquote>
                <p>Quando aceitamos a repetição como anestesia, a série se transforma em ruído de fundo. Mas quando a encaramos como forma, a repetição se torna reveladora. O que se repete? O que nunca muda? Quais conflitos são mantidos vivos porque não podem ser resolvidos?</p>
                <p>Séries, animes e narrativas seriadas contemporâneas lidam diretamente com o gerenciamento do afeto. Elas ensinam a gostar sem exigir ruptura, a permanecer sem exigir transformação. O tempo do espectador é capturado não pela intensidade, mas pela continuidade.</p>
                <p>Ler criticamente essas obras exige abandonar a ideia de que toda história precisa terminar bem — ou terminar de fato. Exige reconhecer que algumas narrativas existem para administrar impasses, não para superá-los. E talvez a pergunta mais honesta não seja “quando isso acaba?”, mas outra, mais desconfortável: o que nos mantém aqui?</p>
            `
        },
        {
            id: "3",
            type: "article",
            date: "01 MAR 2026",
            author: "Camila Nogueira",
            authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
            authorBio: "Camila Nogueira escreve sobre anime, cultura visual e circulação global de narrativas. Pesquisa as tensões entre forma, mercado e recepção no consumo de animação japonesa no Brasil.",
            title: "O Anime Não Nos Reconhece",
            description: "A relação do Brasil com o anime não é de espelhamento, mas de deslocamento — e é nesse desajuste que algo se produz.",
            tags: ["Anime"],
            image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=800",
            body: `
                <p>O anime nunca nos reconheceu. E talvez seja exatamente por isso que ele se tornou tão central na experiênca cultural de uma geração no Brasil.</p>
                <p>Durante décadas, assistimos a essas narrativas a partir de um lugar deslocado: nem centro de produção, nem público imaginado. Os códigos eram outros, os cenários eram outros, os conflitos eram atravessados por referências que não nos pertenciam diretamente. Ainda assim — ou por isso mesmo — o anime permaneceu.</p>
                <blockquote>"O anime não nos reflete. Ele nos atravessa."</blockquote>
                <p>Costuma-se explicar essa relação a partir da identificação. Diz-se que “nos vemos” nos personagens, nos dilemas, na trajetórias. Mas essa leitura suaviza demais a experiência. O vínculo do público brasileiro com o anime não se constrói pelo reconhecimento imediato, e sim pela tradução constante.</p>
                <p>Assistir anime no Brasil sempre foi um exercício de adaptação: horários improvisados na TV aberta, dublagens precárias, episódios fora de ordem, lacunas narrativas. A obra chegava fragmentada, incompleta, deslocada de seu contexto original. E ainda assim fazia sentido — um sentido outro, construído na recepção.</p>
                <blockquote>"Ler anime a partir da brasilidade não é procurar espelhos. É observar deslocamentos."</blockquote>
                <p>Há algo de profundamente brasileiro nessa relação com o estrangeiro serializado. O anime chega como produto global, mas é consumido localmente, atravessado por condições materiais, afetivas e históricas específicas. O resultado não é cópia nem assimilação plena — é desvio.</p>
                <p>Essa dimensão política emerge no modo de circulação, no acesso desigual, na apropriação improvisada, na leitura situada. O anime não precisou falar de Brasil para se tornar brasileiro na experiênca de quem o consome aqui. Sua força esteve justamente em não nos oferecer reconhecimento imediato, mas um espaço de imaginação estrangeira a ser habitado sob condições locais.</p>
            `
        },
        {
            id: "4",
            type: "article",
            date: "01 FEV 2026",
            author: "Mateus",
            authorImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150",
            authorBio: "Fundador da Quimera Brasilis. Interessado nas fissuras da cultura pop, das artes visuais e da tipografia urbana.",
            title: "A Cidade Não Pede Licença",
            description: "A arte de rua não nasce para ser vista em silêncio. Ela interrompe o trajeto e força o olhar a desviar.",
            tags: ["Arte & Design"],
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
            body: `
                <p>A arte de rua não nasce para ser vista em silêncio. Ela aparece no caminho, interrompe o trajeto, força o olhar a desacelerar ou a desviar. Não pede autorização porque depende justamente da fricção com o espaço que ocupa. É menos um objeto e mais um acontecimento.</p>
                <p>Ao contrário da arte institucional, a arte de rua não controla seu entorno. O muro pode ser apagado, o traço pode ser coberto, a obra pode desaparecer no dia seguinte. Essa instabilidade não é um defeito; é a própria forma. O gesto artístico se mede menos pela permanência e mais pela insistência: voltar a aparecer, voltar a marcar, voltar a disputar o espaço urbano.</p>
                <blockquote>"A cidade não é pano de fundo neutro. Ela responde."</blockquote>
                <p>Há quem leia a arte de rua apenas como comentário político direto, mensagem explícita ou denúncia visual. Essa leitura é confortável demais. O que está em jogo não é só o que se diz, mas onde se diz. Um mesmo desenho, deslocado do muro para a galeria, perde parte de sua força porque deixa de enfrentar o território que o condiciona.</p>
                <p>Talvez por isso ela incomode tanto quando tenta ser normalizada. Quando vira circuito, festival, roteiro turístico. Algo se perde quando a arte de rua deixa de correr risco. O risco não é apenas jurídico ou material; é formal. Sem a possibilidade de falha, apagamento ou conflito, o gesto se torna decorativo.</p>
                <p>A cidade não pede licença. A arte de rua também não deveria.</p>
            `
        },
        {
            id: "5",
            type: "article",
            date: "05 JAN 2026",
            author: "Helena Barros",
            authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
            authorBio: "Crítica de arte e ensaísta. Explora a melancolia e o erro como ferramentas de resistência estética no Brasil contemporâneo.",
            title: "O Encanto da Exclusão",
            description: "Sobre como o universo de Harry Potter lida com a diferença sem permitir sua radicalidade.",
            tags: ["Literatura", "Cinema"],
            image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=800",
            body: `
                <p>O universo mágico de Harry Potter sempre se apresentou como um convite à diferença. Bruxos e bruxas existem à margem do mundo “normal”, escondidos, perseguidos, organizados em uma comunidade própria. A magia surge, desde o início, como promessa de exceção — um lugar onde aquilo que não cabe encontra forma.</p>
                <blockquote>"Mas o encanto desse mundo depende de um acordo silencioso: nem toda diferença pode existir ali."</blockquote>
                <p>A magia, tal como é representada, funciona menos como abertura do possível e mais como sistema de ordenação. Há corpos autorizados a portar poder, linhagens reconheceis, trajetórias legitimadas. O estranho é acolhido apenas quando se deixa traduzir por regras antigas.</p>
                <p>Quando a transfobia emerge associada a esse universo, não aparece como ruptura, mas como confirmação. A exclusão não contradiz o mundo mágico; ela o protege. Corpos que desafiam a fixidez de gênero colocam em crise a própria lógica da magia como essência estável.</p>
                <blockquote>"O mundo mágico resiste à fluidez porque foi construído para celebrar a diferença sem permitir sua radicalidade."</blockquote>
                <p>Revisitar Harry Potter hoje não exige cancelamento nem nostalgia defensiva. Exige leitura. Uma leitura que aceite o incômodo de reconhecer que a magia ali representada funciona melhor quando certos corpos permanecem fora de cena, quando certas perguntas não são feitas.</p>
                <p>O mundo mágico seduz porque promete diferença. Ele se mantém porque decide quem pode diferir.</p>
            `
        }
    ];

    function renderArticlesList() {
        if (!articlesContainer) return;

        // Clean slate each time
        articlesContainer.innerHTML = '';
        const articles = contentData.filter(item => item.type === 'article');

        if (articles.length === 0) {
            articlesContainer.innerHTML = '<div class="wip-message"><h3>EM BREVE</h3><p>Novos conteúdos em desenvolvimento.</p></div>';
        } else {
            articles.forEach(item => {
                articlesContainer.insertAdjacentHTML('beforeend', createCardHTML(item));
            });
        }
    }

    function initTagSelector() {
        const selectorContainer = document.getElementById('tag-selector-container');
        if (!selectorContainer) return;

        const selectHTML = `
            <div class="tag-select-container">
                <select class="tag-select" id="tag-selector">
                    <option value="" disabled selected>EXPLORE POR CATEGORIA</option>
                    ${CANONICAL_TAGS.map(tag => `<option value="${escapeHTML(tag)}">${escapeHTML(tag)}</option>`).join('')}
                </select>
            </div>
        `;
        selectorContainer.innerHTML = selectHTML;

        const selector = document.getElementById('tag-selector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                const selectedTag = e.target.value;
                switchView('browse', selectedTag || null);
            });
        }
    }

    function renderBrowseView(tagName = null) {
        if (!browseContainer) return;
        browseContainer.innerHTML = '';

        // Sync selector value if it exists
        const selector = document.getElementById('tag-selector');
        if (selector) {
            selector.value = tagName || "";
        }

        if (!tagName) {
            // Render Onboarding Screen
            browseContainer.innerHTML = `
                <div class="onboarding-container">
                    <div class="onboarding-content">
                        <p>Selecione uma categoria acima para começar sua jornada pela crítica cultural contemporânea.</p>
                        <div class="onboarding-arrow">↑</div>
                    </div>
                </div>
            `;
            return;
        }

        // Render Filtered List
        const filtered = contentData.filter(item => item.tags.includes(tagName));

        if (filtered.length === 0) {
            const escapedTag = escapeHTML(tagName);
            browseContainer.innerHTML = `<div class="wip-message"><h3>EM BREVE</h3><p>Ainda não temos publicações sob a tag "${escapedTag}".</p></div>`;
        } else {
            filtered.forEach(item => {
                browseContainer.insertAdjacentHTML('beforeend', createCardHTML(item));
            });
        }
    }

    function createCardHTML(item) {
        const title = escapeHTML(item.title);
        const date = escapeHTML(item.date);
        const author = escapeHTML(item.author);
        const desc = escapeHTML(item.description);
        const image = encodeURI(item.image);

        // Detect long wide words: 9+ characters excluding 'i'
        const hasWideWord = item.title.split(/\s+/).some(word => {
            const nonICount = [...word.toLowerCase()].filter(ch => ch !== 'i').length;
            return nonICount >= 9;
        });
        const compactClass = hasWideWord ? ' compact-title' : '';

        return `
            <div class="article-item${compactClass}" data-id="${item.id}" data-image="${image}">
                <span class="date">${date} // ${author}</span>
                <h4>${title}</h4>
                <p>${desc}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="tag" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // Scroll Observer for header
    const stickyTitle = document.querySelector('.sticky-title');
    let scrollTimeout;
    if (articleFullContainer) {
        articleFullContainer.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = requestAnimationFrame(() => {
                    const mainTitle = articleFullContainer.querySelector('h2');
                    if (mainTitle) {
                        const titleRect = mainTitle.getBoundingClientRect();
                        const containerRect = articleFullContainer.getBoundingClientRect();
                        if (titleRect.bottom < containerRect.top + 20) {
                            stickyTitle.classList.add('visible');
                        } else {
                            stickyTitle.classList.remove('visible');
                        }
                    }
                    scrollTimeout = null;
                });
            }
        });
    }

    function updateCircle(imageUrl) {
        if (transitionTimer) clearTimeout(transitionTimer);

        if (imageUrl) {
            if (circleImage.classList.contains('visible')) {
                circleImage.classList.remove('visible');
                transitionTimer = setTimeout(() => {
                    circleImage.style.backgroundImage = `url('${imageUrl}')`;
                    circleImage.classList.add('visible');
                    circle.classList.add('has-cover');
                }, 300);
            } else {
                circleImage.style.backgroundImage = `url('${imageUrl}')`;
                circleImage.classList.add('visible');
                circle.classList.add('has-cover');
            }
        } else {
            circleImage.classList.remove('visible');
            circle.classList.remove('has-cover');
            transitionTimer = setTimeout(() => {
                circleImage.style.backgroundImage = 'none';
            }, 400);
        }
    }

    let lastListView = 'articles';
    let activeViewId = 'home'; // Track intended view for scroll handler
    let _fromPopstate = false; // Flag to prevent double-push when navigating via browser back/forward

    // =========================================================
    // ROUTING: History API
    // Builds shareable URLs: /?artigo=1, /?navegar=Cinema, /?pagina=artigos
    // =========================================================
    function pushStateForView(viewId, param = null) {
        const url = new URL(window.location.href);
        url.search = ''; // Clear previous params

        let title = 'Chimaera Brasilis';

        if (viewId === 'home') {
            // Root URL — no params
        } else if (viewId === 'articles') {
            url.searchParams.set('pagina', 'artigos');
            title = 'Artigos — Chimaera Brasilis';
        } else if (viewId === 'about') {
            url.searchParams.set('pagina', 'sobre');
            title = 'Sobre — Chimaera Brasilis';
        } else if (viewId === 'browse') {
            if (param) {
                url.searchParams.set('navegar', param);
                title = `${param} — Chimaera Brasilis`;
            } else {
                url.searchParams.set('pagina', 'navegar');
                title = 'Navegar — Chimaera Brasilis';
            }
        } else if (viewId === 'article-detail' && param) {
            // Find item to get title for document.title
            const item = contentData.find(d => d.id === param);
            url.searchParams.set('artigo', param);
            title = item ? `${item.title} — Chimaera Brasilis` : 'Chimaera Brasilis';
        }

        history.pushState({ viewId, param }, title, url.toString());
        document.title = title;
    }

    function switchView(viewId, param = null) {
        const currentView = document.querySelector('.view.active');
        const nextView = document.getElementById(`${viewId}-view`);

        if (!nextView) return;

        // Clear expansion timers when switching any view
        if (expansionTimer) {
            clearTimeout(expansionTimer);
            expansionTimer = null;
        }
        if (pulseOffTimer) {
            clearTimeout(pulseOffTimer);
            pulseOffTimer = null;
        }
        circle.classList.remove('expanded', 'pulse-off');

        // Skip animation if already in the browse view and just changing tags
        if (viewId === 'browse' && currentView === nextView) {
            renderBrowseView(param);
            window.lastBrowseTag = param;
            updateCircle(null);
            return;
        }

        if (currentView === nextView && !param) return;

        // Update tracking immediately (before 500ms transition)
        activeViewId = viewId;

        // Push to browser history (unless triggered by popstate)
        if (!_fromPopstate) {
            pushStateForView(viewId, param);
        }
        _fromPopstate = false;

        // Reading Mode: expand grid to 75%/25% only on article-detail
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            if (viewId === 'article-detail') {
                heroSection.classList.add('reading-mode');
            } else {
                heroSection.classList.remove('reading-mode');
            }
        }

        // Mobile Header Logic: Only expand on home, auto-collapse on everything else
        if (mobileHeader) {
            if (viewId === 'home') {
                mobileHeader.classList.remove('collapsed');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                mobileHeader.classList.add('collapsed');
            }
        }

        if (currentView) currentView.classList.add('fading-out');

        setTimeout(() => {
            if (currentView) currentView.classList.remove('active', 'fading-out');

            if (viewId === 'article-detail' && param) {
                const item = contentData.find(d => d.id === param);
                if (item) {
                    const title = escapeHTML(item.title);
                    const author = escapeHTML(item.author);
                    const date = escapeHTML(item.date);
                    const authorImg = encodeURI(item.authorImg);
                    const authorBio = escapeHTML(item.authorBio);
                    const tagsStr = item.tags.map(t => escapeHTML(t)).join(' + ');

                    if (stickyTitle) {
                        stickyTitle.textContent = item.title;
                        stickyTitle.classList.remove('visible');
                    }
                    articleFullContainer.innerHTML = `
                        <span class="meta">${date} // ${tagsStr}</span>
                        <h2>${title}</h2>
                        <div class="detail-tags">
                            ${item.tags.map(tag => `<span class="detail-tag" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</span>`).join('')}
                        </div>
                        <div class="article-body">
                            ${item.body}
                        </div>
                        <div class="author-section">
                            <img src="${authorImg}" alt="${author}" class="author-img" loading="lazy" decoding="async">
                            <div class="author-info">
                                 <h5>${author}</h5>
                                 <p>${authorBio}</p>
                            </div>
                        </div>
                    `;
                    lockedCover = item.image;
                    updateCircle(lockedCover);
                }
            } else if (viewId === 'browse') {
                renderBrowseView(param);
                lockedCover = null;
                updateCircle(null);
                lastListView = 'browse';
                // Note: if param is null, it's the index, else it's a filtered list.
                // We'll store this to return to the right place.
                window.lastBrowseTag = param;
            } else if (['home', 'about', 'articles'].includes(viewId)) {
                if (viewId === 'articles') {
                    lastListView = 'articles';
                    renderArticlesList(); // Re-render every time we visit
                }
                if (viewId !== 'articles') {
                    lockedCover = null;
                    updateCircle(null);
                }
            }

            nextView.classList.add('active');
            if (viewId === 'article-detail') {
                articleFullContainer.scrollTop = 0;
                window.scrollTo(0, 0);

                // ANIMAÇÃO DE ENTRADA: circle expande ao abrir o artigo (original, restaurada)
                expansionTimer = setTimeout(() => {
                    circle.classList.add('expanded');
                    pulseOffTimer = setTimeout(() => {
                        circle.classList.add('pulse-off');
                    }, 2500);
                }, 500);
            }
        }, 500);
    }

    // Initialize the page
    renderArticlesList(); // Pre-load just in case
    initTagSelector();

    // =========================================================
    // ROUTING: Restore view from URL on page load
    // Supports: /?artigo=1, /?navegar=Cinema, /?pagina=artigos|navegar|sobre
    // =========================================================
    function restoreFromURL() {
        const params = new URLSearchParams(window.location.search);
        const artigo = params.get('artigo');
        const navegar = params.get('navegar');
        const pagina = params.get('pagina');

        if (artigo) {
            // Direct article link: /?artigo=2
            switchView('article-detail', artigo);
        } else if (navegar) {
            // Filtered browse: /?navegar=Cinema
            switchView('browse', navegar);
        } else if (pagina === 'artigos') {
            switchView('articles');
        } else if (pagina === 'sobre') {
            switchView('about');
        } else if (pagina === 'navegar') {
            switchView('browse');
        }
        // else: stays on home (default)
    }
    restoreFromURL();

    // =========================================================
    // ROUTING: Handle browser Back / Forward buttons
    // =========================================================
    window.addEventListener('popstate', (e) => {
        const state = e.state;
        if (state && state.viewId) {
            _fromPopstate = true;
            switchView(state.viewId, state.param || null);
        } else {
            // Fallback: no state (e.g. the very first page load entry)
            _fromPopstate = true;
            switchView('home');
        }
    });

    // Event Delegation for hover and click
    document.addEventListener('mouseover', (e) => {
        const item = e.target.closest('.article-item');
        if (item && circleImage && !lockedCover) {
            const imageUrl = item.getAttribute('data-image');
            updateCircle(imageUrl);
        }
    });

    document.addEventListener('mouseout', (e) => {
        const item = e.target.closest('.article-item');
        if (item && circleImage && !lockedCover) {
            updateCircle(null);
        }
    });

    document.addEventListener('click', (e) => {
        // Nav Links (Desktop + Mobile Tabs)
        const navLink = e.target.closest('.main-nav a, .mobile-tabs a');
        if (navLink) {
            e.preventDefault();
            const viewId = navLink.getAttribute('data-view');
            if (viewId) {
                switchView(viewId);
                // Update active tab indicator for mobile
                const allTabs = document.querySelectorAll('.mobile-tabs li');
                allTabs.forEach(li => li.classList.remove('active'));
                const parentLi = navLink.closest('li');
                if (parentLi) parentLi.classList.add('active');
            }
            return;
        }

        // Logo (Desktop logo-container OR Mobile sticky logo)
        if (e.target.closest('.logo-container') || e.target.closest('.mobile-sticky-logo')) {
            switchView('home');
            // Update mobile tabs: clear active since there's no CAPA tab
            const allTabs = document.querySelectorAll('.mobile-tabs li');
            allTabs.forEach(li => li.classList.remove('active'));
            return;
        }

        // Article Clicks
        const articleItem = e.target.closest('.article-item');
        if (articleItem) {
            const articleId = articleItem.getAttribute('data-id');
            if (articleId) switchView('article-detail', articleId);
            return;
        }

        // Tag Clicks (anywhere)
        const tagElement = e.target.closest('.tag, .detail-tag, .tag-index-item');
        if (tagElement) {
            const tagName = tagElement.getAttribute('data-tag');
            if (tagName) switchView('browse', tagName);
            return;
        }

        // Back Button
        if (e.target.closest('.back-btn')) {
            // Timings alinhados com o CSS:
            // switchView demora 500ms para remover reading-mode
            // grid anima por 700ms (transition: grid-template-columns 0.7s)
            // circleAppear dura 800ms
            const GRID_SETTLE = 1200; // 500ms (switchView) + 700ms (grid transition)
            const CIRCLE_ANIM = 800;  // mesmo valor definido no CSS

            document.body.classList.add('anim-lock');

            // Passo 1: ocultar o circle imediatamente (sem flash)
            circle.classList.add('hidden-for-entry');
            void circle.getBoundingClientRect(); // garante que hidden-for-entry foi aplicado

            // Passo 2: resetar estado do circle sem animar (circle já invisible)
            circle.style.transition = 'none';
            circle.classList.remove('expanded', 'pulse-off', 'entering');
            if (expansionTimer) { clearTimeout(expansionTimer); expansionTimer = null; }
            if (pulseOffTimer) { clearTimeout(pulseOffTimer); pulseOffTimer = null; }
            void circle.getBoundingClientRect();
            circle.style.transition = '';

            // Passo 3: navegar — switchView irá remover reading-mode,
            // acionando a transição CSS do grid (Phase 1 da animação)
            if (window.history.length > 1) {
                history.back();
            } else {
                lockedCover = null;
                updateCircle(null);
                if (lastListView === 'browse') {
                    switchView('browse', window.lastBrowseTag);
                } else {
                    switchView('articles');
                }
            }

            // Passo 4: após o grid terminar de animar, circle aparece (Phase 2)
            setTimeout(() => {
                circle.classList.remove('hidden-for-entry');
                circle.classList.add('entering');

                // Limpeza após o fade-in do circle
                setTimeout(() => {
                    circle.classList.remove('entering');
                    document.body.classList.remove('anim-lock');
                }, CIRCLE_ANIM);
            }, GRID_SETTLE);

            return;
        }
    });


    // Mobile Header Scroll Listener
    if (mobileHeader) {
        // Helper: collapse or expand based on scroll position
        function handleMobileScroll(scrollTop) {
            if (scrollTop > 50 && (activeViewId === 'articles' || activeViewId === 'browse')) {
                mobileHeader.classList.add('collapsed');
            } else if (scrollTop <= 50 && activeViewId === 'home') {
                mobileHeader.classList.remove('collapsed');
            }
        }

        // 1) Listen on WINDOW scroll (fires when body scrolls natively)
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
            handleMobileScroll(scrollTop);
        }, { passive: true });

        // 2) Listen on scrollable CONTAINERS (article-list, article content)
        //    These fire when content scrolls inside a fixed-height container
        document.addEventListener('scroll', (e) => {
            const target = e.target;
            // Skip horizontal tab scrolling
            if (target.classList && target.classList.contains('mobile-tabs')) return;

            // Only react to known scrollable containers
            if (target.classList && (
                target.classList.contains('article-list') ||
                target.id === 'article-full-content'
            )) {
                handleMobileScroll(target.scrollTop);
            }
        }, true); // Capture phase for nested containers
    }
});
