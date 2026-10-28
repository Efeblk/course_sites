/* Diagrams for the guided lessons. A step's `fig` is a short description (or an array of them):
 *
 *   flow    { items: [[icon, title, sub?, color?], ...], down?: true }      boxes joined by arrows
 *   stack   { items: [[title, sub?, color?], ...], top?, bottom?, pyramid? } layers, top to bottom
 *   compare { cols: [{ icon, t, pts: [..], c }], vs?: true }                 side-by-side cards
 *   boxes   { head?: [..], rows: [{ label?, cells: [[text, color?, sub?], ...] }] }   colored grid
 *   graph   { w, h, nodes: { id: [x, y, label, color?] }, edges: [[from, to, label?, bend?]] }  state diagram
 *   plot    { w, h, x: [lo, hi], y: [lo, hi], xl?, yl?, pts?: [[x, y, color, label?]],
 *             lines?: [{ pts: [[x, y], ...], c?, dash?, label? }], rects?: [{ x0, y0, x1, y1, c?, label? }],
 *             texts?: [[x, y, text, color?]] }
 *   bars    { items: [[label, value, color?, text?]], max? }
 *   anim    { name }   an animated, step-by-step diagram from anim.js (registered in <course>/anims.js)
 * Every figure can have `cap` (caption, HTML allowed) and `t` (small title).
 * Colors: c0 blue · c1 green · c2 orange · c3 purple · c4 coral · c5 cyan · ok · bad · warn · mute.
 */
(function () {
  const { el } = CS;
  const SVG = 'http://www.w3.org/2000/svg';
  const col = (c) => `var(--f-${c || 'c0'})`;
  function s(tag, attrs, ...kids) {
    const n = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) n.setAttribute(k, v);
    for (const k of kids.flat()) if (k != null) n.append(k instanceof Node ? k : document.createTextNode(String(k)));
    return n;
  }

  const R = {
    flow(f) {
      return el('div', { class: 'f-flow' + (f.down ? ' down' : '') }, f.items.map(([icon, t, sub, c], i) => [
        i ? el('div', { class: 'f-arrow' }, f.down ? '↓' : '→') : null,
        el('div', { class: 'f-box', style: { '--c': col(c) } },
          icon ? el('div', { class: 'f-icon' }, icon) : null,
          el('div', { class: 'f-t', html: t }), sub ? el('div', { class: 'f-sub', html: sub }) : null),
      ]));
    },
    stack(f) {
      const n = f.items.length;
      return el('div', { class: 'f-stack-wrap' },
        f.top || f.bottom ? el('div', { class: 'f-side' }, el('span', {}, f.top || ''), el('span', { class: 'f-line' }), el('span', {}, f.bottom || '')) : null,
        el('div', { class: 'f-stack' }, f.items.map(([t, sub, c], i) => el('div', {
          class: 'f-layer', style: { '--c': col(c || 'c' + (i % 6)), width: f.pyramid ? `${40 + (60 * (i + 1)) / n}%` : '100%' },
        }, el('b', { html: t }), sub ? el('span', { html: sub }) : null))));
    },
    compare(f) {
      return el('div', { class: 'f-compare' }, f.cols.map((c, i) => [
        i && f.vs ? el('div', { class: 'f-vs' }, 'vs') : null,
        el('div', { class: 'f-card', style: { '--c': col(c.c || 'c' + i) } },
          c.icon ? el('div', { class: 'f-icon big' }, c.icon) : null,
          el('div', { class: 'f-t', html: c.t }),
          c.pts ? el('ul', {}, c.pts.map((p) => el('li', { html: p }))) : null),
      ]));
    },
    boxes(f) {
      const w = Math.max(...f.rows.map((r) => r.cells.length));
      const lab = f.rows.some((r) => r.label);
      return el('div', { class: 'f-boxes', style: { gridTemplateColumns: `${lab ? 'auto ' : ''}repeat(${w}, minmax(0, 1fr))` } },
        f.head ? [lab && f.head.length === w ? el('div') : null, f.head.map((h) => el('div', { class: 'f-head', html: h }))] : null, // head may include the label column
        f.rows.map((r) => [
          lab ? el('div', { class: 'f-rlabel', html: r.label || '' }) : null,
          r.cells.map(([t, c, sub]) => el('div', { class: 'f-cell' + (c ? '' : ' plain'), style: c ? { '--c': col(c) } : null },
            el('div', { html: t }), sub ? el('div', { class: 'f-sub', html: sub }) : null)),
        ]));
    },
    graph(f) {
      const W = f.w || 640, H = f.h || 260;
      const size = (lab) => [Math.max(64, String(lab).replace(/<[^>]+>/g, '').length * 7.4 + 24), 34];
      const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f-svg' },
        s('defs', {}, s('marker', { id: 'f-ah', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' },
          s('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'var(--muted)' }))));
      const N = {};
      for (const [id, [x, y, lab, c]] of Object.entries(f.nodes)) N[id] = { x, y, lab, c, wh: size(lab) };
      // where the segment from the node centre towards (tx, ty) leaves the node's box
      const exit = (n, tx, ty) => {
        const dx = tx - n.x, dy = ty - n.y, [w, h] = n.wh;
        const k = Math.min(Math.abs(w / 2 / (dx || 1e-9)), Math.abs(h / 2 / (dy || 1e-9)));
        return [n.x + dx * Math.min(k, 1), n.y + dy * Math.min(k, 1)];
      };
      const labels = []; // drawn after every edge, so no line crosses a label
      for (const [a, b, lab, bend = 0] of f.edges) {
        const A = N[a], B = N[b];
        if (a === b) { // self-loop above the node
          const [w, h] = A.wh, y = A.y - h / 2;
          svg.append(s('path', { d: `M${A.x - 12},${y} C${A.x - 30},${y - 42} ${A.x + 30},${y - 42} ${A.x + 12},${y}`, class: 'f-edge', pathLength: 1, 'marker-end': 'url(#f-ah)' }));
          if (lab) labels.push([A.x, y - 40, lab]);
          continue;
        }
        const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
        const cx = mx - ((B.y - A.y) / len) * bend, cy = my + ((B.x - A.x) / len) * bend;
        const [x1, y1] = exit(A, cx, cy), [x2, y2] = exit(B, cx, cy);
        svg.append(s('path', { d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, class: 'f-edge', pathLength: 1, 'marker-end': 'url(#f-ah)' }));
        if (lab) labels.push([0.25 * x1 + 0.5 * cx + 0.25 * x2, 0.25 * y1 + 0.5 * cy + 0.25 * y2, lab]);
      }
      for (const [lx, ly, lab] of labels)
        svg.append(s('rect', { x: lx - lab.length * 3.2 - 4, y: ly - 9, width: lab.length * 6.4 + 8, height: 18, rx: 4, class: 'f-elab-bg' }),
          s('text', { x: lx, y: ly + 4, class: 'f-elab', 'text-anchor': 'middle' }, lab));
      for (const n of Object.values(N)) {
        const [w, h] = n.wh;
        svg.append(s('rect', { x: n.x - w / 2, y: n.y - h / 2, width: w, height: h, rx: 9, class: 'f-node', style: `--c:${col(n.c)}` }),
          s('text', { x: n.x, y: n.y + 5, 'text-anchor': 'middle', class: 'f-ntext' }, n.lab));
      }
      return svg;
    },
    plot(f) {
      const W = f.w || 520, H = f.h || 300, m = { l: 44, r: 14, t: 14, b: 38 };
      const [x0, x1] = f.x, [y0, y1] = f.y;
      const X = (v) => m.l + ((v - x0) / (x1 - x0)) * (W - m.l - m.r);
      const Y = (v) => H - m.b - ((v - y0) / (y1 - y0)) * (H - m.t - m.b);
      const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'f-svg plotf' },
        s('line', { x1: m.l, y1: H - m.b, x2: W - m.r, y2: H - m.b, class: 'f-axis' }),
        s('line', { x1: m.l, y1: m.t, x2: m.l, y2: H - m.b, class: 'f-axis' }),
        f.xl ? s('text', { x: (W + m.l) / 2, y: H - 8, 'text-anchor': 'middle', class: 'f-alab' }, f.xl) : null,
        f.yl ? s('text', { x: 14, y: (H - m.b + m.t) / 2, 'text-anchor': 'middle', class: 'f-alab', transform: `rotate(-90 14 ${(H - m.b + m.t) / 2})` }, f.yl) : null);
      for (const r of f.rects || []) {
        svg.append(s('rect', { x: X(Math.min(r.x0, r.x1)), y: Y(Math.max(r.y0, r.y1)), width: Math.abs(X(r.x1) - X(r.x0)), height: Math.abs(Y(r.y1) - Y(r.y0)),
          class: 'f-prect', style: `--c:${col(r.c || 'c2')}` }));
        if (r.label) svg.append(s('text', { x: X(Math.min(r.x0, r.x1)) + 6, y: Y(Math.max(r.y0, r.y1)) + 15, class: 'f-plab', style: `fill:${col(r.c || 'c2')}` }, r.label));
      }
      for (const l of f.lines || []) {
        svg.append(s('polyline', { points: l.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' '), class: 'f-pline' + (l.dash ? ' dashed' : ''), style: `stroke:${col(l.c || 'c2')}`, 'stroke-dasharray': l.dash ? '6 5' : null, pathLength: l.dash ? null : 1 }));
        if (l.label) { const [x, y] = l.pts[l.pts.length - 1]; svg.append(s('text', { x: X(x) - 4, y: Y(y) - 7, 'text-anchor': 'end', class: 'f-plab', style: `fill:${col(l.c || 'c2')}` }, l.label)); }
      }
      for (const [x, y, c, lab] of f.pts || []) {
        svg.append(s('circle', { cx: X(x), cy: Y(y), r: 6, class: 'f-pt', style: `fill:${col(c)}` }));
        if (lab) svg.append(s('text', { x: X(x) + 9, y: Y(y) + 4, class: 'f-plab' }, lab));
      }
      for (const [x, y, t, c] of f.texts || []) svg.append(s('text', { x: X(x), y: Y(y), class: 'f-plab', 'text-anchor': 'middle', style: c ? `fill:${col(c)}` : null }, t));
      return svg;
    },
    bars(f) {
      const max = f.max || Math.max(...f.items.map((b) => b[1]));
      return el('div', { class: 'f-bars' }, f.items.map(([lab, v, c, txt]) => [
        el('div', { class: 'f-blab', html: lab }),
        el('div', { class: 'f-btrack' }, el('div', { class: 'f-bar', style: { width: `${(100 * v) / max}%`, '--c': col(c) } }),
          el('span', { class: 'f-bval' }, txt != null ? txt : v)),
      ]));
    },
  };

  R.anim = (f) => (CS.anim ? CS.anim.make(f.name, f) : el('div', { class: 'callout bad' }, 'anim.js is not loaded'));

  /* static diagrams build themselves up the first time they scroll into view (see .fig.pre / .fig.in in the CSS) */
  const seen = 'IntersectionObserver' in window && new IntersectionObserver((ents) => {
    for (const en of ents) if (en.isIntersecting) { en.target.classList.replace('pre', 'in'); seen.unobserve(en.target); }
  }, { threshold: 0.25 });
  const STAGGER = ['.f-box', '.f-arrow', '.f-layer', '.f-card', '.f-vs', '.f-cell', '.f-bar', '.f-node', '.f-ntext', '.f-edge', '.f-elab', '.f-elab-bg', '.f-pt', '.f-pline'];
  function figure(f) {
    if (Array.isArray(f)) return f.map(figure);
    const draw = R[f.type];
    if (!draw) return el('div', { class: 'callout bad' }, 'Unknown figure type: ' + f.type);
    const body = el('div', { class: 'fig-body' }, draw(f));
    const node = el('figure', { class: `fig f-${f.type}-fig` + (seen && f.type !== 'anim' ? ' pre' : '') },
      f.t ? el('div', { class: 'fig-t', html: f.t }) : null,
      body,
      f.cap ? el('figcaption', { html: f.cap }) : null);
    if (seen && f.type !== 'anim') {
      for (const sel of STAGGER) body.querySelectorAll(sel).forEach((n, i) => n.style.setProperty('--i', Math.min(i, 24)));
      requestAnimationFrame(() => seen.observe(node));
    }
    return node;
  }

  CS.figure = figure;
})();
