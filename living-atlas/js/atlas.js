/* Atlantean Gardens · The Living Atlas — dream preview.
   All content comes from window.WORLD (data/world.js), generated from
   Cassidy's own canon. This file only renders it; it never adds lore. */
(function () {
  "use strict";
  const W = window.WORLD;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const realmById = Object.fromEntries(W.realms.map((r) => [r.id, r]));
  const strainById = Object.fromEntries(W.strains.map((s) => [s.id, s]));
  const keeperById = Object.fromEntries(W.keepers.map((k) => [k.id, k]));
  const EMPTY = "The Herbarium shall therefore never be complete. It is a living manuscript.<small>Manuscript V · The Endless Herbarium</small>";
  const PLANT_ASK = { source: "Manuscript V · The Invitation", lines: ["When you next encounter a plant...", "Do not ask only what it is called.", "Sit beside it.", "Ask quietly,", "“What are you teaching today?”"] };
  const ANY_KEEPER = { source: "Manuscript IV · Every Visitor May Become a Keeper", lines: ["Anyone who plants beauty where none existed before...", "Anyone who shares knowledge freely...", "Anyone who protects rather than possesses...", "Anyone who leaves a place gentler than they found it...", "Already walks the path of a Keeper.", "Whether they realise it or not."] };
  const BECOMING = { source: "Manuscript X · Closing Reflection", lines: ["Do not ask whether you have become enough.", "Ask instead:", "Have I remained curious?", "Have I nurtured what was entrusted to me?", "Have I left kindness where I found uncertainty?", "Have I made room for another to grow?", "If the answer is yes, then walk peacefully.", "For you are already becoming exactly as the Garden hoped.", "Not all at once.", "But beautifully.", "Season by season."] };

  /* ── Icons ─────────────────────────────────────────────── */
  const ICON = {
    atlas: '<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    cards: '<rect x="3.5" y="5" width="11" height="15" rx="1.5"/><path d="M8 3.5h10.5a1.5 1.5 0 0 1 1.5 1.5v13"/><path d="M9 10.5c0-1.4 1.1-2.5 2.5-2.5"/>',
    keepers: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5M14 15c2.9-.6 5.8 1 6.5 4.5"/>',
    lore: '<path d="M6 4h11a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 1-3 0V17H5"/><path d="M6 4a2 2 0 0 0-2 2v1h3"/><path d="M9 8.5h6M9 12h6"/>',
    journey: '<path d="M5 20c0-4 3-4 3-8s-3-4-3-8"/><circle cx="16" cy="6" r="2"/><path d="M16 8v4c0 2.2-1.8 4-4 4h-1"/><path d="M19 20h-8"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
  };
  const GLYPH = {
    sun: '<circle cx="24" cy="24" r="8"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.3 11.3l4.2 4.2M32.5 32.5l4.2 4.2M11.3 36.7l4.2-4.2M32.5 15.5l4.2-4.2"/>',
    bubbles: '<circle cx="20" cy="27" r="9"/><circle cx="33" cy="15" r="5"/><circle cx="35" cy="31" r="3"/><path d="M15 24a5 5 0 0 1 5-5"/>',
    grapes: '<path d="M24 6c0 4 3 6 7 6"/><circle cx="18" cy="18" r="4"/><circle cx="26" cy="18" r="4"/><circle cx="22" cy="25" r="4"/><circle cx="30" cy="25" r="4"/><circle cx="26" cy="32" r="4"/><circle cx="18" cy="32" r="4" opacity=".6"/>',
    crystal: '<path d="M24 5 14 19l10 24 10-24z"/><path d="M14 19h20M24 5v38M19 19l5-14 5 14"/>',
    flame: '<path d="M24 43c-8 0-12-6-12-12 0-8 8-11 8-20 5 3 7 8 6 12 3-1 4-4 4-6 5 4 6 9 6 14 0 6-4 12-12 12z"/><path d="M24 43c-3 0-5-2-5-5 0-4 5-6 5-10 3 3 5 6 5 10 0 3-2 5-5 5z"/>',
    leaf: '<path d="M10 38C10 20 22 9 40 8c0 18-11 30-28 30z"/><path d="M10 38 28 20"/>',
    star: '<path d="m24 5 4.5 13.5L42 24l-13.5 4.5L24 43l-4.5-14.5L6 24l13.5-5.5z"/><circle cx="24" cy="24" r="3"/>',
    tree: '<path d="M24 43V26"/><path d="M24 30c-6 0-9-3-9-3M24 33c5 0 9-4 9-4"/><circle cx="24" cy="16" r="10"/><circle cx="15" cy="20" r="6"/><circle cx="33" cy="20" r="6"/>',
  };
  const svg = (p, vb = "0 0 24 24") => `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const glyph = (name) => `<span class="ccard__glyph">${svg(GLYPH[name] || GLYPH.leaf, "0 0 48 48")}</span>`;
  const REALM_GLOW = {
    "sunlight-realms": "rgba(240,200,110,.45)", "bubble-coast-realm": "rgba(120,210,225,.42)",
    "living-harvest-realm": "rgba(170,140,210,.4)", "crystal-conservatory-realm": "rgba(185,160,240,.45)",
    "hearthlands-realm": "rgba(235,140,80,.42)", "verdant-wilds-realm": "rgba(120,190,110,.4)",
    "celestial-realm": "rgba(120,130,240,.5)", "heart-of-atlantis": "rgba(150,200,120,.4)",
  };

  /* Card frames take the exact shape of their own artwork, so no card or
     Keeper portrait is ever trimmed (Keeper portraits are taller than the
     2:3 strain cards, and a few older cards are too). */
  document.addEventListener("load", (e) => {
    const img = e.target; if (!img || img.tagName !== "IMG" || !img.naturalWidth) return;
    const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    if (img.classList.contains("ccard__art")) { const c = img.closest(".ccard"); if (c && c.classList.contains("ccard--portrait")) c.style.aspectRatio = ratio; return; }
    const side = img.closest(".flip__side");
    if (side && !side.classList.contains("flip__back")) { const f = side.closest(".flip"); if (f) f.style.aspectRatio = ratio; }
    const portrait = img.closest(".portrait"); if (portrait) portrait.style.aspectRatio = ratio;
  }, true);

  /* ── Journey (per-browser only) ────────────────────────── */
  const KEY = "ag-living-atlas-journey-v1";
  let journey = { realms: [], cards: [], keepers: [], scrolls: [], sightings: [], bloomed: [] };
  try { const j = JSON.parse(localStorage.getItem(KEY) || "null"); if (j) journey = Object.assign(journey, j); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(journey)); } catch (e) { /* ignore */ } };
  function discover(kind, id, label) {
    if (journey[kind].includes(id)) return;
    journey[kind].push(id); save(); renderRailJourney();
    toast(`✦ Discovered: ${label}`);
  }
  const HIDING = window.HIDING || {};
  const SIGHTINGS = Object.values(HIDING).reduce((n, h) => n + Object.keys(h.keepers || {}).length, 0);
  const totals = () => ({ realms: W.realms.length, cards: W.strains.length, keepers: W.keepers.length, scrolls: W.manuscripts.length, sightings: SIGHTINGS });
  function progress() {
    const t = totals();
    const got = journey.realms.length + journey.cards.length + journey.keepers.length + journey.scrolls.length + journey.sightings.length;
    const all = t.realms + t.cards + t.keepers + t.scrolls + t.sightings;
    return { got, all, pct: Math.round((got / all) * 100) };
  }
  function renderRailJourney() {
    const p = progress();
    $("#rail-journey").innerHTML = `<b>Your Journey</b><div class="meter"><i style="width:${p.pct}%"></i></div><div class="small">${p.got} of ${p.all} discoveries · ${p.pct}%</div>`;
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-on"), 2600);
  }

  /* ── Navigation ────────────────────────────────────────── */
  const NAV = [
    ["atlas", "Atlas"], ["cards", "Strains"], ["keepers", "Keepers"], ["lore", "Lore"], ["journey", "Journey"],
  ];
  function renderNav(active) {
    const html = NAV.map(([id, label]) => `<a class="navlink${active === id ? " is-active" : ""}" href="#/${id}"${active === id ? ' aria-current="page"' : ""}>${svg(ICON[id])}<span>${label}</span></a>`).join("");
    $("#nav").innerHTML = html; $("#dock").innerHTML = html;
  }

  /* ── Shared bits ───────────────────────────────────────── */
  function artFor(s) { return s.art && s.art.front ? s.art : null; }
  function cardHTML(s, opts = {}) {
    const r = realmById[s.realm]; const art = artFor(s);
    const seen = journey.cards.includes(s.id);
    const inner = art
      ? `<span class="ccard__face"><img class="ccard__art" src="${esc(art.front)}" alt="${esc(s.name)} collector card" loading="lazy">${opts.caption ? `<span class="ccard__caption"><span class="ccard__name">${esc(s.name)}</span></span>` : ""}</span>`
      : `<span class="ccard__face" style="--realm-glow:${REALM_GLOW[s.realm] || ""}">
           ${s.code ? `<span class="ccard__code">${esc(s.code)}</span>` : `<span class="ccard__code">Uncoded</span>`}
           ${glyph(r ? r.icon : "leaf")}
           <span class="ccard__name">${esc(s.name)}</span>
           ${s.title ? `<span class="ccard__title">${esc(s.title)}</span>` : ""}
           <span class="ccard__realm">${esc(r ? r.name : "")}${s.category ? " · " + esc(s.category) : ""}</span>
         </span>`;
    return `<a class="ccard${art ? "" : " ccard--type"}" href="#/cards/${esc(s.id)}" aria-label="${esc(s.name)}${s.title ? ", " + esc(s.title) : ""}">${seen ? "" : '<span class="badge">New</span>'}${inner}</a>`;
  }
  const passageHTML = (p) => `<figure class="passage"><blockquote>${p.lines.map((l) => `<span>${esc(l)}</span>`).join("")}</blockquote><figcaption>${esc(p.source)}</figcaption></figure>`;
  const districtName = (s) => (realmById[s.realm] && realmById[s.realm].districtIds[s.district]) || "";

  /* ── Views ─────────────────────────────────────────────── */
  function viewAtlas(stage) {
    const pins = W.realms.map((r, i) => { const t = realmTally(r), at = ATLAS.spots[r.id] || r.pin; return `
      <button class="pin${journey.realms.includes(r.id) ? " is-visited" : ""}${journey.bloomed.includes(r.id) ? " is-bloomed" : ""}" style="left:${at.x}%;top:${at.y}%" data-realm="${r.id}" aria-label="Open ${esc(r.name)}, ${t.found} of ${t.total} found"></button>
      <button class="realm-label${journey.bloomed.includes(r.id) ? " is-bloomed" : ""}" style="left:${at.x}%;top:${at.y}%;--d:${(i * 0.6).toFixed(1)}s" data-realm="${r.id}" tabindex="-1" aria-hidden="true">
        ${r.number ? `<i>${r.number}</i>` : `<i>✦</i>`}<b>${esc(r.name.replace(/^The /, ""))}</b>${t.total ? `<small>${t.found} of ${t.total} found</small>` : ""}
      </button>`; }).join("");
    const bar = W.realms.map((r) => { const t = realmTally(r); return `<button data-realm="${r.id}"${journey.bloomed.includes(r.id) ? ' class="is-bloomed"' : ""}>${r.number ? `<b>${r.number}</b>` : "✦ "}${esc(r.name.replace(/ Realms?$/, ""))}${t.total ? `<small>${t.found}/${t.total}</small>` : ""}</button>`; }).join("");
    stage.innerHTML = `
      <section class="atlas view">
        <div class="atlas__viewport" id="atlas-vp">
          <div class="atlas__map">
            <img src="${ATLAS.src}" alt="The Living Atlas of Atlantean Gardens: seven realms around the Heart of Atlantis" draggable="false">
            ${pins}
          </div>
        </div>
        <header class="atlas__float-title"><img src="assets/logo-emblem.png" alt=""><div><h1>The Living Atlas</h1><p>of Atlantean Gardens</p><em>No map has ever captured the whole of Atlantis. This one is simply where today's journey begins.</em></div></header>
        <div class="atlas__hint">Curiosity has always been the truest map of Atlantis. Touch a glowing light to enter.</div>
        <div class="atlas__bar dockable" role="toolbar" aria-label="Realms"><button class="dock-toggle" aria-expanded="true" aria-label="Tuck the bar away"><img src="assets/logo-emblem.png" alt=""></button><div class="dockable__items">${bar}</div></div>
      </section>`;
    stage.querySelectorAll("[data-realm]").forEach((b) => b.addEventListener("click", () => enterRealm(b.dataset.realm)));
    wireDockables(stage);
    if (arrivingFrom) { const m = stage.querySelector(".atlas__map"); m.classList.add("is-surfacing"); setTimeout(() => m.classList.remove("is-surfacing"), 1300); arrivingFrom = null; }
    // On narrow screens the map is wider than the view: start centred on the Heart.
    const vp = $("#atlas-vp");
    requestAnimationFrame(() => { vp.scrollLeft = (vp.scrollWidth - vp.clientWidth) / 2; vp.scrollTop = (vp.scrollHeight - vp.clientHeight) / 2; });
    enableDragPan(vp);
  }

  /* The clean, unlabelled Atlas painting ("Without Bake"); realm names float
     above it as living labels. x, y are percentages of the painting. */
  const ATLAS = {
    src: "assets/atlas-home.jpg",
    spots: {
      "sunlight-realms": { x: 26, y: 14 }, "bubble-coast-realm": { x: 66, y: 13 },
      "living-harvest-realm": { x: 22, y: 36 }, "crystal-conservatory-realm": { x: 84, y: 33 },
      "heart-of-atlantis": { x: 50, y: 37 }, "hearthlands-realm": { x: 22, y: 59 },
      "verdant-wilds-realm": { x: 81, y: 57 }, "celestial-realm": { x: 52, y: 72 },
    },
  };

  function enableDragPan(vp) {
    let down = false, sx = 0, sy = 0, sl = 0, st = 0, moved = false;
    vp.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sy = e.clientY; sl = vp.scrollLeft; st = vp.scrollTop; });
    window.addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 4) moved = true; vp.scrollLeft = sl - dx; vp.scrollTop = st - dy; });
    window.addEventListener("pointerup", () => { down = false; });
    vp.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  }

  function openRealm(id) {
    const r = realmById[id]; if (!r) return;
    discover("realms", r.id, r.name);
    const strains = W.strains.filter((s) => s.realm === r.id);
    const keepers = W.keepers.filter((k) => k.realm === r.id);
    const panel = $("#drawer-panel");
    panel.innerHTML = `
      <button class="drawer__close" data-close aria-label="Close realm">${svg(ICON.close).replace("<svg", '<svg width="20" height="20"')}</button>
      <div class="realm__hero"><img src="${esc(r.image)}" alt="Painting of ${esc(r.name)}"></div>
      <div class="realm__body">
        <div class="realm__num">${r.number ? "REALM " + r.number : "THE CENTRE OF THE ATLAS"}</div>
        <h2 id="drawer-title">${esc(r.name)}</h2>
        <p class="realm__tag">“${esc(r.tagline)}”</p>
        ${r.themes.length ? `<div class="chips">${r.themes.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="tabs" role="tablist">
          ${r.tale.length ? '<button role="tab" aria-selected="true" data-tab="tale">The tale</button>' : ""}
          <button role="tab" aria-selected="${r.tale.length ? "false" : "true"}" data-tab="dwellers">Dwellers (${strains.length + keepers.length})</button>
          <button role="tab" aria-selected="false" data-tab="places">Places (${r.districts.length})</button>
          ${r.visual.length ? '<button role="tab" aria-selected="false" data-tab="look">Look &amp; feel</button>' : ""}
        </div>
        ${r.tale.length ? `<div data-pane="tale" class="tale">
          ${r.tale.map(passageHTML).join('<div class="tale__sep" aria-hidden="true">✦</div>')}
          ${r.nudge ? `<aside class="nudge">${passageHTML(r.nudge)}</aside>` : ""}
        </div>` : ""}
        <div data-pane="dwellers"${r.tale.length ? " hidden" : ""}>
          ${keepers.length ? `<div class="section-label">Keepers who tend here</div><div class="cards">${keepers.map((k) => `<a class="ccard ccard--portrait" href="#/keepers/${k.id}" aria-label="${esc(k.name)}"><span class="ccard__face"><img class="ccard__art" src="${esc(k.portrait)}" alt="" loading="lazy"><span class="ccard__caption"><span class="ccard__name">${esc(k.name)}</span><span class="ccard__title">${esc(k.pillar)}</span></span></span></a>`).join("")}</div>` : ""}
          <div class="section-label">Strains of this realm</div>
          ${strains.length ? `<div class="cards">${strains.map((s) => cardHTML(s, { caption: true })).join("")}</div>` : `<div class="empty">Even now, seeds lie sleeping beneath the soil, waiting patiently for the day their stories are needed.<small>Manuscript V · The Endless Herbarium</small></div>`}
        </div>
        <div data-pane="places" hidden>
          <ul class="districts">${r.districts.map((d) => d.verse
            ? `<li class="has-verse${d.charted ? " is-charted" : ""}"><details><summary>${esc(d.name)}</summary>${passageHTML(d.verse)}</details></li>`
            : `<li class="${d.charted ? "is-charted" : ""}">${esc(d.name)}</li>`).join("")}</ul>
          <p class="legend">✦ charted on the Atlas · ❧ open a place to hear its verse · dashed: still hidden in mist</p>
        </div>
        ${r.visual.length ? `<div data-pane="look" hidden><ul class="visual">${r.visual.map((v) => `<li>${esc(v)}</li>`).join("")}</ul></div>` : ""}
      </div>`;
    wireTabs(panel);
    const d = $("#drawer"); d.classList.add("is-open"); d.setAttribute("aria-hidden", "false");
    panel.scrollTop = 0; setTimeout(() => panel.querySelector(".drawer__close").focus(), 50);
    document.querySelectorAll(`.pin[data-realm="${r.id}"]`).forEach((p) => p.classList.add("is-visited"));
  }
  function closeDrawer() { const d = $("#drawer"); d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true"); }

  function wireTabs(root) {
    root.querySelectorAll('[role="tab"]').forEach((t) => t.addEventListener("click", () => {
      root.querySelectorAll('[role="tab"]').forEach((x) => x.setAttribute("aria-selected", String(x === t)));
      root.querySelectorAll("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== t.dataset.tab; });
    }));
  }

  let cardFilter = "all";
  function viewCards(stage) {
    const realmsWith = W.realms.filter((r) => W.strains.some((s) => s.realm === r.id));
    const unplaced = W.strains.filter((s) => !s.realm).length;
    const list = W.strains.filter((s) => cardFilter === "all" || (cardFilter === "unplaced" ? !s.realm : s.realm === cardFilter))
      .sort((a, b) => (a.code || "ZZ").localeCompare(b.code || "ZZ") || a.name.localeCompare(b.name));
    stage.innerHTML = `
      <section class="page view">
        <header class="page__head"><p class="eyebrow">Collector Cards</p><h1>Strains of the Garden</h1>
          <p>Each strain is a story. Each card is a character. The Atlanteans believed that every plant carries a gift. No gift is greater than another. Each arrives when it is needed.</p><p class="small">${W.strains.length} cards so far: ${W.strains.length - unplaced} have found their realm on the Atlas, ${unplaced} are still finding theirs.</p></header>
        <div class="filters" role="group" aria-label="Filter by realm">
          <button aria-pressed="${cardFilter === "all"}" data-f="all">All realms</button>
          ${realmsWith.map((r) => `<button aria-pressed="${cardFilter === r.id}" data-f="${r.id}">${esc(r.name)}</button>`).join("")}
          ${unplaced ? `<button aria-pressed="${cardFilter === "unplaced"}" data-f="unplaced">Still finding their realm (${unplaced})</button>` : ""}
        </div>
        <div class="cards">${list.map((s) => cardHTML(s)).join("")}</div>
        ${demoStrip()}
      </section>`;
    stage.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { cardFilter = b.dataset.f; viewCards(stage); }));
  }

  function viewStrain(stage, id) {
    const s = strainById[id]; if (!s) return viewCards(stage);
    discover("cards", s.id, s.name);
    const r = realmById[s.realm]; const art = artFor(s);
    const kin = s.relations.map((rid) => {
      if (keeperById[rid]) { const k = keeperById[rid]; return `<a href="#/keepers/${k.id}"><img src="${esc(k.portrait)}" alt="">${esc(k.name)}</a>`; }
      if (strainById[rid]) { const o = strainById[rid]; return `<a href="#/cards/${o.id}"><span class="dot">${esc((o.code || "✦").replace("AG-", ""))}</span>${esc(o.name)}</a>`; }
      return "";
    }).join("");
    const cardSide = art
      ? `<div class="tilt" id="tilt"><button class="flip cardstage__flip" id="flip" aria-label="${art.back ? "Turn the " + esc(s.name) + " card over" : esc(s.name) + " card"}">
           <span class="flip__inner"><span class="flip__side"><img src="${esc(art.front)}" alt="${esc(s.name)} card front"><i class="glare"></i></span>
           ${art.back ? `<span class="flip__side flip__back"><img src="${esc(art.back)}" alt="${esc(s.name)} card back"><i class="glare"></i></span>` : ""}</span>
         </button></div>`
      : `<div class="ccard ccard--type cardstage__flip" style="aspect-ratio:2/3">${cardHTML(s).replace(/^<a[^>]*>|<\/a>$/g, "")}</div>`;
    const profile = [["Flavour", s.flavor], ["Aroma", s.aroma], ["Effects", s.effects], ["May relieve", s.mayRelieve]].filter(([, v]) => v);
    const where = r ? `${esc(r.name)}${districtName(s) ? " · " + esc(districtName(s)) : ""}` : "Still finding its realm";
    stage.innerHTML = `
      <section class="cardstage view">
        <div class="cardstage__bg" aria-hidden="true" style="background-image:url('${esc(r ? r.image : "assets/atlas-clean.jpg")}')"></div>
        <div class="cardstage__inner">
          <div class="crumbs">${r ? `<a href="#/realm/${r.id}">${esc(r.name)}</a>${districtName(s) ? " › " + esc(districtName(s)) : ""}` : '<a href="#/cards">Strains</a> › Still finding its realm'} › ${esc(s.name)}</div>
          <div class="cardstage__left"><div class="cardstage__card">${cardSide}</div>
          ${art ? `<div class="cardstage__controls" role="group" aria-label="Card side">
            <button class="seg is-on" data-side="front" aria-pressed="true">The character</button>
            ${art.back ? `<button class="seg" data-side="back" aria-pressed="false">The tale &amp; the plant</button>` : ""}
            <button class="seg seg--zoom" data-zoom aria-label="Read the card up close">Up close</button>
          </div>` : `<p class="flip__hint">Its portrait is still being painted</p>`}</div>
          <div class="cardstage__right">
          <p class="eyebrow cardstage__code">${esc(s.code || "Awaiting a card number")}${s.category ? " · " + esc(s.category) : ""}</p>
          <h1 class="cardstage__name">${esc(s.name)}</h1>
          ${(s.cardTitle || s.title) ? `<p class="cardstage__title">${esc(s.cardTitle || s.title)}</p>` : ""}
          ${s.quote ? `<blockquote class="cardstage__quote">“${esc(s.quote)}”</blockquote>` : ""}
          <p class="cardstage__where">✦ ${where}</p>
          ${art && art.back ? `<p class="cardstage__nudge">Turn the card over to read its tale, its flavour and its effects.</p>` : ""}
          </div>
        </div>
      </section>
      <section class="page view herbarium">
        <article class="parchment">
          <p class="eyebrow">From the Herbarium</p>
          <div class="chips">${s.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          <div class="ptabs" role="tablist">
            <button role="tab" aria-selected="true" data-tab="story">Story</button>
            <button role="tab" aria-selected="false" data-tab="effects">Effects</button>
            <button role="tab" aria-selected="false" data-tab="terpenes">Terpenes</button>
            <button role="tab" aria-selected="false" data-tab="pairs">Pairs with</button>
            <button role="tab" aria-selected="false" data-tab="grow">Grow notes</button>
          </div>
          <div data-pane="story">
            ${s.body ? `<p>${esc(s.body)}</p>` : `<p class="empty">${art && art.back ? "This strain's tale is written on the back of its card. Turn it over above." : EMPTY}</p>`}
            <aside class="plant-ask">${passageHTML(PLANT_ASK)}</aside>
            <dl class="kv"><dt>Atlas realm</dt><dd>${r ? esc(r.name) : "Still finding its realm"}</dd>${districtName(s) ? `<dt>District</dt><dd>${esc(districtName(s))}</dd>` : ""}${s.printedRealm ? `<dt>On the card</dt><dd>${esc(s.printedRealm)}</dd>` : ""}</dl>
          </div>
          <div data-pane="effects" hidden>${profile.length ? `<dl class="kv">${profile.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : `<div class="empty">${art && art.back ? "Turn the card over: its flavour and effects are written on its back." : EMPTY}</div>`}</div>
          <div data-pane="terpenes" hidden>${s.terpenes.length ? `<div class="chips">${s.terpenes.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : `<div class="empty">${EMPTY}</div>`}</div>
          <div data-pane="pairs" hidden>${kin ? `<div class="kin">${kin}</div>` : `<div class="empty">${EMPTY}</div>`}</div>
          <div data-pane="grow" hidden>${s.growNotes ? `<p>${esc(s.growNotes)}</p>` : `<div class="empty">${EMPTY}</div>`}</div>
        </article>
      </section>`;
    wireTabs(stage.querySelector(".parchment"));
    const flip = $("#flip"), segs = stage.querySelectorAll(".seg[data-side]");
    const show = (side) => {
      if (!flip || !art || !art.back) return;
      flip.classList.toggle("is-flipped", side === "back");
      segs.forEach((b) => { const on = b.dataset.side === side; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on)); });
    };
    if (flip && art && art.back) flip.addEventListener("click", () => show(flip.classList.contains("is-flipped") ? "front" : "back"));
    segs.forEach((b) => b.addEventListener("click", () => show(b.dataset.side)));
    const zoom = stage.querySelector("[data-zoom]");
    if (zoom) zoom.addEventListener("click", () => openCloseUp(flip && flip.classList.contains("is-flipped") ? art.back : art.front, s.name));
    const tilt = $("#tilt");
    if (tilt && !reduceMotion() && window.matchMedia("(hover: hover)").matches) {
      tilt.addEventListener("pointermove", (e) => {
        const b = tilt.getBoundingClientRect(); const px = (e.clientX - b.left) / b.width - .5, py = (e.clientY - b.top) / b.height - .5;
        tilt.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 12}deg)`;
        tilt.style.setProperty("--gx", `${(px + .5) * 100}%`); tilt.style.setProperty("--gy", `${(py + .5) * 100}%`);
      });
      tilt.addEventListener("pointerleave", () => { tilt.style.transform = ""; });
    }
  }

  function openCloseUp(src, name) {
    const el = document.createElement("div");
    el.className = "closeup"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", name + " up close");
    el.innerHTML = `<img src="${esc(src)}" alt="${esc(name)} card, up close"><button class="drawer__close" aria-label="Close">${svg(ICON.close).replace("<svg", '<svg width="20" height="20"')}</button>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));
    const onKey = (e) => { if (e.key === "Escape") shut(); };
    const shut = () => { el.classList.remove("is-in"); setTimeout(() => el.remove(), 350); document.removeEventListener("keydown", onKey); };
    el.addEventListener("click", shut); document.addEventListener("keydown", onKey);
    setTimeout(() => el.querySelector("button").focus(), 50);
  }

  function viewKeepers(stage) {
    stage.innerHTML = `
      <section class="page view">
        <header class="page__head"><p class="eyebrow">The Hall of Living Portraits</p><h1>The Keepers of the Garden</h1>
          <p>These portraits were never painted to preserve appearances, but to preserve spirit. Each Keeper brings a unique gift. None is greater than another.</p></header>
        <div class="hall">${W.keepers.map((k) => `<a class="portrait" href="#/keepers/${k.id}" aria-label="${esc(k.name)}, ${esc(k.pillar)}: ${esc(k.virtue)}"><img src="${esc(k.portrait)}" alt="Portrait of ${esc(k.name)}" loading="lazy"></a>`).join("")}</div>
        <div class="together">
          <div><div class="section-label">The five pillars</div>
            <div class="pillars">${W.keepers.map((k) => `<a href="#/keepers/${k.id}"><img src="${esc(k.portrait)}" alt=""><span><b>${esc(k.name)}</b> · ${esc(k.pillar)} — ${esc(k.virtue)}<br><span>“${esc(k.question)}”</span></span></a>`).join("")}</div>
          </div>
          <div><div class="section-label">Together they cultivate</div><ol>${W.together.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div>
        </div>
        <aside class="nudge nudge--page">${passageHTML(ANY_KEEPER)}</aside>
      </section>`;
  }

  function viewKeeper(stage, id) {
    const k = keeperById[id]; if (!k) return viewKeepers(stage);
    discover("keepers", k.id, k.name);
    const r = k.realm && realmById[k.realm];
    const tends = W.strains.filter((s) => k.relations.includes(s.id) || s.relations.includes(k.id));
    stage.innerHTML = `
      <section class="page view">
        <a class="backlink" href="#/keepers">${svg(ICON.back).replace("<svg", '<svg width="18" height="18"')} The Hall of Living Portraits</a>
        <div class="keeper">
          <div class="keeper__portrait"><img src="${esc(k.portrait)}" alt="Portrait of ${esc(k.name)}"></div>
          <article class="parchment">
            <p class="eyebrow">${esc(k.pillar)} · ${esc(k.virtue)}</p>
            <h1>${esc(k.name)}</h1>
            <p class="sub">${esc(k.epithet)}</p>
            <blockquote>“${esc(k.motto)}”</blockquote>
            <div class="essence">${k.essence.map((e) => `<p>${esc(e)}</p>`).join("")}</div>
            <div class="ornament">✦</div>
            <p><em>${esc(k.philosophy)}</em></p>
            <div class="section-label" style="color:#9a7432">Callings</div>
            <div class="roles chips">${k.roles.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
            ${r ? `<div class="section-label" style="color:#9a7432">Found in the Atlas</div><p><a href="#/atlas/${r.id}" style="color:#2c4a3c">${esc(r.name)}</a>${k.district && r.districtIds[k.district] ? " · " + esc(r.districtIds[k.district]) : ""}</p>` : ""}
            ${tends.length ? `<div class="section-label" style="color:#9a7432">Kindred strains</div><div class="kin">${tends.map((s) => `<a href="#/cards/${s.id}"><span class="dot">${esc((s.code || "✦").replace("AG-", ""))}</span>${esc(s.name)}</a>`).join("")}</div>` : ""}
          </article>
        </div>
      </section>`;
  }

  function viewLore(stage) {
    stage.innerHTML = `
      <section class="page view">
        <header class="page__head"><p class="eyebrow">The Atlantean Archives</p><h1>Thirteen Manuscripts</h1>
          <p>These manuscripts are not relics. They are companions. Open one to read its opening inscription.</p></header>
        <div class="lore-intro">${W.intro.map((l) => `<p>${esc(l)}</p>`).join("")}</div>
        <div class="scrolls">${W.manuscripts.map((m) => `
          <button class="scroll${journey.scrolls.includes(m.number) ? " is-read" : ""}" data-ms="${esc(m.number)}" aria-expanded="false">
            <span class="num">MANUSCRIPT ${esc(m.number)}</span>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.provenance)}</p>
            <span class="insc">${m.inscription.map((l) => esc(l)).join("<br>")}</span>
          </button>`).join("")}</div>
        ${demoStrip()}
      </section>`;
    stage.querySelectorAll(".scroll").forEach((b) => b.addEventListener("click", () => {
      const open = b.classList.toggle("is-open"); b.setAttribute("aria-expanded", String(open));
      const m = W.manuscripts.find((x) => x.number === b.dataset.ms);
      if (open) discover("scrolls", m.number, `Manuscript ${m.number}`);
    }));
  }

  function viewJourney(stage) {
    const p = progress(); const t = totals();
    stage.innerHTML = `
      <section class="page view">
        <header class="page__head"><p class="eyebrow">Caretaker's Journal</p><h1>Your Journey</h1>
          <p>The Garden never asked who you were. It gently asked who you were becoming.</p></header>
        <div class="meter" style="height:10px;margin-bottom:1.6rem"><i style="width:${p.pct}%"></i></div>
        <div class="journey-grid">
          <div class="stat"><b>${journey.realms.length}/${t.realms}</b><span>Realms entered</span></div>
          <div class="stat"><b>${journey.cards.length}/${t.cards}</b><span>Strains met</span></div>
          <div class="stat"><b>${journey.keepers.length}/${t.keepers}</b><span>Keepers met</span></div>
          <div class="stat"><b>${journey.sightings.length}/${t.sightings}</b><span>Keepers spotted in hiding</span></div>
          <div class="stat"><b>${journey.scrolls.length}/${t.scrolls}</b><span>Manuscripts opened</span></div>
          <div class="stat"><b>${p.pct}%</b><span>of the charted Atlas</span></div>
        </div>
        <div class="section-label">Realms</div>
        <div class="realm-list">${W.realms.map((r) => `<button class="realm-tile${journey.realms.includes(r.id) ? " is-visited" : ""}${journey.bloomed.includes(r.id) ? " is-bloomed" : ""}" data-realm="${r.id}"><img src="${esc(r.image)}" alt="" loading="lazy"><span>${esc(r.name)}<em>${journey.realms.includes(r.id) ? esc(r.tagline) : "Still hidden in mist"}</em></span></button>`).join("")}</div>
        <aside class="nudge nudge--page">${passageHTML(BECOMING)}</aside>
        <p style="margin-top:2rem"><button class="btn" id="reset">Begin the journey again</button></p>
        ${demoStrip()}
      </section>`;
    stage.querySelectorAll("[data-realm]").forEach((b) => b.addEventListener("click", () => { location.hash = `#/realm/${b.dataset.realm}`; }));
    $("#reset").addEventListener("click", () => { journey = { realms: [], cards: [], keepers: [], scrolls: [], sightings: [], bloomed: [] }; save(); renderRailJourney(); viewJourney(stage); toast("The mist settles back over the Atlas."); });
  }

  const demoStrip = () => `<div class="demo-strip"><b>A work in progress.</b> Every name, story, verse and image here grows from Cassidy's Atlantean Archives; nothing has been invented. Where a page is still blank, the Garden is still growing. Your journey is kept only in this browser.</div>`;

  /* Bottom bars tuck away into the tree emblem, so nothing hides the art. */
  const TUCK_KEY = "ag-bars-tucked";
  function wireDockables(root) {
    let tucked = false; try { tucked = localStorage.getItem(TUCK_KEY) === "1"; } catch (e) { /* ignore */ }
    const apply = (t) => root.querySelectorAll(".dockable").forEach((d) => {
      d.classList.toggle("is-tucked", t);
      const b = d.querySelector(".dock-toggle");
      b.setAttribute("aria-expanded", String(!t)); b.setAttribute("aria-label", t ? "Open the bar" : "Tuck the bar away");
    });
    apply(tucked);
    root.querySelectorAll(".dock-toggle").forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation(); tucked = !tucked; apply(tucked);
      try { localStorage.setItem(TUCK_KEY, tucked ? "1" : "0"); } catch (err) { /* ignore */ }
    }));
  }

  /* ── Realm portals and hidden glimmers ──────────────────── */
  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Hiding places and riddles live in js/hiding.js (window.HIDING).
  // Fallback spots for anyone not yet given a hiding place.
  const GLIMMER_SPOTS = [[58, 38], [76, 60], [45, 70], [86, 32], [64, 82], [36, 52], [70, 44], [52, 56]];
  let arrivingFrom = null;

  function enterRealm(id) {
    const r = realmById[id]; if (!r) return;
    const pin = document.querySelector(`.pin[data-realm="${id}"]`);
    if (!pin || reduceMotion()) { location.hash = `#/realm/${id}`; return; }
    const box = pin.getBoundingClientRect();
    const x = box.left + box.width / 2, y = box.top + box.height / 2;
    const map = pin.closest(".atlas__map"), mb = map.getBoundingClientRect();
    map.style.transformOrigin = `${x - mb.left}px ${y - mb.top}px`;
    map.classList.add("is-diving");
    const portal = document.createElement("div");
    portal.className = "portal"; portal.setAttribute("aria-hidden", "true");
    portal.style.setProperty("--x", x + "px"); portal.style.setProperty("--y", y + "px");
    portal.innerHTML = `<span class="portal__ring"></span><span class="portal__art" style="background-image:url('${r.image}')"></span>`;
    document.body.appendChild(portal);
    requestAnimationFrame(() => requestAnimationFrame(() => portal.classList.add("is-open")));
    setTimeout(() => {
      location.hash = `#/realm/${id}`;
      setTimeout(() => { portal.classList.add("is-done"); setTimeout(() => portal.remove(), 700); }, 120);
    }, 1300);
  }

  function leaveRealm(id) { arrivingFrom = id; location.hash = "#/atlas"; }

  function glimmersFor(r) {
    const hide = HIDING[r.id] || { strains: {}, keepers: {} };
    const strains = W.strains.filter((s) => s.realm === r.id).map((s) => ({ kind: "cards", id: s.id, key: s.id, name: s.name, s, h: (hide.strains || {})[s.id] }));
    const keepers = W.keepers.filter((k) => (hide.keepers || {})[k.id]).map((k) => ({ kind: "keepers", id: k.id, key: `${r.id}:${k.id}`, name: k.name, k, h: hide.keepers[k.id] }));
    const shift = (r.order || 0) % GLIMMER_SPOTS.length;
    return strains.concat(keepers).map((g, i) => Object.assign(g, {
      spot: g.h ? [g.h.x, g.h.y] : GLIMMER_SPOTS[(i + shift) % GLIMMER_SPOTS.length],
      riddle: g.h ? g.h.riddle : "",
    }));
  }
  const isFound = (g) => g.kind === "keepers" ? journey.sightings.includes(g.key) : journey.cards.includes(g.id);

  /* Ambient life: each realm breathes with the "visual identity" from
     The Atlas 7 Worlds (bubbles rising on the Bubble Coast, embers in the
     Hearthlands, stars in the Celestial Realm...). Drawn on a canvas. */
  const AMBIENCE = {
    "sunlight-realms": { kind: "petals", n: 34, colors: ["#ffd7e3", "#fff1c9", "#ffe39a"] },
    "bubble-coast-realm": { kind: "bubbles", n: 38, colors: ["#d7f6ff", "#9fe6f2"] },
    "living-harvest-realm": { kind: "leaves", n: 26, colors: ["#e9c46a", "#a7c957", "#d4a373"] },
    "crystal-conservatory-realm": { kind: "glints", n: 46, colors: ["#e4d4ff", "#b9f3ff", "#ffffff"] },
    "hearthlands-realm": { kind: "embers", n: 40, colors: ["#ffb347", "#ff7b39", "#ffe08a"] },
    "verdant-wilds-realm": { kind: "fireflies", n: 30, colors: ["#e8ff9c", "#c5f27a"] },
    "celestial-realm": { kind: "stars", n: 70, colors: ["#ffffff", "#dcd3ff", "#bfe6ff"] },
    "heart-of-atlantis": { kind: "motes", n: 34, colors: ["#fff3c4", "#d9f2c4"] },
  };
  function startAmbience(canvas, realmId) {
    const cfg = AMBIENCE[realmId]; if (!cfg || reduceMotion()) return;
    const ctx = canvas.getContext("2d"); let w = 0, h = 0, dpr = 1;
    const size = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); window.addEventListener("resize", size);
    const rnd = (a, b) => a + Math.random() * (b - a);
    const spawn = (fresh) => {
      const p = { x: rnd(0, w), y: fresh ? rnd(0, h) : 0, c: cfg.colors[Math.floor(Math.random() * cfg.colors.length)], t: rnd(0, 6.28), s: rnd(.6, 1.4) };
      switch (cfg.kind) {
        case "bubbles": p.r = rnd(2, 7); p.vy = -rnd(.25, .8); p.vx = 0; if (!fresh) p.y = h + 10; break;
        case "embers": p.r = rnd(1, 2.6); p.vy = -rnd(.3, .9); p.vx = rnd(-.15, .15); if (!fresh) p.y = h + 5; break;
        case "petals": p.r = rnd(2.5, 5); p.vy = rnd(.25, .6); p.vx = rnd(.15, .5); if (!fresh) p.y = -10; break;
        case "leaves": p.r = rnd(3, 6); p.vy = rnd(.3, .7); p.vx = rnd(-.2, .25); if (!fresh) p.y = -10; break;
        default: p.r = rnd(.8, 2.4); p.vy = rnd(-.12, .12); p.vx = rnd(-.15, .15);
      }
      return p;
    };
    const ps = Array.from({ length: cfg.n }, () => spawn(true));
    let last = performance.now(), raf = 0;
    const frame = (now) => {
      if (!canvas.isConnected) { window.removeEventListener("resize", size); return; }
      const dt = Math.min(3, (now - last) / 16.7); last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]; p.t += .02 * dt * p.s;
        const sway = Math.sin(p.t) * (cfg.kind === "petals" || cfg.kind === "leaves" ? .6 : cfg.kind === "bubbles" ? .35 : .25);
        p.x += (p.vx + sway) * dt; p.y += p.vy * dt;
        if (p.y < -20 || p.y > h + 20 || p.x < -20 || p.x > w + 20) { ps[i] = spawn(cfg.kind === "glints" || cfg.kind === "stars" || cfg.kind === "fireflies" || cfg.kind === "motes"); continue; }
        const pulse = .5 + .5 * Math.sin(p.t * (cfg.kind === "stars" || cfg.kind === "glints" ? 2.4 : 1.3));
        ctx.save(); ctx.translate(p.x, p.y);
        if (cfg.kind === "bubbles") {
          ctx.globalAlpha = .55; ctx.strokeStyle = p.c; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, p.r, 0, 6.28); ctx.stroke();
          ctx.globalAlpha = .7; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-p.r * .35, -p.r * .35, p.r * .25, 0, 6.28); ctx.fill();
        } else if (cfg.kind === "petals" || cfg.kind === "leaves") {
          ctx.rotate(p.t); ctx.globalAlpha = .75; ctx.fillStyle = p.c; ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .45, 0, 0, 6.28); ctx.fill();
        } else {
          const glow = cfg.kind === "embers" ? .9 : pulse;
          ctx.globalAlpha = glow; ctx.shadowColor = p.c; ctx.shadowBlur = cfg.kind === "stars" ? 6 : 12;
          ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(0, 0, p.r * (cfg.kind === "glints" ? .6 + pulse : 1), 0, 6.28); ctx.fill();
          if (cfg.kind === "glints" && pulse > .85) { ctx.fillRect(-p.r * 4, -.5, p.r * 8, 1); ctx.fillRect(-.5, -p.r * 4, 1, p.r * 8); }
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else if (canvas.isConnected) { last = performance.now(); raf = requestAnimationFrame(frame); } });
  }

  function viewRealm(stage, id) {
    const r = realmById[id]; if (!r) return viewAtlas(stage);
    discover("realms", r.id, r.name);
    const glims = glimmersFor(r);
    const found = isFound;
    stage.innerHTML = `
      <section class="scene view" aria-label="${esc(r.name)}">
        <div class="scene__vp" id="scene-vp">
          <div class="scene__art">
            <img src="${esc(sceneImage(r))}" alt="Painting of ${esc(r.name)}" draggable="false">
            ${scrollWords(r)}
            ${glims.map((g, i) => g.kind === "keepers"
              ? `<button class="glimmer glimmer--keeper${found(g) ? " is-found" : ""}" style="left:${g.spot[0]}%;top:${g.spot[1]}%;--d:${(i * 0.9).toFixed(1)}s" data-g="${i}"${found(g) ? ` data-near="${esc(g.name)}"` : ""} aria-label="${found(g) ? esc(g.name) : "Someone hiding"}"><img src="assets/keepers/${g.id}-face.png" alt=""></button>`
              : `<button class="glimmer${found(g) ? " is-found" : ""}" style="left:${g.spot[0]}%;top:${g.spot[1]}%;--d:${(i * 0.7).toFixed(1)}s" data-g="${i}"${found(g) ? ` data-near="${esc(g.name)}"` : ""} aria-label="${found(g) ? esc(g.name) : "A hidden glimmer"}"><span></span></button>`).join("")}
          </div>
        </div>
        <div class="scene__fore" aria-hidden="true" style="background-image:url('${esc(sceneImage(r))}')"></div>
        <canvas class="scene__life" aria-hidden="true"></canvas>
        <header class="scene__head">
          <div class="realm__num">${r.number ? "REALM " + r.number : "THE CENTRE OF THE ATLAS"}</div>
          <h1>${esc(r.name)}</h1>
          <p>“${esc(r.tagline)}”</p>
        </header>
        <div class="scene__hint">${glims.length
          ? `<span>A distant light glimpsed through ancient trees.</span><small>Manuscript VI · Wonder Before Explanation</small>`
          : `<span>Even now, seeds lie sleeping beneath the soil, waiting patiently for the day their stories are needed.</span><small>Manuscript V · The Endless Herbarium</small>`}</div>
        <div class="scene__bar dockable">
          <button class="dock-toggle" aria-expanded="true" aria-label="Tuck the bar away"><img src="assets/logo-emblem.png" alt=""></button>
          <div class="dockable__items"><button class="btn" data-leave>${svg(ICON.back).replace("<svg", '<svg width="16" height="16"')} The Atlas</button>
          <button class="btn" data-tale>Read the tale</button>
          ${glims.length ? `<button class="btn btn--gold" data-seek aria-expanded="false" aria-controls="seek">Riddles</button><span class="scene__count" id="scene-count"></span>` : ""}</div>
        </div>
        ${glims.length ? `<aside class="seek" id="seek" aria-label="Who is hiding here">
          <p class="seek__title">Seek in ${esc(r.name)}</p><p class="seek__sub">${glims.filter((g) => g.kind === "cards").length ? "A strain card and the five Keepers hide here. " : "The five Keepers hide here. "}Read each riddle, then search the painting.</p>
          <ol>${glims.map((g, i) => {
            const thumb = g.kind === "keepers" ? `assets/keepers/${g.id}-face.png` : (g.s.art && g.s.art.front);
            return `<li class="${found(g) ? "is-found" : ""}" data-gi="${i}">
              ${thumb ? `<img class="seek__thumb${g.kind === "keepers" ? " seek__thumb--face" : ""}" src="${esc(thumb)}" alt="" loading="lazy">` : `<span class="seek__thumb seek__thumb--blank">✦</span>`}
              <div><b>${esc(g.name)}</b><span class="riddle">${(g.riddle || "Somewhere in this realm.").split(" / ").map(esc).join("<br>")}</span><button class="whisper" data-whisper="${i}" aria-label="Whisper a hint for ${esc(g.name)}">✧ Whisper a hint</button></div>
            </li>`; }).join("")}</ol>
        </aside>` : ""}
      </section>`;
    const updateCount = (justFound) => {
      const c = $("#scene-count"), n = glims.filter(found).length;
      if (c) c.textContent = `✦ ${n} of ${glims.length} found`;
      if (justFound && glims.length && n === glims.length && !journey.bloomed.includes(r.id)) {
        journey.bloomed.push(r.id); save(); setTimeout(() => bloomRealm(stage, r), 1400);
      }
    };
    updateCount();
    stage.querySelector("[data-leave]").addEventListener("click", () => leaveRealm(r.id));
    stage.querySelector("[data-tale]").addEventListener("click", () => openRealm(r.id));
    stage.querySelectorAll(".glimmer").forEach((b) => b.addEventListener("click", () => {
      const g = glims[+b.dataset.g];
      revealGlimmer(g, b, () => {
        b.classList.add("is-found"); b.setAttribute("aria-label", g.name); b.dataset.near = g.name; updateCount(true);
        const li = stage.querySelector(`.seek li[data-gi="${b.dataset.g}"]`); if (li) li.classList.add("is-found");
      });
    }));
    const seek = $("#seek"), seekBtn = stage.querySelector("[data-seek]");
    if (seekBtn) seekBtn.addEventListener("click", () => { const o = seek.classList.toggle("is-open"); seekBtn.setAttribute("aria-expanded", String(o)); });
    stage.querySelectorAll(".seek li").forEach((li) => li.addEventListener("click", () => {
      const b = stage.querySelector(`.glimmer[data-g="${li.dataset.gi}"]`);
      if (li.classList.contains("is-found")) { b.click(); return; }
      li.classList.add("is-seeking"); setTimeout(() => li.classList.remove("is-seeking"), 1200);
    }));
    stage.querySelectorAll("[data-whisper]").forEach((w) => w.addEventListener("click", (e) => {
      e.stopPropagation();
      const b = stage.querySelector(`.glimmer[data-g="${w.dataset.whisper}"]`);
      if (window.matchMedia("(max-width: 860px)").matches) { seek.classList.remove("is-open"); seekBtn.setAttribute("aria-expanded", "false"); }
      b.scrollIntoView({ block: "center", inline: "center", behavior: reduceMotion() ? "auto" : "smooth" });
      b.classList.remove("is-hinted"); void b.offsetWidth; b.classList.add("is-hinted");
      setTimeout(() => b.classList.remove("is-hinted"), 3600);
    }));
    startAmbience(stage.querySelector(".scene__life"), r.id);
    startDepth(stage.querySelector(".scene"));
    wireDockables(stage);
    const vp = $("#scene-vp");
    requestAnimationFrame(() => { vp.scrollLeft = (vp.scrollWidth - vp.clientWidth) / 2; vp.scrollTop = (vp.scrollHeight - vp.clientHeight) / 2; });
    enableDragPan(vp);
  }

  /* 2.5D: the painting, a soft out-of-focus foreground and the drifting
     particles move at different speeds as the pointer (or a tilted phone)
     moves, so the flat painting reads as layered depth. */
  let askedTilt = false;
  function startDepth(scene) {
    if (!scene || reduceMotion()) return;
    const art = scene.querySelector(".scene__art"), fore = scene.querySelector(".scene__fore"), life = scene.querySelector(".scene__life");
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e) => { const b = scene.getBoundingClientRect(); tx = (e.clientX - b.left) / b.width - .5; ty = (e.clientY - b.top) / b.height - .5; };
    const onTilt = (e) => { if (e.gamma == null) return; tx = Math.max(-.5, Math.min(.5, e.gamma / 40)); ty = Math.max(-.5, Math.min(.5, (e.beta - 45) / 40)); };
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", () => { tx = 0; ty = 0; });
    window.addEventListener("deviceorientation", onTilt);
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function" && !askedTilt) {
      scene.addEventListener("pointerdown", () => { if (askedTilt) return; askedTilt = true; DeviceOrientationEvent.requestPermission().catch(() => {}); }, { once: true });
    }
    const frame = () => {
      if (!scene.isConnected) { window.removeEventListener("deviceorientation", onTilt); return; }
      x += (tx - x) * .06; y += (ty - y) * .06;
      art.style.transform = `translate(${-x * 18}px, ${-y * 12}px) scale(1.03)`;
      if (fore) fore.style.transform = `translate3d(${-x * 46}px, ${-y * 30}px, 0) scale(1.18)`;
      if (life) life.style.transform = `translate3d(${x * 26}px, ${y * 18}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  }

  /* Words lifted off each realm's title scroll float back above it. */
  const SCROLLS = window.SCROLL_TEXT || {};
  const sceneImage = (r) => SCROLLS[r.id] ? r.image.replace(/\.jpg$/, "-clean.jpg") : r.image;
  function scrollWords(r) {
    const sc = SCROLLS[r.id]; if (!sc) return "";
    const [l, t, rr, b] = sc.box, W = 1536, H = 1024;
    return `<div class="scroll-words" style="left:${(l / W * 100).toFixed(2)}%;top:${(t / H * 100).toFixed(2)}%;width:${((rr - l) / W * 100).toFixed(2)}%;height:${((b - t) / H * 100).toFixed(2)}%;--ink:${sc.ink}" aria-hidden="true">
      <p class="scroll-words__title">${sc.title.map(esc).join("<br>")}</p>
      <span class="scroll-words__rule">✦</span>
      ${sc.body.map(([txt, kind]) => `<p class="scroll-words__body${kind === "plain" ? " is-plain" : ""}">${esc(txt)}</p>`).join('<span class="scroll-words__rule is-small">❧</span>')}
    </div>`;
  }

  function realmTally(r) { const g = glimmersFor(r); return { found: g.filter(isFound).length, total: g.length }; }

  /* When everyone hiding in a realm has been found, the realm blooms. */
  const BLOOM = { lines: ["Only together does the Garden truly bloom."], source: "Character Bible · The Gardeners of Atlantean Gardens" };
  function bloomRealm(stage, r) {
    const scene = stage.querySelector(".scene"); if (!scene) return;
    const el = document.createElement("div");
    el.className = "bloom"; el.setAttribute("role", "status");
    el.innerHTML = `<div class="bloom__ring" aria-hidden="true"></div>
      <div class="bloom__card"><p class="eyebrow">${esc(r.name)} has bloomed</p>
      <p class="bloom__line">${esc(BLOOM.lines[0])}</p><small>${esc(BLOOM.source)}</small>
      <p class="bloom__note">Every strain and Keeper hiding here has been found.</p>
      <button class="btn btn--gold" data-bloom-ok>Keep wandering</button></div>`;
    scene.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));
    const close = () => { el.classList.remove("is-in"); setTimeout(() => el.remove(), 600); };
    el.querySelector("[data-bloom-ok]").addEventListener("click", close);
    setTimeout(close, 9000);
    toast(`✦ ${r.name} has bloomed`);
  }

  function revealGlimmer(g, from, done) {
    const fb = from.getBoundingClientRect();
    const art = g.kind === "cards" ? (g.s.art || null) : null;
    const front = g.kind === "keepers" ? g.k.portrait : (art && art.front);
    const back = art && art.back;
    const title = g.kind === "keepers" ? `${g.k.pillar} · ${g.k.virtue}` : (g.s.cardTitle || g.s.title || "");
    const link = g.kind === "keepers" ? `#/keepers/${g.id}` : `#/cards/${g.id}`;
    const msg = g.kind === "keepers" ? ((window.KEEPER_MESSAGES || {})[g.key.split(":")[0]] || {})[g.id] : null;
    const el = document.createElement("div");
    el.className = "reveal"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", g.name);
    el.style.setProperty("--fx", (fb.left + fb.width / 2 - innerWidth / 2) + "px");
    el.style.setProperty("--fy", (fb.top + fb.height / 2 - innerHeight / 2) + "px");
    el.innerHTML = `
      <div class="reveal__scrim" data-shut></div>
      <div class="reveal__body">
        ${front
          ? `<button class="flip reveal__card" aria-label="${back ? "Turn the card over" : esc(g.name)}"><span class="flip__inner"><span class="flip__side"><img src="${esc(front)}" alt="${esc(g.name)}"></span>${back ? `<span class="flip__side flip__back"><img src="${esc(back)}" alt="${esc(g.name)}, card back"></span>` : ""}</span></button>`
          : `<div class="reveal__card ccard ccard--type">${cardHTML(g.s).replace(/^<a[^>]*>|<\/a>$/g, "")}</div>`}
        <p class="eyebrow">${g.kind === "keepers" ? "You spotted a Keeper" : "You found a strain"}</p>
        <h2>${esc(g.name)}</h2>
        ${title ? `<p class="reveal__title">${esc(title)}</p>` : ""}
        ${msg ? `<div class="reveal__message"><p class="reveal__says">${esc(g.name)} whispers</p>${passageHTML(msg)}</div>` : ""}
        ${back ? '<p class="reveal__hint">Tap the card to turn it over</p>' : ""}
        <div class="reveal__actions"><a class="btn btn--gold" href="${link}">${g.kind === "keepers" ? "Meet them" : "Read its story"}</a><button class="btn" data-shut>Keep wandering</button></div>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
    const flip = el.querySelector("button.flip"); if (flip && back) flip.addEventListener("click", () => flip.classList.toggle("is-flipped"));
    const onKey = (e) => { if (e.key === "Escape") shut(); };
    const shut = () => { el.classList.remove("is-in"); setTimeout(() => el.remove(), 450); document.removeEventListener("keydown", onKey); };
    document.addEventListener("keydown", onKey);
    el.querySelectorAll("[data-shut]").forEach((x) => x.addEventListener("click", shut));
    el.querySelector(".reveal__actions a").addEventListener("click", () => { document.removeEventListener("keydown", onKey); el.remove(); });
    if (g.kind === "keepers") discover("sightings", g.key, `${g.name} in the ${(realmById[g.key.split(":")[0]] || {}).name || "Garden"}`); else discover("cards", g.id, g.name);
    done();
    setTimeout(() => el.querySelector(".reveal__actions a").focus(), 400);
  }

  /* ── Router ────────────────────────────────────────────── */
  let lastBase = "";
  function route() {
    const [, base = "atlas", id] = (location.hash || "#/atlas").split("/");
    const stage = $("#stage");
    document.querySelectorAll(".reveal, .closeup, .bloom").forEach((el) => el.remove());
    renderNav(base === "realm" ? "atlas" : base);
    $("#app").dataset.view = base;
    if (base === "atlas") {
      if (lastBase !== "atlas" || !stage.querySelector(".atlas")) viewAtlas(stage);
      if (id) openRealm(id); else closeDrawer();
    } else {
      closeDrawer();
      if (base === "realm") viewRealm(stage, id);
      else if (base === "cards") id ? viewStrain(stage, id) : viewCards(stage);
      else if (base === "keepers") id ? viewKeeper(stage, id) : viewKeepers(stage);
      else if (base === "lore") viewLore(stage);
      else if (base === "journey") viewJourney(stage);
      else viewAtlas(stage);
      window.scrollTo(0, 0);
    }
    lastBase = base;
  }

  /* ── Threshold ─────────────────────────────────────────── */
  function threshold() {
    const box = $("#threshold-intro");
    const lines = W.intro.slice(-5);
    box.innerHTML = lines.map((l, i) => `<p class="${i === lines.length - 1 ? "is-last" : ""}" style="animation-delay:${0.5 + i * 0.7}s">${esc(l)}</p>`).join("");
    const enter = () => {
      $("#threshold").classList.add("is-leaving");
      $("#app").hidden = false;
      try { sessionStorage.setItem("ag-entered", "1"); } catch (e) { /* ignore */ }
      route(); renderRailJourney();
      setTimeout(() => $("#threshold").remove(), 1200);
    };
    $("#enter").addEventListener("click", enter);
    let entered = false; try { entered = sessionStorage.getItem("ag-entered") === "1"; } catch (e) { /* ignore */ }
    if (entered || (location.hash && location.hash !== "#/atlas" && location.hash !== "#/")) enter();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { if (location.hash.startsWith("#/realm/")) closeDrawer(); else location.hash = "#/atlas"; }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#drawer").classList.contains("is-open")) { if (location.hash.startsWith("#/realm/")) closeDrawer(); else location.hash = "#/atlas"; }
  });
  /* The side menu tucks away into the tree emblem and opens again from it. */
  (function railToggle() {
    const KEY = "ag-rail-tucked", app = $("#app"), btn = $("#rail-toggle");
    const apply = (t) => {
      app.classList.toggle("rail-tucked", t);
      btn.setAttribute("aria-expanded", String(!t)); btn.setAttribute("aria-label", t ? "Open the menu" : "Tuck the menu away");
    };
    let t = false; try { t = localStorage.getItem(KEY) === "1"; } catch (e) { /* ignore */ }
    apply(t);
    btn.addEventListener("click", () => { t = !t; apply(t); try { localStorage.setItem(KEY, t ? "1" : "0"); } catch (e) { /* ignore */ } });
  })();
  window.addEventListener("hashchange", route);
  threshold();
})();
