import { searchQuery } from '../mock';
import { Mode } from '../shared';
import { QuerySearchParams } from './query-search-params';

describe('QuerySearchParams', () => {
  describe('#isFound', () => {
    it('should return if feature name found in search query params', () => {
      expect(new QuerySearchParams(`${Mode.Experiment}Feature`, searchQuery).isFound).toBe(true);
      expect(new QuerySearchParams(`${Mode.Relase}Feature`, searchQuery).isFound).toBe(true);
      expect(new QuerySearchParams(`${Mode.Disable}Feature`, searchQuery).isFound).toBe(true);
      expect(new QuerySearchParams(``, searchQuery).isFound).toBe(false);
      expect(new QuerySearchParams(`nonExistingFeatureName`, searchQuery).isFound).toBe(false);
    });
  });
});
