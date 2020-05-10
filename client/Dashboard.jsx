import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Loading } from 'SharedComponents/Loading';
import { Table } from 'SharedComponents/Table';
import { Form } from 'SharedComponents/Form';
import { DATABASE, SEED_DATA } from 'Utils';

export const Dashboard = () => {
	const [dataSet, updateData] = useState(SEED_DATA);

	useEffect(() => {
		if (!localStorage.hasOwnProperty(DATABASE)) {
			localStorage.setItem(DATABASE, JSON.stringify(dataSet));
		}
	}, []);

	function normalizeData() {
		const dataKeys = Object.keys(dataSet[0]);
		const dataValues = [];
		dataSet.forEach(set => {
			dataValues.push(Object.values(set));
		});
		return { dataKeys, dataValues };
	}

	function updateDatabase(entries) {
			const database = JSON.parse(localStorage[DATABASE]);
			database.push(entries);
			updateData(database);
			localStorage.setItem(DATABASE, JSON.stringify(database));
	}

	return (
		<div className='dashboard-container'>
			<div className='main-panel'>
				<header>
					<h1>Summary Overview</h1>
					<button>Download CSV </button>
				</header>
				<div className='line-chart'>--------^------</div>
			</div>
			<div className='side-panel'>
				{dataSet ? (
					<>
						<Table
							cellData={normalizeData().dataValues}
							headerLabels={normalizeData().dataKeys}
						/>
						<Form
							fields={['x', 'y1', 'y2']}
							submissionAction={updateDatabase}
							submissionButtonText="enter data"
							type="number"
						/>
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};
