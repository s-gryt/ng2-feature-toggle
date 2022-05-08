import { Mode } from '../shared/feature-mode';
import { Disable, Enable } from '../utils';
import { Features } from './features.model';

export class Feature {
  private readonly _features: Features;
  private readonly _name: string;
  private readonly _mode: Mode;

  constructor(public readonly mode: Mode, public readonly name: string, public readonly features: Features) {
    this._features = features;
    this._mode = mode;
    this._name = name;
  }

  public get isEnabled(): boolean {
    const disable = new Disable();
    const enable = new Enable();
    disable.next(enable);

    const request = {
      mode: this._mode,
      name: this._name,
      features: this._features,
    };

    const handler = disable.handle(request);

    return handler as boolean;
  }
}
