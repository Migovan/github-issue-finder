import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RED } from '../styles/constants';

const Error = ({ children, ...props }) => <StyledError {...props}>{children}</StyledError>;

const StyledError = styled.div`
  color: ${RED};
  margin: 30px;
`;

Error.propTypes = {
  children: PropTypes.string.isRequired,
};

export default React.memo(Error);
