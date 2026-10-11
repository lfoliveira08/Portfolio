# Architecture

A short guide to how the site is put together.

## Goals

- **Professional first:** one signature moment (the globe), restrained motion elsewhere.
- **Static and dependency-free:** no backend, framework, bundler or build step.
- **Easy to maintain:** one stylesheet, and the nav/footer defined in one place.
- **Accessible:** readable contrast in every theme, keyboard-friendly controls,
  reduced motion respected.

## Layout

```text
index.html           Home
pages/               about, experience, projects, contact
styles/main.css      All styles
js/partials.js       Nav, footer, theme, accent, tab icon, ambient background
js/main.js           Scroll progress, reveal, count-up, spotlight, tilt, filters
js/globe.js          Globe (home page only); land dots are embedded
assets/images        Portrait
assets/icons         Tab icons
```

## How a page loads

Every page ends with the same three scripts, in this order:

```html
<script src="js/partials.js"></script>
<script>
  renderNav('', 'index.html');   // '' at the root, '../' inside pages/
  renderFooter();
</script>
<script src="js/main.js"></script>
<!-- index.html only: --> <script src="js/globe.js"></script>
```

- **`partials.js`** first applies the saved theme and accent, then fills the
  `<nav data-nav>` and `<footer data-footer>` placeholders from one definition
  (`SITE_LINKS`). To change a nav label or the footer, edit it there once —
  never copy nav markup into a page.
- **`main.js`** adds the interactions. Each block does nothing if its markup isn't on the page.
- **`globe.js`** draws the globe from a list of land-dot coordinates (Natural
  Earth 110m, public domain). It pauses when off-screen and follows the theme
  and accent colors.

## Theming

All colors are CSS custom properties in `styles/main.css`.

- **Base palette** (`--bg`, `--surface`, `--text`, …): dark by default;
  `:root[data-theme="light"]` overrides it.
- **Accent pair** (`--accent`, `--accent2`): one per weekday via
  `:root[data-accent="mon"]` (and a light-theme variant). `partials.js` picks
  today's accent unless the visitor chose one. Both choices are kept in
  `localStorage` (`theme`, `accent`) — nothing is sent anywhere.
- **Tab icon:** the "LF" monogram is drawn on a canvas in the current accent color.

**Contrast rule:** every accent must reach at least 4.5:1 against the
backgrounds in both themes, and button text must reach 4.5:1 against the accent.

## Common tasks

- **Add a page:** add it to `SITE_LINKS` in `partials.js`, copy an existing page
  in `pages/`, and call `renderNav('../', 'pages/your-page.html')` plus `renderFooter()`.
- **Add a project:** copy a card on the Projects page and set `data-cats` to any of
  `security cloud embedded software web`.
- **Add an accent:** add it to `ACCENTS` in `partials.js` and its two CSS rules
  (dark and light) in `main.css`, then check the contrast rule.

## Accessibility and motion

With `prefers-reduced-motion` on, the ambient background, hero text loop, scroll
reveal, count-up, tilt and globe spin are disabled or made instant. Controls are
real buttons with labels, the accent menu closes on Escape, and the globe has a
text label. Cursor-only effects apply only on devices with a fine pointer.

## Deployment

The site is plain static files, deployed with **Cloudflare Pages** from the
`main` branch (no build command, output directory = repo root).

## Known limitations

- A returning light-theme visitor may see a brief dark flash, because the saved
  theme is applied when `partials.js` runs at the end of `<body>`. A tiny inline
  script in `<head>` would fix it.
- Modern browsers only (the site uses `color-mix()` and `aspect-ratio`).
