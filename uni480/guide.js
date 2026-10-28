/* UNI480 guided lessons — teach each week from zero, in order, linking to the labs.
 * Based on Dr. Arsan's slides (materials/UNI480/). Format: see assets/js/learn.js.
 */
window.GUIDE = {
  /* ================================================================ */
  1: {
    goal: 'Explain in your own words what AI is (and is not), tell its short history, describe an AI agent with its five parts, sort any healthcare AI example into one of the three areas, and list what AI cannot guarantee.',
    time: '≈ 60 min',
    videos: [
      ['a gentle overview of what AI is', 'Crash Course Artificial Intelligence what is AI'],
      ['AI in healthcare for non-technical people', 'AI in healthcare explained simply'],
      ['the history: Turing, Dartmouth, AI winters', 'history of artificial intelligence Turing Dartmouth AI winter'],
      ['intelligent agents: sensors and actuators', 'intelligent agent sensors actuators explained'],
    ],
    steps: [
      {
        t: 'Why hospitals are interested in AI',
        key: 'Start with the <b>problem</b>, not the technology. Hospitals are under pressure on quality, access, efficiency and safety at the same time, and they produce huge amounts of data.',
        fig: { type: 'compare', cols: [{ icon: '⭐', t: 'Quality', pts: ['is the care good?'], c: 'c1' }, { icon: '🚪', t: 'Access', pts: ['can patients get care when they need it?'], c: 'c0' }, { icon: '⚙️', t: 'Efficiency', pts: ['are staff, beds and money used well?'], c: 'c2' }, { icon: '🛡️', t: 'Patient safety', pts: ['are we avoiding harm?'], c: 'c4' }], cap: 'The key question of the course: can AI help us deliver better care with the resources we have?' },
        html: `
<p>Start with the problem, not the technology. The lecture's opening scenario (slide 4): you manage a large hospital with <b>long waiting times, staff shortages, rising costs and high patient demand</b>.</p>
<p>Healthcare is under pressure on four things at the same time:</p>
<ul>
  <li><b>Quality</b> — is the care good?</li>
  <li><b>Access</b> — can patients get care when they need it?</li>
  <li><b>Efficiency</b> — are we using staff, beds and money well?</li>
  <li><b>Patient safety</b> — are we avoiding harm?</li>
</ul>
<p>At the same time hospitals produce <b>huge amounts of data</b> (clinical, administrative, operational), and staff must make <b>complex decisions under uncertainty</b>, often quickly.</p>
<div class="callout"><b>💡 The key question of the whole course:</b> can AI help us deliver <i>better care with the resources we have</i>? Keep this question in mind — every week answers part of it.</div>`,
      },
      {
        t: 'What AI is — and what it is not',
        key: 'AI = computer systems that do tasks we normally link to <b>human intelligence</b>: learning from data, understanding language, reading images, predicting, and supporting decisions.',
        fig: { type: 'flow', t: 'What AI can do in a hospital', items: [['📈', 'Learn patterns', 'from patient data', 'c0'], ['📝', 'Understand language', 'doctors\' notes', 'c3'], ['🩻', 'Interpret images', 'X-rays, scans', 'c5'], ['🔮', 'Predict', 'risk of deterioration', 'c2'], ['🤝', 'Support decisions', 'a human decides', 'c1']] },
        html: `
<p><b>Artificial Intelligence</b> is a field of computer science that builds systems able to perform tasks we normally associate with human intelligence. In healthcare that means systems that can:</p>
<ul>
  <li>learn from data and recognise patterns,</li>
  <li>understand and generate language (e.g. read doctors' notes),</li>
  <li>interpret images (X-rays, scans),</li>
  <li>make predictions and recommendations, and support decisions.</li>
</ul>
<div class="callout warn"><b>⚠ The "important distinction" (slide 5) — exam favourite:</b> AI does <b>not</b> automatically have human <b>understanding</b>, professional <b>judgment</b>, <b>empathy</b> or <b>moral responsibility</b>. What it can do depends on its <b>design</b>, its <b>training data</b> and its <b>intended use</b>.</div>
<div class="callout"><b>💡 Think of it like this:</b> an AI tool is like a very fast assistant who has read millions of patient records but has never met a patient. It can spot patterns quickly, but it doesn't know <i>this</i> patient's fears, home situation or values — and it cannot take responsibility for a decision.</div>`,
        check: { q: 'Which statement matches the lecture?', o: ['AI abilities depend on its design, training data and intended use', 'AI has the same professional judgment as an experienced doctor', 'AI carries moral responsibility for its recommendations', 'AI understands every patient fully once it has enough data'], why: 'Slide 5: AI does not automatically possess understanding, judgment, empathy or moral responsibility.' },
      },
      {
        t: 'A short history of AI (memorise this timeline)',
        key: '<b>Turing</b> asked the question ("Can machines think?"). <b>Dartmouth 1956</b> gave the field its name. AI is booming today because of <b>data + computing power + better algorithms</b>.',
        fig: { type: 'flow', items: [['🤔', '1940s–50s', 'Turing: "Can machines think?", the Turing Test', 'c3'], ['🏷️', '1956', 'Dartmouth: the name "Artificial Intelligence"', 'c0'], ['📏', '1950s–70s', 'logic and hand-written rules', 'c5'], ['❄️', 'AI winters', 'big promises, then funding cuts', 'mute'], ['🚀', 'Today', 'machine learning and deep learning', 'c1']] },
        html: `
<table class="t">
  <tr><th>When</th><th>What happened</th><th>Remember</th></tr>
  <tr><td>1940s–50s</td><td><b>Alan Turing</b> asks <i>"Can machines think?"</i> and proposes the <b>Turing Test</b>.</td><td>Turing asked the question — he did <i>not</i> name the field.</td></tr>
  <tr><td><b>1956</b></td><td><b>Dartmouth Conference</b>: McCarthy, Minsky, Rochester and Shannon coin the term <b>"Artificial Intelligence"</b>.</td><td>The official birth of AI as a field.</td></tr>
  <tr><td>1950s–70s</td><td>Early programs based on logic and rules.</td><td>Hand-written rules.</td></tr>
  <tr><td>1970s–80s</td><td><b>"AI winters"</b>: big promises met real-world limits → funding cuts and slow progress.</td><td>Winter = <i>slow</i>, not fast.</td></tr>
  <tr><td>Today</td><td>From rule-based systems to <b>machine learning</b> and <b>deep learning</b>.</td><td>Why now? <b>More data + more computing power + better algorithms.</b></td></tr>
</table>
<p><b>John McCarthy</b>, the "father of AI", defined it as <i>"the science and engineering of making intelligent machines, especially intelligent computer programs."</i></p>
<div class="callout warn"><b>📝 Exam tip:</b> questions love to mix up Turing (question + test) with Dartmouth 1956 (the name). Learn the three reasons for today's progress as a set: data, computing power, algorithms.</div>`,
        check: { q: 'Where did the term "Artificial Intelligence" come from?', o: ['The 1956 Dartmouth Conference (McCarthy, Minsky, Rochester, Shannon)', 'Alan Turing\'s Turing Test paper', 'The AI winters of the 1980s', 'The first deep-learning systems'], why: 'Slide 6: the term was coined at Dartmouth in 1956. Turing asked "Can machines think?".' },
      },
      {
        t: 'The AI agent: sense → think → act',
        key: 'An <b>agent</b> senses its environment, decides with its <b>agent function</b>, and acts through <b>actuators</b>. It can be pure software; it does not have to be a robot.',
        fig: { type: 'anim', name: 'agent', t: 'A ward monitoring agent', cap: 'Limits as in the lab: heart rate > 110, breathing > 24, SpO₂ < 92%, temperature > 38.3 °C. Illustrative, not clinical.' },
        html: `
<p>An <b>intelligent agent</b> is anything that <b>perceives its environment through sensors</b> and <b>acts on it through actuators</b> to reach a goal. It can be pure software — it does not have to be a robot.</p>
<p>It has five parts (slide 10). Learn them with this hospital example — a ward monitoring system:</p>
<table class="t">
  <tr><th>Part</th><th>Meaning</th><th>Ward monitor example</th></tr>
  <tr><td><b>Environment</b></td><td>The world the agent works in</td><td>A ward with 10 patients</td></tr>
  <tr><td><b>Sensors</b></td><td>How it perceives (input)</td><td>Heart rate, breathing rate, oxygen (SpO₂), temperature monitors</td></tr>
  <tr><td><b>Agent function</b></td><td>The rule that maps <i>perceptions → actions</i> (the "thinking")</td><td>"If 2 or more readings are abnormal → alert"</td></tr>
  <tr><td><b>Actuators</b></td><td>How it acts on the world (output)</td><td>Paging the nurse (a software command)</td></tr>
  <tr><td><b>Performance measure</b></td><td>How we judge if it does its job well</td><td>Catch deterioration early, few misses, few false alarms</td></tr>
</table>
<div class="callout"><b>💡 Simplest example:</b> a thermostat. Sensor = thermometer, agent function = "below 20 °C → heat on", actuator = the heater switch, performance measure = room stays near 20 °C.</div>`,
        lab: { href: 'w1/agent.html', todo: [
          'Leave all four sensors on and the rule at <b>2</b>. Click <b>Run 24 hours</b>. Look at the score: how many patients were caught early?',
          'Now <b>switch off the SpO₂ sensor</b>, click Reset and run again. The patient with a breathing problem is missed — <i>an agent cannot act on what it cannot perceive.</i>',
          'Turn SpO₂ back on, set the rule to <b>1 abnormal reading</b> and switch on <b>Noisy environment</b>. Run. Count the false alarms — this is how <b>alert fatigue</b> starts (week 4).',
        ] },
        check: { q: 'A scheduling bot books appointments by sending commands to the hospital system. In agent terms these commands are its…', o: ['actuators', 'sensors', 'agent function', 'performance measure'], why: 'Actuators are how an agent acts on its environment. Software commands count (slide 10).' },
      },
      {
        t: 'The three areas of AI in healthcare',
        key: 'AI in healthcare is <b>not only diagnosis</b>. There are three areas: caring for the patient, running the hospital, and planning for the whole system and the future.',
        fig: { type: 'compare', cols: [{ icon: '🩺', t: '1. Clinical AI', pts: ['diagnosis support', 'medical imaging', 'risk prediction', 'treatment planning, monitoring'], c: 'c0' }, { icon: '🗓️', t: '2. Administrative & operational', pts: ['appointment scheduling', 'staff planning, demand forecasting', 'bed management, billing'], c: 'c2' }, { icon: '🌍', t: '3. Strategic & system-level', pts: ['population-health analysis', 'financial forecasting', 'public-health surveillance, long-term planning'], c: 'c1' }], cap: 'Ask "who is it for?": one patient → clinical; today\'s operations → operational; the whole system or years ahead → strategic.' },
        html: `
<p>AI in healthcare is <b>not only about diagnosing disease</b>. The lecture sorts it into three areas (slide 11):</p>
<table class="t">
  <tr><th>Area</th><th>Question it helps with</th><th>Examples</th></tr>
  <tr><td><b>1. Clinical AI</b></td><td>How do we care for <i>this patient</i>?</td><td>Diagnosis support, medical imaging, risk prediction, treatment planning, patient monitoring</td></tr>
  <tr><td><b>2. Administrative &amp; operational AI</b></td><td>How do we run the hospital day to day?</td><td>Appointment scheduling, patient flow, demand forecasting, staff planning, documentation</td></tr>
  <tr><td><b>3. Strategic &amp; system-level AI</b></td><td>How do we plan for the whole population and the future?</td><td>Population-health analysis, financial forecasting, quality improvement, public-health surveillance, long-term planning</td></tr>
</table>
<div class="callout"><b>💡 Trick to sort an example:</b> ask "who is it for?" — one patient → <b>clinical</b>; today's hospital operations → <b>operational</b>; the whole system / years ahead → <b>strategic</b>.</div>
<p><b>Key principle (slide 11):</b> AI is not limited to treating diseases; it can also help manage the systems that deliver care.</p>`,
        check: { q: 'A tool that forecasts how many nurses the emergency department will need next weekend belongs to…', o: ['administrative & operational AI', 'clinical AI', 'strategic & system-level AI', 'it is not AI'], why: 'Staff planning and demand forecasting are listed under area 2 (operational).' },
      },
      {
        t: 'Why healthcare is a special industry',
        key: 'A hospital is not Netflix. Decisions are <b>complex, urgent, uncertain and high-stakes</b>, resources are limited, and care must centre on the patient.',
        fig: { type: 'boxes', t: 'Six reasons (slide 12)', rows: [{ cells: [['🧩 Complex information', 'c0'], ['⏱️ Time sensitivity', 'c2'], ['❓ Uncertainty', 'c3']] }, { cells: [['⚠️ High consequences', 'bad'], ['🛏️ Resource constraints', 'c5'], ['💛 Human-centred care', 'c1']] }], cap: 'If Netflix gets it wrong you lose two hours. If a hospital AI misses sepsis, a patient may die.' },
        html: `
<p>Using AI in a hospital is harder than recommending films on Netflix. Slide 12 gives six reasons — learn them as a list:</p>
<ol>
  <li><b>Complex information</b> — many data types, from lab values to free-text notes and images.</li>
  <li><b>Time sensitivity</b> — some decisions must be made in minutes.</li>
  <li><b>Uncertainty</b> — symptoms are vague, evidence incomplete.</li>
  <li><b>High consequences</b> — a mistake can harm or kill a person.</li>
  <li><b>Resource constraints</b> — limited staff, beds, money and time.</li>
  <li><b>Human-centred care</b> — patients' values, fears and preferences matter.</li>
</ol>
<div class="callout"><b>💡 Compare:</b> if Netflix recommends a bad film you lose two hours. If a hospital AI misses sepsis, a patient may die. That's why healthcare AI needs much more validation and human oversight.</div>`,
        check: { q: 'Which is NOT one of the lecture\'s reasons why healthcare is different?', o: ['Healthcare data is usually simple and complete', 'High consequences', 'Time sensitivity', 'Human-centred care'], why: 'The six reasons are complex information, time sensitivity, uncertainty, high consequences, resource constraints and human-centred care.' },
      },
      {
        t: 'What AI cannot guarantee — and how to use it responsibly',
        key: 'AI <b>cannot guarantee</b> a correct diagnosis, better outcomes everywhere, fair results for everyone, or savings. The human keeps the <b>professional responsibility</b>.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '🚫', t: 'AI cannot guarantee', pts: ['a correct diagnosis every time', 'better outcomes in every setting', 'unbiased results for every population', 'full understanding of a patient', 'automatic cost savings', 'the end of human error or responsibility'], c: 'c4' }, { icon: '✅', t: 'So responsible use needs', pts: ['good data and validation', 'testing in the intended clinical setting', 'a human who checks and decides'], c: 'c1' }] },
        html: `
<p>AI <b>cannot guarantee</b> (slide 14):</p>
<ul>
  <li>a correct diagnosis every time,</li>
  <li>better outcomes in every setting,</li>
  <li>unbiased results for every population,</li>
  <li>full understanding of a patient,</li>
  <li><b>automatic</b> cost savings,</li>
  <li>the end of human error or professional responsibility.</li>
</ul>
<p>So responsible use needs:</p>
<ul>
  <li><b>data quality and validation</b> (week 3),</li>
  <li><b>evaluation in the intended clinical setting</b> — a tool that works in one hospital may fail in another,</li>
  <li><b>privacy protection</b>,</li>
  <li><b>human oversight</b> where necessary (week 4),</li>
  <li><b>continuous monitoring</b> after it goes live.</li>
</ul>
<div class="callout warn"><b>📝 Exam tip:</b> any answer with "AI <i>always</i> / <i>guarantees</i> / <i>automatically</i> / <i>removes responsibility</i>" is almost certainly wrong.</div>`,
        lab: { href: 'w1/manager.html', todo: [
          'Read the hospital\'s problems at the top. Pick <b>three</b> AI projects you think would help most.',
          'For each one, decide whether it may act <b>without human approval</b>.',
          'Click <b>Submit plan to the board</b> and read the review: which area each project belongs to, what it can and cannot guarantee, and whether you fell for the red-flag project.',
        ] },
        check: { q: 'A vendor says: "Our AI will automatically cut your costs and remove diagnostic errors." According to the lecture…', o: ['Both claims are things AI cannot guarantee', 'Both are true if the model is accurate', 'Cost savings are guaranteed, error removal is not', 'Error removal is guaranteed, cost savings are not'], why: 'Slide 14 lists automatic cost reduction and the end of human error/responsibility among things AI cannot guarantee.' },
      },
    ],
  },

  /* ================================================================ */
  2: {
    goal: 'Name the six AI technology families and the job each does, explain how machine learning learns, read sensitivity/specificity/PPV, spot NLP and vision pitfalls, use generative AI safely, and recite the healthcare AI lifecycle.',
    time: '≈ 90 min',
    videos: [
      ['machine learning in plain words', 'machine learning explained simply for beginners'],
      ['supervised vs unsupervised vs reinforcement learning', 'supervised unsupervised reinforcement learning explained'],
      ['what a neural network / deep learning is', '3Blue1Brown but what is a neural network'],
      ['sensitivity and specificity', 'sensitivity specificity PPV NPV explained simply'],
      ['how LLMs hallucinate', 'why do large language models hallucinate explained'],
    ],
    steps: [
      {
        t: 'AI is an umbrella: six technology families',
        key: '"AI" is an <b>umbrella</b> over six families. Deep learning sits <b>inside</b> machine learning, and modern NLP and vision mostly use deep learning.',
        fig: { type: 'compare', cols: [{ icon: '📈', t: 'Machine learning', pts: ['readmission risk'], c: 'c0' }, { icon: '🧠', t: 'Deep learning', pts: ['reading X-ray pixels'], c: 'c3' }, { icon: '📝', t: 'NLP', pts: ['diagnoses from notes'], c: 'c1' }, { icon: '🩻', t: 'Computer vision', pts: ['lesion on a scan'], c: 'c5' }, { icon: '🦾', t: 'Robotics', pts: ['surgery, deliveries'], c: 'c2' }, { icon: '✍️', t: 'Generative AI', pts: ['drafting a discharge letter'], c: 'c4' }] },
        html: `
<p>"AI" is not one technology. It is an <b>umbrella term</b>. A system may <b>classify, predict, generate, recommend or act</b> — and each capability carries different risks. <b>Start with the problem, not the tool.</b></p>
<table class="t">
  <tr><th>Family</th><th>Its job in one line</th><th>Healthcare example</th></tr>
  <tr><td><b>Machine learning (ML)</b></td><td>Learns patterns from examples to predict</td><td>Readmission risk</td></tr>
  <tr><td><b>Deep learning (DL)</b></td><td>ML with many-layer neural networks, for raw complex data</td><td>Reading X-ray pixels</td></tr>
  <tr><td><b>Natural language processing (NLP)</b></td><td>Understands and extracts information from text</td><td>Pulling diagnoses out of doctors' notes</td></tr>
  <tr><td><b>Computer vision (CV)</b></td><td>Interprets images and video</td><td>Finding a lesion on a scan</td></tr>
  <tr><td><b>Robotics</b></td><td>Senses, plans and physically acts</td><td>Surgical assistance, delivery robots</td></tr>
  <tr><td><b>Generative AI</b></td><td>Creates new content (text, images)</td><td>Drafting a discharge letter</td></tr>
</table>
<div class="callout"><b>💡 Note:</b> they overlap. Deep learning is a <i>subset</i> of machine learning, and modern NLP and vision mostly use deep learning.</div>`,
        check: { q: 'A hospital wants to turn free-text doctors\' notes into a list of diagnoses. Which family fits best?', o: ['Natural language processing', 'Robotics', 'Computer vision', 'Reinforcement learning'], why: 'NLP turns messy free text into structured information.' },
      },
      {
        t: 'How machine learning learns',
        key: 'Normal software follows rules a person wrote. Machine learning <b>learns the rules from past examples</b> by reducing its error, and then predicts for new patients.',
        fig: { type: 'flow', t: 'The ML pipeline (slides 6–7)', items: [['🗃️', 'Inputs', '10,000 past patient records', 'c0'], ['🔧', 'Training', 'adjust parameters to reduce the error (loss)', 'c2'], ['🔮', 'Output', 'a prediction, probability or ranking', 'c1'], ['🧑‍⚕️', 'Human use', 'a clinician decides', 'c3']] },
        html: `
<p>Traditional software follows <b>rules a person wrote</b>. Machine learning <b>learns the rules from examples</b>.</p>
<p>The ML pipeline (slides 6–7):</p>
<ol>
  <li><b>Inputs</b> — past examples, e.g. 10,000 patient records with age, diagnoses, lab values.</li>
  <li><b>Training</b> — the model adjusts its internal numbers (<b>parameters</b>) to reduce its <b>error</b> (also called <b>loss</b>) on those examples.</li>
  <li><b>Output</b> — a prediction, a probability, a ranking or a class. <b>Not a guaranteed truth.</b></li>
  <li><b>Deployment with monitoring</b> — used in practice, and watched in case it stops working.</li>
</ol>
<div class="callout warn"><b>⚠ Prediction ≠ diagnosis.</b> "This patient has a 30% risk of readmission" is an estimate, not a fact about this patient.</div>
<h3>Three ways to learn</h3>
<table class="t">
  <tr><th>Setup</th><th>What the data looks like</th><th>Example</th></tr>
  <tr><td><b>Supervised</b></td><td>Examples <i>with the correct answer</i> (label)</td><td>Past patients + "readmitted yes/no" → predict for new patients</td></tr>
  <tr><td><b>Unsupervised</b></td><td>No answers; find structure</td><td>Group similar patients into segments</td></tr>
  <tr><td><b>Reinforcement</b></td><td>Actions + feedback (reward)</td><td>Learning a care pathway in a simulation — real use needs caution</td></tr>
</table>`,
        check: { q: 'You have records of past patients, each labelled "readmitted within 30 days: yes/no". You train a model to predict this for new patients. This is…', o: ['supervised learning', 'unsupervised learning', 'reinforcement learning', 'generative AI'], why: 'Known outcomes (labels) → supervised.' },
      },
      {
        t: 'Accuracy is not the whole story',
        key: 'Always ask two questions. Of the truly sick, <b>how many did we catch</b> (sensitivity)? Of the healthy, <b>how many did we leave alone</b> (specificity)?',
        fig: { type: 'boxes', t: '100 patients: 10 truly sick, 90 healthy', head: ['', 'truly sick (10)', 'truly healthy (90)'], rows: [{ label: 'flagged', cells: [['8 true positives', 'ok'], ['4 false alarms', 'warn']] }, { label: 'not flagged', cells: [['2 missed!', 'bad'], ['86 true negatives', 'ok']] }], cap: 'Sensitivity = 8/10 = 80%. Specificity = 86/90 ≈ 96%.' },
        html: `
<p>Imagine a test for a disease in <b>100 patients</b>: 10 are truly sick, 90 are healthy. The model flags 12 patients: 8 of them sick, 4 healthy.</p>
<table class="t">
  <tr><th></th><th>Truly sick (10)</th><th>Truly healthy (90)</th></tr>
  <tr><td><b>Flagged</b></td><td>8 = true positives</td><td>4 = false positives (false alarms)</td></tr>
  <tr><td><b>Not flagged</b></td><td>2 = false negatives (missed!)</td><td>86 = true negatives</td></tr>
</table>
<ul>
  <li><b>Sensitivity</b> — of the truly sick, how many were flagged? 8/10 = <b>80%</b>.</li>
  <li><b>Specificity</b> — of the healthy, how many were cleared? 86/90 = <b>96%</b>.</li>
  <li><b>PPV</b> (positive predictive value) — of the alerts, how many were real? 8/12 = <b>67%</b>.</li>
  <li><b>Calibration</b> — when the model says "20% risk", do about 20 of 100 such patients really have the event?</li>
</ul>
<div class="callout"><b>💡 Memory hook:</b> sensitivity starts from the <b>sick</b> people; specificity starts from the healthy ones; PPV starts from the <b>alerts</b>.</div>
<p>Choosing the <b>threshold</b> (how high the score must be to alert) is a trade-off: lower threshold → fewer misses but more false alarms. Week 4 goes deeper, with a lab.</p>`,
        check: { q: 'Of 50 alerts a model raised, 20 were real cases. Which number is 20/50 = 40%?', o: ['PPV', 'Sensitivity', 'Specificity', 'Calibration'], why: 'PPV starts from the alerts: of those flagged, how many truly have the condition.' },
      },
      {
        t: 'Deep learning',
        key: 'Deep learning uses neural networks with <b>many layers</b>. Each layer sees something more abstract, from raw pixels up to "a lesion".',
        fig: { type: 'flow', items: [['🔲', 'Pixels', 'raw input', 'mute'], ['📐', 'Edges', 'layer 1', 'c0'], ['🔷', 'Shapes', 'middle layers', 'c3'], ['🎯', '"A lesion"', 'last layer', 'c4']], cap: '✅ Works on raw data (images, audio, ECG, text). ❌ Needs lots of data and computing power, and is hard to explain.' },
        html: `
<p><b>Deep learning</b> is a subset of machine learning that uses <b>neural networks with many layers</b>. Each layer learns a slightly more abstract representation of the input:</p>
<p style="text-align:center"><code>pixels → edges → shapes → "a lesion"</code></p>
<ul>
  <li><b>Strength:</b> works directly on raw, complex data — pixels, audio, text, signals such as ECGs. Excellent with large datasets.</li>
  <li><b>Weaknesses:</b> needs <b>lots of data and computing power</b>, and is often <b>harder to explain</b> ("black box").</li>
</ul>
<div class="callout"><b>💡 Think of it like this:</b> ordinary ML is given ready-made features by people ("age", "blood pressure"). Deep learning learns its own features from raw data.</div>`,
        check: { q: 'Which is a typical limitation of deep learning mentioned in the lecture?', o: ['It is often harder to explain and needs more data and compute', 'It can only use structured tables', 'It cannot handle images', 'It never needs validation'], why: 'DL excels with large complex data but is often harder to explain and needs more data and compute.' },
      },
      {
        t: 'NLP: reading clinical text',
        key: 'NLP turns free-text notes into structured data. The trap is <b>context</b>: a word can appear in a note even though the patient does <b>not</b> have it.',
        fig: { type: 'boxes', head: ['Sentence in the note', 'Naive keyword reader', 'Correct meaning'], rows: [{ cells: [['"No evidence of pneumonia"', ''], ['pneumonia ✗', 'bad'], ['negated: does NOT have it', 'ok']] }, { cells: [['"Mother has diabetes"', ''], ['diabetes ✗', 'bad'], ['family history, not the patient', 'ok']] }] },
        html: `
<p>Most clinical information is written as free text: notes, letters, reports. <b>NLP</b> turns it into structured data (symptoms, diagnoses, medications).</p>
<p>The hard part is that the <b>same word can mean opposite things</b> depending on context:</p>
<table class="t">
  <tr><th>Sentence</th><th>Naive keyword reader says</th><th>Correct meaning</th></tr>
  <tr><td>"No evidence of pneumonia"</td><td>pneumonia ✗</td><td><b>negated</b> — the patient does NOT have it</td></tr>
  <tr><td>"Mother has diabetes"</td><td>diabetes ✗</td><td><b>family member</b>, not the patient</td></tr>
  <tr><td>"History of tuberculosis in 2010"</td><td>tuberculosis (now) ✗</td><td><b>historical</b>, not current</td></tr>
  <tr><td>"Possible pneumonia, rule out"</td><td>pneumonia ✗</td><td><b>uncertain</b></td></tr>
</table>
<p>NLP must handle <b>entities, negation, time and context</b>. Its errors are subtle — and they travel downstream into alerts, research cohorts and billing.</p>`,
        lab: { href: 'w2/nlp.html', todo: [
          'Load a few preset notes. For each concept, choose your own answer first (present / negated / historical / uncertain / family) and click <b>Check my answers</b>.',
          'Compare the <b>naive</b> output with the <b>context-aware</b> one. Note which words (cue words like "denies", "no", "mother") change the meaning.',
          'Load the two <b>tricky</b> notes: even the smarter rules fail. That\'s why NLP output must be checked.',
        ] },
        check: { q: 'An NLP system stores "denies chest pain" as "chest pain: present". Which aspect did it miss?', o: ['Negation', 'Family history', 'Time (historical)', 'Image segmentation'], why: '"Denies" is a negation cue.' },
      },
      {
        t: 'Computer vision: what, where, which pixels',
        key: 'Three vision tasks, three questions about the same X-ray: <b>what</b> is there (classification), <b>where</b> (detection), <b>which exact pixels</b> (segmentation).',
        fig: { type: 'compare', cols: [{ icon: '🏷️', t: 'Classification', pts: ['What is present?', '→ "Lesion: yes"'], c: 'c0' }, { icon: '🔲', t: 'Detection', pts: ['Where is it?', '→ a box around it'], c: 'c2' }, { icon: '✏️', t: 'Segmentation', pts: ['Which exact pixels?', '→ its outline'], c: 'c1' }] },
        html: `
<p>Computer vision has three main tasks (slide 15). Same chest X-ray, three different questions:</p>
<table class="t">
  <tr><th>Task</th><th>Question</th><th>Output</th></tr>
  <tr><td><b>Classification</b></td><td>What is present?</td><td>"Lesion: yes"</td></tr>
  <tr><td><b>Detection</b></td><td>Where is it?</td><td>A box around the lesion</td></tr>
  <tr><td><b>Segmentation</b></td><td>Which exact pixels?</td><td>The outline of the lesion</td></tr>
</table>
<p>Performance depends on the <b>whole pipeline</b>: acquire images → label them → train → <b>validate on independent, diverse data</b> → a clinician reviews the output.</p>
<div class="callout warn"><b>⚠ The second-hospital problem (slide 16):</b> a model trained at one hospital may fail at another because of <b>device differences</b> (another scanner brand, brightness, contrast) or <b>population shift</b> (different patients).</div>`,
        lab: { href: 'w2/vision.html', todo: [
          'Click <b>New scan</b> a few times and compare the three panels: classification, detection, segmentation.',
          'Under "Validate the model", keep <b>Train on Hospital A</b> and test on <b>Hospital A</b>, then <b>B</b>, then <b>C</b>. Watch the red borders appear at B and C.',
          'Click <b>Re-train with Hospital B data</b> and test B again. Lesson: validate (and if needed re-train) at every new site.',
        ] },
        check: { q: 'A tool draws the exact outline of a tumour, pixel by pixel. Which task is this?', o: ['Segmentation', 'Classification', 'Detection', 'Generation'], why: 'Segmentation = which pixels. Detection = where (a box). Classification = what.' },
      },
      {
        t: 'Robotics',
        key: 'A robot is an AI agent <b>with a body</b>: it senses, plans, controls and physically acts.',
        fig: { type: 'compare', cols: [{ icon: '🔪', t: 'Surgical assistance', pts: ['precise, surgeon-guided'], c: 'c4' }, { icon: '📦', t: 'Hospital logistics', pts: ['medicines, samples, linen'], c: 'c2' }, { icon: '🦿', t: 'Rehabilitation', pts: ['exoskeletons, therapy'], c: 'c1' }, { icon: '🤖', t: 'Social / assistive', pts: ['companionship, reminders'], c: 'c3' }] },
        html: `
<p>A robot combines <b>sensing, planning, control and mechanical action</b> — an AI agent with a body.</p>
<ul>
  <li><b>Surgical assistance</b> — precise instrument control, guided by the surgeon.</li>
  <li><b>Hospital logistics</b> — carrying medicines, samples, linen.</li>
  <li><b>Rehabilitation</b> — exoskeletons, therapy devices.</li>
  <li><b>Social / assistive robots</b> — companionship, reminders for older people.</li>
</ul>
<p>The hard parts are not only technical: <b>physical safety</b>, <b>fit with the workflow</b> and <b>human factors</b> (will staff and patients accept and use it correctly?).</p>`,
      },
      {
        t: 'Generative AI: fluent is not the same as true',
        key: 'Generative AI writes beautifully, but <b>fluent is not the same as true</b>. A human must always <b>review</b> the output before it is used.',
        fig: { type: 'flow', items: [['💬', 'Prompt', '', 'c0'], ['🤖', 'Model', '', 'c3'], ['📄', 'Output', 'reads very well…', 'c2'], ['🧑‍⚕️', 'Human review', 'check facts, context, patient details', 'c1']], cap: 'The three risks: hallucination (invented facts), missing context, and automation bias (trusting it too much).' },
        html: `
<p><b>Generative AI</b> (like ChatGPT) creates new content. The pattern: <code>prompt → model → output → human review</code>.</p>
<p>Its output reads beautifully — but <b>fluent output is not proof of accuracy</b>. The three risks:</p>
<ul>
  <li><b>Hallucination</b> — it invents facts, tests, references or policies that don't exist.</li>
  <li><b>Missing context</b> — it ignores patient-specific details or uncertainty.</li>
  <li><b>Automation bias</b> — humans trust it too much and stop checking.</li>
</ul>
<h3>The safer pattern — learn the 5 steps in order</h3>
<ol>
  <li><b>Constrain the task</b> (a narrow, clear job)</li>
  <li><b>Use trusted sources</b> (the patient record, guidelines)</li>
  <li><b>Request uncertainty</b> (ask it to say what it isn't sure about)</li>
  <li><b>Verify key claims</b></li>
  <li><b>Document human review</b></li>
</ol>`,
        lab: { href: 'w2/verify.html', todo: [
          'Read the patient record on the left — that\'s the truth.',
          'Go through the AI draft sentence by sentence and label each one: supported / contradicts the record / hallucination / missing context.',
          'Click <b>Check my review</b>. Did you catch the invented CT scan, the wrong antibiotic, the "no allergies" claim and the fake guideline?',
        ] },
        check: { q: 'An AI-written letter cites a hospital policy that does not exist. This is…', o: ['a hallucination', 'a calibration error', 'segmentation', 'negation'], why: 'A fabricated fact, test, reference or policy is a hallucination.' },
      },
      {
        t: 'The healthcare AI lifecycle & responsible AI',
        key: 'Every project goes <b>Need → Data → Develop → Validate → Implement → Monitor</b>, and back to the start. Memory hook: "Never Do Dangerous Validations In Medicine".',
        fig: [{ type: 'flow', items: [['❓', 'Define need', '', 'c0'], ['🗃️', 'Assess data', '', 'c3'], ['🔧', 'Develop', '', 'c2'], ['✅', 'Validate', '', 'c1'], ['🏥', 'Implement', '', 'c5'], ['📡', 'Monitor', '↺ back to start', 'c4']] }, { type: 'boxes', t: 'Six responsible-AI questions', rows: [{ cells: [['Safety & effectiveness', 'c1'], ['Fairness', 'c0'], ['Privacy & security', 'c3']] }, { cells: [['Transparency', 'c5'], ['Accountability', 'c2'], ['Human oversight', 'c4']] }] }],
        html: `
<p>Every healthcare AI project follows a lifecycle (learn the order):</p>
<p style="text-align:center"><b>Define need → Assess data → Develop → Validate → Implement → Monitor</b> (and back to the start)</p>
<div class="callout"><b>💡 Memory hook:</b> "<b>N</b>ever <b>D</b>o <b>D</b>angerous <b>V</b>alidations <b>I</b>n <b>M</b>edicine" → Need, Data, Develop, Validate, Implement, Monitor.</div>
<p><b>Responsible AI</b> asks six questions about every system:</p>
<ol>
  <li><b>Safety &amp; effectiveness</b> — does it work and do no harm?</li>
  <li><b>Fairness</b> — does it work equally well for all groups?</li>
  <li><b>Privacy &amp; security</b> — is the data protected?</li>
  <li><b>Transparency</b> — can users understand what it does?</li>
  <li><b>Accountability</b> — who is responsible when it goes wrong?</li>
  <li><b>Human oversight</b> — can a person check and override it?</li>
</ol>`,
        check: { q: 'Which step comes directly after "Validate" in the lifecycle?', o: ['Implement', 'Develop', 'Assess data', 'Define need'], why: 'Define need → assess data → develop → validate → implement → monitor.' },
      },
    ],
  },

  /* ================================================================ */
  3: {
    goal: 'Explain EHRs and how data flows through them, tell structured from unstructured data, name the Vs of big data and the six data-quality dimensions, explain bias and privacy risks, the four interoperability levels and the main standards, and the four levels of analytics.',
    time: '≈ 80 min',
    videos: [
      ['what an electronic health record is', 'electronic health record EHR explained'],
      ['data quality dimensions', 'six dimensions of data quality explained'],
      ['HL7 FHIR in plain words', 'HL7 FHIR explained simply'],
      ['interoperability in healthcare', 'healthcare interoperability levels explained'],
      ['descriptive predictive prescriptive analytics', 'descriptive diagnostic predictive prescriptive analytics explained'],
    ],
    steps: [
      {
        t: 'AI is only as good as its data',
        key: '<b>Garbage in, garbage out.</b> The challenge is not <i>more</i> data, but data that is trustworthy, usable and responsibly governed.',
        fig: { type: 'flow', items: [['🗑️', 'Incomplete or wrong data', '', 'bad'], ['🤖', 'AI model', 'learns from it', 'mute'], ['⚠️', 'Unreliable output', 'wrong alerts, unfair results', 'bad']] },
        html: `
<p>AI learns from data. If the inputs are incomplete or misleading, the outputs are unreliable — <i>"garbage in, garbage out."</i></p>
<div class="callout"><b>💡 Key message:</b> the challenge is not <i>more</i> data, but data that is <b>trustworthy, usable and responsibly governed</b>.</div>
<p>Types of healthcare data:</p>
<ul>
  <li><b>Clinical</b> — diagnoses, vital signs, lab results, medications.</li>
  <li><b>Administrative</b> — admissions, billing, appointments.</li>
  <li><b>Imaging &amp; signals</b> — X-rays, CT, ECG.</li>
  <li><b>Patient-generated</b> — wearables, home blood-pressure readings, apps.</li>
  <li><b>Omics &amp; research</b> — genetic data, trial data.</li>
  <li><b>Contextual</b> — social determinants of health (housing, income…), only where lawfully collected.</li>
</ul>`,
      },
      {
        t: 'Electronic health records (EHR)',
        key: 'An <b>EMR</b> lives inside one hospital. An <b>EHR</b> follows the patient <b>across organisations over time</b>. A scanned paper chart is neither: it is just a picture.',
        fig: [{ type: 'compare', cols: [{ icon: '🏥', t: 'EMR', pts: ['one organisation\'s record'], c: 'c0' }, { icon: '🌐', t: 'EHR', pts: ['longitudinal, across organisations and care settings'], c: 'c1' }, { icon: '📷', t: 'Scanned paper chart', pts: ['❌ not an EHR', 'the computer cannot read the values'], c: 'c4' }] }, { type: 'flow', t: 'How data moves through an EHR (errors travel downstream!)', items: [['✍️', 'Capture', '', 'c0'], ['📏', 'Standardise', '', 'c3'], ['🗄️', 'Store & link', '', 'c5'], ['📤', 'Exchange', '', 'c2'], ['🩺', 'Use', '', 'c1'], ['🔄', 'Update', '', 'c4']] }],
        html: `
<p>An <b>EHR</b> is a digital record of a patient's health information <b>across encounters and care settings</b> — a long-term view of the patient.</p>
<table class="t">
  <tr><th>Term</th><th>Meaning</th></tr>
  <tr><td><b>EMR</b> (electronic medical record)</td><td>Usually a record <b>inside one organisation</b> (one hospital's system)</td></tr>
  <tr><td><b>EHR</b> (electronic health record)</td><td>A <b>broader, longitudinal</b> view across organisations</td></tr>
  <tr><td>A scanned paper chart</td><td><b>Not</b> an EHR — it is just a picture; the computer can't use the data</td></tr>
</table>
<h3>How data moves through an EHR</h3>
<p style="text-align:center"><b>Capture → Standardise → Store &amp; link → Exchange → Use → Update</b></p>
<div class="callout warn"><b>⚠ Errors travel downstream.</b> If a lab result is linked to the wrong patient, or a medication change is never recorded, every later step — alerts, AI models, reports — inherits the error.</div>`,
        check: { q: 'Which is true?', o: ['An EHR gives a broader longitudinal view; an EMR is usually within one organisation', 'An EMR is broader than an EHR', 'A scanned paper chart is an EHR', 'EHR data never contains errors'], why: 'EMR = one organisation; EHR = across encounters and settings. A scanned chart is not an EHR.' },
      },
      {
        t: 'Structured vs unstructured data, and big data',
        key: '<b>Structured</b> data fits fixed fields (BP 120/80). <b>Unstructured</b> data is free form (notes, images). <b>Semi-structured</b> has some tags (XML/JSON messages).',
        fig: { type: 'compare', cols: [{ icon: '🔢', t: 'Structured', pts: ['blood pressure 120/80', 'coded diagnosis', 'date of birth'], c: 'c1' }, { icon: '🏷️', t: 'Semi-structured', pts: ['tagged messages (XML / JSON)'], c: 'c2' }, { icon: '📝', t: 'Unstructured', pts: ['doctor\'s notes', 'discharge summaries', 'scan images'], c: 'c4' }] },
        html: `
<table class="t">
  <tr><th>Type</th><th>Meaning</th><th>Examples</th></tr>
  <tr><td><b>Structured</b></td><td>Fits predefined fields</td><td>Blood pressure 120/80, a coded diagnosis, date of birth</td></tr>
  <tr><td><b>Unstructured</b></td><td>Free form</td><td>Doctor's notes, discharge summaries, scan images</td></tr>
  <tr><td><b>Semi-structured</b></td><td>Some tags / structure</td><td>Tagged messages (e.g. XML/JSON messages)</td></tr>
</table>
<p>NLP can extract information from unstructured text — but its errors must be checked (week 2).</p>
<h3>The Vs of big data</h3>
<ul>
  <li><b>Volume</b> — how much (terabytes of images).</li>
  <li><b>Velocity</b> — how fast it arrives (ICU monitors every second).</li>
  <li><b>Variety</b> — how many kinds (numbers, text, images, signals).</li>
  <li><b>Veracity</b> — how trustworthy it is.</li>
  <li><b>Value</b> — is it useful for a decision?</li>
</ul>
<div class="callout"><b>💡</b> Volume, velocity, variety, veracity = the classic 4 Vs; value is the fifth.</div>`,
        check: { q: 'Monitors in the ICU send readings every second. Which V is this mainly about?', o: ['Velocity', 'Veracity', 'Variety', 'Value'], why: 'Velocity = the speed data arrives.' },
      },
      {
        t: 'Making an AI-ready dataset',
        key: 'Raw hospital data is <b>not</b> ready for AI. Define the question first, then source, document, clean and check the data, and keep monitoring it.',
        fig: { type: 'flow', items: [['❓', 'Define the question', 'predict what, for whom?', 'c0'], ['⚖️', 'Lawful, relevant sources', '', 'c3'], ['🧾', 'Document provenance', 'where it came from', 'c5'], ['🧹', 'Clean and harmonise', 'units, codes, duplicates', 'c2'], ['🕳️', 'Handle missingness', 'missing is not random!', 'c4'], ['🔁', 'Version and monitor', '', 'c1']] },
        html: `
<p>Raw hospital data is not ready for AI. The steps:</p>
<ol>
  <li><b>Define the question first</b> — what exactly do we want to predict, for whom?</li>
  <li><b>Identify lawful, relevant sources.</b></li>
  <li><b>Document provenance</b> — where each piece of data came from.</li>
  <li><b>Clean and harmonise</b> — same units, same codes, remove duplicates.</li>
  <li><b>Handle missingness carefully</b> — missing data is <i>not random</i>. (A test may be missing because the doctor thought the patient was healthy — that itself is information.)</li>
  <li><b>Version and monitor</b> the dataset.</li>
</ol>`,
      },
      {
        t: 'The six dimensions of data quality',
        key: 'Learn the <b>six dimensions</b> of data quality, each with one example. They are very likely exam questions.',
        fig: { type: 'boxes', head: ['Dimension', 'Example of a problem'], rows: [{ cells: [['🎯 Accuracy', 'c0'], ['temperature recorded as 410 °C', '']] }, { cells: [['🧩 Completeness', 'c1'], ['allergy field left empty', '']] }, { cells: [['🔗 Consistency', 'c2'], ['kg in system A, pounds in system B', '']] }, { cells: [['⏰ Timeliness', 'c3'], ['vital signs from 9 hours ago used for a decision now', '']] }, { cells: [['✅ Validity', 'c5'], ['date "31/02/2026"; an invalid diagnosis code', '']] }, { cells: [['🪞 Uniqueness', 'c4'], ['the same patient registered twice', '']] }], cap: 'Memory hook: "A Cat Can Take Very Unusual naps".' },
        html: `
<p>Learn these six with one example each — they are very likely exam questions:</p>
<table class="t">
  <tr><th>Dimension</th><th>Question</th><th>Example of a problem</th></tr>
  <tr><td><b>Accuracy</b></td><td>Does it reflect reality?</td><td>Temperature recorded as 410 °C; result linked to the wrong patient</td></tr>
  <tr><td><b>Completeness</b></td><td>Are required fields present?</td><td>Allergy field left empty</td></tr>
  <tr><td><b>Consistency</b></td><td>Do values agree across records and systems?</td><td>System A records weight in kg, system B in pounds</td></tr>
  <tr><td><b>Timeliness</b></td><td>Is it current enough for the decision?</td><td>Vital signs from 9 hours ago used for a decision now</td></tr>
  <tr><td><b>Validity</b></td><td>Right format, range or code set?</td><td>Date "31/02/2026"; an invalid diagnosis code</td></tr>
  <tr><td><b>Uniqueness</b></td><td>Any duplicates?</td><td>The same patient registered twice</td></tr>
</table>
<div class="callout"><b>💡 Memory hook:</b> "<b>A C</b>at <b>C</b>an <b>T</b>ake <b>V</b>ery <b>U</b>nusual naps" → Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness.</div>`,
        lab: { href: 'w3/quality.html', todo: [
          'Read the note at the top: system A records weight in kg, system B in lb.',
          'Click every cell that looks suspicious and choose the dimension it breaks. There are <b>9</b> problems.',
          'Try to find all 9 before using <b>Reveal remaining problems</b>.',
        ] },
        check: { q: 'The same patient appears twice with two different record numbers. Which dimension is violated?', o: ['Uniqueness', 'Timeliness', 'Validity', 'Accuracy'], why: 'Duplicates violate uniqueness.' },
      },
      {
        t: 'Bias and privacy',
        key: 'Models learn <b>old inequalities</b> from historical data. A <b>proxy</b> like past spending can make groups who had less access look healthier than they are.',
        fig: { type: 'flow', t: 'How a proxy creates bias', items: [['🚪', 'Group had less access to care', '', 'c3'], ['💸', 'So they spent less', '', 'c2'], ['📉', 'Model uses spending as "need"', '', 'c4'], ['⚠️', 'They look healthier, so they get less help', '', 'bad']] },
        html: `
<h3>Where bias comes from</h3>
<ul>
  <li><b>Historical data reflects past gaps</b> in access and documentation — the model learns old inequalities.</li>
  <li><b>Under-represented groups</b> get worse performance (too few examples to learn from).</li>
  <li><b>Proxies can encode inequity</b> — e.g. using past healthcare <i>spending</i> as a proxy for <i>need</i>: groups who had less access spent less, so they look "healthier" than they are.</li>
  <li><b>Missingness can be systematic</b> — some groups have more missing data.</li>
</ul>
<h3>Privacy safeguards</h3>
<ul>
  <li>A <b>lawful basis</b> for using the data, and <b>data minimisation</b> (only what's needed).</li>
  <li><b>Access control</b>, <b>encryption</b>, <b>audit logs</b>.</li>
</ul>
<div class="callout warn"><b>⚠ Trap:</b> "de-identified" data (name removed) can still be <b>re-identified by linkage</b> — combining it with other data such as postcode + birth date + sex.</div>`,
        check: { q: 'Is removing names enough to make health data safe from re-identification?', o: ['No — it can be re-identified by linking it with other data', 'Yes, always', 'Yes, if the dataset is large', 'Only images can be re-identified'], why: 'De-identified data can be re-identified through linkage.' },
      },
      {
        t: 'Interoperability: can systems understand each other?',
        key: 'Interoperability means systems can <b>exchange</b> data and <b>use</b> it. It has four levels; data arriving (technical) is only the first.',
        fig: { type: 'stack', t: 'Four levels (analogy: sending a letter)', items: [['4. Organisational', 'policies, trust: everyone agrees who acts on the letter', 'c4'], ['3. Semantic', 'shared meaning (codes, units): same language, same meaning', 'c2'], ['2. Syntactic', 'shared format: the same letter format', 'c0'], ['1. Technical', 'systems connect: the letter reaches the house', 'c1']], cap: 'Standards: HL7 v2 and FHIR for messages, SNOMED CT and others for meaning.' },
        html: `
<p><b>Interoperability</b> = systems can <b>exchange</b> data <b>and use</b> the information exchanged. Four levels, from bottom to top:</p>
<table class="t">
  <tr><th>Level</th><th>Meaning</th><th>Analogy: sending a letter</th></tr>
  <tr><td><b>1. Technical</b></td><td>The systems connect; data arrives</td><td>The letter reaches the right house</td></tr>
  <tr><td><b>2. Syntactic</b></td><td>Shared structure/format</td><td>Both use the same letter format</td></tr>
  <tr><td><b>3. Semantic</b></td><td>Shared <i>meaning</i> (codes, units)</td><td>Both speak the same language and mean the same by each word</td></tr>
  <tr><td><b>4. Organisational</b></td><td>Policies, trust, agreed workflows</td><td>Everyone agrees who acts on the letter</td></tr>
</table>
<h3>Standards to know</h3>
<table class="t">
  <tr><th>Standard</th><th>What it is for</th></tr>
  <tr><td><b>HL7 v2</b></td><td>Messaging between hospital systems (older, very common)</td></tr>
  <tr><td><b>HL7 FHIR</b></td><td>Modern "resources" (Patient, Observation…) exchanged via web APIs</td></tr>
  <tr><td><b>SNOMED CT</b></td><td>Clinical terminology (findings, diagnoses, procedures)</td></tr>
  <tr><td><b>LOINC</b></td><td>Codes for <b>lab tests and observations</b></td></tr>
  <tr><td><b>ICD</b></td><td>Classification of diseases (used for statistics and billing)</td></tr>
  <tr><td><b>DICOM</b></td><td>Medical <b>images</b></td></tr>
</table>
<div class="callout"><b>💡 Memory hooks:</b> <b>L</b>OINC = <b>L</b>ab; <b>D</b>ICOM = <b>D</b>iagnostic images; <b>I</b>CD = <b>I</b>llness classification; <b>F</b>HIR = <b>F</b>ast web exchange.</div>`,
        lab: { href: 'w3/interop.html', todo: [
          'Click <b>Send only "1.8"</b>. Read Hospital B\'s interpretation: it cannot know which test this is.',
          'Tick the fields one by one — test code, unit, reference range, time, patient — and watch the levels at the bottom turn green.',
          'Switch the format to <b>HL7 FHIR Observation</b> (syntactic level) and tick the <b>agreed procedure</b> box (organisational level). Try the potassium test: it\'s a critical value.',
        ] },
        check: { q: 'Two hospitals use the same message format, but one codes tests in LOINC and the other uses its own local names. Which level is missing?', o: ['Semantic', 'Technical', 'Syntactic', 'None'], why: 'Same structure (syntactic) but not shared meaning → semantic interoperability is missing.' },
      },
      {
        t: 'Four levels of analytics & evaluating AI',
        key: 'Analytics climbs four steps: <b>what happened → why → what will happen → what should we do</b>.',
        fig: { type: 'flow', items: [['📊', 'Descriptive', 'What happened? "wait was 3 h"', 'c0'], ['🔍', 'Diagnostic', 'Why? "two doctors on leave"', 'c3'], ['🔮', 'Predictive', 'What will happen? "+30% Monday"', 'c2'], ['🧭', 'Prescriptive', 'What should we do? "add a doctor"', 'c1']] },
        html: `
<table class="t">
  <tr><th>Level</th><th>Question</th><th>Example</th></tr>
  <tr><td><b>Descriptive</b></td><td>What happened?</td><td>"Average waiting time last month was 3 hours"</td></tr>
  <tr><td><b>Diagnostic</b></td><td>Why did it happen?</td><td>"Waits rose because two doctors were on leave"</td></tr>
  <tr><td><b>Predictive</b></td><td>What will happen?</td><td>"Next Monday we expect 30% more patients"</td></tr>
  <tr><td><b>Prescriptive</b></td><td>What should we do?</td><td>"Add one extra doctor on Monday morning"</td></tr>
</table>
<h3>How to evaluate an AI system</h3>
<ul>
  <li><b>Clinical validity</b> — does it measure something clinically meaningful?</li>
  <li><b>Discrimination (AUC)</b> — does it separate high-risk from low-risk patients?</li>
  <li><b>Calibration</b> — do its probabilities match reality?</li>
  <li><b>Clinical utility</b> — does using it improve care?</li>
  <li><b>External validation</b> — does it work at other sites?</li>
  <li><b>Monitoring</b> — does it keep working over time?</li>
</ul>
<div class="callout warn"><b>⚠ The accuracy trap:</b> for a rare condition (1 in 100), a model that always says "no" is 99% accurate — and completely useless. Week 4 shows this in a lab.</div>`,
        check: { q: '"Which action will reduce no-shows the most?" is which level of analytics?', o: ['Prescriptive', 'Descriptive', 'Diagnostic', 'Predictive'], why: 'Prescriptive = what action may help.' },
      },
    ],
  },

  /* ================================================================ */
  4: {
    goal: 'Explain what a CDSS is and its types, go from a prediction to an action, calculate and interpret sensitivity, specificity, PPV and NPV, explain why accuracy misleads, tell discrimination from calibration, and describe automation bias, oversight and responsible implementation.',
    time: '≈ 100 min',
    videos: [
      ['clinical decision support systems', 'clinical decision support system CDSS explained'],
      ['the confusion matrix', 'StatQuest confusion matrix'],
      ['sensitivity, specificity, PPV, NPV', 'sensitivity specificity positive predictive value prevalence explained'],
      ['ROC curve and AUC', 'StatQuest ROC and AUC clearly explained'],
      ['calibration of prediction models', 'calibration of clinical prediction models explained'],
      ['automation bias', 'automation bias healthcare explained'],
    ],
    steps: [
      {
        t: 'Clinical decisions and where AI fits',
        key: 'The value of AI depends on whether it <b>improves a decision</b>, not just whether it produces a prediction.',
        fig: { type: 'flow', items: [['🗂️', 'Information', 'symptoms, history, exam, tests, preferences', 'c0'], ['🧑‍⚕️', 'Clinician + AI', 'under uncertainty', 'c3'], ['✅', 'Decision', 'diagnosis, triage, treatment, discharge, referral', 'c1']] },
        html: `
<p>A clinical decision is <b>more than a diagnosis</b>. Clinicians combine symptoms, history, examination, tests, <b>patient preferences</b> and the care context — and decide about diagnosis, triage, treatment, monitoring, discharge and referral. <b>Uncertainty is unavoidable.</b></p>
<div class="callout"><b>💡 Key idea (slide 4):</b> the value of AI depends on whether it <b>improves a decision</b>, not simply whether it produces a prediction.</div>
<p>Where AI can enter the workflow (slide 5):</p>
<ul>
  <li><b>Before consultation</b> — summarise records, spot missing information, triage.</li>
  <li><b>During assessment</b> — relevant guidelines, possible diagnoses, drug interactions.</li>
  <li><b>After tests</b> — prioritise images/results, estimate risk.</li>
  <li><b>During treatment planning</b> — compare options, flag contraindications.</li>
  <li><b>After discharge</b> — who needs follow-up or remote monitoring.</li>
</ul>
<p>At every stage define: <b>the user, the decision, the time available, and the action the output triggers.</b></p>`,
      },
      {
        t: 'Clinical decision support systems (CDSS)',
        key: 'A CDSS gives <b>patient-specific</b> help at the moment of a decision: reminders, alerts, risk estimates. It can be <b>rules</b> (knowledge-based) or <b>learned</b> (non-knowledge-based).',
        fig: { type: 'compare', vs: true, cols: [{ icon: '📜', t: 'Knowledge-based', pts: ['rules from guidelines and experts', 'IF allergy = penicillin AND order = amoxicillin → alert'], c: 'c0' }, { icon: '📈', t: 'Non-knowledge-based', pts: ['patterns learned from data (ML)', 'a deterioration risk model'], c: 'c3' }], cap: 'Also: passive (you look it up) vs active (it pops up in the workflow), and patient-facing decision aids.' },
        html: `
<p>A <b>CDSS</b> gives <b>patient-specific</b> information to support a healthcare decision — reminders, alerts, risk estimates, ranked options. Classic example: the patient has a penicillin allergy → an alert appears before the prescription is completed.</p>
<table class="t">
  <tr><th>Type</th><th>How it works</th><th>Example</th></tr>
  <tr><td><b>Knowledge-based</b></td><td>Rules written from guidelines / experts</td><td>"IF allergy = penicillin AND order = amoxicillin THEN alert"</td></tr>
  <tr><td><b>Non-knowledge-based</b></td><td>Patterns <b>learned from data</b> (ML)</td><td>A deterioration risk model</td></tr>
  <tr><td><b>Passive</b></td><td>Available when the clinician looks for it</td><td>A guideline the doctor can open</td></tr>
  <tr><td><b>Active</b></td><td>Pops up at a point in the workflow</td><td>An interaction alert while prescribing</td></tr>
  <tr><td><b>Patient-facing</b></td><td>Helps patients</td><td>A decision aid app explaining treatment options</td></tr>
</table>
<p><b>Strengths:</b> consistency, timely reminders, less reliance on memory, access to evidence. <b>Limitations:</b> outdated rules, poor integration, incomplete records, recommendations that don't fit the patient — and <b>alert fatigue</b>: so many low-value alerts that staff stop paying attention to the important ones.</p>`,
        check: { q: 'A system uses rules written from clinical guidelines. It is a…', o: ['knowledge-based CDSS', 'non-knowledge-based CDSS', 'generative AI', 'patient-facing robot'], why: 'Knowledge-based = rules from guidelines/experts. Non-knowledge-based = learned from data.' },
      },
      {
        t: 'Predictive analytics: from prediction to action',
        key: 'A prediction <b>estimates risk</b>. It does not prove the event will happen or explain why. It only helps if it is <b>connected to an action</b>.',
        fig: { type: 'flow', t: 'From prediction to action: 6 steps (slide 10)', items: [['🎯', 'Define the target', 'ICU transfer in 24 h', 'c0'], ['⏱️', 'Prediction time', 'what was known then?', 'c3'], ['📈', 'Estimate risk', 'validated model', 'c5'], ['🎚️', 'Choose a threshold', 'benefits vs false alarms', 'c2'], ['🏃', 'Connect to a response', 'review, test, treat', 'c4'], ['📏', 'Measure outcomes', 'does the pathway improve?', 'c1']] },
        html: `
<p><b>Predictive analytics</b> estimates the likelihood of a future event: deterioration, readmission, complications, falls, missed appointments.</p>
<div class="callout warn"><b>⚠ A prediction estimates risk.</b> It does not prove the event will happen, and it does not explain the cause. The care team still decides what to do.</div>
<p>From prediction to action — 6 steps (slide 10):</p>
<ol>
  <li><b>Define the target</b> — what event, in which population, over what time? ("ICU transfer within 24 h, adult ward patients")</li>
  <li><b>Choose the prediction time</b> — what information was available at that moment?</li>
  <li><b>Estimate risk</b> with a validated model.</li>
  <li><b>Choose a threshold</b> — balancing benefits, harms, capacity, false alarms and misses.</li>
  <li><b>Connect the output to a response</b> — review, test, treatment, monitoring, or no action.</li>
  <li><b>Measure whether the whole pathway improves outcomes</b> — not just whether the model predicts well.</li>
</ol>
<div class="callout"><b>💡 Common failure:</b> a high-risk score with <b>no clear response pathway</b> only creates workload without improving care.</div>`,
        check: { q: 'A model flags high-risk patients, but nobody has agreed what to do with the flags. According to the lecture…', o: ['It creates workload without improving care', 'It is fine, because the model predicts well', 'It replaces the need for a threshold', 'It guarantees better outcomes'], why: 'Slide 10: a high-risk score without a response pathway can create workload without improving care.' },
      },
      {
        t: 'The confusion matrix — calculate it yourself',
        key: '<b>Sensitivity</b> and <b>specificity</b> start from the <b>truth</b> (columns). <b>PPV</b> and <b>NPV</b> start from the <b>alert</b> (rows).',
        fig: { type: 'anim', name: 'confusion', t: '1,000 patients, 50 truly deteriorate' },
        html: `
<p>Every alert decision has four possible outcomes:</p>
<table class="t">
  <tr><th></th><th>Truly has the condition</th><th>Truly does not</th></tr>
  <tr><td><b>Alert</b></td><td><b>TP</b> true positive</td><td><b>FP</b> false positive (false alarm)</td></tr>
  <tr><td><b>No alert</b></td><td><b>FN</b> false negative (missed!)</td><td><b>TN</b> true negative</td></tr>
</table>
<table class="t">
  <tr><th>Measure</th><th>Plain question</th><th>Formula</th></tr>
  <tr><td><b>Sensitivity</b></td><td>Of the people who <i>have it</i>, how many did we flag?</td><td>TP / (TP + FN)</td></tr>
  <tr><td><b>Specificity</b></td><td>Of the people who <i>don't have it</i>, how many did we correctly leave alone?</td><td>TN / (TN + FP)</td></tr>
  <tr><td><b>PPV</b></td><td>Of the <i>alerts</i>, how many were real?</td><td>TP / (TP + FP)</td></tr>
  <tr><td><b>NPV</b></td><td>Of the <i>no-alerts</i>, how many were truly fine?</td><td>TN / (TN + FN)</td></tr>
  <tr><td><b>Accuracy</b></td><td>How many were right overall?</td><td>(TP + TN) / everyone</td></tr>
</table>
<h3>Worked example</h3>
<p>1,000 patients, 50 truly deteriorate. The model: TP = 40, FN = 10, FP = 95, TN = 855.</p>
<ul>
  <li>Sensitivity = 40 / 50 = <b>80%</b></li>
  <li>Specificity = 855 / 950 = <b>90%</b></li>
  <li>PPV = 40 / 135 = <b>30%</b> — only 3 in 10 alerts are real!</li>
  <li>NPV = 855 / 865 = <b>98.8%</b></li>
</ul>
<div class="callout"><b>💡 Memory hook:</b> <b>sensitivity</b> and <b>specificity</b> start from the <i>truth</i> (columns). <b>PPV</b> and <b>NPV</b> start from the <i>alert</i> (rows).</div>`,
        check: { q: '200 patients truly have a condition; the model flags 150 of them. What is the sensitivity?', o: ['75%', '25%', '150%', 'It depends on PPV'], why: 'Sensitivity = TP / all truly positive = 150 / 200 = 75%.' },
      },
      {
        t: 'Thresholds, prevalence and the 99% trap',
        key: 'A <b>lower threshold</b> catches more sick patients but gives more false alarms. And when a condition is <b>rare</b>, "99% accurate" can mean the model finds nobody.',
        fig: [{ type: 'anim', name: 'threshold', t: 'Moving the alert threshold', cap: 'Illustrative scores for 40 patients.' }, { type: 'boxes', t: 'The 99% trap: 1,000 patients, 10 have it; the model says "no" for everyone', rows: [{ cells: [['990 healthy → "no" ✓', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['', 'ok'], ['10 sick → "no" ✗', 'bad']] }], cap: 'Accuracy 99%, sensitivity 0%. Always look at the confusion matrix.' }],
        html: `
<p>A model gives each patient a <b>risk score</b>. A <b>threshold</b> turns the score into an action ("review urgently if score ≥ 55").</p>
<ul>
  <li><b>Lower threshold</b> → more true cases caught (higher sensitivity) but <b>more false alarms</b>.</li>
  <li><b>Higher threshold</b> → fewer alerts but <b>more missed patients</b>.</li>
  <li>The best threshold depends on <b>clinical consequences, resources (how many alerts staff can handle) and patient preferences</b>. For a rapidly treatable, life-threatening condition you'd choose a <i>lower</i> threshold.</li>
</ul>
<h3>Prevalence changes PPV</h3>
<p><b>Prevalence</b> = how common the condition is. PPV and NPV depend strongly on it: the <i>same model</i> has a much lower PPV where the condition is rare, because most alerts come from the large healthy group.</p>
<div class="callout warn"><b>⚠ Slide 13 — the 99% trap:</b> 1,000 patients, 1% (10 people) have the condition. A model that says "no condition" for <b>everyone</b> is right 990 times = <b>99% accurate</b> — and finds <b>nobody</b>. Sensitivity = 0%. Always look at the confusion matrix, not just accuracy.</div>`,
        lab: { href: 'w4/threshold.html', todo: [
          'Start with <b>Ward early warning</b>. Move the <b>alert threshold</b> slider down and up and watch sensitivity, false positives and the alert count change.',
          'Watch the capacity warning: when there are more alerts than the team can review, you get alert fatigue.',
          'Click <b>Slide 13: 1% prevalence</b>, then <b>"Predict no condition for everyone"</b>. Read the accuracy — and the sensitivity.',
          'Click <b>Rare condition, good model</b> and look at the PPV: even a good model produces mostly false alarms when the condition is rare.',
        ] },
        check: { q: 'You move the threshold lower. What usually happens?', o: ['Sensitivity rises and false positives rise', 'Sensitivity falls and false positives fall', 'Nothing changes', 'Accuracy always reaches 100%'], why: 'Lower threshold = more people flagged: more true cases caught, but more false alarms.' },
      },
      {
        t: 'Discrimination, calibration and validation',
        key: '<b>Discrimination</b> (AUC): does it rank sicker patients higher? <b>Calibration</b>: when it says 20%, do about 20 in 100 really have the event?',
        fig: { type: 'plot', t: 'Calibration: predicted risk vs what really happened', w: 500, h: 300, x: [0, 100], y: [0, 100], xl: 'predicted risk (%)', yl: 'observed rate (%)', lines: [{ pts: [[0, 0], [100, 100]], c: 'mute', dash: true, label: 'perfect' }, { pts: [[0, 0], [20, 19], [40, 42], [60, 58], [80, 81], [100, 98]], c: 'c1', label: 'well calibrated' }, { pts: [[0, 0], [20, 8], [40, 17], [60, 28], [80, 40], [100, 52]], c: 'c4', label: 'at a new hospital' }], cap: 'Illustrative. A model can rank well but be badly calibrated somewhere new, so validate it locally (external validation).' },
        html: `
<table class="t">
  <tr><th>Concept</th><th>Question</th></tr>
  <tr><td><b>Discrimination</b> (AUC)</td><td>Does the model <b>rank</b> sicker patients above healthier ones? (separates groups)</td></tr>
  <tr><td><b>Calibration</b></td><td>When it says "20% risk", do ~20 of 100 such patients really have the event?</td></tr>
</table>
<div class="callout"><b>💡 Weather analogy:</b> a forecaster who says "70% rain" should see rain on about 70% of those days — that is calibration. A model can rank patients perfectly (good discrimination) and still say "40%" when the real risk is 10% (bad calibration).</div>
<ul>
  <li><b>Internal validation</b> — tested inside the development data.</li>
  <li><b>External validation</b> — tested at another site or a later time period.</li>
  <li>Performance can change across <b>hospitals, devices, patient populations and practices</b>.</li>
  <li><b>Data leakage</b> — using information that would not be available at prediction time (e.g. a discharge code) makes results look unrealistically good.</li>
  <li>A model with strong development results is <b>not automatically ready</b> for clinical use. Reassess after deployment and whenever data or workflow change.</li>
</ul>`,
        lab: { href: 'w4/calibration.html', todo: [
          'Click <b>a community hospital (condition rarer)</b>. In the table, AUC stays the same but PPV falls and the model over-estimates risk (dots below the diagonal).',
          'Click <b>Recalibrate on local Hospital B data</b>: the dots return to the diagonal.',
          'Click <b>a different patient population</b>. AUC drops — recalibration cannot fix lost discrimination; the model may need re-development.',
        ] },
        check: { q: 'At a new hospital the model still ranks patients well, but it predicts 30% risk on average while only 10% have the event. What is the problem?', o: ['Poor calibration', 'Poor discrimination', 'Data leakage', 'Perfect performance'], why: 'Ranking (discrimination) is fine, but the probabilities don\'t match observed rates → miscalibration.' },
      },
      {
        t: 'Humans and AI together: oversight and automation bias',
        key: '<b>Augmented</b> intelligence: AI extends people, it does not replace them. The human must be <b>more than a rubber stamp</b>, with the time, information and authority to disagree.',
        fig: { type: 'compare', vs: true, cols: [{ icon: '🤖', t: 'AI brings', pts: ['speed', 'pattern detection', 'consistent calculation'], c: 'c0' }, { icon: '🧑‍⚕️', t: 'Clinicians bring', pts: ['context, examination', 'communication, values', 'experience, ethical judgement'], c: 'c1' }], cap: '<b>Automation bias</b> = trusting the computer too much, even when it is wrong.' },
        html: `
<p><b>Augmented intelligence</b> = AI <b>extends</b> human capability rather than replacing people. AI brings speed, pattern detection and consistent calculation; clinicians bring context, examination, communication, values, experience and ethical judgement.</p>
<div class="callout"><b>💡 Core principle (slide 15):</b> the human is <b>not merely a rubber stamp</b>. Meaningful oversight needs <b>time, information and the authority to disagree</b>.</div>
<h3>Human-factor errors (slide 16) — exam favourite</h3>
<table class="t">
  <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
  <tr><td><b>Automation bias</b></td><td>Over-trusting the computer</td><td>Ignoring a nurse's worry because the score is low</td></tr>
  <tr><td><b>Commission error</b></td><td>Following a <b>wrong recommendation</b> (doing something wrong)</td><td>Giving a dose the calculator got wrong</td></tr>
  <tr><td><b>Omission error</b></td><td><b>Failing to act</b> because the system did not flag the problem</td><td>No alert → no one checks the patient</td></tr>
  <tr><td><b>Alert fatigue</b></td><td>Too many low-value alerts → attention drops</td><td>Clicking "dismiss" without reading</td></tr>
  <tr><td><b>Under-trust</b></td><td>Ignoring useful, correct support</td><td>Dismissing a correct sepsis alert</td></tr>
</table>
<p>The goal is <b>calibrated trust</b>: communicate uncertainty, show the relevant evidence, make escalation clear.</p>
<div class="callout"><b>💡 Memory hook:</b> <b>commission</b> = you <i>committed</i> an action that was wrong; <b>omission</b> = you <i>omitted</i> (left out) an action.</div>`,
        lab: { href: 'w4/oversight.html', todo: [
          'For each of the 10 cases read the facts first, then the AI output.',
          'Choose your reason from the list, then <b>Accept</b> or <b>Override / escalate</b>.',
          'At the end read your profile: did your errors lean towards over-trust (commission/omission) or under-trust?',
        ] },
        check: { q: 'A doctor does not examine a patient because the AI did not raise an alert, and the patient deteriorates. This is…', o: ['an omission error', 'a commission error', 'under-trust', 'calibration'], why: 'Omission = failing to act because the system did not flag the problem.' },
      },
      {
        t: 'Explainability, bias, governance and implementation',
        key: 'Before trusting a tool, ask: can users <b>understand</b> it, is it <b>fair</b> for every group, <b>who is responsible</b>, and is it <b>monitored</b> after go-live?',
        fig: { type: 'compare', cols: [{ icon: '💡', t: 'Explainability', pts: ['what the output means and when it may fail', 'associations are not causes'], c: 'c0' }, { icon: '⚖️', t: 'Bias and equity', pts: ['check performance by age, sex, ethnicity…'], c: 'c3' }, { icon: '🏛️', t: 'Governance', pts: ['responsibility cannot be delegated to an algorithm', 'name who owns the decision and the model'], c: 'c2' }, { icon: '🔧', t: 'Implementation', pts: ['map the workflow, pilot, train users', 'monitor alerts, overrides, subgroups'], c: 'c1' }], cap: 'Key message: evaluate the whole human–AI–workflow system, not the algorithm alone.' },
        html: `
<h3>Explainability (slide 17)</h3>
<p>Users must understand what an output means, what it does <i>not</i> mean and when it may fail. "Higher estimated risk based on recent observations" is better than a mysterious red warning with no next step. Don't present <b>associations as causes</b>.</p>
<h3>Bias and equity (slide 18)</h3>
<p>Models can reproduce historical inequalities. Performance may differ by age, sex, ethnicity, disability, language… <b>Measure subgroup performance</b>. A model can be accurate overall and still unsafe for one group.</p>
<h3>Governance (slide 19)</h3>
<p><b>Responsibility cannot be delegated to an algorithm.</b> Name who owns the decision, who maintains the model and who responds to incidents. Document intended use, excluded uses, data provenance, model versions and limitations.</p>
<h3>Implementation (slide 20)</h3>
<ol>
  <li>Start with a clearly defined clinical problem; involve clinicians, patients, IT, data teams, managers.</li>
  <li>Map the current workflow.</li>
  <li>Assess data readiness, evidence, usability, fairness, privacy, security.</li>
  <li><b>Pilot</b> in a controlled setting; train users; define when to override.</li>
  <li><b>Monitor</b> uptake, outcomes, subgroups, false alarms, overrides.</li>
  <li>Set criteria to <b>update, pause or withdraw</b>.</li>
</ol>
<h3>Case study: early warning (slides 21–22)</h3>
<p>A pilot gives many alerts; some patients deteriorate without an alert, others are false alarms. What do you recommend? A defensible answer: <b>pause expansion</b>, investigate failure modes (missing/delayed data, threshold, staffing, who is missed) and <b>redesign the workflow</b> — don't decide from accuracy alone.</p>
<div class="callout"><b>💡 Key message (slide 23):</b> evaluate the complete <b>human–AI–workflow system</b>, not the algorithm in isolation.</div>`,
        check: { q: 'If an AI system recommends a treatment, who is responsible for the final decision?', o: ['The clinicians and institution — responsibility cannot be delegated to an algorithm', 'The algorithm', 'The software vendor only', 'Nobody, if the model was validated'], why: 'Slide 19: responsibility cannot be delegated to an algorithm; institutions need named owners and clear procedures.' },
      },
    ],
  },
};
