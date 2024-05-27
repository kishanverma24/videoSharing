import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Containerone,
  Image,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
} from "./Home.css.jsx";
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`http://localhost:8800/api/video/${type}`);
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos &&
        videos.map((video) => (
          <Link
            key={video.videoid}
            to={`/video/${video.videoid}`}
            style={{ textDecoration: "none" }}
          >
            <Containerone type={type}>
              <Image type={type} src={video.imgUrl} />
              <Details type={type}>
                <ChannelImage type={type} src={video.img} />
                <Texts>
                  <Title>{video.title}</Title>
                  <ChannelName>{video.username}</ChannelName>
                  <Info>{video.views} views</Info>
                </Texts>
              </Details>
            </Containerone>
          </Link>
        ))}
    </Container>
  );
};

export default Home;
