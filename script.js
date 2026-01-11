const projects = [
  {
    id: "tetris",
    title: "Neon Tetris Deluxe",
    desc: "Modern neon Tetris with a clean UI panel, level progression, and visual flow diagrams.",
    cover: "images/Neon Tetris Deluxe.png.png",
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
    cover: "images/neon-tetris-deluxe.png"
    chips: ["Python", "Pygame", "AI", "Polish"],
    images: [
      "images/pong_court.png.png",
      "images/Pong version improvements.png",
      "images/Pong version comparrison.png"
    ]
  }
];

const grid = document.getElementById("projectGrid");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalChips = document.getElementById("modalChips");
const imgCounter = document.getElementById("imgCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

document.getElementById("year").textContent = new Date().getFullYear();

let activeProject = null;
let activeIndex = 0;

function chipHTML(text){
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = text;
  return span;
}

function renderProjects(){
  grid.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.className = "project-thumb";
    img.src = p.cover;
    img.alt = `${p.title} screenshot`;

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
    p.chips.forEach(c => chips.appendChild(chipHTML(c)));

    body.appendChild(h);
    body.appendChild(d);
    body.appendChild(chips);

    card.appendChild(img);
    card.appendChild(body);

    card.addEventListener("click", () => openModal(p));
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openModal(p);
      }
    });

    grid.appendChild(card);
  });
}

function openModal(project){
  activeProject = project;
  activeIndex = 0;

  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;

  modalChips.innerHTML = "";
  project.chips.forEach(c => modalChips.appendChild(chipHTML(c)));

  updateModalImage();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateModalImage(){
  const src = activeProject.images[activeIndex];
  modalImg.src = src;
  imgCounter.textContent = `${activeIndex + 1} / ${activeProject.images.length}`;
}

function nextImage(){
  if(!activeProject) return;
  activeIndex = (activeIndex + 1) % activeProject.images.length;
  updateModalImage();
}

function prevImage(){
  if(!activeProject) return;
  activeIndex = (activeIndex - 1 + activeProject.images.length) % activeProject.images.length;
  updateModalImage();
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

modal.addEventListener("click", (e) => {
  if(e.target && e.target.dataset && e.target.dataset.close === "true"){
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if(!modal.classList.contains("show")) return;

  if(e.key === "Escape") closeModal();
  if(e.key === "ArrowRight") nextImage();
  if(e.key === "ArrowLeft") prevImage();
});

renderProjects();

