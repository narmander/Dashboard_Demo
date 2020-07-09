import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import { range, random } from 'lodash';

import { findMinMax, OFFSET } from 'Utils';
import {
	BLURRY_LIGHT_TEAL,
	DARKER_TEAL,
	DARKEST_TEAL,
	GREY,
	PRIMARY_DARK_TEAL,
	PRIMARY_LIGHT_TEAL,
	RED,
} from 'Styles/themes';

export const LineChart = ({
	config,
	data,
	dataSetCoordinates,
	colorScheme = [
		PRIMARY_LIGHT_TEAL,
		RED,
		PRIMARY_DARK_TEAL,
		BLURRY_LIGHT_TEAL,
		DARKER_TEAL,
		DARKEST_TEAL,
	],
	...props
}) => {
	const [chartInstance, setChartInstance] = useState(null);
	let chartContainer = useRef(null);

	useEffect(() => {
		// chart updates
		if (chartInstance) {
			chartInstance.config.data.labels = generateLabels();
			chartInstance.config.data.datasets = dataFormatter();
			chartInstance.update();
		}
	}, [data]);

	useEffect(() => {
		// initial chart creation
		createLineChart();

		async function createConfig() {
			const labels = await generateLabels();
			const formattedDataSets = await dataFormatter();

			return {
				type: 'line',
				data: {
					labels,
					datasets: formattedDataSets,
				},
				options: {
					title: {
						display: true,
						text: 'Holocene Data',
					},
				},
			};
		}

		async function createLineChart() {
			let config = await createConfig();
			let chartRef = chartContainer.current.getContext('2d');
			setChartInstance(new Chart(chartRef, config));
		}
	}, []);

	function dataFormatter() {
		const formattedData = dataSetCoordinates.slice(1).map((label, i) => {
			const formattedSet = [];

			data.forEach(set => {
				formattedSet.push({ x: set.x, y: set[label] });
			});

			return {
				label,
				backgroundColor: colorScheme[i],
				borderColor: colorScheme[i],
				pointHoverBorderWidth: 10,
				pointHoverBorderRadius: 10,
				data: formattedSet.sort((curr, next) => curr.x - next.x),
				fill: false,
				borderWidth: 3,
			};
		});

		return formattedData;
	}

	function generateLabels() {
		const bounds = findMinMax(data, 'x');
		return range(bounds.min, bounds.max + OFFSET, 1);
	}

	return (
		<LineChartStyles>
			<div className='line-chart-container'>
				<canvas id='line-chart' ref={chartContainer} />
			</div>
		</LineChartStyles>
	);
};

const LineChartStyles = styled.div`
	.line-chart-container {
		min-width: 260px;
	}
`;
