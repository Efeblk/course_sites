// node stills.mjs 57,410,... → stills/f<frame>.png (one bundle, many frames)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';
const CH = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const composition = await selectComposition({ serveUrl, id: process.argv[3] || 'Threshold', browserExecutable: CH });
for (const fr of process.argv[2].split(',').map(Number)) {
  await renderStill({ serveUrl, composition, frame: fr, output: `stills/f${fr}.png`, browserExecutable: CH, scale: 0.5 });
  console.log('still', fr);
}
