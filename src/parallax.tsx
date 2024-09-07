export function initParallaxEffect() {
    const parallaxContainer = document.getElementById('parallax-background');
  
    if (parallaxContainer) {
      document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        parallaxContainer.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  }
  