/* Daily review: spaced repetition over every course's flashcards, lesson checks and quiz questions.
 * The schedule itself is CS.srs (common.js). Lesson checks, quizzes and flashcards add to it as you use them,
 * so this page mostly asks again what you met before, plus a few new ones from chapters you have started.
 */
(async function () {
  const { el, fill, shuffle, srs, progress } = CS;
  const box = document.getElementById('review');
  const all = await CS.loadCourses();
  const SIZE = 20, NEW = 8;
  let keys = null; // key handler of the card on screen

  /* ---- everything that can be reviewed ---- */
  const items = [], ids = new Set();
  const push = (it) => { if (!ids.has(it.id)) { ids.add(it.id); items.push(it); } };
  for (const { C, G, U } of Object.values(all)) for (const ch of C.chapters) {
    const at = { c: C.id, code: C.code, n: ch.n, unit: U, chT: ch.title };
    for (const [t, d] of ch.cards || []) push({ ...at, id: srs.cardId(C.id, ch.n, t), kind: 'card', front: t, back: d });
    (G[ch.n] ? G[ch.n].steps : []).forEach((s, k) => s.check && push({ ...at, id: srs.qId(C.id, ch.n, s.check.q), kind: 'q', q: s.check.q, opts: s.check.o, right: 0, why: s.check.why, step: k, stepT: s.t }));
    for (const q of ch.quiz || []) push({ ...at, id: srs.qId(C.id, ch.n, q.q), kind: 'q', q: q.q, opts: q.options, right: q.answer, why: q.explain });
  }
  const chKey = (it) => `${it.c}:${it.n}`;
  const where = (it) => `${it.code} · ${it.unit === 'Week' ? 'Week' : 'Ch'} ${it.n}`;
  const lessonHref = (it) => `${it.c}/learn.html?ch=${it.n}${it.step != null ? `&step=${it.step}` : ''}`;

  /* chapters you have started: a lesson step done, a test taken, or anything already answered */
  function startedSet() {
    const s = new Set(), seen = srs.all();
    for (const it of items) if (seen[it.id] || (progress.get(`guide:${it.c}:${it.n}`) || []).length || progress.get(`test:${it.c}:${it.n}`)) s.add(chKey(it));
    return s;
  }

  const saved = progress.get('review:prefs') || {};
  const prefs = { off: new Set(saved.off || []), scope: saved.scope || 'started' };
  const savePrefs = () => progress.set('review:prefs', { off: [...prefs.off], scope: prefs.scope });

  function pool() {
    const st = startedSet();
    const scope = prefs.scope === 'started' && st.size ? 'started' : 'all';
    return { scope, st, list: items.filter((it) => !prefs.off.has(it.c) && (scope === 'all' || st.has(chKey(it)))) };
  }

  const fmtNext = (t) => {
    const d = new Date(t), now = new Date(), days = Math.round((new Date(d).setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)) / 864e5);
    if (days <= 0) return `today at ${d.toTimeString().slice(0, 5)}`;
    if (days === 1) return 'tomorrow';
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  };

  /* ---- the start screen ---- */
  function home() {
    keys = null;
    const { scope, st, list } = pool(), m = srs.all(), now = Date.now();
    const due = list.filter((it) => m[it.id] && m[it.id][1] <= now);
    const fresh = list.filter((it) => !m[it.id]);
    const learned = list.filter((it) => m[it.id] && m[it.id][0] >= 2).length;
    const later = list.filter((it) => m[it.id] && m[it.id][1] > now).map((it) => m[it.id][1]).sort((a, b) => a - b);
    const nNew = Math.min(fresh.length, NEW, Math.max(0, SIZE - due.length));
    const nDue = Math.min(due.length, SIZE);

    const courseChips = Object.values(all).map(({ C }) => {
      const on = !prefs.off.has(C.id);
      const d = items.filter((it) => it.c === C.id && m[it.id] && m[it.id][1] <= now).length;
      return el('button', { class: 'chip' + (on ? ' active' : ''), 'aria-pressed': on, onclick: () => { on ? prefs.off.add(C.id) : prefs.off.delete(C.id); savePrefs(); home(); } },
        C.code, d ? el('span', { class: 'rv-n' }, d) : null);
    });
    const scopeChips = [['started', `Chapters I've started${st.size ? ` (${st.size})` : ''}`], ['all', 'Everything']].map(([v, t]) =>
      el('button', { class: 'chip' + (scope === v ? ' active' : ''), disabled: v === 'started' && !st.size, onclick: () => { prefs.scope = v; savePrefs(); home(); } }, t));

    fill(box,
      el('div', { class: 'rv-filters' },
        el('div', { class: 'row' }, el('span', { class: 'rv-lab' }, 'Courses'), courseChips),
        el('div', { class: 'row' }, el('span', { class: 'rv-lab' }, 'From'), scopeChips)),
      !st.size ? el('p', { class: 'small muted' }, 'You have not started a lesson yet, so this uses everything. Once you work through lessons, it sticks to what you have met.') : null,
      el('div', { class: 'stats rv-stats' },
        el('div', { class: 'stat' }, el('b', {}, due.length), el('span', {}, 'due now')),
        el('div', { class: 'stat' }, el('b', {}, fresh.length), el('span', {}, 'not seen yet')),
        el('div', { class: 'stat' }, el('b', {}, learned), el('span', {}, 'learned (box 3+)')),
        el('div', { class: 'stat' }, el('b', {}, list.length), el('span', {}, 'in this pool'))),
      nDue + nNew
        ? el('div', { class: 'rv-go' },
          el('button', { class: 'primary rv-start', onclick: () => session(shuffle(due.sort((a, b) => m[a.id][1] - m[b.id][1]).slice(0, nDue)).concat(shuffle(fresh).slice(0, nNew))) },
            `Start: ${nDue ? `${nDue} to review` : ''}${nDue && nNew ? ' + ' : ''}${nNew ? `${nNew} new` : ''}`),
          el('span', { class: 'small muted' }, `about ${Math.max(2, Math.round((nDue + nNew) * 0.35))} min · `, el('kbd', {}, 'Space'), ' flip · ', el('kbd', {}, '1'), '–', el('kbd', {}, '4'), ' answer · ', el('kbd', {}, 'Enter'), ' next'))
        : el('div', { class: 'callout ok' }, el('b', {}, 'Nothing due. '), later.length ? `Next review: ${fmtNext(later[0])} (${later.filter((t) => t <= new Date(later[0]).setHours(23, 59, 59, 999)).length} items).` : 'Answer some lesson checks or flashcards first.'),
      later.length && (nDue + nNew) ? el('p', { class: 'small muted' }, `After this, the next ones are due ${fmtNext(later[0])}.`) : null);
  }

  /* ---- one round ---- */
  function session(queue) {
    const total = queue.length, missed = new Map();
    let done = 0, firstRight = 0;
    const firstTry = new Set(queue.map((it) => it.id));

    function answer(it, ok) {
      srs.grade(it.id, ok);
      if (ok && firstTry.has(it.id)) firstRight++;
      firstTry.delete(it.id);
      if (ok) done++;
      else { missed.set(it.id, it); queue.splice(Math.min(queue.length, 3), 0, it); } // comes back in this round
    }
    function next() { queue.shift(); queue.length ? show() : end(); }

    function show() {
      const it = queue[0];
      const head = el('div', { class: 'rv-head' },
        el('span', {}, where(it), ' · ', it.kind === 'card' ? 'flashcard' : it.step != null ? 'lesson check' : 'quiz'),
        el('span', {}, `${done} / ${total}`));
      const bar = el('div', { class: 'rv-bar' }, el('i', { style: { width: `${(100 * done) / total}%` } }));
      const card = el('section', { class: 'rv-card' });
      fill(box, bar, head, card, el('div', { class: 'row', style: { marginTop: '14px' } }, el('button', { class: 'chip', onclick: home }, 'Stop')));

      if (it.kind === 'card') {
        let flipped = false;
        const back = el('div', { class: 'rv-back', hidden: true }, it.back);
        const act = el('div', { class: 'row rv-act' });
        const flip = () => {
          if (flipped) return;
          flipped = true; back.hidden = false;
          fill(act,
            el('button', { class: 'danger', onclick: () => { answer(it, false); next(); } }, '← Again'),
            el('button', { class: 'primary', onclick: () => { answer(it, true); next(); } }, 'Got it →'));
        };
        fill(act, el('button', { class: 'primary', onclick: flip }, 'Show answer'));
        fill(card, el('div', { class: 'rv-term' }, it.front), el('p', { class: 'small muted' }, 'Say it out loud first, then flip.'), back, act);
        keys = (e) => {
          if (e.key === ' ' || (e.key === 'Enter' && !flipped)) { e.preventDefault(); flip(); }
          else if (flipped && e.key === 'ArrowRight') { answer(it, true); next(); }
          else if (flipped && e.key === 'ArrowLeft') { answer(it, false); next(); }
        };
      } else {
        const opts = shuffle(it.opts.map((text, k) => ({ text, right: k === it.right })));
        const fb = el('div');
        let answered = false;
        const go = el('button', { class: 'primary', hidden: true, onclick: next }, queue.length > 1 ? 'Next →' : 'Finish');
        const btns = opts.map((o, k) => el('button', { class: 'opt', onclick: () => {
          if (answered) return;
          answered = true;
          btns.forEach((b, j) => { b.disabled = true; if (opts[j].right) b.classList.add('right'); });
          if (!o.right) btns[k].classList.add('wrong');
          answer(it, o.right);
          fill(fb, el('div', { class: 'callout ' + (o.right ? 'ok' : 'bad') }, el('b', {}, o.right ? 'Correct. ' : 'Not quite. '), el('span', { html: it.why || '' }),
            !o.right && it.step != null ? el('div', { class: 'small', style: { marginTop: '6px' } }, 'Re-read: ', el('a', { href: lessonHref(it) }, it.stepT)) : null,
            !o.right ? el('div', { class: 'small muted', style: { marginTop: '4px' } }, 'It comes back in a few questions.') : null));
          go.hidden = false; go.focus();
        } }, el('span', { class: 'rv-k' }, k + 1), el('span', { html: o.text })));
        fill(card, el('div', { class: 'quiz-q', html: it.q }), btns, fb, go);
        keys = (e) => {
          if (/^[1-9]$/.test(e.key)) btns[Number(e.key) - 1]?.click();
          else if (e.key === 'Enter' && answered && document.activeElement !== go) next();
        };
      }
    }

    function end() {
      keys = null;
      const m = srs.all(), later = Object.values(m).map((e) => e[1]).filter((t) => t > Date.now()).sort((a, b) => a - b);
      fill(box,
        el('div', { class: 'rv-bar' }, el('i', { style: { width: '100%' } })),
        el('section', { class: 'rv-card rv-end' },
          el('h2', {}, `${firstRight} of ${total} right first time`),
          el('p', { class: 'muted' }, firstRight === total ? 'Clean round. These now wait longer before they come back.' : 'The ones you missed start again from the shortest gap, so you will see them again soon.'),
          missed.size ? el('div', {}, el('h3', {}, 'Missed this round'), el('ul', { class: 'rv-missed' }, [...missed.values()].map((it) => el('li', {},
            el('span', { class: 'muted small' }, where(it), ' '), it.kind === 'card' ? el('b', {}, it.front) : el('span', { html: it.q }), ' ',
            el('a', { class: 'small', href: lessonHref(it) }, 'lesson →'))))) : null,
          later.length ? el('p', { class: 'small muted' }, `Next review: ${fmtNext(later[0])}.`) : null,
          el('div', { class: 'row' }, el('button', { class: 'primary', onclick: home }, 'Done'), el('a', { class: 'btn', href: 'index.html' }, 'Home'))));
    }
    show();
  }

  document.addEventListener('keydown', (e) => {
    if (!keys || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('dialog[open]')) return;
    keys(e);
  });
  home();
})();
