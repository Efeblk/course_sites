/* COE025 Week 2 · Text classification (simple). Narration: src/scripts/coe025-W2.json */
import React from 'react';
import {Arrow, C, Card, mix, prog, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, Typed} from './kit';
import {Dot, ExamList} from './simple';

/* 1. text in, one label out */
const Task: React.FC = () => {
  const {f, at} = useScene();
  return (
    <Stage>
      <StageHeading start={at(0)} text="Text classification" />
      <Card start={at(0, 0.3)} x={500} y={480} w={520} h={160}><T y={-10} size={36} weight={700}>"Win a free phone!!!"</T><T y={45} size={28} color={C.mute}>email</T></Card>
      <Arrow start={at(1, 0.1)} x1={790} y1={480} x2={1180} y2={480} color={C.blue} w={7} />
      <Tag start={at(1, 0.3)} x={1400} y={480} color={C.red} text="spam" filled />
      <Card start={at(1, 0.5)} x={500} y={720} w={520} h={160}><T y={-10} size={36} weight={700}>"What a good movie"</T><T y={45} size={28} color={C.mute}>review</T></Card>
      <Arrow start={at(1, 0.65)} x1={790} y1={720} x2={1180} y2={720} color={C.blue} w={7} />
      <Tag start={at(1, 0.8)} x={1400} y={720} color={C.green} text="positive" filled />
      <g opacity={prog(f, at(2, 0.2), 14)}>
        {['Naive Bayes', 'Logistic regression', 'Support vector machine'].map((w, i) => <Tag key={w} start={at(2, 0.2 + i * 0.15)} x={520 + i * 440} y={930} color={C.blue} text={w} />)}
      </g>
    </Stage>
  );
};

/* 2. Naive Bayes: word counts per class vote */
const NB: React.FC = () => {
  const {f, at} = useScene();
  return (
    <Stage>
      <StageHeading start={at(0)} text="Naive Bayes: words vote" />
      <T x={620} y={300} size={36} weight={700} color={C.green} o={prog(f, at(1), 10)}>positive reviews</T>
      <T x={1300} y={300} size={36} weight={700} color={C.red} o={prog(f, at(1), 10)}>negative reviews</T>
      <Bar start={at(1, 0.15)} x={540} y={720} h={300} color={C.green} label="good" />
      <Bar start={at(1, 0.25)} x={700} y={720} h={60} color={C.green} label="bad" />
      <Bar start={at(1, 0.55)} x={1220} y={720} h={60} color={C.red} label="good" />
      <Bar start={at(1, 0.65)} x={1380} y={720} h={300} color={C.red} label="bad" />
      <g opacity={prog(f, at(2), 12)}>
        <Chip start={at(2, 0.05)} x={960} y={880} text='"good movie"' size={40} />
        <Arrow start={at(2, 0.4)} x1={1100} y1={880} x2={1400} y2={880} color={C.green} />
        <Tag start={at(2, 0.6)} x={1580} y={880} color={C.green} text="positive wins" filled />
      </g>
      <Tag start={at(3, 0.3)} x={500} y={880} color={C.orange} text="naive = words independent" />
    </Stage>
  );
};

/* 3. logistic regression: weights add up, sigmoid squashes */
const LR: React.FC = () => {
  const {f, at} = useScene();
  const pts = Array.from({length: 61}, (_, i) => { const z = -6 + i * 0.2; return [1000 + z * 75, 860 - 420 / (1 + Math.exp(-z))]; });
  const d = 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');
  const mark = prog(f, at(3, 0.1), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Logistic regression" />
      <Chip start={at(0, 0.5)} x={330} y={360} text="good  +0.8" size={38} color={C.green} mono />
      <Chip start={at(1, 0.4)} x={330} y={480} text="bad  −1.0" size={38} color={C.red} mono />
      <Typed start={at(1, 0.7)} x={330} y={620} text="score z" size={40} />
      <g opacity={prog(f, at(2), 14)}>
        <line x1={550} y1={860} x2={1450} y2={860} stroke={C.line} strokeWidth={4} />
        <line x1={1000} y1={880} x2={1000} y2={420} stroke={C.line} strokeWidth={3} strokeDasharray="8 8" />
        <T x={520} y={450} size={30} color={C.mute} anchor="end">1</T><T x={520} y={870} size={30} color={C.mute} anchor="end">0</T>
      </g>
      <path d={d} fill="none" stroke={C.blue} strokeWidth={7} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(f, at(2, 0.2), 40)} />
      <T x={1480} y={480} size={34} weight={700} color={C.blue} anchor="start" o={prog(f, at(2, 0.6), 12)}>probability</T>
      <g opacity={mark}>
        <line x1={550} y1={650} x2={1450} y2={650} stroke={C.orange} strokeWidth={4} strokeDasharray="12 10" />
        <T x={1480} y={662} size={34} weight={700} color={C.orange} anchor="start">0.5</T>
        <T x={1250} y={590} size={34} weight={700} color={C.green}>positive</T>
        <T x={750} y={790} size={34} weight={700} color={C.red}>negative</T>
      </g>
      <Tag start={at(3, 0.7)} x={330} y={800} color={C.purple} text="a classifier" />
    </Stage>
  );
};

/* 4. SVM: widest gap */
const POS: [number, number][] = [[1250, 380], [1380, 470], [1180, 520], [1330, 600]];
const NEG: [number, number][] = [[560, 600], [680, 700], [520, 760], [700, 820]];
const SVM: React.FC = () => {
  const {f, at} = useScene();
  const g = prog(f, at(2, 0.3), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="SVM: the widest gap" />
      {POS.map(([x, y], i) => <Dot key={'p' + i} start={at(1, 0.1 + i * 0.06)} x={x} y={y} color={C.green} r={22} />)}
      {NEG.map(([x, y], i) => <Dot key={'n' + i} start={at(1, 0.4 + i * 0.06)} x={x} y={y} color={C.red} r={22} />)}
      <g opacity={g}>
        <line x1={mix(940, 800, 1)} y1={240} x2={mix(940, 1080, 1)} y2={960} stroke={C.blue} strokeWidth={7} />
        <line x1={800 - 110} y1={240} x2={1080 - 110} y2={960} stroke={C.blue} strokeWidth={3} strokeDasharray="12 10" opacity={0.7} />
        <line x1={800 + 110} y1={240} x2={1080 + 110} y2={960} stroke={C.blue} strokeWidth={3} strokeDasharray="12 10" opacity={0.7} />
        <T x={1300} y={250} size={36} weight={700} color={C.blue}>← margin →</T>
      </g>
      <Tag start={at(3, 0.4)} x={960} y={1010} color={C.red} text="score ≠ probability" />
    </Stage>
  );
};

const Exam: React.FC = () => <ExamList items={['Naive Bayes: word counts per class, fast baseline', 'Logistic regression: a probability', 'SVM: the widest margin', 'Project: Naive Bayes first, then the others']} />;

export const W2Scenes: Record<string, React.FC> = {task: Task, nb: NB, lr: LR, svm: SVM, exam: Exam};
