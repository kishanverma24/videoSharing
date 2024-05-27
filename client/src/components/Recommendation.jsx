import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/card/Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
console.log(tags);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        `http://localhost:8800/api/videos/tags?tags=${tags}}`
      );
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video.videoid} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
