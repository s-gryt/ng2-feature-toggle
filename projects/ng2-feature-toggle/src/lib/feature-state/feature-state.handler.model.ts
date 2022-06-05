import { IRequest } from './request.model';

export interface IFeatureState {
  handle(request: IRequest): IRequest | null | boolean;
  next(handler: IFeatureState): IFeatureState;
}
