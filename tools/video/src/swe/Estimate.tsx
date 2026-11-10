// SWE307 ch4: from size to effort: LOC vs FP, gearing factor, project class, engineering rules, COCOMO I, weighted effort.
import React from 'react';
import { Car, Globe, Laptop, Code, Ruler } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-estimate.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ A: two units, gearing factor
const Units: React.FC<{ f: number }> = ({ f }) => {
  const s = B('size'), l = B('loc');
  const grow = p(f, l.start + l.dur * 0.55, l.start + l.dur * 0.9);
  const sw = p(f, l.start - 6, l.start + 10);
  return <g>
    <g opacity={1 - sw}>
      <Label f={f} a={s.start}>size comes in two units</Label>
      <Pop f={f} a={s.start + s.dur * 0.45} x={560} y={540}><Card x={-300} y={-230} w={600} h={460} stroke={C.ink} />
        {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-220 + (k % 3) * 30} y={-150 + k * 34} width={300 - (k * 37) % 140} height={14} rx={7} fill={['#9fb2ff', '#5ea86f', '#e0a33a'][k % 3]} />)}
        <T x={0} y={150} s={52} w={800}>LOC</T><T x={0} y={200} s={30} c={C.muted}>lines of code: physical</T></Pop>
      <Pop f={f} a={s.start + s.dur * 0.75} x={1360} y={540}><Card x={-300} y={-230} w={600} h={460} stroke={C.blue} />
        <g transform="translate(0,-60)"><IconDot I={Ruler} r={70} bg={C.blue} /></g>
        <T x={0} y={150} s={52} w={800} c={C.blue}>FP</T><T x={0} y={200} s={30} c={C.muted}>function points: functional</T></Pop>
    </g>
    <g opacity={sw}>
      <Label f={f} a={l.start}>gearing factor = average LOC per FP</Label>
      <Pop f={f} a={l.start + l.dur * 0.3} x={420} y={560}><rect x={-110} y={-110} width={220} height={220} rx={24} fill={C.blue} /><T x={0} y={24} s={72} w={800} c="#fff">1 FP</T></Pop>
      <Arrow x1={590} y1={560} x2={760} y2={560} t={p(f, l.start + l.dur * 0.5, l.start + l.dur * 0.6)} sw={8} />
      <g transform="translate(820,190)">
        {Array.from({ length: 53 }, (_, k) => { const c = k % 2, r = Math.floor(k / 2); return <rect key={k} x={c * 470} y={r * 27} width={(160 + (k * 53) % 260) * p(f, l.start + l.dur * 0.55 + k * 0.6, l.start + l.dur * 0.55 + k * 0.6 + 6)} height={13} rx={6} fill={['#9fb2ff', '#5ea86f', '#e0a33a', '#c9a0dc'][k % 4]} />; })}
      </g>
      <Rise f={f} a={l.start + l.dur * 0.85}><g transform="translate(1290,960)"><rect x={-330} y={-56} width={660} height={100} rx={50} fill={HL} /><T x={0} y={14} s={44} w={800}>{Math.round(53 * grow)} LOC in Java</T></g></Rise>
    </g>
  </g>;
};

// ------------------------------------------------ B: class by size
const Class: React.FC<{ f: number }> = ({ f }) => {
  const c = B('cls');
  const X = (v: number) => 260 + v * 0.95;
  const bands: [number, number, string, string, number][] = [[0, 500, 'simple', C.green, 0.25], [500, 1000, 'average', C.amber, 0.5], [1000, 1500, 'complex', C.red, 0.75]];
  return <g>
    <Label f={f} a={c.start}>class the project by its size</Label>
    {bands.map(([a, b, n, col, fr]) => <g key={n} opacity={p(f, c.start + c.dur * fr, c.start + c.dur * fr + 12)}>
      <rect x={X(a)} y={420} width={(X(b) - X(a)) * p(f, c.start + c.dur * fr, c.start + c.dur * fr + 16)} height={140} rx={14} fill={col} opacity={0.85} />
      <T x={(X(a) + X(b)) / 2} y={505} s={50} w={800} c="#fff">{n}</T>
    </g>)}
    {[0, 500, 1000, 1500].map(v => <g key={v} opacity={p(f, c.start, c.start + 12)}><line x1={X(v)} x2={X(v)} y1={580} y2={610} stroke={C.ink} strokeWidth={4} /><T x={X(v)} y={660} s={36} w={700} f={MONO}>{v}</T></g>)}
    <T x={X(1500) + 40} y={660} s={32} w={600} a="start" c={C.muted}>FP</T>
    <Rise f={f} a={c.start + c.dur * 0.9}><T x={960} y={820} s={36} w={600} c={C.muted}>by type: standalone = simple · web, mobile, client/server = average · embedded = complex</T></Rise>
  </g>;
};

// ------------------------------------------------ C: engineering rules
const Rules: React.FC<{ f: number }> = ({ f }) => {
  const r = B('rules'), e = B('rulesEx');
  const line = (y: number, a: number, txt: string, val: string, va: number, col: string) => <g>
    <Rise f={f} a={a}><T x={260} y={y} s={60} w={500} a="start" f={SERIF}>{txt}</T></Rise>
    <g opacity={p(f, va, va + 12)}><rect x={1250} y={y - 62} width={430} height={86} rx={43} fill={col} opacity={0.15} /><T x={1465} y={y} s={52} w={800} f={MONO} c={col}>{val}</T></g>
  </g>;
  return <g>
    <Label f={f} a={r.start}>engineering rules (from FP)</Label>
    {line(330, r.start + r.dur * 0.15, 'Duration = FP ^ A', '12.01 months', e.start + e.dur * 0.4, C.blue)}
    {line(500, r.start + r.dur * 0.45, 'Staff = FP / 150', '3.33 people', e.start + e.dur * 0.6, C.teal)}
    {line(670, r.start + r.dur * 0.7, 'Effort = Staff × Duration', '≈ 40 person-months', e.start + e.dur * 0.8, PURPLE)}
    <g opacity={p(f, e.start, e.start + 12)} transform="translate(260,850)">
      {[['simple', '0.32'], ['average', '0.40'], ['complex', '0.45']].map(([k, v], i) =>
        <g key={k} transform={`translate(${i * 330},0)`}><rect x={0} y={-50} width={300} height={90} rx={20} fill={i === 1 ? HL : '#fbf9f4'} stroke="#d9d1c1" strokeWidth={3} /><T x={150} y={10} s={36} w={700}>{k}: A = {v}</T></g>)}
      <T x={1050} y={12} s={36} w={700} a="start" c={C.muted}>FP = 500 → average</T>
    </g>
  </g>;
};

// ------------------------------------------------ D: COCOMO I
const Cocomo: React.FC<{ f: number }> = ({ f }) => {
  const c = B('cocomo'), cl = B('classes'), ex = B('cocomoEx');
  const curve = p(f, c.start + c.dur * 0.7, c.start + c.dur * 0.95);
  const pts = Array.from({ length: 41 }, (_, i) => { const x = i / 40; return `${1180 + x * 560},${880 - Math.pow(x, 1.6) * 420}`; }).join(' ');
  const out = p(f, cl.start - 6, cl.start + 10), out2 = p(f, ex.start - 6, ex.start + 10);
  return <g>
    <g opacity={1 - out2}>
      <Label f={f} a={c.start}>COCOMO I (from lines of code)</Label>
      <Rise f={f} a={c.start + c.dur * 0.15}><T x={160} y={300} s={60} w={500} a="start" f={SERIF}>Effort = a × KLOC ^ b</T></Rise>
      <Rise f={f} a={c.start + c.dur * 0.45}><T x={160} y={410} s={60} w={500} a="start" f={SERIF}>Duration = c × Effort ^ d</T></Rise>
    </g>
    <g opacity={1 - out}>
      <line x1={1180} y1={880} x2={1760} y2={880} stroke={C.ink} strokeWidth={4} /><line x1={1180} y1={880} x2={1180} y2={420} stroke={C.ink} strokeWidth={4} />
      <T x={1470} y={940} s={30} c={C.muted}>size</T><T x={1150} y={440} s={30} a="end" c={C.muted}>effort</T>
      <polyline points={pts} fill="none" stroke={C.red} strokeWidth={8} strokeDasharray={`${curve * 900} 900`} />
      <polyline points={`1180,880 1740,480`} fill="none" stroke="#cfc6b3" strokeWidth={4} strokeDasharray="10 10" opacity={curve} />
      <Rise f={f} a={c.start + c.dur * 0.9}><T x={1460} y={400} s={34} w={700} c={C.red}>effort grows faster than size</T></Rise>
    </g>
    {/* three classes */}
    <g opacity={out * (1 - out2)}>
      {([[Laptop, 'organic', 'small, experienced team', '2.4  1.05  2.5  0.38'], [Globe, 'semi-detached', 'medium, e.g. web app', '3.0  1.12  2.5  0.35'], [Car, 'embedded', 'hardware, e.g. ABS brakes', '3.6  1.20  2.5  0.32']] as [React.FC<any>, string, string, string][]).map(([I, n, d, abcd], i) => {
        const a = cl.start + cl.dur * (0.05 + i * 0.3);
        return <Pop key={n} f={f} a={a} x={360 + i * 600} y={720}>
          <Card x={-260} y={-200} w={520} h={400} stroke={i === 1 ? C.blue : '#d9d1c1'} />
          <g transform="translate(0,-90)"><IconDot I={I} r={60} bg={[C.green, C.blue, C.red][i]} /></g>
          <T x={0} y={30} s={46} w={800}>{n}</T><T x={0} y={80} s={28} c={C.muted}>{d}</T>
          <T x={0} y={150} s={30} w={600} f={MONO} c={C.ink}>a b c d: {abcd}</T>
        </Pop>;
      })}
    </g>
    {/* example */}
    <g opacity={out2}>
      <Label f={f} a={ex.start}>same project, about 22.3 KLOC, semi-detached</Label>
      <Rise f={f} a={ex.start + ex.dur * 0.3}><T x={960} y={380} s={62} w={500} f={SERIF}>E = 3.0 × 22.3 ^ 1.12 ≈ 97 person-months</T></Rise>
      <Rise f={f} a={ex.start + ex.dur * 0.65}><T x={960} y={530} s={62} w={500} f={SERIF}>D = 2.5 × 97.1 ^ 0.35 ≈ 12 months</T></Rise>
      <Rise f={f} a={ex.start + ex.dur * 0.15}><T x={960} y={700} s={32} w={600} c={C.muted}>LOC = 500 FP split over Java (53), PL/SQL (37), Perl (24)</T></Rise>
    </g>
  </g>;
};

// ------------------------------------------------ E: weighted effort
const Weighted: React.FC<{ f: number }> = ({ f }) => {
  const w = B('weighted'), u = B('units');
  const H = (v: number) => v * 5.5;
  const b1 = p(f, w.start + w.dur * 0.25, w.start + w.dur * 0.4), b2 = p(f, w.start + w.dur * 0.4, w.start + w.dur * 0.55), r = p(f, w.start + w.dur * 0.8, w.start + w.dur * 0.95);
  const bar = (x: number, v: number, k: number, col: string, lab: string, wt: string) => <g>
    <rect x={x - 90} y={860 - H(v) * k} width={180} height={H(v) * k} rx={12} fill={col} />
    <T x={x} y={840 - H(v) * k} s={48} w={800} f={MONO} c={col} o={k}>{Math.round(v * k)}</T>
    <T x={x} y={920} s={30} w={700} c={C.muted}>{lab}</T>
    {wt && <g opacity={p(f, w.start + w.dur * 0.6, w.start + w.dur * 0.7)}><circle cx={x} cy={990} r={36} fill={HL} /><T x={x} y={1003} s={36} w={800}>×{wt}</T></g>}
  </g>;
  const uo = p(f, u.start - 4, u.start + 10);
  return <g>
    <g opacity={1 - uo}>
      <Label f={f} a={w.start}>two methods, one weighted answer</Label>
      <line x1={260} y1={860} x2={1300} y2={860} stroke={C.ink} strokeWidth={4} />
      {bar(440, 40, b1, C.blue, 'engineering rules', '7')}
      {bar(760, 97, b2, C.red, 'COCOMO I', '3')}
      {bar(1100, 57.1, r, PURPLE, 'weighted', '')}
      <Rise f={f} a={w.start + w.dur * 0.7}><T x={1570} y={420} s={44} w={500} f={SERIF}>(7 × 40 + 3 × 97) / 10</T><T x={1570} y={500} s={52} w={800} f={SERIF} c={PURPLE}>= 57.1 ≈ 57</T></Rise>
    </g>
    <g opacity={uo}>
      <Pop f={f} a={u.start + u.dur * 0.3} x={620} y={540}><Pill text="duration: months" bg={C.blue} s={52} /></Pop>
      <Pop f={f} a={u.start + u.dur * 0.6} x={1300} y={540}><Pill text="effort: person-months" bg={PURPLE} s={52} /></Pop>
    </g>
  </g>;
};

export const SweEstimate: React.FC = () =>
  <Video t={timeline} scenes={[[Units, 0], [Class, B('cls').start], [Rules, B('rules').start], [Cocomo, B('cocomo').start], [Weighted, B('weighted').start]]}>
    <Sfx at={at('cls', 0.5)} name="pop" volume={0.2} />
    {[0.4, 0.6, 0.8].map(k => <Sfx key={k} at={at('rulesEx', k)} name="tick" volume={0.3} />)}
    {[0.05, 0.35, 0.65].map(k => <Sfx key={`c${k}`} at={at('classes', k)} name="pop" volume={0.2} />)}
    <Sfx at={at('weighted', 0.8)} name="ping" volume={0.2} />
    <Sfx at={at('units', 0.3)} name="whoosh" volume={0.2} />
  </Video>;
