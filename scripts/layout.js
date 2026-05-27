export const NAV = [
  {
    title: 'Getting started',
    items: [{ href: '/introduction.html', label: 'Introduction', id: 'introduction' }],
  },
  {
    title: 'Foundations',
    items: [
      { href: '/foundations/color.html', label: 'Color', id: 'color' },
      { href: '/foundations/typography.html', label: 'Typography', id: 'typography' },
      { href: '/foundations/capitalization.html', label: 'Capitalization', id: 'capitalization' },
      { href: '/foundations/spacing.html', label: 'Spacing', id: 'spacing' },
      { href: '/foundations/shape.html', label: 'Shape', id: 'shape' },
      { href: '/foundations/elevation.html', label: 'Elevation', id: 'elevation' },
      { href: '/foundations/icons.html', label: 'Icons', id: 'icons' },
      { href: '/foundations/animation.html', label: 'Animation and Motion', id: 'animation', hidden: true },
      { href: '/foundations/alignment.html', label: 'Alignment', id: 'alignment' },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/components/hyperlink.html', label: 'Hyperlinks', id: 'hyperlink' },
      { href: '/components/forms.html', label: 'Forms', id: 'forms' },
      { href: '/components/feature-panels.html', label: 'Feature Panels', id: 'feature-panels' },
      { href: '/components/disabled-controls.html', label: 'Disabled Controls', id: 'disabled-controls' },
      { href: '/components/dividers.html', label: 'Dividers', id: 'dividers' },
      { href: '/components/button.html', label: 'Button', id: 'button' },
      { href: '/components/dropdown.html', label: 'Dropdowns', id: 'dropdown' },
      { href: '/components/navbar.html', label: 'Navbar', id: 'navbar' },
      { href: '/components/bubble.html', label: 'Bubble (Balloon)', id: 'bubble' },
      { href: '/components/badge.html', label: 'Badge', id: 'badge' },
      { href: '/components/collapse.html', label: 'Collapse', id: 'collapse' },
      { href: '/components/dialog.html', label: 'Dialogs', id: 'dialog' },
      { href: '/components/tooltips-popovers.html', label: 'Tooltips & Popovers', id: 'tooltips-popovers' },
      { href: '/components/borders.html', label: 'Borders', id: 'borders' },
      { href: '/components/card.html', label: 'Cards', id: 'card' },
      { href: '/components/list.html', label: 'Lists', id: 'list' },
      { href: '/components/grid-view.html', label: 'Grid View', id: 'grid-view' },
      { href: '/components/carousel.html', label: 'Carousel (Gallery)', id: 'carousel' },
      { href: '/components/error-handling.html', label: 'Error Handling', id: 'error-handling' },
      { href: '/components/ribbon-groups.html', label: 'Ribbon Groups', id: 'ribbon-groups' },
      { href: '/components/checkbox.html', label: 'Checkboxes', id: 'checkbox' },
    ],
  },
  {
    title: 'Guidelines',
    items: [
      { href: '/guidelines/accessibility.html', label: 'Accessibility', id: 'accessibility' },
    ],
  },
];

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

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

export function initLayout(activeId) {
  const base = getBasePath();
  const root = document.getElementById('sg-root');
  if (!root) return;

  const navHtml = NAV.map(
    (section) => `
    <div class="sg-nav-section">
      <div class="sg-nav-section-title">${section.title}</div>
      <ul class="sg-nav-list">
        ${section.items
          .filter((item) => !item.hidden)
          .map(
            (item) => `
          <li>
            <a href="${resolveHref(item.href, base)}" class="${item.id === activeId ? 'is-active' : ''}">${item.label}</a>
          </li>`
          )
          .join('')}
      </ul>
    </div>`
  ).join('');

  const brandHref = base === '..' ? '../index.html' : './index.html';

  root.innerHTML = `
    <aside class="sg-sidebar">
      <a class="sg-brand" href="${brandHref}">
        Company
        <span>Style Guide</span>
      </a>
      <nav class="sg-sidebar-nav" aria-label="Style guide">${navHtml}</nav>
    </aside>
    <div class="sg-main">
      <header class="sg-header">
        <div class="sg-theme-toggle" role="group" aria-label="Theme">
          <button type="button" data-theme-set="light">Light</button>
          <button type="button" data-theme-set="dark">Dark</button>
        </div>
      </header>
      <div class="sg-body">
        <article class="sg-content" id="sg-page-content"></article>
        <aside class="sg-toc" id="sg-toc" aria-label="On this page">
          <div class="sg-toc-inner">
            <p class="sg-toc-title">On this page</p>
            <nav class="sg-toc-nav">
              <ul id="sg-toc-list"></ul>
            </nav>
          </div>
        </aside>
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
