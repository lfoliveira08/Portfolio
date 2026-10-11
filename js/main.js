// main.js — Portfolio interactions
//
// Nav/footer rendering now lives in partials.js and the "active" link is
// set by renderNav() itself, so this file is for page-level behavior.

console.log('Portfolio loaded ✓');

/**
 * Curved Loop hero signature — vanilla adaptation of React Bits' Curved
 * Loop (see design/motion-design-decisions.md). Animates the <textPath>
 * startOffset with requestAnimationFrame so the name/tagline flows along
 * the arc. Only present on index.html (getElementById returns null, and
 * the IIFE no-ops, on every other page). Respects prefers-reduced-motion.
 */
(function initCurvedLoop() {
  const textPath = document.getElementById('curvedLoopTextPath');
  if (!textPath) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const speedPercentPerSecond = 6;
  let offset = 0;
  let lastTime = null;

  function tick(time) {
    if (lastTime === null) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    offset -= speedPercentPerSecond * dt;
    if (offset <= -50) offset += 50; // text string is duplicated once, so it loops seamlessly every 50%

    textPath.setAttribute('startOffset', `${offset}%`);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/* =====================================================================
   Interactions added Oct 2026 — all vanilla, all quiet by design
   (see design/motion-design-decisions.md). Every effect respects
   prefers-reduced-motion and no-ops on pages that lack its markup.
   ===================================================================== */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Thin gradient bar at the top showing how far down the page you are. */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.textContent = '↑';
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' }));
  document.body.appendChild(toTop);

  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = `scaleX(${pct})`;
    toTop.classList.toggle('is-visible', window.scrollY > 600);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/** Fade/slide elements in as they enter the viewport (staggered per row). */
(function initReveal() {
  const selector = [
    '.hero__text > *', '.hero__portrait', '.hero__stats', '.page-hero__inner > *',
    '.section__eyebrow', '.section__title', '.filters',
    '.current__item', '.skill__group', '.project__card', '.project__full',
    '.fact__card', '.honor__item', '.timeline__item', '.about__text p',
    '.section--cta .section__inner > *'
  ].join(',');
  const items = Array.from(document.querySelectorAll(selector));
  if (!items.length) return;

  // Stagger siblings so grids cascade instead of popping in all at once.
  items.forEach(el => {
    const idx = Array.from(el.parentElement.children).filter(c => c.matches(selector)).indexOf(el);
    el.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 70}ms`);
    el.classList.add('reveal');
  });

  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
})();

/** Hero stats count up once when they scroll into view (3.8+ → 0…3.8+). */
(function initCountUp() {
  const nums = document.querySelectorAll('.stat__num');
  nums.forEach(el => {
    const final = el.textContent.trim();
    const m = final.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!m || REDUCED_MOTION) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split('.')[1] || '').length;
    const suffix = m[2];
    el.textContent = (0).toFixed(decimals) + suffix;
    const run = () => {
      const start = performance.now(), dur = 1200;
      (function step(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(step); else el.textContent = final;
      })(start);
    };
    if (!('IntersectionObserver' in window)) { el.textContent = final; return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); run(); }
    }, { threshold: 0.6 });
    io.observe(el);
  });
})();

/** Soft light that follows the cursor across cards (the "GlareHover" option). */
(function initSpotlight() {
  if (!FINE_POINTER) return;
  document.querySelectorAll('.current__item, .project__card, .project__full, .fact__card, .honor__item')
    .forEach(card => {
      card.classList.add('spotlight');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
})();

/** Gentle 3D tilt on the hero portrait that follows the cursor. */
(function initPortraitTilt() {
  const wrap = document.querySelector('.hero__portrait');
  const img = wrap && wrap.querySelector('.hero__portrait-img');
  if (!img || !FINE_POINTER || REDUCED_MOTION) return;
  wrap.addEventListener('pointermove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  });
  wrap.addEventListener('pointerleave', () => { img.style.transform = ''; });
})();

/** Projects page: filter chips (Security / Cloud / Embedded / Software / Web). */
(function initProjectFilters() {
  const bar = document.querySelector('[data-filters]');
  if (!bar) return;
  const chips = bar.querySelectorAll('.filter-chip');
  const items = document.querySelectorAll('.filter-item');
  const groups = document.querySelectorAll('.filter-group');
  const empty = document.querySelector('[data-filter-empty]');

  function apply(filter) {
    chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
    items.forEach(it => {
      const show = filter === 'all' || it.dataset.cats.split(' ').includes(filter);
      it.classList.toggle('is-hidden', !show);
      if (show) it.classList.add('is-visible'); // in case it was never scrolled into view
    });
    let any = false;
    groups.forEach(g => {
      const has = g.querySelector('.filter-item:not(.is-hidden)');
      g.classList.toggle('is-hidden', !has);
      if (has) any = true;
    });
    if (empty) empty.classList.toggle('is-shown', !any);
  }
  chips.forEach(c => c.addEventListener('click', () => apply(c.dataset.filter)));
})();
