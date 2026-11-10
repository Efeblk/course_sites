/* Practice only: derived from the internally checked ENS010 question bank. */
(() => {
'use strict';
const root=document.getElementById('exam');
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
const questions=COURSE.chapters.filter(c=>c.n>1).flatMap(c=>[1,4,7,10].map(i=>({...c.quiz[i],ch:c.n})));
window.MOCK=questions;
questions.forEach((q,i)=>{
 const section=el('section',undefined,'question'),box=el('fieldset'),legend=el('legend',`${i+1}. ${q.q}`),options=el('div',undefined,'options'),fb=el('p',undefined,'feedback');
 fb.hidden=true;fb.setAttribute('aria-live','polite');box.append(legend);section.append(el('p',`Lecture ${q.ch}`,'source'));
 q.options.forEach((opt,k)=>{const b=el('button',opt);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{options.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));fb.hidden=false;fb.textContent=`${k===q.answer?'Correct':'Incorrect'}. ${q.explain}`;CS.srs.grade(CS.srs.qId(COURSE.id,q.ch,q.q),k===q.answer);};options.append(b);});
 box.append(options,fb);section.append(box);root.append(section);
});
const written=[
 {q:'Describe the three steps of photoacoustic imaging. Explain how it differs from ultrasound.',ch:6,lines:['Laser pulse → absorption and electron excitation.','Relaxation → heat release.','Thermal expansion → thermoacoustic wave → ultrasound transducer.','PAI: light in, sound out. Ultrasound: sound in, sound out.']},
 {q:'Define amperometric, calorimetric and optical biosensors. Distinguish selectivity, sensitivity and limit of detection.',ch:7,lines:['Amperometric: current proportional to the bioreaction.','Calorimetric: heat produced or absorbed. Optical: change in light intensity.','Selectivity: target among interfering species.','Sensitivity: signal change with concentration.','Limit of detection: minimum detectable concentration.']}
];
written.forEach((q,i)=>{const section=el('section',undefined,'question'),label=el('label',`${25+i}. ${q.q}`),input=el('textarea'),button=el('button','Show model answer'),model=el('div',undefined,'model');input.id=`written-${i}`;label.htmlFor=input.id;model.id=`model-${i}`;model.hidden=true;model.lang='en';q.lines.forEach(line=>model.append(el('p',line)));button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',model.id);button.onclick=()=>{model.hidden=!model.hidden;button.setAttribute('aria-expanded',String(!model.hidden));button.textContent=model.hidden?'Show model answer':'Hide model answer';};section.append(el('p',`Lecture ${q.ch} · Written`,'source'),label,input,button,model);root.append(section);});
})();
