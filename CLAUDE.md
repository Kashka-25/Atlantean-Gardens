# Atlantean Gardens — notes for Claude

## This repo (`site/`)
Public static site for Atlantean Gardens ("Atlantis Rising: Myth Made Medicine"),
served by GitHub Pages from `main` at https://atlanteangardens.org/ (Cassidy's domain, 23 Nov 2026:
"We now own: atlanteangardens.org"). The `CNAME` file sets it as the Pages custom domain;
GitHub sends the old https://kashka-25.github.io/Atlantean-Gardens/ addresses there.
DNS at the registrar: apex A/AAAA records to GitHub Pages, `www` CNAME to
`kashka-25.github.io`. Card QR codes point at `https://atlanteangardens.org/#/cards/<id>`.
Plain HTML/CSS/JS, no build step. The site *is* the Living Atlas (see `README.md`):
- `index.html`, `css/`, `js/`, `data/` (`data/world.js`), `assets/`, `tools/` —
  the Living Atlas, at the site root.
- `living-atlas/index.html` — card links and QR codes point at
  `/living-atlas/#/cards/<id>`, so this sends them on to the root, keeping any
  `?search` and `#hash`.
- `404.html` — GitHub Pages shows it for any address that doesn't exist. Card
  short links from the printed QR codes, `/C/<WEB ID>` in capitals (e.g.
  `/C/TERPGASM`; `/c/terpgasm` works too), open that card at `/#/cards/<web id>`,
  and an ID the Atlas doesn't have opens the Strains list. New cards need
  nothing added. Any other unknown address (such as the retired about, shop and
  members pages) goes to the root.
- `.nojekyll` — tells Pages to publish files as-is (no Jekyll pass).

**The Living Atlas is the site (Cassidy, 20 Nov 2026):**
- "I want the home page to be the living atlas. This is our discovery. the shop
  i want us to eventually buuild into it later down the track"
- "I think we should get rid of the main site compeltely and make this atlas
  experience the new main site"
- On the about page: "The Atlas and the expereince itself is the about page."

So the old main site is deleted: the about, shop and members pages, and their
stylesheet, scripts and two images. The 9 Nov idea page (`idea/`) went too
(Cassidy: "Remove it"). It's all in git history. The shop will be
built into the Atlas later.

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

The Living Atlas grew from the first prototype and is now the site itself (`site/`).
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
