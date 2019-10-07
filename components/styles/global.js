import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background: #5c9f96;
    ${fonts}
    margin: 0;
  }
`;
