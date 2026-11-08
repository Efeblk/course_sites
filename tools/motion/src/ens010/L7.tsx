/* ENS010 Lecture 7 · Biosensors. Narration: src/scripts/ens010-L7.json */
import React from 'react';
import {random} from 'remotion';
import {Arrow, Body, C, Card, Draw, Mark, mix, mixColor, pop, prog, Rise, Stage, StageHeading, T, Tag, Thermometer, useScene} from '../lib';

const Antibody: React.FC<{x: number; y: number; s?: number; color?: string; o?: number}> = ({x, y, s = 1, color = C.blue, o = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke={color} strokeWidth={12} strokeLinecap="round" fill="none">
    <path d="M 0 0 L 0 -70 M 0 -70 L -38 -120 M 0 -70 L 38 -120" />
  </g>
);
/* analyte: a down-pointing wedge that fits between the antibody arms */
const Analyte: React.FC<{x: number; y: number; s?: number; o?: number}> = ({x, y, s = 1, o = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><polygon points="-30,-26 30,-26 0,22" fill={C.orange} stroke={C.ink} strokeOpacity={0.3} strokeWidth={3} strokeLinejoin="round" /></g>
);
const LookAlike: React.FC<{x: number; y: number; k: number; o?: number}> = ({x, y, k, o = 1}) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {k % 2 ? <rect x={-24} y={-24} width={48} height={48} rx={8} fill={C.purple} opacity={0.75} /> : <circle r={26} fill={C.teal} opacity={0.75} />}
  </g>
);
const Meter: React.FC<{x: number; y: number; v: number; label: string; color?: string}> = ({x, y, v, label, color = C.blue}) => {
  const a = mix(-150, -30, v) * (Math.PI / 180);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-120} y={-110} width={240} height={170} rx={20} fill={C.card} stroke={C.ink} strokeWidth={4} />
      <path d="M -85 10 A 90 90 0 0 1 85 10" fill="none" stroke={C.line} strokeWidth={10} />
      <line x1={0} y1={20} x2={Math.cos(a) * 85} y2={20 + Math.sin(a) * 85} stroke={color} strokeWidth={6} strokeLinecap="round" />
      <circle cy={20} r={10} fill={C.ink} />
      <T y={45} size={24} weight={650}>{label}</T>
    </g>
  );
};

/* ---------- 1. build a biosensor ---------- */
const Build: React.FC = () => {
  const {f, at} = useScene();
  const xs = [560, 760, 960, 1160, 1360];
  const docks = [0, 1, 3, 4];
  const flow = f > at(4, 0.1);
  const meter = prog(f, at(4, 0.4), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Build a biosensor" />
      <g opacity={prog(f, at(1), 16)}>
        <rect x={420} y={820} width={1080} height={110} rx={14} fill={C.sand} stroke={C.ink} strokeOpacity={0.3} strokeWidth={3} />
        <T x={960} y={890} size={34} weight={700} color={C.ink}>transducer</T>
      </g>
      <g opacity={prog(f, at(1, 0.25), 16)}>
        <rect x={420} y={788} width={1080} height={32} fill={C.teal} opacity={0.75} />
        {Array.from({length: 27}, (_, i) => <polygon key={i} points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6" transform={`translate(${440 + i * 40} 804)`} fill="none" stroke="#fff" strokeWidth={2} opacity={0.7} />)}
        <T x={1540} y={812} size={26} anchor="start" color={C.teal} weight={650}>nanomaterial layer</T>
      </g>
      {xs.map((x, i) => <Antibody key={i} x={x} y={788} s={pop(f, at(1, 0.45 + i * 0.07))} o={Math.min(1, pop(f, at(1, 0.45 + i * 0.07)))} />)}
      <Rise start={at(1, 0.6)} x={1540} y={700} size={28} anchor="start" color={C.blue}>receptors: antibodies</Rise>
      {/* analytes: drift, then dock */}
      {docks.map((d, i) => {
        const sx = 520 + random(`ax${i}`) * 900, sy = 300 + random(`ay${i}`) * 200;
        const t = prog(f, at(3, 0.05 + i * 0.1), 30);
        const wob = (1 - t) * 14;
        return <Analyte key={i} x={mix(sx, xs[d], t) + Math.sin(f / 9 + i) * wob} y={mix(sy, 683, t) + Math.cos(f / 11 + i) * wob} o={prog(f, at(2), 16)} />;
      })}
      {/* look-alikes: come close, bounce off */}
      {[0, 1, 2, 3].map((i) => {
        const sx = 480 + random(`lx${i}`) * 960, sy = 280 + random(`ly${i}`) * 220;
        const tx = [860, 1060, 660, 1260][i];
        const go = prog(f, at(3, 0.25 + i * 0.08), 18), back = prog(f, at(3, 0.25 + i * 0.08) + 18, 26);
        const y = mix(sy, 600, go) - back * (600 - sy + 60);
        return <LookAlike key={i} k={i} x={mix(sx, tx, go * (1 - back * 0.3)) + Math.sin(f / 8 + i) * 12} y={y} o={prog(f, at(2, 0.3), 16)} />;
      })}
      <Rise start={at(2, 0.1)} x={150} y={420} size={28} anchor="start" color={C.orange}>analyte</Rise>
      <Rise start={at(2, 0.4)} x={150} y={470} size={28} anchor="start" color={C.purple}>look-alikes</Rise>
      <Tag start={at(3, 0.35)} x={960} y={250} color={C.orange} text="lock and key" out={at(4)} />
      <Tag start={at(3, 0.75)} x={960} y={250} color={C.blue} filled text="ignoring the look-alikes = selectivity" out={at(4)} />
      {/* electrons and the meter */}
      {flow && Array.from({length: 10}, (_, k) => {
        const t = ((f - at(4, 0.1)) / 60 + k / 10) % 1;
        const x = 520 + t * 1180, y = t < 0.83 ? 960 : 960 - (t - 0.83) / 0.17 * 400;
        return <g key={k}><circle cx={Math.min(x, 1700)} cy={y} r={11} fill={C.blue} /><text x={Math.min(x, 1700)} y={y + 6} fontSize={14} fill="#fff" textAnchor="middle" fontWeight={800}>e</text></g>;
      })}
      <g opacity={prog(f, at(4), 14)}><path d="M 520 960 L 1700 960 L 1700 560" fill="none" stroke={C.ink} strokeWidth={4} opacity={0.4} /></g>
      <g opacity={prog(f, at(4, 0.3), 14)}><Meter x={1700} y={440} v={meter * (0.75 + 0.05 * Math.sin(f / 6))} label="current" /></g>
      <Tag start={at(5, 0.3)} x={960} y={250} color={C.blue} filled text="biological signal → electrical signal" />
    </Stage>
  );
};

/* ---------- 2. parts, traps, in vivo / ex vivo ---------- */
const Parts: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(5) + 16, 20);
  const LX = 860;
  const rows = {analyte: 330, receptor: 470, layer: 565, transducer: 650};
  // trap chips: fly to "receptor", rejected, then to the right row
  const trap = (line: number, text: string, toY: number, toLabel: string) => {
    const go = prog(f, at(line, 0.15), 22), bad = prog(f, at(line, 0.3), 8), fix = prog(f, at(line, 0.55), 24);
    const x = mix(mix(1500, 1260, go), 1300, fix), y = mix(mix(980, rows.receptor, go), toY, fix);
    const shake = bad * (1 - fix) * Math.sin(f * 1.7) * 12;
    const w = text.length * 16 + 60;
    return (
      <g opacity={prog(f, at(line, 0.1), 10)}>
        <g transform={`translate(${x + shake} ${y})`}>
          <rect x={-w / 2} y={-32} width={w} height={64} rx={32} fill={fix > 0.5 ? '#dcebd6' : bad > 0.5 ? '#f6d3c9' : C.soft} stroke={fix > 0.5 ? C.green : bad > 0.5 ? C.red : C.mute} strokeWidth={4} />
          <T y={10} size={28} weight={650}>{text}</T>
        </g>
        <Mark start={at(line, 0.3)} x={1260 + w / 2 + 60} y={rows.receptor} ok={false} size={50} out={at(line, 0.55)} />
        <Rise start={at(line, 0.75)} x={1300 + w / 2 + 30} y={toY + 10} size={28} anchor="start" color={C.green}>{toLabel}</Rise>
      </g>
    );
  };
  return (
    <Stage>
      <StageHeading start={at(0)} text="The parts, and his traps" out={at(5)} />
      <g opacity={1 - p2}>
        <g opacity={prog(f, at(0, 0.3), 16)}>
          <Analyte x={520} y={rows.analyte} s={1.2} />
          <Antibody x={520} y={548} s={1.1} />
          <rect x={360} y={548} width={320} height={34} fill={C.teal} opacity={0.75} />
          <rect x={360} y={582} width={320} height={100} rx={10} fill={C.sand} />
          <T x={LX} y={rows.analyte + 10} size={34} anchor="start" weight={700} color={C.orange}>analyte</T>
          <T x={LX} y={rows.receptor + 10} size={34} anchor="start" weight={700} color={C.blue}>receptor</T>
          <T x={LX} y={rows.layer + 10} size={28} anchor="start" weight={600} color={C.teal}>nanomaterial layer</T>
          <T x={LX} y={rows.transducer + 10} size={34} anchor="start" weight={700} color={C.brown}>transducer</T>
        </g>
        <Rise start={at(1, 0.05)} x={LX} y={rows.receptor + 48} size={26} anchor="start" color={C.mute} weight={500} out={at(3)}>also called biocatalyst</Rise>
        {['enzyme', 'antibody', 'nucleic acid', 'cell'].map((t, i) => <Tag key={t} start={at(1, 0.3 + i * 0.12)} x={1200 + i * 205} y={rows.receptor} color={C.blue} text={t} out={at(3)} />)}
        <Rise start={at(2, 0.2)} x={LX} y={rows.transducer + 60} size={28} anchor="start" color={C.mute} weight={500} out={at(3)}>biological → readable signal, usually electrical</Rise>
        {trap(3, 'antigen', rows.analyte, '= the analyte')}
        {trap(4, 'thermal transducer', rows.transducer, '= a transducer')}
      </g>
      <g opacity={p2}>
        <T x={560} y={210} size={46} weight={750} color={C.red}>in vivo</T>
        <T x={560} y={260} size={30} color={C.mute} weight={550}>inside the body</T>
        <Body x={560} y={600} s={0.7} />
        <rect x={585} y={455} width={56} height={40} rx={10} fill={C.ink} />
        <circle cx={613} cy={475} r={40 + 6 * Math.sin(f / 4)} fill="none" stroke={C.red} strokeWidth={4} />
        <T x={560} y={940} size={30} weight={650}>sensor on a pacemaker</T>
        <T x={1360} y={210} size={46} weight={750} color={C.teal}>ex vivo</T>
        <T x={1360} y={260} size={30} color={C.mute} weight={550}>outside the body</T>
        <g transform="translate(1250 560)">
          <rect x={-70} y={-150} width={140} height={300} rx={20} fill={C.soft} stroke={C.ink} strokeOpacity={0.3} strokeWidth={3} />
          <rect x={-90} y={-70} width={180} height={140} rx={34} fill={C.ink} />
          <T y={14} size={36} color="#fff" weight={700}>{Math.round(92 + 6 * Math.sin(f / 12))}</T>
        </g>
        <g transform="translate(1520 560)">
          <rect x={-80} y={-130} width={160} height={260} rx={24} fill={C.card} stroke={C.ink} strokeWidth={4} />
          <rect x={-55} y={-100} width={110} height={90} rx={8} fill={C.teal} opacity={0.3} />
          <T y={-40} size={30} weight={700}>5.4</T>
          <rect x={-14} y={100} width={28} height={70} fill={C.line} />
        </g>
        <T x={1360} y={940} size={30} weight={650}>health watch · glucose meter</T>
      </g>
    </Stage>
  );
};

/* ---------- 3. where nanomaterials help ---------- */
const Nano: React.FC = () => {
  const {f, at} = useScene();
  const l1 = prog(f, at(1), 18), l2 = prog(f, at(2), 18);
  const shrink = prog(f, at(3, 0.1), 40);
  const s = mix(1, 0.28, shrink), cx = mix(960, 760, shrink), cy = mix(620, 560, shrink);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Where nanomaterials help" />
      <g transform={`translate(${cx} ${cy}) scale(${s})`}>
        {/* layer 2: transducer with a nanotube transistor */}
        <rect x={-560} y={60} width={1120} height={200} rx={20} fill={C.sand} stroke={l2 > 0.5 ? C.orange : 'none'} strokeWidth={8} />
        <rect x={-430} y={110} width={150} height={100} rx={10} fill={C.mute} /><rect x={280} y={110} width={150} height={100} rx={10} fill={C.mute} />
        <g opacity={l2}>
          <rect x={-280} y={140} width={560} height={40} rx={20} fill={C.ink} />
          {Array.from({length: 14}, (_, i) => <line key={i} x1={-270 + i * 40} x2={-250 + i * 40} y1={142} y2={178} stroke="#fff" strokeWidth={3} opacity={0.5} />)}
          {Array.from({length: 6}, (_, k) => { const t = ((f / 40 + k / 6) % 1); return <circle key={k} cx={-260 + t * 520} cy={160} r={9} fill={C.blue} />; })}
        </g>
        {/* layer 1: nanomaterials holding the receptors */}
        <rect x={-560} y={0} width={1120} height={60} fill={C.teal} opacity={0.3 + l1 * 0.5} stroke={l1 > 0.5 ? C.orange : 'none'} strokeWidth={8} />
        <g opacity={l1}>
          {Array.from({length: 28}, (_, i) => <polygon key={i} points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" transform={`translate(${-540 + i * 40} 30)`} fill="none" stroke="#fff" strokeWidth={3} />)}
        </g>
        {[-440, -220, 0, 220, 440].map((x) => <Antibody key={x} x={x} y={0} s={1.2} />)}
      </g>
      <g opacity={1 - shrink}>
        <g opacity={l1}><Arrow start={at(1, 0.1)} x1={1640} y1={500} x2={1520} y2={640} color={C.orange} /><T x={1660} y={470} size={34} weight={700} color={C.orange}>layer 1</T></g>
        <Rise start={at(1, 0.3)} x={960} y={300} size={30} color={C.teal}>nanofibers · functionalized NPs · graphene sheets</Rise>
        <Rise start={at(1, 0.55)} x={960} y={350} size={30} color={C.mute} weight={500}>stabilize the receptors on the transducer</Rise>
        <g opacity={l2}><Arrow start={at(2, 0.1)} x1={1640} y1={940} x2={1460} y2={800} color={C.orange} /><T x={1660} y={980} size={34} weight={700} color={C.orange}>layer 2</T></g>
        <Rise start={at(2, 0.3)} x={700} y={990} size={30} color={C.ink}>nano-transistor: carbon nanotube, graphene</Rise>
      </g>
      {/* wearable and implant */}
      <g opacity={prog(f, at(3, 0.4), 20)}>
        <rect x={600} y={440} width={320} height={240} rx={60} fill="none" stroke={C.ink} strokeWidth={10} />
        <rect x={680} y={330} width={160} height={110} rx={20} fill={C.soft} /><rect x={680} y={680} width={160} height={110} rx={20} fill={C.soft} />
        <T x={760} y={860} size={34} weight={700}>wearable</T>
        <Body x={1300} y={560} s={0.62} />
        <circle cx={1320} cy={480} r={18} fill={C.orange} />
        <circle cx={1320} cy={480} r={36 + 6 * Math.sin(f / 4)} fill="none" stroke={C.orange} strokeWidth={4} />
        <T x={1300} y={900} size={34} weight={700}>implantable</T>
      </g>
      <Tag start={at(3, 0.2)} x={960} y={250} color={C.blue} filled text="conductive when tiny → the sensor shrinks" />
    </Stage>
  );
};

/* ---------- 4. three transducers ---------- */
const Transducers: React.FC = () => {
  const {f, at} = useScene();
  const trap = prog(f, at(4), 18);
  const X = [420, 960, 1500];
  const lvl = prog(f, at(2, 0.2), 40);
  const glow = prog(f, at(3, 0.25), 20) * (0.75 + 0.25 * Math.sin(f / 4));
  return (
    <Stage>
      <StageHeading start={at(0)} text="Memorize three transducers" />
      <Tag start={at(0, 0.6)} x={960} y={220} color={C.red} filled text="most probably asked" />
      <Card start={at(1)} x={X[0]} y={570} w={460} h={520} stroke={trap > 0.5 ? C.green : C.blue} sw={trap > 0.5 ? 8 : 4}>
        <Meter x={0} y={-80} v={prog(f, at(1, 0.3), 40) * 0.8} label="current" />
        <T y={110} size={40} weight={750} color={C.blue}>amperometric</T>
        <T y={160} size={28} color={C.mute} weight={550}>current ∝ bioreaction</T>
      </Card>
      <Card start={at(2)} x={X[1]} y={570} w={460} h={520} stroke={C.red}>
        <g transform="translate(-200 -305)"><Thermometer x={200} y={250} h={210} level={0.2 + lvl * 0.7} /></g>
        <T y={110} size={40} weight={750} color={C.red}>calorimetric</T>
        <T y={160} size={28} color={C.mute} weight={550}>thermal · heat in or out</T>
      </Card>
      <Card start={at(3)} x={X[2]} y={570} w={460} h={520} stroke={C.orange}>
        <circle cy={-100} r={60} fill="#f6d77a" opacity={0.3 + glow * 0.7} stroke={C.ink} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (k / 8) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 80} y1={-100 + Math.sin(a) * 80} x2={Math.cos(a) * (80 + 40 * glow)} y2={-100 + Math.sin(a) * (80 + 40 * glow)} stroke={C.orange} strokeWidth={6} strokeLinecap="round" />; })}
        <T y={110} size={40} weight={750} color={C.orange}>optical</T>
        <T y={160} size={28} color={C.mute} weight={550}>change in light intensity</T>
      </Card>
      {/* his wrong option */}
      <g opacity={trap}>
        <rect x={560} y={890} width={800} height={80} rx={40} fill="#f6d3c9" stroke={C.red} strokeWidth={4} />
        <T x={960} y={942} size={34} weight={700}><tspan textDecoration="line-through">"amperometric measures heat"</tspan></T>
      </g>
      <Mark start={at(4, 0.3)} x={1420} y={930} ok={false} size={56} />
      <Tag start={at(4, 0.65)} x={X[0]} y={250} color={C.green} filled text="it measures current" />
    </Stage>
  );
};

/* ---------- 5. performance parameters ---------- */
const Params: React.FC = () => {
  const {f, at} = useScene();
  const PX = [400, 960, 1520], PY = [395, 765];
  const traps = prog(f, at(6), 18);
  const panel = (i: number, line: number, title: string, color: string, body: React.ReactNode) => {
    const s = pop(f, at(line));
    return (
      <g key={i} transform={`translate(${PX[i % 3]} ${PY[Math.floor(i / 3)]}) scale(${s})`} opacity={Math.min(1, s) * (1 - traps * 0.92)}>
        <rect x={-260} y={-165} width={520} height={330} rx={22} fill={C.card} stroke={color} strokeWidth={4} />
        <T y={-118} size={34} weight={750} color={color}>{title}</T>
        {body}
      </g>
    );
  };
  const axes = <path d="M -200 120 L -200 -80 M -200 120 L 220 120" stroke={C.ink} strokeWidth={4} fill="none" opacity={0.6} />;
  const k = (start: number) => prog(f, start, 40, (t) => t);
  const sens = k(at(2, 0.3)), resp = k(at(3, 0.2)), lod = prog(f, at(4, 0.4), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Performance parameters" />
      {panel(0, 1, 'selectivity', C.blue, <g>
        {Array.from({length: 9}, (_, j) => <g key={j} transform={`translate(${-160 + (j % 5) * 80} ${-30 + Math.floor(j / 5) * 80})`}>{j === 6 ? <polygon points="-22,-18 22,-18 0,16" fill={C.orange} /> : <circle r={18} fill={j % 2 ? C.purple : C.teal} opacity={0.5} />}</g>)}
        <circle cx={-80} cy={50} r={44} fill="none" stroke={C.orange} strokeWidth={5} opacity={prog(f, at(1, 0.5), 14)} />
        <T y={145} size={24} color={C.mute} weight={550}>the target among interfering species</T>
      </g>)}
      {panel(1, 2, 'sensitivity', C.teal, <g>{axes}
        <line x1={-200} y1={120} x2={mix(-200, 40, sens)} y2={mix(120, -80, sens)} stroke={C.teal} strokeWidth={7} strokeLinecap="round" />
        <line x1={-200} y1={120} x2={mix(-200, 210, sens)} y2={mix(120, 40, sens)} stroke={C.mute} strokeWidth={5} strokeDasharray="10 8" />
        <T x={10} y={150} size={22} color={C.mute} weight={550}>concentration</T>
        <T x={120} y={-50} size={24} color={C.teal} weight={650}>steep = sensitive</T>
      </g>)}
      {panel(2, 3, 'response time', C.orange, <g>{axes}
        <path d={Array.from({length: 41}, (_, j) => `${j ? 'L' : 'M'} ${-200 + j * 10 * resp} ${120 - 170 * (1 - Math.exp(-j / 7))}`).join(' ')} stroke={C.orange} strokeWidth={6} fill="none" />
        <line x1={-60} x2={-60} y1={-80} y2={120} stroke={C.ink} strokeWidth={3} strokeDasharray="8 6" opacity={prog(f, at(3, 0.6), 12)} />
        <T x={10} y={150} size={22} color={C.mute} weight={550}>time until it settles</T>
      </g>)}
      {panel(3, 4, 'limit of detection', C.red, <g>{axes}
        <line x1={-200} y1={60} x2={220} y2={60} stroke={C.red} strokeWidth={4} strokeDasharray="10 8" />
        <T x={210} y={50} size={22} color={C.red} weight={650} anchor="end">minimum detectable</T>
        <g transform={`translate(0 ${-lod * 50})`}><Arrow start={at(4, 0.6)} x1={-120} y1={20} x2={-120} y2={100} color={C.green} /></g>
        <T x={-20} y={150} size={24} color={C.green} weight={650} o={prog(f, at(4, 0.6), 12)}>lower is better</T>
      </g>)}
      {panel(4, 5, 'accuracy · durability', C.purple, <g>
        {Array.from({length: 7}, (_, j) => <circle key={j} cx={-110 + (random(`d${j}`) - 0.5) * 30} cy={(random(`e${j}`) - 0.5) * 30} r={9} fill={C.purple} />)}
        <circle cx={-110} r={50} fill="none" stroke={C.purple} strokeWidth={3} />
        <T x={-110} y={95} size={22} color={C.mute} weight={550}>reproducible</T>
        <path d="M 30 0 L 210 0" stroke={C.purple} strokeWidth={6} />
        <T x={120} y={95} size={22} color={C.mute} weight={550}>signal kept over time</T>
      </g>)}
      {/* traps */}
      <g opacity={traps}>
        {[['"selectivity = how sharply the signal changes"', 'that is sensitivity', 430], ['"limit of detection = maximum"', 'it is the minimum', 680]].map(([bad, good, y], i) => (
          <g key={i}>
            <rect x={300} y={(y as number) - 50} width={1320} height={100} rx={50} fill="#f6d3c9" stroke={C.red} strokeWidth={4} />
            <T x={360} y={(y as number) + 12} size={32} weight={650} anchor="start">{bad}</T>
            <T x={1580} y={(y as number) + 12} size={32} weight={750} anchor="end" color={C.green} o={prog(f, at(6, 0.3 + i * 0.4), 14)}>→ {good}</T>
          </g>
        ))}
      </g>
      <Mark start={at(6, 0.2)} x={240} y={430} ok={false} size={50} />
      <Mark start={at(6, 0.6)} x={240} y={680} ok={false} size={50} />
    </Stage>
  );
};

export const L7Scenes: Record<string, React.FC> = {build: Build, parts: Parts, nano: Nano, transducers: Transducers, params: Params};
