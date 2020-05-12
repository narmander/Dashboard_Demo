import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Loading } from 'SharedComponents/Loading';
import { Table } from 'SharedComponents/Table';
import { Form } from 'SharedComponents/Form';
import { LineChart } from 'SharedComponents/LineChart';
import { DATABASE, SEED_DATA } from 'Utils';

export const Dashboard = () => {
	const [dataSet, updateData] = useState([{}]);
	const dataSetCoordinates = Object.keys(dataSet[0]);
	const dataSetValues = dataSet.map(set => Object.values(set));

	useEffect(() => {
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
		<div className='dashboard-container'>
			{dataSetCoordinates.length ? (
				<>
					<div className='main-panel'>
						<header>
							<h1>Summary Overview</h1>
							<button>Download CSV </button>
						</header>
						<LineChart  data={dataSet} dataSetLabels={dataSetCoordinates} />
					</div>
					<div className='side-panel'>
						<Table cellData={dataSetValues} headerLabels={dataSetCoordinates} />
						<Form
							fields={dataSetCoordinates}
							submissionAction={updateDatabase}
							submissionButtonText='enter data'
							type='number'
						/>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};
