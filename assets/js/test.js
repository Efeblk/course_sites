/* "Did I understand it?" test — an honest check of one chapter/week.
 * The page loads <course>/data.js and <course>/guide.js, then this.
 *
 * Questions: every quick check of the guided lesson + random quiz questions, up to MAX.
 * No feedback during the test. For each answer you also say how sure you are, because a lucky guess
 * is not understanding:
 *   solid = right and sure · shaky = right but unsure/guessing · mistake = wrong but sure · gap = wrong / don't know
 * Verdict: understood = solid ≥ 80% and at most 1 confident mistake; partly = solid ≥ 50%; otherwise not yet.
 * Attempts are saved under test:<course>:<n>; CS.testStatus() reads them.
 */
(function () {
  const { el, fill, $, shuffle, progress } = CS;
  const C = window.COURSE, U = CS.unit;
  const n = Number(CS.param('ch')) || 1;
  const ch = C.chapters.find((c) => c.n === n);
  const g = (window.GUIDE || {})[n];
  const main = $('#test');
  const MAX = 15;
  const PASS = 0.8, HALF = 0.5;
  const KEY = `test:${C.id}:${n}`;

  document.title = `${U} ${n} Understanding test · ${C.code}`;
  if (!ch) { fill(main, el('h1', {}, 'No such ' + U.toLowerCase())); return; }

  const fromGuide = g ? g.steps.flatMap((s, i) => s.check
    ? [{ q: s.check.q, options: s.check.o, answer: 0, explain: s.check.why, step: i, stepTitle: s.t }] : []) : [];
  const seen = new Set(fromGuide.map((x) => x.q));
  const fromQuiz = ch.quiz.filter((x) => !seen.has(x.q));

  const head = [
    el('div', { class: 'small muted' }, `${C.code} · ${U} ${n}`),
    el('h1', { style: { marginTop: '4px' } }, `Did I understand it? — ${ch.title}`),
  ];

  function intro() {
    const quizAt = progress.visitedIn(C.id, `quiz-ch${n}`);
    const mins = quizAt ? Math.round((Date.now() - quizAt) / 60000) : null;
    const st = CS.testStatus(C.id, n);
    const tries = progress.get(KEY) || [];
    fill(main, head,
      el('div', { class: 'panel' },
        el('p', { style: { marginTop: 0 } }, `${Math.min(MAX, fromGuide.length + fromQuiz.length)} questions on the whole ${U.toLowerCase()}. It works differently from the quiz:`),
        el('ul', {},
          el('li', {}, el('b', {}, 'No hints and no feedback'), ' until the end, like a real exam.'),
          el('li', {}, 'After each answer you say ', el('b', {}, 'how sure you are'), '. A right answer you guessed does ', el('b', {}, 'not'), ' count as understood. In the exam a guess can go either way.'),
          el('li', {}, 'If you have no idea, press ', el('b', {}, '"I don\'t know"'), ' rather than guessing. That gives an honest result and shows you exactly what to review.'),
          el('li', {}, el('b', {}, 'Understood'), ` means: right and sure on at least ${PASS * 100}% of the questions, with at most 1 wrong answer you were sure about.`)),
        mins != null && mins < 180 ? el('div', { class: 'callout warn' },
          el('b', {}, 'Heads-up: '), `you opened the quiz ${mins < 1 ? 'just now' : mins + ' min ago'}. Some questions are the same, so you may remember the answers without understanding them. You'll get a more honest result if you take this test tomorrow, but you can still take it now.`) : null,
        tries.length ? el('p', { class: 'small muted' }, `Status: ${st.label}. ${st.tip} Attempts so far: ${tries.length}.`) : null,
        el('button', { class: 'primary', onclick: start }, 'Start the test')),
      tries.length ? history(tries) : null);
  }

  function history(tries) {
    const name = { yes: '✅ Understood', part: '🟡 Partly', no: '🔴 Not yet' };
    return el('div', { class: 'panel' }, el('h3', {}, 'Your earlier attempts'),
      el('table', { class: 't' },
        el('tr', {}, el('th', {}, 'When'), el('th', {}, 'Right & sure'), el('th', {}, 'Lucky / unsure'), el('th', {}, 'Sure but wrong'), el('th', {}, 'Gaps'), el('th', {}, 'Result')),
        tries.slice().reverse().map((t) => el('tr', {},
          el('td', {}, new Date(t.at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })),
          el('td', { class: 'num' }, `${t.solid}/${t.total}`), el('td', { class: 'num' }, t.shaky),
          el('td', { class: 'num' }, t.mis), el('td', { class: 'num' }, t.gap), el('td', {}, name[t.verdict])))));
  }

  let qs, i, answers;
  function start() {
    // keep every lesson check, fill the rest with quiz questions
    qs = shuffle([...fromGuide.slice(0, MAX), ...shuffle(fromQuiz).slice(0, Math.max(0, MAX - fromGuide.length))]);
    i = 0; answers = [];
    ask();
  }

  function ask() {
    const item = qs[i];
    const opts = shuffle(item.options.map((text, k) => ({ text, right: k === item.answer })));
    let pick = null;
    const conf = el('div', { class: 'conf', style: { display: 'none' } },
      el('div', { class: 'check-h' }, 'How sure are you? Be honest. Nobody else sees this.'),
      el('div', { class: 'row' },
        [['sure', '😎 Sure, I could explain why'], ['unsure', '🤔 Not sure'], ['guess', '🎲 Guessing']].map(([c, label]) =>
          el('button', { onclick: () => lock(pick, c) }, label))));
    const btns = opts.map((o, k) => el('button', { class: 'opt', onclick: () => {
      pick = o;
      btns.forEach((b, j) => b.classList.toggle('sel', j === k));
      idk.classList.remove('sel');
      conf.style.display = '';
    } }, `${k + 1}. ${o.text}`));
    const idk = el('button', { class: 'opt idk', onclick: () => lock(null, 'idk') }, "🤷 I don't know");

    function lock(o, c) {
      answers.push({ item, right: !!(o && o.right), conf: c, picked: o ? o.text : null });
      i++;
      i < qs.length ? ask() : result();
    }

    fill(main, head,
      el('div', { class: 'progressbar' }, el('div', { style: { width: `${(100 * i) / qs.length}%` } })),
      el('div', { class: 'panel' },
        el('div', { class: 'muted small' }, `Question ${i + 1} of ${qs.length}`),
        el('div', { class: 'quiz-q' }, item.q), btns, idk, conf));
  }

  function kind(a) {
    if (a.right) return a.conf === 'sure' ? 'solid' : 'shaky';
    return a.conf === 'sure' ? 'mis' : 'gap';
  }

  function result() {
    const by = { solid: [], shaky: [], mis: [], gap: [] };
    answers.forEach((a) => by[kind(a)].push(a));
    const total = answers.length, solid = by.solid.length, raw = solid + by.shaky.length;
    const sp = solid / total;
    let verdict = sp >= PASS ? 'yes' : sp >= HALF ? 'part' : 'no';
    const downgraded = by.mis.length >= 2 && verdict !== 'no';
    if (downgraded) verdict = verdict === 'yes' ? 'part' : 'no';

    const tries = progress.get(KEY) || [];
    tries.push({ at: Date.now(), total, solid, shaky: by.shaky.length, mis: by.mis.length, gap: by.gap.length, verdict });
    progress.set(KEY, tries);
    const st = CS.testStatus(C.id, n);

    const pct = (x) => Math.round((100 * x) / total);
    const title = {
      yes: st.v === 'confirmed' ? `✅ You understand ${U} ${n}, and it has stuck.` : `✅ You understand ${U} ${n}.`,
      part: `🟡 You partly understand ${U} ${n}.`,
      no: `🔴 Honestly: you don't understand ${U} ${n} yet.`,
    }[verdict];
    const text = {
      yes: st.v === 'confirmed'
        ? 'You have now passed on two different days, so this is real understanding and not short-term memory. Before the exam, a quick look at the flashcards is enough.'
        : `You were right and sure on ${solid} of ${total}. Memory fades quickly, so take this test once more in 2–3 days. If you pass again, it counts as confirmed.`,
      part: 'You know some of it, but not all. The list below shows exactly what to fix. Fix those parts, then take the test again tomorrow.',
      no: `That is normal after only one pass, so it is not bad news. ${g ? 'Go through the guided lesson steps listed below again, doing the labs, not just reading.' : 'Go back over the simulations.'} Then take the test again tomorrow.`,
    }[verdict];

    const box = (cls, h, why, list) => list.length ? el('div', { class: `callout ${cls}` },
      el('b', {}, `${h} (${list.length})`), el('div', { class: 'small muted', style: { margin: '2px 0 6px' } }, why),
      list.map((a) => el('div', { class: 'review-item' },
        el('div', {}, el('b', {}, a.item.q)),
        a.picked && !a.right ? el('div', { class: 'small' }, '✗ You said: ', a.picked) : null,
        el('div', { class: 'small' }, '✓ ', a.item.options[a.item.answer]),
        el('div', { class: 'small muted' }, a.item.explain || ''),
        a.item.step != null ? el('a', { class: 'small', href: `learn.html?ch=${n}&step=${a.item.step}` }, `→ Re-learn: lesson step ${a.item.step + 1}, “${a.item.stepTitle}”`) : null))) : null;

    const steps = [...new Map([...by.mis, ...by.gap, ...by.shaky].filter((a) => a.item.step != null)
      .map((a) => [a.item.step, a.item.stepTitle])).entries()].sort((a, b) => a[0] - b[0]);

    fill(main, head,
      el('div', { class: `panel verdict v-${verdict}` },
        el('h2', { style: { marginTop: 0 } }, title),
        el('p', {}, text),
        downgraded ? el('p', {}, el('b', {}, 'Why not higher: '), `you were sure about ${by.mis.length} wrong answers. That is the most dangerous kind of mistake, because you would never think to review it.`) : null,
        el('div', { class: 'stats' },
          el('div', { class: 'stat' }, el('b', {}, `${pct(solid)}%`), el('span', {}, 'right & sure (counts)')),
          el('div', { class: 'stat' }, el('b', {}, by.shaky.length), el('span', {}, 'right but unsure / guessed')),
          el('div', { class: 'stat' }, el('b', {}, by.mis.length), el('span', {}, 'sure but wrong')),
          el('div', { class: 'stat' }, el('b', {}, by.gap.length), el('span', {}, "wrong / didn't know"))),
        el('p', { class: 'small muted' },
          `Plain score: ${raw}/${total} (${pct(raw)}%). Guessing on every question would still give about 25%, so the plain score always looks better than your real understanding. Only "right & sure" counts here.`),
        by.shaky.length >= 3 && verdict !== 'no' ? el('p', { class: 'small' }, `${by.shaky.length} answers were right even though you were not sure. You may know more than you think, but in the exam those could go either way, so read them below.`) : null),
      steps.length ? el('div', { class: 'panel' },
        el('h3', { style: { marginTop: 0 } }, 'What to do now'),
        el('ol', {}, steps.map(([k, t]) => el('li', {}, el('a', { href: `learn.html?ch=${n}&step=${k}` }, `Lesson step ${k + 1}: ${t}`)))),
        el('p', { class: 'small muted' }, 'Then read the list below, and take the test again tomorrow, not straight away.')) : null,
      box('bad', 'Sure but wrong: read these first', "You thought you knew these. That's a misunderstanding, so fix it now.", by.mis),
      box('warn', "Wrong or didn't know", 'These are gaps. Learn them.', by.gap),
      box('', 'Right but unsure or guessed', 'Right this time, but not something you can count on yet.', by.shaky),
      by.solid.length ? el('details', { class: 'panel' }, el('summary', {}, `Right and sure (${by.solid.length}): nothing to do`),
        el('ul', {}, by.solid.map((a) => el('li', { class: 'small' }, a.item.q)))) : null,
      el('div', { class: 'row', style: { marginTop: '14px' } },
        el('a', { class: 'btn', href: `learn.html?ch=${n}` }, 'Guided lesson'),
        el('a', { class: 'btn', href: `index.html#ch${n}` }, `Back to ${U} ${n}`),
        el('a', { class: 'btn', href: `${CS.root}/progress.html` }, '📊 My progress'),
        el('button', { onclick: intro }, 'Take it again')));
    scrollTo(0, 0);
  }

  document.addEventListener('keydown', (e) => {
    if (!/^[1-9]$/.test(e.key)) return;
    const o = main.querySelectorAll('.opt:not(.idk)')[Number(e.key) - 1];
    if (o) o.click();
  });

  progress.markVisited(`test-ch${n}`);
  intro();
})();
