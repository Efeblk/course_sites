/* COE025 Week 2 · Text classification. Narration: src/scripts/coe025-W2.json */
import React from 'react';
import {Arrow, C, Card, Draw, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, MONO, shake, Typed, win} from './kit';

/* ---------- 1. the task and the pipeline ---------- */
const Task: React.FC = () => {
  const {f, at} = useScene();
  const o1 = 1 - prog(f, at(2), 16), loop = prog(f, at(2), 16);
  const steps = ['Data', 'Features', 'Model', 'Prediction', 'Evaluation'];
  const cx = 960, cy = 590, R = 300;
  const pos = steps.map((_, i) => { const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2; return [cx + Math.cos(a) * R * 1.45, cy + Math.sin(a) * R] as const; });
  return (
    <Stage>
      <StageHeading start={at(0)} text="Text classification: f(text) → label" />
      <g opacity={o1}>
        <Chip start={at(0, 0.2)} x={440} y={330} text="Win free tickets now!!!" size={36} />
        <Arrow start={at(0, 0.4)} x1={700} y1={330} x2={800} y2={330} />
        <Card start={at(0, 0.45)} x={900} y={330} w={160} h={110} stroke={C.ink}><T y={14} size={44} weight={750} font={MONO}>f</T></Card>
        <Arrow start={at(0, 0.6)} x1={985} y1={330} x2={1085} y2={330} />
        <Chip start={at(0, 0.7)} x={1190} y={330} text="spam" size={40} color={C.red} hi={1} />
        <Chip start={at(0, 0.75)} x={1370} y={330} text="ham" size={40} color={C.mute} />
        {[['binary', ['spam', 'ham'], C.red], ['multi-class', ['sports', 'politics', 'tech'], C.blue], ['sentiment', ['positive', 'negative'], C.green]].map(([lab, ls, col], i) => (
          <g key={lab as string}>
            <Rise start={at(1, 0.1 + i * 0.25)} x={480} y={560 + i * 140} size={34} anchor="end" color={C.mute}>{lab as string}</Rise>
            {(ls as string[]).map((l, k) => <Chip key={l} start={at(1, 0.15 + i * 0.25 + k * 0.05)} x={640 + k * 230} y={548 + i * 140} text={l} size={34} color={col as string} />)}
          </g>
        ))}
      </g>
      <g opacity={loop}>
        {steps.map((s, i) => {
          const [x, y] = pos[i], [nx, ny] = pos[(i + 1) % steps.length];
          const k = 0.24;
          return (
            <g key={s}>
              <Chip start={at(2, 0.05 + i * 0.12)} x={x} y={y} text={`${i + 1}  ${s}`} size={36} color={[C.blue, C.teal, C.purple, C.orange, C.green][i]} hi={0.2} />
              <Arrow start={at(2, 0.1 + i * 0.12)} x1={mix(x, nx, k)} y1={mix(y, ny, k)} x2={mix(x, nx, 1 - k)} y2={mix(y, ny, 1 - k)} color={C.mute} w={4} />
            </g>
          );
        })}
      </g>
    </Stage>
  );
};

/* ---------- 2. Naive Bayes ---------- */
const NB: React.FC = () => {
  const {f, at} = useScene();
  const ind = win(f, at(2), at(3)), zero = prog(f, at(3), 14), smooth = prog(f, at(3, 0.55), 20);
  const fac = (x: number, y: number, h: number, c: string, lab: string, start: number) => (
    <g opacity={prog(f, start, 12)}><rect x={x - 45} y={y - h * prog(f, start, 22)} width={90} height={h * prog(f, start, 22)} rx={8} fill={c} /><T x={x} y={y + 40} size={26} color={C.mute}>{lab}</T></g>);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Naive Bayes" />
      <Rise start={at(0, 0.3)} x={960} y={250} size={34} color={C.mute}>which class most likely produced these words?</Rise>
      <Typed start={at(1, 0.05)} x={960} y={340} text="score(c) = P(c) × P(w₁|c) × P(w₂|c) × …" size={44} />
      <g opacity={1 - zero}>
        <T x={620} y={430} size={36} weight={700} color={C.green} o={prog(f, at(1, 0.4), 10)}>positive</T>
        {fac(500, 660, 150, C.green, 'P(+)', at(1, 0.45))}{fac(620, 660, 190, C.green, 'great|+', at(1, 0.55))}{fac(740, 660, 170, C.green, 'fun|+', at(1, 0.65))}
        <T x={1300} y={430} size={36} weight={700} color={C.red} o={prog(f, at(1, 0.4), 10)}>negative</T>
        {fac(1180, 660, 150, C.red, 'P(−)', at(1, 0.5))}{fac(1300, 660, 60, C.red, 'great|−', at(1, 0.6))}{fac(1420, 660, 80, C.red, 'fun|−', at(1, 0.7))}
        <Mark start={at(1, 0.85)} x={620} y={800} ok size={50} out={at(2)} />
      </g>
      <g opacity={ind}>
        <Chip start={at(2)} x={960} y={790} text="not good" size={40} out={at(2, 0.35)} />
        <Chip start={at(2, 0.35)} x={800} y={810} text="not" size={40} color={C.orange} />
        <Chip start={at(2, 0.4)} x={1120} y={810} text="good" size={40} color={C.orange} />
        <Tag start={at(2, 0.6)} x={960} y={930} color={C.orange} text="words assumed independent" />
      </g>
      <g opacity={zero}>
        <T x={960} y={450} size={34} color={C.mute}>"awesome" never seen in a negative review</T>
        <Typed start={at(3, 0.1)} x={960} y={560} text="P(−) × 0.3 × 0 × 0.2 = 0" size={46} color={smooth > 0.5 ? C.mute : C.red} />
        <g opacity={smooth}>
          <Typed start={at(3, 0.6)} x={960} y={680} text="(count + 1) / (tokens + |V|)" size={44} color={C.green} />
          <T x={960} y={760} size={32} weight={600}>small, but never zero</T>
        </g>
        {['generative', 'fast', 'little data', 'the baseline'].map((t, i) => <Tag key={t} start={at(4, 0.1 + i * 0.12)} x={480 + i * 320} y={900} color={C.blue} filled={i === 3} text={t} />)}
      </g>
    </Stage>
  );
};

/* ---------- 3. logistic regression ---------- */
const LR: React.FC = () => {
  const {f, at} = useScene();
  const X0 = 1000, Y0 = 720, SX = 60, SY = 380;
  const sig = (z: number) => 1 / (1 + Math.exp(-z));
  let d = '';
  for (let z = -6; z <= 6.01; z += 0.2) d += `${d ? ' L' : 'M'} ${X0 + z * SX} ${Y0 - sig(z) * SY}`;
  const z = f < at(2) ? mix(-1, 1.2, prog(f, at(1, 0.4), 30)) : mix(1.2, -2, prog(f, at(2, 0.5), 30));
  const bnd = prog(f, at(3), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Logistic regression" />
      <Tag start={at(0, 0.45)} x={960} y={230} color={C.red} filled text="a classifier, despite the name" out={at(3)} />
      <g opacity={1 - bnd}>
        {[['x₁ good', '+0.8'], ['x₂ bad', '−1.0'], ['bias', '−0.4']].map(([a, w], i) => (
          <g key={a}>
            <Chip start={at(1, 0.05 + i * 0.06)} x={190} y={420 + i * 130} text={a} size={30} />
            <T x={360} y={410 + i * 130} size={28} color={w.startsWith('+') ? C.green : C.red} o={prog(f, at(1, 0.15), 10)}>{w}</T>
            <Arrow start={at(1, 0.15 + i * 0.06)} x1={300} y1={420 + i * 130} x2={470} y2={550} color={C.mute} w={4} />
          </g>
        ))}
        <circle cx={520} cy={550} r={50} fill={C.card} stroke={C.ink} strokeWidth={4} opacity={prog(f, at(1, 0.25), 10)} />
        <T x={520} y={565} size={44} weight={750} o={prog(f, at(1, 0.25), 10)}>z</T>
        <Arrow start={at(1, 0.35)} x1={575} y1={550} x2={700} y2={550} />
        <line x1={X0 - 6 * SX} x2={X0 + 6 * SX} y1={Y0} y2={Y0} stroke={C.ink} strokeWidth={3} opacity={prog(f, at(1, 0.3), 10)} />
        <line x1={X0 - 6 * SX} x2={X0 + 6 * SX} y1={Y0 - SY / 2} y2={Y0 - SY / 2} stroke={C.orange} strokeWidth={3} strokeDasharray="10 8" opacity={prog(f, at(2, 0.3), 10)} />
        <T x={X0 + 6 * SX + 20} y={Y0 - SY / 2 + 10} size={28} anchor="start" color={C.orange} o={prog(f, at(2, 0.3), 10)}>0.5</T>
        <Draw start={at(1, 0.35)} d={d} color={C.blue} w={6} />
        <circle cx={X0 + z * SX} cy={Y0 - sig(z) * SY} r={16} fill={sig(z) >= 0.5 ? C.green : C.red} opacity={prog(f, at(1, 0.5), 10)} />
        <T x={X0} y={Y0 + 60} size={30} color={C.mute} o={prog(f, at(1, 0.4), 10)}>z →  p = σ(z) between 0 and 1</T>
        <T x={1500} y={400} size={40} weight={750} color={sig(z) >= 0.5 ? C.green : C.red} o={prog(f, at(2, 0.4), 10)}>{sig(z) >= 0.5 ? 'positive' : 'negative'}</T>
      </g>
      <g opacity={bnd}>
        {[[620, 420], [700, 560], [560, 640], [760, 380], [660, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={16} fill={C.green} />)}
        {[[1200, 640], [1300, 520], [1150, 800], [1350, 760], [1260, 880]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={16} fill={C.red} />)}
        <Draw start={at(3, 0.1)} d="M 760 980 L 1180 220" color={C.ink} w={6} />
        <Tag start={at(3, 0.3)} x={1620} y={330} color={C.blue} text="discriminative" />
        <Tag start={at(3, 0.45)} x={1620} y={420} color={C.green} text="readable weights" />
        <Tag start={at(3, 0.65)} x={1620} y={510} color={C.red} text="straight boundary" />
      </g>
    </Stage>
  );
};

/* ---------- 4. SVM ---------- */
const SVM: React.FC = () => {
  const {f, at} = useScene();
  const G = [[560, 380], [650, 500], [520, 560], [700, 330], [800, 560]], R = [[1250, 640], [1320, 520], [1180, 780], [1340, 760], [1260, 880]];
  const cand = win(f, at(1, 0.05), at(1, 0.55)), best = prog(f, at(1, 0.55), 20), sv = prog(f, at(2), 14), kern = prog(f, at(2, 0.55), 18);
  // separator x = 960 + (y - 580) * 0.35 ; margins ±150 px horizontally
  const L = (dx: number) => `M ${960 + dx + (220 - 580) * 0.35} 220 L ${960 + dx + (940 - 580) * 0.35} 940`;
  return (
    <Stage>
      <StageHeading start={at(0)} text="Support vector machine" />
      <g opacity={1 - kern}>
        {G.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={18} fill={C.green} opacity={prog(f, at(0, 0.3), 10)} />)}
        {R.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={18} fill={C.red} opacity={prog(f, at(0, 0.3), 10)} />)}
        <g opacity={cand} stroke={C.mute} strokeWidth={3}><line x1={700} y1={940} x2={1100} y2={220} /><line x1={880} y1={940} x2={1000} y2={220} /><line x1={760} y1={220} x2={1180} y2={940} /></g>
        <g opacity={best}>
          <path d={L(0)} stroke={C.ink} strokeWidth={6} />
          <path d={L(-150)} stroke={C.blue} strokeWidth={4} strokeDasharray="14 10" />
          <path d={L(150)} stroke={C.blue} strokeWidth={4} strokeDasharray="14 10" />
          <T x={1500} y={300} size={34} weight={700} color={C.blue}>widest margin</T>
        </g>
        {[[800, 560], [1180, 780]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={32} fill="none" stroke={C.orange} strokeWidth={5} opacity={sv} />)}
        <Tag start={at(2, 0.15)} x={1500} y={420} color={C.orange} text="support vectors" />
      </g>
      <g opacity={kern}>
        {[[960, 580], [900, 520], [1020, 640], [1010, 520]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={18} fill={C.green} />)}
        {[[700, 400], [1240, 420], [720, 800], [1220, 780], [960, 300], [960, 860]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={18} fill={C.red} />)}
        <Draw start={at(2, 0.65)} d="M 960 400 C 1160 400 1160 760 960 760 C 760 760 760 400 960 400" color={C.ink} w={6} />
        <Tag start={at(2, 0.75)} x={1500} y={420} color={C.purple} text="kernel: curved boundary" />
      </g>
      {['high dimensions: good', 'slow on large data', 'score is not a probability'].map((t, i) => <Tag key={t} start={at(3, 0.1 + i * 0.2)} x={1500} y={600 + i * 100} color={i ? C.red : C.green} text={t} />)}
    </Stage>
  );
};

/* ---------- 5. features and the plan ---------- */
const Features: React.FC = () => {
  const {f, at} = useScene();
  const cards: [string, string[], string, number][] = [
    ['Statistical', ['length', '"!" count', 'CAPS ratio'], C.blue, at(1)], ['Lexical', ['bag of words', 'TF-IDF', 'n-grams'], C.teal, at(1, 0.5)],
    ['Linguistic', ['POS tags', 'sentiment lexicon'], C.purple, at(2)], ['Domain', ['spam words', 'emoticons'], C.orange, at(2, 0.5)],
  ];
  const plan = prog(f, at(3), 16);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Features, then the plan" />
      <Rise start={at(0, 0.3)} x={960} y={250} size={34} color={C.mute}>the model only sees the features you give it</Rise>
      {cards.map(([t, ex, c, s], i) => (
        <Card key={t} start={s} x={300 + i * 440} y={470} w={400} h={260} stroke={c} out={at(3)}>
          <T y={-80} size={38} weight={750} color={c}>{t}</T>
          {ex.map((e, k) => <T key={e} y={-20 + k * 50} size={30}>{e}</T>)}
        </Card>
      ))}
      <g opacity={plan}>
        {['Naive Bayes', 'Logistic regression', 'SVM'].map((m, i) => (
          <g key={m}>
            <Chip start={at(3, 0.1 + i * 0.2)} x={420 + i * 540} y={760} text={m} size={40} color={[C.teal, C.blue, C.purple][i]} hi={i === 0 ? 1 : 0.2} />
            {i < 2 && <Arrow start={at(3, 0.2 + i * 0.2)} x1={i ? 1205 : 575} y1={760} x2={i ? 1420 : 715} y2={760} />}
          </g>
        ))}
        <Rise start={at(3, 0.2)} x={420} y={860} size={30} color={C.mute}>baseline first</Rise>
        <Rise start={at(3, 0.65)} x={1500} y={860} size={30} color={C.mute}>if time allows</Rise>
      </g>
    </Stage>
  );
};

export const W2Scenes = {task: Task, nb: NB, lr: LR, svm: SVM, features: Features};
void shake;
