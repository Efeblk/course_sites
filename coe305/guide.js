/* Guided weeks. The shared engine shuffles checks and appends final practice. */
window.GUIDE = {
  "1": {
    "goal": "choose a learning task from the available feedback and explain the credit and basket examples.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Five weeks connect tasks, data and models",
        "key": "Start with the <b>learning task</b>; then choose a representation and evaluate a model.",
        "fig": {
          "type": "flow",
          "t": "Weeks 1–5: the study route",
          "items": [
            [
              "",
              "1 · Choose the task",
              "What is learned from the examples?",
              "c0"
            ],
            [
              "",
              "2 · Fit and evaluate",
              "How well does a hypothesis generalize?",
              "c1"
            ],
            [
              "",
              "3 · Reduce features",
              "Which representation should we use?",
              "c2"
            ],
            [
              "",
              "4 · Discover groups",
              "What structure exists without labels?",
              "c3"
            ],
            [
              "",
              "5 · Build a tree",
              "Which questions predict an output?",
              "c0"
            ]
          ]
        },
        "html": "<p>Week 1 asks what a computer can learn from examples. Week 2 turns labelled examples into hypotheses and checks new-data error. Week 3 changes the features. Week 4 finds groups without labels. Week 5 learns a sequence of questions that predicts a class or a number.</p><p>Follow this route with the course examples: shopping baskets, family cars, height and weight, clusters, and Play Tennis.</p>",
        "check": {
          "q": "Which week asks how to represent data using fewer features?",
          "o": [
            "Week 3",
            "Week 1",
            "Week 5"
          ],
          "why": "Dimensionality reduction changes the feature representation."
        }
      },
      {
        "t": "Learning helps when explicit rules are unavailable",
        "key": "<b>Machine learning</b> optimizes a performance criterion using examples or past experience.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Normal programming",
              "pts": [
                "rules + data → answers",
                "a human writes IF … THEN …"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Machine learning",
              "pts": [
                "data + answers → rules (a model)",
                "the computer learns from examples"
              ],
              "c": "c1"
            }
          ],
          "cap": "We need learning when nobody can write the rules: there is no expert (Mars), the expert cannot explain it (speech), things change (routing), or it must adapt to each user."
        },
        "html": "<p>A model is a useful approximation learned from examples. Learning helps when expertise does not exist (Mars), cannot be explained (speech), changes over time (routing), or must adapt to individuals (biometrics).</p><p>Payroll has fixed known rules, so direct programming is sufficient. Statistics supplies inference from a sample; computer science supplies efficient optimization and model evaluation.</p>",
        "check": {
          "q": "Which task has fixed rules in the lecture?",
          "o": [
            "Payroll",
            "Speech recognition",
            "Changing network routing"
          ],
          "why": "Known payroll rules can be programmed directly."
        }
      },
      {
        "t": "An association conditions on the baskets containing X",
        "key": "An <b>association</b> uses P(Y | X), with X in the denominator.",
        "fig": {
          "type": "boxes",
          "t": "10 baskets that contain a computer",
          "rows": [
            {
              "cells": [
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "c1"
                ],
                [
                  "",
                  "mute"
                ],
                [
                  "",
                  "mute"
                ],
                [
                  "",
                  "mute"
                ]
              ]
            }
          ],
          "cap": "7 of the 10 also have a mouse, so P(mouse | computer) = 7/10 = 0.7. That is <b>not</b> the same as P(computer | mouse)."
        },
        "html": "<p>Of ten computer baskets, seven also contain a mouse. P(mouse | computer) = 7/10 = 0.7.</p><div class=\"callout warn\">Reversing X and Y changes the denominator. P(Y | X) need not equal P(X | Y).</div>",
        "check": {
          "q": "Of 20 bread baskets, 5 contain butter. What is P(butter | bread)?",
          "o": [
            "0.25",
            "0.5",
            "4"
          ],
          "why": "Divide 5 by the 20 baskets in the condition."
        },
        "lab": {
          "href": "w1/basket.html",
          "todo": [
            "Load the <b>Computer shop</b> baskets.",
            "Click the cell (X = computer, Y = mouse) and read P(mouse | computer).",
            "Now click the opposite cell (X = mouse, Y = computer). It's different — check why."
          ]
        }
      },
      {
        "t": "A supervised example includes its desired output",
        "key": "<b>Classification</b> predicts a class; <b>regression</b> predicts a number.",
        "fig": {
          "type": "plot",
          "t": "Credit scoring: IF income > θ₁ AND savings > θ₂ THEN low-risk",
          "w": 520,
          "h": 300,
          "x": [
            0,
            10
          ],
          "y": [
            0,
            10
          ],
          "xl": "income",
          "yl": "savings",
          "rects": [
            {
              "x0": 4,
              "y0": 4.5,
              "x1": 10,
              "y1": 10,
              "c": "c1",
              "label": "low-risk"
            }
          ],
          "pts": [
            [
              6,
              7,
              "c1"
            ],
            [
              7.5,
              8.5,
              "c1"
            ],
            [
              8.5,
              6,
              "c1"
            ],
            [
              6.5,
              5.5,
              "c1"
            ],
            [
              9,
              9,
              "c1"
            ],
            [
              2,
              3,
              "c4"
            ],
            [
              3,
              7,
              "c4"
            ],
            [
              1.5,
              8,
              "c4"
            ],
            [
              6,
              2,
              "c4"
            ],
            [
              8,
              1.5,
              "c4"
            ],
            [
              2.5,
              1.2,
              "c4"
            ]
          ],
          "texts": [
            [
              4,
              0.5,
              "θ₁",
              "c2"
            ],
            [
              0.6,
              4.9,
              "θ₂",
              "c2"
            ]
          ],
          "cap": "Green = paid back (low-risk), coral = did not. \"Learning\" means choosing θ₁ and θ₂ from past data."
        },
        "html": "<p>Credit scoring uses income and savings to predict low or high risk. The rectangular rule predicts low risk only when both thresholds are exceeded. Learning chooses those thresholds.</p><p>Used-car regression predicts price from mileage with y = wx + w₀. Learning chooses slope w and intercept w₀.</p><p>Supervised models support prediction, readable knowledge, compression into a simpler rule, and detection of exceptions such as fraud.</p>",
        "check": {
          "q": "What makes used-car price prediction regression?",
          "o": [
            "The output is numeric",
            "The input has mileage",
            "The model uses examples"
          ],
          "why": "The type of output distinguishes regression from classification."
        },
        "lab": {
          "href": "w1/credit.html",
          "todo": [
            "Section 1: click the plot to place the corner (θ₁, θ₂). Count the red points inside your \"low-risk\" corner (false positives) and green outside (false negatives).",
            "Click <b>Learn best θ₁, θ₂</b> and compare with your choice.",
            "Section 2: drag w and w₀ for the used-car line, then click <b>Least-squares fit</b>."
          ]
        }
      },
      {
        "t": "Labels, structure and reward lead to different tasks",
        "key": "The available <b>feedback</b> determines the learning problem.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Supervised",
              "pts": [
                "input + correct output",
                "learn input → output",
                "credit scoring, car price"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Unsupervised",
              "pts": [
                "input only",
                "find structure / groups",
                "customer segments"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Reinforcement",
              "pts": [
                "reward after many actions",
                "learn a policy",
                "games, robot in a maze"
              ],
              "c": "c2"
            }
          ]
        },
        "html": "<p>Supervised data provides the desired output. Unsupervised data provides inputs alone: customer segmentation and colour quantisation discover groups. Reinforcement learning uses delayed reward to learn a policy, as in a robot maze.</p><div class=\"callout warn\">A cluster is discovered; its class name is not supplied as a training target.</div><p>This completes the first part of the course map. Week 2 now studies how to fit and evaluate a supervised model; week 4 returns to unlabelled groups.</p>",
        "check": {
          "q": "A maze robot receives a reward at the exit. Which kind of feedback is this?",
          "o": [
            "Delayed reward",
            "A class label for every action",
            "No feedback of any kind"
          ],
          "why": "Reinforcement learning connects actions to a later reward."
        }
      }
    ]
  },
  "2": {
    "goal": "relate hypotheses, error, complexity and held-out evaluation.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Where week 2 fits in the course",
        "key": "<b>Supervised Learning</b> answers the next question in our study route.",
        "fig": {
          "type": "flow",
          "t": "From earlier weeks to this week",
          "items": [
            [
              "",
              "1 · Choose a learning task",
              "Examples and the kind of output",
              "c0"
            ],
            [
              "",
              "2 · Supervised Learning",
              "Week 1 identified labelled tasks. Week 2 asks how a hypothesis learned from those examples will perform on new cases.",
              "c1"
            ],
            [
              "",
              "Next · feature representation",
              "Choose useful inputs before fitting",
              "c2"
            ]
          ]
        },
        "html": "<p>Week 1 identified labelled tasks. Week 2 asks how a hypothesis learned from those examples will perform on new cases.</p>",
        "check": {
          "q": "What is the main evaluation target?",
          "o": [
            "New-data performance",
            "Memorizing the training labels",
            "Counting features only"
          ],
          "why": "Week 1 identified labelled tasks. Week 2 asks how a hypothesis learned from those examples will perform on new cases."
        }
      },
      {
        "t": "A hypothesis draws a boundary around family cars",
        "key": "A <b>hypothesis class H</b> is the set of models we search.",
        "fig": {
          "type": "plot",
          "w": 520,
          "h": 300,
          "x": [
            0,
            10
          ],
          "y": [
            0,
            10
          ],
          "xl": "x₁ = price",
          "yl": "x₂ = engine power",
          "rects": [
            {
              "x0": 3,
              "y0": 3,
              "x1": 7,
              "y1": 7,
              "c": "c1",
              "label": "h: a rectangle"
            }
          ],
          "pts": [
            [
              4,
              4.5,
              "c1"
            ],
            [
              5,
              5.5,
              "c1"
            ],
            [
              6,
              4,
              "c1"
            ],
            [
              4.5,
              6.2,
              "c1"
            ],
            [
              5.8,
              6.4,
              "c1"
            ],
            [
              1.5,
              2,
              "c4"
            ],
            [
              8.5,
              8,
              "c4"
            ],
            [
              2,
              8.5,
              "c4"
            ],
            [
              8.5,
              2,
              "c4"
            ],
            [
              5,
              9,
              "c4"
            ],
            [
              9,
              5,
              "c4"
            ]
          ],
          "cap": "Green = family car (r = 1), coral = not (r = 0). The hypothesis class H is all axis-aligned rectangles; each rectangle is one hypothesis h."
        },
        "html": "<p>A car has price x₁ and engine power x₂. Its label r is 1 for a family car, otherwise 0. Each axis-aligned rectangle is one hypothesis h in H: inside predicts 1, outside predicts 0.</p><p>Empirical error E(h | X) = Σ 1(h(xᵗ) ≠ rᵗ) counts training mistakes.</p><div class=\"callout warn\">False positive: predict 1 when r = 0. False negative: predict 0 when r = 1.</div>",
        "check": {
          "q": "A sports car is predicted to be a family car. What is the mistake?",
          "o": [
            "False positive",
            "False negative",
            "True positive"
          ],
          "why": "The prediction is positive but the actual label is negative."
        }
      },
      {
        "t": "Many boundaries can agree with the same examples",
        "key": "The <b>version space</b> contains hypotheses consistent with the training data.",
        "fig": {
          "type": "plot",
          "w": 520,
          "h": 300,
          "x": [
            0,
            10
          ],
          "y": [
            0,
            10
          ],
          "xl": "price",
          "yl": "engine power",
          "rects": [
            {
              "x0": 1.8,
              "y0": 2.3,
              "x1": 8.2,
              "y1": 8.6,
              "c": "c0",
              "label": "G (most general)"
            },
            {
              "x0": 3.9,
              "y0": 3.9,
              "x1": 6.1,
              "y1": 6.5,
              "c": "c1",
              "label": "S"
            }
          ],
          "pts": [
            [
              4,
              4.5,
              "c1"
            ],
            [
              5,
              5.5,
              "c1"
            ],
            [
              6,
              4,
              "c1"
            ],
            [
              4.5,
              6.4,
              "c1"
            ],
            [
              1.5,
              2,
              "c4"
            ],
            [
              8.5,
              8,
              "c4"
            ],
            [
              1.4,
              8.8,
              "c4"
            ],
            [
              8.6,
              2,
              "c4"
            ],
            [
              5,
              9,
              "c4"
            ],
            [
              9,
              5,
              "c4"
            ]
          ],
          "cap": "The version space is everything between S and G."
        },
        "html": "<p>S tightly surrounds the positive examples. The general boundary G permits a larger consistent region without including negatives. The lecture illustrates consistent rectangles between these boundaries.</p><p>A larger margin puts the boundary farther from nearby training instances. Zero training mistakes alone does not identify a unique boundary: assumptions about H supply an inductive bias.</p>",
        "check": {
          "q": "Does zero training error uniquely determine the boundary?",
          "o": [
            "No, several hypotheses may fit",
            "Yes, always",
            "Only negative examples matter"
          ],
          "why": "Unseen locations can receive different predictions from consistent hypotheses."
        },
        "lab": {
          "href": "w2/hypothesis.html",
          "todo": [
            "Load <b>Slide cars A–E</b>. Drag a rectangle and read the error table (which cars are FP / FN).",
            "Click <b>S</b>, then <b>G</b>, and see the version space between them.",
            "Click <b>h = largest margin</b>. Then switch to the bigger training set and repeat."
          ]
        }
      },
      {
        "t": "Numeric predictions need a numeric loss",
        "key": "<b>MSE</b> averages squared residuals; <b>MAE</b> averages their magnitudes.",
        "fig": {
          "type": "plot",
          "t": "Used-car price vs mileage",
          "w": 520,
          "h": 300,
          "x": [
            0,
            10
          ],
          "y": [
            0,
            10
          ],
          "xl": "mileage",
          "yl": "price",
          "pts": [
            [
              1,
              8.6,
              "c0"
            ],
            [
              2,
              7.4,
              "c0"
            ],
            [
              3,
              7.1,
              "c0"
            ],
            [
              4,
              5.6,
              "c0"
            ],
            [
              5,
              5.2,
              "c0"
            ],
            [
              6,
              4.1,
              "c0"
            ],
            [
              7,
              3.6,
              "c0"
            ],
            [
              8,
              2.4,
              "c0"
            ],
            [
              9,
              2.2,
              "c0"
            ]
          ],
          "lines": [
            {
              "pts": [
                [
                  0.5,
                  8.9
                ],
                [
                  9.5,
                  1.7
                ]
              ],
              "c": "c1",
              "label": "linear: w₁x + w₀"
            },
            {
              "pts": [
                [
                  0.5,
                  9.2
                ],
                [
                  2,
                  7.6
                ],
                [
                  4,
                  5.7
                ],
                [
                  6,
                  4.2
                ],
                [
                  8,
                  2.9
                ],
                [
                  9.5,
                  2.1
                ]
              ],
              "c": "c2",
              "dash": true,
              "label": "quadratic"
            }
          ],
          "cap": "One-vs-rest for K classes: train K classifiers, each with its own class against all the others."
        },
        "html": "<p>Fit g(x) to a noisy target r = f(x) + ε. A line uses g(x) = w₁x + w₀. For residuals −5, 2, 5, −5, 3:</p><ol><li>MAE = (5 + 2 + 5 + 5 + 3)/5 = 4.</li><li>MSE = (25 + 4 + 25 + 25 + 9)/5 = 17.6.</li></ol><div class=\"callout warn\">Signed errors can cancel. Squaring or taking absolute values prevents cancellation.</div>",
        "check": {
          "q": "What is the MSE for these five residuals?",
          "o": [
            "17.6",
            "4",
            "0"
          ],
          "why": "The squared residuals sum to 88; divide by 5."
        }
      },
      {
        "t": "Extra complexity can start fitting noise",
        "key": "<b>Overfitting</b> lowers training error while harming generalization.",
        "fig": {
          "type": "plot",
          "w": 540,
          "h": 300,
          "x": [
            1,
            9
          ],
          "y": [
            0,
            10
          ],
          "xl": "model complexity (e.g. polynomial degree) →",
          "yl": "error",
          "lines": [
            {
              "pts": [
                [
                  1,
                  9
                ],
                [
                  2,
                  6.5
                ],
                [
                  3,
                  4.6
                ],
                [
                  4,
                  3.3
                ],
                [
                  5,
                  2.4
                ],
                [
                  6,
                  1.7
                ],
                [
                  7,
                  1.2
                ],
                [
                  8,
                  0.8
                ],
                [
                  9,
                  0.5
                ]
              ],
              "c": "c0",
              "label": "training error"
            },
            {
              "pts": [
                [
                  1,
                  9.4
                ],
                [
                  2,
                  7.2
                ],
                [
                  3,
                  5.6
                ],
                [
                  4,
                  4.7
                ],
                [
                  5,
                  4.6
                ],
                [
                  6,
                  5.2
                ],
                [
                  7,
                  6.3
                ],
                [
                  8,
                  7.6
                ],
                [
                  9,
                  9
                ]
              ],
              "c": "c4",
              "label": "validation error"
            }
          ],
          "texts": [
            [
              2,
              1.5,
              "underfitting",
              "c0"
            ],
            [
              4.6,
              3.6,
              "sweet spot",
              "c1"
            ],
            [
              8,
              4.5,
              "overfitting",
              "c4"
            ]
          ],
          "cap": "Triple trade-off: model complexity, amount of training data, and error on new data."
        },
        "html": "<p>A line can underfit a curved relationship. A high-degree polynomial can follow noise. The useful complexity lies between these extremes.</p><p>The triple trade-off connects complexity c(H), sample size N and new-data error E. The lecture shows error first falling and then rising with complexity; more training examples can reduce error.</p>",
        "check": {
          "q": "Training error falls but validation error rises. What is happening?",
          "o": [
            "Overfitting",
            "A guaranteed improvement",
            "The validation data became training data"
          ],
          "why": "The additional complexity fits training details that do not generalize."
        },
        "lab": {
          "href": "w2/regression.html",
          "todo": [
            "Start at degree <b>1</b>, then increase to <b>9</b>. Watch the training error keep falling while the validation error turns back up.",
            "Find the degree where validation error is lowest — that's the right complexity.",
            "Increase N and see overfitting shrink. Then do the slide-12 MAE / MSE exercise at the bottom."
          ]
        }
      },
      {
        "t": "Validation chooses; the test set reports",
        "key": "Keep <b>training, validation and test</b> roles separate.",
        "fig": {
          "type": "anim",
          "name": "kfold",
          "t": "K-fold cross-validation",
          "cap": "Result = the average of the K scores. The <b>test</b> set is kept apart the whole time and used once at the very end."
        },
        "html": "<p>The lecture split is 50% training, 25% validation and 25% test. Training fits parameters; validation chooses the model; the held-out test reports final error.</p><p>K-fold cross-validation rotates the validation fold: train on K − 1 folds and validate on the remaining one, K times. Average the scores. Each example is validated once.</p><div class=\"callout warn\">Do not repeatedly select models using the final test result.</div>",
        "check": {
          "q": "In 5-fold cross-validation, how often is each example validated?",
          "o": [
            "Once",
            "Five times",
            "Never"
          ],
          "why": "Each fold takes one turn as the held-out validation fold."
        },
        "lab": {
          "href": "w2/crossval.html",
          "todo": [
            "Set K = 5 and click <b>Next fold ▶</b> a few times: watch the validation fold rotate.",
            "Click <b>Run all folds</b> and read mean ± std. Repeat with K = 3 and K = 10.",
            "Click <b>Reshuffle</b> a few times and compare: a single hold-out split can be lucky or unlucky; the CV mean is more stable."
          ]
        }
      },
      {
        "t": "A learner combines a model, a loss and an optimizer",
        "key": "<b>Model, loss, optimization</b> specify a supervised learner.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Model g(x | θ)",
              "e.g. a line, θ = {w₁, w₀}",
              "c0"
            ],
            [
              "",
              "Loss E(θ | X)",
              "e.g. squared error",
              "c4"
            ],
            [
              "",
              "Optimise θ* = argmin E",
              "e.g. least squares, gradient descent",
              "c1"
            ]
          ]
        },
        "html": "<p>The model g(x | θ) defines the possible predictions. The loss E measures error. Optimization finds θ that minimizes E.</p><p>For K classes, the lecture trains K one-versus-rest hypotheses: each class is positive in its own learner.</p><p>This closes the evaluation part of our map. Week 3 changes the representation supplied to the learner; week 5 supplies a tree as the model.</p>",
        "check": {
          "q": "Which choice states how wrong a prediction is?",
          "o": [
            "Loss function",
            "Model family",
            "Feature count"
          ],
          "why": "The loss measures disagreement between target and prediction."
        }
      }
    ]
  },
  "3": {
    "goal": "distinguish selection from extraction and trace subset search and PCA.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Where week 3 fits in the course",
        "key": "<b>Dimensionality Reduction</b> answers the next question in our study route.",
        "fig": {
          "type": "flow",
          "t": "From earlier weeks to this week",
          "items": [
            [
              "",
              "2 · Fit and evaluate",
              "Examples and the kind of output",
              "c0"
            ],
            [
              "",
              "3 · Dimensionality Reduction",
              "Week 2 learned and evaluated a model. Week 3 asks whether fewer features can provide a simpler, more useful representation.",
              "c1"
            ],
            [
              "",
              "Next · unlabelled structure",
              "Explore groups in the reduced representation",
              "c2"
            ]
          ]
        },
        "html": "<p>Week 2 learned and evaluated a model. Week 3 asks whether fewer features can provide a simpler, more useful representation.</p>",
        "check": {
          "q": "What does dimensionality count?",
          "o": [
            "Features per example",
            "Training examples",
            "Classes"
          ],
          "why": "Week 2 learned and evaluated a model. Week 3 asks whether fewer features can provide a simpler, more useful representation."
        }
      },
      {
        "t": "Fewer features can remove cost and redundancy",
        "key": "<b>Dimensionality</b> is the number of features describing one example.",
        "fig": {
          "type": "boxes",
          "t": "A student described by d = 5 features",
          "rows": [
            {
              "label": "all features",
              "cells": [
                [
                  "Age",
                  "c0"
                ],
                [
                  "GPA",
                  "c0"
                ],
                [
                  "Attendance",
                  "c0"
                ],
                [
                  "Study hours",
                  "c0"
                ],
                [
                  "Income",
                  "c0"
                ]
              ]
            },
            {
              "label": "after reduction",
              "cells": [
                [
                  "",
                  ""
                ],
                [
                  "GPA",
                  "c1"
                ],
                [
                  "",
                  ""
                ],
                [
                  "Study hours",
                  "c1"
                ],
                [
                  "",
                  ""
                ]
              ]
            }
          ],
          "cap": "\"More useful information is better, not necessarily more features.\""
        },
        "html": "<p>Age, GPA, Attendance, Study Hours and Income give d = 5. Reducing d can save computation, storage and the cost of measuring a feature. It can remove irrelevant or redundant information and permit a two-dimensional plot.</p><p>Useful information matters more than the raw number of features. Reducing dimensions does not promise higher accuracy.</p>",
        "check": {
          "q": "Five columns describe 100 students. What is d?",
          "o": [
            "5",
            "100",
            "500"
          ],
          "why": "Each student has five features."
        }
      },
      {
        "t": "Selection keeps columns; extraction constructs coordinates",
        "key": "<b>Selection</b> keeps original features; <b>extraction</b> creates new ones.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Feature selection",
              "pts": [
                "keep k of the d original features",
                "e.g. keep {GPA, study hours}",
                "subset selection (forward / backward)",
                "easy to interpret"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Feature extraction",
              "pts": [
                "make k new features",
                "e.g. z₁ = 0.6·height + 0.8·weight",
                "PCA, LDA, FA, MDS",
                "what does z₁ mean?"
              ],
              "c": "c3"
            }
          ]
        },
        "html": "<p>Keeping GPA and Study Hours is selection. Replacing height and weight by z₁ = 0.6·height + 0.8·weight is extraction.</p><p>Original columns are usually easier to interpret than combinations. PCA uses variance; LDA uses known class separation; factor analysis explains correlations using hidden factors; MDS preserves pairwise distances.</p>",
        "check": {
          "q": "Keeping two original columns is which operation?",
          "o": [
            "Selection",
            "PCA projection",
            "Extraction"
          ],
          "why": "No new coordinate is constructed."
        }
      },
      {
        "t": "Subset search tests one feature change at a time",
        "key": "<b>Forward search</b> adds features; <b>backward search</b> removes them.",
        "fig": {
          "type": "flow",
          "t": "Forward search (illustrative numbers)",
          "items": [
            [
              "∅",
              "Start: F = { }",
              "E = 0.40",
              "mute"
            ],
            [
              "",
              "add GPA",
              "E = 0.25 ✓ best",
              "c1"
            ],
            [
              "",
              "add study hours",
              "E = 0.18 ✓",
              "c1"
            ],
            [
              "",
              "add age?",
              "E = 0.19 ✗ worse",
              "c4"
            ],
            [
              "",
              "Stop",
              "F = {GPA, study hours}",
              "c0"
            ]
          ],
          "cap": "Greedy is not guaranteed to find the best subset."
        },
        "html": "<p>There are 2ᵈ subsets. Forward search begins empty, tries every possible addition and keeps the one giving the lowest validation error. Continue while it improves the result. Backward search starts with all features and tests removals.</p><div class=\"callout warn\">Greedy search does not guarantee the best possible subset. A tiny apparent improvement can come from noise.</div>",
        "check": {
          "q": "Forward search begins with which subset?",
          "o": [
            "Empty",
            "All features",
            "Only PC1"
          ],
          "why": "It builds the subset by adding features."
        },
        "lab": {
          "href": "w3/subset.html",
          "todo": [
            "Run <b>forward search</b> step by step and note the order in which features are added.",
            "Run <b>backward search</b> and compare.",
            "Set ε = 0.5 and run again: does the irrelevant feature still sneak in?"
          ]
        }
      },
      {
        "t": "PCA finds the direction with greatest spread",
        "key": "<b>PC1</b> maximizes projection variance for a unit direction w.",
        "fig": {
          "type": "anim",
          "name": "pca",
          "t": "Height and weight of students (centred)",
          "cap": "Press <b>New data</b> for a different cloud: PCA always finds the long axis."
        },
        "html": "<p>Height and weight form a cloud. Center it by subtracting its mean. Project each centered x to z = wᵀx. Rotate the unit direction w and choose the largest Var(z). PC2 is perpendicular to PC1 and captures the next-largest variance.</p><p>Explained-variance ratios measure retained variance: 92% plus 8% gives 100% across the two components.</p><div class=\"callout warn\">Variance is not class separation. PCA ignores the labels.</div>",
        "check": {
          "q": "What does a 92% explained-variance ratio describe?",
          "o": [
            "Retained variance",
            "Classification accuracy",
            "Share of labels retained"
          ],
          "why": "It measures spread, not prediction accuracy."
        },
        "lab": {
          "href": "w3/pca.html",
          "todo": [
            "Dataset <b>Height &amp; weight</b>: rotate the direction w and watch Var(z) change. Click <b>Snap to PC1</b>.",
            "Click <b>w = (0.6, 0.8) — slide 7</b> and look at the explained variance bars.",
            "Switch to <b>Unscaled units</b>, then tick <b>standardize each feature first</b>.",
            "Switch to <b>Classes in a low-variance direction</b>: PC1 keeps the variance but loses the classes."
          ]
        }
      },
      {
        "t": "A smaller representation still needs evaluation",
        "key": "<b>Representation</b> changes the input, so judge the resulting model on held-out data.",
        "fig": {
          "type": "compare",
          "t": "Changing the representation",
          "cols": [
            {
              "t": "Before",
              "pts": [
                "d original columns",
                "Same N examples"
              ],
              "c": "c0"
            },
            {
              "t": "After",
              "pts": [
                "k coordinates, k < d",
                "Same N examples"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>Moving from (150, 4) to (150, 2) retains all 150 examples and reduces four features to two coordinates. A high-variance projection can lose a direction useful for classification.</p><p>In the course map, feature reduction follows evaluation and supports the plots used in clustering next week. It changes columns; clustering organizes rows.</p>",
        "check": {
          "q": "Does reducing from four features to two halve the number of examples?",
          "o": [
            "No",
            "Yes",
            "Only when PCA is unsupervised"
          ],
          "why": "Feature reduction changes the columns, not the number of rows."
        }
      }
    ]
  },
  "4": {
    "goal": "trace hard and soft clustering and read hierarchical merges.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Where week 4 fits in the course",
        "key": "<b>Clustering</b> answers the next question in our study route.",
        "fig": {
          "type": "flow",
          "t": "From earlier weeks to this week",
          "items": [
            [
              "",
              "3 · Reduce features",
              "Represent each example with useful coordinates",
              "c0"
            ],
            [
              "",
              "4 · Clustering",
              "Week 3 changed the features. Week 4 groups the examples themselves without desired output labels.",
              "c1"
            ],
            [
              "",
              "Next · decision trees",
              "Return to prediction using class labels",
              "c2"
            ]
          ]
        },
        "html": "<p>Week 3 changed the features. Week 4 groups the examples themselves without desired output labels.</p>",
        "check": {
          "q": "What is supplied to unsupervised clustering?",
          "o": [
            "Inputs without labels",
            "Inputs with target classes",
            "Only target classes"
          ],
          "why": "Week 3 changed the features. Week 4 groups the examples themselves without desired output labels."
        }
      },
      {
        "t": "k-means alternates assignments and means",
        "key": "Assign to the nearest <b>reference vector</b>, then update that vector to the mean.",
        "fig": {
          "type": "anim",
          "name": "kmeans",
          "t": "k-means in two dimensions",
          "cap": "Change k or press <b>New data</b>: a bad start can end in a worse clustering."
        },
        "html": "<p>Start with k centers mᵢ. Assign each point to its nearest center; then replace each center by the mean of its assigned points. Repeat until the assignments and centers stabilize.</p><p>For 1, 2, 9, 10, 11, start at 1 and 2. The first groups are {1} and {2, 9, 10, 11}, so centers become 1 and 8. Reassigning gives {1, 2} and {9, 10, 11}, with centers 1.5 and 10.</p><div class=\"callout warn\">Initialization matters. Convergence does not guarantee the global best solution.</div>",
        "check": {
          "q": "What is the center of {9, 10, 11}?",
          "o": [
            "10",
            "9",
            "11"
          ],
          "why": "The update uses the arithmetic mean."
        },
        "lab": {
          "href": "w4/kmeans.html",
          "todo": [
            "Load <b>3 blobs (slide 16)</b>, k = 3. Click <b>Initialize</b>, then alternate <b>① Assign</b> and <b>② Update</b> and watch the centres move.",
            "Choose init <b>all in one corner</b> and run to convergence: a bad start can give a bad result.",
            "Load <b>Unscaled features</b> and compare with \"standardize features\" ticked.",
            "Look at the <b>elbow</b> plot for choosing k."
          ]
        }
      },
      {
        "t": "Reference vectors reconstruct the original points",
        "key": "<b>Reconstruction error</b> sums squared distances to assigned centers.",
        "fig": {
          "type": "flow",
          "t": "Compress with a reference vector",
          "items": [
            [
              "",
              "Encode x",
              "Find nearest mᵢ",
              "c0"
            ],
            [
              "",
              "Send i",
              "Transmit the center index",
              "c1"
            ],
            [
              "",
              "Decode i",
              "Output mᵢ as the approximation",
              "c2"
            ]
          ]
        },
        "html": "<p>The assignment bᵢᵗ is 1 for the nearest center and 0 otherwise. The error is E = Σₜ Σᵢ bᵢᵗ ‖xᵗ − mᵢ‖². Assign and update steps do not increase it.</p><p>Colour quantisation stores an index rather than a full colour vector. The decoder replaces it with the chosen reference colour.</p>",
        "check": {
          "q": "What does the encoder send?",
          "o": [
            "A center index",
            "The entire original vector",
            "The class label"
          ],
          "why": "The decoder already has the codebook vectors."
        }
      },
      {
        "t": "EM replaces a hard choice with responsibilities",
        "key": "The <b>E-step</b> computes memberships; the <b>M-step</b> refits the components.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "Start",
              "random Gaussians",
              "mute"
            ],
            [
              "E",
              "E-step",
              "probability of each cluster for each point",
              "c2"
            ],
            [
              "M",
              "M-step",
              "re-fit each μ and σ², weighted",
              "c1"
            ],
            [
              "↺",
              "Repeat",
              "until it converges",
              "c0"
            ]
          ]
        },
        "html": "<p>k-means gives a point to one cluster. A Gaussian mixture allows soft memberships, such as 70% in A and 30% in B.</p><ol><li>Begin with component means and variances.</li><li>E-step: compute each point’s responsibility for each component.</li><li>M-step: update component parameters using those weights.</li><li>Repeat.</li></ol>",
        "check": {
          "q": "Which step updates Gaussian parameters?",
          "o": [
            "M-step",
            "E-step",
            "Dendrogram cut"
          ],
          "why": "The M-step refits parameters using E-step responsibilities."
        },
        "lab": {
          "href": "w4/em.html",
          "todo": [
            "Load <b>Two clear groups</b>, click <b>Random Gaussians</b>, then alternate <b>E-step</b> and <b>M-step</b>.",
            "Click a point between the groups to see its probabilities.",
            "Load <b>Overlapping groups</b> and tick \"show k-means-style hard assignment\" to compare."
          ]
        }
      },
      {
        "t": "A dendrogram records successive group merges",
        "key": "<b>Agglomerative clustering</b> starts with one group per example.",
        "fig": {
          "type": "plot",
          "t": "A dendrogram for five points",
          "w": 500,
          "h": 300,
          "x": [
            0,
            6
          ],
          "y": [
            -0.6,
            4.5
          ],
          "yl": "merge distance",
          "lines": [
            {
              "pts": [
                [
                  1,
                  0
                ],
                [
                  1,
                  1
                ],
                [
                  2,
                  1
                ],
                [
                  2,
                  0
                ]
              ],
              "c": "c0"
            },
            {
              "pts": [
                [
                  4,
                  0
                ],
                [
                  4,
                  1.5
                ],
                [
                  5,
                  1.5
                ],
                [
                  5,
                  0
                ]
              ],
              "c": "c1"
            },
            {
              "pts": [
                [
                  1.5,
                  1
                ],
                [
                  1.5,
                  2.5
                ],
                [
                  3,
                  2.5
                ],
                [
                  3,
                  0
                ]
              ],
              "c": "c0"
            },
            {
              "pts": [
                [
                  2.25,
                  2.5
                ],
                [
                  2.25,
                  4
                ],
                [
                  4.5,
                  4
                ],
                [
                  4.5,
                  1.5
                ]
              ],
              "c": "mute"
            },
            {
              "pts": [
                [
                  0.2,
                  3.2
                ],
                [
                  5.8,
                  3.2
                ]
              ],
              "c": "c4",
              "dash": true,
              "label": "cut here → 2 clusters"
            }
          ],
          "texts": [
            [
              1,
              -0.4,
              "A"
            ],
            [
              2,
              -0.4,
              "B"
            ],
            [
              3,
              -0.4,
              "C"
            ],
            [
              4,
              -0.4,
              "D"
            ],
            [
              5,
              -0.4,
              "E"
            ]
          ],
          "cap": "A and B merge first (closest), then D and E, then C joins A–B. No need to choose k in advance."
        },
        "html": "<p>Merge the two closest groups until one remains. A dendrogram records the merges; cutting at a chosen height determines the clusters.</p><p>Single-link uses the minimum pairwise distance between groups. Complete-link uses the maximum. Average-link averages pairs; centroid distance compares means.</p><p>For (1, 3) and (4, 7), city-block distance is 3 + 4 = 7; Euclidean distance is √(9 + 16) = 5. Divisive clustering runs in the opposite direction, splitting groups.</p>",
        "check": {
          "q": "Single-link uses which distance?",
          "o": [
            "Closest pair",
            "Farthest pair",
            "Number of group members"
          ],
          "why": "The minimum pairwise distance defines single-link."
        },
        "lab": {
          "href": "w4/hierarchical.html",
          "todo": [
            "Load <b>Slide 15: a–f</b>, single-link, Euclidean. Click <b>Merge closest pair ▶</b> step by step and watch the dendrogram grow.",
            "Move the <b>cut at h</b> slider and count the clusters.",
            "Restart with complete-link and with city-block distance — does the merge order change?",
            "Try <b>A chain + a blob</b>: single-link \"chains\" points together."
          ]
        }
      },
      {
        "t": "More centers reduce error without proving useful groups",
        "key": "An <b>elbow</b> marks diminishing gains in reconstruction error.",
        "fig": {
          "type": "plot",
          "t": "Elbow method (illustrative)",
          "w": 520,
          "h": 280,
          "x": [
            1,
            8
          ],
          "y": [
            0,
            100
          ],
          "xl": "k (number of clusters)",
          "yl": "reconstruction error",
          "lines": [
            {
              "pts": [
                [
                  1,
                  100
                ],
                [
                  2,
                  55
                ],
                [
                  3,
                  30
                ],
                [
                  4,
                  25
                ],
                [
                  5,
                  21
                ],
                [
                  6,
                  18
                ],
                [
                  7,
                  16
                ],
                [
                  8,
                  14.5
                ]
              ],
              "c": "c0"
            }
          ],
          "pts": [
            [
              3,
              30,
              "c4",
              "← elbow: k = 3"
            ]
          ]
        },
        "html": "<p>The application may fix k, as in a colour budget. Otherwise inspect the data and error curve and ask whether the groups are meaningful. A bend in the error curve suggests a useful compromise.</p><div class=\"callout warn\">The smallest reconstruction error alone favors more centers; with one center per point, error is zero.</div><p>Our map now separates changing features from grouping examples. Week 5 returns to labelled prediction and learns a tree of decisions.</p>",
        "check": {
          "q": "Why not choose k only by the lowest training reconstruction error?",
          "o": [
            "It favors too many centers",
            "Error grows with every new center",
            "k is always the class count"
          ],
          "why": "At k = N every point can be represented exactly."
        }
      }
    ]
  },
  "5": {
    "goal": "calculate entropy, select a tree split and explain regression leaves and pruning.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Where week 5 fits in the course",
        "key": "<b>Decision Trees</b> answers the next question in our study route.",
        "fig": {
          "type": "flow",
          "t": "From earlier weeks to this week",
          "items": [
            [
              "",
              "2 · Fit and evaluate",
              "Examples and the kind of output",
              "c0"
            ],
            [
              "",
              "5 · Decision Trees",
              "Week 2 supplied model, loss and evaluation. Week 5 uses a decision tree as the model and chooses questions by impurity or numeric error.",
              "c1"
            ],
            [
              "",
              "Return · evaluate the fitted tree",
              "Control complexity on held-out data",
              "c2"
            ]
          ]
        },
        "html": "<p>Week 2 supplied model, loss and evaluation. Week 5 uses a decision tree as the model and chooses questions by impurity or numeric error.</p>",
        "check": {
          "q": "What does a classification leaf provide?",
          "o": [
            "A class output",
            "A new feature axis",
            "An unlabelled cluster center"
          ],
          "why": "Week 2 supplied model, loss and evaluation. Week 5 uses a decision tree as the model and chooses questions by impurity or numeric error."
        }
      },
      {
        "t": "Each path applies a sequence of tests",
        "key": "A <b>decision node</b> asks a question; a <b>leaf</b> predicts an output.",
        "fig": {
          "type": "graph",
          "t": "The Play Tennis tree",
          "w": 700,
          "h": 280,
          "nodes": {
            "o": [
              350,
              40,
              "Outlook?",
              "c0"
            ],
            "h": [
              130,
              150,
              "Humidity?",
              "c0"
            ],
            "y1": [
              350,
              150,
              "Yes",
              "c1"
            ],
            "w": [
              570,
              150,
              "Wind?",
              "c0"
            ],
            "n1": [
              60,
              250,
              "No",
              "c4"
            ],
            "y2": [
              200,
              250,
              "Yes",
              "c1"
            ],
            "n2": [
              500,
              250,
              "No",
              "c4"
            ],
            "y3": [
              640,
              250,
              "Yes",
              "c1"
            ]
          },
          "edges": [
            [
              "o",
              "h",
              "sunny"
            ],
            [
              "o",
              "y1",
              "overcast"
            ],
            [
              "o",
              "w",
              "rain"
            ],
            [
              "h",
              "n1",
              "high"
            ],
            [
              "h",
              "y2",
              "normal"
            ],
            [
              "w",
              "n2",
              "strong"
            ],
            [
              "w",
              "y3",
              "weak"
            ]
          ]
        },
        "html": "<p>Play Tennis first tests Outlook. Overcast goes to Yes. Sunny tests Humidity; Rain tests Wind. Follow exactly one branch at each decision.</p><p>A univariate numeric test xᵢ &gt; wₘ has two branches. A discrete test can have one branch per value. A multivariate node tests a combination of attributes.</p><p>Each root-to-leaf path gives an IF-THEN rule: IF Outlook = sunny AND Humidity = high THEN no.</p>",
        "check": {
          "q": "What rule follows the Sunny then High path?",
          "o": [
            "Predict No",
            "Predict Yes",
            "Predict a cluster index"
          ],
          "why": "The path ends at the No leaf."
        }
      },
      {
        "t": "Entropy is zero when a node is pure",
        "key": "<b>Entropy</b> measures class mixture: I = −Σ pᵢ log₂ pᵢ.",
        "fig": {
          "type": "plot",
          "t": "Entropy of a two-class node",
          "w": 520,
          "h": 280,
          "x": [
            0,
            1
          ],
          "y": [
            0,
            1.1
          ],
          "xl": "p = share of \"yes\"",
          "yl": "entropy (bits)",
          "lines": [
            {
              "pts": [
                [
                  0,
                  0
                ],
                [
                  0.05,
                  0.286
                ],
                [
                  0.1,
                  0.469
                ],
                [
                  0.2,
                  0.722
                ],
                [
                  0.3,
                  0.881
                ],
                [
                  0.4,
                  0.971
                ],
                [
                  0.5,
                  1
                ],
                [
                  0.6,
                  0.971
                ],
                [
                  0.7,
                  0.881
                ],
                [
                  0.8,
                  0.722
                ],
                [
                  0.9,
                  0.469
                ],
                [
                  0.95,
                  0.286
                ],
                [
                  1,
                  0
                ]
              ],
              "c": "c0"
            }
          ],
          "pts": [
            [
              0.643,
              0.94,
              "c2",
              "Play Tennis: 9/14 yes → 0.940"
            ],
            [
              0.5,
              1,
              "c4",
              "50/50 → 1"
            ],
            [
              1,
              0,
              "c1",
              "pure → 0"
            ]
          ]
        },
        "html": "<p>For Nₘ examples at a node, pᵢ is the share belonging to class i. All in one class gives entropy 0. A two-class 50/50 mixture gives 1 bit.</p><ol><li>Play Tennis: 9 yes and 5 no, total 14.</li><li>Use p(yes) = 9/14 and p(no) = 5/14.</li><li>I = −(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ 0.940 bits.</li></ol>",
        "check": {
          "q": "What is the entropy of four Yes and zero No?",
          "o": [
            "0",
            "1",
            "4"
          ],
          "why": "A pure node has no class uncertainty."
        }
      },
      {
        "t": "Weight each child entropy before choosing a split",
        "key": "Minimize <b>weighted child entropy</b>, equivalently maximize <b>information gain</b>.",
        "fig": {
          "type": "anim",
          "name": "id3",
          "t": "ID3 grows the Play Tennis tree"
        },
        "html": "<p>Outlook gives Sunny (2 yes, 3 no), Overcast (4 yes, 0 no), Rain (3 yes, 2 no).</p><ol><li>Child entropies are 0.971, 0 and 0.971.</li><li>Weight by child sizes: I′ = (5/14)0.971 + (4/14)0 + (5/14)0.971 ≈ 0.694.</li><li>Gain ≈ 0.940 − 0.694 = 0.246 using rounded values.</li></ol><p>Outlook beats Humidity 0.789, Wind 0.892 and Temperature 0.911. Recurse within the remaining mixed branches.</p><div class=\"callout warn\">Do not average child entropies equally when branch sizes differ.</div>",
        "check": {
          "q": "Which child becomes a leaf immediately?",
          "o": [
            "Overcast",
            "Sunny",
            "Rain"
          ],
          "why": "All four Overcast examples are Yes."
        },
        "lab": {
          "href": "w5/id3.html",
          "todo": [
            "Click the root node and compute 𝓘′ for every attribute (tick \"show 𝓘′\" to check). Choose the lowest.",
            "Go down the Sunny and Rain branches and split them yourself.",
            "Read the rules on the right, then use <b>Classify a new day</b>. Compare with <b>Auto-build (ID3)</b>."
          ]
        }
      },
      {
        "t": "Regression leaves predict a local average",
        "key": "A <b>regression tree</b> leaf predicts the mean target reaching it.",
        "fig": {
          "type": "plot",
          "t": "A regression tree with 3 leaves (illustrative)",
          "w": 520,
          "h": 280,
          "x": [
            0,
            10
          ],
          "y": [
            0,
            10
          ],
          "xl": "x",
          "yl": "r",
          "pts": [
            [
              0.5,
              2.2,
              "c0"
            ],
            [
              1.5,
              1.6,
              "c0"
            ],
            [
              2.5,
              2.6,
              "c0"
            ],
            [
              3.3,
              2,
              "c0"
            ],
            [
              4,
              6.2,
              "c0"
            ],
            [
              4.8,
              7.1,
              "c0"
            ],
            [
              5.5,
              6.4,
              "c0"
            ],
            [
              6.3,
              7.2,
              "c0"
            ],
            [
              7.2,
              4.1,
              "c0"
            ],
            [
              8,
              3.4,
              "c0"
            ],
            [
              8.8,
              4,
              "c0"
            ],
            [
              9.6,
              3.5,
              "c0"
            ]
          ],
          "lines": [
            {
              "pts": [
                [
                  0,
                  2.1
                ],
                [
                  3.7,
                  2.1
                ],
                [
                  3.7,
                  6.7
                ],
                [
                  6.8,
                  6.7
                ],
                [
                  6.8,
                  3.75
                ],
                [
                  10,
                  3.75
                ]
              ],
              "c": "c2",
              "label": "leaf averages"
            }
          ]
        },
        "html": "<p>A leaf containing targets 2, 4 and 6 predicts 4. Its MSE is ((2 − 4)² + (4 − 4)² + (6 − 4)²)/3 = 8/3.</p><p>Choose splits that reduce numeric error. Stop when node error falls below θᵣ. Smaller θᵣ permits more splitting and produces a larger step function.</p><div class=\"callout warn\">More leaves can fit noise. Compare model choices on validation data.</div>",
        "check": {
          "q": "Targets 2, 4 and 6 reach one leaf. What is its prediction?",
          "o": [
            "4",
            "2",
            "6"
          ],
          "why": "A regression leaf predicts the arithmetic mean."
        },
        "lab": {
          "href": "w5/regtree.html",
          "todo": [
            "Load <b>Slide 15 points</b>. Compare θᵣ = 0.5, 0.2 and 0.05; count the leaves.",
            "Switch to <b>Noisy curve + test set</b>. Lower θᵣ and compare training and held-out error.",
            "Read one root-to-leaf rule. Keep final test data separate when choosing a model."
          ]
        }
      },
      {
        "t": "Pruning brings the tree back to generalization",
        "key": "<b>Prepruning</b> stops growth; <b>postpruning</b> removes branches after growth.",
        "fig": {
          "type": "compare",
          "t": "Control the tree size",
          "cols": [
            {
              "t": "Prepruning",
              "pts": [
                "Stop during growth",
                "Avoid some construction work"
              ],
              "c": "c0"
            },
            {
              "t": "Postpruning",
              "pts": [
                "Grow, then remove subtrees",
                "Use a separate pruning set"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>Early stopping controls growth before the tree is complete. Postpruning first grows the tree, then removes subtrees using separate pruning evidence.</p><p>The course map ends where week 2 began: a fitted model must work on new examples. Representation from week 3 affects the inputs; tree structure controls model complexity. Clustering from week 4 answers a different question when labels are absent.</p>",
        "check": {
          "q": "Which method removes subtrees after growth?",
          "o": [
            "Postpruning",
            "Prepruning",
            "Feature extraction"
          ],
          "why": "The tree is built first and pruned afterwards."
        }
      }
    ]
  }
};
