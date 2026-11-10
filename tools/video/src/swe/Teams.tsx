// SWE307 ch3: communication channels N(N-1)/2, Brooks's law, team size, and the three organization structures.
import React from 'react';
import { BookOpen, CalendarX, Scale, TriangleAlert } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Person, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-teams.json';

const { B, at } = tl(timeline);
const COLS = [C.blue, C.teal, PURPLE, C.amber, C.green, C.red, '#5a78c8', '#c8805a'];

// ------------------------------------------------ A: channels
const Channels: React.FC<{ f: number }> = ({ f }) => {
  const l = B('late'), ch = B('channels'), g = B('grow'), br = B('brooks'), wy = B('why');
  // N over time
  const steps: [number, number][] = [[ch.start + ch.dur * 0.1, 3], [g.start + g.dur * 0.02, 3], [g.start + g.dur * 0.25, 4], [g.start + g.dur * 0.5, 5], [g.start + g.dur * 0.75, 8]];
  let N = 0, since = 0; steps.forEach(([a, n]) => { if (f >= a) { N = n; since = a; } });
  const ce = { x: 620, y: 600 }, R = 260;
  const pos = (i: number, n: number): [number, number] => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return [ce.x + R * Math.cos(a), ce.y + R * Math.sin(a)]; };
  const edges: [number, number][] = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) edges.push([i, j]);
  const draw = p(f, since + 4, since + 30);
  const lateO = 1 - p(f, ch.start - 6, ch.start + 10);
  const bo = p(f, br.start, br.start + 14);
  const tip = p(f, wy.start + wy.dur * 0.3, wy.start + wy.dur * 0.7);
  return <g>
    {/* late */}
    <g opacity={lateO} transform="translate(0,90)">
      <Pop f={f} a={l.start + 4} x={760} y={480}><IconDot I={CalendarX} r={110} bg={C.red} /></Pop>
      <Rise f={f} a={l.start + l.dur * 0.3}><T x={760} y={680} s={50} w={800} c={C.red}>late</T></Rise>
      {[0, 1, 2].map(k => <Pop key={k} f={f} a={l.start + l.dur * (0.6 + k * 0.08)} x={1150 + k * 170} y={720}><Person v={k + 2} s={0.38} /><T x={0} y={-250} s={54} w={800} c={C.green}>+</T></Pop>)}
      <Rise f={f} a={l.start + l.dur * 0.75}><T x={1320} y={430} s={64} w={800} c={C.ink} f={SERIF}>?</T></Rise>
    </g>
    {/* network */}
    <g opacity={1 - lateO}>
      {edges.map(([i, j], k) => { const [x1, y1] = pos(i, N), [x2, y2] = pos(j, N); const t = Math.min(1, Math.max(0, draw * edges.length - k * 0.6)); return <line key={`${N}-${k}`} x1={x1} y1={y1} x2={lerp(x1, x2, t)} y2={lerp(y1, y2, t)} stroke={C.amber} strokeWidth={4} opacity={0.8} />; })}
      {Array.from({ length: N }, (_, i) => { const [x, y] = pos(i, N); return <g key={i} transform={`translate(${x},${y}) scale(${N === 8 ? 0.8 : 1})`}><circle r={44} fill={COLS[i]} stroke="#fff" strokeWidth={6} /><circle cy={-10} r={14} fill="#fff" opacity={0.85} /><path d="M-22,24 q22,-28 44,0" fill="#fff" opacity={0.85} /></g>; })}
      <g transform="translate(1300,0)">
        <Rise f={f} a={ch.start + ch.dur * 0.55}><T x={0} y={330} s={80} w={700} f={SERIF}>N(N − 1) / 2</T></Rise>
        <g opacity={p(f, g.start, g.start + 10)}>
          {[[3, 3], [4, 6], [5, 10], [8, 28]].map(([n, c], k) => {
            const a = g.start + g.dur * (0.02 + k * 0.245);
            return <Rise key={n} f={f} a={a}><g transform={`translate(0,${440 + k * 110})`} opacity={N === n ? 1 : 0.45}>
              <T x={-150} y={0} s={46} w={700} a="start">{n} people</T><T x={150} y={0} s={46} w={800} a="start" c={C.amber}>{c}</T>
            </g></Rise>;
          })}
        </g>
      </g>
    </g>
    {/* Brooks */}
    <g opacity={bo}>
      <rect width={1920} height={1080} fill={C.paper} />
      <Pop f={f} a={br.start + 6} x={420} y={500}><IconDot I={BookOpen} r={110} bg={C.ink} /></Pop>
      <Rise f={f} a={br.start + 10}><T x={420} y={690} s={36} w={700} f={SERIF}>The Mythical Man-Month</T><T x={420} y={740} s={30} c={C.muted}>Fred Brooks</T></Rise>
      <Rise f={f} a={br.start + br.dur * 0.35}><T x={1220} y={420} s={54} w={500} f={SERIF}>Adding people to a</T><T x={1220} y={500} s={54} w={500} f={SERIF}>failing project</T><T x={1220} y={590} s={60} w={800} f={SERIF} c={C.red}>makes matters worse.</T></Rise>
      {/* balance */}
      <g transform="translate(1220,860)" opacity={p(f, wy.start, wy.start + 12)}>
        <path d="M-40,90 L0,10 L40,90Z" fill={C.ink} />
        <g transform={`rotate(${-14 * tip})`}>
          <rect x={-360} y={0} width={720} height={12} rx={6} fill={C.ink} />
          <g transform="translate(-300,-12)"><rect x={-110} y={-60} width={220} height={60} rx={12} fill={C.green} /><T x={0} y={-20} s={26} w={700} c="#fff">dividing work</T></g>
          <g transform="translate(300,-12)"><rect x={-130} y={-60 - 50 * tip} width={260} height={60 + 50 * tip} rx={12} fill={C.amber} /><T x={0} y={-20} s={26} w={700} c="#fff">communication</T></g>
        </g>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ B: size
const Size: React.FC<{ f: number }> = ({ f }) => {
  const s = B('size');
  const X = (n: number) => 260 + (n - 1) * 130;
  const band = p(f, s.start + s.dur * 0.25, s.start + s.dur * 0.4);
  const sc = p(f, s.start + s.dur * 0.55, s.start + s.dur * 0.65), dv = p(f, s.start + s.dur * 0.75, s.start + s.dur * 0.85);
  return <g>
    <Label f={f} a={s.start}>so: keep teams small</Label>
    <line x1={X(1)} y1={540} x2={X(12)} y2={540} stroke={C.ink} strokeWidth={5} opacity={p(f, s.start, s.start + 10)} />
    {Array.from({ length: 12 }, (_, i) => <g key={i} opacity={p(f, s.start + i * 2, s.start + 8 + i * 2)}><line x1={X(i + 1)} y1={525} x2={X(i + 1)} y2={555} stroke={C.ink} strokeWidth={4} /><T x={X(i + 1)} y={610} s={36} w={700}>{i + 1}</T></g>)}
    <rect x={X(3) - 30} y={420} width={(X(9) - X(3) + 60) * band} height={80} rx={40} fill={C.green} opacity={0.85} />
    <T x={(X(3) + X(9)) / 2} y={473} s={38} w={800} c="#fff" o={band}>optimal: 3 – 9</T>
    <g opacity={sc}><rect x={X(3) - 30} y={680} width={X(9) - X(3) + 60} height={70} rx={35} fill="none" stroke={C.green} strokeWidth={5} /><T x={X(3) - 60} y={728} s={34} w={700} a="end" c={C.green}>scrum team</T></g>
    <g opacity={dv}><rect x={X(2) - 30} y={790} width={(X(5) - X(2) + 60)} height={70} rx={35} fill={C.blue} opacity={0.85} /><T x={(X(2) + X(5)) / 2} y={837} s={32} w={800} c="#fff">developers 2 – 5</T></g>
  </g>;
};

// ------------------------------------------------ C: three structures
const Dot: React.FC<{ x: number; y: number; c: string; k: number }> = ({ x, y, c, k }) => <circle cx={x} cy={y} r={22 * k} fill={c} stroke="#fff" strokeWidth={4} />;
const Orgs: React.FC<{ f: number }> = ({ f }) => {
  const o = B('org'), pr = B('proj'), fu = B('func'), ma = B('matrix');
  const box = (x: number, a: number, title: string, col: string, body: React.ReactNode, pros: [string, boolean][], d: number) =>
    <g opacity={p(f, a, a + 12)}>
      <Card x={x} y={170} w={560} h={820} stroke={col} />
      <T x={x + 280} y={240} s={40} w={800} c={col}>{title}</T>
      {body}
      {pros.map(([t, ok], i) => <Rise key={t} f={f} a={a + d * (0.4 + i * 0.15)}><g transform={`translate(${x + 50},${730 + i * 62})`}><Badge ok={ok} r={20} /><T x={36} y={11} s={28} w={600} a="start">{t}</T></g></Rise>)}
    </g>;
  const k = (a: number) => pop(f, a);
  return <g>
    <Label f={f} a={o.start}>three organization structures</Label>
    {box(80, pr.start - 10, 'Project-oriented', C.blue,
      <g>{[0, 1].map(pj => <g key={pj}><rect x={150 + pj * 220} y={290} width={190} height={380} rx={18} fill="#e6ecfb" /><T x={245 + pj * 220} y={330} s={28} w={700} c={C.blue}>project {pj ? 'B' : 'A'}</T>
        {[0, 1, 2, 3].map(i => <Dot key={i} x={245 + pj * 220} y={400 + i * 70} c={COLS[pj * 4 + i]} k={k(pr.start + 10 + (pj * 4 + i) * 3)} />)}</g>)}</g>,
      [['performance, predictable', true], ['engineers isolated', false], ['less reuse', false]], pr.dur)}
    {box(680, fu.start - 10, 'Function-oriented', C.teal,
      <g>{['engineering', 'testing', 'marketing'].map((fn, r) => <g key={fn}><rect x={720} y={290 + r * 130} width={480} height={110} rx={18} fill="#ddeeed" /><T x={740} y={330 + r * 130} s={26} w={700} a="start" c={C.teal}>{fn}</T>
        {[0, 1, 2, 3].map(i => <Dot key={i} x={900 + i * 75} y={355 + r * 130} c={COLS[r * 3 + i]} k={k(fu.start + 10 + (r * 4 + i) * 3)} />)}</g>)}</g>,
      [['clear decision channels', true], ['moving people = delay', false]], fu.dur)}
    {box(1280, ma.start - 10, 'Matrix', PURPLE,
      <g>{['eng', 'test', 'mkt'].map((fn, r) => <T key={fn} x={1340} y={430 + r * 100} s={24} w={700} c={C.muted} a="start">{fn}</T>)}
        {['A', 'B', 'C'].map((pj, c) => <g key={pj}><rect x={1430 + c * 120} y={290} width={100} height={400} rx={14} fill="#efe6f5" /><T x={1480 + c * 120} y={330} s={26} w={700} c={PURPLE}>{pj}</T></g>)}
        {['eng', 'test', 'mkt'].map((fn, r) => <line key={fn} x1={1330} x2={1790} y1={420 + r * 100} y2={420 + r * 100} stroke="#d9d1c1" strokeWidth={2} />)}
        {[[0, 0], [1, 0], [0, 1], [2, 1], [1, 2], [2, 2], [0, 2]].map(([c, r], i) => {
          const a = ma.start + 10 + i * 4, slide = p(f, a + 8, a + 26);
          return <Dot key={i} x={lerp(1360, 1480 + c * 120, slide)} y={420 + r * 100} c={COLS[i]} k={k(a)} />;
        })}</g>,
      [['efficient use of resources', true]], ma.dur)}
  </g>;
};

export const SweTeams: React.FC = () =>
  <Video t={timeline} scenes={[[Channels, 0], [Size, B('size').start], [Orgs, B('org').start]]}>
    <Sfx at={at('late') + 4} name="beep" volume={0.25} />
    {[0.02, 0.25, 0.5, 0.75].map(k => <Sfx key={k} at={at('grow', k)} name="pop" volume={0.2} />)}
    <Sfx at={at('brooks', 0.35)} name="whoosh" volume={0.25} />
    {['proj', 'func', 'matrix'].map(b => <Sfx key={b} at={at(b) - 10} name="whoosh" volume={0.18} />)}
  </Video>;
