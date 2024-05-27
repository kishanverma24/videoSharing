import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../../components/Comments.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  fetchSuccess } from "../../redux/videoSlice.js";
import Recommendation from "../../components/Recommendation.jsx";
import {
  Container,
  Content,
  VideoWrapper,
  Title,
  Details,
  Info,
  Buttons,
  Button,
  Hr,
  Channel,
  ChannelInfo,
  Image,
  ChannelDetail,
  ChannelName,
  ChannelCounter,
  Description,
  Subscribe,
  VideoFrame,
} from "./Video.css.jsx";

const Video = () => {
  const dispatch = useDispatch();

  const [channel, setChannel] = useState({});
  const [currentVideo, setCurrentvideo] = useState({});
  const { videoid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await fetch(
          `http://localhost:8800/api/video/find/${videoid}`
        );
        const videoResdata = await videoRes.json();
        setCurrentvideo(videoResdata);

        dispatch(fetchSuccess(videoResdata));
      } catch (err) {}
    };
    fetchData();
  }, [videoid, dispatch]);

  const handleLike = () => {
    console.log("liked the video");
  };
  const handleDislike = () => {
    console.log("Disliked the video");
  };
  const handleSub = () => {
    console.log("Disliked the video");
  };
  //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="75%"
            height="400"
            src="https://www.youtube.com/embed/NoxxY2UX9Hg?si=IfjXdeoe4HMWJ8x"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <h1>hello there</h1>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo.views} views •</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?.username) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?.username) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
        </Channel>
        <Hr />
        {/* <Comments videoid={} /> */}
      </Content>
      {/* <Recommendation tags={} /> */}
    </Container>
  );
};

export default Video;
