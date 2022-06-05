import {
  disalbeFeatureName,
  experimentFeatureName,
  features,
  invalidFeatureName,
  releaseFeatureName,
  searchQuery,
} from '../mock';
import { Feature, IFeature } from '../models';
import { FeatureToggle } from './feature-toggle';
import { IFeatureToggle } from '../models/feature-config.model';
import { Mode } from '../shared';

describe('FeatureToggle', () => {
  const featureToggle = new FeatureToggle(features);
  const featureConfigMock = (feature: IFeature, isEnabled: boolean): IFeatureToggle => ({
    ...feature,
    isEnabled,
  });
  describe(`#getFeatureToggle`, () => {
    it('should return feature config', () => {
      expect(featureToggle.getFeatureToggle(disalbeFeatureName, searchQuery)).toEqual(
        featureConfigMock(features[disalbeFeatureName], true)
      );
      expect(featureToggle.getFeatureToggle(invalidFeatureName, searchQuery)).toEqual(
        featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
      );
    });
    describe(`${Mode.Experiment}`, () => {
      it('should return feature config', () => {
        expect(featureToggle.getFeatureToggle(experimentFeatureName, searchQuery)).toEqual(
          featureConfigMock(features[experimentFeatureName], true)
        );
        expect(featureToggle.getFeatureToggle(experimentFeatureName, '')).toEqual(
          featureConfigMock(features[experimentFeatureName], false)
        );
        expect(featureToggle.getFeatureToggle(invalidFeatureName, searchQuery)).toEqual(
          featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
        );
      });
    });
    describe(`${Mode.Relase}`, () => {
      it('should return feature config', () => {
        expect(featureToggle.getFeatureToggle(releaseFeatureName, searchQuery)).toEqual(
          featureConfigMock(features[releaseFeatureName], true)
        );
        expect(featureToggle.getFeatureToggle(invalidFeatureName, searchQuery)).toEqual(
          featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
        );
      });
    });
  });
});
