import { By } from '@angular/platform-browser';
import { Component, DebugElement, Inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { FEATURE_TOGGLE, queryParamsTokenFactory, QUERY_PARAMS } from '../providers';
import { FeatureToggleDirective } from './feature-toggle.directive';
import { Mode } from '../shared';

let fixture: ComponentFixture<MockComponent>;
let experimentFeatureDebugElement: DebugElement;
let disableFeatureDebugElement: DebugElement;
let releaseFeatureDebugElement: DebugElement;

@Component({
  selector: 'mock-component',
  template: `
    <div class="experimentFeature" *featureToggle="'experimentFeature'">{{ experiment }}</div>
    <div class="disableFeature" *featureToggle="'disableFeature'">{{ disable }}</div>
    <div class="releaseFeature" *featureToggle="'releaseFeature'">{{ release }}</div>
  `,
})
class MockComponent {
  private experiment = Mode.Experiment;
  private disable = Mode.Disable;
  private release = Mode.Relase;
}

describe('FeatureToggleDirective', () => {
  describe('Experiment', () => {
    describe('isEnabled: false', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Experiment, isEnabled: false }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        experimentFeatureDebugElement = fixture.debugElement.query(By.css('.experimentFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should not render a template', async () => {
        expect(experimentFeatureDebugElement).toBeFalsy();
      });
    });

    describe('isEnabled: true', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Experiment, isEnabled: true }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        experimentFeatureDebugElement = fixture.debugElement.query(By.css('.experimentFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should render a template', async () => {
        expect(experimentFeatureDebugElement.nativeElement.innerHTML).toBe(Mode.Experiment);
      });
    });
  });

  describe('Disable', () => {
    describe('isEnabled: false', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Disable, isEnabled: false }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        disableFeatureDebugElement = fixture.debugElement.query(By.css('.disableFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should render a template', async () => {
        expect(disableFeatureDebugElement.nativeElement.innerHTML).toBe(Mode.Disable);
      });
    });

    describe('isEnabled: true', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Disable, isEnabled: true }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        disableFeatureDebugElement = fixture.debugElement.query(By.css('.disableFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should not render a template', async () => {
        expect(disableFeatureDebugElement).toBeFalsy();
      });
    });
  });

  describe('Release', () => {
    describe('isEnabled: false', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Relase, isEnabled: false }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        releaseFeatureDebugElement = fixture.debugElement.query(By.css('.releaseFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should not render a template', async () => {
        expect(disableFeatureDebugElement).toBeFalsy();
      });
    });

    describe('isEnabled: true', () => {
      beforeEach(async () => {
        TestBed.configureTestingModule({
          declarations: [FeatureToggleDirective, MockComponent],
          providers: [
            {
              provide: QUERY_PARAMS,
              useFactory: queryParamsTokenFactory,
              deps: [[new Inject(DOCUMENT)]],
            },
            {
              provide: FEATURE_TOGGLE,
              useValue: {
                getFeatureToggle: () => ({ mode: Mode.Relase, isEnabled: true }),
              },
            },
          ],
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        fixture.detectChanges();
        releaseFeatureDebugElement = fixture.debugElement.query(By.css('.releaseFeature'));
      });

      afterEach(() => {
        fixture.destroy();
      });

      it('should render a template', async () => {
        expect(releaseFeatureDebugElement.nativeElement.innerHTML).toBe(Mode.Relase);
      });
    });
  });
});
