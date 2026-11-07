import { Easing, interpolate } from 'remotion';

export type Timeline = { fps: number; total: number; beats: Record<string, { start: number; dur: number; file: string; text: string }> };
/** Helpers bound to one video's timeline (written by tts.py). */
export const makeTL = (t: unknown) => {
  const TL = t as Timeline;
  const B = (id: string) => { const b = TL.beats[id]; if (!b) throw new Error(`no beat ${id}`); return b; };
  return { TL, B, end: (id: string) => B(id).start + B(id).dur };
};

export const C = {
  paper: '#f3ede1', paper2: '#e9e1d0', ink: '#22201c', muted: '#7a7264',
  blue: '#2b48a8', red: '#c8432f', green: '#2f7a3a', amber: '#e09a1f', teal: '#3b8f8c',
  night: '#232b45', night2: '#1b2138', floor: '#2c3452', skin: ['#e2b48c', '#c98e66', '#f0c9a4', '#8d5a3c', '#d9a37a'],
};

const ez = Easing.bezier(0.33, 0, 0.2, 1);
/** 0→1 between frames a and b (clamped, eased). */
export const p = (f: number, a: number, b: number, e = ez) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** overshooting pop for things appearing */
export const pop = (f: number, a: number, d = 14) => p(f, a, a + d, Easing.bezier(0.34, 1.56, 0.64, 1));

export const rand = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };

// standard normal
export const Phi = (z: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const q = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - q : q;
};
export const PhiInv = (pp: number) => { // Acklam
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (pp < pl) { const q = Math.sqrt(-2 * Math.log(pp)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (pp > 1 - pl) { const q = Math.sqrt(-2 * Math.log(1 - pp)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  const q = pp - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
};
