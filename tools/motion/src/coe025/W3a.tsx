/* COE025 Week 3, part 1 · Classical classifiers by hand. Narration: src/scripts/coe025-W3a.json */
import React from 'react';
import {Arrow, C, Card, Draw, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, Count, MONO, shake, Typed, win} from './kit';

const DOCS: [string, string, string][] = [['d1', 'good good movie', '+'], ['d2', 'good movie', '+'], ['d3', 'bad bad movie', '−'], ['d4', 'bad movie', '−']];

/* ---------- 1. the toy corpus and leakage ---------- */
const Corpus: React.FC = () => {
  const {f, at} = useScene();
  const split = prog(f, at(3), 18);
  return (
    <Stage>
      <StageHeading start={at(0)} text="One tiny corpus, worked by hand" />
      <Tag start={at(0, 0.6)} x={960} y={225} color={C.red} filled text="no calculator in the exam" out={at(1)} />
      <g opacity={1 - split}>
        {DOCS.map(([id, txt, lab], i) => (
          <Card key={id} start={at(1, 0.1 + i * 0.12)} x={520} y={330 + i * 150} w={560} h={120} stroke={lab === '+' ? C.green : C.red}>
            <T x={-240} y={12} size={30} anchor="start" color={C.mute} weight={700}>{id}</T>
            <T x={10} y={12} size={34}>{txt}</T>
            <T x={235} y={14} size={40} weight={800} color={lab === '+' ? C.green : C.red}>{lab}</T>
          </Card>
        ))}
        {[['documents', 4], ['word types', 3], ['tokens', 10], ['tokens per class', 5]].map(([l, v], i) => (
          <g key={l as string} opacity={prog(f, at(2, i * 0.18), 10)}>
            <Count start={at(2, i * 0.18)} b={v as number} x={1180} y={370 + i * 140} size={70} color={C.blue} />
            <T x={1260} y={360 + i * 140} size={34} anchor="start">{l as string}</T>
          </g>
        ))}
      </g>
      <g opacity={split}>
        {[['TRAIN', 'fit vocabulary + IDF', C.green], ['VALIDATION', 'transform only', C.blue], ['TEST', 'transform only', C.purple]].map(([a, b, c], i) => (
          <Card key={a} start={at(3, 0.05 + i * 0.1)} x={420 + i * 540} y={500} w={460} h={200} stroke={c} sw={5}>
            <T y={-25} size={40} weight={800} color={c}>{a}</T>
            <T y={35} size={30}>{b}</T>
          </Card>
        ))}
        <Arrow start={at(3, 0.3)} x1={660} y1={500} x2={680} y2={500} />
        <Arrow start={at(3, 0.35)} x1={1200} y1={500} x2={1220} y2={500} />
        <g transform={`translate(${shake(f, at(3, 0.6))} 0)`} opacity={prog(f, at(3, 0.55), 10)}>
          <Chip start={at(3, 0.55)} x={1500} y={760} text="fit_transform(test)" size={36} color={C.red} mono />
        </g>
        <Mark start={at(3, 0.65)} x={1760} y={760} ok={false} size={54} />
        <Rise start={at(3, 0.7)} x={1500} y={860} size={30} color={C.red}>leakage</Rise>
      </g>
    </Stage>
  );
};

/* ---------- 2. Naive Bayes, every number ---------- */
const NB: React.FC = () => {
  const {f, at} = useScene();
  const tab = win(f, at(1), at(3)), cls = prog(f, at(3), 16);
  const rows: [string, number[], string][] = [['+', [4, 1, 3], C.green], ['−', [1, 4, 3], C.red]];
  const S = [0.09375, 0.0234375], post = prog(f, at(4), 26);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Naive Bayes, every number" />
      <g opacity={1 - cls}>
        <T x={380} y={290} size={34} weight={700} o={prog(f, at(0, 0.3), 10)}>prior: count documents</T>
        {[0, 1, 2, 3].map((i) => <rect key={i} x={220 + i * 85} y={330} width={60} height={80} rx={8} fill={i < 2 ? C.green : C.red} opacity={prog(f, at(0, 0.35 + i * 0.05), 10)} />)}
        <Typed start={at(0, 0.6)} x={380} y={480} text="P(+) = 2/4 = 0.5" size={40} />
      </g>
      <g opacity={tab}>
        <Typed start={at(1, 0.15)} x={1200} y={290} text="P(t|c) = (count + 1) / (5 + 3)" size={42} />
        {['good', 'bad', 'movie'].map((w, k) => <T key={w} x={1000 + k * 210} y={400} size={32} color={C.mute} o={prog(f, at(1, 0.4), 10)}>{w}</T>)}
        {rows.map(([c, v, col], r) => (
          <g key={c} opacity={prog(f, at(1, 0.5 + r * 0.1), 10)}>
            <T x={870} y={485 + r * 100} size={44} weight={800} color={col}>{c}</T>
            {v.map((n, k) => {
              const hi = k === 0 ? prog(f, at(2, 0.15 + r * 0.35), 12) : 0;
              return <g key={k}><rect x={1000 + k * 210 - 85} y={445 + r * 100} width={170} height={70} rx={10} fill={hi ? col : C.card} fillOpacity={hi ? 0.85 : 1} stroke={C.line} strokeWidth={3} />
                <T x={1000 + k * 210} y={492 + r * 100} size={34} font={MONO} color={hi ? '#fff' : C.ink}>{`${n}/8`}</T></g>;
            })}
          </g>
        ))}
        <Rise start={at(2, 0.4)} x={1210} y={720} size={34} color={C.green}>P(good|+) = 4/8 = 0.5</Rise>
        <Rise start={at(2, 0.75)} x={1210} y={780} size={34} color={C.red}>P(good|−) = 1/8 = 0.125</Rise>
      </g>
      <g opacity={cls}>
        <Chip start={at(3)} x={960} y={260} text="good movie" size={40} />
        <Typed start={at(3, 0.1)} x={960} y={400} text="+ :  0.5 × 0.5 × 0.375 = 0.0938" size={42} color={C.green} />
        <Typed start={at(3, 0.5)} x={960} y={480} text="− :  0.5 × 0.125 × 0.375 = 0.0234" size={42} color={C.red} />
        <g opacity={prog(f, at(4), 12)}>
          <rect x={460} y={600} width={1000 * 0.8 * post} height={90} rx={10} fill={C.green} />
          <rect x={460 + 800 * post} y={600} width={1000 * 0.2 * post} height={90} rx={10} fill={C.red} />
          <T x={460 + 400 * post} y={660} size={40} weight={800} color="#fff">0.8</T>
          <T x={460 + 800 * post + 100 * post} y={660} size={34} weight={800} color="#fff" o={post}>0.2</T>
          <T x={960} y={760} size={32} color={C.mute}>0.0938 / (0.0938 + 0.0234)</T>
        </g>
        <Tag start={at(4, 0.55)} x={960} y={880} color={C.red} text="model probability, not accuracy" />
      </g>
    </Stage>
  );
};

/* ---------- 3. logistic regression ---------- */
const LR: React.FC = () => {
  const {f, at} = useScene();
  const X0 = 1250, Y0 = 760, SX = 70, SY = 330;
  const sig = (z: number) => 1 / (1 + Math.exp(-z));
  let d = '';
  for (let z = -5; z <= 5.01; z += 0.2) d += `${d ? ' L' : 'M'} ${X0 + z * SX} ${Y0 - sig(z) * SY}`;
  const curve = win(f, at(2), at(3)), grad = prog(f, at(3), 16), wUp = prog(f, at(4, 0.2), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Logistic regression, one step" />
      {[['x', '[2, 0]'], ['w', '[0.8, −1]'], ['b', '−0.4']].map(([a, v], i) => (
        <g key={a}><T x={170} y={300 + i * 80} size={36} weight={750} anchor="start" o={prog(f, at(0, 0.2 + i * 0.15), 10)}>{a}</T>
          <Chip start={at(0, 0.2 + i * 0.15)} x={380} y={290 + i * 80} text={v} size={34} mono /></g>))}
      <Typed start={at(1, 0.05)} x={170} y={600} text="z = 0.8×2 + (−1)×0 − 0.4" size={40} anchor="start" />
      <Typed start={at(1, 0.6)} x={170} y={670} text="  = 1.2" size={48} anchor="start" color={C.blue} weight={750} />
      <g opacity={curve}>
        <line x1={X0 - 5 * SX} x2={X0 + 5 * SX} y1={Y0} y2={Y0} stroke={C.ink} strokeWidth={3} />
        <path d={d} stroke={C.blue} strokeWidth={6} fill="none" />
        <line x1={X0 + 1.2 * SX} x2={X0 + 1.2 * SX} y1={Y0} y2={Y0 - sig(1.2) * SY} stroke={C.orange} strokeWidth={3} strokeDasharray="8 6" opacity={prog(f, at(2, 0.3), 10)} />
        <circle cx={X0 + 1.2 * SX} cy={Y0 - sig(1.2) * SY} r={16} fill={C.green} opacity={prog(f, at(2, 0.3), 10)} />
        <T x={X0 + 1.2 * SX + 30} y={Y0 - sig(1.2) * SY - 20} size={36} weight={750} anchor="start" o={prog(f, at(2, 0.4), 10)}>p ≈ 0.77</T>
        <Tag start={at(2, 0.6)} x={X0} y={330} color={C.green} filled text="positive" />
      </g>
      <g opacity={grad}>
        <Typed start={at(3, 0.15)} x={1300} y={330} text="∂L/∂w = (p − y) · x" size={48} />
        <Typed start={at(4, 0.05)} x={1300} y={460} text="(0.77 − 1) × 2 ≈ −0.46" size={42} color={C.red} />
        <Rise start={at(4, 0.3)} x={1300} y={540} size={32} color={C.mute}>w ← w − η·g : a negative gradient raises w</Rise>
        <rect x={1590} y={720 - 200 * mix(0.8, 0.846, wUp) / 0.846} width={120} height={200 * mix(0.8, 0.846, wUp) / 0.846} rx={8} fill={C.blue} opacity={prog(f, at(4, 0.2), 10)} />
        <Count start={at(4, 0.2)} a={0.8} b={0.846} dur={30} x={1650} y={790} size={40} fmt={(v) => v.toFixed(3)} />
        <Tag start={at(4, 0.7)} x={1200} y={680} color={C.orange} text="x = 0 → bias still learns" />
      </g>
    </Stage>
  );
};

/* ---------- 4. SVM margin and hinge loss ---------- */
const SVM: React.FC = () => {
  const {f, at} = useScene();
  const ox = 900, oy = 820, s = 220; // m in [-1, 2], loss in [0, 2]
  const px = (m: number) => ox + m * s, py = (l: number) => oy - l * s * 0.8;
  const p1 = prog(f, at(2), 14), p2 = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="SVM: margin and hinge loss" />
      <Typed start={at(0, 0.1)} x={420} y={290} text="f(x) = good − bad" size={42} />
      <Typed start={at(0, 0.55)} x={420} y={360} text="m = y · f(x)" size={42} />
      <Typed start={at(1, 0.1)} x={420} y={480} text="x = [1, 2] → f = −1" size={36} />
      <Typed start={at(1, 0.5)} x={420} y={540} text="y = −1 → m = 1" size={36} color={C.blue} />
      <Typed start={at(2, 0.05)} x={420} y={660} text="L = max(0, 1 − m)" size={42} />
      <g opacity={prog(f, at(1), 12)}>
        <line x1={px(-1)} x2={px(2.2)} y1={oy} y2={oy} stroke={C.ink} strokeWidth={3} />
        <line x1={px(0)} x2={px(0)} y1={oy} y2={py(2.2)} stroke={C.ink} strokeWidth={3} />
        {[-1, 0, 1, 2].map((m) => <T key={m} x={px(m)} y={oy + 44} size={30} color={C.mute}>{m}</T>)}
        <T x={px(2.2) + 20} y={oy + 10} size={32} anchor="start" weight={700}>m</T>
        <T x={px(0) - 20} y={py(2.2)} size={32} anchor="end" weight={700}>loss</T>
      </g>
      <Draw start={at(2, 0.2)} d={`M ${px(-1)} ${py(2)} L ${px(1)} ${py(0)} L ${px(2.1)} ${py(0)}`} color={C.purple} w={7} />
      <circle cx={px(1)} cy={py(0)} r={18} fill={C.green} opacity={p1} />
      <T x={px(1) + 30} y={py(0) - 40} size={34} weight={750} anchor="start" color={C.green} o={p1}>m = 1, loss 0</T>
      <circle cx={px(0.5)} cy={py(0.5)} r={18} fill={C.orange} opacity={p2} />
      <T x={px(0.5) + 30} y={py(0.5) - 30} size={34} weight={750} anchor="start" color={C.orange} o={p2}>f = 0.5: right side, loss 0.5</T>
      <Tag start={at(3, 0.6)} x={1450} y={330} color={C.red} text="correct sign ≠ zero loss" />
    </Stage>
  );
};

/* ---------- 5. negation ---------- */
const Negation: React.FC = () => {
  const {f, at} = useScene();
  const bi = prog(f, at(2), 16);
  return (
    <Stage>
      <StageHeading start={at(0)} text={'Where they fail: "not good"'} />
      <Chip start={at(0, 0.3)} x={960} y={260} text="not good" size={46} color={C.red} />
      <Rise start={at(0, 0.5)} x={960} y={340} size={30} color={C.mute}>true label: negative</Rise>
      <Card start={at(1)} x={520} y={600} w={760} h={330} stroke={C.mute}>
        <T y={-110} size={32} weight={700} color={C.mute}>unigrams</T>
        <T y={-50} size={34} font={MONO}>not × 0 + good × 0.8 − 0.4</T>
        <T y={20} size={44} font={MONO} weight={750} color={C.red}>z = +0.4</T>
        <T y={90} size={34} weight={700} color={C.red}>→ positive</T>
      </Card>
      <Mark start={at(1, 0.75)} x={890} y={460} ok={false} size={56} />
      <g opacity={bi}>
        <Card start={at(2)} x={1400} y={600} w={760} h={330} stroke={C.green} sw={5}>
          <T y={-110} size={32} weight={700} color={C.green}>+ bigram "not good"</T>
          <T y={-50} size={32} font={MONO}>0 + 0.8 + 1 × (−1.2) − 0.4</T>
          <T y={20} size={44} font={MONO} weight={750} color={C.green}>z = −0.8</T>
          <T y={90} size={34} weight={700} color={C.green}>→ negative</T>
        </Card>
        <Mark start={at(2, 0.75)} x={1770} y={460} ok size={56} />
      </g>
      <Tag start={at(3, 0.3)} x={960} y={880} color={C.blue} filled text="fix the representation, not the classifier" />
    </Stage>
  );
};

export const W3aScenes = {corpus: Corpus, nb: NB, lr: LR, svm: SVM, negation: Negation};
