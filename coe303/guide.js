/* Source: existing COE303 lessons, animations and labs.
 * Correct check first; learn.js shuffles options and appends practice. */
window.GUIDE = {
  "1": {
    "goal": "Explain what an OS is and does, how the CPU and devices talk (interrupts, DMA), the storage hierarchy and caching, why dual mode and the timer are needed for protection, and the OS's management jobs.",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Follow resources from hardware to threads",
        "key": "The <b>operating system</b> controls resources; <b>processes</b> and <b>threads</b> are the work it manages.",
        "fig": {
          "type": "flow",
          "t": "Course map: foundations to execution",
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
            ]
          ]
        },
        "html": "<p>Start with the machine: CPU, memory and devices. Chapter 1 explains how the OS controls them. Chapter 2 follows a program asking the kernel for a service. Chapter 3 turns a program into a running process and follows its state and communication. Chapter 4 looks inside a process: several threads share its resources.</p><p>Keep one question in mind: who uses the resource, and how does the OS keep control?</p>",
        "check": {
          "q": "Which order connects the four chapters?",
          "o": [
            "Hardware control, services, processes, threads",
            "Threads, then hardware, with no connection",
            "Compilation, linking, databases, networks"
          ],
          "why": "The course moves from the resources being managed to the units of execution that use them."
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
          "t": "Course map: foundations to execution",
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
        "key": "The OS offers <b>services</b>: some help the <b>user</b> (UI, running programs, files, I/O, errors), others keep the <b>system</b> efficient (resources, accounting, protection).",
        "fig": {
          "type": "compare",
          "vs": false,
          "cols": [
            {
              "icon": "",
              "t": "Helpful for the user",
              "pts": [
                "user interface (GUI, CLI, touch)",
                "program execution",
                "I/O operations",
                "file-system manipulation",
                "communication",
                "error detection"
              ],
              "c": "c1"
            },
            {
              "icon": "",
              "t": "Keep the system efficient",
              "pts": [
                "resource allocation",
                "logging / accounting",
                "protection and security"
              ],
              "c": "c0"
            }
          ]
        },
        "html": "\n<p>The OS offers services. For the <b>user</b>:</p>\n<ul>\n  <li><b>User interface</b> — CLI (shell), GUI, touch screen.</li>\n  <li><b>Program execution</b> — load, run, end a program.</li>\n  <li><b>I/O operations</b>.</li>\n  <li><b>File-system manipulation</b> — read, write, create, delete, search files.</li>\n  <li><b>Communications</b> — between processes (shared memory or message passing).</li>\n  <li><b>Error detection</b>.</li>\n</ul>\n<p>For the <b>system's efficiency</b>:</p>\n<ul>\n  <li><b>Resource allocation</b>, <b>logging/accounting</b>, <b>protection &amp; security</b>.</li>\n</ul>\n<div class=\"callout\"><b>Note:</b> the UI is just one of the services — the shell is a program, not the kernel.</div><div class=\"callout warn\">A shell and a system call are different: a user program uses kernel services.</div><div class=\"callout warn\">The user interface is one OS service; the shell is a user program.</div><div class=\"callout warn\">The shell is a regular user program — you can replace bash with zsh or your own.</div>",
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
                  "getpid(), alarm(), sleep()",
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
        "html": "\n<table class=\"t\">\n  <tr><th>Type</th><th>Examples (Unix)</th><th>Windows</th></tr>\n  <tr><td><b>Process control</b></td><td>fork(), exec(), exit(), wait()</td><td>CreateProcess()</td></tr>\n  <tr><td><b>File management</b></td><td>open(), read(), write(), close()</td><td>CreateFile(), ReadFile()</td></tr>\n  <tr><td><b>Device management</b></td><td>ioctl(), read(), write()</td><td>SetConsoleMode()</td></tr>\n  <tr><td><b>Information maintenance</b></td><td>getpid(), alarm(), sleep()</td><td>GetCurrentProcessID()</td></tr>\n  <tr><td><b>Communications</b></td><td>pipe(), shm_open(), mmap()</td><td>CreatePipe()</td></tr>\n  <tr><td><b>Protection</b></td><td>chmod(), umask(), chown()</td><td>SetFileSecurity()</td></tr>\n</table>\n<p>A file-copy program uses several families: open and read the input, create and write the output, close files, then exit.</p><div class=\"callout warn\">System programs (ls, ps, gcc) are user programs that USE system calls.</div>",
        "check": {
          "q": "getpid() belongs to which type?",
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
          "t": "Course map: foundations to execution",
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
          "t": "Course map: foundations to execution",
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
        "html": "\n<p><b>User threads</b> are managed by a library in user space. <b>Kernel threads</b> are what the OS actually schedules on cores. A model maps one to the other:</p>\n<table class=\"t\">\n  <tr><th>Model</th><th>Mapping</th><th>Problem / benefit</th><th>Used by</th></tr>\n  <tr><td><b>Many-to-one</b></td><td>Many user → 1 kernel thread</td><td>One blocking call blocks <b>all</b>; no parallelism</td><td>Solaris Green Threads (old)</td></tr>\n  <tr><td><b>One-to-one</b></td><td>Each user thread → its own kernel thread</td><td>True parallelism; one blocked thread doesn't stop others; more overhead</td><td><b>Linux, Windows</b></td></tr>\n  <tr><td><b>Many-to-many</b></td><td>Many user → many (≤) kernel threads</td><td>Flexible, but complex to implement</td><td>Rare in practice</td></tr>\n</table>\n<p>Implicit threading (the system makes threads for you): <b>thread pools</b>, fork-join, OpenMP, Grand Central Dispatch.</p>",
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
        "html": "\n<p><code>counter++</code> looks like one step, but it is <b>three</b> machine instructions: <b>load</b> counter into a register, <b>add</b> 1, <b>store</b> it back.</p>\n<p>Two threads, counter = 0:</p>\n<ol>\n  <li>A loads 0</li><li>B loads 0</li><li>A adds → 1, stores 1</li><li>B adds → 1, stores 1</li>\n</ol>\n<p>Result <b>1</b> instead of 2 — an update was <b>lost</b>. That is a <b>race condition</b>: the result depends on the timing. (Fixed with synchronisation — chapter 6.)</p>\n<div class=\"callout warn\">A shared counter update is not atomic in this load/add/store example.</div><p>The map now closes: the OS controls resources, services expose them, processes own them, and threads execute while sharing them.</p><div class=\"callout warn\">It is 3 instructions (load, add, store). Two threads can lose updates.</div>",
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
  }
};
