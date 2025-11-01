/* UNIDA JS — strong pulse bg supported, smooth glitch toggle, clickable frames, smooth scroll, mobile nav, video optimizations */
(function () {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Mobile nav
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Role toggle — auto cycle with soft glitch, small (Coming soon)
  const roleEl = document.getElementById('role');
  const subEl  = document.getElementById('role-sub');
  const roleBox = document.querySelector('.role-box');
  if (roleEl && subEl) {
    const roleEl = document.getElementById('role');
const roleSub = document.getElementById('role-sub');

let roles = ["Developer", "Designer"];
let idx = 0;

function toggleRole() {
  idx = (idx + 1) % roles.length;

  roleEl.textContent = roles[idx];
  roleEl.dataset.text = roles[idx];

  if (roles[idx] === "Designer") {
    roleSub.style.display = "block";
  } else {
    roleSub.style.display = "none";
  }

  roleEl.classList.add("glitch");
  setTimeout(() => roleEl.classList.remove("glitch"), 500);
}

setInterval(toggleRole, 3500);


    // Click preview (optional)
    roleBox && roleBox.addEventListener('click', () => {
      setRole(DSG, true);
      glitch();
      setTimeout(() => { setRole(DEV, false); glitch(); }, 900);
    });

    // Space key preview
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') { e.preventDefault(); roleBox.click(); }
    });
  }

  // Clickable frames: open data-url (projects)
  document.querySelectorAll('.project-frame').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-url');
      if (!url || url === '#') { alert('Demo URL not set. Replace data-url in index.html'); return; }
      window.open(url, '_blank', 'noopener');
    });
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); el.click(); }
    });
  });

  // Video optimization: respect reduced-motion / save-data
  const v = document.getElementById('circuit-video');
  if (v) {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = conn && (conn.saveData || /2g|slow-2g/.test(conn.effectiveType || ''));

    if (prefersReduced || saveData) {
      v.pause();
      v.style.display = 'none';
      document.querySelector('.video-bg-wrap').style.background = "url('assets/circuit-poster.jpg') center/cover no-repeat";
    } else {
      v.playsInline = true; v.muted = true;
      window.addEventListener('load', () => v.play().catch(()=>{}));
    }

    // keep cover correct after resize/rotate
    window.addEventListener('resize', () => {
      v.style.display = 'none';
      requestAnimationFrame(() => v.style.display = 'block');
    });
  }
})();
