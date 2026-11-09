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

  /* ── Journey (per-browser only) ────────────────────────── */
  const KEY = "ag-living-atlas-journey-v1";
  let journey = { realms: [], cards: [], keepers: [], scrolls: [] };
  try { const j = JSON.parse(localStorage.getItem(KEY) || "null"); if (j) journey = Object.assign(journey, j); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(journey)); } catch (e) { /* ignore */ } };
  function discover(kind, id, label) {
    if (journey[kind].includes(id)) return;
    journey[kind].push(id); save(); renderRailJourney();
    toast(`✦ Discovered: ${label}`);
  }
  const totals = () => ({ realms: W.realms.length, cards: W.strains.length, keepers: W.keepers.length, scrolls: W.manuscripts.length });
  function progress() {
    const t = totals();
    const got = journey.realms.length + journey.cards.length + journey.keepers.length + journey.scrolls.length;
    const all = t.realms + t.cards + t.keepers + t.scrolls;
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
    const pins = W.realms.map((r) => `
      <button class="pin${journey.realms.includes(r.id) ? " is-visited" : ""}" style="left:${r.pin.x}%;top:${r.pin.y}%" data-realm="${r.id}" aria-label="Open ${esc(r.name)}">
        <span class="pin__label">${esc(r.name)}</span>
      </button>`).join("");
    const bar = W.realms.map((r) => `<button data-realm="${r.id}">${r.number ? `<b>${r.number}</b>` : "✦ "}${esc(r.name.replace(/ Realms?$/, ""))}</button>`).join("");
    stage.innerHTML = `
      <section class="atlas view">
        <div class="atlas__viewport" id="atlas-vp">
          <div class="atlas__map">
            <img src="assets/atlas-map.jpg" alt="The Living Atlas of Atlantean Gardens: seven realms around the Heart of Atlantis" draggable="false">
            ${pins}
          </div>
        </div>
        <h1 class="sr-only">The Living Atlas</h1>
        <div class="atlas__hint">Curiosity has always been the truest map of Atlantis. Touch a glowing light to enter.</div>
        <div class="atlas__bar" role="toolbar" aria-label="Realms">${bar}</div>
      </section>`;
    stage.querySelectorAll("[data-realm]").forEach((b) => b.addEventListener("click", () => { location.hash = `#/atlas/${b.dataset.realm}`; }));
    // On narrow screens the map is wider than the view: start centred on the Heart.
    const vp = $("#atlas-vp");
    requestAnimationFrame(() => { vp.scrollLeft = (vp.scrollWidth - vp.clientWidth) / 2; vp.scrollTop = (vp.scrollHeight - vp.clientHeight) / 2; });
    enableDragPan(vp);
  }

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
          ${keepers.length ? `<div class="section-label">Keepers who tend here</div><div class="cards">${keepers.map((k) => `<a class="ccard" href="#/keepers/${k.id}" aria-label="${esc(k.name)}"><span class="ccard__face"><img class="ccard__art" src="${esc(k.portrait)}" alt="" loading="lazy"><span class="ccard__caption"><span class="ccard__name">${esc(k.name)}</span><span class="ccard__title">${esc(k.pillar)}</span></span></span></a>`).join("")}</div>` : ""}
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
      ? `<button class="flip" id="flip" aria-label="Flip the ${esc(s.name)} card">
           <span class="flip__inner"><span class="flip__side"><img src="${esc(art.front)}" alt="${esc(s.name)} card front"></span>
           ${art.back ? `<span class="flip__side flip__back"><img src="${esc(art.back)}" alt="${esc(s.name)} card back"></span>` : ""}</span>
         </button>${art.back ? '<p class="flip__hint">Tap the card to turn it over</p>' : ""}`
      : `<div class="ccard ccard--type" style="aspect-ratio:2/3">${cardHTML(s).replace(/^<a[^>]*>|<\/a>$/g, "")}</div><p class="flip__hint">Its portrait is still being painted</p>`;
    const profile = [["Flavour", s.flavor], ["Aroma", s.aroma], ["Effects", s.effects], ["May relieve", s.mayRelieve]].filter(([, v]) => v);
    stage.innerHTML = `
      <section class="page view">
        <div class="crumbs">${r ? `<a href="#/atlas/${r.id}">${esc(r.name)}</a>${districtName(s) ? " › " + esc(districtName(s)) : ""}` : '<a href="#/cards">Strains</a> › Still finding its realm'} › ${esc(s.name)}</div>
        <div class="strain">
          <div class="strain__card">${cardSide}</div>
          <article class="parchment">
            <p class="eyebrow">${esc(s.code || "Awaiting a card number")}${s.category ? " · " + esc(s.category) : ""}</p>
            <h1>${esc(s.name)}</h1>
            ${s.title ? `<p class="sub">${esc(s.title)}</p>` : ""}
            <div class="chips">${s.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
            <div class="ptabs" role="tablist">
              <button role="tab" aria-selected="true" data-tab="story">Story</button>
              <button role="tab" aria-selected="false" data-tab="effects">Effects</button>
              <button role="tab" aria-selected="false" data-tab="terpenes">Terpenes</button>
              <button role="tab" aria-selected="false" data-tab="pairs">Pairs with</button>
              <button role="tab" aria-selected="false" data-tab="grow">Grow notes</button>
            </div>
            <div data-pane="story">
              ${s.body ? `<p>${esc(s.body)}</p>` : `<p class="empty">${art && art.back ? "This strain's tale is written on the back of its card. Tap the card to turn it over." : EMPTY}</p>`}
              ${s.quote ? `<blockquote>“${esc(s.quote)}”</blockquote>` : ""}
              <aside class="plant-ask">${passageHTML(PLANT_ASK)}</aside>
              <dl class="kv"><dt>Atlas realm</dt><dd>${r ? esc(r.name) : "Still finding its realm"}</dd>${districtName(s) ? `<dt>District</dt><dd>${esc(districtName(s))}</dd>` : ""}${s.printedRealm ? `<dt>On the card</dt><dd>${esc(s.printedRealm)}</dd>` : ""}${s.cardTitle ? `<dt>Card title</dt><dd>${esc(s.cardTitle)}</dd>` : ""}</dl>
            </div>
            <div data-pane="effects" hidden>${profile.length ? `<dl class="kv">${profile.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : `<div class="empty">${art && art.back ? "Turn the card over: its flavour and effects are written on its back." : EMPTY}</div>`}</div>
            <div data-pane="terpenes" hidden>${s.terpenes.length ? `<div class="chips">${s.terpenes.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : `<div class="empty">${EMPTY}</div>`}</div>
            <div data-pane="pairs" hidden>${kin ? `<div class="kin">${kin}</div>` : `<div class="empty">${EMPTY}</div>`}</div>
            <div data-pane="grow" hidden>${s.growNotes ? `<p>${esc(s.growNotes)}</p>` : `<div class="empty">${EMPTY}</div>`}</div>
          </article>
        </div>
      </section>`;
    wireTabs(stage.querySelector(".parchment"));
    const flip = $("#flip"); if (flip && art && art.back) flip.addEventListener("click", () => flip.classList.toggle("is-flipped"));
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
          <div class="stat"><b>${journey.scrolls.length}/${t.scrolls}</b><span>Manuscripts opened</span></div>
          <div class="stat"><b>${p.pct}%</b><span>of the charted Atlas</span></div>
        </div>
        <div class="section-label">Realms</div>
        <div class="realm-list">${W.realms.map((r) => `<button class="realm-tile${journey.realms.includes(r.id) ? " is-visited" : ""}" data-realm="${r.id}"><img src="${esc(r.image)}" alt="" loading="lazy"><span>${esc(r.name)}<em>${journey.realms.includes(r.id) ? esc(r.tagline) : "Still hidden in mist"}</em></span></button>`).join("")}</div>
        <aside class="nudge nudge--page">${passageHTML(BECOMING)}</aside>
        <p style="margin-top:2rem"><button class="btn" id="reset">Begin the journey again</button></p>
        ${demoStrip()}
      </section>`;
    stage.querySelectorAll("[data-realm]").forEach((b) => b.addEventListener("click", () => { location.hash = `#/atlas/${b.dataset.realm}`; }));
    $("#reset").addEventListener("click", () => { journey = { realms: [], cards: [], keepers: [], scrolls: [] }; save(); renderRailJourney(); viewJourney(stage); toast("The mist settles back over the Atlas."); });
  }

  const demoStrip = () => `<div class="demo-strip"><b>A work in progress.</b> Every name, story, verse and image here grows from Cassidy's Atlantean Archives; nothing has been invented. Where a page is still blank, the Garden is still growing. Your journey is kept only in this browser.</div>`;

  /* ── Router ────────────────────────────────────────────── */
  let lastBase = "";
  function route() {
    const [, base = "atlas", id] = (location.hash || "#/atlas").split("/");
    const stage = $("#stage");
    renderNav(base);
    if (base === "atlas") {
      if (lastBase !== "atlas" || !stage.querySelector(".atlas")) viewAtlas(stage);
      if (id) openRealm(id); else closeDrawer();
    } else {
      closeDrawer();
      if (base === "cards") id ? viewStrain(stage, id) : viewCards(stage);
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
    if (e.target.closest("[data-close]")) { location.hash = "#/atlas"; }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#drawer").classList.contains("is-open")) location.hash = "#/atlas";
  });
  window.addEventListener("hashchange", route);
  threshold();
})();
