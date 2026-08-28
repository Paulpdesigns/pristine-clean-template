/**
 * MAIN.JS — shared site behavior.
 * Loaded on every page after config.js. Reads window.SITE_CONFIG for all
 * business-specific content so nothing here should need per-client edits.
 */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG || {};
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     ICONS — small inline SVG library so no icon-font dependency is needed.
     ----------------------------------------------------------------------- */
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 8 9-5 9 5-9 5-9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="10" height="18"/><path d="M15 8h4v13h-4M8 7h.01M8 11h.01M8 15h.01M12 7h.01M12 11h.01M12 15h.01"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="14" r="4"/><path d="m11 11 8-8M17 5l2 2M15 7l2 2"/></svg>',
    broom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 4 9.5 13.5"/><path d="M4 20c1-3 2-5 5.5-8.5S17 8 20 4"/><path d="M4 20l3-3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M8 13.5 6 21l6-3 6 3-2-7.5"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 20c8 0 14-6 14-14 0 0-13-1-14 9-.4 3 0 5 0 5Z"/><path d="M5 20c0-5 2-9 6-11.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4 6v6c0 5 3.5 7.8 8 9 4.5-1.2 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5 15 9l7 .7-5.3 4.6L18.2 21 12 17.3 5.8 21l1.5-6.7L2 9.7 9 9l3-6.5Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 12 6 6L20 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3Z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.9 8.9 0 0 1-3.4-.7L3 21l1.9-5.2A8.3 8.3 0 0 1 3.5 11a8.4 8.4 0 0 1 8.9-8.5 8.6 8.6 0 0 1 8.6 9Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    grip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6 3 12l5 6M16 6l5 6-5 6"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 20V9l14-9v11"/></svg>',
  };
  window.SITE_ICONS = ICONS;

  document.addEventListener("DOMContentLoaded", () => {
    initAnnouncement();
    initNavbar();
    initMobileMenu();
    initScrollProgress();
    initBackToTop();
    initFloatingWidgets();
    initMobileBar();
    initRevealAnimations();
    initCounters();
    initFAQ();
    initTestimonials();
    document.querySelectorAll("[data-ba-slider]").forEach(initBeforeAfterSlider);
    initChatbot();
    initYear();
  });

  /* ----------------------------- Announcement bar ----------------------- */
  function initAnnouncement() {
    const bar = document.querySelector(".announce");
    if (!bar) return;
    const closeBtn = bar.querySelector(".announce__close");
    const dismissed = sessionStorage.getItem("announce_dismissed");
    if (dismissed) { bar.classList.add("is-hidden"); document.documentElement.style.setProperty("--announce-h", "0px"); }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        bar.classList.add("is-hidden");
        sessionStorage.setItem("announce_dismissed", "1");
      });
    }
  }

  /* ----------------------------- Navbar ---------------------------------- */
  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const isTransparentCapable = navbar.dataset.transparent === "true";

    function update() {
      const scrolled = window.scrollY > 40;
      if (isTransparentCapable) {
        navbar.classList.toggle("is-transparent", !scrolled);
        navbar.classList.toggle("is-solid", scrolled);
      } else {
        navbar.classList.add("is-solid");
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ----------------------------- Mobile menu ----------------------------- */
  function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;
    const closeBtn = menu.querySelector(".mobile-menu__close");
    const backdrop = menu.querySelector(".mobile-menu__backdrop");
    const links = menu.querySelectorAll("a");

    function open() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      closeBtn && closeBtn.focus();
    }
    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      toggle.focus();
    }
    toggle.addEventListener("click", () => {
      menu.classList.contains("is-open") ? close() : open();
    });
    closeBtn && closeBtn.addEventListener("click", close);
    backdrop && backdrop.addEventListener("click", close);
    links.forEach((l) => l.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) close();
    });
  }

  /* ----------------------------- Scroll progress -------------------------- */
  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    function update() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ----------------------------- Back to top ------------------------------ */
  function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    function update() {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ----------------------------- Floating widgets -------------------------- */
  function initFloatingWidgets() {
    const waLinks = document.querySelectorAll("[data-whatsapp-link]");
    const callLinks = document.querySelectorAll("[data-call-link]");
    const contact = CFG.contact || {};
    const waHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappDefaultMessage || "")}`;
    waLinks.forEach((el) => el.setAttribute("href", waHref));
    callLinks.forEach((el) => el.setAttribute("href", `tel:${contact.phoneRaw || ""}`));

    document.querySelectorAll("[data-phone-display]").forEach((el) => {
      el.textContent = contact.phoneDisplay || "";
    });
  }

  /* ----------------------------- Mobile bottom bar -------------------------- */
  function initMobileBar() {
    const bar = document.querySelector(".mobile-bar");
    if (!bar) return;
    const hero = document.querySelector(".hero, .page-hero");
    function update() {
      const threshold = hero ? hero.offsetHeight * 0.6 : 300;
      bar.classList.toggle("is-visible", window.scrollY > threshold);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ----------------------------- Scroll reveal ------------------------------ */
  function initRevealAnimations() {
    const targets = document.querySelectorAll(".reveal, .reveal-scale, .reveal-stagger");
    if (!targets.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
  }

  /* ----------------------------- Animated counters -------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    function animate(el) {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      if (prefersReducedMotion) { el.textContent = target + suffix; return; }
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }

  /* ----------------------------- FAQ accordion ------------------------------ */
  function initFAQ() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const btn = item.querySelector(".faq-item__q");
      const panel = item.querySelector(".faq-item__a");
      if (!btn || !panel) return;
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        items.forEach((other) => {
          other.classList.remove("is-open");
          other.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ----------------------------- Testimonials carousel ----------------------- */
  function initTestimonials() {
    const root = document.querySelector("[data-testimonial-carousel]");
    if (!root) return;
    const track = root.querySelector(".testi-track__inner");
    const slides = Array.from(root.querySelectorAll(".testi-slide"));
    const prevBtn = root.querySelector(".testi-arrow--prev");
    const nextBtn = root.querySelector(".testi-arrow--next");
    const dotsWrap = root.querySelector(".testi-dots");
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "testi-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    nextBtn && nextBtn.addEventListener("click", () => { next(); restart(); });
    prevBtn && prevBtn.addEventListener("click", () => { prev(); restart(); });

    function start() {
      if (prefersReducedMotion) return;
      timer = setInterval(next, 6000);
    }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    // Touch swipe
    let touchStartX = null;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (delta < -40) next();
      else if (delta > 40) prev();
      touchStartX = null;
      start();
    });

    render();
    start();
  }

  /* ----------------------------- Before/After slider -------------------------- */
  function initBeforeAfterSlider(root) {
    const afterWrap = root.querySelector(".ba-slider__after");
    const handle = root.querySelector(".ba-slider__handle");
    if (!afterWrap || !handle) return;
    let dragging = false;

    function setPosition(percent) {
      const clamped = Math.min(98, Math.max(2, percent));
      afterWrap.style.clipPath = `inset(0 0 0 ${clamped}%)`;
      handle.style.left = `${clamped}%`;
    }

    function positionFromClientX(clientX) {
      const rect = root.getBoundingClientRect();
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(percent);
    }

    function onPointerDown(e) {
      dragging = true;
      root.classList.add("is-dragging");
      positionFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      positionFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
      e.preventDefault();
    }
    function onPointerUp() {
      dragging = false;
      root.classList.remove("is-dragging");
    }

    handle.addEventListener("mousedown", onPointerDown);
    root.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    handle.addEventListener("touchstart", onPointerDown, { passive: true });
    root.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    // Keyboard support
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", "Drag to compare before and after");
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(handle.style.left) || 50;
      if (e.key === "ArrowLeft") { setPosition(current - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { setPosition(current + 5); e.preventDefault(); }
    });

    setPosition(50);
  }
  window.initBeforeAfterSlider = initBeforeAfterSlider;

  /* ----------------------------- Chatbot (scripted, no external API) --------- */
  function initChatbot() {
    const cfg = CFG.chatbot || {};
    const launcher = document.querySelector("[data-chat-launcher]");
    const panel = document.querySelector("[data-chat-panel]");
    if (!launcher || !panel || cfg.enabled === false) {
      if (launcher) launcher.style.display = "none";
      return;
    }
    const body = panel.querySelector(".chat-panel__body");
    const closeBtn = panel.querySelector(".chat-panel__close");
    let greeted = false;

    function addBot(html) {
      const div = document.createElement("div");
      div.className = "chat-bubble chat-bubble--bot";
      div.innerHTML = html;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function addUser(text) {
      const div = document.createElement("div");
      div.className = "chat-bubble chat-bubble--user";
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function addOptions(options) {
      const wrap = document.createElement("div");
      wrap.className = "chat-options";
      options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "chat-option-btn";
        btn.type = "button";
        btn.textContent = opt.label;
        btn.addEventListener("click", () => {
          addUser(opt.label);
          wrap.remove();
          opt.action();
        });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    function mainMenu() {
      addOptions([
        { label: "Get a Quote", action: () => {
          addBot("Absolutely! You can get an estimated quote in less than a minute.");
          const btnWrap = document.createElement("div");
          btnWrap.className = "chat-options";
          const startBtn = document.createElement("button");
          startBtn.className = "btn btn-primary btn-sm";
          startBtn.textContent = "Start Quote";
          startBtn.addEventListener("click", () => {
            closePanel();
            const quoteSection = document.getElementById("quote");
            if (quoteSection) quoteSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
            else window.location.href = "index.html#quote";
          });
          btnWrap.appendChild(startBtn);
          body.appendChild(btnWrap);
          body.scrollTop = body.scrollHeight;
        }},
        { label: "View Services", action: () => {
          addBot("We offer residential, deep cleaning, move-in/out, commercial, Airbnb turnovers, and post-construction cleaning. Want to see the full list?");
          addOptions([{ label: "See Services Page", action: () => { window.location.href = "services.html"; } }]);
        }},
        { label: "Pricing", action: () => {
          addBot("Pricing depends on property size and cleaning type. Our instant quote checker gives you a fast estimate, final pricing is confirmed after a quick look at your space.");
          mainMenu();
        }},
        { label: "Service Areas", action: () => {
          const areas = (CFG.serviceAreas || []).slice(0, 5).join(", ");
          addBot(`We proudly serve ${CFG.serviceAreaCity || "our local area"} and nearby areas including ${areas}.`);
          mainMenu();
        }},
        { label: "Speak With Us", action: () => {
          addBot(`You can reach us directly at <a href="tel:${(CFG.contact||{}).phoneRaw}">${(CFG.contact||{}).phoneDisplay}</a> or via WhatsApp any time.`);
        }},
      ]);
    }

    function openPanel() {
      panel.classList.add("is-open");
      launcher.setAttribute("aria-expanded", "true");
      if (!greeted) {
        greeted = true;
        addBot(cfg.greeting || "Hi! How can we help?");
        mainMenu();
      }
    }
    function closePanel() {
      panel.classList.remove("is-open");
      launcher.setAttribute("aria-expanded", "false");
    }

    launcher.addEventListener("click", () => {
      panel.classList.contains("is-open") ? closePanel() : openPanel();
    });
    closeBtn && closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
    });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }
})();
