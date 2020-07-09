import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Loading } from 'SharedComponents/Loading';
import { Table } from 'SharedComponents/Table';
import { Form } from 'SharedComponents/Form';
import { LineChart } from 'SharedComponents/LineChart';
import { CSVButton } from 'SharedComponents/CSVButton';
import { DATABASE, SEED_DATA } from 'Utils';
import { GlobalStyles } from 'Styles/globalStyles';
import { DARKEST_TEAL } from 'Styles/themes';

export const Dashboard = () => {
	const [dataSet, updateData] = useState([{}]);
	const dataSetCoordinates = Object.keys(dataSet[0]);
	const dataSetValues = dataSet.map(set => Object.values(set));

	useEffect(() => {
		// create inital database
		if (!localStorage.hasOwnProperty(DATABASE)) {
			localStorage.setItem(DATABASE, JSON.stringify(SEED_DATA));
		}
		updateData(JSON.parse(localStorage.getItem(DATABASE)));
	}, []);

	function updateDatabase(entries) {
		const database = JSON.parse(localStorage[DATABASE]);
		database.push(entries);
		updateData(database);
		localStorage.setItem(DATABASE, JSON.stringify(database));
	}

	return (
		<DashboardStyles>
			<GlobalStyles />
			<div className='dashboard-container'>
				{dataSetCoordinates.length ? (
					<>
						<div className='header'>
							<header>
								<h1>Summary Overview</h1>
								<CSVButton />
							</header>
						</div>
						<div className='top-panel'>
							<div className='form-container'>
								<Form
									fields={dataSetCoordinates}
									submissionAction={updateDatabase}
									submissionButtonText='enter data ↵'
									type='number'
								/>
							</div>
							<div className='top-graph-container'>
								<LineChart
									data={dataSet}
									dataSetCoordinates={dataSetCoordinates}
								/>
							</div>
						</div>
						<div className='bottom-panel'>
							<div className='bottom-graph-container'>
								<div className='graph'>
									<Table
										cellData={dataSetValues}
										headerLabels={dataSetCoordinates}
									/>
								</div>
								<div className='graph'>
									<LineChart
										data={dataSet}
										dataSetCoordinates={dataSetCoordinates}
									/>
								</div>
							</div>

							<div className='bottom-graph-container'>
								<div className='graph'>
									<LineChart
										data={dataSet}
										dataSetCoordinates={dataSetCoordinates}
									/>
								</div>
								<div className='graph'>
									<LineChart
										data={dataSet}
										dataSetCoordinates={dataSetCoordinates}
									/>
								</div>
							</div>
						</div>
					</>
				) : (
					<Loading />
				)}
			</div>
		</DashboardStyles>
	);
};

export const DashboardStyles = styled.div`
	margin: 1em;

	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-family: 'Saira Condensed', sans-serif;
		font-weight: 700;
		font-size: 2rem;

		h1 {
			color: ${DARKEST_TEAL};
		}
	}

	.dashboard-container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.form-container,
	.top-graph-container,
	.graph {
		margin: 2em auto;
	}

	.top-panel {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		@media (min-width: 800px) {
			flex-direction: row;
		}
	}

	.form-container {
		min-width: 20%;
		max-height: 50em;
		overflow-y: scroll;
		overflow-x: hidden;
		width: 50%;

		@media (min-width: 800px) {
			width: 25%;
		}
	}

	.top-graph-container {
		min-width: 60%;
		width: 50%;
		
		@media (min-width: 800px) {
			width: 70%;
		}
	}

	.bottom-panel {
		width: 100%;
		display: flex;

		flex-direction: column;
		justify-content: space-around;
	}

	.bottom-graph-container {
		display: flex;
		flex-direction: column;

		align-items: flex-start;

		@media (min-width: 600px) {
			flex-direction: row;
			justify-content: space-around;
		}
	}

	.graph {
		height: 35em;
		border: 1px solid blue;
		min-width: 80%;
		overflow-y: scroll;
		overflow-x: hidden;

		@media (min-width: 600px) {
			min-width: 40%;
			max-width: 40%;
		}
	}
`;
