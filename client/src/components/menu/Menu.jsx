import React, { useContext } from "react";
import VideoShare from "../../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  Container,
  Wrapper,
  Logo,
  Img,
  Item,
  Hr,
  Login,
  Button,
  Title,
} from "./Menu.css.jsx";

const Menu = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async (e) => {
    try {
      console.log("button clicked");
      const response = await fetch("http://localhost:8800/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success == true) {
        setUser("");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log("Client Error", error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={VideoShare} />
            VideoShare
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>

        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!user && (
          <>
            <Login>
              Sign in to Like,Comment and Subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF VideoShare</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        {user && (
          <Item>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                width: "100%",
                height:"30px",
                cursor:"pointer"
              }}
            >
              Logout
            </button>
          </Item>
        )}

        <Hr />
      </Wrapper>
    </Container>
  );
};

export default Menu;
