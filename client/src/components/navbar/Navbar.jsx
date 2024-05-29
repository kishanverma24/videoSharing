import React, { useState, useContext } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  Container,
  Wrapper,
  Search,
  Input,
  Button,
  User,
  Avatar,
} from "./Navbar.css.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { user } = useContext(UserContext);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {user ? (
            <User>
              <Link to="upload" style={{ textDecoration: "none" }}>
                <Button>
                  <VideoCallOutlinedIcon />
                </Button>
              </Link>
              <Link
                to="profile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Avatar src={user.img} />
                {user.username}
              </Link>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
