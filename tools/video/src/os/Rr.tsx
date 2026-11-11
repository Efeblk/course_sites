// COE303 ch5 part 2: preemption, SRTF (slide 19), Round Robin q = 4 (slide 20, with its 5.3 slip), the quantum, priority (slide 23), starvation and aging.
import React from 'react';
import {
  C, Chip, Episode, Exam, Gantt, HL, Head, LAY, Layout, MONO, Mark, PC, Proc, SANS, SERIF, SP, SimCast, SimStage, Sfx, Slice, Tag, Zoom,
  lerp, p, plan, pop, tl, track, win,
} from './kit';
import timeline from '../timelines/os-rr.json';

const { B, at } = tl(timeline);
const GX = 260, GW = 1400, GY = 760;

// ------------------------------------------------ data (coe303/sched.js)
const PS: SP[] = [{ id: 'P1', arr: 0, burst: 8 }, { id: 'P2', arr: 1, burst: 4 }, { id: 'P3', arr: 2, burst: 9 }, { id: 'P4', arr: 3, burst: 5 }];
const SR: Slice[] = [{ id: 'P1', s: 0, e: 1 }, { id: 'P2', s: 1, e: 5 }, { id: 'P4', s: 5, e: 10 }, { id: 'P1', s: 10, e: 17 }, { id: 'P3', s: 17, e: 26 }];
const PR3: SP[] = [{ id: 'P1', arr: 0, burst: 24 }, { id: 'P2', arr: 0, burst: 3 }, { id: 'P3', arr: 0, burst: 3 }];
const RR: Slice[] = [{ id: 'P1', s: 0, e: 4 }, { id: 'P2', s: 4, e: 7 }, { id: 'P3', s: 7, e: 10 }, { id: 'P1', s: 10, e: 14 }, { id: 'P1', s: 14, e: 18 }, { id: 'P1', s: 18, e: 22 }, { id: 'P1', s: 22, e: 26 }, { id: 'P1', s: 26, e: 30 }];
const PP: SP[] = [{ id: 'P1', arr: 0, burst: 10, pri: 3 }, { id: 'P2', arr: 0, burst: 1, pri: 1 }, { id: 'P3', arr: 0, burst: 2, pri: 4 }, { id: 'P4', arr: 0, burst: 1, pri: 5 }, { id: 'P5', arr: 0, burst: 5, pri: 2 }];
const PRI: Slice[] = [{ id: 'P2', s: 0, e: 1 }, { id: 'P5', s: 1, e: 6 }, { id: 'P1', s: 6, e: 16 }, { id: 'P3', s: 16, e: 18 }, { id: 'P4', s: 18, e: 19 }];
const LAY5: Layout = { ...LAY, q0: [820, 560], qdx: -140, d0: [1330, 560], ddx: 110 };

const pSR = plan(PS, SR, at('srtf1', 0.12), at('srtf4', 0.05), 18, LAY, at('srtf', 0.55), [[1, at('srtf1', 0.6)], [1, at('srtf2', 0.72)], [5, at('srtf3', 0.32)]]);
const pRR = plan(PR3, RR, at('rr1', 0.12), at('rr2', 0.98), 18, LAY, at('rr', 0.12), [[4, at('rr1', 0.7)], [10, at('rr2', 0.45)]]);
const pPR = plan(PP, PRI, at('pri', 0.8), at('pri2', 0.85), 18, LAY5, at('pri', 0.2));

const Avg: React.FC<{ f: number; a: number; terms: string; v: string; strike?: number }> = ({ f, a, terms, v, strike }) => {
  const k = p(f, a, a + 12);
  if (k <= 0) return null;
  return <g opacity={k} transform={`translate(1370,150) scale(${lerp(0.9, 1, pop(f, a, 14))})`}>
    <rect x={0} y={0} width={470} height={170} rx={22} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
    <text x={30} y={50} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>average wait</text>
    <text x={30} y={92} fontFamily={MONO} fontWeight={600} fontSize={28} fill={C.ink}>{terms}</text>
    <text x={440} y={146} textAnchor="end" fontFamily={SERIF} fontWeight={700} fontSize={62} fill={C.red}>{v}</text>
    {strike !== undefined && <g opacity={p(f, strike, strike + 10)}>
      <text x={30} y={146} fontFamily={SERIF} fontWeight={700} fontSize={40} fill={C.muted}>slide: 5.3</text>
      <line x1={26} x2={26 + 196 * p(f, strike + 8, strike + 18)} y1={132} y2={132} stroke={C.red} strokeWidth={5} />
    </g>}
  </g>;
};

// ------------------------------------------------ scene 1: the OS takes the CPU back
const Hook: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook'), kick = at('hook', 0.62);
  const p1 = track(f, [{ at: 0, x: 1060, y: 600 }, { at: kick, x: 620, y: 600, d: 22, h: 160 }]);
  const p2 = track(f, [{ at: 0, x: -140, y: 600 }, { at: h.start + 10, x: 760, y: 600, d: 24 }, { at: kick + 4, x: 1060, y: 600, d: 20 }]);
  return <g>
    <Head f={f} a={h.start}>take the CPU back mid-burst?</Head>
    <Chip f={f} x={1060} y={534} busy={1} />
    <Proc f={f} x={p1.x} y={p1.y} sq={p1.sq} c={PC.P1} label="P1" seed={0} mood={f > kick ? 'worried' : 'focus'} look={f > kick ? [1, -1] : [0, 1]} rot={f > kick && f < kick + 22 ? -12 * Math.sin(((f - kick) / 22) * Math.PI) : 0} />
    <Proc f={f} x={p2.x} y={p2.y} sq={p2.sq} c={PC.P2} label="P2" seed={1} mood={f > kick + 20 ? 'focus' : 'ok'} look={[1, 0]} />
    <g opacity={win(f, kick, 1e9)}><Tag x={620} y={390} text="preempted" bg={C.red} fg="#fff" s={30} /></g>
    <g opacity={p(f, at('hook', 0.8), at('hook', 0.9))}><Tag x={960} y={880} text="preemptive scheduling" bg={C.ink} fg="#fff" s={36} /></g>
  </g>;
};

// ------------------------------------------------ scene 2: SRTF with arrivals
const Srtf: React.FC<{ f: number }> = ({ f }) => {
  const a = B('srtf').start, T = pSR.simT(f);
  const cmp = at('srtf2', 0.15);
  return <g>
    <Head f={f} a={a}>shortest remaining time first (SRTF)</Head>
    {/* arrivals card */}
    <g opacity={p(f, at('srtf', 0.3), at('srtf', 0.4))} transform="translate(80,150)">
      <rect width={360} height={250} rx={20} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
      <text x={30} y={46} fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.muted}>    arrives  burst</text>
      {PS.map((pr, i) => <text key={pr.id} x={30} y={92 + i * 44} fontFamily={MONO} fontWeight={700} fontSize={28} fill={PC[pr.id]} xmlSpace="preserve">{`${pr.id}     ${pr.arr}       ${pr.burst}`}</text>)}
    </g>
    <Zoom z={1.12}>
      <SimStage f={f} P={pSR} />
      <SimCast f={f} P={pSR} procs={PS} qlabel="left" />
      <Gantt x={GX} y={GY} w={GW} total={26} slices={SR} T={T} o={p(f, at('srtf1', 0.05), at('srtf1', 0.15))} />
    </Zoom>
    <g opacity={win(f, cmp, at('srtf3', 0.05))}>
      <rect x={760} y={180} width={400} height={110} rx={24} fill={C.ink} />
      <text x={960} y={256} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={60} fill="#fff">4 &lt; 7</text>
    </g>
    <Avg f={f} a={at('srtf4', 0.05)} terms="(9 + 0 + 15 + 2) / 4" v="6.5" />
  </g>;
};

// ------------------------------------------------ scene 3: Round Robin, q = 4
const Rr: React.FC<{ f: number }> = ({ f }) => {
  const a = B('rr').start, T = pRR.simT(f);
  const cur = RR.find(s => T >= s.s && T < s.e);
  const qf = cur && T < 30 ? (T - cur.s) / 4 : 0;
  const cx = LAY.cpu[0] + 200, cy = LAY.cpu[1] - 240;
  const arc = (t: number) => { const ang = -Math.PI / 2 + t * 2 * Math.PI; return `M${cx},${cy - 40} A40,40 0 ${t > 0.5 ? 1 : 0} 1 ${cx + 40 * Math.cos(ang)},${cy + 40 * Math.sin(ang)}`; };
  return <g>
    <Head f={f} a={a}>Round Robin: one quantum, then the back of the queue</Head>
    <Zoom z={1.12}>
      <SimStage f={f} P={pRR} />
      <SimCast f={f} P={pRR} procs={PR3} />
      <Gantt x={GX} y={GY} w={GW} total={30} slices={RR} T={T} o={p(f, at('rr', 0.6), at('rr', 0.7))} />
      {/* the quantum timer */}
      <g opacity={p(f, at('rr', 0.45), at('rr', 0.55))}>
        <circle cx={cx} cy={cy} r={52} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
        <circle cx={cx} cy={cy} r={40} fill="none" stroke="#ece4d3" strokeWidth={14} />
        {qf > 0.001 && <path d={arc(Math.min(qf, 0.999))} fill="none" stroke={qf > 0.85 ? C.red : C.amber} strokeWidth={14} />}
        <text x={cx} y={cy + 92} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>q = 4</text>
      </g>
    </Zoom>
    <Avg f={f} a={at('rr3', 0.55)} terms="(6 + 4 + 7) / 3" v="5.67" strike={at('rr4', 0.1)} />
  </g>;
};

// ------------------------------------------------ scene 4: the size of the quantum
const tiny: Slice[] = (() => {
  const out: Slice[] = []; const left: Record<string, number> = { P1: 24, P2: 3, P3: 3 }; let t = 0;
  while (Object.values(left).some(v => v > 0)) for (const id of ['P1', 'P2', 'P3']) if (left[id] > 0) { out.push({ id, s: t, e: t + 1 }); t += 1; out.push({ id: 'sw', s: t, e: t + 0.7 }); t += 0.7; left[id]--; }
  return out;
})();
const Quantum: React.FC<{ f: number }> = ({ f }) => {
  const a = B('q').start, b = B('q2').start;
  const t1 = p(f, at('q', 0.35), at('q', 0.85)) * 30, tEnd = tiny[tiny.length - 1].e, t2 = p(f, at('q2', 0.1), at('q2', 0.75)) * tEnd;
  return <g>
    <Head f={f} a={a}>the quantum decides everything</Head>
    <g opacity={p(f, a + 6, a + 16)}>
      <text x={260} y={300} fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.ink}>huge quantum</text>
      <Gantt x={260} y={330} w={1400} total={30} slices={[{ id: 'P1', s: 0, e: 24 }, { id: 'P2', s: 24, e: 27 }, { id: 'P3', s: 27, e: 30 }]} T={t1} ticks={false} />
      <g opacity={p(f, at('q', 0.85), at('q', 0.95))}><Tag x={1500} y={290} text="= FCFS" bg={C.ink} fg="#fff" s={34} /></g>
    </g>
    <g opacity={p(f, b, b + 12)}>
      <text x={260} y={600} fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.ink}>tiny quantum</text>
      <Gantt x={260} y={630} w={1400} total={tEnd} slices={tiny} T={t2} ticks={false} colors={{ ...PC, sw: '#9c9483' }} />
      <g opacity={p(f, at('q2', 0.4), at('q2', 0.5))}>
        <Tag x={960} y={790} text="grey = context switch, no useful work" bg="#9c9483" fg="#fff" s={32} />
      </g>
      <g opacity={p(f, at('q2', 0.72), at('q2', 0.82))}>
        <text x={960} y={920} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={46} fill={C.blue}>quantum ≫ context-switch time</text>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 5: priority
const Pri: React.FC<{ f: number }> = ({ f }) => {
  const a = B('pri').start, T = pPR.simT(f);
  return <g>
    <Head f={f} a={a}>priority: the smallest number runs first</Head>
    <Zoom z={1.06}>
      <SimStage f={f} P={pPR} lay={LAY5} />
      <SimCast f={f} P={pPR} procs={PP} pri lay={LAY5} />
      <Gantt x={GX} y={GY} w={GW} total={19} slices={PRI} T={T} o={p(f, at('pri', 0.6), at('pri', 0.7))} />
    </Zoom>
    <Avg f={f} a={at('pri2', 0.86)} terms="(6+0+16+18+1) / 5" v="8.2" />
  </g>;
};

// ------------------------------------------------ scene 6: starvation, then aging
const Aging: React.FC<{ f: number }> = ({ f }) => {
  const s = B('starve'), g = B('aging');
  const n = 5, pr = Math.max(1, 5 - Math.floor(p(f, at('aging', 0.25), at('aging', 0.75)) * 4.999));
  const goes = at('aging', 0.8);
  const me = track(f, [{ at: 0, x: 560, y: 640 }, { at: goes, x: 1360, y: 640, d: 22, h: 140 }]);
  const waitN = Math.floor(p(f, s.start, goes) * 60);
  return <g>
    <Head f={f} a={s.start} b={g.start} c={C.red}>starvation</Head>
    <Head f={f} a={g.start} c={C.green}>aging: waiting raises the priority</Head>
    <Chip f={f} x={1360} y={574} busy={1} />
    {Array.from({ length: n }, (_, i) => {
      const a0 = s.start + 6 + i * 22;
      if (a0 > g.start) return null;
      const q = track(f, [{ at: 0, x: -120, y: 640 }, { at: a0, x: 800, y: 640, d: 10 }, { at: a0 + 12, x: 1360, y: 640, d: 12 }, { at: a0 + 26, x: 2100, y: 640, d: 14 }]);
      return f >= a0 - 1 ? <g key={i}>
        <Proc f={f} x={q.x} y={q.y} sq={q.sq} c={[C.teal, C.blue, PC.P4, C.green, C.teal][i]} s={0.7} seed={i} mood="happy" />
        <g transform={`translate(${q.x + 34},${q.y - 110})`}><circle r={18} fill={C.red} /><text y={8} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={22} fill="#fff">{1 + (i % 2)}</text></g>
      </g> : null;
    })}
    <Proc f={f} x={me.x} y={me.y} sq={me.sq} c={PC.P4} label="low" seed={4} mood={f > goes ? 'happy' : f > s.start + 60 ? 'sad' : 'worried'} look={[1, 0]} />
    <g transform={`translate(${me.x + 52},${me.y - 152}) scale(${f > at('aging', 0.25) ? 1 + 0.25 * Math.max(0, Math.sin(((f - at('aging', 0.25)) / 30) * Math.PI * 2)) : 1})`}>
      <circle r={26} fill={pr <= 1 ? C.green : C.red} /><text y={10} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill="#fff">{pr}</text>
    </g>
    {f < goes && <Tag x={me.x} y={me.y - 230} text={`wait ${waitN}`} bg={HL} s={28} mono />}
    <Mark f={f} a={goes + 24} x={1360} y={330} ok />
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['SRTF', 'preempts when a shorter job arrives'],
  ['Round Robin', 'one quantum, then back of the queue'],
  ['huge q', 'becomes FCFS'],
  ['priority', 'smallest number first'],
  ['starvation', 'cured by aging'],
]} />;

export const OsRr: React.FC = () =>
  <Episode t={timeline} ch="Chapter 5" title="Taking turns" scenes={[
    [Hook, 0], [Srtf, B('srtf').start], [Rr, B('rr').start], [Quantum, B('q').start], [Pri, B('pri').start], [Aging, B('starve').start], [Ex, B('ex0').start],
  ]}>
    {[pSR, pRR, pPR].flatMap((P, j) => P.rs.map((r, i) => <Sfx key={`${j}-${i}`} at={r} name="pop" volume={0.16} />))}
    {[4, 14, 18, 22, 26].map(t => <Sfx key={`q${t}`} at={pRR.frameOf(t)} name="tick" volume={0.3} />)}
    <Sfx at={at('hook', 0.62)} name="whoosh" volume={0.25} />
    <Sfx at={at('srtf4', 0.05)} name="ping" volume={0.2} />
    <Sfx at={at('rr3', 0.55)} name="ping" volume={0.2} />
    <Sfx at={at('pri2', 0.86)} name="ping" volume={0.2} />
    <Sfx at={at('aging', 0.8) + 24} name="ping" volume={0.2} />
  </Episode>;
