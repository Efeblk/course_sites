// SWE307 ch2: the seven SDLC phases as a relay, the documents they hand on, and the testing levels.
import React from 'react';
import { ClipboardList, Code, Layers, PencilRuler, Rocket, Search, TestTube, Wrench, Puzzle, RefreshCw, Monitor, Users, Stamp, Box } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, Doc, IconDot, Label, PURPLE, Person, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL } from './kit';
import timeline from '../timelines/swe-sdlc.json';

const { B, at } = tl(timeline);
const ST: [React.FC<any>, string, string | null, string][] = [
  [ClipboardList, 'Planning', 'SPMP', C.teal], [Search, 'Analysis', 'SRS', C.blue], [PencilRuler, 'Design', 'SDD', PURPLE],
  [Code, 'Development', 'code', C.ink], [TestTube, 'Testing', 'tested', C.amber], [Rocket, 'Deployment', 'live', C.green], [Wrench, 'Maintenance', null, C.red],
];
const X = (i: number) => 200 + i * 253, Y = 400;
const LIT = () => [at('plan'), at('analysis'), at('design'), at('dev'), at('unit'), at('deploy'), at('maint')];

const Track: React.FC<{ f: number }> = ({ f }) => {
  const lit = LIT();
  const intro = B('intro');
  // the baton travels to the most recently lit station
  let bi = -1; lit.forEach((a, i) => { if (f >= a) bi = i; });
  const prevA = bi >= 0 ? lit[bi] : 0;
  const bx = bi < 0 ? X(0) - 120 : lerp(bi === 0 ? X(0) - 120 : X(bi - 1), X(bi), p(f, prevA, prevA + 20));
  return <g>
    <line x1={X(0)} y1={Y} x2={lerp(X(0), X(6), p(f, intro.start + 10, intro.start + intro.dur * 0.6))} y2={Y} stroke="#d9d1c1" strokeWidth={12} strokeLinecap="round" />
    {ST.map(([I, name, doc, col], i) => {
      const on = p(f, lit[i], lit[i] + 10), appear = intro.start + intro.dur * (0.1 + i * 0.07);
      return <g key={name}>
        <Pop f={f} a={appear} x={X(i)} y={Y}>
          <circle r={74} fill={on > 0 ? '#fbf9f4' : 'transparent'} stroke={on > 0 ? col : 'transparent'} strokeWidth={6} />
          <IconDot I={I} r={58} bg={on > 0 ? col : '#cfc6b3'} />
          <T x={0} y={-100} s={30} w={700} c={on > 0 ? col : C.muted}>{name}</T>
          <T x={0} y={150} s={26} w={800} c="#cfc6b3">{i + 1}</T>
        </Pop>
        {doc && <Pop f={f} a={lit[i] + 22} x={X(i)} y={Y + 270}><Doc label={doc} col={col} w={170} h={200} s={doc.length > 4 ? 28 : 36} /></Pop>}
        {doc && i < 3 && <Arrow x1={X(i)} y1={Y + 90} x2={X(i)} y2={Y + 160} t={p(f, lit[i] + 14, lit[i] + 26)} c={col} sw={5} hs={14} />}
      </g>;
    })}
    {/* maintenance loops back over everything */}
    <path d={`M${X(6)},${Y - 130} C ${X(6)},${Y - 300} ${X(0)},${Y - 300} ${X(0)},${Y - 130}`} fill="none" stroke={C.red} strokeWidth={6} strokeDasharray="14 12"
      strokeDashoffset={-f * 1.2} opacity={p(f, at('maint', 0.3), at('maint', 0.45))} />
    {bi >= 0 && <g transform={`translate(${bx},${Y - 4})`}><circle r={18} fill={HL} stroke={C.ink} strokeWidth={4} /></g>}
  </g>;
};

// ------------------------------------------------ testing levels
const Testing: React.FC<{ f: number }> = ({ f }) => {
  const u = B('unit'), r = B('regress'), us = B('users');
  const lv: [string, React.FC<any>, number][] = [
    ['unit', Box, u.start + u.dur * 0.35], ['integration', Puzzle, u.start + u.dur * 0.7],
    ['regression', RefreshCw, r.start + r.dur * 0.05], ['system', Monitor, r.start + r.dur * 0.55],
    ['beta', Users, us.start + us.dur * 0.15], ['acceptance', Stamp, us.start + us.dur * 0.5],
  ];
  return <g>
    <Label f={f} a={u.start} c={C.amber}>testing, level by level</Label>
    {lv.map(([name, I, a], i) => {
      const y = 860 - i * 112, wdt = 520 + i * 70;
      return <Rise key={name} f={f} a={a}>
        <rect x={960 - wdt / 2 - 460} y={y - 46} width={wdt} height={92} rx={18} fill={i < 4 ? '#fbeed2' : '#e3f0e5'} stroke={i < 4 ? C.amber : C.green} strokeWidth={4} />
        <g transform={`translate(${960 - wdt / 2 - 410},${y})`}><IconDot I={I} r={32} bg={i < 4 ? C.amber : C.green} /></g>
        <T x={960 - wdt / 2 - 360} y={y + 13} s={38} a="start" w={800}>{name}</T>
      </Rise>;
    })}
    {/* the right-hand picture changes with each level */}
    <g transform="translate(1440,560)">
      {/* unit: one block checked */}
      <g opacity={p(f, lv[0][2], lv[0][2] + 8) * (1 - p(f, lv[1][2] - 6, lv[1][2] + 4))}>
        <rect x={-70} y={-70} width={140} height={140} rx={16} fill={C.blue} /><g transform="translate(70,-70)"><Badge ok /></g>
      </g>
      {/* integration: blocks snap together */}
      <g opacity={p(f, lv[1][2], lv[1][2] + 8) * (1 - p(f, lv[2][2] - 6, lv[2][2] + 4))}>
        {[0, 1, 2].map(i => <rect key={i} x={-230 + i * lerp(180, 150, p(f, lv[1][2] + 6, lv[1][2] + 24))} y={-60} width={140} height={120} rx={16} fill={[C.blue, C.teal, PURPLE][i]} />)}
        <g transform="translate(200,-80)" opacity={p(f, lv[1][2] + 24, lv[1][2] + 30)}><Badge ok /></g>
      </g>
      {/* regression: a new block arrives; the old ones are re-checked */}
      <g opacity={p(f, lv[2][2], lv[2][2] + 8) * (1 - p(f, lv[3][2] - 6, lv[3][2] + 4))}>
        {[0, 1, 2].map(i => <rect key={i} x={-230 + i * 150} y={-60} width={140} height={120} rx={16} fill={[C.blue, C.teal, PURPLE][i]} />)}
        <rect x={220} y={lerp(-300, -60, p(f, lv[2][2] + 4, lv[2][2] + 20))} width={140} height={120} rx={16} fill={C.amber} />
        {[0, 1, 2].map(i => <g key={i} transform={`translate(${-160 + i * 150},-95)`} opacity={p(f, lv[2][2] + 30 + i * 10, lv[2][2] + 36 + i * 10)}><Badge ok r={22} /></g>)}
        <T x={60} y={130} s={30} c={C.muted}>new change, old features still work</T>
      </g>
      {/* system: the whole thing against the requirements */}
      <g opacity={p(f, lv[3][2], lv[3][2] + 8) * (1 - p(f, lv[4][2] - 6, lv[4][2] + 4))}>
        <rect x={-260} y={-150} width={520} height={300} rx={24} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
        {[0, 1, 2, 3].map(i => <rect key={i} x={-220 + i * 112} y={-50} width={96} height={100} rx={12} fill={[C.blue, C.teal, PURPLE, C.amber][i]} />)}
        <g transform="translate(260,-150)" opacity={p(f, lv[3][2] + 20, lv[3][2] + 26)}><Badge ok r={34} /></g>
        <T x={0} y={200} s={30} c={C.muted}>vs. user requirements</T>
      </g>
      {/* beta: users; acceptance: owner stamps */}
      <g opacity={p(f, lv[4][2], lv[4][2] + 8)}>
        {[0, 1, 2].map(i => <g key={i} transform={`translate(${-170 + i * 120},230)`}><Person v={i + 1} s={0.3} /></g>)}
        <T x={-50} y={290} s={30} c={C.green} w={700}>users: real world</T>
      </g>
      <g opacity={p(f, lv[5][2], lv[5][2] + 8)} transform="translate(250,-120)">
        <g transform={`rotate(${-12 * pop(f, lv[5][2] + 10)})`}><rect x={-120} y={-50} width={240} height={100} rx={12} fill="none" stroke={C.red} strokeWidth={8} /><T x={0} y={14} s={38} w={900} c={C.red}>ACCEPTED</T></g>
        <T x={0} y={110} s={28} c={C.muted}>by the project owner</T>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ deployment + maintenance: back to the track
const Later: React.FC<{ f: number }> = ({ f }) => {
  const d = B('deploy');
  return <g>
    <Track f={f} />
    {['delivered system', 'release description', 'trained users'].map((w, i) =>
      <Pop key={w} f={f} a={d.start + d.dur * (0.42 + i * 0.15)} x={X(5) - 40} y={900 + i * 0}>
        <g transform={`translate(${(i - 1) * 330 - 560},0)`}><Pill text={w} bg="#e3f0e5" fg={C.green} s={30} /></g>
      </Pop>)}
    {['defects', 'enhancements', 'performance'].map((w, i) =>
      <Pop key={w} f={f} a={at('maint', 0.4 + i * 0.15)} x={X(3) + (i - 1) * 300} y={215}><Pill text={w} bg="#f6e4e0" fg={C.red} s={30} /></Pop>)}
  </g>;
};

// ------------------------------------------------ recap: three documents
const Recap: React.FC<{ f: number }> = ({ f }) => {
  const r = B('recap');
  const docs: [string, string, string, string][] = [['SPMP', 'Planning', 'Software Project Management Plan', C.teal], ['SRS', 'Analysis', 'Software Requirements Specification', C.blue], ['SDD', 'Design', 'Software Design Document', PURPLE]];
  return <g>
    <Label f={f} a={r.start}>the three documents</Label>
    {docs.map(([d, ph, full, col], i) => {
      const a = r.start + r.dur * (0.2 + i * 0.25);
      return <g key={d}>
        <Pop f={f} a={a} x={380 + i * 580} y={470}><Doc label={d} col={col} w={260} h={330} s={42} /></Pop>
        <Rise f={f} a={a + 6}><T x={380 + i * 580} y={730} s={44} w={800} c={col}>from {ph}</T><T x={380 + i * 580} y={790} s={26} w={500} c={C.muted}>{full}</T></Rise>
      </g>;
    })}
  </g>;
};

const Relay: React.FC<{ f: number }> = ({ f }) => <g><Label f={f} a={B('intro').start + 10}>the software development life cycle</Label><Track f={f} /></g>;

export const SweSdlc: React.FC = () =>
  <Video t={timeline} scenes={[[Relay, 0], [Testing, B('unit').start], [Later, B('deploy').start], [Recap, B('recap').start]]}>
    {LIT().map((a, i) => <Sfx key={i} at={a} name="whoosh" volume={0.2} />)}
    {[0, 1, 2, 3].map(i => <Sfx key={`d${i}`} at={LIT()[i] + 22} name="pop" volume={0.25} />)}
    <Sfx at={at('users', 0.5) + 10} name="beep" volume={0.25} />
    {[0.2, 0.45, 0.7].map(k => <Sfx key={k} at={at('recap', k)} name="pop" volume={0.25} />)}
  </Video>;
