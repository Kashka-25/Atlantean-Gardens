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
| Realm drawer | Painting, tagline, themes, **the tale** (verses quoted from the manuscripts, ending on a reflective nudge), places (20 with their own verse), look and feel, keepers and strains | 6 realm paintings, `The Atlas 7 Worlds.docx`, `living-atlas-prototype/data/realms` |
| Strains | 23 collector cards (fronts and backs): 9 placed on the Atlas, 14 "not yet on the Atlas" | `AG Cards/`, `Mango Kush/`, `Character Cards/`, `living-atlas-prototype/data/characters` |
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

## Canon questions for Cassidy (not resolved here)

- **Duplicate codes:** AG-020 is printed on both XXX OG and Pineapple Diesel.
  AG-006 is on Grandpa Cookies and on an older Lusty Lady card, while the
  newer Lusty Lady card is AG-014.
- **Keepers:** the Atlas data's keeper notes differ from the Character Bible.
  For example, Coco is "The Founding Gardener", and one entry calls Coco
  "she". This preview follows the Bible.
- **Realm names:** realms printed on cards ("The Orchard", "The Foundry",
  "Sun Realm"…) aren't among the seven Atlas realms. That's why 14 cards sit
  under "Not yet on the Atlas".
- **Pineapple Pucker:** its back card carries a production note ("verify
  before printing"), so only its front is shown.
- **Celestial Realm and Heart of Atlantis:** they have no dedicated paintings
  yet, so the preview uses a crop of the Atlas map.
