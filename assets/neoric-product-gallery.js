document.addEventListener('DOMContentLoaded', () => {
  /* Thumbnail slider (desktop‑only nav) */
 const thumbs = new Splide('#thumbSplide', {
  direction     : 'ttb',
  perPage       : 4,        // show 4 at once
  fixedWidth    : 100,      // each slide 100px wide
  fixedHeight   : 100,      // each slide 100px tall
  gap           : 10,       // 10px between slides
  isNavigation  : true,
  pagination    : false,
  arrows        : false,
  // no need to set heightRatio now that you give an explicit height
  breakpoints: {
    989: {
      direction   : 'ltr',
      fixedWidth  : 80,
      fixedHeight : 80,
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
    heightRatio : 1,

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
