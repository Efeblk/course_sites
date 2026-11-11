/* Guided lessons, refactored from the existing course content.
 * Raw slides were unavailable for this revision. Existing source-conflict notes are retained.
 * Correct check first; learn.js shuffles options. */
window.GUIDE = {
  "1": {
    "goal": "Choose a learning task by looking at the feedback available.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Start with the examples, then choose the task",
        "key": "Start with the <b>learning task</b>; then choose a representation and evaluate a model.",
        "fig": {
          "type": "flow",
          "t": "Weeks 1–6: the study route",
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
            ],
            [
              "",
              "6 · Learn weights",
              "How does a network of weighted sums learn?",
              "c1"
            ]
          ]
        },
        "html": "<p>In credit scoring, we want a prediction: is this customer low risk or high risk? Instead of writing every decision rule ourselves, we learn a rule from examples.</p><p>The course follows that idea. Week 1 chooses the task. Week 2 learns a rule and checks it on new examples. Week 3 chooses useful inputs. Week 4 groups examples without labels. Weeks 5 and 6 build two kinds of models: trees and neural networks.</p><p>Begin with one question: what information does each training example give us?</p>",
        "check": {
          "q": "A credit-scoring training example includes the correct risk class. What feedback is available?",
          "o": [
            "A desired output label",
            "Only an unlabelled input",
            "Only a delayed reward"
          ],
          "why": "A supplied desired output makes this a supervised learning example."
        }
      },
      {
        "t": "Learning replaces rules we cannot write down easily",
        "key": "<b>Machine learning</b> optimizes a performance criterion using examples or past experience.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Normal programming",
              "pts": [
                "payroll: the rule is known",
                "write it once; nothing to learn"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Machine learning",
              "pts": [
                "optimize a performance criterion",
                "using example data or past experience"
              ],
              "c": "c1"
            }
          ],
          "cap": "We need learning when nobody can write the rules: there is no expert (Mars), the expert cannot explain it (speech), things change (routing), or it must adapt to each user."
        },
        "html": "<p>Some tasks already have clear rules. A payroll calculation is an example: given the rules, we can program them directly.</p><p>Other tasks are harder to describe. We recognize speech but struggle to list every recognition rule. Routing conditions change. Biometric systems must adapt to individuals. For these tasks, examples can teach a useful approximation: a <b>model</b>.</p><p>The point is not that a computer learns everything. We choose a task, provide experience and judge whether the learned model helps with that task.</p>",
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
        "t": "“Among computer baskets” tells you the denominator",
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
        "html": "<p>Suppose ten baskets contain a computer, and seven of those also contain a mouse. The question is: among the computer baskets, how often is there a mouse?</p><ol><li>Select the baskets containing a computer: 10.</li><li>Count those also containing a mouse: 7.</li><li>Divide: P(mouse | computer) = 7/10 = <b>0.7</b>.</li></ol><p>The symbol after the bar is the condition. Reversing it changes which baskets you count first. So P(mouse | computer) need not equal P(computer | mouse). This is an <b>association</b> between items.</p><div class=\"callout warn\">Reversing X and Y changes the denominator. P(Y | X) need not equal P(X | Y).</div>",
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
        "t": "A label supplies the answer for a training example",
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
        "html": "<p>In credit scoring, the inputs are income and savings. The training example also supplies the desired answer: low or high risk. That answer is a <b>label</b>.</p><p>The lab’s rectangular rule predicts low risk only when both inputs exceed their thresholds. Learning chooses the thresholds from labelled examples; prediction applies the chosen rule to another customer.</p><p>Low versus high risk is <b>classification</b>: choose a class. Predicting a used car’s price is <b>regression</b>: produce a number. Both are supervised because training includes desired outputs.</p>",
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
        "t": "The feedback tells you which kind of learning fits",
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
        "html": "<p>Look at what the learner receives:</p><ul><li><b>Supervised</b>: examples include desired outputs, as in credit scoring.</li><li><b>Unsupervised</b>: only inputs are supplied. Customer segmentation and colour quantisation look for groups without answer labels.</li><li><b>Reinforcement</b>: actions lead to rewards, sometimes delayed. The learner seeks a policy for choosing actions.</li></ul><p>Do not choose from the application name alone. Ask “does training provide answers, only inputs, or rewards?” Next week follows the supervised case: how do we choose a rule that works on new examples?</p><div class=\"callout warn\">A cluster is discovered; its class name is not supplied as a training target.</div>",
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
    ],
    "question": "What does it mean for a computer to learn from examples?"
  },
  "2": {
    "goal": "Explain hypotheses, calculate prediction loss and separate training, validation and testing.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Fitting known answers is only the beginning",
        "key": "<b>Supervised learning</b> learns a rule from examples with known answers. The real test is how it does on <b>new</b> examples.",
        "fig": {
          "type": "flow",
          "t": "Where week 2 sits",
          "items": [
            [
              "",
              "1 · Introduction",
              "what kinds of learning exist",
              "c0"
            ],
            [
              "",
              "2 · Supervised Learning",
              "learn from labelled examples, judge on new ones",
              "c1"
            ],
            [
              "",
              "3 · Dimensionality Reduction",
              "which inputs to use",
              "c2"
            ]
          ]
        },
        "html": "<p>Week 1 introduced supervised examples: an input and its desired answer. Now imagine cars described by price and engine power, labelled family car or not.</p><p>We can draw a rectangle around the positive examples. But many rectangles may fit the same data. Which should we trust for a car we have not seen?</p><p>This week connects three questions: what rules can we choose, how do we measure their mistakes, and how do we test whether they generalize?</p>",
        "check": {
          "q": "Two rectangles fit every training label but disagree on a new car. What does that show?",
          "o": [
            "Training fit alone does not determine the correct unseen prediction",
            "Zero training error proves all future predictions",
            "Every rectangle makes identical predictions"
          ],
          "why": "Unseen regions remain uncertain; evaluation and inductive bias matter."
        }
      },
      {
        "t": "A hypothesis is one candidate rule",
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
        "html": "<p>Put price on one axis and engine power on the other. A rectangle predicts family car inside, and not family car outside.</p><p>One particular rectangle is a <b>hypothesis h</b>. The set of allowed rectangles is the <b>hypothesis class H</b>. Changing a boundary chooses a different candidate rule.</p><p>To compute <b>empirical error</b>, compare h(x) with each training label r and count mismatches. The notation Σ 1(h(x) ≠ r) just says “add 1 for each wrong answer.” A zero count means the rule fits these examples, not all future cars.</p><div class=\"callout warn\">False positive: predict 1 when r = 0. False negative: predict 0 when r = 1.</div>",
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
        "t": "The same examples can support different rules",
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
        "html": "<p>A tight rectangle S surrounds the known positive examples. A more general boundary G allows a larger consistent region without admitting the known negatives.</p><p>Both can fit the training set. They disagree about places where we have no labelled example yet. That is the uncertainty the picture illustrates.</p><p><b>Inductive bias</b> is the preference we use to choose among possibilities. The lecture discusses margin as one such preference. A training fit alone cannot tell us which unseen points should count as family cars.</p>",
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
        "t": "For numeric predictions, measure how far off you are",
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
          "cap": "Linear and quadratic g(x) fitted to used-car prices (slide 11)."
        },
        "html": "<p>A classification mistake is wrong or right. A numeric prediction can miss by a little or a lot. Its <b>residual</b> is the target minus the prediction.</p><p>For residuals −5, 2, 5, −5, 3:</p><ol><li><b>MAE</b>: take absolute values, then average: (5 + 2 + 5 + 5 + 3)/5 = <b>4</b>.</li><li><b>MSE</b>: square first, then average: (25 + 4 + 25 + 25 + 9)/5 = <b>17.6</b>.</li></ol><p>Signed errors could cancel even when predictions are poor. Absolute values and squares prevent that; squares penalize large misses more strongly.</p><div class=\"callout warn\">Signed errors can cancel. Squaring or taking absolute values prevents cancellation.</div>",
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
        "t": "A more flexible rule can learn the noise",
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
        "html": "<p>A straight line may be too simple for a curved relationship: <b>underfitting</b>. A high-degree polynomial may bend to match accidental noise: <b>overfitting</b>.</p><p>Watch the training and new-data curves separately. Making the model more flexible can keep lowering training error while making new-data error worse.</p><p>The lecture’s triple trade-off links model complexity, sample size and new-data error. More flexibility needs enough evidence to constrain it. We want a rule that captures the pattern, rather than every accident in the sample.</p>",
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
        "t": "Use different data to fit, choose and report",
        "key": "Keep <b>training, validation and test</b> roles separate.",
        "fig": {
          "type": "anim",
          "name": "kfold",
          "t": "K-fold cross-validation",
          "cap": "Result = the average of the K scores. The <b>test</b> set is kept apart the whole time and used once at the very end."
        },
        "html": "<p>If we choose a model because it scores well on a data set, that set has influenced our choice. It cannot also be an untouched final test.</p><ol><li><b>Training</b> fits parameters.</li><li><b>Validation</b> chooses between models or settings.</li><li><b>Test</b> reports the final model’s error.</li></ol><p>The lecture uses 50%, 25%, 25%. In <b>K-fold cross-validation</b>, rotate which fold validates: train on K − 1 folds, validate on the remaining fold and average the K errors. The final test set still stays separate.</p><div class=\"callout warn\">Do not repeatedly select models using the final test result.</div>",
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
        "t": "Every learner needs a model, a loss and a way to improve",
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
        "html": "<p>Separate three jobs:</p><ul><li><b>Model</b>: what predictions are possible? For a line, g(x) = w₁x + w₀.</li><li><b>Loss</b>: how bad are the predictions? MSE is one choice.</li><li><b>Optimization</b>: which parameter values reduce that loss?</li></ul><p>For several classes, the lecture also uses K one-versus-rest classifiers: each learns one class against all others.</p><p>Return to the course map: we can now fit and evaluate a model. Week 3 asks whether we are giving it the right features.</p>",
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
    ],
    "question": "A rule fits the training examples. Will it work on new ones?"
  },
  "3": {
    "goal": "Distinguish feature selection from extraction and trace PCA.",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Rows are examples; columns are features",
        "key": "<b>Dimensionality reduction</b> uses fewer features while keeping as much useful information as possible.",
        "fig": {
          "type": "flow",
          "t": "Where week 3 sits",
          "items": [
            [
              "",
              "2 · Supervised Learning",
              "learn and evaluate a model",
              "c0"
            ],
            [
              "",
              "3 · Dimensionality Reduction",
              "fewer inputs, same information",
              "c1"
            ],
            [
              "",
              "4 · Clustering",
              "groups without labels",
              "c2"
            ]
          ]
        },
        "html": "<p>A student may be described by age, GPA, attendance, study hours and income. That is one example with five <b>features</b>, so d = 5.</p><p>Week 2 chose a model. This week changes the description fed into it. Could fewer than five numbers carry what we need?</p><p>There are two routes: keep some original columns, or construct new coordinates from them. The difference is the central idea of dimensionality reduction.</p>",
        "check": {
          "q": "Keeping only GPA and study hours changes what?",
          "o": [
            "The features describing each example",
            "The number of student examples",
            "The labels into rewards"
          ],
          "why": "Dimensionality reduction changes the feature representation, not the number of rows."
        }
      },
      {
        "t": "Fewer measurements can make the task easier",
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
        "html": "<p>Every feature costs something: measuring it, storing it and processing it. Some add no useful information; others largely repeat what another feature tells us.</p><p>Reducing the number of features can remove those costs and make data easier to visualize. Two dimensions can be plotted directly.</p><p>But a smaller description may discard useful information too. Dimensionality reduction is a choice about what to retain, not a guarantee of better predictions. We still need evaluation.</p>",
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
        "t": "Keep existing columns or make new coordinates",
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
        "html": "<p>If we keep GPA and study hours and discard the other columns, that is <b>feature selection</b>. The remaining values keep their original meaning.</p><p>If we replace height and weight by z₁ = 0.6·height + 0.8·weight, that is <b>feature extraction</b>. The new coordinate combines measurements.</p><p><b>PCA</b> extracts directions using variance. <b>LDA</b> uses known classes. So ask two things: did we keep original columns or construct new ones, and did we use labels to choose them?</p>",
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
        "t": "Try one feature change and compare validation error",
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
        "html": "<p>With d features there are 2ᵈ possible subsets. Checking every subset can become expensive.</p><p><b>Forward selection</b> starts empty. Try adding each available feature, compare validation errors, keep the best addition and repeat while it improves the result.</p><p><b>Backward selection</b> starts with all features. Try removing one at a time and keep the best removal.</p><p>These are stepwise searches. “Best next step” does not mean “best subset among every possibility.” In the lab, read the error after each candidate change rather than choosing by the feature’s name.</p><div class=\"callout warn\">Greedy search does not guarantee the best possible subset. A tiny apparent improvement can come from noise.</div>",
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
        "t": "PCA looks for a direction that preserves spread",
        "key": "<b>PC1</b> maximizes projection variance for a unit direction w.",
        "fig": {
          "type": "anim",
          "name": "pca",
          "t": "Height and weight of students (centred)",
          "cap": "Press <b>New data</b> for a different cloud: PCA always finds the long axis."
        },
        "html": "<p>Imagine the height–weight cloud projected onto a line. A poor direction makes very different points land close together. A useful direction retains more of their spread.</p><ol><li><b>Center</b> the data: subtract the mean.</li><li>Choose a unit direction w.</li><li>Project each centered point: z = wᵀx.</li><li>Choose the direction with the greatest variance of z: <b>PC1</b>.</li></ol><p>PC2 is perpendicular to PC1 and keeps the next-largest variance. The lab lets you rotate the direction and see the projection change. PCA uses the input cloud, not class labels.</p><div class=\"callout warn\">Variance is not class separation. PCA ignores the labels.</div>",
        "check": {
          "q": "Slide 12 reports PC1 + PC2 = 97.77% for the iris data. What does the number describe?",
          "o": [
            "The share of the variance kept",
            "Classification accuracy",
            "The share of the labels kept"
          ],
          "why": "Explained variance measures spread kept by the components, not prediction accuracy."
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
        "t": "Keeping variance is different from keeping predictive information",
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
        "html": "<p>The lecture’s iris example keeps two principal components, retaining 97.77% of the variance.</p><p>Every example is still present. It now has two coordinates instead of the original feature description. We reduced columns, not rows.</p><p>The percentage tells us about preserved spread. It does not say “97.77% classification accuracy.” Check the downstream model on held-out examples.</p><p>We now know how to change the columns. Week 4 groups the rows: which examples look similar when no labels are provided?</p>",
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
    ],
    "question": "Which measurements should we give the model?"
  },
  "4": {
    "goal": "Trace k-means, soft memberships and hierarchical merges.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Without labels, similarity replaces the teacher",
        "key": "<b>Clustering</b> is unsupervised: it groups similar instances without any desired output.",
        "fig": {
          "type": "flow",
          "t": "Where week 4 sits",
          "items": [
            [
              "",
              "3 · Dimensionality Reduction",
              "groups features",
              "c0"
            ],
            [
              "",
              "4 · Clustering",
              "groups instances, no labels",
              "c1"
            ],
            [
              "",
              "5 · Decision Trees",
              "back to labelled prediction",
              "c2"
            ]
          ]
        },
        "html": "<p>Supervised learning receives inputs and answers. In <b>clustering</b>, we receive only inputs and look for groups.</p><p>Week 3 changed the features describing each example. This week groups the examples themselves. A group is inferred from the data; it is not a supplied answer label.</p><p>We will first assign each point to one center, then allow uncertain membership, then build a hierarchy of merges. Each method gives a different view of the grouping problem.</p>",
        "check": {
          "q": "Clustering has no class labels. What does it try to find?",
          "o": [
            "Groups based on the input data",
            "A match to supplied correct classes",
            "A reward-maximizing action policy"
          ],
          "why": "Clustering infers groups from the inputs themselves."
        }
      },
      {
        "t": "Some models choose their form before seeing the data",
        "key": "<b>Parametric</b>: learning with a <b>predefined mapping function</b> and assumptions. <b>Nonparametric</b>: learning without one.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Parametric",
              "pts": [
                "the form is chosen before the data",
                "learning fills in a fixed set of parameters",
                "e.g. y = wx + w₀: learn w and w₀"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Nonparametric",
              "pts": [
                "no form fixed in advance",
                "the shape of the model comes from the data",
                "e.g. a tree: its questions and depth come from the data"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>A <b>parametric</b> method assumes a model form and learns its parameters. For example, choosing y = w₁x + w₀ commits to a line before fitting its weights.</p><p>The lecture contrasts this with <b>nonparametric</b> methods, which do not commit to that same fixed mapping form.</p><p>This distinction concerns the assumptions of the model. It does not tell us whether training supplies labels. Keep it separate from supervised versus unsupervised learning.</p>",
        "check": {
          "q": "By slide 2's definition, which model is parametric?",
          "o": [
            "Linear regression y = wx + w₀",
            "A decision tree grown from the data",
            "Neither: the definition only covers clustering"
          ],
          "why": "The form y = wx + w₀ is fixed before learning; learning only finds w and w₀. A tree's structure comes from the data."
        }
      },
      {
        "t": "k-means repeats two simple operations",
        "key": "Assign to the nearest <b>reference vector</b>, then update that vector to the mean.",
        "fig": {
          "type": "anim",
          "name": "kmeans",
          "t": "k-means in two dimensions",
          "cap": "Change k or press <b>New data</b>: a bad start can end in a worse clustering."
        },
        "html": "<p>Choose k starting centers. Then repeat:</p><ol><li><b>Assign</b> each point to its nearest center.</li><li><b>Update</b> each center to the mean of its assigned points.</li></ol><p>The lecture example uses points 1, 2, 9, 10, 11 with initial centers 1 and 2. The first assignments put 1 alone and the others together; their new center is (2 + 9 + 10 + 11)/4 = 8. Reassigning then separates 1, 2 from 9, 10, 11. Centers settle at 1.5 and 10.</p><p>The centers move because group membership changes; membership changes because centers move.</p><div class=\"callout warn\">Initialization matters. Convergence does not guarantee the global best solution.</div>",
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
        "t": "A center stands in for the points assigned to it",
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
        "html": "<p>In colour quantisation, a cluster center is a representative colour. Each pixel stores the index of a representative instead of its full original colour.</p><p>Reconstruction replaces a point x with its assigned center m. The <b>reconstruction error</b> adds squared distances ‖x − m‖² over the points.</p><p>In the formula, bᵢᵗ is 1 when point t belongs to cluster i and 0 otherwise. It simply selects which center contributes to that point’s error. Assignment chooses the nearest center; the mean minimizes the group’s squared error.</p>",
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
        "t": "EM allows a point to belong partly to several groups",
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
        "html": "<p>k-means makes a hard choice: one point, one cluster. A Gaussian mixture can give a point memberships such as 70% in A and 30% in B.</p><ol><li><b>E-step</b>: using the current component parameters, calculate each point’s membership probabilities.</li><li><b>M-step</b>: use those probabilities as weights to update the component parameters.</li><li>Repeat.</li></ol><p>This is <b>Expectation–Maximization (EM)</b>. The uncertain point contributes partly to both groups rather than being assigned entirely to one. Follow a point between the centers in the lab: its memberships show the uncertainty.</p>",
        "check": {
          "q": "Which step updates Gaussian parameters?",
          "o": [
            "M-step",
            "E-step",
            "Dendrogram cut"
          ],
          "why": "The M-step refits parameters using E-step probabilities."
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
        "t": "A dendrogram shows which groups merged and when",
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
        "html": "<p>Hierarchical clustering starts with separate groups and repeatedly merges the closest pair.</p><p>The <b>dendrogram</b> records those merges. A horizontal cut determines the groups that remain separate at that height.</p><p>“Closest groups” needs a rule. <b>Single-link</b> uses the nearest pair of points across the groups. <b>Complete-link</b> uses the farthest pair. <b>Average-link</b> averages the cross-group distances.</p><p>So changing the linkage can change the merge order even when the points stay fixed. Read the branches below a cut, rather than treating every leaf as its own final cluster.</p>",
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
        "t": "Lower reconstruction error does not prove better groups",
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
        "html": "<p>Adding centers makes it easier to represent points closely. That can reduce reconstruction error without giving a more useful grouping.</p><p>An application may set k, such as a limited colour palette. Otherwise inspect the data, the error curve and the meaning of the groups. A bend in the curve can suggest a compromise.</p><p>The course now has two learning settings: labelled prediction and unlabelled grouping. Week 5 returns to labels, using a tree that predicts by asking a sequence of questions.</p><div class=\"callout warn\">The smallest reconstruction error alone favors more centers; with one center per point, error is zero.</div>",
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
    ],
    "question": "How can we find groups when nobody supplies class labels?"
  },
  "5": {
    "goal": "Calculate entropy and information gain, then explain leaves and pruning.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "A prediction can be a path of questions",
        "key": "A <b>decision tree</b> predicts by asking one question at a time; learning chooses the questions.",
        "fig": {
          "type": "flow",
          "t": "Where week 5 sits",
          "items": [
            [
              "",
              "2 · Supervised Learning",
              "model + loss + optimization",
              "c0"
            ],
            [
              "",
              "5 · Decision Trees",
              "a model that asks questions",
              "c1"
            ],
            [
              "",
              "6 · Multilayer Perceptrons",
              "a model of weighted sums",
              "c2"
            ]
          ]
        },
        "html": "<p>A rectangle makes one inside/outside decision. A <b>decision tree</b> asks a sequence of questions: follow one branch after each answer until a leaf gives a prediction.</p><p>Learning the tree means choosing the questions and where to stop. A useful question separates examples with different answers.</p><p>We will follow Play Tennis, measure how mixed the answers are, and compare possible splits. Then we will use numeric leaves and connect tree size back to Week 2’s overfitting problem.</p>",
        "check": {
          "q": "What makes a tree split useful for classification?",
          "o": [
            "It separates the labels into less mixed child groups",
            "It always produces more leaves",
            "It removes the need for held-out evaluation"
          ],
          "why": "Entropy and information gain quantify how much label uncertainty a split removes."
        }
      },
      {
        "t": "Follow one example from the root to a leaf",
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
              560,
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
              470,
              250,
              "1 yes, 2 no: split again",
              "c2"
            ],
            "y3": [
              650,
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
        "html": "<p>In Play Tennis, the first question is <b>Outlook</b>. Overcast leads to Yes. Sunny asks about Humidity; Rain asks about Wind.</p><p>Each internal node tests an attribute. Each branch records an answer to that test. A leaf supplies the prediction. To classify an example, follow only the branch matching its value at each node.</p><p>The slide’s Rain/Strong examples are still mixed: D6 and D14 are No, but D10 is Yes. That branch is not pure. Keep the slide’s table in view rather than assuming every branch already separates the labels perfectly.</p>",
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
        "t": "Entropy measures how mixed the labels are",
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
        "html": "<p>If every example at a node says Yes, there is no label uncertainty: <b>entropy = 0</b>. A 50/50 Yes/No split is maximally mixed for two classes: 1 bit.</p><p>For Play Tennis, 9 examples say Yes and 5 say No:</p><ol><li>Find shares: p(Yes) = 9/14; p(No) = 5/14.</li><li>For each share, calculate −p log₂ p.</li><li>Add: −(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ <b>0.940</b>.</li></ol><p>Entropy describes this node before a split. Next we measure what remains after the split.</p>",
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
        "t": "A good split leaves less weighted uncertainty",
        "key": "Minimize <b>weighted child entropy</b>, equivalently maximize <b>information gain</b>.",
        "fig": {
          "type": "anim",
          "name": "id3",
          "t": "ID3 grows the Play Tennis tree"
        },
        "html": "<p>Splitting on Outlook produces Sunny (5 examples), Overcast (4) and Rain (5). Their entropies are 0.971, 0 and 0.971.</p><ol><li>Weight each child by its share of all 14 examples.</li><li>Remaining entropy = (5/14)0.971 + (4/14)0 + (5/14)0.971 ≈ <b>0.694</b>.</li><li><b>Information gain</b> = before − after = 0.940 − 0.694 ≈ <b>0.246</b>.</li></ol><p>Compare candidate splits the same way. <b>ID3</b> chooses the largest gain. An unweighted average would give a small child the same influence as a large one; that is why the fractions matter.</p><div class=\"callout warn\">Do not average child entropies equally when branch sizes differ.</div>",
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
        "t": "A regression leaf predicts the average of its targets",
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
        "html": "<p>For a numeric target, a leaf gives a number rather than a class. A leaf containing targets 2, 4 and 6 predicts their mean: <b>4</b>.</p><ol><li>Compute residuals from 4: −2, 0, 2.</li><li>Square: 4, 0, 4.</li><li>Average: MSE = (4 + 0 + 4)/3 = <b>8/3</b>.</li></ol><p>A regression tree chooses splits that reduce numeric error. The lecture stops splitting when node error falls below θᵣ. A smaller threshold permits more splitting and potentially a more complex tree.</p><div class=\"callout warn\">More leaves can fit noise. Compare model choices on validation data.</div>",
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
        "t": "A larger tree may explain noise rather than the pattern",
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
        "html": "<p>A tree can keep splitting until it fits small accidents in the training set. As in Week 2, that can lower training error while harming new-data prediction.</p><p><b>Early stopping</b> limits growth before the full tree is built. <b>Postpruning</b> grows a tree first, then removes subtrees using a separate pruning set.</p><p>The important question is whether a branch improves performance beyond the data that produced it. Next week changes the model from a tree to a network, while keeping the same model–loss–optimization framework.</p>",
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
    ],
    "question": "How does a decision tree learn which question to ask?"
  },
  "6": {
    "goal": "Calculate a unit’s output and explain bias, activation, hidden layers and weight updates.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Build the model, then teach it by reducing error",
        "key": "A <b>multilayer perceptron</b> is a new kind of model. Week 2's <b>loss</b> and <b>optimization</b> still do the training.",
        "fig": {
          "type": "flow",
          "t": "Where week 6 sits",
          "items": [
            [
              "",
              "2 · Fit and evaluate",
              "model + loss + optimization",
              "c0"
            ],
            [
              "",
              "5 · Decision Trees",
              "a model that asks questions",
              "c0"
            ],
            [
              "",
              "6 · Multilayer Perceptrons",
              "a model made of weighted sums",
              "c1"
            ]
          ]
        },
        "html": "<p>Week 2 gave us three jobs: choose a <b>model</b>, measure its errors with a <b>loss</b>, and use <b>optimization</b> to improve its parameters.</p><p>Here the model is a network of weighted units. First understand one unit. Then add activation functions and hidden units. Finally calculate how an error leads to a weight change.</p><p>Keep forward prediction separate from learning: a forward pass computes an answer; a training update changes the weights so a later answer can be better.</p>",
        "check": {
          "q": "Which operation changes a network during learning?",
          "o": [
            "Updating its weights using the error gradients",
            "Computing a forward pass without changing weights",
            "Renaming the output classes"
          ],
          "why": "A forward pass predicts; a training update changes the parameters."
        }
      },
      {
        "t": "First multiply each input by its weight, then add",
        "key": "The <b>weighted sum</b> is a = wᵀx (including bias). An <b>activation function</b> then determines the output.",
        "fig": {
          "type": "anim",
          "name": "wtx",
          "t": "Transpose, then multiply and add"
        },
        "html": "<p>A unit receives inputs x₁ … x_d. Each input has a weight, which controls its contribution.</p><p>Its sum is <b>a = w₁x₁ + … + w_dx_d + w₀</b>. The extra term w₀ is the <b>bias</b>. The slides include it in wᵀx by adding a fixed input x₀ = 1.</p><p>The superscript ᵀ transposes a column into a row. Row × column gives one number: the sum of corresponding products. For a linear regression output, y = a. For classification, an activation function transforms the sum. Do not treat computing the sum and choosing an activation as the same operation.</p>",
        "check": {
          "q": "w and x each have 3 entries. What kind of thing is wᵀx?",
          "o": [
            "A single number",
            "A row of 3 numbers",
            "A 3 × 3 table"
          ],
          "why": "A row times a column: three products added into one number, the weighted sum."
        }
      },
      {
        "t": "Bias moves the boundary without changing its direction",
        "key": "Without the <b>bias w₀</b> the boundary must pass through (0, 0). Changing w₀ <b>shifts</b> the line: AND and OR differ <b>only</b> in the bias.",
        "fig": {
          "type": "plot",
          "t": "Same weights w₁ = w₂ = +1, two biases",
          "w": 380,
          "h": 330,
          "x": [
            -0.3,
            1.8
          ],
          "y": [
            -0.3,
            1.8
          ],
          "xl": "x₁",
          "yl": "x₂",
          "lines": [
            {
              "pts": [
                [
                  -0.3,
                  1.8
                ],
                [
                  1.8,
                  -0.3
                ]
              ],
              "c": "c3"
            },
            {
              "pts": [
                [
                  -0.3,
                  0.8
                ],
                [
                  0.8,
                  -0.3
                ]
              ],
              "c": "c2",
              "dash": true
            }
          ],
          "pts": [
            [
              0,
              0,
              "c0",
              "(0,0)"
            ],
            [
              0,
              1,
              "c0",
              "(0,1)"
            ],
            [
              1,
              0,
              "c0",
              "(1,0)"
            ],
            [
              1,
              1,
              "c4",
              "(1,1)"
            ]
          ],
          "cap": "Solid purple: w₀ = −1.5, only (1, 1) is above it (AND). Dashed orange: w₀ = −0.5, everything but (0, 0) is above it (OR). Moving w₀ slides the line without turning it."
        },
        "html": "<p>With w₁ = w₂ = 1, the unit predicts 1 when x₁ + x₂ + w₀ &gt; 0. Its boundary is where that sum equals zero.</p><ol><li>Set w₀ = −1.5: the boundary is x₁ + x₂ = 1.5. Only (1,1) passes: <b>AND</b>.</li><li>Change only w₀ to −0.5: the boundary is x₁ + x₂ = 0.5. All but (0,0) pass: <b>OR</b>.</li></ol><p>The weights set direction; bias shifts position. With w₀ = 0 the boundary must pass through the origin. For regression, the same idea appears in y = wx + w₀: w₀ moves the line up or down.</p>",
        "lab": {
          "href": "w6/perceptron.html",
          "todo": [
            "Press <b>Slide 11 weights (AND)</b>: 4 / 4 right. Click row (1, 1) and read wᵀx = 0.5.",
            "Change <b>only w₀</b> to −0.5 and pick target <b>OR</b>: still 4 / 4. Only the bias changed.",
            "Set w₀ = 0 and target AND. Try any w₁, w₂: you never reach 4 / 4, because the line must pass through (0, 0)."
          ]
        },
        "check": {
          "q": "Set w₀ = 0 in the AND unit. What happens to its boundary line?",
          "o": [
            "It must pass through the origin",
            "It disappears",
            "It turns into a curve"
          ],
          "why": "w₁x₁ + w₂x₂ = 0 always contains (0, 0). The bias is the only thing that can move the line away from it."
        }
      },
      {
        "t": "Activation turns a sum into the kind of output we need",
        "key": "The <b>activation function</b> turns wᵀx into the output. <b>Sigmoid</b> squeezes any sum into (0, 1), read as a probability: one sigmoid output for <b>binary classification</b>.",
        "fig": {
          "type": "plot",
          "t": "Three activation functions from slide 5",
          "w": 520,
          "h": 300,
          "x": [
            -4,
            4
          ],
          "y": [
            -1.2,
            2.2
          ],
          "xl": "a = wᵀx",
          "yl": "output",
          "lines": [
            {
              "pts": [
                [
                  -4,
                  1
                ],
                [
                  4,
                  1
                ]
              ],
              "c": "mute",
              "dash": true
            },
            {
              "pts": [
                [
                  -4,
                  -1
                ],
                [
                  4,
                  -1
                ]
              ],
              "c": "mute",
              "dash": true
            },
            {
              "pts": [
                [
                  -4,
                  0
                ],
                [
                  4,
                  0
                ]
              ],
              "c": "mute",
              "dash": true
            },
            {
              "pts": [
                [
                  -4,
                  0.01798620996209156
                ],
                [
                  -3.8666666666666667,
                  0.0204990097819817
                ],
                [
                  -3.7333333333333334,
                  0.023354516476977092
                ],
                [
                  -3.6,
                  0.026596993576865856
                ],
                [
                  -3.466666666666667,
                  0.030275691986950463
                ],
                [
                  -3.3333333333333335,
                  0.03444519566621117
                ],
                [
                  -3.2,
                  0.039165722796764356
                ],
                [
                  -3.0666666666666664,
                  0.044503355262287055
                ],
                [
                  -2.9333333333333336,
                  0.05053016223541345
                ],
                [
                  -2.8,
                  0.057324175898868755
                ],
                [
                  -2.666666666666667,
                  0.06496916912866404
                ],
                [
                  -2.533333333333333,
                  0.07355417693481897
                ],
                [
                  -2.4,
                  0.08317269649392238
                ],
                [
                  -2.2666666666666666,
                  0.09392149601927118
                ],
                [
                  -2.1333333333333333,
                  0.10589896223591787
                ],
                [
                  -2,
                  0.11920292202211755
                ],
                [
                  -1.8666666666666667,
                  0.13392788832407365
                ],
                [
                  -1.7333333333333334,
                  0.1501617062898473
                ],
                [
                  -1.6,
                  0.16798161486607552
                ],
                [
                  -1.4666666666666668,
                  0.18744979299574124
                ],
                [
                  -1.3333333333333335,
                  0.2086085273260449
                ],
                [
                  -1.2000000000000002,
                  0.23147521650098232
                ],
                [
                  -1.0666666666666669,
                  0.25603750867524194
                ],
                [
                  -0.9333333333333331,
                  0.28224894304226006
                ],
                [
                  -0.7999999999999998,
                  0.31002551887238755
                ],
                [
                  -0.6666666666666665,
                  0.33924363123418283
                ],
                [
                  -0.5333333333333332,
                  0.36973977708224876
                ],
                [
                  -0.3999999999999999,
                  0.401312339887548
                ],
                [
                  -0.2666666666666666,
                  0.4337256058045608
                ],
                [
                  -0.1333333333333333,
                  0.4667159617488687
                ],
                [
                  0,
                  0.5
                ],
                [
                  0.13333333333333375,
                  0.5332840382511314
                ],
                [
                  0.2666666666666666,
                  0.5662743941954392
                ],
                [
                  0.40000000000000036,
                  0.5986876601124521
                ],
                [
                  0.5333333333333332,
                  0.6302602229177513
                ],
                [
                  0.666666666666667,
                  0.6607563687658172
                ],
                [
                  0.7999999999999998,
                  0.6899744811276125
                ],
                [
                  0.9333333333333336,
                  0.71775105695774
                ],
                [
                  1.0666666666666664,
                  0.7439624913247579
                ],
                [
                  1.2000000000000002,
                  0.7685247834990178
                ],
                [
                  1.333333333333333,
                  0.791391472673955
                ],
                [
                  1.4666666666666668,
                  0.8125502070042588
                ],
                [
                  1.5999999999999996,
                  0.8320183851339245
                ],
                [
                  1.7333333333333334,
                  0.8498382937101527
                ],
                [
                  1.8666666666666663,
                  0.8660721116759263
                ],
                [
                  2,
                  0.8807970779778823
                ],
                [
                  2.1333333333333337,
                  0.8941010377640822
                ],
                [
                  2.2666666666666666,
                  0.9060785039807289
                ],
                [
                  2.4000000000000004,
                  0.9168273035060777
                ],
                [
                  2.533333333333333,
                  0.926445823065181
                ],
                [
                  2.666666666666667,
                  0.935030830871336
                ],
                [
                  2.8,
                  0.9426758241011313
                ],
                [
                  2.9333333333333336,
                  0.9494698377645865
                ],
                [
                  3.0666666666666664,
                  0.955496644737713
                ],
                [
                  3.2,
                  0.9608342772032357
                ],
                [
                  3.333333333333333,
                  0.9655548043337887
                ],
                [
                  3.466666666666667,
                  0.9697243080130495
                ],
                [
                  3.5999999999999996,
                  0.973403006423134
                ],
                [
                  3.7333333333333334,
                  0.9766454835230229
                ],
                [
                  3.8666666666666663,
                  0.9795009902180184
                ],
                [
                  4,
                  0.9820137900379085
                ]
              ],
              "c": "c0"
            },
            {
              "pts": [
                [
                  -4,
                  -0.999329299739067
                ],
                [
                  -3.8666666666666667,
                  -0.9991244200040039
                ],
                [
                  -3.7333333333333334,
                  -0.9988569911528391
                ],
                [
                  -3.6,
                  -0.9985079423323266
                ],
                [
                  -3.466666666666667,
                  -0.9980524058245887
                ],
                [
                  -3.3333333333333335,
                  -0.9974579674738373
                ],
                [
                  -3.2,
                  -0.9966823978396512
                ],
                [
                  -3.0666666666666664,
                  -0.9956707161399166
                ],
                [
                  -2.9333333333333336,
                  -0.994351401294543
                ],
                [
                  -2.8,
                  -0.992631520201128
                ],
                [
                  -2.666666666666667,
                  -0.9903904942256809
                ],
                [
                  -2.533333333333333,
                  -0.9874721748839344
                ],
                [
                  -2.4,
                  -0.9836748576936802
                ],
                [
                  -2.2666666666666666,
                  -0.978738846227712
                ],
                [
                  -2.1333333333333333,
                  -0.972331216886695
                ],
                [
                  -2,
                  -0.9640275800758169
                ],
                [
                  -1.8666666666666667,
                  -0.9532909670460458
                ],
                [
                  -1.7333333333333334,
                  -0.9394486160260991
                ],
                [
                  -1.6,
                  -0.9216685544064713
                ],
                [
                  -1.4666666666666668,
                  -0.8989396755291731
                ],
                [
                  -1.3333333333333335,
                  -0.870061661742672
                ],
                [
                  -1.2000000000000002,
                  -0.8336546070121553
                ],
                [
                  -1.0666666666666669,
                  -0.7882020755281643
                ],
                [
                  -0.9333333333333331,
                  -0.7321442233518527
                ],
                [
                  -0.7999999999999998,
                  -0.6640367702678489
                ],
                [
                  -0.6666666666666665,
                  -0.5827829453479101
                ],
                [
                  -0.5333333333333332,
                  -0.4879249826495159
                ],
                [
                  -0.3999999999999999,
                  -0.37994896225522484
                ],
                [
                  -0.2666666666666666,
                  -0.26052044583550255
                ],
                [
                  -0.1333333333333333,
                  -0.13254878839087836
                ],
                [
                  0,
                  0
                ],
                [
                  0.13333333333333375,
                  0.13254878839087877
                ],
                [
                  0.2666666666666666,
                  0.26052044583550255
                ],
                [
                  0.40000000000000036,
                  0.37994896225522523
                ],
                [
                  0.5333333333333332,
                  0.4879249826495159
                ],
                [
                  0.666666666666667,
                  0.5827829453479103
                ],
                [
                  0.7999999999999998,
                  0.6640367702678489
                ],
                [
                  0.9333333333333336,
                  0.7321442233518527
                ],
                [
                  1.0666666666666664,
                  0.7882020755281642
                ],
                [
                  1.2000000000000002,
                  0.8336546070121553
                ],
                [
                  1.333333333333333,
                  0.8700616617426717
                ],
                [
                  1.4666666666666668,
                  0.8989396755291731
                ],
                [
                  1.5999999999999996,
                  0.9216685544064712
                ],
                [
                  1.7333333333333334,
                  0.9394486160260991
                ],
                [
                  1.8666666666666663,
                  0.9532909670460458
                ],
                [
                  2,
                  0.9640275800758169
                ],
                [
                  2.1333333333333337,
                  0.9723312168866951
                ],
                [
                  2.2666666666666666,
                  0.978738846227712
                ],
                [
                  2.4000000000000004,
                  0.9836748576936802
                ],
                [
                  2.533333333333333,
                  0.9874721748839344
                ],
                [
                  2.666666666666667,
                  0.9903904942256809
                ],
                [
                  2.8,
                  0.992631520201128
                ],
                [
                  2.9333333333333336,
                  0.994351401294543
                ],
                [
                  3.0666666666666664,
                  0.9956707161399166
                ],
                [
                  3.2,
                  0.9966823978396512
                ],
                [
                  3.333333333333333,
                  0.9974579674738373
                ],
                [
                  3.466666666666667,
                  0.9980524058245887
                ],
                [
                  3.5999999999999996,
                  0.9985079423323266
                ],
                [
                  3.7333333333333334,
                  0.9988569911528391
                ],
                [
                  3.8666666666666663,
                  0.9991244200040039
                ],
                [
                  4,
                  0.999329299739067
                ]
              ],
              "c": "c2",
              "dash": true
            },
            {
              "pts": [
                [
                  -4,
                  0
                ],
                [
                  0,
                  0
                ],
                [
                  2.2,
                  2.2
                ]
              ],
              "c": "c1"
            }
          ],
          "texts": [
            [
              -3.75,
              1.07,
              "1"
            ],
            [
              -3.75,
              0.07,
              "0"
            ],
            [
              -3.7,
              -0.93,
              "−1"
            ],
            [
              -2.2,
              0.62,
              "sigmoid(0) = 0.5",
              "c0"
            ]
          ],
          "pts": [
            [
              0,
              0.5,
              "c0"
            ]
          ],
          "cap": "Blue: sigmoid, between 0 and 1. Dashed orange: tanh, between −1 and 1. Green: ReLU, 0 for negative sums, then a straight line. Softmax is not one curve: it works on all K outputs at once (next step)."
        },
        "html": "<p>The weighted sum can be any number. An <b>activation function</b> transforms it.</p><p>For binary classification, <b>sigmoid</b> maps it into (0,1), interpreted as the probability of class 1. At sum 0, sigmoid outputs 0.5. A positive sum therefore corresponds to probability above 0.5.</p><p>The lecture also lists <b>tanh</b>, with range (−1,1), and <b>ReLU</b>, max(0,a). Linear outputs suit regression. Activation is applied during prediction as well as training; it is part of the model, not a preprocessing step.</p><p>Read the plotted curves as input sum → output value.</p>",
        "check": {
          "q": "A spam filter has one output: spam or not spam. Which output activation fits?",
          "o": [
            "Sigmoid",
            "Softmax over many classes",
            "Linear, no activation"
          ],
          "why": "Two classes: one sigmoid output in (0, 1), read as P(spam). Linear outputs are for regression."
        }
      },
      {
        "t": "Softmax makes several scores share one probability total",
        "key": "For <b>K &gt; 2 classes</b> use <b>softmax</b>: every output is in (0, 1), the outputs <b>sum to 1</b>, and the network chooses the class with the <b>largest</b>.",
        "fig": {
          "type": "bars",
          "t": "Scores 2, 1, 0 after softmax",
          "max": 1,
          "items": [
            [
              "C₁ (score 2)",
              0.665,
              "c1",
              "0.665"
            ],
            [
              "C₂ (score 1)",
              0.245,
              "c0",
              "0.245"
            ],
            [
              "C₃ (score 0)",
              0.09,
              "c0",
              "0.090"
            ]
          ],
          "cap": "0.665 + 0.245 + 0.090 = 1. Choose C₁, the largest probability."
        },
        "html": "<p>For K classes, the model produces K scores. <b>Softmax</b> turns them into probabilities that add to 1.</p><ol><li>For scores 2, 1, 0, exponentiate: e² ≈ 7.39, e¹ ≈ 2.72, e⁰ = 1.</li><li>Add them: 11.11.</li><li>Divide each by the total: approximately 0.665, 0.245, 0.090.</li><li>Choose the largest probability: class 1.</li></ol><p>Every class uses the same denominator, so their probabilities compete. This is different from applying independent sigmoids to each score. The bars show the resulting distribution, not the original scores.</p>",
        "check": {
          "q": "Softmax outputs for four classes are 0.1, 0.5, 0.3 and one more. What is the fourth?",
          "o": [
            "0.1",
            "0.5",
            "It cannot be known"
          ],
          "why": "Softmax outputs always sum to 1: 1 − 0.9 = 0.1."
        }
      },
      {
        "t": "XOR needs more than one straight boundary",
        "key": "A perceptron draws <b>one line</b>. XOR needs two, so a <b>multilayer perceptron</b> adds <b>hidden units</b> between input and output.",
        "fig": {
          "type": "plot",
          "t": "XOR and the two hidden lines of slide 15",
          "w": 380,
          "h": 330,
          "x": [
            -0.3,
            1.8
          ],
          "y": [
            -0.3,
            1.8
          ],
          "xl": "x₁",
          "yl": "x₂",
          "lines": [
            {
              "pts": [
                [
                  0.2,
                  -0.3
                ],
                [
                  1.8,
                  1.3
                ]
              ],
              "c": "c3"
            },
            {
              "pts": [
                [
                  -0.3,
                  0.2
                ],
                [
                  1.3,
                  1.8
                ]
              ],
              "c": "c2"
            }
          ],
          "pts": [
            [
              0,
              0,
              "c0",
              "0"
            ],
            [
              1,
              1,
              "c0",
              "0"
            ],
            [
              0,
              1,
              "c4",
              "1"
            ],
            [
              1,
              0,
              "c4",
              "1"
            ]
          ],
          "cap": "Coral points: XOR = 1; blue: XOR = 0. Purple line: hidden unit z₁ (x₁ AND ~x₂) cuts off (1, 0). Orange line: z₂ (~x₁ AND x₂) cuts off (0, 1)."
        },
        "html": "<p>XOR is 1 at (1,0) and (0,1), but 0 at (0,0) and (1,1). One line cannot put both 1s on one side and both 0s on the other.</p><p>The slide’s <b>hidden layer</b> solves two smaller problems: z₁ = x₁ AND NOT x₂, and z₂ = NOT x₁ AND x₂. The output computes z₁ OR z₂. Two hidden boundaries isolate the two positive corners.</p><p>The hidden activations matter. Without nonlinear activations, stacking weighted sums would still collapse into one linear model. More layers alone do not create the needed nonlinear decision.</p>",
        "lab": {
          "href": "w6/perceptron.html",
          "todo": [
            "Pick target <b>XOR</b> and move all three sliders: no setting reaches 4 / 4.",
            "Tick <b>Hidden layer</b>. Read z₁ and z₂ in each row, then check y = z₁ OR z₂."
          ]
        },
        "check": {
          "q": "Why does slide 15's network solve XOR when one perceptron cannot?",
          "o": [
            "Two hidden units draw two lines and the output ORs them",
            "Its bias is larger",
            "It uses softmax at the output"
          ],
          "why": "Each hidden unit is one line. Together they cut off both 1s, and the output combines them with OR."
        }
      },
      {
        "t": "Learning nudges a weight in the direction that lowers error",
        "key": "Training moves each weight against the slope of the error: <b>w ← w − η·∂E/∂w</b>. The <b>learning rate η</b> is the step size.",
        "fig": {
          "type": "anim",
          "name": "descent",
          "t": "Gradient descent on slide 17's example"
        },
        "html": "<p>Use the lecture’s one-weight example: x = 1.5, target r = 0.5, weight w = 0.8.</p><ol><li>Predict: y = xw = 1.2.</li><li>Measure error: E = ½(r − y)² = ½(−0.7)² = <b>0.245</b>.</li><li>Calculate the slope: ∂E/∂w = x(y − r) = <b>1.05</b>.</li><li>With learning rate η = 0.1, update: w ← w − η·∂E/∂w = 0.8 − 0.105 = <b>0.695</b>.</li></ol><p>A positive slope means reducing w lowers error locally. η controls the step size. Too small learns slowly; too large can overshoot and increase error.</p><div class=\"callout warn\">Slides 8 to 10 print Δw = −η(r − y)x. The worked example needs Δw = +η(r − y)x = 0.1 × (−0.7) × 1.5 = −0.105, which takes w from 0.8 to 0.695. The slides disagree on the sign; the worked example is the one that lowers E. The error is also printed three ways: 0.249 on slide 17, 0.245 on slide 19 and 0.49 on slide 20; ½ × 0.7² = 0.245 is right.</div>",
        "check": {
          "q": "In the animation η = 1.0 makes E grow. Why?",
          "o": [
            "Each step jumps past the minimum, further every time",
            "The slope becomes zero",
            "The bias is missing"
          ],
          "why": "The step is too big: w lands on the other side of the bowl, higher up than before."
        }
      },
      {
        "t": "Backpropagation finds how each weight affected the error",
        "key": "<b>Backpropagation</b> uses the <b>chain rule</b>: multiply the derivatives along the path from E back to a weight, then take a gradient step with η.",
        "fig": {
          "type": "graph",
          "t": "Slide 26's 2-2-2 network",
          "w": 640,
          "h": 260,
          "nodes": {
            "x1": [
              80,
              70,
              "x₁ = 0.05",
              "c0"
            ],
            "x2": [
              80,
              190,
              "x₂ = 0.10",
              "c0"
            ],
            "h1": [
              320,
              70,
              "h₁ = 0.593",
              "c3"
            ],
            "h2": [
              320,
              190,
              "h₂ = 0.597",
              "c3"
            ],
            "y1": [
              560,
              70,
              "y₁ = 0.751",
              "c1"
            ],
            "y2": [
              560,
              190,
              "y₂ = 0.773",
              "c1"
            ]
          },
          "edges": [
            [
              "x1",
              "h1",
              "w₁"
            ],
            [
              "x1",
              "h2",
              "w₃",
              -40
            ],
            [
              "x2",
              "h1",
              "w₂",
              -40
            ],
            [
              "x2",
              "h2",
              "w₄"
            ],
            [
              "h1",
              "y1",
              "w₅"
            ],
            [
              "h1",
              "y2",
              "w₇",
              -40
            ],
            [
              "h2",
              "y1",
              "w₆",
              -40
            ],
            [
              "h2",
              "y2",
              "w₈"
            ]
          ],
          "cap": "Targets r₁ = 0.01, r₂ = 0.99. Forward pass left to right; the error travels back right to left."
        },
        "html": "<p>A forward pass computes hidden outputs, final predictions and loss. To improve a hidden weight, we must trace its effect through the later units.</p><p><b>Backpropagation</b> applies the chain rule backwards: multiply derivatives along the path from the error to the weight, adding contributions when paths branch.</p><p>For the slide’s output weight w₅, the factors are approximately 0.741 × 0.187 × 0.593 = 0.082. With η = 0.5, update 0.4 − 0.5 × 0.082 ≈ <b>0.359</b>. The factors represent output error, sigmoid slope and hidden input.</p><p>Backpropagation calculates gradients; the update uses them. We have connected the course’s model, loss and optimization into one training procedure.</p><div class=\"callout warn\">Slide 26 prints the second hidden sum as 0.3775, copied from the first. The existing worked calculation gives 0.3925, producing h₂ ≈ 0.597.</div>",
        "check": {
          "q": "Why is it called backpropagation?",
          "o": [
            "The error derivative is passed from the output back towards the inputs",
            "The inputs are fed in backwards",
            "Training runs the data set in reverse order"
          ],
          "why": "The forward pass computes outputs; the backward pass sends ∂E back through each layer with the chain rule."
        }
      }
    ],
    "question": "How do simple weighted units become a model that learns?"
  }
};
