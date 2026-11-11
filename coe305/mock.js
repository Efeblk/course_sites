/* New midterm practice: supplied topic notes, using the question styles visible in the old papers.
 * Exact midterm format is unconfirmed. Instant feedback; no formula-writing requirement. */
(() => {
const items = [
  {
    "week": 1,
    "topic": "Learning types",
    "q": "Customer segmentation in CRM is an example of…",
    "options": [
      "Classification into known classes",
      "Regression",
      "Clustering (unsupervised)",
      "Reinforcement learning"
    ],
    "answer": 2,
    "explain": "Week 1, slide 15: clustering groups similar customers without any desired output."
  },
  {
    "week": 1,
    "topic": "Learning types",
    "q": "A robot in a maze gets no correct answer per move, only a delayed reward at the end. Which kind of learning?",
    "options": [
      "Supervised learning",
      "Unsupervised learning",
      "Learning association rules",
      "Reinforcement learning"
    ],
    "answer": 3,
    "explain": "Week 1, slide 16: no supervised output but delayed reward; the robot learns a policy."
  },
  {
    "week": 4,
    "topic": "Parametric",
    "q": "By slide 2 of the clustering deck, a nonparametric method…",
    "options": [
      "Has no predefined mapping function",
      "Has no parameters of any kind to learn",
      "Works only with labelled training examples",
      "Always grows a decision tree from the data"
    ],
    "answer": 0,
    "explain": "Parametric: learning using a predefined mapping function/assumptions. Nonparametric: without them."
  },
  {
    "week": 4,
    "topic": "Parametric",
    "q": "Linear regression fixes the form y = wx + w₀ before learning and only learns w and w₀. By the slide's definition it is…",
    "options": [
      "Nonparametric",
      "Parametric",
      "Unsupervised",
      "Reinforcement learning"
    ],
    "answer": 1,
    "explain": "The mapping function is predefined; learning fills in its parameters."
  },
  {
    "week": 3,
    "topic": "Selection vs extraction",
    "q": "From five student features we keep GPA, Attendance and Study Hours. This is…",
    "options": [
      "Feature extraction",
      "PCA",
      "Feature selection",
      "Clustering"
    ],
    "answer": 2,
    "explain": "Week 3, slide 6: the kept features are still the original columns. Selection selects."
  },
  {
    "week": 3,
    "topic": "Selection vs extraction",
    "q": "z₁ = 0.6·Height + 0.8·Weight replaces the two features. This is…",
    "options": [
      "Feature selection",
      "Feature extraction",
      "Subset selection",
      "A new class label for x"
    ],
    "answer": 1,
    "explain": "Week 3, slide 7: a new feature built from the original ones. Extraction transforms."
  },
  {
    "week": 3,
    "topic": "PCA",
    "q": "What does PCA treat as the \"information\" it tries to keep?",
    "options": [
      "The class labels of every example",
      "The number of original features",
      "The smallest values in each column",
      "Variance: how much the data vary"
    ],
    "answer": 3,
    "explain": "Week 3, slide 10: directions with larger variance are taken to hold more information. Find w that maximizes Var(z)."
  },
  {
    "week": 4,
    "topic": "Hard vs soft clustering",
    "q": "A clustering model assigns memberships 0.7 in A and 0.3 in B to the same point. This is…",
    "options": [
      "Soft clustering with probabilistic memberships",
      "Hard clustering with one fixed assignment",
      "Supervised learning with two target labels",
      "Feature selection keeping two input columns"
    ],
    "answer": 0,
    "explain": "Soft clustering gives membership probabilities across clusters. k-means makes hard assignments; EM with a Gaussian mixture uses soft memberships."
  },
  {
    "week": 5,
    "topic": "Entropy",
    "q": "Which node has the highest entropy?",
    "options": [
      "4 yes, 0 no",
      "6 yes, 2 no",
      "9 yes, 5 no",
      "3 yes, 3 no"
    ],
    "answer": 3,
    "explain": "A fifty-fifty node is the most impure: entropy 1 for two classes, the top of slide 4's curve. A pure node has entropy 0."
  },
  {
    "week": 5,
    "topic": "Entropy",
    "q": "ID3 chooses the attribute whose split gives…",
    "options": [
      "The highest weighted entropy",
      "The lowest weighted entropy",
      "The most branches",
      "The largest parent entropy"
    ],
    "answer": 1,
    "explain": "Week 5, slide 11: Outlook 0.694 is the lowest, so Outlook is the first question. Lower entropy = purer children."
  },
  {
    "week": 6,
    "topic": "Bias",
    "q": "In y = ax + b, why is the bias b useful?",
    "options": [
      "It shifts the boundary off the origin",
      "It makes training converge much faster",
      "It keeps every output positive",
      "It stores the learning rate"
    ],
    "answer": 0,
    "explain": "Without w₀ the line w₁x₁ + w₂x₂ = 0 always passes through (0, 0). The bias moves it."
  },
  {
    "week": 6,
    "topic": "Transpose",
    "q": "x is a column of 5 features. What is xᵀ?",
    "options": [
      "A 5 × 5 table of products",
      "One number, the sum of entries",
      "A column of the 5 squared entries",
      "A row with the same 5 entries"
    ],
    "answer": 3,
    "explain": "Transpose turns columns into rows. That is why wᵀx (row times column) is one number."
  },
  {
    "week": 6,
    "topic": "Activation functions",
    "q": "A model must answer spam or not spam. Which output fits?",
    "options": [
      "Softmax over ten outputs",
      "One sigmoid output",
      "A ReLU output",
      "A linear output"
    ],
    "answer": 1,
    "explain": "Two classes: one sigmoid output in (0, 1), read as the probability of spam (slide 10)."
  },
  {
    "week": 6,
    "topic": "Activation functions",
    "q": "When does slide 10 use softmax outputs?",
    "options": [
      "When there are K > 2 classes",
      "When the output is a car price",
      "When there are no labels at all",
      "When the data are not scaled"
    ],
    "answer": 0,
    "explain": "K > 2: softmax gives K probabilities that sum to 1; choose the class with the largest (slide 7)."
  },
  {
    "week": 6,
    "topic": "Activation functions",
    "q": "Are activation functions used before training or during training?",
    "options": [
      "Before training, to scale the data",
      "Only after training, on test data",
      "Only inside the loss function",
      "In every forward pass"
    ],
    "answer": 3,
    "explain": "They are part of the network: the forward pass applies them (slides 26 and 27) and backpropagation uses their derivative (slide 29)."
  },
  {
    "week": 6,
    "topic": "Activation functions",
    "q": "In slide 15's XOR network, what if the hidden units had no activation and output their plain sums?",
    "options": [
      "It still solves XOR, just more slowly",
      "It reduces to one line and fails",
      "It trains faster and exactly",
      "It turns into a softmax"
    ],
    "answer": 1,
    "explain": "A sum of weighted sums is again one weighted sum: one line. Slide 13 shows one line cannot do XOR."
  },
  {
    "week": 6,
    "topic": "Learning rate",
    "q": "What does the learning factor / learning rate η control?",
    "options": [
      "The number of hidden units used",
      "The number of classes",
      "The size of each weight update",
      "The amount of training data"
    ],
    "answer": 2,
    "explain": "w ← w − η·∂E/∂w: η scales the step. Slide 20: 0.8 − 0.1 × 1.05 = 0.695."
  },
  {
    "week": 6,
    "topic": "Learning rate",
    "q": "The learning rate is set far too large. What can happen?",
    "options": [
      "The weights never change at all",
      "Training reaches the minimum in one step",
      "Steps overshoot and E grows",
      "The model gains a hidden layer"
    ],
    "answer": 2,
    "explain": "Too big a step overshoots. On slide 17's example η = 1.0 sends w from 0.8 to −0.25 to 1.06, further away every time."
  }
];

const written = [
  {
    "week": 1,
    "topic": "Learning types",
    "q": "Draw a labelled map of supervised, unsupervised and reinforcement learning. State the feedback available and one course example for each.",
    "hint": "İpucu: üç dal çiz; label, input veya reward bilgisini ve bir örneği ekle.",
    "a": [
      "Supervised: inputs + target labels. Classification: credit risk; regression: used-car price.",
      "Unsupervised: inputs without labels. Example: customer segmentation.",
      "Reinforcement: actions + delayed reward; learn a policy. Example: maze robot."
    ],
    "figure": {
      "type": "graph",
      "t": "Learning types and their feedback",
      "w": 760,
      "h": 230,
      "nodes": {
        "ml": [
          380,
          35,
          "Machine Learning",
          "c3"
        ],
        "s": [
          130,
          180,
          "Supervised",
          "c0"
        ],
        "u": [
          380,
          180,
          "Unsupervised",
          "c1"
        ],
        "r": [
          630,
          180,
          "Reinforcement",
          "c2"
        ]
      },
      "edges": [
        [
          "ml",
          "s",
          "target labels"
        ],
        [
          "ml",
          "u",
          "inputs only"
        ],
        [
          "ml",
          "r",
          "rewards"
        ]
      ]
    }
  },
  {
    "week": 4,
    "topic": "Parametric",
    "q": "Compare parametric and nonparametric learning with one example each. Does nonparametric mean there are no parameters?",
    "hint": "İpucu: öğrenmeden önce belirlenen şey, modelin biçimi mi?",
    "a": [
      "Parametric: predefined mapping form; learn parameters. Example: linear regression weights.",
      "Nonparametric: no predefined mapping form in the course definition; learn structure. Example: decision tree.",
      "Nonparametric does not mean parameter-free."
    ]
  },
  {
    "week": 4,
    "topic": "Hard vs soft clustering",
    "q": "Compare hard and soft clustering. Illustrate one point’s memberships in two clusters with a labelled example.",
    "hint": "İpucu: tek cluster’a kesin seçim ile olasılıklı üyeliği göster.",
    "a": [
      "Hard: one cluster per instance. Example: k-means.",
      "Soft: probabilities across clusters. Example: EM / Gaussian mixture.",
      "Illustration: hard A=1, B=0; soft A=0.7, B=0.3. Neither requires target class labels."
    ],
    "figure": {
      "type": "boxes",
      "head": [
        "Cluster A",
        "Cluster B"
      ],
      "rows": [
        {
          "label": "Hard",
          "cells": [
            [
              "1",
              "c0"
            ],
            [
              "0",
              "mute"
            ]
          ]
        },
        {
          "label": "Soft",
          "cells": [
            [
              "0.7",
              "c0"
            ],
            [
              "0.3",
              "c1"
            ]
          ]
        }
      ]
    }
  },
  {
    "week": 3,
    "topic": "Selection vs extraction",
    "q": "Compare feature selection and extraction using the student-feature and height–weight examples. Explain why dimensionality reduction can help.",
    "hint": "İpucu: orijinal sütunları tutmak ile yeni koordinat üretmek farklı.",
    "a": [
      "Selection: keep original columns, e.g. GPA and study hours.",
      "Extraction: construct coordinates, e.g. a height–weight combination; PCA.",
      "Fewer features: lower measurement, storage and computation costs; useful information may also be lost."
    ]
  },
  {
    "week": 3,
    "topic": "PCA",
    "q": "Explain what PCA means and what it tries to preserve. Does retaining 97.77% of the variance mean 97.77% classification accuracy?",
    "hint": "İpucu: yeni eksenler, yayılım ve label kullanımını ayır.",
    "a": [
      "PCA: feature extraction into fewer dimensions.",
      "Centre data; choose axes retaining maximum projection variance.",
      "Uses no class labels. Explained variance is spread retained, not classification accuracy."
    ]
  },
  {
    "week": 5,
    "topic": "Entropy",
    "q": "Compare the entropy of a node with 20 A and 0 B against a node with 10 A and 10 B. Explain the difference without logarithm calculations.",
    "hint": "İpucu: pure ile fifty-fifty; burada iki class var.",
    "a": [
      "20 A / 0 B: pure node; entropy 0.",
      "10 A / 10 B: maximum two-class impurity; entropy 1 bit.",
      "A useful split lowers weighted child entropy."
    ]
  },
  {
    "week": 6,
    "topic": "Bias",
    "q": "In y = ax + b, explain why b is needed and what bias shifting means. Use the AND/OR example to distinguish weights from bias.",
    "hint": "İpucu: bias yokken orijin; weight yönü, bias konumu belirler.",
    "a": [
      "b = bias w₀. Without bias, the line / boundary must pass through the origin.",
      "Changing bias shifts the boundary; weights determine its direction.",
      "AND/OR example: w₁=w₂=1; bias −1.5 versus −0.5."
    ]
  },
  {
    "week": 6,
    "topic": "Transpose",
    "q": "A feature vector is a column with three entries. Show its transpose, then explain whether wᵀx is a vector or one number.",
    "hint": "İpucu: 3×1 sütun → 1×3 satır; row × column.",
    "a": [
      "Transpose: [x₁, x₂, x₃] as a row; 3×1 → 1×3.",
      "wᵀx: matching products added; one number."
    ]
  },
  {
    "week": 6,
    "topic": "Activation functions",
    "q": "A model predicts spam/not spam; another predicts one of three classes. Choose the output activation for each and explain why. Are activations applied before training or during the network’s operation?",
    "hint": "İpucu: input feature sayısı değil output class sayısı; training ve prediction.",
    "a": [
      "Binary: one sigmoid output, probability of class 1.",
      "Multiclass: softmax probabilities, sum to 1; choose the largest.",
      "Activations operate in forward passes during training and prediction; backpropagation uses derivatives.",
      "Other common activations: tanh and ReLU."
    ]
  },
  {
    "week": 6,
    "topic": "Learning rate",
    "q": "Explain the learning factor / learning rate. Compare a very small value with an excessively large value and explain why a larger value need not train better.",
    "hint": "İpucu: adım boyu, slow convergence ve overshoot.",
    "a": [
      "Learning rate η: scale / step size of each weight update.",
      "Too small: slow convergence. Too large: overshoot; error can grow.",
      "A larger step is not a guarantee of lower error."
    ]
  }
];

const el = (tag, text, cls) => { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; };
const root = document.getElementById('exam');
items.forEach((q, i) => {
  const s = el('section', undefined, 'qcard');
  s.append(el('p', q.topic, 'small muted'), el('h2', (i + 1) + '. ' + q.q));
  const opts = el('div', undefined, 'options'), fb = el('p', undefined, 'feedback');
  fb.hidden = true; fb.setAttribute('aria-live', 'polite');
  q.options.forEach((o, k) => {
    const b = el('button', o); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.onclick = () => {
      opts.querySelectorAll('button').forEach((x) => { x.disabled = true; x.setAttribute('aria-pressed', String(x === b)); });
      fb.hidden = false;
      fb.textContent = (k === q.answer ? 'Correct. ' : 'Incorrect. Correct answer: ' + q.options[q.answer] + '. ') + q.explain;
      fb.className = 'feedback ' + (k === q.answer ? 'ok' : 'bad');
      CS.srs.grade(CS.srs.qId(COURSE.id, q.week, q.q), k === q.answer);
    };
    opts.append(b);
  });
  s.append(opts, fb); root.append(s);
});
root.append(el('h2', 'Explain in a few lines'));
written.forEach((q, i) => {
  const n = items.length + i + 1, s = el('section', undefined, 'qcard');
  s.append(el('p', q.topic, 'small muted'), el('h2', n + '. ' + q.q), el('p', q.hint, 'small muted'));
  const input = el('textarea'); input.setAttribute('aria-label', 'Your answer to question ' + n);
  const b = el('button', 'Show model answer'), a = el('div', undefined, 'model');
  a.id = 'model-' + i; a.hidden = true; q.a.forEach((x) => a.append(el('p', x)));
  if (q.figure) a.append(CS.figure(q.figure));
  if (q.figure?.type === 'graph') a.append(el('p', 'Scroll sideways in the diagram to see all branches.', 'diagram-hint'));
  b.type = 'button'; b.setAttribute('aria-controls', a.id); b.setAttribute('aria-expanded', 'false');
  b.onclick = () => { a.hidden = !a.hidden; b.textContent = a.hidden ? 'Show model answer' : 'Hide model answer'; b.setAttribute('aria-expanded', String(!a.hidden)); };
  s.append(input, b, a); root.append(s);
});
window.COE305_MOCK = { items, written };
})();
