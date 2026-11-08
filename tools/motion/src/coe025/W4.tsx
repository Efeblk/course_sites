/* COE025 Week 4 · Parts of speech and named entities (simple). Narration: src/scripts/coe025-W4.json */
import React from 'react';
import {C, Mark, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, rowX, shake, tw} from './kit';
import {ExamList} from './simple';

/* tag chip under a word */
const Lab: React.FC<{start: number; x: number; y: number; text: string; color: string}> = (p) => <Chip {...p} size={30} hi={1} mono />;

/* 1. POS: book verb vs book noun */
const Pos: React.FC = () => {
  const {at} = useScene();
  const a = ['Book', 'that', 'flight'], b = ['Hand', 'me', 'that', 'book'];
  const xa = rowX(a, 960, 42, 30), xb = rowX(b, 960, 42, 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Part of speech tagging" />
      <Rise start={at(1, 0.2)} x={960} y={240} size={34} color={C.mute}>one grammar label for every word</Rise>
      {a.map((w, i) => <Chip key={'a' + i} start={at(2, i * 0.08)} x={xa[i]} y={400} text={w} size={42} color={i === 0 ? C.orange : C.blue} />)}
      <Lab start={at(2, 0.45)} x={xa[0]} y={500} text="VERB" color={C.orange} />
      {b.map((w, i) => <Chip key={'b' + i} start={at(3, i * 0.06)} x={xb[i]} y={700} text={w} size={42} color={i === 3 ? C.purple : C.blue} />)}
      <Lab start={at(3, 0.4)} x={xb[3]} y={800} text="NOUN" color={C.purple} />
      <Tag start={at(3, 0.7)} x={960} y={940} color={C.green} text="the context decides" filled />
    </Stage>
  );
};

/* 2. few ambiguous types, but they are common */
const Amb: React.FC = () => {
  const {f, at} = useScene();
  const base = at(3, 0.5);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Why tagging is hard" />
      <T x={620} y={330} size={34} weight={700} o={prog(f, at(0, 0.3), 10)}>word types</T>
      <Bar start={at(0, 0.4)} x={520} y={760} h={360} color={C.soft} label="clear" />
      <Bar start={at(0, 0.6)} x={720} y={760} h={70} color={C.orange} label="ambiguous" />
      {['that', 'back', 'book'].map((w, i) => <Chip key={w} start={at(1, 0.2 + i * 0.12)} x={1130 + i * 170} y={330} text={w} size={36} color={C.orange} />)}
      <T x={1300} y={480} size={34} weight={700} o={prog(f, at(2), 10)}>words in real text</T>
      <Bar start={at(2, 0.2)} x={1200} y={760} h={150} color={C.soft} label="clear" />
      <Bar start={at(2, 0.3)} x={1400} y={760} h={220} color={C.orange} label="ambiguous" />
      <g opacity={prog(f, at(3), 12)}>
        <Chip start={at(3, 0.1)} x={760} y={930} text="book → always NOUN" size={36} color={C.blue} mono />
        <g transform={`translate(${shake(f, base + 8)} 0)`}><Chip start={base} x={1260} y={930} text="Book that flight" size={36} color={C.red} /></g>
        <Mark start={base + 8} x={1500} y={930} ok={false} size={46} />
      </g>
    </Stage>
  );
};

/* 3. NER: boundaries + type */
const Ner: React.FC = () => {
  const {f, at} = useScene();
  const s = ['She', 'flew', 'to', 'San', 'Francisco'];
  const xs = rowX(s, 960, 42, 26);
  const span = prog(f, at(2, 0.5), 18);
  const types: [string, string][] = [['Person', C.purple], ['City', C.teal], ['Government', C.orange]];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Named entity recognition" />
      {['Person', 'Organization', 'Location'].map((t, i) => <Tag key={t} start={at(1, 0.1 + i * 0.15)} x={560 + i * 400} y={250} color={[C.purple, C.orange, C.teal][i]} text={t} />)}
      {s.map((w, i) => <Chip key={w} start={at(2, 0.05 + i * 0.05)} x={xs[i]} y={430} text={w} size={42} color={i >= 3 ? C.teal : C.blue} />)}
      <rect x={xs[3] - tw('San', 42) / 2 - 14} y={370} width={(xs[4] - xs[3] + tw('San', 42) / 2 + tw('Francisco', 42) / 2 + 28) * span} height={120} rx={20} fill="none" stroke={C.teal} strokeWidth={6} opacity={span} />
      <T x={(xs[3] + xs[4]) / 2} y={540} size={32} weight={700} color={C.teal} o={span}>1. where it starts and ends</T>
      <Chip start={at(3, 0.1)} x={960} y={700} text="Washington" size={46} color={C.ink} />
      {types.map(([t, c], i) => <Tag key={t} start={at(3, 0.35 + i * 0.12)} x={560 + i * 400} y={840} color={c} text={t} />)}
      <T x={960} y={950} size={32} weight={700} color={C.orange} o={prog(f, at(3, 0.6), 10)}>2. which type</T>
    </Stage>
  );
};

/* 4. BIO */
const Bio: React.FC = () => {
  const {at} = useScene();
  const s = ['She', 'flew', 'to', 'San', 'Francisco'], tags = ['O', 'O', 'O', 'B-LOC', 'I-LOC'];
  const xs = rowX(s, 960, 42, 40);
  return (
    <Stage>
      <StageHeading start={at(0)} text="B I O: one label per word" />
      {[['B', 'begin', C.teal], ['I', 'inside', C.green], ['O', 'outside', C.mute]].map(([k, v, c], i) => (
        <Tag key={k} start={at(1, 0.05 + i * 0.25)} x={560 + i * 400} y={300} color={c} text={`${k} = ${v}`} />
      ))}
      {s.map((w, i) => <Chip key={w} start={at(0, 0.4 + i * 0.05)} x={xs[i]} y={540} text={w} size={42} />)}
      {tags.map((t, i) => {
        const st = i === 3 ? at(2, 0.05) : i === 4 ? at(2, 0.3) : at(2, 0.6 + i * 0.05);
        return <Lab key={i} start={st} x={xs[i]} y={680} text={t} color={i >= 3 ? (i === 3 ? C.teal : C.green) : C.mute} />;
      })}
    </Stage>
  );
};

const Exam: React.FC = () => <ExamList items={['Same word, different tags: context decides', 'NER = boundaries + type (harder than POS)', 'BIO: one label per word']} />;

export const W4Scenes: Record<string, React.FC> = {pos: Pos, amb: Amb, ner: Ner, bio: Bio, exam: Exam};
