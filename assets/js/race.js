/* Race-condition stepper: two threads/processes each run
 *   reg = counter;  reg = reg ± 1;  counter = reg;
 * and the learner picks the interleaving. Used by ch3/ipc.html and ch4/race.html.
 *
 *   RaceStepper(node, {
 *     start: 5,
 *     actors: [{ name: 'Producer', op: +1, reg: 'register1', color }, { name: 'Consumer', op: -1, reg: 'register2', color }],
 *     presets: { 'Slide 62 order': [0, 0, 1, 1, 0, 1] },
 *   })
 */
(function () {
  const { el } = window.CS;

  window.RaceStepper = function RaceStepper(root, cfg) {
    const A = cfg.actors;
    let pc, regs, counter, hist;
    const lines = (a) => [
      `${a.reg} = counter`,
      `${a.reg} = ${a.reg} ${a.op > 0 ? '+' : '-'} 1`,
      `counter = ${a.reg}`,
    ];
    const expected = cfg.start + A.reduce((s, a) => s + a.op, 0);

    function reset() {
      pc = A.map(() => 0);
      regs = A.map(() => null);
      counter = cfg.start;
      hist = [];
      render();
    }
    function exec(i) {
      if (pc[i] >= 3) return;
      const a = A[i];
      if (pc[i] === 0) regs[i] = counter;
      else if (pc[i] === 1) regs[i] = regs[i] + a.op;
      else counter = regs[i];
      hist.push({ i, text: lines(a)[pc[i]], note: pc[i] === 2 ? `counter = ${counter}` : `${a.reg} = ${regs[i]}` });
      pc[i]++;
      render();
    }
    async function play(seq) {
      reset();
      for (const i of seq) { await new Promise((r) => setTimeout(r, 450)); exec(i); }
    }

    function render() {
      const finished = pc.every((p) => p >= 3);
      window.CS.fill(root, 
        el('div', { class: 'cols' },
          ...A.map((a, i) => el('div', { class: 'box' },
            el('h4', { style: { margin: '0 0 6px', color: a.color } }, `${a.name}: counter${a.op > 0 ? '++' : '--'}`),
            el('div', { class: 'codeview' }, lines(a).map((t, k) => el('div', { class: pc[i] === k ? 'on' : '', style: k < pc[i] ? { opacity: .55 } : {} }, `${k < pc[i] ? '✓' : pc[i] === k ? '▶' : ' '} ${t}`))),
            el('div', { class: 'row', style: { marginTop: '8px' } },
              el('button', { class: 'primary', disabled: pc[i] >= 3, onclick: () => exec(i) }, `Run next ${a.name} instruction`),
              el('span', { class: 'mono small' }, `${a.reg} = ${regs[i] ?? '?'}`)))),
          el('div', { class: 'box' },
            el('h4', { style: { margin: '0 0 6px' } }, 'Shared memory'),
            el('div', { style: { fontSize: '2rem', fontFamily: 'var(--mono)' } }, `counter = ${counter}`),
            el('div', { class: 'muted small' }, `started at ${cfg.start} · correct result: ${expected}`),
            el('ol', { class: 'small mono', style: { paddingLeft: '22px' } },
              hist.map((h, k) => el('li', { style: { color: A[h.i].color } }, `S${k}: ${A[h.i].name.toLowerCase()} ${h.text}  {${h.note}}`))))),
        el('div', { class: 'row', style: { marginTop: '10px' } },
          el('button', { onclick: reset }, 'Reset'),
          ...Object.entries(cfg.presets || {}).map(([name, seq]) => el('button', { onclick: () => play(seq) }, `▶ ${name}`))),
        finished ? el('div', { class: `callout ${counter === expected ? 'ok' : 'bad'}` },
          counter === expected
            ? `counter = ${counter} ✓ — this interleaving happened to be safe: one finished its store before the other loaded.`
            : `counter = ${counter} ✗ (should be ${expected}) — a lost update! One side loaded counter before the other stored its result, so one change overwrote the other. This is a race condition; the fix (mutual exclusion) is Chapter 6.`) : null,
      );
    }
    reset();
    return { reset, play };
  };
})();
