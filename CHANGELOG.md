# Changelog

All notable changes to this project. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- **Warm "brick & cream" palette** replacing the blue/green scheme, with a
  light and a dark theme (toggle in the nav; choice is remembered).
- **Daily accent colors** — one accent pair per weekday, a picker in the nav,
  and a footer note. All pairs checked for ≥ 4.5:1 contrast in both themes.
- **Interactive dotted globe** (Brazil ↔ San Antonio, TX) on the home page —
  canvas, no libraries; drag, hover/tap markers, fly-to buttons.
- **Projects filters** (Security, Cloud, Embedded/ICS, Software, Web).
- Scroll progress bar, scroll-reveal, count-up stats, cursor spotlight on cards,
  portrait tilt, back-to-top button.
- **Favicon redesign**: "LF" monogram tile, which also follows the daily accent.
- Repository tooling: CI (HTML/JS lint, internal link check, secret scan),
  CodeQL, Dependabot, issue/PR templates, CODEOWNERS, security policy,
  contributing guide, `.gitattributes`, `.editorconfig`.
- `tools/` scripts that regenerate the globe data and the icon set.

### Changed
- Mobile nav wraps instead of overflowing the viewport.
- `.gitignore` extended to block credentials and deploy-tool configs.
- `README.md` and `ARCHITECTURE.md` rewritten to match the current site.

### Removed
- Duplicate icon copies in `Claude outputs/` are no longer tracked.

## 0.1.0 — Initial site

- Home, About, Experience, Projects and Contact pages.
- Shared nav/footer via `js/partials.js`, Flowing-Menu nav hover, Curved Loop
  hero text, Shape Blur accent, ambient animated background.
- Manual GitHub Pages deploy workflow.
