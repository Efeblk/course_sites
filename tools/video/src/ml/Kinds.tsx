// COE305 weeks 1 and 4: why learn from examples, supervised (classification, regression), unsupervised (clusters),
// reinforcement (policy from delayed reward), association (7/10), parametric vs nonparametric.
import React from 'react';
import { AudioLines, Monitor, Mouse, ShoppingBasket, Trophy } from 'lucide-react';
import {
  Axes, C, Code, PURPLE, Curve, Dot, Exam, HL, Head, MONO, Mark, MlEpisode, Proc, SANS, Sfx, Tag, ax, gauss, lerp, p, pop, rnd, tl, track, win,
} from './kit';
import timeline from '../timelines/ml-kinds.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ scene 1: rules you can write vs rules nobody can explain
const Hook: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, h2 = B('hook2').start, l = B('learn').start, m = B('model').start;
  const out = p(f, l - 6, l + 14);
  const learner = track(f, [{ at: 0, x: 960, y: 1300 }, { at: l + 6, x: 960, y: 760, d: 22, h: 60 }]);
  return <g>
    <Head f={f} a={h} b={l}>rules you can write, rules nobody can explain</Head>
    <Head f={f} a={l}>learn the rules from examples</Head>
    <g opacity={1 - out}>
      <Code x={190} y={300} w={640} s={34} title="payroll" lines={['pay = hours × rate']} typed={[p(f, h + 10, h + 40)]} />
      <Mark f={f} a={at('hook', 0.7)} x={510} y={560} ok />
      <g opacity={p(f, h2, h2 + 12)}>
        <rect x={1090} y={300} width={640} height={190} rx={18} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
        <text x={1116} y={344} fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.muted}>speech</text>
        <path d={Array.from({ length: 120 }, (_, i) => `${i ? 'L' : 'M'}${1130 + i * 4.8},${420 + Math.sin(i * 0.7 + f / 6) * 38 * Math.sin(i / 120 * Math.PI) * (0.5 + rnd(i) * 0.6)}`).join(' ')} stroke={C.blue} strokeWidth={4} fill="none" />
        <Tag x={1410} y={560} text="rules = ?" bg={HL} s={32} mono />
      </g>
      <Mark f={f} a={at('hook2', 0.75)} x={1410} y={660} ok={false} />
    </g>
    {/* examples fly into a learner */}
    <g opacity={out}>
      {Array.from({ length: 8 }, (_, i) => {
        const s = at('learn', 0.15) + i * 9, t = p(f, s, s + 26);
        const x0 = i % 2 ? 1700 : 220, y0 = 260 + (i >> 1) * 120;
        if (t >= 1) return null;
        return <g key={i} transform={`translate(${lerp(x0, 960, t)},${lerp(y0, 640, t)}) scale(${1 - t * 0.6})`} opacity={p(f, s - 6, s)}>
          <rect x={-70} y={-34} width={140} height={68} rx={12} fill="#fbf9f4" stroke={i % 3 ? C.blue : C.amber} strokeWidth={4} />
          <text y={11} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.ink}>{`x${i + 1} → r`}</text>
        </g>;
      })}
      <Proc f={f} x={learner.x} y={learner.y} sq={learner.sq} c={C.blue} label="model" seed={0} w={150} mood={f > at('learn', 0.8) ? 'happy' : 'focus'} look={[0, -0.6]} />
      <g opacity={win(f, at('learn', 0.55), 1e9)}><Tag x={960} y={870} text="optimise a performance criterion" bg={C.ink} fg="#fff" s={30} /></g>
      <g opacity={p(f, m + 4, m + 16)}><Tag x={960} y={950} text="a useful approximation, not the truth" bg={HL} s={32} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: supervised: classification and regression
const CLS = Array.from({ length: 26 }, (_, i) => {
  const x = 0.06 + rnd(i * 3 + 1) * 0.9, y = 0.06 + rnd(i * 3 + 2) * 0.9;
  return { x, y, low: x > 0.45 && y > 0.4 };
});
const CARS = Array.from({ length: 12 }, (_, i) => { const x = 0.08 + i * 0.077; return { x, y: 0.88 - 0.7 * x + gauss(i + 40) * 0.05 }; });
const Sup: React.FC<{ f: number }> = ({ f }) => {
  const s = B('sup').start, c = B('cls').start, r = B('reg').start;
  const A = ax(220, 260, 620, 560, [0, 1], [0, 1]), R = ax(1110, 260, 620, 560, [0, 1], [0, 1]);
  const th = p(f, at('cls', 0.35), at('cls', 0.55)), shade = p(f, at('cls', 0.55), at('cls', 0.65));
  return <g>
    <Head f={f} a={s}>supervised: every example has its answer</Head>
    <Axes f={f} a={s + 4} A={A} xl="income" yl="savings" />
    {shade > 0 && <rect x={A.X(0.45)} y={A.Y(1)} width={A.X(1) - A.X(0.45)} height={A.Y(0.4) - A.Y(1)} fill={C.green} opacity={0.12 * shade} />}
    {CLS.map((d, i) => <Dot key={i} f={f} a={s + 10 + i * 2} x={A.X(d.x)} y={A.Y(d.y)} c={d.low ? C.green : C.red} r={15} />)}
    <g opacity={th}>
      <line x1={A.X(0.45)} y1={A.Y(0)} x2={A.X(0.45)} y2={A.Y(0) - (A.Y(0) - A.Y(1)) * th} stroke={C.ink} strokeWidth={5} strokeDasharray="14 10" />
      <line x1={A.X(1)} y1={A.Y(0.4)} x2={A.X(1) - (A.X(1) - A.X(0.45)) * th} y2={A.Y(0.4)} stroke={C.ink} strokeWidth={5} strokeDasharray="14 10" />
      <text x={A.X(0.45)} y={A.Y(0) + 44} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>θ₁</text>
      <text x={A.X(1) + 30} y={A.Y(0.4) + 10} fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>θ₂</text>
    </g>
    <g opacity={p(f, at('cls', 0.2), at('cls', 0.3))}>
      <circle cx={260} cy={905} r={13} fill={C.green} /><text x={284} y={915} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>low risk</text>
      <circle cx={470} cy={905} r={13} fill={C.red} /><text x={494} y={915} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>high risk</text>
    </g>
    <g opacity={p(f, at('cls', 0.8), at('cls', 0.9))}><Tag x={530} y={985} text="answer = a class: classification" bg={C.blue} fg="#fff" s={30} /></g>
    {/* regression */}
    <g opacity={p(f, r, r + 10)}>
      <Axes f={f} a={r + 2} A={R} xl="mileage" yl="price" />
      {CARS.map((d, i) => <Dot key={i} f={f} a={r + 8 + i * 3} x={R.X(d.x)} y={R.Y(d.y)} c={C.amber} r={15} />)}
      <Curve f={f} a={at('reg', 0.55)} b={at('reg', 0.75)} A={R} fn={(x) => 0.88 - 0.7 * x} x0={0.02} x1={0.98} c={C.blue} />
      <g opacity={p(f, at('reg', 0.6), at('reg', 0.7))}><Tag x={R.X(0.62)} y={R.Y(0.82)} text="y = w x + w₀" bg="#fff" s={30} mono /></g>
      <g opacity={p(f, at('reg', 0.4), at('reg', 0.5))}><Tag x={1420} y={985} text="answer = a number: regression" bg={C.amber} s={30} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: unsupervised: clusters
const BLOBS: [number, number, string][] = [[560, 470, C.blue], [1000, 740, C.teal], [1380, 440, PURPLE]];
const PTS = Array.from({ length: 36 }, (_, i) => { const b = BLOBS[i % 3]; return { x: b[0] + gauss(i + 7) * 70, y: b[1] + gauss(i + 77) * 55, g: i % 3 }; });
const Unsup: React.FC<{ f: number }> = ({ f }) => {
  const u = B('unsup').start, c = B('clus').start;
  const grey = p(f, at('unsup', 0.3), at('unsup', 0.55));
  return <g>
    <Head f={f} a={u} b={c}>unsupervised: inputs only</Head>
    <Head f={f} a={c}>it still finds groups: clusters</Head>
    {PTS.map((d, i) => <Dot key={i} f={f} a={u + 2 + i} x={d.x} y={d.y} r={15} c={grey > 0.5 ? '#9c9483' : [C.green, C.red, C.amber][i % 3]} />)}
    <g opacity={win(f, at('unsup', 0.3), c)}><Tag x={960} y={960} text="no answers: X = { xᵗ }" bg="#fff" s={32} mono /></g>
    {BLOBS.map(([x, y, col], i) => {
      const a = at('clus', 0.15) + i * 14;
      return <g key={i} opacity={p(f, a, a + 10)}>
        <ellipse cx={x} cy={y} rx={200 * pop(f, a, 14)} ry={160 * pop(f, a, 14)} fill={col} fillOpacity={0.1} stroke={col} strokeWidth={5} strokeDasharray="16 10" />
        <text x={x} y={y - 180} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={col}>{`cluster ${i + 1}`}</text>
      </g>;
    })}
    <g opacity={p(f, at('clus', 0.6), at('clus', 0.7))}><Tag x={960} y={980} text="clusters, not classes: nobody named them" bg={HL} s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 4: reinforcement: a maze, a delayed reward, a policy
const G = { x: 600, y: 230, s: 140, cols: 5, rows: 5 };
const WALL = new Set(['1,1', '1,2', '3,0', '3,1', '3,3', '1,4']);
const PATH_OK: [number, number][] = [[0, 4], [0, 3], [0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [4, 2], [4, 1], [4, 0]];
const RL_T0 = at('rl', 0.12), RL_DT = (B('rl').dur * 0.66) / PATH_OK.length, RL_GOAL = RL_T0 + PATH_OK.length * RL_DT;
const cx = (c: number) => G.x + c * G.s + G.s / 2, cy = (r: number) => G.y + r * G.s + G.s / 2;
const Rl: React.FC<{ f: number }> = ({ f }) => {
  const a = B('rl').start, b = B('rl2').start;
  const t0 = RL_T0, dt = RL_DT;
  const keys = [{ at: 0, x: cx(0), y: cy(4) + 50 }, ...PATH_OK.slice(1).map(([c, r], i) => ({ at: t0 + (i + 1) * dt, x: cx(c), y: cy(r) + 50, d: Math.min(12, dt - 1), h: 30 }))];
  const k = track(f, keys);
  const goal = RL_GOAL;
  // policy arrows along every free cell: point towards the next cell on a shortest route
  const next: Record<string, [number, number]> = {};
  PATH_OK.forEach(([c, r], i) => { if (i + 1 < PATH_OK.length) next[`${c},${r}`] = [PATH_OK[i + 1][0] - c, PATH_OK[i + 1][1] - r]; });
  Object.assign(next, { '1,3': [-1, 0], '2,4': [0, -1], '3,4': [1, 0], '4,4': [0, -1], '4,3': [0, -1], '2,3': [0, -1] });
  return <g>
    <Head f={f} a={a} b={b}>reinforcement: a reward only at the end</Head>
    <Head f={f} a={b}>it learns a policy: a move for every place</Head>
    {Array.from({ length: G.cols * G.rows }, (_, i) => {
      const c = i % G.cols, r = Math.floor(i / G.cols), w = WALL.has(`${c},${r}`);
      return <rect key={i} x={G.x + c * G.s + 4} y={G.y + r * G.s + 4} width={G.s - 8} height={G.s - 8} rx={14} fill={w ? '#4a463e' : '#fbf9f4'} stroke="#d9d1c1" strokeWidth={3} opacity={pop(f, a + 2 + i, 10)} />;
    })}
    <g opacity={p(f, a + 20, a + 30)}>
      <Trophy x={cx(4) - 40} y={cy(0) - 40} size={80} color={C.amber} strokeWidth={2} />
    </g>
    {Object.entries(next).map(([key, [dx, dy]], i) => {
      const [c, r] = key.split(',').map(Number), s = at('rl2', 0.15) + i * 3;
      const o = p(f, s, s + 8);
      if (o <= 0) return null;
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      return <g key={key} opacity={o} transform={`translate(${cx(c)},${cy(r)}) rotate(${ang})`}>
        <path d="M-34,0 L26,0 M8,-18 L28,0 L8,18" stroke={C.blue} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>;
    })}
    <Proc f={f} x={k.x} y={k.y} sq={k.sq} c={C.teal} label="bot" seed={2} s={0.5} mood={f > goal ? 'happy' : 'focus'} o={1 - p(f, b, b + 10)} />
    <g opacity={win(f, at('rl', 0.2), goal)}><Tag x={1540} y={420} text="step: no answer" bg="#fff" s={30} /></g>
    <g transform={`translate(${cx(4)},${cy(0) - 70}) scale(${pop(f, goal, 14)})`} opacity={p(f, goal, goal + 4)}><Tag x={0} y={0} text="+ reward" bg={C.green} fg="#fff" s={32} /></g>
    <g opacity={p(f, goal + 10, goal + 20)}><Tag x={1540} y={520} text="delayed reward" bg={HL} s={30} /></g>
    <g opacity={p(f, at('rl2', 0.6), at('rl2', 0.7))}><Tag x={1540} y={620} text="policy" bg={C.blue} fg="#fff" s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: association
const Assoc: React.FC<{ f: number }> = ({ f }) => {
  const a = B('assoc').start;
  const mouseAt = (i: number) => at('assoc', 0.25) + i * 7;
  return <g>
    <Head f={f} a={a}>association: P(mouse | computer)</Head>
    {Array.from({ length: 10 }, (_, i) => {
      const x = 330 + (i % 5) * 315, y = 330 + Math.floor(i / 5) * 290, has = i !== 2 && i !== 6 && i !== 9;
      const mi = [0, 1, 3, 4, 5, 7, 8].indexOf(i);
      return <g key={i} transform={`translate(${x},${y}) scale(${pop(f, a + 4 + i * 3, 12)})`}>
        <rect x={-120} y={-100} width={240} height={200} rx={22} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
        <ShoppingBasket x={-104} y={-90} size={44} color={C.muted} strokeWidth={2} />
        <Monitor x={-60} y={-40} size={80} color={C.blue} strokeWidth={1.8} />
        {has && <g opacity={p(f, mouseAt(mi), mouseAt(mi) + 6)} transform={`translate(66,40) scale(${pop(f, mouseAt(mi), 12)})`}>
          <circle r={34} fill={C.amber} /><Mouse x={-20} y={-20} size={40} color="#fff" strokeWidth={2.2} />
        </g>}
      </g>;
    })}
    <g opacity={p(f, at('assoc', 0.62), at('assoc', 0.7))}>
      <text x={960} y={870} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={48} fill={C.ink}>P(mouse | computer) = 7 / 10 = 0.7</text>
    </g>
    <g opacity={p(f, at('assoc', 0.8), at('assoc', 0.88))}><Tag x={960} y={960} text="out of the baskets with a computer" bg={HL} s={30} /></g>
  </g>;
};

// ------------------------------------------------ scene 6: parametric vs nonparametric
const LINE_PTS = Array.from({ length: 14 }, (_, i) => { const x = 0.06 + rnd(i + 300) * 0.88; return { x, y: 0.15 + 0.6 * x + gauss(i + 310) * 0.06 }; });
const Param: React.FC<{ f: number }> = ({ f }) => {
  const a = B('par').start, b = B('par2').start, n = B('npar').start;
  const A = ax(200, 300, 620, 500, [0, 1], [0, 1]);
  const more = p(f, at('par2', 0.55), at('par2', 0.75));
  const w = lerp(0.9, 0.6, p(f, at('par2', 0.6), at('par2', 0.85))), w0 = lerp(0.02, 0.15, p(f, at('par2', 0.6), at('par2', 0.85)));
  const nodes: [number, number, number, string][] = [ // x, y, appear frac, text
    [1400, 330, 0.12, 'x₁ > a ?'], [1220, 520, 0.28, 'x₂ > b ?'], [1580, 520, 0.36, 'yes'], [1100, 710, 0.48, 'no'], [1340, 710, 0.56, 'x₁ > c ?'],
    [1250, 880, 0.66, 'yes'], [1440, 880, 0.72, 'no'],
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [4, 5], [4, 6]];
  return <g>
    <Head f={f} a={a}>parametric or not?</Head>
    <text x={510} y={235} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.blue} opacity={p(f, a + 6, a + 16)}>parametric</text>
    <Axes f={f} a={a + 8} A={A} xl="x" yl="y" />
    {LINE_PTS.map((d, i) => <Dot key={i} f={f} a={i < 6 ? a + 14 + i * 3 : at('par2', 0.55) + (i - 6) * 3} x={A.X(d.x)} y={A.Y(d.y)} c={C.amber} r={13} />)}
    <Curve f={f} a={at('par2', 0.05)} b={at('par2', 0.25)} A={A} fn={(x) => w0 + w * x} x0={0} x1={1} c={C.blue} />
    <g opacity={p(f, at('par', 0.5), at('par', 0.6))}><Tag x={510} y={890} text="form fixed first: y = w x + w₀" bg="#fff" s={30} mono /></g>
    <g opacity={p(f, at('par2', 0.35), at('par2', 0.45))}><Tag x={510} y={960} text={`learning fills in w = ${w.toFixed(2)}, w₀ = ${w0.toFixed(2)}`} bg={HL} s={28} mono /></g>
    <g opacity={more * (1 - p(f, n, n + 10))}><Tag x={510} y={1030} text="more data: still a line" bg={C.blue} fg="#fff" s={28} /></g>
    {/* nonparametric */}
    <g opacity={p(f, n, n + 10)}>
      <line x1={960} y1={210} x2={960} y2={1000} stroke="#d9d1c1" strokeWidth={3} />
      <text x={1400} y={235} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.teal}>nonparametric</text>
      {edges.map(([i, j]) => {
        const s = at('npar', nodes[j][2]) - 4;
        return <line key={j} x1={nodes[i][0]} y1={nodes[i][1] + 34} x2={lerp(nodes[i][0], nodes[j][0], p(f, s, s + 8))} y2={lerp(nodes[i][1] + 34, nodes[j][1] - 30, p(f, s, s + 8))} stroke={C.ink} strokeWidth={4} />;
      })}
      {nodes.map(([x, y, fr, t], i) => {
        const leaf = t === 'yes' || t === 'no';
        const w2 = leaf ? 110 : 190;
        return <g key={i} transform={`translate(${x},${y}) scale(${pop(f, at('npar', fr), 12)})`}>
          <rect x={-w2 / 2} y={-34} width={w2} height={68} rx={leaf ? 34 : 12} fill={leaf ? (t === 'yes' ? C.green : C.red) : '#fbf9f4'} stroke={leaf ? 'none' : C.teal} strokeWidth={4} />
          <text y={11} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={28} fill={leaf ? '#fff' : C.ink}>{t}</text>
        </g>;
      })}
      <g opacity={p(f, at('npar', 0.8), at('npar', 0.9))}><Tag x={1400} y={1000} text="its shape comes from the data" bg={HL} s={30} /></g>
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['supervised', 'every example has its answer'],
  ['output', 'class: classification; number: regression'],
  ['unsupervised', 'clusters, no labels'],
  ['reinforcement', 'policy from a delayed reward'],
  ['parametric', 'form fixed in advance'],
]} />;

export const MlKinds: React.FC = () =>
  <MlEpisode t={timeline} ch="Weeks 1 and 4" title="Three ways to learn" scenes={[
    [Hook, 0], [Sup, B('sup').start], [Unsup, B('unsup').start], [Rl, B('rl').start], [Assoc, B('assoc').start], [Param, B('par').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('hook', 0.7)} name="ping" volume={0.2} />
    <Sfx at={at('hook2', 0.75)} name="beep" volume={0.2} />
    <Sfx at={at('cls', 0.35)} name="whoosh" volume={0.18} />
    <Sfx at={at('reg', 0.55)} name="whoosh" volume={0.18} />
    {[0, 1, 2].map(i => <Sfx key={i} at={at('clus', 0.15) + i * 14} name="pop" volume={0.18} />)}
    <Sfx at={RL_GOAL} name="ping" volume={0.25} />
    <Sfx at={at('assoc', 0.62)} name="ping" volume={0.2} />
  </MlEpisode>;
