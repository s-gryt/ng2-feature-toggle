import { Injector, NgModule } from '@angular/core';

/**
 * Temp solution untill this lib is migrated to Angular 14.
 *
 * `inject()` will be reused instead and this file will be removed.
 */
export let injector: Injector;

@NgModule()
export class InstanceInjector {
  constructor(private inj: Injector) {
    injector = this.inj;
  }
}
