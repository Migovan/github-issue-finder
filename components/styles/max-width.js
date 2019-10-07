import styled from 'styled-components';

const MaxWidth = styled.div`
  width: 60%;
  max-width: 1350px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export default MaxWidth;
