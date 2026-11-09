# Atlantean Gardens: notes for Claude

## This repo (`site/`)
Public static site for Atlantean Gardens ("Atlantis Rising · Myth Made Medicine"),
served by GitHub Pages from `main` at https://kashka-25.github.io/Atlantean-Gardens/.

Since Nov 2026 the whole site is **the idea page**: one self-contained,
scroll-told story that explains the vision. Atlantean Gardens is a
plant-medicine and cannabis guide with a real folklore story woven through it,
bringing love, creativity and joy back to plant medicine. It is labelled
"The idea · in development".
- `index.html`: the page, with all CSS and JS inline.
- `img/`: web-sized copies of Cassidy's own art (Atlas map, realm
  paintings, Keeper portraits, collector cards, new tree emblem and wordmark).
- `idea/index.html`: redirects the old `/idea/` link to the home page.
- `404.html`: sends old links (about/shop/members) back to the home page.
- `.nojekyll`: tells Pages to publish files as-is.

The previous site (home, about, shop, members portal) was retired at
Cassidy's request. It is kept on branch `archive/original-site`.

Pages uses the "deploy from branch" (legacy) source, so every push to `main`
rebuilds and redeploys. Never push `main` directly; work on a branch and open a PR.

## The full rebuild is on hold
Cassidy plans a complete makeover later: an immersive "Living Atlas"
experience. Until then, the idea page stands in for it. Related work:
- Branch `hold/living-atlas-dream` (local only, not pushed): a working Living
  Atlas preview built only from Cassidy's canon. Pushing it would make all the
  card art public, so ask Cassidy first.
- Local folder `C:\Users\cassi\Projects\Atlantean-Gardens\` also holds
  `living-atlas-prototype/` (static, data-driven) and `mvp-nextjs/` (Next.js
  14 MVP). Neither is in git. Which one the rebuild grows from is Cassidy's
  call.

## Brand and story material
Lives in `C:\Users\cassi\OneDrive\Documents\Atlantean Gardens\` (Manuscripts,
AG Cards, Character Cards, Story, Atlas World, Brand Basics). Read for context
only; never modify. Never invent story, realm, character or strain facts.
Use only what those documents and the data files already say.

## Logo
The site uses Cassidy's new logo: a gold tree emblem in a green circle, plus
the trident "Atlantean Gardens" wordmark. On the dark page the wordmark's teal
letters are recoloured to pale sea-foam (`img/logo-wordmark-light.png`). The
Coco mascot emblem (`IMG_0758.png`) is no longer the face of this site.
Atlantean Gardens sits in Cassidy's portfolio hub Creative Universe
(`Kashka-25/creative-universe`) under Digital Homes → Worlds & Stories.

## Links
- Hub proposal doc: https://claude.ai/artifact/Bz16tnjtbRq71HYoFKsvVc
- Roadmap: `docs/ROADMAP.md`

## Working rules
- Keep changes small; this is a live public site.
- Check the Pages status after a merge:
  `gh api repos/Kashka-25/Atlantean-Gardens/pages/builds/latest`
