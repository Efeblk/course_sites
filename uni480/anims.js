/* UNI480 animated diagrams (see assets/js/anim.js for the API). Used as  fig: { type: 'anim', name } in guide.js.
 * All patient numbers are illustrative, as in the lessons. */
(function () {
  const def = CS.anim.def;

  /* ---------- W1: a ward monitoring agent senses, decides and acts ---------- */
  def('agent', { w: 700, h: 330 }, (A) => {
    const S = [['hr', 'Heart rate', '96 /min', false, '> 110'], ['rr', 'Breathing', '27 /min', true, '> 24'], ['sp', 'SpO₂', '89 %', true, '< 92'], ['tp', 'Temperature', '37.0 °C', false, '> 38.3']];
    const SY = (i) => 62 + i * 66;
    A.text('h1', { tx: 95, ty: 18, text: 'environment', size: 10.5, c: 'mute', mono: true });
    A.text('h2', { tx: 285, ty: 18, text: 'sensors', size: 10.5, c: 'mute', mono: true });
    A.text('h3', { tx: 488, ty: 18, text: 'agent function', size: 10.5, c: 'mute', mono: true });
    A.text('h4', { tx: 636, ty: 18, text: 'actuator', size: 10.5, c: 'mute', mono: true });
    A.box('pat', { tx: 95, ty: 160, w: 150, h: 120, text: 'Bed 4', sub: 'breathing problem', c: 'c3' });
    S.forEach(([id, name], i) => {
      A.line('ls' + id, { x1: 172, y1: 160, x2: 218, y2: SY(i), c: 'mute', sw: 1 });
      A.box(id, { tx: 285, ty: SY(i), w: 132, h: 46, text: name, sub: 'waiting…', c: 'c0', fs: 12 });
      A.line('la' + id, { x1: 352, y1: SY(i), x2: 404, y2: 160, c: 'mute', sw: 1 });
      A.dot('q' + id, { tx: 172, ty: 160, r: 5, c: 'c0', o: 0 });
    });
    A.box('fn', { tx: 488, ty: 160, w: 166, h: 92, text: 'abnormal: 0', sub: 'rule: 2 or more → alert', c: 'c2' });
    A.line('lp', { x1: 572, y1: 160, x2: 590, y2: 160, c: 'mute', head: true });
    A.box('pg', { tx: 636, ty: 160, w: 86, h: 60, text: 'pager', sub: 'quiet', c: 'c4', fill: 'ghost' });
    A.dot('qa', { tx: 572, ty: 160, r: 6, c: 'c4', o: 0 });
    A.text('perf', { tx: 350, ty: 310, text: '', size: 13.5, weight: 700, c: 'ok' });

    const read = (off) => Object.fromEntries(S.flatMap(([id, , v], i) => [[id, off && id === 'sp' ? { sub: 'sensor off', fill: 'ghost' } : { sub: v }], ['q' + id, { o: off && id === 'sp' ? 0 : 1, tx: 218, ty: SY(i) }]]));
    const judge = (off) => Object.fromEntries(S.flatMap(([id, name, v, bad, lim], i) => {
      const on = !(off && id === 'sp');
      return [[id, on ? (bad ? { c: 'bad', fill: 'solid', sub: `${v}  (${lim})` } : { c: 'ok', sub: `${v}  ok` }) : {}], ['q' + id, { o: on && bad ? 1 : 0, tx: 404, ty: 160, via: [380, SY(i)] }]];
    }));

    A.step('<b>Environment</b>: a ward. The patient in bed 4 has a breathing problem that is slowly getting worse.');
    A.step('<b>Sensors</b> measure the patient: heart rate 96, breathing rate 27 per minute, oxygen saturation 89%, temperature 37.0 °C.', read(false), { dur: 900 });
    A.step('The <b>agent function</b> compares each reading with its limit. Breathing above 24 and SpO₂ below 92% are abnormal: <b>2 abnormal readings</b>.',
      { ...judge(false), fn: { text: 'abnormal: 2' } }, { dur: 1000, fx: ['fn'] });
    A.step('The rule says “2 or more → alert”, so the <b>actuator</b> pages the nurse. Paging is a software command, and that counts as an actuator.',
      { qa: { o: 1, tx: 636 }, pg: { fill: 'solid', sub: 'ALERT', text: 'pager' }, fn: { fill: 'solid' } }, { fx: ['pg'] });
    A.step('<b>Performance measure</b>: was deterioration caught early, with few misses and few false alarms? Here: <b>caught early</b>.',
      { perf: { text: '✓ caught early', c: 'ok' } });
    A.step('Now <b>switch the SpO₂ sensor off</b> and replay the same moment.',
      { ...Object.fromEntries(S.flatMap(([id]) => [[id, { c: 'c0', fill: 'soft', sub: 'waiting…' }], ['q' + id, { o: 0, tx: 172, ty: 160 }]])), sp: { c: 'c0', fill: 'ghost', sub: 'sensor off' },
        fn: { text: 'abnormal: 0', fill: 'soft' }, pg: { fill: 'ghost', sub: 'quiet' }, qa: { o: 0, tx: 572 }, perf: { text: '' } }, { dur: 500 });
    A.step('Only the breathing rate is abnormal now: <b>1 reading</b>. The rule needs 2, so <b>no alert</b> is sent.',
      { ...read(true), ...judge(true), fn: { text: 'abnormal: 1' } }, { dur: 1100 });
    A.step('The patient is <b>missed</b>. An agent <b>cannot act on what it cannot perceive</b>: choosing the sensors is part of designing the agent.',
      { perf: { text: '✗ deterioration missed', c: 'bad' } }, { fx: ['pat'] });
  });

  /* ---------- W4: building the confusion matrix ---------- */
  def('confusion', { w: 700, h: 340 }, (A) => {
    // 200 dots, each = 5 patients: 10 sick (8 alerted), 190 fine (19 alerted)
    const grid = (i) => [36 + (i % 20) * 13, 52 + Math.floor(i / 20) * 13];
    const R = A.rand;
    const kinds = [...Array(8).fill('TP'), ...Array(2).fill('FN'), ...Array(19).fill('FP'), ...Array(171).fill('TN')];
    for (let i = kinds.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
    const CELL = { TP: [384, 52, 116, 82, 'TP · alert'], FP: [508, 52, 176, 82, 'FP · alert'], FN: [384, 142, 116, 180, 'FN · no alert'], TN: [508, 142, 176, 180, 'TN · no alert'] };
    const COUNT = { TP: 40, FP: 95, FN: 10, TN: 855 };
    A.text('ch1', { tx: 442, ty: 40, text: 'truly deteriorates', size: 11, c: 'mute', o: 0 });
    A.text('ch2', { tx: 596, ty: 40, text: 'truly fine', size: 11, c: 'mute', o: 0 });
    for (const [k, [x, y, w, h, lab]] of Object.entries(CELL)) {
      A.area('c' + k, { tx: x, ty: y, w, h, c: 'mute', label: lab, o: 0 });
      A.text('n' + k, { tx: x + w - 8, ty: y + h - 12, num: 0, fmt: (v) => String(Math.round(v)), mono: true, size: 15, weight: 700, anchor: 'end', o: 0 });
    }
    const seen = { TP: 0, FP: 0, FN: 0, TN: 0 };
    const target = kinds.map((k) => {
      const [x, y, w] = CELL[k], per = Math.floor((w - 12) / 10), j = seen[k]++;
      return [x + 10 + (j % per) * 10, y + 24 + Math.floor(j / per) * 10];
    });
    kinds.forEach((k, i) => { const [x, y] = grid(i); A.dot('d' + i, { tx: x, ty: y, r: 4, c: 'mute' }); });
    A.text('legend', { tx: 36, ty: 30, text: 'each dot = 5 patients (1,000 in total)', size: 11, c: 'mute', anchor: 'start' });
    const M = [['mSe', 'sensitivity  40 / 50   = 80%'], ['mSp', 'specificity  855 / 950 = 90%'], ['mPp', 'PPV          40 / 135  = 30%'], ['mNp', 'NPV          855 / 865 = 98.8%']];
    M.forEach(([id, t], i) => A.text(id, { tx: 36, ty: 210 + i * 26, text: t, size: 12.5, anchor: 'start', o: 0, mono: true }));
    const dots = (f) => Object.fromEntries(kinds.map((k, i) => ['d' + i, f(k, i)]).filter(([, v]) => v));
    const cells = (on, c) => Object.fromEntries(Object.keys(CELL).map((k) => ['c' + k, { c: on.includes(k) ? c : 'mute' }]));

    A.step('1,000 patients on the wards, each dot standing for 5. A model watches them all and raises alerts. Who really deteriorates?');
    A.step('<b>50 patients truly deteriorate</b> (red). The other 950 are fine.', dots((k) => (k === 'TP' || k === 'FN' ? { c: 'bad' } : null)));
    A.step('The model raises an alert for <b>135</b> of them (the big circles). Some of those are sick, many are not.', dots((k) => (k === 'TP' || k === 'FP' ? { r: 5.5, ring: true } : null)));
    A.step('Sort every patient by the <b>truth</b> (column) and by the <b>alert</b> (row). That table is the <b>confusion matrix</b>.',
      { ...dots((k, i) => ({ tx: target[i][0], ty: target[i][1], r: 3.6 })), ...Object.fromEntries(Object.keys(CELL).flatMap((k) => [['c' + k, { o: 1 }], ['n' + k, { o: 1, num: COUNT[k] }]])), ch1: { o: 1 }, ch2: { o: 1 } }, { dur: 1600 });
    A.step('<b>Sensitivity</b> starts from the <b>truth</b>: of the 50 who deteriorate, 40 got an alert. <b>80%</b>. The 10 missed patients are the dangerous error.', { ...cells(['TP', 'FN'], 'c1'), mSe: { o: 1 } }, { fx: ['cFN'] });
    A.step('<b>Specificity</b>: of the 950 who are fine, 855 were correctly left alone. <b>90%</b>.', { ...cells(['FP', 'TN'], 'c0'), mSp: { o: 1 } });
    A.step('<b>PPV</b> starts from the <b>alert</b>: of 135 alerts only 40 were real, so <b>30%</b>. Most alerts are false alarms, because the healthy group is so much bigger.', { ...cells(['TP', 'FP'], 'c4'), mPp: { o: 1 } }, { fx: ['cFP'] });
    A.step('<b>NPV</b>: of 865 patients without an alert, 855 were truly fine. <b>98.8%</b>. Sensitivity and specificity read <i>columns</i>; PPV and NPV read <i>rows</i>.', { ...cells(['FN', 'TN'], 'c3'), mNp: { o: 1 } });
  });

  /* ---------- W4: moving the alert threshold ---------- */
  def('threshold', { w: 700, h: 320 }, (A) => {
    const sick = [36, 47, 58, 63, 70, 76, 82, 88];
    const fine = [5, 8, 10, 12, 14, 15, 18, 20, 21, 23, 25, 26, 28, 30, 31, 33, 35, 37, 38, 40, 42, 44, 46, 48, 51, 53, 56, 61, 64, 68, 72, 85];
    const X = (v) => 40 + v * 6.2, base = 250, all = [...sick.map((v) => [v, 1]), ...fine.map((v) => [v, 0])].sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    const stack = {};
    A.line('axis', { x1: 40, y1: base + 12, x2: 660, y2: base + 12, c: 'mute' });
    [0, 20, 40, 60, 80, 100].forEach((v) => A.text('tk' + v, { tx: X(v), ty: base + 28, text: String(v), size: 11, c: 'mute', mono: true }));
    A.text('axl', { tx: 660, ty: base + 46, text: 'risk score →', size: 11, c: 'mute', anchor: 'end' });
    all.forEach(([v, s], i) => { const b = Math.floor(v / 5); stack[b] = (stack[b] || 0) + 1; A.dot('p' + i, { tx: X(b * 5 + 2.5), ty: base - (stack[b] - 1) * 13, r: 5, c: s ? 'bad' : 'c0' }); });
    A.area('zone', { tx: X(100), ty: 86, w: 0, h: base + 12 - 86, c: 'c4' });
    A.line('thr', { x1: 0, y1: 82, x2: 0, y2: base + 12, tx: X(100), c: 'c4', sw: 2.5, o: 0 });
    A.text('thrT', { tx: X(100), ty: 72, num: 100, fmt: (v) => `threshold ${Math.round(v)}`, size: 12, weight: 700, c: 'c4', o: 0 });
    A.text('stat', { tx: 40, ty: 18, text: '', size: 13, anchor: 'start', mono: true });
    A.text('stat2', { tx: 40, ty: 38, text: '', size: 13, anchor: 'start', mono: true });
    A.text('leg', { tx: 660, ty: 18, text: 'red = will deteriorate · blue = fine', size: 11, c: 'mute', anchor: 'end' });

    const at = (t) => {
      const tp = sick.filter((v) => v >= t).length, fp = fine.filter((v) => v >= t).length;
      return [{ thr: { o: 1, tx: X(t) }, thrT: { o: 1, tx: X(t), num: t }, zone: { tx: X(t), w: X(100) - X(t) },
        stat: { text: `caught ${tp} of ${sick.length} who deteriorate (sensitivity ${Math.round((100 * tp) / sick.length)}%)` },
        stat2: { text: `${tp + fp} alerts, ${fp} of them false alarms` },
        ...Object.fromEntries(all.map(([v, s], i) => ['p' + i, { ring: v >= t, r: v >= t ? 6 : 5 }])) }, tp, fp];
    };
    A.step('Each dot is a patient with a <b>risk score</b> from the model. Red dots are the 8 who will really deteriorate. A <b>threshold</b> decides who gets an alert.');
    let [ch, tp, fp] = at(80);
    A.step(`Threshold <b>80</b>: only very high scores get an alert. ${tp + fp} alerts, few false alarms, but only ${tp} of 8 sick patients are caught.`, ch, { dur: 1100 });
    [ch, tp, fp] = at(55);
    A.step(`Lower it to <b>55</b>: ${tp} of 8 caught, and ${fp} false alarms. Sensitivity goes up, and so do the false alarms.`, ch, { dur: 1100 });
    [ch, tp, fp] = at(32);
    A.step(`Lower it to <b>32</b>: all ${tp} caught, but ${tp + fp} alerts for a team that may only manage a few. This is how <b>alert fatigue</b> starts.`, ch, { dur: 1100 });
    A.step('There is no free lunch: a <b>lower threshold</b> catches more and alarms more. The right choice depends on what a miss costs, and how many alerts staff can really review.', at(55)[0], { dur: 1100 });
  });
})();
