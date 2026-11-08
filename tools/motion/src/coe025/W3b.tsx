/* COE025 Week 3, part 2 · From embeddings to BERT. Narration: src/scripts/coe025-W3b.json */
import React from 'react';
import {Arrow, C, Card, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, MONO, rowX, Typed, win} from './kit';

/* ---------- 1. embeddings, Word2Vec, FastText, mean pooling ---------- */
const Embed: React.FC = () => {
  const {f, at} = useScene();
  const s1 = win(f, at(1), at(2)), s2 = win(f, at(2), at(3)), s3 = win(f, at(3), at(4)), s4 = prog(f, at(4), 14);
  const sent = ['I', 'love', 'this', 'movie'], X = rowX(sent, 960, 44, 50);
  const cbow = win(f, at(2, 0.15), at(2, 0.55)), sg = prog(f, at(2, 0.55), 12);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Embeddings: what each one fixed" />
      <g opacity={1 - prog(f, at(1), 12)}>{['what it fixes', 'what goes in and out', 'where it still fails'].map((t, i) => <Tag key={t} start={at(0, 0.3 + i * 0.15)} x={960} y={420 + i * 120} color={[C.blue, C.teal, C.red][i]} text={t} />)}</g>
      <g opacity={s1}>
        <Chip start={at(1)} x={360} y={520} text="movie" size={44} />
        <Arrow start={at(1, 0.15)} x1={480} y1={520} x2={600} y2={520} />
        <Chip start={at(1, 0.2)} x={700} y={520} text="ID 17" size={40} color={C.mute} mono />
        {[16, 17, 18].map((r, i) => {
          const hi = r === 17 ? prog(f, at(1, 0.45), 12) : 0;
          return <g key={r} opacity={prog(f, at(1, 0.3), 10)}><rect x={900} y={400 + i * 90} width={560} height={74} rx={10} fill={hi ? C.blue : C.card} fillOpacity={hi ? 0.85 : 1} stroke={C.line} strokeWidth={3} />
            <T x={950} y={448 + i * 90} size={30} color={hi ? '#fff' : C.mute} font={MONO}>{r}</T>
            <T x={1210} y={448 + i * 90} size={32} color={hi ? '#fff' : C.ink} font={MONO}>{['[−0.3, 0.8, 0.1]', '[0.2, −0.4, 0.7]', '[0.6, 0.0, −0.5]'][i]}</T></g>;
        })}
        <Tag start={at(1, 0.7)} x={1180} y={760} color={C.mute} text="the ID only selects a row" />
      </g>
      <g opacity={s2}>
        {sent.map((w, i) => <Chip key={w} start={at(2, 0.05 + i * 0.04)} x={X[i]} y={500} text={w} size={44} color={i === 2 ? C.orange : C.blue} hi={i === 2 ? 0.3 : 0} />)}
        <g opacity={cbow}><Arrow start={at(2, 0.2)} x1={X[1]} y1={440} x2={X[2] - 30} y2={430} color={C.teal} /><Arrow start={at(2, 0.2)} x1={X[3]} y1={440} x2={X[2] + 30} y2={430} color={C.teal} />
          <T x={X[2]} y={360} size={36} weight={750} color={C.teal}>CBOW: context → center</T></g>
        <g opacity={sg}><Arrow start={at(2, 0.6)} x1={X[2] - 30} y1={570} x2={X[1]} y2={580} color={C.purple} /><Arrow start={at(2, 0.6)} x1={X[2] + 30} y1={570} x2={X[3]} y2={580} color={C.purple} />
          <T x={X[2]} y={680} size={36} weight={750} color={C.purple}>skip-gram: center → context</T></g>
      </g>
      <g opacity={s3}>
        <Chip start={at(3)} x={960} y={360} text="<evler>" size={48} mono />
        {['<ev', 'evl', 'vle', 'ler', 'er>'].map((p, i) => <Chip key={p} start={at(3, 0.25 + i * 0.08)} x={560 + i * 200} y={560} text={p} size={40} color={C.teal} hi={0.25} mono />)}
        <Rise start={at(3, 0.7)} x={960} y={700} size={32} color={C.mute}>rare Turkish forms share pieces</Rise>
      </g>
      <g opacity={s4}>
        <Chip start={at(4)} x={560} y={400} text="dog bites man" size={40} />
        <Chip start={at(4, 0.1)} x={560} y={560} text="man bites dog" size={40} />
        <Arrow start={at(4, 0.3)} x1={760} y1={400} x2={980} y2={470} color={C.mute} />
        <Arrow start={at(4, 0.3)} x1={760} y1={560} x2={980} y2={490} color={C.mute} />
        <Chip start={at(4, 0.4)} x={1180} y={480} text="mean [0.67, 0.67]" size={38} color={C.red} hi={0.2} mono />
        <Tag start={at(4, 0.6)} x={1180} y={620} color={C.red} filled text="same vector: order lost" />
      </g>
    </Stage>
  );
};

/* ---------- 2. CNN ---------- */
const CNN: React.FC = () => {
  const {f, at} = useScene();
  const toks = ['not', 'very', 'good', 'today'], vec = ['[1,0]', '[0,1]', '[1,1]', '[0,0]'], out = [2, 1, 0];
  const pos = Math.min(2, Math.max(0, Math.floor((f - at(1)) / Math.max(1, at(1, 0.33) - at(1)))));
  const slide = win(f, at(1), at(2)), pool = prog(f, at(3), 14);
  const vals = [0.2, 0.3, 0.95, 0.88, 0.82];
  return (
    <Stage>
      <StageHeading start={at(0)} text="CNN: a filter slides over word windows" />
      <g opacity={1 - pool}>
        {toks.map((w, i) => <g key={w}><Chip start={at(0, 0.2 + i * 0.05)} x={420 + i * 260} y={360} text={w} size={40} />
          <T x={420 + i * 260} y={450} size={32} font={MONO} color={C.mute} o={prog(f, at(0, 0.4), 10)}>{vec[i]}</T></g>)}
        <rect x={290 + pos * 260} y={300} width={520} height={190} rx={20} fill="none" stroke={C.orange} strokeWidth={6} opacity={slide} />
        <T x={1660} y={340} size={30} color={C.mute} o={prog(f, at(0, 0.5), 10)}>filter W</T>
        <T x={1660} y={390} size={34} font={MONO} o={prog(f, at(0, 0.5), 10)}>[[1, −1], [1, 1]]</T>
        {out.map((v, i) => <g key={i} opacity={prog(f, at(1, 0.05 + i * 0.3), 10)}>
          <rect x={485 + i * 260} y={560} width={130} height={90} rx={12} fill={C.orange} fillOpacity={0.15 + 0.2 * v} stroke={C.orange} strokeWidth={3} />
          <T x={550 + i * 260} y={620} size={44} weight={800} font={MONO}>{v}</T></g>)}
        <Rise start={at(1, 0.1)} x={960} y={740} size={30} color={C.mute}>multiply, add, ReLU</Rise>
        <Typed start={at(2, 0.1)} x={960} y={860} text="7 tokens, width 3:  7 − 3 + 1 = 5 windows" size={40} />
      </g>
      <g opacity={pool}>
        {vals.map((v, i) => <Bar key={i} start={at(3, 0.05 + i * 0.05)} x={500 + i * 230} y={760} w={150} h={v * 420} color={i === 2 ? C.orange : C.mute} value={v.toFixed(2)} o={i === 2 ? 1 : mix(1, 0.3, prog(f, at(3, 0.55), 14))} />)}
        <Tag start={at(3, 0.55)} x={960} y={880} color={C.orange} filled text="max pooling keeps 0.95, forgets where" />
      </g>
    </Stage>
  );
};

/* ---------- 3. RNN, gradients, LSTM, BiLSTM ---------- */
const RNN: React.FC = () => {
  const {f, at} = useScene();
  const a = win(f, at(0), at(2)), g = win(f, at(2), at(3)), l = win(f, at(3), at(4)), b = prog(f, at(4), 14);
  const row = (y: number, ins: number[], hs: string[], s: number, col: string) => (
    <g>
      {[0, 1, 2].map((k) => <g key={k}>
        <circle cx={480 + k * 380} cy={y} r={62} fill={C.card} stroke={col} strokeWidth={5} opacity={prog(f, s + k * 8, 10)} />
        <T x={480 + k * 380} y={y + 12} size={34} weight={750} font={MONO} o={prog(f, s + k * 8, 10)}>{['0', ...hs][k]}</T>
        <T x={480 + k * 380} y={y + 100} size={26} color={C.mute} o={prog(f, s + k * 8, 10)}>{`h${k}`}</T>
        {k > 0 && <><Arrow start={s + k * 8} x1={480 + (k - 1) * 380 + 70} y1={y} x2={480 + k * 380 - 70} y2={y} color={col} />
          <T x={480 + k * 380 - 190} y={y - 30} size={30} font={MONO} color={col} o={prog(f, s + k * 8, 10)}>{`x=${ins[k - 1]}`}</T></>}
      </g>)}
    </g>
  );
  return (
    <Stage>
      <StageHeading start={at(0)} text="RNN, LSTM and BiLSTM" />
      <g opacity={a}>
        <Rise start={at(0, 0.3)} x={960} y={250} size={32} color={C.mute}>h[t] = tanh(x[t] + 0.5 · h[t−1])</Rise>
        {row(420, [1, -1], ['0.76', '−0.55'], at(1, 0.05), C.blue)}
        {row(700, [-1, 1], ['−0.76', '0.55'], at(1, 0.45), C.orange)}
        <Tag start={at(1, 0.75)} x={1650} y={560} color={C.green} text="order matters" />
      </g>
      <g opacity={g}>
        <T x={600} y={320} size={36} weight={700}>0.5 × 0.5 × … (20 times)</T>
        <T x={1320} y={320} size={36} weight={700}>1.5 × 1.5 × … (20 times)</T>
        <Bar start={at(2, 0.3)} x={600} y={820} w={160} h={4} color={C.blue} value="0.000001" />
        <Bar start={at(2, 0.55)} x={1320} y={820} w={160} h={420} color={C.red} value="3325" />
        <Tag start={at(2, 0.4)} x={600} y={900} color={C.blue} text="vanishing" />
        <Tag start={at(2, 0.65)} x={1320} y={900} color={C.red} text="exploding" />
      </g>
      <g opacity={l}>
        <Card start={at(3)} x={960} y={560} w={1300} h={480} stroke={C.purple}>
          <T y={-170} size={34} weight={700} color={C.purple}>LSTM cell</T>
          <T x={-330} y={-80} size={34} font={MONO}>f × c_old</T><T x={-330} y={-20} size={34} font={MONO}>0.8 × 0.5</T><T x={-330} y={50} size={44} weight={800} color={C.green} font={MONO}>0.40</T>
          <T x={0} y={20} size={60} weight={800}>+</T>
          <T x={330} y={-80} size={34} font={MONO}>i × g</T><T x={330} y={-20} size={34} font={MONO}>0.25 × (−0.4)</T><T x={330} y={50} size={44} weight={800} color={C.red} font={MONO}>−0.10</T>
          <T y={170} size={50} weight={800} font={MONO} o={prog(f, at(3, 0.75), 12)}>c = 0.30</T>
        </Card>
      </g>
      <g opacity={b}>
        {['This', 'movie', 'was', 'excellent'].map((w, i) => <Chip key={w} start={at(4, 0.02 * i)} x={420 + i * 360} y={560} text={w} size={40} />)}
        <Arrow start={at(4, 0.1)} x1={300} y1={450} x2={1620} y2={450} color={C.blue} w={6} dur={30} />
        <Arrow start={at(4, 0.2)} x1={1620} y1={670} x2={300} y2={670} color={C.orange} w={6} dur={30} />
        <Typed start={at(4, 0.5)} x={960} y={850} text="256 + 256 = 512 features, same 4 tokens" size={42} />
      </g>
    </Stage>
  );
};

/* ---------- 4. attention ---------- */
const Attention: React.FC = () => {
  const {f, at} = useScene();
  const pad = prog(f, at(3, 0.2), 20), fm = prog(f, at(4), 14);
  const w = [mix(0.25, 1 / 3, pad), mix(0.5, 2 / 3, pad), mix(0.25, 0, pad)];
  const lab = pad > 0.5 ? ['1/3', '2/3', '0'] : ['1/4', '1/2', '1/4'];
  const V = ['[2, 0]', '[0, 4]', '[2, 2]'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Attention: a weighted mix" />
      <g opacity={1 - fm}>
        {['token 1', 'token 2', pad > 0.5 ? 'PAD' : 'token 3'].map((t, i) => <Chip key={i} start={at(0, 0.3 + i * 0.05)} x={420 + i * 380} y={300} text={t} size={38} color={i === 2 && pad > 0.5 ? C.mute : C.blue} />)}
        {['0', 'ln 2', pad > 0.5 ? '−∞' : '0'].map((s, i) => <T key={i} x={420 + i * 380} y={410} size={36} font={MONO} o={prog(f, at(1, 0.05), 10)}>{`s = ${s}`}</T>)}
        {['1', '2', pad > 0.5 ? '0' : '1'].map((s, i) => <T key={i} x={420 + i * 380} y={470} size={34} font={MONO} color={C.mute} o={prog(f, at(1, 0.3), 10)}>{`exp = ${s}`}</T>)}
        {w.map((v, i) => <g key={i} opacity={prog(f, at(1, 0.55), 10)}>
          <rect x={360 + i * 380} y={820 - 330 * v} width={120} height={330 * v} rx={8} fill={C.orange} />
          <T x={420 + i * 380} y={800 - 330 * v} size={36} weight={800}>{lab[i]}</T></g>)}
        {V.map((v, i) => <T key={i} x={420 + i * 380} y={880} size={32} font={MONO} color={C.purple} o={prog(f, at(2, 0.05), 10) * (1 - pad)}>{`V = ${v}`}</T>)}
        <Typed start={at(2, 0.3)} x={1560} y={560} text="z = [1, 2.5]" size={46} color={C.purple} out={at(3)} />
        <Tag start={at(3, 0.5)} x={1560} y={560} color={C.mute} filled text="mask: −∞ → weight 0" />
      </g>
      <g opacity={fm}>
        <Typed start={at(4, 0.05)} x={960} y={420} text="softmax( Q Kᵀ / √dₖ ) V" size={64} />
        <Rise start={at(4, 0.45)} x={960} y={560} size={36}>keeps the softmax from getting too sharp</Rise>
        <Typed start={at(4, 0.65)} x={960} y={700} text="BERT base: 768 / 12 = 64,  √64 = 8" size={44} color={C.blue} />
      </g>
    </Stage>
  );
};

/* ---------- 5. BERT ---------- */
const BERT: React.FC = () => {
  const {f, at} = useScene();
  const inp = win(f, at(1), at(2)), mlm = win(f, at(2), at(3)), head = win(f, at(3), at(4)), cut = prog(f, at(4), 14);
  const toks = ['[CLS]', 'great', '[SEP]', 'bad', '[SEP]'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="BERT" />
      <g opacity={1 - prog(f, at(1), 14)}>
        {[0, 1, 2, 3].map((i) => <Card key={i} start={at(0, 0.2 + i * 0.1)} x={960} y={780 - i * 120} w={700} h={96} stroke={C.blue}><T y={12} size={32} weight={700}>attention block, both directions</T></Card>)}
      </g>
      <g opacity={inp}>
        {toks.map((t, i) => <g key={i}>
          <Chip start={at(1, 0.05)} x={460 + i * 250} y={300} text={t} size={34} mono />
          {[['token', C.blue], ['segment ' + (i < 3 ? 'A' : 'B'), C.teal], ['position ' + i, C.orange]].map(([l, c], k) => (
            <g key={k} opacity={prog(f, at(1, 0.25 + k * 0.15), 10)}><rect x={460 + i * 250 - 105} y={400 + k * 110} width={210} height={80} rx={10} fill={c} fillOpacity={0.18} stroke={c} strokeWidth={3} />
              <T x={460 + i * 250} y={450 + k * 110} size={24} weight={650}>{l}</T></g>))}
        </g>)}
        <T x={1720} y={560} size={70} weight={800} o={prog(f, at(1, 0.5), 10)}>+</T>
      </g>
      <g opacity={mlm}>
        <Chip start={at(2)} x={960} y={330} text="The film was [MASK]" size={44} mono />
        <Arrow start={at(2, 0.3)} x1={960} y1={400} x2={960} y2={490} />
        <Chip start={at(2, 0.35)} x={960} y={560} text="excellent  p = 0.25" size={42} color={C.green} hi={0.2} />
        <Typed start={at(2, 0.6)} x={960} y={720} text="loss = −ln 0.25 = ln 4 ≈ 1.386" size={44} />
      </g>
      <g opacity={head}>
        <Chip start={at(3)} x={700} y={500} text="[CLS] vector" size={40} mono />
        <Arrow start={at(3, 0.2)} x1={880} y1={500} x2={1040} y2={500} />
        <Card start={at(3, 0.25)} x={1180} y={500} w={240} h={110} stroke={C.purple}><T y={12} size={34} weight={700}>head</T></Card>
        <Arrow start={at(3, 0.4)} x1={1310} y1={500} x2={1440} y2={500} />
        <Chip start={at(3, 0.45)} x={1560} y={500} text="positive" size={40} color={C.green} hi={1} />
        <Rise start={at(3, 0.5)} x={960} y={680} size={32} color={C.mute}>fine-tuned on labeled reviews</Rise>
      </g>
      <g opacity={cut}>
        <rect x={200} y={460} width={1000} height={110} rx={14} fill={C.blue} fillOpacity={0.2} stroke={C.blue} strokeWidth={4} />
        <T x={700} y={528} size={34}>"The first hour was brilliant …</T>
        <g transform={`translate(${mix(0, 160, prog(f, at(4, 0.5), 24))} ${mix(0, 120, prog(f, at(4, 0.5), 24))})`} opacity={mix(1, 0.6, prog(f, at(4, 0.5), 24))}>
          <rect x={1220} y={460} width={520} height={110} rx={14} fill={C.red} fillOpacity={0.15} stroke={C.red} strokeWidth={4} strokeDasharray="12 8" />
          <T x={1480} y={528} size={32} color={C.red}>… but the ending ruined it."</T>
        </g>
        <line x1={1210} x2={1210} y1={420} y2={610} stroke={C.ink} strokeWidth={5} />
        <T x={1210} y={400} size={30} weight={700}>128 tokens</T>
        <Tag start={at(4, 0.65)} x={700} y={760} color={C.red} filled text="cut before attention can see it" />
      </g>
    </Stage>
  );
};

/* ---------- 6. metrics ---------- */
const Metrics: React.FC = () => {
  const {f, at} = useScene();
  const cells: [string, number, string][] = [['TP', 30, C.green], ['FN', 10, C.red], ['FP', 5, C.orange], ['TN', 55, C.teal]];
  const pc = win(f, at(1, 0.05), at(1, 0.5)), rc = win(f, at(1, 0.5), at(2));
  const later = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Measure it properly" />
      <T x={520} y={290} size={28} color={C.mute} o={prog(f, at(0, 0.3), 10)}>predicted +       predicted −</T>
      {cells.map(([l, v, c], i) => {
        const x = 420 + (i % 2) * 220, y = 340 + Math.floor(i / 2) * 200;
        const hi = (l === 'TP' ? Math.max(pc, rc) : 0) + (l === 'FP' ? pc : 0) + (l === 'FN' ? rc : 0);
        return <g key={l} opacity={prog(f, at(0, 0.2 + i * 0.1), 10)}><rect x={x - 100} y={y} width={200} height={180} rx={14} fill={c} fillOpacity={0.15 + 0.6 * hi} stroke={c} strokeWidth={4} />
          <T x={x} y={y + 70} size={30} weight={700}>{l}</T><T x={x} y={y + 135} size={52} weight={800}>{v}</T></g>;
      })}
      <T x={230} y={440} size={26} color={C.mute} anchor="end" o={prog(f, at(0, 0.3), 10)}>actual +</T>
      <T x={230} y={640} size={26} color={C.mute} anchor="end" o={prog(f, at(0, 0.3), 10)}>actual −</T>
      <Typed start={at(1, 0.1)} x={900} y={360} text="precision = 30 / 35 ≈ 0.857" size={40} anchor="start" />
      <Typed start={at(1, 0.55)} x={900} y={440} text="recall    = 30 / 40 = 0.75" size={40} anchor="start" />
      <Typed start={at(2, 0.05)} x={900} y={560} text="F1 = 2TP / (2TP + FP + FN)" size={40} anchor="start" />
      <Typed start={at(2, 0.5)} x={900} y={630} text="   = 60 / 75 = 0.8" size={44} anchor="start" color={C.blue} weight={750} />
      <g opacity={later}>
        <Typed start={at(3, 0.1)} x={900} y={750} text="macro-F1 = (0.80 + 0.88) / 2 = 0.84" size={38} anchor="start" />
        <Tag start={at(4, 0.3)} x={1250} y={880} color={C.red} filled text="always-negative baseline: 60% accuracy" />
      </g>
    </Stage>
  );
};

export const W3bScenes = {embed: Embed, cnn: CNN, rnn: RNN, attention: Attention, bert: BERT, metrics: Metrics};
