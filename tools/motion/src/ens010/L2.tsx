/* ENS010 Lecture 2 · Introduction to nano. Narration: src/scripts/ens010-L2.json */
import React from 'react';
import {random} from 'remotion';
import {Arrow, Atom, C, Card, mix, pop, prog, Rise, Stage, StageHeading, sup, T, Tag, useScene} from '../lib';

/* ---------- 1. convergent science: nano, bio, info, cogno ---------- */
const Converge: React.FC = () => {
  const {f, at} = useScene();
  const join = prog(f, at(3), 40);
  const areas: [string, string, string][] = [['nano', 'atoms', C.orange], ['bio', 'genes, cells', C.green], ['info', 'bits', C.blue], ['cogno', 'neurons', C.purple]];
  const corner = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  const icon = (i: number) => [
    <g key={0}>{[[-20, -10], [20, -10], [0, 22]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={18} fill={C.orange} stroke={C.ink} strokeOpacity={0.3} />)}</g>,
    <g key={1}>{Array.from({length: 7}, (_, k) => { const y = -45 + k * 15; const w = Math.sin(k * 0.9 + f / 10) * 26; return <g key={k}><line x1={-w} x2={w} y1={y} y2={y} stroke={C.green} strokeWidth={4} /><circle cx={-w} cy={y} r={5} fill={C.green} /><circle cx={w} cy={y} r={5} fill={C.green} /></g>; })}</g>,
    <g key={2}><T y={-8} size={30} weight={700} color={C.blue} font='"Cascadia Mono", Consolas, monospace'>0101</T><T y={28} size={30} weight={700} color={C.blue} font='"Cascadia Mono", Consolas, monospace'>1100</T></g>,
    <g key={3} stroke={C.purple} strokeWidth={5} fill="none" strokeLinecap="round"><circle r={20} fill={C.purple} /><path d="M -18 -10 L -55 -40 M 18 -10 L 55 -45 M 0 20 L -10 60 M 15 15 L 50 40 M -55 -40 L -70 -30 M 55 -45 L 70 -60" /></g>,
  ][i];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Why learn nano?" />
      <Rise start={at(1, 0.1)} x={960} y={240} size={34} color={C.mute} weight={500} out={at(3)}>convergent science and technology</Rise>
      {areas.map(([n, sub, col], i) => {
        const s = pop(f, at(2, i * 0.22));
        const x = 960 + corner[i][0] * mix(420, 150, join), y = mix(590, 500, join) + corner[i][1] * mix(200, 110, join);
        return (
          <g key={n} transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s)}>
            <circle r={170} fill={col} opacity={mix(0.12, 0.2, join)} stroke={col} strokeWidth={5} />
            <g transform={`translate(0 ${-40}) scale(${1 - join * 0.4})`}>{icon(i)}</g>
            <T y={70} size={44} weight={750} color={col}>{n}</T>
            <T y={110} size={28} weight={550} color={C.mute} o={1 - join}>{sub}</T>
          </g>
        );
      })}
      <g transform={`translate(960 870) scale(${pop(f, at(3, 0.3))})`} opacity={Math.min(1, pop(f, at(3, 0.3)))}>
        <rect x={-330} y={-50} width={660} height={100} rx={50} fill={C.ink} />
        <T y={14} size={36} color="#fff" weight={700}>enhancing human performance</T>
      </g>
      <Tag start={at(3, 0.65)} x={960} y={985} color={C.red} filled text="e.g. nanomedicine combines several" />
    </Stage>
  );
};

/* ---------- 2. nano is a prefix ---------- */
const Prefix: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(4) + 16, 20);
  const ladder: [string, string][] = [['kilo', '10^3'], ['—', '1'], ['milli', '10^-3'], ['micro', '10^-6'], ['nano', '10^-9']];
  const hi = prog(f, at(0, 0.5), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text={'"Nano" is a prefix'} out={at(4)} />
      <g opacity={1 - p2}>
        {ladder.map(([n, e], i) => {
          const isNano = i === 4;
          return (
            <g key={n} opacity={prog(f, at(0, 0.15 + i * 0.08), 12)} transform={`translate(420 ${300 + i * 120})`}>
              <rect x={-200} y={-45} width={400} height={90} rx={20} fill={isNano ? C.orange : C.card} opacity={isNano ? 0.25 + hi * 0.75 : 1} stroke={isNano ? C.orange : C.line} strokeWidth={4} />
              <T x={-160} y={14} size={40} weight={700} anchor="start" color={isNano && hi > 0.5 ? '#fff' : C.ink}>{n}</T>
              <T x={160} y={14} size={40} weight={700} anchor="end" color={isNano && hi > 0.5 ? '#fff' : C.blue}>{sup(e)}</T>
            </g>
          );
        })}
        <Tag start={at(0, 0.2)} x={1260} y={300} color={C.mute} text="not a material" />
        <g opacity={prog(f, at(1), 16)}>
          <T x={1260} y={470} size={110} weight={800} color={C.orange}>{sup('10^-9')}</T>
          <T x={1260} y={540} size={40} weight={650}>one billionth</T>
        </g>
        {/* nanos = dwarf */}
        <g opacity={prog(f, at(2), 16) * (1 - prog(f, at(3), 14))} transform="translate(1260 760)">
          <T y={-70} size={40} weight={700} font='"Iowan Old Style", Georgia, serif'>νᾶνος · nanos = dwarf</T>
          <g transform="translate(-60 120)"><circle cy={-120} r={30} fill={C.sand} /><rect x={-30} y={-90} width={60} height={110} rx={20} fill={C.sand} /></g>
          <g transform={`translate(60 120) scale(${mix(1, 0.45, prog(f, at(2, 0.4), 20))})`} style={{transformOrigin: '0 0'}}><circle cy={-120} r={30} fill={C.orange} /><rect x={-30} y={-90} width={60} height={110} rx={20} fill={C.orange} /></g>
        </g>
        {['nanometer', 'nanosecond', 'nanogram'].map((t, i) => <Tag key={t} start={at(3, 0.15 + i * 0.2)} x={1260} y={680 + i * 90} color={C.blue} text={t} />)}
      </g>
      {/* conversions */}
      <g opacity={p2}>
        <T x={960} y={210} size={44} weight={700}>the conversions</T>
        {[['1 nm', '10^-9 m', '10^-3 µm', '10 Å', 4, 380], ['100 nm', '10^-7 m', '0.1 µm', '1000 Å', 5, 700]].map(([a, b, c, d, line, y]) => (
          <g key={a as string}>
            {[a, b, c, d].map((t, i) => (
              <g key={i}>
                <Card start={at(line as number, 0.1 + i * 0.17) + (line === 4 ? 16 : 0)} x={330 + i * 420} y={y as number} w={320} h={140} stroke={i ? C.blue : C.orange} sw={5}>
                  <T y={18} size={52} weight={750} color={i ? C.blue : C.orange}>{sup(t as string)}</T>
                </Card>
                {i > 0 && <g opacity={prog(f, at(line as number, 0.1 + i * 0.17), 10)}><T x={120 + i * 420} y={(y as number) + 18} size={56} weight={700} color={C.mute}>=</T></g>}
              </g>
            ))}
          </g>
        ))}
        <Tag start={at(5, 0.7)} x={960} y={900} color={C.red} filled text="the slide's exercise" />
      </g>
    </Stage>
  );
};

/* ---------- 3. how small: Earth → football → fullerene ---------- */
const Scale: React.FC = () => {
  const {f, at} = useScene();
  const s1 = prog(f, at(0, 0.45), 30), s2 = prog(f, at(1, 0.3), 30);
  const p3 = prog(f, at(2), 20);
  const earth = (
    <g>
      <circle r={200} fill="#4f7fc6" stroke={C.ink} strokeOpacity={0.3} strokeWidth={4} />
      <path d="M -120 -80 Q -60 -150 20 -110 Q 60 -60 0 -20 Q -60 10 -110 -20 Z M 40 30 Q 120 0 150 60 Q 120 140 60 130 Q 20 90 40 30 Z" fill={C.green} opacity={0.85} />
    </g>
  );
  const ball = (
    <g>
      <circle r={200} fill="#fff" stroke={C.ink} strokeWidth={6} />
      {[[0, 0], [0, -130], [124, -40], [76, 105], [-76, 105], [-124, -40]].map(([x, y], i) => <polygon key={i} points={Array.from({length: 5}, (_, k) => { const a = (k / 5) * Math.PI * 2 - Math.PI / 2; return `${x + Math.cos(a) * 42},${y + Math.sin(a) * 42}`; }).join(' ')} fill={C.ink} />)}
    </g>
  );
  const c60 = (
    <g>
      <circle r={200} fill={C.card} stroke={C.ink} strokeWidth={4} />
      {Array.from({length: 30}, (_, i) => { const a = random(`ca${i}`) * Math.PI * 2, r = Math.sqrt(random(`cr${i}`)) * 170; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={14} fill={C.ink} opacity={0.75} />; })}
    </g>
  );
  const sc = (t: number) => mix(1, 0.06, t);
  return (
    <Stage>
      <StageHeading start={at(0)} text="How small is that?" />
      <g opacity={1 - p3}>
        <g transform={`translate(${mix(960, 360, s1)} 580) scale(${mix(1, 0.6, s1)})`} opacity={prog(f, at(0, 0.1), 14)}>{earth}</g>
        <T x={360} y={830} size={34} weight={700} o={s1}>Earth</T>
        <g opacity={s1}>
          <Arrow start={at(0, 0.55)} x1={520} y1={580} x2={780} y2={580} color={C.blue} w={6} />
          <T x={650} y={540} size={34} weight={750} color={C.blue}>÷ 10 million</T>
          <g transform={`translate(960 580) scale(${mix(0.2, 0.6, s1)})`}>{ball}</g>
          <T x={960} y={830} size={34} weight={700}>football</T>
        </g>
        <g opacity={s2}>
          <Arrow start={at(1, 0.35)} x1={1140} y1={580} x2={1400} y2={580} color={C.orange} w={6} />
          <T x={1270} y={540} size={34} weight={750} color={C.orange}>÷ 1 billion</T>
          <g transform={`translate(1560 580) scale(${mix(0.1, 0.6, s2)})`}>{c60}</g>
          <T x={1560} y={830} size={34} weight={700}>fullerene</T>
          <Tag start={at(1, 0.65)} x={1560} y={900} color={C.orange} filled text="0.7 nm" />
        </g>
      </g>
      <g opacity={p3}>
        {[['protein', C.teal], ['DNA', C.blue], ['virus', C.red]].map(([t, col], i) => (
          <Card key={t} start={at(2, 0.1 + i * 0.15)} x={480 + i * 480} y={500} w={380} h={340} stroke={col}>
            {i === 0 && <path d="M -90 -60 Q -40 -110 0 -60 Q 40 -10 90 -60 Q 110 0 60 20 Q 0 40 -40 10 Q -100 0 -90 -60 Z" fill={col} opacity={0.6} />}
            {i === 1 && Array.from({length: 9}, (_, k) => { const y = -110 + k * 22; const w = Math.sin(k * 0.8 + f / 10) * 50; return <g key={k}><line x1={-w} x2={w} y1={y} y2={y} stroke={col} strokeWidth={4} /><circle cx={-w} cy={y} r={7} fill={col} /><circle cx={w} cy={y} r={7} fill={col} /></g>; })}
            {i === 2 && <g transform="translate(0 -30)"><polygon points="0,-80 70,-40 70,40 0,80 -70,40 -70,-40" fill={col} opacity={0.6} />{Array.from({length: 6}, (_, k) => { const a = (k / 6) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 80} y1={Math.sin(a) * 80} x2={Math.cos(a) * 110} y2={Math.sin(a) * 110} stroke={col} strokeWidth={6} />; })}</g>}
            <T y={130} size={38} weight={700}>{t}</T>
          </Card>
        ))}
        <Rise start={at(2, 0.6)} x={960} y={250} size={34} color={C.mute} weight={500}>nanomaterials are this size</Rise>
        <g opacity={prog(f, at(3), 16)}>
          <T x={960} y={780} size={36} weight={650}>we cannot see or feel them</T>
          <Tag start={at(3, 0.35)} x={700} y={880} color={C.blue} text="electron microscope" />
          <Tag start={at(3, 0.55)} x={1260} y={880} color={C.blue} text="atomic force microscope" />
        </g>
      </g>
    </Stage>
  );
};

/* ---------- 4. nanoscience vs nanotechnology ---------- */
const SciTech: React.FC = () => {
  const {f, at} = useScene();
  const words: [string, number][] = [['study', 0], ['create', 1], ['control', 1], ['lab', 1]];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Nanoscience vs nanotechnology" />
      <Tag start={at(0, 0.5)} x={960} y={220} color={C.red} filled text="he may ask this" />
      <Card start={at(1)} x={520} y={560} w={720} h={520} stroke={C.blue} sw={5}>
        <T y={-200} size={46} weight={750} color={C.blue}>nanoscience</T>
        <T y={-150} size={30} weight={550} color={C.mute}>study at the nano-size level</T>
        <g transform="translate(-130 -10)"><rect x={-80} y={-70} width={160} height={200} rx={10} fill="#fff" stroke={C.ink} strokeWidth={4} />{[0, 1, 2, 3, 4].map((k) => <line key={k} x1={-55} x2={mix(55, 10, k % 2)} y1={-40 + k * 30} y2={-40 + k * 30} stroke={C.mute} strokeWidth={4} />)}</g>
        <g transform="translate(130 0)"><rect x={-110} y={-70} width={220} height={150} rx={12} fill={C.ink} /><rect x={-95} y={-55} width={190} height={120} fill="#5b7bd6" opacity={0.6} /><rect x={-30} y={80} width={60} height={30} fill={C.ink} /></g>
        <T y={200} size={38} weight={700}>theory: paper, computer</T>
      </Card>
      <Card start={at(2)} x={1400} y={560} w={720} h={520} stroke={C.orange} sw={5}>
        <T y={-200} size={46} weight={750} color={C.orange}>nanotechnology</T>
        <T y={-150} size={30} weight={550} color={C.mute}>working atom by atom, 1–100 nm</T>
        <g transform="translate(-150 0)"><path d="M -30 -90 L -30 -20 L -90 90 L 90 90 L 30 -20 L 30 -90 Z" fill={C.card} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" /><path d="M -60 35 L 60 35 L 90 90 L -90 90 Z" fill={C.teal} opacity={0.6} /></g>
        <g transform="translate(130 0)">
          {[[-60, 30], [-20, 30], [20, 30], [60, 30], [-40, -5], [0, -5], [40, -5]].map(([x, y], i) => <Atom key={i} x={x} y={y} r={18} fill={C.orange} s={i === 6 ? 1 : 1} />)}
          <Atom x={mix(80, 40, prog(f, at(2, 0.3), 20))} y={mix(-100, -40, prog(f, at(2, 0.3), 20))} r={18} fill={C.red} />
        </g>
        <T y={140} size={28} weight={600} color={C.mute}>create · control · exploit new properties</T>
        <T y={200} size={38} weight={700}>practice: the lab</T>
      </Card>
      {words.map(([w, side], i) => {
        const go = prog(f, at(3, 0.2 + i * 0.15), 24);
        const tx = side ? 1400 : 520, ty = 880;
        const x = mix(960, tx + (side ? (i - 2) * 200 : 0), go), y = mix(1000, ty, go);
        return (
          <g key={w} transform={`translate(${x} ${y})`} opacity={prog(f, at(3, 0.15 + i * 0.15), 10)}>
            <rect x={-90} y={-32} width={180} height={64} rx={32} fill={side ? C.orange : C.blue} />
            <T y={11} size={32} color="#fff" weight={700}>{w}</T>
          </g>
        );
      })}
    </Stage>
  );
};

/* ---------- 5. gold: size changes colour ---------- */
const Gold: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(3), 22);
  const vials: [string, number][] = [[C.red, 0.4], ['#d07a2a', 0.65], [C.green, 1]];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Size and shape change properties" />
      <g opacity={1 - p2}>
        {/* cup and stained glass */}
        <g opacity={prog(f, at(0, 0.3), 16)} transform="translate(380 560)">
          <path d="M -110 -150 L 110 -150 Q 100 40 20 80 L 20 140 L 80 170 L -80 170 L -20 140 L -20 80 Q -100 40 -110 -150 Z" fill={C.green} opacity={0.75} stroke={C.ink} strokeOpacity={0.4} strokeWidth={4} />
          <path d="M -60 -150 Q -40 -40 0 0 Q 40 -40 60 -150" fill={C.red} opacity={0.5} />
          <T y={240} size={30} weight={650}>Lycurgus cup</T>
        </g>
        <g opacity={prog(f, at(0, 0.6), 16)} transform="translate(800 560)">
          <path d="M -110 170 L -110 -60 Q 0 -200 110 -60 L 110 170 Z" fill={C.card} stroke={C.ink} strokeWidth={5} />
          {Array.from({length: 12}, (_, i) => <rect key={i} x={-100 + (i % 3) * 68} y={-60 + Math.floor(i / 3) * 56} width={62} height={50} fill={[C.red, C.blue, '#e4b54a', C.green][(i + Math.floor(i / 3)) % 4]} opacity={0.65} />)}
          <T y={240} size={30} weight={650}>stained glass</T>
        </g>
        {/* vials by size */}
        <g opacity={prog(f, at(1), 16)}>
          {vials.map(([c, s], i) => (
            <g key={i} transform={`translate(${1180 + i * 170} 560)`}>
              <rect x={-55} y={-150} width={110} height={300} rx={30} fill={C.card} stroke={C.ink} strokeWidth={4} />
              <rect x={-51} y={-60} width={102} height={206} rx={26} fill={c} opacity={0.75} />
              <Atom x={0} y={-110} r={10 + s * 20} fill="#e4b54a" />
            </g>
          ))}
          <T x={1350} y={790} size={30} weight={650}>gold nanoparticles</T>
          <T x={1350} y={835} size={26} weight={550} color={C.mute}>colour depends on size</T>
        </g>
        <g opacity={prog(f, at(2), 16)} transform="translate(1720 560)">
          <circle r={70} fill="none" stroke="#e4b54a" strokeWidth={26} />
          <circle r={70} fill="none" stroke={C.ink} strokeOpacity={0.3} strokeWidth={2} />
          <T y={140} size={30} weight={650}>gold ring</T>
          <T y={180} size={26} weight={550} color="#b8901d">always yellow</T>
        </g>
      </g>
      <g opacity={p2}>
        <rect x={260} y={440} width={1400} height={200} rx={30} fill={C.card} stroke={C.orange} strokeWidth={6} />
        <T x={960} y={520} size={36} weight={550} color={C.mute}>at the nano scale</T>
        <T x={960} y={590} size={56} weight={750}><tspan fill={C.orange}>size and shape</tspan> change the properties</T>
        <Tag start={at(3, 0.5)} x={960} y={760} color={C.red} filled text="the idea is asked, not the numbers" />
      </g>
    </Stage>
  );
};

/* ---------- 6. the S-curve ---------- */
const SCurve: React.FC = () => {
  const {f, at} = useScene();
  const ax = 360, ay = 880, w = 1200, h = 520;
  const S = (t: number) => ay - h / (1 + Math.exp(-(t - 0.5) * 11));
  const pathTo = (t1: number) => { let d = ''; for (let t = 0; t <= t1 + 1e-6; t += 0.01) d += `${d ? ' L' : 'M'} ${ax + t * w} ${S(t)}`; return d; };
  const draw = prog(f, at(1, 0.1), 30) * 0.32 + prog(f, at(2, 0.05), 40) * 0.68;
  const fields = ['medicine', 'energy', 'electronics', 'sensors', 'coatings', 'food'];
  const fieldsOut = prog(f, at(1), 16);
  const nano = 0.38;
  return (
    <Stage>
      <StageHeading start={at(0)} text="Where is nanotechnology now?" />
      <g opacity={1 - fieldsOut}>
        {fields.map((t, i) => <Tag key={t} start={at(0, 0.1 + i * 0.12)} x={480 + (i % 3) * 480} y={480 + Math.floor(i / 3) * 140} color={[C.red, C.orange, C.blue, C.teal, C.mute, C.green][i]} text={t} />)}
      </g>
      <g opacity={fieldsOut}>
        <line x1={ax} x2={ax} y1={ay} y2={ay - h - 60} stroke={C.ink} strokeWidth={4} />
        <line x1={ax} x2={ax + w + 40} y1={ay} y2={ay} stroke={C.ink} strokeWidth={4} />
        <T x={ax + w} y={ay + 50} size={28} weight={550} color={C.mute}>time</T>
        <path d={pathTo(Math.max(0.001, draw))} stroke={C.blue} strokeWidth={8} fill="none" strokeLinecap="round" />
        <Rise start={at(1, 0.4)} x={ax + 0.12 * w} y={S(0.12) - 50} size={28} color={C.mute} weight={550}>slow start, no funding</Rise>
        <Rise start={at(2, 0.05)} x={ax + 0.5 * w + 30} y={S(0.5)} size={28} color={C.blue} weight={650} anchor="start">rapid growth: investors</Rise>
        <Rise start={at(2, 0.55)} x={ax + 0.85 * w} y={S(0.85) - 40} size={28} color={C.mute} weight={550}>saturation</Rise>
      </g>
      {['textiles', 'railroads', 'cars', 'computers'].map((t, i) => <Tag key={t} start={at(3, 0.1 + i * 0.18)} x={1700} y={330 + i * 80} color={C.mute} text={t} />)}
      <g opacity={prog(f, at(4), 16)}>
        <circle cx={ax + nano * w} cy={S(nano)} r={22 + 4 * Math.sin(f / 4)} fill={C.orange} stroke={C.ink} strokeOpacity={0.4} strokeWidth={3} />
        <Arrow start={at(4, 0.1)} x1={ax + nano * w - 200} y1={S(nano) - 160} x2={ax + nano * w - 30} y2={S(nano) - 20} color={C.orange} w={5} />
        <T x={ax + nano * w - 210} y={S(nano) - 180} size={34} weight={750} color={C.orange}>nanotechnology</T>
      </g>
      <Tag start={at(4, 0.55)} x={960} y={1000} color={C.green} filled text="not late: right on time" />
    </Stage>
  );
};

export const L2Scenes: Record<string, React.FC> = {converge: Converge, prefix: Prefix, scale: Scale, scitech: SciTech, gold: Gold, scurve: SCurve};
