import { Features } from '../models';
import { Mode } from '../shared';

export const features: Features = {
  [Mode.Disable]: {
    feature2: 'this is a feature 2',
    feature5: 'this is a feature 5',
  },
  [Mode.Experiment]: {
    feature1: 'this is a feature 1',
    feature2: 'this is a feature 2',
  },

  [Mode.Relase]: {
    feature3: 'this is a feature 3',
    feature4: 'this is a feature 4',
    feature5: 'this is a feature 5',
  },
} as const;
