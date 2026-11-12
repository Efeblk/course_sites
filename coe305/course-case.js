/* An original teaching scenario. Concepts come from the existing COE305 Weeks 1–6.
 * The eight student records are synthetic, not a copied dataset or real predictions. */
(() => {
  const root = document.getElementById('ml-case');
  if (!root) return;
  const KEY = 'course-sites:case:coe305:course:v1';
  // id, age, GPA, attendance (%), weekly study hours, income (teaching units), label
  const DATA = [
    ['A',20,2.0,40,1,3,0], ['B',21,2.2,50,2,8,0],
    ['C',20,2.4,60,2,5,0], ['D',22,2.6,70,3,4,1],
    ['E',20,2.8,80,4,6,1], ['F',21,3.0,90,5,3,1],
    ['G',22,3.2,90,1,7,0], ['H',20,3.4,95,5,5,1]
  ];
  const FEATURES = ['Age','GPA','Attendance','Study hours','Income'];
  const SHORT = ['Görev','X’i oku','Yeni veride dene','Feature seç','PCA','Model biçimi','Cluster kur','Hard / soft','Ağaç kur','Neuron kur','Activation','Öğrenme adımı','Proje defteri'];
  const TITLES = ['Ne öğrenmek istiyoruz?','Bir satır, bir örnek; bir sütun, bir feature','Training’de iyi olmak yeterli mi?','Aynı öğrenciyi daha az sütunla anlat','Noktaları başka bir eksenden oku','Parametric hangi kararı önceden verir?','Label’ları kaldırınca soru değişir','Üyelik: tek seçim mi, olasılık mı?','Hangi soru daha saf gruplar oluşturuyor?','Ağacın yerine bir neuron koyalım','Aynı skor, farklı çıktı ihtiyaçları','Weight’i hangi yönde, ne kadar değiştirelim?','Altı haftayı bir projede birleştirdin'];
  const WEEKS = [1,1,2,3,3,4,4,4,5,6,6,6,6];
  const fresh = () => ({step:0, done:Array(12).fill(false), answers:{}, selected:[0,1,2,3,4], row:2, col:1, angle:0, labels:false, assignments:Array(8).fill(null), soft:.7, split:'attendance', threshold:60, bias:-.5, rate:.1, finished:false});
  let state = fresh(), feedback = null;
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Number.isInteger(s.step) && s.step>=0 && s.step<13 && Array.isArray(s.done) && s.done.length===12 && s.done.every(v=>typeof v==='boolean') && s.answers && typeof s.answers==='object' && !Array.isArray(s.answers) && Object.values(s.answers).every(v=>typeof v==='string' && v.length<100) && Array.isArray(s.selected) && s.selected.every(v=>Number.isInteger(v)&&v>=0&&v<5) && new Set(s.selected).size===s.selected.length && Array.isArray(s.assignments) && s.assignments.length===8 && s.assignments.every(v=>v===null||v===0||v===1) && Number.isInteger(s.row)&&s.row>=0&&s.row<8 && Number.isInteger(s.col)&&s.col>=0&&s.col<5 && Number.isFinite(s.angle)&&s.angle>=-90&&s.angle<=90 && typeof s.labels==='boolean' && Number.isFinite(s.soft)&&s.soft>=0&&s.soft<=1 && ['attendance','study'].includes(s.split) && Number.isFinite(s.threshold)&&s.threshold>0&&s.threshold<=95 && Number.isFinite(s.bias)&&s.bias>=-2&&s.bias<=.5 && Number.isFinite(s.rate)&&s.rate>=.01&&s.rate<=1.2 && typeof s.finished==='boolean') state=s;
  } catch {}
  const save = () => { try { localStorage.setItem(KEY,JSON.stringify(state)); } catch {} };
  const el = (tag, attrs={}, ...children) => {
    const node=document.createElement(tag);
    Object.entries(attrs).forEach(([key,value])=>{
      if(value==null || value===false) return;
      if(key==='html') node.innerHTML=value;
      else if(key.startsWith('on')) node.addEventListener(key.slice(2),value);
      else node.setAttribute(key,value===true?'':value);
    });
    children.flat(Infinity).forEach(child=>{if(child!=null&&child!==false)node.append(child instanceof Node?child:document.createTextNode(String(child)));});
    return node;
  };
  const p = html=>el('p',{html});
  const fmt = n=>Number(n.toFixed(3)).toLocaleString('tr-TR');
  const parse = s=>typeof s==='string'&&s.trim()!==''?Number(s.trim().replace(',','.')):NaN;
  const button = (text,run,attrs={})=>el('button',{type:'button',onclick:run,...attrs},text);
  const details = (title,...body)=>el('details',{class:'case-notebook'},el('summary',{},title),body);
  const metrics = items=>el('div',{class:'case-metrics'},items.map(([n,label])=>el('div',{class:'case-metric'},el('strong',{},n),el('span',{},label))));
  const table = (head,rows)=>el('table',{class:'case-table'},el('thead',{},el('tr',{},head.map(x=>el('th',{scope:'col'},x)))),el('tbody',{},rows.map(row=>el('tr',{},row.map(x=>el('td',{},x))))));
  const scrollTable=(head,rows)=>el('div',{class:'case-scroll',tabindex:0,'aria-label':'Veri tablosu; gerekirse yatay kaydır'},table(head,rows));
  let stage, fb, path, controls, progress;
  function changed(){ if(state.step<12) state.done[state.step]=false; state.finished=false; feedback=null; save(); refresh(); }
  function report(ok,html){ if(state.step<12)state.done[state.step]=ok; feedback={ok,html};save();refresh(); }
  function refresh(){
    fb.replaceChildren();
    if(feedback)fb.append(el('div',{class:'case-feedback','data-status':feedback.ok?'right':'wrong',html:feedback.html}));
    path.replaceChildren(...SHORT.map((t,i)=>el('li',{},button(`${i+1}. ${t}${state.done[i]?' · tamam':''}`,()=>move(i),{'aria-current':i===state.step?'step':null}))));
    const count=state.done.filter(Boolean).length;
    progress.replaceChildren(el('span',{class:'case-caption'},`${count} / 12 bölümün kontrolü tamamlandı · Her bölüme doğrudan geçebilirsin.`),el('progress',{max:12,value:count,'aria-label':'Kontrol edilen bölümler'}));
    controls.replaceChildren(button('Geri',()=>move(state.step-1),{disabled:state.step===0}),el('span',{class:'case-caption'},`${state.step+1} / 13`));
    if(state.step<12)controls.append(button(`Sonraki: ${SHORT[state.step+1]} →`,()=>move(state.step+1),{class:'case-next primary'}));
  }
  function move(i){ if(i<0||i>12)return;state.step=i;feedback=null;save();render();stage.querySelector('h2').focus({preventScroll:true});stage.scrollIntoView({block:'start'}); }
  function input(label,key){
    return el('label',{},label,el('input',{id:key,type:'text',inputmode:'decimal',autocomplete:'off',value:state.answers[key]||'',oninput:e=>{state.answers[key]=e.target.value;changed();}}));
  }
  function select(label,key,options){
    const s=el('select',{id:key,onchange:e=>{state.answers[key]=e.target.value;changed();}},el('option',{value:''},'Seç…'),options.map(([value,text])=>el('option',{value},text)));
    s.value=state.answers[key]||'';
    return el('label',{class:'case-select',for:key},label,s);
  }
  function choice(q,options,right,reasons,key){
    const box=el('div',{class:'case-choice','data-question':key},p(q));
    options.forEach((text,i)=>box.append(button(text,()=>{
      state.answers[key]=String(i);changed();
      box.querySelectorAll('button').forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));
      report(i===right,reasons[i]);
    },{'aria-pressed':String(state.answers[key]===String(i))})));
    return box;
  }
  function svgPlot(draw,label){
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 600 300');svg.setAttribute('role','img');svg.setAttribute('aria-label',label);
    const shape=(tag,attrs,text)=>{const n=document.createElementNS(svg.namespaceURI,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text!=null)n.textContent=text;svg.append(n);return n;};
    draw(shape);return el('figure',{class:'course-plot'},svg);
  }
  function range(label,key,min,max,step,onChange){
    const id=`case-${key}`;
    return el('label',{class:'case-select',for:id},label,el('input',{id,type:'range',min,max,step,value:state[key],oninput:e=>{state[key]=Number(e.target.value);changed();onChange();}}));
  }
  function labelBar(rows){
    const ones=rows.filter(r=>r[6]===1).length,zeros=rows.length-ones;
    const bar=el('div',{class:'case-class-bar','aria-hidden':'true'},el('span'),el('span'));
    bar.children[0].style.width=`${rows.length?zeros/rows.length*100:0}%`;bar.children[1].style.width=`${rows.length?ones/rows.length*100:0}%`;
    return el('div',{},p(`<b>Support (0): ${zeros}</b> · Ready (1): ${ones}`),bar);
  }
  const entropy=rows=>{if(!rows.length)return 0;const a=rows.filter(r=>r[6]).length/rows.length;return a===0||a===1?0:-a*Math.log2(a)-(1-a)*Math.log2(1-a);};
  function mission(){
    return [p('Bir üniversite, öğrencilerin çalışma durumunu örneklerden öğrenen bir model istiyor. Elimizde sekiz <b>kurgu öğrenci</b> var. Her biri beş ölçümle ve bilinen bir <b>target label</b> ile anlatılıyor: <b>Support = 0</b>, <b>Ready = 1</b>.'),
      p('Projenin sorusu: “Yeni bir öğrencinin class’ını tahmin edebilir miyiz?” Sonra label’ları kaldırıp farklı bir soru soracağız: “Kimler birbirine benziyor?” Aynı veri, farklı amaçlarla kullanılacak.'),
      el('div',{class:'course-map'},[['1 · Görev','Hangi geri bildirim var?'],['2 · Deneme','Yeni veride işe yarıyor mu?'],['3 · Temsil','Hangi feature’lar?'],['4 · Gruplama','Label olmadan ne bulunur?'],['5 · Ağaç','Hangi soruyla ayıralım?'],['6 · Network','Weight ve bias nasıl çalışır?']].map(([a,b])=>el('div',{},el('b',{},a),b))),
      p('Her bölümde bir karar vereceksin. Yanlış seçimde gerekçeyi görüp tekrar deneyebilirsin. Yaklaşık <b>35–45 dakika</b>; kaldığın yer bu tarayıcıda saklanır.'),
      choice('We have inputs AND known Support/Ready labels. What is our main task?', ['Unsupervised clustering','Reinforcement learning','Supervised classification'],2,[
        'Clustering’de bu class label’larını öğretmeyiz. Daha sonra label’ları kaldırınca o soruya döneceğiz.',
        'Burada action sonrası reward yok. Her training örneğinin istenen class’ı biliniyor.',
        '<b>Doğru.</b> Supervised, doğru target verildiğini; classification, çıktının bir class olduğunu söyler. Label’ları 0/1 yazmak işi regression yapmaz.'
      ],'task'),
      details('İş değişseydi: regression, association, reinforcement',p('Bir class yerine öğrencinin sayısal çalışma süresini tahmin etseydik <b>regression</b> olurdu. <b>Association</b>, “X bulunan örnekler arasında Y ne sıklıkta var?” sorusudur; dersin sepet örneğinde P(mouse | computer) = 7/10. Koşulu ters çevirince payda değişebilir.'),p('<b>Reinforcement</b> ise action → gecikebilen reward üzerinden policy öğrenir; dersin labirent örneği gibi. Bu projede o tür bir etkileşim yok.'))];
  }
  function notation(){
    const view=el('div'), inspector=el('div',{class:'case-symbol-detail','aria-live':'polite'});
    const redraw=()=>{
      const t=table(['Student / t',...FEATURES,'Target rᵗ'],DATA.map((r,i)=>[`${r[0]} / ${i+1}`,...r.slice(1,6),`${r[6]} · ${r[6]?'Ready':'Support'}`]));
      [...t.tBodies[0].rows].forEach((tr,i)=>{if(i===state.row)tr.setAttribute('data-selected','');tr.cells[state.col+1].setAttribute('data-feature','');});
      view.replaceChildren(el('div',{class:'case-scroll',tabindex:0,'aria-label':'Sekiz öğrenci; yatay kaydırılabilir'},t));
      const r=DATA[state.row];inspector.innerHTML=`<b>x${['¹','²','³','⁴','⁵','⁶','⁷','⁸'][state.row]}</b> = [${r.slice(1,6).join(', ')}]ᵀ, bir öğrencinin bütün feature’ları. Seçilen ölçüm <b>${FEATURES[state.col]} = ${r[state.col+1]}</b>. <b>r${['¹','²','³','⁴','⁵','⁶','⁷','⁸'][state.row]} = ${r[6]}</b> ayrı target’tır; input sütunu değil.`;
    };
    const row=el('select',{'aria-label':'İncelenecek öğrenci',onchange:e=>{state.row=Number(e.target.value);save();redraw();}},DATA.map((r,i)=>el('option',{value:i},`${i+1}. öğrenci ${r[0]}`)));row.value=state.row;
    const col=el('select',{'aria-label':'İncelenecek feature',onchange:e=>{state.col=Number(e.target.value);save();redraw();}},FEATURES.map((f,i)=>el('option',{value:i},f)));col.value=state.col;redraw();
    return [p('<b>X</b> bütün input tablosudur. <b>xᵗ</b>, t numaralı satırdaki feature vektörüdür. Küçük <b>t</b> örnek indeksidir; büyük <b>ᵀ</b> ise transpose’dur. Student harfi kimliktir, ölçüm değildir. Income sütunu yalnız öğretim amaçlı birimlerle verilmiştir.'),
      el('div',{class:'case-fields'},el('label',{},'Öğrenci',row),el('label',{},'Feature',col)),view,inspector,
      p('<b>N</b> örnek sayısı, <b>d</b> her örnekteki input feature sayısı. Kimlik ve target’ı d’ye ekleme.'),
      el('div',{class:'case-fields'},input('N = kaç öğrenci?','n'),input('d = kaç input feature?','d')),
      button('X’i okuyuşumu kontrol et',()=>report(parse(state.answers.n)===8&&parse(state.answers.d)===5,parse(state.answers.n)===8&&parse(state.answers.d)===5?'<b>Doğru: N = 8, d = 5.</b> X’in input şekli 8 × 5. r ise sekiz target içeren ayrı bir vektördür.':'Satırları ve beş ölçüm sütununu ayrı say. Student ID ve Support/Ready target’ı feature değildir.'))];
  }
  function evaluation(){
    return [p('Veriyi okumak, tahmin kuralını bilmek demek değil. Tek bir aday kural <b>hypothesis h</b>; izin verdiğimiz adayların kümesi <b>H</b>’dir. <b>Training</b> örnekleriyle kuralın parametrelerini öğreniriz.'),
      p('Sekiz satır konuyu görmemiz içindi. Aşağıdaki hata oranları, daha büyük <b>kurgu bir değerlendirme</b> için verilmiş sonuçlardır; sekiz öğrenciden hesaplanmış oranlar değildir. Daha esnek C modeli training’i kusursuz tutturuyor.'),
      table(['Model','Training error','Validation error'],[['A · çok basit','%30','%32'],['B · orta esneklik','%8','%12'],['C · çok esnek','%0','%30']]),
      choice('Which model should we select using validation error?', ['B','C','A'],0,[
        '<b>B.</b> Yeni örnekleri temsil eden validation’da en düşük hata %12. C’nin training–validation farkı overfitting işareti; A her iki sette de yetersiz: underfitting.',
        'C training’i tutturmuş ama validation hatası %30. Sıfır training error, generalization garantisi değildir.',
        'A’nın iki hatası da yüksek. Fazla basit model underfit olabilir; burada B validation’da daha iyi.'
      ],'validation'),
      details('Training, validation, test: üç ayrı iş',p('<b>Training</b> öğrenir; <b>validation</b> model/ayar seçer; <b>test</b> seçilmiş modelin son performansını ölçer. Dersin örnek oranı %50 / %25 / %25. Test’e tekrar tekrar bakıp model seçersek onu validation gibi kullanmış oluruz.'),p('<b>K-fold CV</b>: K − 1 fold ile eğit, kalan fold’da değerlendir; held-out fold’u değiştir ve K sonucu ortala. Final test yine ayrı kalır.')),
      details('Çıktı sayı olsaydı: loss ve residual',p('Dersin regression örneğinde residual’lar −5, 2, 5, −5, 3. <b>MAE</b> = (5+2+5+5+3)/5 = 4. <b>MSE</b> = (25+4+25+25+9)/5 = 17.6. İşaretli toplam yerine mutlak değer/kare, hataların birbirini silmesini önler.'),p('<b>Model</b> hangi tahminleri yapabileceğini; <b>loss</b> hatanın ölçüsünü; <b>optimization</b> onu nasıl azaltacağını belirler. Birden fazla h aynı training verisine uyabilir; aralarında kullandığımız tercih <b>inductive bias</b>’tır. Bu, neuron’daki sabit bias teriminden farklıdır.'))];
  }
  function selection(){
    const result=el('div',{class:'case-symbol-detail','aria-live':'polite'});
    const update=()=>{const keep=state.selected.map(i=>FEATURES[i]);result.innerHTML=`<b>N = 8</b> değişmedi. Şimdi <b>d = ${keep.length}</b>. Tutulan orijinal sütunlar: ${keep.length?keep.join(', '):'henüz yok'}. Öğrencileri değil, ölçümleri azaltıyorsun.`;};
    const picks=el('div',{class:'case-options'},FEATURES.map((f,i)=>el('label',{},el('input',{type:'checkbox',checked:state.selected.includes(i),onchange:e=>{state.selected=e.target.checked?[...state.selected,i].sort((a,b)=>a-b):state.selected.filter(v=>v!==i);changed();update();}}),f)));update();
    return [p('Beş ölçümün hepsini her zaman kullanmak zorunda değiliz. Bu denemede yalnız <b>GPA</b> ile <b>Study hours</b>’ı tut. Bu bir alıştırma seçimi; bu ikilinin yeni veride en iyi olduğunu henüz göstermedik.'),p('Seçtiğin değerlerin anlamı değişmiyor: GPA yine GPA. Buna <b>feature selection</b> denir. Sütunları birleştirip yeni z koordinatı üretmek ise <b>feature extraction</b> olur.'),picks,result,
      button('Feature seçimimi kontrol et',()=>{const ok=state.selected.length===2&&state.selected.includes(1)&&state.selected.includes(3);report(ok,ok?'<b>Doğru.</b> N = 8, d = 2. İki orijinal feature kaldı: selection. Sonraki bölümde bu iki sütunu başka bir eksene yansıtıp extraction yapacağız.':'Yalnız GPA ve Study hours işaretli kalsın. N satır sayısıdır; iki sütunu tutmak N’yi ikiye indirmez.');}),
      details('Bu seçimi model nasıl arardı?',p('<b>Forward selection</b> boş kümeyle başlar; her turda bir feature eklemeyi dener. <b>Backward selection</b> bütün feature’larla başlar; birini çıkarmayı dener. Seçim, <b>validation error</b> ile karşılaştırılır. d feature için 2ᵈ alt küme vardır; greedy adımlar bütün alt kümeler içinde en iyiyi garanti etmez.'))];
  }
  const meanGPA=DATA.reduce((s,r)=>s+r[2],0)/8, meanStudy=DATA.reduce((s,r)=>s+r[4],0)/8;
  const centered=DATA.map(r=>[r[2]-meanGPA,r[4]-meanStudy]);
  const cov=(a,b)=>centered.reduce((s,r)=>s+r[a]*r[b],0)/8;
  const bestAngle=Math.atan2(2*cov(0,1),cov(0,0)-cov(1,1))/2*180/Math.PI;
  const variance=angle=>{const a=angle*Math.PI/180;return centered.reduce((s,r)=>s+(r[0]*Math.cos(a)+r[1]*Math.sin(a))**2,0)/8;};
  function pca(){
    const view=el('div',{'aria-live':'polite'});
    function draw(){
      const a=state.angle*Math.PI/180,w=[Math.cos(a),Math.sin(a)];
      view.replaceChildren(svgPlot(s=>{
        const pos=([x,y])=>[300+x*42,133-y*42];
        s('line',{x1:80,y1:133,x2:520,y2:133,stroke:'var(--line-2)'});s('line',{x1:300,y1:20,x2:300,y2:235,stroke:'var(--line-2)'});
        const e1=pos(w.map(v=>v*-2.4)),e2=pos(w.map(v=>v*2.4));
        s('line',{x1:e1[0],y1:e1[1],x2:e2[0],y2:e2[1],stroke:'var(--accent)','stroke-width':2});
        centered.forEach((v,i)=>{
          const z=v[0]*w[0]+v[1]*w[1],pt=pos(v),proj=pos(w.map(c=>c*z));
          s('line',{x1:pt[0],y1:pt[1],x2:proj[0],y2:proj[1],stroke:'var(--line-2)','stroke-dasharray':'3 3'});
          s('circle',{cx:pt[0],cy:pt[1],r:5,fill:state.labels?(DATA[i][6]?'var(--kernel)':'var(--accent)'):'var(--muted)'});
          s('text',{x:pt[0]+([0,1,3,5].includes(i)?-8:8),y:pt[1]-5,'text-anchor':[0,1,3,5].includes(i)?'end':'start'},DATA[i][0]+(state.labels?` · ${DATA[i][6]}`:''));
          s('circle',{cx:proj[0],cy:proj[1],r:3,fill:'var(--accent)'});
        });
        s('text',{x:580,y:285,'text-anchor':'end'},'centered GPA →');s('text',{x:20,y:18},'↑ centered study hours');
      },`Centered öğrenci verisi; projection yönü ${state.angle} derece. Noktalı çizgiler yeni eksene yansımayı gösterir.`),
      metrics([[`${state.angle}°`,'Seçtiğin eksen'],[fmt(variance(state.angle)),'Projection variance'],[`${fmt(bestAngle)}°`,'PC1: en yüksek variance yönü']]),
      p(`<b>z = wᵀx</b>: centered x ile birim yön w’nin dot product’ı. C öğrencisinin yeni koordinatı <b>z³ = ${fmt(centered[2][0]*w[0]+centered[2][1]*w[1])}</b>. Buradaki x, GPA ve Study hours’ın ortalamaları çıkarılmış ikilisidir.`));
    }
    draw();
    return [p('Bu bölüm, ortak başlangıç olarak <b>GPA + Study hours</b> kullanır. Önce her sütunun ortalamasını çıkarıyoruz: GPA ortalaması <b>2.7</b>, study hours ortalaması <b>2.875</b>. Satırlar aynı; yalnız koordinatlar değişiyor.'),
      p('Slider’ı döndür. Büyük noktalar öğrenciler; küçük noktalar yeni eksene <b>projection</b>’larıdır. <b>PCA</b>, bu yeni koordinatların variance’ını en çok koruyan yönü seçer. Bu çizimde ölçümler kendi birimlerinde, yalnız centered olarak kullanıldı.'),
      range('Projection yönü (derece)','angle',-90,90,1,draw),
      el('label',{class:'case-options'},el('input',{type:'checkbox',checked:state.labels,onchange:e=>{state.labels=e.target.checked;save();draw();}}),' Class label’larını göster (0 / 1)'),view,
      choice('If we show the labels, does PCA change its objective?', ['Yes: separate Support and Ready','No: still maximize projection variance','Yes: predict every label correctly'],1,[
        'PCA class label’larını kullanmaz. Label bilgisiyle class separation aramak, dersin LDA karşılaştırmasının tarafıdır.',
        '<b>Doğru.</b> Görselde label göstermek, PCA’yı supervised yapmaz. N = 8 kalır; d = 2 → 1 olur. Maximum variance, maximum class separation değildir.',
        'Variance, accuracy değildir. Bir projection’ın sınıflamaya yardım edip etmediği ayrıca held-out veride değerlendirilir.'
      ],'pca'),
      details('PC2 ve LDA ile bağlantısı',p('<b>PC2</b>, PC1’e diktir ve sonraki en büyük variance’ı korur. Burada tek koordinat tuttuğumuz için onu atıyoruz. <b>LDA</b> bilinen class’ları kullanır; PCA kullanmaz. İkisi de orijinal sütun seçmek yerine yeni koordinatlar oluşturur.'))];
  }
  function modelForm(){
    return [p('Aynı supervised işi farklı model aileleriyle çözebiliriz. Bir straight-line model seçersek <b>g(x) = w₁x + w₀</b> biçimini önceden belirlemiş oluruz; öğrenilecek şey weight’lerdir. Ağaçta ise sorular ve dallanma yapısı veriden öğrenilir.'),
      table(['Karar','Öğrenmeden önce','Öğrenmede'],[['Lineer biçim','g(x) = w₁x + w₀ seçilir','w₁ ve w₀ bulunur'],['Decision tree','Ağaçla temsil edilir','Sorular / dallar / yapı seçilir']]),
      select('The fixed linear form is…','linear',[['non','Nonparametric'],['param','Parametric']]),
      select('A tree whose structure is learned from data is…','tree',[['non','Nonparametric'],['param','Parametric']]),
      button('Model ayrımını kontrol et',()=>{const ok=state.answers.linear==='param'&&state.answers.tree==='non';report(ok,ok?'<b>Doğru.</b> Dersin predefined mapping function ayrımıyla lineer biçim parametric, veriden büyüyen tree nonparametric. İkisi de label’larla öğrenebilir: bu ayrım supervised/unsupervised ayrımı değildir.':'Parametric, biçimi önceden seçip parametreleri öğrenmektir. Nonparametric “hiç ayarı veya sayısı yok” demek değildir; tree’nin de split ve stopping seçimleri vardır.');})];
  }
  function clustering(){
    const visual=el('div',{'aria-live':'polite'});
    function draw(){
      visual.replaceChildren(svgPlot(s=>{
        const x=v=>70+(v-1)*110;
        s('line',{x1:70,y1:245,x2:510,y2:245,stroke:'var(--line-2)'});
        [1,2,3,4,5].forEach(v=>s('text',{x:x(v),y:270,'text-anchor':'middle'},v));
        DATA.forEach((r,i)=>{const y=30+i*23,g=state.assignments[i];if(g!=null)s('line',{x1:x(r[4]),y1:y,x2:x(g?5:1),y2:225,stroke:g?'var(--kernel)':'var(--accent)',opacity:.25});s('circle',{cx:x(r[4]),cy:y,r:5,fill:g===null?'var(--muted)':g?'var(--kernel)':'var(--accent)'});s('text',{x:x(r[4])+9,y:y+4},`${r[0]} · ${r[4]}`);});
        s('text',{x:70,y:230,'text-anchor':'middle'},'m₁ = 1');s('text',{x:510,y:230,'text-anchor':'middle'},'m₂ = 5');s('text',{x:265,y:295},'Study hours →');
      },'Sekiz öğrenci çalışma saatine göre merkez 1 veya 5’e atanıyor. Harfler öğrencileri gösterir.'));
    }
    const rows=el('div',{class:'case-assignments'},DATA.map((r,t)=>{
      const row=el('div',{class:'case-assign-row'},el('b',{},`${r[0]} · x${['¹','²','³','⁴','⁵','⁶','⁷','⁸'][t]} = ${r[4]}`));
      [0,1].forEach(g=>row.append(button(g?'Cluster 2':'Cluster 1',()=>{state.assignments[t]=g;changed();row.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===g)));draw();},{'aria-label':`${r[0]}: cluster ${g+1}`,'aria-pressed':String(state.assignments[t]===g)})));return row;
    }));draw();
    return [p('Şimdi <b>target label’larını kullanmıyoruz</b>. Yalnız study hours’a bakıp benzer çalışma süresine sahip öğrencileri gruplayalım. Bu yeni görünümde <b>N = 8, d = 1, k = 2</b>. PCA’dan gelen z yerine, yorumlaması kolay orijinal study hours sütununa döndük.'),
      p('Başlangıç merkezleri <b>m₁ = 1</b>, <b>m₂ = 5</b>. Her öğrenciyi en yakın merkeze ata. D = 3 iki merkeze eşit uzaklıkta; bu alıştırmanın <b>tie kuralı cluster 1</b>. Cluster numarası bir class adı değildir.'),visual,rows,
      button('Atamaları kontrol et',()=>{
        const expected=DATA.map(r=>r[4]<=3?0:1),bad=state.assignments.findIndex((g,i)=>g!==expected[i]);
        if(bad>=0){const r=DATA[bad];return report(false,`${r[0]} için ölçüm ${r[4]}. m₁’e uzaklık ${Math.abs(r[4]-1)}, m₂’ye ${Math.abs(r[4]-5)}. En yakını seç; eşitse burada cluster 1. Önce sekiz öğrencinin hepsini ata.`);}
        report(true,'<b>Doğru.</b> G₁ = {A, B, C, D, G}, G₂ = {E, F, H}. C üçüncü örnek: <b>b₁³ = 1, b₂³ = 0</b>. Bu b, üyelik göstergesi; neuron bias’ı değil. Update sonrası m₁ = 9/5 = 1.8, m₂ = 14/3 ≈ 4.667. Sonra bu yeni merkezlerle tekrar assignment gerekir; burada yalnız ilk turu yaptık.');
      }),
      details('Ata → ortala → tekrar ata; sonra ne?',p('<b>k-means</b> her turda en yakın merkeze atar, sonra her merkezin kendi grubunun ortalamasını alır. Burada k = 2 bir input’tur; öğrenilen class sayısı değildir. <b>E</b>, noktaların atanmış merkezlerine squared distance toplamıdır.'),p('<b>Encoding</b> bu temsilciyi kullanabilir: codebook iki tarafta biliniyorsa merkez index’ini gönder; decoder temsilciyi geri verir. <b>Hierarchical clustering</b> ise ayrı bir yol: grupları adım adım birleştirip dendrogram üretir; single-link en yakın, complete-link en uzak çift uzaklığına bakar.'),p('<a href="case.html">Tam k-means döngüsünü beş noktalı Week 4 case’inde yap.</a>'))];
  }
  function soft(){
    const view=el('div',{'aria-live':'polite'});
    const draw=()=>{
      const bar=el('div',{class:'case-class-bar','aria-hidden':'true'},el('span'),el('span'));bar.children[0].style.width=`${state.soft*100}%`;bar.children[1].style.width=`${(1-state.soft)*100}%`;
      view.replaceChildren(p(`<b>γ₁ᴰ = ${fmt(state.soft)}</b> · <b>γ₂ᴰ = ${fmt(1-state.soft)}</b> · toplam = 1`),bar,p('γ üyelik olasılığını gösterir. Burada D harfi öğrenciyi tanımlar; genel notasyon γᵢᵗ ile aynı fikirdir.'));
    };draw();
    return [p('D öğrencisi başlangıç merkezlerine eşit uzaklıktaydı. Hard assignment’ta tie kuralıyla yine <b>tek cluster</b> seçtik. Soft modelde ise D için her cluster’a ait olma olasılığı tutulabilir.'),p('Slider’daki olasılıklar <b>gösterim için verilmiş örnekler</b>; önceki k-means mesafelerinden veya bir EM fit işleminden hesaplanmıyor. Slider bir üyeliği artırırken diğerini azaltır.'),range('D’nin cluster 1 membership olasılığı','soft',0,1,.05,draw),view,
      choice('What does membership (0.7, 0.3) mean?', ['Two hard assignments of 1','A known Support/Ready target','Probabilistic membership across two clusters'],2,[
        'Hard clustering’de tek cluster seçilir: (1,0) veya (0,1). İki üyeliğin de 1 olması bu iki-cluster gösterimine uymaz.',
        'Bunlar class label değil, cluster üyelikleri. Label’ları clustering’den önce kaldırmıştık.',
        '<b>Doğru.</b> Olasılıklar bir dağılım oluşturur. Dersin EM anlatımında <b>E-step</b> mevcut modelle soft membership’leri; <b>M-step</b> bu üyeliklerle μ / σ² parametrelerini günceller.'
      ],'soft'),p('<b>μ</b> merkez/ortalama; <b>σ²</b> variance/yayılım. Hard–soft üyeliği; supervised–unsupervised label bilgisini; parametric–nonparametric model biçimini anlatır. Üç ayrı eksen.')];
  }
  function tree(){
    const view=el('div',{'aria-live':'polite'}),fields=el('div');
    function draw(){
      const index=state.split==='study'?4:3,left=DATA.filter(r=>r[index]<=state.threshold),right=DATA.filter(r=>r[index]>state.threshold);
      const weighted=(left.length*entropy(left)+right.length*entropy(right))/8;
      view.replaceChildren(p(`<b>Root sorusu:</b> ${state.split==='study'?'Study hours':'Attendance'} ≤ ${state.threshold}${state.split==='attendance'?'%':''}?`),labelBar(DATA),
        el('div',{class:'case-split'},[left,right].map((rows,i)=>el('section',{class:'case-branch'},el('h3',{},i?'Hayır → right child':'Evet → left child'),p(rows.map(r=>r[0]).join(', ')||'Boş'),labelBar(rows),p(`<b>Entropy = ${fmt(entropy(rows))}</b>`)))),
        metrics([['1','Root entropy (4 / 4)'],[fmt(weighted),'Weighted child entropy'],[fmt(1-weighted),'Information gain']]));
    }
    function drawFields(){
      const options=state.split==='study'?[1,2,3,4]:[40,50,60,70,80,90];
      const threshold=el('select',{id:'tree-threshold',onchange:e=>{state.threshold=Number(e.target.value);changed();draw();}},options.map(n=>el('option',{value:n},`≤ ${n}`)));threshold.value=state.threshold;
      fields.replaceChildren(el('label',{class:'case-select',for:'tree-threshold'},'Root threshold',threshold));
    }
    const feature=el('select',{id:'tree-feature',onchange:e=>{state.split=e.target.value;state.threshold=state.split==='study'?1:60;changed();drawFields();draw();}},el('option',{value:'attendance'},'Attendance'),el('option',{value:'study'},'Study hours'));feature.value=state.split;
    drawFields();draw();
    return [p('Şimdi tekrar <b>bilinen Support/Ready label’larıyla supervised</b> öğrenmeye dönelim. Sekiz öğrencinin dördü 0, dördü 1: iki class için fifty-fifty, <b>entropy = 1</b>. Tek class’lı pure node’da entropy = 0 olur.'),p('Bir <b>decision tree</b> sorusunu seç. Soruya “evet” diyenleri sola, “hayır” diyenleri sağa gönderiyoruz. Hedef: child’ların <b>weighted entropy</b>’sini azaltmak; yani information gain’i artırmak. Daha çok örnek içeren child daha ağır basar.'),el('label',{class:'case-select',for:'tree-feature'},'Root feature',feature),fields,view,
      button('En iyi split’i kontrol et',()=>{
        const ok=state.split==='study'&&state.threshold===2;
        report(ok,ok?'<b>Study hours ≤ 2.</b> Sol: A, B, C, G → hepsi Support. Sağ: D, E, F, H → hepsi Ready. İki leaf de pure; weighted entropy = 0, gain = 1. Bu küçük training verisinde kusursuz ayrım, bütün yeni öğrenciler için garanti değildir.':'Study hours ve farklı threshold’ları karşılaştır. Hangi soruda iki child da tek class içeriyor? Attendance ≤ 60’ta sağ child 1 Support + 4 Ready; hâlâ karışık.');
      }),
      details('Tree’yi kullanma, regression leaf ve pruning',p('<b>G</b> için study hours = 1: “≤ 2?” evet → Support leaf. Her node’da tek dal izlenir. <b>Decision node</b> soru; <b>branch</b> cevap; <b>leaf</b> tahmindir.'),p('Target sayı olsaydı <b>regression tree</b> leaf’i ortalama verebilirdi. Ders örneğinde 2, 4, 6 → prediction 4, MSE = 8/3. Daha fazla split training hatasını azaltabilir ama overfit edebilir. <b>Prepruning</b> büyürken durur; <b>postpruning</b> büyümüş subtree’leri kaldırır. Ders ayrı pruning set kullanır.'))];
  }
  function neuron(){
    const view=el('div',{'aria-live':'polite'});
    const draw=()=>{
      const rows=[[0,0],[0,1],[1,0],[1,1]].map(([x1,x2])=>{
        const a=x1+x2+state.bias,prob=1/(1+Math.exp(-a));
        return [`[${x1}, ${x2}]`,fmt(a),fmt(prob),prob>=.5?'1 · Ready':'0 · Support',x1&&x2?'1':'0'];
      });
      view.replaceChildren(p(`<b>a = wᵀx + w₀ = x₁ + x₂ ${state.bias<0?'−':'+'} ${fmt(Math.abs(state.bias))}</b>. Sabit weight’ler: w₁ = w₂ = 1. Bias w₀ = ${fmt(state.bias)}.`),
        scrollTable(['Input x','Weighted sum a','Sigmoid(a)','Prediction (≥ 0.5)','AND target'],rows),
        p(`<b>G öğrencisi:</b> attendance = 90%, study hours = 1 → x = [1, 0]ᵀ. wᵀx = [1, 1] · [1, 0]ᵀ = 1. Bias eklenince a = ${fmt(1+state.bias)}.`));
    };draw();
    return [p('Neuron için iki <b>yeni binary feature</b> üretelim: <b>x₁ = attendance ≥ 65%</b>, <b>x₂ = study hours ≥ 3</b>. Bu farklı bir temsil; az önceki x₁ = Age sütun numarasıyla karıştırma. Bu küçük veride Ready label’ı, ikisi de 1 olduğunda 1: <b>AND</b>.'),p('<b>w</b> weight vektörü, <b>x</b> input vektörü. <b>ᵀ</b> transpose, sütunu satıra çevirir: (1 × 2) · (2 × 1) = tek sayı. Bias <b>w₀</b>, sabit input <b>x₀ = 1</b>’in weight’idir. ax + b’deki b ile aynı rolü görür.'),p('Yalnız bias’ı kaydır. Sigmoid çıktısı ≥ 0.5 ise 1 tahmin ediyoruz. Dört input kombinasyonunda da AND target’ını tutturacak bias’ı bul.'),range('Bias w₀ (ağırlıklar aynı kalıyor)','bias',-2,.5,.5,draw),view,
      button('Neuron’u kontrol et',()=>{const ok=state.bias>=-2&&state.bias<-1;report(ok,ok?'<b>Bu bias ile AND elde ettin.</b> Tek bir 1 toplamı eşiğe yetmez; iki 1 yeter. −2’de [1,1] tam eşikte, sigmoid = 0.5 olduğu için kuralımıza göre 1 olur. −1.5 de AND verir; −0.5 ise OR olurdu. Bias boundary’yi kaydırır; bias yoksa boundary orijinden geçer.':'Tek 1 olan input’larda çıktı 0; iki 1 olan input’ta 1 olmalı. −0.5 OR üretir. −1’de tek 1 olan input’lar da tam eşikte kalır ve kuralımıza göre 1 olur. Daha negatif bir bias dene: −1.5 veya −2.');})];
  }
  function activation(){
    const view=el('div');let mode='binary';
    const draw=()=>{
      if(mode==='binary')view.replaceChildren(p('Şimdiki görev: <b>Support / Ready</b>, iki output class. Bir sigmoid çıktısı P(Ready) verebilir; örneğin a = 0 → 0.5. Beş input feature olması beş output class olduğu anlamına gelmez.'));
      else view.replaceChildren(p('Görevi değiştirdiğimizi varsay: artık <b>üç output class</b> istiyoruz. Bu, eski iki-class modelin kendiliğinden yeni label öğrenmesi değil; yeni target tanımı gerektirir. Dersin skor örneği:'),table(['Class','Score','Softmax probability'],[['Class 1',2,'0.665'],['Class 2',1,'0.245'],['Class 3',0,'0.090']]),p('Olasılıklar toplamı 1. En yüksek olasılık class 1’de. <b>Softmax</b>’ın output sayısı, input feature sayısına değil class sayısına bağlı.'));
    };draw();
    const tabs=el('div',{class:'case-options'},['binary','multi'].map((m,i)=>button(i?'Üç-class görev':'İki-class görev',()=>{mode=m;tabs.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));draw();},{'aria-pressed':String(i===0)})));
    return [p('<b>Activation</b>, weighted sum’ı çıktıya dönüştürür. Network’ün içinde her <b>forward pass</b>’te uygulanır: training sırasında da prediction sırasında da. Başta bir kez yapılan preprocessing değildir.'),tabs,view,
      select('One output probability for our binary task:','binary',[['soft','Softmax with five outputs'],['sig','Sigmoid'],['none','No activation during prediction']]),
      select('One probability for each of three output classes:','multi',[['soft','Softmax with three outputs'],['sig','One sigmoid because there is one dataset'],['five','Five outputs because there are five input features']]),
      button('Activation seçimini kontrol et',()=>{const ok=state.answers.binary==='sig'&&state.answers.multi==='soft';report(ok,ok?'<b>Doğru.</b> Binary: sigmoid. Üç class: üç softmax probability. Activation her forward pass’te kullanılır; training’de backpropagation ilgili türevleri de kullanır.':'Binary task için bir sigmoid, multiclass için her class’a bir softmax çıktısı düşün. Input sütunlarının sayısı output class sayısı değildir.');}),
      details('Hidden layer’da neden nonlinearity gerekir?',p('<b>tanh</b> (−1,1), <b>ReLU</b> max(0,a) üretir. Linear activation regression’da doğrudan toplam verebilir. Yalnız linear layer’ları üst üste koyarsak yine linear model olur.'),p('Dersin <b>XOR</b> örneğinde tek boundary yetmez. Hidden unit’ler x₁ AND NOT x₂ ve NOT x₁ AND x₂ bölgelerini yakalar; output OR ile birleştirir. Nonlinear hidden yapı iki ayrı pozitif köşeyi ayırabilir.'))];
  }
  function learning(){
    const view=el('div',{'aria-live':'polite'});
    const loss=w=>.5*(.5-1.5*w)**2;
    const draw=()=>{
      const next=.8-state.rate*1.05;
      view.replaceChildren(svgPlot(s=>{
        const x=w=>70+(w+.6)/1.6*460,y=e=>245-e*220;
        let d='';for(let i=0;i<=100;i++){const w=-.6+1.6*i/100;d+=`${i?'L':'M'}${x(w)},${y(loss(w))} `;}
        s('path',{d,fill:'none',stroke:'var(--line-2)','stroke-width':2});
        s('line',{x1:x(.8),y1:y(loss(.8)),x2:x(next),y2:y(loss(next)),stroke:'var(--accent)','stroke-width':2});
        s('circle',{cx:x(.8),cy:y(loss(.8)),r:6,fill:'var(--muted)'});s('text',{x:x(.8)-8,y:y(loss(.8))-12,'text-anchor':'end'},'başlangıç w = 0.8');
        s('circle',{cx:x(next),cy:y(loss(next)),r:6,fill:'var(--accent)'});s('text',{x:x(next),y:y(loss(next))-13,'text-anchor':'middle'},`yeni w = ${fmt(next)}`);
        s('text',{x:20,y:20},'Loss E ↑');s('text',{x:580,y:285,'text-anchor':'end'},'weight w →');s('text',{x:x(1/3),y:267,'text-anchor':'middle'},'minimum');
      },`Learning rate ${state.rate}; weight 0.8’den ${fmt(next)} değerine gider. Loss 0.245’ten ${fmt(loss(next))} değerine değişir.`),
      metrics([[fmt(state.rate),'Learning rate η'],[fmt(next),'Yeni weight'],[fmt(loss(next)),'Yeni loss (önce 0.245)']]),p(`Bir update: <b>w ← 0.8 − ${fmt(state.rate)} × 1.05 = ${fmt(next)}</b>. ${loss(next)>loss(.8)?'Adım minimumu fazla aştı; error büyüdü.':'Bu adım error’ı azalttı.'}`));
    };draw();
    return [p('Öğrenme adımını görebilmek için network’ü <b>dersin tek-weight örneğine</b> yaklaştırıyoruz: x = 1.5, target r = 0.5, w = 0.8; linear output y = xw = 1.2. Bunlar sekiz öğrencinin class label’ları değil; ayrı bir sayısal yakın plan.'),p('Loss E = ½(r−y)² = <b>0.245</b>. Gradient ∂E/∂w = <b>1.05</b>, yani burada w’yi azaltmalıyız. <b>Learning rate / factor η</b> ne kadar azaltacağımızı belirler. 0.1 ile 1.2’yi karşılaştır; her deneme aynı 0.8 başlangıcından <b>tek update</b> yapar.'),range('Learning rate η','rate',.01,1.2,.01,draw),view,
      choice('Why can an excessively large learning rate increase the loss?', ['It removes the target labels','It can overshoot the minimum','It makes every gradient zero'],1,[
        'Learning rate, target’ı kaldırmaz; update’in büyüklüğünü ölçekler.',
        '<b>Doğru.</b> Yön doğru olsa bile adım çok büyük olabilir. Çok küçük η ise slow convergence’a yol açabilir. Her probleme uyan tek “doğru” η yok.',
        'Gradient loss’tan hesaplanır; η onu sıfırlamaz. Burada sabit ilk gradient 1.05, değişen adım büyüklüğü.'
      ],'rate'),
      details('Forward, backward, update ve slayt çelişkisi',p('<b>Forward</b>: mevcut weight’lerle output üret. <b>Loss</b>: target ile farkı ölç. <b>Backpropagation</b>: chain rule ile output’tan geriye gradient’leri bul. <b>Update</b>: gradient ve learning rate ile weight’leri değiştir. Prediction için forward yeterlidir; öğrenme weight update’i gerektirir.'),p('Mevcut ders notunda slayt çelişkisi işaretlenmiş: slides 8–10’daki Δw işareti worked example ile uyuşmuyor; loss da 0.249 / 0.245 / 0.49 olarak geçiyor. Burada ½(r−y)² tanımıyla <b>0.245</b> ve <b>w ← w − η ∂E/∂w</b> kullanıldı. <a href="learn.html?ch=6">Week 6 açıklaması</a>.'))];
  }
  const RECAP = [
    ['Learning types','Input + known target → supervised classification. No target → unsupervised. Action + reward → reinforcement.'],
    ['X, xᵗ, rᵗ','X: inputs, 8 × 5. xᵗ: one input vector. rᵗ: separate target.'],
    ['Generalization','Training learns; validation selects; test reports final performance.'],
    ['Selection / extraction','Selection keeps original columns. Extraction creates new coordinates.'],
    ['PCA / LDA','PCA: maximum variance, no labels. LDA: uses known classes.'],
    ['Parametric / nonparametric','Predefined function vs structure learned from data; separate from label availability.'],
    ['k-means','Assign to nearest center → update means → repeat. Cluster is not a known class.'],
    ['Hard / soft','Hard: one cluster. Soft: membership probabilities. E-step memberships; M-step parameters.'],
    ['Entropy / tree','Pure → 0. Binary 50/50 → 1. Choose lower weighted child entropy / higher gain.'],
    ['Transpose / bias','wᵀx: scalar weighted sum. Bias shifts the boundary; fixed x₀ = 1.'],
    ['Activation','Every forward pass: training AND prediction. Binary sigmoid; multiclass softmax.'],
    ['Learning rate','Scales the update. Too small: slow; too large: possible overshoot.']
  ];
  function recap(){
    const count=state.done.filter(Boolean).length;
    return [p('Aynı projede önce <b>öğrenilecek işi</b>, sonra <b>input temsilini</b> ve <b>modeli</b> seçtik. Label’ları kaldırınca classification’dan clustering’e geçtik; geri koyunca tree ve neuron ile tahmin yaptık. Bunlar zorunlu tek bir algorithm pipeline’ı değil, aynı veriye sorulan farklı sorulardı.'),
      p(`<b>${count} / 12 bölüm kontrol edildi.</b> Tamamlanmayan bölüme doğrudan dönebilirsin. Bu case’in bitmesi, ayrı understanding test’in sonucunu değiştirmez.`),
      el('ol',{class:'case-report'},RECAP.map(([title,answer],i)=>el('li',{},button(`${title} · ${state.done[i]?'kontrol edildi':'kontrol et'}`,()=>move(i)),details('English keywords',p(answer))))),
      button(state.finished?'Case tamamlandı':'Case’i tamamla',()=>{
        const missing=state.done.findIndex(v=>!v);
        if(missing>=0)return report(false,`Henüz kontrol edilmeyen bölümler var. Önce <b>${missing+1}. ${SHORT[missing]}</b> bölümüne dön; cevaplarını kontrol et.`);
        state.finished=true;save();if(window.CS)CS.progress.markVisited('ml-course-case-complete');report(true,'<b>Case tamamlandı.</b> Şimdi Midterm özeti ile 10 öncelikli konuyu toparla; mock’ta gerekçeni yardım almadan kur.');
      }),p('<a href="ozet.html">Midterm özeti</a> · <a href="mock.html">Mock midterm</a> · <a href="case.html">Week 4: tam k-means döngüsü</a>')];
  }
  const BUILD = [mission,notation,evaluation,selection,pca,modelForm,clustering,soft,tree,neuron,activation,learning,recap];
  function render(){
    stage=el('section',{class:'case-stage'},el('div',{class:'case-kicker'},state.step===12?'Proje defteri':`Week ${WEEKS[state.step]} · ${state.done[state.step]?'kontrol edildi':'birlikte çalış'}`),el('h2',{tabindex:-1},`${state.step+1}. ${TITLES[state.step]}`));
    fb=el('div',{'aria-live':'polite','aria-atomic':'true'});path=el('ol',{class:'case-path','aria-label':'Case bölümleri'});controls=el('div',{class:'case-controls'});progress=el('div',{class:'case-progress'});
    const confirm=el('div',{class:'case-reset-confirm',hidden:true},p('Bu case’in seçimlerini ve kaldığın yeri sıfırlayalım mı? Diğer ders ilerlemen korunur.'),button('Evet, bu case’i sıfırla',()=>{state=fresh();feedback=null;save();render();}),button('Vazgeç',()=>{confirm.hidden=true;}));
    root.replaceChildren(el('header',{class:'case-top'},el('div',{},el('div',{class:'case-kicker'},'COE305 · Weeks 1–6 · Etkileşimli case study'),el('h1',{},'Veriden modele: bir öğrenci destek projesi'),p('Aynı veri, altı haftanın soruları. Türkçe açıklamalar, İngilizce kavramlar, senin değiştirdiğin modeller.')),button('Baştan başla',()=>{confirm.hidden=false;confirm.querySelector('button').focus();})),confirm,progress,path,stage);
    stage.append(...BUILD[state.step](),fb,controls);
    if(state.step<12)stage.append(el('a',{class:'case-case-link',href:`learn.html?ch=${WEEKS[state.step]}`},`Bu konunun Week ${WEEKS[state.step]} dersine dön`));
    root.append(el('details',{class:'case-sources'},el('summary',{},'Kaynaklar, örnek veri ve vize kapsamı'),p('Kavramlar mevcut COE305 Weeks 1–6 dersleri, quiz/kartları ve lablarından; vize öncelikleri paylaştığın konu notlarından alınmıştır. Ham slayt PDF’leri bu ortamda yok; mevcut, daha önce kontrol edilmiş site içeriği kullanıldı. Öğrenci tablosu ve model karşılaştırma oranları bu anlatım için üretilmiş öğretim verisidir; gerçek öğrenci kaydı veya gerçek değerlendirme sonucu değildir.'),p('Case altı haftayı bağlar. Vize notlarındaki 10 başlık önceliklidir. Generalization, ayrıntılı k-means / gain hesabı ve açılır ekler dersin bağlantılarını anlamak içindir; yeni sınav kapsamı veya soru garantisi değildir. Notlarında formül yazmaktan çok kavram ve neden üzerinde duruluyor. Eski muhtemel final konuları SVM, Random Forest vb. bu case’e eklenmedi.')));
    refresh();
  }
  new ResizeObserver(() => root.style.setProperty('--plot-font', `${7200 / Math.max(240,root.clientWidth)}px`)).observe(root);
  render();
})();
