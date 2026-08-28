/**
 * QUOTE.JS — multi-step quote estimator.
 * Entirely frontend. Reads pricing from window.SITE_CONFIG.pricing.
 * On submit, the form is structured so it can be wired to a form backend
 * (Netlify Forms, Formspree, EmailJS, FormSubmit, or a custom endpoint)
 * without changing the markup — see the README for instructions.
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG || {};
  const PRICING = CFG.pricing || {};

  const root = document.querySelector("[data-quote-app]");
  if (!root) return;

  const state = {
    step: 1,
    totalSteps: 6,
    propertyType: null,
    propertySize: null,
    cleaningType: null,
    frequency: null,
    contact: {},
  };

  const els = {
    steps: root.querySelectorAll(".quote__step"),
    progressBar: root.querySelector(".quote__progress-bar"),
    stepLabel: root.querySelector("[data-step-label]"),
    backBtn: root.querySelector("[data-quote-back]"),
    nextBtn: root.querySelector("[data-quote-next]"),
    propertyGrid: root.querySelector("[data-property-grid]"),
    sizeGrid: root.querySelector("[data-size-grid]"),
    cleaningGrid: root.querySelector("[data-cleaning-grid]"),
    frequencyGrid: root.querySelector("[data-frequency-grid]"),
    form: root.querySelector("[data-contact-form]"),
    resultRange: root.querySelector("[data-result-range]"),
    resultSummary: root.querySelector("[data-result-summary]"),
    whatsappBtn: root.querySelector("[data-quote-whatsapp]"),
  };

  const PROPERTY_TYPES = [
    { id: "house", label: "House", icon: "home" },
    { id: "apartment", label: "Flat", icon: "building" },
    { id: "office", label: "Office", icon: "building" },
    { id: "commercial", label: "Commercial Property", icon: "building" },
    { id: "airbnb", label: "Airbnb", icon: "key" },
  ];
  const CLEANING_TYPES = [
    { id: "standard", label: "Standard Cleaning", icon: "home" },
    { id: "deep", label: "Deep Cleaning", icon: "sparkle" },
    { id: "moveinout", label: "Move-In / Move-Out", icon: "box" },
    { id: "recurring", label: "Recurring Cleaning", icon: "calendar" },
    { id: "construction", label: "Post-Construction", icon: "broom" },
  ];
  const FREQUENCIES = [
    { id: "onetime", label: "One Time" },
    { id: "weekly", label: "Weekly" },
    { id: "biweekly", label: "Fortnightly" },
    { id: "monthly", label: "Monthly" },
  ];

  function icon(name) {
    return (window.SITE_ICONS && window.SITE_ICONS[name]) || "";
  }

  function buildOptionCard(container, { id, label, icon: iconName, sub }, groupKey) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-card";
    btn.dataset.value = id;
    btn.innerHTML = `
      <span class="option-card__icon">${icon(iconName || "home")}</span>
      <strong>${label}</strong>
      ${sub ? `<small>${sub}</small>` : ""}
    `;
    btn.addEventListener("click", () => {
      container.querySelectorAll(".option-card").forEach((c) => c.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      state[groupKey] = id;
      validateStep();
    });
    container.appendChild(btn);
  }

  function renderPropertyStep() {
    els.propertyGrid.innerHTML = "";
    PROPERTY_TYPES.forEach((p) => buildOptionCard(els.propertyGrid, p, "propertyType"));
  }

  function renderSizeStep() {
    els.sizeGrid.innerHTML = "";
    const type = state.propertyType || "house";
    const sizes = PRICING.propertySizes[type] || PRICING.propertySizes.house;
    sizes.forEach((s) => buildOptionCard(els.sizeGrid, { id: s.id, label: s.label, icon: "home" }, "propertySize"));
  }

  function renderCleaningStep() {
    els.cleaningGrid.innerHTML = "";
    CLEANING_TYPES.forEach((c) => buildOptionCard(els.cleaningGrid, c, "cleaningType"));
  }

  function renderFrequencyStep() {
    els.frequencyGrid.innerHTML = "";
    FREQUENCIES.forEach((f) => buildOptionCard(els.frequencyGrid, { id: f.id, label: f.label, icon: "calendar" }, "frequency"));
  }

  function goToStep(n, opts) {
    const scroll = opts && opts.scroll;
    state.step = n;
    els.steps.forEach((stepEl) => {
      stepEl.classList.toggle("is-active", parseInt(stepEl.dataset.step, 10) === n);
    });
    const pct = (n / state.totalSteps) * 100;
    els.progressBar.style.width = pct + "%";
    if (els.stepLabel) els.stepLabel.textContent = `Step ${n} of ${state.totalSteps}`;
    els.backBtn.style.visibility = n === 1 ? "hidden" : "visible";
    els.nextBtn.textContent = n === 5 ? "Get My Estimate" : n === 6 ? "Start Over" : "Continue";
    validateStep();
    if (scroll) root.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function validateStep() {
    let valid = true;
    if (state.step === 1) valid = !!state.propertyType;
    if (state.step === 2) valid = !!state.propertySize;
    if (state.step === 3) valid = !!state.cleaningType;
    if (state.step === 4) valid = !!state.frequency;
    els.nextBtn.disabled = !valid;
  }

  function validateContactForm() {
    let valid = true;
    const fields = els.form.querySelectorAll("[data-required]");
    fields.forEach((field) => {
      const wrapper = field.closest(".field");
      const isEmail = field.type === "email";
      const filled = field.value.trim().length > 0;
      const emailValid = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      if (!filled || !emailValid) {
        wrapper.classList.add("has-error");
        valid = false;
      } else {
        wrapper.classList.remove("has-error");
      }
    });
    return valid;
  }

  function calculateEstimate() {
    const sizes = PRICING.propertySizes[state.propertyType] || [];
    const sizeObj = sizes.find((s) => s.id === state.propertySize) || sizes[0] || { base: 100 };
    const adjustment = PRICING.cleaningTypeAdjustment[state.cleaningType] || 0;
    const multiplier = PRICING.frequencyMultiplier[state.frequency] || 1;
    const midpoint = (sizeObj.base + adjustment) * multiplier;
    const spread = midpoint * (PRICING.rangeSpreadPercent || 0.2);
    const low = Math.max(35, Math.round((midpoint - spread) / 5) * 5);
    const high = Math.round((midpoint + spread) / 5) * 5;
    return { low, high };
  }

  function labelFor(list, id) {
    const found = list.find((x) => x.id === id);
    return found ? found.label : id;
  }

  function showLoadingThenResult() {
    goToStep(6, { scroll: true });
    const loading = root.querySelector("[data-quote-loading]");
    const result = root.querySelector("[data-quote-result]");
    loading.style.display = "flex";
    result.style.display = "none";
    setTimeout(() => {
      loading.style.display = "none";
      result.style.display = "block";
      renderResult();
    }, 900);
  }

  function renderResult() {
    const { low, high } = calculateEstimate();
    const symbol = PRICING.currencySymbol || "$";
    els.resultRange.textContent = `${symbol}${low} – ${symbol}${high}`;

    const sizes = PRICING.propertySizes[state.propertyType] || [];
    const summary = {
      "Property type": labelFor(PROPERTY_TYPES, state.propertyType),
      "Size": labelFor(sizes, state.propertySize),
      "Cleaning type": labelFor(CLEANING_TYPES, state.cleaningType),
      "Frequency": labelFor(FREQUENCIES, state.frequency),
    };
    els.resultSummary.innerHTML =
      "<dl>" +
      Object.entries(summary).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("") +
      "</dl>";

    const contact = CFG.contact || {};
    const msg = `Hello, I'd like to request a quote.\nProperty: ${summary["Property type"]} (${summary["Size"]})\nService: ${summary["Cleaning type"]}, ${summary["Frequency"]}\nEstimated range: ${symbol}${low}-${symbol}${high}`;
    if (els.whatsappBtn) {
      els.whatsappBtn.href = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }
  }

  function resetApp() {
    state.propertyType = null;
    state.propertySize = null;
    state.cleaningType = null;
    state.frequency = null;
    els.form && els.form.reset();
    root.querySelectorAll(".option-card").forEach((c) => c.classList.remove("is-selected"));
    root.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
    renderPropertyStep();
    goToStep(1);
  }

  els.nextBtn.addEventListener("click", () => {
    if (state.step === 1 && !state.propertyType) return;
    if (state.step === 2) { renderCleaningStep(); goToStep(3, { scroll: true }); return; }
    if (state.step === 1) { renderSizeStep(); goToStep(2, { scroll: true }); return; }
    if (state.step === 3) { renderFrequencyStep(); goToStep(4, { scroll: true }); return; }
    if (state.step === 4) { goToStep(5, { scroll: true }); return; }
    if (state.step === 5) {
      if (!validateContactForm()) return;
      showLoadingThenResult();
      return;
    }
    if (state.step === 6) { resetApp(); return; }
  });

  els.backBtn.addEventListener("click", () => {
    if (state.step > 1) goToStep(state.step - 1, { scroll: true });
  });

  // Handle the "Request My Quote" submit action inside the result step.
  const requestBtn = root.querySelector("[data-quote-request]");
  if (requestBtn) {
    requestBtn.addEventListener("click", (e) => {
      e.preventDefault();
      requestBtn.disabled = true;
      const originalText = requestBtn.textContent;
      requestBtn.textContent = "Sending…";
      // NOTE: This template is frontend-only. Wire this up to Netlify Forms,
      // Formspree, EmailJS, FormSubmit, or a custom backend — see README.md.
      setTimeout(() => {
        requestBtn.textContent = "Request Sent ✓";
        setTimeout(() => {
          requestBtn.disabled = false;
          requestBtn.textContent = originalText;
        }, 3000);
      }, 800);
    });
  }

  // Allow external triggers (e.g. the interactive service selector) to
  // pre-select a property type and jump straight into the quote flow.
  document.querySelectorAll("[data-quote-jumpstart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.quoteJumpstart;
      if (type && PRICING.propertySizes[type]) {
        state.propertyType = type;
        renderPropertyStep();
        root.querySelectorAll('[data-property-grid] .option-card').forEach((c) => {
          c.classList.toggle("is-selected", c.dataset.value === type);
        });
        renderSizeStep();
        goToStep(2, { scroll: true });
      }
    });
  });

  // Init
  renderPropertyStep();
  goToStep(1);
})();
