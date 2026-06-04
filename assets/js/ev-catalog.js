// ============================================================
// ITI Pro — EV Content Catalog
// Centralized data + render helpers for EV spare parts, flyers,
// product grids, promo banners, and a shared image lightbox.
// Built from the assets in /assets/images/{parts,flyers,...}.
// ============================================================

(function (global) {
  // Resolve an asset path correctly whether we're at site root or in /pages/
  function assetUrl(path) {
    if (!path || /^(?:[a-z]+:)?\/\//i.test(path)) return path;
    var inPages = global.location.pathname.indexOf('/pages/') !== -1;
    return (inPages ? '../' : './') + path;
  }

  // ── Product category metadata (label, icon, default feature bullets, use case) ──
  var CATS = {
    motors:      { label: 'Motors',                 icon: '⚙️', features: ['High-efficiency BLDC design', 'Sealed, IP-rated housing', 'Strong torque & smooth acceleration'], application: 'Ideal for e-scooter, e-bike and e-rickshaw drive systems.' },
    batteries:   { label: 'Batteries',              icon: '🔋', features: ['Smart BMS protection', 'High cycle-life cells', 'Quick-connect / swappable design'],            application: 'Delivers reliable range for 2W & 3W electric vehicles.' },
    controllers: { label: 'Controllers & Electronics', icon: '🖥️', features: ['Stable sine-wave / FOC drive', 'Thermal-protected heatsink', 'Plug-and-play wiring harness'],   application: 'Drives, controls and protects EV motor systems.' },
    chargers:    { label: 'Chargers',               icon: '🔌', features: ['Smart fast-charging circuit', 'LED charge-status indicators', 'Overcharge & short-circuit safe'],   application: 'Compatible with lithium-ion and lead-acid EV packs.' },
    brakes:      { label: 'Brakes & Suspension',    icon: '🛞', features: ['Fade-resistant friction material', 'Precision-fit components', 'Smooth, responsive control'],        application: 'Restores safe braking and ride comfort.' },
    drivetrain:  { label: 'Drivetrain',             icon: '🔩', features: ['Precision-machined build', 'Balanced for low vibration', 'Long service life'],                       application: 'Keeps wheels, bearings and tyres running true.' },
    accessories: { label: 'Accessories & Wiring',   icon: '🧰', features: ['OEM-grade connectors', 'Weather-resistant build', 'Easy plug-and-play fit'],                       application: 'Completes EV electricals, controls and handling.' },
    body:        { label: 'Body & Chassis',         icon: '🛵', features: ['Impact-resistant moulding', 'Corrosion-free finish', 'Exact-fit body panels'],                     application: 'Restores vehicle body, frame and styling.' },
    kits:        { label: 'Conversion Kits',        icon: '📦', features: ['Complete bolt-on solution', 'Matched motor + controller', 'Converts petrol vehicles to electric'], application: 'Everything needed to build or convert an EV.' }
  };

  // ── 73 EV spare parts (file, title, category, description) ──
  var PARTS = [
    { f: 'part-01', t: 'Speedometer Sensor PCB Board', c: 'controllers', d: 'Curved hall-sensor PCB that feeds the speed and instrument signal on e-rickshaw and e-scooter clusters.' },
    { f: 'part-02', t: 'Tapered Roller Bearing Set',   c: 'drivetrain',  d: 'Heavy-duty tapered roller bearing cup and cone for EV wheel hubs and differential assemblies.' },
    { f: 'part-03', t: 'BLDC Motor with Controller Kit', c: 'motors',    d: 'Brushless DC mid-drive motor with output sprocket and a matched controller — a complete e-rickshaw drive kit.' },
    { f: 'part-04', t: 'BLDC Brushless Geared Motor',  c: 'motors',      d: 'Sprocket-drive brushless DC motor with mounting bracket and hall/phase leads for e-rickshaws and e-carts.' },
    { f: 'part-05', t: 'Brake Control Cable with Ball Joints', c: 'brakes', d: 'Dual control-cable set with threaded ball-joint linkages for e-rickshaw braking and linkage systems.' },
    { f: 'part-06', t: 'Drum Brake Shoe Set',          c: 'brakes',      d: 'Pair of drum brake shoes with return spring for e-rickshaw and e-scooter rear hubs.' },
    { f: 'part-07', t: 'Front Brake Cable Assembly',   c: 'brakes',      d: 'Sheathed brake cable with spring-loaded adjuster and barrel nipples for precise e-scooter braking.' },
    { f: 'part-08', t: 'Front Disc Brake Pads (Pair)', c: 'brakes',      d: 'Matched pair of semi-metallic disc brake pads for e-scooter front calipers.' },
    { f: 'part-09', t: 'Charging Port Inlet Socket',   c: 'chargers',    d: '3-pin flip-cover charging inlet socket with mating connector and power leads for the vehicle charge port.' },
    { f: 'part-10', t: 'Twist Throttle with Speed Switch', c: 'accessories', d: 'Handlebar twist-grip throttle with forward/reverse and 3-speed (L-M-H) selector for e-rickshaws.' },
    { f: 'part-11', t: 'Drum Brake Back Plate Assembly', c: 'brakes',    d: 'Rear drum brake backing plate with actuating cam lever for e-scooter and e-rickshaw hubs.' },
    { f: 'part-12', t: 'Lithium-ion EV Battery Pack',  c: 'batteries',   d: 'Portable lithium-ion battery pack with carry handle and charge socket for electric scooters.' },
    { f: 'part-13', t: 'Complete Drum Brake Assembly', c: 'brakes',      d: 'Full drum brake unit with shoes, springs and backing plate for EV wheel hubs.' },
    { f: 'part-14', t: 'E-REX Lithium Battery Pack',   c: 'batteries',   d: 'Metal-enclosed lithium battery pack with high-current Anderson connector for EV drive power.' },
    { f: 'part-15', t: 'BLDC Controller (Labelled Harness)', c: 'controllers', d: 'BLDC motor controller with fully labelled phase, hall, throttle and signal connections for easy installation.' },
    { f: 'part-16', t: 'E-Scooter Onboard Charger',    c: 'chargers',    d: 'Compact onboard charger that mounts on the footboard to top up the scooter battery on the go.' },
    { f: 'part-17', t: 'EV Smart Battery Charger',     c: 'chargers',    d: 'Compact smart charger with status LEDs and output lead for lithium and lead-acid EV batteries.' },
    { f: 'part-18', t: 'Universal Li-ion EV Charger',  c: 'chargers',    d: 'Lithium-ion charger with status LED and interchangeable input/output plug adapters.' },
    { f: 'part-19', t: 'Type-2 AC Charging Inlet',     c: 'chargers',    d: 'Panel-mount Type-2 (7-pin) AC charging inlet socket with high-voltage harness for EVs.' },
    { f: 'part-20', t: 'EV Lithium Battery Charger',   c: 'chargers',    d: 'Aluminium-housed EV charger with Indian 3-pin plug and output lead for e-rickshaw batteries.' },
    { f: 'part-21', t: 'Wuxing Throttle Grip Kit',     c: 'accessories', d: 'Wuxing twist-throttle grip assembly with sleeve, clamp ring and waterproof signal connector.' },
    { f: 'part-22', t: '48/60V 1000W Motor Controller', c: 'controllers', d: '48/60V, 1000W brushless controller/VCU with relays and full signal harness for e-rickshaws.' },
    { f: 'part-23', t: 'BLDC Sine-Wave Controller',    c: 'controllers', d: 'Finned-aluminium sine-wave brushless DC controller with phase and signal harness for quiet, efficient drive.' },
    { f: 'part-24', t: 'Twist Throttle (3-Speed + Reverse)', c: 'accessories', d: 'Handlebar twist throttle and grip with 3-speed and reverse selector and ready-to-fit plugs.' },
    { f: 'part-25', t: 'High-Power BLDC Controller',   c: 'controllers', d: 'Gold-finned high-power brushless DC controller with heavy phase leads for e-rickshaw drives.' },
    { f: 'part-26', t: '12-MOSFET BLDC Controller',    c: 'controllers', d: 'Large finned brushless DC controller with high-current phase cables for high-power EV motors.' },
    { f: 'part-27', t: '36-48V 800W BLDC Controller',  c: 'controllers', d: 'Universal intelligent brushless controller, 36-48V / 800W, with full connector harness.' },
    { f: 'part-28', t: 'LYL-9G-HS02 BLDC Controller',  c: 'controllers', d: 'Compact 48-60V DC brushless motor controller with multi-pin connectors and mounting bracket.' },
    { f: 'part-29', t: 'BLDC Controller with XT60',    c: 'controllers', d: 'Black-cased brushless DC controller with XT60 battery connector and complete signal harness.' },
    { f: 'part-30', t: 'Front Telescopic Fork (Pair)', c: 'brakes',      d: 'Pair of telescopic front suspension fork legs/sliders for the e-scooter front end.' },
    { f: 'part-31', t: 'Front Fork with Triple Clamp', c: 'brakes',      d: 'Complete front telescopic fork assembly with yoke and steering stem for e-scooters.' },
    { f: 'part-32', t: 'Hydraulic Disc Brake Caliper', c: 'brakes',      d: 'Single-piston hydraulic disc brake caliper for e-scooter and e-motorcycle wheels.' },
    { f: 'part-33', t: 'Front Fork Shock Absorber (Pair)', c: 'brakes',  d: 'Pair of telescopic front fork suspension units with dust gaiters for e-scooters.' },
    { f: 'part-34', t: '4-Piston Disc Brake Caliper',  c: 'brakes',      d: 'Multi-piston hydraulic disc brake caliper with bleed valve for high-performance EV braking.' },
    { f: 'part-35', t: 'TEK WATT Lithium Battery Pack', c: 'batteries',  d: 'Tall lithium battery pack with carry handle and Anderson connector for higher-voltage EV use.' },
    { f: 'part-36', t: 'Disc Brake Pad Repair Kit',    c: 'brakes',      d: 'Set of disc brake pads with caliper pins, bolts, seals and o-ring for a full brake service.' },
    { f: 'part-37', t: 'EV Traction Battery Block',    c: 'batteries',   d: 'Compact sealed battery block with spade terminals for building EV battery banks.' },
    { f: 'part-38', t: 'EV Twist Throttle & Grip Set', c: 'accessories', d: 'Twist-grip throttle assembly with handlebar grips and wiring connector for e-scooters.' },
    { f: 'part-39', t: 'Lithium-Ion E-Scooter Battery', c: 'batteries',  d: 'Metal-cased lithium-ion e-scooter battery pack with carry handle and integrated protection.' },
    { f: 'part-40', t: 'Premium Lithium Scooter Battery', c: 'batteries', d: 'Premium lithium e-scooter battery pack with BMS protection and Anderson connector.' },
    { f: 'part-41', t: 'BLDC Geared Hub Motor',        c: 'motors',      d: 'Brushless DC geared hub motor for e-bike and e-scooter wheel builds.' },
    { f: 'part-42', t: 'E-Bike Lithium Battery (Lock)', c: 'batteries',  d: 'Lockable frame-mount e-bike lithium battery pack with key and charge-level indicator.' },
    { f: 'part-43', t: '19" Hub-Motor Spoked Wheel',   c: 'motors',      d: '19-inch spoked wheel with integrated BLDC hub motor and off-road tyre.' },
    { f: 'part-44', t: 'Alloy Wheel Hub Motor',        c: 'motors',      d: 'Turbine-style alloy rim with integrated BLDC hub motor for e-scooters.' },
    { f: 'part-45', t: 'High-Power Hub Motor Wheel',   c: 'motors',      d: 'Wide-rim integrated BLDC hub motor with phase and sensor wiring for powerful e-scooters.' },
    { f: 'part-46', t: 'Drilled Brake Disc Rotor',     c: 'brakes',      d: 'Drilled stainless brake disc rotor with integrated mounting hub for better cooling.' },
    { f: 'part-47', t: 'E-Scooter Steel Body Frame',   c: 'body',        d: 'Welded tubular steel chassis frame with battery compartment for electric scooters.' },
    { f: 'part-48', t: '10" 350W Direct-Drive Hub Motor', c: 'motors',   d: '10-inch 350W tubeless direct-drive hub-motor wheel for e-scooters.' },
    { f: 'part-49', t: 'Ventilated Brake Disc Rotor',  c: 'brakes',      d: 'Internally-vented brake disc rotor for cooler, fade-free EV braking.' },
    { f: 'part-50', t: '5-Spoke Drilled Brake Disc',   c: 'brakes',      d: 'Lightweight 5-spoke drilled brake disc rotor for e-scooters.' },
    { f: 'part-51', t: 'Rear Shock Absorber (Pair)',   c: 'brakes',      d: 'Pair of coil-spring rear shock absorbers for a smooth electric-scooter ride.' },
    { f: 'part-52', t: 'Wave Petal Brake Disc Rotor',  c: 'brakes',      d: 'Wavy petal-edge brake disc rotor with 5-bolt mounting carrier.' },
    { f: 'part-53', t: 'CYGOLD E-Scooter Conversion Kit', c: 'kits',     d: 'Complete EV conversion kit with hub motor, controller, converter, throttle, display and wiring.' },
    { f: 'part-54', t: 'BLDC Hub Motor (JM4825)',      c: 'motors',      d: 'Turbine-finned brushless DC hub motor with phase and sensor wiring harness.' },
    { f: 'part-55', t: 'E-Brake Lever Pair with Sensor', c: 'brakes',    d: 'Left and right brake levers with integrated motor cut-off sensors for e-scooters.' },
    { f: 'part-56', t: 'Front Alloy Wheel & Disc Assembly', c: 'brakes', d: 'Front alloy wheel fitted with disc and caliper, ready to bolt onto an electric scooter.' },
    { f: 'part-57', t: '7-Spoke Alloy Scooter Rim',    c: 'drivetrain',  d: '7-spoke black alloy rear wheel rim with hub bearing for e-scooters.' },
    { f: 'part-58', t: 'E-Scooter Rear-View Mirror Set', c: 'accessories', d: 'Pair of side rear-view mirrors for electric scooters and mopeds.' },
    { f: 'part-59', t: 'Rear Fender with Tail-Light Mount', c: 'body',   d: 'Plastic rear mudguard/fender with tail-light mounting points for e-scooters.' },
    { f: 'part-60', t: 'Handlebar Lower Cover Panel',  c: 'body',        d: 'Front handlebar lower cover panel with headlight openings for e-scooters.' },
    { f: 'part-61', t: 'Plastic Rear Mudguard Fender', c: 'body',        d: 'Single-piece plastic rear fender/mudguard for an electric scooter.' },
    { f: 'part-62', t: 'EV Main Wiring Harness',       c: 'accessories', d: 'Complete multi-connector wiring harness/loom for electric scooters.' },
    { f: 'part-63', t: 'Wiring Harness & Control Kit', c: 'accessories', d: 'Full wiring loom kit with relay, regulator, coil and ignition switch for EV electrical builds.' },
    { f: 'part-64', t: 'Controller Adapter Harness Set', c: 'accessories', d: 'Set of controller-to-motor adapter wiring harnesses with multi-pin connectors.' },
    { f: 'part-65', t: 'Single-Pole MCB (iC60N)',      c: 'controllers', d: 'Schneider-type single-pole miniature circuit breaker for EV charging and panel protection.' },
    { f: 'part-66', t: 'TFT Digital Speedometer Display', c: 'controllers', d: 'Colour TFT instrument cluster showing speed, range and charge status for e-scooters.' },
    { f: 'part-67', t: 'Digital LED Speedometer Cluster', c: 'controllers', d: 'Digital LED instrument cluster with speed, gear and battery display for EVs.' },
    { f: 'part-68', t: 'EV Digital Meter with Bracket', c: 'controllers', d: 'Digital speedometer/instrument cluster with mounting bracket for e-scooters and e-rickshaws.' },
    { f: 'part-69', t: 'Front Mudguard Fender',        c: 'body',        d: 'Painted front fender/mudguard body panel for an electric scooter.' },
    { f: 'part-70', t: 'Front Cowl Body Panel',        c: 'body',        d: 'Painted front cowl / leg-shield body panel for an electric scooter.' },
    { f: 'part-71', t: 'Ignition Lock & Key Set',      c: 'accessories', d: 'Complete ignition switch and lock set with keys for electric scooters.' },
    { f: 'part-72', t: 'BENORG 48-72V EV Alarm System', c: 'controllers', d: 'Anti-theft alarm module (48-72V) with two remote key fobs for electric vehicles.' },
    { f: 'part-73', t: 'Scooter Tyre & Tube Set',      c: 'drivetrain',  d: 'Pneumatic e-scooter tyre with matching inner tube.' }
  ];

  // ── 6 marketing flyers (file, title, text, default CTA) ──
  var FLYERS = [
    { f: 'flyer-1', t: 'Stop Paying for Petrol', text: 'No fuel cost. Low maintenance. An eco-friendly ride. Smart riders are switching to electric — are you?' },
    { f: 'flyer-2', t: 'Only 20 Paise per KM', text: '100% electric with zero fuel cost. Cut your running cost to just ₹0.20 per kilometre with an ITI Pro EV.' },
    { f: 'flyer-3', t: 'The EV Revolution Is a Business Opportunity', text: 'India is going electric. Partner with ITI Pro and build a profitable EV franchise in your city.' },
    { f: 'flyer-4', t: 'No RTO. No Licence. Just Ride.', text: 'Our low-speed electric scooters need no registration or licence — ride smart and skip the hassle.' },
    { f: 'flyer-5', t: 'Smarter Rides, Better Tomorrows', text: 'Long battery life, fast charging, smooth performance and an eco-friendly ride. Ride the future today.' },
    { f: 'flyer-6', t: 'Smart Motion, Smart Future', text: 'Low running cost, zero pollution, modern design and low maintenance — the smart way to move.' }
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // ── One-time style injection ──
  function injectStyles() {
    if (document.getElementById('ev-catalog-styles')) return;
    var css = document.createElement('style');
    css.id = 'ev-catalog-styles';
    css.textContent = [
      '.ev-prod-filter{display:flex;flex-wrap:wrap;gap:var(--sp-3);margin-bottom:var(--sp-10);justify-content:center}',
      '.ev-prod-fbtn{padding:var(--sp-2) var(--sp-5);border-radius:var(--r-full);border:1px solid var(--clr-border);color:var(--clr-text-muted);font-family:var(--ff-mono);font-size:var(--fs-xs);text-transform:uppercase;letter-spacing:.08em;cursor:pointer;transition:all var(--transition);background:transparent;display:inline-flex;align-items:center;gap:var(--sp-2)}',
      '.ev-prod-fbtn:hover,.ev-prod-fbtn.active{background:var(--clr-primary);color:var(--clr-dark);border-color:var(--clr-primary)}',
      '.ev-prod-fbtn .count{background:rgba(0,0,0,.15);padding:1px 6px;border-radius:var(--r-full);font-size:10px;font-weight:700}',
      '.ev-prod-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--sp-5)}',
      '@media(max-width:1100px){.ev-prod-grid{grid-template-columns:repeat(3,1fr)}}',
      '@media(max-width:768px){.ev-prod-grid{grid-template-columns:repeat(2,1fr)}}',
      '@media(max-width:480px){.ev-prod-grid{grid-template-columns:1fr}}',
      '.ev-prod-card{background:var(--clr-dark-3);border:1px solid var(--clr-border);border-radius:var(--r-lg);overflow:hidden;display:flex;flex-direction:column;transition:all var(--transition);cursor:pointer}',
      '.ev-prod-card.hidden{display:none}',
      '.ev-prod-card:hover{border-color:var(--clr-primary);transform:translateY(-5px);box-shadow:var(--shadow-md),var(--shadow-glow)}',
      '.ev-prod-card__media{position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--clr-dark-4)}',
      '.ev-prod-card__media img{width:100%;height:100%;object-fit:cover;transition:transform var(--transition-slow)}',
      '.ev-prod-card:hover .ev-prod-card__media img{transform:scale(1.06)}',
      '.ev-prod-card__badge{position:absolute;top:var(--sp-3);left:var(--sp-3);background:rgba(13,26,13,.9);backdrop-filter:blur(8px);border:1px solid var(--clr-border);border-radius:var(--r-full);padding:3px var(--sp-3);font-family:var(--ff-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--clr-primary)}',
      '.ev-prod-card__zoom{position:absolute;bottom:var(--sp-3);right:var(--sp-3);width:30px;height:30px;border-radius:50%;background:rgba(6,14,6,.7);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.85rem;opacity:0;transition:opacity var(--transition)}',
      '.ev-prod-card:hover .ev-prod-card__zoom{opacity:1}',
      '.ev-prod-card__body{padding:var(--sp-4);display:flex;flex-direction:column;flex:1}',
      '.ev-prod-card__title{font-family:var(--ff-display);font-size:var(--fs-base);font-weight:700;color:var(--clr-white);line-height:1.25;margin-bottom:var(--sp-2)}',
      '.ev-prod-card__desc{font-size:var(--fs-xs);color:var(--clr-text-muted);line-height:1.6;flex:1;margin-bottom:var(--sp-3)}',
      '.ev-prod-card__feats{list-style:none;padding:0;margin:0 0 var(--sp-3);display:flex;flex-direction:column;gap:4px}',
      '.ev-prod-card__feats li{font-size:11px;color:var(--clr-text-dim);display:flex;gap:6px;align-items:flex-start}',
      '.ev-prod-card__feats li::before{content:"✓";color:var(--clr-primary);font-weight:700;flex-shrink:0}',
      '.ev-prod-card__app{font-size:11px;color:var(--clr-text-muted);border-top:1px solid var(--clr-border);padding-top:var(--sp-3);line-height:1.5}',
      '.ev-prod-card__app b{color:var(--clr-primary);font-family:var(--ff-mono);font-size:10px;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:2px}',
      '.ev-prod-empty{text-align:center;padding:var(--sp-12);color:var(--clr-text-dim);display:none}',
      '.ev-prod-empty.show{display:block}',
      // Flyer banner
      '.ev-flyer-banner{display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-8);align-items:center;background:linear-gradient(135deg,rgba(34,197,94,.08),transparent 60%);border:1px solid var(--clr-border);border-radius:var(--r-xl);overflow:hidden;padding:var(--sp-6)}',
      '.ev-flyer-banner.reverse{direction:rtl}.ev-flyer-banner.reverse>*{direction:ltr}',
      '.ev-flyer-banner__img{width:100%;border-radius:var(--r-lg);border:1px solid var(--clr-border);display:block;cursor:pointer;background:var(--clr-dark-4)}',
      '.ev-flyer-banner__body{padding:var(--sp-4)}',
      '@media(max-width:760px){.ev-flyer-banner{grid-template-columns:1fr}.ev-flyer-banner.reverse{direction:ltr}}',
      // Lightbox
      '.ev-lightbox{position:fixed;inset:0;z-index:2000;background:rgba(4,10,4,.92);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:var(--sp-6)}',
      '.ev-lightbox.open{display:flex}',
      '.ev-lightbox__inner{max-width:980px;width:100%;max-height:90vh;display:flex;flex-direction:column;align-items:center;gap:var(--sp-4)}',
      '.ev-lightbox__img{max-width:100%;max-height:74vh;object-fit:contain;border-radius:var(--r-lg);border:1px solid var(--clr-border);box-shadow:var(--shadow-md)}',
      '.ev-lightbox__cap{color:var(--clr-white);font-size:var(--fs-base);text-align:center;max-width:640px}',
      '.ev-lightbox__cap span{display:block;color:var(--clr-text-muted);font-size:var(--fs-xs);margin-top:var(--sp-2)}',
      '.ev-lightbox__close{position:absolute;top:var(--sp-5);right:var(--sp-6);width:44px;height:44px;border-radius:50%;border:1px solid var(--clr-border);background:rgba(13,26,13,.8);color:#fff;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center}',
      '.ev-lightbox__close:hover{border-color:var(--clr-primary);color:var(--clr-primary)}'
    ].join('');
    document.head.appendChild(css);
  }

  // ── Shared image lightbox ──
  var lb;
  function ensureLightbox() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'ev-lightbox';
    lb.innerHTML = '<button class="ev-lightbox__close" aria-label="Close">×</button>' +
      '<div class="ev-lightbox__inner"><img class="ev-lightbox__img" alt=""/><div class="ev-lightbox__cap"></div></div>';
    document.body.appendChild(lb);
    function close() { lb.classList.remove('open'); }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('ev-lightbox__close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    return lb;
  }
  function openLightbox(src, title, sub) {
    ensureLightbox();
    lb.querySelector('.ev-lightbox__img').src = src;
    lb.querySelector('.ev-lightbox__img').alt = title || '';
    lb.querySelector('.ev-lightbox__cap').innerHTML = (title ? esc(title) : '') + (sub ? '<span>' + esc(sub) + '</span>' : '');
    lb.classList.add('open');
  }

  // ── Render a product grid (optionally with a category filter) ──
  function renderProducts(containerId, opts) {
    opts = opts || {};
    var el = document.getElementById(containerId);
    if (!el) return;
    injectStyles();
    var list = PARTS.slice();
    if (opts.cats && opts.cats.length) list = list.filter(function (p) { return opts.cats.indexOf(p.c) !== -1; });
    if (opts.limit) list = list.slice(0, opts.limit);

    var html = '';
    if (opts.withFilter) {
      var present = [];
      list.forEach(function (p) { if (present.indexOf(p.c) === -1) present.push(p.c); });
      html += '<div class="ev-prod-filter" id="' + containerId + '-filter">';
      html += '<button class="ev-prod-fbtn active" data-f="all">All <span class="count">' + list.length + '</span></button>';
      present.forEach(function (cid) {
        var n = list.filter(function (p) { return p.c === cid; }).length;
        html += '<button class="ev-prod-fbtn" data-f="' + cid + '"><span>' + CATS[cid].icon + '</span> ' + esc(CATS[cid].label) + ' <span class="count">' + n + '</span></button>';
      });
      html += '</div>';
    }
    html += '<div class="ev-prod-grid" id="' + containerId + '-grid">';
    list.forEach(function (p) {
      var cat = CATS[p.c];
      var feats = cat.features.slice(0, 3).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
      var img = assetUrl('assets/images/parts/' + p.f + '.jpeg');
      html += '<article class="ev-prod-card" data-c="' + p.c + '" data-img="' + img + '" data-title="' + esc(p.t) + '" data-sub="' + esc(p.d) + '">' +
        '<div class="ev-prod-card__media">' +
          '<img src="' + img + '" alt="' + esc(p.t) + '" loading="lazy"/>' +
          '<span class="ev-prod-card__badge">' + cat.icon + ' ' + esc(cat.label) + '</span>' +
          '<span class="ev-prod-card__zoom">⤢</span>' +
        '</div>' +
        '<div class="ev-prod-card__body">' +
          '<h3 class="ev-prod-card__title">' + esc(p.t) + '</h3>' +
          '<p class="ev-prod-card__desc">' + esc(p.d) + '</p>' +
          '<ul class="ev-prod-card__feats">' + feats + '</ul>' +
          '<div class="ev-prod-card__app"><b>Application</b>' + esc(cat.application) + '</div>' +
        '</div>' +
      '</article>';
    });
    html += '</div><div class="ev-prod-empty" id="' + containerId + '-empty">No products in this category.</div>';
    el.innerHTML = html;

    // Card click → lightbox
    el.querySelectorAll('.ev-prod-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openLightbox(card.getAttribute('data-img'), card.getAttribute('data-title'), card.getAttribute('data-sub'));
      });
    });
    // Filter behaviour
    if (opts.withFilter) {
      var empty = document.getElementById(containerId + '-empty');
      el.querySelectorAll('.ev-prod-fbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          el.querySelectorAll('.ev-prod-fbtn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var f = btn.getAttribute('data-f'), vis = 0;
          el.querySelectorAll('.ev-prod-card').forEach(function (c) {
            var show = f === 'all' || c.getAttribute('data-c') === f;
            c.classList.toggle('hidden', !show);
            if (show) vis++;
          });
          empty.classList.toggle('show', vis === 0);
        });
      });
    }
  }

  // ── Render a flyer promo banner ──
  function renderFlyerBanner(containerId, opts) {
    opts = opts || {};
    var el = document.getElementById(containerId);
    if (!el) return;
    injectStyles();
    var fl = FLYERS[opts.index || 0];
    var img = assetUrl('assets/images/flyers/' + fl.f + '.jpeg');
    var title = opts.title || fl.t;
    var text = opts.text || fl.text;
    var ctaText = opts.ctaText || 'Learn More';
    var ctaHref = opts.ctaHref || assetUrl('pages/contact.html');
    var second = opts.ctaSecondary;
    el.innerHTML = '<div class="ev-flyer-banner' + (opts.reverse ? ' reverse' : '') + '">' +
      '<img class="ev-flyer-banner__img" src="' + img + '" alt="' + esc(title) + '" loading="lazy"/>' +
      '<div class="ev-flyer-banner__body">' +
        (opts.eyebrow ? '<span class="section-label">' + esc(opts.eyebrow) + '</span>' : '') +
        '<h2 class="section-title mt-2">' + esc(title) + '</h2>' +
        '<div class="divider"></div>' +
        '<p class="text-muted mb-6" style="margin-top:var(--sp-4)">' + esc(text) + '</p>' +
        '<div class="btn-group">' +
          '<a href="' + ctaHref + '" class="btn btn--primary">' + esc(ctaText) + '</a>' +
          (second ? '<a href="' + second.href + '" class="btn btn--outline">' + esc(second.text) + '</a>' : '') +
        '</div>' +
      '</div>' +
    '</div>';
    el.querySelector('.ev-flyer-banner__img').addEventListener('click', function () { openLightbox(img, title, text); });
  }

  global.EVCatalog = {
    assetUrl: assetUrl,
    parts: PARTS,
    flyers: FLYERS,
    cats: CATS,
    renderProducts: renderProducts,
    renderFlyerBanner: renderFlyerBanner,
    openLightbox: openLightbox
  };
})(window);
