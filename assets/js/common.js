/* Course Sites — shared helpers.
 * Every page sets <body data-root="../.." data-course="coe303" data-chapter="1"
 * data-activity="ch1-interrupts" data-title="..."> and loads this file last-ish.
 * Course pages that load their data.js first expose it as window.COURSE.
 */
(function () {
  const body = document.body;
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
      else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
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
  const ns = (id) => (!body.dataset.course || body.dataset.course === 'coe303' ? id : `${body.dataset.course}:${id}`);
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
    recordScore(id, score, total) {
      const prev = progress.best(id);
      if (!prev || score / total > prev.score / prev.total) progress.set('best:' + ns(id), { score, total });
    },
  };

  /* ---- top bar ---- */
  function topbar() {
    const d = body.dataset;
    const parts = [el('a', { class: 'brand', href: `${root}/index.html` }, 'Course Sites')];
    if (course) {
      parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html` }, course.code));
      if (d.chapter) parts.push(el('span', { class: 'sep' }, '/'), el('a', { href: `${root}/${d.course}/index.html#ch${d.chapter}` }, `${unit} ${d.chapter}`));
    }
    if (d.title) parts.push(el('span', { class: 'sep' }, '/'), el('span', { class: 'here' }, d.title));
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

  window.CS = { el, fill, $, $$, shuffle, param, sleep, progress, logger, root, unit };

  topbar();
  footer();
  if (body.dataset.activity) progress.markVisited(body.dataset.activity);
})();
