// Toggle Developer / Designer text
const roles = ["Developer", "Designer"];
let index = 0;

setInterval(() => {
  const el = document.getElementById("toggle-role");
  index = (index + 1) % roles.length;
  el.textContent = roles[index];
}, 1800);

// Open project demo URL
function openProject(url){
  window.open(url, "_blank");
}
