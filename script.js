const toggleWord = document.getElementById('toggle-word');
const toggleBtn = document.getElementById('toggle-btn');

let current = 'Developer';
const roles = ['Developer', 'Designer'];
let idx = 0;

function glowToggle() {
  toggleWord.classList.add('glow');
  setTimeout(() => toggleWord.classList.remove('glow'), 1200);
}

function updateRole() {
  idx = (idx + 1) % roles.length;
  current = roles[idx];
  toggleWord.textContent = current;
  glowToggle();
  toggleBtn.textContent = current === 'Developer' ? 'Switch to Designer' : 'Designer — Coming Soon';
}

toggleBtn.addEventListener('click', () => {
  if (current === 'Designer') return; // locked
  updateRole();
});

// Auto toggle every 3s for animation
setInterval(() => {
  updateRole();
}, 4000);
