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
  COE025/
    slides/      lecture decks (.pptx)
    text/        slide text + speaker notes extracted with python-pptx
  COE305/
    slides/      lecture decks 01–05 (.pptx; 04 came as a .rar with two k-means videos)
    syllabus/    course syllabus PDF
    projects/    ML_Project_COE305.pdf
    text/        slide text (zip/XML extraction) + PDF text (PyMuPDF)
    png/         every slide exported to PNG with PowerPoint (equations are images)
```

## Adding new files

1. Drop the new PDF into the matching folder (e.g. `COE303/slides/chapter5.pdf`).
2. Extract text: `pdftotext -enc UTF-8 -layout slides/chapter5.pdf text/chapter5.txt`
3. Ask Claude to add the new chapter to the site (`coe303/data.js` + activity pages).

For `.pptx` decks, extract text and speaker notes with python-pptx. Some decks are
mostly images (COE025 weeks 1–2); export them to PNG with PowerPoint to read them.

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

## COE025 inventory (as of 2026-10-24)

| File | Slides | Content |
|---|---|---|
| slides/week1-presentation.pptx | 37 | Week 1 NLP Fundamentals (image-based slides) |
| slides/week2-COE025-W02.pptx | 32 | Week 2 Text Classification (image-based slides) |
| slides/week3-pro-standalone-lecture.pptx | 36 | Week 3 lecture: counts → NB/LR/SVM → embeddings → CNN/RNN/LSTM → attention/BERT → metrics (detailed notes) |
| slides/week3-pro-standalone.pptx | 110 | Week 3 extended version with derivations and worked checks |
| slides/8_POSNER_intro_May_6_2021.pptx | 26 | Jurafsky & Martin: Sequence labeling for POS and NER (placed as Week 4) |

## COE305 inventory (as of 2026-10-24)

| File | Slides | Content |
|---|---|---|
| slides/01.pptx | 16 | Week 1 Introduction (Alpaydın ch. 1) |
| slides/02.pptx | 16 | Week 2 Supervised learning (ch. 2) |
| slides/03.pptx | 13 | Week 3 Dimensionality reduction: selection vs extraction, PCA |
| slides/04/04.pptx | 16 | Week 4 Clustering: k-means, EM, hierarchical (+ 2 videos) |
| slides/05.pptx | 17 | Week 5 Decision trees: entropy on Play Tennis, regression trees, pruning, rules |
| syllabus/COE305 - Machine Learning.pdf | 4 | Syllabus: 12 weeks, projects 30 / midterm 30 / final 40 |
| projects/ML_Project_COE305.pdf | 3 | Practical project, 5 tasks, due 2026-11-20 17:00 |
