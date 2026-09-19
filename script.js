/* HIKUNA GROUP — Companies Config
   Tambah perusahaan baru cukup tambah object di array ini.
   Logo: isi `logo: "assets/nama-logo.png"`. Jika kosong, tampil monogram otomatis. */
const COMPANIES = [
  { name: "HIKUNA HOSPITAL", category: "Healthcare", mark: "H+", logo: "",
    desc: "Layanan kesehatan modern dengan standar profesional dan pengalaman pasien yang premium." },
  { name: "GULE BAROKAH", category: "Business", mark: "GB", logo: "",
    desc: "Unit bisnis yang berkembang dalam ekosistem HIKUNA GROUP." },
  { name: "AMANAH JAYA", category: "Business", mark: "AJ", logo: "",
    desc: "Unit bisnis yang menjadi bagian dari pertumbuhan grup lintas industri." },
  { name: "HIKUNA DIGITAL", category: "Digital Technology", mark: "HD", logo: "",
    desc: "Digital technology & solutions — membangun produk, platform, dan sistem digital." },
  { name: "HIKUNA CREATIVE", category: "Creative & Branding", mark: "HC", logo: "",
    desc: "Creative & branding — strategi brand, visual identity, dan creative direction." },
  { name: "HIKUNA LAB", category: "Innovation & Technology", mark: "LAB", logo: "",
    desc: "Innovation hub — eksplorasi teknologi baru, eksperimen digital, dan peluang masa depan." },
];

const grid = document.getElementById("companyGrid");
function renderCompanies() {
  grid.innerHTML = COMPANIES.map((c, i) => `
    <article class="co-card reveal" style="transition-delay:${(i % 3) * 80}ms">
      <div class="co-top">
        ${c.logo
          ? `<img src="${c.logo}" alt="${c.name} logo" class="co-mark" style="object-fit:contain;background:#fff;padding:4px" onerror="this.outerHTML='<div class=\\'co-mark\\'>${c.mark}</div>'" />`
          : `<div class="co-mark">${c.mark}</div>`}
        <span class="co-cat">${c.category}</span>
      </div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      <a class="co-link" href="#contact">View Company <i>→</i></a>
      <span class="co-index">0${i + 1}</span>
    </article>`).join("");
  observeReveals();
  attachCardGlow();
}
renderCompanies();

/* Loader */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 700);
});
setTimeout(() => document.getElementById("loader").classList.add("hide"), 3000);

/* Navbar scroll */
const nav = document.getElementById("navbar");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });

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
let observer;
function observeReveals() {
  observer = observer || new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
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

/* Count up stats */
const counters = document.querySelectorAll(".count");
const cObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, target = +el.dataset.target; let n = 0;
  const t = setInterval(() => {
    n++; el.textContent = String(n).padStart(2, "0");
    if (n >= target) clearInterval(t);
  }, 120);
  cObs.unobserve(el);
}), { threshold: 0.5 });
counters.forEach(c => cObs.observe(c));

/* Card spotlight follows mouse */
function attachCardGlow() {
  document.querySelectorAll(".co-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
}

/* Subtle magnetic CTA */
if (matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.08;
      const y = (e.clientY - r.top - r.height / 2) * 0.15;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener("mouseleave", () => btn.style.transform = "");
  });
  /* Hero parallax orbs */
  const orbs = document.querySelectorAll(".orb");
  addEventListener("mousemove", e => {
    const x = (e.clientX / innerWidth - 0.5), y = (e.clientY / innerHeight - 0.5);
    orbs.forEach((o, i) => o.style.translate = `${x * (20 + i * 20)}px ${y * (20 + i * 20)}px`);
  }, { passive: true });
}
