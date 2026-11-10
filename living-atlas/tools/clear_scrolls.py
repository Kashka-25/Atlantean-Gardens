"""Lift the painted words off each realm's title scroll.

For every realm painting, the ink inside the scroll's text box is detected
(pixels clearly darker than the parchment around them), widened slightly,
and filled with the surrounding parchment. The parchment, frame, vines and
emblem stay; only the lettering goes. The result is saved as
assets/realms/<id>-clean.jpg; the original painting is left untouched.

The same words are then floated back over the scroll by the page itself
(SCROLL_TEXT in js/atlas.js), so they hover above the realm and stay crisp.

Boxes are in pixels of the 1536x1024 painting: (left, top, right, bottom).
Usage: python tools/clear_scrolls.py   (run from living-atlas/)
"""
import numpy as np
from PIL import Image, ImageFilter

BOXES = {
    "sunlight-realms": (70, 105, 365, 362),
    "bubble-coast-realm": (40, 110, 380, 360),
    "living-harvest-realm": (60, 80, 405, 348),
    "crystal-conservatory-realm": (40, 115, 400, 418),
    "hearthlands-realm": (55, 105, 390, 362),
    "verdant-wilds-realm": (75, 86, 435, 418),
    "celestial-realm": (65, 76, 365, 305),
    "heart-of-atlantis": (65, 90, 365, 303),
}


def _box1d(a, r, axis):
    a = np.moveaxis(a, axis, 0)
    p = np.pad(a, [(r, r)] + [(0, 0)] * (a.ndim - 1), mode="edge")
    c = np.cumsum(p, axis=0, dtype=np.float64)
    c = np.concatenate([np.zeros((1,) + c.shape[1:]), c])
    out = (c[2 * r + 1:] - c[:-2 * r - 1]) / (2 * r + 1)
    return np.moveaxis(out.astype(np.float32), 0, axis)


def blur(a, r):
    """Approximate Gaussian blur: three passes of a box blur on each axis."""
    a = a.astype(np.float32)
    k = max(1, int(round(r * 0.9)))
    for _ in range(3):
        a = _box1d(_box1d(a, k, 0), k, 1)
    return a


for rid, (l, t, r, b) in BOXES.items():
    src = f"assets/realms/{rid}.jpg"
    img = Image.open(src).convert("RGB")
    im = np.asarray(img).astype(np.float32)
    pad = 24
    L, T, R, B = max(0, l - pad), max(0, t - pad), r + pad, b + pad
    region = img.crop((L, T, R, B))
    # a median wide enough to swallow every letter leaves only the parchment
    paperimg = region.filter(ImageFilter.MedianFilter(27)).filter(ImageFilter.MedianFilter(9))
    paper = np.asarray(paperimg).astype(np.float32)
    paper = np.stack([blur(paper[..., c], 2) for c in range(3)], -1)
    orig = im[T:B, L:R]
    # parchment grain: fine texture of the original where it is plain paper
    lum = orig @ np.array([.299, .587, .114], np.float32)
    plum = paper @ np.array([.299, .587, .114], np.float32)
    hf = orig - np.stack([blur(orig[..., c], 2) for c in range(3)], -1)
    clean = np.abs(lum - plum) < 10
    g = np.clip(hf, -8, 8) * clean[..., None]
    grain = np.random.default_rng(3).normal(0, 2.2, lum.shape).astype(np.float32)[..., None]
    fill = paper + g * .0 + grain
    # where to paint: inside the text box, feathered, and only over parchment
    h, w = lum.shape
    m = np.zeros((h, w), np.float32)
    m[t - T:b - T, l - L:r - L] = 1
    m = blur(m, 10)
    on_paper = blur((plum > np.percentile(plum, 35) - 18).astype(np.float32), 8)
    alpha = np.clip(m * np.clip(on_paper * 1.6 - .3, 0, 1), 0, 1)[..., None]
    im[T:B, L:R] = orig * (1 - alpha) + fill * alpha
    Image.fromarray(np.clip(im, 0, 255).astype(np.uint8)).save(
        f"assets/realms/{rid}-clean.jpg", quality=84, optimize=True, progressive=True)
    print(rid, "done")
