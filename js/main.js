document.addEventListener('DOMContentLoaded', () => {
  Preloader.init();
  CursorGlow.init();
  ScrollProgress.init();
  Navigation.init();
  Particles.init();
  TypingEffect.init();
  RevealOnScroll.init();
  Counters.init();
  Tilt.init();
});

const Preloader = (() => {
  function init() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
    setTimeout(() => preloader.classList.add('hidden'), 2500);
  }

  return { init };
})();

const CursorGlow = (() => {
  let glow;

  function init() {
    glow = document.getElementById('cursor-glow');
    if (window.matchMedia('(max-width: 768px)').matches) {
      glow.style.display = 'none';
      return;
    }

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  return { init };
})();

const ScrollProgress = (() => {
  function init() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  return { init };
})();

const Navigation = (() => {
  function init() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      updateActiveLink();
    }, { passive: true });

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

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  return { init };
})();

const Counters = (() => {
  function init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.count-up').forEach((el) => observer.observe(el));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);

    function update() {
      const current = parseInt(element.textContent, 10);
      const increment = Math.max(1, Math.ceil(target / 40));

      if (current < target) {
        element.textContent = Math.min(current + increment, target);
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    update();
  }

  return { init };
})();

const Tilt = (() => {
  function init() {
    const cards = document.querySelectorAll('.tilt');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  return { init };
})();
