// partials.js — shared nav & footer for every page.
//
// Edit the nav links or footer text ONCE here and every page picks it up
// automatically — no more copy-pasting the same <nav> into 5 files.

// One accent pair per weekday, index = Date.getDay() (0 = Sunday).
// Colors themselves live in styles/main.css ([data-accent="…"] rules).
const ACCENTS = [{"key": "sun", "name": "Violet", "day": "Sunday", "dot": "#A78BFA"}, {"key": "mon", "name": "Teal", "day": "Monday", "dot": "#2DD4BF"}, {"key": "tue", "name": "Rose", "day": "Tuesday", "dot": "#F4719A"}, {"key": "wed", "name": "Green", "day": "Wednesday", "dot": "#6FCF97"}, {"key": "thu", "name": "Orange", "day": "Thursday", "dot": "#FB923C"}, {"key": "fri", "name": "Indigo", "day": "Friday", "dot": "#818CF8"}, {"key": "sat", "name": "Brick", "day": "Saturday", "dot": "#E8744F"}];

// Theme: apply the saved choice as early as possible (default = dark).
(function applySavedTheme() {
  let t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.add('js');
  // Accent: the weekday's pair, unless the visitor picked their own.
  let a = null;
  try { a = localStorage.getItem('accent'); } catch (e) {}
  const valid = ACCENTS.some(x => x.key === a);
  document.documentElement.setAttribute('data-accent', valid ? a : ACCENTS[new Date().getDay()].key);
})();

const SITE_LINKS = [
  { rootHref: 'index.html', label: 'Home' },
  { rootHref: 'pages/about.html', label: 'About' },
  { rootHref: 'pages/experience.html', label: 'Experience' },
  { rootHref: 'pages/projects.html', label: 'Projects' },
  { rootHref: 'pages/contact.html', label: 'Contact' },
];

/**
 * Renders the nav into the element marked [data-nav].
 * @param {string} basePath - 'from this page to the site root, e.g. "" at
 *   the root or "../" from inside /pages/.
 * @param {string} activeRootHref - which SITE_LINKS entry to mark active,
 *   e.g. "pages/about.html".
 */
function renderNav(basePath, activeRootHref) {
  const navEl = document.querySelector('[data-nav]');
  if (!navEl) return;

  const linksHtml = SITE_LINKS.map(link => {
    const href = basePath + link.rootHref;
    const isActive = link.rootHref === activeRootHref;
    const classes = ['nav-flow', isActive ? 'active' : ''].filter(Boolean).join(' ');
    return `<li><a href="${href}" class="${classes}"><span class="nav-flow__fill" aria-hidden="true"></span><span class="nav-flow__label">${link.label}</span></a></li>`;
  }).join('\n      ');

  navEl.innerHTML = `
    <a href="${basePath}index.html" class="nav__logo">Luis.Oliveira</a>
    <ul class="nav__links">
      ${linksHtml}
    </ul>
    <div class="nav__socials">
      <a href="https://github.com/lfoliveira08" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/luis-de-oliveira" target="_blank" rel="noopener">LinkedIn</a>
    </div>
    <div class="accent-picker">
      <button class="accent-btn" type="button" aria-label="Choose accent color" aria-haspopup="true" aria-expanded="false"></button>
      <div class="accent-pop" hidden>
        <p class="accent-pop__title">Accent color</p>
        <p class="accent-name" data-accent-name></p>
        <div class="accent-dots">
          ${ACCENTS.map(a => `<button class="accent-dot" type="button" data-accent="${a.key}" title="${a.name}" aria-label="${a.name}" aria-pressed="false" style="background:${a.dot}"></button>`).join('')}
        </div>
        <button class="accent-reset" type="button">↺ Use today's accent</button>
      </div>
    </div>
    <button class="theme-toggle" type="button" aria-label="Switch color theme"></button>
  `;

  initAccentPicker(navEl);

  initThemeToggle(navEl.querySelector('.theme-toggle'));

  initNavFlow(navEl);
}

/**
 * "Flowing Menu" hover treatment — vanilla adaptation of the React Bits
 * component (see design/motion-design-decisions.md: site is plain
 * HTML/CSS/JS, so the flow direction here comes from the fill's
 * transform-origin rather than a WebGL/React marquee). Each nav link
 * gets a fill that sweeps in from whichever edge the cursor entered
 * from, instead of a flat color change.
 */
function initNavFlow(navEl) {
  const links = navEl.querySelectorAll('.nav-flow');
  links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const rect = link.getBoundingClientRect();
      const enteredFromLeft = (e.clientX - rect.left) < rect.width / 2;
      link.style.setProperty('--flow-origin', enteredFromLeft ? 'left' : 'right');
    });
  });
}

/**
 * Tab icon (favicon) that follows the daily accent: the "LF" monogram on a
 * rounded tile in the current accent color. Drawn on a canvas from a tiny
 * inlined mask, so there are no extra requests and no cross-origin issues.
 * If anything fails, the static PNG/ICO favicons in assets/icons stay in
 * place (they are the Brick version of the same icon).
 */
const FAVICON_MASK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABgCAYAAACqh6r9AAAE40lEQVR42u2czYscRRTAf/2R3XWzWTaYXYMECXoyJIrgBwSMFxElAUHPCiKip/wFIvEkuelBPMSTnowiCkaSs8SjKBoVxYPiV9SNRFfXSbq7PNQrpmh6uqt7upfpnnrQzDDTH/WrevXq1XtVHQArwOPANUDRXG4EzgNXgD/piTwIJAI+7fESsAcI5JhpiYH/gMj6LZVPl8Jncg8jf8j9Qus+MysRcBC4DHwH3ASsSuEDhyMEfgXeAz4APgY2pQJ6IQeABfn+APCm9NlMjiL1zoDrAny7pSkxPZUI2A/cDbwvkMkE8Az4GbhXgHf1oY/nxVbvFPgX+BoYlVyj5Px/pHIC0YLeSZwb3rakVRPH6z+xVF71seVtqTtE7aLHEk5Qa1dRQ4OfG/HwHt7De3gP7+E9vIf38B7ew3t4D+/hPbyH75V0FWePZpjZhN5UV/DpvLZ8DLwA3CqVMCvJjAAdll9CZ6jOtA0fomP+DwP3zHjDX+yi5ReBH4E7GecArzsaV9VySxfdX0lZtuOO1OpF4G107u8J4C7Gaa4yMXnAaTJA+Uxy0TNCIGwT3hT2KvAZOuW9BbwOvCVdoaoCwpaH39LnxR0ZFiXgETqheVbgywqZAS8DP8h1quGzN9BLZB6V7xMroAt4letzAfC31S2CkhZ6F73AYVpZAd4B3kAvuCisgC49PGWN+ZdLjBCWETooDbIon02PLel6r5X5HDvl3ro+J2npiKTCzwI/WYZuLnz7VCrgK+D5SRo35ImN6XYXxOaEeSM6ZHhjXDeBT4tUf+hTWrMe8NsCu5DGA4dX6BWh69ZIYOTAPMBfA14V4zcC9smc49I8wI/E6F3IO3hDhy+aMxiLnwwZ3p4ZZkVOTjwgUHsukbpMjOIBtbCB3ZCJzRWZXquhwi8CRyRStCn92uwh2K5q/T47OZE4K88BF4FLwBfA58AJF74+t7wJgKwCuy13NpCxfSR82RDhl4BlYM2qCFWHqa9qH0i/TqTPmy0vtVaN9xXelPshdJgqa8LSV7U3oakTjGOD7DR8UKFqQU1VrIq5L1tBifuAx6bR4LikEC6S5ByMov/tT5cWVSXnpzK2X0WHp3Y3Vfk8fCBjZ+BY2FAsbVJSWSaYsMexPMtybjRBlUPgEPAMcD+TQ+HO8IHlMKwBN8vYWWVsbgG+dHzOQoVGmXz+K8DpCsdmjZb29sSWmgXAYeAkcFx+jyqu3d+yIVur0T2iNuCPAk+KATlktZJymBmpmobMxWtTDvcKJ5yn6sIfBp7N3cC1sG0vPJh293VYp1wxOrPxF3AD3Wz9zizb4jqCNC2DWQmyITwjStLdAXCHnPx9iZWdZp69CjwCnCoZkkzhngI+kq6XNXheis73fSPu7+9VXWFlBzy9Y5Tvyjb+wvGWu1Cl2m916OdHls/gstrC7N2PaL6iK3M1fnHBRV2EmOr02Wwaf72JdZxL8fAe3sN7eA/v4T28h/fwHt7De3gP7+E9vIf38B5+zuHtN6SGNa+JdqJhut7tbOL0J9G5wKqFDCF6T8xv6BVVvRMDsQ48jX6TasLkhIX9VtUE+BC94uI2ZnsreqHK7gPOSesZsBS3XVGpdc02evVFZxraRZoqRW8fX5/StizJfaCjbehdwIfohf2/MN4s2KQCFxhvDOrNi0YXBXjvrBf0f3fMT/o08pQWAAAAAElFTkSuQmCC';
let faviconMask = null;
function updateFavicon() {
  try {
    const key = document.documentElement.getAttribute('data-accent');
    const a = ACCENTS.find(x => x.key === key) || ACCENTS[new Date().getDay()];
    const draw = () => {
      const S = 64, c = document.createElement('canvas');
      c.width = c.height = S;
      const g = c.getContext('2d');
      g.fillStyle = a.dot;
      g.beginPath();
      if (g.roundRect) g.roundRect(0, 0, S, S, 14); else g.rect(0, 0, S, S);
      g.fill();
      const h = S * 0.66, w = h * faviconMask.width / faviconMask.height;
      g.drawImage(faviconMask, (S - w) / 2, (S - h) / 2, w, h);
      let link = document.getElementById('dynamic-favicon');
      if (!link) {
        document.querySelectorAll('link[rel="icon"]').forEach(l => l.remove());
        link = document.createElement('link');
        link.id = 'dynamic-favicon'; link.rel = 'icon'; link.type = 'image/png';
        document.head.appendChild(link);
      }
      link.href = c.toDataURL('image/png');
    };
    if (faviconMask && faviconMask.complete) return draw();
    faviconMask = new Image();
    faviconMask.onload = () => { try { draw(); } catch (e) {} };
    faviconMask.src = FAVICON_MASK;
  } catch (e) { /* keep the static favicons */ }
}

/** Today's accent entry (local time). */
function todaysAccent() { return ACCENTS[new Date().getDay()]; }

/** Updates the nav picker + footer label to match the current accent. */
function syncAccentUI() {
  updateFavicon();
  const key = document.documentElement.getAttribute('data-accent');
  const a = ACCENTS.find(x => x.key === key) || todaysAccent();
  const isToday = a.key === todaysAccent().key;
  document.querySelectorAll('.accent-dot').forEach(d => d.setAttribute('aria-pressed', String(d.dataset.accent === a.key)));
  const name = document.querySelector('[data-accent-name]');
  if (name) name.textContent = isToday ? `${a.name} · today's (${a.day})` : `${a.name} · your pick`;
  const foot = document.querySelector('.footer__accent');
  if (foot) foot.innerHTML = isToday
    ? `${a.day}'s accent: <b>${a.name}</b> · changes daily`
    : `Accent: <b>${a.name}</b> (your pick) · changes daily`;
}

/** Popover with 7 color dots; choice is remembered, "today" resets it. */
function initAccentPicker(navEl) {
  const btn = navEl.querySelector('.accent-btn');
  const pop = navEl.querySelector('.accent-pop');
  if (!btn || !pop) return;
  const close = () => { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = pop.hidden;
    pop.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => { if (!pop.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); btn.focus(); } });
  pop.querySelectorAll('.accent-dot').forEach(dot => dot.addEventListener('click', () => {
    document.documentElement.setAttribute('data-accent', dot.dataset.accent);
    try { localStorage.setItem('accent', dot.dataset.accent); } catch (e) {}
    syncAccentUI();
  }));
  pop.querySelector('.accent-reset').addEventListener('click', () => {
    document.documentElement.setAttribute('data-accent', todaysAccent().key);
    try { localStorage.removeItem('accent'); } catch (e) {}
    syncAccentUI();
  });
  syncAccentUI();
}

/** Light/dark toggle — remembers the choice in localStorage (if allowed). */
function initThemeToggle(btn) {
  if (!btn) return;
  const root = document.documentElement;
  const current = () => root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const paint = () => {
    btn.textContent = current() === 'light' ? '☾' : '☀';
    btn.title = current() === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  };
  btn.addEventListener('click', () => {
    const next = current() === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    paint();
  });
  paint();
}

/**
 * Renders the footer into the element marked [data-footer].
 */
function renderFooter() {
  const footerEl = document.querySelector('[data-footer]');
  if (!footerEl) return;
  footerEl.innerHTML = `<p>© 2026 Luis de Oliveira</p><p class="footer__accent"></p>`;
  syncAccentUI();
}

/**
 * Ambient background — vanilla adaptation of React Bits' Aurora/Silk
 * backgrounds (see design/motion-design-decisions.md). Injects three
 * soft, slow-drifting blurred blobs fixed behind the page content so the
 * dark background isn't perfectly flat. Lives here (not per-page HTML)
 * so every page picks it up automatically just by loading partials.js.
 * Motion lives entirely in CSS (.ambient-bg in main.css), including the
 * prefers-reduced-motion fallback — this just mounts the markup once.
 */
(function initAmbientBackground() {
  if (document.querySelector('.ambient-bg')) return;
  const bg = document.createElement('div');
  bg.className = 'ambient-bg';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = `
    <span class="ambient-bg__blob ambient-bg__blob--a"></span>
    <span class="ambient-bg__blob ambient-bg__blob--b"></span>
    <span class="ambient-bg__blob ambient-bg__blob--c"></span>
  `;
  document.body.prepend(bg);
})();
