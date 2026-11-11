// Shared pieces for the COE305 (Machine Learning) episodes. Builds on the COE303 kit (camera, cast, Head, Tag, Exam,
// Episode frame); adds plot axes, data dots, neuron units and the series' title-card icon.
import React from 'react';
import { C, Episode, MONO, SANS, Scene, clamp, p, pop } from '../os/kit';

export * from '../os/kit';

/** the title-card icon: three inputs feeding one unit; centred at the origin, about 230 px wide */
export const NeuronIcon: React.FC<{ f: number }> = ({ f }) => {
  const ins = [-80, 0, 80];
  const pulse = (f % 40) / 40;
  return <g>
    {ins.map((y, i) => <g key={i}>
      <line x1={-150} y1={y} x2={10} y2={0} stroke="#a49b86" strokeWidth={8} />
      <circle cx={-150} cy={y} r={30} fill={[C.blue, C.amber, C.teal][i]} />
    </g>)}
    <circle cx={-150 + 160 * pulse} cy={-80 + 80 * pulse} r={10} fill={C.amber} opacity={p(f, 10, 20)} />
    <line x1={60} y1={0} x2={170} y2={0} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M150,-18 L176,0 L150,18" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={10} cy={0} r={70} fill="#2f2c27" />
    <text x={10} y={22} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={64} fill="#f6d765">Σ</text>
  </g>;
};

export const MlEpisode: React.FC<{ t: unknown; scenes: Scene[]; ch: string; title: string; children?: React.ReactNode }> = (props) =>
  <Episode {...props} code="COE305" subject="MACHINE LEARNING" icon={(f) => <NeuronIcon f={f} />} />;

// ---------------------------------------------------------------- plots
export type Ax = { x: number; y: number; w: number; h: number; X: (v: number) => number; Y: (v: number) => number };
/** a plot box: (x, y) = top-left in pixels, data range [x0, x1] × [y0, y1] */
export const ax = (x: number, y: number, w: number, h: number, xr: [number, number], yr: [number, number]): Ax => ({
  x, y, w, h,
  X: (v: number) => x + ((v - xr[0]) / (xr[1] - xr[0])) * w,
  Y: (v: number) => y + h - ((v - yr[0]) / (yr[1] - yr[0])) * h,
});
/** L-shaped axes with arrow tips and labels; draws in over frames a..a+16 */
export const Axes: React.FC<{ f: number; a: number; A: Ax; xl?: string; yl?: string; o?: number; s?: number; origin?: [number, number] }> =
  ({ f, a, A, xl, yl, o = 1, s = 30, origin }) => {
    const t = p(f, a, a + 16);
    if (t <= 0 || o <= 0) return null;
    const ox = origin ? A.X(origin[0]) : A.x, oy = origin ? A.Y(origin[1]) : A.y + A.h;
    return <g opacity={o * Math.min(1, t * 2)}>
      <line x1={A.x - 10} y1={oy} x2={A.x - 10 + (A.w + 40) * t} y2={oy} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <line x1={ox} y1={A.y + A.h + 10} x2={ox} y2={A.y + A.h + 10 - (A.h + 40) * t} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d={`M${A.x + A.w + 18},${oy - 10} l14,10 l-14,10`} fill="none" stroke={C.ink} strokeWidth={4} opacity={t} />
      <path d={`M${ox - 10},${A.y - 18} l10,-14 l10,14`} fill="none" stroke={C.ink} strokeWidth={4} opacity={t} />
      {xl && <text x={A.x + A.w + 20} y={oy + 48} textAnchor="end" fontFamily={SANS} fontWeight={700} fontSize={s} fill={C.muted} opacity={t}>{xl}</text>}
      {yl && <text x={ox + 22} y={A.y - 6} fontFamily={SANS} fontWeight={700} fontSize={s} fill={C.muted} opacity={t}>{yl}</text>}
    </g>;
  };
/** a polyline through data points, drawn in between frames a and b */
export const Curve: React.FC<{ f: number; a: number; b: number; A: Ax; fn: (x: number) => number; x0: number; x1: number; c?: string; sw?: number; n?: number; o?: number; dash?: string }> =
  ({ f, a, b, A, fn, x0, x1, c = C.blue, sw = 6, n = 80, o = 1, dash }) => {
    const t = p(f, a, b);
    if (t <= 0 || o <= 0) return null;
    const pts = Array.from({ length: n + 1 }, (_, i) => x0 + ((x1 - x0) * i) / n);
    const d = pts.map((x, i) => `${i ? 'L' : 'M'}${A.X(x).toFixed(1)},${A.Y(fn(x)).toFixed(1)}`).join(' ');
    return dash
      ? <path d={d} stroke={c} strokeWidth={sw} fill="none" strokeDasharray={dash} opacity={o * t} />
      : <path d={d} stroke={c} strokeWidth={sw} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} strokeLinecap="round" strokeLinejoin="round" opacity={o} />;
  };

/** a data dot that pops in at frame a */
export const Dot: React.FC<{ f: number; a: number; x: number; y: number; c?: string; r?: number; o?: number; ring?: boolean; label?: string }> =
  ({ f, a, x, y, c = C.blue, r = 14, o = 1, ring, label }) => {
    const k = pop(f, a, 12);
    if (k <= 0 || o <= 0) return null;
    return <g transform={`translate(${x},${y}) scale(${k})`} opacity={o}>
      <circle r={r} fill={ring ? '#fbf9f4' : c} stroke={ring ? c : '#fbf9f4'} strokeWidth={ring ? 5 : 3} />
      {label && <text y={r * 0.36} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={r * 1.05} fill={ring ? c : '#fff'}>{label}</text>}
    </g>;
  };

/** a neuron unit: circle with text; (x, y) = centre */
export const Unit: React.FC<{ x: number; y: number; r?: number; text: string; c?: string; fill?: string; fg?: string; o?: number; k?: number; s?: number; glow?: number }> =
  ({ x, y, r = 56, text, c = C.ink, fill = '#fbf9f4', fg, o = 1, k = 1, s, glow = 0 }) => {
    if (o <= 0.001 || k <= 0) return null;
    return <g transform={`translate(${x},${y}) scale(${k})`} opacity={o}>
      {glow > 0 && <circle r={r + 14 + glow * 10} fill="none" stroke={C.amber} strokeWidth={6} opacity={glow * 0.7} />}
      <circle r={r} fill={fill} stroke={c} strokeWidth={5} />
      <text y={(s ?? r * 0.62) * 0.36} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={s ?? r * 0.62} fill={fg ?? c}>{text}</text>
    </g>;
  };

/** a straight connection that draws itself, with an optional label at fraction lt along it */
export const Wire: React.FC<{ f: number; a: number; x1: number; y1: number; x2: number; y2: number; c?: string; sw?: number; label?: string; lt?: number; lc?: string; ls?: number; o?: number; dy?: number }> =
  ({ f, a, x1, y1, x2, y2, c = '#a49b86', sw = 6, label, lt = 0.45, lc = C.ink, ls = 30, o = 1, dy = -16 }) => {
    const t = p(f, a, a + 14);
    if (t <= 0 || o <= 0) return null;
    return <g opacity={o}>
      <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * t} y2={y1 + (y2 - y1) * t} stroke={c} strokeWidth={sw} strokeLinecap="round" />
      {label && <text x={x1 + (x2 - x1) * lt} y={y1 + (y2 - y1) * lt + dy} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={ls} fill={lc} opacity={p(f, a + 8, a + 16)}>{label}</text>}
    </g>;
  };

/** a token that travels from (x1, y1) to (x2, y2) between frames s and s+d */
export const Pulse: React.FC<{ f: number; s: number; d?: number; x1: number; y1: number; x2: number; y2: number; c?: string; r?: number; text?: string }> =
  ({ f, s, d = 18, x1, y1, x2, y2, c = C.amber, r = 14, text }) => {
    if (f < s || f > s + d + 3) return null;
    const t = clamp((f - s) / d);
    const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
    return <g transform={`translate(${x},${y})`} opacity={1 - p(f, s + d, s + d + 3)}>
      <circle r={text ? r * 2 : r} fill={c} />
      {text && <text y={r * 0.6} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={r * 1.5} fill="#fff">{text}</text>}
    </g>;
  };

/** a number that counts up from `from` to `to` between frames a and b */
export const num = (f: number, a: number, b: number, from: number, to: number, dec = 2) => (from + (to - from) * p(f, a, b)).toFixed(dec);

/** deterministic pseudo-random in [0, 1) */
export const rnd = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
/** approximately standard normal from two rnd() values */
export const gauss = (i: number) => Math.sqrt(-2 * Math.log(1 - rnd(i * 2 + 1) * 0.999)) * Math.cos(2 * Math.PI * rnd(i * 2 + 2));
