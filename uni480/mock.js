/* Existing UNI480 practice questions condensed; option 0 is correct before display shuffle. */
window.MOCK = [
  {
    "t": "W1",
    "q": "According to the lecture, what is the key question about AI in healthcare?",
    "o": [
      "Better care with available resources",
      "Can AI replace physicians in routine diagnosis so that hospitals can reduce their staffing costs?",
      "How quickly can hospitals automate clinical decisions to remove human error from patient care?",
      "Which AI vendor offers the most accurate system for a hospital to purchase?",
      "Can AI eliminate the need for healthcare managers in resource planning?"
    ],
    "why": "The course evaluates better care within available resources."
  },
  {
    "t": "W1",
    "q": "A bed-management AI reads occupancy data from the hospital information system and sends notifications to the admissions team. In AI-agent terms, the notifications are the agent's:",
    "o": [
      "Actuators",
      "Sensors",
      "Environment",
      "Performance measure",
      "Training data"
    ],
    "why": "Sending a notification acts on the environment; reading occupancy is sensing."
  },
  {
    "t": "W1",
    "q": "Population health analysis, financial forecasting and long-term planning belong to which area of AI in healthcare?",
    "o": [
      "Strategic and system-level AI",
      "Clinical AI",
      "Administrative and operational AI",
      "Robotic process automation",
      "Generative AI"
    ],
    "why": "Population-level and long-term planning belong to the strategic area."
  },
  {
    "t": "W1",
    "q": "\"Symptoms and test results do not always provide a clear or complete picture of a patient's condition.\" Which characteristic of healthcare does this describe?",
    "o": [
      "Uncertainty",
      "Time sensitivity",
      "Complex information",
      "Resource constraints",
      "Human-centered care"
    ],
    "why": "Incomplete evidence leaves uncertainty about the patient’s condition."
  },
  {
    "t": "W1",
    "q": "According to the lecture, the capabilities of an AI system depend on:",
    "o": [
      "Its design, training data and intended use",
      "Its human-like understanding of patients",
      "The moral responsibility it accepts for decisions",
      "The number of physicians who use it",
      "Whether it is called \"AI\" by the vendor"
    ],
    "why": "Capabilities depend on design, training data and intended use."
  },
  {
    "t": "W1",
    "q": "A hospital manager asks: \"Should AI be allowed to make clinical decisions without human approval?\" Which answer best fits the course?",
    "o": [
      "Support with human oversight and accountability",
      "Yes, if its accuracy in testing is above 90%, because high accuracy makes oversight unnecessary",
      "Yes, because AI eliminates human error and professional responsibility",
      "Only in emergency departments, where time pressure justifies removing human review",
      "Yes, as long as the vendor accepts legal responsibility for every decision"
    ],
    "why": "Decision support retains human oversight and professional accountability."
  },
  {
    "t": "W2",
    "q": "Which statement best describes \"AI\" according to the technologies lecture?",
    "o": [
      "An umbrella for several technologies",
      "A single technology based on neural networks that understands patients the way clinicians do",
      "Another word for healthcare robotics that performs physical tasks in hospitals",
      "A system with human-like understanding and autonomy, ready for clinical use once accurate",
      "A tool that becomes clinically ready as soon as its accuracy is high enough"
    ],
    "why": "AI covers several technology families with different tasks and risks."
  },
  {
    "t": "W2",
    "q": "Grouping patients with similar patterns of disease or service use, without a target label, is an example of:",
    "o": [
      "Unsupervised learning",
      "Supervised learning",
      "Reinforcement learning",
      "Generative AI",
      "Image segmentation"
    ],
    "why": "Unsupervised learning finds structure without known target labels."
  },
  {
    "t": "W2",
    "q": "Which statement about machine learning and deep learning is correct?",
    "o": [
      "Deep learning is a subset of machine learning",
      "Deep learning is a separate field unrelated to machine learning and uses different data",
      "Deep learning is always better than traditional machine learning for every task",
      "Machine learning can only be used on medical images, not structured data",
      "Deep learning models are usually easier to interpret than other models"
    ],
    "why": "Deep learning belongs within machine learning; neither is automatically best."
  },
  {
    "t": "W2",
    "q": "Note: \"A 68-year-old patient was admitted last month for pneumonia. Today the patient has no fever and denies cough. The clinician is considering discharge.\" Which extraction is correct?",
    "o": [
      "Past pneumonia; no fever or cough; discharge undecided",
      "Current pneumonia; fever present; cough present; patient discharged today",
      "Current pneumonia confirmed; patient was discharged today after treatment",
      "No history of pneumonia; no fever; discharge has been confirmed by the clinician",
      "Fever and cough are present now; pneumonia has been ruled out completely"
    ],
    "why": "Last month is historical, denies negates cough, and considering is not confirmation."
  },
  {
    "t": "W2",
    "q": "A model outlines exactly which pixels in a CT scan belong to a tumour. This computer vision task is:",
    "o": [
      "Segmentation",
      "Classification",
      "Detection",
      "Calibration",
      "Natural language processing"
    ],
    "why": "Segmentation identifies individual pixels; detection locates an area."
  },
  {
    "t": "W2",
    "q": "Which of the following is NOT listed as a potential failure source in the computer vision workflow?",
    "o": [
      "A clinician reviewing the model's output",
      "Image quality from the scanner, camera or slide",
      "Device differences between hospitals or scanners",
      "Label disagreement between expert annotators",
      "Population shift between the training and target hospitals"
    ],
    "why": "Review is the intended use step; image quality and site differences can cause failure."
  },
  {
    "t": "W3",
    "q": "According to the lecture, the central challenge with healthcare data is:",
    "o": [
      "Trustworthy, usable and responsibly governed data",
      "Collecting as much data as possible, because more data always means better decisions",
      "Replacing all paper records with scanned images as quickly as possible",
      "Storing all hospital data in the cloud so that AI can access it",
      "Using only structured data, because unstructured data has no value"
    ],
    "why": "Relevant, trustworthy data matters more than volume alone."
  },
  {
    "t": "W3",
    "q": "Why is a simple scanned paper chart NOT equivalent to an EHR?",
    "o": [
      "Useful data, workflow integration and exchange",
      "Scanned charts are not allowed to be stored digitally in hospitals",
      "EHRs never contain clinical notes, only billing codes and dates",
      "Scanned charts contain more structured information than EHRs do",
      "EHRs are used only for billing, while scanned charts support care"
    ],
    "why": "An EHR needs useful data, integration and exchange beyond a scanned image."
  },
  {
    "t": "W3",
    "q": "A lab result is linked to the wrong patient when it is stored. What does the lecture warn about this?",
    "o": [
      "The identity error can affect later decisions",
      "The EHR automatically detects and corrects the error before anyone uses it",
      "It only affects billing, so clinical decisions are not at risk",
      "It is a timeliness problem only, because the result arrived late",
      "It has no effect on AI models, because models ignore patient identity"
    ],
    "why": "An identity error can propagate into later outputs and decisions."
  },
  {
    "t": "W3",
    "q": "Weight is stored in pounds in one system and in kilograms in another. Which data-quality dimension is affected?",
    "o": [
      "Consistency",
      "Accuracy",
      "Completeness",
      "Timeliness",
      "Uniqueness"
    ],
    "why": "Different units create inconsistent representations of the same measurement."
  },
  {
    "t": "W3",
    "q": "A recorded body temperature of 410 °C is an example of a problem with:",
    "o": [
      "Validity",
      "Completeness",
      "Timeliness",
      "Uniqueness",
      "Velocity"
    ],
    "why": "410 °C is outside a valid body-temperature range."
  },
  {
    "t": "W3",
    "q": "Data arriving rapidly from ICU monitors and wearable sensors illustrates which \"V\" of big data?",
    "o": [
      "Velocity",
      "Volume",
      "Variety",
      "Veracity",
      "Value"
    ],
    "why": "Velocity concerns the speed at which data arrives."
  },
  {
    "t": "W4",
    "q": "In the lecture, a Clinical Decision Support System (CDSS) is described as a system that:",
    "o": [
      "Patient-specific information supporting decisions",
      "Makes the final clinical decision automatically so clinicians can focus on other tasks",
      "Always uses deep learning to analyse images and notes before giving advice",
      "Was introduced only after generative AI became widely available in hospitals",
      "Only provides information to patients, not to healthcare professionals"
    ],
    "why": "CDSS supplies patient- or context-specific information to support decisions."
  },
  {
    "t": "W4",
    "q": "A hospital lowers its alert threshold from 10% to 5% risk. What is the most likely effect?",
    "o": [
      "More cases caught, more false positives",
      "Fewer patients are flagged, and more true cases are missed by the system",
      "False positives disappear, because more patients are reviewed earlier",
      "Sensitivity decreases, while the number of alerts stays the same",
      "Nothing changes, because the model itself has not been retrained"
    ],
    "why": "Lowering the threshold catches more cases but increases false positives and workload."
  },
  {
    "t": "W4",
    "q": "A sepsis model is tested on 200 patients; 40 truly have sepsis. It flags 50 patients, and 30 of them truly have sepsis. What is the SENSITIVITY?",
    "o": [
      "75%",
      "60%",
      "87.5%",
      "25%",
      "93%"
    ],
    "why": "Sensitivity starts from true cases: 30 of 40 were caught, giving 75%."
  },
  {
    "t": "W4",
    "q": "A model ranks patients well (high AUC), but among patients it gives a 30% risk, only 10% actually have the event. The model has:",
    "o": [
      "Good discrimination but poor calibration",
      "Poor discrimination but good calibration",
      "Good discrimination and good calibration",
      "Data leakage but good calibration",
      "Perfect sensitivity"
    ],
    "why": "Ranking is discrimination; 30% predicted versus 10% observed is poor calibration."
  },
  {
    "t": "W4",
    "q": "According to the lecture, meaningful human oversight requires:",
    "o": [
      "Time, information and authority to disagree",
      "Signing every AI output as quickly as possible to keep the workflow moving",
      "Turning the AI system off whenever it disagrees with the clinician",
      "Knowing the full source code and training data of the model",
      "Following the AI unless a manager objects to its recommendation"
    ],
    "why": "Oversight needs time, relevant information, understanding and authority to disagree."
  },
  {
    "t": "W4",
    "q": "A hospital buys an AI system from an external vendor. Which statement is correct according to the lecture?",
    "o": [
      "Named hospital owners remain responsible",
      "All responsibility transfers to the vendor once the contract is signed",
      "The algorithm becomes legally responsible for its own recommendations",
      "No governance is needed if the vendor is reputable and certified",
      "Clinicians are no longer responsible for decisions supported by the system"
    ],
    "why": "A contract does not remove institutional ownership of decisions, maintenance and incidents."
  }
];
(() => {
 const host=document.getElementById('exam');
 MOCK.forEach((q,i)=>{
  const box=CS.el('section',{class:'panel mq'}),fb=CS.el('p',{'aria-live':'polite',class:'feedback'});
  box.append(CS.el('h2',{class:'quiz-q'},(i+1)+'. '+q.q),CS.el('p',{class:'small muted'},'Week '+q.t.slice(1)));
  const options=CS.shuffle(q.o.map((text,k)=>({text,right:k===0})));
  const buttons=options.map(o=>CS.el('button',{class:'opt',onclick:()=>{
   buttons.forEach((b,k)=>{b.disabled=true;if(options[k].right)b.classList.add('right');});
   if(!o.right)buttons[options.indexOf(o)].classList.add('wrong');
   fb.textContent=(o.right?'Correct. ':'Incorrect. ')+q.why;
   CS.srs.grade(CS.srs.qId(COURSE.id,Number(q.t.slice(1)),q.q),o.right);
  }},o.text));
  box.append(...buttons,fb);host.append(box);
 });
})();
