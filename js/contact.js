(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const ICON = (name) => (window.SITE_ICONS && window.SITE_ICONS[name]) || "";
  const contact = CFG.contact || {};

  const infoWrap = document.getElementById("contact-info-rows");
  if (infoWrap) {
    infoWrap.innerHTML = `
      <div class="contact-info-row">${ICON("phone")}<div><strong>Phone</strong><a href="tel:${contact.phoneRaw}">${contact.phoneDisplay}</a></div></div>
      <div class="contact-info-row">${ICON("chat")}<div><strong>Email</strong><a href="mailto:${contact.email}">${contact.email}</a></div></div>
      <div class="contact-info-row">${ICON("pin")}<div><strong>Address</strong><span>${contact.address.full}</span></div></div>
      <div class="contact-info-row">${ICON("clock")}<div><strong>Business Hours</strong>
        ${(contact.hours || []).map((h) => `<span style="display:block;">${h.days}: ${h.time}</span>`).join("")}
      </div></div>
    `;
  }

  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("contact-form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[data-required]").forEach((field) => {
      const wrapper = field.closest(".field");
      const isEmail = field.type === "email";
      const filled = field.value.trim().length > 0;
      const emailValid = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      if (!filled || !emailValid) { wrapper.classList.add("has-error"); valid = false; }
      else wrapper.classList.remove("has-error");
    });

    status.classList.remove("success", "error", "is-visible");
    if (!valid) {
      status.textContent = "Please fill in all required fields with valid information.";
      status.classList.add("error", "is-visible");
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    // NOTE: This form is frontend-only. To receive submissions, connect it to
    // Netlify Forms, Formspree, EmailJS, FormSubmit, or a custom backend.
    // See README.md → "Forms" for exact steps for each option.
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
      status.textContent = "Thanks — your message has been received. We'll get back to you within one business day.";
      status.classList.add("success", "is-visible");
      form.reset();
    }, 900);
  });
})();
