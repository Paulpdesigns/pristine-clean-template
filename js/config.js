/**
 * SITE CONFIGURATION
 * -------------------------------------------------------------------------
 * This is the single source of truth for the template. Change business
 * details, contact info, pricing, testimonials, and content here rather
 * than hunting through the HTML files.
 *
 * Loaded before every other script (see the <script> order in each HTML
 * file), and made available globally as `window.SITE_CONFIG`.
 * -------------------------------------------------------------------------
 */

window.SITE_CONFIG = {

  // ---------------------------------------------------------------------
  // BUSINESS IDENTITY
  // ---------------------------------------------------------------------
  business: {
    name: "Pristine & Co.",
    shortName: "Pristine",
    tagline: "Professional cleaning, done properly.",
    foundedYear: 2019,
    logoText: "P&Co.",
    description:
      "A locally owned residential and commercial cleaning company serving homes and businesses with careful, reliable, detail-first cleaning.",
  },

  // ---------------------------------------------------------------------
  // CONTACT DETAILS
  // ---------------------------------------------------------------------
  contact: {
    phoneDisplay: "0161 782 4900",
    phoneRaw: "+441617824900", // used for tel: links
    whatsappNumber: "441617824900", // digits only, used for wa.me links
    whatsappDefaultMessage: "Hello, I'd like to get a quote for your cleaning services.",
    email: "hello@pristineandco.example",
    address: {
      line1: "128 Harbour Mill Road, Unit 4",
      city: "Manchester",
      region: "Greater Manchester",
      postalCode: "M1 4WQ",
      full: "128 Harbour Mill Road, Unit 4, Manchester, M1 4WQ",
    },
    hours: [
      { days: "Monday – Friday", time: "7:00am – 7:00pm" },
      { days: "Saturday", time: "8:00am – 4:00pm" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  // ---------------------------------------------------------------------
  // SOCIAL LINKS (leave blank string to hide an icon)
  // ---------------------------------------------------------------------
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    google: "https://google.com/",
  },

  // ---------------------------------------------------------------------
  // ANNOUNCEMENT BAR
  // ---------------------------------------------------------------------
  announcement: {
    enabled: true,
    text: "Now accepting new residential & commercial cleaning clients across Greater Manchester.",
    linkText: "Get a free quote",
    linkHref: "#quote",
  },

  // ---------------------------------------------------------------------
  // SERVICE AREAS
  // ---------------------------------------------------------------------
  serviceAreas: [
    "Manchester", "Salford", "Stockport", "Trafford",
    "Oldham", "Bury", "Rochdale", "Wigan",
  ],
  serviceAreaCity: "Manchester",

  // ---------------------------------------------------------------------
  // STATISTICS (homepage counters)
  // ---------------------------------------------------------------------
  stats: [
    { value: 500, suffix: "+", label: "Homes &amp; Offices Cleaned" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 5, suffix: "★", label: "Average Rating" },
    { value: 6, suffix: "+", label: "Years in Business" },
  ],

  // ---------------------------------------------------------------------
  // SERVICES (used on homepage + services.html)
  // ---------------------------------------------------------------------
  services: [
    {
      id: "residential",
      icon: "home",
      title: "Residential Cleaning",
      short: "Regular home cleaning for kitchens, bedrooms, bathrooms and living spaces.",
      detail: "Routine cleaning that keeps every room consistently fresh, dusted, and organised, on a schedule that suits your household.",
      image: "assets/images/team-smiling-cleaner.jpg",
      includes: ["Kitchens & bathrooms", "Dusting & surfaces", "Floors, vacuuming & mopping", "Bed making & tidying"],
      idealFor: "Homeowners and renters who want a consistently clean home without the weekly workload.",
    },
    {
      id: "deep",
      icon: "sparkle",
      title: "Deep Cleaning",
      short: "Detailed, top-to-bottom cleaning for spaces that need extra attention.",
      detail: "A thorough pass through skirting boards, grout, appliances, and every overlooked corner, ideal before a big event or after a long stretch without professional cleaning.",
      image: "assets/images/cleaner-with-supplies.jpg",
      includes: ["Inside appliances", "Skirting boards & grout", "Light fixtures & vents", "Cabinet fronts & interiors"],
      idealFor: "Anyone resetting a space that hasn't had a deep clean in a while, or preparing for guests.",
    },
    {
      id: "moveinout",
      icon: "box",
      title: "Move-In / Move-Out Cleaning",
      short: "Professional cleaning before moving in or after moving out.",
      detail: "A detailed clean that helps secure your deposit or hands over a spotless space to the next resident.",
      image: "assets/images/cleaning-supplies-flatlay.jpg",
      includes: ["Empty-room deep clean", "Cabinets & closets", "Appliance interiors", "Window sills & tracks"],
      idealFor: "Renters, landlords, and homeowners transitioning between tenants or homeowners.",
    },
    {
      id: "commercial",
      icon: "building",
      title: "Commercial Cleaning",
      short: "Reliable cleaning for offices, shops and commercial properties.",
      detail: "Scheduled cleaning that keeps your business presentable for staff and customers, with flexible before- or after-hours visits.",
      image: "assets/images/hero-office-team.jpg",
      includes: ["Reception & common areas", "Workstations & surfaces", "Restrooms & kitchenettes", "Trash removal"],
      idealFor: "Offices, retail spaces, and small commercial properties needing dependable upkeep.",
    },
    {
      id: "airbnb",
      icon: "key",
      title: "Airbnb / Short-Term Rental Cleaning",
      short: "Professional turnover cleaning for short-term rentals.",
      detail: "Fast, consistent turnovers between guests, including linen resets and a hotel-standard presentation check.",
      image: "assets/images/team-smiling-cleaner.jpg",
      includes: ["Linen change & staging", "Bathroom & kitchen reset", "Restocking checklist", "Guest-ready inspection"],
      idealFor: "Hosts who need dependable, on-schedule turnovers between guest stays.",
    },
    {
      id: "construction",
      icon: "broom",
      title: "Post-Construction Cleaning",
      short: "Removal of dust, debris and construction residue.",
      detail: "Detailed cleanup after renovation or construction work, from fine drywall dust to adhesive residue and paint spatter.",
      image: "assets/images/cleaning-supplies-flatlay.jpg",
      includes: ["Fine dust removal", "Window & fixture cleanup", "Floor residue & adhesive", "Final walkthrough clean"],
      idealFor: "Contractors, homeowners, and property managers closing out a renovation project.",
    },
  ],

  // ---------------------------------------------------------------------
  // WHY CHOOSE US
  // ---------------------------------------------------------------------
  whyChooseUs: [
    { icon: "clock", title: "Reliable & On-Time", text: "We show up when we say we will, every time, with a confirmed arrival window." },
    { icon: "badge", title: "Experienced Professionals", text: "Every cleaner is trained, background checked, and held to the same detailed checklist." },
    { icon: "leaf", title: "Eco-Friendly Products", text: "We default to low-toxicity, environmentally considerate products unless you request otherwise." },
    { icon: "calendar", title: "Flexible Scheduling", text: "One-time, weekly, biweekly, or monthly, we build a plan around your calendar." },
    { icon: "shield", title: "Fully Insured", text: "Our team and work are fully insured for your peace of mind." },
    { icon: "star", title: "Satisfaction Focused", text: "Not happy with an area? Tell us within 24 hours and we'll make it right." },
  ],

  // ---------------------------------------------------------------------
  // HOW IT WORKS
  // ---------------------------------------------------------------------
  process: [
    { title: "Request a Quote", text: "Use our quote checker or contact form to tell us about your space in under a minute." },
    { title: "Choose Your Service", text: "We confirm scope, frequency, and a time window that fits your schedule." },
    { title: "We Clean", text: "A vetted, trained team arrives on time and works from a detailed room-by-room checklist." },
    { title: "Enjoy Your Fresh Space", text: "We do a final walkthrough, and you enjoy the results, with support if anything needs a revisit." },
  ],

  // ---------------------------------------------------------------------
  // TESTIMONIALS
  // ---------------------------------------------------------------------
  testimonials: [
    { name: "Hannah Ortiz", location: "Manchester", rating: 5, text: "The team is unbelievably thorough. I've used two other cleaning companies before and neither came close to this level of detail, especially in the kitchen and bathrooms." },
    { name: "Marcus Chen", location: "Stockport", rating: 5, text: "We switched our small office to Pristine & Co. six months ago and it's been completely dependable. Same two cleaners each time, always on schedule." },
    { name: "Priya Anand", location: "Salford", rating: 5, text: "Booked a move-out clean and got our full deposit back. The landlord actually commented on how spotless the oven and skirting boards were." },
    { name: "Daniel Fischer", location: "Bury", rating: 4, text: "Consistently good fortnightly service. One visit ran a little later than expected but they called ahead and made it right on the next clean." },
    { name: "Lauren Ibarra", location: "Trafford", rating: 5, text: "I manage two Airbnb units and turnover cleaning has to be fast and flawless. This team has never let a turnaround slip." },
    { name: "Ben Okafor", location: "Oldham", rating: 5, text: "Post-renovation cleanup after our kitchen refit was overwhelming until they came in. Every surface was dust-free within a few hours." },
  ],

  // ---------------------------------------------------------------------
  // PORTFOLIO (before / after case studies)
  // ---------------------------------------------------------------------
  portfolio: [
    {
      id: "kitchen-deep-clean",
      title: "Residential Kitchen",
      category: "deep",
      categoryLabel: "Deep Cleaning",
      location: "Manchester",
      description: "A full deep clean addressing built-up grease on the range hood, grout lines, and cabinet fronts.",
      before: "assets/images/team-smiling-cleaner.jpg",
      after: "assets/images/team-smiling-cleaner.jpg",
    },
    {
      id: "bathroom-transformation",
      title: "Bathroom Transformation",
      category: "deep",
      categoryLabel: "Deep Cleaning",
      location: "Stockport",
      description: "Grout restoration, descaled fixtures, and a full tile-to-ceiling detail pass.",
      before: "assets/images/cleaner-with-supplies.jpg",
      after: "assets/images/cleaner-with-supplies.jpg",
    },
    {
      id: "living-room-refresh",
      title: "Living Room Refresh",
      category: "residential",
      categoryLabel: "Residential Cleaning",
      location: "Salford",
      description: "Routine residential visit: dusting, upholstery care, floor care, and full surface reset.",
      before: "assets/images/cleaning-supplies-flatlay.jpg",
      after: "assets/images/cleaning-supplies-flatlay.jpg",
    },
    {
      id: "office-cleaning",
      title: "Office Cleaning",
      category: "commercial",
      categoryLabel: "Commercial Cleaning",
      location: "Trafford",
      description: "Weekly commercial contract covering workstations, common areas, and restrooms.",
      before: "assets/images/hero-office-team.jpg",
      after: "assets/images/hero-office-team.jpg",
    },
    {
      id: "move-out-clean",
      title: "Move-Out Cleaning",
      category: "moveinout",
      categoryLabel: "Move-In / Move-Out",
      location: "Bury",
      description: "End-of-lease clean covering empty cabinets, appliance interiors, and window tracks.",
      before: "assets/images/team-smiling-cleaner.jpg",
      after: "assets/images/team-smiling-cleaner.jpg",
    },
    {
      id: "post-construction",
      title: "Post-Construction Cleanup",
      category: "construction",
      categoryLabel: "Post-Construction",
      location: "Oldham",
      description: "Full debris and fine-dust removal following a kitchen renovation.",
      before: "assets/images/cleaner-with-supplies.jpg",
      after: "assets/images/cleaner-with-supplies.jpg",
    },
  ],

  // ---------------------------------------------------------------------
  // QUOTE ESTIMATOR PRICING
  // All figures are placeholder starting points, USD. Adjust freely.
  // Final estimate = base(property+size) + cleaningTypeAdjustment,
  // then multiplied by frequencyMultiplier, shown as a ± range.
  // ---------------------------------------------------------------------
  pricing: {
    currencySymbol: "£",
    propertySizes: {
      house: [
        { id: "studio", label: "Studio / Small", base: 70 },
        { id: "1-2bed", label: "1–2 Bedrooms", base: 95 },
        { id: "3-4bed", label: "3–4 Bedrooms", base: 135 },
        { id: "5plus", label: "5+ Bedrooms", base: 185 },
      ],
      apartment: [
        { id: "studio", label: "Studio / Small", base: 65 },
        { id: "1-2bed", label: "1–2 Bedrooms", base: 85 },
        { id: "3-4bed", label: "3–4 Bedrooms", base: 120 },
        { id: "5plus", label: "5+ Bedrooms", base: 160 },
      ],
      office: [
        { id: "small", label: "Small Office", base: 80 },
        { id: "medium", label: "Medium Office", base: 140 },
        { id: "large", label: "Large Office", base: 220 },
        { id: "custom", label: "Custom / Multi-Floor", base: 280 },
      ],
      commercial: [
        { id: "small", label: "Small Space", base: 95 },
        { id: "medium", label: "Medium Space", base: 165 },
        { id: "large", label: "Large Space", base: 250 },
        { id: "custom", label: "Custom / Multi-Unit", base: 320 },
      ],
      airbnb: [
        { id: "studio", label: "Studio / Small", base: 55 },
        { id: "1-2bed", label: "1–2 Bedrooms", base: 75 },
        { id: "3-4bed", label: "3–4 Bedrooms", base: 100 },
        { id: "5plus", label: "5+ Bedrooms", base: 135 },
      ],
    },
    cleaningTypeAdjustment: {
      standard: 0,
      deep: 45,
      moveinout: 40,
      recurring: -8,
      construction: 70,
    },
    frequencyMultiplier: {
      onetime: 1,
      weekly: 0.85,
      biweekly: 0.9,
      monthly: 0.95,
    },
    rangeSpreadPercent: 0.22, // creates the low–high estimate band
  },

  // ---------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------
  faqs: [
    { q: "Do I need to provide cleaning supplies?", a: "No. Our team brings all cleaning products and equipment. If you'd prefer we use products you already have to hand, just let us know when booking." },
    { q: "Are your cleaners insured?", a: "Yes, every visit is covered by our business insurance, and all team members are background checked before joining." },
    { q: "Do you offer recurring cleaning?", a: "Yes. Weekly, fortnightly, and monthly plans are all available, and recurring clients receive a small discount versus one-off visits." },
    { q: "How much does cleaning cost?", a: "Pricing depends on property size, condition, and cleaning type. Use our quote checker for an instant estimate, or contact us for a precise quote." },
    { q: "Do you clean offices?", a: "Yes, we offer scheduled commercial cleaning for offices, retail spaces, and other small commercial properties." },
    { q: "Can I reschedule?", a: "Absolutely. We ask for at least 24 hours' notice where possible so we can adjust the team's schedule." },
    { q: "Do you bring your own equipment?", a: "Yes, our team arrives fully equipped with vacuums, mops, and all cleaning tools needed for the job." },
    { q: "What areas do you serve?", a: "We serve Manchester and the surrounding areas, including Salford, Stockport, Trafford, Oldham, Bury, Rochdale, and Wigan." },
    { q: "How long does a cleaning take?", a: "A standard clean typically takes 1.5–3 hours depending on size, while deep cleans and move-out cleans usually take longer." },
    { q: "What is included in a deep clean?", a: "Deep cleans go beyond routine tidying to cover skirting boards, grout, appliance interiors, light fixtures, and other frequently overlooked areas." },
  ],

  // ---------------------------------------------------------------------
  // TEAM (About page)
  // ---------------------------------------------------------------------
  team: [
    { name: "Renata Silva", role: "Founder & Operations Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
    { name: "Owen Marsh", role: "Field Operations Manager", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=600&q=80" },
    { name: "Ivy Thompson", role: "Client Care Coordinator", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80" },
  ],

  // ---------------------------------------------------------------------
  // CHATBOT (frontend-only scripted assistant, no external API)
  // ---------------------------------------------------------------------
  chatbot: {
    enabled: true,
    greeting: "Hi! 👋 How can we help you today?",
  },
};
