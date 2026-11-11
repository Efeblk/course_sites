// node render_all.mjs <outDir> [Id ...]  → renders every Swe* composition (or the ids given) to <outDir>/<name>.mp4 + <name>.jpg poster.
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia, renderStill } from '@remotion/renderer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
const [out, ...only] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const comps = (await getCompositions(serveUrl)).filter(c => only.length ? only.includes(c.id) : c.id.startsWith('Swe'));
for (const c of comps) {
  const name = c.id.replace(/^(Swe|Os)/, '').toLowerCase();
  const t0 = Date.now();
  await renderMedia({ serveUrl, composition: c, codec: 'h264', outputLocation: `${out}/${name}.mp4`, crf: 20, pixelFormat: 'yuv420p', concurrency: Math.max(2, os.cpus().length - 2) });
  // Remotion writes yuvj420p (full range); Firefox/Zen refuse it, so re-encode to plain yuv420p
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', `${out}/${name}.mp4`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-crf', '20', '-movflags', '+faststart', '-c:a', 'copy', `${out}/${name}.tmp.mp4`]);
  fs.renameSync(`${out}/${name}.tmp.mp4`, `${out}/${name}.mp4`);
  await renderStill({ serveUrl, composition: c, frame: Math.min(c.durationInFrames - 1, 330), output: `${out}/${name}.jpg`, imageFormat: 'jpeg', jpegQuality: 80, scale: 0.5 });
  console.log(`${name}: ${(c.durationInFrames / 30).toFixed(1)}s video in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
