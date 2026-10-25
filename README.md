# course_sites

Interactive simulations, games, quizzes and flashcards built from my course
materials, to understand the material rather than memorize it.

Open `index.html` in a browser. Everything is plain HTML/CSS/JS: no build
step, no server, works offline. Progress is saved in the browser (localStorage).

## Courses

- **COE303 — Operating Systems** (`coe303/`): Chapters 1–4
  - 11 simulations (`coe303/chN/*.html`)
  - 24 order/sort/match games, a quiz and flashcards per chapter, all driven by `coe303/data.js`
- **COE025 — Natural Language Processing** (`coe025/`): Weeks 1–4
  - 15 simulations (`coe025/wN/*.html`)
  - 20 games, a quiz and flashcards per week, driven by `coe025/data.js`
- **COE305 — Machine Learning** (`coe305/`): Weeks 1–5
  - 12 simulations (`coe305/wN/*.html`): credit scoring, baskets, hypothesis rectangles,
    overfitting, K-fold CV, PCA, subset selection, k-means, EM, hierarchical clustering, ID3, regression trees
  - 21 games, a quiz and flashcards per week, driven by `coe305/data.js`
- **UNI480 — AI in Health Management** (`uni480/`): Weeks 1–4
  - 10 simulations (`uni480/wN/*.html`): ward monitoring agent, hospital-manager scenario, clinical-note NLP,
    vision tasks across hospitals, verifying an AI draft, data-quality inspector, interoperability ("1.8"),
    threshold & alert lab, calibration at a new hospital, human-oversight trainer
  - 25 games, a quiz and flashcards per week, driven by `uni480/data.js`

## Layout

```
index.html            course list
assets/css/style.css  shared styles
assets/js/common.js   top bar, progress, el() helper
assets/js/race.js     race-condition stepper (used by COE303 ch3 + ch4)
assets/js/plot.js     tiny SVG plotting helper (COE025, COE305, UNI480)
assets/js/ml.js       seeded RNG, least squares, entropy, colors (COE305, UNI480)
<course>/data.js      all content for a course: takeaways, quizzes, cards, games (sets window.COURSE)
<course>/{index,quiz,cards,game}.html   generic hub + engines (?ch=N / ?id=game); identical in every course folder
coe303/chN/, coe025/wN/, coe305/wN/, uni480/wN/   custom simulations per chapter / week
materials/            raw course files — local only, gitignored (copyrighted)
```

## Adding a chapter

1. Put the new slides in `materials/<CODE>/slides/` and extract text (see `materials/README.md`).
2. Add a chapter object (takeaways, traps, activities, quiz, cards) and its games to `<course>/data.js`.
3. Add simulation pages under `<course>/chN/` (or `wN/`) when a topic needs one.

## Adding a course

1. Copy `coe303/{index,quiz,cards,game}.html` into the new folder unchanged.
2. Write its `data.js` (`window.COURSE = { id, code, name, chapters, games, ... }`).
3. Register the folder in `COURSES` in `assets/js/common.js` and add a card to `index.html`.
