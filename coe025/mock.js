window.MOCK = [
  {
    "t": "W1",
    "q": "A model has never seen \"unhappiness\" during training. What does subword tokenization do?",
    "o": [
      "Replaces it with an [UNK] token and loses it",
      "Split it into known subwords",
      "Deletes the word from the input",
      "Adds the word to the vocabulary at test time"
    ],
    "answer": 1,
    "why": "That is the OOV problem. BPE, WordPiece and SentencePiece build rare words from frequent fragments, so almost nothing is unknown."
  },
  {
    "t": "W1",
    "q": "Doc 1 = \"The cat sat on the mat\", Doc 2 = \"The dog sat on the log\", vocabulary [the, cat, sat, on, mat, dog, log]. What is the BoW vector of Doc 1?",
    "o": [
      "[2,1,1,1,1,0,0]",
      "[1, 1, 1, 1, 1, 0, 0]",
      "[2, 0, 1, 1, 0, 1, 1]",
      "[0, 1, 0, 0, 1, 0, 0]"
    ],
    "answer": 0,
    "why": "\"the\" appears twice, cat/sat/on/mat once, dog and log zero times. Doc 2 is [2, 0, 1, 1, 0, 1, 1]."
  },
  {
    "t": "W1",
    "q": "Three documents all contain \"the\". Using IDF = log(N/df), IDF(\"the\") is…",
    "o": [
      "log(3) ≈ 1.099",
      "0",
      "3",
      "1/3"
    ],
    "answer": 1,
    "why": "A word that appears in every document carries no distinguishing information, so its IDF is log(1) = 0."
  },
  {
    "t": "W1",
    "q": "Why does \"bank\" need contextualized embeddings?",
    "o": [
      "Because \"bank\" is out of vocabulary",
      "Its meaning changes with context",
      "Because \"bank\" is a stop word",
      "Because static embeddings cannot store nouns"
    ],
    "answer": 1,
    "why": "Static Word2Vec/GloVe store one vector per word. ELMo (BiLSTM) and BERT/GPT (Transformers) compute a vector from the surrounding words."
  },
  {
    "t": "W2",
    "q": "Naive Bayes chooses the class that maximizes…",
    "o": [
      "P(text) × P(class | text)",
      "The distance to the margin",
      "σ(w·x + b)",
      "P(c) × P(text | c)"
    ],
    "answer": 3,
    "why": "P(class | text) ∝ P(class) × P(text | class). P(text) is the same for every class, so it can be ignored."
  },
  {
    "t": "W2",
    "q": "In the week-3 toy model (positive [good, bad, movie] totals [3, 0, 2], add-one smoothing, vocabulary 3), P(good | +) =",
    "o": [
      "3/5 = 0.6",
      "(3 + 1) / 5 = 0.8",
      "4/8 = 0.5",
      "1/8 = 0.125"
    ],
    "answer": 2,
    "why": "Add one to the count and the vocabulary size to the denominator: 5 tokens + 3 words = 8."
  },
  {
    "t": "W2",
    "q": "Weights [good: 0.8, bad: −1], bias −0.4, input [good, bad] = [2, 0]. What is z and the prediction at threshold 0.5?",
    "o": [
      "z = 1.2; positive",
      "z = 1.6, p ≈ 0.83 → positive",
      "z = −0.4, p ≈ 0.40 → negative",
      "z = 0.8, p ≈ 0.69 → positive"
    ],
    "answer": 0,
    "why": "0.8×2 − 1×0 − 0.4 = 1.2. 1/(1 + e^−1.2) ≈ 0.769 > 0.5."
  },
  {
    "t": "W2",
    "q": "What does an SVM optimize?",
    "o": [
      "The number of features",
      "The probability of each word",
      "Maximum margin",
      "The training time"
    ],
    "answer": 2,
    "why": "The boundary should be as far as possible from both classes. The closest points are the support vectors."
  },
  {
    "t": "W3",
    "q": "You must turn reviews into features for a test set. What is correct?",
    "o": [
      "Fit train; transform validation and test",
      "fit_transform(train) and fit_transform(test) separately",
      "fit_transform on train + test together, then split",
      "fit_transform(test) first because it has no labels"
    ],
    "answer": 0,
    "why": "Vocabulary and IDF are learned statistics. Learn them on training data only and reuse them, otherwise information leaks from the test set."
  },
  {
    "t": "W3",
    "q": "A CNN filter produced responses [0.20, 0.30, 0.95, 0.88, 0.82]. Max pooling and mean pooling give…",
    "o": [
      "0.63 and 0.95",
      "Max = 0.95; mean = 0.63",
      "0.95 and 3.15",
      "0.20 and 0.63"
    ],
    "answer": 1,
    "why": "Max = strongest signal. Mean = 3.15 / 5 = 0.63. Both discard the position."
  },
  {
    "t": "W3",
    "q": "Row scores [0, ln 2, 0] where position 3 is padding. After adding mask [0, 0, −∞] and softmax, the weights are…",
    "o": [
      "[1/3, 2/3, 0]",
      "[1/4, 1/2, 1/4]",
      "[0, 1, 0]",
      "[1/3, 1/3, 1/3]"
    ],
    "answer": 0,
    "why": "exp → [1, 2, 0]; normalize by 3. The padded key gets exactly zero weight, and the valid weights still sum to 1."
  },
  {
    "t": "W3",
    "q": "TP = 30, FN = 10, FP = 5, TN = 55. Precision, recall, F1?",
    "o": [
      "0.750, 0.857, 0.800",
      "0.850, 0.850, 0.850",
      "0.857, 0.750, 0.804",
      "P = 6/7; R = 3/4; F1 = 4/5"
    ],
    "answer": 3,
    "why": "P = 30/35. R = 30/40. F1 = 2·30 / (60 + 5 + 10) = 60/75 = 0.80. Accuracy = 85/100."
  },
  {
    "t": "W4",
    "q": "\"Book that flight\" vs \"Hand me that book\". What is \"book\" in each?",
    "o": [
      "NOUN, then VERB",
      "VERB; NOUN",
      "NOUN in both",
      "VERB in both"
    ],
    "answer": 1,
    "why": "Tagging is disambiguation: the same word type takes different tags in different contexts."
  },
  {
    "t": "W4",
    "q": "NER is harder than POS tagging mainly because of…",
    "o": [
      "Having more words per sentence",
      "Not having any training data",
      "Finding both boundaries and entity types",
      "Needing to translate"
    ],
    "answer": 2,
    "why": "Most words are not entities, spans can be multi-word, and \"Washington\" could be PER, ORG (team), LOC or GPE."
  },
  {
    "t": "W4",
    "q": "BIO tags for \"[PER Jane Villanueva] of [ORG United]\":",
    "o": [
      "B-PER I-PER O B-ORG",
      "Jane/I-PER Villanueva/I-PER of/O United/I-ORG",
      "Jane/B-PER Villanueva/B-PER of/O United/B-ORG",
      "Jane/PER Villanueva/PER of/O United/ORG"
    ],
    "answer": 0,
    "why": "B begins each span, I continues it, O is outside. B-PER B-PER would split Jane Villanueva into two people."
  },
  {
    "t": "W4",
    "q": "Which BIO sequence is INVALID?",
    "o": [
      "B-ORG I-ORG O",
      "B-PER B-PER",
      "O I-PER",
      "O B-LOC O"
    ],
    "answer": 2,
    "why": "An I- tag cannot follow O: spans must begin with B-. \"B-PER B-PER\" is valid (two adjacent one-word people)."
  },
  {
    "t": "W6",
    "q": "What does the label −100 do during training?",
    "o": [
      "Marks an outside-entity token",
      "Skip this loss target",
      "Adds a new entity category",
      "Gives the token a negative score"
    ],
    "answer": 1,
    "why": "O is a real modeled label. −100 is the ignore index of PyTorch cross-entropy."
  },
  {
    "t": "W6",
    "q": "3 gold spans, 4 predicted spans, 2 exact matches. F1 = ?",
    "o": [
      "2/4 = 0.50",
      "2/3 ≈ 0.667",
      "5/7 ≈ 0.714",
      "4/7"
    ],
    "answer": 3,
    "why": "TP 2, FP 4 − 2 = 2, FN 3 − 2 = 1. F1 = 2TP/(2TP + FP + FN) = 4/7. P = 0.50 and R = 0.667 are the two distractors."
  },
  {
    "t": "W6",
    "q": "\"can fish\": π(V) = 0.4, P(can|V) = 0.7, a(V,N) = 0.8, P(fish|N) = 0.6. The joint weight of path VN is…",
    "o": [
      "0.0504",
      "0.0432",
      "0.1344",
      "0.2448"
    ],
    "answer": 2,
    "why": "0.4 × 0.7 × 0.8 × 0.6 = 0.1344, the largest of the four paths. 0.2448 is P(words), the sum of all four."
  },
  {
    "t": "W6",
    "q": "Now add a(V,N) = ln 8. Path weights exp(S) are NN 2, NV 4, VN 8, VV 2. P(VN | words) = ?",
    "o": [
      "0.250",
      "0.125",
      "8/16 = 1/2",
      "0.800"
    ],
    "answer": 2,
    "why": "Z = 2 + 4 + 8 + 2 = 16, so 8/16. The transition changed the winner from NV to VN."
  },
  {
    "w": true,
    "t": "Understand and compare",
    "q": "A manager says that replacing unigram Naive Bayes with a larger classifier will necessarily fix order-sensitive review errors. Give a verdict and explain the mechanism. Compare a feature change with a model change.",
    "model": [
      "Verdict: no guarantee; inspect held-out errors first.",
      "Unigram counts discard order; identical counts give identical classifier inputs.",
      "Word bigrams expose local phrases; “not good” differs from “good not”.",
      "NB: class priors + word likelihoods; LR: conditional probability; SVM: margin.",
      "Sequence models can compose context; still require training evidence and validation.",
      "Compare quality, runtime and practical limits on the same task."
    ]
  },
  {
    "w": true,
    "t": "Apply",
    "q": "For “can fish”, a CRF has unary scores can:(N ln 2,V 0), fish:(N 0,V ln 2). Only transition V→N scores ln 8; all other and start/end scores are zero. Compute each path weight, Z, the winning path and its probability. If gold is VN, give the loss. Explain what changing V→N to ln 2 does.",
    "model": [
      "S = unary₁ + unary₂ + transition; weight = exp(S).",
      "NN=2; NV=4; VN=8; VV=2. Z=16.",
      "Verdict: VN wins; P(VN|X)=8/16=1/2.",
      "Gold VN loss=−ln(1/2)=ln 2.",
      "Changed V→N=ln 2: weights 2,4,2,2; Z=10.",
      "NV now wins with 4/10; compatibility is a preference, not a hard rule."
    ]
  }
];
(()=>{const host=document.getElementById('questions');MOCK.forEach((q,i)=>{const s=document.createElement('section');s.className='panel';const h=document.createElement('h2');h.textContent=(i+1)+'. '+q.t;s.append(h);const p=document.createElement('p');p.textContent=q.q;s.append(p);if(q.w){const ta=document.createElement('textarea');ta.setAttribute('aria-label','Your answer '+(i+1));ta.rows=6;s.append(ta);const d=document.createElement('details'),sum=document.createElement('summary');sum.textContent='Show model answer';d.append(sum);const ul=document.createElement('ul');q.model.forEach(line=>{const li=document.createElement('li');li.textContent=line;ul.append(li)});d.append(ul);s.append(d)}else{const fb=document.createElement('p');fb.className='feedback';fb.setAttribute('aria-live','polite');CS.shuffle(q.o.map((text,k)=>({text,k}))).forEach(o=>{const b=document.createElement('button');b.className='opt';b.textContent=o.text;b.onclick=()=>{s.querySelectorAll('button').forEach(x=>x.classList.remove('right','wrong'));b.classList.add(o.k===q.answer?'right':'wrong');fb.textContent=(o.k===q.answer?'Correct. ':'Incorrect. ')+q.why;CS.srs.grade(CS.srs.qId(COURSE.id,Number(q.t.slice(1)),q.q),o.k===q.answer)};s.append(b)});s.append(fb)}host.append(s)})})();
