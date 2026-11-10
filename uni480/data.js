/* UNI480: condensed from the existing slide- and lecture-based course content. */
window.COURSE = window.UNI480 = {
  "id": "uni480",
  "code": "UNI480",
  "name": "AI in Health Management",
  "term": "Fall 2026-2027",
  "lecturer": "Dr. Burcu Arsan, MBA, PhD, RAIIM",
  "examFormat": "Midterm 30% (7 Nov) · Final 50% · Term project 20%. Both exams are multiple choice.",
  "textbooks": [
    "Lecturer's notes (required). Selected articles and case studies from the instructor."
  ],
  "projects": [
    "Term project (20%), individual written report. Choose a healthcare organization, health-tech company, hospital, health app or AI-based healthcare solution, and critically analyse how it uses AI.",
    "Suggested headings: 1 Organization / solution overview · 2 Healthcare problem or need · 3 AI technology and application · 4 Impact on healthcare management and decision-making · 5 Benefits and potential value · 6 Ethical, legal and privacy considerations · 7 Organizational and human factors · 8 Challenges and limitations · 9 Recommendations · 10 Conclusion.",
    "Format: Times New Roman 12, 1.5 spacing, cover page, table of contents, body of at least five full pages, references, appendices as needed, numbered pages.",
    "Checked by Turnitin for plagiarism and AI-generated content: a similarity / AI score above 25% gets zero. Write it yourself; disclose any AI tool use properly."
  ],
  "chapters": [
    {
      "n": 1,
      "title": "Introduction to AI in Healthcare",
      "summary": "Explain AI’s role and limits in healthcare management.",
      "takeaways": [
        "AI = computer systems that do tasks we normally link to human intelligence: learning from data, understanding language, reading images, predicting, and supporting decisions.",
        "Turing asked the question (\"Can machines think?\"). Dartmouth 1956 gave the field its name. AI is booming today because of data + computing power + better algorithms.",
        "An agent senses its environment, decides with its agent function, and acts through actuators. It can be pure software; it does not have to be a robot.",
        "AI in healthcare is not only diagnosis. There are three areas: caring for the patient, running the hospital, and planning for the whole system and the future.",
        "A hospital is not Netflix. Decisions are complex, urgent, uncertain and high-stakes, resources are limited, and care must centre on the patient.",
        "AI cannot guarantee a correct diagnosis, better outcomes everywhere, fair results for everyone, or savings. The human keeps the professional responsibility."
      ],
      "traps": [
        [
          "AI understands patients the way a doctor does",
          "AI has no built-in understanding, judgment, empathy or moral responsibility. What it can do depends on its design, training data and intended use."
        ],
        [
          "AI in healthcare means diagnosing diseases",
          "Diagnosis is only the clinical area. AI also runs scheduling, patient flow and staffing (operational) and population health and financial planning (strategic)."
        ],
        [
          "If an AI tool works, it lowers costs automatically",
          "\"Automatic reductions in healthcare costs\" is on the list of things AI cannot guarantee."
        ],
        [
          "Using AI removes professional responsibility",
          "AI cannot eliminate human error or professional responsibility. People stay accountable."
        ],
        [
          "The term \"AI\" came from Alan Turing",
          "Turing asked \"Can machines think?\". The term was coined at the 1956 Dartmouth Conference (McCarthy, Minsky, Rochester, Shannon)."
        ]
      ],
      "activities": [
        {
          "id": "w1-agent",
          "title": "Ward Monitoring Agent",
          "desc": "Build an intelligent agent for a hospital ward: its sensors read vital signs, its agent function decides, its actuator alerts a nurse. Change its rule and watch the performance measure.",
          "href": "w1/agent.html"
        },
        {
          "id": "w1-manager",
          "title": "You Are the Hospital Manager",
          "desc": "Slide 4's scenario: long waits, staff shortages, rising costs. Pick three AI projects, then see which area each belongs to, what it can and cannot guarantee, and what it needs before it is safe.",
          "href": "w1/manager.html"
        }
      ],
      "quiz": [
        {
          "q": "According to the lecture, what is Artificial Intelligence?",
          "options": [
            "Computer systems performing intelligence-related tasks",
            "A robot that replaces doctors",
            "Any software used in a hospital",
            "A database of medical records"
          ],
          "answer": 0,
          "explain": "Slide 5: systems performing tasks associated with human intelligence, such as learning, recognizing patterns, language, images, predictions and decision support."
        },
        {
          "q": "Which statement about AI is the lecture's \"important distinction\"?",
          "options": [
            "AI always understands the patient better than humans",
            "No automatic human judgment or empathy",
            "AI has its own moral responsibility",
            "AI capabilities do not depend on training data"
          ],
          "answer": 1,
          "explain": "Slide 5: its capabilities depend on design, training data and intended use."
        },
        {
          "q": "Who asked \"Can machines think?\" and introduced a famous test?",
          "options": [
            "John McCarthy",
            "Claude Shannon",
            "Alan Turing",
            "Marvin Minsky"
          ],
          "answer": 2,
          "explain": "Slide 6: Alan Turing, 1940s–1950s, the Turing Test."
        },
        {
          "q": "Where and when was the term \"Artificial Intelligence\" coined?",
          "options": [
            "At MIT in 1943",
            "In Turing's 1950 paper",
            "At Stanford in 1970",
            "Dartmouth, 1956"
          ],
          "answer": 3,
          "explain": "Slide 6: 1956 Dartmouth Conference — McCarthy, Minsky, Rochester and Shannon. It marked the official start of AI as a field."
        },
        {
          "q": "What were the \"AI winters\"?",
          "options": [
            "Funding cuts and slow progress",
            "The years when AI first beat humans at chess",
            "Periods of rapid investment in deep learning",
            "Cold-weather tests of hospital robots"
          ],
          "answer": 0,
          "explain": "Slide 7: ambitious goals met real-world limits."
        },
        {
          "q": "Why is AI much more powerful today, according to the lecture?",
          "options": [
            "Because rule-based systems were perfected",
            "Data, computing power and algorithms",
            "Because computers became conscious",
            "Because AI winters ended all research"
          ],
          "answer": 1,
          "explain": "Slide 7: the transition from rule-based systems to machine learning and deep learning, driven by data, computing power and algorithms."
        },
        {
          "q": "An AI agent is an entity that…",
          "options": [
            "Only stores data",
            "Acts randomly without goals",
            "Senses and acts toward goals",
            "Must be a physical robot"
          ],
          "answer": 2,
          "explain": "Slide 9: an agent senses, thinks and acts. It can be software, not only a robot."
        },
        {
          "q": "In an AI agent, which component maps perceptions to actions?",
          "options": [
            "The sensors",
            "The actuators",
            "The performance measure",
            "Agent function"
          ],
          "answer": 3,
          "explain": "Slide 10: agent function = perceptions → actions."
        },
        {
          "q": "Demand forecasting, staff planning and appointment scheduling belong to which area of AI in healthcare?",
          "options": [
            "Administrative and operational AI",
            "Clinical AI",
            "Strategic and system-level AI",
            "Robotic surgery"
          ],
          "answer": 0,
          "explain": "Slide 11: area 2."
        },
        {
          "q": "Population health analysis and public-health surveillance belong to which area?",
          "options": [
            "Clinical AI",
            "Strategic and system-level AI",
            "Administrative and operational AI",
            "None — AI cannot do this"
          ],
          "answer": 1,
          "explain": "Slide 11: area 3, together with financial forecasting, quality improvement and long-term planning."
        },
        {
          "q": "Medical imaging interpretation and clinical risk prediction belong to…",
          "options": [
            "Administrative AI",
            "Strategic AI",
            "Clinical AI",
            "Operational robotics"
          ],
          "answer": 2,
          "explain": "Slide 11: area 1."
        },
        {
          "q": "Which is part of responsible AI implementation (slide 14)?",
          "options": [
            "Deploying without validation to save time",
            "Removing human oversight",
            "Sharing all patient data publicly",
            "Local evaluation and continuous monitoring"
          ],
          "answer": 3,
          "explain": "Slide 14: data quality and validation, evaluation in the intended setting, privacy, human oversight, continuous monitoring."
        },
        {
          "q": "According to the lecturer, what can AI NOT do for a hospital with scarce resources?",
          "options": [
            "Create beds or qualified professionals",
            "Help use existing resources more intelligently",
            "Help forecast emergency department demand",
            "Support staffing decisions"
          ],
          "answer": 0,
          "explain": "Lecture, 10 Oct: AI helps use existing resources more intelligently, but it cannot automatically create beds, qualified professionals or remove fundamental costs."
        },
        {
          "q": "An ED forecast is accurate, but managers receive it too late to change staffing. What did the lecturer conclude?",
          "options": [
            "The system is a full success because it is accurate",
            "Too late to change staffing",
            "The forecast must be wrong",
            "The environment does not matter"
          ],
          "answer": 1,
          "explain": "Lecture, 10 Oct: reliable input, an appropriate environment, a well-defined decision process, useful actions and meaningful evaluation are all needed."
        }
      ],
      "cards": [
        [
          "Artificial intelligence",
          "A field of computer science that develops systems able to perform tasks associated with human intelligence: learning, pattern recognition, language, images, predictions, decision support."
        ],
        [
          "The important distinction",
          "AI has no automatic human understanding, professional judgment, empathy or moral responsibility. It depends on design, training data and intended use."
        ],
        [
          "Alan Turing",
          "1940s–50s. Asked \"Can machines think?\" and introduced the Turing Test."
        ],
        [
          "Dartmouth Conference, 1956",
          "McCarthy, Minsky, Rochester and Shannon coined the term \"Artificial Intelligence\". The official start of AI as a field."
        ],
        [
          "AI winters",
          "Funding cuts and slow progress in the 1970s and 1980s."
        ],
        [
          "Modern AI",
          "Moved from rule-based systems to machine learning and deep learning, powered by data, computing power and algorithms."
        ],
        [
          "Intelligent agent",
          "Perceives its environment through sensors and acts on it through actuators to achieve goals. Senses, thinks, acts."
        ],
        [
          "Agent components",
          "Sensors (observe), actuators (act), environment (what it interacts with), agent function (perceptions → actions), performance measure (how well it reaches goals)."
        ],
        [
          "Clinical AI",
          "Diagnosis, medical imaging, clinical risk prediction, treatment planning, patient monitoring."
        ],
        [
          "Administrative & operational AI",
          "Scheduling, patient flow, demand forecasting, staff planning, documentation, resource management."
        ],
        [
          "Strategic & system-level AI",
          "Population health, financial forecasting, quality improvement, public-health surveillance, long-term planning."
        ],
        [
          "Why healthcare is different",
          "Complex information · time sensitivity · uncertainty · high consequences · resource constraints · human-centered care."
        ],
        [
          "AI cannot guarantee",
          "Correct diagnosis every time · better outcomes everywhere · unbiased results for all · full understanding of a patient · automatic cost savings · end of human error/responsibility."
        ],
        [
          "Three course questions (lecture)",
          "What problem are we trying to solve? How can AI contribute? How will we know it actually improved healthcare?"
        ]
      ]
    },
    {
      "n": 2,
      "title": "AI Technologies in Healthcare",
      "summary": "Choose technologies for healthcare tasks and recognize their limits.",
      "takeaways": [
        "Normal software follows rules a person wrote. Machine learning learns the rules from past examples by reducing its error, and then predicts for new patients.",
        "Deep learning uses neural networks with many layers. Each layer sees something more abstract, from raw pixels up to \"a lesion\".",
        "NLP turns free-text notes into structured data. The trap is context: a word can appear in a note even though the patient does not have it.",
        "Three vision tasks, three questions about the same X-ray: what is there (classification), where (detection), which exact pixels (segmentation).",
        "A robot is an AI agent with a body: it senses, plans, controls and physically acts.",
        "Generative AI writes beautifully, but fluent is not the same as true. A human must always review the output before it is used."
      ],
      "traps": [
        [
          "A model's output is the truth",
          "It is a prediction, probability, ranking or classification. Prediction ≠ diagnosis."
        ],
        [
          "Deep learning is a different field from machine learning",
          "Deep learning is a subset of machine learning."
        ],
        [
          "Deep learning is always better",
          "Neither is automatically better. Data, task, risk and workflow decide the fit. ML can work well on smaller structured datasets and may be easier to interpret."
        ],
        [
          "A high accuracy means the tool is safe",
          "The costs of errors are unequal. Look at sensitivity, specificity, PPV and calibration, and whether it is accurate for every patient group."
        ],
        [
          "NLP just looks for keywords",
          "\"Patient denies chest pain\" contains \"chest pain\". NLP must handle negation, time (historical vs current) and uncertainty."
        ]
      ],
      "activities": [
        {
          "id": "w2-nlp",
          "title": "Clinical Note NLP Lab",
          "desc": "Compare a naive keyword extractor with one that understands negation, time and uncertainty on real-style clinical sentences, including slide 14's pneumonia note. Write your own sentences to trick them.",
          "href": "w2/nlp.html"
        },
        {
          "id": "w2-vision",
          "title": "Vision Tasks & the Second Hospital",
          "desc": "See classification, detection and segmentation on the same scan. Then move a model trained at Hospital A to Hospital B's brighter scanner and watch it fail.",
          "href": "w2/vision.html"
        },
        {
          "id": "w2-verify",
          "title": "Verify the AI Draft",
          "desc": "A generative AI drafted a discharge summary. Check every sentence against the patient record and catch hallucinations, missing context and contradictions.",
          "href": "w2/verify.html"
        }
      ],
      "quiz": [
        {
          "q": "Why does the lecture call AI an \"umbrella term\"?",
          "options": [
            "An umbrella for different technologies",
            "It only means machine learning",
            "It refers to cloud computing",
            "It means human-like understanding"
          ],
          "answer": 0,
          "explain": "Slide 4: AI covers many technologies that classify, predict, generate, recommend or act — each with different risks."
        },
        {
          "q": "How does machine learning differ from traditional programming?",
          "options": [
            "It never uses data",
            "Learns patterns from data",
            "It always uses hand-written rules",
            "It needs no evaluation"
          ],
          "answer": 1,
          "explain": "Slide 6."
        },
        {
          "q": "Predicting readmission from past admissions with known outcomes is an example of…",
          "options": [
            "Unsupervised learning",
            "Reinforcement learning",
            "Supervised learning",
            "Robotics"
          ],
          "answer": 2,
          "explain": "Slide 7: examples paired with known outcomes."
        },
        {
          "q": "Grouping patients with similar patterns of service use, without a target label, is…",
          "options": [
            "Supervised learning",
            "Reinforcement learning",
            "Computer vision",
            "Unsupervised learning"
          ],
          "answer": 3,
          "explain": "Slide 7."
        },
        {
          "q": "Which learning setup learns through actions and feedback in an environment?",
          "options": [
            "Reinforcement learning",
            "Supervised learning",
            "Unsupervised learning",
            "Natural language processing"
          ],
          "answer": 0,
          "explain": "Slide 7: e.g. optimizing a simulated care pathway; real-world deployment needs caution."
        },
        {
          "q": "Which statement about deep learning vs machine learning is correct?",
          "options": [
            "Deep learning has nothing to do with machine learning",
            "Deep learning is within ML",
            "Machine learning is a subset of deep learning",
            "Deep learning always needs less data"
          ],
          "answer": 1,
          "explain": "Slide 11. DL is often data- and compute-intensive and harder to interpret."
        },
        {
          "q": "An NLP system reads \"No evidence of pneumonia\" and records \"pneumonia\". What did it fail to handle?",
          "options": [
            "Segmentation",
            "Calibration",
            "Negation",
            "Robotics"
          ],
          "answer": 2,
          "explain": "Slide 12: context and negation matter."
        },
        {
          "q": "\"A 68-year-old patient was admitted last month for pneumonia.\" Which is the correct extraction?",
          "options": [
            "Current pneumonia",
            "No pneumonia ever",
            "Discharge confirmed",
            "Historical pneumonia, not current pneumonia"
          ],
          "answer": 3,
          "explain": "Slide 14: what is historical vs current matters."
        },
        {
          "q": "A vision model outputs which pixels belong to a tumour. This task is…",
          "options": [
            "Segmentation",
            "Classification",
            "Detection",
            "Calibration"
          ],
          "answer": 0,
          "explain": "Slide 15: classification = what is present, detection = where, segmentation = which pixels."
        },
        {
          "q": "A model drawing a box around a suspicious area is doing…",
          "options": [
            "Segmentation",
            "Detection",
            "Classification",
            "Generation"
          ],
          "answer": 1,
          "explain": "Slide 15."
        },
        {
          "q": "Which is the lecture's main difficulty of healthcare robotics?",
          "options": [
            "Robots cannot carry any weight",
            "Robots never need sensors",
            "A dynamic, safety-critical environment",
            "Robots are always cheaper than staff"
          ],
          "answer": 2,
          "explain": "Slide 19: physical safety, workflow fit and human factors."
        },
        {
          "q": "What is a hallucination in generative AI?",
          "options": [
            "A blurry medical image",
            "A slow response",
            "A correct answer that is too short",
            "A confidently fabricated detail"
          ],
          "answer": 3,
          "explain": "Slide 22."
        },
        {
          "q": "Which is the safer pattern for generative AI in healthcare?",
          "options": [
            "Trusted sources, verification and review",
            "Let the model answer freely and publish directly",
            "Use it only without sources",
            "Trust any fluent output"
          ],
          "answer": 0,
          "explain": "Slide 22."
        },
        {
          "q": "Why must a hospital keep checking a model after it is put into practice?",
          "options": [
            "Because models learn the future",
            "Patients, procedures and records change",
            "Because checking improves accuracy automatically",
            "It does not need to"
          ],
          "answer": 1,
          "explain": "Lecture, 17 Oct: the fourth stage of ML is using the model in practice and monitoring it."
        }
      ],
      "cards": [
        [
          "Six technology families",
          "Machine learning (predict from structured data), deep learning (complex patterns), NLP (clinical language), computer vision (images/video), robotics (physical tasks), generative AI (create text, images, code)."
        ],
        [
          "Machine learning",
          "Trains a model from data and a learning objective instead of hand-written rules. Output = prediction, probability, ranking or class, not a guaranteed truth."
        ],
        [
          "Supervised / unsupervised / reinforcement",
          "Known outcomes (readmission) / structure without labels (patient groups) / actions + feedback (simulated care pathway)."
        ],
        [
          "Deep learning",
          "Subset of ML. Multi-layer neural networks learn layered representations from raw pixels, audio, text or signals. Data-hungry and harder to explain."
        ],
        [
          "NLP",
          "Turns free-text clinical language into structured information. Must handle entities, negation, time, relationships and context."
        ],
        [
          "Classification / detection / segmentation",
          "What is present? / Where is it? / Which pixels?"
        ],
        [
          "Vision pipeline",
          "Acquire → label → train → validate (independent, diverse data) → use (clinician reviews output)."
        ],
        [
          "Robotics",
          "Sensing + planning + control + mechanical action. Surgery, logistics, rehabilitation, social robots. Hard parts: physical safety, workflow fit, human factors."
        ],
        [
          "Generative AI",
          "Prompt → model → output → review. Creates drafts; fluent output is not proof of accuracy."
        ],
        [
          "Hallucination",
          "A fabricated fact, reference, clinical detail or policy presented confidently."
        ],
        [
          "Automation bias",
          "Accepting an AI suggestion because it looks polished or authoritative."
        ],
        [
          "Healthcare AI lifecycle",
          "Define need → assess data → develop → validate → implement → monitor."
        ],
        [
          "Feature",
          "A piece of information that helps a model predict. Experts often design them in traditional ML; deep learning learns them."
        ],
        [
          "NLP checking rule (lecture)",
          "The level of checking depends on the importance of the information and the risk of a mistake."
        ]
      ]
    },
    {
      "n": 3,
      "title": "Healthcare Data and AI",
      "summary": "Identify usable data and distinguish quality from interoperability.",
      "takeaways": [
        "An EMR lives inside one hospital. An EHR follows the patient across organisations over time. A scanned paper chart is neither: it is just a picture.",
        "Structured data fits fixed fields (BP 120/80). Unstructured data is free form (notes, images). Semi-structured has some tags (XML/JSON messages).",
        "Raw hospital data is not ready for AI. Define the question first, then source, document, clean and check the data, and keep monitoring it.",
        "Learn the six dimensions of data quality, each with one example. They are very likely exam questions.",
        "Models learn old inequalities from historical data. A proxy like past spending can make groups who had less access look healthier than they are.",
        "Interoperability means systems can exchange data and use it. It has four levels; data arriving (technical) is only the first."
      ],
      "traps": [
        [
          "More data automatically means better decisions",
          "Relevance, quality, context and governance matter more than volume."
        ],
        [
          "A scanned paper chart is an EHR",
          "An EHR's value depends on structured data, workflow integration and exchange. A scanned picture of paper has none of these."
        ],
        [
          "EHR and EMR always mean exactly the same thing",
          "They are often used interchangeably, but an EMR usually means one organization's record and an EHR a broader longitudinal view."
        ],
        [
          "Missing values can be assumed random",
          "Missingness can be systematic: some patients are measured less often because of access barriers or clinical choices."
        ],
        [
          "A temperature of 410 °C is an incomplete value",
          "It is present but outside the possible range: a validity problem. A missing temperature would be incomplete."
        ]
      ],
      "activities": [
        {
          "id": "w3-quality",
          "title": "Data Quality Inspector",
          "desc": "An EHR extract full of planted problems — 410 °C, pounds vs kilograms, a duplicate patient, a missing anticoagulant. Find each one and name its data-quality dimension.",
          "href": "w3/quality.html"
        },
        {
          "id": "w3-interop",
          "title": "What Does \"1.8\" Mean?",
          "desc": "Send a lab result between two hospital systems. Add the test code, unit, reference range and time one by one and watch the receiver go from dangerous guessing to safe interpretation — then see it as a FHIR resource.",
          "href": "w3/interop.html"
        }
      ],
      "quiz": [
        {
          "q": "What is the \"central challenge\" of healthcare data according to the lecture?",
          "options": [
            "Trustworthy, usable, governed data",
            "Collecting as much data as possible",
            "Storing data on paper",
            "Avoiding all data collection"
          ],
          "answer": 0,
          "explain": "Slide 3: more data does not automatically mean better decisions."
        },
        {
          "q": "In common usage, what is the difference between an EMR and an EHR?",
          "options": [
            "An EHR is always on paper",
            "EMR: one organization; EHR: broader history",
            "They are different names for imaging data",
            "An EMR is only for billing"
          ],
          "answer": 1,
          "explain": "Slide 5. The terms are sometimes used interchangeably."
        },
        {
          "q": "A free-text discharge summary is…",
          "options": [
            "Structured data",
            "A coded diagnosis",
            "Unstructured data",
            "An ICD code"
          ],
          "answer": 2,
          "explain": "Slide 8."
        },
        {
          "q": "Which of the big-data Vs describes uncertainty, noise and missing values?",
          "options": [
            "Velocity",
            "Volume",
            "Variety",
            "Veracity"
          ],
          "answer": 3,
          "explain": "Slide 9."
        },
        {
          "q": "What is the FIRST step in turning raw data into an AI-ready dataset?",
          "options": [
            "Define the question",
            "Train the model",
            "Delete missing values",
            "Buy more storage"
          ],
          "answer": 0,
          "explain": "Slide 11."
        },
        {
          "q": "A temperature recorded as 410 °C is mainly a problem of…",
          "options": [
            "Completeness",
            "Validity",
            "Uniqueness",
            "Timeliness"
          ],
          "answer": 1,
          "explain": "Slide 12: the value falls outside the expected range."
        },
        {
          "q": "Weight stored in pounds in one system and kilograms in another is a problem of…",
          "options": [
            "Uniqueness",
            "Timeliness",
            "Consistency",
            "Completeness"
          ],
          "answer": 2,
          "explain": "Slide 13: consistency and unit harmonization."
        },
        {
          "q": "A patient appears twice under slightly different names. Which dimension?",
          "options": [
            "Validity",
            "Accuracy",
            "Timeliness",
            "Uniqueness"
          ],
          "answer": 3,
          "explain": "Slide 13: uniqueness and record linkage."
        },
        {
          "q": "A lab result reaches the dashboard after the treatment decision was made. Which dimension?",
          "options": [
            "Timeliness",
            "Consistency",
            "Uniqueness",
            "Validity"
          ],
          "answer": 0,
          "explain": "Slide 13."
        },
        {
          "q": "A medication list is missing an anticoagulant. Which dimension?",
          "options": [
            "Validity",
            "Completeness",
            "Uniqueness",
            "Consistency"
          ],
          "answer": 1,
          "explain": "Slide 13: completeness, with possible safety consequences."
        },
        {
          "q": "A lab result is attached to the wrong patient. Which dimension fails?",
          "options": [
            "Timeliness",
            "Validity",
            "Accuracy",
            "Volume"
          ],
          "answer": 2,
          "explain": "Slide 13."
        },
        {
          "q": "Why can a model be unfair even if sensitive attributes such as ethnicity are excluded?",
          "options": [
            "Because models always use ethnicity",
            "Because exclusion is illegal",
            "It cannot — excluding them guarantees fairness",
            "Proxy variables can encode inequity"
          ],
          "answer": 3,
          "explain": "Slide 14."
        },
        {
          "q": "Systems interpret the meaning of exchanged data consistently. This is…",
          "options": [
            "Semantic interoperability",
            "Technical interoperability",
            "Syntactic interoperability",
            "Organizational interoperability"
          ],
          "answer": 0,
          "explain": "Slide 16."
        },
        {
          "q": "Which standard represents health information as resources exchanged through APIs?",
          "options": [
            "ICD",
            "HL7 FHIR",
            "DICOM",
            "LOINC"
          ],
          "answer": 1,
          "explain": "Slides 17–18: resources such as Patient, Observation, Condition, MedicationRequest."
        }
      ],
      "cards": [
        [
          "The central data challenge",
          "Not more data, but trustworthy, usable and responsibly governed data."
        ],
        [
          "Healthcare data types",
          "Clinical · administrative · imaging & signals · patient-generated · omics & research · contextual."
        ],
        [
          "EHR vs EMR",
          "EHR: digital record across encounters and settings (longitudinal). EMR: often one organization's record."
        ],
        [
          "Structured / unstructured / semi-structured",
          "Predefined fields (BP, coded diagnosis) / free text, summaries, scans / tagged messages, some device outputs."
        ],
        [
          "Big data Vs",
          "Volume · velocity · variety · veracity (the 4 Vs) + value."
        ],
        [
          "AI-ready dataset",
          "Define the question → lawful sources → provenance → clean & harmonize → handle missingness → version, validate, monitor."
        ],
        [
          "Accuracy",
          "Does the value reflect reality? (e.g. lab result on the wrong patient)"
        ],
        [
          "Completeness",
          "Are the required fields present? (e.g. missing anticoagulant)"
        ],
        [
          "Consistency",
          "Do values agree across records and systems? (e.g. lbs vs kg)"
        ],
        [
          "Timeliness",
          "Is it current enough for the decision? (e.g. result arrives after treatment)"
        ],
        [
          "Validity",
          "Does the value follow the expected format, range or code set? (e.g. 410 °C)"
        ],
        [
          "Uniqueness",
          "Are duplicates distorting things? (e.g. same patient under two names)"
        ],
        [
          "Interoperability levels",
          "Technical (connect) · syntactic (shared format) · semantic (shared meaning) · organizational (policies, workflows, trust)."
        ],
        [
          "Four levels of analytics",
          "Descriptive (what happened?) · diagnostic (why?) · predictive (what will happen?) · prescriptive (what action may help?)."
        ]
      ]
    },
    {
      "n": 4,
      "title": "AI in Clinical Decision-Making",
      "summary": "Connect AI outputs to safe, accountable clinical decisions.",
      "takeaways": [
        "A CDSS gives patient-specific help at the moment of a decision: reminders, alerts, risk estimates. It can be rules (knowledge-based) or learned (non-knowledge-based).",
        "A prediction estimates risk. It does not prove the event will happen or explain why. It only helps if it is connected to an action.",
        "A lower threshold catches more sick patients but gives more false alarms. And when a condition is rare, \"99% accurate\" can mean the model finds nobody.",
        "Discrimination (AUC): does it rank sicker patients higher? Calibration: when it says 20%, do about 20 in 100 really have the event?",
        "Augmented intelligence: AI extends people, it does not replace them. The human must be more than a rubber stamp, with the time, information and authority to disagree.",
        "An explanation must help the user act and doubt, not just look technical. A model can be accurate overall and still unsafe for one group."
      ],
      "traps": [
        [
          "A risk score tells you what to do",
          "It estimates risk. The care team still decides the appropriate action, and the patient's values matter."
        ],
        [
          "A higher risk score proves the event will happen",
          "A prediction estimates probability; it does not prove the event or explain its cause."
        ],
        [
          "Knowledge-based CDSS means AI-based CDSS",
          "Knowledge-based uses rules from guidelines and experts. Non-knowledge-based uses patterns learned from data."
        ],
        [
          "More alerts always mean more safety",
          "Alert fatigue: frequent low-value alerts make clinicians ignore important ones."
        ],
        [
          "99% accuracy means a great model",
          "With 1% prevalence, predicting \"no\" for everyone gives 99% accuracy and finds no patient."
        ]
      ],
      "activities": [
        {
          "id": "w4-threshold",
          "title": "Threshold & Alert Lab",
          "desc": "An early-warning model scores 1,000 ward patients. Move the threshold and the prevalence, watch the confusion matrix, sensitivity, specificity, PPV and NPV change, see when the alert load exceeds what the nurses can handle — and try the 99%-accurate model that finds nobody.",
          "href": "w4/threshold.html"
        },
        {
          "id": "w4-calibration",
          "title": "Calibration & the New Hospital",
          "desc": "Move a validated model to a hospital where the condition is rarer or the population differs. See PPV fall, calibration drift, and why external validation matters.",
          "href": "w4/calibration.html"
        },
        {
          "id": "w4-oversight",
          "title": "Human Oversight Trainer",
          "desc": "Ten cases with an AI recommendation. Accept or override. Some recommendations are wrong because of stale data, a wrong-patient record or missing context. Your commission and omission errors are counted.",
          "href": "w4/oversight.html"
        }
      ],
      "quiz": [
        {
          "q": "What is a clinical decision support system (CDSS)?",
          "options": [
            "Patient-specific information supporting decisions",
            "A system that makes the final treatment decision",
            "An electronic billing tool",
            "A hospital robot"
          ],
          "answer": 0,
          "explain": "Slide 6: it supports decisions and does not replace professional judgment or accountability."
        },
        {
          "q": "What does predictive analytics estimate?",
          "options": [
            "The cause of a disease",
            "Likelihood of a future event",
            "The cost of a drug",
            "The past number of admissions"
          ],
          "answer": 1,
          "explain": "Slide 9: a prediction estimates risk; it does not prove the event will occur or explain its cause."
        },
        {
          "q": "What usually happens when you LOWER the alert threshold?",
          "options": [
            "Fewer alerts and fewer missed cases",
            "Nothing changes",
            "More cases caught and more false positives",
            "Specificity increases"
          ],
          "answer": 2,
          "explain": "Slide 11."
        },
        {
          "q": "Which measures depend strongly on prevalence?",
          "options": [
            "Only sensitivity",
            "Only specificity",
            "None of them",
            "PPV and NPV"
          ],
          "answer": 3,
          "explain": "Slide 12: the same model can behave differently in different settings."
        },
        {
          "q": "1% of 1,000 patients have a condition. A model predicts \"no condition\" for everyone. Its accuracy is…",
          "options": [
            "99%, but no affected patients found",
            "1%",
            "50%",
            "100%"
          ],
          "answer": 0,
          "explain": "Slide 13: 990 of 1,000 are correct, but sensitivity is 0."
        },
        {
          "q": "Calibration asks…",
          "options": [
            "Whether the model separates high- from low-risk patients",
            "Probabilities match observed event rates",
            "Whether data was encrypted",
            "How fast the model runs"
          ],
          "answer": 1,
          "explain": "Slide 14. Separating patients is discrimination."
        },
        {
          "q": "Testing a model at another hospital or in a later period is…",
          "options": [
            "Internal validation",
            "Data minimization",
            "External validation",
            "Alert fatigue"
          ],
          "answer": 2,
          "explain": "Slide 14."
        },
        {
          "q": "What does meaningful human oversight require, according to slide 15?",
          "options": [
            "Just a signature on every AI output",
            "No training",
            "Hiding the model's uncertainty",
            "Time, information and authority to disagree"
          ],
          "answer": 3,
          "explain": "The human is not merely a rubber stamp."
        },
        {
          "q": "Could a model be accurate overall but unsafe for a particular patient group?",
          "options": [
            "Yes; subgroup performance can differ",
            "No — overall accuracy guarantees safety for all",
            "Only if it uses images",
            "Only for children"
          ],
          "answer": 0,
          "explain": "Slide 18."
        },
        {
          "q": "The lecture's governance principle says…",
          "options": [
            "The vendor is always responsible",
            "Named owners and clear procedures",
            "The algorithm is responsible for its mistakes",
            "Nobody is responsible if the AI is accurate"
          ],
          "answer": 1,
          "explain": "Slide 19."
        },
        {
          "q": "Which is the lecturer's definition of an ACTIONABLE alert?",
          "options": [
            "Loud, frequent and red",
            "Shown for every patient",
            "Relevant, understandable, actionable",
            "Technically accurate, nothing else is needed"
          ],
          "answer": 2,
          "explain": "Lecture, 24 Oct. A distracting alert is irrelevant, repetitive, poorly timed or too vague."
        },
        {
          "q": "An AI system recommends a treatment, but the patient says they had severe side effects from it before. What should happen?",
          "options": [
            "Follow the recommendation, the AI has seen more cases",
            "Ask the AI to decide again",
            "Discharge the patient",
            "Consider patient history and preferences"
          ],
          "answer": 3,
          "explain": "Lecture, 5 Nov: the patient is not simply a collection of laboratory values."
        },
        {
          "q": "A model finds that a variable is strongly associated with readmission. What can we conclude?",
          "options": [
            "Association does not establish causation",
            "The variable causes readmission",
            "Removing the variable will prevent readmission",
            "The model is invalid"
          ],
          "answer": 0,
          "explain": "Lecture, 5 Nov: a prediction may still be useful without explaining causes."
        },
        {
          "q": "A vendor says its AI system is \"highly accurate and innovative\". What should a hospital manager do first?",
          "options": [
            "Buy it immediately",
            "Define the clinical problem",
            "Install it across the whole hospital",
            "Ask only about the price"
          ],
          "answer": 1,
          "explain": "Lecture, 5 Nov: \"Would you immediately purchase it? I hope not.\""
        }
      ],
      "cards": [
        [
          "CDSS",
          "Provides patient- or context-specific information to support decisions. Supports, does not replace, judgment and accountability."
        ],
        [
          "Predictive analytics",
          "Estimates the likelihood of a future event (deterioration, readmission, falls, no-shows). Not proof, not a cause."
        ],
        [
          "Prediction → action",
          "Define target → prediction time → validated risk estimate → threshold → response → measure the whole pathway."
        ],
        [
          "Threshold trade-off",
          "Lower = more true cases + more false positives. Higher = fewer alerts + more missed cases."
        ],
        [
          "NPV",
          "Among people not flagged, the proportion who truly do not have the condition."
        ],
        [
          "Prevalence effect",
          "PPV and NPV depend strongly on prevalence; rare condition → many false positives even with a good model."
        ],
        [
          "Accuracy paradox",
          "1% prevalence: \"nobody has it\" is 99% accurate and finds no one."
        ],
        [
          "Discrimination vs calibration",
          "Separating outcomes (AUC) vs predicted probabilities matching observed rates."
        ],
        [
          "Internal vs external validation",
          "Within the development data process vs another site, time period or population."
        ],
        [
          "Augmented intelligence",
          "AI extends human capability. Oversight needs time, information and authority to disagree."
        ],
        [
          "Automation bias",
          "Over-trusting a computer recommendation or overlooking contradictory evidence."
        ],
        [
          "Governance principle",
          "Responsibility cannot be delegated to an algorithm: named owners, documented intended use, versions, limitations."
        ],
        [
          "Actionable alert (lecture)",
          "Relevant to the situation, understandable to the user, connected to a realistic next step. Distracting = irrelevant, repetitive, poorly timed, vague."
        ],
        [
          "Calibrated trust",
          "Trust justified by capabilities and limits, with appropriate skepticism. \"95% confidence\" is not \"95% chance it is right\"."
        ]
      ]
    }
  ],
  "games": {
    "ai-history": {
      "ch": 1,
      "type": "order",
      "title": "The Origin Story of AI",
      "intro": "Put the milestones in chronological order (slides 6–7).",
      "items": [
        "Alan Turing asks \"Can machines think?\" and introduces the Turing Test",
        "Dartmouth Conference (1956): the term \"Artificial Intelligence\" is coined",
        "Early logic programs play chess, solve puzzles and prove theorems",
        "AI winters: funding cuts and slow progress",
        "Shift from rule-based systems to machine learning and deep learning"
      ]
    },
    "ai-areas": {
      "ch": 1,
      "type": "bucket",
      "title": "Which Area of AI in Healthcare?",
      "intro": "Sort each application into the three areas of slide 11.",
      "buckets": [
        "Clinical AI",
        "Administrative & operational AI",
        "Strategic & system-level AI"
      ],
      "items": [
        [
          "Detecting a possible fracture on an X-ray",
          0
        ],
        [
          "Predicting a patient's risk of complications",
          0
        ],
        [
          "Treatment planning support",
          0
        ],
        [
          "Remote patient monitoring",
          0
        ],
        [
          "Booking and rescheduling appointments",
          1
        ],
        [
          "Forecasting emergency-department demand",
          1
        ],
        [
          "Planning nurse shifts",
          1
        ],
        [
          "Drafting clinical documentation",
          1,
          "Documentation is listed under administrative and operational AI on slide 11."
        ],
        [
          "Analysing the health of a whole population",
          2
        ],
        [
          "Five-year financial forecasting for the hospital group",
          2
        ],
        [
          "Public-health surveillance of outbreaks",
          2
        ],
        [
          "Long-term quality-improvement planning",
          2
        ]
      ]
    },
    "tech-match": {
      "ch": 2,
      "type": "bucket",
      "title": "Pick the Technology",
      "intro": "Start with the problem: which technology family fits each task best (slides 5 and 23)?",
      "buckets": [
        "Machine learning",
        "Deep learning / computer vision",
        "NLP",
        "Robotics",
        "Generative AI"
      ],
      "items": [
        [
          "Predict deterioration from vital-sign trends",
          0
        ],
        [
          "Forecast appointment no-shows",
          0
        ],
        [
          "Estimate readmission risk from tabular records",
          0
        ],
        [
          "Find a lesion on a CT scan",
          1
        ],
        [
          "Classify skin photos in dermatology",
          1
        ],
        [
          "Extract medication history from clinical notes",
          2
        ],
        [
          "Route patient messages to the right team",
          2
        ],
        [
          "Detect adverse-event signals in narratives",
          2
        ],
        [
          "Move linen and meals between wards",
          3
        ],
        [
          "Support repetitive rehabilitation exercises",
          3
        ],
        [
          "Draft patient-friendly discharge instructions (with review)",
          4
        ],
        [
          "Generate case vignettes for staff training",
          4
        ]
      ]
    },
    "learning-setup": {
      "ch": 2,
      "type": "bucket",
      "title": "Supervised, Unsupervised or Reinforcement?",
      "intro": "Which learning setup is each example (slide 7)?",
      "buckets": [
        "Supervised",
        "Unsupervised",
        "Reinforcement"
      ],
      "items": [
        [
          "Predict readmission from past admissions and their outcomes",
          0
        ],
        [
          "Classify X-rays labelled by radiologists as normal/abnormal",
          0
        ],
        [
          "Predict no-shows from past appointments marked attended/missed",
          0
        ],
        [
          "Group patients with similar patterns of service use",
          1
        ],
        [
          "Find clusters of diseases that tend to occur together, without labels",
          1
        ],
        [
          "Optimize a simulated care pathway by trial and feedback",
          2
        ],
        [
          "An agent learns dosing strategy in a simulator from rewards",
          2
        ]
      ]
    },
    "dq-dims": {
      "ch": 3,
      "type": "bucket",
      "title": "Name the Data-Quality Problem",
      "intro": "Which of the six dimensions (slides 12–13) does each problem violate?",
      "buckets": [
        "Accuracy",
        "Completeness",
        "Consistency",
        "Timeliness",
        "Validity",
        "Uniqueness"
      ],
      "items": [
        [
          "A lab result is attached to the wrong patient",
          0
        ],
        [
          "The recorded allergy is wrong — the patient tolerates the drug",
          0
        ],
        [
          "The medication list is missing an anticoagulant",
          1
        ],
        [
          "Date of birth field left empty",
          1
        ],
        [
          "Weight in pounds in one system and kilograms in another",
          2
        ],
        [
          "Two systems disagree on the patient's blood group",
          2
        ],
        [
          "A result reaches the dashboard after the treatment decision",
          3
        ],
        [
          "Yesterday's potassium used for an emergency decision today",
          3
        ],
        [
          "Body temperature recorded as 410 °C",
          4
        ],
        [
          "A diagnosis code that does not exist in the code set",
          4
        ],
        [
          "The same patient registered twice under slightly different names",
          5
        ],
        [
          "One admission counted twice in the monthly report",
          5
        ]
      ]
    },
    "analytics": {
      "ch": 3,
      "type": "bucket",
      "title": "Four Levels of Analytics",
      "intro": "Classify each question (slide 19).",
      "buckets": [
        "Descriptive — what happened?",
        "Diagnostic — why?",
        "Predictive — what will happen?",
        "Prescriptive — what should we do?"
      ],
      "items": [
        [
          "How many emergency visits did we have each month?",
          0
        ],
        [
          "What was last year's average length of stay?",
          0
        ],
        [
          "Why were waiting times longer on night shifts?",
          1
        ],
        [
          "Do wait times differ by patient acuity?",
          1
        ],
        [
          "Which wards are likely to exceed capacity next weekend?",
          2
        ],
        [
          "What is this patient's risk of readmission?",
          2
        ],
        [
          "Which staffing plan best covers next week's forecast demand?",
          3
        ],
        [
          "Which follow-up strategy may reduce readmissions most?",
          3
        ]
      ]
    },
    "pred-action": {
      "ch": 4,
      "type": "order",
      "title": "From Prediction to Action",
      "intro": "Order the steps of slide 10.",
      "items": [
        "Define the target: event, population, time horizon",
        "Choose the prediction time: what was known then?",
        "Estimate risk with a validated model",
        "Choose a threshold from benefits, harms and capacity",
        "Connect the output to a response",
        "Measure whether the whole pathway improves outcomes"
      ]
    },
    "eval-terms": {
      "ch": 4,
      "type": "match",
      "title": "Validation Vocabulary",
      "intro": "Match each term (slide 14).",
      "pairs": [
        [
          "Discrimination",
          "How well the model separates people with different outcomes"
        ],
        [
          "Calibration",
          "Do predicted probabilities match observed event rates?"
        ],
        [
          "Internal validation",
          "Testing within the development data process"
        ],
        [
          "External validation",
          "Testing at another site, time or population"
        ],
        [
          "Data leakage",
          "Using information unavailable at prediction time"
        ]
      ]
    }
  }
};

Object.assign(window.COURSE, {
  "exam": {
    "title": "Midterm",
    "when": "7 Nov 2026",
    "scope": "Weeks 1–4",
    "done": true,
    "parts": [
      [
        "Multiple choice",
        null,
        "the final is multiple choice too"
      ]
    ],
    "plan": [
      [
        "ozet.html",
        "Review the midterm distinctions",
        25
      ],
      [
        "mock.html",
        "Practise 24 multiple-choice items",
        25
      ]
    ],
    "length": "Multiple choice"
  },
  "resources": [
    {
      "kind": "summary",
      "href": "ozet.html",
      "title": "Midterm özeti",
      "meta": "Weeks 1–4 · Türkçe · self-test",
      "desc": "Multiple-choice distinctions, short examples and answer-hiding practice."
    },
    {
      "kind": "mock",
      "href": "mock.html",
      "title": "Mock midterm",
      "meta": "24 MC items · instant feedback",
      "desc": "One practice paper covering Weeks 1–4, with reasons after every choice."
    },
    {
      "kind": "videos",
      "href": "videos.html",
      "title": "Explainer videos",
      "meta": "5 videos · Week 4 · 7.5 min",
      "desc": "Thresholds, confusion matrix, prevalence, prediction to action, trust."
    }
  ]
});
