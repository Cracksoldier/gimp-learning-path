'use strict';

const STORAGE_KEY = 'gimp-lp-v2';
let state = null;
let currentFilter = 'all';
let focusedCardId = null;
let scrollObserver = null;
let searchQuery = '';

// ─── State ────────────────────────────────────────────────────────────────────

function defaultState() {
  const s = { version: 2, lessons: {}, challenges: {}, notes: {}, theme: 'dark' };
  LEARNING_PATH.forEach(section => {
    section.lessons.forEach(l => { s.lessons[l.id] = false; });
    section.challenges.forEach(c => { s.challenges[c.id] = false; s.notes[c.id] = ''; });
  });
  return s;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const def = defaultState();
    return {
      version: 2,
      theme: parsed.theme || def.theme,
      lessons:    Object.assign({}, def.lessons,    parsed.lessons    || {}),
      challenges: Object.assign({}, def.challenges, parsed.challenges || {}),
      notes:      Object.assign({}, def.notes,      parsed.notes      || {})
    };
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ─── Theme ────────────────────────────────────────────────────────────────────

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('theme-btn').textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-btn').textContent = '☀';
  }
}

function handleThemeToggle() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(state.theme);
  saveState();
}

// ─── URL Hash Sharing ─────────────────────────────────────────────────────────

function encodeStateToHash() {
  const compact = {
    l: Object.keys(state.lessons).filter(id => state.lessons[id]),
    c: Object.keys(state.challenges).filter(id => state.challenges[id])
  };
  return '#' + btoa(JSON.stringify(compact));
}

function decodeStateFromHash() {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    const compact = JSON.parse(atob(hash));
    const s = defaultState();
    if (compact.l) compact.l.forEach(id => { if (id in s.lessons)    s.lessons[id]    = true; });
    if (compact.c) compact.c.forEach(id => { if (id in s.challenges) s.challenges[id] = true; });
    return s;
  } catch (e) {
    return null;
  }
}

function handleShareClick() {
  const url = window.location.href.split('#')[0] + encodeStateToHash();
  const fallback = () => showToast('Share URL: ' + url, 'info');
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => showToast('Link copied to clipboard!', 'info'),
        fallback
      );
    } else {
      fallback();
    }
  } catch (e) {
    fallback();
  }
}

// ─── Progress Bars ────────────────────────────────────────────────────────────

function renderProgressBars() {
  let totalL = 0, doneL = 0, totalC = 0, doneC = 0;
  LEARNING_PATH.forEach(s => {
    s.lessons.forEach(l => { totalL++; if (state.lessons[l.id]) doneL++; });
    s.challenges.forEach(c => { totalC++; if (state.challenges[c.id]) doneC++; });
  });
  const lp = totalL ? Math.round(doneL / totalL * 100) : 0;
  const cp = totalC ? Math.round(doneC / totalC * 100) : 0;
  document.getElementById('lesson-count').textContent    = `${doneL} / ${totalL} (${lp}%)`;
  document.getElementById('lesson-bar').style.width      = lp + '%';
  document.getElementById('challenge-count').textContent = `${doneC} / ${totalC} (${cp}%)`;
  document.getElementById('challenge-bar').style.width   = cp + '%';
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const RING_C = 50.27; // 2π × 8

function sectionProgress(section) {
  const items = section.lessons.length + section.challenges.length;
  if (!items) return 0;
  const done = section.lessons.filter(l => state.lessons[l.id]).length
             + section.challenges.filter(c => state.challenges[c.id]).length;
  return done / items;
}

function scrollToSection(event, sectionId) {
  event.preventDefault();
  const el = document.getElementById('section-' + sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSidebar() {
  document.getElementById('sidebar').innerHTML = LEARNING_PATH.map(section => {
    const pct    = sectionProgress(section) * 100;
    const offset = (RING_C * (1 - pct / 100)).toFixed(2);
    return `<a class="nav-item" href="#section-${section.id}"
   data-section="${section.id}" data-level="${section.level}"
   onclick="scrollToSection(event,'${section.id}')">
  <svg width="22" height="22" class="progress-ring" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="8" fill="none" stroke="var(--border)" stroke-width="2.5"/>
    <circle cx="11" cy="11" r="8" fill="none" stroke="var(--${section.level})" stroke-width="2.5"
            stroke-dasharray="${RING_C}" stroke-dashoffset="${offset}"
            stroke-linecap="round" transform="rotate(-90 11 11)"
            id="ring-fill-${section.id}"/>
  </svg>
  <span class="nav-text">${section.title}</span>
</a>`;
  }).join('');
}

function updateRing(sectionId) {
  const section = LEARNING_PATH.find(s => s.id === sectionId);
  const ring    = document.getElementById('ring-fill-' + sectionId);
  if (!section || !ring) return;
  const pct = sectionProgress(section) * 100;
  ring.setAttribute('stroke-dashoffset', (RING_C * (1 - pct / 100)).toFixed(2));
}

function updateSidebarActive(sectionId) {
  document.querySelectorAll('.nav-item').forEach(a =>
    a.classList.toggle('active', a.dataset.section === sectionId)
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderLessonCard(lesson, sectionId) {
  const done = !!state.lessons[lesson.id];
  return `<div class="lesson-card${done ? ' completed' : ''}" id="card-${lesson.id}"
     tabindex="0"
     onclick="handleLessonToggle('${lesson.id}','${sectionId}')"
     onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();handleLessonToggle('${lesson.id}','${sectionId}');}">
  <div class="lesson-checkbox">${done ? '✓' : ''}</div>
  <div class="lesson-body">
    <div class="lesson-title-row">
      <span class="lesson-title">${lesson.title}</span>
      ${lesson.est ? `<span class="est-badge">⏱ ${lesson.est}</span>` : ''}
    </div>
    <div class="ps-callout"><span class="ps-callout-prefix">↔</span> ${lesson.psEquivalent}</div>
    <p class="lesson-desc">${lesson.description}</p>
    <div class="concept-chips">${lesson.concepts.map(c => `<span class="concept-chip">${c}</span>`).join('')}</div>
  </div>
</div>`;
}

function renderChallengeCard(challenge, sectionId) {
  const done = !!state.challenges[challenge.id];
  const note = state.notes[challenge.id] || '';
  const diff = challenge.difficulty ? challenge.difficulty.toLowerCase() : '';
  return `<div class="challenge-card${done ? ' completed' : ''}" id="card-${challenge.id}"
     tabindex="0"
     onclick="handleChallengeToggle('${challenge.id}','${sectionId}',event)"
     onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();handleChallengeToggle('${challenge.id}','${sectionId}',event);}">
  <div class="challenge-checkbox">${done ? '✓' : ''}</div>
  <div class="challenge-body">
    <div class="challenge-title-row">
      <span class="challenge-title">${challenge.title}</span>
      ${challenge.difficulty ? `<span class="difficulty-badge ${diff}">${challenge.difficulty}</span>` : ''}
      ${challenge.est ? `<span class="est-badge">⏱ ${challenge.est}</span>` : ''}
    </div>
    <p class="challenge-desc">${challenge.description}</p>
    <div class="challenge-goal"><strong>Goal:</strong> ${challenge.goal}</div>
    <div class="note-area${note ? ' expanded' : ''}">
      <button class="note-toggle" onclick="toggleNote(event,'${challenge.id}')">${note ? '▾ Notes' : '+ Add note'}</button>
      <textarea class="note-textarea" id="note-${challenge.id}"
        placeholder="Your notes…"
        onclick="event.stopPropagation()"
        onkeydown="event.stopPropagation()"
        oninput="handleNoteChange('${challenge.id}')"
        onblur="handleNoteChange('${challenge.id}')">${escapeHtml(note)}</textarea>
    </div>
  </div>
</div>`;
}

// ─── Notes ────────────────────────────────────────────────────────────────────

function toggleNote(event, id) {
  event.stopPropagation();
  const area = event.target.closest('.note-area');
  const expand = !area.classList.contains('expanded');
  area.classList.toggle('expanded', expand);
  const btn = area.querySelector('.note-toggle');
  if (expand) {
    btn.textContent = '▾ Notes';
    area.querySelector('.note-textarea').focus();
  } else {
    btn.textContent = state.notes[id] ? '▾ Notes' : '+ Add note';
  }
}

function handleNoteChange(id) {
  const ta = document.getElementById('note-' + id);
  if (!ta) return;
  state.notes[id] = ta.value;
  saveState();
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function renderSection(section) {
  const allL = section.lessons.every(l => state.lessons[l.id]);
  const allC = section.challenges.every(c => state.challenges[c.id]);
  return `<div class="section-block" id="section-${section.id}" data-level="${section.level}">
  <div class="section-header">
    <span class="section-badge">${section.title}</span>
    <span class="section-title">${section.title}</span>
  </div>
  <p class="section-desc">${section.description}</p>
  <div class="subsection lessons-sub" data-section="${section.id}" data-type="lessons">
    <div class="subsection-heading">
      <span class="subsection-heading-text">Lessons</span>
      <span class="subsection-count">${section.lessons.length}</span>
      <div class="subsection-line"></div>
      <button class="mark-all-btn"
        onclick="handleMarkAll(event,'${section.id}','lessons',${allL ? 'false' : 'true'})">
        ${allL ? 'Clear all' : 'Mark all'}
      </button>
    </div>
    ${section.lessons.map(l => renderLessonCard(l, section.id)).join('')}
  </div>
  <div class="subsection challenges-sub" data-section="${section.id}" data-type="challenges">
    <div class="subsection-heading">
      <span class="subsection-heading-text">Challenges</span>
      <span class="subsection-count">${section.challenges.length}</span>
      <div class="subsection-line"></div>
      <button class="mark-all-btn"
        onclick="handleMarkAll(event,'${section.id}','challenges',${allC ? 'false' : 'true'})">
        ${allC ? 'Clear all' : 'Mark all'}
      </button>
    </div>
    ${section.challenges.map(c => renderChallengeCard(c, section.id)).join('')}
  </div>
</div>`;
}

function render() {
  document.getElementById('main-content').innerHTML =
    LEARNING_PATH.map(s => renderSection(s)).join('');
}

// ─── Toggle Handlers ──────────────────────────────────────────────────────────

function handleLessonToggle(id, sectionId) {
  state.lessons[id] = !state.lessons[id];
  saveState();
  const card = document.getElementById('card-' + id);
  if (card) {
    card.classList.toggle('completed', state.lessons[id]);
    card.querySelector('.lesson-checkbox').textContent = state.lessons[id] ? '✓' : '';
  }
  renderProgressBars();
  updateRing(sectionId);
  updateMarkAllBtn(sectionId, 'lessons');
  applySearchAndFilter();
}

function handleChallengeToggle(id, sectionId, event) {
  if (event && event.target.closest && event.target.closest('.note-area')) return;
  state.challenges[id] = !state.challenges[id];
  saveState();
  const card = document.getElementById('card-' + id);
  if (card) {
    card.classList.toggle('completed', state.challenges[id]);
    card.querySelector('.challenge-checkbox').textContent = state.challenges[id] ? '✓' : '';
  }
  renderProgressBars();
  updateRing(sectionId);
  updateMarkAllBtn(sectionId, 'challenges');
  applySearchAndFilter();
}

function updateMarkAllBtn(sectionId, type) {
  const sub = document.querySelector(`.subsection[data-section="${sectionId}"][data-type="${type}"]`);
  if (!sub) return;
  const btn     = sub.querySelector('.mark-all-btn');
  const section = LEARNING_PATH.find(s => s.id === sectionId);
  const allDone = type === 'lessons'
    ? section.lessons.every(l => state.lessons[l.id])
    : section.challenges.every(c => state.challenges[c.id]);
  btn.textContent = allDone ? 'Clear all' : 'Mark all';
  btn.setAttribute('onclick', `handleMarkAll(event,'${sectionId}','${type}',${allDone ? 'false' : 'true'})`);
}

function handleMarkAll(event, sectionId, type, value) {
  event.stopPropagation();
  const section = LEARNING_PATH.find(s => s.id === sectionId);
  if (type === 'lessons') {
    section.lessons.forEach(l => { state.lessons[l.id] = value; });
  } else {
    section.challenges.forEach(c => { state.challenges[c.id] = value; });
  }
  saveState();
  fullRerender();
}

// ─── Search & Filter ──────────────────────────────────────────────────────────

function handleSearch() {
  const raw = document.getElementById('search-input').value;
  searchQuery = raw.toLowerCase().trim();
  document.getElementById('search-clear').classList.toggle('visible', raw.length > 0);
  applySearchAndFilter();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  searchQuery = '';
  document.getElementById('search-clear').classList.remove('visible');
  applySearchAndFilter();
}

function handleFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-pill').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.filter === filter)
  );
  applySearchAndFilter();
}

function applySearchAndFilter() {
  document.querySelectorAll('.lesson-card, .challenge-card').forEach(card => {
    const id       = card.id.replace('card-', '');
    const isLesson = card.classList.contains('lesson-card');
    const section  = card.closest('.section-block');
    const level    = section ? section.dataset.level : '';
    let show = true;

    if (searchQuery) {
      show = card.textContent.toLowerCase().includes(searchQuery);
    }

    if (show && currentFilter !== 'all') {
      switch (currentFilter) {
        case 'lessons':     if (!isLesson)  show = false; break;
        case 'challenges':  if (isLesson)   show = false; break;
        case 'uncompleted': {
          const done = isLesson ? !!state.lessons[id] : !!state.challenges[id];
          if (done) show = false;
          break;
        }
        default:
          if (level !== currentFilter) show = false;
      }
    }

    card.style.display = show ? '' : 'none';
  });

  // hide subsections with no visible cards
  document.querySelectorAll('.subsection').forEach(sub => {
    const anyVisible = Array.from(sub.querySelectorAll('.lesson-card, .challenge-card'))
      .some(c => c.style.display !== 'none');
    sub.style.display = anyVisible ? '' : 'none';
  });

  // hide section blocks with no visible subsections
  document.querySelectorAll('.section-block').forEach(block => {
    const anyVisible = Array.from(block.querySelectorAll('.subsection'))
      .some(s => s.style.display !== 'none');
    block.style.display = anyVisible ? '' : 'none';
  });
}

// ─── Keyboard Navigation ──────────────────────────────────────────────────────

function getVisibleCards() {
  return Array.from(document.querySelectorAll('.lesson-card, .challenge-card'))
    .filter(c => c.style.display !== 'none' && c.offsetParent !== null);
}

function setFocusedCard(id) {
  if (focusedCardId) {
    const prev = document.getElementById('card-' + focusedCardId);
    if (prev) prev.classList.remove('card-focused');
  }
  focusedCardId = id;
  if (id) {
    const card = document.getElementById('card-' + id);
    if (card) {
      card.classList.add('card-focused');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      card.focus({ preventScroll: true });
    }
  }
}

function setupKeyboardNav() {
  document.addEventListener('keydown', function (e) {
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea') {
      if (e.key === 'Escape') {
        document.activeElement.blur();
        if (tag === 'input') clearSearch();
      }
      return;
    }

    const cards = getVisibleCards();
    const idx   = focusedCardId
      ? cards.findIndex(c => c.id === 'card-' + focusedCardId)
      : -1;

    switch (e.key) {
      case 'j':
      case 'ArrowDown': {
        e.preventDefault();
        const next = cards[idx + 1] || cards[0];
        if (next) setFocusedCard(next.id.replace('card-', ''));
        break;
      }
      case 'k':
      case 'ArrowUp': {
        e.preventDefault();
        const prev = cards[idx - 1] || cards[cards.length - 1];
        if (prev) setFocusedCard(prev.id.replace('card-', ''));
        break;
      }
      case ' ': {
        if (focusedCardId) {
          e.preventDefault();
          const card = document.getElementById('card-' + focusedCardId);
          if (card) card.click();
        }
        break;
      }
      case '/':
        e.preventDefault();
        document.getElementById('search-input').focus();
        break;
      case '?':
        showToast('j/↓ next  ·  k/↑ prev  ·  Space toggle  ·  / search  ·  Esc close', 'info');
        break;
      case 'Escape': {
        const modal = document.getElementById('reset-modal');
        if (modal.classList.contains('open')) {
          closeModal();
        } else {
          clearSearch();
        }
        break;
      }
    }
  });
}

// ─── Jump to Next ─────────────────────────────────────────────────────────────

function handleJumpNext() {
  for (const section of LEARNING_PATH) {
    for (const lesson of section.lessons) {
      if (!state.lessons[lesson.id]) {
        const card = document.getElementById('card-' + lesson.id);
        if (card && card.style.display !== 'none') {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setFocusedCard(lesson.id);
          setTimeout(() => { if (focusedCardId === lesson.id) { card.classList.remove('card-focused'); focusedCardId = null; } }, 1500);
          return;
        }
      }
    }
    for (const challenge of section.challenges) {
      if (!state.challenges[challenge.id]) {
        const card = document.getElementById('card-' + challenge.id);
        if (card && card.style.display !== 'none') {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setFocusedCard(challenge.id);
          setTimeout(() => { if (focusedCardId === challenge.id) { card.classList.remove('card-focused'); focusedCardId = null; } }, 1500);
          return;
        }
      }
    }
  }
  showToast('All items completed! 🎉', 'info');
}

// ─── Scroll Spy ───────────────────────────────────────────────────────────────

function setupScrollSpy() {
  if (scrollObserver) scrollObserver.disconnect();
  const mainEl = document.getElementById('main-content');
  scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateSidebarActive(entry.target.id.replace('section-', ''));
      }
    });
  }, { root: mainEl, threshold: 0.15, rootMargin: '-20% 0px -60% 0px' });
  document.querySelectorAll('.section-block').forEach(s => scrollObserver.observe(s));
}

// ─── Toast ────────────────────────────────────────────────────────────────────

let toastTimer = null;

function showToast(msg, type) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function handleResetClick() {
  document.getElementById('reset-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('reset-modal').classList.remove('open');
}

function confirmReset() {
  closeModal();
  state = defaultState();
  saveState();
  searchQuery = '';
  currentFilter = 'all';
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').classList.remove('visible');
  document.querySelectorAll('.filter-pill').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.filter === 'all')
  );
  fullRerender();
  showToast('Progress reset.', '');
}

// ─── Import / Export ──────────────────────────────────────────────────────────

function handleExport() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'gimp-learning-path-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function handleImportButton() {
  document.getElementById('import-file').click();
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    try {
      const parsed = JSON.parse(ev.target.result);
      const def    = defaultState();
      state = {
        version:    2,
        theme:      parsed.theme      || def.theme,
        lessons:    Object.assign({}, def.lessons,    parsed.lessons    || {}),
        challenges: Object.assign({}, def.challenges, parsed.challenges || {}),
        notes:      Object.assign({}, def.notes,      parsed.notes      || {})
      };
      saveState();
      applyTheme(state.theme);
      fullRerender();
      showToast('Progress imported!', 'info');
    } catch (err) {
      showToast('Import failed: invalid JSON.', 'error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

// ─── Full Re-Render ───────────────────────────────────────────────────────────

function fullRerender() {
  focusedCardId = null;
  renderSidebar();
  render();
  renderProgressBars();
  setupScrollSpy();
  applySearchAndFilter();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  const fromHash = decodeStateFromHash();
  state = fromHash || loadState();
  if (fromHash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  applyTheme(state.theme);
  fullRerender();
  updateSidebarActive(LEARNING_PATH[0].id);

  document.getElementById('search-input').addEventListener('input', handleSearch);
  document.getElementById('import-file').addEventListener('change', handleImportFile);

  setupKeyboardNav();
}

document.addEventListener('DOMContentLoaded', init);
