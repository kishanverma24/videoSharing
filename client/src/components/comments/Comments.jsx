import React, { useEffect, useState,useContext } from "react";
import Comment from "../../components/comment/Comment.jsx";
import UserContext from "../../context/UserContext";
import {Container,NewComment,Avatar,Input} from  "./Comments.css.jsx";

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
        <button style={{backgroundColor:"red",border:"none",marginBottom:"20px"}}>Comment</button>
      </NewComment>
      {comments?.map((comment) => (
        <Comment key={comment.commentid} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
