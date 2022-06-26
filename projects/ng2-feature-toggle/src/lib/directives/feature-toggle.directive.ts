import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureToggle } from '../feature-toggle';
import { IFeatureToggle } from '../models/feature-toggle.model';
import { FEATURE_TOGGLE } from '../providers/feature-toggle.provider';
import { Mode } from '../shared';

@Directive({
  selector: '[featureToggle]',
})
export class FeatureToggleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(FEATURE_TOGGLE) private readonly ft: FeatureToggle
  ) {}

  @Input() set featureToggle(name: string) {
    const { isEnabled, mode } = this.getFeatureToggle(name);
    if (isEnabled && mode === Mode.Disable) {
      this.viewContainer.clear();
    } else if (isEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private getFeatureToggle(featureName: string): IFeatureToggle {
    return this.ft.getFeatureToggle(featureName);
  }
}
