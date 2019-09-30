import React, { useState } from 'react';
import styled from 'styled-components';
import { BROWN, PINK } from '../styles/constants';

const Filter = ({ options, onChange, ...props }) => {
  const [checked, setChecked] = useState('');

  return options.map(i => {
    const { states, name } = i;
    const init = checked === '' && states === null;

    const checkedFilter = () => {
      setChecked(states);
      onChange(states);
    };

    return (
      <Button key={states} {...props} onClick={checkedFilter} active={checked === states || init}>
        {name}
      </Button>
    );
  });
};

const Button = styled.button`
  background: ${({ active }) => (active ? PINK : 'transparent;')};
  padding: 10px 25px;
  border: 2px solid ${PINK};
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? BROWN : PINK)};
  cursor: pointer;
  outline: none;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export default Filter;
