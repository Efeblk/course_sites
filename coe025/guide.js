/* COE025 guided lessons — teach each week from zero, in order, linking to the labs.
 * Based on the lecturer's slides (materials/COE025/). Format: see assets/js/learn.js.
 */
window.GUIDE = {
  /* ================================================================ */
  1: {
    goal: 'Explain what NLP is and how it evolved, define corpus / document / token, explain why subword tokenizers (BPE, WordPiece) exist, turn text into numbers with one-hot, bag of words, TF-IDF and n-grams, explain dense embeddings, and decide when an LLM is the wrong tool.',
    time: '≈ 90 min',
    videos: [
      ['what NLP is, big picture', 'natural language processing explained simply'],
      ['tokenization and BPE', 'Hugging Face byte pair encoding tokenization'],
      ['bag of words and TF-IDF', 'TF-IDF explained simply example'],
      ['word embeddings, king − man + woman', 'StatQuest word embedding and word2vec'],
    ],
    steps: [
      {
        t: 'What NLP is, and how it got here',
        html: `
<p><b>Natural Language Processing (NLP)</b> = teaching computers to <b>understand, interpret and generate human language</b>. It stands on three pillars: <b>linguistics</b> (how language works), <b>statistics</b> (learning from data) and <b>computer science</b> (algorithms).</p>
<table class="t">
  <tr><th>Era</th><th>Main idea</th><th>Examples</th></tr>
  <tr><td>1950s–80s</td><td>Hand-written <b>rules</b></td><td>ELIZA (1966), a "therapist" chatbot built on patterns</td></tr>
  <tr><td>1990s</td><td><b>Statistics</b> from data</td><td>n-gram language models, HMMs</td></tr>
  <tr><td>2010s</td><td><b>Deep learning</b></td><td>Word2Vec, LSTMs, attention</td></tr>
  <tr><td>2017+</td><td><b>Transformers &amp; LLMs</b></td><td>BERT, GPT</td></tr>
  <tr><td>Now</td><td>Choosing the <b>right tool</b> for the job</td><td>Sometimes a tiny classic model beats an LLM</td></tr>
</table>
<div class="callout"><b>💡 The one problem behind everything this week:</b> computers only work with <b>numbers</b>. Every method you'll see is a different answer to "how do we turn text into numbers without losing its meaning?"</div>`,
        check: { q: 'Which order of NLP eras is correct?', o: ['Rules → statistics → deep learning → Transformers/LLMs', 'Statistics → rules → Transformers → deep learning', 'Deep learning → rules → statistics → LLMs', 'Transformers → rules → statistics → deep learning'], why: '1950s rules (ELIZA) → 1990s statistics (n-grams, HMMs) → 2010s deep learning → 2017+ Transformers.' },
      },
      {
        t: 'Corpus, document, token — and the OOV problem',
        html: `
<table class="t">
  <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
  <tr><td><b>Corpus</b></td><td>A collection of documents</td><td>All 50,000 movie reviews</td></tr>
  <tr><td><b>Document</b></td><td>One unit of text</td><td>One review</td></tr>
  <tr><td><b>Token</b></td><td>The atomic unit the model sees</td><td>"movie", "!", "n't"</td></tr>
  <tr><td><b>Tokenization</b></td><td>Splitting text into tokens</td><td>"don't" → "do" + "n't"</td></tr>
  <tr><td><b>Vocabulary</b></td><td>All distinct tokens the model knows</td><td>{I, like, movie, …}</td></tr>
</table>
<h3>The out-of-vocabulary (OOV) problem</h3>
<p>The vocabulary is built from the training text. A word never seen in training — say "unhappiness" — becomes the unknown token <code>[UNK]</code>, and its meaning is lost.</p>
<h3>The fix: subword tokenization</h3>
<p>Split rare words into frequent <b>pieces</b>: "unhappiness" → "un" + "happi" + "ness". Every piece is known, so nothing becomes [UNK].</p>
<ul>
  <li><b>BPE</b> (Byte Pair Encoding, used by <b>GPT</b>): start from single characters, then repeatedly <b>merge the most frequent adjacent pair</b> into a new token.</li>
  <li><b>WordPiece</b> (used by <b>BERT</b>): similar, and marks pieces that continue a word with <code>##</code> — e.g. Turkish "geldiğinde" → "gel ##di ##ğin ##de".</li>
  <li><b>SentencePiece</b>: language-agnostic, works on raw text including spaces.</li>
</ul>`,
        lab: { href: 'w1/tokenizer.html', todo: [
          'In section 1 compare the two split rules on the test text. Count the <code>[UNK]</code> tokens: "Unhappiness" and "unhappy" are lost.',
          'In section 2 click the BPE merge button step by step. Watch frequent pairs like "e"+"n" become one token.',
          'In section 3 run WordPiece and look for the <code>##</code> pieces, including the Turkish example.',
        ] },
        check: { q: 'Why do modern models use subword tokenizers like BPE?', o: ['To avoid out-of-vocabulary words: rare words are built from known pieces', 'To make the text shorter for humans', 'Because they remove all punctuation', 'To translate text automatically'], why: 'Subwords solve the OOV problem — any word can be written as known pieces.' },
      },
      {
        t: 'Text → numbers: one-hot and bag of words',
        html: `
<p>Take the vocabulary <code>[cat, dog, sat, the]</code>.</p>
<h3>One-hot</h3>
<p>Each word is a vector as long as the vocabulary with a single 1: cat = [1,0,0,0], dog = [0,1,0,0].</p>
<div class="callout warn"><b>⚠ Problem:</b> every pair of words is equally far apart. "cat" is no closer to "dog" than to "the". One-hot vectors carry <b>no meaning</b>, and they get huge (50,000 words → 50,000 numbers).</div>
<h3>Bag of words (BoW)</h3>
<p>A document becomes a vector of <b>word counts</b>: "the cat sat the" → [cat:1, dog:0, sat:1, the:2].</p>
<ul>
  <li>Simple and surprisingly strong for classification.</li>
  <li>But <b>word order is lost</b>: "dog bites man" and "man bites dog" get the same vector.</li>
</ul>
<h3>N-grams</h3>
<p>Fix some of the order problem by also counting pairs (<b>bigrams</b>) or triples: "New York" becomes one feature, and "New York" ≠ "York New".</p>`,
        check: { q: 'What is the main weakness of bag of words?', o: ['It ignores word order', 'It cannot count words', 'It only works on one document', 'It always produces negative numbers'], why: 'BoW counts words; "dog bites man" = "man bites dog".' },
      },
      {
        t: 'TF-IDF: important words get big numbers',
        html: `
<p>Counts have a flaw: "the" appears in every document, so it dominates, but it tells us nothing. <b>TF-IDF</b> fixes this:</p>
<p style="text-align:center"><b>TF-IDF(word, doc) = TF × IDF</b></p>
<ul>
  <li><b>TF</b> (term frequency): how often the word appears <i>in this document</i> (week 1 uses count ÷ document length).</li>
  <li><b>IDF</b> (inverse document frequency) = <b>ln(N / df)</b>, where N = number of documents, df = number of documents that contain the word.</li>
</ul>
<h3>Worked example</h3>
<p>3 documents. "the" is in all 3 → IDF = ln(3/3) = ln 1 = <b>0</b> → weight 0, ignored. "cat" is in only 1 → IDF = ln(3/1) ≈ <b>1.10</b> → a high weight.</p>
<div class="callout"><b>💡 In one sentence:</b> TF-IDF is high for words that are <b>frequent in this document but rare in the others</b> — exactly the words that describe what the document is about.</div>`,
        lab: { href: 'w1/vectors.html', todo: [
          'Click the preset <b>W1 TF-IDF slide (3 docs)</b>.',
          'Look at the vocabulary, one-hot, BoW and TF-IDF tables. Click the TF-IDF cell for <b>"cat"</b> and read the arithmetic — you should see the lecture\'s <b>0.183</b>.',
          'Find a word that appears in every document and check that its TF-IDF is 0.',
          'Try the <b>"New York" n-grams</b> preset with "unigrams + bigrams".',
        ] },
        check: { q: 'A word appears in every document of the corpus. Its IDF = ln(N/df) is…', o: ['0', '1', 'very large', 'negative'], why: 'df = N, so ln(N/N) = ln 1 = 0.' },
      },
      {
        t: 'Dense embeddings: words with meaning',
        html: `
<p>Instead of a huge one-hot vector, give each word a short <b>dense vector</b> of 50–300 real numbers, learned from data so that <b>words with similar meaning get similar vectors</b>.</p>
<ul>
  <li>Similarity is measured with <b>cosine similarity</b> (the angle between vectors).</li>
  <li>Directions can carry meaning: <b>king − man + woman ≈ queen</b>.</li>
</ul>
<table class="t">
  <tr><th>Kind</th><th>Idea</th><th>Examples</th></tr>
  <tr><td><b>Static</b></td><td>One vector per word, always the same</td><td>Word2Vec, GloVe, FastText</td></tr>
  <tr><td><b>Contextual</b></td><td>The vector depends on the sentence</td><td>ELMo, BERT, GPT</td></tr>
</table>
<div class="callout"><b>💡 Why contextual matters:</b> "I sat on the river <b>bank</b>" vs "I took a <b>bank</b> loan". A static model gives "bank" one vector for both; a contextual model gives two different vectors.</div>`,
        lab: { href: 'w1/embeddings.html', todo: [
          'Click the preset <b>king − man + woman</b> and see where the result lands on the map.',
          'Try <b>puppy − dog + cat</b>.',
          'At the bottom switch between the <b>river sentence</b> and the <b>finance sentence</b> and watch the contextual "bank" move.',
        ] },
        check: { q: 'Which model gives the word "bank" a different vector in different sentences?', o: ['BERT (contextual)', 'Word2Vec (static)', 'GloVe (static)', 'One-hot encoding'], why: 'Contextual models (ELMo, BERT, GPT) build the vector from the sentence.' },
      },
      {
        t: 'The model zoo: BERT, GPT, T5',
        html: `
<p>Modern models are built from Transformers (week 3 explains how). There are three families — know which job each does:</p>
<table class="t">
  <tr><th>Family</th><th>Example</th><th>Good at</th></tr>
  <tr><td><b>Encoder-only</b></td><td><b>BERT</b></td><td><b>Understanding</b>: classification, NER, question answering</td></tr>
  <tr><td><b>Decoder-only</b></td><td><b>GPT</b></td><td><b>Generation</b>: writing text, chat</td></tr>
  <tr><td><b>Encoder-decoder</b></td><td><b>T5, BART</b></td><td>Text → text: <b>translation, summarisation</b></td></tr>
</table>
<div class="callout"><b>💡 Memory hook:</b> the <b>E</b>ncoder r<b>e</b>ads (understands), the <b>D</b>ecoder <b>d</b>rafts (generates), both together <b>transform</b> one text into another.</div>`,
        check: { q: 'You need to translate English to Turkish. Which architecture is the classic fit?', o: ['Encoder-decoder (T5/BART)', 'Encoder-only (BERT)', 'One-hot + Naive Bayes', 'Decoder-only is the only option'], why: 'Encoder-decoder models map one sequence to another: translation, summarisation.' },
      },
      {
        t: 'Bulldozer or nutcracker: when NOT to use an LLM',
        html: `
<p><i>"Don't use a bulldozer to crack a chestnut."</i> The lecture's example, spam filtering 1 million emails a day:</p>
<table class="t">
  <tr><th></th><th>LLM (GPT-4 API)</th><th>Naive Bayes</th></tr>
  <tr><td>Cost</td><td>≈ $30,000 / month</td><td>&lt; $10 / month</td></tr>
  <tr><td>Accuracy</td><td>98.5%</td><td><b>99.2%</b></td></tr>
  <tr><td>Latency</td><td>100–1000 ms</td><td>&lt; 10 ms</td></tr>
</table>
<p>Other factors that favour a small classical model: <b>interpretability</b> (you can see why), <b>privacy</b> (data stays in-house), <b>customisation</b>, and <b>no hallucinations</b>.</p>
<div class="callout warn"><b>📝 Exam tip:</b> be able to list the deciding factors: cost, latency, interpretability, privacy, customisation, hallucination risk.</div>`,
        lab: { href: 'w1/right-tool.html', todo: [
          'In section 1 use the slide numbers, then raise tokens per email to 300 and watch the cost gap grow.',
          'In section 2 compare the latencies with the 100 ms line.',
          'In section 3 pick a tool for each scenario and read the deciding factor.',
        ] },
      },
    ],
  },

  /* ================================================================ */
  2: {
    goal: 'Define text classification and its main tasks, follow the 5-step ML pipeline, classify a message by hand with Naive Bayes, explain logistic regression (sigmoid, weights) and SVM (maximum margin), and design features.',
    time: '≈ 90 min',
    videos: [
      ['Naive Bayes, step by step', 'StatQuest Naive Bayes clearly explained'],
      ['logistic regression', 'StatQuest logistic regression'],
      ['support vector machines', 'StatQuest support vector machines part 1'],
      ['text classification overview', 'text classification machine learning explained'],
    ],
    steps: [
      {
        t: 'What text classification is',
        html: `
<p><b>Text classification</b> = assigning a predefined <b>label</b> to a document: <code>f(text) → label</code>.</p>
<ul>
  <li><b>Binary</b>: two labels (spam vs ham).</li>
  <li><b>Multi-class</b>: several labels (sports, politics, tech…).</li>
</ul>
<table class="t">
  <tr><th>Task</th><th>Labels</th><th>Why it's hard</th></tr>
  <tr><td><b>Sentiment analysis</b></td><td>positive / neutral / negative</td><td>Sarcasm ("Great, it broke again"), context</td></tr>
  <tr><td><b>Spam detection</b></td><td>spam / ham</td><td>Spammers adapt</td></tr>
  <tr><td><b>Topic classification</b></td><td>sports, politics, …</td><td>Topics overlap</td></tr>
</table>
<p>Others: intent detection, content moderation, authorship, medical, legal, emotion.</p>`,
        check: { q: 'Sorting customer messages into "billing", "technical", "cancel" or "other" is…', o: ['multi-class classification', 'binary classification', 'tokenization', 'regression'], why: 'More than two predefined labels → multi-class.' },
      },
      {
        t: 'The ML pipeline, and why classical models first',
        html: `
<p style="text-align:center"><b>1 Data → 2 Features → 3 Model → 4 Prediction → 5 Evaluation</b> → back to data</p>
<ol>
  <li><b>Data</b> — labelled examples ("Win money now" = spam).</li>
  <li><b>Features</b> — turn text into numbers (week 1: BoW, TF-IDF…).</li>
  <li><b>Model</b> — learns patterns from the features.</li>
  <li><b>Prediction</b> — new text → label.</li>
  <li><b>Evaluation</b> — how good is it? Then improve the data or features.</li>
</ol>
<h3>Why start with classical methods?</h3>
<p>They are <b>fast to train, easy to interpret, work with small data, cheap</b>, and give a <b>strong baseline</b> to compare fancier models against.</p>
<div class="callout"><b>💡 Project 1 plan:</b> start with Naive Bayes as the baseline → try logistic regression → if time permits, SVM.</div>`,
      },
      {
        t: 'Naive Bayes: count, multiply, compare',
        html: `
<p>Naive Bayes asks: <i>"Given these words, which class is more likely?"</i></p>
<p style="text-align:center"><b>P(class | text) ∝ P(class) × P(word₁ | class) × P(word₂ | class) × …</b></p>
<ul>
  <li><b>P(class)</b> — the prior: what share of training emails is spam?</li>
  <li><b>P(word | class)</b> — how often this word appears in that class.</li>
  <li><b>"Naive"</b> — it assumes words are <b>independent</b> of each other (not true, but it works well).</li>
</ul>
<h3>Worked example (the lecture's 4 emails)</h3>
<p>Spam: "Win free money now!", "Click here for prize". Ham: "Meeting tomorrow at 3pm", "Dinner with family tonight". Classify <b>"Win free tickets"</b>.</p>
<ul>
  <li>P(spam) = P(ham) = 2/4 = 0.5.</li>
  <li>"win" and "free" appear in spam, never in ham. "tickets" appears nowhere.</li>
  <li>Without smoothing, P(win | ham) = 0 → the whole ham product is <b>0</b>. And P(tickets | spam) = 0 too → spam is 0 as well. One unseen word kills everything!</li>
</ul>
<div class="callout"><b>💡 Laplace (add-one) smoothing:</b> P(word | class) = (count + 1) / (tokens in class + |V|). No probability is ever 0. In practice we add <b>logs</b> instead of multiplying tiny numbers (log space), to avoid underflow.</div>
<p>Pros: very fast, works with little data. Cons: the independence assumption is unrealistic. It is a <b>generative</b> model (models how each class produces words).</p>`,
        lab: { href: 'w2/naive-bayes.html', todo: [
          'Choose the <b>W2 spam slide</b> training data and the text "Win free tickets". Read the prediction and the learned likelihoods.',
          'Switch smoothing to <b>none, α = 0</b>: watch a single zero make a score 0.',
          'Switch back to add-one and check which class wins and why.',
        ] },
        check: { q: 'Why do we use Laplace (add-one) smoothing in Naive Bayes?', o: ['So a word never seen in a class doesn\'t make the whole product zero', 'To make training slower but more accurate', 'To remove stop words', 'To turn it into an SVM'], why: 'Without smoothing an unseen word gives P = 0, and the product becomes 0.' },
      },
      {
        t: 'Logistic regression: weighted sum → probability',
        html: `
<p>Despite its name, logistic regression is a <b>classifier</b>.</p>
<ol>
  <li>Give each feature a <b>weight</b>: "good" → +2, "bad" → −2.</li>
  <li>Compute a score: <b>z = w₁x₁ + w₂x₂ + … + b</b> (b = bias).</li>
  <li>Squash it into 0…1 with the <b>sigmoid</b>: <b>p = σ(z) = 1 / (1 + e<sup>−z</sup>)</b>. This is P(positive).</li>
  <li>Predict positive if p ≥ 0.5 (i.e. z ≥ 0).</li>
</ol>
<p><b>Example:</b> "good movie": x_good = 1, x_bad = 0, b = 0 → z = 2 → σ(2) ≈ <b>0.88</b> → positive.</p>
<p><b>Learning:</b> the loss is <b>binary cross-entropy</b>; one gradient step changes each weight by −η·(p − y)·xᵢ. If the prediction p is too high for a negative example (y = 0), the weights of its words go down.</p>
<ul>
  <li>Pros: <b>interpretable</b> weights, probability output.</li>
  <li>Cons: <b>linear</b> decision boundary. It is <b>discriminative</b> (models the boundary directly).</li>
</ul>
<div class="callout warn"><b>⚠ "not good":</b> with single words, "not good" still contains "good" → positive. Adding the <b>bigram</b> "not good" as a feature fixes it.</div>`,
        lab: { href: 'w2/logreg.html', todo: [
          'In section 1 drag the weights and bias; follow z → σ(z) on the curve. Check that at z = 0, p = 0.5.',
          'In section 2 set a true label and click <b>Take one gradient step</b> a few times. Watch p move towards the label.',
          'In section 3 see "not good" fool the unigram model, then fix it with the bigram weight.',
        ] },
        check: { q: 'A logistic regression gives z = 0 for a review. What is P(positive)?', o: ['0.5', '0', '1', 'It cannot be computed'], why: 'σ(0) = 1/(1+e⁰) = 1/2.' },
      },
      {
        t: 'SVM: the widest street between classes',
        html: `
<p>Imagine positive reviews as green dots and negative as red dots. Many lines can separate them. The <b>Support Vector Machine</b> picks the one with the <b>maximum margin</b> — the widest "street" between the two classes.</p>
<ul>
  <li>The points touching the edges of the street are the <b>support vectors</b>; only they decide the boundary.</li>
  <li><b>C</b> controls the trade-off with outliers: large C = few mistakes allowed (narrow street), small C = wider street, some points may be inside it.</li>
  <li><b>Kernel trick</b> (linear, RBF, polynomial) — handle data that a straight line can't separate.</li>
</ul>
<p>Pros: works well in <b>high dimensions</b> (text has thousands of features). Cons: slow on very large data, sensitive to feature scaling, and its scores are <b>not probabilities</b>.</p>`,
        lab: { href: 'w2/svm.html', todo: [
          'Load the slide points, then rotate and slide the boundary yourself. Try to make the street as wide as possible.',
          'Click <b>Find maximum margin</b> and compare with your attempt.',
          'Add an outlier, then fit the soft margin with a small and a large C. Watch the street change.',
        ] },
        check: { q: 'What does a linear SVM choose?', o: ['The boundary with the largest margin between the classes', 'The boundary through the mean of all points', 'The boundary that maximises the number of support vectors', 'A probability for each class'], why: 'SVM = maximum-margin hyperplane.' },
      },
      {
        t: 'Feature engineering',
        html: `
<p><i>"Good features = good performance."</i> A classical model only sees the numbers you give it. Four families:</p>
<table class="t">
  <tr><th>Family</th><th>Examples</th></tr>
  <tr><td><b>Statistical</b></td><td>Length, number of "!", ratio of CAPITAL letters</td></tr>
  <tr><td><b>Lexical</b></td><td>BoW, TF-IDF, n-grams, character n-grams</td></tr>
  <tr><td><b>Linguistic</b></td><td>POS tags, sentiment lexicons, named entities</td></tr>
  <tr><td><b>Domain-specific</b></td><td>Spam words ("FREE", "WIN"), emoticons, URLs</td></tr>
</table>
<div class="callout"><b>💡 Pro tip:</b> combining feature types usually works best. "WON $1000000!!!" is caught by statistical features (!!!, caps) <i>and</i> lexical ones ("won").</div>`,
        lab: { href: 'w2/features.html', todo: [
          'Click the slide examples one by one (WON $1000000!!!, FREE iPhone, Meeting 3pm…) and watch the four feature families fill in.',
          'Look at the bars: which features push the toy scorer towards spam?',
          'Type your own message and try to make it look like spam without using any spam words.',
        ] },
        check: { q: 'The ratio of capital letters in a message is which kind of feature?', o: ['Statistical', 'Lexical', 'Linguistic', 'Domain-specific'], why: 'Length, punctuation and caps ratio are statistical features.' },
      },
    ],
  },

  /* ================================================================ */
  3: {
    goal: 'Build a leakage-free pipeline, explain how Word2Vec / GloVe / FastText learn embeddings, explain CNNs, RNNs and LSTMs for text, compute attention step by step, describe how BERT is pretrained and fine-tuned, and compute accuracy, precision, recall and F1.',
    time: '≈ 2–3 h (split it over two days)',
    videos: [
      ['Word2Vec', 'StatQuest word embedding and word2vec clearly explained'],
      ['recurrent neural networks', 'StatQuest recurrent neural networks clearly explained'],
      ['LSTM', 'StatQuest long short-term memory LSTM clearly explained'],
      ['attention and Transformers', '3Blue1Brown attention in transformers visually explained'],
      ['BERT', 'BERT explained simply masked language model fine-tuning'],
      ['precision, recall, F1', 'precision recall F1 score explained simply'],
    ],
    steps: [
      {
        t: 'The big picture & honest evaluation (no leakage!)',
        html: `
<p style="text-align:center"><b>text → representation (counts / TF-IDF / vectors) → classifier (classical or neural) → label</b></p>
<p><b>Training</b> learns parameters; <b>inference</b> reuses them on new text.</p>
<h3>Three data splits</h3>
<table class="t">
  <tr><th>Split</th><th>Used for</th></tr>
  <tr><td><b>Train</b></td><td>Fit everything: the vocabulary, the IDF values, the classifier</td></tr>
  <tr><td><b>Validation</b></td><td>Choose between models and settings</td></tr>
  <tr><td><b>Test</b></td><td>Used <b>once</b>, at the very end, to report the final score</td></tr>
</table>
<div class="callout warn"><b>⚠ Data leakage:</b> if the vocabulary or IDF is computed on the test data too (e.g. <code>fit_transform</code> on test), information from the test set "leaks" into training and the score looks better than it really is. Rule: <code>fit</code> on train, only <code>transform</code> on validation/test.</div>
<div class="callout"><b>💡 Exam analogy:</b> the test set is the final exam. If you've seen the exam questions while studying, your grade says nothing about what you actually learned.</div>`,
        check: { q: 'Which is data leakage?', o: ['Computing the TF-IDF vocabulary on train + test together', 'Fitting the vectorizer on train and transforming test', 'Using a validation set to choose the model', 'Reporting the test score once at the end'], why: 'Anything fitted on test data leaks information. Fit on train only.' },
      },
      {
        t: 'The math of NB, LR and SVM in one page',
        html: `
<table class="t">
  <tr><th>Model</th><th>Score</th><th>Loss / training</th></tr>
  <tr><td><b>Naive Bayes</b></td><td>score(c) = ln P(c) + Σ n(t,d)·ln P(t|c)<br><span class="muted small">(log space: add logs instead of multiplying)</span></td><td>Just counting (with smoothing)</td></tr>
  <tr><td><b>Logistic regression</b></td><td>p = σ(w·x + b)</td><td>Binary cross-entropy; gradient = (p − y)·x</td></tr>
  <tr><td><b>SVM</b></td><td>f(x) = w·x + b (a score, <b>not</b> a probability)</td><td>Hinge loss max(0, 1 − y·f(x)); objective ½‖w‖² + C·Σ hinge</td></tr>
</table>
<p><b>Hinge loss</b> in words: 0 if the point is on the right side and outside the street (y·f(x) ≥ 1), positive if it's inside the street, larger than 1 if it's on the wrong side.</p>`,
        check: { q: 'For an SVM, a training point has y·f(x) = 2. Its hinge loss is…', o: ['0', '1', '2', '−1'], why: 'max(0, 1 − 2) = 0: correct and outside the margin.' },
      },
      {
        t: 'Learning embeddings: Word2Vec, GloVe, FastText',
        html: `
<p>An <b>embedding table</b> stores one vector per word; a word's ID just selects its row. How do we learn these rows? From raw text — <b>no labels needed</b>.</p>
<h3>Word2Vec</h3>
<p>Slide a window over text: "I <b>love</b> this movie". The center word is "love"; the context is the words around it.</p>
<ul>
  <li><b>CBOW</b>: context → predict the <b>center</b> word.</li>
  <li><b>Skip-gram</b>: center → predict each <b>context</b> word.</li>
  <li><b>Negative sampling</b>: instead of a softmax over the whole vocabulary, train a yes/no decision — a real pair (target 1) vs a random pair (target 0). Much faster.</li>
</ul>
<h3>GloVe</h3>
<p>Counts <b>global co-occurrence</b> (how often word pairs appear near each other in the whole corpus) and fits vectors to those counts.</p>
<h3>FastText</h3>
<p>Represents a word as <b>character n-grams</b>: "<code>&lt;ev</code>", "<code>evl</code>", … So it can build vectors for <b>rare and unseen words</b> from their pieces.</p>
<div class="callout"><b>💡 Memory hook:</b> <b>C</b>BOW = <b>C</b>ontext → center. Skip-gram = the opposite. <b>G</b>loVe = <b>G</b>lobal counts. <b>F</b>astText = <b>F</b>ragments.</div>`,
        lab: { href: 'w3/word2vec.html', todo: [
          'Section 1: click words to make them the center and compare the CBOW and skip-gram training pairs.',
          'Section 2–3: follow the CBOW forward pass and the negative-sampling loss.',
          'Section 4: build the GloVe co-occurrence table. Then split a word into FastText n-grams.',
        ] },
        check: { q: 'Which method predicts the center word from its context?', o: ['CBOW', 'Skip-gram', 'GloVe', 'FastText'], why: 'CBOW: context → center. Skip-gram: center → context.' },
      },
      {
        t: 'CNNs for text',
        html: `
<p>A text CNN slides a small <b>filter</b> over windows of word vectors, like reading 2–3 words at a time:</p>
<ol>
  <li>For each window: multiply by the filter weights, sum, add bias, apply <b>ReLU</b> (negative → 0). One number per window position.</li>
  <li>The <b>same filter</b> is reused at every position (<b>weight sharing</b>), so it detects a pattern like "not good" wherever it appears.</li>
  <li><b>Pooling</b> (max or mean) squeezes all positions into <b>one number per filter</b>. Max-pooling asks "did this pattern appear anywhere?" — and forgets <i>where</i>.</li>
</ol>
<p>Shapes: a batch of 2 sentences, 7 tokens, 8-dim embeddings → <code>[2, 7, 8]</code>; with 4 filters and pooling → <code>[2, 4]</code>.</p>`,
        lab: { href: 'w3/cnn.html', todo: [
          'Load the slide-16 values and step the filter with ◀ ▶ over "not very good". Note the ReLU response at each position.',
          'Compare max and mean pooling.',
          'In section 2 change batch, tokens and filters and follow the tensor shapes.',
        ] },
        check: { q: 'What does max-pooling over positions do in a text CNN?', o: ['Keeps the strongest response of each filter and discards its position', 'Keeps only the first word', 'Converts the output into probabilities', 'Adds more tokens'], why: 'Pooling removes the position axis: one number per filter.' },
      },
      {
        t: 'RNNs and LSTMs: reading in order',
        html: `
<p>An <b>RNN</b> reads tokens one by one and carries a running <b>state</b> (memory):</p>
<p style="text-align:center"><b>h[t] = tanh(x[t] + W·h[t−1])</b> — new state = mix of the current word and the previous state</p>
<p>So <b>order matters</b> (unlike BoW). But training multiplies one factor per time step: 0.5²⁰ ≈ 0.000001 → <b>vanishing gradient</b> (it forgets early words); 1.5²⁰ ≈ 3325 → <b>exploding gradient</b>.</p>
<h3>LSTM — a memory with gates</h3>
<ul>
  <li><b>Forget gate f</b> — how much old memory to keep.</li>
  <li><b>Input gate i</b> — how much new information to write.</li>
  <li><b>Output gate o</b> — how much of the memory to show.</li>
  <li>New cell: <b>c[t] = f·c[t−1] + i·g</b> (g = the candidate new content).</li>
</ul>
<p>Gates are sigmoid values between 0 and 1, <b>learned</b>, not hand-written.</p>
<h3>BiLSTM, padding, masks</h3>
<p>A <b>BiLSTM</b> reads left→right and right→left and <b>concatenates</b>: 256 + 256 = <b>512</b> features per token (same number of tokens). Sentences in a batch have different lengths, so we <b>pad</b> them, and a <b>mask</b> (1 = real, 0 = PAD) tells the model to ignore the padding.</p>`,
        lab: { href: 'w3/rnn.html', todo: [
          'Section 1: run the state through the text, then tick <b>Reverse the input</b> — the final state changes, so order matters.',
          'Section 2: compare 0.5²⁰, 1.5²⁰ and 1²⁰.',
          'Section 3: load the slide-21 values and open/close the forget and input gates.',
          'Sections 4–5: check the BiLSTM width and watch the padding mask.',
        ] },
        check: { q: 'A BiLSTM has 128 hidden units per direction. How many features per token does it output?', o: ['256', '128', '64', '512'], why: 'The two directions are concatenated: 128 + 128.' },
      },
      {
        t: 'Attention, step by step',
        html: `
<p>Attention lets each word <b>look at all other words</b> and decide which ones matter for it. Each token has three vectors:</p>
<ul>
  <li><b>Query (Q)</b> — "what am I looking for?"</li>
  <li><b>Key (K)</b> — "what do I offer?"</li>
  <li><b>Value (V)</b> — "the content I pass on".</li>
</ul>
<p style="text-align:center"><b>Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V</b></p>
<ol>
  <li><b>Scores</b>: dot product of each query with each key.</li>
  <li><b>Scale</b>: divide by √dₖ (otherwise scores get too big and softmax becomes too sharp).</li>
  <li><b>Mask</b>: set forbidden positions to −∞.</li>
  <li><b>Softmax</b>: each row becomes weights that <b>sum to 1</b>.</li>
  <li><b>Mix</b>: the output is the weighted sum of the value vectors.</li>
</ol>
<table class="t">
  <tr><th>Mask</th><th>Who uses it</th><th>Effect</th></tr>
  <tr><td>Bidirectional (none)</td><td>BERT encoder</td><td>Every token sees both sides</td></tr>
  <tr><td><b>Causal</b></td><td>GPT decoder</td><td>A token can't see <b>future</b> tokens</td></tr>
  <tr><td>Padding</td><td>Everyone</td><td>Nobody attends to PAD</td></tr>
</table>
<div class="callout warn"><b>⚠ Trap:</b> an attention <b>mask</b> is not the <code>[MASK]</code> token. The mask blocks positions; [MASK] is a word hidden during BERT pretraining.</div>`,
        lab: { href: 'w3/attention.html', todo: [
          'Section 1: load the <b>Slide 25</b> preset and check the weights [.25, .50, .25] — each row sums to 1.',
          'Switch the mask between bidirectional, causal and "token 3 is PAD" and see which weights become 0.',
          'Section 2: change dₖ and watch why we divide by √dₖ.',
        ] },
        check: { q: 'In attention, what do the softmax weights in one row add up to?', o: ['1', '0', 'dₖ', 'The number of tokens'], why: 'Softmax normalises each row into weights that sum to 1.' },
      },
      {
        t: 'Transformers and BERT',
        html: `
<p>A <b>Transformer</b> stacks attention layers (plus small feed-forward layers). No recurrence, so it processes all tokens in parallel.</p>
<h3>BERT's input</h3>
<p><code>[CLS] the film was great [SEP]</code> — each token's vector = <b>token embedding + segment embedding + position embedding</b>. The position embedding is needed because attention itself has no sense of order.</p>
<h3>Life of a BERT classifier</h3>
<ol>
  <li><b>Pretraining</b> on huge unlabelled text with the <b>masked language model</b>: "The film was [MASK]" → predict the hidden word. Learns language in general.</li>
  <li><b>Fine-tuning</b> on your labelled data: put a small <b>classification head</b> on the [CLS] output and train for your task (e.g. sentiment).</li>
</ol>
<div class="callout warn"><b>⚠ Truncation:</b> BERT has a maximum length (e.g. 512 tokens). Long reviews get cut — and if the decisive sentence ("…but the ending ruined it") is at the end, it's lost.</div>`,
        check: { q: 'How is BERT pretrained?', o: ['By predicting masked words in unlabelled text', 'By classifying sentiment from the start', 'By generating text left to right only', 'By counting word co-occurrences'], why: 'Masked language modelling, then fine-tuning a classification head.' },
      },
      {
        t: 'Metrics: accuracy, precision, recall, F1',
        html: `
<table class="t">
  <tr><th></th><th>Predicted POSITIVE</th><th>Predicted NEGATIVE</th></tr>
  <tr><td><b>Actually POSITIVE</b></td><td>TP</td><td>FN (missed)</td></tr>
  <tr><td><b>Actually NEGATIVE</b></td><td>FP (false alarm)</td><td>TN</td></tr>
</table>
<ul>
  <li><b>Accuracy</b> = (TP + TN) / all</li>
  <li><b>Precision</b> = TP / (TP + FP) — "of what I called positive, how much was right?"</li>
  <li><b>Recall</b> = TP / (TP + FN) — "of all real positives, how many did I find?"</li>
  <li><b>F1</b> = 2·P·R / (P + R) = 2TP / (2TP + FP + FN) — balances both.</li>
  <li><b>Macro-F1</b> — compute F1 per class and average them equally (fair to small classes).</li>
</ul>
<h3>Worked example (slide 33): TP = 30, FN = 10, FP = 5, TN = 55</h3>
<ul>
  <li>Accuracy = 85 / 100 = <b>0.85</b></li>
  <li>Precision = 30 / 35 = <b>0.857</b></li>
  <li>Recall = 30 / 40 = <b>0.75</b></li>
  <li>F1 = 60 / (60 + 5 + 10) = <b>0.80</b></li>
</ul>
<div class="callout warn"><b>⚠ Always compare with the majority baseline.</b> If 90% of reviews are positive, "always positive" already gets 90% accuracy.</div>`,
        lab: { href: 'w3/metrics.html', todo: [
          'Click <b>Slide 33 example</b> and check the four numbers above.',
          'Click <b>"Always negative" baseline</b>: high accuracy possible, but recall = 0.',
          'In section 2 move the threshold: raising it usually raises precision and lowers recall.',
        ] },
        check: { q: 'TP = 40, FP = 10, FN = 40. What is the precision?', o: ['0.8', '0.5', '0.4', '0.2'], why: 'Precision = TP/(TP+FP) = 40/50 = 0.8. (Recall would be 40/80 = 0.5.)' },
      },
    ],
  },

  /* ================================================================ */
  4: {
    goal: 'Explain POS tagging as disambiguation, tell open from closed word classes, use the UD tagset, explain the ~92% baseline and the information sources a tagger uses, and do named entity recognition with BIO tags.',
    time: '≈ 60 min',
    videos: [
      ['part-of-speech tagging', 'Jurafsky part of speech tagging lecture'],
      ['named entity recognition', 'named entity recognition BIO tagging explained'],
      ['sequence labeling overview', 'sequence labeling NLP POS NER explained'],
    ],
    steps: [
      {
        t: 'Sequence labeling: one label per token',
        html: `
<p>So far: one label per <b>document</b>. Now: one label per <b>token</b>. This is <b>sequence labeling</b>.</p>
<p><b>POS tagging</b> maps words x₁…xₙ to tags y₁…yₙ — <b>exactly one tag per word</b>.</p>
<p>It's a <b>disambiguation</b> task — the same word can have different tags:</p>
<ul>
  <li>"<b>Book</b> that flight" → book = <b>VERB</b></li>
  <li>"Hand me that <b>book</b>" → book = <b>NOUN</b></li>
</ul>
<p>Uses: parsing, named entity recognition, speech synthesis (how to pronounce "record"), information extraction.</p>`,
      },
      {
        t: 'Open vs closed classes and the UD tagset',
        html: `
<table class="t">
  <tr><th>Class</th><th>Meaning</th><th>Universal Dependencies tags</th></tr>
  <tr><td><b>Open class</b> (content words)</td><td>New words are added all the time ("iPhone", "to google")</td><td>NOUN, VERB, ADJ, ADV, PROPN, INTJ</td></tr>
  <tr><td><b>Closed class</b> (function words)</td><td>Fixed, small set; rarely changes</td><td>DET (the, a), PRON (she), ADP (in, on), CCONJ/SCONJ (and, because), AUX (is, will), PART (not, to)</td></tr>
  <tr><td>Other</td><td></td><td>NUM, PUNCT, SYM, X</td></tr>
</table>
<p>UD has <b>17</b> tags in total.</p>
<div class="callout"><b>💡 Test:</b> can you invent a new word of this type tomorrow? A new noun — yes ("a selfie"). A new preposition — no. So nouns are open, prepositions closed.</div>`,
        check: { q: 'Which is a closed-class category?', o: ['Determiners (the, a, this)', 'Nouns', 'Verbs', 'Adjectives'], why: 'Function words (DET, PRON, ADP, CONJ, AUX, PART) form closed classes.' },
      },
      {
        t: 'Ambiguity, the baseline, and clues a tagger uses',
        html: `
<ul>
  <li>Only <b>~15% of word types</b> (dictionary entries) are ambiguous…</li>
  <li>…but they are the common words, so <b>~60% of word tokens</b> in running text are ambiguous.</li>
  <li>"back" alone can be ADJ ("the back door"), NOUN ("on my back"), VERB ("back the bill"), PART ("call back"), ADV ("came back").</li>
</ul>
<h3>The baseline</h3>
<p>The simplest tagger: give every word its <b>most frequent tag</b> from training data (unknown words → NOUN). It already gets <b>~92%</b>. Good taggers (HMM, CRF, BERT) and humans get <b>~97%</b>.</p>
<h3>Three sources of information</h3>
<ol>
  <li><b>The word itself</b> (prior): "will" is usually AUX.</li>
  <li><b>Neighbouring words</b>: after "the", the next word is probably not a verb.</li>
  <li><b>Morphology / word shape</b>: un- → ADJ, -ly → ADV, Capitalised → PROPN.</li>
</ol>`,
        lab: { href: 'w4/pos.html', todo: [
          'Section 1: tag the sentence yourself with the 17 UD tags, then click <b>Check</b>.',
          'Section 2: work through the five faces of "back".',
          'Section 3: race the most-frequent-tag baseline, then tick the neighbour-word rules and watch the score rise.',
        ] },
        check: { q: 'The most-frequent-tag baseline reaches about…', o: ['92%', '50%', '75%', '99.9%'], why: 'Baseline ≈ 92%; state of the art and humans ≈ 97%.' },
      },
      {
        t: 'Named entity recognition (NER)',
        html: `
<p><b>NER</b> finds <b>spans</b> of text that are proper names and labels their type:</p>
<table class="t">
  <tr><th>Type</th><th>Meaning</th><th>Example</th></tr>
  <tr><td><b>PER</b></td><td>Person</td><td>Jane Villanueva</td></tr>
  <tr><td><b>ORG</b></td><td>Organisation</td><td>United Airlines</td></tr>
  <tr><td><b>LOC</b></td><td>Location (geographic)</td><td>Mount Everest</td></tr>
  <tr><td><b>GPE</b></td><td>Geo-political entity (country, city)</td><td>Chicago, Turkey</td></tr>
</table>
<p>Often extended with dates, times, money.</p>
<p><b>Why is NER harder than POS?</b></p>
<ul>
  <li><b>Segmentation</b>: where does the entity start and end? ("United Airlines Holding" = one entity of 3 words.)</li>
  <li><b>Type ambiguity</b>: "Washington" can be a person, a sports team, a location or a GPE.</li>
</ul>`,
        check: { q: 'In "Washington won the game last night", Washington is most likely…', o: ['an organisation (a team)', 'a person', 'a location', 'a GPE'], why: 'Context decides the type — a team that wins a game is an ORG.' },
      },
      {
        t: 'BIO tagging: turning spans into one tag per token',
        html: `
<p>To use a sequence labeler for NER, turn spans into one tag per token:</p>
<ul>
  <li><b>B-TYPE</b> — the token <b>begins</b> an entity</li>
  <li><b>I-TYPE</b> — the token is <b>inside</b> (continues) an entity</li>
  <li><b>O</b> — <b>outside</b>, not part of any entity</li>
</ul>
<table class="t">
  <tr><th>Jane</th><th>Villanueva</th><th>of</th><th>United</th><th>,</th><th>…</th></tr>
  <tr><td>B-PER</td><td>I-PER</td><td>O</td><td>B-ORG</td><td>O</td><td>…</td></tr>
</table>
<h3>How many tags?</h3>
<p>With <b>n</b> entity types: <b>BIO = 2n + 1</b> (a B and an I for each type, plus O). Variants: <b>IO = n + 1</b>, <b>BIOES = 4n + 1</b> (adds E = end, S = single-token entity).</p>
<p>Example: 4 types (PER, ORG, LOC, GPE) → BIO has 2·4 + 1 = <b>9</b> tags.</p>
<div class="callout warn"><b>⚠ Invalid sequences:</b> <code>O I-PER</code> (an I can't follow O) and <code>B-PER I-ORG</code> (the type can't switch inside a span).</div>
<p>Algorithms for POS and NER: HMMs, CRFs/MEMMs, neural sequence models (RNNs, Transformers), fine-tuned BERT — all <b>supervised</b>, needing hand-labelled data.</p>`,
        lab: { href: 'w4/bio.html', todo: [
          'Section 1: mark the entities in the slide sentence (first word, last word, type) and click <b>Check against the slide</b>.',
          'Section 2: change n and check 2n + 1, n + 1 and 4n + 1.',
          'Section 3: click the presets (valid, I after O, type switch…) and see which transitions are illegal.',
        ] },
        check: { q: 'With 3 entity types, how many BIO tags are there?', o: ['7', '4', '6', '13'], why: '2n + 1 = 2·3 + 1 = 7.' },
      },
    ],
  },
};
