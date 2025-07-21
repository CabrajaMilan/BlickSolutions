/* ===========================================================
   neoric-product-gallery.js   |   v1.3  (2025‑07‑21)
   -----------------------------------------------------------
   - Haupt‑Slider  (#mainSplide)
   - Thumbnail‑Slider (#thumbSplide)  nur ≥ 1024 px
   - sauberes Re‑Init bei Resize
   - keine doppelten Pagination‑Dots
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Helpers ------------------------------------ */
  const $   = sel => document.querySelector(sel);

  /* ---------- DOM‑Elemente ------------------------------- */
  const mainEl  = $('#mainSplide');
  const thumbEl = $('#thumbSplide');
  if (!mainEl) return;                               // Safety‑Net

  /* ---------- Haupt‑Slider (immer) ----------------------- */
  const main = new Splide(mainEl, {
    type       : 'slide',
    perPage    : 1,
    rewind     : true,
    arrows     : true,
    pagination : true,
    classes    : { pagination: 'splide__pagination neoric-pagination' },
    breakpoints: {
      1023: { height: 350, arrows: false },          // Mobile
    },
  }).mount();

  /* ---------- Thumbnails (nur Desktop) ------------------- */
  let thumb = null;                                  // Instanz‑Platzhalter

  function mountThumbs () {
    if (window.innerWidth < 1024 || thumb) return;

    /* 1. Instanz **erstellen** … */
    thumb = new Splide(thumbEl, {
      direction     : 'ttb',
      height        : 480,
      gap           : '8px',
      perPage       : 5,
      arrows        : false,
      pagination    : false,
      isNavigation  : true,
    });

    /* ⚑ … 2. erst **mounten** … */
    thumb.mount();

    /* ⚑ … 3. dann mit dem Haupt‑Slider verknüpfen */
    main.sync( thumb );
  }

  function destroyThumbs () {
    if (thumb && window.innerWidth < 1024) {
      thumb.destroy();
      thumb = null;
    }
  }

  /* ---------- Resize‑Handling ---------------------------- */
  window.addEventListener('resize', () => {
    mountThumbs();
    destroyThumbs();
    cleanExtraPaginations();
  });

  /* ---------- doppelte Dots verhindern ------------------- */
  function cleanExtraPaginations () {
    const paginations = mainEl.querySelectorAll('.neoric-pagination');
    paginations.forEach((p, i) => { if (i) p.remove(); });
  }
  main.on('mounted resize', cleanExtraPaginations);

  /* ---------- initial Desktop‑Mount ---------------------- */
  mountThumbs();          // falls direkt im Desktop‑Viewport gestartet
});
