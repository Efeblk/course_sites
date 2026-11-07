# Course explainer videos

Narrated motion-graphics explainers for the course sites. Every scene is coded (React + SVG in
[Remotion](https://www.remotion.dev)) and rendered frame by frame, so labels, numbers and charts are exact.
Narration is a local neural voice ([Kokoro](https://github.com/thewh1teagle/kokoro-onnx), free, offline).

## Videos

| Composition | Topic | Script |
|---|---|---|
| `Threshold` | UNI480 · thresholds and alert fatigue | `scripts/thresholds.json` |
| `Matrix` | UNI480 · the confusion matrix | `scripts/matrix.json` |
| `Prevalence` | UNI480 · prevalence, PPV and the 99% accuracy trap | `scripts/prevalence.json` |
| `Action` | UNI480 · from prediction to action | `scripts/action.json` |
| `Trust` | UNI480 · augmented intelligence and trust | `scripts/trust.json` |

## Setup (once)

```sh
npm install
uv venv --python 3.12 .tts/venv && uv pip install --python .tts/venv/bin/python kokoro-onnx soundfile
curl -L -o .tts/kokoro.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx
curl -L -o .tts/voices.bin  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```

## Making a video

1. **Script** — `scripts/<name>.json`: a list of beats `{id, text}`. One beat = one narration clip.
   Optional per beat: `pause` (extra silence after, seconds), `hold` (minimum length, for a slow animation).
   Top level: `voice` (default `af_heart`), `speed`, `gap`.
2. **Voice** — `.tts/venv/bin/python tts.py scripts/<name>.json` writes `public/vo/<name>/*.wav` and
   `src/timelines/<name>.json` (start frame and length of every beat). Unchanged beats are cached.
3. **Scenes** — `src/<Name>.tsx`. Time every animation from the beats: `const { TL, B } = makeTL(timeline)`,
   then `p(f, B('beat').start, B('beat').start + 20)` gives an eased 0→1. Add `<Narration tl={TL} />` and
   `<Sfx at={…} name="ping" />` for sound. Register the composition in `src/Root.tsx`.
4. **Check frames** — `node stills.mjs 120,480,900 <CompositionId>` renders half-size stills to `stills/`.
5. **Render** — `./render.sh <CompositionId> out/<name>.mp4`.

Shared pieces: `src/lib.ts` (timing, easing, palette, normal distribution), `src/art.tsx` (bed, monitor,
staff figure with nurse/doctor looks, phone), `src/kit.tsx` (narration, sound effects). Icons come from
`lucide-react`.

Style rules that worked: tell a small story instead of listing facts; keep on-screen text to numbers and a few
labels (the voice carries the explanation); make the important number move; one idea per scene.
