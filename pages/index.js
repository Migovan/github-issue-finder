import React, { useState, useEffect, useContext } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Input from '../components/common/input';
import Button from '../components/common/button';
import IssuesList from '../components/issues-list';
import Filter from '../components/filter';
import Loader from '../components/common/loader';
import Error from '../components/common/error';
import MaxWidth from '../components/styles/max-width';
import { GET_ISSUES } from '../lib/queries';
import IssuesDataContext from '../components/context/issues-data';

const options = [
  {
    name: 'All',
    states: null,
  },
  {
    name: 'Closed',
    states: 'CLOSED',
  },
  {
    name: 'Open',
    states: 'OPEN',
  },
];

const Page = () => {
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [errorOwner, setErrorOwner] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [states, setStates] = useState(null);
  const { dataIssues, setDataIssues, paginate, setPaginate } = useContext(IssuesDataContext);

  useEffect(() => {
    setOwner(localStorage.getItem('myOwnerInLocalStorage'));
    setName(localStorage.getItem('myNameInLocalStorage'));
  }, [owner]);

  const handleSubmit = e => {
    setSent(true);
    e.preventDefault();
  };

  const reset = () => {
    setDataIssues(null);
    setPaginate(5);
    setSent(false);
    setDisabled(false);
  };

  const onChangeOwner = value => {
    localStorage.setItem('myOwnerInLocalStorage', value);
    setOwner(localStorage.getItem('myOwnerInLocalStorage'));
    setErrorOwner(false);
    reset();
  };

  const onChangeName = value => {
    localStorage.setItem('myNameInLocalStorage', value);
    setName(localStorage.getItem('myNameInLocalStorage'));
    setErrorName(false);
    reset();
  };

  const changePaginate = () => {
    setPaginate(paginate + 5);
  };

  const errorProcessing = error => {
    setDisabled(true);
    switch (true) {
      case !owner && !name:
        setErrorOwner(true);
        setErrorName(true);
        return null;
      case !owner:
        setErrorOwner(true);
        return null;
      case !name:
        setErrorName(true);
        return null;
      case String(error).includes('401'):
        return <Error>Please update token.</Error>;
      default:
        return <Error>Nothing found for your request.</Error>;
    }
  };

  return (
    <MaxWidth>
      <Container>
        <Form onSubmit={e => handleSubmit(e)}>
          <CustomInputOwner
            onChange={e => onChangeOwner(e.target.value)}
            value={owner || ''}
            label="*Owner"
            placeholder="owner"
            error={errorOwner}
            errorMessage="Required field."
          />
          <CustomInputName
            onChange={e => onChangeName(e.target.value)}
            value={name || ''}
            label="*Name repository"
            placeholder="name repository"
            error={errorName}
            errorMessage="Required field."
          />
          <CustomSearchButton type="submit" disabled={disabled}>
            Search
          </CustomSearchButton>
        </Form>
        {sent || dataIssues ? (
          <>
            {dataIssues && (
              <BlockFilter>
                <Filter options={options} onChange={value => setStates(value)} />
              </BlockFilter>
            )}
            <Query
              query={GET_ISSUES}
              variables={{
                owner,
                name,
                paginate,
                states,
              }}
            >
              {({ loading, error, data }) => {
                if (error) {
                  return errorProcessing(error);
                }
                if (loading) {
                  return <CustomLoader />;
                }

                const issues = data.repository.issues.edges;

                if (!issues.length > 0) {
                  setDisabled(true);
                  return <Error>Nothing found for your request.</Error>;
                }

                setDataIssues(data);

                return (
                  <>
                    <IssuesList issues={issues} />
                    <CustomButton onClick={changePaginate}>More</CustomButton>
                  </>
                );
              }}
            </Query>
          </>
        ) : null}
      </Container>
    </MaxWidth>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomInputOwner = styled(Input)`
  margin-bottom: 15px;
`;

const CustomInputName = styled(Input)`
  margin-bottom: 20px;
`;

const Form = styled.form`
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

const CustomButton = styled(Button)``;

const BlockFilter = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 400px) {
    margin-top: 50px;
  }
`;

const CustomLoader = styled(Loader)`
  margin-top: 100px;
`;
