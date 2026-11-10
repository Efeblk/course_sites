// SWE307 ch3: Extreme Programming (weekly cycle, TDD, pair programming) and Scrum (backlog, sprint, daily scrum, demo).
import React from 'react';
import { Clock, GitMerge, Monitor, Search, Timer, Users, Keyboard, Presentation } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Person, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-xpscrum.json';

const { B, at } = tl(timeline);
const NOTE = ['#f6d765', '#f3b6a6', '#b9dcc0', '#bcd0f2', '#e2c8ef'];
const Sticky: React.FC<{ i: number; text?: string; w?: number }> = ({ i, text = 'story', w = 150 }) =>
  <g><rect x={-w / 2 + 4} y={-w / 2 + 6} width={w} height={w * 0.8} fill="rgba(60,50,30,.12)" /><rect x={-w / 2} y={-w / 2} width={w} height={w * 0.8} fill={NOTE[i % NOTE.length]} />
    <T x={0} y={-w * 0.06} s={w * 0.18} w={700} c={C.ink}>{text}</T>
    {[0, 1].map(k => <rect key={k} x={-w / 2 + 18} y={-w * 0.02 + k * 18} width={w - 36 - k * 30} height={7} rx={3} fill="rgba(0,0,0,.15)" />)}
  </g>;

// ------------------------------------------------ A: XP weekly cycle
const Weekly: React.FC<{ f: number }> = ({ f }) => {
  const i0 = B('intro'), w = B('weekly');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const prog = p(f, w.start + w.dur * 0.3, w.start + w.dur * 0.62);
  const xpOut = p(f, w.start - 6, w.start + 12);
  return <g>
    {/* intro: two names */}
    <g opacity={1 - xpOut}>
      <Pop f={f} a={i0.start + i0.dur * 0.2} x={620} y={540}><Card x={-260} y={-170} w={520} h={340} stroke={C.blue} /><T x={0} y={10} s={120} w={800} c={C.blue} f={SERIF}>XP</T><T x={0} y={90} s={32} c={C.muted}>Extreme Programming</T></Pop>
      <Pop f={f} a={i0.start + i0.dur * 0.75} x={1300} y={540}><Card x={-260} y={-170} w={520} h={340} stroke={C.green} /><T x={0} y={30} s={110} w={800} c={C.green} f={SERIF}>Scrum</T></Pop>
    </g>
    <g opacity={xpOut}>
      <Label f={f} a={w.start}>XP: the weekly cycle</Label>
      {days.map((d, i) => {
        const x = 330 + i * 315, done = prog * 5 > i + 0.5;
        return <g key={d} transform={`translate(${x},420)`}>
          <rect x={-140} y={-110} width={280} height={260} rx={18} fill={done ? '#e3f0e5' : '#fbf9f4'} stroke={done ? C.green : '#d9d1c1'} strokeWidth={4} />
          <T x={0} y={-60} s={38} w={800} c={done ? C.green : C.muted}>{d}</T>
        </g>;
      })}
      {/* Monday: customer picks stories */}
      <g transform="translate(150,980)" opacity={p(f, w.start + w.dur * 0.05, w.start + w.dur * 0.12)}><Person v={1} s={0.42} arm={p(f, w.start + w.dur * 0.1, w.start + w.dur * 0.2)} /></g>
      <Rise f={f} a={w.start + w.dur * 0.08}><T x={150} y={700} s={30} w={700} c={C.muted}>customer</T></Rise>
      {[0, 1, 2].map(k => <Pop key={k} f={f} a={w.start + w.dur * (0.12 + k * 0.05)} x={330 + (k - 1) * 14} y={430 + k * 40}><g transform={`rotate(${(k - 1) * 4})`}><Sticky i={k} w={120} /></g></Pop>)}
      {/* Friday: running, tested features */}
      <Pop f={f} a={w.start + w.dur * 0.6} x={1590} y={450}><IconDot I={Monitor} r={64} bg={C.green} /><g transform="translate(60,-60)"><Badge ok r={26} /></g></Pop>
      <Rise f={f} a={w.start + w.dur * 0.62}><T x={1590} y={620} s={30} w={700} c={C.green}>running, tested</T></Rise>
      {/* quarterly cycle = release */}
      <g opacity={p(f, w.start + w.dur * 0.78, w.start + w.dur * 0.86)}>
        {Array.from({ length: 13 }, (_, k) => <circle key={k} cx={420 + k * 90} cy={820} r={22} fill={C.green} opacity={0.35 + 0.65 * p(f, w.start + w.dur * 0.8 + k * 2, w.start + w.dur * 0.8 + k * 2 + 6)} />)}
        <path d="M400,870 v20 h1120 v-20" fill="none" stroke={C.blue} strokeWidth={5} />
        <T x={960} y={950} s={38} w={800} c={C.blue}>quarterly cycle = a release</T>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ B: test-driven development
const TDD: React.FC<{ f: number }> = ({ f }) => {
  const t = B('tdd');
  const steps: [string, string, number][] = [['write a failing test', C.red, 0.1], ['run it: FAIL', C.red, 0.3], ['write code', C.blue, 0.45], ['run it: PASS', C.green, 0.62]];
  const R = 300, cx = 960, cy = 570;
  const pos = (i: number) => { const a = (-90 + i * 90) * Math.PI / 180; return [cx + R * Math.cos(a) * 1.35, cy + R * Math.sin(a)]; };
  const loopK = p(f, t.start + t.dur * 0.75, t.start + t.dur * 0.95);
  let cur = -1; steps.forEach(([, , fr], i) => { if (f >= t.start + t.dur * fr) cur = i; });
  if (loopK > 0 && loopK < 1) cur = Math.floor(loopK * 8) % 4;
  return <g>
    <Label f={f} a={t.start}>test-driven development: the test comes first</Label>
    <ellipse cx={cx} cy={cy} rx={R * 1.35} ry={R} fill="none" stroke="#e2dccd" strokeWidth={14} strokeDasharray="4 22" strokeLinecap="round" />
    {steps.map(([s, col, fr], i) => {
      const [x, y] = pos(i), a = t.start + t.dur * fr;
      return <Pop key={s} f={f} a={a} x={x} y={y}>
        <rect x={-210} y={-58} width={420} height={116} rx={58} fill={cur === i ? col : '#fbf9f4'} stroke={col} strokeWidth={5} />
        <T x={0} y={13} s={36} w={800} c={cur === i ? '#fff' : col}>{s}</T>
        <T x={-240} y={-60} s={34} w={800} c={C.muted}>{i + 1}</T>
      </Pop>;
    })}
    <g opacity={loopK}><T x={cx} y={cy + 18} s={60} w={800} c={C.ink} f={SERIF}>repeat</T></g>
  </g>;
};

// ------------------------------------------------ C: pair programming and other practices
const Pair: React.FC<{ f: number }> = ({ f }) => {
  const pr = B('pair'), m = B('more');
  const typing = Math.floor(Math.max(0, f - pr.start) / 4);
  return <g>
    <Label f={f} a={pr.start}>pair programming: one workstation, two people</Label>
    <g opacity={p(f, pr.start, pr.start + 12)}>
      {/* desk + monitor */}
      <rect x={560} y={700} width={800} height={24} rx={8} fill="#b9a789" />
      <rect x={810} y={420} width={300} height={200} rx={14} fill="#2b2f3a" />
      <rect x={826} y={436} width={268} height={168} rx={8} fill="#0f1720" />
      {Array.from({ length: 6 }, (_, k) => <rect key={k} x={846} y={456 + k * 24} width={Math.min(220, Math.max(0, (typing - k * 14) * 8)) * (k % 2 ? 0.7 : 1)} height={10} rx={5} fill={['#5ef0a0', '#9fb2ff', '#f6d765'][k % 3]} />)}
      <rect x={945} y={620} width={30} height={80} fill="#2b2f3a" />
      <g transform="translate(740,1040)"><Person v={0} s={0.6} arm={0.3 + 0.1 * Math.sin(f / 2)} /></g>
      <g transform="translate(1180,1040)"><Person v={2} s={0.6} /></g>
    </g>
    <Pop f={f} a={pr.start + pr.dur * 0.45} x={500} y={380}><Pill text="driver: types" bg={C.blue} s={36} /></Pop>
    <Pop f={f} a={pr.start + pr.dur * 0.7} x={1430} y={380}><Pill text="navigator: reviews" bg={PURPLE} s={36} /></Pop>
    <Pop f={f} a={pr.start + pr.dur * 0.72} x={1290} y={520}><IconDot I={Search} r={40} bg="#fff" fg={PURPLE} ring={PURPLE} /></Pop>
    {([[GitMerge, 'integrate many times a day', 0.05], [Users, 'anyone may change any code', 0.4], [Clock, '40-hour week', 0.75]] as [React.FC<any>, string, number][]).map(([I, s, fr], i) =>
      <Pop key={s} f={f} a={m.start + m.dur * fr} x={380 + i * 580} y={215}>
        <rect x={-270} y={-58} width={540} height={116} rx={58} fill="#fbf9f4" stroke={C.teal} strokeWidth={4} />
        <g transform="translate(-205,0)"><IconDot I={I} r={38} bg={C.teal} /></g>
        <T x={35} y={12} s={i === 2 ? 38 : 30} w={700} c={C.ink}>{s}</T>
      </Pop>)}
  </g>;
};

// ------------------------------------------------ D: Scrum
const Scrum: React.FC<{ f: number }> = ({ f }) => {
  const sc = B('scrum'), sp = B('sprint'), da = B('daily'), te = B('team'), de = B('demo');
  const pick = p(f, sp.start + sp.dur * 0.45, sp.start + sp.dur * 0.85);
  const spin = Math.max(0, f - sp.start) * 1.2;
  const fade = p(f, te.start - 6, te.start + 10);
  return <g>
    <g opacity={1 - fade}><Label f={f} a={sc.start} c={C.green}>Scrum</Label></g>
    {/* backlog column */}
    <g opacity={1 - fade}>
      <Rise f={f} a={sc.start + 6}><T x={260} y={200} s={40} w={800} c={C.green}>backlog</T></Rise>
      <rect x={130} y={230} width={260} height={760} rx={18} fill="none" stroke="#d9d1c1" strokeWidth={4} strokeDasharray="12 10" opacity={p(f, sc.start, sc.start + 10)} />
      {Array.from({ length: 6 }, (_, k) => {
        const moving = k < 3, a = sc.start + sc.dur * (0.3 + k * 0.08);
        const x0 = 260, y0 = 310 + k * 115, x1 = 900 + (k - 1) * 150, y1 = 560;
        const u = moving ? pick : 0;
        return <Pop key={k} f={f} a={a} x={lerp(x0, x1, u)} y={lerp(y0, y1, u)}><g transform={`scale(${lerp(1, 0.8, u)})`}><Sticky i={k} w={160} text="user story" /></g></Pop>;
      })}
      {/* sprint ring */}
      <g transform="translate(900,560)" opacity={p(f, sp.start, sp.start + 12)}>
        <circle r={300} fill="none" stroke="#e2dccd" strokeWidth={26} />
        <circle r={300} fill="none" stroke={C.green} strokeWidth={26} strokeDasharray="300 1585" transform={`rotate(${spin})`} strokeLinecap="round" />
        <T x={0} y={-200} s={48} w={800} c={C.green}>sprint</T>
        <T x={0} y={240} s={40} w={700} c={C.muted}>30 days</T>
      </g>
      {/* daily scrum */}
      <g transform="translate(1520,520)" opacity={p(f, da.start, da.start + 12)}>
        <circle r={150} fill="#fbf9f4" stroke={C.amber} strokeWidth={8} />
        <path d={`M0,0 L0,-120`} stroke="#d9d1c1" strokeWidth={10} strokeLinecap="round" />
        <path d={`M0,0 L${120 * Math.sin(p(f, da.start + 10, da.start + da.dur * 0.7) * Math.PI / 2)},${-120 * Math.cos(p(f, da.start + 10, da.start + da.dur * 0.7) * Math.PI / 2)}`} stroke={C.amber} strokeWidth={10} strokeLinecap="round" />
        <path d={`M0,0 L0,-120 A120,120 0 0 1 ${120 * Math.sin(p(f, da.start + 10, da.start + da.dur * 0.7) * Math.PI / 2)},${-120 * Math.cos(p(f, da.start + 10, da.start + da.dur * 0.7) * Math.PI / 2)} Z`} fill={C.amber} opacity={0.3} />
        <circle r={12} fill={C.ink} />
        <T x={0} y={215} s={44} w={800} c={C.amber}>≤ 15 min</T>
        <T x={0} y={-180} s={34} w={700} c={C.muted}>daily scrum</T>
      </g>
    </g>
    {/* team size */}
    <g opacity={fade * (1 - p(f, de.start - 6, de.start + 10))}>
      {Array.from({ length: 9 }, (_, k) => <g key={k} transform={`translate(${380 + k * 145},${760})`} opacity={k < 6 ? p(f, te.start + k * 3, te.start + k * 3 + 8) : 0.35 + 0.65 * p(f, te.start + 30 + k * 4, te.start + 38 + k * 4)}>
        <Person v={k} s={0.4} />
      </g>)}
      <path d="M300,820 v30 h1300 v-30" fill="none" stroke={C.green} strokeWidth={6} opacity={p(f, te.start + 40, te.start + 50)} />
      <T x={960} y={920} s={56} w={800} c={C.green} o={p(f, te.start + 40, te.start + 50)}>6 – 9 members</T>
    </g>
    {/* demo */}
    <g opacity={p(f, de.start - 6, de.start + 10)}>
      <Label f={f} a={de.start} c={C.green}>end of sprint: demo for the customer</Label>
      <rect x={560} y={330} width={640} height={400} rx={20} fill="#2b2f3a" />
      <rect x={580} y={350} width={600} height={360} rx={12} fill="#fbf9f4" />
      {[0, 1, 2].map(k => <g key={k} transform={`translate(${680 + k * 200},530) scale(${pop(f, de.start + de.dur * (0.3 + k * 0.15))})`}><rect x={-70} y={-70} width={140} height={140} rx={14} fill={[C.blue, C.teal, PURPLE][k]} /><g transform="translate(66,-66)"><Badge ok r={22} /></g></g>)}
      <T x={880} y={790} s={34} w={700} c={C.muted}>working, integrated, tested</T>
      <g transform="translate(1450,980)"><Person v={1} s={0.55} arm={p(f, de.start + de.dur * 0.7, de.start + de.dur * 0.8)} /></g>
    </g>
  </g>;
};

export const SweXpScrum: React.FC = () =>
  <Video t={timeline} scenes={[[Weekly, 0], [TDD, B('tdd').start], [Pair, B('pair').start], [Scrum, B('scrum').start]]}>
    {[0.1, 0.3, 0.45, 0.62].map(k => <Sfx key={k} at={at('tdd', k)} name={k === 0.3 ? 'beep' : k === 0.62 ? 'ping' : 'pop'} volume={0.22} />)}
    <Sfx at={at('sprint', 0.45)} name="whoosh" volume={0.25} />
    <Sfx at={at('daily', 0.7)} name="tick" volume={0.3} />
    {[0.3, 0.45, 0.6].map(k => <Sfx key={`d${k}`} at={at('demo', k)} name="pop" volume={0.2} />)}
  </Video>;
