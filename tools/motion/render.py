"""Render motion videos (run prep.py first).

    python tools/motion/render.py ens010-L4 --check [--scene=shrink]   half-size render + out/<id>-sheet.png
    python tools/motion/render.py ens010-L4 ens010-L6 --out C:/Users/efeba/course_sites/materials/ENS010/video
    python tools/motion/render.py ens010-L2 ens010-L3 ... --join --out <same dir>    -> ENS010-all.mp4/.webm

--check renders at half size (only one scene with --scene) and writes a contact sheet with one frame near the end of
every spoken line, so the layout can be checked line by line before the full render. Its frames are also saved as
out/<id>/NN.png. --out renders 1920x1080, re-encodes it to yuv420p H.264 (Remotion writes yuvj420p, which
Firefox-based browsers refuse) and adds a VP9/Opus WebM copy, named like ENS010-L4.mp4 / .webm.
"""
import json, subprocess, sys
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
args, opt, argv = [], {}, sys.argv[1:]
while argv:  # ids, --flag, --key=value or --key value
    a = argv.pop(0)
    if not a.startswith('--'):
        args.append(a)
    elif '=' in a:
        opt[a[2:a.index('=')]] = a[a.index('=') + 1:]
    elif a == '--out':
        opt['out'] = argv.pop(0)
    else:
        opt[a[2:]] = '1'


def run(cmd, **kw):
    subprocess.run(cmd, check=True, cwd=HERE, **kw)


def remotion(vid, dest, extra=''):
    run(f'npx remotion render src/index.ts {vid} "{dest}" --concurrency=12 --log=error {extra}', shell=True)


def out_name(vid):
    course, _, rest = vid.partition('-')
    return Path(opt['out']) / f'{course.upper()}-{rest}.mp4'


if 'join' in opt:  # --join --out DIR ids...: glue already rendered videos into <CODE>-all.mp4/.webm
    for ext in ('.mp4', '.webm'):
        lst = HERE / 'out' / 'join.txt'
        lst.write_text(''.join(f"file '{out_name(v).with_suffix(ext).as_posix()}'\n" for v in args), encoding='utf-8')
        dest = out_name(args[0]).with_name(f"{args[0].split('-')[0].upper()}-all{ext}")
        run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(dest)])
        print(dest)
    sys.exit()

for vid in args:
    tl = json.loads((HERE / 'src/timeline' / f'{vid}.json').read_text(encoding='utf-8'))
    (HERE / 'out').mkdir(exist_ok=True)
    if 'check' in opt:
        scenes = [s for s in tl['scenes'] if opt.get('scene', s['id']) == s['id']]
        lo, hi = scenes[0]['from'], scenes[-1]['from'] + scenes[-1]['dur'] - 1
        mp4 = HERE / 'out' / f'{vid}-check.mp4'
        remotion(vid, mp4, f'--scale=0.5 --frames={lo}-{hi}')
        picks = [(s['from'] + c['from'] + round(c['dur'] * 0.92) - lo, f"{s['id']} {i}") for s in scenes for i, c in enumerate(s['cues'])]
        frames = HERE / 'out' / vid
        frames.mkdir(exist_ok=True)
        for p in frames.glob('*.png'):
            p.unlink()
        sel = '+'.join(f'eq(n\\,{n})' for n, _ in picks)
        run(['ffmpeg', '-y', '-v', 'error', '-i', str(mp4), '-vf', f"select='{sel}'", '-fps_mode', 'vfr', str(frames / '%02d.png')])
        shots = sorted(frames.glob('*.png'))
        W, H, cols = 640, 360, 3
        sheet = Image.new('RGB', (W * cols, (H + 30) * ((len(shots) + cols - 1) // cols)), 'white')
        d = ImageDraw.Draw(sheet)
        for k, (p, (_, label)) in enumerate(zip(shots, picks)):
            x, y = (k % cols) * W, (k // cols) * (H + 30)
            sheet.paste(Image.open(p).resize((W, H)), (x, y + 30))
            d.text((x + 8, y + 8), f'{k + 1:02d}  {label}', fill='black')
        sheet.save(HERE / 'out' / f'{vid}-sheet.png')
        print(f'{vid}: {len(shots)} frames -> out/{vid}-sheet.png')
    else:
        dest = Path(opt['out'])
        raw = HERE / 'out' / f'{vid}.mp4'
        remotion(vid, raw)
        mp4 = out_name(vid)
        run(['ffmpeg', '-y', '-v', 'error', '-i', str(raw), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
             '-color_range', 'tv', '-profile:v', 'high', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', str(mp4)])
        run(['ffmpeg', '-y', '-v', 'error', '-i', str(mp4), '-c:v', 'libvpx-vp9', '-deadline', 'realtime', '-cpu-used', '8', '-row-mt', '1',
             '-b:v', '0', '-crf', '34', '-c:a', 'libopus', '-b:a', '96k', str(mp4.with_suffix('.webm'))])
        print(f'{mp4}  {tl["dur"] / tl["fps"]:.0f} s (+ .webm)')
