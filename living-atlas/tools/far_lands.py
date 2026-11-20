"""The far lands: places beyond the seven realms that cards are set in.

Cassidy, 20 Nov 2026: add the places to the map "off in one of the corners".
Each far land shows on the Atlas as a small round painting in the bottom-right
corner, with its own glowing pin. Its words come only from the approved card
that names it, and its paintings are cut from that card's chosen front (no new
art). The card studio's sheet names the place in the card's Realm column, so
the sync places the card there.

data/world.js is rebuilt by build_data.py from Cassidy's own canon, which
doesn't include these places, so sync_studio_cards.py adds them back each time
it runs. To add them on their own: python tools/far_lands.py (from living-atlas/).
"""
import json
import os

FAR_LANDS = [
    {
        "id": "sky-peaks", "name": "The Sky Peaks",
        "tagline": "Where the paths become cliffs and the cliffs become cloud.",
        "tale": [{"source": "Golden Goat · AG-075", "lines": [
            "High above the Garden, where the paths become cliffs and the cliffs become cloud, lie the Sky Peaks, hidden in mist."]}],
        "pin": {"x": 85.5, "y": 77},
    },
    {
        "id": "frostveil-expanse", "name": "The Frostveil Expanse",
        "tagline": "Far beyond the Garden, where the snow never melts.",
        "tale": [{"source": "White Rhino · AG-094", "lines": [
            "Far beyond the Garden, where the snow never melts, lies the Frostveil Expanse."]}],
        "pin": {"x": 74.5, "y": 77},
    },
]


def add_far_lands(world):
    """Adds any far land the Atlas doesn't have yet, after the seven realms and the Heart. Returns the ids added."""
    have = {r["id"] for r in world["realms"]}
    order = max((r.get("order") or 0) for r in world["realms"])
    added = []
    for land in FAR_LANDS:
        if land["id"] in have:
            continue
        order += 1
        world["realms"].append({
            "id": land["id"], "name": land["name"], "order": order, "number": "", "far": True, "icon": "star",
            "tagline": land["tagline"], "themes": [], "visual": [], "notes": [], "districts": [], "tale": land["tale"],
            "districtIds": {}, "pin": land["pin"], "image": f"assets/realms/{land['id']}.jpg",
            "medallion": f"assets/realms/{land['id']}-medallion.jpg",
        })
        added.append(land["id"])
    return added


if __name__ == "__main__":
    path = os.path.join("data", "world.js")
    raw = open(path, encoding="utf-8").read()
    head, body = raw.split("window.WORLD = ", 1)
    world = json.loads(body.rstrip().rstrip(";"))
    added = add_far_lands(world)
    open(path, "w", encoding="utf-8", newline="\n").write(head + "window.WORLD = " + json.dumps(world, ensure_ascii=False, indent=1) + ";\n")
    print(f"far lands added: {', '.join(added) or 'none (already there)'}")
