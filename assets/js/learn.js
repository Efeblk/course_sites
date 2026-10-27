/* Guided lesson engine — teaches one chapter/week step by step.
 * The page loads <course>/data.js (window.COURSE) and <course>/guide.js (window.GUIDE), then this.
 *
 * GUIDE[n] = {
 *   goal: 'what you can do at the end', time: '≈ 60 min',
 *   videos: [['what it explains', 'YouTube search words'], ...],
 *   steps: [{
 *     t: 'step title',
 *     html: `teaching text (HTML)`,
 *     lab:   { href: 'w1/x.html', todo: ['do this', 'then this'] },     // optional: "do it now"
 *     check: { q: 'question', o: ['right answer', 'wrong', ...], why: 'explanation' },  // optional
 *   }, ...],
 * }
 * A final "Practice & test yourself" step is added automatically from the chapter's games, quiz and cards.
 */
(function () {
  const { el, fill, $, shuffle, progress } = CS;
  const C = window.COURSE, U = CS.unit;
  const n = Number(CS.param('ch')) || 1;
  const ch = C.chapters.find((c) => c.n === n);
  const g = (window.GUIDE || {})[n];
  const main = $('#learn');

  document.title = `${U} ${n} Guided Lesson · ${C.code}`;
  if (!ch || !g) {
    fill(main, el('h1', {}, 'No guided lesson yet'), el('p', {}, `${U} ${n} does not have a guided lesson yet.`));
    return;
  }

  const KEY = `guide:${C.id}:${n}`;
  const done = new Set(progress.get(KEY) || []);
  const saveDone = () => progress.set(KEY, [...done]);
  const labOf = (href) => ch.activities.find((a) => a.href === href);
  const games = Object.entries(C.games).filter(([, gm]) => gm.ch === n);
  const next = C.chapters.find((c) => c.n === n + 1);

  const steps = [...g.steps, { t: 'Practice & test yourself', practice: true }];
  const askStep = CS.param('step'); // the test links straight to a step to re-learn
  let cur = Math.min(Number(askStep ?? progress.get(KEY + ':at')) || 0, steps.length - 1);

  const nav = el('ol', { class: 'steps-nav' });
  const stage = el('div', { class: 'panel step-body' });
  const bar = el('div', { class: 'progressbar' }, el('div', {}));

  fill(main,
    el('div', { class: 'small muted' }, `${C.code} · ${U} ${n} · Guided lesson`),
    el('h1', { style: { marginTop: '4px' } }, ch.title),
    el('div', { class: 'panel intro' },
      el('div', {}, el('b', {}, '🎯 Goal: '), g.goal),
      el('div', { class: 'small muted', style: { marginTop: '4px' } },
        `${g.time || ''}${g.time ? ' · ' : ''}${steps.length} steps. Go in order: read → do the lab → answer the check → next. Labs open in a new tab, so keep this tab open.`),
      g.videos && g.videos.length ? el('details', { class: 'videos', open: done.size === 0 },
        el('summary', {}, '🎬 Prefer a video first? Watch one of these, then come back'),
        el('ul', {}, g.videos.map(([label, q]) => el('li', {},
          el('a', { href: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q), target: '_blank', rel: 'noopener' }, `▶ ${label}`),
          el('span', { class: 'muted small' }, ` — search: "${q}"`)))),
        el('p', { class: 'small muted' }, 'The links open a YouTube search (needs internet). Pick a short video from that channel; the site itself works offline.')) : null),
    bar,
    el('div', { class: 'learn' }, el('aside', {}, nav), stage));

  function go(i) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    progress.set(KEY + ':at', cur);
    draw();
    stage.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  function finish(i) { done.add(i); saveDone(); }

  function drawNav() {
    fill(nav, steps.map((s, i) => el('li', { class: [i === cur ? 'on' : '', done.has(i) ? 'done' : ''].join(' '), onclick: () => go(i) },
      el('span', { class: 'dot' }, done.has(i) ? '✓' : String(i + 1)), el('span', {}, s.t))));
    $('div', bar).style.width = `${(100 * [...done].filter((i) => i < steps.length).length) / steps.length}%`;
  }

  function checkBox(c, i) {
    const opts = shuffle(c.o.map((text, k) => ({ text, right: k === 0 })));
    const fb = el('div');
    const box = el('div', { class: 'check' }, el('div', { class: 'check-h' }, '✋ Quick check'), el('div', { class: 'quiz-q' }, c.q));
    const btns = opts.map((o) => el('button', { class: 'opt', onclick: () => {
      btns.forEach((b, k) => { b.disabled = true; if (opts[k].right) b.classList.add('right'); });
      if (!o.right) btns[opts.indexOf(o)].classList.add('wrong');
      fill(fb, el('div', { class: 'callout ' + (o.right ? 'ok' : 'bad') }, el('b', {}, o.right ? 'Correct. ' : 'Not quite. '), c.why || ''));
      finish(i); drawNav();
    } }, o.text));
    box.append(...btns, fb);
    return box;
  }

  function labBox(l) {
    const a = labOf(l.href);
    return el('div', { class: 'labbox' },
      el('div', { class: 'check-h' }, '🧪 Do it now'),
      el('div', {}, el('b', {}, a ? a.title : l.href), a ? el('span', { class: 'muted small' }, ' — ' + a.desc) : null),
      el('ol', {}, l.todo.map((t) => el('li', { html: t }))),
      el('a', { class: 'btn primary-btn', href: l.href, target: '_blank' }, 'Open the lab in a new tab ↗'));
  }

  function practice() {
    const best = progress.best(`quiz-ch${n}`);
    return [
      el('p', {}, 'You have seen every idea of this ' + U.toLowerCase() + '. Now make it stick — in this order:'),
      el('ol', { class: 'plan' },
        el('li', {}, el('b', {}, 'Games (10 min). '), 'Quick drills on the vocabulary and the steps. Do each until you get it all right.',
          el('div', { class: 'row', style: { marginTop: '6px' } }, games.map(([id, gm]) => el('a', { class: 'btn', href: `game.html?id=${id}`, target: '_blank' },
            (progress.visited(`game-${id}`) ? '✓ ' : '') + gm.title)))),
        el('li', {}, el('b', {}, 'Quiz (15 min). '), `${ch.quiz.length} exam-style questions with explanations. Read every explanation, also when you were right. Aim for 80%+, then repeat it another day.`,
          best ? el('span', { class: 'muted' }, ` Your best so far: ${best.score}/${best.total}.`) : null,
          el('div', { style: { marginTop: '6px' } }, el('a', { class: 'btn', href: `quiz.html?ch=${n}`, target: '_blank' }, `Start the ${U} ${n} quiz ↗`))),
        el('li', {}, el('b', {}, 'Flashcards (5 min, and again before the exam). '), `${ch.cards.length} key terms. Say the answer out loud before flipping.`,
          el('div', { style: { marginTop: '6px' } }, el('a', { class: 'btn', href: `cards.html?ch=${n}`, target: '_blank' }, 'Open flashcards ↗'))),
        el('li', {}, el('b', {}, 'Exam traps. '), 'The mistakes students make most often:',
          el('table', { class: 't', style: { marginTop: '6px' } },
            el('tr', {}, el('th', {}, 'Students often say…'), el('th', {}, 'Correct version')),
            ch.traps.map(([a, b]) => el('tr', {}, el('td', {}, a), el('td', {}, b))))),
        el('li', {}, el('b', {}, 'Did I really understand it? (10 min, best tomorrow). '),
          'An honest test. You get no hints, and you say how sure you are for every answer, so lucky guesses do not count. It tells you which steps to redo.',
          el('div', { style: { marginTop: '6px' } }, el('a', { class: 'btn primary-btn', href: `test.html?ch=${n}` }, `🎯 Take the ${U} ${n} understanding test`),
            el('span', { class: 'muted small' }, '  Status: ' + CS.testStatus(C.id, n).label)))),
      el('div', { class: 'callout ok' }, next
        ? ['When the quiz goes well, continue with ', el('a', { href: `learn.html?ch=${next.n}` }, `${U} ${next.n}: ${next.title} →`)]
        : 'This is the last ' + U.toLowerCase() + ' for now. Repeat the quizzes of earlier weeks before the exam — mixing topics is the best practice.'),
    ];
  }

  function draw() {
    const s = steps[cur];
    if (s.practice) finish(cur);
    else if (!s.check) finish(cur); // reading-only steps count as done when opened
    drawNav();
    fill(stage,
      el('div', { class: 'small muted' }, `Step ${cur + 1} of ${steps.length}`),
      el('h2', { style: { marginTop: '2px' } }, s.t),
      s.practice ? practice() : [el('div', { class: 'teach', html: s.html }), s.lab ? labBox(s.lab) : null, s.check ? checkBox(s.check, cur) : null],
      el('div', { class: 'row step-nav' },
        cur > 0 ? el('button', { onclick: () => go(cur - 1) }, '← Back') : null,
        el('span', { style: { flex: 1 } }),
        cur < steps.length - 1 ? el('button', { class: 'primary', onclick: () => go(cur + 1) }, 'Next step →') : el('a', { class: 'btn', href: `index.html#ch${n}` }, `Back to ${U} ${n}`)));
  }

  progress.markVisited(`learn-ch${n}`);
  draw();
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input,select,textarea')) return;
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });
})();
