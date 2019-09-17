import React from "react";
import styled from "styled-components";
import { BROWN, RED, BOX_SHADOW_PURPLE } from "../styles/constants";

const Input = ({ onChange, value, label, error, errorMessage, ...props }) => {
  return (
    <Wrraper {...props}>
      {label && <Label>{label}</Label>}
      <StyledInput value={value} onChange={e => onChange(e)} error={error} />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrraper>
  );
};

const Wrraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.span`
  margin-bottom: 3px;
  font-size: 12px;
  color: #ead098;
`;
const StyledInput = styled.input`
  outline: none;
  padding: 15px;
  border: 0px solid #000;
  cursor: pointer;
  font-size: 15px;
  color: ${BROWN};
  font-weight: 500;
  box-shadow: ${({ error }) => (error ? `-8px 8px ${RED}` : BOX_SHADOW_PURPLE)};
`;

const ErrorMessage = styled.span`
  color: ${RED};
  margin-top: 10px;
  font-size: 12px;
`;

export default Input;
