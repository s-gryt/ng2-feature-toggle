import { features } from '../mock';
import { Mode } from '../shared';
import { Feature } from './feature.model';

describe('Feature', () => {
  describe('Disabled', () => {
    it('should not disable if the feature name is not foundd', () => {
      const feature1 = new Feature(Mode.Disable, 'feature1', features);
      expect(feature1.isEnabled).toBeTruthy();
    });

    it('should disable the feature if the name is found', () => {
      const feature2 = new Feature(Mode.Disable, 'feature2', features);
      expect(feature2.isEnabled).toBeFalsy();
    });
  });

  describe('Experiment', () => {
    it('should enable if the feature name is found', () => {
      const feature1 = new Feature(Mode.Experiment, 'feature1', features);
      const feature2 = new Feature(Mode.Experiment, 'feature2', features);
      expect(feature1.isEnabled).toBeTruthy();
      expect(feature2.isEnabled).toBeTruthy();
    });

    it('should not enable if the feature name is not found', () => {
      const feature = new Feature(Mode.Experiment, '', features);
      expect(feature.isEnabled).toBeFalsy();
    });
  });

  describe('Release', () => {
    it('should enable if the feature name is in a config', () => {
      const feature3 = new Feature(Mode.Relase, 'feature3', features);
      const feature4 = new Feature(Mode.Relase, 'feature4', features);
      const feature5 = new Feature(Mode.Relase, 'feature5', features);
      expect(feature3.isEnabled).toBeTruthy();
      expect(feature4.isEnabled).toBeTruthy();
      expect(feature5.isEnabled).toBeTruthy();
    });

    it('should not enable if the feature name is not found', () => {
      const feature = new Feature(Mode.Relase, '', features);
      expect(feature.isEnabled).toBeFalsy();
    });
  });
});
