// SWE307 ch7: UML sequence diagram: lifelines, execution, messages, combined fragments (alt, opt, loop, break, par, ref), destruction.
import React from 'react';
import { Sfx } from '../kit';
import { Arrow, C, Label, PURPLE, Pop, Rise, StickActor, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-sequence.json';

const { B, at } = tl(timeline);
const LX = [400, 960, 1520];
const NAMES = ['customer', 'login screen', 'bank system'];
const TOP = 170, BOT = 1000;

const msg = (f: number, a: number, i: number, j: number, y: number, label: string, ret = false, c = C.ink) => {
  const t = p(f, a, a + 16);
  const x1 = LX[i] + (i < j ? 14 : -14), x2 = LX[j] + (i < j ? -14 : 14);
  return <g opacity={p(f, a, a + 4)}>
    <Arrow x1={x1} y1={y} x2={x2} y2={y} t={t} sw={4} hs={16} head={ret ? 'open' : 'fill'} dash={ret ? '10 8' : undefined} c={c} />
    <T x={(x1 + x2) / 2} y={y - 14} s={28} w={600} c={c} o={t}>{label}</T>
  </g>;
};

const Base: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), l = B('lifeline'), e = B('exec'), m = B('msg'), d = B('destroy');
  const kill = p(f, d.start + d.dur * 0.35, d.start + d.dur * 0.5);
  return <g>
    <Rise f={f} a={w.start} out={l.start + l.dur * 0.6}><T x={960} y={110} s={48} w={500} f={SERIF}>messages, in time order, top to bottom</T></Rise>
    {/* time arrow */}
    <g opacity={p(f, w.start + w.dur * 0.5, w.start + w.dur * 0.6) * (1 - p(f, l.start + l.dur * 0.5, l.start + l.dur * 0.6))}>
      <Arrow x1={160} y1={260} x2={160} y2={900} t={p(f, w.start + w.dur * 0.5, w.start + w.dur * 0.9)} sw={6} c={C.muted} />
      <T x={130} y={580} s={30} w={700} c={C.muted} a="end">time</T>
    </g>
    {LX.map((x, i) => {
      const a = l.start + l.dur * (0.2 + i * 0.15);
      const end = i === 2 ? lerp(BOT, 900, kill) : BOT;
      return <g key={i}>
        <Pop f={f} a={a} x={x} y={TOP}>
          {i === 0 ? <g transform="translate(0,-10) scale(0.55)"><StickActor /></g> : <rect x={-130} y={-40} width={260} height={80} rx={8} fill="#fff" stroke={C.ink} strokeWidth={4} />}
          <T x={0} y={i === 0 ? 72 : 10} s={30} w={700}>{NAMES[i]}</T>
        </Pop>
        {f > a + 6 && <line x1={x} y1={TOP + (i === 0 ? 90 : 42)} x2={x} y2={lerp(TOP + 42, end, p(f, a + 6, a + 30))} stroke={C.ink} strokeWidth={3} strokeDasharray="12 10" />}
        {i === 2 && kill > 0 && <g transform={`translate(${x},900) scale(${pop(f, d.start + d.dur * 0.45)})`}><path d="M-30,-30 L30,30 M30,-30 L-30,30" stroke={C.red} strokeWidth={9} strokeLinecap="round" /></g>}
      </g>;
    })}
    {/* execution bars */}
    {[[1, 300, 420, 0.2], [2, 330, 400, 0.45]].map(([i, y1, y2, fr]) => {
      const a = e.start + e.dur * fr;
      return <rect key={i} x={LX[i] - 12} y={y1} width={24} height={(y2 - y1) * p(f, a, a + 14)} fill={HL} stroke={C.ink} strokeWidth={3} />;
    })}
    {msg(f, m.start + m.dur * 0.15, 0, 1, 300, 'enter user, password')}
    {msg(f, m.start + m.dur * 0.35, 1, 2, 330, 'validate')}
    {msg(f, m.start + m.dur * 0.55, 2, 1, 400, 'result', true)}
    <g opacity={p(f, m.start + m.dur * 0.7, m.start + m.dur * 0.8)}><T x={1700} y={300} s={28} w={700} c={C.blue} a="start">sender →</T><T x={1700} y={340} s={28} w={700} c={C.blue} a="start">→ receiver</T></g>
  </g>;
};

// one fragment at a time, in the space below the first messages
type Op = { id: string; op: string; col: string; draw: (f: number, a: number) => React.ReactNode };
const FY = 470, FH = 380;
const OPS: Op[] = [
  { id: 'alt', op: 'alt', col: C.blue, draw: (f, a) => <g>
    <T x={330} y={FY + 100} s={26} w={700} a="start" c={C.blue}>[valid]</T>{msg(f, a + 10, 1, 0, FY + 120, 'show accounts')}
    <line x1={300} y1={FY + 190} x2={1640} y2={FY + 190} stroke={C.blue} strokeWidth={3} strokeDasharray="12 10" />
    <T x={330} y={FY + 250} s={26} w={700} a="start" c={C.blue}>[else]</T>{msg(f, a + 30, 1, 0, FY + 290, 'show error')}
  </g> },
  { id: 'opt', op: 'opt', col: C.teal, draw: (f, a) => <g><T x={330} y={FY + 100} s={26} w={700} a="start" c={C.teal}>[remember me]</T>{msg(f, a + 10, 1, 2, FY + 190, 'save session')}</g> },
  { id: 'loop', op: 'loop', col: PURPLE, draw: (f, a) => <g>{[0, 1, 2].map(k => <g key={k} opacity={p(f, a + k * 14, a + k * 14 + 6)}>{msg(f, a + k * 14, 0, 1, FY + 110 + k * 90, 'try again')}</g>)}</g> },
  { id: 'brk', op: 'break', col: C.red, draw: (f, a) => <g><T x={330} y={FY + 100} s={26} w={700} a="start" c={C.red}>[attempts &gt; 3]</T>{msg(f, a + 30, 1, 0, FY + 190, 'terminate', false, C.red)}</g> },
  { id: 'par', op: 'par', col: C.amber, draw: (f, a) => <g>{msg(f, a + 6, 2, 1, FY + 120, 'update balance')}
    <line x1={300} y1={FY + 190} x2={1640} y2={FY + 190} stroke={C.amber} strokeWidth={3} strokeDasharray="12 10" />{msg(f, a + 6, 2, 0, FY + 290, 'send notice')}</g> },
  { id: 'ref', op: 'ref', col: C.green, draw: () => <g><T x={970} y={FY + 210} s={44} w={700} f={SERIF}>Withdrawal</T><T x={970} y={FY + 270} s={26} w={600} c={C.muted}>(another sequence diagram)</T></g> },
];
const Fragments: React.FC<{ f: number }> = ({ f }) => <g>
  {OPS.map((o, i) => {
    const b = B(o.id), next = i + 1 < OPS.length ? B(OPS[i + 1].id).start : B('destroy').start;
    const a = b.start + 4, o1 = p(f, a, a + 10) * (1 - p(f, next - 6, next + 2));
    if (o1 <= 0) return null;
    const w = 100 + o.op.length * 18;
    return <g key={o.id} opacity={o1}>
      <rect x={300} y={FY} width={1340} height={FH} fill={o.id === 'ref' ? '#e3f0e5' : 'rgba(255,255,255,.55)'} stroke={o.col} strokeWidth={5} />
      <path d={`M300,${FY} h${w} v40 l-20,20 h-${w - 20} z`} fill={o.col} />
      <T x={300 + w / 2 - 8} y={FY + 42} s={34} w={800} c="#fff" f={MONO}>{o.op}</T>
      {o.draw(f, a + 10)}
    </g>;
  })}
  <g opacity={p(f, B('frag').start, B('frag').start + 10) * (1 - p(f, B('alt').start, B('alt').start + 8))}>
    <rect x={300} y={FY} width={1340} height={FH} fill="rgba(255,255,255,.4)" stroke={C.ink} strokeWidth={4} strokeDasharray="14 10" />
    <path d={`M300,${FY} h220 v40 l-20,20 h-200 z`} fill={C.ink} /><T x={400} y={FY + 42} s={32} w={800} c="#fff" f={MONO}>operator</T>
  </g>
</g>;

const Main: React.FC<{ f: number }> = ({ f }) => <g><Base f={f} /><Fragments f={f} /></g>;

export const SweSequence: React.FC = () =>
  <Video t={timeline} scenes={[[Main, 0]]}>
    {[0.15, 0.35, 0.55].map(k => <Sfx key={k} at={at('msg', k)} name="whoosh" volume={0.15} />)}
    {OPS.map(o => <Sfx key={o.id} at={at(o.id) + 4} name="pop" volume={0.2} />)}
    <Sfx at={at('destroy', 0.45)} name="beep" volume={0.22} />
  </Video>;
