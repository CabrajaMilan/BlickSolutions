document.addEventListener('DOMContentLoaded', function () {
  var splideEl = document.getElementById('neoric-splide');
  if (!splideEl) return;

  new Splide(splideEl, {
    type       : 'loop',
    perPage    : 1,
    pagination : true,
    arrows     : true,
    gap        : '1rem',
    breakpoints: {
      768: { arrows: false }
    }
  }).mount();
});
