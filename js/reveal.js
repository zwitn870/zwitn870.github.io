const RevealOnScroll = (() => {
  function init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    observeSkillBars();
  }

  function observeSkillBars() {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            const pct = entry.target.querySelector('.skill-bar-pct');
            const width = fill.dataset.width;
            fill.style.width = width + '%';
            animatePct(pct, parseInt(pct.dataset.target, 10));
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.skill-bar').forEach((el) => barObserver.observe(el));
  }

  function animatePct(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    function tick() {
      current = Math.min(current + step, target);
      el.textContent = current + '%';
      if (current < target) requestAnimationFrame(tick);
    }

    tick();
  }

  return { init };
})();
