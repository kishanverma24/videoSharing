import React from "react";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext.js";
import "./Profile.css";
import Card from "../../components/card/Card.jsx";
function Profile() {
  const { user } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        `http://localhost:8800/api/video/userprofile`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        }
      );
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, [user.username]);
  return (
    <div>
      <div className="profilediv">
        <div className="h1">
          <h1>Profile</h1>
        </div>
        <hr style={{ width: "100%", marginTop: "10px" }} />

        <div className="profile">
          <h3>username : {user.username}</h3>
          <h5>fullname : {user.fullname}</h5>
          <h5>subscribers : {user.subscriberscount}</h5>
        </div>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
      <div className="profilevideocontainer">
        {videos &&
          videos.map((video) => <Card key={video._id} video={video} />)}
      </div>
    </div>
  );
}

export default Profile;
