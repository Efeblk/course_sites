// COE303 ch6 part 2: test_and_set, mutex (and spinlock), counting semaphore with a waiting queue (slide 29 version),
// ownership, ordering with synch = 0, deadlock with S and Q, starvation and priority inversion.
import React from 'react';
import {
  C, Cell, Chip, Code, Episode, Exam, Fly, HL, Head, MONO, Mark, PC, Proc, SANS, SERIF, Sfx, Tag,
  mixC, p, pop, shake, tl, track, win,
} from './kit';
import timeline from '../timelines/os-locks.json';

const { B, at } = tl(timeline);

/** a padlock; (x, y) = centre of the body */
const Lock: React.FC<{ x: number; y: number; closed: number; label?: string; c?: string; s?: number; o?: number }> = ({ x, y, closed, label, c = C.ink, s = 1, o = 1 }) => {
  if (o <= 0.001) return null;
  return <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <path d={`M-30,-20 V-48 a30,30 0 0 1 60,0 V${-20 - (1 - closed) * 26}`} fill="none" stroke={c} strokeWidth={12} strokeLinecap="round"
      transform={`translate(0,${-(1 - closed) * 18})`} />
    <rect x={-48} y={-24} width={96} height={80} rx={14} fill={c} />
    {label && <text x={0} y={30} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill="#fff">{label}</text>}
  </g>;
};
/** a small room for the critical section */
const Room: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; label?: string }> = ({ x, y, w = 300, h = 300, o = 1, label = 'critical section' }) =>
  <g opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx={18} fill="#efe6d4" stroke={C.ink} strokeWidth={5} />
    <text x={x + w / 2} y={y + 44} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={26} fill={C.muted}>{label}</text>
  </g>;
const spinRing = (f: number, x: number, y: number, o = 1) =>
  <g opacity={o} transform={`translate(${x},${y}) rotate(${(f * 14) % 360})`}>
    <path d="M-80,0 a80,80 0 0 1 80,-80" fill="none" stroke={C.red} strokeWidth={6} strokeLinecap="round" />
    <path d="M80,0 a80,80 0 0 1 -80,80" fill="none" stroke={C.red} strokeWidth={6} strokeLinecap="round" />
  </g>;

// ------------------------------------------------ scene 1: three steps become one; test_and_set
const Tas: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook'), t = B('tas').start, t2 = B('tas2').start, t3 = B('tas3').start;
  const merge = p(f, at('hook', 0.75), at('hook', 0.95));
  const hookOut = p(f, t - 4, t + 10);
  // P0 grabs the free lock during tas; P1 tries during tas2; P0 leaves in tas3; P1 gets it
  const g0 = at('tas', 0.45), g1 = at('tas2', 0.15), rel = at('tas3', 0.2), g2 = at('tas3', 0.55);
  const lockV = f < g0 + 10 ? 'false' : f < rel + 8 ? 'true' : f < g2 + 10 ? 'false' : 'true';
  const p0 = track(f, [{ at: 0, x: 1060, y: 860 }, { at: g0 + 20, x: 1620, y: 820, d: 20 }, { at: rel, x: 2100, y: 860, d: 24 }]);
  const p1 = track(f, [{ at: 0, x: 2100, y: 860 }, { at: t2 - 10, x: 1240, y: 860, d: 20 }, { at: g2 + 20, x: 1620, y: 820, d: 20 }]);
  const spinning = f > g1 + 20 && f < g2;
  const hl = f < t ? -1 : f < g0 + 20 ? 0 : f < rel ? (f > t2 ? 0 : 2) : f < rel + 14 ? 3 : 2;
  return <g>
    <Head f={f} a={h.start} b={t}>what if the hardware did it all at once?</Head>
    <Head f={f} a={t}>test_and_set: read and set in one atomic step</Head>
    {/* the three steps that merge */}
    <g opacity={1 - hookOut}>
      {['load', 'add', 'store'].map((s, i) => {
        const x = 960 + (i - 1) * (300 - merge * 90);
        return <g key={s} transform={`translate(${x},520) scale(${pop(f, h.start + 6 + i * 6, 14)})`}>
          <rect x={-110} y={-60} width={220} height={120} rx={i === 0 ? 20 : 20} fill={mixC('#fbf9f4', C.blue, merge)} stroke={C.blue} strokeWidth={4} />
          <text y={14} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={mixC(C.ink, '#fff', merge)}>{s}</text>
        </g>;
      })}
      {[0, 1].map(i => <g key={i} opacity={(1 - merge) * p(f, at('hook', 0.3), at('hook', 0.4))}>
        <Proc f={f} x={960 + (i - 0.5) * 300} y={420} c={C.amber} s={0.45} seed={i} mood="happy" look={[0, 1]} />
      </g>)}
      <g opacity={p(f, at('hook', 0.3), at('hook', 0.4)) * (1 - merge)}><Tag x={960} y={700} text="another process can cut in between" bg={HL} s={30} /></g>
      <g opacity={merge}><Tag x={960} y={700} text="one step: nothing can cut in" bg={C.blue} fg="#fff" s={30} /></g>
    </g>
    {/* test_and_set */}
    <g opacity={hookOut}>
      <Code x={70} y={220} w={760} s={30} hl={hl} title="each process"
        lines={['while (test_and_set(&lock))', '    ;  /* spin */', '/* critical section */', 'lock = false;']} />
      <Cell x={1240} y={330} name="lock" v={lockV} w={240} vc={lockV === 'true' ? C.red : C.green} />
      <Room x={1470} y={520} w={300} h={330} />
      <Fly f={f} s={g0} a={[1240, 340]} b={[1060, 760]} text="F" c={C.green} h={60} />
      <Fly f={f} s={g1} a={[1240, 340]} b={[1240, 760]} text="T" c={C.red} h={60} />
      <Fly f={f} s={g2} a={[1240, 340]} b={[1240, 760]} text="F" c={C.green} h={60} />
      <g opacity={win(f, g0, g0 + 70)}><Tag x={720} y={700} text="returns false, sets true" bg={C.green} fg="#fff" s={28} /></g>
      <g opacity={win(f, g1, rel)}><Tag x={760} y={760} text="returns true: keep spinning" bg={C.red} fg="#fff" s={28} /></g>
      {spinRing(f, p1.x, p1.y - 75, spinning ? 1 : 0)}
      <Proc f={f} x={p0.x} y={p0.y} sq={p0.sq} c={C.blue} label="P0" seed={0} mood={f > g0 + 20 ? 'happy' : 'ok'} look={[1, -1]} />
      <Proc f={f} x={p1.x} y={p1.y} sq={p1.sq} c={C.amber} label="P1" seed={1} mood={spinning ? 'dizzy' : 'ok'} look={[1, -1]} />
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: mutex lock, five threads, then the spinlock
const Mutex: React.FC<{ f: number }> = ({ f }) => {
  const a = B('mutex').start, m2 = B('mutex2').start, sp = B('spin').start;
  const go = (i: number) => m2 + 8 + i * 26;
  const done = [0, 1, 2, 3, 4].filter(i => f > go(i) + 18).length;
  const inside = [0, 1, 2, 3, 4].find(i => f > go(i) && f < go(i) + 22);
  return <g>
    <Head f={f} a={a} b={sp}>mutex lock: acquire, critical section, release</Head>
    <Head f={f} a={sp} c={C.red}>spinlock: waiting by looping</Head>
    <Code x={70} y={220} w={820} s={30} o={p(f, a + 4, a + 16)} hl={f < m2 ? Math.floor(p(f, at('mutex', 0.3), at('mutex', 0.9)) * 2.99) : -1}
      typed={[0, 1, 2].map(i => p(f, a + 10 + i * 14, a + 30 + i * 14))}
      lines={['pthread_mutex_lock(&mutex);', 'count++;   /* critical section */', 'pthread_mutex_unlock(&mutex);']} />
    <g opacity={1 - p(f, sp - 4, sp + 10)}>
      <Room x={1100} y={260} w={360} h={320} />
      <Lock x={1100} y={460} closed={inside !== undefined ? 1 : 0.2} s={0.7} c={inside !== undefined ? C.red : C.green} o={p(f, a + 20, a + 30)} />
      <Cell x={1280} y={420} name="count" v={String(done)} w={150} vc={done === 5 ? C.green : C.ink} flash={inside !== undefined ? 0.4 : 0} />
      {[0, 1, 2, 3, 4].map(i => {
        const q = track(f, [{ at: 0, x: 220 + i * 150, y: 860 }, { at: go(i), x: 1280, y: 560, d: 14, h: 150 }, { at: go(i) + 18, x: 1560 + i * 78, y: 860, d: 14 }]);
        return <Proc key={i} f={f} x={q.x} y={q.y} sq={q.sq} c={[C.blue, C.amber, C.teal, PC.P4, C.green][i]} label={`T${i + 1}`} s={f > go(i) + 18 ? 0.6 : 0.72} seed={i}
          mood={f > go(i) + 18 ? 'happy' : 'ok'} look={[1, -0.5]} o={p(f, m2 - 20 + i * 3, m2 - 10 + i * 3)} />;
      })}
      <Mark f={f} a={go(4) + 24} x={1430} y={330} ok />
    </g>
    {/* spinlock */}
    <g opacity={p(f, sp, sp + 12)}>
      <Chip f={f} x={1300} y={640} busy={1} heat={p(f, sp + 10, sp + 90)} />
      {spinRing(f, 1300, 640, 1)}
      <Proc f={f} x={1300} y={720} c={C.amber} label="T2" seed={1} mood="dizzy" rot={Math.sin(f / 4) * 6} />
      <g opacity={p(f, at('spin', 0.5), at('spin', 0.6))}><Tag x={1300} y={900} text="busy waiting burns CPU" bg={C.red} fg="#fff" s={32} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: the counting semaphore
const Sem: React.FC<{ f: number }> = ({ f }) => {
  const a = B('sem').start, s1 = B('sem1').start, s3 = B('sem3').start, s4 = B('sem4').start;
  const take = [at('sem2', 0.2), at('sem2', 0.4), at('sem2', 0.6)], w4 = at('sem3', 0.2), sig = at('sem4', 0.1);
  const S = f < take[0] + 10 ? 3 : f < take[1] + 10 ? 2 : f < take[2] + 10 ? 1 : f < w4 + 10 ? 0 : f < sig + 10 ? -1 : 0;
  const slotX = (i: number) => 1060 + i * 220;
  const procs = [0, 1, 2, 3].map(i => {
    const keys = [{ at: 0, x: -140, y: 860 }, { at: s1 + i * 6, x: 220 + i * 150, y: 860, d: 18 }];
    if (i < 3) keys.push({ at: take[i], x: slotX(i), y: 640, d: 18 });
    if (i === 0) keys.push({ at: sig, x: 2100, y: 860, d: 22 });
    if (i === 3) { keys.push({ at: w4, x: 640, y: 640, d: 18 }); keys.push({ at: sig + 16, x: slotX(0), y: 640, d: 20 }); }
    return track(f, keys);
  });
  const sleeping = f > w4 + 18 && f < sig + 16;
  return <g>
    <Head f={f} a={a}>a semaphore counts</Head>
    <g opacity={p(f, a + 6, a + 18)}>
      <Cell x={640} y={330} name="S" v={String(S)} w={200} vc={S < 0 ? C.red : C.ink} flash={S < 0 ? 0.3 : 0} />
      <Tag x={330} y={240} text="wait(S): S--" bg={C.blue} fg="#fff" s={28} mono o={p(f, at('sem', 0.6), at('sem', 0.7))} />
      <Tag x={950} y={240} text="signal(S): S++" bg={C.teal} fg="#fff" s={28} mono o={p(f, at('sem', 0.75), at('sem', 0.85))} />
    </g>
    {/* three resources */}
    {[0, 1, 2].map(i => <g key={i} opacity={p(f, s1 + i * 5, s1 + i * 5 + 10)}>
      <rect x={slotX(i) - 90} y={460} width={180} height={200} rx={20} fill="#efe6d4" stroke="#b9ae96" strokeWidth={4} strokeDasharray="12 8" />
      <text x={slotX(i)} y={700} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>resource</text>
    </g>)}
    {/* the waiting queue */}
    <g opacity={p(f, s3, s3 + 12)}>
      <rect x={520} y={480} width={240} height={190} rx={20} fill="none" stroke={C.red} strokeWidth={4} strokeDasharray="12 8" />
      <text x={640} y={470} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={26} fill={C.red}>waiting queue</text>
    </g>
    {procs.map((q, i) => <Proc key={i} f={f} x={q.x} y={q.y} sq={q.sq} c={[C.blue, C.amber, C.teal, PC.P4][i]} label={`P${i + 1}`} s={0.8} seed={i}
      mood={i === 3 && sleeping ? 'sleep' : i === 3 && f > sig + 16 ? 'happy' : 'ok'} look={[1, -0.4]} />)}
    {sleeping && <text x={700} y={520 - ((f / 2) % 20)} fontFamily={SERIF} fontWeight={700} fontSize={36} fill={C.muted}>z</text>}
    <g opacity={win(f, at('sem3', 0.55), s4 + 6)}><Tag x={640} y={940} text="negative S = number of waiters" bg={HL} s={30} /></g>
    <g opacity={p(f, sig, sig + 10)}><Tag x={1280} y={940} text="signal wakes one waiter" bg={C.teal} fg="#fff" s={30} /></g>
  </g>;
};

// ------------------------------------------------ scene 4: binary semaphore vs mutex ownership; ordering with synch = 0
const Own: React.FC<{ f: number }> = ({ f }) => {
  const a = B('bin').start, own = at('bin', 0.55), tryU = at('bin', 0.75);
  const t2 = track(f, [{ at: 0, x: 1400, y: 760 }, { at: tryU, x: 1110, y: 760, d: 14 }, { at: tryU + 22, x: 1400, y: 760, d: 14 }]);
  return <g>
    <Head f={f} a={a}>a 0-or-1 semaphore works like a mutex ...</Head>
    <g opacity={p(f, own - 10, own)}><Head f={f} a={own} y={190} s={40} c={C.red}>... but a mutex has an owner</Head></g>
    <Lock x={960} y={500} closed={1} s={1.4} c={C.ink} />
    <g opacity={p(f, own, own + 10)}><Tag x={960} y={360} text="owner: T1" bg={C.blue} fg="#fff" s={30} /></g>
    <Proc f={f} x={680} y={760} c={C.blue} label="T1" seed={0} mood="ok" look={[1, -0.5]} />
    <Proc f={f} x={t2.x + shake(f, tryU + 14, 16, 10)} y={t2.y} sq={t2.sq} c={C.amber} label="T2" seed={1} mood={f > tryU + 14 ? 'sad' : 'ok'} look={[-1, -0.5]} />
    <g opacity={win(f, tryU - 6, B('ord').start)}><Tag x={1260} y={580} text="unlock?" bg="#fff" s={28} mono /></g>
    <Mark f={f} a={tryU + 14} x={1110} y={560} ok={false} />
  </g>;
};
const Order: React.FC<{ f: number }> = ({ f }) => {
  const a = B('ord').start, w = at('ord', 0.55), run1 = at('ord2', 0.05), sig = at('ord2', 0.35), run2 = at('ord2', 0.5);
  const synch = f < w ? '0' : f < sig + 8 ? '0' : f < sig + 26 ? '1' : '0';
  const s1 = p(f, run1, sig), s2 = p(f, run2, run2 + 50);
  const lane = (y: number, c: string, lab: string, parts: [string, number, number, string][]) => <g>
    <Proc f={f} x={220} y={y + 50} c={c} label={lab} s={0.75} seed={lab === 'P1' ? 0 : 1}
      mood={lab === 'P2' && f > w && f < sig + 20 ? 'sleep' : 'ok'} look={[1, 0]} />
    {parts.map(([t, x, wdt, col], i) => <g key={i}>
      <rect x={x} y={y - 40} width={wdt} height={80} rx={14} fill="none" stroke={col} strokeWidth={4} />
      <text x={x + wdt / 2} y={y + 12} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill={col}>{t}</text>
    </g>)}
  </g>;
  return <g>
    <Head f={f} a={a}>synch = 0 forces an order</Head>
    <Cell x={960} y={260} name="synch" v={synch} w={160} />
    <rect x={380} y={440} width={420 * s1} height={80} rx={14} fill={C.blue} opacity={0.25} />
    <rect x={860} y={720} width={420 * s2} height={80} rx={14} fill={C.amber} opacity={0.3} />
    {lane(480, C.blue, 'P1', [['S1', 380, 420, C.blue], ['signal(synch)', 860, 420, C.teal]])}
    {lane(760, C.amber, 'P2', [['wait(synch)', 380, 420, C.red], ['S2', 860, 420, C.amber]])}
    <g opacity={win(f, w, sig + 20)}><Tag x={590} y={870} text="P2 sleeps" bg={HL} s={30} /></g>
    <Fly f={f} s={sig} a={[1070, 480]} b={[960, 270]} text="+1" c={C.teal} h={60} />
    <Fly f={f} s={sig + 20} a={[960, 270]} b={[590, 760]} text="go" c={C.green} h={60} />
    <g opacity={p(f, at('ord2', 0.8), at('ord2', 0.9))}><Tag x={1500} y={620} text="S1 always before S2" bg={C.green} fg="#fff" s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: deadlock, the fix, two more failures
const Dead: React.FC<{ f: number }> = ({ f }) => {
  const a = B('dead').start, d2 = B('dead2').start, fx = B('fix').start, mo = B('more').start;
  const gS = at('dead', 0.45), gQ = at('dead', 0.75);
  const stuck = p(f, at('dead2', 0.4), at('dead2', 0.6)) * (1 - p(f, fx, fx + 10));
  const fixMode = f >= fx;
  const ls = track(f, [{ at: 0, x: 960, y: 380 }, { at: gS, x: 700, y: 470, d: 16 }, { at: fx, x: 960, y: 380, d: 12 }, { at: at('fix', 0.2), x: 700, y: 470, d: 16 }]);
  const lq = track(f, [{ at: 0, x: 960, y: 640 }, { at: gQ, x: 1220, y: 470, d: 16 }, { at: fx, x: 960, y: 640, d: 12 }, { at: at('fix', 0.45), x: 740, y: 360, d: 16 }]);
  const o = 1 - p(f, mo - 4, mo + 10);
  return <g>
    <Head f={f} a={a} b={d2}>P0 takes S then Q; P1 takes Q then S</Head>
    <Head f={f} a={d2} b={fx} c={C.red}>deadlock</Head>
    <Head f={f} a={fx} b={mo} c={C.green}>the fix: the same order everywhere</Head>
    <Head f={f} a={mo}>two more ways waiting can fail</Head>
    <g opacity={o}>
      <Proc f={f} x={560} y={760} c={C.blue} label="P0" seed={0} grey={stuck * 0.6} mood={stuck > 0.5 ? 'sad' : 'ok'} look={[1, -0.6]} />
      <Proc f={f} x={1360} y={760} c={C.amber} label="P1" seed={1} grey={stuck * 0.6} mood={stuck > 0.5 ? 'sad' : fixMode ? 'worried' : 'ok'} look={[-1, -0.6]} />
      <Lock x={ls.x} y={ls.y} closed={1} label="S" c={f > gS && !(fixMode && f < at('fix', 0.2)) ? C.blue : C.ink} />
      <Lock x={lq.x} y={lq.y} closed={1} label="Q" c={!fixMode && f > gQ ? C.amber : fixMode && f > at('fix', 0.45) ? C.blue : C.ink} />
      {/* wants arrows forming the cycle */}
      <g opacity={stuck}>
        <path d="M640,560 C760,620 1080,620 1180,520" fill="none" stroke={C.red} strokeWidth={6} strokeDasharray="14 10" />
        <path d="M1280,560 C1160,700 840,700 740,520" fill="none" stroke={C.red} strokeWidth={6} strokeDasharray="14 10" />
        <Tag x={960} y={250} text="each holds one, waits for the other" bg={C.red} fg="#fff" s={30} />
      </g>
      <g opacity={p(f, at('fix', 0.3), at('fix', 0.4))}>
        <Tag x={1360} y={560} text="waits for S, holds nothing" bg={HL} s={26} />
      </g>
    </g>
    {/* more: starvation and priority inversion */}
    <g opacity={p(f, mo, mo + 12)}>
      <text x={480} y={300} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={44} fill={C.ink}>starvation</text>
      <Proc f={f} x={480} y={640} c={PC.P4} label="P" seed={3} mood="sad" />
      <Tag x={480} y={430} text={`wait ${Math.floor(p(f, mo, mo + 300) * 99)}`} bg={HL} s={28} mono />
      <text x={480} y={740} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={28} fill={C.ink}>never gets its turn</text>
      <g opacity={p(f, at('more', 0.4), at('more', 0.5))}>
        <text x={1360} y={300} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={44} fill={C.ink}>priority inversion</text>
        <Proc f={f} x={1140} y={640} c={C.red} label="high" seed={0} mood="worried" />
        <Proc f={f} x={1360} y={640} c={C.amber} label="med" seed={1} mood="happy" s={0.85} />
        <Proc f={f} x={1580} y={640} c={C.teal} label="low" seed={2} mood="ok" s={0.75} />
        <Lock x={1580} y={430} closed={1} c={C.teal} s={0.6} />
        <path d="M1150,470 C1250,380 1450,360 1540,410" fill="none" stroke={C.red} strokeWidth={5} strokeDasharray="12 8" />
        <text x={1360} y={740} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={28} fill={C.ink}>low holds the lock high needs</text>
      </g>
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['test_and_set', 'one atomic step'],
  ['mutex', 'acquire, critical section, release'],
  ['semaphore', 'wait decrements, signal increments'],
  ['synch = 0', 'forces an order'],
  ['deadlock', 'opposite lock orders'],
]} />;

export const OsLocks: React.FC = () =>
  <Episode t={timeline} ch="Chapter 6" title="Locks and semaphores" scenes={[
    [Tas, 0], [Mutex, B('mutex').start], [Sem, B('sem').start], [Own, B('bin').start], [Order, B('ord').start], [Dead, B('dead').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('hook', 0.75)} name="whoosh" volume={0.25} />
    {[at('tas', 0.45), at('tas2', 0.15), at('tas3', 0.55)].map((t, i) => <Sfx key={i} at={t} name="tick" volume={0.3} />)}
    {[0, 1, 2, 3, 4].map(i => <Sfx key={`m${i}`} at={B('mutex2').start + 8 + i * 26} name="pop" volume={0.18} />)}
    {[at('sem2', 0.2), at('sem2', 0.4), at('sem2', 0.6), at('sem3', 0.2)].map((t, i) => <Sfx key={`s${i}`} at={t} name="tick" volume={0.3} />)}
    <Sfx at={at('sem4', 0.1)} name="ping" volume={0.2} />
    <Sfx at={at('bin', 0.75) + 14} name="beep" volume={0.18} />
    <Sfx at={at('ord2', 0.35)} name="ping" volume={0.2} />
    <Sfx at={at('dead2', 0.45)} name="beep" volume={0.2} />
  </Episode>;
