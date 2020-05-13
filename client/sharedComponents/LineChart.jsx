import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import { range } from 'lodash';

import { findMinMax, OFFSET } from 'Utils';

export const LineChart = ({ config, data, dataSetLabels, ...props }) => {
	const [chartInstance, setChartInstance] = useState(null);
	let chartContainer = useRef(null);
	const bounds = findMinMax(data, 'x');

	useEffect(() => {
		createLineChart();

		async function createConfig() {
			const formattedDataSets = await dataFormatter();
			const labels = await generateLabels();

			return {
				type: 'line',
				// label: 'Holocene Data', add generic Title for dynamic
				data: {
					labels, // same here. make reusable
					datasets: formattedDataSets,
				},
			};
		}

		async function createLineChart() {
			let config = await createConfig();
			let chartRef = chartContainer.current.getContext('2d');
			setChartInstance(new Chart(chartRef, config));
		}
	}, []);

	useEffect(() => {
		if (chartInstance) {
			chartInstance.config.data.labels = generateLabels();
			chartInstance.config.data.datasets = dataFormatter();
			chartInstance.update();
		}
	}, [data]);

	function dataFormatter() {
		const formattedData = dataSetLabels.slice(1).map(label => {
			const formattedSet = [];

			data.forEach(set => {
				formattedSet.push({ x: set.x, y: set[label] });
			});

			return {
				label,
				fill: false,
				data: formattedSet.sort((curr, next) => curr.x - next.x),
			};
		});

		return formattedData;
	}

	function generateLabels() {
		return range(bounds.min, bounds.max + OFFSET, OFFSET);
	};

	return (
		<div className='line-chart-container'>
			<canvas id='line-chart' ref={chartContainer} />
		</div>
	);
};
