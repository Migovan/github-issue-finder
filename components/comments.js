import React from "react";
import styled from "styled-components";

const Comments = ({ comments }) => {
  return comments.map(i => {
    const { node } = i;
    const {
      id,
      author: { login, avatarUrl },
      bodyHTML,
      publishedAt
    } = node;

    console.log("author:", login);
    const createMarkup = () => {
      return { __html: bodyHTML };
    };
    return (
      <Comment key={id}>
        <Author>
          <Avatar src={avatarUrl} />
          <p>{login}</p>
        </Author>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </Comment>
    );
  });
};

const Comment = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Avatar = styled.img`
  width: 80px;
  border-radius: 5px;
`;

const Author = styled.figure`
  margin: 0;
  width: 15%;
`;

export default Comments;
