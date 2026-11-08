/* ENS010 guided lessons — teach each lecture from zero, in order, linking to the labs.
 * Based on Assoc. Prof. Zarrabi's slides and recorded lectures (materials/ENS010/). Format: see assets/js/learn.js.
 * "Exam" callouts mark the places where the lecturer said "I may ask you this in the midterm".
 */
window.GUIDE = {
  /* ================================================================ */
  1: {
    goal: 'Know how ENS010 is graded, what the exams look like and what they are (and are not) based on, so you study the right things.',
    time: '≈ 10 min',
    videos: [
      ['a first look at nanotechnology', 'what is nanotechnology explained simply'],
    ],
    steps: [
      {
        t: 'What this course is about',
        key: 'ENS010 explains why materials behave differently when they are <b>1–100 nm</b> small, and how that is used, mainly in <b>health</b>.',
        fig: { type: 'flow', t: 'The 14-week plan', items: [['', 'Weeks 1–4', 'what nano is, why size matters, classification', 'c0'], ['', 'Weeks 5–7', 'health: prevention, diagnosis (imaging, biosensors)', 'c1'], ['', 'Week 8', 'midterm', 'c4'], ['', 'Weeks 9–14', 'treatment, polymeric, lipid, carbon NPs, synthesis, characterization', 'c3']] },
        html: `
<p>The lecturer, <b>Assoc. Prof. Ali Zarrabi</b> (Biomedical Engineering), describes the aim like this: learn the principles of <b>nanoscience and nanotechnology</b>, the unique <b>mechanical, physico-chemical, electrical, optical and magnetic</b> properties that appear when size is reduced, and then the <b>synthesis, characterization and applications</b> of nanomaterials.</p>
<p>It is a faculty elective for every department, so it assumes no physics or chemistry background. Every lecture builds on one idea: <i>at the nano scale, size changes properties</i>.</p>`,
      },
      {
        t: 'How you are graded and what the exams look like',
        key: '<b>Midterm 50% + final 50%.</b> Mostly multiple choice plus <b>one or two written questions</b>, only from the <b>slides and what he says</b> in the recordings.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Asked', pts: ['the slide text', 'what he explains in the recording', 'definitions and procedures he flagged'], c: 'c1' }, { icon: '', t: 'Not asked', pts: ['the short videos shown in class', 'history dates', 'which size gives which colour', 'the textbooks'], c: 'c4' }] },
        html: `
<table class="t">
  <tr><th>Item</th><th>What he said</th></tr>
  <tr><td>Grading</td><td>Midterm 50%, final 50%. No homework, project or presentation (more than 100 students, online).</td></tr>
  <tr><td>Where</td><td>On campus for both exams. Date and room are announced on OIS.</td></tr>
  <tr><td>Format</td><td>"If it is 8 questions, you may have six multiple choice and two classical." The written ones ask you to <b>define</b> something or <b>describe a procedure</b>.</td></tr>
  <tr><td>Source</td><td>"Nothing from outside the slides and nothing from outside what I told you in the recorded videos." The short videos are never examined.</td></tr>
  <tr><td>Final</td><td>Normally covers only the lectures after the midterm.</td></tr>
</table>
<div class="callout warn"><b>How to use this site:</b> every place where he said "I may ask you this" is marked with an <b>Exam</b> box in the lessons. In lecture 7 he told students to re-listen for exactly those parts. The <a href="ozet.html">midterm summary</a> collects them all on one page.</div>`,
        check: { q: 'Which of these can appear in the ENS010 midterm?', o: ['The definitions and procedures from the slides and the recorded explanations', 'Questions about the short videos shown in class', 'Exact dates from the history of nanotechnology', 'Chapters of the optional textbooks'], why: 'Lectures 1, 2, 5, 6, 7: only the slides and what he says; no videos, no dates.' },
      },
    ],
  },

  /* ================================================================ */
  2: {
    goal: 'Explain why nano matters (convergent science), use the nano prefix and convert nm, µm and Å, tell nanoscience from nanotechnology, and explain what history and the S-curve tell us.',
    time: '≈ 40 min',
    videos: [
      ['how small is a nanometer', 'how small is a nanometer scale of the universe'],
      ['Feynman "plenty of room at the bottom"', 'Feynman there is plenty of room at the bottom explained'],
      ['the Lycurgus cup and gold nanoparticle colours', 'Lycurgus cup gold nanoparticles color'],
    ],
    steps: [
      {
        t: 'Why learn nano at all: convergent science and technology',
        key: 'Almost every new technology falls under four converging areas, <b>Nano, Bio, Info, Cogno</b>. Together they aim at <b>enhancing human performance</b>.',
        fig: { type: 'compare', t: 'NBIC: the four converging areas (slide 5)', cols: [{ icon: '', t: 'Nano', pts: ['atoms'], c: 'c2' }, { icon: '', t: 'Bio', pts: ['genes, cells'], c: 'c4' }, { icon: '', t: 'Info', pts: ['bits'], c: 'c1' }, { icon: '', t: 'Cogno', pts: ['neurons'], c: 'c5' }], cap: 'Fields such as nanomedicine or neuro-nanomedicine combine two or more of them.' },
        html: `
<p>Slides 3–4 show a "science and technology explosion": internet, 3D printing, IoT, robotics, genomics, AI… It is hard to know which direction to choose. The lecturer's answer: look at <b>convergent science and technology</b>.</p>
<p>Whatever new field you take, it falls under at least one of four areas: <b>nanotechnology</b> (atoms, physics, chemistry), <b>biotechnology</b> (genes, cells), <b>information technology</b> (bits) and <b>cognitive science</b> (neurons, the brain). The four together define and <b>enhance human performance</b>, which is what the future is about. That is why nano is worth learning, whatever your major.</p>`,
        check: { q: 'What do the four convergent sciences (NBIC) aim at together?', o: ['Enhancing human performance', 'Replacing human workers with robots', 'Making computers faster', 'Lowering the price of medicine'], why: 'Slide 5 and Lecture 2.' },
      },
      {
        t: '"Nano" is just a prefix: 10⁻⁹',
        key: '<b>Nano = one billionth (10⁻⁹)</b>, from Greek <i>nanos</i>, dwarf. It works for any unit. <b>1 nm = 10⁻⁹ m = 10⁻³ µm = 10 Å.</b>',
        fig: { type: 'stack', t: 'Prefixes on slide 6', items: [['tera 10¹²', 'teras: monster', 'c4'], ['giga 10⁹', 'gigas: giant', 'c2'], ['mega 10⁶', 'megas: large', 'c1'], ['kilo 10³', 'chilioi: thousand', 'c5'], ['milli 10⁻³', 'milli: thousand', 'c0'], ['micro 10⁻⁶', 'mikros: small', 'c3'], ['nano 10⁻⁹', 'nanos: dwarf', 'c4']] },
        html: `
<p>"Nano" is not a material. It is a mathematical <b>prefix</b>, like kilo or milli, meaning <b>one billionth</b>. It can go in front of any unit: a <b>nanometer</b> is a billionth of a meter, a <b>nanosecond</b> a billionth of a second, a <b>nanogram</b> a billionth of a gram.</p>
<table class="t">
  <tr><th>Unit</th><th>In meters</th><th>Remember</th></tr>
  <tr><td>1 µm (micrometer)</td><td>10⁻⁶ m</td><td>= 1000 nm</td></tr>
  <tr><td><b>1 nm (nanometer)</b></td><td><b>10⁻⁹ m</b></td><td>= 10⁻⁶ mm = 10⁻³ µm</td></tr>
  <tr><td>1 Å (angstrom)</td><td>10⁻¹⁰ m</td><td>1 nm = 10 Å</td></tr>
</table>
<div class="callout"><b>The slide's exercise: 100 nm in µm and Å?</b> 100 nm × 10⁻³ = <b>0.1 µm</b>; 100 nm × 10 = <b>1000 Å</b>. To go to a bigger unit you divide (fewer of them); to a smaller unit you multiply.</div>`,
        lab: { href: 'l2/scale.html', todo: [
          'Type <b>100</b> nm and read it in µm and Å. Then try 1 µm, 0.5 nm and 2500 Å.',
          'On the ruler, find the <b>red band</b> of 1–100 nm. Which objects sit inside it?',
          'Click "Earth → football → fullerene" and follow the two shrinking steps of slide 7.',
        ] },
        check: { q: 'How much is 100 nm?', o: ['0.1 µm and 1000 Å', '10 µm and 100 Å', '0.01 µm and 10 Å', '1 µm and 10,000 Å'], why: '1 nm = 10⁻³ µm = 10 Å.' },
      },
      {
        t: 'How small is that? And why is it hard to work with?',
        key: 'Nanomaterials are the size of <b>proteins, DNA and viruses</b>. We cannot see or feel them, so we need special tools such as <b>electron and atomic-force microscopes</b>.',
        fig: { type: 'flow', t: 'Slide 7: two shrinking steps', items: [['', 'Earth', '1.27 × 10⁷ m', 'c0'], ['', '÷ 10 million', '', 'mute'], ['', 'Football', '0.22 m', 'c1'], ['', '÷ 1 billion', '', 'mute'], ['', 'Fullerene C60', '0.7 nm', 'c4']] },
        html: `
<p>Shrink the Earth's diameter ten million times and you get a football. Shrink the football a billion times and you get a <b>fullerene (C60)</b>, a nanomaterial of 0.7 nm. You can hold a football; you cannot see or feel a fullerene.</p>
<p>Slide 8 places nanomaterials (micelles, liposomes, dendrimers, gold nanoshells, quantum dots, polymers) on the same scale as <b>proteins, DNA and viruses</b>, between 1 and 100 nm.</p>
<p>Because we cannot see them, working with them needs advanced technology. Much of the progress in the field was building tools to see them: <b>atomic force microscopes, scanning tunnelling microscopes, scanning and transmission electron microscopes</b>.</p>`,
        check: { q: 'Nanomaterials such as liposomes and quantum dots are about the size of…', o: ['Proteins, DNA and viruses', 'Human cells and salt grains', 'Tennis balls', 'Grains of sand'], why: 'Slide 8.' },
      },
      {
        t: 'Nanoscience vs nanotechnology (an exam question he named)',
        key: '<b>Nanoscience = studying</b> at the nano-size level (theory). <b>Nanotechnology = creating and controlling</b> materials, devices and systems at 1–100 nm (practice, in the lab).',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'Nanoscience', pts: ['the study at the nano-size level', 'theory, on paper / computer', 'proves properties, derives formulas'], c: 'c0' }, { icon: '', t: 'Nanotechnology', pts: ['working at the molecular level, atom by atom', 'creating functional materials, devices, systems', 'controlling matter at 1–100 nm', 'exploiting the novel properties'], c: 'c2' }] },
        html: `
<p>Slide 9 gives the two definitions. In the lecture he put it simply: <b>if you work on paper or a computer to study, it is nanoscience; if you work in the lab to create and control, it is nanotechnology.</b></p>
<p>That is why institutes call themselves "Institute of <b>Nanoscience and Nanotechnology</b>": they want to say they do both, theory and experiment.</p>
<div class="callout warn"><b>Exam (Lecture 2):</b> "If I ask you in your midterm the differences between nanoscience and nanotechnology, you should remember this slide." If an option says <i>creation, controlling the properties, working in the lab</i>, it is <b>nanotechnology</b>. If it says <i>study</i>, it is <b>nanoscience</b>.</div>`,
        check: { q: '"Controlling matter on the 1–100 nm scale to create functional devices" defines…', o: ['Nanotechnology', 'Nanoscience', 'Classical physics', 'Convergent cognitive science'], why: 'Slide 9: creating and controlling = nanotechnology; studying = nanoscience.' },
      },
      {
        t: 'Nano is old: history in one picture',
        key: 'People used nanoparticles for <b>colour</b> for thousands of years without knowing. The lesson: at the nano scale, <b>size and shape change properties</b>.',
        fig: { type: 'boxes', t: 'Slide 10 (do not memorize the numbers)', head: ['Metal', 'Size / shape', 'Colour'], rows: [{ cells: [['Gold', 'c2'], ['25 nm sphere', 'mute'], ['red', 'c4']] }, { cells: [['Gold', 'c2'], ['50 nm sphere', 'mute'], ['green', 'c1']] }, { cells: [['Gold', 'c2'], ['100 nm sphere', 'mute'], ['orange', 'c2']] }, { cells: [['Silver', 'c5'], ['100 nm sphere', 'mute'], ['yellow', 'c2']] }, { cells: [['Silver', 'c5'], ['100 nm prism', 'mute'], ['reddish', 'c4']] }], cap: 'A gold ring, necklace or stone is always yellow. Only at the nano scale does size (and shape) change the colour.' },
        html: `
<ul>
  <li>Cave paintings and clays already contained nanomaterials.</li>
  <li>Ancient <b>Egyptians</b> used nanoparticles in <b>hair dye</b> and made <b>Egyptian blue</b> (nanosheets thinner than 5 nm).</li>
  <li>The Roman <b>Lycurgus cup</b> (British Museum) contains Au-Ag nanoparticles: it glows red when light passes through it.</li>
  <li>Medieval <b>stained glass</b> and ceramics got their colours from gold and silver nanoparticles, not paint.</li>
  <li>Modern era: <b>Richard Feynman's 1959 talk</b> "There's plenty of room at the bottom" (Caltech); later a Japanese scientist first used the word "nanotechnology"; then came the microscopes that let us see nanomaterials.</li>
</ul>
<p>Why the colours? Slide 10: with gold, a 25 nm sphere looks red, a 50 nm sphere green; with silver, the same 100 nm size looks yellow as a sphere and reddish as a prism. <b>Both size and shape</b> change the colour at the nano scale. Changing the size of a gold ring does not.</p>
<div class="callout"><b>He said:</b> "I will not ask anything about the history, the dates, the sizes." Learn the <i>idea</i> (nano size and shape change properties), not the numbers.</div>`,
        check: { q: 'What does the changing colour of gold nanoparticles show?', o: ['At the nano scale, size and shape change a material\'s properties', 'Gold is impure when it is small', 'Colour depends only on the element, never on size', 'Gold rings change colour when they are larger'], why: 'Lecture 2.' },
      },
      {
        t: 'Where nano is used, and where we stand: the S-curve',
        key: 'Nano is used in <b>almost every field</b>. On the <b>S-curve</b>, nanotechnology is at the <b>beginning of its rapid growth</b>, so it is not late to start.',
        fig: { type: 'plot', t: 'S-curve growth model (slide 17)', w: 520, h: 230, x: [0, 10], y: [0, 10], xl: 'time', yl: 'growth', lines: [{ pts: [[0, 0.4], [1, 0.6], [2, 1.2], [3, 2.5], [4, 4.6], [5, 6.8], [6, 8.4], [7, 9.2], [8, 9.6], [10, 9.8]], c: 'c0' }], pts: [[3.6, 3.6, 'c4', 'nanotech now']], texts: [[1, 1.8, 'slow start', 'mute'], [5.4, 5.2, 'rapid growth', 'mute'], [8.2, 8.6, 'saturation', 'mute']], cap: 'Textiles 1771–1853, railroad, automobile, computer… each era followed this shape. Nanotech started around 1997.' },
        html: `
<p><b>Applications (slide 16):</b> sensors, drug delivery and cancer treatment, bio-imaging, fuel cells, batteries and supercapacitors, solar energy, lasers and diodes, coatings, water purification, CO₂ capture, food. The reason it fits everywhere: nano does not only change colour, it changes <b>all</b> properties (optical, electrical, magnetic, biological…).</p>
<p><b>The S-curve growth model.</b> Every technology era grows in an S shape:</p>
<ol>
  <li><b>Slow start:</b> a few scientists have an idea but no funding; years pass with little growth.</li>
  <li><b>Rapid growth:</b> once someone invests and it works, many investors and parallel ideas flood in.</li>
  <li><b>Saturation:</b> nothing more to offer, or a new era takes the funding.</li>
</ol>
<p>Textiles, railroad, automobile and computer each had their S. Nanotechnology is at the <b>start of its rapid phase</b>, which is why the lecturer says it is "very on time" to learn it.</p>`,
        check: { q: 'According to the S-curve, where is nanotechnology now?', o: ['At the beginning of its rapid growth phase', 'Already saturated, like the automobile', 'Not started at all', 'Declining since the computer era'], why: 'Slide 17 and Lecture 2.' },
      },
    ],
  },

  /* ================================================================ */
  3: {
    goal: 'Explain why properties change below about 100 nm (surface-to-volume ratio, surface atoms), name the property categories with the right examples, explain catalytic activity, melting point, electrical, optical and biological changes, and give the definition of a nanomaterial.',
    time: '≈ 50 min',
    videos: [
      ['surface area to volume ratio of nanoparticles', 'nanoparticles surface area to volume ratio explained'],
      ['melting point depression of gold nanoparticles', 'melting point depression nanoparticles'],
      ['why nano gold is red', 'why are gold nanoparticles red surface plasmon'],
    ],
    steps: [
      {
        t: 'Bulk, micro, nano: breaking a material down',
        key: 'A <b>bulk material</b> is anything we can see and feel. Break it down to mm, then µm: still bulk-like. Only around <b>100 nm</b> do the properties start to change.',
        fig: { type: 'flow', t: 'Slide 3: particle size', items: [['', 'Bulk', 'powdery, granular, lumpy', 'c0'], ['', 'mm powder', 'still visible, still bulk', 'c5'], ['', 'Microparticles', 'invisible one by one', 'c1'], ['', 'Nanoparticles', 'properties change', 'c4']] },
        html: `
<p>Take a stone, a metal bracelet, even a liquid you can see: that is a <b>bulk material</b>. Hit it with a hammer and you get a millimeter powder. It is smaller, but you can still see and feel it, so it is still bulk.</p>
<p>Keep breaking it: <b>microparticles</b> (micrometers) cannot be seen one by one; you need equipment to work with them. Keep going and you reach <b>nanoparticles</b>.</p>
<p>The question on slide 3: <i>the surface area and the share of surface atoms increase as we shrink, but from where do the changes emerge, 1000 nm or 100 nm?</i> The answer of this lecture: <b>from about 100 nm</b>.</p>`,
      },
      {
        t: 'The key reason: surface atoms take over',
        key: 'Smaller particles have a much higher <b>surface area to volume ratio</b> (m²/m³). At the nano scale the share of <b>surface atoms</b> explodes, so <b>surface-related properties dominate</b> over bulk properties.',
        fig: { type: 'bars', t: 'Share of atoms at the surface (slide 5 table)', items: [['923 atoms', 39.2, 'c0', '39%'], ['561 atoms', 44.9, 'c0', '45%'], ['309 atoms', 52.4, 'c5', '52%'], ['147 atoms', 62.6, 'c1', '63%'], ['55 atoms', 76.4, 'c2', '76%'], ['13 atoms', 92.3, 'c4', '92%']], max: 100, cap: 'Smaller cluster → more of its atoms sit on the surface. He said the table itself is not examined; the trend is.' },
        html: `
<p>Picture a particle made of atoms. The atoms on the outside are <b>surface atoms</b>; the ones inside are <b>inner (bulk) atoms</b>. A big particle is almost all inside. Shrink it and a bigger and bigger fraction of its atoms are on the surface.</p>
<ul>
  <li>Nanomaterials have a very high <b>surface area to volume ratio</b>, unit <b>m²/m³</b>.</li>
  <li>As size decreases, the <b>percentage of atoms at the surface increases drastically</b>.</li>
  <li>So <b>surface-area-related properties</b> (reactivity, boiling point, melting point…) <b>begin to dominate over bulk properties</b> at the nano scale.</li>
</ul>
<p>From bulk to mm to µm the surface share grows, but not enough to dominate, so properties barely change. Below about 100 nm the surface atoms catch up with and then <b>outnumber</b> the inner atoms (the surface/inner ratio passes 1). That is where properties change, and why the nano range is <b>1–100 nm</b>.</p>`,
        lab: { href: 'l3/surface.html', todo: [
          'Start at the biggest cluster (7 shells, 923 atoms). Read the surface % and the surface/inner ratio.',
          'Remove shells one by one. At which step does the ratio of surface to inner atoms pass <b>1</b>?',
          'Switch to the melting-point chart and drag the gold particle size from 50 nm down to 2 nm.',
        ] },
        check: { q: 'Why do nanomaterials behave differently from the same bulk material?', o: ['Most of their atoms are at the surface, so surface-related properties dominate', 'They are made of different, lighter elements', 'Their atoms are physically smaller than normal atoms', 'They contain no atoms inside, only a surface'], why: 'Slide 4 and Lecture 3.' },
      },
      {
        t: 'Almost every property changes: know the categories',
        key: '<b>Physical</b> = melting point · <b>chemical</b> = reactivity · <b>electrical</b> = conductivity · <b>mechanical</b> = strength · <b>optical</b> = light emission (colour). Plus magnetic and biological.',
        fig: { type: 'boxes', t: 'Slide 5: categories and their examples', head: ['Category', 'Example on the slide'], rows: [{ cells: [['Physical', 'c0'], ['melting point', 'mute']] }, { cells: [['Chemical', 'c4'], ['reactivity (catalytic activity)', 'mute']] }, { cells: [['Electrical', 'c2'], ['conductivity', 'mute']] }, { cells: [['Mechanical', 'c5'], ['strength', 'mute']] }, { cells: [['Optical', 'c3'], ['light emission, colour', 'mute']] }] },
        html: `
<p>Slide 5: "almost all properties are affected when size decreases to nano". The five named categories each come with one example. He also mentioned magnetic and biological properties.</p>
<div class="callout warn"><b>Exam (Lecture 3):</b> "If I ask you about the physical properties, you should know that <b>reactivity is a chemical, not a physical property</b>. Conductivity is not a physical property. Light emission and strength are not physical properties. <b>Melting point is a physical property.</b> So the examples of each of these properties are important." Expect a "which is a physical property?" or "which pair is wrong?" question.</div>`,
        check: { q: 'Which of these is a PHYSICAL property in the lecture\'s list?', o: ['Melting point', 'Reactivity', 'Conductivity', 'Light emission'], why: 'Reactivity is chemical, conductivity electrical, light emission optical.' },
      },
      {
        t: 'Chemical: catalytic activity rises',
        key: 'Catalytic activity is <b>inversely proportional to the activation energy</b>. Smaller particles need less activation energy, so <b>nano catalysts are more active</b>.',
        fig: { type: 'flow', items: [['', 'Smaller particle', '', 'c0'], ['', 'More surface atoms', '', 'c5'], ['', 'Lower activation energy', '', 'c2'], ['', 'Higher catalytic activity', 'better catalyst', 'c1']] },
        html: `
<p>A <b>catalyst</b> is a very active material that speeds up other reactions. We want catalysts that start working with as little energy as possible (low <b>activation energy</b>).</p>
<ul>
  <li>The catalytic activity of nanoparticles depends on their <b>size and shape</b>.</li>
  <li>Catalytic activity is <b>inversely proportional</b> to the activation energy it needs.</li>
  <li>Shrinking the particle lowers the activation energy, so activity rises. Slide 6's graph: as size goes up, photocatalytic activity goes down.</li>
  <li>Nanoparticle catalysts matter for <b>petroleum processing, energy conversion and pollutant removal</b>.</li>
</ul>
<div class="callout"><b>His "million-dollar" example:</b> you do not need to invent a new catalyst. Take the catalyst a refinery already uses (gold, zinc, manganese…), offer it as <b>nanoparticles of the same material</b>, and the process becomes more efficient.</div>`,
        check: { q: 'How does catalytic activity relate to the activation energy?', o: ['Inversely: lower activation energy, higher activity', 'Directly: higher activation energy, higher activity', 'They are unrelated', 'Activity is zero when activation energy is low'], why: 'Slide 6.' },
      },
      {
        t: 'Physical: the melting point drops',
        key: 'Surface atoms have <b>fewer neighbours</b> (unsaturated bonds), need <b>less energy to move</b> and melt first. Nanoparticles are mostly surface, so their <b>melting point is lower</b>.',
        fig: { type: 'plot', t: 'Gold: melting point vs particle diameter (slide 7)', w: 520, h: 230, x: [0, 50], y: [200, 1100], xl: 'particle diameter (nm)', yl: '°C', lines: [{ pts: [[1.5, 250], [2, 420], [3, 610], [4, 730], [5, 800], [7, 880], [10, 940], [15, 990], [20, 1015], [30, 1035], [40, 1045], [50, 1050]], c: 'c2' }, { pts: [[0, 1064], [50, 1064]], c: 'mute', dash: true, label: 'bulk gold 1064 °C' }], cap: 'Shape of the curve only; he does not ask the numbers.' },
        html: `
<p><b>Melting point:</b> the temperature at which the atoms, ions or molecules have enough energy to overcome the forces that hold them in a fixed position in a solid.</p>
<p>Heat a particle with a flame. Which atoms feel the heat first? The <b>surface atoms</b>: they are the first barrier. And why do they move more easily? Look at a carbon lattice: an inner carbon is bonded to all its neighbours (<b>saturated</b>). A surface carbon has free, <b>unsaturated</b> bonds, so it is more reactive and more sensitive to heat. Once the surface atoms start to go, the whole particle melts.</p>
<p>Put it together: smaller particle → more surface atoms → melts at a lower temperature. Gold drops from about 1064 °C in bulk to a few hundred °C for particles of a few nanometers.</p>`,
        check: { q: 'Why do surface atoms need less energy to move than inner atoms?', o: ['They are in contact with fewer atoms (unsaturated bonds)', 'They are heavier than inner atoms', 'They are bonded to more neighbours', 'They are a different element'], why: 'Slide 7.' },
      },
      {
        t: 'Electrical: conductivity changes at the nano scale',
        key: 'Bulk graphite\'s conductivity ignores size and twisting; <b>carbon nanotubes</b> change with cross-section and twisting. <b>Nano wires</b> conduct at tiny sizes, which keeps chips shrinking.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'Bulk carbon (graphite)', pts: ['conductivity not influenced by size or twisting', 'thin normal wires: resistance rises, they heat up and burn'], c: 'c0' }, { icon: '', t: 'Carbon nanotubes', pts: ['conductivity changes with cross-section and twisting', 'MWCNT ≠ SWCNT of the same size', 'can be very conductive, even superconductive'], c: 'c2' }] },
        html: `
<p>We grew up knowing that metals conduct and wood does not, forever. At the nano scale even that can change: a resistant material can become conductive and the other way round.</p>
<ul>
  <li>The conductivity of a <b>bulk carbon</b> material (pencil graphite) is <b>not</b> influenced by its size or twisting.</li>
  <li>The conductivity of <b>carbon nanotubes</b> <b>is</b> modified by changes in cross-section and by twisting (shear forces). <b>Multi-walled (MWCNT)</b> and <b>single-walled (SWCNT)</b> nanotubes of the same dimensions conduct differently.</li>
  <li>Why it matters: making a copper wire thinner (to fit a phone) raises its <b>resistance</b>, so it heats up and can burn. Nano wires and nanotubes stay conductive at tiny diameters, so chips could keep shrinking.</li>
  <li><b>Solar:</b> nanostructured solar cells could convert sunlight more efficiently and be cheaper, using <b>print-like manufacturing</b> and <b>flexible rolls</b> instead of discrete panels.</li>
</ul>`,
        check: { q: 'Which statement about carbon nanotubes is on slide 8?', o: ['Their conductivity changes with cross-section and twisting, and MWCNTs differ from SWCNTs', 'They behave exactly like bulk graphite', 'They are always perfect insulators', 'Twisting has no effect on them'], why: 'Slide 8.' },
      },
      {
        t: 'Optical and biological: colour, and getting into cells',
        key: '<b>Optical:</b> bulk gold is yellow, nano gold red, because electrons cannot move freely. <b>Biological:</b> nanoparticles cross <b>biological barriers</b> and are more <b>biocompatible</b>, the most important application.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Optical (slide 9)', pts: ['bulk gold: yellow', 'nano gold: red', 'electrons not free to move as in bulk', 'so the particles react differently with light'], c: 'c4' }, { icon: '', t: 'Biological (slide 10)', pts: ['higher permeability: cell membranes, blood-brain barrier', 'higher biocompatibility', 'depends on size, curvature, shape, surface charge, functionalization'], c: 'c1' }] },
        html: `
<p><b>Optical.</b> In bulk gold the electrons move freely. In a nanoparticle they are confined, so the particle interacts with light differently: <b>nano gold looks red</b>.</p>
<p><b>Biological.</b> If you inject microparticles, the body's defence treats them as foreign bodies and removes them. The same material as <b>nanoparticles</b> can permeate cell walls and even the <b>blood-brain barrier</b>, carrying a drug to a tumour. How they behave around proteins depends on their <b>size, curvature, shape and surface characteristics (charge, functionalization)</b>. Slide 10 also shows avoiding renal clearance, macrophage uptake and the EPR effect (passive targeting).</p>
<div class="callout"><b>He said:</b> biological features are "the most important part and applications of nanomaterials" because they directly affect our life. Lectures 5–7 build on this.</div>`,
        check: { q: 'Which biological feature of nanoparticles is on slide 10?', o: ['Higher permeability through barriers such as cell membranes and the blood-brain barrier', 'They can never enter cells', 'They are always removed as foreign bodies', 'Lower biocompatibility than bulk materials'], why: 'Slide 10.' },
      },
      {
        t: 'The definition of a nanomaterial (memorize it word for word)',
        key: 'A <b>nanomaterial</b> is a material with <b>at least one dimension</b> in the nano size regime, <b>1 to 100 nm</b>.',
        fig: { type: 'flow', t: 'Why 100 nm and not 1000 nm?', items: [['', '900, 500 nm', 'still bulk properties', 'c0'], ['', 'about 100 nm', 'surface atoms start to dominate', 'c2'], ['', '1–100 nm', 'properties change: nanomaterial', 'c4']] },
        html: `
<p>Slide 12: <b>"Materials with at least one dimension in the nano size regime (1 to 100 nm)."</b></p>
<ul>
  <li><b>"At least one dimension":</b> we live in 3D (X, Y, Z). If even one of the three is between 1 and 100 nm, it is a nanomaterial. It may be one, two or all three.</li>
  <li><b>"1 to 100 nm", not 1 to 1000:</b> mathematically 900 nm is still "nano", but such particles still behave like bulk. The surface-to-volume ratio changes drastically only below about 100 nm, so that is the threshold.</li>
</ul>
<p>Slides 13–14 show many ways to classify nanomaterials (origin, composition, phase, dispersion…). He does not expect those memorized; the one that matters is <b>by dimension</b>, the next lecture.</p>
<div class="callout warn"><b>Exam (Lecture 3):</b> "Be careful of this description. This is very important. If somebody asks you what is a nanomaterial, you should say a material with at least one dimension in the range 1 to 100 nanometers."</div>`,
        check: { q: 'Which is the definition of a nanomaterial?', o: ['A material with at least one dimension between 1 and 100 nm', 'A material with all three dimensions below 1000 nm', 'A material with all three dimensions below 10 nm', 'A powder that cannot be seen with the eye'], why: 'Slide 12.' },
      },
    ],
  },

  /* ================================================================ */
  4: {
    goal: 'Classify any material as bulk, 2D, 1D or 0D nanomaterial and as quantum well, wire or dot by its dimensions, explain what "dimension" counts, and answer "are all nanomaterials quantum materials?".',
    time: '≈ 40 min',
    videos: [
      ['0D 1D 2D nanomaterials explained', '0D 1D 2D 3D nanomaterials classification explained'],
      ['quantum dots in plain words', 'what are quantum dots explained simply'],
    ],
    steps: [
      {
        t: 'Dimension = how many dimensions are still free',
        key: 'In this classification the number counts the <b>free</b> dimensions: the ones still <b>larger than 100 nm</b> that you could still shrink. It is not the physical number of dimensions.',
        fig: { type: 'anim', name: 'shrink', t: 'Shrinking a bulk block one dimension at a time' },
        html: `
<p>Every object has three dimensions X, Y and Z. A <b>bulk material</b> has all three larger than 100 nm: three free dimensions.</p>
<p>Now shrink it, one dimension at a time, into the 1–100 nm range (peel, crush, crack). After each step, count how many dimensions are still large ("free"). That count is the name:</p>
<table class="t">
  <tr><th>Dimensions shrunk to 1–100 nm</th><th>Free dimensions left</th><th>Name</th><th>Also called</th></tr>
  <tr><td>none</td><td>3</td><td>bulk material</td><td>(not nano)</td></tr>
  <tr><td>1 (e.g. Z)</td><td>2</td><td><b>2D nanomaterial</b></td><td>nano-plate, coating, layer, <b>film</b>, sheet</td></tr>
  <tr><td>2 (Z and Y)</td><td>1</td><td><b>1D nanomaterial</b></td><td>nano-<b>wire</b>, rod, fiber, tube</td></tr>
  <tr><td>3 (all)</td><td>0</td><td><b>0D nanomaterial</b></td><td><b>nanoparticle</b></td></tr>
</table>
<p>A student asked: "how can it be zero-dimensional when it still has a size?" His answer: <b>zero dimensions are left to work with</b>. It is a naming rule for nanomaterials, not a claim that the particle has no size.</p>
<div class="callout warn"><b>Exam (Lecture 4):</b> "This slide and the whole information that I will talk in this slide could be a good option for your midterm exam… most probably I will ask you something from this slide."</div>`,
        lab: { href: 'l4/shrink.html', todo: [
          'Start with X = Y = Z = 1 mm (bulk). Bring <b>Z</b> down to 15 nm. What is it now, and how many free dimensions are left?',
          'Bring <b>Y</b> down to 20 nm, then <b>X</b> to 30 nm. Watch film → wire → particle.',
          'Now push Z below 10 nm, then Y, then X. Watch quantum well → wire → dot.',
          'Try the presets "graphene", "carbon nanotube" and "500 nm powder".',
        ] },
        check: { q: 'A sheet is 15 nm thick but several micrometers long and wide. What is it?', o: ['A 2D nanomaterial (nano-film)', 'A 1D nanomaterial (nanowire)', 'A 0D nanomaterial (nanoparticle)', 'A bulk material'], why: 'One nano dimension, two free dimensions → 2D.' },
      },
      {
        t: '0D, 1D and 2D: names and examples',
        key: '<b>2D</b> = films and sheets (graphene). <b>1D</b> = wires, rods, fibers, tubes. <b>0D</b> = nanoparticles. There is <b>no 3D nanomaterial</b>: that is bulk.',
        fig: { type: 'compare', t: 'Slide 13 (Lecture 3): dimensionality', cols: [{ icon: '', t: '0D', pts: ['nanoparticles', 'nanoclusters', 'graphene / carbon quantum dots', 'fullerenes'], c: 'c4' }, { icon: '', t: '1D', pts: ['nanotube', 'nanofiber', 'nanowire', 'nanorod', 'nanofilaments'], c: 'c2' }, { icon: '', t: '2D', pts: ['graphene', 'boron nitride nanosheets', 'TMDC, silicene, germanene', 'stanene, phosphorene'], c: 'c1' }] },
        html: `
<ul>
  <li><b>2D nanomaterial:</b> it looks like a film or coating, so it is called <b>nano-film, nano-coating, nano-layer, nano-plate</b> or <b>nanosheet</b>. Graphene is the classic example.</li>
  <li><b>1D nanomaterial:</b> it looks like a pen or pencil: <b>nanorod</b>; hollow inside: <b>nanotube</b>; also nanowire and nanofiber. "Nanorod, nanotube and one-dimensional nanomaterial are all the same now."</li>
  <li><b>0D nanomaterial:</b> all three dimensions in 1–100 nm: <b>nanoparticle</b>. It is the name you hear most in papers and news.</li>
</ul>
<p>Why no 3D? If none of X, Y, Z is below 100 nm, the definition of a nanomaterial is not met: it is a <b>bulk material</b>.</p>
<div class="callout warn"><b>The trap:</b> "2D" sounds like "two nano dimensions", but it is the opposite: <b>two large</b> dimensions and <b>one</b> nano dimension. A film is 2D; a wire is 1D.</div>`,
        check: { q: 'Which list contains only 1D nanomaterials?', o: ['Nanowire, nanorod, nanofiber, nanotube', 'Graphene, nano-film, nano-coating, nanosheet', 'Nanoparticle, nanocluster, fullerene, quantum dot', 'Quantum well, nano-plate, nano-layer, nano-film'], why: 'Two nano dimensions, one free → 1D.' },
      },
      {
        t: 'Below 10 nm: quantum materials',
        key: 'Around <b>10 nm</b> a second big shift happens. A <b>quantum material</b> has at least one dimension in <b>1–10 nm</b>: <b>quantum well</b> (film), <b>quantum wire</b>, <b>quantum dot</b>.',
        fig: { type: 'boxes', t: 'Slide 4: bulk – nano – quantum', head: ['Material', 'One small dim.', 'Two small dims.', 'Three small dims.'], rows: [{ label: 'Nano (< 100 nm)', cells: [['nano-plate / coating / layer / film', 'c1'], ['nano-wire / rod / fiber / tube', 'c2'], ['nanoparticle', 'c4']] }, { label: 'Quantum (< 10 nm)', cells: [['quantum well', 'c1'], ['quantum wire', 'c2'], ['quantum dot', 'c4']] }], cap: 'Bulk material: all dimensions above 100 nm.' },
        html: `
<p>Shrinking from 100 nm towards 1 nm, properties do not just keep drifting. Around <b>10 nm</b> (8–14 nm depending on the material) there is <b>another big jump</b>, like the one at 100 nm. Here only <b>quantum physics</b> applies: an electron can have the same probability of being "here" and "in the next room" at the same time, which Newtonian physics forbids.</p>
<p>The naming works exactly like before, but with 10 nm instead of 100 nm. A 30 × 20 × 15 nm nanoparticle is the "bulk" starting point for quantum materials:</p>
<ul>
  <li>one dimension below 10 nm → <b>quantum well</b> (also quantum film, quantum coating),</li>
  <li>two dimensions below 10 nm → <b>quantum wire</b>,</li>
  <li>all three below 10 nm → <b>quantum dot</b>, "the smallest particle that scientists could have made".</li>
</ul>
<p>That is why most papers' "nanomaterials" are 10–100 nm: below 10 nm they are usually called quantum materials.</p>`,
        check: { q: 'A film 5 nm thick and centimeters wide is a…', o: ['Quantum well', 'Quantum dot', 'Quantum wire', 'Bulk material'], why: 'One dimension below 10 nm → quantum well.' },
      },
      {
        t: 'Nano vs quantum vs "nano in mathematics"',
        key: '<b>All quantum materials are nanomaterials, but not all nanomaterials are quantum.</b> And "nano" in mathematics is anything below 1000 nm, while nanomaterials stop at 100 nm.',
        fig: { type: 'plot', t: 'Slide 5: what we have talked till now', w: 560, h: 150, x: [0, 4], y: [0, 3], xl: 'size (nm, log scale): 1 · 10 · 100 · 1000', rects: [{ x0: 0, y0: 0.4, x1: 1, y1: 2.6, c: 'c4', label: 'quantum 1–10' }, { x0: 0, y0: 0.4, x1: 2, y1: 1.4, c: 'c2', label: 'nanomaterials 1–100' }, { x0: 2, y0: 0.4, x1: 4, y1: 2.6, c: 'c0', label: 'bulk > 100' }, { x0: 0, y0: 2.7, x1: 3, y1: 3, c: 'mute', label: 'nano in mathematics < 1000' }] },
        html: `
<ul>
  <li><b>Nanomaterial:</b> at least one dimension 1–100 nm.</li>
  <li><b>Quantum material:</b> at least one dimension 1–10 nm. Since 1–10 is inside 1–100, <b>every quantum material is also a nanomaterial</b>.</li>
  <li>But a 50 nm particle is a nanomaterial and <b>not</b> a quantum material.</li>
  <li><b>Nano size in mathematics:</b> any size below a micron (1000 nm): 900, 500, 200 nm are all "nano" as a prefix. In materials only 1–100 nm counts, because <b>properties</b> change there. The mathematical prefix does not care about properties.</li>
</ul>
<div class="callout warn"><b>Exam (Lecture 4):</b> "A good question for your midterm could be: are all nanomaterials quantum materials or not?" Answer: <b>No.</b> All quantum materials are nanomaterials, but not necessarily the other way round (e.g. a 50 nm material). He also flagged "what is a nano size in mathematics?" (below 1000 nm).</div>`,
        check: { q: 'Are all nanomaterials quantum materials?', o: ['No: all quantum materials are nanomaterials, but a 50 nm material is not quantum', 'Yes, every nanomaterial is a quantum material', 'No, and quantum materials are not nanomaterials either', 'Yes, as long as they are metals'], why: 'Lecture 4.' },
      },
    ],
  },

  /* ================================================================ */
  5: {
    goal: 'Explain how nanomaterials help prevent disease, why early diagnosis matters, the three diagnostic categories, ionizing vs non-ionizing radiation and invasive vs non-invasive imaging, and how nanoparticles improve optical imaging.',
    time: '≈ 45 min',
    videos: [
      ['silver nanoparticles as antibacterials', 'how silver nanoparticles kill bacteria'],
      ['ionizing vs non-ionizing radiation', 'ionizing vs non ionizing radiation explained'],
      ['fluorescence-guided imaging with ICG', 'indocyanine green fluorescence imaging explained'],
    ],
    steps: [
      {
        t: 'Health: prevention, diagnosis, treatment',
        key: 'Health is the <b>most important</b> application of nanomaterials, and they are used in all three sectors: <b>prevention, diagnosis and treatment</b>.',
        fig: { type: 'flow', items: [['', 'Prevention', 'stop the cause', 'c1'], ['', 'Diagnosis', 'find it early', 'c0'], ['', 'Treatment', 'after the midterm', 'c3']] },
        html: `
<p>Why health first? Because it directly affects our life: we want to live easily, healthily and happily. Nanomaterials have found places in <b>all three sectors</b> of health: helping us <b>prevent</b> disease, <b>diagnose</b> it early if we do get ill, and <b>treat</b> it.</p>
<p>The opening video (not examined) showed the big picture: a <b>liposome</b> nanocarrier loaded with the anticancer drug doxorubicin, PEG-coated, travelling through the blood and entering leaky tumour vessels (the enhanced permeation and retention effect). Treatment and liposomes come after the midterm; this lecture covers <b>prevention</b> and starts <b>diagnosis</b>.</p>`,
      },
      {
        t: 'Prevention: same methods, nano-sized materials',
        key: '"The best way to eliminate the problem is to <b>eliminate the cause</b>." Nano does not invent new prevention methods; it puts <b>nanoparticles of the same materials</b> into masks, gloves, sprays and creams.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Disease prevention (slide 6)', pts: ['disinfecting nanomaterials', 'antibacterial NPs', 'antiviral NPs', 'antifungal NPs', 'in masks, gloves, sprays, PPE'], c: 'c1' }, { icon: '', t: 'Personal care (slide 7)', pts: ['sunscreen: ZnO, TiO₂ (deeper protection)', 'shampoo: antifungal, Ag NPs', 'anti-aging cream (L\'Oréal)', 'antibacterial textile: Ag NPs'], c: 'c5' }] },
        html: `
<p>During COVID-19 we used masks, gloves, sprays and other <b>personal protective equipment (PPE)</b>. Nano does not replace these. It improves them: instead of silver, use <b>silver nanoparticles</b>; instead of gold, <b>gold nanoparticles</b>. Remember lecture 3: nano size means higher <b>catalytic activity / reactivity</b>, so they kill bacteria, viruses and fungi better (they oxidize surfaces, release toxic ions and radicals, stop pathogens spreading and growing).</p>
<p>The same idea in everyday products:</p>
<ul>
  <li><b>Sunscreen:</b> zinc oxide (ZnO) and titanium dioxide (TiO₂) increase the protection depth; as nanoparticles they protect deeper and longer.</li>
  <li><b>Shampoo:</b> antifungal, silver nanoparticles.</li>
  <li><b>Anti-aging cream</b> (L'Oréal): a 10–100 nm active ingredient in a biodegradable shell.</li>
  <li><b>Antibacterial textile:</b> silver nanoparticles.</li>
</ul>
<div class="callout bad"><b>His warning:</b> nanomaterials are still new. We do not know their long-term effects in the body or on the next generation (e.g. <b>genotoxicity</b>). A mask with silver nanoparticles protects you, but you may inhale some of them. Use nano products with <b>precautions</b> and only with real scientific <b>certificates</b>.</div>`,
        check: { q: 'Why does a mask with silver nanoparticles protect better than one with ordinary silver?', o: ['Nano-sized silver is more reactive (higher catalytic activity) against pathogens', 'Silver nanoparticles block all air', 'Nanoparticles make the mask thicker', 'Ordinary silver attracts viruses'], why: 'Lecture 5: same method, same material, nano size → better reactivity.' },
      },
      {
        t: 'Why early diagnosis, and the three diagnostic techniques',
        key: 'Early diagnosis lets us <b>choose the best therapy</b>, makes treatment <b>more effective</b> and <b>avoids wasting resources</b>. The three diagnostic categories: <b>imaging, biosensors, wearable sensors</b>.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'Conventional tests', pts: ['wait', 'tests', 'treatment (sometimes too late)'], c: 'c4' }, { icon: '', t: 'Early diagnosis methods', pts: ['test on bedside', 'results online', 'treatment starts'], c: 'c1' }] },
        html: `
<p>Slide 10 gives three reasons for <b>early diagnosis</b>:</p>
<ol>
  <li>to choose the <b>best therapeutic method</b> and prevent disease progression,</li>
  <li>to increase the <b>effectiveness of treatment</b>,</li>
  <li>to avoid <b>wasting excess medical resources</b> by monitoring the treatment process.</li>
</ol>
<p>Slide 11 names the three categories of <b>diagnostic techniques</b> that nanomaterials improve:</p>
<ol>
  <li><b>Imaging techniques</b> (this lecture and lecture 6),</li>
  <li><b>Biosensor techniques</b> (lecture 7),</li>
  <li><b>Wearable sensors</b>.</li>
</ol>`,
        check: { q: 'What are the three diagnostic technique categories on slide 11?', o: ['Imaging techniques, biosensor techniques, wearable sensors', 'MRI, PET and CT', 'Blood test, urine test, biopsy', 'Optical, magnetic and nuclear imaging'], why: 'Slide 11 (Lecture 5).' },
      },
      {
        t: 'Ionizing vs non-ionizing radiation → invasive vs non-invasive',
        key: '<b>Non-ionizing</b> radiation cannot ionize cells → safe → <b>non-invasive</b> (MRI, ultrasound, optical). <b>Ionizing</b> radiation (UV, X-ray, gamma) breaks bonds → harmful → <b>invasive</b> (PET, SPECT, CT).',
        fig: { type: 'boxes', t: 'Slide 13: the electromagnetic spectrum, low → high energy', rows: [{ label: 'Non-ionizing', cells: [['power lines', 'c1'], ['radio / TV', 'c1'], ['mobile, satellite', 'c1'], ['IR (remote)', 'c1'], ['visible light', 'c1']] }, { label: 'Ionizing', cells: [['ultraviolet', 'c4'], ['X-rays', 'c4'], ['gamma rays', 'c4']] }], cap: 'Techniques using ionizing radiation are invasive: CT (X-ray), PET and SPECT (gamma, even more dangerous).' },
        html: `
<p>Why so many imaging techniques (PET, MRI, CT, ultrasound, SPECT, optical…)? Because <b>each has advantages and disadvantages</b>. A safe technique may have poor resolution; a sharp one may be harmful. The physician chooses by the disease, its stage and how urgent and vital the diagnosis is.</p>
<p>The key to "harmful or safe" is the <b>radiation</b> each technique uses:</p>
<ul>
  <li><b>Non-ionizing radiation</b>: does not have enough energy to ionize our cells (power lines, radio and TV, mobile networks, satellites, IR remote controls, visible light). Safe. Techniques based on it are <b>non-invasive</b>.</li>
  <li><b>Ionizing radiation</b>: high energy that can <b>break molecular bonds</b> in cells (ultraviolet, X-rays, gamma rays). Harmful. Techniques based on it are <b>invasive</b>.</li>
</ul>
<table class="t">
  <tr><th>Invasive (ionizing)</th><th>Non-invasive (non-ionizing)</th></tr>
  <tr><td><b>PET, SPECT</b>: gamma rays, even more dangerous than X-rays<br><b>CT scan</b>: X-rays</td><td><b>MRI</b>: magnetic field<br><b>Ultrasound</b>: sound<br><b>Optical imaging</b>: light</td></tr>
</table>
<div class="callout warn"><b>Exam (Lecture 5):</b> "If I ask you about ionizing and non-ionizing radiations, you should write these descriptions. If I ask you about invasive and non-invasive techniques, you should say that invasive techniques are techniques that use ionizing radiations such as UV, X-ray and gamma ray." A good written-question candidate.</div>`,
        lab: { href: 'l5/spectrum.html', todo: [
          'Click along the spectrum from power lines to gamma rays and sort each radiation.',
          'Then sort the six imaging techniques into invasive and non-invasive.',
          'Read the pros and cons card of each technique (slide 12).',
        ] },
        check: { q: 'Which group contains only invasive imaging techniques?', o: ['PET, SPECT and CT', 'MRI, ultrasound and optical imaging', 'MRI, PET and ultrasound', 'Optical imaging, CT and MRI'], why: 'They use ionizing radiation (gamma rays, X-rays).' },
      },
      {
        t: 'Optical imaging and the role of nanoparticles',
        key: 'Optical imaging uses <b>light</b> (non-ionizing) but <b>does not penetrate deep</b>. Glowing probes help; <b>nano-sized probes</b> (gold NPs, UCNPs, quantum dots) are brighter, stabler, biocompatible and targetable.',
        fig: { type: 'compare', t: 'Slide 16: nano-sized probes', cols: [{ icon: '', t: 'Gold NPs', pts: ['nanoshells, nanorods, nanocages, nanoparticles', 'also a CT contrast agent (PEG-coated AuNPs)'], c: 'c2' }, { icon: '', t: 'UCNPs', pts: ['upconversion nanoparticles', 'take NIR energy (deep penetration)', 'emit UV / visible light', 'stable'], c: 'c3' }, { icon: '', t: 'QDs', pts: ['quantum dots', 'excellent quantum yield', 'low photobleaching', 'sharp emission, stable'], c: 'c5' }] },
        html: `
<p><b>Optical imaging</b> (slide 14) uses light and the properties of photons to image organs, tissues, cells and even molecules. It is minimally or non-invasive, uses <b>non-ionizing</b> radiation, and because tissues absorb and scatter light differently it can catch <b>metabolic changes</b> that are early markers of disease. Its weakness: light <b>does not penetrate deep</b> into the body.</p>
<p><b>Fluorescence imaging</b> solves part of this: inject a dye that <b>glows</b> under near-infrared light and photograph the glow. The FDA-approved example is <b>indocyanine green (ICG)</b>, injected IV; it binds plasma proteins and lights up vessels during surgery. But ICG goes everywhere, cannot be targeted and is not cheap.</p>
<p>Nanoparticles are the replacement: <b>nano-sized probes</b> that are biocompatible, give high-resolution images and can be targeted:</p>
<ul>
  <li><b>Gold NPs</b> (nanoshells, nanorods, nanocages, nanoparticles),</li>
  <li><b>UCNPs</b>, upconversion nanoparticles: absorb <b>NIR</b> (which penetrates deep) and emit <b>UV/visible</b> light,</li>
  <li><b>QDs</b>, quantum dots: excellent quantum yield, low photobleaching, sharp emission signals, stable.</li>
</ul>
<div class="callout"><b>Student question in class:</b> is a dye injection invasive? Answer: a needle is used, so optical imaging with a dye is called "<b>non-invasive or minimally invasive</b>". It is not harmful like X-rays or gamma rays.</div>`,
        check: { q: 'What do upconversion nanoparticles (UCNPs) do?', o: ['Absorb NIR light (deep penetration) and emit UV/visible light', 'Absorb UV light and emit gamma rays', 'Emit positrons that annihilate', 'Oscillate under ultrasound'], why: 'Slide 16.' },
      },
    ],
  },

  /* ================================================================ */
  6: {
    goal: 'Explain how MRI, PET, SPECT, photoacoustic imaging and ultrasound work, which are invasive, the pros and cons of each, how nanoparticles improve each one, and what multimodal imaging is.',
    time: '≈ 60 min',
    videos: [
      ['how MRI works', 'how does an MRI machine work protons radio frequency'],
      ['PET scan basics', 'how PET scan works positron annihilation'],
      ['photoacoustic imaging', 'photoacoustic imaging explained'],
      ['microbubble ultrasound contrast', 'ultrasound contrast microbubbles how they work'],
    ],
    steps: [
      {
        t: 'The trade-off table of imaging (slide 2)',
        key: 'Safe techniques (MRI, US, optical) often lack <b>resolution or sensitivity</b>; sharp or deep ones (PET, SPECT, CT) carry <b>radiation risk</b>. Nanomaterials improve each one <b>without inventing a new technique</b>.',
        fig: { type: 'boxes', t: 'Pros and cons (Polymers 2021 figure)', head: ['Technique', 'Pros', 'Cons'], rows: [{ cells: [['MRI', 'c0'], ['high spatial resolution, no penetration limit', 'c1'], ['low sensitivity, high cost, long imaging time', 'c4']] }, { cells: [['PET', 'c4'], ['unlimited penetration depth, high sensitivity', 'c1'], ['poor spatial resolution, radiation risk', 'c4']] }, { cells: [['SPECT', 'c3'], ['unlimited penetration depth, high sensitivity', 'c1'], ['poor spatial resolution, radiation risk', 'c4']] }, { cells: [['CT', 'c2'], ['high spatial resolution, strong penetration', 'c1'], ['radiation risk', 'c4']] }, { cells: [['Ultrasound', 'c5'], ['high sensitivity, real time, low cost', 'c1'], ['poor resolution, operator-dependent', 'c4']] }, { cells: [['Optical', 'c1'], ['high sensitivity, real time, cost effective', 'c1'], ['low spatial resolution, small penetration depth', 'c4']] }] },
        html: `
<p>No technique is best at everything, so the physician picks one depending on the disease, its stage and the urgency. The pattern to remember: the <b>non-invasive</b> ones are safe but limited in resolution or sensitivity; to fix that you go to techniques that use <b>harmful ionizing radiation</b>.</p>
<p>In this lecture, for each technique ask three questions: <b>How does it work? Is it invasive? What do nanoparticles add?</b> The answer to the last one is always an improvement of an existing method: a better <b>contrast agent</b>, or a nanoparticle <b>carrier</b> that stabilizes and <b>targets</b> an existing agent.</p>`,
      },
      {
        t: 'MRI: protons, a magnet and a radio pulse',
        key: 'MRI is <b>non-invasive</b>: a strong magnetic field <b>aligns</b> the hydrogen protons of water, a <b>radio-frequency pulse</b> knocks them out of line, and when it stops they <b>realign and release energy</b> that the coil detects.',
        fig: { type: 'anim', name: 'mri', t: 'How MRI builds an image' },
        html: `
<p><b>Magnetic resonance imaging</b> produces 3D detailed anatomical images <b>without damaging radiation</b>: only a magnetic field and radio waves. So it is <b>non-invasive</b>.</p>
<ol>
  <li>Our body is full of <b>water</b>; each water molecule has two <b>hydrogen</b> atoms whose nucleus is a single positive <b>proton</b>. A spinning charge acts like a tiny magnet. Normally the protons spin in random directions.</li>
  <li>Inside the MRI's strong magnet (hospital scanners about 1.5–3 tesla) the protons <b>align</b> with the field, like iron filings around a magnet.</li>
  <li>The technician sends a <b>radio-frequency (RF) pulse</b> that deliberately disturbs them (90° or 180°).</li>
  <li>When the pulse is switched off, the protons <b>realign</b> and <b>release energy</b>. A <b>coil</b> around the body part detects it.</li>
  <li>Protons in different tissues release <b>different amounts of energy</b>, so a computer turns the energy into an image. <b>It is not a photograph.</b></li>
</ol>
<p>Fun fact he told: MRI was first called <b>NMR</b> (nuclear magnetic resonance). "Nuclear" referred to the hydrogen nucleus, but it scared patients, so it was dropped.</p>
<div class="callout warn"><b>Exam (Lecture 6):</b> "If I gave some options in a multiple choice question, which of these techniques are non-invasive, MRI could be considered as one of those."</div>`,
        check: { q: 'What does the MRI coil actually detect?', o: ['The energy released when protons realign after the RF pulse', 'X-rays passing through the body', 'Gamma rays from an injected tracer', 'A photograph taken by a camera'], why: 'Lecture 6.' },
      },
      {
        t: 'Nanoparticles in MRI: contrast agents and carriers',
        key: 'MRI needs <b>contrast agents</b> for sensitivity. Gadolinium is <b>toxic and goes everywhere</b>. Nanoparticles help in two ways: <b>magnetic NPs (SPIO)</b> as biocompatible agents, and <b>carriers</b> that encapsulate, stabilize and <b>target</b> the agent.',
        fig: { type: 'compare', cols: [{ icon: '', t: '1. NPs as contrast agents', pts: ['superparamagnetic iron oxide (SPIO)', 'manganese oxide', 'rare-earth (Gd) oxide', 'alloys (FePt)', 'must be biocompatible'], c: 'c0' }, { icon: '', t: '2. NPs as carriers (slide 6)', pts: ['encapsulation', 'stabilizing the agent', 'biocompatible polymer coatings', 'targetability', 'less toxicity, fewer side effects'], c: 'c1' }], cap: 'The important parameter: keep the magnetic properties after any modification.' },
        html: `
<p>A physician needs a sharp image of a tumour to calculate its area and the drug dose; a wrong area means too much (toxic) or too little (no healing) drug. MRI's sensitivity is relatively low, so <b>contrast agents</b> are used (slide 5). Cancer patients often receive <b>gadolinium (Gd)</b>, a magnetic element. Its two problems: it is <b>toxic</b>, and it <b>spreads everywhere</b> in the body.</p>
<p>Nanoparticles answer both problems:</p>
<ol>
  <li><b>Replace</b> it: magnetic nanoparticles such as <b>superparamagnetic iron oxide (SPIO)</b>, manganese oxide, rare-earth oxides and FePt alloys act as contrast agents. They must be <b>biocompatible</b>.</li>
  <li><b>Carry</b> it: encapsulate the existing agent inside a nanoparticle, <b>stabilize</b> it, coat it with a <b>biocompatible polymer</b>, and modify the surface so it goes only to the target (<b>targeting</b>). Result: <b>decreased toxicity and side effects</b>.</li>
</ol>
<div class="callout warn"><b>Exam (Lecture 6):</b> "If I ask you what are the applications or roles of nanoparticles in MRI, you can consider two points": the two above. And slide 6: the important parameter is to <b>keep the magnetic properties</b> of the agent after any modification.</div>`,
        check: { q: 'What are the two problems of gadolinium that nanoparticles address?', o: ['It is toxic and it spreads everywhere in the body', 'It is radioactive and invisible', 'It is too big to inject and too cheap', 'It is non-magnetic and unstable'], why: 'Lecture 6.' },
      },
      {
        t: 'PET and SPECT: gamma rays from radioactive tracers',
        key: 'Both are <b>invasive</b> (gamma rays). <b>PET</b>: a positron emitter (¹⁸F…) → positron meets electron → <b>two 511 keV gamma rays</b>. <b>SPECT</b>: a gamma emitter (<b>Tc-99m</b>) emits <b>141 keV</b> gamma rays directly.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'PET', pts: ['positron emission tomography', 'radioisotopes ¹⁸F, ¹²⁴I, ¹¹¹In, ⁶⁴Cu', 'positron + electron → annihilation', '2 gamma rays, 511 keV, opposite directions', 'gamma camera'], c: 'c4' }, { icon: '', t: 'SPECT', pts: ['single photon emission computed tomography', 'radioisotope technetium-99m', 'emits gamma directly (141 keV)', 'no electron needed', 'gamma camera → biodistribution'], c: 'c3' }], cap: 'Both: unlimited depth, high sensitivity, but poor spatial resolution, radiation risk and high cost.' },
        html: `
<p><b>PET (positron emission tomography)</b> injects a <b>radiotracer</b>: a positron-emitting radioisotope such as <b>fluorine-18</b>, iodine-124, indium-111 or copper-64. Each positron meets an electron (there are electrons everywhere in the body) and they <b>annihilate</b> into <b>two gamma rays of 511 keV</b>, flying off in opposite directions. Gamma cameras around the body detect them and build a 3D image. For cancer, the tracer is often FDG, a modified glucose that tumours absorb a lot.</p>
<p><b>SPECT (single photon emission computed tomography)</b> works similarly but the agent, e.g. <b>technetium-99m</b>, <b>emits gamma rays itself (141 keV)</b>; no positron and no electron collision are needed. The gamma camera shows where the agent went (its <b>biodistribution</b>).</p>
<p>Both use <b>radioactive materials</b> and gamma rays, more dangerous than X-rays, so both are <b>invasive</b>, and both are expensive. Why use them? Great depth and sensitivity.</p>
<p><b>Role of nanoparticles:</b> the radioactive agent normally goes everywhere, producing gamma rays everywhere. A nanoparticle can <b>carry the radiotracer to the target site</b> (slide 8), so it accumulates only where we want an image.</p>`,
        check: { q: 'What is the main difference between PET and SPECT?', o: ['PET tracers emit positrons that annihilate into gamma rays; SPECT tracers (Tc-99m) emit gamma rays directly', 'PET uses magnets; SPECT uses sound', 'PET is non-invasive; SPECT is invasive', 'PET uses X-rays; SPECT uses visible light'], why: 'Slides 7 and 9 (Lecture 6).' },
      },
      {
        t: 'Photoacoustic imaging: light in, sound out (learn the 3 steps)',
        key: 'PAI: <b>1</b> a <b>laser pulse</b> illuminates the tissue; <b>2</b> excited electrons relax and release the energy as <b>heat</b>; <b>3</b> the heated spot <b>expands</b> (thermal expansion) and sends a <b>thermoacoustic wave</b> to an ultrasound transducer.',
        fig: { type: 'anim', name: 'pai', t: 'Photoacoustic imaging, step by step' },
        html: `
<p><b>Photoacoustic imaging (PAI)</b> is based on detecting <b>acoustic waves derived from the thermo-expansion phenomenon</b>. "Photo" = light energy (a laser); "acoustic" = sound.</p>
<ol>
  <li><b>Illumination</b> of the matter with a <b>laser pulse</b>.</li>
  <li>The absorbed optical radiation <b>excites the electrons</b>; the excited electrons <b>relax back to the ground state</b> and the absorbed energy is <b>released as heat</b>.</li>
  <li>The heated area produces localized compressed stress and tries to <b>expand</b>. This abrupt <b>thermal expansion</b> produces an outgoing <b>thermoacoustic wave</b>, detected by an <b>ultrasound transducer</b>.</li>
</ol>
<p><b>Advantages:</b> (1) delivers <b>anatomical, functional and molecular</b> contrast with a single modality; (2) reaches <b>several centimeters</b> in depth.</p>
<p><b>Why contrast agents?</b> Not every tissue absorbs laser light well or converts it efficiently to sound. <b>Plasmonic nanoparticles</b>, <b>Au NPs, Ag NPs</b> and <b>SWNT</b> (single-walled nanotubes), have a <b>superior ability to absorb light</b> and an <b>optimized light-to-acoustic conversion efficiency</b> (lecture 3: nano makes them more reactive), so they sharpen the image.</p>
<div class="callout warn"><b>Exam (Lecture 6):</b> "If I ask you what is the procedure of photoacoustic, you should completely describe these three steps. If I ask you about the advantages, here it is. And if I ask you about the contrast agents, these are the contrast agents." A likely <b>written</b> question. Also: "be careful, photoacoustic is different from ultrasonic."</div>`,
        check: { q: 'In photoacoustic imaging, what produces the detected sound wave?', o: ['Thermal expansion of tissue heated by an absorbed laser pulse', 'The echo of a sound pulse sent by a probe', 'Protons realigning after a radio pulse', 'Gamma rays from positron annihilation'], why: 'Slide 10 (Lecture 6).' },
      },
      {
        t: 'Ultrasound and its bubbles',
        key: 'Ultrasound is <b>non-invasive</b>: sound in, <b>echo</b> out. The echo weakens with depth, so <b>micro/nano-bubbles</b> are used: they <b>oscillate</b> (expand and contract) and give a <b>strong nonlinear acoustic response</b> that improves the signal-to-noise ratio.',
        fig: { type: 'flow', t: 'Slide 14: the evolution of ultrasound contrast agents', items: [['', '1968', 'air, no shell: burst easily', 'mute'], ['', '1984', 'air, protein shell', 'c4'], ['', '1989', 'N₂/PFC/SF₆, protein or lipid', 'c2'], ['', '1991', 'air, polymer shell', 'c1'], ['', '2001 →', 'hybrid protein, lipid, polymer', 'c3']], cap: 'Over time: increased stability, decreased echogenicity. The first ones were clinically approved; the newer ones are in research.' },
        html: `
<p><b>Ultrasound (US)</b> uses high-frequency sound (above human hearing, like dolphins' echolocation). The most important part is the <b>probe</b>: it transmits the sound and receives the <b>echo</b> reflected back from tissues. It is only sound, so it is <b>non-invasive</b>.</p>
<p><b>Ultrasound vs photoacoustic:</b> in PAI the stimulus is <b>laser light</b>; in ultrasound both the stimulus and the signal are <b>sound</b> (the probe replaces the laser). Sound does not have the energy of a laser: the further it travels, the <b>weaker the echo</b>, so deep tissues are hard to image.</p>
<p><b>Contrast agents = bubbles</b> (slide 14):</p>
<ul>
  <li>Materials that act as <b>cavitation nuclei</b> improve US resolution.</li>
  <li><b>Micro/nano-bubbles are currently the only clinically used US contrast agent.</b> Because of their size they stay <b>intravascular</b>.</li>
  <li>How they work: when exposed to ultrasound they undergo <b>volumetric oscillations (expansion and contraction)</b>, without bursting. This produces a <b>strong nonlinear acoustic response</b> and high <b>backscatter</b>, improving the <b>signal-to-noise ratio</b> and the contrast against surrounding tissue.</li>
  <li><b>Polymer</b> shells offer a high degree of control (chain composition, length, rigidity) that lipid or protein shells cannot give.</li>
  <li>Nano-sized bubbles could reach every part of the body (e.g. the brain): a hope for non-invasive deep imaging.</li>
</ul>
<div class="callout warn"><b>Exam (Lecture 6):</b> "I have written this specifically because if I ask you, you know how to respond me": volumetric oscillation → strong nonlinear acoustic response → better signal-to-noise. "This is very important."</div>`,
        check: { q: 'How do micro/nano-bubbles improve an ultrasound image?', o: ['They oscillate (expand and contract), giving a strong nonlinear acoustic response and better signal-to-noise', 'They burst and release a fluorescent dye', 'They emit gamma rays toward the probe', 'They absorb all the sound so tissue looks dark'], why: 'Slide 14 (Lecture 6).' },
      },
      {
        t: 'Multimodal imaging: combine the strengths',
        key: 'Since no technique is perfect, <b>multimodal imaging</b> combines them in one hybrid scan (SPECT/CT, PET/CT, MRI/PET…): <b>CT shows anatomy</b>, <b>SPECT shows function</b>.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'CT / X-ray', pts: ['structure, anatomy', 'what the inside looks like'], c: 'c2' }, { icon: '', t: 'SPECT', pts: ['function, physiology', 'blood flow to the heart, active brain areas, bone affected by cancer'], c: 'c3' }] },
        html: `
<p>Each technique has its own advantage and disadvantage. If we integrate several into one <b>hybrid</b> scan, we get <b>anatomical and functional</b> information together. Slide 15: an X-ray shows <i>what</i> the structures look like; a SPECT scan shows <i>how organs are functioning</i>, for example how well blood flows to the heart, which brain areas are more or less active, or which parts of a bone are affected by cancer.</p>
<p>Combined with nanomaterial contrast agents, multimodal imaging gives "the best diagnosis till now".</p>`,
        check: { q: 'In a SPECT/CT scan, what does each part contribute?', o: ['CT shows anatomy (structure); SPECT shows function (physiology)', 'CT shows function; SPECT shows anatomy', 'Both show only anatomy', 'Both show only blood flow'], why: 'Slide 15 (Lecture 6).' },
      },
    ],
  },

  /* ================================================================ */
  7: {
    goal: 'Define a biosensor and name its parts, tell analyte from receptor, explain lock and key, in vivo vs ex vivo, where nanomaterials improve a biosensor, define the amperometric, calorimetric and optical biosensors, and define every performance parameter.',
    time: '≈ 45 min',
    videos: [
      ['what a biosensor is', 'biosensor explained bioreceptor transducer'],
      ['glucose biosensor', 'how glucose biosensor works amperometric'],
    ],
    steps: [
      {
        t: 'What a biosensor is',
        key: 'A biosensor is a <b>sensing device</b>: a <b>receptor (biocatalyst)</b> recognizes the <b>analyte</b>, a <b>transducer</b> converts that biological signal into a <b>readable (usually electrical) signal</b>.',
        fig: { type: 'anim', name: 'biosensor', t: 'Inside a biosensor' },
        html: `
<p>Diagnosis category 2 (lecture 5): biosensors. A biosensor senses an <b>analyte</b>: a biomarker that signals a disease, e.g. an <b>antigen</b> on a virus, part of its nucleic acid, an enzyme, a molecule like glucose. Detect the analyte, and you have diagnosed the disease.</p>
<p>Slide 3's definition: a sensing/measuring device consisting of</p>
<ul>
  <li>a <b>biocatalyst (receptor)</b>: <b>enzyme, antibody, nucleic acid or cell</b>, chosen to match the analyte, and</li>
  <li>a <b>transducer</b> which converts the biological/biochemical signal into a <b>quantifiable / readable signal</b> (usually electrical).</li>
</ul>
<p>Then the signal is amplified and processed and shown on the output (slide 4: analyte → receptors → transducer → amplification + signal processing).</p>
<div class="callout warn"><b>Exam (Lecture 7):</b> "If I ask you what is a biocatalyst or receptor, you should name these ones" (enzyme, antibody, nucleic acid, cell). "If I ask you if a thermal transducer is considered as a receptor: of course not." "If the antigens could be considered as receptor: of course they are not. Antigens are analytes."</div>`,
        check: { q: 'A biosensor uses an antibody to detect a virus antigen. Which is correct?', o: ['The antigen is the analyte; the antibody is the receptor', 'The antigen is the receptor; the antibody is the analyte', 'The antibody is the transducer', 'Both are transducers'], why: 'Lecture 7.' },
      },
      {
        t: 'Lock and key, in vivo and ex vivo',
        key: 'The receptor binds its analyte by <b>lock and key</b> (enzyme/substrate, antibody/antigen, complementary nucleic acids). Biosensors work <b>in vivo</b> (inside the body) or <b>ex vivo</b> (outside).',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'In vivo', pts: ['inside the body', 'patient monitoring', 'implantable sensors on pacemakers recording vital information'], c: 'c4' }, { icon: '', t: 'Ex vivo', pts: ['out of the body', 'diagnosis', 'health watches, glucose sensors, wearable sensors'], c: 'c1' }] },
        html: `
<p>In nature, each analyte has a partner that binds it exclusively and with high affinity: <b>for each lock there is a specific key</b>. For each antigen there is an antibody; for each nucleic acid strand a complementary strand; for each substrate an enzyme. This <b>lock and key</b> recognition makes a biosensor specific to one disease marker.</p>
<p>When the receptor binds the analyte, something changes: electrons move (current), the potential changes, heat is produced or absorbed, light changes, mass changes. The transducer measures that change.</p>
<p>Use: <b>in vivo</b> (in the body, e.g. sensors implanted with a pacemaker) or <b>ex vivo</b> (outside: health watches, glucose sensors, wearables).</p>`,
        check: { q: 'A glucose sensor used on a finger-prick drop of blood works…', o: ['Ex vivo', 'In vivo', 'Only inside a pacemaker', 'Only in MRI'], why: 'Slide 3: glucose sensors and health watches are ex vivo.' },
      },
      {
        t: 'Where nanomaterials help: two layers',
        key: '<b>Layer 1:</b> nanofibers, functionalized NPs and <b>2D nanomaterials (graphene)</b> <b>stabilize the bioreceptors</b> on the transducer. <b>Layer 2:</b> <b>nano-enabled transistors</b> improve the transducer and let it <b>shrink</b>, so sensors become wearable and implantable.',
        fig: { type: 'stack', t: 'Slides 5–7', items: [['Analyte', 'ions, molecules, nucleic acids, cells', 'c4'], ['Bioreceptor', 'antibody, enzyme, ssDNA', 'c3'], ['Layer 1: stabilizing interface', 'nanofibers, functionalized NPs, 2D nanomaterials (graphene nanosheet)', 'c1'], ['Layer 2: transducer', 'nano-enabled transistors, nanoparticles; electrochemical, optical, thermal, piezoelectric', 'c0']] },
        html: `
<p>Again, nano does not invent the biosensor; it <b>improves</b> two parts of it.</p>
<p><b>Layer 1, between receptor and transducer.</b> The receptors are biological molecules; the transducer is an electronic device. Something must hold the receptors firmly on the transducer. <b>Nanofibers, functionalized nanoparticles and 2D nanomaterials</b> can be chemically prepared to <b>stabilize the bioreceptors</b>. Slide 7: antibodies, enzymes and ssDNA attached to a <b>graphene nanosheet</b>.</p>
<p><b>Layer 2, the transducer.</b> A transducer is built from transistors, which are switches controlled by a gate voltage, letting current flow from source to drain. To shrink transistors you need thinner wires, but thin normal wires get resistive and hot (lecture 3). <b>Carbon nanotubes and graphene</b> stay conductive at nanometer diameters, so <b>nano-enabled transistors</b> shrink the transducer and the whole biosensor. That is why <b>wearable and implantable</b> biosensors exist.</p>`,
        check: { q: 'What do nanomaterials do in the first layer of a biosensor?', o: ['Stabilize the bioreceptors on the transducer surface', 'Act as the analyte', 'Emit gamma rays', 'Replace the display'], why: 'Slide 5 (Lecture 7).' },
      },
      {
        t: 'Transducer types: memorize amperometric, calorimetric, optical',
        key: '<b>Amperometric</b> = <b>current</b> produced in proportion to the bioreaction. <b>Calorimetric / thermal</b> = <b>heat</b> produced or absorbed. <b>Optical</b> = change in <b>light intensity</b>.',
        fig: { type: 'boxes', t: 'Slide 8: types of transducers', head: ['Biosensor', 'Measures'], rows: [{ cells: [['Amperometric', 'c2'], ['the current produced in proportion to the bioreaction', 'mute']] }, { cells: [['Calorimetric / thermal', 'c4'], ['the amount of heat produced or absorbed', 'mute']] }, { cells: [['Optical', 'c1'], ['changes in light intensity when a specific reaction happens', 'mute']] }] },
        html: `
<p>The biosensor is named after its transducer, and the transducer is named after what it measures. More analyte → more bioreactions → a bigger change.</p>
<ul>
  <li><b>Amperometric biosensor:</b> measures the <b>current</b> produced <b>in proportion to the bioreaction</b> that occurred. Many analytes → many reactions → large current.</li>
  <li><b>Calorimetric / thermal biosensor:</b> measures the amount of <b>heat produced or absorbed</b> (temperature change).</li>
  <li><b>Optical biosensor:</b> measures the <b>changes in light intensity</b> when a specific reaction happens.</li>
</ul>
<p>The full table on slide 8 (learn it, but the three above are the exam focus):</p>
<table class="t">
  <tr><th>Type</th><th>Device</th><th>Parameter measured</th></tr>
  <tr><td rowspan="3">Electronic</td><td>Amperometric</td><td>change in current</td></tr>
  <tr><td>Potentiometric</td><td>change in potential</td></tr>
  <tr><td>Impedance</td><td>change in impedance</td></tr>
  <tr><td>Thermal</td><td>Thermistor</td><td>change in temperature</td></tr>
  <tr><td>Mechanical</td><td>Piezo-electric</td><td>change in mass vibrations</td></tr>
  <tr><td>Acoustical</td><td>Acoustical</td><td>change in amplitude, phase or frequency of an acoustic wave</td></tr>
  <tr><td>Optical</td><td>photo-conductive, photo-emissive, photo-diodes, photo-transistors, fluorescence</td><td>change in intensity, colour or emission</td></tr>
</table>
<div class="callout warn"><b>Exam (Lecture 7):</b> "I expect you, specifically for your midterm, to memorize these three different transducers… I may ask you to define amperometric biosensor or calorimetric biosensor or optical biosensor… or in a multiple choice: amperometric biosensor measures the amounts of heat produced. Of course it is not right." "Most probably I will ask you in the midterm."</div>`,
        lab: { href: 'l7/biosensor.html', todo: [
          'Part 1: for each analyte pick the receptor that fits it like a key.',
          'Part 2: for each reaction, pick the transducer that can read it (current, heat or light).',
          'Part 3: move the sliders and compare a good and a poor sensor on sensitivity and response time.',
        ] },
        check: { q: 'Which statement is correct?', o: ['An amperometric biosensor measures the current produced in proportion to the bioreaction', 'An amperometric biosensor measures the heat produced', 'A calorimetric biosensor measures changes in light intensity', 'An optical biosensor measures the current produced'], why: 'Slide 8 (Lecture 7).' },
      },
      {
        t: 'Performance parameters (the slide he called very important)',
        key: '<b>Selectivity</b> = finds the target among look-alikes. <b>Sensitivity</b> = how sharply the signal follows concentration. <b>Response time</b> = how fast it stabilizes. <b>Limit of detection</b> = the <b>minimum</b> detectable concentration.',
        fig: { type: 'plot', t: 'Slide 10: good vs poor sensitivity', w: 520, h: 220, x: [0, 100], y: [0, 32], xl: 'analyte concentration', yl: 'signal', lines: [{ pts: [[0, 1], [20, 6.5], [40, 11], [60, 17], [80, 24], [100, 30]], c: 'c1', label: 'good sensitivity' }, { pts: [[0, 1], [20, 2], [40, 2.5], [60, 3.5], [80, 4.5], [100, 6.5]], c: 'c4', label: 'poor sensitivity' }], cap: 'Response time is the other graph: both sensors react, but one takes seconds and one about 4 minutes to give a stable value.' },
        html: `
<p>These parameters decide how good, and how expensive, a biosensor is. Why is one glucose sensor much pricier than another? Its performance parameters.</p>
<table class="t">
  <tr><th>Parameter</th><th>Definition (slide 9)</th><th>Think of it as</th></tr>
  <tr><td><b>Selectivity</b></td><td>Detecting the target analyte in the presence of other potentially interfering species; discriminating between analytes of even the same size and charge.</td><td>"Does it find the <i>right</i> one?"</td></tr>
  <tr><td><b>Sensitivity</b></td><td>How sharply the signal changes with variations in the concentration of the target analyte.</td><td>Steep line = sensitive.</td></tr>
  <tr><td><b>Response time</b> (speed)</td><td>How long it takes until the sensor is stabilized at a reliable value when the concentration changes.</td><td>Seconds good, 4 minutes poor.</td></tr>
  <tr><td><b>Limit of detection</b></td><td>The <b>minimum</b> concentration that the biosensor can detect.</td><td>Lower = earlier diagnosis.</td></tr>
  <tr><td><b>Accuracy</b> (precision)</td><td>The degree of reproducibility, and thus the reliability, of a sensor.</td><td>Same sample 100 times → same signal?</td></tr>
  <tr><td><b>Durability</b> (stability)</td><td>The ability to maintain the signal over time.</td><td>Hours, days, months in blood (in vivo).</td></tr>
  <tr><td>Cost, ease of use</td><td>Affordable, usable at home without equations.</td><td></td></tr>
</table>
<p>Why the <b>minimum</b>? Early diagnosis means finding the disease when only a few analyte molecules are present. A sensor that only sees high concentrations finds the disease too late.</p>
<div class="callout warn"><b>Exam (Lecture 7):</b> "For your midterm, be careful of this slide also… I may ask you to describe these parameters, or I may ask you if the selectivity is how sharply the signal changes. Of course it is not, this is the definition for sensitivity. I may tell you that the limit of detection is the maximum concentration. Of course it is not. It is minimum concentration."</div>`,
        check: { q: 'What is the limit of detection of a biosensor?', o: ['The minimum concentration it can detect', 'The maximum concentration it can detect', 'How sharply its signal changes', 'How long it takes to stabilize'], why: 'Slide 9: minimum, which is what early diagnosis needs.' },
      },
      {
        t: 'Before the midterm: the checklist from his own words',
        key: 'In lecture 7 he said: re-listen to each lecture for the parts he called important, <b>memorize them</b>, and skip the videos. This list is those parts.',
        fig: { type: 'stack', t: 'Everything he flagged as "I may ask you"', items: [['L2', 'nanoscience vs nanotechnology', 'c0'], ['L3', 'property categories and their examples · definition of a nanomaterial (1–100 nm)', 'c5'], ['L4', '0D / 1D / 2D classification · are all nanomaterials quantum? · nano in mathematics', 'c1'], ['L5', 'ionizing vs non-ionizing · invasive vs non-invasive', 'c2'], ['L6', 'MRI non-invasive · two roles of NPs in MRI · PAI 3 steps, advantages, agents · how bubbles work', 'c4'], ['L7', 'receptor vs analyte vs transducer · amperometric / calorimetric / optical · performance parameters', 'c3']] },
        html: `
<p>Use this as your final pass. For each line, say the answer out loud without looking, then check the lesson step.</p>
<ul>
  <li><b>Written-question candidates</b> (he used "describe", "write the definition"): the PAI procedure; ionizing vs non-ionizing and invasive vs non-invasive; the definition of a nanomaterial; nanoscience vs nanotechnology; the three biosensor types; the performance parameters; roles of nanoparticles in MRI; how ultrasound bubbles work.</li>
  <li><b>Multiple-choice traps</b> he described himself: "reactivity is a physical property" (no, chemical), "all nanomaterials are quantum" (no), "amperometric measures heat" (no, current), "selectivity = how sharply the signal changes" (no, sensitivity), "limit of detection = maximum" (no, minimum), "an antigen is a receptor" (no, analyte).</li>
</ul>
<p>Then take the <a href="mock.html">mock midterm</a>: multiple-choice questions plus written questions with model answers.</p>`,
        check: { q: 'Which of these did the lecturer say is NOT correct?', o: ['"Selectivity is how sharply the signal changes with concentration"', '"Melting point is a physical property"', '"All quantum materials are nanomaterials"', '"MRI is a non-invasive technique"'], why: 'That is the definition of sensitivity, his own example of a wrong option.' },
      },
    ],
  },
};
