import React from "react";
import styled, { css } from "styled-components";
import { BROWN, BOX_SHADOW_GREEN, PINK, YELLOW } from "../styles/constants";

const Button = ({ onClick, children, disabled, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

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
  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background: #ec633e;
        color: #efdd47;
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      cursor: default;
    `}
`;

export default Button;
