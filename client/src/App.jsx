import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  //CALL POSTS AT FIRST
  useEffect(() => {
    console.log("GETTING ALL POSTS");
    dispatch(getPosts(1));
  }, []);

  console.log(user);
  return (
    <BrowserRouter>
      <Container className="container" maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" replace />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            exact
            element={!user ? <Auth /> : <Navigate to="/posts" replace />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
