const parallax = document.querySelectorAll('.parallax');
let windowWidth = null;

(() => {
  function getWindowWidth() {
    windowWidth = document.querySelector('body').clientWidth;
  };

  getWindowWidth();

  window.addEventListener('resize', () => getWindowWidth())
})();

Array.from(parallax).forEach(parallax => {
  const layers = parallax.children;
  const parent = parallax.parentNode;
  const parentOffsetTop = parent.offsetTop;

  function moveLayers (scrollOffset) {
    Array.from(layers).forEach(layer => {
      const divider = layer.dataset.speed;
      const strafe = scrollOffset * divider / (-60);

      layer.style.transform = `translateY(${ strafe }%)`;
    });
  }

  window.addEventListener('scroll', e => {
    const scrollOffset = window.pageYOffset;

    if (windowWidth > 768 && scrollOffset - parentOffsetTop >= 0) {
      moveLayers(scrollOffset - parentOffsetTop);
    }
  });
});