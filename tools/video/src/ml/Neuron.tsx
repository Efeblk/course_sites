// COE305 week 6, part 1: the perceptron (multiply, add), the bias unit x0 = 1, transpose and wᵀx = 0.5 with the
// AND weights, why we need the bias (regression line shift, through the origin without it), AND vs OR by the bias alone.
import React from 'react';
import {
  Axes, C, Curve, Dot, Exam, HL, Head, MONO, Mark, MlEpisode, Pulse, SANS, Sfx, Tag, Unit, Wire, ax, lerp, p, pop, tl, win,
} from './kit';
import timeline from '../timelines/ml-neuron.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ scene 1: one unit
const One: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, u = B('unit').start, s = B('sum').start, b = B('bias').start;
  const U: [number, number] = [1060, 560], IN: [string, number, string][] = [['x₁', 560, 'w₁'], ['x₂', 820, 'w₂']];
  return <g>
    <Head f={f} a={h} b={u}>one unit: multiply, then add</Head>
    <Head f={f} a={u} b={b}>a perceptron</Head>
    <Head f={f} a={b}>the bias unit: x₀ = 1</Head>
    {IN.map(([t, y, w], i) => <g key={t}>
      <Wire f={f} a={at('unit', 0.4) + i * 8} x1={460} y1={y} x2={U[0] - 100} y2={U[1] + (y - U[1]) * 0.25} label={w} lt={0.45} ls={36} lc={C.blue} />
      <Unit x={420} y={y} r={56} text={t} c={C.blue} k={pop(f, at('unit', 0.15) + i * 6, 12)} />
      <Pulse f={f} s={at('sum', 0.1) + i * 6} d={24} x1={460} y1={y} x2={U[0] - 100} y2={U[1]} text={`${w}${t}`} r={22} c={C.blue} />
    </g>)}
    <Wire f={f} a={at('bias', 0.35)} x1={460} y1={300} x2={U[0] - 90} y2={U[1] - 50} label="w₀" lt={0.45} ls={36} lc={C.amber} c={C.amber} />
    <Unit x={420} y={300} r={56} text="1" c={C.amber} k={pop(f, at('bias', 0.15), 12)} />
    <g opacity={p(f, at('bias', 0.15), at('bias', 0.25))}><text x={420} y={220} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.amber}>x₀</text></g>
    <Pulse f={f} s={at('bias', 0.55)} d={24} x1={460} y1={300} x2={U[0] - 90} y2={U[1] - 50} text="w₀" r={22} c={C.amber} />
    <Wire f={f} a={at('sum', 0.45)} x1={U[0] + 110} y1={U[1]} x2={1500} y2={U[1]} c={C.ink} sw={7} />
    <g opacity={p(f, at('sum', 0.55), at('sum', 0.6))}><path d={`M1480,${U[1] - 20} L1508,${U[1]} L1480,${U[1] + 20}`} fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" /></g>
    <Unit x={U[0]} y={U[1]} r={110} text="Σ" c={C.ink} fill="#2f2c27" fg={HL} s={96} k={pop(f, h + 8, 16)} glow={win(f, at('sum', 0.35), at('sum', 0.75)) + win(f, at('bias', 0.65), at('bias', 0.9))} />
    <g opacity={p(f, at('sum', 0.55), at('sum', 0.65))}><text x={1560} y={U[1] + 14} fontFamily={MONO} fontWeight={800} fontSize={48} fill={C.ink}>y</text></g>
    <g opacity={p(f, at('sum', 0.6), at('sum', 0.7))}>
      <text x={960} y={960} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={48} fill={C.ink}>
        {`y = w₁x₁ + w₂x₂${f > at('bias', 0.7) ? ' + w₀' : ''}`}
      </text>
    </g>
    <g opacity={p(f, at('bias', 0.75), at('bias', 0.85))}><Tag x={1560} y={300} text="w₀ = the bias" bg={HL} s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 2: transpose and wᵀx
const W = ['−1.5', '+1', '+1'], WN = ['w₀', 'w₁', 'w₂'], XN = ['x₀', 'x₁', 'x₂'];
const Trans: React.FC<{ f: number }> = ({ f }) => {
  const q = B('tq').start, t1 = B('t1').start, t2 = B('t2').start, t3 = B('t3').start;
  const rot = p(f, at('t1', 0.45), at('t1', 0.75));
  const box = (x: number, y: number, v: string, sub: string, c: string, o = 1) => <g transform={`translate(${x},${y})`} opacity={o}>
    <rect x={-80} y={-44} width={160} height={88} rx={14} fill="#fbf9f4" stroke={c} strokeWidth={5} />
    <text y={16} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={44} fill={C.ink}>{v}</text>
    <text x={-96} y={12} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={30} fill={c}>{sub}</text>
  </g>;
  return <g>
    <Head f={f} a={q} b={t3}>wᵀx: what does transpose mean?</Head>
    <Head f={f} a={t3}>a row times a column = one number</Head>
    <g opacity={p(f, q + 6, q + 16)}>
      <text x={lerp(380, 960, rot)} y={lerp(300, 260, rot)} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.blue}>{rot > 0.5 ? 'wᵀ (a row)' : 'w (a column)'}</text>
      <text x={1580} y={300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.teal}>x (a column)</text>
    </g>
    {W.map((v, i) => box(lerp(380, 720 + i * 240, rot), lerp(380 + i * 120, 350, rot), v, rot > 0.5 ? '' : WN[i], C.blue, pop(f, q + 8 + i * 4, 12)))}
    {['1', '1', '1'].map((v, i) => box(1580, 380 + i * 120, v, XN[i], C.teal, pop(f, q + 14 + i * 4, 12)))}
    <g opacity={win(f, at('t1', 0.1), t2)}><Tag x={960} y={900} text="transpose: column → row" bg={HL} s={36} /></g>
    {/* pair, multiply */}
    {W.map((v, i) => {
      const a = at('t2', 0.3) + i * 12, x = 720 + i * 240;
      return <g key={i} opacity={p(f, a, a + 10)}>
        <line x1={x} y1={396} x2={x} y2={600} stroke={C.blue} strokeWidth={4} opacity={0.5} />
        <path d={`M1500,${380 + i * 120} Q${(1500 + x) / 2},${420 + i * 60} ${x + 40},${600}`} stroke={C.teal} strokeWidth={4} fill="none" opacity={0.5} />
        <g transform={`translate(${x},${650}) scale(${pop(f, a + 4, 12)})`}>
          <rect x={-100} y={-40} width={200} height={80} rx={14} fill={HL} />
          <text y={14} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.ink}>{`${v} × 1`}</text>
        </g>
      </g>;
    })}
    <g transform={`translate(960,820) scale(${pop(f, at('t3', 0.15), 14)})`}>
      <rect x={-400} y={-50} width={800} height={100} rx={18} fill={C.ink} />
      <text y={16} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={44} fill="#fff">wᵀx = −1.5 + 1 + 1 = 0.5</text>
    </g>
    <g opacity={p(f, at('t3', 0.65), at('t3', 0.75))}><Tag x={960} y={960} text="one number: the weighted sum" bg={HL} s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 3: why the bias: the regression line
const PTS: [number, number][] = [[0.4, 2.3], [0.9, 2.4], [1.4, 2.9], [1.9, 3.0], [2.4, 3.4], [2.9, 3.5], [3.3, 3.9]];
const Shift: React.FC<{ f: number }> = ({ f }) => {
  const q = B('whyb').start, r = B('reg').start, n = B('nob').start;
  const A = ax(360, 220, 760, 720, [-0.6, 4], [-0.6, 4.5]);
  const k1 = p(f, at('reg', 0.45), at('reg', 0.58)), k2 = p(f, at('reg', 0.58), at('reg', 0.72)), k3 = p(f, at('reg', 0.72), at('reg', 0.88));
  const w0 = 2.1 - 1.5 * k1 + 2.6 * k2 - 1.1 * k3;
  const swing = p(f, at('nob', 0.1), at('nob', 0.9));
  const wNo = 1.9 - 1.6 * Math.sin(swing * Math.PI) ** 2;
  const noB = p(f, n, n + 10);
  return <g>
    <Head f={f} a={q} b={n}>why do we need the bias?</Head>
    <Head f={f} a={n}>without w₀, every line passes through (0, 0)</Head>
    <Axes f={f} a={q + 2} A={A} xl="x" yl="y" origin={[0, 0]} />
    {PTS.map(([x, y], i) => <Dot key={i} f={f} a={r + 4 + i * 3} x={A.X(x)} y={A.Y(y)} c={C.amber} r={14} />)}
    <g opacity={1 - noB}><Curve f={f} a={at('reg', 0.1)} b={at('reg', 0.3)} A={A} fn={(x) => 0.45 * x + w0} x0={-0.5} x1={3.9} c={C.blue} /></g>
    <g opacity={p(f, at('reg', 0.3), at('reg', 0.4)) * (1 - noB)}>
      <Tag x={1480} y={420} text={`y = 0.45 x + ${w0.toFixed(2)}`} bg="#fff" s={34} mono />
      <Tag x={1480} y={520} text="w: the slope" bg={C.blue} fg="#fff" s={32} />
      <g opacity={p(f, at('reg', 0.45), at('reg', 0.55))}><Tag x={1480} y={610} text="w₀: moves the line up or down" bg={HL} s={32} /></g>
    </g>
    <g opacity={noB}>
      <Curve f={f} a={n} b={n + 1} A={A} fn={(x) => wNo * x} x0={-0.3} x1={Math.min(3.9, 4.4 / wNo)} c={C.red} />
      <circle cx={A.X(0)} cy={A.Y(0)} r={14} fill={C.red} />
      <Tag x={1480} y={420} text="y = w x (no w₀)" bg="#fff" s={34} mono />
      <Tag x={1480} y={520} text="pinned at the origin" bg={C.red} fg="#fff" s={32} />
    </g>
    <Mark f={f} a={at('nob', 0.8)} x={1480} y={660} ok={false} />
  </g>;
};

// ------------------------------------------------ scene 4: AND and OR differ only in the bias
type P2 = [number, number];
const clipAbove = (c: number, lo: number, hi: number): P2[] => { // polygon of {x1 + x2 > c} inside the square [lo, hi]²
  const sq: P2[] = [[lo, lo], [hi, lo], [hi, hi], [lo, hi]];
  const out: P2[] = [];
  for (let i = 0; i < 4; i++) {
    const a = sq[i], b = sq[(i + 1) % 4], ia = a[0] + a[1] > c, ib = b[0] + b[1] > c;
    if (ia) out.push(a);
    if (ia !== ib) { const t = (c - a[0] - a[1]) / (b[0] + b[1] - a[0] - a[1]); out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]); }
  }
  return out;
};
const Gate: React.FC<{ f: number }> = ({ f }) => {
  const a = B('and').start, a2 = B('and2').start, o = B('or').start, s = B('shift').start;
  const A = ax(300, 220, 720, 720, [-0.5, 1.7], [-0.5, 1.7]);
  const w0 = lerp(-1.5, -0.5, p(f, at('or', 0.3), at('or', 0.55)));
  const c = -w0, lo = -0.5, hi = 1.7;
  const lineO = p(f, a2, a2 + 14);
  const poly = clipAbove(c, lo, hi).map(([x, y]) => `${A.X(x)},${A.Y(y)}`).join(' ');
  const corners: P2[] = [[0, 0], [1, 0], [0, 1], [1, 1]];
  const gate = w0 < -1 ? 'AND' : 'OR';
  return <g>
    <Head f={f} a={a} b={s}>{f < o ? 'w₀ = −1.5: the AND unit' : 'w₀ = −0.5: the OR unit'}</Head>
    <Head f={f} a={s}>weights: direction · bias: position</Head>
    <Axes f={f} a={a + 2} A={A} xl="x₁" yl="x₂" origin={[0, 0]} />
    <polygon points={poly} fill={C.green} opacity={0.12 * lineO} />
    <g opacity={lineO}>
      <line x1={A.X(Math.max(lo, c - hi))} y1={A.Y(c - Math.max(lo, c - hi))} x2={A.X(Math.min(hi, c - lo))} y2={A.Y(c - Math.min(hi, c - lo))} stroke={C.ink} strokeWidth={6} />
    </g>
    {corners.map(([x, y], i) => {
      const on = x + y + w0 > 0 && lineO > 0.5;
      return <Dot key={i} f={f} a={a + 8 + i * 4} x={A.X(x)} y={A.Y(y)} c={on ? C.green : C.red} r={26} ring={!on} label={on ? '1' : '0'} />;
    })}
    {/* the unit's weights and the truth table */}
    <g transform="translate(1180,260)" opacity={p(f, at('and', 0.2), at('and', 0.3))}>
      <rect width={560} height={220} rx={18} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
      <text x={30} y={62} fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.blue}>w₁ = 1   w₂ = 1</text>
      <rect x={20} y={84} width={330} height={52} rx={10} fill={f > at('or', 0.3) ? HL : 'none'} opacity={win(f, at('or', 0.3), 1e9)} />
      <text x={30} y={124} fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.amber}>{`w₀ = ${w0.toFixed(1).replace('-', '−')}`}</text>
      <text x={30} y={196} fontFamily={MONO} fontWeight={800} fontSize={32} fill={C.ink} opacity={lineO}>{`line: x₁ + x₂ = ${c.toFixed(1)}`}</text>
    </g>
    <g transform="translate(1180,510)" opacity={lineO}>
      {[['x₁', 'x₂', gate], ...corners.map(([x, y]) => [String(x), String(y), x + y + w0 > 0 ? '1' : '0'])].map((row, r) => <g key={r}>
        {row.map((v, k) => <text key={k} x={60 + k * 180} y={50 + r * 64} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36}
          fill={r === 0 ? C.muted : k === 2 ? (v === '1' ? C.green : C.red) : C.ink}>{v}</text>)}
        {r === 0 && <line x1={0} x2={500} y1={70} y2={70} stroke="#d9d1c1" strokeWidth={3} />}
      </g>)}
    </g>
    <g opacity={p(f, at('and2', 0.7), at('and2', 0.8)) * (1 - p(f, o, o + 10))}><Tag x={1450} y={880} text="only (1, 1) is above: AND" bg={C.green} fg="#fff" s={32} /></g>
    <g opacity={p(f, at('or', 0.6), at('or', 0.7))}><Tag x={1450} y={880} text="three corners above: OR" bg={C.green} fg="#fff" s={32} /></g>
    <g opacity={p(f, at('shift', 0.6), at('shift', 0.7))}><Tag x={1450} y={970} text="bias shifting" bg={HL} s={34} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['perceptron', 'outputs the weighted sum'],
  ['transpose', 'turns a column into a row'],
  ['wᵀx', 'one number'],
  ['no bias', 'the line must pass through (0, 0)'],
  ['AND vs OR', 'same weights, only the bias differs'],
]} />;

export const MlNeuron: React.FC = () =>
  <MlEpisode t={timeline} ch="Week 6" title="One neuron: wᵀx and the bias" scenes={[
    [One, 0], [Trans, B('tq').start], [Shift, B('whyb').start], [Gate, B('and').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('sum', 0.4)} name="ping" volume={0.18} />
    <Sfx at={at('bias', 0.15)} name="pop" volume={0.2} />
    <Sfx at={at('t1', 0.45)} name="whoosh" volume={0.2} />
    <Sfx at={at('t3', 0.15)} name="ping" volume={0.22} />
    <Sfx at={at('nob', 0.8)} name="beep" volume={0.2} />
    <Sfx at={at('or', 0.3)} name="whoosh" volume={0.2} />
  </MlEpisode>;
