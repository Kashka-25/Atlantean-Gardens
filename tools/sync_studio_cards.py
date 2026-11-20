"""Brings the card studio's finished cards into the Living Atlas.

For every row marked "Card done" in the card studio's strains.xlsx:
- its card art (the finished front and the clean back from card-studio/out/,
  never the -back-qr.png print version) is written to assets/cards/ at 560 px;
- a strain that is already on the Atlas keeps its place and words, except that
  strains added from the card studio (they carry type, THC or lineage fields)
  get those fields refreshed from the sheet, so the site never says more than
  the fact-checked sheet does;
- a strain that isn't on the Atlas yet gets a page, placed in the realm and
  district the sheet names (no realm if the sheet names none);
- a strain named after --refill (a card Cassidy had redone) has its page
  rebuilt from the sheet like a new one, in the same place in the list.

With --only, just the cards named after it are brought in, so cards Cassidy
hasn't checked yet stay off the Atlas even when they are "Card done".

Words come only from the sheet (Cassidy's approved card text).

Usage: python tools/sync_studio_cards.py <card-studio dir> [--only id ...] [--refill id ...]
Run from the site root. Needs Node (to read the sheet with the studio's own
reader) and Pillow.
"""
import json
import os
import re
import subprocess
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extra_places import add_extra_places  # noqa: E402  (places within realms from the card studio)


def ids_after(flag):
    """The Web IDs listed after a flag, up to the next flag."""
    if flag not in sys.argv:
        return set()
    ids = []
    for a in sys.argv[sys.argv.index(flag) + 1:]:
        if a.startswith("--"):
            break
        ids.append(a)
    return set(ids)


STUDIO = os.path.abspath(sys.argv[1])
REFILL = ids_after("--refill")
ONLY = ids_after("--only")
WORLD = os.path.join("data", "world.js")
CARDS = os.path.join("assets", "cards")
KEEPER_IDS = {"Kasper": "kasper", "Lila": "lila", "Coco": "coco", "D'nine": "dnine", "Raptor": "raptor"}
PROFILE = ("category", "typeDetail", "thc", "lineage")  # refreshed on studio-added pages


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and").replace("'", "").replace("’", "")).strip("-")


def sheet():
    js = "require(process.argv[1] + '/scripts/lib').readSheet().then(r => process.stdout.write(JSON.stringify(r)))"
    out = subprocess.run(["node", "-e", js, STUDIO], capture_output=True, text=True, encoding="utf-8", check=True, cwd=STUDIO)
    return json.loads(out.stdout)


def save_jpg(src, dst, width=560):
    im = Image.open(src).convert("RGB")
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, quality=78, optimize=True, progressive=True)


raw = open(WORLD, encoding="utf-8").read()
head, body = raw.split("window.WORLD = ", 1)
world = json.loads(body.rstrip().rstrip(";"))
places = add_extra_places(world)  # before cards are placed, so cards set there find their place
if places:
    print(f"places added: {', '.join(places)}")
by_id = {s["id"]: s for s in world["strains"]}
realm_by_name = {r["name"]: r for r in world["realms"]}

added, refreshed, refilled, art, seen = [], [], [], 0, set()
for r in sheet():
    if r["status"] != "Card done" or (ONLY and r["id"] not in ONLY):
        continue
    seen.add(r["id"])
    sid, stem = r["id"], f'{r["code"] or "AG-new"}-{r["id"]}'
    front, back = (os.path.join(STUDIO, "out", f"{stem}-{side}.png") for side in ("front", "back"))
    if not os.path.exists(front):
        print(f"  ! {sid}: no finished front in out/, skipped")
        continue
    paths = {"front": f"assets/cards/{sid}-front.jpg"}
    save_jpg(front, os.path.join(CARDS, f"{sid}-front.jpg"))
    if os.path.exists(back):
        save_jpg(back, os.path.join(CARDS, f"{sid}-back.jpg"))
        paths["back"] = f"assets/cards/{sid}-back.jpg"
    art += 1

    values = {
        "category": r["type"], "typeDetail": r["typeDetail"], "thc": r["thc"], "lineage": r["lineage"],
    }
    s = by_id.get(sid)
    if s and sid not in REFILL:
        s["art"] = paths
        if any(k in s for k in ("typeDetail", "thc", "lineage")):
            changed = [k for k in PROFILE if (s.get(k) or "") != (values[k] or "")]
            for k in PROFILE:
                if values[k]:
                    s[k] = values[k]
                else:
                    s.pop(k, None) if k != "category" else s.__setitem__(k, "")
            if changed:
                refreshed.append(f"{sid} ({', '.join(changed)})")
        continue

    # A new page for a card that isn't on the Atlas yet.
    realm = realm_by_name.get(r["realm"])
    district = slug(r["district"]) if realm and r["district"] else ""
    if district:
        realm.setdefault("districtIds", {})[district] = r["district"]
    best = r["bestTime"] or ""
    s = {
        "id": sid, "name": r["name"], "code": r["code"], "title": r["title"], "category": r["type"],
        "realm": realm["id"] if realm else None, "district": district, "tags": [],
        "relations": [KEEPER_IDS[k.strip()] for k in re.split(r"[,&]| and ", r["keeper"] or "") if k.strip() in KEEPER_IDS],
        "body": r["story"], "quote": r["quote"], "flavor": r["flavor"], "aroma": r["aroma"], "effects": r["effects"],
        "mayRelieve": r["mayRelieve"], "terpenes": [], "growNotes": "", "art": paths,
        "printedRealm": r["printedRealm"] or r["realm"],
    }
    for k in ("typeDetail", "thc", "lineage"):
        if values[k]:
            s[k] = values[k]
    if r.get("aka"):
        s["aka"] = r["aka"]
    if ";" in best:
        s["bestFor"] = ", ".join(x.strip() for x in best.split(";") if x.strip())
    elif best:
        s["bestTime"] = best
    if sid in by_id:  # --refill: replace the old page where it stands
        world["strains"][world["strains"].index(by_id[sid])] = s
        refilled.append(sid)
    else:
        world["strains"].append(s)
        added.append(sid)
    by_id[sid] = s

open(WORLD, "w", encoding="utf-8", newline="\n").write(head + "window.WORLD = " + json.dumps(world, ensure_ascii=False, indent=1) + ";\n")
print(f"card art written for {art} cards")
print(f"profile refreshed: {', '.join(refreshed) or 'none'}")
print(f"pages added ({len(added)}): {', '.join(added) or 'none'}")
print(f"pages rebuilt from the sheet: {', '.join(refilled) or 'none'}")
for sid in REFILL - set(refilled):
    print(f"  ! --refill {sid}: not a Card done row, left alone")
for sid in ONLY - seen:
    print(f"  ! --only {sid}: not a Card done row, left alone")
