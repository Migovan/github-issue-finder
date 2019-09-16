import React from "react";
import styled from "styled-components";
import Link from "next/link";

const IssuesList = ({ data, owner, name }) => {
  const issues = data.repository.issues.edges;

  return (
    <Wrraper>
      <h3>Issues</h3>
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

const Wrraper = styled.div``;

const List = styled.div``;

export default IssuesList;
