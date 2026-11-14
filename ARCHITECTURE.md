# Architecture & Project Structure

The map of how the site is put together and why — read this before adding a
page, changing the deploy process, or picking up the motion/design work. Keep
it up to date as decisions change.

Last updated: 2026-11-14

## Goals

A personal portfolio for Luis de Oliveira: Computer Information Systems
student, industrial controls and ICS/OT security researcher, NCAA D1
swimmer. Aimed at recruiters and
collaborators. Professional-first tone, static site, no backend.

## Tech stack

- **HTML5 / CSS3 / vanilla JavaScript** — no framework, no bundler, no build step.
- **Cloudflare** — static hosting behind the custom domain.

No React, bundler, or package manager — and that's staying the case. Decision
made 2026-09-22: the motion work was originally spec'd against React Bits
components, and every one of them was ported to vanilla CSS/SVG/JS instead of
pulling in React. See `design/motion-design-decisions.md` for what each port
substituted.

## Folder structure

```
Portfolio/
├── ARCHITECTURE.md       # This file
├── README.md             # Quickstart: what this is, how to run and deploy it
├── LICENSE               # MIT — covers the code, not the images
├── index.html            # Homepage
├── pages/                # about, experience, projects, contact
├── styles/
│   └── main.css          # Single stylesheet, all pages
├── js/
│   ├── partials.js       # Shared nav + footer, theme toggle, accent default
│   ├── main.js           # Page behaviour: reveals, count-up, spotlight, filters
│   └── globe.js          # Interactive Brazil ↔ Texas globe (homepage only)
├── design/
│   └── motion-design-decisions.md   # Interaction/motion decisions
└── assets/
    ├── images/           # hero-bg.jpg (hero artwork), About headshot, NOTICE.txt
    └── icons/            # favicons
```

**Images are not MIT-licensed.** `LICENSE` covers the code. The `NOTICE.txt`
file in `assets/images/` carves out the photos and personal content — anyone
reusing this code has to swap in their own.

## Conventions

### Shared nav & footer (`js/partials.js`)

Every page has two placeholders instead of hand-written markup:

```html
<nav class="nav" data-nav></nav>
...
<footer class="footer" data-footer></footer>
```

`js/partials.js` fills both in at load time from one definition (`SITE_LINKS`).
**To change a nav label, add a page, or edit the footer, change `partials.js`
once — never copy markup into an individual page.**

It also sets `class="js"` on `<html>` as early as possible. Several effects
hide their elements until JavaScript runs; gating them on `.js` means the page
still reads correctly if scripts fail.

### Adding a new page

1. Add an entry to `SITE_LINKS` in `js/partials.js` (root-relative href + label).
2. Copy the structure of an existing page in `pages/` — head, `data-nav` and
   `data-footer` placeholders, the script tags at the bottom.
3. In the new page's inline script call `renderNav('../', 'pages/your-page.html')`
   (first argument is the path back to the site root: `''` at the root,
   `'../'` inside `pages/`) and `renderFooter()`.
4. Link to it from wherever makes sense.

### Styling

One stylesheet (`styles/main.css`) for the whole site — no CSS-in-JS, no
per-page stylesheets. Keep it that way unless the site grows enough pages that
a single file becomes unwieldy.

### Themes and the accent colour

- **Theme** — dark by default, light available from the nav toggle, stored in
  `localStorage` under `theme`. Tokens are defined on `:root` and redefined
  under `:root[data-theme="light"]`.
- **Accent** — seven palettes, each contrast-checked in both themes. The
  site always uses the one pinned by `DEFAULT_ACCENT` in `js/partials.js`
  (currently `'sat'`, Brick) so the page matches the hero artwork. The nav
  picker that let visitors choose another was removed in Nov 2026. Setting
  `DEFAULT_ACCENT = null` restores the original one-per-weekday rotation.
- The favicon is drawn on a canvas at runtime and follows the accent.

### The feature hero

The homepage opens with `<section class="hero hero--feature">` and every
sub-page header uses `<section class="page-hero page-hero--feature">`. Both are
**modifiers** on the base `.hero` / `.page-hero` rules, so the originals are
untouched.

Each is three layers: `.hero__photo` (the artwork, `object-fit: cover`),
`.hero__scrim` (gradients that keep the copy legible), then the content. The
sub-pages use a different crop and a much heavier scrim — the full-strength
image on the homepage is what makes it feel like an arrival, and that only
works if the other pages stay quiet.

**The stats row lives inside the hero section**, not below it. Anything that
replaces the hero wholesale has to carry `.hero__stats` across or the GPA / D1 /
languages numbers disappear.

The entrance is staged: the photo fades in over 0.7s, then `.hero__copy > *`
rises and un-blurs starting at 0.25s, roughly 70ms apart, with the stats last at
0.6s. That timing is a hero-specific override of the shared `.js .reveal`
system, which otherwise fires the moment an element is on screen. Without the
override the text animates at the same instant as the photo and the whole
sequence reads as one pop rather than an arrival.

### Reduced motion

Every animation on the site is disabled under
`@media (prefers-reduced-motion: reduce)`. If you add motion, add it there too.

## Deployment

**Merging to `main` deploys the site.** There is no manual upload step and no
GitHub Actions workflow in this repo — Cloudflare builds from the repository.
Changes go on a branch and reach `main` through a pull request.

```bash
git checkout -b my-change
git add -A
git commit -m "your message"
git push -u origin my-change   # then open and merge a pull request
```

Then hard-refresh (`Ctrl + Shift + R`). The CDN caches `main.css` and
`partials.js` aggressively, so a normal reload will often serve the old files.

## Domain

Live at **https://www.lfoliveira.com**, served through Cloudflare with HTTPS.

## Design & motion decisions

See [`design/motion-design-decisions.md`](./design/motion-design-decisions.md)
for the interaction and motion spec — nav treatment, the hero, the Projects
page "creative studio" exception, and what was ruled out and why. That file is
the source of truth for those decisions.

## Open decisions / TODOs

- **Portrait** — `assets/images/luis-headshot.png` (UIW team headshot) heads the right-hand
  column on the About page (`.about__portrait`, square crop). It is only
  300x400, so replace it with a higher-resolution original when available.
- **Projects page** — the book-spread layout and light-beam background from the
  design doc are still unbuilt. The page has the standard feature header for now.
- **Nav overflow at 769–900px** — the theme toggle pushes ~19px off-screen,
  causing horizontal scroll. Pre-existing; the nav's breakpoint is 768px but it
  needs more room than that.
- **Private project repos** — the CyberCity and Project RAILROAD repositories
  are private, so their cards on the Projects page have no GitHub button. Add
  the buttons back if the repositories are made public.
