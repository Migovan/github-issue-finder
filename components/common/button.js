import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { BROWN, BOX_SHADOW_GREEN, YELLOW } from '../../styles/constants';

const Button = ({ onClick, children, disabled, ...props }) => (
  <StyledButton {...props} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

const Active = css`
  &:hover {
    background: #ec633e;
    color: #efdd47;
  }
`;

const NotActive = css`
  &:hover {
    background: #ec633e;
    color: #efdd47;
  }
`;

const StyledButton = styled.button`
  padding: 15px 40px;
  background: ${YELLOW};
  border: 0px solid;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  color: ${BROWN};
  font-size: 15px;
  box-shadow: ${BOX_SHADOW_GREEN};
  ${({ disabled }) => !disabled && Active}
  ${({ disabled }) => disabled && NotActive}
`;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
