const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const content = document.getElementById("content");
const music = document.getElementById("music");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");

  music.volume = 0.4;
  music.play();

  setTimeout(() => {
    intro.style.display = "none";
    content.classList.add("show");
  }, 1400);
});
