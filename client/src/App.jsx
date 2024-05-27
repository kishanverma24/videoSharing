import { useState, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home/";
import Video from "./pages/video/Video";
import Auth from "./pages/auth/Auth";
import Search from "./pages/search/Search";
import UserContext from "../src/context/UserContext";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route exact path="/" element={<Home type="random" />} />

                <Route path="/trends" element={<Home type="trend" />} />
                <Route
                  path="/subscriptions"
                  element={user ? <Home type="sub" /> : <Home type="random" />}
                />
                <Route path="/search" element={<Search />} />

                <Route path="/signin" element={user ? <Home /> : <Auth />} />
                <Route path="/video/:videoid" element={<Video />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
