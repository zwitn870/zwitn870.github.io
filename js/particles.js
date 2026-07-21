const Particles = (() => {
  let scene, camera, renderer, particles;
  let mouseX = 0, mouseY = 0;

  function init() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.008,
      color: 0xa48fff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 3;

    bindEvents();
    animate();
  }

  function bindEvents() {
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.00005;
    particles.rotation.y += 0.00005;
    particles.rotation.x += (mouseY * 0.02 - particles.rotation.x) * 0.001;
    particles.rotation.y += (mouseX * 0.02 - particles.rotation.y) * 0.001;

    renderer.render(scene, camera);
  }

  return { init };
})();