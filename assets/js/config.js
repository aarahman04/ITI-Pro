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
  phone: "+91 98765 43210",
  phoneAlt: "+91 91234 56789",
  email: "info@itipro.in",
  emailSupport: "support@itipro.in",
  address: "ITI Pro House, Plot No. 42, EV Industrial Zone, Hyderabad — 500032, Telangana, India",
  addressShort: "Hyderabad, Telangana, India",

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

  // Team members
  team: [
    { role: "Chief Patron",       name: "Dr. Ramesh Kumar",  email: "patron@itipro.in",        phone: "+91 98001 00001", brief: "Visionary leader with 30+ years in industrial training and EV technology policy." },
    { role: "CEO",                name: "Arjun Mehta",       email: "ceo@itipro.in",           phone: "+91 98001 00002", brief: "Driving organizational growth and EV ecosystem partnerships across India." },
    { role: "CFO — Finance",      name: "Priya Sharma",      email: "cfo@itipro.in",           phone: "+91 98001 00003", brief: "Overseeing financial planning, compliance, and sustainable investment strategies." },
    { role: "CFO — Foreign",      name: "Karthik Nair",      email: "cfo.foreign@itipro.in",   phone: "+91 98001 00004", brief: "Managing international finance, forex, and global expansion financing." },
    { role: "CMO",                name: "Sneha Reddy",       email: "cmo@itipro.in",           phone: "+91 98001 00005", brief: "Leading brand strategy, digital campaigns, and EV awareness programs." },
    { role: "CTO — Training",     name: "Vikram Joshi",      email: "cto.training@itipro.in",  phone: "+91 98001 00006", brief: "Designing cutting-edge EV training curricula and certification frameworks." },
    { role: "CTO — Technical",    name: "Anil Verma",        email: "cto.tech@itipro.in",      phone: "+91 98001 00007", brief: "Leading R&D, EV hardware integration, and technical infrastructure." },
    { role: "COO — Operations",   name: "Meera Pillai",      email: "coo@itipro.in",           phone: "+91 98001 00008", brief: "Streamlining operations, supply chain, and service delivery nationwide." },
    { role: "CPO — Production",   name: "Suresh Iyer",       email: "cpo@itipro.in",           phone: "+91 98001 00009", brief: "Overseeing product development cycles and manufacturing partnerships." },
    { role: "HR Manager",         name: "Lakshmi Das",       email: "hr@itipro.in",            phone: "+91 98001 00010", brief: "Building a skilled EV workforce through hiring, training, and culture." },
    { role: "Admin Manager",      name: "Rajan Bose",        email: "admin@itipro.in",         phone: "+91 98001 00011", brief: "Managing administrative processes, facilities, and organizational compliance." },
    { role: "Operation Manager",  name: "Divya Choudhury",   email: "ops@itipro.in",           phone: "+91 98001 00012", brief: "Coordinating day-to-day field operations and franchise networks." },
    { role: "Executive",          name: "Rahul Patil",       email: "exec1@itipro.in",         phone: "+91 98001 00013", brief: "Executing business development and client relationship initiatives." },
  ],

  currentYear: new Date().getFullYear(),
};