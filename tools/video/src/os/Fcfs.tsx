// COE303 ch5 part 1: bursts, turnaround and waiting, FCFS (slides 16-17), SJF (slide 18), the catch, nonpreemptive.
import React from 'react';
import {
  C, Chip, Zoom, Draw, Episode, Exam, Gantt, HL, Head, Mark, MONO, PC, Proc, SANS, SERIF, SP, SimCast, SimStage, Sfx, Slice, Tag,
  lerp, p, plan, pop, shake, tl, track, win,
} from './kit';
import timeline from '../timelines/os-fcfs.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ data (coe303/sched.js, slides 16, 17, 18)
const P3: SP[] = [{ id: 'P1', arr: 0, burst: 24 }, { id: 'P2', arr: 0, burst: 3 }, { id: 'P3', arr: 0, burst: 3 }];
const FC: Slice[] = [{ id: 'P1', s: 0, e: 24 }, { id: 'P2', s: 24, e: 27 }, { id: 'P3', s: 27, e: 30 }];
const P3b: SP[] = [P3[1], P3[2], P3[0]];
const FC2: Slice[] = [{ id: 'P2', s: 0, e: 3 }, { id: 'P3', s: 3, e: 6 }, { id: 'P1', s: 6, e: 30 }];
const P4: SP[] = [{ id: 'P1', arr: 0, burst: 6 }, { id: 'P2', arr: 0, burst: 8 }, { id: 'P3', arr: 0, burst: 7 }, { id: 'P4', arr: 0, burst: 3 }];
const SJ: Slice[] = [{ id: 'P4', s: 0, e: 3 }, { id: 'P1', s: 3, e: 9 }, { id: 'P3', s: 9, e: 16 }, { id: 'P2', s: 16, e: 24 }];

const pFC = plan(P3, FC, at('fcfs', 0.55), at('fcfs3', 0.3), 18, undefined, at('fcfs', 0.05));
const pFC2 = plan(P3b, FC2, at('swap', 0.65), at('swap2', 0.3), 18, undefined, at('swap', 0.1));
const pSJ = plan(P4, SJ, at('sjf2', 0.02), at('sjf3', 0.25), 18, undefined, at('sjfQ', 0.1));

const GX = 260, GW = 1400, GY = 760;

/** "average wait" card, top right */
const Avg: React.FC<{ f: number; a: number; terms: string; v: string; o?: number; was?: string; wasAt?: number }> = ({ f, a, terms, v, o = 1, was, wasAt = 0 }) => {
  const k = p(f, a, a + 12);
  if (k <= 0 || o <= 0) return null;
  return <g opacity={k * o} transform={`translate(1370,150) scale(${lerp(0.9, 1, pop(f, a, 14))})`}>
    <rect x={0} y={0} width={470} height={170} rx={22} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} />
    <text x={30} y={50} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>average wait</text>
    <text x={30} y={92} fontFamily={MONO} fontWeight={600} fontSize={28} fill={C.ink}>{terms}</text>
    <text x={440} y={146} textAnchor="end" fontFamily={SERIF} fontWeight={700} fontSize={62} fill={C.red}>{v}</text>
    {was && <g opacity={p(f, wasAt, wasAt + 10)}>
      <text x={30} y={146} fontFamily={SERIF} fontWeight={700} fontSize={44} fill={C.muted}>was 17</text>
      <line x1={26} x2={26 + 170 * p(f, wasAt + 6, wasAt + 16)} y1={132} y2={132} stroke={C.red} strokeWidth={5} />
    </g>}
  </g>;
};

// ------------------------------------------------ scene 1: one CPU, three processes, their bursts
const Intro: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook'), bu = at('burst', 0.05);
  const rowY = [380, 560, 740], bursts = [24, 3, 3], U = 46;
  return <g>
    <Head f={f} a={h.start} b={bu}>Three processes, one CPU</Head>
    <Head f={f} a={bu + 14}>each needs one CPU burst</Head>
    <g opacity={1 - p(f, bu, bu + 14)} transform={`translate(0,${-p(f, bu, bu + 14) * 60})`}>
      <Chip f={f} x={1360} y={520} s={1} busy={0} />
      <text x={1360} y={300} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={120} fill={C.red}
        opacity={p(f, at('hook', 0.6), at('hook', 0.6) + 8)} transform={`rotate(${Math.sin(f / 7) * 6} 1360 260)`}>?</text>
    </g>
    {P3.map((pr, i) => {
      const a0 = h.start + 6 + i * 7;
      const k = track(f, [
        { at: 0, x: -150, y: 600 },
        { at: a0, x: 520 + i * 170, y: 600, d: 20 },
        { at: bu + i * 5, x: 330, y: rowY[i] + 60, d: 20 },
      ]);
      const look: [number, number] = f < bu ? [1, -0.3] : [1, 0];
      const g = p(f, at('burst', 0.45) + i * 6, at('burst', 0.45) + i * 6 + (i === 0 ? 40 : 12));
      return <g key={pr.id}>
        <Proc f={f} x={k.x} y={k.y} c={PC[pr.id]} label={pr.id} seed={i} sq={k.sq} look={look} />
        <g opacity={p(f, bu + 10, bu + 22)}>
          <rect x={430} y={rowY[i] - 10} width={bursts[i] * U * g} height={56} rx={10} fill={PC[pr.id]} opacity={0.9} />
          <text x={440 + bursts[i] * U * g + 14} y={rowY[i] + 30} fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.ink} opacity={p(f, at('burst', 0.5) + i * 6, at('burst', 0.5) + i * 6 + 8)}>{bursts[i]} ms</text>
        </g>
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ scene 2: turnaround and waiting on one time line
const Formula: React.FC<{ f: number }> = ({ f }) => {
  const a = B('tat').start, U = 52, X0 = 180, Y = 560;
  const x = (t: number) => X0 + t * U;
  const arrive = at('tat', 0.35), finish = at('tat', 0.6);
  const k = track(f, [{ at: 0, x: -150, y: Y - 20 }, { at: a + 4, x: x(2), y: Y - 20, d: 22 }]);
  const runA = at('wt', 0.15);
  // waiting 2..17, running 17..26
  const wFill = p(f, at('wt', 0.3), at('wt', 0.55));
  return <g>
    <Head f={f} a={a}>two numbers judge a schedule</Head>
    {/* time axis */}
    <Draw f={f} a={a} b={a + 20} d={`M${x(0)},${Y + 60} H${x(30)}`} c={C.ink} sw={4} />
    {Array.from({ length: 31 }, (_, t) => <g key={t} opacity={p(f, a + t, a + t + 6)}>
      <line x1={x(t)} x2={x(t)} y1={Y + 52} y2={Y + 68} stroke={C.ink} strokeWidth={t % 2 ? 2 : 3} />
      {[0, 2, 17, 26, 30].includes(t) && <text x={x(t)} y={Y + 104} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={C.ink}>{t}</text>}
    </g>)}
    <Proc f={f} x={k.x} y={k.y} sq={k.sq} c={C.teal} label="P" seed={2} mood={f > at('wt', 0.6) ? 'worried' : 'ok'} s={0.7} look={[1, 0]} />
    {/* arrival and finish flags */}
    <g opacity={p(f, arrive, arrive + 8)}><Tag x={x(2)} y={Y + 160} text="arrives" bg={C.teal} fg="#fff" s={26} /></g>
    <g opacity={p(f, finish, finish + 8)}><Tag x={x(26)} y={Y + 160} text="finishes" bg={C.ink} fg="#fff" s={26} /></g>
    {/* turnaround bracket */}
    <g opacity={p(f, at('tat', 0.6), at('tat', 0.7))}>
      <Draw f={f} a={at('tat', 0.62)} b={at('tat', 0.85)} d={`M${x(2)},${Y - 150} v-24 H${x(26)} v24`} c={C.blue} sw={5} />
      <text x={(x(2) + x(26)) / 2} y={Y - 196} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue}>turnaround = finish − arrival</text>
    </g>
    {/* running burst and waiting */}
    <rect x={x(17)} y={Y + 6} width={9 * U * p(f, runA, runA + 20)} height={44} rx={8} fill={C.teal} />
    <rect x={x(2)} y={Y + 6} width={15 * U * wFill} height={44} rx={8} fill={HL} />
    <g opacity={p(f, at('wt', 0.55), at('wt', 0.65))}>
      <text x={(x(2) + x(17)) / 2} y={Y + 38} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.ink}>waiting</text>
    </g>
    <g opacity={p(f, runA + 10, runA + 20)}><text x={(x(17) + x(26)) / 2} y={Y + 38} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill="#fff">burst</text></g>
    <g opacity={p(f, at('wt', 0.1), at('wt', 0.2))}>
      <text x={960} y={Y - 300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.amber}>waiting = turnaround − burst</text>
    </g>
    {/* the worked numbers */}
    <g opacity={p(f, at('wtEx', 0.35), at('wtEx', 0.45))}>
      <Tag x={700} y={Y + 250} text="turnaround: 26 − 2 = 24" bg={C.blue} fg="#fff" s={34} mono />
    </g>
    <g opacity={p(f, at('wtEx', 0.75), at('wtEx', 0.85))}>
      <Tag x={1290} y={Y + 250} text="waiting: 24 − 9 = 15" bg={HL} s={34} mono />
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: FCFS, P1 hogs the CPU
const Fcfs1: React.FC<{ f: number }> = ({ f }) => {
  const a = B('fcfs').start, T = pFC.simT(f);
  const cv = B('convoy');
  return <g>
    <Head f={f} a={a} b={cv.start}>first come, first served</Head>
    <Head f={f} a={cv.start} c={C.red}>the convoy effect</Head>
    <Zoom z={1.15}>
      <SimStage f={f} P={pFC} />
      <SimCast f={f} P={pFC} procs={P3} />
      <Gantt x={GX} y={GY} w={GW} total={30} slices={FC} T={T} o={p(f, a + 10, a + 24)} />
    </Zoom>
    <Avg f={f} a={at('fcfs3', 0.62)} terms="(0 + 24 + 27) / 3" v="17" o={1} />
    {/* convoy: a rope from P1's bar to the tiny ones */}
    <g opacity={win(f, cv.start + 6, B('swap').start)}>
      <Zoom z={1.15}><rect x={GX - 10} y={GY - 16} width={GW * (24 / 30) + 20} height={102} rx={14} fill="none" stroke={C.red} strokeWidth={5} strokeDasharray="14 10" />
      <text x={GX + GW * 0.4} y={GY - 36} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.red}>one long job in front ...</text>
      <text x={GX + GW * 0.92} y={GY - 36} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.red}>... short ones stuck</text>
    </Zoom></g>
  </g>;
};

// ------------------------------------------------ scene 4: same jobs, other order
const Fcfs2: React.FC<{ f: number }> = ({ f }) => {
  const a = B('swap').start, T = pFC2.simT(f);
  return <g>
    <Head f={f} a={a}>same jobs, arriving P2, P3, P1</Head>
    <Zoom z={1.15}>
      <SimStage f={f} P={pFC2} />
      <SimCast f={f} P={pFC2} procs={P3b} />
      <Gantt x={GX} y={GY} w={GW} total={30} slices={FC2} T={T} o={p(f, a + 10, a + 24)} />
    </Zoom>
    <Avg f={f} a={at('swap2', 0.42)} terms="(6 + 0 + 3) / 3" v="3" was="was 17" wasAt={at('swap2', 0.55)} />
  </g>;
};

// ------------------------------------------------ scene 5: SJF, then its catch
const Sjf: React.FC<{ f: number }> = ({ f }) => {
  const a = B('sjfQ').start, T = pSJ.simT(f), c = B('catch');
  const preNeeds = 1 - p(f, at('sjf2', 0.0) - 6, at('sjf2', 0.0) + 4);
  const unk = p(f, c.start + 10, c.start + 22);
  return <g>
    <Head f={f} a={a} b={B('sjf').start}>run the shortest job first?</Head>
    <Head f={f} a={B('sjf').start} b={c.start}>shortest job first (SJF)</Head>
    <Head f={f} a={c.start} b={B('starve').start} c={C.red}>the catch: the next burst is unknown</Head>
    <Head f={f} a={B('starve').start} c={C.red}>long jobs can starve</Head>
    <g opacity={1 - p(f, c.start, c.start + 14)}><Zoom z={1.15}>
      <SimStage f={f} P={pSJ} />
      <SimCast f={f} P={pSJ} procs={P4} showWait={f > at('sjf2', 0)} />
      {P4.map((pr, i) => {
        const q = pSJ.pos(f, pr.id);
        return <Tag key={pr.id} x={q.x} y={q.y - 172} text={`needs ${pr.burst}`} bg="#fff" s={26} mono o={preNeeds * p(f, at('sjf', 0.45) + i * 8, at('sjf', 0.45) + i * 8 + 8)} />;
      })}
      <Gantt x={GX} y={GY} w={GW} total={24} slices={SJ} T={T} o={p(f, B('sjf').start + 10, B('sjf').start + 24)} />
      </Zoom>
      <Avg f={f} a={at('sjf3', 0.65)} terms="(3 + 16 + 9 + 0) / 4" v="7" />
    </g>
    {/* the catch: four new processes, bursts unknown */}
    <g opacity={unk * (1 - p(f, B('starve').start - 4, B('starve').start + 10))}>
      {[0, 1, 2, 3].map(i => {
        const x = 520 + i * 180;
        return <g key={i}>
          <Proc f={f} x={x} y={640} c={PC[`P${i + 1}`]} label={`P${i + 1}`} seed={i + 3} look={[1, -1]} mood="ok" />
          <g transform={`translate(${x},${440}) scale(${pop(f, c.start + 16 + i * 5, 14)})`}>
            <rect x={-56} y={-40} width={112} height={70} rx={16} fill="#fff" stroke={C.red} strokeWidth={4} strokeDasharray="10 8" />
            <text x={0} y={14} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={48} fill={C.red}>?</text>
          </g>
        </g>;
      })}
      <Chip f={f} x={1460} y={560} s={0.85} />
      <g opacity={p(f, at('catch', 0.62), at('catch', 0.72))}>
        <Tag x={1460} y={330} text="estimate only" bg={C.ink} fg="#fff" s={30} />
      </g>
    </g>
    {/* starvation: a long job keeps getting overtaken */}
    <Starve f={f} />
  </g>;
};
const Starve: React.FC<{ f: number }> = ({ f }) => {
  const s = B('starve'), o = p(f, s.start, s.start + 10) * (1 - p(f, B('non').start - 4, B('non').start + 8));
  if (o <= 0) return null;
  const n = 5;
  return <g opacity={o}>
    <Chip f={f} x={1460} y={560} s={0.85} busy={1} />
    <Proc f={f} x={560} y={660} c={PC.P2} label="long" w={140} seed={1} mood={f > s.start + 40 ? 'sad' : 'worried'} look={[1, 0]} />
    <Tag x={560} y={470} text={`wait ${Math.floor(p(f, s.start, s.start + s.dur + 20) * 40)}`} bg={HL} s={28} mono />
    {Array.from({ length: n }, (_, i) => {
      const a0 = s.start + 4 + i * 14;
      const q = track(f, [{ at: 0, x: 200, y: 660 }, { at: a0, x: 760, y: 660, d: 10 }, { at: a0 + 12, x: 1460, y: 640, d: 12 }, { at: a0 + 26, x: 2100, y: 640, d: 14 }]);
      return f >= a0 - 2 ? <Proc key={i} f={f} x={q.x} y={q.y} sq={q.sq} c={[C.teal, C.blue, PC.P4, C.green, C.teal][i]} label="s" s={0.6} seed={i} mood="happy" /> : null;
    })}
  </g>;
};

// ------------------------------------------------ scene 6: nonpreemptive
const NonPre: React.FC<{ f: number }> = ({ f }) => {
  const a = B('non').start;
  const push = at('non', 0.45);
  const k = track(f, [{ at: 0, x: 560, y: 660 }, { at: push, x: 860, y: 660, d: 12 }, { at: push + 20, x: 620, y: 660, d: 14 }]);
  return <g>
    <Head f={f} a={a}>nonpreemptive: it keeps the CPU</Head>
    <Chip f={f} x={1160} y={594} s={0.95} busy={1} />
    <Proc f={f} x={1160 + shake(f, push + 10, 16, 6)} y={660} c={PC.P1} label="P1" seed={0} mood="focus" look={[0, 1]} />
    <Proc f={f} x={k.x} y={k.y} sq={k.sq} c={PC.P2} label="P2" seed={1} mood={f > push + 14 ? 'sad' : 'ok'} look={[1, 0]} />
    <Mark f={f} a={push + 12} x={970} y={420} ok={false} />
    <g opacity={p(f, at('non', 0.7), at('non', 0.8))}>
      <Tag x={1160} y={300} text="until it finishes or blocks" bg={C.ink} fg="#fff" s={32} />
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['Gantt chart', 'draw it first'],
  ['turnaround', '= completion − arrival'],
  ['waiting', '= turnaround − burst'],
  ['FCFS', 'convoy effect'],
  ['SJF', 'minimum average wait; bursts unknown'],
]} />;

export const OsFcfs: React.FC = () =>
  <Episode t={timeline} ch="Chapter 5" title="Who gets the CPU?" scenes={[
    [Intro, 0], [Formula, B('tat').start], [Fcfs1, B('fcfs').start], [Fcfs2, B('swap').start], [Sjf, B('sjfQ').start], [NonPre, B('non').start], [Ex, B('ex0').start],
  ]}>
    {[pFC, pFC2, pSJ].flatMap((P, j) => P.rs.map((r, i) => <Sfx key={`${j}-${i}`} at={r} name="pop" volume={0.16} />))}
    <Sfx at={at('fcfs3', 0.62)} name="ping" volume={0.2} />
    <Sfx at={at('swap2', 0.42)} name="ping" volume={0.2} />
    <Sfx at={at('sjf3', 0.65)} name="ping" volume={0.2} />
    <Sfx at={at('non', 0.45) + 12} name="beep" volume={0.18} />
  </Episode>;
