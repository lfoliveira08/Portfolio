<div align="center">

# Luis de Oliveira — Portfolio

**A lightweight, dependency-free personal site: cybersecurity, cloud security, embedded systems and D1 swimming.**

[![CI](https://github.com/lfoliveira08/LuisDeOliveira_/actions/workflows/ci.yml/badge.svg)](https://github.com/lfoliveira08/LuisDeOliveira_/actions/workflows/ci.yml)
[![CodeQL](https://github.com/lfoliveira08/LuisDeOliveira_/actions/workflows/codeql.yml/badge.svg)](https://github.com/lfoliveira08/LuisDeOliveira_/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![Vanilla JS](https://img.shields.io/badge/JavaScript-vanilla-f7df1e)

</div>

![Home page, dark theme](./docs/screenshots/home-dark.jpg)

## Highlights

- **Two themes + a daily accent.** Warm brick-and-cream palette in dark and light.
  The accent color changes with the day of the week (seven hand-picked,
  contrast-checked pairs), and visitors can pick their own.
- **Interactive globe.** A dotted, draggable globe built on plain `<canvas>` —
  Brazil ↔ San Antonio, TX — with hover/tap markers and fly-to buttons.
- **Projects you can filter** by Security, Cloud, Embedded/ICS, Software and Web.
- **Quiet, purposeful motion.** Scroll reveal, count-up stats, cursor spotlight on
  cards, a hero text loop and a flowing nav — all of it switched off for visitors
  who prefer reduced motion.
- **Zero dependencies.** Plain HTML, CSS and JavaScript. No framework, bundler,
  package manager or build step. Open `index.html` and it works.
- **Safe by default.** No analytics, cookies or trackers. CI scans for secrets on
  every push.

| Light theme | Globe |
| :---: | :---: |
| ![Home page, light theme](./docs/screenshots/home-light.jpg) | ![Interactive globe](./docs/screenshots/globe.jpg) |

## Pages

| Page | What's there |
| --- | --- |
| **Home** | Intro, current work, the globe, skills |
| **About** | Background, quick facts, honors |
| **Experience** | Work and education timeline |
| **Projects** | Featured research/team projects and personal projects, with filters |
| **Contact** | GitHub, LinkedIn and email |

## Tech stack

- **HTML5**, semantic markup
- **CSS3** — custom properties for theming, grid/flexbox, `color-mix()`
- **Vanilla JavaScript** — shared nav/footer, theme + accent system, interactions, canvas globe
- **Hosting** — static files; see [Deployment](#deployment)

## Run it locally

```bash
git clone https://github.com/lfoliveira08/LuisDeOliveira_.git
cd LuisDeOliveira_
# then just open index.html in a browser
```

There is no build step and no dev server. Everything renders with plain
JavaScript (no `fetch`), so double-clicking `index.html` works too.
A modern browser is required (Chrome/Edge 111+, Safari 16.2+, Firefox 113+).

## Project structure

```text
.
├── index.html                 Home page
├── pages/                     about, experience, projects, contact
├── styles/main.css            The one stylesheet (themes, layout, effects)
├── js/
│   ├── partials.js            Shared nav + footer, theme, daily accent, favicon
│   ├── main.js                Page interactions (reveal, filters, tilt, …)
│   └── globe.js               Canvas globe (land data embedded)
├── assets/
│   ├── images/                Portrait
│   └── icons/                 Favicon set (+ source monogram)
├── design/                    Motion/interaction decisions
├── docs/screenshots/          Images used in this README
├── tools/                     Dev-only scripts (globe data, icon set)
├── .github/                   CI, CodeQL, Dependabot, issue/PR templates
├── ARCHITECTURE.md            How it all fits together — read this next
├── CHANGELOG.md  CONTRIBUTING.md  SECURITY.md  CODE_OF_CONDUCT.md  LICENSE
```

For conventions (adding a page, the theme/accent system, accessibility rules)
see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Quality & security

| Check | What it does |
| --- | --- |
| **CI** (`ci.yml`) | HTML lint, JavaScript syntax check, internal link/asset check, secret scan (Gitleaks) |
| **CodeQL** | Static security analysis of the JavaScript, weekly and on every PR |
| **Dependabot** | Keeps GitHub Actions versions current |
| **Policies** | [Security policy](./SECURITY.md), [contributing guide](./CONTRIBUTING.md), [code of conduct](./CODE_OF_CONDUCT.md), code owners |

Secrets and local-only files are blocked by `.gitignore`. Please report
vulnerabilities privately — see [SECURITY.md](./SECURITY.md).

## Deployment

The site is plain static files, so any static host works. Deploys are
**manual on purpose**, so nothing goes live before it has been reviewed.

**Hostinger (current plan)** — in hPanel open *Websites → Manage → File Manager*
(or use SFTP), then upload `index.html`, `pages/`, `styles/`, `js/` and
`assets/` into `public_html` so `index.html` sits at its root. Attach the
domain, enable the free SSL certificate and turn on *Force HTTPS*.

**GitHub Pages (optional)** — `.github/workflows/deploy.yml` publishes the
repo with *Actions → Deploy to GitHub Pages → Run workflow*. It only runs
when triggered by hand.

Don't upload `.git/`, `.github/`, `design/`, `docs/`, `tools/` or the `.md`
files — the site doesn't need them.

## Status

Live URL: not published yet — it will be added here once the domain is set up.

## Author

**Luis de Oliveira** · [GitHub](https://github.com/lfoliveira08) · [LinkedIn](https://www.linkedin.com/in/luis-de-oliveira)

Released under the [MIT License](./LICENSE).
