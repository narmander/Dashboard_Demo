import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
	OFF_WHITE,
	DARKEST_TEAL,
	WHITE,
	DARKER_TEAL,
	LIGHTEST_TEAL,
	PRIMARY_DARK_TEAL,
} from 'Styles/themes';

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

	const { handleInputChange, handleSubmit } = useForm(submissionAction);

	return (
		<FormStyles>
			<form onSubmit={handleSubmit}>
				<div className='input-fields-container'>
					{fields.map((fieldName, index) => {
						return (
							<input
								key={`${index}${fieldName}`}
								className='input-field'
								required
								id={fieldName}
								autoComplete='off'
								name={fieldName}
								onChange={handleInputChange}
								placeholder={fieldName}
								type={type}
							/>
						);
					})}
				</div>
				<div className='submit-button'>
					<button type='submit'>{submissionButtonText}</button>
				</div>
			</form>
		</FormStyles>
	);
};

export const FormStyles = styled.div`
	border-radius: 0.5em;
	width: 100%;
	background: linear-gradient(90deg, ${DARKEST_TEAL}, ${LIGHTEST_TEAL});

	form {
		display: flex;
		border-radius: 0.5em;
		flex-direction: column;
		justify-content: space-around;
	}

	.input-fields-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.submit-button {
		margin: 0 auto 1em auto;
	}

	input,
	button {
		font-size: 3em;
	}

	button {
		border: solid 0.1em ${DARKER_TEAL};
		font-weight: 100;
		border-radius: 0.2em;
		background: ${WHITE};
		color: ${DARKER_TEAL};
		transition: all 0.5s ease-in-out;
		cursor: pointer;

		:hover,
		:active {
			border: solid 0.1em ${WHITE};
			background: linear-gradient(90deg, ${DARKEST_TEAL}, ${LIGHTEST_TEAL});
			color: ${WHITE};
		}
	}

	.input-field {
		margin: 1em;
	}

	input {
		outline: none;
		border: solid 0.1em rgba(255, 255, 255, 0.25);
		border-radius: 0.5em;
		color: ${WHITE};
		background: none;
		text-align: center;
		transition: border 0.5s ease-in-out;
		box-shadow: none;
		height: 100%;

		::placeholder {
			color: ${WHITE};
		}

		:hover,
		:focus,
		:active {
			border: solid 0.1em ${WHITE};
		}

		@media (min-width: 1230px) {
			padding: 0.3em 0;
		}
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		cursor: pointer;
		border: solid 1px black;
		margin: 0;
	}
`;
