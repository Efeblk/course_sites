// COE303 ch1: the OS as allocator and control program, polling vs interrupts (the five steps), trap, DMA, mode bit, timer.
import React from 'react';
import { HardDrive, Keyboard, MemoryStick, Monitor, Timer } from 'lucide-react';
import {
  C, Cam, Cell, Chip, Device, Episode, Exam, HL, Head, KZONE, MONO, Mark, PC, Proc, SANS, SERIF, Sfx, Tag, Bubble,
  lerp, p, pop, shake, tl, track, win,
} from './kit';
import timeline from '../timelines/os-manager.json';

const { B, at } = tl(timeline);
const COLS = [C.blue, C.amber, C.teal, PC.P4, C.red, C.green];

// ------------------------------------------------ scene 1: one CPU, a crowd, and the manager
const Crowd: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, who = B('who').start, al = B('alloc').start, ct = B('control').start, kr = B('kernel').start;
  const ring = p(f, at('who', 0.3), at('who', 0.6));
  const cam = [{ at: 0, x: 960, y: 540, z: 1 }, { at: kr, x: 960, y: 560, z: 1.3, d: 40 }];
  const slots = (i: number): [number, number] => {
    const ang = Math.PI * (0.1 + i * 0.16);
    return [960 + Math.cos(ang) * 420, 520 + Math.sin(ang) * 300 - 40];
  };
  return <g>
    <Head f={f} a={h} b={who}>one processor, everyone wants it</Head>
    <Head f={f} a={who} b={kr}>the operating system decides</Head>
    <Cam f={f} keys={cam}>
      {/* devices */}
      {[[Keyboard, 330, 250, 'keyboard'], [HardDrive, 330, 790, 'disk'], [Monitor, 1590, 250, 'screen'], [MemoryStick, 1590, 790, 'memory']].map(([I, x, y, l], i) =>
        <Device key={i} I={I as React.FC<any>} x={x as number} y={y as number} label={l as string} s={pop(f, h + 4 + i * 5, 14) * 0.9} o={1 - p(f, kr, kr + 20)} />)}
      {/* the OS band */}
      <g opacity={ring}>
        <circle cx={960} cy={520} r={250} fill="none" stroke={KZONE} strokeWidth={70} />
        <circle cx={960} cy={520} r={250} fill="none" stroke="#cbbd9f" strokeWidth={3} strokeDasharray="6 10" transform={`rotate(${f * 0.3} 960 520)`} />
        <text x={960} y={292} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.ink}>operating system</text>
      </g>
      {/* time slices dealt out by the allocator */}
      <g opacity={p(f, al, al + 10)}>
        {COLS.map((c, i) => {
          const t = p(f, al + 10 + i * 6, al + 24 + i * 6), a0 = (i / 6) * Math.PI * 2 - Math.PI / 2, a1 = a0 + (t * Math.PI * 2) / 6;
          return <path key={i} d={`M${960 + 205 * Math.cos(a0)},${520 + 205 * Math.sin(a0)} A205,205 0 0 1 ${960 + 205 * Math.cos(a1)},${520 + 205 * Math.sin(a1)}`} fill="none" stroke={c} strokeWidth={16} strokeLinecap="butt" />;
        })}
      </g>
      <Chip f={f} x={960} y={520} busy={p(f, al, al + 20)} />
      {/* kernel core */}
      <g opacity={p(f, kr + 10, kr + 24)}>
        <circle cx={960} cy={540} r={56 + 6 * Math.sin(f / 8)} fill={C.amber} opacity={0.35} />
        <circle cx={960} cy={540} r={44} fill={C.amber} />
        <text x={960} y={550} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={22} fill={C.ink}>kernel</text>
      </g>
      {/* the crowd */}
      {COLS.map((c, i) => {
        const start: [number, number] = [520 + i * 176, 1220];
        const crowd: [number, number] = [700 + i * 104, 930];
        const k = track(f, [
          { at: 0, x: start[0], y: start[1] }, { at: h + 8 + i * 5, x: crowd[0], y: crowd[1], d: 20 },
          { at: at('who', 0.55) + i * 4, x: slots(i)[0], y: slots(i)[1] + 110, d: 22 },
        ]);
        const grab = i === 4 && f > at('control', 0.15);
        const tryK = track(f, [{ at: 0, x: k.x, y: k.y }, { at: at('control', 0.15), x: 1340, y: 770, d: 14 }, { at: at('control', 0.15) + 20, x: k.x, y: k.y, d: 14 }]);
        const q = grab ? tryK : k;
        return <Proc key={i} f={f} x={q.x + (grab ? shake(f, at('control', 0.15) + 14, 16, 10) : 0)} y={q.y} sq={q.sq} c={c} s={0.7} seed={i}
          mood={f < who ? (i % 2 ? 'worried' : 'ok') : grab && f < at('control', 0.15) + 40 ? 'sad' : 'happy'} look={[(960 - q.x) / 400, (520 - q.y) / 300]} />;
      })}
      <Mark f={f} a={at('control', 0.15) + 14} x={1340} y={640} ok={false} out={kr} />
    </Cam>
    <g opacity={win(f, al + 6, ct)}><Tag x={960} y={1010} text="resource allocator: shares CPU, memory, devices" bg={C.ink} fg="#fff" s={30} /></g>
    <g opacity={win(f, ct + 6, kr)}><Tag x={960} y={1010} text="control program: stops errors and improper use" bg={C.red} fg="#fff" s={30} /></g>
    <g opacity={p(f, kr + 20, kr + 32)}><Tag x={960} y={1010} text="kernel: the one program always running" bg={C.amber} s={30} /></g>
  </g>;
};

// ------------------------------------------------ scene 2: polling, then the interrupt and its five steps
const Irq: React.FC<{ f: number }> = ({ f }) => {
  const kq = B('keyQ').start, po = B('poll').start, pb = B('pollBad').start, ir = B('irq').start, s1 = B('s1').start, tr = B('trap').start;
  const KX = 420, KY = 560, CX = 1350, CY = 520;
  const asks = Math.max(0, Math.floor((Math.min(f, ir) - po - 10) / 26) + 1);
  const ringAt = at('irq', 0.62);
  const work = f < ir ? 0.12 : 0.12 + p(f, ir + 10, ringAt) * 0.4 + p(f, at('s3', 0.6), at('s3', 0.95)) * 0.3;
  const cam = [{ at: 0, x: 960, y: 540, z: 1 }, { at: s1 - 6, x: 1500, y: 560, z: 1.0, d: 34 }, { at: tr - 4, x: 960, y: 540, z: 1, d: 30 }];
  const steps = ['finish the instruction', 'save PC + registers', 'look up interrupt vector', 'run the ISR', 'restore and resume'];
  const stepAt = [at('s1', 0.05), at('s1', 0.45), at('s2', 0.05), at('s2', 0.55), at('s3', 0.1)];
  const stepOn = stepAt.reduce((k, a, i) => (f >= a ? i : k), -1);
  return <g>
    <Head f={f} a={kq} b={po}>you press a key. how does the CPU know?</Head>
    <Head f={f} a={po} b={ir} c={C.red}>polling: asking again and again</Head>
    <Head f={f} a={ir} b={s1} c={C.green}>interrupt: the device taps the CPU</Head>
    <Head f={f} a={s1} b={tr}>what the CPU does on an interrupt</Head>
    <Head f={f} a={tr}>a trap: an interrupt caused by software</Head>
    <Cam f={f} keys={cam}>
      <g opacity={1 - p(f, tr - 4, tr + 10)}>
        <Device I={Keyboard} x={KX} y={KY} label="keyboard" ring={f > ringAt - 20 && f < ringAt + 10 ? p(f, ringAt - 20, ringAt + 10) : f > kq + 20 && f < kq + 50 ? p(f, kq + 20, kq + 50) : 0} />
        <Chip f={f} x={CX} y={CY} busy={f > ir ? 1 : 0.3} />
        {/* the program's progress */}
        <rect x={CX - 160} y={CY + 170} width={320} height={26} rx={13} fill="#ece4d3" />
        <rect x={CX - 160} y={CY + 170} width={320 * work} height={26} rx={13} fill={C.blue} />
        <text x={CX} y={CY + 236} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>program's real work</text>
        {/* polling */}
        {f >= po && f < ir && Array.from({ length: asks }, (_, i) => {
          const a = po + 10 + i * 26;
          return <g key={i}>
            <Bubble x={CX - 140} y={CY - 140} text="done yet?" dir={-1} s={30} o={win(f, a, a + 22, 4)} />
            <Bubble x={KX + 60} y={KY - 100} text="no" s={30} o={win(f, a + 10, a + 26, 4)} />
          </g>;
        })}
        <g opacity={win(f, po + 10, ir)}>
          <Tag x={(KX + CX) / 2} y={860} text={`questions asked: ${asks}`} bg={f > pb ? C.red : '#fff'} fg={f > pb ? '#fff' : C.ink} s={30} mono />
        </g>
        {/* the interrupt signal */}
        {f > ringAt - 18 && f < ringAt + 6 && (() => { const t = p(f, ringAt - 18, ringAt); return <circle cx={lerp(KX + 80, CX - 120, t)} cy={KY - 20 * Math.sin(t * Math.PI)} r={18} fill={C.amber} />; })()}
        <line x1={KX + 80} y1={KY} x2={CX - 120} y2={CY} stroke="#cfc5b1" strokeWidth={4} strokeDasharray="8 10" opacity={p(f, ir, ir + 10)} />
        <g opacity={win(f, ringAt, s1 + 4)}><Tag x={CX} y={CY - 190} text="interrupt!" bg={C.amber} s={34} /></g>
        {/* the five steps, beside the CPU */}
        <g opacity={p(f, s1, s1 + 14)}>
          {steps.map((s, i) => <g key={i} opacity={stepOn >= i ? 1 : 0.25} transform={`translate(1700,${280 + i * 110})`}>
            <circle cx={0} cy={-10} r={30} fill={stepOn === i ? C.amber : stepOn > i ? C.green : '#ddd3bf'} />
            <text x={0} y={0} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.ink}>{i + 1}</text>
            <text x={50} y={0} fontFamily={SANS} fontWeight={700} fontSize={34} fill={C.ink}>{s}</text>
          </g>)}
          {/* saved registers */}
          <g opacity={win(f, stepAt[1], stepAt[4] + 30)}>
            <rect x={CX - 150} y={CY - 360} width={300} height={110} rx={16} fill="#fbf9f4" stroke={C.blue} strokeWidth={4} />
            <text x={CX} y={CY - 316} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.blue}>saved</text>
            <text x={CX} y={CY - 276} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.ink}>PC · registers</text>
          </g>
          {/* vector table */}
          <g opacity={win(f, stepAt[2], stepAt[4])} transform={`translate(${CX - 170},${CY + 260})`}>
            {['timer', 'keyboard', 'disk'].map((r, i) => <g key={r}>
              <rect x={0} y={i * 56} width={340} height={50} rx={8} fill={r === 'keyboard' && f > stepAt[2] + 14 ? HL : '#fbf9f4'} stroke="#d9d1c1" strokeWidth={2} />
              <text x={20} y={i * 56 + 34} fontFamily={MONO} fontWeight={700} fontSize={24} fill={C.ink}>{`${r} → handler`}</text>
            </g>)}
          </g>
        </g>
      </g>
    </Cam>
    {/* trap */}
    <g opacity={p(f, tr, tr + 12)}>
      <Proc f={f} x={760} y={560} c={C.teal} label="prog" seed={2} mood={f > at('trap', 0.65) ? 'worried' : 'ok'} look={[1, 0]} />
      <Bubble x={820} y={400} text="x / 0" s={40} o={p(f, at('trap', 0.55), at('trap', 0.62))} />
      <Bubble x={820} y={400} text="request" s={40} o={win(f, at('trap', 0.3), at('trap', 0.52))} />
      <g opacity={p(f, at('trap', 0.66), at('trap', 0.75))}>
        <path d="M900,600 C1050,620 1150,700 1210,780" fill="none" stroke={C.red} strokeWidth={6} />
        <rect x={1150} y={790} width={360} height={110} rx={20} fill={KZONE} stroke={C.ink} strokeWidth={3} />
        <text x={1330} y={858} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>kernel handles it</text>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: DMA
const Dma: React.FC<{ f: number }> = ({ f }) => {
  const a = B('dmaQ').start, d = B('dma').start, d2 = B('dma2').start;
  const DX = 300, MX = 1620, Y = 560, CX = 960, CY = 300;
  const n = 14, per = 9;
  const ints = f < d ? Math.min(512, Math.floor(Math.max(0, f - a - 20) / per) * 37) : f < at('dma2', 0.4) ? 0 : 1;
  const block = p(f, at('dma', 0.45), at('dma', 0.9));
  return <g>
    <Head f={f} a={a} b={d} c={C.red}>one interrupt per word buries the CPU</Head>
    <Head f={f} a={d} c={C.green}>DMA: the controller copies a whole block</Head>
    <Device I={HardDrive} x={DX} y={Y} label="disk" s={p(f, a, a + 10)} />
    <Device I={MemoryStick} x={MX} y={Y} label="memory" s={p(f, a + 4, a + 14)} />
    <Chip f={f} x={CX} y={CY} s={0.8} busy={1} heat={f < d ? p(f, a + 20, d) : 1 - p(f, d, d + 30)} />
    {/* words, one by one, through the CPU */}
    {f < d + 10 && Array.from({ length: n }, (_, i) => {
      const s = a + 20 + i * per, t = p(f, s, s + 30);
      if (t <= 0 || t >= 1) return null;
      const x = t < 0.5 ? lerp(DX + 80, CX, t * 2) : lerp(CX, MX - 80, (t - 0.5) * 2), y = t < 0.5 ? lerp(Y - 40, CY + 60, t * 2) : lerp(CY + 60, Y - 40, (t - 0.5) * 2);
      return <rect key={i} x={x - 14} y={y - 14} width={28} height={28} rx={5} fill={C.blue} />;
    })}
    <g opacity={f < d ? 1 : p(f, at('dma2', 0.35), at('dma2', 0.45))}>
      <Tag x={CX} y={480} text={`interrupts: ${ints}`} bg={f < d ? C.red : C.green} fg="#fff" s={32} mono />
    </g>
    {/* DMA controller and the block */}
    <g opacity={p(f, d + 6, d + 18)}>
      <rect x={CX - 170} y={780} width={340} height={110} rx={20} fill="#fbf9f4" stroke={C.ink} strokeWidth={4} />
      <text x={CX} y={848} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>DMA controller</text>
      <path d={`M${DX + 20},${Y + 76} C${DX + 60},${840} ${CX - 300},${840} ${CX - 170},${835}`} fill="none" stroke="#cfc5b1" strokeWidth={6} />
      <path d={`M${CX + 170},${835} C${CX + 300},${840} ${MX - 60},${840} ${MX - 20},${Y + 76}`} fill="none" stroke="#cfc5b1" strokeWidth={6} />
      {block > 0 && block < 1 && (() => {
        const t = block, x = lerp(DX + 40, MX - 40, t), y = 830 + 0 * t;
        return <g transform={`translate(${x},${y - 60})`}>{Array.from({ length: 16 }, (_, i) => <rect key={i} x={-56 + (i % 4) * 28} y={-56 + Math.floor(i / 4) * 28} width={24} height={24} rx={4} fill={C.blue} />)}</g>;
      })()}
      <g opacity={p(f, at('dma', 0.9), at('dma', 1))}>
        <g transform={`translate(${MX},${Y + 20})`}>{Array.from({ length: 16 }, (_, i) => <rect key={i} x={-40 + (i % 4) * 20} y={-200 + Math.floor(i / 4) * 20} width={17} height={17} rx={3} fill={C.blue} />)}</g>
      </g>
    </g>
    <g opacity={p(f, at('dma2', 0.3), at('dma2', 0.4))}>
      <circle cx={CX} cy={CY} r={130 + 40 * p(f, at('dma2', 0.3), at('dma2', 0.5))} fill="none" stroke={C.amber} strokeWidth={6} opacity={1 - p(f, at('dma2', 0.3), at('dma2', 0.5))} />
      <Tag x={CX} y={980} text="one interrupt per block, not per word" bg={C.ink} fg="#fff" s={32} />
    </g>
  </g>;
};

// ------------------------------------------------ scene 4: the mode bit and the controlled door
const Mode: React.FC<{ f: number }> = ({ f }) => {
  const a = B('modeQ').start, m = B('mode').start, pr = B('priv').start, dr = B('door').start;
  const BY = 560;
  const tryAt = at('priv', 0.45), goIn = at('door', 0.3), back = at('door', 0.8);
  const bit = f > goIn + 12 && f < back + 12 ? '0' : '1';
  const k = track(f, [
    { at: 0, x: 760, y: 420 }, { at: tryAt, x: 1000, y: 520, d: 14, h: 40 }, { at: tryAt + 20, x: 760, y: 420, d: 14 },
    { at: goIn - 20, x: 1300, y: 420, d: 18 }, { at: goIn, x: 1300, y: 860, d: 22, h: 60 }, { at: back, x: 1300, y: 420, d: 22, h: 60 },
  ]);
  return <g>
    <Head f={f} a={a} b={m}>what stops a program taking over?</Head>
    <Head f={f} a={m}>one bit in the hardware</Head>
    {/* zones */}
    <rect x={0} y={BY} width={1920} height={1080 - BY} fill={KZONE} opacity={p(f, a + 4, a + 16)} />
    <g opacity={p(f, a + 4, a + 16)}>
      <text x={80} y={BY - 30} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.blue}>user mode</text>
      <text x={80} y={BY + 60} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.red}>kernel mode</text>
      <line x1={0} x2={1920} y1={BY} y2={BY} stroke={C.ink} strokeWidth={6} />
      {/* the door */}
      <rect x={1230} y={BY - 10} width={140} height={20} fill={f > goIn - 6 && f < goIn + 20 || f > back - 6 && f < back + 20 ? KZONE : C.ink} />
      <Device I={HardDrive} x={980} y={850} s={0.8} />
      <Device I={Monitor} x={640} y={850} s={0.8} />
    </g>
    <Cell x={1650} y={340} name="mode bit" v={bit} w={180} vc={bit === '0' ? C.red : C.blue} flash={(f > goIn + 12 && f < goIn + 26) || (f > back + 12 && f < back + 26) ? 1 : 0} />
    <g opacity={p(f, at('mode', 0.5), at('mode', 0.6))}>
      <text x={1650} y={460} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.ink}>1 = user · 0 = kernel</text>
    </g>
    <Proc f={f} x={k.x + shake(f, tryAt + 12, 16, 10)} y={k.y} sq={k.sq} c={C.teal} label="prog" seed={2} mood={f > tryAt + 10 && f < goIn - 20 ? 'sad' : 'ok'} look={[0.4, 1]} />
    <g opacity={win(f, at('priv', 0.2), tryAt + 10)}><Bubble x={820} y={250} text="talk to the disk" s={30} /></g>
    <Mark f={f} a={tryAt + 12} x={1000} y={BY - 70} ok={false} out={dr} />
    <g opacity={win(f, tryAt + 14, dr)}><Tag x={760} y={170} text="privileged: kernel mode only" bg={C.red} fg="#fff" s={30} /></g>
    <g opacity={p(f, dr + 4, dr + 16)}><Tag x={1300} y={BY + 200} text="system call · trap · interrupt" bg={C.ink} fg="#fff" s={30} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: the timer
const TimerS: React.FC<{ f: number }> = ({ f }) => {
  const a = B('loop').start, t = B('timer').start;
  const set = at('timer', 0.2), fire = at('timer', 0.62);
  const left = f < set ? 5 : Math.max(0, 5 - Math.floor(p(f, set + 8, fire) * 5.0001));
  const off = track(f, [{ at: 0, x: 960, y: 640 }, { at: fire + 6, x: 600, y: 640, d: 20, h: 140 }]);
  return <g>
    <Head f={f} a={a} b={t}>a program that loops forever?</Head>
    <Head f={f} a={t}>the timer always gives control back</Head>
    <Chip f={f} x={960} y={574} busy={1} heat={f < fire ? p(f, a, fire) * 0.6 : 0} />
    <Proc f={f} x={off.x} y={off.y} sq={off.sq} c={C.red} label="loop" seed={4} mood={f > fire ? 'worried' : 'focus'} look={[0, 1]} />
    <g opacity={win(f, a + 6, fire + 4)} transform={`translate(960,${300}) rotate(${(f * 9) % 360})`}>
      <path d="M-60,0 a60,60 0 1 1 60,60" fill="none" stroke={C.red} strokeWidth={6} />
      <path d="M0,60 l-16,-8 M0,60 l-8,14" stroke={C.red} strokeWidth={6} strokeLinecap="round" />
    </g>
    <g opacity={win(f, a + 6, fire)}><Tag x={960} y={190} text="while (1) ;" bg="#fff" s={30} mono /></g>
    <g opacity={p(f, set - 10, set)}>
      <Device I={Timer} x={1460} y={560} label="hardware timer" ring={f > fire && f < fire + 20 ? p(f, fire, fire + 20) : 0} c={f > fire ? C.red : C.ink} />
      <text x={1460} y={410} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={64} fill={left === 0 ? C.red : C.ink}>{left}</text>
    </g>
    <g opacity={p(f, fire + 10, fire + 20)}><Tag x={960} y={880} text="interrupt: the OS is back in control" bg={C.green} fg="#fff" s={32} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['OS', 'allocates resources, controls their use'],
  ['interrupt', 'replaces polling'],
  ['DMA', 'one interrupt per block'],
  ['mode bit', '1 = user, 0 = kernel'],
  ['timer', 'always gives control back'],
]} />;

export const OsManager: React.FC = () =>
  <Episode t={timeline} ch="Chapter 1" title="The manager and the doorbell" scenes={[
    [Crowd, 0], [Irq, B('keyQ').start], [Dma, B('dmaQ').start], [Mode, B('modeQ').start], [TimerS, B('loop').start], [Ex, B('ex0').start],
  ]}>
    {Array.from({ length: 6 }, (_, i) => <Sfx key={`b${i}`} at={B('poll').start + 10 + i * 26} name="beep" volume={0.08} />)}
    <Sfx at={at('irq', 0.62)} name="ping" volume={0.25} />
    <Sfx at={at('control', 0.15) + 14} name="beep" volume={0.18} />
    <Sfx at={at('priv', 0.45) + 12} name="beep" volume={0.18} />
    <Sfx at={at('door', 0.3)} name="whoosh" volume={0.22} />
    <Sfx at={at('dma2', 0.3)} name="ping" volume={0.22} />
    <Sfx at={at('timer', 0.62)} name="ping" volume={0.25} />
  </Episode>;
