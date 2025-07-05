document.addEventListener('DOMContentLoaded', () => {

    // --- Helper function: addEventOnElem (Definida uma única vez) ---
    const addEventOnElem = function (elem, type, callback) {
        if (elem.length > 1) { // Verifica se é um NodeList (múltiplos elementos)
            for (let i = 0; i < elem.length; i++) {
                elem[i].addEventListener(type, callback);
            }
        } else { // Se for um único elemento
            elem.addEventListener(type, callback);
        }
    }

    // --- Navbar Toggle Logic (Menu Hambúrguer) ---
    const navbar = document.querySelector("[data-navbar]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");
    const navToggler = document.querySelector("[data-nav-toggler]");

    const toggleNavbar = function () {
        navbar.classList.toggle("active");
        navToggler.classList.toggle("active");
        document.body.classList.toggle("active"); // Adiciona/remove classe para travar o scroll
    }

    // Adiciona event listeners para o menu hambúrguer
    if (navToggler && navbar) { // Garante que os elementos existam
        addEventOnElem(navToggler, "click", toggleNavbar);

        const closeNavbar = function () {
            navbar.classList.remove("active");
            navToggler.classList.remove("active");
            document.body.classList.remove("active"); // Remove classe para liberar o scroll
        }
        addEventOnElem(navbarLinks, "click", closeNavbar);
    }


    // --- Scroll Reveal Effect ---
    const sections = document.querySelectorAll("[data-section]");

    const scrollReveal = function () {
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
                sections[i].classList.add("active");
            } else {
                sections[i].classList.remove("active");
            }
        }
    }

    scrollReveal(); // Chama a função uma vez ao carregar a página
    addEventOnElem(window, "scroll", scrollReveal);


    // --- Toggle Active on Add to Fav (seus botões de favorito, se houver) ---
    const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");
    if (addToFavBtns.length > 0) { // Verifica se há botões de favorito na página
        const toggleActive = function () {
            this.classList.toggle("active");
        }
        addEventOnElem(addToFavBtns, "click", toggleActive);
    }


    // --- LÓGICA LORDICON ANIMANDO AO ENTRAR NA VIEWPORT (da página principal) ---
    const lordiconCryptoJourney = document.getElementById('lordicon-crypto-journey');

    if (lordiconCryptoJourney) {
        const observerLordicon = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Define o trigger para 'loop' imediatamente
                    lordiconCryptoJourney.setAttribute('trigger', 'loop');

                    // Adiciona um pequeno atraso para garantir que o elemento Lordicon esteja totalmente pronto
                    // e seus métodos estejam disponíveis após a atualização e renderização do DOM.
                    setTimeout(() => {
                        // Verifica se a função 'play' existe antes de chamá-la
                        if (typeof lordiconCryptoJourney.play === 'function') {
                            lordiconCryptoJourney.play(); // Inicia a animação
                            console.log("Animação Lordicon iniciada."); // Para depuração
                        } else {
                            console.warn("Método lordiconCryptoJourney.play não encontrado. O elemento pode não estar totalmente inicializado."); // Para depuração
                        }
                    }, 100); // Um pequeno atraso, por exemplo, 100ms

                    observerLordicon.unobserve(entry.target); // Para de observar após a ativação
                }
            });
        }, {
            threshold: 0.5 // Aciona quando 50% do ícone estiver visível
        });
        observerLordicon.observe(lordiconCryptoJourney);
    }


    // --- LÓGICA DO CARROSSEL DE CRIPTOMOEDAS (da página principal) ---
    const carouselSection = document.querySelector('.coin-carousel-section');
    if (carouselSection) { // Garante que esta seção só execute se existir
        const coins = [
            {
                name: "Bitcoin",
                rank: "#1 Maior criptomoeda",
                description: "Bitcoin é a primeira e mais conhecida criptomoeda, operando em uma rede descentralizada peer-to-peer. Suas transações são verificadas por nós da rede através de criptografia e registradas em um livro-razão público chamado blockchain.",
                icon: {
                    src: "https://cdn.lordicon.com/zlqqwtvs.json",
                    trigger: "in",
                    stroke: "light",
                    colors: "primary:#e88c30,secondary:#ffffff",
                    style: "width:280px;height:280px"
                },
                colorClass: "holographic-bitcoin"
            },
            {
                name: "Ethereum",
                rank: "#2 Maior criptomoeda",
                description: "Ethereum é muito mais que uma moeda digital. É uma plataforma global de código aberto para aplicativos descentralizados. Seu token nativo, o ETH, funciona como 'combustível' para executar operações e smart contracts na rede.",
                icon: {
                    src: "https://cdn.lordicon.com/dehlpoqu.json",
                    trigger: "in",
                    stroke: "light",
                    state: "morph-circle",
                    colors: "primary:#104891,secondary:#30c9e8",
                    style: "width:280px;height:280px"
                },
                colorClass: "holographic-ethereum"
            },
            {
                name: "Tether",
                rank: "#3 Maior criptomoeda",
                description: "Tether (USDT) é uma 'stablecoin' projetada para manter um valor estável, atrelado ao dólar americano na proporção de 1:1. Ela combina a flexibilidade das criptomoedas com a estabilidade das moedas fiduciárias.",
                icon: {
                    src: "https://cdn.lordicon.com/dyebqwas.json",
                    trigger: "in",
                    stroke: "light",
                    colors: "primary:#16c79e,secondary:#ffffff",
                    style: "width:260px;height:260px"
                },
                colorClass: "holographic-tether"
            }
        ];

        const prevBtn = carouselSection.querySelector('.prev-btn');
        const nextBtn = carouselSection.querySelector('.next-btn');
        const iconWrapper = carouselSection.querySelector('#coin-icon-wrapper');
        const infoWrapper = carouselSection.querySelector('#coin-info-wrapper');
        const coinNameEl = carouselSection.querySelector('#coin-name');
        const coinRankEl = carouselSection.querySelector('#coin-rank');
        const coinTextEl = carouselSection.querySelector('#coin-text');

        let currentIndex = 0;

        function updateCarousel(index) {
            const coin = coins[index];
            iconWrapper.classList.add('carousel-item-fade-out');
            infoWrapper.classList.add('coin-info-hide-text');

            setTimeout(() => {
                iconWrapper.innerHTML = '';
                const newLordIcon = document.createElement('lord-icon');
                newLordIcon.setAttribute('src', coin.icon.src);
                newLordIcon.setAttribute('trigger', coin.icon.trigger);
                newLordIcon.setAttribute('stroke', coin.icon.stroke);
                newLordIcon.setAttribute('colors', coin.icon.colors);
                if (coin.icon.state) {
                    newLordIcon.setAttribute('state', coin.icon.state);
                }
                newLordIcon.setAttribute('style', coin.icon.style);
                iconWrapper.appendChild(newLordIcon);

                coinNameEl.textContent = coin.name;
                coinNameEl.className = `holographic-base ${coin.colorClass}`;
                coinRankEl.textContent = coin.rank;
                coinTextEl.textContent = coin.description;

                iconWrapper.classList.remove('carousel-item-fade-out');
                infoWrapper.classList.remove('coin-info-hide-text');
            }, 500);
        }

        if (prevBtn && nextBtn && iconWrapper && infoWrapper && coinNameEl && coinRankEl && coinTextEl) { // Verifica se todos os elementos do carrossel existem
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % coins.length;
                updateCarousel(currentIndex);
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + coins.length) % coins.length;
                updateCarousel(currentIndex);
            });

            infoWrapper.classList.add('coin-info-hide-text');
            updateCarousel(currentIndex);
        }
    }


    // --- LÓGICA DO MODAL DE MENSAGEM ENVIADA (Central de Ajuda) ---
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (contactForm && successModal && closeModalBtn) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            successModal.classList.add('active'); // Mostra o modal
            document.body.classList.add('active-modal'); // Adiciona classe para desabilitar scroll no body

            // Limpa o formulário após 'envio'
            contactForm.reset();
        });

        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active'); // Esconde o modal
            document.body.classList.remove('active-modal'); // Remove classe para reabilitar scroll
        });

        // Opcional: Fechar modal clicando fora dele
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) { // Verifica se o clique foi no overlay, não no conteúdo do modal
                successModal.classList.remove('active');
                document.body.classList.remove('active-modal');
            }
        });
    }

}); // Fim do DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {

    // --- Helper function: addEventOnElem (Deve ser definida APENAS UMA VEZ aqui) ---
    const addEventOnElem = function (elem, type, callback) {
        if (elem.length > 1) { // Verifica se é um NodeList (múltiplos elementos)
            for (let i = 0; i < elem.length; i++) {
                elem[i].addEventListener(type, callback);
            }
        } else { // Se for um único elemento
            elem.addEventListener(type, callback);
        }
    }

    // --- Navbar Toggle Logic (Menu Hambúrguer) ---
    // Seleciona os elementos do menu
    const navbar = document.querySelector("[data-navbar]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");
    const navToggler = document.querySelector("[data-nav-toggler]");

    // Função para alternar a visibilidade do menu
    const toggleNavbar = function () {
        if (navbar && navToggler && document.body) { // Garante que os elementos existam antes de manipular
            navbar.classList.toggle("active");
            navToggler.classList.toggle("active");
            document.body.classList.toggle("active"); // Adiciona/remove classe para travar o scroll
        }
    }

    // Função para fechar o menu (usada nos links do navbar)
    const closeNavbar = function () {
        if (navbar && navToggler && document.body) { // Garante que os elementos existam
            navbar.classList.remove("active");
            navToggler.classList.remove("active");
            document.body.classList.remove("active"); // Remove classe para liberar o scroll
        }
    }

    // Anexa os event listeners (somente se o botão do menu existir)
    if (navToggler) {
        addEventOnElem(navToggler, "click", toggleNavbar);
    }
    // Anexa event listeners para fechar o menu ao clicar em um link (somente se houver links no navbar)
    if (navbarLinks.length > 0) {
        addEventOnElem(navbarLinks, "click", closeNavbar);
    }



}); // Fim do DOMContentLoaded