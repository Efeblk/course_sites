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
        key: 'NLP teaches computers to work with human language. The big problem behind everything is that <b>computers only understand numbers</b>, so every method is a way of turning text into numbers.',
        fig: { type: 'flow', t: 'Five eras of NLP', items: [['', '1950s–80s', 'hand-written rules (ELIZA)', 'c3'], ['', '1990s', 'statistics: n-grams, HMMs', 'c0'], ['', '2010s', 'deep learning: Word2Vec, LSTM', 'c1'], ['', '2017+', 'Transformers, LLMs: BERT, GPT', 'c2'], ['', 'Now', 'pick the right tool for the job', 'c4']] },
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
<div class="callout"><b>The one problem behind everything this week:</b> computers only work with <b>numbers</b>. Every method you'll see is a different answer to "how do we turn text into numbers without losing its meaning?"</div>`,
        check: { q: 'Which order of NLP eras is correct?', o: ['Rules → statistics → deep learning → Transformers/LLMs', 'Statistics → rules → Transformers → deep learning', 'Deep learning → rules → statistics → LLMs', 'Transformers → rules → statistics → deep learning'], why: '1950s rules (ELIZA) → 1990s statistics (n-grams, HMMs) → 2010s deep learning → 2017+ Transformers.' },
      },
      {
        t: 'Corpus, document, token — and the OOV problem',
        key: 'A model only knows the tokens it saw in training. A new word becomes <code>[UNK]</code> and its meaning is lost, unless we split it into <b>known subword pieces</b>.',
        fig: [{ type: 'stack', t: 'From big to small', items: [['Corpus', 'all 50,000 movie reviews', 'c3'], ['Document', 'one review', 'c0'], ['Token', '"movie", "!", "n\'t"', 'c1']] }, { type: 'boxes', t: 'The word "unhappiness" was never seen in training', rows: [{ label: 'word-level', cells: [['[UNK] meaning lost', 'bad']] }, { label: 'subword (BPE)', cells: [['un', 'c0'], ['happi', 'c1'], ['ness', 'c2']] }], cap: 'Every subword piece is in the vocabulary, so nothing is lost.' }],
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
        key: '<b>One-hot</b>: one 1 per word, so no meaning and very long vectors. <b>Bag of words</b>: count each word in a document, but <b>word order is lost</b>.',
        fig: [{ type: 'boxes', t: 'One-hot, vocabulary [cat, dog, sat, the]', head: ['cat', 'dog', 'sat', 'the'], rows: [{ label: 'cat', cells: [['1', 'c0'], ['0', ''], ['0', ''], ['0', '']] }, { label: 'dog', cells: [['0', ''], ['1', 'c0'], ['0', ''], ['0', '']] }] }, { type: 'anim', name: 'bow', t: 'Bag of words, one word at a time' }],
        html: `
<p>Take the vocabulary <code>[cat, dog, sat, the]</code>.</p>
<h3>One-hot</h3>
<p>Each word is a vector as long as the vocabulary with a single 1: cat = [1,0,0,0], dog = [0,1,0,0].</p>
<div class="callout warn"><b>Problem:</b> every pair of words is equally far apart. "cat" is no closer to "dog" than to "the". One-hot vectors carry <b>no meaning</b>, and they get huge (50,000 words → 50,000 numbers).</div>
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
        key: 'TF-IDF is <b>high</b> for words that are frequent in <i>this</i> document but <b>rare in the others</b>. Those are the words that tell you what it is about.',
        fig: { type: 'bars', t: 'IDF = ln(N / df) with N = 3 documents', items: [['"the": in 3 of 3 docs', 0, 'mute', 'ln(3/3) = 0'], ['a word in 2 of 3 docs', 0.41, 'c0', 'ln(3/2) ≈ 0.41'], ['"cat": in 1 of 3 docs', 1.1, 'c1', 'ln(3/1) ≈ 1.10']], max: 1.2, cap: 'A word that is in every document gets weight 0, because it tells the documents apart not at all.' },
        html: `
<p>Counts have a flaw: "the" appears in every document, so it dominates, but it tells us nothing. <b>TF-IDF</b> fixes this:</p>
<p style="text-align:center"><b>TF-IDF(word, doc) = TF × IDF</b></p>
<ul>
  <li><b>TF</b> (term frequency): how often the word appears <i>in this document</i> (week 1 uses count ÷ document length).</li>
  <li><b>IDF</b> (inverse document frequency) = <b>ln(N / df)</b>, where N = number of documents, df = number of documents that contain the word.</li>
</ul>
<h3>Worked example</h3>
<p>3 documents. "the" is in all 3 → IDF = ln(3/3) = ln 1 = <b>0</b> → weight 0, ignored. "cat" is in only 1 → IDF = ln(3/1) ≈ <b>1.10</b> → a high weight.</p>
<div class="callout"><b>In one sentence:</b> TF-IDF is high for words that are <b>frequent in this document but rare in the others</b> — exactly the words that describe what the document is about.</div>`,
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
        key: 'An <b>embedding</b> is a short list of numbers per word, learned so that <b>similar words end up close together</b>. Directions can even carry meaning.',
        fig: { type: 'plot', t: 'Words as points (2 of the 50–300 dimensions, simplified)', w: 560, h: 300, x: [0, 9], y: [0, 6], pts: [[1, 2, 'c0', 'man'], [1.8, 0.6, 'c4', 'woman'], [4, 5, 'c0', 'king'], [4.8, 3.6, 'c4', 'queen'], [7, 1.6, 'c1', 'cat'], [7.6, 2.3, 'c1', 'dog']], lines: [{ pts: [[1, 2], [4, 5]], c: 'mute', dash: true }, { pts: [[1.8, 0.6], [4.8, 3.6]], c: 'mute', dash: true }], cap: 'man → king and woman → queen are the same arrow, so king − man + woman ≈ queen. "cat" and "dog" sit close together.' },
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
<div class="callout"><b>Why contextual matters:</b> "I sat on the river <b>bank</b>" vs "I took a <b>bank</b> loan". A static model gives "bank" one vector for both; a contextual model gives two different vectors.</div>`,
        lab: { href: 'w1/embeddings.html', todo: [
          'Click the preset <b>king − man + woman</b> and see where the result lands on the map.',
          'Try <b>puppy − dog + cat</b>.',
          'At the bottom switch between the <b>river sentence</b> and the <b>finance sentence</b> and watch the contextual "bank" move.',
        ] },
        check: { q: 'Which model gives the word "bank" a different vector in different sentences?', o: ['BERT (contextual)', 'Word2Vec (static)', 'GloVe (static)', 'One-hot encoding'], why: 'Contextual models (ELMo, BERT, GPT) build the vector from the sentence.' },
      },
      {
        t: 'The model zoo: BERT, GPT, T5',
        key: '<b>Encoders read</b> (they understand), <b>decoders draft</b> (they generate), and <b>encoder-decoders transform</b> one text into another.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Encoder-only: BERT', pts: ['understanding', 'classification, NER, question answering'], c: 'c0' }, { icon: '', t: 'Decoder-only: GPT', pts: ['generation', 'writing text, chat'], c: 'c1' }, { icon: '', t: 'Encoder-decoder: T5, BART', pts: ['text → text', 'translation, summarisation'], c: 'c3' }] },
        html: `
<p>Modern models are built from Transformers (week 3 explains how). There are three families — know which job each does:</p>
<table class="t">
  <tr><th>Family</th><th>Example</th><th>Good at</th></tr>
  <tr><td><b>Encoder-only</b></td><td><b>BERT</b></td><td><b>Understanding</b>: classification, NER, question answering</td></tr>
  <tr><td><b>Decoder-only</b></td><td><b>GPT</b></td><td><b>Generation</b>: writing text, chat</td></tr>
  <tr><td><b>Encoder-decoder</b></td><td><b>T5, BART</b></td><td>Text → text: <b>translation, summarisation</b></td></tr>
</table>
<div class="callout"><b>Memory hook:</b> the <b>E</b>ncoder r<b>e</b>ads (understands), the <b>D</b>ecoder <b>d</b>rafts (generates), both together <b>transform</b> one text into another.</div>`,
        check: { q: 'You need to translate English to Turkish. Which architecture is the classic fit?', o: ['Encoder-decoder (T5/BART)', 'Encoder-only (BERT)', 'One-hot + Naive Bayes', 'Decoder-only is the only option'], why: 'Encoder-decoder models map one sequence to another: translation, summarisation.' },
      },
      {
        t: 'Bulldozer or nutcracker: when NOT to use an LLM',
        key: 'A huge LLM is not always best. For a simple, high-volume task, a <b>small classical model</b> can be cheaper, faster and even more accurate.',
        fig: { type: 'boxes', t: 'Spam filter, 1 million emails a day (lecture example)', head: ['', 'LLM (GPT-4 API)', 'Naive Bayes'], rows: [{ label: 'Cost', cells: [['≈ $30,000 / month', 'bad'], ['< $10 / month', 'ok']] }, { label: 'Accuracy', cells: [['98.5%', 'warn'], ['99.2%', 'ok']] }, { label: 'Latency', cells: [['100–1000 ms', 'bad'], ['< 10 ms', 'ok']] }] },
        html: `
<p><i>"Don't use a bulldozer to crack a chestnut."</i> The lecture's example, spam filtering 1 million emails a day:</p>
<table class="t">
  <tr><th></th><th>LLM (GPT-4 API)</th><th>Naive Bayes</th></tr>
  <tr><td>Cost</td><td>≈ $30,000 / month</td><td>&lt; $10 / month</td></tr>
  <tr><td>Accuracy</td><td>98.5%</td><td><b>99.2%</b></td></tr>
  <tr><td>Latency</td><td>100–1000 ms</td><td>&lt; 10 ms</td></tr>
</table>
<p>Other factors that favour a small classical model: <b>interpretability</b> (you can see why), <b>privacy</b> (data stays in-house), <b>customisation</b>, and <b>no hallucinations</b>.</p>
<div class="callout warn"><b>Exam tip:</b> be able to list the deciding factors: cost, latency, interpretability, privacy, customisation, hallucination risk.</div>`,
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
        key: 'Text classification means giving each document <b>one label from a fixed list</b>: f(text) → label.',
        fig: { type: 'boxes', head: ['Text', 'Task', 'Label'], rows: [{ cells: [['"Win money now!!!"', ''], ['spam detection', 'mute'], ['spam', 'bad']] }, { cells: [['"Great, it broke again."', ''], ['sentiment', 'mute'], ['negative (sarcasm!)', 'c4']] }, { cells: [['"Galatasaray won 3–1"', ''], ['topic', 'mute'], ['sports', 'c1']] }] },
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
        key: 'Every project follows the same loop: <b>data → features → model → prediction → evaluation</b>, then improve and go round again.',
        fig: { type: 'flow', items: [['', 'Data', 'labelled examples', 'c3'], ['', 'Features', 'BoW, TF-IDF', 'c0'], ['', 'Model', 'NB, LR, SVM', 'c1'], ['', 'Prediction', 'new text → label', 'c2'], ['', 'Evaluation', 'how good? then improve ↺', 'c4']] },
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
<div class="callout"><b>Project 1 plan:</b> start with Naive Bayes as the baseline → try logistic regression → if time permits, SVM.</div>`,
      },
      {
        t: 'Naive Bayes: count, multiply, compare',
        key: 'For each class, multiply <b>how common the class is</b> by <b>how likely each word is in that class</b>. The bigger product wins. Add-one smoothing stops a single unseen word from making it 0.',
        fig: { type: 'flow', t: 'Classifying "Win free tickets"', items: [['', 'Count words per class', 'in the training emails', 'c0'], ['', 'Prior P(class)', 'spam 2/4, ham 2/4', 'c3'], ['', 'Multiply P(word | class)', 'with +1 smoothing', 'c2'], ['', 'Compare', 'spam score > ham score → spam', 'c1']], cap: 'Without smoothing, "win" never appears in ham, so P(win | ham) = 0 and the whole ham product becomes 0.' },
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
<div class="callout"><b>Laplace (add-one) smoothing:</b> P(word | class) = (count + 1) / (tokens in class + |V|). No probability is ever 0. In practice we add <b>logs</b> instead of multiplying tiny numbers (log space), to avoid underflow.</div>
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
        key: 'Give every word a <b>weight</b>, add them up into a score z, and squash z into a probability with the <b>sigmoid</b>. Predict positive if p ≥ 0.5.',
        fig: { type: 'plot', t: 'The sigmoid σ(z) = 1 / (1 + e^−z)', w: 560, h: 280, x: [-6, 6], y: [0, 1], xl: 'score z = w·x + b', yl: 'P(positive)', lines: [{ pts: [[-6, 0.0025], [-4, 0.018], [-3, 0.047], [-2, 0.119], [-1, 0.269], [0, 0.5], [1, 0.731], [2, 0.881], [3, 0.953], [4, 0.982], [6, 0.9975]], c: 'c0' }, { pts: [[-6, 0.5], [6, 0.5]], c: 'mute', dash: true }], pts: [[2, 0.881, 'c1', '"good movie": z = 2 → 0.88'], [0, 0.5, 'warn', 'z = 0 → 0.5']] },
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
<div class="callout warn"><b>"not good":</b> with single words, "not good" still contains "good" → positive. Adding the <b>bigram</b> "not good" as a feature fixes it.</div>`,
        lab: { href: 'w2/logreg.html', todo: [
          'In section 1 drag the weights and bias; follow z → σ(z) on the curve. Check that at z = 0, p = 0.5.',
          'In section 2 set a true label and click <b>Take one gradient step</b> a few times. Watch p move towards the label.',
          'In section 3 see "not good" fool the unigram model, then fix it with the bigram weight.',
        ] },
        check: { q: 'A logistic regression gives z = 0 for a review. What is P(positive)?', o: ['0.5', '0', '1', 'It cannot be computed'], why: 'σ(0) = 1/(1+e⁰) = 1/2.' },
      },
      {
        t: 'SVM: the widest street between classes',
        key: 'Many lines separate the classes. The SVM picks the one with the <b>widest street</b> (maximum margin). Only the points on the edge of the street, the <b>support vectors</b>, decide it.',
        fig: { type: 'plot', w: 520, h: 320, x: [0, 6], y: [0, 6], pts: [[2, 3, 'c1', 'support vector'], [3.5, 4.5, 'c1'], [1, 3.6, 'c1'], [1.6, 5, 'c1'], [2.6, 5.2, 'c1'], [3, 2, 'c4', 'support vector'], [4.5, 3.5, 'c4'], [4, 1.4, 'c4'], [5.2, 2.6, 'c4'], [3.6, 0.8, 'c4']], lines: [{ pts: [[0, 0], [6, 6]], c: 'c0', label: 'decision line' }, { pts: [[0, 1], [5, 6]], c: 'mute', dash: true }, { pts: [[1, 0], [6, 5]], c: 'mute', dash: true }], cap: 'Green = positive reviews, coral = negative. The dashed lines are the edges of the street.' },
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
        key: 'The model only sees the numbers you give it. <b>Better features</b> (n-grams, TF-IDF, handling negation…) often help more than a fancier model.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Words', pts: ['bag of words', 'n-grams: "not good" as one feature'], c: 'c0' }, { icon: '', t: 'Weights', pts: ['TF-IDF instead of raw counts'], c: 'c1' }, { icon: '', t: 'Extra signals', pts: ['text length', 'number of "!"', 'ALL CAPS words'], c: 'c2' }] },
        html: `
<p><i>"Good features = good performance."</i> A classical model only sees the numbers you give it. Four families:</p>
<table class="t">
  <tr><th>Family</th><th>Examples</th></tr>
  <tr><td><b>Statistical</b></td><td>Length, number of "!", ratio of CAPITAL letters</td></tr>
  <tr><td><b>Lexical</b></td><td>BoW, TF-IDF, n-grams, character n-grams</td></tr>
  <tr><td><b>Linguistic</b></td><td>POS tags, sentiment lexicons, named entities</td></tr>
  <tr><td><b>Domain-specific</b></td><td>Spam words ("FREE", "WIN"), emoticons, URLs</td></tr>
</table>
<div class="callout"><b>Pro tip:</b> combining feature types usually works best. "WON $1000000!!!" is caught by statistical features (!!!, caps) <i>and</i> lexical ones ("won").</div>`,
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
        key: 'Fit everything (vocabulary, IDF, model) on the <b>training set only</b>. The test set is the final exam: you look at it <b>once</b>, at the end.',
        fig: [{ type: 'flow', items: [['', 'Text', '', 'c3'], ['', 'Representation', 'counts / TF-IDF / vectors', 'c0'], ['', 'Classifier', 'classical or neural', 'c1'], ['', 'Label', '', 'c2']] }, { type: 'boxes', t: 'Three splits (for example 70 / 15 / 15)', rows: [{ cells: [['Train: fit vocabulary, IDF and model', 'c0'], ['', 'c0'], ['', 'c0'], ['', 'c0'], ['Validation: choose settings', 'c2'], ['Test: report once', 'c4']] }], cap: 'fit_transform on train, only transform on validation and test. Anything else leaks the test data into training.' }],
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
<div class="callout warn"><b>Data leakage:</b> if the vocabulary or IDF is computed on the test data too (e.g. <code>fit_transform</code> on test), information from the test set "leaks" into training and the score looks better than it really is. Rule: <code>fit</code> on train, only <code>transform</code> on validation/test.</div>
<div class="callout"><b>Exam analogy:</b> the test set is the final exam. If you've seen the exam questions while studying, your grade says nothing about what you actually learned.</div>`,
        check: { q: 'Which is data leakage?', o: ['Computing the TF-IDF vocabulary on train + test together', 'Fitting the vectorizer on train and transforming test', 'Using a validation set to choose the model', 'Reporting the test score once at the end'], why: 'Anything fitted on test data leaks information. Fit on train only.' },
      },
      {
        t: 'The math of NB, LR and SVM in one page',
        key: 'Three classic models, three ideas: NB <b>multiplies probabilities</b>, LR <b>squashes a weighted sum</b>, SVM <b>maximises the margin</b>.',
        fig: { type: 'compare', cols: [{ icon: '', t: 'Naive Bayes', pts: ['ĉ = argmax P(c) ∏ P(wᵢ | c)', 'generative', 'add-one smoothing'], c: 'c0' }, { icon: '', t: 'Logistic regression', pts: ['p = σ(w·x + b)', 'discriminative', 'loss: cross-entropy'], c: 'c1' }, { icon: '', t: 'SVM', pts: ['sign(w·x + b)', 'maximum margin', 'loss: hinge; C sets the trade-off'], c: 'c2' }] },
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
        key: '"You shall know a word by the company it keeps." Word2Vec learns a word\'s vector by <b>predicting its neighbours</b>.',
        fig: [{ type: 'boxes', t: 'Skip-gram, window = 2: centre word "brown"', rows: [{ cells: [['the', 'c1', 'context'], ['quick', 'c1', 'context'], ['brown', 'c2', 'centre'], ['fox', 'c1', 'context'], ['jumps', 'c1', 'context'], ['over', '']] }], cap: 'Training pairs: (brown, the), (brown, quick), (brown, fox), (brown, jumps).' }, { type: 'compare', cols: [{ t: 'Word2Vec', pts: ['predict neighbours (skip-gram / CBOW)'], c: 'c0' }, { t: 'GloVe', pts: ['global co-occurrence counts'], c: 'c3' }, { t: 'FastText', pts: ['character n-grams, so it handles unseen words'], c: 'c1' }] }],
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
<div class="callout"><b>Memory hook:</b> <b>C</b>BOW = <b>C</b>ontext → center. Skip-gram = the opposite. <b>G</b>loVe = <b>G</b>lobal counts. <b>F</b>astText = <b>F</b>ragments.</div>`,
        lab: { href: 'w3/word2vec.html', todo: [
          'Section 1: click words to make them the center and compare the CBOW and skip-gram training pairs.',
          'Section 2–3: follow the CBOW forward pass and the negative-sampling loss.',
          'Section 4: build the GloVe co-occurrence table. Then split a word into FastText n-grams.',
        ] },
        check: { q: 'Which method predicts the center word from its context?', o: ['CBOW', 'Skip-gram', 'GloVe', 'FastText'], why: 'CBOW: context → center. Skip-gram: center → context.' },
      },
      {
        t: 'CNNs for text',
        key: 'A CNN slides a small <b>filter</b> over every 2–3-word window, scores each window, then keeps the <b>maximum</b> (max-pooling). It finds key phrases wherever they are.',
        fig: { type: 'boxes', t: 'One filter that detects "not good"-like phrases', rows: [{ label: 'tokens', cells: [['this', ''], ['movie', ''], ['is', ''], ['not', 'c4'], ['good', 'c4'], ['at', ''], ['all', '']] }, { label: '3-word windows', cells: [['0.1', 'mute'], ['0.0', 'mute'], ['0.7', 'c2'], ['0.9', 'c4'], ['0.3', 'mute'], ['', ''], ['', '']] }, { label: 'max-pool', cells: [['0.9 → one number for this filter', 'c4']] }], cap: 'Window scores are made-up numbers to show the idea. Many filters give many such numbers, which go into a classifier.' },
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
        key: 'An RNN reads <b>one word at a time</b> and carries a memory h forward. Plain RNNs forget early words (<b>vanishing gradient</b>); LSTM <b>gates</b> decide what to keep.',
        fig: { type: 'anim', name: 'rnn', t: 'An RNN reading “the movie rocks”', cap: 'The memory dots are illustrative. Gradient over 20 steps: 0.5²⁰ ≈ 0.000001 (vanishes), 1.5²⁰ ≈ 3325 (explodes).' },
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
        key: 'With attention, each word <b>looks at all the other words</b> and decides how much each one matters to it. The weights in a row add up to 1.',
        fig: { type: 'anim', name: 'attention', t: 'Where does “it” look? “The animal didn\'t cross the street because it was tired”', cap: 'Illustrative weights (they add up to 1).' },
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
<div class="callout warn"><b>Trap:</b> an attention <b>mask</b> is not the <code>[MASK]</code> token. The mask blocks positions; [MASK] is a word hidden during BERT pretraining.</div>`,
        lab: { href: 'w3/attention.html', todo: [
          'Section 1: load the <b>Slide 25</b> preset and check the weights [.25, .50, .25] — each row sums to 1.',
          'Switch the mask between bidirectional, causal and "token 3 is PAD" and see which weights become 0.',
          'Section 2: change dₖ and watch why we divide by √dₖ.',
        ] },
        check: { q: 'In attention, what do the softmax weights in one row add up to?', o: ['1', '0', 'dₖ', 'The number of tokens'], why: 'Softmax normalises each row into weights that sum to 1.' },
      },
      {
        t: 'Transformers and BERT',
        key: 'BERT is a stack of attention layers. It is <b>pretrained</b> by guessing hidden words, then <b>fine-tuned</b> with a small head on the <code>[CLS]</code> output for your task.',
        fig: [{ type: 'boxes', t: 'BERT input: each vector = token + segment + position embedding', rows: [{ label: 'token', cells: [['[CLS]', 'c2'], ['the', 'c0'], ['film', 'c0'], ['was', 'c0'], ['great', 'c0'], ['[SEP]', 'c2']] }, { label: '+ segment', cells: [['A', 'c3'], ['A', 'c3'], ['A', 'c3'], ['A', 'c3'], ['A', 'c3'], ['A', 'c3']] }, { label: '+ position', cells: [['0', 'c5'], ['1', 'c5'], ['2', 'c5'], ['3', 'c5'], ['4', 'c5'], ['5', 'c5']] }] }, { type: 'flow', items: [['', 'Pretrain', '"The film was [MASK]" → guess', 'c0'], ['', 'Transformer layers', 'all tokens in parallel', 'c3'], ['', '[CLS] vector', '', 'c2'], ['', 'Fine-tuned head', '→ positive', 'c1']] }],
        html: `
<p>A <b>Transformer</b> stacks attention layers (plus small feed-forward layers). No recurrence, so it processes all tokens in parallel.</p>
<h3>BERT's input</h3>
<p><code>[CLS] the film was great [SEP]</code> — each token's vector = <b>token embedding + segment embedding + position embedding</b>. The position embedding is needed because attention itself has no sense of order.</p>
<h3>Life of a BERT classifier</h3>
<ol>
  <li><b>Pretraining</b> on huge unlabelled text with the <b>masked language model</b>: "The film was [MASK]" → predict the hidden word. Learns language in general.</li>
  <li><b>Fine-tuning</b> on your labelled data: put a small <b>classification head</b> on the [CLS] output and train for your task (e.g. sentiment).</li>
</ol>
<div class="callout warn"><b>Truncation:</b> BERT has a maximum length (e.g. 512 tokens). Long reviews get cut — and if the decisive sentence ("…but the ending ruined it") is at the end, it's lost.</div>`,
        check: { q: 'How is BERT pretrained?', o: ['By predicting masked words in unlabelled text', 'By classifying sentiment from the start', 'By generating text left to right only', 'By counting word co-occurrences'], why: 'Masked language modelling, then fine-tuning a classification head.' },
      },
      {
        t: 'Metrics: accuracy, precision, recall, F1',
        key: '<b>Precision</b>: of everything I flagged, how much was right? <b>Recall</b>: of everything that was really there, how much did I find? <b>F1</b> balances the two.',
        fig: [{ type: 'boxes', t: 'Slide 33 confusion matrix (100 examples)', head: ['', 'predicted positive', 'predicted negative'], rows: [{ label: 'actually positive', cells: [['TP = 30', 'ok'], ['FN = 10', 'bad']] }, { label: 'actually negative', cells: [['FP = 5', 'bad'], ['TN = 55', 'ok']] }] }, { type: 'bars', items: [['Accuracy = (30+55)/100', 0.85, 'c0', '0.85'], ['Precision = 30/(30+5)', 0.857, 'c1', '0.857'], ['Recall = 30/(30+10)', 0.75, 'c2', '0.75'], ['F1 = 2PR/(P+R)', 0.8, 'c3', '0.80']], max: 1 }],
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
<div class="callout warn"><b>Always compare with the majority baseline.</b> If 90% of reviews are positive, "always positive" already gets 90% accuracy.</div>`,
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
        key: 'In sequence labeling, the model gives <b>every token its own label</b>, not just one label for the whole text. POS tagging and NER are both like this.',
        fig: { type: 'boxes', t: 'POS tagging', rows: [{ label: 'word', cells: [['Janet', ''], ['will', ''], ['back', ''], ['the', ''], ['bill', '']] }, { label: 'tag', cells: [['PROPN', 'c3'], ['AUX', 'c5'], ['VERB', 'c1'], ['DET', 'c2'], ['NOUN', 'c0']] }] },
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
        key: 'Ask: <b>can someone invent a new word of this type tomorrow?</b> Yes, so it is an <b>open</b> class (nouns, verbs). No, so it is a <b>closed</b> class (the, in, and).',
        fig: { type: 'compare', vs: true, cols: [{ icon: '', t: 'Open class: content words', pts: ['NOUN, VERB, ADJ, ADV, PROPN, INTJ', 'new ones appear: "selfie", "to google"'], c: 'c1' }, { icon: '', t: 'Closed class: function words', pts: ['DET, PRON, ADP, CCONJ, SCONJ, AUX, PART', 'small fixed set: the, she, in, and, is, not'], c: 'c4' }], cap: 'Other: NUM, PUNCT, SYM, X. 17 UD tags in total.' },
        html: `
<table class="t">
  <tr><th>Class</th><th>Meaning</th><th>Universal Dependencies tags</th></tr>
  <tr><td><b>Open class</b> (content words)</td><td>New words are added all the time ("iPhone", "to google")</td><td>NOUN, VERB, ADJ, ADV, PROPN, INTJ</td></tr>
  <tr><td><b>Closed class</b> (function words)</td><td>Fixed, small set; rarely changes</td><td>DET (the, a), PRON (she), ADP (in, on), CCONJ/SCONJ (and, because), AUX (is, will), PART (not, to)</td></tr>
  <tr><td>Other</td><td></td><td>NUM, PUNCT, SYM, X</td></tr>
</table>
<p>UD has <b>17</b> tags in total.</p>
<div class="callout"><b>Test:</b> can you invent a new word of this type tomorrow? A new noun — yes ("a selfie"). A new preposition — no. So nouns are open, prepositions closed.</div>`,
        check: { q: 'Which is a closed-class category?', o: ['Determiners (the, a, this)', 'Nouns', 'Verbs', 'Adjectives'], why: 'Function words (DET, PRON, ADP, CONJ, AUX, PART) form closed classes.' },
      },
      {
        t: 'Ambiguity, the baseline, and clues a tagger uses',
        key: 'Most words have one tag, but the <b>common</b> words are ambiguous. Just picking each word\'s most frequent tag already gives <b>~92%</b>.',
        fig: [{ type: 'boxes', t: 'One word, five tags: "back"', rows: [{ cells: [['the back door', 'c2', 'ADJ'], ['on my back', 'c0', 'NOUN'], ['back the bill', 'c1', 'VERB'], ['call back', 'c3', 'PART'], ['came back', 'c5', 'ADV']] }] }, { type: 'bars', items: [['Most-frequent-tag baseline', 92, 'c2', '~92%'], ['HMM / CRF / BERT taggers', 97, 'c1', '~97%'], ['Humans', 97, 'c0', '~97%']], max: 100 }],
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
        key: 'NER finds <b>names of things</b> in text and says what type they are: person, organisation, location, geo-political entity…',
        fig: { type: 'boxes', rows: [{ cells: [['Jane Villanueva', 'c3', 'PER'], ['of', ''], ['United', 'c0', 'ORG'], [', a unit of', ''], ['United Airlines Holding', 'c0', 'ORG'], [', said the fare applies to the', ''], ['Chicago', 'c1', 'LOC'], ['route.', '']] }], cap: 'Hard parts: where a name starts and ends, and the type ("Washington" can be a person, a city or a state).' },
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
        key: '<b>B</b> = begins an entity, <b>I</b> = inside it, <b>O</b> = outside. With n entity types, BIO needs <b>2n + 1</b> tags.',
        fig: { type: 'anim', name: 'bio', t: 'From spans to BIO tags', cap: 'Invalid: O followed by I-PER, or B-PER followed by I-ORG.' },
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
<div class="callout warn"><b>Invalid sequences:</b> <code>O I-PER</code> (an I can't follow O) and <code>B-PER I-ORG</code> (the type can't switch inside a span).</div>
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
  /* ================================================================ */
  6: {
    goal: 'State the token-classification contract, label POS and NER (BIO) by hand, recognise chunking, slot filling, morphology and punctuation restoration as the same output pattern, align subwords with −100, score NER with exact spans, compute the HMM "can fish" paths and Viterbi, compute CRF scores, Z, probabilities and loss, and say which method models what.',
    time: '≈ 2 h (the lecture is 2 × 60 min)',
    videos: [
      ['BIO tagging and NER', 'named entity recognition BIO tagging explained'],
      ['HMM POS tagging', 'hidden markov model part of speech tagging example'],
      ['Viterbi step by step', 'Viterbi algorithm worked example HMM'],
      ['CRF intuition', 'conditional random field sequence labeling explained'],
      ['Hugging Face token classification', 'Hugging Face token classification tutorial word_ids -100'],
    ],
    steps: [
      {
        t: 'The contract: one label per token',
        key: 'Token classification gives <b>every token its own label</b>, then reads useful structure back from the labels. It is <b>not</b> one label per document.',
        fig: { type: 'boxes', head: ['', 'Ada', 'visits', 'Paris', '.'], rows: [
          { label: 'position', cells: [['1', ''], ['2', ''], ['3', ''], ['4', '']] },
          { label: 'POS', cells: [['PROPN', 'c0'], ['VERB', 'c1'], ['PROPN', 'c0'], ['PUNCT', '']] },
          { label: 'NER', cells: [['B-PER', 'c3'], ['O', ''], ['B-LOC', 'c4'], ['O', '']] },
        ], cap: 'Same four tokens, two annotation tasks, exactly four labels each.' },
        html: `
<p>Week 2 was <b>f(text) → one label</b>. This week the output is a <b>sequence</b>: if the tokenizer makes 4 tokens, the task makes exactly 4 labels.</p>
<ul>
  <li>Here tokens are <b>words plus punctuation</b>.</li>
  <li><b>POS</b> labels grammar: PROPN = proper noun, PUNCT = punctuation.</li>
  <li><b>NER</b> labels mentions: PER = person, LOC = location. <b>B</b> begins a span, <b>O</b> is outside.</li>
</ul>
<p>The lecture has two hours: <b>hour 1</b> = the problems (tasks, annotation, evaluation), <b>hour 2</b> = the methods (HMM, CRF, neural taggers).</p>
<div class="callout"><b>Remember:</b> NER can be <i>represented</i> as token labels but is <i>evaluated</i> as recovered spans. That matters in step 7.</div>`,
        check: { q: 'Does this week predict one label per document?', o: ['No, one aligned label per token', 'Yes, like sentiment analysis', 'Yes, one label per sentence', 'No, one label per word type'], why: 'The basic output is an aligned sequence of token labels.' },
      },
      {
        t: 'POS: a role in context',
        key: 'A word form can have several tags; <b>context picks the tag for this occurrence</b>. The frequent-tag baseline ignores context, which is exactly what it gets wrong.',
        fig: [{ type: 'boxes', rows: [{ cells: [['Book that flight.', 'c1', 'Book = VERB'], ['Hand me that book.', 'c0', 'book = NOUN'], ['They back the plan.', 'c1', 'back = VERB'], ['The back door is open.', 'c2', 'back = ADJ']] }] },
          { type: 'compare', cols: [{ t: 'Open classes', pts: ['accept new members', 'NOUN, VERB, ADJ, ADV', 'robot, stream, useful, slowly'], c: 'c0' }, { t: 'Closed classes', pts: ['relatively stable', 'DET, PRON, ADP, AUX, NUM', 'the, they, under, can, three'], c: 'c3' }, { t: 'Other', pts: ['PUNCT, SYM, X', 'comma, %, unclassified'], c: 'c5' }] }],
        html: `
<p><b>Part-of-speech tagging</b> assigns each word its grammatical category <b>in this sentence</b>. Capitalisation alone cannot decide: sentence-initial "Book" is still a verb.</p>
<p>An open class is not "unlimited labels": new <i>words</i> enter NOUN, but the <i>label</i> NOUN stays the same.</p>
<h3>What POS labels are for</h3>
<ul>
  <li><b>Text-to-speech</b>: "They ob<b>ject</b>" (verb) vs "an <b>ob</b>ject" (noun) are pronounced differently.</li>
  <li><b>Language analysis</b>: compare adjective or verb use across documents.</li>
  <li><b>Structured processing</b>: clues for parsers and extraction systems.</li>
</ul>
<p>POS is usually an <b>intermediate</b> representation, not the final answer to a user.</p>
<h3>A baseline and the clues it misses</h3>
<table class="t">
  <tr><th>Information</th><th>Example</th><th>Suggests</th></tr>
  <tr><td>Frequent tag for this word</td><td>book is often NOUN in training</td><td>NOUN, before seeing context</td></tr>
  <tr><td>Neighbouring words</td><td>Book that flight.</td><td>imperative VERB</td></tr>
  <tr><td>Word form</td><td>importantly ends in -ly</td><td>often ADV, <b>not a rule</b></td></tr>
  <tr><td>Capitalisation</td><td>Janet</td><td>possible proper noun</td></tr>
</table>
<p>The baseline counts each word–tag pair in the <b>training set</b> and picks the largest count. Clues are clues: "friendly" ends in -ly and is usually an adjective.</p>
<div class="callout warn">The lecturer explicitly says not to repeat the old "97% accuracy / human parity" claim as a general fact.</div>`,
        lab: { href: 'w4/pos.html', todo: [
          'Section 2: work through the faces of "back" and say which neighbouring word decides each one.',
          'Section 3: race the most-frequent-tag baseline and see where context fixes it.',
        ] },
        check: { q: 'Does the suffix -ly guarantee ADV?', o: ['No: "friendly" is usually an adjective', 'Yes, always', 'Yes, unless capitalised', 'No: -ly always marks a noun'], why: 'Spelling and context are clues, not guarantees.' },
      },
      {
        t: 'NER: boundaries and types',
        key: 'NER must decide <b>where</b> a mention starts and ends <b>and</b> what <b>type</b> it is. The same string can have different types in different contexts.',
        fig: [{ type: 'boxes', head: ['Ada', 'Lovelace', 'joined', 'Acme'], rows: [
          { cells: [['PERSON begins', 'c3'], ['PERSON ends', 'c3'], ['outside', ''], ['ORGANIZATION', 'c0']] },
          { cells: [['start', ''], ['continue', ''], ['none', ''], ['start + end', '']] },
        ] }, { type: 'boxes', rows: [{ cells: [['Washington lies on the river.', 'c4', 'LOCATION'], ['Washington announced a policy.', 'c0', 'GOVERNMENT / ORG'], ['Washington scored again.', 'c3', 'PERSON or TEAM: need context']] }] }],
        html: `
<p><b>Named-entity recognition</b> identifies text <b>spans</b> (a contiguous token range) and assigns semantic <b>types</b>. Which types exist is decided by the dataset's <b>annotation policy</b>.</p>
<ul>
  <li>"Ada Lovelace" is <b>one</b> mention, not two people. "Ada" alone is not the exact gold span.</li>
  <li>Detecting the span and classifying its type are two separate decisions.</li>
  <li>A gazetteer (list of city names) cannot solve "Washington": the string alone does not fix the type.</li>
</ul>
<p><b>What NER is for:</b> it supplies mentions to question answering, fact extraction and targeted sentiment. NER itself does not answer questions or compute sentiment.</p>
<div class="callout">Linking a mention to one real-world database entry (which Washington?) is a different task, <b>entity linking</b>.</div>`,
        check: { q: '"Ada Lovelace joined Acme." Is "Ada" alone the exact person mention?', o: ['No, the gold span includes Lovelace', 'Yes, the first name is enough', 'Yes, if typed PERSON', 'No, Ada is an ORGANIZATION'], why: 'Exact span = same boundaries and type. The gold PERSON span is Ada Lovelace.' },
      },
      {
        t: 'BIO turns spans into token labels',
        key: '<b>B</b> begins a span, <b>I</b> continues the <b>same type</b>, <b>O</b> is outside. Every new entity starts with B, even right next to another one. n types → <b>2n + 1</b> labels.',
        fig: { type: 'anim', name: 'bio', t: 'From spans to BIO tags', cap: 'Strict IOB2: I-X needs a B-X or I-X right before it.' },
        html: `
<table class="t">
  <tr><th>Token</th><td>Jane</td><td>Villanueva</td><td>of</td><td>United</td></tr>
  <tr><th>BIO</th><td>B-PER</td><td>I-PER</td><td>O</td><td>B-ORG</td></tr>
  <tr><th>Span</th><td>Jane Villanueva</td><td>same person</td><td>none</td><td>United</td></tr>
</table>
<p>"United" is one word and still gets <b>B-ORG</b>: a one-word span starts and ends at the same token.</p>
<h3>Structural rules</h3>
<table class="t">
  <tr><th>Sequence</th><th>Valid?</th><th>Why</th></tr>
  <tr><td><code>B-PER I-PER O</code></td><td>yes</td><td>a person span, then outside</td></tr>
  <tr><td><code>O I-PER</code></td><td><b>no</b></td><td>no PER span to continue</td></tr>
  <tr><td><code>B-ORG I-PER</code></td><td><b>no</b></td><td>the continuation changes type</td></tr>
  <tr><td><code>B-PER B-PER</code></td><td>yes</td><td>two adjacent person spans</td></tr>
</table>
<p><b>Counting:</b> n B labels + n I labels + O = <b>2n + 1</b>. With PER, ORG, LOC: B/I-PER, B/I-ORG, B/I-LOC, O = <b>7</b>.</p>
<div class="callout warn">If every token is labeled independently, the output <b>can break these rules</b>. Fixing that is one reason for HMMs and CRFs in hour 2.</div>`,
        lab: { href: 'w4/bio.html', todo: [
          'Section 3: try <code>B-PER B-PER O</code> (valid) and <code>O I-ORG</code> (invalid), and read the reason.',
          'Section 2: set n = 3 and check that BIO has 7 labels.',
        ] },
        check: { q: 'Is B-PER B-PER invalid because the type repeats?', o: ['No, it is two neighbouring person mentions', 'Yes, PER cannot repeat', 'Yes, the second must be I-PER', 'No, but only at sentence end'], why: 'B always starts a new span, so two B-PER in a row = two adjacent people.' },
      },
      {
        t: 'One output pattern, many tasks',
        key: 'POS, NER, chunking, slot filling, morphology and punctuation restoration all output one label per token. <b>The task is defined by what the label means</b>, not by the model.',
        fig: { type: 'boxes', head: ['Task', 'Label describes', 'Example output'], rows: [
          { cells: [['POS', 'c0'], ['grammatical role', ''], ['NOUN, VERB, ADJ', '']] },
          { cells: [['NER', 'c3'], ['mention type + boundary', ''], ['B-PER, I-PER, O', '']] },
          { cells: [['Chunking', 'c1'], ['shallow phrase boundary', ''], ['B-NP, I-NP, B-VP', '']] },
          { cells: [['Slot filling', 'c2'], ['a field in a request', ''], ['departure-city', '']] },
          { cells: [['Morphological tagging', 'c5'], ['grammatical features', ''], ['plural, past, ablative', '']] },
          { cells: [['Punctuation restoration', 'c4'], ['boundary after the word', ''], ['none, comma, period', '']] },
        ] },
        html: `
<h3>Chunking: phrases without a full parse</h3>
<table class="t">
  <tr><th>Token</th><td>The</td><td>small</td><td>cat</td><td>sleeps</td></tr>
  <tr><th>Chunk</th><td>B-NP</td><td>I-NP</td><td>I-NP</td><td>B-VP</td></tr>
</table>
<p>NP = noun phrase, VP = verb phrase. I-NP does <b>not</b> mean "noun": the adjective "small" is inside the NP. Chunking finds shallow, non-overlapping groups; it does not build a syntax tree.</p>
<h3>Slots and punctuation</h3>
<ul>
  <li><b>Slot filling</b>: "fly from <b>Boston</b> to <b>Paris</b>" → Boston = departure, Paris = arrival. A plain LOCATION tag could not tell them apart; "from" and "to" decide.</li>
  <li><b>Punctuation restoration</b>: "hello Ada how are you" → hello: comma, Ada: comma, you: ?. Each word is labeled with what to insert <b>after</b> it (NONE = nothing).</li>
</ul>
<h3>Language and domain change the labels</h3>
<ul>
  <li>Turkish <b>evlerden</b> = ev + ler + den (house + plural + from) → NOUN; Number=Plur; Case=Abl. One word, several attributes.</li>
  <li>Biomedical NER: <b>aspirin</b> → CHEMICAL, <b>heart failure</b> → DISEASE span. A medical entity need not be a proper name.</li>
</ul>
<h3>Hugging Face: check the task contract</h3>
<p>The Hub has resources for each: the Transformers token-classification guide (NER), the <b>ATIS</b> dataset (slots; it also has sentence-level <i>intents</i>, a different target), the <b>fullstop</b> punctuation model, and <b>BC5CDR</b> (chemicals and diseases). A task tag tells you the interface; <b>read the card</b> to learn what the labels mean.</p>
<div class="callout warn">A shared interface does not make heads interchangeable: a pretrained NER head will not output chunk labels, and a punctuation checkpoint will not return person names.</div>`,
        check: { q: 'Why is punctuation restoration still token classification?', o: ['Each word gets a label for its following boundary', 'It labels the whole text once', 'It generates brand-new words', 'It only labels existing commas'], why: 'The label says what to insert after that word.' },
      },
      {
        t: 'Words and subwords must stay aligned',
        key: 'A transformer splits words into subwords. With the <b>first-subword policy</b> the first piece gets the word\'s label and every other piece and special token gets <b>−100</b> (ignored in the loss).',
        fig: { type: 'boxes', head: ['[CLS]', 'Ada', 'Wash', '##ington', '[SEP]'], rows: [
          { label: 'word index', cells: [['none', ''], ['0', ''], ['1', ''], ['1', ''], ['none', '']] },
          { label: 'training label', cells: [['−100', ''], ['B-PER', 'c3'], ['B-PER', 'c3'], ['−100', ''], ['−100', '']] },
        ], cap: 'Two separate people: Ada; Washington. Word indices are zero-based, as in word_ids().' },
        html: `
<p>Follow each model token back to its original word (<code>word_ids()</code>), then:</p>
<ol>
  <li>first piece of a word → the word's label;</li>
  <li>later pieces (##ington) and special tokens ([CLS], [SEP]) → <b>−100</b>.</li>
</ol>
<p>Ada and Washington are annotated as <b>two adjacent people</b>, so both get <b>B-PER</b>. That is intentional.</p>
<div class="callout"><b>−100 vs O:</b> −100 is not a category the model learns; it removes the position from the loss. <b>O</b> is a real label ("outside any entity") that the model must predict.</div>
<p>Other valid policies label all subwords (converting B to I for later pieces), but training and evaluation must use <b>one consistent</b> policy.</p>
<h3>Failures before the model</h3>
<table class="t">
  <tr><th>Failure</th><th>Consequence</th><th>Check</th></tr>
  <tr><td>Wrong token-to-label alignment</td><td>a correct word gets the wrong target</td><td>inspect paired tokens and labels</td></tr>
  <tr><td>Same document in train and test</td><td>over-optimistic score</td><td>split by independent documents</td></tr>
  <tr><td>Wrong label map</td><td>class ID decoded as the wrong type</td><td>save <code>id2label</code> with the model</td></tr>
  <tr><td>Truncated entity</td><td>boundary cannot be reconstructed</td><td>plan windows and overlap</td></tr>
</table>
<p>No classifier can repair a label map that swaps PER and ORG. Evaluate the whole pipeline: tokenization → labels → decoded spans → task metric.</p>`,
        lab: { href: 'w6/spans.html', todo: [
          'Section 5: read the word index and training label of each model token.',
          'Switch the policy to "all subwords" and see which labels change.',
        ] },
        check: { q: 'Is −100 an extra entity category learned by the model?', o: ['No, it removes the position from the loss', 'Yes, it marks subword pieces', 'Yes, it is the same as O', 'No, it marks a missing word'], why: 'O is a real modeled category; −100 is the ignore index.' },
      },
      {
        t: 'Evaluate spans, not just tokens',
        key: 'Token accuracy can look great while <b>no entity is found</b>. NER is scored by <b>exact span match</b>: same boundaries <b>and</b> same type. F1 = 2TP / (2TP + FP + FN).',
        fig: [{ type: 'bars', t: 'Predict O everywhere on 90 O + 10 entity tokens', items: [['Token accuracy', 90, 'c0', '90 / 100 = 90%'], ['Entity recall', 0, 'c4', '0 spans found = 0%']], max: 100 },
          { type: 'boxes', head: ['', 'calculation', 'result'], rows: [
            { label: 'TP', cells: [['exact matches', ''], ['2', 'c1']] },
            { label: 'FP', cells: [['4 predictions − 2', ''], ['2', 'c4']] },
            { label: 'FN', cells: [['3 gold − 2', ''], ['1', 'c4']] },
            { label: 'P / R', cells: [['2/4 ; 2/3', ''], ['0.50 ; 0.667', '']] },
            { label: 'F1', cells: [['4 / 7', ''], ['0.571', 'c0']] },
          ] }],
        html: `
<p><b>Gold</b> = the reference annotation. <b>Accuracy</b> = correct token labels ÷ evaluated tokens. <b>Entity recall</b> = exact gold spans found ÷ all gold spans. They have <b>different denominators</b>.</p>
<p>In the all-O example precision has a zero denominator (no predicted spans), so the evaluator must <b>state its convention</b>.</p>
<h3>Exact span match</h3>
<p>Supplied counts: 3 gold spans, 4 predicted, 2 exact matches.</p>
<ul>
  <li>TP = 2, FP = 4 − 2 = 2, FN = 3 − 2 = 1</li>
  <li>Precision = TP/(TP+FP) = 2/4 = <b>0.50</b>; Recall = TP/(TP+FN) = 2/3 = <b>0.667</b></li>
  <li>F1 = 2PR/(P+R) = 2TP/(2TP+FP+FN) = 4/7 ≈ <b>0.571</b> (micro totals, not an average of class F1s)</li>
</ul>
<p>A partial name or a correct boundary with the wrong type <b>fails</b>: it is one FP and leaves the gold span as one FN.</p>
<h3>Practice (slides 20–21)</h3>
<p>Tokens: Ada | visited | New | York | . — gold: Ada (PER), New York (LOC). Prediction: Ada (PER), York (LOC).</p>
<ul>
  <li>BIO: <code>B-PER O B-LOC I-LOC O</code></li>
  <li>Only Ada matches: TP = 1, FP = 1 (York), FN = 1 (New York) → F1 = 2/(2+1+1) = <b>0.50</b>.</li>
</ul>
<p>"York" has the right type but the wrong boundary. That is a <b>boundary mistake</b>.</p>`,
        lab: { href: 'w6/spans.html', todo: [
          'Section 1: label the five tokens yourself and press <b>Check</b>.',
          'Section 2: load the "York only" prediction and confirm TP 1, FP 1, FN 1, F1 0.50.',
          'Load "all O", then use section 3 to compare token accuracy with entity recall.',
        ] },
        check: { q: '3 gold spans, 4 predictions, 2 exact matches. F1 = ?', o: ['4/7 ≈ 0.571', '2/4 = 0.50', '2/3 ≈ 0.667', '6/7 ≈ 0.857'], why: 'F1 = 2TP/(2TP+FP+FN) = 4/(4+2+1).' },
      },
      {
        t: 'HMM: hidden tags, visible words',
        key: 'An HMM says: a hidden <b>state sequence</b> (the tags) generates the <b>observations</b> (the words). Its score is a product of three ingredients: <b>start × emission × transition × emission…</b>',
        fig: { type: 'graph', w: 640, h: 230, nodes: { y1: [170, 60, 'hidden y₁ (tag)', 'c3'], y2: [470, 60, 'hidden y₂ (tag)', 'c3'], x1: [170, 180, 'observed x₁ (word)', 'c0'], x2: [470, 180, 'observed x₂ (word)', 'c0'] }, edges: [['y1', 'y2', 'a(y₁,y₂)'], ['y1', 'x1', 'b(y₁,x₁)'], ['y2', 'x2', 'b(y₂,x₂)']] },
        html: `
<p>Why it exists: we want the labels, but only the words are visible. "Hidden" does not mean unknowable: the observations give evidence about the states.</p>
<ul>
  <li><b>Horizontal arrow</b>: the next tag depends on the previous tag (first-order Markov).</li>
  <li><b>Vertical arrow</b>: each word is generated from its own tag.</li>
</ul>
<p>For two positions:</p>
<div class="callout"><b>P(X, Y) = π(y₁) × b(y₁, x₁) × a(y₁, y₂) × b(y₂, x₂)</b></div>
<ul>
  <li><b>π(y)</b> start probability, <b>a(y, z)</b> = P(next tag z | tag y), <b>b(y, x)</b> = P(word x | tag y).</li>
  <li>Every start distribution and every row of a and b <b>sums to 1</b>. Length is fixed, so no end probability.</li>
</ul>
<h3>The "can fish" model (supplied numbers)</h3>
<table class="t">
  <tr><th>from</th><th>→ N</th><th>→ V</th><th></th><th>P(can | ·)</th><th>P(fish | ·)</th></tr>
  <tr><td>START π</td><td>0.6</td><td>0.4</td><td></td><td></td><td></td></tr>
  <tr><td>N</td><td>0.3</td><td>0.7</td><td>N</td><td>0.4</td><td>0.6</td></tr>
  <tr><td>V</td><td>0.8</td><td>0.2</td><td>V</td><td>0.7</td><td>0.3</td></tr>
</table>
<p>N = NOUN, V = lexical VERB ("can" = preserve food; the modal AUX reading is left out of this tiny tag set).</p>
<div class="callout warn"><b>Emission direction:</b> b(N, can) = P(can | N), <b>not</b> P(N | can). At "can": N weight 0.6 × 0.4 = 0.24, V weight 0.4 × 0.7 = 0.28. They sum to 0.52, not 1, because they are joint probabilities with the word.</div>`,
        check: { q: 'What does b(N, can) mean?', o: ['P(can | N)', 'P(N | can)', 'P(N | previous N)', 'P(can and fish)'], why: 'Emissions connect a tag to an observed word: P(word | tag).' },
      },
      {
        t: 'Four paths, and Viterbi',
        key: 'List all paths and multiply: <b>VN = 0.1344</b> wins. Viterbi gets the same answer by keeping <b>one best partial path per ending tag</b> and backtracing.',
        fig: { type: 'anim', name: 'viterbi', t: 'Viterbi on "can fish"', cap: 'Green = kept predecessor. Grey = dropped.' },
        html: `
<table class="t">
  <tr><th>Path</th><th>start × emission × transition × emission</th><th>P(words, path)</th></tr>
  <tr><td>NN</td><td>0.6 × 0.4 × 0.3 × 0.6</td><td>0.0432</td></tr>
  <tr><td>NV</td><td>0.6 × 0.4 × 0.7 × 0.3</td><td>0.0504</td></tr>
  <tr><td><b>VN</b></td><td>0.4 × 0.7 × 0.8 × 0.6</td><td><b>0.1344</b> ← largest</td></tr>
  <tr><td>VV</td><td>0.4 × 0.7 × 0.2 × 0.3</td><td>0.0168</td></tr>
</table>
<p>P(words) = 0.0432 + 0.0504 + 0.1344 + 0.0168 = <b>0.2448</b>. Dividing every row by the same 0.2448 cannot change the winner.</p>
<div class="callout"><b>Joint vs posterior:</b> 0.1344 is the joint P(words, VN). The posterior P(VN | words) = 0.1344 / 0.2448 ≈ <b>0.549</b>.</div>
<h3>Viterbi table</h3>
<table class="t">
  <tr><th>Ending tag at "fish"</th><th>Candidates before emission</th><th>Best</th></tr>
  <tr><td>N</td><td>max(0.24×0.3, 0.28×0.8) × 0.6</td><td>0.1344, from V</td></tr>
  <tr><td>V</td><td>max(0.24×0.7, 0.28×0.2) × 0.3</td><td>0.0504, from N</td></tr>
</table>
<p>Final winner N has predecessor V → backtrace <b>V → N</b>. With T words and K tags Viterbi costs <b>O(TK²)</b> instead of checking Kᵀ paths.</p>
<p><b>Why keep both cells after "can"?</b> V is better there (0.28 &gt; 0.24), yet the best path ending in V at "fish" comes from <b>N</b> (0.168 &gt; 0.056). Dropping N early would have made that cell wrong. Future transitions differ, so Viterbi keeps one best partial path for <b>each</b> ending tag.</p>`,
        lab: { href: 'w6/hmm.html', todo: [
          'Section 1: check the four path products and the sum 0.2448.',
          'Section 2: step through the trellis and read each backpointer.',
          'Change the V row of the transitions to 0.2 / 0.8 (it must still sum to 1) and see which path wins now.',
        ] },
        check: { q: 'Is 0.1344 the posterior probability of VN?', o: ['No, it is the joint; divide by 0.2448', 'Yes, it is P(VN | words)', 'No, it is the transition V → N', 'Yes, joint and posterior are equal'], why: 'Lecture check question: 0.1344 is P(words, VN); the posterior is ≈ 0.549.' },
      },
      {
        t: 'Training an HMM, and its limit',
        key: 'With tagged data an HMM learns by <b>counting and normalizing</b>. Its weakness: the emission sees only <b>one word given one tag</b>, so rich overlapping clues are hard to add.',
        fig: { type: 'flow', items: [['', 'Count', 'N→N 3 times, N→V 7 times', 'c0'], ['', 'Normalize', 'total 10: P(N|N) = 0.3, P(V|N) = 0.7', 'c1'], ['', 'Decode', 'use the tables in Viterbi', 'c3']] },
        html: `
<p><b>Training</b> estimates parameters; <b>decoding</b> uses them to label new words.</p>
<ul>
  <li>Transitions: count tag pairs, divide by how often the first tag occurs.</li>
  <li>Starts: sentence-start counts. Emissions: count(word with tag) ÷ count(tag).</li>
  <li>A <b>zero count</b> gives probability 0 and can zero a whole path. Unseen words and transitions need <b>smoothing</b> or an unknown-word model.</li>
</ul>
<h3>Why look beyond the basic HMM?</h3>
<table class="t">
  <tr><th>Useful structure</th><th>Missing evidence</th></tr>
  <tr><td>Transitions model neighbouring labels; Viterbi gives the best complete sequence. States can be POS tags <b>or</b> BIO entity labels.</td><td>The emission sees one word given one tag. Suffixes, capitalisation and surrounding words are <b>overlapping</b> clues that are awkward to fit into P(word | tag).</td></tr>
</table>
<p>Goal: <b>rich input evidence and coherent output sequences in one conditional model</b>. That is the CRF.</p>`,
        lab: { href: 'w6/hmm.html', todo: ['Section 3: type transition counts and watch them become a probability row.', 'Set one count to 0 and switch add-one smoothing on and off.'] },
        check: { q: 'N→N occurs 3 times and N→V 7 times. P(V | N) = ?', o: ['0.7', '0.3', '7', '0.07'], why: 'Count and normalize: 7 / (3 + 7).' },
      },
      {
        t: 'CRF: score whole sequences, then normalize',
        key: 'A CRF gives each complete label sequence a <b>real-valued score</b> S(X,Y), turns it into a weight with exp, and divides by <b>Z(X)</b>, the sum over all sequences. <b>Max</b> picks the best path; <b>sum</b> builds Z.',
        fig: { type: 'anim', name: 'crf', t: 'CRF on "can fish"', cap: 'Unary scores alone pick NV; the transition score a(V,N) = ln 8 makes VN win.' },
        html: `
<p>Why it exists: combine rich, overlapping clues (word, suffix, capitalisation, context) <b>and</b> label compatibility. Unlike an HMM it does not model how the words are generated: the input is fixed, and only label sequences compete.</p>
<div class="callout"><b>P(Y | X) = exp(S(X, Y)) / Z(X)</b>, &nbsp; <b>Z(X) = Σ over all Y′ of exp(S(X, Y′))</b></div>
<ul>
  <li>Scores are any real numbers (a transition score of 2 is fine). They are <b>not probabilities</b>.</li>
  <li>Normalize <b>complete paths</b>, not each transition row.</li>
  <li>Z is the same for every path, so the winner is simply the path with the highest S.</li>
</ul>
<h3>"can fish" with supplied scores</h3>
<p>Unary scores: u₁(N) = ln 2, u₁(V) = 0; u₂(N) = 0, u₂(V) = ln 2. Transition a(V,N) = ln 8, all others 0. S = u₁ + u₂ + a.</p>
<table class="t">
  <tr><th>Path</th><th>Score</th><th>exp(S)</th><th>P = weight / 16</th></tr>
  <tr><td>NN</td><td>ln 2 + 0 + 0 = ln 2</td><td>2</td><td>0.125</td></tr>
  <tr><td>NV</td><td>ln 2 + ln 2 + 0 = ln 4</td><td>4</td><td>0.250</td></tr>
  <tr><td><b>VN</b></td><td>0 + 0 + ln 8 = ln 8</td><td>8</td><td><b>0.500</b></td></tr>
  <tr><td>VV</td><td>0 + ln 2 + 0 = ln 2</td><td>2</td><td>0.125</td></tr>
</table>
<p>Z = 2 + 4 + 8 + 2 = <b>16</b>. If VN is gold: loss = −ln 0.5 = ln Z − gold score = ln 16 − ln 8 = <b>ln 2 ≈ 0.6931</b>.</p>
<h3>CRF Viterbi adds scores</h3>
<table class="t">
  <tr><th>Ending at "fish"</th><th>Best score</th><th>From</th></tr>
  <tr><td>N</td><td>max(ln 2 + 0, 0 + ln 8) + 0 = ln 8</td><td>V</td></tr>
  <tr><td>V</td><td>max(ln 2 + 0, 0 + 0) + ln 2 = ln 4</td><td>N</td></tr>
</table>
<p>HMM Viterbi multiplies probabilities; CRF Viterbi adds real scores. Training: score gold and all alternatives, loss = ln Z − gold score, adjust weights to raise the gold probability, check on validation data. The features can be hand-designed or come from a neural encoder.</p>
<div class="callout warn">P(VN) = 0.5 does <b>not</b> mean the model is 50% accurate. It is a model probability for one path under sample scores.</div>`,
        lab: { href: 'w6/crf.html', todo: [
          'Section 1: set a(V,N) to 0 and see NV win; set it back to ln 8.',
          'Check that Z = 16, P(VN) = 0.5 and the loss is 0.6931.',
          'Section 2: run the score-adding Viterbi and read the backpointers.',
        ] },
        check: { q: 'Which operation finds the best CRF path, and which builds Z?', o: ['Max for the path, sum for Z', 'Sum for the path, max for Z', 'Max for both', 'Sum for both'], why: 'Lecture check question. You do not need Z to decode.' },
      },
      {
        t: 'BIO constraints, neural heads, and choosing a method',
        key: 'A hard constraint sets illegal transitions (O → I-PER, START → I-PER) to <b>−∞</b>. A transformer supplies token scores zᵢ = W hᵢ + b; softmax decides each token alone, a CRF decodes them jointly.',
        fig: { type: 'compare', cols: [
          { t: 'HMM', pts: ['models joint words + label path', 'local emissions P(word | tag)', 'Viterbi on probabilities'], c: 'c3' },
          { t: 'Contextual softmax', pts: ['each label given the full input', 'no label-pair scores', 'argmax at each position'], c: 'c0' },
          { t: 'Linear-chain CRF', pts: ['whole label sequence given input', 'unary + adjacent-label scores', 'Viterbi on sequence scores'], c: 'c1' }] },
        html: `
<h3>Constraints for NER</h3>
<table class="t">
  <tr><th>Adjacent labels</th><th>IOB2</th><th>Reason</th></tr>
  <tr><td>O → I-PER</td><td><b>forbidden</b></td><td>no person span has started</td></tr>
  <tr><td>B-PER → I-PER</td><td>allowed</td><td>continue the person span</td></tr>
  <tr><td>I-PER → B-ORG</td><td>allowed</td><td>start a new organisation span</td></tr>
  <tr><td>START → I-PER</td><td><b>forbidden</b></td><td>a sequence cannot start inside a span</td></tr>
</table>
<p>exp(−∞) = 0, so a forbidden path gets probability 0. A <b>finite learned</b> score only discourages it: training a CRF does <b>not</b> guarantee legal BIO.</p>
<h3>Neural token classifiers</h3>
<ol>
  <li><b>Input</b>: words → subword tokens and positions; an attention mask separates real input from padding.</li>
  <li><b>Encoder + head</b>: contextual vector hᵢ → scores zᵢ = W hᵢ + b for every label.</li>
  <li><b>Decoder</b>: per-token softmax, or a CRF using these scores plus label transitions.</li>
</ol>
<p><b>Shapes:</b> B = 2 sequences, L = 5 positions, K = 3 labels (O, B-PER, I-PER) → logits (2, 5, 3) = <b>30</b> scores. At one position (ln 1, ln 2, ln 1) → exp (1, 2, 1) → ÷ 4 → (0.25, <b>0.50</b>, 0.25) → B-PER. Then align predictions back to words.</p>
<div class="callout warn">Reading the whole sentence (the encoder) is not the same as decoding labels jointly (a CRF). A contextual encoder alone does <b>not</b> guarantee valid BIO.</div>
<h3>Workflow</h3>
<p>Define labels and token unit → align and mark −100 → train (HMM counts or neural/CRF loss) → decode with the chosen constraints → return to word/span units → report POS accuracy or exact span metrics on held-out data. Start with the simplest suitable baseline, then test whether structured decoding fixes the errors you actually see.</p>`,
        lab: { href: 'w6/crf.html', todo: ['Section 3: switch the hard BIO constraint on and off and watch the illegal path disappear.', 'Section 4: change the three logits and watch the softmax.'] },
        check: { q: 'Does a contextual encoder guarantee valid BIO labels?', o: ['No, input context and output constraints differ', 'Yes, attention sees all labels', 'Yes, softmax enforces BIO', 'No, encoders ignore context'], why: 'An explicit constraint or structured decoder is a separate decision.' },
      },
    ],
  },
};
