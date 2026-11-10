/* Course hub (<course>/index.html): one page layout for every course.
 *
 * Reads window.COURSE (data.js) and window.GUIDE (guide.js). Optional fields in data.js:
 *   COURSE.exam = { title, when, scope, length, parts: [[name, points, note]], plan: [[href, label, minutes]], done }
 *   COURSE.resources = [{ kind, href, title, desc, meta }]   kind: past | summary | mock | drill | scenarios | videos
 * The page shows, top to bottom: the exam and what to do first, everything the course contains (with counts),
 * then one compact row per chapter with its lesson progress and practice links.
 */
(function () {
  const { el, progress } = CS;
  const C = window.COURSE, G = window.GUIDE || {}, U = CS.unit;
  const short = { Week: 'W', Lecture: 'L' }[U] || 'Ch';
  const sum = (f) => C.chapters.reduce((s, ch) => s + f(ch), 0);
  const games = Object.entries(C.games || {});
  const lessonSteps = (ch) => (G[ch.n] ? G[ch.n].steps.length + 1 : 0);
  const lessonDone = (ch) => Math.min((progress.get(`guide:${C.id}:${ch.n}`) || []).length, lessonSteps(ch));
  const KIND = { past: 'Past exams', summary: 'Summary', mock: 'Mock exam', drill: 'Drill', scenarios: 'Scenarios', videos: 'Videos' };

  document.title = `${C.code} — ${C.name} · Course Sites`;
  const main = document.querySelector('main');
  const out = [];

  out.push(el('div', { class: 'mono small muted' }, C.code),
    el('h1', { class: 'hub-title' }, C.name),
    el('p', { class: 'hub-meta' }, [C.term, C.lecturer].filter(Boolean).join(' · ')));

  /* ---------------- exam + "start here" */
  const X = C.exam;
  if (X && X.done) {
    out.push(el('p', { class: 'hub-exam-done' }, el('b', {}, `${X.title} taken`), ' · ',
      [X.when, X.scope, (X.parts || []).map((p) => p[0].toLowerCase()).join(' + ')].filter(Boolean).join(' · ')));
  } else if (X) {
    const total = (X.parts || []).reduce((s, p) => s + (p[1] || 0), 0);
    out.push(el('section', { class: 'hub-exam' + (X.done ? ' done' : '') },
      el('div', { class: 'he-head' },
        el('div', { class: 'kicker' }, X.label || (X.done ? 'Exam (already taken)' : 'Next exam')),
        el('h2', {}, X.title),
        el('div', { class: 'he-facts' }, [X.when, X.scope, X.length].filter(Boolean).map((t) => el('span', {}, t)))),
      X.parts && X.parts.length ? el('div', { class: 'he-parts' }, X.parts.map(([name, pts, note]) =>
        el('div', { class: 'he-part', style: { flexGrow: String(pts || 1) } },
          el('b', {}, name), pts ? el('span', { class: 'pts' }, `${pts} pts`) : null, note ? el('span', { class: 'note' }, note) : null))) : null,
      total && total !== 100 ? el('p', { class: 'small muted' }, `${total} points in total`) : null,
      X.plan && X.plan.length ? el('div', { class: 'he-plan' },
        el('div', { class: 'kicker' }, X.done ? 'What helped' : 'Start here'),
        el('ol', {}, X.plan.map(([href, label, min]) => el('li', {},
          el('a', { href }, label), min ? el('span', { class: 'muted small' }, ` · ${min}`) : null)))) : null));
  }

  /* ---------------- everything in this course */
  const steps = sum(lessonSteps), done = sum(lessonDone), lessons = C.chapters.filter((ch) => G[ch.n]).length;
  const labs = sum((ch) => (ch.activities || []).length);
  const prepLabel = X && X.done ? `${X.title} prep` : 'For the exam';
  const res = (C.resources || []).map((r) => ({ ...r, group: prepLabel }));
  const cards = [
    ...res,
    lessons && { group: 'Learn & practice', kind: 'lessons', href: '#chapters', title: 'Guided lessons', meta: `${lessons} lessons · ${steps} steps`,
      desc: done ? `${done} of ${steps} steps done. Each lesson teaches one ${U.toLowerCase()} from zero.` : `Teach each ${U.toLowerCase()} from zero, step by step, with labs inside.`, bar: steps ? done / steps : 0 },
    { group: 'Learn & practice', kind: 'quiz', href: '#chapters', title: 'Quizzes', meta: `${sum((ch) => (ch.quiz || []).length)} questions`, desc: `One per ${U.toLowerCase()}, with explanations.` },
    { group: 'Learn & practice', kind: 'cards', href: '#chapters', title: 'Flashcards', meta: `${sum((ch) => (ch.cards || []).length)} cards`, desc: 'Key terms: flip, then mark known or again.' },
    labs && { group: 'Learn & practice', kind: 'labs', href: '#chapters', title: 'Labs', meta: `${labs} labs`, desc: 'Interactive simulations to try the idea yourself.' },
    games.length && { group: 'Learn & practice', kind: 'games', href: '#chapters', title: 'Games', meta: `${games.length} games`, desc: 'Put in order, sort into groups, match pairs.' },
    { group: 'Learn & practice', kind: 'review', href: '../review.html', title: 'Daily review', meta: `${CS.srs.dueCount()} due`, desc: 'What you answered comes back before you forget it (all courses).' },
  ].filter(Boolean);
  const groups = [prepLabel, 'Learn & practice'].map((g) => [g, cards.filter((c) => c.group === g)]).filter(([, l]) => l.length);
  out.push(el('section', { class: 'hub-res' },
    el('h2', {}, 'In this course'),
    groups.map(([g, list]) => el('div', { class: 'res-group' },
      el('div', { class: 'res-label' }, g),
      el('div', { class: 'res-grid' }, list.map((c) => el('a', { class: `res-card k-${c.kind}`, href: c.href },
        KIND[c.kind] ? el('div', { class: 'rc-kind' }, KIND[c.kind]) : null,
        el('div', { class: 'rc-title' }, c.title),
        c.meta ? el('div', { class: 'rc-meta' }, c.meta) : null,
        el('p', {}, c.desc || ''),
        c.bar != null ? el('div', { class: 'progressbar' }, el('div', { style: { width: `${100 * c.bar}%` } })) : null)))))));

  /* ---------------- chapters */
  function actCard({ href, title, desc, kind, id }) {
    const v = id && progress.visited(id);
    return el('a', { class: 'card', href },
      el('h3', {}, el('span', {}, title), el('span', { class: `tag ${v ? 'done' : kind}` }, v ? 'done' : kind)),
      el('p', {}, desc));
  }
  const rows = C.chapters.map((ch) => {
    const tot = lessonSteps(ch), d = lessonDone(ch), st = CS.testStatus(C.id, ch.n);
    const at = Number(progress.get(`guide:${C.id}:${ch.n}:at`)) || 0;
    const chGames = games.filter(([, g]) => g.ch === ch.n);
    const best = progress.best(`quiz-ch${ch.n}`);
    const label = !tot ? null : d === 0 ? 'Start lesson' : d >= tot ? 'Review lesson' : `Continue, step ${at + 1}`;
    return el('section', { class: 'ch-row', id: `ch${ch.n}` },
      el('div', { class: 'cr-main' },
        el('span', { class: 'cr-num' }, `${short}${ch.n}`),
        el('div', { class: 'cr-body' },
          el('h3', {}, ch.title, ' ', el('span', { class: `tag ${st.cls}` }, st.label)),
          tot ? el('div', { class: 'cr-prog' }, el('div', { class: 'progressbar' }, el('div', { style: { width: `${(100 * d) / tot}%` } })),
            el('span', { class: 'small muted' }, `${d}/${tot} steps`)) : null,
          el('div', { class: 'cr-links' },
            el('a', { href: `quiz.html?ch=${ch.n}` }, `Quiz · ${ch.quiz.length}`, best ? ` (best ${best.score}/${best.total})` : ''),
            el('a', { href: `cards.html?ch=${ch.n}` }, `Flashcards · ${ch.cards.length}`),
            el('a', { href: `test.html?ch=${ch.n}` }, 'Did I understand it?'))),
        label ? el('a', { class: 'btn' + (d && d < tot ? ' primary-btn' : ''), href: `learn.html?ch=${ch.n}` }, label + ' →') : null),
      el('details', { class: 'cr-more' },
        el('summary', {}, `More: ${(ch.activities || []).length} labs, ${chGames.length} games, takeaways and exam traps`),
        (ch.activities || []).length ? [el('h4', {}, 'Labs'), el('div', { class: 'act-list' }, ch.activities.map((a) => actCard({ ...a, kind: 'sim' })))] : null,
        chGames.length ? [el('h4', {}, 'Games'), el('div', { class: 'act-list' }, chGames.map(([id, g]) => actCard({
          id: `game-${id}`, href: `game.html?id=${id}`, title: g.title, kind: 'game',
          desc: { order: 'Put in order', bucket: 'Sort into groups', match: 'Match pairs' }[g.type] + ' — ' + g.intro })))] : null,
        el('h4', {}, 'Key takeaways'),
        el('ul', {}, (ch.takeaways || []).map((t) => el('li', {}, t))),
        (ch.traps || []).length ? el('table', { class: 't' },
          el('tr', {}, el('th', {}, 'Students often say…'), el('th', {}, 'Correct version')),
          ch.traps.map(([a, b]) => el('tr', {}, el('td', {}, a), el('td', {}, b)))) : null));
  });
  out.push(el('section', { class: 'hub-chapters', id: 'chapters' },
    el('h2', {}, `${U}s`), rows));

  out.push(el('section', { class: 'hub-info' },
    el('h2', {}, 'Course info'),
    C.examFormat ? el('p', {}, el('b', {}, 'Grading: '), C.examFormat) : null,
    C.textbooks && C.textbooks.length ? [el('h4', {}, 'Textbooks'), el('ul', {}, C.textbooks.map((t) => el('li', {}, t)))] : null,
    C.projects && C.projects.length ? [el('h4', {}, 'Projects'), el('ul', {}, C.projects.map((t) => el('li', {}, t)))] : null,
    el('p', { class: 'muted small' }, `Local copies of the course files are in materials/${C.code}/ (not published).`)));

  main.replaceChildren(...out.flat(Infinity).filter(Boolean));
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();
