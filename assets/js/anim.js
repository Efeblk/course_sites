/* Animated diagrams for the guided lessons: a small scene player.
 *
 * Register an animation (usually in <course>/anims.js):
 *   CS.anim.def('name', { w: 640, h: 300, reroll?: 'New data', slider?: { key, label, min, max, step, value, fmt? } },
 *     (A, p) => { ... });                 // p = { seed, [slider.key]: value }
 * Use it as a lesson figure:  fig: { type: 'anim', name: 'name', t: 'title', cap: 'note' }
 *
 * Inside the builder, add elements (each one is an SVG group placed at tx, ty) and then the scenes:
 *   A.box(id,  { tx, ty, w, h, c, text, sub, fill: 'soft' | 'solid' | 'ghost', fs })
 *   A.dot(id,  { tx, ty, r, c, ring })
 *   A.text(id, { tx, ty, text, c, size, anchor, weight, mono, num, fmt })   // num is tweened, shown via fmt
 *   A.line(id, { x1, y1, x2, y2, c, sw, dash, head, bend, draw })           // draw 0..1 draws it in
 *   A.area(id, { tx, ty, w, h, c, label })                                  // top-left anchored region / bar
 *   A.step('caption (HTML)', { id: { prop: value, ... } }, { dur, fx: [ids to pulse] })
 * Every prop is optional; o (opacity), s (scale) and rot (degrees) work on everything. Numeric props tween;
 * colours fade through CSS; text swaps. A move can curve: { tx, ty, via: [cx, cy] } (quadratic control point).
 * Scenes are cumulative, so stepping backwards or jumping to any scene always shows the right picture.
 * With "reduce motion" switched on in the OS, nothing autoplays and changes are instant.
 */
(function () {
  const { el } = CS;
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const col = (c) => (!c ? 'var(--muted)' : c === 'text' ? 'var(--text)' : c.startsWith('#') || c.startsWith('var') ? c : `var(--f-${c})`);
  const NUM = ['tx', 'ty', 's', 'o', 'rot', 'w', 'h', 'r', 'x1', 'y1', 'x2', 'y2', 'sw', 'draw', 'num', 'bend', 'size'];
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const defs = {};

  function s(tag, attrs, ...kids) {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) n.setAttribute(k, v);
    n.append(...kids.filter((k) => k != null));
    return n;
  }
  function rng(seed) { // mulberry32
    let a = seed >>> 0 || 1;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function setText(node, str) {
    const lines = String(str ?? '').split('\n');
    if (lines.length === 1) { node.textContent = lines[0]; return; }
    node.textContent = '';
    const lh = 1.2, y0 = -((lines.length - 1) * lh) / 2;
    lines.forEach((ln, i) => node.append(s('tspan', { x: node.getAttribute('x') || 0, dy: i ? `${lh}em` : `${y0}em` }, ln)));
  }

  /* ---- the builder handed to each definition ---- */
  function builder(cfg, p) {
    const els = {}, order = [], steps = [];
    const base = {
      box: { w: 110, h: 40, c: 'c0', fill: 'soft', text: '', sub: '', fs: 13 },
      dot: { r: 7, c: 'c0' },
      text: { text: '', c: 'text', size: 13, anchor: 'middle' },
      line: { x1: 0, y1: 0, x2: 0, y2: 0, c: 'mute', sw: 1.6, draw: 1, bend: 0 },
      area: { w: 100, h: 40, c: 'c0', label: '' },
    };
    const add = (type) => (id, props = {}) => {
      if (els[id]) throw new Error(`anim: duplicate element "${id}"`);
      els[id] = { type, init: { tx: 0, ty: 0, s: 1, o: 1, rot: 0, ...base[type], ...props } };
      order.push(id);
      return id;
    };
    return {
      p, W: cfg.w, H: cfg.h, rand: rng(p.seed),
      box: add('box'), dot: add('dot'), text: add('text'), line: add('line'), area: add('area'),
      step(cap, ch = {}, o = {}) { steps.push({ cap, ch, ...o }); },
      els, order, steps,
    };
  }

  /* ---- build the SVG nodes for one element ---- */
  function create(svg, id, e, markers) {
    const g = s('g', { class: `a-${e.type}`, 'data-id': id });
    const p = e.init;
    if (e.type === 'box') g.append(s('rect'), s('text', { class: 'a-t', 'text-anchor': 'middle' }), s('text', { class: 'a-sub', 'text-anchor': 'middle' }));
    if (e.type === 'dot') g.append(s('circle'));
    if (e.type === 'text') g.append(s('text', { class: (p.mono ? 'mono ' : '') + (p.italic ? 'it' : '') }));
    if (e.type === 'line') g.append(s('path', { pathLength: 1 }));
    if (e.type === 'area') g.append(s('rect'), s('text', { class: 'a-alab', x: 6, y: 14 }));
    e.g = g;
    e.markers = markers;
    svg.append(g);
  }
  function marker(svg, markers, c) {
    if (markers[c]) return markers[c];
    const id = 'ah-' + Math.random().toString(36).slice(2, 8);
    svg.querySelector('defs').append(s('marker', { id, viewBox: '0 0 10 10', refX: 8.5, refY: 5, markerWidth: 6.5, markerHeight: 6.5, orient: 'auto-start-reverse' },
      s('path', { d: 'M0,0 L10,5 L0,10 z', style: `fill:${col(c)}` })));
    return (markers[c] = id);
  }
  /* apply a full set of props to an element (numbers already interpolated) */
  function apply(svg, e, p, prev) {
    const g = e.g;
    g.setAttribute('transform', `translate(${p.tx},${p.ty})${p.rot ? ` rotate(${p.rot})` : ''}${p.s !== 1 ? ` scale(${p.s})` : ''}`);
    g.style.opacity = p.o;
    g.style.setProperty('--c', col(p.c));
    const changed = (k) => !prev || prev[k] !== p[k];
    if (e.type === 'box') {
      const [r, t, sub] = g.children;
      r.setAttribute('x', -p.w / 2); r.setAttribute('y', -p.h / 2); r.setAttribute('width', Math.max(0, p.w)); r.setAttribute('height', Math.max(0, p.h)); r.setAttribute('rx', p.rx ?? 5);
      g.setAttribute('class', `a-box ${p.fill}`);
      t.style.fontSize = p.fs + 'px';
      if (changed('text')) setText(t, p.text);
      if (changed('sub')) sub.textContent = p.sub || '';
      t.setAttribute('y', p.sub ? -3 : 4.5);
      sub.setAttribute('y', 13);
    } else if (e.type === 'dot') {
      const c = g.firstChild;
      c.setAttribute('r', Math.max(0, p.r));
      g.setAttribute('class', 'a-dot' + (p.ring ? ' ring' : ''));
    } else if (e.type === 'text') {
      const t = g.firstChild;
      t.setAttribute('text-anchor', p.anchor);
      t.style.fontSize = p.size + 'px';
      t.style.fontWeight = p.weight || '';
      t.setAttribute('y', p.size * 0.35);
      const str = p.num != null ? (p.fmt ? p.fmt(p.num) : String(Math.round(p.num))) : p.text;
      if (!prev || prev._shown !== str) setText(t, str);
      p._shown = str;
    } else if (e.type === 'line') {
      const path = g.firstChild;
      const mx = (p.x1 + p.x2) / 2, my = (p.y1 + p.y2) / 2, len = Math.hypot(p.x2 - p.x1, p.y2 - p.y1) || 1;
      const cx = mx + ((p.y2 - p.y1) / len) * p.bend, cy = my - ((p.x2 - p.x1) / len) * p.bend;
      path.setAttribute('d', p.bend ? `M${p.x1},${p.y1} Q${cx},${cy} ${p.x2},${p.y2}` : `M${p.x1},${p.y1} L${p.x2},${p.y2}`);
      path.style.strokeWidth = p.sw;
      // pathLength = 1 lets "draw" work as a 0..1 fraction, but it would also stretch a dash pattern, so dashed lines go without
      if (p.dash) { path.removeAttribute('pathLength'); path.style.strokeDasharray = p.dash === true ? '5 4' : p.dash; path.style.strokeDashoffset = ''; }
      else { path.setAttribute('pathLength', 1); path.style.strokeDasharray = '1 1'; path.style.strokeDashoffset = 1 - p.draw; }
      if (p.head) path.setAttribute('marker-end', p.draw > 0.98 ? `url(#${marker(svg, e.markers, p.c)})` : '');
      else path.removeAttribute('marker-end');
    } else if (e.type === 'area') {
      const [r, t] = g.children;
      r.setAttribute('width', Math.max(0, p.w)); r.setAttribute('height', Math.max(0, p.h)); r.setAttribute('rx', p.rx ?? 4);
      g.setAttribute('class', 'a-area' + (p.solid ? ' solid' : ''));
      if (changed('label')) t.textContent = p.label || '';
    }
  }

  /* ---- the player ---- */
  function player(name, fig) {
    const def = defs[name];
    if (!def) return el('div', { class: 'callout bad' }, 'Unknown animation: ' + name);
    const { cfg, build } = def;
    const params = { seed: 1 };
    if (cfg.slider) params[cfg.slider.key] = cfg.slider.value;

    const svg = s('svg', { viewBox: `0 0 ${cfg.w} ${cfg.h}`, class: 'a-svg', role: 'img', 'aria-label': fig.t || name });
    const cap = el('div', { class: 'a-cap', 'aria-live': 'polite' });
    const ticks = el('div', { class: 'a-ticks' });
    const count = el('span', { class: 'a-count mono' });
    const playBtn = el('button', { class: 'a-play primary', title: 'Play / pause' });
    const speedSel = el('select', { class: 'a-speed', title: 'Speed' }, [['0.5', '0.5×'], ['1', '1×'], ['1.6', '1.6×']].map(([v, t]) => el('option', { value: v, selected: v === '1' ? '' : null }, t)));
    let A, states, cur = 0, playing = false, timer = 0, raf = 0, speed = 1, everPlayed = false;

    function rebuild() {
      A = builder(cfg, params);
      build(A, params);
      svg.replaceChildren(s('defs'));
      const markers = {};
      for (const id of A.order) create(svg, id, A.els[id], markers);
      // cumulative states; "via" only affects the move into that scene
      states = [];
      let st = Object.fromEntries(A.order.map((id) => [id, { ...A.els[id].init }]));
      for (const sc of A.steps) {
        st = { ...st };
        for (const [id, ch] of Object.entries(sc.ch)) {
          if (!st[id]) throw new Error(`anim ${name}: unknown element "${id}"`);
          const { via, ...rest } = ch;
          st[id] = { ...st[id], ...rest };
        }
        states.push(st);
      }
      for (const id of A.order) { const e = A.els[id]; e.cur = { ...states[0][id] }; apply(svg, e, e.cur, null); }
      fill(ticks, A.steps.map((_, i) => el('button', { class: 'a-tick', title: `Scene ${i + 1}`, onclick: () => { pause(); show(i, true); } })));
      cur = 0;
      label();
    }
    const fill = (n, kids) => n.replaceChildren(...kids);

    function label() {
      cap.innerHTML = A.steps[cur].cap;
      count.textContent = `${cur + 1} / ${A.steps.length}`;
      [...ticks.children].forEach((t, i) => t.className = 'a-tick' + (i < cur ? ' done' : i === cur ? ' on' : ''));
      playBtn.textContent = playing ? 'Pause' : cur === A.steps.length - 1 ? 'Replay' : everPlayed ? 'Play' : 'Play ▶';
      back.disabled = cur === 0;
      fwd.disabled = cur === A.steps.length - 1;
    }

    function show(k, animate, onDone) {
      cancelAnimationFrame(raf);
      const from = cur, sc = A.steps[k];
      cur = k;
      label();
      const dur = !animate || reduce ? 0 : (sc.dur ?? 750) / speed;
      const jobs = [];
      for (const id of A.order) {
        const e = A.els[id], a = e.cur, b = states[k][id];
        const via = k === from + 1 && sc.ch[id] && sc.ch[id].via;
        const keys = NUM.filter((key) => b[key] != null && a[key] !== b[key]);
        const other = Object.keys(b).some((key) => !NUM.includes(key) && key !== '_shown' && a[key] !== b[key]);
        if (!keys.length && !other && !via) continue;
        jobs.push({ e, a: { ...a }, b, keys, via });
      }
      const t0 = performance.now();
      const frame = (now) => {
        const t = dur ? Math.min(1, (now - t0) / dur) : 1, k2 = ease(t);
        for (const { e, a, b, keys, via } of jobs) {
          const p = { ...b, _shown: e.cur._shown };
          for (const key of keys) p[key] = a[key] + (b[key] - a[key]) * k2;
          if (via) { // quadratic curve through the control point
            const u = k2, [cx, cy] = via;
            p.tx = (1 - u) * (1 - u) * a.tx + 2 * (1 - u) * u * cx + u * u * b.tx;
            p.ty = (1 - u) * (1 - u) * a.ty + 2 * (1 - u) * u * cy + u * u * b.ty;
          }
          const prev = e.cur;
          e.cur = p;
          apply(svg, e, p, prev);
        }
        if (t < 1) raf = requestAnimationFrame(frame);
        else {
          for (const id of sc.fx || []) if (k === from + 1 || !animate) {
            const g = A.els[id].g; g.classList.remove('a-pulse'); void g.getBBox; requestAnimationFrame(() => g.classList.add('a-pulse'));
          }
          onDone && onDone();
        }
      };
      if (dur) raf = requestAnimationFrame(frame); else frame(t0);
    }

    function hold() { // reading time for the caption
      const txt = A.steps[cur].cap.replace(/<[^>]+>/g, '');
      return Math.min(7500, Math.max(2300, 1300 + txt.length * 42)) / speed;
    }
    function loop() {
      clearTimeout(timer);
      if (!playing) return;
      if (cur >= A.steps.length - 1) { playing = false; label(); return; }
      timer = setTimeout(() => show(cur + 1, true, loop), hold());
    }
    function play() {
      everPlayed = true;
      if (cur >= A.steps.length - 1) { show(0, false); }
      playing = true; label();
      loop();
    }
    function pause() { playing = false; clearTimeout(timer); label(); }

    const back = el('button', { title: 'Previous scene', onclick: () => { pause(); if (cur > 0) show(cur - 1, true); } }, '←');
    const fwd = el('button', { title: 'Next scene', onclick: () => { pause(); if (cur < A.steps.length - 1) show(cur + 1, true); } }, '→');
    playBtn.onclick = () => (playing ? pause() : play());
    speedSel.onchange = () => { speed = Number(speedSel.value); if (playing) loop(); };

    const extra = [];
    if (cfg.slider) {
      const sl = cfg.slider, out = el('b', { class: 'mono' });
      const fmt = sl.fmt || String;
      const input = el('input', { type: 'range', min: sl.min, max: sl.max, step: sl.step || 1, value: sl.value });
      out.textContent = fmt(sl.value);
      input.oninput = () => { out.textContent = fmt(Number(input.value)); };
      input.onchange = () => { params[sl.key] = Number(input.value); pause(); rebuild(); play(); };
      extra.push(el('label', { class: 'a-slider' }, sl.label + ' ', input, ' ', out));
    }
    if (cfg.reroll) extra.push(el('button', { class: 'chip', onclick: () => { params.seed = (Math.random() * 1e9) | 0; pause(); rebuild(); play(); } }, cfg.reroll));

    rebuild();
    const root = el('div', { class: 'a-player' },
      el('div', { class: 'a-stage' }, svg),
      cap,
      el('div', { class: 'a-controls' }, playBtn, back, fwd, count, ticks, speedSel),
      extra.length ? el('div', { class: 'a-extra' }, extra) : null);

    // autoplay the first time it is mostly on screen; pause when it scrolls away
    let resumeOnEnter = false;
    new IntersectionObserver((ents) => {
      for (const en of ents) {
        if (en.isIntersecting) {
          if (!everPlayed && !reduce) setTimeout(play, 350);
          else if (resumeOnEnter) { resumeOnEnter = false; play(); }
        } else if (playing) { resumeOnEnter = true; pause(); }
      }
    }, { threshold: 0.55 }).observe(root);
    return root;
  }

  CS.anim = {
    def(name, cfg, build) { defs[name] = { cfg, build }; },
    make: player,
    has: (name) => !!defs[name],
    list: () => Object.keys(defs),
  };
})();
