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

const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      id
      avatarUrl
      name
      company
      email
      location
    }
  }
`;

const GET_ORGANIZATION = gql`
  query($login: String!) {
    organization(login: $login) {
      id
      avatarUrl
      name
      email
      location
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

        return (
          <Wrapper>
            <Title>{title}</Title>
            <Query
              query={GET_USER}
              variables={{
                login: owner
              }}
            >
              {({ loading, error, data }) => {
                if (loading || error) {
                  console.error(error);
                  return null;
                }
                const { avatarUrl, name, company, email, location } = data.user;

                return (
                  <>
                    <Avatar src={avatarUrl} />
                    <p>{name}</p>
                    <p>company: {company}</p>
                    <p>{location}</p>
                    <p>{email}</p>
                  </>
                );
              }}
            </Query>
            {/* ВРЕМЕННО!!! */}
            <Query
              query={GET_ORGANIZATION}
              variables={{
                login: owner
              }}
            >
              {({ loading, error, data }) => {
                if (loading || error) {
                  console.error(error);
                  return null;
                }

                const { avatarUrl, name, email, location } = data.organization;

                return (
                  <>
                    <Avatar src={avatarUrl} />
                    <p>{name}</p>
                    <p>{location}</p>
                    <p>{email}</p>
                  </>
                );
              }}
            </Query>
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
