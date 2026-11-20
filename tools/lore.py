"""Realm and district lore for the Living Atlas.

Every line below is quoted word for word from Cassidy's 13 manuscripts of the
Atlantean Archives (OneDrive\\Documents\\Atlantean Gardens\\13 Manuscripts).
Nothing is written new. Each passage carries its source so a caretaker can
find it again. Passages are paired with realms and districts whose themes
(from "The Atlas 7 Worlds") they echo; districts without a clear echo in the
manuscripts are left without a verse.

Shape:
  REALM_LORE[realm_id] = dict(
      tale=[ dict(lines=[...], source="Manuscript VIII · The Morning Light"), ... ],
      nudge=dict(lines=[...], source=...),   # the philosophical nudge
  )
  DISTRICT_VERSES[district name] = dict(lines=[...], source=...)
"""

REALM_LORE = {
    "sunlight-realms": dict(
        tale=[
            dict(source="Manuscript VIII · The Morning Light", lines=[
                "Each day began not with labour, but with gratitude.",
                "Before tools were lifted...",
                "Before gardens were tended...",
                "Before journeys began...",
                "The Keepers stepped outside to greet the morning.",
                "To witness the dawn was to remember that every day arrived as a gift, not a guarantee.",
            ]),
            dict(source="Manuscript III · The Invitation", lines=[
                "Should you discover a path that seems to appear only when you are no longer searching...",
                "Walk gently.",
                "Curiosity has always been the truest map of Atlantis.",
            ]),
        ],
        nudge=dict(source="Manuscript X · The Path of Becoming", lines=[
            "Every seed begins hidden beneath the soil.",
            "No flower blooms on the day it is planted.",
            "So it is with every soul.",
        ]),
    ),
    "bubble-coast-realm": dict(
        tale=[
            dict(source="Manuscript III · The Breath of the World", lines=[
                "The tides do not simply follow the moon.",
                "They dance with it.",
            ]),
            dict(source="Manuscript II · Atlantis Rising", lines=[
                "Then Atlantis disappeared.",
                "Whether it sank beneath the sea, slipped behind a veil of mist, or simply chose to wait beyond the reach of those who had forgotten its teachings, no manuscript can say with certainty.",
                "Perhaps all are true.",
                "Perhaps none are.",
                "What matters is this:",
                "Atlantis was never lost.",
                "It was planted.",
            ]),
        ],
        nudge=dict(source="Manuscript X · The Courage to Change", lines=[
            "The river does not regret the mountain spring.",
            "The Garden taught that change is not the abandonment of our true nature.",
            "It is its unfolding.",
        ]),
    ),
    "living-harvest-realm": dict(
        tale=[
            dict(source="Manuscript VIII · Shared Tables", lines=[
                "Food carried stories.",
                "The herbs remembered the rain.",
                "The fruits remembered the sun.",
                "The bread remembered the hands that kneaded it.",
                "The tea remembered the hillside where it first unfurled.",
                "No one ate alone by choice.",
                "There was always room for one more chair beneath the trees.",
            ]),
            dict(source="Manuscript V · The Covenant of Harvest", lines=[
                "Nothing was harvested without gratitude.",
                "For every flower gathered, another was left to bloom.",
                "The Garden was never seen as a resource.",
                "It was family.",
            ]),
        ],
        nudge=dict(source="Manuscript V · The Language of Leaves", lines=[
            "Some announce themselves with brilliant flowers.",
            "Others remain hidden beneath moss for years before quietly emerging.",
            "Neither path is better.",
            "The Garden celebrates every way of growing.",
        ]),
    ),
    "crystal-conservatory-realm": dict(
        tale=[
            dict(source="Manuscript II · Atlantis Rising", lines=[
                "Some blossomed beneath the open sky.",
                "Others stretched through crystal caverns deep beneath the earth.",
                "Each garden reflected not wealth, but understanding.",
            ]),
            dict(source="Manuscript VII · Speak With Wonder", lines=[
                "The Keepers rarely claimed to possess every answer.",
                "Instead, they asked beautiful questions.",
                "“What might happen?”",
                "“What could this teach us?”",
                "“What have we not yet noticed?”",
                "Wonder is not uncertainty.",
                "It is curiosity made courageous.",
            ]),
        ],
        nudge=dict(source="Manuscript X · There Is No Final Version", lines=[
            "The Garden never expected perfection.",
            "Neither should we.",
            "For the Garden is never finished.",
            "Neither are we.",
        ]),
    ),
    "hearthlands-realm": dict(
        tale=[
            dict(source="Manuscript VIII · Evenings of Remembering", lines=[
                "As daylight softened into twilight, work gradually gave way to reflection.",
                "Lanterns glowed among the pathways.",
                "Children listened to stories beneath ancient trees.",
                "Travellers shared tales from distant gardens.",
            ]),
            dict(source="Manuscript XII · We Tend Together", lines=[
                "No caretaker walks alone.",
                "When another grows weary...",
                "We offer shade.",
                "When another celebrates...",
                "We celebrate beside them.",
            ]),
        ],
        nudge=dict(source="Manuscript X · Becoming Together", lines=[
            "We become ourselves through one another.",
        ]),
    ),
    "verdant-wilds-realm": dict(
        tale=[
            dict(source="Manuscript III · The Breath of the World", lines=[
                "The forests do not merely grow.",
                "They listen.",
                "The mountains do not simply stand.",
                "They remember.",
                "Even silence has purpose.",
                "It allows the world to hear itself.",
            ]),
            dict(source="Manuscript VII · Leave Room for Mystery", lines=[
                "The Garden treasures unfinished stories.",
                "Half-open doors.",
                "Maps with missing corners.",
                "Journals with torn pages.",
                "Mystery is not absence.",
                "It is an invitation.",
            ]),
        ],
        nudge=dict(source="Manuscript III · The Living World", lines=[
            "To understand one leaf is to begin understanding the tree.",
            "To understand the tree is to begin understanding the forest.",
            "To understand the forest is to begin understanding yourself.",
        ]),
    ),
    "celestial-realm": dict(
        tale=[
            dict(source="Manuscript II · Atlantis Rising", lines=[
                "They listened to the stars before they sailed beneath them.",
            ]),
            dict(source="Manuscript VI · The Language of Colour", lines=[
                "Lavenders invite dreaming.",
                "Moonlit silvers whisper mystery.",
            ]),
            dict(source="Manuscript VIII · Rest Is Sacred", lines=[
                "Sleep was honoured.",
                "Stillness was celebrated.",
                "Moments of quiet were never mistaken for idleness.",
                "The Garden knew that roots grow deepest in unseen places.",
            ]),
        ],
        nudge=dict(source="Manuscript XIII · The Final Leaf", lines=[
            "For no manuscript can tell the story that belongs to you.",
            "No Keeper can walk your path.",
            "That page has always been waiting.",
            "Not here.",
            "But within your own hands.",
        ]),
    ),
    "heart-of-atlantis": dict(
        tale=[
            dict(source="Manuscript XI · The Continuity Ledger", lines=[
                "No garden remains unchanged.",
                "The Garden has never resisted change.",
                "It has only asked that change arise from love rather than haste.",
            ]),
            dict(source="Manuscript XI · Living Canon", lines=[
                "For branches may spread in many directions...",
                "But every branch is nourished by the same roots.",
            ]),
        ],
        nudge=dict(source="Manuscript XIII · The Final Leaf", lines=[
            "“Atlantis was never lost.”",
            "“It was remembered.”",
        ]),
    ),
}

# Districts whose names echo a passage in the manuscripts.
DISTRICT_VERSES = {
    "Seedling Nursery": dict(source="Manuscript V · The Endless Herbarium", lines=[
        "Even now, seeds lie sleeping beneath the soil, waiting patiently for the day their stories are needed."]),
    "Morning Orchard": dict(source="Manuscript VIII · The Morning Light", lines=[
        "Some watched the first light touch the leaves.", "Some offered quiet thanks.", "Some simply stood in silence."]),
    "Story Circle": dict(source="Manuscript IX · The First Storytellers", lines=[
        "Before parchment...", "Before ink...", "Before carved stone...", "There were stories."]),
    "The Bard's Meadow": dict(source="Manuscript IX · The First Storytellers", lines=[
        "Songs carried history farther than maps ever could.", "Laughter remembered what sorrow could not."]),
    "Tea Terrace": dict(source="Manuscript VIII · Shared Tables", lines=[
        "The tea remembered the hillside where it first unfurled."]),
    "Bakers' Row": dict(source="Manuscript VIII · Shared Tables", lines=[
        "The bread remembered the hands that kneaded it."]),
    "The Oven Room": dict(source="Manuscript VIII · Shared Tables", lines=[
        "The bread remembered the hands that kneaded it."]),
    "Coco's Old Table": dict(source="Manuscript VIII · Shared Tables", lines=[
        "There was always room for one more chair beneath the trees."]),
    "Festival Green": dict(source="Manuscript VIII · The Festivals of the Seasons", lines=[
        "The greatest celebrations required very little.", "Only people willing to be fully present."]),
    "Lantern Square": dict(source="Manuscript VIII · Evenings of Remembering", lines=[
        "Lanterns glowed among the pathways."]),
    "Songkeeper's Hall": dict(source="Manuscript IX · The First Storytellers", lines=[
        "Songs carried history farther than maps ever could."]),
    "Journal Grove": dict(source="Manuscript IX · The Journals of Becoming", lines=[
        "Not because every life was extraordinary...", "But because every life was worthy of remembering."]),
    "Forgotten Paths": dict(source="Manuscript III · Paths Instead of Borders", lines=[
        "Paths invite curiosity.", "Borders invite fear.", "No two travellers walk the same path.",
        "Yet every path belongs to the Garden."]),
    "Echo Woods": dict(source="Manuscript VII · Opening Inscription", lines=[
        "Recovered from the Hall of Echoes, where every spoken word was believed to linger among the leaves long after the speaker had departed."]),
    "The Glass Atrium": dict(source="Manuscript VI · Imperfection Is Alive", lines=[
        "For perfection often appears finished.", "Life never is."]),
    "The Living Laboratory": dict(source="Manuscript VIII · The Gift of Craft", lines=[
        "Creation was not reserved for artists.", "It was the birthright of every soul."]),
    "The Observatory of Becoming": dict(source="Manuscript X · The Quiet Compass", lines=[
        "Purpose was never a place.", "It was a direction."]),
    "Garden of First Light": dict(source="Manuscript XII · Opening Inscription", lines=[
        "Recovered from the Circle of First Light, where every new caretaker was welcomed not by ceremony, but by quiet conversation beneath the oldest tree in the Garden."]),
    "The Dreaming Sea": dict(source="Manuscript III · The Seasons of Becoming", lines=[
        "A season for resting.", "A season for beginning again."]),
    "The Continuity Ledger": dict(source="Manuscript XI · Remember the Why", lines=[
        "Whenever uncertainty arises...", "Return to the First Covenant."]),
}
