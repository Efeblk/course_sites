// "Augmented intelligence and trust": the navigation analogy, augmentation, the trust dial, meaningful oversight.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BellOff, Calculator, Check, Clock, Cpu, FileSearch, Hand, Heart, Hospital, MessageCircle, Pill, Scale, ScanSearch, Stamp, Stethoscope, TriangleAlert, X, Zap } from 'lucide-react';
import { C, makeTL, lerp, p, pop } from './lib';
import { Narration, Sfx } from './kit';
import { Monitor, Nurse, StaffLook } from './art';
import timeline from './timelines/trust.json';

const { TL, B } = makeTL(timeline);
const SANS = '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
const SERIF = '"Iowan Old Style", Charter, Georgia, serif';
const DOCTOR: StaffLook = { coat: true, cap: false, scrub: '#5a78c8', scrubDark: '#3d5596', hair: '#2a2420', skin: '#c98e66' };
const T = (s: string, x: number, y: number, size: number, col: string, o = 1, anchor: 'start' | 'middle' | 'end' = 'middle', w = 700) =>
  <text x={x} y={y} textAnchor={anchor} fontFamily={SANS} fontWeight={w} fontSize={size} fill={col} opacity={o}>{s}</text>;
const HL = { background: 'linear-gradient(transparent 58%, #f6d765 58%)' };

// ------------------------------------------------ A: the navigation analogy
type Pt = [number, number];
const along = (pts: Pt[], t: number) => {
  const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let d = segs.reduce((a, b) => a + b, 0) * Math.max(0, Math.min(1, t));
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) { const u = segs[i] ? d / segs[i] : 0; const [a, b] = [pts[i], pts[i + 1]]; return { x: lerp(a[0], b[0], u), y: lerp(a[1], b[1], u), ang: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI + 90 }; }
    d -= segs[i];
  }
  return { x: pts[0][0], y: pts[0][1], ang: 0 };
};
const poly = (pts: Pt[]) => pts.map(q => q.join(',')).join(' ');
const ROUTE_A: Pt[] = [[300, 900], [300, 540], [1500, 540], [1500, 200]];
const START_B: Pt = [300, 700];
const ROUTE_B: Pt[] = [START_B, [300, 200], [1500, 200]];

const Car: React.FC<{ x: number; y: number; ang: number }> = ({ x, y, ang }) => (
  <g transform={`translate(${x},${y}) rotate(${ang})`}>
    <rect x={-26} y={-44} width={52} height={88} rx={16} fill={C.blue} />
    <rect x={-19} y={-30} width={38} height={22} rx={6} fill="#cfe0ff" />
    <rect x={-19} y={14} width={38} height={16} rx={5} fill="#cfe0ff" />
  </g>
);

const Nav: React.FC<{ f: number }> = ({ f }) => {
  const nav = B('nav'), cl = B('closed'), ov = B('override');
  const routeDraw = p(f, nav.start + 6, nav.start + 50);
  const drive1 = p(f, nav.start + 30, cl.start + 20);
  const carA = along([[300, 900], START_B], drive1);
  const drive2 = p(f, ov.start + 10, ov.start + ov.dur * 0.6);
  const car = drive2 > 0 ? along(ROUTE_B, drive2) : carA;
  const blk = p(f, cl.start + 6, cl.start + 18);
  const flash = Math.sin(f / 3) > 0;
  // partial polylines for drawing
  const partial = (pts: Pt[], t: number) => { const e = along(pts, t); const out: Pt[] = [pts[0]]; let acc = 0; const total = pts.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0); for (let i = 1; i < pts.length; i++) { acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc / total <= t) out.push(pts[i]); else break; } out.push([e.x, e.y]); return out; };
  const chips = ['understand', 'question', 'override'];
  return (
    <g>
      <rect width={1920} height={1080} fill="#e7e1d3" />
      {[[80, 60], [380, 60], [980, 60], [1580, 60], [80, 280], [380, 280], [980, 280], [1580, 280], [80, 620], [380, 620], [980, 620], [1580, 620]].map(([x, y], i) =>
        <rect key={i} x={x + 40} y={y + 40} width={x === 80 ? 120 : x === 1580 ? 300 : 440} height={y === 280 ? 180 : y === 620 ? 180 : 60} rx={14} fill={i % 3 ? '#d7ead2' : '#ddd5c4'} />)}
      {[200, 540, 880].map(y => <rect key={y} x={0} y={y - 34} width={1920} height={68} fill="#fbf9f4" />)}
      {[300, 900, 1500].map(x => <rect key={x} x={x - 34} y={0} width={68} height={1080} fill="#fbf9f4" />)}
      {/* destination */}
      <g transform="translate(1500,120)"><circle r={50} fill={C.green} /><Hospital x={-30} y={-30} size={60} color="#fff" /></g>
      {/* suggested route */}
      <polyline points={poly(partial(ROUTE_A, routeDraw))} fill="none" stroke={C.blue} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 26" opacity={1 - 0.7 * p(f, ov.start, ov.start + 20)} />
      {/* closure */}
      <g opacity={blk}>
        <circle cx={900} cy={540} r={110} fill={flash ? '#c8432f' : '#2b48a8'} opacity={0.18} />
        <rect x={840} y={500} width={120} height={22} rx={6} fill={C.red} /><rect x={852} y={500} width={20} height={22} fill="#fff" /><rect x={892} y={500} width={20} height={22} fill="#fff" /><rect x={932} y={500} width={20} height={22} fill="#fff" />
        <g transform={`translate(900,${580}) scale(${pop(f, cl.start + 6)})`}><circle r={40} fill="#fff" stroke={C.red} strokeWidth={6} /><TriangleAlert x={-24} y={-26} size={48} color={C.red} /></g>
      </g>
      {/* the app's view: blind to the closure */}
      <g transform="translate(1600,780)" opacity={p(f, cl.start + cl.dur * 0.45, cl.start + cl.dur * 0.55) * (1 - p(f, ov.start, ov.start + 10))}>
        <rect x={-140} y={-60} width={280} height={120} rx={20} fill="#fff" stroke="#d9d1c1" strokeWidth={3} />
        <Cpu x={-118} y={-26} size={52} color={C.blue} />{T('“route clear”', 40, 12, 34, C.ink, 1, 'middle', 600)}
      </g>
      {/* new route */}
      {drive2 > 0 && <polyline points={poly(partial(ROUTE_B, Math.min(1, drive2 + 0.02)))} fill="none" stroke={C.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
      <Car x={car.x} y={car.y} ang={drive2 > 0 ? car.ang : 0} />
      {chips.map((c, i) => {
        const a = ov.start + ov.dur * (0.62 + i * 0.1);
        return <g key={c} transform={`translate(${600 + i * 360},1000) scale(${pop(f, a)})`} opacity={p(f, a, a + 6)}>
          <rect x={-150} y={-44} width={300} height={88} rx={44} fill={i === 2 ? C.blue : '#fff'} stroke={C.blue} strokeWidth={4} />
          {T(c, 0, 14, 38, i === 2 ? '#fff' : C.blue, 1, 'middle', 800)}
        </g>;
      })}
    </g>
  );
};

// ------------------------------------------------ B: augmentation
const Aug: React.FC<{ f: number }> = ({ f }) => {
  const ag = B('aug'), br = B('brings');
  const split = 1 - p(f, br.start - 4, br.start + 14);
  const humanOut = p(f, ag.start + ag.dur * 0.3, ag.start + ag.dur * 0.45);
  const glow = p(f, ag.start + ag.dur * 0.65, ag.start + ag.dur * 0.8);
  const aiItems: [React.FC<any>, string][] = [[Zap, 'speed'], [ScanSearch, 'patterns'], [Calculator, 'calculation']];
  const hItems: [React.FC<any>, string][] = [[Stethoscope, 'examination'], [MessageCircle, 'communication'], [Heart, 'values'], [Scale, 'ethical judgment']];
  return (
    <g>
      <g opacity={split}>
        <rect x={120} y={200} width={800} height={640} rx={30} fill="#efe9dc" />
        {T('automation', 520, 290, 52, C.muted)}
        <g transform="translate(520,560)"><circle r={90} fill="#8a8273" /><Cpu x={-50} y={-50} size={100} color="#fff" strokeWidth={1.5} /></g>
        <g transform={`translate(${lerp(760, 1000, humanOut)},780) scale(0.5)`} opacity={1 - humanOut}><Nurse armUp={0} look={DOCTOR} /></g>
        <rect x={1000} y={200} width={800} height={640} rx={30} fill="#e3eaf8" stroke={C.blue} strokeWidth={glow * 6} />
        {T('augmentation', 1400, 290, 52, C.blue)}
        <g transform="translate(1280,780) scale(0.62)"><Nurse armUp={0.3} look={DOCTOR} blink={f % 80 < 4} /></g>
        <g transform={`translate(1580,520) scale(${0.8 + 0.2 * glow})`}><circle r={110 * glow} fill={C.blue} opacity={0.15} /><circle r={70} fill={C.blue} /><Cpu x={-38} y={-38} size={76} color="#fff" strokeWidth={1.6} /></g>
        <path d="M1380,470 Q1460,420 1520,480" stroke={C.blue} strokeWidth={5} fill="none" opacity={glow} strokeDasharray="8 8" />
      </g>
      <g opacity={1 - split}>
        <g transform="translate(560,300)"><circle r={90} fill={C.blue} /><Cpu x={-50} y={-50} size={100} color="#fff" strokeWidth={1.5} /></g>
        {T('AI brings', 560, 460, 46, C.blue)}
        {aiItems.map(([I, l], i) => {
          const a = br.start + br.dur * (0.08 + i * 0.1);
          return <g key={l} transform={`translate(${380},${540 + i * 120}) scale(${pop(f, a)})`} opacity={p(f, a, a + 6)}><circle cx={30} cy={30} r={44} fill="#e3eaf8" /><I x={6} y={6} size={48} color={C.blue} />{T(l, 100, 44, 40, C.ink, 1, 'start', 600)}</g>;
        })}
        <g transform="translate(1360,380) scale(0.55)"><Nurse armUp={0.3} look={DOCTOR} blink={f % 80 < 4} /></g>
        {T('the clinician brings', 1360, 460, 46, C.green)}
        {hItems.map(([I, l], i) => {
          const a = br.start + br.dur * (0.5 + i * 0.1);
          return <g key={l} transform={`translate(${1180},${540 + i * 110}) scale(${pop(f, a)})`} opacity={p(f, a, a + 6)}><circle cx={30} cy={30} r={44} fill="#e3eee3" /><I x={6} y={6} size={48} color={C.green} />{T(l, 100, 44, 40, C.ink, 1, 'start', 600)}</g>;
        })}
      </g>
    </g>
  );
};

// ------------------------------------------------ C: the trust dial
const DX = 960, DY = 470, DR = 300;
const arc = (a0: number, a1: number, r: number) => {
  const P = (a: number) => [DX - r * Math.cos(a), DY - r * Math.sin(a)];
  const [x0, y0] = P(a0), [x1, y1] = P(a1);
  return `M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}`;
};
const Card: React.FC<{ x: number; y: number; ok: boolean; o: number; text: string }> = ({ x, y, ok, o, text }) => (
  <g transform={`translate(${x},${y})`} opacity={o}>
    <rect x={-170} y={-50} width={340} height={100} rx={18} fill="#fff" stroke={ok ? C.green : C.red} strokeWidth={4} />
    <Cpu x={-150} y={-22} size={44} color={C.blue} />
    {T(text, 30, 14, 32, C.ink, 1, 'middle', 600)}
  </g>
);
const Verdict: React.FC<{ x: number; y: number; good: boolean; label: string; o: number; s: number }> = ({ x, y, good, label, o, s }) => (
  <g transform={`translate(${x},${y})`} opacity={o}>
    <g transform={`scale(${s})`}><circle r={40} fill={good ? C.green : C.red} />{good ? <Check x={-24} y={-24} size={48} color="#fff" strokeWidth={3} /> : <X x={-24} y={-24} size={48} color="#fff" strokeWidth={3} />}</g>
    {T(label, 0, 90, 38, good ? C.green : C.red, 1, 'middle', 800)}
  </g>
);

const Dial: React.FC<{ f: number }> = ({ f }) => {
  const dl = B('dial'), ov = B('over'), cm = B('comm'), om = B('omit'), un = B('under'), ca = B('calib');
  // needle angle in [0, PI]: 0 = full under-trust (left), PI = full automation bias (right)
  let a = Math.PI / 2 + 0.25 * Math.sin((f - dl.start) / 10) * p(f, dl.start, dl.start + 20);
  a = lerp(a, Math.PI * 0.94, p(f, ov.start, ov.start + 24));
  a = lerp(a, Math.PI * 0.06, p(f, un.start, un.start + 30));
  a = lerp(a, Math.PI / 2, p(f, ca.start, ca.start + 30));
  const nx = DX - (DR - 40) * Math.cos(a), ny = DY - (DR - 40) * Math.sin(a);
  const vig = (b: { start: number; dur: number }, nxt: number) => p(f, b.start + 6, b.start + 18) * (1 - p(f, nxt - 10, nxt));
  return (
    <g>
      <g opacity={p(f, dl.start, dl.start + 14)}>
        <path d={arc(0, Math.PI * 0.33, DR)} stroke="#f1c4ba" strokeWidth={60} fill="none" />
        <path d={arc(Math.PI * 0.33, Math.PI * 0.67, DR)} stroke="#bfe0c3" strokeWidth={60} fill="none" />
        <path d={arc(Math.PI * 0.67, Math.PI, DR)} stroke="#f1c4ba" strokeWidth={60} fill="none" />
        {T('under-trust', DX - DR - 10, DY + 70, 36, C.red, p(f, un.start, un.start + 10) * 0.7 + 0.3, 'middle', 700)}
        {T('automation bias', DX + DR + 10, DY + 70, 36, C.red, p(f, ov.start, ov.start + 10) * 0.7 + 0.3, 'middle', 700)}
        {T('calibrated trust', DX, DY - DR - 50, 40, C.green, p(f, ca.start, ca.start + 10) * 0.7 + 0.3, 'middle', 800)}
        <line x1={DX} y1={DY} x2={nx} y2={ny} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
        <circle cx={DX} cy={DY} r={26} fill={C.ink} />
        {f > ca.start + 30 && <circle cx={DX} cy={DY - DR} r={60 + 10 * Math.sin(f / 6)} fill={C.green} opacity={0.15} />}
      </g>
      {/* commission: follows a wrong suggestion */}
      <g opacity={vig(cm, om.start)}>
        <Card x={560} y={730} ok={false} o={1} text="give drug X" />
        <path d="M750,730 h120 m-20,-20 l20,20 l-20,20" stroke={C.muted} strokeWidth={6} fill="none" />
        <g transform="translate(980,770)"><circle r={60} fill="#e3eaf8" /><Pill x={-34} y={-34} size={68} color={C.blue} /></g>
        <Verdict x={1300} y={740} good={false} label="commission error" o={p(f, cm.start + cm.dur * 0.4, cm.start + cm.dur * 0.5)} s={pop(f, cm.start + cm.dur * 0.4)} />
      </g>
      {/* omission: the system stayed silent */}
      <g opacity={vig(om, un.start)}>
        <g transform="translate(560,680)"><Monitor frame={f * 2.2} alarm={0.4 + 0.3 * Math.sin(f / 3)} hr={142} /></g>
        <g transform="translate(860,760)"><circle r={60} fill="#efe9dc" /><BellOff x={-34} y={-34} size={68} color={C.muted} /></g>
        <Verdict x={1300} y={740} good={false} label="omission error" o={p(f, om.start + om.dur * 0.45, om.start + om.dur * 0.55)} s={pop(f, om.start + om.dur * 0.45)} />
      </g>
      {/* under-trust: ignores a correct suggestion */}
      <g opacity={vig(un, ca.start)}>
        <g transform={`translate(${lerp(0, -80, p(f, un.start + un.dur * 0.5, un.start + un.dur * 0.7))},0)`} opacity={1 - 0.5 * p(f, un.start + un.dur * 0.5, un.start + un.dur * 0.7)}>
          <Card x={760} y={760} ok={true} o={1} text="check potassium" />
        </g>
        <g transform={`translate(1080,760) scale(${pop(f, un.start + un.dur * 0.45)})`} opacity={p(f, un.start + un.dur * 0.45, un.start + un.dur * 0.5)}><circle r={50} fill="#efe9dc" /><Hand x={-30} y={-30} size={60} color={C.ink} /></g>
        {T('useful help, ignored', 1360, 774, 38, C.red, p(f, un.start + un.dur * 0.6, un.start + un.dur * 0.7), 'middle', 800)}
      </g>
      <foreignObject x={160} y={700} width={1600} height={200}>
        <div style={{ textAlign: 'center', font: `500 52px ${SERIF}`, color: C.ink, opacity: p(f, ca.start + ca.dur * 0.45, ca.start + ca.dur * 0.6) }}>
          Trust that <span style={HL}>matches what the system can really do</span>, with healthy scepticism.
        </div>
      </foreignObject>
    </g>
  );
};

// ------------------------------------------------ D: meaningful oversight
const Oversight: React.FC<{ f: number }> = ({ f }) => {
  const o2 = B('over2');
  const items: [React.FC<any>, string][] = [[Clock, 'time'], [FileSearch, 'information'], [Hand, 'authority to disagree']];
  const stamp = o2.start + o2.dur * 0.8;
  return (
    <g>
      {T('meaningful oversight', 960, 200, 64, C.ink, p(f, o2.start + 4, o2.start + 16), 'middle', 700)}
      {items.map(([I, l], i) => {
        const a = o2.start + o2.dur * (0.3 + i * 0.13);
        return <g key={l} transform={`translate(${480 + i * 480},440) scale(${pop(f, a)})`} opacity={p(f, a, a + 6)}>
          <circle r={110} fill="#e3eaf8" /><I x={-60} y={-60} size={120} color={C.blue} strokeWidth={1.6} />
          {T(l, 0, 190, 42, C.ink, 1, 'middle', 700)}
        </g>;
      })}
      <g transform={`translate(960,830) scale(${pop(f, stamp)})`} opacity={p(f, stamp, stamp + 6)}>
        <rect x={-260} y={-70} width={520} height={140} rx={20} fill="#fbe2dc" />
        <Stamp x={-230} y={-40} size={80} color={C.red} />
        {T('rubber stamp', 60, 16, 46, C.red, 1, 'middle', 800)}
        <line x1={-250} y1={60} x2={250} y2={-60} stroke={C.red} strokeWidth={10} strokeLinecap="round" opacity={p(f, stamp + 10, stamp + 18)} />
      </g>
    </g>
  );
};

const End: React.FC<{ f: number }> = ({ f }) => {
  const e = B('end');
  return (
    <foreignObject x={0} y={380} width={1920} height={400}>
      <div style={{ textAlign: 'center', font: `500 120px ${SERIF}`, color: C.ink, lineHeight: 1.1 }}>
        <div style={{ opacity: p(f, e.start, e.start + 12) }}><span style={HL}>AI supports.</span></div>
        <div style={{ opacity: p(f, e.start + e.dur * 0.5, e.start + e.dur * 0.5 + 12) }}>People decide.</div>
      </div>
    </foreignObject>
  );
};

export const Trust: React.FC = () => {
  const f = useCurrentFrame();
  const scenes: [React.FC<{ f: number }>, number, number][] = [
    [Nav, 0, B('aug').start], [Aug, B('aug').start, B('dial').start], [Dial, B('dial').start, B('over2').start],
    [Oversight, B('over2').start, B('end').start], [End, B('end').start, TL.total + 20],
  ];
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <svg width={1920} height={1080}>
        {scenes.map(([S, a, b], i) => {
          const o = (i === 0 ? 1 : p(f, a - 8, a + 8)) * (i === scenes.length - 1 ? 1 - p(f, TL.total - 20, TL.total - 4) : 1 - p(f, b - 8, b + 8));
          return o > 0 ? <g key={i} opacity={o}><S f={f} /></g> : null;
        })}
      </svg>
      <Narration tl={TL} />
      <Sfx at={B('closed').start + 6} name="beep" volume={0.25} />
      <Sfx at={B('closed').start + 25} name="beep" volume={0.25} />
      <Sfx at={B('override').start + 10} name="whoosh" volume={0.3} />
      <Sfx at={B('over').start} name="whoosh" volume={0.25} />
      <Sfx at={B('under').start} name="whoosh" volume={0.25} />
      <Sfx at={B('calib').start} name="ping" volume={0.2} />
      <Sfx at={B('over2').start + B('over2').dur * 0.8} name="pop" volume={0.3} />
    </AbsoluteFill>
  );
};
