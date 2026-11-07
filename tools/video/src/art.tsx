// Flat illustrations: drawn as SVG groups so every part can be animated.
import React from 'react';
import { C } from './lib';

/** ECG trace as a polyline, scrolling with the frame. */
export const ecg = (w: number, h: number, frame: number, speed = 3.2, period = 70) => {
  const pts: string[] = [];
  for (let x = 0; x <= w; x += 2) {
    const ph = (((x + frame * speed) % period) + period) % period;
    let y = 0;
    if (ph > 8 && ph < 16) y = -3 * Math.sin(((ph - 8) / 8) * Math.PI);
    else if (ph >= 22 && ph < 25) y = -(ph - 22) * 9;
    else if (ph >= 25 && ph < 29) y = -27 + (ph - 25) * 9;
    else if (ph >= 29 && ph < 31) y = 9 - (ph - 29) * 4.5;
    else if (ph > 38 && ph < 50) y = -5 * Math.sin(((ph - 38) / 12) * Math.PI);
    pts.push(`${x},${(h / 2 + y).toFixed(1)}`);
  }
  return pts.join(' ');
};

export const Monitor: React.FC<{ frame: number; alarm?: number; hr?: number; seed?: number }> = ({ frame, alarm = 0, hr = 72, seed = 0 }) => (
  <g>
    <rect x={-4} y={60} width={8} height={230} fill="#5b6378" />
    <rect x={-30} y={284} width={60} height={8} rx={4} fill="#5b6378" />
    <rect x={-66} y={-6} width={132} height={86} rx={10} fill="#3c4458" />
    <rect x={-58} y={2} width={116} height={70} rx={6} fill={alarm > 0 ? `rgba(200,67,47,${0.35 + 0.45 * alarm})` : '#0e1719'} />
    <polyline points={ecg(96, 50, frame + seed * 17)} transform="translate(-54,8)" fill="none" stroke={alarm > 0 ? '#ffd2c8' : '#5ef0a0'} strokeWidth={2.4} strokeLinejoin="round" />
    <text x={52} y={66} textAnchor="end" fontSize={15} fontWeight={700} fill={alarm > 0 ? '#fff' : '#5ef0a0'} fontFamily="-apple-system, Helvetica">{hr}</text>
  </g>
);

/** Bed with a sleeping patient; origin = centre of the bed on the floor. */
export const Bed: React.FC<{ skin: string; blanket: string; breathe: number }> = ({ skin, blanket, breathe }) => (
  <g>
    <rect x={-132} y={-150} width={18} height={150} rx={6} fill="#aab3c5" />
    <rect x={112} y={-100} width={14} height={100} rx={5} fill="#aab3c5" />
    <rect x={-120} y={-60} width={10} height={60} fill="#8a93a6" />
    <rect x={100} y={-60} width={10} height={60} fill="#8a93a6" />
    <circle cx={-115} cy={-4} r={8} fill="#4a5266" /><circle cx={105} cy={-4} r={8} fill="#4a5266" />
    <rect x={-128} y={-82} width={256} height={24} rx={7} fill="#c9d1dc" />
    <rect x={-122} y={-108} width={244} height={30} rx={12} fill="#f4f1ea" />
    <ellipse cx={-80} cy={-114} rx={36} ry={14} fill="#ffffff" />
    <circle cx={-80} cy={-128} r={22} fill={skin} />
    <path d="M-102,-132 a22,22 0 0 1 40,-10 q-18,-4 -40,10z" fill="#3a2a22" />
    <path d={`M-58,${-122 - breathe} Q20,${-140 - breathe * 2} 124,-118 L124,-100 L-58,-100 Z`} fill={blanket} />
    <path d={`M-58,${-122 - breathe} Q-40,${-110 - breathe} -58,-100`} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={4} />
  </g>
);

/** Nurse, front-facing; origin = feet centre. tired 0..1 droops the eyes and flattens the mouth. */
export type StaffLook = { scrub?: string; scrubDark?: string; cap?: boolean; coat?: boolean; skin?: string; hair?: string };
export const Nurse: React.FC<{ tired?: number; armUp?: number; blink?: boolean; look?: StaffLook }> = ({ tired = 0, armUp = 1, blink = false, look = {} }) => {
  const skin = look.skin ?? '#e2b48c', scrub = look.scrub ?? C.teal, dark = look.scrubDark ?? '#2f6f6c', hair = look.hair ?? '#3a2a22', cap = look.cap ?? true;
  const lid = blink ? 14 : 3 + tired * 8;
  const mouth = 8 - tired * 14; // smile → frown
  return (
    <g transform="translate(-150,-600)">
      <rect x={95} y={430} width={46} height={170} rx={16} fill={dark} />
      <rect x={159} y={430} width={46} height={170} rx={16} fill={dark} />
      <rect x={70} y={230} width={160} height={230} rx={60} fill={scrub} />
      <path d="M120,236 L150,290 L180,236" fill="none" stroke={dark} strokeWidth={8} />
      {look.coat && <><path d="M70,300 Q70,236 128,232 L150,330 L172,232 Q230,236 230,300 L232,470 L172,470 L150,330 L128,470 L68,470Z" fill="#f7f7f4" stroke="#d9d1c1" strokeWidth={2} />
        <path d="M118,250 Q100,330 132,360 Q160,370 168,340" fill="none" stroke="#4a5266" strokeWidth={5} /><circle cx={168} cy={336} r={9} fill="#9aa3b5" /></>}
      <rect x={135} y={196} width={30} height={46} rx={10} fill={skin} />
      {/* left arm down */}
      <path d="M86,270 Q52,350 70,430" fill="none" stroke={look.coat ? "#f7f7f4" : scrub} strokeWidth={34} strokeLinecap="round" />
      <circle cx={70} cy={436} r={17} fill={skin} />
      {/* right arm up toward the phone */}
      <path d={`M214,270 Q${270 + 10 * armUp},${360 - 40 * armUp} ${250 + 10 * armUp},${410 - 120 * armUp}`} fill="none" stroke={look.coat ? "#f7f7f4" : scrub} strokeWidth={34} strokeLinecap="round" />
      <circle cx={250 + 10 * armUp} cy={414 - 120 * armUp} r={17} fill={skin} />
      <circle cx={150} cy={150} r={62} fill={skin} />
      <path d="M86,150 Q84,80 150,78 Q216,80 214,150 Q200,110 150,108 Q100,110 86,150Z" fill={hair} />
      {cap && <><rect x={106} y={70} width={88} height={30} rx={10} fill="#fff" stroke="#d9d1c1" strokeWidth={2} />
      <rect x={146} y={76} width={8} height={18} fill={C.red} /><rect x={141} y={81} width={18} height={8} fill={C.red} /></>}
      <circle cx={128} cy={156} r={7} fill={C.ink} /><circle cx={172} cy={156} r={7} fill={C.ink} />
      <rect x={118} y={146} width={20} height={lid} fill={skin} /><rect x={162} y={146} width={20} height={lid} fill={skin} />
      {tired > 0.5 && <path d="M118,172 q10,5 20,0 M162,172 q10,5 20,0" stroke="#b98a68" strokeWidth={2.5} fill="none" opacity={(tired - 0.5) * 2} />}
      <path d={`M134,186 Q150,${186 + mouth} 166,186`} fill="none" stroke="#7a3f2a" strokeWidth={4} strokeLinecap="round" />
      {tired > 0.6 && <path d="M206,120 q8,14 0,22 q-8,-8 0,-22z" fill="#8ec5e8" opacity={(tired - 0.6) * 2.5} />}
    </g>
  );
};

/** Phone; origin = top-left. children render inside the screen (w×h). */
export const Phone: React.FC<{ w: number; h: number; children?: React.ReactNode; clipId: string }> = ({ w, h, children, clipId }) => (
  <g>
    <rect x={-10} y={-10} width={w + 20} height={h + 20} rx={28} fill="#1d2027" />
    <rect x={0} y={0} width={w} height={h} rx={20} fill="#f6f4ef" />
    <clipPath id={clipId}><rect x={0} y={0} width={w} height={h} rx={20} /></clipPath>
    <g clipPath={`url(#${clipId})`}>{children}</g>
    <rect x={w / 2 - 34} y={8} width={68} height={10} rx={5} fill="#1d2027" />
  </g>
);
