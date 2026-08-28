# Pristine & Co. — Premium Cleaning Business Website Template (UK Edition)

> **This is the UK-localised variant of the template.** Business details,
> currency, phone/address format, service areas, and terminology are all
> set up for a UK cleaning business based in Manchester. If you need the
> original US version, use the `pristine-clean-template` package instead
> — both share identical code and features, just different content in
> `js/config.js` and a few hardcoded contact details in the HTML.

A production-quality, fully static website template for a residential and
commercial cleaning business. Built with semantic HTML5, CSS3 (custom
properties, no framework), and vanilla JavaScript — no build step, no
backend, ready to deploy to GitHub Pages or Netlify as-is.

---

## 1. Template Overview

This template includes:

- **Homepage** (`index.html`) — hero, trust strip, services, interactive
  service selector, a multi-step smart quote estimator, why-choose-us,
  before/after preview, stats, how-it-works, testimonials carousel,
  service area, CTA band, FAQ accordion.
- **Portfolio page** (`portfolio.html`) — filterable before/after case
  studies with a draggable comparison slider and a lightbox.
- **Services page** (`services.html`) — expanded detail for every service.
- **About page** (`about.html`) — story, values, team, stats.
- **Contact page** (`contact.html`) — contact details + validated form.
- **Privacy Policy / Terms** (`privacy.html`, `terms.html`) — placeholder
  legal pages linked from the footer.

Every page shares the same sticky/transparent navigation, announcement
bar, floating WhatsApp/Call/Chat widgets, mobile bottom contact bar, back
to top button, scroll progress bar, and footer.

## 2. Technologies

- HTML5 (semantic elements, JSON-LD local business schema)
- CSS3 (custom properties / design tokens, no preprocessor, no framework)
- Vanilla JavaScript (ES6+, no dependencies, no build tooling)
- Google Fonts: **Fraunces** (display) + **Inter** (body), loaded via
  `<link>` tags — swap or self-host these if you prefer.

No npm install, no bundler, no backend. Open `index.html` in a browser or
serve the folder with any static file server.

## 3. Installation (local preview)

```bash
# from inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or simply double-click `index.html` (some browser security settings may
restrict `fetch`-based features when opened via `file://`, so a local
server is recommended).

## 4. Project Structure

```
/index.html
/portfolio.html
/about.html
/services.html
/contact.html
/privacy.html
/terms.html
/css/style.css
/js/config.js       ← all business content lives here
/js/main.js          ← shared behavior (nav, widgets, sliders, chatbot…)
/js/home.js          ← renders homepage sections from config.js
/js/portfolio.js     ← renders portfolio grid, filters, lightbox
/js/about.js         ← renders team / stats on the About page
/js/services.js      ← renders expanded service detail blocks
/js/contact.js        ← contact form validation + info rendering
/js/quote.js          ← multi-step quote estimator logic
/assets/icons/favicon.svg
/assets/images/       ← empty by default, see "Images" below
/assets/logos/        ← empty by default, drop your logo files here
README.md
```

## 5. Customization

**Everything business-specific lives in `js/config.js`.** Open that file
first — it's organized into clearly labeled sections:

| What to change | Where in `config.js` |
|---|---|
| Business name, tagline | `business` |
| Phone, WhatsApp, email, address, hours | `contact` |
| Social links | `social` |
| Announcement bar text | `announcement` |
| Service areas | `serviceAreas`, `serviceAreaCity` |
| Homepage stat counters | `stats` |
| Services (title, description, image, includes) | `services` |
| Why Choose Us bullets | `whyChooseUs` |
| How It Works steps | `process` |
| Testimonials | `testimonials` |
| Portfolio / before-after projects | `portfolio` |
| Quote calculator pricing | `pricing` |
| FAQ questions/answers | `faqs` |
| Team members (About page) | `team` |
| Chatbot greeting / on-off switch | `chatbot` |

A few things are **not** pulled from `config.js` and need a manual
find-and-replace across the HTML files (this keeps the template simple):
the `<title>`/meta description tags in each page's `<head>`, the JSON-LD
block, and the phone number hardcoded into a couple of `tel:` / mobile
menu links (search for `+441617824900` — everything else pulls the number
from config automatically via `data-call-link`).

**Colors, fonts, spacing:** every visual token is a CSS custom property
at the top of `css/style.css` under `:root`. The palette is a
professional navy / blue / teal scheme with no gold — `--color-sage` is
the primary brand blue, `--color-brass` is the teal accent used for CTA
buttons (the variable names are historical and don't reflect the actual
colors — feel free to rename them if you prefer). Change these values to
re-theme the entire site instantly; every combination in the default
palette has been checked against WCAG AA contrast requirements. Fonts
are set via `--font-display` and `--font-body`.

**Header logo:** the site header shows only the circular logo mark (no
business name text) per a minimal-header design. The full business name
still appears in the footer. To use a real logo image instead of the
text-based mark, replace the `.brand__mark` `<span>` in each page's
header with an `<img>` tag pointing to a file in `assets/logos/`, and
adjust the `.brand__mark` sizing in `style.css` if needed.

## 6. Quote Calculator

The quote estimator (`js/quote.js`) reads all pricing from
`SITE_CONFIG.pricing` in `config.js`:

- `propertySizes` — base price per property type + size tier.
- `cleaningTypeAdjustment` — flat dollar adjustment per cleaning type.
- `frequencyMultiplier` — multiplier applied for recurring plans.
- `rangeSpreadPercent` — controls how wide the low–high estimate range is.

No prices are hardcoded in the HTML. Edit the numbers in `config.js` and
the whole flow (including the WhatsApp handoff message) updates
automatically.

## 7. WhatsApp

Set `contact.whatsappNumber` (digits only, with country code, no `+` or
spaces) and `contact.whatsappDefaultMessage` in `config.js`. Every
`data-whatsapp-link` element across the site (floating button, mobile
bar, contact page, quote result) is wired to this automatically by
`js/main.js`.

## 8. Call Button

Set `contact.phoneRaw` (E.164 format, e.g. `+441617824900`) and
`contact.phoneDisplay` (human-readable) in `config.js`. Every
`data-call-link` element updates automatically. Note: a handful of
`tel:+441617824900` hrefs are also written directly in the HTML as a
fallback before JavaScript runs — update those too if you change the
number (a quick project-wide find-and-replace handles this in seconds).

## 9. Portfolio

Add or edit entries in `SITE_CONFIG.portfolio` in `config.js`. Each entry
needs: `id`, `title`, `category` (must match one of the filter categories
in `js/portfolio.js`: `residential`, `commercial`, `deep`, `moveinout`,
`construction`), `categoryLabel`, `location`, `description`, `before`
(image URL), and `after` (image URL). The grid, filters, sliders, and
lightbox all render automatically from this array — no HTML editing
required.

## 10. Images

Most images are now self-hosted, optimized JPGs in `assets/images/`
(compressed to roughly 70–190KB each). Four source photos are reused
across the hero sections, service cards, and portfolio examples:

- `hero-office-team.jpg` — homepage hero, Contact hero, Commercial
  Cleaning service, Office Cleaning portfolio piece
- `team-smiling-cleaner.jpg` — About hero, Residential Cleaning /
  Airbnb service cards, Kitchen and Move-Out portfolio pieces
- `cleaner-with-supplies.jpg` — Portfolio hero, Deep Cleaning service,
  Bathroom and Post-Construction portfolio pieces
- `cleaning-supplies-flatlay.jpg` — Services hero, Move-In/Out and
  Post-Construction service cards, Living Room portfolio piece

Because there are only 4 source photos covering 6 services and 6
portfolio projects, the same image is used in more than one place. The
before/after sliders reuse a single photo per project and apply a CSS
filter (see `.ba-slider__figure--before` in `style.css`) to visually
distinguish the "before" state rather than using true before/after
photography.

A handful of images remain hotlinked from Unsplash's free library
(https://unsplash.com/license): the About page's "our story" photo and
the three team headshots.

**For production use, replace these with your own photography:**

1. Take (or license) real before/after photos of completed jobs, real
   team headshots, and a real storefront/team photo for the hero
   sections — this matters most for the portfolio, since prospective
   clients expect to see actual results, not stock photography.
2. Save optimized files (WebP or compressed JPG, ideally under 200KB
   each) into `assets/images/`.
3. Update the `src` attributes in each HTML file and the image paths in
   `config.js` to point to your new files, and remove the
   `ba-slider__figure--before` filter once you have real before/after
   pairs (each photo should stand on its own without the dimming
   effect).

Images below the fold already use `loading="lazy"` and explicit
`width`/`height` attributes to avoid layout shift.

## 11. Forms

Both the quote estimator's final step and the contact page form are
**frontend-only** — they validate input and show a success state, but do
not send data anywhere by default. Connect either one to a form backend
of your choice:

**Netlify Forms** — add `data-netlify="true"` and a `name` attribute to
the `<form>` tag, add a hidden `<input type="hidden" name="form-name"
value="...">` matching it, and deploy to Netlify. No JavaScript changes
needed; remove the `preventDefault()` call in `js/contact.js` /
`js/quote.js` so the browser performs a normal form POST.

**Formspree** — set the form's `action` to your Formspree endpoint
(`https://formspree.io/f/your-id`) and `method="POST"`, then remove the
`preventDefault()` call so the native submit fires.

**EmailJS** — keep `preventDefault()`, and inside the submit handler in
`js/contact.js` / `js/quote.js` call `emailjs.send(...)` with your
service ID, template ID, and the form fields before showing the success
state.

**FormSubmit** — set the form's `action` to
`https://formsubmit.co/your@email.com` and `method="POST"`, remove
`preventDefault()`.

**Custom backend** — inside the submit handler, replace the
`setTimeout(...)` placeholder with a `fetch()` call to your API, and move
to the success/error state based on the response.

## 12. Deployment

**GitHub Pages**

1. Push this folder to a GitHub repository.
2. Repo → Settings → Pages → Deploy from branch → select `main` and the
   root folder.
3. Your site will be live at `https://yourusername.github.io/your-repo/`.

**Netlify**

1. Drag and drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop),
   or connect the GitHub repo for continuous deployment.
2. No build command is required — this is a static site (leave the
   build command blank and set the publish directory to the project
   root).

## 13. Accessibility & Performance Notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`) and a skip link.
- Visible focus states everywhere (`:focus-visible`).
- Keyboard support for the mobile menu, FAQ accordion, before/after
  slider (arrow keys), and lightbox (Escape + arrow keys).
- `prefers-reduced-motion` disables non-essential animation and scroll
  effects site-wide.
- No layout-shifting images (explicit width/height, lazy loading below
  the fold).
- No external JS dependencies/libraries — just the two Google Fonts.

## 14. Before Going Live — Checklist

- [ ] Replace all placeholder business info in `config.js`
- [ ] Replace Unsplash images with your own team/project photography
- [ ] Replace testimonials with real client reviews
- [ ] Update statistics to reflect real, verifiable numbers
- [ ] Connect the quote form and contact form to a real backend/service
- [ ] Update the JSON-LD block and `<title>`/meta description in every
      page's `<head>`
- [ ] Replace `privacy.html` / `terms.html` placeholder copy with real
      policies (ideally reviewed by a legal professional)
- [ ] Point `<link rel="canonical">` tags at your real domain
- [ ] Swap the SVG favicon for your own brand mark if desired

---

Built as a reusable template — swap the content in `config.js`, drop in
real photography, connect a form service, and it's ready to represent a
real cleaning business.
