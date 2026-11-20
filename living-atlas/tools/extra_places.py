"""Places within the realms that come from the card studio, not from build_data.py.

Cassidy, 20 Nov 2026: the Sky Peaks and the Frostveil Expanse are "places within
already existed places". The Sky Peaks are found in the distance of the Sunlight
Realms, and the Frostveil Expanse lives out in the distance of the Hearthlands.
So each is a place (district) of that realm, listed under the realm's Places.
Opening it shows Cassidy's own painting of it (made with ChatGPT from
card-studio/data/far-lands-image-prompts.md; originals in
card-studio/art/far-lands/) and its verse, quoted from the card that names it.
Both stay "hidden in mist" (not charted on the Atlas map).

The card studio's sheet names the realm and this place in the card's Realm and
District columns, so the sync places the card here.

data/world.js is rebuilt by build_data.py from Cassidy's own canon, which
doesn't include these places, so sync_studio_cards.py adds them back each time
it runs. To add them on their own: python tools/extra_places.py (from living-atlas/).
"""
import json
import os
import re

EXTRA_PLACES = [
    {
        "realm": "sunlight-realms", "name": "The Sky Peaks", "image": "assets/places/sky-peaks.jpg",
        "verse": {"source": "Golden Goat · AG-075", "lines": [
            "High above the Garden, where the paths become cliffs and the cliffs become cloud, lie the Sky Peaks, hidden in mist."]},
    },
    {
        "realm": "hearthlands-realm", "name": "The Frostveil Expanse", "image": "assets/places/frostveil-expanse.jpg",
        "verse": {"source": "White Rhino · AG-094", "lines": [
            "Far beyond the Garden, where the snow never melts, lies the Frostveil Expanse."]},
    },
]


def slug(s):
    """The same district id the sync gives a card's district."""
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and").replace("'", "").replace("’", "")).strip("-")


def add_extra_places(world):
    """Adds each extra place to its realm's places if it isn't there yet. Returns the names added."""
    realms = {r["id"]: r for r in world["realms"]}
    added = []
    for place in EXTRA_PLACES:
        realm = realms[place["realm"]]
        if any(d["name"] == place["name"] for d in realm["districts"]):
            continue
        realm["districts"].append({"name": place["name"], "charted": False, "verse": place["verse"], "image": place["image"]})
        realm.setdefault("districtIds", {})[slug(place["name"])] = place["name"]
        added.append(f'{place["name"]} ({realm["name"]})')
    return added


if __name__ == "__main__":
    path = os.path.join("data", "world.js")
    raw = open(path, encoding="utf-8").read()
    head, body = raw.split("window.WORLD = ", 1)
    world = json.loads(body.rstrip().rstrip(";"))
    added = add_extra_places(world)
    open(path, "w", encoding="utf-8", newline="\n").write(head + "window.WORLD = " + json.dumps(world, ensure_ascii=False, indent=1) + ";\n")
    print(f"places added: {', '.join(added) or 'none (already there)'}")
