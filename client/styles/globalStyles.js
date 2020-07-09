import styled, { css, createGlobalStyle } from 'styled-components';
import { OFF_WHITE } from 'Styles/themes';

// resetting browser default styles
export const GlobalStyles = createGlobalStyle`

html, body {
    overflow-x: hidden; 
    min-width: 540px;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0px;
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5,h6,p,ul,li {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
    font-size:  62.5%;
  }

body {
    font-family: 'Inter', sans-serif;
    background-color: ${OFF_WHITE};
  }

  img {
      width: 100%;
  }

  button {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;

    :active {
      transform: translateY(9px);
    }

  }

`;
