/* Pieces shared by the simple COE025 videos (2026-11-08 remake: few ideas per video, slow, intuition first). */
import React from 'react';
import {C, FONT, Mark, pop, prog, Stage, StageHeading, useScene} from '../lib';

/** "For the exam" scene: line 0 is the heading, every later line adds one ticked card */
export const ExamList: React.FC<{items: string[]; heading?: string}> = ({items, heading = 'For the exam'}) => {
  const {f, at} = useScene();
  const top = 300, step = Math.min(150, 560 / Math.max(1, items.length - 1 || 1));
  return (
    <Stage>
      <StageHeading start={at(0)} text={heading} />
      {items.map((txt, i) => {
        const s = at(i + 1, 0.05), y = top + i * step, t = pop(f, s);
        return (
          <g key={i} opacity={Math.min(1, t)} transform={`translate(${(1 - Math.min(1, t)) * -40} 0)`}>
            <rect x={300} y={y - 52} width={1320} height={104} rx={20} fill={C.card} stroke={C.line} strokeWidth={3} />
            <text x={420} y={y + 13} fontSize={40} fontWeight={620} fontFamily={FONT} fill={C.ink}>{txt}</text>
            <Mark start={s + 6} x={360} y={y} ok size={44} />
          </g>
        );
      })}
    </Stage>
  );
};

/** a 2D point that pops in */
export const Dot: React.FC<{start: number; x: number; y: number; color: string; r?: number; label?: string; o?: number}> = ({start, x, y, color, r = 16, label, o = 1}) => {
  const {f} = useScene();
  const s = pop(f, start);
  return (
    <g opacity={Math.min(1, s) * o} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={r} fill={color} stroke="#fff" strokeWidth={3} />
      {label && <text y={-r - 14} fontSize={34} fontWeight={700} textAnchor="middle" fontFamily={FONT} fill={color}>{label}</text>}
    </g>
  );
};

/** soft highlight band behind a row, fading in at start */
export const Glow: React.FC<{start: number; x: number; y: number; w: number; h: number; color?: string; out?: number}> = ({start, x, y, w, h, color = C.orange, out}) => {
  const {f} = useScene();
  const o = prog(f, start, 14) * (out != null ? 1 - prog(f, out, 12) : 1);
  return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={18} fill={color} opacity={0.16 * o} />;
};
