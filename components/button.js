import React from "react";
import styled from "styled-components";

const Button = ({ onClick, children, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick}>
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
  color: #5a2314;
  font-size: 15px;
  box-shadow: -8px 8px rebeccapurple;
  &:hover {
    background: #ec633e;
    color: #efdd47;
  }
`;

export default Button;
