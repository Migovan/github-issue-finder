import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from './common/input';
import Button from './common/button';

const Form = ({
  onSubmit,
  onChangeOwner,
  onChangeName,
  owner,
  name,
  errorOwner,
  errorName,
  disabled,
}) => (
  <StyledForm onSubmit={onSubmit}>
    <CustomInputOwner
      onChange={onChangeOwner}
      value={owner || ''}
      label="*Owner"
      placeholder="owner"
      error={errorOwner}
      errorMessage="Required field."
    />
    <CustomInputName
      onChange={onChangeName}
      value={name || ''}
      label="*Name repository"
      placeholder="name repository"
      error={errorName}
      errorMessage="Required field."
    />
    <CustomSearchButton type="submit" disabled={disabled}>
      Search
    </CustomSearchButton>
  </StyledForm>
);

const CustomInputOwner = styled(Input)`
  margin-bottom: 15px;
`;

const CustomInputName = styled(Input)`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const CustomSearchButton = styled(Button)`
  @media (max-width: 400px) {
    width: 100%;
    padding: 18px 40px;
    font-size: 18px;
    margin-top: 8px;
  }
`;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeOwner: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errorOwner: PropTypes.bool.isRequired,
  errorName: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(Form);
