// COE303 ch2: the journey of a system call (printf -> write -> trap -> table -> kernel -> back), parameter passing,
// the six families, mechanism vs policy, monolithic / microkernel / modular kernels.
import React from 'react';
import { Cpu, FileText, Info, MessagesSquare, Monitor, Shield, Usb } from 'lucide-react';
import {
  C, Cell, Code, Device, Episode, Exam, HL, Head, KZONE, MONO, Mark, Proc, SANS, SERIF, Sfx, Tag, Bubble, Card,
  along, lerp, mixC, p, pop, shake, tl, track, win,
} from './kit';
import type { Pt } from '../swe/kit';
import timeline from '../timelines/os-syscall.json';

const { B, at } = tl(timeline);
const BY = 560;

// ------------------------------------------------ scene 1: the journey of one system call
const Journey: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, ask = B('ask').start, api = B('api').start, tr = B('trap').start, f1 = B('flip1').start,
    tb = B('table').start, wk = B('work').start, f2 = B('flip2').start;
  const bump = at('hook', 0.6);
  const me = track(f, [{ at: 0, x: 260, y: 470 }, { at: bump, x: 900, y: 500, d: 16, h: 40 }, { at: bump + 20, x: 260, y: 470, d: 16 }]);
  const bit = f > at('flip1', 0.2) && f < at('flip2', 0.3) ? '0' : '1';
  // token path: program -> libc -> gate -> table row -> kernel write -> screen ; then back up
  const path: Pt[] = [[420, 470], [765, 470], [1000, 470], [1000, 620], [1080, 760], [1420, 760]];
  const tokT = f < api ? -1 : f < tr ? p(f, at('api', 0.55), at('api', 0.9)) * 0.2 : f < tb ? 0.2 + p(f, at('trap', 0.4), at('flip1', 0.4)) * 0.3
    : f < wk ? 0.5 + p(f, tb, at('table', 0.7)) * 0.3 : 0.8 + p(f, wk, at('work', 0.5)) * 0.2;
  const back = p(f, at('flip2', 0.0), at('flip2', 0.6));
  const tok = back > 0 ? along([[1420, 760], [1000, 620], [1000, 470], [420, 470]], back) : tokT >= 0 ? along(path, tokT) : null;
  const hello = f > at('work', 0.5);
  const rows = ['open', 'read', 'write', 'close', 'fork'];
  return <g>
    <Head f={f} a={h} b={ask}>a program wants to print "hello"</Head>
    <Head f={f} a={ask} b={api}>it has to ask: a system call</Head>
    <Head f={f} a={api}>the journey of one system call</Head>
    {/* zones */}
    <rect x={0} y={BY} width={1920} height={1080 - BY} fill={KZONE} />
    <line x1={0} x2={1920} y1={BY} y2={BY} stroke={C.ink} strokeWidth={6} />
    <rect x={940} y={BY - 10} width={120} height={20} fill={f > ask ? mixC(C.ink, C.amber, win(f, ask, api)) : C.ink} />
    <text x={60} y={BY - 26} fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.blue}>user mode</text>
    <text x={60} y={BY + 54} fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.red}>kernel mode</text>
    <Cell x={1720} y={300} name="mode bit" v={bit} w={170} vc={bit === '0' ? C.red : C.blue} flash={(f > at('flip1', 0.2) && f < at('flip1', 0.2) + 14) || (f > at('flip2', 0.3) && f < at('flip2', 0.3) + 14) ? 1 : 0} />
    {/* program */}
    <Proc f={f} x={me.x + shake(f, bump + 12, 16, 8)} y={me.y} sq={me.sq} c={C.teal} label="prog" seed={2} mood={f > bump + 10 && f < ask ? 'sad' : hello && f > f2 ? 'happy' : 'ok'} look={[1, 0.3]} />
    <Bubble x={300} y={300} text="print hello" s={30} o={win(f, h + 10, bump)} />
    <Mark f={f} a={bump + 12} x={900} y={400} ok={false} out={ask} />
    <g opacity={p(f, ask + 10, ask + 22)}><Tag x={1000} y={BY + 50} text="the door into the kernel" bg={C.amber} s={28} o={win(f, ask + 10, api + 10)} /></g>
    <Code x={80} y={170} w={340} s={30} lines={['printf("hello");']} o={p(f, api, api + 12)} hl={f > api && f < tr ? 0 : -1} />
    <g opacity={p(f, at('api', 0.3), at('api', 0.4))}>
      <Card x={600} y={190} w={330} h={230} />
      <text x={765} y={240} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.muted}>C library (API)</text>
      <text x={765} y={310} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>write()</text>
      <g opacity={p(f, tr, tr + 12)}><text x={765} y={380} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.red}>number → register, trap</text></g>
    </g>
    {/* system-call table */}
    <g opacity={p(f, tb - 10, tb + 6)}>
      <text x={1000} y={640} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={26} fill={C.muted}>system-call table</text>
      {rows.map((r, i) => <g key={r}>
        <rect x={880} y={660 + i * 62} width={240} height={54} rx={8} fill={r === 'write' && f > at('table', 0.5) ? HL : '#fbf9f4'} stroke="#cbbd9f" strokeWidth={2} />
        <text x={900} y={698 + i * 62} fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.muted}>{i}</text>
        <text x={950} y={698 + i * 62} fontFamily={MONO} fontWeight={700} fontSize={28} fill={C.ink}>{r}</text>
      </g>)}
    </g>
    <g opacity={p(f, wk - 6, wk + 8)}>
      <Card x={1300} y={690} w={250} h={140} fill="#fbf9f4" />
      <text x={1425} y={770} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.ink}>kernel: write</text>
    </g>
    <Device I={Monitor} x={1720} y={800} label="screen" s={0.9} c={hello ? C.blue : C.ink} />
    <g opacity={p(f, at('work', 0.5), at('work', 0.6))}><text x={1720} y={720} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.blue}>hello</text></g>
    {tok && <g transform={`translate(${tok[0]},${tok[1]})`}>
      <rect x={-70} y={-26} width={140} height={52} rx={26} fill={back > 0 ? C.green : C.amber} />
      <text x={0} y={10} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={26} fill={C.ink}>{back > 0 ? 'result' : 'write #'}</text>
    </g>}
    <g opacity={win(f, at('flip1', 0.2), tb)}><Tag x={1720} y={440} text="1 → 0" bg={C.red} fg="#fff" s={30} mono /></g>
    <g opacity={win(f, at('flip2', 0.3), at('flip2', 1.4))}><Tag x={1720} y={440} text="0 → 1" bg={C.blue} fg="#fff" s={30} mono /></g>
  </g>;
};

// ------------------------------------------------ scene 2: three ways to pass parameters
const Params: React.FC<{ f: number }> = ({ f }) => {
  const a = B('params').start, k = [at('params', 0.2), at('params', 0.45), at('params', 0.8)];
  const X = [380, 960, 1540];
  return <g>
    <Head f={f} a={a}>three ways to pass the parameters</Head>
    {/* registers */}
    <g opacity={p(f, k[0], k[0] + 12)}>
      <text x={X[0]} y={300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue}>in registers</text>
      {['fd', 'buf', 'n'].map((r, i) => <Cell key={r} x={X[0]} y={420 + i * 150} name={`reg ${i + 1}`} v={r} w={220} s={pop(f, k[0] + i * 5, 12)} />)}
    </g>
    {/* block in memory */}
    <g opacity={p(f, k[1], k[1] + 12)}>
      <text x={X[1]} y={300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue}>block in memory</text>
      <Cell x={X[1]} y={430} name="register" v="addr" w={220} />
      <path d={`M${X[1]},${480} V${600}`} stroke={C.ink} strokeWidth={5} />
      <path d={`M${X[1] - 14},${586} L${X[1]},${606} L${X[1] + 14},${586}`} fill="none" stroke={C.ink} strokeWidth={5} />
      <rect x={X[1] - 130} y={620} width={260} height={210} rx={14} fill="#fbf9f4" stroke={C.ink} strokeWidth={4} />
      {['fd', 'buf', 'n'].map((r, i) => <text key={r} x={X[1]} y={680 + i * 60} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.ink}>{r}</text>)}
    </g>
    {/* stack */}
    <g opacity={p(f, k[2], k[2] + 12)}>
      <text x={X[2]} y={300} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue}>pushed on the stack</text>
      {['n', 'buf', 'fd'].map((r, i) => {
        const y = track(f, [{ at: 0, x: X[2], y: 360 }, { at: k[2] + i * 7, x: X[2], y: 780 - i * 84, d: 14 }]).y;
        return <g key={r} opacity={p(f, k[2] + i * 7, k[2] + i * 7 + 4)}>
          <rect x={X[2] - 120} y={y - 36} width={240} height={72} rx={12} fill={mixC('#e7c98f', '#d9b778', i % 2)} stroke="#b39159" strokeWidth={3} />
          <text x={X[2]} y={y + 12} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.ink}>{r}</text>
        </g>;
      })}
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: six families
const FAM: [React.FC<any>, string, string, string][] = [
  [Cpu, 'process control', 'fork, exit', C.blue], [FileText, 'file management', 'open, read', C.teal], [Usb, 'device management', 'ioctl', C.amber],
  [Info, 'information maintenance', 'get_time', '#7a3f98'], [MessagesSquare, 'communications', 'pipe', C.green], [Shield, 'protection', 'chmod', C.red],
];
const Six: React.FC<{ f: number }> = ({ f }) => {
  const a = B('six').start;
  const when = [at('six1', 0.02), at('six1', 0.36), at('six1', 0.72), at('six2', 0.02), at('six2', 0.42), at('six2', 0.72)];
  return <g>
    <Head f={f} a={a}>six families of system calls</Head>
    {FAM.map(([I, t, ex, c], i) => {
      const x = 340 + (i % 3) * 620, y = 330 + Math.floor(i / 3) * 360;
      const k = pop(f, when[i], 16);
      if (f < when[i]) return null;
      return <g key={t} transform={`translate(${x},${y}) scale(${k})`}>
        <rect x={-270} y={-120} width={540} height={260} rx={24} fill="#fbf9f4" stroke={c} strokeWidth={4} />
        <circle cx={-190} cy={-40} r={46} fill={c} />
        <I x={-216} y={-66} size={52} color="#fff" strokeWidth={1.8} />
        <text x={-120} y={-28} fontFamily={SANS} fontWeight={800} fontSize={t.length > 16 ? 30 : 34} fill={C.ink}>{t}</text>
        <text x={0} y={80} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={40} fill={c}>{ex}</text>
      </g>;
    })}
  </g>;
};

// ------------------------------------------------ scene 4: mechanism vs policy
const MechPol: React.FC<{ f: number }> = ({ f }) => {
  const a = B('mp').start, m2 = B('mp2').start, m3 = B('mp3').start;
  const knob = f < m3 ? -50 : -50 + 100 * p(f, at('mp3', 0.2), at('mp3', 0.45)) - 70 * p(f, at('mp3', 0.6), at('mp3', 0.8));
  const gear = (cx: number, cy: number, r: number, rot: number, c: string) => <g transform={`translate(${cx},${cy}) rotate(${rot})`}>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-10} y={-r - 16} width={20} height={26} rx={4} fill={c} transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={c} /><circle r={r * 0.35} fill="#fbf9f4" />
  </g>;
  return <g>
    <Head f={f} a={a}>mechanism = how · policy = what</Head>
    <g opacity={p(f, a + 8, a + 20)}>
      <Card x={300} y={260} w={560} h={520} />
      {gear(500, 480, 70, f * 2, C.blue)}
      {gear(650, 590, 50, -f * 2.8 + 18, C.teal)}
      <text x={580} y={720} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={40} fill={C.blue}>mechanism: how</text>
      <g opacity={p(f, m2, m2 + 12)}><text x={580} y={330} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.ink}>the timer</text></g>
    </g>
    <g opacity={p(f, at('mp', 0.5), at('mp', 0.6))}>
      <Card x={1060} y={260} w={560} h={520} />
      <circle cx={1340} cy={500} r={140} fill="#fbf9f4" stroke={C.ink} strokeWidth={5} />
      {[-60, -30, 0, 30, 60].map(d => <line key={d} x1={1340 + 120 * Math.sin((d * Math.PI) / 180)} y1={500 - 120 * Math.cos((d * Math.PI) / 180)} x2={1340 + 140 * Math.sin((d * Math.PI) / 180)} y2={500 - 140 * Math.cos((d * Math.PI) / 180)} stroke={C.ink} strokeWidth={4} />)}
      <g transform={`rotate(${knob} 1340 500)`}><line x1={1340} y1={500} x2={1340} y2={390} stroke={C.red} strokeWidth={10} strokeLinecap="round" /><circle cx={1340} cy={500} r={22} fill={C.red} /></g>
      <text x={1230} y={340} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>short</text>
      <text x={1450} y={340} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>long</text>
      <text x={1340} y={720} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={40} fill={C.red}>policy: what</text>
      <g opacity={p(f, at('mp2', 0.4), at('mp2', 0.5))}><text x={1340} y={680} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.ink}>how long, for each user</text></g>
    </g>
    <g opacity={p(f, at('mp3', 0.5), at('mp3', 0.6))}><Tag x={960} y={900} text="change the policy, keep the mechanism" bg={C.green} fg="#fff" s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: kernel structures
const PARTS = ['file system', 'drivers', 'scheduler', 'memory'];
const Kernels: React.FC<{ f: number }> = ({ f }) => {
  const a = B('kern').start, mo = B('mono').start, mi = B('micro').start, m2 = B('micro2').start, md = B('mod').start;
  const toMicro = p(f, mi + 6, mi + 40), toMod = p(f, md + 6, md + 40);
  const monoXY = (i: number): [number, number] => [640 + (i % 2) * 300, 700 + Math.floor(i / 2) * 120];
  const microXY = (i: number): [number, number] => (i < 2 ? [460 + i * 330, 330] : [1240 + (i - 2) * 330, 330]);
  const modXY = (i: number): [number, number] => [[660, 680], [1260, 680], [660, 900], [1260, 900]][i] as [number, number];
  const bug1 = at('mono', 0.6), bug2 = at('micro2', 0.05);
  const monoRed = p(f, bug1, bug1 + 12) * (1 - toMicro);
  const pos = (i: number): [number, number] => {
    const m = monoXY(i), u = microXY(i), d = modXY(i);
    const s = f < md ? [lerp(m[0], u[0], toMicro), lerp(m[1], u[1], toMicro)] : [lerp(u[0], d[0], toMod), lerp(u[1], d[1], toMod)];
    return s as [number, number];
  };
  return <g>
    <Head f={f} a={a} b={mo}>how do you build the kernel?</Head>
    <Head f={f} a={mo} b={mi}>monolithic: one big block</Head>
    <Head f={f} a={mi} b={md}>microkernel: the minimum inside</Head>
    <Head f={f} a={md}>modular: a core plus loadable modules</Head>
    <rect x={0} y={BY} width={1920} height={1080 - BY} fill={KZONE} />
    <line x1={0} x2={1920} y1={BY} y2={BY} stroke={C.ink} strokeWidth={6} />
    <text x={60} y={BY - 26} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.blue}>user space</text>
    <text x={60} y={BY + 50} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.red}>kernel</text>
    {/* the monolithic block */}
    <g opacity={p(f, mo, mo + 12) * (1 - toMicro)} transform={`translate(${shake(f, bug1 + 6, 24, 12)},0)`}>
      <rect x={440} y={620} width={700} height={300} rx={24} fill={mixC('#fbf9f4', '#f3c7bc', monoRed)} stroke={mixC(C.ink, C.red, monoRed)} strokeWidth={6} />
      <g opacity={monoRed}><Tag x={1420} y={760} text="one bug: all down" bg={C.red} fg="#fff" s={30} /></g>
    </g>
    <g opacity={p(f, mo, mo + 12) * (1 - toMicro)}><Tag x={1420} y={680} text="fast" bg={C.green} fg="#fff" s={30} /></g>
    {/* microkernel core */}
    <g opacity={toMicro * (1 - toMod * 0.0)}>
      <circle cx={960} cy={790} r={110} fill={C.amber} />
      <text x={960} y={784} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.ink}>{f < md ? 'micro-' : 'core'}</text>
      <text x={960} y={818} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill={C.ink}>{f < md ? 'kernel' : 'kernel'}</text>
    </g>
    {/* messages between user-space servers, through the core */}
    {f > mi + 40 && f < md && [0, 1, 2].map(k => {
      const t = ((f - mi - 40 + k * 22) % 66) / 66;
      const from = microXY(k % 4), to = microXY((k + 1) % 4);
      const pt = t < 0.5 ? [lerp(from[0], 960, t * 2), lerp(from[1] + 60, 690, t * 2)] : [lerp(960, to[0], (t - 0.5) * 2), lerp(690, to[1] + 60, (t - 0.5) * 2)];
      return <rect key={k} x={pt[0] - 16} y={pt[1] - 11} width={32} height={22} rx={4} fill="#fff" stroke={C.ink} strokeWidth={3} />;
    })}
    <g opacity={win(f, at('micro', 0.6), md)}><Tag x={1500} y={620} text="message passing" bg="#fff" s={28} /></g>
    {PARTS.map((t, i) => {
      const [x, y] = pos(i);
      const dead = i === 1 && f > bug2 && f < md;
      const plug = f >= md ? p(f, md + 40 + i * 8, md + 52 + i * 8) : 1;
      return <g key={t} opacity={p(f, mo + 6 + i * 4, mo + 16 + i * 4)} transform={`translate(${x + shake(f, bug2 + 6, 20, 8) * (i === 1 ? 1 : 0)},${y})`}>
        <rect x={-130} y={-46} width={260} height={92} rx={18} fill={dead ? '#f3c7bc' : '#fff'} stroke={dead ? C.red : f >= md ? C.blue : C.ink} strokeWidth={4} strokeDasharray={f >= md && plug < 1 ? '10 8' : undefined} />
        <text x={0} y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.ink}>{t}</text>
      </g>;
    })}
    <g opacity={win(f, bug2 + 10, md)}>
      <Tag x={790} y={190} text="a crash stays small: reliable, secure" bg={C.green} fg="#fff" s={30} />
      <Tag x={1380} y={480} text="each message costs time" bg={C.red} fg="#fff" s={28} />
    </g>
    <g opacity={p(f, at('mod', 0.55), at('mod', 0.65))}><Tag x={960} y={460} text="Linux: modules loaded when needed" bg={C.blue} fg="#fff" s={32} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['system call', 'controlled entry into the kernel'],
  ['API', 'programs call it through a library'],
  ['mode bit', 'flips twice: 1 → 0 → 1'],
  ['mechanism', 'how; policy: what'],
  ['monolithic', 'fast; microkernel: safe'],
]} />;

export const OsSyscall: React.FC = () =>
  <Episode t={timeline} ch="Chapter 2" title="Knocking on the kernel's door" scenes={[
    [Journey, 0], [Params, B('params').start], [Six, B('six').start], [MechPol, B('mp').start], [Kernels, B('kern').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('hook', 0.6) + 12} name="beep" volume={0.18} />
    <Sfx at={at('flip1', 0.2)} name="tick" volume={0.35} />
    <Sfx at={at('table', 0.5)} name="pop" volume={0.2} />
    <Sfx at={at('work', 0.5)} name="ping" volume={0.2} />
    <Sfx at={at('flip2', 0.3)} name="tick" volume={0.35} />
    {[at('six1', 0.02), at('six1', 0.36), at('six1', 0.72), at('six2', 0.02), at('six2', 0.42), at('six2', 0.72)].map((t, i) => <Sfx key={i} at={t} name="pop" volume={0.18} />)}
    <Sfx at={at('mono', 0.6)} name="beep" volume={0.2} />
    <Sfx at={at('micro2', 0.05)} name="beep" volume={0.14} />
  </Episode>;
