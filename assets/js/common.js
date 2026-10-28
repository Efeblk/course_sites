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

  /* ---- top bar ---- */
  function topbar() {
    const d = body.dataset;
    const parts = [el('a', { class: 'brand', href: `${root}/index.html` }, 'Course Sites')];
    if (course) {
      parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html` }, course.code));
      if (d.chapter) parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html#ch${d.chapter}` }, `${unit} ${d.chapter}`));
    }
    if (d.title) parts.push(el('span', { class: 'sep' }, '/'), el('span', { class: 'here' }, d.title));
    parts.push(el('a', { class: 'mine', href: `${root}/progress.html` }, 'My progress'));
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
  let embedded = false;
  try { embedded = window.self !== window.top; } catch { embedded = true; }
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

  window.CS = { el, fill, $, $$, shuffle, param, sleep, progress, logger, root, unit, COURSES, testStatus, embedded };

  if (embedded) embedMode();
  else { topbar(); footer(); }
  if (body.dataset.activity) progress.markVisited(body.dataset.activity);
})();
