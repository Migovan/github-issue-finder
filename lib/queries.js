import { gql } from 'apollo-boost';

export const GET_ISSUES = gql`
  query($owner: String!, $name: String!, $paginate: Int!, $states: [IssueState!]) {
    repository(owner: $owner, name: $name) {
      issues(last: $paginate, states: $states) {
        edges {
          node {
            id
            number
            title
            url
            closed
            author {
              login
            }
          }
        }
      }
    }
  }
`;

export const GET_ISSUE = gql`
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
