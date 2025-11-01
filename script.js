/* UNIDA JS: SVG circuit is animated via CSS dash offset.
   This script handles:
   - toggle glitch visual (Designer preview + revert)
   - smooth scroll anchors
   - mobile nav toggle
*/

(function () {
  // ROLE TOGGLE (glitch preview + revert)
  const roleEl = document.getElementById('role');
  if (!roleEl) return;
  roleEl.setAttribute('data-text', 'Developer');

  function setRole(text) {
    roleEl.textContent = text;
    roleEl.setAttribute('data-text', text);
  }

  function glitchOnce() {
    roleEl.classList.add('glitch');
    setTimeout(() => roleEl.classList.remove('glitch'), 1200);
  }

  // keyboard click / accessibility: Space toggles preview
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      glitchOnce();
      // show Designer preview then revert
      setRole('Designer');
      setTimeout(() => {
        setRole('Developer');
        glitchOnce();
      }, 900);
    }
  });

  // click/tap on role box to preview Designer then revert with alert
  const roleBox = document.querySelector('.role-box');
  roleBox && roleBox.addEventListener('click', () => {
    glitchOnce();
    setRole('Designer');
    setTimeout(() => {
      setRole('Developer');
      glitchOnce();
      alert('Designer services are coming soon. Want early access? Contact us via WhatsApp or Email.');
    }, 900);
  });

  // SMOOTH SCROLL for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // mobile nav toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // small visual sanity: ensure SVG scales correctly on mobile (redraw by toggling class)
  window.addEventListener('resize', () => {
    const svg = document.getElementById('circuit-svg');
    if (svg) {
      svg.style.display = 'none';
      requestAnimationFrame(() => svg.style.display = 'block');
    }
  });
})();
