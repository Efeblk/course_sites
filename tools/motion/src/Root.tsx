import React from 'react';
import {Composition} from 'remotion';
import {MotionVideo, Timeline} from './lib';
import L3 from './timeline/ens010-L3.json';
import {L3Scenes} from './ens010/L3';

// one composition per timeline (src/timeline/<id>.json, made by prep.py from src/scripts/<id>.json);
// scenes are React components, so they are bound here rather than passed as (serialised) props
const videos: [Timeline, Record<string, React.FC>][] = [[L3 as Timeline, L3Scenes]];

export const Root: React.FC = () => (
  <>
    {videos.map(([tl, scenes]) => {
      const Video: React.FC = () => <MotionVideo tl={tl} scenes={scenes} kicker={`ENS010 · ${tl.title}`} />;
      return <Composition key={tl.id} id={tl.id} component={Video} durationInFrames={tl.dur} fps={tl.fps} width={1920} height={1080} />;
    })}
  </>
);
