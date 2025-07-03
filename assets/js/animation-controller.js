document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA DO SCROLL REVEAL PARA OUTROS ELEMENTOS (MANTIDA)
    const scrollRevealElements = document.querySelectorAll('[data-scroll-reveal]');
    if (scrollRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });
        scrollRevealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // --- LÓGICA DO CARROSSEL DE CRIPTOMOEDAS ---

    // 1. Dados das moedas (sem alterações)
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
                style: "width:260px;height:260px" // <-- TAMANHO AJUSTADO
            },
            colorClass: "holographic-tether"
        }
    ];

    // 2. Seleciona os elementos do carrossel no DOM.
    const carouselSection = document.querySelector('.coin-carousel-section');
    if (!carouselSection) return;

    const prevBtn = carouselSection.querySelector('.prev-btn');
    const nextBtn = carouselSection.querySelector('.next-btn');
    const iconWrapper = carouselSection.querySelector('#coin-icon-wrapper');
    const infoWrapper = carouselSection.querySelector('#coin-info-wrapper');
    const coinNameEl = carouselSection.querySelector('#coin-name');
    const coinRankEl = carouselSection.querySelector('#coin-rank');
    const coinTextEl = carouselSection.querySelector('#coin-text');

    let currentIndex = 0;

    // 3. Função principal que atualiza o conteúdo do carrossel (ATUALIZADA).
    function updateCarousel(index) {
        const coin = coins[index];

        // Animação de SAÍDA: esconde o ícone e os textos com animação
        iconWrapper.classList.add('carousel-item-fade-out');
        infoWrapper.classList.add('coin-info-hide-text');

        // Aumentado o tempo para dar espaço para a animação de saída
        setTimeout(() => {
            // Atualiza o conteúdo (enquanto os elementos estão escondidos)
            iconWrapper.innerHTML = '';

            const newLordIcon = document.createElement('lord-icon');

            newLordIcon.setAttribute('src', coin.icon.src);
            newLordIcon.setAttribute('trigger', coin.icon.trigger);
            newLordIcon.setAttribute('stroke', coin.icon.stroke);
            newLordIcon.setAttribute('colors', coin.icon.colors);
            if (coin.icon.state) {
                newLordIcon.setAttribute('state', coin.icon.state);
            }
            // Certifique-se de aplicar o estilo do objeto 'icon'
            newLordIcon.setAttribute('style', coin.icon.style);

            iconWrapper.appendChild(newLordIcon);

            coinNameEl.textContent = coin.name;
            coinNameEl.className = `holographic-base ${coin.colorClass}`;
            coinRankEl.textContent = coin.rank;
            coinTextEl.textContent = coin.description;

            // Animação de ENTRADA: revela o ícone e os textos
            iconWrapper.classList.remove('carousel-item-fade-out');
            infoWrapper.classList.remove('coin-info-hide-text');

        }, 500); // Duração da animação de saída
    }

    // 4. Adiciona os eventos de clique aos botões de navegação.
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % coins.length;
        updateCarousel(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + coins.length) % coins.length;
        updateCarousel(currentIndex);
    });

    // 5. Exibe a primeira moeda quando a página carrega.
    // Garante que o texto comece escondido para a primeira animação
    infoWrapper.classList.add('coin-info-hide-text');
    updateCarousel(currentIndex);


    // --- NOVA LÓGICA: LORDICON ANIMANDO AO ENTRAR NA VIEWPORT ---
    const lordiconCryptoJourney = document.getElementById('lordicon-crypto-journey');

    if (lordiconCryptoJourney) {
        const observerLordicon = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // O ícone está visível na viewport
                    lordiconCryptoJourney.setAttribute('trigger', 'loop'); // Muda o trigger para loop
                    lordiconCryptoJourney.play(); // Inicia a animação
                    observerLordicon.unobserve(lordiconCryptoJourney); // Para de observar depois de acionar
                }
            });
        }, {
            threshold: 0.5 // Aciona quando 50% do ícone estiver visível
        });

        observerLordicon.observe(lordiconCryptoJourney);
    }
    // --- FIM DA NOVA LÓGICA ---

}); // Fim do DOMContentLoaded

'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

if (addToFavBtns.length > 0) {
  addEventOnElem(addToFavBtns, "click", toggleActive);
}


/**
 * scroll reveal effect
 */

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

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);