/* ENS010 Lecture 4 · Classification by dimension. Narration: src/scripts/ens010-L4.json */
import React from 'react';
import {random} from 'remotion';
import {Arrow, C, FONT, Mark, mix, mixColor, pop, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';

/* isometric box centred on (ox, oy); X runs to the lower left, Y to the lower right, Z up */
const isoBox = (ox: number, oy: number, X: number, Y: number, Z: number, cols = ['#f0c56d', C.orange, '#c47f1e'], o = 1) => {
  const c = Math.cos(Math.PI / 6);
  const P = (x: number, y: number, z: number) => `${ox + (y - x) * c},${oy + (x + y) * 0.5 - z}`;
  const [x0, x1, y0, y1, z0, z1] = [-X / 2, X / 2, -Y / 2, Y / 2, -Z / 2, Z / 2];
  return (
    <g opacity={o} stroke={C.ink} strokeOpacity={0.4} strokeWidth={2.5} strokeLinejoin="round">
      <polygon points={[P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)].join(' ')} fill={cols[0]} />
      <polygon points={[P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)].join(' ')} fill={cols[2]} />
      <polygon points={[P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)].join(' ')} fill={cols[1]} />
    </g>
  );
};
const isoPt = (ox: number, oy: number, x: number, y: number, z: number) => {
  const c = Math.cos(Math.PI / 6);
  return [ox + (y - x) * c, oy + (x + y) * 0.5 - z];
};

/* where to write the X, Y, Z labels: beside the bottom edge parallel to X / Y, and the right vertical edge for Z */
const isoLabels = (ox: number, oy: number, X: number, Y: number, Z: number) => {
  const c = Math.cos(Math.PI / 6);
  return {
    X: [ox + (Y / 2) * c + 40, oy + Y / 4 + Z / 2 + 50],
    Y: [ox - (X / 2) * c - 40, oy + X / 4 + Z / 2 + 50],
    Z: [ox + ((X + Y) / 2) * c + 30, oy + (Y - X) / 4 + 10],
  };
};

/* ---------- 1. many ways to classify; dimension is the one ---------- */
const Ways: React.FC = () => {
  const {f, at} = useScene();
  const ways = ['origin', 'composition', 'phase', 'dispersion', 'uniformity', 'agglomeration', 'synthesis', 'and more'];
  const away = prog(f, at(2), 26);
  const rule = prog(f, at(3), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Classifying nanomaterials" />
      {ways.map((w, i) => {
        const a = (i / ways.length) * Math.PI * 2 + 0.3, R = 330 + random(`w${i}`) * 60;
        const x = 960 + Math.cos(a) * R * 1.35, y = 560 + Math.sin(a) * R * 0.75;
        const dim = prog(f, at(1, 0.65), 20);
        return (
          <g key={w} opacity={1 - away} transform={`translate(${mix(0, Math.cos(a) * 500, away)} ${mix(0, Math.sin(a) * 300, away)})`}>
            <g opacity={mix(1, 0.4, dim)}><Tag start={at(1, 0.05 + i * 0.05)} x={x} y={y} color={C.mute} text={w} /></g>
            <line x1={x - 90} x2={x + 90} y1={y} y2={y} stroke={C.red} strokeWidth={4} opacity={dim * 0.8} />
          </g>
        );
      })}
      <g transform={`translate(960 ${mix(560, 330, rule)}) scale(${pop(f, at(2, 0.1)) * mix(1.5, 1.1, rule)})`} opacity={Math.min(1, pop(f, at(2, 0.1)))}>
        <rect x={-230} y={-50} width={460} height={100} rx={50} fill={C.blue} />
        <T y={16} size={44} color="#fff" weight={700}>by dimension</T>
      </g>
      <Tag start={at(2, 0.45)} x={960} y={mix(690, 220, rule)} color={C.red} filled text="most probably asked" />
      {/* the rule: count the free (large) dimensions */}
      <g opacity={rule}>
        {isoBox(700, 700, 240, 240, 240)}
        {(() => { const l = isoLabels(700, 700, 240, 240, 240); return <>
          <T x={l.X[0]} y={l.X[1]} size={34} color={C.blue} weight={700}>X</T>
          <T x={l.Y[0]} y={l.Y[1]} size={34} color={C.blue} weight={700}>Y</T>
          <T x={l.Z[0]} y={l.Z[1]} size={34} color={C.blue} weight={700} anchor="start">Z</T></>; })()}
        <T x={1080} y={560} size={40} anchor="start">count the <tspan fill={C.blue} fontWeight={750}>free</tspan> dimensions</T>
        <Rise start={at(3, 0.35)} x={1080} y={650} size={34} anchor="start" color={C.mute} weight={500}>free = still larger than 100 nm</Rise>
        <Rise start={at(3, 0.6)} x={1080} y={730} size={34} anchor="start" color={C.mute} weight={500}>that count is the "D" in 0D, 1D, 2D</Rise>
      </g>
    </Stage>
  );
};

/* ---------- 2. shrink a bulk block: 3 free → 2D → 1D → 0D ---------- */
const Shrink: React.FC = () => {
  const {f, at} = useScene();
  const big = 330, small = 22;
  const sz = prog(f, at(1, 0.25), 34), sy = prog(f, at(3, 0.15), 34), sx = prog(f, at(5, 0.15), 34);
  const X = mix(big, small, sx), Y = mix(big, small, sy), Z = mix(big, small, sz);
  const free = 3 - (sz > 0.5 ? 1 : 0) - (sy > 0.5 ? 1 : 0) - (sx > 0.5 ? 1 : 0);
  const ox = 640, oy = 560;
  const names = ['0D nanomaterial', '1D nanomaterial', '2D nanomaterial', 'bulk, not nano'];
  const cols = [C.purple, C.teal, C.blue, C.mute];
  const lastChange = [at(5, 0.3), at(3, 0.3), at(1, 0.4), at(0)][free];
  const bump = 1 + 0.15 * Math.sin(Math.PI * prog(f, lastChange, 14));
  const label = (n: string, v: number, x: number, y: number, anchor: 'start' | 'middle' | 'end') => {
    const shrunk = v > 0.5;
    return <T x={x} y={y} size={32} weight={650} anchor={anchor} color={shrunk ? C.orange : C.mute}>{n}: {shrunk ? '15 nm' : '> 100 nm'}</T>;
  };
  const lb = isoLabels(ox, oy, X, Y, Z);
  // graphene hexagons drawn on the sheet (top face) while it is 2D
  const hexO = prog(f, at(2), 20) * (1 - sy);
  const hexes = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
    const [hx, hy] = isoPt(ox, oy, i * 40 + (j % 2) * 20, j * 36, Z / 2);
    hexes.push(<circle key={`${i}${j}`} cx={hx} cy={hy} r={9} fill="none" stroke={C.ink} strokeWidth={2.5} />);
  }
  const sphere = prog(f, at(5, 0.4), 18);
  return (
    <Stage>
      <g opacity={1 - sphere}>{isoBox(ox, oy, X, Y, Z)}</g>
      <g opacity={sphere}><circle cx={ox} cy={oy} r={40} fill={C.orange} stroke={C.ink} strokeOpacity={0.4} strokeWidth={3} /><circle cx={ox - 10} cy={oy - 10} r={10} fill="#fff" opacity={0.4} /></g>
      <g opacity={hexO}>{hexes}</g>
      <g opacity={prog(f, at(0, 0.2), 16) * (1 - sphere)}>
        {label('X', sx, lb.X[0], lb.X[1], 'start')}
        {label('Y', sy, lb.Y[0], lb.Y[1], 'end')}
        {label('Z', sz, lb.Z[0], lb.Z[1], 'start')}
      </g>
      <Rise start={at(5, 0.45)} x={ox} y={oy + 110} size={32} color={C.orange}>X, Y and Z: all nano</Rise>
      {/* counter */}
      <g transform="translate(1440 420)">
        <T y={-120} size={32} color={C.mute} weight={500}>free dimensions</T>
        <g transform={`scale(${bump})`}><T y={40} size={190} weight={750} color={cols[free]}>{free}</T></g>
        <g transform={`scale(${bump})`}><T y={150} size={52} weight={700} color={cols[free]}>{names[free]}</T></g>
      </g>
      <Tag start={at(2, 0.05)} x={1440} y={720} color={C.blue} text="film · coating · layer · sheet" out={at(3)} />
      <Tag start={at(2, 0.45)} x={1440} y={800} color={C.blue} filled text="e.g. graphene" out={at(3)} />
      <Tag start={at(4, 0.05)} x={1440} y={720} color={C.teal} text="wire · rod · fiber · tube" out={at(5)} />
      <Tag start={at(5, 0.5)} x={1440} y={720} color={C.purple} filled text="a nanoparticle" />
    </Stage>
  );
};

/* ---------- 3. below 10 nm: quantum well, wire, dot ---------- */
const Quantum: React.FC = () => {
  const {f, at} = useScene();
  // log ruler 1 nm ... 1000 nm
  const L = (nm: number) => 260 + (Math.log10(nm) / 3) * 1400;
  const ptr = mix(1000, 4, prog(f, at(0, 0.1), 50));
  const qGlow = prog(f, at(0, 0.5), 16);
  const card = (i: number, title: string, sub: string, draw: React.ReactNode) => {
    const s = pop(f, at(i + 1));
    return (
      <g key={i} transform={`translate(${480 + i * 480} 760) scale(${s})`} opacity={Math.min(1, s)}>
        <rect x={-200} y={-170} width={400} height={340} rx={24} fill={C.card} stroke={C.purple} strokeWidth={4} />
        <g transform="translate(0 -50)">{draw}</g>
        <T y={85} size={38} weight={700} color={C.purple}>{title}</T>
        <T y={130} size={27} color={C.mute} weight={500}>{sub}</T>
      </g>
    );
  };
  const wob = (k: number) => 1 + 0.06 * Math.sin(f / 5 + k);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Below 10 nm: quantum" />
      <g opacity={prog(f, at(0, 0.05), 16)}>
        <rect x={L(1)} y={300} width={L(10) - L(1)} height={40} fill={C.purple} opacity={0.25 + qGlow * 0.5} rx={6} />
        <rect x={L(10)} y={300} width={L(100) - L(10)} height={40} fill={C.orange} opacity={0.45} />
        <rect x={L(100)} y={300} width={L(1000) - L(100)} height={40} fill={C.sand} opacity={0.6} rx={6} />
        {[1, 10, 100, 1000].map((n) => <g key={n}><line x1={L(n)} x2={L(n)} y1={290} y2={350} stroke={C.ink} strokeWidth={3} /><T x={L(n)} y={390} size={28} color={C.ink}>{n} nm</T></g>)}
        <T x={(L(1) + L(10)) / 2} y={240} size={30} weight={700} color={C.purple} o={0.4 + qGlow * 0.6}>quantum</T>
        <T x={(L(10) + L(100)) / 2} y={240} size={30} weight={700} color={C.orange}>nano</T>
        <T x={(L(100) + L(1000)) / 2} y={240} size={30} weight={700} color={C.brown}>bulk</T>
        <polygon points={`${L(ptr)},296 ${L(ptr) - 16},266 ${L(ptr) + 16},266`} fill={C.ink} transform="translate(0 0)" />
        <Rise start={at(0, 0.55)} x={(L(1) + L(10)) / 2} y={460} size={30} color={C.purple}>only quantum physics applies</Rise>
      </g>
      {card(0, 'quantum well', '1 dimension < 10 nm', <g transform={`scale(${wob(0)})`}>{isoBox(0, 0, 200, 200, 10, ['#cdb8ef', C.purple, '#5b3f86'])}</g>)}
      {card(1, 'quantum wire', '2 dimensions < 10 nm', <g transform={`scale(${wob(1)})`}>{isoBox(0, 0, 230, 12, 12, ['#cdb8ef', C.purple, '#5b3f86'])}</g>)}
      {card(2, 'quantum dot', 'all 3 < 10 nm', <g transform={`scale(${wob(2)})`}><circle r={18} fill={C.purple} /><circle r={36 + 8 * Math.sin(f / 4)} fill="none" stroke={C.purple} strokeWidth={3} opacity={0.4} /></g>)}
      <Tag start={at(3, 0.55)} x={1440} y={980} color={C.purple} filled text="the smallest particle made" />
    </Stage>
  );
};

/* ---------- 4. the table, the 2D trap, no 3D ---------- */
const Table: React.FC = () => {
  const {f, at} = useScene();
  const x0 = 300, c0 = 380, cw = 520, y0 = 250, rh = 150;
  const rows = [
    ['1 small dimension', ['nano film', '2D'], ['quantum well', '']],
    ['2 small dimensions', ['nanowire', '1D'], ['quantum wire', '']],
    ['3 small dimensions', ['nanoparticle', '0D'], ['quantum dot', '']],
  ] as const;
  const fill = (r: number, c: number) => at(1, 0.04 + r * 0.32 + c * 0.13);
  // trap chip: "2D = two nano dimensions?" flies to the 2D cell and is rejected
  const fly = prog(f, at(2, 0.05), 24), rej = prog(f, at(2, 0.42), 20);
  const shake = prog(f, at(2, 0.2), 6) * (1 - rej) * Math.sin(f * 1.7) * 12;
  const cx = x0 + c0 + cw / 2, cy = y0 + rh / 2 + rh;
  const ghost = prog(f, at(3), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Classification by dimension" />
      <g opacity={prog(f, at(0, 0.2), 16)}>
        <T x={x0 + c0 + cw / 2} y={y0 + 10} size={30} color={C.orange} weight={700}>below 100 nm</T>
        <T x={x0 + c0 + cw * 1.5} y={y0 + 10} size={30} color={C.purple} weight={700}>below 10 nm</T>
      </g>
      {rows.map(([head, nano, q], r) => {
        const y = y0 + 40 + r * rh;
        const hi = r === 0 ? prog(f, at(2, 0.55), 16) : 0;
        return (
          <g key={r} opacity={prog(f, at(0, 0.3 + r * 0.1), 14)}>
            <rect x={x0} y={y} width={c0 + cw * 2} height={rh - 14} rx={16} fill={r % 2 ? C.card : '#f7f1e6'} stroke={C.line} strokeWidth={3} />
            <T x={x0 + 30} y={y + rh / 2} size={32} anchor="start" weight={650}>{head}</T>
            {[nano, q].map(([name, d], c) => {
              const s = pop(f, fill(r, c));
              return (
                <g key={c} transform={`translate(${x0 + c0 + cw * c + cw / 2} ${y + rh / 2 - 6}) scale(${s})`} opacity={Math.min(1, s)}>
                  <T y={4} size={36} weight={700} color={c ? C.purple : C.ink}>{name}</T>
                  {d && <g transform="translate(170 -6)"><rect x={-42} y={-30} width={84} height={56} rx={14} fill={mixColor(C.soft, '#f6d3c9', hi)} stroke={hi > 0.1 ? C.red : 'none'} strokeWidth={3} /><T y={10} size={32} weight={750} color={C.blue}>{d}</T></g>}
                </g>
              );
            })}
          </g>
        );
      })}
      {/* the trap */}
      {fly > 0 && rej < 1 && (
        <g transform={`translate(${mix(1300, cx + 170, fly) + shake} ${mix(980, cy - 110, fly)})`} opacity={1 - rej}>
          <rect x={-250} y={-34} width={500} height={68} rx={34} fill="#f6d3c9" stroke={C.red} strokeWidth={4} />
          <T y={11} size={30} weight={650}>2D = two nano dimensions?</T>
        </g>
      )}
      <Mark start={at(2, 0.22)} x={cx + 470} y={cy - 110} ok={false} out={at(2, 0.42)} />
      <g opacity={prog(f, at(2, 0.5), 18) * (1 - ghost)}>
        <rect x={510} y={830} width={900} height={110} rx={24} fill={C.card} stroke={C.blue} strokeWidth={4} />
        <T x={960} y={900} size={40} weight={700}>2D = <tspan fill={C.blue}>2 large</tspan> + <tspan fill={C.orange}>1 nano</tspan> dimension</T>
      </g>
      {/* no 3D */}
      <g opacity={ghost}>
        <rect x={x0} y={y0 + 40 + 3 * rh} width={c0 + cw * 2} height={rh - 20} rx={16} fill="none" stroke={C.mute} strokeWidth={3} strokeDasharray="12 10" />
        <T x={x0 + 30} y={y0 + 40 + 3 * rh + 75} size={32} anchor="start" weight={650} color={C.mute}>0 small dimensions</T>
        <T x={x0 + c0 + cw / 2} y={y0 + 40 + 3 * rh + 78} size={38} weight={700} color={C.mute}>"3D nanomaterial"</T>
        <line x1={x0 + c0 + 80} x2={x0 + c0 + cw - 80} y1={y0 + 40 + 3 * rh + 66} y2={y0 + 40 + 3 * rh + 66} stroke={C.red} strokeWidth={5} opacity={prog(f, at(3, 0.3), 12)} />
        <Tag start={at(3, 0.5)} x={x0 + c0 + cw * 1.5} y={y0 + 40 + 3 * rh + 64} color={C.brown} filled text="that is bulk" />
      </g>
    </Stage>
  );
};

/* ---------- 5. quantum ⊂ nano; maths vs materials ---------- */
const Nested: React.FC = () => {
  const {f, at} = useScene();
  const shift = prog(f, at(3), 26);
  const cx = mix(760, 560, shift), cy = mix(560, 470, shift), sc = mix(1, 0.72, shift);
  const qr = pop(f, at(0, 0.1)) * 120, nr = pop(f, at(1, 0.1)) * 330;
  const drop = prog(f, at(2, 0.3), 24, (t) => 1 - (1 - t) ** 3);
  const L = (nm: number) => 200 + (nm / 1000) * 1500;
  return (
    <Stage>
      <StageHeading start={at(0)} text="Nano and quantum" out={at(3)} />
      <g transform={`translate(${cx} ${cy}) scale(${sc})`}>
        <circle r={nr} fill={C.orange} opacity={0.14} stroke={C.orange} strokeWidth={5} />
        <circle cx={-90} cy={60} r={qr} fill={C.purple} opacity={0.2} stroke={C.purple} strokeWidth={5} />
        <T x={-90} y={50} size={34} weight={700} color={C.purple} o={prog(f, at(0, 0.3), 14)}>quantum</T>
        <T x={-90} y={95} size={28} color={C.purple} weight={550} o={prog(f, at(0, 0.3), 14)}>1–10 nm</T>
        <T x={0} y={-210} size={38} weight={700} color={C.orange} o={prog(f, at(1, 0.3), 14)}>nanomaterials</T>
        <T x={0} y={-165} size={28} weight={550} color={C.orange} o={prog(f, at(1, 0.3), 14)}>1–100 nm</T>
        {/* the 50 nm particle lands in nano, outside quantum */}
        <g transform={`translate(${mix(560, 150, drop)} ${mix(-460, -40, drop)})`} opacity={prog(f, at(2, 0.25), 10)}>
          <circle r={34} fill={C.orange} stroke={C.ink} strokeOpacity={0.4} strokeWidth={3} />
          <T y={78} size={30} weight={700}>50 nm</T>
        </g>
      </g>
      <g opacity={1 - shift}>
        <Rise start={at(1, 0.5)} x={1450} y={430} size={36}>every quantum material</Rise>
        <Rise start={at(1, 0.55)} x={1450} y={480} size={36}>is a nanomaterial</Rise>
        <Mark start={at(1, 0.65)} x={1450} y={570} ok />
        <Rise start={at(2, 0.05)} x={1450} y={690} size={36}>every nanomaterial quantum?</Rise>
        <Mark start={at(2, 0.55)} x={1450} y={780} ok={false} />
        <Tag start={at(2, 0.75)} x={1450} y={880} color={C.red} filled text="a good midterm question" />
      </g>
      {/* maths vs materials */}
      <g opacity={shift}>
        <line x1={L(0)} x2={L(1000) + 40} y1={900} y2={900} stroke={C.ink} strokeWidth={4} />
        {[0, 100, 500, 1000].map((n) => <g key={n}><line x1={L(n)} x2={L(n)} y1={888} y2={912} stroke={C.ink} strokeWidth={3} /><T x={L(n)} y={955} size={28}>{n} nm</T></g>)}
        <rect x={L(0)} y={820 - 8} width={(L(1000) - L(0)) * prog(f, at(3, 0.15), 30)} height={22} rx={11} fill={C.sand} />
        <T x={L(500)} y={790} size={30} weight={650} color={C.brown} o={prog(f, at(3, 0.2), 14)}>mathematics: nano = below 1000 nm</T>
        <rect x={L(1)} y={860} width={(L(100) - L(1)) * prog(f, at(3, 0.55), 20)} height={22} rx={11} fill={C.orange} />
        <Arrow start={at(3, 0.62)} x1={1180} y1={600} x2={L(60)} y2={850} color={C.orange} />
        <Rise start={at(3, 0.6)} x={1200} y={560} size={34} anchor="start" color={C.orange}>materials: only 1–100 nm</Rise>
        <Rise start={at(3, 0.75)} x={1200} y={610} size={28} anchor="start" color={C.mute} weight={500}>where the properties change</Rise>
      </g>
    </Stage>
  );
};

export const L4Scenes: Record<string, React.FC> = {ways: Ways, shrink: Shrink, quantum: Quantum, table: Table, nested: Nested};
