# Interactive Motion & Design Requirements

Last updated: 2026-11-14

_This file is the source of truth for interaction and motion decisions._

## Site-wide anchors (all pages)

- **Navigation:** Flowing Menu (React Bits) — primary nav component across the
  whole site.
- **Name / tagline text:** ~~Curved Loop (React Bits)~~ — **retired 2026-10-25.**
  The signature moment is now the feature hero. See the 2026-10-25 update below.
- **Accent effect:** Shape Blur (React Bits) — kept, but *scoped small*: a hover
  accent behind a heading or a thumbnail, never full-page. A page-wide blur was
  ruled out as too flashy and bad for legibility on a professional portfolio.
- **Cursor interactivity:** Splash Cursor was ruled OUT — too loud and demo-like
  (full rainbow fluid sim) for a professional portfolio, and a performance cost
  on lower-end devices. Replaced with **GlareHover**: a soft cursor-following
  spotlight on cards. ImageTrail was never built.
- **Overall tone:** professional-first. One signature moment, restrained motion
  everywhere else, content stays the star. Recruiters form an impression in
  seconds, and overloading the page reads as gimmicky rather than crafted.
- **Reduced motion:** every animation is disabled under
  `prefers-reduced-motion: reduce`. This is non-negotiable for anything added.

## Projects page — intentional exception, "creative studio" treatment

This page is allowed to be more expressive than the rest of the site. It should
NOT feel like the restrained tone of the homepage and About — it's the one place
to lean into "creative studio."

**Concept:** each project case study should feel like opening a book to a spread
that highlights the work — a **two-page book layout**:

- Left page: project image or visual.
- Right page: write-up — title, description, role, tech stack, links.
- Background: a cinematic light-beam / glow effect behind the spread, for a
  gallery-like "spotlight landing on the page" feel. Candidates to compare from
  React Bits' Backgrounds category: **Beams**, **LightRays**, **Lightfall**,
  **LightPillar**. Pick whichever reads as "light highlighting the work" rather
  than sci-fi or gaming.
- Optional: a page-turn transition between projects, reinforcing the metaphor.
- Shape Blur can be used more prominently here than elsewhere — e.g. behind
  project titles.

**Status:** not started. The page currently has the standard feature header like
every other sub-page; that header only affects the title area and shouldn't get
in the way of the book-spread work.

## Implementation note

**Decision made 2026-09-22: vanilla JS/CSS, not React.** The site stays plain
HTML/CSS/JS with no build step per its own stated goals. Introducing React for a
handful of decorative components would mean adding a bundler and toolchain for
decoration alone. Every effect below is a hand-rolled CSS/SVG/JS port of the
React Bits component it's named after, not a 1:1 reimplementation.

## Implementation status

- **Flowing Menu → done** (nav, site-wide via `js/partials.js`). Adapted as a
  directional fill: on `mouseenter`, JS reads which edge the cursor entered from
  and sets `--flow-origin`; `.nav-flow__fill` then scales in from that edge.
  Keeps the "flows in from where you came" feel without a WebGL marquee, and
  reads calmer in a compact top nav.
- **Curved Loop → built 2026-10, retired 2026-10-25, code deleted 2026-11-14.**
  It lives on only in git history.
- **Shape Blur → done, one placement** (`index.html`, "Currently" heading).
  `.shape-blur-wrap` / `.shape-blur` in `main.css`. Reuse that pair anywhere a
  scoped accent is wanted.
- **GlareHover spotlight → done** (2026-10-10). `.spotlight` in `main.css`,
  `initSpotlight()` in `js/main.js`; fine-pointer devices only.
- **Feature hero → done** (2026-10-25). See below.
- **Projects book layout + light-beam background → not started.**

## Update — 2026-10-10 (colours + interactivity)

- **Palette replaced.** The blue/green scheme was dropped for a warm "brick &
  cream" palette taken from Luis's own photos, with dark (default) and light
  themes. Toggle in the nav, stored in `localStorage` under `theme`.
- **Daily accent.** One accent pair per weekday. **Superseded 2026-10-25.**
- **Globe.** Homepage, between "Currently" and "Skills": a draggable dotted
  globe on plain canvas, Brazil ↔ San Antonio. Scoped to its own section and
  pauses off-screen, so it stays within the one-signature-moment rule.
- **Smaller interactions:** scroll progress bar, staggered scroll reveals,
  count-up hero stats, portrait tilt, back-to-top button, Projects filter chips.

## Update — 2026-10-25 (feature hero)

The hero was rebuilt around a single piece of artwork, and the treatment
propagated to every page.

- **Homepage hero.** `index.html` opens with
  `<section class="hero hero--feature">`: `assets/images/hero-bg.jpg` full-bleed
  behind a scrim, the name small above an eyebrow, a plain descriptive headline,
  a lede and a pill CTA. The existing stats row lives **inside** the hero
  section — anything replacing the hero wholesale must carry it across or the
  GPA / D1 / languages numbers vanish.
- **Curved Loop retired.** It and the feature hero were both doing the
  "signature name moment" job, which broke the one-moment rule. The hero won.
- **Page headers.** All four sub-pages use `page-hero--feature`: a different,
  harder-dimmed crop of the same artwork at roughly 40% the homepage height,
  plus the accent rule before the eyebrow. The lighter treatment is deliberate —
  the full-strength image on the homepage is what makes it feel like an arrival,
  and that only works if the other pages stay quiet. It also survives the light
  theme far better at this opacity.
- **Staged entrance.** The photo fades in over 0.7s; `.hero__copy > *` rises and
  un-blurs from 0.25s, 70ms apart; the stats land at 0.6s (halved 2026-11-10 — the hero sat blank for seconds). This is a
  hero-specific override of the shared `.js .reveal` system, which otherwise
  fires as soon as an element is on screen. Without the override the text
  animates at the same instant as the photo and the sequence reads as one pop
  rather than an arrival. **This was shipped broken once and fixed on 2026-10-25
  — don't "simplify" it back into the generic reveal.**
- **Daily accent rotation stopped.** The artwork is a fixed warm orange, so a
  rotating accent put the headline and buttons in a different colour family from
  the background six days out of seven. `DEFAULT_ACCENT = 'sat'` (Brick) in
  `js/partials.js` pins it. **The seven-colour picker is kept** — visitors can
  still choose, and the choice is remembered. Set `DEFAULT_ACCENT = null` to
  restore the rotation. Footer wording changed from "changes daily" to naming
  the accent.
- **Mobile scrim.** The phone gradient stays light at the top, where the picture
  reads, and deepens through the band the copy occupies. Earlier versions erred
  both ways — artwork invisible, then copy sitting unreadably on the bright part
  of the image.
- **No new files.** Styles went into `main.css` under "Feature hero & page
  headers"; the reveal reuses the existing system with `.hero__copy > *` added
  to the `initReveal` selector in `main.js`. The photo fades via CSS alone, so
  no extra script. This keeps the one-stylesheet, no-build-step convention.
- **A rejected alternative, for the record:** a hand-drawn SVG circuit that drew
  itself stroke by stroke. It followed the accent and both themes automatically
  and cost a few KB, but the photographic version was preferred.

## Update — 2026-10-26 (copy)

- **Headline changed** from "I build secure systems, then *test how they fail*"
  to the plain **"Computer Information Systems student and ICS/OT researcher"**,
  with no italic accent segment. A plain statement looks better plain.
- **Eyebrow** became "University of the Incarnate Word" — it previously repeated
  the headline, and the full name plus location wrapped onto two lines on phones
  and collided with the accent rule.
- **Lede** rewritten to add rather than echo: the testbed work, the swimming,
  the origin.
- **Headline size** dropped from `clamp(2.3rem, 4.8vw, 3.9rem)` to
  `clamp(1.75rem, 3.1vw, 2.7rem)`, and `.hero__copy` widened to 580px. At the
  old size the longer phrase ran to five lines and swamped the artwork.

## Update — 2026-11-10 (polish pass)

- **Accent picker removed from the nav**, and the "Accent: Brick" footer line
  with it. The accent is always the default now; a previously stored pick is
  ignored. The `[data-accent]` rules, `ACCENTS` and `initAccentPicker()` are
  still in place, so restoring it means putting the `.accent-picker` markup
  back in `renderNav()` and reading `localStorage.accent` again.
- **Footer** carries GitHub, LinkedIn and Contact links.
- **Monospace** is reserved for labels, dates and the hero stats. Tags, badges,
  filter chips, nav socials and the footer use Space Grotesk.
- **Homepage headline** raised to `clamp(1.85rem, 3.8vw, 3.2rem)`, copy width
  660px — three lines on desktop and phone.
- **Skills** are chips in two columns. **Featured project cards** take the
  accent border on hover only.
- **Grids** no longer leave an empty slot; emoji replaced by line icons.

## Update — 2026-11-14 (controls focus + cleanup)

- **Copy leans toward controls engineering.** Headline is now "Computer
  Information Systems student working in industrial controls and ICS/OT
  security"; skills gained a "Controls & Automation" group.
- **Projects page** features CyberCity, Project RAILROAD and the Automatic
  Plant Watering System.
- **Globe text column removed.** The heading, lead, Brazil / United States
  buttons and info card are gone; the globe sits centered in its section. The
  markers keep their labels on the canvas.
- **Dead code deleted:** the accent picker (`initAccentPicker()`,
  `syncAccentUI()` and the `.accent-*` rules) and the Curved Loop. The
  `[data-accent]` palettes and `ACCENTS` stay, because the favicon and the
  default accent still use them.
- **Link previews.** Every page has a meta description, a canonical link and
  Open Graph tags.

## Update — 2026-11-15 (navy and gold palette)

- **Palette replaced.** The warm brick-and-cream scheme was dropped for deep
  navy with a gold accent, for a more professional look. In the light theme
  the accent is navy and gold is kept for small highlights, since gold text
  is hard to read on white.
- **Hero artwork recoloured** from orange to gold with a CSS filter
  (`--hero-filter`); `hero-bg.jpg` itself is unchanged.
- **Weekday accents removed.** The seven `[data-accent]` palettes, `ACCENTS`
  and `DEFAULT_ACCENT` are gone; the favicon uses a fixed `FAVICON_COLOR`.
  The static icons in `assets/icons` were recoloured to the same gold.
