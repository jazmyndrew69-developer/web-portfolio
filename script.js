// UNIDA script: circuit canvas + morph glitch toggle + smooth scroll + mobile nav

/* ====== Canvas circuit background ====== */
(function setupCanvas(){
  const canvas = document.getElementById('circuit-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const lines = [];
  const colors = ['rgba(0,198,255,0.9)','rgba(178,92,255,0.9)'];

  // generate grid of nodes and moving connections
  function init(){
    lines.length = 0;
    const cols = Math.floor(w / 120);
    const rows = Math.floor(h / 120);
    for(let x=0;x<=cols;x++){
      for(let y=0;y<=rows;y++){
        const px = (x + Math.random()*0.6) * (w / cols);
        const py = (y + Math.random()*0.6) * (h / rows);
        lines.push({
          x:px, y:py,
          vx:(Math.random()-0.5)*0.15,
          vy:(Math.random()-0.5)*0.15,
          r: 1+Math.random()*1.8
        });
      }
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    // faint background glow
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(0,198,255,0.02)');
    g.addColorStop(1,'rgba(178,92,255,0.02)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // draw moving lines between nearby nodes
    for(let i=0;i<lines.length;i++){
      const a = lines[i];
      a.x += a.vx; a.y += a.vy;
      if(a.x < 0 || a.x > w) a.vx *= -1;
      if(a.y < 0 || a.y > h) a.vy *= -1;

      // draw small node
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
      ctx.fill();

      // connect with neighbors (cheap N^2 but small arrays)
      for(let j=i+1;j<lines.length;j++){
        const b = lines[j];
        const dx = a.x - b.x; const dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 110){
          const alpha = 0.09 * (1 - d/110);
          // line gradient
          const grad = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
          grad.addColorStop(0, colors[(i+j)%colors.length]);
          grad.addColorStop(1, colors[(j+i+1)%colors.length]);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(draw);
  }

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  }

  addEventListener('resize', resize);
  init();
  draw();
})();

/* ====== morphing glitch toggle ====== */
(function toggleRole(){
  const roleEl = document.getElementById('role');
  const roles = ['Developer','Designer'];
  let idx = 0;

  function setRole(text){
    roleEl.textContent = text;
    roleEl.setAttribute('data-text', text);
  }

  function glitchOnce(){
    roleEl.classList.add('glitch');
    setTimeout(()=> roleEl.classList.remove('glitch'), 1200);
  }

  // initial
  setRole(roles[0]);

  // subtle auto-glitch every 5 seconds
  setInterval(()=>{
    idx = (idx + 1) % roles.length;
    setRole(roles[idx]);
    glitchOnce();
    // revert to Developer after a moment if Designer (we avoid 'selling' designer)
    if(roles[idx] === 'Designer'){
      setTimeout(()=>{
        setRole('Developer');
        glitchOnce();
        idx = 0;
      }, 800);
    }
  }, 5000);

  // keyboard accessible toggle: Space toggles visual glitch preview
  document.addEventListener('keydown', e=>{
    if(e.code === 'Space'){
      e.preventDefault();
      glitchOnce();
    }
  });
})();

/* ====== smooth scroll & mobile nav ====== */
(function ui(){
  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const t = document.querySelector(this.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // mobile nav (basic)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
})();
