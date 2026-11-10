/* Adapted only from existing COE303 content. No past paper was available.
 * Each paper follows the known 10 short + 2 long format. */
(() => {
const papers = [
 {short: [
  {ch:1,q:'Name the two roles of an operating system.',o:['Compiler and linker','Allocator and control program','Browser and shell','Registers and memory'],a:1,why:'The OS shares resources and controls their use.'},
  {ch:1,q:'A device finishes its work. What signals the CPU?',o:['A new compiler','An application window','An interrupt','A process ID'],a:2,why:'A device controller raises an interrupt on completion.'},
  {ch:1,q:'How many completion interrupts does one DMA block transfer use in this course model?',o:['One per byte','One per word','None','One per block'],a:3,why:'DMA transfers the block directly and interrupts on completion.'},
  {ch:2,q:'A program enters the kernel and returns through a system call. How many mode changes occur?',o:['Two','One','Zero','Four'],a:0,why:'User to kernel on entry; kernel to user on return.'},
  {ch:3,q:'A waiting process completes its disk I/O. Which state comes next?',o:['New','Ready','Running','Terminated'],a:1,why:'I/O completion makes it ready; dispatch is still needed.'},
  {ch:4,q:'Which item is private to each thread?',o:['Heap','Code','Stack','Open files'],a:2,why:'Each thread has its own PC, registers and stack.'},
  {ch:2,q:'Distinguish an API from a system call.',model:['API: interface used by the program.','System call: controlled kernel entry.','Library/API code may invoke system calls.']},
  {ch:2,q:'List the three parameter-passing methods for system calls.',model:['Registers.','Memory block; address passed in a register.','Stack.']},
  {ch:3,q:'State fork return values in the parent and child, and what exec does.',model:['Parent: child PID; child: 0; failure: −1.','exec: replace process program; no extra process.']},
  {ch:4,q:'Name the four benefits of multithreading.',model:['Responsiveness; resource sharing; economy; scalability.']}
 ],long:[
  {ch:1,q:'A keyboard controller signals an interrupt while a program is running. Explain the route from the current instruction to resuming the program. Explain why a hardware timer is also needed.',model:['Finish current instruction.','Save PC and registers.','Interrupt vector → handler address.','Run handler in kernel mode.','Restore state → resume execution.','Timer interrupt → regain control even if a program loops.']},
  {ch:4,q:'A program has serial fraction S = 0.25. Calculate ideal speedup on N = 2 cores and the limit as N grows. Explain why doubling cores does not necessarily double performance.',model:['Parallel fraction = 0.75.','Runtime fraction = 0.25 + 0.75/2 = 0.625.','Speedup = 1/0.625 = 1.6.','Limit = 1/S = 4.','Serial work cannot be divided across cores.']}
 ]},
 {short:[
  {ch:1,q:'Which storage keeps its contents without power?',o:['Registers','Cache','Main memory','SSD'],a:3,why:'SSD is non-volatile; the other three are volatile.'},
  {ch:2,q:'Choosing which process runs next is what kind of decision?',o:['Policy','Mechanism','Interrupt vector','Parameter passing'],a:0,why:'Policy decides what; mechanism supplies how.'},
  {ch:2,q:'Where do most services run in the microkernel model taught here?',o:['Firmware','User space','Application registers','Disk controller'],a:1,why:'Services communicate as user processes while the kernel remains small.'},
  {ch:3,q:'A child has exited but its parent has not collected its status. What is it?',o:['Ready','Orphan','Zombie','Running'],a:2,why:'A zombie has exited but has not yet been reaped.'},
  {ch:4,q:'One core alternates between three tasks. What does this demonstrate?',o:['Data parallelism','Simultaneous execution','Unlimited speedup','Concurrency'],a:3,why:'The tasks make progress by taking turns; they do not execute simultaneously.'},
  {ch:4,q:'Which Pthreads function waits for a thread to finish?',o:['pthread_join','pthread_create','pthread_exit','pthread_attr_init'],a:0,why:'pthread_join waits for the specified worker; create starts it.'},
  {ch:3,q:'List four kinds of information stored in a PCB.',model:['Any four: process state; PC; registers; scheduling information.','Also valid: memory-management, accounting, I/O status.']},
  {ch:3,q:'Explain shared-memory IPC versus message passing.',model:['Shared memory: common region; direct access after setup.','Processes must synchronize shared access.','Message passing: send/receive; kernel mediation.']},
  {ch:3,q:'The in/out bounded buffer has SIZE = 10. State its capacity and empty/full tests.',model:['Capacity = 9 items.','Empty: in == out.','Full: (in + 1) % SIZE == out.']},
  {ch:4,q:'Compare many-to-one and one-to-one when one thread blocks.',model:['Many-to-one: one kernel thread; blocking stops all.','One-to-one: separate kernel threads; others can run.']}
 ],long:[
  {ch:3,q:'Every process executes three successive successful fork calls, with no early exit. Find the total number of processes and new children. Then trace a process that runs, waits for I/O, becomes ready, and runs again; include what a context switch saves and loads.',model:['Counts: 1 → 2 → 4 → 8 total.','New children = 8 − 1 = 7.','Running → Waiting: I/O wait.','Waiting → Ready: I/O completion.','Ready → Running: scheduler dispatch.','Context switch: save outgoing PC/registers in its PCB; load incoming state.','Switch time is overhead.']},
  {ch:4,q:'Counter starts at 0. Two threads each increment it once. Show a load/add/store interleaving that leaves 1. Identify shared and private data, and explain why thread creation alone does not make the update safe.',model:['A loads 0; B loads 0.','A adds 1 and stores 1.','B adds 1 to its saved 0 and stores 1.','Expected 2; actual 1: lost update.','Shared counter; private registers and stacks.','Result depends on timing; synchronization is needed.']}
 ]}
];
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const root=document.getElementById('papers');
papers.forEach((paper,p)=>{
 const section=make('section');section.id=`paper-${p+1}`;section.append(make('h2',`Paper ${p+1}`),make('h3','Part 1: 10 short questions'));
 function item(q,i,long=false){
  const box=make('article');box.append(make('h4',`${long?'Long':'Short'} ${i+1}. ${q.q}`));
  const source=make('p',`Source: Chapter ${q.ch} guided lesson and practice.`);source.className='small muted';box.append(source);
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
