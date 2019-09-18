import React from "react";
import styled, { css } from "styled-components";
import { BROWN, BOX_SHADOW_PURPLE, PINK } from "../styles/constants";

const Button = ({ onClick, children, loading, disabled, ...props }) => {
  return (
    <StyledButton
      {...props}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 15px 40px;
  background: #d4af60;
  border: 0px solid;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  color: ${BROWN};
  font-size: 15px;
  box-shadow: ${BOX_SHADOW_PURPLE};
  ${({ loading }) => (loading ? BtnLoading : undefined)};
  ${({ loading, disabled }) =>
    !loading &&
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

const BtnLoading = css`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  position: relative;
  color: transparent;
  transition: 0s;

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid ${PINK};
    border-right: none;
    border-bottom: none;
    border-radius: 50%;
    margin: auto;
    animation: spin 0.75s linear 0s infinite;
    content: "";
  }
`;

export default Button;
