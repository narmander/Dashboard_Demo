import React, { useState } from 'react';
import styled from 'styled-components';

export const Table = ({ headerLabels = [], cellData = [], ...props }) => {
	return (
		<div className='table-container'>
			{headerLabels.map((label, headerIndex) => {
				return (
					<div  className='table-header-cell' key={headerIndex}>
						{label}
					</div>
				);
			})}
			{cellData.map((row, rowIndex) => {
				return (
					<div className='table-row' key={rowIndex} >
						{row.map((cell, cellIndex) => {
							return <div className="table-cell" key={`${rowIndex}${cellIndex}`} >{cell}</div>;
						})}
					</div>
				);
			})}
		</div>
	);
};
