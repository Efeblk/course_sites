// Shared pieces for the SWE307 explainers: scene switching, labels, cards, people, and UML shapes.
// Same look as the UNI480 videos (warm paper, flat drawings, lucide icons, few words on screen).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, makeTL, lerp, p, pop } from '../lib';
import { Narration } from '../kit';
import { Nurse, StaffLook } from '../art';

export { C, lerp, p, pop };
export const SANS = '"Segoe UI", -apple-system, "Helvetica Neue", Arial, sans-serif';
export const SERIF = 'Georgia, "Iowan Old Style", Charter, serif';
export const MONO = 'Consolas, "SF Mono", Menlo, monospace';
export const PURPLE = '#7a3f98';
export const HL = '#f6d765';

/** Timeline helpers + `at(id, frac)` = frame `frac` of the way through a beat. */
export const tl = (t: unknown) => {
  const r = makeTL(t);
  const at = (id: string, frac = 0) => r.B(id).start + r.B(id).dur * frac;
  return { ...r, at };
};

/** text (SVG) */
export const T: React.FC<{ x: number; y: number; s?: number; c?: string; w?: number; a?: 'start' | 'middle' | 'end'; o?: number; f?: string; children: React.ReactNode; ls?: number }> =
  ({ x, y, s = 36, c = C.ink, w = 600, a = 'middle', o = 1, f = SANS, children, ls }) =>
    <text x={x} y={y} textAnchor={a} fontFamily={f} fontWeight={w} fontSize={s} fill={c} opacity={o} letterSpacing={ls}>{children}</text>;

/** Small scene label at the top, like the UNI480 videos. */
export const Label: React.FC<{ f: number; a: number; children: React.ReactNode; y?: number; c?: string }> = ({ f, a, children, y = 92, c = C.blue }) =>
  <g opacity={p(f, a, a + 12)} transform={`translate(0,${(1 - p(f, a, a + 14)) * 14})`}>
    <T x={960} y={y} s={40} c={c} w={700}>{children}</T>
  </g>;

/** Scenes cross-fade: [Component, startFrame][]; each ends where the next begins. */
export type Scene = [React.FC<{ f: number }>, number];
export const Video: React.FC<{ t: unknown; scenes: Scene[]; children?: React.ReactNode; bg?: string }> = ({ t, scenes, children, bg = C.paper }) => {
  const f = useCurrentFrame();
  const { TL } = makeTL(t);
  return (
    <AbsoluteFill style={{ background: bg }}>
      <svg width={1920} height={1080}>
        {scenes.map(([S, a], i) => {
          const b = i + 1 < scenes.length ? scenes[i + 1][1] : TL.total + 30;
          const o = (i === 0 ? 1 : p(f, a - 8, a + 8)) * (i === scenes.length - 1 ? 1 - p(f, TL.total - 18, TL.total - 2) : 1 - p(f, b - 8, b + 8));
          return o > 0.001 ? <g key={i} opacity={o}><S f={f} /></g> : null;
        })}
      </svg>
      <Narration tl={TL} />
      {children}
    </AbsoluteFill>
  );
};

/** card with a soft shadow; origin = top-left */
export const Card: React.FC<{ x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; sw?: number; o?: number; children?: React.ReactNode; dash?: string }> =
  ({ x, y, w, h, fill = '#fbf9f4', stroke = '#d9d1c1', r = 22, sw = 3, o = 1, children, dash }) =>
    <g transform={`translate(${x},${y})`} opacity={o}>
      <rect x={4} y={8} width={w} height={h} rx={r} fill="rgba(60,50,30,.08)" />
      <rect width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
      {children}
    </g>;

/** pops in at frame a around its centre (cx, cy) */
export const Pop: React.FC<{ f: number; a: number; x: number; y: number; children: React.ReactNode; d?: number; out?: number }> = ({ f, a, x, y, children, d = 14, out }) => {
  const k = pop(f, a, d), o = p(f, a, a + 6) * (out ? 1 - p(f, out, out + 10) : 1);
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(${x},${y}) scale(${k})`}>{children}</g>;
};
/** rises in at frame a */
export const Rise: React.FC<{ f: number; a: number; children: React.ReactNode; dy?: number; out?: number }> = ({ f, a, children, dy = 24, out }) => {
  const o = p(f, a, a + 12) * (out ? 1 - p(f, out, out + 10) : 1);
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(0,${(1 - p(f, a, a + 16)) * dy})`}>{children}</g>;
};

/** lucide icon centred in a filled circle */
export const IconDot: React.FC<{ I: React.FC<any>; r?: number; bg?: string; fg?: string; ring?: string }> = ({ I, r = 54, bg = C.blue, fg = '#fff', ring }) =>
  <g>
    {ring && <circle r={r + 10} fill="none" stroke={ring} strokeWidth={4} />}
    <circle r={r} fill={bg} />
    <I x={-r * 0.55} y={-r * 0.55} size={r * 1.1} color={fg} strokeWidth={1.8} />
  </g>;

/** pill tag centred at origin */
export const Pill: React.FC<{ text: string; bg?: string; fg?: string; s?: number; w?: number; h?: number; stroke?: string }> = ({ text, bg = C.blue, fg = '#fff', s = 30, w, h, stroke }) => {
  const W = w ?? text.length * s * 0.58 + s * 1.4, H = h ?? s * 1.8;
  return <g><rect x={-W / 2} y={-H / 2} width={W} height={H} rx={H / 2} fill={bg} stroke={stroke} strokeWidth={stroke ? 3 : 0} /><T x={0} y={s * 0.36} s={s} c={fg} w={700}>{text}</T></g>;
};

/** green check / red cross badge */
export const Badge: React.FC<{ ok: boolean; r?: number }> = ({ ok, r = 28 }) =>
  <g><circle r={r} fill={ok ? C.green : C.red} />
    {ok ? <path d={`M${-r * 0.45},0 L${-r * 0.1},${r * 0.35} L${r * 0.5},${-r * 0.35}`} stroke="#fff" strokeWidth={r * 0.22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d={`M${-r * 0.35},${-r * 0.35} L${r * 0.35},${r * 0.35} M${r * 0.35},${-r * 0.35} L${-r * 0.35},${r * 0.35}`} stroke="#fff" strokeWidth={r * 0.22} strokeLinecap="round" />}
  </g>;

/** a document sheet with a label; origin = centre */
export const Doc: React.FC<{ label: string; col?: string; w?: number; h?: number; s?: number }> = ({ label, col = C.blue, w = 150, h = 190, s = 34 }) =>
  <g>
    <rect x={-w / 2 + 5} y={-h / 2 + 9} width={w} height={h} rx={10} fill="rgba(60,50,30,.1)" />
    <path d={`M${-w / 2},${-h / 2} h${w - 36} l36,36 v${h - 36} h${-w} z`} fill="#fff" stroke={col} strokeWidth={4} />
    <path d={`M${w / 2 - 36},${-h / 2} v36 h36`} fill="none" stroke={col} strokeWidth={4} />
    {[0, 1, 2].map(i => <rect key={i} x={-w / 2 + 22} y={-h / 2 + 52 + i * 22} width={w - 60 - i * 18} height={8} rx={4} fill="#e2dccd" />)}
    <rect x={-w / 2 + 14} y={h / 2 - 62} width={w - 28} height={46} rx={10} fill={col} />
    <T x={0} y={h / 2 - 27} s={s} c="#fff" w={800}>{label}</T>
  </g>;

/** office person (reuses the UNI480 figure without the nurse cap); origin = feet centre, ~600px tall at scale 1 */
const LOOKS: StaffLook[] = [
  { cap: false, scrub: '#5a78c8', scrubDark: '#3d5596', hair: '#2a2420', skin: '#c98e66' },
  { cap: false, scrub: '#c8805a', scrubDark: '#9a5d3d', hair: '#5a3a22', skin: '#f0c9a4' },
  { cap: false, scrub: '#3b8f8c', scrubDark: '#2f6f6c', hair: '#1d1a18', skin: '#8d5a3c' },
  { cap: false, scrub: '#8a74b8', scrubDark: '#65528f', hair: '#7a4a2a', skin: '#e2b48c' },
  { cap: false, scrub: '#d0a03a', scrubDark: '#a77d26', hair: '#2a2420', skin: '#d9a37a' },
];
export const Person: React.FC<{ v?: number; s?: number; tired?: number; arm?: number; coat?: boolean }> = ({ v = 0, s = 0.4, tired = 0, arm = 0, coat }) =>
  <g transform={`scale(${s})`}><Nurse look={{ ...LOOKS[v % LOOKS.length], coat }} tired={tired} armUp={arm} /></g>;

/** straight arrow from (x1,y1) to (x2,y2), drawn to fraction t. head: 'open' | 'fill' | 'tri' (hollow triangle) | 'none' */
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; t?: number; c?: string; sw?: number; dash?: string; head?: 'open' | 'fill' | 'tri' | 'none'; hs?: number }> =
  ({ x1, y1, x2, y2, t = 1, c = C.ink, sw = 5, dash, head = 'open', hs = 22 }) => {
    if (t <= 0) return null;
    const ex = lerp(x1, x2, t), ey = lerp(y1, y2, t), ang = Math.atan2(y2 - y1, x2 - x1);
    const pt = (dx: number, dy: number) => `${ex + dx * Math.cos(ang) - dy * Math.sin(ang)},${ey + dx * Math.sin(ang) + dy * Math.cos(ang)}`;
    const back = head === 'tri' ? hs : 0;
    const lx = ex - back * Math.cos(ang), ly = ey - back * Math.sin(ang);
    return <g>
      <line x1={x1} y1={y1} x2={head === 'tri' ? lx : ex} y2={head === 'tri' ? ly : ey} stroke={c} strokeWidth={sw} strokeDasharray={dash} strokeLinecap="round" />
      {head === 'open' && <polyline points={`${pt(-hs, -hs * 0.6)} ${pt(0, 0)} ${pt(-hs, hs * 0.6)}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />}
      {head === 'fill' && <polygon points={`${pt(-hs, -hs * 0.55)} ${pt(0, 0)} ${pt(-hs, hs * 0.55)}`} fill={c} />}
      {head === 'tri' && <polygon points={`${pt(-hs, -hs * 0.65)} ${pt(0, 0)} ${pt(-hs, hs * 0.65)}`} fill="#fff" stroke={c} strokeWidth={sw * 0.8} strokeLinejoin="round" />}
    </g>;
  };

/** counter that counts up from 0 to `to` between frames a and b */
export const count = (f: number, a: number, b: number, to: number, dec = 0) => (to * p(f, a, b)).toFixed(dec);

// ---------------------------------------------------------------- UML shapes (all centred on origin)
export const StickActor: React.FC<{ name?: string; c?: string; s?: number; nameY?: number }> = ({ name, c = C.ink, s = 1, nameY = 150 }) =>
  <g transform={`scale(${s})`}>
    <circle cx={0} cy={-80} r={26} fill="#fff" stroke={c} strokeWidth={6} />
    <path d="M0,-54 V30 M-50,-20 H50 M0,30 L-38,95 M0,30 L38,95" stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" />
    {name && <T x={0} y={nameY} s={34} w={700} c={c}>{name}</T>}
  </g>;
export const Oval: React.FC<{ text: string; w?: number; h?: number; fill?: string; stroke?: string; s?: number }> = ({ text, w = 340, h = 110, fill = '#fff', stroke = C.ink, s = 32 }) =>
  <g><ellipse rx={w / 2} ry={h / 2} fill={fill} stroke={stroke} strokeWidth={5} /><T x={0} y={s * 0.35} s={s} w={600}>{text}</T></g>;
export const ActionBox: React.FC<{ text: string; w?: number; h?: number; fill?: string; stroke?: string; s?: number }> = ({ text, w = 300, h = 96, fill = '#fff', stroke = C.ink, s = 32 }) =>
  <g><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2.4} fill={fill} stroke={stroke} strokeWidth={5} /><T x={0} y={s * 0.35} s={s} w={600}>{text}</T></g>;
export const Diamond: React.FC<{ r?: number; fill?: string; stroke?: string }> = ({ r = 46, fill = '#fff', stroke = C.ink }) =>
  <polygon points={`0,${-r} ${r},0 0,${r} ${-r},0`} fill={fill} stroke={stroke} strokeWidth={5} />;
export const Bar: React.FC<{ w?: number; vertical?: boolean; c?: string }> = ({ w = 300, vertical, c = C.ink }) =>
  vertical ? <rect x={-9} y={-w / 2} width={18} height={w} rx={4} fill={c} /> : <rect x={-w / 2} y={-9} width={w} height={18} rx={4} fill={c} />;
export const InitialDot: React.FC<{ r?: number; c?: string }> = ({ r = 26, c = C.ink }) => <circle r={r} fill={c} />;
export const ActivityFinal: React.FC<{ r?: number; c?: string }> = ({ r = 30, c = C.ink }) =>
  <g><circle r={r} fill="#fff" stroke={c} strokeWidth={5} /><circle r={r * 0.6} fill={c} /></g>;
export const FlowFinal: React.FC<{ r?: number; c?: string }> = ({ r = 30, c = C.ink }) =>
  <g><circle r={r} fill="#fff" stroke={c} strokeWidth={5} /><path d={`M${-r * 0.7},${-r * 0.7} L${r * 0.7},${r * 0.7} M${r * 0.7},${-r * 0.7} L${-r * 0.7},${r * 0.7}`} stroke={c} strokeWidth={5} /></g>;
export const StateBox: React.FC<{ text: string; w?: number; h?: number; fill?: string; stroke?: string; s?: number; sub?: string }> = ({ text, w = 260, h = 96, fill = '#fff', stroke = C.ink, s = 32, sub }) =>
  <g><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={fill} stroke={stroke} strokeWidth={5} />
    <T x={0} y={sub ? -4 : s * 0.35} s={s} w={700}>{text}</T>
    {sub && <T x={0} y={30} s={22} w={500} c={C.muted} f={MONO}>{sub}</T>}
  </g>;
/** token: a glowing dot */
export const Token: React.FC<{ x: number; y: number; c?: string; o?: number }> = ({ x, y, c = C.amber, o = 1 }) =>
  <g opacity={o}><circle cx={x} cy={y} r={30} fill={c} opacity={0.25} /><circle cx={x} cy={y} r={16} fill={c} stroke="#fff" strokeWidth={4} /></g>;

/** point along a polyline at fraction t */
export type Pt = [number, number];
export const along = (pts: Pt[], t: number): Pt => {
  const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let d = segs.reduce((a, b) => a + b, 0) * Math.max(0, Math.min(1, t));
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) { const u = segs[i] ? Math.min(1, d / segs[i]) : 0; return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)]; }
    d -= segs[i];
  }
  return pts[0];
};

/** "For the exam" checklist scene body: rows tick in one by one */
export const ExamList: React.FC<{ f: number; a: number; rows: [string, string][]; title?: string; step?: number }> = ({ f, a, rows, title = 'For the exam', step = 26 }) =>
  <g>
    <Label f={f} a={a}>{title}</Label>
    {rows.map(([k, v], i) => {
      const s = a + 14 + i * step;
      return <Rise key={i} f={f} a={s}>
        <g transform={`translate(260,${190 + i * (720 / rows.length)})`}>
          <g transform="translate(0,-12)" opacity={p(f, s + 8, s + 14)}><Badge ok r={22} /></g>
          <T x={50} y={0} s={40} a="start" w={800} c={C.blue}>{k}</T>
          <T x={560} y={0} s={36} a="start" w={500}>{v}</T>
        </g>
      </Rise>;
    })}
  </g>;
