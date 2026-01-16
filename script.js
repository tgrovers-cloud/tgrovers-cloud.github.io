// Portfolio projects data (paths MUST match /images filenames exactly)
const projects = [
  {
    id: "tetris",
    title: "Neon Tetris Deluxe",
    desc: "Modern neon Tetris with a clean UI panel, level progression, and visual flow diagrams.",
    cover: "images/neon-tetris-deluxe.png",
    chips: ["Python", "Pygame", "UI/UX", "Progression"],
    images: [
      "images/neon-tetris-deluxe.png",
      "images/tetris-flow-simple-to-neon.png",
      "images/tetris-level-progression.png"
    ]
  },
  {
    id: "pong",
    title: "Pong AI + Court Polish",
    desc: "Single-player Pong with AI improvements, gameplay polish, and visuals documenting changes.",
    cover: "images/pong-court.png",
    chips: ["Python", "Pygame", "AI", "Polish"],
    images: [
      "images/pong-court.png",
      "images/pong-version-improvements.png",
      "images/pong-version-comparison.png"
    ]
  },
  {
    id: "ticket",
    title: "Ticket Booking App",
    desc: "Desktop ticket booking app with SQLite database, search, CSV export, ticket preview, and PDF receipt generation.",
    cover: "images/ticket-app.png",
    chips: ["Python", "Tkinter", "SQLite", "Export", "PDF"],
    images: [
      "images/ticket-app.png",
      "images/ticket-app-ux-sql.png",
      "images/ticket-app-update.png",
      "images/ticket-app-latest-flow.png",
      "images/ticket-app-changes.png"
    ]
  },
  {
    id: "messenger",
    title: "Friendly messenger-app",
    desc: "A friendly messaging app with a clean interface, smooth conversation flow, and polished UI screens.",
    cover: "images/friendly-meesenger-app.png",
    chips: ["Python", "Tkinter", "UI/UX", "Messaging"],
    images: [
      "images/friendly-mesenger-app.png",
      "images/friendly-messenger-01.png",
      "images/friendly-messenger-02.png",
      "images/friendly-messenger-03.png",
      "images/friendly-messenger-04.png",
      "images/friendly-messenger-05.png",
      "images/friendly-messenger-06.png",
      "images/friendly-messenger-07.png",
      "images/friendly-messenger-08.png",
      "images/friendly-messenger-09.png",
      "images/friendly-messenger-10.png"
    ]
  }
];

// --- DOM ---
const grid = document.getElementById("projectGrid");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalChips = document.getElementById("modalChips");
const imgCounter = document.getElementById("imgCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Footer year (safe even if element is missing)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- State ---
let activeProject = null;
let activeIndex = 0;

// --- Helpers ---
function chipHTML(text) {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = text;
  return span;
}

function safeSetImage(imgEl, src, alt) {
  imgEl.src = src;
  imgEl.alt = alt;

  imgEl.onerror = () => {
    imgEl.removeAttribute("src"); // avoid broken-image icon
    imgEl.alt = `Missing image: ${src}`;
    imgEl.style.objectFit = "contain";
  };
}

// --- Render grid ---
function renderProjects() {
  if (!grid) return;

  grid.innerHTML = "";

  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.className = "project-thumb";
    img.loading = "lazy";
    safeSetImage(img, p.cover, `${p.title} screenshot`);

    const body = document.createElement("div");
    body.className = "project-body";

    const h = document.createElement("h4");
    h.className = "project-title";
    h.textContent = p.title;

    const d = document.createElement("p");
    d.className = "project-desc";
    d.textContent = p.desc;

    const chips = document.createElement("div");
    chips.className = "chips";
    p.chips.forEach((c) => chips.appendChild(chipHTML(c)));

    body.appendChild(h);
    body.appendChild(d);
    body.appendChild(chips);

    card.appendChild(img);
    card.appendChild(body);

    card.addEventListener("click", () => openModal(p));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(p);
      }
    });

    grid.appendChild(card);
  });
}

// --- Modal ---
function updateModalImage() {
  if (!activeProject || !modalImg) return;

  const src = activeProject.images[activeIndex];
  safeSetImage(
    modalImg,
    src,
    `${activeProject.title} screenshot ${activeIndex + 1}`
  );

  if (imgCounter) {
    imgCounter.textContent = `${activeIndex + 1} / ${activeProject.images.length}`;
  }
}

function openModal(project) {
  activeProject = project;
  activeIndex = 0;

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDesc) modalDesc.textContent = project.desc;

  if (modalChips) {
    modalChips.innerHTML = "";
    project.chips.forEach((c) => modalChips.appendChild(chipHTML(c)));
  }

  updateModalImage();

  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
}

function nextImage() {
  if (!activeProject) return;
  activeIndex = (activeIndex + 1) % activeProject.images.length;
  updateModalImage();
}

function prevImage() {
  if (!activeProject) return;
  activeIndex = (activeIndex - 1 + activeProject.images.length) % activeProject.images.length;
  updateModalImage();
}

// --- Events ---
if (prevBtn) prevBtn.addEventListener("click", prevImage);
if (nextBtn) nextBtn.addEventListener("click", nextImage);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close === "true") {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("show")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open");
    const p = projects.find((x) => x.id === id);
    if (p) openModal(p);
  });
});

// Boot
renderProjects();



