/* ENS010 Lecture 6 · Imaging techniques. Narration: src/scripts/ens010-L6.json */
import React from 'react';
import {random} from 'remotion';
import {Arrow, Atom, Body, C, Card, Draw, FONT, Mark, mix, mixColor, pop, prog, Rise, Stage, StageHeading, sup, T, Tag, useScene} from '../lib';

const sine = (x0: number, x1: number, y: number, amp: number, period: number, phase = 0) => {
  let d = `M ${x0} ${y}`;
  for (let x = x0; x <= x1; x += 6) d += ` L ${x} ${y + Math.sin((x - x0) / period * Math.PI * 2 + phase) * amp}`;
  return d;
};

/* ---------- 1. no technique is perfect ---------- */
const Intro: React.FC = () => {
  const {f, at} = useScene();
  const tech: [string, boolean][] = [['MRI', true], ['Ultrasound', true], ['Optical', true], ['CT', false], ['PET', false], ['SPECT', false]];
  const split = prog(f, at(1, 0.15), 24);
  const qs = prog(f, at(2), 20);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Imaging techniques" />
      <g opacity={1 - qs * 0.75} transform={`translate(0 ${-qs * 120})`}>
        {tech.map(([n, safe], i) => {
          const x = 330 + i * 252 + (safe ? -split * 60 : split * 60);
          return (
            <Card key={n} start={at(0, 0.2 + i * 0.08)} x={x} y={430} w={220} h={120} stroke={split > 0.5 ? (safe ? C.teal : C.red) : C.line}>
              <T y={12} size={34} weight={700}>{n}</T>
            </Card>
          );
        })}
        <Tag start={at(1, 0.3)} x={520} y={580} color={C.teal} text="safe, but less sharp or sensitive" />
        <Tag start={at(1, 0.65)} x={1400} y={580} color={C.red} text="deep or sharp, but radiation" />
      </g>
      {['How does it work?', 'Is it invasive?', 'How do nanoparticles help?'].map((q, i) => (
        <Card key={q} start={at(2, 0.15 + i * 0.25)} x={420 + i * 540} y={720} w={480} h={150} stroke={C.blue} sw={5}>
          <circle cx={-190} cy={-40} r={26} fill={C.blue} />
          <T x={-190} y={-30} size={30} color="#fff" weight={750}>{i + 1}</T>
          <T y={20} size={34} weight={650}>{q}</T>
        </Card>
      ))}
    </Stage>
  );
};

/* ---------- 2. MRI: protons, magnet, RF pulse, relaxation, coil, image ---------- */
const Mri: React.FC = () => {
  const {f, at} = useScene();
  const align = prog(f, at(1, 0.2), 30), tip = prog(f, at(2, 0.3), 20), relax = prog(f, at(3, 0.15), 40);
  const pulseOn = at(2), pulseOff = at(3);
  const coil = prog(f, at(4), 18), img = prog(f, at(5), 22);
  const shift = prog(f, at(4), 26);
  const ox = mix(620, 520, shift);
  const protons = Array.from({length: 20}, (_, i) => {
    const c = i % 5, r = Math.floor(i / 5);
    const rand = random(`p${i}`) * 360 + f * (2 + random(`s${i}`) * 3) * (1 - align);
    const target = -90 + 90 * tip * (1 - relax) + Math.sin(f / 3 + i) * 8 * (1 - align) * 0;
    const ang = mix(rand, target, align);
    return {x: ox - 300 + c * 150, y: 380 + r * 140, ang};
  });
  const emitting = f > at(3, 0.15) && f < at(5);
  return (
    <Stage>
      <StageHeading start={at(0)} text="MRI" />
      {/* magnet */}
      <g opacity={prog(f, at(1), 18)}>
        <rect x={ox - 470} y={300} width={70} height={560} rx={14} fill={C.red} />
        <rect x={ox + 400} y={300} width={70} height={560} rx={14} fill={C.blue} />
        <T x={ox - 435} y={590} size={40} color="#fff" weight={800}>N</T>
        <T x={ox + 435} y={590} size={40} color="#fff" weight={800}>S</T>
        <Rise start={at(1, 0.1)} x={ox} y={960} size={30} color={C.mute} weight={500}>strong magnetic field lines them up</Rise>
      </g>
      {/* RF pulse */}
      <g opacity={prog(f, pulseOn, 10) * (1 - prog(f, pulseOff, 10))}>
        <path d={sine(ox - 380, ox + 380, 300, 26, 70, -f / 2)} stroke={C.orange} strokeWidth={6} fill="none" />
        <Tag start={pulseOn + 6} x={ox} y={250} color={C.orange} filled text="radio-frequency pulse" />
      </g>
      {protons.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          {emitting && [0, 1].map((k) => {
            const t = ((f - at(3, 0.15) + k * 15 + i * 3) % 30) / 30;
            return <circle key={k} r={30 + t * 60} fill="none" stroke={C.orange} strokeWidth={3} opacity={(1 - t) * 0.6 * (1 - prog(f, at(4, 0.6), 20))} />;
          })}
          <circle r={34} fill={C.card} stroke={C.ink} strokeOpacity={0.3} strokeWidth={3} />
          <g transform={`rotate(${p.ang})`}>
            <line x1={-24} x2={22} y1={0} y2={0} stroke={C.blue} strokeWidth={7} strokeLinecap="round" />
            <polygon points="34,0 18,-11 18,11" fill={C.blue} />
          </g>
          <T y={8} size={20} weight={750} color={C.ink} o={0.5}>{sup('H^+')}</T>
        </g>
      ))}
      <Rise start={at(0, 0.3)} x={ox} y={330} size={30} color={C.mute} weight={500} out={at(1)}>hydrogen protons in tissue water: random</Rise>
      <Tag start={at(3, 0.3)} x={ox} y={250} color={C.orange} text="realign → release energy" out={at(4, 0.5)} />
      {/* coil + signal */}
      <g opacity={coil}>
        {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={1330 + k * 22} cy={560} rx={30} ry={120} fill="none" stroke={C.brown} strokeWidth={8} />)}
        <T x={1360} y={730} size={30} weight={650}>coil</T>
        <Draw start={at(4, 0.2)} dur={30} d={sine(1180, 1520, 860, 40, 60).replace(/ L (\d+(?:\.\d+)?) ([\d.-]+)/g, (_m, x, y) => ` L ${x} ${860 + (Number(y) - 860) * Math.exp(-(Number(x) - 1180) / 200)}`)} color={C.orange} w={5} />
        <Rise start={at(4, 0.4)} x={1350} y={960} size={28} color={C.mute} weight={500}>each tissue releases a different amount</Rise>
      </g>
      {/* computer image */}
      <g opacity={img} transform={`translate(${mix(1900, 1640, img)} 520)`}>
        <rect x={-150} y={-130} width={300} height={230} rx={14} fill={C.ink} />
        <ellipse cx={0} cy={-15} rx={100} ry={85} fill="#777" /><ellipse cx={0} cy={-15} rx={80} ry={66} fill="#aaa" />
        <ellipse cx={-30} cy={-25} rx={22} ry={30} fill="#555" /><ellipse cx={32} cy={-25} rx={22} ry={30} fill="#555" />
        <rect x={-20} y={100} width={40} height={40} fill={C.ink} /><rect x={-80} y={138} width={160} height={14} rx={7} fill={C.ink} />
      </g>
      <Tag start={at(5, 0.5)} x={1640} y={800} color={C.teal} filled text="non-invasive" />
    </Stage>
  );
};

/* ---------- 3. nanoparticles in MRI: two roles ---------- */
const MriNano: React.FC = () => {
  const {f, at} = useScene();
  const partB = prog(f, at(2) + 16, 20);
  const spread = prog(f, at(1, 0.3), 50);
  const gd = Array.from({length: 40}, (_, i) => {
    const a = random(`ga${i}`) * Math.PI * 2, r = random(`gr${i}`);
    return {x: 960 + Math.cos(a) * r * 140 * spread + (random(`gx${i}`) - 0.5) * 30, y: 560 + Math.sin(a) * r * 300 * spread - 60 * (1 - spread) + (random(`gy${i}`) - 0.5) * 30};
  });
  // role 2: capsule built in four steps
  const steps = ['encapsulate', 'stabilize', 'coat (polymer)', 'target'];
  const st = (i: number) => prog(f, at(3, 0.08 + i * 0.2), 16);
  const dock = prog(f, at(3, 0.75), 30);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Nanoparticles in MRI" />
      <g opacity={1 - partB}>
        <Rise start={at(0, 0.2)} x={960} y={250} size={34} color={C.mute} weight={500}>low sensitivity → contrast agents</Rise>
        <Body x={960} y={560} s={0.82} o={prog(f, at(0, 0.4), 18)} />
        {gd.map((g, i) => (
          <g key={i} opacity={prog(f, at(1, 0.05), 14)}>
            <circle cx={g.x} cy={g.y} r={13} fill={C.green} stroke={C.ink} strokeOpacity={0.3} />
          </g>
        ))}
        <Tag start={at(1, 0.05)} x={1340} y={360} color={C.green} filled text="gadolinium (Gd)" />
        <Tag start={at(1, 0.35)} x={560} y={460} color={C.red} text="toxic" />
        <Tag start={at(1, 0.6)} x={560} y={560} color={C.red} text="spreads everywhere" />
      </g>
      <g opacity={partB}>
        {/* role 1 */}
        <rect x={140} y={230} width={760} height={720} rx={26} fill={C.card} stroke={C.blue} strokeWidth={5} />
        <T x={520} y={300} size={38} weight={750} color={C.blue}>1 · magnetic nanoparticles</T>
        <T x={520} y={350} size={30} color={C.mute} weight={550}>SPIO: superparamagnetic iron oxide</T>
        {[0, 1, 2].map((k) => <ellipse key={k} cx={520} cy={600} rx={120 + k * 55} ry={60 + k * 40} fill="none" stroke={C.blue} strokeWidth={3} strokeDasharray="10 10" strokeDashoffset={-f * 1.5} opacity={0.5} />)}
        <circle cx={520} cy={600} r={70} fill="#7b4a2e" stroke={C.ink} strokeOpacity={0.4} strokeWidth={4} />
        <rect x={470} y={590} width={50} height={22} fill={C.red} /><rect x={520} y={590} width={50} height={22} fill={C.blue} />
        <Tag start={at(2, 0.6) + 16} x={520} y={860} color={C.teal} filled text="biocompatible contrast agent" />
        {/* role 2 */}
        <rect x={1020} y={230} width={760} height={720} rx={26} fill={C.card} stroke={C.orange} strokeWidth={5} />
        <T x={1400} y={300} size={38} weight={750} color={C.orange} o={prog(f, at(3), 14)}>2 · a nanocarrier for the agent</T>
        <g transform={`translate(${1320 + dock * 190} 590)`} opacity={prog(f, at(3), 14)}>
          {[[-30, -20], [25, -30], [0, 25], [-35, 30], [35, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} fill={C.green} />)}
          <circle r={85} fill="none" stroke={C.orange} strokeWidth={8 * st(0)} opacity={st(0)} />
          <circle r={85} fill={C.orange} opacity={0.12 * st(1)} />
          <circle r={102} fill="none" stroke={C.teal} strokeWidth={10} strokeDasharray="6 8" opacity={st(2)} />
          {[0, 1, 2, 3, 4, 5].map((k) => { const a = (k / 6) * Math.PI * 2; return <g key={k} opacity={st(3)} transform={`rotate(${(a * 180) / Math.PI}) translate(112 0)`}><path d="M 0 0 L 22 0 M 22 0 L 36 -12 M 22 0 L 36 12" stroke={C.purple} strokeWidth={6} fill="none" strokeLinecap="round" /></g>; })}
        </g>
        <g opacity={prog(f, at(3, 0.7), 14)}>
          <path d="M 1680 470 Q 1600 590 1680 710 L 1760 710 L 1760 470 Z" fill={C.red} opacity={0.75} />
          <T x={1720} y={760} size={26} color={C.red} weight={650}>target</T>
        </g>
        {steps.map((s, i) => (
          <g key={s} opacity={st(i)} transform={`translate(${1150 + (i % 2) * 300} ${800 + Math.floor(i / 2) * 64})`}>
            <rect x={-130} y={-26} width={260} height={52} rx={26} fill={C.soft} />
            <T y={9} size={27} weight={650}>{s}</T>
          </g>
        ))}
      </g>
      <g opacity={prog(f, at(4), 18)}>
        <rect x={420} y={985} width={1080} height={70} rx={35} fill={C.ink} />
        <T x={960} y={1032} size={34} color="#fff" weight={700}>after any change: keep the magnetic properties</T>
      </g>
    </Stage>
  );
};

/* ---------- 4. PET and SPECT ---------- */
const Pet: React.FC = () => {
  const {f, at} = useScene();
  const ring = (cx: number, cy: number, R: number, lit: number[], o: number) => (
    <g opacity={o}>
      {Array.from({length: 36}, (_, i) => {
        const a = (i / 36) * 360;
        const on = lit.some((l) => Math.abs(((a - l + 540) % 360) - 180) < 8);
        return <rect key={i} x={R - 14} y={-14} width={34} height={28} rx={5} fill={on ? C.orange : C.soft} stroke={C.ink} strokeOpacity={0.25} transform={`translate(${cx} ${cy}) rotate(${a})`} />;
      })}
    </g>
  );
  const p2 = prog(f, at(4) + 16, 20);
  // PET: positron leaves the nucleus, meets an electron, two gammas fly out opposite
  const pcx = 560, pcy = 580;
  const pos = prog(f, at(1, 0.3), 26), meet = prog(f, at(2, 0.05), 16), gam = prog(f, at(2, 0.3), 30);
  const ang = -25 * (Math.PI / 180);
  const mx = pcx + 70, my = pcy - 20;
  const scx = 1380, scy = 580, sg = prog(f, at(3, 0.35), 30);
  const sites = Array.from({length: 24}, (_, i) => ({x: 960 + (random(`bx${i}`) - 0.5) * 240, y: 520 + (random(`by${i}`) - 0.5) * 520}));
  const targeted = prog(f, at(4, 0.5), 24);
  return (
    <Stage>
      <StageHeading start={at(0)} text="PET and SPECT" />
      <g opacity={1 - p2}>
        <Tag start={at(0, 0.35)} x={760} y={230} color={C.red} filled text="gamma rays → invasive" />
        <Tag start={at(0, 0.65)} x={1160} y={230} color={C.mute} text="expensive" />
        {/* PET */}
        <T x={pcx} y={330} size={40} weight={750} color={C.blue} o={prog(f, at(1), 14)}>PET</T>
        {ring(pcx, pcy, 230, gam > 0.95 ? [ang * 180 / Math.PI, ang * 180 / Math.PI + 180] : [], prog(f, at(1), 16))}
        <g opacity={prog(f, at(1), 14)}>
          <circle cx={pcx - 30} cy={pcy + 20} r={26} fill={C.teal} />
          <T x={pcx - 30} y={pcy + 80} size={24} color={C.teal} weight={650}>F-18</T>
        </g>
        {meet < 1 && <g opacity={prog(f, at(1, 0.3), 8)}>
          <circle cx={mix(pcx - 30, mx, pos)} cy={mix(pcy + 20, my, pos)} r={14} fill={C.orange} />
          <T x={mix(pcx - 30, mx, pos)} y={mix(pcy + 20, my, pos) - 22} size={22} weight={700} color={C.orange}>{sup('e^+')}</T>
          <circle cx={mix(pcx + 170, mx, meet)} cy={mix(pcy - 120, my, meet)} r={14} fill={C.blue} opacity={prog(f, at(2), 10)} />
        </g>}
        <circle cx={mx} cy={my} r={20 + 50 * prog(f, at(2, 0.1), 10)} fill={C.orange} opacity={(1 - prog(f, at(2, 0.2), 14)) * (meet > 0.95 ? 0.8 : 0)} />
        {gam > 0 && [0, 1].map((k) => {
          const a = ang + k * Math.PI, d = gam * 215;
          return <path key={k} d={sine(0, d, 0, 8, 26)} transform={`translate(${mx} ${my}) rotate(${(a * 180) / Math.PI})`} stroke={C.red} strokeWidth={5} fill="none" />;
        })}
        <Tag start={at(2, 0.55)} x={pcx} y={890} color={C.red} text="2 × 511 keV, opposite" />
        {/* SPECT */}
        <T x={scx} y={330} size={40} weight={750} color={C.purple} o={prog(f, at(3), 14)}>SPECT</T>
        <g opacity={prog(f, at(3), 16)}>
          <rect x={scx - 170} y={370} width={340} height={56} rx={10} fill={C.soft} stroke={C.ink} strokeOpacity={0.3} strokeWidth={3} />
          <rect x={scx - 170} y={370} width={340} height={56} rx={10} fill={C.orange} opacity={sg > 0.95 ? 0.7 : 0} />
          <T x={scx} y={408} size={24} weight={650}>gamma camera</T>
          <circle cx={scx} cy={scy + 120} r={28} fill={C.purple} />
          <T x={scx} y={scy + 190} size={24} color={C.purple} weight={650}>Tc-99m</T>
          <path d={sine(0, sg * 230, 0, 8, 26)} transform={`translate(${scx} ${scy + 90}) rotate(-90)`} stroke={C.red} strokeWidth={5} fill="none" />
        </g>
        <Tag start={at(3, 0.5)} x={scx} y={890} color={C.red} text="1 × 141 keV, directly" />
        <Tag start={at(3, 0.7)} x={scx} y={960} color={C.mute} text="no positron, no electron" />
      </g>
      {/* nanoparticle carries the tracer to the target */}
      <g opacity={p2}>
        <Body x={960} y={560} s={0.82} />
        <circle cx={1000} cy={430} r={46} fill={C.red} opacity={0.7} />
        {sites.map((s, i) => (
          <circle key={i} cx={mix(s.x, 1000 + Math.cos(i) * 30, targeted)} cy={mix(s.y, 430 + Math.sin(i) * 30, targeted)} r={10 + 4 * Math.sin(f / 4 + i)} fill={C.orange} opacity={0.85} />
        ))}
        <Tag start={at(4, 0.1)} x={500} y={500} color={C.mute} text="free tracer: gamma everywhere" out={at(4, 0.5)} />
        <Tag start={at(4, 0.55)} x={1420} y={430} color={C.orange} filled text="nanoparticle → only the target" />
      </g>
    </Stage>
  );
};

/* ---------- 5. photoacoustic: the three steps ---------- */
const Pa: React.FC = () => {
  const {f, at} = useScene();
  const sx = 900, sy = 640;
  const laser = prog(f, at(1, 0.2), 14) * (1 - prog(f, at(2, 0.2), 14));
  const exc = prog(f, at(2, 0.1), 16), down = prog(f, at(2, 0.5), 16);
  const heat = prog(f, at(2, 0.55), 30);
  const exp = prog(f, at(3, 0.2), 10) * (1 - prog(f, at(4, 0.5), 20));
  const waves = f > at(3, 0.25);
  const end = prog(f, at(5) + 16, 20);
  const stepPill = (i: number, text: string, start: number) => {
    const s = pop(f, start);
    return (
      <g key={i} transform={`translate(${430 + i * 530} 240) scale(${s})`} opacity={Math.min(1, s)}>
        <rect x={-235} y={-38} width={470} height={76} rx={38} fill={C.card} stroke={C.orange} strokeWidth={4} />
        <circle cx={-195} r={26} fill={C.orange} /><T x={-195} y={10} size={30} color="#fff" weight={800}>{i + 1}</T>
        <T x={20} y={11} size={30} weight={650}>{text}</T>
      </g>
    );
  };
  return (
    <Stage>
      <StageHeading start={at(0)} text="Photoacoustic imaging" out={at(1)} />
      <Rise start={at(0, 0.15)} x={960} y={330} size={36} color={C.mute} weight={500} out={at(1)}>photo = light · acoustic = sound</Rise>
      <g opacity={1 - end}>
        {stepPill(0, 'laser pulse', at(1))}
        {stepPill(1, 'light → heat', at(2))}
        {stepPill(2, 'expansion → sound', at(3))}
        {/* tissue */}
        <rect x={420} y={430} width={960} height={460} rx={30} fill="#f2d4c4" stroke={C.ink} strokeOpacity={0.25} strokeWidth={4} opacity={prog(f, at(0, 0.5), 16)} />
        <circle cx={sx} cy={sy} r={70 * (1 + exp * 0.35)} fill={mixColor('#c9a227', C.red, heat)} opacity={0.25 + heat * 0.5} />
        <Atom x={sx} y={sy} r={30} fill="#e4b54a" o={prog(f, at(0, 0.6), 14)} />
        <T x={sx} y={sy + 105} size={26} color={C.mute} weight={550} o={prog(f, at(0, 0.6), 14) * (1 - prog(f, at(3), 14))}>gold nanoparticle</T>
        {/* laser */}
        <g opacity={prog(f, at(1), 14)}>
          <rect x={150} y={330} width={190} height={70} rx={12} fill={C.ink} transform="rotate(25 245 365)" />
          <T x={200} y={470} size={28} weight={650}>laser</T>
        </g>
        <line x1={330} y1={410} x2={sx - 30} y2={sy - 20} stroke={C.red} strokeWidth={14} opacity={laser} strokeLinecap="round" />
        {/* heat squiggles */}
        {[0, 1, 2].map((k) => <path key={k} d={`M ${sx - 40 + k * 40} ${sy - 50} q 12 -18 0 -36 q -12 -18 0 -36`} stroke={C.red} strokeWidth={5} fill="none" opacity={heat * (1 - exp) * (0.5 + 0.5 * Math.sin(f / 4 + k))} />)}
        {/* sound waves */}
        {waves && [0, 1, 2, 3].map((k) => {
          const t = ((f - at(3, 0.25) + k * 12) % 48) / 48;
          return <circle key={k} cx={sx} cy={sy} r={90 + t * 420} fill="none" stroke={C.blue} strokeWidth={6} opacity={(1 - t) * 0.7} />;
        })}
        {/* transducer */}
        <g opacity={prog(f, at(4), 14)}>
          <rect x={1420} y={560} width={110} height={160} rx={16} fill={C.blue} />
          <T x={1475} y={770} size={28} weight={650}>ultrasound</T>
          <T x={1475} y={805} size={28} weight={650}>transducer</T>
          <Draw start={at(4, 0.2)} d={sine(1560, 1840, 640, 50, 70).replace(/ L (\d+(?:\.\d+)?) ([\d.-]+)/g, (_m, x, y) => ` L ${x} ${640 + (Number(y) - 640) * Math.exp(-(Number(x) - 1560) / 120)}`)} color={C.blue} w={5} />
        </g>
        {/* energy inset for step 2 */}
        <g opacity={prog(f, at(2), 14) * (1 - prog(f, at(3, 0.2), 14))} transform="translate(1600 420)">
          <rect x={-150} y={-150} width={300} height={300} rx={20} fill={C.card} stroke={C.line} strokeWidth={4} />
          <line x1={-100} x2={100} y1={90} y2={90} stroke={C.ink} strokeWidth={5} />
          <line x1={-100} x2={100} y1={-60} y2={-60} stroke={C.ink} strokeWidth={5} strokeDasharray="12 8" />
          <T x={0} y={130} size={22} color={C.mute} weight={550}>ground state</T>
          <circle cx={0} cy={mix(90, -60, exc * (1 - down))} r={16} fill={C.blue} />
          <T x={0} y={-90} size={22} color={C.mute} weight={550}>excited</T>
        </g>
        <Tag start={at(4, 0.45)} x={960} y={960} color={C.blue} filled text="light in, sound out" />
      </g>
      {/* advantages and agents */}
      <g opacity={end}>
        {['anatomical', 'functional', 'molecular'].map((t, i) => <Card key={t} start={at(5, 0.05 + i * 0.1) + 16} x={480 + i * 480} y={330} w={400} h={110} stroke={C.blue}><T y={12} size={38} weight={700} color={C.blue}>{t}</T></Card>)}
        <Rise start={at(5, 0.3)} x={960} y={490} size={34} color={C.mute} weight={500}>contrast in one modality · several cm deep</Rise>
        <Rise start={at(5, 0.5)} x={960} y={620} size={36}>contrast agents: plasmonic nanoparticles</Rise>
        {[['gold', '#e4b54a'], ['silver', '#c9c9cf'], ['single-walled CNT', C.ink]].map(([t, c], i) => (
          <g key={t} opacity={prog(f, at(5, 0.6 + i * 0.1), 14)} transform={`translate(${520 + i * 440} 780)`}>
            {i < 2 ? <Atom x={0} y={0} r={46} fill={c} /> : <g>{[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={-90} x2={90} y1={-25 + k * 10} y2={-25 + k * 10} stroke={C.ink} strokeWidth={3} opacity={0.6} />)}<rect x={-90} y={-30} width={180} height={60} rx={30} fill="none" stroke={C.ink} strokeWidth={4} /></g>}
            <T y={100} size={32} weight={650}>{t}</T>
          </g>
        ))}
      </g>
    </Stage>
  );
};

/* ---------- 6. ultrasound and its bubbles ---------- */
const Us: React.FC = () => {
  const {f, at} = useScene();
  const p2 = prog(f, at(2) + 16, 20);
  const evo = prog(f, at(4), 20);
  const bubbles = Array.from({length: 7}, (_, i) => ({x: 300 + ((i * 220 + f * 2.2) % 1540), y: 600 + Math.sin(i * 2) * 50, r: 34 + random(`br${i}`) * 16}));
  const osc = prog(f, at(3), 14);
  return (
    <Stage>
      <StageHeading start={at(0)} text="Ultrasound" />
      <g opacity={1 - p2}>
        <rect x={360} y={420} width={700} height={560} rx={20} fill="#f2d4c4" opacity={prog(f, at(0, 0.1), 14)} />
        {/* probe */}
        <g opacity={prog(f, at(0, 0.1), 14)}><rect x={630} y={300} width={160} height={110} rx={20} fill={C.blue} /><T x={710} y={290} size={28} weight={650}>probe</T></g>
        {f > at(0, 0.3) && [0, 1, 2].map((k) => {
          const t = ((f - at(0, 0.3) + k * 20) % 60) / 60;
          return <path key={k} d={`M ${710 - 260} ${430 + t * 520} Q 710 ${470 + t * 560} ${710 + 260} ${430 + t * 520}`} fill="none" stroke={C.blue} strokeWidth={6} opacity={(1 - t) * 0.8} />;
        })}
        {/* echo strength vs depth */}
        <g opacity={prog(f, at(1), 16)}>
          <T x={1440} y={400} size={32} weight={650}>echo strength</T>
          {[0, 1, 2, 3, 4].map((k) => {
            const w = 380 * Math.exp(-k * 0.55) * prog(f, at(1, 0.1 + k * 0.1), 14);
            return <g key={k}><rect x={1250} y={460 + k * 100} width={w} height={60} rx={10} fill={C.blue} opacity={0.8} /><T x={1230} y={500 + k * 100} size={24} anchor="end" color={C.mute} weight={550}>{['skin', '', '', '', 'deep'][k]}</T></g>;
          })}
        </g>
        <Tag start={at(0, 0.6)} x={710} y={240} color={C.teal} filled text="sound only: non-invasive" />
        <Tag start={at(1, 0.6)} x={1440} y={980} color={C.red} text="deep tissue: weak echo" />
      </g>
      <g opacity={p2 * (1 - evo)}>
        <rect x={140} y={500} width={1640} height={200} rx={100} fill="#f6c9bd" stroke={C.red} strokeOpacity={0.5} strokeWidth={6} />
        <T x={960} y={470} size={30} color={C.red} weight={650}>blood vessel</T>
        {bubbles.map((b, i) => {
          const r = b.r * (1 + osc * 0.35 * Math.sin(f / 2.2 + i));
          return <g key={i}><circle cx={b.x} cy={b.y} r={r} fill="#eaf3f6" stroke={C.teal} strokeWidth={6} /><circle cx={b.x - r * 0.3} cy={b.y - r * 0.3} r={r * 0.25} fill="#fff" /></g>;
        })}
        <Tag start={at(2, 0.5) + 16} x={600} y={820} color={C.teal} text="gas core" />
        <Tag start={at(2, 0.6) + 16} x={900} y={820} color={C.teal} filled text="shell" />
        <Tag start={at(2, 0.75) + 16} x={1300} y={820} color={C.red} text="stays in the vessels" />
        <g opacity={osc}>
          <T x={960} y={330} size={40} weight={700}>expand · contract · <tspan fill={C.green}>no bursting</tspan></T>
          <Rise start={at(3, 0.45)} x={960} y={940} size={34} color={C.blue}>strong nonlinear echo → better signal-to-noise</Rise>
        </g>
      </g>
      <g opacity={evo}>
        <T x={960} y={330} size={40} weight={700}>how the shells evolved</T>
        {['no shell', 'protein', 'lipid', 'polymer', 'hybrid'].map((t, i) => {
          const s = pop(f, at(4, 0.1 + i * 0.13));
          return (
            <g key={t} transform={`translate(${360 + i * 300} 600) scale(${s})`} opacity={Math.min(1, s)}>
              <circle r={70} fill="#eaf3f6" stroke={[C.line, C.orange, C.teal, C.blue, C.purple][i]} strokeWidth={i ? 12 : 2} strokeDasharray={i ? undefined : '6 8'} />
              <T y={130} size={32} weight={650}>{t}</T>
              {i === 0 && <T y={175} size={26} color={C.red} weight={600}>bursts easily</T>}
              {i < 4 && <path d="M 100 0 L 190 0" stroke={C.mute} strokeWidth={4} transform="translate(0 0)" />}
            </g>
          );
        })}
      </g>
    </Stage>
  );
};

/* ---------- 7. multimodal: CT + SPECT ---------- */
const Multi: React.FC = () => {
  const {f, at} = useScene();
  const merge = prog(f, at(3), 30);
  const ctX = mix(560, 960, merge), spX = mix(1360, 960, merge);
  const ct = (
    <g>
      <rect x={-230} y={-230} width={460} height={460} rx={20} fill={C.ink} />
      <ellipse rx={170} ry={190} fill="#555" />
      {[-120, -70, -20, 30, 80].map((y) => <path key={y} d={`M -150 ${y} Q 0 ${y + 40} 150 ${y}`} stroke="#ddd" strokeWidth={10} fill="none" />)}
      <rect x={-12} y={-180} width={24} height={360} fill="#eee" />
    </g>
  );
  const spect = (
    <g>
      <rect x={-230} y={-230} width={460} height={460} rx={20} fill={C.ink} opacity={1 - merge} />
      {[[-40, -40, 70], [60, 20, 50], [-60, 90, 40]].map(([x, y, r], i) => (
        <g key={i}><circle cx={x} cy={y} r={r * (1 + 0.06 * Math.sin(f / 5 + i))} fill={C.red} opacity={0.55} /><circle cx={x} cy={y} r={r * 0.55} fill={C.orange} opacity={0.8} /><circle cx={x} cy={y} r={r * 0.2} fill="#ffe680" /></g>
      ))}
    </g>
  );
  return (
    <Stage>
      <StageHeading start={at(0)} text="Multimodal imaging" />
      <Rise start={at(0, 0.3)} x={960} y={250} size={32} color={C.mute} weight={500} out={at(3)}>two techniques in one hybrid scan</Rise>
      <g transform={`translate(${ctX} 580) scale(${pop(f, at(1))})`}>{ct}</g>
      <g transform={`translate(${spX} 580) scale(${pop(f, at(2))})`} style={{mixBlendMode: merge > 0 ? 'screen' : 'normal'}}>{spect}</g>
      <g opacity={1 - merge}>
        <Rise start={at(1, 0.2)} x={560} y={880} size={36} color={C.ink}>CT: anatomy</Rise>
        <Rise start={at(2, 0.2)} x={1360} y={880} size={36} color={C.red}>SPECT: function</Rise>
      </g>
      <Rise start={at(3, 0.3)} x={960} y={880} size={42} color={C.blue}>SPECT/CT</Rise>
      <Tag start={at(3, 0.55)} x={960} y={960} color={C.green} filled text="+ nano contrast agents → best diagnosis" />
    </Stage>
  );
};

export const L6Scenes: Record<string, React.FC> = {intro: Intro, mri: Mri, mrinano: MriNano, pet: Pet, pa: Pa, us: Us, multi: Multi};
