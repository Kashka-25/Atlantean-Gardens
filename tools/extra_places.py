"""Places within the realms that come from the card studio, not from build_data.py.

Cassidy, 20 Nov 2026: the Sky Peaks and the Frostveil Expanse are "places within
already existed places". The Sky Peaks are found in the distance of the Sunlight
Realms, and the Frostveil Expanse lives out in the distance of the Hearthlands.
So each is a place (district) of that realm, listed under the realm's Places.
Opening it shows Cassidy's own painting of it (made with ChatGPT from
card-studio/data/far-lands-image-prompts.md; originals in
card-studio/art/far-lands/) and its verse, quoted from the card that names it.
Both stay "hidden in mist" (not charted on the Atlas map).

Each is also attached to a spot in its realm's painting (Cassidy: "I want these
two locations to be attached to a certain place in these realms. The frostveil
Expanse, attached to the mountains in the distance of the Hearthland Realms").
A soft light glows on that spot in the realm scene, and touching it opens the
place's painting. "spot" is x, y in percent of the 3:2 realm painting: the
Frostveil Expanse sits on the violet peaks behind the Hearthlands' aqueduct,
and the Sky Peaks on the snowy peaks behind the Sunlight Realms' palace.

The card studio's sheet names the realm and this place in the card's Realm and
District columns, so the sync places the card here.

data/world.js is rebuilt by build_data.py from Cassidy's own canon, which
doesn't include these places, so sync_studio_cards.py adds them back each time
it runs. To add them on their own: python tools/extra_places.py (from the site root).
"""
import json
import os
import re

EXTRA_PLACES = [
    {
        "realm": "sunlight-realms", "name": "The Sky Peaks", "image": "assets/places/sky-peaks.jpg",
        "spot": {"x": 33, "y": 11},  # the snowy peaks in the distance behind the palace
        "verse": {"source": "Golden Goat · AG-075", "lines": [
            "High above the Garden, where the paths become cliffs and the cliffs become cloud, lie the Sky Peaks, hidden in mist."]},
    },
    {
        "realm": "hearthlands-realm", "name": "The Frostveil Expanse", "image": "assets/places/frostveil-expanse.jpg",
        "spot": {"x": 54, "y": 23.5},  # the mountains in the distance, behind the aqueduct
        "verse": {"source": "White Rhino · AG-094", "lines": [
            "Far beyond the Garden, where the snow never melts, lies the Frostveil Expanse."]},
    },
]


def slug(s):
    """The same district id the sync gives a card's district."""
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and").replace("'", "").replace("’", "")).strip("-")


def add_extra_places(world):
    """Adds each extra place to its realm's places, or brings it up to date if it's there. Returns the names added."""
    realms = {r["id"]: r for r in world["realms"]}
    added = []
    for place in EXTRA_PLACES:
        realm = realms[place["realm"]]
        fields = {"name": place["name"], "charted": False, "verse": place["verse"], "image": place["image"], "spot": place["spot"]}
        have = next((d for d in realm["districts"] if d["name"] == place["name"]), None)
        if have:
            have.update(fields)
        else:
            realm["districts"].append(fields)
            added.append(f'{place["name"]} ({realm["name"]})')
        realm.setdefault("districtIds", {})[slug(place["name"])] = place["name"]
    return added


if __name__ == "__main__":
    path = os.path.join("data", "world.js")
    raw = open(path, encoding="utf-8").read()
    head, body = raw.split("window.WORLD = ", 1)
    world = json.loads(body.rstrip().rstrip(";"))
    added = add_extra_places(world)
    open(path, "w", encoding="utf-8", newline="\n").write(head + "window.WORLD = " + json.dumps(world, ensure_ascii=False, indent=1) + ";\n")
    print(f"places added: {', '.join(added) or 'none (already there)'}")
