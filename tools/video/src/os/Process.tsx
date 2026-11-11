// COE303 ch3: program vs process and its memory layout, the five states and six transitions (one life story),
// PCB and context switch, fork/exec/2^n, IPC.
import React from 'react';
import { HardDrive } from 'lucide-react';
import {
  C, Chip, Code, Device, Draw, Episode, Exam, Fly, HL, Head, KZONE, MONO, Mark, PC, Proc, SANS, SERIF, Sfx, Tag, Card,
  lerp, mixC, p, pop, shake, tl, track, win,
} from './kit';
import timeline from '../timelines/os-process.json';

const { B, at } = tl(timeline);

// ------------------------------------------------ scene 1: a file wakes up
const Alive: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, al = B('alive').start, l1 = B('layout').start, l2 = B('layout2').start, mn = B('many').start;
  const wake = p(f, at('alive', 0.15), at('alive', 0.4));
  const me = track(f, [{ at: 0, x: 420, y: 620 }, { at: at('alive', 0.35), x: 860, y: 640, d: 22 }]);
  const twin = track(f, [{ at: 0, x: 420, y: 620 }, { at: at('many', 0.35), x: 640, y: 640, d: 22 }]);
  const MX = 1450, top = 220, H = 640;
  const heap = p(f, at('layout2', 0.05), at('layout2', 0.4)), stack = p(f, at('layout2', 0.5), at('layout2', 0.85));
  const sec = (y: number, hh: number, t: string, c: string, a: number, sub?: string) => <g opacity={p(f, a, a + 12)}>
    <rect x={MX - 170} y={y} width={340} height={hh} rx={10} fill={c} stroke="#fbf9f4" strokeWidth={3} />
    {hh > 40 && <text x={MX} y={y + hh / 2 + 12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill="#fff">{t}</text>}
    {sub && <text x={MX + 200} y={y + hh / 2 + 10} fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.ink}>{sub}</text>}
  </g>;
  return <g>
    <Head f={f} a={h} b={al}>on the disk: a passive file</Head>
    <Head f={f} a={al} b={l1}>run it: an active process</Head>
    <Head f={f} a={l1} b={mn}>a process's memory</Head>
    <Head f={f} a={mn}>one program, many processes</Head>
    <Device I={HardDrive} x={420} y={820} label="disk" s={pop(f, h + 2, 14)} />
    <Proc f={f} x={me.x} y={me.y} sq={me.sq} c={C.blue} label="prog" seed={0} grey={1 - wake} mood={wake < 0.5 ? 'sleep' : 'happy'} look={[1, -0.3]} />
    {f > at('many', 0.3) && <Proc f={f} x={twin.x} y={twin.y} sq={twin.sq} c={C.teal} label="prog" seed={3} mood="happy" look={[1, -0.3]} />}
    <g opacity={p(f, at('alive', 0.5), at('alive', 0.6)) * (1 - p(f, l1 - 4, l1 + 8))}>
      <Tag x={860} y={400} text="state · memory · program counter" bg={C.ink} fg="#fff" s={28} />
    </g>
    <g opacity={win(f, at('many', 0.45), 1e9)}><Tag x={750} y={400} text="two windows, one program" bg={HL} s={28} /></g>
    {/* memory layout: stack on top, text at the bottom */}
    <g opacity={p(f, l1, l1 + 10)}>
      <rect x={MX - 180} y={top - 10} width={360} height={H + 20} rx={18} fill="#efe6d4" stroke={C.ink} strokeWidth={4} />
      {sec(top + H - 90, 90, 'text', C.blue, at('layout', 0.2), 'code')}
      {sec(top + H - 180, 90, 'data', C.teal, at('layout', 0.6), 'global variables')}
      {sec(top + H - 180 - 60 - 120 * heap, 60 + 120 * heap, 'heap', C.amber, at('layout2', 0.02), 'malloc: grows up')}
      {sec(top, 60 + 120 * stack, 'stack', '#7a3f98', at('layout2', 0.48), 'calls: grows down')}
      <g opacity={p(f, at('layout2', 0.2), at('layout2', 0.3))}><path d={`M${MX - 230},${top + H - 260} v-80 l-14,22 M${MX - 230},${top + H - 340} l14,22`} stroke={C.amber} strokeWidth={6} fill="none" strokeLinecap="round" /></g>
      <g opacity={p(f, at('layout2', 0.65), at('layout2', 0.75))}><path d={`M${MX - 230},${top + 120} v80 l-14,-22 M${MX - 230},${top + 200} l14,-22`} stroke="#7a3f98" strokeWidth={6} fill="none" strokeLinecap="round" /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: five states, one life
type SN = 'new' | 'ready' | 'running' | 'waiting' | 'terminated';
const NODE: Record<SN, [number, number]> = { new: [300, 330], ready: [660, 560], running: [1260, 560], waiting: [960, 860], terminated: [1620, 330] };
const Life: React.FC<{ f: number }> = ({ f }) => {
  const a = B('life').start;
  const moves: [number, SN][] = [
    [at('new', 0.05), 'new'], [at('new', 0.6), 'ready'], [at('run', 0.25), 'running'], [at('intr', 0.25), 'ready'],
    [at('io', 0.1), 'running'], [at('io', 0.45), 'waiting'], [at('trapA', 0.3), 'ready'], [at('trapA', 0.75), 'running'], [at('exit', 0.25), 'terminated'],
  ];
  const tryAt = at('trapQ', 0.55);
  const keys = [{ at: 0, x: NODE.new[0], y: NODE.new[1] - 300 }, ...moves.map(([t, s]) => ({ at: t, x: NODE[s][0], y: NODE[s][1] - 50, d: 18, h: 80 }))];
  const base = track(f, keys);
  const atTry = f > tryAt && f < tryAt + 30;
  const tryK = atTry ? track(f, [{ at: 0, x: NODE.waiting[0], y: NODE.waiting[1] - 50 }, { at: tryAt, x: 1120, y: 700, d: 12, h: 40 }, { at: tryAt + 16, x: NODE.waiting[0], y: NODE.waiting[1] - 50, d: 12 }]) : base;
  const k = atTry ? tryK : base;
  // arrows draw the first time they are used
  const AR: [SN, SN, string, string, number][] = [
    ['new', 'ready', 'M360,370 L600,520', 'admitted', at('new', 0.6)],
    ['ready', 'running', 'M780,535 L1140,535', 'dispatch', at('run', 0.25)],
    ['running', 'ready', 'M1140,600 L780,600', 'interrupt', at('intr', 0.25)],
    ['running', 'waiting', 'M1200,620 L1030,800', 'I/O wait', at('io', 0.45)],
    ['waiting', 'ready', 'M890,800 L720,620', 'I/O done', at('trapA', 0.3)],
    ['running', 'terminated', 'M1320,500 L1560,380', 'exit', at('exit', 0.25)],
  ];
  const lab: Record<string, [number, number]> = { admitted: [400, 470], dispatch: [960, 510], interrupt: [960, 650], 'I/O wait': [1210, 730], 'I/O done': [700, 730], exit: [1360, 410] };
  const cur = moves.reduce((s, [t, n]) => (f >= t ? n : s), 'new' as SN);
  const used = AR.filter(r => f >= r[4]).length;
  return <g>
    <Head f={f} a={a}>the life of one process</Head>
    {(Object.keys(NODE) as SN[]).map((n, i) => {
      const [x, y] = NODE[n], on = cur === n && f > moves[0][0];
      return <g key={n} transform={`translate(${x},${y}) scale(${pop(f, a + 4 + i * 5, 14)})`}>
        <rect x={-120} y={-40} width={240} height={80} rx={40} fill={on ? C.ink : '#fbf9f4'} stroke={C.ink} strokeWidth={4} />
        <text y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={on ? '#fff' : C.ink}>{n}</text>
      </g>;
    })}
    {AR.map(([, , d, l, t0]) => {
      const [x1, y1, x2, y2] = d.replace(/[ML]/g, ' ').trim().split(/[ ,]+/).map(Number);
      const ang = Math.atan2(y2 - y1, x2 - x1), hx = (dx: number, dy: number) => `${x2 + dx * Math.cos(ang) - dy * Math.sin(ang)},${y2 + dx * Math.sin(ang) + dy * Math.cos(ang)}`;
      return <g key={l}>
      <Draw f={f} a={t0} b={t0 + 16} d={d} c={C.blue} sw={6} />
      <polygon points={`${hx(4, 0)} ${hx(-24, -14)} ${hx(-24, 14)}`} fill={C.blue} opacity={p(f, t0 + 14, t0 + 18)} />
      <g opacity={p(f, t0 + 10, t0 + 18)}><text x={lab[l][0]} y={lab[l][1]} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.blue}>{l}</text></g>
    </g>;
    })}
    <Proc f={f} x={k.x + shake(f, tryAt + 14, 14, 8)} y={k.y} sq={k.sq} c={C.blue} label="P" seed={0} s={0.62}
      mood={cur === 'waiting' ? (f > tryAt + 10 ? 'sad' : 'sleep') : cur === 'terminated' ? 'happy' : cur === 'running' ? 'focus' : 'ok'} look={[1, 0]} o={p(f, moves[0][0] - 4, moves[0][0] + 4)} />
    <Mark f={f} a={tryAt + 12} x={1120} y={700} ok={false} out={B('trapA').start + 20} />
    <g opacity={win(f, at('trapQ', 0.1), tryAt)}><Tag x={1180} y={860} text="waiting → running?" bg={HL} s={28} /></g>
    <g opacity={win(f, at('trapA', 0.05), B('exit').start)}><Tag x={1180} y={940} text="never: waiting → ready first" bg={C.red} fg="#fff" s={28} /></g>
    <g opacity={win(f, at('io', 0.5), B('trapQ').start)}><Tag x={960} y={970} text="cannot use the CPU anyway" bg="#fff" s={26} /></g>
    <g opacity={p(f, at('exit', 0.5), at('exit', 0.6))}><Tag x={960} y={980} text={`five states, ${used} transitions`} bg={C.ink} fg="#fff" s={32} /></g>
  </g>;
};

// ------------------------------------------------ scene 3: PCB and context switch
const Pcb: React.FC<{ f: number }> = ({ f }) => {
  const a = B('pcb').start, cs = B('cs').start, c2 = B('cs2').start;
  const fields = ['state', 'process ID', 'program counter', 'registers', 'priority', 'memory info', 'open files'];
  const toCs = p(f, cs - 4, cs + 20);
  const save = at('cs', 0.25), load = at('cs', 0.6);
  const p0 = track(f, [{ at: 0, x: 960, y: 520 }, { at: save + 10, x: 480, y: 600, d: 20 }]);
  const p1 = track(f, [{ at: 0, x: 1440, y: 600 }, { at: load + 14, x: 960, y: 520, d: 20 }]);
  const bar = (x: number, w: number, c: string, lab: string, o: number) => <g opacity={o}>
    <rect x={x} y={890} width={w} height={60} rx={8} fill={c} />
    <text x={x + w / 2} y={930} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={26} fill="#fff">{lab}</text>
  </g>;
  return <g>
    <Head f={f} a={a} b={cs}>the process control block (PCB)</Head>
    <Head f={f} a={cs}>a context switch</Head>
    {/* one big PCB */}
    <g opacity={1 - toCs} transform={`translate(760,190)`}>
      <Card x={0} y={0} w={400} h={600} />
      <rect x={140} y={-24} width={120} height={40} rx={10} fill="#b9ae96" />
      <text x={200} y={70} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={40} fill={C.ink}>PCB</text>
      {fields.map((t, i) => <g key={t} opacity={p(f, at('pcb', 0.25) + i * 9, at('pcb', 0.25) + i * 9 + 8)}>
        <line x1={40} x2={360} y1={120 + i * 66} y2={120 + i * 66} stroke="#e6dccb" strokeWidth={2} />
        <text x={50} y={160 + i * 66} fontFamily={SANS} fontWeight={700} fontSize={32} fill={i === 2 || i === 3 ? C.blue : C.ink}>{t}</text>
      </g>)}
    </g>
    {/* context switch */}
    <g opacity={toCs}>
      <Chip f={f} x={960} y={454} busy={f < save || f > load + 30 ? 1 : 0} s={0.92} />
      {[['PCB0', 480, C.blue], ['PCB1', 1440, C.amber]].map(([t, x, c]) => <g key={t as string}>
        <rect x={(x as number) - 130} y={680} width={260} height={150} rx={16} fill="#fbf9f4" stroke={c as string} strokeWidth={4} />
        <text x={x as number} y={730} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill={c as string}>{t as string}</text>
        <text x={x as number} y={790} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={24} fill={C.ink}>PC · registers</text>
      </g>)}
      <Fly f={f} s={save} a={[960, 420]} b={[480, 760]} text="P0" c={C.blue} h={80} d={22} />
      <Fly f={f} s={load} a={[1440, 760]} b={[960, 420]} text="P1" c={C.amber} h={80} d={22} />
      <Proc f={f} x={p0.x} y={p0.y} sq={p0.sq} c={C.blue} label="P0" seed={0} s={0.75} mood={f > save ? 'sleep' : 'focus'} look={[0, 1]} />
      <Proc f={f} x={p1.x} y={p1.y} sq={p1.sq} c={C.amber} label="P1" seed={1} s={0.75} mood={f > load + 30 ? 'focus' : 'sleep'} look={[0, 1]} />
      {bar(360, 420 * p(f, cs, save), C.blue, 'P0 runs', 1)}
      {bar(780, 360 * p(f, save, load + 30), '#9c9483', 'switch', p(f, save, save + 4))}
      {bar(1140, 420 * p(f, load + 30, at('cs2', 0.4)), C.amber, 'P1 runs', p(f, load + 30, load + 34))}
      <g opacity={p(f, c2, c2 + 12)}>
        <rect x={772} y={880} width={376} height={80} rx={12} fill="none" stroke={C.red} strokeWidth={5} strokeDasharray="12 8" />
        <Tag x={960} y={1030} text="pure overhead: no useful work" bg={C.red} fg="#fff" s={30} />
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 4: fork, exec, 2^n
const Fork: React.FC<{ f: number }> = ({ f }) => {
  const a = B('fork').start, rt = B('ret').start, ex = B('exec').start, pw = B('pow').start;
  const split = at('fork', 0.6);
  const st = p(f, split - 14, split) * (1 - p(f, split, split + 8));
  const child = track(f, [{ at: 0, x: 760, y: 680 }, { at: split, x: 1160, y: 680, d: 22, h: 100 }]);
  const morph = p(f, at('exec', 0.35), at('exec', 0.6));
  const out = p(f, pw - 4, pw + 12);
  return <g>
    <Head f={f} a={a} b={pw}>fork copies; exec replaces</Head>
    <Head f={f} a={pw}>every process forks three times</Head>
    <g opacity={1 - out}>
      <Code x={470} y={190} w={980} s={32} lines={['pid = fork();', 'if (pid == 0) execlp("/bin/ls", "ls", NULL);']} hl={f < ex ? 0 : 1} typed={[p(f, a + 6, a + 26), p(f, ex, ex + 30)]} />
      <Proc f={f} x={760} y={680} c={C.blue} label="parent" seed={0} sq={-st * 1.5} mood={f > split ? 'happy' : 'ok'} look={[1, -0.3]} w={140} />
      {f > split - 2 && <Proc f={f} x={child.x} y={child.y} sq={child.sq} c={mixC(C.blue, C.green, morph)} label={morph > 0.5 ? 'ls' : 'child'} seed={1} mood="happy" look={[-1, -0.3]} w={140} />}
      <g opacity={p(f, at('ret', 0.3), at('ret', 0.4))}><Tag x={760} y={460} text="pid = child's PID (> 0)" bg={C.blue} fg="#fff" s={30} mono /></g>
      <g opacity={p(f, at('ret', 0.6), at('ret', 0.7))}><Tag x={1160} y={460} text="pid = 0" bg={C.green} fg="#fff" s={30} mono /></g>
      <g opacity={p(f, at('exec', 0.6), at('exec', 0.7))}><Tag x={1160} y={820} text="same process, new code" bg={HL} s={28} /></g>
    </g>
    {/* the tree */}
    <g opacity={out}>
      {[1, 2, 4, 8].map((n, row) => {
        const t0 = pw + 10 + row * 22;
        return <g key={n} opacity={p(f, t0, t0 + 10)}>
          <text x={260} y={300 + row * 190} fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.muted}>{row === 0 ? 'start' : `fork ${row}`}</text>
          {Array.from({ length: n }, (_, i) => {
            const x = 960 + (i - (n - 1) / 2) * 150;
            return <Proc key={i} f={f} x={x} y={330 + row * 190} c={i % 2 ? C.green : C.blue} s={0.55 * pop(f, t0 + i * 2, 12)} seed={i + row} mood="happy" />;
          })}
          <text x={1680} y={300 + row * 190} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>{n}</text>
        </g>;
      })}
      <g opacity={p(f, at('pow', 0.7), at('pow', 0.8))}><Tag x={960} y={1010} text="2³ = 8 processes" bg={C.ink} fg="#fff" s={34} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 5: IPC
const Ipc: React.FC<{ f: number }> = ({ f }) => {
  const a = B('ipc').start, m = at('ipc', 0.55);
  const env = p(f, m + 6, m + 50);
  const ex = env < 0.5 ? lerp(1180, 1440, env * 2) : lerp(1440, 1700, (env - 0.5) * 2), ey = env < 0.5 ? lerp(560, 820, env * 2) : lerp(820, 560, (env - 0.5) * 2);
  return <g>
    <Head f={f} a={a}>two ways for processes to talk</Head>
    <g opacity={p(f, a + 6, a + 16)}>
      <text x={480} y={260} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.blue}>shared memory</text>
      <Proc f={f} x={260} y={640} c={C.blue} label="A" seed={0} look={[1, 0]} />
      <Proc f={f} x={700} y={640} c={C.amber} label="B" seed={1} look={[-1, 0]} />
      <rect x={380} y={380} width={200} height={140} rx={14} fill={HL} stroke={C.ink} strokeWidth={4} />
      <text x={480} y={462} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>shared</text>
      <path d="M300,480 L380,450 M660,480 L580,450" stroke={C.ink} strokeWidth={5} />
      <g opacity={p(f, at('ipc', 0.3), at('ipc', 0.4))}><Tag x={480} y={800} text="must synchronize access" bg="#fff" s={26} /></g>
    </g>
    <g opacity={p(f, m - 6, m + 6)}>
      <text x={1440} y={260} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.teal}>message passing</text>
      <Proc f={f} x={1120} y={640} c={C.blue} label="A" seed={2} look={[1, 0]} />
      <Proc f={f} x={1760} y={640} c={C.amber} label="B" seed={3} look={[-1, 0]} />
      <rect x={1300} y={800} width={280} height={100} rx={16} fill={KZONE} stroke={C.ink} strokeWidth={3} />
      <text x={1440} y={862} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.ink}>kernel</text>
      {env > 0 && env < 1 && <g transform={`translate(${ex},${ey})`}><rect x={-36} y={-24} width={72} height={48} rx={6} fill="#fff" stroke={C.ink} strokeWidth={3} /><path d="M-36,-24 L0,4 L36,-24" fill="none" stroke={C.ink} strokeWidth={3} /></g>}
      <g opacity={p(f, m + 10, m + 20)}><text x={1440} y={960} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.ink}>send · receive</text></g>
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['program', 'passive; process: active'],
  ['states', 'five states, six transitions'],
  ['waiting', 'never straight to running'],
  ['PCB', 'saves a process; switching is overhead'],
  ['fork', 'child gets 0, parent gets the PID'],
]} />;

export const OsProcess: React.FC = () =>
  <Episode t={timeline} ch="Chapter 3" title="The life of a process" scenes={[
    [Alive, 0], [Life, B('life').start], [Pcb, B('pcb').start], [Fork, B('fork').start], [Ipc, B('ipc').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('alive', 0.3)} name="whoosh" volume={0.22} />
    {[at('new', 0.6), at('run', 0.25), at('intr', 0.25), at('io', 0.1), at('io', 0.45), at('trapA', 0.3), at('trapA', 0.75), at('exit', 0.25)].map((t, i) => <Sfx key={i} at={t} name="pop" volume={0.18} />)}
    <Sfx at={at('trapQ', 0.55) + 12} name="beep" volume={0.2} />
    <Sfx at={at('cs', 0.25)} name="whoosh" volume={0.2} />
    <Sfx at={at('cs', 0.6)} name="whoosh" volume={0.2} />
    <Sfx at={at('fork', 0.6)} name="pop" volume={0.25} />
    <Sfx at={at('exec', 0.45)} name="ping" volume={0.2} />
  </Episode>;
