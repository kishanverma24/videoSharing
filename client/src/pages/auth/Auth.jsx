import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
  Input,
  Button,
  More,
  Links,
  Link,
} from "./Auth.css.jsx";
const Auth = () => {
  const [loginusername, setLoginsername] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loginuserpassword, setLoginuserpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginusername,
          loginuserpassword,
        }),
      });
      const data = await response.json();
      console.log(data.success);
      if (data.success == false) {
        window.alert(data.message);
        setLoginsername("");
        setLoginuserpassword("");
        navigate("/signin");
      }

      if (data.success == true) {
        console.log(data);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          userpassword,
          email,
          fullname,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("Error while sign up!", error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>SignIn</Title>
        <Input
          value={loginusername}
          placeholder="username"
          onChange={(e) => setLoginsername(e.target.value)}
        />
        <Input
          value={loginuserpassword}
          type="password"
          placeholder="password"
          onChange={(e) => setLoginuserpassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>

        <hr style={{ width: "100%" }} />
        <Title>SignUp</Title>
        <Input
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          value={fullname}
          placeholder="full name"
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          value={userpassword}
          type="password"
          placeholder="password"
          onChange={(e) => setUserpassword(e.target.value)}
        />
        <Button onClick={handlesignup}>Sign up</Button>
      </Wrapper>
      <More>
        Lucknow(INDIA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Auth;
