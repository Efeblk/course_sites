// "Thresholds and alert fatigue": a 75-second explainer for UNI480 week 4.
import React, { useMemo } from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Bell, BellRing, Cpu, HeartPulse, Percent, Stethoscope, User, UserCheck, UserX, Users, Hand } from 'lucide-react';
import { C, makeTL, lerp, p, pop, rand, Phi, PhiInv } from './lib';
import { Narration } from './kit';
import timeline from './timelines/thresholds.json';

const { TL, B } = makeTL(timeline);
import { Bed, Monitor, Nurse, Phone } from './art';

const SANS = '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
const SERIF = '"Iowan Old Style", Charter, Georgia, serif';

// ---------------------------------------------------------------- scene A: the ward
const BEDS = [230, 595, 960, 1325, 1690];
const RISK = [3, 12, 6, 31, 4];
const FLOOR = 830;
const CHIP = { x: 960, y: 190 };

const Ward: React.FC<{ f: number }> = ({ f }) => {
  const w = B('ward'), m = B('model'), e = B('estimate'), z = B('zoom');
  const pull = p(f, 0, w.start + w.dur);
  const out = p(f, z.start - 4, z.start + 24);
  const s = lerp(lerp(1.75, 1, pull), 0.32, out);
  const fx = 960, fy = lerp(690, 560, pull);
  return (
    <AbsoluteFill style={{ opacity: 1 - out }}>
      <svg width={1920} height={1080}>
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.night2} /><stop offset="1" stopColor={C.night} /></linearGradient>
          <radialGradient id="glow"><stop offset="0" stopColor="#7d96ff" stopOpacity=".55" /><stop offset="1" stopColor="#7d96ff" stopOpacity="0" /></radialGradient>
        </defs>
        <g transform={`translate(960,540) scale(${s}) translate(${-fx},${-fy})`}>
          <rect x={-600} y={-400} width={3120} height={1300} fill="url(#wall)" />
          <rect x={-600} y={FLOOR} width={3120} height={700} fill={C.floor} />
          {BEDS.map((x, i) => (
            <g key={`l${i}`}>
              <ellipse cx={x - 20} cy={FLOOR - 60} rx={190} ry={40} fill="#ffe7b0" opacity={0.06} />
              <path d={`M${x - 20},${FLOOR - 470} L${x - 170},${FLOOR - 40} L${x + 130},${FLOOR - 40}Z`} fill="#ffe7b0" opacity={0.045} />
              <line x1={x - 20} x2={x - 20} y1={-400} y2={FLOOR - 500} stroke="#4a5370" strokeWidth={4} />
              <path d={`M${x - 70},${FLOOR - 470} Q${x - 20},${FLOOR - 530} ${x + 30},${FLOOR - 470}Z`} fill="#4a5370" />
              <ellipse cx={x - 20} cy={FLOOR - 470} rx={50} ry={7} fill="#ffe7b0" opacity={0.8} />
            </g>
          ))}
          {/* window + moon */}
          <rect x={1420} y={110} width={300} height={230} rx={10} fill="#141a2e" stroke="#4a5370" strokeWidth={10} />
          <line x1={1570} x2={1570} y1={110} y2={340} stroke="#4a5370" strokeWidth={8} />
          <circle cx={1650} cy={175} r={30} fill="#f3e9c6" /><circle cx={1638} cy={168} r={30} fill="#141a2e" />
          {[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={1440 + rand(i) * 120} cy={130 + rand(i + 9) * 180} r={1.6 + rand(i + 3)} fill="#fff" opacity={0.4 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />)}
          {BEDS.map((x, i) => {
            const bp = m.start + 150 + i * 9; // badge pop
            const val = Math.round(RISK[i] * p(f, bp, bp + 22));
            const col = RISK[i] >= 25 ? C.red : RISK[i] >= 10 ? C.amber : '#55618a';
            return (
              <g key={i}>
                <g transform={`translate(${x + 172},${FLOOR - 292})`}><Monitor frame={f} seed={i} hr={[68, 88, 74, 112, 70][i]} /></g>
                <g transform={`translate(${x},${FLOOR})`}><Bed skin={C.skin[i]} blanket={['#5a78c8', '#6a9f9a', '#8a74b8', '#c8805a', '#5a8fc8'][i]} breathe={2 * Math.sin(f / 22 + i)} /></g>
                {/* risk badge */}
                <g transform={`translate(${x - 58},${FLOOR - 228}) scale(${pop(f, bp)})`} opacity={p(f, bp, bp + 6)}>
                  <rect x={-58} y={-30} width={116} height={56} rx={28} fill={col} />
                  <text x={0} y={10} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill="#fff">{val}%</text>
                  <path d="M-8,26 L0,38 L8,26Z" fill={col} />
                </g>
              </g>
            );
          })}
          {/* data stream: monitors → model */}
          {BEDS.map((x, i) => Array.from({ length: 16 }, (_, j) => {
            const s0 = m.start + 8 + j * 7 + i * 3, t = (f - s0) / 34;
            if (t <= 0 || t >= 1) return null;
            const ax = x + 172, ay = FLOOR - 255, cx = lerp(ax, CHIP.x, 0.5), cy = 80;
            const u = 1 - t, px = u * u * ax + 2 * u * t * cx + t * t * CHIP.x, py = u * u * ay + 2 * u * t * cy + t * t * CHIP.y;
            return <circle key={`${i}-${j}`} cx={px} cy={py} r={5} fill="#5ef0a0" opacity={Math.sin(t * Math.PI)} />;
          }))}
          {/* model → badges */}
          {BEDS.map((x, i) => {
            const bp = m.start + 132 + i * 9, t = p(f, bp, bp + 18);
            if (t <= 0 || f > bp + 40) return null;
            return <line key={i} x1={CHIP.x} y1={CHIP.y} x2={lerp(CHIP.x, x - 58, t)} y2={lerp(CHIP.y, FLOOR - 260, t)} stroke="#9fb2ff" strokeWidth={3} strokeDasharray="6 8" opacity={1 - p(f, bp + 25, bp + 40)} />;
          })}
          {/* the model */}
          <g transform={`translate(${CHIP.x},${CHIP.y}) scale(${pop(f, m.start - 4, 18)})`}>
            <circle r={140} fill="url(#glow)" opacity={0.6 + 0.4 * Math.sin(f / 9)} />
            <circle r={78} fill="none" stroke="#9fb2ff" strokeWidth={3} strokeDasharray="10 12" transform={`rotate(${f * 1.5})`} />
            <circle r={60} fill={C.blue} />
            <Cpu x={-32} y={-32} size={64} color="#fff" strokeWidth={1.6} />
          </g>
        </g>
      </svg>
      {/* estimate, not diagnosis */}
      <EstimateCard f={f} a={e.start} out={z.start} />
    </AbsoluteFill>
  );
};

const EstimateCard: React.FC<{ f: number; a: number; out: number }> = ({ f, a, out }) => {
  const k = pop(f, a, 16), o = p(f, a, a + 8) * (1 - p(f, out - 12, out));
  const tick = p(f, a + 14, a + 26), cross = p(f, a + 40, a + 54);
  if (o <= 0) return null;
  const half = (icon: React.ReactNode, label: string, good: boolean, t: number) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, position: 'relative', opacity: good ? 1 : 1 - 0.45 * t }}>
      <div style={{ width: 130, height: 130, borderRadius: 65, background: good ? '#e7f1e8' : '#f6e4e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ font: `600 40px ${SANS}`, color: C.ink, position: 'relative' }}>{label}
        {!good && <div style={{ position: 'absolute', left: -8, right: -8, top: '52%', height: 6, background: C.red, transformOrigin: 'left', transform: `scaleX(${t})` }} />}
      </div>
      {good && <div style={{ position: 'absolute', top: -14, right: 70, width: 56, height: 56, borderRadius: 28, background: C.green, color: '#fff', font: `800 34px ${SANS}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t})` }}>✓</div>}
    </div>
  );
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', background: `rgba(20,24,40,${0.55 * o})` }}>
      <div style={{ opacity: o, transform: `scale(${0.85 + 0.15 * k})`, background: C.paper, borderRadius: 28, padding: '56px 70px', width: 900, display: 'flex', gap: 40 }}>
        {half(<Percent size={64} color={C.green} />, 'estimate', true, tick)}
        <div style={{ width: 2, background: '#d9d1c1' }} />
        {half(<Stethoscope size={64} color={C.red} />, 'diagnosis', false, cross)}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- scenes B + C: 1000 patients and the threshold
const X0 = 150, X1 = 1380, BASE = 860, MAXR = 35;
const sx = (v: number) => X0 + (X1 - X0) * v / MAXR;
const PHONE = { x: 1756, y: 668, w: 112, h: 200 };

type Dot = { v: number; sick: boolean; x: number; y: number; i: number };
const DOTS: Dot[] = (() => {
  const vals: { v: number; sick: boolean }[] = [];
  for (let i = 0; i < 900; i++) vals.push({ v: 5 + 2.5 * PhiInv((i + 0.5) / 900), sick: false });
  for (let i = 0; i < 100; i++) vals.push({ v: 15 + 5 * PhiInv((i + 0.5) / 100), sick: true });
  const bins: Record<number, number> = {};
  return vals.map((d, i) => {
    const v = Math.min(34.8, Math.max(0.2, d.v)), b = Math.floor(v / 0.5), k = (bins[b] = (bins[b] ?? -1) + 1);
    return { v, sick: d.sick, i, x: sx(b * 0.5 + 0.25) + (k % 2 ? 4.7 : -4.7), y: BASE - 8 - Math.floor(k / 2) * 9.4 };
  });
})();

const DRAG0 = () => B('lower').start + 32, DRAG = 80;
const thrAt = (f: number) => lerp(10, 5, p(f, DRAG0(), DRAG0() + DRAG));
/** frame at which a dot first gets an alert (Infinity = never) */
const flagFrame = (v: number) => {
  const t10 = B('thr10').start + 30;
  if (v >= 10) return t10 + (v - 10) * 1.3;
  if (v < 5) return Infinity;
  for (let f = DRAG0(); f <= DRAG0() + DRAG; f++) if (thrAt(f) <= v) return f;
  return Infinity;
};
const FLY = 24;

const Population: React.FC<{ f: number }> = ({ f }) => {
  const z = B('zoom'), g = B('groups'), t10 = B('thr10'), lo = B('lower'), r5 = B('res5'), fa = B('fatigue');
  const flags = useMemo(() => DOTS.map(d => flagFrame(d.v)), []);
  const showThr = p(f, t10.start + 4, t10.start + 26);
  const thr = thrAt(f), lx = sx(thr);
  const caught = DOTS.filter((d, i) => d.sick && flags[i] <= f).length;
  const falseA = DOTS.filter((d, i) => !d.sick && flags[i] <= f).length;
  const arrived = DOTS.filter((d, i) => flags[i] + FLY <= f).length;
  const recent = DOTS.filter((d, i) => flags[i] + FLY <= f && flags[i] + FLY > f - 10).length;
  const panel = p(f, t10.start + 40, t10.start + 60);
  const exit = p(f, fa.start - 6, fa.start + 14);
  const overlapAt = g.start + g.dur * 0.7;
  // hand dragging the knob
  const hIn = p(f, lo.start + 4, DRAG0()), hOut = p(f, DRAG0() + DRAG + 6, DRAG0() + DRAG + 22);
  const handX = lerp(lx + 160, lx, hIn) + 120 * hOut, handY = BASE + 52 + lerp(90, 0, hIn) + 60 * hOut;
  const shake = Math.min(1, recent / 25) * Math.sin(f * 2.3) * 6;
  return (
    <AbsoluteFill style={{ background: C.paper, opacity: p(f, z.start - 2, z.start + 16) * (1 - exit) }}>
      <svg width={1920} height={1080}>
        {/* axis */}
        <line x1={X0 - 20} x2={X1 + 20} y1={BASE + 4} y2={BASE + 4} stroke="#c4baa6" strokeWidth={3} opacity={p(f, z.start + 10, z.start + 30)} />
        {[0, 5, 10, 15, 20, 25, 30, 35].map(v => <text key={v} x={sx(v)} y={BASE + 42} textAnchor="middle" fontFamily={SANS} fontSize={24} fill={C.muted} opacity={p(f, z.start + 14, z.start + 34)}>{v}%</text>)}
        <text x={X1 + 20} y={BASE + 84} textAnchor="end" fontFamily={SANS} fontSize={24} fontWeight={600} fill={C.muted} opacity={p(f, z.start + 20, z.start + 40)}>estimated risk →</text>
        {/* alert zone */}
        <rect x={lx} y={330} width={X1 + 30 - lx} height={BASE - 326} fill={C.amber} opacity={0.09 * showThr} />
        {/* dots */}
        {DOTS.map((d, i) => {
          const a = z.start + 6 + rand(i) * 46, t = p(f, a, a + 28);
          if (t <= 0) return null;
          const ox = 960 + (rand(i + 1) - 0.5) * 700, oy = 300 + (rand(i + 2) - 0.5) * 260;
          const reveal = p(f, g.start + (d.sick ? 20 + rand(i) * 18 : rand(i) * 18), g.start + (d.sick ? 30 + rand(i) * 18 : 10 + rand(i) * 18));
          const fl = flags[i] <= f, fk = fl ? p(f, flags[i], flags[i] + 8) : 0;
          let fill = reveal < 1 ? (d.sick ? mix('#9b9384', C.red, reveal) : mix('#9b9384', '#c9c0ae', reveal)) : d.sick ? C.red : '#c9c0ae';
          if (fl && !d.sick) fill = mix('#c9c0ae', C.amber, fk);
          const missed = d.sick && !fl && showThr > 0 ? 0.35 + 0.65 * (1 - showThr) : 1;
          const r = 4.2 * (1 + 0.9 * (fl ? 1 - fk : 0));
          return <circle key={i} cx={lerp(ox, d.x, t)} cy={lerp(oy, d.y, t)} r={r} fill={fill} opacity={missed} />;
        })}
        {/* group labels */}
        <g opacity={p(f, g.start + 8, g.start + 22) * (1 - p(f, t10.start, t10.start + 15))}>
          <text x={sx(5)} y={470} textAnchor="middle" fontFamily={SANS} fontSize={34} fontWeight={700} fill={C.muted}>900 will be fine</text>
        </g>
        <g opacity={p(f, g.start + 40, g.start + 54) * (1 - p(f, t10.start, t10.start + 15))}>
          <text x={sx(20)} y={720} textAnchor="middle" fontFamily={SANS} fontSize={34} fontWeight={700} fill={C.red}>100 will get worse</text>
          <path d={`M${sx(18)},735 q-20,40 -40,60`} fill="none" stroke={C.red} strokeWidth={3} />
        </g>
        <ellipse cx={sx(10.2)} cy={BASE - 40} rx={110} ry={70} fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray="12 10"
          opacity={p(f, overlapAt, overlapAt + 10) * (1 - p(f, t10.start - 5, t10.start + 10))} transform={`rotate(${f * 0.6} ${sx(10.2)} ${BASE - 40})`} />
        {/* threshold line */}
        {showThr > 0 && (
          <g>
            <line x1={lx} x2={lx} y1={BASE + 6} y2={lerp(BASE, 330, showThr)} stroke={C.blue} strokeWidth={5} />
            <circle cx={lx} cy={BASE + 6} r={16} fill={C.blue} stroke="#fff" strokeWidth={4} opacity={showThr} />
            <g transform={`translate(${lx},${300})`} opacity={showThr}>
              <rect x={-92} y={-36} width={184} height={60} rx={30} fill={C.blue} />
              <BellRing x={-74} y={-22} size={32} color="#fff" />
              <text x={22} y={6} textAnchor="middle" fontFamily={SANS} fontSize={32} fontWeight={800} fill="#fff">≥ {thr.toFixed(thr % 1 > 0.05 && thr % 1 < 0.95 ? 1 : 0)}%</text>
            </g>
          </g>
        )}
        {/* alerts flying to the nurse's phone */}
        {DOTS.map((d, i) => {
          const t = (f - flags[i]) / FLY;
          if (!(t > 0 && t < 1)) return null;
          const tx = PHONE.x + PHONE.w / 2, ty = PHONE.y + 60, cx = lerp(d.x, tx, 0.5), cy = Math.min(d.y, ty) - 160;
          const u = 1 - t, px = u * u * d.x + 2 * u * t * cx + t * t * tx, py = u * u * d.y + 2 * u * t * cy + t * t * ty;
          return <circle key={`p${i}`} cx={px} cy={py} r={5} fill={d.sick ? C.red : C.amber} opacity={0.85} />;
        })}
        {/* nurse with phone */}
        <g opacity={p(f, t10.start + 20, t10.start + 40)}>
          <g transform="translate(1700,1060) scale(0.62)"><Nurse armUp={1} tired={p(f, r5.start, r5.start + 60) * 0.6} blink={f % 97 < 4} /></g>
          <g transform={`translate(${PHONE.x},${PHONE.y}) rotate(${shake} ${PHONE.w / 2} ${PHONE.h / 2})`}>
            <Phone w={PHONE.w} h={PHONE.h} clipId="ph1">
              <rect x={0} y={0} width={PHONE.w} height={PHONE.h} fill={arrived > 60 ? '#fff1d6' : '#f6f4ef'} />
              <Bell x={PHONE.w / 2 - 22} y={44} size={44} color={C.amber} />
              <text x={PHONE.w / 2} y={140} textAnchor="middle" fontFamily={SANS} fontSize={arrived > 99 ? 34 : 40} fontWeight={800} fill={C.ink}>{arrived}</text>
            </Phone>
          </g>
        </g>
        {/* hand */}
        {hIn > 0 && hOut < 1 && <g transform={`translate(${handX - 22},${handY - 18})`} opacity={1 - hOut}><Hand size={60} color={C.ink} fill="#fff" strokeWidth={1.8} /></g>}
      </svg>
      {/* counters */}
      <div style={{ position: 'absolute', left: 1460, top: 120, width: 400, opacity: panel, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Counter icon={<UserCheck size={46} color={C.green} />} label="caught" value={`${caught}`} sub="/ 100" color={C.green} />
        <Counter icon={<UserX size={46} color={C.red} />} label="missed" value={`${100 - caught}`} sub="/ 100" color={C.red} />
        <Counter icon={<BellRing size={46} color={C.amber} />} label="false alarms" value={`${falseA}`} color={C.amber}
          glow={p(f, r5.start + r5.dur * 0.35, r5.start + r5.dur * 0.5) * (1 - p(f, r5.start + r5.dur + 20, r5.start + r5.dur + 40))} />
      </div>
    </AbsoluteFill>
  );
};

const Counter: React.FC<{ icon: React.ReactNode; label: string; value: string; sub?: string; color: string; glow?: number }> = ({ icon, label, value, sub, color, glow = 0 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fbf9f4', borderRadius: 18, padding: '14px 22px', border: `2px solid ${glow > 0 ? color : '#e2dacb'}`, transform: `scale(${1 + 0.08 * glow})`, transformOrigin: 'left center', boxShadow: glow > 0 ? `0 0 0 ${8 * glow}px ${color}33` : 'none' }}>
    {icon}
    <div style={{ font: `600 24px ${SANS}`, color: C.muted, flex: 1 }}>{label}</div>
    <div style={{ font: `800 52px ${SANS}`, color, fontVariantNumeric: 'tabular-nums' }}>{value}<span style={{ font: `600 24px ${SANS}`, color: C.muted }}> {sub}</span></div>
  </div>
);

const mix = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map(k => parseInt(s.slice(k, k + 2), 16));
  const A = h(a), Bc = h(b);
  return `rgb(${A.map((v, k) => Math.round(lerp(v, Bc[k], t))).join(',')})`;
};

// ---------------------------------------------------------------- scene D: alert fatigue
const PH = { x: 1080, y: 130, w: 430, h: 800 };
const CARD_H = 96;
type Card = { k: number; spawn: number; red?: boolean; bed: number; risk: number; swipe: number };
const cards = (): Card[] => {
  const fa = B('fatigue'), mi = B('missed');
  const out: Card[] = [];
  let t = fa.start + 6, k = 0;
  while (t < mi.start + 4) { out.push({ k, spawn: t, bed: 3 + Math.floor(rand(k * 3.7 + 11) * 40), risk: 5 + Math.floor(rand(k * 5.3 + 2) * 4), swipe: Infinity }); k++; t += Math.max(4, 11 - k * 0.25); }
  out.push({ k: k++, spawn: mi.start + 14, red: true, bed: 7, risk: 31, swipe: Infinity });
  out.push({ k: k++, spawn: mi.start + 22, bed: 22, risk: 6, swipe: Infinity });
  out.push({ k: k++, spawn: mi.start + 30, bed: 15, risk: 7, swipe: Infinity });
  // swipe from the newest down
  const order = [...out].sort((a, b) => b.spawn - a.spawn);
  order.forEach((c, j) => { c.swipe = mi.start + 44 + j * (j < 4 ? 7 : 4); });
  return out;
};

const Fatigue: React.FC<{ f: number }> = ({ f }) => {
  const fa = B('fatigue'), mi = B('missed'), tr = B('tradeoff');
  const list = useMemo(cards, []);
  const red = list.find(c => c.red)!;
  const alarm = f > red.swipe + 18 ? 0.5 + 0.5 * Math.sin((f - red.swipe) / 3) : 0;
  const tired = p(f, fa.start + 10, fa.start + fa.dur + 20);
  const vis = p(f, fa.start - 6, fa.start + 12) * (1 - p(f, tr.start - 8, tr.start + 10));
  const zoom = 1 + 0.06 * p(f, red.swipe + 10, red.swipe + 60);
  // stack position: index among unswiped-or-swiping cards spawned before now, newest first
  const live = list.filter(c => c.spawn <= f && f < c.swipe + 12).sort((a, b) => b.spawn - a.spawn);
  const swiping = live.find(c => f >= c.swipe && f < c.swipe + 10);
  return (
    <AbsoluteFill style={{ background: '#e6dfd0', opacity: vis }}>
      <svg width={1920} height={1080} style={{ transform: `scale(${zoom})`, transformOrigin: '900px 540px' }}>
        {/* blurred ward in the back */}
        <g opacity={0.5}>
          <rect x={0} y={760} width={1920} height={320} fill="#d6cdb9" />
          <g transform="translate(260,790) scale(0.9)"><Bed skin={C.skin[3]} blanket="#c8805a" breathe={0} /></g>
          <g transform="translate(450,490) scale(1)"><Monitor frame={f} alarm={alarm} hr={alarm ? 138 : 112} /></g>
        </g>
        {alarm > 0 && <circle cx={450} cy={530} r={150 + 30 * alarm} fill={C.red} opacity={0.12 * alarm} />}
        <g transform="translate(760,1180) scale(1.45)"><Nurse armUp={1} tired={tired} blink={f % 83 < 4 || (tired > 0.7 && f % 41 < 6)} /></g>
        <g transform={`translate(${PH.x},${PH.y})`}>
          <Phone w={PH.w} h={PH.h} clipId="ph2">
            <rect x={0} y={0} width={PH.w} height={64} fill="#efeae0" />
            <text x={24} y={44} fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.ink}>Alerts</text>
            <g transform={`translate(${PH.w - 80},18)`}><rect width={60} height={34} rx={17} fill={C.red} /><text x={30} y={25} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={22} fill="#fff">{list.filter(c => c.spawn <= f).length}</text></g>
            {live.map((c, idx) => {
              const inT = p(f, c.spawn, c.spawn + 7), sw = p(f, c.swipe, c.swipe + 9);
              const y = 80 + idx * (CARD_H + 10) - (1 - inT) * 40;
              return (
                <g key={c.k} transform={`translate(${14 - sw * 520},${y})`} opacity={inT * (1 - sw * 0.6)}>
                  <rect width={PH.w - 28} height={CARD_H} rx={16} fill={c.red ? '#fbe2dc' : '#fff'} stroke={c.red ? C.red : '#e2dacb'} strokeWidth={c.red ? 4 : 2} />
                  <circle cx={46} cy={CARD_H / 2} r={24} fill={c.red ? C.red : '#fbecd0'} />
                  <Bell x={32} y={CARD_H / 2 - 14} size={28} color={c.red ? '#fff' : C.amber} />
                  <text x={86} y={CARD_H / 2 + 10} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>Bed {c.bed}</text>
                  <text x={PH.w - 52} y={CARD_H / 2 + 11} textAnchor="end" fontFamily={SANS} fontWeight={800} fontSize={30} fill={c.red ? C.red : C.amber}>{c.risk}%</text>
                </g>
              );
            })}
          </Phone>
        </g>
        {/* thumb */}
        {swiping && (() => {
          const idx = live.indexOf(swiping), t = p(f, swiping.swipe - 2, swiping.swipe + 8);
          return <ellipse cx={PH.x + lerp(PH.w - 40, 60, t)} cy={PH.y + 80 + idx * (CARD_H + 10) + CARD_H / 2 + 20} rx={34} ry={46} fill="#e2b48c" stroke="#c9946c" strokeWidth={3} transform={`rotate(-20)`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />;
        })()}
        {/* the missed one */}
        {f > red.swipe + 6 && (
          <g opacity={p(f, red.swipe + 6, red.swipe + 18) * (1 - p(f, tr.start - 20, tr.start))} transform={`translate(${lerp(PH.x - 420, PH.x - 470, p(f, red.swipe, red.swipe + 40))},${PH.y + 10})`}>
            <rect width={PH.w - 28} height={CARD_H} rx={16} fill="#fbe2dc" stroke={C.red} strokeWidth={4} opacity={0.75} />
            <Bell x={32} y={CARD_H / 2 - 14} size={28} color={C.red} />
            <text x={86} y={CARD_H / 2 + 10} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>Bed 7</text>
            <text x={PH.w - 52} y={CARD_H / 2 + 11} textAnchor="end" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.red}>31%</text>
            <text x={(PH.w - 28) / 2} y={CARD_H + 56} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.red} opacity={p(f, red.swipe + 30, red.swipe + 42)}>missed</text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- scene E: the trade-off
const missedAt = (t: number) => 100 * Phi((t - 15) / 5);
const falseAt = (t: number) => 900 * (1 - Phi((t - 5) / 2.5));

const Tradeoff: React.FC<{ f: number }> = ({ f }) => {
  const tr = B('tradeoff'), de = B('depends');
  const vis = p(f, tr.start - 6, tr.start + 14) * (1 - p(f, TL.total - 24, TL.total - 4));
  const swing = p(f, tr.start + 20, tr.start + 40) * (1 - p(f, de.start + 20, de.start + 60));
  const thr = 8 + 6.5 * Math.sin((f - tr.start - 20) / 32) * swing;
  const mL = missedAt(thr), mR = falseAt(thr);
  const nL = Math.max(0, Math.min(10, Math.round(mL / 7))), nR = Math.max(0, Math.min(10, Math.round(mR / 40)));
  const ang = -Math.max(-13, Math.min(13, (mL * 9 - mR) / 40));
  const PV = { x: 960, y: 330 }, L = 380;
  const rad = ang * Math.PI / 180;
  const endL = { x: PV.x - L * Math.cos(rad), y: PV.y - L * Math.sin(rad) }, endR = { x: PV.x + L * Math.cos(rad), y: PV.y + L * Math.sin(rad) };
  const pan = (e: { x: number; y: number }, n: number, kind: 'L' | 'R') => (
    <g>
      <line x1={e.x} y1={e.y} x2={e.x - 110} y2={e.y + 200} stroke={C.muted} strokeWidth={3} />
      <line x1={e.x} y1={e.y} x2={e.x + 110} y2={e.y + 200} stroke={C.muted} strokeWidth={3} />
      <path d={`M${e.x - 140},${e.y + 200} Q${e.x},${e.y + 270} ${e.x + 140},${e.y + 200} Z`} fill={kind === 'L' ? '#f3d6cf' : '#f8e5c2'} stroke={kind === 'L' ? C.red : C.amber} strokeWidth={4} />
      {Array.from({ length: n }, (_, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        const x = e.x - 100 + col * 40, y = e.y + 150 - row * 44;
        return kind === 'L' ? <User key={i} x={x} y={y} size={40} color={C.red} fill={C.red} /> : <Bell key={i} x={x} y={y} size={38} color={C.amber} fill={C.amber} />;
      })}
      <text x={e.x} y={e.y + 320} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={32} fill={kind === 'L' ? C.red : '#b07714'}>{kind === 'L' ? 'missed patients' : 'false alarms'}</text>
    </g>
  );
  const sx2 = (t: number) => 610 + 700 * t / 20;
  const chips: [React.ReactNode, string][] = [[<HeartPulse size={44} color={C.red} />, 'consequences'], [<Users size={44} color={C.blue} />, 'staff'], [<Cpu size={44} color={C.ink} />, 'model'], [<User size={44} color={C.green} />, 'patient']];
  const dep = p(f, de.start - 10, de.start + 10);
  return (
    <AbsoluteFill style={{ background: C.paper, opacity: vis }}>
      <div style={{ position: 'absolute', top: 70, width: '100%', textAlign: 'center', font: `500 76px ${SERIF}`, color: C.ink, opacity: p(f, tr.start + 4, tr.start + 20), transform: `translateY(${(1 - p(f, tr.start + 4, tr.start + 20)) * 20}px)` }}>
        No <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>universal</span> threshold
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', transform: `translateY(${-40 * dep}px)` }}>
        <path d={`M${PV.x - 70},${PV.y + 420} L${PV.x + 70},${PV.y + 420} L${PV.x + 16},${PV.y} L${PV.x - 16},${PV.y}Z`} fill="#8a8273" />
        <g>{pan(endL, nL, 'L')}{pan(endR, nR, 'R')}</g>
        <line x1={endL.x} y1={endL.y} x2={endR.x} y2={endR.y} stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
        <circle cx={PV.x} cy={PV.y} r={18} fill={C.blue} />
        {/* slider */}
        <g opacity={p(f, tr.start + 14, tr.start + 30)}>
          <line x1={sx2(0)} x2={sx2(20)} y1={800} y2={800} stroke="#c4baa6" strokeWidth={8} strokeLinecap="round" />
          <circle cx={sx2(thr)} cy={800} r={22} fill={C.blue} stroke="#fff" strokeWidth={5} />
          <text x={sx2(0) - 30} y={810} textAnchor="end" fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.muted}>low</text>
          <text x={sx2(20) + 30} y={810} fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.muted}>high</text>
          <text x={sx2(10)} y={860} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.muted}>threshold</text>
        </g>
      </svg>
      <div style={{ position: 'absolute', top: 905, width: '100%', display: 'flex', justifyContent: 'center', gap: 34 }}>
        {chips.map(([icon, label], i) => {
          const a = de.start + de.dur * (0.3 + i * 0.16);
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fbf9f4', border: '2px solid #e2dacb', borderRadius: 40, padding: '12px 28px 12px 18px', opacity: p(f, a, a + 8), transform: `scale(${pop(f, a)})` }}>
              {icon}<span style={{ font: `600 30px ${SANS}`, color: C.ink }}>{label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- sound
const pings = () => {
  const arr = DOTS.map(d => flagFrame(d.v) + FLY).filter(isFinite).sort((a, b) => a - b);
  const out: number[] = [];
  for (const t of arr) if (!out.length || t - out[out.length - 1] >= 3) out.push(Math.round(t));
  return out;
};

export const Threshold: React.FC = () => {
  const f = useCurrentFrame();
  const z = B('zoom'), fa = B('fatigue'), tr = B('tradeoff');
  const pingList = useMemo(pings, []);
  const fat = useMemo(cards, []);
  const red = fat.find(c => c.red)!;
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {f < z.start + 30 && <Ward f={f} />}
      {f >= z.start - 4 && f < fa.start + 16 && <Population f={f} />}
      {f >= fa.start - 8 && f < tr.start + 12 && <Fatigue f={f} />}
      {f >= tr.start - 8 && <Tradeoff f={f} />}
      <Narration tl={TL} />
      {pingList.map((t, i) => <Sequence key={`p${i}`} from={t} durationInFrames={12}><Audio src={staticFile('sfx/ping.wav')} volume={0.22} /></Sequence>)}
      {fat.filter(c => c.spawn < red.swipe).map(c => <Sequence key={`c${c.k}`} from={c.spawn} durationInFrames={12}><Audio src={staticFile('sfx/ping.wav')} volume={c.red ? 0.4 : 0.14} /></Sequence>)}
      {[0, 1, 2, 3, 4, 5].map(i => <Sequence key={`b${i}`} from={red.swipe + 18 + i * 19} durationInFrames={8}><Audio src={staticFile('sfx/beep.wav')} volume={0.35} /></Sequence>)}
    </AbsoluteFill>
  );
};
