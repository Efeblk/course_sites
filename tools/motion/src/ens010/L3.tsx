/* ENS010 Lecture 3 · Why size matters. Narration: src/scripts/ens010-L3.json (one cue per line). */
import React from 'react';
import {random} from 'remotion';
import {Atom, C, FONT, Heading, hexAtoms, hexXY, mix, mixColor, pop, prog, Rise, Stage, Tag, Thermometer, useScene} from '../lib';

/* ---------- 1. bulk → micro → nano, as a chain of magnifying lenses ---------- */
const Scale: React.FC = () => {
  const {f, at} = useScene();
  const blobs = Array.from({length: 70}, (_, i) => {
    const x = (random(`px${i}`) * 2 - 1) * 190;
    const top = 150 * (1 - (x / 200) ** 2);
    return {x: 360 + x, y: 780 - random(`py${i}`) * top, r: 12 + random(`pr${i}`) * 14, c: [C.brown, C.sand, '#b89870'][i % 3]};
  });
  const lens = (cx: number, cy: number, start: number, src: [number, number, number], id: string, inner: React.ReactNode) => {
    const s = pop(f, start);
    const cone = prog(f, start, 18);
    return (
      <g>
        <polygon points={`${src[0]},${src[1] - src[2]} ${mix(src[0], cx, cone)},${mix(src[1] - src[2], cy - 210, cone)} ${mix(src[0], cx, cone)},${mix(src[1] + src[2], cy + 210, cone)} ${src[0]},${src[1] + src[2]}`}
          fill={C.blue} opacity={0.07 * cone} />
        <circle cx={src[0]} cy={src[1]} r={src[2]} fill="none" stroke={C.blue} strokeWidth={4} opacity={cone} />
        <defs><clipPath id={id}><circle cx={cx} cy={cy} r={210 * s} /></clipPath></defs>
        <circle cx={cx} cy={cy} r={210 * s} fill={C.card} />
        <g clipPath={`url(#${id})`}>{inner}</g>
        <circle cx={cx} cy={cy} r={210 * s} fill="none" stroke={C.blue} strokeWidth={7} />
      </g>
    );
  };
  const micro = Array.from({length: 46}, (_, i) => ({x: 760 + random(`mx${i}`) * 400, y: 270 + random(`my${i}`) * 400, r: 15 + random(`mr${i}`) * 9, c: [C.brown, C.sand, '#b89870'][i % 3]}));
  const nanoAt = [[-110, -80], [40, -120], [130, 10], [-40, 40], [-140, 100], [70, 130]];
  const glow = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <Stage>
      <line x1={120} x2={620} y1={782} y2={782} stroke={C.line} strokeWidth={4} />
      {blobs.map((b, i) => { const s = pop(f, at(0) + 8 + i * 0.5); return <ellipse key={i} cx={b.x} cy={b.y} rx={b.r * s} ry={b.r * 0.8 * s} fill={b.c} stroke={C.ink} strokeOpacity={0.15} />; })}
      <Rise start={at(1)} x={360} y={860} size={40}>bulk</Rise>
      <Rise start={at(1, 0.15)} x={360} y={905} size={26} color={C.mute} weight={500}>powdery · granular · lumpy</Rise>
      <Tag start={at(1, 0.35)} x={360} y={560} color={C.teal} text="you can see and feel it" />
      <Rise start={at(1, 0.65)} x={360} y={980} size={26} color={C.mute} weight={500}>even a 1 mm powder is bulk</Rise>

      {lens(960, 470, at(2), [420, 690, 26], 'l1', micro.map((m, i) => <Atom key={i} x={m.x} y={m.y} r={m.r} fill={m.c} s={pop(f, at(2) + 10 + i * 0.4)} />))}
      <Rise start={at(2, 0.1)} x={960} y={225} size={36}>microparticles</Rise>
      <Tag start={at(2, 0.35)} x={960} y={745} color={C.mute} text="too small to see one by one" />
      <Tag start={at(2, 0.65)} x={960} y={815} color={C.mute} text="properties: the same as bulk" />

      {lens(1560, 470, at(3), [1060, 420, 30], 'l2', nanoAt.map(([dx, dy], j) => (
        <g key={j} transform={`translate(${1560 + dx} ${470 + dy}) scale(${pop(f, at(3) + 10 + j * 3)})`}>
          {hexAtoms(2).map((a, i) => { const [x, y] = hexXY(a.q, a.r, 15); return <circle key={i} cx={x} cy={y} r={7} fill={a.ring === 2 ? C.orange : C.sand} />; })}
        </g>
      )))}
      <Rise start={at(3, 0.08)} x={1560} y={225} size={36}>nanoparticles · ~100 nm</Rise>
      <circle cx={1560} cy={470} r={225} fill="none" stroke={C.orange} strokeWidth={10} opacity={prog(f, at(3, 0.5), 15) * glow * 0.6} />
      <Tag start={at(3, 0.5)} x={1560} y={760} color={C.orange} filled text="properties change" />
    </Stage>
  );
};

/* ---------- 2. surface area: cube splitting, atom clusters, the balance ---------- */
const isoCubes = (n: number, explode: number, size: number, ox: number, oy: number, o: number) => {
  const c = Math.cos(Math.PI / 6), sn = 0.5, u = size / n, g = explode * u * 0.45;
  const P = (X: number, Y: number, Z: number) => `${ox + (X - Y) * c},${oy + (X + Y) * sn - Z}`;
  const cubes = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) cubes.push([i, j, k]);
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  const mid = ((n - 1) / 2) * (u + g);
  return cubes.map(([i, j, k], idx) => {
    const X = i * (u + g) - mid - u / 2, Y = j * (u + g) - mid - u / 2, Z = k * (u + g) - mid;
    return (
      <g key={`${n}-${idx}`} opacity={o} stroke={C.ink} strokeOpacity={0.35} strokeWidth={2} strokeLinejoin="round">
        <polygon points={[P(X, Y, Z + u), P(X + u, Y, Z + u), P(X + u, Y + u, Z + u), P(X, Y + u, Z + u)].join(' ')} fill="#f0c56d" />
        <polygon points={[P(X + u, Y, Z), P(X + u, Y + u, Z), P(X + u, Y + u, Z + u), P(X + u, Y, Z + u)].join(' ')} fill={C.orange} />
        <polygon points={[P(X, Y + u, Z), P(X + u, Y + u, Z), P(X + u, Y + u, Z + u), P(X, Y + u, Z + u)].join(' ')} fill="#c47f1e" />
      </g>
    );
  });
};

const Surface: React.FC = () => {
  const {f, at} = useScene();
  const cubeO = prog(f, at(1), 18) * (1 - prog(f, at(2), 16));
  const s2 = at(1, 0.22), s4 = at(1, 0.45);
  const n = f < s2 ? 1 : f < s4 ? 2 : 4;
  const explode = n === 1 ? 0 : prog(f, n === 2 ? s2 : s4, 26);
  const steps = [{t: at(2), k: 4, atoms: 923, pct: 39}, {t: at(3), k: 3, atoms: 309, pct: 52}, {t: at(3, 0.5), k: 2, atoms: 55, pct: 76}, {t: at(4), k: 1, atoms: 13, pct: 92}];
  const cl = prog(f, at(2), 18) * (1 - prog(f, at(5), 18));
  let atoms = steps[0].atoms, pct = steps[0].pct;
  for (let i = 1; i < steps.length; i++) {
    const t = prog(f, steps[i].t, 24);
    atoms = mix(atoms, steps[i].atoms, t); pct = mix(pct, steps[i].pct, t);
  }
  const firstWith = (pred: (k: number) => boolean) => steps.find((s) => pred(s.k))?.t ?? 1e9;
  const tilt = prog(f, at(5, 0.25), 40) * -11;
  const bal = prog(f, at(5), 20);
  return (
    <Stage>
      <foreignObject x={0} y={0} width={1920} height={200}><Heading start={at(0)} text="The reason: the surface" /></foreignObject>
      {/* cube */}
      <g>{isoCubes(n, explode, 300, 640, 560, cubeO)}</g>
      <g opacity={cubeO}>
        <Rise start={at(1, 0.05)} x={1180} y={420} size={34} anchor="start" color={C.mute} weight={500}>volume</Rise>
        <Rise start={at(1, 0.05)} x={1480} y={420} size={44} anchor="start">the same</Rise>
        <Rise start={at(1, 0.15)} x={1180} y={510} size={34} anchor="start" color={C.mute} weight={500}>surface</Rise>
        <text x={1480} y={512} fontSize={52} fontWeight={700} fill={C.orange} fontFamily={FONT} opacity={prog(f, at(1, 0.15), 20)}>× {n}</text>
        <Tag start={at(1, 0.62)} x={1420} y={640} color={C.orange} filled text="high surface area / volume" />
        <Tag start={at(1, 0.82)} x={1420} y={730} color={C.blue} text="unit: m² / m³" />
      </g>
      {/* clusters */}
      <g opacity={cl}>
        <g transform="translate(700 590)">
          {hexAtoms(4).map((a, i) => {
            const [x, y] = hexXY(a.q, a.r, 54);
            const gone = prog(f, firstWith((k) => k < a.ring), 16);
            const surf = prog(f, firstWith((k) => k === a.ring), 16);
            const s = pop(f, at(2) + 4 + a.ring * 4) * (1 - gone);
            return <Atom key={i} x={x * (1 + gone * 0.4)} y={y * (1 + gone * 0.4)} r={25} s={s} o={1 - gone} fill={mixColor('#cbbda4', C.orange, surf)} />;
          })}
        </g>
        <text x={700} y={1000} fontSize={22} fill={C.mute} textAnchor="middle" fontFamily={FONT}>sketch: orange = atoms on the surface</text>
        <text x={1220} y={420} fontSize={30} fill={C.mute} fontFamily={FONT}>atoms in the cluster</text>
        <text x={1220} y={500} fontSize={76} fontWeight={700} fill={C.ink} fontFamily={FONT}>{Math.round(atoms)}</text>
        <text x={1220} y={610} fontSize={30} fill={C.mute} fontFamily={FONT}>on the surface</text>
        <text x={1220} y={700} fontSize={96} fontWeight={750} fill={C.orange} fontFamily={FONT}>{Math.round(pct)}%</text>
        <rect x={1220} y={740} width={520} height={26} rx={13} fill={C.soft} />
        <rect x={1220} y={740} width={5.2 * pct} height={26} rx={13} fill={C.orange} />
      </g>
      {/* balance: surface properties outweigh bulk properties */}
      <g opacity={bal}>
        <polygon points="960,640 900,820 1020,820" fill={C.mute} />
        <g transform={`rotate(${tilt} 960 640)`}>
          <rect x={560} y={630} width={800} height={14} rx={7} fill={C.ink} />
          <circle cx={960} cy={637} r={14} fill={C.blue} />
          {[[580, C.orange, 'surface properties'], [1340, C.sand, 'bulk properties']].map(([x, c, t]) => (
            <g key={t as string} transform={`translate(${x} 640) rotate(${-tilt})`}>
              <line x1={-70} y1={110} x2={0} y2={0} stroke={C.ink} strokeWidth={2} /><line x1={70} y1={110} x2={0} y2={0} stroke={C.ink} strokeWidth={2} />
              <path d="M -95 110 Q 0 175 95 110 Z" fill={c as string} stroke={C.ink} strokeOpacity={0.4} strokeWidth={2} />
              <text y={225} fontSize={32} fontWeight={650} textAnchor="middle" fill={x === 580 ? C.orange : C.mute} fontFamily={FONT}>{t}</text>
            </g>
          ))}
        </g>
        <Rise start={at(5, 0.5)} x={960} y={330} size={40}>at the nano scale, the surface takes over</Rise>
      </g>
    </Stage>
  );
};

/* ---------- 3. melting point: surface atoms have fewer neighbours ---------- */
const Melting: React.FC = () => {
  const {f, at, len} = useScene();
  const cols = 8, rows = 5, d = 88, ox = 1110 - ((cols - 1) * d) / 2, oy = 580 - ((rows - 1) * d) / 2;
  const T = mix(0.12, 0.42, prog(f, at(1), len(1))) + prog(f, at(2), len(2)) * 0.1 + prog(f, at(3), len(3)) * 0.2;
  const melt = prog(f, at(3, 0.25), 70);
  const lat = 1 - prog(f, at(4), 18);
  const surfaceOf = (c: number, r: number) => c === 0 || r === 0 || c === cols - 1 || r === rows - 1;
  const pos = (c: number, r: number) => {
    const s = surfaceOf(c, r), ph = c * 1.7 + r * 2.9, amp = (2 + T * 12) * (s ? 1.8 : 1);
    let x = ox + c * d + Math.sin(f / 2.3 + ph) * amp, y = oy + r * d + Math.cos(f / 2.1 + ph * 1.3) * amp;
    if (s) { const dx = c - (cols - 1) / 2, dy = r - (rows - 1) / 2, n = Math.hypot(dx, dy); x += (dx / n) * melt * 70; y += (dy / n) * melt * 70 + melt * 30; }
    return [x, y];
  };
  const hi = prog(f, at(2), 16) * (1 - prog(f, at(3), 14));
  const bonds: React.ReactNode[] = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) for (const [dc, dr] of [[1, 0], [0, 1]]) {
    if (c + dc >= cols || r + dr >= rows) continue;
    const [x1, y1] = pos(c, r), [x2, y2] = pos(c + dc, r + dr);
    const broken = surfaceOf(c, r) || surfaceOf(c + dc, r + dr);
    bonds.push(<line key={`${c}${r}${dc}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.ink} strokeWidth={4} opacity={0.3 * (broken ? 1 - melt : 1)} />);
  }
  // part 2: bulk vs nanoparticle heated side by side
  const p2 = prog(f, at(4) + 16, 20);
  const heat = mix(0.15, 0.8, prog(f, at(4, 0.15), len(4) * 0.75, (t) => t));
  const nanoMelt = prog(f, at(4, 0.15) + len(4) * 0.75 * ((0.5 - 0.15) / 0.65), 30);
  return (
    <Stage>
      <foreignObject x={0} y={0} width={1920} height={200}><Heading start={at(0)} text="Melting point: a physical property" /></foreignObject>
      <g opacity={lat * prog(f, at(0, 0.3), 20)}>
        <Thermometer x={300} y={860} h={560} level={T} />
        {bonds}
        {Array.from({length: cols * rows}, (_, i) => {
          const c = i % cols, r = Math.floor(i / cols), [x, y] = pos(c, r);
          return <Atom key={i} x={x} y={y} r={27} fill={surfaceOf(c, r) ? mixColor('#cbbda4', C.orange, prog(f, at(2), 20)) : '#cbbda4'} />;
        })}
        <g opacity={hi}>
          {(() => { const [x, y] = pos(3, 2); return <><circle cx={x} cy={y} r={40} fill="none" stroke={C.blue} strokeWidth={6} /><line x1={x} y1={y + 40} x2={x} y2={oy + (rows - 1) * d + 70} stroke={C.blue} strokeWidth={4} /><text x={x} y={oy + (rows - 1) * d + 105} fontSize={28} fontWeight={650} fill={C.blue} textAnchor="middle" fontFamily={FONT}>inside: 4 neighbours</text></>; })()}
          {(() => { const [x, y] = pos(5, 0); return <><circle cx={x} cy={y} r={40} fill="none" stroke={C.red} strokeWidth={6} /><line x1={x} y1={y - 30} x2={x} y2={y - 95} stroke={C.red} strokeWidth={6} strokeDasharray="10 9" /><text x={x + 20} y={y - 110} fontSize={28} fontWeight={650} fill={C.red} fontFamily={FONT}>surface: unsaturated bond</text></>; })()}
        </g>
        <Tag start={at(3, 0.3)} x={1110} y={1010} color={C.orange} filled text="surface atoms melt first" out={at(4)} />
        <Rise start={at(1, 0.3)} x={1110} y={225} size={30} color={C.mute} weight={500} out={at(4)}>melting: atoms overcome the forces that hold them in place</Rise>
      </g>
      <g opacity={p2}>
        {[[560, 'bulk gold', 0.88, 'Tm bulk'], [1360, 'nanoparticle', 0.5, 'Tm nano: lower']].map(([x, name, mark, ml], j) => (
          <g key={j}>
            <Thermometer x={(x as number) - 260} y={860} h={520} level={heat} marks={[[mark as number, ml as string, j ? C.orange : C.ink]]} />
            <text x={(x as number) + 80} y={900} fontSize={36} fontWeight={650} textAnchor="middle" fill={C.ink} fontFamily={FONT}>{name}</text>
            {j === 0
              ? Array.from({length: 48}, (_, i) => <circle key={i} cx={(x as number) - 70 + (i % 8) * 36} cy={500 + Math.floor(i / 8) * 36} r={16} fill="#e4b54a" stroke={C.ink} strokeOpacity={0.2} />)
              : hexAtoms(1).map((a, i) => {
                const [hx, hy] = hexXY(a.q, a.r, 46), m = nanoMelt;
                return <Atom key={i} x={(x as number) + 80 + hx * (1 + m * 0.5) + Math.sin(f / 2 + i) * m * 10} y={600 + hy * (1 - m * 0.55) + m * 70} r={22} fill="#e4b54a" />;
              })}
          </g>
        ))}
        <Tag start={at(4, 0.7)} x={1440} y={330} color={C.orange} filled text="melts at a lower temperature" />
      </g>
    </Stage>
  );
};

/* ---------- 4. the five categories, and the trap ---------- */
const icon = (i: number) => {
  const s = {stroke: C.ink, strokeWidth: 5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return [
    <g key={0} {...s}><rect x={-10} y={-50} width={20} height={70} rx={10} /><circle cx={0} cy={34} r={18} fill={C.red} /></g>,
    <g key={1} {...s}><path d="M -14 -50 L -14 -12 L -40 40 L 40 40 L 14 -12 L 14 -50" /><path d="M -28 18 L 28 18 L 40 40 L -40 40 Z" fill={C.teal} /></g>,
    <g key={2} {...s}><path d="M 8 -52 L -24 6 L 4 6 L -8 52 L 28 -8 L 0 -8 Z" fill={C.orange} /></g>,
    <g key={3} {...s}><line x1={-40} y1={0} x2={40} y2={0} /><rect x={-50} y={-26} width={16} height={52} rx={4} fill={C.mute} /><rect x={34} y={-26} width={16} height={52} rx={4} fill={C.mute} /></g>,
    <g key={4} {...s}><circle cx={0} cy={-8} r={28} fill="#f6d77a" /><line x1={-12} y1={30} x2={12} y2={30} />{[0, 1, 2, 3, 4].map((k) => { const a = Math.PI * (1.1 + k * 0.2); return <line key={k} x1={Math.cos(a) * 40} y1={-8 + Math.sin(a) * 40} x2={Math.cos(a) * 54} y2={-8 + Math.sin(a) * 54} />; })}</g>,
  ][i];
};

const Categories: React.FC = () => {
  const {f, at} = useScene();
  const cats = [['Physical', 'melting point', C.red], ['Chemical', 'reactivity', C.teal], ['Electrical', 'conductivity', C.orange], ['Mechanical', 'strength', C.mute], ['Optical', 'light emission', '#c9a227']];
  const X = (i: number) => 960 + (i - 2) * 340;
  // the trap: "reactivity" tries the Physical card, is rejected, goes back to Chemical
  const lift = prog(f, at(2, 0.08), 26), back = prog(f, at(2, 0.42), 26);
  const rx = mix(X(1), X(0), lift * (1 - back)), ry = 700 - 250 * Math.sin(Math.PI * Math.min(1, lift * (1 - back) + back * 0));
  const wrong = prog(f, at(2, 0.22), 10) * (1 - prog(f, at(2, 0.42), 10));
  const shake = wrong * Math.sin(f * 1.6) * 14;
  const good = prog(f, at(2, 0.6), 16);
  return (
    <Stage>
      <foreignObject x={0} y={0} width={1920} height={200}><Heading start={at(0)} text="Five property categories" /></foreignObject>
      <Rise start={at(0, 0.4)} x={960} y={230} size={32} color={C.mute} weight={500}>learn each one with its example</Rise>
      {cats.map(([name, ex, col], i) => {
        const s = pop(f, at(1, 0.03 + i * 0.19));
        const isTrapChip = i === 1 && lift > 0 && back < 1;
        return (
          <g key={i} transform={`translate(${X(i)} 560) scale(${s})`} opacity={Math.min(1, s)}>
            <rect x={-150} y={-200} width={300} height={400} rx={22} fill={C.card} stroke={i === 0 ? mixColor('#d8cdbb', C.red, good) : C.line} strokeWidth={i === 0 ? 4 + good * 4 : 4} />
            <g transform="translate(0 -95)">{icon(i)}</g>
            <text y={20} fontSize={38} fontWeight={700} textAnchor="middle" fill={col as string} fontFamily={FONT}>{name}</text>
            {!isTrapChip && <g transform="translate(0 140)">
              <rect x={-125} y={-30} width={250} height={60} rx={30} fill={i === 0 ? mixColor('#e9dfcd', '#f6d3c9', good) : C.soft} />
              <text y={10} fontSize={28} fontWeight={600} textAnchor="middle" fill={C.ink} fontFamily={FONT}>{ex}</text>
            </g>}
          </g>
        );
      })}
      {lift > 0 && back < 1 && (
        <g transform={`translate(${rx + shake} ${ry})`}>
          <rect x={-125} y={-30} width={250} height={60} rx={30} fill={wrong > 0.1 ? '#f6d3c9' : C.soft} stroke={wrong > 0.1 ? C.red : 'none'} strokeWidth={4} />
          <text y={10} fontSize={28} fontWeight={600} textAnchor="middle" fill={C.ink} fontFamily={FONT}>reactivity</text>
        </g>
      )}
      <g opacity={wrong}><text x={X(0)} y={330} fontSize={40} fontWeight={750} textAnchor="middle" fill={C.red} fontFamily={FONT}>✗ not physical</text></g>
      <g opacity={prog(f, at(2, 0.5), 14)}><text x={X(1)} y={840} fontSize={34} fontWeight={750} textAnchor="middle" fill={C.green} fontFamily={FONT}>✓ chemical</text></g>
      <Tag start={at(2, 0.7)} x={X(0)} y={840} color={C.red} filled text="exam: melting point" />
    </Stage>
  );
};

export const L3Scenes: Record<string, React.FC> = {scale: Scale, surface: Surface, melting: Melting, categories: Categories};
