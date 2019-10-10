import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { GET_ISSUE } from '../lib/queries';
import { BOX_SHADOW_GREEN, PINK } from '../components/styles/constants';
import separateNumber from '../lib/separate-number';
import Loader from '../components/common/loader';
import Error from '../components/common/error';
import Comments from '../components/comments';
import MaxWidth from '../components/styles/max-width';

const Page = () => {
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    setOwner(localStorage.getItem('owner'));
    setName(localStorage.getItem('name'));
    setNumber(localStorage.getItem('myNumberInLocalStorage'));
  }, []);

  return (
    <MaxWidth>
      <Wrapper>
        {owner && name && number ? (
          <Query
            query={GET_ISSUE}
            variables={{
              owner: localStorage.getItem('owner'),
              name: localStorage.getItem('name'),
              number: Number(number),
            }}
          >
            {({ loading, error, data }) => {
              if (error) {
                return <CustomError>Something went wrong.</CustomError>;
              }
              if (loading) {
                return <CustomLoader />;
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
                <>
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
                            <p>{`Star ${separateNumber(totalCount)}`}</p>
                          </div>
                        )}
                        {forkCount && (
                          <div>
                            <Icon src="./static/icons/fork.png" />
                            <p>{`Fork ${separateNumber(forkCount)}`}</p>
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
                </>
              );
            }}
          </Query>
        ) : null}
      </Wrapper>
    </MaxWidth>
  );
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
  margin-right: 8px;
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
    margin-bottom: 10px;
  }
`;

const CustomLoader = styled(Loader)`
  margin-top: 100px;
`;

const CustomError = styled(Error)`
  text-align: center;
  font-size: 25px;
`;

export default Page;
