document.addEventListener('DOMContentLoaded', () => {
  /* Thumbnail slider (desktop‑only nav) */
  const thumbs = new Splide('#thumbSplide', {
    direction     : 'ttb',
    fixedWidth    : 100,
    fixedHeight   : 100 * 4 + 10 * 3,  // 4 thumbs of 100px + 3 gaps of 10px
    gap           : 10,
    perPage       : 4,                  // show exactly 4 slides
    isNavigation  : true,
    pagination    : false,
    arrows        : false,
    breakpoints: {
      989: {
        direction   : 'ltr',
        fixedWidth  : 80,
        fixedHeight : 80,               // show as many as fit horizontally
        perPage     : 3
      }
    },
  }).mount();

  /* Main slider */
  const main = new Splide('#mainSplide', {
    type        : 'fade',
    rewind      : true,
    pagination  : false,
    arrows      : true,
    heightRatio : 0.75,

    breakpoints: {
      768: {
        type        : 'slide',
        arrows      : false,    // hide arrows on phones
        pagination  : true,     // show dots on phones
        perPage     : 1,
        autoHeight  : true,
        drag        : 'free'
      }
    },
  });

  main.sync(thumbs).mount();
});
