/* Source: existing COE303 content, originally derived from lecture slides.
 * Checked for internal consistency; raw slides unavailable on this machine. */
window.COURSE = window.COE303 = {
  "id": "coe303",
  "code": "COE303",
  "name": "Operating Systems",
  "term": "Fall 2026",
  "lecturer": "Dr. Hüsamettin Osmanoğlu",
  "textbooks": [
    "Silberschatz, Galvin, Gagne — Operating System Concepts, 10th ed. (primary)",
    "Stallings — Operating Systems: Internals and Design Principles (secondary)"
  ],
  "examFormat": "Midterm: 10 short questions + 2 long questions.",
  "chapters": [
    {
      "n": 1,
      "title": "Introduction",
      "summary": "What an OS is, how a computer is organized (interrupts, I/O, storage), dual-mode operation, and virtualization.",
      "takeaways": [
        "An OS is the program between hardware and users — resource allocator AND control program.",
        "Four components: hardware, operating system, application programs and users.",
        "Interrupts are the universal mechanism for I/O, system calls and errors.",
        "Dual-mode (user/kernel) is the foundation of protection — software protection is impossible without hardware support.",
        "The OS manages processes, memory, files and I/O.",
        "DMA = one interrupt per block; interrupt-driven I/O = one interrupt per word."
      ],
      "traps": [
        [
          "\"The OS is the desktop I see.\"",
          "The desktop is a user-space program; the kernel is the core of the OS."
        ],
        [
          "\"Multitasking = parallel execution.\"",
          "Multitasking is time-sliced; on a single-core CPU only one task runs at any instant."
        ],
        [
          "\"Cache = RAM.\"",
          "Cache is on the CPU die, much faster and smaller than RAM; the OS does not manage it directly."
        ]
      ],
      "activities": [
        {
          "id": "ch1-interrupts",
          "title": "Interrupt Lab",
          "desc": "Fire device interrupts at a running CPU and watch PC save → vector lookup → handler → return. Then compare polling vs interrupts vs DMA.",
          "href": "ch1/interrupts.html"
        },
        {
          "id": "ch1-dualmode",
          "title": "Dual-Mode & Timer",
          "desc": "Be a user program. Try privileged instructions, make system calls, run an infinite loop — with and without hardware protection.",
          "href": "ch1/dualmode.html"
        },
        {
          "id": "ch1-storage",
          "title": "Where Is Data \"A\"?",
          "desc": "Follow data A as it migrates from disk up to a register. Feel the 10-orders-of-magnitude speed gap.",
          "href": "ch1/storage.html"
        }
      ],
      "quiz": [
        {
          "q": "Silberschatz defines an operating system as…",
          "options": [
            "Intermediary between users and hardware",
            "The graphical desktop and its windows",
            "The firmware that runs POST at power-on",
            "A compiler that turns programs into machine code"
          ],
          "answer": 0,
          "explain": "The OS is a program (not hardware) that sits between users/applications and hardware. Its two roles: resource allocator (efficiency) and control program (protection)."
        },
        {
          "q": "Which is NOT one of the four components of a computer system?",
          "options": [
            "Users",
            "Compiler",
            "Application programs",
            "Hardware"
          ],
          "answer": 1,
          "explain": "The four components are hardware, operating system, application programs and users. A compiler is just one application program."
        },
        {
          "q": "A disk finishes reading a block. How does the CPU find out?",
          "options": [
            "The CPU polls the disk every instruction",
            "The user presses a key",
            "An interrupt",
            "The scheduler checks it at the next context switch"
          ],
          "answer": 2,
          "explain": "The device controller signals completion with an interrupt; polling would repeatedly check device status."
        },
        {
          "q": "When an interrupt arrives, what does the CPU do FIRST (after finishing the current instruction)?",
          "options": [
            "Runs the scheduler",
            "Clears all caches",
            "Reboots the device",
            "Save the program counter"
          ],
          "answer": 3,
          "explain": "Fig 1.4: save the PC → look up the handler in the interrupt vector → run the handler → return from interrupt → restore the PC."
        },
        {
          "q": "Where does the CPU find the address of the right interrupt handler?",
          "options": [
            "Interrupt vector",
            "In the PCB",
            "On the disk",
            "In the L1 cache"
          ],
          "answer": 0,
          "explain": "The interrupt vector is a table of handler addresses indexed by interrupt number."
        },
        {
          "q": "With DMA, how many interrupts does a 1-block transfer cause?",
          "options": [
            "One per byte",
            "One per completed block",
            "One per word",
            "Zero — DMA never interrupts"
          ],
          "answer": 1,
          "explain": "The CPU programs the DMA controller once (source, destination, count), then the controller raises ONE interrupt at the end. Interrupt-driven I/O raises one per word."
        },
        {
          "q": "Who manages the L1/L2/L3 caches?",
          "options": [
            "The OS",
            "The user",
            "Hardware",
            "The compiler"
          ],
          "answer": 2,
          "explain": "Registers and CPU caches are hardware-managed. Main memory, SSD, HDD and tape are OS-managed."
        },
        {
          "q": "In the slides, the mode bit value for USER mode is…",
          "options": [
            "0",
            "2",
            "It has no mode bit",
            "1"
          ],
          "answer": 3,
          "explain": "User mode: mode bit = 1 (restricted). Kernel mode: mode bit = 0 (privileged)."
        },
        {
          "q": "Which can a user-mode program NOT do directly?",
          "options": [
            "Disable interrupts",
            "Add two numbers",
            "Call a function in its own code",
            "Execute a system call instruction"
          ],
          "answer": 0,
          "explain": "Disabling interrupts is privileged. A user program CAN execute the syscall instruction — that is exactly how it asks the kernel for help."
        },
        {
          "q": "What would happen without a hardware timer?",
          "options": [
            "Programs would run faster",
            "A looping program could retain the CPU",
            "Disks could not use DMA",
            "Nothing — the OS polls anyway"
          ],
          "answer": 1,
          "explain": "The hardware timer interrupts so the kernel regains control even when a program loops."
        },
        {
          "q": "Timesharing (multitasking) on a single-core CPU means…",
          "options": [
            "All jobs run at exactly the same instant",
            "Jobs run one after another to completion",
            "Switching between jobs",
            "Each job gets its own CPU"
          ],
          "answer": 2,
          "explain": "Multitasking = multiprogramming + frequent preemptive switching (e.g. a 10 ms quantum). It is NOT parallel execution."
        },
        {
          "q": "Multiprogramming exists mainly to…",
          "options": [
            "Let one user run many windows",
            "Protect memory",
            "Save power",
            "Keep the CPU busy during I/O waits"
          ],
          "answer": 3,
          "explain": "A single 90%-I/O-bound job leaves the CPU idle 90% of the time; keeping several jobs in memory keeps it busy."
        }
      ],
      "cards": [
        [
          "Operating system",
          "A program that acts as an intermediary between a user and the computer hardware. Roles: resource allocator + control program."
        ],
        [
          "Interrupt",
          "A signal that makes the CPU stop, save its state, and run a handler. Used for I/O completion, system calls and errors."
        ],
        [
          "Interrupt vector",
          "A table of interrupt-handler addresses, indexed by interrupt number."
        ],
        [
          "Polling",
          "The CPU repeatedly checks device status, spending time checking even before the device completes."
        ],
        [
          "DMA",
          "Direct Memory Access: the CPU programs the controller once; the block moves device↔memory without the CPU; ONE interrupt at the end."
        ],
        [
          "Volatile storage",
          "Loses contents when power is lost — e.g. RAM. Secondary storage (SSD/HDD) is non-volatile."
        ],
        [
          "Storage hierarchy",
          "Registers → cache → main memory → SSD → HDD → tape. Faster/smaller/costlier at the top."
        ],
        [
          "Multiprogramming",
          "Keep several jobs in memory so the CPU switches to another when one waits for I/O."
        ],
        [
          "Timesharing (multitasking)",
          "Multiprogramming + switching every few ms (quantum) so each user gets interactive response."
        ],
        [
          "Dual-mode operation",
          "User mode (mode bit 1, restricted) vs kernel mode (mode bit 0, privileged). Basis of protection."
        ],
        [
          "Privileged instruction",
          "An instruction only allowed in kernel mode: I/O control, timer management, disabling interrupts, modifying MMU registers."
        ],
        [
          "Trap",
          "A software-generated interrupt — from a system call or an error (divide by zero, invalid memory access)."
        ],
        [
          "Timer",
          "Hardware timer interrupts return control to the OS even when a program loops."
        ],
        [
          "Cache hit / miss",
          "Hit: data found in the fast layer. Miss: fetch from slower layer and keep a copy."
        ]
      ]
    },
    {
      "n": 2,
      "title": "Operating-System Structures",
      "summary": "OS services, user interfaces, system calls and their types, system programs, design principles, kernel structures, booting and debugging.",
      "takeaways": [
        "User-facing services include UI, execution, I/O, files, communication and error detection; allocation, accounting and protection support efficient operation.",
        "A system call is a controlled entry point into the kernel — the mode bit changes twice.",
        "Parameters go to the kernel in registers, a memory block (address in a register), or the stack.",
        "Six syscall types: process control, file mgmt, device mgmt, information maintenance, communications, protection.",
        "Separate mechanism (HOW) from policy (WHAT).",
        "Structures: simple (MS-DOS), layered (THE), microkernel (Mach, seL4), modular (Linux), hybrid (macOS, Windows, Android)."
      ],
      "traps": [
        [
          "\"The user interface IS the OS.\"",
          "The user interface is one OS service; the shell is a user program."
        ],
        [
          "\"The shell is part of the kernel.\"",
          "The shell is a regular user program — you can replace bash with zsh or your own."
        ],
        [
          "\"System programs = system calls.\"",
          "System programs (ls, ps, gcc) are user programs that USE system calls."
        ],
        [
          "\"Microkernels are always better.\"",
          "Moving services into user processes improves isolation, but message passing adds overhead."
        ]
      ],
      "activities": [
        {
          "id": "ch2-syscall",
          "title": "System Call Journey",
          "desc": "Step a read() call from your C code through libc, the syscall table and the kernel — and watch the mode bit flip twice.",
          "href": "ch2/syscall.html"
        },
        {
          "id": "ch2-structures",
          "title": "Kernel Structure Lab",
          "desc": "Crash a driver, read a file, hot-load a module — and see how MS-DOS, layered, microkernel, modular and hybrid kernels react.",
          "href": "ch2/structures.html"
        }
      ],
      "quiz": [
        {
          "q": "A system call is…",
          "options": [
            "Controlled entry into the kernel",
            "Any function in the C standard library",
            "A shell command",
            "A hardware interrupt from a device"
          ],
          "answer": 0,
          "explain": "The user cannot jump to arbitrary kernel code — only to a specific syscall handler. The mode bit changes twice."
        },
        {
          "q": "Why is the shell (bash, zsh) NOT part of the kernel?",
          "options": [
            "Because the kernel cannot read text",
            "It is a replaceable user program",
            "For speed",
            "Because Windows does it that way"
          ],
          "answer": 1,
          "explain": "\"The shell is just a program\" — one of the great Unix design decisions."
        },
        {
          "q": "Which parameter-passing method is the fastest?",
          "options": [
            "A block in memory",
            "The stack",
            "Registers",
            "A file"
          ],
          "answer": 2,
          "explain": "Registers are fastest but limited in number (~6). For many/large params, store a block in memory and pass its address in a register."
        },
        {
          "q": "ioctl() belongs to which system call category?",
          "options": [
            "Process control",
            "Protection",
            "Information maintenance",
            "Device management"
          ],
          "answer": 3,
          "explain": "ioctl() is device-specific control."
        },
        {
          "q": "\"Which process runs next\" is an example of…",
          "options": [
            "Policy",
            "A mechanism",
            "A system program",
            "A hardware feature"
          ],
          "answer": 0,
          "explain": "Policy = WHAT to do. Mechanism = HOW (timer interrupt, context switch, page table). Mechanisms are stable; policies change."
        },
        {
          "q": "In a microkernel, where do file systems and device drivers run?",
          "options": [
            "In the kernel",
            "User space",
            "In the BIOS",
            "Inside each application"
          ],
          "answer": 1,
          "explain": "Only IPC, basic memory management and CPU scheduling stay in kernel mode. Pro: reliability. Con: IPC overhead."
        },
        {
          "q": "Linux is best described as…",
          "options": [
            "A pure microkernel",
            "A simple structure like MS-DOS",
            "Modular monolithic kernel",
            "A strictly layered OS"
          ],
          "answer": 2,
          "explain": "Everything runs in kernel mode in one address space, but drivers/filesystems load at runtime (insmod, modprobe, lsmod)."
        },
        {
          "q": "Why could any MS-DOS program crash the whole machine?",
          "options": [
            "MS-DOS was written in C",
            "It had too many layers",
            "It used a microkernel",
            "No hardware mode bit"
          ],
          "answer": 3,
          "explain": "Simple structure: BIOS + DOS + programs in one address space, no isolation."
        },
        {
          "q": "macOS / iOS kernel (XNU) combines…",
          "options": [
            "Mach, BSD and IOKit",
            "Linux + Java",
            "NT executive + HAL",
            "Only Mach"
          ],
          "answer": 0,
          "explain": "A hybrid: Mach for IPC/scheduling, BSD for file systems/networking, IOKit for drivers."
        },
        {
          "q": "What is the main disadvantage of a strictly layered OS?",
          "options": [
            "No protection",
            "Layer-crossing overhead",
            "Cannot be debugged",
            "Needs a microkernel"
          ],
          "answer": 1,
          "explain": "Each layer only uses the one below it — easy to build/debug (THE OS, Dijkstra 1968) but slow."
        },
        {
          "q": "`ps`, `top` and `df` are system programs of which category?",
          "options": [
            "File modification",
            "Communications",
            "Status information",
            "Program loading"
          ],
          "answer": 2,
          "explain": "Status info: ps, top, df, du, free, uname, dmesg."
        },
        {
          "q": "Which service is grouped under system efficiency in this lesson?",
          "options": [
            "User interface",
            "Program execution",
            "File-system manipulation",
            "Resource allocation"
          ],
          "answer": 3,
          "explain": "The lesson groups resource allocation, logging/accounting and protection/security under system efficiency; error detection is listed with user-facing services."
        }
      ],
      "cards": [
        [
          "System call",
          "A controlled entry point into the kernel: a special instruction switches user → kernel mode, runs a handler, returns."
        ],
        [
          "API vs system call",
          "Programs call an API (e.g. POSIX read()); the library invokes the actual system call. API = contract, implementation = kernel's business."
        ],
        [
          "Parameter passing",
          "Registers; a memory block with its address in a register; or the stack."
        ],
        [
          "Six syscall types",
          "Process control · File management · Device management · Information maintenance · Communications · Protection."
        ],
        [
          "Shell / command interpreter",
          "A user program that reads commands; built-ins run in the shell, external commands are fork+exec'd."
        ],
        [
          "System programs",
          "Utilities shipped with the OS that use system calls: ls, cp, ps, gcc, ssh…"
        ],
        [
          "Mechanism",
          "HOW something is done — timer interrupt, context switch, page table."
        ],
        [
          "Policy",
          "WHAT is done — which process runs next, which page to evict."
        ],
        [
          "Simple structure",
          "MS-DOS: no mode bit, no protection, everything in one address space."
        ],
        [
          "Layered approach",
          "Layer 0 = hardware … Layer N = UI. Each uses only the layer below. Easy to debug, slow. (THE OS, 1968)"
        ],
        [
          "Microkernel",
          "Only IPC, scheduling, basic memory in the kernel; services are user processes. Reliable but IPC overhead. (Mach, seL4)"
        ],
        [
          "Loadable kernel modules",
          "Drivers/filesystems loaded at runtime into the kernel (insmod, modprobe, lsmod). Linux, Solaris."
        ],
        [
          "Hybrid kernel",
          "Combines structures — macOS/iOS (XNU), Windows NT, Android."
        ],
        [
          "Boot sequence",
          "Firmware/bootstrap loader loads the kernel; the kernel initializes and starts user-space services."
        ]
      ]
    },
    {
      "n": 3,
      "title": "Processes",
      "summary": "Process concept and memory layout, the five states, the PCB, scheduling queues and context switches, fork/exec/wait/exit, and IPC (shared memory, message passing, pipes, sockets, RPC).",
      "takeaways": [
        "A process is a program in execution: text, data, heap, stack + PC and registers.",
        "Five states, six transitions. Waiting → Ready, never directly Waiting → Running.",
        "The PCB (Linux task_struct) holds everything the OS knows about a process.",
        "A context switch saves the old PCB and loads the new one — pure overhead.",
        "fork() returns 0 in the child and the child's PID in the parent.",
        "Zombie = exited but not reaped by wait(). Orphan = parent died; adopted by PID 1."
      ],
      "traps": [
        [
          "\"A program and a process are the same.\"",
          "A program is a passive file; a process is active, in memory, with state. One program can be many processes."
        ],
        [
          "\"After I/O completes the process runs immediately.\"",
          "It goes Waiting → Ready. Only the scheduler moves Ready → Running."
        ],
        [
          "\"fork() returns the same value twice.\"",
          "Parent gets the child's PID (>0), child gets 0, failure gives <0."
        ],
        [
          "\"counter++ is one instruction.\"",
          "It is load, add, store — two processes can interleave and lose an update."
        ],
        [
          "\"The bounded buffer uses all N slots.\"",
          "The in/out version only uses BUFFER_SIZE − 1 so \"full\" and \"empty\" look different."
        ]
      ],
      "activities": [
        {
          "id": "ch3-states",
          "title": "Process State Scheduler",
          "desc": "Move vlc, Firefox, MS Word and a.out through New/Ready/Running/Waiting/Terminated. Run round-robin with context switches.",
          "href": "ch3/states.html"
        },
        {
          "id": "ch3-fork",
          "title": "fork() Tree & Zombie Lab",
          "desc": "Predict how many processes a fork() program creates, watch the tree grow, then create zombies and orphans on purpose.",
          "href": "ch3/fork.html"
        },
        {
          "id": "ch3-ipc",
          "title": "IPC Lab: Buffers & Messages",
          "desc": "Drive the bounded buffer (in/out pointers), step the counter race condition, and test blocking vs non-blocking message passing.",
          "href": "ch3/ipc.html"
        }
      ],
      "quiz": [
        {
          "q": "Program vs process: which is correct?",
          "options": [
            "Program: passive; process: active",
            "A process is a file on disk",
            "They are the same thing",
            "A program has a PCB"
          ],
          "answer": 0,
          "explain": "Three users running bash = one program, three separate processes."
        },
        {
          "q": "Memory from malloc() lives in which section?",
          "options": [
            "Stack",
            "Heap",
            "Text",
            "BSS"
          ],
          "answer": 1,
          "explain": "Heap grows upward and is managed by the programmer (memory leaks happen here). Locals are on the stack."
        },
        {
          "q": "A process's disk I/O completes. Its new state is…",
          "options": [
            "Running",
            "Terminated",
            "Ready",
            "New"
          ],
          "answer": 2,
          "explain": "Waiting → Ready. It must wait for the scheduler to dispatch it."
        },
        {
          "q": "Which event causes Running → Ready?",
          "options": [
            "The process calls read() on a disk",
            "The process calls exit()",
            "I/O completes",
            "Timer interrupt"
          ],
          "answer": 3,
          "explain": "Preemption. A read() causes Running → Waiting."
        },
        {
          "q": "How many processes can be in the Running state at once on a 4-core CPU?",
          "options": [
            "4",
            "Exactly 1",
            "Unlimited",
            "At most 2"
          ],
          "answer": 0,
          "explain": "One Running per core. Many can be Ready or Waiting."
        },
        {
          "q": "Which is NOT stored in the PCB?",
          "options": [
            "Program counter",
            "Source code",
            "CPU registers",
            "List of open files"
          ],
          "answer": 1,
          "explain": "PCB: state, PC, registers, scheduling info, memory-management info, accounting, I/O status. Linux: task_struct (700+ fields)."
        },
        {
          "q": "Context-switch time is…",
          "options": [
            "Useful computation",
            "Only spent on multicore CPUs",
            "Overhead",
            "Zero on modern CPUs"
          ],
          "answer": 2,
          "explain": "And it gets worse: caches and the TLB go cold for the new process."
        },
        {
          "q": "After `pid = fork();` the child sees pid ==",
          "options": [
            "its own PID",
            "the parent's PID",
            "-1",
            "0"
          ],
          "answer": 3,
          "explain": "The parent sees the child's PID (>0) so it can wait() for / signal it. -1 means fork failed."
        },
        {
          "q": "A child exited, but its parent never called wait(). The child is…",
          "options": [
            "Zombie",
            "An orphan",
            "Running",
            "Re-parented to PID 1"
          ],
          "answer": 0,
          "explain": "Its PCB stays in the process table holding the exit status until the parent reaps it."
        },
        {
          "q": "The shared-memory bounded buffer using only `in` and `out` can hold at most…",
          "options": [
            "BUFFER_SIZE items",
            "BUFFER_SIZE minus 1",
            "Unlimited items",
            "1 item"
          ],
          "answer": 1,
          "explain": "If it used all N slots, in == out would mean both \"empty\" and \"full\"."
        },
        {
          "q": "If both send() and receive() are blocking, this is called…",
          "options": [
            "A race condition",
            "A zombie",
            "Rendezvous",
            "Cascading termination"
          ],
          "answer": 2,
          "explain": "Both processes must be ready at the same time."
        },
        {
          "q": "For `int fd[2]; pipe(fd);` which end is for reading?",
          "options": [
            "fd[1]",
            "Both",
            "Neither — pipes are write-only",
            "fd[0]"
          ],
          "answer": 3,
          "explain": "fd[0] = read end, fd[1] = write end. The shell's `|` uses an anonymous pipe."
        }
      ],
      "cards": [
        [
          "Process",
          "A program in execution — active entity with text, data, heap, stack, PC and registers."
        ],
        [
          "Text / Data / BSS / Heap / Stack",
          "Code · initialized globals · uninitialized globals · malloc memory (grows up) · locals & frames (grows down)."
        ],
        [
          "Five process states",
          "New · Ready · Running · Waiting · Terminated."
        ],
        [
          "Six transitions",
          "admit (New→Ready), dispatch (Ready→Running), interrupt (Running→Ready), I/O wait (Running→Waiting), I/O complete (Waiting→Ready), exit (Running→Terminated)."
        ],
        [
          "PCB",
          "Process Control Block: state, PC, registers, scheduling, memory, accounting, I/O status. Linux: task_struct."
        ],
        [
          "Ready queue / wait queues",
          "Ready: in memory, waiting for a CPU. Wait queues: waiting for a specific event (I/O, child exit)."
        ],
        [
          "Context switch",
          "Save state of the old process into its PCB, load the new one's PCB. Pure overhead (+ cold caches/TLB)."
        ],
        [
          "fork()",
          "Creates a child as a duplicate of the parent. Returns 0 in child, child PID in parent, <0 on failure."
        ],
        [
          "exec()",
          "Replaces the process's memory with a new program (e.g. execlp(\"/bin/ls\", \"ls\", NULL))."
        ],
        [
          "wait() / exit()",
          "exit(status) ends a process; wait(&status) lets the parent collect a child's status (reaping)."
        ],
        [
          "Zombie",
          "Exited process whose parent hasn't called wait(); its PCB lingers. State Z in ps."
        ],
        [
          "Orphan",
          "Process whose parent terminated; re-parented to init/systemd (PID 1), which reaps it."
        ],
        [
          "Cascading termination",
          "Some OSes kill all children (and grandchildren) when a parent terminates."
        ],
        [
          "Shared memory IPC",
          "Processes map the same region (shmget/shmat). Fast after setup; needs synchronization."
        ],
        [
          "Message passing IPC",
          "send(msg)/receive(msg) through the kernel. Simpler, safer, works across machines, slower."
        ]
      ]
    },
    {
      "n": 4,
      "title": "Threads & Concurrency",
      "summary": "Threads vs processes, multicore programming and Amdahl's Law, multithreading models, Pthreads in C, implicit threading, threading issues, and Linux/Windows threads.",
      "takeaways": [
        "Threads share code, data, heap and open files; each has its own PC, registers and stack.",
        "Benefits: responsiveness, resource sharing, economy, scalability.",
        "Concurrency = progress on one core by switching; parallelism = simultaneous on many cores.",
        "Amdahl: speedup ≤ 1 / (S + (1−S)/N); as N → ∞ speedup → 1/S.",
        "Linux and Windows use the one-to-one model.",
        "Pthreads: pthread_create, pthread_join, pthread_exit; compile with -pthread."
      ],
      "traps": [
        [
          "\"Threads and processes are the same thing.\"",
          "Processes have separate memory; threads share memory within a process."
        ],
        [
          "\"More threads always means faster.\"",
          "Amdahl: the serial part limits speedup; too many threads add switching overhead."
        ],
        [
          "\"Threads run in parallel on a single-core CPU.\"",
          "Single core = concurrency (time slicing), not parallelism."
        ],
        [
          "\"counter++ is atomic.\"",
          "It is 3 instructions (load, add, store). Two threads can lose updates."
        ]
      ],
      "activities": [
        {
          "id": "ch4-amdahl",
          "title": "Bakery, Amdahl & Parallelism",
          "desc": "Delegate the bakery tasks, then play with S and N to see why 1000 cores won't make your program 1000× faster.",
          "href": "ch4/amdahl.html"
        },
        {
          "id": "ch4-models",
          "title": "Multithreading Models",
          "desc": "Map user threads to kernel threads (many-to-one, one-to-one, many-to-many), block one on I/O, and see who keeps running.",
          "href": "ch4/models.html"
        },
        {
          "id": "ch4-race",
          "title": "Race Condition Stepper",
          "desc": "Interleave load/add/store of two threads by hand, then run a million counter++ and watch updates get lost.",
          "href": "ch4/race.html"
        }
      ],
      "quiz": [
        {
          "q": "What do threads of the same process NOT share?",
          "options": [
            "Registers",
            "Program code",
            "Dynamic heap",
            "Global variables"
          ],
          "answer": 0,
          "explain": "Threads share code, data, heap and open files; each thread has its own PC, registers and stack."
        },
        {
          "q": "Which is NOT one of the four benefits of multithreading?",
          "options": [
            "Responsiveness",
            "Memory isolation",
            "Economy",
            "Scalability"
          ],
          "answer": 1,
          "explain": "Benefits: responsiveness, resource sharing, economy, scalability. Threads deliberately do NOT isolate memory."
        },
        {
          "q": "On a single-core CPU, three threads take turns. This is…",
          "options": [
            "Parallelism",
            "Neither",
            "Concurrency",
            "Data parallelism"
          ],
          "answer": 2,
          "explain": "Concurrency = more than one task making progress. Parallelism needs multiple cores."
        },
        {
          "q": "Amdahl: S = 0.25 (25% serial), N = 2 cores. Speedup =",
          "options": [
            "2.0",
            "4.0",
            "1.25",
            "1.6"
          ],
          "answer": 3,
          "explain": "1 / (0.25 + 0.75/2) = 1 / 0.625 = 1.6."
        },
        {
          "q": "Same program (S = 0.25) on infinitely many cores. Maximum speedup =",
          "options": [
            "4",
            "Infinite",
            "1000",
            "2"
          ],
          "answer": 0,
          "explain": "As N → ∞, speedup → 1/S = 4. The serial part dominates."
        },
        {
          "q": "Summing 1 million numbers by giving each of 4 cores 250K of them is…",
          "options": [
            "Task parallelism",
            "Data parallelism",
            "Concurrency only",
            "Many-to-one"
          ],
          "answer": 1,
          "explain": "Same operation on different subsets of data. Task parallelism = different operations per thread (render, decode, JS)."
        },
        {
          "q": "In the many-to-one model, if one user thread blocks on I/O…",
          "options": [
            "Only that thread blocks",
            "The kernel creates a new thread",
            "All its threads block",
            "The process is killed"
          ],
          "answer": 2,
          "explain": "There is only one kernel thread. It also cannot run in parallel on multicore."
        },
        {
          "q": "Linux and Windows use which multithreading model?",
          "options": [
            "Many-to-one",
            "Many-to-many",
            "Two-level only",
            "One-to-one"
          ],
          "answer": 3,
          "explain": "Each pthread_create() makes a kernel thread. True parallelism; thread count may be limited by kernel overhead."
        },
        {
          "q": "Which call waits for a thread to finish?",
          "options": [
            "pthread_join()",
            "pthread_create()",
            "pthread_exit()",
            "wait()"
          ],
          "answer": 0,
          "explain": "pthread_join(tid, NULL) blocks the caller until thread tid finishes."
        },
        {
          "q": "Which Pthreads call starts a worker function?",
          "options": [
            "pthread_join()",
            "pthread_create()",
            "pthread_exit()",
            "pthread_attr_init()"
          ],
          "answer": 1,
          "explain": "pthread_create starts the thread at its runner function; join waits and exit ends a thread."
        },
        {
          "q": "In the course example, main should print the worker’s sum after which action?",
          "options": [
            "Resetting sum",
            "Starting a second process",
            "Joining the worker",
            "Cancelling every thread"
          ],
          "answer": 2,
          "explain": "pthread_join waits until the worker has finished computing the shared sum."
        },
        {
          "q": "Main advantage of a thread pool?",
          "options": [
            "Each task gets its own process",
            "Eliminates race conditions",
            "Removes the need for a scheduler",
            "Reuse a bounded set of threads"
          ],
          "answer": 3,
          "explain": "Used by Apache, nginx, MySQL, PostgreSQL."
        }
      ],
      "cards": [
        [
          "Thread",
          "A unit of execution inside a process: own PC, registers, stack; shares code, data, heap, files."
        ],
        [
          "Four benefits",
          "Responsiveness · Resource sharing · Economy · Scalability."
        ],
        [
          "Concurrency",
          "More than one task making progress — possible on one core by switching."
        ],
        [
          "Parallelism",
          "More than one task executing simultaneously — needs multiple cores."
        ],
        [
          "Data parallelism",
          "Same operation on different subsets of data on each core (e.g. partial sums)."
        ],
        [
          "Task parallelism",
          "Different operations on different threads/cores (render, decode, JS)."
        ],
        [
          "Amdahl's Law",
          "speedup ≤ 1 / (S + (1−S)/N). As N → ∞, speedup → 1/S."
        ],
        [
          "User vs kernel threads",
          "User threads are managed by a library; kernel threads are managed and scheduled by the OS. The mapping model determines blocking and parallelism."
        ],
        [
          "Many-to-one",
          "Many user threads → 1 kernel thread. No parallelism; one block blocks all. (Green threads — rare)"
        ],
        [
          "One-to-one",
          "Each user thread → its own kernel thread. True parallelism. Linux, Windows."
        ],
        [
          "Many-to-many",
          "Many user threads → many (≤) kernel threads. Flexible, rare (Windows ThreadFiber)."
        ],
        [
          "pthread_create",
          "pthread_create(&tid, attr, runner, arg) — runner is void *runner(void *arg)."
        ],
        [
          "pthread_join",
          "Waits for a thread to finish (like wait() for processes)."
        ],
        [
          "Thread pool",
          "Pre-created threads take tasks from a queue — faster, bounded, flexible."
        ],
        [
          "Fork-join",
          "Fork subtasks into threads, join to collect results (merge sort, parallel sum)."
        ]
      ]
    }
  ],
  "games": {
    "interrupt-steps": {
      "ch": 1,
      "type": "order",
      "title": "Handling an Interrupt",
      "intro": "Order what happens when a device interrupts the CPU (Silberschatz Fig 1.3–1.4).",
      "items": [
        "The device controller sends an interrupt signal on the bus",
        "The CPU finishes the current instruction",
        "The CPU saves the address of the interrupted instruction (PC)",
        "The CPU looks up the handler address in the interrupt vector",
        "The interrupt handler runs and services the device",
        "The handler executes \"return from interrupt\"",
        "The saved PC is restored and the original program resumes"
      ]
    },
    "privileged": {
      "ch": 1,
      "type": "bucket",
      "title": "User Mode or Kernel Only?",
      "intro": "Which actions can a normal program do in user mode (mode bit 1), and which are privileged (kernel mode only)?",
      "buckets": [
        "Allowed in user mode",
        "Privileged — kernel mode only"
      ],
      "items": [
        [
          "Add two integers",
          0
        ],
        [
          "Call a function in its own code",
          0
        ],
        [
          "Read its own local variable",
          0
        ],
        [
          "Execute the syscall instruction to request read()",
          0,
          "This is HOW user code asks the kernel — it is allowed, and it switches to kernel mode."
        ],
        [
          "Disable interrupts",
          1
        ],
        [
          "Set the hardware timer",
          1
        ],
        [
          "Modify MMU / page-table registers",
          1
        ],
        [
          "Directly program the disk controller",
          1
        ],
        [
          "Switch the mode bit to 0 by itself",
          1,
          "Only a trap/interrupt/syscall can enter kernel mode."
        ],
        [
          "Allocate stack space for a local array",
          0
        ]
      ]
    },
    "syscall-types": {
      "ch": 2,
      "type": "bucket",
      "title": "Six Types of System Calls",
      "intro": "Drop each call into its category (Silberschatz §2.4).",
      "buckets": [
        "Process control",
        "File management",
        "Device management",
        "Information maintenance",
        "Communications",
        "Protection"
      ],
      "items": [
        [
          "fork()",
          0
        ],
        [
          "exit() / wait()",
          0
        ],
        [
          "load() / execute()",
          0
        ],
        [
          "allocate() / free() memory",
          0
        ],
        [
          "create_file() / delete_file()",
          1
        ],
        [
          "open() / close() a file",
          1
        ],
        [
          "get_file_attributes()",
          1
        ],
        [
          "request_device() / release_device()",
          2
        ],
        [
          "ioctl()",
          2
        ],
        [
          "get_time() / set_time()",
          3
        ],
        [
          "get_process_stats()",
          3
        ],
        [
          "get_memory_free()",
          3
        ],
        [
          "create_pipe()",
          4
        ],
        [
          "send() / recv()",
          4
        ],
        [
          "connect() / accept() / listen()",
          4
        ],
        [
          "chmod() / chown()",
          5
        ],
        [
          "allow_user() / deny_user()",
          5
        ],
        [
          "set_permission()",
          5
        ]
      ]
    },
    "mech-policy": {
      "ch": 2,
      "type": "bucket",
      "title": "Mechanism or Policy?",
      "intro": "Mechanism = HOW to do something. Policy = WHAT to do.",
      "buckets": [
        "Mechanism (how)",
        "Policy (what)"
      ],
      "items": [
        [
          "A timer interrupt",
          0
        ],
        [
          "A context switch",
          0
        ],
        [
          "A page table",
          0
        ],
        [
          "The mode bit",
          0
        ],
        [
          "Which process runs next",
          1
        ],
        [
          "Which page to evict",
          1
        ],
        [
          "When to swap",
          1
        ],
        [
          "Who can access which file",
          1
        ]
      ]
    },
    "state-events": {
      "ch": 3,
      "type": "match",
      "title": "Events → Transitions",
      "intro": "Match each event to the state transition it causes (Fig 3.2).",
      "pairs": [
        [
          "The OS admits the new process",
          "New → Ready"
        ],
        [
          "The scheduler dispatches it",
          "Ready → Running"
        ],
        [
          "Timer interrupt — time slice expired",
          "Running → Ready"
        ],
        [
          "It calls read() on the disk",
          "Running → Waiting"
        ],
        [
          "The disk read completes",
          "Waiting → Ready"
        ],
        [
          "It calls exit()",
          "Running → Terminated"
        ]
      ]
    },
    "context-switch": {
      "ch": 3,
      "type": "order",
      "title": "Context Switch P0 → P1",
      "intro": "Order the steps of a context switch (Fig 3.8).",
      "items": [
        "P0 is running",
        "An interrupt or system call enters the kernel",
        "The OS saves P0's state (PC, registers) into PCB0",
        "The OS picks P1 from the ready queue",
        "The OS reloads P1's state from PCB1",
        "P1 executes; P0 waits in the ready queue"
      ]
    },
    "shared-private": {
      "ch": 4,
      "type": "bucket",
      "title": "Shared or Per-Thread?",
      "intro": "Fig 4.1: which parts are shared by all threads of a process, and which does each thread have its own copy of?",
      "buckets": [
        "Shared by all threads",
        "Private to each thread"
      ],
      "items": [
        [
          "Code (text)",
          0
        ],
        [
          "Global data",
          0
        ],
        [
          "Heap (malloc memory)",
          0
        ],
        [
          "Open files",
          0
        ],
        [
          "Signal handlers",
          0,
          "clone() with CLONE_SIGHAND shares them."
        ],
        [
          "Program counter",
          1
        ],
        [
          "Registers",
          1
        ],
        [
          "Stack (and local variables)",
          1
        ],
        [
          "A __thread variable",
          1
        ]
      ]
    },
    "parallelism-type": {
      "ch": 4,
      "type": "bucket",
      "title": "Data or Task Parallelism?",
      "intro": "Data parallelism = same operation on different data. Task parallelism = different operations.",
      "buckets": [
        "Data parallelism",
        "Task parallelism"
      ],
      "items": [
        [
          "Each of 4 cores sums 250K of 1M numbers",
          0
        ],
        [
          "Each core brightens one quarter of an image",
          0
        ],
        [
          "OpenMP #pragma omp parallel for on c[i] = a[i] + b[i]",
          0
        ],
        [
          "Browser: one thread renders HTML, another decodes images, another runs JS",
          1
        ],
        [
          "Word processor: one thread for typing, one for spell check, one for auto-save",
          1
        ]
      ]
    }
  }
};

Object.assign(window.COURSE, {
  "exam": {
    "title": "Midterm",
    "label": "Exam format",
    "scope": "Chapters 1–4",
    "parts": [
      [
        "10 short questions",
        null,
        "Definitions and brief explanations"
      ],
      [
        "2 long questions",
        null,
        "Explain a process or work through an example"
      ]
    ],
    "plan": [
      [
        "ozet.html",
        "Review the two exam parts",
        "20–30 min"
      ],
      [
        "mock.html",
        "Practise two short papers",
        ""
      ],
      [
        "learn.html?ch=1",
        "Revisit a weak chapter",
        ""
      ]
    ],
    "done": false
  },
  "resources": [
    {
      "kind": "summary",
      "href": "ozet.html",
      "title": "Midterm özeti",
      "meta": "Türkçe · Chapters 1–4",
      "desc": "Short definitions, comparisons and worked examples for the two exam parts."
    },
    {
      "kind": "mock",
      "href": "mock.html",
      "title": "Mock midterm",
      "meta": "2 papers · 10 short + 2 long each",
      "desc": "Instant feedback for short checks; keyword models for written answers."
    }
  ]
});
