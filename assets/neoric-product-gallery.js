/* ===========================================================
   neoric-product-gallery.js  
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const $       = sel => document.querySelector(sel);
  const mainEl  = $('#mainSplide');
  const thumbEl = $('#thumbSplide');
  if (!mainEl) return;

  //
  // 1) Splide init
  //
  const main = new Splide(mainEl, {
    type       : 'slide',
    perPage    : 1,
    rewind     : true,
    arrows     : true,
    pagination : true,
    classes    : { pagination: 'splide__pagination neoric-pagination' },
    // mobile breakpoint
    breakpoints: {
      1023: {
        height   : 350,
        arrows   : false,
        padding  : { left: '4%', right: '4%' },
      },
    },
  }).mount();

  //
  // 2) Thumbnails (desktop only)
  //
  let thumb = null;
  function mountThumbs() {
    if (window.innerWidth < 1024 || thumb) return;
    thumb = new Splide(thumbEl, {
      direction    : 'ttb',
      height       : 480,
      perPage      : 5,
      gap          : '8px',
      arrows       : false,
      pagination   : false,
      isNavigation : true,
    });
    thumb.mount();
    main.sync(thumb);
  }
  function destroyThumbs() {
    if (thumb && window.innerWidth < 1024) {
      thumb.destroy();
      thumb = null;
    }
  }

  //
  // 3) Cleanup duplicate paginations
  //
  function cleanPagination() {
    mainEl.querySelectorAll('.neoric-pagination').forEach((p,i) => {
      if (i) p.remove();
    });
  }

  window.addEventListener('resize', () => {
    mountThumbs();
    destroyThumbs();
    cleanPagination();
  });
  main.on('mounted resize', cleanPagination);
  mountThumbs();


  //
  // 4) AJAX Add‑to‑Cart
  //
  const form = $('#neoric-product-form');
  if (form) {
    form.addEventListener('submit', async evt => {
      evt.preventDefault();
      const btn           = form.querySelector('button[type="submit"]');
      const originalLabel = btn.dataset.label;
      btn.disabled        = true;
      btn.textContent     = 'Wird hinzugefügt…';

      const data = new FormData(form);
      const payload = {
        id      : Number(data.get('id')),
        quantity: Number(data.get('quantity') || 1),
      };

      try {
        const res = await fetch('/cart/add.js', {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.description || 'Add to cart failed');
        }

        // update header badge
        const cart = await fetch('/cart.js').then(r => r.json());
        const badge = document.querySelector('.cart-count');
        if (badge) badge.textContent = cart.item_count;

        // success feedback
        btn.textContent = 'Hinzugefügt!';
        setTimeout(() => btn.textContent = originalLabel, 1500);
      } catch (err) {
        console.error('Add to cart error:', err);
        alert('Fehler beim Hinzufügen zum Warenkorb.');
        btn.textContent = originalLabel;
      } finally {
        btn.disabled = false;
      }
    });
  }
});
