import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RED, BOX_SHADOW_GREEN } from '../styles/constants';

const Input = ({ onChange, value, label, error, errorMessage, placeholder, ...props }) => (
  <Wrraper {...props}>
    {label && <Label>{label}</Label>}
    <StyledInput
      value={value}
      onChange={e => onChange(e)}
      error={error}
      placeholder={placeholder}
      type="text"
    />
    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </Wrraper>
);

const Wrraper = styled.div`
  width: 100%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  margin-bottom: 3px;
  font-size: 12px;
  color: #ead098;

  @media (max-width: 400px) {
    display: none;
  }
`;
const StyledInput = styled.input`
  outline: none;
  padding: 15px;
  border: 0px solid #000;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  box-shadow: ${({ error }) => (error ? `-8px 8px ${RED}` : BOX_SHADOW_GREEN)};
  &::placeholder {
    color: transparent;
  }

  @media (max-width: 400px) {
    padding: 17px;
    font-size: 18px;
    &::placeholder {
      color: #c1bdbd;
    }
  }
`;

const ErrorMessage = styled.span`
  color: ${RED};
  margin-top: 10px;
  font-size: 12px;
`;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default Input;
