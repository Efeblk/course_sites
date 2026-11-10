// SWE307 ch4: critical path analysis on the slides' 8-task network (TE forward, TL backward, slack, 22 weeks).
import React from 'react';
import { Sfx } from '../kit';
import { Arrow, C, Card, Label, PURPLE, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-critical.json';

const { B, at } = tl(timeline);
type N = { id: number; x: number; y: number; d: number; te: number; tl: number };
const NODES: N[] = [
  { id: 1, x: 260, y: 560, d: 5, te: 5, tl: 5 }, { id: 2, x: 600, y: 360, d: 4, te: 9, tl: 11 }, { id: 3, x: 600, y: 760, d: 6, te: 11, tl: 11 },
  { id: 4, x: 940, y: 560, d: 2, te: 13, tl: 13 }, { id: 5, x: 1280, y: 360, d: 5.5, te: 18.5, tl: 21 }, { id: 6, x: 1280, y: 760, d: 5, te: 18, tl: 18 },
  { id: 7, x: 1620, y: 760, d: 3, te: 21, tl: 21 }, { id: 8, x: 1620, y: 360, d: 1, te: 22, tl: 22 },
];
const E: [number, number][] = [[1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 8], [6, 7], [7, 8]];
const CRIT = new Set([1, 3, 4, 6, 7, 8]);
const n = (id: number) => NODES[id - 1];
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

const Net: React.FC<{ f: number }> = ({ f }) => {
  const net = B('net'), fw = B('fwdEx'), bw = B('bwd'), sx = B('slackEx'), pa = B('path');
  // forward pass reveal times
  const teAt: Record<number, number> = { 1: fw.start + fw.dur * 0.08, 2: fw.start + fw.dur * 0.18, 3: fw.start + fw.dur * 0.25, 4: fw.start + fw.dur * 0.45, 5: fw.start + fw.dur * 0.62, 6: fw.start + fw.dur * 0.67, 7: fw.start + fw.dur * 0.75, 8: fw.start + fw.dur * 0.85 };
  const tlAt: Record<number, number> = { 8: bw.start + bw.dur * 0.12, 7: bw.start + bw.dur * 0.32, 5: bw.start + bw.dur * 0.4, 6: bw.start + bw.dur * 0.47, 4: bw.start + bw.dur * 0.6, 3: bw.start + bw.dur * 0.72, 2: bw.start + bw.dur * 0.78, 1: bw.start + bw.dur * 0.9 };
  const crit = p(f, pa.start + pa.dur * 0.1, pa.start + pa.dur * 0.4);
  const fade = p(f, B('tools').start - 6, B('tools').start + 10);
  return <g opacity={1 - fade}>
    {E.map(([a, b], i) => {
      const A = n(a), Bn = n(b), ang = Math.atan2(Bn.y - A.y, Bn.x - A.x);
      const red = CRIT.has(a) && CRIT.has(b) ? crit : 0;
      const t = p(f, net.start + net.dur * (0.15 + i * 0.05), net.start + net.dur * (0.25 + i * 0.05));
      return <Arrow key={i} x1={A.x + 62 * Math.cos(ang)} y1={A.y + 62 * Math.sin(ang)} x2={Bn.x - 66 * Math.cos(ang)} y2={Bn.y - 66 * Math.sin(ang)} t={t}
        c={red > 0.5 ? C.red : C.ink} sw={lerp(5, 10, red)} hs={20} head="fill" />;
    })}
    {/* glow on task 4: where two paths meet, take the larger */}
    <g opacity={p(f, teAt[4] - 20, teAt[4] - 10) * (1 - p(f, teAt[4] + 30, teAt[4] + 45))}>
      <T x={940} y={700} s={34} w={800} c={C.blue}>max(9, 11) + 2</T>
    </g>
    <g opacity={p(f, tlAt[4] - 20, tlAt[4] - 10) * (1 - p(f, tlAt[4] + 30, tlAt[4] + 45))}>
      <T x={940} y={700} s={34} w={800} c={C.amber}>min(21 − 5.5, 18 − 5)</T>
    </g>
    {NODES.map((nd, i) => {
      const a = net.start + net.dur * (0.08 + i * 0.05), red = CRIT.has(nd.id) ? crit : 0;
      const te = p(f, teAt[nd.id], teAt[nd.id] + 8), tlo = p(f, tlAt[nd.id], tlAt[nd.id] + 8);
      const st = nd.tl - nd.te, sa = sx.start + sx.dur * (nd.id === 2 ? 0.05 : nd.id === 5 ? 0.35 : 0.65);
      const below = nd.y > 560 || nd.id === 1;
      const ly = below ? 110 : -212;
      return <g key={nd.id}>
        <Pop f={f} a={a} x={nd.x} y={nd.y}>
          <circle r={58} fill={red > 0.5 ? C.red : '#fff'} stroke={red > 0.5 ? C.red : C.ink} strokeWidth={6} />
          <T x={0} y={18} s={52} w={800} c={red > 0.5 ? '#fff' : C.ink}>{nd.id}</T>
        </Pop>
        <g transform={`translate(${nd.x - 75},${nd.y + ly})`} opacity={p(f, a + 6, a + 14)}>
          <T x={0} y={28} s={30} w={700} a="start" c={C.muted}>D = {fmt(nd.d)}</T>
          <g opacity={te}><T x={0} y={66} s={30} w={800} a="start" c={C.blue}>TE = {fmt(nd.te)}</T></g>
          <g opacity={tlo}><T x={0} y={104} s={30} w={800} a="start" c={C.amber}>TL = {fmt(nd.tl)}</T></g>
        </g>
        <g transform={`translate(${nd.x - 75},${nd.y + ly + 142})`} opacity={p(f, sa, sa + 8)}>
          {st > 0 && <rect x={-10} y={-30} width={150} height={42} rx={21} fill={HL} />}
          <T x={0} y={0} s={30} w={800} a="start" c={st ? C.ink : C.muted}>ST = {fmt(st)}</T>
        </g>
      </g>;
    })}
    {/* duration */}
    <g opacity={p(f, pa.start + pa.dur * 0.75, pa.start + pa.dur * 0.85)}>
      <rect x={760} y={940} width={400} height={96} rx={48} fill={C.red} />
      <T x={960} y={1004} s={50} w={800} c="#fff">22 weeks</T>
    </g>
  </g>;
};

const Main: React.FC<{ f: number }> = ({ f }) => {
  const fw = B('fwd'), bw = B('bwd'), sl = B('slack'), pa = B('path');
  const title = (a: number, b: number, txt: React.ReactNode, col = C.blue) => <g opacity={p(f, a, a + 10) * (1 - p(f, b - 8, b))}><T x={960} y={110} s={44} w={700} f={SERIF} c={col}>{txt}</T></g>;
  return <g>
    {title(B('intro').start, B('net').start + 30, 'How long will the project take?', C.ink)}
    {title(B('net').start + 30, fw.start, 'the PERT chart: tasks and dependencies')}
    {title(fw.start, bw.start, 'forward pass: TE = TE before + own D (meet: larger)')}
    {title(bw.start, sl.start, 'backward pass: TL = next TL − next D (split: smaller)', C.amber)}
    {title(sl.start, pa.start, 'slack ST = TL − TE', C.ink)}
    {title(pa.start, B('tools').start, 'critical path: zero slack, the longest path', C.red)}
    <Net f={f} />
    {/* intro: shuffled task cards */}
    <g opacity={1 - p(f, B('net').start - 4, B('net').start + 10)}>
      {NODES.map((nd, i) => <Pop key={nd.id} f={f} a={B('intro').start + i * 5} x={360 + (i % 4) * 400} y={420 + Math.floor(i / 4) * 280}>
        <Card x={-150} y={-90} w={300} h={180} /><T x={0} y={-10} s={50} w={800}>task {nd.id}</T><T x={0} y={50} s={30} c={C.muted}>{fmt(nd.d)} weeks</T>
      </Pop>)}
    </g>
  </g>;
};

// ------------------------------------------------ tools: WBS + Gantt
const Tools: React.FC<{ f: number }> = ({ f }) => {
  const t = B('tools');
  const w = p(f, t.start + t.dur * 0.15, t.start + t.dur * 0.3), g = t.start + t.dur * 0.6;
  return <g>
    <Label f={f} a={t.start}>other scheduling tools</Label>
    <g opacity={w}>
      <T x={480} y={230} s={40} w={800} c={C.blue}>work breakdown structure</T>
      <rect x={380} y={280} width={200} height={70} rx={14} fill={C.blue} /><T x={480} y={326} s={30} w={700} c="#fff">goal</T>
      {[0, 1, 2].map(i => <g key={i}>
        <line x1={480} y1={350} x2={200 + i * 280} y2={430} stroke={C.ink} strokeWidth={3} />
        <rect x={120 + i * 280} y={430} width={160} height={60} rx={12} fill="#e6ecfb" stroke={C.blue} strokeWidth={3} /><T x={200 + i * 280} y={470} s={26} w={700}>phase</T>
        {[0, 1].map(k => <g key={k}><line x1={200 + i * 280} y1={490} x2={200 + i * 280} y2={560 + k * 90} stroke={C.ink} strokeWidth={2} />
          <rect x={140 + i * 280} y={530 + k * 90} width={120} height={56} rx={10} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} /><T x={200 + i * 280} y={566 + k * 90} s={22} w={600}>task</T></g>)}
      </g>)}
      <T x={480} y={800} s={34} w={800} c={C.ink}>task ≤ 40 hours · ≤ 6 subtasks</T>
    </g>
    <g opacity={p(f, g, g + 12)}>
      <T x={1420} y={230} s={40} w={800} c={C.green}>Gantt chart</T>
      {Array.from({ length: 11 }, (_, k) => <line key={k} x1={1080 + k * 64} x2={1080 + k * 64} y1={270} y2={740} stroke="#e2dccd" strokeWidth={2} />)}
      {[[0, 3], [2, 4], [3, 2], [5, 3], [6, 4]].map(([s, l], i) => <g key={i}>
        <rect x={1080 + s * 64} y={300 + i * 90} width={l * 64 * p(f, g + 6 + i * 6, g + 20 + i * 6)} height={50} rx={10} fill={[C.blue, C.teal, PURPLE, C.amber, C.green][i]} />
        <rect x={1080 + s * 64} y={300 + i * 90} width={l * 64 * p(f, g + 6 + i * 6, g + 20 + i * 6) * [1, 0.7, 0.5, 0.2, 0][i]} height={50} rx={10} fill="rgba(0,0,0,.25)" />
      </g>)}
      <T x={1420} y={800} s={34} w={800}>tasks as bars on a calendar</T>
    </g>
  </g>;
};

export const SweCritical: React.FC = () =>
  <Video t={timeline} scenes={[[Main, 0], [Tools, B('tools').start]]}>
    {NODES.map((_, i) => <Sfx key={i} at={at('net', 0.08 + i * 0.05)} name="pop" volume={0.14} />)}
    {[0.08, 0.18, 0.25, 0.45, 0.62, 0.67, 0.75, 0.85].map(k => <Sfx key={`f${k}`} at={at('fwdEx', k)} name="tick" volume={0.3} />)}
    {[0.12, 0.32, 0.4, 0.47, 0.6, 0.72, 0.78, 0.9].map(k => <Sfx key={`b${k}`} at={at('bwd', k)} name="tick" volume={0.3} />)}
    <Sfx at={at('path', 0.1)} name="whoosh" volume={0.3} />
    <Sfx at={at('path', 0.75)} name="ping" volume={0.22} />
  </Video>;
