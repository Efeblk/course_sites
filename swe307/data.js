window.COURSE = {
  "id": "swe307",
  "code": "SWE307",
  "name": "Software Engineering Analysis and Design",
  "unit": "Chapter",
  "term": "Fall 2026–2027",
  "lecturer": "Dr. Alper Öner",
  "examFormat": "Midterm: 50 minutes, chapters 1-7. Discussion 30; True/False + blanks 20; Function Point Analysis 30; Fishbone 20. Midterm 30%; project 20%; final 50%.",
  "textbooks": [
    "Eric J. Braude and Michael E. Bernstein, Software Engineering: Modern Approaches, 2nd ed.",
    "Lonnie D. Bentley and Jeffrey L. Whitten, Systems Analysis & Design for the Global Enterprise, 7th ed."
  ],
  "projects": [
    "Term project: group work, 20%."
  ],
  "chapters": [
    {
      "n": 1,
      "title": "Introduction to Systems Analysis and Design",
      "summary": "IS components, analyst roles, analysis/design and verification/validation.",
      "takeaways": [
        "Information systems combine hardware, software, data, processes and people.",
        "Analysis = what; design = how. A product includes documentation.",
        "Analysts study problems, opportunities, directives and organizational needs.",
        "Problems need correction; opportunities offer improvement; directives require change.",
        "Verification: building the product right; validation: building the right product.",
        "Success requires user needs, schedule and budget; remove defects early."
      ],
      "traps": [
        [
          "A product is just code",
          "It also includes associated documentation."
        ],
        [
          "Verification asks whether users need the product",
          "Verification checks construction against specifications; validation checks user requirements."
        ],
        [
          "Information systems contain only computers",
          "People, process and data matter as well as hardware and software."
        ]
      ],
      "activities": [],
      "quiz": [
        {
          "q": "Which term fits this description: a systematic, disciplined and quantifiable approach to software?",
          "options": [
            "Software engineering",
            "Hardware",
            "People",
            "Systems analysis"
          ],
          "answer": 0,
          "explain": "Software engineering: A systematic, disciplined and quantifiable approach to software. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: collects, processes, stores and distributes information?",
          "options": [
            "System owner",
            "Information system",
            "Data",
            "Project"
          ],
          "answer": 1,
          "explain": "Information system: Collects, processes, stores and distributes information. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: software together with its associated documents?",
          "options": [
            "Systems analysis",
            "Systems analyst",
            "Product",
            "System user"
          ],
          "answer": 2,
          "explain": "Product: Software together with its associated documents. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: determining what the system should do?",
          "options": [
            "Project manager",
            "Software tester",
            "Directive",
            "Systems analysis"
          ],
          "answer": 3,
          "explain": "Systems analysis: Determining what the system should do. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: determining how to satisfy system requirements?",
          "options": [
            "Systems design",
            "Systems analyst",
            "System user",
            "Defect"
          ],
          "answer": 0,
          "explain": "Systems design: Determining how to satisfy system requirements. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: studies organizational problems, opportunities and needs?",
          "options": [
            "Software tester",
            "Systems analyst",
            "Directive",
            "Verification"
          ],
          "answer": 1,
          "explain": "Systems analyst: Studies organizational problems, opportunities and needs. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: a situation requiring corrective action?",
          "options": [
            "Defect",
            "Validation",
            "Problem",
            "System"
          ],
          "answer": 2,
          "explain": "Problem: A situation requiring corrective action. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: a chance to improve even without a complaint?",
          "options": [
            "Project success",
            "Information system",
            "Defect density",
            "Opportunity"
          ],
          "answer": 3,
          "explain": "Opportunity: A chance to improve even without a complaint. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: a required change such as a legal instruction?",
          "options": [
            "Directive",
            "Hardware",
            "Mean time to failure",
            "Engineering"
          ],
          "answer": 0,
          "explain": "Directive: A required change such as a legal instruction. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: checking that the product is built according to specifications?",
          "options": [
            "People",
            "Verification",
            "Engineering",
            "Hardware"
          ],
          "answer": 1,
          "explain": "Verification: Checking that the product is built according to specifications. This distinction follows chapter 1."
        },
        {
          "q": "Which term fits this description: checking that the system meets user requirements?",
          "options": [
            "Software engineering",
            "Software",
            "Validation",
            "Product"
          ],
          "answer": 2,
          "explain": "Validation: Checking that the system meets user requirements. This distinction follows chapter 1."
        },
        {
          "q": "A team delivers on time and within budget, but users cannot do their work. Is this success?",
          "options": [
            "Yes; schedule is the only measure",
            "Only the programming language matters",
            "Yes; cost is the only measure",
            "No; user needs must also be met"
          ],
          "answer": 3,
          "explain": "The slides require user needs, time and budget together."
        },
        {
          "q": "When should defects be removed to reduce repair cost?",
          "options": [
            "As early as possible",
            "At the last sprint",
            "Only after deployment",
            "Only during acceptance"
          ],
          "answer": 0,
          "explain": "The slides state that earlier defect discovery costs less to repair."
        },
        {
          "q": "Which list contains the five information system components?",
          "options": [
            "Scope, budget, cost, code, testing",
            "Hardware, software, data, process, people",
            "Owner, tester, driver, navigator, analyst",
            "Planning, design, code, test, deployment"
          ],
          "answer": 1,
          "explain": "An information system includes human and business components as well as technology."
        },
        {
          "q": "Why does an analyst need the organizational model?",
          "options": [
            "To count executable statements",
            "To avoid talking with users",
            "To identify decision and information responsibilities",
            "To replace the project manager"
          ],
          "answer": 2,
          "explain": "The analyst must know who owns processes and decisions and who needs which information."
        }
      ],
      "cards": [
        [
          "Software engineering",
          "A systematic, disciplined and quantifiable approach to software"
        ],
        [
          "Information system",
          "Collects, processes, stores and distributes information"
        ],
        [
          "Product",
          "Software together with its associated documents"
        ],
        [
          "Systems analysis",
          "Determining what the system should do"
        ],
        [
          "Systems design",
          "Determining how to satisfy system requirements"
        ],
        [
          "Systems analyst",
          "Studies organizational problems, opportunities and needs"
        ],
        [
          "Problem",
          "A situation requiring corrective action"
        ],
        [
          "Opportunity",
          "A chance to improve even without a complaint"
        ],
        [
          "Directive",
          "A required change such as a legal instruction"
        ],
        [
          "Defect",
          "A deviation from requirements"
        ],
        [
          "Verification",
          "Checking that the product is built according to specifications"
        ],
        [
          "Validation",
          "Checking that the system meets user requirements"
        ]
      ],
      "labQuestions": []
    },
    {
      "n": 2,
      "title": "SDLC Phases and Software Process Models",
      "summary": "SDLC documents, testing levels and deployment.",
      "takeaways": [
        "Planning → SPMP; requirements analysis → SRS; design → SDD.",
        "Architectural design defines modules/interfaces; detailed design defines algorithms/data structures.",
        "Unit tests check modules; integration tests check their interfaces.",
        "System tests check the whole system; regression tests protect existing behavior.",
        "Beta tests involve users; acceptance checks customer release criteria.",
        "Deployment includes data conversion and training; iterative cycles repeat analysis, design, code and test."
      ],
      "traps": [
        [
          "Deployment ends all software work",
          "Slide 33 calls deployment the final phase, but slides 4 and 39 put maintenance after it: maintenance supports the software after release."
        ],
        [
          "Waterfall has no feedback in practice",
          "Adjacent phases need feedback loops."
        ],
        [
          "Refactoring adds new externally visible behavior",
          "It improves internal structure while preserving behavior."
        ]
      ],
      "activities": [],
      "quiz": [
        {
          "q": "Which term fits this description: defines activities, resources, cost and schedule?",
          "options": [
            "Planning",
            "SRS",
            "Development",
            "System testing"
          ],
          "answer": 0,
          "explain": "Planning: Defines activities, resources, cost and schedule. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: software Project Management Plan, the planning output?",
          "options": [
            "Architectural design",
            "SPMP",
            "Unit testing",
            "Beta testing"
          ],
          "answer": 1,
          "explain": "SPMP: Software Project Management Plan, the planning output. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: identifies what users need and want?",
          "options": [
            "Post-deployment review",
            "Acceptance testing",
            "Requirements analysis",
            "Detailed design"
          ],
          "answer": 2,
          "explain": "Requirements analysis: Identifies what users need and want. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: software Requirements Specification, the analysis output?",
          "options": [
            "Deployment",
            "SDD",
            "Regression testing",
            "SRS"
          ],
          "answer": 3,
          "explain": "SRS: Software Requirements Specification, the analysis output. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: divides software into modules and their interfaces?",
          "options": [
            "Architectural design",
            "Requirements analysis",
            "System testing",
            "Deployment outputs"
          ],
          "answer": 0,
          "explain": "Architectural design: Divides software into modules and their interfaces. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: specifies algorithms, data structures and constraints?",
          "options": [
            "Unit testing",
            "Detailed design",
            "Beta testing",
            "Post-deployment review"
          ],
          "answer": 1,
          "explain": "Detailed design: Specifies algorithms, data structures and constraints. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: software Design Document, the design output?",
          "options": [
            "Acceptance testing",
            "Maintenance",
            "SDD",
            "Integration testing"
          ],
          "answer": 2,
          "explain": "SDD: Software Design Document, the design output. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: tests individual modules?",
          "options": [
            "System testing",
            "Deployment outputs",
            "Waterfall",
            "Unit testing"
          ],
          "answer": 3,
          "explain": "Unit testing: Tests individual modules. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: checks that connected modules interface correctly?",
          "options": [
            "Integration testing",
            "Beta testing",
            "Post-deployment review",
            "Waterfall feedback"
          ],
          "answer": 0,
          "explain": "Integration testing: Checks that connected modules interface correctly. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: checks that changes have not harmed existing features?",
          "options": [
            "Maintenance",
            "Regression testing",
            "Waterfall strength",
            "Acceptance testing"
          ],
          "answer": 1,
          "explain": "Regression testing: Checks that changes have not harmed existing features. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: checks the entire system against user requirements?",
          "options": [
            "Waterfall risk",
            "Deployment",
            "System testing",
            "Software process model"
          ],
          "answer": 2,
          "explain": "System testing: Checks the entire system against user requirements. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: real-world testing by users near final release?",
          "options": [
            "Deployment outputs",
            "Waterfall",
            "Iterative development",
            "Beta testing"
          ],
          "answer": 3,
          "explain": "Beta testing: Real-world testing by users near final release. This distinction follows chapter 2."
        },
        {
          "q": "Which term fits this description: owner checks the customer release criteria after beta testing?",
          "options": [
            "Acceptance testing",
            "Post-deployment review",
            "Waterfall feedback",
            "Parallel iterations"
          ],
          "answer": 0,
          "explain": "Acceptance testing: Owner checks the customer release criteria after beta testing. This distinction follows chapter 2."
        },
        {
          "q": "Which is a deployment activity?",
          "options": [
            "Only draw use cases",
            "Train users and convert data",
            "Only choose algorithms",
            "Only identify actors"
          ],
          "answer": 1,
          "explain": "Deployment includes communication, training, data entry or conversion, installation and review."
        },
        {
          "q": "What does an iterative cycle contain?",
          "options": [
            "Only testing",
            "Only programming",
            "Analysis, design, development, testing",
            "Only requirements"
          ],
          "answer": 2,
          "explain": "Each iteration repeats part of the complete development work."
        }
      ],
      "cards": [
        [
          "Planning",
          "Defines activities, resources, cost and schedule"
        ],
        [
          "SPMP",
          "Software Project Management Plan, the planning output"
        ],
        [
          "SRS",
          "Software Requirements Specification, the analysis output"
        ],
        [
          "Architectural design",
          "Divides software into modules and their interfaces"
        ],
        [
          "Detailed design",
          "Specifies algorithms, data structures and constraints"
        ],
        [
          "SDD",
          "Software Design Document, the design output"
        ],
        [
          "Unit testing",
          "Tests individual modules"
        ],
        [
          "Integration testing",
          "Checks that connected modules interface correctly"
        ],
        [
          "Regression testing",
          "Checks that changes have not harmed existing features"
        ],
        [
          "System testing",
          "Checks the entire system against user requirements"
        ],
        [
          "Acceptance testing",
          "Owner checks the customer release criteria after beta testing"
        ],
        [
          "Deployment",
          "Makes the accepted system operational in production"
        ]
      ],
      "labQuestions": []
    },
    {
      "n": 3,
      "title": "Iterative and Agile Development; Project Management",
      "summary": "XP, Scrum, feedback and communication channels.",
      "takeaways": [
        "XP: weekly iterations, quarterly releases, communication, simplicity and feedback.",
        "TDD: failing test → code to pass → repeat; all unit tests must pass before release.",
        "XP uses pair programming, collective ownership and continuous integration.",
        "Scrum: backlog stories → sprint → integrated, tested customer demonstration.",
        "Lecture timing: 30-day sprint; daily scrum ≤15 minutes.",
        "Communication channels = N(N−1)/2; adding staff can delay a late project."
      ],
      "traps": [
        [
          "More people always finish a late project sooner",
          "More channels may outweigh extra labor."
        ],
        [
          "The lecture gives one universal Scrum size",
          "Slide 32 gives 6–9; slide 45 gives 3–9 and usually 2–5 developers."
        ],
        [
          "The XP overtime statements are fully consistent",
          "Slide 26 states sustainable pace and also mentions extreme hours near release. Treat that as a lecture tension; do not assume overtime is the goal."
        ]
      ],
      "activities": [
        {
          "id": "ch3-channels",
          "title": "Communication channels",
          "desc": "Change team size and count the pairwise connections.",
          "href": "ch3/channels.html"
        },
        {
          "id": "ch3-organization",
          "title": "Organization structure sorter",
          "desc": "Sort staffing choices into project, function and matrix structures.",
          "href": "ch3/organization.html"
        }
      ],
      "quiz": [
        {
          "q": "Which term fits this description: extreme Programming uses frequent small releases?",
          "options": [
            "XP",
            "Communication",
            "Courage",
            "Collective ownership"
          ],
          "answer": 0,
          "explain": "XP: Extreme Programming uses frequent small releases. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: the XP release cycle?",
          "options": [
            "Simplicity",
            "Quarterly cycle",
            "Planning game",
            "Continuous integration"
          ],
          "answer": 1,
          "explain": "Quarterly cycle: The XP release cycle. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: the XP iteration cycle ending with running tested features?",
          "options": [
            "System metaphor",
            "Whole team",
            "Weekly cycle",
            "Feedback"
          ],
          "answer": 2,
          "explain": "Weekly cycle: The XP iteration cycle ending with running tested features. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: write and run a failing test before coding to pass it?",
          "options": [
            "Scrum backlog",
            "Project-oriented organization",
            "Whole team",
            "Test-driven development"
          ],
          "answer": 3,
          "explain": "Test-driven development: Write and run a failing test before coding to pass it. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: any developer may change any necessary code section?",
          "options": [
            "Collective ownership",
            "Function-oriented organization",
            "Coding standard",
            "Sprint"
          ],
          "answer": 0,
          "explain": "Collective ownership: Any developer may change any necessary code section. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: merge code into a shared repository many times daily?",
          "options": [
            "Sustainable pace",
            "Continuous integration",
            "Daily scrum",
            "Matrix organization"
          ],
          "answer": 1,
          "explain": "Continuous integration: Merge code into a shared repository many times daily. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: include customers throughout development?",
          "options": [
            "Spike solution",
            "Sprint demonstration",
            "Whole team",
            "Brooks's law"
          ],
          "answer": 2,
          "explain": "Whole team: Include customers throughout development. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: set a normal working pace rather than relying on overtime?",
          "options": [
            "Development cost",
            "Sprint",
            "Function-oriented organization",
            "Sustainable pace"
          ],
          "answer": 3,
          "explain": "Sustainable pace: Set a normal working pace rather than relying on overtime. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: a small investigation used to reduce risk?",
          "options": [
            "Spike solution",
            "Daily scrum",
            "Matrix organization",
            "Fixed operating cost"
          ],
          "answer": 0,
          "explain": "Spike solution: A small investigation used to reduce risk. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: the list of customer wants and needs expressed as stories?",
          "options": [
            "Sprint demonstration",
            "Scrum backlog",
            "Brooks's law",
            "Variable operating cost"
          ],
          "answer": 1,
          "explain": "Scrum backlog: The list of customer wants and needs expressed as stories. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: the chapter 3 Scrum cycle of 30 days?",
          "options": [
            "Communication channels",
            "LOC",
            "Sprint",
            "Project-oriented organization"
          ],
          "answer": 2,
          "explain": "Sprint: The chapter 3 Scrum cycle of 30 days. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: a meeting lasting no more than 15 minutes?",
          "options": [
            "KLOC",
            "Function-oriented organization",
            "Development cost",
            "Daily scrum"
          ],
          "answer": 3,
          "explain": "Daily scrum: A meeting lasting no more than 15 minutes. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: shows integrated, tested progress to the customer?",
          "options": [
            "Sprint demonstration",
            "Matrix organization",
            "Fixed operating cost",
            "Historical estimation"
          ],
          "answer": 0,
          "explain": "Sprint demonstration: Shows integrated, tested progress to the customer. This distinction follows chapter 3."
        },
        {
          "q": "Which term fits this description: adding people to a failing project can make it worse?",
          "options": [
            "Fixed operating cost",
            "Brooks's law",
            "Historical estimation",
            "Communication"
          ],
          "answer": 1,
          "explain": "Brooks's law: Adding people to a failing project can make it worse. This distinction follows chapter 3."
        },
        {
          "q": "How many communication channels connect 8 people?",
          "options": [
            "16",
            "56",
            "28",
            "8"
          ],
          "answer": 2,
          "explain": "8 × 7 / 2 = 28. Each pair is counted once."
        }
      ],
      "cards": [
        [
          "XP",
          "Extreme Programming uses frequent small releases"
        ],
        [
          "Quarterly cycle",
          "The XP release cycle"
        ],
        [
          "Weekly cycle",
          "The XP iteration cycle ending with running tested features"
        ],
        [
          "Test-driven development",
          "Write and run a failing test before coding to pass it"
        ],
        [
          "Continuous integration",
          "Merge code into a shared repository many times daily"
        ],
        [
          "Whole team",
          "Include customers throughout development"
        ],
        [
          "Sustainable pace",
          "Set a normal working pace rather than relying on overtime"
        ],
        [
          "Spike solution",
          "A small investigation used to reduce risk"
        ],
        [
          "Scrum backlog",
          "The list of customer wants and needs expressed as stories"
        ],
        [
          "Sprint",
          "The chapter 3 Scrum cycle of 30 days"
        ],
        [
          "Daily scrum",
          "A meeting lasting no more than 15 minutes"
        ],
        [
          "Communication channels",
          "N(N-1)/2 possible pairwise channels"
        ]
      ],
      "labQuestions": [
        {
          "q": "Dedicated to one project",
          "options": [
            "Project-oriented",
            "Function-oriented",
            "Matrix"
          ],
          "answer": 0,
          "explain": "Dedicated staff can become isolated and reuse falls."
        },
        {
          "q": "Less reuse across isolated engineers",
          "options": [
            "Project-oriented",
            "Function-oriented",
            "Matrix"
          ],
          "answer": 0,
          "explain": "Dedicated staff can become isolated and reuse falls."
        },
        {
          "q": "Grouped by function",
          "options": [
            "Function-oriented",
            "Project-oriented",
            "Matrix"
          ],
          "answer": 0,
          "explain": "Functional managers handle several projects; transfers can delay work."
        },
        {
          "q": "Moving staff can delay work",
          "options": [
            "Function-oriented",
            "Project-oriented",
            "Matrix"
          ],
          "answer": 0,
          "explain": "Functional managers handle several projects; transfers can delay work."
        },
        {
          "q": "Functional staff loaned to projects",
          "options": [
            "Matrix",
            "Project-oriented",
            "Function-oriented"
          ],
          "answer": 0,
          "explain": "Functional membership plus project assignments uses resources efficiently."
        },
        {
          "q": "Efficient resource use",
          "options": [
            "Matrix",
            "Project-oriented",
            "Function-oriented"
          ],
          "answer": 0,
          "explain": "Functional membership plus project assignments uses resources efficiently."
        }
      ]
    },
    {
      "n": 4,
      "title": "Function Points, Estimation and Scheduling",
      "summary": "FPA count tables, GSC adjustment and critical path.",
      "takeaways": [
        "FPA counts user functionality independently of implementation technology.",
        "EI inputs; EO derived outputs; EQ inquiries; ILF internal data; EIF externally maintained data.",
        "UFP = sum of counts × Low/Average/High weights.",
        "VAF in these slides = sum of GSC weights (each 0–5).",
        "AFP = UFP × (0.65 + 0.01 × VAF).",
        "Critical path: forward TE uses max; backward TL uses min; slack = TL−TE; critical tasks have zero slack."
      ],
      "traps": [
        [
          "VAF here is already the multiplier",
          "The slides call the GSC sum VAF; the multiplier is 0.65+0.01×VAF."
        ],
        [
          "Use 7 and still obtain UFP 556",
          "The worked sum uses 11 complex EQ. Literal 7 gives UFP 532."
        ],
        [
          "Critical path is the shortest task chain",
          "It is the longest-duration dependency path and determines earliest project completion."
        ],
        [
          "TE is a task start time",
          "In these slides TE is completion time."
        ]
      ],
      "activities": [
        {
          "id": "ch4-fp",
          "title": "Function point calculator",
          "desc": "Count and rank units, sum GSC weights, and reproduce both worked examples.",
          "href": "ch4/fp.html"
        },
        {
          "id": "ch4-estimate",
          "title": "Effort and duration estimator",
          "desc": "Compare COCOMO I, engineering rules and weighted effort.",
          "href": "ch4/estimate.html"
        },
        {
          "id": "ch4-critical",
          "title": "Critical path workbench",
          "desc": "Step through forward and backward passes on the slide network or a generated network.",
          "href": "ch4/critical.html"
        }
      ],
      "quiz": [
        {
          "q": "Which term fits this description: a technology-independent measure of user-level functionality?",
          "options": [
            "Function point",
            "Average by size",
            "FTR",
            "AFP"
          ],
          "answer": 0,
          "explain": "Function point: A technology-independent measure of user-level functionality. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: external input: data crosses into the application?",
          "options": [
            "ILF",
            "EI",
            "RET",
            "Gearing factor"
          ],
          "answer": 1,
          "explain": "EI: External input: data crosses into the application. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: external output: derived data leaves the application?",
          "options": [
            "UFP",
            "Simple by size",
            "EO",
            "EIF"
          ],
          "answer": 2,
          "explain": "EO: External output: derived data leaves the application. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: external inquiry: retrieves existing data?",
          "options": [
            "Average by size",
            "DET",
            "VAF in these slides",
            "EQ"
          ],
          "answer": 3,
          "explain": "EQ: External inquiry: retrieves existing data. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: internal logical file: related data within the application boundary?",
          "options": [
            "ILF",
            "FTR",
            "AFP",
            "Complex by size"
          ],
          "answer": 0,
          "explain": "ILF: Internal logical file: related data within the application boundary. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: external interface file: reference data maintained by another application?",
          "options": [
            "RET",
            "EIF",
            "Gearing factor",
            "Organic"
          ],
          "answer": 1,
          "explain": "EIF: External interface file: reference data maintained by another application. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: sum of functional-unit counts multiplied by complexity weights?",
          "options": [
            "Gearing factor",
            "Organic",
            "UFP",
            "Duration"
          ],
          "answer": 2,
          "explain": "UFP: Sum of functional-unit counts multiplied by complexity weights. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: the sum of 0-to-5 GSC weights?",
          "options": [
            "Semi-detached",
            "Engineering rules",
            "Simple by size",
            "VAF in these slides"
          ],
          "answer": 3,
          "explain": "VAF in these slides: The sum of 0-to-5 GSC weights. This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: uFP multiplied by (0.65 + 0.01 times VAF)?",
          "options": [
            "AFP",
            "Expectations matrix",
            "Average by size",
            "Embedded"
          ],
          "answer": 0,
          "explain": "AFP: UFP multiplied by (0.65 + 0.01 times VAF). This distinction follows chapter 4."
        },
        {
          "q": "Which term fits this description: a network showing task dependencies and timeline?",
          "options": [
            "TE",
            "PERT chart",
            "EI",
            "EIF"
          ],
          "answer": 1,
          "explain": "PERT chart: A network showing task dependencies and timeline. This distinction follows chapter 4."
        },
        {
          "q": "Weather UFP = 23 and VAF = 40. What is AFP?",
          "options": [
            "9.2",
            "23.40",
            "24.15",
            "63"
          ],
          "answer": 2,
          "explain": "23 × (0.65 + 0.01 × 40) = 24.15."
        },
        {
          "q": "An EI has 2 FTR and 16 DET. Which complexity?",
          "options": [
            "Low",
            "Average",
            "Not counted",
            "High"
          ],
          "answer": 3,
          "explain": "EI table: row 2 FTR, column 16+ DET is High."
        },
        {
          "q": "At a merge, predecessor TE values are 9 and 11. Current duration is 2. Its TE?",
          "options": [
            "13",
            "22",
            "9",
            "11"
          ],
          "answer": 0,
          "explain": "Take the maximum predecessor completion, then add duration: max(9,11)+2 = 13."
        },
        {
          "q": "Successors have (TL,D) = (21,5.5) and (18,5). Current TL?",
          "options": [
            "21",
            "13",
            "15.5",
            "18"
          ],
          "answer": 1,
          "explain": "Use min(TL successor − D successor): min(15.5,13)=13."
        },
        {
          "q": "Task TE=18.5 and TL=21. Slack?",
          "options": [
            "39.5",
            "0",
            "2.5",
            "21"
          ],
          "answer": 2,
          "explain": "Slack = TL − TE = 2.5. The task is noncritical."
        }
      ],
      "cards": [
        [
          "Function point",
          "A technology-independent measure of user-level functionality"
        ],
        [
          "EI",
          "External input: data crosses into the application"
        ],
        [
          "EO",
          "External output: derived data leaves the application"
        ],
        [
          "EQ",
          "External inquiry: retrieves existing data"
        ],
        [
          "ILF",
          "Internal logical file: related data within the application boundary"
        ],
        [
          "EIF",
          "External interface file: reference data maintained by another application"
        ],
        [
          "UFP",
          "Sum of functional-unit counts multiplied by complexity weights"
        ],
        [
          "VAF in these slides",
          "The sum of 0-to-5 GSC weights"
        ],
        [
          "AFP",
          "UFP multiplied by (0.65 + 0.01 times VAF)"
        ],
        [
          "Critical path",
          "The dependency path with the largest total duration"
        ],
        [
          "TE",
          "Earliest task completion time from the forward pass"
        ],
        [
          "Slack",
          "TL minus TE; zero identifies a critical task"
        ]
      ],
      "labQuestions": []
    },
    {
      "n": 5,
      "title": "Requirements Analysis and Fact-Finding",
      "summary": "Requirements, fishbone root causes and fact-finding.",
      "takeaways": [
        "Functional requirements describe services; nonfunctional requirements describe qualities and constraints.",
        "Reliability = failure-free operation; availability = accessible when needed.",
        "Fishbone discovers possible root causes: effect at right, spine, 4–8 main bones, ≥2 sub-causes each.",
        "Use IS components and SAD activities as fishbone categories; investigate hypotheses.",
        "Observation reveals actual work; questionnaires reach many people cheaply but cannot clarify answers.",
        "Interviews permit follow-up; avoid leading questions. Prototypes help users verify requirements."
      ],
      "traps": [
        [
          "Availability and reliability are identical",
          "Accessibility at a time differs from running without failure over a period."
        ],
        [
          "A regular interval proves representativeness",
          "Source patterns can bias systematic sampling."
        ],
        [
          "Every measurable requirement is functional",
          "Quality limits and constraints can be measurable and nonfunctional."
        ]
      ],
      "activities": [
        {
          "id": "ch5-requirements",
          "title": "Requirement classifier",
          "desc": "Separate services from quality attributes and constraints.",
          "href": "ch5/requirements.html"
        },
        {
          "id": "ch5-facts",
          "title": "Fact-finding matcher",
          "desc": "Choose techniques and identify their tradeoffs.",
          "href": "ch5/facts.html"
        },
        {
          "id": "ch5-sampling",
          "title": "Systematic sampling",
          "desc": "Calculate the interval and inspect the selected records.",
          "href": "ch5/sampling.html"
        }
      ],
      "quiz": [
        {
          "q": "Which term fits this description: something a system must do or a property it must have?",
          "options": [
            "Requirement",
            "Solution requirement",
            "Availability",
            "Portability"
          ],
          "answer": 0,
          "explain": "Requirement: Something a system must do or a property it must have. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: an activity or service the application must provide?",
          "options": [
            "Availability",
            "Functional requirement",
            "Portability",
            "Fishbone diagram"
          ],
          "answer": 1,
          "explain": "Functional requirement: An activity or service the application must provide. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: a quality, constraint or other characteristic of a satisfactory system?",
          "options": [
            "Maintainability",
            "Compatibility",
            "Nonfunctional requirement",
            "Research"
          ],
          "answer": 2,
          "explain": "Nonfunctional requirement: A quality, constraint or other characteristic of a satisfactory system. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: likelihood of running without failure for a period?",
          "options": [
            "Usability",
            "Observation",
            "Performance",
            "Reliability"
          ],
          "answer": 3,
          "explain": "Reliability: Likelihood of running without failure for a period. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: likelihood of being accessible at a given time?",
          "options": [
            "Availability",
            "Prototyping",
            "Security",
            "Design constraint"
          ],
          "answer": 0,
          "explain": "Availability: Likelihood of being accessible at a given time. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: response-time constraints under a stated workload?",
          "options": [
            "Compatibility",
            "Performance",
            "Research",
            "Random sampling"
          ],
          "answer": 1,
          "explain": "Performance: Response-time constraints under a stated workload. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: protection against malicious intent and unauthorized access?",
          "options": [
            "Observation",
            "Systematic sampling",
            "Security",
            "Usability"
          ],
          "answer": 2,
          "explain": "Security: Protection against malicious intent and unauthorized access. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: a cause-and-effect view of a problem and possible root causes?",
          "options": [
            "Structured interview",
            "Prototyping",
            "Stratified sampling",
            "Fishbone diagram"
          ],
          "answer": 3,
          "explain": "Fishbone diagram: A cause-and-effect view of a problem and possible root causes. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: watching or participating in actual work?",
          "options": [
            "Observation",
            "Random sampling",
            "Open-ended question",
            "JRP"
          ],
          "answer": 0,
          "explain": "Observation: Watching or participating in actual work. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: a small working model used to verify requirements with users?",
          "options": [
            "Closed-ended question",
            "Prototyping",
            "Facilitator",
            "Systematic sampling"
          ],
          "answer": 1,
          "explain": "Prototyping: A small working model used to verify requirements with users. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: written questions that can reach many respondents cheaply?",
          "options": [
            "Stakeholder requirement",
            "Structured interview",
            "Questionnaire",
            "Sponsor"
          ],
          "answer": 2,
          "explain": "Questionnaire: Written questions that can reach many respondents cheaply. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: allows respondents to express an answer freely?",
          "options": [
            "Unstructured interview",
            "Questionnaire weakness",
            "Solution requirement",
            "Open-ended question"
          ],
          "answer": 3,
          "explain": "Open-ended question: Allows respondents to express an answer freely. This distinction follows chapter 5."
        },
        {
          "q": "Which term fits this description: an interview with a specific prepared set of questions?",
          "options": [
            "Structured interview",
            "Business requirement",
            "Nonfunctional requirement",
            "Facilitator"
          ],
          "answer": 0,
          "explain": "Structured interview: An interview with a specific prepared set of questions. This distinction follows chapter 5."
        },
        {
          "q": "Where does the problem appear in a fishbone diagram?",
          "options": [
            "On every branch as a task",
            "At the head on the right",
            "Only in the diagram title",
            "As a timeline bar"
          ],
          "answer": 1,
          "explain": "Draw the head at the right, backbone to the left, then four to eight main causes and their sub-causes."
        },
        {
          "q": "Which interview question should be avoided?",
          "options": [
            "How is the report used?",
            "What information is missing?",
            "Twenty codes should be enough, right?",
            "Which codes do you need?"
          ],
          "answer": 2,
          "explain": "Do not embed your opinion or lead the respondent; use clear, concise questions."
        }
      ],
      "cards": [
        [
          "Requirement",
          "Something a system must do or a property it must have"
        ],
        [
          "Functional requirement",
          "An activity or service the application must provide"
        ],
        [
          "Nonfunctional requirement",
          "A quality, constraint or other characteristic of a satisfactory system"
        ],
        [
          "Reliability",
          "Likelihood of running without failure for a period"
        ],
        [
          "Availability",
          "Likelihood of being accessible at a given time"
        ],
        [
          "Performance",
          "Response-time constraints under a stated workload"
        ],
        [
          "Fishbone diagram",
          "A cause-and-effect view of a problem and possible root causes"
        ],
        [
          "Observation",
          "Watching or participating in actual work"
        ],
        [
          "Prototyping",
          "A small working model used to verify requirements with users"
        ],
        [
          "Questionnaire",
          "Written questions that can reach many respondents cheaply"
        ],
        [
          "Structured interview",
          "An interview with a specific prepared set of questions"
        ],
        [
          "Questionnaire weakness",
          "Low response rates and no chance to clarify misunderstood questions"
        ]
      ],
      "labQuestions": [
        {
          "q": "Display the student weekly schedule",
          "options": [
            "Functional",
            "Reliability",
            "Availability",
            "Maintainability"
          ],
          "answer": 0,
          "explain": "This states a service the application provides."
        },
        {
          "q": "Send a welcome email after account creation",
          "options": [
            "Functional",
            "Availability",
            "Maintainability",
            "Performance"
          ],
          "answer": 0,
          "explain": "This states a service the application provides."
        },
        {
          "q": "No more than two level-one faults per month",
          "options": [
            "Reliability",
            "Maintainability",
            "Performance",
            "Security"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Reliability."
        },
        {
          "q": "Dashboard available 98% of business hours",
          "options": [
            "Availability",
            "Performance",
            "Security",
            "Portability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Availability."
        },
        {
          "q": "Repair a severity-2 defect in at most 8 person-hours",
          "options": [
            "Maintainability",
            "Security",
            "Portability",
            "Compatibility"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Maintainability."
        },
        {
          "q": "Respond within 6 seconds under 5000 users per hour",
          "options": [
            "Performance",
            "Portability",
            "Compatibility",
            "Usability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Performance."
        },
        {
          "q": "Password contains uppercase letter and digit",
          "options": [
            "Security",
            "Compatibility",
            "Usability",
            "Design constraint"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Security."
        },
        {
          "q": "Run on Windows and Linux",
          "options": [
            "Portability",
            "Usability",
            "Design constraint",
            "Software constraint"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Portability."
        },
        {
          "q": "Support the stated iOS versions",
          "options": [
            "Compatibility",
            "Functional",
            "Reliability",
            "Availability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Compatibility."
        },
        {
          "q": "Checkout user error rate no greater than 10%",
          "options": [
            "Usability",
            "Reliability",
            "Availability",
            "Maintainability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Usability."
        },
        {
          "q": "GPA at two-digit precision",
          "options": [
            "Design constraint",
            "Availability",
            "Maintainability",
            "Performance"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Design constraint."
        },
        {
          "q": "Implement in Java with Eclipse",
          "options": [
            "Software constraint",
            "Maintainability",
            "Performance",
            "Security"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Software constraint."
        },
        {
          "q": "Use the specified Xeon server",
          "options": [
            "Hardware constraint",
            "Performance",
            "Security",
            "Portability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Hardware constraint."
        },
        {
          "q": "Use company documentation guidelines",
          "options": [
            "Standards",
            "Security",
            "Portability",
            "Compatibility"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Standards."
        },
        {
          "q": "Communicate with finance via intranet",
          "options": [
            "Communication interface",
            "Portability",
            "Compatibility",
            "Usability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Communication interface."
        },
        {
          "q": "At most four functions per menu",
          "options": [
            "GUI",
            "Compatibility",
            "Usability",
            "Design constraint"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: GUI."
        },
        {
          "q": "Restrict access after three failed login attempts",
          "options": [
            "Error handling",
            "Functional",
            "Reliability",
            "Availability"
          ],
          "answer": 0,
          "explain": "This constrains a satisfactory system: Error handling."
        },
        {
          "q": "See what users actually do",
          "options": [
            "Observation",
            "Research",
            "Questionnaire"
          ],
          "answer": 0,
          "explain": "Observation captures real work; being watched may alter behavior."
        },
        {
          "q": "Try a small working model with users",
          "options": [
            "Prototyping",
            "Sampling",
            "Research"
          ],
          "answer": 0,
          "explain": "It clarifies requirements but may raise unrealistic expectations."
        },
        {
          "q": "Collect records and completed forms",
          "options": [
            "Sampling",
            "Interview",
            "JRP"
          ],
          "answer": 0,
          "explain": "Representative documents reveal current data and processes."
        },
        {
          "q": "Reach many people cheaply and anonymously",
          "options": [
            "Questionnaire",
            "Interview",
            "Observation"
          ],
          "answer": 0,
          "explain": "Low return rates and unclear questions are limitations."
        },
        {
          "q": "Probe and reword a question face to face",
          "options": [
            "Interview",
            "Sampling",
            "Research"
          ],
          "answer": 0,
          "explain": "Interviews allow feedback and body language but take time."
        },
        {
          "q": "Learn how similar projects solved a problem",
          "options": [
            "Research",
            "Observation",
            "Sampling"
          ],
          "answer": 0,
          "explain": "Reference materials and similar systems are research sources."
        },
        {
          "q": "Users, managers and IT jointly identify needs",
          "options": [
            "JRP",
            "Sampling",
            "Unit testing"
          ],
          "answer": 0,
          "explain": "A facilitator leads; a sponsor represents top management; IT listens and takes notes."
        },
        {
          "q": "Choose from Never, Rarely, Sometimes, Often, Always",
          "options": [
            "Likert question",
            "Open-ended question",
            "Unstructured interview"
          ],
          "answer": 0,
          "explain": "The slides distinguish frequency Likert questions from agreement rating questions."
        }
      ]
    },
    {
      "n": 6,
      "title": "Use Cases, Software Design and UML",
      "summary": "Use case roles, include/extend and testable user stories.",
      "takeaways": [
        "A use case achieves a business goal; actors are external to the system boundary.",
        "Primary actors pursue goals; supporting actors provide needed services.",
        "Trigger starts the case; precondition holds before; postcondition holds afterward.",
        "Include: mandatory reuse, dotted arrow from base to included use case.",
        "Extend: conditional extra behavior, dotted arrow from extension to independent base.",
        "User story: As a role, I want capability, so that benefit; INVEST includes Small and Testable."
      ],
      "traps": [
        [
          "Include and extend arrows point the same semantic way",
          "Include points to reused behavior; extend points to the independent base."
        ],
        [
          "A primary actor must be a human",
          "Actors may also be systems, devices, organizations or time."
        ],
        [
          "Generalization points at the specialized child",
          "The hollow triangle points at the parent."
        ]
      ],
      "activities": [
        {
          "id": "ch6-usecase",
          "title": "Use case relationship builder",
          "desc": "Choose relationships, arrow direction and actor roles.",
          "href": "ch6/usecase.html"
        },
        {
          "id": "ch6-invest",
          "title": "INVEST story checker",
          "desc": "Inspect story quality and acceptance criteria.",
          "href": "ch6/invest.html"
        }
      ],
      "quiz": [
        {
          "q": "Which term fits this description: a meaningful unit of work that achieves one business goal?",
          "options": [
            "Use case",
            "Supporting actor",
            "Scenario",
            "Normal flow"
          ],
          "answer": 0,
          "explain": "Use case: A meaningful unit of work that achieves one business goal. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: an external entity interacting with the system?",
          "options": [
            "System boundary",
            "Actor",
            "Trigger",
            "Alternate flow"
          ],
          "answer": 1,
          "explain": "Actor: An external entity interacting with the system. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: pursues a goal and often triggers the use case?",
          "options": [
            "Precondition",
            "Business rule",
            "Primary actor",
            "Actor glossary"
          ],
          "answer": 2,
          "explain": "Primary actor: Pursues a goal and often triggers the use case. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: provides a service needed to achieve the primary actor goal?",
          "options": [
            "Association",
            "Use case glossary",
            "Postcondition",
            "Supporting actor"
          ],
          "answer": 3,
          "explain": "Supporting actor: Provides a service needed to achieve the primary actor goal. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: the event that starts a use case?",
          "options": [
            "Trigger",
            "Normal flow",
            "Include",
            "Independent"
          ],
          "answer": 0,
          "explain": "Trigger: The event that starts a use case. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: something that must hold before the use case starts?",
          "options": [
            "Alternate flow",
            "Precondition",
            "Extend",
            "Negotiable"
          ],
          "answer": 1,
          "explain": "Precondition: Something that must hold before the use case starts. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: a result that holds after completion?",
          "options": [
            "Generalization",
            "Valuable",
            "Postcondition",
            "Business rule"
          ],
          "answer": 2,
          "explain": "Postcondition: A result that holds after completion. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: a variant or exception to the normal sequence?",
          "options": [
            "Include",
            "Independent",
            "Small",
            "Alternate flow"
          ],
          "answer": 3,
          "explain": "Alternate flow: A variant or exception to the normal sequence. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: a solid line linking an actor and a use case?",
          "options": [
            "Association",
            "Valuable",
            "Initiative",
            "Generalization"
          ],
          "answer": 0,
          "explain": "Association: A solid line linking an actor and a use case. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: mandatory reused behavior; dotted arrow points to included use case?",
          "options": [
            "Epic",
            "Include",
            "User story template",
            "Estimable"
          ],
          "answer": 1,
          "explain": "Include: Mandatory reused behavior; dotted arrow points to included use case. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: conditional extra behavior; dotted arrow points to the base use case?",
          "options": [
            "Independent",
            "Small",
            "Extend",
            "Software design"
          ],
          "answer": 2,
          "explain": "Extend: Conditional extra behavior; dotted arrow points to the base use case. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: solid line with hollow triangle pointing to the parent?",
          "options": [
            "Negotiable",
            "Testable",
            "UML",
            "Generalization"
          ],
          "answer": 3,
          "explain": "Generalization: Solid line with hollow triangle pointing to the parent. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: as a role, I want a capability, so that I receive a benefit?",
          "options": [
            "User story template",
            "Initiative",
            "Structural diagrams",
            "Valuable"
          ],
          "answer": 0,
          "explain": "User story template: As a role, I want a capability, so that I receive a benefit. This distinction follows chapter 6."
        },
        {
          "q": "Which term fits this description: class, component, deployment, object, package, profile, composite structure?",
          "options": [
            "Use case",
            "Structural diagrams",
            "System boundary",
            "Trigger"
          ],
          "answer": 1,
          "explain": "Structural diagrams: Class, component, deployment, object, package, profile, composite structure. This distinction follows chapter 6."
        },
        {
          "q": "What is the useful role of acceptance criteria?",
          "options": [
            "Make the story into an epic",
            "Replace every conversation",
            "Show when a story is done",
            "Force a rigid implementation"
          ],
          "answer": 2,
          "explain": "Clear criteria make the story testable and establish completion."
        }
      ],
      "cards": [
        [
          "Use case",
          "A meaningful unit of work that achieves one business goal"
        ],
        [
          "Actor",
          "An external entity interacting with the system"
        ],
        [
          "Primary actor",
          "Pursues a goal and often triggers the use case"
        ],
        [
          "Supporting actor",
          "Provides a service needed to achieve the primary actor goal"
        ],
        [
          "Trigger",
          "The event that starts a use case"
        ],
        [
          "Precondition",
          "Something that must hold before the use case starts"
        ],
        [
          "Postcondition",
          "A result that holds after completion"
        ],
        [
          "Include",
          "Mandatory reused behavior; dotted arrow points to included use case"
        ],
        [
          "Extend",
          "Conditional extra behavior; dotted arrow points to the base use case"
        ],
        [
          "Generalization",
          "Solid line with hollow triangle pointing to the parent"
        ],
        [
          "User story template",
          "As a role, I want a capability, so that I receive a benefit"
        ],
        [
          "Testable",
          "An INVEST story has clear acceptance criteria"
        ]
      ],
      "labQuestions": [
        {
          "q": "Always execute reused behavior",
          "options": [
            "include",
            "extend",
            "generalization"
          ],
          "answer": 0,
          "explain": "Dotted arrow: base to included."
        },
        {
          "q": "Add behavior only when a condition holds",
          "options": [
            "extend",
            "include",
            "association"
          ],
          "answer": 0,
          "explain": "Dotted arrow: extension to base."
        },
        {
          "q": "Show inheritance",
          "options": [
            "generalization",
            "extend",
            "association"
          ],
          "answer": 0,
          "explain": "Solid line, hollow triangle toward the parent."
        },
        {
          "q": "Process Sale: cashier operating the POS",
          "options": [
            "Primary actor",
            "Supporting actor",
            "Internal module"
          ],
          "answer": 0,
          "explain": "The cashier pursues the sale goal."
        },
        {
          "q": "Credit bureau authorizes the card charge",
          "options": [
            "Supporting actor",
            "Primary actor",
            "Use case"
          ],
          "answer": 0,
          "explain": "The external bureau supplies a needed service."
        }
      ]
    },
    {
      "n": 7,
      "title": "Activity, Sequence, State, Class and Component Diagrams",
      "summary": "Activity flow, sequence operators, states and component interfaces.",
      "takeaways": [
        "Activity diagrams model flow; join synchronizes concurrent branches.",
        "Sequence diagrams model messages between lifelines.",
        "alt = alternatives; opt = optional; loop = repetition.",
        "break replaces the remaining interaction; par = parallel; ref = reused interaction.",
        "State machines model states and event-driven transitions; class diagrams are structural.",
        "Provided interface = ball; required interface = socket."
      ],
      "traps": [
        [
          "Flow final stops all activity flows",
          "Only activity final stops all flows; flow final consumes its arriving flow."
        ],
        [
          "Merge waits for all concurrent paths",
          "Join synchronizes concurrency; merge combines alternatives."
        ],
        [
          "Cancel skips ATM exit actions",
          "Leaving Serving Customer still runs ejectCard."
        ],
        [
          "A socket provides a service",
          "Ball provides; socket requires."
        ]
      ],
      "activities": [
        {
          "id": "ch7-activity",
          "title": "Activity symbol identifier",
          "desc": "Distinguish control nodes and follow concurrent flows.",
          "href": "ch7/activity.html"
        },
        {
          "id": "ch7-sequence",
          "title": "Sequence fragment picker",
          "desc": "Choose alt, opt, loop, break, par or ref.",
          "href": "ch7/sequence.html"
        },
        {
          "id": "ch7-atm",
          "title": "ATM state machine",
          "desc": "Step through startup, authentication, transactions and cancel.",
          "href": "ch7/atm.html"
        },
        {
          "id": "ch7-component",
          "title": "Component interfaces",
          "desc": "Connect a provided ball to a required socket.",
          "href": "ch7/component.html"
        }
      ],
      "quiz": [
        {
          "q": "Which term fits this description: models control or object flow through actions?",
          "options": [
            "Activity diagram",
            "Flow final",
            "Fork",
            "Sequence diagram"
          ],
          "answer": 0,
          "explain": "Activity diagram: Models control or object flow through actions. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a circle with an X that ends only its arriving flow?",
          "options": [
            "Message",
            "Flow final",
            "Merge",
            "Object flow"
          ],
          "answer": 1,
          "explain": "Flow final: A circle with an X that ends only its arriving flow. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a bullseye that stops all flows in an activity?",
          "options": [
            "Fork",
            "Sequence diagram",
            "Activity final",
            "alt"
          ],
          "answer": 2,
          "explain": "Activity final: A bullseye that stops all flows in an activity. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a diamond selecting an outgoing flow using a condition?",
          "options": [
            "Join",
            "Lifeline",
            "opt",
            "Decision"
          ],
          "answer": 3,
          "explain": "Decision: A diamond selecting an outgoing flow using a condition. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a bar splitting a flow into concurrent flows?",
          "options": [
            "Fork",
            "break",
            "Object flow",
            "Message"
          ],
          "answer": 0,
          "explain": "Fork: A bar splitting a flow into concurrent flows. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a bar synchronizing incoming concurrent flows?",
          "options": [
            "Sequence diagram",
            "Join",
            "alt",
            "par"
          ],
          "answer": 1,
          "explain": "Join: A bar synchronizing incoming concurrent flows. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: shows messages exchanged between participant lifelines?",
          "options": [
            "State machine",
            "Message",
            "Sequence diagram",
            "break"
          ],
          "answer": 2,
          "explain": "Sequence diagram: Shows messages exchanged between participant lifelines. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a choice between alternative interaction operands?",
          "options": [
            "Shallow history",
            "break",
            "State machine",
            "alt"
          ],
          "answer": 3,
          "explain": "alt: A choice between alternative interaction operands. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: an optional operand, or nothing?",
          "options": [
            "opt",
            "par",
            "Simple state",
            "Class diagram"
          ],
          "answer": 0,
          "explain": "opt: An optional operand, or nothing. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: an operand repeated a number of times?",
          "options": [
            "ref",
            "loop",
            "Composite state",
            "Provided interface"
          ],
          "answer": 1,
          "explain": "loop: An operand repeated a number of times. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: potentially parallel interaction operands?",
          "options": [
            "Port",
            "State machine",
            "par",
            "Shallow history"
          ],
          "answer": 2,
          "explain": "par: Potentially parallel interaction operands. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a call or reference to another interaction?",
          "options": [
            "Simple state",
            "Class diagram",
            "Assembly connector",
            "ref"
          ],
          "answer": 3,
          "explain": "ref: A call or reference to another interaction. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: discrete behavior modeled as event-driven state transitions?",
          "options": [
            "State machine",
            "Required interface",
            "Dependency",
            "Region"
          ],
          "answer": 0,
          "explain": "State machine: Discrete behavior modeled as event-driven state transitions. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: shows classes, attributes, operations and relationships?",
          "options": [
            "Activity final",
            "Class diagram",
            "Port",
            "Activity diagram"
          ],
          "answer": 1,
          "explain": "Class diagram: Shows classes, attributes, operations and relationships. This distinction follows chapter 7."
        },
        {
          "q": "Which term fits this description: a half circle: services needed by a component?",
          "options": [
            "Delegation connector",
            "Initial node",
            "Required interface",
            "Merge"
          ],
          "answer": 2,
          "explain": "Required interface: A half circle: services needed by a component. This distinction follows chapter 7."
        }
      ],
      "cards": [
        [
          "Activity diagram",
          "Models control or object flow through actions"
        ],
        [
          "Join",
          "A bar synchronizing incoming concurrent flows"
        ],
        [
          "alt",
          "A choice between alternative interaction operands"
        ],
        [
          "opt",
          "An optional operand, or nothing"
        ],
        [
          "loop",
          "An operand repeated a number of times"
        ],
        [
          "break",
          "A scenario replacing the rest of its enclosing interaction"
        ],
        [
          "par",
          "Potentially parallel interaction operands"
        ],
        [
          "ref",
          "A call or reference to another interaction"
        ],
        [
          "State machine",
          "Discrete behavior modeled as event-driven state transitions"
        ],
        [
          "Class diagram",
          "Shows classes, attributes, operations and relationships"
        ],
        [
          "Provided interface",
          "A complete circle: services offered by a component"
        ],
        [
          "Required interface",
          "A half circle: services needed by a component"
        ]
      ],
      "labQuestions": [
        {
          "q": "Identify the filled circle in an activity diagram.",
          "options": [
            "Initial",
            "Activity final",
            "Flow final",
            "Decision"
          ],
          "answer": 0,
          "explain": "Flow starts here."
        },
        {
          "q": "Identify the bullseye in an activity diagram.",
          "options": [
            "Activity final",
            "Flow final",
            "Decision",
            "Merge"
          ],
          "answer": 0,
          "explain": "All flows stop."
        },
        {
          "q": "Identify the circle containing X in an activity diagram.",
          "options": [
            "Flow final",
            "Decision",
            "Merge",
            "Fork"
          ],
          "answer": 0,
          "explain": "Only the arriving flow stops."
        },
        {
          "q": "This diamond has one input and guarded alternative outputs. Identify it.",
          "options": [
            "Decision",
            "Merge",
            "Fork",
            "Join"
          ],
          "answer": 0,
          "explain": "Chooses an outgoing path."
        },
        {
          "q": "This diamond combines alternative incoming paths. Identify it.",
          "options": [
            "Merge",
            "Initial",
            "Activity final",
            "Flow final"
          ],
          "answer": 0,
          "explain": "Combines alternatives; does not synchronize concurrency."
        },
        {
          "q": "Identify the bar splitting one incoming flow in an activity diagram.",
          "options": [
            "Fork",
            "Activity final",
            "Flow final",
            "Decision"
          ],
          "answer": 0,
          "explain": "One incoming flow becomes concurrent outgoing flows."
        },
        {
          "q": "Identify the bar combining concurrent incoming flows in an activity diagram.",
          "options": [
            "Join",
            "Flow final",
            "Decision",
            "Merge"
          ],
          "answer": 0,
          "explain": "Waits for concurrent incoming flows."
        },
        {
          "q": "Identify the concave pentagon in an activity diagram.",
          "options": [
            "Accept event",
            "Decision",
            "Merge",
            "Fork"
          ],
          "answer": 0,
          "explain": "Waits for a specified event."
        },
        {
          "q": "Choose between two guarded payment outcomes",
          "options": [
            "alt",
            "opt",
            "loop",
            "break",
            "par",
            "ref"
          ],
          "answer": 0,
          "explain": "A choice between alternative interaction operands"
        },
        {
          "q": "Send a receipt only when requested",
          "options": [
            "opt",
            "alt",
            "loop",
            "break",
            "par",
            "ref"
          ],
          "answer": 0,
          "explain": "An optional operand, or nothing"
        },
        {
          "q": "Repeat entry while more items remain",
          "options": [
            "loop",
            "alt",
            "opt",
            "break",
            "par",
            "ref"
          ],
          "answer": 0,
          "explain": "An operand repeated a number of times"
        },
        {
          "q": "Abort the rest of login after too many failures",
          "options": [
            "break",
            "alt",
            "opt",
            "loop",
            "par",
            "ref"
          ],
          "answer": 0,
          "explain": "A scenario replacing the rest of its enclosing interaction"
        },
        {
          "q": "Perform two interaction operands concurrently",
          "options": [
            "par",
            "alt",
            "opt",
            "loop",
            "break",
            "ref"
          ],
          "answer": 0,
          "explain": "Potentially parallel interaction operands"
        },
        {
          "q": "Reuse another interaction diagram",
          "options": [
            "ref",
            "alt",
            "opt",
            "loop",
            "break",
            "par"
          ],
          "answer": 0,
          "explain": "A call or reference to another interaction"
        },
        {
          "q": "Connect services offered by one component to services used by another",
          "options": [
            "Assembly connector",
            "Delegation connector",
            "Shallow history"
          ],
          "answer": 0,
          "explain": "Assembly joins provided and required services."
        },
        {
          "q": "Connect an external contract to its internal realization",
          "options": [
            "Delegation connector",
            "Assembly connector",
            "Generalization"
          ],
          "answer": 0,
          "explain": "Delegation forwards the contract to the internal component."
        },
        {
          "q": "Product provides item code; Order requires which interface?",
          "options": [
            "Required socket",
            "Provided ball"
          ],
          "answer": 0,
          "explain": "The Product ball provides item code and the Order socket requires it."
        }
      ]
    }
  ],
  "games": {
    "ch1-terms": {
      "ch": 1,
      "type": "match",
      "title": "Connect the ideas",
      "intro": "Match each term to its meaning.",
      "pairs": [
        [
          "Engineering",
          "Applying science and mathematics to practical problems"
        ],
        [
          "Software engineering",
          "A systematic, disciplined and quantifiable approach to software"
        ],
        [
          "System",
          "Interacting elements organized for a common purpose"
        ],
        [
          "Information system",
          "Collects, processes, stores and distributes information"
        ],
        [
          "Hardware",
          "The physical layer of an information system"
        ],
        [
          "Software",
          "Instructions that control hardware"
        ]
      ]
    },
    "ch1-distinguish": {
      "ch": 1,
      "type": "match",
      "title": "Distinguish related terms",
      "intro": "Explain each distinction before matching.",
      "pairs": [
        [
          "Defect",
          "A deviation from requirements"
        ],
        [
          "Defect density",
          "Number of defects relative to software size"
        ],
        [
          "Mean time to failure",
          "Elapsed time between system crashes"
        ],
        [
          "Verification",
          "Checking that the product is built according to specifications"
        ],
        [
          "Validation",
          "Checking that the system meets user requirements"
        ],
        [
          "Project success",
          "Meeting user needs on time and within budget"
        ]
      ]
    },
    "ch2-terms": {
      "ch": 2,
      "type": "match",
      "title": "Connect the ideas",
      "intro": "Match each term to its meaning.",
      "pairs": [
        [
          "Planning",
          "Defines activities, resources, cost and schedule"
        ],
        [
          "SPMP",
          "Software Project Management Plan, the planning output"
        ],
        [
          "Requirements analysis",
          "Identifies what users need and want"
        ],
        [
          "SRS",
          "Software Requirements Specification, the analysis output"
        ],
        [
          "Architectural design",
          "Divides software into modules and their interfaces"
        ],
        [
          "Detailed design",
          "Specifies algorithms, data structures and constraints"
        ]
      ]
    },
    "ch3-terms": {
      "ch": 3,
      "type": "match",
      "title": "Connect the ideas",
      "intro": "Match each term to its meaning.",
      "pairs": [
        [
          "XP",
          "Extreme Programming uses frequent small releases"
        ],
        [
          "Quarterly cycle",
          "The XP release cycle"
        ],
        [
          "Weekly cycle",
          "The XP iteration cycle ending with running tested features"
        ],
        [
          "Communication",
          "An XP value emphasizing daily face-to-face exchange"
        ],
        [
          "Simplicity",
          "An XP value: do the simplest thing that works"
        ],
        [
          "Feedback",
          "Deliver working software, demonstrate it and listen"
        ]
      ]
    },
    "ch4-terms": {
      "ch": 4,
      "type": "match",
      "title": "Connect the ideas",
      "intro": "Match each term to its meaning.",
      "pairs": [
        [
          "Function point",
          "A technology-independent measure of user-level functionality"
        ],
        [
          "EI",
          "External input: data crosses into the application"
        ],
        [
          "EO",
          "External output: derived data leaves the application"
        ],
        [
          "EQ",
          "External inquiry: retrieves existing data"
        ],
        [
          "ILF",
          "Internal logical file: related data within the application boundary"
        ],
        [
          "EIF",
          "External interface file: reference data maintained by another application"
        ]
      ]
    },
    "ch4-distinguish": {
      "ch": 4,
      "type": "match",
      "title": "Distinguish related terms",
      "intro": "Explain each distinction before matching.",
      "pairs": [
        [
          "PERT chart",
          "A network showing task dependencies and timeline"
        ],
        [
          "Gantt chart",
          "Task bars placed against a calendar"
        ],
        [
          "Critical path",
          "The dependency path with the largest total duration"
        ],
        [
          "TE",
          "Earliest task completion time from the forward pass"
        ],
        [
          "TL",
          "Latest task completion time from the backward pass"
        ],
        [
          "Slack",
          "TL minus TE; zero identifies a critical task"
        ]
      ]
    },
    "ch5-distinguish": {
      "ch": 5,
      "type": "match",
      "title": "Distinguish related terms",
      "intro": "Explain each distinction before matching.",
      "pairs": [
        [
          "Structured interview",
          "An interview with a specific prepared set of questions"
        ],
        [
          "Unstructured interview",
          "An interview with a general goal and few fixed questions"
        ],
        [
          "JRP",
          "Joint Requirements Planning through user and IT workshops"
        ],
        [
          "Facilitator",
          "Plans and leads the JRP session and follows up requirements"
        ],
        [
          "Sponsor",
          "A top-management participant who helps lead and closes JRP"
        ],
        [
          "Questionnaire weakness",
          "Low response rates and no chance to clarify misunderstood questions"
        ]
      ]
    },
    "ch6-distinguish": {
      "ch": 6,
      "type": "match",
      "title": "Distinguish related terms",
      "intro": "Explain each distinction before matching.",
      "pairs": [
        [
          "Epic",
          "A large body of work broken into stories"
        ],
        [
          "Software design",
          "Moves from what is needed to how it will be built"
        ],
        [
          "UML",
          "Unified Modeling Language, independent of implementation language"
        ],
        [
          "Structural diagrams",
          "Class, component, deployment, object, package, profile, composite structure"
        ],
        [
          "Behavioral diagrams",
          "Use case, activity, sequence, state machine, communication, interaction overview, timing"
        ],
        [
          "Activity partition",
          "A swimlane grouping actions with a shared responsibility"
        ]
      ]
    },
    "ch7-terms": {
      "ch": 7,
      "type": "match",
      "title": "Connect the ideas",
      "intro": "Match each term to its meaning.",
      "pairs": [
        [
          "Activity diagram",
          "Models control or object flow through actions"
        ],
        [
          "Action",
          "One atomic step, drawn as a rounded rectangle"
        ],
        [
          "Initial node",
          "A filled circle marking the start of an activity"
        ],
        [
          "Flow final",
          "A circle with an X that ends only its arriving flow"
        ],
        [
          "Activity final",
          "A bullseye that stops all flows in an activity"
        ],
        [
          "Decision",
          "A diamond selecting an outgoing flow using a condition"
        ]
      ]
    },
    "ch7-distinguish": {
      "ch": 7,
      "type": "match",
      "title": "Distinguish related terms",
      "intro": "Explain each distinction before matching.",
      "pairs": [
        [
          "Provided interface",
          "A complete circle: services offered by a component"
        ],
        [
          "Required interface",
          "A half circle: services needed by a component"
        ],
        [
          "Port",
          "An interaction point on a classifier boundary"
        ],
        [
          "Assembly connector",
          "Connects provided services to required services"
        ],
        [
          "Delegation connector",
          "Connects an external contract to its internal realization"
        ],
        [
          "Dependency",
          "A directed relationship showing that one element needs another"
        ]
      ]
    },
    "ch2-order": {
      "ch": 2,
      "type": "order",
      "title": "Build the sequence",
      "intro": "Arrange the slide concepts in the indicated progression.",
      "items": [
        "Planning",
        "Requirements analysis",
        "Software design",
        "Development",
        "Testing",
        "Deployment",
        "Maintenance"
      ]
    },
    "requirements-sort": {
      "ch": 5,
      "type": "bucket",
      "title": "Function or quality?",
      "intro": "Sort the slide requirements.",
      "buckets": [
        "Functional",
        "Nonfunctional"
      ],
      "items": [
        [
          "Display weekly schedule",
          0
        ],
        [
          "Send welcome email",
          0
        ],
        [
          "Dashboard available 98% of business time",
          1
        ],
        [
          "Response within six seconds",
          1
        ],
        [
          "Run on Windows and Linux",
          1
        ]
      ]
    },
    "organization-sort": {
      "ch": 3,
      "type": "bucket",
      "title": "Organization structures",
      "intro": "Place each characteristic.",
      "buckets": [
        "Project-oriented",
        "Function-oriented",
        "Matrix"
      ],
      "items": [
        [
          "Dedicated to one project",
          0
        ],
        [
          "Less reuse across isolated engineers",
          0
        ],
        [
          "Grouped by function",
          1
        ],
        [
          "Moving staff can delay work",
          1
        ],
        [
          "Functional staff loaned to projects",
          2
        ],
        [
          "Efficient resource use",
          2
        ]
      ]
    },
    "uml-sort": {
      "ch": 6,
      "type": "bucket",
      "title": "UML families",
      "intro": "Structure or behavior?",
      "buckets": [
        "Structural",
        "Behavioral"
      ],
      "items": [
        [
          "Class",
          0
        ],
        [
          "Component",
          0
        ],
        [
          "Deployment",
          0
        ],
        [
          "Object",
          0
        ],
        [
          "Package",
          0
        ],
        [
          "Profile",
          0
        ],
        [
          "Composite structure",
          0
        ],
        [
          "Use case",
          1
        ],
        [
          "Activity",
          1
        ],
        [
          "Sequence",
          1
        ],
        [
          "State machine",
          1
        ],
        [
          "Communication",
          1
        ],
        [
          "Interaction overview",
          1
        ],
        [
          "Timing",
          1
        ]
      ]
    }
  }
};

/* hub: exam and extra resources (assets/js/hub.js) */
Object.assign(window.COURSE, {
 "examFormat": "Project 20% · Midterm 30% (week 8, chapters 1–7) · Final 50%.",
 "exam": {
  "title": "Midterm",
  "when": "Week 8 (around 11–12 Nov 2026)",
  "scope": "Chapters 1–7",
  "length": "50 minutes",
  "parts": [
   [
    "Discussion",
    30,
    "Systems Analyst, Verification vs Validation, Waterfall vs Agile, FR vs NFR"
   ],
   [
    "True/False + fill-in",
    20,
    "short definitions; give the reason for every False"
   ],
   [
    "Function Point Analysis",
    30,
    "UFP → VAF → AFP from a table"
   ],
   [
    "Fishbone",
    20,
    "purpose and drawing, then apply it to a scenario"
   ]
  ],
  "plan": [
   [
    "past.html",
    "Solve both past papers on paper, then compare",
    "45 min"
   ],
   [
    "drill.html",
    "Function point drill 3–4 times until it is automatic",
    "30 min"
   ],
   [
    "past.html#a4b",
    "Draw one fishbone from memory",
    "15 min"
   ],
   [
    "videos.html",
    "Watch the 16 short videos (1.25× is fine)",
    "22 min"
   ],
   [
    "ozet.html",
    "Midterm özeti: hide the answers in part 2 and recall",
    "20 min"
   ],
   [
    "mock.html",
    "If there is time: one mock paper",
    "30 min"
   ]
  ]
 },
 "resources": [
  {
   "kind": "past",
   "href": "past.html",
   "title": "Past midterms",
   "meta": "2 papers, solved",
   "desc": "The real format, every question with a short model answer. Start here."
  },
  {
   "kind": "summary",
   "href": "ozet.html",
   "title": "Midterm özeti",
   "meta": "Türkçe · 4 exam parts",
   "desc": "The four exam parts on one page: Turkish explanations, English terms."
  },
  {
   "kind": "drill",
   "href": "drill.html",
   "title": "Hesap pratiği",
   "meta": "4 calculations",
   "desc": "UFP, VAF/AFP, critical path and channels, new numbers each time."
  },
  {
   "kind": "mock",
   "href": "mock.html",
   "title": "Mock midterm",
   "meta": "2 papers, real format",
   "desc": "Practice, not a test: True/False shows right or wrong at once; model answers for the rest."
  },
  {
   "kind": "videos",
   "href": "videos.html",
   "title": "Explainer videos",
   "meta": "16 videos · 22 min",
   "desc": "One idea each, drawn and narrated in English, with the slides' examples."
  }
 ]
});
