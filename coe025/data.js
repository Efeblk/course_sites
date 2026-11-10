/* Practice paraphrased from lecturer material. */
window.COURSE = window.COE025 = {
  "id": "coe025",
  "code": "COE025",
  "name": "Natural Language Processing",
  "term": "Fall 25-26",
  "lecturer": "Asst. Prof. Yiğit Bekir Kaya",
  "examFormat": "Midterm on 9 November, all weeks: multiple choice + two open-ended questions, no calculator. Four team projects (5 students each).",
  "textbooks": [
    "Jurafsky & Martin — Speech and Language Processing, 3rd ed. draft (web.stanford.edu/~jurafsky/slp3/)",
    "Manning, Raghavan & Schütze — Introduction to Information Retrieval (nlp.stanford.edu/IR-book/)"
  ],
  "projects": [
    "P1 — Text classification (sentiment / spam / topic). At least Naive Bayes + one other method; compare with benchmarks; 3 min talk + 2 min Q&A in Week 4; GitHub repo due before the talk. Rubric: technical depth 40%, originality 10%, presentation 50%.",
    "P2 — NER & POS tagging (sequence models: HMM, CRF, BiLSTM-CRF, Viterbi).",
    "P3 — ASR & TTS (speech-to-text / text-to-speech).",
    "P4 — Machine translation (seq2seq, attention, BLEU)."
  ],
  "chapters": [
    {
      "n": 1,
      "title": "NLP Fundamentals",
      "summary": "What NLP is, how it evolved, and how text becomes numbers: tokens and subwords (BPE, WordPiece), one-hot, bag of words, TF-IDF, n-grams and dense embeddings. Also the model zoo, and why an LLM is not always the right tool.",
      "takeaways": [
        "NLP teaches computers to work with human language. The big problem behind everything is that computers only understand numbers, so every method is a way of turning text into numbers.",
        "A model only knows the tokens it saw in training. A new word becomes [UNK] and its meaning is lost, unless we split it into known subword pieces.",
        "One-hot: one 1 per word, so no meaning and very long vectors. Bag of words: count each word in a document, but word order is lost.",
        "TF-IDF is high for words that are frequent in this document but rare in the others. Those are the words that tell you what it is about.",
        "An embedding is a short list of numbers per word, learned so that similar words end up close together. Directions can even carry meaning.",
        "Encoders read (they understand), decoders draft (they generate), and encoder-decoders transform one text into another."
      ],
      "traps": [
        [
          "A token is always a word",
          "A token is the atomic unit the tokenizer produces. It can be a word, a subword (\"##ness\"), punctuation or \"n't\"."
        ],
        [
          "BoW keeps word order",
          "BoW only counts. \"dog bites man\" and \"man bites dog\" get the same vector. N-grams recover some local order."
        ],
        [
          "A high TF-IDF means the word is positive",
          "TF-IDF is a feature weight (how distinctive a word is for a document). It is not a sentiment or a probability."
        ],
        [
          "IDF counts how often a word occurs",
          "IDF uses document frequency: how many documents contain the word at least once. Repeating a word inside one document doesn't change df."
        ],
        [
          "An embedding ID tells the model the meaning",
          "The ID only selects a row of the embedding table. The learned vector in that row carries the features."
        ]
      ],
      "activities": [
        {
          "id": "w1-tokenizer",
          "title": "Tokenizer Lab",
          "desc": "Split text by spaces, then train BPE merge by merge, then run BERT-style WordPiece (including Turkish \"gel ##di ##ğin ##de\"). See how subwords kill the OOV problem.",
          "href": "w1/tokenizer.html"
        },
        {
          "id": "w1-vectors",
          "title": "Words → Numbers",
          "desc": "Type documents and watch the vocabulary, one-hot, bag-of-words, n-grams and TF-IDF tables build. Reproduce the lecture's TF-IDF(\"cat\") = 0.183.",
          "href": "w1/vectors.html"
        },
        {
          "id": "w1-embeddings",
          "title": "Embedding Space",
          "desc": "Do king − man + woman on a map, measure cosine similarity, and watch a contextual model move \"bank\" toward the river or the money.",
          "href": "w1/embeddings.html"
        }
      ],
      "quiz": [
        {
          "q": "The lecture defines NLP as…",
          "options": [
            "Understand, interpret and generate human language",
            "Translating programming languages into machine code",
            "Storing text efficiently in databases",
            "Building chatbots with hand-written rules only"
          ],
          "answer": 0,
          "explain": "Definition slide: understand, interpret and generate human language. Its three pillars are linguistics, statistics and computer science."
        },
        {
          "q": "A model has never seen \"unhappiness\" during training. What does subword tokenization do?",
          "options": [
            "Replaces it with an [UNK] token and loses it",
            "Split it into known subwords",
            "Deletes the word from the input",
            "Adds the word to the vocabulary at test time"
          ],
          "answer": 1,
          "explain": "That is the OOV problem. BPE, WordPiece and SentencePiece build rare words from frequent fragments, so almost nothing is unknown."
        },
        {
          "q": "What does BPE (used by GPT/ChatGPT) do during training?",
          "options": [
            "Marks every non-initial subword with ##",
            "Assigns each word a random integer ID",
            "Merge the most frequent adjacent pair",
            "Removes stop words before counting"
          ],
          "answer": 2,
          "explain": "Byte-Pair Encoding starts from characters/bytes and greedily merges the most frequent pair, again and again, until the vocabulary reaches its target size."
        },
        {
          "q": "In WordPiece (BERT) output \"Yarın gel ##di ##ğin ##de\", what does ## mean?",
          "options": [
            "The piece is masked",
            "The piece is a number",
            "The piece is out of vocabulary",
            "A continuation of the preceding word"
          ],
          "answer": 3,
          "explain": "## marks a continuation subword. \"geldiğinde\" = gel + ##di + ##ğin + ##de."
        },
        {
          "q": "Doc 1 = \"The cat sat on the mat\", Doc 2 = \"The dog sat on the log\", vocabulary [the, cat, sat, on, mat, dog, log]. What is the BoW vector of Doc 1?",
          "options": [
            "[2,1,1,1,1,0,0]",
            "[1, 1, 1, 1, 1, 0, 0]",
            "[2, 0, 1, 1, 0, 1, 1]",
            "[0, 1, 0, 0, 1, 0, 0]"
          ],
          "answer": 0,
          "explain": "\"the\" appears twice, cat/sat/on/mat once, dog and log zero times. Doc 2 is [2, 0, 1, 1, 0, 1, 1]."
        },
        {
          "q": "Three documents all contain \"the\". Using IDF = log(N/df), IDF(\"the\") is…",
          "options": [
            "log(3) ≈ 1.099",
            "0",
            "3",
            "1/3"
          ],
          "answer": 1,
          "explain": "A word that appears in every document carries no distinguishing information, so its IDF is log(1) = 0."
        },
        {
          "q": "Doc 1 = \"the cat sat on the mat\" (6 words); \"cat\" appears only in Doc 1 of 3 docs. With TF = count/length and IDF = ln(N/df), TF-IDF(\"cat\", Doc 1) ≈",
          "options": [
            "1 × ln(3) ≈ 1.099",
            "1/6 × ln(1) = 0",
            "0.183",
            "2/6 × ln(3) ≈ 0.366"
          ],
          "answer": 2,
          "explain": "TF = 1/6 = 0.167. IDF = ln(3/1) = 1.099. Product ≈ 0.183 — the lecture's worked example."
        },
        {
          "q": "For \"New York is great\", which list contains exactly the bigrams?",
          "options": [
            "[new, york, is, great]",
            "[new york is, york is great]",
            "[new york, is great]",
            "New York; York is; is great"
          ],
          "answer": 3,
          "explain": "Bigrams are every pair of adjacent tokens. A combined unigram + bigram vector has all 7 features."
        },
        {
          "q": "What do dense word embeddings give you that one-hot vectors cannot?",
          "options": [
            "Similar meanings can have similar vectors",
            "Vectors exactly the size of the vocabulary",
            "Perfect word order",
            "Guaranteed correct translations"
          ],
          "answer": 0,
          "explain": "One-hot vectors are all equally far apart. Dense 50–300-dimensional embeddings place related words near each other."
        },
        {
          "q": "Why does \"bank\" need contextualized embeddings?",
          "options": [
            "Because \"bank\" is out of vocabulary",
            "Its meaning changes with context",
            "Because \"bank\" is a stop word",
            "Because static embeddings cannot store nouns"
          ],
          "answer": 1,
          "explain": "Static Word2Vec/GloVe store one vector per word. ELMo (BiLSTM) and BERT/GPT (Transformers) compute a vector from the surrounding words."
        },
        {
          "q": "Which architecture is BERT?",
          "options": [
            "Decoder-only — next-word generation",
            "Encoder-decoder — translation and summarization",
            "Encoder-only",
            "A recurrent LSTM"
          ],
          "answer": 2,
          "explain": "BERT: encoder, bidirectional, fill-in-the-blank. GPT: decoder, predicts the next word. T5/BART: encoder-decoder (seq2seq)."
        },
        {
          "q": "Before replacing a classical spam filter with an LLM, what should the decision consider?",
          "options": [
            "LLMs are always cheaper at scale",
            "Naive Bayes is more accurate than LLMs",
            "Spam filtering cannot be done with classical ML",
            "Compare accuracy with cost and latency"
          ],
          "answer": 3,
          "explain": "Compare measured quality with cost, latency, privacy and interpretability on the actual task."
        }
      ],
      "cards": [
        [
          "NLP",
          "Teaching computers to understand, interpret and generate human language. Pillars: linguistics, statistics, computer science."
        ],
        [
          "Corpus (pl. corpora)",
          "Your collection of text documents."
        ],
        [
          "Token",
          "The atomic unit after tokenization — usually a word, but can be a subword or punctuation."
        ],
        [
          "OOV (out-of-vocabulary)",
          "A word never seen in training. With a word-level vocabulary it becomes \"unknown\"."
        ],
        [
          "BPE (Byte-Pair Encoding)",
          "Subword method used by GPT: repeatedly merge the most frequent adjacent pair of symbols."
        ],
        [
          "WordPiece",
          "BERT's subword method. Continuation pieces start with ##: play ##ing."
        ],
        [
          "One-hot encoding",
          "Binary vector the size of the vocabulary with a single 1. \"cat\" = [0,0,0,1,0,…,0]."
        ],
        [
          "Bag of Words (BoW)",
          "Vector of word counts per document. Loses word order."
        ],
        [
          "TF-IDF",
          "Term frequency × inverse document frequency. Weights words that are frequent in this document but rare across the corpus."
        ],
        [
          "IDF",
          "log(N / df): N = number of documents, df = number of documents containing the term."
        ],
        [
          "Word embedding",
          "Dense vector (50–300 dims) where similar meaning → similar vector. Word2Vec, GloVe, FastText."
        ],
        [
          "Contextualized embedding",
          "A vector computed from the whole sentence, so \"bank\" differs by context. ELMo, BERT, GPT."
        ]
      ]
    },
    {
      "n": 2,
      "title": "Text Classification",
      "summary": "f(text) → label. Sentiment, spam and topic classification; the ML pipeline; three classical methods (Naive Bayes, logistic regression, SVM); feature engineering. Also Project 1.",
      "takeaways": [
        "Text classification means giving each document one label from a fixed list: f(text) → label.",
        "Every project follows the same loop: data → features → model → prediction → evaluation, then improve and go round again.",
        "For each class, multiply how common the class is by how likely each word is in that class. The bigger product wins. Add-one smoothing stops a single unseen word from making it 0.",
        "Give every word a weight, add them up into a score z, and squash z into a probability with the sigmoid. Predict positive if p ≥ 0.5.",
        "Many lines separate the classes. The SVM picks the one with the widest street (maximum margin). Only the points on the edge of the street, the support vectors, decide it.",
        "The model only sees the numbers you give it. Better features (n-grams, TF-IDF, handling negation…) often help more than a fancier model."
      ],
      "traps": [
        [
          "Logistic regression is a regression algorithm",
          "Despite its name it is a classification algorithm: a sigmoid turns a linear score into P(class)."
        ],
        [
          "Naive Bayes is \"naive\" because it is simple",
          "\"Naive\" refers to the assumption that words are conditionally independent given the class. \"not good\" is treated as \"not\" + \"good\"."
        ],
        [
          "Naive Bayes and logistic regression are both discriminative",
          "NB is generative (models how each class generates words). LR is discriminative (learns the boundary directly)."
        ],
        [
          "Without smoothing NB still works on new word combinations",
          "One unseen word gives P(word|class) = 0, and the whole product becomes 0. Add-one (Laplace) smoothing fixes this."
        ],
        [
          "SVM picks any line that separates the classes",
          "It picks the boundary with the maximum margin — as far as possible from both classes."
        ]
      ],
      "activities": [
        {
          "id": "w2-nb",
          "title": "Naive Bayes Spam Lab",
          "desc": "Train on the lecture's 4 emails, classify \"Win free tickets\", turn smoothing off and watch a single zero kill the product. Switch to log space and normalize.",
          "href": "w2/naive-bayes.html"
        },
        {
          "id": "w2-logreg",
          "title": "Logistic Regression Playground",
          "desc": "Drag weights and bias, follow z → σ(z) on the curve, take one gradient step by hand, and fix \"not good\" with a bigram feature.",
          "href": "w2/logreg.html"
        },
        {
          "id": "w2-svm",
          "title": "SVM Margin Lab",
          "desc": "Rotate and slide a boundary between review points, find the maximum margin, add an outlier and see what C does. Compute functional vs geometric margin and hinge loss.",
          "href": "w2/svm.html"
        }
      ],
      "quiz": [
        {
          "q": "Which formula summarizes text classification?",
          "options": [
            "f(text) → label",
            "f(label) → text",
            "f(text) → next word",
            "f(text) → translated text"
          ],
          "answer": 0,
          "explain": "A classifier maps a document to one of a fixed set of predefined labels, e.g. \"This movie was amazing!\" → Positive."
        },
        {
          "q": "Spam vs ham is an example of…",
          "options": [
            "Multi-class classification",
            "Binary classification",
            "Sequence labeling",
            "Text generation"
          ],
          "answer": 1,
          "explain": "Two classes → binary. Topic classification (sports, politics, tech, business) is multi-class."
        },
        {
          "q": "Which is the correct order of the ML pipeline?",
          "options": [
            "Features → Data → Evaluation → Model → Prediction",
            "Model → Data → Features → Prediction → Evaluation",
            "Data → Features → Model → Prediction → Evaluation",
            "Data → Model → Features → Evaluation → Prediction"
          ],
          "answer": 2,
          "explain": "Labeled data → text to numbers → learn patterns → new text to label → how good? Then loop back to improve the data."
        },
        {
          "q": "Naive Bayes chooses the class that maximizes…",
          "options": [
            "P(text) × P(class | text)",
            "The distance to the margin",
            "σ(w·x + b)",
            "P(c) × P(text | c)"
          ],
          "answer": 3,
          "explain": "P(class | text) ∝ P(class) × P(text | class). P(text) is the same for every class, so it can be ignored."
        },
        {
          "q": "Why is Naive Bayes called \"naive\"?",
          "options": [
            "Conditional independence given the class",
            "It only works for English",
            "It never uses probabilities",
            "It ignores the class prior"
          ],
          "answer": 0,
          "explain": "\"not good\" is treated as \"not\" and \"good\" separately. The assumption is false, but it works surprisingly well."
        },
        {
          "q": "Training spam: \"Win free money now!\", \"Click here for prize\". Ham: \"Meeting tomorrow at 3pm\", \"Dinner with family tonight\". Without smoothing, what is P(\"win\" | HAM)?",
          "options": [
            "1/16",
            "0",
            "0.5",
            "1"
          ],
          "answer": 1,
          "explain": "\"win\" never appears in ham. A single zero factor makes the product zero, which is why we add-one (Laplace) smooth."
        },
        {
          "q": "In the week-3 toy model (positive [good, bad, movie] totals [3, 0, 2], add-one smoothing, vocabulary 3), P(good | +) =",
          "options": [
            "3/5 = 0.6",
            "(3 + 1) / 5 = 0.8",
            "4/8 = 0.5",
            "1/8 = 0.125"
          ],
          "answer": 2,
          "explain": "Add one to the count and the vocabulary size to the denominator: 5 tokens + 3 words = 8."
        },
        {
          "q": "Logistic regression computes P(y = 1) as…",
          "options": [
            "P(class) × ∏ P(word | class)",
            "The sign of the distance to the margin only",
            "A count of positive words",
            "σ(w·x + b)"
          ],
          "answer": 3,
          "explain": "Learn one weight per feature, take the weighted sum, apply the sigmoid to get a probability between 0 and 1."
        },
        {
          "q": "Weights [good: 0.8, bad: −1], bias −0.4, input [good, bad] = [2, 0]. What is z and the prediction at threshold 0.5?",
          "options": [
            "z = 1.2; positive",
            "z = 1.6, p ≈ 0.83 → positive",
            "z = −0.4, p ≈ 0.40 → negative",
            "z = 0.8, p ≈ 0.69 → positive"
          ],
          "answer": 0,
          "explain": "0.8×2 − 1×0 − 0.4 = 1.2. 1/(1 + e^−1.2) ≈ 0.769 > 0.5."
        },
        {
          "q": "Key difference between Naive Bayes and logistic regression (lecture)?",
          "options": [
            "NB is discriminative; LR is generative",
            "NB: generative; LR: discriminative",
            "Both are generative",
            "Only NB outputs probabilities"
          ],
          "answer": 1,
          "explain": "NB models P(text | class) for each class. LR directly models P(class | text) with a weighted boundary."
        },
        {
          "q": "What does an SVM optimize?",
          "options": [
            "The number of features",
            "The probability of each word",
            "Maximum margin",
            "The training time"
          ],
          "answer": 2,
          "explain": "The boundary should be as far as possible from both classes. The closest points are the support vectors."
        },
        {
          "q": "\"Capital letter ratio\" and \"punctuation counts\" are which type of feature?",
          "options": [
            "Lexical features",
            "Linguistic features",
            "Domain-specific features",
            "Statistical features"
          ],
          "answer": 3,
          "explain": "Statistical: length, word count, average word length, punctuation, caps ratio. Lexical: BoW, TF-IDF, n-grams. Linguistic: POS, lexicons, entities. Domain: spam words, emoticons."
        }
      ],
      "cards": [
        [
          "Text classification",
          "Assigning predefined categories/labels to text documents: f(text) → label."
        ],
        [
          "Binary vs multi-class",
          "Two labels (spam/ham) vs many (sports, politics, tech, business…)."
        ],
        [
          "ML pipeline",
          "Data → Features → Model → Prediction → Evaluation (→ back to Data)."
        ],
        [
          "Naive Bayes formula",
          "P(class | text) ∝ P(class) × P(text | class), with P(text | class) = ∏ P(word | class)."
        ],
        [
          "Naive assumption",
          "Words are conditionally independent given the class."
        ],
        [
          "Add-one (Laplace) smoothing",
          "P(w|c)=(count(w,c)+1)/(tokens(c)+|V|). Gives positive likelihoods to known vocabulary terms; unknown-word handling is separate."
        ],
        [
          "Generative vs discriminative",
          "Generative models how the data is produced (NB). Discriminative learns the boundary directly (LR, SVM)."
        ],
        [
          "Logistic regression",
          "P(y=1) = σ(w·x + b). A linear CLASSIFIER with probabilistic output and interpretable weights."
        ],
        [
          "Sigmoid σ(z)",
          "1 / (1 + e^−z). Maps any score to (0, 1). σ(0) = 0.5."
        ],
        [
          "SVM",
          "Finds the hyperplane that maximizes the margin between classes."
        ],
        [
          "Feature engineering",
          "Designing input features. Good features = good performance for classical ML."
        ],
        [
          "Baseline",
          "A simple model (e.g. Naive Bayes) that every fancier model must beat."
        ]
      ]
    },
    {
      "n": 3,
      "title": "From Counts to BERT",
      "summary": "Neural text classification and honest evaluation: count and TF-IDF features, leakage-free splits, the math behind NB / LR / SVM, embeddings (Word2Vec, GloVe, FastText), CNN, RNN, LSTM, BiLSTM, attention, Transformers, BERT, and accuracy / precision / recall / F1.",
      "takeaways": [
        "\"You shall know a word by the company it keeps.\" Word2Vec learns a word's vector by predicting its neighbours.",
        "A CNN slides a small filter over every 2–3-word window, scores each window, then keeps the maximum (max-pooling). It finds key phrases wherever they are.",
        "An RNN reads one word at a time and carries a memory h forward. Plain RNNs forget early words (vanishing gradient); LSTM gates decide what to keep.",
        "With attention, each word looks at all the other words and decides how much each one matters to it. The weights in a row add up to 1.",
        "BERT is a stack of attention layers. It is pretrained by guessing hidden words, then fine-tuned with a small head on the [CLS] output for your task.",
        "Precision: of everything I flagged, how much was right? Recall: of everything that was really there, how much did I find? F1 balances the two."
      ],
      "traps": [
        [
          "fit_transform on the test set is fine because it has no labels",
          "It learns a new vocabulary/IDF from test data (leakage) and can change what each column means. Use transform with the training-fitted vectorizer."
        ],
        [
          "df(good) = 2 inside \"good good movie\"",
          "Document frequency counts documents, not occurrences. Within one review the TF is 2; df counts reviews containing the word."
        ],
        [
          "A NB posterior of 0.80 means the model is 80% accurate",
          "It is the toy model's probability for one input, not a measured accuracy. Probabilities may also be poorly calibrated."
        ],
        [
          "An SVM score of 2 means 200% confidence",
          "SVM produces a decision score, not a calibrated probability."
        ],
        [
          "Max pooling tells you where the phrase was",
          "Pooling discards the position axis. It keeps the strongest response only."
        ]
      ],
      "activities": [
        {
          "id": "w3-rnn",
          "title": "RNN & LSTM Stepper",
          "desc": "Run a recurrent state through text, reverse the input, watch gradients vanish or explode, open and close LSTM gates, and pad and mask a batch.",
          "href": "w3/rnn.html"
        },
        {
          "id": "w3-attention",
          "title": "Attention & BERT Lab",
          "desc": "Scores → scale by √dₖ → mask → softmax → mix values. Switch between bidirectional, causal and padding masks. Build a BERT input and watch truncation drop \"…but the ending ruined it\".",
          "href": "w3/attention.html"
        },
        {
          "id": "w3-metrics",
          "title": "Confusion Matrix & F1",
          "desc": "Move the decision threshold over 20 scored reviews and watch TP/FP/FN/TN, precision, recall, F1, macro-F1 and accuracy react. Reproduce the 30/10/5/55 example.",
          "href": "w3/metrics.html"
        }
      ],
      "quiz": [
        {
          "q": "You must turn reviews into features for a test set. What is correct?",
          "options": [
            "Fit train; transform validation and test",
            "fit_transform(train) and fit_transform(test) separately",
            "fit_transform on train + test together, then split",
            "fit_transform(test) first because it has no labels"
          ],
          "answer": 0,
          "explain": "Vocabulary and IDF are learned statistics. Learn them on training data only and reuse them, otherwise information leaks from the test set."
        },
        {
          "q": "Corpus: \"good good movie\", \"good movie\", \"bad bad movie\", \"bad movie\". With weight = count × ln(N/df), what is the weight of \"good\" in \"good good movie\"?",
          "options": [
            "2 × ln(4/3) ≈ 0.575",
            "2 ln 2 ≈ 1.386",
            "1 × ln(4/2) ≈ 0.693",
            "0"
          ],
          "answer": 1,
          "explain": "N = 4, df(good) = 2 reviews (not 3 occurrences), count = 2. \"movie\" gets 1 × ln(4/4) = 0."
        },
        {
          "q": "Toy NB scores: positive 0.09375, negative 0.0234375. What is P(+ | \"good movie\") after normalizing?",
          "options": [
            "0.09375",
            "0.5",
            "0.8",
            "0.20"
          ],
          "answer": 2,
          "explain": "Divide by the sum of both class scores: 0.09375 + 0.0234375 = 0.1171875. P(−) = 0.20."
        },
        {
          "q": "SVM with labels ±1, score f(x) and margin m = y·f(x). The hinge loss for m = 0.5 is…",
          "options": [
            "0 — it is correctly classified",
            "1.5",
            "−0.5",
            "0.5"
          ],
          "answer": 3,
          "explain": "Loss is 0 only when m ≥ 1. 0 < m < 1: right sign but too close. m < 0: wrong side, loss > 1."
        },
        {
          "q": "CBOW vs skip-gram, window radius 1, sentence \"I love this movie\", center \"this\":",
          "options": [
            "CBOW: context → this; skip-gram: this → love, movie",
            "CBOW: this → love, movie.   Skip-gram: [love, movie] → this",
            "Both predict the sentiment label",
            "Both use \"I\" as context"
          ],
          "answer": 0,
          "explain": "CBOW predicts the center from the context; skip-gram predicts each context word from the center. \"I\" is 2 positions away, outside radius 1."
        },
        {
          "q": "A CNN filter produced responses [0.20, 0.30, 0.95, 0.88, 0.82]. Max pooling and mean pooling give…",
          "options": [
            "0.63 and 0.95",
            "Max = 0.95; mean = 0.63",
            "0.95 and 3.15",
            "0.20 and 0.63"
          ],
          "answer": 1,
          "explain": "Max = strongest signal. Mean = 3.15 / 5 = 0.63. Both discard the position."
        },
        {
          "q": "Why do simple RNNs struggle with long dependencies?",
          "options": [
            "They cannot process more than 20 tokens",
            "They have no parameters",
            "Vanishing or exploding gradients",
            "They only work with one-hot vectors"
          ],
          "answer": 2,
          "explain": "Clipping controls exploding gradients but cannot restore a vanished signal. That motivates LSTM gates."
        },
        {
          "q": "LSTM: old cell 0.50, forget/retain gate 0.8, input/write gate 0.25, candidate −0.40. New cell =",
          "options": [
            "0.50 + 0.25 − 0.40 = 0.35",
            "0.8 × 0.25 = 0.20",
            "0.50",
            "0.30"
          ],
          "answer": 3,
          "explain": "Retained old content (0.40) + written new content (−0.10). A negative candidate can reduce the memory."
        },
        {
          "q": "Row scores [0, ln 2, 0] where position 3 is padding. After adding mask [0, 0, −∞] and softmax, the weights are…",
          "options": [
            "[1/3, 2/3, 0]",
            "[1/4, 1/2, 1/4]",
            "[0, 1, 0]",
            "[1/3, 1/3, 1/3]"
          ],
          "answer": 0,
          "explain": "exp → [1, 2, 0]; normalize by 3. The padded key gets exactly zero weight, and the valid weights still sum to 1."
        },
        {
          "q": "Weights [.25, .50, .25] mix values [2, 0], [0, 4], [2, 2]. The output vector is…",
          "options": [
            "[4, 6]",
            "[1, 2.5]",
            "[1.33, 2]",
            "[0.5, 2]"
          ],
          "answer": 1,
          "explain": "[.5, 0] + [0, 2] + [.5, .5] = [1, 2.5]. The output has the same width as each value vector."
        },
        {
          "q": "BERT input vector at each position =",
          "options": [
            "token ⊕ segment ⊕ position concatenated (3× width)",
            "Only the token embedding",
            "Token + segment + position embeddings",
            "TF-IDF + one-hot"
          ],
          "answer": 2,
          "explain": "The three vectors are added element-wise. [CLS] starts the sequence; [SEP] separates and ends segments A and B."
        },
        {
          "q": "TP = 30, FN = 10, FP = 5, TN = 55. Precision, recall, F1?",
          "options": [
            "0.750, 0.857, 0.800",
            "0.850, 0.850, 0.850",
            "0.857, 0.750, 0.804",
            "P = 6/7; R = 3/4; F1 = 4/5"
          ],
          "answer": 3,
          "explain": "P = 30/35. R = 30/40. F1 = 2·30 / (60 + 5 + 10) = 60/75 = 0.80. Accuracy = 85/100."
        }
      ],
      "cards": [
        [
          "Data leakage",
          "Information from validation/test data entering training (e.g. fitting IDF on the full dataset)."
        ],
        [
          "Train / validation / test",
          "Train: fit. Validation: choose models and settings. Test: evaluate the selected model once."
        ],
        [
          "Binary cross-entropy",
          "L = −[y ln p + (1 − y) ln(1 − p)]. A confidently wrong prediction has a large loss."
        ],
        [
          "Logistic gradient",
          "dL/dw = (p − y)x, dL/db = p − y."
        ],
        [
          "Hinge loss",
          "max(0, 1 − y·f(x)). Zero only when the margin m = y·f(x) ≥ 1."
        ],
        [
          "CBOW / skip-gram",
          "CBOW: context → center word. Skip-gram: center → each context word."
        ],
        [
          "FastText",
          "Represents a word by character n-grams with < > markers, so rare or unseen forms get vectors."
        ],
        [
          "Pooling",
          "Max or mean over positions → one fixed-size feature per filter, position lost."
        ],
        [
          "LSTM gates",
          "Forget (retain) f, input (write) i, output o — sigmoid values in (0,1). c_new = f·c_old + i·g; h = o·tanh(c)."
        ],
        [
          "Scaled dot-product attention",
          "softmax(QKᵀ / √dₖ)V. Q, K choose; V carries content."
        ],
        [
          "Masked language modeling",
          "BERT pretraining: hide a token (\"The film was [MASK].\") and predict it. Text supplies the target."
        ],
        [
          "F1 / macro-F1",
          "2TP/(2TP+FP+FN). Macro-F1 = average of per-class F1, each class weighted equally."
        ]
      ]
    },
    {
      "n": 4,
      "title": "Sequence Labeling: POS & NER",
      "summary": "Cycle 2 (Project 2): one label per token. Parts of speech (open vs closed class, the Universal Dependencies tagset, ambiguity) and named entity recognition with BIO tagging. (Slides: Jurafsky & Martin's deck. The lecturer's own Week 6 deck is built on it and adds HMM and CRF; see Week 6.)",
      "takeaways": [
        "In sequence labeling, the model gives every token its own label, not just one label for the whole text. POS tagging and NER are both like this.",
        "Ask: can someone invent a new word of this type tomorrow? Yes, so it is an open class (nouns, verbs). No, so it is a closed class (the, in, and).",
        "Most words have one tag, but the common words are ambiguous. Just picking each word's most frequent tag already gives ~92%.",
        "NER finds names of things in text and says what type they are: person, organisation, location, geo-political entity…",
        "B = begins an entity, I = inside it, O = outside. With n entity types, BIO needs 2n + 1 tags."
      ],
      "traps": [
        [
          "POS tagging has a segmentation problem like NER",
          "In POS tagging every word gets exactly one tag. Only NER has to find where spans begin and end."
        ],
        [
          "15% of tokens are ambiguous",
          "15% of word TYPES are ambiguous. Because those types are frequent, about 60% of TOKENS in running text are ambiguous."
        ],
        [
          "97% accuracy means POS tagging is hard to beat",
          "The dumb most-frequent-tag baseline already gets ~92%. Always compare against it."
        ],
        [
          "Parts of speech are defined by meaning",
          "They are defined by grammatical relations with neighboring words and by morphology (affixes), though they have semantic tendencies."
        ],
        [
          "\"I-PER\" can start an entity",
          "In BIO, every span starts with B-. An I- tag right after O (or after a different type) is invalid."
        ]
      ],
      "activities": [
        {
          "id": "w4-pos",
          "title": "POS Tagging Workbench",
          "desc": "Tag sentences with the 17 Universal Dependencies tags, disambiguate the five uses of \"back\", and race the most-frequent-tag baseline. Morphology clues for any word.",
          "href": "w4/pos.html"
        },
        {
          "id": "w4-bio",
          "title": "NER & BIO Lab",
          "desc": "Mark entity spans in the \"Jane Villanueva of United…\" sentence and see BIO, IO and BIOES tags appear. Then find the invalid tag sequences and count 2n + 1.",
          "href": "w4/bio.html"
        }
      ],
      "quiz": [
        {
          "q": "POS tagging maps a word sequence x₁…xₙ to…",
          "options": [
            "A POS tag sequence of the same length",
            "A single label for the whole sentence",
            "Spans of variable length with types",
            "A translated sentence"
          ],
          "answer": 0,
          "explain": "Each output yᵢ corresponds to exactly one input xᵢ. That is why POS has no segmentation problem."
        },
        {
          "q": "\"Book that flight\" vs \"Hand me that book\". What is \"book\" in each?",
          "options": [
            "NOUN, then VERB",
            "VERB; NOUN",
            "NOUN in both",
            "VERB in both"
          ],
          "answer": 1,
          "explain": "Tagging is disambiguation: the same word type takes different tags in different contexts."
        },
        {
          "q": "Which word class is CLOSED?",
          "options": [
            "Nouns",
            "Verbs",
            "Determiners",
            "Adjectives"
          ],
          "answer": 2,
          "explain": "Closed: determiners, pronouns, prepositions, conjunctions, auxiliaries, particles. New nouns and verbs (\"iPhone\", \"to fax\") are coined all the time, so those are open."
        },
        {
          "q": "The most-frequent-class baseline for POS tagging…",
          "options": [
            "Tags every word as NOUN and gets ~97%",
            "Uses BERT and gets ~92%",
            "Randomly assigns tags",
            "Uses each word’s most frequent tag"
          ],
          "answer": 3,
          "explain": "Modern taggers (HMM, CRF, BERT) and humans reach ~97%. The baseline is surprisingly strong because many words are unambiguous."
        },
        {
          "q": "\"a clear majority of senators back the bill\" — \"back\" is…",
          "options": [
            "VERB",
            "NOUN",
            "ADV",
            "PART"
          ],
          "answer": 0,
          "explain": "back/ADJ: \"a back seat\"; NOUN: \"in the back\"; VERB: \"senators back the bill\"; PART: \"buy back debt\"; ADV: \"back then\"."
        },
        {
          "q": "Which clue is a morphology / word-shape feature for POS tagging?",
          "options": [
            "\"will\" is usually an AUX",
            "Suffix or capitalization",
            "\"the\" is usually followed by a noun or adjective",
            "The sentence length"
          ],
          "answer": 1,
          "explain": "The three information sources: prior probability of word/tag, neighboring words, and morphology/word shape (prefixes, suffixes, capitalization)."
        },
        {
          "q": "NER is harder than POS tagging mainly because of…",
          "options": [
            "Having more words per sentence",
            "Not having any training data",
            "Finding both boundaries and entity types",
            "Needing to translate"
          ],
          "answer": 2,
          "explain": "Most words are not entities, spans can be multi-word, and \"Washington\" could be PER, ORG (team), LOC or GPE."
        },
        {
          "q": "The four most common NER tags are…",
          "options": [
            "NOUN, VERB, ADJ, ADV",
            "B, I, O, E",
            "DATE, TIME, MONEY, PERCENT",
            "PER, ORG, LOC, GPE"
          ],
          "answer": 3,
          "explain": "Person, location, organization, geo-political entity. The term is often extended to dates, times and prices."
        },
        {
          "q": "BIO tags for \"[PER Jane Villanueva] of [ORG United]\":",
          "options": [
            "B-PER I-PER O B-ORG",
            "Jane/I-PER Villanueva/I-PER of/O United/I-ORG",
            "Jane/B-PER Villanueva/B-PER of/O United/B-ORG",
            "Jane/PER Villanueva/PER of/O United/ORG"
          ],
          "answer": 0,
          "explain": "B begins each span, I continues it, O is outside. B-PER B-PER would split Jane Villanueva into two people."
        },
        {
          "q": "With n = 4 entity types, how many BIO tags are there?",
          "options": [
            "3",
            "9",
            "4n + 1 = 17",
            "n + 1 = 5"
          ],
          "answer": 1,
          "explain": "One O, plus B-X and I-X for each type. IO has n + 1 = 5 and BIOES has 4n + 1 = 17."
        },
        {
          "q": "Which BIO sequence is INVALID?",
          "options": [
            "B-ORG I-ORG O",
            "B-PER B-PER",
            "O I-PER",
            "O B-LOC O"
          ],
          "answer": 2,
          "explain": "An I- tag cannot follow O: spans must begin with B-. \"B-PER B-PER\" is valid (two adjacent one-word people)."
        },
        {
          "q": "What does the IO scheme lose compared with BIO?",
          "options": [
            "It cannot mark tokens outside entities",
            "It cannot handle multi-word entities",
            "Nothing — they are identical",
            "Adjacent same-type entity boundaries"
          ],
          "answer": 3,
          "explain": "Without B, \"I-PER I-PER\" could be one two-word person or two one-word people."
        }
      ],
      "cards": [
        [
          "Part of speech (POS)",
          "Grammatical category of a word (noun, verb, …), defined by relations with neighbors and morphology."
        ],
        [
          "POS tagging",
          "Assign one POS tag to every word: x₁…xₙ → y₁…yₙ. A disambiguation task."
        ],
        [
          "Closed class",
          "Fixed membership, function words: determiners, pronouns, prepositions, conjunctions, auxiliaries, particles."
        ],
        [
          "Open class",
          "Content words that gain new members: nouns, verbs, adjectives, adverbs, interjections."
        ],
        [
          "Universal Dependencies tagset",
          "17 tags (Nivre et al. 2016): ADJ ADP ADV AUX CCONJ DET INTJ NOUN NUM PART PRON PROPN PUNCT SCONJ SYM VERB X."
        ],
        [
          "Ambiguity numbers",
          "~15% of word types ambiguous → ~60% of tokens ambiguous."
        ],
        [
          "Most-frequent-tag baseline",
          "Tag each word with its most common tag; unknown → NOUN. ~92% (state of the art ~97%)."
        ],
        [
          "Named entity",
          "Anything referred to with a proper name: PER, LOC, ORG, GPE (+ dates, times, money)."
        ],
        [
          "NER",
          "Find the spans of text that are named entities and tag their type."
        ],
        [
          "GPE",
          "Geo-political entity — a place with a government: \"Boulder, Colorado\", countries, cities."
        ],
        [
          "BIO tagging",
          "B = begins a span, I = inside, O = outside. Gives one tag per token. 2n + 1 tags."
        ],
        [
          "IO / BIOES",
          "IO: no B tag (n + 1 tags). BIOES adds E (end) and S (single-token span): 4n + 1 tags."
        ]
      ]
    },
    {
      "n": 6,
      "title": "Token Classification: HMM & CRF",
      "summary": "One label per token, then read structure back from the labels. Hour 1: POS, NER, BIO, chunking, slot filling, punctuation restoration, subword alignment (−100) and exact-span evaluation. Hour 2: why HMMs and CRFs exist, the \"can fish\" calculations (four paths, Viterbi, Z, loss), BIO constraints and neural token heads. (Slides: the lecturer's Week 6 deck, which builds on the Jurafsky & Martin deck from Week 4.)",
      "takeaways": [
        "A transformer splits words into subwords. With the first-subword policy the first piece gets the word's label and every other piece and special token gets −100 (ignored in the loss).",
        "Token accuracy can look great while no entity is found. NER is scored by exact span match: same boundaries and same type. F1 = 2TP / (2TP + FP + FN).",
        "An HMM says: a hidden state sequence (the tags) generates the observations (the words). Its score is a product of three ingredients: start × emission × transition × emission…",
        "List all paths and multiply: VN = 0.1344 wins. Viterbi gets the same answer by keeping one best partial path per ending tag and backtracing.",
        "With tagged data an HMM learns by counting and normalizing. Its weakness: the emission sees only one word given one tag, so rich overlapping clues are hard to add.",
        "A CRF gives each complete label sequence a real-valued score S(X,Y), turns it into a weight with exp, and divides by Z(X), the sum over all sequences. Max picks the best path; sum builds Z."
      ],
      "traps": [
        [
          "Token classification predicts one label per document",
          "It predicts an aligned sequence: one label per token. NER is then decoded into spans."
        ],
        [
          "I means \"any entity token\"",
          "I continues a span of the SAME type that is already open. O I-PER and B-ORG I-PER are invalid."
        ],
        [
          "B-PER B-PER is invalid because the type repeats",
          "It is valid: two adjacent one-token person mentions, each starting with its own B."
        ],
        [
          "−100 is an extra label for subword pieces",
          "−100 removes that position from the loss. O is a real outside label the model learns."
        ],
        [
          "90% token accuracy means 90% of entities were found",
          "Predict O everywhere on 90 O + 10 entity tokens: 90% accuracy, 0% entity recall. Different denominators."
        ]
      ],
      "activities": [
        {
          "id": "w6-span",
          "title": "Span Scorer",
          "desc": "Annotate \"Ada visited New York .\", score a prediction with exact span matching, watch 90% accuracy hide 0% recall, and align subwords with −100.",
          "href": "w6/spans.html"
        },
        {
          "id": "w6-hmm",
          "title": "HMM & Viterbi Lab",
          "desc": "The \"can fish\" HMM with editable start, transition and emission tables: all four paths, the Viterbi trellis with backpointers, posteriors and count-and-normalize training.",
          "href": "w6/hmm.html"
        },
        {
          "id": "w6-crf",
          "title": "CRF Score Lab",
          "desc": "Unary and transition scores for \"can fish\": path scores, exp weights, Z, P(Y|X), loss and Viterbi. Then BIO hard constraints (−∞) and one softmax decision.",
          "href": "w6/crf.html"
        }
      ],
      "quiz": [
        {
          "q": "[CLS] Ada Wash ##ington [SEP] (two people) with the first-subword policy gives…",
          "options": [
            "−100, B-PER, B-PER, −100, −100",
            "O, B-PER, B-PER, I-PER, O",
            "−100, B-PER, I-PER, I-PER, −100",
            "O, B-PER, I-PER, O, O"
          ],
          "answer": 0,
          "explain": "Label the first piece of each word, ignore later pieces and special tokens. Ada and Washington are two separate people, so both get B-PER."
        },
        {
          "q": "What does the label −100 do during training?",
          "options": [
            "Marks an outside-entity token",
            "Skip this loss target",
            "Adds a new entity category",
            "Gives the token a negative score"
          ],
          "answer": 1,
          "explain": "O is a real modeled label. −100 is the ignore index of PyTorch cross-entropy."
        },
        {
          "q": "100 tokens: 90 O and 10 entity tokens. A model predicts O everywhere. Its token accuracy and entity recall are…",
          "options": [
            "90% and 90%",
            "10% and 0%",
            "90%; 0%",
            "100% and 10%"
          ],
          "answer": 2,
          "explain": "It gets the 90 O labels right but finds no span. Precision has a zero denominator, so the evaluator must state a convention."
        },
        {
          "q": "3 gold spans, 4 predicted spans, 2 exact matches. F1 = ?",
          "options": [
            "2/4 = 0.50",
            "2/3 ≈ 0.667",
            "5/7 ≈ 0.714",
            "4/7"
          ],
          "answer": 3,
          "explain": "TP 2, FP 4 − 2 = 2, FN 3 − 2 = 1. F1 = 2TP/(2TP + FP + FN) = 4/7. P = 0.50 and R = 0.667 are the two distractors."
        },
        {
          "q": "In an HMM, which nodes are given at prediction time?",
          "options": [
            "Words",
            "The hidden states y (tags)",
            "Both states and observations",
            "Neither; the model generates both"
          ],
          "answer": 0,
          "explain": "The hidden tags must be inferred from the observed words."
        },
        {
          "q": "What does the emission b(N, can) mean?",
          "options": [
            "P(N | can)",
            "P(can | N)",
            "P(N | previous N)",
            "P(can, fish)"
          ],
          "answer": 1,
          "explain": "An emission is P(word | tag), not P(tag | word). Write both directions to avoid inverting it."
        },
        {
          "q": "\"can fish\": π(V) = 0.4, P(can|V) = 0.7, a(V,N) = 0.8, P(fish|N) = 0.6. The joint weight of path VN is…",
          "options": [
            "0.0504",
            "0.0432",
            "0.1344",
            "0.2448"
          ],
          "answer": 2,
          "explain": "0.4 × 0.7 × 0.8 × 0.6 = 0.1344, the largest of the four paths. 0.2448 is P(words), the sum of all four."
        },
        {
          "q": "Why does Viterbi keep a best partial path for EACH ending tag?",
          "options": [
            "To list all Kᵀ full paths",
            "Because emissions sum to 1",
            "To compute Z for the CRF",
            "Ending tags affect future transitions"
          ],
          "answer": 3,
          "explain": "At \"fish\", N is best from V (0.1344), V is best from N (0.0504). Cost O(TK²) instead of Kᵀ."
        },
        {
          "q": "HMM training with tagged data: N→N occurs 3 times, N→V 7 times. P(V | N) = ?",
          "options": [
            "7/10",
            "0.3",
            "7",
            "0.07"
          ],
          "answer": 0,
          "explain": "Count and normalize: 7 / (3 + 7). A zero count would zero a whole path, so smoothing is needed."
        },
        {
          "q": "In a CRF, what is Z(X)?",
          "options": [
            "The score of the gold sequence",
            "Σ over paths exp(S)",
            "The best path found by Viterbi",
            "A transition probability row"
          ],
          "answer": 1,
          "explain": "The partition function makes the probabilities of all candidate sequences for this input sum to 1."
        },
        {
          "q": "Now add a(V,N) = ln 8. Path weights exp(S) are NN 2, NV 4, VN 8, VV 2. P(VN | words) = ?",
          "options": [
            "0.250",
            "0.125",
            "8/16 = 1/2",
            "0.800"
          ],
          "answer": 2,
          "explain": "Z = 2 + 4 + 8 + 2 = 16, so 8/16. The transition changed the winner from NV to VN."
        },
        {
          "q": "How does a hard BIO constraint forbid O → I-PER?",
          "options": [
            "Its transition score is set to 0",
            "The CRF learns it from data",
            "The softmax head removes it",
            "Illegal score = −∞"
          ],
          "answer": 3,
          "explain": "exp(−∞) = 0, so the path is impossible. A finite learned score only discourages it."
        }
      ],
      "cards": [
        [
          "First-subword policy",
          "Give a word's label to its first subword; later pieces and special tokens get −100."
        ],
        [
          "−100",
          "Ignore index: the position is left out of the loss. Not a label. O is a real label."
        ],
        [
          "Exact span match",
          "Same boundaries AND same type. A partial name or wrong type is an FP plus an FN."
        ],
        [
          "Span F1",
          "2TP / (2TP + FP + FN). 3 gold, 4 pred, 2 match → 4/7 ≈ 0.571."
        ],
        [
          "HMM",
          "Hidden states (tags) generate observations (words). Joint P(X,Y) = π · b · a · b …"
        ],
        [
          "Emission b(y,x)",
          "P(word x | tag y). Rows sum to 1."
        ],
        [
          "Transition a(y,z)",
          "P(next tag z | previous tag y). Rows sum to 1."
        ],
        [
          "Viterbi",
          "Dynamic programming: best partial path per ending tag, backpointers, backtrace. O(TK²)."
        ],
        [
          "HMM training",
          "With tagged data: count and normalize (3/10, 7/10). Unseen events need smoothing."
        ],
        [
          "CRF",
          "Conditional model P(Y|X) = exp(S(X,Y)) / Z(X). Combines overlapping input features with label compatibility."
        ],
        [
          "Partition function Z(X)",
          "Sum of exp(S) over all label sequences for this input. \"can fish\": 2 + 4 + 8 + 2 = 16."
        ],
        [
          "Hard constraint",
          "Illegal transition (O → I-PER, START → I-PER) gets score −∞, so exp = 0."
        ]
      ]
    }
  ],
  "games": {
    "text-to-numbers": {
      "ch": 1,
      "type": "match",
      "title": "Representation Match",
      "intro": "Match each text representation to what it does.",
      "pairs": [
        [
          "One-hot encoding",
          "Binary vector the size of the vocabulary, a single 1"
        ],
        [
          "Bag of Words",
          "Counts word occurrences, loses order"
        ],
        [
          "TF-IDF",
          "Term frequency × inverse document frequency"
        ],
        [
          "N-grams",
          "Sequences of n tokens — \"New York\" ≠ \"York New\""
        ],
        [
          "Word2Vec / GloVe",
          "Dense static vectors, similar meaning → similar vector"
        ],
        [
          "ELMo / BERT",
          "Contextualized vectors — \"bank\" differs by sentence"
        ]
      ]
    },
    "architectures": {
      "ch": 1,
      "type": "bucket",
      "title": "Model Zoo",
      "intro": "Sort each model family into the right group.",
      "buckets": [
        "Classical ML",
        "Neural networks",
        "Transformer: encoder-only",
        "Transformer: decoder-only",
        "Transformer: encoder-decoder"
      ],
      "items": [
        [
          "Naive Bayes — probabilistic, fast",
          0
        ],
        [
          "Logistic regression — linear classifier",
          0
        ],
        [
          "SVM — maximum margin",
          0
        ],
        [
          "CNN — local patterns, fast",
          1
        ],
        [
          "RNN / LSTM / GRU — sequential data",
          1
        ],
        [
          "BERT — fill in the blank; classification, NER, Q&A",
          2
        ],
        [
          "RoBERTa / ALBERT — improved BERT variants",
          2
        ],
        [
          "GPT — predict the next word; chat",
          3
        ],
        [
          "T5 / BART — translation, summarization",
          4
        ]
      ]
    },
    "classical-methods": {
      "ch": 2,
      "type": "bucket",
      "title": "NB, LR or SVM?",
      "intro": "Which classical method does each statement describe?",
      "buckets": [
        "Naive Bayes",
        "Logistic regression",
        "SVM"
      ],
      "items": [
        [
          "P(class | text) ∝ P(class) × P(text | class)",
          0
        ],
        [
          "Assumes words are independent",
          0
        ],
        [
          "Generative model",
          0
        ],
        [
          "Best for spam / quick baselines",
          0
        ],
        [
          "P(y=1) = σ(w₁x₁ + w₂x₂ + … + b)",
          1
        ],
        [
          "Discriminative, probabilistic output",
          1
        ],
        [
          "\"Despite the name, it's a CLASSIFICATION algorithm\"",
          1
        ],
        [
          "Maximizes the margin between classes",
          2
        ],
        [
          "Kernel trick: linear, RBF, polynomial",
          2
        ],
        [
          "Slow for large data, sensitive to feature scaling",
          2
        ]
      ]
    },
    "feature-types": {
      "ch": 2,
      "type": "bucket",
      "title": "Feature Engineering",
      "intro": "Sort each feature into its family (lecture slide \"Feature Engineering\").",
      "buckets": [
        "Statistical",
        "Lexical",
        "Linguistic",
        "Domain-specific"
      ],
      "items": [
        [
          "Text length, word count",
          0
        ],
        [
          "Punctuation counts",
          0
        ],
        [
          "Capital letter ratio",
          0
        ],
        [
          "Average word length",
          0
        ],
        [
          "Bag of words",
          1
        ],
        [
          "TF-IDF",
          1
        ],
        [
          "Bigrams, trigrams",
          1
        ],
        [
          "Character n-grams",
          1
        ],
        [
          "POS tags",
          2
        ],
        [
          "Sentiment lexicons",
          2
        ],
        [
          "Named entities",
          2
        ],
        [
          "Dependency patterns",
          2
        ],
        [
          "Spam words: \"free\", \"click\", \"!!!\"",
          3
        ],
        [
          "Emoticons for sentiment",
          3
        ],
        [
          "Medical terminology",
          3
        ]
      ]
    },
    "attention-steps": {
      "ch": 3,
      "type": "order",
      "title": "Scaled Dot-Product Attention",
      "intro": "Order the steps of softmax(QKᵀ/√dₖ)V for one layer.",
      "items": [
        "Project token vectors into queries Q, keys K and values V",
        "Compute matching scores QKᵀ (one per query–key pair)",
        "Divide the scores by √dₖ",
        "Add the mask (−∞ for padding or future positions)",
        "Row-wise softmax → weights that sum to 1",
        "Multiply the weights by V → contextual vectors"
      ]
    },
    "metric-formula": {
      "ch": 3,
      "type": "match",
      "title": "Metric Formulas",
      "intro": "Match each metric to its formula.",
      "pairs": [
        [
          "Accuracy",
          "(TP + TN) / all"
        ],
        [
          "Precision",
          "TP / (TP + FP)"
        ],
        [
          "Recall",
          "TP / (TP + FN)"
        ],
        [
          "F1",
          "2TP / (2TP + FP + FN)"
        ],
        [
          "Macro-F1",
          "Average of per-class F1, equal weight"
        ],
        [
          "Weighted F1",
          "Per-class F1 weighted by class support"
        ]
      ]
    },
    "pos-clues": {
      "ch": 4,
      "type": "bucket",
      "title": "Sources of Information",
      "intro": "Which information source does each tagging clue use? (Sentence: \"Janet will back the bill\".)",
      "buckets": [
        "Prior word/tag probability",
        "Neighboring words",
        "Morphology / word shape"
      ],
      "items": [
        [
          "\"will\" is usually an AUX",
          0
        ],
        [
          "\"Janet\" is always PROPN",
          0
        ],
        [
          "\"hesitantly\" is always ADV",
          0
        ],
        [
          "After \"the\", the next word is probably not a verb",
          1
        ],
        [
          "After AUX \"will\", a verb is likely",
          1
        ],
        [
          "Prefix un- → ADJ (unable)",
          2
        ],
        [
          "Suffix -ly → ADV (importantly)",
          2
        ],
        [
          "Capitalized → PROPN (Janet)",
          2
        ]
      ]
    },
    "entity-types": {
      "ch": 4,
      "type": "bucket",
      "title": "Entity Types",
      "intro": "Sort each mention into its entity type.",
      "buckets": [
        "PER",
        "ORG",
        "LOC",
        "GPE",
        "Not a named entity"
      ],
      "items": [
        [
          "Marie Curie",
          0
        ],
        [
          "Jane Villanueva",
          0
        ],
        [
          "Stanford University",
          1
        ],
        [
          "United Airlines Holding",
          1
        ],
        [
          "New York City",
          2,
          "The slides use LOC for \"New York City\"."
        ],
        [
          "Chicago (route)",
          2
        ],
        [
          "Boulder, Colorado",
          3
        ],
        [
          "the fare",
          4
        ],
        [
          "route",
          4
        ]
      ]
    },
    "w6-hmm-crf": {
      "ch": 6,
      "type": "bucket",
      "title": "HMM, CRF or Softmax Head?",
      "intro": "Which method does each statement describe?",
      "buckets": [
        "HMM",
        "Linear-chain CRF",
        "Contextual softmax head"
      ],
      "items": [
        [
          "Models the joint P(words, label path)",
          0
        ],
        [
          "Emission = P(word | tag)",
          0
        ],
        [
          "Trained by counting and normalizing tagged data",
          0
        ],
        [
          "P(Y|X) = exp(S) / Z(X)",
          1
        ],
        [
          "Scores can be any real number",
          1
        ],
        [
          "Loss = ln Z − gold score",
          1
        ],
        [
          "Argmax at each position separately",
          2
        ],
        [
          "zᵢ = W hᵢ + b, then softmax per token",
          2
        ]
      ]
    },
    "w6-viterbi": {
      "ch": 6,
      "type": "order",
      "title": "Viterbi on \"can fish\"",
      "intro": "Put the HMM Viterbi steps in order.",
      "items": [
        "At \"can\": start × emission for each tag → N 0.24, V 0.28",
        "At \"fish\", for ending tag N: max over predecessors of weight × transition",
        "Multiply by the emission P(fish | N) → 0.1344, store predecessor V",
        "Do the same for ending tag V → 0.0504, predecessor N",
        "Pick the larger final cell: N (0.1344)",
        "Backtrace the stored predecessor: V → N, so the path is VN"
      ]
    }
  }
};
Object.assign(window.COURSE, {
  "exam": {
    "title": "Midterm",
    "when": "9 Nov 2026",
    "scope": "weeks 1, 2, 3, 4, 6",
    "done": true,
    "parts": [
      [
        "Multiple choice",
        null,
        "Concepts, traps and easy hand calculations"
      ],
      [
        "Two open-ended",
        null,
        "About half a page each: verdict + mechanism; understand/compare and apply"
      ]
    ],
    "plan": [
      [
        "ozet.html",
        "Review MC traps and open-ended methods",
        25
      ],
      [
        "mock.html",
        "Practise 20 MC + 2 open-ended questions",
        35
      ],
      [
        "drill.html",
        "Recompute the calculations",
        20
      ]
    ]
  },
  "resources": [
    {
      "kind": "summary",
      "href": "ozet.html",
      "title": "Midterm özeti",
      "meta": "Türkçe · MC + 2 open-ended",
      "desc": "Exam traps, comparisons and short worked calculations with self-testing."
    },
    {
      "kind": "scenarios",
      "href": "senaryo.html",
      "title": "Senaryo soruları",
      "meta": "3 solved scenarios",
      "desc": "Situation → small calculation → decision, as on paper."
    },
    {
      "kind": "drill",
      "href": "drill.html",
      "title": "Hesap pratiği",
      "meta": "8 calculation types",
      "desc": "Easy numbers; new variants with step-by-step solutions."
    },
    {
      "kind": "mock",
      "href": "mock.html",
      "title": "Mock midterm",
      "meta": "20 MC + 2 open-ended",
      "desc": "Instant feedback for each choice; reveal short English model answers."
    },
    {
      "kind": "videos",
      "href": "videos.html",
      "title": "Study videos",
      "meta": "5 videos + 1 combined · 10 min",
      "desc": "One short, slow English video per week: big ideas only."
    }
  ]
});
