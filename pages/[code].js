import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_ISSUE } from '../lib/queries';
import { BROWN, BOX_SHADOW_GREEN, PINK } from '../styles/constants';
import Comments from '../components/comments';

const Page = ({ router }) => {
  const {
    query: { owner, name, number },
  } = router;

  return owner && name && number ? (
    <Query
      query={GET_ISSUE}
      variables={{
        owner,
        name,
        number: Number(number),
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error) {
          return null;
        }

        const dataIssue = data.repository.issue;
        const dataOwner = data.repository.owner;
        const { bodyHTML, title, comments } = dataIssue;

        const createMarkup = () => ({
          __html: bodyHTML,
        });

        return (
          <Wrapper>
            <Avatar src={dataOwner.avatarUrl} />
            <BlockLogin>
              <Icon src="./static/icons/owner.png" />
              <p>{dataOwner.login}</p>
            </BlockLogin>
            <Title>{title}</Title>
            <Content dangerouslySetInnerHTML={createMarkup()} />
            {comments && <Comments comments={comments.edges} />}
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
  box-shadow: ${BOX_SHADOW_GREEN};
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

Page.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Page);
