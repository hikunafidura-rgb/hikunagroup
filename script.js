/* HIKUNA GROUP — Companies Config (SATU-SATUNYA sumber data company)
   Tambah perusahaan baru: cukup tambah object di array ini.
   - logo: path file logo ("assets/xyz.png"), kosongkan jika belum ada.
   - image: foto showcase (hanya untuk company yang visualnya sudah cocok).
   - website: URL website perusahaan, KOSONGKAN ("") jika belum ada.
     CTA otomatis: ada URL → link tab baru | kosong → label nonaktif, tanpa URL palsu.
   - featured: satu company tampil besar di urutan pertama showcase. */
const COMPANIES = [
  { name: "HIKUNA HOSPITAL", category: "Healthcare", logo: "", featured: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop",
    website: "",
    desc: "Modern healthcare services with professional standards and a premium patient experience." },
  { name: "GULE BAROKAH", category: "Business", logo: "",
    image: "", website: "",
    desc: "A growing business unit within the HIKUNA GROUP ecosystem." },
  { name: "AMANAH JAYA", category: "Business", logo: "",
    image: "", website: "",
    desc: "A business unit contributing to the group's growth across industries." },
  { name: "HIKUNA DIGITAL", category: "Digital Technology", logo: "",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    website: "",
    desc: "Digital technology and solutions — products, platforms, and systems." },
  { name: "HIKUNA CREATIVE", category: "Creative & Branding", logo: "",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    website: "",
    desc: "Creative and branding — brand strategy, visual identity, and direction." },
  { name: "HIKUNA LAB", category: "Innovation & Technology", logo: "",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    website: "",
    desc: "Innovation hub — new technologies, digital experiments, future opportunities." },
];

/* Satu helper untuk semua link company. Jangan hardcode URL di tempat lain. */
function companyLink(c, fallback) {
  if (c.website) return { href: c.website, external: true };
  return { href: fallback || "#contact", external: false };
}

const list = document.getElementById("companyList");
let observer;

function mark(c) {
  return c.logo ? `<img src="${c.logo}" alt="${c.name} logo" class="co-logo" />` : "";
}

function visitCTA(c) {
  const link = companyLink(c);
  if (link.external) {
    return `<a class="co-link" href="${link.href}" target="_blank" rel="noopener">Visit Website <i>↗</i></a>`;
  }
  return `<span class="co-link is-off" aria-disabled="true">Visit Website <i>↗</i></span>`;
}

function renderCompanies() {
  const featured = COMPANIES.find(c => c.featured) || COMPANIES[0];
  const rest = COMPANIES.filter(c => c !== featured);
  const fi = COMPANIES.indexOf(featured);
  let html = `
    <article class="show-hero reveal-fade">
      <div class="show-hero-img"><img src="${featured.image}" alt="${featured.name}" loading="lazy" class="reveal-img" /></div>
      <div class="show-hero-body reveal" data-delay="120">
        <span class="co-index">${String(fi + 1).padStart(2, "0")}</span>
        <div>${mark(featured)}<h3>${featured.name}</h3><span class="co-cat">${featured.category}</span></div>
        <p>${featured.desc}</p>
        <div>${visitCTA(featured)}</div>
      </div>
    </article>`;
  html += rest.map(c => {
    const i = COMPANIES.indexOf(c);
    const pos = rest.indexOf(c);
    const flip = pos % 2 === 1 ? " flip" : "";
    const delay = Math.min(pos * 60, 180);
    const media = c.image
      ? `<div class="show-media reveal-img"><img src="${c.image}" alt="${c.name}" loading="lazy" /></div>`
      : `<span class="ghost${flip ? " left" : ""}" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>`;
    return `
    <article class="show${flip} reveal-fade">
      ${media}
      <div class="show-body reveal" data-delay="${delay}">
        <span class="co-index">${String(i + 1).padStart(2, "0")}</span>
        ${mark(c)}
        <h3>${c.name}</h3>
        <span class="co-cat">${c.category}</span>
        <p>${c.desc}</p>
        ${visitCTA(c)}
      </div>
    </article>`;
  }).join("");
  list.innerHTML = `<div class="showcase">${html}</div>`;
  observeReveals();
}

/* Selected Ventures — diambil dari config yang sama, bukan hardcode ganda. */
function renderVentures() {
  const picks = ["HIKUNA HOSPITAL", "HIKUNA DIGITAL", "HIKUNA CREATIVE", "HIKUNA LAB"]
    .map(n => COMPANIES.find(c => c.name === n)).filter(Boolean);
  const box = document.getElementById("ventureList");
  if (!box) return;
  box.innerHTML = picks.map((c, k) => {
    const link = companyLink(c, c.name === "HIKUNA LAB" ? "#lab" : "#companies");
    const ext = link.external ? ' target="_blank" rel="noopener"' : "";
    const arrow = link.external ? "↗" : "→";
    return `
    <a class="v-row reveal" data-delay="${k * 60}" href="${link.href}"${ext} aria-label="${c.name}">
      <span class="v-num">${String(k + 1).padStart(2, "0")}</span>
      <div><h3>${c.name.charAt(0) + c.name.slice(1).toLowerCase()}</h3><span class="v-cat">${c.category}</span></div>
      <span class="v-arrow">${arrow}</span>
    </a>`;
  }).join("");
}

renderCompanies();
renderVentures();

/* Loader — hilang saat load, maksimal 1.5 detik */
function hideLoader() {
  document.getElementById("loader").classList.add("hide");
}
window.addEventListener("load", () => setTimeout(hideLoader, 400));
setTimeout(hideLoader, 1500);

/* Navbar */
const nav = document.getElementById("navbar");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 24), { passive: true });

/* Mobile menu */
const burger = document.getElementById("hamburger");
const menu = document.getElementById("mobileMenu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  menu.setAttribute("aria-hidden", !open);
  document.body.style.overflow = open ? "hidden" : "";
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open"); document.body.style.overflow = "";
}));

/* Reveal on scroll */
function observeReveals() {
  observer = observer || new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal:not(.visible),.reveal-fade:not(.visible),.reveal-img:not(.visible)").forEach(el => {
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
    observer.observe(el);
  });
}
observeReveals();

/* Active nav link */
const sections = ["home", "about", "companies", "ventures", "contact"];
const links = document.querySelectorAll(".nav-links a");
addEventListener("scroll", () => {
  let cur = "home";
  sections.forEach(id => {
    const s = document.getElementById(id);
    if (s && scrollY >= s.offsetTop - 200) cur = id;
  });
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + cur));
}, { passive: true });

/* Counters — HTML sudah berisi nilai final yang benar.
   Animasi hanya pemanis dan SELALU berakhir tepat di target. */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const pad = parseInt(el.dataset.pad || "0", 10);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = String(target).padStart(pad, "0");
    return;
  }
  const dur = 1100, t0 = performance.now();
  function fmt(n) { return String(n).padStart(pad, "0"); }
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = fmt(target); /* kunci nilai akhir */
  }
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll(".count");
if ("IntersectionObserver" in window) {
  const cObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    animateCount(e.target);
    cObs.unobserve(e.target);
  }), { threshold: 0.3 });
  counters.forEach(c => cObs.observe(c));
}
/* Tanpa IntersectionObserver: biarkan nilai final di HTML apa adanya. */
