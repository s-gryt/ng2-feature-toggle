import { Feature, Features } from '../models';
import { Mode } from '../shared';

export const disalbeFeatureName = `${Mode.Disable}Feature`;
export const experimentFeatureName = `${Mode.Experiment}Feature`;
export const releaseFeatureName = `${Mode.Relase}Feature`;
export const invalidFeatureName = 'invalidFeatureName';

export const features: Features = {
  [disalbeFeatureName]: new Feature(Mode.Disable, disalbeFeatureName, '', ''),
  [experimentFeatureName]: new Feature(Mode.Experiment, experimentFeatureName, '', ''),
  [releaseFeatureName]: new Feature(Mode.Relase, releaseFeatureName, '', ''),
};
