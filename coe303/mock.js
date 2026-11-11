/* COE303 midterm practice, Chapters 1–6. Format retained from existing chapter 1/4 material.
 * Old supplied papers inform scenario/table/code presentation only; no final topics added.
 * Scheduling rules and model Gantt charts use sched.js. */
(() => {
const papers = [
  {
    "short": [
      {
        "ch": 1,
        "q": "The OS shares CPU time and prevents improper resource use. Which two roles does this illustrate?",
        "o": [
          "Compiler and linker",
          "Allocator and control program",
          "Browser and shell",
          "Registers and memory"
        ],
        "a": 1,
        "why": "The OS shares resources and controls their use."
      },
      {
        "ch": 1,
        "q": "A device completes an I/O operation while a program is running. What signals the CPU?",
        "o": [
          "An interrupt",
          "An application window",
          "A new compiler",
          "A process ID"
        ],
        "a": 0,
        "why": "A device controller raises an interrupt on completion."
      },
      {
        "ch": 2,
        "q": "A program enters the kernel and returns through a system call. How many mode changes occur?",
        "o": [
          "Two",
          "One",
          "Zero",
          "Four"
        ],
        "a": 0,
        "why": "User to kernel on entry; kernel to user on return."
      },
      {
        "ch": 3,
        "q": "A waiting process completes its disk I/O. Which state comes next?",
        "o": [
          "New",
          "Ready",
          "Running",
          "Terminated"
        ],
        "a": 1,
        "why": "I/O completion makes it ready; dispatch is still needed."
      },
      {
        "ch": 4,
        "q": "Which item is private to each thread?",
        "o": [
          "Heap",
          "Code",
          "Stack",
          "Open files"
        ],
        "a": 2,
        "why": "Each thread has its own PC, registers and stack."
      },
      {
        "ch": 5,
        "q": "All processes are ready at time 0 and their next CPU bursts are known. Which algorithm minimizes average waiting time in this model?",
        "o": [
          "FCFS",
          "Round Robin",
          "SJF",
          "Priority"
        ],
        "a": 2,
        "why": "SJF is optimal for average waiting time (slide 18), but needs the burst lengths."
      },
      {
        "ch": 5,
        "q": "A process has one CPU burst of 3 ms, no I/O waiting, and turnaround time 27 ms. What is its ready-queue waiting time?",
        "o": [
          "30",
          "24",
          "27",
          "9"
        ],
        "a": 1,
        "why": "With one CPU burst and no I/O waiting, waiting = turnaround − burst = 27 − 3 = 24 ms."
      },
      {
        "ch": 6,
        "q": "Two threads must never execute their critical sections at the same time. Which requirement enforces this?",
        "o": [
          "Progress",
          "Bounded waiting",
          "Aging",
          "Mutual exclusion"
        ],
        "a": 3,
        "why": "Mutual exclusion; progress and bounded waiting are the other two requirements."
      },
      {
        "ch": 2,
        "q": "A user program requests read(). Explain the protected route to the OS service and list the three ways to pass system-call parameters.",
        "model": [
          "API / library → system-call interface → kernel service → return to user mode.",
          "Parameters: registers; memory block address in a register; stack."
        ],
        "hint": "İpucu: istek hangi sınırı geçiyor? Sonra üç parameter-passing yolunu adlandır."
      },
      {
        "ch": 5,
        "q": "P1 is running when P2 completes I/O and becomes ready. Compare what can happen under nonpreemptive and preemptive scheduling.",
        "model": [
          "Nonpreemptive: P1 keeps the CPU until it blocks or terminates.",
          "Preemptive: the scheduling policy may choose P2 and take the CPU from P1.",
          "P2 becoming ready does not guarantee that P2 immediately runs."
        ],
        "hint": "İpucu: ready olmak ile CPU’yu almak aynı şey mi?"
      }
    ],
    "long": [
      {
        "ch": 5,
        "q": "Use the process table below to compare CPU schedules.",
        "model": [
          "Waiting = completion − arrival − burst.",
          "FCFS: P1 0–6, P2 6–9, P3 9–17, P4 17–19. Waits 0, 5, 7, 14 → 26/4 = 6.5.",
          "SJF: P1 0–6 (only one ready), P4 6–8, P2 8–11, P3 11–19. Waits 0, 7, 9, 3 → 19/4 = 4.75.",
          "RR q = 2: P1 0–2, P2 2–4, P3 4–6, P1 6–8, P4 8–10, P2 10–11, P3 11–13, P1 13–15, P3 15–19. Waits 9, 7, 9, 5 → 30/4 = 7.5.",
          "Lowest: SJF (4.75). RR gives better response, not better average waiting."
        ],
        "processes": [
          {
            "id": "P1",
            "arr": 0,
            "burst": 6
          },
          {
            "id": "P2",
            "arr": 1,
            "burst": 3
          },
          {
            "id": "P3",
            "arr": 2,
            "burst": 8
          },
          {
            "id": "P4",
            "arr": 3,
            "burst": 2
          }
        ],
        "tasks": [
          "(a) Draw the FCFS and nonpreemptive SJF Gantt charts.",
          "(b) Draw Round Robin with quantum q = 2. Admit arrivals at a time boundary before requeuing the expired process.",
          "(c) Calculate each average waiting time and identify the lowest for this workload."
        ],
        "schedules": [
          {
            "alg": "FCFS"
          },
          {
            "alg": "SJF"
          },
          {
            "alg": "RR",
            "q": 2
          }
        ],
        "hint": "İpucu: her timeline’dan completion’ı oku. Waiting = completion − arrival − burst. Context-switch maliyetini bu soruda yok say."
      },
      {
        "ch": 6,
        "q": "A producer increments count while a consumer decrements it. Initially count = 5.",
        "model": [
          "(a) Producer: load count; add 1; store. Consumer: load count; subtract 1; store.",
          "(b) P loads 5; P adds to 6; C loads 5; C subtracts to 4; P stores 6; C stores 4.",
          "Expected final count: 5. Actual: 4; the consumer overwrites the producer update.",
          "(c) Both updates use the same mutex around the entire operation.",
          "Requirements: mutual exclusion; progress; bounded waiting."
        ],
        "tasks": [
          "(a) Expand each update into load, modify and store steps.",
          "(b) Trace an interleaving ending at count = 4 and explain why it is wrong.",
          "(c) Protect both updates with the same Pthread mutex and name the three critical-section requirements."
        ],
        "hint": "İpucu: ortak count ile iki register kopyasını ayrı takip et. Kilit bütün read–modify–write işlemini çevrelemeli.",
        "modelCode": "/* Producer */\npthread_mutex_lock(&mutex);\ncount++;\npthread_mutex_unlock(&mutex);\n\n/* Consumer: same mutex */\npthread_mutex_lock(&mutex);\ncount--;\npthread_mutex_unlock(&mutex);"
      }
    ]
  },
  {
    "short": [
      {
        "ch": 1,
        "q": "A saved file must survive power loss. Which storage below keeps its contents without power?",
        "o": [
          "Registers",
          "Cache",
          "Main memory",
          "SSD"
        ],
        "a": 3,
        "why": "SSD is non-volatile; the other three are volatile."
      },
      {
        "ch": 2,
        "q": "The OS chooses which ready process runs next. Is this a policy decision or a mechanism?",
        "o": [
          "Policy",
          "Mechanism",
          "Interrupt vector",
          "Parameter passing"
        ],
        "a": 0,
        "why": "Policy decides what; mechanism supplies how."
      },
      {
        "ch": 3,
        "q": "A child has exited but its parent has not collected its status. What is it?",
        "o": [
          "Ready",
          "Orphan",
          "Zombie",
          "Running"
        ],
        "a": 2,
        "why": "A zombie has exited but has not yet been reaped."
      },
      {
        "ch": 4,
        "q": "One core alternates between three tasks. What does this demonstrate?",
        "o": [
          "Data parallelism",
          "Simultaneous execution",
          "Unlimited speedup",
          "Concurrency"
        ],
        "a": 3,
        "why": "The tasks make progress by taking turns; they do not execute simultaneously."
      },
      {
        "ch": 5,
        "q": "Round Robin with a very large time quantum behaves like…",
        "o": [
          "SJF",
          "FCFS",
          "Priority",
          "SRTF"
        ],
        "a": 1,
        "why": "If every burst fits in one quantum, nobody is preempted: FCFS (slide 20)."
      },
      {
        "ch": 6,
        "q": "The simple test_and_set loop below provides exclusion, but a waiting process can keep losing the race. Which requirement is missing?",
        "o": [
          "Bounded waiting",
          "Mutual exclusion",
          "Progress",
          "None: it meets all three"
        ],
        "a": 0,
        "why": "An unlucky process can lose every time (slide 17).",
        "code": "while (test_and_set(&lock)) { }\n/* critical section */\nlock = false;"
      },
      {
        "ch": 6,
        "q": "In the blocking semaphore implementation with a waiting queue, S = −2. What does this mean?",
        "o": [
          "Two resources are free",
          "The semaphore is broken",
          "Two processes are waiting",
          "The lock has two owners"
        ],
        "a": 2,
        "why": "Negative value = number of waiting processes; positive = free resources (slide 29)."
      },
      {
        "ch": 3,
        "q": "Assume every fork() succeeds and every resulting process continues through all three calls below. Give the total process count and the number of new children.",
        "model": [
          "1 → 2 → 4 → 8 processes in total (2³).",
          "New children = 8 − 1 = 7."
        ],
        "code": "fork();\nfork();\nfork();",
        "hint": "İpucu: her çağrı o ana kadar var olan process’lerin sayısını ikiye katlar."
      },
      {
        "ch": 4,
        "q": "Serial fraction S = 0.25. Give the speedup on N = 2 cores and the limit as N grows.",
        "model": [
          "Speedup = 1 / (0.25 + 0.75/2) = 1/0.625 = 1.6.",
          "Limit = 1/S = 4."
        ]
      },
      {
        "ch": 6,
        "q": "Compare a mutex with a binary semaphore. Which ownership rule matters, and which tool can also order events between threads?",
        "model": [
          "Both can provide mutual exclusion when the binary semaphore starts at 1.",
          "Mutex: ownership; only the acquiring thread unlocks it.",
          "Semaphore: no owner; another thread may signal. Initial value 0 can order events."
        ]
      }
    ],
    "long": [
      {
        "ch": 5,
        "q": "Use the process table below to compare preemptive and nonpreemptive shortest-job scheduling.",
        "model": [
          "(a) SRTF: P1 0–2, P2 2–4, P3 4–5, P2 5–7, P4 7–11, P1 11–16. Waits 9, 1, 0, 2 → 12/4 = 3.",
          "(b) SJF: P1 0–7, P3 7–8, P2 8–12, P4 12–16. Waits 0, 6, 3, 7 → 16/4 = 4.",
          "(c) The next CPU burst length is unknown; it can only be estimated.",
          "Long or low-priority jobs can starve while short or high-priority ones keep arriving.",
          "Fix: aging (raise the priority while a process waits)."
        ],
        "processes": [
          {
            "id": "P1",
            "arr": 0,
            "burst": 7
          },
          {
            "id": "P2",
            "arr": 2,
            "burst": 4
          },
          {
            "id": "P3",
            "arr": 4,
            "burst": 1
          },
          {
            "id": "P4",
            "arr": 5,
            "burst": 4
          }
        ],
        "tasks": [
          "(a) Draw the SRTF Gantt chart and calculate average waiting time.",
          "(b) Repeat for nonpreemptive SJF. For equal bursts, use earlier arrival first.",
          "(c) Explain why real systems must estimate bursts, why long jobs may starve, and how aging helps."
        ],
        "schedules": [
          {
            "alg": "SRTF"
          },
          {
            "alg": "SJF"
          }
        ],
        "hint": "İpucu: yeni arrival anında SRTF kalan süreyi karşılaştırır; SJF çalışan işi kesmez. Context-switch maliyetini yok say."
      },
      {
        "ch": 6,
        "q": "Semaphores S and Q are initially 1. Consider the two processes below.",
        "model": [
          "(a) P0: wait(S) → holds S. P1: wait(Q) → holds Q.",
          "P0: wait(Q) blocks; P1: wait(S) blocks. Each waits for a signal only the other can send: deadlock (circular wait).",
          "(b) Acquire in the same order in both: wait(S); wait(Q).",
          "(c) synch = 0. P1: S1; signal(synch). P2: wait(synch); S2."
        ],
        "code": "P0: wait(S); wait(Q); /* work */ signal(Q); signal(S);\nP1: wait(Q); wait(S); /* work */ signal(S); signal(Q);",
        "tasks": [
          "(a) Trace an execution in which both processes block forever.",
          "(b) Change the lock-acquisition order to prevent that circular wait.",
          "(c) Using a separate semaphore, make S1 in P1 happen before S2 in P2. State its initial value."
        ],
        "hint": "İpucu: önce hangi process hangi semaphore’u tutuyor, tablo gibi yaz. Sıralama için başlangıç değeri 0 düşün."
      }
    ]
  }
];
const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const root=document.getElementById('papers');
papers.forEach((paper,p)=>{
 const section=make('section');section.id=`paper-${p+1}`;section.append(make('h2',`Paper ${p+1}`),make('h3','Part 1: 10 short questions'));
 function item(q,i,long=false){
  const box=make('article');box.append(make('h4',`${long?'Long':'Short'} ${i+1}. ${q.q}`));
  const source=make('p',`Chapter ${q.ch}`);source.className='small muted';box.append(source);
  if(q.processes){
   const wrap=make('div');wrap.className='scroll';const table=make('table');
   const head=make('tr');['Process','Arrival','CPU burst'].forEach(t=>head.append(make('th',t)));table.append(head);
   q.processes.forEach(proc=>{const row=make('tr');[proc.id,proc.arr,proc.burst].forEach(t=>row.append(make('td',t)));table.append(row);});
   wrap.append(table);box.append(wrap);
  }
  if(q.code)box.append(make('pre',q.code));
  if(q.tasks){const tasks=make('ul');q.tasks.forEach(t=>tasks.append(make('li',t)));box.append(tasks);}
  if(q.hint){const hint=make('p',q.hint);hint.className='small muted';hint.lang='tr';box.append(hint);}
  if(q.o){
   const options=make('div');options.className='options';const feedback=make('p');feedback.className='feedback';feedback.hidden=true;feedback.setAttribute('aria-live','polite');
   q.o.forEach((option,k)=>{const b=make('button',option);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{options.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));feedback.hidden=false;feedback.textContent=`${k===q.a?'Correct':'Incorrect'}. ${q.o[q.a]}. ${q.why}`;CS.srs.grade(CS.srs.qId(COURSE.id,q.ch,q.q),k===q.a);};options.append(b);});box.append(options,feedback);
  }else{
   const label=make('label','Your keyword answer');const input=make('textarea');input.setAttribute('aria-label',`Paper ${p+1}, ${long?'long':'short'} question ${i+1}`);label.append(input);box.append(label);
   const b=make('button','Show model answer'),model=make('div');b.type='button';model.className='model';model.id=`model-${p}-${long?'l':'s'}-${i}`;model.hidden=true;b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',model.id);if(q.schedules){
    q.schedules.forEach(cfg=>{
     model.append(make('h5',cfg.alg+(cfg.q?` (q = ${cfg.q})`:'')));
     const run=CPUS.run(q.processes,cfg.alg,{q:cfg.q});
     const graph=make('div');graph.className='schedule-chart';graph.append(CPUS.gantt(run.slices));model.append(graph);
     model.append(make('p',`Average waiting time: ${CPUS.fmt(run.avgWait)}`));
    });
   }
   q.model.forEach(line=>model.append(make('p',line)));
   if(q.modelCode)model.append(make('pre',q.modelCode));b.onclick=()=>{model.hidden=!model.hidden;b.textContent=model.hidden?'Show model answer':'Hide model answer';b.setAttribute('aria-expanded',String(!model.hidden));};box.append(b,model);
  }return box;
 }
 paper.short.forEach((q,i)=>section.append(item(q,i)));section.append(make('h3','Part 2: 2 long questions'));paper.long.forEach((q,i)=>section.append(item(q,i,true)));root.append(section);
});
window.COE303_MOCK={papers};
})();
