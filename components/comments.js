import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes, { object } from 'prop-types';
import { PINK, BOX_SHADOW_GREEN } from './styles/constants';

const Comments = ({ comments }) =>
  comments.map(i => {
    const { node } = i;
    const {
      id,
      author: { login, avatarUrl },
      bodyHTML,
      publishedAt,
    } = node;

    const createMarkup = () => ({
      __html: bodyHTML,
    });
    return (
      <Comment key={id} className="font-base">
        <Avatar src={avatarUrl} />
        <TextBlock>
          <Info>
            <Login>{login}</Login>
            <Date>{moment(publishedAt).format('DD MMMM YYYY')}</Date>
          </Info>
          <MainContent dangerouslySetInnerHTML={createMarkup()} />
        </TextBlock>
      </Comment>
    );
  });

const Comment = styled.div`
  display: flex;
  margin-top: 50px;
  background: ${PINK};
  box-shadow: ${BOX_SHADOW_GREEN};
  padding: 30px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin: 0 30px 15px 0;
`;

const TextBlock = styled.div`
  width: 80%;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  border-bottom: 1px solid #aba7a7;
  padding-bottom: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const MainContent = styled.p`
  margin-top: 10px;
`;

const Login = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const Date = styled.time`
  font-weight: 100;
  font-size: 15px;
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(object).isRequired,
};

export default React.memo(Comments);
