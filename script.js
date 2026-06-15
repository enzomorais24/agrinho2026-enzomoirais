const backToTopBtn = document.getElementById('back-to-top');
const progressBar = document.getElementById('progress-bar');
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const links = document.querySelectorAll('header nav a');
const topicCards = document.querySelectorAll('.topic-card, .stats-card, .pillar-card, .story-card, .feature-card, .fade-section');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const loadingScreen = document.getElementById('loading-screen');
const loadingBarFill = document.querySelector('.loading-bar-fill');
const loadingText = document.querySelector('.loading-text');

let loadProgress = 0;
const loadingMessages = ['Carregando...', 'Preparando dados...', 'Quase lá...'];
let msgIndex = 0;

if (loadingScreen && loadingBarFill) {
  const loadingInterval = setInterval(() => {
      loadProgress += Math.random() * 18 + 6;
      if (loadProgress >= 100) loadProgress = 100;
      loadingBarFill.style.width = loadProgress + '%';

      if (loadProgress > 40 && msgIndex === 0) { msgIndex = 1; loadingText.textContent = loadingMessages[1]; }
      if (loadProgress > 75 && msgIndex === 1) { msgIndex = 2; loadingText.textContent = loadingMessages[2]; }

      if (loadProgress >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
              loadingScreen.classList.add('hidden');
              body.classList.add('loaded');
              revealSkeletons();
          }, 400);
      }
  }, 120);
}

function revealSkeletons() {
    const skeletonMap = [
        { gridId: 'stats-grid',   templateId: 'stats-real' },
        { gridId: 'pillars-grid', templateId: 'pillars-real' },
        { gridId: 'story-grid',   templateId: 'story-real' },
        { gridId: 'tech-grid',    templateId: 'tech-real' },
    ];

    skeletonMap.forEach(({ gridId, templateId }, i) => {
        const grid = document.getElementById(gridId);
        const template = document.getElementById(templateId);
        if (!grid || !template) return;

        setTimeout(() => {
            grid.querySelectorAll('.skeleton-active').forEach(el => {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = '0';
            });

            setTimeout(() => {
                grid.innerHTML = '';
                const clone = template.content.cloneNode(true);
                Array.from(clone.children).forEach((child, idx) => {
                    child.classList.add('skeleton-reveal-enter');
                    child.style.animationDelay = `${idx * 80}ms`;
                    grid.appendChild(child);
                });

                grid.querySelectorAll('.counter').forEach(counter => {
                    if (!counter.dataset.animated) {
                        counter.dataset.animated = 'true';
                        animateCounter(counter);
                    }
                });
            }, 300);
        }, i * 200); // stagger between sections
    });
}

const updateScrollEffects = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    backToTopBtn.classList.toggle('show', scrollTop > 320);
    navbar.classList.toggle('scrolled', scrollTop > 50);
};

const toggleMenu = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
};

const closeMenu = () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
};

window.addEventListener('scroll', updateScrollEffects);

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

hamburger?.addEventListener('click', toggleMenu);

links.forEach(link => {
    link.addEventListener('click', () => closeMenu());
});

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function formatNumber(n) {
        if (target >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' mi';
        if (target >= 1000 && suffix === ' bi') return n.toFixed(0);
        if (target > 9999) return n.toLocaleString('pt-BR');
        return Math.round(n).toString();
    }

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = formatNumber(current) + (target < 1000000 ? suffix : '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
    updateScrollEffects();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    topicCards.forEach(card => observer.observe(card));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                event.preventDefault();
                closeMenu();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    body.classList.add(`${savedTheme}-theme`);
    if (themeToggle) {
        themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle?.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        body.classList.toggle('dark-theme', !isDark);
        body.classList.toggle('light-theme', isDark);
        const nextTheme = isDark ? 'light' : 'dark';
        localStorage.setItem('theme-mode', nextTheme);
        themeToggle.querySelector('i').className = nextTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    const regionData = {
        norte:      { label: 'Norte', info: '1,2 mi estabelecimentos · Açaí, Castanha, Pesca artesanal' },
        nordeste:   { label: 'Nordeste', info: '2,0 mi estabelecimentos · Mandioca, Caju, Caprinos' },
        centroeste: { label: 'Centro-Oeste', info: '300 mil estabelecimentos · Soja, Milho, Gado' },
        sudeste:    { label: 'Sudeste', info: '700 mil estabelecimentos · Café, Cana, Laranja' },
        sul:        { label: 'Sul', info: '850 mil estabelecimentos · Uva, Maçã, Suínos' },
    };

    const tooltip = document.getElementById('map-tooltip');
    const mapRegions = document.querySelectorAll('.map-region');
    const legendItems = document.querySelectorAll('.map-legend-item');

    function setActiveRegion(regionId) {
        mapRegions.forEach(r => r.classList.toggle('active', r.dataset.region === regionId));
        legendItems.forEach(l => l.classList.toggle('active', l.dataset.region === regionId));
    }

    mapRegions.forEach(region => {
        region.addEventListener('mouseenter', (e) => {
            const data = regionData[region.dataset.region];
            if (!data) return;
            tooltip.textContent = data.info;
            tooltip.classList.add('show');
        });

        region.addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.closest('svg').parentElement.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 36) + 'px';
        });

        region.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });

        region.addEventListener('click', () => {
            setActiveRegion(region.dataset.region);
        });
    });

    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            legendItems.forEach(l => {
                l.classList.remove('open');
                l.classList.remove('active');
            });
            if (!isOpen) {
                item.classList.add('open');
                item.classList.add('active');
                setActiveRegion(item.dataset.region);
            } else {
                mapRegions.forEach(r => r.classList.remove('active'));
            }
        });
    });

    const prItems = document.querySelectorAll('.pr-accordion-item');
    const prRegions = document.querySelectorAll('.pr-region');

    function setPrActive(regionId) {
        prRegions.forEach(r => r.classList.toggle('active', r.dataset.region === regionId));
    }

    prItems.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            prItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
                setPrActive(item.dataset.pr);
            } else {
                prRegions.forEach(r => r.classList.remove('active'));
            }
        });
    });

    prRegions.forEach(r => {
        r.addEventListener('click', () => {
            const match = document.querySelector(`.pr-accordion-item[data-pr="${r.dataset.region}"]`);
            if (!match) return;
            prItems.forEach(i => i.classList.remove('open'));
            match.classList.add('open');
            setPrActive(r.dataset.region);
            match.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    document.querySelectorAll('.fact-card').forEach(card => observer.observe(card));

    document.querySelectorAll('.challenge-card').forEach(card => observer.observe(card));

    const prStatsBar = document.querySelector('.pr-stats-bar');
    if (prStatsBar) {
        const prObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.pr-stat strong').forEach(el => {
                        const text = el.textContent.trim();
                        let target, suffix;
                        if (text.includes('mil')) { target = 320; suffix = ' mil'; }
                        else if (text.includes('#')) { target = 1; suffix = ''; el.textContent = '#1'; return; }
                        else if (text.includes('R$')) { target = 28; suffix = ''; el.textContent = 'R$ 0 bi'; animatePrStat(el, 28, 'R$ ', ' bi'); return; }
                        else if (text.includes('%')) { target = 68; suffix = '%'; }
                        else return;
                        animatePrStat(el, target, '', suffix);
                    });
                    prObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        prObserver.observe(prStatsBar);
    }

    function animatePrStat(el, target, prefix, suffix) {
        const duration = 1500;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * ease);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const sulItem = document.querySelector('.map-legend-item[data-region="sul"]');
    if (sulItem) {
        sulItem.classList.add('open');
        setActiveRegion('sul');
    }

    initQuiz();
});

function initQuiz() {
    const questions = [
        {
            q: "Qual porcentagem dos alimentos da mesa dos brasileiros vem da agricultura familiar?",
            options: ["45%", "60%", "77%", "30%"],
            correct: 2
        },
        {
            q: "Quantos estabelecimentos de agricultura familiar existem no Brasil?",
            options: ["1,2 milhão", "2,8 milhões", "4,3 milhões", "6 milhões"],
            correct: 2
        },
        {
            q: "Qual estado do Sul tem mais estabelecimentos de agricultura familiar?",
            options: ["Santa Catarina", "Rio Grande do Sul", "Paraná", "Todos iguais"],
            correct: 2
        },
        {
            q: "Quanto da produção de leite no Brasil vem de pequenas propriedades?",
            options: ["25%", "58%", "42%", "71%"],
            correct: 1
        },
        {
            q: "Em cidades com menos de 20 mil habitantes, quanto do PIB local vem do agro familiar em média?",
            options: ["20%", "30%", "45%", "60%"],
            correct: 2
        }
    ];

    let currentQ = 0;
    let score = 0;
    const container = document.getElementById('quiz-container');
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    const qText = document.getElementById('quiz-q-text');
    const optionsDiv = document.getElementById('quiz-options');
    const stepSpan = document.getElementById('quiz-step');
    const scoreSpan = document.getElementById('quiz-score');
    const resultTitle = document.getElementById('quiz-result-title');
    const resultDesc = document.getElementById('quiz-result-desc');
    const restartBtn = document.getElementById('quiz-restart');

    if (!container) return;

    function showQuestion() {
        const q = questions[currentQ];
        stepSpan.textContent = currentQ + 1;
        qText.textContent = q.q;
        optionsDiv.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => selectAnswer(i, btn));
            optionsDiv.appendChild(btn);
        });
    }

    function selectAnswer(index, btn) {
        const q = questions[currentQ];
        const allBtns = optionsDiv.querySelectorAll('.quiz-option');
        allBtns.forEach(b => b.classList.add('disabled'));

        if (index === q.correct) {
            btn.classList.add('correct');
            score++;
        } else {
            btn.classList.add('wrong');
            allBtns[q.correct].classList.add('correct');
        }

        setTimeout(() => {
            currentQ++;
            if (currentQ < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1200);
    }

    function showResult() {
        questionDiv.style.display = 'none';
        resultDiv.style.display = 'flex';
        scoreSpan.textContent = score;

        if (score === 5) {
            resultTitle.textContent = 'Parabéns! Conhecimento completo!';
            resultDesc.textContent = 'Você domina o tema da agricultura familiar. Esse conhecimento faz diferença para valorizar quem alimenta o Brasil.';
        } else if (score >= 3) {
            resultTitle.textContent = 'Muito bem! Quase lá.';
            resultDesc.textContent = 'Você sabe bastante sobre o agro familiar. Continue explorando o site para aprender ainda mais.';
        } else {
            resultTitle.textContent = 'Bom começo!';
            resultDesc.textContent = 'A agricultura familiar tem muitos detalhes importantes. Navegue pelo site para descobrir mais sobre quem alimenta o Brasil.';
        }
    }

    restartBtn?.addEventListener('click', () => {
        currentQ = 0;
        score = 0;
        questionDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        showQuestion();
    });

    showQuestion();
}

function createLeafParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    const leaves = ['🍃', '🌿', '☘️', '🌱'];
    for (let i = 0; i < 15; i++) {
        const leaf = document.createElement('span');
        leaf.className = 'leaf-particle';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
        leaf.style.animationDuration = (5 + Math.random() * 8) + 's';
        leaf.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(leaf);
    }
}
createLeafParticles();

function initScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;

    const sections = document.querySelectorAll('main section[id]');
    if (!sections.length) return;

    sections.forEach(section => {
        const dot = document.createElement('button');
        dot.className = 'scroll-dot';
        dot.setAttribute('aria-label', section.id);
        dot.title = section.querySelector('h2')?.textContent || section.id;
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        indicator.appendChild(dot);
    });

    const dots = indicator.querySelectorAll('.scroll-dot');

    function updateActiveDot() {
        let activeIndex = 0;
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) activeIndex = i;
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }

    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot();
}
initScrollIndicator();

document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            document.body.classList.add('page-transition-out');
            setTimeout(() => { window.location.href = href; }, 400);
        }
    });
});

(function() {
    const toggle = document.getElementById('theme-toggle');
    const b = document.body;
    if (!toggle) return;

    const saved = localStorage.getItem('theme-mode') || 'light';
    b.classList.remove('light-theme', 'dark-theme');
    b.classList.add(saved + '-theme');
    const icon = toggle.querySelector('i');
    if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    toggle.addEventListener('click', () => {
        const isDark = b.classList.contains('dark-theme');
        b.classList.toggle('dark-theme', !isDark);
        b.classList.toggle('light-theme', isDark);
        const next = isDark ? 'light' : 'dark';
        localStorage.setItem('theme-mode', next);
        const i = toggle.querySelector('i');
        if (i) i.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
})();

document.querySelector('.scroll-invite')?.addEventListener('click', () => {
    const hero = document.getElementById('hero');
    const next = hero?.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
