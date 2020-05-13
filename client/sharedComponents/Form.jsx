import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Form = ({
	fields = [],
	submissionAction,
	submissionButtonText = 'submit',
	type = 'text',
	value,
	...props
}) => {
	const useForm = submissionActionCallback => {
		const [inputs, setInputs] = useState({});

		const handleSubmit = event => {
			event.preventDefault();

			submissionActionCallback(inputs);
		};

		const handleInputChange = event => {
			event.persist();

			setInputs(inputs => ({
				...inputs,
				[event.target.name]: Number(event.target.value),
			}));
		};

		return {
			handleInputChange,
			handleSubmit,
		};
	};

	const {  handleInputChange, handleSubmit } = useForm(submissionAction);

	return (
		<form onSubmit={handleSubmit}>
			{fields.map((fieldName, index) => {
				return (
					<div className='input-field' key={`${index}${fieldName}`}>
						<label htmlFor={fieldName}>
							<input
								name={fieldName}
								onChange={handleInputChange}
								placeholder={fieldName}
								type={type}
							/>
						</label>
					</div>
				);
			})}
			<button
				type='submit'
				className='submit-button'>
				{submissionButtonText}
			</button>
		</form>
	);
};
