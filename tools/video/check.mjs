// Cross-platform check + render for the explainers (render.sh / stills.mjs are the Mac originals).
//   node check.mjs sheet <CompositionId> [timelineName]   half-size still at the end of every beat → chk/<id>/*.png
//   node check.mjs render <CompositionId> <out.mp4>       full 1080p render (H.264, yuv420p)
import { bundle } from '@remotion/bundler';
import { renderStill, renderMedia, selectComposition } from '@remotion/renderer';
import fs from 'fs';
import os from 'os';
import path from 'path';

const [mode, id, arg] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id });

if (mode === 'sheet') {
  const tl = JSON.parse(fs.readFileSync(`src/timelines/${arg}.json`, 'utf8'));
  const dir = `chk/${id}`; fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f));
  const frames = Object.entries(tl.beats).map(([k, b]) => [k, Math.min(tl.total - 1, b.start + b.dur - 2)]);
  for (const [k, fr] of frames) {
    await renderStill({ serveUrl, composition, frame: fr, output: `${dir}/${String(fr).padStart(5, '0')}-${k}.png`, scale: 0.5 });
  }
  console.log(`${id}: ${frames.length} stills in ${dir}`);
} else if (mode === 'render') {
  await renderMedia({ serveUrl, composition, codec: 'h264', outputLocation: arg, crf: 18, pixelFormat: 'yuv420p', concurrency: Math.max(2, os.cpus().length - 2) });
  console.log('rendered', arg);
}
