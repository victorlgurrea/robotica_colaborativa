/**
 * Presentación local (HTML + JS): no necesita servidor.
 */

const SLIDES = [
  { id: '1', title: 'Portada principal', tag: 'Intro', level: 1 },
  { id: '2', title: 'Resumen cronológico', tag: 'Hitos', level: 1 },
  { id: '2.1', title: '1769 Patente de James Watt', tag: 'Patente', level: 2 },
  { id: '2.2', title: '1769 Máquina de vapor', tag: 'GIF', level: 2 },
  { id: '2.3', title: '1913 Cadena de montaje Ford', tag: 'GIF', level: 2 },
  { id: '2.4', title: '1952 Control numérico en el MIT', tag: 'GIF', level: 2 },
  { id: '2.5', title: '1967 Kawasaki-Unimate', tag: 'GIF', level: 2 },
  { id: '2.6', title: '1973 KUKA FAMULUS (6 ejes)', tag: 'GIF', level: 2 },
  { id: '2.7', title: '1974 ASEA IRB 6 y SEAT', tag: 'GIF', level: 2 },
  { id: '3', title: 'Marco legal y normativa', tag: 'Normas', level: 1 },
  { id: '4', title: '¿Dónde ocurren los accidentes?', tag: 'Datos', level: 1 },
  { id: '5', title: 'Fuentes y bibliografía', tag: 'Fuentes', level: 1 }
];

const PDF_WATT = 'assets/docs/James_Watt_Patent_1769_No_913.pdf';

document.addEventListener('DOMContentLoaded', () => {
  const totalSlides = SLIDES.length;
  let currentIndex = 0;

  const slideMount = document.getElementById('slide-mount');
  const slideEls = slideMount ? Array.from(slideMount.querySelectorAll('.slide')) : [];
  const sidebar = document.getElementById('sidebar');
  const sidebarNav = document.getElementById('sidebar-nav');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const topCurrentTitle = document.getElementById('top-current-title');
  const pdfModalOverlay = document.getElementById('pdf-modal-overlay');
  const btnClosePdf = document.getElementById('btn-close-pdf');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const btnFullscreen = document.getElementById('btn-fullscreen');

  if (!slideMount || slideEls.length === 0) {
    console.error('No se encontraron diapositivas en #slide-mount');
    return;
  }

  function buildSidebar() {
    if (!sidebarNav) return;
    sidebarNav.innerHTML = '';

    SLIDES.forEach((item, idx) => {
      const level = item.level || 1;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-item' +
        (level === 2 ? ' nav-level-2' : '') +
        (idx === 0 ? ' active' : '');
      btn.dataset.index = String(idx);
      btn.innerHTML = `
        <span class="nav-num">${item.id}</span>
        <div class="nav-text-group">
          <span class="nav-title">${item.title}</span>
          <span class="nav-tag">${item.tag}</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        goToSlide(idx);
        if (window.innerWidth <= 768) sidebar?.classList.remove('mobile-open');
      });
      sidebarNav.appendChild(btn);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index >= slideEls.length) index = slideEls.length - 1;

    currentIndex = index;

    slideEls.forEach((el, idx) => {
      el.classList.toggle('active', idx === currentIndex);
    });

    if (topCurrentTitle) {
      const s = SLIDES[currentIndex];
      topCurrentTitle.textContent = s ? `${s.id}. ${s.title}` : '';
    }

    sidebarNav?.querySelectorAll('.nav-item').forEach((btn) => {
      const idx = parseInt(btn.dataset.index, 10);
      const isActive = idx === currentIndex;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    try {
      history.replaceState(null, '', `#slide-${currentIndex + 1}`);
    } catch (_) {
      /* file:// */
    }
  }

  window.goToSlide = goToSlide;

  function nextSlide() {
    if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  }

  slideMount.querySelectorAll('.btn-cover-start').forEach((btn) => {
    btn.addEventListener('click', () => goToSlide(1));
  });

  slideMount.querySelectorAll('.btn-jump').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.targetSlide, 10);
      if (!Number.isNaN(target)) goToSlide(target - 1);
    });
  });

  slideMount.querySelectorAll('.clickable-row').forEach((row) => {
    row.addEventListener('click', () => {
      const target = parseInt(row.dataset.targetSlide, 10);
      if (!Number.isNaN(target)) goToSlide(target - 1);
    });
  });

  btnToggleSidebar?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar?.classList.toggle('mobile-open');
    } else {
      sidebar?.classList.toggle('collapsed');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      sidebar?.classList.remove('mobile-open');
      return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 's':
      case 'S':
      case 'b':
      case 'B':
        e.preventDefault();
        sidebar?.classList.toggle('collapsed');
        break;
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  const stageEl = document.querySelector('.stage');

  stageEl?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  stageEl?.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  btnFullscreen?.addEventListener('click', toggleFullscreen);

  window.openPdfModal = function (pdfUrl) {
    const frame = document.getElementById('pdf-viewer-frame');
    if (frame) frame.src = pdfUrl || PDF_WATT;
    pdfModalOverlay?.classList.add('open');
  };

  function closeAllModals() {
    pdfModalOverlay?.classList.remove('open');
    lightboxOverlay?.classList.remove('open');
    const frame = document.getElementById('pdf-viewer-frame');
    if (frame) frame.src = '';
  }

  btnClosePdf?.addEventListener('click', closeAllModals);
  pdfModalOverlay?.addEventListener('click', (e) => {
    if (e.target === pdfModalOverlay) closeAllModals();
  });

  window.openLightbox = function (imgSrc) {
    if (lightboxImg) lightboxImg.src = imgSrc;
    lightboxOverlay?.classList.add('open');
  };

  btnCloseLightbox?.addEventListener('click', () => lightboxOverlay?.classList.remove('open'));
  lightboxOverlay?.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('open');
  });

  buildSidebar();

  const hashMatch = window.location.hash.match(/slide-(\d+)/);
  if (hashMatch) {
    goToSlide(parseInt(hashMatch[1], 10) - 1);
  } else {
    goToSlide(0);
  }
});
