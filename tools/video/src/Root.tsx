import React from 'react';
import { Composition } from 'remotion';
import { makeTL } from './lib';
import { Threshold } from './Threshold';
import { Matrix } from './Matrix';
import { Prevalence } from './Prevalence';
import { Action } from './Action';
import { Trust } from './Trust';
import thresholds from './timelines/thresholds.json';
import matrix from './timelines/matrix.json';
import prevalence from './timelines/prevalence.json';
import action from './timelines/action.json';
import trust from './timelines/trust.json';
import { SweComps } from './swe';
import { OsComps } from './os';

const comp = (id: string, component: React.FC, t: unknown) => {
  const { TL } = makeTL(t);
  return <Composition key={id} id={id} component={component} durationInFrames={TL.total} fps={TL.fps} width={1920} height={1080} />;
};

export const Root: React.FC = () => <>
  {comp('Threshold', Threshold, thresholds)}
  {comp('Matrix', Matrix, matrix)}
  {comp('Prevalence', Prevalence, prevalence)}
  {comp('Action', Action, action)}
  {comp('Trust', Trust, trust)}
  <SweComps />
  <OsComps />
</>;
