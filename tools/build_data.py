"""Builds data/world.js for the Atlantean Gardens dream experience.

Every fact comes from Cassidy's own material:
- living-atlas-prototype/data/realms/*.json and characters/*.json (realm ids,
  map districts, strain names, codes, titles, stories, quotes)
- "The Atlas 7 Worlds.docx" (realm taglines, themes, visual identity,
  possible districts) -- transcribed below as REALM_CANON
- "Character BIBLE.docx" (the five Keepers) -- transcribed below as KEEPERS
- the 13 manuscripts (title, provenance and opening inscription), extracted
  from the .docx text files passed on the command line
- card-catalog.json (what is printed on Cassidy's card art), optional

Nothing here is invented. Empty fields stay empty and the UI says so.

Usage: python build_data.py <atlas-data-dir> <manuscript-txt-dir> <out.js> [card-catalog.json]
"""
import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lore import REALM_LORE, DISTRICT_VERSES  # noqa: E402

ATLAS, MSDIR, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
CATALOG = sys.argv[4] if len(sys.argv) > 4 else None

# From "The Atlas 7 Worlds.docx" (Story folder). Order and wording as written.
REALM_CANON = {
    "sunlight-realms": dict(
        number="I", icon="sun", season="Spring",
        tagline="Where every journey begins.",
        themes=["Hope", "Growth", "Joy", "Discovery"],
        visual=["Golden terraces", "Mediterranean-inspired Atlantean architecture", "Flower fields",
                "Citrus orchards", "Wild herbs", "Windmills", "Warm sandstone", "Gentle rivers"],
        notes=["This is the realm of first blossoms.", "The first place every new traveller enters.",
               "It represents spring."],
        districts=["Coco's Courtyard", "The Floral Steps", "Seedling Nursery", "The Bard's Meadow",
                   "Story Circle", "Sunpetal Market", "Morning Orchard"]),
    "bubble-coast-realm": dict(
        number="II", icon="bubbles",
        tagline="Where Atlantis still remembers the sea.",
        themes=["Wonder", "Flow", "Exploration", "Ocean wisdom"],
        visual=["Coral forests", "Bubble vents", "Crystal beaches", "Ancient submerged temples",
                "Sea bridges", "Lighthouses", "Tide pools", "Floating docks"],
        notes=["Bubble reefs. Crystal water. Sea gardens. Giant lily pads. Floating islands.",
               "Air bubbles constantly rising from ancient Atlantean ruins beneath the sea."],
        districts=["Bubble Bay", "Whispering Wharf", "The Pearl Steps", "Coral Gardens", "Moonlit Pier",
                   "Tidekeeper's Cove", "The Glass Lagoon"]),
    "living-harvest-realm": dict(
        number="III", icon="grapes",
        tagline="Where the Garden feeds every heart.",
        themes=["Abundance", "Gratitude", "Community", "Celebration"],
        visual=["Food forests", "Herbs", "Medicinal gardens", "Fruit", "Tea", "Community"],
        notes=["The agricultural soul of Atlantis.", "Not farms. Living ecosystems.",
               "Everything grows together."],
        districts=["The Vineyard", "Lila's Arbor", "Orchard Walk", "The Old Press", "Bakers' Row",
                   "Lavender Fields", "Honey Hollow", "Tea Terrace"]),
    "crystal-conservatory-realm": dict(
        number="IV", icon="crystal",
        tagline="Where curiosity blooms.",
        themes=["Curiosity", "Innovation", "Experimentation", "Discovery"],
        visual=["Glass", "Crystal", "Bioluminescence", "Rare medicines", "Experimental hybrids",
                "Impossible plants"],
        notes=["D'nine's favourite place.", "Everything glows."],
        districts=["The Glass Atrium", "D'nine's Cabinet", "The Alchemist's Greenhouse", "Prism Gardens",
                   "Observatory", "Crystal Nursery", "The Living Laboratory"]),
    "hearthlands-realm": dict(
        number="V", icon="flame",
        tagline="Where strangers become family.",
        themes=["Belonging", "Comfort", "Warmth", "Tradition"],
        visual=["Music", "Campfires", "Bread", "Tea", "Stories", "Friendship", "Community"],
        notes=["The emotional centre.", "The place people return to."],
        districts=["The Oven Room", "Coco's Old Table", "The Hearth Circle", "Lantern Square",
                   "Festival Green", "Raptor's Supply Road", "Songkeeper's Hall"]),
    "verdant-wilds-realm": dict(
        number="VI", icon="leaf",
        tagline="Where the Garden remembers.",
        themes=["Wonder", "Ancient wisdom", "Adventure", "Nature"],
        visual=["The oldest forests", "Ancient trees", "Forgotten ruins", "Sacred creatures"],
        notes=["This is where mystery lives.", "Not dangerous. Simply... older."],
        districts=["Journal Grove", "Forgotten Paths", "Moss Temple", "Elder Tree Hollow", "Hidden Springs",
                   "Butterfly Vale", "Echo Woods"]),
    "celestial-realm": dict(
        number="VII", icon="star",
        tagline="Where the Garden dreams.",
        themes=["Poetry", "Music", "Meditation", "Dream journals"],
        visual=["Constellations growing like flowers", "Nebula vines", "Moonlit forests",
                "Floating islands connected by starlight", "Galaxies reflected in lakes",
                "Trees whose blossoms become stars"],
        notes=["Not outer space.", "The Atlanteans believed the stars were gardens.",
               "Everything quiet. Everything sacred.",
               "The philosophical heart of Atlantean Gardens."],
        districts=["The Dreaming Sea", "Garden of First Light", "The Astral Arbor", "Moonpetal Sanctuary",
                   "The Constellation Orchard", "Nebula Grove", "The Observatory of Becoming"]),
    "heart-of-atlantis": dict(
        number="", icon="tree",
        tagline=None,  # keep the Atlas data's own tagline
        themes=[], visual=[], notes=[], districts=None),
}

# Map pin positions measured on "Seven Realm Atlas.png" (centre of each banner);
# pins are drawn 6.5% higher so they sit on the realm emblem, not the name.
PINS = {
    "sunlight-realms": (34.5, 22.5), "bubble-coast-realm": (63.5, 22.5),
    "living-harvest-realm": (27.0, 43.0), "crystal-conservatory-realm": (77.5, 44.5),
    "heart-of-atlantis": (53.0, 57.0), "hearthlands-realm": (27.5, 76.0),
    "verdant-wilds-realm": (76.0, 76.5), "celestial-realm": (52.5, 89.0),
}

# From "Character BIBLE.docx" and the Hall of Living Portraits.
KEEPERS = [
    dict(id="kasper", name="Kasper", pillar="The Spirit", virtue="Wonder",
         question="What could this become?",
         motto="Every flower has a story. Every creature has a lesson. Every journey changes the traveller.",
         epithet="The Curious Heart of Atlantean Gardens",
         roles=["Explorer", "Gardener", "Journal Keeper", "Story Collector", "Dream Jumper", "Wonderer"],
         essence=["Kasper is the living embodiment of wonder.", "He doesn't seek treasure, fame, or glory.",
                  "He seeks understanding.", "Where others see plants, Kasper sees teachers.",
                  "Where others see ruins, he sees forgotten stories.",
                  "Where others see strangers, he sees friends he simply hasn't met yet."],
         philosophy="Kasper believes life is something to be cultivated, not controlled."),
    dict(id="lila", name="Lila", pillar="The Heart", virtue="Love",
         question="How can this belong?",
         motto="The Garden never asks the flower to become the tree. It simply invites each living thing to bloom as itself.",
         epithet="The Soul of Atlantean Gardens",
         roles=["Spirit of the Garden", "Keeper of Harmony", "Listener", "Healer", "Weaver of Relationships"],
         essence=["Lila is the living embodiment of harmony.", "She does not seek to change the world.",
                  "She helps the world remember itself.", "Where Kasper discovers wonder...",
                  "Lila uncovers belonging."],
         philosophy="Healing is not becoming someone new. Healing is remembering who you have always been."),
    dict(id="coco", name="Coco", pillar="The Hands", virtue="Stewardship",
         question="How do we care for this?",
         motto="The tallest tree is not the one that reached the sky first, but the one that never stopped deepening its roots.",
         epithet="The Steady Heart Beneath the Garden",
         roles=["Gardener", "Craftsman", "Keeper of Traditions", "Father", "Community Elder"],
         essence=["Where Kasper discovers wonder...", "Coco helps it endure.",
                  "He understands that beautiful things aren't built in a day.",
                  "They are cultivated season after season."],
         philosophy="Life is not something to chase. It is something to tend."),
    dict(id="dnine", name="D'nine", pillar="The Mind", virtue="Creation",
         question="I wonder what happens if...?",
         motto="Every masterpiece began as someone wondering... 'What happens if...?'",
         epithet="The Eternal Inventor of Atlantean Gardens",
         roles=["Inventor", "Alchemist", "Botanist", "Philosopher", "Experimental Gardener"],
         essence=["An elder whose curiosity never retired.", "D'nine is the living embodiment of creation.",
                  "Not perfection.", "Creation."],
         philosophy="Failure isn't the opposite of success. Failure is simply another conversation with reality."),
    dict(id="raptor", name="Raptor", pillar="The Will", virtue="Courage",
         question="How do we bring this into reality?",
         motto="Strength is not measured by what you can carry alone. It is measured by what you are willing to carry together.",
         epithet="The Strength, Will and Grit of Atlantean Gardens",
         roles=["Community Keeper", "Builder", "Cultivator", "Guardian", "Mentor", "Craftsman"],
         essence=["Raptor is the living embodiment of courage.", "Not fearless courage.", "Faithful courage.",
                  "He doesn't seek danger.", "He simply refuses to abandon what he loves."],
         philosophy="Strength exists to serve. Power means nothing unless it protects."),
]

TOGETHER = [
    "Wonder without stewardship remains only a dream.",
    "Stewardship without love becomes obligation.",
    "Love without courage becomes hesitation.",
    "Courage without creativity becomes repetition.",
    "Creativity without wonder loses its soul.",
    "Only together does the Garden truly bloom.",
]

INTRO = [
    "These manuscripts are not offered as an escape from the world.",
    "They are offered as a gentle reminder that another way of walking through it has always been possible.",
    "If, when you close these pages, you find yourself speaking a little more kindly...",
    "Listening a little more deeply...",
    "Walking a little more gently...",
    "Then Atlantis has risen once again.",
    "Not beneath your feet...",
    "But within your heart.",
]


def load(pattern):
    out = []
    for f in sorted(glob.glob(os.path.join(ATLAS, pattern))):
        with open(f, encoding="utf-8") as fh:
            out.append(json.load(fh))
    return out


def manuscripts():
    order = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"]
    found = {}
    for f in glob.glob(os.path.join(MSDIR, "*.txt")):
        lines = open(f, encoding="utf-8").read().split("\n")
        if len(lines) < 6 or not lines[1].startswith("Manuscript "):
            continue
        num = lines[1].split(" ", 1)[1].strip()
        title = lines[2].strip()
        prov, insc, i = "", [], 5
        if lines[i].startswith("Recovered from"):
            prov = lines[i].strip()
            i += 1
        while i < len(lines) and not lines[i].startswith("───"):
            insc.append(lines[i].strip())
            i += 1
        found[num] = dict(number=num, title=title, provenance=prov, inscription=insc)
    return [found[n] for n in order if n in found]


realms = []
for r in load("realms/*.json"):
    c = REALM_CANON.get(r["id"], {})
    mapped = [d["name"] for d in r["districts"]]
    districts = c.get("districts") or mapped
    pin = PINS[r["id"]]
    realms.append(dict(
        id=r["id"], name=r["name"], order=r["order"], number=c.get("number", ""),
        icon=c.get("icon", "leaf"), tagline=c.get("tagline") or r["tagline"],
        themes=c.get("themes", []), visual=c.get("visual", []), notes=c.get("notes", []),
        districts=[dict(name=d, charted=d in mapped, verse=DISTRICT_VERSES.get(d)) for d in districts],
        tale=REALM_LORE.get(r["id"], {}).get("tale", []),
        nudge=REALM_LORE.get(r["id"], {}).get("nudge"),
        districtIds={d["id"]: d["name"] for d in r["districts"]},
        pin=dict(x=pin[0], y=round(pin[1] - 6.5, 1)), image=f"assets/realms/{r['id']}.jpg"))
realms.sort(key=lambda r: (r["order"] == 0, r["order"]))

catalog = {}
if CATALOG and os.path.exists(CATALOG):
    with open(CATALOG, encoding="utf-8") as fh:
        for item in json.load(fh):
            catalog.setdefault(item.get("strain_id"), []).append(item)

strains, atlas_keepers = [], {}
for c in load("characters/*.json"):
    if c["type"] == "keeper":
        atlas_keepers[c["id"]] = c
        continue
    prof = c.get("profile") or {}
    strains.append(dict(
        id=c["id"], name=c["name"], code=c.get("code") or "", title=c.get("title") or "",
        category=c.get("category") or "", realm=c["realm"], district=c.get("district") or "",
        tags=c.get("tags", []), relations=c.get("relations", []), body=c.get("body") or "",
        quote=c.get("quote") or "", flavor=prof.get("flavor") or "", aroma=prof.get("aroma") or "",
        effects=prof.get("effects") or "", mayRelieve=prof.get("mayRelieve") or "",
        terpenes=c.get("terpenes", []), growNotes=c.get("growNotes") or "", art=None))

# Card art (tools/prep_cards.py -> data/cards.json): what is printed on Cassidy's cards.
cards_path = os.path.join(os.path.dirname(OUT), "cards.json")
if os.path.exists(cards_path):
    with open(cards_path, encoding="utf-8") as fh:
        cards = json.load(fh)
    by_id = {s["id"]: s for s in strains}
    for c in cards:
        art = dict(front=c["front"], back=c["back"])
        if c["atlas"] and c["atlas"] in by_id:
            s = by_id[c["atlas"]]
            s["art"] = art
            s["printedRealm"] = c["printedRealm"]
            if not s["code"] and c["code"]:
                s["code"] = c["code"]
            if c["title"] and c["title"] != s["title"]:
                s["cardTitle"] = c["title"]
        else:
            strains.append(dict(
                id=c["id"], name=c["name"], code=c["code"], title=c["title"], category="",
                realm=None, district="", tags=[], relations=[], body="", quote="", flavor="",
                aroma="", effects="", mayRelieve="", terpenes=[], growNotes="", art=art,
                printedRealm=c["printedRealm"]))

keepers = []
for k in KEEPERS:
    a = atlas_keepers.get(k["id"])
    k = dict(k, portrait=f"assets/keepers/{k['id']}.jpg",
             realm=a["realm"] if a else None, district=a["district"] if a else None,
             relations=a["relations"] if a else [])
    keepers.append(k)

world = dict(realms=realms, strains=strains, keepers=keepers, together=TOGETHER,
             intro=INTRO, manuscripts=manuscripts(), cards=[])

js = "/* Generated by tools/build_data.py from Cassidy's own material. Do not hand-edit. */\n"
js += "window.WORLD = " + json.dumps(world, ensure_ascii=False, indent=1) + ";\n"
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as fh:
    fh.write(js)
print(f"realms={len(realms)} strains={len(strains)} keepers={len(keepers)} manuscripts={len(world['manuscripts'])}")
