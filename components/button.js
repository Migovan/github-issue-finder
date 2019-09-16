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
  padding: 5px 20px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #000;
    color: #fff;
  }
`;

export default Button;
