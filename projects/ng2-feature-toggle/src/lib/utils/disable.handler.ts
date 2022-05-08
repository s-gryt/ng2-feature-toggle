import { Features } from '../models';
import { Mode } from '../shared';
import { AbstractHandler } from './abstract-handler';

export class Disable extends AbstractHandler {
  public override handle(request: { mode: Mode; name: string; features: Features }): typeof request | null | boolean {
    const isFound = super.isFound(request.mode, request.name, request.features);
    if (!super.isEnabled(request.mode) && isFound) return false;
    if (!super.isEnabled(request.mode) && !isFound) return true;
    return super.handle(request);
  }
}
