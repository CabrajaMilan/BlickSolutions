/**
 *  Neoric Product Gallery – Splide initialisation
 *  • #thumbSplide – vertical thumbnail rail
 *  • #mainSplide  – main image slider (fade) synced with thumbs
 */
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = new Splide('#thumbSplide', {
    direction: 'ttb',
    fixedWidth: 100,
    gap: 10,
    isNavigation: true,
    pagination: false,
    arrows: false,
    breakpoints: { 989: { direction: 'ltr', fixedWidth: 80 } },
  }).mount();

  const main = new Splide('#mainSplide', {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: true,
    heightRatio: 0.75,
    breakpoints: {
      989: {
        type: 'slide',
        arrows: true,
        pagination: true,
        autoHeight: true
      }
    },
  });

  main.sync(thumbs).mount();
});
