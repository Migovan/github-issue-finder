import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BROWN, BOX_SHADOW_PURPLE, PINK } from "../styles/constants";

const IssuesList = ({ data, owner, name }) => {
  const [result, setResult] = useState([]);
  const issues = data.repository.issues.edges;
  const newResult = [...result, issues];

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
`;

const List = styled.div`
  padding: 35px;
  background: ${PINK};
  font-weight: 500;
  box-shadow: ${BOX_SHADOW_PURPLE};
  margin-bottom: 20px;
  li {
    a {
      color: ${BROWN};
      text-decoration: none;
      font-size: 20px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default IssuesList;
