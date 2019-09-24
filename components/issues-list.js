import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BROWN, BOX_SHADOW_GREEN, PINK, RED } from "../styles/constants";

const IssuesList = ({ data, owner, name }) => {
  const [result, setResult] = useState([]);
  const issues = data.repository.issues.edges;
  const newResult = [...result, issues];

  return (
    <Wrraper>
      <List>
        {issues.map(i => {
          const {
            node: { id, title, author, number, closed }
          } = i;

          return (
            <ul key={id}>
              <li>
                <Link
                  href={{ pathname: "/[code]", query: { owner, name, number } }}
                  as={`/${author.login}`}
                >
                  <a href={`/${author.login}`}>{title}</a>
                </Link>
                <Tag closed={closed}>{closed ? "closed" : "open"}</Tag>
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
  width: 100%;
  margin-top: 20px;
`;

const List = styled.div`
  padding: 35px;
  background: ${PINK};
  font-weight: 500;
  box-shadow: ${BOX_SHADOW_GREEN};
  margin-bottom: 20px;
  li {
    display: flex;
    align-items: center;
    a {
      color: ${BROWN};
      text-decoration: none;
      font-size: 20px;
      margin-right: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Tag = styled.span`
  font-size: 11px;
  border: ${({ closed }) =>
    closed ? `2px solid ${RED}` : `2px solid #97b088`};
  padding: 1px 3px;
  border-radius: 5px;
  color: ${({ closed }) => (closed ? RED : "#97b088")};
  font-weight: 600;
`;

export default IssuesList;
