"""Copies Cassidy's collector-card art into web-sized JPGs and writes data/cards.json.

Fields are exactly what is printed on each card (transcribed in
card-catalog.json). Card files are matched by a unique tail of their
filename in the "AG Cards" folder unless a sub-path is given.

Usage: python prep_cards.py "<Atlantean Gardens brand folder>" <dream-experience dir>
"""
import glob
import json
import os
import sys

from PIL import Image

BRAND, OUT = sys.argv[1], sys.argv[2]

# atlas: id of the strain in the Living Atlas data (None = card exists, not yet on the Atlas)
CARDS = [
    # On the Atlas
    dict(atlas="lusty-lady", code="AG-014", name="Lusty Lady", title="The Floral Siren", printedRealm="The Sunlit Terraces", front="9ae627a30c98cb7d", back="9899c502d055165d"),
    dict(atlas="strawberry-akeil", code="AG-009", name="Strawberry Akeil", title="The Sunshine Bard", printedRealm="The Sunlit Fields", front="b37947c01a98d292", back="a5a5cf7f013c8c52"),
    dict(atlas="honey-melon-kush", code="", name="Honey Melon Kush", title="The Sunkissed Sweetie", printedRealm="The Orchard", front="88fc06d98cbb02a5", back="ac155f0cbf8dd780"),
    dict(atlas="ice-cream", code="AG-012", name="Ice Cream", title="The Gelato Dreamer", printedRealm="The Frosted Coast", front="bf808599e9f11526", back="a28c70fe8fee268d"),
    dict(atlas="lilac-diesel-grape-diamonds", code="AG-008", name="Lilac Diesel x Grape Diamonds", title="The Vineyard Jester", printedRealm="The Vineyard", front="b0fb1aaf6290873c", back="bb65b6c3452114fa"),
    dict(atlas="chemical-bride", code="AG-013", name="Chemical Bride", title="The Alchemical Bride", printedRealm="The Crystal Conservatory", front="8d5267b0ebbd2e02", back="9df6739cd77ba48f"),
    dict(atlas="alien-mints-permanent-marker", code="AG-021", name="Alien Mints × Permanent Marker", title="The Dream Cartographer", printedRealm="The Celestial Archive", front="bf2e40d365437eed", back="898ad4b951cd9880"),
    dict(atlas="glookies", code="AG-011", name="Glookies", title="The Hearth Baker", printedRealm="The Hearth", front="aecd1ecf2545d89b", back="8313821cd2d8289d"),
    dict(atlas="permanent-marker", code="AG-016", name="Permanent Marker", title="The Storykeeper", printedRealm="The Living Archive", front="88b4786506a2ca18", back="a000ef214cc21293"),
    # Cards that exist but are not yet placed on the Atlas
    dict(atlas=None, id="mango-kush", code="AG-002", name="Mango Kush", title="The Sunlit Wanderer", printedRealm="Sun Realm", front="Mango Kush/AG-002 Mango Kush to size.png", back=None),
    dict(atlas=None, id="grandpa-cookies", code="AG-006", name="Grandpa Cookies", title="The Gentle Gardener", printedRealm="The Orchard", front="9012726a5685fcfd", back="b708bead1fd6b27d"),
    dict(atlas=None, id="white-wedding-rbx", code="AG-007", name="White Wedding RBX", title="The Blossom Keeper", printedRealm="The Garden", front="898b4ae193506844", back="8ec0f5206c503af9"),
    dict(atlas=None, id="chocolate-diesel", code="AG-010", name="Chocolate Diesel", title="The Forge Artisan", printedRealm="The Foundry", front="829f15ca1f37fd8a", back="bb316a373d389366"),
    dict(atlas=None, id="purple-alien-og", code="AG-015", name="Purple Alien OG", title="The Starswept Wanderer", printedRealm="The Celestial Expanse", front="af4144bc9d3efba4", back=None),
    dict(atlas=None, id="godfather-og", code="AG-017", name="Godfather OG", title="The Orchard Patriarch", printedRealm="The Ancient Orchard", front="816869f70932a85a", back="99e20778d5f2eadf"),
    dict(atlas=None, id="pineapple-pucker", code="AG-018", name="Pineapple Pucker", title="The Tropical Trickster", printedRealm="The Sunlit Isles", front="a03f5c54774c0303", back=None),
    dict(atlas=None, id="lung-buster", code="AG-019", name="Lung Buster", title="The Timberheart Giant", printedRealm="The Evergreen Grove", front="af6381c57fdccefe", back="8705a03270ee65b8"),
    dict(atlas=None, id="xxx-og", code="AG-020", name="XXX OG", title="The Silent Mountain King", printedRealm="The Pine Crown Peaks", front="a7c2166b54bc04c4", back="90cf095e72c718e0"),
    dict(atlas=None, id="pineapple-diesel", code="AG-020", name="Pineapple Diesel", title="The Tropical Inventor", printedRealm="The Sunlit Isles", front="Character Cards/AG-20 Pineaplle Diesel (D'Nine) Front.png", back="Character Cards/AG-20 Pineapple Diesel (D'Nine) Back.png"),
    dict(atlas=None, id="runtz-layer-cake", code="AG-022", name="Runtz Layer Cake", title="The Festival Baker", printedRealm="Sugar Blossom Market", front="8db9ede37db0e8a6", back="9d1e2bfc45169a59"),
    dict(atlas=None, id="gorilla-zkittlez", code="AG-023", name="Gorilla Zkittlez", title="The Fruit Grove Guardian", printedRealm="The Rainbow Canopy", front="a78e49cd8aa1ce97", back="bdf7cb3582394523"),
    dict(atlas=None, id="blue-dream", code="AG-024", name="Blue Dream", title="The Tidewatcher's Journal", printedRealm="The Sapphire Sea", front="84a7d51d9168fdf3", back="8737181780c9ee0a"),
    dict(atlas=None, id="puro-loco", code="", name="Puro Loco", title="The Keeper of Beautiful Chaos", printedRealm="", front="9eec604f238385bc", back=None),
]

ag_cards = glob.glob(os.path.join(BRAND, "AG Cards", "*.png"))


def find(ref):
    if ref is None:
        return None
    if "/" in ref:
        p = os.path.join(BRAND, ref)
        if not os.path.exists(p):
            raise SystemExit(f"missing {p}")
        return p
    hits = [f for f in ag_cards if os.path.splitext(f)[0].endswith(ref)]
    if len(hits) != 1:
        raise SystemExit(f"{ref}: {len(hits)} matches")
    return hits[0]


def save(src, dst, width=560):
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, quality=78, optimize=True, progressive=True)


os.makedirs(os.path.join(OUT, "assets", "cards"), exist_ok=True)
out = []
for c in CARDS:
    cid = c.get("atlas") or c["id"]
    rec = {k: c[k] for k in ("atlas", "code", "name", "title", "printedRealm")}
    rec["id"] = cid
    for side in ("front", "back"):
        src = find(c[side])
        if src:
            rel = f"assets/cards/{cid}-{side}.jpg"
            save(src, os.path.join(OUT, rel))
            rec[side] = rel
        else:
            rec[side] = None
    out.append(rec)

with open(os.path.join(OUT, "data", "cards.json"), "w", encoding="utf-8") as fh:
    json.dump(out, fh, ensure_ascii=False, indent=1)
print(len(out), "cards")
