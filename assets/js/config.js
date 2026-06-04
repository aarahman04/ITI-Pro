// ============================================================
// ITI Pro — Global Site Configuration
// Edit this file to update brand info across all pages
// ============================================================

const SITE = {
  name: "ITI Pro",
  logoText: "ITI<span>Pro</span>",
  tagline: "Empowering the Electric Vehicle Revolution",
  taglineSub: "Training · Service · Sales · Franchise",

  // Contact
  phone: "+91 94405 58121",
  phoneAlt: "+91 83285 79907",
  email: "info@itipro.in",
  emailSupport: "support@itipro.in",
  address: "ITI Pro EV House, EV Industrial Zone, Hyderabad — 500032, Telangana, India",
  addressShort: "Hyderabad, Telangana, India",

  // Location / Google Maps
  mapLink:  "https://maps.app.goo.gl/3zW82gujKuQZQWNx8",
  mapEmbed: "https://www.google.com/maps?q=Hyderabad%2C%20Telangana%2C%20India&z=12&output=embed",

  // Social Links
  social: {
    facebook:  "https://facebook.com/itipro",
    instagram: "https://instagram.com/itipro",
    linkedin:  "https://linkedin.com/company/itipro",
    youtube:   "https://youtube.com/@itipro",
    twitter:   "https://twitter.com/itipro",
  },

  // Default page title pattern — {PAGE} is replaced per page
  titlePattern: "{PAGE} | ITI Pro — EV Organization",

  // Placeholder images
  placeholders: {
    person:  "https://placehold.co/400x400/1a2a1a/4ade80?text=Photo",
    gallery: "https://placehold.co/600x400/0d1f0d/4ade80?text=Gallery",
    hero:    "https://placehold.co/1400x700/0d1f0d/4ade80?text=Hero+Image",
    logo:    "",
  },

  // Navigation links
  nav: [
    { label: "Home",      href: "index.html" },
    { label: "About",     href: "pages/about.html" },
    { label: "Team",      href: "pages/team.html" },
    { label: "Training",  href: "pages/training.html" },
    { label: "Service",   href: "pages/service.html" },
    { label: "Sales",     href: "pages/sales.html" },
    { label: "Franchise", href: "pages/franchise.html" },
    { label: "Customers", href: "pages/customers.html" },
    { label: "Gallery",   href: "pages/photo-gallery.html",
      children: [
        { label: "Photo Gallery", href: "pages/photo-gallery.html" },
        { label: "Video Gallery", href: "pages/video-gallery.html" },
      ]
    },
    { label: "Career",    href: "pages/career.html" },
    { label: "Expo",      href: "pages/expo.html" },
    { label: "Contact",   href: "pages/contact.html" },
  ],

  // Footer quick links
  footerLinks: [
    { label: "Home",      href: "index.html" },
    { label: "About",     href: "pages/about.html" },
    { label: "Training",  href: "pages/training.html" },
    { label: "Service",   href: "pages/service.html" },
    { label: "Sales",     href: "pages/sales.html" },
    { label: "Franchise", href: "pages/franchise.html" },
    { label: "Career",    href: "pages/career.html" },
    { label: "Contact",   href: "pages/contact.html" },
  ],

  // Leadership team — real ITI Pro leaders
  team: [
    {
      role: "CEO",
      name: "Prof. Mohammed Iftheqar",
      dept: "executive",
      email: "ceo@itipro.in",
      phone: "+91 94405 58121",
      photo: "assets/images/leaders/ceo-mohammed-iftheqar.png",
      brief: "As Chief Executive Officer, Prof. Mohammed Iftheqar sets ITI Pro's vision and strategy across EV training, service, and distribution — leading the mission to electrify India's mobility workforce.",
      featured: true,
    },
    {
      role: "Deputy CEO",
      name: "Shroff. Mohd. Fayazali",
      dept: "executive",
      email: "deputyceo@itipro.in",
      phone: "+91 91824 47663",
      photo: "assets/images/leaders/deputy-ceo-fayazali.jpeg",
      brief: "As Deputy CEO, Shroff. Mohd. Fayazali oversees execution of company strategy, partnerships, and regional expansion — ensuring ITI Pro's EV ecosystem scales smoothly and sustainably.",
    },
    {
      role: "Deputy CFO",
      name: "Mohammed Sardar",
      dept: "finance",
      email: "cfo@itipro.in",
      phone: "+91 95058 04228",
      photo: "assets/images/leaders/cfo-mohammed-sardar.png",
      brief: "As Deputy Chief Financial Officer, Mohammed Sardar leads financial planning, budgeting, and compliance — building a strong, transparent foundation for the company's growth in the EV sector.",
    },
    {
      role: "Operations Director (OOD)",
      name: "Mohammed Malik",
      dept: "operations",
      email: "operations@itipro.in",
      phone: "+91 83285 79907",
      photo: "assets/images/leaders/ood-mohammed-malik.jpeg",
      brief: "As Officer of Operations, Mohammed Malik directs on-ground operations — coordinating service delivery, logistics, and field teams to keep ITI Pro's EV operations running efficiently every day.",
    },
  ],

  currentYear: new Date().getFullYear(),
};