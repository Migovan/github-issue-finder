import React from "react";
import styled from "styled-components";
import Link from "next/link";

const IssuesList = ({ data, owner, name }) => {
  const issues = data.repository.issues.edges;

  return (
    <Wrraper>
      <List>
        {issues.map(i => {
          const { node } = i;
          const { id, title, author, number } = node;

          return (
            <ul key={id}>
              <li>
                <Link
                  href={{ pathname: "/[code]", query: { owner, name, number } }}
                  as={`/${author.login}`}
                >
                  <a href={`/${author.login}`}>{title}</a>
                </Link>
              </li>
            </ul>
          );
        })}
      </List>
    </Wrraper>
  );
};

const Wrraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 30px;
  padding: 35px;
  background: #ddd8e6;
  font-weight: 500;
  box-shadow: -8px 8px rebeccapurple;
`;

const List = styled.div`
  li {
    /* list-style-type: none; */
    a {
      color: #5a2314;
      text-decoration: none;
      font-size: 20px;
    }
  }
`;

export default IssuesList;
