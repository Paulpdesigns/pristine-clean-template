/**
 * HOME.JS — renders homepage sections from SITE_CONFIG.
 * Runs synchronously (placed after main.js, before DOMContentLoaded fires)
 * so that by the time main.js's init routines run, this content already
 * exists in the DOM.
 */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const ICON = (name) => (window.SITE_ICONS && window.SITE_ICONS[name]) || "";

  /* ---------------- Services grid ---------------- */
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid) {
    servicesGrid.innerHTML = (CFG.services || []).map((s) => `
      <article class="service-card reveal">
        <div class="service-card__media">
          <img src="${s.image}" alt="${s.title} — ${s.short}" loading="lazy" width="600" height="450">
        </div>
        <div class="service-card__body">
          <span class="service-card__icon">${ICON(s.icon)}</span>
          <h3>${s.title}</h3>
          <p>${s.short}</p>
          <a class="service-card__link" href="services.html#${s.id}">Learn more ${ICON("arrow")}</a>
        </div>
      </article>
    `).join("");
  }

  /* ---------------- Interactive service selector ---------------- */
  const selectorGrid = document.getElementById("service-selector");
  const selectorResult = document.getElementById("selector-result");
  const SELECTOR_OPTIONS = [
    { id: "house", label: "Home", icon: "home", copy: "Perfect — we'll tailor a residential cleaning plan for your house." },
    { id: "apartment", label: "Apartment", icon: "building", copy: "Great — apartment cleans are quick to schedule and easy to make recurring." },
    { id: "office", label: "Office", icon: "building", copy: "We'll set up a scheduled commercial visit that fits around your work hours." },
    { id: "commercial", label: "Commercial Property", icon: "building", copy: "We'll scope a commercial cleaning plan suited to your property size." },
    { id: "airbnb", label: "Airbnb", icon: "key", copy: "We'll build a fast turnover checklist between your guest stays." },
    { id: "moveinout", label: "Move-In / Move-Out", icon: "box", copy: "We'll plan a full empty-property clean before or after your move." },
  ];
  if (selectorGrid) {
    selectorGrid.innerHTML = SELECTOR_OPTIONS.map((o) => `
      <button type="button" class="selector__btn" data-selector-option="${o.id}">
        ${ICON(o.icon)}<span>${o.label}</span>
      </button>
    `).join("");
    selectorGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-selector-option]");
      if (!btn) return;
      selectorGrid.querySelectorAll(".selector__btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const opt = SELECTOR_OPTIONS.find((o) => o.id === btn.dataset.selectorOption);
      if (selectorResult && opt) {
        selectorResult.classList.add("is-visible");
        selectorResult.querySelector("[data-selector-copy]").innerHTML = `<strong>${opt.label}</strong><br>${opt.copy}`;
        const jumpBtn = selectorResult.querySelector("[data-quote-jumpstart]");
        if (jumpBtn) jumpBtn.dataset.quoteJumpstart =
          ["house", "apartment", "office", "commercial", "airbnb"].includes(opt.id) ? opt.id : "house";
      }
    });
  }

  /* ---------------- Why choose us ---------------- */
  const whyGrid = document.getElementById("why-grid");
  if (whyGrid) {
    whyGrid.innerHTML = (CFG.whyChooseUs || []).map((f) => `
      <div class="feature reveal">
        <span class="feature__icon">${ICON(f.icon)}</span>
        <div>
          <h4>${f.title}</h4>
          <p>${f.text}</p>
        </div>
      </div>
    `).join("");
  }

  /* ---------------- Before/After preview (featured) ---------------- */
  const baPreview = document.getElementById("ba-preview");
  if (baPreview && CFG.portfolio && CFG.portfolio[0]) {
    const item = CFG.portfolio[0];
    baPreview.innerHTML = renderBaSlider(item);
  }

  /* ---------------- Stats ---------------- */
  const statsGrid = document.getElementById("stats-grid");
  if (statsGrid) {
    statsGrid.innerHTML = (CFG.stats || []).map((s) => `
      <div class="stat reveal">
        <div class="stat__value" data-counter="${s.value}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</div>
        <div class="stat__label">${s.label}</div>
      </div>
    `).join("");
  }

  /* ---------------- How it works ---------------- */
  const processGrid = document.getElementById("process-grid");
  if (processGrid) {
    processGrid.innerHTML = (CFG.process || []).map((p, i) => `
      <div class="process__step reveal">
        <div class="process__num">0${i + 1}</div>
        <h4>${p.title}</h4>
        <p>${p.text}</p>
      </div>
    `).join("");
  }

  /* ---------------- Testimonials ---------------- */
  const testiTrack = document.getElementById("testi-track");
  if (testiTrack) {
    testiTrack.innerHTML = (CFG.testimonials || []).map((t) => `
      <div class="testi-slide">
        <div class="testi-card">
          <div class="testi-card__stars">${Array.from({ length: 5 }).map((_, i) =>
            `<span style="opacity:${i < t.rating ? 1 : 0.25}">${ICON("star")}</span>`).join("")}</div>
          <p class="quote-text">&ldquo;${t.text}&rdquo;</p>
          <p class="testi-card__author"><strong>${t.name}</strong> — ${t.location}</p>
        </div>
      </div>
    `).join("");
  }

  /* ---------------- Service area ---------------- */
  const areaList = document.getElementById("area-list");
  if (areaList) {
    areaList.innerHTML = (CFG.serviceAreas || []).map((a) => `<li>${ICON("pin")}${a}</li>`).join("");
  }
  document.querySelectorAll("[data-service-city]").forEach((el) => { el.textContent = CFG.serviceAreaCity || ""; });

  /* ---------------- FAQ ---------------- */
  const faqList = document.getElementById("faq-list");
  if (faqList) {
    faqList.innerHTML = (CFG.faqs || []).map((f, i) => `
      <div class="faq-item">
        <button class="faq-item__q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
          ${f.q}<span class="faq-item__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-item__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
          <p>${f.a}</p>
        </div>
      </div>
    `).join("");
  }

  function renderBaSlider(item) {
    return `
      <div class="ba-slider" data-ba-slider aria-label="Before and after: ${item.title}">
        <figure class="ba-slider__figure ba-slider__figure--before">
          <img src="${item.before}" alt="${item.title} before cleaning" loading="lazy" width="800" height="600">
        </figure>
        <div class="ba-slider__after">
          <figure class="ba-slider__figure">
            <img src="${item.after}" alt="${item.title} after cleaning" loading="lazy" width="800" height="600">
          </figure>
        </div>
        <span class="ba-slider__label ba-slider__label--before">BEFORE</span>
        <span class="ba-slider__label ba-slider__label--after">AFTER</span>
        <div class="ba-slider__handle">
          <div class="ba-slider__grip">${ICON("grip")}</div>
        </div>
      </div>
    `;
  }
  window.renderBaSlider = renderBaSlider;
})();
