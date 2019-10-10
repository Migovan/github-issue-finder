import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { GET_ISSUES } from '../lib/queries';
import IssuesDataContext from '../components/context/issues-data';
import Form from '../components/form';
import Button from '../components/common/button';
import IssuesList from '../components/issues-list';
import Filter from '../components/filter';
import Loader from '../components/common/loader';
import Error from '../components/common/error';
import MaxWidth from '../components/styles/max-width';

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
  const { dataIssues, setDataIssues, first, setFirst } = useContext(IssuesDataContext);

  useEffect(() => {
    setOwner(localStorage.getItem('owner'));
    setName(localStorage.getItem('name'));
  }, []);

  const handleSubmit = e => {
    setSent(true);
    e.preventDefault();
  };

  const handleFilter = useCallback(value => {
    setStates(value);
  }, []);

  const reset = () => {
    setDataIssues(null);
    setFirst(5);
    setSent(false);
    setDisabled(false);
  };

  const onChangeOwner = useCallback(e => {
    localStorage.setItem('owner', e.target.value);
    setOwner(localStorage.getItem('owner'));
    setErrorOwner(false);
    reset();
  }, []);

  const onChangeName = useCallback(e => {
    localStorage.setItem('name', e.target.value);
    setName(localStorage.getItem('name'));
    setErrorName(false);
    reset();
  }, []);

  const changeFirst = useCallback(() => {
    setFirst(first + 5);
  }, [first]);

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
      <Wrapper>
        <Form
          onSubmit={handleSubmit}
          onChangeOwner={onChangeOwner}
          onChangeName={onChangeName}
          owner={owner}
          name={name}
          errorOwner={errorOwner}
          errorName={errorName}
          disabled={disabled}
        />
        {sent || dataIssues ? (
          <>
            {dataIssues && (
              <BlockFilter>
                <Filter options={options} onChange={handleFilter} />
              </BlockFilter>
            )}
            <Query
              query={GET_ISSUES}
              variables={{
                owner,
                name,
                first,
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
                    <Button onClick={changeFirst}>More</Button>
                  </>
                );
              }}
            </Query>
          </>
        ) : null}
      </Wrapper>
    </MaxWidth>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export default Page;
