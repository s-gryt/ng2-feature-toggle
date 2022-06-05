import { IFeatureState } from './feature-state.handler.model';
import { IRequest } from './request.model';

export abstract class AbstractFeatureState implements IFeatureState {
  private nextHandler!: IFeatureState;
  public handle(request: IRequest): IRequest | null | boolean {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }

  public next(handler: IFeatureState): IFeatureState {
    this.nextHandler = handler;
    return handler;
  }
}
