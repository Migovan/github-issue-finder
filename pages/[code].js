import React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { BROWN, BOX_SHADOW_PURPLE, PINK } from "../styles/constants";

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
        comments(last: 10) {
          edges {
            node {
              id
              author {
                avatarUrl
                login
              }
              bodyHTML
              publishedAt
            }
          }
        }
      }
    }
  }
`;

const Page = ({ router }) => {
  const { query } = router;
  const { owner, name, number } = query;

  return owner && name && number ? (
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
          return null;
        }

        const dataIssue = data.repository.issue;
        const dataOwner = data.repository.owner;
        const { bodyHTML, title, comments } = dataIssue;
        console.log("comments:", comments);

        const createMarkup = () => {
          return { __html: bodyHTML };
        };

        return (
          <Wrapper>
            <Avatar src={dataOwner.avatarUrl} />
            <BlockLogin>
              <Icon src="./static/icons/owner.png" />
              <p>{dataOwner.login}</p>
            </BlockLogin>
            <Title>{title}.</Title>
            <Content dangerouslySetInnerHTML={createMarkup()} />
          </Wrapper>
        );
      }}
    </Query>
  ) : null;
};

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: ${BROWN};
`;

const Avatar = styled.img`
  width: 200px;
`;

const Content = styled.div`
  padding: 35px;
  background: ${PINK};
  font-weight: 500;
  box-shadow: ${BOX_SHADOW_PURPLE};
  color: ${BROWN};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: ${BROWN};
`;

const BlockLogin = styled.div`
  display: flex;
  align-items: baseline;

  p {
    color: ${BROWN};
  }
`;

export default withRouter(Page);
