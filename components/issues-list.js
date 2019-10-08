import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes, { object } from 'prop-types';
import { BOX_SHADOW_GREEN, PINK, RED } from './styles/constants';

const IssuesList = ({ issues }) => {
  const getNumberIssue = number => {
    localStorage.setItem('myNumberInLocalStorage', number);
  };

  return (
    <Wrraper>
      <List>
        {issues.map(i => {
          const {
            node: { id, title, number, closed },
          } = i;

          return (
            <ul key={id}>
              <li>
                <Link
                  href={{
                    pathname: '/[code]',
                  }}
                  as={`/issue-${number}`}
                >
                  <a
                    href={`/issue-${number}`}
                    onClick={() => getNumberIssue(number)}
                    className="font-base"
                  >
                    {title}
                  </a>
                </Link>
                <Tag isClosed={closed}>{closed ? 'closed' : 'open'}</Tag>
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
  ul {
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    a {
      margin-right: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Tag = styled.span`
  font-size: 11px;
  border: ${({ isClosed }) => (isClosed ? `2px solid ${RED}` : '2px solid #97b088')};
  padding: 1px 3px;
  border-radius: 5px;
  color: ${({ isClosed }) => (isClosed ? RED : '#97b088')};
  font-weight: 600;
`;

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(object).isRequired,
};

export default IssuesList;
