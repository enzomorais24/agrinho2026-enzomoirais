// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  parallaxElements.forEach(el => {
    const rate = scrolled * -0.5;
    el.style.backgroundPositionY = rate + 'px';
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.topic-card').forEach(card => {
  observer.observe(card);
});

// Hover effects for videos
document.querySelectorAll('iframe').forEach(iframe => {
  iframe.addEventListener('mouseenter', () => {
    iframe.style.transform = 'scale(1.05)';
  });
  iframe.addEventListener('mouseleave', () => {
    iframe.style.transform = 'scale(1)';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});