# Narration: scripts/<name>.json -> public/vo/<name>/<beat>.wav + src/timelines/<name>.json (frame timings).
# usage: .tts/venv/bin/python tts.py scripts/<name>.json
import json, sys, os, soundfile as sf
from kokoro_onnx import Kokoro
FPS = 30
src = sys.argv[1]
name = os.path.splitext(os.path.basename(src))[0]
s = json.load(open(src))
os.makedirs(f'public/vo/{name}', exist_ok=True)
k = Kokoro('.tts/kokoro.onnx', '.tts/voices.bin')
t, beats = s.get('lead', 0.6), {}
for b in s['beats']:
    path = f"public/vo/{name}/{b['id']}.wav"
    voice = b.get('voice', s.get('voice', 'af_heart')); speed = s.get('speed', 1.0)
    key = f"{voice}|{speed}|{b['text']}"
    if not (os.path.exists(path) and os.path.exists(path + '.txt') and open(path + '.txt').read() == key):
        a, sr = k.create(b['text'], voice=voice, speed=speed, lang='en-us')
        sf.write(path, a, sr); open(path + '.txt', 'w').write(key)
    d = sf.info(path).duration
    beats[b['id']] = {'start': round(t * FPS), 'dur': round(d * FPS), 'file': f"vo/{name}/{b['id']}.wav", 'text': b['text']}
    t += max(d, b.get('hold', 0)) + s.get('gap', 0.35) + b.get('pause', 0)
json.dump({'fps': FPS, 'total': round((t + s.get('tail', 0.5)) * FPS), 'beats': beats}, open(f'src/timelines/{name}.json', 'w'), indent=1)
print(f'{name}: {len(beats)} beats, {t:.1f}s')
