import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import styled from "styled-components";
import Input from "../components/input";
import Button from "../components/button";
import Spinner from "../components/spinner";

import IssuesList from "../components/issues-list";

const GET_ISSUES = gql`
  query($owner: String!, $name: String!, $paginate: Int!) {
    repository(owner: $owner, name: $name) {
      issues(last: $paginate) {
        edges {
          node {
            id
            number
            title
            url
            author {
              login
            }
          }
        }
      }
    }
  }
`;

const Page = () => {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [send, setSend] = useState(false);
  const [errorOwner, setErrorOwner] = useState("");
  const [errorName, setErrorName] = useState("");
  const [paginate, setPaginate] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setName(localStorage.getItem("myNameInLocalStorage"));
  }, [owner]);

  const onChangeOwner = value => {
    localStorage.setItem("myOwnerInLocalStorage", value);
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setSend(false);
    setErrorOwner(false);
  };

  const onChangeName = value => {
    localStorage.setItem("myNameInLocalStorage", value);
    setName(localStorage.getItem("myNameInLocalStorage"));
    setSend(false);
    setErrorName(false);
  };

  const changePaginate = () => {
    setPaginate(paginate + 5);
  };

  return (
    <Container>
      <Form>
        <CustomInputOwner
          onChange={e => onChangeOwner(e.target.value)}
          value={owner || ""}
          label={"*Owner"}
          error={errorOwner}
          errorMessage="Проверьте имя пользователя/организации."
        />
        <CustomInputName
          onChange={e => onChangeName(e.target.value)}
          value={name || ""}
          label={"*Name repository"}
          error={errorName}
          errorMessage="Проверьте имя репозитория."
        />
        <Button onClick={() => setSend(true)} type="button" loading={loading}>
          Search
        </Button>
      </Form>
      {send ? (
        <Query
          query={GET_ISSUES}
          variables={{
            owner,
            name,
            paginate
          }}
        >
          {({ loading, error, data }) => {
            if (loading || error) {
              setLoading(loading);
              if (
                String(error).includes("User") ||
                String(error).includes("Organization")
              ) {
                setErrorOwner(true);
              } else if (String(error).includes("Repository")) {
                setErrorName(true);
              }
              return null;
            }
            setLoading(loading);

            return (
              <>
                <IssuesList data={data} owner={owner} name={name} />
                <CustomButton onClick={changePaginate}>More</CustomButton>
              </>
            );
          }}
        </Query>
      ) : null}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
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
`;

const CustomButton = styled(Button)`
  width: 20%;
`;
