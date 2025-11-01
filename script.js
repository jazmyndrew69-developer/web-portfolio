// === ROLE TOGGLE: GLITCH + AUTO SWITCH ===
const role = document.getElementById("toggle-role");
const roles = ["Developer", "Designer"];
let index = 0;

function updateRole() {
  index = (index + 1) % roles.length;

  role.classList.remove("glitch-active"); // reset animation
  void role.offsetWidth; // force reflow so animation restarts

  role.textContent = roles[index];
  role.classList.add("glitch-active"); // trigger animation
}

setInterval(updateRole, 1600);
updateRole();
wrapper.addEventListener("mouseenter", () => {
  glitchSound.currentTime = 0;
  glitchSound.play();
});
