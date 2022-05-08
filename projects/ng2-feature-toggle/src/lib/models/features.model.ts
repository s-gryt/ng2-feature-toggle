import { Mode } from '../shared';

export type Features = { [key in Mode]: { [key: string]: string } };
