# python sheet.py <CompositionId>  → chk/<id>-sheet.png (3 columns of the half-size stills, labelled)
import sys, os
from PIL import Image, ImageDraw
d = f'chk/{sys.argv[1]}'
fs = sorted(x for x in os.listdir(d) if x.endswith('.png'))
ims = [Image.open(os.path.join(d, x)).convert('RGB').resize((640, 360)) for x in fs]
cols = 3; rows = (len(ims) + cols - 1) // cols
sh = Image.new('RGB', (cols * 644, rows * 384), 'white'); dr = ImageDraw.Draw(sh)
for i, (im, n) in enumerate(zip(ims, fs)):
    x, y = (i % cols) * 644, (i // cols) * 384
    sh.paste(im, (x, y)); dr.text((x + 6, y + 364), n, fill='black')
sh.save(f'chk/{sys.argv[1]}-sheet.png'); print(f'chk/{sys.argv[1]}-sheet.png')
