/* COE303 mock midterm, chapters 1-6. Sources: chapter 1-6 slides and the producer-consumer deck.
 * Each paper follows the format on the chapter 1 and 4 slides: 10 short + 2 long questions.
 * Gantt answers were computed with sched.js and match the slide rules. */
(() => {
const papers = [
 {short: [
  {ch:1,q:'Name the two roles of an operating system.',o:['Compiler and linker','Allocator and control program','Browser and shell','Registers and memory'],a:1,why:'The OS shares resources and controls their use.'},
  {ch:1,q:'A device finishes its work. What signals the CPU?',o:['A new compiler','An application window','An interrupt','A process ID'],a:2,why:'A device controller raises an interrupt on completion.'},
  {ch:2,q:'A program enters the kernel and returns through a system call. How many mode changes occur?',o:['Two','One','Zero','Four'],a:0,why:'User to kernel on entry; kernel to user on return.'},
  {ch:3,q:'A waiting process completes its disk I/O. Which state comes next?',o:['New','Ready','Running','Terminated'],a:1,why:'I/O completion makes it ready; dispatch is still needed.'},
  {ch:4,q:'Which item is private to each thread?',o:['Heap','Code','Stack','Open files'],a:2,why:'Each thread has its own PC, registers and stack.'},
  {ch:5,q:'All processes are waiting at time 0. Which algorithm gives the minimum average waiting time?',o:['FCFS','Round Robin','SJF','Priority'],a:2,why:'SJF is optimal for average waiting time (slide 18), but needs the burst lengths.'},
  {ch:5,q:'A process has turnaround time 27 and burst time 3. What is its waiting time?',o:['30','24','27','9'],a:1,why:'Waiting = turnaround − burst = 27 − 3 = 24.'},
  {ch:6,q:'Which requirement allows only one process in its critical section at a time?',o:['Progress','Bounded waiting','Aging','Mutual exclusion'],a:3,why:'Mutual exclusion; progress and bounded waiting are the other two requirements.'},
  {ch:2,q:'List the three parameter-passing methods for system calls.',model:['Registers.','Memory block; address passed in a register.','Stack.']},
  {ch:5,q:'When does a nonpreemptive scheduler decide, and what does a preemptive one add?',model:['Nonpreemptive: only when the running process blocks (running → waiting) or terminates.','Preemptive adds running → ready (timer, higher priority) and waiting → ready.','Windows, macOS, Linux and UNIX are preemptive.']}
 ],long:[
  {ch:5,q:'P1 (arrival 0, burst 6), P2 (1, 3), P3 (2, 8), P4 (3, 2). Draw Gantt charts for FCFS, nonpreemptive SJF and RR with q = 2. Compute each average waiting time and name the lowest.',model:['Waiting = completion − arrival − burst.','FCFS: P1 0–6, P2 6–9, P3 9–17, P4 17–19. Waits 0, 5, 7, 14 → 26/4 = 6.5.','SJF: P1 0–6 (only one ready), P4 6–8, P2 8–11, P3 11–19. Waits 0, 7, 9, 3 → 19/4 = 4.75.','RR q = 2: P1 0–2, P2 2–4, P3 4–6, P1 6–8, P4 8–10, P2 10–11, P3 11–13, P1 13–15, P3 15–19. Waits 9, 7, 9, 5 → 30/4 = 7.5.','Lowest: SJF (4.75). RR gives better response, not better average waiting.']},
  {ch:6,q:'count = 5. A producer runs count++ and a consumer runs count-- at the same time. (a) Write each as three machine steps. (b) Give an interleaving that leaves count = 4. (c) Protect the updates with a Pthread mutex and state the three critical-section requirements.',model:['(a) Producer: register1 = count; register1 = register1 + 1; count = register1. Consumer: register2 = count; register2 = register2 − 1; count = register2.','(b) P loads 5; P adds → 6; C loads 5; C subtracts → 4; P stores 6; C stores 4. Expected 5: race condition.','(c) pthread_mutex_lock(&mutex); count++; pthread_mutex_unlock(&mutex); the same around count--.','Requirements: mutual exclusion; progress; bounded waiting.']}
 ]},
 {short:[
  {ch:1,q:'Which storage keeps its contents without power?',o:['Registers','Cache','Main memory','SSD'],a:3,why:'SSD is non-volatile; the other three are volatile.'},
  {ch:2,q:'Choosing which process runs next is what kind of decision?',o:['Policy','Mechanism','Interrupt vector','Parameter passing'],a:0,why:'Policy decides what; mechanism supplies how.'},
  {ch:3,q:'A child has exited but its parent has not collected its status. What is it?',o:['Ready','Orphan','Zombie','Running'],a:2,why:'A zombie has exited but has not yet been reaped.'},
  {ch:4,q:'One core alternates between three tasks. What does this demonstrate?',o:['Data parallelism','Simultaneous execution','Unlimited speedup','Concurrency'],a:3,why:'The tasks make progress by taking turns; they do not execute simultaneously.'},
  {ch:5,q:'Round Robin with a very large time quantum behaves like…',o:['SJF','FCFS','Priority','SRTF'],a:1,why:'If every burst fits in one quantum, nobody is preempted: FCFS (slide 20).'},
  {ch:6,q:'Which requirement does the simple test_and_set spinlock NOT meet?',o:['Bounded waiting','Mutual exclusion','Progress','None: it meets all three'],a:0,why:'An unlucky process can lose every time (slide 17).'},
  {ch:6,q:'A semaphore with a waiting queue has the value −2. What does that mean?',o:['Two resources are free','The semaphore is broken','Two processes are waiting','The lock has two owners'],a:2,why:'Negative value = number of waiting processes; positive = free resources (slide 29).'},
  {ch:3,q:'Every process executes three successive successful fork() calls. How many processes exist in total, and how many are new?',model:['1 → 2 → 4 → 8 processes in total (2³).','New children = 8 − 1 = 7.']},
  {ch:4,q:'Serial fraction S = 0.25. Give the speedup on N = 2 cores and the limit as N grows.',model:['Speedup = 1 / (0.25 + 0.75/2) = 1/0.625 = 1.6.','Limit = 1/S = 4.']},
  {ch:6,q:'How does a mutex differ from a binary semaphore?',model:['Both admit one at a time (binary semaphore initialised to 1).','Mutex: has an owner; only the locker unlocks.','Semaphore: no owner; any thread can post; can also order events (initialised to 0).']}
 ],long:[
  {ch:5,q:'P1 (arrival 0, burst 7), P2 (2, 4), P3 (4, 1), P4 (5, 4). (a) Draw the SRTF Gantt chart and compute the average waiting time. (b) Do the same with nonpreemptive SJF. (c) Why can an OS not run SJF exactly, and which starvation problem does it share with priority scheduling? How is it fixed?',model:['(a) SRTF: P1 0–2, P2 2–4, P3 4–5, P2 5–7, P4 7–11, P1 11–16. Waits 9, 1, 0, 2 → 12/4 = 3.','(b) SJF: P1 0–7, P3 7–8, P2 8–12, P4 12–16. Waits 0, 6, 3, 7 → 16/4 = 4.','(c) The next CPU burst length is unknown; it can only be estimated.','Long or low-priority jobs can starve while short or high-priority ones keep arriving.','Fix: aging (raise the priority while a process waits).']},
  {ch:6,q:'Semaphores S = Q = 1. P0: wait(S); wait(Q); … signal(Q); signal(S). P1: wait(Q); wait(S); … signal(S); signal(Q). (a) Show how they deadlock. (b) Fix it. (c) With a new semaphore, make statement S1 in P1 run before S2 in P2.',model:['(a) P0: wait(S) → holds S. P1: wait(Q) → holds Q.','P0: wait(Q) blocks; P1: wait(S) blocks. Each waits for a signal only the other can send: deadlock (circular wait).','(b) Acquire in the same order in both: wait(S); wait(Q).','(c) synch = 0. P1: S1; signal(synch). P2: wait(synch); S2.']}
 ]}
];
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const root=document.getElementById('papers');
papers.forEach((paper,p)=>{
 const section=make('section');section.id=`paper-${p+1}`;section.append(make('h2',`Paper ${p+1}`),make('h3','Part 1: 10 short questions'));
 function item(q,i,long=false){
  const box=make('article');box.append(make('h4',`${long?'Long':'Short'} ${i+1}. ${q.q}`));
  const source=make('p',`Chapter ${q.ch}`);source.className='small muted';box.append(source);
  if(q.o){
   const options=make('div');options.className='options';const feedback=make('p');feedback.className='feedback';feedback.hidden=true;feedback.setAttribute('aria-live','polite');
   q.o.forEach((option,k)=>{const b=make('button',option);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{options.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));feedback.hidden=false;feedback.textContent=`${k===q.a?'Correct':'Incorrect'}. ${q.o[q.a]}. ${q.why}`;CS.srs.grade(CS.srs.qId(COURSE.id,q.ch,q.q),k===q.a);};options.append(b);});box.append(options,feedback);
  }else{
   const label=make('label','Your keyword answer');const input=make('textarea');input.setAttribute('aria-label',`Paper ${p+1}, ${long?'long':'short'} question ${i+1}`);label.append(input);box.append(label);
   const b=make('button','Show model answer'),model=make('div');b.type='button';model.className='model';model.id=`model-${p}-${long?'l':'s'}-${i}`;model.hidden=true;b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',model.id);q.model.forEach(line=>model.append(make('p',line)));b.onclick=()=>{model.hidden=!model.hidden;b.textContent=model.hidden?'Show model answer':'Hide model answer';b.setAttribute('aria-expanded',String(!model.hidden));};box.append(b,model);
  }return box;
 }
 paper.short.forEach((q,i)=>section.append(item(q,i)));section.append(make('h3','Part 2: 2 long questions'));paper.long.forEach((q,i)=>section.append(item(q,i,true)));root.append(section);
});
})();
