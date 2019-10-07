import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import { BROWN, PINK } from './styles/constants';

const Filter = ({ options, onChange, ...props }) => {
  const [checked, setChecked] = useState('');
  const [widthElem, setWidthElem] = useState(String(null));
  const [coordinateElem, setCoordinateElem] = useState('0');
  const buttonsElem = useRef(null);

  const buttonPosition = statesChecked => {
    const index = options.findIndex(({ states }) => states === statesChecked);
    const widthFilter = buttonsElem.current.getBoundingClientRect().left;
    const distanceButton = buttonsElem.current.childNodes[
      index !== -1 ? index : 0
    ].getBoundingClientRect().left;
    const cordinateForToggle = distanceButton - widthFilter - 2;

    setCoordinateElem(String(cordinateForToggle));
  };

  useEffect(() => {
    setWidthElem(buttonsElem.current.childNodes[0].offsetWidth);
    buttonPosition();
  }, []);

  return (
    <Wrapper ref={buttonsElem}>
      {options.map(i => {
        const { states, name } = i;
        const init = checked === '' && states === null;

        const checkedFilter = e => {
          setChecked(states);
          onChange(states);
          buttonPosition(states);
          setWidthElem(String(e.offsetWidth));
        };

        return (
          <Button
            key={states}
            {...props}
            onClick={e => {
              checkedFilter(e.target);
            }}
            active={checked === states || init}
          >
            {name}
          </Button>
        );
      })}
      <Toggle widthElem={widthElem} coordinateElem={coordinateElem} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${PINK};
  position: relative;
`;

const Button = styled.button`
  z-index: 1;
  position: relative;
  background: transparent;
  padding: 10px 25px;
  border: 0px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? BROWN : PINK)};
  cursor: pointer;
  outline: none;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const Toggle = styled.div`
  height: 100%;
  width: ${({ widthElem }) => `${widthElem}px`};
  left: ${({ coordinateElem }) => `${coordinateElem}px`};
  top: 0;
  background: ${PINK};
  position: absolute;
  transition: 0.3s;
`;

Filter.propTypes = {
  options: PropTypes.arrayOf(object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
