/**
 * PORTFOLIO.JS — renders the portfolio grid, filter bar, before/after
 * sliders, and lightbox from SITE_CONFIG.portfolio.
 */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const ICON = (name) => (window.SITE_ICONS && window.SITE_ICONS[name]) || "";
  const items = CFG.portfolio || [];

  const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "deep", label: "Deep Cleaning" },
    { id: "moveinout", label: "Move-In / Move-Out" },
    { id: "construction", label: "Post-Construction" },
  ];

  const filterBar = document.getElementById("filter-bar");
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  filterBar.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
  ).join("");

  grid.innerHTML = items.map((item, i) => `
    <div class="portfolio-item reveal" data-category="${item.category}" data-index="${i}">
      <div class="portfolio-card">
        <div class="portfolio-card__slider">
          ${baSlider(item)}
        </div>
        <div class="portfolio-card__body">
          <span class="portfolio-card__cat">${item.categoryLabel}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="portfolio-card__meta">${ICON("pin")}${item.location}</div>
        </div>
      </div>
    </div>
  `).join("");

  function baSlider(item) {
    return `
      <div class="ba-slider" data-ba-slider tabindex="0" aria-label="Before and after: ${item.title}">
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
        <div class="ba-slider__handle"><div class="ba-slider__grip">${ICON("grip")}</div></div>
      </div>`;
  }

  /* ---------------- Filtering ---------------- */
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    const cat = btn.dataset.filter;
    grid.querySelectorAll(".portfolio-item").forEach((el) => {
      const match = cat === "all" || el.dataset.category === cat;
      el.classList.toggle("is-filtered-out", !match);
    });
  });

  /* ---------------- Lightbox ---------------- */
  const lightbox = document.getElementById("portfolio-lightbox");
  if (!lightbox) return;
  const lbBody = lightbox.querySelector("[data-lightbox-body]");
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
    lightbox.querySelector(".lightbox__close").focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }
  function renderLightbox() {
    const item = items[currentIndex];
    lbBody.innerHTML = `
      ${baSlider(item)}
      <span class="tag">${item.categoryLabel}</span>
      <h3>${item.title}</h3>
      <p class="desc">${item.description} Located in ${item.location}.</p>
    `;
    window.initBeforeAfterSlider(lbBody.querySelector("[data-ba-slider]"));
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".portfolio-item");
    if (!card || e.target.closest(".ba-slider__handle")) return;
    // avoid opening lightbox mid-drag on the slider itself
    if (e.target.closest(".ba-slider")) {
      openLightbox(parseInt(card.dataset.index, 10));
    }
  });

  lightbox.querySelector(".lightbox__backdrop").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderLightbox();
  });
  lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    renderLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % items.length; renderLightbox(); }
    if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + items.length) % items.length; renderLightbox(); }
  });
})();
