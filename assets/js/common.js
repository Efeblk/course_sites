/* Course Sites — shared helpers.
 * Every page sets <body data-root="../.." data-course="coe303" data-chapter="1"
 * data-activity="ch1-interrupts" data-title="..."> and loads this file last-ish.
 * Course pages that load their data.js first expose it as window.COURSE.
 */
(function () {
  const body = document.body;
  /* light/dark choice from the top-bar toggle (embedded labs read it too); no choice = follow the OS */
  try { const t = localStorage.getItem('course-sites:theme'); if (t) document.documentElement.dataset.theme = t; } catch {}
  const root = (body.dataset.root || '.').replace(/\/$/, '');
  /* inside a guided lesson's iframe? */
  let embedded = false;
  try { embedded = window.self !== window.top; } catch { embedded = true; }

  /* course folder → label in the top bar and what a numbered unit is called */
  const COURSES = {
    coe303: { code: 'COE303', unit: 'Chapter' },
    coe025: { code: 'COE025', unit: 'Week' },
    coe305: { code: 'COE305', unit: 'Week' },
    uni480: { code: 'UNI480', unit: 'Week' },
  };
  const course = COURSES[body.dataset.course];
  const unit = course ? course.unit : 'Chapter';

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') for (const [p, x] of Object.entries(v)) p.startsWith('--') ? n.style.setProperty(p, x) : (n.style[p] = x);
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      n.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }
  /* replaceChildren that, like el(), flattens arrays and skips null/false */
  function fill(node, ...kids) {
    node.replaceChildren(...kids.flat(Infinity).filter((k) => k != null && k !== false));
    return node;
  }
  const $ = (sel, r = document) => r.querySelector(sel);
  const $$ = (sel, r = document) => [...r.querySelectorAll(sel)];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const param = (name) => new URLSearchParams(location.search).get(name);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---- progress (localStorage; works on file:// too) ---- */
  const KEY = 'course-sites:v1';
  /* ids are per course; COE303 predates this and keeps its bare ids */
  const nsFor = (c, id) => (!c || c === 'coe303' ? id : `${c}:${id}`);
  const ns = (id) => nsFor(body.dataset.course, id);
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }
  const progress = {
    get(k) { return load()[k]; },
    set(k, v) { const s = load(); s[k] = v; save(s); },
    visited(id) { return !!load()['visit:' + ns(id)]; },
    markVisited(id) { progress.set('visit:' + ns(id), Date.now()); },
    best(id) { return load()['best:' + ns(id)]; },
    /* the same, for any course (used by the progress page, which belongs to no course) */
    visitedIn(c, id) { return load()['visit:' + nsFor(c, id)]; },
    bestIn(c, id) { return load()['best:' + nsFor(c, id)]; },
    all: load,
    recordScore(id, score, total) {
      const prev = progress.best(id);
      if (!prev || score / total > prev.score / prev.total) progress.set('best:' + ns(id), { score, total });
    },
  };

  /* ---- understanding test status (attempts saved by test.js under test:<course>:<n>) ---- */
  const day = (t) => new Date(t).toDateString();
  function testStatus(c, n) {
    const tries = progress.get(`test:${c}:${n}`) || [];
    const last = tries[tries.length - 1];
    if (!last) return { v: 'none', label: 'Not tested', cls: '', tip: 'Take the understanding test to find out.' };
    const yesDays = new Set(tries.filter((t) => t.verdict === 'yes').map((t) => day(t.at)));
    if (last.verdict === 'yes' && yesDays.size >= 2)
      return { v: 'confirmed', label: 'Understood', cls: 'done', last, tip: 'Passed on two different days, so it has stuck.' };
    if (last.verdict === 'yes')
      return { v: 'yes', label: 'Understood once', cls: 'done', last, tip: 'Passed once. Take it again on another day to confirm it has stuck.' };
    if (last.verdict === 'part') return { v: 'part', label: 'Partly', cls: 'quiz', last, tip: 'Some parts are not clear yet.' };
    return { v: 'no', label: 'Not yet', cls: 'bad', last, tip: 'Not understood yet.' };
  }

  /* ---- spaced repetition (the daily review). Every card and question you answer gets a box;
   * right moves it up a box (back in 1, 3, 7, 16, 35, 90 days), wrong sends it back to the start (again in 10 minutes). ---- */
  const DAYS = [1, 3, 7, 16, 35, 90];
  const startOfDay = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const srs = {
    cardId: (c, n, term) => `${c}|${n}|c|${term}`,
    qId: (c, n, q) => `${c}|${n}|q|${String(q).replace(/<[^>]+>/g, '').slice(0, 90)}`,
    all: () => progress.get('srs') || {},
    get: (id) => srs.all()[id], // [box, due, last answer time]; box -1 = just got it wrong
    grade(id, ok) {
      const m = srs.all(), b = m[id] ? m[id][0] : -1, now = Date.now();
      const nb = ok ? Math.min(b + 1, DAYS.length - 1) : -1;
      m[id] = [nb, ok ? startOfDay(now) + DAYS[nb] * 864e5 : now + 6e5, now];
      progress.set('srs', m);
      return m[id];
    },
    due: (id, now = Date.now()) => { const e = srs.all()[id]; return !!e && e[1] <= now; },
    dueCount() { const now = Date.now(); return Object.values(srs.all()).filter((e) => e[1] <= now).length; },
  };

  /* ---- every course's data.js + guide.js, for pages that span courses (home, search, review).
   * Each file sets window.COURSE / GUIDE, so load them one at a time and put the page's own back afterwards. ---- */
  let allCourses;
  function loadCourses() {
    const add = (src) => new Promise((ok) => {
      const s = document.createElement('script');
      s.src = src; s.onload = s.onerror = () => { s.remove(); ok(); };
      document.head.append(s);
    });
    return (allCourses ||= (async () => {
      const keep = [window.COURSE, window.GUIDE], out = {};
      for (const dir of Object.keys(COURSES)) {
        window.COURSE = window.GUIDE = null;
        await add(`${root}/${dir}/data.js`); await add(`${root}/${dir}/guide.js`);
        if (window.COURSE) out[dir] = { C: window.COURSE, G: window.GUIDE || {}, U: COURSES[dir].unit };
      }
      [window.COURSE, window.GUIDE] = keep;
      return out;
    })());
  }

  /* ---- search everything (top bar, Ctrl+K or /): lesson steps, labs, flashcards, quiz questions ---- */
  const plain = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const norm = (s) => s.toLowerCase().replace(/ı/g, 'i').normalize('NFD').replace(/\p{M}/gu, '');
  let index;
  async function searchIndex() {
    if (index) return index;
    const all = await loadCourses(), out = [];
    const add = (kind, title, text, where, href, w) => out.push({ kind, title, text, where, href: `${root}/${href}`, w, n: norm(title + ' ' + text), nt: norm(title) });
    for (const [dir, { C, G, U }] of Object.entries(all)) {
      const u = U === 'Week' ? 'Week' : 'Ch', code = C.code;
      for (const ch of C.chapters) {
        const g = G[ch.n], at = `${code} · ${u} ${ch.n}`;
        add('Lesson', ch.title, ch.summary, `${code} · ${U} ${ch.n}`, g ? `${dir}/learn.html?ch=${ch.n}` : `${dir}/index.html#ch${ch.n}`, 4);
        if (g) g.steps.forEach((s, k) => add('Step', s.t, plain(s.key) + ' ' + plain(s.html), `${at} · step ${k + 1}`, `${dir}/learn.html?ch=${ch.n}&step=${k}`, 3));
        for (const a of ch.activities || []) add('Lab', a.title, a.desc, at, `${dir}/${a.href}`, 2);
        for (const [t, d] of ch.cards || []) add('Term', t, d, at, `${dir}/learn.html?ch=${ch.n}&step=${g ? g.steps.length : 0}`, 2);
        for (const q of ch.quiz || []) add('Quiz', plain(q.q), q.options[q.answer] + ' ' + plain(q.explain), at, `${dir}/quiz.html?ch=${ch.n}`, 0);
      }
    }
    return (index = out);
  }
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  function mark(s, terms) {
    // highlight on the original text, using positions found in the normalized one (same length for Latin text)
    const n = norm(s);
    if (n.length !== s.length) return esc(s);
    const hit = new Array(s.length).fill(false);
    for (const t of terms) for (let i = n.indexOf(t); i >= 0; i = n.indexOf(t, i + 1)) hit.fill(true, i, i + t.length);
    let o = '', open = false;
    for (let i = 0; i < s.length; i++) {
      if (hit[i] !== open) { o += hit[i] ? '<mark>' : '</mark>'; open = hit[i]; }
      o += esc(s[i]);
    }
    return o + (open ? '</mark>' : '');
  }
  function snippet(e, terms) {
    const n = norm(e.text), i = Math.max(0, ...terms.map((t) => n.indexOf(t)).filter((i) => i >= 0).slice(0, 1));
    const a = Math.max(0, i - 50), s = e.text.slice(a, a + 150);
    return (a ? '…' : '') + mark(s, terms) + (a + 150 < e.text.length ? '…' : '');
  }
  let palette;
  function openSearch() {
    if (palette) { palette.showModal(); palette.querySelector('input').select(); return; }
    const input = el('input', { type: 'search', placeholder: 'Search lessons, labs, terms, quiz questions…', 'aria-label': 'Search' });
    const list = el('div', { class: 'sr-list', role: 'listbox' });
    const foot = el('div', { class: 'sr-foot' }, el('span', {}, el('kbd', {}, '↑'), el('kbd', {}, '↓'), ' move · ', el('kbd', {}, 'Enter'), ' open · ', el('kbd', {}, 'Esc'), ' close'));
    palette = el('dialog', { class: 'search' }, el('div', { class: 'sr-box' }, input, list, foot));
    palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
    let sel = 0;
    const pick = (k) => {
      const items = [...list.querySelectorAll('a')];
      if (!items.length) return;
      sel = (k + items.length) % items.length;
      items.forEach((a, j) => a.classList.toggle('on', j === sel));
      items[sel].scrollIntoView({ block: 'nearest' });
    };
    const run = async () => {
      const q = input.value, terms = norm(q).split(/\s+/).filter(Boolean);
      if (!terms.length) { fill(list, el('p', { class: 'sr-empty' }, 'Type a word: "deadlock", "TF-IDF", "k-means", "sepsis"…')); return; }
      const idx = await searchIndex();
      if (input.value !== q) return;
      const res = idx.filter((e) => terms.every((t) => e.n.includes(t)))
        .map((e) => ({ e, s: e.w + terms.reduce((a, t) => a + (e.nt.includes(t) ? 6 : 0) + (e.nt.startsWith(t) ? 3 : 0), 0) }))
        .sort((a, b) => b.s - a.s).slice(0, 40);
      sel = 0;
      fill(list, res.length ? res.map(({ e }, j) => el('a', { href: e.href, class: j ? '' : 'on' },
        el('span', { class: 'sr-kind' }, e.kind),
        el('span', { class: 'sr-main' }, el('b', { html: mark(e.title, terms) }), el('span', { class: 'sr-where' }, e.where),
          e.text ? el('span', { class: 'sr-snip', html: snippet(e, terms) }) : null)))
        : el('p', { class: 'sr-empty' }, `Nothing found for "${q}".`));
    };
    input.addEventListener('input', run);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); pick(sel + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); pick(sel - 1); }
      if (e.key === 'Enter') { const a = list.querySelectorAll('a')[sel]; if (a) location.href = a.href; }
    });
    body.append(palette);
    palette.showModal();
    run();
  }
  if (!embedded) document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openSearch(); }
  });

  /* ---- top bar ---- */
  function topbar() {
    const d = body.dataset;
    const parts = [el('a', { class: 'brand', href: `${root}/index.html` }, 'Course Sites')];
    if (course) {
      parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html` }, course.code));
      if (d.chapter) parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html#ch${d.chapter}` }, `${unit} ${d.chapter}`));
    }
    if (d.title) parts.push(el('span', { class: 'sep' }, '/'), el('span', { class: 'here' }, d.title));
    const due = srs.dueCount();
    parts.push(
      el('button', { class: 'find', title: 'Search everything (Ctrl+K or /)', onclick: openSearch }, 'Search', el('kbd', {}, '/')),
      el('a', { class: 'rev', href: `${root}/review.html`, title: 'Spaced-repetition review of cards and questions' }, 'Review', due ? el('span', { class: 'due' }, due) : null),
      el('a', { href: `${root}/progress.html` }, 'My progress'));
    const isDark = () => (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
    const tb = el('button', { class: 'theme', title: 'Switch light / dark' });
    const label = () => { tb.textContent = isDark() ? 'Light' : 'Dark'; };
    tb.onclick = () => { const t = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = t; localStorage.setItem('course-sites:theme', t); label();
      for (const fr of document.querySelectorAll('iframe')) try { fr.contentDocument.documentElement.dataset.theme = t; } catch {} };
    label();
    parts.push(tb);
    body.prepend(el('header', { class: 'topbar' }, el('div', { class: 'inner' }, parts)));
    if (d.title && !document.title) document.title = `${d.title} · Course Sites`;
  }

  /* ---- footer back-link ---- */
  function footer() {
    const d = body.dataset;
    const main = $('main');
    if (!main || !d.chapter || d.nofooter != null) return;
    main.append(el('div', { class: 'footer-nav' },
      el('a', { class: 'btn', href: `${root}/${d.course}/index.html#ch${d.chapter}` }, `← Back to ${unit} ${d.chapter}`)));
  }

  /* ---- tiny log helper ---- */
  function logger(node, max = 200) {
    return function log(msg, cls) {
      const line = el('div', { class: cls || '' }, msg);
      node.prepend(line);
      while (node.children.length > max) node.lastChild.remove();
      return line;
    };
  }

  /* ---- embedded in a guided lesson (iframe): no top bar, report height, open lesson pages in the top window ---- */
  function embedMode() {
    body.classList.add('embedded');
    const post = () => {
      const m = $('main') || body;
      parent.postMessage({ cs: 'height', h: Math.ceil(m.getBoundingClientRect().bottom + window.scrollY) + 4 }, '*');
    };
    new ResizeObserver(post).observe(body);
    window.addEventListener('load', post);
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (a && /(^|\/)(learn|index|progress)\.html/.test(a.getAttribute('href'))) a.target = '_top';
    });
  }

  window.CS = { el, fill, $, $$, shuffle, param, sleep, progress, logger, root, unit, COURSES, testStatus, embedded, srs, loadCourses, openSearch, plain };

  if (embedded) embedMode();
  else { topbar(); footer(); }
  if (body.dataset.activity) progress.markVisited(body.dataset.activity);
})();
