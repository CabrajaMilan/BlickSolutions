document.addEventListener('DOMContentLoaded', () => {
  /* Thumbnail slider (desktop‑only nav) */
  const thumbs = new Splide('#thumbSplide', {
    direction     : 'ttb',
    fixedWidth    : 100,
    gap           : 10,
    isNavigation  : true,
    pagination    : false,
    arrows        : false,

    // ← add this:
    heightRatio   : 0.5,   // rail height = 50% of width (adjust as needed)

    breakpoints: {
      989: {
        direction   : 'ltr',
        fixedWidth  : 80,
        heightRatio : 0.3  // you can change per breakpoint too
      }
    },
  }).mount();

  /* Main slider */
  const main = new Splide('#mainSplide', {
    type      : 'fade',
    rewind    : true,
    pagination: false,
    arrows    : true,
    heightRatio: 0.75,     // you already have this

    breakpoints: {
      989: {
        type       : 'slide',
        arrows     : true,
        pagination : true,
        autoHeight : true
      }
    },
  }).sync(thumbs).mount();
});
