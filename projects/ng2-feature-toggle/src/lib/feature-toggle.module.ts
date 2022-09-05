import { DOCUMENT } from '@angular/common';
import { QUERY_PARAMS, queryParamsTokenFactory, FEATURES, FEATURE_QUERY_PARAM } from './providers';
import { featureToggleFactory, FEATURE_TOGGLE } from './providers/feature-toggle.provider';
import { Features } from './models';
import { FeatureToggleDirective } from './directives/feature-toggle.directive';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { InstanceInjector } from './shared';

export * from './directives';
export * from './feature-toggle';
export * from './query-params';
export * from './models';
export { Mode } from './shared';
export { FEATURE_TOGGLE } from './providers/feature-toggle.provider';

@NgModule({
  declarations: [FeatureToggleDirective],
  providers: [
    {
      provide: QUERY_PARAMS,
      useFactory: queryParamsTokenFactory,
      deps: [[new Inject(DOCUMENT)]],
    },
  ],
  imports: [InstanceInjector],
  exports: [FeatureToggleDirective],
})
export class FeatureToggleModule {
  static forRoot(featureQueryParamName: string, features: Features): ModuleWithProviders<FeatureToggleModule> {
    return {
      ngModule: FeatureToggleModule,
      providers: [
        {
          provide: FEATURE_QUERY_PARAM,
          useValue: featureQueryParamName,
        },
        {
          provide: FEATURES,
          useValue: features,
        },
        {
          provide: FEATURE_TOGGLE,
          useFactory: featureToggleFactory,
          deps: [FEATURE_QUERY_PARAM, FEATURES],
        },
      ],
    };
  }
}
