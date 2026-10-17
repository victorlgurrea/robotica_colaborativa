/**
 * Presentación local (HTML + JS): no necesita servidor.
 */

const SLIDES_FALLBACK = [
  { id: '1', title: 'Portada principal', tag: 'Intro', level: 1 },
  { id: '2', title: 'Resumen cronológico', tag: 'Hitos', level: 1 },
  { id: '2.1', title: '1769 Patente de James Watt', tag: 'Patente', level: 2 },
  { id: '2.2', title: '1769 Máquina de vapor', tag: 'GIF', level: 2 },
  { id: '2.3', title: '1913 Cadena de montaje Ford', tag: 'GIF', level: 2 },
  { id: '2.4', title: '1952 Control numérico en el MIT', tag: 'GIF', level: 2 },
  { id: '2.5', title: '1967 Kawasaki y Bedford (PLC)', tag: 'Hito', level: 2 },
  { id: '2.6', title: '1973 KUKA FAMULUS (6 ejes)', tag: 'GIF', level: 2 },
  { id: '2.7', title: '1974 ASEA IRB 6 y SEAT', tag: 'GIF', level: 2 },
  { id: '3', title: 'Marco legal y normativa', tag: 'Normas', level: 1 },
  { id: '4', title: '¿Dónde ocurren los accidentes?', tag: 'Datos', level: 1 },
  { id: '5', title: 'Seguridad', tag: 'Defensa', level: 1 },
  { id: '5.1', title: 'El robot: seguridad intrínseca', tag: 'Núcleo', level: 2 },
  { id: '5.2', title: 'La célula: perímetro y sensores', tag: 'Perímetro', level: 2 },
  { id: '5.3', title: 'El operario: protocolos', tag: 'Humano', level: 2 },
  { id: '5.4', title: 'Arquitectura del entorno seguro', tag: 'Entorno', level: 2 },
  { id: '6', title: 'Sistemas de seguridad', tag: 'SSP', level: 1 },
  { id: '6.1', title: 'Peligros inherentes y dato técnico', tag: 'Riesgos', level: 2 },
  { id: '6.2', title: 'Principios operativos y SSP', tag: 'Arquitectura', level: 2 },
  { id: '6.3', title: 'Cerramiento y normativa', tag: 'Resguardos', level: 2 },
  { id: '6.4', title: 'Microdiseño de distancias', tag: 'Distancias', level: 2 },
  { id: '6.5', title: 'Célula robótica unificada', tag: 'Síntesis', level: 2 },
  { id: '7', title: 'Fuentes y bibliografía', tag: 'Fuentes', level: 1 }
];

let SLIDES = (window.I18N && I18N.getSlides()) || SLIDES_FALLBACK;

/** Secciones con subítems desplegables en el menú lateral. */
const COLLAPSIBLE_SECTION_IDS = ['2', '5', '6'];

const PDF_WATT = 'assets/docs/James_Watt_Patent_1769_No_913.pdf';

document.addEventListener('DOMContentLoaded', () => {
  if (window.I18N) {
    I18N.apply(I18N.getLang());
    SLIDES = I18N.getSlides();
  }

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

  const sectionChildIndexes = {};
  const sectionExpanded = {};
  COLLAPSIBLE_SECTION_IDS.forEach((parentId) => {
    sectionChildIndexes[parentId] = SLIDES
      .map((s, idx) => (s.level === 2 && String(s.id).startsWith(`${parentId}.`) ? idx : -1))
      .filter((idx) => idx >= 0);
    sectionExpanded[parentId] = false;
  });

  function createNavButton(item, idx) {
    const level = item.level || 1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-item' + (level === 2 ? ' nav-level-2' : '');
    btn.dataset.index = String(idx);
    btn.innerHTML = `
      <span class="nav-num">${item.id}</span>
      <div class="nav-text-group">
        <span class="nav-title">${item.title}</span>
        <span class="nav-tag">${item.tag}</span>
      </div>
    `;
    return btn;
  }

  function setSectionExpanded(parentId, expanded) {
    sectionExpanded[parentId] = expanded;
    const group = sidebarNav?.querySelector(`.nav-group-${parentId}`);
    if (!group) return;
    group.classList.toggle('is-expanded', expanded);
    group.classList.toggle('is-collapsed', !expanded);
    const parentBtn = group.querySelector('.nav-parent');
    if (parentBtn) {
      parentBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
  }

  function toggleSection(parentId) {
    setSectionExpanded(parentId, !sectionExpanded[parentId]);
  }

  function buildCollapsibleGroup(parentId, parentIndex) {
    const group = document.createElement('div');
    group.className = `nav-group nav-group-${parentId} is-collapsed`;

    const parentBtn = createNavButton(SLIDES[parentIndex], parentIndex);
    parentBtn.classList.add('nav-parent');
    parentBtn.setAttribute('aria-expanded', 'false');
    parentBtn.setAttribute('aria-controls', `nav-children-${parentId}`);
    parentBtn.insertAdjacentHTML(
      'beforeend',
      `<span class="nav-chevron" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>`
    );
    parentBtn.addEventListener('click', () => {
      toggleSection(parentId);
      goToSlide(parentIndex);
      if (window.innerWidth <= 768) sidebar?.classList.remove('mobile-open');
    });
    group.appendChild(parentBtn);

    const children = document.createElement('div');
    children.className = 'nav-children';
    children.id = `nav-children-${parentId}`;
    children.setAttribute('role', 'group');

    let j = parentIndex + 1;
    while (j < SLIDES.length && SLIDES[j].level === 2 && String(SLIDES[j].id).startsWith(`${parentId}.`)) {
      const childIdx = j;
      const childBtn = createNavButton(SLIDES[j], childIdx);
      childBtn.addEventListener('click', () => {
        setSectionExpanded(parentId, true);
        goToSlide(childIdx);
        if (window.innerWidth <= 768) sidebar?.classList.remove('mobile-open');
      });
      children.appendChild(childBtn);
      j += 1;
    }

    group.appendChild(children);
    return { group, nextIndex: j };
  }

  function buildSidebar() {
    if (!sidebarNav) return;
    sidebarNav.innerHTML = '';

    let i = 0;
    while (i < SLIDES.length) {
      const item = SLIDES[i];

      if (COLLAPSIBLE_SECTION_IDS.includes(item.id)) {
        const { group, nextIndex } = buildCollapsibleGroup(item.id, i);
        sidebarNav.appendChild(group);
        i = nextIndex;
        continue;
      }

      const btn = createNavButton(item, i);
      const idx = i;
      btn.addEventListener('click', () => {
        goToSlide(idx);
        if (window.innerWidth <= 768) sidebar?.classList.remove('mobile-open');
      });
      sidebarNav.appendChild(btn);
      i += 1;
    }

    COLLAPSIBLE_SECTION_IDS.forEach((parentId) => {
      setSectionExpanded(parentId, sectionExpanded[parentId]);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    if (index >= slideEls.length) index = slideEls.length - 1;

    currentIndex = index;

    COLLAPSIBLE_SECTION_IDS.forEach((parentId) => {
      if (sectionChildIndexes[parentId].includes(currentIndex)) {
        setSectionExpanded(parentId, true);
      }
    });

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

  function bindJumpTarget(el) {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = parseInt(el.dataset.targetSlide, 10);
      if (!Number.isNaN(target)) goToSlide(target - 1);
    });
  }

  slideMount.querySelectorAll('.btn-jump').forEach(bindJumpTarget);
  slideMount.querySelectorAll('.clickable-row').forEach(bindJumpTarget);

  btnToggleSidebar?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar?.classList.toggle('mobile-open');
    } else {
      sidebar?.classList.toggle('collapsed');
    }
  });

  const langDropdown = document.getElementById('lang-dropdown');
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  const langDropdownMenu = document.getElementById('lang-dropdown-menu');

  function closeLangDropdown() {
    if (!langDropdownMenu || !btnLangToggle) return;
    langDropdownMenu.hidden = true;
    btnLangToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleLangDropdown() {
    if (!langDropdownMenu || !btnLangToggle) return;
    const open = langDropdownMenu.hidden;
    langDropdownMenu.hidden = !open;
    btnLangToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btnLangToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLangDropdown();
  });

  langDropdownMenu?.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = btn.dataset.lang;
      if (window.I18N && lang) I18N.setLang(lang);
      closeLangDropdown();
    });
  });

  document.addEventListener('click', (e) => {
    if (!langDropdown?.contains(e.target)) closeLangDropdown();
  });

  document.addEventListener('i18n:langchange', () => {
    if (window.I18N) {
      SLIDES = I18N.getSlides();
    }
    buildSidebar();
    goToSlide(currentIndex);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeLangDropdown();
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
