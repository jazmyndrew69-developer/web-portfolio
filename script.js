/* UNIDA site script
   - morphing glitch toggle (clean)
   - simple mobile toggle
   - smooth scroll
*/

// ELEMENTS
const roleEl = document.getElementById('role');
const roleToggle = document.getElementById('role-toggle');
const lockedNote = document.getElementById('locked-note');
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.main-nav');

// ensure roleEl holds the text for pseudo elements
function setRoleText(text){
  roleEl.textContent = text;
  // set data-text attribute used by CSS pseudo elements
  roleEl.setAttribute('data-text', text);
}

// initial role
setRoleText('Developer');
let idx = 0;
const roles = ['Developer','Designer'];

// clean glitch pulse
function triggerGlitch(){
  roleEl.classList.add('glitch');
  setTimeout(()=> roleEl.classList.remove('glitch'), 1200);
}

// update role (used by auto and button)
function updateRole(nextIdx){
  idx = typeof nextIdx === 'number' ? nextIdx % roles.length : (idx+1) % roles.length;
  const chosen = roles[idx];
  setRoleText(chosen);
  triggerGlitch();
  // if Designer selected, show locked note
  if(chosen === 'Designer'){
    lockedNote.style.opacity = '1';
    lockedNote.style.color = 'var(--muted)';
  } else {
    lockedNote.style.opacity = '0.95';
  }
  // update button text
  if(roleToggle) roleToggle.textContent = chosen === 'Developer' ? 'Switch to Designer' : 'Designer — Coming Soon';
}

// auto-cycle subtle (but don't annoy): every 5s
let autoInterval = setInterval(()=> updateRole(), 5000);

// button behaviour: designer is locked
if(roleToggle){
  roleToggle.addEventListener('click', (e)=>{
    const current = roleEl.textContent.trim();
    if(current === 'Developer'){
      // attempt to switch — show modal/alert that designer is coming soon
      updateRole(); // will switch to Designer visually
      // immediately revert back after small delay while showing lock message
      setTimeout(()=> {
        // revert to Developer and show clear "locked" message
        setRoleText('Developer');
        triggerGlitch();
        alert('Designer services are coming soon. Want early access? Contact us via WhatsApp or Email.');
      }, 900);
    } else {
      // if somehow on Designer, revert
      setRoleText('Developer');
      triggerGlitch();
    }
  });
}

// smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// mobile nav toggle
if(mobileToggle){
  mobileToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
  });
}
