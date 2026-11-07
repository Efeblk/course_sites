// "The confusion matrix": 200 patients sort themselves into TP / FN / FP / TN, then the four metrics are read off it.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Bell, BellOff, Cpu, HeartPulse, ShieldCheck } from 'lucide-react';
import { C, makeTL, lerp, p, pop, rand } from './lib';
import { Narration, Sfx } from './kit';
import timeline from './timelines/matrix.json';

const { TL, B } = makeTL(timeline);
const SANS = '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
const SERIF = '"Iowan Old Style", Charter, Georgia, serif';
const SICK = C.red, WELL = '#6f83b3', GREY = '#a59d8e';

// ---- the matrix geometry
const MX = 330, MY = 250, CW = 520, CH = 290, G = 16;
const cell = (r: number, c: number) => ({ x: MX + c * (CW + G), y: MY + r * (CH + G) });
type Kind = 'tp' | 'fn' | 'fp' | 'tn';
const CELL: Record<Kind, [number, number]> = { tp: [0, 0], fp: [0, 1], fn: [1, 0], tn: [1, 1] };

type Person = { i: number; sick: boolean; kind: Kind; k: number; cx: number; cy: number; mx: number; my: number };
const PEOPLE: Person[] = (() => {
  const fnIdx = new Set([7, 18, 26, 39, 44, 58, 63, 71, 85, 96]);
  const fpIdx = new Set([12, 33, 57, 70, 91]);
  const count: Record<Kind, number> = { tp: 0, fn: 0, fp: 0, tn: 0 };
  const out: Person[] = [];
  for (let i = 0; i < 200; i++) {
    const sick = i < 100, j = i % 100;
    const kind: Kind = sick ? (fnIdx.has(j) ? 'fn' : 'tp') : fpIdx.has(j) ? 'fp' : 'tn';
    const k = count[kind]++;
    // crowd: two 10×10 blocks
    const cx = (sick ? 470 : 1150) + (j % 10) * 34, cy = 360 + Math.floor(j / 10) * 40;
    const c0 = cell(...CELL[kind]);
    const mx = c0.x + 34 + (k % 19) * 24.6, my = c0.y + 122 + Math.floor(k / 19) * 37;
    out.push({ i, sick, kind, k, cx, cy, mx, my });
  }
  return out;
})();

const Person: React.FC<{ x: number; y: number; color: string; s?: number; o?: number }> = ({ x, y, color, s = 1, o = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-17} r={7} fill={color} />
    <rect x={-9} y={-8} width={18} height={20} rx={8} fill={color} />
  </g>
);

const moveStart = (pp: Person) => {
  const b = B(pp.kind), n = pp.kind === 'tp' ? 90 : pp.kind === 'tn' ? 95 : pp.kind === 'fn' ? 10 : 5;
  return b.start + 10 + (pp.k / n) * Math.min(55, b.dur * 0.5);
};

const LABEL: Record<Kind, [string, string]> = { tp: ['TP', 'true positive'], fn: ['FN', 'false negative'], fp: ['FP', 'false positive'], tn: ['TN', 'true negative'] };
const NUM: Record<Kind, number> = { tp: 90, fn: 10, fp: 5, tn: 95 };

type Metric = { id: string; name: string; formula: string; num: Kind[]; den: Kind[]; val: number; frac: string; band: 'c0' | 'c1' | 'r0' | 'r1' };
const METRICS: Metric[] = [
  { id: 'sens', name: 'Sensitivity', formula: 'TP / (TP + FN)', num: ['tp'], den: ['tp', 'fn'], val: 90, frac: '90 / 100', band: 'c0' },
  { id: 'spec', name: 'Specificity', formula: 'TN / (TN + FP)', num: ['tn'], den: ['tn', 'fp'], val: 95, frac: '95 / 100', band: 'c1' },
  { id: 'ppv', name: 'PPV', formula: 'TP / (TP + FP)', num: ['tp'], den: ['tp', 'fp'], val: 95, frac: '90 / 95', band: 'r0' },
  { id: 'npv', name: 'NPV', formula: 'TN / (TN + FN)', num: ['tn'], den: ['tn', 'fn'], val: 90, frac: '95 / 105', band: 'r1' },
];

const Donut: React.FC<{ v: number; color: string }> = ({ v, color }) => {
  const r = 70, L = 2 * Math.PI * r;
  return (
    <svg width={180} height={180}>
      <circle cx={90} cy={90} r={r} fill="none" stroke="#e6dfd0" strokeWidth={22} />
      <circle cx={90} cy={90} r={r} fill="none" stroke={color} strokeWidth={22} strokeDasharray={`${(L * v) / 100} ${L}`} transform="rotate(-90 90 90)" strokeLinecap="round" />
      <text x={90} y={104} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={44} fill={C.ink}>{Math.round(v)}%</text>
    </svg>
  );
};

export const Matrix: React.FC = () => {
  const f = useCurrentFrame();
  const intro = B('intro'), scan = B('scan'), grid = B('grid'), tip = B('tip'), cost = B('cost');
  const reveal = p(f, intro.start + intro.dur * 0.45, intro.start + intro.dur * 0.75);
  const gridIn = p(f, grid.start, grid.start + 20);
  const beamX = lerp(380, 1560, p(f, scan.start + 10, scan.start + scan.dur - 10));
  const active = METRICS.find(m => f >= B(m.id).start - 4 && f < B(m.id).start + B(m.id).dur + 10);
  const dimAll = p(f, cost.start, cost.start + 15);
  const bandRect = (band: Metric['band']) => {
    const a = band[0] === 'c' ? cell(0, +band[1]) : cell(+band[1], 0);
    return band[0] === 'c' ? { x: a.x - 10, y: a.y - 10, w: CW + 20, h: 2 * CH + G + 20 } : { x: a.x - 10, y: a.y - 10, w: 2 * CW + G + 20, h: CH + 20 };
  };
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <svg width={1920} height={1080}>
        {/* group labels in the crowd phase */}
        <g opacity={reveal * (1 - p(f, B('tp').start, B('tp').start + 20))}>
          <HeartPulse x={575} y={800} size={44} color={SICK} />
          <text x={632} y={834} fontFamily={SANS} fontWeight={700} fontSize={36} fill={SICK}>100 sick</text>
          <ShieldCheck x={1250} y={800} size={44} color={WELL} />
          <text x={1307} y={834} fontFamily={SANS} fontWeight={700} fontSize={36} fill={WELL}>100 healthy</text>
        </g>
        {/* the model + scanning beam */}
        <g opacity={p(f, scan.start - 6, scan.start + 8) * (1 - p(f, B('tp').start, B('tp').start + 20))}>
          <g transform={`translate(960,140) scale(${pop(f, scan.start - 6)})`}>
            <circle r={58} fill={C.blue} />
            <Cpu x={-30} y={-30} size={60} color="#fff" strokeWidth={1.6} />
          </g>
          {f > scan.start + 8 && f < scan.start + scan.dur && <path d={`M960,190 L${beamX - 40},800 L${beamX + 40},800Z`} fill={C.blue} opacity={0.12} />}
        </g>
        {/* matrix cells */}
        {(Object.keys(CELL) as Kind[]).map(kd => {
          const c0 = cell(...CELL[kd]), good = kd === 'tp' || kd === 'tn';
          const a = B(kd).start + 6;
          const shown = p(f, a, a + 14);
          const n = Math.round(NUM[kd] * p(f, a + 4, a + 4 + Math.min(55, B(kd).dur * 0.5) + 20));
          const hl = active ? (active.num.includes(kd) ? 1 : active.den.includes(kd) ? 0.5 : 0) : 0;
          const dim = active && !active.den.includes(kd) ? 0.35 : 1;
          return (
            <g key={kd} opacity={shown * dim * (1 - 0.85 * dimAll)}>
              <rect x={c0.x} y={c0.y} width={CW} height={CH} rx={18} fill={good ? '#e3eee3' : '#f6e1dc'} stroke={good ? '#a9cbab' : '#e3aea3'} strokeWidth={hl === 1 ? 6 : 2} />
              <text x={c0.x + 28} y={c0.y + 70} fontFamily={SANS} fontWeight={800} fontSize={56} fill={good ? C.green : C.red}>{LABEL[kd][0]}</text>
              <text x={c0.x + 120} y={c0.y + 66} fontFamily={SANS} fontWeight={500} fontSize={26} fill={C.muted}>{LABEL[kd][1]}</text>
              <text x={c0.x + CW - 28} y={c0.y + 70} textAnchor="end" fontFamily={SANS} fontWeight={800} fontSize={56} fill={C.ink}>{n}</text>
            </g>
          );
        })}
        {/* highlight band for the active metric */}
        {METRICS.map(m => {
          const o = p(f, B(m.id).start, B(m.id).start + 12) * (1 - p(f, B(m.id).start + B(m.id).dur, B(m.id).start + B(m.id).dur + 12));
          if (o <= 0) return null;
          const r = bandRect(m.band);
          return <rect key={m.id} x={r.x} y={r.y} width={r.w} height={r.h} rx={24} fill="none" stroke={C.blue} strokeWidth={7} opacity={o} strokeDasharray={m.band[0] === 'c' ? undefined : '18 12'} />;
        })}
        {/* headers */}
        <g opacity={gridIn * (1 - 0.85 * dimAll)}>
          <text x={cell(0, 0).x + CW / 2} y={MY - 34} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={32} fill={SICK}>truly sick</text>
          <text x={cell(0, 1).x + CW / 2} y={MY - 34} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={32} fill={WELL}>truly healthy</text>
          <Bell x={MX - 112} y={MY + CH / 2 - 44} size={44} color={C.amber} />
          <text x={MX - 90} y={MY + CH / 2 + 34} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>alarm</text>
          <BellOff x={MX - 112} y={MY + CH + G + CH / 2 - 44} size={44} color={C.muted} />
          <text x={MX - 90} y={MY + CH + G + CH / 2 + 34} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.ink}>no alarm</text>
        </g>
        {/* truth / model-said arrows (memory tip) */}
        <g opacity={p(f, tip.start + 10, tip.start + 24) * (1 - p(f, cost.start, cost.start + 12))}>
          <path d={`M${MX + CW + G / 2 - 300},${MY - 105} h600`} stroke={C.blue} strokeWidth={0} />
          <text x={MX + CW + G / 2} y={MY - 90} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.blue}>↓ start from the truth: sensitivity, specificity</text>
        </g>
        <g opacity={p(f, tip.start + tip.dur * 0.55, tip.start + tip.dur * 0.55 + 14) * (1 - p(f, cost.start, cost.start + 12))}>
          <text x={MX - 175} y={MY + CH + G / 2} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.plum ?? '#8b3a8f'} transform={`rotate(-90 ${MX - 175} ${MY + CH + G / 2})`}>start from the model → PPV, NPV</text>
        </g>
        {/* people */}
        {PEOPLE.map(pp => {
          const t = p(f, moveStart(pp), moveStart(pp) + 26);
          const x = lerp(pp.cx, pp.mx, t), y = lerp(pp.cy, pp.my, t) - Math.sin(t * Math.PI) * 90;
          const color = reveal < 1 ? mixHex(GREY, pp.sick ? SICK : WELL, reveal) : pp.sick ? SICK : WELL;
          const scanned = f > scan.start + 8 && beamX > pp.cx;
          const alarmed = pp.kind === 'tp' || pp.kind === 'fp';
          const pulse = active && active.num.includes(pp.kind) ? 1 + 0.15 * Math.max(0, Math.sin((f - B(active.id).start) / 4 - pp.k / 6)) : 1;
          const dim = active && !active.den.includes(pp.kind) ? 0.3 : 1;
          return (
            <g key={pp.i}>
              <Person x={x} y={y} color={color} s={pulse} o={dim * (1 - 0.85 * dimAll)} />
              {scanned && alarmed && t < 1 && <circle cx={x} cy={y - 34} r={5} fill={C.amber} opacity={p(f, scan.start + 8, scan.start + 16)} />}
            </g>
          );
        })}
      </svg>
      {/* metric panel */}
      <div style={{ position: 'absolute', left: 1440, top: 230, width: 420 }}>
        {METRICS.map(m => {
          const b = B(m.id);
          const o = p(f, b.start + 6, b.start + 20) * (1 - p(f, b.start + b.dur + 6, b.start + b.dur + 18));
          if (o <= 0) return null;
          const v = m.val * p(f, b.start + b.dur * 0.55, b.start + b.dur * 0.85);
          return (
            <div key={m.id} style={{ position: 'absolute', top: 0, width: 420, opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ font: `700 46px ${SANS}`, color: C.blue }}>{m.name}</div>
              <div style={{ font: `500 28px ${SANS}`, color: C.muted }}>{m.formula}</div>
              <Donut v={v} color={C.blue} />
              <div style={{ font: `700 36px ${SANS}`, color: C.ink, opacity: p(f, b.start + b.dur * 0.55, b.start + b.dur * 0.65) }}>{m.frac}</div>
            </div>
          );
        })}
        {/* summary list once all four are done */}
        <div style={{ position: 'absolute', top: 0, width: 420, opacity: p(f, tip.start - 4, tip.start + 12) * (1 - 0.85 * dimAll) }}>
          {METRICS.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 6px', borderBottom: '2px solid #e2dacb' }}>
              <span style={{ font: `700 36px ${SANS}`, color: i < 2 ? C.blue : '#8b3a8f' }}>{m.name}</span>
              <span style={{ font: `800 44px ${SANS}`, color: C.ink }}>{m.val}%</span>
            </div>
          ))}
        </div>
      </div>
      {/* the cost of each mistake */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 60, flexDirection: 'row', opacity: p(f, cost.start + 6, cost.start + 20) * (1 - p(f, TL.total - 20, TL.total - 4)) }}>
        {[
          { at: 0.3, icon: <HeartPulse size={84} color={C.red} />, title: 'Missing a sick patient is dangerous', answer: 'high sensitivity', col: C.red },
          { at: 0.62, icon: <Bell size={84} color={C.amber} />, title: 'False alarms waste time and worry', answer: 'specificity and PPV', col: '#b07714' },
        ].map(card => {
          const a = cost.start + cost.dur * card.at;
          return (
            <div key={card.answer} style={{ width: 620, background: '#fbf9f4', borderRadius: 28, padding: '46px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, boxShadow: '0 20px 60px rgba(60,40,10,.12)', opacity: p(f, a - 20, a - 8), transform: `scale(${pop(f, a - 20)})` }}>
              {card.icon}
              <div style={{ font: `600 34px ${SANS}`, color: C.ink, textAlign: 'center' }}>{card.title}</div>
              <div style={{ font: `500 40px ${SERIF}`, color: card.col, opacity: p(f, a, a + 10) }}>→ {card.answer}</div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Narration tl={TL} />
      {(['tp', 'fn', 'tn', 'fp'] as Kind[]).map(k => <Sfx key={k} at={B(k).start + 8} name="whoosh" volume={0.35} />)}
      {(['tp', 'fn', 'tn', 'fp'] as Kind[]).map(k => <Sfx key={`p${k}`} at={B(k).start + 4 + Math.min(55, B(k).dur * 0.5) + 24} name="pop" volume={0.3} />)}
      {METRICS.map(m => <Sfx key={m.id} at={B(m.id).start + B(m.id).dur * 0.85} name="ping" volume={0.15} />)}
    </AbsoluteFill>
  );
};

const mixHex = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map(k => parseInt(s.slice(k, k + 2), 16));
  const A = h(a), Bc = h(b);
  return `rgb(${A.map((v, k) => Math.round(lerp(v, Bc[k], t))).join(',')})`;
};
void rand;
