(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const printBtn = document.getElementById('printBtn');
  const about = document.getElementById('about');
  const printAbout = document.getElementById('aboutPrint');
  const DEFAULT_ABOUT = "Olá — eu sou Gilvanisson Francisco. Estudante com foco em Front End e Back End. Gosto de construir interfaces limpas, resolver problemas e aprender novas tecnologias.";

  // 🌗 Tema
  const savedTheme = localStorage.getItem('theme-preference');
  function applyTheme(mode){ 
    mode === 'light' ? root.classList.add('light') : root.classList.remove('light'); 
  }
  if(savedTheme) applyTheme(savedTheme);
  else applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  function toggleTheme(){
    const isLight = root.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
    localStorage.setItem('theme-preference', root.classList.contains('light') ? 'light' : 'dark');
  }
  themeToggle.addEventListener('click', toggleTheme);
  window.addEventListener('keydown', e=>{
    if(e.key.toLowerCase() === 't') toggleTheme();
    if(e.key.toLowerCase() === 'p') window.print();
  });

  // 📝 Sobre mim
  const ABOUT_KEY = 'resume.about';
  const savedAbout = localStorage.getItem(ABOUT_KEY);
  about.innerHTML = savedAbout || DEFAULT_ABOUT;
  printAbout.textContent = about.textContent.trim();

  let saveTimer;
  about.addEventListener('input', ()=>{
    clearTimeout(saveTimer);
    saveTimer = setTimeout(()=>{
      localStorage.setItem(ABOUT_KEY, about.innerHTML);
      about.style.outline='2px dashed rgba(124,92,255,0.08)';
      setTimeout(()=>about.style.outline='none',800);
      printAbout.textContent = about.textContent.trim();
    },600);
  });

  // 🖨️ Imprimir
  printBtn.addEventListener('click', ()=>{
    printAbout.textContent = about.textContent.trim();
    window.print();
  });

  // ✨ Animação de entrada
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r=>obs.observe(r));
})();
