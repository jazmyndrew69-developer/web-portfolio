<script>
// Role toggle auto + button
const roleSpan = document.getElementById('role');
let roles = ['Developer', 'Designer'];
let idx = 0;

function toggleGlow() {
  roleSpan.classList.add('glow');
  setTimeout(() => roleSpan.classList.remove('glow'), 800);
}

setInterval(() => {
  idx = (idx + 1) % roles.length;
  roleSpan.textContent = roles[idx];
  toggleGlow();
}, 2500);

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
</script>




