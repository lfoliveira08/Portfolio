# Interactive Motion & Design Requirements

Last updated: 2026-10-10

_Synced from the "My Website" Claude Project knowledge base — this is the source of truth for interaction/motion decisions. If you update it here, also update it in the Claude Project (or ask Claude to sync it back) so the two don't drift._

## Site-wide anchors (all pages)

- **Navigation:** Flowing Menu (React Bits) — primary nav component across the whole site.
- **Name / tagline text:** Curved Loop (React Bits) — used once, near the hero/name area. Not repeated elsewhere so it stays a signature moment.
- **Accent effect:** Shape Blur (React Bits) — kept, but *scoped small*: a hover accent behind a heading or a thumbnail, never full-page/full-viewport. Large page-wide blur was ruled out as too flashy/hurts legibility for a professional portfolio.
- **Cursor interactivity:** Splash Cursor was ruled OUT — too loud/demo-like (full rainbow fluid sim) for a professional portfolio, and a performance cost on lower-end devices. Replace with a quieter alternative: **ImageTrail** (soft image trail over project thumbnails) or **GlareHover** (light sweep on hover). Final pick TBD at implementation time — try both, keep whichever reads calmer.
- **Overall tone:** professional-first. One signature "wow" moment, restrained motion everywhere else, content stays the star. Rationale: recruiters/clients form an impression in seconds — overloading the page with heavy effects reads as gimmicky rather than crafted.

## Projects page — intentional exception, "creative studio" treatment

This page is allowed to be more expressive than the rest of the site. It should NOT feel like the same restrained professional tone as the homepage/about — it's the one place to lean into "creative studio."

**Concept:** each project case study should feel like opening a book to a spread that highlights the work — a **two-page book layout**:
- Left page: project image/visual.
- Right page: write-up (title, description, role, tech stack, links).
- Background: a cinematic light-beam / glow effect behind the spread, to create a dramatic, gallery-like "spotlight landing on the page" feel. Candidates to compare from React Bits' Backgrounds category: **Beams**, **LightRays**, **Lightfall**, **LightPillar** — preview all four at reactbits.dev/backgrounds and pick whichever reads as "light highlighting the work" rather than sci-fi/gaming.
- Optional: a page-turn style transition when moving between projects, to reinforce the book metaphor.
- Shape Blur can be used more prominently here than on other pages (more creative license on this page specifically) — e.g. behind project titles.

## Implementation note

**Decision made (2026-09-22): vanilla JS/CSS, not React.** The site stays
plain HTML/CSS/JS with no build step, per its own stated goals
(README/ARCHITECTURE.md) — introducing React for a handful of components
would mean adding a bundler/toolchain just for decoration. Every effect
below is a hand-rolled CSS/SVG/JS port of the React Bits component it's
named after, not a 1:1 reimplementation — see each entry for the specific
substitution made.

## Implementation status

- **Flowing Menu → done (homepage nav, applies site-wide via `js/partials.js`).**
  Adapted as a directional fill: on `mouseenter`, JS reads which edge of the
  link the cursor entered from and sets a `--flow-origin` CSS variable; a
  `.nav-flow__fill` element then scales in from that edge
  (`styles/main.css`, `.nav-flow*` rules). This keeps the "flows in based on
  where you came from" feeling of the original without a WebGL/React
  marquee, and reads calmer for a compact top nav.
- **Curved Loop → done (`index.html` hero, used once as intended).**
  An inline SVG `<textPath>` arcing over the hero, animated by
  `initCurvedLoop()` in `js/main.js` via `requestAnimationFrame` (updates
  `startOffset` each frame; loops seamlessly since the text string is
  duplicated once). Skips the animation entirely under
  `prefers-reduced-motion: reduce`.
- **Shape Blur → proof of concept done, one placement (`index.html`,
  "Currently" heading).** `.shape-blur-wrap` / `.shape-blur` in
  `styles/main.css` — a small blurred radial-gradient blob, opacity 0 by
  default, fades in to 0.3 on hover of the wrapped element. Reuse this pair
  of classes anywhere else a scoped accent like this is wanted (About page
  facts, a project thumbnail, etc.) — not yet applied beyond this one spot.
- **Cursor interactivity → GlareHover-style spotlight done (2026-10-10).**
  A soft accent-colored light follows the cursor across cards (`.spotlight`
  in `styles/main.css`, `initSpotlight()` in `js/main.js`; fine-pointer
  devices only). ImageTrail was not built — revisit only if the Projects
  page gets thumbnails.
- **Projects page book layout + light-beam background → not started.**

## Update — 2026-10-10 (colors + interactivity pass)

Decisions and additions made after the first implementation pass. All
vanilla, all respecting `prefers-reduced-motion`.

- **Palette replaced.** The blue/green scheme was dropped for a warm
  "brick & cream" palette taken from Luis's own photos, with dark (default)
  and light themes. Theme toggle lives in the nav; choice stored in
  `localStorage` (`theme`).
- **Daily accent.** Only the accent pair rotates, one per weekday (Sun violet,
  Mon teal, Tue rose, Wed green, Thu orange, Fri indigo, Sat brick). The base
  palette stays fixed so the site keeps one identity. A nav picker lets visitors
  override it (`accent` in `localStorage`); the footer says which accent is
  showing. Every pair is checked for ≥ 4.5:1 contrast in both themes. The tab
  favicon follows the accent too. The ambient background blobs and Shape Blur
  already read `--accent`/`--accent2`, so they follow automatically.
- **Globe (the signature "wow" now lives here as well as Curved Loop).** Home
  page, between "Currently" and "Skills": a draggable dotted globe on plain
  canvas, Brazil ↔ San Antonio, TX. It is scoped to its own section and
  pauses off-screen, so it stays within the "one signature moment, restrained
  elsewhere" rule.
- **Smaller interactions:** scroll progress bar, scroll reveal (staggered),
  count-up hero stats, portrait tilt, back-to-top button, Projects filter chips.
- **Still open:** Projects page "book spread" layout + light-beam background,
  and the optional page-turn transition.
