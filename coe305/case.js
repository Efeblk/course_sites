/* A guided case built from the existing Week 4 dataset and notation.
 * Customer visits are a fictional teaching context for the course's 1,2,9,10,11 example.
 * Soft memberships are supplied illustrations, not a fitted EM calculation. */
(() => {
  const root = document.getElementById('ml-case');
  if (!root) return;
  const DATA = [1, 2, 9, 10, 11];
  const FIRST = [0, 1, 1, 1, 1], SECOND = [0, 0, 1, 1, 1];
  const NAMES = ['Görev / X', 'Ata', 'Ortala', 'Yeniden ata', 'Yeni merkezler', 'Hata E', 'Hard / soft', 'Aktar', 'Tamamla'];
  const KEY = 'course-sites:case:coe305:w4:v1';
  const initial = () => ({ step: 0, done: Array(9).fill(false), assignments: [Array(5).fill(null), [...FIRST]], means: [['', ''], ['', '']], total: '', soft: .7, choice: [null, null, null] });
  let state = initial(), feedback = null, activeSymbol = 'X';
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && Array.isArray(saved.done) && saved.done.length === 9 && saved.done.every(v => typeof v === 'boolean') && Number.isFinite(saved.soft) && saved.soft >= 0 && saved.soft <= 1 && Array.isArray(saved.assignments) && saved.assignments.length === 2 && saved.assignments.every(a => Array.isArray(a) && a.length === 5 && a.every(v => v === null || v === 0 || v === 1)) && Array.isArray(saved.means) && saved.means.length === 2 && saved.means.every(a => Array.isArray(a) && a.length === 2) && Array.isArray(saved.choice) && saved.choice.length === 3 && Number.isInteger(saved.step) && saved.step >= 0 && saved.step < 9) state = saved;
  } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const maxStep = () => { const missing = state.done.findIndex(d => !d); return missing < 0 ? 8 : missing; };
  state.step = Math.min(state.step, maxStep());
  const el = (tag, attrs, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else if (k === 'style') { for (const [prop, value] of Object.entries(v)) prop.startsWith('--') ? node.style.setProperty(prop, value) : node.style[prop] = value; }
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const child of children.flat(Infinity)) if (child != null && child !== false) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    return node;
  };
  const p = html => el('p', { html });
  const fmt = value => Number(value.toFixed(3)).toLocaleString('tr-TR');
  const num = value => value.trim() === '' ? NaN : Number(value.trim().replace(',', '.'));
  const changed = () => {
    const step = state.step;
    state.done.fill(false, step);
    if (step === 0) state.assignments[0] = Array(5).fill(null);
    if (step <= 2) state.assignments[1] = [...FIRST];
    if (step <= 1) state.means[0] = ['', ''];
    if (step <= 3) state.means[1] = ['', ''];
    if (step <= 4) state.total = '';
    if (step < 6) state.choice[1] = null;
    if (step < 7) state.choice[2] = null;
    feedback = null; save();
  };
  const report = (ok, html) => {
    state.done[state.step] = ok;
    feedback = { ok, html };
    if (ok && window.CS && state.step === 8) CS.progress.markVisited('w4-case-complete');
    save(); drawFeedback(); drawPath(); drawControls();
  };
  let stage, fb, path, controls, chartObserver;
  const move = index => {
    if (index < 0 || index > maxStep()) return;
    state.step = index; feedback = null; save(); render();
    stage.querySelector('h2').focus({ preventScroll: true });
    stage.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  function table(head, rows) {
    return el('table', { class: 'case-table' }, el('thead', {}, el('tr', {}, head.map(t => el('th', { scope: 'col' }, t)))), el('tbody', {}, rows.map(row => el('tr', {}, row.map(t => el('td', {}, t))))));
  }
  function field(label, value, oninput, id) {
    const input = el('input', { type: 'text', inputmode: 'decimal', value, id, autocomplete: 'off', oninput: e => { changed(); oninput(e.target.value); save(); drawFeedback(); drawPath(); drawControls(); } });
    return el('label', { for: id }, label, input);
  }
  function choices(question, options, right, reasons, slot) {
    const box = el('div', { class: 'case-choice', 'data-question': slot });
    box.append(p(question));
    options.forEach((label, i) => box.append(el('button', { type: 'button', 'aria-pressed': state.choice[slot] === i ? 'true' : 'false', onclick: () => {
      changed(); state.choice[slot] = i;
      box.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
      report(i === right, reasons[i]);
      const sourcePrefix = ['Supervised data is', 'In EM, the E-step', 'In encoding/decoding'][slot];
      const sourceQuestion = window.COURSE?.chapters.find(ch => ch.n === 4)?.quiz.find(q => q.q.startsWith(sourcePrefix));
      if (window.CS?.srs && sourceQuestion) CS.srs.grade(CS.srs.qId(COURSE.id, 4, sourceQuestion.q), i === right);
    } }, label)));
    return box;
  }
  const symbols = {
    X: '<b>X</b> bütün dataset: {1, 2, 9, 10, 11}. N = 5 örnek; her müşteride tek feature olduğu için d = 1.',
    'xᵗ': '<b>xᵗ</b>, t numaralı müşterinin ölçümüdür. x³ = 9. Küçük t örnek indeksidir; transpose ᵀ değildir.',
    'mᵢ': '<b>mᵢ</b>, i numaralı cluster’ın temsilcisidir (reference vector / prototype / codeword). Gᵢ grubun kendisi; mᵢ onu temsil eden merkezdir.',
    'bᵢᵗ': '<b>bᵢᵗ</b>: t numaralı nokta i numaralı cluster’a atandı mı? Hard clustering’de 1 veya 0. Bu b, neural-network bias’ı değil.',
    'γᵢᵗ': '<b>γᵢᵗ</b> soft membership olasılığıdır: t numaralı nokta, i numaralı cluster’a ne kadar ait? Örneğin γ₁² = 0,7, ikinci noktanın A üyeliğinin %70 olduğunu söyler.',
    E: '<b>E</b>, noktaların atanmış merkezlerine squared distance toplamıdır. Σ toplama; ‖xᵗ − mᵢ‖² uzaklığın karesi. Bu E, EM’deki E-step adıyla aynı anlamda değil.'
  };
  function symbolHelp() {
    const detail = el('div', { class: 'case-symbol-detail', 'aria-live': 'polite', html: symbols[activeSymbol] });
    return el('div', {}, el('div', { class: 'case-symbols', 'aria-label': 'Gösterimi açıkla' }, Object.keys(symbols).map(key => el('button', { type: 'button', 'aria-pressed': key === activeSymbol ? 'true' : 'false', onclick: e => {
      activeSymbol = key; detail.innerHTML = symbols[key];
      e.currentTarget.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent === key)));
    } }, key))), detail);
  }
  function plot(centers, assignment) {
    const wrap = el('figure', { class: 'case-numberline' });
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', `X: 1, 2, 9, 10, 11. A merkezi ${centers[0]}, B merkezi ${centers[1]}.`);
    wrap.append(svg, el('figcaption', { class: 'case-caption' }, 'Üst sıra: müşterilerin ölçümleri. A ≡ G₁, B ≡ G₂; elmaslar m₁ ve m₂.'));
    const draw = () => {
      const w = Math.max(260, wrap.getBoundingClientRect().width), left = 24, right = w - 24;
      const x = value => left + value / 12 * (right - left);
      svg.setAttribute('viewBox', `0 0 ${w} 210`); svg.replaceChildren();
      const shape = (tag, attrs, text) => {
        const n = document.createElementNS(svg.namespaceURI, tag);
        for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
        if (text != null) n.textContent = text;
        svg.append(n); return n;
      };
      shape('line', { x1: left, y1: 185, x2: right, y2: 185, stroke: 'var(--line-2)' });
      (w < 450 ? [0, 4, 8, 12] : [0, 2, 4, 6, 8, 10, 12]).forEach(value => {
        shape('line', { x1: x(value), y1: 185, x2: x(value), y2: 190, stroke: 'var(--line-2)' });
        shape('text', { x: x(value), y: 205, 'text-anchor': 'middle' }, value);
      });
      DATA.forEach((value, t) => {
        const group = assignment[t];
        if (group != null) shape('line', { x1: x(value), y1: 42, x2: x(centers[group]), y2: group ? 143 : 100, stroke: group ? 'var(--case-b)' : 'var(--case-a)', opacity: .4 });
        shape('circle', { cx: x(value), cy: 42, r: 6, fill: group == null ? 'var(--muted)' : group ? 'var(--case-b)' : 'var(--case-a)' });
        shape('text', { x: x(value), y: 23, 'text-anchor': 'middle' }, value);
      });
      centers.forEach((center, i) => {
        const cx = x(center), cy = i ? 143 : 100;
        shape('path', { d: `M${cx},${cy - 8}l8,8 -8,8 -8,-8z`, fill: i ? 'var(--case-b)' : 'var(--case-a)' });
        shape('text', { x: center > 7 ? cx - 13 : cx + 13, y: cy + 4, 'text-anchor': center > 7 ? 'end' : 'start' }, `${i ? 'B · m₂' : 'A · m₁'} = ${fmt(center)}`);
      });
    };
    requestAnimationFrame(draw);
    chartObserver = new ResizeObserver(draw); chartObserver.observe(wrap);
    return wrap;
  }
  function assignments(round, centers, expected) {
    const rows = el('div', { class: 'case-assignments' });
    const inspection = el('div', { class: 'case-symbol-detail', 'aria-live': 'polite' }, 'Bir müşteriye A veya B seç. Burada uzaklığı ve bᵢᵗ karşılığını göreceksin.');
    let chart = plot(centers, state.assignments[round]);
    DATA.forEach((value, t) => {
      const row = el('div', { class: 'case-assign-row' }, el('div', {}, `Müşteri ${t + 1} · `, el('b', {}, `x${['¹','²','³','⁴','⁵'][t]} = ${value}`)));
      [0, 1].forEach(i => row.append(el('button', { type: 'button', style: { '--c': i ? 'var(--case-b)' : 'var(--case-a)' }, 'aria-label': `Müşteri ${t + 1}: ${i ? 'B' : 'A'} cluster`, 'aria-pressed': String(state.assignments[round][t] === i), onclick: () => {
        changed(); state.assignments[round][t] = i; save();
        row.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
        inspection.innerHTML = `<b>x${['¹','²','³','⁴','⁵'][t]} = ${value}</b>: A’ya uzaklık ${fmt(Math.abs(value - centers[0]))}, B’ye ${fmt(Math.abs(value - centers[1]))}. Senin seçimin ${i ? 'B' : 'A'}: <b>b${i ? '₂' : '₁'}${['¹','²','³','⁴','⁵'][t]} = 1</b>.`;
        chartObserver?.disconnect();
        const replacement = plot(centers, state.assignments[round]);
        chart.replaceWith(replacement); chart = replacement;
        drawFeedback(); drawPath(); drawControls();
      } }, i ? 'B · G₂' : 'A · G₁')));
      rows.append(row);
    });
    const button = el('button', { type: 'button', class: 'case-check-button', onclick: () => {
      const selected = state.assignments[round];
      if (selected.some(v => v == null)) return report(false, 'Önce beş müşterinin her biri için A veya B seç.');
      const wrong = selected.findIndex((v, t) => v !== expected[t]);
      if (wrong >= 0) return report(false, `Müşteri ${wrong + 1} için tekrar bak: xᵗ = ${DATA[wrong]}. A’ya mesafe <b>${fmt(Math.abs(DATA[wrong] - centers[0]))}</b>, B’ye <b>${fmt(Math.abs(DATA[wrong] - centers[1]))}</b>. Küçük mesafeyi seç; henüz merkezleri değiştirmiyoruz.`);
      report(true, round ? '<b>Doğru.</b> Artık A = {1, 2}, B = {9, 10, 11}. Özellikle 2, B’den A’ya geçti; çünkü merkezler değişti.' : '<b>Doğru.</b> İlk merkezler 1 ve 2 olduğu için A = {1}, B = {2, 9, 10, 11}. Başlangıç merkezleri son cluster’lar olmak zorunda değil.');
    } }, 'Atamaları kontrol et');
    return [chart, rows, inspection, button];
  }
  function meanTask(round, values, oldCenters) {
    const resetPlot = () => {
      const old = stage.querySelector('.case-numberline');
      if (!old) return;
      chartObserver?.disconnect(); old.replaceWith(plot(oldCenters, round ? SECOND : FIRST));
    };
    const fields = el('div', { class: 'case-fields' },
      field('Yeni m₁ (A merkezi)', state.means[round][0], v => { state.means[round][0] = v; resetPlot(); }, `mean-${round}-a`),
      field('Yeni m₂ (B merkezi)', state.means[round][1], v => { state.means[round][1] = v; resetPlot(); }, `mean-${round}-b`));
    const button = el('button', { type: 'button', class: 'case-check-button', onclick: () => {
      const got = state.means[round].map(num);
      if (got.some(v => !Number.isFinite(v))) return report(false, 'İki merkez için de bir sayı gir. Ondalık için 1,5 veya 1.5 kullanabilirsin.');
      if (got.some((v, i) => Math.abs(v - values[i]) > .001)) return report(false, round ? 'A’nın noktaları 1 ve 2: toplam 3, sayı 2. B’nin noktaları 9, 10, 11: toplam 30, sayı 3. <b>Her grubun kendi ortalamasını</b> al.' : 'A’da yalnız 1 var. B’de 2, 9, 10, 11 var: toplam <b>32</b>, örnek sayısı <b>4</b>. Update, grubun ortalamasını kullanır; eski merkezi veya bütün dataset’in ortalamasını değil.');
      report(true, round ? '<b>Doğru: m₁ = 1,5 ve m₂ = 10.</b> Bu merkezlerle yeniden nearest-center assignment yapınca üyelikler değişmez. Bu örnek converged oldu; bu, her başlangıcın global en iyi sonucu bulacağını garanti etmez.' : '<b>Doğru: m₁ = 1 ve m₂ = 8.</b> B’nin merkezi 2’den 8’e taşınır. Veriler aynı kaldı; yalnızca temsilciler değişti.');
      const old = stage.querySelector('.case-numberline');
      chartObserver?.disconnect(); old.replaceWith(plot(values, round ? SECOND : FIRST));
    } }, 'Merkezleri kontrol et');
    return [plot(state.done[state.step] ? values : oldCenters, round ? SECOND : FIRST), fields, button];
  }
  function stageBody() {
    switch (state.step) {
      case 0: return [
        p('Bir mağaza, müşterilerini benzer ziyaret davranışlarına göre <b>iki cluster</b>’a ayırmanı istiyor. Öğretim senaryosunda her müşterinin tek feature’ı aylık ziyaret sayısı. Kullanılan sayılar dersin k-means örneğinden: <b>X = {1, 2, 9, 10, 11}</b>.'),
        p('Doğru grup etiketleri verilmedi. Sen iki temsilci bulacak, her noktayı temsilcisine atayacak ve gösterimlerin ne anlattığını çözeceksin.'),
        table(['Müşteri t', 'Ölçüm xᵗ'], DATA.map((value, t) => [t + 1, value])),
        p('<b>N = 5</b> müşteri, <b>d = 1</b> feature, <b>k = 2</b> cluster. x³ üçüncü ölçümdür: 9. Buradaki küçük t örnek indeksi; transpose ᵀ değil.'),
        choices('No target labels are supplied. Which learning setting is this?', ['Supervised: known target labels', 'Unsupervised: discover groups', 'Reinforcement: actions and rewards'], 1,
          ['Grup label’ları verilmedi. Supervised training’de input ile doğru target birlikte bulunurdu.', '<b>Doğru: unsupervised.</b> X girdileri içeriyor; rᵗ gibi hazır doğru grup label’ları yok. k = 2 yalnızca istediğimiz grup sayısı; hangi müşterinin nereye ait olduğunu söylemiyor.', 'Bu senaryoda action/reward geri bildirimi yok; yalnızca ölçümleri grupluyoruz.'], 0)
      ];
      case 1: return [
        p('İlk merkezler <b>m₁ = 1</b> ve <b>m₂ = 2</b>. Bunlar başlangıç seçimleri. Her müşteriyi <b>en yakın merkeze</b> ata. A, G₁; B, G₂ demektir.'),
        p('Merkezleri henüz güncelleme. Önce her nokta için yalnızca A mı B mi sorusunu cevapla.'),
        ...assignments(0, [1, 2], FIRST)
      ];
      case 2: return [
        p('Atama tamam: <b>A = {1}</b>, <b>B = {2, 9, 10, 11}</b>. Şimdi her merkezi kendi üyelerinin <b>mean</b> değerine taşı.'),
        p('Formülü sözcüklerle oku: seçilen grubun değerlerini topla, o gruptaki nokta sayısına böl. Dataset’in tamamını veya iki eski merkezi ortalamıyoruz.'),
        p('<b>mᵢ</b>: grubun temsilcisi. Quiz’de reference vector, prototype veya codeword adlarıyla da karşılaşabilirsin.'),
        ...meanTask(0, [1, 8], [1, 2])
      ];
      case 3: return [
        p(state.done[3] ? 'Bu adımda merkezler <b>1 ve 8</b> iken yaptığın atamalar gösteriliyor. Önceki turda A = {1}, B = {2, 9, 10, 11} idi; 2’nin neden taşındığını tekrar incele.' : 'Yeni merkezler <b>1 ve 8</b>. Ölçümler hâlâ 1, 2, 9, 10, 11. Önceki turdaki atamalarla başlıyoruz; daha yakın bir merkezi olan müşterinin seçimini değiştir.'),
        p('Bu, k-means’in yeniden <b>assignment</b> adımı. Özellikle x² = 2’nin iki merkeze uzaklığını karşılaştır.'),
        ...assignments(1, [1, 8], SECOND)
      ];
      case 4: return [
        p('Şimdi <b>A = {1, 2}</b>, <b>B = {9, 10, 11}</b>. İkinci update’i yap. Her grubun temsilcisini o grubun ortalamasına taşı.'),
        p('A’nın merkezinde ondalık çıkabilir. Sayının tam sayı olması gerekmiyor; merkez her zaman gerçek bir veri noktası olmak zorunda değil.'),
        ...meanTask(1, [1.5, 10], [1, 8])
      ];
      case 5: {
        const errorRows = DATA.map((x, t) => {
          const center = SECOND[t] ? 10 : 1.5, error = (x - center) ** 2;
          return el('div', { class: 'case-error-row' }, el('span', {}, `x${['¹','²','³','⁴','⁵'][t]} = ${x}`), el('div', { class: 'case-error-track' }, el('span', { style: { width: `${error * 100}%` } })), el('span', {}, fmt(error)));
        });
        return [
          p('Son temsilciler <b>m₁ = 1,5</b>, <b>m₂ = 10</b>. Bir noktayı merkeziyle temsil ederken fark oluşabilir. <b>Reconstruction error E</b>, bu farkların karelerini toplar.'),
          el('p', { class: 'case-formula' }, 'E = Σₜ Σᵢ bᵢᵗ ‖xᵗ − mᵢ‖²'),
          p('Σ “topla” der. bᵢᵗ yalnız atanan merkezi seçer: 1 ise katkıyı tut, 0 ise katkısı sıfırdır. ‖xᵗ − mᵢ‖², nokta–merkez uzaklığının karesidir. Bar’lar her müşterinin katkısını gösteriyor.'),
          el('div', { class: 'case-error-bars', role: 'img', 'aria-label': 'Squared errors: 0.25, 0.25, 1, 0, 1.' }, errorRows),
          el('div', { class: 'case-fields' }, field('Toplam reconstruction error E', state.total, v => state.total = v, 'case-error')),
          el('button', { type: 'button', class: 'case-check-button', onclick: () => report(Math.abs(num(state.total) - 2.5) < .001,
            Math.abs(num(state.total) - 2.5) < .001 ? '<b>Doğru: E = 2,5.</b> 0,25 + 0,25 + 1 + 0 + 1. Her noktada yalnız kendi cluster’ının merkezi katkı verir. Formül bir toplam hatayı anlatır; class label’ı veya accuracy değil.' : 'Her farkın <b>karesini</b> alıp topla: (1 − 1,5)², (2 − 1,5)², (9 − 10)², (10 − 10)², (11 − 10)². Nokta sayısına bölme: buradaki E bir toplamdır, ortalama değil.') }, 'E değerini kontrol et')
        ];
      }
      case 6: {
        const a = Math.max(0, Math.min(1, Number(state.soft) || 0));
        const labels = el('p', { class: 'case-prob-label' }, `A · γ₁² = ${fmt(a)} · B · γ₂² = ${fmt(1 - a)} · toplam = 1`);
        const segA = el('span', { style: { width: `${a * 100}%`, '--c': 'var(--case-a)' } });
        const segB = el('span', { style: { width: `${(1 - a) * 100}%`, '--c': 'var(--case-b)' } });
        const range = el('input', { type: 'range', id: 'case-soft', min: 0, max: 1, step: .05, value: a, oninput: e => {
          const value = Number(e.target.value); state.soft = value; save();
          labels.textContent = `A · γ₁² = ${fmt(value)} · B · γ₂² = ${fmt(1 - value)} · toplam = 1`;
          segA.style.width = `${value * 100}%`; segB.style.width = `${(1 - value) * 100}%`;
        } });
        return [
          p('k-means’te x² = 2 için hard seçimimiz A: <b>b₁² = 1, b₂² = 0</b>. Bir soft model aynı nokta için örneğin <b>γ₁² = 0,7, γ₂² = 0,3</b> vermiş olsun.'),
          p('<b>γᵢᵗ (gamma)</b>, t numaralı noktanın i numaralı cluster’a membership probability’sidir. Slider ile bu <b>verilmiş örnek olasılıkları</b> değiştir; toplamları 1 kalır. Burada EM fit etmiyoruz, olasılıkların anlamını inceliyoruz.'),
          el('div', { class: 'case-member' }, labels, el('div', { class: 'case-member-bar', role: 'img', 'aria-label': 'A ve B üyeliklerinin toplamı bir.' }, segA, segB), el('label', { for: 'case-soft' }, 'A için soft membership γ₁²'), range),
          p('<b>E-step</b> mevcut parametrelerden üyelik olasılıklarını hesaplar. <b>M-step</b> bu olasılıkları ağırlık olarak kullanıp μ (merkez) ve σ² (variance / yayılım) gibi parametreleri günceller. γ bir target label değildir.'),
          choices('In EM, which step computes membership probabilities?', ['M-step: refit the parameters', 'Neither: use target labels', 'E-step: estimate memberships'], 2,
            ['M-step, hesaplanan olasılıkları kullanarak parametreleri günceller. Üyelikleri önce hangi adım hesaplıyordu?', 'Bu clustering örneğinde hazır target label yok. Olasılıklı üyelik, supervised olduğu anlamına gelmez.', '<b>Doğru: E-step.</b> E-step üyelikleri hesaplar; M-step parametreleri günceller. E harfi burada Expectation; önceki hata E’si ile aynı anlamda değil.'], 1)
        ];
      }
      case 7: return [
        p('İşveren ölçümleri iki temsilciyle saklamak istiyor. Gönderici ve alıcı aynı <b>codebook</b>’u biliyor: index 1 → m₁ = 1,5; index 2 → m₂ = 10.'),
        p('x³ = 9 için en yakın temsilci 10. Encoder, bütün noktayı göndermek yerine temsilcinin <b>index</b>’ini yollar. Decoder bu index’i codebook’ta arar.'),
        choices('For x³ = 9, what does the encoder send?', ['Index i = 2', 'Original x³ = 9', 'Center value m₂ = 10'], 0,
          ['<b>Doğru: index 2.</b> Decoder 2’yi alır, codebook’tan m₂ = 10 değerini bulur ve x′ = 10 üretir. Orijinal 9, temsilci 10 ile yaklaşık gösterilir; squared error 1 olur.', 'Bu, orijinal noktayı göndermek olur. Buradaki encoding, alıcıda zaten bilinen temsilcinin index’ini kullanır.', '10 temsilcinin değeridir. Alıcı codebook’u bildiği için gönderilen şey burada o değerin index’i olan 2’dir.'], 2)
      ];
      case 8: return [
        p('Aynı veri üzerinde bir k-means döngüsünü tamamladın. Merkezler <b>(1, 2) → (1, 8) → (1,5; 10)</b> olarak değişti. Son merkezlerle atama değişmiyor.'),
        table(['Gösterim', 'Bu case’de nasıl okunur?'], [
          ['X / x³', 'Bütün beş ölçüm / üçüncü ölçüm 9'], ['N / d / k', '5 örnek / 1 feature / 2 cluster'], ['G₂ / m₂', '{9, 10, 11} grubu / temsilcisi 10'], ['b₂³ = 1', 'Üçüncü nokta ikinci cluster’a atanmış'], ['E = 2,5', 'Atanmış merkezlere toplam squared distance'], [`γ₁² = ${fmt(Number(state.soft))}`, `Örnek soft modelde ikinci noktanın A üyeliği %${fmt(Number(state.soft) * 100)}`]
        ]),
        p('<b>English keywords:</b> Unsupervised: no target labels. Hard: one cluster. Soft: probabilistic memberships. Assign → update means → repeat. Encoder sends the center index.'),
        p('Bu tek örneğin tamamlanması bütün Week 4’ü öğrendiğini ölçmez. Şimdi quiz’de reference vector, bᵢᵗ, update ve EM sorularını tekrar kendi gerekçenle çöz.'),
        el('button', { type: 'button', class: 'case-check-button', onclick: () => report(true, '<b>Case tamamlandı.</b> Takıldığın adımı üstteki numaralardan tekrar açabilirsin. Sitede Week 4 quiz’ine ve dersine dönerek farklı örneklerle devam et.') }, state.done[8] ? 'Tekrar gözden geçirdim' : 'Case’i tamamla')
      ];
    }
  }
  function drawFeedback() {
    fb.replaceChildren();
    if (feedback) fb.append(el('div', { class: 'case-feedback', 'data-status': feedback.ok ? 'right' : 'wrong', html: feedback.html }));
  }
  function drawPath() {
    path.replaceChildren(...NAMES.map((title, i) => el('li', {}, el('button', { type: 'button', disabled: i > maxStep(), 'aria-current': i === state.step ? 'step' : null, 'aria-label': `${i + 1}. ${title}${state.done[i] ? ', tamamlandı' : ''}`, onclick: () => move(i) }, `${i + 1}. ${title}`))));
  }
  function drawControls() {
    controls.replaceChildren(
      el('button', { type: 'button', disabled: state.step === 0, onclick: () => move(state.step - 1) }, 'Geri'),
      el('span', { class: 'case-caption' }, `Adım ${state.step + 1} / ${NAMES.length}`));
    if (state.step < 8) controls.append(el('button', { type: 'button', class: 'case-next primary', disabled: !state.done[state.step], onclick: () => move(state.step + 1) }, `Sonraki: ${NAMES[state.step + 1]} →`));
  }
  function render() {
    chartObserver?.disconnect();
    stage = el('section', { class: 'case-stage' }, el('h2', { tabindex: '-1' }, `${state.step + 1}. ${['Görevin: labelsız veriden iki temsilci bul','Her noktayı en yakın merkeze ata','Atanan noktaların ortalamasını bul','Merkez değişince atama değişir mi?','İkinci update: son temsilcileri bul','Bir temsilci kullanmanın hatası ne?','Tek seçim ile olasılık arasındaki fark','Gönderilecek şey veri mi, index mi?','Sembolleri artık bu örnekle oku'][state.step]}`));
    path = el('ol', { class: 'case-path', 'aria-label': 'Case adımları' });
    fb = el('div', { 'aria-live': 'polite', 'aria-atomic': 'true' });
    controls = el('div', { class: 'case-controls' });
    root.replaceChildren(
      el('header', { class: 'case-top' }, el('div', {}, el('div', { class: 'case-kicker' }, 'COE305 · Week 4 · Rehberli case study'), el('h1', {}, 'Beş müşteri, iki cluster'), p('Dersin sayısal örneğiyle çalış: X’i oku, atama yap, merkezleri güncelle. Yaklaşık 15 dakika.')),
        el('button', { type: 'button', onclick: () => { state = initial(); feedback = null; save(); render(); } }, 'Baştan başla')),
      path, stage);
    if (state.done[state.step]) stage.append(el('p', { class: 'case-caption' }, 'Bu adım tamamlandı. Cevabını değiştirirsen sonraki adımlar yeniden kontrol edilir.'));
    stage.append(...stageBody(), fb, controls, symbolHelp());
    root.append(el('details', { class: 'case-sources' }, el('summary', {}, 'Dersle bağlantısı ve kapsam'),
      p('Bu öğretim senaryosu, mevcut Week 4 içeriğindeki 1, 2, 9, 10, 11 örneğini customer segmentation bağlamında kullanır. Kaynaklar: mevcut Week 4 dersi, quiz/kartları, k-means labı ve EM labı. Ham slayt PDF’leri bu çalışma ortamında yok; mevcut ders içeriği kullanıldı.'),
      p('Vize notlarındaki supervised/unsupervised ve hard/soft ayrımlarını çalıştırır. k-means işlemleri ve gösterimler, tüm Week 4 quiz’ini anlamak için ek pratik sunar. Soft slider bir EM fit işlemi değil; verilmiş membership olasılıklarını gösterir.')));
    drawFeedback(); drawPath(); drawControls();
  }
  render();
})();
