// SWE307 ch5: requirement levels, functional vs nonfunctional, sorting the slides' NFR examples, SRS.
import React from 'react';
import { Cog, Gauge, Target, Users, Package } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, C, Card, Doc, IconDot, Label, PURPLE, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-requirements.json';

const { B, at } = tl(timeline);
const FRX = 440, NFX = 1340, BY = 650;
const NFR: [string, string, string, number][] = [
  ['s1', '≤ 2 level-one faults per month', 'reliability', 0],
  ['s2', 'available 98% of business hours', 'availability', 0],
  ['s3', '≤ 6 s response, 5,000 users an hour', 'performance', 0],
  ['s4', 'password ≥ 8 chars, 1 upper case, 1 digit', 'security', 0],
  ['s5', 'runs on Windows and Linux', 'portability', 0],
  ['s6', 'implemented in Java', 'constraint', 0.05],
  ['s6', 'talks to a bar code reader', 'external interface', 0.38],
  ['s6', 'lock login after 3 failed attempts', 'error handling', 0.68],
];
const slot = (i: number): [number, number] => [NFX - 205 + (i % 2) * 410, BY + 110 + Math.floor(i / 2) * 66];

const Bins: React.FC<{ f: number }> = ({ f }) => {
  const fr = B('fr'), nf = B('nfr');
  const o = p(f, at('levels', 0.75), at('levels', 0.9));
  const hiF = p(f, fr.start, fr.start + 10) * (1 - p(f, nf.start, nf.start + 10)), hiN = p(f, nf.start, nf.start + 10);
  return <g opacity={o}>
    <Card x={FRX - 400} y={BY - 70} w={800} h={430} stroke={C.blue} sw={hiF > 0.5 ? 6 : 3} />
    <g transform={`translate(${FRX - 330},${BY})`}><IconDot I={Cog} r={40} bg={C.blue} /></g>
    <T x={FRX - 270} y={BY + 14} s={44} w={800} a="start" c={C.blue}>Functional</T>
    <T x={FRX - 270} y={BY + 52} s={26} a="start" c={C.muted}>what the system does</T>
    <Card x={NFX - 440} y={BY - 70} w={880} h={430} stroke={C.amber} sw={hiN > 0.5 ? 6 : 3} />
    <g transform={`translate(${NFX - 370},${BY})`}><IconDot I={Gauge} r={40} bg={C.amber} /></g>
    <T x={NFX - 310} y={BY + 14} s={44} w={800} a="start" c={C.amber}>Nonfunctional</T>
    <T x={NFX - 310} y={BY + 52} s={26} a="start" c={C.muted}>how well, within which limits</T>
    {['display weekly schedule', 'send a welcome email'].map((t, i) =>
      <Pop key={t} f={f} a={fr.start + fr.dur * (0.4 + i * 0.3)} x={FRX} y={BY + 150 + i * 90}><Pill text={t} bg="#e6ecfb" fg={C.blue} s={32} w={560} /></Pop>)}
  </g>;
};

const Sort: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), lv = B('levels');
  const lvO = 1 - p(f, at('levels', 0.75), at('levels', 0.88));
  return <g>
    {/* definition */}
    <g opacity={1 - p(f, lv.start - 4, lv.start + 8)}>
      <Pop f={f} a={w.start + 6} x={960} y={420}><IconDot I={Target} r={90} bg={C.blue} /></Pop>
      <Rise f={f} a={w.start + w.dur * 0.3}><T x={960} y={640} s={56} w={500} f={SERIF}>something the system must do,</T></Rise>
      <Rise f={f} a={w.start + w.dur * 0.6}><T x={960} y={720} s={56} w={500} f={SERIF}>or a property it must have</T></Rise>
    </g>
    {/* three levels */}
    <g opacity={p(f, lv.start, lv.start + 10) * lvO}>
      {([[Target, 'Business', 'high-level goals', C.teal, 0.05], [Users, 'Stakeholder', 'what end users expect', PURPLE, 0.3], [Package, 'Solution', 'the product: two kinds', C.blue, 0.55]] as [React.FC<any>, string, string, string, number][]).map(([I, n, d, col, fr], i) =>
        <Pop key={n} f={f} a={lv.start + lv.dur * fr} x={960} y={330 + i * 200}>
          <rect x={-300 - i * 120} y={-80} width={600 + i * 240} height={160} rx={24} fill="#fbf9f4" stroke={col} strokeWidth={5} />
          <g transform={`translate(${-230 - i * 120},0)`}><IconDot I={I} r={46} bg={col} /></g>
          <T x={-150 - i * 120} y={-4} s={48} w={800} a="start" c={col}>{n}</T>
          <T x={-150 - i * 120} y={40} s={28} a="start" c={C.muted}>{d}</T>
        </Pop>)}
    </g>
    <Bins f={f} />
    {/* NFR cards: appear at the top, then drop into the bin as a tag */}
    {NFR.map(([b, txt, tag, fr0], i) => {
      const a = at(b, fr0 + 0.02), dA = at(b, fr0 + (b === 's6' ? 0.2 : 0.55)), drop = p(f, dA, dA + 18);
      const next = i + 1 < NFR.length ? at(NFR[i + 1][0], NFR[i + 1][3] + 0.02) : B('test').start;
      const [sx, sy] = slot(i);
      const vis = p(f, a, a + 8);
      if (vis <= 0) return null;
      const cardO = vis * (1 - p(f, next - 8, next));
      return <g key={i}>
        {cardO > 0 && <g transform={`translate(960,${300 + (1 - vis) * 20})`} opacity={cardO}>
          <rect x={-560} y={-70} width={1120} height={140} rx={24} fill="#fff" stroke={drop > 0.5 ? C.amber : C.ink} strokeWidth={4} />
          <T x={0} y={18} s={50} w={600} f={SERIF}>{txt}</T>
        </g>}
        {drop > 0 && <g transform={`translate(${lerp(960, sx, drop)},${lerp(390, sy, drop)}) scale(${lerp(1.3, 1, drop)})`}><Pill text={tag} bg={i < 5 ? '#fbeed2' : '#f3e6d9'} fg={i < 5 ? '#a26a10' : '#8a5a2a'} s={30} w={380} /></g>}
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ the test + SRS
const Test: React.FC<{ f: number }> = ({ f }) => {
  const t = B('test'), s = B('srs');
  const so = p(f, s.start - 4, s.start + 10);
  return <g>
    <g opacity={1 - so}>
      <Label f={f} a={t.start}>one question</Label>
      <Pop f={f} a={t.start + t.dur * 0.2} x={540} y={480}><Card x={-360} y={-170} w={720} h={340} stroke={C.blue} /><T x={0} y={-40} s={50} w={500} f={SERIF}>says what it does?</T><g transform="translate(0,70)"><Pill text="functional" bg={C.blue} s={44} /></g></Pop>
      <Pop f={f} a={t.start + t.dur * 0.55} x={1380} y={480}><Card x={-400} y={-170} w={800} h={340} stroke={C.amber} /><T x={0} y={-40} s={50} w={500} f={SERIF}>how well? which limits?</T><g transform="translate(0,70)"><Pill text="nonfunctional" bg={C.amber} s={44} /></g></Pop>
    </g>
    <g opacity={so}>
      {Array.from({ length: 10 }, (_, i) => { const k = p(f, s.start + 8 + i * 4, s.start + 30 + i * 4); return <g key={i} transform={`translate(${lerp(200 + (i % 5) * 380, 960, k)},${lerp(i < 5 ? 260 : 820, 540, k)}) scale(${1 - 0.8 * k})`} opacity={1 - k}><Pill text={i % 2 ? 'nonfunctional' : 'functional'} bg={i % 2 ? C.amber : C.blue} s={30} /></g>; })}
      <Pop f={f} a={s.start + s.dur * 0.35} x={960} y={540}><Doc label="SRS" col={C.blue} w={300} h={380} s={46} /></Pop>
      <Rise f={f} a={s.start + s.dur * 0.55}><T x={960} y={800} s={40} w={700} c={C.blue}>Software Requirements Specification</T></Rise>
    </g>
  </g>;
};

export const SweRequirements: React.FC = () =>
  <Video t={timeline} scenes={[[Sort, 0], [Test, B('test').start]]}>
    {NFR.map(([b, , , fr0], i) => <Sfx key={i} at={at(b, fr0 + (b === 's6' ? 0.2 : 0.55))} name="whoosh" volume={0.18} />)}
    {[0.4, 0.7].map(k => <Sfx key={k} at={at('fr', k)} name="pop" volume={0.2} />)}
    <Sfx at={at('srs', 0.35)} name="ping" volume={0.2} />
  </Video>;
