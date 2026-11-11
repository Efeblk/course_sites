// COE303 ch6 part 1: the producer-consumer race (count = 5, order T0-T5 gives 4), critical section and its three rules, Peterson.
import React from 'react';
import {
  C, Cell, Code, Episode, Exam, Fly, HL, Head, MONO, Mark, PC, Proc, SANS, SERIF, Sfx, Tag,
  mixC, p, pop, shake, tl, track, win,
} from './kit';
import timeline from '../timelines/os-race.json';

const { B, at } = tl(timeline);
const PROD = C.blue, CONS = C.amber;

// ------------------------------------------------ scene 1: one in, one out
const Shelf: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook'), dropAt = at('pc', 0.3), takeAt = at('pc', 0.72);
  const items = 5 + (f > dropAt + 20 ? 1 : 0) - (f > takeAt + 4 ? 1 : 0);
  const prod = track(f, [{ at: 0, x: -140, y: 700 }, { at: h.start + 20, x: 380, y: 700, d: 22 }]);
  const cons = track(f, [{ at: 0, x: 2060, y: 700 }, { at: at('pc', 0.5), x: 1540, y: 700, d: 22 }]);
  const slotX = (i: number) => 700 + i * 90;
  return <g>
    <Head f={f} a={h.start}>a shared buffer and its counter</Head>
    {/* shelf */}
    <rect x={640} y={600} width={640} height={16} rx={6} fill="#b9ae96" />
    {Array.from({ length: items }, (_, i) => <g key={i} transform={`translate(${slotX(i)},${560}) scale(${i < 5 ? pop(f, h.start + 6 + i * 4, 12) : 1})`}>
      <rect x={-34} y={-38} width={68} height={76} rx={10} fill={mixC('#e7c98f', '#d9b778', i % 2)} stroke="#b39159" strokeWidth={3} />
      <line x1={-34} x2={34} y1={-8} y2={-8} stroke="#b39159" strokeWidth={3} />
    </g>)}
    {/* the item travelling in, and the one going out */}
    {f > dropAt && f <= dropAt + 20 && (() => { const q = track(f, [{ at: 0, x: 440, y: 560 }, { at: dropAt, x: slotX(5), y: 560, d: 20, h: 120 }]); return <rect x={q.x - 34} y={q.y - 38} width={68} height={76} rx={10} fill="#e7c98f" stroke="#b39159" strokeWidth={3} />; })()}
    {f > takeAt && f < takeAt + 24 && (() => { const q = track(f, [{ at: 0, x: slotX(5), y: 560 }, { at: takeAt, x: 1480, y: 600, d: 20, h: 120 }]); return <rect x={q.x - 34} y={q.y - 38} width={68} height={76} rx={10} fill="#e7c98f" stroke="#b39159" strokeWidth={3} />; })()}
    <Proc f={f} x={prod.x} y={prod.y} sq={prod.sq} c={PROD} label="prod" seed={0} look={[1, -0.4]} mood="happy" />
    <Proc f={f} x={cons.x} y={cons.y} sq={cons.sq} c={CONS} label="cons" seed={1} look={[-1, -0.4]} mood="happy" />
    {/* the counter */}
    <g transform={`translate(960,300) scale(${1 + 0.06 * (f > dropAt + 20 && f < dropAt + 34 ? 1 : 0)})`} opacity={p(f, h.start + 4, h.start + 16)}>
      <Cell x={0} y={0} name="count" v={String(items)} w={220} c={C.ink} />
    </g>
    <g opacity={p(f, dropAt + 10, dropAt + 20)}><Tag x={380} y={480} text="count++" bg={PROD} fg="#fff" s={32} mono /></g>
    <g opacity={p(f, takeAt, takeAt + 10)}><Tag x={1540} y={480} text="count--" bg={CONS} fg="#fff" s={32} mono /></g>
    <g opacity={p(f, at('pc2', 0.2), at('pc2', 0.4))}><Tag x={960} y={850} text="one in, one out: still 5" bg={C.green} fg="#fff" s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 2: three machine steps, interleaved
const STEPS = [
  { who: 0, line: 0, txt: 'T0 producer: load', at: () => at('t0', 0.12) },
  { who: 0, line: 1, txt: 'T1 producer: +1', at: () => at('t0', 0.55) },
  { who: 1, line: 0, txt: 'T2 consumer: load', at: () => at('t2', 0.3) },
  { who: 1, line: 1, txt: 'T3 consumer: −1', at: () => at('t2', 0.66) },
  { who: 0, line: 2, txt: 'T4 producer: store', at: () => at('t4', 0.1) },
  { who: 1, line: 2, txt: 'T5 consumer: store', at: () => at('t5', 0.12) },
];
const Steps: React.FC<{ f: number }> = ({ f }) => {
  const z = B('zoom').start, sw = B('swap').start, rc = B('race').start;
  const step = STEPS.reduce((k, s, i) => (f >= s.at() ? i : k), -1);
  const st = (i: number) => STEPS[i].at();
  const r1 = f < st(0) + 18 ? '?' : f < st(1) + 6 ? '5' : '6';
  const r2 = f < st(2) + 18 ? '?' : f < st(3) + 6 ? '5' : '4';
  const swapT = at('swap', 0.3);
  const count = f >= swapT ? (f >= swapT + 30 ? '6' : '4') : f < st(4) + 18 ? '5' : f < st(5) + 18 ? '6' : '4';
  const bad = f >= st(5) + 18;
  const who = step >= 0 ? STEPS[step].who : -1;
  const cardY = 360;
  const typed = (k: number) => [0, 1, 2].map(i => p(f, z + 20 + k * 6 + i * 16, z + 44 + k * 6 + i * 16));
  return <g>
    <Head f={f} a={z} b={rc}>each line is three machine steps</Head>
    <Head f={f} a={rc} c={C.red}>a race condition</Head>
    <Cell x={960} y={250} name="count (shared)" v={count} w={220} flash={bad ? 0.2 : 0} vc={bad ? C.red : C.ink} />
    {/* producer side */}
    <g opacity={p(f, z + 6, z + 18)}>
      <Code x={70} y={cardY} w={640} s={30} title="producer   count++" typed={typed(0)} hl={who === 0 ? STEPS[step].line : -1}
        lines={['register1 = count', 'register1 = register1 + 1', 'count = register1']} />
      <Cell x={400} y={760} name="register1" v={r1} w={170} c={PROD} flash={f > st(1) && f < st(1) + 14 ? 1 : 0} />
      <Proc f={f} x={150} y={860} c={PROD} label="prod" s={0.75} seed={0} mood={who === 0 ? 'focus' : step < 0 ? 'ok' : 'sleep'} look={[1, -1]} />
    </g>
    <g opacity={p(f, z + 12, z + 24)}>
      <Code x={1210} y={cardY} w={640} s={30} title="consumer   count--" typed={typed(1)} hl={who === 1 ? STEPS[step].line : -1}
        lines={['register2 = count', 'register2 = register2 − 1', 'count = register2']} />
      <Cell x={1520} y={760} name="register2" v={r2} w={170} c={CONS} flash={f > st(3) && f < st(3) + 14 ? 1 : 0} />
      <Proc f={f} x={1770} y={860} c={CONS} label="cons" s={0.75} seed={1} mood={who === 1 ? 'focus' : step < 0 ? 'ok' : bad ? 'worried' : 'sleep'} look={[-1, -1]} />
    </g>
    {/* values flying */}
    <Fly f={f} s={st(0)} a={[960, 270]} b={[400, 780]} text="5" c={PROD} h={80} />
    <Fly f={f} s={st(2)} a={[960, 270]} b={[1520, 780]} text="5" c={CONS} h={80} />
    <Fly f={f} s={st(4)} a={[400, 780]} b={[960, 270]} text="6" c={PROD} h={80} />
    <Fly f={f} s={st(5)} a={[1520, 780]} b={[960, 270]} text="4" c={CONS} h={80} />
    {/* the step strip */}
    {STEPS.map((s, i) => {
      const x = 470 + i * 196, on = step === i, seen = step >= i;
      return <g key={i} opacity={seen ? 1 : 0.25} transform={`translate(${x},960)`}>
        <rect x={-92} y={-34} width={184} height={68} rx={14} fill={on ? (s.who ? CONS : PROD) : '#fbf9f4'} stroke={s.who ? CONS : PROD} strokeWidth={3} />
        <text x={0} y={-4} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={22} fill={on ? '#fff' : C.ink}>{s.txt.split(' ')[0]}</text>
        <text x={0} y={22} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={20} fill={on ? '#fff' : C.muted}>{s.txt.split(': ')[1]}</text>
      </g>;
    })}
    <Mark f={f} a={st(5) + 22} x={1110} y={210} ok={false} out={swapT - 4} />
    <g opacity={win(f, at('t5', 0.6), swapT)}><Tag x={960} y={120 + 450} text="an item vanished" bg={C.red} fg="#fff" s={32} /></g>
    {/* swap the two stores */}
    <g opacity={win(f, swapT - 6, rc + 4)}>
      <Tag x={960} y={570} text="swap the stores → 6" bg={C.ink} fg="#fff" s={32} />
      <g opacity={p(f, at('swap', 0.7), at('swap', 0.8))}><Tag x={960} y={650} text="only 5 is correct" bg={C.green} fg="#fff" s={32} /></g>
    </g>
    <g opacity={p(f, rc + 8, rc + 20)}>
      <Tag x={960} y={660} text="result depends on the order of access" bg={C.red} fg="#fff" s={34} />
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: the critical section and its three rules
const RX0 = 760, RX1 = 1160, RY0 = 300, RY1 = 700;
const Room: React.FC<{ f: number }> = ({ f }) => {
  const a = B('cs').start, se = B('sec').start, r1 = B('r1').start, r2 = B('r2').start, r3 = B('r3').start;
  const doorL = [RX0, 640], doorR = [RX1, 640];
  // P0: enter at cs, leave by the exit at sec; enters again for r1; leaves at r2; for r3 goes in and out twice
  const p0 = track(f, [
    { at: 0, x: 380, y: 680 },
    { at: at('cs', 0.55), x: RX0 - 80, y: 680, d: 16 }, { at: at('cs', 0.68), x: 960, y: 640, d: 18 },
    { at: at('sec', 0.62), x: RX1 + 90, y: 680, d: 18 }, { at: at('sec', 0.85), x: 380, y: 680, d: 22, h: 40 },
    { at: at('r1', 0.15), x: 960, y: 640, d: 24, h: 140 },
    { at: at('r2', 0.05), x: RX1 + 90, y: 680, d: 18 }, { at: at('r2', 0.15), x: 1500, y: 680, d: 18, h: 40 },
    { at: at('r3', 0.2), x: 960, y: 640, d: 22, h: 120 }, { at: at('r3', 0.4), x: 1500, y: 680, d: 22, h: 120 },
    { at: at('r3', 0.55), x: 960, y: 640, d: 22, h: 120 }, { at: at('r3', 0.75), x: 1500, y: 680, d: 22, h: 120 },
  ]);
  const p1 = track(f, [
    { at: 0, x: -140, y: 680 }, { at: at('r1', 0.3), x: RX0 - 90, y: 680, d: 22 },
    { at: at('r2', 0.55), x: 960, y: 640, d: 22, h: 120 },
    { at: at('r2', 0.9), x: RX0 - 90, y: 680, d: 20 },
    { at: at('r3', 0.82), x: 960, y: 640, d: 22, h: 120 },
  ]);
  const bounce = at('r1', 0.45);
  const asks = at('r3', 0.12);
  const passes = (f > at('r3', 0.2) ? 1 : 0) + (f > at('r3', 0.55) ? 1 : 0);
  const rules = [['mutual exclusion', r1], ['progress', r2], ['bounded waiting', r3]] as const;
  return <g>
    <Head f={f} a={a}>the critical section: one process at a time</Head>
    {/* room */}
    <g opacity={p(f, a + 4, a + 16)}>
      <rect x={RX0} y={RY0} width={RX1 - RX0} height={RY1 - RY0} rx={18} fill="#efe6d4" stroke={C.ink} strokeWidth={6} />
      <rect x={RX0 - 8} y={560} width={16} height={130} fill={C.paper} /><rect x={RX1 - 8} y={560} width={16} height={130} fill={C.paper} />
      <text x={960} y={RY0 + 56} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={38} fill={C.ink}>critical section</text>
      <text x={960} y={RY0 + 96} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={24} fill={C.muted}>touches shared data</text>
    </g>
    <g opacity={p(f, se, se + 12)}>
      <Tag x={RX0 - 150} y={330} text="entry section" bg={C.blue} fg="#fff" s={28} />
      <Tag x={RX1 + 150} y={330} text="exit section" bg={C.teal} fg="#fff" s={28} />
      <text x={380} y={790} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>remainder section</text>
    </g>
    <Proc f={f} x={p0.x} y={p0.y} sq={p0.sq} c={C.blue} label="P0" seed={0} mood="ok" look={[1, 0]} />
    <Proc f={f} x={p1.x + shake(f, bounce, 18, 12)} y={p1.y} sq={p1.sq} c={C.amber} label="P1" seed={1} mood={f > bounce && f < at('r2', 0.5) ? 'worried' : 'ok'} look={[1, 0]} />
    {/* P1 tries the door while P0 is inside */}
    <Mark f={f} a={bounce} x={RX0 - 90} y={470} ok={false} out={at('r2', 0)} />
    {/* progress: the empty room lets P1 in */}
    <Mark f={f} a={at('r2', 0.62)} x={960} y={430} ok out={at('r2', 0.95)} />
    {/* bounded waiting counter */}
    <g opacity={win(f, asks, at('r3', 1.05))}>
      <Tag x={RX0 - 90} y={460} text={`others first: ${passes}`} bg={HL} s={26} mono />
    </g>
    {/* rule cards */}
    {rules.map(([t, a0], i) => {
      const on = f >= a0 && (i === 2 || f < rules[i + 1][1]);
      return <g key={t} opacity={p(f, a0, a0 + 12)} transform={`translate(${480 + i * 480},${900})`}>
        <rect x={-210} y={-44} width={420} height={88} rx={44} fill={on ? C.ink : '#fbf9f4'} stroke={C.ink} strokeWidth={3} />
        <text x={0} y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={on ? '#fff' : C.ink}>{t}</text>
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ scene 4: Peterson
const Peterson: React.FC<{ f: number }> = ({ f }) => {
  const a = B('pet').start, v = B('pet2').start;
  // pet3: Pi alone. pet4: both at once.
  const solo = [at('pet3', 0.1), at('pet3', 0.3), at('pet3', 0.55)];             // raise flag, give turn, enter
  const both = [at('pet4', 0.1), at('pet4', 0.24), at('pet4', 0.38), at('pet4', 0.58)]; // both flags, Pi writes turn, Pj writes turn, Pi enters
  const inPet4 = f >= B('pet4').start - 4;
  const fi = inPet4 ? f > both[0] : f > solo[0] && f < at('pet3', 0.9);
  const fj = inPet4 ? f > both[0] + 4 : false;
  const turn: 'i' | 'j' | '' = inPet4 ? (f > both[2] ? 'i' : f > both[1] ? 'j' : '') : f > solo[1] && f < at('pet3', 0.9) ? 'j' : '';
  const hl = inPet4 ? (f < both[1] ? 0 : f < both[3] ? 2 : 4) : f < solo[0] ? -1 : f < solo[1] ? 0 : f < solo[2] ? 1 : f < at('pet3', 0.9) ? 4 : -1;
  const piIn = inPet4 ? f > both[3] : f > solo[2] && f < at('pet3', 0.9);
  const pjSpin = inPet4 && f > both[2];
  const doorX = 1300;
  const pi = track(f, [{ at: 0, x: 1000, y: 760 }, { at: solo[2], x: doorX, y: 560, d: 18 }, { at: at('pet3', 0.9), x: 1000, y: 760, d: 18 }, { at: both[3], x: doorX, y: 560, d: 18 }]);
  const pj = { x: 1600, y: 760, sq: 0 };
  const barrier = B('pet5').start;
  const Flag: React.FC<{ x: number; up: boolean; c: string; lab: string }> = ({ x, up, c, lab }) =>
    <g transform={`translate(${x},820)`}>
      <line x1={0} y1={0} x2={0} y2={-200} stroke={C.ink} strokeWidth={5} />
      <g transform={`translate(0,${up ? -200 : -60})`}><path d="M0,0 L70,20 L0,40 Z" fill={up ? c : '#cfc5b1'} /></g>
      <text x={0} y={40} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={24} fill={C.ink}>{lab}</text>
    </g>;
  return <g>
    <Head f={f} a={a}>Peterson's solution: two processes, two variables</Head>
    <Code x={80} y={230} w={720} s={30} hl={hl} o={p(f, a + 6, a + 18)} title="process Pi"
      lines={['flag[i] = true;', 'turn = j;', 'while (flag[j] && turn == j)', '    ;  /* wait */', '/* critical section */', 'flag[i] = false;']} />
    {/* room */}
    <g opacity={p(f, a + 10, a + 22)}>
      <rect x={1180} y={300} width={240} height={290} rx={18} fill="#efe6d4" stroke={C.ink} strokeWidth={5} />
      <text x={1300} y={345} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={24} fill={C.muted}>critical section</text>
    </g>
    <g opacity={p(f, v, v + 12)}>
      <Flag x={900} up={fi} c={C.blue} lab="flag[i]" />
      <Flag x={1720} up={fj} c={C.amber} lab="flag[j]" />
      {/* turn sign */}
      <g transform="translate(1300,860)">
        <rect x={-120} y={-44} width={240} height={88} rx={20} fill={C.ink} />
        <text x={0} y={14} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill="#fff">{`turn = ${turn || '·'}`}</text>
      </g>
    </g>
    <Proc f={f} x={pi.x} y={pi.y} sq={pi.sq} c={C.blue} label="Pi" seed={0} s={0.9} mood={piIn ? 'happy' : 'ok'} look={[1, -0.5]} />
    <Proc f={f} x={pj.x + (pjSpin ? Math.sin(f / 2) * 3 : 0)} y={pj.y} sq={pj.sq} c={C.amber} label="Pj" seed={1} s={0.9} mood={pjSpin ? 'worried' : 'ok'} look={[-1, -0.5]} />
    {pjSpin && <g opacity={win(f, both[2] + 6, 1e9)}><Tag x={1600} y={600} text="waits: turn = i" bg={HL} s={26} mono /></g>}
    {inPet4 && <g>
      <g opacity={win(f, both[1], both[3] + 40)}><Tag x={1000} y={500} text="Pi writes turn = j" bg="#fff" s={26} mono /></g>
      <g opacity={win(f, both[2], both[3] + 40)}><Tag x={1600} y={500} text="Pj writes turn = i (last)" bg="#fff" s={26} mono /></g>
    </g>}
    {/* in pet4 the one who wrote last waits; Pi goes in */}
    <g opacity={win(f, at('pet4', 0.7), barrier)}><Tag x={1300} y={230} text="last writer waits: only one inside" bg={C.green} fg="#fff" s={30} /></g>
    <g opacity={p(f, barrier, barrier + 12)}>
      <rect x={80} y={740} width={720} height={14} rx={7} fill={C.red} />
      <text x={440} y={810} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.red}>memory barrier</text>
      <text x={440} y={858} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={28} fill={C.ink}>stops reordering of loads and stores</text>
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4']} rows={[
  ['count++', 'load, change, store'],
  ['from 5', 'the race gives 4 or 6'],
  ['critical section', 'mutual exclusion, progress, bounded waiting'],
  ['Peterson', 'flag[i] and turn'],
]} />;

export const OsRace: React.FC = () =>
  <Episode t={timeline} ch="Chapter 6" title="The lost update" scenes={[
    [Shelf, 0], [Steps, B('zoom').start], [Room, B('cs').start], [Peterson, B('pet').start], [Ex, B('ex0').start],
  ]}>
    {STEPS.map((s, i) => <Sfx key={i} at={s.at()} name="tick" volume={0.3} />)}
    <Sfx at={STEPS[5].at() + 22} name="beep" volume={0.2} />
    <Sfx at={at('r1', 0.45)} name="beep" volume={0.18} />
    <Sfx at={at('pc', 0.3)} name="pop" volume={0.2} />
    <Sfx at={at('pc', 0.72)} name="pop" volume={0.2} />
    <Sfx at={at('pet4', 0.58)} name="ping" volume={0.2} />
  </Episode>;
