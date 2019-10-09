import { gql } from 'apollo-boost';

export const GET_ISSUES = gql`
  query($owner: String!, $name: String!, $first: Int!, $states: [IssueState!]) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, states: $states) {
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
        repository(name: $name) {
          description
          forkCount
          stargazers {
            totalCount
          }
        }
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
