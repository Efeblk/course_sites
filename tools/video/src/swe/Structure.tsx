// SWE307 ch6-7: the 14 UML diagrams (7 behavioral, 7 structural), the class box, and component diagrams (ball/socket, assembly, delegation).
import React from 'react';
import { Sfx } from '../kit';
import { Arrow, C, Card, Label, PURPLE, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF, MONO } from './kit';
import timeline from '../timelines/swe-structure.json';

const { B, at } = tl(timeline);
const BEH = ['use case', 'activity', 'sequence', 'state machine', 'communication', 'interaction overview', 'timing'];
const STR = ['class', 'component', 'deployment', 'object', 'package', 'profile', 'composite structure'];

const Fourteen: React.FC<{ f: number }> = ({ f }) => {
  const u = B('uml'), s = B('struct');
  const col = (x: number, title: string, sub: string, items: string[], a: number, d: number, c: string, bg: string) => <g>
    <Rise f={f} a={a}><T x={x} y={200} s={48} w={800} c={c}>{title}</T><T x={x} y={248} s={30} c={C.muted}>{sub}</T></Rise>
    {items.map((it, i) => <Pop key={it} f={f} a={a + d * (0.3 + i * 0.07)} x={x} y={320 + i * 100}>
      <rect x={-260} y={-38} width={520} height={76} rx={16} fill={bg} stroke={c} strokeWidth={3} /><T x={0} y={12} s={32} w={700} c={c}>{it}</T>
    </Pop>)}
  </g>;
  return <g>
    <Rise f={f} a={u.start}><T x={960} y={110} s={44} w={500} f={SERIF}>UML: 14 diagrams</T></Rise>
    {col(560, 'behavioral', 'what happens', BEH, u.start, u.dur, C.green, '#e3f0e5')}
    {col(1360, 'structural', 'what it is made of', STR, s.start, s.dur, C.blue, '#e6ecfb')}
  </g>;
};

// ------------------------------------------------ class
const ClassBox: React.FC<{ name: string; attrs: string[]; ops: string[]; k: [number, number, number] }> = ({ name, attrs, ops, k }) => {
  const W = 420, h1 = 80, h2 = 50 + attrs.length * 44, h3 = 50 + ops.length * 44;
  return <g>
    <rect x={-W / 2} y={0} width={W} height={h1} fill="#fff" stroke={C.ink} strokeWidth={5} opacity={k[0]} />
    <T x={0} y={54} s={40} w={800} o={k[0]}>{name}</T>
    <g opacity={k[1]}><rect x={-W / 2} y={h1} width={W} height={h2} fill="#fff" stroke={C.ink} strokeWidth={5} />
      {attrs.map((a, i) => <T key={a} x={-W / 2 + 26} y={h1 + 56 + i * 44} s={30} a="start" f={MONO}>{a}</T>)}</g>
    <g opacity={k[2]}><rect x={-W / 2} y={h1 + h2} width={W} height={h3} fill="#fff" stroke={C.ink} strokeWidth={5} />
      {ops.map((a, i) => <T key={a} x={-W / 2 + 26} y={h1 + h2 + 56 + i * 44} s={30} a="start" f={MONO}>{a}</T>)}</g>
  </g>;
};
const Class: React.FC<{ f: number }> = ({ f }) => {
  const c = B('class'), r = B('rel');
  const k = (fr: number) => p(f, c.start + c.dur * fr, c.start + c.dur * fr + 12);
  const tags: [string, number, number][] = [['name', 0.55, 40], ['attributes', 0.7, 150], ['operations', 0.85, 300]];
  return <g>
    <Label f={f} a={c.start}>class diagram: the main building block</Label>
    <g transform="translate(700,280)"><ClassBox name="Order" attrs={['orderId', 'date', 'total']} ops={['place()', 'cancel()']} k={[k(0.3), k(0.7), k(0.85)]} /></g>
    {tags.map(([t, fr, y]) => <g key={t} opacity={k(fr)}><Arrow x1={330} y1={280 + y} x2={470} y2={280 + y} sw={4} hs={14} c={C.blue} /><T x={310} y={290 + y} s={32} w={800} a="end" c={C.blue}>{t}</T></g>)}
    <g opacity={p(f, r.start, r.start + 12)}>
      <g transform="translate(1400,280)"><ClassBox name="Customer" attrs={['name', 'address']} ops={['register()']} k={[1, 1, 1]} /></g>
      <line x1={910} y1={330} x2={lerp(910, 1190, p(f, r.start + 10, r.start + 30))} y2={330} stroke={C.ink} strokeWidth={5} />
      <T x={1050} y={310} s={28} w={700} c={C.muted} o={p(f, r.start + 24, r.start + 34)}>relationship</T>
    </g>
  </g>;
};

// ------------------------------------------------ components
const Comp: React.FC<{ name: string; w?: number; h?: number; stroke?: string }> = ({ name, w = 380, h = 170, stroke = C.ink }) => <g>
  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#fff" stroke={stroke} strokeWidth={5} />
  <g transform={`translate(${w / 2 - 60},${-h / 2 + 22})`}><rect x={0} y={0} width={36} height={44} fill="#fff" stroke={C.ink} strokeWidth={3} /><rect x={-8} y={8} width={18} height={9} fill="#fff" stroke={C.ink} strokeWidth={3} /><rect x={-8} y={26} width={18} height={9} fill="#fff" stroke={C.ink} strokeWidth={3} /></g>
  <T x={0} y={14} s={40} w={800}>{name}</T>
</g>;
const Components: React.FC<{ f: number }> = ({ f }) => {
  const co = B('comp'), i = B('iface'), pl = B('plug'), as = B('assembly'), de = B('delegation'), so = B('soa');
  const ball = p(f, i.start + i.dur * 0.3, i.start + i.dur * 0.45), sock = p(f, i.start + i.dur * 0.65, i.start + i.dur * 0.8);
  const join = p(f, pl.start + pl.dur * 0.5, pl.start + pl.dur * 0.85);
  const dO = p(f, de.start - 6, de.start + 10);
  const px = lerp(1420, 1154, join); // product component moves toward order
  return <g>
    <g opacity={1 - dO}>
      <Label f={f} a={co.start}>component diagram</Label>
      <Pop f={f} a={co.start + co.dur * 0.3} x={560} y={540}><Comp name="Order" /></Pop>
      <Pop f={f} a={co.start + co.dur * 0.5} x={px} y={540}><Comp name="Product" /></Pop>
      {/* provided interface (ball) on Product, left side */}
      <g opacity={ball}><line x1={px - 190} y1={540} x2={px - 260} y2={540} stroke={C.ink} strokeWidth={5} /><circle cx={px - 286} cy={540} r={26} fill="#fff" stroke={C.green} strokeWidth={6} /></g>
      {/* required interface (socket) on Order, right side */}
      <g opacity={sock}><line x1={750} y1={540} x2={830} y2={540} stroke={C.ink} strokeWidth={5} /><path d="M868,500 A40,40 0 0 0 868,580" fill="none" stroke={C.amber} strokeWidth={7} /></g>
      <g opacity={ball * (1 - join)}><T x={px - 286} y={420} s={30} w={800} c={C.green}>provided: ball</T></g>
      <g opacity={sock * (1 - join)}><T x={850} y={690} s={30} w={800} c={C.amber}>required: socket</T></g>
      <g opacity={p(f, pl.start + pl.dur * 0.1, pl.start + pl.dur * 0.25)}>
        <T x={560} y={720} s={30} w={600} c={C.muted}>requires item code</T><T x={px} y={720} s={30} w={600} c={C.muted}>provides item code</T>
      </g>
      <g opacity={p(f, as.start, as.start + 12)}><rect x={760} y={340} width={360} height={70} rx={35} fill={HL} /><T x={940} y={387} s={32} w={800}>assembly connector</T></g>
    </g>
    {/* delegation */}
    <g opacity={dO * (1 - p(f, so.start - 6, so.start + 10))}>
      <Label f={f} a={de.start}>delegation connector</Label>
      <rect x={760} y={260} width={900} height={560} rx={16} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
      <T x={1210} y={310} s={34} w={800} c={C.muted}>«subsystem» Accounting</T>
      <rect x={742} y={522} width={36} height={36} fill="#fff" stroke={C.ink} strokeWidth={4} />
      <line x1={600} y1={540} x2={742} y2={540} stroke={C.ink} strokeWidth={5} /><circle cx={574} cy={540} r={26} fill="#fff" stroke={C.green} strokeWidth={6} />
      <T x={574} y={480} s={28} w={700} c={C.green}>Manage Orders</T>
      <g transform="translate(1290,560)"><Comp name="Orders" w={360} /></g>
      <Arrow x1={780} y1={540} x2={1100} y2={540} t={p(f, de.start + de.dur * 0.4, de.start + de.dur * 0.65)} dash="12 10" sw={5} />
      <T x={940} y={510} s={28} w={700} c={C.blue} o={p(f, de.start + de.dur * 0.55, de.start + de.dur * 0.7)}>«delegate»</T>
      <T x={940} y={930} s={34} w={600} c={C.muted} o={p(f, de.start + de.dur * 0.7, de.start + de.dur * 0.8)}>outside contract → the part that really does the work</T>
    </g>
    <g opacity={p(f, so.start - 6, so.start + 10)}>
      <Pop f={f} a={so.start + so.dur * 0.2} x={960} y={420}><Pill text="component-based software engineering" bg={C.blue} s={44} /></Pop>
      <Pop f={f} a={so.start + so.dur * 0.65} x={960} y={620}><Pill text="service-oriented architecture (SOA)" bg={PURPLE} s={44} /></Pop>
    </g>
  </g>;
};

export const SweStructure: React.FC = () =>
  <Video t={timeline} scenes={[[Fourteen, 0], [Class, B('class').start], [Components, B('comp').start]]}>
    <Sfx at={at('plug', 0.85)} name="pop" volume={0.3} />
    <Sfx at={at('delegation', 0.4)} name="whoosh" volume={0.2} />
    {[0.3, 0.7, 0.85].map(k => <Sfx key={k} at={at('class', k)} name="tick" volume={0.25} />)}
  </Video>;
