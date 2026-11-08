/* COE025 Week 4 · Parts of speech and named entities. Narration: src/scripts/coe025-W4.json */
import React from 'react';
import {Arrow, C, Card, Mark, mix, pop, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Chip, Count, MONO, rowX, shake, Typed, win} from './kit';

const TAGC: Record<string, string> = {NOUN: C.blue, VERB: C.green, ADJ: C.orange, PART: C.purple, ADV: C.teal, PROPN: C.blue, AUX: C.brown, DET: C.mute};

/* ---------- 1. POS: a role in context ---------- */
const POS: React.FC = () => {
  const {f, at} = useScene();
  const one = win(f, at(0), at(2)), two = win(f, at(2), at(3)), back = prog(f, at(3), 14);
  const s = ['Janet', 'will', 'back', 'the', 'bill'], tg = ['PROPN', 'AUX', 'VERB', 'DET', 'NOUN'], X = rowX(s, 960, 44, 40);
  const r1 = ['Book', 'that', 'flight'], r2 = ['Hand', 'me', 'that', 'book'];
  const X1 = rowX(r1, 760, 40, 30), X2 = rowX(r2, 760, 40, 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Part-of-speech tagging" />
      <g opacity={one}>
        {s.map((w, i) => <g key={w}><Chip start={at(0, 0.3 + i * 0.04)} x={X[i]} y={450} text={w} size={44} />
          <Chip start={at(1, 0.15 + i * 0.12)} x={X[i]} y={600} text={tg[i]} size={32} color={TAGC[tg[i]]} hi={1} /></g>)}
        <Rise start={at(1, 0.2)} x={960} y={760} size={32} color={C.mute}>one tag for every word, from its role here</Rise>
      </g>
      <g opacity={two}>
        {r1.map((w, i) => <Chip key={w} start={at(2, 0.05)} x={X1[i]} y={380} text={w} size={40} color={i === 0 ? C.green : C.mute} hi={i === 0 ? 0.25 : 0} />)}
        <Chip start={at(2, 0.25)} x={1400} y={380} text="VERB" size={36} color={C.green} hi={1} />
        {r2.map((w, i) => <Chip key={w} start={at(2, 0.45)} x={X2[i]} y={620} text={w} size={40} color={i === 3 ? C.blue : C.mute} hi={i === 3 ? 0.25 : 0} />)}
        <Chip start={at(2, 0.7)} x={1400} y={620} text="NOUN" size={36} color={C.blue} hi={1} />
      </g>
      <g opacity={back}>
        {(['ADJ', 'NOUN', 'VERB', 'PART', 'ADV'] as const).map((t, i) => {
          const a = -Math.PI / 2 + (i / 5) * Math.PI * 2, k = pop(f, at(3, 0.15 + i * 0.12));
          const ex = ['the back door', 'on my back', 'back the bill', 'buy back debt', 'back then'][i];
          return <g key={t} opacity={Math.min(1, k)}><line x1={960} y1={560} x2={960 + Math.cos(a) * 300 * k} y2={560 + Math.sin(a) * 260 * k} stroke={C.line} strokeWidth={4} />
            <Chip start={at(3, 0.15 + i * 0.12)} x={960 + Math.cos(a) * 420} y={560 + Math.sin(a) * 300} text={t} size={34} color={TAGC[t]} hi={1} />
            <T x={960 + Math.cos(a) * 420} y={560 + Math.sin(a) * 300 + 64} size={26} color={C.mute}>{ex}</T></g>;
        })}
        <Chip start={at(3)} x={960} y={560} text="back" size={56} />
      </g>
    </Stage>
  );
};

/* ---------- 2. open and closed classes ---------- */
const Classes: React.FC = () => {
  const {f, at} = useScene();
  const drop = (i: number) => prog(f, at(0, 0.35 + i * 0.2), 26);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Open and closed classes" />
      <Card start={at(0, 0.1)} x={560} y={620} w={700} h={440} stroke={C.green} sw={5}>
        <T y={-170} size={40} weight={800} color={C.green}>open</T>
        <T y={-110} size={30}>NOUN · VERB · ADJ · ADV</T>
      </Card>
      {['selfie', 'to google'].map((w, i) => <Chip key={w} start={at(0, 0.35 + i * 0.2)} x={420 + i * 280} y={mix(250, 690, drop(i))} text={w} size={36} color={C.green} hi={0.25} />)}
      <Card start={at(1)} x={1360} y={620} w={700} h={440} stroke={C.mute} sw={5}>
        <T y={-170} size={40} weight={800} color={C.mute}>closed</T>
        <T y={-100} size={30}>DET · PRON · ADP</T><T y={-50} size={30}>CCONJ · AUX · PART</T>
        <T y={40} size={30} font={MONO}>the · they · under · and · can</T>
      </Card>
      <g transform={`translate(${shake(f, at(1, 0.6))} 0)`}><Chip start={at(1, 0.5)} x={1360} y={300} text="new word?" size={34} color={C.red} out={at(2)} /></g>
      <Mark start={at(1, 0.6)} x={1560} y={300} ok={false} size={48} out={at(2)} />
      <g opacity={prog(f, at(2), 12)}><Count start={at(2)} b={17} x={900} y={960} size={70} color={C.blue} /><T x={970} y={950} size={36} anchor="start" weight={700}>Universal Dependencies tags</T></g>
    </Stage>
  );
};

/* ---------- 3. ambiguity, baseline, clues ---------- */
const Ambig: React.FC = () => {
  const {f, at} = useScene();
  const corp = ['book', 'book', 'book', 'cat', 'dog'], X = rowX(corp, 960, 44, 30);
  const a = win(f, at(0), at(2)), b = win(f, at(2), at(3)), c = prog(f, at(3), 14);
  const typ = prog(f, at(1, 0.15), 14), tok = prog(f, at(1, 0.55), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Ambiguity and the baseline" />
      <g opacity={a}>
        {corp.map((w, i) => <Chip key={i} start={at(0, 0.3 + i * 0.05)} x={X[i]} y={360} text={w} size={44} color={w === 'book' ? C.orange : C.blue} hi={w === 'book' ? tok * 0.8 : 0} />)}
        <g opacity={typ}>{['book', 'cat', 'dog'].map((w, i) => <Chip key={w} start={at(1, 0.15)} x={620 + i * 340} y={540} text={w} size={40} color={i ? C.mute : C.orange} hi={i ? 0 : 0.8} />)}
          <Typed start={at(1, 0.3)} x={960} y={660} text="ambiguous types: 1 / 3" size={42} /></g>
        <Typed start={at(1, 0.6)} x={960} y={760} text="ambiguous tokens: 3 / 5" size={42} color={C.orange} />
      </g>
      <g opacity={b}>
        <Card start={at(2)} x={560} y={420} w={600} h={180} stroke={C.mute}>
          <T y={-30} size={30} color={C.mute}>training counts for "book"</T><T y={30} size={36} font={MONO}>NOUN 6 · VERB 4</T>
        </Card>
        <Arrow start={at(2, 0.25)} x1={880} y1={420} x2={1040} y2={420} />
        <Chip start={at(2, 0.3)} x={1260} y={420} text="always NOUN" size={40} color={C.blue} hi={1} />
        <g transform={`translate(${shake(f, at(2, 0.75))} 0)`}><Chip start={at(2, 0.65)} x={960} y={680} text="Book a flight → NOUN" size={40} color={C.red} /></g>
        <Mark start={at(2, 0.75)} x={1340} y={680} ok={false} size={52} />
      </g>
      <g opacity={c}>
        {[['the word itself', '"will" is usually AUX', C.blue], ['its neighbours', 'after "the": not a verb', C.teal], ['its shape', '-ly, un-, Capital', C.purple]].map(([t, e, col], i) => (
          <Card key={t} start={at(3, 0.05 + i * 0.12)} x={420 + i * 540} y={460} w={480} h={200} stroke={col} sw={5}>
            <T y={-20} size={36} weight={750} color={col}>{t}</T><T y={40} size={28}>{e}</T>
          </Card>))}
        <Tag start={at(3, 0.65)} x={960} y={720} color={C.red} text="a clue, not a rule: friendly = ADJ" />
      </g>
    </Stage>
  );
};

/* ---------- 4. NER ---------- */
const NER: React.FC = () => {
  const {f, at} = useScene();
  const words = ['Jane', 'Villanueva', 'of', 'United', 'Airlines', 'Holding', 'discussed', 'the', 'Chicago', 'route'];
  const X = rowX(words, 960, 30, 14);
  const spans: [number, number, string, string][] = [[0, 1, 'PER', C.purple], [3, 5, 'ORG', C.blue], [8, 8, 'LOC', C.green]];
  const wash = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Named entity recognition" />
      <g opacity={1 - wash}>
        {spans.map(([a, b, l, c], i) => {
          const x0 = X[a] - 80, x1 = X[b] + 80, t = prog(f, at(0, 0.5 + i * 0.12), 14);
          return <g key={l} opacity={t}><rect x={x0} y={360} width={x1 - x0} height={110} rx={16} fill={c} fillOpacity={0.15} stroke={c} strokeWidth={3} />
            <T x={(x0 + x1) / 2} y={350} size={30} weight={800} color={c}>{l}</T></g>;
        })}
        {words.map((w, i) => <T key={i} x={X[i]} y={428} size={30} weight={600}>{w}</T>)}
        <Tag start={at(1, 0.4)} x={960} y={660} color={C.red} filled text="harder than POS, for two reasons" />
        <g opacity={prog(f, at(2), 12)}>
          <path d={`M ${X[3] - 70} 500 Q ${(X[3] + X[5]) / 2} 560 ${X[5] + 70} 500`} fill="none" stroke={C.blue} strokeWidth={4} />
          <T x={(X[3] + X[5]) / 2} y={790} size={34} weight={700} color={C.blue}>1. segmentation: one entity, three words</T>
        </g>
      </g>
      <g opacity={wash}>
        <Chip start={at(3)} x={960} y={560} text="Washington" size={52} />
        {[['PER', 'was born on the farm', C.purple], ['ORG (team)', 'went up 2 games to 1', C.blue], ['LOC', 'Blair arrived in …', C.green], ['GPE', 'passed a seatbelt law', C.orange]].map(([t, e, c], i) => {
          const [x, y] = [[520, 330], [1400, 330], [520, 800], [1400, 800]][i];
          return <g key={t}><Chip start={at(3, 0.2 + i * 0.12)} x={x} y={y} text={t} size={36} color={c} hi={1} />
            <Rise start={at(3, 0.25 + i * 0.12)} x={x} y={y + 80} size={26} color={C.mute}>{e}</Rise></g>;
        })}
        <T x={960} y={680} size={30} color={C.red} weight={700} o={prog(f, at(3, 0.7), 12)}>2. only context decides the type</T>
      </g>
    </Stage>
  );
};

/* ---------- 5. BIO and label counts ---------- */
const BIO: React.FC = () => {
  const {f, at} = useScene();
  const w = ['Jane', 'Villanueva', 'of', 'United'], tg = ['B-PER', 'I-PER', 'O', 'B-ORG'], cl = [C.purple, C.purple, C.mute, C.blue];
  const cnt = win(f, at(2), at(3)), io = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="BIO: one tag per token" />
      <g opacity={1 - io}>
        {['B = begins', 'I = inside', 'O = outside'].map((t, i) => <Tag key={t} start={at(0, 0.3 + i * 0.15)} x={560 + i * 400} y={250} color={[C.green, C.blue, C.mute][i]} text={t} />)}
        {w.map((x, i) => <g key={x}><Chip start={at(1, 0.02)} x={420 + i * 360} y={420} text={x} size={42} />
          <Chip start={at(1, 0.1 + i * 0.2)} x={420 + i * 360} y={540} text={tg[i]} size={34} color={cl[i]} hi={tg[i] === 'O' ? 0 : 1} mono /></g>)}
        <g opacity={cnt}>
          <Typed start={at(2, 0.05)} x={960} y={720} text="n types → 2n + 1 tags" size={46} />
          <Typed start={at(2, 0.45)} x={960} y={800} text="PER, ORG, LOC → 7" size={42} color={C.blue} />
          <Rise start={at(2, 0.7)} x={960} y={880} size={30} color={C.mute}>B/I-PER · B/I-ORG · B/I-LOC · O</Rise>
        </g>
      </g>
      <g opacity={io}>
        <Rise start={at(3)} x={960} y={260} size={32} color={C.mute}>two people side by side: Ada | Grace</Rise>
        <T x={380} y={430} size={36} weight={800} color={C.red}>IO</T>
        <Chip start={at(3, 0.1)} x={700} y={420} text="I-PER" size={34} color={C.purple} hi={1} mono /><Chip start={at(3, 0.12)} x={940} y={420} text="I-PER" size={34} color={C.purple} hi={1} mono />
        <T x={1300} y={432} size={30} color={C.red} o={prog(f, at(3, 0.25), 10)}>one person or two?  n + 1</T>
        <T x={380} y={590} size={36} weight={800} color={C.green}>BIO</T>
        <Chip start={at(3, 0.3)} x={700} y={580} text="B-PER" size={34} color={C.purple} hi={1} mono /><Chip start={at(3, 0.32)} x={940} y={580} text="B-PER" size={34} color={C.purple} hi={1} mono />
        <T x={1300} y={592} size={30} color={C.green} o={prog(f, at(3, 0.4), 10)}>two people  2n + 1</T>
        <T x={380} y={750} size={36} weight={800} color={C.blue}>BIOES</T>
        <Chip start={at(3, 0.6)} x={700} y={740} text="S-PER" size={34} color={C.purple} hi={1} mono /><Chip start={at(3, 0.62)} x={940} y={740} text="S-PER" size={34} color={C.purple} hi={1} mono />
        <T x={1300} y={752} size={30} color={C.blue} o={prog(f, at(3, 0.7), 10)}>adds End, Single  4n + 1</T>
      </g>
    </Stage>
  );
};

export const W4Scenes = {pos: POS, classes: Classes, ambig: Ambig, ner: NER, bio: BIO};
