import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "../Forms/Form";
import Posts from "../Post/Posts";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleTags = (e, value) => {
    if (e.keyCode === 13) {
      setTags(value);
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className="gridContainer"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Autocomplete
                multiple
                id="tags-filled"
                options={tags}
                freeSolo
                onChange={(e, value) => handleTags(e, value)}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Search Tags" />
                )}
              />
              <Button
                onClick={searchPost}
                className="searchButton"
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className="pagination" elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
