// SWE307 ch6: actors (primary/supporting), use cases (verb phrases), the diagram, include / extend / generalization, the fully dressed scenario.
// Diagram examples follow the slides: Student-Borrow Books (include), Deposit Funds-Calculate Bonus (extend), Search (generalization).
import React from 'react';
import { Building2, Clock, Cpu, Server, User, CreditCard } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, C, Card, IconDot, Label, PURPLE, Oval, Pill, Pop, Rise, StickActor, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-usecase.json';

const { B, at } = tl(timeline);
const UC = '#d8ecf7';

// ------------------------------------------------ A: actors and use cases
const Parts: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), a = B('actor'), u = B('uc'), pr = B('primary');
  const kinds: [React.FC<any>, string][] = [[User, 'person'], [Building2, 'organization'], [Server, 'another system'], [Cpu, 'device'], [Clock, 'time']];
  const o1 = 1 - p(f, pr.start - 6, pr.start + 8);
  return <g>
    <g opacity={o1}>
      <Rise f={f} a={w.start}><T x={960} y={140} s={52} w={500} f={SERIF}>the system, from the user's point of view</T></Rise>
      {/* system box */}
      <rect x={760} y={260} width={600} height={620} rx={26} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} opacity={p(f, w.start + 10, w.start + 24)} />
      <T x={1060} y={310} s={32} w={700} c={C.muted} o={p(f, w.start + 10, w.start + 24)}>system</T>
      {/* actor kinds, outside */}
      <Pop f={f} a={a.start + 4} x={580} y={540}><StickActor name="actor" c={C.blue} /></Pop>
      {kinds.map(([I, k], i) => { const t = a.start + a.dur * (0.32 + i * 0.08); return <Pop key={k} f={f} a={t} x={140} y={300 + i * 125}><IconDot I={I} r={38} bg={C.blue} /><T x={60} y={12} s={30} w={600} a="start">{k}</T></Pop>; })}
      <Pop f={f} a={a.start + a.dur * 0.85} x={580} y={800}><Pill text="name: a noun" bg={C.blue} s={32} /></Pop>
      {/* use cases, inside */}
      {['log in to system', 'create order', 'display weekly schedule'].map((t, i) => <Pop key={t} f={f} a={u.start + u.dur * (0.2 + i * 0.2)} x={1060} y={430 + i * 150}><Oval text={t} w={480} fill={UC} s={32} /></Pop>)}
      <Pop f={f} a={u.start + u.dur * 0.7} x={1640} y={580}><Pill text="name: a verb phrase" bg={C.teal} s={32} /></Pop>
    </g>
    {/* primary vs supporting */}
    <g opacity={1 - o1}>
      <Label f={f} a={pr.start}>primary and supporting actors</Label>
      <rect x={660} y={300} width={600} height={500} rx={26} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
      <T x={960} y={350} s={30} w={700} c={C.muted}>POS system</T>
      <Pop f={f} a={pr.start + 10} x={960} y={560}><Oval text="process sale" w={380} fill={UC} s={36} /></Pop>
      <Pop f={f} a={pr.start + pr.dur * 0.1} x={360} y={560}><StickActor name="cashier" c={C.blue} /></Pop>
      <line x1={420} y1={540} x2={lerp(420, 770, p(f, pr.start + pr.dur * 0.2, pr.start + pr.dur * 0.3))} y2={555} stroke={C.ink} strokeWidth={5} />
      <Pop f={f} a={pr.start + pr.dur * 0.25} x={360} y={300}><Pill text="primary: starts it" bg={C.blue} s={32} /></Pop>
      <Pop f={f} a={pr.start + pr.dur * 0.6} x={1560} y={560}><StickActor name="credit bureau" c={PURPLE} /></Pop>
      <line x1={1150} y1={555} x2={lerp(1150, 1500, p(f, pr.start + pr.dur * 0.65, pr.start + pr.dur * 0.75))} y2={540} stroke={C.ink} strokeWidth={5} />
      <Pop f={f} a={pr.start + pr.dur * 0.7} x={1560} y={300}><Pill text="supporting: helps" bg={PURPLE} s={32} /></Pop>
      <Pop f={f} a={pr.start + pr.dur * 0.8} x={1720} y={410}><IconDot I={CreditCard} r={34} bg="#fff" fg={PURPLE} ring={PURPLE} /></Pop>
    </g>
  </g>;
};

// ------------------------------------------------ B: the diagram + include (Student / Borrow Books)
const Include: React.FC<{ f: number }> = ({ f }) => {
  const d = B('diagram'), inc = B('include');
  const sym: [number, React.ReactNode, string][] = [
    [0.18, <StickActor key="a" s={0.8} />, 'actor'], [0.38, <Oval key="o" text="" w={200} h={80} fill={UC} />, 'use case'],
    [0.55, <rect key="r" x={-100} y={-70} width={200} height={140} rx={16} fill="none" stroke={C.ink} strokeWidth={5} />, 'system boundary'], [0.78, <line key="l" x1={-100} y1={0} x2={100} y2={0} stroke={C.ink} strokeWidth={6} />, 'association'],
  ];
  const so = 1 - p(f, inc.start - 6, inc.start + 8);
  const i1 = p(f, inc.start + inc.dur * 0.45, inc.start + inc.dur * 0.65), i2 = p(f, inc.start + inc.dur * 0.6, inc.start + inc.dur * 0.8);
  return <g>
    <g opacity={so}><Label f={f} a={d.start}>the use case diagram</Label></g>
    <g opacity={1 - so}><Label f={f} a={inc.start}>include: always called</Label></g>
    <g opacity={so}>
      {sym.map(([fr, el, name], i) => <Pop key={name} f={f} a={d.start + d.dur * fr} x={300 + i * 440} y={540}>{el}<T x={0} y={190} s={38} w={700}>{name}</T></Pop>)}
    </g>
    <g opacity={1 - so}>
      <rect x={560} y={220} width={1200} height={720} rx={26} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
      <T x={1160} y={270} s={30} w={700} c={C.muted}>library system</T>
      <g transform="translate(300,520)"><StickActor name="student" /></g>
      <line x1={360} y1={500} x2={720} y2={420} stroke={C.ink} strokeWidth={5} />
      <g transform="translate(860,420)"><Oval text="borrow books" w={320} h={110} fill={UC} /></g>
      <g transform="translate(860,800)" opacity={p(f, inc.start + inc.dur * 0.4, inc.start + inc.dur * 0.5)}><Oval text="check fine" w={300} h={100} fill={UC} /></g>
      <g transform="translate(1450,640)" opacity={p(f, inc.start + inc.dur * 0.55, inc.start + inc.dur * 0.65)}><Oval text="check reserved book" w={420} h={100} fill={UC} /></g>
      <Arrow x1={860} y1={478} x2={860} y2={748} t={i1} dash="12 10" sw={5} c={C.blue} />
      <g opacity={i1}><rect x={880} y={590} width={200} height={46} rx={10} fill={C.paper} /><T x={980} y={624} s={30} w={700} c={C.blue}>«include»</T></g>
      <Arrow x1={1010} y1={450} x2={1300} y2={600} t={i2} dash="12 10" sw={5} c={C.blue} />
      <g opacity={i2}><rect x={1120} y={470} width={200} height={46} rx={10} fill={C.paper} /><T x={1220} y={504} s={30} w={700} c={C.blue}>«include»</T></g>
      <Rise f={f} a={inc.start + inc.dur * 0.75}><T x={1160} y={1010} s={34} w={700} c={C.blue}>dotted arrow: from the base to the included use case</T></Rise>
    </g>
  </g>;
};

// ------------------------------------------------ C: extend (Deposit Funds / Calculate Bonus)
const Extend: React.FC<{ f: number }> = ({ f }) => {
  const e = B('extend');
  const ar = p(f, e.start + e.dur * 0.3, e.start + e.dur * 0.45);
  const cond = p(f, e.start + e.dur * 0.55, e.start + e.dur * 0.65);
  const own = p(f, e.start + e.dur * 0.8, e.start + e.dur * 0.9);
  return <g>
    <Label f={f} a={e.start}>extend: optional, only under a condition</Label>
    <rect x={500} y={220} width={1100} height={700} rx={26} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
    <T x={1050} y={270} s={30} w={700} c={C.muted}>bank system</T>
    <g transform="translate(270,560)"><StickActor name="customer" /></g>
    <line x1={330} y1={540} x2={690} y2={540} stroke={C.ink} strokeWidth={5} />
    <g transform="translate(820,540)"><Oval text="deposit funds" w={300} h={110} fill={UC} stroke={own > 0.5 ? C.green : C.ink} /></g>
    <g transform="translate(1370,540)" opacity={p(f, e.start + e.dur * 0.15, e.start + e.dur * 0.25)}><Oval text="calculate bonus" w={340} h={110} fill="#fbeed2" /></g>
    <Arrow x1={1196} y1={540} x2={975} y2={540} t={ar} dash="12 10" sw={5} c={C.amber} />
    <g opacity={ar}><rect x={985} y={470} width={200} height={46} rx={10} fill="#fbf9f4" /><T x={1085} y={504} s={30} w={700} c={C.amber}>«extend»</T></g>
    <g opacity={cond}>
      <line x1={1085} y1={545} x2={1085} y2={700} stroke={C.amber} strokeWidth={3} strokeDasharray="8 8" />
      <rect x={900} y={700} width={370} height={110} rx={12} fill="#fff" stroke={C.amber} strokeWidth={4} strokeDasharray="10 8" />
      <T x={1085} y={746} s={30} w={700}>amount over 10,000</T><T x={1085} y={788} s={30} w={700}>or age over 55</T>
    </g>
    <g opacity={own}><g transform="translate(820,400)"><Pill text="meaningful on its own" bg={C.green} s={30} /></g></g>
  </g>;
};

// ------------------------------------------------ D: generalization
const General: React.FC<{ f: number }> = ({ f }) => {
  const g = B('general');
  const t1 = p(f, g.start + g.dur * 0.35, g.start + g.dur * 0.55), t2 = p(f, g.start + g.dur * 0.6, g.start + g.dur * 0.8);
  return <g>
    <Label f={f} a={g.start}>generalization: hollow triangle points to the parent</Label>
    <Pop f={f} a={g.start + 8} x={600} y={330}><Oval text="search" w={280} h={100} fill={UC} /></Pop>
    <Pop f={f} a={g.start + g.dur * 0.2} x={360} y={760}><Oval text="search by call number" w={420} h={100} fill={UC} /></Pop>
    <Pop f={f} a={g.start + g.dur * 0.25} x={840} y={760}><Oval text="search by author" w={360} h={100} fill={UC} /></Pop>
    <Arrow x1={360} y1={708} x2={560} y2={382} t={t1} head="tri" sw={5} hs={30} />
    <Arrow x1={840} y1={708} x2={640} y2={382} t={t1} head="tri" sw={5} hs={30} />
    <g opacity={p(f, g.start + g.dur * 0.55, g.start + g.dur * 0.65)}>
      <g transform="translate(1450,420)"><StickActor name="customer" /></g>
      <g transform="translate(1450,900)"><StickActor name="NRFC customer" /></g>
      <Arrow x1={1450} y1={790} x2={1450} y2={610} t={t2} head="tri" sw={5} hs={30} />
    </g>
    <T x={600} y={250} s={30} w={700} c={C.muted} o={t1}>parent</T>
    <T x={600} y={880} s={30} w={700} c={C.muted} o={t1}>children</T>
  </g>;
};

// ------------------------------------------------ E: fully dressed scenario
const ROWS = ['use case name', 'description', 'primary actor(s)', 'supporting actor(s)', 'triggers', 'preconditions', 'postconditions', 'normal flow', 'alternate flows', 'business rules'];
const Scenario: React.FC<{ f: number }> = ({ f }) => {
  const s = B('scenario');
  return <g>
    <Label f={f} a={s.start}>the fully dressed use case (scenario template)</Label>
    <Card x={420} y={150} w={1080} h={880} />
    {ROWS.map((r, i) => { const a = s.start + s.dur * (0.2 + i * 0.065); return <Rise key={r} f={f} a={a} dy={14}>
      <g transform={`translate(460,${210 + i * 80})`}>
        <rect x={0} y={0} width={380} height={64} rx={10} fill={['triggers', 'preconditions', 'postconditions', 'normal flow', 'alternate flows'].includes(r) ? HL : '#ece6d8'} />
        <T x={20} y={42} s={30} w={700} a="start">{r}</T>
        {[0, 1].map(k => <rect key={k} x={410} y={18 + k * 24} width={560 - k * 160 - (i * 37) % 120} height={10} rx={5} fill="#e2dccd" />)}
      </g>
    </Rise>; })}
    <Rise f={f} a={s.start + s.dur * 0.15}><T x={960} y={1065} s={30} w={600} c={C.muted}>example on the slides: place order</T></Rise>
  </g>;
};

export const SweUseCase: React.FC = () =>
  <Video t={timeline} scenes={[[Parts, 0], [Include, B('diagram').start], [Extend, B('extend').start], [General, B('general').start], [Scenario, B('scenario').start]]}>
    {[0.32, 0.4, 0.48, 0.56, 0.64].map(k => <Sfx key={k} at={at('actor', k)} name="pop" volume={0.15} />)}
    {[0.45, 0.6].map(k => <Sfx key={`i${k}`} at={at('include', k)} name="whoosh" volume={0.2} />)}
    <Sfx at={at('extend', 0.3)} name="whoosh" volume={0.2} />
    <Sfx at={at('extend', 0.55)} name="pop" volume={0.2} />
    <Sfx at={at('general', 0.35)} name="whoosh" volume={0.2} />
  </Video>;
