(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const ICON = (name) => (window.SITE_ICONS && window.SITE_ICONS[name]) || "";

  const teamGrid = document.getElementById("team-grid");
  if (teamGrid) {
    teamGrid.innerHTML = (CFG.team || []).map((m) => `
      <div class="team-card reveal">
        <div class="team-card__media">
          <img src="${m.image}" alt="${m.name}, ${m.role}" loading="lazy" width="400" height="400">
        </div>
        <h4>${m.name}</h4>
        <p>${m.role}</p>
      </div>
    `).join("");
  }

  const whyGrid = document.getElementById("why-grid-about");
  if (whyGrid) {
    whyGrid.innerHTML = (CFG.whyChooseUs || []).slice(0, 6).map((f) => `
      <div class="feature reveal">
        <span class="feature__icon">${ICON(f.icon)}</span>
        <div><h4>${f.title}</h4><p>${f.text}</p></div>
      </div>
    `).join("");
  }

  const statsGrid = document.getElementById("stats-grid-about");
  if (statsGrid) {
    statsGrid.innerHTML = (CFG.stats || []).map((s) => `
      <div class="stat reveal">
        <div class="stat__value" data-counter="${s.value}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</div>
        <div class="stat__label">${s.label}</div>
      </div>
    `).join("");
  }
})();
