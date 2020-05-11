import { minBy, maxBy, sortBy } from 'lodash';

// CONSTANTS
export const DATABASE = 'DATABASE';

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

export const sortData = () => {

}

// generate a dataset object
// add to each dataset's object data array until complete

// make utils
// make reusable button component

// const y1 = findMinMax(coordinates, 'y1');
	// const y2 = findMinMax(coordinates, 'y2');
	// const yBounds = {
	// 	max: Math.max(y1.max, y2.max),
	// 	min: Math.min(y1.min, y2.min),
	// range(xBounds.min, xBounds.max, 5)
	// };
	// const xBounds = findMinMax(coordinates, 'x');
