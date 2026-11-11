// Shared pieces for the COE303 (Operating Systems) episodes.
// One cast across the series: processes are small characters (P1 blue, P2 amber, ...), the CPU is a chip they stand on.
// Motion vocabulary: a camera that pans and zooms inside a scene, characters that hop, squash and blink,
// and a scheduling simulator that moves the characters between the ready queue, the CPU and the done shelf.
import React from 'react';
import { AbsoluteFill, Easing, interpolateColors, useCurrentFrame } from 'remotion';
import { C, lerp, makeTL, p, pop } from '../lib';
import { Narration, Sfx } from '../kit';
import { T, SANS, SERIF, MONO, PURPLE, HL } from '../swe/kit';

export { C, lerp, p, pop, T, SANS, SERIF, MONO, PURPLE, HL, Sfx };
export { Arrow, Badge, Card, Pill, Pop, Rise, along } from '../swe/kit';

export const INK2 = '#4a463e';
export const KZONE = '#e6dccb';          // kernel-space tint
export const PC: Record<string, string> = { P1: C.blue, P2: C.amber, P3: C.teal, P4: PURPLE, P5: C.red, P0: C.teal };
export const io = Easing.bezier(0.45, 0, 0.25, 1);
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const mixC = (a: string, b: string, t: number) => interpolateColors(clamp(t), [0, 1], [a, b]);

/** timeline helpers: at(id, frac) = frame `frac` of the way through a beat */
export const tl = (t: unknown) => {
  const r = makeTL(t);
  const at = (id: string, frac = 0) => r.B(id).start + r.B(id).dur * frac;
  return { ...r, at };
};

/** fade in at a, out at b (both optional) */
export const win = (f: number, a: number, b = 1e9, d = 10) => p(f, a, a + d) * (1 - p(f, b - d, b));

// ---------------------------------------------------------------- camera
export type CamKey = { at: number; x: number; y: number; z: number; d?: number };
export const camAt = (f: number, keys: CamKey[]) => {
  let x = keys[0].x, y = keys[0].y, lz = Math.log(keys[0].z);
  for (const k of keys.slice(1)) {
    const t = p(f, k.at, k.at + (k.d ?? 36), io);
    x = lerp(x, k.x, t); y = lerp(y, k.y, t); lz = lerp(lz, Math.log(k.z), t);
  }
  return { x, y, z: Math.exp(lz) };
};
/** world group seen through a camera centred on (x, y) at zoom z */
export const Cam: React.FC<{ f: number; keys: CamKey[]; children: React.ReactNode }> = ({ f, keys, children }) => {
  const { x, y, z } = camAt(f, keys);
  return <g transform={`translate(960 540) scale(${z}) translate(${-x} ${-y})`}>{children}</g>;
};

// ---------------------------------------------------------------- motion
/** hop from a to b between frames s and s+d; returns position and squash (-: stretched in the air, +: squashed on landing) */
export const hop = (f: number, s: number, d: number, a: [number, number], b: [number, number], h = 90) => {
  const t = p(f, s, s + d, io);
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const hh = Math.min(h, dist * 0.45);
  const land = f - (s + d);
  const sq = t > 0 && t < 1 ? -0.22 * Math.sin(t * Math.PI) : land >= 0 && land < 12 && dist > 1 ? 0.5 * Math.sin((land / 12) * Math.PI) * (1 - land / 12) : 0;
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - hh * 4 * t * (1 - t), sq, t };
};
/** a path of hops: keys sorted by `at`; before the first key the character sits at keys[0] */
export type Key = { at: number; x: number; y: number; d?: number; h?: number };
export const track = (f: number, keys: Key[]) => {
  let i = 0;
  for (let k = 1; k < keys.length; k++) if (f >= keys[k].at) i = k;
  if (i === 0) return { x: keys[0].x, y: keys[0].y, sq: 0, t: 1 };
  const a = keys[i - 1], b = keys[i];
  return hop(f, b.at, b.d ?? 16, [a.x, a.y], [b.x, b.y], b.h ?? 90);
};
/** shake offset for a rejected move, starting at frame a */
export const shake = (f: number, a: number, d = 18, amp = 14) => (f < a || f > a + d ? 0 : Math.sin(((f - a) / d) * Math.PI * 6) * amp * (1 - (f - a) / d));

// ---------------------------------------------------------------- the cast
export type Mood = 'ok' | 'happy' | 'sad' | 'sleep' | 'worried' | 'dizzy' | 'focus';
/** a process character; origin = feet centre, about 140 px tall at s = 1 */
export const Proc: React.FC<{
  f: number; x: number; y: number; c?: string; label?: string; s?: number; seed?: number; mood?: Mood;
  look?: [number, number]; sq?: number; grey?: number; o?: number; rot?: number; children?: React.ReactNode; w?: number;
}> = ({ f, x, y, c = C.blue, label, s = 1, seed = 0, mood = 'ok', look = [0, 0], sq = 0, grey = 0, o = 1, rot = 0, children, w = 112 }) => {
  if (o <= 0.001) return null;
  const col = mixC(c, '#b4ad9f', grey);
  const breathe = 1 + 0.018 * Math.sin(f / 9 + seed * 2.1);
  const sx = (1 + 0.16 * sq) / Math.sqrt(breathe), sy = (1 - 0.16 * sq) * breathe;
  const cyc = (f + seed * 41) % 120;
  const blink = mood === 'sleep' ? 0.08 : cyc < 3 ? 0.12 : cyc < 6 ? 0.5 : 1;
  const H = 150, W = w;
  const ey = -H + 46, lx = clamp(look[0], -1, 1) * 6, ly = clamp(look[1], -1, 1) * 5;
  const mouth = {
    ok: `M-12,${ey + 36} Q0,${ey + 42} 12,${ey + 36}`,
    happy: `M-16,${ey + 32} Q0,${ey + 50} 16,${ey + 32}`,
    sad: `M-14,${ey + 42} Q0,${ey + 30} 14,${ey + 42}`,
    worried: `M-15,${ey + 40} q7.5,-7 15,0 t15,0`,
    sleep: `M-8,${ey + 38} h16`,
    dizzy: `M-14,${ey + 38} q7,6 14,0 t14,0`,
    focus: `M-10,${ey + 38} h20`,
  }[mood];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={3} rx={W * 0.5} ry={9} fill="rgba(40,30,15,.13)" />
      <g transform={`scale(${sx},${sy})`}>
        <rect x={-W / 2} y={-H} width={W} height={H - 6} rx={36} fill={col} />
        <rect x={-W / 2 + 12} y={-H + 10} width={W * 0.34} height={20} rx={10} fill="#fff" opacity={0.22} />
        <ellipse cx={-W * 0.22} cy={-4} rx={17} ry={8} fill={mixC(col, '#000', 0.35)} />
        <ellipse cx={W * 0.22} cy={-4} rx={17} ry={8} fill={mixC(col, '#000', 0.35)} />
        {mood === 'dizzy'
          ? [-1, 1].map(k => <path key={k} d={`M${k * 22 - 8},${ey - 8} l16,16 M${k * 22 + 8},${ey - 8} l-16,16`} stroke="#fff" strokeWidth={5} strokeLinecap="round" />)
          : [-1, 1].map(k => <g key={k} transform={`translate(${k * 22},${ey}) scale(1,${blink})`}>
            <ellipse rx={14} ry={16} fill="#fff" />
            {mood !== 'sleep' && <circle cx={lx} cy={ly + 2} r={7} fill={C.ink} />}
            {mood === 'worried' && <path d={`M${-12 * k - 2},-24 l${16 * k},-6`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
          </g>)}
        <path d={mouth} stroke={C.ink} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        {label && <text x={0} y={-20} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={label.length > 3 ? 24 : 29} fill="#fff">{label}</text>}
      </g>
      {children}
    </g>
  );
};

/** small rounded tag centred at (x, y) */
export const Tag: React.FC<{ x: number; y: number; text: string; bg?: string; fg?: string; s?: number; o?: number; mono?: boolean; stroke?: string }> =
  ({ x, y, text, bg = '#fff', fg = C.ink, s = 26, o = 1, mono, stroke = 'rgba(40,30,15,.18)' }) => {
    if (o <= 0.001) return null;
    const w = text.length * s * (mono ? 0.62 : 0.56) + s * 1.1, h = s * 1.55;
    return <g opacity={o} transform={`translate(${x},${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={bg} stroke={stroke} strokeWidth={2} />
      <text x={0} y={s * 0.36} textAnchor="middle" fontFamily={mono ? MONO : SANS} fontWeight={700} fontSize={s} fill={fg}>{text}</text>
    </g>;
  };

/** speech bubble with its tail pointing down-left (dir = -1) or down-right (dir = 1); origin = tail tip */
export const Bubble: React.FC<{ x: number; y: number; text: string; o?: number; s?: number; dir?: 1 | -1; bg?: string; fg?: string; k?: number }> =
  ({ x, y, text, o = 1, s = 32, dir = 1, bg = '#fff', fg = C.ink, k = 1 }) => {
    if (o <= 0.001) return null;
    const w = text.length * s * 0.56 + s * 1.4, h = s * 1.9;
    const bx = dir === 1 ? -26 : -w + 26;
    return <g opacity={o} transform={`translate(${x},${y}) scale(${k})`}>
      <path d={`M0,0 L${dir * 8},-30 L${dir * 40},-30 Z`} fill={bg} stroke="rgba(40,30,15,.25)" strokeWidth={2} />
      <rect x={bx} y={-30 - h} width={w} height={h} rx={h / 2.2} fill={bg} stroke="rgba(40,30,15,.25)" strokeWidth={2} />
      <rect x={dir === 1 ? 2 : -38} y={-34} width={34} height={8} fill={bg} />
      <text x={bx + w / 2} y={-30 - h / 2 + s * 0.36} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={s} fill={fg}>{text}</text>
    </g>;
  };

/** the CPU: a chip; (x, y) = centre. busy 0..1 makes it glow and ripple */
export const Chip: React.FC<{ f: number; x: number; y: number; s?: number; busy?: number; label?: string; o?: number; heat?: number }> =
  ({ f, x, y, s = 1, busy = 0, label = 'CPU', o = 1, heat = 0 }) => {
    if (o <= 0.001) return null;
    const S = 230, pins = 6;
    return <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
      {busy > 0 && [0, 1, 2].map(i => {
        const ph = ((f + i * 20) % 60) / 60;
        return <rect key={i} x={-S / 2 - 10 - ph * 70} y={-S / 2 - 10 - ph * 70} width={S + 20 + ph * 140} height={S + 20 + ph * 140} rx={40 + ph * 40}
          fill="none" stroke={C.amber} strokeWidth={4} opacity={busy * (1 - ph) * 0.5} />;
      })}
      {Array.from({ length: pins }, (_, i) => {
        const o2 = -S / 2 + 30 + i * ((S - 60) / (pins - 1));
        return <g key={i} fill="#a49b86">
          <rect x={o2 - 6} y={-S / 2 - 22} width={12} height={24} rx={3} /><rect x={o2 - 6} y={S / 2 - 2} width={12} height={24} rx={3} />
          <rect x={-S / 2 - 22} y={o2 - 6} width={24} height={12} rx={3} /><rect x={S / 2 - 2} y={o2 - 6} width={24} height={12} rx={3} />
        </g>;
      })}
      <rect x={-S / 2} y={-S / 2} width={S} height={S} rx={26} fill={mixC('#2f2c27', '#5a2a1f', heat)} />
      <rect x={-S / 2 + 22} y={-S / 2 + 22} width={S - 44} height={S - 44} rx={16} fill={mixC('#3d3a33', '#4a3a22', busy * 0.6)} stroke={mixC('#55514a', C.amber, busy)} strokeWidth={3} />
      <text x={0} y={-S / 2 + 56} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill="#d9d1c1" letterSpacing={4}>{label}</text>
    </g>;
  };

/** a device box with a lucide icon; (x, y) = centre */
export const Device: React.FC<{ x: number; y: number; I: React.FC<any>; label?: string; o?: number; c?: string; s?: number; ring?: number }> =
  ({ x, y, I, label, o = 1, c = C.ink, s = 1, ring = 0 }) => {
    if (o <= 0.001) return null;
    return <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
      {ring > 0 && <circle r={84 + ring * 30} fill="none" stroke={C.amber} strokeWidth={6} opacity={1 - ring} />}
      <rect x={-72} y={-72} width={144} height={144} rx={30} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
      <I x={-40} y={-40} size={80} color={c} strokeWidth={1.7} />
      {label && <text x={0} y={112} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={30} fill={C.ink}>{label}</text>}
    </g>;
  };

/** monospace code card; hl = highlighted line (fractional values slide the bar), typed 0..1 per line */
export const Code: React.FC<{ x: number; y: number; lines: string[]; w?: number; s?: number; hl?: number; hlc?: string; o?: number; title?: string; typed?: number[]; dim?: number[]; lh?: number }> =
  ({ x, y, lines, w = 640, s = 30, hl = -1, hlc = HL, o = 1, title, typed, dim = [], lh }) => {
    if (o <= 0.001) return null;
    const L = lh ?? s * 1.55, top = title ? 62 : 26, h = top + lines.length * L + 20;
    return <g transform={`translate(${x},${y})`} opacity={o}>
      <rect x={5} y={9} width={w} height={h} rx={18} fill="rgba(60,50,30,.08)" />
      <rect width={w} height={h} rx={18} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
      {title && <text x={26} y={44} fontFamily={SANS} fontWeight={800} fontSize={s * 0.95} fill={C.muted}>{title}</text>}
      {hl >= 0 && <rect x={12} y={top + hl * L + 4} width={w - 24} height={L - 4} rx={10} fill={hlc} opacity={0.85} />}
      {lines.map((ln, i) => {
        const t = typed ? clamp(typed[i] ?? 1) : 1;
        const shown = ln.slice(0, Math.round(ln.length * t));
        return <text key={i} x={28} y={top + i * L + L * 0.68} fontFamily={MONO} fontWeight={600} fontSize={s} fill={dim.includes(i) ? C.muted : C.ink} xmlSpace="preserve">{shown}</text>;
      })}
    </g>;
  };

/** a labelled value box (memory word or register); (x, y) = centre */
export const Cell: React.FC<{ x: number; y: number; name: string; v: React.ReactNode; c?: string; o?: number; w?: number; flash?: number; s?: number; vc?: string }> =
  ({ x, y, name, v, c = C.ink, o = 1, w = 200, flash = 0, s = 1, vc }) => {
    if (o <= 0.001) return null;
    return <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
      <text x={0} y={-62} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={c}>{name}</text>
      <rect x={-w / 2} y={-46} width={w} height={92} rx={16} fill={mixC('#fff', HL, flash)} stroke={c} strokeWidth={4} />
      <text x={0} y={20} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={54} fill={vc ?? C.ink}>{v}</text>
    </g>;
  };

/** a value that flies from a to b between frames s and s+d (a small token with text) */
export const Fly: React.FC<{ f: number; s: number; d?: number; a: [number, number]; b: [number, number]; text: string; c?: string; h?: number }> =
  ({ f, s, d = 20, a, b, text, c = C.blue, h = 60 }) => {
    if (f < s || f > s + d + 4) return null;
    const q = hop(f, s, d, a, b, h);
    return <g transform={`translate(${q.x},${q.y})`} opacity={1 - p(f, s + d, s + d + 4)}>
      <circle r={34} fill={c} /><text y={14} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill="#fff">{text}</text>
    </g>;
  };

/** a big check or cross mark that draws itself */
export const Mark: React.FC<{ f: number; a: number; x: number; y: number; ok: boolean; r?: number; out?: number }> = ({ f, a, x, y, ok, r = 46, out }) => {
  const t = p(f, a, a + 12), o = p(f, a, a + 4) * (out ? 1 - p(f, out, out + 8) : 1);
  if (o <= 0) return null;
  return <g transform={`translate(${x},${y}) scale(${pop(f, a, 12)})`} opacity={o}>
    <circle r={r} fill={ok ? C.green : C.red} />
    {ok ? <path d={`M${-r * 0.45},0 L${-r * 0.1},${r * 0.35} L${r * 0.5},${-r * 0.35}`} stroke="#fff" strokeWidth={r * 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
      : <path d={`M${-r * 0.35},${-r * 0.35} L${r * 0.35},${r * 0.35} M${r * 0.35},${-r * 0.35} L${-r * 0.35},${r * 0.35}`} stroke="#fff" strokeWidth={r * 0.2} strokeLinecap="round" />}
  </g>;
};

/** stroke that draws itself between frames a and b */
export const Draw: React.FC<{ f: number; a: number; b: number; d: string; c?: string; sw?: number; dash?: string; o?: number; fill?: string }> = ({ f, a, b, d, c = C.ink, sw = 5, o = 1, fill = 'none' }) => {
  const t = p(f, a, b);
  if (t <= 0) return null;
  return <path d={d} stroke={c} strokeWidth={sw} fill={fill} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} strokeLinecap="round" strokeLinejoin="round" opacity={o} />;
};

/** scene heading: serif, top centre, fades in at a and out at b */
export const Head: React.FC<{ f: number; a: number; b?: number; children: React.ReactNode; c?: string; y?: number; s?: number }> = ({ f, a, b = 1e9, children, c = C.ink, y = 112, s = 50 }) => {
  const o = win(f, a, b, 12);
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(0,${(1 - p(f, a, a + 16)) * 16})`}>
    <text x={960} y={y} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={s} fill={c}>{children}</text>
  </g>;
};

/** highlighter swipe behind a word: (x, y) = left baseline, w wide */
export const Swipe: React.FC<{ f: number; a: number; x: number; y: number; w: number; h?: number; c?: string }> = ({ f, a, x, y, w, h = 30, c = HL }) =>
  <rect x={x} y={y - h + 8} width={w * p(f, a, a + 14)} height={h} rx={6} fill={c} opacity={0.8} />;

// ---------------------------------------------------------------- Gantt chart
export type Slice = { id: string; s: number; e: number };
export const Gantt: React.FC<{ x: number; y: number; w: number; total: number; slices: Slice[]; T: number; h?: number; o?: number; ticks?: boolean; colors?: Record<string, string>; s?: number }> =
  ({ x, y, w, total, slices, T, h = 70, o = 1, ticks = true, colors = PC, s = 26 }) => {
    if (o <= 0.001) return null;
    const u = w / total, marks = new Set<number>([0]);
    slices.forEach(sl => { if (T >= sl.s) marks.add(sl.s); if (T >= sl.e - 1e-6) marks.add(sl.e); });
    return <g transform={`translate(${x},${y})`} opacity={o}>
      <rect x={0} y={0} width={w} height={h} rx={8} fill="#ece4d3" />
      {slices.map((sl, i) => {
        if (T <= sl.s) return null;
        const e = Math.min(T, sl.e), bw = (e - sl.s) * u;
        return <g key={i}>
          <rect x={sl.s * u} y={0} width={bw} height={h} fill={colors[sl.id] ?? C.muted} stroke="#fbf9f4" strokeWidth={3} />
          {bw > 44 && <text x={sl.s * u + bw / 2} y={h / 2 + 10} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill="#fff">{sl.id}</text>}
        </g>;
      })}
      {ticks && [...marks].map(m => <g key={m}>
        <line x1={m * u} x2={m * u} y1={h} y2={h + 12} stroke={C.ink} strokeWidth={3} />
        <text x={m * u} y={h + 46} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={s} fill={C.ink}>{m}</text>
      </g>)}
    </g>;
  };

// ---------------------------------------------------------------- scheduling simulator
export type SP = { id: string; arr: number; burst: number; pri?: number };
export type Layout = { cpu: [number, number]; q0: [number, number]; qdx: number; d0: [number, number]; ddx: number; off: [number, number] };
export const LAY: Layout = { cpu: [1060, 520], q0: [800, 560], qdx: -150, d0: [1390, 560], ddx: 128, off: [-140, 560] };

/** plan a schedule onto frames a0..a1: each run of one process starts with a hop phase of H frames.
 *  anchors [T, frame] pin sim time T to a frame (two anchors with the same T = a pause), so the story can wait for the voice. */
export const plan = (procs: SP[], slices: Slice[], a0: number, a1: number, H = 18, lay: Layout = LAY, enter?: number, anchors: [number, number][] = []) => {
  const runs: Slice[] = [];
  for (const sl of slices) { const l = runs[runs.length - 1]; if (l && l.id === sl.id && Math.abs(l.e - sl.s) < 1e-9) l.e = sl.e; else runs.push({ ...sl }); }
  const total = runs[runs.length - 1].e;
  const A: [number, number][] = [[0, a0], ...anchors, [total, a1]];
  type Seg = { f0: number; f1: number; T0: number; T1: number; run: boolean };
  const segs: Seg[] = [], rs: number[] = new Array(runs.length).fill(0);
  let per = 1;
  for (let i = 0; i + 1 < A.length; i++) {
    const [Ta, fa] = A[i], [Tb, fb] = A[i + 1];
    if (Tb - Ta < 1e-9) { segs.push({ f0: fa, f1: fb, T0: Ta, T1: Ta, run: false }); continue; }
    const ks = runs.map((r, k) => k).filter(k => runs[k].s >= Ta - 1e-9 && runs[k].s < Tb - 1e-9);
    per = (fb - fa - ks.length * H) / (Tb - Ta);
    let f = fa, Tm = Ta;
    for (const k of ks) {
      if (runs[k].s > Tm + 1e-9) { const f1 = f + (runs[k].s - Tm) * per; segs.push({ f0: f, f1, T0: Tm, T1: runs[k].s, run: true }); f = f1; Tm = runs[k].s; }
      rs[k] = f; segs.push({ f0: f, f1: f + H, T0: Tm, T1: Tm, run: false }); f += H;
    }
    if (Tm < Tb - 1e-9) segs.push({ f0: f, f1: fb, T0: Tm, T1: Tb, run: true });
  }
  const simT = (f: number) => {
    if (f < segs[0].f0) return 0;
    for (const g of segs) if (f < g.f1) return g.run ? g.T0 + ((f - g.f0) / (g.f1 - g.f0)) * (g.T1 - g.T0) : g.T0;
    return total;
  };
  const frameOf = (Tm: number) => {
    for (const g of segs) if (g.run && Tm >= g.T0 - 1e-9 && Tm <= g.T1 + 1e-9) return g.f0 + ((Tm - g.T0) / (g.T1 - g.T0)) * (g.f1 - g.f0);
    return a1;
  };
  const ran = (id: string, Tm: number) => slices.filter(s => s.id === id).reduce((a, s) => a + Math.max(0, Math.min(Tm, s.e) - s.s), 0);
  const fin = (id: string) => Math.max(...slices.filter(s => s.id === id).map(s => s.e));
  const waited = (pr: SP, Tm: number) => (Tm < pr.arr ? 0 : Math.min(Tm, fin(pr.id)) - pr.arr - ran(pr.id, Math.min(Tm, fin(pr.id))));
  const runIdx = (f: number) => { let k = -1; rs.forEach((r, i) => { if (f >= r) k = i; }); return k; };
  const nextRun = (id: string, k: number) => { for (let i = Math.max(0, k + 1); i < runs.length; i++) if (runs[i].id === id) return i; return 1e9; };
  /** discrete station of every process at frame f */
  const stations = (f: number) => {
    const k = runIdx(f), Tm = simT(f), m: Record<string, [number, number]> = {};
    if (k < 0) {
      const pre = procs.filter(pr => pr.arr <= 0);
      pre.forEach((pr, i) => { m[pr.id] = enter !== undefined && f < enter + i * 6 ? lay.off : [lay.q0[0] + i * lay.qdx, lay.q0[1]]; });
      procs.filter(pr => pr.arr > 0).forEach(pr => { m[pr.id] = lay.off; });
      return m;
    }
    const run = runs[k], t0 = run.s;
    const done = procs.filter(pr => pr.id !== run.id && fin(pr.id) <= t0 + 1e-9).sort((a, b) => fin(a.id) - fin(b.id));
    const ready = procs.filter(pr => pr.id !== run.id && pr.arr <= Tm + 1e-9 && fin(pr.id) > t0 + 1e-9).sort((a, b) => nextRun(a.id, k) - nextRun(b.id, k));
    m[run.id] = lay.cpu;
    ready.forEach((pr, i) => { m[pr.id] = [lay.q0[0] + i * lay.qdx, lay.q0[1]]; });
    done.forEach((pr, i) => { m[pr.id] = [lay.d0[0] + i * lay.ddx, lay.d0[1]]; });
    procs.forEach(pr => { if (!m[pr.id]) m[pr.id] = lay.off; });
    return m;
  };
  const events = [...rs, ...procs.filter(pr => pr.arr > 0).map(pr => frameOf(pr.arr))];
  if (enter !== undefined) procs.forEach((_, i) => events.push(enter + i * 6));
  events.sort((a, b) => a - b);
  const pos = (f: number, id: string) => {
    let i = -1;
    events.forEach((e, j) => { if (f >= e) i = j; });
    const cur = stations(f)[id];
    if (i < 0) return { x: cur[0], y: cur[1], sq: 0 };
    const prev = stations(events[i] - 0.01)[id];
    const q = hop(f, events[i], H - 2, prev, cur, 110);
    return { x: q.x, y: q.y, sq: q.sq };
  };
  const state = (f: number, id: string) => {
    const k = runIdx(f), Tm = simT(f), pr = procs.find(q => q.id === id)!;
    const running = k >= 0 && runs[k].id === id && f >= rs[k] + H - 2;
    const done = fin(id) <= Tm + 1e-9 && !(k >= 0 && runs[k].id === id);
    return { running, done, arrived: pr.arr <= Tm + 1e-9, left: pr.burst - ran(id, Tm), wait: waited(pr, Tm) };
  };
  return { runs, rs, simT, frameOf, pos, state, total, per, H, fin };
};

/** draw every process of a plan with its tags; `big` labels the running one with what is left */
export const SimCast: React.FC<{ f: number; P: ReturnType<typeof plan>; procs: SP[]; o?: number; showWait?: boolean; showLeft?: boolean; pri?: boolean; lay?: Layout; moodOf?: (id: string) => Mood | undefined; qlabel?: 'wait' | 'left' }> =
  ({ f, P, procs, o = 1, showWait = true, showLeft = true, pri, lay = LAY, moodOf, qlabel = 'wait' }) => {
    if (o <= 0.001) return null;
    return <g opacity={o}>
      {procs.map((pr, i) => {
        const q = P.pos(f, pr.id), st = P.state(f, pr.id);
        const onCpu = Math.hypot(q.x - lay.cpu[0], q.y - lay.cpu[1]) < 4;
        const atDone = q.x >= lay.d0[0] - 4;
        const mood: Mood = moodOf?.(pr.id) ?? (st.running ? 'focus' : st.done ? 'happy' : st.wait > 12 ? 'worried' : 'ok');
        const wait = Math.floor(st.wait + 1e-6), left = Math.ceil(st.left - 1e-6);
        return <g key={pr.id}>
          <Proc f={f} x={q.x} y={q.y} c={PC[pr.id]} label={pr.id} seed={i} sq={q.sq} mood={mood} s={atDone ? 0.82 : 1}
            look={onCpu ? [0, 1] : [1, 0]} />
          {pri && pr.pri !== undefined && <g><circle cx={q.x + 50} cy={q.y - 140} r={22} fill={C.red} /><text x={q.x + 50} y={q.y - 131} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={26} fill="#fff">{pr.pri}</text></g>}
          {showLeft && onCpu && st.running && <Tag x={q.x} y={q.y - 262} text={`${left} left`} bg={C.amber} fg={C.ink} s={28} mono />}
          {showWait && !onCpu && st.arrived && q.x > -60 && <Tag x={q.x} y={q.y - (atDone ? 140 : 172)} text={qlabel === 'left' && !atDone ? `needs ${left}` : atDone && lay.ddx < 125 ? String(wait) : `wait ${wait}`} bg={atDone ? '#fff' : HL} s={atDone ? 24 : 26} mono />}
        </g>;
      })}
    </g>;
  };

/** the floor of a scheduling scene: ready-queue rail, CPU chip and done shelf */
export const SimStage: React.FC<{ f: number; P: ReturnType<typeof plan>; o?: number; lay?: Layout; labels?: boolean }> = ({ f, P, o = 1, lay = LAY, labels = true }) => {
  if (o <= 0.001) return null;
  const k = P.runs.findIndex((_, i) => f >= P.rs[i] + P.H && f < (P.rs[i + 1] ?? 1e9));
  const busy = k >= 0 && P.simT(f) < P.total ? 1 : 0;
  return <g opacity={o}>
    <line x1={lay.q0[0] + 4 * lay.qdx - 80} x2={lay.q0[0] + 80} y1={lay.q0[1] + 14} y2={lay.q0[1] + 14} stroke="#cfc5b1" strokeWidth={6} strokeLinecap="round" strokeDasharray="2 18" />
    {labels && <text x={lay.q0[0] + 1.5 * lay.qdx} y={lay.q0[1] + 64} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>ready queue  →</text>}
    <Chip f={f} x={lay.cpu[0]} y={lay.cpu[1] - 66} s={0.92} busy={busy} />
    <line x1={lay.d0[0] - 70} x2={lay.d0[0] + 3 * lay.ddx + 70} y1={lay.d0[1] + 14} y2={lay.d0[1] + 14} stroke="#cfc5b1" strokeWidth={6} strokeLinecap="round" />
    {labels && <text x={lay.d0[0] + 1.5 * lay.ddx} y={lay.d0[1] + 64} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>{lay.ddx < 125 ? 'done · waits' : 'done'}</text>}
  </g>;
};

/** zoom a group about (cx, cy) */
export const Zoom: React.FC<{ z: number; cx?: number; cy?: number; children: React.ReactNode }> = ({ z, cx = 960, cy = 560, children }) =>
  <g transform={`translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`}>{children}</g>;

// ---------------------------------------------------------------- frame of every episode
export type Scene = [React.FC<{ f: number }>, number];
/** title card (before the first beat), crossfading scenes, a small chapter tag in the corner, narration */
export const Episode: React.FC<{ t: unknown; scenes: Scene[]; ch: string; title: string; children?: React.ReactNode; code?: string; subject?: string; icon?: (f: number) => React.ReactNode }> =
  ({ t, scenes, ch, title, children, code = 'COE303', subject = 'OPERATING SYSTEMS', icon }) => {
  const f = useCurrentFrame();
  const { TL } = makeTL(t);
  const first = Math.min(...Object.values(TL.beats).map(b => b.start));
  const tOut = p(f, first - 14, first + 4);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <svg width={1920} height={1080}>
        {scenes.map(([S, a], i) => {
          const b = i + 1 < scenes.length ? scenes[i + 1][1] : TL.total + 30;
          const o = (i === 0 ? p(f, first - 10, first + 6) : p(f, a - 8, a + 8)) * (i === scenes.length - 1 ? 1 - p(f, TL.total - 18, TL.total - 2) : 1 - p(f, b - 8, b + 8));
          return o > 0.001 ? <g key={i} opacity={o}><S f={f} /></g> : null;
        })}
        {/* corner tag */}
        <g opacity={p(f, first + 10, first + 30) * (1 - p(f, TL.total - 18, TL.total - 2))}>
          <text x={56} y={66} fontFamily={MONO} fontWeight={600} fontSize={22} fill={C.muted} letterSpacing={1}>{`${code} · ${ch}`}</text>
        </g>
        {/* title card */}
        {tOut < 1 && <g opacity={1 - tOut} transform={`translate(0,${-tOut * 40})`}>
          <g transform="translate(960,330)">
            <g transform={`scale(${0.5 * pop(f, 2, 18)})`}>{icon ? icon(f) : <Chip f={f} x={0} y={0} busy={p(f, 10, 30)} />}</g>
          </g>
          <g opacity={p(f, 8, 20)}>
            <text x={960} y={540} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={30} fill={C.muted} letterSpacing={3}>{`${subject} · ${ch.toUpperCase()}`}</text>
          </g>
          <g opacity={p(f, 14, 28)} transform={`translate(0,${(1 - p(f, 14, 32)) * 24})`}>
            <rect x={960 - title.length * 21} y={590} width={title.length * 42 * p(f, 26, 44)} height={34} fill={HL} opacity={0.7} />
            <text x={960} y={618} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={76} fill={C.ink}>{title}</text>
          </g>
        </g>}
      </svg>
      <Narration tl={TL} />
      <Sfx at={4} name="whoosh" volume={0.25} />
      {children}
    </AbsoluteFill>
  );
};

/** "For the exam" scene: a notebook card; row i appears with beat ids[i] and gets a drawn tick */
export const Exam: React.FC<{ f: number; at: (id: string, k?: number) => number; rows: [string, string][]; ids: string[] }> = ({ f, at, rows, ids }) => {
  const a = at('ex0');
  const top = 250, gap = Math.min(118, 600 / rows.length);
  const vx = 380 + Math.max(...rows.map(([k]) => k.length)) * 25 + 50;
  return <g>
    <g opacity={p(f, a, a + 12)} transform={`translate(0,${(1 - p(f, a, a + 16)) * 20})`}>
      <rect x={250} y={150} width={1420} height={top + rows.length * gap - 70} rx={28} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
      <line x1={340} x2={340} y1={150} y2={top + rows.length * gap + 80} stroke="#e6b8a8" strokeWidth={3} />
      <text x={380} y={232} fontFamily={SERIF} fontWeight={700} fontSize={56} fill={C.ink}>For the exam</text>
      <Swipe f={f} a={a + 10} x={380} y={236} w={360} h={22} />
    </g>
    {rows.map(([k, v], i) => {
      const s = at(ids[i]);
      const o = p(f, s, s + 10);
      if (o <= 0) return null;
      const y = top + 70 + i * gap;
      return <g key={i} opacity={o} transform={`translate(${(1 - p(f, s, s + 14)) * 30},0)`}>
        <rect x={292} y={y - 34} width={34} height={34} rx={6} fill="none" stroke={C.ink} strokeWidth={3} />
        <Draw f={f} a={s + 8} b={s + 18} d={`M297,${y - 18} l9,10 l17,-22`} c={C.green} sw={6} />
        <text x={380} y={y} fontFamily={SANS} fontWeight={800} fontSize={44} fill={C.blue}>{k}</text>
        <text x={vx} y={y} fontFamily={SANS} fontWeight={500} fontSize={Math.min(42, (1630 - vx) / (v.length * 0.5))} fill={C.ink}>{v}</text>
      </g>;
    })}
  </g>;
};
