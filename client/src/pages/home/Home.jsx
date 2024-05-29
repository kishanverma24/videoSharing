import React, { useEffect, useState } from "react";
import {Container} from "./Home.css.jsx"
import Card from "../../components/card/Card.jsx";
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`http://localhost:8800/api/video/${type}`, {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
    </Container>
  );
};

export default Home;
