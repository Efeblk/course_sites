# Narration for the SWE307 explainers. Writes scripts/swe-<name>.json (run from tools/video).
# One video = one idea from the slides; short sentences, slow voice, the exam point said out loud.
import json, os

H = {"voice": "af_heart", "speed": 0.92, "gap": 0.45, "tail": 1.2}
V = {}
V['swe-whathow'] = [
 ("intro", "A hospital wants a new appointment system. Before anyone writes code, two questions must be answered."),
 ("what", "First: what should the system do? That is analysis. Collect the facts, find the problems, and break the system into its parts."),
 ("how", "Second: how will the system do it? That is design. Plan the modules, the screens, the databases, and the interfaces."),
 ("order", "Analysis specifies what. Design focuses on how. Always in that order.", 0.6),
 ("fourp", "Every project has four P's. People: the stakeholders. Product: the software, plus its documents. Project: the activities. And process: the framework that orders those activities."),
 ("success", "A project succeeds when the system meets the user needs, is delivered on time, and stays within budget.", 0.5),
 ("defect", "Quality means meeting the requirements. A defect is a deviation from the requirements."),
 ("cost", "And the earlier a defect is found, the less it costs to repair.", 0.6),
 ("verif", "Two checks protect quality. Verification asks: are we building the product right? Does the code follow the design? Inspections and reviews are verification."),
 ("valid", "Validation asks: are we building the right product? Does the system meet the user requirements? Testing is validation."),
 ("first", "First verification. Then validation.", 1.0),
]
V['swe-sdlc'] = [
 ("intro", "Every software project travels through the same seven phases. Think of a relay race, where each phase hands something to the next."),
 ("plan", "Planning comes first. The goal is a plan for the whole project. Its output is the Software Project Management Plan: the S P M P."),
 ("analysis", "Requirements analysis defines what to build. Its output is the Software Requirements Specification: the S R S."),
 ("design", "Design describes how to build it. Its output is the Software Design Document: the S D D."),
 ("dev", "Development turns the design into program code, and integrates the parts."),
 ("unit", "Testing checks that code, level by level. Unit tests check single modules. Integration tests check that modules work together."),
 ("regress", "Regression tests check that a new change broke nothing old. System tests check the whole system against the user requirements."),
 ("users", "Then the users. Beta testing is real-world use by the users. Acceptance testing is done by the project owner, to decide if the product is ready for release."),
 ("deploy", "Deployment puts the product into production. Its outputs: the delivered system, a release description, and trained users."),
 ("maint", "Maintenance keeps going after the release. It fixes defects, adds enhancements, and improves things like performance and reliability."),
 ("recap", "Remember the three documents. S P M P from planning. S R S from analysis. S D D from design.", 1.0),
]
V['swe-models'] = [
 ("wf", "The waterfall model runs the phases in order. Each phase is done once, and the next starts only when the previous one is complete."),
 ("wfgood", "It is simple, easy to manage, and it works well for small projects whose requirements are well understood."),
 ("wfbad", "But every requirement must be known up front. And major problems are found late, in testing.", 0.4),
 ("idle", "There is no parallelism, so people sit idle, waiting for others."),
 ("iter", "The fix is iterative development. Build a part, test it, get feedback, then build more. Each iteration does some analysis, some design, some coding, and some testing."),
 ("par", "Iterations can even run in parallel, with separate teams."),
 ("agile", "Agile is a highly iterative process. Its purpose: speed up development, and respond to change."),
 ("v1", "Agile values individuals and interactions over processes and tools. And working software over comprehensive documentation."),
 ("v2", "Customer collaboration over contract negotiation. And responding to change over following a plan."),
 ("agpro", "Every iteration produces working software. So the customer can see the project, and give better requirements."),
 ("agcon", "The risks: agile is problematic for very small and very large projects, and documentation takes second place.", 1.0),
]
V['swe-xpscrum'] = [
 ("intro", "Two well-known agile methods: Extreme Programming, called X P, and Scrum."),
 ("weekly", "X P works in weekly cycles. On the first day, the customer picks the stories for that week. By the end of the week, there are running, tested features. A quarterly cycle is a release."),
 ("tdd", "X P writes the test first. Write a failing test. Run it and watch it fail. Write code until it passes. Run it again. Repeat. That is test-driven development."),
 ("pair", "All production code is pair programmed. The driver types. The navigator reviews every line."),
 ("more", "Code is integrated many times a day, anyone may change any code, and the pace is sustainable: a forty-hour week."),
 ("scrum", "Scrum starts with a backlog: the customer's wants and needs, each one a user story.", 0.3),
 ("sprint", "A sprint is a thirty-day cycle. It takes a set of stories from the backlog."),
 ("daily", "Every day, the scrum master runs the daily scrum. No more than fifteen minutes."),
 ("team", "A scrum team has no more than six to nine members."),
 ("demo", "At the end of the sprint, the team shows the customer a demonstration of working, integrated, tested software.", 1.0),
]
V['swe-teams'] = [
 ("late", "Your project is late. The deliverables are not ready. Should you add more people?", 0.5),
 ("channels", "Every pair of people on a team needs a communication channel. With N people, there are N times N minus one, over two channels."),
 ("grow", "Three people: three channels. Four people: six. Five people: ten. Eight people: twenty-eight."),
 ("brooks", "Fred Brooks, in The Mythical Man-Month: adding people to a failing project makes matters worse."),
 ("why", "The cost of more communication can outweigh the gain from dividing the work."),
 ("size", "So teams stay small. The slides give optimal sizes between three and nine people. A scrum team: three to nine, usually with two to five developers.", 0.4),
 ("org", "Teams also sit inside an organization, in one of three structures."),
 ("proj", "Project-oriented: each person is dedicated to one project. Performance and schedules improve, but engineers are isolated, and reuse goes down."),
 ("func", "Function-oriented: groups by function, and functional managers act as project managers. Clear decisions, but moving people between projects causes delay."),
 ("matrix", "Matrix: people belong to a functional group, but are loaned to projects for their expertise. The main advantage: efficient use of resources.", 1.0),
]
V['swe-fpa'] = [
 ("why", "How big is a piece of software, before any code exists? Function Point Analysis measures its functionality from the requirements, independent of the programming language."),
 ("app", "Take the weather app from the slides. One input screen for temperature and rainfall by city and state. One database. One report."),
 ("ei", "External inputs: data crossing the boundary from outside to inside. The add, change and delete buttons. Three."),
 ("eo", "External outputs: derived data going out. The report, with its monthly averages. One."),
 ("eq", "External inquiries: data retrieved. The scroll bar that shows previous entries. One."),
 ("ilf", "Internal logical files: data living inside the application. The database. One."),
 ("eif", "External interface files: another application's data, used for reference only. None here. Zero."),
 ("rank", "Each one is ranked low, average, or high, by counting its fields and the files it touches. Here, everything is low."),
 ("ufp", "Multiply each count by its weight. Three inputs times three. One output times four. One inquiry times three. One file times seven. Unadjusted function points: twenty-three.", 0.4),
 ("vaf", "Next, the general system characteristics. Each gets a weight from zero to five. Here they add up to forty: the value adjustment factor."),
 ("afp", "Adjusted function points: U F P, times zero point six five, plus zero point zero one times V A F. Twenty-three times one point zero five. About twenty-four function points.", 1.0),
]
V['swe-estimate'] = [
 ("size", "Once we know the size, we can estimate effort and duration. Size comes in two units: lines of code, a physical measure, and function points, a functional one."),
 ("loc", "Lines of code depend on the language. To convert, use a gearing factor: the average lines of code per function point. In Java, one function point is about fifty-three lines."),
 ("cls", "Then classify the project. Under five hundred function points: simple. Under a thousand: average. A thousand or more: complex."),
 ("rules", "From function points, use the engineering rules. Duration equals F P to the power A. Staff equals F P over one hundred fifty. Effort equals staff times duration."),
 ("rulesEx", "For five hundred function points, an average project, A is zero point four. Duration: about twelve months. Staff: three point three. Effort: about forty person-months.", 0.4),
 ("cocomo", "From lines of code, use COCOMO one. Effort equals a, times K LOC to the power b. Duration equals c, times effort to the power d. The idea: effort grows faster than size."),
 ("classes", "Organic projects are small, with an experienced team. Semi-detached are medium, like a web app. Embedded are tied to hardware, like an antilock braking system."),
 ("cocomoEx", "The same project is about twenty-two thousand lines. As semi-detached: effort, about ninety-seven person-months. Duration, about twelve months.", 0.4),
 ("weighted", "Two methods, two answers. The slide weights them seven to three: seven times forty, plus three times ninety-seven, over ten. About fifty-seven person-months."),
 ("units", "Remember the units. Duration in months. Effort in person-months.", 1.0),
]
V['swe-critical'] = [
 ("intro", "Eight tasks. Some must wait for others. How long will the whole project take?"),
 ("net", "Draw the network, the PERT chart. Each circle is a task, with its duration in weeks."),
 ("fwd", "Forward pass. Each task's earliest completion time, T E, is the T E before it, plus its own duration. Where two paths meet, take the larger."),
 ("fwdEx", "Task one: five. Task three: eleven. Task four waits for both two and three, so thirteen. Keep going, and task eight finishes at twenty-two.", 0.4),
 ("bwd", "Backward pass. Start at the end with twenty-two, and walk back. Each task's latest completion time, T L, is the next task's T L minus the next task's duration. Where paths split, take the smaller."),
 ("slack", "Slack time is T L minus T E: how long a task can slip without delaying the project."),
 ("slackEx", "Task two has two weeks of slack. Task five has two and a half. Every other task has zero.", 0.4),
 ("path", "Zero-slack tasks are critical. The critical path is one, three, four, six, seven, eight. It is the longest path, and it sets the duration: twenty-two weeks.", 0.6),
 ("tools", "Around it sit other tools. The work breakdown structure splits the project into tasks of at most forty hours. The Gantt chart shows the tasks as bars on a calendar.", 1.0),
]
V['swe-requirements'] = [
 ("what", "A requirement is something the system must do, or a property it must have."),
 ("levels", "Business requirements state high-level goals. Stakeholder requirements say what end users expect. Solution requirements describe the product, and they come in two kinds."),
 ("fr", "Functional requirements describe behavior: what the system does. The student shall display his weekly schedule. The mailing service shall send a welcome email."),
 ("nfr", "Nonfunctional requirements describe qualities and constraints: how well, and within which limits.", 0.3),
 ("s1", "No more than two level-one faults per month. That's reliability."),
 ("s2", "Available ninety-eight percent of business hours. Availability."),
 ("s3", "Six seconds or less, for five thousand users an hour. Performance."),
 ("s4", "A password of at least eight characters, with one upper-case letter and one digit. Security."),
 ("s5", "Runs on both Windows and Linux. Portability."),
 ("s6", "Implemented in Java: a constraint. Talks to a bar code reader: an external interface. Locks the login page after three failed attempts: error handling."),
 ("test", "So ask one question. Does it say what the system does? Functional. Does it say how well, or under which limits? Nonfunctional."),
 ("srs", "All of them go into the Software Requirements Specification.", 1.0),
]
V['swe-factfinding'] = [
 ("fish", "Before collecting requirements, find the real problem. The fishbone, or Ishikawa, diagram puts the problem at the head, on the right."),
 ("bones", "Four to eight main causes become the bones. Sub-causes attach to them, often from a brainstorming session. The goal: the root cause.", 0.4),
 ("discover", "Then, requirements discovery: fact-finding."),
 ("research", "Research: journals, books, and websites of similar projects."),
 ("observe", "Observation: watch people at work. The data is very reliable, but people may act differently when watched."),
 ("proto", "Prototyping: a small working model for users to try. But users may develop unrealistic expectations."),
 ("question", "Questionnaires: cheap, anonymous, and fast for many people. Open-ended questions let people answer freely. Closed-ended ones offer fixed choices. The downside: a low return rate."),
 ("interview", "Interviews: face to face. Unstructured, with only a general goal, or structured, with a fixed set of questions. Rich, but time-consuming."),
 ("sample", "Sampling collects representative documents and forms. Random sampling picks by pure chance. Systematic sampling picks every x over n-th: one hundred from a thousand means every tenth. Stratified sampling splits into subgroups first."),
 ("jrp", "And Joint Requirements Planning: a workshop of users, managers and I T staff, led by a facilitator, with a sponsor from top management.", 1.0),
]
V['swe-usecase'] = [
 ("what", "A use case model shows the system from the user's point of view: what the system does."),
 ("actor", "An actor is anyone or anything outside the system that interacts with it. A person, an organization, another system, a device, even time. Name it with a noun."),
 ("uc", "A use case is one unit of meaningful work. Name it with a verb phrase: log in to system, create order."),
 ("primary", "The primary actor starts the use case to reach a goal, like the cashier recording a sale. A supporting actor helps, like the credit bureau authorizing the card."),
 ("diagram", "In the diagram, the actor is a stick figure, the use case is an oval, and the system boundary is a box. A plain line, the association, joins an actor to a use case."),
 ("include", "Include: the base use case always calls the child. A dotted arrow, labeled include, points from the base to the included use case."),
 ("extend", "Extend: optional extra behavior, triggered by a condition. Calculate bonus extends deposit funds, only for deposits over ten thousand. The base must make sense on its own."),
 ("general", "Generalization: a parent and a child, drawn with a hollow triangle pointing to the parent."),
 ("scenario", "Each use case also gets a written scenario, the fully dressed use case: name, actors, trigger, preconditions, postconditions, normal flow, alternate flows, and business rules.", 1.0),
]
V['swe-userstory'] = [
 ("what", "A user story describes a feature from the end user's point of view. It's the agile way to capture requirements: a sentence or two, plus a conversation."),
 ("template", "The common template: as a role, I want a capability, so that I get a benefit."),
 ("ex", "As a passenger, I want to link my credit card to my profile, so that I can pay for a ride faster."),
 ("backlog", "Stories live in the backlog, an ordered list, often on index cards or sticky notes."),
 ("tree", "Big goals break down. An initiative holds epics. An epic is a large body of work, delivered over several sprints. It breaks into stories, small enough for a one or two week sprint.", 0.3),
 ("invest", "Good stories are INVEST."),
 ("i", "Independent: build them in any order."),
 ("n", "Negotiable: the team decides how."),
 ("v", "Valuable: each one delivers value to users."),
 ("e", "Estimable: easy to estimate."),
 ("s", "Small: done within one sprint."),
 ("t", "Testable: clear acceptance criteria.", 0.3),
 ("accept", "Acceptance criteria tell the team when a story is done. Ensure the bidder can log in, reach the auction page, and select a product.", 1.0),
]
V['swe-activity'] = [
 ("what", "An activity diagram shows a flow: the steps of a business process or a use case, in order, with their conditions."),
 ("token", "Picture a token moving through it. It starts at the initial node: a solid black dot."),
 ("action", "Each action is a rounded rectangle, named with a verb. The token moves along the arrows, called edges."),
 ("decision", "At a decision node, a diamond, the token takes exactly one path, chosen by a condition. A merge node, also a diamond, brings the alternate paths back together."),
 ("fork", "A fork, a thick bar, splits one flow into parallel flows. A join, another bar, waits until every parallel flow arrives, then continues as one."),
 ("finals", "Two endings. A flow final node, a circle with an X, stops only that one flow. An activity final node, a bullseye, stops every flow in the activity."),
 ("accept", "An accept event action, a concave pentagon, waits for an event to happen."),
 ("lanes", "Partitions, or swimlanes, show who does each action. For example: author, reviewer, and approver."),
 ("trap", "So: decision and merge are about choice. Fork and join are about parallel work.", 1.0),
]
V['swe-sequence'] = [
 ("what", "A sequence diagram shows the messages between participants, in time order, from top to bottom."),
 ("lifeline", "Each participant is a lifeline: a head box, with a dashed line going down."),
 ("exec", "While a participant is busy, a thin bar appears on its line: the execution, also called activation."),
 ("msg", "Messages are arrows between lifelines. Each one has a sender and a receiver."),
 ("frag", "Combined fragments are boxes with an operator in the corner.", 0.2),
 ("alt", "alt: alternatives. If this, else that."),
 ("opt", "opt: an option. It happens, or nothing happens."),
 ("loop", "loop: repeat."),
 ("brk", "break: do this instead of the rest. In the login example, after more than three failed attempts, break ends the process."),
 ("par", "par: parallel."),
 ("ref", "And ref, an interaction use, calls another diagram, so big diagrams stay simple."),
 ("destroy", "Finally, an X at the bottom of a lifeline is a destruction occurrence: that participant is gone.", 1.0),
]
V['swe-state'] = [
 ("what", "A state machine diagram shows the states of one thing, and the events that move it between them."),
 ("water", "Water can be liquid, vapor, or ice. Freezing moves it from liquid to ice. Condensation, from vapor to liquid."),
 ("off", "Now an A T M. It starts Off. The black dot is the initial pseudostate."),
 ("on", "Power on. It runs its startup and enters Self Test."),
 ("fail", "If the test fails: Out of Service. Otherwise, with no trigger at all, it moves to Idle."),
 ("card", "A customer inserts a card. The A T M moves to Serving Customer, and on entry, it reads the card."),
 ("composite", "Serving Customer is a composite state. Inside are three substates in sequence: authentication, selecting a transaction, and the transaction."),
 ("cancel", "The customer can cancel at any time. That goes straight back to Idle."),
 ("exit", "And whatever the reason for leaving, the exit action ejects the card.", 0.4),
 ("kinds", "A simple state has no substates. A composite state has substates. And a shallow history state returns to the last substate that was active.", 1.0),
]
V['swe-structure'] = [
 ("uml", "U M L, the Unified Modeling Language, has fourteen diagrams. Seven are behavioral: they show what happens. Use case, activity, sequence, state machine, and three more."),
 ("struct", "Seven are structural: they show what the system is made of. Class, component, deployment, object, package, profile, and composite structure."),
 ("class", "The class diagram is the main building block of object-oriented design. Each class is a box with three parts: the name at the top, attributes in the middle, operations at the bottom."),
 ("rel", "Lines between the classes show their relationships."),
 ("comp", "A component diagram zooms out. A component is a modular part of the system, one level above a class."),
 ("iface", "Components talk through interfaces. A provided interface is a full circle: a ball. A required interface is a half circle: a socket."),
 ("plug", "Order requires an item code. Product provides it. The ball fits into the socket."),
 ("assembly", "That link is an assembly connector: one component provides the service another one uses."),
 ("delegation", "A delegation connector links a subsystem's outside contract to the component inside that really does the work."),
 ("soa", "Component diagrams belong to component-based software engineering, and are used especially for service-oriented architecture.", 1.0),
]

here = os.path.dirname(os.path.abspath(__file__))
for name, beats in V.items():
    out = dict(H, beats=[dict(id=b[0], text=b[1], **({'pause': b[2]} if len(b) > 2 else {})) for b in beats])
    json.dump(out, open(os.path.join(here, name + '.json'), 'w'), indent=1)
print(len(V), 'scripts')
