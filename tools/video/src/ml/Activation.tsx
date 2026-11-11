// COE305 week 6, part 2: why an activation (sum -> output), sigmoid for two classes (sigmoid(0) = 0.5, y > 0.5 iff
// wᵀx > 0), tanh / ReLU / linear, softmax for K classes (2, 1, 0 -> 0.67, 0.24, 0.09), XOR needs a hidden layer
// (slide 15's units), without activations the layers collapse, activations are used in training and in prediction.
import React from 'react';
import {
  Axes, C, Curve, Dot, Exam, HL, Head, MONO, Mark, MlEpisode, PURPLE, Pulse, SANS, Sfx, Tag, Unit, Wire, ax, lerp, p, pop, tl, win,
} from './kit';
import timeline from '../timelines/ml-activation.json';

const { B, at } = tl(timeline);
const sig = (a: number) => 1 / (1 + Math.exp(-a));

// ------------------------------------------------ scene 1: the sum can be anything
const Sum: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, a = B('act').start;
  const vals = ['−12', '0', '3.7'];
  const k = Math.min(2, Math.floor(p(f, at('hook', 0.1), at('hook', 0.55)) * 3));
  const act = p(f, at('act', 0.2), at('act', 0.4));
  return <g>
    <Head f={f} a={h} b={a}>the sum can be any number</Head>
    <Head f={f} a={a}>the activation function turns it into the output</Head>
    <Unit x={520} y={540} r={120} text="Σ" c={C.ink} fill="#2f2c27" fg={HL} s={100} k={pop(f, h + 4, 14)} />
    <g opacity={p(f, at('hook', 0.1), at('hook', 0.2))}><Tag x={520} y={760} text={`wᵀx = ${vals[k]}`} bg="#fff" s={40} mono /></g>
    <g opacity={win(f, at('hook', 0.65), a)}><Tag x={1300} y={540} text="but we want a probability" bg={HL} s={40} /></g>
    <g opacity={act}>
      <Wire f={f} a={at('act', 0.2)} x1={650} y1={540} x2={860} y2={540} c={C.ink} sw={7} />
      <rect x={870} y={440} width={300} height={200} rx={26} fill="#fbf9f4" stroke={PURPLE} strokeWidth={6} />
      <text x={1020} y={530} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={PURPLE}>activation</text>
      <path d={Array.from({ length: 41 }, (_, i) => `${i ? 'L' : 'M'}${920 + i * 5},${600 - sig((i - 20) / 3) * 40}`).join(' ')} stroke={PURPLE} strokeWidth={5} fill="none" />
      <Wire f={f} a={at('act', 0.4)} x1={1180} y1={540} x2={1420} y2={540} c={C.ink} sw={7} />
      <g opacity={p(f, at('act', 0.55), at('act', 0.65))}><Tag x={1560} y={540} text="output" bg={C.ink} fg="#fff" s={40} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: sigmoid
const Sig: React.FC<{ f: number }> = ({ f }) => {
  const s = B('sig').start, s2 = B('sig2').start, s3 = B('sig3').start;
  const A = ax(300, 250, 1000, 600, [-7, 7], [-0.1, 1.1]);
  const k1 = p(f, at('sig2', 0.05), at('sig2', 0.3)), k2 = p(f, at('sig2', 0.35), at('sig2', 0.6)), k3 = p(f, at('sig2', 0.65), at('sig2', 0.85));
  const a = f < s2 ? 0 : 6 * k1 - 12 * k2 + 6 * k3;
  const cls = p(f, at('sig3', 0.4), at('sig3', 0.55));
  return <g>
    <Head f={f} a={s} b={s3}>sigmoid: any number into (0, 1)</Head>
    <Head f={f} a={s3}>one sigmoid output = P(class 1)</Head>
    <Axes f={f} a={s + 2} A={A} xl="wᵀx" yl="y" origin={[0, 0]} />
    {[1, 0.5].map(v => <g key={v} opacity={v === 1 ? p(f, s + 10, s + 20) : p(f, at('sig2', 0.85), at('sig2', 0.95))}>
      <line x1={A.X(-7)} x2={A.X(7)} y1={A.Y(v)} y2={A.Y(v)} stroke={C.muted} strokeWidth={3} strokeDasharray="10 10" />
      <text x={A.X(-7) - 14} y={A.Y(v) + 10} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.muted}>{v}</text>
    </g>)}
    {cls > 0 && <rect x={A.X(0)} y={A.y} width={(A.X(7) - A.X(0)) * cls} height={A.h} fill={C.green} opacity={0.1} />}
    <Curve f={f} a={at('sig', 0.25)} b={at('sig', 0.7)} A={A} fn={sig} x0={-7} x1={7} c={PURPLE} sw={7} n={120} />
    {f > s2 && <g>
      <line x1={A.X(a)} x2={A.X(a)} y1={A.Y(0)} y2={A.Y(sig(a))} stroke={C.amber} strokeWidth={3} strokeDasharray="6 6" />
      <circle cx={A.X(a)} cy={A.Y(sig(a))} r={18} fill={C.amber} stroke={C.ink} strokeWidth={4} />
    </g>}
    <g opacity={p(f, s2, s2 + 10)}>
      <rect x={1380} y={300} width={460} height={140} rx={20} fill={C.ink} />
      <text x={1610} y={355} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill="#d9d1c1">{`wᵀx = ${a.toFixed(1)}`}</text>
      <text x={1610} y={412} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={HL}>{`y = ${sig(a).toFixed(3)}`}</text>
    </g>
    <g opacity={p(f, at('sig2', 0.88), at('sig2', 0.96))}><Tag x={1610} y={520} text="sigmoid(0) = 0.5" bg={HL} s={34} mono /></g>
    <g opacity={cls}>
      <text x={A.X(3.5)} y={A.Y(0.25)} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.green}>class 1</text>
      <Tag x={1610} y={640} text="y > 0.5  ⇔  wᵀx > 0" bg="#fff" s={34} mono />
    </g>
    <g opacity={p(f, at('sig3', 0.15), at('sig3', 0.25))}><Tag x={1610} y={750} text="two classes: one output" bg={PURPLE} fg="#fff" s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 3: other common activations
const Other: React.FC<{ f: number }> = ({ f }) => {
  const o = B('other').start;
  const plots: [string, (a: number) => number, [number, number], string, number][] = [
    ['tanh', Math.tanh, [-1.3, 1.3], 'range (−1, 1)', 0.1],
    ['ReLU', (a) => Math.max(0, a), [-0.6, 3.2], 'max(0, a)', 0.38],
    ['linear', (a) => a * 0.75, [-2.6, 2.6], 'regression output', 0.72],
  ];
  return <g>
    <Head f={f} a={o}>other common activations</Head>
    {plots.map(([t, fn, yr, cap, fr], i) => {
      const a = at('other', fr), A = ax(170 + i * 580, 330, 440, 420, [-3, 3], yr);
      return <g key={t} opacity={p(f, a, a + 10)}>
        <text x={A.x + A.w / 2} y={280} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={44} fill={C.ink}>{t}</text>
        <Axes f={f} a={a} A={A} origin={[0, 0]} />
        <Curve f={f} a={a + 6} b={a + 30} A={A} fn={fn} x0={-3} x1={3} c={[C.teal, C.amber, C.blue][i]} sw={7} />
        <Tag x={A.x + A.w / 2} y={850} text={cap} bg="#fff" s={30} mono />
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ scene 4: softmax
const Soft: React.FC<{ f: number }> = ({ f }) => {
  const m = B('multi').start, s1 = B('sm1').start, s2 = B('sm2').start, s3 = B('sm3').start;
  const raise = p(f, at('sm3', 0.6), at('sm3', 0.85));
  const sc = [2, 1, 0 + 2 * raise];
  const ex = sc.map(Math.exp), tot = ex.reduce((a, b) => a + b, 0), pr = ex.map(e => e / tot);
  const X = [620, 960, 1300], cols = [C.blue, C.amber, C.teal];
  const barT = p(f, at('sm2', 0.4), at('sm2', 0.7));
  return <g>
    <Head f={f} a={m} b={s3}>softmax: K scores into K probabilities</Head>
    <Head f={f} a={s3}>they sum to 1, so the classes compete</Head>
    {X.map((x, i) => <g key={i}>
      <Unit x={x} y={300} r={60} text={`C${'₁₂₃'[i]}`} c={cols[i]} k={pop(f, m + 6 + i * 5, 12)} />
      <g opacity={p(f, s1, s1 + 10)}><text x={x} y={420} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>{`o = ${sc[i].toFixed(raise > 0 && i === 2 ? 1 : 0)}`}</text></g>
      <g opacity={p(f, at('sm1', 0.5) + i * 8, at('sm1', 0.5) + i * 8 + 10)}><text x={x} y={490} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.muted}>{`eᵒ = ${ex[i].toFixed(2)}`}</text></g>
      <rect x={x - 80} y={900 - 340 * pr[i] * barT} width={160} height={340 * pr[i] * barT} rx={10} fill={cols[i]} opacity={f > s3 && i === 0 && raise === 0 ? 1 : 0.85} />
      <g opacity={barT}><text x={x} y={880 - 340 * pr[i] - 4} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>{pr[i].toFixed(2)}</text></g>
    </g>)}
    <line x1={480} x2={1440} y1={900} y2={900} stroke={C.ink} strokeWidth={4} opacity={p(f, s2, s2 + 10)} />
    <g opacity={p(f, s2, s2 + 10)}><Tag x={1680} y={490} text={`total = ${tot.toFixed(2)}`} bg="#fff" s={34} mono /></g>
    <g opacity={p(f, at('sm2', 0.3), at('sm2', 0.4))}><Tag x={1680} y={580} text="each ÷ total" bg={HL} s={34} /></g>
    <g opacity={p(f, s3, s3 + 10)}><Tag x={1680} y={680} text={`sum = ${pr.reduce((a, b) => a + b, 0).toFixed(2)}`} bg={C.ink} fg="#fff" s={34} mono /></g>
    <g opacity={win(f, at('sm3', 0.2), at('sm3', 0.6))}><Tag x={620} y={970} text="choose C₁: the largest" bg={C.blue} fg="#fff" s={32} /></g>
    <g opacity={p(f, at('sm3', 0.6), at('sm3', 0.7))}><Tag x={1300} y={970} text="raise C₃: the others fall" bg={C.teal} fg="#fff" s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: XOR and why the activation matters
const Xor: React.FC<{ f: number }> = ({ f }) => {
  const w = B('why').start, x1 = B('xor1').start, x2 = B('xor2').start, l = B('lin').start;
  const A = ax(220, 260, 620, 620, [-0.5, 1.5], [-0.5, 1.5]);
  const tryT = p(f, at('xor1', 0.3), at('xor1', 0.85));
  const ang = lerp(-20, 200, tryT) * Math.PI / 180;
  const two = p(f, at('xor2', 0.2), at('xor2', 0.5));
  const collapse = p(f, at('lin', 0.45), at('lin', 0.7));
  const pts: [number, number, number][] = [[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 0]];
  const N = { x1: [1120, 420], x2: [1120, 720], z1: [1420, 420], z2: [1420, 720], y: [1720, 570] } as Record<string, [number, number]>;
  const net = p(f, at('xor2', 0.45), at('xor2', 0.6));
  return <g>
    <Head f={f} a={w} b={x2}>XOR: 1 when exactly one input is 1</Head>
    <Head f={f} a={x2} b={l}>a hidden layer: two lines</Head>
    <Head f={f} a={l}>no activation: sums of sums = one line</Head>
    <Axes f={f} a={w + 2} A={A} xl="x₁" yl="x₂" origin={[0, 0]} />
    {two > 0 && <g opacity={two * (1 - collapse)}>
      <polygon points={`${A.X(0)},${A.Y(-0.5)} ${A.X(1.5)},${A.Y(-0.5)} ${A.X(1.5)},${A.Y(1)}`} fill={C.green} opacity={0.14} />
      <polygon points={`${A.X(-0.5)},${A.Y(0)} ${A.X(-0.5)},${A.Y(1.5)} ${A.X(1)},${A.Y(1.5)}`} fill={C.green} opacity={0.14} />
      <line x1={A.X(0)} y1={A.Y(-0.5)} x2={A.X(1.5)} y2={A.Y(1)} stroke={C.blue} strokeWidth={6} />
      <line x1={A.X(-0.5)} y1={A.Y(0)} x2={A.X(1)} y2={A.Y(1.5)} stroke={C.amber} strokeWidth={6} />
      <text x={A.X(1.5) - 6} y={A.Y(1) + 44} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.blue}>z₁</text>
      <text x={A.X(1) + 16} y={A.Y(1.5) + 30} fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.amber}>z₂</text>
    </g>}
    {tryT > 0 && tryT < 1 && <line x1={A.X(0.5 - 1.2 * Math.cos(ang))} y1={A.Y(0.5 - 1.2 * Math.sin(ang))} x2={A.X(0.5 + 1.2 * Math.cos(ang))} y2={A.Y(0.5 + 1.2 * Math.sin(ang))} stroke={C.red} strokeWidth={6} opacity={0.8} />}
    {collapse > 0 && <line x1={A.X(-0.5)} y1={A.Y(-0.2)} x2={A.X(1.5)} y2={A.Y(1.3)} stroke={C.red} strokeWidth={6} opacity={collapse} />}
    {pts.map(([a, b, v], i) => <Dot key={i} f={f} a={w + 10 + i * 6} x={A.X(a)} y={A.Y(b)} r={30} c={v ? C.green : C.red} ring={!v} label={String(v)} />)}
    <Mark f={f} a={at('xor1', 0.85)} x={A.X(0.5)} y={A.Y(-0.25)} ok={false} out={x2} />
    <Mark f={f} a={at('lin', 0.75)} x={A.X(0.5)} y={A.Y(-0.25)} ok={false} />
    {/* the network */}
    <g opacity={net}>
      {[['x1', 'z1'], ['x1', 'z2'], ['x2', 'z1'], ['x2', 'z2'], ['z1', 'y'], ['z2', 'y']].map(([a, b]) =>
        <line key={a + b} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke="#a49b86" strokeWidth={5} />)}
      <Unit x={N.x1[0]} y={N.x1[1]} r={52} text="x₁" c={C.ink} />
      <Unit x={N.x2[0]} y={N.x2[1]} r={52} text="x₂" c={C.ink} />
      <Unit x={N.z1[0]} y={N.z1[1]} r={62} text="z₁" c={C.blue} />
      <Unit x={N.z2[0]} y={N.z2[1]} r={62} text="z₂" c={C.amber} />
      <Unit x={N.y[0]} y={N.y[1]} r={62} text="y" c={C.green} />
      {['z1', 'z2'].map(k => <g key={k} transform={`translate(${N[k][0]},${N[k][1] - 110})`}>
        <rect x={-60} y={-30} width={120} height={56} rx={12} fill="#fbf9f4" stroke={PURPLE} strokeWidth={4} />
        <path d={Array.from({ length: 21 }, (_, i) => `${i ? 'L' : 'M'}${-40 + i * 4},${14 - sig((i - 10) / 1.6) * 30}`).join(' ')} stroke={PURPLE} strokeWidth={4} fill="none" />
        <path d="M-56,-26 L56,22" stroke={C.red} strokeWidth={6} opacity={collapse} />
      </g>)}
      <text x={1720} y={680} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={28} fill={C.green}>z₁ OR z₂</text>
    </g>
    <Pulse f={f} s={at('xor2', 0.7)} d={20} x1={N.z1[0]} y1={N.z1[1]} x2={N.y[0]} y2={N.y[1]} c={C.blue} />
    <Pulse f={f} s={at('xor2', 0.7)} d={20} x1={N.z2[0]} y1={N.z2[1]} x2={N.y[0]} y2={N.y[1]} c={C.amber} />
    <g opacity={win(f, at('xor1', 0.85), x2)}><Tag x={1420} y={900} text="no single line works" bg={C.red} fg="#fff" s={32} /></g>
    <g opacity={p(f, at('lin', 0.2), at('lin', 0.3))}><Tag x={1420} y={930} text="each hidden unit needs its activation" bg={HL} s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 6: when are activations used?
const When: React.FC<{ f: number }> = ({ f }) => {
  const w = B('when').start;
  const chip = (x: number, y: number, t: string, c: string, a: number, fill = '#fbf9f4') => <g transform={`translate(${x},${y}) scale(${pop(f, a, 12)})`}>
    <rect x={-170} y={-50} width={340} height={100} rx={20} fill={fill} stroke={c} strokeWidth={5} />
    <text y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={fill === '#fbf9f4' ? C.ink : '#fff'}>{t}</text>
  </g>;
  const arrow = (x1: number, x2: number, y: number, a: number) => <g opacity={p(f, a, a + 8)}>
    <line x1={x1} x2={x2 - 10} y1={y} y2={y} stroke={C.ink} strokeWidth={5} /><path d={`M${x2 - 24},${y - 14} L${x2},${y} L${x2 - 24},${y + 14}`} fill="none" stroke={C.ink} strokeWidth={5} />
  </g>;
  return <g>
    <Head f={f} a={w}>when are activations used?</Head>
    <g opacity={p(f, at('when', 0.05), at('when', 0.12))}>
      {chip(960, 260, 'before training?', C.red, at('when', 0.05))}
      <path d="M780,260 L1140,260" stroke={C.red} strokeWidth={8} opacity={p(f, at('when', 0.15), at('when', 0.2))} />
    </g>
    <text x={160} y={480} fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue} opacity={p(f, at('when', 0.3), at('when', 0.36))}>training</text>
    {chip(620, 470, 'forward pass', PURPLE, at('when', 0.32), PURPLE)}
    {arrow(800, 940, 470, at('when', 0.36))}
    {chip(1120, 470, 'error', C.ink, at('when', 0.38))}
    {arrow(1300, 1440, 470, at('when', 0.42))}
    {chip(1620, 470, 'backprop: slope', PURPLE, at('when', 0.78), PURPLE)}
    <text x={160} y={710} fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue} opacity={p(f, at('when', 0.5), at('when', 0.56))}>prediction</text>
    {chip(620, 700, 'forward pass', PURPLE, at('when', 0.52), PURPLE)}
    {arrow(800, 940, 700, at('when', 0.56))}
    {chip(1120, 700, 'answer', C.ink, at('when', 0.58))}
    <g opacity={p(f, at('when', 0.6), at('when', 0.7))}><Tag x={960} y={900} text="part of the network: every forward pass" bg={HL} s={36} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['activation', 'turns the sum into the output'],
  ['sigmoid', 'one output in (0, 1): two classes'],
  ['softmax', 'K outputs that sum to 1: K classes'],
  ['why', 'without them, layers = one line (XOR fails)'],
  ['when', 'in training and in prediction'],
]} />;

export const MlActivation: React.FC = () =>
  <MlEpisode t={timeline} ch="Week 6" title="Activation functions: why we use them" scenes={[
    [Sum, 0], [Sig, B('sig').start], [Other, B('other').start], [Soft, B('multi').start], [Xor, B('why').start], [When, B('when').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('act', 0.3)} name="whoosh" volume={0.18} />
    <Sfx at={at('sig2', 0.88)} name="ping" volume={0.2} />
    <Sfx at={at('sm2', 0.4)} name="pop" volume={0.2} />
    <Sfx at={at('xor1', 0.85)} name="beep" volume={0.2} />
    <Sfx at={at('xor2', 0.2)} name="whoosh" volume={0.2} />
    <Sfx at={at('lin', 0.75)} name="beep" volume={0.2} />
    <Sfx at={at('when', 0.15)} name="pop" volume={0.2} />
  </MlEpisode>;
