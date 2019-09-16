import React from "react";
import styled from "styled-components";

const Input = ({ onChange, value }) => {
  return <StyledInput value={value} onChange={e => onChange(e)} />;
};

const StyledInput = styled.input``;

export default Input;
