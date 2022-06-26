import { InjectionToken } from '@angular/core';

export const QUERY_PARAMS: InjectionToken<string> = new InjectionToken('Query Params');

export const queryParamsTokenFactory = (document: Document): string => document.location.search;
