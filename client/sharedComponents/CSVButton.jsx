import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { ORANGE, WHITE, OFF_WHITE  } from 'Styles/themes';

export const CSVButton = () => {

	return (
		<CSVButtonStyles className='csv-button-container'>
            <button>Download CSV </button>
        </CSVButtonStyles>
	);
};

const CSVButtonStyles = styled.div`
    padding: .3em;

    button { 
        outline: none;
        cursor: pointer; 
        border-radius: .5em;
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