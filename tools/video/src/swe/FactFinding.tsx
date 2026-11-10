// SWE307 ch5: fishbone (problem discovery), then fact-finding techniques, sampling, JRP.
import React from 'react';
import { BookOpen, Eye, Boxes, ClipboardList, MessageSquare, Layers, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Person, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-factfinding.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ A: fishbone
const Fish: React.FC<{ f: number }> = ({ f }) => {
  const fi = B('fish'), bo = B('bones');
  const spine = p(f, fi.start + fi.dur * 0.55, fi.start + fi.dur * 0.85);
  const causes = ['machines', 'environment', 'methods', 'measurements', 'materials', 'personnel'];
  return <g>
    <Label f={f} a={fi.start}>problem discovery: the fishbone (Ishikawa) diagram</Label>
    {/* head */}
    <Pop f={f} a={fi.start + fi.dur * 0.6} x={1600} y={560}>
      <path d="M-110,-150 Q140,-150 190,0 Q140,150 -110,150 Z" fill="#fbeed2" stroke={C.red} strokeWidth={6} />
      <T x={30} y={-10} s={36} w={800} c={C.red}>problem:</T><T x={30} y={35} s={30} w={600}>bad burgers</T>
    </Pop>
    <line x1={240} y1={560} x2={lerp(240, 1490, spine)} y2={560} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    {causes.map((c, i) => {
      const top = i % 2 === 0, x = 470 + Math.floor(i / 2) * 400, a = bo.start + bo.dur * (0.05 + i * 0.07), t = p(f, a, a + 16);
      const y2 = top ? 260 : 860;
      return <g key={c}>
        <line x1={x + 160} y1={560} x2={lerp(x + 160, x, t)} y2={lerp(560, y2, t)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        <g transform={`translate(${x},${top ? 220 : 900})`} opacity={p(f, a + 10, a + 18)}><Pill text={c} bg={C.blue} s={30} w={240} /></g>
        {[0, 1].map(k => { const sa = bo.start + bo.dur * (0.5 + i * 0.04 + k * 0.03), sx = lerp(x + 160, x, 0.35 + k * 0.3), sy = lerp(560, y2, 0.35 + k * 0.3);
          return p(f, sa, sa + 10) <= 0 ? null : <line key={k} x1={sx} y1={sy} x2={sx - 110 * p(f, sa, sa + 10)} y2={sy} stroke={C.muted} strokeWidth={4} strokeLinecap="round" />; })}
      </g>;
    })}
    <g opacity={p(f, bo.start + bo.dur * 0.8, bo.start + bo.dur * 0.9)} transform="translate(1600,820)">
      <circle r={60} fill={HL} /><T x={0} y={12} s={30} w={800}>root</T><T x={0} y={110} s={32} w={700} c={C.red}>root cause</T>
    </g>
  </g>;
};

// ------------------------------------------------ B: the techniques
type Tech = { id: string; I: React.FC<any>; name: string; col: string; good: string; bad: string };
const TECH: Tech[] = [
  { id: 'research', I: BookOpen, name: 'research', col: C.teal, good: 'how others solved it', bad: '' },
  { id: 'observe', I: Eye, name: 'observation', col: C.blue, good: 'very reliable data', bad: 'people act differently' },
  { id: 'proto', I: Boxes, name: 'prototyping', col: PURPLE, good: 'try it early', bad: 'unrealistic expectations' },
  { id: 'question', I: ClipboardList, name: 'questionnaires', col: C.amber, good: 'cheap, anonymous, many', bad: 'low return rate' },
  { id: 'interview', I: MessageSquare, name: 'interviews', col: C.green, good: 'rich, can probe', bad: 'time-consuming' },
];
const Techniques: React.FC<{ f: number }> = ({ f }) => {
  const d = B('discover');
  return <g>
    <Label f={f} a={d.start}>requirements discovery: fact-finding</Label>
    {TECH.map((t, i) => {
      const a = B(t.id).start, dd = B(t.id).dur, y = 230 + i * 160;
      const on = p(f, a, a + 10);
      return <g key={t.id} opacity={0.25 + 0.75 * on}>
        <g transform={`translate(${200},${y})`}><IconDot I={t.I} r={54} bg={on > 0.5 ? t.col : '#cfc6b3'} /></g>
        <T x={290} y={y + 16} s={48} w={800} a="start" c={on > 0.5 ? t.col : C.muted}>{t.name}</T>
        <g opacity={p(f, a + dd * 0.35, a + dd * 0.45)} transform={`translate(800,${y})`}><Badge ok r={22} /><T x={40} y={11} s={32} w={600} a="start">{t.good}</T></g>
        {t.bad && <g opacity={p(f, a + dd * 0.7, a + dd * 0.8)} transform={`translate(1380,${y})`}><Badge ok={false} r={22} /><T x={40} y={11} s={32} w={600} a="start">{t.bad}</T></g>}
      </g>;
    })}
    {/* small extras that follow the voice */}
    <g opacity={p(f, at('question', 0.3), at('question', 0.4)) * (1 - p(f, at('interview') - 4, at('interview') + 6))} transform="translate(1100,1000)">
      <Pill text="open-ended: free answer" bg="#fbeed2" fg="#a26a10" s={28} w={420} /><g transform="translate(450,0)"><Pill text="closed-ended: fixed choices" bg="#fbeed2" fg="#a26a10" s={28} w={440} /></g>
    </g>
    <g opacity={p(f, at('interview', 0.3), at('interview', 0.4))} transform="translate(1100,1000)">
      <Pill text="unstructured: general goal" bg="#e3f0e5" fg={C.green} s={28} w={420} /><g transform="translate(450,0)"><Pill text="structured: set questions" bg="#e3f0e5" fg={C.green} s={28} w={420} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ C: sampling
const Sampling: React.FC<{ f: number }> = ({ f }) => {
  const s = B('sample');
  const r = s.start + s.dur * 0.22, sy = s.start + s.dur * 0.45, st = s.start + s.dur * 0.78;
  const cols = 20, rows = 5;
  const mode = f < sy ? 0 : f < st ? 1 : 2;
  const pick = (i: number) => {
    if (mode === 0) return [3, 17, 22, 38, 41, 59, 66, 74, 88, 93].includes(i);
    if (mode === 1) return i % 10 === 9;
    return [2, 13, 27, 31, 46, 52, 68, 75, 81, 97].includes(i);
  };
  const group = (i: number) => Math.floor((i % cols) / 5);
  const gcol = ['#e6ecfb', '#e3f0e5', '#fbeed2', '#efe6f5'];
  const ma = mode === 0 ? r : mode === 1 ? sy : st;
  return <g>
    <Label f={f} a={s.start}>sampling: a representative set of documents and forms</Label>
    {mode === 2 && [0, 1, 2, 3].map(g => <rect key={g} x={190 + g * 5 * 76} y={300} width={5 * 76 - 10} height={rows * 96 + 10} rx={16} fill={gcol[g]} opacity={p(f, st, st + 12)} />)}
    {Array.from({ length: cols * rows }, (_, i) => {
      const x = 230 + (i % cols) * 76, y = 350 + Math.floor(i / cols) * 96, k = pick(i) && f > ma + 10 ? p(f, ma + 10 + (i % 10) * 2, ma + 20 + (i % 10) * 2) : 0;
      return <g key={i} transform={`translate(${x},${y})`}>
        <rect x={-24} y={-32} width={48} height={64} rx={6} fill={k > 0.5 ? (mode === 0 ? C.blue : mode === 1 ? C.amber : C.green) : '#fff'} stroke="#cfc6b3" strokeWidth={3} />
        <rect x={-14} y={-18} width={28} height={5} rx={2} fill={k > 0.5 ? '#fff' : '#e2dccd'} /><rect x={-14} y={-6} width={20} height={5} rx={2} fill={k > 0.5 ? '#fff' : '#e2dccd'} />
      </g>;
    })}
    {[['random: pure chance', r, C.blue], ['systematic: every x / n -th → 1000 / 100 = every 10th', sy, C.amber], ['stratified: subgroups first, then sample each', st, C.green]].map(([t, a, col], i) =>
      <g key={i} opacity={p(f, a as number, (a as number) + 10) * (i === 2 ? 1 : 1 - p(f, [sy, st, 0][i] - 6, [sy, st, 0][i] + 4))}>
        <T x={960} y={930} s={44} w={800} c={col as string}>{t as string}</T>
      </g>)}
  </g>;
};

// ------------------------------------------------ D: JRP
const Jrp: React.FC<{ f: number }> = ({ f }) => {
  const j = B('jrp');
  const seats: [number, string, number][] = [[0, 'user', 1], [1, 'manager', 3], [2, 'IT staff', 2], [3, 'user', 4], [4, 'IT staff', 0]];
  return <g>
    <Label f={f} a={j.start}>Joint Requirements Planning (JRP) session</Label>
    <ellipse cx={960} cy={760} rx={520} ry={130} fill="#d9c9a8" opacity={p(f, j.start, j.start + 12)} />
    {seats.map(([i, role, v]) => { const a = j.start + j.dur * (0.15 + i * 0.07), x = 560 + i * 200; return <g key={i} opacity={p(f, a, a + 10)} transform={`translate(${x},${700})`}>
      <Person v={v} s={0.42} /><T x={0} y={60} s={28} w={700} c={C.muted}>{role}</T></g>; })}
    <Pop f={f} a={j.start + j.dur * 0.62} x={300} y={500}><IconDot I={Users} r={60} bg={C.blue} /><T x={0} y={110} s={34} w={800} c={C.blue}>facilitator</T><T x={0} y={150} s={26} c={C.muted}>leads the session</T></Pop>
    <Pop f={f} a={j.start + j.dur * 0.8} x={1620} y={500}><IconDot I={ThumbsUp} r={60} bg={PURPLE} /><T x={0} y={110} s={34} w={800} c={PURPLE}>sponsor</T><T x={0} y={150} s={26} c={C.muted}>top management</T></Pop>
  </g>;
};

export const SweFactFinding: React.FC = () =>
  <Video t={timeline} scenes={[[Fish, 0], [Techniques, B('discover').start], [Sampling, B('sample').start], [Jrp, B('jrp').start]]}>
    <Sfx at={at('fish', 0.6)} name="pop" volume={0.22} />
    {[0, 1, 2, 3, 4, 5].map(i => <Sfx key={i} at={at('bones', 0.05 + i * 0.07)} name="tick" volume={0.2} />)}
    {TECH.map(t => <Sfx key={t.id} at={at(t.id)} name="whoosh" volume={0.15} />)}
    {[0.22, 0.45, 0.78].map(k => <Sfx key={k} at={at('sample', k) + 10} name="pop" volume={0.2} />)}
  </Video>;
