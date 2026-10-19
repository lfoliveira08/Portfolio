# Architecture & Project Structure

This doc is the map of how the site is put together and why — the thing to
read before adding a page, changing the deploy process, or picking up the
motion/design work. Keep it up to date as decisions change.

## Goals

A personal portfolio for Luis de Oliveira: cybersecurity/cloud security
work, research, and NCAA D1 swimming, aimed at recruiters and collaborators.
Professional-first tone, static site, no dependency on a backend.

## Tech stack (current)

- **HTML5 / CSS3 / vanilla JavaScript** — no framework, no build step.
- **Cloudflare Pages** — free static hosting via manual direct upload (see Deployment).

No React, bundler, or package manager — and that's staying the case.
`design/motion-design-decisions.md` describes motion/interaction work
(Flowing Menu nav, Curved Loop hero signature, Shape Blur accents) that was
originally spec'd against React Bits components; as of 2026-09-22 those are
being ported to vanilla CSS/SVG/JS instead of pulling in React, to keep the
no-build-step setup. See that doc's "Implementation status" section for
what's done vs. pending.

## Folder structure

```
LuisDeOliveira_/
├── ARCHITECTURE.md        # This file — structure, conventions, open decisions
├── README.md               # Quickstart: what this is, how to run/deploy it
├── LICENSE
├── index.html               # Homepage
├── pages/                    # Sub-pages: about, experience, projects, contact
│   ├── about.html
│   ├── experience.html
│   ├── projects.html
│   └── contact.html
├── styles/
│   └── main.css              # Single stylesheet, all pages
├── js/
│   ├── partials.js           # Shared nav + footer (see "Adding a page" below)
│   └── main.js                # Page-level behavior/interactions
├── design/
│   └── motion-design-decisions.md   # Interaction/motion decisions for the site
├── assets/
│   ├── images/
│   └── icons/
├── components/                # Reserved, currently empty — see note below
```

**`components/` is currently unused.** It's kept as a placeholder for if/when
the site adopts real componentization — e.g. if the motion work in
`design/motion-design-decisions.md` ends up pulling in React, this is where
those components would live. Until then, don't add files here just to fill
it; the nav/footer "component" problem is already solved by `partials.js`.

## Conventions

### Shared nav & footer (`js/partials.js`)

Every page has two placeholders instead of hand-written markup:

```html
<nav class="nav" data-nav></nav>
...
<footer class="footer" data-footer></footer>
```

`js/partials.js` fills both in at load time from one definition
(`SITE_LINKS`). **To change a nav label, add a page, or edit the footer,
change `partials.js` once — never copy markup into an individual page.**

### Adding a new page

1. Add an entry to `SITE_LINKS` in `js/partials.js` (root-relative href + label).
2. Copy the structure of an existing page in `pages/` (head, `data-nav`/`data-footer`
   placeholders, the three `<script>` tags at the bottom).
3. In the new page's inline script, call `renderNav('../', 'pages/your-page.html')`
   (the first argument is how far the page is from the site root — `''` for
   `index.html`, `'../'` for anything inside `pages/`) and `renderFooter()`.
4. Link to it from wherever makes sense (usually the homepage CTA or another page).

### Styling

One stylesheet (`styles/main.css`) for the whole site — no CSS-in-JS, no
per-page stylesheets. Keep it that way unless the site grows enough pages
that a single file becomes unwieldy.

## Deployment

Hosted on **Cloudflare Pages**, deployed **manually** (direct upload) on
purpose so unreviewed changes never go live. Upload a folder containing only
the site files (`index.html`, `pages/`, `styles/`, `js/`, `assets/`) via
**Workers & Pages → Create → Pages → Upload assets**. Leave out `.git/`,
`.github/`, `design/` and the `.md` files. GitHub is not used for hosting.

## Domain

No live URL yet (until deployed, the site gets a free `*.pages.dev` address).
The plan is a domain purchased and owned by Luis — Cloudflare Registrar sells
domains at cost. Once it exists:

1. In the Pages project, open **Custom domains → Set up a domain**.
2. Cloudflare creates the DNS record and issues HTTPS automatically.

## Design & motion decisions

See `design/motion-design-decisions.md` for the interaction/motion spec
(nav style, hero treatment, the "creative studio" exception on the Projects
page, and the cursor-effect decision). That file is the source of truth and
is also kept in the "My Website" Claude Project — if one copy is edited,
update the other so they don't drift.

## Open decisions / TODOs

- **Contact page**: structure is in place (`pages/contact.html`) but has a
  placeholder email — replace with real contact info.
- **Cleanup**: delete `.github/workflows/deploy.yml` — it's the old GitHub
  Pages deploy and is no longer used.
- **Domain**: not purchased yet — see "Domain" above.
- **Motion/React decision**: resolved 2026-09-22 — porting to vanilla
  JS/CSS/SVG, no React. Flowing Menu nav, Curved Loop hero signature, and
  a first Shape Blur accent are implemented; the Projects page book
  layout/light-beam background and the cursor-interactivity pick
  (ImageTrail vs. GlareHover) are still open — see
  `design/motion-design-decisions.md`.
