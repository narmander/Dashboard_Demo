import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ORANGE, WHITE, OFF_WHITE } from 'Styles/themes';

export const CSVButton = ({ headerLabels = [], cellData = [[]] }) => {
	const [CSV, updateCSV] = useState('data:text/csv;charset=utf-8,');

	useEffect(() => {
		let result = CSV;
		let ctr = 0;
		result += headerLabels.join(',');
		result += '\n';

		cellData.forEach(item => {
			ctr = 0;
			for (let key in item) {
				if (ctr > 0) result += ',';
				result += item[key];
				ctr++;
			}
            result += '\n';
            updateCSV(result);
		});
		updateCSV(result);
	}, [cellData]);

	return (
		<CSVButtonStyles className='csv-button-container'>
			<a download='Data.csv' href={CSV}>
			<button>Download CSV</button>
            </a>
		</CSVButtonStyles>
	);
};

const CSVButtonStyles = styled.div`
	padding: 0.3em;

	button {
		outline: none;
		cursor: pointer;
		border-radius: 0.5em;
		padding: 1em;
		font-weight: 700;
		font-size: 1.7rem;
		background: ${ORANGE};
		color: ${WHITE};
		z-index: -1;
		transition: all 0.5s ease-in-out;
		border: solid 0.1em ${OFF_WHITE};

		:hover,
		:active {
			border: solid 0.1em ${ORANGE};
			background: ${WHITE};
			color: ${ORANGE};
		}
	}
`;
