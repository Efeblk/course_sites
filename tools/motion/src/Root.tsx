import React from 'react';
import {Composition} from 'remotion';
import {MotionVideo, Timeline} from './lib';
import L2 from './timeline/ens010-L2.json';
import L3 from './timeline/ens010-L3.json';
import L4 from './timeline/ens010-L4.json';
import L5 from './timeline/ens010-L5.json';
import L6 from './timeline/ens010-L6.json';
import L7 from './timeline/ens010-L7.json';
import {L2Scenes} from './ens010/L2';
import {L3Scenes} from './ens010/L3';
import {L4Scenes} from './ens010/L4';
import {L5Scenes} from './ens010/L5';
import {L6Scenes} from './ens010/L6';
import {L7Scenes} from './ens010/L7';

// one composition per timeline (src/timeline/<id>.json, made by prep.py from src/scripts/<id>.json);
// scenes are React components, so they are bound here rather than passed as (serialised) props
const videos: [Timeline, Record<string, React.FC>][] = [
  [L2 as Timeline, L2Scenes],
  [L3 as Timeline, L3Scenes],
  [L4 as Timeline, L4Scenes],
  [L5 as Timeline, L5Scenes],
  [L6 as Timeline, L6Scenes],
  [L7 as Timeline, L7Scenes],
];

export const Root: React.FC = () => (
  <>
    {videos.map(([tl, scenes]) => {
      const Video: React.FC = () => <MotionVideo tl={tl} scenes={scenes} kicker={`ENS010 · ${tl.title}`} />;
      return <Composition key={tl.id} id={tl.id} component={Video} durationInFrames={tl.dur} fps={tl.fps} width={1920} height={1080} />;
    })}
  </>
);
