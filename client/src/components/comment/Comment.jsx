import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Details,
  Name,
  Date,
} from "./Comment.css.jsx";

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch(
        `http://localhost:8800/api/comments/${comment.username}`
      );
      const data = await response.json();
      setChannel(data);
    };
    fetchComment();
  }, [comment.username]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.username} <Date>1 day ago</Date>
        </Name>
        <Text>{comment.comment}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
