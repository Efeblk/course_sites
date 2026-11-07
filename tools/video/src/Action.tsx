// "From prediction to action": the alert nobody owns, then the six steps as a journey along a track.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Bell, ChartLine, Check, Cpu, Crosshair, Database, FileText, FlaskConical, HeartPulse, Hospital, SlidersHorizontal, Timer, UserCheck, X } from 'lucide-react';
import { C, makeTL, lerp, p, pop, rand } from './lib';
import { Narration, Sfx } from './kit';
import { Bed, Monitor, Nurse, StaffLook } from './art';
import timeline from './timelines/action.json';

const { TL, B } = makeTL(timeline);
const SANS = '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
const SERIF = '"Iowan Old Style", Charter, Georgia, serif';
const DOCTOR: StaffLook = { coat: true, cap: false, scrub: '#5a78c8', scrubDark: '#3d5596', hair: '#2a2420', skin: '#c98e66' };
const ICU: StaffLook = { cap: false, scrub: '#8a74b8', scrubDark: '#64528f', hair: '#6b4a2a', skin: '#f0c9a4' };

const vis = (f: number, a: number, b: number, fade = 12) => p(f, a - fade, a) * (1 - p(f, b - fade, b));
const T = (s: string, x: number, y: number, size: number, col: string, o = 1, anchor: 'start' | 'middle' | 'end' = 'middle', w = 700) =>
  <text x={x} y={y} textAnchor={anchor} fontFamily={SANS} fontWeight={w} fontSize={size} fill={col} opacity={o}>{s}</text>;

// ------------------------------------------------ A: works in testing
const Lab: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook');
  const draw = p(f, h.start + 30, h.start + h.dur * 0.8);
  const pts = Array.from({ length: 41 }, (_, k) => { const x = k / 40; return [x, 1 - Math.pow(1 - x, 6)]; });
  const n = Math.max(2, Math.round(41 * draw));
  const path = pts.slice(0, n).map(([x, y], k) => `${k ? 'L' : 'M'}${980 + x * 520},${760 - y * 460}`).join(' ');
  return (
    <g>
      <g transform={`translate(560,520) scale(${pop(f, h.start + 4, 18)})`}>
        <circle r={150} fill="#dfe5f7" /><circle r={105} fill={C.blue} /><Cpu x={-54} y={-54} size={108} color="#fff" strokeWidth={1.5} />
      </g>
      <rect x={960} y={280} width={560} height={500} rx={20} fill="#fbf9f4" stroke="#e2dacb" strokeWidth={3} opacity={p(f, h.start + 14, h.start + 26)} />
      <line x1={980} y1={760} x2={1500} y2={300} stroke="#d9d1c1" strokeWidth={3} strokeDasharray="10 10" opacity={p(f, h.start + 20, h.start + 30)} />
      <path d={path} fill="none" stroke={C.green} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(1480,300) scale(${pop(f, h.start + h.dur * 0.82)})`}>
        <circle r={56} fill={C.green} /><Check x={-34} y={-34} size={68} color="#fff" strokeWidth={3} />
      </g>
      {T('tested', 1240, 850, 40, C.muted, p(f, h.start + 20, h.start + 32), 'middle', 600)}
    </g>
  );
};

// ------------------------------------------------ B: live on the wards
const BEDS = [360, 960, 1560];
const Live: React.FC<{ f: number }> = ({ f }) => {
  const l = B('live');
  return (
    <g>
      <rect x={0} y={0} width={1920} height={800} fill="#e9e1d0" /><rect x={0} y={800} width={1920} height={280} fill="#d9cdb6" />
      {BEDS.map((x, i) => (
        <g key={i}>
          <g transform={`translate(${x + 180},${508})`}><Monitor frame={f} seed={i} hr={[72, 96, 80][i]} /></g>
          <g transform={`translate(${x},800) scale(1.15)`}><Bed skin={C.skin[i + 1]} blanket={['#6a9f9a', '#c8805a', '#8a74b8'][i]} breathe={2 * Math.sin(f / 22 + i)} /></g>
        </g>
      ))}
      <g transform={`translate(960,170) scale(${pop(f, l.start)})`}><circle r={70} fill={C.blue} /><Cpu x={-38} y={-38} size={76} color="#fff" strokeWidth={1.6} /></g>
      {Array.from({ length: 14 }, (_, k) => {
        const a = l.start + 30 + k * 7, t = p(f, a, a + 60);
        if (t <= 0) return null;
        const ang = -Math.PI / 2 + (rand(k) - 0.5) * 2.6, d = 120 + t * (260 + rand(k + 3) * 200);
        return <g key={k} transform={`translate(${960 + Math.cos(ang) * d - 22},${170 + Math.sin(ang) * d * 0.45 + t * 220 - 22})`} opacity={Math.min(1, t * 4) * (1 - p(f, B('who').start - 10, B('who').start))}>
          <circle cx={22} cy={22} r={30} fill="#fff" stroke={C.amber} strokeWidth={3} /><Bell x={6} y={6} size={32} color={C.amber} />
        </g>;
      })}
    </g>
  );
};

// ------------------------------------------------ C: nobody owns it
const STAFF = [{ x: 480, look: {} as StaffLook }, { x: 960, look: DOCTOR }, { x: 1440, look: ICU }];
const Who: React.FC<{ f: number }> = ({ f }) => {
  const w = B('who'), bo = B('bounce');
  const hops = [0, 1, 2, 1, 0, 2, 1, 0, 1, 2, 0, 1];
  const hopLen = 16, h0 = bo.start - 10;
  const k = Math.floor((f - h0) / hopLen), t = ((f - h0) % hopLen) / hopLen;
  let ball: { x: number; y: number } | null = null;
  if (f >= h0 && k < hops.length - 1) {
    const a = STAFF[hops[k]].x, b = STAFF[hops[k + 1]].x;
    ball = { x: lerp(a, b, t), y: 330 - Math.sin(t * Math.PI) * 180 };
  }
  const unread = f >= h0 ? Math.min(99, 3 + Math.floor((f - h0) / 6)) : 0;
  return (
    <g>
      <rect x={0} y={880} width={1920} height={200} fill="#e2d8c4" />
      {STAFF.map((s, i) => {
        const a = w.start + w.dur * [0.22, 0.45, 0.7][i];
        const shrug = f > h0 ? Math.sin((f - h0) / 6 + i) * 3 : 0;
        return (
          <g key={i}>
            <g transform={`translate(${s.x},${900}) scale(0.88) rotate(${shrug})`}><Nurse armUp={0.25} look={s.look} blink={(f + i * 20) % 90 < 4} tired={f > h0 ? 0.3 : 0} /></g>
            <g transform={`translate(${s.x + 70},${300}) scale(${pop(f, a)})`} opacity={p(f, a, a + 6)}>
              <circle r={44} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
              <text x={0} y={22} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={64} fill={C.blue}>?</text>
            </g>
            {T(['nurse', 'doctor', 'ICU team'][i], s.x, 990, 34, C.muted, p(f, a, a + 10), 'middle', 600)}
          </g>
        );
      })}
      {ball && <g transform={`translate(${ball.x - 34},${ball.y - 34})`}><circle cx={34} cy={34} r={40} fill={C.amber} /><Bell x={12} y={12} size={44} color="#fff" /></g>}
      <g opacity={p(f, h0, h0 + 10)} transform="translate(1700,120)">
        <rect x={-120} y={-50} width={240} height={100} rx={50} fill={C.red} />
        <Bell x={-96} y={-24} size={48} color="#fff" />
        {T(`${unread}`, 40, 20, 54, '#fff', 1, 'middle', 800)}
      </g>
    </g>
  );
};

// ------------------------------------------------ D: more work, no better outcomes
const Result: React.FC<{ f: number }> = ({ f }) => {
  const r = B('result');
  const work = p(f, r.start + 10, r.start + 70);
  const line = p(f, r.start + 40, r.start + 100);
  const pts = Array.from({ length: 30 }, (_, k) => `${k ? 'L' : 'M'}${1080 + k * 22},${560 + Math.sin(k * 1.3) * 10}`).slice(0, Math.max(2, Math.round(30 * line))).join(' ');
  return (
    <g>
      <rect x={380} y={200} width={460} height={420} rx={20} fill="#fbf9f4" stroke="#e2dacb" strokeWidth={3} />
      <rect x={545} y={600 - 360 * work} width={130} height={360 * work} rx={10} fill={C.red} />
      {T('staff workload', 610, 690, 36, C.ink)}
      <path d="M610,170 l0,-1" />
      <g opacity={work}><path d={`M610,${230 - 0} l-26,40 h52z`} fill={C.red} transform={`translate(0,${(1 - work) * 360})`} /></g>
      <rect x={1060} y={200} width={680} height={420} rx={20} fill="#fbf9f4" stroke="#e2dacb" strokeWidth={3} />
      <path d={pts} fill="none" stroke={C.muted} strokeWidth={7} strokeLinecap="round" />
      {T('patient outcomes', 1400, 690, 36, C.ink)}
      {T('no change', 1400, 470, 34, C.muted, p(f, r.start + 100, r.start + 110), 'middle', 600)}
      <foreignObject x={260} y={770} width={1400} height={200}>
        <div style={{ font: `500 50px ${SERIF}`, color: C.ink, textAlign: 'center', opacity: p(f, r.start + r.dur * 0.45, r.start + r.dur * 0.55) }}>
          Knowing a problem may happen is useful <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>only if you can do something about it</span>.
        </div>
      </foreignObject>
    </g>
  );
};

// ------------------------------------------------ E: the six steps
const STEPS = [
  { id: 's1', icon: Crosshair, label: 'target' }, { id: 's2', icon: Database, label: 'data' }, { id: 's3', icon: Cpu, label: 'validated model' },
  { id: 's4', icon: SlidersHorizontal, label: 'threshold' }, { id: 's5', icon: UserCheck, label: 'response' }, { id: 's6', icon: ChartLine, label: 'measure' },
];
const TX = (k: number) => 290 + k * 268, TY = 930;

const Vignette: React.FC<{ f: number; k: number }> = ({ f, k }) => {
  const b = B(STEPS[k].id), a = b.start, d = b.dur;
  const at = (x: number) => a + d * x;
  if (k === 0) { // clock + horizons
    const ang = 360 * p(f, a + 10, at(0.9));
    const opts = ['6 h', '24 h', '7 days'];
    return (
      <g>
        <circle cx={700} cy={430} r={190} fill="#fbf9f4" stroke={C.ink} strokeWidth={8} />
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1={700} y1={262} x2={700} y2={282} stroke={C.ink} strokeWidth={6} transform={`rotate(${i * 30} 700 430)`} />)}
        <line x1={700} y1={430} x2={700} y2={300} stroke={C.blue} strokeWidth={10} strokeLinecap="round" transform={`rotate(${ang} 700 430)`} />
        <path d={`M700,430 L700,240 A190,190 0 ${ang > 180 ? 1 : 0} 1 ${700 + 190 * Math.sin(ang * Math.PI / 180)},${430 - 190 * Math.cos(ang * Math.PI / 180)} Z`} fill={C.blue} opacity={0.12} />
        <circle cx={700} cy={430} r={14} fill={C.blue} />
        {opts.map((o, i) => {
          const t0 = at(0.42 + i * 0.13), chosen = i === 1 && f > at(0.88);
          return <g key={o} transform={`translate(1180,${290 + i * 140}) scale(${pop(f, t0)})`} opacity={p(f, t0, t0 + 6) * (i !== 1 && f > at(0.88) ? 0.35 : 1)}>
            <rect x={-130} y={-50} width={260} height={100} rx={50} fill={chosen ? C.blue : '#fbf9f4'} stroke={C.blue} strokeWidth={4} />
            {T(o, 0, 18, 48, chosen ? '#fff' : C.blue, 1, 'middle', 800)}
          </g>;
        })}
      </g>
    );
  }
  if (k === 1) { // data available at prediction time vs leakage
    const now = 1060;
    const cards = [{ x: 420, I: HeartPulse, c: C.red }, { x: 600, I: FlaskConical, c: C.blue }, { x: 780, I: FileText, c: C.muted }];
    const stop = p(f, at(0.45), at(0.62));
    return (
      <g>
        <line x1={300} y1={600} x2={1620} y2={600} stroke="#c4baa6" strokeWidth={6} />
        <line x1={now} y1={180} x2={now} y2={640} stroke={C.blue} strokeWidth={6} strokeDasharray="14 10" />
        {T('now: prediction time', now, 690, 32, C.blue)}
        {T('past', 560, 690, 30, C.muted, 1, 'middle', 600)}{T('future', 1400, 690, 30, C.muted, 1, 'middle', 600)}
        <g transform={`translate(${now},300)`}><circle r={70} fill={C.blue} /><Cpu x={-38} y={-38} size={76} color="#fff" strokeWidth={1.6} /></g>
        {cards.map((c, i) => {
          const t = p(f, a + 14 + i * 10, a + 44 + i * 10);
          return <g key={i} transform={`translate(${lerp(c.x, now - 40, t) - 50},${lerp(470, 300, t) - 50}) scale(${1 - 0.6 * t})`} opacity={1 - p(f, a + 40 + i * 10, a + 46 + i * 10)}>
            <rect width={100} height={100} rx={18} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} /><c.I x={22} y={22} size={56} color={c.c} />
          </g>;
        })}
        <g transform={`translate(${lerp(1420, 1180, stop) - 50},${420})`} opacity={p(f, at(0.3), at(0.38))}>
          <rect width={100} height={100} rx={18} fill="#fbf9f4" stroke={C.red} strokeWidth={4} /><FlaskConical x={22} y={22} size={56} color={C.red} />
          <g transform={`translate(80,-10) scale(${pop(f, at(0.62))})`}><circle r={30} fill={C.red} /><X x={-20} y={-20} size={40} color="#fff" strokeWidth={3.5} /></g>
        </g>
        {T('leakage', 1230, 590, 44, C.red, p(f, at(0.64), at(0.72)), 'middle', 800)}
      </g>
    );
  }
  if (k === 2) { // validated in your hospital
    const prog = p(f, at(0.45), at(0.85));
    return (
      <g>
        <g transform="translate(960,300)"><circle r={90} fill={C.blue} /><Cpu x={-50} y={-50} size={100} color="#fff" strokeWidth={1.5} /></g>
        {[{ x: 560, lbl: 'another hospital', on: 1 }, { x: 1360, lbl: 'your hospital', on: prog }].map((h, i) => (
          <g key={i} opacity={p(f, a + 10 + i * 30, a + 22 + i * 30)}>
            <Hospital x={h.x - 80} y={420} size={160} color={i ? C.blue : C.muted} strokeWidth={1.4} />
            {T(h.lbl, h.x, 640, 36, C.ink, 1, 'middle', 600)}
            {i === 1 && <><rect x={h.x - 130} y={670} width={260} height={18} rx={9} fill="#e6dfd0" /><rect x={h.x - 130} y={670} width={260 * prog} height={18} rx={9} fill={C.green} /></>}
            <g transform={`translate(${h.x + 80},430) scale(${i ? pop(f, at(0.86)) : 1})`} opacity={i ? 1 : 0.5}><circle r={36} fill={C.green} /><Check x={-22} y={-22} size={44} color="#fff" strokeWidth={3} /></g>
          </g>
        ))}
        <path d={`M870,330 Q700,360 640,420`} fill="none" stroke="#c4baa6" strokeWidth={5} strokeDasharray="10 10" />
        <path d={`M1050,330 Q1220,360 1280,420`} fill="none" stroke="#c4baa6" strokeWidth={5} strokeDasharray="10 10" opacity={p(f, a + 40, a + 50)} />
      </g>
    );
  }
  if (k === 3) { // threshold over a row of patients
    const lx = lerp(1560, 1110, p(f, a + 14, at(0.6)));
    return (
      <g>
        <line x1={380} y1={560} x2={1560} y2={560} stroke="#c4baa6" strokeWidth={6} />
        {T('lower risk', 420, 620, 30, C.muted, 1, 'start', 600)}{T('higher risk', 1540, 620, 30, C.muted, 1, 'end', 600)}
        {Array.from({ length: 14 }, (_, i) => {
          const x = 430 + i * 82, on = x > lx;
          const col = `rgb(${Math.round(lerp(190, 200, i / 13))},${Math.round(lerp(180, 67, i / 13))},${Math.round(lerp(160, 47, i / 13))})`;
          return <g key={i}>
            <circle cx={x} cy={470} r={14} fill={col} /><rect x={x - 17} y={486} width={34} height={44} rx={14} fill={col} />
            {on && <g transform={`translate(${x - 20},${360}) scale(${pop(f, a + 14 + (1560 - x) / 8)})`}><Bell size={40} color={C.amber} fill="#fbecd0" /></g>}
          </g>;
        })}
        <line x1={lx} y1={300} x2={lx} y2={580} stroke={C.blue} strokeWidth={7} />
        <circle cx={lx} cy={580} r={20} fill={C.blue} stroke="#fff" strokeWidth={5} />
      </g>
    );
  }
  if (k === 4) { // nurse responds within 30 minutes
    const walk = p(f, at(0.35), at(0.8));
    const nx = lerp(420, 1040, walk), bob = walk > 0 && walk < 1 ? Math.abs(Math.sin(f / 4)) * 10 : 0;
    const bell = p(f, a + 10, a + 34);
    return (
      <g>
        <rect x={0} y={760} width={1920} height={10} fill="#e2d8c4" />
        <g transform="translate(1340,760) scale(1.05)"><Bed skin={C.skin[2]} blanket="#5a78c8" breathe={2 * Math.sin(f / 22)} /></g>
        <g transform={`translate(1540,470)`}><Monitor frame={f} hr={104} /></g>
        <g transform={`translate(${nx},${770 - bob}) scale(0.8)`}><Nurse armUp={0.2} blink={f % 70 < 4} /></g>
        {bell < 1 && <g transform={`translate(${lerp(960, nx + 60, bell) - 30},${lerp(180, 330, bell) - 30})`} opacity={p(f, a + 4, a + 10)}><circle cx={30} cy={30} r={38} fill={C.amber} /><Bell x={8} y={8} size={44} color="#fff" /></g>}
        <g transform="translate(560,250)" opacity={p(f, at(0.4), at(0.48))}>
          <circle r={80} fill="#fbf9f4" stroke="#e6dfd0" strokeWidth={16} />
          <circle r={80} fill="none" stroke={C.green} strokeWidth={16} strokeDasharray={`${2 * Math.PI * 80 * walk} 999`} transform="rotate(-90)" strokeLinecap="round" />
          <Timer x={-28} y={-44} size={56} color={C.ink} />
          {T(`${Math.round(30 * walk)} min`, 0, 44, 32, C.ink, 1, 'middle', 800)}
        </g>
      </g>
    );
  }
  // k === 5: measure
  const g1 = p(f, at(0.4), at(0.65)), g2 = p(f, at(0.62), at(0.85));
  const line = Array.from({ length: 9 }, (_, i) => `${i ? 'L' : 'M'}${360 + i * 60},${620 - i * i * 4.5}`).slice(0, Math.max(2, Math.round(9 * g1))).join(' ');
  return (
    <g>
      <rect x={300} y={220} width={600} height={460} rx={20} fill="#fbf9f4" stroke="#e2dacb" strokeWidth={3} />
      <path d={line} fill="none" stroke={C.green} strokeWidth={9} strokeLinecap="round" />
      {T('patient outcomes', 600, 740, 36, C.ink)}
      {T('?', 600, 470, 120, '#d9d1c1', 1 - g1, 'middle', 800)}
      <rect x={1020} y={220} width={600} height={460} rx={20} fill="#fbf9f4" stroke="#e2dacb" strokeWidth={3} />
      {[0, 1, 2, 3, 4].map(i => <rect key={i} x={1090 + i * 100} y={620 - 150 * g2 - (i === 4 ? 30 * g2 : 0)} width={60} height={150 * g2 + (i === 4 ? 30 * g2 : 0)} rx={8} fill={C.amber} />)}
      {T('unnecessary tests', 1320, 740, 36, C.ink)}
      {T('?', 1320, 470, 120, '#d9d1c1', 1 - g2, 'middle', 800)}
    </g>
  );
};

const Six: React.FC<{ f: number }> = ({ f }) => {
  const six = B('six');
  let cur = -1; STEPS.forEach((s, k) => { if (f >= B(s.id).start - 8) cur = k; });
  const tok = cur < 0 ? lerp(TX(0) - 200, TX(0), p(f, six.start + 20, six.start + 50)) : (() => { const b = B(STEPS[cur].id); return lerp(cur ? TX(cur - 1) : TX(0), TX(cur), p(f, b.start - 8, b.start + 10)); })();
  return (
    <g>
      <line x1={TX(0)} y1={TY} x2={TX(5)} y2={TY} stroke="#d9d1c1" strokeWidth={10} strokeLinecap="round" opacity={p(f, six.start, six.start + 20)} />
      <line x1={TX(0)} y1={TY} x2={tok} y2={TY} stroke={C.blue} strokeWidth={10} strokeLinecap="round" />
      {STEPS.map((s, k) => {
        const a = six.start + 10 + k * 6, done = k <= cur;
        return (
          <g key={s.id} transform={`translate(${TX(k)},${TY}) scale(${pop(f, a) * (k === cur ? 1.15 : 1)})`}>
            <circle r={46} fill={done ? C.blue : '#fbf9f4'} stroke={C.blue} strokeWidth={5} />
            <s.icon x={-24} y={-24} size={48} color={done ? '#fff' : C.blue} />
            {T(`${k + 1}`, -52, -44, 28, C.blue, 1, 'middle', 800)}
            {T(s.label, 0, 92, 28, k === cur ? C.ink : C.muted, 1, 'middle', k === cur ? 800 : 600)}
          </g>
        );
      })}
      {STEPS.map((s, k) => {
        const b = B(s.id), nxt = k < 5 ? B(STEPS[k + 1].id).start : B('end').start;
        const o = vis(f, b.start + 4, nxt + 2, 14);
        return o > 0 ? <g key={s.id} opacity={o} transform={`translate(0,${(1 - p(f, b.start - 10, b.start + 4)) * 30 - 60})`}><Vignette f={f} k={k} /></g> : null;
      })}
      <foreignObject x={0} y={330} width={1920} height={200}>
        <div style={{ textAlign: 'center', font: `500 72px ${SERIF}`, color: C.ink, opacity: vis(f, six.start + 12, B('s1').start - 6) }}>
          Prediction is <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>only the beginning</span>.
        </div>
      </foreignObject>
    </g>
  );
};

// ------------------------------------------------ F: the end
const End: React.FC<{ f: number }> = ({ f }) => {
  const e = B('end');
  const words = [['prediction', C.muted], ['decision', C.blue], ['better care', C.green]] as const;
  return (
    <g>
      {words.map(([w, c], i) => {
        const a = e.start + e.dur * (0.5 + i * 0.12);
        return <g key={w} opacity={p(f, a, a + 10)} transform={`translate(${520 + i * 440},480) scale(${pop(f, a)})`}>
          <rect x={-180} y={-70} width={360} height={140} rx={70} fill={i === 1 ? C.blue : '#fbf9f4'} stroke={c} strokeWidth={5} />
          {T(w, 0, 18, 50, i === 1 ? '#fff' : c, 1, 'middle', 800)}
          {i < 2 && <path d="M200,0 h60 m-18,-18 l18,18 l-18,18" stroke={C.muted} strokeWidth={6} fill="none" />}
        </g>;
      })}
      <foreignObject x={160} y={180} width={1600} height={200}>
        <div style={{ textAlign: 'center', font: `500 60px ${SERIF}`, color: C.ink, opacity: p(f, e.start + 4, e.start + 18) }}>
          A prediction with no response plan is <span style={{ background: 'linear-gradient(transparent 58%, #f6d765 58%)' }}>just noise</span>.
        </div>
      </foreignObject>
    </g>
  );
};

export const Action: React.FC = () => {
  const f = useCurrentFrame();
  const scenes: [React.FC<{ f: number }>, number, number][] = [
    [Lab, 0, B('live').start], [Live, B('live').start, B('who').start], [Who, B('who').start, B('result').start],
    [Result, B('result').start, B('six').start], [Six, B('six').start, B('end').start], [End, B('end').start, TL.total + 20],
  ];
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <svg width={1920} height={1080}>
        {scenes.map(([S, a, b], i) => {
          const o = (i === 0 ? 1 : p(f, a - 8, a + 8)) * (i === scenes.length - 1 ? 1 - p(f, TL.total - 20, TL.total - 4) : 1 - p(f, b - 8, b + 8));
          return o > 0 ? <g key={i} opacity={o}><S f={f} /></g> : null;
        })}
      </svg>
      <Narration tl={TL} />
      {Array.from({ length: 14 }, (_, k) => <Sfx key={k} at={B('live').start + 30 + k * 7} name="ping" volume={0.12} />)}
      {Array.from({ length: 11 }, (_, k) => <Sfx key={`b${k}`} at={B('bounce').start - 10 + k * 16} name="pop" volume={0.18} />)}
      {STEPS.map(s => <Sfx key={s.id} at={B(s.id).start - 6} name="whoosh" volume={0.25} />)}
      <Sfx at={B('s2').start + B('s2').dur * 0.62} name="beep" volume={0.3} />
    </AbsoluteFill>
  );
};
