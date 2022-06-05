import { IFeature } from './feature.model';

export interface IFeatureToggle extends IFeature {
  isEnabled: boolean;
}
