import { InjectionToken } from '@angular/core';
import { FeatureToggle } from '../feature-toggle';
import { Features } from '../models';

export const FEATURE_TOGGLE: InjectionToken<string> = new InjectionToken('FeatureToggle');

export const featureToggleFactory = (searchQueryParamName: string, features: Features): FeatureToggle =>
  new FeatureToggle(searchQueryParamName, features);
