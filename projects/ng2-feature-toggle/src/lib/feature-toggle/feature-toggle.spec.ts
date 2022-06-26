import {
  disalbeFeatureName,
  experimentFeatureName,
  features,
  invalidFeatureName,
  queryParam,
  releaseFeatureName,
  searchQuery,
} from '../mock';
import { Feature, IFeature } from '../models';
import { FeatureToggle } from './feature-toggle';
import { IFeatureToggle } from '../models/feature-toggle.model';
import { Mode } from '../shared';
import { QueryParams } from '../query-params';

describe('FeatureToggle', () => {
  const featureToggle = new FeatureToggle(queryParam, features);
  const featureConfigMock = (feature: IFeature, isEnabled: boolean): IFeatureToggle => ({
    ...feature,
    isEnabled,
  });

  let queryParamsSpy: jasmine.Spy<() => string>;
  beforeEach(() => {
    queryParamsSpy = spyOn(QueryParams.prototype, 'getSearchParams');
  });

  describe(`#getFeatureToggle`, () => {
    describe(`${Mode.Disable}`, () => {
      it('should return feature toggle', () => {
        queryParamsSpy.and.returnValue(searchQuery);
        expect(featureToggle.getFeatureToggle(disalbeFeatureName)).toEqual(
          featureConfigMock(features[disalbeFeatureName], true)
        );
        expect(featureToggle.getFeatureToggle(invalidFeatureName)).toEqual(
          featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
        );
      });
    });
    describe(`${Mode.Experiment}`, () => {
      it('should return feature toggle', () => {
        queryParamsSpy.and.returnValue(searchQuery);
        expect(featureToggle.getFeatureToggle(experimentFeatureName)).toEqual(
          featureConfigMock(features[experimentFeatureName], true)
        );
        expect(featureToggle.getFeatureToggle(invalidFeatureName)).toEqual(
          featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
        );
        queryParamsSpy.and.returnValue('');
        expect(featureToggle.getFeatureToggle(experimentFeatureName)).toEqual(
          featureConfigMock(features[experimentFeatureName], false)
        );
      });
    });
    describe(`${Mode.Relase}`, () => {
      it('should return feature toggle', () => {
        queryParamsSpy.and.returnValue(searchQuery);
        expect(featureToggle.getFeatureToggle(releaseFeatureName)).toEqual(
          featureConfigMock(features[releaseFeatureName], true)
        );
        expect(featureToggle.getFeatureToggle(invalidFeatureName)).toEqual(
          featureConfigMock(new Feature('' as unknown as Mode, invalidFeatureName, '', ''), false)
        );
      });
    });
  });
});
