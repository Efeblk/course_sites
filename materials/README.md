# Course materials

Raw course files live here, one folder per course. Everything in this folder
except this README is gitignored, because the files are copyrighted and the
repo is public. They exist only on the local machine.

```
materials/
  COE303/
    slides/      lecture slides (chapter1.pdf, chapter2.pdf, ...)
    projects/    project / assignment PDFs
    textbooks/   Silberschatz 10e, Stallings 9e
    text/        plain-text extracts of slides (pdftotext), used to build pages
```

## Adding new files

1. Drop the new PDF into the matching folder (e.g. `COE303/slides/chapter5.pdf`).
2. Extract text: `pdftotext -enc UTF-8 -layout slides/chapter5.pdf text/chapter5.txt`
3. Ask Claude to add the new chapter to the site (`coe303/data.js` + activity pages).

## COE303 inventory (as of 2026-10-23)

| File | Pages | Content |
|---|---|---|
| slides/chapter1.pdf | 80 | Ch.1 Introduction |
| slides/chapter2.pdf | 69 | Ch.2 Operating-System Structures |
| slides/chapter3.pdf | 93 | Ch.3 Processes |
| slides/chapter4.pdf | 61 | Ch.4 Threads & Concurrency |
| projects/project1_phase1.pdf | 13 | Project 1 Phase 1: VirtualBox + Ubuntu + GCC setup |
| textbooks/silberschatz-os-concepts-10e.pdf | 1259 | Primary textbook |
| textbooks/stallings-os-internals-9e.pdf | 1128 | Secondary textbook |
