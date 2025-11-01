/* UNIDA JS: Auto glitch toggle, clickable frames (data-url), smooth scroll, mobile nav,
   minor SVG redraw on resize. */

(function () {
  // --- ROLE TOGGLE (auto cycle + glitch + Developer/Designer (Coming Soon)) ---
  const roleEl = document.getElementById('role');
  const roleBox = document.querySelector('.role-box');
  if (roleEl && roleBox) {
    const roles = ['Developer', 'Designer (Coming Soon)'];
    let idx = 0;

    function setRole(text) {
      roleEl.textContent = text;
      roleEl.setAttribute('data-text', text);
    }
    function glitchOnce() {
      roleEl.classList.add('glitch');
      // trigger spark via sibling selector (CSS handles animation)
      setTimeout(() => roleEl.classList.remove('glitch'), 1200);
    }

    // initial
    setRole(roles[0]);

    // auto-cycle every 3s: show Designer (Coming Soon) briefly then revert
    setInterval(() => {
      idx = (idx + 1) % roles.length;
      setRole(roles[idx]);
      glitchOnce();
      if (roles[idx].includes('Designer')) {
        // show for 900ms then revert to Developer
        setTimeout(() => {
          setRole('Developer');
          glitchOnce();
          idx = 0;
        }, 900);
      }
    }, 3000);

    // click preview (also shows alert)
    roleBox.addEventListener('click', () => {
      setRole('Designer (Coming Soon)');
      glitchOnce();
      setTimeout(() => {
        setRole('Developer');
        glitchOnce();
        alert('Designer services are coming soon. Want early access? Contact via WhatsApp or Email.');
      }, 900);
    });

    // keyboard accessibility: space triggers preview
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        roleBox.click();
      }
    });
  }

  // --- CLICKABLE FRAMES (open data-url) ---
  function makeFrames(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('click', () => {
        const url = el.getAttribute('data-url') || '#';
        if (!url || url === '#') {
          alert('Demo URL not set. Replace data-url with the demo link in index.html.');
          return;
        }
        window.open(url, '_blank', 'noopener');
      });
      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          el.click();
        }
      });
    });
  }
  makeFrames('.service-frame');
  makeFrames('.project-frame');

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', () => nav.classList.toggle('open'));

  // --- ensure SVG renders well after mobile rotate/resizes ---
  window.addEventListener('resize', () => {
    const svg = document.getElementById('global-circuit');
    if (svg) {
      svg.style.display = 'none';
      requestAnimationFrame(() => svg.style.display = 'block');
    }
  });
})();
