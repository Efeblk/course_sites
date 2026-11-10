# Motion study videos (the recipe)

This is how the course study videos are made. The style follows the UNI480 explainer the owner liked
(`prototype-thresholds.mp4`, AI in Health Management), and `ens010-L3` was the first video made this way and approved.

**The style.** A narrated explainer, 1920x1080 at 30 fps, English like the course and the exam. There are **no slides
and no captions**. Each idea is a drawn scene, a metaphor or a little machine, and it moves *when the voice says it*:
- particles under magnifying lenses;
- a cube splitting while a surface counter climbs;
- a lattice heating until its surface atoms leave;
- a wrong answer chip flying to the wrong card, shaking, and going back.

On-screen text is short labels and tags only, never paragraphs.

The old pipeline in `tools/video/` (slides with captions recorded from HTML) is the rejected style. Do not use it for
new videos.

## Steps

```
cd tools/motion
npm install                                   # once (Remotion 4, React 18, TypeScript)
python -m pip install edge-tts pillow         # once; prep.py and render.py need them (plus ffmpeg/ffprobe on PATH)

# 1. narration: src/scripts/<course>-<id>.json   {id, title, scenes: [{id, lines: [...]}]}
# 2. speech + timing (edge-tts en-US-AndrewNeural, mp3 per line into public/audio, frames into src/timeline/<id>.json)
python prep.py src/scripts/ens010-L4.json
# 3. scenes: src/<course>/<id>.tsx exports {sceneId: Component}; register [timeline, scenes] in src/Root.tsx
npx tsc --noEmit -p .
# 4. check: half-size render + a contact sheet with one frame at the end of every spoken line (out/<id>-sheet.png)
python render.py ens010-L4 --check            # add --scene=<id> to render one scene only
# 5. final: 1080p, re-encoded to yuv420p H.264 plus a VP9/Opus WebM, named ENS010-L4.mp4/.webm
python render.py ens010-L4 --out C:/Users/efeba/course_sites/materials/ENS010/video
# 6. optional: one long video of a whole course, glued from the rendered ones (ENS010-all.mp4/.webm)
python render.py ens010-L2 ens010-L3 ens010-L4 ens010-L5 ens010-L6 ens010-L7 --join --out C:/Users/efeba/course_sites/materials/ENS010/video
```

`npx remotion studio src/index.ts` opens the live preview with a timeline scrubber.

The rendered videos go to `materials/<CODE>/video/`, the one part of `materials/` that is committed (our own renders,
not course material). `<course>/videos.html` plays them from there. The scripts, scenes and
timelines in this folder are committed. `public/audio/` and `out/` are not committed: `prep.py` recreates the audio
from the script.

## Writing the narration (`src/scripts/*.json`)

- **Keep it simple.** On 2026-11-08 the owner rejected the first COE025 videos as "too complex": too many facts per
  minute and calculations on screen. The remake (`coe025-W1..W6`) has 4 to 6 ideas per video, intuition first with one
  plain example, short sentences, and ends with a "For the exam" scene (`ExamList` in `src/coe025/simple.tsx`). The
  detailed maths stays in the summary page and the drill, not in the video.
- A script can slow its own speech: `"rate": "-10%"` (edge-tts) and `"gap": 0.75` (seconds between lines).
- Use one scene per idea, with 3 to 7 lines per scene. One line is one or two spoken sentences, and each line becomes
  one cue that the motion is timed to.
- Aim for 2 to 4 minutes per lecture. Cover what the lecturer flagged for the exam first, and say it the way the exam
  asks it. Name the traps out loud, for example "reactivity is chemical, not physical".
- Write numbers the way they should be spoken: "ninety-two percent", "five hundred eleven kilo electron volts".
- Take the content only from the slides and lecture notes (`materials/`, `<course>/data.js`, `<course>/video.js`).
  Adding facts from outside is not allowed.

## Writing the scenes (`src/<course>/*.tsx`)

- Every scene is an `<Stage>` (an SVG of 1920x1080) and reads `const {f, at, len} = useScene()`:
  - `at(i)` is the frame where line `i` starts;
  - `at(i, 0.5)` is halfway through that line;
  - `len(i)` is its length.
- **Tie every motion to a line.** For example, an element starts at `prog(f, at(2, 0.3), 20)`, or pops in with
  `pop(f, at(1))`. Something new should arrive with nearly every sentence, and nothing should sit still for long.
- **Show the mechanism, not the words.** Some patterns that worked:
  - zoom lenses for scale;
  - counters that count up;
  - a balance tipping;
  - a thermometer filling;
  - things splitting, shrinking, docking or bouncing off;
  - a wrong answer tried and rejected (shake and a cross), then put in the right place.
- The helpers are in `src/lib.tsx`:
  - motion: `prog`, `pop` (spring), `mix`, `mixColor`;
  - text and labels: `Rise` (text that rises in), `Tag` (pill label), `T` (static text), `StageHeading` (serif scene title);
  - drawn parts: `Draw` (a stroke that draws itself), `Arrow`, `Card`, `Mark` (tick or cross);
  - objects: `Atom`, `hexAtoms`/`hexXY`, `Thermometer`, `Body` (a human silhouette), `sup` (exponents).
- Text-heavy courses (NLP, COE025) also use `src/coe025/kit.tsx`: `Chip` (token or label chip), `rowX` (centre a row
  of chips), `Count` (a number that counts up), `Bar`, `Typed` (maths that types itself), `shake` and `win` (fade in/out).
- Use the palette `C` only, on the warm paper background. Accents are blue, orange, red, teal, green and purple. Use
  no emoji. Plain marks such as ✓, ✗, → and × are fine.
- Text should be at least 26 px, with no more than about 6 words per label. A scene may have a serif heading at the top.
- Scenes crossfade over 12 frames. When a scene switches to a second picture, start the second picture about 16
  frames after its line begins, so the two pictures do not overlap.
- Use `random('seed')` from remotion for any scatter, never `Math.random()`. Frames must render the same every time.

## Gotchas

- Scenes are bound in `Root.tsx` inside a wrapper component. Do not pass them as composition props: props are
  serialized, the components get lost, and React throws minified error #130.
- Remotion writes yuvj420p video, and Zen/Firefox will not play it. `render.py` re-encodes to yuv420p and also makes
  a WebM copy.
- On Windows, call `npx` through the shell (`shell=True`). Use `python -m pip`, because the plain `pip` belongs to
  msys Python.
- Rendering at full size takes roughly 0.6 s of wall time per second of video, with 12 workers on this PC.
- The fonts have no superscript minus or plus, so `10⁻⁹` renders as `10⁹`, which is wrong. Write exponents with
  `sup('10^-9 m')` instead. ² ³ and ₂ are fine.
- Always check the contact sheet, and fix any overlaps or clipped labels before the final render.
