import { HOME_ENTRY, flattenNavItems } from './nav-config.js';

const RECENT_SEARCHES_KEY = 'sg-recent-searches';
const MAX_RECENT_SEARCHES = 8;

function normalizeQuery(value) {
  return value.trim().toLowerCase();
}

function getAllSearchEntries() {
  return [
    { ...HOME_ENTRY, section: 'Getting started', sectionSlug: 'getting-started' },
    ...flattenNavItems(),
  ];
}

function readRecentSearchIds() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeRecentSearchIds(ids) {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(ids.slice(0, MAX_RECENT_SEARCHES)));
}

function addRecentSearch(entry) {
  if (!entry?.id) return;
  const ids = readRecentSearchIds().filter((id) => id !== entry.id);
  ids.unshift(entry.id);
  writeRecentSearchIds(ids);
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

function getEntryById(id) {
  return getAllSearchEntries().find((entry) => entry.id === id);
}

function resolveEntries(entries, base, resolveHref) {
  return entries.map((entry) => ({
    ...entry,
    href: resolveHref(entry.href, base),
  }));
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

  return resolveEntries(getAllSearchEntries(), base, resolveHref)
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, normalized),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .slice(0, 12);
}

export function getRecentSearchPages(base, resolveHref) {
  const entries = readRecentSearchIds()
    .map((id) => getEntryById(id))
    .filter(Boolean);

  return resolveEntries(entries, base, resolveHref);
}

function renderResultItem(item, index, activeIndex) {
  return `
    <li>
      <a
        href="${item.href}"
        class="sg-search-result${index === activeIndex ? ' is-active' : ''}"
        data-index="${index}"
        data-entry-id="${item.id}"
      >
        <span class="sg-search-result__label">${item.label}</span>
        <span class="sg-search-result__meta">${item.section}${item.description ? ` · ${item.description}` : ''}</span>
      </a>
    </li>`;
}

export function initSearch(base, resolveHref) {
  const dialog = document.getElementById('sg-search');
  const input = document.getElementById('sg-search-input');
  const results = document.getElementById('sg-search-results');
  const recentHeader = document.getElementById('sg-search-recent-header');
  const clearRecentBtn = document.getElementById('sg-search-recent-clear');
  const openBtn = document.getElementById('sg-search-open');
  const backdrop = dialog?.querySelector('.sg-search__backdrop');
  const closeBtn = dialog?.querySelector('.sg-search__close');

  if (!dialog || !input || !results || !openBtn) return;

  let activeIndex = -1;

  const setRecentHeaderVisible = (visible) => {
    if (recentHeader) recentHeader.hidden = !visible;
  };

  const renderResults = (items, { showRecentHeader = false } = {}) => {
    activeIndex = items.length ? 0 : -1;
    setRecentHeaderVisible(showRecentHeader && items.length > 0);

    if (!items.length) {
      results.innerHTML = showRecentHeader
        ? '<li class="sg-search-empty">No recent searches yet</li>'
        : '<li class="sg-search-empty">No pages found</li>';
      return;
    }

    results.innerHTML = items
      .map((item, index) => renderResultItem(item, index, activeIndex))
      .join('');
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

  const navigateToResult = (link) => {
    const entry = getEntryById(link.getAttribute('data-entry-id'));
    if (entry) addRecentSearch(entry);
    closeSearch();
    window.location.href = link.href;
  };

  const runSearch = () => {
    const query = input.value.trim();
    if (!query) {
      renderResults(getRecentSearchPages(base, resolveHref), { showRecentHeader: true });
      return;
    }
    renderResults(searchPages(query, base, resolveHref));
  };

  const openSearch = () => {
    dialog.hidden = false;
    document.body.classList.add('sg-search-active');
    input.value = '';
    renderResults(getRecentSearchPages(base, resolveHref), { showRecentHeader: true });
    requestAnimationFrame(() => input.focus());
  };

  const closeSearch = () => {
    dialog.hidden = true;
    document.body.classList.remove('sg-search-active');
    setRecentHeaderVisible(false);
    openBtn.focus();
  };

  openBtn.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);
  backdrop?.addEventListener('click', closeSearch);
  clearRecentBtn?.addEventListener('click', () => {
    clearRecentSearches();
    runSearch();
  });

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
      navigateToResult(links[activeIndex]);
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
    if (!link) return;
    event.preventDefault();
    navigateToResult(link);
  });
}
