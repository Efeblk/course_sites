/* SWE307 exam calculations. Values/formulas: chapter 4 slides 26–43, 58–60;
 * channels: chapter 3 slide 44. */
(() => {
'use strict';
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[ri(0,a.length-1)],f=n=>Number.isInteger(n)?String(n):n.toFixed(2);
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
const weights={EI:[3,4,6],EO:[4,5,7],EQ:[3,4,6],ILF:[7,10,15],EIF:[5,7,10]};
function fp(){
 const counts=Object.fromEntries(Object.keys(weights).map(k=>[k,[ri(0,8),ri(0,5),ri(1,3)]]));
 const totals=Object.entries(counts).map(([k,ns])=>ns.reduce((sum,n,i)=>sum+n*weights[k][i],0)),ufp=totals.reduce((a,b)=>a+b,0);
 return {q:'Compute UFP from the full count table. Each count belongs to one complexity band.',table:counts,steps:[...Object.entries(counts).map(([k,ns],i)=>[k+' subtotal',ns.map((n,j)=>`${n} × ${weights[k][j]}`).join(' + ')+` = ${totals[i]}`,'Count × weight in each band, then add.']),['UFP = sum of row totals',totals.join(' + ')+` = ${ufp} FP`,'Do not add raw counts without their weights.']],values:{counts,totals,ufp}};
}
function adjusted(){
 const ufp=ri(10,60)*5,gsc=Array.from({length:6},()=>ri(0,5)),vaf=gsc.reduce((a,b)=>a+b,0),afp=ufp*(.65+.01*vaf);
 return {q:`UFP = ${ufp}. GSC ratings: ${gsc.join(', ')}; all other ratings are zero. Find VAF and AFP.`,steps:[['VAF = sum of GSC ratings',gsc.join(' + ')+` = ${vaf}`,'VAF in these slides is the sum, not the adjustment multiplier.'],['Adjustment multiplier = 0.65 + 0.01 × VAF',`0.65 + 0.01 × ${vaf} = ${f(.65+.01*vaf)}`,'Apply the course formula.'],['AFP = UFP × multiplier',`${ufp} × ${f(.65+.01*vaf)} = ${f(afp)} FP`,'Keep intermediate values unrounded.']],values:{ufp,gsc,vaf,afp}};
}
function critical(){
 // Same small DAG shape as the worked slide; freshly randomized durations, no tied branch lengths.
 let durations;do{durations=[ri(1,4),ri(1,6),ri(1,6),ri(1,3),ri(2,8),ri(1,5),ri(1,4),ri(1,2)];}while(durations[1]===durations[2]||durations[4]===durations[5]+durations[6]);const pred=[[],[0],[0],[1,2],[3],[3],[5],[4,6]],succ=pred.map(()=>[]);pred.forEach((ps,i)=>ps.forEach(j=>succ[j].push(i)));
 const te=[],tl=[];durations.forEach((d,i)=>te[i]=d+Math.max(0,...pred[i].map(j=>te[j])));for(let i=7;i>=0;i--)tl[i]=succ[i].length?Math.min(...succ[i].map(j=>tl[j]-durations[j])):te[7];const slack=te.map((x,i)=>tl[i]-x),path=slack.map((s,i)=>s===0?i+1:null).filter(Boolean);
 return {q:'Find TE (earliest completion), TL (latest completion), slack, project duration and critical path. Network: 1 → {2,3} → 4 → {5,6}; 6 → 7; {5,7} → 8. Durations (weeks): '+durations.map((d,i)=>`${i+1}=${d}`).join(', ')+'.',steps:[['Forward: TEᵢ = Dᵢ + max(predecessor TE)',te.map((t,i)=>`TE${i+1}=${durations[i]}+max(${pred[i].length?pred[i].map(j=>te[j]).join(','):'0'})=${t}`).join('; '),'Birleşmede bütün öncüller bitmiş olmalıdır.'],['Backward: TLᵢ = min(successor TL − successor D)',`TL8=${te[7]}; `+Array.from({length:7},(_,n)=>6-n).map(i=>`TL${i+1}=min(${succ[i].map(j=>`${tl[j]}−${durations[j]}`).join(',')})=${tl[i]}`).join('; '),'Sondan başa, ardılları geciktirmeyen en küçük sınır.'],['Slackᵢ = TLᵢ − TEᵢ',slack.map((s,i)=>`S${i+1}=${tl[i]}−${te[i]}=${s}`).join('; '),'Sıfır paylı işler kritiktir.'],['Critical path and duration',`${path.join('–')}; duration = ${te[7]} weeks`,'Bağımlı en uzun yol projenin en erken bitişini belirler.']],values:{durations,pred,succ,te,tl,slack,path}};
}
function channels(){const n=ri(3,10),channels=n*(n-1)/2;return {q:`A team has N=${n} people. How many pairwise communication channels exist?`,steps:[['Channels = N(N−1)/2',`${n}×${n-1}/2 = ${channels}`,'Her çifti yalnız bir kez say.']],values:{n,channels}};}
const generators=[['FPA count table → UFP','Ch4 s26–30',fp],['GSC → VAF → AFP','Ch4 s26–30',adjusted],['Critical path','Ch4 s58–65',critical],['Communication channels','Ch3 s44',channels]];
window.SWE307_DRILL={generators,weights};
const root=document.getElementById('drills');
generators.forEach(([name,src,generate],index)=>{const card=el('article',undefined,'drill');card.dataset.generator=String(index);let previous;
 function fresh(){let data;do{data=generate();}while(JSON.stringify(data.values)===previous);previous=JSON.stringify(data.values);card.replaceChildren(el('p',src,'source'),el('h2',`${index+1}. ${name}`),el('p',data.q));
 const input=el('textarea');input.setAttribute('aria-label',`Your working for ${name}`);input.placeholder='Kâğıttaki çözümünü istersen buraya da yaz.';if(data.table){const wrap=el('div',undefined,'scroll'),t=el('table',undefined,'t'),head=el('thead'),header=el('tr');['Unit','Low count','Average count','High count','Weights L/A/H'].forEach(h=>{const th=el('th',h);th.scope='col';header.append(th);});head.append(header);t.append(head);const body=el('tbody');Object.entries(data.table).forEach(([k,ns])=>{const row=el('tr');[k,...ns,weights[k].join(' / ')].forEach(v=>row.append(el('td',String(v))));body.append(row);});t.append(body);wrap.append(t);card.append(wrap);}card.append(input);
 const controls=el('div',undefined,'row'),next=el('button','Reveal next step'),newButton=el('button','New numbers'),steps=el('ol');steps.setAttribute('aria-live','polite');let shown=0;next.onclick=()=>{const s=data.steps[shown++],li=el('li');li.append(el('strong',s[0]),el('p',s[1]),el('p',s[2],'muted'));steps.append(li);if(shown===data.steps.length){next.disabled=true;next.textContent='All steps revealed';}};newButton.onclick=fresh;controls.append(next,newButton);card.append(controls,steps);card.dataset.values=JSON.stringify(data.values);
 }fresh();root.append(card);});
})();
