import { minBy, maxBy, sortBy } from 'lodash';

// CONSTANTS
export const DATABASE = 'DATABASE';
export const OFFSET = 0.5;

// DEFAULTS
export const SEED_DATA = [
	{ x: 1, y1: 3, y2: 10 },

	{ x: 3, y1: 20, y2: 12 },

	{ x: -1, y1: -5, y2: -4 },
];

// Utility Functions

export const findMinMax = (objects, key) => {
	const min = minBy(objects, key);

	const max = maxBy(objects, key);

	return { min: min[key], max: max[key] };
};

// generate a dataset object
// add to each dataset's object data array until complete

// make utils
// make reusable button component