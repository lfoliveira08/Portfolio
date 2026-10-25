# Luis de Oliveira — Personal Portfolio

> Personal portfolio for a Computer Information Systems student and ICS/OT
> security researcher. Built with plain HTML, CSS and JavaScript — no
> framework, no build step.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Hosting](https://img.shields.io/badge/hosted%20on-Cloudflare-f38020)

---

## 🌐 Live Site

**[www.lfoliveira.com](https://www.lfoliveira.com)**

---

## 📁 Project Structure

```
Portfolio/
├── index.html           # Homepage
├── pages/               # about, experience, projects, contact
├── styles/
│   └── main.css         # One stylesheet for the whole site
├── js/
│   ├── partials.js      # Shared nav + footer, theme, accent picker
│   ├── main.js          # Page behaviour: reveals, count-up, spotlight, filters
│   └── globe.js         # Interactive Brazil ↔ Texas globe (homepage)
├── assets/
│   ├── images/          # hero-bg.jpg (hero artwork), portrait
│   └── icons/           # favicons
├── ARCHITECTURE.md      # Conventions, how to add a page, open decisions
└── LICENSE
```

Every page has a `<nav data-nav>` and `<footer data-footer>` placeholder, and
`js/partials.js` fills them in at load time. **To change nav links or footer
text, edit `js/partials.js` once** — don't copy markup between pages.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for conventions, how to add a page,
and the open decisions list.

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript** — no framework, no bundler, no build step
- **Cloudflare** — static hosting behind the custom domain

---

## ✨ What's on the site

- **Feature hero** — full-bleed artwork behind the headline, with a staged
  entrance: the photo fades in, then the copy rises and un-blurs in sequence.
  Every sub-page carries a quieter, harder-dimmed crop of the same artwork.
- **Dark and light themes** — dark by default, toggled from the nav, remembered
  in `localStorage`.
- **Accent colour** — seven palettes, all contrast-checked in both themes.
  Defaults to Brick (`DEFAULT_ACCENT` in `js/partials.js`) so the page matches
  the hero artwork; visitors can pick another from the nav. Set it to `null`
  to restore the original one-per-weekday rotation. The favicon follows the
  accent.
- **Interactive globe** — draggable canvas globe marking Brazil and San
  Antonio, pauses when off-screen.
- **Motion throughout** — scroll progress bar, staggered scroll reveals,
  count-up stats, cursor spotlight on cards, project filter chips.
- **Reduced motion is respected everywhere.** Every animation is disabled under
  `prefers-reduced-motion: reduce`.

---

## 📌 Pages

- [x] Home
- [x] About
- [x] Experience
- [x] Projects
- [ ] Contact — structure is in place, but the email is still a placeholder

---

## 🔧 Local Development

```bash
git clone https://github.com/lfoliveira08/Portfolio.git
cd Portfolio
```

Then open `index.html` in a browser. No build step and no local server needed —
`partials.js` renders the nav and footer with plain JavaScript rather than
`fetch`, so opening the file directly still works.

One caveat: fonts load from Google Fonts, so offline the page falls back to
system fonts and the type will look different. Everything else works.

---

## 📦 Deployment

**Pushing to `main` deploys the site.** There is no manual upload step and no
GitHub Actions workflow in this repo — the host builds from the repository
directly.

```bash
git add -A
git commit -m "your message"
git push
```

Give it a minute, then hard-refresh (`Ctrl + Shift + R`) — the CDN caches
`main.css` and `partials.js` aggressively, so a normal reload will often show
you the old stylesheet.

---

## ✍️ Author

**Luis de Oliveira** · [GitHub](https://github.com/lfoliveira08) · [LinkedIn](https://www.linkedin.com/in/luis-de-oliveira)

---

*© 2026 Luis de Oliveira · MIT License*
