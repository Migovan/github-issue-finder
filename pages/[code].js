import React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import withData from "../lib/apollo";

const GET_ISSUE = gql`
  query($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      owner {
        id
        avatarUrl
        login
      }
      issue(number: $number) {
        title
        bodyHTML
      }
    }
  }
`;

const Page = ({ router }) => {
  const { query } = router;
  const { owner, name, number } = query;

  return (
    <Query
      query={GET_ISSUE}
      variables={{
        owner,
        name,
        number: Number(number)
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error) {
          // console.error(error);
          return null;
        }

        const dataIssue = data.repository.issue;
        const dataOwner = data.repository.owner;
        const { bodyHTML, title } = dataIssue;

        const createMarkup = () => {
          return { __html: bodyHTML };
        };

        return (
          <Wrapper>
            <Avatar src={dataOwner.avatarUrl} />
            <p>{dataOwner.login}</p>
            <Title>{title}</Title>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </Wrapper>
        );
      }}
    </Query>
  );
};

const Wrapper = styled.div`
  margin: 50px;
`;
const Title = styled.h1``;

const Avatar = styled.img``;

export default withData(withRouter(Page));
