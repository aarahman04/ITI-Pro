/* ============================================================
   ITI Pro — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Inject Header ── */
  injectHeader();

  /* ── 2. Inject Footer ── */
  injectFooter();

  /* ── 3. Set page title ── */
  const pageTitleEl = document.querySelector('meta[name="page-title"]');
  if (pageTitleEl) {
    const pageTitle = pageTitleEl.getAttribute('content');
    document.title = SITE.titlePattern.replace('{PAGE}', pageTitle);
  }

  /* ── 4. Scroll nav shadow ── */
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-outer');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ── 5. Accordion ── */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  /* ── 6. Footer year ── */
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = SITE.currentYear;
  });

});


function resolveSiteHref(path) {
  if (!path || /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  const inPages = window.location.pathname.includes('/pages/');
  const base = inPages ? '..' : '.';
  return `${base}/${path}`;
}

/* ──────────────────────────────────────────
   Header Builder
   ────────────────────────────────────────── */
function injectHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  // Build nav items
  const navItems = SITE.nav.map(item => {
    if (item.children) {
      const sub = item.children.map(c => `<a href="${resolveSiteHref(c.href)}">${c.label}</a>`).join('');
      return `
        <li class="nav-item">
          <a class="nav-link" href="${resolveSiteHref(item.href)}">${item.label} <span style="font-size:.7em;opacity:.6">▾</span></a>
          <div class="nav-dropdown">${sub}</div>
        </li>`;
    }
    return `<li class="nav-item"><a class="nav-link" href="${resolveSiteHref(item.href)}">${item.label}</a></li>`;
  }).join('');

  // Mobile nav items (flat)
  const mobileItems = SITE.nav.flatMap(item => {
    if (item.children) {
      return [
        `<li><span class="sub-label">${item.label}</span></li>`,
        ...item.children.map(c => `<li><a href="${resolveSiteHref(c.href)}">${c.label}</a></li>`)
      ];
    }
    return [`<li><a href="${resolveSiteHref(item.href)}">${item.label}</a></li>`];
  }).join('');

  placeholder.outerHTML = `
  <nav class="nav-outer" id="main-nav">
    <div class="nav-inner">
      <a class="nav-logo" href="${resolveSiteHref('index.html')}">${SITE.logoText}</a>
      <ul class="nav-links">${navItems}</ul>
      <a class="btn btn--primary btn--sm nav-cta" href="${resolveSiteHref('pages/contact.html')}">Get in Touch</a>
      <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <nav class="nav-mobile" id="nav-mobile">
    <ul>${mobileItems}</ul>
    <div class="nav-mobile-cta">
      <a class="btn btn--primary w-full" href="${resolveSiteHref('pages/contact.html')}">Get in Touch</a>
    </div>
  </nav>`;

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('nav-mobile').classList.toggle('open');
  });

  // Mark active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .nav-mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPath ||
        ((currentPath.endsWith('/') || currentPath.endsWith('/index.html')) && link.getAttribute('href') === resolveSiteHref('index.html'))) {
      link.classList.add('active');
    }
  });
}

/* ──────────────────────────────────────────
   Footer Builder
   ────────────────────────────────────────── */
function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const quickLinks = SITE.footerLinks.map(l =>
    `<li><a href="${resolveSiteHref(l.href)}">${l.label}</a></li>`
  ).join('');

  const socialIcons = {
    facebook:  'f',
    instagram: '📷',
    linkedin:  'in',
    youtube:   '▶',
    twitter:   '✕',
  };

  const socials = Object.entries(SITE.social).map(([key, url]) =>
    `<a href="${url}" target="_blank" rel="noopener" aria-label="${key}">${socialIcons[key] || '●'}</a>`
  ).join('');

  placeholder.outerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">${SITE.logoText}</div>
          <p>${SITE.tagline}. ${SITE.taglineSub}.</p>
          <div class="footer-social">${socials}</div>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">Quick Links</div>
          <ul>${quickLinks}</ul>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">Programs</div>
          <ul>
            <li><a href="${resolveSiteHref('pages/training.html')}">EV Seminars</a></li>
            <li><a href="${resolveSiteHref('pages/training.html')}">Workshops</a></li>
            <li><a href="${resolveSiteHref('pages/training.html')}">Internship</a></li>
            <li><a href="${resolveSiteHref('pages/training.html')}">Industrial Visit</a></li>
            <li><a href="${resolveSiteHref('pages/training.html')}">Placements</a></li>
            <li><a href="${resolveSiteHref('pages/expo.html')}">Expo & Events</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-col__title">Contact</div>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <span>📞</span>
              <p><a href="tel:${SITE.phone}">${SITE.phone}</a></p>
            </div>
            <div class="footer-contact-item">
              <span>✉️</span>
              <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
            </div>
            <div class="footer-contact-item">
              <span>📍</span>
              <p>${SITE.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© <span class="js-year"></span> ${SITE.name}. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="${resolveSiteHref('pages/contact.html')}">Contact</a>
        </div>
      </div>
    </div>
  </footer>`;

  // Re-run year fill since DOM just changed
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = SITE.currentYear;
  });
}
