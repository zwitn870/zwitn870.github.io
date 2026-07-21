const ScrollAnimations = (() => {
  function init() {
    observeFadeElements();
    observeCounters();
  }

  function observeFadeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  }

  function observeCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll('.count-up')
      .forEach((el) => counterObserver.observe(el));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);

    function update() {
      const current = parseInt(element.textContent, 10);
      const increment = Math.ceil(target / 30);

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