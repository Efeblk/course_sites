/* Minimal SVG plotting for simulations.
 * const P = Plot(svgElement, { x: [-4, 4], y: [0, 1], w: 520, h: 260 });
 * P.axes({ xticks: [-4, 0, 4], yticks: [0, .5, 1] }); P.line(xs.map(...)); P.dot(x, y, {fill});
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  function make(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) n.setAttribute(k, v);
    if (parent) parent.append(n);
    return n;
  }
  function Plot(svg, { x, y, w = 520, h = 260, pad = [16, 16, 30, 40] }) {
    const [pt, pr, pb, pl] = pad;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.classList.add('plot');
    svg.replaceChildren();
    const sx = (v) => pl + ((v - x[0]) / (x[1] - x[0])) * (w - pl - pr);
    const sy = (v) => h - pb - ((v - y[0]) / (y[1] - y[0])) * (h - pt - pb);
    const inv = (px, py) => [x[0] + ((px - pl) / (w - pl - pr)) * (x[1] - x[0]), y[0] + ((h - pb - py) / (h - pt - pb)) * (y[1] - y[0])];
    const P = {
      svg, sx, sy, inv, w, h,
      axes({ xticks = [], yticks = [], xlabel, ylabel, grid = true } = {}) {
        if (grid) {
          for (const t of xticks) make('line', { class: 'grid', x1: sx(t), x2: sx(t), y1: sy(y[0]), y2: sy(y[1]) }, svg);
          for (const t of yticks) make('line', { class: 'grid', x1: sx(x[0]), x2: sx(x[1]), y1: sy(t), y2: sy(t) }, svg);
        }
        make('line', { class: 'axis', x1: sx(x[0]), x2: sx(x[1]), y1: sy(y[0]), y2: sy(y[0]) }, svg);
        make('line', { class: 'axis', x1: sx(x[0]), x2: sx(x[0]), y1: sy(y[0]), y2: sy(y[1]) }, svg);
        for (const t of xticks) P.text(sx(t), sy(y[0]) + 14, String(t), { 'text-anchor': 'middle' }, true);
        for (const t of yticks) P.text(sx(x[0]) - 6, sy(t) + 4, String(t), { 'text-anchor': 'end' }, true);
        if (xlabel) P.text(sx(x[1]), sy(y[0]) - 6, xlabel, { 'text-anchor': 'end' }, true);
        if (ylabel) P.text(sx(x[0]) + 6, sy(y[1]) + 10, ylabel, {}, true);
        return P;
      },
      path(points, attrs = {}) {
        const d = points.map(([a, b], i) => `${i ? 'L' : 'M'}${sx(a).toFixed(1)},${sy(b).toFixed(1)}`).join('');
        return make('path', { d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2, ...attrs }, svg);
      },
      fn(f, attrs, n = 200) {
        const pts = [];
        for (let i = 0; i <= n; i++) { const a = x[0] + ((x[1] - x[0]) * i) / n; pts.push([a, f(a)]); }
        return P.path(pts, attrs);
      },
      seg(x1, y1, x2, y2, attrs = {}) {
        return make('line', { x1: sx(x1), y1: sy(y1), x2: sx(x2), y2: sy(y2), stroke: 'var(--muted)', 'stroke-width': 1.5, ...attrs }, svg);
      },
      dot(a, b, attrs = {}) {
        return make('circle', { cx: sx(a), cy: sy(b), r: 5, fill: 'var(--accent)', ...attrs }, svg);
      },
      rect(a, b, a2, b2, attrs = {}) {
        const X = Math.min(sx(a), sx(a2)), Y = Math.min(sy(b), sy(b2));
        return make('rect', { x: X, y: Y, width: Math.abs(sx(a2) - sx(a)), height: Math.abs(sy(b2) - sy(b)), fill: 'var(--accent)', ...attrs }, svg);
      },
      text(px, py, str, attrs = {}, raw = false) {
        const t = make('text', raw ? { x: px, y: py, ...attrs } : { x: sx(px), y: sy(py), ...attrs }, svg);
        t.textContent = str;
        return t;
      },
      el: (tag, attrs) => make(tag, attrs, svg),
    };
    return P;
  }
  window.Plot = Plot;
})();
