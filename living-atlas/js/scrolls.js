/* The words painted on each realm's title scroll, transcribed exactly from
   the paintings. tools/clear_scrolls.py lifts them off the parchment
   (assets/realms/<id>-clean.jpg) and the page floats them back above it.
   box: left, top, right, bottom in pixels of the 1536x1024 painting. */
window.SCROLL_TEXT = {
  "sunlight-realms": { box: [85, 112, 355, 352], ink: "#3f4a2b",
    title: ["The Sunlight", "Realms"],
    body: [["Where the first light touches the land with golden fingers. Here, life is celebrated in colour, growth is honoured, and every day is an invitation to bloom."]] },
  "bubble-coast-realm": { box: [50, 116, 370, 352], ink: "#3a3a2a",
    title: ["The Bubble Coast", "Realm"],
    body: [["Where turquoise tides whisper ancient melodies and bubbles carry dreams across the shore. A realm of wonder, play, and endless horizons."]] },
  "living-harvest-realm": { box: [70, 86, 395, 340], ink: "#3f4a2b",
    title: ["The Living", "Harvest Realm"],
    body: [["Where abundance is grown, shared, and celebrated."], ["Here the land gives generously, the people gather gratefully, and every season becomes a reason to rejoice.", "plain"]] },
  "crystal-conservatory-realm": { box: [45, 120, 395, 412], ink: "#3a3a2c",
    title: ["The Crystal", "Conservatory Realm"],
    body: [["Where light is captured, beauty is preserved, and wonder is cultivated."], ["Within living glass and shimmering stone, knowledge blooms in endless, radiant forms.", "plain"]] },
  "hearthlands-realm": { box: [65, 112, 380, 352], ink: "#3d2f1f",
    title: ["The Hearthland", "Realm"],
    body: [["Where warmth is given freely, stories are shared, and every heart finds a home. Here the flames of community keep the Garden bright through every season."]] },
  "verdant-wilds-realm": { box: [85, 92, 425, 412], ink: "#2f3d22",
    title: ["The Verdant", "Wild Realm"],
    body: [["Where nature reigns freely, mystery runs deep, and every path is alive."], ["Here the untamed beauty of the Garden thrives in lush forests, hidden groves, ancient ruins, and whispering waterfalls. This realm is wild, wise, and wonderfully alive.", "plain"]] },
  "celestial-realm": { box: [75, 82, 355, 298], ink: "#3d2f1f",
    title: ["The Celestial", "Realm"],
    body: [["Where the Garden dreams. A realm of starlit gardens, living constellations, and the quiet remembering of what we may one day become."]] },
  "heart-of-atlantis": { box: [75, 96, 355, 296], ink: "#3d2f1f",
    title: ["Heart of", "Atlantis"],
    body: [["The place where all realms meet, where knowledge, life, and story flow together, and the Garden remembers."]] },
};
