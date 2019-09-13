import React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import withData from "../lib/apollo";

const GET_ISSUE = gql`
  query($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
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
          console.error(error);
          return null;
        }

        const dataIssue = data.repository.issue;
        const { bodyHTML, title } = dataIssue;

        const createMarkup = () => {
          return { __html: bodyHTML };
        };
        console.log(title);

        return (
          <Wrapper>
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

export default withData(withRouter(Page));
