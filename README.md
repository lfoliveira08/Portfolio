# Luis de Oliveira — Personal Portfolio

> A personal portfolio website inspired by clean, data-driven design — built with HTML, CSS, and JavaScript.

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Hosting](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-f38020)

---

## 🚀 Live Site

Not published yet. The site will be hosted on Cloudflare Pages under a custom
domain (see Deployment below) — no live link here until then.

---

## 📁 Project Structure

```
LuisDeOliveira_/
├── index.html          # Homepage
├── pages/              # Sub-pages (about, experience, projects, contact)
├── styles/             # CSS stylesheets
├── js/
│   ├── partials.js     # Shared nav + footer — edit once, applies everywhere
│   └── main.js         # Page behavior/interactions
├── design/             # Motion/interaction design decisions
└── assets/
    ├── images/         # Photos and visuals
    └── icons/          # SVG icons and logos
```

Every page has a `<nav data-nav>` and `<footer data-footer>` placeholder;
`js/partials.js` fills them in at load time. **To change the nav links or
footer text, edit `js/partials.js` once — you don't need to touch every
HTML file anymore.**

**For the full picture** — conventions, how to add a page, deploy process,
open decisions — see [`ARCHITECTURE.md`](./ARCHITECTURE.md). For the
planned nav/hero/projects-page motion treatment, see
[`design/motion-design-decisions.md`](./design/motion-design-decisions.md).

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, flexbox, grid, animations
- **Vanilla JavaScript** — shared nav/footer via `partials.js`, plus page interactions
- **Cloudflare Pages** — free static hosting, files uploaded manually (see below)

---

## 📌 Pages

- [x] Home
- [x] About
- [x] Experience
- [x] Projects
- [ ] Contact — structure is in place, but needs real contact details (see the TODO comment in `pages/contact.html`)

---

## 🔧 Local Development

```bash
# Clone the repo
git clone https://github.com/lfoliveira08/LuisDeOliveira_.git

# Open in browser
open index.html
```

No build step and no local server required — `partials.js` renders the
nav/footer with plain JavaScript (no `fetch`), so double-clicking
`index.html` still works.

---

## 📦 Deployment

Hosted on **Cloudflare Pages** (free). Deploys are **manual** (direct
upload), so nothing goes live until you upload it. GitHub isn't involved.

1. Put just the site files in a folder: `index.html`, `pages/`, `styles/`,
   `js/`, `assets/`. Leave out `.git/`, `.github/`, `design/` and the `.md`
   files.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Upload assets**. Name the project, then drag the folder in and deploy.
3. To update the site later: open the project → **Create deployment** and
   upload the folder again. Older deployments can be rolled back in one click.
4. Custom domain: project → **Custom domains → Set up a domain**. HTTPS is
   issued automatically.

---

## ✍️ Author

**Luis de Oliveira** · [GitHub](https://github.com/lfoliveira08)

---

*© 2026 Luis de Oliveira*
