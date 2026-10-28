/* COE305 animated diagrams (see assets/js/anim.js for the API). Used as  fig: { type: 'anim', name } in guide.js. */
(function () {
  const def = CS.anim.def;
  const gauss = (rand) => Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand());
  const f1 = (v) => v.toFixed(1), f2 = (v) => v.toFixed(2);

  /* ---------- W4: k-means, assign → update until nothing changes ---------- */
  def('kmeans', { w: 640, h: 380, reroll: 'New data', slider: { key: 'k', label: 'k', min: 2, max: 5, value: 3 } }, (A, p) => {
    const R = A.rand, k = p.k, CL = ['c0', 'c2', 'c1', 'c3', 'c4'];
    const PX = (u) => 30 + u * 58, PY = (v) => 360 - v * 33;
    // three blobs (fixed for the first view, random after "New data")
    const centres = p.seed === 1 ? [[2.2, 7.5], [7.6, 7.2], [5, 2.3]] : [0, 1, 2].map(() => [1.5 + R() * 7, 1.5 + R() * 7]);
    const pts = [];
    centres.forEach(([cu, cv]) => { for (let i = 0; i < 15; i++) pts.push([Math.min(9.8, Math.max(0.2, cu + gauss(R) * 0.75)), Math.min(9.8, Math.max(0.2, cv + gauss(R) * 0.75))]); });
    // Forgy initialisation: k distinct random data points
    const pick = [];
    while (pick.length < k) { const i = Math.floor(R() * pts.length); if (!pick.includes(i)) pick.push(i); }
    let m = pick.map((i) => [...pts[i]]);
    const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
    const assign = () => pts.map((q) => m.reduce((best, c, j) => (d2(q, c) < d2(q, m[best]) ? j : best), 0));
    const err = (lab) => pts.reduce((s, q, i) => s + d2(q, m[lab[i]]), 0);

    pts.forEach((q, i) => A.line('l' + i, { x1: PX(q[0]), y1: PY(q[1]), x2: PX(q[0]), y2: PY(q[1]), c: 'mute', sw: 1, o: 0 }));
    pts.forEach((q, i) => A.dot('p' + i, { tx: PX(q[0]), ty: PY(q[1]), r: 4.5, c: 'mute' }));
    m.forEach((c, j) => {
      A.dot('m' + j, { tx: PX(c[0]), ty: PY(c[1]), r: 10, ring: true, c: CL[j], o: 0, s: 0.3 });
      A.text('mt' + j, { tx: PX(c[0]) + 16, ty: PY(c[1]) - 14, text: `m${'₁₂₃₄₅'[j]}`, size: 13, weight: 700, c: CL[j], o: 0 });
    });
    A.text('E', { tx: 624, ty: 18, num: 0, fmt: (v) => `E = ${f1(v)}`, mono: true, size: 13, anchor: 'end', o: 0 });

    const centreCh = (o = {}) => Object.fromEntries(m.flatMap((c, j) => [['m' + j, { tx: PX(c[0]), ty: PY(c[1]), o: 1, s: 1, ...o }], ['mt' + j, { tx: PX(c[0]) + 16, ty: PY(c[1]) - 14, o: 1 }]]));
    A.step(`${pts.length} points and <b>k = ${k}</b>. k-means starts by picking ${k} random data points as the first centres.`, centreCh(), { fx: m.map((_, j) => 'm' + j) });
    let lab = null;
    for (let it = 1; it <= 12; it++) {
      const nl = assign();
      const changed = !lab || nl.some((v, i) => v !== lab[i]);
      if (!changed) break;
      const moved = lab ? nl.filter((v, i) => v !== lab[i]).length : pts.length;
      lab = nl;
      A.step(it === 1
        ? '<b>Assign</b>: every point joins its <b>nearest</b> centre and takes its colour. The thin lines show who belongs to whom.'
        : `<b>Assign</b> (round ${it}): ${moved} point${moved > 1 ? 's' : ''} now ${moved > 1 ? 'have' : 'has'} a nearer centre and switch${moved > 1 ? '' : 'es'} cluster.`,
      { ...Object.fromEntries(pts.flatMap((q, i) => [['p' + i, { c: CL[lab[i]] }], ['l' + i, { o: 0.35, c: CL[lab[i]], x2: PX(m[lab[i]][0]), y2: PY(m[lab[i]][1]) }]])), E: { o: 1, num: err(lab) } },
      { dur: 800 });
      m = m.map((c, j) => {
        const mine = pts.filter((_, i) => lab[i] === j);
        return mine.length ? [mine.reduce((s, q) => s + q[0], 0) / mine.length, mine.reduce((s, q) => s + q[1], 0) / mine.length] : c;
      });
      A.step(`<b>Update</b>: each centre moves to the <b>mean</b> of its points. The reconstruction error drops to E = ${f1(err(lab))}.`,
        { ...centreCh(), ...Object.fromEntries(pts.map((q, i) => ['l' + i, { x2: PX(m[lab[i]][0]), y2: PY(m[lab[i]][1]) }])), E: { num: err(lab) } }, { dur: 1000 });
    }
    A.step(`Assigning again changes nothing, so k-means has <b>converged</b> (E = ${f1(err(lab))}). It always stops, but not always at the best answer: try <b>New data</b> or another k.`,
      Object.fromEntries(pts.map((_, i) => ['l' + i, { o: 0 }])));
  });

  /* ---------- W3: PCA, find the direction of maximum variance ---------- */
  def('pca', { w: 560, h: 400, reroll: 'New data' }, (A, p) => {
    const R = A.rand, C = [280, 196], SC = 34, th = ((p.seed === 1 ? 34 : 15 + R() * 60) * Math.PI) / 180;
    let pts = [];
    for (let i = 0; i < 30; i++) { const a = gauss(R) * 2.1, b = gauss(R) * 0.55; pts.push([a * Math.cos(th) - b * Math.sin(th), a * Math.sin(th) + b * Math.cos(th)]); }
    const mx = pts.reduce((s, q) => s + q[0], 0) / 30, my = pts.reduce((s, q) => s + q[1], 0) / 30;
    pts = pts.map(([x, y]) => [x - mx, y - my]); // centred
    const PX = (x) => C[0] + x * SC, PY = (y) => C[1] - y * SC;
    const varAt = (deg) => { const a = (deg * Math.PI) / 180; return pts.reduce((s, [x, y]) => s + (x * Math.cos(a) + y * Math.sin(a)) ** 2, 0) / 30; };
    // PC1 from the 2×2 covariance matrix
    const sxx = pts.reduce((s, q) => s + q[0] * q[0], 0) / 30, syy = pts.reduce((s, q) => s + q[1] * q[1], 0) / 30, sxy = pts.reduce((s, q) => s + q[0] * q[1], 0) / 30;
    let pc = (0.5 * Math.atan2(2 * sxy, sxx - syy) * 180) / Math.PI;
    if (pc < 0) pc += 180;
    const l1 = varAt(pc), l2 = varAt(pc + 90), ratio = (100 * l1) / (l1 + l2);

    A.line('ax', { x1: 30, y1: C[1], x2: 530, y2: C[1], c: 'mute', sw: 0.6, dash: '2 4' });
    A.line('ay', { x1: C[0], y1: 20, x2: C[0], y2: 350, c: 'mute', sw: 0.6, dash: '2 4' });
    A.text('xl', { tx: 530, ty: C[1] + 14, text: 'height', size: 11, c: 'mute', anchor: 'end' });
    A.text('yl', { tx: C[0] + 6, ty: 26, text: 'weight', size: 11, c: 'mute', anchor: 'start' });
    A.line('w', { x1: -230, y1: 0, x2: 230, y2: 0, tx: C[0], ty: C[1], c: 'c2', sw: 2.5, o: 0 });
    A.line('w2', { x1: -150, y1: 0, x2: 150, y2: 0, tx: C[0], ty: C[1], c: 'c3', sw: 2, o: 0, rot: -(pc + 90) });
    const proj = (deg) => { const a = (deg * Math.PI) / 180; return pts.map(([x, y]) => { const z = x * Math.cos(a) + y * Math.sin(a); return [z * Math.cos(a), z * Math.sin(a)]; }); };
    pts.forEach(([x, y], i) => A.line('d' + i, { x1: PX(x), y1: PY(y), x2: PX(x), y2: PY(y), c: 'c2', sw: 0.8, o: 0 }));
    pts.forEach(([x, y], i) => A.dot('q' + i, { tx: PX(x), ty: PY(y), r: 3.2, c: 'c2', o: 0 }));
    pts.forEach(([x, y], i) => A.dot('p' + i, { tx: PX(x), ty: PY(y), r: 4.5, c: 'c0' }));
    A.text('vl', { tx: 30, ty: 372, text: 'Var(z)', size: 11, c: 'mute', anchor: 'start' });
    A.area('vb', { tx: 80, ty: 365, w: 0, h: 13, c: 'c2', solid: true, rx: 2 });
    A.text('vn', { tx: 540, ty: 372, num: 0, fmt: (v) => v.toFixed(2), mono: true, size: 13, anchor: 'end', o: 0 });
    const VW = 380 / (l1 * 1.05);

    const at = (deg, extra = {}) => {
      const q = proj(deg);
      return { w: { o: 1, rot: -deg }, vb: { w: varAt(deg) * VW }, vn: { o: 1, num: varAt(deg) },
        ...Object.fromEntries(q.flatMap(([x, y], i) => [['q' + i, { o: 1, tx: PX(x), ty: PY(y) }], ['d' + i, { o: 0.5, x2: PX(x), y2: PY(y) }]])), ...extra };
    };
    A.step('Height and weight of 30 students, <b>centred</b> so the mean sits in the middle. We want <b>one</b> direction that keeps as much of the information as possible.');
    A.step(`Try the <b>horizontal</b> direction w. Drop every point straight onto the line: its position there is <b>z = wᵀx</b>. The spread of these z values is <b>Var(z) = ${f2(varAt(0))}</b>.`, at(0), { dur: 1000 });
    A.step(`Turn w to <b>vertical</b>: Var(z) = ${f2(varAt(90))}.`, at(90), { dur: 1200 });
    A.step(`Turn it <b>across</b> the cloud: the points land close together, Var(z) = ${f2(varAt(pc + 90))}. Very little information survives.`, at(pc + 90 > 180 ? pc - 90 : pc + 90), { dur: 1200 });
    A.step(`Turn it <b>along</b> the cloud: the projections are as spread out as they can be, Var(z) = ${f2(l1)}. This direction is <b>PC1</b>.`, at(pc), { dur: 1400, fx: ['w'] });
    A.step(`<b>PC2</b> is perpendicular to PC1 and holds what is left: only ${(100 - ratio).toFixed(0)}% of the variance.`, { w2: { o: 1 } }, { fx: ['w2'] });
    const q = proj(pc);
    A.step(`Keep only PC1: every student becomes <b>one number</b>, their position along the line, and we still keep <b>${ratio.toFixed(0)}%</b> of the variance. PCA never looks at labels, and features must be scaled first.`,
      { ...Object.fromEntries(q.flatMap(([x, y], i) => [['p' + i, { tx: PX(x), ty: PY(y) }], ['d' + i, { o: 0 }], ['q' + i, { o: 0 }]])), w2: { o: 0.25 } }, { dur: 1300 });
  });

  /* ---------- W2: K-fold cross-validation ---------- */
  def('kfold', { w: 680, h: 330, reroll: 'Reshuffle', slider: { key: 'K', label: 'K', min: 2, max: 10, value: 5 } }, (A, p) => {
    const R = A.rand, K = p.K, N = 30, X = (i) => 44 + i * 20.5, Y = 70;
    const fold = (i) => Math.floor((i * K) / N);
    const cls = Array.from({ length: N }, () => (R() < 0.5 ? 'c1' : 'c4'));
    for (let f = 0; f < K; f++) {
      const idx = [...Array(N).keys()].filter((i) => fold(i) === f), a = idx[0], b = idx[idx.length - 1];
      A.area('fb' + f, { tx: X(a) - 9, ty: Y - 32, w: X(b) - X(a) + 18, h: 64, c: 'mute', label: `fold ${f + 1}`, o: 0 });
    }
    for (let i = 0; i < N; i++) A.dot('e' + i, { tx: X(i), ty: Y + 8, r: 6, c: cls[i] });
    A.text('leg', { tx: 20, ty: 18, text: '30 labelled examples (green / red = class)', size: 11, c: 'mute', anchor: 'start' });
    const scores = Array.from({ length: K }, () => 0.78 + R() * 0.14);
    const BX = (r) => 60 + r * Math.min(60, 560 / K), BW = Math.min(40, 400 / K), B0 = 300, BS = 300;
    A.line('base', { x1: 40, y1: B0, x2: 640, y2: B0, c: 'mute', sw: 0.8 });
    for (let r = 0; r < K; r++) {
      A.area('s' + r, { tx: BX(r), ty: B0, w: BW, h: 0, c: 'c2', solid: true, rx: 2 });
      A.text('st' + r, { tx: BX(r) + BW / 2, ty: B0 - 10, num: 0, fmt: f2, mono: true, size: 11, o: 0 });
      A.text('sl' + r, { tx: BX(r) + BW / 2, ty: B0 + 14, text: `E${r + 1}`, mono: true, size: 11, c: 'mute' });
    }
    const mean = scores.reduce((s, v) => s + v, 0) / K, sd = Math.sqrt(scores.reduce((s, v) => s + (v - mean) ** 2, 0) / K);
    A.line('mean', { x1: 40, y1: B0 - (mean - 0.6) * BS, x2: 640, y2: B0 - (mean - 0.6) * BS, c: 'c3', dash: true, sw: 1.6, o: 0 });
    A.text('meanT', { tx: 640, ty: B0 - (mean - 0.6) * BS - 10, text: `mean ${f2(mean)} ± ${f2(sd)}`, mono: true, size: 12, weight: 700, c: 'c3', anchor: 'end', o: 0 });
    A.text('model', { tx: 340, ty: 160, text: '', size: 12.5, c: 'c0' });

    A.step(`30 examples, shuffled and cut into <b>K = ${K} folds</b> of about ${Math.round(N / K)}. The test set is somewhere else, locked away until the very end.`,
      Object.fromEntries([...Array(K).keys()].map((f) => ['fb' + f, { o: 1 }])));
    for (let r = 0; r < K; r++) {
      const ch = {};
      for (let i = 0; i < N; i++) ch['e' + i] = { ty: fold(i) === r ? Y + 62 : Y + 8, s: fold(i) === r ? 1.15 : 1 };
      for (let f = 0; f < K; f++) ch['fb' + f] = { c: f === r ? 'c2' : 'c0' };
      ch['s' + r] = { ty: B0 - (scores[r] - 0.6) * BS, h: (scores[r] - 0.6) * BS };
      ch['st' + r] = { o: 1, num: scores[r], ty: B0 - (scores[r] - 0.6) * BS - 10 };
      ch.model = { text: `round ${r + 1}: train a fresh model on the other ${K - 1} folds, then score it on fold ${r + 1} ↓` };
      A.step(`Round ${r + 1}: train on the ${K - 1} blue folds, then <b>validate on fold ${r + 1}</b> (it drops down). Score E${r + 1} = ${f2(scores[r])}.`, ch, { dur: 800 });
    }
    const back = Object.fromEntries([...Array(N).keys()].map((i) => ['e' + i, { ty: Y + 8, s: 1 }]));
    A.step(`Every example was used for validation <b>exactly once</b>, and the model was trained <b>${K} times</b>. Report <b>mean ± standard deviation</b>: ${f2(mean)} ± ${f2(sd)}. (The scores here are made up for the picture.)`,
      { ...back, mean: { o: 1 }, meanT: { o: 1 }, model: { text: '' }, ...Object.fromEntries([...Array(K).keys()].map((f) => ['fb' + f, { c: 'mute' }])) }, { fx: ['mean'] });
  });

  /* ---------- W5: ID3 grows the Play Tennis tree ---------- */
  def('id3', { w: 700, h: 380 }, (A) => {
    // Mitchell's 14 days: outlook, humidity, wind, play
    const D = [['S', 'H', 'W', 0], ['S', 'H', 'S', 0], ['O', 'H', 'W', 1], ['R', 'H', 'W', 1], ['R', 'N', 'W', 1], ['R', 'N', 'S', 0], ['O', 'N', 'S', 1],
      ['S', 'H', 'W', 0], ['S', 'N', 'W', 1], ['R', 'N', 'W', 1], ['S', 'N', 'S', 1], ['O', 'H', 'S', 1], ['O', 'N', 'W', 1], ['R', 'H', 'S', 0]];
    const NODE = { root: [350, 46, 230], S: [120, 170, 170], O: [350, 170, 170], R: [580, 170, 170], SH: [62, 300, 112], SN: [182, 300, 112], RW: [518, 300, 112], RS: [638, 300, 112] };
    const EDGE = [['root', 'S', 'sunny'], ['root', 'O', 'overcast'], ['root', 'R', 'rain'], ['S', 'SH', 'high'], ['S', 'SN', 'normal'], ['R', 'RW', 'weak'], ['R', 'RS', 'strong']];
    for (const [a, b, lab] of EDGE) {
      const [x1, y1] = NODE[a], [x2, y2] = NODE[b];
      A.line('e' + b, { x1, y1: y1 + 30, x2, y2: y2 - 30, c: 'mute', draw: 0, head: true });
      const side = x2 === x1 ? 0 : x2 < x1 ? -1 : 1; // slanted edges: label sits above the line, on the outer side
      A.text('el' + b, { tx: (x1 + x2) / 2 + (side ? side * 4 : 6), ty: (y1 + y2) / 2 + (side ? -6 : 4), text: lab, size: 11, c: 'mute', anchor: side < 0 ? 'end' : 'start', o: 0 });
    }
    for (const [id, [x, y, w]] of Object.entries(NODE)) A.box(id, { tx: x, ty: y, w, h: 58, text: '', sub: ' ', c: 'c0', o: id === 'root' ? 1 : 0, fs: 12.5 });
    const where = { root: [] };
    const slot = (node, list) => list.forEach((i, k) => { where[i] = [NODE[node][0] - ((list.length - 1) * 11) / 2 + k * 11, NODE[node][1] + 15]; });
    D.forEach((_, i) => A.dot('d' + i, { tx: 0, ty: 0, r: 4.5, c: D[i][3] ? 'c1' : 'c4' }));
    const place = (node, list) => { slot(node, list); return Object.fromEntries(list.map((i) => ['d' + i, { tx: where[i][0], ty: where[i][1] }])); };
    // start: everyone in the root
    const all = [...D.keys()];
    slot('root', all);
    all.forEach((i) => { A.els['d' + i].init.tx = where[i][0]; A.els['d' + i].init.ty = where[i][1]; });
    A.els.root.init.text = '14 days: 9 yes, 5 no';
    const pick = (f) => all.filter((i) => f(D[i]));
    const show = (...ids) => Object.fromEntries(ids.flatMap((id) => [[id, { o: 1 }], ['e' + id, { draw: 1 }], ['el' + id, { o: 1 }]]));

    A.step('14 days of Play Tennis: <b>9 yes</b> (green) and <b>5 no</b> (red). The mix at the root has entropy <b>0.940</b>.');
    A.step('ID3 tries every attribute and computes the weighted entropy after the split: Outlook 0.694, Humidity 0.789, Wind 0.892, Temperature 0.911. <b>Outlook is lowest</b>, so it becomes the first question.',
      { root: { text: 'Outlook?', fill: 'solid', sub: ' ' } }, { fx: ['root'] });
    A.step('Every day goes down the branch for its outlook.',
      { ...show('S', 'O', 'R'), S: { o: 1, text: 'Sunny: 2 yes, 3 no' }, O: { o: 1, text: 'Overcast: 4 yes, 0 no' }, R: { o: 1, text: 'Rain: 3 yes, 2 no' },
        ...place('S', pick((d) => d[0] === 'S')), ...place('O', pick((d) => d[0] === 'O')), ...place('R', pick((d) => d[0] === 'R')) }, { dur: 1300 });
    A.step('<b>Overcast</b> is pure: 4 yes, 0 no, entropy 0. Nothing left to ask, so it becomes a <b>leaf: Yes</b>.', { O: { text: 'Yes ✓ (leaf)', c: 'c1' } }, { fx: ['O'] });
    A.step('<b>Sunny</b> is still mixed, so ID3 repeats the search inside it. <b>Humidity</b> wins: high → all no, normal → all yes.',
      { S: { text: 'Humidity?', fill: 'solid' }, ...show('SH', 'SN'), SH: { o: 1, text: 'No', c: 'c4' }, SN: { o: 1, text: 'Yes', c: 'c1' },
        ...place('SH', pick((d) => d[0] === 'S' && d[1] === 'H')), ...place('SN', pick((d) => d[0] === 'S' && d[1] === 'N')) }, { dur: 1200 });
    A.step('<b>Rain</b> is mixed too. <b>Wind</b> wins there: weak → all yes, strong → all no.',
      { R: { text: 'Wind?', fill: 'solid' }, ...show('RW', 'RS'), RW: { o: 1, text: 'Yes', c: 'c1' }, RS: { o: 1, text: 'No', c: 'c4' },
        ...place('RW', pick((d) => d[0] === 'R' && d[2] === 'W')), ...place('RS', pick((d) => d[0] === 'R' && d[2] === 'S')) }, { dur: 1200 });
    A.step('Every leaf is pure, so ID3 stops. Each path from the root is a rule, for example <b>IF Outlook = sunny AND Humidity = high THEN no</b>.',
      { S: { fill: 'soft' }, R: { fill: 'soft' }, root: { fill: 'soft' }, eS: { c: 'c4', sw: 3 }, eSH: { c: 'c4', sw: 3 } }, { fx: ['SH'] });
  });
})();
