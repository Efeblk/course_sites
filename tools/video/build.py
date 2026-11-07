"""Build narrated, motion-designed study videos from <course>/video.js.

Every sentence of the narration becomes one shot: tools/video/slide.html in headless Chrome (Playwright) under a fake
clock. The page shows the state just before the sentence, then plays the motion into it (title words rising, bullets
sliding in, figures building, anims.js scenes tweening, the caption changing), and every frame of that motion is
recorded at 30 fps. The last frame then holds while the sentence is spoken (edge-tts neural voice). ffmpeg joins the
shots into one MP4 per video plus one with everything, and makes WebM copies.

    python tools/video/build.py ens010 C:/Users/efeba/course_sites/materials/ENS010/video [video-id ...]

Needs: node, ffmpeg/ffprobe, Chrome, `pip install edge-tts playwright` (edge-tts calls Microsoft's online TTS service;
Playwright drives the installed Chrome, no browser download). Speech and finished shots are cached in <out>/_cache, so
re-running after a text change only rebuilds what changed.
"""
import asyncio, hashlib, json, re, shutil, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import edge_tts
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
VOICE, RATE = 'en-US-AndrewNeural', '-6%'
BG = '0xf5f1e8'  # --bg of the light theme
FPS, MAX_MOTION = 30, 4000  # motion is recorded until it settles, at most 4 s per shot

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


# one shot per sentence; min_ms = how long its motion runs at least (anims.js tweens are not visible to __seek)
units = []
for v in VIDEOS:
    if only and v['id'] not in only:
        continue
    units.append(dict(vid=v['id'], q=f"c={course}&v={v['id']}&title=1", text=v['title'].replace(' · ', '. ') + '.',
                      pause=0.7, end=True, min_ms=1900, scene=json.dumps(v['title'])))
    for si, sc in enumerate(v['scenes']):
        for bi, say in enumerate(sc['say']):
            ss = sentences(say)
            for ki, s in enumerate(ss):
                end = bi == len(sc['say']) - 1 and ki == len(ss) - 1
                min_ms = 650 if ki else 1300 if bi == 0 else 1900 if sc.get('anim') else 1000
                units.append(dict(vid=v['id'], q=f"c={course}&v={v['id']}&s={si}&b={bi}&k={ki}", text=s, pause=0.9 if end else 0.3,
                                  end=end, min_ms=min_ms, scene=json.dumps([v['title'], len(v['scenes']), sc], sort_keys=True)))

# a shot depends on its query, the scene, the template, the shared scripts and its speech
template = ''.join((ROOT / p).read_text(encoding='utf-8') for p in
                   ['tools/video/slide.html', 'assets/js/figs.js', 'assets/js/anim.js', f'{course}/anims.js', 'assets/css/style.css'])


def speech_path(text):
    return cache / f"a_{h(VOICE, RATE, text)}.mp3"


def shot_path(u):
    return cache / f"s_{h(u['q'], u['scene'], template, speech_path(u['text']).name, u['pause'], u['end'], FPS, 'motion-1')}.mp4"


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


async def record(browser, u, frames, limit_ms):
    """Record the shot's motion into frames/0000.png ... on a fake clock; returns the number of frames."""
    ctx = await browser.new_context(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    page = await ctx.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    await page.clock.install(time=0)
    await page.goto((ROOT / 'tools/video/slide.html').as_uri() + '?' + u['q'])
    await page.clock.pause_at(10000)  # lets the "before" state finish its own animations
    await page.evaluate('__settle()')
    await page.evaluate('__go()')
    n = 0
    while True:
        busy = await page.evaluate('__seek()')
        await page.screenshot(path=str(frames / f'{n:04d}.png'))
        n += 1
        t = n * 1000 / FPS
        if (t >= u['min_ms'] and not busy) or t >= limit_ms:
            break
        await page.clock.run_for(round(t) - round((n - 1) * 1000 / FPS))
    await ctx.close()
    if errors:
        raise RuntimeError(f"{u['q']}: {errors[0]}")
    return n


async def shoot_all(todo):
    rec, enc = asyncio.Semaphore(4), asyncio.Semaphore(4)
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(channel='chrome')

        async def one(u):
            p, aud = shot_path(u), speech_path(u['text'])
            d = duration(aud) + u['pause']
            frames = cache / ('m_' + p.stem)
            shutil.rmtree(frames, ignore_errors=True)
            frames.mkdir()
            async with rec:
                await record(browser, u, frames, min(MAX_MOTION, d * 1000))
            # hold the last frame for the rest of the sentence; fade out at the end of a scene; yuv420p for Firefox
            vf = f'tpad=stop_mode=clone:stop_duration={d:.3f}' + \
                 (f',fade=t=out:st={d - 0.35:.3f}:d=0.35:color={BG}' if u['end'] else '') + ',format=yuv420p'
            async with enc:
                await asyncio.to_thread(subprocess.run, [
                    'ffmpeg', '-y', '-v', 'error', '-framerate', str(FPS), '-i', str(frames / '%04d.png'), '-i', str(aud),
                    '-vf', vf, '-af', f"apad=pad_dur={u['pause']}", '-t', f'{d:.3f}',
                    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-r', str(FPS), '-pix_fmt', 'yuv420p', '-profile:v', 'high',
                    '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-ac', '2', str(p)], check=True)
            shutil.rmtree(frames)

        done = 0

        async def counted(u):
            nonlocal done
            await one(u)
            done += 1
            if done % 25 == 0 or done == len(todo):
                print(f'  {done}/{len(todo)} shots')
        await asyncio.gather(*(counted(u) for u in todo))
        await browser.close()


def concat(clips, dest):
    lst = dest.with_suffix('.txt')
    lst.write_text(''.join(f"file '{c.as_posix()}'\n" for c in clips), encoding='utf-8')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy',
                    '-movflags', '+faststart', str(dest)], check=True)
    lst.unlink()


def webm(mp4):
    # VP9/Opus copy: Firefox-based browsers play it without relying on the OS's H.264 decoder
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(mp4), '-c:v', 'libvpx-vp9', '-deadline', 'realtime', '-cpu-used', '8',
                    '-row-mt', '1', '-b:v', '0', '-crf', '36', '-c:a', 'libopus', '-b:a', '96k', str(mp4.with_suffix('.webm'))], check=True)


print(f'{len(units)} sentences in {len({u["vid"] for u in units})} videos')
asyncio.run(speak_all([u['text'] for u in units]))
print('speech ready')
todo = [u for u in units if not shot_path(u).exists()]
asyncio.run(shoot_all(todo))
print('shots ready')
by_video = {}
for u in units:
    by_video.setdefault(u['vid'], []).append(shot_path(u))
done = []
for vid, cs in by_video.items():
    dest = out / f'{CODE}-{vid}.mp4'
    concat(cs, dest)
    done.append(dest)
    print(f'{dest.name}  {duration(dest) / 60:.1f} min')
if not only:
    concat([c for cs in by_video.values() for c in cs], out / f'{CODE}-all.mp4')
    done.append(out / f'{CODE}-all.mp4')
    print(f'{CODE}-all.mp4  {duration(out / f"{CODE}-all.mp4") / 60:.1f} min')
with ThreadPoolExecutor(3) as ex:
    list(ex.map(webm, done))
print('webm copies ready')
