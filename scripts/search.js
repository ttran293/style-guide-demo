import { HOME_ENTRY, flattenNavItems } from './nav-config.js';

function normalizeQuery(value) {
  return value.trim().toLowerCase();
}

function scoreEntry(entry, query) {
  const label = entry.label.toLowerCase();
  const section = (entry.section || '').toLowerCase();
  const description = (entry.description || '').toLowerCase();
  const keywords = (entry.keywords || '').toLowerCase();

  if (label === query) return 100;
  if (label.startsWith(query)) return 80;
  if (label.includes(query)) return 60;
  if (keywords.includes(query)) return 50;
  if (description.includes(query)) return 40;
  if (section.includes(query)) return 30;
  return 0;
}

export function searchPages(query, base, resolveHref) {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const entries = [
    { ...HOME_ENTRY, section: 'Getting started', sectionSlug: 'getting-started' },
    ...flattenNavItems(),
  ];

  return entries
    .map((entry) => ({
      ...entry,
      href: resolveHref(entry.href, base),
      score: scoreEntry(entry, normalized),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .slice(0, 12);
}

export function initSearch(base, resolveHref) {
  const dialog = document.getElementById('sg-search');
  const input = document.getElementById('sg-search-input');
  const results = document.getElementById('sg-search-results');
  const openBtn = document.getElementById('sg-search-open');
  const backdrop = dialog?.querySelector('.sg-search__backdrop');
  const closeBtn = dialog?.querySelector('.sg-search__close');

  if (!dialog || !input || !results || !openBtn) return;

  let activeIndex = -1;

  const renderResults = (items) => {
    activeIndex = items.length ? 0 : -1;
    results.innerHTML = items.length
      ? items
          .map(
            (item, index) => `
        <li>
          <a href="${item.href}" class="sg-search-result${index === activeIndex ? ' is-active' : ''}" data-index="${index}">
            <span class="sg-search-result__label">${item.label}</span>
            <span class="sg-search-result__meta">${item.section}${item.description ? ` · ${item.description}` : ''}</span>
          </a>
        </li>`
          )
          .join('')
      : '<li class="sg-search-empty">No pages found</li>';
  };

  const getResultLinks = () => [...results.querySelectorAll('.sg-search-result')];

  const setActiveResult = (index) => {
    const links = getResultLinks();
    if (!links.length) {
      activeIndex = -1;
      return;
    }
    activeIndex = ((index % links.length) + links.length) % links.length;
    links.forEach((link, i) => link.classList.toggle('is-active', i === activeIndex));
    links[activeIndex]?.scrollIntoView({ block: 'nearest' });
  };

  const openSearch = () => {
    dialog.hidden = false;
    document.body.classList.add('sg-search-active');
    input.value = '';
    renderResults([]);
    requestAnimationFrame(() => input.focus());
  };

  const closeSearch = () => {
    dialog.hidden = true;
    document.body.classList.remove('sg-search-active');
    openBtn.focus();
  };

  const runSearch = () => {
    renderResults(searchPages(input.value, base, resolveHref));
  };

  openBtn.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);
  backdrop?.addEventListener('click', closeSearch);

  input.addEventListener('input', runSearch);

  input.addEventListener('keydown', (event) => {
    const links = getResultLinks();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResult(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResult(activeIndex - 1);
    } else if (event.key === 'Enter' && links[activeIndex]) {
      event.preventDefault();
      window.location.href = links[activeIndex].href;
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
    }
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (dialog.hidden) openSearch();
      else closeSearch();
    }
    if (event.key === 'Escape' && !dialog.hidden) closeSearch();
  });

  results.addEventListener('click', (event) => {
    const link = event.target.closest('.sg-search-result');
    if (link) closeSearch();
  });
}
