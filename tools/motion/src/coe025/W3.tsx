/* COE025 Week 3 · From counts to BERT (simple). Narration: src/scripts/coe025-W3.json */
import React from 'react';
import {Arrow, C, Card, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, rowX, shake} from './kit';
import {ExamList, Glow} from './simple';

/* 1. TF-IDF: everywhere = weak */
const DOCS = ['good good movie', 'good movie', 'bad bad movie', 'bad movie'];
const TfIdf: React.FC = () => {
  const {f, at} = useScene();
  return (
    <Stage>
      <StageHeading start={at(0)} text="TF-IDF: common words count less" />
      {DOCS.map((d, i) => (
        <Card key={d} start={at(0, 0.2 + i * 0.08)} x={330 + i * 420} y={330} w={380} h={110}>
          <T y={12} size={34} weight={650}>{d.split(' ').map((w, j) => <tspan key={j} fill={w === 'movie' && f > at(0, 0.7) ? C.orange : w === 'good' && f > at(3) ? C.green : C.ink}>{(j ? ' ' : '') + w}</tspan>)}</T>
        </Card>
      ))}
      <Rise start={at(1, 0.2)} x={960} y={520} size={36} color={C.mute}>everywhere = tells us nothing</Rise>
      <T x={720} y={900} size={36} weight={700} o={prog(f, at(2), 10)}>movie</T>
      <Bar start={at(2, 0.2)} x={720} y={850} h={4} color={C.orange} value="weight 0" o={prog(f, at(2), 10)} />
      <T x={720} y={950} size={28} color={C.mute} o={prog(f, at(2, 0.3), 10)}>in 4 of 4 reviews</T>
      <T x={1200} y={900} size={36} weight={700} o={prog(f, at(3), 10)}>good</T>
      <Bar start={at(3, 0.2)} x={1200} y={850} h={220} color={C.green} value="kept" />
      <T x={1200} y={950} size={28} color={C.mute} o={prog(f, at(3, 0.3), 10)}>in 2 of 4 reviews</T>
    </Stage>
  );
};

/* 2. train / test wall */
const Split: React.FC = () => {
  const {f, at} = useScene();
  const peek = at(3, 0.4);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Fit on the training set only" />
      <Card start={at(1, 0.05)} x={560} y={560} w={560} h={420} stroke={C.blue}><T y={-150} size={40} weight={750} color={C.blue}>training set</T></Card>
      <Card start={at(1, 0.4)} x={1400} y={560} w={420} h={420} stroke={C.purple}><T y={-150} size={40} weight={750} color={C.purple}>test set</T><T y={-100} size={28} color={C.mute}>the model's final exam</T></Card>
      <Chip start={at(2, 0.3)} x={560} y={560} text="vocabulary + weights" size={36} color={C.green} hi={prog(f, at(2, 0.6), 12)} />
      <Arrow start={at(3, 0.05)} x1={850} y1={560} x2={1180} y2={560} color={C.green} w={7} />
      <T x={1015} y={520} size={30} weight={700} color={C.green} o={prog(f, at(3, 0.1), 10)}>only apply</T>
      <g transform={`translate(${shake(f, peek + 10)} 0)`} opacity={prog(f, peek, 12)}>
        <Arrow start={peek} x1={1180} y1={720} x2={850} y2={720} color={C.red} w={6} />
        <T x={1015} y={790} size={30} weight={700} color={C.red}>leak</T>
      </g>
      <Mark start={peek + 12} x={1015} y={860} ok={false} size={50} />
    </Stage>
  );
};

/* 3. RNN memory fades, LSTM gates keep it */
const WORDS = ['the', 'film', 'was', 'long', 'but', 'great'];
const Rnn: React.FC = () => {
  const {f, at} = useScene();
  const xs = rowX(WORDS, 960, 38, 40);
  const lstm = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Reading word by word" />
      {WORDS.map((w, i) => <Chip key={w} start={at(0, 0.4 + i * 0.07)} x={xs[i]} y={380} text={w} size={38} />)}
      {WORDS.map((w, i) => {
        const s = at(1, 0.1 + i * 0.1);
        const fade = f > at(2) ? Math.max(0.12, 1 - (WORDS.length - 1 - i) * 0.18 * prog(f, at(2, 0.1), 30)) : 1;
        const keep = mix(fade, 1, lstm);
        return (
          <g key={'m' + i} opacity={prog(f, s, 10)}>
            <circle cx={xs[i]} cy={580} r={44} fill={lstm > 0.5 ? C.green : C.blue} opacity={keep} />
            {i < WORDS.length - 1 && <line x1={xs[i] + 48} y1={580} x2={xs[i + 1] - 48} y2={580} stroke={C.ink} strokeWidth={4} opacity={prog(f, s + 6, 10)} />}
          </g>
        );
      })}
      <T x={300} y={590} size={32} weight={700} color={C.blue} anchor="end" o={prog(f, at(1), 10)}>memory</T>
      <Tag start={at(2, 0.5)} x={560} y={740} color={C.red} text="early words fade" />
      <g opacity={lstm}>
        {['keep', 'write', 'show'].map((w, i) => <Tag key={w} start={at(3, 0.35 + i * 0.12)} x={760 + i * 260} y={860} color={C.green} text={w} filled />)}
        <T x={960} y={960} size={34} weight={700} color={C.green}>LSTM gates</T>
      </g>
    </Stage>
  );
};

/* 4. attention: every word looks at every word */
const SENT = ['the', 'animal', 'was', 'tired', 'because', 'it'];
const Attn: React.FC = () => {
  const {f, at} = useScene();
  const xs = rowX(SENT, 960, 38, 36);
  const all = prog(f, at(1, 0.1), 30), focus = prog(f, at(2, 0.4), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Attention" />
      {SENT.map((w, i) => <Chip key={w} start={at(0, 0.4 + i * 0.05)} x={xs[i]} y={620} text={w} size={38} color={i === 5 && focus > 0 ? C.orange : C.blue} hi={i === 5 ? focus : i === 1 ? focus * 0.6 : 0} />)}
      {SENT.map((_, i) => SENT.map((__, j) => {
        if (i >= j) return null;
        const mid = (xs[i] + xs[j]) / 2, hgt = 120 + (j - i) * 45;
        const strong = i === 1 && j === 5;
        return <path key={`${i}-${j}`} d={`M ${xs[i]} 585 Q ${mid} ${585 - hgt * 2} ${xs[j]} 585`} fill="none" stroke={strong ? C.orange : C.blue}
          strokeWidth={strong ? mix(3, 10, focus) : 3} opacity={all * (strong ? 1 : mix(0.45, 0.12, focus))} />;
      }))}
      <Tag start={at(1, 0.5)} x={960} y={790} color={C.blue} text="all at the same time" />
      <g opacity={prog(f, at(3), 14)}>
        <Card start={at(3, 0.05)} x={620} y={930} w={520} h={110} stroke={C.purple}><T y={14} size={34} weight={700}>1. pretrain on lots of text</T></Card>
        <Arrow start={at(3, 0.5)} x1={890} y1={930} x2={1030} y2={930} color={C.purple} />
        <Card start={at(3, 0.55)} x={1300} y={930} w={520} h={110} stroke={C.green}><T y={14} size={34} weight={700}>2. add a head, fine-tune</T></Card>
      </g>
    </Stage>
  );
};

/* 5. precision vs recall */
const Eval: React.FC = () => {
  const {f, at} = useScene();
  // 10 real positives (filled), we flagged 8: 6 right, 2 wrong
  const real = Array.from({length: 10}, (_, i) => [520 + (i % 5) * 110, 420 + Math.floor(i / 5) * 110]);
  const flagged = new Set([0, 1, 2, 3, 5, 6]);
  const p = prog(f, at(1), 14), r = prog(f, at(2), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Precision and recall" />
      {real.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={38} fill={C.green} opacity={prog(f, at(0, 0.4 + i * 0.03), 10) * (r > 0 ? mix(1, flagged.has(i) ? 1 : 0.35, r) : 1)} stroke={flagged.has(i) && p > 0 ? C.blue : 'none'} strokeWidth={7} />)}
      {[[1180, 420], [1180, 530]].map(([x, y], i) => <circle key={'w' + i} cx={x} cy={y} r={38} fill={C.soft} stroke={C.blue} strokeWidth={7} opacity={p} />)}
      <Glow start={at(1, 0.1)} x={850} y={475} w={760} h={280} color={C.blue} out={at(2)} />
      <T x={960} y={760} size={40} weight={750} color={C.blue} o={p}>precision = right ÷ flagged = 6 / 8</T>
      <T x={960} y={850} size={40} weight={750} color={C.green} o={r}>recall = found ÷ really there = 6 / 10</T>
      <Tag start={at(3, 0.2)} x={960} y={960} color={C.purple} text="F1 combines both" filled />
      <T x={1180} y={350} size={28} color={C.mute} o={p}>flagged by mistake</T>
    </Stage>
  );
};

const Exam: React.FC = () => <ExamList items={['TF-IDF makes common words weak', 'Fit on the training set only', 'RNN → LSTM → attention: more context', 'Precision = your alarms; recall = what you missed']} />;

export const W3Scenes: Record<string, React.FC> = {tfidf: TfIdf, split: Split, rnn: Rnn, attn: Attn, eval: Eval, exam: Exam};
