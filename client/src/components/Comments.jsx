import React, { useEffect, useState,useContext } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import UserContext from "../context/UserContext";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoid }) => {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
// console.log(videoid);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/api/comments/${videoid}`, {
            method: "GET",
            credentials: "include",
          });
        // console.log(videoid);
        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, []);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        <Avatar src={user.img} />
        <Input placeholder="Add a comment..." />
        <button>Comment</button>
      </NewComment>
      {comments?.map((comment) => (
        <Comment key={comment.commentid} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
