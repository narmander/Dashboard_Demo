import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';


export const PieChart = () => {
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
		createPieChart();

		async function createConfig() {
			const labels = await generateLabels();
			const formattedDataSets = await dataFormatter();

			return {
				type: 'pie',
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


	return (
		<PieChartStyles>
			<div className='pie-chart-container'>
				<canvas id='pie-chart' ref={chartContainer} />
			</div>
		</PieChartStyles>
	);
};

const PieChartStyles = styled.div`

`;
