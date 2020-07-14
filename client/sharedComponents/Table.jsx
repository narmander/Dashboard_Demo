import React, { useState } from 'react';
import styled from 'styled-components';
import {
	WHITE,
	OFF_WHITE,
	LIGHT_TEAL,
	DARKER_TEAL,
	BLACK,
} from 'Styles/themes';
import { DARK_TEAL } from '../styles/themes';

export const Table = ({ cellData = [[]], ...props }) => {
	const dataSetValues = cellData.map(set => Object.values(set));
	return (
		<TableStyles className='table-container'>
			<div className='table-header'>
				{Object.keys(cellData).map((label, headerIndex) => {
					return (
						<div className='table-header-cell' key={headerIndex}>
							<h4>{label}</h4>
						</div>
					);
				})}
			</div>

			{dataSetValues.map((row, rowIndex) => {
				return (
					<div className='table-row' key={rowIndex}>
						{row.map((cell, cellIndex) => {
							return (
								<div className='table-cell' key={`${rowIndex}${cellIndex}`}>
									{cell}
								</div>
							);
						})}
					</div>
				);
			})}
		</TableStyles>
	);
};

// add delete row option

export const TableStyles = styled.div`
	display: flex;
	flex-direction: column;
	background: ${WHITE};
	border: 3px solid ${DARKER_TEAL};
	border-radius: 1em;
	overflow: hidden;
	text-align: center;
	overflow-y: scroll;
	height: 98%;

	.table-header {
		display: flex;
		justify-content: space-evenly;
		order: 1;
		border-bottom: 1px solid ${DARKER_TEAL};
		background: ${DARKER_TEAL};
		color: ${OFF_WHITE};
		text-transform: lowercase;
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		font-size: 1.5rem;
	}

	.table-header-cell {
		background: ${DARKER_TEAL};
		margin: 0.5em auto;
		width: 25%;
	}

	.table-row {
		display: flex;
		font-size: 1.5rem;
		color: ${BLACK};
		justify-content: space-evenly;
		order: 2;
	}

	.table-cell {
		width: 25%;
		border: 1px solid ${DARKER_TEAL};
	}
`;
