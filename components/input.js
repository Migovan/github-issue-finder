import React from "react";
import styled from "styled-components";

const Input = ({ onChange, value, label, error, errorMessage, ...props }) => {
  return (
    <Wrraper {...props}>
      {label && <span>{label}</span>}
      <StyledInput value={value} onChange={e => onChange(e)} error={error} />
      {errorMessage && <span>{errorMessage}</span>}
    </Wrraper>
  );
};

const Wrraper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 3px;
    font-size: 12px;
    color: #a09e9eb0;
  }
`;
const StyledInput = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  border: ${({ error }) => (error ? "2px solid #ff0000b0" : "1px solid #000")};
  cursor: pointer;
  font-size: 15px;
  color: #000;
`;

export default Input;
