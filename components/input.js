import React from "react";
import styled from "styled-components";

const Input = ({ onChange }) => {
  return <StyledInput onChange={e => onChange(e)} />;
};

const StyledInput = styled.input``;

export default Input;
