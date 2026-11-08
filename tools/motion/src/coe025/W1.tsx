/* COE025 Week 1 · Turning text into numbers (simple). Narration: src/scripts/coe025-W1.json */
import React from 'react';
import {Arrow, C, Card, Draw, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, rowX, shake} from './kit';
import {Dot, ExamList} from './simple';

/* 1. text in, numbers out */
const Why: React.FC = () => {
  const {f, at} = useScene();
  const nums = ['0.2', '1', '0', '3', '0.7'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Text → numbers" />
      <Card start={at(0, 0.3)} x={420} y={560} w={420} h={260}><T y={-20} size={44} weight={700}>"good movie"</T><T y={50} size={30} color={C.mute}>text</T></Card>
      <Card start={at(0, 0.6)} x={1500} y={560} w={420} h={260}>
        {nums.map((n, i) => <T key={i} x={-150 + i * 75} y={10} size={44} weight={750} color={C.blue} o={prog(f, at(1, 0.4 + i * 0.06), 10)}>{n}</T>)}
        <T y={80} size={30} color={C.mute}>numbers</T>
      </Card>
      <Arrow start={at(1, 0.2)} x1={660} y1={560} x2={1260} y2={560} color={C.blue} w={8} />
      <T x={960} y={520} size={34} weight={700} color={C.blue} o={prog(f, at(1, 0.3), 12)}>every NLP method</T>
      <Tag start={at(2, 0.3)} x={760} y={830} color={C.green} text="what it keeps" />
      <Tag start={at(2, 0.55)} x={1160} y={830} color={C.red} text="what it loses" />
    </Stage>
  );
};

/* 2. bag of words: dog bites man = man bites dog */
const Bow: React.FC = () => {
  const {f, at} = useScene();
  const a = ['dog', 'bites', 'man'], b = ['man', 'bites', 'dog'];
  const xa = rowX(a, 520, 44), xb = rowX(b, 520, 44);
  const counts = (y: number, s: number) => (
    <g opacity={prog(f, s, 12)}>
      {['dog', 'bites', 'man'].map((w, i) => (
        <g key={w}><T x={1200 + i * 190} y={y - 20} size={30} color={C.mute}>{w}</T><T x={1200 + i * 190} y={y + 40} size={56} weight={800} color={C.blue}>1</T></g>
      ))}
    </g>
  );
  return (
    <Stage>
      <StageHeading start={at(0)} text="Bag of words: just count" />
      {a.map((w, i) => <Chip key={'a' + i} start={at(1, 0.05 + i * 0.12)} x={xa[i]} y={420} text={w} size={44} />)}
      <Arrow start={at(1, 0.6)} x1={820} y1={420} x2={1080} y2={420} color={C.ink} />
      {counts(420, at(1, 0.7))}
      {b.map((w, i) => <Chip key={'b' + i} start={at(2, 0.05 + i * 0.12)} x={xb[i]} y={700} text={w} size={44} color={C.purple} />)}
      <Arrow start={at(2, 0.5)} x1={820} y1={700} x2={1080} y2={700} color={C.ink} />
      {counts(700, at(2, 0.6))}
      <T x={1390} y={590} size={60} weight={800} color={C.red} o={prog(f, at(2, 0.8), 10)}>=</T>
      <Tag start={at(3, 0.2)} x={960} y={910} color={C.red} text="word order is lost" filled />
    </Stage>
  );
};

/* 3. embeddings: similar words close */
const Embed: React.FC = () => {
  const {f, at} = useScene();
  const ax = (s: number) => <g opacity={prog(f, s, 14)}><line x1={300} y1={900} x2={1300} y2={900} stroke={C.line} strokeWidth={4} /><line x1={300} y1={900} x2={300} y2={250} stroke={C.line} strokeWidth={4} /></g>;
  const ring = prog(f, at(1, 0.4), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Embeddings: words as points" />
      {ax(at(0, 0.3))}
      <Dot start={at(1, 0.1)} x={1000} y={380} color={C.green} label="good" />
      <Dot start={at(1, 0.25)} x={1110} y={440} color={C.green} label="great" />
      <ellipse cx={1055} cy={410} rx={160 * ring} ry={110 * ring} fill="none" stroke={C.green} strokeWidth={4} strokeDasharray="10 10" opacity={ring} />
      <Dot start={at(1, 0.65)} x={480} y={780} color={C.red} label="bad" />
      <Tag start={at(2, 0.2)} x={800} y={1000} color={C.blue} text="Word2Vec, GloVe" />
      <g opacity={prog(f, at(3), 14)}>
        <Card start={at(3, 0.2)} x={1600} y={420} w={420} h={110}><T y={14} size={36} weight={700}>river bank</T></Card>
        <Card start={at(3, 0.35)} x={1600} y={620} w={420} h={110}><T y={14} size={36} weight={700}>bank loan</T></Card>
        <Arrow start={at(3, 0.5)} x1={1390} y1={430} x2={900} y2={640} color={C.orange} />
        <Arrow start={at(3, 0.55)} x1={1390} y1={620} x2={910} y2={660} color={C.orange} />
        <Dot start={at(3, 0.5)} x={880} y={650} color={C.orange} label="bank" />
        <Tag start={at(3, 0.75)} x={1600} y={800} color={C.red} text="same point" />
      </g>
    </Stage>
  );
};

/* 4. contextual: each bank its own vector */
const Context: React.FC = () => {
  const {f, at} = useScene();
  const split = prog(f, at(1, 0.4), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Contextual models (BERT)" />
      <Card start={at(0, 0.3)} x={960} y={330} w={900} h={120} stroke={C.blue}><T y={14} size={40} weight={700}>reads the whole sentence</T></Card>
      <Dot start={at(1, 0.1)} x={mix(960, 640, split)} y={620} color={C.teal} label="bank (river)" r={20} />
      <Dot start={at(1, 0.1)} x={mix(960, 1280, split)} y={620} color={C.purple} label="bank (money)" r={20} />
      <g opacity={prog(f, at(2, 0.1), 14)}>
        {['big', 'slow', 'expensive'].map((w, i) => <Tag key={w} start={at(2, 0.15 + i * 0.15)} x={620 + i * 340} y={860} color={C.red} text={w} />)}
      </g>
    </Stage>
  );
};

const Exam: React.FC = () => <ExamList items={['Bag of words loses the order', 'Embeddings: similar words close, one vector per word', 'Simple task (spam): cheap model first']} />;

export const W1Scenes: Record<string, React.FC> = {why: Why, bow: Bow, embed: Embed, context: Context, exam: Exam};
