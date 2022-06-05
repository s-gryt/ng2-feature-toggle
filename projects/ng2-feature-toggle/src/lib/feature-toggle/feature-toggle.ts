import { Feature, Features } from '../models';
import { FeatureState } from '../feature-state/feature-state';
import { IFeatureToggle } from '../models/feature-config.model';
import { Mode } from '../shared';
import { QuerySearchParams } from '../query-search-params';
export class FeatureToggle {
  private readonly features: Features;

  constructor(features: Features) {
    this.features = features;
  }

  public getFeatureToggle(name: string, searchParams: string): IFeatureToggle {
    const feature = this.getFeature(this.features, name);
    const isEmpty = this.isEmpty(feature);
    if (isEmpty) {
      return {
        ...new Feature('' as unknown as Mode, name, '', ''),
        isEnabled: false,
      };
    }
    const isProvided = this.isFeatureProvidedInUrl(name, searchParams);
    const isEnabled = this.getFeatureState(isProvided, feature.mode);
    return {
      ...feature,
      isEnabled,
    };
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

  private isFeatureProvidedInUrl(name: string, searchParams: string): boolean {
    return new QuerySearchParams(name, searchParams).isFound;
  }
}
