import { Mode } from '../shared';

export interface IFeature {
  readonly description?: string;
  readonly id?: string;
  readonly mode: Mode;
  readonly name: string;
}

export class Feature implements IFeature {
  public readonly mode: Mode;
  public readonly name: string;
  public readonly id?: string;
  public readonly description?: string;

  constructor(mode: Mode, name: string, id?: string, description?: string) {
    this.mode = mode;
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
