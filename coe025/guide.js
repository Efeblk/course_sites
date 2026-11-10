/* Checks shuffle; the engine adds final practice. */
window.GUIDE = {
  "1": {
    "goal": "turn text into features and choose a suitable model family.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Text must become numbers before a model can use it",
        "key": "Follow the course from <b>representation</b> to document classification, then <b>sequence labeling</b>.",
        "html": "<p>A review such as “good movie” starts as text. Week 1 asks how to represent it numerically. Week 2 uses those features to predict one document label. Week 3 learns richer representations and checks predictions on held-out data.</p><p>Week 4 changes the output: each word gets a grammatical or entity label. Week 6 keeps those labels aligned and chooses coherent sequences with HMMs or CRFs.</p>",
        "fig": {
          "type": "flow",
          "t": "The course path",
          "items": [
            [
              "",
              "W1: Represent",
              "Text → numbers",
              "c0"
            ],
            [
              "",
              "W2: Classify",
              "Numbers → document label",
              "c1"
            ],
            [
              "",
              "W3: Learn context",
              "Representations + honest evaluation",
              "c2"
            ],
            [
              "",
              "W4: Label words",
              "POS and entity spans",
              "c3"
            ],
            [
              "",
              "W6: Decode sequences",
              "Alignment, HMM and CRF",
              "c0"
            ]
          ]
        },
        "check": {
          "q": "Which week changes from a document label to labels for words?",
          "o": [
            "Week 4",
            "Week 1",
            "Week 2"
          ],
          "why": "Week 4 introduces POS and NER as sequence-labeling tasks."
        }
      },
      {
        "t": "NLP methods evolved from rules to learned context",
        "key": "NLP teaches computers to work with human language. The big problem behind everything is that <b>computers only understand numbers</b>, so every method is a way of turning text into numbers.",
        "fig": {
          "type": "flow",
          "t": "Five eras of NLP",
          "items": [
            [
              "",
              "1950s–80s",
              "hand-written rules (ELIZA)",
              "c3"
            ],
            [
              "",
              "1990s",
              "statistics: n-grams, HMMs",
              "c0"
            ],
            [
              "",
              "2010s",
              "deep learning: Word2Vec, LSTM",
              "c1"
            ],
            [
              "",
              "2017+",
              "Transformers, LLMs: BERT, GPT",
              "c2"
            ],
            [
              "",
              "Now",
              "pick the right tool for the job",
              "c4"
            ]
          ]
        },
        "html": "\n<p><b>Natural Language Processing (NLP)</b> = teaching computers to <b>understand, interpret and generate human language</b>. It stands on three pillars: <b>linguistics</b> (how language works), <b>statistics</b> (learning from data) and <b>computer science</b> (algorithms).</p>\n<table class=\"t\">\n  <tr><th>Era</th><th>Main idea</th><th>Examples</th></tr>\n  <tr><td>1950s–80s</td><td>Hand-written <b>rules</b></td><td>ELIZA (1966), a \"therapist\" chatbot built on patterns</td></tr>\n  <tr><td>1990s</td><td><b>Statistics</b> from data</td><td>n-gram language models, HMMs</td></tr>\n  <tr><td>2010s</td><td><b>Deep learning</b></td><td>Word2Vec, LSTMs, attention</td></tr>\n  <tr><td>2017+</td><td><b>Transformers &amp; LLMs</b></td><td>BERT, GPT</td></tr>\n  <tr><td>Now</td><td>Choosing the <b>right tool</b> for the job</td><td>Sometimes a tiny classic model beats an LLM</td></tr>\n</table>\n<div class=\"callout\"><b>The one problem behind everything this week:</b> computers only work with <b>numbers</b>. Every method you'll see is a different answer to \"how do we turn text into numbers without losing its meaning?\"</div>",
        "check": {
          "q": "Which order of NLP eras is correct?",
          "o": [
            "Rules → statistics → deep learning → Transformers/LLMs",
            "Statistics → rules → Transformers → deep learning",
            "Deep learning → rules → statistics → LLMs",
            "Transformers → rules → statistics → deep learning"
          ],
          "why": "1950s rules (ELIZA) → 1990s statistics (n-grams, HMMs) → 2010s deep learning → 2017+ Transformers."
        }
      },
      {
        "t": "Split unfamiliar words into known pieces",
        "key": "A model only knows the tokens it saw in training. A new word becomes <code>[UNK]</code> and its meaning is lost, unless we split it into <b>known subword pieces</b>.",
        "fig": {
          "type": "stack",
          "t": "From big to small",
          "items": [
            [
              "Corpus",
              "all 50,000 movie reviews",
              "c3"
            ],
            [
              "Document",
              "one review",
              "c0"
            ],
            [
              "Token",
              "\"movie\", \"!\", \"n't\"",
              "c1"
            ]
          ]
        },
        "html": "<p>A corpus contains documents. A tokenizer splits each document into units such as words, punctuation or subwords. Its vocabulary is the set of known units.</p><p>An unseen whole word can become [UNK]. Splitting “unhappiness” into known pieces reduces that problem. BPE learns frequent adjacent merges; BERT-style WordPiece marks continuation pieces with ##.</p><div class=\"callout warn\">Subwords reduce OOV; a split does not prove that the model understands the word.</div>",
        "lab": {
          "href": "w1/tokenizer.html",
          "todo": [
            "In section 1 compare the two split rules on the test text. Count the <code>[UNK]</code> tokens: \"Unhappiness\" and \"unhappy\" are lost.",
            "In section 2 click the BPE merge button step by step. Watch frequent pairs like \"e\"+\"n\" become one token.",
            "In section 3 run WordPiece and look for the <code>##</code> pieces, including the Turkish example."
          ]
        },
        "check": {
          "q": "Why do modern models use subword tokenizers like BPE?",
          "o": [
            "To avoid out-of-vocabulary words: rare words are built from known pieces",
            "To make the text shorter for humans",
            "Because they remove all punctuation",
            "To translate text automatically"
          ],
          "why": "Subwords solve the OOV problem — any word can be written as known pieces."
        }
      },
      {
        "t": "Counts lose the order of words",
        "key": "<b>One-hot</b>: one 1 per word, so no meaning and very long vectors. <b>Bag of words</b>: count each word in a document, but <b>word order is lost</b>.",
        "fig": {
          "type": "anim",
          "name": "bow",
          "t": "Bag of words, one word at a time"
        },
        "html": "<p>With vocabulary [cat, dog, sat, the], cat has one-hot vector [1,0,0,0]. Each word gets its own coordinate; the encoding does not express similarity.</p><p>BoW instead counts a document: “the cat sat the” becomes [1,0,1,2]. It loses word order. Bigrams preserve a little local order: New York differs from York New.</p><div class=\"callout warn\">Identical unigram counts give identical inputs even when the sentences mean different things.</div>",
        "check": {
          "q": "What is the main weakness of bag of words?",
          "o": [
            "It ignores word order",
            "It cannot count words",
            "It only works on one document",
            "It always produces negative numbers"
          ],
          "why": "BoW counts words; \"dog bites man\" = \"man bites dog\"."
        }
      },
      {
        "t": "Rare terms distinguish documents",
        "key": "TF-IDF is <b>high</b> for words that are frequent in <i>this</i> document but <b>rare in the others</b>. Those are the words that tell you what it is about.",
        "fig": {
          "type": "bars",
          "t": "IDF = ln(N / df) with N = 3 documents",
          "items": [
            [
              "\"the\": in 3 of 3 docs",
              0,
              "mute",
              "ln(3/3) = 0"
            ],
            [
              "a word in 2 of 3 docs",
              0.41,
              "c0",
              "ln(3/2) ≈ 0.41"
            ],
            [
              "\"cat\": in 1 of 3 docs",
              1.1,
              "c1",
              "ln(3/1) ≈ 1.10"
            ]
          ],
          "max": 1.2,
          "cap": "A word that is in every document gets weight 0, because it tells the documents apart not at all."
        },
        "html": "\n<p>Counts have a flaw: \"the\" appears in every document, so it dominates, but it tells us nothing. <b>TF-IDF</b> fixes this:</p>\n<p style=\"text-align:center\"><b>TF-IDF(word, doc) = TF × IDF</b></p>\n<ul>\n  <li><b>TF</b> (term frequency): how often the word appears <i>in this document</i> (week 1 uses count ÷ document length).</li>\n  <li><b>IDF</b> (inverse document frequency) = <b>ln(N / df)</b>, where N = number of documents, df = number of documents that contain the word.</li>\n</ul>\n<h3>Worked example</h3>\n<p>3 documents. \"the\" is in all 3 → IDF = ln(3/3) = ln 1 = <b>0</b> → weight 0, ignored. \"cat\" is in only 1 → IDF = ln(3/1) ≈ <b>1.10</b> → a high weight.</p>\n<div class=\"callout\"><b>In one sentence:</b> TF-IDF is high for words that are <b>frequent in this document but rare in the others</b> — exactly the words that describe what the document is about.</div>",
        "lab": {
          "href": "w1/vectors.html",
          "todo": [
            "Click the preset <b>W1 TF-IDF slide (3 docs)</b>.",
            "Look at the vocabulary, one-hot, BoW and TF-IDF tables. Click the TF-IDF cell for <b>\"cat\"</b> and read the arithmetic — you should see the lecture's <b>0.183</b>.",
            "Find a word that appears in every document and check that its TF-IDF is 0.",
            "Try the <b>\"New York\" n-grams</b> preset with \"unigrams + bigrams\"."
          ]
        },
        "check": {
          "q": "A word appears in every document of the corpus. Its IDF = ln(N/df) is…",
          "o": [
            "0",
            "1",
            "very large",
            "negative"
          ],
          "why": "df = N, so ln(N/N) = ln 1 = 0."
        }
      },
      {
        "t": "Put similar words near one another",
        "key": "An <b>embedding</b> is a short list of numbers per word, learned so that <b>similar words end up close together</b>. Directions can even carry meaning.",
        "fig": {
          "type": "plot",
          "t": "Words as points (2 of the 50–300 dimensions, simplified)",
          "w": 560,
          "h": 300,
          "x": [
            0,
            9
          ],
          "y": [
            0,
            6
          ],
          "pts": [
            [
              1,
              2,
              "c0",
              "man"
            ],
            [
              1.8,
              0.6,
              "c4",
              "woman"
            ],
            [
              4,
              5,
              "c0",
              "king"
            ],
            [
              4.8,
              3.6,
              "c4",
              "queen"
            ],
            [
              7,
              1.6,
              "c1",
              "cat"
            ],
            [
              7.6,
              2.3,
              "c1",
              "dog"
            ]
          ],
          "lines": [
            {
              "pts": [
                [
                  1,
                  2
                ],
                [
                  4,
                  5
                ]
              ],
              "c": "mute",
              "dash": true
            },
            {
              "pts": [
                [
                  1.8,
                  0.6
                ],
                [
                  4.8,
                  3.6
                ]
              ],
              "c": "mute",
              "dash": true
            }
          ],
          "cap": "man → king and woman → queen are the same arrow, so king − man + woman ≈ queen. \"cat\" and \"dog\" sit close together."
        },
        "html": "\n<p>Instead of a huge one-hot vector, give each word a short <b>dense vector</b> of 50–300 real numbers, learned from data so that <b>words with similar meaning get similar vectors</b>.</p>\n<ul>\n  <li>Similarity is measured with <b>cosine similarity</b> (the angle between vectors).</li>\n  <li>Directions can carry meaning: <b>king − man + woman ≈ queen</b>.</li>\n</ul>\n<table class=\"t\">\n  <tr><th>Kind</th><th>Idea</th><th>Examples</th></tr>\n  <tr><td><b>Static</b></td><td>One vector per word, always the same</td><td>Word2Vec, GloVe, FastText</td></tr>\n  <tr><td><b>Contextual</b></td><td>The vector depends on the sentence</td><td>ELMo, BERT, GPT</td></tr>\n</table>\n<div class=\"callout\"><b>Why contextual matters:</b> \"I sat on the river <b>bank</b>\" vs \"I took a <b>bank</b> loan\". A static model gives \"bank\" one vector for both; a contextual model gives two different vectors.</div>",
        "lab": {
          "href": "w1/embeddings.html",
          "todo": [
            "Click the preset <b>king − man + woman</b> and see where the result lands on the map.",
            "Try <b>puppy − dog + cat</b>.",
            "At the bottom switch between the <b>river sentence</b> and the <b>finance sentence</b> and watch the contextual \"bank\" move."
          ]
        },
        "check": {
          "q": "Which model gives the word \"bank\" a different vector in different sentences?",
          "o": [
            "BERT (contextual)",
            "Word2Vec (static)",
            "GloVe (static)",
            "One-hot encoding"
          ],
          "why": "Contextual models (ELMo, BERT, GPT) build the vector from the sentence."
        }
      },
      {
        "t": "Match the architecture to the output",
        "key": "<b>Encoders read</b> (they understand), <b>decoders draft</b> (they generate), and <b>encoder-decoders transform</b> one text into another.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Encoder-only: BERT",
              "pts": [
                "understanding",
                "classification, NER, question answering"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Decoder-only: GPT",
              "pts": [
                "generation",
                "writing text, chat"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Encoder-decoder: T5, BART",
              "pts": [
                "text → text",
                "translation, summarisation"
              ],
              "c": "c3"
            }
          ]
        },
        "html": "\n<p>Modern models are built from Transformers (week 3 explains how). There are three families — know which job each does:</p>\n<table class=\"t\">\n  <tr><th>Family</th><th>Example</th><th>Good at</th></tr>\n  <tr><td><b>Encoder-only</b></td><td><b>BERT</b></td><td><b>Understanding</b>: classification, NER, question answering</td></tr>\n  <tr><td><b>Decoder-only</b></td><td><b>GPT</b></td><td><b>Generation</b>: writing text, chat</td></tr>\n  <tr><td><b>Encoder-decoder</b></td><td><b>T5, BART</b></td><td>Text → text: <b>translation, summarisation</b></td></tr>\n</table>\n<div class=\"callout\"><b>Memory hook:</b> the <b>E</b>ncoder r<b>e</b>ads (understands), the <b>D</b>ecoder <b>d</b>rafts (generates), both together <b>transform</b> one text into another.</div>",
        "check": {
          "q": "You need to translate English to Turkish. Which architecture is the classic fit?",
          "o": [
            "Encoder-decoder (T5/BART)",
            "Encoder-only (BERT)",
            "One-hot + Naive Bayes",
            "Decoder-only is the only option"
          ],
          "why": "Encoder-decoder models map one sequence to another: translation, summarisation."
        }
      },
      {
        "t": "Choose a model within practical limits",
        "key": "Choose a <b>model</b> using task quality, cost, latency, privacy and interpretability.",
        "fig": {
          "type": "boxes",
          "t": "Spam filter, 1 million emails a day (lecture example)",
          "head": [
            "",
            "LLM (GPT-4 API)",
            "Naive Bayes"
          ],
          "rows": [
            {
              "label": "Cost",
              "cells": [
                [
                  "≈ $30,000 / month",
                  "bad"
                ],
                [
                  "< $10 / month",
                  "ok"
                ]
              ]
            },
            {
              "label": "Latency",
              "cells": [
                [
                  "100–1000 ms",
                  "bad"
                ],
                [
                  "< 10 ms",
                  "ok"
                ]
              ]
            }
          ]
        },
        "html": "<p>The lecture compares a high-volume spam filter using an LLM with a small classical baseline. Check cost and latency alongside predictive quality.</p><p>Interpretability, privacy, customization and hallucination risk also affect the choice.</p><div class=\"callout warn\">The existing course notes reverse the two accuracy figures in different places. The original Week 1 deck is unavailable here, so the percentage comparison is left unresolved. Do not memorize those figures.</div><p>We now have representations and model families. Week 2 learns the decision rule that maps features to a document label.</p>",
        "check": {
          "q": "A cheap baseline meets the quality target. What should you compare before adopting an LLM?",
          "o": [
            "Quality, cost, latency and practical constraints",
            "Only parameter count",
            "Only the model release date"
          ],
          "why": "The lecture asks for a model suited to the task and its practical limits."
        }
      }
    ]
  },
  "2": {
    "goal": "compare how NB, logistic regression and SVM predict a document label.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Use representations to predict a document label",
        "key": "Week 1 supplies features; Week 2 learns a <b>classifier</b>.",
        "html": "<p>We can turn a review into counts or TF-IDF features. Now we need a rule that maps those numbers to a label such as positive or negative.</p><p>This week compares Naive Bayes, logistic regression and SVM. The representation and the decision rule are separate choices. Week 3 will ask which distinctions the features lose and how to evaluate a richer model fairly.</p>",
        "fig": {
          "type": "flow",
          "t": "The course path",
          "items": [
            [
              "",
              "W1: Represent",
              "Text → numbers",
              "c0"
            ],
            [
              "",
              "W2: Classify",
              "Numbers → document label",
              "c1"
            ],
            [
              "",
              "W3: Learn context",
              "Representations + honest evaluation",
              "c2"
            ],
            [
              "",
              "W4: Label words",
              "POS and entity spans",
              "c3"
            ],
            [
              "",
              "W6: Decode sequences",
              "Alignment, HMM and CRF",
              "c0"
            ]
          ]
        },
        "check": {
          "q": "What is the output for one review in document classification?",
          "o": [
            "One document label",
            "One label for every word",
            "A new review"
          ],
          "why": "Document classification assigns a predefined class to the text."
        }
      },
      {
        "t": "Assign one label to a document",
        "key": "Text classification means giving each document <b>one label from a fixed list</b>: f(text) → label.",
        "fig": {
          "type": "boxes",
          "head": [
            "Text",
            "Task",
            "Label"
          ],
          "rows": [
            {
              "cells": [
                [
                  "\"Win money now!!!\"",
                  ""
                ],
                [
                  "spam detection",
                  "mute"
                ],
                [
                  "spam",
                  "bad"
                ]
              ]
            },
            {
              "cells": [
                [
                  "\"Great, it broke again.\"",
                  ""
                ],
                [
                  "sentiment",
                  "mute"
                ],
                [
                  "negative (sarcasm!)",
                  "c4"
                ]
              ]
            },
            {
              "cells": [
                [
                  "\"Galatasaray won 3–1\"",
                  ""
                ],
                [
                  "topic",
                  "mute"
                ],
                [
                  "sports",
                  "c1"
                ]
              ]
            }
          ]
        },
        "html": "\n<p><b>Text classification</b> = assigning a predefined <b>label</b> to a document: <code>f(text) → label</code>.</p>\n<ul>\n  <li><b>Binary</b>: two labels (spam vs ham).</li>\n  <li><b>Multi-class</b>: several labels (sports, politics, tech…).</li>\n</ul>\n<table class=\"t\">\n  <tr><th>Task</th><th>Labels</th><th>Why it's hard</th></tr>\n  <tr><td><b>Sentiment analysis</b></td><td>positive / neutral / negative</td><td>Sarcasm (\"Great, it broke again\"), context</td></tr>\n  <tr><td><b>Spam detection</b></td><td>spam / ham</td><td>Spammers adapt</td></tr>\n  <tr><td><b>Topic classification</b></td><td>sports, politics, …</td><td>Topics overlap</td></tr>\n</table>\n<p>Others: intent detection, content moderation, authorship, medical, legal, emotion.</p>",
        "check": {
          "q": "Sorting customer messages into \"billing\", \"technical\", \"cancel\" or \"other\" is…",
          "o": [
            "multi-class classification",
            "binary classification",
            "tokenization",
            "regression"
          ],
          "why": "More than two predefined labels → multi-class."
        }
      },
      {
        "t": "Keep features separate from the decision rule",
        "key": "Every project follows the same loop: <b>data → features → model → prediction → evaluation</b>, then improve and go round again.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Data",
              "labelled examples",
              "c3"
            ],
            [
              "",
              "Features",
              "BoW, TF-IDF",
              "c0"
            ],
            [
              "",
              "Model",
              "NB, LR, SVM",
              "c1"
            ],
            [
              "",
              "Prediction",
              "new text → label",
              "c2"
            ],
            [
              "",
              "Evaluation",
              "how good? then improve ↺",
              "c4"
            ]
          ]
        },
        "html": "\n<p style=\"text-align:center\"><b>1 Data → 2 Features → 3 Model → 4 Prediction → 5 Evaluation</b> → back to data</p>\n<ol>\n  <li><b>Data</b> — labelled examples (\"Win money now\" = spam).</li>\n  <li><b>Features</b> — turn text into numbers (week 1: BoW, TF-IDF…).</li>\n  <li><b>Model</b> — learns patterns from the features.</li>\n  <li><b>Prediction</b> — new text → label.</li>\n  <li><b>Evaluation</b> — how good is it? Then improve the data or features.</li>\n</ol>\n<h3>Why start with classical methods?</h3>\n<p>They are <b>fast to train, easy to interpret, work with small data, cheap</b>, and give a <b>strong baseline</b> to compare fancier models against.</p>\n<div class=\"callout\"><b>Project 1 plan:</b> start with Naive Bayes as the baseline → try logistic regression → if time permits, SVM.</div>",
        "check": {
          "q": "What turns a raw review into numeric classifier input?",
          "o": [
            "Feature extraction",
            "The predicted label",
            "The final accuracy score"
          ],
          "why": "The feature representation is built before the model predicts a class."
        }
      },
      {
        "t": "Count evidence for each class",
        "key": "For each class, multiply <b>how common the class is</b> by <b>how likely each word is in that class</b>. The bigger product wins. Add-one smoothing stops a single unseen word from making it 0.",
        "fig": {
          "type": "flow",
          "t": "Classifying \"Win free tickets\"",
          "items": [
            [
              "",
              "Count words per class",
              "in the training emails",
              "c0"
            ],
            [
              "",
              "Prior P(class)",
              "spam 2/4, ham 2/4",
              "c3"
            ],
            [
              "",
              "Multiply P(word | class)",
              "with +1 smoothing",
              "c2"
            ],
            [
              "",
              "Compare",
              "spam score > ham score → spam",
              "c1"
            ]
          ],
          "cap": "Without smoothing, \"win\" never appears in ham, so P(win | ham) = 0 and the whole ham product becomes 0."
        },
        "html": "<p>Naive Bayes counts labeled documents for class priors and word occurrences for likelihoods. For a new review, multiply the prior by each token likelihood and choose the larger score.</p><p>In the study corpus, positive counts [good,bad,movie] are [3,0,2]. Add-one smoothing gives P(good|+)=(3+1)/(5+3)=1/2. It adds one count to every vocabulary term.</p><p>The naive assumption is conditional independence given the class. Logs turn products into sums without changing the winner.</p><div class=\"callout warn\">A joint class score becomes a posterior only after normalization across classes.</div>",
        "lab": {
          "href": "w2/naive-bayes.html",
          "todo": [
            "Choose the <b>W2 spam slide</b> training data and the text \"Win free tickets\". Read the prediction and the learned likelihoods.",
            "Switch smoothing to <b>none, α = 0</b>: watch a single zero make a score 0.",
            "Switch back to add-one and check which class wins and why."
          ]
        },
        "check": {
          "q": "Why do we use Laplace (add-one) smoothing in Naive Bayes?",
          "o": [
            "So a word never seen in a class doesn't make the whole product zero",
            "To make training slower but more accurate",
            "To remove stop words",
            "To turn it into an SVM"
          ],
          "why": "Without smoothing an unseen word gives P = 0, and the product becomes 0."
        }
      },
      {
        "t": "Turn a weighted sum into a probability",
        "key": "Give every word a <b>weight</b>, add them up into a score z, and squash z into a probability with the <b>sigmoid</b>. Predict positive if p ≥ 0.5.",
        "fig": {
          "type": "plot",
          "t": "The sigmoid σ(z) = 1 / (1 + e^−z)",
          "w": 560,
          "h": 280,
          "x": [
            -6,
            6
          ],
          "y": [
            0,
            1
          ],
          "xl": "score z = w·x + b",
          "yl": "P(positive)",
          "lines": [
            {
              "pts": [
                [
                  -6,
                  0.0025
                ],
                [
                  -4,
                  0.018
                ],
                [
                  -3,
                  0.047
                ],
                [
                  -2,
                  0.119
                ],
                [
                  -1,
                  0.269
                ],
                [
                  0,
                  0.5
                ],
                [
                  1,
                  0.731
                ],
                [
                  2,
                  0.881
                ],
                [
                  3,
                  0.953
                ],
                [
                  4,
                  0.982
                ],
                [
                  6,
                  0.9975
                ]
              ],
              "c": "c0"
            },
            {
              "pts": [
                [
                  -6,
                  0.5
                ],
                [
                  6,
                  0.5
                ]
              ],
              "c": "mute",
              "dash": true
            }
          ],
          "pts": [
            [
              2,
              0.881,
              "c1",
              "\"good movie\": z = 2 → 0.88"
            ],
            [
              0,
              0.5,
              "warn",
              "z = 0 → 0.5"
            ]
          ]
        },
        "html": "<p>Logistic regression learns weights and a bias. With x=[good,bad]=[2,0], w=[0.8,−1] and b=−0.4, the score is z=1.2.</p><p>The sigmoid σ(z)=1/(1+exp(−z)) converts that score to P(positive|x), about 0.769 here. At threshold 0.5, predict positive. A zero feature vector still leaves the bias.</p><p>Training reduces cross-entropy loss. Unlike NB's word likelihoods, this model directly estimates a conditional class probability.</p>",
        "lab": {
          "href": "w2/logreg.html",
          "todo": [
            "In section 1 drag the weights and bias; follow z → σ(z) on the curve. Check that at z = 0, p = 0.5.",
            "In section 2 set a true label and click <b>Take one gradient step</b> a few times. Watch p move towards the label.",
            "In section 3 see \"not good\" fool the unigram model, then fix it with the bigram weight."
          ]
        },
        "check": {
          "q": "A logistic regression gives z = 0 for a review. What is P(positive)?",
          "o": [
            "0.5",
            "0",
            "1",
            "It cannot be computed"
          ],
          "why": "σ(0) = 1/(1+e⁰) = 1/2."
        }
      },
      {
        "t": "Choose a boundary with a wide margin",
        "key": "Many lines separate the classes. The SVM picks the one with the <b>widest street</b> (maximum margin). Only the points on the edge of the street, the <b>support vectors</b>, decide it.",
        "fig": {
          "type": "plot",
          "w": 520,
          "h": 320,
          "x": [
            0,
            6
          ],
          "y": [
            0,
            6
          ],
          "pts": [
            [
              2,
              3,
              "c1",
              "support vector"
            ],
            [
              3.5,
              4.5,
              "c1"
            ],
            [
              1,
              3.6,
              "c1"
            ],
            [
              1.6,
              5,
              "c1"
            ],
            [
              2.6,
              5.2,
              "c1"
            ],
            [
              3,
              2,
              "c4",
              "support vector"
            ],
            [
              4.5,
              3.5,
              "c4"
            ],
            [
              4,
              1.4,
              "c4"
            ],
            [
              5.2,
              2.6,
              "c4"
            ],
            [
              3.6,
              0.8,
              "c4"
            ]
          ],
          "lines": [
            {
              "pts": [
                [
                  0,
                  0
                ],
                [
                  6,
                  6
                ]
              ],
              "c": "c0",
              "label": "decision line"
            },
            {
              "pts": [
                [
                  0,
                  1
                ],
                [
                  5,
                  6
                ]
              ],
              "c": "mute",
              "dash": true
            },
            {
              "pts": [
                [
                  1,
                  0
                ],
                [
                  6,
                  5
                ]
              ],
              "c": "mute",
              "dash": true
            }
          ],
          "cap": "Green = positive reviews, coral = negative. The dashed lines are the edges of the street."
        },
        "html": "\n<p>Imagine positive reviews as green dots and negative as red dots. Many lines can separate them. The <b>Support Vector Machine</b> picks the one with the <b>maximum margin</b> — the widest \"street\" between the two classes.</p>\n<ul>\n  <li>The points touching the edges of the street are the <b>support vectors</b>; only they decide the boundary.</li>\n  <li><b>C</b> controls the trade-off with outliers: large C = few mistakes allowed (narrow street), small C = wider street, some points may be inside it.</li>\n  <li><b>Kernel trick</b> (linear, RBF, polynomial) — handle data that a straight line can't separate.</li>\n</ul>\n<p>Pros: works well in <b>high dimensions</b> (text has thousands of features). Cons: slow on very large data, sensitive to feature scaling, and its scores are <b>not probabilities</b>.</p>",
        "lab": {
          "href": "w2/svm.html",
          "todo": [
            "Load the slide points, then rotate and slide the boundary yourself. Try to make the street as wide as possible.",
            "Click <b>Find maximum margin</b> and compare with your attempt.",
            "Add an outlier, then fit the soft margin with a small and a large C. Watch the street change."
          ]
        },
        "check": {
          "q": "What does a linear SVM choose?",
          "o": [
            "The boundary with the largest margin between the classes",
            "The boundary through the mean of all points",
            "The boundary that maximises the number of support vectors",
            "A probability for each class"
          ],
          "why": "SVM = maximum-margin hyperplane."
        }
      },
      {
        "t": "Expose useful distinctions as features",
        "key": "The model only sees the numbers you give it. <b>Better features</b> (n-grams, TF-IDF, handling negation…) often help more than a fancier model.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Words",
              "pts": [
                "bag of words",
                "n-grams: \"not good\" as one feature"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Weights",
              "pts": [
                "TF-IDF instead of raw counts"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Extra signals",
              "pts": [
                "text length",
                "number of \"!\"",
                "ALL CAPS words"
              ],
              "c": "c2"
            }
          ]
        },
        "html": "\n<p><i>\"Good features = good performance.\"</i> A classical model only sees the numbers you give it. Four families:</p>\n<table class=\"t\">\n  <tr><th>Family</th><th>Examples</th></tr>\n  <tr><td><b>Statistical</b></td><td>Length, number of \"!\", ratio of CAPITAL letters</td></tr>\n  <tr><td><b>Lexical</b></td><td>BoW, TF-IDF, n-grams, character n-grams</td></tr>\n  <tr><td><b>Linguistic</b></td><td>POS tags, sentiment lexicons, named entities</td></tr>\n  <tr><td><b>Domain-specific</b></td><td>Spam words (\"FREE\", \"WIN\"), emoticons, URLs</td></tr>\n</table>\n<div class=\"callout\"><b>Pro tip:</b> combining feature types usually works best. \"WON $1000000!!!\" is caught by statistical features (!!!, caps) <i>and</i> lexical ones (\"won\").</div><p>The classifier needs useful features. Week 3 asks how to learn richer context and compare models on held-out data.</p>",
        "check": {
          "q": "The ratio of capital letters in a message is which kind of feature?",
          "o": [
            "Statistical",
            "Lexical",
            "Linguistic",
            "Domain-specific"
          ],
          "why": "Length, punctuation and caps ratio are statistical features."
        }
      }
    ]
  },
  "3": {
    "goal": "explain learned context and evaluate predictions without leakage.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Learn context, then test on unseen records",
        "key": "Week 2 gave us decision rules; Week 3 changes the <b>representation</b> and checks <b>generalization</b>.",
        "html": "<p>The toy reviews use good, bad and movie. Counts can separate obvious sentiment words, but unigrams lose order: “not good” and “good not” have the same counts.</p><p>Embeddings, CNNs, recurrent models and attention combine evidence differently. Compare them using the same held-out task. Fit the vocabulary and IDF on training records only; validation chooses settings, and test evaluates the frozen choice.</p><div class=\"callout warn\">Fitting IDF on test records leaks information even without reading their labels.</div>",
        "fig": {
          "type": "flow",
          "t": "The course path",
          "items": [
            [
              "",
              "W1: Represent",
              "Text → numbers",
              "c0"
            ],
            [
              "",
              "W2: Classify",
              "Numbers → document label",
              "c1"
            ],
            [
              "",
              "W3: Learn context",
              "Representations + honest evaluation",
              "c2"
            ],
            [
              "",
              "W4: Label words",
              "POS and entity spans",
              "c3"
            ],
            [
              "",
              "W6: Decode sequences",
              "Alignment, HMM and CRF",
              "c0"
            ]
          ]
        },
        "check": {
          "q": "Where should the vectorizer learn its vocabulary and IDF?",
          "o": [
            "Training records only",
            "All records before splitting",
            "Test records only"
          ],
          "why": "Validation and test must reuse the representation learned from training."
        }
      },
      {
        "t": "Predict nearby words to learn vectors",
        "key": "\"You shall know a word by the company it keeps.\" Word2Vec learns a word's vector by <b>predicting its neighbours</b>.",
        "fig": {
          "type": "boxes",
          "t": "Skip-gram, window = 2: centre word \"brown\"",
          "rows": [
            {
              "cells": [
                [
                  "the",
                  "c1",
                  "context"
                ],
                [
                  "quick",
                  "c1",
                  "context"
                ],
                [
                  "brown",
                  "c2",
                  "centre"
                ],
                [
                  "fox",
                  "c1",
                  "context"
                ],
                [
                  "jumps",
                  "c1",
                  "context"
                ],
                [
                  "over",
                  ""
                ]
              ]
            }
          ],
          "cap": "Training pairs: (brown, the), (brown, quick), (brown, fox), (brown, jumps)."
        },
        "html": "<p>Word2Vec learns from neighboring words. CBOW predicts a center word from context; skip-gram predicts context from a center word. In “I love this movie”, radius 1 gives love and movie around this.</p><p>GloVe uses global co-occurrence counts. FastText represents words through character n-grams, which helps rare or unseen forms.</p><div class=\"callout warn\">These are static word representations: one word type gets one vector, even when its meaning changes.</div>",
        "check": {
          "q": "Which method predicts the center word from its context?",
          "o": [
            "CBOW",
            "Skip-gram",
            "GloVe",
            "FastText"
          ],
          "why": "CBOW: context → center. Skip-gram: center → context."
        }
      },
      {
        "t": "Slide a filter across local phrases",
        "key": "A CNN slides a small <b>filter</b> over every 2–3-word window, scores each window, then keeps the <b>maximum</b> (max-pooling). It finds key phrases wherever they are.",
        "fig": {
          "type": "boxes",
          "t": "One filter that detects \"not good\"-like phrases",
          "rows": [
            {
              "label": "tokens",
              "cells": [
                [
                  "this",
                  ""
                ],
                [
                  "movie",
                  ""
                ],
                [
                  "is",
                  ""
                ],
                [
                  "not",
                  "c4"
                ],
                [
                  "good",
                  "c4"
                ],
                [
                  "at",
                  ""
                ],
                [
                  "all",
                  ""
                ]
              ]
            },
            {
              "label": "3-word windows",
              "cells": [
                [
                  "0.1",
                  "mute"
                ],
                [
                  "0.0",
                  "mute"
                ],
                [
                  "0.7",
                  "c2"
                ],
                [
                  "0.9",
                  "c4"
                ],
                [
                  "0.3",
                  "mute"
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ]
              ]
            },
            {
              "label": "max-pool",
              "cells": [
                [
                  "0.9 → one number for this filter",
                  "c4"
                ]
              ]
            }
          ],
          "cap": "Window scores are made-up numbers to show the idea. Many filters give many such numbers, which go into a classifier."
        },
        "html": "\n<p>A text CNN slides a small <b>filter</b> over windows of word vectors, like reading 2–3 words at a time:</p>\n<ol>\n  <li>For each window: multiply by the filter weights, sum, add bias, apply <b>ReLU</b> (negative → 0). One number per window position.</li>\n  <li>The <b>same filter</b> is reused at every position (<b>weight sharing</b>), so it detects a pattern like \"not good\" wherever it appears.</li>\n  <li><b>Pooling</b> (max or mean) squeezes all positions into <b>one number per filter</b>. Max-pooling asks \"did this pattern appear anywhere?\" — and forgets <i>where</i>.</li>\n</ol>\n<p>Shapes: a batch of 2 sentences, 7 tokens, 8-dim embeddings → <code>[2, 7, 8]</code>; with 4 filters and pooling → <code>[2, 4]</code>.</p>",
        "check": {
          "q": "What does max-pooling over positions do in a text CNN?",
          "o": [
            "Keeps the strongest response of each filter and discards its position",
            "Keeps only the first word",
            "Converts the output into probabilities",
            "Adds more tokens"
          ],
          "why": "Pooling removes the position axis: one number per filter."
        }
      },
      {
        "t": "Carry memory through the token sequence",
        "key": "An RNN reads <b>one word at a time</b> and carries a memory h forward. Plain RNNs forget early words (<b>vanishing gradient</b>); LSTM <b>gates</b> decide what to keep.",
        "fig": {
          "type": "anim",
          "name": "rnn",
          "t": "An RNN reading “the movie rocks”",
          "cap": "The memory dots are illustrative. Gradient over 20 steps: 0.5²⁰ ≈ 0.000001 (vanishes), 1.5²⁰ ≈ 3325 (explodes)."
        },
        "html": "<p>An RNN carries a hidden state forward as it reads tokens. The current state depends on both the new input and the previous state. This preserves order.</p><p>Repeated gradient multiplication can vanish or explode across long sequences. LSTM adds a cell with retain and write gates: c_new=f·c_old+i·g.</p><p>With c_old=0.50, f=0.8, i=0.25 and g=−0.40, c_new=0.40−0.10=0.30. Gates control information flow rather than giving words fixed sentiment labels.</p>",
        "lab": {
          "href": "w3/rnn.html",
          "todo": [
            "Section 1: run the state through the text, then tick <b>Reverse the input</b> — the final state changes, so order matters.",
            "Section 2: compare 0.5²⁰, 1.5²⁰ and 1²⁰.",
            "Section 3: load the slide-21 values and open/close the forget and input gates.",
            "Sections 4–5: check the BiLSTM width and watch the padding mask."
          ]
        },
        "check": {
          "q": "A BiLSTM has 128 hidden units per direction. How many features per token does it output?",
          "o": [
            "256",
            "128",
            "64",
            "512"
          ],
          "why": "The two directions are concatenated: 128 + 128."
        }
      },
      {
        "t": "Mix values using normalized weights",
        "key": "With attention, each word <b>looks at all the other words</b> and decides how much each one matters to it. The weights in a row add up to 1.",
        "fig": {
          "type": "anim",
          "name": "attention",
          "t": "Where does “it” look? “The animal didn't cross the street because it was tired”",
          "cap": "Illustrative weights (they add up to 1)."
        },
        "html": "<p>Attention lets a position mix information from other positions. Queries and keys produce scores; divide by √d_k and apply softmax to obtain weights. Values provide the content being mixed.</p><p>For scores [0, ln 2, 0], exponentiation gives [1,2,1], so weights are [1/4,1/2,1/4]. Multiplying and summing values forms the output.</p><div class=\"callout warn\">Mask padding before softmax. A masked position gets zero weight; the remaining weights must still sum to one.</div>",
        "lab": {
          "href": "w3/attention.html",
          "todo": [
            "Section 1: load the <b>Slide 25</b> preset and check the weights [.25, .50, .25] — each row sums to 1.",
            "Switch the mask between bidirectional, causal and \"token 3 is PAD\" and see which weights become 0.",
            "Section 2: change dₖ and watch why we divide by √dₖ."
          ]
        },
        "check": {
          "q": "In attention, what do the softmax weights in one row add up to?",
          "o": [
            "1",
            "0",
            "dₖ",
            "The number of tokens"
          ],
          "why": "Softmax normalises each row into weights that sum to 1."
        }
      },
      {
        "t": "Give each word a vector for its context",
        "key": "BERT is a stack of attention layers. It is <b>pretrained</b> by guessing hidden words, then <b>fine-tuned</b> with a small head on the <code>[CLS]</code> output for your task.",
        "fig": {
          "type": "boxes",
          "t": "BERT input: each vector = token + segment + position embedding",
          "rows": [
            {
              "label": "token",
              "cells": [
                [
                  "[CLS]",
                  "c2"
                ],
                [
                  "the",
                  "c0"
                ],
                [
                  "film",
                  "c0"
                ],
                [
                  "was",
                  "c0"
                ],
                [
                  "great",
                  "c0"
                ],
                [
                  "[SEP]",
                  "c2"
                ]
              ]
            },
            {
              "label": "+ segment",
              "cells": [
                [
                  "A",
                  "c3"
                ],
                [
                  "A",
                  "c3"
                ],
                [
                  "A",
                  "c3"
                ],
                [
                  "A",
                  "c3"
                ],
                [
                  "A",
                  "c3"
                ],
                [
                  "A",
                  "c3"
                ]
              ]
            },
            {
              "label": "+ position",
              "cells": [
                [
                  "0",
                  "c5"
                ],
                [
                  "1",
                  "c5"
                ],
                [
                  "2",
                  "c5"
                ],
                [
                  "3",
                  "c5"
                ],
                [
                  "4",
                  "c5"
                ],
                [
                  "5",
                  "c5"
                ]
              ]
            }
          ]
        },
        "html": "\n<p>A <b>Transformer</b> stacks attention layers (plus small feed-forward layers). No recurrence, so it processes all tokens in parallel.</p>\n<h3>BERT's input</h3>\n<p><code>[CLS] the film was great [SEP]</code> — each token's vector = <b>token embedding + segment embedding + position embedding</b>. The position embedding is needed because attention itself has no sense of order.</p>\n<h3>Life of a BERT classifier</h3>\n<ol>\n  <li><b>Pretraining</b> on huge unlabelled text with the <b>masked language model</b>: \"The film was [MASK]\" → predict the hidden word. Learns language in general.</li>\n  <li><b>Fine-tuning</b> on your labelled data: put a small <b>classification head</b> on the [CLS] output and train for your task (e.g. sentiment).</li>\n</ol>\n<div class=\"callout warn\"><b>Truncation:</b> BERT has a maximum length (e.g. 512 tokens). Long reviews get cut — and if the decisive sentence (\"…but the ending ruined it\") is at the end, it's lost.</div>",
        "check": {
          "q": "How is BERT pretrained?",
          "o": [
            "By predicting masked words in unlabelled text",
            "By classifying sentiment from the start",
            "By generating text left to right only",
            "By counting word co-occurrences"
          ],
          "why": "Masked language modelling, then fine-tuning a classification head."
        }
      },
      {
        "t": "Evaluate errors for the target class",
        "key": "<b>Precision</b>: of everything I flagged, how much was right? <b>Recall</b>: of everything that was really there, how much did I find? <b>F1</b> balances the two.",
        "fig": {
          "type": "boxes",
          "t": "Slide 33 confusion matrix (100 examples)",
          "head": [
            "",
            "predicted positive",
            "predicted negative"
          ],
          "rows": [
            {
              "label": "actually positive",
              "cells": [
                [
                  "TP = 30",
                  "ok"
                ],
                [
                  "FN = 10",
                  "bad"
                ]
              ]
            },
            {
              "label": "actually negative",
              "cells": [
                [
                  "FP = 5",
                  "bad"
                ],
                [
                  "TN = 55",
                  "ok"
                ]
              ]
            }
          ]
        },
        "html": "<p>For a chosen target class, TP is a correct detection, FP a false alarm and FN a missed target. Precision=TP/(TP+FP); recall=TP/(TP+FN).</p><p>F1=2TP/(2TP+FP+FN). With TP=30, FP=5, FN=10, precision=6/7, recall=3/4 and F1=4/5.</p><p>Macro-F1 averages class F1 values equally. Accuracy can conceal poor minority-class performance.</p><p>This completes the document-classification path: choose features, learn a rule, inspect held-out errors. Week 4 changes the unit of prediction to words.</p>",
        "lab": {
          "href": "w3/metrics.html",
          "todo": [
            "Click <b>Slide 33 example</b> and check the four numbers above.",
            "Click <b>\"Always negative\" baseline</b>: high accuracy possible, but recall = 0.",
            "In section 2 move the threshold: raising it usually raises precision and lowers recall."
          ]
        },
        "check": {
          "q": "TP = 40, FP = 10, FN = 40. What is the precision?",
          "o": [
            "0.8",
            "0.5",
            "0.4",
            "0.2"
          ],
          "why": "Precision = TP/(TP+FP) = 40/50 = 0.8. (Recall would be 40/80 = 0.5.)"
        }
      }
    ]
  },
  "4": {
    "goal": "label grammatical roles and named spans using a consistent scheme.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Change the output from a review to its words",
        "key": "Week 3 predicts document labels; Week 4 introduces <b>sequence labeling</b>.",
        "html": "<p>A sentiment classifier produces one label for a review. A POS tagger produces a grammatical label for every word. NER also uses token labels, but the result describes named spans and their types.</p><p>“Book that flight” and “Hand me that book” show why a word needs context. This week defines the output scheme; Week 6 will align it with subwords and decode complete sequences.</p>",
        "fig": {
          "type": "flow",
          "t": "The course path",
          "items": [
            [
              "",
              "W1: Represent",
              "Text → numbers",
              "c0"
            ],
            [
              "",
              "W2: Classify",
              "Numbers → document label",
              "c1"
            ],
            [
              "",
              "W3: Learn context",
              "Representations + honest evaluation",
              "c2"
            ],
            [
              "",
              "W4: Label words",
              "POS and entity spans",
              "c3"
            ],
            [
              "",
              "W6: Decode sequences",
              "Alignment, HMM and CRF",
              "c0"
            ]
          ]
        },
        "check": {
          "q": "What must a word-level POS output align with?",
          "o": [
            "The input words in their original order",
            "Only the nouns",
            "One vector for the whole review"
          ],
          "why": "Each input word receives a grammatical tag."
        }
      },
      {
        "t": "Assign one tag to every word",
        "key": "In sequence labeling, the model gives <b>every token its own label</b>, not just one label for the whole text. POS tagging and NER are both like this.",
        "fig": {
          "type": "boxes",
          "t": "POS tagging",
          "rows": [
            {
              "label": "word",
              "cells": [
                [
                  "Janet",
                  ""
                ],
                [
                  "will",
                  ""
                ],
                [
                  "back",
                  ""
                ],
                [
                  "the",
                  ""
                ],
                [
                  "bill",
                  ""
                ]
              ]
            },
            {
              "label": "tag",
              "cells": [
                [
                  "PROPN",
                  "c3"
                ],
                [
                  "AUX",
                  "c5"
                ],
                [
                  "VERB",
                  "c1"
                ],
                [
                  "DET",
                  "c2"
                ],
                [
                  "NOUN",
                  "c0"
                ]
              ]
            }
          ]
        },
        "html": "\n<p>So far: one label per <b>document</b>. Now: one label per <b>token</b>. This is <b>sequence labeling</b>.</p>\n<p><b>POS tagging</b> maps words x₁…xₙ to tags y₁…yₙ — <b>exactly one tag per word</b>.</p>\n<p>It's a <b>disambiguation</b> task — the same word can have different tags:</p>\n<ul>\n  <li>\"<b>Book</b> that flight\" → book = <b>VERB</b></li>\n  <li>\"Hand me that <b>book</b>\" → book = <b>NOUN</b></li>\n</ul>\n<p>Uses: parsing, named entity recognition, speech synthesis (how to pronounce \"record\"), information extraction.</p>",
        "check": {
          "q": "Why can book receive different POS tags in different sentences?",
          "o": [
            "Its grammatical role depends on context",
            "The tagger randomly changes its vocabulary",
            "Every word must always be a noun"
          ],
          "why": "Book that flight uses book as a verb; that book uses it as a noun."
        }
      },
      {
        "t": "Distinguish classes that gain new words",
        "key": "Ask: <b>can someone invent a new word of this type tomorrow?</b> Yes, so it is an <b>open</b> class (nouns, verbs). No, so it is a <b>closed</b> class (the, in, and).",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Open class: content words",
              "pts": [
                "NOUN, VERB, ADJ, ADV, PROPN, INTJ",
                "new ones appear: \"selfie\", \"to google\""
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Closed class: function words",
              "pts": [
                "DET, PRON, ADP, CCONJ, SCONJ, AUX, PART",
                "small fixed set: the, she, in, and, is, not"
              ],
              "c": "c4"
            }
          ],
          "cap": "Other: NUM, PUNCT, SYM, X. 17 UD tags in total."
        },
        "html": "\n<table class=\"t\">\n  <tr><th>Class</th><th>Meaning</th><th>Universal Dependencies tags</th></tr>\n  <tr><td><b>Open class</b> (content words)</td><td>New words are added all the time (\"iPhone\", \"to google\")</td><td>NOUN, VERB, ADJ, ADV, PROPN, INTJ</td></tr>\n  <tr><td><b>Closed class</b> (function words)</td><td>Fixed, small set; rarely changes</td><td>DET (the, a), PRON (she), ADP (in, on), CCONJ/SCONJ (and, because), AUX (is, will), PART (not, to)</td></tr>\n  <tr><td>Other</td><td></td><td>NUM, PUNCT, SYM, X</td></tr>\n</table>\n<p>UD has <b>17</b> tags in total.</p>\n<div class=\"callout\"><b>Test:</b> can you invent a new word of this type tomorrow? A new noun — yes (\"a selfie\"). A new preposition — no. So nouns are open, prepositions closed.</div>",
        "check": {
          "q": "Which is a closed-class category?",
          "o": [
            "Determiners (the, a, this)",
            "Nouns",
            "Verbs",
            "Adjectives"
          ],
          "why": "Function words (DET, PRON, ADP, CONJ, AUX, PART) form closed classes."
        }
      },
      {
        "t": "Use context to resolve a word’s role",
        "key": "Most words have one tag, but the <b>common</b> words are ambiguous. Just picking each word's most frequent tag already gives <b>~92%</b>.",
        "fig": {
          "type": "boxes",
          "t": "One word, five tags: \"back\"",
          "rows": [
            {
              "cells": [
                [
                  "the back door",
                  "c2",
                  "ADJ"
                ],
                [
                  "on my back",
                  "c0",
                  "NOUN"
                ],
                [
                  "back the bill",
                  "c1",
                  "VERB"
                ],
                [
                  "call back",
                  "c3",
                  "PART"
                ],
                [
                  "came back",
                  "c5",
                  "ADV"
                ]
              ]
            }
          ]
        },
        "html": "\n<ul>\n  <li>Only <b>~15% of word types</b> (dictionary entries) are ambiguous…</li>\n  <li>…but they are the common words, so <b>~60% of word tokens</b> in running text are ambiguous.</li>\n  <li>\"back\" alone can be ADJ (\"the back door\"), NOUN (\"on my back\"), VERB (\"back the bill\"), PART (\"call back\"), ADV (\"came back\").</li>\n</ul>\n<h3>The baseline</h3>\n<p>The simplest tagger: give every word its <b>most frequent tag</b> from training data (unknown words → NOUN). It already gets <b>~92%</b>. Good taggers (HMM, CRF, BERT) and humans get <b>~97%</b>.</p>\n<h3>Three sources of information</h3>\n<ol>\n  <li><b>The word itself</b> (prior): \"will\" is usually AUX.</li>\n  <li><b>Neighbouring words</b>: after \"the\", the next word is probably not a verb.</li>\n  <li><b>Morphology / word shape</b>: un- → ADJ, -ly → ADV, Capitalised → PROPN.</li>\n</ol>",
        "lab": {
          "href": "w4/pos.html",
          "todo": [
            "Section 1: tag the sentence yourself with the 17 UD tags, then click <b>Check</b>.",
            "Section 2: work through the five faces of \"back\".",
            "Section 3: race the most-frequent-tag baseline, then tick the neighbour-word rules and watch the score rise."
          ]
        },
        "check": {
          "q": "The most-frequent-tag baseline reaches about…",
          "o": [
            "92%",
            "50%",
            "75%",
            "99.9%"
          ],
          "why": "Baseline ≈ 92%; state of the art and humans ≈ 97%."
        }
      },
      {
        "t": "Find the whole name and its type",
        "key": "NER finds <b>names of things</b> in text and says what type they are: person, organisation, location, geo-political entity…",
        "fig": {
          "type": "boxes",
          "rows": [
            {
              "cells": [
                [
                  "Jane Villanueva",
                  "c3",
                  "PER"
                ],
                [
                  "of",
                  ""
                ],
                [
                  "United",
                  "c0",
                  "ORG"
                ],
                [
                  ", a unit of",
                  ""
                ],
                [
                  "United Airlines Holding",
                  "c0",
                  "ORG"
                ],
                [
                  ", said the fare applies to the",
                  ""
                ],
                [
                  "Chicago",
                  "c1",
                  "LOC"
                ],
                [
                  "route.",
                  ""
                ]
              ]
            }
          ],
          "cap": "Hard parts: where a name starts and ends, and the type (\"Washington\" can be a person, a city or a state)."
        },
        "html": "\n<p><b>NER</b> finds <b>spans</b> of text that are proper names and labels their type:</p>\n<table class=\"t\">\n  <tr><th>Type</th><th>Meaning</th><th>Example</th></tr>\n  <tr><td><b>PER</b></td><td>Person</td><td>Jane Villanueva</td></tr>\n  <tr><td><b>ORG</b></td><td>Organisation</td><td>United Airlines</td></tr>\n  <tr><td><b>LOC</b></td><td>Location (geographic)</td><td>Mount Everest</td></tr>\n  <tr><td><b>GPE</b></td><td>Geo-political entity (country, city)</td><td>Chicago, Turkey</td></tr>\n</table>\n<p>Often extended with dates, times, money.</p>\n<p><b>Why is NER harder than POS?</b></p>\n<ul>\n  <li><b>Segmentation</b>: where does the entity start and end? (\"United Airlines Holding\" = one entity of 3 words.)</li>\n  <li><b>Type ambiguity</b>: \"Washington\" can be a person, a sports team, a location or a GPE.</li>\n</ul>",
        "check": {
          "q": "In \"Washington won the game last night\", Washington is most likely…",
          "o": [
            "an organisation (a team)",
            "a person",
            "a location",
            "a GPE"
          ],
          "why": "Context decides the type — a team that wins a game is an ORG."
        }
      },
      {
        "t": "Mark each entity boundary explicitly",
        "key": "<b>B</b> = begins an entity, <b>I</b> = inside it, <b>O</b> = outside. With n entity types, BIO needs <b>2n + 1</b> tags.",
        "fig": {
          "type": "anim",
          "name": "bio",
          "t": "From spans to BIO tags",
          "cap": "Invalid: O followed by I-PER, or B-PER followed by I-ORG."
        },
        "html": "<p>NER needs both entity boundaries and entity types. BIO turns spans into token labels: B begins a span, I continues it and O means outside.</p><p>“Jane Villanueva of United” becomes B-PER I-PER O B-ORG. With n entity types, there are 2n+1 labels.</p><div class=\"callout warn\">In strict IOB2, I-PER cannot follow O or a different entity type. Start a new mention with B, including a single-word mention.</div><p>We now have the output scheme. Week 6 uses alignment and sequence decoding to produce and evaluate those labels.</p>",
        "lab": {
          "href": "w4/bio.html",
          "todo": [
            "Section 1: mark the entities in the slide sentence (first word, last word, type) and click <b>Check against the slide</b>.",
            "Section 2: change n and check 2n + 1, n + 1 and 4n + 1.",
            "Section 3: click the presets (valid, I after O, type switch…) and see which transitions are illegal."
          ]
        },
        "check": {
          "q": "With 3 entity types, how many BIO tags are there?",
          "o": [
            "7",
            "4",
            "6",
            "13"
          ],
          "why": "2n + 1 = 2·3 + 1 = 7."
        }
      }
    ]
  },
  "6": {
    "goal": "align labels, decode sequences and evaluate exact entity spans.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Keep word labels aligned and choose a complete path",
        "key": "Week 4 defined POS and BIO labels; Week 6 adds <b>alignment</b>, <b>decoding</b> and span evaluation.",
        "html": "<p>We already know what the labels mean. Now ask how training labels reach subword positions, how predictions return to words and spans, and how neighboring labels affect a decision.</p><p>HMMs score words and hidden tag paths jointly. CRFs score complete label sequences given the observed input. A contextual encoder supplies richer evidence, but output constraints remain a separate decision.</p>",
        "fig": {
          "type": "flow",
          "t": "The course path",
          "items": [
            [
              "",
              "W1: Represent",
              "Text → numbers",
              "c0"
            ],
            [
              "",
              "W2: Classify",
              "Numbers → document label",
              "c1"
            ],
            [
              "",
              "W3: Learn context",
              "Representations + honest evaluation",
              "c2"
            ],
            [
              "",
              "W4: Label words",
              "POS and entity spans",
              "c3"
            ],
            [
              "",
              "W6: Decode sequences",
              "Alignment, HMM and CRF",
              "c0"
            ]
          ]
        },
        "check": {
          "q": "Does a contextual encoder alone guarantee legal BIO sequences?",
          "o": [
            "No; output constraints are separate",
            "Yes; attention enforces BIO",
            "Yes; every subword is an entity"
          ],
          "why": "Contextual evidence does not enforce hard label-transition rules."
        }
      },
      {
        "t": "Align word targets to subwords",
        "key": "A transformer splits words into subwords. With the <b>first-subword policy</b> the first piece gets the word's label and every other piece and special token gets <b>−100</b> (ignored in the loss).",
        "fig": {
          "type": "boxes",
          "head": [
            "[CLS]",
            "Ada",
            "Wash",
            "##ington",
            "[SEP]"
          ],
          "rows": [
            {
              "label": "word index",
              "cells": [
                [
                  "none",
                  ""
                ],
                [
                  "0",
                  ""
                ],
                [
                  "1",
                  ""
                ],
                [
                  "1",
                  ""
                ],
                [
                  "none",
                  ""
                ]
              ]
            },
            {
              "label": "training label",
              "cells": [
                [
                  "−100",
                  ""
                ],
                [
                  "B-PER",
                  "c3"
                ],
                [
                  "B-PER",
                  "c3"
                ],
                [
                  "−100",
                  ""
                ],
                [
                  "−100",
                  ""
                ]
              ]
            }
          ],
          "cap": "Two separate people: Ada; Washington. Word indices are zero-based, as in word_ids()."
        },
        "html": "<p>Word annotations and model subwords may have different lengths. Under the first-subword policy, label the first piece of each word; ignore later pieces and special tokens for loss.</p><p>For [CLS] Ada Wash ##ington [SEP], with Ada and Washington as two people, targets are −100, B-PER, B-PER, −100, −100.</p><div class=\"callout warn\">−100 is an ignored target, not a predicted label. O is a real outside-entity label. An attention mask and a loss mask serve different purposes.</div>",
        "lab": {
          "href": "w6/spans.html",
          "todo": [
            "Section 5: read the word index and training label of each model token.",
            "Switch the policy to \"all subwords\" and see which labels change."
          ]
        },
        "check": {
          "q": "Is −100 an extra entity category learned by the model?",
          "o": [
            "No, it removes the position from the loss",
            "Yes, it marks subword pieces",
            "Yes, it is the same as O",
            "No, it marks a missing word"
          ],
          "why": "O is a real modeled category; −100 is the ignore index."
        }
      },
      {
        "t": "Count exact entity spans",
        "key": "Token accuracy can look great while <b>no entity is found</b>. NER is scored by <b>exact span match</b>: same boundaries <b>and</b> same type. F1 = 2TP / (2TP + FP + FN).",
        "fig": {
          "type": "bars",
          "t": "Predict O everywhere on 90 O + 10 entity tokens",
          "items": [
            [
              "Token accuracy",
              90,
              "c0",
              "90 / 100 = 90%"
            ],
            [
              "Entity recall",
              0,
              "c4",
              "0 spans found = 0%"
            ]
          ],
          "max": 100
        },
        "html": "<p>An exact NER match requires the same boundaries and type. Predicting only York when gold is New York creates a false positive and a missed gold span.</p><p>With 3 gold spans, 4 predictions and 2 exact matches: TP=2, FP=2, FN=1. Precision=2/4; recall=2/3; F1=4/7.</p><div class=\"callout warn\">Predicting O on 90 outside tokens and 10 entity tokens gives 90% token accuracy but zero entity recall.</div>",
        "check": {
          "q": "3 gold spans, 4 predictions, 2 exact matches. F1 = ?",
          "o": [
            "4/7 ≈ 0.571",
            "2/4 = 0.50",
            "2/3 ≈ 0.667",
            "6/7 ≈ 0.857"
          ],
          "why": "F1 = 2TP/(2TP+FP+FN) = 4/(4+2+1)."
        }
      },
      {
        "t": "Multiply probabilities along a hidden path",
        "key": "An HMM says: a hidden <b>state sequence</b> (the tags) generates the <b>observations</b> (the words). Its score is a product of three ingredients: <b>start × emission × transition × emission…</b>",
        "fig": {
          "type": "graph",
          "w": 640,
          "h": 230,
          "nodes": {
            "y1": [
              170,
              60,
              "hidden y₁ (tag)",
              "c3"
            ],
            "y2": [
              470,
              60,
              "hidden y₂ (tag)",
              "c3"
            ],
            "x1": [
              170,
              180,
              "observed x₁ (word)",
              "c0"
            ],
            "x2": [
              470,
              180,
              "observed x₂ (word)",
              "c0"
            ]
          },
          "edges": [
            [
              "y1",
              "y2",
              "a(y₁,y₂)"
            ],
            [
              "y1",
              "x1",
              "b(y₁,x₁)"
            ],
            [
              "y2",
              "x2",
              "b(y₂,x₂)"
            ]
          ]
        },
        "html": "<p>An HMM observes words and treats tags as hidden states. A path weight multiplies the start probability, word emissions and neighboring-tag transitions.</p><p>For “can fish”, path VN has weight 0.4×0.7×0.8×0.6=0.1344. This is a joint weight, not yet P(VN|words).</p><p>The four path weights sum to 0.2448. Divide 0.1344 by this total to obtain the posterior, about 0.549.</p><div class=\"callout warn\">Emission P(word|tag) and transition P(next tag|previous tag) use different conditional events.</div>",
        "check": {
          "q": "What does b(N, can) mean?",
          "o": [
            "P(can | N)",
            "P(N | can)",
            "P(N | previous N)",
            "P(can and fish)"
          ],
          "why": "Emissions connect a tag to an observed word: P(word | tag)."
        }
      },
      {
        "t": "Keep the best history for each ending tag",
        "key": "List all paths and multiply: <b>VN = 0.1344</b> wins. Viterbi gets the same answer by keeping <b>one best partial path per ending tag</b> and backtracing.",
        "fig": {
          "type": "anim",
          "name": "viterbi",
          "t": "Viterbi on \"can fish\"",
          "cap": "Green = kept predecessor. Grey = dropped."
        },
        "html": "<p>Trying every tag path grows quickly. Viterbi keeps the best partial path for each possible ending tag, together with its predecessor.</p><p>For “can fish”, the first-position weights are N=0.24 and V=0.28. At fish, best-N=max(0.24×0.3,0.28×0.8)×0.6=0.1344; best-V=max(0.24×0.7,0.28×0.2)×0.3=0.0504.</p><p>Choose final N and follow its predecessor V: path VN wins. Forward replaces max with sum to combine all histories rather than choose one.</p>",
        "lab": {
          "href": "w6/hmm.html",
          "todo": [
            "Section 1: check the four path products and the sum 0.2448.",
            "Section 2: step through the trellis and read each backpointer.",
            "Change the V row of the transitions to 0.2 / 0.8 (it must still sum to 1) and see which path wins now."
          ]
        },
        "check": {
          "q": "Is 0.1344 the posterior probability of VN?",
          "o": [
            "No, it is the joint; divide by 0.2448",
            "Yes, it is P(VN | words)",
            "No, it is the transition V → N",
            "Yes, joint and posterior are equal"
          ],
          "why": "Lecture check question: 0.1344 is P(words, VN); the posterior is ≈ 0.549."
        }
      },
      {
        "t": "Estimate probabilities from tagged examples",
        "key": "With tagged data an HMM learns by <b>counting and normalizing</b>. Its weakness: the emission sees only <b>one word given one tag</b>, so rich overlapping clues are hard to add.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Count",
              "N→N 3 times, N→V 7 times",
              "c0"
            ],
            [
              "",
              "Normalize",
              "total 10: P(N|N) = 0.3, P(V|N) = 0.7",
              "c1"
            ],
            [
              "",
              "Decode",
              "use the tables in Viterbi",
              "c3"
            ]
          ]
        },
        "html": "\n<p><b>Training</b> estimates parameters; <b>decoding</b> uses them to label new words.</p>\n<ul>\n  <li>Transitions: count tag pairs, divide by how often the first tag occurs.</li>\n  <li>Starts: sentence-start counts. Emissions: count(word with tag) ÷ count(tag).</li>\n  <li>A <b>zero count</b> gives probability 0 and can zero a whole path. Unseen words and transitions need <b>smoothing</b> or an unknown-word model.</li>\n</ul>\n<h3>Why look beyond the basic HMM?</h3>\n<table class=\"t\">\n  <tr><th>Useful structure</th><th>Missing evidence</th></tr>\n  <tr><td>Transitions model neighbouring labels; Viterbi gives the best complete sequence. States can be POS tags <b>or</b> BIO entity labels.</td><td>The emission sees one word given one tag. Suffixes, capitalisation and surrounding words are <b>overlapping</b> clues that are awkward to fit into P(word | tag).</td></tr>\n</table>\n<p>Goal: <b>rich input evidence and coherent output sequences in one conditional model</b>. That is the CRF.</p>",
        "check": {
          "q": "N→N occurs 3 times and N→V 7 times. P(V | N) = ?",
          "o": [
            "0.7",
            "0.3",
            "7",
            "0.07"
          ],
          "why": "Count and normalize: 7 / (3 + 7)."
        }
      },
      {
        "t": "Normalize complete sequence scores",
        "key": "A CRF gives each complete label sequence a <b>real-valued score</b> S(X,Y), turns it into a weight with exp, and divides by <b>Z(X)</b>, the sum over all sequences. <b>Max</b> picks the best path; <b>sum</b> builds Z.",
        "fig": {
          "type": "anim",
          "name": "crf",
          "t": "CRF on \"can fish\"",
          "cap": "Unary scores alone pick NV; the transition score a(V,N) = ln 8 makes VN win."
        },
        "html": "<p>A CRF scores complete label sequences given the input. Add unary evidence and neighboring-label compatibility scores. Scores are unrestricted real numbers.</p><p>In “can fish”, unary-only choices favor NV. Adding a V→N score ln 8 gives path weights NN=2, NV=4, VN=8, VV=2. Z=16, so P(VN|words)=8/16=1/2.</p><p>Viterbi maximizes scores. Forward sums weights for Z. If VN is gold, loss=−ln(1/2)=ln 2.</p><div class=\"callout warn\">A transition score is not a probability; normalize over complete paths.</div>",
        "lab": {
          "href": "w6/crf.html",
          "todo": [
            "Section 1: set a(V,N) to 0 and see NV win; set it back to ln 8.",
            "Check that Z = 16, P(VN) = 0.5 and the loss is 0.6931.",
            "Section 2: run the score-adding Viterbi and read the backpointers."
          ]
        },
        "check": {
          "q": "Which operation finds the best CRF path, and which builds Z?",
          "o": [
            "Max for the path, sum for Z",
            "Sum for the path, max for Z",
            "Max for both",
            "Sum for both"
          ],
          "why": "Lecture check question. You do not need Z to decode."
        }
      },
      {
        "t": "Keep output constraints separate from input context",
        "key": "A hard constraint sets illegal transitions (O → I-PER, START → I-PER) to <b>−∞</b>. A transformer supplies token scores zᵢ = W hᵢ + b; softmax decides each token alone, a CRF decodes them jointly.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "t": "HMM",
              "pts": [
                "models joint words + label path",
                "local emissions P(word | tag)",
                "Viterbi on probabilities"
              ],
              "c": "c3"
            },
            {
              "t": "Contextual softmax",
              "pts": [
                "each label given the full input",
                "no label-pair scores",
                "argmax at each position"
              ],
              "c": "c0"
            },
            {
              "t": "Linear-chain CRF",
              "pts": [
                "whole label sequence given input",
                "unary + adjacent-label scores",
                "Viterbi on sequence scores"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>A neural head turns each contextual vector h into label scores Wh+b. Per-token softmax chooses labels independently; a CRF adds output-label compatibility.</p><p>A finite transition preference cannot guarantee BIO validity. Set forbidden transitions such as O→I-PER to −∞ for a hard constraint.</p><p>The course path now ends at a complete system: define labels, align targets, learn evidence, decode, and evaluate at the correct word or span unit. Choose the simplest method that addresses the observed errors.</p>",
        "check": {
          "q": "Does a contextual encoder guarantee valid BIO labels?",
          "o": [
            "No, input context and output constraints differ",
            "Yes, attention sees all labels",
            "Yes, softmax enforces BIO",
            "No, encoders ignore context"
          ],
          "why": "An explicit constraint or structured decoder is a separate decision."
        }
      }
    ]
  }
};
