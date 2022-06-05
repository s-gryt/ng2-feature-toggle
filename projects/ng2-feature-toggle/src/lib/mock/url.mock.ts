import { Mode } from '../shared';

export const searchQueryParam = `featureToggle`;

export const searchQuery = `${searchQueryParam}=${Mode.Experiment}Feature,${Mode.Disable}Feature,${Mode.Relase}Feature`;
