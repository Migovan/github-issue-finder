import React, { useState, useEffect } from "react";
import withData from "../lib/apollo";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Input from "../components/input";
import IssuesList from "../components/issues-list";

const GET_ISSUES = gql`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(last: 20) {
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

export default withData(props => {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [send, setSend] = useState(false);

  useEffect(() => {
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setName(localStorage.getItem("myNameInLocalStorage"));
  }, [owner]);

  const onChangeOwner = value => {
    localStorage.setItem("myOwnerInLocalStorage", value);
    setOwner(localStorage.getItem("myOwnerInLocalStorage"));
    setSend(false);
  };

  const onChangeName = value => {
    localStorage.setItem("myNameInLocalStorage", value);
    setName(localStorage.getItem("myNameInLocalStorage"));
    setSend(false);
  };

  return (
    <>
      <Input onChange={e => onChangeOwner(e.target.value)} value={owner} />
      <Input onChange={e => onChangeName(e.target.value)} value={name} />
      <button onClick={() => setSend(true)}>Search</button>
      <Query
        query={GET_ISSUES}
        variables={{
          owner,
          name
        }}
      >
        {({ loading, error, data }) => {
          if (loading || error) {
            // console.error(error);
            return null;
          }

          return <IssuesList data={data} owner={owner} name={name} />;
        }}
      </Query>
    </>
  );
});
