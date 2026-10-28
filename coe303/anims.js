/* COE303 animated diagrams (see assets/js/anim.js for the API). Used as  fig: { type: 'anim', name } in guide.js. */
(function () {
  const def = CS.anim.def;

  /* ---------- Ch1: what happens when an interrupt arrives ---------- */
  def('interrupt', { w: 680, h: 330 }, (A) => {
    A.text('mode', { tx: 16, ty: 20, text: 'user mode', c: 'c1', mono: true, size: 12, anchor: 'start' });
    A.line('irq', { x1: 445, y1: 110, x2: 247, y2: 110, dash: true, c: 'mute' });
    A.text('irqL', { tx: 346, ty: 96, text: 'interrupt line', c: 'mute', size: 11 });
    A.box('cpu', { tx: 150, ty: 110, w: 190, h: 70, text: 'CPU', sub: 'running your program', c: 'c0' });
    A.text('pc', { tx: 150, ty: 162, text: 'PC = 0x400', mono: true, size: 12 });
    A.box('dev', { tx: 540, ty: 110, w: 190, h: 70, text: 'Keyboard controller', sub: 'buffer: empty', c: 'c0', fs: 12.5 });
    A.dot('sig', { tx: 445, ty: 110, r: 7, c: 'c2', o: 0 });
    A.text('savedL', { tx: 105, ty: 222, text: 'saved state', c: 'mute', size: 11, mono: true });
    A.box('saved', { tx: 105, ty: 265, w: 160, h: 52, fill: 'ghost' });
    A.area('vec', { tx: 250, ty: 210, w: 190, h: 104, c: 'c5', label: 'interrupt vector' });
    A.box('v0', { tx: 345, ty: 243, w: 170, h: 20, fs: 11, fill: 'ghost', text: '0  divide error' });
    A.box('v1', { tx: 345, ty: 267, w: 170, h: 20, fs: 11, fill: 'ghost', text: '1  keyboard → ISR', c: 'c5' });
    A.box('v2', { tx: 345, ty: 291, w: 170, h: 20, fs: 11, fill: 'ghost', text: '2  disk' });
    A.box('isr', { tx: 560, ty: 262, w: 170, h: 52, fill: 'ghost', text: 'keyboard ISR', sub: 'kernel code', c: 'c4' });
    A.line('ptr', { x1: 245, y1: 140, x2: 262, y2: 262, head: true, c: 'c5', draw: 0, bend: -20 });
    A.box('st', { tx: 150, ty: 110, w: 132, h: 26, fs: 11, text: 'PC 0x404 + registers', c: 'c3', fill: 'solid', o: 0 });
    A.box('chr', { tx: 540, ty: 110, w: 34, h: 26, text: "'a'", c: 'c4', fill: 'solid', o: 0 });

    A.step('Your program runs on the CPU in <b>user mode</b>. The <b>program counter</b> (PC) holds the address of the next instruction.');
    A.step('You press <b>a</b>. The keyboard controller keeps it in its buffer and raises the <b>interrupt line</b>. The CPU did not have to keep asking (no polling).',
      { dev: { c: 'c2', sub: "buffer: 'a'" }, sig: { o: 1 }, irq: { c: 'c2' } }, { fx: ['dev'] });
    A.step('The signal reaches the CPU. The CPU never stops halfway: it <b>finishes the current instruction</b> first, so the PC moves on to 0x404.',
      { sig: { tx: 255 }, pc: { text: 'PC = 0x404' }, cpu: { sub: 'finishing the instruction' } });
    A.step('It <b>saves the state</b> of your program, the PC and the registers, so the program can continue later exactly where it was.',
      { sig: { o: 0 }, irq: { c: 'mute' }, st: { o: 1, tx: 105, ty: 265, via: [80, 180] }, saved: { fill: 'soft', c: 'c3' }, cpu: { sub: 'saving the state' } }, { dur: 900 });
    A.step('It looks up the handler for the keyboard in the <b>interrupt vector</b>, a table of handler addresses indexed by the interrupt number.',
      { ptr: { draw: 1 }, v1: { fill: 'soft' }, cpu: { sub: 'finding the handler' } }, { fx: ['v1'] });
    A.step('The <b>interrupt service routine</b> runs in <b>kernel mode</b>. It copies the <b>a</b> out of the controller\'s buffer.',
      { mode: { text: 'kernel mode', c: 'c4' }, isr: { fill: 'soft', sub: 'running' }, chr: { o: 1, tx: 560, ty: 310, via: [660, 200] }, dev: { c: 'c0', sub: 'buffer: empty' }, cpu: { c: 'c4', sub: 'running the ISR' }, ptr: { o: 0.3 } }, { fx: ['isr'], dur: 1000 });
    A.step('Done. The saved state is <b>restored</b>, the CPU goes back to user mode, and your program continues at 0x404 as if nothing had happened.',
      { st: { tx: 150, ty: 110, o: 0, via: [80, 180] }, saved: { fill: 'ghost' }, mode: { text: 'user mode', c: 'c1' }, isr: { fill: 'ghost', sub: 'kernel code' }, cpu: { c: 'c0', sub: 'running your program' }, ptr: { o: 0 }, v1: { fill: 'ghost' } }, { dur: 900, fx: ['cpu'] });
  });

  /* ---------- Ch2: the journey of one system call ---------- */
  def('syscall', { w: 680, h: 340 }, (A) => {
    A.area('ua', { tx: 8, ty: 8, w: 664, h: 140, c: 'c1', label: 'user space' });
    A.area('ka', { tx: 8, ty: 192, w: 664, h: 140, c: 'c4', label: 'kernel space' });
    A.box('mb', { tx: 598, ty: 170, w: 130, h: 30, fs: 12, text: 'mode bit = 1', c: 'c1', fill: 'solid' });
    A.box('prog', { tx: 120, ty: 72, w: 180, h: 54, text: 'your program', sub: 'n = read(fd, buf, 100)', c: 'c1' });
    A.box('libc', { tx: 360, ty: 72, w: 180, h: 54, text: 'C library (libc)', sub: 'the read() wrapper', c: 'c0' });
    A.box('reg', { tx: 360, ty: 124, w: 250, h: 22, fs: 11, text: 'registers: rax = 0 (read), fd, buf, 100', c: 'c0', fill: 'solid', o: 0 });
    A.box('trap', { tx: 360, ty: 170, w: 90, h: 28, fs: 12, text: 'trap', c: 'c4', fill: 'ghost' });
    A.area('tbl', { tx: 190, ty: 214, w: 210, h: 106, c: 'c5', label: 'system-call table' });
    A.box('r0', { tx: 295, ty: 248, w: 190, h: 20, fs: 11, fill: 'ghost', text: '0  read', c: 'c5' });
    A.box('r1', { tx: 295, ty: 272, w: 190, h: 20, fs: 11, fill: 'ghost', text: '1  write' });
    A.box('r2', { tx: 295, ty: 296, w: 190, h: 20, fs: 11, fill: 'ghost', text: '2  open' });
    A.box('kfn', { tx: 548, ty: 268, w: 180, h: 54, text: 'sys_read()', sub: 'kernel code', c: 'c4', fill: 'ghost' });
    A.dot('tok', { tx: 210, ty: 45, r: 8, c: 'c2', o: 0 });

    A.step('Your program calls <b>read()</b> to get 100 bytes from a file. So far it is an ordinary function call, in <b>user mode</b> (mode bit = 1).', { tok: { o: 1 } });
    A.step('The C library puts the <b>system-call number</b> (read is 0 on Linux x86-64) and the parameters into <b>registers</b>.',
      { tok: { tx: 450, ty: 45 }, reg: { o: 1 } }, { fx: ['libc'] });
    A.step('It executes the <b>trap</b> instruction. The CPU switches to kernel mode: the mode bit flips <b>1 → 0</b>. That is the first flip.',
      { tok: { tx: 405, ty: 158 }, trap: { fill: 'soft' }, mb: { text: 'mode bit = 0', c: 'c4' } }, { fx: ['mb'] });
    A.step('The system-call interface uses the number in rax (0) to find <b>read</b> in the <b>system-call table</b>.',
      { tok: { tx: 380, ty: 248 }, r0: { fill: 'soft' }, trap: { fill: 'ghost' } }, { fx: ['r0'] });
    A.step('The kernel runs <b>sys_read()</b>. It copies the data into buf and puts the return value, the number of bytes read, into a register.',
      { tok: { tx: 628, ty: 242 }, kfn: { fill: 'soft', sub: 'reading the file' }, reg: { text: 'register: rax = 100 (bytes read)' } }, { fx: ['kfn'] });
    A.step('Return: the mode bit flips <b>0 → 1</b> (the second flip) and read() gives 100 back to your program. Two flips per system call.',
      { tok: { tx: 210, ty: 45, via: [470, 120] }, mb: { text: 'mode bit = 1', c: 'c1' }, kfn: { fill: 'ghost', sub: 'kernel code' }, r0: { fill: 'ghost' }, prog: { sub: 'read() returned 100' } }, { fx: ['mb', 'prog'], dur: 1100 });
  });

  /* ---------- Ch3: one process through the five states ---------- */
  def('states', { w: 760, h: 300 }, (A) => {
    const N = { n: [70, 50, 'new', 'c5', 80], r: [210, 150, 'ready', 'c1', 84], u: [550, 150, 'running', 'c0', 96], w: [380, 265, 'waiting', 'c2', 92], t: [690, 50, 'terminated', 'c4', 112] };
    const E = { nr: [100, 67, 182, 133, 0, 'admitted', 120, 102], ru: [252, 140, 502, 140, 30, 'scheduler dispatch', 377, 112], ur: [502, 160, 252, 160, 30, 'interrupt', 377, 194],
      uw: [528, 167, 420, 248, 0, 'I/O or event wait', 532, 220], wr: [338, 250, 232, 167, 0, 'I/O or event completion', 228, 224], ut: [585, 133, 655, 67, 0, 'exit', 640, 108] };
    for (const [id, [x1, y1, x2, y2, bend, lab, lx, ly]] of Object.entries(E)) {
      A.line('e' + id, { x1, y1, x2, y2, bend, head: true, c: 'mute', sw: 1.5 });
      A.text('l' + id, { tx: lx, ty: ly, text: lab, size: 11, c: 'mute' });
    }
    A.line('bad', { x1: 440, y1: 262, x2: 580, y2: 172, dash: true, c: 'bad', sw: 2, o: 0 });
    A.text('badx', { tx: 528, ty: 232, text: '✗ no such arrow', c: 'bad', size: 12, weight: 700, o: 0, anchor: 'start' });
    for (const [id, [x, y, lab, c, w]] of Object.entries(N)) A.box(id, { tx: x, ty: y, w, h: 34, text: lab, c });
    A.box('tok', { tx: 70, ty: 18, w: 58, h: 20, fs: 11, text: 'a.out', c: 'c3', fill: 'solid', o: 0 });
    const at = (k) => ({ tx: N[k][0], ty: N[k][1] - 32 });
    const hi = (e) => Object.fromEntries(Object.keys(E).map((k) => ['e' + k, { c: k === e ? N[e[1]][3] : 'mute', sw: k === e ? 3 : 1.5 }]));
    const on = (k) => Object.fromEntries(Object.keys(N).map((n) => [n, { fill: n === k ? 'solid' : 'soft' }]));

    A.step('You start <b>a.out</b>. The OS creates its PCB. The process is <b>New</b>.', { tok: { o: 1 }, ...on('n') });
    A.step('<b>Admitted</b>: it joins the ready queue. <b>Ready</b> means it has everything it needs except a CPU.', { tok: at('r'), ...on('r'), ...hi('nr') });
    A.step('<b>Scheduler dispatch</b>: the scheduler gives it a CPU core. Now it is <b>Running</b>.', { tok: { ...at('u'), via: [380, 70] }, ...on('u'), ...hi('ru') });
    A.step('Its time slice runs out. The <b>timer interrupt</b> sends it back to <b>Ready</b>, not to Waiting, because it could still run.', { tok: { ...at('r'), via: [380, 200] }, ...on('r'), ...hi('ur') }, { dur: 900 });
    A.step('The scheduler dispatches it again: Ready → Running.', { tok: { ...at('u'), via: [380, 70] }, ...on('u'), ...hi('ru') });
    A.step('It calls <b>read()</b> on a file. It cannot go on until the disk delivers the data: Running → <b>Waiting</b>.', { tok: at('w'), ...on('w'), ...hi('uw') });
    A.step('The disk finishes and raises an interrupt. The process goes back to <b>Ready</b>. There is <b>no arrow from Waiting to Running</b>: it must queue for the CPU again.',
      { tok: at('r'), ...on('r'), ...hi('wr'), bad: { o: 1 }, badx: { o: 1 } }, { fx: ['bad'] });
    A.step('Dispatched once more, it runs until its work is done.', { tok: { ...at('u'), via: [380, 70] }, ...on('u'), ...hi('ru'), bad: { o: 0 }, badx: { o: 0 } });
    A.step('It calls <b>exit()</b>: Running → <b>Terminated</b>. The OS frees its resources. Six transitions in total, and you have now seen all of them.', { tok: at('t'), ...on('t'), ...hi('ut') });
  });

  /* ---------- Ch3: context switch P0 → P1 → P0 ---------- */
  def('ctxswitch', { w: 700, h: 330 }, (A) => {
    const lane = { P0: 58, OS: 106, P1: 154 };
    for (const [k, y] of Object.entries(lane)) {
      A.text('lab' + k, { tx: 24, ty: y, text: k, mono: true, size: 13, weight: 700 });
      A.line('ln' + k, { x1: 80, y1: y, x2: 690, y2: y, c: 'mute', sw: 0.6, dash: '2 4' });
    }
    A.line('axis', { x1: 80, y1: 186, x2: 690, y2: 186, c: 'mute', head: true });
    A.text('time', { tx: 690, ty: 200, text: 'time', size: 11, c: 'mute', anchor: 'end' });
    const bar = (id, x, k, c, label) => A.area(id, { tx: x, ty: lane[k] - 13, w: 0, h: 26, c, solid: true, label });
    bar('p0a', 80, 'P0', 'c1', 'P0 runs');
    bar('sv0', 200, 'OS', 'c4', 'save P0');
    bar('ld1', 275, 'OS', 'c4', 'load P1');
    bar('p1', 350, 'P1', 'c0', 'P1 runs');
    bar('sv1', 470, 'OS', 'c4', 'save P1');
    bar('ld0', 530, 'OS', 'c4', 'load P0');
    bar('p0b', 590, 'P0', 'c1', 'P0 again');
    A.area('over', { tx: 196, ty: 34, w: 158, h: 140, c: 'c4', label: '', o: 0 });
    A.text('overL', { tx: 275, ty: 40, text: 'overhead', size: 11, c: 'c4', weight: 700, o: 0 });
    A.box('pcb0', { tx: 130, ty: 272, w: 160, h: 58, text: 'PCB0', sub: ' ', c: 'c1' });
    A.box('cpu', { tx: 350, ty: 272, w: 170, h: 58, text: 'CPU (PC, registers)', sub: ' ', c: 'c0', fs: 12 });
    A.box('pcb1', { tx: 570, ty: 272, w: 160, h: 58, text: 'PCB1', sub: ' ', c: 'c0' });
    A.box('s0', { tx: 350, ty: 284, w: 96, h: 20, fs: 11, text: 'P0\'s state', c: 'c1', fill: 'solid' });
    A.box('s1', { tx: 570, ty: 284, w: 96, h: 20, fs: 11, text: 'P1\'s state', c: 'c0', fill: 'solid' });

    A.step('<b>P0</b> is running. Its program counter and registers are inside the CPU right now. P1\'s state was saved in PCB1 earlier.', { p0a: { w: 120 } }, { dur: 1200 });
    A.step('An interrupt or a system call arrives, and the OS takes over. First it <b>saves P0\'s state into PCB0</b>.', { sv0: { w: 75 }, s0: { tx: 130, via: [240, 225] } }, { dur: 1000, fx: ['pcb0'] });
    A.step('Then it <b>loads P1\'s state from PCB1</b> into the CPU.', { ld1: { w: 75 }, s1: { tx: 350, via: [460, 225] } }, { dur: 1000, fx: ['cpu'] });
    A.step('<b>P1</b> runs. Look at the orange part: while the OS was switching, <b>neither process did useful work</b>. A context switch is pure overhead.', { p1: { w: 120 }, over: { o: 1 }, overL: { o: 1 } }, { dur: 1200 });
    A.step('Later the switch goes the other way. The OS saves P1\'s state into PCB1…', { sv1: { w: 60 }, s1: { tx: 570, via: [460, 225] }, over: { o: 0 }, overL: { o: 0 } }, { dur: 1000, fx: ['pcb1'] });
    A.step('…and loads P0\'s state from PCB0.', { ld0: { w: 60 }, s0: { tx: 350, via: [240, 225] } }, { dur: 1000, fx: ['cpu'] });
    A.step('<b>P0 continues exactly where it stopped</b>, because its PC and registers were saved. It never notices it was paused.', { p0b: { w: 100 } }, { dur: 1100 });
  });

  /* ---------- Ch3: fork, exec, wait, exit ---------- */
  def('fork', { w: 680, h: 320 }, (A) => {
    A.box('par', { tx: 170, ty: 80, w: 240, h: 60, text: 'parent · PID 100', sub: 'pid = fork();', c: 'c0' });
    A.box('chi', { tx: 170, ty: 80, w: 240, h: 60, text: 'child · PID 101', sub: 'pid = fork();', c: 'c1', o: 0 });
    A.text('rp', { tx: 170, ty: 134, text: 'fork() returned 101', mono: true, size: 12, c: 'c0', o: 0 });
    A.text('rc', { tx: 510, ty: 134, text: 'fork() returned 0', mono: true, size: 12, c: 'c1', o: 0 });
    A.text('ap', { tx: 170, ty: 172, text: 'pid > 0 → wait(NULL)', mono: true, size: 12, o: 0 });
    A.text('ac', { tx: 510, ty: 172, text: 'pid == 0 → exec("/bin/ls")', mono: true, size: 12, o: 0 });
    A.box('outC', { tx: 510, ty: 232, w: 230, h: 34, fs: 12, text: 'notes.txt  main.c  a.out', c: 'c2', fill: 'ghost', o: 0 });
    A.box('outP', { tx: 170, ty: 232, w: 230, h: 34, fs: 12, text: 'Child done', c: 'c0', fill: 'ghost', o: 0 });
    A.box('stat', { tx: 510, ty: 80, w: 92, h: 22, fs: 11, text: 'exit status 0', c: 'c4', fill: 'solid', o: 0 });
    A.text('zz', { tx: 340, ty: 290, text: '', size: 12, c: 'mute' });

    A.step('The <b>parent</b> (PID 100) runs <code>pid = fork();</code>');
    A.step('<b>fork()</b> creates a <b>child</b>: a copy of the parent (same code, same data, same position in the program) with its own PID, 101.',
      { chi: { o: 1, tx: 510, via: [340, 0] } }, { dur: 1100 });
    A.step('fork() <b>returns twice</b>: in the parent it returns the child\'s PID (101), in the child it returns <b>0</b>. That is how each one knows which it is.',
      { rp: { o: 1 }, rc: { o: 1 } }, { fx: ['par', 'chi'] });
    A.step('The child sees <code>pid == 0</code> and calls <b>exec()</b>: its memory is replaced by the <b>ls</b> program. Same PID, new program.',
      { ac: { o: 1 }, chi: { text: 'ls · PID 101', sub: 'a brand-new program image', c: 'c2' } }, { fx: ['chi'] });
    A.step('The parent sees <code>pid &gt; 0</code> and calls <b>wait()</b>: it sleeps until the child has finished.',
      { ap: { o: 1 }, par: { fill: 'ghost', sub: 'waiting…' } });
    A.step('ls prints the file names and calls <b>exit()</b>. Until the parent collects its exit status, the finished child is a <b>zombie</b>: its PCB entry still exists.',
      { outC: { o: 1, fill: 'soft' }, chi: { fill: 'ghost', text: 'zombie · PID 101', sub: 'only the exit status is left' }, stat: { o: 1, ty: 118 } }, { fx: ['outC'] });
    A.step('<b>wait()</b> returns with the status, the zombie entry is removed, and the parent prints <b>Child done</b>.',
      { stat: { tx: 170, ty: 80, o: 0, via: [340, 40] }, chi: { o: 0.15 }, par: { fill: 'soft', sub: 'wait() returned' }, outP: { o: 1, fill: 'soft' } }, { dur: 1000, fx: ['par'] });
    A.step('If the parent had ended first without waiting, the child would be an <b>orphan</b>, and init/systemd (PID 1) would adopt it and collect its status.',
      { zz: { text: 'orphan = parent gone first · zombie = child gone, status not collected' } });
  });

  /* ---------- Ch4: a race condition on counter++ (random interleavings) ---------- */
  def('race', { w: 680, h: 330, reroll: 'Try another interleaving' }, (A, p) => {
    const X = { A: 110, B: 570 }, MEM = [340, 60];
    A.box('mem', { tx: MEM[0], ty: MEM[1], w: 170, h: 58, text: 'counter = 0', sub: 'shared memory', c: 'c5' });
    for (const T of ['A', 'B']) {
      A.box('t' + T, { tx: X[T], ty: 60, w: 160, h: 44, text: 'Thread ' + T, c: T === 'A' ? 'c0' : 'c2' });
      A.box('r' + T, { tx: X[T], ty: 128, w: 160, h: 34, fs: 12, text: 'register: –', c: T === 'A' ? 'c0' : 'c2', fill: 'ghost' });
      A.box('v' + T, { tx: MEM[0], ty: MEM[1], w: 34, h: 24, text: '0', c: T === 'A' ? 'c0' : 'c2', fill: 'solid', o: 0 });
    }
    A.text('ordL', { tx: 18, ty: 214, text: 'the order the CPU ran the six steps:', size: 11, c: 'mute', anchor: 'start' });
    // the interleaving: the lesson's lost-update order first, random ones after "Try another"
    let order = ['A', 'B', 'A', 'B', 'A', 'B'];
    if (p.seed !== 1) { order = ['A', 'A', 'A', 'B', 'B', 'B']; for (let i = 5; i > 0; i--) { const j = Math.floor(A.rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } }
    const OPS = ['load', 'add', 'store'];
    order.forEach((T, i) => A.box('c' + i, { tx: 70 + i * 108, ty: 252, w: 96, h: 30, fs: 12, text: '', c: T === 'A' ? 'c0' : 'c2', o: 0, s: 0.7 }));

    A.step('Two threads both run <code>counter++</code> on the same shared counter, which starts at 0. <code>counter++</code> is really three steps: <b>load</b>, <b>add 1</b>, <b>store</b>.');
    let mem = 0;
    const reg = { A: null, B: null }, pc = { A: 0, B: 0 };
    order.forEach((T, i) => {
      const op = OPS[pc[T]++], other = T === 'A' ? 'B' : 'A';
      const ch = { ['t' + T]: { fill: 'solid' }, ['t' + other]: { fill: 'soft' }, ['c' + i]: { o: 1, s: 1, text: `${T}: ${op}` } };
      let cap;
      if (op === 'load') {
        reg[T] = mem;
        Object.assign(ch, { ['v' + T]: { o: 1, tx: X[T], ty: 128, text: String(mem) }, ['r' + T]: { fill: 'soft', text: 'register: ' + mem } });
        cap = `<b>${T} loads</b> counter (${mem}) into its own register.` + (reg[other] != null && pc[other] < 3 ? ` ${other} already loaded but has not stored yet, so both now hold an old copy.` : '');
      } else if (op === 'add') {
        reg[T] += 1;
        Object.assign(ch, { ['v' + T]: { text: String(reg[T]) }, ['r' + T]: { text: 'register: ' + reg[T] } });
        cap = `<b>${T} adds 1</b> inside its register: ${reg[T] - 1} + 1 = ${reg[T]}. Memory still says ${mem}.`;
      } else {
        mem = reg[T];
        Object.assign(ch, { ['v' + T]: { tx: MEM[0] + (T === 'A' ? -48 : 48), ty: MEM[1] + 46 }, mem: { text: 'counter = ' + mem } });
        cap = `<b>${T} stores</b> its register (${reg[T]}) back into counter. Counter is now ${mem}.`;
      }
      A.step(cap, ch, { fx: op === 'store' ? ['mem'] : ['r' + T] });
    });
    const lost = mem !== 2;
    A.step(lost
      ? 'Final counter = <b>1</b>, but both threads added 1. One update was <b>lost</b>, because one thread loaded the old value before the other stored. This is a <b>race condition</b>.'
      : 'Final counter = <b>2</b>. Correct this time, because one thread stored before the other loaded. Same code, different timing, different result: that is why it is a <b>race</b>. Try another interleaving.',
    { mem: { c: lost ? 'bad' : 'ok', fill: 'solid', sub: lost ? 'should be 2!' : 'correct' }, tA: { fill: 'soft' }, tB: { fill: 'soft' } }, { fx: ['mem'] });
  });

  /* ---------- Ch4: Amdahl's law ---------- */
  def('amdahl', { w: 680, h: 310, slider: { key: 'S', label: 'serial part S', min: 5, max: 75, step: 5, value: 25, fmt: (v) => v + '%' } }, (A, p) => {
    const S = p.S / 100, X0 = 110, FULL = 420, rows = [1, 2, 4, 8, Infinity];
    A.text('h1', { tx: X0 + (S * FULL) / 2, ty: 14, text: `serial ${p.S}%`, size: 11, c: 'c4' });
    A.text('h2', { tx: X0 + S * FULL + ((1 - S) * FULL) / 2, ty: 14, text: `parallel ${100 - p.S}%`, size: 11, c: 'c0' });
    A.line('lim', { x1: X0 + S * FULL, y1: 24, x2: X0 + S * FULL, y2: 296, c: 'c4', dash: true, o: 0 });
    rows.forEach((N, i) => {
      const y = 30 + i * 54, lanes = Math.min(N, 8), gap = lanes > 1 ? 2 : 0, lh = (32 - gap * (lanes - 1)) / lanes;
      A.text('n' + i, { tx: 16, ty: y + 16, text: N === Infinity ? '∞ cores' : `${N} core${N > 1 ? 's' : ''}`, size: 12.5, weight: 600, anchor: 'start', o: 0 });
      A.area('s' + i, { tx: X0, ty: y, w: 0, h: 32, c: 'c4', solid: true });
      for (let l = 0; l < lanes; l++) A.area(`p${i}_${l}`, { tx: X0 + S * FULL, ty: y + l * (lh + gap), w: 0, h: lh, c: 'c0', solid: true, rx: 1.5 });
      A.text('x' + i, { tx: X0 + FULL + 16, ty: y + 16, num: 1, fmt: (v) => v.toFixed(2) + '×', mono: true, size: 14, weight: 700, anchor: 'start', o: 0 });
    });
    const sp = (N) => 1 / (S + (1 - S) / N);
    rows.forEach((N, i) => {
      const lanes = Math.min(N, 8), pw = N === Infinity ? 1.5 : ((1 - S) * FULL) / N;
      const ch = { ['n' + i]: { o: 1 }, ['s' + i]: { w: S * FULL }, ['x' + i]: { o: 1, num: N === Infinity ? 1 / S : sp(N) } };
      for (let l = 0; l < lanes; l++) ch[`p${i}_${l}`] = { w: pw };
      const f = (v) => v.toFixed(2);
      const cap = N === 1
        ? `On <b>1 core</b> the program does the serial part (orange, ${p.S}%) and then the parallel part (blue, ${100 - p.S}%). That is our time = 1, speedup 1×.`
        : N === Infinity
          ? `With <b>endless cores</b> the blue part shrinks to almost nothing, but the orange part never shrinks. The speedup can only approach <b>1/S = ${f(1 / S)}×</b>.`
          : `<b>${N} cores</b> split the parallel part ${N} ways; the serial part cannot be split. Speedup = 1 / (${f(S)} + ${f(1 - S)}/${N}) = <b>${f(sp(N))}×</b>.`;
      A.step(cap, ch, { dur: 1100 });
    });
    A.step(`The dashed line is the wall: however many cores you buy, the run can never be shorter than the serial ${p.S}%. Move the slider to see a smaller S raise the limit.`, { lim: { o: 1 } });
  });
})();
