/* OS/ML explanations in Turkish, with English exam terms and checks.
 * Source: existing course lessons; raw slides unavailable for this revision.
 * Source-conflict notes retained. Correct check first; learn.js shuffles options. */
window.GUIDE = {
  "1": {
    "goal": "Bilgisayarın örneklerden öğrenmesi ne demek?",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Önce öğrenilecek işi belirleyelim",
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
        "html": "<p>Credit scoring’de bir müşterinin riskini tahmin etmek istiyoruz. Her olası durum için kural yazmak yerine örneklerden işe yarayan bir kural öğrenebiliriz. Bu kural bir <b>model</b>’dir.</p><p>Altı haftayı tek akış olarak düşün: Week 1 işi seçer. Week 2 kuralı öğrenir ve yeni örneklerde dener. Week 3 girdileri düzenler. Week 4 labelsız gruplar bulur. Week 5 ve 6 iki model kurar: <b>decision tree</b> ve <b>neural network</b>.</p><p>Başlangıç sorusu “hangi algoritma?” değil, “örnekler bize nasıl bir geri bildirim veriyor?” olsun.</p>",
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
        "t": "Kuralları biliyorsak neden öğrenme kullanalım?",
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
        "html": "<p>Payroll hesabının kuralları belliyse doğrudan programlayabiliriz. Her iş için machine learning gerekmez.</p><p>Fakat konuşmayı tanıyor olmamız, bütün tanıma kurallarını yazabileceğimiz anlamına gelmez. Routing koşulları zamanla değişebilir. Biometrics kişiye uyum gerektirebilir. Böyle durumlarda örneklerden bir yaklaşım öğrenmek kullanışlıdır.</p><p><b>Machine learning</b>, örnekleri veya geçmiş deneyimi kullanarak bir performance criterion’ı iyileştirir. Öğrenilen modelin görevi, verdiğimiz problemde işe yaramaktır; “bilgisayar her şeyi kendi çözer” anlamına gelmez.</p>",
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
        "t": "Association: “computer olan sepetler arasında”",
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
        "html": "<p>10 sepette computer var. Bu 10 sepetin 7’sinde mouse da var. Sorulan şu: <em>Computer bulunan sepetler arasında mouse ne sıklıkta görülüyor?</em></p><ol><li>Önce koşulu sağlayanları seç: computer olan <b>10</b> sepet.</li><li>İçlerinden mouse da olanları say: <b>7</b>.</li><li>P(mouse | computer) = 7/10 = <b>0.7</b>.</li></ol><p>Çizgiden sonraki ifade koşuldur. Koşulu ters çevirince seçtiğin sepet kümesi, dolayısıyla payda değişir. Bu yüzden <b>P(Y | X)</b> ile <b>P(X | Y)</b> aynı olmak zorunda değildir.</p><div class=\"callout warn\">X ile Y’nin yerini değiştirmek paydayı değiştirir. <b>P(Y | X) = P(X | Y)</b> diye varsayma.</div>",
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
        "t": "Classification ile regression farkı",
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
        "html": "<p>Credit scoring örneğinde input’lar income ve savings; training label ise low risk veya high risk’tir. Lab’daki dikdörtgen kural, iki eşik de aşılırsa low risk der.</p><p><b>Learning</b> bu eşikleri örneklerden seçer. <b>Prediction</b> seçilmiş kuralı başka müşteriye uygular.</p><table class=\"t\"><tr><th>İş</th><th>Çıktı</th><th>Ders örneği</th></tr><tr><td><b>Classification</b></td><td>Sınıf</td><td>Low / high risk</td></tr><tr><td><b>Regression</b></td><td>Sayı</td><td>Used-car price</td></tr></table><p>İkisinde de training sırasında istenen cevap verilir. Bu nedenle ikisi de <b>supervised</b> olabilir.</p>",
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
        "t": "Supervised mı unsupervised mı? Cevap label’ına bak",
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
        "html": "<p>İki işte de aynı input’lar bulunabilir. Ayrımı, training sırasında doğru cevabın verilip verilmemesi yapar.</p><table class=\"t\"><tr><th>Tür</th><th>Training’de ne var?</th><th>Ders örneği</th></tr><tr><td><b>Supervised</b></td><td>Input + desired output / label</td><td>Credit scoring; used-car price</td></tr><tr><td><b>Unsupervised</b></td><td>Yalnız input</td><td>Customer segmentation; colour quantisation</td></tr><tr><td><b>Reinforcement</b></td><td>Action sonrası, gecikebilen reward</td><td>Labirentte policy öğrenme</td></tr></table><p><b>Classification</b> ve <b>regression</b>, supervised işlerin çıktı türleridir. <b>Clustering</b> ise label verilmeden grup bulur; bulunan cluster’ı hazır bir class label sanma.</p><p>Week 2, supervised durumda yeni örneklere güvenilir tahmin yapmayı inceleyecek.</p>",
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
    "question": "Bilgisayarın örneklerden öğrenmesi ne demek?",
    "reading": true,
    "summary": [
      "Classification sınıf, regression sayısal değer tahmin eder.",
      "Supervised öğrenmede hedef cevap vardır; unsupervised öğrenmede yalnızca girdiler vardır.",
      "Association’da koşul, hangi örnekleri paydaya aldığını belirler."
    ],
    "examAnswer": "Supervised: labelled examples. Unsupervised: inputs without labels. Reinforcement: actions and rewards.",
    "opening": "Vize notlarındaki odak: supervised, unsupervised ve diğer learning types. Ayrımı training sırasında verilen bilgiye göre yap."
  },
  "2": {
    "goal": "Training örneklerini doğru bilmek neden yeterli değil?",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Bilinen cevapları tutturduk; ya yeni araba?",
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
        "html": "<p>Arabaları price ve engine power ile tarif ediyoruz. Label, family car olup olmadığı. Pozitif örneklerin etrafına dikdörtgen çizip bir kural üretebiliriz.</p><p>Fakat aynı örnekleri doğru sınıflayan birçok dikdörtgen olabilir. Yeni bir araba geldiğinde bunlar farklı cevap verebilir.</p><p>Week 1’de öğrenmenin türünü seçtik. Burada <b>generalization</b> sorununu çözeceğiz: hangi kurallara izin veriyoruz, hatayı nasıl ölçüyoruz ve yeni veride işe yaradığını nasıl kontrol ediyoruz?</p>",
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
        "t": "Hypothesis: denediğimiz tek bir kural",
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
        "html": "<p>Price yatay, engine power dikey eksende olsun. Dikdörtgenin içi family car = 1, dışı 0 tahmin etsin.</p><p>Belirli bir dikdörtgen <b>hypothesis h</b>’dir. İzin verdiğimiz bütün dikdörtgenler <b>hypothesis class H</b>’yi oluşturur. Sınırı hareket ettirmek başka h seçmektir.</p><p><b>Empirical error</b> için her tahmini gerçek label r ile karşılaştırırız. <b>Σ 1(h(x) ≠ r)</b>, “yanlışsa 1 ekle” demektir.</p><p>Toplamın 0 çıkması, bu training örneklerinde hata yok demektir. Görmediğimiz bütün arabaların doğru sınıflanacağını söylemez.</p><div class=\"callout warn\"><b>False positive</b>: r = 0 iken 1 tahmin etmek. <b>False negative</b>: r = 1 iken 0 tahmin etmek.</div>",
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
        "t": "Aynı training verisi birden fazla sınırı destekleyebilir",
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
        "html": "<p>Dar sınır <b>S</b> pozitif örnekleri sıkıca çevreler. Daha genel sınır <b>G</b>, bilinen negatifleri almadan daha geniş bölgeye izin verir.</p><p>İkisi de training’e uyabilir. Aralarında kalan, label’ını bilmediğimiz bölgede ise tahminleri ayrışır. Training verisi orada tek bir cevabı zorlamamıştır.</p><p>Veriye uyan hypothesis’ler <b>version space</b> içindedir. Aralarından seçim yaparken kullandığımız tercih <b>inductive bias</b>’tır. Dersin margin örneğinde sınırı yakındaki training noktalarından uzak tutma tercihi vardır.</p><p>Yani “training hatası sıfır” ile “tek doğru model bulundu” aynı iddia değildir.</p>",
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
        "t": "MSE ve MAE: sayısal hatayı nasıl ölçeriz?",
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
        "html": "<p>Sayısal tahmin biraz veya çok yanlış olabilir. <b>Residual</b>, hedef ile tahmin arasındaki farktır. İşaretli farkları toplarsak artı ve eksiler birbirini silebilir.</p><p>Residual’lar −5, 2, 5, −5, 3 olsun:</p><table class=\"t\"><tr><th>Ölçü</th><th>Hesap</th><th>Sonuç</th></tr><tr><td><b>MAE</b></td><td>(5 + 2 + 5 + 5 + 3)/5</td><td><b>4</b></td></tr><tr><td><b>MSE</b></td><td>(25 + 4 + 25 + 25 + 9)/5</td><td><b>17.6</b></td></tr></table><p>MAE mutlak değer, MSE kare alır. İkisi de iptali önler; kare almak büyük hataları daha ağır cezalandırır.</p><div class=\"callout warn\">İşaretli error’lar birbirini silebilir. Mutlak değer veya kare almak bu iptali önler.</div>",
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
        "t": "Daha esnek model neden daha kötü olabilir?",
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
        "html": "<p>İlişki eğriyse düz çizgi yetersiz kalabilir: <b>underfitting</b>. Çok yüksek dereceli polynomial ise training’deki rastlantısal dalgalanmaları da izleyebilir: <b>overfitting</b>.</p><p>Önemli olan iki eğriyi ayrı okumak: training error ve yeni veri hatası. Karmaşıklık arttıkça ilki düşerken ikincisi yükselebilir.</p><p>Dersin <b>triple trade-off</b> fikri model complexity, sample size ve new-data error’ı bağlar. Daha fazla esnekliği yönlendirecek yeterli örnek gerekir.</p><p>Hedefimiz her training noktasını kusursuz izlemek değil, yeni örneklerde de işe yarayan ilişkiyi öğrenmektir.</p>",
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
        "t": "Training, validation ve test neden ayrılır?",
        "key": "Keep <b>training, validation and test</b> roles separate.",
        "fig": {
          "type": "anim",
          "name": "kfold",
          "t": "K-fold cross-validation",
          "cap": "Result = the average of the K scores. The <b>test</b> set is kept apart the whole time and used once at the very end."
        },
        "html": "<p>Bir modeli bir veri setindeki başarısına bakarak seçtiysek, o set seçimimizi etkilemiştir. Artık tarafsız son sınavımız olamaz.</p><table class=\"t\"><tr><th>Set</th><th>Görev</th><th>Dersin oranı</th></tr><tr><td><b>Training</b></td><td>Parametreleri öğren</td><td>%50</td></tr><tr><td><b>Validation</b></td><td>Model / ayar seç</td><td>%25</td></tr><tr><td><b>Test</b></td><td>Son performansı raporla</td><td>%25</td></tr></table><p><b>K-fold cross-validation</b>, validation görevini döndürür: K − 1 fold ile eğit, kalanla değerlendir; K sonucu ortala. Her turda validation fold değişir. Son test seti yine ayrı tutulur.</p><div class=\"callout warn\">Final test sonucuna tekrar tekrar bakarak model seçme; test’i validation yerine kullanmış olursun.</div>",
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
        "t": "Model, loss ve optimization farklı soruları cevaplar",
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
        "html": "<p>Bir learner’ı üç parçaya ayırabiliriz:</p><ul><li><b>Model</b>: hangi tahminler mümkün? Örneğin g(x) = w₁x + w₀.</li><li><b>Loss</b>: tahminler ne kadar kötü? Örneğin MSE.</li><li><b>Optimization</b>: loss’u azaltan parametreleri nasıl buluruz?</li></ul><p>K sınıf için ders <b>one-versus-rest</b> yaklaşımını da kullanır: her sınıfı diğerlerine karşı öğrenen K classifier.</p><p>Artık model kurup değerlendirebiliyoruz. Week 3 bir adım geriye bakıyor: modele verdiğimiz feature’ların hepsi gerekli mi?</p>",
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
    "question": "Training örneklerini doğru bilmek neden yeterli değil?",
    "reading": true,
    "summary": [
      "Hypothesis bir aday kural; hypothesis class izin verilen kurallar kümesidir.",
      "Training fit eder; validation seçer; test son performansı raporlar.",
      "Daha karmaşık model training’de iyileşirken yeni veride kötüleşebilir."
    ],
    "examAnswer": "Generalization: performance on unseen data. Training fits; validation selects; test evaluates. Overfitting: fitting noise."
  },
  "3": {
    "goal": "Modele hangi feature’ları vermeliyiz?",
    "time": "25–35 min",
    "steps": [
      {
        "t": "Daha az sayı, aynı örneği yeterince anlatabilir mi?",
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
        "html": "<p>Bir öğrenciyi age, GPA, attendance, study hours ve income ile tarif ediyoruz. Bir satır bir öğrencidir; beş sütun beş <b>feature</b>’dır. Yani <b>d = 5</b>.</p><p>Week 2 model seçti. Bu hafta modele giren açıklamayı değiştiriyoruz: daha az feature ile gerekli bilgiyi koruyabilir miyiz?</p><p>İki yol var. Bazı orijinal sütunları tutabiliriz veya sütunları birleştirerek yeni koordinatlar üretebiliriz. <b>Dimensionality reduction</b>’ı anlamak için önce bu ayrımı netleştirelim.</p>",
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
        "t": "Feature sayısını azaltmak ne kazandırır?",
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
        "html": "<p>Her feature’ın ölçme, saklama ve işleme maliyeti vardır. Bazıları hedefle ilgisiz olabilir; bazıları başka bir feature’ın verdiği bilgiyi büyük ölçüde tekrarlar.</p><p>Gereksiz girdileri azaltmak computation ve storage maliyetini düşürebilir. İki boyuta inmek doğrudan çizim yapmayı da kolaylaştırır.</p><p>Ama daha küçük temsil her zaman daha iyi tahmin demek değildir. Yararlı bilgiyi de atabiliriz. Bu yüzden “d azaldı” ile “model iyileşti” sonuçlarını ayrı değerlendirmeliyiz.</p>",
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
        "t": "Feature selection ile feature extraction farkı",
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
        "html": "<p>GPA ve study hours’ı tutup diğer sütunları atarsak <b>selection</b> yaparız. Kalan değerler hâlâ aynı ölçümlerdir.</p><p>Height ve weight’ten z₁ = 0.6·height + 0.8·weight üretirsek <b>extraction</b> yaparız. Artık yeni bir koordinat vardır.</p><table class=\"t\"><tr><th></th><th>Selection</th><th>Extraction</th></tr><tr><td>Ne tutulur?</td><td>Orijinal feature’lar</td><td>Yeni oluşturulan feature’lar</td></tr><tr><td>Anlamı</td><td>Orijinal ölçüm korunur</td><td>Ölçümler birleşebilir</td></tr></table><p><b>PCA</b> variance’a bakar; <b>LDA</b> bilinen sınıfları kullanır. İkisi de extraction tarafındadır. PCA’nın yüksek variance yönü, sınıfları ayıran en iyi yön olmak zorunda değildir.</p>",
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
        "t": "Forward ve backward selection nasıl ilerler?",
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
        "html": "<p>d feature’ın <b>2ᵈ</b> alt kümesi vardır. Hepsini denemek büyüyen d için pahalıdır. Bunun yerine her turda bir değişiklik deneyebiliriz.</p><table class=\"t\"><tr><th></th><th>Forward</th><th>Backward</th></tr><tr><td>Başlangıç</td><td>Boş küme</td><td>Bütün feature’lar</td></tr><tr><td>Bir tur</td><td>Her eklemeyi dene</td><td>Her çıkarmayı dene</td></tr><tr><td>Seçim</td><td colspan=\"2\">Validation error’ı en iyi yapan değişiklik</td></tr></table><p>Forward, iyileşme sürdükçe feature ekler. Backward ters yönde ilerler. Her adımda en iyi değişikliği seçmek, bütün olası alt kümeler arasında en iyiyi bulma garantisi değildir.</p><div class=\"callout warn\"><b>Greedy search</b> en iyi alt kümeyi garanti etmez. Küçük görünen bir iyileşme noise’dan da kaynaklanabilir.</div>",
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
        "t": "PCA ne yapar? En fazla yayılımı koruyan yönü arar",
        "key": "<b>PC1</b> maximizes projection variance for a unit direction w.",
        "fig": {
          "type": "anim",
          "name": "pca",
          "t": "Height and weight of students (centred)",
          "cap": "Press <b>New data</b> for a different cloud: PCA always finds the long axis."
        },
        "html": "<p><b>Principal Component Analysis (PCA)</b>, örnekleri daha az koordinatla anlatan bir <b>feature extraction</b> yöntemidir. Orijinal sütunlardan birkaçını seçmek yerine yeni eksenler oluşturur.</p><p>Height–weight bulutunu bir doğruya yansıttığını düşün. Bir yönde noktalar üst üste sıkışabilir; başka yönde aralarındaki yayılım daha çok korunabilir. PCA bu ikinci tür yönü arar.</p><ol><li>Ortalamayı çıkar: veriyi <b>center</b> et.</li><li>Projection variance’ını en büyük yapan birim yönü seç: <b>PC1</b>.</li><li><b>PC2</b>, PC1’e diktir; sonraki en büyük variance’ı korur.</li></ol><p>Lab’da yönü döndürerek projection’ın değişimini izle.</p><div class=\"callout warn\"><b>PCA label kullanmaz.</b> Maximum variance, maximum class separation demek değildir. LDA ise bilinen class’ları kullanır.</div><details class=\"course-detail\"><summary>İstersen: projection’ın matematiksel gösterimi</summary><p>Centered x noktasını birim w yönüne yansıt: <b>z = wᵀx</b>. Her nokta bir koordinat alır. PC1 için Var(z)’yi en büyük yapan yön seçilir. İki bileşenle iris örneğinde variance’ın %97.77’si korunur; bu accuracy değildir.</p></details>",
        "check": {
          "q": "What does PCA try to preserve when it reduces dimensions?",
          "o": [
            "As much data variance as possible",
            "As many class labels as possible",
            "As many original columns as possible"
          ],
          "why": "PCA constructs new projection axes to retain variance. It uses inputs without class labels; it does not select original columns."
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
        "t": "97.77% variance, 97.77% accuracy demek değil",
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
        "html": "<p>Dersin iris örneği iki principal component ile variance’ın <b>%97.77</b>’sini koruyor.</p><p>Öğrenci/satır örneğine dönelim: örnekleri silmedik. Her örneği daha az koordinatla tarif ettik. Değişen satır sayısı değil, feature temsili.</p><p>Bu yüzde, korunan yayılımı anlatır. Modelin sınıfları yüzde kaç doğrulukla tahmin ettiğini söylemez. Bunun için held-out veri üzerinde ayrıca ölçüm gerekir.</p><p>Week 3 sütunları düzenledi. Week 4 satırları grupluyor: label verilmeyen örneklerden hangileri birbirine benziyor?</p>",
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
    "question": "Modele hangi feature’ları vermeliyiz?",
    "reading": true,
    "summary": [
      "Selection mevcut feature’ları seçer; extraction yeni koordinatlar üretir.",
      "PCA label kullanmadan projection variance’ını korumaya çalışır.",
      "Korunan variance yüzdesi, classification accuracy yüzdesi değildir."
    ],
    "examAnswer": "Feature selection: retain original features. Feature extraction: construct new features. PCA: maximum projection variance; no class labels.",
    "opening": "Vize notlarındaki odak: feature selection ile extraction farkı ve PCA’nın ne yaptığı. Önce hangi bilginin korunduğunu açıkla."
  },
  "4": {
    "goal": "Cevap label’ları yoksa benzer grupları nasıl buluruz?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Supervised ve unsupervised: cluster, hazır class değildir",
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
        "html": "<p>Supervised learning’de training input’larının doğru cevapları vardır. <b>Clustering</b>’de ise yalnızca input’lar bulunur; benzer örnekleri gruplarız.</p><table class=\"t\"><tr><th></th><th>Supervised</th><th>Unsupervised clustering</th></tr><tr><td>Training label</td><td>Var</td><td>Yok</td></tr><tr><td>Amaç</td><td>Verilen hedefi tahmin etmek</td><td>Veri içindeki grupları bulmak</td></tr></table><p>Week 3 sütunları düzenledi. Burada satırları grupluyoruz. Bir cluster’ın bulunması, o grubun class adının önceden öğretildiği anlamına gelmez.</p><p>Bu bölümde üç ayrımı ayrı tut: <b>parametric</b> model biçimini, <b>supervised</b> label bilgisini, <b>hard/soft</b> ise grup üyeliğini anlatır.</p>",
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
        "t": "Parametric ile nonparametric: modelin biçimi önceden belli mi?",
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
        "html": "<p><b>Parametric</b> yaklaşımda mapping function / model biçimi önceden seçilir. Öğrenme onun parametrelerini bulur. y = wx + w₀ seçmek, w ve w₀’ı öğrenmeden önce düz çizgi biçimine karar vermektir.</p><table class=\"t\"><tr><th></th><th>Parametric</th><th>Nonparametric</th></tr><tr><td>Dersin ayrımı</td><td>Predefined mapping function / assumptions</td><td>Böyle önceden belirlenmiş biçim yok</td></tr><tr><td>Örnek</td><td>Linear regression: w ve w₀ öğrenilir</td><td>Decision tree: yapı veriden öğrenilir</td></tr></table><p>Bu örnekler dersin tanımının mevcut modellere uygulanmasıdır.</p><div class=\"callout warn\"><b>Nonparametric</b>, “hiç parametresi yok” demek değildir. Supervised–unsupervised ayrımı da değildir: o ayrım label bilgisine bakar.</div>",
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
        "t": "k-means: ata, ortalamayı bul, tekrar ata",
        "key": "Assign to the nearest <b>reference vector</b>, then update that vector to the mean.",
        "fig": {
          "type": "anim",
          "name": "kmeans",
          "t": "k-means in two dimensions",
          "cap": "Change k or press <b>New data</b>: a bad start can end in a worse clustering."
        },
        "html": "<p><b>k-means hard clustering</b> yapar: her nokta yalnızca bir cluster’a atanır. k başlangıç merkezi seçilir. Her turda:</p><ol><li><b>Assignment</b>: noktayı en yakın merkeze ver.</li><li><b>Update</b>: her merkezi, kendisine verilen noktaların ortalamasına taşı.</li></ol><p>Noktalar 1, 2, 9, 10, 11; başlangıç merkezleri 1 ve 2 olsun. İlk atamada 1 yalnız kalır; diğerleri ikinci merkezdedir. İkinci merkez (2 + 9 + 10 + 11)/4 = <b>8</b> olur.</p><p>Yeniden atayınca 1 ve 2 aynı gruba; 9, 10, 11 diğer gruba gider. Merkezler <b>1.5</b> ve <b>10</b> olur.</p><p>Merkezler değiştiği için üyelik; üyelik değiştiği için merkez değişir. Kararlı hale gelene kadar sürdürürüz.</p><div class=\"callout warn\">Başlangıç merkezleri sonucu etkiler. Convergence, global en iyi çözümün bulunduğunu garanti etmez.</div>",
        "check": {
          "q": "What makes k-means hard clustering?",
          "o": [
            "Each point is assigned to one cluster",
            "Each point gets probabilities for all clusters",
            "Each point comes with a target class label"
          ],
          "why": "Hard clustering makes one cluster assignment per instance. Probabilistic memberships are soft clustering; supplied target labels describe supervision."
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
        "t": "Reconstruction error neyi ölçer?",
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
        "html": "<p>Bir cluster merkezi, o gruptaki noktalar için temsilci olabilir. <b>Colour quantisation</b> örneğinde pikselin tam rengini saklamak yerine temsilci rengin index’i saklanır.</p><p>Geri oluştururken x noktasını atanmış m merkeziyle değiştiririz. <b>Reconstruction error</b>, aralarındaki <b>‖x − m‖²</b> değerlerini toplar.</p><p>Formüldeki <b>bᵢᵗ</b>, t noktası i cluster’ına atanmışsa 1, değilse 0’dır. Yani toplama yalnızca seçilen merkezin mesafesini dahil eder.</p><p>Nearest-center assignment mesafeyi küçültür; mean update de o grubun squared error’ını en aza indirir.</p>",
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
        "t": "Hard vs soft clustering: tek seçim mi, olasılıklı üyelik mi?",
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
        "html": "<p>k-means bir nokta için tek cluster seçer: <b>hard assignment</b>. EM ile Gaussian mixture ise olasılıklı <b>soft membership</b> hesaplar.</p><table class=\"t\"><tr><th></th><th>Hard</th><th>Soft</th></tr><tr><td>Bir nokta</td><td>A veya B; üyelik 1 / 0</td><td>A için 0.7, B için 0.3 olabilir</td></tr><tr><td>Ders örneği</td><td>k-means</td><td>EM / Gaussian mixture</td></tr></table><p>Arada duran nokta, soft yöntemde iki gruba farklı ağırlıklarla katkı verebilir. EM bunu tekrarlar:</p><ol><li><b>E-step</b>: mevcut parametrelerden üyelik olasılıklarını bul.</li><li><b>M-step</b>: bu olasılıkları ağırlık olarak kullanıp parametreleri güncelle.</li></ol><p>Lab’da merkezler arasındaki bir noktanın üyeliklerini izle.</p><div class=\"callout warn\">Soft clustering’de olasılık bulunması, training class label’ı verildiği anlamına gelmez. Buradaki clustering hâlâ <b>unsupervised</b>’dır.</div>",
        "check": {
          "q": "A point has memberships 0.7 in A and 0.3 in B. What does this represent?",
          "o": [
            "Soft clustering with probabilistic memberships",
            "Hard clustering with one fixed assignment",
            "Supervised learning with two target labels"
          ],
          "why": "Soft clustering gives probabilities across clusters. In EM the E-step computes memberships and the M-step uses them to refit parameters."
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
        "t": "Dendrogram’ı nasıl okuyacağız?",
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
        "html": "<p><b>Agglomerative clustering</b> her örneği ayrı grup olarak başlatır ve en yakın iki grubu tekrar tekrar birleştirir. <b>Dendrogram</b> bu birleşmeleri kaydeder.</p><p>Belirli yükseklikte yatay kesim yapınca, kesimin altında ayrı kalan dallar cluster’ları verir.</p><table class=\"t\"><tr><th>Linkage</th><th>İki grup arasındaki mesafe</th></tr><tr><td><b>Single-link</b></td><td>En yakın nokta çifti</td></tr><tr><td><b>Complete-link</b></td><td>En uzak nokta çifti</td></tr><tr><td><b>Average-link</b></td><td>Gruplar arası çiftlerin ortalaması</td></tr></table><p>Noktalar değişmeden linkage değişirse birleşme sırası değişebilir. Önce hangi mesafe tanımının kullanıldığını kontrol et.</p>",
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
        "t": "Daha düşük error neden her zaman daha iyi cluster değil?",
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
        "html": "<p>Daha fazla merkezle noktaları daha yakından temsil etmek kolaylaşır. Ama error’ın düşmesi, grupların daha anlamlı olduğu anlamına gelmez.</p><p>Uygulama k’yı belirleyebilir: örneğin saklayabileceğimiz renk sayısı sınırlıdır. Aksi halde veri, error eğrisi ve grupların anlamı birlikte değerlendirilir. Eğrideki <b>elbow</b>, ek merkezin artık daha küçük kazanım getirdiği noktayı düşündürür.</p><p>Artık labelsız gruplamayı biliyoruz. Week 5 yeniden label’lara dönecek; bu kez tahmini bir soru ağacıyla yapacak.</p><div class=\"callout warn\">Her noktaya bir merkez verirsen reconstruction error 0 olabilir. Yalnız error’ı küçültmek daha fazla merkeze yöneltir.</div>",
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
    "question": "Cevap label’ları yoksa benzer grupları nasıl buluruz?",
    "reading": true,
    "summary": [
      "Parametric model biçimine, supervised–unsupervised label bilgisine bakar; iki ayrımı karıştırma.",
      "Hard clustering tek cluster seçer; soft clustering olasılıklı üyelik verir. k-means hard, EM soft örneğidir.",
      "k-means assignment / mean update, EM E-step / M-step döngüsünü tekrarlar; dendrogram birleşmeleri kaydeder."
    ],
    "examAnswer": "Parametric: predefined model form. Supervised: target labels. Hard: one cluster. Soft: probabilistic memberships.",
    "opening": "Vize notlarındaki odak: parametric–nonparametric, supervised–unsupervised ve hard–soft clustering. Bunlar üç ayrı karşılaştırmadır."
  },
  "5": {
    "goal": "Decision tree hangi soruyu önce soracağını nasıl öğrenir?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Tahmin yapmak için sırayla sorular sorabiliriz",
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
        "html": "<p>Bir dikdörtgen “içeride mi, dışarıda mı?” diye tek karar verir. <b>Decision tree</b> ise bir sorunun cevabına göre başka soruya gider; sonunda bir leaf tahmin verir.</p><p>Öğrenmek, hangi sorunun nerede sorulacağını ve nerede durulacağını seçmektir. İyi bir soru farklı cevaplı örnekleri ayırır.</p><p>Play Tennis örneğini takip edeceğiz. Önce ağacı okuyacağız; sonra karışıklığı <b>entropy</b> ile ölçüp soruları karşılaştıracağız. En sonda sayısal leaf ve pruning’i, Week 2’deki generalization fikrine bağlayacağız.</p>",
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
        "t": "Tek bir örneği root’tan leaf’e götürelim",
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
        "html": "<p>Play Tennis ağacında ilk soru <b>Outlook</b>’tur. Overcast kolu Yes’e gider. Sunny ise Humidity, Rain ise Wind sorusuna gider.</p><ul><li><b>Decision node</b>: attribute hakkında soru.</li><li><b>Branch</b>: sorunun belirli cevabı.</li><li><b>Leaf</b>: tahmin edilen sonuç.</li></ul><p>Bir örnek için her node’da yalnızca kendi değerine uyan dalı izlersin.</p><p>Slaytın Rain/Strong örnekleri tam ayrılmış değildir: D6 ve D14 No, D10 Yes’tir. Yani o dal hâlâ karışıktır. Çizilen ağacı okurken bütün dalların saf olduğunu varsayma.</p>",
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
        "t": "Entropy: neden fifty-fifty en karışık durum?",
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
        "html": "<p><b>Entropy</b>, bir node içindeki class karışıklığını, yani <b>impurity</b>’yi ölçer. Bütün örnekler aynı cevapsa node <b>pure</b>’dur: class belirsizliği yoktur.</p><table class=\"t\"><tr><th>İki class’lı node</th><th>Entropy</th><th>Yorum</th></tr><tr><td>4 Yes, 0 No</td><td><b>0</b></td><td>Pure</td></tr><tr><td>9 Yes, 5 No</td><td>Yaklaşık 0.940</td><td>Karışık</td></tr><tr><td>3 Yes, 3 No</td><td><b>1 bit</b></td><td>En yüksek impurity</td></tr></table><p>Fifty-fifty’de bir class diğerinden daha baskın değildir. Bu nedenle iki class için uncertainty en yüksektir. İyi bir split, child’ları daha saf hale getirir.</p><div class=\"callout warn\">“En kötü” ifadesi burada node’un <b>purity</b>’si içindir. Entropy = 1 üst sınırı bu örnekteki <b>iki class</b> içindir.</div><details class=\"course-detail\"><summary>İstersen: 9 Yes / 5 No hesabı</summary><p>Play Tennis’de 9 Yes, 5 No var:</p><ol><li>Payları bul: p(Yes) = 9/14; p(No) = 5/14.</li><li>Her sınıf için −p log₂ p hesapla.</li><li>Topla: −(9/14)log₂(9/14) − (5/14)log₂(5/14) ≈ <b>0.940</b>.</li></ol><p>Genel formül: <b>I = −Σ pᵢ log₂ pᵢ</b>. Vize notlarında öncelik, bu değerin neyi anlattığını açıklayabilmendir.</p></details>",
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
        "t": "Information gain: hangi soru karışıklığı daha çok azaltır?",
        "key": "Minimize <b>weighted child entropy</b>, equivalently maximize <b>information gain</b>.",
        "fig": {
          "type": "anim",
          "name": "id3",
          "t": "ID3 grows the Play Tennis tree"
        },
        "html": "<p>İyi bir split’ten sonra child node’lar daha saf olur. <b>Information gain</b>, split öncesi entropy ile split sonrası <b>weighted child entropy</b> arasındaki azalmadır.</p><p>Child’ları eşit değil, örnek sayısına göre ağırlıklandırırız. Büyük bir child daha çok örneği temsil eder.</p><p>Play Tennis’de Outlook split’i, 0.940 entropy’yi yaklaşık 0.694’e indirir: gain yaklaşık <b>0.246</b>. Overcast kolunda 4 Yes, 0 No vardır; bu kol pure olduğu için leaf olabilir.</p><p><b>ID3</b> en yüksek gain’i, aynı parent için en düşük weighted child entropy’yi seçer.</p><div class=\"callout warn\">Child’ların büyüklüğü farklıysa entropy’lerini eşit ağırlıkla ortalamak yanlış olur.</div><details class=\"course-detail\"><summary>İstersen: Outlook split’inin hesabı</summary><p>Outlook ile ayırınca Sunny’de 5, Overcast’te 4, Rain’de 5 örnek var. Entropy’leri 0.971, 0 ve 0.971.</p><ol><li>Her child’ı büyüklüğüyle ağırlıklandır: 5/14, 4/14, 5/14.</li><li>Kalan entropy: (5/14)0.971 + (4/14)0 + (5/14)0.971 ≈ <b>0.694</b>.</li><li><b>Gain</b> = önce − sonra = 0.940 − 0.694 ≈ <b>0.246</b>.</li></ol></details>",
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
        "t": "Regression tree’de leaf bir sayı verir",
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
        "html": "<p>Hedef sınıf değil sayıysa leaf bir ortalama tahmin eder. Leaf’e gelen target’lar 2, 4, 6 olsun:</p><ol><li>Tahmin = (2 + 4 + 6)/3 = <b>4</b>.</li><li>Residual’lar: −2, 0, 2.</li><li>MSE = (4 + 0 + 4)/3 = <b>8/3</b>.</li></ol><p>Split, sayısal hatayı azaltacak biçimde seçilir. Dersin durma kuralında node error <b>θᵣ</b> altına inince bölme durur.</p><p>θᵣ küçülürse daha çok bölmeye izin verilir; ağaç daha karmaşık hale gelebilir. Bu bizi tekrar overfitting’e getirir.</p><div class=\"callout warn\">Daha fazla leaf noise’ı öğrenebilir. Model seçimini validation üzerinde karşılaştır.</div>",
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
        "t": "Pruning: training’deki her ayrıntıyı tutmak zorunda değiliz",
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
        "html": "<p>Ağaç büyüdükçe training’deki küçük rastlantıları da ayırabilir. Training error düşse bile yeni veri başarısı bozulabilir.</p><table class=\"t\"><tr><th>Yöntem</th><th>Ne zaman müdahale eder?</th></tr><tr><td><b>Prepruning / early stopping</b></td><td>Ağaç büyürken durdurur.</td></tr><tr><td><b>Postpruning</b></td><td>Ağaç büyüdükten sonra subtree’leri kaldırır.</td></tr></table><p>Ders postpruning için ayrı bir pruning set kullanır. Sorulacak şey: “Bu dal training dışında da yararlı mı?”</p><p>Week 6’da model ağaçtan network’e değişecek. Fakat model, loss ve optimization ayrımı aynı kalacak.</p>",
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
    "question": "Decision tree hangi soruyu önce soracağını nasıl öğrenir?",
    "reading": true,
    "summary": [
      "Entropy, node içindeki class karışıklığını ölçer; saf node’da 0’dır.",
      "Information gain = parent entropy − weighted child entropy.",
      "Regression leaf ortalama hedefi verir; pruning aşırı büyümeyi sınırlar."
    ],
    "examAnswer": "ID3: maximize information gain. Gain = parent entropy − weighted child entropy. Regression leaf: mean target.",
    "opening": "Vize notlarındaki odak: entropy ve iki class için fifty-fifty durumunun neden en yüksek impurity olduğu."
  },
  "6": {
    "goal": "Basit weighted sum’lardan öğrenen bir network nasıl oluşur?",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Önce network’ün cevabı nasıl ürettiğini anlayalım",
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
        "html": "<p>Week 2’nin üç parçasını hatırla: <b>model</b> tahmini üretir, <b>loss</b> hatayı ölçer, <b>optimization</b> parametreleri iyileştirir.</p><p>Bu hafta model, birbirine bağlanmış weighted unit’lerden oluşuyor. Önce bir unit’in hesapladığı şeyi anlayacağız. Sonra activation ve hidden layer ekleyeceğiz. En sonda hatadan weight değişimine gideceğiz.</p><p>İki işlemi ayır: <b>forward pass</b> mevcut weight’lerle cevap hesaplar. <b>Training update</b> weight’leri değiştirir; sonraki cevabın daha iyi olmasını amaçlar.</p>",
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
        "t": "wᵀx aslında çarpıp toplamak",
        "key": "The <b>weighted sum</b> is a = wᵀx (including bias). An <b>activation function</b> then determines the output.",
        "fig": {
          "type": "anim",
          "name": "wtx",
          "t": "Transpose, then multiply and add"
        },
        "html": "<p>Unit’in girdileri x₁ … x_d; her bağlantının bir weight’i vardır. Önce her girdiyi kendi weight’iyle çarpar, sonra toplarız:</p><p class=\"lesson-equation\">a = w₁x₁ + … + w_dx_d + w₀</p><p><b>w₀</b>, bias’tır. Slaytlar x₀ = 1 sabit girdisini ekleyerek bunu <b>wᵀx</b> içine alır.</p><p><b>Transpose</b> satır ve sütunları yer değiştirir. Buradaki sütun vektör, <b>ᵀ</b> ile satır vektöre dönüşür. Satır × sütun sonucu tek sayıdır: karşılıklı çarpımların toplamı.</p><p>Linear regression çıktısında y = a olabilir. Classification’da ise activation bu toplamı dönüştürür. Toplamı hesaplamakla çıktı kuralını seçmek iki ayrı adımdır.</p>",
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
        "t": "ax + b içindeki b: bias sınırı neden kaydırır?",
        "key": "Notundaki <b>b</b>, slaytlardaki <b>bias w₀</b>’dır. Weight’ler yönü, bias sınırın konumunu belirler.",
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
        "html": "<p>Notundaki tek girdili <b>y = ax + b</b> gösteriminde a = w, <b>b = w₀ = bias</b>. Bias sabit terimdir; doğruyu kaydırır. Bias 0 olursa doğru orijinden geçmek zorundadır.</p><p>w₁ = w₂ = 1 olsun. Unit, x₁ + x₂ + w₀ &gt; 0 ise 1 versin. Karar sınırı toplamın 0 olduğu doğrudur.</p><table class=\"t\"><tr><th>Bias</th><th>Sınır</th><th>Hangi girişler 1?</th></tr><tr><td><b>−1.5</b></td><td>x₁ + x₂ = 1.5</td><td>Yalnız (1,1): AND</td></tr><tr><td><b>−0.5</b></td><td>x₁ + x₂ = 0.5</td><td>(0,0) dışındakiler: OR</td></tr></table><p>Weight’leri değiştirmedik. Yalnız bias değişince sınır kaydı. Weight yönü, <b>bias konumu</b> belirler. Bias 0 ise sınır orijinden geçmek zorundadır. Regression’daki y = wx + w₀ için de w₀ doğruyu yukarı/aşağı taşır.</p>",
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
        "t": "Activation: bu toplamı nasıl bir çıktıya çevirelim?",
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
        "html": "<p>Weighted sum herhangi bir sayı olabilir. <b>Activation function</b>, onu ihtiyaca uygun çıktıya dönüştürür.</p><table class=\"t\"><tr><th>Activation</th><th>Çıktı fikri</th></tr><tr><td><b>Sigmoid</b></td><td>(0,1); binary classification olasılığı</td></tr><tr><td><b>tanh</b></td><td>(−1,1)</td></tr><tr><td><b>ReLU</b></td><td>max(0,a)</td></tr><tr><td><b>Linear</b></td><td>Regression’da doğrudan toplam</td></tr></table><p>Sigmoid(0) = 0.5’tir. Toplam pozitifse sigmoid çıktısı 0.5’in üstündedir; bu yüzden iki class için olasılık olarak yorumlanır.</p><p><b>Ne zaman kullanılır?</b> Activation preprocessing değildir. Ağın içinde her <b>forward pass</b>’te, hem <b>training</b> hem <b>prediction</b> sırasında uygulanır. Training’de backpropagation, ilgili activation’ın türevini de kullanır. Grafikte yatay eksen toplamı, dikey eksen çıktıyı gösterir.</p>",
        "check": {
          "q": "When are activation functions applied?",
          "o": [
            "In forward passes during training and prediction",
            "Only to inputs before training has started",
            "Only to outputs after training has finished"
          ],
          "why": "Activations are part of the network. They transform weighted sums in every forward pass, and backpropagation uses their derivatives during training."
        }
      },
      {
        "t": "Softmax: input sayısı değil, output class sayısı önemli",
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
        "html": "<p><b>Binary classification</b> için bir sigmoid çıktısı class 1 olasılığını verebilir. Ders, <b>multiclass classification</b> için her class’a bir skor üretip bunlara <b>softmax</b> uygular.</p><p>Üç class için sonuç 0.665, 0.245, 0.090 olsun. Toplam <b>1</b>’dir; en yüksek olasılık ilk class’tadır. Network onu seçer.</p><p>Softmax, her skorun üstelini aynı toplama böler. Böylece çıktılar tek probability distribution oluşturur. Birbirinden bağımsız sigmoid’lerde bu ortak toplam şartı yoktur.</p><div class=\"callout warn\">Notundaki “multiclass inputs” ifadesinde asıl ayrım <b>output class</b> sayısıdır. Çok input feature bulunması tek başına softmax gerektirmez.</div><details class=\"course-detail\"><summary>İstersen: 2, 1, 0 skorlarından olasılıklara</summary><ol><li>Skorlar 2, 1, 0. Üstelini al: e² ≈ 7.39; e¹ ≈ 2.72; e⁰ = 1.</li><li>Toplam = <b>11.11</b>.</li><li>Her birini toplama böl: yaklaşık <b>0.665, 0.245, 0.090</b>.</li><li>En büyük olasılığı seç: class 1.</li></ol></details>",
        "check": {
          "q": "What determines how many output probabilities a multiclass softmax produces?",
          "o": [
            "The number of target output classes",
            "The number of input feature columns",
            "The number of training data examples"
          ],
          "why": "The lecture uses one softmax output per class. Feature count describes the input; class count describes the prediction task."
        }
      },
      {
        "t": "XOR neden hidden layer istiyor?",
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
        "html": "<p>XOR, (1,0) ve (0,1)’de 1; (0,0) ve (1,1)’de 0’dır. Tek doğru, iki 1’i bir tarafta ve iki 0’ı diğer tarafta bırakamaz.</p><p>Slaytın <b>hidden layer</b>’ı işi ikiye böler:</p><ul><li>z₁ = x₁ AND NOT x₂.</li><li>z₂ = NOT x₁ AND x₂.</li><li>Çıktı = z₁ OR z₂.</li></ul><p>İki hidden unit iki pozitif köşeyi ayrı ayrı yakalar; output bunları birleştirir.</p><p>Burada <b>nonlinear activation</b> gereklidir. Sadece linear toplamları üst üste koyarsak yine tek linear model elde ederiz. Çözüm yalnız “daha fazla layer” değildir.</p>",
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
        "t": "Learning factor / learning rate: adım büyüklüğü neden önemli?",
        "key": "Training moves each weight against the slope of the error: <b>w ← w − η·∂E/∂w</b>. The <b>learning rate η</b> is the step size.",
        "fig": {
          "type": "anim",
          "name": "descent",
          "t": "Gradient descent on slide 17's example"
        },
        "html": "<p>Notundaki <b>learning factor</b>, burada <b>learning rate η</b> olarak geçen adım büyüklüğüdür. Training’de weight güncellemesinin ne kadar büyük olacağını ölçekler.</p><p>Hatanın azaldığı yönü bulmak yeterli değildir; o yönde ne kadar ilerlediğimiz de önemlidir.</p><table class=\"t\"><tr><th>η</th><th>Ne olabilir?</th></tr><tr><td>Çok küçük</td><td><b>Slow convergence</b>: birçok küçük adım</td></tr><tr><td>Uygun</td><td>Hatayı azaltan ilerleme</td></tr><tr><td>Çok büyük</td><td><b>Overshoot</b>: minimumu aşıp error’ı büyütme</td></tr></table><p>Animasyonda aynı başlangıç için slider’ı değiştir; adımların nasıl değiştiğini izle. Küçük/büyük için her probleme uyan tek bir sayı ezberleme.</p><details class=\"course-detail\"><summary>İstersen: weight update hesabı ve slayttaki çelişkiler</summary><p>Ders örneği: x = 1.5, hedef r = 0.5, weight w = 0.8.</p><ol><li>Prediction: y = xw = <b>1.2</b>.</li><li>Loss: E = ½(r − y)² = ½(−0.7)² = <b>0.245</b>.</li><li>Slope: ∂E/∂w = x(y − r) = <b>1.05</b>.</li><li>η = 0.1 ile yeni w = 0.8 − 0.1 × 1.05 = <b>0.695</b>.</li></ol><p class=\"lesson-equation\">w ← w − η · ∂E/∂w</p><div class=\"callout warn\"><b>Slaytlarda işaret ve loss değeri çelişkisi var.</b> Slides 8–10, Δw = −η(r − y)x yazar. Çalışılmış örnekte gereken Δw = +η(r − y)x = −0.105’tir; böylece w, 0.8’den 0.695’e iner. Loss; slide 17’de 0.249, slide 19’da 0.245, slide 20’de 0.49 yazılmıştır. Buradaki ½ × 0.7² tanımıyla doğru değer <b>0.245</b>’tir.</div></details>",
        "check": {
          "q": "Why can an excessively large learning rate increase the error?",
          "o": [
            "Updates can overshoot the error minimum",
            "Updates stop using any error information",
            "Updates convert the bias into class labels"
          ],
          "why": "The learning rate scales the update. A step that is too large can jump beyond a useful region; a very small step can converge slowly."
        }
      },
      {
        "t": "Backpropagation: hangi weight hatayı nasıl etkiledi?",
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
        "html": "<p><b>Forward pass</b> mevcut weight’lerle hidden çıktıları ve prediction’ı hesaplar. Loss, prediction ile hedef arasındaki hatayı ölçer.</p><p>Hidden weight’i değiştirmek sonraki unit’leri, onlar da loss’u etkiler. <b>Backpropagation</b> bu etki zincirini output’tan geriye doğru izleyerek gradient’leri bulur.</p><p><b>Chain rule</b>, bir yol boyunca derivative’leri çarpar; dallanan yolların katkıları toplanır. Ardından learning rate, gradient’le yapılacak update’in büyüklüğünü belirler.</p><p>Bu yüzden prediction ile öğrenme farklıdır: forward pass cevap üretir; gradient hesabı ve update ağırlıkları iyileştirmeye çalışır. Model, loss ve optimization böyle birleşir.</p><details class=\"course-detail\"><summary>İstersen: slayttaki w₅ update hesabı</summary><p>Slaytın w₅ örneğinde:</p><ol><li>Output error × sigmoid slope × hidden input.</li><li>Gradient ≈ 0.741 × 0.187 × 0.593 = <b>0.082</b>.</li><li>η = 0.5 ile: 0.4 − 0.5 × 0.082 ≈ <b>0.359</b>.</li></ol><div class=\"callout warn\">Slide 26 ikinci hidden toplamı ilkinden kopyalayarak 0.3775 yazıyor. Mevcut worked calculation’da toplam <b>0.3925</b>’tir; h₂ ≈ 0.597 verir.</div></details>",
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
    "question": "Basit weighted sum’lardan öğrenen bir network nasıl oluşur?",
    "reading": true,
    "summary": [
      "ax + b içindeki b, bias w₀’dır; sınırı kaydırır. Transpose, wᵀx’i row × column toplamına dönüştürür.",
      "Sigmoid binary output; softmax multiclass output olasılıkları içindir. Activation, training ve prediction sırasında uygulanır.",
      "Learning factor / learning rate update adımını ölçekler. Çok küçükse yavaş, çok büyükse overshoot olabilir."
    ],
    "examAnswer": "Bias b = w₀: boundary shift. Transpose: row ↔ column. Sigmoid: binary. Softmax: class probabilities sum to 1. Learning rate: update step size.",
    "opening": "Vize notlarındaki odak: bias, transpose, activation functions ve learning rate. Notta formül yazılmayacağı belirtiliyor; kavramı ve neden kullanıldığını açıklamaya öncelik ver."
  }
};
