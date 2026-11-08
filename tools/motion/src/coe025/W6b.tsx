/* COE025 Week 6, part 2 · HMM and CRF. Narration: src/scripts/coe025-W6b.json */
import React from 'react';
import {Arrow, C, Card, Mark, mix, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';
import {Bar, Chip, MONO, shake, Typed, win} from './kit';

/* ---------- 1. the HMM picture ---------- */
const HMM: React.FC = () => {
  const {f, at} = useScene();
  const node = (x: number, y: number, txt: string, c: string, s: number) => (
    <g opacity={prog(f, s, 12)}><circle cx={x} cy={y} r={80} fill={c} fillOpacity={0.15} stroke={c} strokeWidth={5} /><T x={x} y={y + 14} size={40} weight={750}>{txt}</T></g>);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Hidden Markov model" />
      <Rise start={at(0, 0.3)} x={960} y={240} size={32} color={C.mute}>choose labels that fit the words and each other</Rise>
      {node(660, 420, '? tag', C.purple, at(1, 0.1))}{node(1260, 420, '? tag', C.purple, at(1, 0.2))}
      {node(660, 760, 'can', C.blue, at(1, 0.4))}{node(1260, 760, 'fish', C.blue, at(1, 0.45))}
      <T x={300} y={430} size={30} color={C.purple} weight={700} o={prog(f, at(1, 0.1), 10)}>hidden</T>
      <T x={300} y={770} size={30} color={C.blue} weight={700} o={prog(f, at(1, 0.4), 10)}>visible</T>
      <Arrow start={at(1, 0.6)} x1={660} y1={505} x2={660} y2={672} color={C.blue} />
      <Arrow start={at(1, 0.65)} x1={1260} y1={505} x2={1260} y2={672} color={C.blue} />
      <Arrow start={at(2, 0.05)} x1={745} y1={420} x2={1172} y2={420} color={C.purple} w={6} />
      <T x={960} y={395} size={30} weight={700} color={C.purple} o={prog(f, at(2, 0.1), 10)}>transition a(prev, next)</T>
      <T x={540} y={600} size={30} weight={700} color={C.blue} anchor="end" o={prog(f, at(2, 0.55), 10)}>emission b</T>
      <g opacity={prog(f, at(3), 12)}>
        <Chip start={at(3, 0.1)} x={1620} y={560} text="P(can | tag)" size={36} color={C.green} hi={1} mono />
        <g transform={`translate(${shake(f, at(3, 0.5))} 0)`}><Chip start={at(3, 0.35)} x={1620} y={680} text="P(tag | can)" size={36} color={C.red} mono /></g>
        <Mark start={at(3, 0.5)} x={1840} y={680} ok={false} size={44} />
      </g>
    </Stage>
  );
};

/* ---------- 2. four paths ---------- */
const PATHS: [string, string, number][] = [['NN', '0.6 × 0.4 × 0.3 × 0.6', 0.0432], ['NV', '0.6 × 0.4 × 0.7 × 0.3', 0.0504], ['VN', '0.4 × 0.7 × 0.8 × 0.6', 0.1344], ['VV', '0.4 × 0.7 × 0.2 × 0.3', 0.0168]];
const Paths: React.FC = () => {
  const {f, at} = useScene();
  const post = prog(f, at(4), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text={'Four paths for "can fish"'} />
      <Rise start={at(1, 0.05)} x={960} y={250} size={34} color={C.mute}>start × emission × transition × emission</Rise>
      {PATHS.map(([p, calc, w], i) => {
        const y = 360 + i * 120, vn = p === 'VN', s = vn ? at(2, 0.05) : at(2, 0.75 + i * 0.03);
        return (
          <g key={p}>
            <Chip start={at(0, 0.3 + i * 0.08)} x={300} y={y} text={p} size={40} color={vn ? C.orange : C.blue} hi={vn ? prog(f, at(2), 12) : 0} mono />
            <Typed start={s} x={420} y={y + 14} text={calc} size={36} anchor="start" cps={50} />
            <rect x={1000} y={y - 30} width={w * 4200 * prog(f, s + 20, 20)} height={60} rx={8} fill={vn ? C.orange : C.blue} opacity={0.85} />
            <T x={1020 + w * 4200} y={y + 12} size={34} weight={750} anchor="start" o={prog(f, s + 34, 10)}>{w.toFixed(4)}</T>
          </g>
        );
      })}
      <Typed start={at(3, 0.1)} x={960} y={880} text="sum = 0.2448 = P(can, fish)" size={44} out={at(4)} />
      <g opacity={post}>
        <Typed start={at(4, 0.2)} x={960} y={880} text="posterior(VN) = 0.1344 / 0.2448 ≈ 0.55" size={44} color={C.orange} />
        <Tag start={at(4, 0.1)} x={1600} y={800} color={C.red} text="0.1344 is joint" />
      </g>
    </Stage>
  );
};

/* ---------- 3. Viterbi and forward ---------- */
const Viterbi: React.FC = () => {
  const {f, at} = useScene();
  const XC = 640, XF = 1240, YN = 470, YV = 750;
  const cell = (x: number, y: number, txt: string, sub: string, s: number, hot = 0, c = C.blue) => (
    <g opacity={prog(f, s, 12)}><rect x={x - 150} y={y - 75} width={300} height={150} rx={18} fill={c} fillOpacity={0.12 + 0.6 * hot} stroke={c} strokeWidth={4} />
      <T x={x} y={y - 8} size={40} weight={800} color={hot > 0.5 ? '#fff' : C.ink}>{txt}</T><T x={x} y={y + 40} size={26} color={hot > 0.5 ? '#fff' : C.mute} font={MONO}>{sub}</T></g>);
  const back = prog(f, at(4), 14), fwd = prog(f, at(5), 14);
  const keepVN = prog(f, at(2, 0.6), 12), keepNV = prog(f, at(3, 0.4), 12);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Viterbi: best partial path per tag" />
      <T x={XC} y={260} size={40} weight={750} font={MONO} o={prog(f, at(0, 0.3), 10)}>can</T>
      <T x={XF} y={260} size={40} weight={750} font={MONO} o={prog(f, at(0, 0.3), 10)}>fish</T>
      <T x={300} y={YN + 12} size={40} weight={800} o={prog(f, at(0, 0.3), 10)}>N</T>
      <T x={300} y={YV + 12} size={40} weight={800} o={prog(f, at(0, 0.3), 10)}>V</T>
      {cell(XC, YN, '0.24', '0.6 × 0.4', at(1, 0.1))}
      {cell(XC, YV, '0.28', '0.4 × 0.7', at(1, 0.5), back, C.orange)}
      {/* edges into fish/N */}
      <g opacity={1 - fwd}>
        <line x1={XC + 150} y1={YN} x2={XF - 150} y2={YN} stroke={keepVN ? C.line : C.mute} strokeWidth={4} opacity={prog(f, at(2, 0.1), 10) * (1 - keepVN * 0.7)} />
        <line x1={XC + 150} y1={YV} x2={XF - 150} y2={YN + 30} stroke={back ? C.green : C.mute} strokeWidth={back ? 8 : 4} opacity={prog(f, at(2, 0.3), 10)} />
        <T x={XF} y={YN - 140} size={26} font={MONO} color={C.mute} o={prog(f, at(2, 0.1), 10)}>from N: 0.24×0.3 = 0.072</T>
        <T x={XF} y={YN - 102} size={26} font={MONO} weight={700} o={prog(f, at(2, 0.3), 10)}>from V: 0.28×0.8 = 0.224</T>
        <line x1={XC + 150} y1={YN + 30} x2={XF - 150} y2={YV - 30} stroke={C.mute} strokeWidth={4} opacity={prog(f, at(3, 0.05), 10)} />
        <line x1={XC + 150} y1={YV} x2={XF - 150} y2={YV} stroke={C.line} strokeWidth={4} opacity={prog(f, at(3, 0.05), 10) * (1 - keepNV * 0.7)} />
        <T x={XF} y={YV + 118} size={26} font={MONO} weight={700} o={prog(f, at(3, 0.05), 10)}>from N: 0.24×0.7 = 0.168</T>
        <T x={XF} y={YV + 156} size={26} font={MONO} color={C.mute} o={prog(f, at(3, 0.05), 10)}>from V: 0.28×0.2 = 0.056</T>
      </g>
      {cell(XF, YN, '0.1344', '← V', at(2, 0.6), back, C.orange)}
      {cell(XF, YV, '0.0504', '← N', at(3, 0.4))}
      <g opacity={back * (1 - fwd)}>
        <T x={1640} y={YN + 12} size={36} weight={800} color={C.orange}>best: V → N</T>
        <Typed start={at(4, 0.5)} x={1630} y={YV} text="O(T·K²) not Kᵀ" size={36} />
      </g>
      <g opacity={fwd}>
        <Rise start={at(5, 0.1)} x={1640} y={YN - 30} size={30} color={C.teal} weight={700}>forward: sum</Rise>
        <T x={1640} y={YN + 20} size={32} font={MONO}>0.072 + 0.224 → 0.1776</T>
        <T x={1640} y={YV + 10} size={32} font={MONO}>0.168 + 0.056 → 0.0672</T>
        <Typed start={at(5, 0.5)} x={1640} y={YV + 150} text="sum = 0.2448" size={40} color={C.teal} />
      </g>
    </Stage>
  );
};

/* ---------- 4. training and limits ---------- */
const Limits: React.FC = () => {
  const {f, at} = useScene();
  const z = prog(f, at(1), 14), lim = prog(f, at(2), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Learning by counting, and the limit" />
      <g opacity={1 - lim}>
        <Bar start={at(0, 0.3)} x={520} y={700} w={150} h={3 * 45} color={C.blue} label="N → N" value="3" />
        <Bar start={at(0, 0.35)} x={760} y={700} w={150} h={7 * 45} color={C.purple} label="N → V" value="7" />
        <Typed start={at(0, 0.6)} x={1300} y={480} text="3/10 = 0.3" size={46} />
        <Typed start={at(0, 0.75)} x={1300} y={560} text="7/10 = 0.7" size={46} />
        <g opacity={z}>
          <Chip start={at(1)} x={1300} y={720} text="count 0 → whole path × 0" size={34} color={C.red} />
          <Chip start={at(1, 0.5)} x={1300} y={840} text="smoothing: (count + 1) / (total + K)" size={32} color={C.green} hi={0.2} mono />
        </g>
      </g>
      <g opacity={lim}>
        <circle cx={760} cy={430} r={80} fill={C.purple} fillOpacity={0.15} stroke={C.purple} strokeWidth={5} /><T x={760} y={444} size={40} weight={750}>tag</T>
        <Arrow start={at(2, 0.1)} x1={760} y1={515} x2={760} y2={680} color={C.blue} />
        <Chip start={at(2, 0.15)} x={760} y={740} text="one word" size={40} color={C.blue} />
        {['Capital letter', 'suffix -ed', 'neighbour words'].map((t, i) => {
          const s = at(2, 0.35 + i * 0.15), x = mix(1700, 1050, prog(f, s, 18)) + (f > s + 18 ? mix(0, 120, prog(f, s + 18, 14)) : 0);
          return <g key={t}><Chip start={s} x={x} y={430 + i * 160} text={t} size={34} color={C.orange} /><Mark start={s + 18} x={x - 200} y={430 + i * 160} ok={false} size={40} /></g>;
        })}
        <Rise start={at(2, 0.8)} x={960} y={960} size={32} color={C.red}>overlapping clues are hard to add</Rise>
      </g>
    </Stage>
  );
};

/* ---------- 5. CRF ---------- */
const CRF: React.FC = () => {
  const {f, at} = useScene();
  const P = ['NN', 'NV', 'VN', 'VV'], W0 = [2, 4, 1, 2], W1 = [2, 4, 8, 2];
  const t = prog(f, at(2, 0.4), 24), norm = prog(f, at(3, 0.2), 20);
  const base = 800, unit = 48;
  return (
    <Stage>
      <StageHeading start={at(0)} text="CRF: score whole sequences" />
      <Typed start={at(0, 0.3)} x={960} y={250} text="P(Y | X) = exp(S) / Z" size={48} />
      <Rise start={at(1, 0.05)} x={960} y={330} size={30} color={C.mute}>unary: can → N (ln 2), fish → V (ln 2)</Rise>
      <Chip start={at(2, 0.1)} x={1620} y={420} text="a(V, N) = ln 8" size={36} color={C.orange} hi={1} mono />
      {P.map((p, i) => {
        const w = mix(W0[i], W1[i], t), x = 420 + i * 300, h = w * unit, win_ = p === (t > 0.5 ? 'VN' : 'NV');
        const val = norm > 0.5 ? (W1[i] / 16).toFixed(3).replace(/0+$/, '') : String(Math.round(w));
        return <g key={p} opacity={prog(f, at(1, 0.2 + i * 0.05), 10)}>
          <rect x={x - 70} y={base - h} width={140} height={h} rx={10} fill={win_ ? C.orange : C.blue} />
          <T x={x} y={base - h - 20} size={36} weight={800}>{val}</T>
          <T x={x} y={base + 50} size={38} weight={750} font={MONO}>{p}</T>
        </g>;
      })}
      <Typed start={at(3, 0.05)} x={1620} y={560} text="Z = 2+4+8+2 = 16" size={36} />
      <Typed start={at(3, 0.5)} x={1620} y={630} text="P(VN) = 8/16 = 0.5" size={36} color={C.orange} />
      <Typed start={at(4, 0.05)} x={960} y={960} text="loss = ln Z − S(gold) = ln 16 − ln 8 = ln 2" size={40} />
      <Tag start={at(4, 0.6)} x={1620} y={760} color={C.blue} text="decode: max · Z: sum" />
    </Stage>
  );
};

/* ---------- 6. constraints, neural taggers, the comparison ---------- */
const Constraints: React.FC = () => {
  const {f, at} = useScene();
  const a = win(f, at(0), at(2)), b = win(f, at(2), at(3)), c = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Constraints, neural taggers, the choice" />
      <g opacity={a}>
        {[['O', 'I-PER'], ['START', 'I-PER']].map(([x, y], i) => (
          <g key={x}><Chip start={at(0, 0.3 + i * 0.2)} x={560} y={400 + i * 180} text={x} size={38} color={C.mute} mono />
            <Arrow start={at(0, 0.35 + i * 0.2)} x1={680} y1={400 + i * 180} x2={860} y2={400 + i * 180} color={C.red} />
            <Chip start={at(0, 0.4 + i * 0.2)} x={980} y={400 + i * 180} text={y} size={38} color={C.purple} hi={1} mono /></g>))}
        <T x={1450} y={430} size={34} color={C.mute} o={win(f, at(1, 0.05), at(1, 0.5))}>learned finite score: only discourages</T>
        <Typed start={at(1, 0.5)} x={1450} y={430} text="hard: −∞" size={54} color={C.red} />
        <Typed start={at(1, 0.65)} x={1450} y={530} text="exp(−∞) = 0" size={40} />
      </g>
      <g opacity={b}>
        <Card start={at(2)} x={960} y={330} w={900} h={110} stroke={C.blue}><T y={12} size={34} weight={700}>encoder reads the whole sentence → hᵢ</T></Card>
        <Arrow start={at(2, 0.15)} x1={960} y1={390} x2={960} y2={470} />
        <Card start={at(2, 0.2)} x={960} y={530} w={700} h={110} stroke={C.teal}><T y={12} size={34} weight={700} font={MONO}>zᵢ = W hᵢ + b</T></Card>
        <Card start={at(2, 0.45)} x={560} y={760} w={620} h={150} stroke={C.mute}><T y={-10} size={34} weight={700}>softmax head</T><T y={40} size={28} color={C.mute}>each token alone</T></Card>
        <Card start={at(2, 0.7)} x={1360} y={760} w={620} h={150} stroke={C.orange}><T y={-10} size={34} weight={700}>CRF on top</T><T y={40} size={28} color={C.mute}>all tokens together</T></Card>
      </g>
      <g opacity={c}>
        {[['HMM', 'words + tags jointly', 'Viterbi on probabilities', C.purple], ['softmax head', 'each label from context', 'argmax per token', C.teal], ['linear-chain CRF', 'whole sequence given input', 'Viterbi on scores', C.orange]].map(([t, m, d, col], i) => (
          <Card key={t} start={at(3, 0.05 + i * 0.12)} x={380 + i * 580} y={520} w={540} h={300} stroke={col} sw={5}>
            <T y={-80} size={40} weight={800} color={col}>{t}</T><T y={0} size={30}>{m}</T><T y={60} size={28} color={C.mute}>{d}</T>
          </Card>))}
        <Tag start={at(3, 0.7)} x={960} y={820} color={C.blue} filled text="pick by assumptions, evaluate spans" />
      </g>
    </Stage>
  );
};

export const W6bScenes = {hmm: HMM, paths: Paths, viterbi: Viterbi, limits: Limits, crf: CRF, constraints: Constraints};
