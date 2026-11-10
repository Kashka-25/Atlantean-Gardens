/* Where's Wally in the Living Atlas.
   For every realm painting: where each strain hides (at its Atlas district)
   and where each of the five Keepers is tucked away, with a riddle for each.
   x, y are percentages of the 3:2 realm painting. Riddles describe what is
   painted at that spot; they are seeker's hints, not new lore. */
window.HIDING = {
  "sunlight-realms": {
    strains: {
      "lusty-lady": { x: 46, y: 28, riddle: "Where blossom spills like laughter down a stair, / one flower blooms too loudly to stay hidden." },
      "strawberry-akeil": { x: 61, y: 62, riddle: "A roof of green, a ring of song: / beneath the dome, the meadow sings along." },
      "honey-melon-kush": { x: 63, y: 75, riddle: "Below the music, in the grass, / an afternoon has drifted off to sleep." },
    },
    keepers: {
      "coco": { x: 28, y: 78, riddle: "Where low walls hold the warmth of noon, / the oldest hands rest in sun-baked stone." },
      "kasper": { x: 28, y: 38, riddle: "Four sails that turn but never sail; / a wanderer is counting the wind." },
      "lila": { x: 85, y: 50, riddle: "Ringed by sea on a small green isle, / someone is listening to the tide." },
      "dnine": { x: 93, y: 30, riddle: "Where one lone tower keeps watch on the waves, / an old inventor studies the light." },
      "raptor": { x: 7, y: 52, riddle: "Where a tall ship rests at the western edge, / one who carries others waits to cross." },
    },
  },
  "bubble-coast-realm": {
    strains: {
      "ice-cream": { x: 57, y: 43, riddle: "Slow as a sweet that refuses to melt, / she drifts where the pier ends in glass." },
    },
    keepers: {
      "kasper": { x: 49, y: 63, riddle: "A little boat bobs where a butterfly rests; / a journal has gone sailing." },
      "lila": { x: 77, y: 56, riddle: "Where silver backs rise from the coral, / someone hums along with the sea." },
      "coco": { x: 13, y: 55, riddle: "Beneath the striped awning by the shore, / seeds are traded for stories." },
      "dnine": { x: 83, y: 41, riddle: "Under the great glass cage upon the water, / curiosity fills another notebook." },
      "raptor": { x: 89, y: 14, riddle: "Where the tall white tower lights the way home, / a steady hand keeps the lantern burning." },
    },
  },
  "living-harvest-realm": {
    strains: {
      "lilac-diesel-grape-diamonds": { x: 28, y: 52, riddle: "Row upon row where the purple fruit hangs, / a jester hides inside the vineyard's laughter." },
    },
    keepers: {
      "lila": { x: 50, y: 47, riddle: "Where leaves weave a roof above the winding walk, / she is what the vines agree on." },
      "coco": { x: 16, y: 65, riddle: "Beside the great press where the harvest is squeezed, / patience waits its turn." },
      "kasper": { x: 74, y: 10, riddle: "High where the first windmill turns, / someone is sketching the whole valley." },
      "dnine": { x: 80, y: 45, riddle: "Where water turns the great wooden wheel, / an inventor wonders how." },
      "raptor": { x: 73, y: 68, riddle: "Under striped canopies the baskets are full, / and someone carried every crate." },
    },
  },
  "crystal-conservatory-realm": {
    strains: {
      "alien-mints-permanent-marker": { x: 26, y: 74, riddle: "Where a brass eye stares at the stars and the pages lie open, / something borrowed waits to be returned." },
      "chemical-bride": { x: 89, y: 65, riddle: "Wed to the glass where the table is laid, / she introduces chaos to patience." },
    },
    keepers: {
      "dnine": { x: 12, y: 60, riddle: "Among shelves that lean with borrowed books, / the cabinet keeps its keeper." },
      "kasper": { x: 82, y: 14, riddle: "A tree held in a bubble of glass, / floating where wonder can climb." },
      "lila": { x: 65, y: 48, riddle: "In the little glass house ringed by water, / harmony sits very still." },
      "coco": { x: 74, y: 80, riddle: "Where the lowest pool circles itself, / an elder tends the water's edge." },
      "raptor": { x: 57, y: 40, riddle: "Across the arched bridge of pale stone, / someone is always crossing to help." },
    },
  },
  "hearthlands-realm": {
    strains: {
      "glookies": { x: 22, y: 66, riddle: "Where warm bread breathes through an open door, / nothing good is ever rushed." },
      "permanent-marker": { x: 56, y: 78, riddle: "Around the flames where friends sit close, / a tale is written in ink that never dries." },
    },
    keepers: {
      "raptor": { x: 65, y: 60, riddle: "Where wooden arrows point every way, / the keeper of roads remembers which one lets you through." },
      "kasper": { x: 45, y: 9, riddle: "Drifting high in the dusk on a gentle breath, / a curious heart has gone ballooning." },
      "lila": { x: 85, y: 72, riddle: "Where tea is poured and tales are told, / there is always room for one more chair." },
      "coco": { x: 82, y: 19, riddle: "High in the great tree where the windows glow, / the oldest roots hold up a home." },
      "dnine": { x: 61, y: 40, riddle: "Where the wheel turns and turns again, / someone is asking, “What happens if...?”" },
    },
  },
  "verdant-wilds-realm": {
    strains: {},
    keepers: {
      "kasper": { x: 85, y: 17, riddle: "High in the branches where small windows glow, / a journal is being written by lamplight." },
      "lila": { x: 80, y: 60, riddle: "Through the stone arch where the green gem hangs, / the Garden remembers itself." },
      "coco": { x: 48, y: 90, riddle: "Where an otter floats in the cool, clear pool, / an elder listens to the forest listen." },
      "dnine": { x: 15, y: 60, riddle: "Under the thatch where the lanterns hang low, / jars and bottles hum with questions." },
      "raptor": { x: 52, y: 30, riddle: "Strung between the trees above the falls, / a bridge holds firm for all who cross." },
    },
  },
  "celestial-realm": {
    strains: {},
    keepers: {
      "kasper": { x: 57, y: 86, riddle: "A small white sail on a sea of galaxies; / an explorer is steering by the stars." },
      "lila": { x: 15, y: 70, riddle: "Where pale lotus flowers open to the night, / she rests among the petals of the moon." },
      "coco": { x: 46, y: 25, riddle: "At the roots of the tree whose blossoms become stars, / an old gardener tends the oldest light." },
      "dnine": { x: 83, y: 21, riddle: "Under the glass dome where the great lens points skyward, / an inventor counts what cannot be counted." },
      "raptor": { x: 66, y: 27, riddle: "On the long bridge strung between floating isles, / someone makes sure every crossing holds." },
    },
  },
  "heart-of-atlantis": {
    strains: {},
    keepers: {
      "kasper": { x: 52, y: 27, riddle: "High in the oldest tree a small arched window glows; / a journal keeper is looking out at every realm." },
      "lila": { x: 31, y: 91, riddle: "Where lily pads float below the stone bridge, / she listens to the rivers leaving for every realm." },
      "coco": { x: 55, y: 64, riddle: "In the ring of stones around the gentle flame, / an elder welcomes whoever arrives." },
      "dnine": { x: 77, y: 79, riddle: "Beside the great open book and the turning rings of brass, / a question is quietly brewing." },
      "raptor": { x: 92, y: 78, riddle: "Where a deer stands watch by the falling water, / a protector keeps the far bank safe." },
    },
  },
};
