/* Mock midterm on the lecturer's topic list (no formulas to write: concepts and why). Instant feedback. */
(() => {
const items = [
  { week: 1, topic: 'Learning types', q: 'Customer segmentation in CRM is an example of…',
    options: ['Classification into known classes', 'Regression', 'Clustering (unsupervised)', 'Reinforcement learning'], answer: 2,
    explain: 'Week 1, slide 15: clustering groups similar customers without any desired output.' },
  { week: 1, topic: 'Learning types', q: 'A robot in a maze gets no correct answer per move, only a delayed reward at the end. Which kind of learning?',
    options: ['Supervised learning', 'Unsupervised learning', 'Learning association rules', 'Reinforcement learning'], answer: 3,
    explain: 'Week 1, slide 16: no supervised output but delayed reward; the robot learns a policy.' },
  { week: 4, topic: 'Parametric', q: 'By slide 2 of the clustering deck, a nonparametric method…',
    options: ['Has no predefined mapping function', 'Has no parameters of any kind to learn', 'Works only with labelled training examples', 'Always grows a decision tree from the data'], answer: 0,
    explain: 'Parametric: learning using a predefined mapping function/assumptions. Nonparametric: without them.' },
  { week: 4, topic: 'Parametric', q: 'Linear regression fixes the form y = wx + w₀ before learning and only learns w and w₀. By the slide\'s definition it is…',
    options: ['Nonparametric', 'Parametric', 'Unsupervised', 'Reinforcement learning'], answer: 1,
    explain: 'The mapping function is predefined; learning fills in its parameters.' },
  { week: 3, topic: 'Selection vs extraction', q: 'From five student features we keep GPA, Attendance and Study Hours. This is…',
    options: ['Feature extraction', 'PCA', 'Feature selection', 'Clustering'], answer: 2,
    explain: 'Week 3, slide 6: the kept features are still the original columns. Selection selects.' },
  { week: 3, topic: 'Selection vs extraction', q: 'z₁ = 0.6·Height + 0.8·Weight replaces the two features. This is…',
    options: ['Feature selection', 'Feature extraction', 'Subset selection', 'A new class label for x'], answer: 1,
    explain: 'Week 3, slide 7: a new feature built from the original ones. Extraction transforms.' },
  { week: 3, topic: 'Selection vs extraction', q: 'Which method keeps the original features and is therefore usually easier to interpret?',
    options: ['Feature selection', 'Feature extraction', 'PCA', 'LDA'], answer: 0,
    explain: 'Week 3, slide 8: selection keeps original features; extraction creates new ones that are usually harder to interpret.' },
  { week: 3, topic: 'PCA', q: 'What does PCA treat as the "information" it tries to keep?',
    options: ['The class labels of every example', 'The number of original features', 'The smallest values in each column', 'Variance: how much the data vary'], answer: 3,
    explain: 'Week 3, slide 10: directions with larger variance are taken to hold more information. Find w that maximizes Var(z).' },
  { week: 3, topic: 'PCA', q: 'What does PCA do to the data (slide 11)?',
    options: ['Centres it and rotates the axes', 'Deletes the least useful columns', 'Groups the instances into clusters', 'Gives every example a label'], answer: 0,
    explain: 'It centres the data at the origin and rotates the axes onto the directions of largest variance.' },
  { week: 5, topic: 'Entropy', q: 'Which node has the highest entropy?',
    options: ['4 yes, 0 no', '6 yes, 2 no', '9 yes, 5 no', '3 yes, 3 no'], answer: 3,
    explain: 'A fifty-fifty node is the most impure: entropy 1 for two classes, the top of slide 4\'s curve. A pure node has entropy 0.' },
  { week: 5, topic: 'Entropy', q: 'ID3 chooses the attribute whose split gives…',
    options: ['The highest weighted entropy', 'The lowest weighted entropy', 'The most branches', 'The largest parent entropy'], answer: 1,
    explain: 'Week 5, slide 11: Outlook 0.694 is the lowest, so Outlook is the first question. Lower entropy = purer children.' },
  { week: 6, topic: 'Bias', q: 'Why does a perceptron need the bias w₀?',
    options: ['It shifts the boundary off the origin', 'It makes training converge much faster', 'It keeps every output positive', 'It stores the learning rate'], answer: 0,
    explain: 'Without w₀ the line w₁x₁ + w₂x₂ = 0 always passes through (0, 0). The bias moves it.' },
  { week: 6, topic: 'Bias', q: 'AND (slide 11) and OR (slide 12) both use w₁ = w₂ = +1. What makes them different?',
    options: ['The activation function', 'The number of hidden units', 'The bias: −1.5 vs −0.5', 'The learning rate'], answer: 2,
    explain: 'Only the bias changes. It shifts the line from x₁ + x₂ = 1.5 down to x₁ + x₂ = 0.5.' },
  { week: 6, topic: 'Transpose', q: 'x is a column of 5 features. What is xᵀ?',
    options: ['A 5 × 5 table of products', 'One number, the sum of entries', 'A column of the 5 squared entries', 'A row with the same 5 entries'], answer: 3,
    explain: 'Transpose turns columns into rows. That is why wᵀx (row times column) is one number.' },
  { week: 6, topic: 'Activation functions', q: 'A model must answer spam or not spam. Which output fits?',
    options: ['Softmax over ten outputs', 'One sigmoid output', 'A ReLU output', 'A linear output'], answer: 1,
    explain: 'Two classes: one sigmoid output in (0, 1), read as the probability of spam (slide 10).' },
  { week: 6, topic: 'Activation functions', q: 'When does slide 10 use softmax outputs?',
    options: ['When there are K > 2 classes', 'When the output is a car price', 'When there are no labels at all', 'When the data are not scaled'], answer: 0,
    explain: 'K > 2: softmax gives K probabilities that sum to 1; choose the class with the largest (slide 7).' },
  { week: 6, topic: 'Activation functions', q: 'Are activation functions used before training or during training?',
    options: ['Before training, to scale the data', 'Only after training, on test data', 'Only inside the loss function', 'In every forward pass'], answer: 3,
    explain: 'They are part of the network: the forward pass applies them (slides 26 and 27) and backpropagation uses their derivative (slide 29).' },
  { week: 6, topic: 'Activation functions', q: 'In slide 15\'s XOR network, what if the hidden units had no activation and output their plain sums?',
    options: ['It still solves XOR, just more slowly', 'It reduces to one line and fails', 'It trains faster and exactly', 'It turns into a softmax'], answer: 1,
    explain: 'A sum of weighted sums is again one weighted sum: one line. Slide 13 shows one line cannot do XOR.' },
  { week: 6, topic: 'Learning rate', q: 'What does the learning rate η control?',
    options: ['The number of hidden units used', 'The number of classes', 'The size of each weight update', 'The amount of training data'], answer: 2,
    explain: 'w ← w − η·∂E/∂w: η scales the step. Slide 20: 0.8 − 0.1 × 1.05 = 0.695.' },
  { week: 6, topic: 'Learning rate', q: 'The learning rate is set far too large. What can happen?',
    options: ['The weights never change at all', 'Training reaches the minimum in one step', 'Steps overshoot and E grows', 'The model gains a hidden layer'], answer: 2,
    explain: 'Too big a step overshoots. On slide 17\'s example η = 1.0 sends w from 0.8 to −0.25 to 1.06, further away every time.' },
];

const written = [
  { week: 1, topic: 'Learning types', q: 'Name the kinds of learning in the course and give one slide example for each.',
    hint: 'İpucu: öğretmen var mı, sadece girdi mi var, yoksa sadece ödül mü?',
    a: ['Supervised: input + correct output. Classification (credit scoring: low/high risk), regression (used-car price).', 'Unsupervised: input only. Clustering (customer segmentation).', 'Reinforcement: delayed reward, learn a policy (robot in a maze, game playing).', 'Association: P(Y | X), basket analysis (P(mouse | computer) = 0.7).'] },
  { week: 4, topic: 'Parametric', q: 'Explain parametric and nonparametric learning with one example each.',
    hint: 'İpucu: cevabın biçimi öğrenmeden önce belli mi?',
    a: ['Parametric: predefined mapping function / assumptions; learning finds its parameters.', 'Example: linear regression y = wx + w₀, learn w and w₀ (perceptron weights too).', 'Nonparametric: no predefined mapping function; structure comes from the data.', 'Example (applying the definition): decision tree, questions and depth learned from data.'] },
  { week: 3, topic: 'Selection vs extraction', q: 'Compare feature selection and feature extraction.',
    hint: 'İpucu: selection seçer, extraction dönüştürür.',
    a: ['Both reduce d features to k < d, keep useful information.', 'Selection: choose a subset of the original features (forward / backward search). Easier to interpret.', 'Extraction: build new features z from x (PCA, LDA, FA). Harder to interpret.'] },
  { week: 3, topic: 'PCA', q: 'What does PCA do, and what does "preserving information" mean in PCA?',
    hint: 'İpucu: hangi yönde veri en çok yayılıyor?',
    a: ['Represents the data with fewer dimensions.', 'Information = variance: keep the directions where the data vary most.', 'Centres the data, rotates the axes; z = wᵀx with w maximizing Var(z).', 'Uses only x, not the labels (slide 12 code); LDA uses known classes (slide 13).'] },
  { week: 5, topic: 'Entropy', q: 'What is entropy in a decision tree? Which node is best and which is worst?',
    hint: 'İpucu: fifty-fifty en kötüsü.',
    a: ['Entropy = impurity of a node.', 'Pure node (one class only): entropy 0, best.', 'Fifty-fifty node: entropy 1 (two classes), worst.', 'Split on the attribute with the lowest weighted child entropy (Outlook 0.694 < 0.940).'] },
  { week: 6, topic: 'Bias', q: 'Why do we need a bias in neural networks? What does bias shifting mean?',
    hint: 'İpucu: w₀ olmadan çizgi nereden geçmek zorunda?',
    a: ['Bias = weight w₀ on input x₀ = 1.', 'Without it the line / boundary must pass through the origin.', 'Bias shifts the line without turning it; the weights set its direction.', 'AND vs OR: same weights, w₀ = −1.5 vs −0.5.'] },
  { week: 6, topic: 'Activation functions', q: 'Name common activation functions. Why do we use sigmoid and softmax, and when are they applied?',
    hint: 'İpucu: iki sınıf mı, çok sınıf mı? Eğitimden önce mi, eğitim sırasında mı?',
    a: ['Sigmoid (0, 1), tanh (−1, 1), ReLU max(0, a), softmax.', 'Sigmoid: binary classification, output = probability of class 1.', 'Softmax: multiclass, K probabilities that sum to 1, choose the largest.', 'Applied in every forward pass (training and prediction); backprop uses the derivative.', 'Hidden activations let an MLP solve XOR; without them it is one line.'] },
  { week: 6, topic: 'Learning rate', q: 'What is the learning rate? What happens if it is too small or too large?',
    hint: 'İpucu: her güncellemede ne kadar adım atılıyor?',
    a: ['η = step size of gradient descent: w ← w − η·∂E/∂w.', 'Too small: slow, many steps.', 'Too large: overshoots the minimum, error can grow.', 'Slide example: η = 0.1, w 0.8 → 0.695.'] },
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
  b.type = 'button'; b.setAttribute('aria-controls', a.id); b.setAttribute('aria-expanded', 'false');
  b.onclick = () => { a.hidden = !a.hidden; b.textContent = a.hidden ? 'Show model answer' : 'Hide model answer'; b.setAttribute('aria-expanded', String(!a.hidden)); };
  s.append(input, b, a); root.append(s);
});
window.COE305_MOCK = { items, written };
})();
