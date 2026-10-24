/* Small numeric helpers for the COE305 (Machine Learning) simulations.
 * Seeded randomness keeps the generated datasets identical on every visit.
 */
(function () {
  /* mulberry32: const r = ML.rng(42); r() → [0, 1) */
  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* standard normal sample (Box–Muller) */
  function gauss(r) {
    let u = 0;
    while (!u) u = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
  }
  const sum = (a) => a.reduce((s, v) => s + v, 0);
  const mean = (a) => sum(a) / a.length;
  const variance = (a) => { const m = mean(a); return mean(a.map((v) => (v - m) ** 2)); };
  const std = (a) => Math.sqrt(variance(a));
  const dist = (a, b, p = 2) => (p === Infinity
    ? Math.max(...a.map((v, i) => Math.abs(v - b[i])))
    : sum(a.map((v, i) => Math.abs(v - b[i]) ** p)) ** (1 / p));

  /* solve A x = b by Gaussian elimination with partial pivoting; null if singular */
  function solve(A, b) {
    const n = b.length, M = A.map((row, i) => [...row, b[i]]);
    for (let c = 0; c < n; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      if (Math.abs(M[p][c]) < 1e-12) return null;
      [M[c], M[p]] = [M[p], M[c]];
      for (let r = 0; r < n; r++) {
        if (r === c) continue;
        const f = M[r][c] / M[c][c];
        for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
      }
    }
    return M.map((row, i) => row[n] / row[i]);
  }
  /* least squares: rows of X (include a 1 column yourself for a bias), targets y */
  function lstsq(X, y, ridge = 1e-9) {
    const d = X[0].length;
    const A = Array.from({ length: d }, (_, i) => Array.from({ length: d }, (_, j) => sum(X.map((x) => x[i] * x[j])) + (i === j ? ridge : 0)));
    const b = Array.from({ length: d }, (_, i) => sum(X.map((x, t) => x[i] * y[t])));
    return solve(A, b);
  }
  /* entropy in bits of a list of counts or probabilities */
  function entropy(counts) {
    const n = sum(counts);
    return n ? -sum(counts.filter((c) => c > 0).map((c) => (c / n) * Math.log2(c / n))) : 0;
  }

  const COLORS = ['#6aa8ff', '#3ecf8e', '#ffb547', '#9b7bff', '#ff6b6b', '#4fd1e0', '#ff8a5c', '#e879c6', '#b5e655', '#a0a8b8'];
  const fmt = (v, d = 3) => (Number.isFinite(v) ? (+v.toFixed(d)).toString() : '—');

  window.ML = { rng, gauss, sum, mean, variance, std, dist, solve, lstsq, entropy, COLORS, fmt };
})();
