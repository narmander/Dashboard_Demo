import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import { sumBy } from 'lodash';

import {
	BLURRY_LIGHT_TEAL,
	DARKER_TEAL,
	DARKEST_TEAL,
	PRIMARY_DARK_TEAL,
	PRIMARY_LIGHT_TEAL,
	RED,
} from 'Styles/themes';

export const ListedDataChart = ({
	data,
	dataSetCategories,
	colorScheme = [
		PRIMARY_LIGHT_TEAL,
		RED,
		PRIMARY_DARK_TEAL,
		BLURRY_LIGHT_TEAL,
		DARKER_TEAL,
		DARKEST_TEAL,
	],
	type,
}) => {
	const [chartInstance, setChartInstance] = useState(null);
	let chartContainer = useRef(null);

	useEffect(() => {
		// chart updates
		if (chartInstance) {
			chartInstance.config.data.datasets[0].data = dataFormatter();
			chartInstance.update();
		}
	}, [data]);

	useEffect(() => {
		// initial chart creation
		createChart();

		async function createChart() {
			const formattedData = dataFormatter();
			let chartRef = await chartContainer.current.getContext('2d');
			setChartInstance(
				new Chart(chartRef, {
					type,
					data: {
						labels: dataSetCategories,
						datasets: [
							{
								label: 'Data Results',
								data: formattedData,
								backgroundColor: colorScheme,
							},
						],
					},
				})
			);
		}
	}, []);

	function dataFormatter() {
		const formattedData = dataSetCategories.map((label, i) => {
			return sumBy(data, label);
		});
		return formattedData;
	}

	return (
		<ChartStyles>
			<div className='chart-container'>
				<canvas id='chart' ref={chartContainer} />
			</div>
		</ChartStyles>
	);
};

const ChartStyles = styled.div`
	.chart-container {
		min-width: 260px;
	}
`;
