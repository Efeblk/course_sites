// SWE307 ch4: Function Point Analysis on the slides' weather app: EI 3, EO 1, EQ 1, ILF 1, EIF 0 → UFP 23 → VAF 40 → AFP ≈ 24.
import React from 'react';
import { Database, FileBarChart, User, Ruler, FileText, Code, AppWindow } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-fpa.json';

const { B, at } = tl(timeline);
const U: [string, string, number, string][] = [['EI', 'external inputs', 3, C.blue], ['EO', 'external outputs', 1, C.green], ['EQ', 'external inquiries', 1, C.amber], ['ILF', 'internal logical files', 1, PURPLE], ['EIF', 'external interface files', 0, C.muted]];
const BEAT = ['ei', 'eo', 'eq', 'ilf', 'eif'];

// ------------------------------------------------ A: why FP
const Why: React.FC<{ f: number }> = ({ f }) => {
  const w = B('why');
  return <g>
    <Pop f={f} a={w.start + 6} x={520} y={500}><Card x={-260} y={-220} w={520} h={440} /><IconDot I={Code} r={64} bg="#cfc6b3" /><T x={0} y={140} s={44} w={700} c={C.muted}>0 lines of code</T></Pop>
    <Pop f={f} a={w.start + w.dur * 0.45} x={1400} y={500}><Card x={-260} y={-220} w={520} h={440} stroke={C.blue} /><IconDot I={FileText} r={64} bg={C.blue} /><T x={0} y={140} s={44} w={700} c={C.blue}>requirements</T></Pop>
    <Arrow x1={1100} y1={500} x2={820} y2={500} t={0} />
    <Pop f={f} a={w.start + w.dur * 0.62} x={1400} y={840}><Pill text="function points (FP)" bg={C.blue} s={40} /></Pop>
    <Rise f={f} a={w.start + w.dur * 0.8}><T x={1400} y={950} s={32} w={600} c={C.muted}>independent of the language</T></Rise>
    <Rise f={f} a={w.start + 4}><T x={960} y={150} s={64} w={600} f={SERIF}>How big is it?</T></Rise>
  </g>;
};

// ------------------------------------------------ the weather app, with its boundary (used in B)
const FIELDS = ['city', 'state', 'date', 'temperature', 'rainfall'];
const App: React.FC<{ f: number }> = ({ f }) => {
  const ap = B('app');
  const hi = (id: string) => p(f, at(id, 0.25), at(id, 0.35)) * (1 - p(f, B(id).start + B(id).dur + 6, B(id).start + B(id).dur + 16));
  const ei = hi('ei'), eo = hi('eo'), eq = hi('eq'), ilf = hi('ilf'), eif = hi('eif');
  const bnd = p(f, at('ei', 0), at('ei', 0.2));
  return <g>
    {/* the screen */}
    <Pop f={f} a={ap.start + ap.dur * 0.15} x={560} y={560}>
      <rect x={-260} y={-300} width={520} height={600} rx={22} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <rect x={-260} y={-300} width={520} height={70} rx={22} fill={C.ink} /><rect x={-260} y={-250} width={520} height={20} fill={C.ink} />
      <T x={0} y={-252} s={32} w={700} c="#fff">Weather</T>
      {FIELDS.map((fl, i) => <g key={fl} transform={`translate(-220,${-190 + i * 70})`}>
        <T x={0} y={8} s={26} a="start" w={600} c={C.muted}>{fl}</T>
        <rect x={170} y={-22} width={230} height={44} rx={8} fill="#f3efe6" stroke="#d9d1c1" strokeWidth={2} />
      </g>)}
      {['add', 'change', 'delete'].map((b, i) => <g key={b} transform={`translate(${-160 + i * 160},200)`}>
        <rect x={-70} y={-30} width={140} height={60} rx={14} fill={ei > 0 ? C.blue : '#e6ecfb'} stroke={C.blue} strokeWidth={3} opacity={1} />
        <T x={0} y={10} s={28} w={700} c={ei > 0 ? '#fff' : C.blue}>{b}</T>
      </g>)}
      {/* scroll bar */}
      <rect x={232} y={-220} width={18} height={360} rx={9} fill={eq > 0 ? C.amber : '#e2dccd'} />
      <rect x={232} y={lerp(-220, 60, eq > 0 ? (Math.sin(f / 10) + 1) / 2 : 0)} width={18} height={80} rx={9} fill={eq > 0 ? '#a77d26' : '#b9ad95'} />
    </Pop>
    {/* database inside */}
    <Pop f={f} a={ap.start + ap.dur * 0.45} x={1020} y={640}>
      <circle r={110} fill={PURPLE} opacity={0.18 * ilf} />
      <IconDot I={Database} r={70} bg={ilf > 0 ? PURPLE : '#8f86a0'} /><T x={0} y={115} s={28} w={700} c={C.muted}>database</T>
    </Pop>
    {/* report outside */}
    <Pop f={f} a={ap.start + ap.dur * 0.7} x={lerp(1020, 1020, eo)} y={lerp(300, 300, eo)}>
      <g transform={`translate(${eo * 0},0)`}><IconDot I={FileBarChart} r={62} bg={eo > 0 ? C.green : '#86a08a'} /><T x={0} y={105} s={28} w={700} c={C.muted}>report</T></g>
    </Pop>
    {/* boundary */}
    <rect x={240} y={200} width={940} height={700} rx={30} fill="none" stroke={C.blue} strokeWidth={5} strokeDasharray="18 14" opacity={bnd} />
    <T x={260} y={185} s={28} a="start" w={700} c={C.blue} o={bnd}>application boundary</T>
    {/* user outside, inputs crossing in */}
    <g transform="translate(120,620)" opacity={bnd}><IconDot I={User} r={48} bg={C.ink} /></g>
    {[0, 1, 2].map(i => { const a = at('ei', 0.3 + i * 0.12); return <Arrow key={i} x1={170} y1={620 + (i - 1) * 40} x2={360} y2={760 + (i - 1) * 6} t={p(f, a, a + 14) * (ei > 0 ? 1 : 0)} c={C.blue} sw={5} hs={16} />; })}
    {/* report leaves the boundary */}
    {eo > 0 && <Arrow x1={1090} y1={300} x2={1260} y2={300} t={p(f, at('eo', 0.3), at('eo', 0.5))} c={C.green} sw={6} hs={18} />}
    {/* inquiry: data comes back from the database to the screen */}
    {eq > 0 && Array.from({ length: 5 }, (_, k) => { const t = ((f - at('eq', 0.3)) / 30 + k / 5) % 1; return t > 0 ? <circle key={k} cx={lerp(950, 820, t)} cy={lerp(620, 520, t)} r={9} fill={C.amber} /> : null; })}
    {/* external interface file: another application's data */}
    <g transform="translate(1290,820)" opacity={p(f, at('eif', 0.2), at('eif', 0.3))}>
      <IconDot I={AppWindow} r={50} bg="#cfc6b3" /><T x={0} y={90} s={26} w={600} c={C.muted}>other app</T>
      <g transform="translate(46,-46)"><Badge ok={false} r={22} /></g>
    </g>
  </g>;
};

const Count: React.FC<{ f: number }> = ({ f }) => <g>
  <App f={f} />
  {U.map(([k, name, n, col], i) => {
    const a = at(BEAT[i], 0.05), cnt = p(f, at(BEAT[i], 0.75), at(BEAT[i], 0.85));
    return <Rise key={k} f={f} a={a}>
      <g transform={`translate(1400,${260 + i * 140})`}>
        <rect x={-30} y={-55} width={500} height={110} rx={20} fill="#fbf9f4" stroke={col} strokeWidth={4} />
        <T x={20} y={14} s={50} a="start" w={800} c={col}>{k}</T>
        <T x={140} y={8} s={22} a="start" w={600} c={C.muted}>{name}</T>
        <g transform="translate(410,0)" opacity={cnt}><g transform={`scale(${pop(f, at(BEAT[i], 0.75))})`}><circle r={40} fill={col} /><T x={0} y={17} s={48} w={800} c="#fff">{n}</T></g></g>
      </g>
    </Rise>;
  })}
</g>;

// ------------------------------------------------ C: rank + UFP
const W = [3, 4, 3, 7, 5];
const Ufp: React.FC<{ f: number }> = ({ f }) => {
  const r = B('rank'), u = B('ufp');
  const rowA = (i: number) => u.start + u.dur * (0.08 + i * 0.16);
  const total = [9, 4, 3, 7, 0].reduce((s, v, i) => s + (f >= rowA(i) + 20 ? v : 0), 0);
  return <g>
    <g opacity={1 - p(f, u.start - 6, u.start + 4)}><Label f={f} a={r.start}>rank each one: low, average or high</Label></g>
    <g opacity={p(f, u.start, u.start + 10)}><Label f={f} a={u.start}>multiply and add: unadjusted function points</Label></g>
    {/* rank: DET / FTR chips */}
    <g opacity={1 - p(f, u.start - 6, u.start + 8)}>
      {[['DET', 'fields'], ['FTR / RET', 'files']].map(([k, v], i) => <Pop key={k} f={f} a={r.start + r.dur * (0.2 + i * 0.15)} x={620 + i * 680} y={420}>
        <Card x={-260} y={-120} w={520} h={240} stroke={C.blue} /><T x={0} y={-10} s={64} w={800} c={C.blue}>{k}</T><T x={0} y={60} s={36} w={600} c={C.muted}>count the {v}</T>
      </Pop>)}
      {['low', 'average', 'high'].map((lv, i) => <Pop key={lv} f={f} a={r.start + r.dur * (0.5 + i * 0.06)} x={620 + i * 340} y={760}>
        <Pill text={lv} bg={i === 0 ? C.green : '#e2dccd'} fg={i === 0 ? '#fff' : C.muted} s={44} w={280} h={100} />
      </Pop>)}
      <Rise f={f} a={r.start + r.dur * 0.8}><T x={620} y={880} s={34} w={800} c={C.green}>here: all low</T></Rise>
    </g>
    {/* UFP table */}
    <g opacity={p(f, u.start - 4, u.start + 10)}>
      {U.map(([k, , n, col], i) => {
        const a = rowA(i), res = n * W[i];
        return <Rise key={k} f={f} a={a}><g transform={`translate(440,${300 + i * 110})`}>
          <T x={0} y={0} s={52} w={800} a="start" c={col}>{k}</T>
          <T x={240} y={0} s={52} w={700} a="start" f={MONO}>{n}</T>
          <T x={330} y={0} s={52} w={500} a="start" c={C.muted}>×</T>
          <T x={410} y={0} s={52} w={700} a="start" f={MONO}>{W[i]}</T>
          <T x={520} y={0} s={36} w={600} a="start" c={C.muted}>{i === 4 ? '(none)' : '(low)'}</T>
          <T x={700} y={0} s={52} w={500} a="start" c={C.muted}>=</T>
          <T x={790} y={0} s={52} w={800} a="start" f={MONO} c={col} o={p(f, a + 14, a + 20)}>{res}</T>
        </g></Rise>;
      })}
      <line x1={420} y1={860} x2={1420} y2={860} stroke={C.ink} strokeWidth={4} opacity={p(f, rowA(4) + 20, rowA(4) + 30)} />
      <g opacity={p(f, rowA(4) + 24, rowA(4) + 34)}>
        <T x={440} y={950} s={60} w={800} a="start">UFP</T>
        <rect x={1180} y={885} width={220} height={100} rx={50} fill={HL} />
        <T x={1290} y={955} s={72} w={800} f={MONO}>{total}</T>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ D: VAF + AFP
const GSC: [string, number][] = [['data communications', 5], ['performance', 5], ['transaction rate', 5], ['online data entry', 5], ['end-user efficiency', 5], ['online update', 4], ['reusability', 3], ['installation ease', 4], ['operational ease', 4]];
const Afp: React.FC<{ f: number }> = ({ f }) => {
  const v = B('vaf'), a = B('afp');
  const run = (i: number) => v.start + v.dur * (0.2 + i * 0.06);
  const sum = GSC.reduce((s, [, w], i) => s + w * p(f, run(i), run(i) + 12), 0);
  const out = p(f, a.start - 4, a.start + 12);
  const s1 = a.start + a.dur * 0.1, s2 = a.start + a.dur * 0.55, s3 = a.start + a.dur * 0.8;
  return <g>
    <g opacity={1 - out}>
      <Label f={f} a={v.start}>general system characteristics, 0 to 5 each</Label>
      {GSC.map(([n, w], i) => <g key={n} transform={`translate(260,${190 + i * 82})`} opacity={p(f, run(i) - 8, run(i))}>
        <T x={380} y={12} s={32} a="end" w={600}>{n}</T>
        {[0, 1, 2, 3, 4].map(k => <rect key={k} x={420 + k * 92} y={-26} width={80} height={52} rx={10} fill={k < w * p(f, run(i), run(i) + 12) - 0.01 ? C.blue : '#e2dccd'} />)}
        <T x={900} y={14} s={36} w={800} a="start" c={C.blue}>{w}</T>
      </g>)}
      <g transform="translate(1560,560)" opacity={p(f, v.start + v.dur * 0.2, v.start + v.dur * 0.3)}>
        <circle r={170} fill="#fbf9f4" stroke={C.blue} strokeWidth={8} />
        <T x={0} y={-50} s={44} w={800} c={C.blue}>VAF</T>
        <T x={0} y={60} s={110} w={800} f={MONO}>{Math.round(sum)}</T>
      </g>
    </g>
    <g opacity={out}>
      <Label f={f} a={a.start}>adjusted function points</Label>
      <Rise f={f} a={s1}><T x={960} y={330} s={68} w={600} f={SERIF}>AFP = UFP × (0.65 + 0.01 × VAF)</T></Rise>
      <Rise f={f} a={s2 - 30}><T x={960} y={500} s={68} w={600} f={SERIF}>= 23 × (0.65 + 0.40)</T></Rise>
      <Rise f={f} a={s2}><T x={960} y={640} s={68} w={600} f={SERIF}>= 23 × 1.05 = 24.15</T></Rise>
      <Pop f={f} a={s3} x={960} y={820}><rect x={-280} y={-75} width={560} height={150} rx={75} fill={HL} /><T x={0} y={30} s={84} w={800}>≈ 24 FP</T></Pop>
    </g>
  </g>;
};

export const SweFpa: React.FC = () =>
  <Video t={timeline} scenes={[[Why, 0], [Count, B('app').start], [Ufp, B('rank').start], [Afp, B('vaf').start]]}>
    {BEAT.map(b => <Sfx key={b} at={at(b, 0.75)} name="pop" volume={0.25} />)}
    {[0, 1, 2, 3, 4].map(i => <Sfx key={`u${i}`} at={at('ufp', 0.08 + i * 0.16) + 14} name="tick" volume={0.3} />)}
    <Sfx at={at('ufp', 0.72) + 26} name="ping" volume={0.2} />
    <Sfx at={at('afp', 0.8)} name="ping" volume={0.22} />
  </Video>;
