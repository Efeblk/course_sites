// SWE307 ch2-3: waterfall, iterative development, agile and its four values.
import React from 'react';
import { Bug, Lock, TriangleAlert, FileText, Zap } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Person, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-models.json';

const { B, at } = tl(timeline);
const PH = ['requirements', 'design', 'code', 'test', 'deploy'];
const PC = [C.blue, PURPLE, C.ink, C.amber, C.green];

// ------------------------------------------------ waterfall
const Waterfall: React.FC<{ f: number }> = ({ f }) => {
  const w = B('wf'), g = B('wfgood'), b = B('wfbad'), id = B('idle');
  const sx = (i: number) => 170 + i * 230, sy = (i: number) => 240 + i * 150;
  const stepA = (i: number) => w.start + w.dur * (0.15 + i * 0.15);
  // the water drop travels down the steps once
  const k = p(f, w.start + w.dur * 0.15, w.start + w.dur * 0.95) * 4;
  const di = Math.min(3, Math.floor(k)), u = k - di;
  const dx = lerp(sx(di) + 220, sx(di + 1) + 20, u), dy = lerp(sy(di) + 40, sy(di + 1) - 10, Math.pow(u, 1.6));
  const bugA = b.start + b.dur * 0.62;
  return <g>
    <Label f={f} a={w.start}>waterfall: one phase after another, once</Label>
    {PH.map((ph, i) => <Pop key={ph} f={f} a={stepA(i)} x={sx(i) + 120} y={sy(i) + 40}>
      <rect x={-150} y={-46} width={300} height={92} rx={16} fill={PC[i]} opacity={i === 3 && f > bugA ? 0.6 + 0.4 * Math.abs(Math.sin(f / 5)) : 1} />
      <T x={0} y={13} s={38} c="#fff" w={700}>{ph}</T>
    </Pop>)}
    {f > w.start + w.dur * 0.15 && f < w.start + w.dur + 20 && <circle cx={dx} cy={dy} r={14} fill="#5aa0e0" />}
    {PH.slice(0, 4).map((_, i) => <path key={i} d={`M${sx(i) + 240},${sy(i) + 40} q40,0 40,${50}`} fill="none" stroke="#9fb6d6" strokeWidth={5} opacity={p(f, stepA(i + 1), stepA(i + 1) + 10)} />)}
    {/* good */}
    {['simple', 'easy to manage', 'small, clear projects'].map((t, i) =>
      <Pop key={t} f={f} a={g.start + g.dur * (0.12 + i * 0.25)} x={1500} y={260 + i * 100} out={b.start}><Pill text={t} bg="#e3f0e5" fg={C.green} s={34} w={420} /></Pop>)}
    {/* bad: requirements locked up front, bug found late in testing */}
    <Pop f={f} a={b.start + b.dur * 0.1} x={sx(0) + 120} y={sy(0) - 70}><g transform="translate(0,0)"><IconDot I={Lock} r={30} bg={C.red} /></g></Pop>
    <Rise f={f} a={b.start + b.dur * 0.15} out={id.start}><T x={sx(0) + 170} y={sy(0) - 58} s={30} a="start" w={700} c={C.red}>known up front</T></Rise>
    <Pop f={f} a={bugA} x={sx(3) + 330} y={sy(3) + 40}><IconDot I={Bug} r={46} bg={C.red} /></Pop>
    <Rise f={f} a={bugA + 8}><T x={sx(3) + 400} y={sy(3) + 52} s={38} a="start" w={800} c={C.red}>found late</T></Rise>
    {/* idle people */}
    {[0, 1, 2].map(i => {
      const a = id.start + id.dur * (0.15 + i * 0.1), busy = i === 0;
      return <g key={i} opacity={p(f, a, a + 10)} transform={`translate(${1560 + i * 150},1030)`}>
        <Person v={i} s={0.32} tired={busy ? 0 : 0.8 * p(f, a + 10, a + 40)} />
        {!busy && <T x={60} y={-230} s={40} w={800} c={C.muted} o={0.5 + 0.5 * Math.sin(f / 8 + i)}>z z</T>}
        {busy && <T x={0} y={-230} s={28} w={700} c={C.green}>working</T>}
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ iterative: small loops, each adds a working piece
const Loop: React.FC<{ f: number; a: number; x: number; y: number; r?: number; speed?: number; col?: string }> = ({ f, a, x, y, r = 150, speed = 2.2, col = C.blue }) => {
  const parts = ['analyse', 'design', 'code', 'test'];
  const rot = Math.max(0, f - a) * speed;
  return <g transform={`translate(${x},${y})`} opacity={p(f, a, a + 12)}>
    <circle r={r} fill="none" stroke="#e2dccd" strokeWidth={30} />
    {parts.map((pp, i) => {
      const a0 = (i * 90 - 90 + 4) * Math.PI / 180, a1 = (i * 90 + 4) * Math.PI / 180 - 0.12;
      return <path key={pp} d={`M${r * Math.cos(a0)},${r * Math.sin(a0)} A${r},${r} 0 0 1 ${r * Math.cos(a1)},${r * Math.sin(a1)}`} stroke={[C.blue, PURPLE, C.ink, C.amber][i]} strokeWidth={30} fill="none" />;
    })}
    {parts.map((pp, i) => { const an = (i * 90 - 45) * Math.PI / 180; return <T key={pp} x={(r + 70) * Math.cos(an)} y={(r + 70) * Math.sin(an) + 10} s={26} w={700} c={C.muted}>{pp}</T>; })}
    <g transform={`rotate(${rot})`}><circle cx={0} cy={-r} r={20} fill={HL} stroke={C.ink} strokeWidth={4} /></g>
  </g>;
};
const Iterative: React.FC<{ f: number }> = ({ f }) => {
  const it = B('iter'), pa = B('par');
  const per = 75; // frames per lap
  const laps = Math.max(0, Math.floor((f - it.start - 20) / per));
  const moveL = p(f, pa.start, pa.start + 24);
  return <g>
    <Label f={f} a={it.start}>iterative: build a part, test, feedback, repeat</Label>
    <g transform={`translate(${lerp(0, -380, moveL)},0)`}>
      <Loop f={f} a={it.start + 20} x={700} y={560} speed={360 / per} />
      {/* product grows one block per lap */}
      {Array.from({ length: Math.min(6, laps) }, (_, i) =>
        <g key={i} transform={`translate(${1150 + (i % 3) * 130},${800 - Math.floor(i / 3) * 110}) scale(${pop(f, it.start + 20 + (i + 1) * per)})`}>
          <rect x={-58} y={-48} width={116} height={96} rx={12} fill={[C.blue, C.teal, PURPLE, C.amber, C.green, C.red][i]} />
        </g>)}
      <T x={1280} y={910} s={30} c={C.muted} o={p(f, it.start + 100, it.start + 110)}>working product grows</T>
    </g>
    {/* parallel teams */}
    {[0, 1].map(i => <Loop key={i} f={f} a={pa.start + 12 + i * 10} x={1200 + i * 440} y={380} r={100} speed={4 + i} col={C.teal} />)}
    {[0, 1].map(i => <Rise key={`t${i}`} f={f} a={pa.start + 20 + i * 10}><T x={1200 + i * 440} y={575} s={32} w={700} c={C.teal}>team {i + 1}</T></Rise>)}
  </g>;
};

// ------------------------------------------------ agile
const VALUES: [string, string][] = [
  ['individuals & interactions', 'processes & tools'], ['working software', 'comprehensive documentation'],
  ['customer collaboration', 'contract negotiation'], ['responding to change', 'following a plan'],
];
const Agile: React.FC<{ f: number }> = ({ f }) => {
  const ag = B('agile'), v1 = B('v1'), v2 = B('v2'), pro = B('agpro'), con = B('agcon');
  const valA = [v1.start + v1.dur * 0.05, v1.start + v1.dur * 0.55, v2.start + v2.dur * 0.02, v2.start + v2.dur * 0.5];
  const out = p(f, pro.start - 6, pro.start + 10);
  return <g>
    <g opacity={1 - out}>
      <Rise f={f} a={ag.start}><T x={960} y={170} s={84} w={800} f={SERIF} c={C.green}>Agile</T></Rise>
      <Rise f={f} a={ag.start + ag.dur * 0.4}><T x={960} y={235} s={34} w={500} c={C.muted}>speed up development, respond to change</T></Rise>
      {VALUES.map(([l, r], i) => {
        const a = valA[i], tilt = p(f, a + 10, a + 34);
        return <Rise key={l} f={f} a={a}>
          <g transform={`translate(960,${360 + i * 165})`}>
            <rect x={-760} y={-62} width={1520} height={124} rx={22} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
            <T x={-380} y={14} s={44} w={800} c={C.green}>{l}</T>
            <T x={0} y={12} s={30} w={600} c={C.muted}>over</T>
            <T x={380} y={14} s={38} w={500} c={C.ink} o={1 - 0.55 * tilt}>{r}</T>
          </g>
        </Rise>;
      })}
    </g>
    {/* pros */}
    <g opacity={out}>
      <Label f={f} a={pro.start}>every iteration: working software</Label>
      {[0, 1, 2, 3].map(i => <Pop key={i} f={f} a={pro.start + pro.dur * (0.1 + i * 0.1)} x={330 + i * 230} y={480}>
        <rect x={-90} y={-70} width={180} height={140} rx={16} fill={[C.blue, C.teal, PURPLE, C.green][i]} />
        <T x={0} y={12} s={30} c="#fff" w={700}>v{i + 1}</T>
        <g transform="translate(80,-65)"><Badge ok r={22} /></g>
      </Pop>)}
      <g transform="translate(1500,860)" opacity={p(f, pro.start + pro.dur * 0.45, pro.start + pro.dur * 0.55)}><Person v={1} s={0.55} arm={p(f, pro.start + pro.dur * 0.6, pro.start + pro.dur * 0.7)} /></g>
      <Rise f={f} a={pro.start + pro.dur * 0.65}><T x={1500} y={290} s={34} w={700} c={C.green}>better requirements</T></Rise>
      {['too small or too large projects', 'documentation comes second'].map((t, i) =>
        <Pop key={t} f={f} a={con.start + con.dur * (0.3 + i * 0.3)} x={720} y={830 + i * 0}>
          <g transform={`translate(${(i - 0.5) * 700 - 0},0)`}><rect x={-320} y={-46} width={640} height={92} rx={46} fill="#f6e4e0" stroke={C.red} strokeWidth={3} />
            <g transform="translate(-270,0)"><IconDot I={TriangleAlert} r={28} bg={C.red} /></g>
            <T x={20} y={12} s={32} w={700} c={C.red}>{t}</T></g>
        </Pop>)}
    </g>
  </g>;
};

export const SweModels: React.FC = () =>
  <Video t={timeline} scenes={[[Waterfall, 0], [Iterative, B('iter').start], [Agile, B('agile').start]]}>
    {PH.map((_, i) => <Sfx key={i} at={at('wf', 0.15 + i * 0.15)} name="pop" volume={0.18} />)}
    <Sfx at={at('wfbad', 0.62)} name="beep" volume={0.3} />
    {[0.05, 0.55].map(k => <Sfx key={k} at={at('v1', k)} name="whoosh" volume={0.2} />)}
    {[0.02, 0.5].map(k => <Sfx key={`b${k}`} at={at('v2', k)} name="whoosh" volume={0.2} />)}
    {[0, 1, 2, 3].map(i => <Sfx key={`v${i}`} at={at('agpro', 0.1 + i * 0.1)} name="ping" volume={0.12} />)}
  </Video>;
