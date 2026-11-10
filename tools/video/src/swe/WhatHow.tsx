// SWE307 ch1: analysis (what) vs design (how), the four P's, success, defects, verification vs validation.
import React from 'react';
import { Boxes, CalendarDays, ClipboardCheck, Clock, Database, FileCode, Hospital, ListChecks, Monitor, PencilRuler, Plug, Search, TestTube, UserCheck, Users, Wallet, Workflow, Bug } from 'lucide-react';
import { Sfx } from '../kit';
import { C, Card, IconDot, Label, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, Badge, Arrow, HL, SERIF, Person, PURPLE } from './kit';
import timeline from '../timelines/swe-whathow.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ A: what? how?
const Questions: React.FC<{ f: number }> = ({ f }) => {
  const fillW = p(f, at('what', 0.05), at('what', 0.2)), fillH = p(f, at('how', 0.05), at('how', 0.2));
  const card = (x: number, title: string, q: string, I: React.FC<any>, col: string, k: number) => (
    <g transform={`translate(${x},300)`}>
      <Card x={0} y={0} w={640} h={600} stroke={k > 0 ? col : '#cfc6b3'} dash={k > 0 ? undefined : '14 12'} fill={k > 0 ? '#fbf9f4' : 'rgba(251,249,244,.6)'} />
      <T x={320} y={150} s={110} w={800} c={col} o={1 - k}>{q}</T>
      <g opacity={k}>
        <g transform="translate(110,110)"><IconDot I={I} r={58} bg={col} /></g>
        <T x={200} y={128} s={60} a="start" w={800} c={col}>{title}</T>
      </g>
    </g>
  );
  const facts = [['facts', 0.3], ['problems', 0.45], ['parts', 0.62]] as const;
  const design: [React.FC<any>, string, number][] = [[Boxes, 'modules', 0.35], [Monitor, 'screens', 0.48], [Database, 'databases', 0.6], [Plug, 'interfaces', 0.72]];
  const ord = p(f, at('order', 0.1), at('order', 0.5));
  return <g>
    <Pop f={f} a={at('intro', 0.05)} x={960} y={150}>
      <IconDot I={Hospital} r={50} bg={C.teal} />
      <g transform="translate(150,0)"><IconDot I={CalendarDays} r={40} bg="#fff" fg={C.teal} ring={C.teal} /></g>
    </Pop>
    <Rise f={f} a={at('intro', 0.3)}><T x={960} y={250} s={34} c={C.muted} w={600}>new appointment system</T></Rise>
    <g opacity={p(f, at('intro', 0.55), at('intro', 0.75))}>
      {card(250, 'Analysis', 'WHAT?', Search, C.blue, fillW)}
      {card(1030, 'Design', 'HOW?', PencilRuler, PURPLE, fillH)}
    </g>
    {facts.map(([w, fr], i) => <Pop key={w} f={f} a={at('what', fr)} x={570} y={480 + i * 110}><Pill text={w} bg="#e6ecfb" fg={C.blue} s={38} w={300} /></Pop>)}
    {/* decomposition: one box splits into three */}
    <g transform="translate(380,810)" opacity={p(f, at('what', 0.62), at('what', 0.7))}>
      {[0, 1, 2].map(i => { const s = p(f, at('what', 0.68), at('what', 0.85)); return <rect key={i} x={lerp(-40, -150 + i * 110, s)} y={-30} width={lerp(80, 80, s)} height={60} rx={10} fill={C.blue} opacity={i === 1 ? 1 : s} />; })}
    </g>
    {design.map(([I, w, fr], i) => <Pop key={w} f={f} a={at('how', fr)} x={1190 + (i % 2) * 320} y={520 + Math.floor(i / 2) * 200}>
      <IconDot I={I} r={52} bg="#efe6f5" fg={PURPLE} /><T x={0} y={100} s={34} w={600}>{w}</T>
    </Pop>)}
    <g opacity={ord}>
      <circle cx={960} cy={600} r={58} fill={HL} />
      <Arrow x1={905} y1={600} x2={1015} y2={600} t={ord} sw={8} c={C.ink} />
      <g transform="translate(260,300)"><circle r={36} fill={C.blue} /><T x={0} y={14} s={40} c="#fff" w={800}>1</T></g>
      <g transform="translate(1040,300)"><circle r={36} fill={PURPLE} /><T x={0} y={14} s={40} c="#fff" w={800}>2</T></g>
    </g>
  </g>;
};

// ------------------------------------------------ B: four P's
const FourP: React.FC<{ f: number }> = ({ f }) => {
  const a = B('fourp').start, d = B('fourp').dur;
  const items: [React.FC<any>, string, string, number, string][] = [
    [Users, 'People', 'stakeholders', 0.12, C.teal], [FileCode, 'Product', 'software + documents', 0.3, C.blue],
    [ListChecks, 'Project', 'activities', 0.55, C.amber], [Workflow, 'Process', 'framework, order', 0.75, PURPLE],
  ];
  return <g>
    <Label f={f} a={a}>the four P's</Label>
    {items.map(([I, h, s, fr, col], i) => {
      const k = a + d * fr;
      return <Pop key={h} f={f} a={k} x={300 + i * 440} y={540}>
        <Card x={-190} y={-250} w={380} h={500} stroke={col} />
        <IconDot I={I} r={70} bg={col} />
        <T x={0} y={-140} s={130} w={800} c={col} o={0.18} f={SERIF}>P</T>
        <T x={0} y={150} s={54} w={800} c={col}>{h}</T>
        <T x={0} y={205} s={30} w={500} c={C.muted}>{s}</T>
      </Pop>;
    })}
    {/* people: the stakeholders under the first card */}
    <g opacity={p(f, a + d * 0.14, a + d * 0.22)}>
      {[0, 1, 2].map(i => <g key={i} transform={`translate(${200 + i * 100},${1010})`}><Person v={i} s={0.24} /></g>)}
    </g>
  </g>;
};

// ------------------------------------------------ C: success = needs, time, budget
const Success: React.FC<{ f: number }> = ({ f }) => {
  const a = B('success').start, d = B('success').dur;
  const items: [React.FC<any>, string, number][] = [[UserCheck, 'meets user needs', 0.32], [Clock, 'on time', 0.55], [Wallet, 'within budget', 0.75]];
  return <g>
    <Label f={f} a={a}>a successful project</Label>
    {items.map(([I, w, fr], i) => {
      const k = a + d * fr, fill = p(f, k, k + 30);
      return <g key={w} transform={`translate(${380 + i * 580},520)`} opacity={p(f, a + 6 + i * 6, a + 18 + i * 6)}>
        <circle r={150} fill="none" stroke="#e2dccd" strokeWidth={22} />
        <circle r={150} fill="none" stroke={C.green} strokeWidth={22} strokeDasharray={`${fill * 942} 942`} transform="rotate(-90)" strokeLinecap="round" />
        <IconDot I={I} r={74} bg={fill > 0.99 ? C.green : '#cfc6b3'} />
        <T x={0} y={240} s={44} w={700}>{w}</T>
        <g transform="translate(110,-110)" opacity={p(f, k + 26, k + 32)}><g transform={`scale(${pop(f, k + 26)})`}><Badge ok r={34} /></g></g>
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ D: defects, and the cost of finding them late
const PHASES = ['analysis', 'design', 'code', 'test', 'release'];
const Defect: React.FC<{ f: number }> = ({ f }) => {
  const df = B('defect'), co = B('cost');
  const dev = p(f, df.start + df.dur * 0.55, df.start + df.dur * 0.8);
  const move = p(f, co.start + 10, co.start + co.dur * 0.85);
  const bx = lerp(330, 1610, move);
  return <g>
    <Label f={f} a={df.start}>quality = meeting the requirements</Label>
    {/* requirement line vs product line, the gap is the defect */}
    <g transform="translate(0,-40)" opacity={1 - p(f, co.start - 4, co.start + 14)}>
      <T x={300} y={330} s={34} a="start" c={C.blue} w={700}>requirements</T>
      <line x1={300} y1={360} x2={1620} y2={360} stroke={C.blue} strokeWidth={10} strokeLinecap="round" />
      <T x={300} y={540} s={34} a="start" c={C.ink} w={700}>product</T>
      <path d={`M300,460 L900,460 Q1000,${460 + 0 * dev} 1050,${460 + 80 * dev} L1250,${460 + 80 * dev} Q1300,${460} 1400,460 L1620,460`} stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
      <g opacity={dev}>
        <Arrow x1={1150} y1={372} x2={1150} y2={448 + 80 * dev} c={C.red} sw={5} head="open" hs={16} />
        <g transform={`translate(1150,${620}) scale(${pop(f, df.start + df.dur * 0.6)})`}><IconDot I={Bug} r={56} bg={C.red} /></g>
        <T x={1150} y={730} s={36} c={C.red} w={800}>defect = deviation</T>
      </g>
    </g>
    {/* cost rises the later the defect is found */}
    <g opacity={p(f, co.start, co.start + 14)}>
      {PHASES.map((ph, i) => {
        const x = 330 + i * 320, h = [40, 90, 170, 300, 480][i], g = p(f, co.start + 10 + i * (co.dur * 0.17), co.start + 30 + i * (co.dur * 0.17));
        return <g key={ph}>
          <rect x={x - 70} y={880 - h * g} width={140} height={h * g} rx={10} fill={i < 2 ? C.green : i < 3 ? C.amber : C.red} opacity={0.85} />
          <T x={x} y={940} s={34} w={600} c={C.muted}>{ph}</T>
        </g>;
      })}
      <line x1={200} y1={880} x2={1760} y2={880} stroke={C.ink} strokeWidth={4} />
      <T x={200} y={320} s={34} a="start" w={700} c={C.muted}>cost to repair</T>
      <g transform={`translate(${bx},300)`}><IconDot I={Bug} r={44} bg={C.red} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ E: verification vs validation
const VV: React.FC<{ f: number }> = ({ f }) => {
  const v = B('verif'), va = B('valid'), fi = B('first');
  const half = (x: number, a: number, d: number, h: string, q1: string, q2: string, col: string, I: React.FC<any>, act: string) =>
    <g opacity={p(f, a, a + 12)}>
      <Card x={x} y={170} w={760} h={760} stroke={col} />
      <T x={x + 380} y={270} s={64} w={800} c={col}>{h}</T>
      <Rise f={f} a={a + d * 0.15}><T x={x + 380} y={370} s={44} w={500} f={SERIF}>{q1}</T><T x={x + 380} y={430} s={44} w={800} f={SERIF} c={col}>{q2}</T></Rise>
      <Pop f={f} a={a + d * 0.6} x={x + 380} y={640}><IconDot I={I} r={80} bg={col} /></Pop>
      <Rise f={f} a={a + d * 0.75}><T x={x + 380} y={800} s={36} w={600} c={C.muted}>{act}</T></Rise>
    </g>;
  const fo = p(f, fi.start, fi.start + 14);
  return <g>
    {half(160, v.start, v.dur, 'Verification', 'are we building', 'the product right?', C.blue, ClipboardCheck, 'inspections, reviews')}
    {half(1000, va.start, va.dur, 'Validation', 'are we building', 'the right product?', C.green, TestTube, 'testing')}
    <g opacity={fo}>
      <g transform={`translate(540,105) scale(${pop(f, fi.start)})`}><circle r={46} fill={HL} /><T x={0} y={18} s={52} w={800}>1</T></g>
      <g transform={`translate(1380,105) scale(${pop(f, fi.start + 12)})`}><circle r={46} fill={HL} /><T x={0} y={18} s={52} w={800}>2</T></g>
      <Arrow x1={620} y1={105} x2={1300} y2={105} t={p(f, fi.start + 4, fi.start + 22)} sw={8} />
    </g>
  </g>;
};

export const SweWhatHow: React.FC = () =>
  <Video t={timeline} scenes={[[Questions, 0], [FourP, B('fourp').start], [Success, B('success').start], [Defect, B('defect').start], [VV, B('verif').start]]}>
    <Sfx at={at('intro', 0.55)} name="whoosh" volume={0.25} />
    <Sfx at={at('what', 0.05)} name="pop" />
    <Sfx at={at('how', 0.05)} name="pop" />
    {[0.12, 0.3, 0.55, 0.75].map(k => <Sfx key={k} at={at('fourp', k)} name="pop" volume={0.22} />)}
    {[0.32, 0.55, 0.75].map(k => <Sfx key={k} at={at('success', k) + 28} name="ping" volume={0.16} />)}
    <Sfx at={at('defect', 0.6)} name="beep" volume={0.22} />
    <Sfx at={at('first', 0) + 4} name="whoosh" volume={0.25} />
  </Video>;
