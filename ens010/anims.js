/* ENS010 animated diagrams (see assets/js/anim.js for the API). Used as  fig: { type: 'anim', name } in guide.js. */
(function () {
  const def = CS.anim.def;

  /* ---------- L4: shrink a bulk block one dimension at a time ---------- */
  def('shrink', { w: 700, h: 300 }, (A) => {
    const L = (nm) => 30 + Math.log10(nm) * 45; // bar length on a log scale, 1 nm → 30, 1 mm → 300
    const X0 = 70, Y = { x: 70, y: 120, z: 170 };
    A.text('h', { tx: X0, ty: 34, text: 'size of each dimension (log scale)', size: 11, c: 'mute', anchor: 'start', mono: true });
    A.line('t100', { x1: X0 + L(100), y1: 48, x2: X0 + L(100), y2: 206, c: 'c2', dash: true });
    A.line('t10', { x1: X0 + L(10), y1: 48, x2: X0 + L(10), y2: 206, c: 'c4', dash: true });
    A.text('l100', { tx: X0 + L(100), ty: 222, text: '100 nm', size: 11, c: 'c2', mono: true });
    A.text('l10', { tx: X0 + L(10), ty: 222, text: '10 nm', size: 11, c: 'c4', mono: true });
    for (const [k, y] of Object.entries(Y)) {
      A.text('n' + k, { tx: X0 - 14, ty: y + 12, text: k.toUpperCase(), size: 13, weight: 700, anchor: 'end' });
      A.area('b' + k, { tx: X0, ty: y, w: L(1e6), h: 18, c: 'c0', solid: true });
      A.text('v' + k, { tx: X0 + L(1e6) + 8, ty: y + 13, text: '1 mm', size: 11.5, anchor: 'start', mono: true });
    }
    A.area('shape', { tx: 470, ty: 70, w: 150, h: 110, c: 'c0', solid: true });
    A.text('name', { tx: 545, ty: 222, text: 'Bulk material', size: 16, weight: 700 });
    A.text('free', { tx: 545, ty: 246, text: '3 free dimensions', size: 12.5, c: 'mute' });
    A.text('also', { tx: 545, ty: 268, text: 'all dimensions above 100 nm', size: 12, c: 'mute' });

    const set = (k, nm, txt, c) => ({ ['b' + k]: { w: L(nm), c }, ['v' + k]: { tx: X0 + L(nm) + 8, text: txt } });
    const shape = (x, y, w, h, c) => ({ shape: { tx: x, ty: y, w, h, c } });
    const label = (n, f, a, c) => ({ name: { text: n, c }, free: { text: f }, also: { text: a } });

    A.step('A <b>bulk material</b>: X, Y and Z are all far above 100 nm. Three dimensions are still "free" to shrink.');
    A.step('Shrink <b>Z</b> into the 1–100 nm range (15 nm). One dimension is nano, two are still large: <b>2D nanomaterial</b>.',
      { ...set('z', 15, '15 nm', 'c2'), ...shape(440, 118, 210, 14, 'c2'), ...label('2D nanomaterial', '2 free dimensions', 'nano-film · coating · layer · plate · sheet', 'c2') }, { dur: 1100 });
    A.step('Shrink <b>Y</b> too (20 nm). Two dimensions are nano, one is still long: <b>1D nanomaterial</b>.',
      { ...set('y', 20, '20 nm', 'c2'), ...shape(440, 120, 210, 10, 'c2'), ...label('1D nanomaterial', '1 free dimension', 'nano-wire · rod · fiber · tube', 'c2') }, { dur: 1100 });
    A.step('Shrink <b>X</b> as well (30 nm). Nothing is left to shrink: <b>0D nanomaterial</b>, a <b>nanoparticle</b>.',
      { ...set('x', 30, '30 nm', 'c2'), ...shape(535, 116, 20, 20, 'c2'), ...label('0D nanomaterial', '0 free dimensions', 'nanoparticle', 'c2') }, { dur: 1100 });
    A.step('Below <b>10 nm</b> a second shift starts. Start again from the nanoparticle and push <b>Z</b> to 5 nm: <b>quantum well</b>.',
      { ...set('z', 5, '5 nm', 'c4'), ...shape(536, 118, 18, 12, 'c4'), ...label('Quantum well', 'one dimension below 10 nm', 'also quantum film / coating', 'c4') }, { dur: 1100 });
    A.step('Push <b>Y</b> to 5 nm: two dimensions below 10 nm, a <b>quantum wire</b>.',
      { ...set('y', 5, '5 nm', 'c4'), ...shape(536, 120, 18, 8, 'c4'), ...label('Quantum wire', 'two dimensions below 10 nm', '', 'c4') }, { dur: 1100 });
    A.step('Push <b>X</b> to 3 nm: all three below 10 nm, a <b>quantum dot</b>, the smallest particle made. Every quantum material is also a nanomaterial.',
      { ...set('x', 3, '3 nm', 'c4'), ...shape(540, 120, 8, 8, 'c4'), ...label('Quantum dot', 'all three dimensions below 10 nm', 'quantum ⊂ nano, never the other way round', 'c4') }, { dur: 1100, fx: ['shape'] });
  });

  /* ---------- L6: MRI — align, disturb, relax, detect ---------- */
  def('mri', { w: 700, h: 320 }, (A) => {
    const start = [35, 160, 290, 75, 220, 330, 120, 250, 15, 190, 300, 95];
    const P = (i) => [90 + (i % 4) * 62, 92 + Math.floor(i / 4) * 66];
    A.area('body', { tx: 50, ty: 56, w: 260, h: 196, c: 'c5', label: 'tissue: water → hydrogen protons' });
    start.forEach((r, i) => { const [x, y] = P(i); A.text('p' + i, { tx: x, ty: y + 8, text: '↑', size: 26, weight: 700, rot: r, c: 'c3' }); });
    A.box('mag', { tx: 180, ty: 286, w: 220, h: 34, text: 'strong magnet (1.5–3 T)', c: 'c0', fill: 'ghost' });
    A.box('rf', { tx: 400, ty: 90, w: 120, h: 44, text: 'RF pulse', sub: 'off', c: 'c2', fill: 'ghost' });
    A.box('coil', { tx: 400, ty: 210, w: 120, h: 44, text: 'coil', sub: 'listening', c: 'c1', fill: 'ghost' });
    A.box('pc', { tx: 590, ty: 210, w: 150, h: 70, text: 'computer', sub: 'energy → image', c: 'c3', fill: 'ghost' });
    A.dot('e1', { tx: 280, ty: 150, r: 6, c: 'c1', o: 0 });
    A.dot('e2', { tx: 280, ty: 170, r: 6, c: 'c1', o: 0 });
    A.text('img', { tx: 590, ty: 290, text: '', size: 12.5, c: 'c3' });
    const all = (o) => Object.fromEntries(start.map((r, i) => ['p' + i, o(r, i)]));

    A.step('Our tissues are full of <b>water</b>. Each hydrogen nucleus is a spinning <b>proton</b>, a tiny magnet. Normally they point in <b>random</b> directions.');
    A.step('Inside the MRI\'s strong <b>magnetic field</b> the protons <b>align</b> with it, like iron filings around a magnet.', { ...all(() => ({ rot: 0 })), mag: { fill: 'solid' } }, { dur: 1200 });
    A.step('The technician sends a <b>radio-frequency pulse</b>. It pushes the protons out of line (here by 90°): they absorb energy.', { ...all(() => ({ rot: 90, c: 'c2' })), rf: { fill: 'solid', sub: 'ON' } }, { dur: 1200, fx: ['rf'] });
    A.step('The pulse is switched off. The protons <b>realign</b> with the field and <b>release that energy</b>.', { ...all(() => ({ rot: 0, c: 'c3' })), rf: { fill: 'ghost', sub: 'off' }, e1: { o: 1, tx: 345, ty: 205 }, e2: { o: 1, tx: 345, ty: 215 } }, { dur: 1300 });
    A.step('The <b>coil</b> detects the released energy. Protons in different tissues give <b>different amounts</b> of energy.', { coil: { fill: 'solid', sub: 'signal!' }, e1: { tx: 400, ty: 210, o: 0 }, e2: { tx: 400, ty: 210, o: 0 } }, { fx: ['coil'] });
    A.step('A <b>computer</b> turns those energies into a 3D image. It is <b>not a photograph</b>, and no ionizing radiation was used: MRI is <b>non-invasive</b>.', { pc: { fill: 'solid' }, img: { text: 'different energy → different grey' } }, { fx: ['pc'] });
  });

  /* ---------- L6: photoacoustic imaging — light in, sound out ---------- */
  def('pai', { w: 700, h: 300 }, (A) => {
    A.box('laser', { tx: 80, ty: 70, w: 120, h: 44, text: 'laser', sub: 'pulse', c: 'c4', fill: 'ghost' });
    A.line('beam', { x1: 140, y1: 84, x2: 320, y2: 160, c: 'c4', sw: 3, draw: 0 });
    A.area('tissue', { tx: 230, ty: 120, w: 260, h: 150, c: 'c5', label: 'tissue' });
    A.dot('np', { tx: 340, ty: 175, r: 9, c: 'c2' });
    A.text('npl', { tx: 340, ty: 205, text: 'Au NP (absorber)', size: 11, c: 'c2' });
    A.dot('el', { tx: 340, ty: 175, r: 3.5, c: 'text', o: 0 });
    A.dot('heat', { tx: 340, ty: 175, r: 14, c: 'c4', o: 0 });
    A.dot('w1', { tx: 340, ty: 175, r: 26, c: 'c3', ring: true, o: 0 });
    A.dot('w2', { tx: 340, ty: 175, r: 26, c: 'c3', ring: true, o: 0 });
    A.box('tr', { tx: 600, ty: 175, w: 130, h: 54, text: 'ultrasound', sub: 'transducer', c: 'c1', fill: 'ghost' });
    A.text('stage', { tx: 350, ty: 34, text: '', size: 14, weight: 700, c: 'c3' });

    A.step('Photoacoustic imaging: <b>photo</b> (light energy) + <b>acoustic</b> (sound). A tissue contains a strong light absorber, here a gold nanoparticle.');
    A.step('<b>Step 1.</b> A <b>laser pulse</b> illuminates the tissue.', { beam: { draw: 1 }, laser: { fill: 'solid' }, stage: { text: '1 · illuminate with a laser pulse' } }, { dur: 900 });
    A.step('<b>Step 2.</b> The absorbed light <b>excites electrons</b>. They relax back to the ground state and the energy is released as <b>heat</b>.',
      { el: { o: 1, ty: 150 }, stage: { text: '2 · electrons excited → relax → heat' } }, { dur: 700 });
    A.step('…the electron relaxes and the spot heats up.', { el: { ty: 175, o: 0 }, heat: { o: 0.7 }, np: { c: 'c4' } }, { dur: 800, fx: ['heat'] });
    A.step('<b>Step 3.</b> The heated spot <b>expands</b> abruptly (thermal expansion) and sends out a <b>thermoacoustic wave</b>…',
      { heat: { s: 1.5, o: 0.4 }, w1: { o: 1, s: 2.4 }, beam: { o: 0.25 }, stage: { text: '3 · thermal expansion → thermoacoustic wave' } }, { dur: 1100 });
    A.step('…which travels out and is detected by an <b>ultrasound transducer</b>. Light in, <b>sound out</b>: that is how PAI differs from ultrasound.',
      { w1: { s: 5, o: 0 }, w2: { o: 1, s: 4 }, tr: { fill: 'solid' } }, { dur: 1300, fx: ['tr'] });
    A.step('Plasmonic nanoparticles (<b>Au, Ag, SWNT</b>) absorb light far better and convert it to sound efficiently, so the signal and the image get much stronger.',
      { w2: { s: 5, o: 0 }, np: { r: 12 }, stage: { text: 'anatomy + function + molecules, several cm deep' } }, { dur: 900 });
  });

  /* ---------- L7: inside a biosensor ---------- */
  def('biosensor', { w: 700, h: 320 }, (A) => {
    A.text('hA', { tx: 90, ty: 26, text: 'analyte', size: 11, c: 'mute', mono: true });
    A.text('hR', { tx: 260, ty: 26, text: 'receptor', size: 11, c: 'mute', mono: true });
    A.text('hT', { tx: 410, ty: 26, text: 'transducer', size: 11, c: 'mute', mono: true });
    A.text('hO', { tx: 600, ty: 26, text: 'output', size: 11, c: 'mute', mono: true });
    const an = [[60, 80, 'c4', 1], [110, 130, 'c0', 0], [70, 190, 'c4', 1], [120, 250, 'c5', 0], [50, 270, 'c4', 1], [130, 70, 'c5', 0]];
    an.forEach(([x, y, c], i) => A.dot('a' + i, { tx: x, ty: y, r: 9, c }));
    A.text('aL', { tx: 90, ty: 305, text: 'coral = target antigen', size: 11, c: 'c4' });
    [[260, 90], [260, 165], [260, 240]].forEach(([x, y], i) => A.text('r' + i, { tx: x, ty: y + 9, text: 'Y', size: 30, weight: 700, rot: 90, c: 'c3' }));
    A.area('nano', { tx: 296, ty: 60, w: 14, h: 220, c: 'c1' });
    A.text('nanoL', { tx: 303, ty: 300, text: 'graphene', size: 10.5, c: 'c1' });
    A.box('td', { tx: 410, ty: 170, w: 150, h: 220, text: 'transducer', sub: 'waiting', c: 'c0', fill: 'ghost' });
    A.line('wire', { x1: 486, y1: 170, x2: 525, y2: 170, c: 'mute', head: true });
    A.box('out', { tx: 600, ty: 170, w: 130, h: 80, text: '', sub: 'signal', c: 'c2', fill: 'ghost' });
    A.text('val', { tx: 600, ty: 176, num: 0, fmt: (v) => `${v.toFixed(1)} µA`, size: 18, weight: 700, mono: true });

    A.step('A biosensor has a <b>receptor</b> (here antibodies, Y), held on a <b>transducer</b> by a nanomaterial layer (graphene). Around it: the <b>analyte</b> we want, and other look-alike molecules.');
    A.step('<b>Lock and key</b>: each target antigen binds an antibody. The other molecules do not fit. Ignoring them is <b>selectivity</b>.',
      { a0: { tx: 236, ty: 99 }, a2: { tx: 236, ty: 174 }, a4: { tx: 236, ty: 249 }, a1: { tx: 150, ty: 140 }, a3: { tx: 150, ty: 230 } }, { dur: 1300 });
    A.step('The binding changes something: here <b>electrons flow</b>. The <b>transducer</b> turns that biological event into an electrical signal.',
      { td: { fill: 'solid', sub: 'amperometric' }, out: { fill: 'solid' }, val: { num: 1.2 } }, { dur: 900, fx: ['td'] });
    A.step('An <b>amperometric</b> biosensor\'s current is <b>proportional to the bioreaction</b>: more analyte bound → more current. How steeply it rises is the <b>sensitivity</b>.',
      { val: { num: 3.6 }, r0: { c: 'c4' }, r1: { c: 'c4' }, r2: { c: 'c4' } }, { dur: 1100 });
    A.step('A thermal transducer would measure <b>heat</b>, an optical one <b>light intensity</b>. The smallest amount it can still see is the <b>limit of detection</b>: lower means earlier diagnosis.',
      { out: { sub: 'current · heat · light' } });
  });
})();
