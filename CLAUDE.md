# Atlantean Gardens — notes for Claude

## This repo (`site/`)
Public static site for Atlantean Gardens ("Atlantis Rising: Myth Made Medicine"),
served by GitHub Pages from `main` at https://kashka-25.github.io/Atlantean-Gardens/.
Plain HTML/CSS/JS, no build step:
- `living-atlas/` — the Living Atlas, the home and main experience (see its README).
- `index.html` — redirects to `living-atlas/`, carrying over any `?search` and
  `#hash`, so old links and QR codes keep working.
- `members.html`, `shop.html`, `about.html` — retired (20 Nov 2026); each
  redirects to the Atlas. Cassidy on the about page: "The Atlas and the
  expereince itself is the about page." The old pages, `members.js`,
  `members.css`, `styles.css` and `script.js` are in git history.
- `logo-white.png`, `tea-ceremony.png` — no page uses them now; kept in case
  other sites link to them.
- `.nojekyll` — tells Pages to publish files as-is (no Jekyll pass).

**The Living Atlas is the home (Cassidy, 20 Nov 2026):** "I want the home page
to be the living atlas. This is our discovery. the shop i want us to eventually
buuild into it later down the track". So the Living Atlas is the experience, and
the shop will be built into it later.

Pages uses the "deploy from branch" (legacy) source, so every push to `main`
rebuilds and redeploys. Never push `main` directly; work on a branch and open a PR.

## Two prototypes beside this repo (not in git)
Local folder `C:\Users\cassi\Projects\Atlantean-Gardens\` also holds:

- `living-atlas-prototype/` — static "Living Atlas" prototype (vanilla JS,
  data-driven from `data/manifest.json`, `data/realms/*.json`,
  `data/characters/*.json`). Its README names `index-v4.html` as the version
  to build on: sidebar nav, sliding realm drawer, strain pages with tabbed
  sections, collector card overlay. `index.html` is the older v3 zoom view.
  Needs a local static server (`python -m http.server`) because it fetches JSON.
- `mvp-nextjs/` — Next.js 14 (App Router) MVP: home, character archive with
  detail pages and flippable collector cards, merch, about, contact. Content in
  `data/characters/*.json` and `data/merch.json`; `lib/data.ts` is the single
  data layer. `/strains` redirects to `/characters` (characters and strains are
  one entity). README plans Supabase, Printify, Stripe, Cloudflare R2 and Netlify;
  `.env.example` lists those keys, none are wired up.

The Living Atlas grew from the first prototype and now lives in `site/living-atlas/`.
Whether the Next.js MVP is kept hasn't been decided; don't change it, merge it
or port content from it without Cassidy's say-so.

## Brand and story material
Lives in `C:\Users\cassi\OneDrive\Documents\Atlantean Gardens\` (Manuscripts,
AG Cards, Character Cards, Story, Atlas World, Brand Basics). Read for context
only; never modify. Never invent story, realm, character or strain facts —
use only what those documents and the data files already say.

## The guide emblem
Atlantean Gardens is the origin of Cassidy's chimp guide emblem
(`IMG_0758.png` in the brand folder). The same guide hosts Creative Universe,
Cassidy's central portfolio hub (repo `Kashka-25/creative-universe`), where
Atlantean Gardens is listed under Digital Homes -> Worlds & Stories.

## Links
- Hub proposal doc: https://claude.ai/artifact/Bz16tnjtbRq71HYoFKsvVc
- Roadmap: `docs/ROADMAP.md`

## Working rules
- Keep changes small; this is a live public site.
- Check the Pages status after a merge:
  `gh api repos/Kashka-25/Atlantean-Gardens/pages/builds/latest`
