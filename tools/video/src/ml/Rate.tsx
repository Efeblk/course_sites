// COE305 week 6, part 3: slide 17's one-weight example (x = 1.5, r = 0.5, w = 0.8, y = 1.2, E = 0.245),
// the error valley, slope 1.05, one gradient-descent step to 0.695 (slide 20), learning rates 0.1 / 0.4 / 1.0,
// and backpropagation passing the error back layer by layer.
import React from 'react';
import {
  Axes, C, Curve, Exam, HL, Head, MONO, MlEpisode, PURPLE, Pulse, SANS, Sfx, Tag, Unit, Wire, ax, lerp, p, pop, tl, track, win,
} from './kit';
import timeline from '../timelines/ml-rate.json';

const { B, at } = tl(timeline);
const X = 1.5, R = 0.5;
const E = (w: number) => 0.5 * (R - X * w) ** 2;
const dE = (w: number) => X * (X * w - R);
const run = (eta: number, n: number) => { const ws = [0.8]; for (let i = 0; i < n; i++) ws.push(ws[ws.length - 1] - eta * dE(ws[ws.length - 1])); return ws; };

// ------------------------------------------------ scene 1: the example
const Setup: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, e = B('ex').start, n = B('nums').start, y = B('y').start, er = B('err').start;
  const show = p(f, n, n + 10);
  return <g>
    <Head f={f} a={h} b={e}>training: change the weights, lower the error</Head>
    <Head f={f} a={e}>slide 17: one weight</Head>
    <g opacity={p(f, h + 4, h + 14) * (1 - p(f, e, e + 10))}>
      {[0, 1, 2, 3, 4].map(i => {
        const hgt = lerp(380, 60, p(f, at('hook', 0.2) + i * 10, at('hook', 0.2) + i * 10 + 30) * (i / 4));
        return <rect key={i} x={660 + i * 130} y={820 - hgt} width={90} height={hgt} rx={10} fill={i === 4 ? C.green : '#b4ad9f'} />;
      })}
      <text x={960} y={890} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.muted}>error after each step</text>
    </g>
    <g opacity={p(f, e, e + 10)}>
      <Unit x={420} y={500} r={70} text={show > 0.5 ? '1.5' : 'x'} c={C.blue} s={44} />
      <Wire f={f} a={e + 6} x1={500} y1={500} x2={1050} y2={500} c={C.ink} sw={7} label={show > 0.5 ? 'w = 0.8' : 'w'} lc={C.amber} ls={44} lt={0.5} dy={-30} />
      <Unit x={1130} y={500} r={80} text={f > y ? '1.2' : 'y'} c={C.ink} fill={f > y ? HL : '#fbf9f4'} s={48} />
      <text x={760} y={680} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={48} fill={C.ink}>y = x · w</text>
    </g>
    <g opacity={show}>
      <Unit x={1560} y={500} r={80} text="0.5" c={C.green} s={48} />
      <text x={1560} y={640} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.green}>target r</text>
    </g>
    <g opacity={p(f, at('y', 0.3), at('y', 0.5))}><Tag x={1130} y={340} text="far too big" bg={C.red} fg="#fff" s={32} /></g>
    <g opacity={p(f, er + 4, er + 14)}>
      <text x={960} y={850} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={50} fill={C.ink}>E = ½ (r − y)²</text>
      <text x={960} y={940} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={50} fill={C.ink} opacity={p(f, at('err', 0.45), at('err', 0.55))}>= ½ × 0.7² = <tspan fill={C.red}>0.245</tspan></text>
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: the valley, the slope, the step, three learning rates
const RUNS: [number, number, string, string][] = [[0.1, 6, C.blue, 'small'], [0.4, 3, C.green, 'mid'], [1.0, 3, C.red, 'big']];
const Valley: React.FC<{ f: number }> = ({ f }) => {
  const cu = B('curve').start, sl = B('slope').start, st = B('step').start, s2 = B('step2').start, sm = B('small').start, ru = B('rule').start;
  const A = ax(260, 250, 1060, 640, [-0.7, 1.3], [0, 1.0]);
  const P = (w: number): [number, number] => [A.X(w), A.Y(E(w))];
  const tan = p(f, at('slope', 0.2), at('slope', 0.4)) * (1 - p(f, sm - 10, sm));
  const first = track(f, [{ at: 0, x: P(0.8)[0], y: P(0.8)[1] }, { at: at('step2', 0.45), x: P(0.695)[0], y: P(0.695)[1], d: 22, h: 50 }]);
  const firstO = 1 - p(f, sm - 6, sm);
  const head = f < sl ? 'the error for every weight: a valley' : f < st ? 'slope 1.05 > 0: make w smaller' : f < sm ? 'one gradient-descent step' : f < ru ? 'the learning rate sets the step size' : 'too small is slow, too big overshoots';
  const k = Math.max(0, RUNS.findIndex(([, , , id], i) => f < (i + 1 < RUNS.length ? B(RUNS[i + 1][3]).start : 1e9) && f >= B(id).start));
  return <g>
    <Head f={f} a={cu} b={sl}>{head}</Head>
    <Head f={f} a={sl} b={st}>{head}</Head>
    <Head f={f} a={st} b={sm}>{head}</Head>
    <Head f={f} a={sm} b={ru}>{head}</Head>
    <Head f={f} a={ru}>{head}</Head>
    <Axes f={f} a={cu + 2} A={A} xl="weight w" yl="error E" origin={[0, 0]} />
    <Curve f={f} a={at('curve', 0.15)} b={at('curve', 0.6)} A={A} fn={E} x0={-0.6} x1={1.27} c={C.ink} sw={6} n={120} />
    <g opacity={p(f, at('curve', 0.7), at('curve', 0.8))}>
      <line x1={A.X(1 / 3)} x2={A.X(1 / 3)} y1={A.Y(0)} y2={A.Y(0) + 14} stroke={C.green} strokeWidth={5} />
      <text x={A.X(1 / 3)} y={A.Y(0) + 50} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.green}>best w</text>
      {[0, 0.8].map(v => <text key={v} x={A.X(v)} y={A.Y(0) + 50} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.muted} opacity={v ? 1 : 0}>{v}</text>)}
    </g>
    {/* tangent at 0.8 */}
    <g opacity={tan}>
      <line x1={A.X(0.55)} y1={A.Y(E(0.8) - 0.25 * 1.05)} x2={A.X(1.05)} y2={A.Y(E(0.8) + 0.25 * 1.05)} stroke={C.amber} strokeWidth={6} />
      <Tag x={1610} y={330} text="slope = 1.05" bg={C.amber} s={36} mono />
    </g>
    <g opacity={win(f, at('slope', 0.6), sm)}><Tag x={1610} y={430} text="positive: go left" bg={HL} s={34} /></g>
    <g opacity={win(f, at('step', 0.2), sm)}>
      <rect x={1400} y={520} width={440} height={200} rx={20} fill={C.ink} />
      <text x={1620} y={590} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill="#fff">w ← w − η · slope</text>
      <text x={1620} y={660} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={HL} opacity={p(f, s2, s2 + 10)}>0.8 − 0.1 × 1.05</text>
      <text x={1620} y={700} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={HL} opacity={p(f, at('step2', 0.35), at('step2', 0.45))}>= 0.695</text>
    </g>
    <g opacity={win(f, at('step2', 0.7), sm)}><Tag x={1620} y={800} text="the error drops" bg={C.green} fg="#fff" s={32} /></g>
    {f > cu + 30 && firstO > 0 && <circle cx={first.x} cy={first.y} r={20} fill={C.amber} stroke={C.ink} strokeWidth={4} opacity={firstO * p(f, at('curve', 0.6), at('curve', 0.7))} />}
    {/* the three runs */}
    {RUNS.map(([eta, n, col, id], i) => {
      const a0 = B(id).start, ws = run(eta, n);
      const span = B(id).dur * 0.8, dt = span / (n + 0.5);
      if (f < a0) return null;
      const keys = ws.map((w, j) => ({ at: j === 0 ? 0 : a0 + 10 + j * dt, x: P(w)[0], y: P(w)[1], d: Math.min(18, dt - 2), h: eta > 0.5 ? 140 : 40 }));
      const pos = track(f, keys);
      const done = ws.filter((_, j) => j === 0 || f >= keys[j].at + keys[j].d!).length;
      const faded = i < k;
      return <g key={id} opacity={faded ? 0.25 : 1}>
        {ws.slice(0, done).map((w, j) => j > 0 && <line key={j} x1={P(ws[j - 1])[0]} y1={P(ws[j - 1])[1]} x2={P(w)[0]} y2={P(w)[1]} stroke={col} strokeWidth={3} strokeDasharray="8 8" />)}
        {ws.slice(0, done).map((w, j) => <circle key={j} cx={P(w)[0]} cy={P(w)[1]} r={9} fill={col} />)}
        {!faded && <circle cx={pos.x} cy={pos.y} r={20} fill={col} stroke={C.ink} strokeWidth={4} />}
        <g transform={`translate(1620,${330 + i * 100}) scale(${pop(f, a0 + 2, 12)})`}><Tag x={0} y={0} text={`η = ${eta.toFixed(1)}`} bg={col} fg="#fff" s={36} mono /></g>
      </g>;
    })}
    <g opacity={p(f, at('small', 0.75), at('small', 0.85))}><Tag x={1620} y={850} text={`after 6 steps: w = ${run(0.1, 6)[6].toFixed(2)}`} bg="#fff" s={28} mono o={1 - p(f, B('mid').start, B('mid').start + 8)} /></g>
    <g opacity={win(f, at('big', 0.7), ru)}><Tag x={1620} y={850} text="E grows: it diverges" bg={C.red} fg="#fff" s={30} /></g>
    <g opacity={p(f, ru + 4, ru + 14)}>
      <Tag x={1620} y={720} text="too small: slow" bg={C.blue} fg="#fff" s={30} />
      <Tag x={1620} y={810} text="too big: overshoots" bg={C.red} fg="#fff" s={30} />
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: backpropagation
const Deep: React.FC<{ f: number }> = ({ f }) => {
  const d = B('deep').start;
  const L = [[260, [380, 620, 860]], [760, [380, 620, 860]], [1260, [500, 740]], [1660, [620]]] as [number, number[]][];
  const back = (li: number) => at('deep', 0.18 + (3 - li) * 0.12);
  return <g>
    <Head f={f} a={d}>backpropagation: the error travels back</Head>
    {L.slice(0, 3).map(([x, ys], li) => ys.map((y, a) => L[li + 1][1].map((y2, b) => {
      const t = back(li + 1);
      const lit = win(f, t, t + 30, 8);
      return <line key={`${li}${a}${b}`} x1={x} y1={y} x2={L[li + 1][0]} y2={y2} stroke={lit > 0 ? C.red : '#a49b86'} strokeWidth={4 + 4 * lit} opacity={p(f, d + 4, d + 14)} />;
    })))}
    {L.map(([x, ys], li) => ys.map((y, a) => <Unit key={`${li}${a}`} x={x} y={y} r={46} text={li === 0 ? `x${'₁₂₃'[a]}` : li === 3 ? 'y' : ''} c={li === 3 ? C.green : li === 0 ? C.blue : PURPLE} k={pop(f, d + 4 + li * 5, 12)} />))}
    {[3, 2, 1].map(li => L[li][1].map((y, a) => L[li - 1][1].map((y2, b) =>
      <Pulse key={`${li}${a}${b}`} f={f} s={back(li)} d={26} x1={L[li][0]} y1={y} x2={L[li - 1][0]} y2={y2} c={C.red} r={12} />)))}
    <g transform={`translate(1660,470) scale(${pop(f, at('deep', 0.1), 12)})`}><Tag x={0} y={0} text="error E" bg={C.red} fg="#fff" s={32} /></g>
    <g opacity={p(f, at('deep', 0.5), at('deep', 0.6))}><Tag x={760} y={990} text="chain rule: every weight gets its own slope" bg={HL} s={32} /></g>
    <g opacity={p(f, at('deep', 0.75), at('deep', 0.85))}><Tag x={1500} y={990} text="w ← w − η · slope" bg={C.ink} fg="#fff" s={32} mono /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['training', 'move each weight against the slope'],
  ['η', 'the learning rate = the step size'],
  ['too small / big', 'slow / overshoots, can diverge'],
  ['slide 17', 'w: 0.8 → 0.695 with η = 0.1'],
  ['backprop', 'error passes back, layer by layer'],
]} />;

export const MlRate: React.FC = () =>
  <MlEpisode t={timeline} ch="Week 6" title="Learning rate: how big a step?" scenes={[
    [Setup, 0], [Valley, B('curve').start], [Deep, B('deep').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('y', 0.3)} name="beep" volume={0.18} />
    <Sfx at={at('err', 0.5)} name="ping" volume={0.2} />
    <Sfx at={at('step2', 0.45)} name="pop" volume={0.22} />
    <Sfx at={at('big', 0.7)} name="beep" volume={0.2} />
    <Sfx at={at('deep', 0.18)} name="whoosh" volume={0.2} />
  </MlEpisode>;
