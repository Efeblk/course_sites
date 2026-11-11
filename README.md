# course_sites

> Working on this repo (person or agent)? Read [`AGENTS.md`](AGENTS.md) first: the owner's rules and conventions.

Guided lessons, interactive simulations, games, quizzes and flashcards built from my course
materials, to understand the material rather than memorize it.

The **guided lessons** (`learn.html?ch=N`) are the main part. Each week is taught from zero, one step at a time.
Every step has a one-sentence "big idea", a diagram, the explanation, the lab embedded in the page with a task
checklist, and a quick check. The last step embeds the week's games, quiz, flashcards and understanding test as tabs.
It ends with an honest **understanding test** (`test.html?ch=N`). It gives no feedback until the end and asks how sure you
are about each answer. Only answers that are right *and* sure count. "Understood" means at least 80% right and sure,
with at most 1 confident mistake, and it is confirmed after passing on two different days.
`progress.html` shows every course: what has been done, what has been understood, and the next step.
`review.html` is the **daily review**: spaced repetition over every course's flashcards, lesson checks and quiz
questions. Whatever you answer in a lesson, quiz or deck is scheduled (right: back in 1, 3, 7, 16, 35, 90 days;
wrong: again in 10 minutes). **Search** (top bar, `Ctrl+K` or `/`) finds lesson steps, labs, terms and quiz questions
across all courses.

Open `index.html` in a browser. Everything is plain HTML/CSS/JS: no build
step, no server, works offline. Progress is saved in the browser (localStorage).

## Courses

- **SWE307 — Software Engineering Analysis and Design** (`swe307/`): Chapters 1–7, kept short and aimed at the midterm
  - `past.html` (two past midterms with model answers), `ozet.html` ("Midterm özeti": the four exam parts in Turkish with
    English terms), `drill.html` (FPA, VAF/AFP, critical path, channels), `mock.html` (mock papers in the real format)
  - `videos.html`: 16 explainer videos made in `tools/video/src/swe/` (rendered locally into `materials/SWE307/video/`)
  - short guided lessons, 14 labs (function points, critical path, use cases, UML symbols, ATM, component interfaces)

- **COE303 — Operating Systems** (`coe303/`): Chapters 1–6 (5 CPU scheduling, 6 synchronization tools)
  - 14 labs (`coe303/chN/*.html`); `coe303/sched.js` is the scheduling engine behind the Gantt Chart Lab and the drill
  - 12 order/sort/match games, a quiz and flashcards per chapter, all driven by `coe303/data.js`
  - midterm pages: `ozet.html`, `mock.html`, `drill.html` (Gantt charts), `exercises.html` (midterm guide exercises)
- **COE025 — Natural Language Processing** (`coe025/`): Weeks 1–4 and 6 (Week 5 was the midterm)
  - 18 simulations (`coe025/wN/*.html`); Week 6 adds a span scorer, an HMM/Viterbi lab and a CRF score lab
  - 25 games, a quiz and flashcards per week, driven by `coe025/data.js`
- **COE305 — Machine Learning** (`coe305/`): Weeks 1–6
  - 13 simulations (`coe305/wN/*.html`): credit scoring, baskets, hypothesis rectangles,
    overfitting, K-fold CV, PCA, subset selection, k-means, EM, hierarchical clustering, ID3, regression trees,
    perceptron (bias, AND/OR/XOR)
  - 12 games, a quiz and flashcards per week, driven by `coe305/data.js`
  - midterm pages: `ozet.html`, `mock.html`, `videos.html` (6 explainer episodes made in `tools/video/src/ml/`)
- **UNI480 — AI in Health Management** (`uni480/`): Weeks 1–4
  - 10 simulations (`uni480/wN/*.html`): ward monitoring agent, hospital-manager scenario, clinical-note NLP,
    vision tasks across hospitals, verifying an AI draft, data-quality inspector, interoperability ("1.8"),
    threshold & alert lab, calibration at a new hospital, human-oversight trainer
  - 25 games, a quiz and flashcards per week, driven by `uni480/data.js`
- **ENS010 — Nanoscience and Engineering** (`ens010/`): Lectures 1–7 (one unit = one lecture, numbered like the slides)
  - 6 labs (`ens010/lN/*.html`): nano ruler, surface atom lab, shrink a bulk material (0D/1D/2D, quantum),
    radiation and invasiveness, choose the imaging technique, build a biosensor
  - 23 games, a quiz and flashcards per lecture, driven by `ens010/data.js`
  - `ozet.html` (Turkish midterm summary with English terms) and `mock.html` (mock midterm with written questions)
  - `videos.html`: narrated English study videos, one per lecture, made with Remotion in `tools/motion/`
    (illustrated scenes that move with the voice, no slides) into `materials/ENS010/video/`

## Layout

```
index.html            course list
assets/css/style.css  shared styles: "study notebook" look (paper/ink themes, serif headings,
                      hairline rules, no gradients, no emoji anywhere); the top-bar
                      button switches light/dark (saved as course-sites:theme)
assets/js/common.js   top bar, progress, el() helper, search palette, spaced-repetition schedule (CS.srs),
                      CS.loadCourses() for pages that read every course
assets/js/review.js   daily review (review.html)
assets/js/learn.js    guided-lesson engine (reads <course>/guide.js)
assets/js/figs.js     lesson diagrams (flow, stack, compare, boxes, graph, plot, bars) from short descriptions
                      (static diagrams build themselves in when they scroll into view)
assets/js/anim.js     animated, step-by-step diagrams: a scene player with captions, play/pause,
                      back/forward, speed, and optional "new data" button or slider
<course>/anims.js     that course's animations, used in guide.js as fig: { type: 'anim', name }
assets/js/test.js     understanding test (lesson checks + quiz questions, confidence-rated)
progress.html         progress dashboard across all courses
review.html           daily spaced-repetition review across all courses
assets/js/race.js     race-condition stepper (used by COE303 ch3 + ch4)
assets/js/plot.js     tiny SVG plotting helper (COE025, COE305, UNI480)
assets/js/ml.js       seeded RNG, least squares, entropy, colors (COE305, UNI480)
<course>/data.js      all content for a course: takeaways, quizzes, cards, games (sets window.COURSE)
<course>/guide.js     step-by-step guided lessons per chapter (sets window.GUIDE)
<course>/{index,learn,test,quiz,cards,game}.html   generic hub + engines (?ch=N / ?id=game); identical in every course folder
assets/js/hub.js      the course hub layout: next exam + "start here" plan, everything the course has (with counts),
                      then one row per chapter; reads COURSE.exam and COURSE.resources from data.js
coe303/chN/, coe025/wN/, coe305/wN/, uni480/wN/, ens010/lN/   custom simulations per chapter / week / lecture
materials/            raw course files — local only, gitignored (copyrighted); only <CODE>/video/ is committed
```

## Study videos

The recipe is in [`tools/motion/README.md`](tools/motion/README.md). Videos are narrated explainers made with Remotion,
with drawn scenes that move with the voice and no slides or captions. Follow it for every new course video.
Made so far: ENS010 lectures 2–7 and COE025 weeks 1, 2, 3, 4 and 6 (`<course>/videos.html` plays them).
`tools/video/` is the older slide-and-caption pipeline. It is kept only for reference.

## Adding a chapter

1. Put the new slides in `materials/<CODE>/slides/` and extract text (see `materials/README.md`).
2. Add a chapter object (takeaways, traps, activities, quiz, cards) and its games to `<course>/data.js`.
3. Add simulation pages under `<course>/chN/` (or `wN/`) when a topic needs one.
4. Write its guided lesson in `<course>/guide.js` (format in `assets/js/learn.js`). Give every step a `key` (big idea) and a `fig` (see `assets/js/figs.js`). For an idea that is a process (something that happens in steps over time), prefer an animation in `<course>/anims.js` (API at the top of `assets/js/anim.js`).

Pages opened inside a lesson (in an iframe) hide their top bar and report their height to the lesson (`common.js`, embed mode).

## Adding a course

New courses follow the **course recipe in [`AGENTS.md`](AGENTS.md)** (chapters that teach the whole picture, a compact
Turkish/English *Midterm özeti*, a practice-mode mock midterm, size limits). The steps below are the mechanics.

1. Copy `coe303/{index,learn,test,quiz,cards,game}.html` into the new folder unchanged.
2. Write its `data.js` (`window.COURSE = { id, code, name, chapters, games, ... }`) and `guide.js`.
3. Register the folder in `COURSES` in `assets/js/common.js` and add a card to `index.html`.
4. Exam pages (summary, mock, drill, past papers, videos) are listed in `COURSE.resources` and the exam in `COURSE.exam`
   (`{ title, when, scope, length, parts: [[name, points, note]], plan: [[href, label, minutes]], done }`) at the end of
   `data.js`. The hub and the home page show them; do not hand-edit `<course>/index.html`.
