/* HIKUNA GROUP — Companies Config
   Tambah perusahaan baru: cukup tambah object di array ini.
   Field opsional: logo (path file), featured + image (tampil besar). */
const COMPANIES = [
  { name: "HIKUNA HOSPITAL", category: "Healthcare", logo: "", featured: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    desc: "Modern healthcare services with professional standards and a premium patient experience." },
  { name: "GULE BAROKAH", category: "Business", logo: "",
    desc: "A growing business unit within the HIKUNA GROUP ecosystem." },
  { name: "AMANAH JAYA", category: "Business", logo: "",
    desc: "A business unit contributing to the group's growth across industries." },
  { name: "HIKUNA DIGITAL", category: "Digital Technology", logo: "",
    desc: "Digital technology and solutions — products, platforms, and systems." },
  { name: "HIKUNA CREATIVE", category: "Creative & Branding", logo: "",
    desc: "Creative and branding — brand strategy, visual identity, and direction." },
  { name: "HIKUNA LAB", category: "Innovation & Technology", logo: "",
    desc: "Innovation hub — new technologies, digital experiments, future opportunities." },
];

const list = document.getElementById("companyList");
let observer;

function mark(c) {
  return c.logo
    ? `<img src="${c.logo}" alt="${c.name} logo" class="co-logo" />`
    : "";
}

function renderCompanies() {
  const featured = COMPANIES.find(c => c.featured) || COMPANIES[0];
  const rest = COMPANIES.filter(c => c !== featured);
  const fi = COMPANIES.indexOf(featured);
  let html = `
    <article class="co-featured reveal-fade">
      <img src="${featured.image}" alt="${featured.name}" loading="lazy" class="reveal-img" />
      <div class="co-featured-body reveal" data-delay="120">
        <span class="co-index">${String(fi + 1).padStart(2, "0")} — Featured</span>
        ${mark(featured)}
        <h3>${featured.name}</h3>
        <span class="co-cat">${featured.category}</span>
        <p>${featured.desc}</p>
        <a class="co-link" href="#contact">View Company <i>→</i></a>
      </div>
    </article>`;
  html += rest.map(c => {
    const i = COMPANIES.indexOf(c);
    const delay = Math.min(rest.indexOf(c) * 60, 180);
    return `
    <a href="#contact" class="co-row reveal" data-delay="${delay}">
      <span class="co-index">${String(i + 1).padStart(2, "0")}</span>
      <div>${mark(c)}<h3>${c.name}</h3><span class="co-cat">${c.category}</span></div>
      <p>${c.desc}</p>
      <span class="co-arrow">→</span>
    </a>`;
  }).join("");
  list.innerHTML = html;
  observeReveals();
}
renderCompanies();

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
