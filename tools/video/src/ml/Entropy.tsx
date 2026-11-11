// COE305 week 5: Play Tennis (9 yes, 5 no), entropy (pure 0, 50/50 = 1 bit, the worst), 0.940 at the root,
// splitting on Outlook (0.971, 0, 0.971 -> 0.694, gain about 0.246), the other attributes (0.788, 0.892, 0.911),
// recursion on slide 6's table (Rain / Strong stays mixed), stopping rules and pruning.
import React from 'react';
import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import {
  Axes, C, Curve, Exam, HL, Head, MONO, MlEpisode, SANS, Sfx, Tag, ax, lerp, p, pop, tl, win,
} from './kit';
import timeline from '../timelines/ml-entropy.json';

const { B, at } = tl(timeline);
const H2 = (q: number) => (q <= 0 || q >= 1 ? 0 : -q * Math.log2(q) - (1 - q) * Math.log2(1 - q));
const YES = C.green, NO = C.red;

/** a cluster of yes / no balls centred at (x, y), `cols` per row */
const Balls: React.FC<{ f: number; a: number; x: number; y: number; yes: number; no: number; cols?: number; r?: number; gap?: number }> =
  ({ f, a, x, y, yes, no, cols = 7, r = 22, gap = 56 }) => {
    const n = yes + no, rows = Math.ceil(n / cols), w = Math.min(n, cols);
    return <g>{Array.from({ length: n }, (_, i) => {
      const cx = x + ((i % cols) - (w - 1) / 2) * gap, cy = y + (Math.floor(i / cols) - (rows - 1) / 2) * gap;
      return <circle key={i} cx={cx} cy={cy} r={r * pop(f, a + i * 2, 10)} fill={i < yes ? YES : NO} stroke="#fbf9f4" strokeWidth={3} />;
    })}</g>;
  };

// ------------------------------------------------ scene 1: fourteen days, which question first?
const Days: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, w = B('which').start;
  const qs: [React.FC<any>, string][] = [[Sun, 'outlook'], [Droplets, 'humidity'], [Wind, 'wind'], [Thermometer, 'temperature']];
  return <g>
    <Head f={f} a={h} b={w}>14 days of Play Tennis</Head>
    <Head f={f} a={w}>which question first?</Head>
    <Balls f={f} a={h + 10} x={960} y={400} yes={9} no={5} cols={7} r={38} gap={110} />
    <g opacity={p(f, at('hook', 0.3), at('hook', 0.4))}>
      <circle cx={760} cy={600} r={16} fill={YES} /><text x={786} y={612} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>9 yes</text>
      <circle cx={1040} cy={600} r={16} fill={NO} /><text x={1066} y={612} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>5 no</text>
    </g>
    {qs.map(([I, t], i) => {
      const a = w + 4 + i * 8;
      return <g key={t} transform={`translate(${420 + i * 360},820) scale(${pop(f, a, 12)})`}>
        <rect x={-150} y={-70} width={300} height={140} rx={24} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
        <I x={-128} y={-30} size={60} color={C.blue} strokeWidth={2} />
        <text x={30} y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={t.length > 8 ? 30 : 36} fill={C.ink}>{t}</text>
        <text x={118} y={-30} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={40} fill={C.amber}>?</text>
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ scene 2: entropy of a group
const Ent: React.FC<{ f: number }> = ({ f }) => {
  const id = B('idea').start, pu = B('pure').start, ha = B('half').start, cu = B('curve').start, ro = B('root').start;
  const A = ax(980, 260, 760, 560, [0, 1], [0, 1.1]);
  // the group in the jar and the dot on the curve
  const phase = f < ha ? 0 : f < cu ? 1 : f < ro ? 2 : 3;
  const sweep = p(f, at('curve', 0.3), at('curve', 0.95));
  const dq = phase === 0 ? 1 : phase === 1 ? 0.5 : phase === 2 ? 0.5 - 0.5 * Math.sin(sweep * Math.PI * 2) : 9 / 14;
  const yes = phase === 0 ? 8 : phase === 1 ? 4 : phase === 2 ? Math.round(dq * 8) : 9;
  const no = phase === 0 ? 0 : phase === 1 ? 4 : phase === 2 ? 8 - yes : 5;
  const jarA = phase === 0 ? pu : phase === 1 ? ha : phase === 2 ? cu : ro;
  return <g>
    <Head f={f} a={id}>entropy: how mixed is a group?</Head>
    <g opacity={p(f, id + 6, id + 16)}>
      <rect x={250} y={300} width={500} height={460} rx={40} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
      <rect x={300} y={270} width={400} height={44} rx={14} fill="#d9d1c1" />
    </g>
    {f >= pu && <Balls key={phase} f={f} a={phase === 2 ? -100 : jarA + 4} x={500} y={540} yes={yes} no={no} cols={4} r={34} gap={90} />}
    <g opacity={p(f, pu, pu + 10)}>
      <text x={500} y={850} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={46} fill={C.ink}>{`I = ${H2(dq).toFixed(3)}`}</text>
    </g>
    <Axes f={f} a={id + 10} A={A} xl="share of yes" yl="entropy (bits)" />
    <g opacity={p(f, id + 20, id + 30)}>
      {[0, 0.5].map(v => <text key={v} x={A.X(v)} y={A.Y(0) + 44} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.muted}>{v}</text>)}
      <text x={A.X(0) - 16} y={A.Y(1) + 10} textAnchor="end" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.muted}>1</text>
      <line x1={A.X(0)} x2={A.X(1)} y1={A.Y(1)} y2={A.Y(1)} stroke="#d9d1c1" strokeWidth={3} strokeDasharray="8 8" />
    </g>
    <Curve f={f} a={cu} b={at('curve', 0.6)} A={A} fn={H2} x0={0} x1={1} c={C.blue} n={120} />
    {f >= pu && <circle cx={A.X(dq)} cy={A.Y(H2(dq))} r={18} fill={C.amber} stroke={C.ink} strokeWidth={4} />}
    <g opacity={win(f, at('pure', 0.3), ha)}><Tag x={A.X(0.8)} y={A.Y(0.2)} text="pure: 0" bg={YES} fg="#fff" s={34} /></g>
    <g opacity={win(f, at('half', 0.3), cu)}><Tag x={A.X(0.5)} y={A.Y(0.5)} text="50/50: 1 bit, the worst" bg={NO} fg="#fff" s={34} /></g>
    <g opacity={p(f, at('root', 0.4), at('root', 0.5))}><Tag x={A.X(0.5)} y={A.Y(0.5)} text="9 yes, 5 no: 0.940" bg={HL} s={34} mono /></g>
  </g>;
};

// ------------------------------------------------ scene 3: split on outlook
const KIDS: [string, number, number, string, string][] = [['sunny', 2, 3, '0.971', '5/14'], ['overcast', 4, 0, '0', '4/14'], ['rain', 3, 2, '0.971', '5/14']];
const Split: React.FC<{ f: number }> = ({ f }) => {
  const s = B('split').start, c = B('child').start, w = B('weight').start, g = B('gain').start;
  const RX = 960, RY = 270;
  return <g>
    <Head f={f} a={s}>split on outlook</Head>
    <g transform={`translate(${RX},${RY})`} opacity={p(f, s + 2, s + 12)}>
      <rect x={-260} y={-70} width={520} height={140} rx={20} fill="#fbf9f4" stroke={C.ink} strokeWidth={4} />
      <text x={-230} y={-22} fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>14 days</text>
      <text x={230} y={-22} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.muted}>I = 0.940</text>
    </g>
    <Balls f={f} a={s + 4} x={RX} y={RY + 28} yes={9} no={5} cols={14} r={13} gap={34} />
    {KIDS.map(([t, y, n, e, wt], i) => {
      const x = 400 + i * 560, a = at('split', 0.15 + i * 0.27);
      return <g key={t}>
        <line x1={RX} y1={RY + 70} x2={lerp(RX, x, p(f, a, a + 12))} y2={lerp(RY + 70, 560, p(f, a, a + 12))} stroke={C.ink} strokeWidth={4} />
        <g opacity={p(f, a + 6, a + 16)}>
          <text x={(RX + x) / 2 + (i === 1 ? 18 : i === 0 ? -40 : 40)} y={440} textAnchor={i === 1 ? 'start' : 'middle'} fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.blue}>{t}</text>
          <rect x={x - 200} y={560} width={400} height={170} rx={20} fill="#fbf9f4" stroke={C.ink} strokeWidth={4} />
          <text x={x} y={612} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill={C.ink}>{`${y} yes, ${n} no`}</text>
        </g>
        <Balls f={f} a={a + 8} x={x} y={680} yes={y} no={n} cols={5} r={18} gap={48} />
        <g opacity={p(f, at('child', 0.15 + i * 0.2), at('child', 0.25 + i * 0.2))}>
          <text x={x} y={790} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={e === '0' ? YES : NO}>{`I = ${e}`}</text>
        </g>
        <g opacity={p(f, at('weight', 0.1 + i * 0.18), at('weight', 0.2 + i * 0.18))}>
          <Tag x={x} y={860} text={`× ${wt}`} bg={HL} s={34} mono />
        </g>
      </g>;
    })}
    <g opacity={p(f, at('weight', 0.75), at('weight', 0.85))}>
      <text x={960} y={980} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={46} fill={C.ink}>weighted: I′ = 0.694</text>
    </g>
    <g opacity={win(f, g, 1e9)}>
      <rect x={1440} y={150} width={440} height={140} rx={20} fill={C.ink} />
      <text x={1660} y={205} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill="#fff">0.940 − 0.694</text>
      <text x={1660} y={262} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36} fill={HL} opacity={p(f, at('gain', 0.5), at('gain', 0.6))}>gain ≈ 0.246</text>
    </g>
  </g>;
};

// ------------------------------------------------ scene 4: every attribute, compared
const ATT: [string, number][] = [['outlook', 0.694], ['humidity', 0.788], ['wind', 0.892], ['temperature', 0.911]];
const Others: React.FC<{ f: number }> = ({ f }) => {
  const a = B('others').start;
  const A = ax(380, 240, 1160, 640, [0, 4], [0, 1]);
  const win1 = p(f, at('others', 0.72), at('others', 0.8));
  return <g>
    <Head f={f} a={a}>entropy left after each split</Head>
    <g opacity={p(f, a + 4, a + 14)}>
      <line x1={A.X(0) - 20} x2={A.X(4) + 20} y1={A.Y(0)} y2={A.Y(0)} stroke={C.ink} strokeWidth={4} />
      <line x1={A.X(0) - 20} x2={A.X(4) + 20} y1={A.Y(0.94)} y2={A.Y(0.94)} stroke={C.muted} strokeWidth={3} strokeDasharray="12 10" />
      <text x={A.X(4) + 30} y={A.Y(0.94) + 10} fontFamily={MONO} fontWeight={800} fontSize={28} fill={C.muted}>0.940</text>
    </g>
    {ATT.map(([t, v], i) => {
      const s = i === 0 ? a + 10 : at('others', 0.1 + (i - 1) * 0.18), hgt = (A.Y(0) - A.Y(v)) * p(f, s, s + 14);
      const best = i === 0 && win1 > 0;
      const x = A.X(i + 0.5);
      return <g key={t}>
        <rect x={x - 100} y={A.Y(0) - hgt} width={200} height={hgt} rx={10} fill={best ? C.green : i === 0 ? C.blue : '#b4ad9f'} />
        <g opacity={p(f, s + 8, s + 16)}>
          <text x={x} y={A.Y(v) + 52} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36} fill="#fff">{v.toFixed(3)}</text>
          <text x={x} y={A.Y(0) + 48} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.ink}>{t}</text>
        </g>
      </g>;
    })}
    <g transform={`translate(${A.X(0.5)},${A.Y(0) + 120}) scale(${pop(f, at('others', 0.75), 14)})`}><Tag x={0} y={0} text="least left: outlook is the root" bg={HL} s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: grow the tree, stop, prune
type N = { id: string; x: number; y: number; t: string; leaf?: 'yes' | 'no' | 'mix'; a: number; from?: string; e?: string };
const Tree: React.FC<{ f: number }> = ({ f }) => {
  const r = B('rec').start, st = B('stop').start, pr = B('prune').start;
  const nodes: N[] = [
    { id: 'root', x: 960, y: 250, t: 'outlook', a: r + 2 },
    { id: 'S', x: 460, y: 460, t: 'humidity', a: at('rec', 0.45), from: 'root', e: 'sunny' },
    { id: 'O', x: 960, y: 460, t: 'yes', leaf: 'yes', a: r + 12, from: 'root', e: 'overcast' },
    { id: 'R', x: 1460, y: 460, t: 'wind', a: at('rec', 0.75), from: 'root', e: 'rain' },
    { id: 'SH', x: 300, y: 680, t: '3 no', leaf: 'no', a: at('rec', 0.55), from: 'S', e: 'high' },
    { id: 'SN', x: 620, y: 680, t: '2 yes', leaf: 'yes', a: at('rec', 0.6), from: 'S', e: 'normal' },
    { id: 'RW', x: 1300, y: 680, t: '2 yes', leaf: 'yes', a: at('rec', 0.85), from: 'R', e: 'weak' },
    { id: 'RS', x: 1620, y: 680, t: '1 yes, 2 no', leaf: 'mix', a: at('rec', 0.9), from: 'R', e: 'strong' },
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const cut = p(f, at('prune', 0.3), at('prune', 0.5));
  return <g>
    <Head f={f} a={r} b={st}>repeat inside every mixed branch</Head>
    <Head f={f} a={st} b={pr}>when to stop</Head>
    <Head f={f} a={pr}>pruning: cut back, judge on new data</Head>
    {nodes.filter(n => n.from).map(n => {
      const m = byId[n.from!], t = p(f, n.a - 8, n.a + 4);
      return <g key={n.id} opacity={n.id === 'RW' || n.id === 'RS' ? 1 - 0.7 * cut : 1}>
        <line x1={m.x} y1={m.y + 40} x2={lerp(m.x, n.x, t)} y2={lerp(m.y + 40, n.y - 40, t)} stroke={C.ink} strokeWidth={4} />
        <text x={(m.x + n.x) / 2 + (n.x < m.x ? -30 : n.x > m.x ? 30 : 16)} y={(m.y + n.y) / 2 + 8} textAnchor={n.x < m.x ? 'end' : 'start'} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted} opacity={t}>{n.e}</text>
      </g>;
    })}
    {nodes.map(n => {
      const w = n.leaf ? (n.leaf === 'mix' ? 250 : 150) : 230;
      const fill = n.leaf === 'yes' ? YES : n.leaf === 'no' ? NO : n.leaf === 'mix' ? HL : '#fbf9f4';
      return <g key={n.id} transform={`translate(${n.x},${n.y}) scale(${pop(f, n.a, 12)})`} opacity={n.id === 'RW' || n.id === 'RS' ? 1 - 0.7 * cut : 1}>
        <rect x={-w / 2} y={-40} width={w} height={80} rx={n.leaf ? 40 : 14} fill={fill} stroke={n.leaf ? 'none' : C.blue} strokeWidth={4} />
        <text y={12} textAnchor="middle" fontFamily={n.leaf ? MONO : SANS} fontWeight={800} fontSize={n.leaf === 'mix' ? 28 : 34} fill={n.leaf && n.leaf !== 'mix' ? '#fff' : C.ink}>{n.t}</text>
      </g>;
    })}
    <g opacity={p(f, at('rec', 0.95), at('rec', 1)) * (1 - p(f, pr, pr + 10))}><Tag x={1620} y={790} text="still mixed (slide 6 table)" bg="#fff" s={26} /></g>
    <g opacity={win(f, at('stop', 0.1), pr)}>
      <Tag x={960} y={880} text="stop: a leaf holds a single example" bg={C.ink} fg="#fff" s={32} />
      <g opacity={p(f, at('stop', 0.5), at('stop', 0.6))}><Tag x={960} y={960} text="or: the children's entropy > the parent's" bg={C.ink} fg="#fff" s={32} /></g>
    </g>
    <g opacity={cut}>
      <path d="M1180,600 L1760,600" stroke={C.red} strokeWidth={6} strokeDasharray="18 12" />
      <Tag x={1470} y={560} text="prune: remove a subtree" bg={C.red} fg="#fff" s={30} />
    </g>
    <g opacity={p(f, at('prune', 0.1), at('prune', 0.2))}><Tag x={960} y={880} text="too deep = fitting noise" bg={HL} s={32} /></g>
    <g opacity={p(f, at('prune', 0.6), at('prune', 0.7))}><Tag x={960} y={960} text="judge it on new examples" bg={C.blue} fg="#fff" s={32} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['entropy', 'how mixed a node is'],
  ['pure / 50-50', '0 bits / 1 bit, the worst'],
  ['weights', 'each child by its size'],
  ['choose', 'the split with the largest gain'],
  ['Play Tennis', 'outlook: 0.940 → 0.694'],
]} />;

export const MlEntropy: React.FC = () =>
  <MlEpisode t={timeline} ch="Week 5" title="Entropy: how mixed is a node?" scenes={[
    [Days, 0], [Ent, B('idea').start], [Split, B('split').start], [Others, B('others').start], [Tree, B('rec').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={B('pure').start + 4} name="pop" volume={0.2} />
    <Sfx at={B('half').start + 4} name="beep" volume={0.18} />
    <Sfx at={at('root', 0.4)} name="ping" volume={0.2} />
    {[0, 1, 2].map(i => <Sfx key={i} at={at('split', 0.15 + i * 0.27)} name="pop" volume={0.18} />)}
    <Sfx at={at('gain', 0.5)} name="ping" volume={0.22} />
    <Sfx at={at('others', 0.75)} name="ping" volume={0.22} />
    <Sfx at={at('prune', 0.3)} name="whoosh" volume={0.2} />
  </MlEpisode>;
