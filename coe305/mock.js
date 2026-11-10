/* Practice from the existing course examples; no announced exam format assumed. */
(()=>{
const items=[
  {
    "week": 1,
    "q": "Which task does NOT need learning?",
    "options": [
      "Calculating payroll",
      "Recognizing speech",
      "Routing on a computer network that changes over time",
      "Authenticating a user by biometrics"
    ],
    "answer": 0,
    "explain": "Payroll has a known, fixed rule. Speech: we can't explain our expertise. Routing: the solution changes. Biometrics: the solution adapts to each person."
  },
  {
    "week": 1,
    "q": "\"People who bought laptops also bought a mouse\" is which kind of learning?",
    "options": [
      "Regression",
      "Association learning",
      "Reinforcement learning",
      "Dimensionality reduction"
    ],
    "answer": 1,
    "explain": "Association rules estimate P(Y | X): P(mouse | computer) = 0.7 on the slide."
  },
  {
    "week": 1,
    "q": "P(mouse | computer) = 0.7 means…",
    "options": [
      "70% of mouse buyers also buy a computer",
      "70% of all customers buy both",
      "70% of computer buyers also buy a mouse",
      "A mouse is 70% cheaper than a computer"
    ],
    "answer": 2,
    "explain": "Condition on X = computer. P(computer | mouse) is a different number."
  },
  {
    "week": 1,
    "q": "Color quantization in image compression is an application of…",
    "options": [
      "Regression",
      "Reinforcement learning",
      "Association rules",
      "Clustering"
    ],
    "answer": 3,
    "explain": "Group similar colors and replace each pixel by its cluster's color. Week 4's k-means does exactly this."
  },
  {
    "week": 2,
    "q": "E(h | X) = Σₜ 1(h(xᵗ) ≠ rᵗ) counts…",
    "options": [
      "Count of training mistakes",
      "How many positives there are",
      "The area of the rectangle",
      "The distance to the nearest point"
    ],
    "answer": 0,
    "explain": "1(·) is 1 when the condition is true. Slide 6: A and C are misclassified, so E = 2."
  },
  {
    "week": 2,
    "q": "Car A has r = 0 but h predicts 1. This is a…",
    "options": [
      "False negative",
      "False positive",
      "True positive",
      "True negative"
    ],
    "answer": 1,
    "explain": "Predicted positive, actually negative. A false negative is a positive that h misses."
  },
  {
    "week": 2,
    "q": "Slide 12 residuals are −5, 2, 5, −5, 3. The mean absolute error is…",
    "options": [
      "0",
      "17.6",
      "4",
      "20"
    ],
    "answer": 2,
    "explain": "(5 + 2 + 5 + 5 + 3) / 5 = 20 / 5 = 4. Signed residuals sum to 0, which is why we use |·| or squares."
  },
  {
    "week": 2,
    "q": "In 5-fold cross-validation, each example is used for validation…",
    "options": [
      "Five times",
      "Never",
      "Only if it is misclassified",
      "Once"
    ],
    "answer": 3,
    "explain": "The data is split into 5 folds; each fold is the validation set once. The 5 scores are averaged."
  },
  {
    "week": 3,
    "q": "Choosing GPA, Attendance and Study Hours out of five student features is…",
    "options": [
      "Feature selection",
      "Feature extraction",
      "Clustering",
      "PCA"
    ],
    "answer": 0,
    "explain": "Slide 6: the remaining features are still the original features."
  },
  {
    "week": 3,
    "q": "z₁ = 0.6·Height + 0.8·Weight is an example of…",
    "options": [
      "Feature selection",
      "Feature extraction",
      "Subset selection",
      "Removing an irrelevant feature"
    ],
    "answer": 1,
    "explain": "Slide 7. Extraction transforms (x → z); selection selects xᵢ's."
  },
  {
    "week": 3,
    "q": "PCA projects x onto a direction w by…",
    "options": [
      "z = x − w",
      "z = ‖x‖·‖w‖",
      "z = wᵀx",
      "z = argmax x"
    ],
    "answer": 2,
    "explain": "A dot product. PCA chooses the w (unit length) that maximizes Var(z)."
  },
  {
    "week": 3,
    "q": "PCA considers which directions to carry the most information?",
    "options": [
      "Directions that separate the classes",
      "The original axes",
      "Directions with the smallest variance",
      "Largest variance"
    ],
    "answer": 3,
    "explain": "Slide 10: \"along which direction does our data vary the most?\""
  },
  {
    "week": 4,
    "q": "The k-means update step sets each mᵢ to…",
    "options": [
      "Mean of assigned points",
      "The point farthest from it",
      "A random data point",
      "The median of all data"
    ],
    "answer": 0,
    "explain": "Assignment step (green box on slide 6), then update step (red box). Repeat until the mᵢ converge."
  },
  {
    "week": 4,
    "q": "Soft clustering means…",
    "options": [
      "Clusters never overlap",
      "Probabilistic memberships",
      "Each element belongs to exactly one cluster",
      "Clusters are chosen by a human"
    ],
    "answer": 1,
    "explain": "Slide 10. k-means is hard; EM is soft."
  },
  {
    "week": 4,
    "q": "In EM, the E-step…",
    "options": [
      "Moves the Gaussians to fit their elements",
      "Picks k",
      "Computes responsibilities",
      "Merges the two closest clusters"
    ],
    "answer": 2,
    "explain": "The M-step adjusts (μᵢ, σᵢ²) to fit the elements assigned to them."
  },
  {
    "week": 4,
    "q": "Single-link distance between groups Gᵢ and Gⱼ is…",
    "options": [
      "The maximum such distance",
      "The distance between their means",
      "The number of points in both",
      "Minimum pairwise distance"
    ],
    "answer": 3,
    "explain": "Complete-link uses the max. Average-link and centroid are the other options."
  },
  {
    "week": 5,
    "q": "What is the entropy of a node with 9 yes and 5 no?",
    "options": [
      "About 0.940 bits",
      "≈ 0.643 bits",
      "1 bit",
      "0 bits"
    ],
    "answer": 0,
    "explain": "−(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ 0.410 + 0.530 = 0.940."
  },
  {
    "week": 5,
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
    "week": 5,
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
    "week": 5,
    "q": "A regression tree leaf predicts…",
    "options": [
      "The majority class",
      "The median x",
      "A probability",
      "Mean target"
    ],
    "answer": 3,
    "explain": "gₘ = Σₜ bₘ(xᵗ) rᵗ / Σₜ bₘ(xᵗ). Node error is the mean squared deviation from gₘ."
  }
];
const written=[
  {
    "week": 1,
    "q": "A shop has 20 computer baskets; 14 also contain a mouse. Calculate P(mouse | computer). Can you infer P(computer | mouse)?",
    "a": [
      "14 / 20 = 0.70",
      "Reverse probability: unknown; total mouse baskets needed."
    ]
  },
  {
    "week": 2,
    "q": "For residuals −5, 2, 5, −5, 3, calculate MAE and MSE. Why not average signed residuals?",
    "a": [
      "MAE = 20 / 5 = 4",
      "MSE = 88 / 5 = 17.6",
      "Signed residuals sum to zero; cancellation hides errors."
    ]
  },
  {
    "week": 3,
    "q": "Explain feature selection versus extraction using GPA / Study Hours and height / weight. What does PCA maximize?",
    "a": [
      "Selection: keep GPA and Study Hours.",
      "Extraction: z = 0.6 × height + 0.8 × weight.",
      "PCA: maximum projected variance; unit direction; centered data."
    ]
  },
  {
    "week": 4,
    "q": "Points are 1, 2, 9, 10, 11. Starting centers are 1 and 2. Trace two assign/update rounds of k-means.",
    "a": [
      "Round 1: {1}, {2, 9, 10, 11}; centers 1 and 8.",
      "Round 2: {1, 2}, {9, 10, 11}; centers 1.5 and 10.",
      "Next assignment unchanged: converged."
    ]
  },
  {
    "week": 5,
    "q": "Play Tennis: parent entropy 0.940; Sunny 5 cases, entropy 0.971; Overcast 4, entropy 0; Rain 5, entropy 0.971. Calculate weighted child entropy and gain.",
    "a": [
      "Weighted entropy = (5/14) × 0.971 + (4/14) × 0 + (5/14) × 0.971 ≈ 0.694",
      "Gain ≈ 0.940 − 0.694 = 0.246 (rounded inputs)",
      "Overcast: pure Yes leaf."
    ]
  }
];
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e};
const root=document.getElementById('exam');
items.forEach((q,i)=>{const s=el('section',undefined,'qcard');s.append(el('p','Week '+q.week,'small muted'),el('h2',(i+1)+'. '+q.q));const opts=el('div',undefined,'options'),fb=el('p',undefined,'feedback');fb.hidden=true;fb.setAttribute('aria-live','polite');q.options.forEach((o,k)=>{const b=el('button',o);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{opts.querySelectorAll('button').forEach(x=>{x.disabled=true;x.setAttribute('aria-pressed',String(x===b));});fb.hidden=false;fb.textContent=(k===q.answer?'Correct. ':'Incorrect. Correct answer: '+q.options[q.answer]+'. ')+q.explain;fb.className='feedback '+(k===q.answer?'ok':'bad');CS.srs.grade(CS.srs.qId(COURSE.id,q.week,q.q),k===q.answer);};opts.append(b);});s.append(opts,fb);root.append(s);});
written.forEach((q,i)=>{const s=el('section',undefined,'qcard');s.append(el('p','Week '+q.week,'small muted'),el('h2',(items.length+i+1)+'. '+q.q));const input=el('textarea');input.setAttribute('aria-label','Your answer to question '+(items.length+i+1));const b=el('button','Show model answer'),a=el('div',undefined,'model');a.id='model-'+i;a.hidden=true;q.a.forEach(x=>a.append(el('p',x)));b.type='button';b.setAttribute('aria-controls',a.id);b.setAttribute('aria-expanded','false');b.onclick=()=>{a.hidden=!a.hidden;b.textContent=a.hidden?'Show model answer':'Hide model answer';b.setAttribute('aria-expanded',String(!a.hidden));};s.append(input,b,a);root.append(s);});
window.COE305_MOCK={items,written};
})();
