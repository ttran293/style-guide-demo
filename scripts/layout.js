import { NAV, HOME_ENTRY, flattenNavItems } from './nav-config.js';
import { initSearch } from './search.js';

export { NAV };

const NAV_SECTIONS_KEY = 'sg-nav-sections';

function getBasePath() {
  if (
    window.location.pathname.includes('/foundations/') ||
    window.location.pathname.includes('/components/') ||
    window.location.pathname.includes('/guidelines/')
  ) {
    return '..';
  }
  return '.';
}

function resolveHref(href, base) {
  if (href.startsWith('/')) {
    return base === '..' ? `..${href}` : `.${href}`;
  }
  return href;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getPageMeta(activeId) {
  if (activeId === 'home') return HOME_ENTRY;
  for (const section of NAV) {
    for (const item of section.items) {
      if (item.id === activeId) return item;
      const child = item.children?.find((entry) => entry.id === activeId);
      if (child) return { ...child, description: child.description || item.description };
    }
  }
  return null;
}

function readNavSectionState() {
  try {
    return JSON.parse(localStorage.getItem(NAV_SECTIONS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeNavSectionState(state) {
  localStorage.setItem(NAV_SECTIONS_KEY, JSON.stringify(state));
}

function getActiveSectionSlug(activeId) {
  for (const section of NAV) {
    if (section.items.some((item) => item.id === activeId)) {
      return section.slug;
    }
    if (section.items.some((item) => item.children?.some((child) => child.id === activeId))) {
      return section.slug;
    }
  }
  return null;
}

function resolveActiveNavId(activeId) {
  const hash = window.location.hash.slice(1);
  if (!hash) return activeId;

  for (const section of NAV) {
    for (const item of section.items) {
      if (!item.children) continue;
      const child = item.children.find((entry) => entry.href.endsWith(`#${hash}`));
      if (child && item.id === activeId) {
        return child.id;
      }
    }
  }
  return activeId;
}

function renderNavItem(item, base, activeId) {
  const childActive = item.children?.some((child) => child.id === activeId);
  const parentActive = item.id === activeId && !childActive;
  const childLinks = item.children
    ? `<ul class="sg-nav-sublist">
        ${item.children
          .map(
            (child) => `
          <li>
            <a href="${resolveHref(child.href, base)}" class="${child.id === activeId ? 'is-active' : ''}">${child.label}</a>
          </li>`
          )
          .join('')}
      </ul>`
    : '';

  return `
          <li>
            <a href="${resolveHref(item.href, base)}" class="${parentActive ? 'is-active' : ''}">${item.label}</a>
            ${childLinks}
          </li>`;
}

function isSectionExpanded(section, activeSectionSlug, storedState) {
  if (Object.keys(storedState).length === 0) return true;
  if (section.slug === activeSectionSlug) return true;
  if (typeof storedState[section.slug] === 'boolean') {
    return storedState[section.slug];
  }
  return true;
}

function getTocHeadings(container) {
  return [...container.querySelectorAll('h2, h3')].filter(
    (heading) => !heading.closest('.sg-card, .sg-preview')
  );
}

function assignHeadingIds(container) {
  const headings = getTocHeadings(container);
  const usedIds = new Set();

  headings.forEach((heading) => {
    let id = slugify(heading.textContent);
    let suffix = 2;
    while (!id || usedIds.has(id)) {
      id = `${slugify(heading.textContent)}-${suffix++}`;
    }
    usedIds.add(id);
    heading.id = id;
  });

  return headings;
}

function buildTocList(headings) {
  if (!headings.length) return '';

  return Array.from(headings)
    .map((heading) => {
      const level = heading.tagName === 'H3' ? 3 : 2;
      return `<li class="sg-toc-item sg-toc-item--h${level}">
        <a href="#${heading.id}">${heading.textContent}</a>
      </li>`;
    })
    .join('');
}

function initScrollSpy(headings) {
  const tocLinks = document.querySelectorAll('.sg-toc-nav a');
  if (!tocLinks.length || !headings.length) return;

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-88px 0px -75% 0px', threshold: 0 }
  );

  headings.forEach((heading) => observer.observe(heading));

  tocLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
        history.replaceState(null, '', `#${id}`);
        setActive(id);
      }
    });
  });

  if (window.location.hash) {
    setActive(window.location.hash.slice(1));
  } else {
    setActive(headings[0].id);
  }
}

function initPageToc(container) {
  const headings = assignHeadingIds(container);
  const toc = document.getElementById('sg-toc');
  const tocList = document.getElementById('sg-toc-list');

  if (!toc || !tocList) return;

  if (!headings.length) {
    toc.hidden = true;
    return;
  }

  toc.hidden = false;
  tocList.innerHTML = buildTocList(headings);
  initScrollSpy(headings);
}

function buildNavHtml(base, activeId, storedState, activeSectionSlug) {
  return NAV.map((section) => {
    const visibleItems = section.items.filter((item) => !item.hidden);
    const expanded = isSectionExpanded(section, activeSectionSlug, storedState);
    const panelId = `nav-section-${section.slug}`;

    return `
    <div class="sg-nav-section${expanded ? ' is-expanded' : ''}" data-nav-section="${section.slug}">
      <button
        type="button"
        class="sg-nav-section-toggle"
        aria-expanded="${expanded ? 'true' : 'false'}"
        aria-controls="${panelId}"
        id="${panelId}-toggle"
      >
        <span class="sg-nav-section-title">${section.title}</span>
        <span class="sg-nav-section-chevron" aria-hidden="true"></span>
      </button>
      <ul id="${panelId}" class="sg-nav-list"${expanded ? '' : ' hidden'}>
        ${visibleItems.map((item) => renderNavItem(item, base, activeId)).join('')}
      </ul>
    </div>`;
  }).join('');
}

function initCollapsibleNav(activeSectionSlug) {
  const storedState = readNavSectionState();

  document.querySelectorAll('.sg-nav-section-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const section = toggle.closest('.sg-nav-section');
      const list = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!section || !list) return;

      const slug = section.dataset.navSection;
      const willExpand = toggle.getAttribute('aria-expanded') !== 'true';

      toggle.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
      list.hidden = !willExpand;
      section.classList.toggle('is-expanded', willExpand);

      storedState[slug] = willExpand;
      writeNavSectionState(storedState);
    });
  });
}

function initMobileNav() {
  const openBtn = document.getElementById('sg-nav-open');
  const closeBtn = document.getElementById('sg-nav-close');
  const backdrop = document.getElementById('sg-nav-backdrop');

  const syncSidebarA11y = () => {
    const sidebar = document.querySelector('.sg-sidebar');
    if (!sidebar) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      sidebar.removeAttribute('aria-hidden');
      return;
    }
    sidebar.setAttribute(
      'aria-hidden',
      document.body.classList.contains('sg-mobile-nav-open') ? 'false' : 'true'
    );
  };

  const closeNav = () => {
    document.body.classList.remove('sg-mobile-nav-open');
    openBtn?.setAttribute('aria-expanded', 'false');
    syncSidebarA11y();
  };

  const openNav = () => {
    document.body.classList.add('sg-mobile-nav-open');
    openBtn?.setAttribute('aria-expanded', 'true');
    syncSidebarA11y();
    closeBtn?.focus();
  };

  openBtn?.addEventListener('click', () => {
    if (document.body.classList.contains('sg-mobile-nav-open')) closeNav();
    else openNav();
  });

  closeBtn?.addEventListener('click', closeNav);
  backdrop?.addEventListener('click', closeNav);

  document.querySelector('.sg-sidebar')?.querySelectorAll('.sg-nav-list a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('sg-mobile-nav-open')) {
      closeNav();
      openBtn?.focus();
    }
  });

  syncSidebarA11y();
  window.addEventListener('resize', syncSidebarA11y);
}

function injectSkipLink() {
  if (document.getElementById('sg-skip-link')) return;

  const skip = document.createElement('a');
  skip.id = 'sg-skip-link';
  skip.className = 'sg-skip-link';
  skip.href = '#sg-page-content';
  skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);
}

function setPageMeta(activeId) {
  const meta = getPageMeta(activeId);
  if (!meta?.description) return;

  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', `${meta.description} — Company Style Guide`);
}

export function initLayout(activeId) {
  const base = getBasePath();
  const root = document.getElementById('sg-root');
  if (!root) return;

  activeId = resolveActiveNavId(activeId);

  injectSkipLink();
  setPageMeta(activeId);

  const activeSectionSlug = getActiveSectionSlug(activeId);
  const storedState = readNavSectionState();
  const navHtml = buildNavHtml(base, activeId, storedState, activeSectionSlug);
  const brandHref = base === '..' ? '../index.html' : './index.html';

  root.innerHTML = `
    <div class="sg-nav-backdrop" id="sg-nav-backdrop"></div>
    <aside class="sg-sidebar" aria-label="Site navigation">
      <div class="sg-sidebar__header">
        <a class="sg-brand" href="${brandHref}">
          Company
          <span>Style Guide</span>
        </a>
        <button type="button" class="sg-nav-close" id="sg-nav-close" aria-label="Close navigation">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav class="sg-sidebar-nav" aria-label="Style guide">${navHtml}</nav>
    </aside>
    <div class="sg-main">
      <header class="sg-header">
        <div class="sg-header-start">
          <button type="button" class="sg-nav-open" id="sg-nav-open" aria-expanded="false" aria-controls="sg-sidebar-nav" aria-label="Open navigation">
            <span class="sg-nav-open__bar" aria-hidden="true"></span>
            <span class="sg-nav-open__bar" aria-hidden="true"></span>
            <span class="sg-nav-open__bar" aria-hidden="true"></span>
          </button>
          <button type="button" class="sg-search-open" id="sg-search-open" aria-label="Search pages">
            <i class="fa-solid fa-magnifying-glass sg-search-open__icon" aria-hidden="true"></i>
            <span class="sg-search-open__label">Search pages…</span>
            <kbd class="sg-search-open__kbd" aria-hidden="true">Ctrl K</kbd>
          </button>
        </div>
        <div class="sg-theme-toggle" role="group" aria-label="Theme">
          <button type="button" data-theme-set="light">Light</button>
          <button type="button" data-theme-set="dark">Dark</button>
        </div>
      </header>
      <div class="sg-body">
        <main class="sg-content" id="sg-page-content" tabindex="-1"></main>
        <aside class="sg-toc" id="sg-toc" aria-label="On this page">
          <div class="sg-toc-inner">
            <p class="sg-toc-title">On this page</p>
            <nav class="sg-toc-nav">
              <ul id="sg-toc-list"></ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
    <div class="sg-search" id="sg-search" hidden>
      <div class="sg-search__backdrop" aria-hidden="true"></div>
      <div class="sg-search__panel" role="dialog" aria-modal="true" aria-label="Search pages">
        <div class="sg-search__header">
          <label class="sg-search__label" for="sg-search-input">Search pages</label>
          <button type="button" class="sg-search__close" aria-label="Close search">×</button>
        </div>
        <div class="sg-search__field">
          <i class="fa-solid fa-magnifying-glass sg-search__field-icon" aria-hidden="true"></i>
          <input class="sg-search__input" id="sg-search-input" type="search" placeholder="Search by page name or topic…" autocomplete="off" />
        </div>
        <div class="sg-search-recent-header" id="sg-search-recent-header" hidden>
          <p class="sg-search-section__title">Recent searches</p>
          <button type="button" class="sg-search-recent-clear" id="sg-search-recent-clear">Clear</button>
        </div>
        <ul class="sg-search__results" id="sg-search-results" role="listbox" aria-label="Search results"></ul>
      </div>
    </div>`;

  const contentSlot = document.getElementById('sg-page-content');
  const existing = document.getElementById('sg-content-source');
  if (contentSlot && existing) {
    contentSlot.innerHTML = existing.innerHTML;
    existing.remove();
    initPageToc(contentSlot);
  }

  initTheme();
  initCollapsibleNav(activeSectionSlug);
  initMobileNav();
  initSearch(base, resolveHref);
  scrollSidebarToActiveItem();
}

function scrollSidebarToActiveItem() {
  const sidebarNav = document.querySelector('.sg-sidebar-nav');
  const activeLink =
    sidebarNav?.querySelector('.sg-nav-sublist a.is-active') ||
    sidebarNav?.querySelector('.sg-nav-list > li > a.is-active');
  if (!sidebarNav || !activeLink) return;

  requestAnimationFrame(() => {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = sidebarNav.getBoundingClientRect();
    const relativeTop = linkRect.top - navRect.top + sidebarNav.scrollTop;
    const targetScroll =
      relativeTop - sidebarNav.clientHeight / 2 + activeLink.offsetHeight / 2;

    sidebarNav.scrollTop = Math.max(
      0,
      Math.min(targetScroll, sidebarNav.scrollHeight - sidebarNav.clientHeight)
    );
  });
}

function initTheme() {
  const stored = localStorage.getItem('sg-theme') || 'light';
  document.documentElement.setAttribute('data-theme', stored);
  updateThemeButtons(stored);

  document.querySelectorAll('[data-theme-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-set');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('sg-theme', theme);
      updateThemeButtons(theme);
    });
  });
}

function updateThemeButtons(theme) {
  document.querySelectorAll('[data-theme-set]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-theme-set') === theme);
  });
}
