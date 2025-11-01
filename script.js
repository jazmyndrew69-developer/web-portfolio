/* UNIDA script:
 - role glitch preview + revert (electric effect)
 - clickable frames open data-url in same tab (or new tab if target)
 - smooth scroll
 - mobile nav
*/

(function(){
  // ROLE TOGGLE (glitch preview)
  const roleEl = document.getElementById('role');
  const roleBox = document.querySelector('.role-box');
  if(roleEl){
    function setRole(text){ roleEl.textContent = text; roleEl.setAttribute('data-text', text); }
    function glitch(){ roleEl.classList.add('glitch'); setTimeout(()=> roleEl.classList.remove('glitch'), 1200); }

    setRole('Developer');

    // click behaviour: preview Designer then revert and show small modal (alert)
    roleBox && roleBox.addEventListener('click', ()=>{
      glitch();
      setRole('Designer');
      setTimeout(()=>{
        setRole('Developer');
        glitch();
        alert('Designer services are coming soon. Want early access? Contact via WhatsApp or Email.');
      }, 900);
    });

    // accessibility: spacebar triggers preview
    document.addEventListener('keydown', e=>{
      if(e.code === 'Space'){
        e.preventDefault();
        glitch();
        setRole('Designer');
        setTimeout(()=>{ setRole('Developer'); glitch(); }, 900);
      }
    });
  }

  // CLICKABLE FRAMES: open data-url attribute
  function makeFramesClickable(selector){
    document.querySelectorAll(selector).forEach(el=>{
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e)=>{
        const url = el.getAttribute('data-url') || el.dataset.url;
        if(!url || url === '#'){ alert('Demo URL not set. Replace data-url attribute with your demo link.'); return; }
        // open in new tab if external else same tab (use target=_blank imitation)
        window.open(url, '_blank', 'noopener');
      });
      // keyboard support
      el.addEventListener('keydown', (ev)=>{
        if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); el.click(); }
      });
    });
  }

  makeFramesClickable('.service-frame');
  makeFramesClickable('.project-frame');

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const t = document.querySelector(this.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // MOBILE NAV
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', ()=> nav.classList.toggle('open'));

})();
