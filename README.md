# course_sites

Interactive simulations, games, quizzes and flashcards built from my course
materials, to understand the material rather than memorize it.

Open `index.html` in a browser. Everything is plain HTML/CSS/JS: no build
step, no server, works offline. Progress is saved in the browser (localStorage).

## Courses

- **COE303 — Operating Systems** (`coe303/`): Chapters 1–4
  - 11 simulations (`coe303/chN/*.html`)
  - 24 order/sort/match games, a quiz and flashcards per chapter, all driven by `coe303/data.js`

## Layout

```
index.html            course list
assets/css/style.css  shared styles
assets/js/common.js   top bar, progress, el() helper
assets/js/race.js     race-condition stepper (used by ch3 + ch4)
coe303/data.js        all chapter content: takeaways, quizzes, cards, games
coe303/{quiz,cards,game}.html   generic engines (?ch=N / ?id=game)
coe303/chN/           custom simulations per chapter
materials/            raw course files — local only, gitignored (copyrighted)
```

## Adding a chapter

1. Put the new slides in `materials/COE303/slides/` and extract text (see `materials/README.md`).
2. Add a chapter object (takeaways, traps, activities, quiz, cards) and its games to `coe303/data.js`.
3. Add simulation pages under `coe303/chN/` when a topic needs one.
