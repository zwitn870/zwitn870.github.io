document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Particles.init();
  TypingEffect.init();
  ScrollAnimations.init();
});

const Navigation = (() => {
  function init() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (toggle) {
      toggle.addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('open');
      });
    }

    links.forEach((link) => {
      link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
      });
    });
  }

  return { init };
})();