/* Existing course notes condensed. Check option 0 is correct; learn.js shuffles options and adds practice. */
window.GUIDE = {
  "1": {
    "goal": "Explain AI’s role and limits in healthcare management.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Start with the healthcare problem",
        "key": "The course connects <b>purpose → technology → data → decisions</b>.",
        "fig": {
          "type": "flow",
          "t": "The course in four weeks",
          "items": [
            [
              "",
              "1 · Purpose",
              "What can AI contribute?",
              "c0"
            ],
            [
              "",
              "2 · Technology",
              "Which tool fits the task?",
              "c1"
            ],
            [
              "",
              "3 · Data",
              "Can we trust its inputs?",
              "c2"
            ],
            [
              "",
              "4 · Decisions",
              "Can people use it safely?",
              "c3"
            ]
          ]
        },
        "html": "<p>A hospital has long waits, staff shortages, rising costs and high demand. The course asks whether AI can help deliver better care with the resources available.</p><p>Week 1 defines its role. Week 2 chooses technologies. Week 3 checks data. Week 4 connects outputs to safe decisions. Follow this path whenever a vendor offers a new tool.</p><p><b>In class:</b> an accurate ED forecast delivered too late to change staffing has little benefit. AI supplies information; managers still need staff, budget and a workable response.</p>",
        "check": {
          "q": "An ED forecast arrives after staffing is fixed. What limits its value?",
          "o": [
            "Its timing prevents action",
            "Its prediction is necessarily false",
            "It creates new beds"
          ],
          "why": "Useful information must arrive while someone can act on it."
        }
      },
      {
        "t": "AI performs tasks without acquiring human judgment",
        "key": "AI = computer systems that do tasks we normally link to <b>human intelligence</b>: learning from data, understanding language, reading images, predicting, and supporting decisions.",
        "fig": {
          "type": "flow",
          "t": "What AI can do in a hospital",
          "items": [
            [
              "",
              "Learn patterns",
              "from patient data",
              "c0"
            ],
            [
              "",
              "Understand language",
              "doctors' notes",
              "c3"
            ],
            [
              "",
              "Interpret images",
              "X-rays, scans",
              "c5"
            ],
            [
              "",
              "Predict",
              "risk of deterioration",
              "c2"
            ],
            [
              "",
              "Support decisions",
              "a human decides",
              "c1"
            ]
          ]
        },
        "html": "<p><b>AI</b> systems learn patterns, interpret language and images, predict and support decisions. These abilities depend on design, training data and intended use.</p><div class=\"callout warn\">A natural-sounding answer does not establish understanding, empathy or moral responsibility.</div><p><b>In class:</b> a chatbot with predefined opening-hours answers is not necessarily AI. The Turing Test concerns observable behavior; it does not prove consciousness.</p>",
        "check": {
          "q": "Which statement matches the lecture?",
          "o": [
            "AI abilities depend on its design, training data and intended use",
            "AI has the same professional judgment as an experienced doctor",
            "AI carries moral responsibility for its recommendations",
            "AI understands every patient fully once it has enough data"
          ],
          "why": "Slide 5: AI does not automatically possess understanding, judgment, empathy or moral responsibility."
        }
      },
      {
        "t": "Turing asked the question; Dartmouth named the field",
        "key": "<b>Turing</b> asked the question (\"Can machines think?\"). <b>Dartmouth 1956</b> gave the field its name. AI is booming today because of <b>data + computing power + better algorithms</b>.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "1940s–50s",
              "Turing: \"Can machines think?\", the Turing Test",
              "c3"
            ],
            [
              "",
              "1956",
              "Dartmouth: the name \"Artificial Intelligence\"",
              "c0"
            ],
            [
              "",
              "1950s–70s",
              "logic and hand-written rules",
              "c5"
            ],
            [
              "",
              "AI winters",
              "big promises, then funding cuts",
              "mute"
            ],
            [
              "",
              "Today",
              "machine learning and deep learning",
              "c1"
            ]
          ]
        },
        "html": "<p>Turing asked whether machines could think and proposed the Turing Test. Dartmouth in 1956 established the name <b>Artificial Intelligence</b>.</p><p>Early systems used logic and rules. AI winters brought funding cuts and slow progress. Modern machine learning and deep learning developed with more data, computing power and better algorithms.</p><div class=\"callout warn\">Do not assign the name of the field to Turing.</div>",
        "check": {
          "q": "Where did the term \"Artificial Intelligence\" come from?",
          "o": [
            "The 1956 Dartmouth Conference (McCarthy, Minsky, Rochester, Shannon)",
            "Alan Turing's Turing Test paper",
            "The AI winters of the 1980s",
            "The first deep-learning systems"
          ],
          "why": "Slide 6: the term was coined at Dartmouth in 1956. Turing asked \"Can machines think?\"."
        }
      },
      {
        "t": "An agent turns observations into actions",
        "key": "An <b>agent</b> senses its environment, decides with its <b>agent function</b>, and acts through <b>actuators</b>. It can be pure software; it does not have to be a robot.",
        "fig": {
          "type": "anim",
          "name": "agent",
          "t": "A ward monitoring agent",
          "cap": "Limits as in the lab: heart rate > 110, breathing > 24, SpO₂ < 92%, temperature > 38.3 °C. Illustrative, not clinical."
        },
        "html": "<p>A ward monitor is an <b>intelligent agent</b>. Sensors read vital signs; the agent function maps those readings to an action; an actuator sends the nurse an alert. The ward is its environment. A performance measure judges how well it meets its goals.</p><p>A software agent can read an EHR and send a message without a physical robot. Choose balanced measures: catching deterioration matters, but false alarms also consume staff time.</p>",
        "lab": {
          "href": "w1/agent.html",
          "todo": [
            "Leave all four sensors on and the rule at <b>2</b>. Click <b>Run 24 hours</b>. Look at the score: how many patients were caught early?",
            "Now <b>switch off the SpO₂ sensor</b>, click Reset and run again. The patient with a breathing problem is missed — <i>an agent cannot act on what it cannot perceive.</i>",
            "Turn SpO₂ back on, set the rule to <b>1 abnormal reading</b> and switch on <b>Noisy environment</b>. Run. Count the false alarms — this is how <b>alert fatigue</b> starts (week 4)."
          ]
        },
        "check": {
          "q": "A scheduling bot books appointments by sending commands to the hospital system. In agent terms these commands are its…",
          "o": [
            "actuators",
            "sensors",
            "agent function",
            "performance measure"
          ],
          "why": "Actuators are how an agent acts on its environment. Software commands count (slide 10)."
        }
      },
      {
        "t": "Sort the task by the decision it supports",
        "key": "AI in healthcare is <b>not only diagnosis</b>. There are three areas: caring for the patient, running the hospital, and planning for the whole system and the future.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "1. Clinical AI",
              "pts": [
                "diagnosis support",
                "medical imaging",
                "risk prediction",
                "treatment planning, monitoring"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "2. Administrative & operational",
              "pts": [
                "appointment scheduling",
                "staff planning, demand forecasting",
                "bed management, billing"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "3. Strategic & system-level",
              "pts": [
                "population-health analysis",
                "financial forecasting",
                "public-health surveillance, long-term planning"
              ],
              "c": "c1"
            }
          ],
          "cap": "Ask \"who is it for?\": one patient → clinical; today's operations → operational; the whole system or years ahead → strategic."
        },
        "html": "<p><b>Clinical AI</b> supports patient care: imaging, diagnosis support and monitoring. <b>Administrative and operational AI</b> supports scheduling, patient flow and staffing. <b>Strategic and system-level AI</b> supports population health and long-term planning.</p><p>The distinction is the task, rather than whether the tool uses a particular algorithm. A hospital manager needs all three areas.</p>",
        "check": {
          "q": "A tool that forecasts how many nurses the emergency department will need next weekend belongs to…",
          "o": [
            "administrative & operational AI",
            "clinical AI",
            "strategic & system-level AI",
            "it is not AI"
          ],
          "why": "Staff planning and demand forecasting are listed under area 2 (operational)."
        }
      },
      {
        "t": "Healthcare decisions carry consequences",
        "key": "A hospital is not Netflix. Decisions are <b>complex, urgent, uncertain and high-stakes</b>, resources are limited, and care must centre on the patient.",
        "fig": {
          "type": "boxes",
          "t": "Six reasons (slide 12)",
          "rows": [
            {
              "cells": [
                [
                  "Complex information",
                  "c0"
                ],
                [
                  "Time sensitivity",
                  "c2"
                ],
                [
                  "Uncertainty",
                  "c3"
                ]
              ]
            },
            {
              "cells": [
                [
                  "High consequences",
                  "bad"
                ],
                [
                  "Resource constraints",
                  "c5"
                ],
                [
                  "Human-centred care",
                  "c1"
                ]
              ]
            }
          ],
          "cap": "If Netflix gets it wrong you lose two hours. If a hospital AI misses sepsis, a patient may die."
        },
        "html": "<p>Healthcare combines complex information, time pressure, uncertainty, high consequences, limited resources and human-centered care. Symptoms and test results may leave an incomplete picture.</p><p>Patients also have values and preferences. A pattern in records cannot capture every concern affecting the decision.</p>",
        "check": {
          "q": "Which is NOT one of the lecture's reasons why healthcare is different?",
          "o": [
            "Healthcare data is usually simple and complete",
            "High consequences",
            "Time sensitivity",
            "Human-centred care"
          ],
          "why": "The six reasons are complex information, time sensitivity, uncertainty, high consequences, resource constraints and human-centred care."
        }
      },
      {
        "t": "Evaluate the benefit before expanding use",
        "key": "AI <b>cannot guarantee</b> a correct diagnosis, better outcomes everywhere, fair results for everyone, or savings. The human keeps the <b>professional responsibility</b>.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "AI cannot guarantee",
              "pts": [
                "a correct diagnosis every time",
                "better outcomes in every setting",
                "unbiased results for every population",
                "full understanding of a patient",
                "automatic cost savings",
                "the end of human error or responsibility"
              ],
              "c": "c4"
            },
            {
              "icon": "",
              "t": "So responsible use needs",
              "pts": [
                "good data and validation",
                "testing in the intended clinical setting",
                "a human who checks and decides"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>AI cannot guarantee correct diagnoses, unbiased results, better outcomes everywhere or automatic cost savings. It cannot create beds or qualified professionals.</p><p>Use quality data, validate in the intended setting, protect privacy, provide oversight and keep monitoring. This closes Week 1: define the problem before choosing Week 2’s technology, then test its data and decision pathway in Weeks 3–4.</p><div class=\"callout warn\">A successful vendor demonstration does not establish benefit in your hospital.</div>",
        "lab": {
          "href": "w1/manager.html",
          "todo": [
            "Read the hospital's problems at the top. Pick <b>three</b> AI projects you think would help most.",
            "For each one, decide whether it may act <b>without human approval</b>.",
            "Click <b>Submit plan to the board</b> and read the review: which area each project belongs to, what it can and cannot guarantee, and whether you fell for the red-flag project."
          ]
        },
        "check": {
          "q": "A vendor says: \"Our AI will automatically cut your costs and remove diagnostic errors.\" According to the lecture…",
          "o": [
            "Both claims are things AI cannot guarantee",
            "Both are true if the model is accurate",
            "Cost savings are guaranteed, error removal is not",
            "Error removal is guaranteed, cost savings are not"
          ],
          "why": "Slide 14 lists automatic cost reduction and the end of human error/responsibility among things AI cannot guarantee."
        }
      }
    ]
  },
  "2": {
    "goal": "Choose technologies for healthcare tasks and recognize their limits.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Choose a tool for the healthcare task",
        "key": "Choose a <b>technology</b> for the healthcare problem; then check its data and use.",
        "fig": {
          "type": "flow",
          "t": "The course in four weeks",
          "items": [
            [
              "",
              "1 · Purpose",
              "What can AI contribute?",
              "c0"
            ],
            [
              "",
              "2 · Technology",
              "Which tool fits the task?",
              "c1"
            ],
            [
              "",
              "3 · Data",
              "Can we trust its inputs?",
              "c2"
            ],
            [
              "",
              "4 · Decisions",
              "Can people use it safely?",
              "c3"
            ]
          ]
        },
        "html": "<p>Week 1 asked what problem needs solving. This week asks which technology fits it. Week 3 will test the inputs; Week 4 will test the response.</p><p><b>AI</b> is an umbrella covering machine learning, deep learning, NLP, computer vision, robotics and generative AI. A task may combine them: discharge instructions can use retrieval and generated text, with approved sources and professional review.</p>",
        "check": {
          "q": "Where should technology selection start?",
          "o": [
            "The healthcare problem",
            "The vendor’s most impressive demonstration",
            "The newest model name"
          ],
          "why": "Choose a tool for a defined need."
        }
      },
      {
        "t": "Learning uses examples instead of every handwritten rule",
        "key": "Normal software follows rules a person wrote. Machine learning <b>learns the rules from past examples</b> by reducing its error, and then predicts for new patients.",
        "fig": {
          "type": "flow",
          "t": "The ML pipeline (slides 6–7)",
          "items": [
            [
              "",
              "Inputs",
              "10,000 past patient records",
              "c0"
            ],
            [
              "",
              "Training",
              "adjust parameters to reduce the error (loss)",
              "c2"
            ],
            [
              "",
              "Output",
              "a prediction, probability or ranking",
              "c1"
            ],
            [
              "",
              "Human use",
              "a clinician decides",
              "c3"
            ]
          ]
        },
        "html": "<p><b>Machine learning</b> adjusts model parameters from data to reduce an error measure. Features are input information that may help prediction.</p><p><b>Supervised learning</b> uses known outcomes, such as readmission. <b>Unsupervised learning</b> groups patterns without a target label; people must check whether the groups are useful. <b>Reinforcement learning</b> uses actions and feedback; trial and error needs simulation and safety checks before patient use.</p>",
        "check": {
          "q": "You have records of past patients, each labelled \"readmitted within 30 days: yes/no\". You train a model to predict this for new patients. This is…",
          "o": [
            "supervised learning",
            "unsupervised learning",
            "reinforcement learning",
            "generative AI"
          ],
          "why": "Known outcomes (labels) → supervised."
        }
      },
      {
        "t": "Deep learning is one approach within machine learning",
        "key": "Deep learning uses neural networks with <b>many layers</b>. Each layer sees something more abstract, from raw pixels up to \"a lesion\".",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Pixels",
              "raw input",
              "mute"
            ],
            [
              "",
              "Edges",
              "layer 1",
              "c0"
            ],
            [
              "",
              "Shapes",
              "middle layers",
              "c3"
            ],
            [
              "",
              "\"A lesion\"",
              "last layer",
              "c4"
            ]
          ],
          "cap": "Works on raw data (images, audio, ECG, text). Needs lots of data and computing power, and is hard to explain."
        },
        "html": "<p><b>Deep learning</b> uses multi-layer neural networks and is used for tasks such as medical image classification. It often needs substantial data and computing power and can be difficult to interpret.</p><div class=\"callout warn\">Good training performance does not guarantee good performance at another hospital. A more sophisticated model is not automatically better.</div>",
        "check": {
          "q": "Which is a typical limitation of deep learning mentioned in the lecture?",
          "o": [
            "It is often harder to explain and needs more data and compute",
            "It can only use structured tables",
            "It cannot handle images",
            "It never needs validation"
          ],
          "why": "DL excels with large complex data but is often harder to explain and needs more data and compute."
        }
      },
      {
        "t": "Clinical text must retain its context",
        "key": "NLP turns free-text notes into structured data. The trap is <b>context</b>: a word can appear in a note even though the patient does <b>not</b> have it.",
        "fig": {
          "type": "boxes",
          "head": [
            "Sentence in the note",
            "Naive keyword reader",
            "Correct meaning"
          ],
          "rows": [
            {
              "cells": [
                [
                  "\"No evidence of pneumonia\"",
                  ""
                ],
                [
                  "pneumonia ✗",
                  "bad"
                ],
                [
                  "negated: does NOT have it",
                  "ok"
                ]
              ]
            },
            {
              "cells": [
                [
                  "\"Mother has diabetes\"",
                  ""
                ],
                [
                  "diabetes ✗",
                  "bad"
                ],
                [
                  "family history, not the patient",
                  "ok"
                ]
              ]
            }
          ]
        },
        "html": "<p><b>NLP</b> processes language in notes and summaries. Finding a disease word is insufficient. “No evidence of pneumonia” negates it; “admitted last month for pneumonia” places it in the past; “considering pneumonia” leaves it uncertain.</p><p>Omissions, wrong timing and unsupported inferences can change the clinical meaning. Check the source note before using the extraction.</p>",
        "lab": {
          "href": "w2/nlp.html",
          "todo": [
            "Load a few preset notes. For each concept, choose your own answer first (present / negated / historical / uncertain / family) and click <b>Check my answers</b>.",
            "Compare the <b>naive</b> output with the <b>context-aware</b> one. Note which words (cue words like \"denies\", \"no\", \"mother\") change the meaning.",
            "Load the two <b>tricky</b> notes: even the smarter rules fail. That's why NLP output must be checked."
          ]
        },
        "check": {
          "q": "An NLP system stores \"denies chest pain\" as \"chest pain: present\". Which aspect did it miss?",
          "o": [
            "Negation",
            "Family history",
            "Time (historical)",
            "Image segmentation"
          ],
          "why": "\"Denies\" is a negation cue."
        }
      },
      {
        "t": "Vision outputs answer different questions",
        "key": "Three vision tasks, three questions about the same X-ray: <b>what</b> is there (classification), <b>where</b> (detection), <b>which exact pixels</b> (segmentation).",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Classification",
              "pts": [
                "What is present?",
                "→ \"Lesion: yes\""
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Detection",
              "pts": [
                "Where is it?",
                "→ a box around it"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "Segmentation",
              "pts": [
                "Which exact pixels?",
                "→ its outline"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p><b>Classification</b> assigns a category to an image. <b>Detection</b> locates a suspicious area. <b>Segmentation</b> marks its pixels.</p><p>Scanner differences and a changed patient population can weaken performance at a new hospital. Validate locally rather than assuming the training site represents every setting.</p>",
        "lab": {
          "href": "w2/vision.html",
          "todo": [
            "Click <b>New scan</b> a few times and compare the three panels: classification, detection, segmentation.",
            "Under \"Validate the model\", keep <b>Train on Hospital A</b> and test on <b>Hospital A</b>, then <b>B</b>, then <b>C</b>. Watch the red borders appear at B and C.",
            "Click <b>Re-train with Hospital B data</b> and test B again. Lesson: validate (and if needed re-train) at every new site."
          ]
        },
        "check": {
          "q": "A tool draws the exact outline of a tumour, pixel by pixel. Which task is this?",
          "o": [
            "Segmentation",
            "Classification",
            "Detection",
            "Generation"
          ],
          "why": "Segmentation = which pixels. Detection = where (a box). Classification = what."
        }
      },
      {
        "t": "A robot must act safely around people",
        "key": "A robot is an AI agent <b>with a body</b>: it senses, plans, controls and physically acts.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Surgical assistance",
              "pts": [
                "precise, surgeon-guided"
              ],
              "c": "c4"
            },
            {
              "icon": "",
              "t": "Hospital logistics",
              "pts": [
                "medicines, samples, linen"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "Rehabilitation",
              "pts": [
                "exoskeletons, therapy"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Social / assistive",
              "pts": [
                "companionship, reminders"
              ],
              "c": "c3"
            }
          ]
        },
        "html": "<p><b>Robotics</b> connects sensing and decisions to physical action, such as moving supplies. A mapped environment, sensors and safe navigation matter.</p><p>A hospital changes continuously: people move, routes become blocked and exceptions occur. Safety and human interaction are central requirements.</p>",
        "check": {
          "q": "What makes hospital robotics difficult?",
          "o": [
            "A changing safety-critical environment",
            "A hospital never changes",
            "Robots need no sensors"
          ],
          "why": "The course emphasizes people, exceptions and safe navigation."
        }
      },
      {
        "t": "Fluent drafts still need verification",
        "key": "Generative AI writes beautifully, but <b>fluent is not the same as true</b>. A human must always <b>review</b> the output before it is used.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Prompt",
              "",
              "c0"
            ],
            [
              "",
              "Model",
              "",
              "c3"
            ],
            [
              "",
              "Output",
              "reads very well…",
              "c2"
            ],
            [
              "",
              "Human review",
              "check facts, context, patient details",
              "c1"
            ]
          ],
          "cap": "The three risks: hallucination (invented facts), missing context, and automation bias (trusting it too much)."
        },
        "html": "<p><b>Generative AI</b> produces new text and other content. A <b>hallucination</b> is a fabricated fact or detail presented confidently.</p><p>Constrain the task, use trusted sources, request uncertainty, verify claims and document human review. A professional must review a drafted clinical note before it enters the record.</p><div class=\"callout warn\">Polish is not evidence. Accepting an authoritative-looking draft without checking is automation bias.</div>",
        "lab": {
          "href": "w2/verify.html",
          "todo": [
            "Read the patient record on the left — that's the truth.",
            "Go through the AI draft sentence by sentence and label each one: supported / contradicts the record / hallucination / missing context.",
            "Click <b>Check my review</b>. Did you catch the invented CT scan, the wrong antibiotic, the \"no allergies\" claim and the fake guideline?"
          ]
        },
        "check": {
          "q": "An AI-written letter cites a hospital policy that does not exist. This is…",
          "o": [
            "a hallucination",
            "a calibration error",
            "segmentation",
            "negation"
          ],
          "why": "A fabricated fact, test, reference or policy is a hallucination."
        }
      },
      {
        "t": "Deployment begins a monitoring cycle",
        "key": "Every project goes <b>Need → Data → Develop → Validate → Implement → Monitor</b>, and back to the start. Memory hook: \"Never Do Dangerous Validations In Medicine\".",
        "fig": {
          "type": "flow",
          "t": "Keep evaluating after release",
          "items": [
            [
              "",
              "Need",
              "Define the problem",
              "c0"
            ],
            [
              "",
              "Data and development",
              "Assess and build",
              "c1"
            ],
            [
              "",
              "Validation and use",
              "Test, then implement",
              "c2"
            ],
            [
              "",
              "Monitoring",
              "Check changing conditions",
              "c3"
            ]
          ]
        },
        "html": "<p>Define the need, assess data, develop, validate, implement and monitor. Patient populations, procedures and recording practices change after deployment.</p><p>Ask who is responsible, whether subgroup performance differs and whether users can challenge the output. Week 2 supplies possible tools; Week 3 checks the data that makes those tools useful.</p>",
        "check": {
          "q": "Which step comes directly after \"Validate\" in the lifecycle?",
          "o": [
            "Implement",
            "Develop",
            "Assess data",
            "Define need"
          ],
          "why": "Define need → assess data → develop → validate → implement → monitor."
        }
      }
    ]
  },
  "3": {
    "goal": "Identify usable data and distinguish quality from interoperability.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Trust the inputs before using the output",
        "key": "A suitable tool still needs <b>trustworthy data</b> before it can support decisions.",
        "fig": {
          "type": "flow",
          "t": "The course in four weeks",
          "items": [
            [
              "",
              "1 · Purpose",
              "What can AI contribute?",
              "c0"
            ],
            [
              "",
              "2 · Technology",
              "Which tool fits the task?",
              "c1"
            ],
            [
              "",
              "3 · Data",
              "Can we trust its inputs?",
              "c2"
            ],
            [
              "",
              "4 · Decisions",
              "Can people use it safely?",
              "c3"
            ]
          ]
        },
        "html": "<p>Week 2 selected technologies. This week asks whether their inputs are trustworthy, usable and responsibly governed. Week 4 will use their outputs for decisions.</p><p>Healthcare data includes clinical records, administrative records, images, monitoring streams and patient-generated data. More records do not automatically make a better dataset: a missing medicine or a result attached to the wrong patient can change a recommendation.</p>",
        "check": {
          "q": "What is the central data challenge?",
          "o": [
            "Trustworthy, usable, governed data",
            "Collecting the largest file possible",
            "Replacing all records with images"
          ],
          "why": "Volume alone does not establish usefulness."
        }
      },
      {
        "t": "A record must follow the patient over time",
        "key": "An <b>EMR</b> lives inside one hospital. An <b>EHR</b> follows the patient <b>across organisations over time</b>. A scanned paper chart is neither: it is just a picture.",
        "fig": {
          "type": "flow",
          "t": "A record across care",
          "items": [
            [
              "",
              "Capture",
              "Record the encounter",
              "c0"
            ],
            [
              "",
              "Standardize and link",
              "Connect patient information",
              "c1"
            ],
            [
              "",
              "Exchange and use",
              "Support the workflow",
              "c2"
            ],
            [
              "",
              "Update",
              "Keep the record current",
              "c3"
            ]
          ]
        },
        "html": "<p>An <b>EMR</b> commonly refers to one organization’s record; an <b>EHR</b> suggests a broader longitudinal view. Data is captured, standardized, stored and linked, exchanged, used and updated.</p><p>Duplicate entry, poor integration and alert fatigue can make an electronic system difficult to use. Electronic storage alone does not establish data quality.</p>",
        "check": {
          "q": "Which is true?",
          "o": [
            "An EHR gives a broader longitudinal view; an EMR is usually within one organisation",
            "An EMR is broader than an EHR",
            "A scanned paper chart is an EHR",
            "EHR data never contains errors"
          ],
          "why": "EMR = one organisation; EHR = across encounters and settings. A scanned chart is not an EHR."
        }
      },
      {
        "t": "Data arrives in different forms and at different speeds",
        "key": "<b>Structured</b> data fits fixed fields (BP 120/80). <b>Unstructured</b> data is free form (notes, images). <b>Semi-structured</b> has some tags (XML/JSON messages).",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Structured",
              "pts": [
                "blood pressure 120/80",
                "coded diagnosis",
                "date of birth"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Semi-structured",
              "pts": [
                "tagged messages (XML / JSON)"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "Unstructured",
              "pts": [
                "doctor's notes",
                "discharge summaries",
                "scan images"
              ],
              "c": "c4"
            }
          ]
        },
        "html": "<p><b>Structured data</b> has defined fields; a free-text discharge summary is unstructured. Healthcare also uses semi-structured data.</p><p>The big-data Vs describe <b>volume</b>, <b>velocity</b>, <b>variety</b> and <b>veracity</b>; value is often added. Rapid monitor readings illustrate velocity. Noise, uncertainty and missing values concern veracity.</p>",
        "check": {
          "q": "Monitors in the ICU send readings every second. Which V is this mainly about?",
          "o": [
            "Velocity",
            "Veracity",
            "Variety",
            "Value"
          ],
          "why": "Velocity = the speed data arrives."
        }
      },
      {
        "t": "Define the question before preparing the dataset",
        "key": "Raw hospital data is <b>not</b> ready for AI. Define the question first, then source, document, clean and check the data, and keep monitoring it.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Define the question",
              "predict what, for whom?",
              "c0"
            ],
            [
              "",
              "Lawful, relevant sources",
              "",
              "c3"
            ],
            [
              "",
              "Document provenance",
              "where it came from",
              "c5"
            ],
            [
              "",
              "Clean and harmonise",
              "units, codes, duplicates",
              "c2"
            ],
            [
              "",
              "Handle missingness",
              "missing is not random!",
              "c4"
            ],
            [
              "",
              "Version and monitor",
              "",
              "c1"
            ]
          ]
        },
        "html": "<p>First identify the decision or outcome the dataset must support. Then collect and prepare the relevant data, resolve quality issues and document its origin and transformations.</p><p><b>Data provenance</b> records where a field came from and how it changed. Keep information needed to interpret results rather than treating an unexplained number as ready for analysis.</p>",
        "check": {
          "q": "What should come before dataset preparation?",
          "o": [
            "Define the decision question",
            "Collect every available field",
            "Deploy a model first"
          ],
          "why": "The question determines the relevant data."
        }
      },
      {
        "t": "Different data errors need different repairs",
        "key": "Learn the <b>six dimensions</b> of data quality, each with one example. They are very likely exam questions.",
        "fig": {
          "type": "boxes",
          "head": [
            "Dimension",
            "Example of a problem"
          ],
          "rows": [
            {
              "cells": [
                [
                  "Accuracy",
                  "c0"
                ],
                [
                  "temperature recorded as 410 °C",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Completeness",
                  "c1"
                ],
                [
                  "allergy field left empty",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Consistency",
                  "c2"
                ],
                [
                  "kg in system A, pounds in system B",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Timeliness",
                  "c3"
                ],
                [
                  "vital signs from 9 hours ago used for a decision now",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Validity",
                  "c5"
                ],
                [
                  "date \"31/02/2026\"; an invalid diagnosis code",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Uniqueness",
                  "c4"
                ],
                [
                  "the same patient registered twice",
                  ""
                ]
              ]
            }
          ],
          "cap": "Memory hook: \"A Cat Can Take Very Unusual naps\"."
        },
        "html": "<p><b>Accuracy</b> concerns correctness, including patient identity. <b>Completeness</b> concerns missing information. <b>Consistency</b> concerns compatible representations. <b>Timeliness</b> concerns availability when needed. <b>Validity</b> concerns allowed values. <b>Uniqueness</b> concerns duplicates.</p><p>A missing anticoagulant is incomplete; 410 °C is invalid; mixed pounds and kilograms are inconsistent; duplicate patients break uniqueness.</p>",
        "lab": {
          "href": "w3/quality.html",
          "todo": [
            "Read the note at the top: system A records weight in kg, system B in lb.",
            "Click every cell that looks suspicious and choose the dimension it breaks. There are <b>9</b> problems.",
            "Try to find all 9 before using <b>Reveal remaining problems</b>."
          ]
        },
        "check": {
          "q": "The same patient appears twice with two different record numbers. Which dimension is violated?",
          "o": [
            "Uniqueness",
            "Timeliness",
            "Validity",
            "Accuracy"
          ],
          "why": "Duplicates violate uniqueness."
        }
      },
      {
        "t": "Privacy protection does not remove every source of bias",
        "key": "Models learn <b>old inequalities</b> from historical data. A <b>proxy</b> like past spending can make groups who had less access look healthier than they are.",
        "fig": {
          "type": "flow",
          "t": "How a proxy creates bias",
          "items": [
            [
              "",
              "Group had less access to care",
              "",
              "c3"
            ],
            [
              "",
              "So they spent less",
              "",
              "c2"
            ],
            [
              "",
              "Model uses spending as \"need\"",
              "",
              "c4"
            ],
            [
              "",
              "They look healthier, so they get less help",
              "",
              "bad"
            ]
          ]
        },
        "html": "<p>Historical access, treatment and documentation can encode inequity. A proxy variable may preserve it even if sensitive attributes are removed.</p><p><b>Data minimization</b> means collecting and exposing only what the task needs. Protect data while checking whether the dataset represents the people the system will serve.</p>",
        "check": {
          "q": "What does data minimization require?",
          "o": [
            "Collect and expose only what the task needs",
            "Collect all available records for any future purpose",
            "Remove all checks on who accesses the records"
          ],
          "why": "Minimization limits collection and exposure to the defined task."
        }
      },
      {
        "t": "Exchanging a number is different from understanding it",
        "key": "Interoperability means systems can <b>exchange</b> data and <b>use</b> it. It has four levels; data arriving (technical) is only the first.",
        "fig": {
          "type": "stack",
          "t": "Four levels (analogy: sending a letter)",
          "items": [
            [
              "4. Organisational",
              "policies, trust: everyone agrees who acts on the letter",
              "c4"
            ],
            [
              "3. Semantic",
              "shared meaning (codes, units): same language, same meaning",
              "c2"
            ],
            [
              "2. Syntactic",
              "shared format: the same letter format",
              "c0"
            ],
            [
              "1. Technical",
              "systems connect: the letter reaches the house",
              "c1"
            ]
          ],
          "cap": "Standards: HL7 v2 and FHIR for messages, SNOMED CT and others for meaning."
        },
        "html": "<p><b>Syntactic interoperability</b> provides a shared structure; <b>semantic interoperability</b> provides shared meaning. Organizational agreements support their use in practice.</p><p>A result “1.8” needs a test identity, unit, reference range, time and patient context. <b>FHIR</b> structures information as resources; <b>LOINC</b> identifies tests and observations; <b>DICOM</b> supports imaging. Shared grammar still needs agreed meaning.</p>",
        "lab": {
          "href": "w3/interop.html",
          "todo": [
            "Click <b>Send only \"1.8\"</b>. Read Hospital B's interpretation: it cannot know which test this is.",
            "Tick the fields one by one — test code, unit, reference range, time, patient — and watch the levels at the bottom turn green.",
            "Switch the format to <b>HL7 FHIR Observation</b> (syntactic level) and tick the <b>agreed procedure</b> box (organisational level). Try the potassium test: it's a critical value."
          ]
        },
        "check": {
          "q": "Two hospitals use the same message format, but one codes tests in LOINC and the other uses its own local names. Which level is missing?",
          "o": [
            "Semantic",
            "Technical",
            "Syntactic",
            "None"
          ],
          "why": "Same structure (syntactic) but not shared meaning → semantic interoperability is missing."
        }
      },
      {
        "t": "Match the analysis to the decision question",
        "key": "Analytics climbs four steps: <b>what happened → why → what will happen → what should we do</b>.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Descriptive",
              "What happened? \"wait was 3 h\"",
              "c0"
            ],
            [
              "",
              "Diagnostic",
              "Why? \"two doctors on leave\"",
              "c3"
            ],
            [
              "",
              "Predictive",
              "What will happen? \"+30% Monday\"",
              "c2"
            ],
            [
              "",
              "Prescriptive",
              "What should we do? \"add a doctor\"",
              "c1"
            ]
          ]
        },
        "html": "<p><b>Descriptive analytics</b> asks what happened; <b>diagnostic</b> asks why; <b>predictive</b> asks what may happen; <b>prescriptive</b> compares what to do.</p><p>Monthly ED counts describe activity. A forecast estimates next weekend’s demand. Comparing feasible staffing strategies supports action. Week 3 establishes usable inputs; Week 4 checks whether the resulting advice improves care.</p>",
        "check": {
          "q": "\"Which action will reduce no-shows the most?\" is which level of analytics?",
          "o": [
            "Prescriptive",
            "Descriptive",
            "Diagnostic",
            "Predictive"
          ],
          "why": "Prescriptive = what action may help."
        }
      }
    ]
  },
  "4": {
    "goal": "Connect AI outputs to safe, accountable clinical decisions.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Connect the output to a decision",
        "key": "Useful AI connects <b>purpose, technology and data</b> to an actionable decision.",
        "fig": {
          "type": "flow",
          "t": "The course in four weeks",
          "items": [
            [
              "",
              "1 · Purpose",
              "What can AI contribute?",
              "c0"
            ],
            [
              "",
              "2 · Technology",
              "Which tool fits the task?",
              "c1"
            ],
            [
              "",
              "3 · Data",
              "Can we trust its inputs?",
              "c2"
            ],
            [
              "",
              "4 · Decisions",
              "Can people use it safely?",
              "c3"
            ]
          ]
        },
        "html": "<p>Week 1 defined purpose, Week 2 selected tools and Week 3 checked data. Now ask whether an output improves a decision.</p><p><b>In class:</b> a busy ED receives an AI warning about chest discomfort. Use it as additional information with clinical judgment. The patient’s history, preferences and consequences of action or inaction still matter.</p><p>For every workflow stage, define <b>who</b> receives the output, <b>when</b>, and <b>what</b> they can do differently.</p>",
        "check": {
          "q": "A correct alert reaches a clinician who is not responsible for the patient. What failed?",
          "o": [
            "The response workflow",
            "The prediction must be false",
            "Clinical responsibility has transferred to AI"
          ],
          "why": "Correct prediction alone does not make the whole system work."
        }
      },
      {
        "t": "CDSS supports a decision rather than owning it",
        "key": "A CDSS gives <b>patient-specific</b> help at the moment of a decision: reminders, alerts, risk estimates. It can be <b>rules</b> (knowledge-based) or <b>learned</b> (non-knowledge-based).",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Knowledge-based",
              "pts": [
                "rules from guidelines and experts",
                "IF allergy = penicillin AND order = amoxicillin → alert"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Non-knowledge-based",
              "pts": [
                "patterns learned from data (ML)",
                "a deterioration risk model"
              ],
              "c": "c3"
            }
          ],
          "cap": "Also: passive (you look it up) vs active (it pops up in the workflow), and patient-facing decision aids."
        },
        "html": "<p>A <b>clinical decision support system (CDSS)</b> supplies patient- or context-specific information. It existed before modern ML: an allergy alert can compare a prescription with a record.</p><p>Knowledge-based systems use explicit rules; learned systems use data patterns. Passive support is sought by the user; active support interrupts. Patient-facing support needs careful explanation.</p><p><b>In class:</b> an actionable alert is relevant, understandable and linked to a realistic next step. Repetitive low-value alerts create alert fatigue.</p>",
        "check": {
          "q": "A system uses rules written from clinical guidelines. It is a…",
          "o": [
            "knowledge-based CDSS",
            "non-knowledge-based CDSS",
            "generative AI",
            "patient-facing robot"
          ],
          "why": "Knowledge-based = rules from guidelines/experts. Non-knowledge-based = learned from data."
        }
      },
      {
        "t": "A prediction needs a response pathway",
        "key": "A prediction <b>estimates risk</b>. It does not prove the event will happen or explain why. It only helps if it is <b>connected to an action</b>.",
        "fig": {
          "type": "flow",
          "t": "From prediction to action: 6 steps (slide 10)",
          "items": [
            [
              "",
              "Define the target",
              "ICU transfer in 24 h",
              "c0"
            ],
            [
              "",
              "Prediction time",
              "what was known then?",
              "c3"
            ],
            [
              "",
              "Estimate risk",
              "validated model",
              "c5"
            ],
            [
              "",
              "Choose a threshold",
              "benefits vs false alarms",
              "c2"
            ],
            [
              "",
              "Connect to a response",
              "review, test, treat",
              "c4"
            ],
            [
              "",
              "Measure outcomes",
              "does the pathway improve?",
              "c1"
            ]
          ]
        },
        "html": "<p><b>Predictive analytics</b> estimates likelihood. It does not prove a diagnosis, identify a cause or choose an intervention by itself.</p><p>Define the event, population and time horizon; choose what is known at prediction time; use a validated model; select a threshold; connect it to a response; evaluate outcomes against usual care.</p><div class=\"callout warn\">A variable associated with readmission does not necessarily cause it. A high score without a response can add workload without benefit.</div>",
        "check": {
          "q": "A model flags high-risk patients, but nobody has agreed what to do with the flags. According to the lecture…",
          "o": [
            "It creates workload without improving care",
            "It is fine, because the model predicts well",
            "It replaces the need for a threshold",
            "It guarantees better outcomes"
          ],
          "why": "Slide 10: a high-risk score without a response pathway can create workload without improving care."
        }
      },
      {
        "t": "Lower thresholds exchange missed cases for more alerts",
        "key": "A <b>lower threshold</b> catches more sick patients but gives more false alarms. And when a condition is <b>rare</b>, \"99% accurate\" can mean the model finds nobody.",
        "fig": {
          "type": "compare",
          "t": "Lowering the alert threshold",
          "cols": [
            {
              "t": "Find more cases",
              "pts": [
                "More true positives",
                "Fewer false negatives"
              ],
              "c": "c0"
            },
            {
              "t": "Review more alerts",
              "pts": [
                "More false positives",
                "More demand on staff"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>A <b>threshold</b> turns a score into an action category. In class, lowering it from 10% to 5% caught more cases but also produced more false positives and workload.</p><p><b>Sensitivity</b>: of true cases, how many are flagged? <b>Specificity</b>: of non-cases, how many are cleared? <b>PPV</b>: of alerts, how many are true? <b>NPV</b>: of negatives, how many are true?</p><p>90 of 100 cases flagged gives 90% sensitivity. 30 true cases among 100 alerts gives 30% PPV.</p><div class=\"callout warn\">At 1% prevalence, predicting “no condition” for all 1,000 patients is 99% accurate and finds nobody. With sensitivity and specificity held fixed, lower prevalence reduces PPV.</div>",
        "lab": {
          "href": "w4/threshold.html",
          "todo": [
            "Start with <b>Ward early warning</b>. Move the <b>alert threshold</b> slider down and up and watch sensitivity, false positives and the alert count change.",
            "Watch the capacity warning: when there are more alerts than the team can review, you get alert fatigue.",
            "Click <b>Slide 13: 1% prevalence</b>, then <b>\"Predict no condition for everyone\"</b>. Read the accuracy — and the sensitivity.",
            "Click <b>Rare condition, good model</b> and look at the PPV: even a good model produces mostly false alarms when the condition is rare."
          ]
        },
        "check": {
          "q": "You move the threshold lower. What usually happens?",
          "o": [
            "Sensitivity rises and false positives rise",
            "Sensitivity falls and false positives fall",
            "Nothing changes",
            "Accuracy always reaches 100%"
          ],
          "why": "Lower threshold = more people flagged: more true cases caught, but more false alarms."
        }
      },
      {
        "t": "Separation and probability accuracy are different checks",
        "key": "<b>Discrimination</b> (AUC): does it rank sicker patients higher? <b>Calibration</b>: when it says 20%, do about 20 in 100 really have the event?",
        "fig": {
          "type": "plot",
          "t": "Calibration: predicted risk vs what really happened",
          "w": 500,
          "h": 300,
          "x": [
            0,
            100
          ],
          "y": [
            0,
            100
          ],
          "xl": "predicted risk (%)",
          "yl": "observed rate (%)",
          "lines": [
            {
              "pts": [
                [
                  0,
                  0
                ],
                [
                  100,
                  100
                ]
              ],
              "c": "mute",
              "dash": true,
              "label": "perfect"
            },
            {
              "pts": [
                [
                  0,
                  0
                ],
                [
                  20,
                  19
                ],
                [
                  40,
                  42
                ],
                [
                  60,
                  58
                ],
                [
                  80,
                  81
                ],
                [
                  100,
                  98
                ]
              ],
              "c": "c1",
              "label": "well calibrated"
            },
            {
              "pts": [
                [
                  0,
                  0
                ],
                [
                  20,
                  8
                ],
                [
                  40,
                  17
                ],
                [
                  60,
                  28
                ],
                [
                  80,
                  40
                ],
                [
                  100,
                  52
                ]
              ],
              "c": "c4",
              "label": "at a new hospital"
            }
          ],
          "cap": "Illustrative. A model can rank well but be badly calibrated somewhere new, so validate it locally (external validation)."
        },
        "html": "<p><b>Discrimination</b> separates people with different outcomes. <b>Calibration</b> checks whether probabilities match observed rates: a group given 20% readmission risk should have about 20% readmitted.</p><p><b>Internal validation</b> stays within the development process; <b>external validation</b> tests another site, time or population. Hospitals differ in patients, equipment and recording practices.</p><div class=\"callout warn\">Data leakage uses information unavailable at prediction time. Strong apparent performance can then mislead.</div>",
        "lab": {
          "href": "w4/calibration.html",
          "todo": [
            "Click <b>a community hospital (condition rarer)</b>. In the table, AUC stays the same but PPV falls and the model over-estimates risk (dots below the diagonal).",
            "Click <b>Recalibrate on local Hospital B data</b>: the dots return to the diagonal.",
            "Click <b>a different patient population</b>. AUC drops — recalibration cannot fix lost discrimination; the model may need re-development."
          ]
        },
        "check": {
          "q": "At a new hospital the model still ranks patients well, but it predicts 30% risk on average while only 10% have the event. What is the problem?",
          "o": [
            "Poor calibration",
            "Poor discrimination",
            "Data leakage",
            "Perfect performance"
          ],
          "why": "Ranking (discrimination) is fine, but the probabilities don't match observed rates → miscalibration."
        }
      },
      {
        "t": "Human oversight needs the ability to disagree",
        "key": "<b>Augmented</b> intelligence: AI extends people, it does not replace them. The human must be <b>more than a rubber stamp</b>, with the time, information and authority to disagree.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "AI brings",
              "pts": [
                "speed",
                "pattern detection",
                "consistent calculation"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Clinicians bring",
              "pts": [
                "context, examination",
                "communication, values",
                "experience, ethical judgement"
              ],
              "c": "c1"
            }
          ],
          "cap": "<b>Automation bias</b> = trusting the computer too much, even when it is wrong."
        },
        "html": "<p><b>Augmented intelligence</b> helps people do their tasks better. Automation transfers tasks to machines. Meaningful oversight needs time, information, understanding of limitations and authority to override.</p><p><b>Automation bias</b> is excessive reliance on advice. Calibrated trust matches the system’s capabilities and limits. A patient’s prior severe side effects can justify challenging a treatment suggestion.</p><div class=\"callout warn\">A confident output does not settle the decision. Both blind acceptance and blanket dismissal can be dangerous.</div><p>A <b>commission error</b> follows wrong advice; an <b>omission error</b> leaves a problem unchecked because no alert appeared.</p>",
        "lab": {
          "href": "w4/oversight.html",
          "todo": [
            "For each of the 10 cases read the facts first, then the AI output.",
            "Choose your reason from the list, then <b>Accept</b> or <b>Override / escalate</b>.",
            "At the end read your profile: did your errors lean towards over-trust (commission/omission) or under-trust?"
          ]
        },
        "check": {
          "q": "A doctor does not examine a patient because the AI did not raise an alert, and the patient deteriorates. This is…",
          "o": [
            "an omission error",
            "a commission error",
            "under-trust",
            "calibration"
          ],
          "why": "Omission = failing to act because the system did not flag the problem."
        }
      },
      {
        "t": "An explanation does not establish safety for every group",
        "key": "An explanation must help the user <b>act and doubt</b>, not just look technical. A model can be <b>accurate overall and still unsafe for one group</b>.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Unhelpful",
              "pts": [
                "a mysterious red warning",
                "no reason, no next step",
                "a long list of model weights"
              ],
              "c": "c4"
            },
            {
              "icon": "",
              "t": "Helpful (slide 17)",
              "pts": [
                "\"Higher estimated risk based on recent observations\"",
                "key factors, uncertainty, what to do next"
              ],
              "c": "c1"
            }
          ],
          "cap": "Technical complexity does not guarantee a useful explanation. Test explanations with the people who will use them."
        },
        "html": "<p>A useful explanation identifies the risk, period, contributing information and a possible next step. A bare “High risk” is insufficient. Contributing factors are associations, not proof of causation.</p><p>A model can perform well overall and poorly for a subgroup. Examine who benefits, who bears errors and who is excluded during development and implementation.</p>",
        "check": {
          "q": "A deterioration model has good overall accuracy, but in patients who do not speak the local language it misses most cases. What does the lecture recommend?",
          "o": [
            "Measure subgroup performance and involve affected communities; overall accuracy can hide unsafe performance for a group",
            "Nothing: good overall accuracy means it is safe for everyone",
            "Remove language from the data so the model cannot be biased",
            "Show a confidence score so clinicians trust it more"
          ],
          "why": "Slide 18: performance may vary by language and other characteristics, so measure subgroup performance and ask who bears the missed cases."
        }
      },
      {
        "t": "Pilot the whole system and name its owners",
        "key": "Evaluate the <b>complete human–AI–workflow system</b>, not the algorithm in isolation. A brilliant model that clinicians cannot use safely is <b>not a success</b>.",
        "fig": {
          "type": "flow",
          "t": "Implementing AI in clinical practice (slide 20)",
          "items": [
            [
              "",
              "Define the problem",
              "with clinicians, patients, IT, data teams, managers",
              "c0"
            ],
            [
              "",
              "Map the workflow",
              "where could it change a decision?",
              "c3"
            ],
            [
              "",
              "Assess readiness",
              "data, evidence, usability, fairness, privacy, security",
              "c5"
            ],
            [
              "",
              "Pilot",
              "controlled setting, train users, when to override",
              "c2"
            ],
            [
              "",
              "Monitor",
              "uptake, outcomes, subgroups, false alarms, overrides",
              "c4"
            ],
            [
              "",
              "Update / pause / withdraw",
              "criteria set in advance",
              "c1"
            ]
          ]
        },
        "html": "<p>Start with a clinical problem and involve clinicians, patients, IT, data specialists and managers. Map the workflow, assess readiness, pilot, train users and monitor outcomes, ignored alerts, subgroup performance and unintended effects.</p><p>Name the clinical decision owner, model maintainer and incident responder. A vendor contract does not remove institutional responsibility. Set update, pause and withdrawal criteria.</p><p>In the early-warning case, many alerts and missed deteriorations justify pausing expansion and investigating. This completes the course map: purpose, suitable technology, trustworthy data and a usable decision pathway must work together.</p>",
        "check": {
          "q": "An AI tool saves the hospital money but gives no benefit to patients and works poorly for older adults. According to slide 23, is it a responsible success?",
          "o": [
            "No: benefits must be meaningful for patients and performance acceptable across relevant subgroups",
            "Yes, because it saves money",
            "Yes, if the overall AUC is high",
            "Yes, if a clinician signs every output"
          ],
          "why": "Slide 23: benefits must be meaningful for patients, not only convenient for the organisation, and performance must be acceptable in subgroups."
        }
      }
    ]
  }
};
