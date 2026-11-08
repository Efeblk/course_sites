/* ENS010 Lecture 5 · Prevention, radiation, optical imaging. Narration: src/scripts/ens010-L5.json */
import React from 'react';
import {random} from 'remotion';
import {Arrow, Atom, Body, C, Card, Mark, mix, mixColor, pop, prog, Rise, Stage, StageHeading, T, Tag, useScene} from '../lib';

const Germ: React.FC<{x: number; y: number; r?: number; o?: number; s?: number; color?: string}> = ({x, y, r = 30, o = 1, s = 1, color = C.green}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {Array.from({length: 10}, (_, k) => { const a = (k / 10) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * r} y1={Math.sin(a) * r} x2={Math.cos(a) * r * 1.4} y2={Math.sin(a) * r * 1.4} stroke={color} strokeWidth={5} strokeLinecap="round" />; })}
    <circle r={r} fill={color} opacity={0.85} /><circle cx={-r * 0.3} cy={-r * 0.2} r={r * 0.2} fill="#fff" opacity={0.4} />
  </g>
);

/* ---------- 1. three sectors of health ---------- */
const Health: React.FC = () => {
  const {f, at} = useScene();
  const focus = prog(f, at(2), 20);
  const icons = [
    <g key={0}><path d="M 0 -70 L 60 -45 L 55 20 Q 40 60 0 80 Q -40 60 -55 20 L -60 -45 Z" fill={C.teal} opacity={0.85} /><path d="M -22 5 L -5 25 L 28 -18" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" /></g>,
    <g key={1}><circle cx={-12} cy={-12} r={48} fill="none" stroke={C.blue} strokeWidth={12} /><line x1={24} y1={24} x2={66} y2={66} stroke={C.blue} strokeWidth={16} strokeLinecap="round" /></g>,
    <g key={2} transform="rotate(-35)"><rect x={-70} y={-30} width={140} height={60} rx={30} fill={C.orange} /><rect x={0} y={-30} width={70} height={60} rx={0} fill={C.red} /><rect x={-70} y={-30} width={140} height={60} rx={30} fill="none" stroke={C.ink} strokeWidth={4} /></g>,
  ];
  const names = ['prevention', 'diagnosis', 'treatment'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Nano in health" />
      <Rise start={at(0, 0.45)} x={960} y={250} size={32} color={C.mute} weight={500}>the most important application</Rise>
      {names.map((n, i) => (
        <g key={n} opacity={i === 2 ? 1 - focus * 0.6 : 1}>
          <Card start={at(1, 0.3 + i * 0.15)} x={480 + i * 480} y={590} w={380} h={420} stroke={i < 2 && focus > 0.5 ? C.orange : C.line} sw={i < 2 ? 4 + focus * 4 : 4}>
            <g transform="translate(0 -60)">{icons[i]}</g>
            <T y={130} size={42} weight={700}>{n}</T>
          </Card>
        </g>
      ))}
      <Tag start={at(2, 0.3)} x={720} y={880} color={C.orange} filled text="this lecture" />
    </Stage>
  );
};

/* ---------- 2. prevention ---------- */
const Prevent: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(3) + 16, 20);
  const kill = prog(f, at(2, 0.55), 30);
  const germs = Array.from({length: 8}, (_, i) => ({x: 1320 + (random(`gx${i}`) - 0.5) * 420, y: 600 + (random(`gy${i}`) - 0.5) * 300}));
  const items = ['mask', 'gloves', 'spray', 'PPE'];
  const icon = (i: number) => [
    <path key={0} d="M -70 -30 Q 0 -60 70 -30 L 60 30 Q 0 60 -60 30 Z M -70 -20 L -110 -40 M 70 -20 L 110 -40" fill={C.card} stroke={C.ink} strokeWidth={5} />,
    <path key={1} d="M -40 60 L -40 -20 L -55 -60 M -40 -20 L -20 -70 M -10 -20 L 0 -75 M 15 -20 L 25 -70 M 30 -10 L 55 -40 M -40 60 L 40 60 L 40 -15 L -40 -20" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />,
    <g key={2}><rect x={-35} y={-30} width={70} height={100} rx={14} fill={C.card} stroke={C.ink} strokeWidth={5} /><rect x={-15} y={-60} width={30} height={30} fill={C.ink} />{[0, 1, 2].map((k) => <circle key={k} cx={40 + k * 18} cy={-55 - k * 6} r={5} fill={C.mute} />)}</g>,
    <g key={3}><circle cy={-30} r={40} fill={C.card} stroke={C.ink} strokeWidth={5} /><rect x={-40} y={-20} width={80} height={20} fill={C.teal} opacity={0.5} /><path d="M -60 70 Q 0 10 60 70" fill={C.card} stroke={C.ink} strokeWidth={5} /></g>,
  ][i];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Prevention" out={at(3)} />
      <g opacity={1 - p2}>
        <g opacity={prog(f, at(0, 0.2), 16) * (1 - prog(f, at(1), 16))}>
          <rect x={460} y={420} width={1000} height={130} rx={65} fill={C.card} stroke={C.teal} strokeWidth={5} />
          <T x={960} y={500} size={40} weight={650}>eliminate the <tspan fill={C.teal} fontWeight={800}>cause</tspan> → eliminate the problem</T>
        </g>
        {items.map((t, i) => {
          const s = pop(f, at(1, 0.15 + i * 0.15)), shrink = prog(f, at(2), 20);
          return (
            <g key={t} transform={`translate(${mix(420 + i * 360, 260 + i * 0, shrink)} ${mix(560, 330 + i * 190, shrink)}) scale(${s * mix(1, 0.6, shrink)})`} opacity={Math.min(1, s)}>
              {icon(i)}
              {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={(random(`n${i}${k}`) - 0.5) * 100} cy={(random(`m${i}${k}`) - 0.5) * 80} r={7} fill="#b8bcc6" stroke={C.ink} strokeOpacity={0.4} />)}
              <T y={130} size={34} weight={650}>{t}</T>
            </g>
          );
        })}
        <Rise start={at(1, 0.75)} x={960} y={860} size={30} color={C.mute} weight={500} out={at(2)}>with antibacterial, antiviral, antifungal nanoparticles</Rise>
        {/* same material, nano size */}
        <g opacity={prog(f, at(2), 20)}>
          <g transform="translate(700 600)">
            <path d="M -90 40 Q -110 -40 -30 -70 Q 60 -90 90 -20 Q 110 50 20 70 Q -60 80 -90 40 Z" fill="#b8bcc6" stroke={C.ink} strokeOpacity={0.4} strokeWidth={4} />
            <T y={140} size={32} weight={650}>silver, bulk</T>
          </g>
          <T x={960} y={610} size={50} weight={700} color={C.mute}>→</T>
          {germs.map((g, i) => <Germ key={i} x={g.x} y={g.y} r={26} s={1 - prog(f, at(2, 0.55) + i * 3, 10)} o={1 - prog(f, at(2, 0.55) + i * 3, 10)} />)}
          {Array.from({length: 14}, (_, i) => {
            const g = germs[i % 8], sx = 1100 + (random(`sx${i}`) - 0.3) * 120, sy = 600 + (random(`sy${i}`) - 0.5) * 300;
            const t = prog(f, at(2, 0.3) + i, 24);
            return <Atom key={i} x={mix(sx, g.x + (i > 7 ? 20 : -20), t)} y={mix(sy, g.y, t)} r={11} fill="#b8bcc6" />;
          })}
          <Tag start={at(2, 0.25)} x={1320} y={330} color={C.blue} filled text="same material, nano size" />
          <Tag start={at(2, 0.6)} x={1320} y={860} color={C.orange} text="higher reactivity kills pathogens" />
        </g>
      </g>
      {/* personal care + the warning */}
      <g opacity={p2}>
        {[['sunscreen', 'ZnO · TiO₂', C.orange], ['shampoo', 'Ag NPs · antifungal', C.teal], ['textiles', 'Ag NPs · antibacterial', C.blue]].map(([t, sub, col], i) => (
          <Card key={t} start={at(3, 0.1 + i * 0.2) + 16} x={420 + i * 540} y={420} w={460} h={300} stroke={col}>
            {i === 0 && <g><rect x={-40} y={-110} width={80} height={130} rx={18} fill={C.orange} opacity={0.8} /><rect x={-20} y={-130} width={40} height={24} fill={C.ink} /></g>}
            {i === 1 && <g><path d="M -45 20 L -45 -80 Q 0 -110 45 -80 L 45 20 Z" fill={C.teal} opacity={0.8} /><rect x={-15} y={-115} width={30} height={22} fill={C.ink} /></g>}
            {i === 2 && <path d="M -80 -100 L -30 -110 Q 0 -90 30 -110 L 80 -100 L 100 -50 L 65 -40 L 65 20 L -65 20 L -65 -40 L -100 -50 Z" fill={C.blue} opacity={0.75} />}
            <T y={75} size={36} weight={700}>{t}</T>
            <T y={120} size={28} color={C.mute} weight={550}>{sub}</T>
          </Card>
        ))}
        <g opacity={prog(f, at(4), 18)} transform="translate(960 800)">
          <rect x={-620} y={-90} width={1240} height={200} rx={26} fill="#fbeee0" stroke={C.red} strokeWidth={5} />
          <polygon points="-530,40 -470,-60 -410,40" fill={C.red} /><T x={-470} y={25} size={50} color="#fff" weight={800}>!</T>
          <T x={-370} y={-15} size={36} weight={700} anchor="start">long-term effects unknown (genotoxicity)</T>
          <T x={-370} y={50} size={32} color={C.mute} weight={550} anchor="start" o={prog(f, at(4, 0.5), 14)}>use with precautions · real certificates</T>
        </g>
      </g>
    </Stage>
  );
};

/* ---------- 3. early diagnosis ---------- */
const Early: React.FC = () => {
  const {f, at} = useScene();
  const cats = prog(f, at(4), 20);
  const reasons = ['choose the best therapy, stop the disease', 'more effective treatment', 'no wasted medical resources'];
  return (
    <Stage>
      <StageHeading start={at(0)} text="Why early diagnosis?" />
      <g opacity={prog(f, at(0, 0.3), 16) * (1 - cats)}>
        <defs><linearGradient id="prog" x1="0" x2="1"><stop offset="0" stopColor={C.green} /><stop offset="0.5" stopColor={C.orange} /><stop offset="1" stopColor={C.red} /></linearGradient></defs>
        <rect x={360} y={300} width={1200} height={30} rx={15} fill="url(#prog)" opacity={0.8} />
        <T x={360} y={380} size={28} anchor="start" color={C.green} weight={650}>early</T>
        <T x={1560} y={380} size={28} anchor="end" color={C.red} weight={650}>advanced disease</T>
        <g transform={`translate(${mix(1450, 470, prog(f, at(0, 0.4), 30))} 315)`}><circle r={44} fill="none" stroke={C.blue} strokeWidth={10} /><line x1={32} y1={32} x2={62} y2={62} stroke={C.blue} strokeWidth={12} strokeLinecap="round" /></g>
      </g>
      {reasons.map((r, i) => (
        <g key={r} opacity={1 - cats}>
          <Card start={at(i + 1, 0.1)} x={960} y={500 + i * 150} w={1100} h={120} stroke={C.blue}>
            <circle cx={-490} r={34} fill={C.blue} /><T x={-490} y={12} size={34} color="#fff" weight={800}>{i + 1}</T>
            <T x={-430} y={12} size={38} weight={650} anchor="start">{r}</T>
          </Card>
        </g>
      ))}
      <g opacity={cats}>
        <T x={960} y={330} size={40} weight={700}>three categories of diagnostic techniques</T>
        {['imaging', 'biosensors', 'wearable sensors'].map((t, i) => (
          <Card key={t} start={at(4, 0.2 + i * 0.2)} x={480 + i * 480} y={600} w={400} h={220} stroke={[C.purple, C.teal, C.orange][i]}>
            <T y={14} size={42} weight={700} color={[C.purple, C.teal, C.orange][i]}>{t}</T>
          </Card>
        ))}
      </g>
    </Stage>
  );
};

/* ---------- 4. ionizing vs non-ionizing ---------- */
const Radiation: React.FC = () => {
  const {f, at} = useScene();
  const bands = ['power lines', 'radio', 'mobile', 'infrared', 'visible', 'UV', 'X-ray', 'gamma'];
  const BX = (i: number) => 220 + i * 210;
  const DIV = (BX(4) + BX(5)) / 2;
  let d = 'M 140 380';
  for (let x = 140; x <= 1800; x += 3) {
    const ph = 0.025 * 721 * (Math.exp((x - 140) / 721) - 1);
    d += ` L ${x} ${380 + Math.sin(ph - f / 4) * 34}`;
  }
  const left = prog(f, at(1, 0.1), 20), right = prog(f, at(2, 0.05), 20);
  const snap = prog(f, at(2, 0.5), 14);
  const bin = (items: string[], line: number, toX: number, note: string[]) => items.map((t, i) => {
    const t1 = prog(f, at(line, 0.2 + i * 0.15), 24);
    return (
      <g key={t} transform={`translate(${mix(960, toX - 210 + i * 210, t1)} ${mix(560, 860, t1)})`} opacity={prog(f, at(line, 0.15 + i * 0.15), 8)}>
        <rect x={-95} y={-34} width={190} height={68} rx={16} fill={C.card} stroke={C.ink} strokeWidth={3} />
        <T y={10} size={30} weight={700}>{t}</T>
        {note[i] && <T y={62} size={22} color={C.mute} weight={550}>{note[i]}</T>}
      </g>
    );
  });
  return (
    <Stage>
      <StageHeading start={at(0)} text="Ionizing vs non-ionizing" />
      <Tag start={at(0, 0.55)} x={960} y={225} color={C.red} filled text="likely written question" out={at(1)} />
      <rect x={140} y={300} width={DIV - 140} height={160} rx={20} fill={C.teal} opacity={0.15 * left} />
      <rect x={DIV} y={300} width={1800 - DIV} height={160} rx={20} fill={C.red} opacity={0.15 * right} />
      <path d={d} stroke={C.ink} strokeWidth={4} fill="none" opacity={prog(f, at(0, 0.2), 20)} />
      {bands.map((b, i) => <T key={b} x={BX(i)} y={500} size={26} weight={600} o={prog(f, at(i < 5 ? 1 : 2, 0.2 + (i % 5) * 0.08), 10)}>{b}</T>)}
      <line x1={DIV} x2={DIV} y1={280} y2={520} stroke={C.ink} strokeWidth={4} strokeDasharray="10 8" opacity={left} />
      <T x={(140 + DIV) / 2} y={270} size={36} weight={750} color={C.teal} o={left}>non-ionizing · safe</T>
      <T x={(DIV + 1800) / 2} y={270} size={36} weight={750} color={C.red} o={right}>ionizing · harmful</T>
      {/* a bond breaking */}
      <g opacity={right * (1 - prog(f, at(3), 14))} transform="translate(1440 650)">
        <Atom x={-60 - snap * 40} y={snap * 10} r={34} fill={C.blue} />
        <Atom x={60 + snap * 40} y={-snap * 10} r={34} fill={C.orange} />
        <line x1={-26} x2={26} y1={0} y2={0} stroke={C.ink} strokeWidth={8} opacity={1 - snap} />
        <T y={100} size={28} weight={650} color={C.red} o={snap}>breaks molecular bonds</T>
      </g>
      <g opacity={left * (1 - prog(f, at(3), 14))} transform="translate(560 650)">
        <circle r={70} fill="#f2d4c4" stroke={C.ink} strokeOpacity={0.3} strokeWidth={4} /><circle r={22} fill={C.brown} opacity={0.6} />
        <T y={120} size={28} weight={650} color={C.teal}>the cell stays intact</T>
      </g>
      {/* bins */}
      <g opacity={prog(f, at(3), 16)}>
        <rect x={1060} y={780} width={720} height={200} rx={24} fill="none" stroke={C.red} strokeWidth={5} />
        <T x={1420} y={1030} size={36} weight={750} color={C.red}>invasive</T>
      </g>
      <g opacity={prog(f, at(4), 16)}>
        <rect x={140} y={780} width={720} height={200} rx={24} fill="none" stroke={C.teal} strokeWidth={5} />
        <T x={500} y={1030} size={36} weight={750} color={C.teal}>non-invasive</T>
      </g>
      {bin(['PET', 'SPECT', 'CT'], 3, 1420, ['gamma', 'gamma', 'X-ray'])}
      {bin(['MRI', 'ultrasound', 'optical'], 4, 500, ['', '', ''])}
    </Stage>
  );
};

/* ---------- 5. optical imaging and nano probes ---------- */
const Optical: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(3) + 16, 20);
  const fade = prog(f, at(1, 0.1), 30);
  const inj = prog(f, at(2, 0.2), 20), spread = prog(f, at(2, 0.45), 50);
  const dots = Array.from({length: 40}, (_, i) => ({a: random(`a${i}`) * Math.PI * 2, r: random(`r${i}`)}));
  return (
    <Stage>
      <StageHeading start={at(0)} text="Optical imaging" out={at(3)} />
      <g opacity={1 - p2}>
        {/* light into tissue */}
        <rect x={180} y={420} width={640} height={540} rx={24} fill="#f2d4c4" opacity={prog(f, at(0, 0.1), 14)} />
        <defs><linearGradient id="beam" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f6d77a" stopOpacity={0.95} /><stop offset={mix(1, 0.35, fade)} stopColor="#f6d77a" stopOpacity={0.6} /><stop offset="1" stopColor="#f6d77a" stopOpacity={mix(0.5, 0, fade)} /></linearGradient></defs>
        <polygon points="440,260 560,260 600,960 400,960" fill="url(#beam)" opacity={prog(f, at(0, 0.15), 16)} />
        <T x={500} y={240} size={30} weight={650} o={prog(f, at(0, 0.15), 16)}>light: non-ionizing</T>
        <Tag start={at(0, 0.6)} x={500} y={1010} color={C.teal} text="catches metabolic changes" out={at(1)} />
        <Tag start={at(1, 0.4)} x={500} y={1010} color={C.red} filled text="does not penetrate deep" />
        {/* dye injection spreads */}
        <g opacity={prog(f, at(2), 16)}>
          <Body x={1360} y={560} s={0.78} />
          <g transform={`translate(${mix(1640, 1480, inj)} ${mix(560, 600, inj)}) rotate(-20)`}>
            <rect x={0} y={-16} width={160} height={32} rx={6} fill={C.card} stroke={C.ink} strokeWidth={4} />
            <rect x={10} y={-10} width={100 * (1 - inj)} height={20} fill={C.green} />
            <line x1={-50} x2={0} y1={0} y2={0} stroke={C.ink} strokeWidth={4} />
          </g>
          {dots.map((d, i) => <circle key={i} cx={1440 + Math.cos(d.a) * d.r * 150 * spread - 60 * spread} cy={600 + Math.sin(d.a) * d.r * 340 * spread} r={10} fill={C.green} opacity={spread * (0.6 + 0.4 * Math.sin(f / 5 + i))} />)}
          <Rise start={at(2, 0.1)} x={1360} y={230} size={32}>fluorescence dye (e.g. ICG)</Rise>
          <Tag start={at(2, 0.4)} x={1700} y={330} color={C.orange} text="minimally invasive" />
          <Tag start={at(2, 0.75)} x={1700} y={900} color={C.red} text="goes everywhere" />
        </g>
      </g>
      <g opacity={p2}>
        <T x={960} y={200} size={44} weight={700}>nanoparticles: better probes</T>
        <Card start={at(3) + 16} x={420} y={580} w={460} h={560} stroke="#c9a227">
          <Atom x={0} y={-90} r={70} fill="#e4b54a" />
          <T y={90} size={40} weight={700}>gold NPs</T>
        </Card>
        <Card start={at(4)} x={960} y={580} w={500} h={560} stroke={C.purple}>
          <Atom x={0} y={-90} r={56} fill={C.purple} />
          <Arrow start={at(4, 0.3)} x1={-220} y1={-200} x2={-60} y2={-120} color={C.red} w={8} />
          <T x={-180} y={-215} size={24} weight={650} color={C.red}>NIR in, deep</T>
          <Arrow start={at(4, 0.6)} x1={60} y1={-60} x2={180} y2={0} color={C.blue} w={8} />
          <T x={120} y={50} size={24} weight={650} color={C.blue}>visible / UV out</T>
          <T y={110} size={40} weight={700}>upconversion NPs</T>
        </Card>
        <Card start={at(5)} x={1500} y={580} w={460} h={560} stroke={C.orange}>
          {[0, 1, 2, 3, 4, 5].map((k) => <g key={k}><circle cx={-110 + (k % 3) * 110} cy={-150 + Math.floor(k / 3) * 110} r={30 + 6 * Math.sin(f / 4 + k)} fill={[C.red, C.orange, '#c9a227', C.green, C.teal, C.blue][k]} opacity={0.35} /><circle cx={-110 + (k % 3) * 110} cy={-150 + Math.floor(k / 3) * 110} r={18} fill={[C.red, C.orange, '#c9a227', C.green, C.teal, C.blue][k]} /></g>)}
          <T y={90} size={40} weight={700}>quantum dots</T>
          <T y={140} size={26} color={C.mute} weight={550}>excellent quantum yield</T>
          <T y={180} size={26} color={C.mute} weight={550}>low photobleaching</T>
        </Card>
      </g>
    </Stage>
  );
};

export const L5Scenes: Record<string, React.FC> = {health: Health, prevent: Prevent, early: Early, radiation: Radiation, optical: Optical};
