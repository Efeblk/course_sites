// SWE307 ch6-7: UML activity diagram as a token moving: initial, action, decision/merge, fork/join, flow final vs activity final, accept event, swimlanes.
import React from 'react';
import { Zap } from 'lucide-react';
import { Sfx } from '../kit';
import { ActionBox, ActivityFinal, Arrow, Bar, C, Card, Diamond, FlowFinal, IconDot, InitialDot, Label, PURPLE, Pill, Pop, Rise, T, Token, Video, along, lerp, p, pop, tl, HL, SERIF, Pt } from './kit';
import timeline from '../timelines/swe-activity.json';

const { B, at } = tl(timeline);
const edge = (x1: number, y1: number, x2: number, y2: number, t = 1, c = C.ink) => <Arrow x1={x1} y1={y1} x2={x2} y2={y2} t={t} sw={5} hs={18} c={c} />;

// ------------------------------------------------ A + B: initial, actions, decision, merge
const Flow: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), tk = B('token'), ac = B('action'), de = B('decision');
  const iA = tk.start + tk.dur * 0.6, a1 = ac.start + ac.dur * 0.1, a2 = ac.start + ac.dur * 0.35;
  const dA = de.start + de.dur * 0.05, mA = de.start + de.dur * 0.6;
  // token path: initial → select item → add to cart → decision → up (in stock) → pay → merge → beyond
  const path: Pt[] = [[160, 540], [400, 540], [640, 540], [880, 540], [1010, 540], [1010, 340], [1250, 340], [1490, 340], [1490, 540], [1740, 540]];
  const k = p(f, ac.start + ac.dur * 0.5, ac.start + ac.dur * 0.95) * 0.42 + p(f, de.start + de.dur * 0.3, de.start + de.dur * 0.95) * 0.58;
  const [tx, ty] = along(path, k);
  return <g>
    <Rise f={f} a={w.start}><T x={960} y={130} s={52} w={500} f={SERIF}>a flow: steps, in order, with conditions</T></Rise>
    <g opacity={1 - p(f, tk.start, tk.start + 10)}>
      {['step', 'step', 'step'].map((s, i) => <Pop key={i} f={f} a={w.start + w.dur * (0.3 + i * 0.15)} x={560 + i * 400} y={540}><ActionBox text={s} w={220} fill="#fbf9f4" stroke="#b9ad95" /></Pop>)}
      {[0, 1].map(i => <Arrow key={i} x1={670 + i * 400} y1={540} x2={850 + i * 400} y2={540} t={p(f, w.start + w.dur * (0.4 + i * 0.15), w.start + w.dur * (0.48 + i * 0.15))} sw={5} hs={18} c="#b9ad95" />)}
    </g>
    <Pop f={f} a={iA - 10} x={160} y={540}><InitialDot /></Pop>
    <Pop f={f} a={iA} x={160} y={640}><Pill text="initial node" bg={C.ink} s={26} /></Pop>
    {edge(190, 540, 300, 540, p(f, a1 - 6, a1 + 4))}
    <Pop f={f} a={a1} x={420} y={540}><ActionBox text="select item" w={230} /></Pop>
    {edge(540, 540, 640, 540, p(f, a2 - 6, a2 + 4))}
    <Pop f={f} a={a2} x={760} y={540}><ActionBox text="add to cart" w={230} /></Pop>
    <Pop f={f} a={ac.start + ac.dur * 0.55} x={590} y={680}><Pill text="action: rounded box, a verb" bg={C.blue} s={26} /></Pop>
    {/* decision */}
    {edge(880, 540, 960, 540, p(f, dA - 6, dA + 4))}
    <Pop f={f} a={dA} x={1010} y={540}><Diamond r={48} stroke={C.amber} /></Pop>
    <g opacity={p(f, dA + 10, dA + 20)}>
      <polyline points="1010,492 1010,340 1130,340" fill="none" stroke={C.ink} strokeWidth={5} /><T x={1020} y={420} s={26} w={700} a="start" c={C.amber}>[in stock]</T>
      <polyline points="1010,588 1010,740 1130,740" fill="none" stroke={C.ink} strokeWidth={5} /><T x={1020} y={680} s={26} w={700} a="start" c={C.amber}>[out of stock]</T>
      <g transform="translate(1250,340)"><ActionBox text="pay" w={220} /></g>
      <g transform="translate(1250,740)"><ActionBox text="notify customer" w={260} s={28} /></g>
    </g>
    <Pop f={f} a={dA + 4} x={1010} y={860}><Pill text="decision: one path" bg={C.amber} s={26} /></Pop>
    <Pop f={f} a={mA} x={1490} y={540}><Diamond r={48} stroke={C.amber} /></Pop>
    <g opacity={p(f, mA + 4, mA + 16)}>
      <polyline points="1360,340 1490,340 1490,492" fill="none" stroke={C.ink} strokeWidth={5} />
      <polyline points="1380,740 1490,740 1490,588" fill="none" stroke={C.ink} strokeWidth={5} />
      {edge(1538, 540, 1720, 540)}
    </g>
    <Pop f={f} a={mA + 6} x={1600} y={860}><Pill text="merge: paths join again" bg={C.amber} s={26} /></Pop>
    {k > 0 && k < 1 && <Token x={tx} y={ty} />}
  </g>;
};

// ------------------------------------------------ C: fork / join
const Fork: React.FC<{ f: number }> = ({ f }) => {
  const fk = B('fork');
  const s0 = fk.start + fk.dur * 0.05, split = fk.start + fk.dur * 0.3, joinA = fk.start + fk.dur * 0.62;
  const kIn = p(f, s0, split), kTop = p(f, split, joinA - 10), kBot = p(f, split, split + (joinA - split) * 0.55), kOut = p(f, joinA + 10, joinA + 40);
  const top: Pt[] = [[600, 540], [600, 340], [960, 340], [1320, 340], [1320, 540]];
  const bot: Pt[] = [[600, 540], [600, 740], [960, 740], [1320, 740], [1320, 540]];
  const [ax, ay] = along(top, kTop), [bx, by] = along(bot, kBot);
  const waiting = kBot >= 1 && kTop < 1;
  return <g>
    <Label f={f} a={fk.start}>fork splits into parallel flows, join waits for all</Label>
    {edge(200, 540, 580, 540)}
    <g transform="translate(600,540)"><Bar vertical w={500} /></g>
    <polyline points="600,340 840,340" fill="none" stroke={C.ink} strokeWidth={5} /><polyline points="600,740 840,740" fill="none" stroke={C.ink} strokeWidth={5} />
    <g transform="translate(960,340)"><ActionBox text="ship order" w={240} /></g>
    <g transform="translate(960,740)"><ActionBox text="send invoice" w={240} /></g>
    <polyline points="1080,340 1320,340" fill="none" stroke={C.ink} strokeWidth={5} /><polyline points="1080,740 1320,740" fill="none" stroke={C.ink} strokeWidth={5} />
    <g transform="translate(1320,540)"><Bar vertical w={500} /></g>
    {edge(1340, 540, 1720, 540)}
    <T x={600} y={860} s={34} w={800} c={C.blue}>fork</T><T x={1320} y={860} s={34} w={800} c={C.blue}>join</T>
    {kIn < 1 && kIn > 0 && <Token x={lerp(200, 600, kIn)} y={540} />}
    {kIn >= 1 && kOut <= 0 && <><Token x={ax} y={ay} /><Token x={bx} y={by} /></>}
    {waiting && <T x={1420} y={760} s={28} w={700} c={C.amber} a="start">waiting…</T>}
    {kOut > 0 && kOut < 1 && <Token x={lerp(1320, 1720, kOut)} y={540} />}
  </g>;
};

// ------------------------------------------------ D: flow final vs activity final
const Finals: React.FC<{ f: number }> = ({ f }) => {
  const fn = B('finals');
  const a1 = fn.start + fn.dur * 0.15, a2 = fn.start + fn.dur * 0.55;
  const panel = (x: number, a: number, title: string, el: React.ReactNode, all: boolean) => {
    const k = p(f, a, a + 40);
    return <g opacity={p(f, a - 10, a)}>
      <Card x={x} y={220} w={780} h={700} stroke={all ? C.red : C.blue} />
      <T x={x + 390} y={300} s={42} w={800} c={all ? C.red : C.blue}>{title}</T>
      {[0, 1].map(i => <polyline key={i} points={`${x + 80},${480 + i * 220} ${x + 600},${480 + i * 220}`} stroke={C.ink} strokeWidth={5} fill="none" />)}
      <g transform={`translate(${x + 640},480)`}>{el}</g>
      <g transform={`translate(${x + 640},700)`}>{all ? <polyline points="-40,0 40,0" stroke="transparent" /> : <polyline points="0,0 80,0" stroke={C.ink} strokeWidth={5} />}</g>
      {/* two tokens: top one reaches the final node */}
      {k < 1 && <Token x={lerp(x + 100, x + 600, k)} y={480} />}
      {(!all || k < 1) && <Token x={all ? lerp(x + 100, x + 400, k) : lerp(x + 100, x + 700, Math.min(1, k * 1.2))} y={700} o={all && k > 0.95 ? 0 : 1} />}
      {k >= 1 && all && <T x={x + 390} y={860} s={34} w={800} c={C.red}>every flow stops</T>}
      {k >= 1 && !all && <T x={x + 390} y={860} s={34} w={800} c={C.blue}>only this flow stops</T>}
    </g>;
  };
  return <g>
    {panel(120, a1, 'flow final', <FlowFinal r={36} />, false)}
    {panel(1020, a2, 'activity final', <ActivityFinal r={36} />, true)}
  </g>;
};

// ------------------------------------------------ E: accept event, F: swimlanes, G: the trap
const Accept: React.FC<{ f: number }> = ({ f }) => {
  const a = B('accept');
  const ev = a.start + a.dur * 0.55;
  return <g>
    <Label f={f} a={a.start}>accept event action: waits for an event</Label>
    <Pop f={f} a={a.start + 8} x={960} y={540}>
      <polygon points="-220,-80 220,-80 220,80 -220,80 -150,0" fill="#fff" stroke={C.ink} strokeWidth={5} />
      <T x={30} y={12} s={36} w={700}>payment received</T>
    </Pop>
    {edge(600, 540, 750, 540)}{edge(1180, 540, 1400, 540, p(f, ev + 10, ev + 24))}
    <g transform={`translate(${lerp(330, 760, p(f, ev - 20, ev))},380)`} opacity={p(f, ev - 24, ev - 16) * (1 - p(f, ev + 2, ev + 8))}><IconDot I={Zap} r={40} bg={C.amber} /></g>
    <Token x={f < ev + 10 ? 640 : lerp(1180, 1400, p(f, ev + 10, ev + 30))} y={540} />
    <T x={640} y={640} s={28} w={700} c={C.muted} o={1 - p(f, ev, ev + 10)}>waiting…</T>
  </g>;
};
const Lanes: React.FC<{ f: number }> = ({ f }) => {
  const l = B('lanes');
  const lanes = ['author', 'reviewer', 'approver'];
  const acts: [string, number, number][] = [['create', 0, 520], ['review', 1, 900], ['update', 0, 1200], ['approve', 2, 1520]];
  return <g>
    <Label f={f} a={l.start}>partitions (swimlanes): who does each action</Label>
    {lanes.map((n, i) => <g key={n} opacity={p(f, l.start + l.dur * (0.3 + i * 0.1), l.start + l.dur * (0.36 + i * 0.1))}>
      <rect x={140} y={200 + i * 260} width={1640} height={250} fill={['#e6ecfb', '#e3f0e5', '#efe6f5'][i]} stroke="#d9d1c1" strokeWidth={3} />
      <rect x={140} y={200 + i * 260} width={160} height={250} fill={[C.blue, C.green, PURPLE][i]} />
      <T x={220} y={335 + i * 260} s={30} w={800} c="#fff">{n}</T>
    </g>)}
    {acts.map(([n, ln, x], i) => <Pop key={n} f={f} a={l.start + l.dur * (0.45 + i * 0.1)} x={x} y={325 + ln * 260}><ActionBox text={n} w={210} s={30} /></Pop>)}
    <g opacity={p(f, l.start + l.dur * 0.85, l.start + l.dur * 0.95)}>
      {edge(625, 345, 795, 570)}{edge(1005, 570, 1095, 345)}{edge(1305, 345, 1415, 830)}
    </g>
  </g>;
};
const Trap: React.FC<{ f: number }> = ({ f }) => {
  const t = B('trap');
  return <g>
    <Pop f={f} a={t.start + 6} x={520} y={540}><Card x={-340} y={-250} w={680} h={500} stroke={C.amber} />
      <g transform="translate(-90,-60)"><Diamond r={56} stroke={C.amber} /></g><g transform="translate(90,-60)"><Diamond r={56} stroke={C.amber} /></g>
      <T x={0} y={90} s={44} w={800} c={C.amber}>decision · merge</T><T x={0} y={160} s={56} w={500} f={SERIF}>choice</T></Pop>
    <Pop f={f} a={t.start + t.dur * 0.5} x={1400} y={540}><Card x={-340} y={-250} w={680} h={500} stroke={C.blue} />
      <g transform="translate(-90,-60)"><Bar vertical w={160} /></g><g transform="translate(90,-60)"><Bar vertical w={160} /></g>
      <T x={0} y={90} s={44} w={800} c={C.blue}>fork · join</T><T x={0} y={160} s={56} w={500} f={SERIF}>parallel work</T></Pop>
  </g>;
};

export const SweActivity: React.FC = () =>
  <Video t={timeline} scenes={[[Flow, 0], [Fork, B('fork').start], [Finals, B('finals').start], [Accept, B('accept').start], [Lanes, B('lanes').start], [Trap, B('trap').start]]}>
    <Sfx at={at('token', 0.6) - 10} name="pop" volume={0.2} />
    <Sfx at={at('decision', 0.05)} name="pop" volume={0.2} />
    <Sfx at={at('fork', 0.3)} name="whoosh" volume={0.2} />
    <Sfx at={at('fork', 0.62) + 10} name="ping" volume={0.18} />
    <Sfx at={at('finals', 0.15) + 40} name="tick" volume={0.3} />
    <Sfx at={at('finals', 0.55) + 40} name="beep" volume={0.22} />
    <Sfx at={at('accept', 0.55)} name="ping" volume={0.2} />
  </Video>;
