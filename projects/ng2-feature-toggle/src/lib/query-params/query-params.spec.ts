import { searchQuery, queryParam, invalidFeatureName } from '../mock';
import { Mode } from '../shared';
import { QueryParams } from './query-params';
describe('QueryParams', () => {
  let queryParamsSpy: jasmine.Spy<() => string>;
  beforeEach(() => {
    queryParamsSpy = spyOn(QueryParams.prototype, 'getSearchParams');
  });
  describe('#isFound', () => {
    it('should return if feature name found in search query params', () => {
      queryParamsSpy.and.returnValue(searchQuery);
      expect(new QueryParams(`${Mode.Experiment}Feature`, `${queryParam}`).isFound).toBe(true);
      expect(new QueryParams(`${Mode.Relase}Feature`, `${queryParam}`).isFound).toBe(true);
      expect(new QueryParams(`${Mode.Disable}Feature`, `${queryParam}`).isFound).toBe(true);
      expect(new QueryParams(``, `${queryParam}`).isFound).toBe(false);
      expect(new QueryParams(invalidFeatureName, `${queryParam}`).isFound).toBe(false);
    });
  });
});
