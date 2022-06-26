import { Feature, Features } from '../models';
import { FeatureState } from '../feature-state/feature-state';
import { IFeatureToggle } from '../models/feature-toggle.model';
import { Mode } from '../shared';
import { QueryParams } from '../query-params';

export class FeatureToggle {
  private readonly features: Features;
  private readonly featureQueryParamName: string;

  constructor(featureQueryParamName: string, features: Features) {
    this.features = features;
    this.featureQueryParamName = featureQueryParamName;
  }
  public getFeatureToggle(featureToggleName: string): IFeatureToggle {
    const feature = this.getFeature(this.features, featureToggleName);
    const isEmpty = this.isEmpty(feature);
    if (isEmpty) {
      return {
        ...new Feature('' as string as Mode, featureToggleName, '', ''),
        isEnabled: false,
      };
    }
    const isEnabled = this.isEnabled(featureToggleName, this.featureQueryParamName, feature.mode);
    return {
      ...feature,
      isEnabled,
    };
  }

  private isEnabled(featureToggleName: string, featureQueryParamName: string, mode: Mode) {
    const isProvided = this.isFeatureProvidedInUrl(featureToggleName, featureQueryParamName);
    return this.getFeatureState(isProvided, mode);
  }

  private getFeatureState(isProvided: boolean, mode: Mode): boolean {
    return new FeatureState(isProvided, mode).state;
  }

  private getFeature(features: Features, name: string): Feature {
    return features[name];
  }

  private isEmpty(feature: Feature): boolean {
    if (!feature) return true;
    return !Object.keys(feature).length;
  }

  private isFeatureProvidedInUrl(featureToggleName: string, featureQueryParamName: string): boolean {
    return new QueryParams(featureToggleName, featureQueryParamName).isFound;
  }
}
