/* CPU-scheduling engine for COE303 Chapter 5 (Gantt Chart Lab, drill page, animations).
 * Rules follow the Chapter 5 slides (16–24): time units are ms, smaller priority number = higher priority,
 * ties go to the earlier arrival, then to the lower process number (first-come, first-served).
 * RR: a process that arrives while another runs joins the queue before the preempted process returns.
 *
 *   CPUS.run(procs, alg, { q })  procs = [{ id: 'P1', arr: 0, burst: 24, pri: 3 }, ...]
 *     alg: 'FCFS' | 'SJF' | 'SRTF' | 'RR' | 'PRI' (nonpreemptive priority) | 'PRR' (priority, RR inside a level)
 *     returns { slices: [{ id, s, e }] (id null = idle), done, tat, wait, avgWait, avgTat, end }
 *   CPUS.gantt(slices, opts) returns a DOM element (bars + time marks)
 */
(function () {
  const NAMES = {
    FCFS: 'FCFS (first-come, first-served)',
    SJF: 'SJF (nonpreemptive)',
    SRTF: 'SRTF (preemptive SJF)',
    RR: 'Round Robin',
    PRI: 'Priority (nonpreemptive)',
    PRR: 'Priority + Round Robin',
  };
  const order = (a, b) => a.arr - b.arr || a.i - b.i;

  function run(input, alg, opt = {}) {
    const q = Math.max(1, Number(opt.q) || 4);
    const P = input.map((p, i) => ({ ...p, i, rem: p.burst }));
    const slices = [];
    const push = (id, s, e) => {
      if (e <= s) return;
      const last = slices[slices.length - 1];
      // merge idle gaps, SRTF steps and PRR runs of one process; plain RR keeps each quantum visible as on slide 20
      if (last && last.id === id && last.e === s && (id === null || alg === 'SRTF' || alg === 'PRR')) last.e = e;
      else slices.push({ id, s, e });
    };
    let t = 0;
    const left = () => P.filter((p) => p.rem > 0);
    const ready = () => P.filter((p) => p.rem > 0 && p.arr <= t);
    const idleTo = () => { const nx = Math.min(...left().map((p) => p.arr)); push(null, t, nx); t = nx; };

    if (alg === 'RR' || alg === 'PRR') {
      const queue = [];
      const seen = new Set();
      const admit = (upTo) => P.filter((p) => !seen.has(p) && p.arr <= upTo).sort(order).forEach((p) => { seen.add(p); queue.push(p); });
      admit(t);
      while (left().length) {
        if (!queue.length) { idleTo(); admit(t); continue; }
        let k = 0;
        if (alg === 'PRR') { const best = Math.min(...queue.map((p) => p.pri)); k = queue.findIndex((p) => p.pri === best); }
        const p = queue.splice(k, 1)[0];
        const run = Math.min(q, p.rem);
        push(p.id, t, t + run);
        t += run; p.rem -= run;
        admit(t);
        if (p.rem > 0) queue.push(p); else p.done = t;
      }
    } else if (alg === 'SRTF') {
      let cur = null;
      while (left().length) {
        const r = ready();
        if (!r.length) { idleTo(); continue; }
        r.sort((a, b) => a.rem - b.rem || (a === cur ? -1 : b === cur ? 1 : 0) || order(a, b));
        cur = r[0];
        // run until it finishes or the next arrival, whichever comes first
        const nextArr = Math.min(Infinity, ...P.filter((p) => p.arr > t).map((p) => p.arr));
        const run = Math.min(cur.rem, nextArr - t);
        push(cur.id, t, t + run);
        t += run; cur.rem -= run;
        if (!cur.rem) cur.done = t;
      }
    } else {
      const key = alg === 'SJF' ? (p) => p.burst : alg === 'PRI' ? (p) => p.pri : () => 0;
      while (left().length) {
        const r = ready();
        if (!r.length) { idleTo(); continue; }
        r.sort((a, b) => key(a) - key(b) || order(a, b));
        const p = r[0];
        push(p.id, t, t + p.rem);
        t += p.rem; p.rem = 0; p.done = t;
      }
    }
    const done = {}, tat = {}, wait = {};
    for (const p of P) { done[p.id] = p.done; tat[p.id] = p.done - p.arr; wait[p.id] = p.done - p.arr - p.burst; }
    const n = P.length, sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
    return { slices, done, tat, wait, avgWait: sum(wait) / n, avgTat: sum(tat) / n, end: t };
  }

  const fmt = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(2));
  const COLORS = ['c0', 'c2', 'c1', 'c3', 'c4', 'c5'];
  function colorOf(id, ids) { const k = ids.indexOf(id); return k < 0 ? 'mute' : COLORS[k % COLORS.length]; }

  function gantt(slices, opts = {}) {
    const ids = opts.ids || [...new Set(slices.filter((s) => s.id).map((s) => s.id))].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)) || a.localeCompare(b));
    const end = slices.length ? slices[slices.length - 1].e : 0;
    const wrap = document.createElement('div');
    wrap.className = 'gantt';
    const bar = document.createElement('div');
    bar.className = 'gantt-bar';
    const marks = document.createElement('div');
    marks.className = 'gantt-marks';
    const pct = (x) => (100 * x) / (end || 1) + '%';
    const times = new Set([0]);
    for (const s of slices) {
      const b = document.createElement('div');
      b.className = 'gantt-slot' + (s.id ? '' : ' idle');
      b.style.left = pct(s.s);
      b.style.width = pct(s.e - s.s);
      if (s.id) { b.style.background = `var(--f-${colorOf(s.id, ids)})`; b.textContent = s.id; }
      else b.textContent = 'idle';
      b.title = `${s.id || 'idle'}: ${s.s}–${s.e}`;
      bar.append(b);
      times.add(s.e);
    }
    const sorted = [...times].sort((a, b) => a - b);
    sorted.forEach((x, k) => {
      const m = document.createElement('span');
      m.textContent = x;
      m.style.left = pct(x);
      // on crowded charts drop the labels that would sit on top of a neighbour
      if (k > 0 && k < sorted.length - 1 && (x - sorted[k - 1]) / (end || 1) < 0.035) m.className = 'tight';
      marks.append(m);
    });
    wrap.append(bar, marks);
    return wrap;
  }

  /* shared look for the lab and the drill */
  const css = `.gantt{margin:14px 0 22px;position:relative}
.gantt-bar{position:relative;height:38px;border:1px solid var(--text);background:var(--panel)}
.gantt-slot{position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font:600 .8rem var(--mono);color:var(--panel);border-right:1px solid var(--text);overflow:hidden;white-space:nowrap}
.gantt-slot.idle{background:var(--bg);color:var(--muted);font-weight:400}
.gantt-marks{position:relative;height:18px}
.gantt-marks span{position:absolute;top:2px;transform:translateX(-50%);font:.72rem var(--mono);color:var(--muted)}
.gantt-marks span.tight{visibility:hidden}`;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.append(st);

  window.CPUS = { run, gantt, fmt, NAMES, colorOf };
})();
