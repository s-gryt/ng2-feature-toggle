import { Features } from '../models';
import { Mode } from '../shared';
import { IHandler } from './handler.model';

export abstract class AbstractHandler implements IHandler {
  private nextHandler!: IHandler;

  protected readonly modes = new Map([
    [Mode.Disable, false],
    [Mode.Experiment, true],
    [Mode.Relase, true],
  ]);

  protected isEnabled(mode: Mode): boolean | undefined {
    return this.modes.get(mode);
  }

  protected isFound(mode: Mode, feature: string, features: Features): boolean {
    return !!features[mode]?.[feature]?.length;
  }

  public next(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: { mode: Mode; name: string; features: Features }): typeof request | null | boolean {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
