import { css } from 'styled-components';
import { BROWN } from './constants';

const fonts = css`
  h1 {
    font-size: 30px;
    margin: 0;
    @media screen and (min-width: 375px) {
      font-size: calc(23px + 17 * ((100vw - 375px) / 625));
    }

    @media screen and (min-width: 1000px) {
      font-size: 40px;
    }
  }

  h1,
  p,
  li,
  span,
  input {
    color: ${BROWN};
  }

  p {
    margin: 0;
  }

  .font-base {
    font-size: 16px;

    @media screen and (min-width: 375px) {
      font-size: calc(14px + 4 * ((100vw - 375px) / 625));
    }

    @media screen and (min-width: 1000px) {
      font-size: 18px;
    }
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
`;

export default fonts;
