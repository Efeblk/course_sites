/* Shared pieces for the motion videos: palette, timing helpers tied to the narration, and small drawn parts. */
import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame} from 'remotion';

export const C = {
  bg: '#f3ece0', ink: '#2b2a33', mute: '#8c8577', line: '#d8cdbb', card: '#fbf7f0', soft: '#e9dfcd',
  blue: '#2f4fb0', orange: '#e39b2d', red: '#c8452f', teal: '#3d8c8a', green: '#3f7d3a', sand: '#cbbda4', brown: '#9b7b56', purple: '#7a5aa8',
};
export const FONT = '"Segoe UI Variable Display", "Segoe UI", system-ui, sans-serif';
export const SERIF = '"Iowan Old Style", "Sitka Heading", Charter, Georgia, serif';

export type Cue = {from: number; dur: number; audio: string; text: string};
export type Timeline = {id: string; title: string; fps: number; dur: number; scenes: {id: string; from: number; dur: number; cues: Cue[]}[]};

const SceneCtx = React.createContext<{cues: Cue[]; dur: number}>({cues: [], dur: 0});

/** frame inside the scene, and the start (and length) of each spoken line, so motion lands on the words */
export function useScene() {
  const {cues, dur} = React.useContext(SceneCtx);
  const f = useCurrentFrame();
  return {f, dur, at: (i: number, part = 0) => (cues[i] ? cues[i].from + Math.round(part * cues[i].dur) : dur), len: (i: number) => cues[i]?.dur ?? 0};
}

export const ease = Easing.bezier(0.2, 0.7, 0.2, 1);
export const prog = (f: number, start: number, dur = 22, e: (t: number) => number = ease) =>
  interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const pop = (f: number, start: number) => spring({frame: f - start, fps: 30, config: {damping: 13, stiffness: 150, mass: 0.6}});
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixColor = (a: string, b: string, t: number) => {
  const p = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(mix(v, y[i], t))).join(',')})`;
};

/** text that rises in at `start` */
export const Rise: React.FC<{start: number; x: number; y: number; size?: number; color?: string; weight?: number; anchor?: 'start' | 'middle' | 'end'; font?: string; children: React.ReactNode; out?: number}> =
  ({start, x, y, size = 30, color = C.ink, weight = 600, anchor = 'middle', font = FONT, children, out}) => {
    const {f} = useScene();
    const t = prog(f, start, 20) * (out != null ? 1 - prog(f, out, 14) : 1);
    return <text x={x} y={y + (1 - prog(f, start, 20)) * 18} fontSize={size} fill={color} fontWeight={weight} textAnchor={anchor} fontFamily={font} opacity={t}>{children}</text>;
  };

/** rounded tag with a coloured dot */
export const Tag: React.FC<{start: number; x: number; y: number; color: string; text: string; filled?: boolean; out?: number}> = ({start, x, y, color, text, filled, out}) => {
  const {f} = useScene();
  const s = pop(f, start) * (out != null ? 1 - prog(f, out, 12) : 1);
  const w = text.length * 15 + 54;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s)}>
      <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill={filled ? color : C.card} stroke={color} strokeWidth={3} />
      {!filled && <circle cx={-w / 2 + 26} cy={0} r={8} fill={color} />}
      <text x={filled ? 0 : 12} y={10} fontSize={27} fontWeight={650} textAnchor="middle" fill={filled ? '#fff' : C.ink} fontFamily={FONT}>{text}</text>
    </g>
  );
};

export const Thermometer: React.FC<{x: number; y: number; h: number; level: number; color?: string; marks?: [number, string, string][]}> = ({x, y, h, level, color = C.red, marks = []}) => (
  <g>
    <rect x={x - 18} y={y - h} width={36} height={h + 10} rx={18} fill={C.card} stroke={C.ink} strokeWidth={4} />
    <rect x={x - 8} y={y - level * (h - 20)} width={16} height={level * (h - 20) + 10} rx={8} fill={color} />
    <circle cx={x} cy={y + 30} r={34} fill={color} stroke={C.ink} strokeWidth={4} />
    {marks.map(([lv, label, c], i) => (
      <g key={i}>
        <line x1={x + 24} x2={x + 52} y1={y - lv * (h - 20)} y2={y - lv * (h - 20)} stroke={c} strokeWidth={4} />
        <text x={x + 62} y={y - lv * (h - 20) + 9} fontSize={26} fontWeight={650} fill={c} fontFamily={FONT}>{label}</text>
      </g>
    ))}
  </g>
);

/** small heading at the top of a scene, like a chapter label */
export const Heading: React.FC<{start: number; text: string; out?: number}> = ({start, text, out}) => {
  const {f} = useScene();
  const t = prog(f, start, 24) * (out != null ? 1 - prog(f, out, 16) : 1);
  return (
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', opacity: t, transform: `translateY(${(1 - t) * 20}px)`,
      fontFamily: SERIF, fontSize: 62, color: C.ink, fontWeight: 600}}>{text}</div>
  );
};

/** full-frame SVG canvas, 1920x1080 user units */
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill><svg viewBox="0 0 1920 1080" width={1920} height={1080}>{children}</svg></AbsoluteFill>
);

/** shaded ball (atom, particle) */
export const Atom: React.FC<{x: number; y: number; r: number; fill: string; o?: number; s?: number}> = ({x, y, r, fill, o = 1, s = 1}) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={r} fill={fill} stroke={C.ink} strokeOpacity={0.25} strokeWidth={2} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.32} fill="#fff" opacity={0.35} />
  </g>
);

/* hexagonal cluster: atoms within `k` rings; ring k is the surface */
export const hexAtoms = (k: number) => {
  const out: {q: number; r: number; ring: number}[] = [];
  for (let q = -k; q <= k; q++) for (let r = -k; r <= k; r++) {
    const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
    if (ring <= k) out.push({q, r, ring});
  }
  return out;
};
export const hexXY = (q: number, r: number, d: number) => [d * (q + r / 2), d * (r * Math.sqrt(3)) / 2];

/** a stroke that draws itself from `start` over `dur` frames */
export const Draw: React.FC<{start: number; dur?: number; d: string; color?: string; w?: number; dash?: string; out?: number; fill?: string}> =
  ({start, dur = 24, d, color = C.ink, w = 5, dash, out, fill = 'none'}) => {
    const {f} = useScene();
    const t = prog(f, start, dur);
    const o = out != null ? 1 - prog(f, out, 12) : 1;
    if (dash) return <path d={d} fill={fill} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" opacity={t * o} />;
    return <path d={d} pathLength={1} fill={fill} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - t} opacity={(t > 0 ? 1 : 0) * o} />;
  };

/** arrow from (x1,y1) to (x2,y2) that grows in at `start` */
export const Arrow: React.FC<{start: number; x1: number; y1: number; x2: number; y2: number; color?: string; w?: number; out?: number; dur?: number}> =
  ({start, x1, y1, x2, y2, color = C.ink, w = 5, out, dur = 18}) => {
    const {f} = useScene();
    const t = prog(f, start, dur), o = out != null ? 1 - prog(f, out, 12) : 1;
    const ex = mix(x1, x2, t), ey = mix(y1, y2, t), a = Math.atan2(y2 - y1, x2 - x1), h = 10 + w * 2.4;
    return (
      <g opacity={(t > 0 ? 1 : 0) * o} stroke={color} fill={color} strokeWidth={w} strokeLinecap="round">
        <line x1={x1} y1={y1} x2={ex - Math.cos(a) * h * 0.6} y2={ey - Math.sin(a) * h * 0.6} />
        <polygon stroke="none" points={`${ex},${ey} ${ex - Math.cos(a - 0.45) * h},${ey - Math.sin(a - 0.45) * h} ${ex - Math.cos(a + 0.45) * h},${ey - Math.sin(a + 0.45) * h}`} />
      </g>
    );
  };

/** a rounded card that pops in, content drawn relative to its centre */
export const Card: React.FC<{start: number; x: number; y: number; w: number; h: number; stroke?: string; fill?: string; out?: number; children?: React.ReactNode; sw?: number}> =
  ({start, x, y, w, h, stroke = C.line, fill = C.card, out, children, sw = 4}) => {
    const {f} = useScene();
    const s = pop(f, start) * (out != null ? 1 - prog(f, out, 12) : 1);
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s)}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22} fill={fill} stroke={stroke} strokeWidth={sw} />
        {children}
      </g>
    );
  };

/** plain SVG text (no motion) */
export const T: React.FC<{x?: number; y?: number; size?: number; color?: string; weight?: number; anchor?: 'start' | 'middle' | 'end'; o?: number; children: React.ReactNode; font?: string}> =
  ({x = 0, y = 0, size = 30, color = C.ink, weight = 600, anchor = 'middle', o = 1, children, font = FONT}) => (
    <text x={x} y={y} fontSize={size} fill={color} fontWeight={weight} textAnchor={anchor} fontFamily={font} opacity={o}>{children}</text>
  );

/** big tick or cross that pops in */
export const Mark: React.FC<{start: number; x: number; y: number; ok: boolean; size?: number; out?: number}> = ({start, x, y, ok, size = 60, out}) => {
  const {f} = useScene();
  const s = pop(f, start) * (out != null ? 1 - prog(f, out, 12) : 1);
  const c = ok ? C.green : C.red, k = size / 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s)} stroke={c} strokeWidth={size / 7} strokeLinecap="round" fill="none">
      <circle r={k * 1.15} fill={C.card} strokeWidth={size / 12} />
      {ok ? <path d={`M ${-k * 0.5} 0 L ${-k * 0.12} ${k * 0.42} L ${k * 0.55} ${-k * 0.45}`} /> : <path d={`M ${-k * 0.45} ${-k * 0.45} L ${k * 0.45} ${k * 0.45} M ${k * 0.45} ${-k * 0.45} L ${-k * 0.45} ${k * 0.45}`} />}
    </g>
  );
};

/** heading for an SVG stage */
export const StageHeading: React.FC<{start: number; text: string; out?: number}> = (p) => (
  <foreignObject x={0} y={0} width={1920} height={200}><Heading {...p} /></foreignObject>
);

const SceneFade: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 14, dur - 4, dur + 12], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

export const MotionVideo: React.FC<{tl: Timeline; scenes: Record<string, React.FC>; kicker: string}> = ({tl, scenes, kicker}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT}}>
      {tl.scenes.map((sc) => {
        const S = scenes[sc.id];
        return (
          <Sequence key={sc.id} from={sc.from} durationInFrames={sc.dur + 12}>
            <SceneCtx.Provider value={{cues: sc.cues, dur: sc.dur}}>
              <SceneFade dur={sc.dur}><S /></SceneFade>
            </SceneCtx.Provider>
            {sc.cues.map((c, i) => (
              <Sequence key={i} from={c.from} durationInFrames={c.dur + 3}><Audio src={staticFile(c.audio)} /></Sequence>
            ))}
          </Sequence>
        );
      })}
      <div style={{position: 'absolute', top: 34, left: 48, fontFamily: '"Cascadia Mono", Consolas, monospace', fontSize: 22, color: C.mute,
        opacity: interpolate(f, [0, 20], [0, 1], {extrapolateRight: 'clamp'})}}>{kicker}</div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 6, width: `${(f / tl.dur) * 100}%`, background: C.blue, opacity: 0.55}} />
    </AbsoluteFill>
  );
};
