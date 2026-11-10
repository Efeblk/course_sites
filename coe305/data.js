/* COE305 study data. Reorganized from existing Alpaydın-derived course content. */
window.COURSE = window.COE305 = {
  "id": "coe305",
  "code": "COE305",
  "name": "Machine Learning",
  "term": "Fall 2026-2027",
  "lecturer": "Asst. Prof. Muhammed Davud",
  "examFormat": "Projects 30% · Midterm 30% · Final 40%. Midterm format not announced.",
  "textbooks": [
    "Ethem Alpaydın — Introduction to Machine Learning, 2nd ed. (MIT Press). The slides are this book's lecture notes."
  ],
  "projects": [],
  "chapters": [
    {
      "n": 1,
      "title": "Introduction",
      "summary": "What machine learning is and when we need it, and the main kinds of learning: associations, supervised learning (classification and regression), unsupervised learning and reinforcement learning.",
      "takeaways": [
        "Learning optimizes performance from examples or experience.",
        "Use learning for missing, unexplainable, changing or individual expertise.",
        "Association rules condition on X: P(Y | X).",
        "Classification predicts a class; regression predicts a number.",
        "Unsupervised learning finds structure without desired outputs.",
        "Reinforcement learning uses reward to learn a policy."
      ],
      "traps": [
        [
          "Every program should learn from data",
          "If we can write the rule (payroll), there is nothing to learn. Learning helps when the rule is unknown, unexplainable, changing or personal."
        ],
        [
          "Classification and regression differ in the algorithm",
          "They differ in the output: a class label (low-/high-risk) vs a real number (a price)."
        ],
        [
          "Clustering is classification without a teacher, so it predicts the class names",
          "Clustering finds groups. It never sees class labels, so it can't name them. You interpret the clusters afterwards."
        ],
        [
          "Reinforcement learning gets the correct answer after every action",
          "It gets only a (possibly delayed) reward. No one says which action was correct."
        ],
        [
          "P(mouse | computer) = P(computer | mouse)",
          "Conditional probability is not symmetric. P(Y | X) = buys(X and Y) / buys(X)."
        ]
      ],
      "activities": [
        {
          "id": "w1-credit",
          "title": "Credit Scoring Lab",
          "desc": "Slide the thresholds θ₁ (income) and θ₂ (savings) of the lecture's discriminant and watch false positives and false negatives change. Then try a regression line on used-car prices.",
          "href": "w1/credit.html"
        },
        {
          "id": "w1-basket",
          "title": "Basket Analysis",
          "desc": "Edit shopping baskets and compute P(Y | X) for every pair of products. Find the rule P(mouse | computer) and see why P(Y | X) ≠ P(X | Y).",
          "href": "w1/basket.html"
        }
      ],
      "quiz": [
        {
          "q": "The lecture defines machine learning as…",
          "options": [
            "Optimize performance using examples",
            "Writing explicit rules for every possible input",
            "Storing large amounts of data in warehouses",
            "Any program that uses statistics"
          ],
          "answer": 0,
          "explain": "Slides 3 and 6: optimize a performance criterion using example data or past experience."
        },
        {
          "q": "Which task does NOT need learning?",
          "options": [
            "Recognizing speech",
            "Calculating payroll",
            "Routing on a computer network that changes over time",
            "Authenticating a user by biometrics"
          ],
          "answer": 1,
          "explain": "Payroll has a known, fixed rule. Speech: we can't explain our expertise. Routing: the solution changes. Biometrics: the solution adapts to each person."
        },
        {
          "q": "Navigating on Mars is an example of learning because…",
          "options": [
            "Humans are unable to explain their expertise",
            "The solution changes in time",
            "Expertise does not exist",
            "It needs to be adapted to particular cases"
          ],
          "answer": 2,
          "explain": "Nobody has driven on Mars before. Speech recognition is the \"can't explain\" example."
        },
        {
          "q": "\"People who bought laptops also bought a mouse\" is which kind of learning?",
          "options": [
            "Regression",
            "Reinforcement learning",
            "Dimensionality reduction",
            "Association learning"
          ],
          "answer": 3,
          "explain": "Association rules estimate P(Y | X): P(mouse | computer) = 0.7 on the slide."
        },
        {
          "q": "P(mouse | computer) = 0.7 means…",
          "options": [
            "70% of computer buyers also buy a mouse",
            "70% of mouse buyers also buy a computer",
            "70% of all customers buy both",
            "A mouse is 70% cheaper than a computer"
          ],
          "answer": 0,
          "explain": "Condition on X = computer. P(computer | mouse) is a different number."
        },
        {
          "q": "The credit scoring discriminant is…",
          "options": [
            "IF income > θ₁ OR savings > θ₂ THEN high-risk",
            "Both income and savings exceed thresholds",
            "risk = w·income + w₀",
            "Group customers into k clusters"
          ],
          "answer": 1,
          "explain": "Two thresholds make a rectangle in the (income, savings) plane: low-risk is the upper-right region."
        },
        {
          "q": "Predicting the price of a used car from its mileage is…",
          "options": [
            "Classification — the output is a class",
            "Clustering",
            "Regression",
            "Association"
          ],
          "answer": 2,
          "explain": "Slide 12: y = w·x + w₀. A numeric output means regression."
        },
        {
          "q": "In y = w·x + w₀, what are w and w₀?",
          "options": [
            "The input and the output",
            "Fixed constants chosen by the programmer",
            "The number of training examples",
            "Slope and intercept"
          ],
          "answer": 3,
          "explain": "Learning = finding the w and w₀ that best fit the training pairs (x, y)."
        },
        {
          "q": "\"The rule is simpler than the data it explains\" describes which use of supervised learning?",
          "options": [
            "Compression",
            "Prediction",
            "Knowledge extraction",
            "Outlier detection"
          ],
          "answer": 0,
          "explain": "Prediction: future inputs. Knowledge extraction: the rule is easy to understand. Compression: simpler than the data. Outlier detection: exceptions not covered by the rule, e.g. fraud."
        },
        {
          "q": "Unsupervised learning differs from supervised learning because…",
          "options": [
            "It uses a reward signal",
            "No desired outputs are supplied",
            "It always predicts a number",
            "It needs more labeled data"
          ],
          "answer": 1,
          "explain": "Supervised data is pairs (x, r). Unsupervised data is just x. Clustering is the main example."
        },
        {
          "q": "Color quantization in image compression is an application of…",
          "options": [
            "Regression",
            "Reinforcement learning",
            "Clustering",
            "Association rules"
          ],
          "answer": 2,
          "explain": "Group similar colors and replace each pixel by its cluster's color. Week 4's k-means does exactly this."
        },
        {
          "q": "A robot learning to escape a maze from a reward at the exit is…",
          "options": [
            "Supervised classification",
            "Clustering",
            "Regression",
            "Reinforcement learning"
          ],
          "answer": 3,
          "explain": "There is no correct action label at each step, only a delayed reward. The output is a sequence of actions (a policy)."
        }
      ],
      "cards": [
        [
          "Machine learning",
          "Programming computers to optimize a performance criterion using example data or past experience."
        ],
        [
          "When to learn",
          "Expertise doesn't exist (Mars), can't be explained (speech), changes in time (routing), or must adapt to cases (biometrics)."
        ],
        [
          "Model",
          "A good and useful approximation of the data, learned from particular examples."
        ],
        [
          "Association rule",
          "P(Y | X): probability that a customer who buys X also buys Y. Basket analysis."
        ],
        [
          "Classification",
          "Supervised learning with a discrete output (class). E.g. low-risk vs high-risk."
        ],
        [
          "Discriminant",
          "A function/rule that separates the classes. IF income > θ₁ AND savings > θ₂ THEN low-risk."
        ],
        [
          "Regression",
          "Supervised learning with a numeric output. E.g. y = w·x + w₀ for a used car's price."
        ],
        [
          "Supervised learning",
          "Learning from pairs (input, desired output). Uses: prediction, knowledge extraction, compression, outlier detection."
        ],
        [
          "Unsupervised learning",
          "No output given. Find structure / what normally happens, e.g. clustering."
        ],
        [
          "Clustering",
          "Grouping similar instances. Customer segmentation, color quantization, bioinformatics motifs."
        ],
        [
          "Reinforcement learning",
          "Learn a policy (sequence of outputs) from delayed reward. Games, robot in a maze."
        ],
        [
          "Outlier detection",
          "Finding exceptions not covered by the learned rule, e.g. fraud."
        ],
        [
          "Data mining",
          "Applying ML to large databases: retail baskets, credit scoring, fraud, diagnosis, spam, web search."
        ]
      ]
    },
    {
      "n": 2,
      "title": "Supervised Learning",
      "summary": "Learning a class from examples (the family car): hypothesis class H, empirical error, S, G and the version space, margin. Multiple classes, regression with squared error, model selection and generalization, the triple trade-off, cross-validation and the three dimensions of a supervised learner.",
      "takeaways": [
        "A hypothesis predicts; its training error counts mistakes.",
        "Consistent hypotheses form the version space.",
        "Inductive bias supplies assumptions beyond the examples.",
        "MAE averages magnitudes; MSE averages squared residuals.",
        "Too much complexity can overfit noise.",
        "Train fits, validation chooses, test reports."
      ],
      "traps": [
        [
          "The hypothesis h is the class C",
          "C is the true (unknown) concept. h is our approximation from H. Their difference shows up as false positives and false negatives."
        ],
        [
          "Zero training error means the best model",
          "Every h in the version space has zero training error. Pick the one with the largest margin, and remember that noise makes zero error suspicious (overfitting)."
        ],
        [
          "S is the biggest rectangle",
          "S is the most Specific (smallest) rectangle around the positives. G is the most General (largest) rectangle that still excludes every negative."
        ],
        [
          "A more complex model always generalizes better",
          "Training error keeps falling, but generalization error falls and then rises (overfitting). More data N is what reliably lowers E."
        ],
        [
          "Tune hyperparameters on the test set",
          "Use the validation set (or CV on the training data). The test set is touched once, at the end, for the number you report."
        ]
      ],
      "activities": [
        {
          "id": "w2-hypothesis",
          "title": "Family Car Hypothesis Lab",
          "desc": "Drag a rectangle h over price × engine power, count false positives and negatives, then reveal S, G and the version space and pick the largest margin. Includes the slide's cars A–E.",
          "href": "w2/hypothesis.html"
        },
        {
          "id": "w2-regression",
          "title": "Regression & Overfitting",
          "desc": "Fit polynomials of degree 0–9 to noisy data. Watch training error fall while validation error turns back up, and change N to see the triple trade-off. Reproduce the slide's MAE table.",
          "href": "w2/regression.html"
        },
        {
          "id": "w2-crossval",
          "title": "K-Fold Cross-Validation",
          "desc": "Rotate validation folds and compare their scores for K = 3, 5 and 10. Compare with a single hold-out split.",
          "href": "w2/crossval.html"
        }
      ],
      "quiz": [
        {
          "q": "In the family car problem, the input representation is…",
          "options": [
            "Price and engine power",
            "x₁ = color, x₂ = brand",
            "x₁ = price only",
            "The car's photo"
          ],
          "answer": 0,
          "explain": "Slide 3. The output r is 1 for a family car (positive) and 0 otherwise."
        },
        {
          "q": "E(h | X) = Σₜ 1(h(xᵗ) ≠ rᵗ) counts…",
          "options": [
            "How many positives there are",
            "Count of training mistakes",
            "The area of the rectangle",
            "The distance to the nearest point"
          ],
          "answer": 1,
          "explain": "1(·) is 1 when the condition is true. Slide 6: A and C are misclassified, so E = 2."
        },
        {
          "q": "Car A has r = 0 but h predicts 1. This is a…",
          "options": [
            "False negative",
            "True positive",
            "False positive",
            "True negative"
          ],
          "answer": 2,
          "explain": "Predicted positive, actually negative. A false negative is a positive that h misses."
        },
        {
          "q": "The most specific hypothesis S is…",
          "options": [
            "The largest rectangle that excludes all negatives",
            "The true class C",
            "Any rectangle with zero error",
            "Tightest consistent rectangle"
          ],
          "answer": 3,
          "explain": "In the lecture’s rectangular example, S tightly contains the positives while excluding negatives."
        },
        {
          "q": "The version space is…",
          "options": [
            "All consistent hypotheses",
            "All hypotheses in H",
            "Only S and G",
            "The hypotheses with the largest error"
          ],
          "answer": 0,
          "explain": "Consistent hypotheses have zero training error; the lecture illustrates them between S and G."
        },
        {
          "q": "Which is NOT a listed reason to prefer the simpler model?",
          "options": [
            "Simpler to use (lower computational complexity)",
            "Always lower training error",
            "Easier to explain",
            "Generalizes better (lower variance)"
          ],
          "answer": 1,
          "explain": "Simpler models usually have higher training error. The reasons are: simpler to use, easier to train, easier to explain, generalize better."
        },
        {
          "q": "With K classes we train…",
          "options": [
            "One hypothesis with K outputs only",
            "K² pairwise hypotheses always",
            "K one-versus-rest models",
            "No hypotheses — we cluster instead"
          ],
          "answer": 2,
          "explain": "Slide 10: one r column per class, hᵢ(x) = 1 if x ∈ Cᵢ."
        },
        {
          "q": "Slide 12 residuals are −5, 2, 5, −5, 3. The mean absolute error is…",
          "options": [
            "0",
            "17.6",
            "20",
            "4"
          ],
          "answer": 3,
          "explain": "(5 + 2 + 5 + 5 + 3) / 5 = 20 / 5 = 4. Signed residuals sum to 0, which is why we use |·| or squares."
        },
        {
          "q": "For the same residuals (−5, 2, 5, −5, 3), the MSE is…",
          "options": [
            "17.6",
            "4",
            "88",
            "4.2"
          ],
          "answer": 0,
          "explain": "(25 + 4 + 25 + 25 + 9) / 5 = 88 / 5 = 17.6. RMSE = √17.6 ≈ 4.2."
        },
        {
          "q": "Overfitting happens when…",
          "options": [
            "H is less complex than C",
            "Fitting noise with excess complexity",
            "N is very large",
            "The test set is used once"
          ],
          "answer": 1,
          "explain": "Slide 13. A complex H also fits the noise. Underfitting is the opposite."
        },
        {
          "q": "The slide's data split is…",
          "options": [
            "Training 80%, test 20%",
            "Training 25%, validation 50%, test 25%",
            "50% / 25% / 25%",
            "Training 100%"
          ],
          "answer": 2,
          "explain": "Train to fit, validation to choose the model, test (publication) to report generalization."
        },
        {
          "q": "In 5-fold cross-validation, each example is used for validation…",
          "options": [
            "Five times",
            "Never",
            "Only if it is misclassified",
            "Once"
          ],
          "answer": 3,
          "explain": "The data is split into 5 folds; each fold is the validation set once. The 5 scores are averaged."
        }
      ],
      "cards": [
        [
          "Training set X",
          "X = {xᵗ, rᵗ}, t = 1…N: input vectors with their desired outputs."
        ],
        [
          "Hypothesis class H",
          "The set of models we search, e.g. all axis-aligned rectangles."
        ],
        [
          "Empirical error E(h | X)",
          "Σₜ 1(h(xᵗ) ≠ rᵗ): the number of training mistakes."
        ],
        [
          "False positive / false negative",
          "FP: predicted 1, truly 0. FN: predicted 0, truly 1."
        ],
        [
          "S (most specific hypothesis)",
          "Tightest h containing all positives and no negatives."
        ],
        [
          "G (most general hypothesis)",
          "Largest h containing all positives and no negatives."
        ],
        [
          "Version space",
          "All consistent h between S and G (Mitchell, 1997)."
        ],
        [
          "Margin",
          "Distance from the boundary to the nearest instances. Choose h with the largest margin."
        ],
        [
          "Inductive bias",
          "The assumptions about H that make an ill-posed learning problem solvable."
        ],
        [
          "Overfitting / underfitting",
          "H more complex than C (fits noise) / less complex than C (misses structure)."
        ],
        [
          "Generalization",
          "How well a model performs on new data."
        ],
        [
          "Triple trade-off",
          "c(H), N and E: N ↑ → E ↓; c(H) ↑ → E first ↓ then ↑."
        ],
        [
          "K-fold cross-validation",
          "Split into K folds, train on K − 1, validate on the remaining one, rotate K times, average."
        ],
        [
          "MSE / MAE",
          "(1/N) Σ (r − g)² / (1/N) Σ |r − g|. MSE punishes large errors more."
        ],
        [
          "Dimensions of a learner",
          "Model g(x | θ), loss E(θ | X) = Σ L(rᵗ, g(xᵗ | θ)), optimization θ* = argmin_θ E."
        ]
      ]
    },
    {
      "n": 3,
      "title": "Dimensionality Reduction",
      "summary": "Dimensionality = the number of features. Why reduce it, feature selection (subset selection: forward and backward search) vs feature extraction (PCA, LDA, FA, MDS), and how PCA finds the direction of maximum variance.",
      "takeaways": [
        "Dimensionality counts features per example.",
        "Reduction saves computation, observation cost and redundancy.",
        "Selection keeps original columns; extraction creates coordinates.",
        "Forward adds features; backward removes them.",
        "PCA maximizes projected variance along unit directions.",
        "PCA ignores class labels; retained variance is not accuracy."
      ],
      "traps": [
        [
          "Feature selection and feature extraction are the same",
          "Selection keeps a subset of the original features. Extraction builds new features as combinations of all of them."
        ],
        [
          "PCA keeps the original features",
          "Each PC is a weighted mix of all original features. The originals are gone, which hurts interpretability."
        ],
        [
          "PCA picks the direction that best separates the classes",
          "PCA never looks at labels; it maximizes variance. LDA is the method that maximizes class separation."
        ],
        [
          "High variance = useful for classification",
          "Not guaranteed. A noisy, high-variance feature can dominate PC1 while the class difference lives in a low-variance direction."
        ],
        [
          "Scaling doesn't matter for PCA",
          "PCA is variance-based. A feature in larger units (income in TL vs GPA) dominates PC1 unless you standardize first."
        ]
      ],
      "activities": [
        {
          "id": "w3-pca",
          "title": "PCA Lab",
          "desc": "Rotate a direction w and watch the projections z = wᵀx and Var(z). Find PC1, see the explained-variance bars, then switch on unscaled units or class labels and see when PCA misleads.",
          "href": "w3/pca.html"
        },
        {
          "id": "w3-subset",
          "title": "Subset Selection",
          "desc": "Run forward and backward search step by step on a student dataset, compare with all 2ᵈ subsets, and watch an irrelevant feature sneak in by fitting noise.",
          "href": "w3/subset.html"
        }
      ],
      "quiz": [
        {
          "q": "The dimensionality of a sample is…",
          "options": [
            "Number of features",
            "The number of samples",
            "The number of classes",
            "The size of the test set"
          ],
          "answer": 0,
          "explain": "Slide 2: Age, GPA, Attendance, Study Hours, Income → 5 dimensions."
        },
        {
          "q": "Which is NOT a reason to reduce dimensionality?",
          "options": [
            "Less computation",
            "Always higher training accuracy",
            "Saves the cost of observing the feature",
            "Visualization in 2 or 3 dimensions"
          ],
          "answer": 1,
          "explain": "Training accuracy may drop slightly. The goals are cost, robustness, interpretability, visualization and removing irrelevant/redundant features."
        },
        {
          "q": "Choosing GPA, Attendance and Study Hours out of five student features is…",
          "options": [
            "Feature extraction",
            "Clustering",
            "Feature selection",
            "PCA"
          ],
          "answer": 2,
          "explain": "Slide 6: the remaining features are still the original features."
        },
        {
          "q": "z₁ = 0.6·Height + 0.8·Weight is an example of…",
          "options": [
            "Feature selection",
            "Subset selection",
            "Removing an irrelevant feature",
            "Feature extraction"
          ],
          "answer": 3,
          "explain": "Slide 7. Extraction transforms (x → z); selection selects xᵢ's."
        },
        {
          "q": "Which comparison is correct?",
          "options": [
            "Selection keeps original features",
            "Extraction keeps the original features",
            "Selection creates new features",
            "Both are equally easy to interpret"
          ],
          "answer": 0,
          "explain": "Slide 8 table: selection ✓ keeps originals, ✗ creates new; extraction the opposite, interpretation usually harder."
        },
        {
          "q": "How many subsets of d features exist?",
          "options": [
            "d²",
            "2ᵈ",
            "d!",
            "d"
          ],
          "answer": 1,
          "explain": "Each feature is either in or out. With d = 20 that is over a million subsets, hence greedy search."
        },
        {
          "q": "Forward search adds, at each step, the feature…",
          "options": [
            "With the largest variance",
            "That appears first in the table",
            "The one minimizing validation error",
            "Chosen at random"
          ],
          "answer": 2,
          "explain": "Start from F = ∅. Add the feature whose addition gives the lowest validation error; stop when nothing improves it."
        },
        {
          "q": "Backward search…",
          "options": [
            "Starts with no features and adds one at a time",
            "Tries all subsets",
            "Projects onto principal components",
            "Starts with all; removes features"
          ],
          "answer": 3,
          "explain": "Remove the feature whose removal hurts least (or helps), as long as the error does not increase."
        },
        {
          "q": "PCA projects x onto a direction w by…",
          "options": [
            "z = wᵀx",
            "z = x − w",
            "z = ‖x‖·‖w‖",
            "z = argmax x"
          ],
          "answer": 0,
          "explain": "A dot product. PCA chooses the w (unit length) that maximizes Var(z)."
        },
        {
          "q": "PCA considers which directions to carry the most information?",
          "options": [
            "Directions that separate the classes",
            "Largest variance",
            "The original axes",
            "Directions with the smallest variance"
          ],
          "answer": 1,
          "explain": "Slide 10: \"along which direction does our data vary the most?\""
        },
        {
          "q": "Which method finds hidden factors that explain correlations among features?",
          "options": [
            "Multidimensional scaling (MDS)",
            "Linear discriminant analysis (LDA)",
            "Factor analysis",
            "Forward search"
          ],
          "answer": 2,
          "explain": "MDS preserves distances between points. LDA maximizes separation between known classes."
        },
        {
          "q": "Which dimensionality reduction method uses the class labels?",
          "options": [
            "PCA",
            "MDS",
            "Factor analysis",
            "LDA"
          ],
          "answer": 3,
          "explain": "LDA is supervised: it finds the projection that maximizes the separation between known classes."
        }
      ],
      "cards": [
        [
          "Dimensionality",
          "The number of features (d) used to represent a sample."
        ],
        [
          "Why reduce dimensionality",
          "Less time and space, cheaper observation, robustness on small data, interpretability, visualization, removing irrelevant/redundant features."
        ],
        [
          "Feature selection",
          "Choose k < d of the original features; ignore the other d − k. E.g. subset selection."
        ],
        [
          "Feature extraction",
          "Map the d original xᵢ to k < d new features zⱼ. E.g. PCA, LDA, FA."
        ],
        [
          "Subset selection",
          "2ᵈ possible subsets, so search greedily: forward (add) or backward (remove)."
        ],
        [
          "Forward search",
          "F = ∅; repeatedly add xⱼ = argminᵢ E(F ∪ xᵢ) while E decreases."
        ],
        [
          "Backward search",
          "Start with all features; remove one at a time while E does not increase."
        ],
        [
          "PCA",
          "Unsupervised extraction: find unit w maximizing Var(wᵀx). Centers the data and rotates the axes."
        ],
        [
          "Principal component",
          "A new axis. PC1 = max-variance direction; PC2 ⟂ PC1 with the next-largest variance."
        ],
        [
          "Explained variance ratio",
          "Share of the total variance kept by each PC. The cumulative sum tells how many PCs to keep."
        ],
        [
          "Factor analysis (FA)",
          "Finds a few hidden (latent) factors that explain the correlations among features."
        ],
        [
          "MDS",
          "Multidimensional scaling: a low-dimensional map that preserves pairwise distances."
        ]
      ]
    },
    {
      "n": 4,
      "title": "Clustering",
      "summary": "Parametric vs nonparametric learning, classes vs clusters, k-means (reference vectors, reconstruction error, encoding/decoding), soft clustering with EM, hierarchical clustering with distance measures and linkages, and choosing k.",
      "takeaways": [
        "Clustering discovers groups without desired output labels.",
        "k-means alternates nearest-center assignment and mean updates.",
        "Reconstruction error measures squared distances to centers.",
        "EM alternates responsibilities and weighted parameter updates.",
        "Agglomerative clustering merges groups into a dendrogram.",
        "Single-link uses minimum pair distance; complete-link uses maximum."
      ],
      "traps": [
        [
          "k-means finds the best k for you",
          "k is an input. Use the elbow, PCA plots or the application to choose it."
        ],
        [
          "k-means always finds the global optimum",
          "It converges to a local minimum that depends on the initial mᵢ. Run several restarts and keep the lowest error."
        ],
        [
          "The error always has a clear elbow",
          "On data with no real clusters (the uniform slide demo) the curve bends smoothly; k-means still happily returns k groups."
        ],
        [
          "EM gives each point one cluster",
          "EM is soft: each point gets a probability for every cluster. k-means is the hard version."
        ],
        [
          "Single-link and complete-link give the same tree",
          "Single-link (min) chains clusters together; complete-link (max) makes compact clusters. The dendrogram heights differ."
        ]
      ],
      "activities": [
        {
          "id": "w4-kmeans",
          "title": "k-Means Lab",
          "desc": "Click to add points or load the slide datasets, then step through assign → update → converge. Bad initial centers, scaling, the elbow and silhouette plots, and the encode/decode bit count are all here.",
          "href": "w4/kmeans.html"
        },
        {
          "id": "w4-em",
          "title": "EM: Soft Clustering",
          "desc": "1-D Gaussian mixture: run the E-step and see each point's probabilities, then the M-step re-fits μ and σ². Compare with k-means' hard assignments.",
          "href": "w4/em.html"
        },
        {
          "id": "w4-hier",
          "title": "Hierarchical Clustering",
          "desc": "Merge the slide's points a–f step by step with single, complete, average or centroid link, build the dendrogram, and cut it at height h. Switch between Euclidean and city-block distance.",
          "href": "w4/hierarchical.html"
        }
      ],
      "quiz": [
        {
          "q": "Supervised data is X = {xᵗ, rᵗ}. Unsupervised clustering data is…",
          "options": [
            "Inputs without labels",
            "X = {rᵗ}",
            "X = {xᵗ, rᵗ, Gᵗ}",
            "Only the cluster centers"
          ],
          "answer": 0,
          "explain": "Classes Cᵢ come from labels; clusters Gᵢ are discovered."
        },
        {
          "q": "In k-means, the reference vectors mⱼ are also called…",
          "options": [
            "Support vectors",
            "Prototypes or codewords",
            "Principal components",
            "Leaves"
          ],
          "answer": 1,
          "explain": "Slide 4. Each represents its cluster."
        },
        {
          "q": "bᵢᵗ = 1 means…",
          "options": [
            "xᵗ is an outlier",
            "Cluster i is empty",
            "Nearest reference vector",
            "xᵗ is labeled positive"
          ],
          "answer": 2,
          "explain": "bᵢᵗ = 1 if ‖xᵗ − mᵢ‖ = minⱼ ‖xᵗ − mⱼ‖, else 0. It is a hard assignment."
        },
        {
          "q": "The k-means update step sets each mᵢ to…",
          "options": [
            "The point farthest from it",
            "A random data point",
            "The median of all data",
            "Mean of assigned points"
          ],
          "answer": 3,
          "explain": "Assignment step (green box on slide 6), then update step (red box). Repeat until the mᵢ converge."
        },
        {
          "q": "Each k-means iteration (assign, then update)…",
          "options": [
            "Never increases reconstruction error",
            "Always reaches the global minimum",
            "Increases k",
            "Requires labels"
          ],
          "answer": 0,
          "explain": "Both steps can only lower or keep E, so it converges — but to a local minimum that depends on the initialization."
        },
        {
          "q": "In encoding/decoding, what travels over the communication line?",
          "options": [
            "The full vector x",
            "Index of nearest reference vector",
            "All k reference vectors every time",
            "The error E"
          ],
          "answer": 1,
          "explain": "Decoder looks up mᵢ and outputs x′ = mᵢ. With k codewords, an index needs log₂ k bits."
        },
        {
          "q": "Soft clustering means…",
          "options": [
            "Clusters never overlap",
            "Each element belongs to exactly one cluster",
            "Probabilistic memberships",
            "Clusters are chosen by a human"
          ],
          "answer": 2,
          "explain": "Slide 10. k-means is hard; EM is soft."
        },
        {
          "q": "In EM, the E-step…",
          "options": [
            "Moves the Gaussians to fit their elements",
            "Picks k",
            "Merges the two closest clusters",
            "Computes responsibilities"
          ],
          "answer": 3,
          "explain": "The M-step adjusts (μᵢ, σᵢ²) to fit the elements assigned to them."
        },
        {
          "q": "Euclidean distance is Minkowski Lp with…",
          "options": [
            "p = 2",
            "p = 1",
            "p = 0",
            "p = ∞"
          ],
          "answer": 0,
          "explain": "p = 1 is the city-block (Manhattan) distance Σ |xⱼʳ − xⱼˢ|."
        },
        {
          "q": "Points (1, 3) and (4, 7): the city-block distance is…",
          "options": [
            "5",
            "7",
            "25",
            "3"
          ],
          "answer": 1,
          "explain": "|1 − 4| + |3 − 7| = 3 + 4 = 7. Euclidean would be √(9 + 16) = 5."
        },
        {
          "q": "Agglomerative clustering starts with…",
          "options": [
            "One group and splits it",
            "k random centers",
            "One group per instance",
            "A decision tree"
          ],
          "answer": 2,
          "explain": "Divisive clustering is the opposite: start with one group and divide."
        },
        {
          "q": "Single-link distance between groups Gᵢ and Gⱼ is…",
          "options": [
            "The maximum such distance",
            "The distance between their means",
            "The number of points in both",
            "Minimum pairwise distance"
          ],
          "answer": 3,
          "explain": "Complete-link uses the max. Average-link and centroid are the other options."
        }
      ],
      "cards": [
        [
          "Parametric vs nonparametric",
          "Parametric: a predefined mapping function/assumptions. Nonparametric: no predefined form."
        ],
        [
          "Class vs cluster",
          "Class Cᵢ comes from labels (supervised). Cluster Gᵢ is discovered from X = {xᵗ} (unsupervised)."
        ],
        [
          "Reference vector mⱼ",
          "A prototype / codebook vector / codeword representing a cluster."
        ],
        [
          "bᵢᵗ",
          "1 if mᵢ is the closest reference to xᵗ, else 0. Hard assignment."
        ],
        [
          "Reconstruction error",
          "E = Σₜ Σᵢ bᵢᵗ ‖xᵗ − mᵢ‖²: how badly the mᵢ represent the data (inertia / WCSS)."
        ],
        [
          "k-means loop",
          "Init mᵢ → assign each xᵗ to the nearest mᵢ → move mᵢ to the mean of its points → repeat until converged."
        ],
        [
          "Encoding / decoding",
          "Encoder sends index i of the closest mᵢ; decoder outputs x′ = mᵢ. Color quantization."
        ],
        [
          "Hard vs soft clustering",
          "Hard: each element in one cluster. Soft: each element in all clusters with probabilities."
        ],
        [
          "EM",
          "Expectation-maximization. E-step: probabilities per cluster. M-step: re-fit (μᵢ, σᵢ²). Repeat."
        ],
        [
          "Minkowski distance",
          "[Σⱼ |xⱼʳ − xⱼˢ|ᵖ]^(1/p). p = 2 Euclidean, p = 1 city-block."
        ],
        [
          "Agglomerative / divisive",
          "Bottom-up: merge the two closest groups. Top-down: split one group."
        ],
        [
          "Single / complete link",
          "Group distance = min / max pairwise distance. Also average-link and centroid."
        ],
        [
          "Dendrogram",
          "Tree of merges; the height is the merge distance. Cut at h to get clusters."
        ]
      ]
    },
    {
      "n": 5,
      "title": "Decision Trees",
      "summary": "Decision nodes and leaves, univariate splits, classification trees with entropy (ID3, CART, C4.5) worked on Play Tennis, regression trees, pre- and postpruning, rule extraction and multivariate trees.",
      "takeaways": [
        "Nodes test attributes; leaves predict outputs.",
        "Each root-to-leaf path forms a rule.",
        "Pure nodes have zero entropy.",
        "Choose the lowest weighted child entropy.",
        "Regression leaves predict the mean target.",
        "Prepruning stops growth; postpruning removes subtrees."
      ],
      "traps": [
        [
          "Choose the attribute with the highest entropy after the split",
          "Choose the lowest 𝓘′ₘ (the purest children) — equivalently the highest information gain."
        ],
        [
          "Entropy after a split is the plain average of the branch entropies",
          "It is weighted by branch size Nₘⱼ / Nₘ. A tiny impure branch counts less than a big one."
        ],
        [
          "A node with entropy 1 is pure",
          "Pure = entropy 0 (all one class). Entropy 1 bit is the most impure two-class node (50/50)."
        ],
        [
          "Decision trees need scaled features",
          "Univariate splits compare one feature with a threshold, so scaling does not change the tree."
        ],
        [
          "A deeper tree is always better",
          "A deep tree can memorize the training set (overfit). Pruning or a larger θᵣ improves generalization."
        ]
      ],
      "activities": [
        {
          "id": "w5-id3",
          "title": "ID3 Tree Builder",
          "desc": "Play the slides' entropy game: compute 𝓘 = 0.940, compare Outlook 0.694, Humidity 0.789, Wind 0.892 and Temperature 0.911, choose splits node by node, and extract the IF-THEN rules.",
          "href": "w5/id3.html"
        },
        {
          "id": "w5-regtree",
          "title": "Regression Tree & Pruning",
          "desc": "Grow a regression tree on 1-D data with the stopping threshold θᵣ (slide 15: 0.5, 0.2, 0.05). Watch the step function, leaf count and train vs test error, then read off the rules.",
          "href": "w5/regtree.html"
        }
      ],
      "quiz": [
        {
          "q": "A univariate decision node on a numeric attribute performs…",
          "options": [
            "Binary split",
            "An n-way split on all attributes",
            "A linear combination w·x + w₀",
            "A clustering step"
          ],
          "answer": 0,
          "explain": "Discrete attributes give an n-way split (one branch per value). Multivariate nodes use all attributes."
        },
        {
          "q": "In a classification tree, a leaf stores…",
          "options": [
            "The average r",
            "Class label",
            "A threshold wₘ",
            "Nothing"
          ],
          "answer": 1,
          "explain": "Regression leaves store a number: the average r or a local fit."
        },
        {
          "q": "Node m is pure when…",
          "options": [
            "pₘⁱ = 0.5 for two classes",
            "It has more than one branch",
            "All examples have one class",
            "Its entropy is 1"
          ],
          "answer": 2,
          "explain": "Pure → entropy 0 → make a leaf and stop."
        },
        {
          "q": "What is the entropy of a node with 9 yes and 5 no?",
          "options": [
            "≈ 0.643 bits",
            "1 bit",
            "0 bits",
            "About 0.940 bits"
          ],
          "answer": 3,
          "explain": "−(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ 0.410 + 0.530 = 0.940."
        },
        {
          "q": "A two-class node with p = 0.5 has entropy…",
          "options": [
            "1 bit",
            "0 bits",
            "0.5 bits",
            "2 bits"
          ],
          "answer": 0,
          "explain": "The entropy curve on slide 4 peaks at p = 0.5."
        },
        {
          "q": "Splitting Play Tennis on Outlook gives Sunny 2/5 yes, Overcast 4/4, Rain 3/5. 𝓘′ is…",
          "options": [
            "(0.971 + 0 + 0.971) / 3 ≈ 0.647",
            "About 0.694",
            "0.940",
            "0.971"
          ],
          "answer": 1,
          "explain": "Weight each branch entropy by its share of the 14 days."
        },
        {
          "q": "Which attribute becomes the root in the slides?",
          "options": [
            "Humidity (0.789)",
            "Wind (0.892)",
            "Outlook",
            "Temperature (0.911)"
          ],
          "answer": 2,
          "explain": "Select the attribute with the lowest entropy after the split: 0.694 < 0.789 < 0.892 < 0.911 < 0.940."
        },
        {
          "q": "Information gain of Outlook at the root is…",
          "options": [
            "0.694",
            "0.940 + 0.694",
            "0",
            "About 0.246"
          ],
          "answer": 3,
          "explain": "Gain = parent entropy − weighted child entropy (0.247 with unrounded values). Lowest 𝓘′ ⇔ highest gain."
        },
        {
          "q": "After splitting on Outlook, the Overcast branch…",
          "options": [
            "A Yes leaf",
            "Needs a Humidity split",
            "Needs a Wind split",
            "Is removed"
          ],
          "answer": 0,
          "explain": "Overcast: 4/4 yes, entropy 0, pure."
        },
        {
          "q": "For the Sunny branch (D1, D2, D8 no; D9, D11 yes), which split makes it pure?",
          "options": [
            "Wind",
            "Humidity",
            "Temperature",
            "Outlook again"
          ],
          "answer": 1,
          "explain": "D1, D2, D8 have High humidity; D9 and D11 have Normal. Weighted entropy 0."
        },
        {
          "q": "A regression tree leaf predicts…",
          "options": [
            "The majority class",
            "The median x",
            "Mean target",
            "A probability"
          ],
          "answer": 2,
          "explain": "gₘ = Σₜ bₘ(xᵗ) rᵗ / Σₜ bₘ(xᵗ). Node error is the mean squared deviation from gₘ."
        },
        {
          "q": "Prepruning vs postpruning:",
          "options": [
            "Prepruning is more accurate",
            "Postpruning needs no extra data",
            "They are the same",
            "Before / after full growth"
          ],
          "answer": 3,
          "explain": "Prepruning stops while growing. Postpruning removes subtrees after growing, using a separate pruning set; improvement is not guaranteed on every dataset."
        }
      ],
      "cards": [
        [
          "Decision node / leaf",
          "Internal node tests an attribute; a leaf gives the output."
        ],
        [
          "Univariate split",
          "Uses one attribute: xᵢ > wₘ (numeric, binary) or one branch per value (discrete)."
        ],
        [
          "Multivariate split",
          "Uses all attributes: w·x + w₀ > 0, an oblique boundary."
        ],
        [
          "pₘⁱ",
          "Nₘⁱ / Nₘ: share of the instances at node m that belong to class Cᵢ."
        ],
        [
          "Pure node",
          "All pₘⁱ are 0 or 1. Make a leaf."
        ],
        [
          "Entropy (eq. 9.3)",
          "𝓘ₘ = −Σᵢ pₘⁱ log₂ pₘⁱ. 0 = pure; 1 bit = 50/50 (two classes)."
        ],
        [
          "Impurity after split (eq. 9.8)",
          "𝓘′ₘ = Σⱼ (Nₘⱼ / Nₘ) · entropy(branch j). Choose the attribute that minimizes it."
        ],
        [
          "Information gain",
          "𝓘ₘ − 𝓘′ₘ. Highest gain ⇔ lowest 𝓘′ₘ."
        ],
        [
          "ID3 / C4.5 / CART",
          "Classic greedy tree learners (Quinlan 1986, 1993; Breiman et al. 1984)."
        ],
        [
          "Play Tennis root",
          "Outlook 0.694 < Humidity 0.789 < Wind 0.892 < Temp 0.911 < parent 0.940."
        ],
        [
          "Regression tree",
          "Leaf gₘ = mean r; error Eₘ = mean squared deviation; split to minimize E′ₘ; stop when Eₘ < θᵣ."
        ],
        [
          "Prepruning",
          "Early stopping while growing. Faster."
        ],
        [
          "Postpruning",
          "Grow fully, then prune subtrees that overfit on a pruning set. More accurate."
        ],
        [
          "Rule extraction",
          "Each root-to-leaf path → an IF-THEN rule (C4.5Rules). Interpretable."
        ]
      ]
    }
  ],
  "games": {
    "when-learn": {
      "ch": 1,
      "type": "bucket",
      "title": "Learn or Program?",
      "intro": "Does this task need machine learning, and why?",
      "buckets": [
        "Just program it",
        "Expertise doesn't exist",
        "Can't explain expertise",
        "Solution changes in time",
        "Adapt to particular cases"
      ],
      "items": [
        [
          "Calculating payroll",
          0,
          "The rule is known and fixed."
        ],
        [
          "Sorting a list of numbers",
          0
        ],
        [
          "Navigating a rover on Mars",
          1
        ],
        [
          "Recognizing spoken words",
          2
        ],
        [
          "Reading handwritten digits",
          2
        ],
        [
          "Routing packets on a computer network",
          3
        ],
        [
          "Predicting tomorrow's stock demand",
          3
        ],
        [
          "Recognizing a user by fingerprint",
          4,
          "User biometrics."
        ],
        [
          "Personal music recommendations",
          4
        ]
      ]
    },
    "learning-types": {
      "ch": 1,
      "type": "bucket",
      "title": "What Kind of Learning?",
      "intro": "Sort each application into its type of learning.",
      "buckets": [
        "Association",
        "Classification",
        "Regression",
        "Unsupervised (clustering)",
        "Reinforcement"
      ],
      "items": [
        [
          "People who buy X also buy Y",
          0
        ],
        [
          "P(mouse | computer) = 0.7",
          0
        ],
        [
          "Low-risk vs high-risk credit customers",
          1
        ],
        [
          "Face recognition",
          1
        ],
        [
          "Medical diagnosis from symptoms",
          1
        ],
        [
          "Spam filter",
          1
        ],
        [
          "Price of a used car",
          2
        ],
        [
          "Steering angle of a self-driving car",
          2
        ],
        [
          "Robot arm joint angles α = g(x, y)",
          2
        ],
        [
          "Customer segmentation in CRM",
          3
        ],
        [
          "Color quantization of an image",
          3
        ],
        [
          "Learning motifs in DNA",
          3
        ],
        [
          "Game playing",
          4
        ],
        [
          "Robot finding the exit of a maze",
          4
        ]
      ]
    },
    "fp-fn": {
      "ch": 2,
      "type": "bucket",
      "title": "Family Car: Right or Wrong?",
      "intro": "h is a rectangle and C is the true class. Sort each case.",
      "buckets": [
        "True positive",
        "False positive",
        "False negative",
        "True negative"
      ],
      "items": [
        [
          "Family car, inside h",
          0
        ],
        [
          "Car B (r = 1, predicted 1)",
          0
        ],
        [
          "Not a family car, but inside h",
          1
        ],
        [
          "Car A (r = 0, predicted 1)",
          1
        ],
        [
          "Car C (r = 0, predicted 1)",
          1
        ],
        [
          "Family car, outside h",
          2
        ],
        [
          "Inside C but outside the rectangle h",
          2
        ],
        [
          "Not a family car, outside h",
          3
        ],
        [
          "Car E (r = 0, predicted 0)",
          3
        ]
      ]
    },
    "data-splits": {
      "ch": 2,
      "type": "match",
      "title": "Which Data for What?",
      "intro": "Match each set with its job.",
      "pairs": [
        [
          "Training set (50%)",
          "Fit the parameters θ"
        ],
        [
          "Validation set (25%)",
          "Choose the model / hyperparameters"
        ],
        [
          "Test (publication) set (25%)",
          "Report generalization error once, at the end"
        ],
        [
          "K-fold cross-validation",
          "Resample when data is scarce; average K scores"
        ],
        [
          "Standard deviation over folds",
          "How stable the model is across splits"
        ]
      ]
    },
    "select-extract": {
      "ch": 3,
      "type": "bucket",
      "title": "Select or Extract?",
      "intro": "Feature selection selects; feature extraction transforms. Sort them.",
      "buckets": [
        "Feature selection",
        "Feature extraction"
      ],
      "items": [
        [
          "Keep GPA, Attendance, Study Hours; drop the rest",
          0
        ],
        [
          "Forward search",
          0
        ],
        [
          "Backward search",
          0
        ],
        [
          "Subset selection",
          0
        ],
        [
          "Keeps the original features",
          0
        ],
        [
          "Usually easier to interpret",
          0
        ],
        [
          "z₁ = 0.6·Height + 0.8·Weight",
          1
        ],
        [
          "PCA",
          1
        ],
        [
          "LDA",
          1
        ],
        [
          "Factor analysis",
          1
        ],
        [
          "Creates new features (x → z)",
          1
        ],
        [
          "Usually harder to interpret",
          1
        ]
      ]
    },
    "kmeans-steps": {
      "ch": 4,
      "type": "order",
      "title": "k-Means Algorithm",
      "intro": "Put the steps of k-means in order.",
      "items": [
        "Choose k",
        "Initialize mᵢ, i = 1…k, e.g. to k random xᵗ",
        "Assign every xᵗ to its nearest mᵢ (bᵢᵗ = 1)",
        "Move every mᵢ to the mean of its assigned points",
        "Repeat assign + update until the mᵢ converge",
        "Use the mᵢ: encode x by the index of its nearest codeword"
      ]
    },
    "linkage": {
      "ch": 4,
      "type": "match",
      "title": "Distances & Linkages",
      "intro": "Match each distance or linkage with its formula or idea.",
      "pairs": [
        [
          "Euclidean (p = 2)",
          "√Σⱼ (xⱼʳ − xⱼˢ)²"
        ],
        [
          "City-block (p = 1)",
          "Σⱼ |xⱼʳ − xⱼˢ|"
        ],
        [
          "Single-link",
          "min distance between the two groups"
        ],
        [
          "Complete-link",
          "max distance between the two groups"
        ],
        [
          "Centroid",
          "distance between the group means"
        ],
        [
          "Agglomerative",
          "Start with N groups, merge the closest two"
        ],
        [
          "Divisive",
          "Start with one group, split"
        ]
      ]
    },
    "id3-steps": {
      "ch": 5,
      "type": "order",
      "title": "Grow a Tree (ID3)",
      "intro": "Order the steps of greedy tree learning.",
      "items": [
        "Compute the entropy 𝓘ₘ of the node",
        "If the node is pure, make a leaf and stop",
        "For each attribute, compute the weighted entropy after the split 𝓘′ₘ",
        "Split on the attribute with the lowest 𝓘′ₘ (highest gain)",
        "Recurse on each branch with its subset of the data",
        "Optionally prune subtrees that overfit (pruning set)"
      ]
    },
    "tree-terms": {
      "ch": 5,
      "type": "match",
      "title": "Tree Vocabulary",
      "intro": "Match each term with its meaning.",
      "pairs": [
        [
          "Univariate node",
          "Tests one attribute: xᵢ > wₘ"
        ],
        [
          "Multivariate node",
          "Tests w·x + w₀ > 0"
        ],
        [
          "Classification leaf",
          "A class label or class proportions"
        ],
        [
          "Regression leaf",
          "The average r (or a local fit)"
        ],
        [
          "Prepruning",
          "Early stopping — faster"
        ],
        [
          "Postpruning",
          "Prune a full tree with a pruning set — more accurate"
        ],
        [
          "C4.5Rules",
          "Each root-to-leaf path becomes an IF-THEN rule"
        ]
      ]
    },
    "dimred-methods": {
      "ch": 3,
      "type": "match",
      "title": "Which Method?",
      "intro": "Match each dimensionality reduction method to what it does.",
      "pairs": [
        [
          "PCA",
          "Directions of maximum variance (unsupervised)"
        ],
        [
          "LDA",
          "Maximizes separation between known classes"
        ],
        [
          "Factor analysis",
          "Hidden factors explaining feature correlations"
        ],
        [
          "MDS",
          "Preserves distances between points"
        ],
        [
          "Forward search",
          "Start empty, add the best feature each step"
        ],
        [
          "Backward search",
          "Start with all, remove one at a time"
        ]
      ]
    }
  }
};

Object.assign(window.COURSE, {
  "exam": {
    "title": "Midterm",
    "scope": "Weeks 1–5 currently built: Introduction, Supervised Learning, Dimensionality Reduction, Clustering, Decision Trees. Official exam scope and format not announced. Projects 30%, midterm 30%, final 40%.",
    "plan": [
      [
        "learn.html?ch=1",
        "Follow the five-week lesson route",
        "150 min"
      ],
      [
        "ozet.html",
        "Midterm özeti: hide answers and recall",
        "25 min"
      ],
      [
        "mock.html",
        "Practice one mixed mock paper",
        "30 min"
      ]
    ]
  },
  "resources": [
    {
      "kind": "summary",
      "href": "ozet.html",
      "title": "Midterm özeti",
      "meta": "Türkçe · Weeks 1–5",
      "desc": "Topic summaries, worked calculations and a hide-answers recall table."
    },
    {
      "kind": "mock",
      "href": "mock.html",
      "title": "Mock midterm",
      "meta": "25 items · instant feedback",
      "desc": "20 multiple-choice items and five short worked or explanation questions."
    }
  ]
});
