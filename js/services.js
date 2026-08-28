(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const ICON = (name) => (window.SITE_ICONS && window.SITE_ICONS[name]) || "";

  const wrap = document.getElementById("service-detail-list");
  if (!wrap) return;

  wrap.innerHTML = (CFG.services || []).map((s, i) => `
    <div class="service-detail" id="${s.id}">
      <div class="split${i % 2 === 1 ? " split--reverse" : ""}">
        <div class="split__media reveal-scale">
          <img src="${s.image}" alt="${s.title} — ${s.short}" loading="lazy" width="800" height="600">
        </div>
        <div class="reveal">
          <span class="service-detail__tag">Service</span>
          <h2 style="margin-top:0.5rem;">${s.title}</h2>
          <p class="lead" style="margin-top:0.6rem;">${s.detail}</p>
          <ul class="split__list">
            ${s.includes.map((inc) => `<li>${ICON("check")}${inc}</li>`).join("")}
          </ul>
          <p class="text-soft" style="margin-top:1rem;"><strong>Ideal for:</strong> ${s.idealFor}</p>
          <div style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="index.html#quote" class="btn btn-primary">Get My Free Quote</a>
            <a href="contact.html" class="btn btn-outline">Ask a Question</a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
})();
