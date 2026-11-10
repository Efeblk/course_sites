// SWE307 ch7: UML state machine: water phases, then the slides' ATM (Off, Self Test, Out of Service, Idle, Serving Customer with entry/exit actions).
import React from 'react';
import { Cloud, Droplet, Snowflake, CreditCard } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, C, Card, IconDot, InitialDot, Label, PURPLE, Pill, Pop, Rise, StateBox, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-state.json';

const { B, at } = tl(timeline);

const Water: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), wa = B('water');
  const st: [React.FC<any>, string, number, number, string][] = [[Droplet, 'liquid', 960, 600, '#5aa0e0'], [Cloud, 'vapor', 960, 260, '#9aa3b5'], [Snowflake, 'ice', 1500, 600, '#7cc4e0']];
  return <g>
    <Rise f={f} a={w.start}><T x={960} y={110} s={48} w={500} f={SERIF}>the states of one thing, and the events between them</T></Rise>
    {st.map(([I, n, x, y, col], i) => <Pop key={n} f={f} a={wa.start + wa.dur * (0.05 + i * 0.1)} x={x} y={y}>
      <rect x={-170} y={-70} width={340} height={140} rx={34} fill="#fff" stroke={col} strokeWidth={6} />
      <g transform="translate(-100,0)"><IconDot I={I} r={40} bg={col} /></g><T x={40} y={14} s={44} w={800}>{n}</T>
    </Pop>)}
    <Arrow x1={1135} y1={600} x2={1325} y2={600} t={p(f, wa.start + wa.dur * 0.45, wa.start + wa.dur * 0.6)} sw={6} head="fill" />
    <T x={1230} y={570} s={30} w={700} c={C.blue} o={p(f, wa.start + wa.dur * 0.5, wa.start + wa.dur * 0.6)}>freezing</T>
    <Arrow x1={960} y1={335} x2={960} y2={525} t={p(f, wa.start + wa.dur * 0.75, wa.start + wa.dur * 0.9)} sw={6} head="fill" />
    <T x={980} y={440} s={30} w={700} c={C.blue} a="start" o={p(f, wa.start + wa.dur * 0.8, wa.start + wa.dur * 0.9)}>condensation</T>
    <g opacity={p(f, w.start + w.dur * 0.6, w.start + w.dur * 0.8) * (1 - p(f, wa.start, wa.start + 10))}>
      <g transform="translate(560,540)"><StateBox text="state A" w={300} /></g><g transform="translate(1360,540)"><StateBox text="state B" w={300} /></g>
      <Arrow x1={715} y1={540} x2={1205} y2={540} sw={6} head="fill" /><T x={960} y={510} s={30} w={700} c={C.blue}>event</T>
    </g>
  </g>;
};

// ------------------------------------------------ the ATM
const P = { init: [170, 230], off: [420, 230], test: [880, 230], oos: [1500, 230], idle: [880, 600] } as const;
const SC = { x: 1180, y: 430, w: 640, h: 560 };
const Atm: React.FC<{ f: number }> = ({ f }) => {
  const of = B('off'), on = B('on'), fa = B('fail'), ca = B('card'), co = B('composite'), cn = B('cancel'), ex = B('exit'), ki = B('kinds');
  const cur = f < on.start + 20 ? 'off' : f < fa.start + fa.dur * 0.3 ? 'test' : f < fa.start + fa.dur * 0.55 ? 'oos' : f < ca.start + ca.dur * 0.3 ? 'idle' : f < cn.start + cn.dur * 0.5 ? 'sc' : f < ex.start ? 'idle' : 'sc';
  const glow = (k: string) => (cur === k ? 1 : 0);
  const box = (k: keyof typeof P, text: string, a: number, w = 280) => <Pop f={f} a={a} x={P[k][0]} y={P[k][1]}>
    {glow(k) > 0 && <rect x={-w / 2 - 14} y={-62} width={w + 28} height={124} rx={36} fill={HL} opacity={0.7} />}
    <StateBox text={text} w={w} />
  </Pop>;
  const ko = 1 - p(f, ki.start - 6, ki.start + 8);
  const subA = (i: number) => co.start + co.dur * (0.35 + i * 0.18);
  return <g>
    <g opacity={ko}>
      <Label f={f} a={of.start}>an ATM</Label>
      <Pop f={f} a={of.start + of.dur * 0.55} x={P.init[0]} y={P.init[1]}><InitialDot /></Pop>
      <Arrow x1={200} y1={230} x2={272} y2={230} t={p(f, of.start + of.dur * 0.6, of.start + of.dur * 0.7)} head="fill" sw={5} hs={18} />
      {box('off', 'Off', of.start + of.dur * 0.25)}
      <Arrow x1={565} y1={230} x2={735} y2={230} t={p(f, on.start, on.start + 14)} head="fill" sw={5} hs={18} />
      <T x={650} y={200} s={26} w={700} c={C.blue} o={p(f, on.start, on.start + 10)}>power on</T>
      {box('test', 'Self Test', on.start + 10)}
      <Arrow x1={1025} y1={230} x2={1355} y2={230} t={p(f, fa.start + fa.dur * 0.1, fa.start + fa.dur * 0.25)} head="fill" sw={5} hs={18} />
      <T x={1190} y={200} s={26} w={700} c={C.red} o={p(f, fa.start + fa.dur * 0.1, fa.start + fa.dur * 0.2)}>[failure]</T>
      {box('oos', 'Out of Service', fa.start + fa.dur * 0.2, 320)}
      <Arrow x1={880} y1={295} x2={880} y2={535} t={p(f, fa.start + fa.dur * 0.55, fa.start + fa.dur * 0.7)} head="fill" sw={5} hs={18} />
      <T x={900} y={420} s={26} w={700} c={C.muted} a="start" o={p(f, fa.start + fa.dur * 0.6, fa.start + fa.dur * 0.7)}>no trigger</T>
      {box('idle', 'Idle', fa.start + fa.dur * 0.65)}
      {/* serving customer, composite */}
      <g opacity={p(f, ca.start + ca.dur * 0.3, ca.start + ca.dur * 0.42)}>
        {cur === 'sc' && <rect x={SC.x - 14} y={SC.y - 14} width={SC.w + 28} height={SC.h + 28} rx={44} fill={HL} opacity={0.6} />}
        <rect x={SC.x} y={SC.y} width={SC.w} height={SC.h} rx={36} fill="#fff" stroke={C.ink} strokeWidth={5} />
        <T x={SC.x + SC.w / 2} y={SC.y + 52} s={38} w={800}>Serving Customer</T>
        <line x1={SC.x} y1={SC.y + 76} x2={SC.x + SC.w} y2={SC.y + 76} stroke={C.ink} strokeWidth={3} />
        <T x={SC.x + 30} y={SC.y + 118} s={28} w={600} a="start" f={MONO} c={C.green}>entry / readCard</T>
        <g opacity={p(f, ex.start + ex.dur * 0.2, ex.start + ex.dur * 0.35)}><T x={SC.x + 30} y={SC.y + 156} s={28} w={600} a="start" f={MONO} c={C.red}>exit / ejectCard</T></g>
      </g>
      <Arrow x1={1025} y1={600} x2={1165} y2={600} t={p(f, ca.start + ca.dur * 0.2, ca.start + ca.dur * 0.32)} head="fill" sw={5} hs={18} />
      <T x={1090} y={570} s={24} w={700} c={C.blue} o={p(f, ca.start + ca.dur * 0.2, ca.start + ca.dur * 0.3)}>card</T>
      <Pop f={f} a={ca.start + ca.dur * 0.1} x={720} y={760}><IconDot I={CreditCard} r={40} bg={C.blue} /></Pop>
      {['authentication', 'selecting transaction', 'transaction'].map((s, i) => <g key={s}>
        <Pop f={f} a={subA(i)} x={SC.x + SC.w / 2} y={SC.y + 240 + i * 110}><StateBox text={s} w={420} h={74} s={28} /></Pop>
        {i < 2 && <Arrow x1={SC.x + SC.w / 2} y1={SC.y + 277 + i * 110} x2={SC.x + SC.w / 2} y2={SC.y + 313 + i * 110} t={p(f, subA(i + 1) - 8, subA(i + 1))} head="fill" sw={4} hs={12} />}
      </g>)}
      {/* cancel */}
      <path d={`M${SC.x},${SC.y + SC.h - 60} C ${SC.x - 160},${SC.y + SC.h - 60} 880,${800} 880,${665}`} fill="none" stroke={C.red} strokeWidth={5}
        strokeDasharray={`${p(f, cn.start + cn.dur * 0.3, cn.start + cn.dur * 0.55) * 700} 700`} />
      <T x={1000} y={900} s={28} w={700} c={C.red} o={p(f, cn.start + cn.dur * 0.4, cn.start + cn.dur * 0.5)}>cancel (any time)</T>
    </g>
    {/* kinds */}
    <g opacity={1 - ko}>
      <Label f={f} a={ki.start}>kinds of states</Label>
      <Pop f={f} a={ki.start + ki.dur * 0.05} x={420} y={540}><StateBox text="simple" w={300} /><T x={0} y={130} s={28} c={C.muted}>no substates</T></Pop>
      <Pop f={f} a={ki.start + ki.dur * 0.25} x={960} y={540}><rect x={-220} y={-170} width={440} height={340} rx={30} fill="#fff" stroke={C.ink} strokeWidth={5} /><T x={0} y={-120} s={34} w={800}>composite</T>
        <g transform="translate(0,-20)"><StateBox text="sub" w={200} h={70} s={26} /></g><g transform="translate(0,90)"><StateBox text="sub" w={200} h={70} s={26} /></g><T x={0} y={220} s={28} c={C.muted}>has substates</T></Pop>
      <Pop f={f} a={ki.start + ki.dur * 0.55} x={1500} y={540}><circle r={60} fill="#fff" stroke={C.ink} strokeWidth={5} /><T x={0} y={20} s={56} w={800} f={SERIF}>H</T><T x={0} y={130} s={28} c={C.muted}>shallow history:</T><T x={0} y={168} s={28} c={C.muted}>back to the last substate</T></Pop>
    </g>
  </g>;
};

export const SweState: React.FC = () =>
  <Video t={timeline} scenes={[[Water, 0], [Atm, B('off').start]]}>
    <Sfx at={at('on')} name="whoosh" volume={0.18} />
    <Sfx at={at('fail', 0.1)} name="beep" volume={0.2} />
    <Sfx at={at('card', 0.2)} name="whoosh" volume={0.18} />
    {[0, 1, 2].map(i => <Sfx key={i} at={at('composite', 0.35 + i * 0.18)} name="pop" volume={0.18} />)}
    <Sfx at={at('cancel', 0.3)} name="whoosh" volume={0.18} />
  </Video>;
