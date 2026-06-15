# AgroFuturo - Site Educativo de Agricultura Sustentável

Este é um site educativo profissional e responsivo sobre agricultura sustentável, com múltiplas páginas: Home, Agricultura, Recursos, Tecnologia e Sobre.

## Estrutura do Site

- **index.html**: Página inicial com hero, tópicos educacionais e seções principais.
- **agricultura.html**: Foco em práticas agrícolas sustentáveis.
- **recursos.html**: Conservação de recursos como água, solo e energia.
- **tecnologia.html**: Inovações tecnológicas na agricultura.
- **sobre.html**: Sobre a missão e objetivos do site.
- **style.css**: Estilos modernos com glassmorphism, animações e responsividade.
- **script.js**: Interatividade com parallax, scroll animations e hover effects.

## Funcionalidades

- Navbar fixa com efeito vidro e animação ao rolar.
- Hero com parallax e overlay.
- Cards glassmorphism com imagens, ícones, títulos, descrições e vídeos incorporados.
- Scroll animations (fade-in, slide, zoom).
- Parallax em seções principais.
- Rodapé moderno com ícones sociais.
- Totalmente responsivo (mobile, tablet, desktop).
- Efeitos hover em cards e vídeos.
- Navegação suave.

## Como Usar

1. Abra qualquer arquivo HTML em um navegador para visualizar.
2. Para desenvolvimento, use um servidor local (ex: `python3 -m http.server`).
3. Substitua os `VIDEO_ID_X` nos iframes por IDs reais de vídeos do YouTube sobre agricultura sustentável.

## Tecnologias

- HTML5
- CSS3 (com backdrop-filter para glassmorphism)
- JavaScript (ES6)
- Font Awesome para ícones
- Google Fonts (Montserrat)
- Imagens do Unsplash

## Responsividade

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

O site é pronto para uso sem bugs e otimizado para experiência imersiva.
  <!-- Cabeçalho fixo -->
  <header>
    <h1>AgroFuturo</h1>
    <nav>
      <a href="#missao">Missão</a>
      <a href="#producao">Produção</a>
      <a href="#sustentabilidade">Sustentabilidade</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <main>
    <!-- Seção Hero -->
    <section id="hero">
      <div class="overlay">
        <div class="hero-content">
          <h2>Agro Forte, Futuro Sustentável</h2>
          <p>Equilibrando tecnologia e meio ambiente para uma agricultura responsável e eficiente.</p>
          <a href="#missao" class="btn">Saiba Mais</a>
        </div>
      </div>
    </section>

    <!-- Seção Missão -->
    <section id="missao" class="section-image" style="background-image: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1470&q=80');">
      <div class="section-overlay">
        <div class="content">
          <h2>Nosso Propósito</h2>
          <p>Fortalecer a agricultura moderna com práticas que respeitam o meio ambiente. Desenvolvemos soluções inovadoras que promovem produtividade sem comprometer recursos naturais.</p>
        </div>
      </div>
    </section>

    <!-- Seção Produção -->
    <section id="producao" class="section-image" style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80');">
      <div class="section-overlay">
        <div class="content">
          <h2>Produção Eficiente</h2>
          <p>Implementamos tecnologias de ponta para otimizar a produção agrícola, utilizando menos recursos e garantindo maior qualidade nos produtos, sempre de forma sustentável.</p>
        </div>
      </div>
    </section>

    <!-- Seção Sustentabilidade -->
    <section id="sustentabilidade" class="section-image" style="background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80');">
      <div class="section-overlay">
        <div class="content">
          <h2>Equilíbrio Ambiental</h2>
          <p>Práticas agrícolas sustentáveis, preservação do solo e recursos hídricos, além de inovação tecnológica, garantem que a produção agroalimentar respeite o meio ambiente e as futuras gerações.</p>
        </div>
      </div>
    </section>

    <!-- Seção Contato -->
    <section id="contato">
      <div class="content">
        <h2>Contato</h2>
        <p>Entre em contato conosco para conhecer nossas soluções e projetos para um futuro agro sustentável.</p>
        <form>
          <input type="text" placeholder="Seu nome" required>
          <input type="email" placeholder="Seu e-mail" required>
          <textarea placeholder="Sua mensagem" rows="5" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  </main>

  <!-- Rodapé -->
  <footer>
    <p>&copy; 2026 AgroFuturo. Todos os direitos reservados.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>