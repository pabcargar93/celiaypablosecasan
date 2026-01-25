const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const content = document.getElementById("content");
const music = document.getElementById("music");

// CONTADOR
const targetDate = new Date("2026-10-03T13:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) return;

  const values = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };

  Object.keys(values).forEach((id) => {
    const el = document.getElementById(id);
    if (el.textContent !== String(values[id])) {
      el.classList.add("change");
      setTimeout(() => {
        el.textContent = values[id];
        el.classList.remove("change");
      }, 150);
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ANIMACIÓN SECCIONES
function initScrollAnimations() {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => observer.observe(section));
}

// CLICK SOBRE
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  music.volume = 0.4;
  music.play();

  intro.classList.add("fade-out");

  setTimeout(() => {
    intro.style.display = "none";
    content.classList.add("show");
    document.body.style.overflowY = "auto"; // activar scroll
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Llamamos al observer **una vez** tras un pequeño delay
    setTimeout(() => initScrollAnimations(), 50);
  }, 1500);
});
