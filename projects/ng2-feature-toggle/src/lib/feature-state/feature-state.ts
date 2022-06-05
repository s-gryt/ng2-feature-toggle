import { DisableFeatureState } from './disable-state.handler';
import { EnableFeatureState } from './enable-state.handler';
import { Mode } from '../shared';

export class FeatureState {
  private readonly isProvided: boolean;
  private readonly mode: Mode;

  constructor(isProvided: boolean, mode: Mode) {
    this.isProvided = isProvided;
    this.mode = mode;
  }

  get state() {
    return this.getState(this.isProvided, this.mode);
  }

  private getState(isProvided: boolean, mode: Mode) {
    const disable = new DisableFeatureState();
    const enable = new EnableFeatureState();
    disable.next(enable);
    const request = {
      isProvided,
      mode,
    };
    const isEnabled = disable.handle(request);
    return isEnabled as boolean;
  }
}
