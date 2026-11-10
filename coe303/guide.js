/* Source: COE303 lecture slides, chapters 1–6 and the producer–consumer deck (materials/COE303, not committed).
 * Correct check first; learn.js shuffles options and appends practice. */
window.GUIDE = {
  "1": {
    "goal": "Explain what an OS is and does, how the CPU and devices talk (interrupts, DMA), the storage hierarchy and caching, why dual mode and the timer are needed for protection, and the OS's management jobs.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Follow the course from hardware to safe sharing",
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
        "html": "<p>Start with the machine: CPU, memory and devices. Chapter 1 explains how the OS controls them. Chapter 2 follows a program asking the kernel for a service. Chapter 3 turns a program into a running process and follows its state and communication. Chapter 4 looks inside a process: several threads share its resources. Chapter 5 decides which of them gets the CPU, and for how long. Chapter 6 keeps the data they share consistent.</p><p>Keep one question in mind: who uses the resource, and how does the OS keep control?</p>",
        "check": {
          "q": "Which order connects the six chapters?",
          "o": [
            "Hardware, services, processes, threads, scheduling, synchronization",
            "Threads first, then hardware, with no link between the chapters",
            "Compilation, then linking, then databases and networks"
          ],
          "why": "The course moves from the resources being managed, to the units of execution that use them, to sharing the CPU and the data between them."
        }
      },
      {
        "t": "What an operating system is",
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
        "html": "<p>A computer system contains hardware, an operating system, application programs and users. Hardware provides CPU, memory and I/O. Applications use those resources to do work for users.</p><p>The OS is the intermediary. As a <b>resource allocator</b>, it decides how resources are shared. As a <b>control program</b>, it prevents errors and improper use. The <b>kernel</b> is the core program running throughout operation.</p><div class=\"callout warn\">The desktop is a user-space program; it is not the kernel.</div><div class=\"callout warn\">The desktop is a user-space program; the kernel is the core of the OS.</div>",
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
        "t": "How devices get the CPU's attention: interrupts",
        "key": "Instead of the CPU asking \"are you done yet?\" again and again (<b>polling</b>), the device <b>taps the CPU on the shoulder</b> when it finishes (an <b>interrupt</b>).",
        "fig": {
          "type": "anim",
          "name": "interrupt",
          "t": "What happens when an interrupt arrives",
          "cap": "The interrupted program never notices. It continues exactly where it stopped."
        },
        "html": "<p>A device controller signals an <b>interrupt</b> when work finishes. Polling instead makes the CPU repeatedly check the device.</p><ol><li>Finish the current instruction.</li><li>Save the program counter and registers.</li><li>Use the <b>interrupt vector</b> to locate the handler.</li><li>Run the interrupt service routine.</li><li>Restore state and resume.</li></ol><p>A software-generated interrupt is a <b>trap</b>, caused by a request or an error such as division by zero.</p>",
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
        "t": "I/O and DMA",
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
        "html": "\n<p>With <b>interrupt-driven I/O</b>, the device interrupts the CPU for <b>every word</b> (a few bytes) — fine for a keyboard, terrible for a disk transferring megabytes.</p>\n<p><b>DMA (Direct Memory Access)</b>: the device controller copies a whole <b>block</b> of data directly into memory <b>without the CPU</b>, and interrupts <b>once per block</b>.</p>\n<table class=\"t\">\n  <tr><th></th><th>Interrupt-driven I/O</th><th>DMA</th></tr>\n  <tr><td>Interrupts</td><td>One per word</td><td><b>One per block</b></td></tr>\n  <tr><td>Best for</td><td>Slow devices (keyboard, mouse)</td><td>Fast, bulk devices (disk, network)</td></tr>\n</table>",
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
        "t": "The storage hierarchy and caching",
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
        "html": "\n<p>Storage is a trade-off: <b>fast = small and expensive</b>, <b>large = slow and cheap</b>.</p>\n<p style=\"text-align:center\"><b>registers → cache → main memory (RAM) → SSD → hard disk → optical / tape</b><br><span class=\"muted small\">faster, smaller, volatile ⟵ ⟶ slower, larger, non-volatile</span></p>\n<ul>\n  <li><b>Volatile</b> = loses its content without power (registers, cache, RAM).</li>\n  <li><b>Caching</b>: copy data temporarily into a faster layer. When the CPU needs A, it checks registers, then cache, then RAM, then disk; A <b>migrates upward</b> on demand.</li>\n  <li>Problem: several copies of A can exist; after a change, the others are outdated (<b>cache coherence</b>, important on multicore).</li>\n</ul>\n<div class=\"callout warn\">Cache is on the CPU die, much faster and smaller than RAM; the OS does not manage it directly.</div>",
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
        "t": "A mode bit protects operations; a timer returns control",
        "key": "A <b>mode bit</b> separates <b>user mode</b> (limited) from <b>kernel mode</b> (everything allowed). The only way into kernel mode is through a trap, interrupt or system call.",
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
        "html": "<p><b>User mode</b> has bit 1 and restricted privileges. <b>Kernel mode</b> has bit 0 and can execute privileged instructions such as controlling I/O, interrupts and the timer.</p><p>A system call, trap or interrupt enters the kernel through a controlled route. Returning restores user mode.</p><p>The OS sets a hardware <b>timer</b> before handing over the CPU. The timer interrupts even if the program loops without making system calls.</p><div class=\"callout warn\">Software rules alone cannot enforce protection; the mode bit and timer supply hardware support.</div>",
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
        "t": "What the OS manages",
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
        "html": "\n<table class=\"t\">\n  <tr><th>Area</th><th>OS responsibilities</th></tr>\n  <tr><td><b>Process management</b></td><td>Create/delete processes, suspend/resume, synchronisation, communication, deadlock handling</td></tr>\n  <tr><td><b>Memory management</b></td><td>Track who uses which part of memory, decide what to move in/out, allocate and free space</td></tr>\n  <tr><td><b>File-system management</b></td><td>Create/delete files and directories, map files to storage, backup</td></tr>\n  <tr><td><b>Mass-storage management</b></td><td>Free-space management, storage allocation, disk scheduling</td></tr>\n  <tr><td><b>I/O subsystem</b></td><td>Buffering, caching, spooling, device drivers</td></tr>\n  <tr><td><b>Protection &amp; security</b></td><td>Control access to resources; defend against attacks</td></tr>\n</table>\n<p><b>A program is passive</b> (a file on disk); <b>a process is active</b> (a program in execution, chapter 3).</p>\n<h3>Virtualisation</h3>\n<p>Software (a <b>hypervisor / VMM</b>) lets one physical computer run several operating systems as <b>virtual machines</b>, each believing it has its own hardware.</p><p>On the course map, these management jobs lead to services in Chapter 2 and processes in Chapter 3.</p><div class=\"callout warn\">Multitasking is time-sliced; on a single-core CPU only one task runs at any instant.</div>",
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
    ]
  },
  "2": {
    "goal": "List the OS services, explain what a system call is and follow one step by step (mode bit flips twice), name the three ways to pass parameters and the six types of system calls, separate mechanism from policy, and compare kernel structures.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "A program needs a controlled route to OS services",
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
        "html": "<p>The mode bit keeps an application from performing privileged operations directly. It still needs to read files, use devices and communicate. This chapter answers how it asks for those services, and how the kernel can be organized to provide them. Next, Chapter 3 follows the process making those requests.</p>",
        "check": {
          "q": "Why does protection lead to a need for system calls?",
          "o": [
            "Programs need controlled access to services",
            "Every program should disable protection",
            "The shell must become hardware"
          ],
          "why": "A system call gives a restricted program a controlled kernel entry."
        }
      },
      {
        "t": "OS services",
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
        "html": "\n<p>The OS offers services. Slide 6 lists ten categories: the first five benefit the <b>user</b>, the rest benefit the <b>system</b>.</p>\n<ul>\n  <li><b>User</b>: user interface (CLI, GUI, touch screen), program execution, I/O operations, file-system manipulation, communications (shared memory or message passing).</li>\n  <li><b>System</b>: error detection, resource allocation, logging/accounting, protection &amp; security.</li>\n</ul>\n<div class=\"callout warn\"><b>The sources disagree on error detection.</b> Slide 6 marks it as a system service; the midterm guide (exercise 2.2) and the study guide list it with the user services. If an exam question asks, name the grouping you use.</div><div class=\"callout\">The UI is just one of the services: the shell is a user program, not the kernel, and you can replace it.</div>",
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
        "t": "System calls: the door into the kernel",
        "key": "A <b>system call</b> is how a program asks the kernel to do something it may not do itself. Programs usually call it through an <b>API</b> (like <code>printf</code> → <code>write</code>).",
        "fig": {
          "type": "anim",
          "name": "syscall",
          "t": "The journey of one system call",
          "cap": "Parameters travel in <b>registers</b>, in a <b>block in memory</b> (address in a register), or on the <b>stack</b>."
        },
        "html": "\n<p>A <b>system call</b> is a <b>controlled entry point</b> into the kernel. Programs usually don't call it directly; they use an <b>API</b> (e.g. POSIX <code>read()</code> in the C library), which calls the real system call.</p>\n<h3>Journey of <code>read()</code></h3>\n<ol>\n  <li>Your program calls <code>read(fd, buf, n)</code> — user mode.</li>\n  <li>The C library (libc) puts the <b>system-call number</b> and parameters in registers and executes the <code>syscall</code> / trap instruction.</li>\n  <li>The CPU switches to <b>kernel mode</b> (mode bit 1 → 0) — <b>first flip</b>.</li>\n  <li>The <b>system-call interface</b> uses the number to find the function in the <b>system-call table</b>.</li>\n  <li>The kernel does the work and puts the return value in a register.</li>\n  <li>Return to <b>user mode</b> (0 → 1) — <b>second flip</b>.</li>\n</ol>\n<h3>Three ways to pass parameters</h3>\n<ol>\n  <li>In <b>registers</b> (fastest; Linux x86-64).</li>\n  <li>In a <b>block in memory</b>, with the block's address in a register.</li>\n  <li>Pushed onto the <b>stack</b>.</li>\n</ol>",
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
        "t": "Six types of system calls",
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
        "html": "\n<table class=\"t\">\n  <tr><th>Type</th><th>Examples (Unix)</th><th>Windows</th></tr>\n  <tr><td><b>Process control</b></td><td>fork(), exec(), exit(), wait()</td><td>CreateProcess()</td></tr>\n  <tr><td><b>File management</b></td><td>open(), read(), write(), close()</td><td>CreateFile(), ReadFile()</td></tr>\n  <tr><td><b>Device management</b></td><td>ioctl(), read(), write()</td><td>SetConsoleMode()</td></tr>\n  <tr><td><b>Information maintenance</b></td><td>get_time(), set_time(), get_process_stats()</td><td>GetCurrentProcessID()</td></tr>\n  <tr><td><b>Communications</b></td><td>pipe(), shm_open(), mmap()</td><td>CreatePipe()</td></tr>\n  <tr><td><b>Protection</b></td><td>chmod(), umask(), chown()</td><td>SetFileSecurity()</td></tr>\n</table>\n<p>A file-copy program uses several families: open and read the input, create and write the output, close files, then exit.</p><div class=\"callout warn\">System programs (ls, ps, gcc) are user programs that USE system calls.</div>",
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
        "t": "Design: mechanism vs policy",
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
        "html": "\n<ul>\n  <li><b>Mechanism</b> = <b>how</b> to do something. (The timer is a mechanism to guarantee CPU protection.)</li>\n  <li><b>Policy</b> = <b>what</b> will be done / decided. (How long the timer is set for each user.)</li>\n</ul>\n<p>Separating them gives <b>flexibility</b>: you can change the policy later without rewriting the mechanism.</p>\n",
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
        "t": "Kernel structures",
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
        "html": "\n<table class=\"t\">\n  <tr><th>Structure</th><th>Idea</th><th>Example</th><th>+ / −</th></tr>\n  <tr><td><b>Simple</b></td><td>No clean separation; apps can reach hardware</td><td>MS-DOS</td><td>Fast, but one bug crashes everything</td></tr>\n  <tr><td><b>Monolithic</b></td><td>Everything in one big kernel</td><td>Original UNIX</td><td>Fast, hard to maintain</td></tr>\n  <tr><td><b>Layered</b></td><td>Layer 0 = hardware … layer N = UI; each uses only the one below</td><td>THE (1968)</td><td>Easy to debug, slow (crossing layers)</td></tr>\n  <tr><td><b>Microkernel</b></td><td>Minimal kernel; drivers, file system in <b>user space</b>; communicate by <b>message passing</b></td><td>Mach, seL4</td><td>Reliable and secure, slower (IPC overhead)</td></tr>\n  <tr><td><b>Modular</b></td><td>Core kernel + loadable modules</td><td>Linux, Solaris</td><td>Flexible and fast</td></tr>\n  <tr><td><b>Hybrid</b></td><td>A mix</td><td>macOS, Windows, Android</td><td>Practical compromise</td></tr>\n</table><p>These structures provide the services that a running process will request in Chapter 3.</p><div class=\"callout warn\">Moving services into user processes improves isolation, but message passing adds overhead.</div>",
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
    ]
  },
  "3": {
    "goal": "Explain what a process is (memory layout), its five states and six transitions, the PCB and context switch, how fork/exec/wait/exit work (including zombies and orphans), and the two IPC models with the bounded buffer.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "OS services now have a running caller",
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
        "html": "<p>Chapter 2 showed how a program enters the kernel. Now follow that caller over time: it becomes ready, runs, waits for I/O and eventually finishes. Its PCB preserves the information needed to resume it. Processes can create children and exchange data. Chapter 4 then divides execution inside one process into threads.</p>",
        "check": {
          "q": "What changes when a passive program starts executing?",
          "o": [
            "It becomes a process with execution state",
            "It becomes the operating system",
            "Its file disappears from storage"
          ],
          "why": "A process is an active program, with state such as its PC and registers."
        }
      },
      {
        "t": "What a process is",
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
        "html": "\n<p>A <b>program</b> is a passive file on disk. A <b>process</b> is a <b>program in execution</b> — active, with its own state.</p>\n<h3>Memory layout of a process</h3>\n<table class=\"t\">\n  <tr><th>Section</th><th>Contains</th></tr>\n  <tr><td><b>Text</b></td><td>The program code</td></tr>\n  <tr><td><b>Data</b></td><td>Global variables</td></tr>\n  <tr><td><b>Heap</b></td><td>Memory allocated at run time (malloc) — grows up</td></tr>\n  <tr><td><b>Stack</b></td><td>Function parameters, return addresses, local variables — grows down</td></tr>\n</table>\n<p>Plus the <b>program counter</b> and <b>registers</b>. One program can be several processes (two browser windows).</p><div class=\"callout warn\">A program is a passive file; a process is active, in memory, with state. One program can be many processes.</div>",
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
        "t": "Five states, six transitions",
        "key": "Every process is in one of <b>five states</b>. Learn the <b>arrows</b> between them: exams ask which transitions are possible.",
        "fig": {
          "type": "anim",
          "name": "states",
          "t": "One process through its life",
          "cap": "There is <b>no</b> arrow waiting → running: a waiting process must go back to the ready queue first."
        },
        "html": "\n<table class=\"t\">\n  <tr><th>State</th><th>Meaning</th></tr>\n  <tr><td><b>New</b></td><td>Being created</td></tr>\n  <tr><td><b>Ready</b></td><td>Waiting for a CPU</td></tr>\n  <tr><td><b>Running</b></td><td>Executing on a CPU</td></tr>\n  <tr><td><b>Waiting</b></td><td>Waiting for an event (I/O to finish)</td></tr>\n  <tr><td><b>Terminated</b></td><td>Finished</td></tr>\n</table>\n<table class=\"t\">\n  <tr><th>Transition</th><th>Cause</th></tr>\n  <tr><td>New → Ready</td><td><b>admitted</b></td></tr>\n  <tr><td>Ready → Running</td><td><b>scheduler dispatch</b></td></tr>\n  <tr><td>Running → Ready</td><td><b>interrupt</b> (e.g. the time slice ran out)</td></tr>\n  <tr><td>Running → Waiting</td><td><b>I/O or event wait</b></td></tr>\n  <tr><td>Waiting → Ready</td><td><b>I/O or event completion</b></td></tr>\n  <tr><td>Running → Terminated</td><td><b>exit</b></td></tr>\n</table>\n<div class=\"callout warn\"><b>Exam trap:</b> Waiting → Running directly is <b>impossible</b>. When I/O completes, the process goes to <b>Ready</b> and waits for the scheduler.</div><div class=\"callout warn\">It goes Waiting → Ready. Only the scheduler moves Ready → Running.</div>",
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
        "t": "PCB, scheduling queues and context switch",
        "key": "The OS keeps a <b>PCB</b> (process control block) for every process. A <b>context switch</b> saves the old process's state into its PCB and loads the new one's.",
        "fig": {
          "type": "anim",
          "name": "ctxswitch",
          "t": "Context switch from P0 to P1 and back",
          "cap": "While the OS is switching, <b>no</b> process does useful work, so a context switch is pure overhead."
        },
        "html": "\n<p>The OS keeps everything about a process in its <b>PCB (Process Control Block)</b> — Linux: <code>task_struct</code>:</p>\n<ul>\n  <li>process state, process ID, <b>program counter</b>, <b>CPU registers</b>,</li>\n  <li>scheduling info (priority), memory-management info, accounting info, I/O status (open files).</li>\n</ul>\n<p>PCBs sit in <b>queues</b>: the <b>ready queue</b> and <b>wait queues</b> (one per device/event).</p>\n<h3>Context switch</h3>\n<p>When the CPU switches from P0 to P1, the OS <b>saves P0's state into PCB0</b> and <b>loads P1's state from PCB1</b>.</p>\n<div class=\"callout warn\"><b></b> A context switch is <b>pure overhead</b> — no useful work is done during it.</div>",
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
        "t": "fork creates a child; exec replaces its program",
        "key": "<code>fork()</code> makes a <b>copy</b> of the process. It returns <b>0 in the child</b> and the <b>child's PID in the parent</b>. <code>exec()</code> then replaces the copy with a new program.",
        "fig": {
          "type": "anim",
          "name": "fork",
          "t": "fork → exec → wait → exit",
          "cap": "<b>Zombie</b> = finished child whose parent has not called wait() yet. <b>Orphan</b> = child whose parent ended without waiting."
        },
        "html": "<p><b>fork()</b> creates a child that continues at the same point: return 0 in the child, the child PID in the parent, or −1 on failure. <b>exec()</b> replaces the process program. <b>wait()</b> collects a child’s exit status; <b>exit()</b> ends execution.</p><p>If every process executes each of n successive successful fork calls, the total is <b>2ⁿ</b>: three calls produce eight processes including the original.</p><p>A <b>zombie</b> has exited but has not been reaped. An <b>orphan</b> has lost its parent.</p><div class=\"callout warn\">fork returns different values in parent and child. exec replaces a program rather than creating another process.</div><div class=\"callout warn\">Parent gets the child's PID (>0), child gets 0, failure gives <0.</div>",
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
        "t": "Interprocess communication (IPC)",
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
        "html": "<p><b>Shared memory</b> lets processes directly read and write a common region after setup. They must synchronize access. <b>Message passing</b> exchanges data using send/receive through the kernel.</p><p>In the circular bounded buffer, <b>in</b> is the next free slot and <b>out</b> the next occupied slot. Empty means in == out; full means (in + 1) % SIZE == out.</p><div class=\"callout warn\">Capacity is SIZE − 1; reserving a slot distinguishes full from empty. Shared updates such as counter++ can interleave and lose an update.</div><p>Blocking send/receive waits; two blocking partners form a rendezvous. Pipes provide read and write ends: fd[0] reads and fd[1] writes.</p><p>Chapter 4 moves execution paths inside one process while keeping the shared-data problem.</p>",
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
    ]
  },
  "4": {
    "goal": "Explain threads vs processes and their benefits, concurrency vs parallelism, compute Amdahl's Law, compare the multithreading models, write the basic Pthreads calls, and explain race conditions and threading issues.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "One process can contain several paths of execution",
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
        "html": "<p>A process supplies code, data and open files. Threads let different paths of execution use those resources. This chapter asks what they share, when work can run in parallel, and why extra cores cannot remove serial work. Shared data also creates timing problems: the final step follows a lost update.</p>",
        "check": {
          "q": "Why study threads after processes?",
          "o": [
            "Threads execute inside a process and share its resources",
            "A thread replaces all OS services",
            "Threads are stored only on disk"
          ],
          "why": "The process owns shared resources; each thread has its own execution state."
        }
      },
      {
        "t": "Threads vs processes",
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
        "html": "\n<p>A <b>thread</b> is a basic unit of CPU use inside a process. A process can have several threads that run its code at the same time.</p>\n<table class=\"t\">\n  <tr><th>Shared by all threads of a process</th><th>Private to each thread</th></tr>\n  <tr><td>Code (text), data (globals), <b>heap</b>, open files</td><td>Thread ID, <b>program counter</b>, <b>registers</b>, <b>stack</b></td></tr>\n</table>\n<p>Example: a word processor — one thread shows the text, one reads keystrokes, one checks spelling.</p>\n<h3>Four benefits</h3>\n<ol>\n  <li><b>Responsiveness</b> — the UI keeps working while another thread does slow work.</li>\n  <li><b>Resource sharing</b> — threads share memory automatically.</li>\n  <li><b>Economy</b> — creating a thread and switching between threads is much cheaper than for processes.</li>\n  <li><b>Scalability</b> — threads can run in parallel on multicore CPUs.</li>\n</ol><div class=\"callout warn\">Processes have separate memory; threads share memory within a process.</div>",
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
        "t": "Concurrency makes progress; parallelism runs simultaneously",
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
        "html": "<p>On one core, tasks can take turns: each progresses, but only one executes at an instant. Multiple cores allow simultaneous execution.</p><p><b>Data parallelism</b> applies the same operation to different data subsets, such as splitting an array sum. <b>Task parallelism</b> performs different operations, such as rendering and decoding.</p><div class=\"callout warn\">Taking turns on one core is concurrency; it does not demonstrate parallel execution.</div><div class=\"callout warn\">Single core = concurrency (time slicing), not parallelism.</div>",
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
        "t": "The serial fraction limits speedup",
        "key": "<b>Amdahl’s Law</b>: speedup = 1 / (S + (1 − S)/N) in the ideal model.",
        "fig": {
          "type": "anim",
          "name": "amdahl",
          "t": "Amdahl: speedup = 1 / (S + (1 − S)/N)",
          "cap": "Move the slider to change the serial part S and watch the limit 1/S move."
        },
        "html": "<p>S is the fraction that must run serially; N is the number of cores. The parallel fraction, 1 − S, is divided across the cores.</p><p>With S = 0.25 and N = 2, normalized runtime is 0.25 + 0.75/2 = 0.625. Speedup is 1/0.625 = <b>1.6</b>.</p><p>As N grows, the parallel term approaches zero. The speedup limit is <b>1/S</b>: 4 for this example.</p><div class=\"callout warn\">Use the serial fraction for S, not the parallel fraction. Extra cores cannot remove serial work.</div><div class=\"callout warn\">Amdahl: the serial part limits speedup; too many threads add switching overhead.</div>",
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
        "t": "User threads, kernel threads and the three models",
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
        "html": "\n<p><b>User threads</b> are managed by a library in user space. <b>Kernel threads</b> are what the OS actually schedules on cores. A model maps one to the other:</p>\n<table class=\"t\">\n  <tr><th>Model</th><th>Mapping</th><th>Problem / benefit</th><th>Used by</th></tr>\n  <tr><td><b>Many-to-one</b></td><td>Many user → 1 kernel thread</td><td>One blocking call blocks <b>all</b>; no parallelism</td><td>Solaris Green Threads (old)</td></tr>\n  <tr><td><b>One-to-one</b></td><td>Each user thread → its own kernel thread</td><td>True parallelism; one blocked thread doesn't stop others; more overhead</td><td><b>Linux, Windows</b></td></tr>\n  <tr><td><b>Many-to-many</b></td><td>Many user threads → a sufficient number of kernel threads</td><td>Flexible, but complex to implement</td><td>Rare in practice</td></tr>\n</table>\n<p>Implicit threading (the system makes threads for you): <b>thread pools</b>, fork-join, OpenMP, Grand Central Dispatch.</p>",
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
        "t": "Pthreads in C",
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
        "html": "\n<pre>#include &lt;pthread.h&gt;\nint sum;                              /* shared by the threads */\nvoid *runner(void *param) {           /* the thread's function */\n    int upper = atoi(param);\n    for (int i = 1; i &lt;= upper; i++) sum += i;\n    pthread_exit(0);\n}\nint main(int argc, char *argv[]) {\n    pthread_t tid;  pthread_attr_t attr;\n    pthread_attr_init(&amp;attr);                     /* default attributes */\n    pthread_create(&amp;tid, &amp;attr, runner, argv[1]); /* start the thread  */\n    pthread_join(tid, NULL);                      /* wait for it       */\n    printf(\"sum = %d\\n\", sum);\n}</pre>\n<p>Compile with <code>gcc prog.c -pthread</code>.</p>\n<ul>\n  <li><b>pthread_create</b> — start a thread running a function.</li>\n  <li><b>pthread_join</b> — wait for it to finish (like wait() for processes).</li>\n  <li><b>pthread_exit</b> — end the thread.</li>\n</ul>",
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
        "t": "Interleaving updates can lose a result",
        "key": "When two threads update the same variable <b>at the same time</b>, the result depends on timing. That is a <b>race condition</b>, and updates can get lost.",
        "fig": {
          "type": "anim",
          "name": "race",
          "t": "counter++ is really 3 steps: load, add, store",
          "cap": "The first run is the lesson's order. Press <b>Try another interleaving</b> to let the scheduler pick a different order."
        },
        "html": "\n<p><code>counter++</code> looks like one step, but it is <b>three</b> machine instructions: <b>load</b> counter into a register, <b>add</b> 1, <b>store</b> it back.</p>\n<p>Two threads, counter = 0:</p>\n<ol>\n  <li>A loads 0</li><li>B loads 0</li><li>A adds → 1, stores 1</li><li>B adds → 1, stores 1</li>\n</ol>\n<p>Result <b>1</b> instead of 2 — an update was <b>lost</b>. That is a <b>race condition</b>: the result depends on the timing. (Fixed with synchronisation — chapter 6.)</p>\n<p>On the map: Chapter 5 explains why a thread can be stopped between those steps (preemptive scheduling), and Chapter 6 gives the tools that prevent the lost update.</p><div class=\"callout warn\">It is 3 instructions (load, add, store). Two threads can lose updates.</div>",
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
    ]
  },
  "5": {
    "goal": "Say when the scheduler decides and what preemption means, use the five criteria, draw Gantt charts and compute waiting and turnaround times for FCFS, SJF, SRTF, RR and Priority, and explain starvation, aging, multilevel queues, thread scope and real-time scheduling.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "The scheduler picks which ready process gets the CPU",
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
        "html": "<p>Chapter 3 put processes in a ready queue and Chapter 4 added threads. One CPU core runs only one of them at a time, so the OS has to choose. That choice is <b>CPU scheduling</b>; the slides call the CPU the most-shared resource in the system.</p><p>This chapter answers three questions: when does the OS choose, how do we judge a choice, and which rules (algorithms) does it use? The exam work here is drawing a <b>Gantt chart</b> and computing waiting times; the slides call this the most-tested chapter.</p>",
        "check": {
          "q": "What does the CPU scheduler choose?",
          "o": [
            "Which ready process or thread runs next on a core",
            "Which program is installed on the disk",
            "Which device may raise an interrupt"
          ],
          "why": "It selects from the ready queue and allocates a CPU core to that process."
        }
      },
      {
        "t": "The scheduler decides at four moments; preemption adds two of them",
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
        "html": "<p>A process runs for a while (a <b>CPU burst</b>), waits for I/O (an <b>I/O burst</b>), then runs again. Most CPU bursts are short. An <b>I/O-bound</b> process has many short bursts; a <b>CPU-bound</b> one has a few long bursts.</p><p>In cases 1 and 4 the CPU is free, so a new process must be picked. In cases 2 and 3 the OS <i>may</i> take the CPU from the running process: that is <b>preemptive</b> scheduling, used by Windows, macOS, Linux and UNIX.</p><p>The <b>dispatcher</b> then hands over the CPU: switch context, switch to user mode, jump to the right place in the program. The time this takes is the <b>dispatch latency</b>.</p><div class=\"callout warn\">Preemption can stop a process in the middle of updating shared data. Chapter 6 deals with that.</div>",
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
        "t": "Five criteria judge a schedule; two formulas do the arithmetic",
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
        "html": "<p>Every Gantt-chart question uses two formulas:</p><ul><li><b>Turnaround time</b> = completion time − arrival time.</li><li><b>Waiting time</b> = turnaround time − burst time: the time spent ready but not running.</li></ul><p>Example: a process arrives at 2, needs 9 ms and finishes at 26. Turnaround = 26 − 2 = 24; waiting = 24 − 9 = 15. The <b>average waiting time</b> is the sum of all waiting times divided by the number of processes.</p><p><b>Response time</b> counts only until the <i>first</i> response, which matters for interactive systems. No algorithm wins on all five criteria, which is why several exist.</p>",
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
        "t": "FCFS runs processes in arrival order",
        "key": "<b>FCFS</b> is simple and nonpreemptive, but short jobs stuck behind a long one wait a long time: the <b>convoy effect</b>.",
        "fig": {
          "type": "anim",
          "name": "fcfs",
          "t": "FCFS: the same three jobs in two orders"
        },
        "html": "<p><b>First-come, first-served</b>: the process that arrives first gets the CPU and keeps it until it finishes or blocks.</p><p>Slide 16: P1 = 24, P2 = 3, P3 = 3, arriving in that order. Gantt chart: P1 0–24, P2 24–27, P3 27–30. Waiting times 0, 24 and 27, so the average is <b>17</b>.</p><p>Slide 17: the same processes in the order P2, P3, P1. Waiting times 6, 0 and 3, average <b>3</b>. FCFS depends heavily on arrival order, and it cannot know which job is short.</p><p>The convoy effect also hurts I/O devices: while a long CPU-bound job runs, the I/O-bound jobs sit in the ready queue and their devices stay idle.</p>",
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
        "t": "SJF runs the shortest next burst; SRTF can preempt",
        "key": "<b>SJF</b> gives the <b>minimum average waiting time</b>, but it needs the length of the next CPU burst, which the OS cannot know. <b>SRTF</b> is its preemptive version.",
        "fig": {
          "type": "anim",
          "name": "sjf",
          "t": "SJF and SRTF on the slide examples"
        },
        "html": "<p><b>Shortest-job-first</b> picks the process whose next CPU burst is shortest. Slide 18: P1 = 6, P2 = 8, P3 = 7, P4 = 3. Order P4, P1, P3, P2; waiting 3, 16, 9 and 0; average <b>7</b>.</p><p><b>SRTF</b> (shortest remaining time first): when a new process arrives needing less than the running process has left, it takes the CPU. Slide 19 gives an average of <b>6.5</b>.</p><p>The catch is that the next burst lies in the future. Real systems can only estimate it, so SJF is a benchmark rather than something the OS can run exactly. Long jobs can also starve while short ones keep arriving.</p><div class=\"callout warn\">\"SJF is the best algorithm in practice.\" No: it is optimal for average waiting time only on paper, because burst lengths are unknown.</div>",
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
        "t": "Round Robin gives every process a time quantum",
        "key": "<b>RR</b> runs each process for at most one <b>quantum q</b>, then sends it to the back of the ready queue; q must be much larger than a <b>context switch</b>.",
        "fig": {
          "type": "anim",
          "name": "rr",
          "t": "Round Robin with q = 4"
        },
        "html": "<p>Round Robin is FCFS plus a timer. With n processes, each gets 1/n of the CPU in pieces of at most q, so no process waits more than <b>(n − 1)q</b> for its next turn. That gives the best <b>response time</b>.</p><p>Slide 20, q = 4: P1 0–4, P2 4–7, P3 7–10, then P1 alone until 30. Waiting 6, 4 and 7; average 17 / 3 = <b>5.67</b>. The slide prints 5.3, which is an arithmetic slip; its q = 6 result of 7 is correct.</p><p>The quantum sets the behaviour. A very large q turns RR into FCFS; a very small q wastes the CPU on context switches. The slides give 10–100 ms as typical.</p><div class=\"callout warn\">Slide 55's live demo (A 0/8, B 2/4, C 4/2, D 6/6, q = 4) runs D before A at time 10. With the rule used on the other slides and here, A went back to the queue at 4, before D arrived at 6, so A runs 10–14 and D 14–20. On paper, state the rule you apply.</div>",
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
        "t": "Priority scheduling starves low priorities unless they age",
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
        "html": "<p>Slide 23: bursts 10, 1, 2, 1, 5 with priorities 3, 1, 4, 5, 2. Order P2, P5, P1, P3, P4; waiting 6, 0, 16, 18 and 1; average <b>8.2</b>.</p><p>A low-priority process may never run while higher ones keep arriving: <b>starvation</b>. <b>Aging</b> raises a process's priority the longer it waits. Processes with equal priority can share the CPU round robin (slide 24).</p><p>A <b>multilevel queue</b> keeps separate queues (system processes FCFS, interactive RR, batch SJF), and processes never change queue. In a <b>multilevel feedback queue</b> they move: a process that uses too much CPU drops a level, one that waits too long moves up, so short jobs finish near the top.</p>",
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
        "t": "Threads, real-time tasks and real kernels add their own rules",
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
        "html": "<p>In <b>process-contention scope</b> the thread library decides which user thread runs, a competition inside one process. In <b>system-contention scope</b> the kernel decides among all threads. In C: <code>pthread_attr_setscope(&amp;attr, PTHREAD_SCOPE_SYSTEM)</code> and <code>pthread_attr_setschedpolicy(&amp;attr, SCHED_RR)</code>.</p><p>Rate-monotonic can fail above about 69% CPU use; EDF can schedule up to 100% but needs the deadlines in advance. On several cores the OS also balances load and keeps a thread on one core (<b>processor affinity</b>). Linux has used <b>EEVDF</b> since kernel 6.6 (2023), after CFS; Windows uses 32 priority levels.</p><p>On the map: preemption can stop a thread halfway through updating shared data. Chapter 6 makes that safe.</p>",
        "check": {
          "q": "Which statement about real-time scheduling is correct?",
          "o": [
            "Real time means predictable: deadlines are guaranteed",
            "Real time means the fastest average speed",
            "EDF gives each task a fixed priority by period"
          ],
          "why": "A hard real-time scheduler may be slower on average but guarantees deadlines; EDF priorities change as deadlines approach."
        }
      }
    ]
  },
  "6": {
    "goal": "Show how count++ and count-- race, state the three critical-section requirements, explain Peterson's solution and why it needs memory barriers, use test_and_set, compare_and_swap, mutex locks, semaphores and condition variables, and recognise deadlock, starvation and priority inversion.",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Preemption can stop a process halfway through an update",
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
        "html": "<p>Chapter 4 showed two threads losing an update to a shared counter. Chapter 5 explained how: a preemptive scheduler may stop a process between any two instructions. This chapter is the fix.</p><p>The tools go from low level to high level: a software solution (<b>Peterson</b>), hardware instructions (<b>test_and_set</b>, <b>compare_and_swap</b>), then <b>mutex locks</b>, <b>semaphores</b> and <b>monitors</b>. Then come the failures that remain: <b>deadlock</b>, <b>starvation</b> and <b>priority inversion</b>. The midterm is handwritten, and the slides advise practising Pthread code on paper.</p>",
        "check": {
          "q": "Why does preemptive scheduling create a need for synchronization?",
          "o": [
            "A process can be stopped halfway through updating shared data",
            "Preemption deletes shared variables",
            "Preemption only happens on one-core machines"
          ],
          "why": "An interrupted read-modify-write lets another process read or overwrite a half-finished update."
        }
      },
      {
        "t": "count++ and count-- can interleave and corrupt count",
        "key": "When the result depends on the order in which processes access shared data, the code has a <b>race condition</b>.",
        "fig": {
          "type": "anim",
          "name": "pcrace",
          "t": "Producer and consumer share count = 5"
        },
        "html": "<p>In the producer–consumer deck, the producer adds an item and runs <code>count++</code>; the consumer removes one and runs <code>count--</code>. Each is three machine steps: load into a register, change the register, store it back.</p><p>Starting from count = 5, the order T0–T5 in the figure ends with <b>4</b>. If the two stores swap, the result is <b>6</b>. Only 5 is correct.</p><p>The slides give two more races: two people withdraw $100 from a shared $1000 account and both write $900; two <code>fork()</code> calls read the same <code>next_available_pid</code>, so two children get the same PID.</p>",
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
        "t": "A critical section admits one process at a time",
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
        "html": "<p>The code that touches shared data is the <b>critical section</b>. A process asks to enter in its <b>entry section</b> and leaves through its <b>exit section</b>; the rest is the <b>remainder section</b>. A correct protocol needs three things:</p><ol><li><b>Mutual exclusion</b>: while one process is in its critical section, no other is in its own.</li><li><b>Progress</b>: if nobody is inside and some want in, the choice of who enters cannot be postponed forever.</li><li><b>Bounded waiting</b>: after a process asks, the others can enter only a limited number of times before it does.</li></ol><p>Nothing may be assumed about the relative speed of the processes.</p>",
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
        "t": "Peterson's solution: I want in, but you go first",
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
        "html": "<p>This is a software solution for two processes, Pi and Pj. Both may set their flag at almost the same time, but <code>turn</code> holds one value: whoever wrote it <i>last</i> has given the turn away, and waits. So both cannot be inside: <b>mutual exclusion</b>. If Pj does not want in, Pi enters at once: <b>progress</b>. After Pi asks, Pj can enter at most once more: <b>bounded waiting</b>.</p><p>The proof assumes that loads and stores happen in program order. To run faster, processors and compilers may <b>reorder</b> instructions that do not depend on each other. A <b>memory barrier</b> forces every earlier memory change to become visible to the other processors before any later one.</p>",
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
        "t": "Hardware makes test-and-modify one atomic step",
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
        "html": "<p>count++ broke because load and store are separate steps. Hardware offers instructions that cannot be interrupted halfway.</p><p><code>test_and_set(&amp;lock)</code> returns the old value and sets the word to true. A process spins in <code>while (test_and_set(&amp;lock)) ;</code> until the old value was false: the lock was free and is now its own. Leaving, it sets <code>lock = false</code>. This gives mutual exclusion and progress, but <b>not bounded waiting</b>: an unlucky process can lose every race.</p><p><code>compare_and_swap(&amp;value, expected, new_value)</code> writes the new value only if the current value equals the expected one, and returns the old value. C11 builds <b>atomic variables</b> on it: <code>atomic_fetch_add(&amp;counter, 1)</code> is a safe counter++.</p>",
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
        "t": "A mutex lock wraps the critical section in acquire and release",
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
        "html": "<p>Application programmers rarely use the hardware instructions directly, so the OS offers a mutex: a Boolean saying whether the lock is free. Both operations must be atomic, usually through compare_and_swap. In Pthreads:</p><pre>pthread_mutex_lock(&amp;mutex);\ncounter++;   /* critical section */\npthread_mutex_unlock(&amp;mutex);</pre><p>With five threads the counter always ends at 5. The slides list three common mistakes: two threads locking two mutexes in <b>opposite orders</b> (deadlock), <b>forgetting to unlock</b> on an early return, and one thread <b>locking the same mutex twice</b> (self-deadlock). Linux uses an <b>adaptive mutex</b>: spin briefly, then sleep.</p>",
        "lab": {
          "href": "ch6/critical.html",
          "todo": [
            "Choose \"Mutex lock\". Run the producer twice (acquire, load), then try the consumer: it waits at acquire.",
            "Press \"Play the deck's order\", then finish both processes: count ends at 5 every time."
          ]
        },
        "check": {
          "q": "A critical section takes 5 μs and a context switch about 1–10 μs. Which lock fits better?",
          "o": [
            "A spinlock: waiting briefly costs less than sleeping",
            "A sleeping mutex: spinning is always wrong",
            "No lock: 5 μs is too short for a race"
          ],
          "why": "The slides: spin when the critical section is shorter than a context switch, sleep when it is much longer."
        }
      },
      {
        "t": "A semaphore counts: wait takes one, signal gives one back",
        "key": "A <b>semaphore</b> S is an integer used only through atomic <b>wait()</b> (P) and <b>signal()</b> (V). <b>Counting</b> semaphores count resources; <b>binary</b> ones (0 or 1) work like a mutex.",
        "fig": {
          "type": "anim",
          "name": "semaphore",
          "t": "wait() and signal() with a waiting queue (slide 29)"
        },
        "html": "<p><code>wait(S)</code> decrements S and blocks the caller if S becomes negative. <code>signal(S)</code> increments S and wakes one waiting process. Without busy waiting, each semaphore has a <b>waiting queue</b>: a positive value is the number of free resources, a negative value the number of waiting processes.</p><p>Two uses: <b>mutual exclusion</b> with <code>mutex = 1</code> around the critical section, and <b>ordering</b> with <code>synch = 0</code>. P1 runs S1 and then <code>signal(synch)</code>; P2 runs <code>wait(synch)</code> and then S2, so S1 always comes first. A mutex can only do the first.</p><p>Pthreads: <code>sem_init(&amp;sem, 0, 1)</code>, <code>sem_wait</code>, <code>sem_post</code>. A mutex has an <b>owner</b> (only the locker unlocks it); any thread may post a semaphore.</p><div class=\"callout warn\"><b>Two versions on the slides.</b> Slide 27 defines <code>wait(S)</code> with busy waiting: <code>while (S &lt;= 0) ; S--;</code>, so S never goes below 0. Slide 29 decrements first and blocks if S &lt; 0, so a negative S counts the waiters. Slide 27 also calls a binary semaphore \"the same as a mutex lock\"; slides 31 and 45 add the one difference: ownership.</div>",
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
        "t": "Monitors and condition variables, and how waiting can still fail",
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
        "html": "<p>A <b>monitor</b> is an abstract data type whose procedures run one at a time; the compiler adds the mutual exclusion. A <b>condition variable</b> x inside it has <code>x.wait()</code> (sleep and release the monitor) and <code>x.signal()</code> (wake one waiter). In Pthreads: lock the mutex, then <code>while (!ready) pthread_cond_wait(&amp;cond, &amp;mutex);</code>. Use <b>while</b>, not if: a thread can wake without a signal (a spurious wakeup).</p><p>In <b>priority inheritance</b> the low-priority lock holder temporarily gets the high priority, so a medium-priority process cannot preempt it. Priority inversion is what made Mars Pathfinder reboot in 1997.</p><p>The map is complete: hardware, services, processes, threads, scheduling, and now safe sharing.</p>",
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
    ]
  }
};
