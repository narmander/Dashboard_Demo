import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';

export const LineChart = ({ config, data, dataSetLabels, ...props }) => {
	const [chartInstance, setChartInstance] = useState(null);
	let chartContainer = useRef(null);

	useEffect(() => {
		createLineChart();

		async function createConfig() {
			const formattedDataSets = await dataFormatter();

			return {
				type: 'scatter',
				label: 'Holocene Data',
				data: {
					labels: [0, 0.5, 1, 1.5, 2, 2.5, 3],
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
			chartInstance.config.data.datasets = dataFormatter();
			chartInstance.update();
		}
	}, [data]);

	function dataFormatter() {
		const updatedDataList = dataSetLabels.slice(1).map(label => {
			const formattedData = [];
			data.forEach(set => {
				formattedData.push({ x: set.x, y: set[label] });
			});

			return {
				label,
				data: formattedData,
			};
		});

		return updatedDataList;
	}

	return (
		<div className='line-chart-container'>
			<canvas id='line-chart' ref={chartContainer} />
		</div>
	);
};
