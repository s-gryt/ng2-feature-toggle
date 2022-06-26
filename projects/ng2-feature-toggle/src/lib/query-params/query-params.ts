import { DOCUMENT } from '@angular/common';
import { injector } from '../shared';

export class QueryParams {
  private readonly featureToggleName: string;
  private readonly featureQueryParamName: string;

  constructor(featureToggleName: string, featureQueryParamName: string) {
    this.featureToggleName = featureToggleName;
    this.featureQueryParamName = featureQueryParamName;
  }

  get isFound(): boolean {
    return this.isNameFound(this.featureToggleName, this.featureQueryParamName);
  }

  public getSearchParams(): string {
    return injector.get(DOCUMENT).location.search;
  }

  private isNameFound(featureToggleName: string, featureQueryParamName: string): boolean {
    if (!featureToggleName || !featureQueryParamName) return false;
    const queryParams = this.getSearchParams();
    const found = this.getFeatureNameFromQueryParams(featureQueryParamName, queryParams);
    if (!found) return false;
    return new RegExp(`\\b${featureToggleName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`).test(queryParams);
  }

  private getFeatureNameFromQueryParams(featureToggleName: string, queryParams: string): string {
    const name = featureToggleName.replace(/[\\[\]]/g, '\\><');
    const getFromString = (d: string) => new RegExp('[?&]' + d + '(=([^&#]*)|&|#|$)');
    const res = getFromString(name).exec(queryParams);
    if (!res || !res[2]) return '';
    return res[2].replace(/\+/g, ' ');
  }
}
