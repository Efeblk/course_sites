/* COE025 Week 6 · HMM and CRF (simple). Narration: src/scripts/coe025-W6.json */
import React from 'react';
import {Arrow, C, Card, Mark, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, rowX, shake, Typed} from './kit';
import {ExamList, Glow} from './simple';

/* 1. labels must fit together */
const Fit: React.FC = () => {
  const {f, at} = useScene();
  const w = ['met', 'Ada', 'Lovelace'];
  const xs = rowX(w, 960, 42, 60);
  const bad = at(2, 0.1);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Labels must fit together" />
      {w.map((t, i) => <Chip key={t} start={at(0, 0.4 + i * 0.06)} x={xs[i]} y={380} text={t} size={42} />)}
      <Chip start={at(1, 0.3)} x={xs[0]} y={540} text="O" size={34} color={C.mute} hi={1} mono />
      <g transform={`translate(${shake(f, bad + 6)} 0)`}><Chip start={at(1, 0.5)} x={xs[1]} y={540} text="I-PER" size={34} color={C.red} hi={1} mono /></g>
      <Mark start={bad + 6} x={xs[1]} y={660} ok={false} size={50} />
      <Rise start={at(2, 0.3)} x={960} y={780} size={34} color={C.red}>I must continue a name that already began</Rise>
      <g opacity={prog(f, at(3), 12)}>
        <Arrow start={at(3, 0.2)} x1={xs[0] + 70} y1={900} x2={xs[1] - 70} y2={900} color={C.blue} w={6} />
        <Arrow start={at(3, 0.3)} x1={xs[1] + 70} y1={900} x2={xs[2] - 70} y2={900} color={C.blue} w={6} />
        <T x={960} y={980} size={32} weight={700} color={C.blue}>look at the neighbouring labels</T>
      </g>
    </Stage>
  );
};

/* 2. HMM: hidden tags, visible words, transition + emission */
const Hmm: React.FC = () => {
  const {f, at} = useScene();
  const node = (x: number, y: number, txt: string, c: string, s: number) => (
    <g opacity={prog(f, s, 12)}><circle cx={x} cy={y} r={80} fill={c} fillOpacity={0.15} stroke={c} strokeWidth={5} /><T x={x} y={y + 14} size={40} weight={750}>{txt}</T></g>);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Hidden Markov model" />
      {node(700, 420, 'tag', C.purple, at(1, 0.1))}{node(1220, 420, 'tag', C.purple, at(1, 0.15))}
      {node(700, 780, 'can', C.blue, at(1, 0.5))}{node(1220, 780, 'fish', C.blue, at(1, 0.55))}
      <T x={420} y={432} size={32} color={C.purple} weight={700} anchor="end" o={prog(f, at(1, 0.1), 10)}>hidden</T>
      <T x={420} y={792} size={32} color={C.blue} weight={700} anchor="end" o={prog(f, at(1, 0.5), 10)}>what we see</T>
      <Arrow start={at(2, 0.4)} x1={785} y1={420} x2={1132} y2={420} color={C.purple} w={7} />
      <T x={960} y={380} size={32} weight={700} color={C.purple} o={prog(f, at(2, 0.55), 10)}>transition</T>
      <Arrow start={at(3, 0.1)} x1={1220} y1={505} x2={1220} y2={692} color={C.green} w={7} />
      <T x={1330} y={610} size={32} weight={700} color={C.green} anchor="start" o={prog(f, at(3, 0.15), 10)}>emission</T>
      <Chip start={at(3, 0.5)} x={1580} y={880} text="P(word | tag)" size={36} color={C.green} hi={1} mono />
      <g transform={`translate(${shake(f, at(3, 0.8))} 0)`}><Chip start={at(3, 0.7)} x={1580} y={990} text="P(tag | word)" size={36} color={C.red} mono /></g>
      <Mark start={at(3, 0.8)} x={1800} y={990} ok={false} size={40} />
    </Stage>
  );
};

/* 3. four paths for "can fish" */
const PATHS: [string, number][] = [['N N', 0.0432], ['N V', 0.0504], ['V N', 0.1344], ['V V', 0.0168]];
const Paths: React.FC = () => {
  const {f, at} = useScene();
  return (
    <Stage>
      <StageHeading start={at(0)} text='"can fish": four paths' />
      {PATHS.map(([p, w], i) => {
        const y = 330 + i * 120, vn = i === 2, s = at(1, 0.1 + i * 0.12);
        return (
          <g key={p}>
            {vn && <Glow start={at(2, 0.05)} x={960} y={y} w={1300} h={104} />}
            <Chip start={at(0, 0.5 + i * 0.08)} x={420} y={y} text={p} size={40} color={vn ? C.orange : C.blue} mono />
            <T x={560} y={y + 12} size={32} color={C.mute} anchor="start" o={prog(f, s, 10)}>multiply along the path</T>
            <rect x={1000} y={y - 28} width={w * 3500 * prog(f, s + 10, 20)} height={56} rx={8} fill={vn ? C.orange : C.blue} opacity={0.85} />
            <T x={1020 + w * 3500} y={y + 12} size={34} weight={750} anchor="start" o={prog(f, s + 26, 10)}>{w.toFixed(4)}</T>
          </g>
        );
      })}
      <Tag start={at(2, 0.4)} x={1700} y={570} color={C.orange} text="winner" filled />
      <Typed start={at(3, 0.3)} x={960} y={880} text="joint 0.1344 ÷ total 0.2448 ≈ 0.55 posterior" size={42} />
      <Tag start={at(3, 0.15)} x={960} y={980} color={C.red} text="0.1344 is joint, not posterior" />
    </Stage>
  );
};

/* 4. Viterbi keeps the best way to each tag */
const Viterbi: React.FC = () => {
  const {f, at} = useScene();
  const cols = [380, 760, 1140, 1520], rows = [460, 700];
  const many = prog(f, at(0, 0.3), 30), prune = prog(f, at(1, 0.3), 24);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Viterbi: keep the best way in" />
      {cols.slice(0, -1).map((x, c) => rows.map((y1, a) => rows.map((y2, b) => {
        const keep = a === (c + b) % 2;
        return <line key={`${c}${a}${b}`} x1={x + 50} y1={y1} x2={cols[c + 1] - 50} y2={y2} stroke={keep ? C.orange : C.blue} strokeWidth={keep ? 6 : 3}
          opacity={many * (keep ? 1 : 1 - 0.85 * prune)} />;
      })))}
      {cols.map((x) => rows.map((y, r) => <g key={`${x}${y}`} opacity={prog(f, at(0, 0.2), 12)}><circle cx={x} cy={y} r={46} fill={C.card} stroke={C.purple} strokeWidth={5} /><T x={x} y={y + 12} size={34} weight={750}>{r ? 'V' : 'N'}</T></g>))}
      <Tag start={at(1, 0.6)} x={960} y={300} color={C.orange} text="one best path into each tag" />
      <Card start={at(2, 0.1)} x={700} y={900} w={460} h={110} stroke={C.orange}><T y={14} size={36} weight={750}>Viterbi = max</T></Card>
      <Card start={at(2, 0.5)} x={1220} y={900} w={460} h={110} stroke={C.blue}><T y={14} size={36} weight={750}>forward = sum</T></Card>
    </Stage>
  );
};

/* 5. CRF: scores, any clue, divide by Z */
const Crf: React.FC = () => {
  const {f, at} = useScene();
  const ws: [string, number][] = [['N N', 2], ['N V', 4], ['V N', 8], ['V V', 2]];
  const block = at(3, 0.6);
  return (
    <Stage>
      <StageHeading start={at(0)} text="CRF: scores, then divide by Z" />
      {['Capital letter', 'word ending -ly', 'list of names'].map((c, i) => <Tag key={c} start={at(1, 0.2 + i * 0.15)} x={560 + i * 400} y={260} color={C.teal} text={c} />)}
      {ws.map(([p, w], i) => (
        <g key={p}>
          <Chip start={at(2, 0.05 + i * 0.06)} x={420 + i * 360} y={480} text={p} size={36} color={i === 2 ? C.orange : C.blue} mono />
          <T x={420 + i * 360} y={590} size={46} weight={800} color={i === 2 ? C.orange : C.ink} o={prog(f, at(2, 0.3 + i * 0.05), 10)}>{w}</T>
        </g>
      ))}
      <Typed start={at(2, 0.6)} x={960} y={700} text="Z = 2 + 4 + 8 + 2 = 16    P(V N) = 8 / 16 = 0.5" size={40} />
      <g opacity={prog(f, at(3), 12)}>
        <Chip start={at(3, 0.1)} x={760} y={880} text="O → I-PER" size={36} color={C.red} mono />
        <T x={1060} y={892} size={34} weight={700} color={C.mute} o={prog(f, at(3, 0.3), 10)}>only less likely</T>
        <g opacity={prog(f, block, 12)}><Chip start={block} x={1420} y={880} text="block it" size={36} color={C.red} hi={1} /></g>
      </g>
    </Stage>
  );
};

const Exam: React.FC = () => <ExamList items={['Emission = P(word | tag)', 'Path product is joint; ÷ total = posterior', 'Viterbi = max; Z and forward = sum', 'Entities are scored as whole spans']} />;

export const W6Scenes: Record<string, React.FC> = {fit: Fit, hmm: Hmm, paths: Paths, viterbi: Viterbi, crf: Crf, exam: Exam};
