// COE305 week 3: dimensionality d = 5, why reduce, selection vs extraction (z1 = 0.6 height + 0.8 weight),
// forward and backward search, PCA (centre, project, largest variance, PC2 perpendicular, 92% / 8%), iris 97.77%,
// PCA ignores the labels (LDA uses them).
import React from 'react';
import {
  Axes, C, Exam, HL, Head, MONO, MlEpisode, PURPLE, Proc, SANS, Sfx, Tag, ax, gauss, lerp, p, pop, tl, win,
} from './kit';
import timeline from '../timelines/ml-features.json';

const { B, at } = tl(timeline);
const FEATS = ['age', 'GPA', 'attendance', 'study hours', 'income'];

// ------------------------------------------------ scene 1: a student is five numbers
const Student: React.FC<{ f: number }> = ({ f }) => {
  const h = B('hook').start, w = B('why').start, w2 = B('why2').start;
  const ben = ['less computation', 'cheaper data', 'simpler model', 'plot it in 2D'];
  return <g>
    <Head f={f} a={h} b={w}>one student, five features</Head>
    <Head f={f} a={w}>why use fewer features?</Head>
    <Proc f={f} x={330} y={780} c={C.blue} label="student" seed={1} w={170} s={1.3 * pop(f, h + 4, 16)} mood={f > w2 + 20 ? 'worried' : 'happy'} look={[1, -0.4]} />
    <g transform="translate(560,250)">
      <rect width={520} height={FEATS.length * 96 + 40} rx={20} fill="#fbf9f4" stroke="#d9d1c1" strokeWidth={3} opacity={p(f, h + 8, h + 18)} />
      {FEATS.map((t, i) => <g key={t} opacity={p(f, at('hook', 0.25) + i * 9, at('hook', 0.25) + i * 9 + 8)}>
        <text x={40} y={78 + i * 96} fontFamily={SANS} fontWeight={800} fontSize={40} fill={C.ink}>{t}</text>
        <text x={480} y={78 + i * 96} textAnchor="end" fontFamily={MONO} fontWeight={800} fontSize={36} fill={C.muted}>{`x${'₁₂₃₄₅'[i]}`}</text>
        {i < 4 && <line x1={30} x2={490} y1={110 + i * 96} y2={110 + i * 96} stroke="#e6dccb" strokeWidth={2} />}
      </g>)}
    </g>
    <g opacity={p(f, at('hook', 0.8), at('hook', 0.9))}><Tag x={820} y={830} text="d = 5" bg={C.ink} fg="#fff" s={40} mono /></g>
    {ben.map((t, i) => {
      const a = at('why', 0.1 + i * 0.18);
      return <g key={t} transform={`translate(${1460},${300 + i * 120}) scale(${pop(f, a, 12)})`}>
        <rect x={-260} y={-44} width={520} height={88} rx={44} fill={C.green} opacity={0.14} />
        <text y={14} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={38} fill={C.green}>{t}</text>
      </g>;
    })}
    <g opacity={p(f, w2 + 4, w2 + 14)}>
      <Tag x={1460} y={820} text="fewer ≠ more accurate" bg={C.red} fg="#fff" s={36} />
      <g opacity={p(f, at('why2', 0.55), at('why2', 0.65))}><Tag x={1460} y={920} text="keep the useful information" bg={HL} s={34} /></g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 2: selection keeps columns, extraction builds new ones
const SelExt: React.FC<{ f: number }> = ({ f }) => {
  const s = B('sel').start, e = B('ext').start;
  const keep = [1, 3];
  const drop = p(f, at('sel', 0.45), at('sel', 0.6));
  const merge = p(f, at('ext', 0.35), at('ext', 0.6));
  const col = (x: number, w: number, head: string, c: string, o: number, y0: number, hl = 0) => <g opacity={o}>
    <rect x={x} y={y0} width={w} height={66} rx={10} fill={c} />
    <text x={x + w / 2} y={y0 + 44} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill="#fff">{head}</text>
    {[0, 1, 2].map(r => <rect key={r} x={x + 10} y={y0 + 82 + r * 52} width={w - 20} height={40} rx={8} fill={hl ? HL : '#ece4d3'} opacity={hl ? 0.6 : 1} />)}
  </g>;
  return <g>
    <Head f={f} a={s} b={e}>selection keeps original columns</Head>
    <Head f={f} a={e}>extraction builds new ones</Head>
    {/* selection */}
    <g opacity={p(f, s + 2, s + 12)}>
      <text x={150} y={300} fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.blue}>selection</text>
      {FEATS.map((t, i) => {
        const k = keep.includes(i);
        return <g key={t}>{col(500 + i * 270, 250, t, k ? C.blue : '#9c9483', k ? 1 : 1 - 0.75 * drop, 240, k ? drop : 0)}</g>;
      })}
      <g opacity={drop}>{[0, 2, 4].map(i => <path key={i} d={`M${530 + i * 270},300 l190,140 M${720 + i * 270},300 l-190,140`} stroke={C.red} strokeWidth={6} strokeLinecap="round" opacity={0.8} />)}</g>
    </g>
    {/* extraction */}
    <g opacity={p(f, e, e + 12)}>
      <line x1={140} x2={1780} y1={575} y2={575} stroke="#d9d1c1" strokeWidth={3} />
      <text x={150} y={680} fontFamily={SANS} fontWeight={800} fontSize={36} fill={C.teal}>extraction</text>
      {col(lerp(500, 700, merge), 250, 'height', C.teal, 1 - merge, 620)}
      {col(lerp(770, 700, merge), 250, 'weight', C.teal, 1 - merge, 620)}
      {merge > 0 && <g transform={`translate(825,${620 + 110}) scale(${0.4 + 0.6 * merge})`} opacity={merge}><g transform="translate(-125,-110)">{col(0, 250, 'z₁ (new)', PURPLE, 1, 0, 1)}</g></g>}
      <g opacity={p(f, at('ext', 0.6), at('ext', 0.7))}>
        <text x={1110} y={760} fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>z₁ = 0.6·height</text>
        <text x={1110} y={820} fontFamily={MONO} fontWeight={800} fontSize={40} fill={C.ink}>   + 0.8·weight</text>
      </g>
    </g>
  </g>;
};

// ------------------------------------------------ scene 3: forward and backward search
const ERR1 = [0.7, 0.35, 0.8, 0.55, 0.9], ERR2 = [0.5, 0, 0.62, 0.24, 0.66];
const Search: React.FC<{ f: number }> = ({ f }) => {
  const a = B('fwd').start, b = B('fwd2').start;
  const r1 = at('fwd', 0.35), pick1 = at('fwd', 0.75), r2 = at('fwd2', 0.02), pick2 = at('fwd2', 0.25);
  const bars = (errs: number[], t0: number, used: number[], best: number, pick: number) => FEATS.map((t, i) => {
    if (used.includes(i)) return null;
    const x = 760 + i * 220, hgt = 300 * errs[i] * p(f, t0 + i * 6, t0 + i * 6 + 12);
    const win1 = i === best && f > pick;
    return <g key={t}>
      <rect x={x - 50} y={760 - hgt} width={100} height={hgt} rx={8} fill={win1 ? C.green : '#b4ad9f'} />
    </g>;
  });
  const sel1 = p(f, pick1, pick1 + 16), sel2 = p(f, pick2, pick2 + 16);
  const round2 = f >= r2 - 4;
  return <g>
    <Head f={f} a={a} b={b}>forward search: add one feature at a time</Head>
    <Head f={f} a={b}>stop when the error stops improving</Head>
    {/* the selected set */}
    <rect x={150} y={300} width={420} height={460} rx={22} fill="#fbf9f4" stroke={C.blue} strokeWidth={4} strokeDasharray="14 10" opacity={p(f, a + 4, a + 14)} />
    <text x={360} y={280} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.blue} opacity={p(f, a + 4, a + 14)}>chosen</text>
    <text x={360} y={545} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={56} fill={C.muted} opacity={win(f, a + 6, pick1 + 6)}>{'{ }'}</text>
    {/* candidates */}
    {FEATS.map((t, i) => {
      const chosen1 = i === 1, chosen2 = i === 3;
      const t1 = chosen1 ? sel1 : chosen2 ? sel2 : 0;
      const x = lerp(760 + i * 220, 360, t1), y = lerp(830, chosen1 ? 400 : 500, t1);
      return <g key={t} transform={`translate(${x},${y}) scale(${pop(f, a + 10 + i * 4, 12)})`}>
        <rect x={-100} y={-34} width={200} height={68} rx={34} fill={t1 > 0.5 ? C.blue : '#fbf9f4'} stroke={C.blue} strokeWidth={3} />
        <text y={11} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={t.length > 8 ? 26 : 30} fill={t1 > 0.5 ? '#fff' : C.ink}>{t}</text>
      </g>;
    })}
    <g opacity={round2 ? 1 - p(f, r2 - 4, r2) : p(f, r1 - 6, r1)}>{bars(ERR1, r1, [], 1, pick1)}</g>
    <g opacity={round2 ? 1 : 0}>{bars(ERR2.map((e, i) => (i === 1 ? 0 : e)), r2, [1], 3, pick2)}</g>
    <g opacity={win(f, r1, pick2 + 30)}><text x={1200} y={400} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={30} fill={C.muted}>validation error of each try</text></g>
    <g opacity={p(f, at('fwd2', 0.4), at('fwd2', 0.5))}><Tag x={1200} y={950} text="backward search: start with all, remove" bg="#fff" s={32} /></g>
    <g opacity={p(f, at('fwd2', 0.7), at('fwd2', 0.8))}><Tag x={360} y={950} text="greedy: best subset not guaranteed" bg={HL} s={30} /></g>
  </g>;
};

// ------------------------------------------------ scene 4: PCA
// points with exactly diagonal covariance a² = 0.92, b² = 0.08 (times 4) along PHI, offset by MU
const PHI = (32 * Math.PI) / 180, MU: [number, number] = [1.3, 1.0];
const N = 40;
const raw = Array.from({ length: N }, (_, i) => [gauss(i + 500), gauss(i + 900)]);
const norm = (v: number[]) => { const m = v.reduce((s, x) => s + x, 0) / v.length; const c = v.map(x => x - m); const sd = Math.sqrt(c.reduce((s, x) => s + x * x, 0) / v.length); return c.map(x => x / sd); };
const g1 = norm(raw.map(r => r[0]));
const g2b = raw.map(r => r[1]);
const k12 = g1.reduce((s, x, i) => s + x * g2b[i], 0) / g1.reduce((s, x) => s + x * x, 0);
const g2 = norm(g2b.map((x, i) => x - k12 * g1[i]));
const SA = Math.sqrt(0.92 * 4), SB = Math.sqrt(0.08 * 4);
const CLOUD = g1.map((u, i) => { const x = SA * u, y = SB * g2[i]; return [x * Math.cos(PHI) - y * Math.sin(PHI), x * Math.sin(PHI) + y * Math.cos(PHI)]; });
const varAt = (th: number) => CLOUD.reduce((s, [x, y]) => s + (x * Math.cos(th) + y * Math.sin(th)) ** 2, 0) / N;
const Pca: React.FC<{ f: number }> = ({ f }) => {
  const a = B('pca').start, c1 = B('pca1').start, c2 = B('pca2').start, c3 = B('pca3').start, c4 = B('pca4').start;
  const A = ax(420, 210, 840, 780, [-4.2, 4.2], [-3.9, 3.9]);
  const cen = p(f, at('pca1', 0.45), at('pca1', 0.8));
  const sweep = p(f, at('pca2', 0.05), at('pca2', 0.95)), settle = p(f, at('pca3', 0.05), at('pca3', 0.5));
  const th = lerp(lerp(PHI + 1.4, PHI - 0.9, sweep), PHI, settle);
  const lineO = p(f, c2, c2 + 10);
  const u = [Math.cos(th), Math.sin(th)];
  const v = varAt(th), vmax = 0.92 * 4;
  const pc2 = p(f, c4, c4 + 20);
  const L = 4.6;
  return <g>
    <Head f={f} a={a} b={c3}>PCA: principal component analysis</Head>
    <Head f={f} a={c3}>PC1 = the direction of largest variance</Head>
    <Axes f={f} a={a + 4} A={A} xl="height" yl="weight" origin={[0, 0]} />
    {/* mean marker */}
    <g opacity={win(f, at('pca1', 0.1), c2)}>
      <circle cx={A.X(MU[0] * (1 - cen))} cy={A.Y(MU[1] * (1 - cen))} r={16} fill="none" stroke={C.red} strokeWidth={5} />
      <text x={A.X(MU[0] * (1 - cen)) + 26} y={A.Y(MU[1] * (1 - cen)) - 20} fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.red}>mean</text>
    </g>
    {/* direction line and projections */}
    <g opacity={lineO}>
      <line x1={A.X(-L * u[0])} y1={A.Y(-L * u[1])} x2={A.X(L * u[0])} y2={A.Y(L * u[1])} stroke={C.blue} strokeWidth={6} />
      {CLOUD.map(([x, y], i) => { const d = x * u[0] + y * u[1]; return <line key={i} x1={A.X(x)} y1={A.Y(y)} x2={A.X(d * u[0])} y2={A.Y(d * u[1])} stroke={C.blue} strokeWidth={2} opacity={0.35} />; })}
      {CLOUD.map(([x, y], i) => { const d = x * u[0] + y * u[1]; return <circle key={i} cx={A.X(d * u[0])} cy={A.Y(d * u[1])} r={7} fill={C.blue} />; })}
      <text x={A.X(L * u[0]) + 14} y={A.Y(L * u[1]) - 10} fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.blue} opacity={settle}>PC1</text>
    </g>
    <g opacity={pc2}>
      <line x1={A.X(2.2 * Math.sin(PHI))} y1={A.Y(-2.2 * Math.cos(PHI))} x2={A.X(-2.2 * Math.sin(PHI))} y2={A.Y(2.2 * Math.cos(PHI))} stroke={C.teal} strokeWidth={6} strokeDasharray="16 10" />
      <text x={A.X(-2.2 * Math.sin(PHI)) - 40} y={A.Y(2.2 * Math.cos(PHI)) - 14} fontFamily={MONO} fontWeight={800} fontSize={34} fill={C.teal}>PC2</text>
      <rect x={A.X(0)} y={A.Y(0)} width={22} height={22} fill="none" stroke={C.ink} strokeWidth={3} transform={`rotate(${-PHI * 180 / Math.PI - 90} ${A.X(0)} ${A.Y(0)})`} />
    </g>
    {CLOUD.map(([x, y], i) => <circle key={i} cx={A.X(x + MU[0] * (1 - cen))} cy={A.Y(y + MU[1] * (1 - cen))} r={11 * pop(f, a + 8 + i, 10)} fill={C.amber} stroke="#fbf9f4" strokeWidth={2} />)}
    {/* variance meter */}
    <g opacity={lineO} transform="translate(1400,330)">
      <text x={0} y={0} fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.ink}>spread along the line</text>
      <rect x={0} y={30} width={400} height={50} rx={10} fill="#ece4d3" />
      <rect x={0} y={30} width={400 * v / vmax} height={50} rx={10} fill={C.blue} />
      <text x={0} y={130} fontFamily={MONO} fontWeight={800} fontSize={30} fill={C.muted}>{`Var(z) = ${(v / 4).toFixed(2)} of total`}</text>
    </g>
    <g opacity={p(f, at('pca2', 0.1), at('pca2', 0.2)) * (1 - p(f, c3, c3 + 10))}><Tag x={1600} y={560} text="z = wᵀx for each point" bg="#fff" s={30} mono /></g>
    <g opacity={p(f, at('pca4', 0.45), at('pca4', 0.55))}>
      <Tag x={1600} y={600} text="PC1 keeps 92%" bg={C.blue} fg="#fff" s={34} />
      <Tag x={1600} y={690} text="PC2 keeps 8%" bg={C.teal} fg="#fff" s={34} />
    </g>
    <g opacity={p(f, at('pca4', 0.1), at('pca4', 0.2))}><Tag x={1600} y={500} text="PC2 ⟂ PC1" bg={HL} s={34} /></g>
  </g>;
};

// ------------------------------------------------ scene 5: iris and the label trap
const TWO = Array.from({ length: 30 }, (_, i) => ({ x: gauss(i + 1200) * 1.9, y: (i % 2 ? 0.75 : -0.75) + gauss(i + 1300) * 0.22, k: i % 2 }));
const Trap: React.FC<{ f: number }> = ({ f }) => {
  const ir = B('iris').start, tr = B('trap').start, ld = B('lda').start;
  const A = ax(300, 330, 900, 560, [-4.5, 4.5], [-2.2, 2.2]);
  const pr = p(f, at('trap', 0.4), at('trap', 0.65)), pl = p(f, at('lda', 0.3), at('lda', 0.6));
  const out = p(f, tr - 6, tr + 10);
  return <g>
    <Head f={f} a={ir} b={tr}>the iris data, down to 2 components</Head>
    <Head f={f} a={tr}>trap: PCA never looks at the labels</Head>
    <g opacity={1 - out}>
      <rect x={460} y={420} width={1000} height={110} rx={16} fill="#ece4d3" />
      <rect x={460} y={420} width={1000 * 0.9777 * p(f, ir + 10, ir + 50)} height={110} rx={16} fill={C.blue} />
      <text x={960} y={495} textAnchor="middle" fontFamily={MONO} fontWeight={800} fontSize={52} fill="#fff" opacity={p(f, ir + 40, ir + 50)}>97.77% of the variance</text>
      <g opacity={p(f, at('iris', 0.6), at('iris', 0.7))}><Tag x={960} y={640} text="n_components = 2: every example kept" bg={HL} s={32} mono /></g>
    </g>
    <g opacity={out}>
      <Axes f={f} a={tr + 4} A={A} origin={[0, 0]} />
      {TWO.map((d, i) => {
        const x = pl > 0 ? lerp(d.x, 0, pl) : d.x, y = pl > 0 ? lerp(0, d.y, pl) : lerp(d.y, 0, pr);
        return <circle key={i} cx={A.X(x)} cy={A.Y(y)} r={13} fill={d.k ? C.blue : C.amber} stroke="#fbf9f4" strokeWidth={2} opacity={pop(f, tr + 6 + i, 10)} />;
      })}
      <g opacity={pr * (1 - pl)}>
        <line x1={A.X(-4.4)} y1={A.Y(0)} x2={A.X(4.4)} y2={A.Y(0)} stroke={C.blue} strokeWidth={4} opacity={0.4} />
        <Tag x={1520} y={560} text="PC1: most spread" bg={C.blue} fg="#fff" s={30} />
        <Tag x={1520} y={650} text="classes mixed" bg={C.red} fg="#fff" s={30} />
      </g>
      <g opacity={pl}>
        <Tag x={1520} y={560} text="LDA: uses the labels" bg={C.teal} fg="#fff" s={30} />
        <Tag x={1520} y={650} text="classes separated" bg={C.green} fg="#fff" s={30} />
      </g>
    </g>
  </g>;
};

const Ex: React.FC<{ f: number }> = ({ f }) => <Exam f={f} at={at} ids={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']} rows={[
  ['selection', 'keeps original features'],
  ['extraction', 'builds new ones (z₁ = 0.6h + 0.8w)'],
  ['search', 'forward adds, backward removes'],
  ['PCA', 'direction of largest variance'],
  ['labels', 'PCA ignores them; LDA uses them'],
]} />;

export const MlFeatures: React.FC = () =>
  <MlEpisode t={timeline} ch="Week 3" title="Fewer features, same students" scenes={[
    [Student, 0], [SelExt, B('sel').start], [Search, B('fwd').start], [Pca, B('pca').start], [Trap, B('iris').start], [Ex, B('ex0').start],
  ]}>
    <Sfx at={at('sel', 0.45)} name="whoosh" volume={0.18} />
    <Sfx at={at('ext', 0.35)} name="whoosh" volume={0.2} />
    <Sfx at={at('fwd', 0.75)} name="pop" volume={0.22} />
    <Sfx at={at('fwd2', 0.25)} name="pop" volume={0.22} />
    <Sfx at={at('pca3', 0.5)} name="ping" volume={0.2} />
    <Sfx at={at('lda', 0.3)} name="whoosh" volume={0.2} />
  </MlEpisode>;
