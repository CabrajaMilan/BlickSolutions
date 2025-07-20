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

  const main = new Splide('#mainSplide', {
    type       : 'fade',
    rewind     : true,
    pagination : false, // desktop only
    arrows     : true,
    heightRatio: 1,

    breakpoints: {
      // At widths ≤1024px, switch to a slide view with dots + peek
      1024: {
        type       : 'slide',
        perPage    : 1,
        arrows     : false,      // hide arrows on mobile
        pagination : true,       // show dots on mobile
        peek       : {           // show a sliver of next/prev slide
          before: 20,
          after: 20
        },
        gap        : 10
      }
    },
  });

  main.sync(thumbs).mount();
});
