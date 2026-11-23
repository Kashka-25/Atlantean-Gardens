# Roadmap

Items are grounded in files that exist today (this repo and the two
prototype READMEs). Nothing here adds story or world content.

## Now
- [x] Fix GitHub Pages build status — `.nojekyll` added on `fix/pages-build`
      (pending merge; the merge push triggers a fresh build).
- [x] **The Living Atlas is the home** (Cassidy, 20 Nov 2026): "I want the home page
      to be the living atlas. This is our discovery. the shop i want us to eventually
      buuild into it later down the track". Then: "I think we should get rid of
      the main site compeltely and make this atlas experience the new main site".
      The Atlas now lives at the site root, and the old main site (about, shop,
      members) is deleted.

- [ ] **The site's domain is atlanteangardens.org** (Cassidy, 23 Nov 2026: "We now own:
      atlanteangardens.org"). `CNAME` sets it as the Pages custom domain once
      DNS resolves; then turn on Enforce HTTPS. QR codes on the card backs point there.

## Later
- [ ] Build the shop into the Living Atlas.

### The Living Atlas (first prototype notes)
- [ ] Add per-realm background art to `assets/realms/` (README: placeholder gradient today).
- [ ] Add strain card and keeper portrait art; the detail panel is text-only so far.
- [ ] Nudge map pin positions in-browser (README: estimated).
- [ ] Not built yet per README: district-level zoom, card/tarot overlay rendering,
      saving "discovered" state across sessions (Supabase noted as a later option).

### The Next.js MVP (whether it's kept isn't decided)
- [ ] Add real artwork under `public/images/` (only `mango-kush.png` and mascot images exist).
- [ ] Wire the data layer in `lib/data.ts` to Supabase (README step 1).
- [ ] Printify product IDs in `data/merch.json` (step 2), Stripe checkout route (step 3).
- [ ] QR codes on card backs (step 4), Cloudflare R2 for images (step 5).
- [ ] Deploy (README: built for Netlify, env vars from `.env.example`).
- [ ] README's "What's built" still lists a Strain Archive; `/strains` now redirects
      to `/characters` — tidy the README.

### The public site
- [x] How `site/` relates to the Atlas: the Atlas *is* the site, at the root
      (20 Nov 2026). Cassidy on the about page: "The Atlas and the expereince
      itself is the about page." `living-atlas/` keeps a small redirect for card
      links and QR codes, and `404.html` sends unknown addresses to the root.
