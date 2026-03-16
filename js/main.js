/* ============================================================
   HERO — SCROLL-DRIVEN CANVAS ANIMATION
   ============================================================ */
(function () {
  const FRAME_COUNT = 192;
  const FRAME_BASE  = 'images/hero/frames/frame_';
  const HOLD_MS     = 580;

  const loader    = document.getElementById('hero-loader');
  const loaderBar = document.getElementById('hero-loader-bar');
  const canvas    = document.getElementById('hero-canvas');
  const ctx       = canvas.getContext('2d');

  const frames = [];
  let loadedCount  = 0;
  let currentFrame = 0;
  let targetFrame  = 0;
  let framesReady  = false;

  /* --- snap-stop state (desktop only — mobile stays fluid) --- */
  const isMobile = 'ontouchstart' in window || window.innerWidth <= 768;
  const cards    = Array.from(document.querySelectorAll('.annotation-card'));
  const snapZones = cards.map(card => ({
    show:    parseFloat(card.dataset.show),
    hide:    parseFloat(card.dataset.hide),
    snapped: false
  }));
  let isSnapping = false;

  /* Block scroll via wheel/touch without creating a scroll container */
  const blockWheel = (e) => { e.preventDefault(); };
  const blockTouch = (e) => { e.preventDefault(); };

  function lockScroll() {
    window.addEventListener('wheel',     blockWheel, { passive: false });
    window.addEventListener('touchmove', blockTouch, { passive: false });
  }

  function unlockScroll() {
    window.removeEventListener('wheel',     blockWheel);
    window.removeEventListener('touchmove', blockTouch);
  }

  /* --- canvas sizing --- */
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    if (frames[Math.round(currentFrame)]) drawContainFit(frames[Math.round(currentFrame)]);
  }

  /* --- responsive draw: cover-fit, fills viewport edge to edge --- */
  function drawContainFit(img) {
    if (!img || !img.complete) return;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    ctx.clearRect(0, 0, cw, ch);
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const drawW = img.naturalWidth  * scale;
    const drawH = img.naturalHeight * scale;
    const offsetX = (cw - drawW) / 2;
    const offsetY = (ch - drawH) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  /* --- annotation card visibility + snap-stop (snap-stop desktop only) --- */
  const scrollHint = document.querySelector('.hero__scroll-hint');

  function updateCards(progress) {
    cards.forEach((card, i) => {
      const zone    = snapZones[i];
      const visible = progress >= zone.show && progress <= zone.hide;
      card.classList.toggle('visible', visible);

      /* Snap-stop only on desktop — mobile must stay fluid so all 192 frames are visible */
      if (!isMobile && visible && !zone.snapped && !isSnapping) {
        zone.snapped = true;
        isSnapping   = true;
        lockScroll();
        setTimeout(() => {
          unlockScroll();
          isSnapping = false;
        }, HOLD_MS);
      }
      if (!visible) zone.snapped = false;
    });

    if (scrollHint) scrollHint.classList.toggle('is-hidden', progress > 0.05);
  }

  /* --- scroll handler --- */
  function onScroll() {
    if (!framesReady) return;
    const section    = document.getElementById('hero');
    const rect       = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const progress   = Math.min(1, Math.max(0, -rect.top / scrollable));
    targetFrame      = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
    updateCards(progress);
  }

  /* --- lerp render loop ---
     High LERP (0.45) on mobile keeps currentFrame very close to targetFrame
     so the animation tracks scroll without visible frame-skipping.
     Tight snap threshold (< 1) eliminates any slow tail.              */
  const LERP = isMobile ? 0.45 : 0.08;

  function animate() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) < 1) {
      currentFrame = targetFrame;
    } else {
      currentFrame += diff * LERP;
    }
    const index = Math.round(currentFrame);
    if (frames[index]) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawContainFit(frames[index]);
    }
    requestAnimationFrame(animate);
  }

  /* --- all frames loaded --- */
  function onAllLoaded() {
    framesReady  = true;
    currentFrame = 0;
    drawContainFit(frames[0]);

    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    animate();

    /* Auto-scroll to glow-end frame immediately as loader fades */
    setTimeout(() => {
      const section    = document.getElementById('hero');
      const scrollable = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: (36 / 192) * scrollable, behavior: 'smooth' });
    }, 50);
  }

  /* --- preload all frames --- */
  function preloadFrames() {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const pad = String(i).padStart(4, '0');
      img.src = `${FRAME_BASE}${pad}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loaderBar) {
          loaderBar.style.width = ((loadedCount / FRAME_COUNT) * 100) + '%';
        }
        if (loadedCount === 1) {
          resizeCanvas();
          drawContainFit(frames[0]);
        }
        if (loadedCount === FRAME_COUNT) onAllLoaded();
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) onAllLoaded();
      };
      frames.push(img);
    }
  }

  /* --- init --- */
  let resizeTimer;
  const debouncedResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  };

  document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    window.addEventListener('resize', debouncedResize);
    preloadFrames();
  });
}());

/* ============================================================
   SITE SCRIPTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     HOURS BADGE
     ----------------------------------------------- */
  const hoursBadge = document.getElementById('hours-badge');

  const updateHours = () => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Riga' }));
    const hours = now.getHours();
    const isOpen = hours >= 10 && hours < 23;

    if (isOpen) {
      hoursBadge.textContent = 'Open now \u00B7 closes at 23:00';
      hoursBadge.className = 'book__hours-badge is-open';
    } else {
      hoursBadge.textContent = 'Closed \u00B7 opens at 10:00';
      hoursBadge.className = 'book__hours-badge is-closed';
    }
  };

  if (hoursBadge) {
    updateHours();
    setInterval(updateHours, 60000);
  }

  /* -----------------------------------------------
     NAV ON SCROLL + FLOATING BOOK BUTTON
     ----------------------------------------------- */
  const nav = document.getElementById('nav');

  const floatingBtn = document.createElement('a');
  floatingBtn.href = 'https://www.fresha.com';
  floatingBtn.target = '_blank';
  floatingBtn.rel = 'noopener noreferrer';
  floatingBtn.className = 'floating-book';
  floatingBtn.setAttribute('aria-label', 'Book an appointment on Fresha');
  floatingBtn.textContent = 'Book Now';
  document.body.appendChild(floatingBtn);

  let scrollRafId = null;
  const onScroll = () => {
    if (scrollRafId) return;
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = null;
      const y = window.scrollY;

      if (nav) {
        nav.classList.toggle('scrolled', y > 60);
      }

      floatingBtn.classList.toggle('is-visible', y > 400);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------
     CUSTOM CURSOR (desktop only, > 768px)
     ----------------------------------------------- */
  if (window.innerWidth > 768) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const lerpRing = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(lerpRing);
    };

    requestAnimationFrame(lerpRing);

    const hoverTargets = document.querySelectorAll('a, button');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => dot.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => dot.classList.remove('is-hovering'));
    });
  }

  /* -----------------------------------------------
     INTERSECTION OBSERVER — SCROLL REVEALS
     ----------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------
     GALLERY DRAG SCROLL
     ----------------------------------------------- */
  const gallery = document.querySelector('.gallery__strip');

  if (gallery) {
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    gallery.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = gallery.scrollLeft;
      gallery.classList.add('is-dragging');
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = (e.pageX - startX) * 1.4;
      gallery.scrollLeft = scrollStart - dx;
    });

    const stopDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      gallery.classList.remove('is-dragging');
    };

    gallery.addEventListener('mouseup', stopDrag);
    gallery.addEventListener('mouseleave', stopDrag);
  }

  /* -----------------------------------------------
     MOBILE NAV
     ----------------------------------------------- */
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    const navLinks = menu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
