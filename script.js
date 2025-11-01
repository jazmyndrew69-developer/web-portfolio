// === ROLE TOGGLE: GLITCH + AUTO SWITCH + COMING SOON + SOUND ON HOVER ===

// elements
const role = document.getElementById("toggle-role");
const wrapper = document.getElementById("toggle-wrapper");
const coming = document.getElementById("coming-soon");
const glitchSound = document.getElementById("glitch-sound");

const roles = ["Developer", "Designer"];
let index = 0;

function updateRole() {
  index = (index + 1) % roles.length;

  // restart glitch animation
  role.classList.remove("glitch-active");
  void role.offsetWidth; // force repaint
  role.textContent = roles[index];
  role.classList.add("glitch-active");

  // ✅ NEW: show/hide "coming soon"
  coming.style.opacity = (roles[index] === "Designer") ? "1" : "0";
}

// auto switch every 1.6s
setInterval(updateRole, 1600);
updateRole();

// ✅ sound only on user hover (NOT on auto toggle)
wrapper.addEventListener("mouseenter", () => {
  if (glitchSound) {
    glitchSound.currentTime = 0;
    glitchSound.play();
  }
});

