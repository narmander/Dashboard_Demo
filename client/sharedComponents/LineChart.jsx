import React, { useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';

import { findMinMax } from 'Utils';

const LineChart = ({
	config,
	updateAction,
	...props
}, ref) => {
	// let chartContainer = useRef(null);
	
	useEffect(() => {
		const chartRef = ref.current.getContext('2d');
		new Chart(chartRef, config);
	}, []);

	return (
		<div className='line-chart-container'>
			<canvas id="line-chart" ref={ref} />
		</div>
	);
};

export default forwardRef(LineChart);
