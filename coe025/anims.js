/* COE025 animated diagrams (see assets/js/anim.js for the API). Used as  fig: { type: 'anim', name } in guide.js. */
(function () {
  const def = CS.anim.def;

  /* ---------- W1: bag of words counts words and forgets their order ---------- */
  def('bow', { w: 680, h: 300 }, (A) => {
    const doc = ['the', 'cat', 'sat', 'the'], vocab = ['cat', 'dog', 'sat', 'the'];
    const bx = (k) => 160 + k * 120;
    doc.forEach((w, i) => A.box('t' + i, { tx: 220 + i * 80, ty: 40, w: 66, h: 30, text: w, c: 'c0' }));
    doc.forEach((w, i) => A.box('f' + i, { tx: 220 + i * 80, ty: 40, w: 66, h: 30, text: w, c: 'c0', fill: 'solid', o: 0 }));
    vocab.forEach((w, k) => {
      A.box('b' + k, { tx: bx(k), ty: 160, w: 96, h: 70, text: '0', fs: 26, c: 'c1', fill: 'soft' });
      A.text('bl' + k, { tx: bx(k), ty: 210, text: w, mono: true, size: 13, c: 'mute' });
    });
    A.text('vec', { tx: 340, ty: 262, text: 'bag-of-words vector = [1, 0, 1, 2]', mono: true, size: 15, weight: 700, o: 0 });
    // part 2: order is lost
    const s1 = ['dog', 'bites', 'man'], s2 = ['man', 'bites', 'dog'];
    s1.forEach((w, i) => A.box('a' + i, { tx: 110 + i * 78, ty: 80, w: 66, h: 30, text: w, c: 'c2', o: 0 }));
    s2.forEach((w, i) => A.box('z' + i, { tx: 110 + i * 78, ty: 170, w: 66, h: 30, text: w, c: 'c3', o: 0 }));
    A.text('va', { tx: 360, ty: 80, text: '→  [bites 1, dog 1, man 1]', mono: true, size: 14, anchor: 'start', o: 0 });
    A.text('vz', { tx: 360, ty: 170, text: '→  [bites 1, dog 1, man 1]', mono: true, size: 14, anchor: 'start', o: 0 });
    A.text('eq', { tx: 340, ty: 250, text: 'same vector, opposite meaning', size: 15, weight: 700, c: 'bad', o: 0 });

    A.step('The vocabulary is <b>[cat, dog, sat, the]</b>. Bag of words gives each vocabulary word its own <b>counter</b>. Now read the document “the cat sat the”.');
    const n = [0, 0, 0, 0];
    doc.forEach((w, i) => {
      const k = vocab.indexOf(w);
      n[k]++;
      A.step(`“${w}” → the counter for <b>${w}</b> goes up to ${n[k]}.` + (i === 3 ? ' The second “the” lands in the same counter.' : ''),
        { ['f' + i]: { o: 0, tx: bx(k), ty: 150, s: 0.6, via: [(220 + i * 80 + bx(k)) / 2, 40] }, ['t' + i]: { fill: 'ghost' }, ['b' + k]: { text: String(n[k]), fill: 'solid' } }, { fx: ['b' + k], dur: 850 });
    });
    A.step('The document becomes the vector <b>[1, 0, 1, 2]</b>: cat once, dog never, sat once, the twice. Simple, and surprisingly good for classification.',
      { vec: { o: 1 }, ...Object.fromEntries(vocab.map((_, k) => ['b' + k, { fill: 'soft' }])) });
    const hide1 = Object.fromEntries([...doc.map((_, i) => ['t' + i, { o: 0 }]), ...vocab.flatMap((_, k) => [['b' + k, { o: 0 }], ['bl' + k, { o: 0 }]]), ['vec', { o: 0 }]]);
    A.step('But a counter only knows <i>how many</i>, not <i>where</i>. Take two sentences with the same words in a different order.',
      { ...hide1, ...Object.fromEntries([...s1.map((_, i) => ['a' + i, { o: 1 }]), ...s2.map((_, i) => ['z' + i, { o: 1 }])]) });
    A.step('Count them: both become <b>[1, 1, 1]</b>. Same vector, opposite meaning. Bag of words <b>loses word order</b>; n-grams such as “dog bites” bring back a little of it.',
      { va: { o: 1 }, vz: { o: 1 }, eq: { o: 1 } }, { fx: ['a0', 'z2'] });
  });

  /* ---------- W3: attention, following the word "it" ---------- */
  def('attention', { w: 720, h: 330 }, (A) => {
    // the lesson's 9 tokens and illustrative weights (they add up to 1)
    const toks = ['The', 'animal', "didn't", 'cross', 'street', 'because', 'it', 'was', 'tired'];
    const W = [0.02, 0.61, 0.03, 0.04, 0.18, 0.02, 0.05, 0.02, 0.03];
    const X = (j) => 48 + j * 78, IT = 6, Y = 200;
    const colOf = (j) => (j === 1 ? 'c2' : j === 4 ? 'c0' : 'mute');
    toks.forEach((t, j) => {
      if (j !== IT) A.line('a' + j, { x1: X(IT), y1: Y - 16, x2: X(j), y2: Y - 16, bend: Math.sign(X(j) - X(IT)) * (18 + Math.abs(X(j) - X(IT)) * 0.32), c: colOf(j), sw: 1, draw: 0 });
    });
    toks.forEach((t, j) => A.box('w' + j, { tx: X(j), ty: Y, w: 70, h: 30, fs: 12.5, text: t, c: j === IT ? 'c3' : colOf(j) === 'mute' ? 'c0' : colOf(j) }));
    toks.forEach((t, j) => {
      A.text('n' + j, { tx: X(j), ty: 236, num: 0, fmt: (v) => v.toFixed(2).replace(/^0/, ''), mono: true, size: 12, o: 0 });
      A.area('g' + j, { tx: X(j) - 14, ty: 248, w: 28, h: 0, c: colOf(j) === 'mute' ? 'mute' : colOf(j), solid: true, rx: 2 });
      A.dot('d' + j, { tx: X(j), ty: Y, r: 3 + 16 * Math.sqrt(W[j]), c: colOf(j) === 'mute' ? 'mute' : colOf(j), o: 0 });
    });
    A.box('out', { tx: X(IT), ty: 52, w: 150, h: 50, text: 'new vector for “it”', sub: 'Σ weight × value', c: 'c3', o: 0, fs: 12 });
    A.text('f', { tx: 20, ty: 22, text: 'Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V', mono: true, size: 12.5, anchor: 'start', o: 0 });

    A.step('Every word gets three vectors: a <b>query</b> (what am I looking for?), a <b>key</b> (what do I offer?) and a <b>value</b> (my content). Follow the word <b>“it”</b>.',
      { w6: { fill: 'solid' } }, { fx: ['w6'] });
    A.step('<b>Scores</b>: the query of “it” is compared with the key of every word, using a dot product. Each line is one comparison.',
      Object.fromEntries(toks.map((_, j) => ['a' + j, { draw: 1 }]).filter(([k]) => k !== 'a6')), { dur: 1100 });
    A.step('<b>Scale and softmax</b>: divide the scores by √dₖ, then softmax turns them into <b>weights that add up to 1</b>. A thicker line means more attention.',
      Object.fromEntries(toks.flatMap((_, j) => [['n' + j, { o: 1, num: W[j] }], ['g' + j, { h: W[j] * 75 }], ...(j !== IT ? [['a' + j, { sw: 1 + W[j] * 16 }]] : [])])), { dur: 1100 });
    A.step('“it” attends mostly to <b>animal</b> (.61) and a little to <b>street</b> (.18). That is how the model works out what “it” refers to.',
      { w1: { fill: 'solid' }, w4: { fill: 'soft' }, ...Object.fromEntries(toks.map((_, j) => ['a' + j, { o: j === 1 || j === 4 ? 1 : 0.3 }]).filter(([k]) => k !== 'a6')) }, { fx: ['w1'] });
    A.step('The new vector for “it” is the <b>weighted sum of all the value vectors</b>, so it is made mostly of “animal”.',
      { out: { o: 1 }, ...Object.fromEntries(toks.map((_, j) => ['d' + j, { o: 0.9, tx: X(IT) - 52 + j * 13, ty: 100, via: [(X(j) + X(IT)) / 2, 130] }])) }, { dur: 1300, fx: ['out'] });
    A.step('Every word does this at the same time, each with its own row of weights. That whole computation is one formula.', { f: { o: 1 } });
  });

  /* ---------- W3: an RNN carries its memory from word to word ---------- */
  def('rnn', { w: 680, h: 300 }, (A) => {
    const words = ['the', 'movie', 'rocks'], CX = [150, 310, 470], HX = [50, 230, 390, 550];
    const H = [[0, 0, 0, 0], [0.3, 0.1, 0.6, 0.2], [0.5, 0.7, 0.2, 0.4], [0.8, 0.6, 0.3, 0.9]];
    for (let i = 0; i < 3; i++) {
      A.line('in' + i, { x1: CX[i], y1: 230, x2: CX[i], y2: 172, c: 'mute', head: true });
      A.box('cell' + i, { tx: CX[i], ty: 145, w: 92, h: 50, text: 'RNN cell', c: 'c0' });
      A.box('x' + i, { tx: CX[i], ty: 250, w: 74, h: 30, text: words[i], c: 'c2' });
      A.line('h' + i, { x1: CX[i] - 128 + (i ? 46 : 18), y1: 145, x2: CX[i] - 48, y2: 145, c: 'mute', head: true });
    }
    A.line('h3', { x1: 518, y1: 145, x2: 585, y2: 145, c: 'mute', head: true });
    A.box('cls', { tx: 625, ty: 145, w: 90, h: 50, text: 'classifier', sub: '', c: 'c1', o: 0 });
    for (let d = 0; d < 4; d++) A.dot('m' + d, { tx: HX[0] - 18 + d * 12, ty: 100, r: 2, c: 'mute' });
    A.text('ml', { tx: HX[0], ty: 78, text: 'h₀ (empty)', size: 12, mono: true });
    for (let i = 0; i < 3; i++) A.dot('g' + i, { tx: CX[i], ty: 112, r: 0, c: 'bad', o: 0 });
    A.text('gl', { tx: 340, ty: 30, text: '', size: 12.5, c: 'bad' });

    A.step('An RNN reads a sentence <b>one word at a time</b>, left to right. It starts with an empty memory, <b>h₀</b>.');
    for (let i = 0; i < 3; i++) {
      const dots = Object.fromEntries([0, 1, 2, 3].map((d) => ['m' + d, { tx: HX[i + 1] - 18 + d * 12, r: 2.5 + 6 * H[i + 1][d], c: 'c0', via: [(HX[i] + HX[i + 1]) / 2 - 18 + d * 12, 60] }]));
      const caps = [
        'Word 1, “the”: the cell mixes the word with the old memory: <b>h₁ = tanh(x₁ + W·h₀)</b>.',
        'Word 2, “movie”: <b>h₂ = tanh(x₂ + W·h₁)</b>. The memory now carries both words.',
        'Word 3, “rocks”: <b>h₃</b>. Every step builds on the one before, so <b>order matters</b>. The reversed sentence would end with a different h₃.',
      ];
      A.step(caps[i], { ...dots, ['x' + i]: { ty: 175, o: 0, s: 0.6 }, ['cell' + i]: { fill: 'solid' }, ...(i ? { ['cell' + (i - 1)]: { fill: 'soft' } } : {}), ml: { tx: HX[i + 1], text: `h${'₁₂₃'[i]}` } }, { dur: 1000, fx: ['cell' + i] });
    }
    A.step('The final memory h₃ has seen every word in order. A classifier reads it and says <b>positive</b>.',
      { cls: { o: 1, sub: 'positive ✓', fill: 'soft' }, cell2: { fill: 'soft' } }, { fx: ['cls'] });
    A.step('Training sends the error <b>backwards</b> through each step and multiplies by a factor every time. With 0.5 per step, 20 steps give 0.5²⁰ ≈ 0.000001, so early words barely learn: the <b>vanishing gradient</b>. LSTM gates fix this.',
      { g2: { o: 1, r: 9 }, g1: { o: 1, r: 4.5 }, g0: { o: 1, r: 2.2 }, gl: { text: 'error signal: ×0.5 at every step back ←' } }, { dur: 1200 });
  });

  /* ---------- W4: BIO tags, one per token ---------- */
  def('bio', { w: 720, h: 270 }, (A) => {
    const toks = ['Jane', 'Villanueva', 'of', 'United', 'Airlines', 'Holding', 'discussed', 'the', 'Chicago', 'route'];
    const tags = ['B-PER', 'I-PER', 'O', 'B-ORG', 'I-ORG', 'I-ORG', 'O', 'O', 'B-LOC', 'O'];
    const tc = (t) => (t.endsWith('PER') ? 'c3' : t.endsWith('ORG') ? 'c0' : t.endsWith('LOC') ? 'c1' : 'mute');
    const W = toks.map((t) => t.length * 7.3 + 20), X = [];
    let x = 14;
    for (const w of W) { X.push(x + w / 2); x += w + 6; }
    const span = (id, a, b, lab, c) => A.area(id, { tx: X[a] - W[a] / 2 - 3, ty: 92, w: X[b] + W[b] / 2 - X[a] + W[a] / 2 + 6, h: 22, c, label: lab, o: 0 });
    A.area('cur', { tx: X[0] - W[0] / 2 - 4, ty: 48, w: W[0] + 8, h: 40, c: 'c2', o: 0 });
    toks.forEach((t, i) => A.box('t' + i, { tx: X[i], ty: 68, w: W[i], h: 30, text: t, c: 'c0', fill: 'ghost' }));
    span('sp', 0, 1, 'PER', 'c3'); span('so', 3, 5, 'ORG', 'c0'); span('sl', 8, 8, 'LOC', 'c1');
    toks.forEach((t, i) => A.box('g' + i, { tx: X[i], ty: 156, w: W[i], h: 28, fs: 11.5, text: tags[i], c: tc(tags[i]), fill: tags[i] === 'O' ? 'ghost' : 'solid', o: 0, s: 0.6 }));
    A.text('cnt', { tx: 360, ty: 222, text: 'n entity types → 2n + 1 tags.  PER, ORG, LOC, GPE → 2·4 + 1 = 9', mono: true, size: 13, o: 0 });
    const cur = (i, j = i) => ({ cur: { o: 1, tx: X[i] - W[i] / 2 - 4, w: X[j] + W[j] / 2 - X[i] + W[i] / 2 + 8 } });
    const tag = (...is) => Object.fromEntries(is.map((i) => ['g' + i, { o: 1, s: 1 }]));

    A.step('NER finds <b>spans</b> of words that name things. A sequence labeler needs <b>exactly one tag per token</b>, so the spans are converted with <b>BIO</b>.');
    A.step('The spans: <b>Jane Villanueva</b> is a person (PER), <b>United Airlines Holding</b> an organisation (ORG), <b>Chicago</b> a location (LOC).', { sp: { o: 1 }, so: { o: 1 }, sl: { o: 1 } });
    A.step('“Jane” <b>begins</b> the PER span → <b>B-PER</b>.', { ...cur(0), ...tag(0) }, { fx: ['g0'] });
    A.step('“Villanueva” is <b>inside</b> the same span → <b>I-PER</b>.', { ...cur(1), ...tag(1) }, { fx: ['g1'] });
    A.step('“of” is part of no entity → <b>O</b>, outside.', { ...cur(2), ...tag(2) });
    A.step('“United” begins the ORG span → <b>B-ORG</b>. “Airlines” and “Holding” continue it → <b>I-ORG</b>, I-ORG.', { ...cur(3, 5), ...tag(3, 4, 5) }, { fx: ['g3'] });
    A.step('“discussed” and “the” → <b>O</b>. “Chicago” is a one-word span, so it only gets <b>B-LOC</b> and no I.', { ...cur(6, 8), ...tag(6, 7, 8) }, { fx: ['g8'] });
    A.step('“route” → O. Done: one tag per token, and you can read the spans back from the B and I tags. An <b>I</b> can never follow <b>O</b>.', { ...cur(9), ...tag(9) });
    A.step('With <b>n</b> entity types BIO needs <b>2n + 1</b> tags: a B and an I for each type, plus O. With 4 types that is <b>9 tags</b>.', { cur: { o: 0 }, cnt: { o: 1 } });
  });
})();
