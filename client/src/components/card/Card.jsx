import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.js";
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
} from "./Card.css.jsx";

function Card({ type, video }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  const handlePostDelete = async () => {
    const text = "Are you sure?\nPress cancel to avoid deletion!";
    const confirmation = window.confirm(text);
  
    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:8800/api/video/${video.videoid}`,
          {
            method: "DELETE",
            credentials: "include", // Ensure cookies are sent with the request
          }
        );
        const data = await response.json();
        
        // Log the data to check the server response
        console.log("Server response:", data);
  
        if (data.success) {
          // Post deleted successfully, navigate to profile
          navigate("/profile");
        } else {
          console.error(data); // Log error response
          window.alert("Error while deletion");
        }
      } catch (error) {
        console.error("Error while deleting the post", error);
        window.alert("Error while deletion"); // Alert user about the error
      }
    } else {
      console.log("Deletion canceled!"); // Log cancellation
    }
  };
  

  return (
    <div className="profilevideo">
      <Container>
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
        {user.username === video.username &&
          currentPage.includes("/profile") && (
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                style={{
                  width: "60px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
                onClick={handlePostDelete}
              >
                Delete
              </button>
              <button
                style={{
                  width: "60px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                Update
              </button>
            </div>
          )}
      </Container>
    </div>
  );
}

export default Card;
