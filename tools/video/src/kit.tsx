// Shared pieces for every video: narration track, sound effects, captions.
import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import type { Timeline } from './lib';

export const Narration: React.FC<{ tl: Timeline }> = ({ tl }) => (
  <>{Object.values(tl.beats).map(b => <Sequence key={b.file} from={b.start}><Audio src={staticFile(b.file)} /></Sequence>)}</>
);

/** one-shot sound effect at frame `at` */
export const Sfx: React.FC<{ at: number; name: 'ping' | 'beep' | 'pop' | 'whoosh' | 'tick'; volume?: number }> = ({ at, name, volume = 0.3 }) => (
  <Sequence from={Math.round(at)} durationInFrames={20}><Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} /></Sequence>
);
