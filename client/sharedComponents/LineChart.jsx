import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { range } from 'lodash';
import Chart from 'chart.js';

import { findMinMax } from 'Utils';

export const LineChart = ({
	config,
	...props
}) => {
	let chartContainer = useRef(null);
	
	useEffect(() => {
		const chartRef = chartContainer.current.getContext('2d');
		new Chart(chartRef, config);
	}, []);

	return (
		<div className='line-chart-container'>
			<canvas id="line-chart" ref={chartContainer} />
		</div>
	);
};
