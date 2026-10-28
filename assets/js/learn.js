/* Guided lesson engine — teaches one chapter/week step by step. This is the main part of the site.
 * The page loads <course>/data.js (window.COURSE), <course>/guide.js (window.GUIDE), common.js, figs.js, then this.
 *
 * GUIDE[n] = {
 *   goal: 'what you can do at the end', time: '≈ 60 min',
 *   videos: [['what it explains', 'YouTube search words'], ...],
 *   steps: [{
 *     t: 'step title',
 *     key: 'the one-sentence big idea of this step',                       // optional, shown first
 *     fig: { type: 'flow', ... } or [fig, ...],                            // optional diagram(s), see figs.js
 *     html: `teaching text (HTML)`,
 *     lab:   { href: 'w1/x.html', todo: ['do this', 'then this'] },     // optional: the lab, embedded in the page
 *     check: { q: 'question', o: ['right answer', 'wrong', ...], why: 'explanation' },  // optional
 *   }, ...],
 * }
 * A final "Practice & test yourself" step is added automatically: the chapter's games, quiz, flashcards,
 * exam traps and understanding test, all embedded. ?step=k opens step k directly.
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
  const askStep = CS.param('step'); // the understanding test links straight to a step to re-learn
  let cur = Math.min(Number(askStep ?? progress.get(KEY + ':at')) || 0, steps.length - 1);

  /* ---- embedded pages (labs, games, quiz…) tell us their height; see common.js ---- */
  window.addEventListener('message', (e) => {
    if (!e.data || e.data.cs !== 'height') return;
    for (const f of document.querySelectorAll('iframe.embed-frame'))
      if (f.contentWindow === e.source) f.style.height = Math.max(260, e.data.h) + 'px';
  });
  function embed(href, title) {
    const frame = el('iframe', { class: 'embed-frame', src: href, title, loading: 'lazy' });
    return el('div', { class: 'embed' },
      el('div', { class: 'embed-bar' },
        el('span', { class: 'embed-title' }, title),
        el('span', { style: { flex: 1 } }),
        el('button', { class: 'chip', onclick: () => { frame.src = href; } }, 'Restart'),
        el('a', { class: 'btn chip', href, target: '_blank' }, 'Open full page ↗')),
      frame);
  }

  /* ---- page skeleton ---- */
  const nav = el('ol', { class: 'steps-nav' });
  const stage = el('article', { class: 'step-card' });
  const barFill = el('div');
  const barText = el('span', { class: 'small muted' });

  fill(main,
    el('header', { class: 'lesson-hero' },
      el('div', { class: 'kicker' }, `${C.code} — ${U} ${n} — guided lesson`),
      el('h1', {}, ch.title),
      el('p', { class: 'goal' }, el('b', {}, 'By the end you can: '), g.goal),
      el('div', { class: 'row hero-meta' },
        el('span', { class: 'pill' }, `${steps.length} steps`),
        g.time ? el('span', { class: 'pill' }, 'about ' + g.time.replace('≈', '').trim()) : null,
        el('span', { class: 'pill' }, 'read, look, try, check')),
      el('div', { class: 'hero-progress' }, el('div', { class: 'progressbar' }, barFill), barText),
      g.videos && g.videos.length ? el('details', { class: 'videos' },
        el('summary', {}, `Prefer a video first? ${g.videos.length} YouTube searches`),
        el('div', { class: 'video-grid' }, g.videos.map(([label, q]) =>
          el('a', { class: 'video-card', href: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q), target: '_blank', rel: 'noopener' },
            el('span', { class: 'play' }, '▶'), el('span', {}, el('b', {}, label), el('span', { class: 'muted small' }, `YouTube: "${q}"`))))),
        el('p', { class: 'small muted' }, 'These links open a YouTube search, so you need internet. Choose a short video from the results. The rest of the site works offline.')) : null),
    el('div', { class: 'lesson-grid' }, el('aside', {}, el('div', { class: 'aside-h' }, 'Steps'), nav), stage));

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
    const d = [...done].filter((i) => i < steps.length).length;
    barFill.style.width = `${(100 * d) / steps.length}%`;
    barText.textContent = d >= steps.length ? 'All steps done' : `${d} of ${steps.length} steps done`;
  }

  function checkBox(c, i) {
    const opts = shuffle(c.o.map((text, k) => ({ text, right: k === 0 })));
    const fb = el('div');
    const box = el('section', { class: 'check' }, el('div', { class: 'sec-h' }, 'Check', el('b', {}, 'Did that make sense?')), el('div', { class: 'quiz-q' }, c.q));
    const btns = opts.map((o) => el('button', { class: 'opt', onclick: () => {
      btns.forEach((b, k) => { b.disabled = true; if (opts[k].right) b.classList.add('right'); });
      if (!o.right) btns[opts.indexOf(o)].classList.add('wrong');
      fill(fb, el('div', { class: 'callout ' + (o.right ? 'ok' : 'bad') }, el('b', {}, o.right ? 'Correct. ' : 'Not quite. '), c.why || '',
        o.right ? null : el('div', { class: 'small', style: { marginTop: '6px' } }, 'Read the big idea and the picture above again before you go on.')));
      finish(i); drawNav();
    } }, o.text));
    box.append(...btns, fb);
    return box;
  }

  function labBox(l) {
    const a = labOf(l.href);
    const title = a ? a.title : l.href;
    return el('section', { class: 'try' },
      el('div', { class: 'sec-h' }, 'Try it yourself', el('b', {}, title)),
      a ? el('p', { class: 'small muted', style: { margin: '2px 0 8px' } }, a.desc) : null,
      el('ol', { class: 'todo' }, l.todo.map((t) => {
        const li = el('li', { html: t });
        li.prepend(el('input', { type: 'checkbox', onchange: (e) => li.classList.toggle('ticked', e.target.checked) }));
        return li;
      })),
      el('p', { class: 'small muted' }, 'The lab runs right here. Tick each task when you have done it.'),
      embed(l.href, title));
  }

  /* ---- the final step: everything to practise, embedded, as tabs ---- */
  function practice() {
    const best = progress.best(`quiz-ch${n}`);
    const st = CS.testStatus(C.id, n);
    const panel = el('div', { class: 'tab-panel' });
    const tabs = [
      ['Games', `${games.length} quick drills on the words and the steps. Play each one until you get everything right.`, () => {
        const pick = el('div', { class: 'row', style: { margin: '6px 0 10px' } });
        const holder = el('div');
        const show = (id, gm, btn) => {
          pick.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === btn));
          fill(holder, embed(`game.html?id=${id}`, gm.title));
        };
        games.forEach(([id, gm], k) => {
          const b = el('button', { class: 'chip', onclick: () => show(id, gm, b) }, (progress.visited(`game-${id}`) ? '✓ ' : '') + gm.title);
          pick.append(b);
          if (k === 0) setTimeout(() => show(id, gm, b));
        });
        return [pick, holder];
      }],
      ['Quiz', `${ch.quiz.length} exam-style questions, each with an explanation. Read every explanation, even when you got it right. Aim for 80% or more.` + (best ? ` Your best so far: ${best.score}/${best.total}.` : ''),
        () => embed(`quiz.html?ch=${n}`, `${U} ${n} Quiz`)],
      ['Flashcards', `${ch.cards.length} key terms. Say the answer out loud before you flip the card.`, () => embed(`cards.html?ch=${n}`, 'Flashcards')],
      ['Exam traps', 'The mistakes students make most often. Cover the right column and try to fix each mistake yourself.', () =>
        el('table', { class: 't' },
          el('tr', {}, el('th', {}, 'Students often say…'), el('th', {}, 'Correct version')),
          ch.traps.map(([a, b]) => el('tr', {}, el('td', {}, a), el('td', {}, b))))],
      ['Did I understand it?', `An honest final test. There are no hints, and you say how sure you are about each answer, so a lucky guess doesn't count. It's best taken tomorrow, not straight after the lesson. Status: ${st.label}.`,
        () => embed(`test.html?ch=${n}`, 'Understanding test')],
    ];
    const bar = el('div', { class: 'tabs' });
    const open = (k) => {
      bar.querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', j === k));
      fill(panel, el('p', { class: 'muted' }, tabs[k][1]), tabs[k][2]());
    };
    tabs.forEach(([label], k) => bar.append(el('button', { onclick: () => open(k) }, label)));
    setTimeout(() => open(0));
    return [
      el('div', { class: 'bigidea plain' }, el('div', { class: 'sec-h' }, 'You have seen every idea of this ' + U.toLowerCase()),
        el('div', {}, 'Now make it stick. Work through the tabs from left to right: games (10 min), quiz (15 min), flashcards (5 min), exam traps. Come back tomorrow for the understanding test.')),
      bar, panel,
      el('div', { class: 'callout ok' }, next
        ? ['When the quiz goes well, continue with ', el('a', { href: `learn.html?ch=${next.n}` }, `${U} ${next.n}: ${next.title} →`)]
        : 'This is the last ' + U.toLowerCase() + ' for now. Before the exam, redo the quizzes of earlier weeks, because mixing topics is the best practice.'),
    ];
  }

  function draw() {
    const s = steps[cur];
    stage.classList.remove('enter');
    requestAnimationFrame(() => stage.classList.add('enter'));
    if (s.practice || !s.check) finish(cur); // reading-only steps count as done when opened
    drawNav();
    fill(stage,
      el('div', { class: 'step-kicker' }, `Step ${cur + 1} of ${steps.length}`),
      el('h2', { class: 'step-title' }, s.t),
      s.practice ? practice() : [
        s.key ? el('div', { class: 'bigidea' }, el('div', { class: 'sec-h' }, 'The big idea'), el('div', { html: s.key })) : null,
        s.fig ? CS.figure(s.fig) : null,
        el('div', { class: 'teach', html: s.html }),
        s.lab ? labBox(s.lab) : null,
        s.check ? checkBox(s.check, cur) : null,
      ],
      el('div', { class: 'row step-nav' },
        cur > 0 ? el('button', { onclick: () => go(cur - 1) }, '← Back') : null,
        el('span', { style: { flex: 1 } }),
        cur < steps.length - 1
          ? el('button', { class: 'primary big-btn', onclick: () => go(cur + 1) }, `Next: ${steps[cur + 1].t} →`)
          : el('a', { class: 'btn', href: `index.html#ch${n}` }, `Back to ${U} ${n}`)));
  }

  progress.markVisited(`learn-ch${n}`);
  progress.set('last-lesson', { course: C.id, n, at: Date.now() }); // for "Continue" on the home page
  draw();
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input,select,textarea')) return;
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });
})();
