const TypingEffect = (() => {
  const words = ['Software Engineer', 'Full-Stack Developer', 'Open Source Maintainer', 'Discord Bot Developer', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let element = null;

  function init() {
    element = document.getElementById('typing-text');
    if (!element) return;
    type();
  }

  function type() {
    const current = words[wordIndex];

    if (!isDeleting) {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, isDeleting ? 45 : 90);
  }

  return { init };
})();
