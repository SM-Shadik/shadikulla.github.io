/* ============================================================
   Md. Shadikulla Sarker — Personal Website
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  const root = document.documentElement;

  /* ---------- THEME (Dark / Light) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateThemeIcon();
  });
  function updateThemeIcon(){
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }

  /* ---------- LANGUAGE SWITCH (বাংলা / English) ---------- */
  const langToggle = document.getElementById('langToggle');
  const translatable = document.querySelectorAll('[data-en][data-bn]');
  const savedLang = localStorage.getItem('site-lang') || 'bn';
  applyLang(savedLang);

  langToggle.addEventListener('click', () => {
    const current = root.getAttribute('lang') === 'bn' ? 'en' : 'bn';
    applyLang(current);
    localStorage.setItem('site-lang', current);
  });

  function applyLang(lang){
    root.setAttribute('lang', lang);
    translatable.forEach(el => {
      el.textContent = lang === 'bn' ? el.dataset.bn : el.dataset.en;
    });
  }

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  }));

  /* ---------- HEADER SCROLL STATE + ACTIVE LINK ---------- */
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) currentId = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }, { passive:true });

  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ---------- FLOATING LEAF ANIMATION ---------- */
  const leafLayer = document.getElementById('leafLayer');
  const leafEmojis = ['🍃','🌿','🍂'];
  function spawnLeaf(){
    const leaf = document.createElement('span');
    leaf.className = 'leaf-particle';
    leaf.textContent = leafEmojis[Math.floor(Math.random()*leafEmojis.length)];
    leaf.style.left = Math.random()*100 + 'vw';
    const duration = 10 + Math.random()*8;
    leaf.style.animationDuration = duration + 's';
    leaf.style.fontSize = (14 + Math.random()*14) + 'px';
    leafLayer.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration*1000);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(spawnLeaf, 2500);
    spawnLeaf();
  }

  /* ---------- WATER RIPPLE EFFECT ON BUTTONS ---------- */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const span = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      span.className = 'ripple-span';
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size/2) + 'px';
      span.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(span);
      setTimeout(() => span.remove(), 650);
    });
  });

  /* ---------- SCROLL-TRIGGERED ANIMATIONS (progress bars, timeline, counters) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('skill-bar')) {
        const fill = el.querySelector('.skill-fill');
        fill.style.width = el.dataset.percent + '%';
      }
      if (el.classList.contains('timeline-item')) {
        el.classList.add('visible');
      }
      if (el.classList.contains('achievement-card')) {
        animateCount(el.querySelector('.achievement-num'));
      }
      io.unobserve(el);
    });
  }, { threshold:0.4 });

  document.querySelectorAll('.skill-bar, .timeline-item, .achievement-card')
    .forEach(el => io.observe(el));

  function animateCount(el){
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target/40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 35);
  }

  /* ---------- VISITOR COUNTER ----------
     Uses the free CountAPI service for a real global counter.
     Falls back to a local (per-browser) counter if the network call fails.
     Swap the namespace/key below to something unique to your site. */
  const visitorCountEl = document.getElementById('visitorCount');
  (async () => {
    try {
      const res = await fetch('https://api.countapi.xyz/hit/shadikulla-sarker-portfolio/visits');
      const data = await res.json();
      visitorCountEl.textContent = data.value;
    } catch (err) {
      const key = 'local-visit-count';
      const count = (parseInt(localStorage.getItem(key) || '0', 10)) + 1;
      localStorage.setItem(key, count);
      visitorCountEl.textContent = count + ' (local)';
    }
  })();

  /* ---------- SEARCH ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchableSections = document.querySelectorAll('main section[id]');

  searchToggle.addEventListener('click', () => {
    searchInput.classList.toggle('open');
    if (searchInput.classList.contains('open')) searchInput.focus();
    else { searchResults.hidden = true; }
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.hidden = true; return; }

    const matches = [];
    searchableSections.forEach(sec => {
      const text = sec.innerText.toLowerCase();
      if (text.includes(q)) {
        const heading = sec.querySelector('h2, h1');
        matches.push({ id: sec.id, label: heading ? heading.textContent : sec.id });
      }
    });

    searchResults.innerHTML = '';
    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">কোনো ফলাফল পাওয়া যায়নি / No results found</div>';
    } else {
      matches.forEach(m => {
        const a = document.createElement('a');
        a.href = '#' + m.id;
        a.textContent = m.label;
        a.addEventListener('click', () => { searchResults.hidden = true; searchInput.value=''; });
        searchResults.appendChild(a);
      });
    }
    searchResults.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchToggle) {
      searchResults.hidden = true;
    }
  });

  /* ---------- CONTACT FORM (mailto fallback) ---------- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname').value;
    const email = document.getElementById('femail').value;
    const message = document.getElementById('fmsg').value;
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = `mailto:shadikulla2459@gmail.com?subject=${subject}&body=${body}`;
  });

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
