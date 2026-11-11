// COE303 ch4: threads share code/data/heap/files but own PC/registers/stack; benefits; pthread_create/join;
// concurrency vs parallelism; Amdahl with S = 0.25; the three models; the lost update teaser.
import React from 'react';
import { Keyboard, Monitor, SpellCheck } from 'lucide-react';
import {
  C, Cell, Chip, Code, Episode, Exam, Fly, HL, Head, KZONE, MONO, Mark, PC, Proc, SANS, SERIF, Sfx, Tag,
  lerp, p, pop, tl, track, win,
} from './kit';
import timeline from '../timelines/os-threads.json';

const { B, at } = tl(timeline);
const TH = [{ c: C.blue, l: 'show', I: Monitor }, { c: C.amber, l: 'keys', I: Keyboard }, { c: C.teal, l: 'spell', I: SpellCheck }];

// ------------------------------------------------ scene 1: one process, three threads
const House: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, one = B('one').start, df = B('def').start, sh = B('share').start, ow = B('own').start, wy = B('why').start, pt = B('pth').start;
  const box = p(f, one, one + 16);
  const out = p(f, pt - 4, pt + 12);
  const bens = ['responsive', 'resource sharing', 'economy', 'scalability'];
  return <g>
    <Head f={f} a={h} b={one}>a word processor does three things at once</Head>
    <Head f={f} a={one} b={sh}>one process, three threads</Head>
    <Head f={f} a={sh} b={ow}>shared by every thread</Head>
    <Head f={f} a={ow} b={wy}>private to each thread</Head>
    <Head f={f} a={wy} b={pt}>why threads</Head>
    <Head f={f} a={pt}>Pthreads: create, then join</Head>
    <g opacity={1 - out}>
      {/* the process box */}
      <g opacity={box}>
        <rect x={300} y={180} width={1320} height={780} rx={30} fill="#f7f1e4" stroke={C.ink} strokeWidth={5} />
        <text x={340} y={230} fontFamily={MONO} fontWeight={700} fontSize={26} fill={C.muted}>process</text>
        {['code', 'data', 'heap', 'open files'].map((t, i) => {
          const lit = f > sh + i * 8;
          return <g key={t} transform={`translate(${430 + i * 290},${290})`}>
            <rect x={-120} y={-40} width={240} height={80} rx={14} fill={lit ? HL : '#fbf9f4'} stroke={C.ink} strokeWidth={3} />
            <text y={12} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.ink}>{t}</text>
          </g>;
        })}
      </g>
      {TH.map((t, i) => {
        const x0 = 560 + i * 400;
        const k = track(f, [{ at: 0, x: 600 + i * 360, y: 1250 }, { at: h + 10 + i * 6, x: x0, y: 720, d: 22 }]);
        return <g key={t.l}>
          {/* path of execution */}
          <g opacity={p(f, df, df + 12) * (1 - p(f, sh, sh + 10))}>
            <path d={`M${x0},${700} C${x0 - 80},${560} ${x0 + 80},${480} ${x0},${370}`} fill="none" stroke={t.c} strokeWidth={5} strokeDasharray="10 10" strokeDashoffset={-f} />
          </g>
          {/* lines to the shared parts */}
          <g opacity={win(f, sh + 10, ow)}>
            {[0, 1, 2, 3].map(j => <line key={j} x1={x0} y1={600} x2={430 + j * 290} y2={332} stroke={t.c} strokeWidth={3} opacity={0.5} />)}
          </g>
          <Proc f={f} x={k.x} y={k.y} sq={k.sq} c={t.c} label={t.l} s={0.9} seed={i} mood="happy" look={[0, -1]} />
          <g transform={`translate(${x0 + 90},${560}) scale(${pop(f, h + 20 + i * 8, 14)})`} opacity={1 - p(f, ow - 4, ow + 6)}>
            <circle r={40} fill="#fff" stroke={t.c} strokeWidth={4} /><t.I x={-22} y={-22} size={44} color={t.c} strokeWidth={2} />
          </g>
          {/* private: PC, registers, stack */}
          <g opacity={p(f, ow + i * 6, ow + i * 6 + 12)} transform={`translate(${x0},${830})`}>
            <rect x={-150} y={-36} width={300} height={100} rx={14} fill="#fff" stroke={t.c} strokeWidth={4} />
            <text y={0} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={26} fill={t.c}>PC · registers</text>
            <text y={40} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={26} fill={t.c}>stack</text>
          </g>
        </g>;
      })}
      {bens.map((b, i) => <g key={b} opacity={p(f, at('why', 0.1 + i * 0.18), at('why', 0.16 + i * 0.18))}>
        <Tag x={480 + i * 320} y={450} text={b} bg={C.green} fg="#fff" s={28} />
      </g>)}
    </g>
    {/* pthreads */}
    <g opacity={out}>
      <Code x={200} y={220} w={960} s={30} hl={f < at('pth', 0.45) ? 0 : 1}
        lines={['pthread_create(&tid, &attr, runner, argv[1]);', 'pthread_join(tid, NULL);']} />
      {(() => {
        const born = at('pth', 0.22), fin = at('pth', 0.85), joinAt = at('pth', 0.5);
        const th = track(f, [{ at: 0, x: 600, y: 760 }, { at: born, x: 1060, y: 760, d: 20 }]);
        const prog = p(f, born + 10, fin);
        return <g>
          <Proc f={f} x={600} y={760} c={C.blue} label="main" seed={0} mood={f > joinAt && f < fin ? 'sleep' : 'ok'} look={[1, 0]} />
          {f > born - 2 && <Proc f={f} x={th.x} y={th.y} sq={th.sq} c={C.amber} label="runner" seed={1} mood={f > fin ? 'happy' : 'focus'} look={[1, 0]} />}
          <g opacity={p(f, born + 10, born + 20)}>
            <rect x={1160} y={690} width={460} height={34} rx={17} fill="#ece4d3" /><rect x={1160} y={690} width={460 * prog} height={34} rx={17} fill={C.amber} />
            <text x={1390} y={780} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.muted}>runner's work</text>
          </g>
          <g opacity={win(f, joinAt, fin + 8)}><Tag x={600} y={560} text="join: waits" bg={HL} s={28} /></g>
          <g opacity={p(f, fin, fin + 10)}><Tag x={600} y={560} text="done: carry on" bg={C.green} fg="#fff" s={28} /></g>
        </g>;
      })()}
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: concurrency vs parallelism
const SEQ = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'];
const COL: Record<string, string> = { A: C.blue, B: C.amber, C: C.teal };
const Conc: React.FC<{ f: number }> = ({ f }) => {
  const a = B('concQ').start, c = B('conc').start, pa = B('par').start;
  const t1 = p(f, c + 10, at('conc', 0.95)), t2 = p(f, pa + 10, at('par', 0.95));
  const W = 1100, X0 = 640;
  const cur1 = SEQ[Math.min(SEQ.length - 1, Math.floor(t1 * SEQ.length))];
  return <g>
    <Head f={f} a={a}>concurrency vs parallelism</Head>
    <g opacity={p(f, c, c + 12)}>
      <text x={120} y={300} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>one core: taking turns</text>
      <Chip f={f} x={330} y={470} s={0.6} busy={t1 > 0 && t1 < 1 ? 1 : 0} />
      {t1 > 0 && t1 < 1 && <Proc f={f} x={330} y={530} c={COL[cur1]} label={cur1} s={0.55} seed={0} mood="focus" />}
      {SEQ.map((k, i) => {
        const w = W / SEQ.length, vis = Math.max(0, Math.min(1, t1 * SEQ.length - i));
        return vis > 0 ? <rect key={i} x={X0 + i * w} y={430} width={w * vis} height={80} fill={COL[k]} stroke="#fbf9f4" strokeWidth={3} /> : null;
      })}
      <g opacity={p(f, at('conc', 0.75), at('conc', 0.85))}><Tag x={X0 + W / 2} y={570} text="concurrency: progress, one at an instant" bg={C.ink} fg="#fff" s={28} /></g>
    </g>
    <g opacity={p(f, pa, pa + 12)}>
      <text x={120} y={680} fontFamily={SANS} fontWeight={800} fontSize={34} fill={C.ink}>two cores: at the same moment</text>
      <Chip f={f} x={250} y={850} s={0.5} busy={t2 > 0 && t2 < 1 ? 1 : 0} />
      <Chip f={f} x={430} y={850} s={0.5} busy={t2 > 0 && t2 < 1 ? 1 : 0} />
      <rect x={X0} y={780} width={W * t2} height={60} fill={C.blue} />
      <rect x={X0} y={860} width={W * t2} height={60} fill={C.amber} />
      <g opacity={p(f, at('par', 0.75), at('par', 0.85))}><Tag x={X0 + W / 2} y={980} text="parallelism: really simultaneous" bg={C.green} fg="#fff" s={28} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: Amdahl
const Amdahl: React.FC<{ f: number }> = ({ f }) => {
  const a = B('amQ').start, a1 = B('am1').start, a2 = B('am2').start;
  const U = 1200, X0 = 360, S = 0.25;
  const Ns = [2, 4, 8, 16, 64, 1000];
  const nIdx = f < a2 ? 0 : Math.min(Ns.length - 1, Math.floor(p(f, at('am2', 0.1), at('am2', 0.6)) * Ns.length));
  const split = p(f, at('am1', 0.3), at('am1', 0.5));
  const N = f < a2 ? lerp(1, 2, split) : Ns[nIdx];
  const lanes = Math.min(8, Math.round(N));
  const par = N >= 1000 ? 0 : (1 - S) / N;
  const speed = 1 / (S + par);
  return <g>
    <Head f={f} a={a}>more cores, more speed?</Head>
    <g opacity={p(f, a + 6, a + 18)}>
      <text x={X0} y={300} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>one core: time 1</text>
      <rect x={X0} y={320} width={U * S} height={70} fill={C.red} />
      <rect x={X0 + U * S} y={320} width={U * (1 - S)} height={70} fill={C.blue} />
      <text x={X0 + U * S / 2} y={366} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill="#fff">serial 0.25</text>
      <text x={X0 + U * S + U * (1 - S) / 2} y={366} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={28} fill="#fff">parallel 0.75</text>
    </g>
    <g opacity={p(f, a1, a1 + 12)}>
      <text x={X0} y={490} fontFamily={SANS} fontWeight={700} fontSize={28} fill={C.muted}>{`N = ${N >= 1000 ? '∞' : Math.round(N)} cores`}</text>
      <rect x={X0} y={510} width={U * S} height={160} fill={C.red} />
      {Array.from({ length: lanes }, (_, i) => <rect key={i} x={X0 + U * S} y={510 + (i * 160) / lanes} width={U * par} height={160 / lanes - 3} fill={C.blue} />)}
      <line x1={X0 + U * (S + par)} x2={X0 + U * (S + par)} y1={490} y2={700} stroke={C.ink} strokeWidth={4} strokeDasharray="8 6" />
      <g opacity={p(f, at('am1', 0.55), at('am1', 0.65))}>
        <Tag x={X0 + 300} y={760} text={N >= 1000 ? 'time → 0.25' : `time ${(S + par).toFixed(3).replace(/0+$/, '')}`} bg="#fff" s={32} mono />
        <Tag x={X0 + 820} y={760} text={N >= 1000 ? 'speedup → 4' : `speedup ${speed.toFixed(2)}`} bg={C.ink} fg="#fff" s={32} mono />
      </g>
    </g>
    <g opacity={p(f, at('am2', 0.6), at('am2', 0.7))}>
      <text x={960} y={900} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={48} fill={C.red}>limit: 1 / S = 1 / 0.25 = 4</text>
    </g>
  </g>;
};

// ------------------------------------------------ scene 4: user threads, kernel threads, three models
const Models: React.FC<{ f: number }> = ({ f }) => {
  const a = B('kinds').start, m1 = B('m1').start, m2 = B('m2').start, m3 = B('m3').start;
  const BY = 560;
  const mode = f < m2 ? 0 : f < m3 ? 1 : 2;
  const ux = (i: number) => 560 + i * 270, kN = [1, 4, 2][mode];
  const kx = (j: number) => 960 + (j - (kN - 1) / 2) * 270;
  const map = (i: number) => (mode === 0 ? 0 : mode === 1 ? i : i < 2 ? 0 : 1);
  const blockAt = mode === 0 ? at('m1', 0.5) : mode === 1 ? at('m2', 0.4) : 1e9;
  const blocked = f > blockAt;
  const title = ['many-to-one', 'one-to-one', 'many-to-many'][mode];
  return <g>
    <Head f={f} a={a} b={m1}>user threads and kernel threads</Head>
    <Head f={f} a={m1}>{title}</Head>
    <rect x={0} y={BY} width={1920} height={1080 - BY} fill={KZONE} />
    <line x1={0} x2={1920} y1={BY} y2={BY} stroke={C.ink} strokeWidth={5} />
    <text x={60} y={BY - 26} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.blue}>user threads (library)</text>
    <text x={60} y={BY + 50} fontFamily={SANS} fontWeight={800} fontSize={30} fill={C.red}>kernel threads (OS schedules)</text>
    <g opacity={p(f, m1, m1 + 10)}>
      {[0, 1, 2, 3].map(i => <line key={i} x1={ux(i)} y1={440} x2={kx(map(i))} y2={760} stroke={blocked && (mode === 0 || i === 0) ? C.red : '#9c9483'} strokeWidth={4} />)}
    </g>
    {[0, 1, 2, 3].map(i => {
      const stop = blocked && (mode === 0 || i === 0);
      return <Proc key={i} f={f} x={ux(i)} y={440} c={[C.blue, C.amber, C.teal, PC.P4][i]} s={0.65} seed={i} grey={stop && i > 0 ? 0.8 : 0}
        mood={stop ? (i === 0 ? 'sleep' : 'sad') : 'happy'} look={[0, 1]} />;
    })}
    {Array.from({ length: kN }, (_, j) => <g key={`${mode}-${j}`} transform={`translate(${kx(j)},${800}) scale(${pop(f, (mode === 0 ? m1 : mode === 1 ? m2 : m3) + j * 4, 14)})`}>
      <rect x={-70} y={-40} width={140} height={80} rx={14} fill={C.ink} />
      <text y={12} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={28} fill="#fff">K</text>
    </g>)}
    <g opacity={win(f, blockAt, mode === 0 ? m2 : m3)}>
      <Tag x={ux(0)} y={300} text="blocks" bg={C.red} fg="#fff" s={28} />
      <Tag x={1500} y={960} text={mode === 0 ? 'one blocks: all stop' : 'the others keep going'} bg={mode === 0 ? C.red : C.green} fg="#fff" s={30} />
    </g>
    <g opacity={p(f, at('m2', 0.6), at('m2', 0.7)) * (mode === 1 ? 1 : 0)}><Tag x={400} y={960} text="Linux, Windows" bg={C.ink} fg="#fff" s={30} /></g>
    <g opacity={p(f, at('m3', 0.4), at('m3', 0.5))}><Tag x={1500} y={960} text="a sufficient number of kernel threads" bg={C.ink} fg="#fff" s={28} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: the lost update
const Race: React.FC<{ f: number }> = ({ f }) => {
  const a = B('race').start, r2 = B('race2').start, r3 = B('race3').start;
  const ld = at('race2', 0.1), add = at('race2', 0.4), st = at('race2', 0.7);
  const ra = f < ld + 18 ? '?' : f < add ? '0' : '1';
  const cnt = f < st + 18 ? '0' : '1';
  return <g>
    <Head f={f} a={a} b={r3}>counter++ is three steps</Head>
    <Head f={f} a={r3} c={C.red}>a lost update: a race condition</Head>
    {['load', 'add', 'store'].map((s, i) => <g key={s} transform={`translate(${760 + i * 200},${250}) scale(${pop(f, a + 10 + i * 10, 14)})`}>
      <rect x={-85} y={-40} width={170} height={80} rx={16} fill={[ld, add, st][i] < f ? C.blue : '#fbf9f4'} stroke={C.blue} strokeWidth={4} />
      <text y={12} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={32} fill={[ld, add, st][i] < f ? '#fff' : C.ink}>{s}</text>
    </g>)}
    <Cell x={960} y={500} name="counter" v={cnt} w={200} vc={f > st + 18 ? C.red : C.ink} />
    {[0, 1].map(i => {
      const x = i ? 1480 : 440;
      return <g key={i} opacity={p(f, r2 - 10, r2)}>
        <Proc f={f} x={x} y={900} c={i ? C.amber : C.blue} label={i ? 'B' : 'A'} s={0.8} seed={i} mood={f > r3 ? 'worried' : 'focus'} look={[i ? -1 : 1, -1]} />
        <Cell x={x} y={650} name="register" v={ra} w={150} c={i ? C.amber : C.blue} />
        <Fly f={f} s={ld + i * 4} a={[960, 520]} b={[x, 670]} text="0" c={i ? C.amber : C.blue} />
        <Fly f={f} s={st + i * 6} a={[x, 670]} b={[960, 520]} text="1" c={i ? C.amber : C.blue} />
      </g>;
    })}
    <g opacity={p(f, at('race2', 0.85), at('race2', 0.95))}><Tag x={960} y={680} text="should be 2" bg={C.red} fg="#fff" s={32} /></g>
    <Mark f={f} a={at('race2', 0.88)} x={1110} y={470} ok={false} />
    <g opacity={p(f, at('race3', 0.5), at('race3', 0.6))}><Tag x={960} y={800} text="fixed in chapter 6" bg={C.ink} fg="#fff" s={30} /></g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4']} rows={[
  ['shared', 'code, data, heap, files'],
  ['private', 'registers, PC, stack'],
  ['one core', 'concurrency; many cores: parallelism'],
  ['Amdahl', 'the serial part limits the speedup'],
]} />;

export const OsThreads: React.FC = () =>
  <Episode t={timeline} ch="Chapter 4" title="One process, many threads" scenes={[
    [House, 0], [Conc, B('concQ').start], [Amdahl, B('amQ').start], [Models, B('kinds').start], [Race, B('race').start], [Ex, B('ex0').start],
  ]}>
    {[0, 1, 2, 3].map(i => <Sfx key={i} at={at('why', 0.1 + i * 0.18)} name="pop" volume={0.16} />)}
    <Sfx at={at('pth', 0.22)} name="pop" volume={0.22} />
    <Sfx at={at('pth', 0.85)} name="ping" volume={0.2} />
    <Sfx at={at('am1', 0.55)} name="ping" volume={0.2} />
    <Sfx at={at('m1', 0.5)} name="beep" volume={0.18} />
    <Sfx at={at('race2', 0.88)} name="beep" volume={0.2} />
  </Episode>;
