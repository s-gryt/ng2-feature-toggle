import { Mode } from '../shared';

export const queryParam = `featureToggle`;

export const searchQuery = `?${queryParam}=${Mode.Experiment}Feature,${Mode.Disable}Feature,${Mode.Relase}Feature`;
