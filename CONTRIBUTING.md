# Contributing

This is Luis de Oliveira's personal portfolio, so it isn't open to feature
work by default — but typo fixes, accessibility improvements and bug reports
are welcome.

## Reporting a problem

Open an issue using the **Bug report** template. Include the page, your
browser/device, and whether it happens in dark mode, light mode or both.
For security issues, see [SECURITY.md](./SECURITY.md) instead.

## Making a change

1. Fork and clone the repo. There is **no build step** — open `index.html`
   in a browser to run the site.
2. Create a branch: `git checkout -b fix/short-description`.
3. Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) first — especially the
   conventions for the shared nav/footer and the theme/accent system.
4. Before opening a pull request, check:
   - no console errors on the pages you touched
   - phone width (~390 px) and desktop, in **both** light and dark themes
   - any new motion respects `prefers-reduced-motion`
   - new colors keep at least 4.5:1 contrast for text
5. Use clear commit messages in the style already used here
   (`feat:`, `fix:`, `docs:`, `ci:`).
6. Open a pull request using the template. CI (lint, internal links, secret
   scan, CodeQL) must pass.

## Ground rules

- Keep it dependency-free: plain HTML/CSS/vanilla JS, no frameworks or bundlers.
- Never commit secrets, personal data, or unoptimised large files.
- Content about Luis (experience, education, projects) is his to change.
