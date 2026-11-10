// SWE307 ch6: user stories: template, example, backlog, initiative > epic > story, INVEST, acceptance criteria.
import React from 'react';
import { MessageCircle, Shuffle, Handshake, Gem, Calculator, Minimize2, FlaskConical } from 'lucide-react';
import { Sfx } from '../kit';
import { Arrow, Badge, C, Card, IconDot, Label, PURPLE, Pill, Pop, Rise, T, Video, lerp, p, pop, tl, HL, SERIF } from './kit';
import timeline from '../timelines/swe-userstory.json';

const { B, at } = tl(timeline);
const NOTE = ['#f6d765', '#f3b6a6', '#b9dcc0', '#bcd0f2', '#e2c8ef'];

// ------------------------------------------------ A: template, example, backlog
const Story: React.FC<{ f: number }> = ({ f }) => {
  const w = B('what'), te = B('template'), ex = B('ex'), bl = B('backlog');
  const slot = (i: number) => p(f, te.start + te.dur * (0.3 + i * 0.2), te.start + te.dur * (0.38 + i * 0.2));
  const fill = p(f, ex.start + 6, ex.start + 20);
  const toB = p(f, bl.start + 4, bl.start + 30);
  const rows: [string, string, string, string][] = [['As a', 'role', 'passenger', C.blue], ['I want', 'capability', 'to link my credit card to my profile', C.teal], ['so that', 'benefit', 'I can pay for a ride faster', PURPLE]];
  return <g>
    <Rise f={f} a={w.start} out={bl.start}><T x={960} y={130} s={52} w={500} f={SERIF}>a feature, from the end user's point of view</T></Rise>
    <g transform={`translate(${lerp(960, 330, toB)},${lerp(540, 330, toB)}) scale(${lerp(1, 0.32, toB)}) rotate(${lerp(0, -2, toB)})`}>
      <rect x={-660} y={-250} width={1320} height={500} fill="rgba(60,50,30,.12)" transform="translate(8,10)" />
      <rect x={-660} y={-250} width={1320} height={500} fill={NOTE[0]} opacity={p(f, w.start + w.dur * 0.2, w.start + w.dur * 0.3)} />
      {rows.map(([k, ph, val, col], i) => <g key={k} transform={`translate(-600,${-120 + i * 130})`} opacity={slot(i)}>
        <T x={0} y={20} s={56} w={500} a="start" f={SERIF}>{k}</T>
        <g opacity={1 - fill}><rect x={260} y={-36} width={ph.length * 30 + 60} height={76} rx={14} fill="#fff" opacity={0.7} /><T x={290} y={20} s={50} w={800} a="start" c={col}>&lt;{ph}&gt;</T></g>
        <g opacity={fill}><T x={260} y={20} s={50} w={800} a="start" c={col}>{val}</T></g>
      </g>)}
    </g>
    <Pop f={f} a={w.start + w.dur * 0.75} x={1700} y={900}><IconDot I={MessageCircle} r={56} bg={C.teal} /><T x={0} y={100} s={30} w={700} c={C.teal}>+ a conversation</T></Pop>
    {/* backlog */}
    <g opacity={toB}>
      <T x={330} y={200} s={44} w={800} c={C.green}>backlog</T>
      {[1, 2, 3, 4].map(i => <Pop key={i} f={f} a={bl.start + 20 + i * 8} x={330} y={330 + i * 150}><g transform="rotate(1)"><rect x={-210} y={-75} width={420} height={150} fill={NOTE[i]} /><rect x={-170} y={-30} width={300} height={12} rx={6} fill="rgba(0,0,0,.15)" /><rect x={-170} y={0} width={220} height={12} rx={6} fill="rgba(0,0,0,.15)" /></g></Pop>)}
      {[0, 1, 2, 3, 4].map(i => <T key={i} x={90} y={345 + i * 150} s={34} w={800} c={C.muted}>{i + 1}</T>)}
      <Rise f={f} a={bl.start + bl.dur * 0.5}><T x={1150} y={560} s={48} w={500} f={SERIF}>an ordered list</T><T x={1150} y={630} s={34} c={C.muted}>index cards, sticky notes, or software</T></Rise>
    </g>
  </g>;
};

// ------------------------------------------------ B: initiative > epic > story
const Tree: React.FC<{ f: number }> = ({ f }) => {
  const t = B('tree');
  const a1 = t.start + t.dur * 0.1, a2 = t.start + t.dur * 0.3, a3 = t.start + t.dur * 0.62;
  const stories = ['iPhone: vertical live feed', 'desktop: fullscreen button', 'Android: continue watching'];
  return <g>
    <Label f={f} a={t.start}>big goals break down</Label>
    <Pop f={f} a={a1} x={960} y={250}><rect x={-330} y={-60} width={660} height={120} rx={20} fill={C.blue} /><T x={0} y={-8} s={26} w={700} c="#cfe0ff">INITIATIVE</T><T x={0} y={34} s={38} w={800} c="#fff">develop a video player</T></Pop>
    <Arrow x1={960} y1={312} x2={960} y2={410} t={p(f, a2 - 10, a2)} />
    <Pop f={f} a={a2} x={960} y={480}><rect x={-380} y={-60} width={760} height={120} rx={20} fill={PURPLE} /><T x={0} y={-8} s={26} w={700} c="#ecdcf5">EPIC · several sprints</T><T x={0} y={34} s={38} w={800} c="#fff">improve streaming service</T></Pop>
    {stories.map((s, i) => { const x = 420 + i * 540, a = a3 + i * 10; return <g key={s}>
      <Arrow x1={960} y1={542} x2={x} y2={700} t={p(f, a - 10, a)} />
      <Pop f={f} a={a} x={x} y={800}><rect x={-240} y={-90} width={480} height={180} fill={NOTE[i + 2]} /><T x={0} y={-36} s={24} w={700} c={C.muted}>STORY · 1–2 week sprint</T><T x={0} y={20} s={32} w={700}>{s}</T></Pop>
    </g>; })}
  </g>;
};

// ------------------------------------------------ C: INVEST
const LET: [string, string, string, React.FC<any>][] = [['i', 'I', 'Independent', Shuffle], ['n', 'N', 'Negotiable', Handshake], ['v', 'V', 'Valuable', Gem], ['e', 'E', 'Estimable', Calculator], ['s', 'S', 'Small', Minimize2], ['t', 'T', 'Testable', FlaskConical]];
const Invest: React.FC<{ f: number }> = ({ f }) => {
  const iv = B('invest');
  return <g>
    <Label f={f} a={iv.start}>good stories are INVEST</Label>
    {LET.map(([id, L, word, I], i) => {
      const a = B(id).start, on = p(f, a, a + 10), x = 260 + i * 280;
      return <g key={id}>
        <g opacity={p(f, iv.start + i * 4, iv.start + 10 + i * 4)}>
          <rect x={x - 110} y={240} width={220} height={240} rx={26} fill={on > 0.5 ? C.green : '#fbf9f4'} stroke={on > 0.5 ? C.green : '#d9d1c1'} strokeWidth={4} />
          <T x={x} y={410} s={170} w={800} c={on > 0.5 ? '#fff' : C.ink} f={SERIF}>{L}</T>
        </g>
        <g opacity={on}>
          <g transform={`translate(${x},600) scale(${pop(f, a)})`}><IconDot I={I} r={50} bg={C.green} /></g>
          <T x={x} y={720} s={34} w={800} c={C.green}>{word}</T>
        </g>
      </g>;
    })}
    {[['i', 'any order'], ['n', 'team decides how'], ['v', 'value to users'], ['e', 'easy to estimate'], ['s', 'one sprint'], ['t', 'acceptance criteria']].map(([id, d], i) =>
      <g key={id} opacity={p(f, at(id, 0.4), at(id, 0.6))}><T x={260 + i * 280} y={775} s={26} w={500} c={C.muted}>{d}</T></g>)}
  </g>;
};

// ------------------------------------------------ D: acceptance criteria
const Accept: React.FC<{ f: number }> = ({ f }) => {
  const a = B('accept');
  const items = ['log in to the platform', 'navigate to the auction page', 'select product(s) to bid on'];
  return <g>
    <Label f={f} a={a.start}>acceptance criteria: when is the story done?</Label>
    <Pop f={f} a={a.start + 6} x={520} y={540}><rect x={-380} y={-200} width={760} height={400} fill="rgba(60,50,30,.12)" transform="translate(8,10)" /><rect x={-380} y={-200} width={760} height={400} fill={NOTE[3]} />
      <T x={0} y={-100} s={36} w={500} f={SERIF}>As a bidder, I want to</T><T x={0} y={-45} s={36} w={500} f={SERIF}>select an auction product</T><T x={0} y={10} s={36} w={500} f={SERIF}>so that I can bid on it.</T></Pop>
    <Rise f={f} a={a.start + a.dur * 0.3}><T x={1080} y={360} s={36} w={800} a="start" c={C.green}>Ensure the bidder is able to:</T></Rise>
    {items.map((it, i) => { const t = a.start + a.dur * (0.45 + i * 0.15); return <Rise key={it} f={f} a={t}>
      <g transform={`translate(1100,${460 + i * 110})`}><rect x={-20} y={-36} width={56} height={56} rx={10} fill="#fff" stroke={C.green} strokeWidth={4} />
        <g opacity={p(f, t + 10, t + 16)} transform="translate(8,-8)"><path d="M-12,0 L-2,12 L16,-12" stroke={C.green} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
        <T x={60} y={12} s={36} w={600} a="start">{it}</T></g>
    </Rise>; })}
  </g>;
};

export const SweUserStory: React.FC = () =>
  <Video t={timeline} scenes={[[Story, 0], [Tree, B('tree').start], [Invest, B('invest').start], [Accept, B('accept').start]]}>
    {LET.map(([id]) => <Sfx key={id} at={at(id)} name="pop" volume={0.22} />)}
    {[0.45, 0.6, 0.75].map(k => <Sfx key={k} at={at('accept', k) + 10} name="tick" volume={0.3} />)}
    <Sfx at={at('backlog') + 4} name="whoosh" volume={0.2} />
  </Video>;
