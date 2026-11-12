/* OS/ML explanations in Turkish, with English exam terms and checks.
 * Source: existing course lessons; raw slides unavailable for this revision.
 * Source-conflict notes retained. Correct check first; learn.js shuffles options. */
window.GUIDE = {
  "1": {
    "goal": "Bir bilgisayarı birçok program aynı anda nasıl güvenle kullanır?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Önce bütün resmi görelim",
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
        "html": "<p>Tarayıcı, derleyici ve oyun aynı CPU’yu ve belleği kullanmak istiyor. Hangisi ne zaman çalışacak? Hangi bellek alanını kullanabilecek? Bu paylaşımı <b>operating system (OS)</b> düzenler.</p><p>Dersin altı bölümü aynı sorunun devamı: önce donanımı kontrol etmeyi öğreniyoruz (1–2). Sonra çalışan programları ve içlerindeki thread’leri tanıyoruz (3–4). Son olarak CPU’yu kime vereceğimizi (5) ve ortak veriyi nasıl koruyacağımızı (6) çözüyoruz.</p><p>İlk sorumuz şu: OS bir programı çalıştırdıktan sonra kontrolü nasıl kaybetmez?</p>",
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
        "t": "OS tam olarak ne yapar?",
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
        "html": "<p>Bir programın çalışması için CPU, bellek ve cihaz gerekir. OS, uygulamaların bu kaynakları kullanmasını düzenleyen katmandır.</p><p>İki görevini ayıralım:</p><ul><li><b>Resource allocator</b>: kaynakları paylaştırır. Kimin ne kadar kullanacağını belirler.</li><li><b>Control program</b>: hatalı veya izinsiz kullanımı önler.</li></ul><p><b>Kernel</b>, OS’nin çalışma boyunca etkin kalan çekirdeğidir. Ekranda gördüğün masaüstü ise kullanıcı alanındaki bir programdır.</p><p>Sınavda “OS nedir?” sorusunu yalnızca arayüzle açıklama. Asıl fikir, donanımı paylaştırmak ve kullanımını kontrol etmektir.</p><div class=\"callout warn\">Masaüstü bir user-space program’dır; <b>kernel</b> değildir.</div>",
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
        "t": "Cihaz işi bitirince CPU bunu nasıl öğrenir?",
        "key": "Instead of the CPU asking \"are you done yet?\" again and again (<b>polling</b>), the device <b>taps the CPU on the shoulder</b> when it finishes (an <b>interrupt</b>).",
        "fig": {
          "type": "anim",
          "name": "interrupt",
          "t": "What happens when an interrupt arrives",
          "cap": "The interrupted program never notices. It continues exactly where it stopped."
        },
        "html": "<p>CPU bir programı çalıştırırken cihazın I/O işi bitti. CPU sürekli “bitti mi?” diye kontrol edebilir: buna <b>polling</b> denir. Diğer yol, cihazın CPU’ya bir <b>interrupt</b> göndermesidir.</p><p>Interrupt geldiğinde sıra şöyledir:</p><ol><li>CPU mevcut instruction’ı tamamlar.</li><li>Programın kaldığı yeri ve register’larını kaydeder.</li><li><b>Interrupt vector</b> üzerinden ilgili handler’ı bulur.</li><li>Olayı işler; kayıtlı durumu geri yükleyip programa döner.</li></ol><p>Kaydetme adımı kritik: CPU geri döndüğünde nereden devam edeceğini bilmelidir. Yazılımdan gelen kesmeye, örneğin sıfıra bölme hatasına, <b>trap</b> denir.</p>",
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
        "t": "DMA: her küçük parçayla CPU uğraşmasın",
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
        "html": "<p>Klavye gibi yavaş bir cihaz için küçük aktarımlarla ilgilenmek sorun olmayabilir. Fakat büyük bir disk aktarımında CPU’yu her word için bölmek pahalıdır.</p><p><b>Direct Memory Access (DMA)</b>, bir veri bloğunu device controller’ın doğrudan belleğe aktarmasını sağlar. CPU her word’ü kendisi kopyalamaz; blok tamamlanınca bir interrupt alır.</p><table class=\"t\"><tr><th>Dersin aktarım modeli</th><th>CPU ne zaman bölünür?</th></tr><tr><td>Word başına interrupt</td><td>Her word için</td></tr><tr><td><b>DMA</b></td><td>Blok tamamlandığında</td></tr></table><p>DMA’nın kazancı, CPU’yu aktarımdaki her küçük işe dahil etmemesidir.</p>",
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
        "t": "Neden bütün veriyi en hızlı bellekte tutmuyoruz?",
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
        "html": "<p>Çünkü hızlı depolama küçük ve pahalıdır. Büyük kapasiteyi daha düşük maliyetle sunan katmanlar genellikle daha yavaştır.</p><p><b>Cache</b>, gereken verinin bir kopyasını daha hızlı katmanda tutar. Lab’da A verisinin CPU’ya doğru taşınmasını izle. A değiştiğinde eski kopyalar güncelliğini kaybedebilir: <b>cache coherence</b> sorunu budur.</p><p>Hız ile kalıcılığı karıştırma. <b>Registers, cache ve RAM</b> volatile’dır: güç kesilince içerikleri kaybolur. SSD ve disk gibi <b>non-volatile</b> depolama veriyi korur.</p><div class=\"callout warn\">Dersin hierarchy’sinde CPU cache, RAM’den hızlı ve küçüktür; OS tarafından doğrudan yönetilmez.</div>",
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
        "t": "Mode bit yetkiyi, timer süreyi sınırlar",
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
        "html": "<p>Bir uygulama interrupt’ları kapatabilse veya her bellek alanına yazabilse diğer programları tehlikeye atardı. Bu yüzden donanım iki çalışma modu ayırır.</p><table class=\"t\"><tr><th>Mod</th><th>Dersin bit değeri</th><th>Yetki</th></tr><tr><td><b>User mode</b></td><td>1</td><td>Kısıtlı</td></tr><tr><td><b>Kernel mode</b></td><td>0</td><td>Privileged instruction çalıştırabilir</td></tr></table><p>System call, trap veya interrupt kontrollü biçimde kernel’a giriş sağlar.</p><p>Peki program sonsuz döngüye girerse? OS, CPU’yu vermeden önce <b>timer</b> kurar. Timer interrupt üretince kontrol geri gelir. Böylece mode bit “ne yapabilir?”, timer ise “kontrolü ne kadar tutabilir?” sorusunu çözer.</p><div class=\"callout warn\">Yalnız yazılım kuralları korumayı zorlayamaz. <b>Mode bit</b> ve <b>timer</b> donanım desteği sağlar.</div>",
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
        "t": "Aynı yönetim fikri diğer kaynaklarda da var",
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
        "html": "<p>OS yalnızca CPU’yu yönetmez. Bellekte boş alanı takip eder; dosyaları depolamaya yerleştirir; I/O cihazlarını koordine eder; erişim izinlerini denetler.</p><p><b>Program</b>, diskte duran pasif dosyadır. <b>Process</b>, onun çalışan örneğidir. Üçüncü bölümde bu çalışan örneği izleyeceğiz.</p><p><b>Virtualization</b> aynı paylaşım fikrini başka düzeye taşır: bir <b>hypervisor</b>, tek fiziksel makinede kendi OS’sini çalıştıran birden fazla virtual machine sağlar.</p><p>Artık OS’nin neden gerekli olduğunu biliyoruz. Sıradaki soru: bir uygulama bu hizmetleri nasıl ister?</p><div class=\"callout warn\">Tek core’da aynı anda yalnızca bir task çalışır. Multitasking, zaman dilimleriyle ilerleyebilir.</div>",
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
    "question": "Bir bilgisayarı birçok program aynı anda nasıl güvenle kullanır?",
    "reading": true,
    "summary": [
      "OS kaynakları paylaştırır ve kullanımı denetler.",
      "Interrupt, CPU’nun bir olayı işlemesini sağlar; DMA büyük veri aktarımında CPU’nun yükünü azaltır.",
      "Mode bit yetkiyi sınırlar; timer kontrolün OS’ye geri dönmesini sağlar."
    ],
    "examAnswer": "OS: resource allocation + control. Kernel: core of the OS. Protection: mode bit + timer."
  },
  "2": {
    "goal": "User mode’daki bir program kernel’dan nasıl yardım ister?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Koruma var; peki dosyayı kim okuyacak?",
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
        "html": "<p>Birinci bölümde uygulamanın her donanım işlemini doğrudan yapamayacağını gördük. Fakat bir dosyayı okumak için bu korumayı tamamen kaldırmamız gerekmiyor.</p><p>Program, OS’den kontrollü bir hizmet isteyebilir. Bu bölüm boyunca <code>read()</code> çağrısını takip edeceğiz: istek uygulamadan çıkacak, kernel işi yapacak, sonuç uygulamaya dönecek.</p><p>Önce istenen hizmeti tanıyalım. Sonra sınırın nasıl geçildiğine ve kernel’ın içeride nasıl düzenlenebileceğine bakalım.</p>",
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
        "t": "OS service: kullanıcının veya sistemin ihtiyaç duyduğu iş",
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
        "html": "<p>Program çalıştırmak, dosya okumak ve başka process ile iletişim kurmak birer <b>OS service</b> örneğidir. Arayüz de bu hizmetlerden biridir.</p><p>Ders; arayüz, program execution, I/O, dosya yönetimi ve communication’ı kullanıcıya yönelik hizmetler olarak gruplar. Resource allocation, accounting, protection ve security sistemin işleyişini destekler.</p><p><b>Shell</b> ile kernel aynı şey değildir. Shell, bu hizmetleri kullanan ve değiştirilebilen bir user program’dır. Kernel korunan işlemleri sağlar.</p><div class=\"callout warn\"><b>Kaynaklar error detection konusunda farklı gruplama kullanıyor.</b> Slide 6 bunu system service sayar. Midterm guide exercise 2.2 ve study guide ise user services içinde verir. Sınavda kullandığın gruplamayı belirt.</div>",
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
        "t": "read() çağrısını adım adım izleyelim",
        "key": "A <b>system call</b> is how a program asks the kernel to do something it may not do itself. Programs usually call it through an <b>API</b> (like <code>printf</code> → <code>write</code>).",
        "fig": {
          "type": "anim",
          "name": "syscall",
          "t": "The journey of one system call",
          "cap": "Parameters travel in <b>registers</b>, in a <b>block in memory</b> (address in a register), or on the <b>stack</b>."
        },
        "html": "<p>Program <code>read(fd, buf, n)</code> çağırırken <b>user mode</b>’dadır. Kütüphanenin sunduğu <b>API</b> üzerinden isteğini belirtir.</p><ol><li>Kütüphane system-call numarasını ve parametreleri hazırlar.</li><li>Trap instruction kernel’a geçiş yapar: bit 1 → 0.</li><li><b>System-call interface</b>, numarayla ilgili handler’ı bulur.</li><li>Kernel işi yapıp dönüş değerini hazırlar.</li><li>Program user mode’a döner: bit 0 → 1.</li></ol><p>İki mod değişimi var: giriş ve dönüş. Parametreler register’larla, adresi verilen bir memory block ile veya stack üzerinden aktarılabilir.</p><p>API çağrıyı yazdığın arayüzdür; <b>system call</b> kernel’a kontrollü giriş mekanizmasıdır.</p>",
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
        "t": "System call türünü, istediği işe göre ayır",
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
        "html": "<p>Bir dosya kopyalama programı düşün. Dosya açmak, okumak ve yazmak <b>file management</b>; programı bitirmek <b>process control</b> işidir.</p><table class=\"t\"><tr><th>Tür</th><th>Örnek iş</th></tr><tr><td><b>Process control</b></td><td>fork, exec, exit, wait</td></tr><tr><td><b>File management</b></td><td>open, read, write, close</td></tr><tr><td><b>Device management</b></td><td>Cihazı kontrol etme</td></tr><tr><td><b>Information maintenance</b></td><td>Zaman veya process bilgisi alma</td></tr><tr><td><b>Communication</b></td><td>Pipe veya shared memory</td></tr><tr><td><b>Protection</b></td><td>Erişim iznini değiştirme</td></tr></table><p>Fonksiyon adını ezberlemeden önce “hangi iş isteniyor?” diye sor.</p><div class=\"callout warn\">ls, ps ve gcc gibi <b>system program</b>’lar system call kullanan user program’lardır.</div>",
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
        "t": "Mechanism ve policy farkı",
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
        "html": "<p>Timer’ın çalışan programı kesebilmesi bir <b>mechanism</b>’dir: kontrolü geri almak için elimizdeki teknik araç.</p><p>Programın kaç milisaniye çalışacağına karar vermek ise <b>policy</b>’dir: aracı hangi kuralla kullanacağımız.</p><p>İkisini ayırmanın nedeni esnekliktir. Süre politikasını değiştirdiğinde timer mekanizmasını baştan yazman gerekmez.</p><p>Sınavda örneğe bak: “bunu yapabilme yolu” anlatılıyorsa mechanism; “hangi seçimin yapılacağı” anlatılıyorsa policy.</p>",
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
        "t": "Kernel’ın içi nasıl düzenlenebilir?",
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
        "html": "<p>Aynı hizmetler farklı yapılarda sunulabilir. Fark, sorumlulukların nerede durduğudur.</p><table class=\"t\"><tr><th>Yapı</th><th>Temel fikir</th></tr><tr><td><b>Simple</b></td><td>Az ayrım; MS-DOS</td></tr><tr><td><b>Monolithic</b></td><td>Birçok hizmet aynı kernel içinde; original UNIX</td></tr><tr><td><b>Layered</b></td><td>Katmanlara ayrılmış sorumluluklar</td></tr><tr><td><b>Microkernel</b></td><td>Küçük kernel; user process’lerde hizmetler; message passing</td></tr><tr><td><b>Modular</b></td><td>Çekirdek ve yüklenebilir modüller; Linux</td></tr><tr><td><b>Hybrid</b></td><td>Yaklaşımların birleşimi</td></tr></table><p>Microkernel’da hizmetleri ayırmak izolasyonu iyileştirir, ama aralarındaki mesajlaşma maliyetlidir. İsteğin yolunu öğrendik; şimdi bu isteği yapan process’in yaşamını izleyeceğiz.</p><div class=\"callout warn\">Hizmetleri user process’lere taşımak izolasyonu artırır; message passing ek maliyet getirir.</div>",
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
    "question": "User mode’daki bir program kernel’dan nasıl yardım ister?",
    "reading": true,
    "summary": [
      "Service yapılan iştir; system call korunan kernel’a giriş yoludur.",
      "API programcının kullandığı arayüzdür; kernel’a girişle aynı şey değildir.",
      "Mechanism bir işin nasıl yapılabildiği, policy hangi kararın verildiğidir."
    ],
    "examAnswer": "System call: controlled kernel entry. API → system-call interface → kernel service → return to user mode."
  },
  "3": {
    "goal": "OS, bir programı durdurup sonra kaldığı yerden nasıl devam ettirir?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "I/O bekleyen program CPU’yu tutmalı mı?",
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
        "html": "<p>Program bir dosya okuma isteği yaptı ama I/O henüz bitmedi. CPU boş beklemek yerine başka bir <b>process</b> çalıştırabilir.</p><p>Bunun için OS üç şeyi bilmelidir: ilk process nerede durdu, yeniden ne zaman hazır olacak ve sıra geldiğinde nasıl devam edecek?</p><p>İkinci bölümde isteğin kernel’a girişini öğrendik. Burada isteği yapan process’in belleğini, durumlarını ve kayıtlı bağlamını takip edeceğiz. Ardından process’lerin nasıl child oluşturduğunu ve iletişim kurduğunu göreceğiz.</p>",
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
        "t": "Program dosyası ile process neden farklı?",
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
        "html": "<p>Diske kaydedilmiş kod henüz çalışmıyordur: bu bir <b>program</b>’dır. Çalıştırıldığında mevcut instruction’ı, register’ları ve belleği olan bir <b>process</b> ortaya çıkar.</p><table class=\"t\"><tr><th>Bellek bölümü</th><th>Ne tutar?</th></tr><tr><td><b>Text</b></td><td>Program kodu</td></tr><tr><td><b>Data</b></td><td>Global değişkenler</td></tr><tr><td><b>Heap</b></td><td>Dinamik ayrılan bellek</td></tr><tr><td><b>Stack</b></td><td>Fonksiyon çağrıları ve yerel değişkenler</td></tr></table><p>Program dosyası hangi instruction’ların var olduğunu söyler. Process’in durumu ise şu anda hangisinin yürütüldüğünü ve nerede kaldığını söyler.</p><div class=\"callout warn\">Aynı programdan birden fazla process oluşabilir. Program pasif dosya; process aktif yürütmedir.</div>",
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
        "t": "Ready ile waiting aynı bekleme değil",
        "key": "Every process is in one of <b>five states</b>. Learn the <b>arrows</b> between them: exams ask which transitions are possible.",
        "fig": {
          "type": "anim",
          "name": "states",
          "t": "One process through its life",
          "cap": "There is <b>no</b> arrow waiting → running: a waiting process must go back to the ready queue first."
        },
        "html": "<p><b>Ready</b> process çalışabilir durumdadır; yalnızca CPU sırasını bekler. <b>Waiting</b> process ise I/O gibi bir olay bitmeden devam edemez.</p><p>Beş durumu altı geçişle bağlayalım:</p><ul><li><b>New → Ready</b>: sisteme kabul.</li><li><b>Ready → Running</b>: CPU verilmesi.</li><li><b>Running → Ready</b>: CPU’nun geri alınması.</li><li><b>Running → Waiting</b>: olay bekleme.</li><li><b>Waiting → Ready</b>: olayın tamamlanması.</li><li><b>Running → Terminated</b>: bitiş.</li></ul><p>I/O bitince process doğrudan running olmaz. Ready olur; CPU’yu scheduler’dan alması gerekir.</p><div class=\"callout warn\"><b>Sınav tuzağı:</b> Waiting → Running doğrudan geçişi yoktur. I/O bitince <b>Ready</b> olunur; scheduler CPU verince Running’e geçilir.</div>",
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
        "t": "Context switch: eskiyi kaydet, yeniyi yükle",
        "key": "The OS keeps a <b>PCB</b> (process control block) for every process. A <b>context switch</b> saves the old process's state into its PCB and loads the new one's.",
        "fig": {
          "type": "anim",
          "name": "ctxswitch",
          "t": "Context switch from P0 to P1 and back",
          "cap": "While the OS is switching, <b>no</b> process does useful work, so a context switch is pure overhead."
        },
        "html": "<p>Bir process’in kaldığı yerden sürmesi için program counter ve register değerleri korunmalıdır. OS bunları <b>Process Control Block (PCB)</b> içinde tutar. PCB ayrıca kimlik, durum, scheduling ve bellek yönetimi bilgileri içerir.</p><p><b>Context switch</b> sırasında:</p><ol><li>Çıkan process’in context’i kaydedilir.</li><li>Giren process’in kayıtlı context’i yüklenir.</li><li>CPU onun kaldığı instruction’dan devam eder.</li></ol><p>Bu süre <b>overhead</b>’dir: CPU o sırada iki programdan birinin asıl işini yapmaz. Ready ve waiting queue’ları kimin çalışabileceğini ve kimin olay beklediğini takip eder.</p><div class=\"callout warn\"><b>Context switch</b> program işi açısından overhead’dir: CPU o sırada uygulamanın asıl işini yapmaz.</div>",
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
        "t": "fork, exec, wait ve exit: dört ayrı iş",
        "key": "<code>fork()</code> creates a child; <code>exec()</code> replaces the calling process’s program; <code>wait()</code> collects a child’s exit status.",
        "fig": {
          "type": "anim",
          "name": "fork",
          "t": "fork → exec → wait → exit",
          "cap": "<b>Zombie</b> = finished child whose parent has not called wait() yet. <b>Orphan</b> = child whose parent ended without waiting."
        },
        "html": "<p>Bu çağrıları aynı şeymiş gibi düşünme:</p><table class=\"t\"><tr><th>Çağrı</th><th>Ne yapar?</th></tr><tr><td><b>fork()</b></td><td>Child process oluşturur. Child’da 0, parent’ta child PID; hatada −1 döner.</td></tr><tr><td><b>exec()</b></td><td>Çağıran process’in programını değiştirir.</td></tr><tr><td><b>exit()</b></td><td>Çalışmayı bitirir.</td></tr><tr><td><b>wait()</b></td><td>Child’ın çıkış durumunu toplar.</td></tr></table><p>Bitmiş ama durumu henüz toplanmamış child <b>zombie</b>; parent’ı önce biten child <b>orphan</b>’dır.</p><p>Her process art arda n başarılı fork çağrısını çalıştırırsa her çağrıda sayı ikiye katlanır: <b>2ⁿ</b>. Üç çağrı sonunda ilk process dahil 8 process vardır.</p>",
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
        "t": "Process’ler veriyi nasıl paylaşır?",
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
        "html": "<p><b>Shared memory</b> ile ortak bölgeye doğrudan erişirler. <b>Message passing</b> ile send/receive üzerinden veri değişirler.</p><p>Bounded buffer’da producer sıradaki boş yere (<code>in</code>) yazar; consumer sıradaki dolu yerden (<code>out</code>) okur. Modulo, index’i sona gelince başa sarar.</p><ul><li>Boş: <code>in == out</code>.</li><li>Dolu: <code>(in + 1) % N == out</code>.</li></ul><p>Bir slot boş bırakıldığı için kapasite <b>N − 1</b>’dir. Böylece dolu ile boş ayrılır.</p><p>Blocking send/receive bekler; iki blocking taraf <b>rendezvous</b> oluşturur. Pipe’ta fd[0] okur, fd[1] yazar. Ortak veriye erişimi koordine etme sorunu sonraki thread ve synchronization bölümlerine taşınır.</p><div class=\"callout warn\">Bu circular-buffer tasarımında kapasite <b>SIZE − 1</b>’dir. counter++ gibi ortak güncellemeler ayrıca synchronization gerektirebilir.</div>",
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
    "question": "OS, bir programı durdurup sonra kaldığı yerden nasıl devam ettirir?",
    "reading": true,
    "summary": [
      "Process, programın çalışan örneğidir; PCB devam etmek için gereken bilgileri tutar.",
      "Ready CPU bekler; waiting bir olay bekler.",
      "fork yeni child oluşturur; exec mevcut programı değiştirir."
    ],
    "examAnswer": "Process: program in execution. Context switch: save old context + restore new context. Ready ≠ waiting."
  },
  "4": {
    "goal": "Bir process’in içinde birden fazla iş nasıl ilerler?",
    "time": "30–40 min",
    "steps": [
      {
        "t": "Process kaynakları tutar; thread işi yürütür",
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
        "html": "<p>Bir process’in kodu, verisi ve açık dosyaları vardır. Bu kaynakları kullanan birden fazla yürütme yolu bulunabilir: bunların her biri <b>thread</b>’dir.</p><p>Yeni bir faaliyet için her seferinde ayrı process oluşturmak yerine aynı process içinde thread başlatabiliriz. Böylece kaynak paylaşımı kolaylaşır, uygulama daha responsive olabilir ve birden fazla core kullanılabilir.</p><p>Ama paylaşımın iki yüzü var. Ortak veriye erişmek kolaylaşır; aynı veriyi eşzamanlı değiştirmek de sorun yaratabilir. Önce neyin ortak, neyin özel olduğunu ayıralım.</p>",
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
        "t": "Thread’ler neleri paylaşır?",
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
        "html": "<p>İki thread farklı fonksiyonlarda ilerleyebilir. Bu yüzden her birinin kendi kaldığı yerini ve çağrı bilgisini tutması gerekir.</p><table class=\"t\"><tr><th>Process içindeki thread’ler paylaşır</th><th>Her thread’e özeldir</th></tr><tr><td>Code, global data, heap, open files</td><td>Program counter, registers, stack</td></tr></table><p><b>Stack</b> özeldir çünkü fonksiyon çağrıları farklı olabilir. <b>Global variables</b> ortaktır çünkü process’in data bölümündedir.</p><p>Bu ayrım sınavda sık karışır: thread ayrı yürütme durumuna sahiptir, fakat ayrı bir process gibi bütün kaynakları yalıtılmış değildir.</p><div class=\"callout warn\">Ayrı process’lerin ayrı bellek alanları vardır; aynı process’in thread’leri ortak belleği paylaşır.</div>",
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
        "t": "Concurrency ile parallelism farkı",
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
        "html": "<p>Tek core’da thread’ler sırayla çalışarak zaman içinde ilerleyebilir. Bu <b>concurrency</b>’dir. Birden fazla core’da aynı anda instruction yürütebilmeleri ise <b>parallelism</b>’dir.</p><p>İşi nasıl böldüğümüz de ayrı bir ayrımdır:</p><ul><li><b>Data parallelism</b>: aynı işlemi farklı veri parçalarına uygularız. Dizinin dört çeyreğini ayrı core’larda toplamak gibi.</li><li><b>Task parallelism</b>: farklı görevleri farklı thread’lere veririz.</li></ul><p>Önce “aynı anda mı, sırayla ilerleyerek mi?” diye sor. Sonra “veriyi mi, görevleri mi böldük?” diye sor. Bunlar iki farklı sorudur.</p><div class=\"callout warn\">Tek core’da sırayla ilerlemek <b>concurrency</b>’dir; aynı anda paralel yürütme göstermez.</div>",
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
        "t": "Amdahl’s Law: core eklemek neden sınırsız hızlandırmaz?",
        "key": "<b>Amdahl’s Law</b>: speedup = 1 / (S + (1 − S)/N) in the ideal model.",
        "fig": {
          "type": "anim",
          "name": "amdahl",
          "t": "Amdahl: speedup = 1 / (S + (1 − S)/N)",
          "cap": "Move the slider to change the serial part S and watch the limit 1/S move."
        },
        "html": "<p>İşin %25’i sırayla yapılmak zorunda olsun. Core sayısını artırmak bu kısmı bölemez; yalnızca kalan %75’i paylaşabiliriz.</p><ol><li>Seri oran: <b>S = 0.25</b>. Core sayısı: <b>N = 2</b>.</li><li>Yeni göreli süre: S + (1 − S)/N = 0.25 + 0.75/2 = <b>0.625</b>.</li><li>Speedup = eski süre / yeni süre = 1/0.625 = <b>1.6</b>.</li></ol><p>Genel formül: <b>Speedup = 1 / [S + (1 − S)/N]</b>.</p><p>N sonsuza gitse bile seri 0.25 kalır. Bu yüzden ideal üst sınır <b>1/S = 4</b>’tür. Sınavda yüzdeyi önce ondalık orana çevir.</p><div class=\"callout warn\">Formüldeki S, <b>serial fraction</b>’dır; parallel fraction değil. Core eklemek seri işi ortadan kaldırmaz. Fazla thread switching overhead de ekleyebilir.</div>",
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
        "t": "User thread ile kernel thread nasıl eşleşir?",
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
        "html": "<p>User-space library <b>user thread</b>’leri yönetir. OS’nin core’larda schedule ettiği birimler ise <b>kernel thread</b>’lerdir.</p><table class=\"t\"><tr><th>Model</th><th>Sonuç</th></tr><tr><td><b>Many-to-one</b></td><td>Bir kernel thread paylaşılır. Çok core’da paralellik yok; blocking call hepsini durdurabilir.</td></tr><tr><td><b>One-to-one</b></td><td>Her user thread’e bir kernel thread. Paralellik mümkün; kernel maliyeti artar.</td></tr><tr><td><b>Many-to-many</b></td><td>Birçok user thread, bir kernel thread kümesine eşlenir.</td></tr></table><p>Şekilde önce kernel thread sayısını say. Paralellik olanağını o katman belirler. Dersin karşılaştırmasında Linux ve Windows one-to-one kullanır.</p>",
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
        "t": "Thread kodunu izle: create → worker → join → sonuç",
        "key": "Pthreads is a <b>specification</b> (an API). You create a thread with <code>pthread_create</code>, and wait for it with <code>pthread_join</code>.",
        "fig": {
          "type": "flow",
          "down": true,
          "t": "Sonucu güvenle okumak için gereken sıra",
          "items": [
            [
              "",
              "pthread_create",
              "starts runner",
              "c0"
            ],
            [
              "",
              "runner",
              "sum becomes 15",
              "c1"
            ],
            [
              "",
              "pthread_exit",
              "worker ends",
              "c2"
            ],
            [
              "",
              "pthread_join returns",
              "main can use the result",
              "c0"
            ],
            [
              "",
              "printf",
              "prints 15",
              "c0"
            ]
          ],
          "cap": "Main, worker bitmeden join çağırıp bekleyebilir. Şekilde join’in <b>dönüşü</b>, worker’ın bitişinden sonra gösterilir."
        },
        "html": "<p>Worker, 1’den verilen sınıra kadar sayıları ortak <b>sum</b> değişkeninde topluyor. Aşağıda bütün Pthread çağrılarının başarılı olduğunu varsay.</p><pre>#include &lt;pthread.h&gt;\n#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n\nint sum = 0;\nvoid *runner(void *arg) {\n    int upper = atoi(arg);\n    for (int i = 1; i &lt;= upper; i++) {\n        sum += i;\n    }\n    pthread_exit(NULL);\n}\nint main(void) {\n    pthread_t tid;\n    char limit[] = &quot;5&quot;;\n    pthread_create(&amp;tid, NULL,\n                   runner, limit);\n    pthread_join(tid, NULL);\n    printf(&quot;%d\\n&quot;, sum);\n    return 0;\n}</pre><ol><li><b>pthread_create</b>, yeni worker’ı <code>runner</code> fonksiyonunda başlatır; <code>limit</code> onun girdisidir.</li><li>Worker “5” girdisini sayıya çevirir: sum = 1 + 2 + 3 + 4 + 5 = <b>15</b>.</li><li><b>pthread_exit</b> worker’ı bitirir. <b>pthread_join</b>, main’in worker tamamlanana kadar beklemesini sağlar.</li><li>Join döndükten sonra print, <b>15</b> yazar.</li></ol><p>Global sum thread’ler arasında ortaktır; her thread’in kendi stack, register ve program counter’ı vardır.</p><div class=\"callout warn\">Create, worker’ın bittiğini garanti etmez. Join’i kaldırıp sonucu erken okumak için sabit bir çıktı ezberleme: worker’ın tamamlanması garanti değildir.</div><p class=\"small\">Derleme: <code>cc -pthread example.c -o example</code>. Bu, dersin sum/runner örneğinden uyarlanmış bir çalışma programıdır.</p>",
        "check": {
          "q": "All calls succeed. After pthread_join(tid, NULL), what does the shown program print?",
          "o": [
            "15",
            "0",
            "5"
          ],
          "why": "The worker sums 1 through 5 into shared sum. Join waits for that worker to finish before main prints the result."
        }
      },
      {
        "t": "İki kez counter++ neden sonuçta yalnızca 1 ekleyebilir?",
        "key": "When two threads update the same variable <b>at the same time</b>, the result depends on timing. That is a <b>race condition</b>, and updates can get lost.",
        "fig": {
          "type": "anim",
          "name": "race",
          "t": "counter++ is really 3 steps: load, add, store",
          "cap": "The first run is the lesson's order. Press <b>Try another interleaving</b> to let the scheduler pick a different order."
        },
        "html": "<p><code>counter++</code> tek satırdır ama üç adımdır: oku, artır, yaz.</p><p>Başlangıçta counter = 0 olsun:</p><ol><li>A, 0 okur.</li><li>A yazmadan B de 0 okur.</li><li>A kendi değerini artırıp 1 yazar.</li><li>B eski 0 kopyasını artırıp 1 yazar.</li></ol><p>İki artış beklerken sonuç <b>1</b> olur. İkinci yazma ilk güncellemeyi ezer. Sonucun bu sıraya bağlı olmasına <b>race condition</b> denir.</p><p>Scheduling, thread’in bu adımlar arasında nasıl durabileceğini açıklar. Synchronization ise güncellemenin nasıl korunacağını çözer.</p><div class=\"callout warn\">Tek satırlık counter++, bu modelde üç adımdır: load, add, store. Tek satır olması atomic olduğu anlamına gelmez.</div>",
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
    "question": "Bir process’in içinde birden fazla iş nasıl ilerler?",
    "reading": true,
    "summary": [
      "Thread’ler ortak global data ve heap’i paylaşır; PC, registers ve stack her thread’e özeldir.",
      "Concurrency birlikte ilerleme, parallelism aynı anda çalışmadır.",
      "Seri kalan bölüm speedup’ı sınırlar; ortak güncellemeler race oluşturabilir."
    ],
    "examAnswer": "pthread_create: start worker. pthread_join: wait for worker completion. pthread_exit: end calling thread. Shared sum; private stack.",
    "opening": "Yeni çalışma ipucu: thread kodu sorulabileceğini duydun; bu henüz doğrulanmış bir duyuru değil. Pthreads örneğinde create, join, paylaşılan sum ve çıktıyı izlemeye öncelik ver."
  },
  "5": {
    "goal": "Hazır process’lerden hangisine CPU verilmeli?",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Scheduling bir seçim problemidir",
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
        "html": "<p><b>Ready queue</b> içindeki process’ler çalışmaya hazırdır. Fakat tek core aynı anda yalnızca birini yürütebilir. <b>CPU scheduler</b>, sıradaki process’i seçer.</p><p>Tek bir “en iyi” kural yoktur. Geliş sırası basittir; kısa işleri öne almak beklemeyi azaltabilir; sırayla kısa süreler vermek etkileşimli işlerin yanıtını iyileştirebilir.</p><p>Bu bölümde her hesapta aynı yolu izleyeceğiz: kuralı belirle, <b>Gantt chart</b> çiz, bitiş zamanlarını oku, sonra süreleri hesapla. Formüle başlamadan timeline’ın doğru olması gerekir.</p>",
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
        "t": "Scheduler ne zaman karar verir?",
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
        "html": "<p>Bir process CPU’da çalışır (<b>CPU burst</b>), I/O bekler (<b>I/O burst</b>), sonra yeniden çalışır. Scheduling şu durumlarda gündeme gelir:</p><ol><li>Running → Waiting.</li><li>Running → Ready.</li><li>Waiting → Ready.</li><li>Process’in bitmesi.</li></ol><p>1 ve 4’te process CPU’yu bırakmıştır. 2 ve 3’te OS çalışan process’ten CPU’yu alabilir: <b>preemption</b>. Nonpreemptive yaklaşım yalnızca 1 ve 4’te yeniden seçer.</p><p>Scheduler seçer; <b>dispatcher</b> context’i değiştirip seçileni başlatır. Bu devir süresi <b>dispatch latency</b>’dir.</p><div class=\"callout warn\">Preemption ortak veri güncellemesinin ortasında olabilir. Chapter 6 bu erişimi korur.</div>",
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
        "t": "Waiting, turnaround ve response time farkı",
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
        "html": "<p>Process zaman 2’de geliyor, 9 ms CPU işi istiyor ve 26’da bitiyor. Bu tek-burst sorusunda:</p><ol><li><b>Turnaround</b>: sistemde geçen tüm süre. 26 − 2 = <b>24</b>.</li><li><b>Waiting</b>: bu süreden CPU’da çalıştığını çıkar. 24 − 9 = <b>15</b>.</li><li>Ortalama istenirse her process’i ayrı hesapla; topla ve process sayısına böl.</li></ol><p><b>Response time</b> ilk yanıta kadar olan gecikmedir; toplam bitiş süresi değildir.</p><p>Beş ölçütü ayır: <b>CPU utilization</b> ve <b>throughput</b> yüksek; turnaround, waiting ve response time düşük olsun isteriz. Bir algoritma hepsinde aynı anda üstün olmak zorunda değildir.</p>",
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
        "t": "FCFS: önce gelen önce çalışır",
        "key": "<b>FCFS</b> is simple and nonpreemptive, but short jobs stuck behind a long one wait a long time: the <b>convoy effect</b>.",
        "fig": {
          "type": "anim",
          "name": "fcfs",
          "t": "FCFS: the same three jobs in two orders"
        },
        "html": "<p><b>First-come, first-served</b> çalışan process’i bitene veya bloklanana kadar bırakır. Kısa iş sırayı atlayamaz.</p><p>Ders örneğinde hepsi 0’da geliyor; sıra P1, P2, P3. Burst’ler 24, 3, 3:</p><ol><li>Timeline: P1 0–24; P2 24–27; P3 27–30.</li><li>Beklemeler: <b>0, 24, 27</b>.</li><li>Ortalama: (0 + 24 + 27)/3 = <b>17</b>.</li></ol><p>Kısa işler uzun işin arkasına takıldı: <b>convoy effect</b>. Aynı işler P2, P3, P1 sırasıyla gelse ortalama bekleme 3 olurdu. FCFS’de geliş sırasının etkisi büyüktür.</p>",
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
        "t": "SJF ve SRTF: kısa işi seçmek, gerekirse araya almak",
        "key": "<b>SJF</b> gives the <b>minimum average waiting time</b>, but it needs the length of the next CPU burst, which the OS cannot know. <b>SRTF</b> is its preemptive version.",
        "fig": {
          "type": "anim",
          "name": "sjf",
          "t": "SJF and SRTF on the slide examples"
        },
        "html": "<p><b>SJF</b>, hazır işler arasından sıradaki CPU burst’ü en kısa olanı seçer. Hepsi 0’da gelsin: P1 = 6, P2 = 8, P3 = 7, P4 = 3.</p><ol><li>Sıra: P4, P1, P3, P2.</li><li>Timeline: 0–3, 3–9, 9–16, 16–24.</li><li>Bu sıradaki beklemeler: 0, 3, 9, 16. Ortalama <b>7</b>.</li></ol><p><b>SRTF</b>, preemptive sürümdür. Yeni iş gelince onun süresini, çalışanın <em>kalan</em> süresiyle karşılaştırır. Daha kısaysa CPU’yu alabilir.</p><p>Sınavda verilen burst’leri biliyoruz. Gerçek OS ise gelecekteki burst’ü ancak tahmin edebilir. Uzun işler sürekli kısa işlere yenilip starvation yaşayabilir.</p><div class=\"callout warn\">SJF’nin waiting-time üstünlüğü, burst’lerin bilindiği teorik model içindir. Gerçekte gelecek burst’ler bilinmez; tahmin edilir.</div>",
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
        "t": "Round Robin: bir dilim çalış, bitmediysen sıraya dön",
        "key": "<b>RR</b> runs each process for at most one <b>quantum q</b>, then sends it to the back of the ready queue; q must be much larger than a <b>context switch</b>.",
        "fig": {
          "type": "anim",
          "name": "rr",
          "t": "Round Robin with q = 4"
        },
        "html": "<p><b>Round Robin (RR)</b> her process’e en fazla <b>quantum q</b> kadar süre verir. Bitmeyen process ready queue’nun sonuna döner.</p><p>P1 = 24, P2 = 3, P3 = 3; hepsi 0’da geliyor; q = 4:</p><ol><li>P1 0–4 çalışır; 20 kalır.</li><li>P2 7’de, P3 10’da biter.</li><li>P1 artık yalnızdır; 30’da biter.</li><li>Beklemeler: 30 − 24 = 6; 7 − 3 = 4; 10 − 3 = 7.</li></ol><p>Ortalama <b>17/3 = 5.67</b>. Slaytta 5.3 yazması aritmetik hatadır.</p><p>q çok büyükse RR, FCFS gibi davranır. Çok küçükse context switch maliyeti büyür.</p><div class=\"callout warn\"><b>Slaytlar queue sırası konusunda farklı.</b> Slide 55 demo’sunda A 0/8, B 2/4, C 4/2, D 6/6 ve q = 4 için D, zaman 10’da A’dan önce çalışır. Diğer slaytlarda ve burada kullanılan kurala göre A zaman 4’te queue’ya dönmüştür; D ise 6’da gelir. Bu kuralla A 10–14, D 14–20 çalışır. Çözümünde kullandığın queue kuralını belirt.</div>",
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
        "t": "Priority ve aging: düşük öncelik sonsuza dek beklemesin",
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
        "html": "<p><b>Priority scheduling</b>, en yüksek öncelikli hazır process’i seçer. Ders örneğinde küçük sayı yüksek önceliktir; sıra P2, P5, P1, P3, P4 olur.</p><p>Sürekli yüksek öncelikli iş gelirse düşük öncelikli iş hiç sıra bulamayabilir: <b>starvation</b>. <b>Aging</b>, bekledikçe önceliğini yükseltir. Eşit öncelikli işler RR ile paylaşabilir.</p><table class=\"t\"><tr><th>Yapı</th><th>Process queue değiştirebilir mi?</th></tr><tr><td><b>Multilevel queue</b></td><td>Hayır; atanmış queue’da kalır.</td></tr><tr><td><b>Multilevel feedback queue</b></td><td>Evet; davranış veya beklemeye göre taşınabilir.</td></tr></table><p>İki yapıyı ayıran ana sorulardan biri budur: queue’lar arasında hareket var mı?</p>",
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
        "t": "Deadline ve çok core yeni kısıtlar getirir",
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
        "html": "<p><b>Process-contention scope</b> içinde library, process’in user thread’leri arasından seçer. <b>System-contention scope</b> içinde kernel, kernel thread’ler arasından seçer.</p><p>Real-time’da amaç yalnızca hızlı ortalama değildir. <b>Hard real-time</b> deadline’ı zorunlu tutar; <b>soft real-time</b> hedefler.</p><p><b>Rate-monotonic</b> period’a göre sabit öncelik; <b>EDF</b> en yakın deadline’a göre değişen öncelik kullanır. Ders ideal task modelinde RM için yaklaşık %69 yeterli utilization sınırını, EDF için %100’e kadar kullanımını karşılaştırır. Bunlar her iş yükü için koşulsuz garanti değildir.</p><p>Çok core’da <b>load balancing</b> işi dağıtır; <b>processor affinity</b> thread’i aynı core’da tutmaya çalışır. Sırada, preemption’ın ortak veriyi bozmaması var.</p>",
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
    "question": "Hazır process’lerden hangisine CPU verilmeli?",
    "reading": true,
    "summary": [
      "Önce scheduling kuralıyla timeline çiz; sonra completion time’dan hesap yap.",
      "Turnaround = completion − arrival. Tek CPU burst sorularında waiting = turnaround − burst.",
      "FCFS sıra, SJF kısa burst, RR quantum, priority öncelik üzerinden karar verir."
    ],
    "examAnswer": "Turnaround = completion − arrival. Waiting = turnaround − burst. Aging prevents priority starvation."
  },
  "6": {
    "goal": "İki process aynı veriye dokunduğunda sonucu nasıl doğru tutarız?",
    "time": "35–45 min",
    "steps": [
      {
        "t": "Sorun hesapta değil, adımların birbirine girmesinde",
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
        "html": "<p>Thread örneğinde iki doğru artırma işlemi yanlış sonuç vermişti. Scheduling bölümünde de bir process’in instruction’lar arasında durabileceğini gördük.</p><p>Şimdi bunları birleştir: process eski bir değeri okuduktan sonra durur, başka process veriyi değiştirir, ilki eski kopyasıyla devam eder. Güncelleme kaybolabilir.</p><p><b>Synchronization</b>, bu erişimleri bir kurala bağlar. Önce hangi kodu koruyacağımızı belirleyeceğiz. Sonra software çözümünden atomic instruction’a, mutex’e, semaphore’a ve monitor’a geçeceğiz.</p>",
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
        "t": "count++ ile count-- birlikte neden 5 bırakmayabilir?",
        "key": "When the result depends on the order in which processes access shared data, the code has a <b>race condition</b>.",
        "fig": {
          "type": "anim",
          "name": "pcrace",
          "t": "Producer and consumer share count = 5"
        },
        "html": "<p>Producer bir ekliyor, consumer bir çıkarıyor. Başlangıç <b>count = 5</b> ise beklenen sonuç yine 5’tir.</p><ol><li>İkisi de ortak 5’i kendi register’ına okur.</li><li>Producer 6, consumer 4 hesaplar.</li><li>Consumer son yazarsa count = 4 olur.</li><li>Producer son yazarsa count = 6 olur.</li></ol><p>Birinin yazması diğerinin etkisini siler. İşlemler örtüşmeden yapılırsa sonuç 5’tir. Örtüşürse 4 veya 6 olabilir.</p><p>Animasyonda ortak count’u ve iki yerel register’ı ayrı takip et. <b>Race condition</b>’ın kaynağı aynı eski değerden başlayan iki güncellemedir.</p>",
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
        "t": "Critical section çözümü hangi üç sözü vermeli?",
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
        "html": "<p>Ortak veriye erişen hassas kod <b>critical section</b>’dır. Entry section giriş ister; exit section erişimi bırakır. Diğer kod remainder section’dır.</p><table class=\"t\"><tr><th>Koşul</th><th>Ne garanti eder?</th></tr><tr><td><b>Mutual exclusion</b></td><td>Aynı anda yalnızca bir katılımcı içeride.</td></tr><tr><td><b>Progress</b></td><td>İçerisi boşken girmek isteyenlerin seçimi sonsuza dek ertelenmez.</td></tr><tr><td><b>Bounded waiting</b></td><td>İstekten sonra başkaları sınırsız kez öne geçemez.</td></tr></table><p>İlki veriyi korur. Son ikisi bekleyenlerin ilerleme şansını korur. Process’lerin göreli hızları hakkında varsayım yapamayız.</p>",
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
        "t": "Peterson: “girmek istiyorum; ikimiz istersek önce sen”",
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
        "html": "<p>İki process için <code>flag[i] = true</code>, “girmek istiyorum” demektir. <code>turn = j</code> ise ikisi de isterse önceliği diğerine verir.</p><p>Pi şu koşulda bekler: <code>flag[j] &amp;&amp; turn == j</code>. Pj istemiyorsa Pi girer. İkisi de istiyorsa tek değer tutan turn beraber girişi önler.</p><p>Bu model, varsayılan bellek sıralamasında üç critical-section koşulunu sağlar. Fakat modern CPU ve compiler işlemleri yeniden sıralayabilir. <b>Memory barrier</b>, bu akıl yürütmenin ihtiyaç duyduğu sıralama ve görünürlüğü destekler. Kaynak kodun sırasını tek başına donanım garantisi sayma.</p>",
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
        "t": "Kilidi kontrol etmek ve almak tek atomic işlem olmalı",
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
        "html": "<p>Önce “kilit boş mu?” diye bakıp sonra almak yeterli değildir. Arada başka process de boş görebilir. <b>Atomic</b> instruction, kontrol ile değişikliği bölünmez yapar.</p><p><code>test_and_set(&amp;lock)</code> eski değeri döndürür ve true yazar. Eski değer false ise bu process kilidi almıştır. True ise beklemeye devam eder. Çıkarken false yazar.</p><p><code>compare_and_swap()</code>, değer beklenen değere eşitse yenisini yazar ve eskiyi döndürür.</p><p>Basit spin döngüsü beklerken CPU harcar. Exclusion sağlaması, her bekleyenin sınırlı sürede kazanacağını garanti etmez: <b>bounded waiting</b> ayrıca değerlendirilmelidir.</p>",
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
        "t": "Mutex bütün güncellemeyi çevrelemeli",
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
        "html": "<p><b>Mutex</b>, kritik bölgeden önce alınır ve sonra bırakılır:</p><pre>pthread_mutex_lock(&amp;mutex);\ncounter++;\npthread_mutex_unlock(&amp;mutex);</pre><p>Yalnızca son yazmayı kilitlemek yetmez; okuma da aynı koruma altında olmalı. Diğer thread’ler aynı veri için aynı protokole uymalıdır.</p><p>Mutex’in <b>owner</b>’ı vardır: alan thread bırakır. Unlock unutulursa bekleyenler takılır. İki lock’u ters sırada almak deadlock oluşturabilir.</p><p>Çok kısa bir kritik bölüm için multicore’da <b>spinlock</b>, uyutma/uyandırma maliyetinden ucuz olabilir. Uzun bekleyişte ise boşuna CPU tüketir. Süreyi, context-switch maliyetiyle karşılaştır.</p>",
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
        "t": "Semaphore yalnızca kilit değildir",
        "key": "A <b>semaphore</b> uses atomic <b>wait</b> and <b>signal</b> for resource counting, exclusion or ordering; it has no mutex-style owner.",
        "fig": {
          "type": "anim",
          "name": "semaphore",
          "t": "wait() and signal() with a waiting queue (slide 29)"
        },
        "html": "<p><b>Semaphore</b>, atomic <b>wait</b> ve <b>signal</b> ile kullanılan sayıdır. İki kullanımını ayıralım:</p><ul><li><b>Exclusion</b>: 1 ile başlat; girmeden wait, çıkarken signal.</li><li><b>Ordering</b>: synch = 0 olsun. P2, S2’den önce wait eder. P1, S1’i yapıp signal eder. Böylece S2, S1’den önce gerçekleşemez.</li></ul><p>Blocking sürümde wait önce azaltır; sonuç negatifse çağıranı bloklar. Signal artırır ve gerekirse bir bekleyeni uyandırır. Pozitif değer boş kaynakları; negatif değerin büyüklüğü bekleyenleri sayar.</p><p>Mutex’ten farklı olarak semaphore’un owner’ı yoktur: başka thread signal verebilir. Pthreads karşılıkları <code>sem_wait</code> ve <code>sem_post</code>’tur.</p><div class=\"callout warn\"><b>Slaytlarda iki semaphore sürümü var.</b> Slide 27, <code>while (S &lt;= 0) ; S--;</code> ile busy waiting kullanır; S negatif olmaz. Slide 29 önce azaltır, S &lt; 0 ise bloklar; negatif değer bekleyenleri sayar. Slide 27 binary semaphore için mutex ile aynı derken, slides 31 ve 45 <b>ownership</b> farkını ekler.</div>",
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
        "t": "Bir koşulu beklemek, kilidi elde tutmakla aynı değil",
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
        "html": "<p><b>Monitor</b> aynı anda bir aktif çağırana izin verir. <b>Condition variable</b>, bir koşulu beklerken monitor erişimini bırakıp uyumayı sağlar.</p><p>Pthreads’de mutex eldeyken <code>while (!ready) pthread_cond_wait(&amp;cond, &amp;mutex);</code> kullanılır. Dönüşte mutex yeniden alınır. Uyanmak koşulun kesin doğru olduğu anlamına gelmediği için tekrar kontrol edilir.</p><table class=\"t\"><tr><th>Problem</th><th>Fikir</th></tr><tr><td><b>Deadlock</b></td><td>Birbirini bekleyenler ilerleyemez.</td></tr><tr><td><b>Starvation</b></td><td>Bir katılımcı sürekli geride bırakılır.</td></tr><tr><td><b>Priority inversion</b></td><td>Yüksek öncelik, düşük öncelikli lock sahibini bekler.</td></tr></table><p><b>Priority inheritance</b> lock sahibinin önceliğini geçici yükseltir. Böylece dersin donanımdan başlayan paylaşım sorusu güvenli erişime bağlanır.</p>",
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
    "question": "İki process aynı veriye dokunduğunda sonucu nasıl doğru tutarız?",
    "reading": true,
    "summary": [
      "Race condition, sonucun erişimlerin sırasına bağlı olmasıdır.",
      "Critical-section çözümü mutual exclusion, progress ve bounded waiting sağlamalıdır.",
      "Mutex sahiplik ile exclusion; semaphore kaynak sayma ve sıralama sağlar."
    ],
    "examAnswer": "Critical section: mutual exclusion + progress + bounded waiting. Mutex: ownership. Semaphore: atomic wait/signal.",
    "opening": "Thread-code ipucu doğrulanmış değil. Chapter 4’te create/join akışını izledikten sonra burada counter++ işlemini mutex ile korumayı ve semaphore ile olay sıralamayı çalış."
  }
};
