import { Features } from '../models';
import { Mode } from '../shared';

export type Request = { mode: Mode; name: string; features: Features };

export interface IHandler {
  next(handler: IHandler): IHandler;
  handle(request: Request): Request | null | boolean;
}
