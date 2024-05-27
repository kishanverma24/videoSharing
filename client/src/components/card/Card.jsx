import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Image,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
} from "./Card.css.jsx";
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await fetch(
        `http://localhost:8800/api/users/${video.username}`
      );
      const data = await response.json();

      setChannel(data);
    };
    fetchChannel();
  }, []);

  return (
    <Link to={`/video/${video.videoid}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{video.username}</ChannelName>
            <Info>{video.views} views</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
