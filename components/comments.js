import React from "react";
import styled from "styled-components";
import moment from "moment";
import { PINK, BOX_SHADOW_GREEN } from "../styles/constants";

const Comments = ({ comments }) => {
  return comments.map(i => {
    const { node } = i;
    const {
      id,
      author: { login, avatarUrl },
      bodyHTML,
      publishedAt
    } = node;

    const createMarkup = () => {
      return { __html: bodyHTML };
    };
    return (
      <Comment key={id}>
        <Avatar src={avatarUrl} />
        <TextBlock>
          <Info>
            <Login>{login}</Login>
            <span>{moment(publishedAt).format("DD MMMM YYYY")}</span>
          </Info>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </TextBlock>
      </Comment>
    );
  });
};

const Comment = styled.div`
  display: flex;
  margin-top: 50px;
  background: ${PINK};
  box-shadow: ${BOX_SHADOW_GREEN};
  padding: 30px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 30px;
`;

const TextBlock = styled.div`
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #aba7a7;
  padding-bottom: 10px;
`;

const Login = styled.span`
  margin-right: 10px;
`;

export default Comments;
