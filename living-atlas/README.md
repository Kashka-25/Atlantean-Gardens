# Atlantean Gardens: The Living Atlas (work in progress)

A static, single-page preview of the full Atlantean Gardens experience, built
9 Nov 2026. It follows the "Atlas interface 2nd concept" art in
`OneDrive\Documents\Atlantean Gardens\Atlas World\`.

Every name, story, quote and image comes from Cassidy's own material. Nothing
is invented: empty fields quote Manuscript V instead of being filled in. Published as a work in progress at `/living-atlas/` on the Atlantean Gardens site.

## Run it

```bash
python -m http.server 8765 --directory dream-experience
```

Then open http://localhost:8765. Opening `index.html` directly also works,
because there is no fetch; the data loads from `data/world.js`.

## What's in it

| Screen | Content | Source |
|---|---|---|
| Threshold | New tree emblem, trident wordmark and the introduction's closing lines | logo files from Cassidy (9 Nov 2026), `INTRODUCTION Page.docx` |
| Atlas | Painted map, 8 glowing realm pins | `Seven Realm Atlas.png` |
| Realm drawer | Painting, tagline, themes, **the tale** (verses quoted from the manuscripts, ending on a reflective nudge), places (22 with their own verse), look and feel, keepers and strains | 6 realm paintings, `The Atlas 7 Worlds.docx`, `living-atlas-prototype/data/realms` |
| Strains | 100 collector cards (fronts and backs): 87 placed on the Atlas, 13 "not yet on the Atlas" | `AG Cards/`, `Character Cards/`, `living-atlas-prototype/data/characters`, and the card studio (`card-studio/strains.xlsx`, `card-studio/out/`) |
| Keepers | Hall of Living Portraits, 5 keeper pages | `The Hll Of Living Portraits.png`, `Character BIBLE.docx` |
| Lore | 13 manuscripts with provenance and opening inscription | `13 Manuscripts/*.docx` |
| Journey | Discovery progress, saved only in the visitor's browser | none |

## Lore

`tools/lore.py` pairs each realm, and every place whose name echoes a
manuscript, with passages quoted word for word from the 13 manuscripts, each
with its source. No new lore is written. Pages that are still empty quote
Manuscript V: "The Herbarium shall therefore never be complete."

## Rebuild

1. Extract the manuscript `.docx` files to `.txt`, one file per manuscript.
   The first line of each must be "The Atlantean Archives".
2. Prepare the card art:
   `python tools/prep_cards.py "<Atlantean Gardens folder>" .`
   This writes `assets/cards/` and `data/cards.json`.
3. Build the data:
   `python tools/build_data.py ../living-atlas-prototype/data <manuscript-txt-dir> data/world.js`

Realm paintings, keeper crops and the map are in `assets/`. They were resized
from the originals with Pillow.

Cards finished in the card studio are brought in by
`python tools/sync_studio_cards.py <card-studio dir>` (run from `living-atlas/`).
For every row marked "Card done" in `card-studio/strains.xlsx` it writes the
finished front and the clean back from `card-studio/out/` (never the
`-back-qr.png` print version) at 560 px wide; refreshes type, THC and lineage
on pages that came from the studio; and adds a page, in the sheet's realm and
district, for any card the Atlas doesn't have yet. When Cassidy has a card
redone, `--refill <web id>` rebuilds that page from the sheet (new story,
realm and profile) in the same place. `--only <web id> ...` brings in just
those cards, so finished cards Cassidy hasn't checked yet stay off the
Atlas. These pages live in
`data/world.js` directly, not through `build_data.py`, so a rebuild would drop
them: re-run the sync after any rebuild. The QR code on each printed back opens
`#/cards/<web id>`.

Some places come from the card studio rather than from Cassidy's original
canon. Cassidy decided (20 Nov 2026) that these are "places within already
existed places", so `tools/extra_places.py` adds each one to its realm's Places:
The Sky Peaks in the Sunlight Realms (Golden Goat), and The Frostveil Expanse in
the Hearthlands (White Rhino), and Panama off the Bubble Coast (Panama Red).
All stay "hidden in mist" (not charted on the
map). Opening one shows Cassidy's own painting of it (`assets/places/<id>.jpg`,
made with ChatGPT from the prompts in `card-studio/data/far-lands-image-prompts.md`;
originals in `card-studio/art/far-lands/`) and its verse, quoted from the card.
Each is also attached to a far spot in its realm's painting: distant mountains,
or for Panama the land across the sea. A soft
light glows there in the realm scene, with no name, so finding it is a surprise.
Touching it teleports the visitor: the place's painting bursts out of the light
to fill the screen, and only then is the place named, with its verse. Its `spot`
in `extra_places.py` gives the position. A place's light only appears once its
painting is in `assets/places/`. The sync adds these places back each time it runs.

Type, THC and lineage were fact-checked against breeders' statements,
competition records and lab data (18 Nov 2026; the evidence is in
`card-studio/data/lineage-factcheck.json`, `lineage-factcheck-set2.json`
to `-set7.json`).
Uncertain lineages say "reported", "disputed" or "breeder's account", and
untested THC figures say "estimate". "Users report relief from" lists what
people who have tried a strain report, with a note that it isn't medical
advice; it never states a medical effect.

## Canon questions for Cassidy (not resolved here)

- **Duplicate codes:** AG-006 is on Grandpa Cookies and on an older Lusty
  Lady card, while the newer Lusty Lady card is AG-014. (Resolved: AG-020
  stays with Pineapple Diesel, and XXX OG is now AG-025.)
- **Keepers:** the Atlas data's keeper notes differ from the Character Bible.
  For example, Coco is "The Founding Gardener". This preview follows the
  Bible. (Resolved: Coco is he/him, and Kasper narrates Alien Mints ×
  Permanent Marker, as its card says.)
- **Realm names:** realms printed on cards ("The Orchard", "The Foundry",
  "Sun Realm"…) aren't among the seven Atlas realms. That's why 14 cards sit
  under "Not yet on the Atlas".
- **Pineapple Pucker:** its back card carries a production note ("verify
  before printing"), so only its front is shown.
- **Celestial Realm and Heart of Atlantis:** they have no dedicated paintings
  yet, so the preview uses a crop of the Atlas map.

## Realm portals (branch `feature/realm-portals`, not live yet)

- Touching a realm on the Atlas dives into it. The map zooms toward the pin
  while a circular portal opens onto the realm's painting.
- Each realm is its own scene (`#/realm/<id>`). Its painting fills the
  screen and can be panned on phones. "Read the tale" opens the realm's
  verses, and "The Atlas" surfaces back to the map.
- Hidden glimmers (the easter eggs) twinkle on the painting, one for each
  strain and Keeper that lives in that realm. Touching one raises its
  collector card out of the light, ready to flip. Finds count toward
  Your Journey.
- **Hiding places** (`HIDING` in `js/atlas.js`): each strain and Keeper hides
  where its Atlas district appears in its painting. Glookies is in the doorway
  of The Baked Leaf, Lilac Diesel × Grape Diamonds among the vineyard
  terraces, Raptor by the road signposts, and so on. Each one has a seeker's
  clue describing what is painted there.
- **Keepers in hiding:** all five Keepers hide in every realm (38 spots), shown
  as tiny half-hidden faces cut from the Hall of Living Portraits. Spotting one
  counts as a sighting on Your Journey. Spots and riddles live in
  `js/hiding.js`.
- **Keeper messages** (`js/messages.js`): every Keeper sighting carries its own
  whispered message, 40 in all, one per Keeper per realm. Each is quoted word
  for word from the manuscripts or the Character Bible (checked automatically)
  and chosen to fit both the Keeper and the realm.
- **Riddles:** every hiding place has a two-line riddle describing what is
  painted there, without naming it outright.
- **2.5D depth:** the painting, a soft out-of-focus foreground and the drifting
  particles move at different speeds as the pointer moves (or, on Android, as
  the phone tilts). This fakes depth without splitting the paintings; true
  layered depth would need each painting separated into layers.
- **Clean Atlas with living labels:** the map is now the unlabelled Atlas
  painting ("Without Bake.png"). Realm names float above it as gently bobbing,
  glowing labels (with each realm's found tally) that open the realm when
  clicked; positions are in `ATLAS.spots` in `js/atlas.js`. The title floats
  over the painting's blank parchment edge.
- **Glass navigation:** the side rail is a floating translucent panel, and the
  Atlas and realm scenes run full-bleed beneath it. The bottom bars are glass
  too, and tuck away into the tree emblem (and open again from it); the
  choice is remembered.
- **Seek panel:** a "Clues" list in every scene, like a Where's Wally card.
  Portraits stay shadowed until found; touching a found one shows its card
  again.
- **Strain pages** put the card centre stage: a large card that tilts with the
  cursor, buttons to show the character or the tale and the plant, an "Up
  close" reader for the small print on card backs, and the realm painting
  glowing behind. The Herbarium details sit below.
- Each scene breathes with ambient life drawn from its visual identity in
  The Atlas 7 Worlds: petals and pollen (Sunlight), rising bubbles (Bubble
  Coast), falling leaves (Living Harvest), crystal glints (Crystal
  Conservatory), embers (Hearthlands), fireflies (Verdant Wilds), stars
  (Celestial), golden motes (Heart of Atlantis).
- Hovering a glimmer whispers the place it hides near, using the strain's or
  Keeper's district from the Atlas data (for example "Near Coco's Old Table").
- The Celestial Realm and the Heart of Atlantis have their own paintings (made
  by Cassidy with ChatGPT, 10 Nov 2026, in the series style), so all eight
  locations now have a dedicated painting.
- Respects reduced motion: no zoom and no ambient particles; it goes straight
  into the scene.
- Source of truth is now `site/living-atlas/`; the older local
  `dream-experience/` folder is superseded.
