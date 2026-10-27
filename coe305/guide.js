/* COE305 guided lessons — teach each week from zero, in order, linking to the labs.
 * Based on the Alpaydın (Introduction to Machine Learning, 2e) slides used in class
 * (materials/COE305/). Format: see assets/js/learn.js.
 */
window.GUIDE = {
  /* ================================================================ */
  1: {
    goal: 'Explain what machine learning is and when we need it, and recognise the four kinds of learning problem: associations, classification, regression, unsupervised and reinforcement learning — with an example of each.',
    time: '≈ 50 min',
    videos: [
      ['what machine learning is', 'machine learning explained simply for beginners'],
      ['supervised vs unsupervised vs reinforcement', 'supervised unsupervised reinforcement learning explained'],
      ['the full StatQuest ML intro', 'StatQuest a gentle introduction to machine learning'],
      ['association rules / market basket', 'market basket analysis association rules explained'],
    ],
    steps: [
      {
        t: 'What machine learning is — and when we need it',
        html: `
<p><b>Machine learning</b> = programming computers to <b>optimise a performance criterion using example data or past experience</b>.</p>
<p>Normal programming: a human writes the rules. ML: we give examples, and the computer <b>finds the rules</b> (builds a <b>model</b>).</p>
<h3>When do we need learning? (the lecture's four cases)</h3>
<table class="t">
  <tr><th>Case</th><th>Example</th></tr>
  <tr><td>Human expertise <b>does not exist</b></td><td>Navigating on Mars</td></tr>
  <tr><td>Humans <b>can't explain</b> their expertise</td><td>Speech recognition — you understand speech, but can't write the rules</td></tr>
  <tr><td>The solution <b>changes over time</b></td><td>Network routing</td></tr>
  <tr><td>It must <b>adapt to individual cases</b></td><td>User biometrics</td></tr>
</table>
<p>Counter-example: <b>payroll</b>. The rules are known and fixed → just program it; no learning needed.</p>
<div class="callout"><b>💡 Key idea:</b> learning builds a <b>general model</b> from <b>particular examples</b>. Data is cheap and abundant; knowledge is expensive and scarce. The model is a good and useful <i>approximation</i> of the data.</div>
<p><b>Statistics</b> does the inference from a sample; <b>computer science</b> provides efficient algorithms to solve the optimisation and to represent and evaluate the model.</p>`,
        check: { q: 'Which task does NOT need machine learning?', o: ['Calculating payroll with fixed rules', 'Recognising speech', 'Adapting to a user\'s fingerprint', 'Routing in a changing network'], why: 'Payroll rules are known and fixed — program them directly.' },
      },
      {
        t: 'Learning associations (basket analysis)',
        html: `
<p>A shop wants to know: <i>"people who buy X also buy Y"</i>. This is an <b>association rule</b>, measured by a conditional probability:</p>
<p style="text-align:center"><b>P(Y | X) = (# baskets with X and Y) / (# baskets with X)</b></p>
<p><b>Example:</b> 10 baskets contain a computer; 7 of those also contain a mouse → P(mouse | computer) = 7/10 = <b>0.7</b>.</p>
<div class="callout warn"><b>⚠ Trap:</b> P(Y | X) ≠ P(X | Y). Most people buying a computer buy a mouse, but most people buying a mouse did not buy a computer.</div>`,
        lab: { href: 'w1/basket.html', todo: [
          'Load the <b>Computer shop</b> baskets.',
          'Click the cell (X = computer, Y = mouse) and read P(mouse | computer).',
          'Now click the opposite cell (X = mouse, Y = computer). It\'s different — check why.',
        ] },
        check: { q: 'Of 20 baskets with bread, 5 also have butter. P(butter | bread) =', o: ['0.25', '0.5', '4', 'Cannot know without P(bread | butter)'], why: '5 / 20 = 0.25.' },
      },
      {
        t: 'Supervised learning: classification and regression',
        html: `
<p>In <b>supervised</b> learning every training example comes with the <b>correct answer</b> (the label / output).</p>
<table class="t">
  <tr><th></th><th>Classification</th><th>Regression</th></tr>
  <tr><td>Output</td><td>A <b>class</b> (discrete)</td><td>A <b>number</b> (continuous)</td></tr>
  <tr><td>Lecture example</td><td>Credit scoring: low-risk / high-risk</td><td>Used-car price from mileage</td></tr>
  <tr><td>Model</td><td>IF income &gt; θ₁ AND savings &gt; θ₂ THEN low-risk ELSE high-risk</td><td>y = w·x + w₀</td></tr>
  <tr><td>Other uses</td><td>Face, character, speech recognition; medical diagnosis; biometrics</td><td>Steering angle; robot-arm kinematics</td></tr>
</table>
<p>"Learning" here means <b>choosing the parameters</b> (θ₁, θ₂ or w, w₀) from past data.</p>
<h3>Why use supervised learning?</h3>
<ul>
  <li><b>Prediction</b> — answer new cases.</li>
  <li><b>Knowledge extraction</b> — the rule is easy to understand.</li>
  <li><b>Compression</b> — the rule is simpler than the data.</li>
  <li><b>Outlier detection</b> — find exceptions, e.g. fraud.</li>
</ul>`,
        lab: { href: 'w1/credit.html', todo: [
          'Section 1: click the plot to place the corner (θ₁, θ₂). Count the red points inside your "low-risk" corner (false positives) and green outside (false negatives).',
          'Click <b>Learn best θ₁, θ₂</b> and compare with your choice.',
          'Section 2: drag w and w₀ for the used-car line, then click <b>Least-squares fit</b>.',
        ] },
        check: { q: 'Predicting tomorrow\'s temperature in °C is…', o: ['regression', 'classification', 'clustering', 'association'], why: 'The output is a number → regression.' },
      },
      {
        t: 'Unsupervised and reinforcement learning',
        html: `
<table class="t">
  <tr><th>Kind</th><th>What the data gives</th><th>Goal</th><th>Examples</th></tr>
  <tr><td><b>Supervised</b></td><td>Input <b>and</b> correct output</td><td>Learn the mapping input → output</td><td>Credit scoring, car price</td></tr>
  <tr><td><b>Unsupervised</b></td><td>Input only, <b>no output</b></td><td>Find structure: "what normally happens"</td><td><b>Clustering</b>: customer segmentation, colour quantisation, motifs in bioinformatics</td></tr>
  <tr><td><b>Reinforcement</b></td><td>A <b>delayed reward</b> after a sequence of actions</td><td>Learn a <b>policy</b> (which action in which state)</td><td>Game playing, a robot in a maze</td></tr>
</table>
<div class="callout"><b>💡 Analogy:</b> supervised = a teacher marks every answer. Unsupervised = no teacher, you find groups yourself. Reinforcement = you only learn at the end of a chess game whether you won.</div>`,
        check: { q: 'A robot learns to leave a maze; it only gets a reward when it reaches the exit. This is…', o: ['reinforcement learning', 'supervised learning', 'clustering', 'association learning'], why: 'A delayed reward for a sequence of actions → reinforcement learning (learn a policy).' },
      },
    ],
  },

  /* ================================================================ */
  2: {
    goal: 'Explain hypothesis class, empirical error, S, G, version space and margin with the family-car example, do regression with squared error, explain overfitting/underfitting and the triple trade-off, use train/validation/test and K-fold cross-validation, and name the three dimensions of a supervised learner.',
    time: '≈ 90 min',
    videos: [
      ['overfitting and bias–variance', 'StatQuest bias and variance'],
      ['cross-validation', 'StatQuest cross validation'],
      ['linear regression and least squares', 'StatQuest linear regression clearly explained'],
      ['version space / hypothesis space', 'version space specific general boundary machine learning'],
    ],
    steps: [
      {
        t: 'Learning a class: the family car',
        html: `
<p>Is car x a "family car"? Two inputs: <b>x₁ = price</b>, <b>x₂ = engine power</b>. Output <b>r = 1</b> (family car, positive) or <b>r = 0</b> (negative).</p>
<p>Training set: <b>X = {xᵗ, rᵗ}</b>, t = 1…N — N examples, each with its label.</p>
<p>We guess that family cars are those with price in some range and power in some range — i.e. a <b>rectangle</b>. So our <b>hypothesis class H</b> = all axis-aligned rectangles. One particular rectangle is a <b>hypothesis h</b>:</p>
<p style="text-align:center">h(x) = 1 if x is inside the rectangle, else 0</p>
<p>The <b>true class C</b> is unknown; we try to find an h ∈ H close to it.</p>
<h3>Empirical error</h3>
<p><b>E(h | X) = Σₜ 1(h(xᵗ) ≠ rᵗ)</b> = the number of training examples h gets wrong.</p>
<ul>
  <li><b>False positive</b>: h says 1, the truth is 0 (a sports car inside your rectangle).</li>
  <li><b>False negative</b>: h says 0, the truth is 1 (a family car outside your rectangle).</li>
</ul>`,
        check: { q: 'Your rectangle includes a car that is NOT a family car. This is a…', o: ['false positive', 'false negative', 'true negative', 'margin'], why: 'h says 1 (positive) but the truth is 0.' },
      },
      {
        t: 'S, G, version space and margin',
        html: `
<p>Usually many rectangles have zero training error. Two special ones:</p>
<ul>
  <li><b>S — most specific hypothesis</b>: the <b>tightest</b> rectangle around the positive examples.</li>
  <li><b>G — most general hypothesis</b>: the <b>largest</b> rectangle that still contains no negatives.</li>
</ul>
<p>Every h between S and G is <b>consistent</b> with the data. Together they form the <b>version space</b> (Mitchell, 1997).</p>
<p>Which one should we choose? The one with the <b>largest margin</b> — the distance from the boundary to the nearest training instances. It is the safest for new data, because a small change in a new point won't flip its class.</p>
<div class="callout"><b>💡 Analogy:</b> S is a tight belt, G is the biggest belt that still fits, the max-margin choice is "in the middle", leaving room on both sides.</div>`,
        lab: { href: 'w2/hypothesis.html', todo: [
          'Load <b>Slide cars A–E</b>. Drag a rectangle and read the error table (which cars are FP / FN).',
          'Click <b>S</b>, then <b>G</b>, and see the version space between them.',
          'Click <b>h = largest margin</b>. Then switch to the bigger training set and repeat.',
        ] },
        check: { q: 'S is…', o: ['the tightest rectangle around the positive examples', 'the largest rectangle without negatives', 'the rectangle with the largest margin', 'the true class C'], why: 'S = most specific; G = most general.' },
      },
      {
        t: 'Multiple classes, regression, and simple vs complex models',
        html: `
<h3>K classes</h3>
<p>Train <b>K hypotheses</b> hᵢ(x), one per class: each treats its own class as positive and <b>all others as negative</b> (one-vs-rest).</p>
<h3>Regression</h3>
<p>The output is a number: <b>rᵗ = f(xᵗ) + ε</b> (unknown function + noise). We fit g by minimising the <b>mean squared error</b>:</p>
<p style="text-align:center"><b>E(g | X) = (1/N) Σₜ [rᵗ − g(xᵗ)]²</b></p>
<p>Linear: g(x) = w₁x + w₀. Quadratic: g(x) = w₂x² + w₁x + w₀. Higher degree = more complex.</p>
<h3>Why prefer simpler models?</h3>
<ul>
  <li>Simpler to <b>use</b> (lower computational complexity).</li>
  <li>Easier to <b>train</b> (lower space complexity).</li>
  <li>Easier to <b>explain</b>.</li>
  <li><b>Generalise better</b> (lower variance).</li>
</ul>`,
        check: { q: 'With K = 4 classes using one-vs-rest, how many hypotheses do we train?', o: ['4', '1', '2', '16'], why: 'One hypothesis per class.' },
      },
      {
        t: 'Overfitting, underfitting and the triple trade-off',
        html: `
<p>Learning is <b>ill-posed</b>: the data alone does not give a unique answer. We need <b>inductive bias</b> — assumptions about H (e.g. "it's a rectangle", "it's a line").</p>
<ul>
  <li><b>Underfitting</b>: H is <b>less</b> complex than the true function (a straight line for a curve). Bad on training and new data.</li>
  <li><b>Overfitting</b>: H is <b>more</b> complex than the true function (a degree-9 polynomial through 10 noisy points). Training error ≈ 0, but bad on new data — it memorised the noise.</li>
</ul>
<h3>The triple trade-off (Dietterich, 2003)</h3>
<p>Three things interact: <b>complexity c(H)</b>, <b>training-set size N</b>, and <b>generalisation error E</b>.</p>
<ul>
  <li>As <b>N increases</b>, E decreases.</li>
  <li>As <b>c(H) increases</b>, E first decreases, then <b>increases</b> (U-shape).</li>
</ul>`,
        lab: { href: 'w2/regression.html', todo: [
          'Start at degree <b>1</b>, then increase to <b>9</b>. Watch the training error keep falling while the validation error turns back up.',
          'Find the degree where validation error is lowest — that\'s the right complexity.',
          'Increase N and see overfitting shrink. Then do the slide-12 MAE / MSE exercise at the bottom.',
        ] },
        check: { q: 'Training error is almost 0 but validation error is high. This is…', o: ['overfitting', 'underfitting', 'perfect generalisation', 'inductive bias being zero'], why: 'The model memorised the training data, including noise.' },
      },
      {
        t: 'Train / validation / test and K-fold cross-validation',
        html: `
<p>To estimate how well a model works on unseen data, we must test it on data it has not seen during training.</p>
<table class="t">
  <tr><th>Split</th><th>Typical share</th><th>Used to</th></tr>
  <tr><td><b>Training</b></td><td>50%</td><td>Fit the parameters θ</td></tr>
  <tr><td><b>Validation</b></td><td>25%</td><td>Choose the model / complexity</td></tr>
  <tr><td><b>Test</b> (publication)</td><td>25%</td><td>Report the final error <b>once</b></td></tr>
</table>
<h3>K-fold cross-validation (Project Task 1)</h3>
<p>With little data we <b>resample</b>:</p>
<ol>
  <li>Split the data into <b>K</b> equal folds.</li>
  <li>Train on <b>K − 1</b> folds, validate on the <b>1</b> left out.</li>
  <li>Rotate so each fold is the validation fold once.</li>
  <li>Report the <b>mean ± standard deviation</b> of the K scores.</li>
</ol>
<p>Every example is used for validation exactly once. K = N is <b>leave-one-out</b>.</p>`,
        lab: { href: 'w2/crossval.html', todo: [
          'Set K = 5 and click <b>Next fold ▶</b> a few times: watch the validation fold rotate.',
          'Click <b>Run all folds</b> and read mean ± std. Repeat with K = 3 and K = 10.',
          'Click <b>Reshuffle</b> a few times and compare: a single hold-out split can be lucky or unlucky; the CV mean is more stable.',
        ] },
        check: { q: 'In 10-fold cross-validation, how many times is the model trained?', o: ['10', '1', '9', '100'], why: 'Once per fold — each time with a different fold held out.' },
      },
      {
        t: 'The three dimensions of a supervised learner',
        html: `
<p>Every supervised learning method is defined by three choices:</p>
<ol>
  <li><b>Model</b>: g(x | θ) — the form of the function, with parameters θ (e.g. a line with θ = {w₁, w₀}).</li>
  <li><b>Loss function</b>: E(θ | X) = Σₜ L(rᵗ, g(xᵗ | θ)) — how we measure error (e.g. squared error).</li>
  <li><b>Optimisation procedure</b>: θ* = argmin_θ E(θ | X) — how we find the best θ (e.g. least squares, gradient descent).</li>
</ol>
<div class="callout"><b>💡 Memory hook:</b> <b>M</b>odel, <b>L</b>oss, <b>O</b>ptimise — "what shape, how wrong, how to fix".</div>`,
        check: { q: 'θ* = argmin E(θ | X) describes which dimension?', o: ['The optimisation procedure', 'The model', 'The loss function', 'The test set'], why: 'Finding the θ that minimises the loss = optimisation.' },
      },
    ],
  },

  /* ================================================================ */
  3: {
    goal: 'Define dimensionality, give reasons to reduce it, tell feature selection from feature extraction, run forward and backward search, and explain what PCA does (z = wᵀx, maximise variance, PC1/PC2, explained variance) and when it misleads.',
    time: '≈ 70 min',
    videos: [
      ['PCA, the main ideas', 'StatQuest PCA main ideas in only 5 minutes'],
      ['PCA step by step', 'StatQuest principal component analysis PCA step by step'],
      ['feature selection: forward / backward', 'forward selection backward elimination feature selection explained'],
      ['curse of dimensionality', 'curse of dimensionality explained simply'],
    ],
    steps: [
      {
        t: 'Dimensionality and why we reduce it',
        html: `
<p>The <b>dimensionality</b> of a sample = the <b>number of features</b> used to represent it. Age, GPA, Attendance, Study hours, Income → <b>d = 5</b>.</p>
<h3>Why reduce it?</h3>
<ul>
  <li>Less <b>computation</b> (time) and fewer <b>parameters</b> (memory).</li>
  <li>Saves the <b>cost of observing</b> a feature (a medical test you no longer need).</li>
  <li><b>Simpler models are more robust</b> on small datasets (less overfitting).</li>
  <li>More <b>interpretable</b>.</li>
  <li><b>Visualisation</b> in 2-D or 3-D.</li>
  <li>Removes <b>irrelevant</b> and <b>redundant</b> features.</li>
</ul>
<div class="callout"><b>💡 Lecture quote:</b> "More useful information is better, not necessarily more features."</div>`,
      },
      {
        t: 'Feature selection vs feature extraction',
        html: `
<table class="t">
  <tr><th></th><th>Feature selection</th><th>Feature extraction</th></tr>
  <tr><td>Idea</td><td>Choose k &lt; d of the <b>original</b> features, drop the rest</td><td>Create k &lt; d <b>new</b> features from combinations of the old ones</td></tr>
  <tr><td>Example</td><td>Keep {GPA, study hours}</td><td>z₁ = 0.6·height + 0.8·weight</td></tr>
  <tr><td>Methods</td><td>Subset selection (forward / backward search)</td><td>PCA, LDA, FA, MDS</td></tr>
  <tr><td>Interpretability</td><td>Easy — original features</td><td>Harder — what does "z₁" mean?</td></tr>
</table>
<div class="callout"><b>💡 Lecture line:</b> "Feature selection <b>selects</b>. Feature extraction <b>transforms</b>."</div>
<h3>Other extraction methods (know one line each)</h3>
<ul>
  <li><b>LDA</b> — maximises separation between known <b>classes</b> (supervised).</li>
  <li><b>Factor analysis (FA)</b> — finds hidden (latent) factors that explain the correlations.</li>
  <li><b>MDS</b> — preserves pairwise <b>distances</b>.</li>
</ul>`,
        check: { q: 'PCA is an example of…', o: ['feature extraction', 'feature selection', 'clustering', 'classification'], why: 'PCA builds new features as combinations of the old ones.' },
      },
      {
        t: 'Subset selection: forward and backward search',
        html: `
<p>With d features there are <b>2ᵈ</b> possible subsets — with d = 30 that's over a billion. Too many to try, so we search <b>greedily</b> using the <b>validation error E</b>.</p>
<h3>Forward search</h3>
<ol>
  <li>Start with the empty set F = ∅.</li>
  <li>Try adding each remaining feature; keep the one that gives the <b>lowest validation error</b>: xⱼ = argminᵢ E(F ∪ xᵢ).</li>
  <li>Repeat while adding a feature still lowers E.</li>
</ol>
<h3>Backward search</h3>
<p>Start with <b>all</b> features and <b>remove</b> one at a time, as long as removing lowers (or doesn't raise) E.</p>
<div class="callout warn"><b>⚠ Greedy = not guaranteed optimal.</b> And an irrelevant feature can lower the validation error a tiny bit just by fitting noise — so require a minimum improvement ε.</div>`,
        lab: { href: 'w3/subset.html', todo: [
          'Run <b>forward search</b> step by step and note the order in which features are added.',
          'Run <b>backward search</b> and compare.',
          'Set ε = 0.5 and run again: does the irrelevant feature still sneak in?',
        ] },
        check: { q: 'Forward search starts with…', o: ['no features and adds one at a time', 'all features and removes one at a time', 'a random subset', 'all 2ᵈ subsets'], why: 'Forward: F = ∅, add. Backward: all, remove.' },
      },
      {
        t: 'PCA: find the direction of maximum variance',
        html: `
<p>Imagine height and weight of students: the points lie roughly along a diagonal line. Instead of two features, we could use <b>one</b>: the position along that line.</p>
<ol>
  <li><b>Center</b> the data (subtract the mean, so it sits at the origin).</li>
  <li>For a unit direction <b>w</b> (‖w‖ = 1), the <b>projection</b> of x is <b>z = wᵀx</b> — where x "lands" on that line.</li>
  <li>PCA chooses the <b>w that maximises Var(z)</b> — the direction along which the data is most spread out. That's <b>PC1</b>.</li>
  <li><b>PC2</b> is the direction of next-largest variance, <b>orthogonal</b> (perpendicular) to PC1.</li>
</ol>
<p>So PCA <b>rotates the axes</b>. The <b>explained variance ratio</b> says what share of the total variance each PC keeps, e.g. PC1 = 92%, PC2 = 8% → one dimension keeps 92% of the information.</p>
<p>In sklearn: <code>PCA(n_components=2).fit_transform(X)</code> takes Iris from (150, 4) to (150, 2); <code>explained_variance_ratio_</code> gives each PC's share.</p>
<div class="callout warn"><b>⚠ Two traps (Project Task 3):</b><br>1. <b>Scale first.</b> If height is in cm and weight in grams, the weight numbers are huge and dominate the variance.<br>2. <b>PCA is unsupervised</b>: it ignores the labels, so the highest-variance direction is not guaranteed to be the best for classification.</div>`,
        lab: { href: 'w3/pca.html', todo: [
          'Dataset <b>Height &amp; weight</b>: rotate the direction w and watch Var(z) change. Click <b>Snap to PC1</b>.',
          'Click <b>w = (0.6, 0.8) — slide 7</b> and look at the explained variance bars.',
          'Switch to <b>Unscaled units</b>, then tick <b>standardize each feature first</b>.',
          'Switch to <b>Classes in a low-variance direction</b>: PC1 keeps the variance but loses the classes.',
        ] },
        check: { q: 'PC1 is the direction that…', o: ['maximises the variance of the projected data', 'best separates the classes', 'minimises the variance', 'is parallel to the first original feature'], why: 'PCA maximises Var(z). It ignores labels (that would be LDA).' },
      },
    ],
  },

  /* ================================================================ */
  4: {
    goal: 'Tell classes from clusters, run k-means by hand (assign → update) and explain reconstruction error and encoding, explain soft clustering with EM, build a dendrogram with single/complete link, and choose k.',
    time: '≈ 80 min',
    videos: [
      ['k-means clustering', 'StatQuest k-means clustering'],
      ['hierarchical clustering', 'StatQuest hierarchical clustering'],
      ['Gaussian mixture models and EM', 'Gaussian mixture model EM algorithm explained simply'],
      ['choosing k: elbow and silhouette', 'elbow method silhouette score choosing k explained'],
    ],
    steps: [
      {
        t: 'Classes vs clusters; parametric vs nonparametric',
        html: `
<table class="t">
  <tr><th></th><th>Supervised</th><th>Unsupervised</th></tr>
  <tr><td>Data</td><td>X = {xᵗ, rᵗ} — with labels</td><td>X = {xᵗ} — no labels</td></tr>
  <tr><td>Groups</td><td><b>Classes</b> Cᵢ, i = 1…K, <b>given</b></td><td><b>Clusters</b> Gᵢ, i = 1…k, <b>found</b></td></tr>
</table>
<p><b>Parametric</b> learning assumes a predefined form of the mapping function (e.g. a Gaussian); <b>nonparametric</b> makes no such assumption.</p>
<div class="callout"><b>💡 Don't confuse:</b> dimensionality reduction groups <b>features</b> (correlations, columns); clustering groups <b>instances</b> (similarities, rows).</div>`,
      },
      {
        t: 'k-means: assign, update, repeat',
        html: `
<p>Goal: find <b>k reference vectors</b> mᵢ (also called prototypes, codebook vectors, codewords) that best represent the data.</p>
<h3>The algorithm</h3>
<ol>
  <li><b>Initialise</b> the mᵢ, e.g. to k random data points.</li>
  <li><b>Assign</b>: each point xᵗ goes to its <b>nearest</b> mᵢ (bᵢᵗ = 1 for that cluster, 0 otherwise).</li>
  <li><b>Update</b>: move each mᵢ to the <b>mean</b> of its points: mᵢ = Σₜ bᵢᵗxᵗ / Σₜ bᵢᵗ.</li>
  <li>Repeat 2–3 until the mᵢ stop moving (converge).</li>
</ol>
<h3>Tiny example (1-D)</h3>
<p>Points 1, 2, 9, 10, 11; k = 2; start m₁ = 1, m₂ = 2.</p>
<ul>
  <li>Assign: {1} → m₁; {2, 9, 10, 11} → m₂ (2 is nearest to itself).</li>
  <li>Update: m₁ = 1, m₂ = (2+9+10+11)/4 = 8.</li>
  <li>Assign: 2 is now nearer to 1 than to 8 → {1, 2} and {9, 10, 11}.</li>
  <li>Update: m₁ = 1.5, m₂ = 10. Assign again: nothing changes → <b>converged</b>.</li>
</ul>
<h3>Reconstruction error</h3>
<p><b>E = Σₜ Σᵢ bᵢᵗ ‖xᵗ − mᵢ‖²</b> — how badly the centres stand in for the points (sklearn calls it <i>inertia</i>). k-means lowers it at every step.</p>
<p><b>Encoding/decoding:</b> to compress, send only the <b>index</b> i of the nearest centre; the decoder outputs mᵢ. That's <b>colour quantisation</b>: an image with millions of colours stored with only k colours.</p>`,
        lab: { href: 'w4/kmeans.html', todo: [
          'Load <b>3 blobs (slide 16)</b>, k = 3. Click <b>Initialize</b>, then alternate <b>① Assign</b> and <b>② Update</b> and watch the centres move.',
          'Choose init <b>all in one corner</b> and run to convergence: a bad start can give a bad result.',
          'Load <b>Unscaled features</b> and compare with "standardize features" ticked.',
          'Look at the <b>elbow</b> plot for choosing k.',
        ] },
        check: { q: 'In the k-means update step, each centre moves to…', o: ['the mean of the points assigned to it', 'the point farthest from it', 'a random data point', 'the origin'], why: 'mᵢ = average of its assigned points.' },
      },
      {
        t: 'Soft clustering with EM',
        html: `
<p>k-means is <b>hard</b> clustering: each point belongs to exactly <b>one</b> cluster. <b>EM</b> (Expectation-Maximisation) gives <b>soft</b> clustering: each point belongs to <b>every</b> cluster with some probability (e.g. 70% A, 30% B).</p>
<p>Each cluster is a <b>Gaussian</b> (bell curve) with mean μᵢ and variance σᵢ².</p>
<ol>
  <li>Start with random Gaussians.</li>
  <li><b>E-step</b>: for each point, compute how likely it belongs to each cluster (probabilities).</li>
  <li><b>M-step</b>: re-fit each Gaussian's μᵢ and σᵢ² using all points, <b>weighted by those probabilities</b>.</li>
  <li>Repeat until it converges.</li>
</ol>
<div class="callout"><b>💡 Link:</b> k-means is like EM where each probability is forced to 0 or 1.</div>`,
        lab: { href: 'w4/em.html', todo: [
          'Load <b>Two clear groups</b>, click <b>Random Gaussians</b>, then alternate <b>E-step</b> and <b>M-step</b>.',
          'Click a point between the groups to see its probabilities.',
          'Load <b>Overlapping groups</b> and tick "show k-means-style hard assignment" to compare.',
        ] },
        check: { q: 'What does the E-step compute?', o: ['For each point, the probability it belongs to each cluster', 'The new means of the clusters', 'The number of clusters k', 'The dendrogram'], why: 'E = expectation (probabilities); M = maximisation (re-fit parameters).' },
      },
      {
        t: 'Hierarchical clustering and the dendrogram',
        html: `
<p>No need to choose k in advance. <b>Agglomerative</b> clustering:</p>
<ol>
  <li>Start with <b>N groups</b>, one point each.</li>
  <li>Merge the <b>two closest groups</b>.</li>
  <li>Repeat until one group remains.</li>
</ol>
<p>(<b>Divisive</b> = the opposite: start with one group and split.)</p>
<h3>Distance between points</h3>
<p>Minkowski: d = [Σⱼ |xⱼʳ − xⱼˢ|ᵖ]^(1/p). <b>p = 2: Euclidean</b> (straight line). <b>p = 1: city-block</b> = Σ |differences| (like walking along streets).</p>
<h3>Distance between groups (linkage)</h3>
<table class="t">
  <tr><th>Linkage</th><th>Distance between two groups</th></tr>
  <tr><td><b>Single-link</b></td><td><b>min</b> distance between any two members (closest pair)</td></tr>
  <tr><td><b>Complete-link</b></td><td><b>max</b> distance (farthest pair)</td></tr>
  <tr><td>Average-link</td><td>average over all pairs</td></tr>
  <tr><td>Centroid</td><td>distance between the group means</td></tr>
</table>
<p>The merge history is drawn as a <b>dendrogram</b> (a tree). <b>Cutting it at height h</b> gives the clusters.</p>`,
        lab: { href: 'w4/hierarchical.html', todo: [
          'Load <b>Slide 15: a–f</b>, single-link, Euclidean. Click <b>Merge closest pair ▶</b> step by step and watch the dendrogram grow.',
          'Move the <b>cut at h</b> slider and count the clusters.',
          'Restart with complete-link and with city-block distance — does the merge order change?',
          'Try <b>A chain + a blob</b>: single-link "chains" points together.',
        ] },
        check: { q: 'Single-link distance between two groups is…', o: ['the minimum distance between their members', 'the maximum distance between their members', 'the distance between their means', 'always Euclidean'], why: 'Single = closest pair (min); complete = farthest pair (max).' },
      },
      {
        t: 'How to choose k',
        html: `
<ul>
  <li><b>The application decides</b> — e.g. image quantisation with 256 colours → k = 256.</li>
  <li><b>Plot the data</b> (after PCA to 2-D) and look.</li>
  <li><b>Elbow method</b>: plot reconstruction error vs k. Error always falls as k grows; pick the k where the curve bends ("elbow") and further gains are small.</li>
  <li><b>Check the clusters are meaningful</b> to a person.</li>
  <li>The project also uses the <b>silhouette score</b> (higher = points are closer to their own cluster than to others).</li>
</ul>
<div class="callout warn"><b>⚠ Trap:</b> "choose the k with the lowest reconstruction error" is wrong — that would always be k = N (every point its own cluster, error 0).</div>`,
        check: { q: 'Why can\'t we simply choose the k with the lowest reconstruction error?', o: ['Error keeps falling as k grows, reaching 0 at k = N', 'Reconstruction error is undefined for k > 2', 'Error rises with k', 'k-means does not compute an error'], why: 'More centres always fit better; use the elbow instead.' },
      },
    ],
  },

  /* ================================================================ */
  5: {
    goal: 'Describe a decision tree (decision nodes, leaves, univariate splits), compute entropy and choose the best split with ID3 on Play Tennis, build a regression tree, explain pre- and postpruning, and extract IF-THEN rules.',
    time: '≈ 80 min',
    videos: [
      ['decision trees', 'StatQuest decision and classification trees clearly explained'],
      ['entropy and information gain', 'StatQuest entropy for data science clearly explained'],
      ['ID3 worked example (Play Tennis)', 'ID3 algorithm decision tree play tennis example entropy'],
      ['regression trees', 'StatQuest regression trees clearly explained'],
      ['pruning', 'StatQuest how to prune regression trees'],
    ],
    steps: [
      {
        t: 'What a decision tree is',
        html: `
<p>A decision tree is a flowchart of questions:</p>
<ul>
  <li><b>Internal decision nodes</b> test an attribute: "Outlook = ?", "Humidity &gt; 75?"</li>
  <li><b>Leaves</b> give the answer: a <b>class</b> (classification) or a <b>number</b> (regression — the average r of the examples there).</li>
</ul>
<p><b>Univariate</b> nodes test <b>one</b> attribute:</p>
<ul>
  <li>numeric xᵢ → a <b>binary</b> split: xᵢ &gt; wₘ ?</li>
  <li>discrete xᵢ with n values → an <b>n-way</b> split (Outlook → sunny / overcast / rain).</li>
</ul>
<p><b>Multivariate</b> nodes use all attributes at once: w·x + w₀ &gt; 0 (an oblique line).</p>
<p>Learning is <b>greedy</b>: find the best split at the root, then recurse on each branch (Breiman et al. 1984 — CART; Quinlan 1986 — ID3, 1993 — C4.5).</p>`,
      },
      {
        t: 'Impurity: entropy',
        html: `
<p>At node m, Nₘ examples arrive, Nₘⁱ of them from class i, so pₘⁱ = Nₘⁱ / Nₘ. The node is <b>pure</b> if all its examples are from one class.</p>
<p>We measure impurity with <b>entropy</b>:</p>
<p style="text-align:center"><b>𝓘ₘ = −Σᵢ pₘⁱ log₂ pₘⁱ</b></p>
<ul>
  <li>Pure node (p = 1 or 0) → entropy <b>0</b>.</li>
  <li>50/50 node → entropy <b>1 bit</b> (maximum for 2 classes).</li>
</ul>
<h3>Play Tennis: 14 days, 9 yes / 5 no</h3>
<p>𝓘 = −(9/14)·log₂(9/14) − (5/14)·log₂(5/14) = 0.410 + 0.530 = <b>0.940</b></p>
<div class="callout"><b>💡 Tip for the exam:</b> log₂(x) = ln(x) / ln(2). Remember a few values: 𝓘(½) = 1, 𝓘(9/14) = 0.940, 𝓘(2/5) = 𝓘(3/5) = 0.971.</div>`,
        check: { q: 'A node has 4 "yes" and 4 "no". Its entropy is…', o: ['1', '0', '0.5', '0.940'], why: 'A 50/50 split has the maximum entropy for 2 classes: 1 bit.' },
      },
      {
        t: 'Choosing the split (ID3) on Play Tennis',
        html: `
<p>For each attribute, compute the <b>weighted entropy after the split</b>:</p>
<p style="text-align:center"><b>𝓘′ₘ = Σⱼ (Nₘⱼ / Nₘ) · 𝓘(branch j)</b></p>
<p>Pick the attribute with the <b>lowest 𝓘′</b> = the highest <b>information gain</b> (𝓘ₘ − 𝓘′ₘ).</p>
<h3>Outlook worked out</h3>
<table class="t">
  <tr><th>Branch</th><th>Days</th><th>yes / no</th><th>Entropy</th></tr>
  <tr><td>Sunny</td><td>5</td><td>2 / 3</td><td>0.971</td></tr>
  <tr><td>Overcast</td><td>4</td><td>4 / 0</td><td><b>0</b> (pure!)</td></tr>
  <tr><td>Rain</td><td>5</td><td>3 / 2</td><td>0.971</td></tr>
</table>
<p>𝓘′(Outlook) = (5/14)·0.971 + (4/14)·0 + (5/14)·0.971 = <b>0.694</b></p>
<p>The others: Humidity 0.789, Wind 0.892, Temperature 0.911. <b>Outlook is lowest → it becomes the root.</b> Overcast is immediately a "yes" leaf. Then repeat on Sunny and Rain with the remaining attributes, until leaves are pure (or splitting no longer lowers entropy).</p>
<h3>Rule extraction (C4.5Rules)</h3>
<p>Each root-to-leaf path is an IF-THEN rule: <i>IF Outlook = sunny AND Humidity = high THEN no</i>. Trees are <b>interpretable</b>.</p>`,
        lab: { href: 'w5/id3.html', todo: [
          'Click the root node and compute 𝓘′ for every attribute (tick "show 𝓘′" to check). Choose the lowest.',
          'Go down the Sunny and Rain branches and split them yourself.',
          'Read the rules on the right, then use <b>Classify a new day</b>. Compare with <b>Auto-build (ID3)</b>.',
        ] },
        check: { q: 'Which attribute does ID3 put at the root?', o: ['The one with the lowest weighted entropy after the split (highest information gain)', 'The one with the most values', 'The one with the highest entropy after the split', 'The first column of the table'], why: 'Lowest 𝓘′ = highest gain. On Play Tennis that is Outlook (0.694).' },
      },
      {
        t: 'Regression trees and pruning',
        html: `
<p>In a <b>regression tree</b> each leaf predicts a number: gₘ = the <b>average r</b> of the examples reaching it. The node error is the mean squared error:</p>
<p style="text-align:center"><b>Eₘ = (1/Nₘ) Σₜ (rᵗ − gₘ)²</b></p>
<p>Choose the split that minimises the error after splitting. <b>Stop</b> when Eₘ &lt; θᵣ. The result is a step function.</p>
<h3>θᵣ controls complexity</h3>
<p>Smaller θᵣ → bigger tree that follows the data more closely (slide: θᵣ = 0.5 → 3 leaves, 0.05 → 7 leaves). Too small → overfitting.</p>
<h3>Pruning</h3>
<table class="t">
  <tr><th></th><th>Prepruning</th><th>Postpruning</th></tr>
  <tr><td>Idea</td><td>Stop growing early (e.g. Eₘ &lt; θᵣ, or too few examples)</td><td>Grow the full tree, then cut subtrees that overfit, using a separate <b>pruning set</b></td></tr>
  <tr><td>Trade-off</td><td><b>Faster</b></td><td><b>More accurate</b></td></tr>
</table>
<p>Pruning lowers <b>variance</b> → better generalisation. (sklearn's postpruning: <code>ccp_alpha</code>, Project Task 5.)</p>
<div class="callout"><b>💡 Note:</b> decision trees don't need feature scaling — each split looks at one feature at a time.</div>`,
        lab: { href: 'w5/regtree.html', todo: [
          'Load <b>Slide 15 points</b>. Click the θᵣ presets 0.5, 0.2, 0.05 and count the leaves.',
          'Switch to <b>Noisy curve + test set</b> and set θᵣ ≈ 0: training error → 0, test error goes up.',
          'Look at the error-vs-θᵣ chart and pick the θᵣ with the lowest test error. Read the rules.',
        ] },
        check: { q: 'Postpruning compared with prepruning is…', o: ['slower but usually more accurate', 'faster and less accurate', 'the same thing', 'only for classification trees'], why: 'Grow the full tree, then prune on a separate set: slower, more accurate.' },
      },
    ],
  },
};
