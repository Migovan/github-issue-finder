import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_ISSUE } from '../lib/queries';
import { BOX_SHADOW_GREEN, PINK } from '../components/styles/constants';
import Comments from '../components/comments';
import MaxWidth from '../components/styles/max-width';

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
        const { avatarUrl, repository } = dataOwner;
        const {
          description,
          forkCount,
          stargazers: { totalCount },
        } = repository;

        const { bodyHTML, title, comments } = dataIssue;

        const createMarkup = () => ({
          __html: bodyHTML,
        });

        return (
          <MaxWidth>
            <Wrapper>
              <DeatailOwner>
                <Avatar src={avatarUrl} />
                <DetailInfo>
                  <Description>{description}</Description>
                  <Block>
                    <div>
                      <Icon src="./static/icons/owner.png" />
                      <p>{`${owner}/${name}`}</p>
                    </div>
                    {totalCount && (
                      <div>
                        <Icon src="./static/icons/star.png" />
                        <p>{`Star ${totalCount}`}</p>
                      </div>
                    )}
                    {forkCount && (
                      <div>
                        <Icon src="./static/icons/fork.png" />
                        <p>{`Fork ${forkCount}`}</p>
                      </div>
                    )}
                  </Block>
                </DetailInfo>
              </DeatailOwner>
              <Title>{title}</Title>
              {bodyHTML && (
                <Content dangerouslySetInnerHTML={createMarkup()} className="font-base" />
              )}
              {comments && <Comments comments={comments.edges} />}
            </Wrapper>
          </MaxWidth>
        );
      }}
    </Query>
  ) : null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  margin-bottom: 20px;
  max-width: 400px;
`;
const Title = styled.h1`
  margin-bottom: 20px;
  line-height: 1.2;
`;

const DeatailOwner = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 60px;
  background: #ddd8e6;
  box-shadow: -8px 8px #04695f;
  padding: 30px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 30px;

  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  padding: 35px;
  background: ${PINK};
  font-weight: 500;
  box-shadow: ${BOX_SHADOW_GREEN};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-size: 13px;
  }
`;

Page.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Page);
