/* Guided lessons, refactored from the existing course content.
 * Raw slides were unavailable for this revision. Existing source-conflict notes are retained.
 * Correct check first; learn.js shuffles options. */
window.GUIDE = {
  "1": {
    "goal": "Explain how the OS shares hardware while keeping control.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "One machine, many programs",
        "key": "The <b>operating system</b> controls resources; <b>processes</b> and <b>threads</b> use them, the <b>scheduler</b> shares the CPU among them, and <b>synchronization</b> keeps their shared data safe.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>A browser, a compiler and a game all need the same CPU and memory. Who decides which one gets to use them? The <b>operating system</b>.</p><p>This course follows that sharing problem. First learn how the OS controls hardware (1–2). Then follow the running programs and their threads (3–4). Finally decide who runs next (5) and how to keep shared data correct (6).</p><p>For now, focus on the foundation: how does the OS stay in control after it lets a program run?</p>",
        "check": {
          "q": "Why does sharing one machine require an operating system?",
          "o": [
            "Programs need coordinated access to limited resources",
            "Every program owns a separate physical CPU",
            "Applications never need memory"
          ],
          "why": "The OS allocates shared hardware and controls its use."
        }
      },
      {
        "t": "Why do we need an operating system?",
        "key": "The <b>OS</b> allocates resources and controls their use; the <b>kernel</b> is its core.",
        "fig": {
          "type": "stack",
          "t": "The four components of a computer system",
          "items": [
            [
              "Users",
              "people, machines, other computers",
              "c3"
            ],
            [
              "Application programs",
              "browser, compiler, games",
              "c1"
            ],
            [
              "Operating system",
              "controls the hardware and shares it out",
              "c4"
            ],
            [
              "Hardware",
              "CPU, memory, I/O devices",
              "c0"
            ]
          ],
          "cap": "Users run applications; the OS coordinates their use of hardware."
        },
        "html": "<p>Think of the four layers in the picture. Users want work done. Applications do that work. Hardware provides the CPU, memory and devices. The OS coordinates access between them.</p><p>It has two roles. As a <b>resource allocator</b>, it shares the hardware. As a <b>control program</b>, it prevents improper use. The <b>kernel</b> is the core that remains running throughout operation.</p><p>So when you see “OS,” think beyond the desktop: think about the code deciding who can use which resource.</p><div class=\"callout warn\">The desktop is a user-space program; it is not the kernel.</div>",
        "check": {
          "q": "Which two roles does the lecture give the OS?",
          "o": [
            "Resource allocator and control program",
            "Compiler and linker",
            "Web browser and file viewer",
            "Hardware and firmware"
          ],
          "why": "OS = resource allocator AND control program."
        }
      },
      {
        "t": "A device finishes. How does the CPU find out?",
        "key": "Instead of the CPU asking \"are you done yet?\" again and again (<b>polling</b>), the device <b>taps the CPU on the shoulder</b> when it finishes (an <b>interrupt</b>).",
        "fig": {
          "type": "anim",
          "name": "interrupt",
          "t": "What happens when an interrupt arrives",
          "cap": "The interrupted program never notices. It continues exactly where it stopped."
        },
        "html": "<p>Suppose the CPU is running a program when an I/O device finishes. The device sends an <b>interrupt</b>: a signal asking the CPU to handle the event.</p><ol><li>Finish the current instruction.</li><li>Save the running program’s position and registers.</li><li>Use the <b>interrupt vector</b> to find the handler.</li><li>Handle the event, restore the saved state and resume.</li></ol><p>Saving state is why the program can continue where it stopped. With <b>polling</b>, the CPU repeatedly checks the device instead. A <b>trap</b> comes from software, such as a service request or division by zero.</p>",
        "lab": {
          "href": "ch1/interrupts.html",
          "todo": [
            "Click <b>Pause</b>, press <b>Key pressed</b>, then use <b>Step</b> to go through each stage. Watch the PC being saved and restored.",
            "Try <b>Program divides by zero</b> — that's a trap, generated by the program itself.",
            "Scroll to the polling vs interrupts vs DMA comparison."
          ]
        },
        "check": {
          "q": "What does the CPU do first, right after it finishes the current instruction when an interrupt arrives?",
          "o": [
            "Saves the state (PC, registers) of the running program",
            "Deletes the running program",
            "Restarts the computer",
            "Ignores the device until the program ends"
          ],
          "why": "Save state → find the handler via the interrupt vector → run it → restore."
        }
      },
      {
        "t": "Let the device transfer a whole block",
        "key": "For big transfers, <b>DMA</b> lets the device copy a whole block straight into memory and interrupt the CPU <b>once per block</b>, not once per word.",
        "fig": {
          "type": "boxes",
          "t": "Interrupts for one 4 KB disk transfer",
          "rows": [
            {
              "label": "Interrupt-driven",
              "cells": [
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "",
                  "bad"
                ],
                [
                  "… ×1000",
                  "bad"
                ]
              ]
            },
            {
              "label": "DMA",
              "cells": [
                [
                  "copying…",
                  "mute"
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
                ],
                [
                  "done",
                  "ok"
                ]
              ]
            }
          ],
          "cap": "Each is one interrupt. With DMA the CPU is free during the whole copy."
        },
        "html": "<p>An interrupt is useful, but handling one for every word of a large transfer keeps the CPU busy with small interruptions.</p><p><b>DMA</b>, Direct Memory Access, changes who does the copying. The device controller transfers a block directly to memory without the CPU copying each word. It interrupts the CPU when the block is done.</p><p>Follow the two rows in the picture: many interruptions in the lecture’s word-at-a-time model, versus one completion interrupt for a DMA block. The saving is CPU involvement during the transfer.</p>",
        "check": {
          "q": "A disk sends a 4 KB block using DMA. How many interrupts does the CPU receive?",
          "o": [
            "One, when the block is done",
            "One per byte",
            "One per word",
            "None ever"
          ],
          "why": "DMA = one interrupt per block."
        }
      },
      {
        "t": "Keep useful data close to the CPU",
        "key": "Storage is a trade-off: the <b>faster</b> it is, the <b>smaller and more expensive</b> it is. A <b>cache</b> keeps a copy of the data you need now in faster storage.",
        "fig": {
          "type": "stack",
          "pyramid": true,
          "top": "faster, smaller, costly",
          "bottom": "slower, bigger, cheap",
          "items": [
            [
              "Registers",
              "inside the CPU",
              "c4"
            ],
            [
              "Cache",
              "SRAM",
              "c2"
            ],
            [
              "Main memory (RAM)",
              "volatile",
              "c1"
            ],
            [
              "SSD / NVM",
              "non-volatile",
              "c5"
            ],
            [
              "Hard disk",
              "non-volatile",
              "c0"
            ],
            [
              "Optical disk / tape",
              "archive",
              "c3"
            ]
          ],
          "cap": "Registers, cache and RAM lose their contents when the power goes off (<b>volatile</b>). SSD and below keep them."
        },
        "html": "<p>Why not store everything in the fastest memory? Fast storage is small and expensive. Large storage is slower and cheaper.</p><p>A <b>cache</b> keeps a copy in a faster layer. The storage lab follows one item, A, moving towards the CPU. If A changes, other copies can become outdated: that is the <b>cache coherence</b> problem.</p><p>Read the hierarchy from top to bottom. Registers, cache and RAM are <b>volatile</b>: they lose their contents without power. SSDs and disks keep data without power. Speed and persistence are different properties.</p><div class=\"callout warn\">Cache is on the CPU die, much faster and smaller than RAM; the OS does not manage it directly.</div>",
        "lab": {
          "href": "ch1/storage.html",
          "todo": [
            "Click <b>CPU: load A</b> and watch A move up from disk to a register.",
            "Click <b>CPU: modify A</b>: now the copies below are outdated.",
            "Try <b>Context switch</b> and <b>Power off &amp; on</b>: which copies survive?"
          ]
        },
        "check": {
          "q": "Which is non-volatile?",
          "o": [
            "SSD",
            "Cache",
            "Registers",
            "Main memory (RAM)"
          ],
          "why": "Registers, cache and RAM lose their content without power."
        }
      },
      {
        "t": "Give programs limited power, then take control back",
        "key": "The <b>mode bit</b> restricts privileged operations; the <b>timer</b> returns control to the OS.",
        "fig": {
          "type": "graph",
          "w": 640,
          "h": 210,
          "nodes": {
            "u": [
              130,
              105,
              "User mode (bit = 1)",
              "c1"
            ],
            "k": [
              510,
              105,
              "Kernel mode (bit = 0)",
              "c4"
            ]
          },
          "edges": [
            [
              "u",
              "k",
              "system call / trap / interrupt",
              45
            ],
            [
              "k",
              "u",
              "return from kernel",
              45
            ]
          ],
          "cap": "Privileged instructions (I/O, timer, interrupt control) only work in kernel mode. The <b>timer</b> makes sure the OS gets control back even if a program loops forever."
        },
        "html": "<p>If a program could disable interrupts or change any memory, sharing would be unsafe. Hardware therefore distinguishes <b>user mode</b> from <b>kernel mode</b>.</p><p>In the lecture’s convention, bit 1 means user mode; bit 0 means kernel mode. Only kernel mode permits privileged operations. A system call, trap or interrupt enters the kernel through a controlled route.</p><p>But what if a user program loops forever? Before running it, the OS sets a <b>timer</b>. The timer interrupts and gives control back. The mode bit limits what a program can do; the timer limits how long it can keep control.</p><div class=\"callout warn\">Software rules alone cannot enforce protection; the mode bit and timer supply hardware support.</div>",
        "lab": {
          "href": "ch1/dualmode.html",
          "todo": [
            "As game.exe, try each instruction button. Privileged ones trap to the OS.",
            "Make a system call: watch the mode bit flip 1 → 0 → 1.",
            "Run the infinite loop with the timer on, then <b>turn the timer off</b> and run it again.",
            "Untick <b>CPU has a mode bit</b> and try writing outside your memory."
          ]
        },
        "check": {
          "q": "Why does the OS set a hardware timer?",
          "o": [
            "So that it always gets the CPU back, even from an infinite loop",
            "To measure how long the computer has been on",
            "To speed up the CPU",
            "To switch to user mode permanently"
          ],
          "why": "The timer interrupt returns control to the OS."
        }
      },
      {
        "t": "The same sharing problem appears everywhere",
        "key": "The OS is a manager of <b>five things</b>: processes, memory, storage (files), I/O devices, and protection and security.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Processes",
              "pts": [
                "create, delete",
                "schedule",
                "synchronize, communicate"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Memory",
              "pts": [
                "who uses which part",
                "move in and out",
                "allocate, free"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Storage",
              "pts": [
                "files, directories",
                "free-space, disks"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "I/O",
              "pts": [
                "drivers",
                "buffering, caching, spooling"
              ],
              "c": "c3"
            },
            {
              "icon": "",
              "t": "Protection",
              "pts": [
                "control access",
                "defend against attacks"
              ],
              "c": "c4"
            }
          ]
        },
        "html": "<p>The CPU is only one resource. The OS also tracks memory, organizes files and storage, coordinates I/O and controls access.</p><p>Connect each job to a question: which process runs? Which memory is free? Where is a file stored? Which driver handles a device? Who has permission?</p><p>A <b>program</b> is a passive file; a <b>process</b> is a running instance. We will follow processes in Chapter 3. Virtualization extends resource sharing further: a <b>hypervisor</b> lets several virtual machines run their own operating systems.</p><p>Next comes the missing link: how does an application ask the OS to do these jobs?</p><div class=\"callout warn\">Multitasking is time-sliced; on a single-core CPU only one task runs at any instant.</div>",
        "check": {
          "q": "Which OS responsibility connects this chapter to Chapter 3?",
          "o": [
            "Process management",
            "Compiling every application",
            "Writing all user documents"
          ],
          "why": "Chapter 3 follows the processes the OS creates, schedules and manages."
        }
      }
    ],
    "question": "How can several programs use one machine safely?"
  },
  "2": {
    "goal": "Trace a service request from user code into the kernel and back.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "A protected machine still needs to be useful",
        "key": "Chapter 1 established <b>protection</b>; Chapter 2 explains how programs request <b>services</b>.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>Chapter 1 restricted what applications can do directly. A program still needs files and devices, so protection needs a controlled way to request help.</p><p>Use <code>read()</code> as your thread through this chapter: the program asks for data, the kernel handles the request, then execution returns to the program.</p><p>First identify the services. Then follow the request across the user/kernel boundary. Finally look at the different ways to organize the kernel behind that boundary.</p>",
        "check": {
          "q": "A user-mode program needs to read a file. What should it do?",
          "o": [
            "Request a kernel service through a system call",
            "Execute any privileged instruction directly",
            "Disable the mode bit"
          ],
          "why": "A controlled kernel entry makes protected services available to applications."
        }
      },
      {
        "t": "A service is something the OS does for you",
        "key": "The OS offers <b>services</b>: five help the <b>user</b> (UI, program execution, I/O, files, communication), the others keep the <b>system</b> working (error detection, resource allocation, accounting, protection).",
        "fig": {
          "type": "compare",
          "vs": false,
          "cols": [
            {
              "icon": "",
              "t": "Benefit the user",
              "pts": [
                "user interface (GUI, CLI, touch)",
                "program execution",
                "I/O operations",
                "file-system manipulation",
                "communication"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Benefit the system",
              "pts": [
                "error detection (slide 6)",
                "resource allocation",
                "logging / accounting",
                "protection and security"
              ],
              "c": "c0"
            }
          ]
        },
        "html": "<p>Running a program, reading a file and communicating with another process are <b>OS services</b>. A user interface is also a service: it gives you a way to request work.</p><p>The lecture groups interface, execution, I/O, file handling and communication as user services. Resource allocation, accounting, protection and security keep the system operating safely.</p><p>Do not confuse the interface with the whole OS. The shell is a replaceable user program; the kernel provides the protected operations it uses.</p><div class=\"callout warn\"><b>The sources disagree on error detection.</b> Slide 6 marks it as a system service; the midterm guide (exercise 2.2) and the study guide list it with the user services. If an exam question asks, name the grouping you use.</div>",
        "check": {
          "q": "Is a command shell the kernel?",
          "o": [
            "No, it is a user program",
            "Yes, every shell is the kernel",
            "Only if it displays text"
          ],
          "why": "The user interface is a service; a command interpreter is a replaceable program."
        }
      },
      {
        "t": "Follow read() across the boundary",
        "key": "A <b>system call</b> is how a program asks the kernel to do something it may not do itself. Programs usually call it through an <b>API</b> (like <code>printf</code> → <code>write</code>).",
        "fig": {
          "type": "anim",
          "name": "syscall",
          "t": "The journey of one system call",
          "cap": "Parameters travel in <b>registers</b>, in a <b>block in memory</b> (address in a register), or on the <b>stack</b>."
        },
        "html": "<p>Your program begins in user mode. It calls <code>read(fd, buf, n)</code> through a library API.</p><ol><li>The library supplies a system-call number and arguments.</li><li>A trap instruction enters <b>kernel mode</b>: bit 1 → 0.</li><li>The system-call interface uses the number to select the handler.</li><li>The kernel does the work and returns a result.</li><li>Execution returns to <b>user mode</b>: bit 0 → 1.</li></ol><p>The API is the programmer-facing interface; the <b>system call</b> is the controlled kernel entry. Arguments can travel in registers, in a memory block whose address is passed, or on the stack.</p>",
        "lab": {
          "href": "ch2/syscall.html",
          "todo": [
            "Choose a system call, keep \"Registers\", and click <b>Next step</b> through the whole journey. Count the mode switches.",
            "Restart with \"Block in memory\" and then \"Stack\" parameter passing and compare."
          ]
        },
        "check": {
          "q": "How many times does the mode bit change during one system call?",
          "o": [
            "Twice (user → kernel, kernel → user)",
            "Once",
            "Never",
            "Four times"
          ],
          "why": "Enter the kernel and return: two flips."
        }
      },
      {
        "t": "Classify a call by the job it requests",
        "key": "Every system call falls into one of <b>six families</b>. Learn one example of each.",
        "fig": {
          "type": "boxes",
          "head": [
            "Family",
            "Example (UNIX)"
          ],
          "rows": [
            {
              "cells": [
                [
                  "Process control",
                  "c0"
                ],
                [
                  "fork(), exit(), wait()",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "File management",
                  "c1"
                ],
                [
                  "open(), read(), close()",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Device management",
                  "c2"
                ],
                [
                  "ioctl(), read(), write()",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Information maintenance",
                  "c5"
                ],
                [
                  "get_time(), get_process_stats()",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Communication",
                  "c3"
                ],
                [
                  "pipe(), shm_open(), mmap()",
                  ""
                ]
              ]
            },
            {
              "cells": [
                [
                  "Protection",
                  "c4"
                ],
                [
                  "chmod(), umask(), chown()",
                  ""
                ]
              ]
            }
          ]
        },
        "html": "<p>A file-copy program opens an input file, reads it, writes an output file and closes both. Those are <b>file-management</b> requests. Ending the program is <b>process control</b>.</p><p>The six families are:</p><ul><li><b>Process control</b>: fork, exec, exit, wait.</li><li><b>File management</b>: open, read, write, close.</li><li><b>Device management</b>: control a device.</li><li><b>Information maintenance</b>: get time or process information.</li><li><b>Communication</b>: pipes and shared memory.</li><li><b>Protection</b>: change access permissions.</li></ul><p>Ask “what job is requested?” before trying to remember a function name.</p><div class=\"callout warn\">System programs (ls, ps, gcc) are user programs that USE system calls.</div>",
        "check": {
          "q": "get_process_stats() belongs to which type?",
          "o": [
            "Information maintenance",
            "Process control",
            "Protection",
            "Device management"
          ],
          "why": "Getting/setting time, date, process attributes = information maintenance."
        }
      },
      {
        "t": "Separate the tool from the decision",
        "key": "<b>Mechanism</b> = <i>how</i> to do something. <b>Policy</b> = <i>what</i> will be done. Keeping them separate means you can change the policy without rewriting the mechanism.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Mechanism: HOW",
              "pts": [
                "the timer that interrupts the CPU",
                "the code that switches processes"
              ],
              "c": "c0"
            },
            {
              "icon": "",
              "t": "Policy: WHAT",
              "pts": [
                "how long each user gets the CPU",
                "which process runs next"
              ],
              "c": "c2"
            }
          ],
          "cap": "Example from the slides: the timer is a mechanism; deciding how long the timer is set for a user is a policy."
        },
        "html": "<p>A timer can interrupt a running program. That ability is a <b>mechanism</b>: how the OS can take control back.</p><p>Choosing how long a program may run is a <b>policy</b>: what the OS decides to do with that ability.</p><p>Keeping them separate makes change easier. You can choose a different time allowance without rebuilding the timer mechanism. When an exam gives an example, ask whether it describes a capability or a choice.</p>",
        "check": {
          "q": "\"Which process should run next?\" is a…",
          "o": [
            "policy",
            "mechanism",
            "system call",
            "kernel module"
          ],
          "why": "Policy = what to decide. The context-switch code that runs it is the mechanism."
        }
      },
      {
        "t": "Where should the services live?",
        "key": "Kernels are built in different ways. It is a trade-off between <b>speed</b> (everything in one big kernel) and <b>safety and flexibility</b> (small pieces that can fail or change alone).",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Monolithic",
              "pts": [
                "one big kernel (UNIX, Linux)",
                "fast",
                "hard to change; one bug can crash all"
              ],
              "c": "c4"
            },
            {
              "icon": "",
              "t": "Layered",
              "pts": [
                "layer N uses only layer N−1",
                "easy to debug",
                "slow, hard to define layers"
              ],
              "c": "c2"
            },
            {
              "icon": "",
              "t": "Microkernel",
              "pts": [
                "tiny kernel; services in user space (Mach)",
                "safe, easy to extend",
                "message-passing overhead"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Modules / hybrid",
              "pts": [
                "core + loadable modules (Linux, Windows, macOS)",
                "flexible and fast"
              ],
              "c": "c0"
            }
          ]
        },
        "html": "<p>All these designs provide services, but arrange the implementation differently.</p><ul><li><b>Simple</b>: little separation, as in MS-DOS.</li><li><b>Monolithic</b>: many services inside one kernel, as in original UNIX.</li><li><b>Layered</b>: organize responsibilities in layers.</li><li><b>Microkernel</b>: keep a small kernel; move services into user processes that exchange messages.</li><li><b>Modular</b>: a core with loadable modules, as in Linux.</li><li><b>Hybrid</b>: combine approaches.</li></ul><p>The central trade-off is service isolation versus the overhead of communication. We have now followed a request. Chapter 3 follows the running process that makes it.</p><div class=\"callout warn\">Moving services into user processes improves isolation, but message passing adds overhead.</div>",
        "lab": {
          "href": "ch2/structures.html",
          "todo": [
            "Pick <b>MS-DOS (simple)</b> and run all four experiments. Then do the same for the microkernel and modular structures.",
            "Compare your scorecard: which structure survives a driver crash? Which is fastest for a file read?"
          ]
        },
        "check": {
          "q": "In a microkernel, most services (drivers, file system) run…",
          "o": [
            "in user space and communicate by message passing",
            "inside the kernel",
            "only in firmware",
            "without any communication"
          ],
          "why": "Microkernel: minimal kernel, services in user space, IPC by messages."
        }
      }
    ],
    "question": "How does a program ask the kernel to do something?"
  },
  "3": {
    "goal": "Follow a process through its states, saved context, child creation and communication.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Follow the caller after the system call",
        "key": "A <b>process</b> is the active program whose resources and execution the OS manages.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>A program has asked the kernel to read data. While it waits for I/O, should the CPU sit idle? No: another process can run.</p><p>That means the OS must remember where the waiting process stopped, know when it is ready again, and eventually resume it.</p><p>Chapter 2 explained requests. This chapter explains the lifetime of the <b>process</b> making them: its memory, states, saved context, children and communication.</p>",
        "check": {
          "q": "A process requests I/O that has not finished. Why can another process run?",
          "o": [
            "The waiting process cannot continue yet, so the CPU can serve another ready process",
            "The waiting process has terminated",
            "I/O completion automatically runs the waiting process"
          ],
          "why": "Waiting is different from ready. The OS saves context and uses the CPU for other ready work."
        }
      },
      {
        "t": "A process is more than its program file",
        "key": "A <b>program</b> is a passive file on disk. A <b>process</b> is that program <b>running</b>, with its own memory and state.",
        "fig": {
          "type": "stack",
          "t": "A process in memory",
          "top": "max address",
          "bottom": "0",
          "items": [
            [
              "Stack",
              "function calls, local variables (grows ↓)",
              "c4"
            ],
            [
              "⋮ free space ⋮",
              "",
              "mute"
            ],
            [
              "Heap",
              "malloc / new (grows ↑)",
              "c2"
            ],
            [
              "Data",
              "global variables",
              "c1"
            ],
            [
              "Text",
              "the program code",
              "c0"
            ]
          ],
          "cap": "One program (e.g. a browser) can run as several processes at the same time."
        },
        "html": "<p>A program on disk is passive. A <b>process</b> is that program in execution, with a current instruction, registers and memory.</p><p>Read its memory layout: <b>text</b> holds code; <b>data</b> holds globals; the <b>heap</b> holds dynamically allocated memory; the <b>stack</b> holds function-call information and local variables.</p><p>The file tells us what instructions exist. The process state tells us what is happening now. That difference explains why the OS needs a separate record for each running instance.</p><div class=\"callout warn\">A program is a passive file; a process is active, in memory, with state. One program can be many processes.</div>",
        "check": {
          "q": "A local variable inside a function is stored in the…",
          "o": [
            "stack",
            "heap",
            "text section",
            "data section"
          ],
          "why": "Locals, parameters and return addresses → stack. malloc → heap. Globals → data."
        }
      },
      {
        "t": "Ready means waiting for the CPU; waiting means waiting for an event",
        "key": "Every process is in one of <b>five states</b>. Learn the <b>arrows</b> between them: exams ask which transitions are possible.",
        "fig": {
          "type": "anim",
          "name": "states",
          "t": "One process through its life",
          "cap": "There is <b>no</b> arrow waiting → running: a waiting process must go back to the ready queue first."
        },
        "html": "<p>A process begins <b>new</b>, is admitted to <b>ready</b>, and becomes <b>running</b> when dispatched.</p><p>From running it can finish (<b>terminated</b>), lose the CPU (back to ready), or request I/O (<b>waiting</b>). I/O completion moves it from waiting to ready. It still needs the scheduler to give it the CPU.</p><p>Trace those six arrows in the figure. The key distinction: a ready process could run now; a waiting process cannot continue until its event happens.</p><div class=\"callout warn\"><b>Exam trap:</b> Waiting → Running directly is <b>impossible</b>. When I/O completes, the process goes to <b>Ready</b> and waits for the scheduler.</div><div class=\"callout warn\">It goes Waiting → Ready. Only the scheduler moves Ready → Running.</div>",
        "lab": {
          "href": "ch3/states.html",
          "todo": [
            "Scenario challenge: click a process, then the state to move it to. Try an illegal move (Waiting → Running) and read the refusal.",
            "Round-robin simulator: <b>Run scheduler</b>, then <b>Launch ./a.out</b>. Watch the Gantt chart and the context-switch count."
          ]
        },
        "check": {
          "q": "A process's disk read finishes. Where does it go?",
          "o": [
            "Ready",
            "Running",
            "Terminated",
            "New"
          ],
          "why": "Waiting → Ready on I/O completion; then the scheduler dispatches it."
        }
      },
      {
        "t": "A context switch saves one process and restores another",
        "key": "The OS keeps a <b>PCB</b> (process control block) for every process. A <b>context switch</b> saves the old process's state into its PCB and loads the new one's.",
        "fig": {
          "type": "anim",
          "name": "ctxswitch",
          "t": "Context switch from P0 to P1 and back",
          "cap": "While the OS is switching, <b>no</b> process does useful work, so a context switch is pure overhead."
        },
        "html": "<p>To resume a process, the OS needs its program counter, registers and other management information. It stores these in a <b>Process Control Block (PCB)</b>, alongside its ID, state, scheduling and memory information.</p><p>During a <b>context switch</b>, the OS saves the outgoing process’s context and restores the incoming one. The CPU then continues that process where it stopped.</p><p>Ready and waiting queues help track who can run and who needs an event. Switching is overhead: the CPU spends time managing execution rather than doing either program’s work.</p><div class=\"callout warn\"><b></b> A context switch is <b>pure overhead</b> — no useful work is done during it.</div>",
        "check": {
          "q": "During a context switch from P0 to P1 the OS…",
          "o": [
            "saves P0's state in its PCB and loads P1's state from its PCB",
            "deletes P0",
            "copies P0's memory into P1",
            "runs both at once on one core"
          ],
          "why": "Save old PCB, load new PCB."
        }
      },
      {
        "t": "fork creates; exec replaces; wait collects",
        "key": "<code>fork()</code> creates a child; <code>exec()</code> replaces the calling process’s program; <code>wait()</code> collects a child’s exit status.",
        "fig": {
          "type": "anim",
          "name": "fork",
          "t": "fork → exec → wait → exit",
          "cap": "<b>Zombie</b> = finished child whose parent has not called wait() yet. <b>Orphan</b> = child whose parent ended without waiting."
        },
        "html": "<p>These calls do different jobs. Follow them in order:</p><ol><li><code>fork()</code> creates a child. Both continue after the call: the child sees return value 0; the parent sees the child PID. Failure returns −1.</li><li><code>exec()</code> replaces the calling process’s program. It does not create another process.</li><li><code>exit()</code> ends execution.</li><li><code>wait()</code> lets the parent collect a child’s exit status.</li></ol><p>A terminated child whose status has not been collected is a <b>zombie</b>. A child whose parent ends first is an <b>orphan</b>.</p><p>If every process executes n successive successful fork calls, each call doubles the process count: 2ⁿ total, including the original. Three such calls give 8.</p>",
        "lab": {
          "href": "ch3/fork.html",
          "todo": [
            "Part 1: pick a program, type your guess for the number of processes, then <b>Run to the end</b>. Use <b>Step</b> to see who prints what.",
            "Part 2: make a zombie (child exits, parent doesn't wait), then an orphan (parent exits first)."
          ]
        },
        "check": {
          "q": "What does fork() return in the child process?",
          "o": [
            "0",
            "The child's PID",
            "The parent's PID",
            "−1"
          ],
          "why": "0 in the child, the child's PID in the parent."
        }
      },
      {
        "t": "Processes can share a region or exchange messages",
        "key": "Processes can talk in two ways: write into a <b>shared memory</b> area, or <b>send messages</b> through the kernel.",
        "fig": {
          "type": "compare",
          "vs": true,
          "cols": [
            {
              "icon": "",
              "t": "Shared memory",
              "pts": [
                "processes share one memory region",
                "fast: no kernel after setup",
                "processes must synchronize themselves (bounded buffer!)"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Message passing",
              "pts": [
                "send(P, msg) / receive(Q, msg)",
                "easy, works across computers",
                "slower: each message goes through the kernel"
              ],
              "c": "c0"
            }
          ]
        },
        "html": "<p>With <b>shared memory</b>, processes access a common region after setup. With <b>message passing</b>, they exchange data through send and receive operations.</p><p>In the bounded-buffer example, a producer inserts at <code>in</code>; a consumer removes at <code>out</code>. Advancing uses modulo arithmetic so an index wraps around. <code>in == out</code> means empty; <code>(in + 1) % N == out</code> means full. Leaving one slot unused distinguishes the two, so capacity is N − 1.</p><p>Sharing data creates a new problem: coordinating access. Chapter 4 introduces threads sharing within one process; Chapter 6 makes updates safe.</p><div class=\"callout warn\">Capacity is SIZE − 1; reserving a slot distinguishes full from empty. Shared updates such as counter++ can interleave and lose an update.</div><p>A blocking send or receive waits; two blocking partners form a <b>rendezvous</b>. A pipe has a read end, fd[0], and a write end, fd[1].</p>",
        "lab": {
          "href": "ch3/ipc.html",
          "todo": [
            "Section 1: click <b>Producer: produce 1</b> until the buffer is full. Count the items — it's BUFFER_SIZE − 1.",
            "Turn on auto-produce and auto-consume with different speeds; watch the busy-wait spins.",
            "Step through the counter race condition, then compare blocking and non-blocking message passing."
          ]
        },
        "check": {
          "q": "With BUFFER_SIZE = 10 in the textbook's bounded buffer, how many items can it hold at most?",
          "o": [
            "9",
            "10",
            "11",
            "5"
          ],
          "why": "Full when (in+1) % SIZE == out, so one slot stays empty: SIZE − 1."
        }
      }
    ],
    "question": "What does the OS need to remember about a running program?"
  },
  "4": {
    "goal": "Explain thread sharing, limits on parallel speedup and lost updates.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "One process can do several jobs",
        "key": "Chapter 3 managed <b>processes</b>; Chapter 4 studies <b>threads</b> sharing one process.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>A process owns resources such as code, data and open files. A <b>thread</b> is a path of execution using those resources.</p><p>Instead of creating a whole new process for every activity, a process can have several threads. That can improve responsiveness and make use of several cores.</p><p>But two questions follow: which things do threads share, and how can their work overlap safely? Keep those questions in mind through the examples.</p>",
        "check": {
          "q": "Why can two threads of one process affect the same global variable?",
          "o": [
            "They share the process data",
            "They always have the same stack",
            "Each has an isolated copy of all process resources"
          ],
          "why": "Threads share data and heap, while keeping separate stacks, registers and program counters."
        }
      },
      {
        "t": "Share the resources; keep separate execution state",
        "key": "A <b>thread</b> is a path of execution <b>inside</b> a process. The threads of one process <b>share</b> code, data and files, but each has its <b>own</b> registers and stack.",
        "fig": {
          "type": "boxes",
          "t": "Single-threaded vs multithreaded process",
          "head": [
            "",
            "Thread 1",
            "Thread 2",
            "Thread 3"
          ],
          "rows": [
            {
              "label": "shared",
              "cells": [
                [
                  "code · data · files (shared by all threads)",
                  "c0"
                ],
                [
                  "",
                  "c0"
                ],
                [
                  "",
                  "c0"
                ]
              ]
            },
            {
              "label": "own",
              "cells": [
                [
                  "registers + stack",
                  "c2"
                ],
                [
                  "registers + stack",
                  "c2"
                ],
                [
                  "registers + stack",
                  "c2"
                ]
              ]
            }
          ],
          "cap": "Threads are cheaper than processes: creating one and switching between them is much faster."
        },
        "html": "<p>Threads in one process share its code, global data, heap and open files. Each thread has its own program counter, registers and stack.</p><p>Why a separate stack? Each thread can be inside a different function call. Why shared globals? They belong to the process’s common data.</p><p>Sharing makes communication convenient and creating threads cheaper than creating separate processes. It also means a change to a shared variable can affect another thread.</p><div class=\"callout warn\">Processes have separate memory; threads share memory within a process.</div>",
        "check": {
          "q": "Which is private to each thread?",
          "o": [
            "Its stack",
            "The heap",
            "Global variables",
            "Open files"
          ],
          "why": "Each thread has its own PC, registers and stack; code, data, heap and files are shared."
        }
      },
      {
        "t": "Taking turns differs from running at the same instant",
        "key": "<b>Concurrency</b> allows progress on several tasks; <b>parallelism</b> executes work simultaneously.",
        "fig": {
          "type": "boxes",
          "t": "Four tasks over time",
          "rows": [
            {
              "label": "1 core: concurrent",
              "cells": [
                [
                  "T1",
                  "c0"
                ],
                [
                  "T2",
                  "c1"
                ],
                [
                  "T3",
                  "c2"
                ],
                [
                  "T4",
                  "c3"
                ],
                [
                  "T1",
                  "c0"
                ],
                [
                  "T2",
                  "c1"
                ],
                [
                  "T3",
                  "c2"
                ],
                [
                  "T4",
                  "c3"
                ]
              ]
            },
            {
              "label": "core 1: parallel",
              "cells": [
                [
                  "T1",
                  "c0"
                ],
                [
                  "T3",
                  "c2"
                ],
                [
                  "T1",
                  "c0"
                ],
                [
                  "T3",
                  "c2"
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ]
              ]
            },
            {
              "label": "core 2",
              "cells": [
                [
                  "T2",
                  "c1"
                ],
                [
                  "T4",
                  "c3"
                ],
                [
                  "T2",
                  "c1"
                ],
                [
                  "T4",
                  "c3"
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ],
                [
                  "",
                  ""
                ]
              ]
            }
          ]
        },
        "html": "<p>On one core, threads can take turns. Both make progress over time: <b>concurrency</b>. On several cores, threads can execute at the same instant: <b>parallelism</b>.</p><p>There are also two ways to split the work. <b>Data parallelism</b> applies the same operation to separate data subsets. <b>Task parallelism</b> assigns different operations to different threads.</p><p>Ask two separate questions: are the tasks progressing together or executing simultaneously? Are we dividing the data or dividing the jobs?</p><div class=\"callout warn\">Taking turns on one core is concurrency; it does not demonstrate parallel execution.</div><div class=\"callout warn\">Single core = concurrency (time slicing), not parallelism.</div>",
        "check": {
          "q": "Four cores each sum a different quarter of an array. Which kind of parallelism is this?",
          "o": [
            "Data parallelism",
            "Task parallelism",
            "Only concurrency on one core"
          ],
          "why": "The same sum operation is applied to different subsets."
        }
      },
      {
        "t": "The serial part puts a ceiling on speedup",
        "key": "<b>Amdahl’s Law</b>: speedup = 1 / (S + (1 − S)/N) in the ideal model.",
        "fig": {
          "type": "anim",
          "name": "amdahl",
          "t": "Amdahl: speedup = 1 / (S + (1 − S)/N)",
          "cap": "Move the slider to change the serial part S and watch the limit 1/S move."
        },
        "html": "<p>Suppose 25% of a job must run serially. Only the other 75% can be divided among cores.</p><ol><li>Let S = 0.25 be the serial fraction and N = 2 the cores.</li><li>New runtime relative to one core: S + (1 − S)/N = 0.25 + 0.75/2 = 0.625.</li><li><b>Speedup</b> = 1/0.625 = 1.6.</li></ol><p>This is <b>Amdahl’s Law</b>. Even infinitely many cores leave the serial 0.25, so the maximum speedup is 1/S = 4. Extra cores cannot divide the serial work.</p><div class=\"callout warn\">Use the serial fraction for S, not the parallel fraction. Extra cores cannot remove serial work.</div><div class=\"callout warn\">Amdahl: the serial part limits speedup; too many threads add switching overhead.</div>",
        "check": {
          "q": "S = 10%. What is the speedup limit?",
          "o": [
            "10",
            "100",
            "Unlimited"
          ],
          "why": "The limit is 1/S = 1/0.1 = 10."
        },
        "lab": {
          "href": "ch4/amdahl.html",
          "todo": [
            "Choose the slide example S = 25%, N = 2; calculate 1 / (0.25 + 0.75/2) = 1.6.",
            "Choose 1024 cores and compare the result with the limit 1/S = 4."
          ]
        }
      },
      {
        "t": "The kernel schedules the threads it can see",
        "key": "<b>User threads</b> are managed by a library; <b>kernel threads</b> by the OS. A model says how many user threads map onto how many kernel threads.",
        "fig": {
          "type": "compare",
          "cols": [
            {
              "icon": "",
              "t": "Many-to-one",
              "pts": [
                "many user threads → 1 kernel thread",
                "one blocking call blocks all",
                "no parallelism on multicore"
              ],
              "c": "c4"
            },
            {
              "icon": "",
              "t": "One-to-one",
              "pts": [
                "each user thread → its own kernel thread",
                "real parallelism",
                "too many kernel threads is costly",
                "Windows, Linux"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Many-to-many",
              "pts": [
                "many user threads → a smaller or equal number of kernel threads",
                "flexible",
                "hard to implement"
              ],
              "c": "c0"
            }
          ]
        },
        "html": "<p>A user-level library manages <b>user threads</b>. The OS schedules <b>kernel threads</b>. The mapping between them determines the possibilities:</p><ul><li><b>Many-to-one</b>: many user threads share one kernel thread. They cannot run on several cores simultaneously; a blocking call can block them all.</li><li><b>One-to-one</b>: each user thread maps to a kernel thread. Parallelism is possible, with more kernel overhead.</li><li><b>Many-to-many</b>: many user threads map onto a set of kernel threads.</li></ul><p>Count the kernel threads in the picture before deciding how much parallelism is possible.</p><p>Linux and Windows use the one-to-one model in the course comparison.</p>",
        "lab": {
          "href": "ch4/models.html",
          "todo": [
            "Select <b>Many-to-one</b> and block a thread on I/O: everyone stops.",
            "Switch to <b>One-to-one</b> and do the same with 2 or 4 cores.",
            "Read \"How Linux does it\" at the bottom."
          ]
        },
        "check": {
          "q": "Which model do Linux and Windows use?",
          "o": [
            "One-to-one",
            "Many-to-one",
            "Many-to-many",
            "No threads"
          ],
          "why": "Both use one-to-one."
        }
      },
      {
        "t": "Create a worker, then wait for its result",
        "key": "Pthreads is a <b>specification</b> (an API). You create a thread with <code>pthread_create</code>, and wait for it with <code>pthread_join</code>.",
        "fig": {
          "type": "flow",
          "items": [
            [
              "",
              "pthread_attr_init",
              "default attributes",
              "c5"
            ],
            [
              "",
              "pthread_create",
              "start runner()",
              "c0"
            ],
            [
              "",
              "runner() works",
              "e.g. sums 1..N",
              "c1"
            ],
            [
              "",
              "pthread_exit",
              "thread ends",
              "c2"
            ],
            [
              "",
              "pthread_join",
              "main waits, then prints",
              "c3"
            ]
          ]
        },
        "html": "<p>In the Pthreads example, a worker computes a sum into a shared global variable.</p><ol><li><code>pthread_create()</code> starts the worker running its function.</li><li>The worker calculates the sum and calls <code>pthread_exit()</code>.</li><li>The parent uses <code>pthread_join()</code> to wait before using the result.</li></ol><p>Creating a thread does not mean it has already finished. The join establishes when the parent can safely expect the completed result.</p><pre>pthread_t tid;\npthread_create(&amp;tid, NULL, runner, arg);\npthread_join(tid, NULL);\nprintf(\"%d\", sum);</pre>",
        "check": {
          "q": "Why call pthread_join before printing the worker’s sum?",
          "o": [
            "To wait for the worker to finish",
            "To create a second worker",
            "To clear the shared variable"
          ],
          "why": "Joining ensures the worker has finished computing the sum before it is read."
        }
      },
      {
        "t": "Two increments can produce only one increase",
        "key": "When two threads update the same variable <b>at the same time</b>, the result depends on timing. That is a <b>race condition</b>, and updates can get lost.",
        "fig": {
          "type": "anim",
          "name": "race",
          "t": "counter++ is really 3 steps: load, add, store",
          "cap": "The first run is the lesson's order. Press <b>Try another interleaving</b> to let the scheduler pick a different order."
        },
        "html": "<p>Start with counter = 0. Each thread executes <code>counter++</code>, but that is a load, an addition and a store.</p><ol><li>A loads 0.</li><li>B loads 0 before A stores.</li><li>A adds 1 and stores 1.</li><li>B adds 1 to its old copy and stores 1.</li></ol><p>The final value is 1, although two increments should produce 2. This is a <b>race condition</b>: the result depends on the interleaving.</p><p>Threads explain who shares the data. Chapter 5 explains how execution gets interrupted; Chapter 6 protects the update.</p><div class=\"callout warn\">It is 3 instructions (load, add, store). Two threads can lose updates.</div>",
        "lab": {
          "href": "ch4/race.html",
          "todo": [
            "Section 1: you are the scheduler. Pick an order of load/add/store for threads A and B that makes the result 1 instead of 2.",
            "Section 2: run a million counter++ per thread on 1 core and on 2 cores, and see how many updates get lost."
          ]
        },
        "check": {
          "q": "Why can two threads doing counter++ lose an update?",
          "o": [
            "counter++ is load, add, store — and the threads can interleave between them",
            "Threads have separate copies of global variables",
            "The compiler removes the second increment",
            "The CPU cannot add numbers in parallel"
          ],
          "why": "It is not atomic: both may load the old value before either stores."
        }
      }
    ],
    "question": "What changes when one process has several threads?"
  },
  "5": {
    "goal": "Build a Gantt chart and calculate waiting and turnaround times.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "The ready queue needs a rule",
        "key": "Chapters 3 and 4 filled the <b>ready queue</b>; Chapter 5 decides <b>which</b> process or thread runs next and <b>for how long</b>.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>A ready process can run, but a single core can execute only one at a time. The <b>scheduler</b> chooses which ready process gets the CPU.</p><p>Different rules make different trade-offs. Arrival order is simple. Short jobs can reduce waiting. Taking turns helps interactive work respond.</p><p>For every example, use the same method: identify the rule, draw the CPU timeline, read completion times, then calculate the requested measure. We will build that method one piece at a time.</p>",
        "check": {
          "q": "Two processes are ready on one core. What does the scheduler choose?",
          "o": [
            "Which one gets the CPU next",
            "Which one has finished its I/O in the future",
            "Which program source file to compile"
          ],
          "why": "Ready processes can run, but one core executes only one at an instant."
        }
      },
      {
        "t": "When can the scheduler change its choice?",
        "key": "A process alternates <b>CPU bursts</b> and <b>I/O bursts</b>. Decisions happen when it <b>blocks</b> (1), is <b>preempted</b> (2), becomes <b>ready</b> after I/O (3) or <b>terminates</b> (4). <b>Nonpreemptive</b> scheduling uses only 1 and 4.",
        "fig": {
          "type": "boxes",
          "t": "When the scheduler runs (slides 9–10)",
          "head": [
            "Case",
            "Transition",
            "Nonpreemptive",
            "Preemptive"
          ],
          "rows": [
            {
              "cells": [
                [
                  "1"
                ],
                [
                  "Running → Waiting (I/O request)"
                ],
                [
                  "decides",
                  "ok"
                ],
                [
                  "decides",
                  "ok"
                ]
              ]
            },
            {
              "cells": [
                [
                  "2"
                ],
                [
                  "Running → Ready (timer, higher priority)"
                ],
                [
                  "no",
                  "mute"
                ],
                [
                  "decides",
                  "ok"
                ]
              ]
            },
            {
              "cells": [
                [
                  "3"
                ],
                [
                  "Waiting → Ready (I/O done)"
                ],
                [
                  "no",
                  "mute"
                ],
                [
                  "decides",
                  "ok"
                ]
              ]
            },
            {
              "cells": [
                [
                  "4"
                ],
                [
                  "Terminates"
                ],
                [
                  "decides",
                  "ok"
                ],
                [
                  "decides",
                  "ok"
                ]
              ]
            }
          ]
        },
        "html": "<p>A process alternates CPU work (<b>CPU bursts</b>) with I/O waits. Scheduling can happen when it:</p><ol><li>Goes from running to waiting.</li><li>Goes from running to ready.</li><li>Goes from waiting to ready.</li><li>Terminates.</li></ol><p>In 1 and 4, it has given up the CPU. In 2 and 3, the OS can take the CPU away: <b>preemption</b>.</p><p>Choosing and handing over are separate jobs. The scheduler chooses; the <b>dispatcher</b> switches context, returns to user mode and resumes the selected process. That handover takes time: <b>dispatch latency</b>.</p><div class=\"callout warn\">Preemption can stop a process in the middle of updating shared data. Chapter 6 deals with that.</div>",
        "check": {
          "q": "A nonpreemptive scheduler is running P1 when P2 finishes its I/O and becomes ready. What happens?",
          "o": [
            "P1 keeps the CPU until it blocks or terminates",
            "P2 takes the CPU at once",
            "P1 and P2 share the core in the same instant"
          ],
          "why": "Nonpreemptive scheduling decides only in cases 1 (block) and 4 (terminate)."
        }
      },
      {
        "t": "Read the timeline before using the formulas",
        "key": "Maximize <b>CPU utilization</b> and <b>throughput</b>; minimize <b>turnaround</b>, <b>waiting</b> and <b>response</b> time. <b>Waiting = turnaround − burst</b>.",
        "fig": {
          "type": "compare",
          "t": "Scheduling criteria (slide 13)",
          "cols": [
            {
              "t": "Maximize",
              "pts": [
                "CPU utilization: keep the CPU busy",
                "Throughput: processes completed per time unit"
              ],
              "c": "c1"
            },
            {
              "t": "Minimize",
              "pts": [
                "Turnaround: submission to completion",
                "Waiting: time spent in the ready queue",
                "Response: submission to first response"
              ],
              "c": "c4"
            }
          ]
        },
        "html": "<p>A process arrives at time 2, needs 9 ms of CPU work and finishes at 26. For these single-burst exercises:</p><ol><li><b>Turnaround</b> is all elapsed time: completion − arrival = 26 − 2 = 24.</li><li><b>Waiting</b> removes the CPU work: turnaround − burst = 24 − 9 = 15.</li><li>For an average, calculate each process separately, add, then divide by the process count.</li></ol><p><b>Response time</b> measures the delay until the first response. The other criteria are CPU utilization (keep it busy) and throughput (jobs completed per unit time). A good schedule depends on which measure matters.</p>",
        "check": {
          "q": "A process arrives at 0, needs 3 ms and completes at 27. What is its waiting time?",
          "o": [
            "24",
            "27",
            "30"
          ],
          "why": "Turnaround = 27 − 0 = 27; waiting = 27 − 3 = 24."
        }
      },
      {
        "t": "FCFS: take the jobs in arrival order",
        "key": "<b>FCFS</b> is simple and nonpreemptive, but short jobs stuck behind a long one wait a long time: the <b>convoy effect</b>.",
        "fig": {
          "type": "anim",
          "name": "fcfs",
          "t": "FCFS: the same three jobs in two orders"
        },
        "html": "<p><b>First-come, first-served</b> lets a process run until it finishes or blocks. A shorter job cannot jump ahead.</p><p>In the lecture example, all arrive at 0 in order P1, P2, P3, with bursts 24, 3, 3.</p><ol><li>Draw P1: 0–24, P2: 24–27, P3: 27–30.</li><li>Each wait is its start time minus arrival: 0, 24, 27.</li><li>Average wait = (0 + 24 + 27)/3 = <b>17</b>.</li></ol><p>The short jobs wait behind the long one: the <b>convoy effect</b>. Putting P2 and P3 first would reduce average waiting to 3. Arrival order matters.</p>",
        "lab": {
          "href": "ch5/gantt.html",
          "todo": [
            "Pick \"Slide 16: FCFS 24, 3, 3\", type 17 as your answer and draw the chart.",
            "Pick \"Slide 17: arrival order P2, P3, P1\" and predict the average before drawing: 3.",
            "Back on slide 16, change P1's burst to 12 and predict: (0 + 12 + 15) / 3 = 9."
          ]
        },
        "check": {
          "q": "FCFS, all arrive at 0 in the order P1 = 10, P2 = 1, P3 = 1. What is the average waiting time?",
          "o": [
            "7",
            "1",
            "4"
          ],
          "why": "(0 + 10 + 11) / 3 = 7. SJF on the same jobs gives 1 (slide 21, Q1)."
        }
      },
      {
        "t": "SJF chooses a short burst; SRTF can interrupt",
        "key": "<b>SJF</b> gives the <b>minimum average waiting time</b>, but it needs the length of the next CPU burst, which the OS cannot know. <b>SRTF</b> is its preemptive version.",
        "fig": {
          "type": "anim",
          "name": "sjf",
          "t": "SJF and SRTF on the slide examples"
        },
        "html": "<p><b>SJF</b> picks the shortest next CPU burst among ready processes. With all arrivals at 0 and bursts P1 = 6, P2 = 8, P3 = 7, P4 = 3:</p><ol><li>Order: P4, P1, P3, P2.</li><li>Timeline: 0–3, 3–9, 9–16, 16–24.</li><li>Waits in that order: 0, 3, 9, 16. Average = 28/4 = <b>7</b>.</li></ol><p><b>SRTF</b> adds preemption. At an arrival, compare the new burst with the running process’s <em>remaining</em> time, not its original burst. Switch if the new job is shorter. Real systems must estimate future bursts; long jobs may starve.</p><div class=\"callout warn\">\"SJF is the best algorithm in practice.\" No: it is optimal for average waiting time only on paper, because burst lengths are unknown.</div>",
        "lab": {
          "href": "ch5/gantt.html",
          "todo": [
            "Pick \"Slide 19: SRTF with arrivals\" and draw it: 6.5.",
            "Switch the algorithm to SJF (nonpreemptive) on the same table: P1 now runs to 8 and the average rises to 7.75."
          ]
        },
        "check": {
          "q": "Why can an OS not run SJF exactly?",
          "o": [
            "It cannot know the length of the next CPU burst",
            "It has no ready queue to sort",
            "SJF needs more than one CPU core"
          ],
          "why": "SJF needs future burst lengths; real systems can only estimate them."
        }
      },
      {
        "t": "Round Robin: run a slice, then rejoin the queue",
        "key": "<b>RR</b> runs each process for at most one <b>quantum q</b>, then sends it to the back of the ready queue; q must be much larger than a <b>context switch</b>.",
        "fig": {
          "type": "anim",
          "name": "rr",
          "t": "Round Robin with q = 4"
        },
        "html": "<p><b>Round Robin</b> gives each process at most one time quantum q per turn. An unfinished process rejoins the back of the ready queue.</p><p>With P1 = 24, P2 = 3, P3 = 3, all arriving at 0 and q = 4:</p><ol><li>P1 runs 0–4, leaving 20.</li><li>P2 finishes at 7; P3 finishes at 10.</li><li>P1 is now alone and finishes at 30.</li><li>Waits: P1 = 30 − 24 = 6; P2 = 7 − 3 = 4; P3 = 10 − 3 = 7.</li></ol><p>Average = 17/3 = <b>5.67</b>; the slide prints 5.3. A huge quantum behaves like FCFS; a tiny one adds context-switch overhead.</p><div class=\"callout warn\">Slide 55's live demo (A 0/8, B 2/4, C 4/2, D 6/6, q = 4) runs D before A at time 10. With the rule used on the other slides and here, A went back to the queue at 4, before D arrived at 6, so A runs 10–14 and D 14–20. On paper, state the rule you apply.</div>",
        "lab": {
          "href": "ch5/gantt.html",
          "todo": [
            "Pick \"Slide 20: RR 24, 3, 3\" (q = 4) and draw it: 5.67.",
            "Set q = 6 and redraw: 7.",
            "Set q = 30: the chart matches FCFS and the average is 17."
          ]
        },
        "check": {
          "q": "RR uses q = 10 ms, but each context switch costs 5 ms. What is the problem?",
          "o": [
            "A third of the CPU time goes to switching",
            "Processes can no longer be preempted",
            "RR turns into SJF"
          ],
          "why": "Switching takes 5 of every 15 ms; q must be much larger than the switch time (slide 21, Q2)."
        }
      },
      {
        "t": "Priority needs a way to prevent endless waiting",
        "key": "<b>Priority</b> scheduling runs the highest priority (the <b>smallest number</b>) first and can <b>starve</b> low priorities; <b>aging</b> cures that. A <b>multilevel feedback queue</b> moves processes between queues.",
        "fig": {
          "type": "stack",
          "t": "Multilevel feedback queue (slide 25)",
          "top": "highest priority",
          "bottom": "lowest priority",
          "items": [
            [
              "Q0 · RR, q = 8 ms",
              "not finished → move down to Q1",
              "c1"
            ],
            [
              "Q1 · RR, q = 16 ms",
              "not finished → move down to Q2",
              "c2"
            ],
            [
              "Q2 · FCFS",
              "long jobs settle here",
              "c4"
            ]
          ]
        },
        "html": "<p><b>Priority scheduling</b> picks the highest-priority ready process. In the lecture’s example, a smaller priority number means higher priority: the order is P2, P5, P1, P3, P4.</p><p>A low-priority process may keep losing to new arrivals: <b>starvation</b>. <b>Aging</b> gradually raises its priority as it waits. Equal-priority processes can take turns with Round Robin.</p><p>Multiple queues add another choice. In a <b>multilevel queue</b>, a process stays in its assigned queue. In a <b>multilevel feedback queue</b>, it can move between queues based on its behaviour or waiting. “Can it move?” distinguishes the two.</p>",
        "lab": {
          "href": "ch5/gantt.html",
          "todo": [
            "Pick \"Slide 23: Priority\" and draw it: 8.2.",
            "Pick \"Slide 24: Priority + RR\" (q = 2): P4 runs first, then P2 and P3 take turns, then P1 and P5."
          ]
        },
        "check": {
          "q": "Which change stops starvation in priority scheduling?",
          "o": [
            "Aging: raise a waiting process's priority over time",
            "A smaller time quantum on its own",
            "Give long jobs the top priority forever"
          ],
          "why": "Priority scheduling causes starvation; aging is the cure (slide 48)."
        }
      },
      {
        "t": "Deadlines and multiple cores add constraints",
        "key": "Threads are scheduled in <b>PCS</b> or <b>SCS</b>. Real time means <b>predictable</b>: <b>hard</b> deadlines must be met, <b>soft</b> ones should be. <b>Rate-monotonic</b> priorities are static, <b>EDF</b> priorities are dynamic.",
        "fig": {
          "type": "compare",
          "t": "Thread scope and real-time scheduling (slides 28–37)",
          "cols": [
            {
              "t": "Thread scheduling",
              "pts": [
                "PCS: the thread library picks among one process's threads",
                "SCS: the kernel picks among all threads",
                "Linux and macOS allow only PTHREAD_SCOPE_SYSTEM"
              ],
              "c": "c3"
            },
            {
              "t": "Real-time scheduling",
              "pts": [
                "Hard: a missed deadline is a failure (airbag)",
                "Soft: an occasional miss is tolerable (video)",
                "Rate-monotonic: shorter period = higher fixed priority",
                "EDF: earliest deadline runs first"
              ],
              "c": "c4"
            }
          ]
        },
        "html": "<p>The basic question stays “who runs next?”, but the setting adds rules:</p><ul><li><b>Process-contention scope</b>: a library chooses among a process’s user threads. <b>System-contention scope</b>: the kernel chooses among kernel threads.</li><li><b>Rate-monotonic</b> uses fixed priorities based on periods. <b>EDF</b> gives the earliest deadline priority. The lecture gives an approximately 69% sufficient utilization bound for rate-monotonic scheduling and up to 100% for EDF in the ideal task model; these are model assumptions, not universal workload guarantees.</li><li>On several cores, <b>load balancing</b> spreads work; <b>processor affinity</b> tries to keep a thread on a familiar core.</li></ul><p>Return to the map: scheduling decides who executes. Preemption may interrupt an update halfway through. Chapter 6 makes shared-data access safe.</p><p><b>Hard real-time</b> requires deadlines to be met; <b>soft real-time</b> treats them as a goal. Predictability matters, rather than average speed alone.</p>",
        "check": {
          "q": "What distinguishes a hard real-time requirement?",
          "o": [
            "Its deadline must be met",
            "It must have the fastest average execution time",
            "Every process must receive the same time quantum"
          ],
          "why": "Hard real-time concerns meeting required deadlines, not just running fast on average."
        }
      }
    ],
    "question": "Several processes are ready. Who should run next?"
  },
  "6": {
    "goal": "Trace a race and choose a synchronization tool for exclusion or ordering.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Scheduling alone cannot protect a shared value",
        "key": "Chapter 5 lets the OS preempt at any time; Chapter 6 gives the <b>tools</b> that keep <b>shared data</b> consistent anyway.",
        "fig": {
          "type": "flow",
          "t": "Course map: from hardware to safe sharing",
          "items": [
            [
              "",
              "1. Foundations",
              "Hardware, interrupts, protection",
              "c0"
            ],
            [
              "",
              "2. OS structures",
              "Services and kernel entry",
              "c1"
            ],
            [
              "",
              "3. Processes",
              "State, creation and communication",
              "c2"
            ],
            [
              "",
              "4. Threads",
              "Execution within a process",
              "c3"
            ],
            [
              "",
              "5. CPU scheduling",
              "Who runs next, and for how long",
              "c4"
            ],
            [
              "",
              "6. Synchron&shy;ization",
              "Safe access to shared data",
              "c5"
            ]
          ]
        },
        "html": "<p>Chapter 4 showed a lost update. Chapter 5 showed that a thread can lose the CPU between instructions. Together they explain the problem: a thread may resume using an old copy of shared data.</p><p>We need a rule that makes the whole sensitive operation safe. Start by seeing the race, then define what a correct solution must guarantee. After that, compare software, hardware and higher-level tools.</p><p>Keep asking: does this tool prevent simultaneous access, enforce an order, or both?</p>",
        "check": {
          "q": "Why can correct arithmetic still produce a wrong shared counter?",
          "o": [
            "Overlapping updates can overwrite each other",
            "A single CPU makes every multi-instruction update atomic",
            "A scheduler always runs every update to completion"
          ],
          "why": "An update can be interrupted between its load and store."
        }
      },
      {
        "t": "Follow both copies of count",
        "key": "When the result depends on the order in which processes access shared data, the code has a <b>race condition</b>.",
        "fig": {
          "type": "anim",
          "name": "pcrace",
          "t": "Producer and consumer share count = 5"
        },
        "html": "<p>The producer increments count; the consumer decrements it. Starting at 5, one addition and one subtraction should leave <b>5</b>.</p><ol><li>Both load 5 into separate registers.</li><li>The producer computes 6; the consumer computes 4.</li><li>If the consumer stores last, count becomes 4.</li><li>If the producer stores last, count becomes 6.</li></ol><p>One update overwrites the other. The arithmetic is fine; the overlapping read–modify–write sequences are the problem. Step through the animation and keep track of the shared value separately from each register.</p>",
        "lab": {
          "href": "ch6/critical.html",
          "todo": [
            "Keep \"No protection\" and press \"Play the deck's order\": count ends at 4.",
            "Reset and find an order that ends at 6 (the producer stores last).",
            "Find an order that ends at 5 with no lock. Is the code safe now? (No: it was correct by luck.)"
          ]
        },
        "check": {
          "q": "count = 5. A producer runs count++ and a consumer runs count-- with no protection. Which final values are possible?",
          "o": [
            "4, 5 or 6",
            "Only 5",
            "Only 4 or 6"
          ],
          "why": "If the two updates do not overlap the result is 5; if they overlap, whichever store comes last wins, giving 4 or 6."
        }
      },
      {
        "t": "A correct entry rule needs three promises",
        "key": "A solution to the <b>critical-section problem</b> must provide <b>mutual exclusion</b>, <b>progress</b> and <b>bounded waiting</b>.",
        "fig": {
          "type": "flow",
          "t": "General structure of a process (slide 9)",
          "items": [
            [
              "",
              "entry section",
              "ask for permission",
              "c0"
            ],
            [
              "",
              "critical section",
              "touch shared data",
              "c4"
            ],
            [
              "",
              "exit section",
              "give permission back",
              "c1"
            ],
            [
              "",
              "remainder section",
              "no shared data",
              "mute"
            ]
          ]
        },
        "html": "<p>The <b>critical section</b> is the code accessing shared data. Its entry section asks permission; its exit section releases access. The rest is the remainder section.</p><p>A solution must guarantee:</p><ul><li><b>Mutual exclusion</b>: only one participant is inside at a time.</li><li><b>Progress</b>: if it is empty and someone wants in, choosing who enters cannot be delayed forever.</li><li><b>Bounded waiting</b>: after a request, only a limited number of other entries can happen first.</li></ul><p>Exclusion protects the data. Progress and bounded waiting address whether waiting processes get a chance. Do not assume one process runs faster than another.</p>",
        "check": {
          "q": "Process A asked to enter long ago, but B and C keep entering ahead of it, without limit. Which requirement fails?",
          "o": [
            "Bounded waiting",
            "Mutual exclusion",
            "Progress"
          ],
          "why": "Others may enter only a bounded number of times after A's request; overtaking without limit is starvation."
        }
      },
      {
        "t": "Peterson: announce interest, then give the other priority",
        "key": "Peterson uses <b>flag[i]</b> (I want to enter) and <b>turn</b> (whose turn it is). It meets all three requirements on paper, but modern CPUs may break it without <b>memory barriers</b>.",
        "fig": {
          "type": "boxes",
          "t": "Process Pi in Peterson's solution (j = 1 − i)",
          "rows": [
            {
              "cells": [
                [
                  "flag[i] = true",
                  "c0"
                ],
                [
                  "I want to enter"
                ]
              ]
            },
            {
              "cells": [
                [
                  "turn = j",
                  "c0"
                ],
                [
                  "but you go first"
                ]
              ]
            },
            {
              "cells": [
                [
                  "while (flag[j] && turn == j) ;",
                  "c2"
                ],
                [
                  "wait while the other wants in and it is its turn"
                ]
              ]
            },
            {
              "cells": [
                [
                  "critical section",
                  "c4"
                ],
                [
                  "only one process here"
                ]
              ]
            },
            {
              "cells": [
                [
                  "flag[i] = false",
                  "c1"
                ],
                [
                  "I am done"
                ]
              ]
            }
          ]
        },
        "html": "<p>For two processes, <code>flag[i] = true</code> means “I want in.” Setting <code>turn = j</code> means “if we both want in, you go first.”</p><p>Pi waits only while <code>flag[j] &amp;&amp; turn == j</code>. If Pj has no interest, Pi enters. If both are interested, the single turn value breaks the tie. On leaving, Pi clears its flag.</p><p>Under the assumed memory ordering, this satisfies mutual exclusion, progress and bounded waiting. Modern processors and compilers may reorder memory operations. <b>Memory barriers</b> enforce the ordering/visibility needed by such reasoning; plain source-code order alone is insufficient.</p>",
        "lab": {
          "href": "ch6/critical.html",
          "todo": [
            "Choose \"Peterson's solution\". Run Producer, Producer, Consumer, Consumer: both flags are true. Who waits? (The consumer: it wrote turn last.)",
            "Click the consumer again: it stays in its while loop until the producer has run flag[0] = false."
          ]
        },
        "check": {
          "q": "Both processes set their flag. P0 then writes turn = 1, and P1 writes turn = 0 after it. Who enters first?",
          "o": [
            "P0",
            "P1",
            "Neither: they deadlock"
          ],
          "why": "turn = 0 was written last, so P1 waits while flag[0] is true; P0 waits only if turn == 1, which is false."
        }
      },
      {
        "t": "Make checking and claiming the lock one operation",
        "key": "<b>test_and_set</b> and <b>compare_and_swap</b> read and change a word in one <b>atomic</b> step; locks are built on them.",
        "fig": {
          "type": "compare",
          "t": "Two atomic instructions (slides 17–18)",
          "cols": [
            {
              "t": "test_and_set(&lock)",
              "pts": [
                "returns the old value",
                "sets lock to true",
                "spin until it returns false"
              ],
              "c": "c0"
            },
            {
              "t": "compare_and_swap(&lock, 0, 1)",
              "pts": [
                "returns the old value",
                "sets lock to 1 only if it was 0",
                "spin until it returns 0"
              ],
              "c": "c3"
            }
          ]
        },
        "html": "<p>Checking “is the lock free?” and claiming it separately would create another race. Hardware provides <b>atomic</b> operations: other threads cannot observe a half-completed operation.</p><p><code>test_and_set(&amp;lock)</code> returns the old value and sets true. Old false means this thread acquired it. Old true means keep waiting. Release by setting false.</p><p><code>compare_and_swap()</code> changes a value only when it equals an expected value, and returns the old value. Atomic counter operations use this kind of support.</p><p>A simple spin loop keeps using CPU while it waits. It can provide exclusion without guaranteeing bounded waiting.</p>",
        "check": {
          "q": "What does test_and_set(&lock) return?",
          "o": [
            "The old value of lock, having set it to true",
            "Always true",
            "The new value of lock"
          ],
          "why": "It returns the original value and sets the target to true, as one atomic step."
        }
      },
      {
        "t": "Put the whole update inside the mutex",
        "key": "A <b>mutex lock</b> is the simplest tool: <b>acquire()</b> before the critical section, <b>release()</b> after. If waiting means looping, it is a <b>spinlock</b> (<b>busy waiting</b>).",
        "fig": {
          "type": "compare",
          "t": "Spinlock or sleeping mutex? (slide 23)",
          "vs": true,
          "cols": [
            {
              "t": "Spinlock",
              "pts": [
                "loops while it waits",
                "wastes CPU cycles",
                "no context switch: suits very short sections"
              ],
              "c": "c2"
            },
            {
              "t": "Sleeping mutex",
              "pts": [
                "the waiting thread is blocked",
                "no CPU wasted",
                "switch cost on wake-up: suits long sections"
              ],
              "c": "c1"
            }
          ]
        },
        "html": "<p>A <b>mutex</b> packages lock acquisition and release. Protect the entire read–modify–write operation:</p><pre>pthread_mutex_lock(&amp;mutex);\ncounter++;\npthread_mutex_unlock(&amp;mutex);</pre><p>Another thread must acquire the same mutex before touching that protected data. Locking only the final store would leave the earlier read exposed.</p><p>A mutex has an owner: the thread that locks it must unlock it. Forgetting an unlock can strand waiters. Taking two locks in opposite orders can cause deadlock. The tool works only when every access follows the protocol.</p><p>For a very short wait on a multicore machine, a spinlock may avoid the cost of sleeping and waking. For a long wait, spinning wastes CPU time.</p>",
        "lab": {
          "href": "ch6/critical.html",
          "todo": [
            "Choose \"Mutex lock\". Run the producer twice (acquire, load), then try the consumer: it waits at acquire.",
            "Press \"Play the deck's order\", then finish both processes: count ends at 5 every time."
          ]
        },
        "check": {
          "q": "Why might a spinlock suit a very short critical section on a multicore machine?",
          "o": [
            "The brief spin may cost less than sleeping and waking",
            "Spinning guarantees bounded waiting",
            "Short code cannot have a race"
          ],
          "why": "Compare the expected wait with the sleep/context-switch overhead. Long waits waste CPU when spinning."
        }
      },
      {
        "t": "A semaphore can count resources or enforce an order",
        "key": "A <b>semaphore</b> uses atomic <b>wait</b> and <b>signal</b> for resource counting, exclusion or ordering; it has no mutex-style owner.",
        "fig": {
          "type": "anim",
          "name": "semaphore",
          "t": "wait() and signal() with a waiting queue (slide 29)"
        },
        "html": "<p>A <b>semaphore</b> is a counter with atomic wait and signal operations.</p><p>For exclusion, initialize to 1: wait before entering, signal after leaving. For ordering, initialize <code>synch = 0</code>: P2 waits before S2; P1 executes S1 then signals. S2 cannot happen before S1.</p><p>In the blocking implementation, wait decrements first and blocks if the result is negative. Signal increments and wakes a waiter if needed. A negative value records waiting processes; a positive value records available resources.</p><p>Unlike a mutex, a semaphore has no owner: a different thread may signal. Pthreads names are <code>sem_wait</code> and <code>sem_post</code>.</p><div class=\"callout warn\"><b>Two versions on the slides.</b> Slide 27 defines <code>wait(S)</code> with busy waiting: <code>while (S &lt;= 0) ; S--;</code>, so S never goes below 0. Slide 29 decrements first and blocks if S &lt; 0, so a negative S counts the waiters. Slide 27 also calls a binary semaphore \"the same as a mutex lock\"; slides 31 and 45 add the one difference: ownership.</div>",
        "lab": {
          "href": "ch6/semaphore.html",
          "todo": [
            "Part 1, S = 2: let P1, P2 and P3 call wait(). S = −1 and P3 waits.",
            "P1 calls signal(): S = 0 and P3 goes ahead.",
            "Part 2: press \"Play P0, P1, P0, P1\" to reach a deadlock, then tick the fix and try again."
          ]
        },
        "check": {
          "q": "A semaphore with a waiting queue has the value −3. What does that mean?",
          "o": [
            "Three processes are blocked on it",
            "Three resources are free",
            "The semaphore is corrupted"
          ],
          "why": "A negative value counts the waiting processes; a positive value counts the free resources (slide 29)."
        }
      },
      {
        "t": "Waiting for a condition differs from owning a lock",
        "key": "A <b>monitor</b> lets one process inside at a time; a <b>condition variable</b> lets it wait for a condition. Synchronization can still fail through <b>deadlock</b>, <b>starvation</b> or <b>priority inversion</b>.",
        "fig": {
          "type": "compare",
          "t": "Liveness failures (slides 37–38)",
          "cols": [
            {
              "t": "Deadlock",
              "pts": [
                "P0: wait(S); wait(Q). P1: wait(Q); wait(S).",
                "each waits for a signal only the other can send",
                "fix: always acquire in the same order"
              ],
              "c": "bad"
            },
            {
              "t": "Starvation",
              "pts": [
                "a process stays in a semaphore queue forever",
                "e.g. low priority, always skipped"
              ],
              "c": "warn"
            },
            {
              "t": "Priority inversion",
              "pts": [
                "a low-priority process holds a lock a high-priority one needs",
                "fix: priority inheritance"
              ],
              "c": "c3"
            }
          ]
        },
        "html": "<p>A <b>monitor</b> permits one active caller at a time. A condition variable lets that caller sleep until some condition may hold, releasing the monitor while waiting.</p><p>With Pthreads, hold the mutex and use <code>while (!ready) pthread_cond_wait(&amp;cond, &amp;mutex);</code>. On return the mutex is reacquired; check again because waking does not guarantee the condition.</p><p><b>Deadlock</b> means participants wait on one another indefinitely. <b>Starvation</b> means a participant keeps being passed over. <b>Priority inversion</b> means high-priority work waits for a lower-priority lock holder; priority inheritance temporarily boosts that holder.</p><p>The course now connects hardware control, services, execution, scheduling and safe sharing.</p>",
        "check": {
          "q": "P0 holds S and waits for Q; P1 holds Q and waits for S. What is this, and what fixes it?",
          "o": [
            "Deadlock; take S and Q in the same order in both",
            "Starvation; give P1 a higher priority",
            "Priority inversion; switch to a spinlock"
          ],
          "why": "A circular wait on two semaphores is a deadlock; one global lock order prevents it."
        }
      }
    ],
    "question": "How do we stop overlapping work from corrupting shared data?"
  }
};
