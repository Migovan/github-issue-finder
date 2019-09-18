import React, { useState } from "react";
import styled from "styled-components";
import { BROWN, PINK } from "../styles/constants";

const Filter = ({ options, onChange, ...props }) => {
  const [checked, setChecked] = useState("");

  return options.map(i => {
    const { states, name } = i;
    return (
      <Button
        key={states}
        {...props}
        onClick={() => {
          setChecked(states);
          onChange(states);
        }}
        active={checked === states}
      >
        {name}
      </Button>
    );
  });
};

const Button = styled.button`
  background: ${({ active }) => (active ? PINK : "transparent;")};
  padding: 10px 25px;
  border: 2px solid ${PINK};
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? BROWN : PINK)};
  cursor: pointer;
  outline: none;
  margin-right: 10px;
`;

export default Filter;
