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

export const getRandomColorHex = () => {
	var hex = '0123456789ABCDEF',
		color = '#';
	for (var i = 1; i <= 6; i++) {
		color += hex[Math.floor(Math.random() * 16)];
	}
	return color;
};
