/* Drawn parts shared by the COE025 (NLP) videos: token chips, tag chips, counters and bars. */
import React from 'react';
import {C, FONT, mix, pop, prog, useScene} from '../lib';

export const MONO = '"Cascadia Mono", Consolas, "Courier New", monospace';
export const tw = (s: string, size = 34) => Math.max(70, s.length * size * 0.56 + 40);

/** x centres for a row of chips centred on cx */
export const rowX = (words: string[], cx: number, size = 34, gap = 18) => {
  const w = words.map((s) => tw(s, size));
  const total = w.reduce((a, b) => a + b, 0) + gap * (w.length - 1);
  let x = cx - total / 2;
  return w.map((wi) => { const c = x + wi / 2; x += wi + gap; return c; });
};

/** a token chip that pops in at `start`; `hi` (0..1) fills it with `color` */
export const Chip: React.FC<{start: number; x: number; y: number; text: string; color?: string; size?: number; hi?: number; out?: number; w?: number; mono?: boolean; dy?: number}> =
  ({start, x, y, text, color = C.blue, size = 34, hi = 0, out, w, mono, dy = 0}) => {
    const {f} = useScene();
    const s = pop(f, start) * (out != null ? 1 - prog(f, out, 12) : 1);
    const W = w ?? tw(text, size), H = size * 1.75;
    return (
      <g transform={`translate(${x} ${y + dy}) scale(${s})`} opacity={Math.min(1, s)}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={14} fill={hi > 0 ? color : C.card} fillOpacity={hi > 0 ? 0.16 + 0.84 * hi : 1} stroke={color} strokeWidth={3.5} />
        <text y={size * 0.35} fontSize={size} fontWeight={650} textAnchor="middle" fontFamily={mono ? MONO : FONT} fill={hi > 0.5 ? '#fff' : C.ink}>{text}</text>
      </g>
    );
  };

/** a number that counts from `a` to `b` between frames start..start+dur */
export const Count: React.FC<{start: number; dur?: number; a?: number; b: number; x: number; y: number; size?: number; color?: string; fmt?: (v: number) => string; anchor?: 'start' | 'middle' | 'end'}> =
  ({start, dur = 30, a = 0, b, x, y, size = 56, color = C.ink, fmt = (v) => String(Math.round(v)), anchor = 'middle'}) => {
    const {f} = useScene();
    const t = prog(f, start, dur);
    return <text x={x} y={y} fontSize={size} fontWeight={750} fill={color} textAnchor={anchor} fontFamily={FONT} opacity={prog(f, start, 8)}>{fmt(mix(a, b, t))}</text>;
  };

/** vertical bar standing on baseline y, growing to height h */
export const Bar: React.FC<{start: number; x: number; y: number; w?: number; h: number; color?: string; label?: string; value?: string; dur?: number; o?: number}> =
  ({start, x, y, w = 110, h, color = C.blue, label, value, dur = 26, o = 1}) => {
    const {f} = useScene();
    const t = prog(f, start, dur), H = h * t;
    return (
      <g opacity={(t > 0 ? 1 : 0) * o}>
        <rect x={x - w / 2} y={y - H} width={w} height={H} rx={8} fill={color} />
        {label && <text x={x} y={y + 42} fontSize={30} fontWeight={650} textAnchor="middle" fontFamily={FONT} fill={C.ink}>{label}</text>}
        {value && <text x={x} y={y - H - 16} fontSize={30} fontWeight={700} textAnchor="middle" fontFamily={FONT} fill={C.ink} opacity={prog(f, start + dur - 6, 10)}>{value}</text>}
      </g>
    );
  };

/** monospace line of maths that types itself in */
export const Typed: React.FC<{start: number; x: number; y: number; text: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; cps?: number; weight?: number; out?: number}> =
  ({start, x, y, text, size = 38, color = C.ink, anchor = 'middle', cps = 40, weight = 600, out}) => {
    const {f} = useScene();
    const n = Math.max(0, Math.min(text.length, Math.floor(((f - start) / 30) * cps)));
    const o = out != null ? 1 - prog(f, out, 12) : 1;
    if (f < start) return null;
    return (
      <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fontFamily={MONO} fill={color} opacity={o} xmlSpace="preserve">
        {text.slice(0, n)}<tspan fill="transparent">{text.slice(n)}</tspan>
      </text>
    );
  };

/** shake offset for a rejected element (wrong answer), in px */
export const shake = (f: number, start: number) => (f >= start && f < start + 16 ? Math.sin((f - start) * 1.6) * 12 * (1 - (f - start) / 16) : 0);

/** fade helper: 1 between in and out */
export const win = (f: number, a: number, b?: number, d = 14) => prog(f, a, d) * (b != null ? 1 - prog(f, b, d) : 1);
