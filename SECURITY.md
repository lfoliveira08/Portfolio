# Security Policy

This is a static personal portfolio: plain HTML, CSS and JavaScript, no
backend, no database, no user accounts, no forms that send data anywhere.
The attack surface is small, but reports are still welcome.

## Reporting a vulnerability

Please **do not open a public issue** for a security problem.

Use GitHub's private reporting instead:
**Security tab → "Report a vulnerability"** on this repository.

I will respond as soon as I can. Because this is a
personal project maintained by one person, there is no formal SLA.

## What's in scope

- Cross-site scripting or other injection in the site's pages or scripts
- Secrets, credentials or personal data accidentally committed to the repo
- Problems in the GitHub Actions workflows (for example unsafe permissions)

## What this repo deliberately does not contain

- API keys, tokens, passwords, or FTP/SFTP credentials (`.gitignore` blocks the
  common file names, and CI runs a secret scan on every push)
- Photos or files with hidden location metadata (the portrait was checked: no EXIF/GPS)

## Privacy notes for visitors

- No analytics, no cookies, no tracking scripts.
- The browser stores two harmless preferences locally (`theme` and `accent`)
  so your color choices persist. Nothing is sent to a server.
- Fonts are loaded from Google Fonts, so Google receives a standard font request.
