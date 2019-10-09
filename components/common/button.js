import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { BOX_SHADOW_GREEN, YELLOW } from '../styles/constants';

const Button = ({ onClick, children, disabled, ...props }) => (
  <StyledButton {...props} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

const Active = css`
  &:hover {
    background: #dcc28c;
  }
`;

const NotActive = css`
  cursor: default;
  opacity: 0.7;
  &:hover {
    background: ${YELLOW};
  }
`;

const StyledButton = styled.button`
  padding: 15px 40px;
  background: ${YELLOW};
  border: 0px solid;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  font-size: 15px;
  box-shadow: ${BOX_SHADOW_GREEN};
  ${({ disabled }) => (!disabled ? Active : NotActive)}
`;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default React.memo(Button);
