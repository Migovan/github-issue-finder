import React, { useState } from "react";
import styled from "styled-components";
import { BROWN, PINK, YELLOW } from "../styles/constants";

const Filter = ({ options, onChange, ...props }) => {
  const [checked, setChecked] = useState("");
  console.log("options:", options);
  return options.map(i => {
    return (
      <Button
        key={i.states}
        {...props}
        onClick={() => {
          setChecked(i.states);
          onChange(i.states);
        }}
        active={checked === i.states}
      >
        {i.name}
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
