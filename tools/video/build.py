"""Build narrated study videos from <course>/video.js.

Every sentence of the narration becomes one still frame (tools/video/slide.html screenshotted by headless
Chrome, with the sentence as a caption) plus its speech (edge-tts neural voice). ffmpeg turns each pair into a
clip and joins the clips into one MP4 per video, plus one file with everything.

    python tools/video/build.py ens010 C:/Users/efeba/course_sites/materials/ENS010/video [video-id ...]

Needs: node, ffmpeg/ffprobe, Chrome, `pip install edge-tts` (it calls Microsoft's online TTS service).
Frames and speech are cached in <out>/_cache, so re-running after a text change only rebuilds what changed.
"""
import asyncio, hashlib, json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
CHROME = os.environ.get('CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
VOICE, RATE = 'en-US-AndrewNeural', '-6%'
BG = '0xf5f1e8'  # --bg of the light theme

course, out = sys.argv[1], Path(sys.argv[2])
only = set(sys.argv[3:])
cache = out / '_cache'
cache.mkdir(parents=True, exist_ok=True)

# read window.VIDEO / window.COURSE through node
js = f"global.window={{}};require({json.dumps(str(ROOT / course / 'data.js'))});require({json.dumps(str(ROOT / course / 'video.js'))});" \
     "console.log(JSON.stringify({V:window.VIDEO,code:window.COURSE.code}))"
data = json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True, encoding='utf-8').stdout)
VIDEOS, CODE = data['V'], data['code']


def sentences(t):
    return [s.strip() for s in re.findall(r'[^.!?]+[.!?]+(?:\s|$)', t)] or [t]


def h(*parts):
    return hashlib.sha1('|'.join(map(str, parts)).encode()).hexdigest()[:16]


slide_src = (ROOT / 'tools/video/slide.html').read_text(encoding='utf-8')
units = []  # (video id, query string, spoken text, pause after, fade-in)
for v in VIDEOS:
    if only and v['id'] not in only:
        continue
    units.append((v['id'], f"c={course}&v={v['id']}&title=1", v['title'].replace(' · ', '. ') + '.', 0.7, True))
    for si, sc in enumerate(v['scenes']):
        for bi, say in enumerate(sc['say']):
            ss = sentences(say)
            for ki, s in enumerate(ss):
                end_scene = bi == len(sc['say']) - 1 and ki == len(ss) - 1
                units.append((v['id'], f"c={course}&v={v['id']}&s={si}&b={bi}&k={ki}", s, 0.9 if end_scene else 0.3, bi == 0 and ki == 0))

# a frame depends on its query, the scene content, the template and the shared scripts
scripts = ''.join((ROOT / p).read_text(encoding='utf-8') for p in ['assets/js/figs.js', 'assets/js/anim.js', f'{course}/anims.js', 'assets/css/style.css'])
scene_of = {}
for v in VIDEOS:
    for si, sc in enumerate(v['scenes']):
        scene_of[(v['id'], si)] = json.dumps(sc, sort_keys=True)


def frame_path(u):
    vid, q = u[0], u[1]
    m = re.search(r'&s=(\d+)', q)
    content = scene_of.get((vid, int(m.group(1))), '') if m else json.dumps([x['title'] for x in VIDEOS if x['id'] == vid])
    return cache / f"f_{h(q, content, slide_src, scripts, 'reduced-motion')}.png"


def shoot(u):
    p = frame_path(u)
    if p.exists():
        return
    url = (ROOT / 'tools/video/slide.html').as_uri() + '?' + u[1]
    # reduced motion makes the animation player jump straight to each scene (headless Chrome does not run its tweens)
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--force-prefers-reduced-motion', '--allow-file-access-from-files', '--hide-scrollbars',
                    '--force-device-scale-factor=1', '--window-size=1280,720', '--virtual-time-budget=3000',
                    f'--screenshot={p}', url], capture_output=True)
    if not p.exists():
        raise RuntimeError('no frame for ' + u[1])


def speech_path(text):
    return cache / f"a_{h(VOICE, RATE, text)}.mp3"


async def speak_all(texts):
    sem = asyncio.Semaphore(5)

    async def one(t):
        p = speech_path(t)
        if p.exists():
            return
        async with sem:
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(t, VOICE, rate=RATE).save(str(p))
                    return
                except Exception:
                    await asyncio.sleep(2 + attempt * 3)
            raise RuntimeError('tts failed: ' + t)
    await asyncio.gather(*(one(t) for t in set(texts)))


def duration(p):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)],
                                capture_output=True, text=True, check=True).stdout)


def clip(u):
    img, aud = frame_path(u), speech_path(u[2])
    p = cache / f"c_{h(img.name, aud.name, u[3], u[4], 'yuv420p')}.mp4"
    if p.exists():
        return p
    d = duration(aud) + u[3]
    # yuv420p must come last (fade would switch back to 4:4:4, which Firefox-based browsers cannot play)
    vf = (f'fade=t=in:st=0:d=0.3:color={BG},' if u[4] else '') + 'format=yuv420p'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-framerate', '30', '-i', str(img), '-i', str(aud),
                    '-vf', vf, '-af', f'apad=pad_dur={u[3]}', '-t', f'{d:.3f}',
                    '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'stillimage', '-crf', '22', '-r', '30', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
                    '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-ac', '2', str(p)], check=True)
    return p


def concat(clips, dest):
    lst = dest.with_suffix('.txt')
    lst.write_text(''.join(f"file '{c.as_posix()}'\n" for c in clips), encoding='utf-8')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy',
                    '-movflags', '+faststart', str(dest)], check=True)
    lst.unlink()


print(f'{len(units)} sentences in {len({u[0] for u in units})} videos')
asyncio.run(speak_all([u[2] for u in units]))
print('speech ready')
with ThreadPoolExecutor(4) as ex:
    list(ex.map(shoot, units))
print('frames ready')
with ThreadPoolExecutor(4) as ex:
    clips = list(ex.map(clip, units))
by_video = {}
for u, c in zip(units, clips):
    by_video.setdefault(u[0], []).append(c)
for vid, cs in by_video.items():
    dest = out / f'{CODE}-{vid}.mp4'
    concat(cs, dest)
    print(f'{dest.name}  {duration(dest) / 60:.1f} min')
if not only:
    concat([c for cs in by_video.values() for c in cs], out / f'{CODE}-all.mp4')
    print(f'{CODE}-all.mp4  {duration(out / f"{CODE}-all.mp4") / 60:.1f} min')
