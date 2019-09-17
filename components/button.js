import React from "react";
import styled from "styled-components";
import { BROWN, BOX_SHADOW_PURPLE } from "../styles/constants";
import Spinner from "../components/spinner";

const Button = ({ onClick, children, loading, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick}>
      {loading ? <Spinner /> : children}
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
  &:hover {
    background: #ec633e;
    color: #efdd47;
  }
`;

export default Button;
