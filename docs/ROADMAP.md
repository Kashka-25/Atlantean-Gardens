# Roadmap

Items are grounded in files that exist today (this repo and the two
prototype READMEs). Nothing here adds story or world content.

## Now
- [x] Fix GitHub Pages build status — `.nojekyll` added on `fix/pages-build`
      (pending merge; the merge push triggers a fresh build).
- [ ] **Decide which prototype to build on** (Cassidy): `living-atlas-prototype/`
      (README: `index-v4.html` is "the version to build on") vs `mvp-nextjs/`.

## After the decision

### If the Living Atlas prototype
- [ ] Add per-realm background art to `assets/realms/` (README: placeholder gradient today).
- [ ] Add strain card and keeper portrait art; the detail panel is text-only so far.
- [ ] Nudge map pin positions in-browser (README: estimated).
- [ ] Not built yet per README: district-level zoom, card/tarot overlay rendering,
      saving "discovered" state across sessions (Supabase noted as a later option).

### If the Next.js MVP
- [ ] Add real artwork under `public/images/` (only `mango-kush.png` and mascot images exist).
- [ ] Wire the data layer in `lib/data.ts` to Supabase (README step 1).
- [ ] Printify product IDs in `data/merch.json` (step 2), Stripe checkout route (step 3).
- [ ] QR codes on card backs (step 4), Cloudflare R2 for images (step 5).
- [ ] Deploy (README: built for Netlify, env vars from `.env.example`).
- [ ] README's "What's built" still lists a Strain Archive; `/strains` now redirects
      to `/characters` — tidy the README.

### Either way
- [ ] Decide how the public `site/` relates to the chosen prototype
      (replace it, link to it, or keep it as the shop/members front).
