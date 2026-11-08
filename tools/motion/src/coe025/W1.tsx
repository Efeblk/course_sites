/* COE025 Week 1 · Turning text into numbers. Narration: src/scripts/coe025-W1.json */
import React from 'react';
import {Arrow, C, Card, Mark, mix, pop, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, Count, MONO, rowX, shake, Typed, win} from './kit';

/* ---------- 1. why numbers ---------- */
const Numbers: React.FC = () => {
  const {f, at} = useScene();
  const into = prog(f, at(1), 24), back = prog(f, at(1, 0.45), 18), num = prog(f, at(2), 24);
  const gx = f < at(1, 0.45) ? mix(420, 780, into) : mix(780, 420, back);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Why turn text into numbers?" />
      <Card start={at(0, 0.3)} x={1080} y={470} w={360} h={300} stroke={C.ink}>
        <T y={-40} size={42} weight={700}>model</T>
        <T y={20} size={34} color={C.mute} font={MONO}>f(x) = w·x + b</T>
        <T y={80} size={28} color={C.mute}>only does arithmetic</T>
      </Card>
      <g opacity={win(f, at(0, 0.5), at(2))} transform={`translate(${shake(f, at(1, 0.4))} 0)`}>
        <Chip start={at(0, 0.5)} x={gx} y={470} text={'"good"'} size={40} />
      </g>
      <Mark start={at(1, 0.4)} x={900} y={330} ok={false} size={56} out={at(2)} />
      {/* the word becomes a vector and is accepted */}
      <g opacity={num}>
        <Chip start={at(2)} x={360} y={470} text={'"good"'} size={40} />
        <Arrow start={at(2, 0.15)} x1={470} y1={470} x2={560} y2={470} />
        <Chip start={at(2, 0.25)} x={mix(700, 760, prog(f, at(2, 0.6), 20))} y={470} text="[0, 1, 0]" mono size={36} color={C.teal} />
        <Arrow start={at(2, 0.6)} x1={850} y1={470} x2={895} y2={470} color={C.teal} />
        <Mark start={at(2, 0.7)} x={1080} y={300} ok size={56} />
      </g>
      <Tag start={at(2, 0.55)} x={560} y={620} color={C.green} text="keeps something" />
      <Tag start={at(2, 0.75)} x={1000} y={720} color={C.red} text="loses something" />
      {['What problem does it fix?', 'What goes in, what comes out?', 'Where does it still fail?'].map((q, i) => (
        <Card key={q} start={at(3, 0.1 + i * 0.2)} x={420 + i * 540} y={900} w={500} h={110} stroke={[C.blue, C.teal, C.red][i]}>
          <T y={12} size={30} weight={700}>{q}</T>
        </Card>
      ))}
    </Stage>
  );
};

/* ---------- 2. tokens, OOV, subwords ---------- */
const Tokens: React.FC = () => {
  const {f, at} = useScene();
  const toks = ['I', "don't", 'feel', 'unhappiness', '.'];
  const X = [470, 660, 920, 1170, 1400];
  const split1 = prog(f, at(1, 0.2), 20), oov = prog(f, at(2, 0.3), 16), split2 = prog(f, at(3, 0.2), 22);
  const sentO = 1 - prog(f, at(0, 0.35), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Tokenization and subwords" />
      <Rise start={at(0, 0.05)} x={960} y={330} size={48} out={at(0, 0.35)}>I don't feel unhappiness.</Rise>
      {toks.map((w, i) => {
        if (i === 1) return (
          <g key={w}>
            <g opacity={1 - split1}><Chip start={at(0, 0.4)} x={X[i]} y={330} text={w} size={40} /></g>
            {split1 > 0 && <><Chip start={at(1, 0.2)} x={X[i] - 50 * split1} y={330} text="do" size={40} color={C.teal} hi={0.2} /><Chip start={at(1, 0.25)} x={X[i] + 62 * split1} y={330} text="n't" size={40} color={C.teal} hi={0.2} /></>}
          </g>
        );
        if (i === 3) return (
          <g key={w}>
            <g opacity={1 - split2} transform={`translate(${shake(f, at(2, 0.3))} 0)`}><Chip start={at(0, 0.5)} x={X[i]} y={330} text={w} size={40} color={oov > 0 ? C.red : C.blue} hi={oov * 0.25} /></g>
            {split2 > 0 && ['un', '##happi', '##ness'].map((p, k) => <Chip key={p} start={at(3, 0.2 + k * 0.08)} x={X[i] + (k - 1) * mix(0, 175, split2)} y={330 + 120 * split2} text={p} size={36} color={C.green} hi={0.25} mono />)}
          </g>
        );
        return <Chip key={w} start={at(0, 0.4 + i * 0.03)} x={X[i]} y={330} text={w} size={40} />;
      })}
      <g opacity={sentO * 0 + 1}>
        <Card start={at(2)} x={480} y={720} w={600} h={240} stroke={C.mute} out={at(4)}>
          <T y={-70} size={30} weight={700} color={C.mute}>training vocabulary</T>
          <T y={-15} size={30} font={MONO}>I · do · n't · feel · un</T>
          <T y={30} size={30} font={MONO}>##happi · ##ness · . · …</T>
          <T y={80} size={28} color={oov > 0 ? C.red : C.mute} o={oov}>"unhappiness" is not here: OOV</T>
        </Card>
      </g>
      <Tag start={at(2, 0.4)} x={1350} y={560} color={C.red} filled text="out of vocabulary" out={at(3, 0.2)} />
      <Tag start={at(3, 0.6)} x={1350} y={600} color={C.green} filled text="known pieces" out={at(4)} />
      <Card start={at(4, 0.05)} x={620} y={760} w={760} h={190} stroke={C.orange}>
        <T y={-30} size={40} weight={750} color={C.orange}>BPE  ·  GPT</T>
        <T y={30} size={30}>merge the most frequent pair</T>
      </Card>
      <Card start={at(4, 0.45)} x={1380} y={760} w={760} h={190} stroke={C.blue}>
        <T y={-30} size={40} weight={750} color={C.blue}>WordPiece  ·  BERT</T>
        <T y={30} size={30} font={MONO}>un ##happi ##ness</T>
      </Card>
    </Stage>
  );
};

/* ---------- 3. one-hot, bag of words, order lost, n-grams ---------- */
const Bow: React.FC = () => {
  const {f, at} = useScene();
  const V = ['bites', 'dog', 'man', 'cat'], cx = (k: number) => 900 + k * 150;
  const sent = ['dog', 'bites', 'man'];
  const sum = prog(f, at(1), 26), second = prog(f, at(2), 20), ng = prog(f, at(3), 18);
  const cell = (y: number, v: (string | number)[], o: number, hiCol?: string) => v.map((x, k) => (
    <g key={k} opacity={o}><rect x={cx(k) - 55} y={y - 38} width={110} height={70} rx={10} fill={x ? (hiCol ?? C.blue) : C.card} fillOpacity={x ? 0.85 : 1} stroke={C.line} strokeWidth={3} />
      <T x={cx(k)} y={y + 12} size={36} color={x ? '#fff' : C.mute} font={MONO}>{String(x)}</T></g>));
  return (
    <Stage>
      <StageHeading start={at(0)} text="One-hot and bag of words" />
      <g opacity={1 - ng}>
        {V.map((w, k) => <Rise key={w} start={at(0, 0.1)} x={cx(k)} y={250} size={32} color={C.mute}>{w}</Rise>)}
        {sent.map((w, i) => {
          const y = mix(320 + i * 90, 600, sum);
          return (
            <g key={w}>
              <Chip start={at(0, 0.3 + i * 0.12)} x={560} y={y} text={w} size={36} out={at(1, 0.4)} />
              {cell(y, V.map((v) => (v === w ? 1 : 0)), prog(f, at(0, 0.35 + i * 0.12), 12) * (1 - prog(f, at(1, 0.55), 10)))}
            </g>
          );
        })}
        <g opacity={prog(f, at(1, 0.5), 14)}>
          <T x={560} y={612} size={34} weight={700}>dog bites man</T>
          {cell(600, [1, 1, 1, 0], 1)}
        </g>
        <g opacity={second}>
          <T x={560} y={782} size={34} weight={700}>man bites dog</T>
          {cell(770, [1, 1, 1, 0], 1, C.orange)}
          <T x={1580} y={700} size={80} weight={800} color={C.red}>=</T>
        </g>
        <Tag start={at(2, 0.5)} x={960} y={920} color={C.red} filled text="word order is lost" />
      </g>
      <g opacity={ng}>
        <T x={960} y={330} size={36} color={C.mute}>n-grams: a few words become one feature</T>
        <Chip start={at(3, 0.2)} x={700} y={500} text="New York" size={46} color={C.teal} hi={0.2} />
        <Chip start={at(3, 0.45)} x={1220} y={500} text="not good" size={46} color={C.teal} hi={0.2} />
        <Rise start={at(3, 0.5)} x={700} y={620} size={30} color={C.mute}>≠ York New</Rise>
        <Rise start={at(3, 0.65)} x={1220} y={620} size={30} color={C.mute}>≠ not + good</Rise>
        <Tag start={at(3, 0.75)} x={960} y={780} color={C.teal} text="local order comes back" />
      </g>
    </Stage>
  );
};

/* ---------- 4. TF-IDF by hand ---------- */
const Tfidf: React.FC = () => {
  const {f, at} = useScene();
  const docs = [['d1', 'good good movie', '+'], ['d2', 'good movie', '+'], ['d3', 'bad bad movie', '−'], ['d4', 'bad movie', '−']];
  const gHi = prog(f, at(2), 16), mHi = prog(f, at(3), 16), wt = prog(f, at(4), 18);
  return (
    <Stage>
      <StageHeading start={at(0)} text="TF-IDF by hand" />
      {docs.map(([id, txt, lab], i) => {
        const hasGood = txt.includes('good');
        const hi = Math.max(hasGood ? gHi * (1 - mHi) : 0, mHi * (1 - wt) * 0.8);
        return (
          <Card key={id} start={at(0, 0.2 + i * 0.1)} x={300} y={280 + i * 165} w={420} h={130} stroke={hi > 0.3 ? C.orange : C.line} fill={hi > 0.3 ? '#fbe8c8' : C.card}>
            <T x={-170} y={12} size={28} anchor="start" color={C.mute} weight={700}>{id}</T>
            <T x={20} y={12} size={30} weight={600}>{txt}</T>
            <T x={180} y={12} size={34} weight={800} color={lab === '+' ? C.green : C.red}>{lab}</T>
          </Card>
        );
      })}
      <Typed start={at(1, 0.05)} x={1250} y={320} text="idf(t) = ln( N / df(t) )" size={50} />
      <Rise start={at(1, 0.5)} x={1250} y={390} size={28} color={C.mute}>N = documents · df = documents that contain t</Rise>
      <g opacity={gHi}>
        <T x={900} y={520} size={36} weight={700} anchor="start">good:</T>
        <Typed start={at(2, 0.2)} x={1030} y={520} text="ln(4 / 2) =" size={38} anchor="start" />
        <Count start={at(2, 0.55)} b={0.693} x={1390} y={522} size={44} color={C.orange} fmt={(v) => v.toFixed(2)} anchor="start" />
        <Bar start={at(2, 0.55)} x={1650} y={700} w={90} h={200} color={C.orange} label="good" />
      </g>
      <g opacity={mHi}>
        <T x={900} y={620} size={36} weight={700} anchor="start">movie:</T>
        <Typed start={at(3, 0.2)} x={1050} y={620} text="ln(4 / 4) = 0" size={38} anchor="start" />
        <Bar start={at(3, 0.4)} x={1780} y={700} w={90} h={3} color={C.mute} label="movie" />
        <Rise start={at(3, 0.6)} x={1250} y={680} size={28} color={C.red}>in every document: tells nothing apart</Rise>
      </g>
      <g opacity={wt}>
        <Typed start={at(4, 0.1)} x={1250} y={820} text="w(good, d1) = 2 × 0.693 ≈ 1.39" size={42} />
        <Tag start={at(4, 0.55)} x={1250} y={920} color={C.red} text="a weight, not a probability" />
      </g>
    </Stage>
  );
};

/* ---------- 5. embeddings ---------- */
const Embed: React.FC = () => {
  const {f, at} = useScene();
  const dense = prog(f, at(1), 30), kq = prog(f, at(2), 20), stat = prog(f, at(3), 18), ctx = prog(f, at(4), 26);
  const P = (a: [number, number], b: [number, number]) => [mix(a[0], b[0], dense), mix(a[1], b[1], dense)] as const;
  const words: [string, [number, number], [number, number]][] = [
    ['cat', [560, 330], [520, 360]], ['dog', [1360, 330], [640, 420]], ['car', [960, 820], [1400, 380]],
  ];
  const off = 1 - kq;
  return (
    <Stage>
      <StageHeading start={at(0)} text="From one-hot to embeddings" />
      <g opacity={off * (1 - stat)}>
        {words.map(([w, a, b], i) => { const [x, y] = P(a, b); return <g key={w}><circle cx={x} cy={y} r={16} fill={C.blue} opacity={prog(f, at(0, 0.2 + i * 0.1), 10)} /><T x={x} y={y - 30} size={34} o={prog(f, at(0, 0.2 + i * 0.1), 10)}>{w}</T></g>; })}
        <g opacity={(1 - dense) * prog(f, at(0, 0.5), 12)} stroke={C.mute} strokeWidth={3} strokeDasharray="10 8">
          <line x1={560} y1={330} x2={1360} y2={330} /><line x1={560} y1={330} x2={960} y2={820} /><line x1={1360} y1={330} x2={960} y2={820} />
        </g>
        <Rise start={at(0, 0.6)} x={960} y={1000} size={30} color={C.mute} out={at(1)}>one-hot: every pair equally far apart</Rise>
        <Rise start={at(1, 0.6)} x={960} y={1000} size={30} color={C.mute} out={at(2)}>dense: similar meaning, nearby point</Rise>
      </g>
      <g opacity={kq * (1 - stat)}>
        {([['king', 700, 420], ['man', 700, 760], ['woman', 1200, 760], ['queen', 1200, 420]] as const).map(([w, x, y], i) => (
          <g key={w} opacity={prog(f, at(2, 0.05 + i * 0.12), 10)}><circle cx={x} cy={y} r={16} fill={i === 3 ? C.orange : C.blue} /><T x={x} y={y - 30} size={36} weight={700}>{w}</T></g>))}
        <Arrow start={at(2, 0.3)} x1={700} y1={440} x2={700} y2={735} color={C.red} />
        <Arrow start={at(2, 0.45)} x1={720} y1={760} x2={1175} y2={760} color={C.green} />
        <Arrow start={at(2, 0.6)} x1={1200} y1={740} x2={1200} y2={445} color={C.blue} />
        <T x={960} y={600} size={36} font="monospace" o={prog(f, at(2, 0.7), 12)}>king − man + woman ≈ queen</T>
      </g>
      <g opacity={stat}>
        <Chip start={at(3)} x={520} y={330} text="river bank" size={40} />
        <Chip start={at(3, 0.1)} x={520} y={700} text="bank loan" size={40} />
        <circle cx={mix(1100, 980, ctx)} cy={mix(515, 330, ctx)} r={20} fill={C.blue} />
        <circle cx={mix(1100, 980, ctx)} cy={mix(515, 700, ctx)} r={20} fill={ctx > 0 ? C.orange : C.blue} />
        <Arrow start={at(3, 0.3)} x1={700} y1={340} x2={mix(1070, 950, ctx)} y2={mix(505, 335, ctx)} color={C.mute} />
        <Arrow start={at(3, 0.35)} x1={700} y1={690} x2={mix(1070, 950, ctx)} y2={mix(525, 695, ctx)} color={C.mute} />
        <T x={1260} y={525} size={34} weight={700} o={1 - ctx}>one vector</T>
        <Tag start={at(3, 0.5)} x={1450} y={620} color={C.blue} text="static: Word2Vec, GloVe" out={at(4)} />
        <T x={1180} y={340} size={34} weight={700} anchor="start" o={ctx}>river sense</T>
        <T x={1180} y={710} size={34} weight={700} anchor="start" o={ctx}>money sense</T>
        <Tag start={at(4, 0.5)} x={1450} y={520} color={C.orange} filled text="contextual: BERT" />
      </g>
    </Stage>
  );
};

/* ---------- 6. the right tool ---------- */
const Tool: React.FC = () => {
  const {f, at} = useScene();
  const row = (y: number, start: number, lab: string, a: number, b: number, ta: string, tb: string) => (
    <g opacity={prog(f, start, 12)}>
      <T x={330} y={y + 12} size={32} weight={700} anchor="end">{lab}</T>
      <rect x={370} y={y - 34} width={1100 * a * prog(f, start, 26)} height={30} rx={6} fill={C.purple} />
      <rect x={370} y={y + 6} width={Math.max(6, 1100 * b * prog(f, start + 6, 26))} height={30} rx={6} fill={C.teal} />
      <T x={380 + 1100 * a + 14} y={y - 10} size={26} anchor="start" o={prog(f, start + 20, 10)}>{ta}</T>
      <T x={380 + Math.max(6, 1100 * b) + 14} y={y + 30} size={26} anchor="start" o={prog(f, start + 26, 10)}>{tb}</T>
    </g>
  );
  return (
    <Stage>
      <StageHeading start={at(0)} text="When is an LLM the wrong tool?" />
      <Tag start={at(1)} x={720} y={240} color={C.purple} filled text="LLM" />
      <Tag start={at(1, 0.05)} x={1000} y={240} color={C.teal} filled text="Naive Bayes" />
      {row(380, at(1, 0.3), 'accuracy', 0.992, 0.985, '99.2%', '98.5%')}
      {row(520, at(2), 'cost / month', 1, 10 / 30000, '≈ $30,000', '< $10')}
      {row(660, at(2, 0.5), 'latency', 1, 0.01, '100–1000 ms', '< 10 ms')}
      {['privacy', 'interpretability', 'hallucinations'].map((t, i) => <Tag key={t} start={at(3, 0.05 + i * 0.12)} x={560 + i * 400} y={800} color={C.red} text={t} />)}
      <Card start={at(3, 0.6)} x={960} y={940} w={980} h={100} stroke={C.green} sw={5}>
        <T y={12} size={34} weight={700}>start with a cheap baseline</T>
      </Card>
    </Stage>
  );
};

export const W1Scenes = {numbers: Numbers, tokens: Tokens, bow: Bow, tfidf: Tfidf, embed: Embed, tool: Tool};
