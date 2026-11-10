# AGENTS.md: how to work on course_sites

Read this before changing anything. It is the shared rulebook for every agent (Claude, Codex, others).
`README.md` explains the layout and how to add a chapter or a course. This file explains **what the owner wants**
and the rules that came from their feedback.

## What this is

A personal study site for the owner's university courses (İstinye Üniversitesi). Plain HTML, CSS and JavaScript,
opened straight from disk (`index.html`), with no build step and no server. Progress is kept in localStorage. GitHub is
only a backup; there is no hosting.

Courses: COE303 (OS), COE025 (NLP), COE305 (ML), UNI480 (AI in Health Management), ENS010 (Nanoscience),
SWE307 (Software Engineering Analysis and Design). Each lives in `<course>/`.

## Hard rules

1. **Never commit raw course material.** The repo is public and the slides, transcripts and past exams are
   copyrighted. They live in `materials/<CODE>/` in the main checkout (`C:\Users\efeba\course_sites`) and are
   gitignored. Never copy slide text or images into tracked files beyond short paraphrases. The one exception is our
   own rendered explainer videos in `materials/<CODE>/video/`: the owner asked for them to be pushed (2026-11-10), so
   `.gitignore` lets that folder through. Commit new renders there with the course.
2. **Content comes only from the course material** (slides, lecture transcripts, past papers the owner sends). No facts
   from outside. When the slides contradict themselves, say so on the page instead of picking a side silently.
3. **Stay in exam scope.** When the owner names the scope or the lecturer announces it, follow it exactly.
4. **No emoji anywhere** (UI, content, commit messages).
5. **Verify before you finish:** open every page you touched in headless Chrome (Python Playwright with
   `channel='chrome'` works) and confirm zero JS errors; click through lessons, quizzes and labs you changed.
6. **Commit and push to `main` when a piece of work is done and verified** (the owner approved this). Then
   fast-forward the main checkout (`git -C C:/Users/efeba/course_sites pull --ff-only origin main`) so the site opened
   from disk is current. Never commit secrets; never force-push.

## The owner

- A beginner in most of these subjects. Reads **Turkish** more easily, but the courses and exams are in **English**.
- Studies in short, intense bursts before exams, and wants to see at once what exists and where to start.
- Rejects anything that reads like a machine wrote it: term dumps, repeated boilerplate, walls of facts.

## Language

- Lessons, quizzes, flashcards, mocks, videos: **English** (exam practice).
- Exam-prep summaries (`ozet.html`, the "Midterm özeti"): **Turkish explanations, English terms in bold**.
  Model answers that the student would write are short **English keyword lines**, never paragraphs to memorize.

## Look and feel ("study notebook")

`assets/css/style.css`: warm paper (light) and dark ink themes, serif headings, hairline rules, one ink accent, a
highlighter for big ideas. No gradients, no pill-heavy "AI" styling, no emoji. New UI must reuse the CSS variables and
work in both themes and at phone width.

## Course hub

Every `<course>/index.html` is the **same shell**; the layout is `assets/js/hub.js`. Do not hand-edit a hub. Declare
things at the end of `<course>/data.js`:

```js
Object.assign(window.COURSE, {
  exam: { title, when, scope, length, parts: [[name, points, note]], plan: [[href, label, minutes]], done },
  resources: [{ kind: 'past' | 'summary' | 'mock' | 'drill' | 'scenarios' | 'videos', href, title, meta, desc }],
});
```

The hub shows the next exam with a numbered "start here" plan (one line once `done: true`), an "In this course" grid
with real counts, then one row per chapter. The home page lists the same resources. When an exam date passes, set
`done: true`. When the owner sends exam facts (format, past papers), update `exam` and the plan immediately and remove
stale statements (for example "format not announced").

## Course recipe (every new course, from 2026-11-10)

Use this for every course. All six courses were rebuilt to it on 2026-11-10. The raw materials of COE025,
UNI480 and ENS010 are not on the Windows PC (they were built elsewhere), so those rebuilds used the existing course
content as their source; re-verify against the slides when the materials are back. COE303 (2026-11-10) and COE305
(2026-11-11, slides 01–06 plus the lecturer's midterm topic list) have their slides in `materials/` and were re-checked. Guiding rule from the owner: **nothing bloated**. Every piece must earn
its place; when in doubt, cut.

A course is three things, built in this order:

### 1. Chapters: teach the whole picture (`data.js` + `guide.js` + `anims.js` + labs)

One chapter per lecture/week/chapter, numbered like the slides. Each chapter has one guided lesson (engine
`assets/js/learn.js`) plus its practice.

- **Whole picture first.** Chapter 1's first step is a course map: the chapters as one flow and how they connect. Every
  other lesson's first step shows where this chapter sits in that map and what question it answers ("we can now
  estimate size; this chapter turns size into time and cost"). The last teaching step ties the chapter back to the map.
- **Steps:** 4–8 teaching steps per chapter, then the practice step. One step = **one idea**, taught from zero in short
  plain English sentences with the slide's own example; ≤ ~150 words of `html`. `key` = the big idea with exam words in
  bold. Title = the idea ("Include always calls the behaviour at the arrow tip"), never a pair of glossary terms. No
  sentence repeats across steps; no generic filler ("read each idea below…").
- **One picture per step.** `fig` shows *that* step's idea: a `figs.js` diagram, an animation from `anims.js` for
  anything that happens in steps (a process, a calculation, a flow), or a slide image redrawn as a diagram. Never reuse
  an unrelated figure.
- **Labs:** 1–3 per chapter, only for ideas you understand by doing (a calculation, a process, a diagram to build).
  Embed each in the step it practises with a concrete task checklist ("set N = 8, count the lines: 28").
- **Checks:** every step ends with one conceptual or calculation question with a reason; vary the correct position.
- **Practice per chapter (in `data.js`):** quiz 12–15 questions, flashcards 10–15, games ≤ 2, takeaways ≤ 6,
  exam traps ≤ 5. The correct MC option must not tend to be the longest; answer positions balanced. Answers feed the
  spaced-repetition review (`CS.srs`); the honest understanding test (`test.html`) stays as it is.
- Exam traps go in `callout warn` inside the step where they arise.

Upgrades over the older courses, for new ones: the course map and "where are we" first steps; fixed size limits;
one figure per step; labs only where doing teaches; quiz/cards trimmed to what is examinable.

### 2. Midterm özeti (`ozet.html`): compact, aimed at the midterm

One page, readable in about 20–30 minutes, **only for the midterm** (and later a "Final özeti" the same way).

- **Turkish explanations, English terms in bold** (the exam is English). Short sentences, one term at a time.
- **Organized by the exam:** if the format is known (announcement or past papers), one section per exam part with its
  points; otherwise one section per topic the lecturer stressed. Scope exactly as announced.
- Comparisons as small tables (X vs Y), calculations as numbered steps with what each number means plus one worked
  example, likely definitions and true/false traps as a table with a "hide answers" button for self-testing.
- **Not allowed:** "Kâğıda yaz" / "write this" boxes, paragraphs to memorize, long glossaries, a "big picture" essay,
  repeating the lessons.

### 3. Mock midterm (`mock.html` + `mock.js`): practice, not a test

- **Instant feedback:** picking an option shows right or wrong and a one-line reason immediately; no Submit, no timer,
  no score screen required. Written / calculation questions have a "show model answer" button; model answers are short
  English keyword lines (Turkish one-line hints allowed).
- Follow the real exam format when it is known (e.g. SWE307: Discussion, True/False + fill-in, FPA, Fishbone);
  otherwise multiple choice plus a few written questions in the lecturer's style.
- Size: one paper of about 20–30 items (two short papers only if the format has few questions). No 60-question banks.

### Optional, only when there is a reason

- `past.html` when the owner sends past papers: every question, a Turkish hint, a short English model answer.
- `drill.html` only if the exam has calculations: just those calculations, new numbers each time, step-by-step reveal.
- `videos.html` when the owner asks for videos (see Videos below).
- Each of these, and the özeti and mock, is declared in `COURSE.resources` so the hub and home page show it.

### Checklist for a new course

1. Slides into `materials/<CODE>/` (slides, text, png; NOTES.md for anything only in images). Never commit them.
2. Copy `coe303/{index,learn,test,quiz,cards,game}.html` unchanged; write `data.js`, `guide.js`, `anims.js`, labs.
3. Register in `COURSES` (`assets/js/common.js`), the `about` line on the home page, and the README course list.
4. `COURSE.exam` (format, date, scope, start-here plan) and `COURSE.resources` at the end of `data.js`.
5. Write `ozet.html` and `mock.html` by the rules above.
6. Have a second agent fact-check every quiz and mock answer against the slide text; fix what it finds.
7. Headless-Chrome check every page (zero JS errors), then commit, push, and fast-forward the main checkout.

## Videos

Narrated, 1080p, **English**, no slides and no captions: drawn scenes that move with the voice, few ideas per video,
slow, intuition first, the course's own examples. Two Remotion pipelines exist:

- `tools/video/` (UNI480 and SWE307 explainers; Kokoro voice `af_heart`; the style the owner asked for most recently).
  Windows workflow in its README: `tts.py` → scenes in `src/swe/` → `check.mjs sheet` + `sheet.py` contact sheet →
  `render_all.mjs` (re-encodes to yuv420p; Firefox/Zen refuse yuvj420p).
- `tools/motion/` (ENS010 and COE025; edge-tts), recipe in its README.

Always check the contact sheet for overlaps and clipped labels before rendering. Rendered files go to
`materials/<CODE>/video/` (committed, see hard rule 1); `<course>/videos.html` plays them.

## Working with other agents

Large jobs may be split across agents. Give each agent its own files so they do not collide, include these rules in
the brief, and have a second agent fact-check quiz and mock answers against the slide text before committing.
