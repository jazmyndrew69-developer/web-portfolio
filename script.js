// role toggle auto + button + glow effect
const roleSpan = document.getElementById('role');
const toggleBtn = document.getElementById('toggle-btn');

let roles = ['Developer', 'Designer'];
let idx = 0;

function glowOnce() {
  roleSpan.classList.add('glow');
  setTimeout(()=> roleSpan.classList.remove('glow'), 1100);
}

// auto toggle every 2.5s
setInterval(()=>{
  idx = (idx + 1) % roles.length;
  roleSpan.textContent = roles[idx];
  glowOnce();
}, 2500);

// button toggles (Designer is locked – show coming soon overlay)
toggleBtn && toggleBtn.addEventListener('click', (e) => {
  const current = roleSpan.textContent.trim();
  if (current === 'Developer') {
    // show designer locked message
    alert('Designer section is coming soon. Want early access? Contact us.');
    // keep role as Developer but flash glow
    glowOnce();
  } else {
    // fallback
    roleSpan.textContent = 'Developer';
    glowOnce();
  }
});

// smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// mobile menu toggle (simple)
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.main-nav');
mobileToggle && mobileToggle.addEventListener('click', ()=>{
  nav.classList.toggle('open');
});
