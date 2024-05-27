import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/card/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        `http://localhost:8800/api/videos/search${query}`
      );
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(video=>(
      <Card key={video.videoid} video={video}/>
    ))}
  </Container>;
};

export default Search;
