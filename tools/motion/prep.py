"""Speech and timing for a motion video: python tools/motion/prep.py src/scripts/<id>.json

Each line of the script is spoken by edge-tts (it calls Microsoft's online TTS service) into public/audio/, and
src/timeline/<id>.json gets every scene's start and every line's start frame, so the scenes can move with the voice.
"""
import asyncio, hashlib, json, subprocess, sys
from pathlib import Path

import edge_tts

HERE = Path(__file__).resolve().parent
VOICE, RATE, FPS = 'en-US-AndrewNeural', '-4%', 30
LEAD, GAP, SCENE_GAP, TAIL = 0.6, 0.35, 0.9, 1.6  # seconds

script = json.loads((HERE / sys.argv[1]).read_text(encoding='utf-8'))
lines = [l for sc in script['scenes'] for l in sc['lines']]


def mp3(text):
    return HERE / 'public/audio' / f"{hashlib.sha1(f'{VOICE}|{RATE}|{text}'.encode()).hexdigest()[:16]}.mp3"


async def speak(text, sem):
    p = mp3(text)
    if p.exists():
        return
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(p))
                return
            except Exception:
                await asyncio.sleep(2 + 3 * attempt)
        raise RuntimeError('tts failed: ' + text)


async def main():
    sem = asyncio.Semaphore(5)
    await asyncio.gather(*(speak(t, sem) for t in set(lines)))

asyncio.run(main())


def seconds(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)],
                                capture_output=True, text=True, check=True).stdout)


t, scenes = LEAD, []
for sc in script['scenes']:
    start, cues = t, []
    for text in sc['lines']:
        d = seconds(mp3(text))
        cues.append({'from': round((t - start) * FPS), 'dur': round(d * FPS), 'audio': f'audio/{mp3(text).name}', 'text': text})
        t += d + GAP
    t += SCENE_GAP - GAP
    scenes.append({'id': sc['id'], 'from': round(start * FPS), 'dur': round((t - start) * FPS), 'cues': cues})
out = {'id': script['id'], 'title': script['title'], 'fps': FPS, 'dur': round((t + TAIL) * FPS), 'scenes': scenes}
(HERE / 'src/timeline' / f"{script['id']}.json").write_text(json.dumps(out, indent=1), encoding='utf-8')
print(f"{script['id']}: {len(lines)} lines, {out['dur'] / FPS:.1f} s")
