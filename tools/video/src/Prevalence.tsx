// "Prevalence and the 99% accuracy trap": one model on three populations, then a lazy model that is 99% accurate.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Bell, Check, Cpu, X } from 'lucide-react';
import { C, makeTL, lerp, p, pop, rand } from './lib';
import { Narration, Sfx } from './kit';
import timeline from './timelines/prevalence.json';

const { TL, B } = makeTL(timeline);
const SANS = '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
const SERIF = '"Iowan Old Style", Charter, Georgia, serif';
const SICK = C.red, WELL = '#cfc6b4', FALSE = C.amber;

// waffle of 1000
const N = 1000, COLS = 40, PITCH = 25, WX = 130, WY = 230;
const home = (i: number) => ({ x: WX + (i % COLS) * PITCH, y: WY + Math.floor(i / COLS) * PITCH });
const rank = (() => { const idx = Array.from({ length: N }, (_, i) => i).sort((a, b) => rand(a * 1.7) - rand(b * 1.7)); const r: number[] = []; idx.forEach((v, k) => (r[v] = k)); return r; })();
const rank2 = (() => { const idx = Array.from({ length: N }, (_, i) => i).sort((a, b) => rand(a * 3.1 + 5) - rand(b * 3.1 + 5)); const r: number[] = []; idx.forEach((v, k) => (r[v] = k)); return r; })();

type Phase = { S: number; show: string; res: string; tp: number; fp: number; ppv: number };
const PH: Phase[] = [
  { S: 500, show: 'p50', res: 'p50r', tp: 450, fp: 50, ppv: 90 },
  { S: 100, show: 'p10', res: 'p10r', tp: 90, fp: 90, ppv: 50 },
  { S: 10, show: 'p1', res: 'p1r', tp: 9, fp: 99, ppv: 8 },
];
/** per phase: sick?, flagged? and bucket slot for each person */
const STATE = PH.map(ph => {
  const sick = rank.map(r => r < ph.S);
  const sickIds = sick.map((s, i) => (s ? i : -1)).filter(i => i >= 0).sort((a, b) => rank2[a] - rank2[b]);
  const wellIds = sick.map((s, i) => (!s ? i : -1)).filter(i => i >= 0).sort((a, b) => rank2[a] - rank2[b]);
  const tp = sickIds.slice(0, ph.tp), fp = wellIds.slice(0, ph.fp);
  const slot = new Map<number, number>();
  [...tp, ...fp].forEach((id, k) => slot.set(id, k));
  return { sick, slot, tpSet: new Set(tp) };
});
const BX = 1290, BY = 300, BP = 13;
const bucket = (k: number) => ({ x: BX + (k % 20) * BP, y: BY + Math.floor(k / 20) * BP });

const mixHex = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map(k => parseInt(s.slice(k, k + 2), 16));
  const A = h(a), Bc = h(b);
  return `rgb(${A.map((v, k) => Math.round(lerp(v, Bc[k], t))).join(',')})`;
};

const Gauge: React.FC<{ v: number; label: string; color: string; o: number }> = ({ v, label, color, o }) => {
  const a = Math.PI * (1 - v / 100), r = 150;
  return (
    <div style={{ opacity: o, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={360} height={210}>
        <path d={`M30,190 A${r},${r} 0 0 1 330,190`} fill="none" stroke="#e6dfd0" strokeWidth={30} strokeLinecap="round" />
        {v > 0.5 && <path d={`M30,190 A${r},${r} 0 0 1 ${180 + r * Math.cos(a)},${190 - r * Math.sin(a)}`} fill="none" stroke={color} strokeWidth={30} strokeLinecap="round" />}
        <text x={180} y={175} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={64} fill={color}>{Math.round(v)}%</text>
      </svg>
      <div style={{ font: `700 36px ${SANS}`, color: C.ink, marginTop: 6 }}>{label}</div>
    </div>
  );
};

export const Prevalence: React.FC = () => {
  const f = useCurrentFrame();
  const same = B('same'), lesson = B('lesson'), trap = B('trap'), lazy = B('lazy'), acc = B('acc'), s0 = B('sens0'), end = B('end');
  let ph = -1; PH.forEach((q, k) => { if (f >= B(q.show).start - 2) ph = k; });
  const inLesson = f >= lesson.start - 6 && f < trap.start - 4;
  const inTrap = f >= trap.start - 4;
  const lessonO = p(f, lesson.start - 6, lesson.start + 12) * (1 - p(f, trap.start - 14, trap.start));
  const waffleO = p(f, B('p50').start - 10, B('p50').start + 6) * (1 - lessonO);
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    const h = home(i);
    let x = h.x, y = h.y, fill = WELL, ring = 0, ringCol = FALSE;
    if (!inTrap && ph >= 0) {
      const st = STATE[ph], q = PH[ph], show = B(q.show), res = B(q.res);
      const prevSick = ph > 0 ? STATE[ph - 1].sick[i] : false;
      const c = p(f, show.start + 10 + (rank[i] / N) * 30, show.start + 22 + (rank[i] / N) * 30);
      fill = mixHex(prevSick ? SICK : WELL, st.sick[i] ? SICK : WELL, ph === 0 && !st.sick[i] ? 1 : c);
      if (ph === 0) fill = st.sick[i] ? mixHex(WELL, SICK, c) : WELL;
      // returning from the previous bucket
      if (ph > 0 && STATE[ph - 1].slot.has(i)) {
        const b0 = bucket(STATE[ph - 1].slot.get(i)!), t = p(f, show.start - 2, show.start + 16);
        x = lerp(b0.x, h.x, t); y = lerp(b0.y, h.y, t);
      }
      if (st.slot.has(i)) {
        const k = st.slot.get(i)!, flagAt = res.start + 4 + (k / (q.tp + q.fp)) * 18, fly = res.start + 30 + (k / (q.tp + q.fp)) * 40;
        ring = p(f, flagAt, flagAt + 6) * (1 - p(f, fly, fly + 10));
        ringCol = st.tpSet.has(i) ? SICK : FALSE;
        const t = p(f, fly, fly + 24), b = bucket(k);
        x = lerp(x, b.x, t); y = lerp(y, b.y, t) - Math.sin(t * Math.PI) * 60;
        if (!st.tpSet.has(i)) fill = mixHex(WELL, FALSE, p(f, flagAt, flagAt + 8));
      }
    }
    if (inTrap) {
      const sick = rank[i] < 10;
      fill = sick ? SICK : mixHex(WELL, '#8fc196', p(f, lazy.start + 20 + (rank2[i] / N) * 25, lazy.start + 30 + (rank2[i] / N) * 25));
      if (sick) { ring = p(f, s0.start, s0.start + 10); ringCol = SICK; }
    }
    dots.push(
      <g key={i}>
        {ring > 0 && <circle cx={x} cy={y} r={14 + (inTrap ? 6 * Math.sin(f / 5) : 0)} fill="none" stroke={ringCol} strokeWidth={3} opacity={ring} />}
        <circle cx={x} cy={y} r={8.5} fill={fill} />
      </g>,
    );
  }
  const q = ph >= 0 ? PH[ph] : PH[0];
  const res = B(q.res), show = B(q.show);
  const sickCount = Math.round(lerp(ph > 0 ? PH[ph - 1].S : 0, q.S, p(f, show.start + 10, show.start + 40)));
  const ppvO = p(f, res.start + res.dur * 0.55, res.start + res.dur * 0.7);
  const bucketO = p(f, res.start + 20, res.start + 34) * (1 - p(f, B(PH[Math.min(ph + 1, 2)].show).start - 2, B(PH[Math.min(ph + 1, 2)].show).start + 4) * (ph < 2 ? 1 : 0));
  const trapO = p(f, trap.start - 4, trap.start + 14) * (1 - p(f, TL.total - 20, TL.total - 4));
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {/* the model's spec card */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: same.start <= f && f < B('p50').start ? 330 : 60, display: 'flex', justifyContent: 'center', opacity: p(f, same.start + 4, same.start + 18) * (1 - lessonO) * (1 - trapO), transition: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, background: '#fbf9f4', border: '2px solid #e2dacb', borderRadius: 60, padding: '16px 40px 16px 20px', transform: `scale(${f < B('p50').start ? 1.5 : 1})` }}>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Cpu size={40} color="#fff" /></div>
          <span style={{ font: `600 32px ${SANS}`, color: C.ink, opacity: p(f, same.start + same.dur * 0.15, same.start + same.dur * 0.25) }}>catches <b style={{ color: SICK }}>90%</b> of the sick</span>
          <span style={{ font: `600 32px ${SANS}`, color: C.ink, opacity: p(f, same.start + same.dur * 0.35, same.start + same.dur * 0.45) }}>· clears <b style={{ color: C.green }}>90%</b> of the healthy</span>
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <g opacity={Math.max(waffleO, trapO)}>{dots}</g>
      </svg>
      {/* population label */}
      {!inTrap && ph >= 0 && (
        <div style={{ position: 'absolute', left: WX - 10, top: 150, opacity: waffleO, font: `600 38px ${SANS}`, color: C.ink }}>
          prevalence <b style={{ color: SICK, font: `800 46px ${SANS}` }}>{Math.round((sickCount / N) * 100)}%</b>
          <span style={{ color: C.muted, marginLeft: 22, font: `500 30px ${SANS}` }}>{sickCount} sick in 1,000</span>
        </div>
      )}
      {/* alarm bucket + PPV */}
      {!inTrap && ph >= 0 && (
        <div style={{ position: 'absolute', left: BX - 30, top: BY - 90, width: 320, opacity: waffleO * Math.max(bucketO, ppvO > 0 ? 1 : 0) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, font: `700 32px ${SANS}`, color: C.ink }}><Bell size={36} color={FALSE} /> alarms</div>
        </div>
      )}
      {!inTrap && ph >= 0 && (
        <div style={{ position: 'absolute', left: BX - 30, top: 700, width: 520, opacity: waffleO * ppvO * (1 - p(f, B(PH[Math.min(ph + 1, 2)].show).start - 2, B(PH[Math.min(ph + 1, 2)].show).start + 4) * (ph < 2 ? 1 : 0)) }}>
          <div style={{ font: `600 30px ${SANS}`, color: C.muted }}><b style={{ color: SICK }}>{q.tp}</b> real · <b style={{ color: '#b07714' }}>{q.fp}</b> false</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 6 }}>
            <span style={{ font: `700 44px ${SANS}`, color: C.blue }}>PPV</span>
            <span style={{ font: `800 96px ${SANS}`, color: C.ink }}>{Math.round(q.ppv * ppvO)}%</span>
          </div>
          <div style={{ height: 22, borderRadius: 11, background: '#f2dfb8', overflow: 'hidden', width: 460 }}><div style={{ width: `${q.ppv * ppvO}%`, height: '100%', background: SICK }} /></div>
        </div>
      )}
      {/* lesson: three bars */}
      {inLesson && (
        <AbsoluteFill style={{ opacity: lessonO, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 50 }}>
          <div style={{ font: `500 60px ${SERIF}`, color: C.ink }}>Same model, <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>rarer condition</span> → lower PPV</div>
          <div style={{ display: 'flex', gap: 110, alignItems: 'flex-end', height: 460 }}>
            {PH.map((q2, k) => {
              const t = p(f, lesson.start + 8 + k * 10, lesson.start + 34 + k * 10);
              return (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <div style={{ font: `800 60px ${SANS}`, color: k === 2 ? SICK : C.blue }}>{Math.round(q2.ppv * t)}%</div>
                  <div style={{ width: 220, height: 3.6 * q2.ppv * t, background: k === 2 ? SICK : C.blue, borderRadius: '10px 10px 0 0' }} />
                  <div style={{ font: `600 30px ${SANS}`, color: C.muted }}>{[50, 10, 1][k]}% sick</div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}
      {/* the accuracy trap */}
      {inTrap && (
        <>
          <div style={{ position: 'absolute', left: WX - 10, top: 150, opacity: trapO, font: `600 38px ${SANS}`, color: C.ink }}><b style={{ color: SICK }}>10</b> sick in 1,000</div>
          <div style={{ position: 'absolute', left: 1240, top: 120, opacity: p(f, lazy.start + 4, lazy.start + 16) * trapO, transform: `scale(${pop(f, lazy.start + 4)})`, transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ width: 90, height: 90, borderRadius: 45, background: '#8a8273', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Cpu size={50} color="#fff" /></div>
            <div style={{ background: '#fbf9f4', border: '2px solid #e2dacb', borderRadius: 26, padding: '18px 30px', font: `600 38px ${SERIF}`, color: C.ink }}>“Nobody is sick.”</div>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 330, width: 620, display: 'flex', justifyContent: 'space-between' }}>
            <Gauge v={99 * p(f, acc.start + 10, acc.start + acc.dur * 0.7)} label="accuracy" color={C.green} o={p(f, acc.start, acc.start + 10) * trapO} />
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 640, width: 620, opacity: p(f, s0.start + s0.dur * 0.4, s0.start + s0.dur * 0.6) * trapO }}>
            <Gauge v={0} label="sensitivity" color={SICK} o={1} />
          </div>
          <div style={{ position: 'absolute', left: 1630, top: 470, opacity: p(f, acc.start + 30, acc.start + 40) * trapO, display: 'flex', flexDirection: 'column', gap: 18, font: `600 30px ${SANS}`, color: C.ink }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Check size={34} color={C.green} /> 990 right</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: p(f, s0.start, s0.start + 10) }}><X size={34} color={SICK} /> 10 missed</span>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', opacity: p(f, end.start + 10, end.start + 24) * trapO, font: `500 52px ${SERIF}`, color: C.ink }}>
            On imbalanced data, <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>accuracy can fool you</span>.
          </div>
        </>
      )}
      <Narration tl={TL} />
      {PH.map(q2 => <Sfx key={q2.res} at={B(q2.res).start + 30} name="whoosh" volume={0.35} />)}
      {PH.map(q2 => <Sfx key={`p${q2.res}`} at={B(q2.res).start + B(q2.res).dur * 0.7} name="ping" volume={0.18} />)}
      <Sfx at={lazy.start + 20} name="whoosh" volume={0.3} />
      <Sfx at={s0.start + s0.dur * 0.5} name="beep" volume={0.3} />
    </AbsoluteFill>
  );
};
