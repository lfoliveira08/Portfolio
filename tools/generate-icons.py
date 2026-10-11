#!/usr/bin/env python3
"""
tools/generate-icons.py — rebuilds the favicon set from the LF monogram.

Dev-only (needs `pip install pillow`); the site itself has no build step.

    python3 tools/generate-icons.py

Reads  assets/icons/source/lf-monogram.png  (dark letters on transparent)
Writes assets/icons/favicon.ico, favicon-16x16.png, favicon-32x32.png,
       apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png

The tile is the site's default "Brick" accent. At runtime js/partials.js also
draws a tab icon in the current daily accent color; these files are the
static fallback (and what phones use for home-screen icons).
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "assets" / "icons"
BRICK = (232, 116, 79)   # --accent (dark theme, Saturday / default)
INK = (20, 16, 14)       # --bg

mask = Image.open(ICONS / "source" / "lf-monogram.png").convert("RGBA").getchannel("A")
mask = mask.crop(mask.point(lambda v: 255 if v > 40 else 0).getbbox())


def tile(size, radius_frac, fill_frac=0.64):
    s = size * 4  # supersample for smooth edges
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if radius_frac:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * radius_frac), fill=BRICK + (255,))
    else:
        d.rectangle([0, 0, s, s], fill=BRICK + (255,))
    h = int(s * fill_frac)
    w = int(mask.width * h / mask.height)
    layer = Image.new("RGBA", (w, h), INK + (255,))
    layer.putalpha(mask.resize((w, h), Image.LANCZOS))
    img.alpha_composite(layer, ((s - w) // 2, (s - h) // 2))
    return img.resize((size, size), Image.LANCZOS)


for name, size, radius in [
    ("favicon-16x16.png", 16, 0.20),
    ("favicon-32x32.png", 32, 0.22),
    ("android-chrome-192x192.png", 192, 0.22),
    ("android-chrome-512x512.png", 512, 0.22),
]:
    tile(size, radius, 0.74 if size <= 32 else 0.64).save(ICONS / name, optimize=True)

tile(180, 0).save(ICONS / "apple-touch-icon.png", optimize=True)  # iOS rounds the corners itself
tile(256, 0.22).save(ICONS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("icons written to", ICONS)
