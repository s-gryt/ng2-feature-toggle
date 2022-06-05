import { AbstractFeatureState } from './abstract-feature-state.handler';
import { IRequest } from './request.model';
import { Mode } from '../shared';

export class DisableFeatureState extends AbstractFeatureState {
  public override handle(request: IRequest): IRequest | null | boolean {
    const { isProvided, mode } = request;
    if (!isProvided && mode === Mode.Experiment) return false;
    return super.handle(request);
  }
}
