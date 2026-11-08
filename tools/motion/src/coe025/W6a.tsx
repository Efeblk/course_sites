/* COE025 Week 6, part 1 · Token classification. Narration: src/scripts/coe025-W6a.json */
import React from 'react';
import {C, Card, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, Count, MONO, rowX, shake, Typed, win} from './kit';

const LC = (t: string) => (t.endsWith('PER') ? C.purple : t.endsWith('LOC') ? C.green : t.endsWith('ORG') ? C.blue : C.mute);

/* ---------- 1. the contract ---------- */
const Contract: React.FC = () => {
  const {f, at} = useScene();
  const w = ['Ada', 'visits', 'Paris', '.'], X = rowX(w, 1060, 44, 90);
  const pos = ['PROPN', 'VERB', 'PROPN', 'PUNCT'], ner = ['B-PER', 'O', 'B-LOC', 'O'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Token classification: one label per token" />
      {w.map((x, i) => <Chip key={i} start={at(0, 0.3 + i * 0.05)} x={X[i]} y={330} text={x} size={44} />)}
      <T x={300} y={492} size={32} weight={700} color={C.mute} o={prog(f, at(1), 10)}>POS</T>
      {pos.map((p, i) => <Chip key={i} start={at(1, 0.2 + i * 0.12)} x={X[i]} y={480} text={p} size={32} color={C.teal} hi={1} mono />)}
      <T x={300} y={622} size={32} weight={700} color={C.mute} o={prog(f, at(2), 10)}>NER</T>
      {ner.map((p, i) => <Chip key={i} start={at(2, 0.2 + i * 0.12)} x={X[i]} y={610} text={p} size={32} color={LC(p)} hi={p === 'O' ? 0 : 1} mono />)}
      {['labels must fit together', 'entities have boundaries', 'judged as spans'].map((t, i) => <Tag key={t} start={at(3, 0.2 + i * 0.2)} x={480 + i * 480} y={820} color={C.red} text={t} />)}
    </Stage>
  );
};

/* ---------- 2. BIO rules and the flat-layer limit ---------- */
const BIO: React.FC = () => {
  const {f, at} = useScene();
  const nest = prog(f, at(3), 16);
  const seqs: [string[], boolean, number, string][] = [
    [['B-PER', 'I-PER', 'O'], true, at(0, 0.4), 'a person, then outside'],
    [['O', 'I-PER'], false, at(1, 0.05), 'no person to continue'],
    [['B-ORG', 'I-PER'], false, at(1, 0.55), 'the type changes'],
    [['B-PER', 'B-PER'], true, at(2, 0.1), 'two people side by side'],
  ];
  return (
    <Stage>
      <StageHeading start={at(0)} text="BIO has rules" />
      <Rise start={at(0, 0.2)} x={960} y={240} size={32} color={C.mute} out={at(3)}>I must continue a span of the same type</Rise>
      <g opacity={1 - nest}>
        {seqs.map(([s, ok, st, why], r) => (
          <g key={r} transform={`translate(${ok ? 0 : shake(f, st + 14)} 0)`}>
            {s.map((t, i) => <Chip key={i} start={st + i * 3} x={420 + i * 240} y={350 + r * 130} text={t} size={34} color={LC(t)} hi={t === 'O' ? 0 : 1} mono />)}
            <Mark start={st + 14} x={1180} y={350 + r * 130} ok={ok} size={50} />
            <T x={1260} y={360 + r * 130} size={32} anchor="start" o={prog(f, st + 16, 10)} color={ok ? C.green : C.red}>{why}</T>
          </g>
        ))}
      </g>
      <g opacity={nest}>
        <rect x={360} y={420} width={1200} height={150} rx={20} fill={C.blue} fillOpacity={0.12} stroke={C.blue} strokeWidth={4} />
        <T x={960} y={405} size={32} weight={800} color={C.blue}>ORG</T>
        <rect x={1050} y={445} width={480} height={100} rx={16} fill={C.green} fillOpacity={0.2} stroke={C.green} strokeWidth={4} />
        <T x={1290} y={605} size={32} weight={800} color={C.green}>LOC</T>
        <T x={700} y={510} size={44} weight={650}>University of</T><T x={1290} y={510} size={44} weight={650}>New York</T>
        <Chip start={at(3, 0.4)} x={1180} y={720} text="B-LOC or I-ORG ?" size={36} color={C.red} mono />
        <Tag start={at(3, 0.6)} x={960} y={860} color={C.red} filled text="one flat layer cannot hold nested entities" />
      </g>
    </Stage>
  );
};

/* ---------- 3. many tasks, one output shape ---------- */
const Tasks: React.FC = () => {
  const {f, at} = useScene();
  const row = (y: number, start: number, w: string[], tg: string[], col: string, lab: string, end?: number) => {
    const X = rowX(w, 1060, 34, 26);
    return <g opacity={win(f, start, end)}>
      <T x={250} y={y + 10} size={30} weight={750} anchor="start" color={col}>{lab}</T>
      {w.map((x, i) => <g key={i}><Chip start={start + i * 2} x={X[i]} y={y} text={x} size={34} />
        <Chip start={start + 10 + i * 5} x={X[i]} y={y + 90} text={tg[i]} size={26} color={tg[i] === '–' ? C.mute : col} hi={tg[i] === '–' ? 0 : 0.85} mono /></g>)}
    </g>;
  };
  return (
    <Stage>
      <StageHeading start={at(0)} text="One output shape, many tasks" />
      <Rise start={at(0, 0.3)} x={960} y={240} size={32} color={C.mute}>the task is defined by what the label means</Rise>
      {row(330, at(1), ['The', 'small', 'cat', 'sleeps'], ['B-NP', 'I-NP', 'I-NP', 'B-VP'], C.teal, 'chunking')}
      {row(540, at(2), ['fly', 'from', 'Boston', 'to', 'Paris'], ['–', '–', 'departure', '–', 'arrival'], C.orange, 'slots')}
      {row(750, at(3), ['hello', 'Ada', 'how', 'are', 'you'], [',', ',', '–', '–', '?'], C.purple, 'punctuation', at(3, 0.55))}
      <g opacity={prog(f, at(3, 0.55), 14)}>
        <Chip start={at(3, 0.55)} x={760} y={790} text="evlerden" size={40} />
        <Chip start={at(3, 0.65)} x={1260} y={790} text="NOUN · Plur · Abl" size={34} color={C.brown} hi={0.85} mono />
        <T x={250} y={800} size={30} weight={750} anchor="start" color={C.brown}>morphology</T>
      </g>
    </Stage>
  );
};

/* ---------- 4. subword alignment ---------- */
const Subword: React.FC = () => {
  const {f, at} = useScene();
  const sp = prog(f, at(1, 0.4), 20), cmp = prog(f, at(3), 14);
  const toks = ['[CLS]', 'Ada', 'Wash', '##ington', '[SEP]'], lab = ['−100', 'B-PER', 'B-PER', '−100', '−100'], X = [380, 640, 900, 1180, 1460];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Subwords must stay aligned" />
      <g opacity={1 - cmp}>
        <Chip start={at(0, 0.4)} x={640} y={300} text="Ada" size={40} color={C.purple} />
        <Chip start={at(0, 0.45)} x={1040} y={300} text="Washington" size={40} color={C.purple} />
        <Rise start={at(0, 0.6)} x={840} y={230} size={28} color={C.mute}>two people</Rise>
        {toks.map((t, i) => {
          const x = i === 2 || i === 3 ? mix(1040, X[i], sp) : X[i];
          return <Chip key={i} start={i === 0 || i === 4 ? at(1, 0.5) : at(1, 0.4)} x={x} y={470} text={t} size={34} color={i === 0 || i === 4 ? C.mute : C.purple} mono />;
        })}
        {lab.map((l, i) => <Chip key={i} start={at(2, 0.15 + i * 0.1)} x={X[i]} y={600} text={l} size={30} color={l === '−100' ? C.mute : C.purple} hi={l === '−100' ? 0 : 1} mono />)}
        <Rise start={at(2, 0.5)} x={920} y={740} size={32}>first piece gets the word's label; the rest get −100</Rise>
      </g>
      <g opacity={cmp}>
        <Card start={at(3, 0.05)} x={560} y={560} w={640} h={330} stroke={C.mute} sw={5}>
          <T y={-90} size={56} weight={800} font={MONO}>−100</T>
          <T y={-10} size={32}>ignore this position</T><T y={40} size={32}>in the loss</T>
          <T y={110} size={30} color={C.red} weight={700}>not a label</T>
        </Card>
        <Card start={at(3, 0.45)} x={1360} y={560} w={640} h={330} stroke={C.green} sw={5}>
          <T y={-90} size={56} weight={800} font={MONO}>O</T>
          <T y={-10} size={32}>"outside any entity"</T><T y={40} size={32}>a real class</T>
          <T y={110} size={30} color={C.green} weight={700}>the model learns it</T>
        </Card>
      </g>
    </Stage>
  );
};

/* ---------- 5. evaluation ---------- */
const Eval: React.FC = () => {
  const {f, at} = useScene();
  const grid = win(f, at(0), at(2)), span = prog(f, at(2), 14);
  const words = ['Ada', 'visited', 'New', 'York', '.'], X = rowX(words, 960, 40, 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Score entities as exact spans" />
      <g opacity={grid}>
        {Array.from({length: 100}, (_, i) => {
          const ent = [13, 14, 27, 41, 42, 43, 58, 76, 77, 91].includes(i);
          const x = 330 + (i % 10) * 62, y = 270 + Math.floor(i / 10) * 62;
          return <rect key={i} x={x} y={y} width={50} height={50} rx={8} fill={ent ? C.purple : C.line} opacity={prog(f, at(0, 0.2 + (i % 10) * 0.02), 10)} />;
        })}
        <g opacity={prog(f, at(1), 12)}>
          <T x={1300} y={420} size={34} weight={700}>predict O everywhere</T>
          <Count start={at(1, 0.2)} b={90} x={1300} y={540} size={80} color={C.blue} fmt={(v) => `${Math.round(v)}%`} />
          <T x={1300} y={590} size={30} color={C.mute}>token accuracy</T>
          <T x={1300} y={720} size={80} weight={750} color={C.red} o={prog(f, at(1, 0.55), 12)}>0%</T>
          <T x={1300} y={770} size={30} color={C.mute} o={prog(f, at(1, 0.55), 12)}>entities found</T>
        </g>
      </g>
      <g opacity={span}>
        <Rise start={at(2, 0.2)} x={960} y={250} size={34} weight={700}>same boundaries + same type</Rise>
        {words.map((w, i) => <T key={i} x={X[i]} y={430} size={40} weight={650} o={prog(f, at(3), 10)}>{w}</T>)}
        <T x={260} y={360} size={30} weight={750} color={C.mute} anchor="start" o={prog(f, at(3), 10)}>gold</T>
        <rect x={X[0] - 60} y={330} width={120} height={20} rx={6} fill={C.purple} opacity={prog(f, at(3, 0.1), 10)} />
        <rect x={X[2] - 60} y={330} width={X[3] - X[2] + 120} height={20} rx={6} fill={C.green} opacity={prog(f, at(3, 0.2), 10)} />
        <T x={260} y={530} size={30} weight={750} color={C.mute} anchor="start" o={prog(f, at(3, 0.4), 10)}>predicted</T>
        <rect x={X[0] - 60} y={480} width={120} height={20} rx={6} fill={C.purple} opacity={prog(f, at(3, 0.5), 10)} />
        <rect x={X[3] - 60} y={480} width={120} height={20} rx={6} fill={C.green} opacity={prog(f, at(3, 0.6), 10)} />
        <Mark start={at(3, 0.7)} x={X[0]} y={600} ok size={46} />
        <g opacity={prog(f, at(4), 12)}>
          <Mark start={at(4, 0.1)} x={X[3]} y={600} ok={false} size={46} />
          <Chip start={at(4, 0.3)} x={1520} y={480} text="York → FP" size={34} color={C.red} />
          <Chip start={at(4, 0.6)} x={1520} y={340} text="New York → FN" size={34} color={C.red} />
        </g>
        <Typed start={at(5, 0.05)} x={960} y={760} text="TP 1 · FP 1 · FN 1" size={44} />
        <Typed start={at(5, 0.35)} x={960} y={850} text="F1 = 2 / (2 + 1 + 1) = 0.5" size={48} color={C.blue} weight={750} />
      </g>
    </Stage>
  );
};

export const W6aScenes = {contract: Contract, bio: BIO, tasks: Tasks, subword: Subword, eval: Eval};
