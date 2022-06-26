import { Mode } from '../shared';

export const querySearchParam = `featureToggle`;

export const searchQuery = `?${querySearchParam}=${Mode.Experiment}Feature,${Mode.Disable}Feature,${Mode.Relase}Feature`;
