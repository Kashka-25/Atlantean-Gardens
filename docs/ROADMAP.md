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

### Doors beyond the Garden (Cassidy, 23 Nov 2026)
The four archways painted in the corners of the Atlas home map lead *beyond* the
Garden, to worlds that teach about other natural plant medicines. The seven realms
stay as they are. On the map now: a pale light at each archway and a banner saying
the door is "A work in progress". Opening it shows a "Work in progress" panel
(`DOORS` in `js/atlas.js`).
- [ ] **The Kingdom of Fungi** (mushroom arch, bottom right; Cassidy's own pick).
- [ ] **The Realm of Ritual** (moonlit ruins, bottom left): "cacao, blue lotus, and
      other alternatives like that". Cassidy: "majorly important to for reminding
      people about the sacredness of life".
- [ ] **The Deep** (crystal sea cave, top right): medicines of the sea.
- [ ] **From Plant to Pharmacy** (sunlit flowering arch, top left): where today's
      medicines began.
- Psychedelic plants have no door of their own. Cassidy: "it is best if it is split
  into all the doors as it is present in so many different realms".
- Still open: the corners other than Fungi (Claude's suggestion); whether The Deep
  covers sea plants and algae only, or sea creatures too; each world's guide, art
  and content.

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
