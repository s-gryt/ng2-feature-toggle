import { AbstractFeatureState } from './abstract-feature-state.handler';
import { IRequest } from './request.model';
import { Mode } from '../shared';

export class EnableFeatureState extends AbstractFeatureState {
  public override handle(request: IRequest): IRequest | null | boolean {
    const { isProvided, mode } = request;
    if (mode === Mode.Disable || mode === Mode.Relase) return true;
    if (isProvided && mode === Mode.Experiment) return true;
    return super.handle(request);
  }
}
