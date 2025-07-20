document.addEventListener('DOMContentLoaded', () => {
  /* Thumbnail slider – no changes here if it’s working */
  const thumbs = new Splide('#thumbSplide', {
    direction    : 'ttb',
    perPage      : 4,
    fixedWidth   : 100,
    fixedHeight  : 100,
    gap          : 10,
    isNavigation : true,
    pagination   : false,
    arrows       : false,
    breakpoints  : {
      989: { direction: 'ltr', perPage: 3, fixedWidth: 80, fixedHeight: 80 }
    },
  }).mount();

  /* Main slider */
  const main = new Splide('#mainSplide', {
    type        : 'slide',
    perPage     : 1,
    rewind      : true,
    pagination  : false,    // desktop – no dots
    arrows      : true,
    heightRatio : 1,        // for 480×480

    breakpoints: {
      // ≤768px: show dots + peek + swipe
      768: {
        pagination  : true,
        arrows      : false,
        drag        : true,
        peek        : { before: 20, after: 20 },
        gap         : 10
      }
    },
  });

  main.sync(thumbs).mount();
});
