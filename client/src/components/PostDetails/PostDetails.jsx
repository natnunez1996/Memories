import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import "./postDetails.css";
import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, posts, searchedPosts, isLoading } = useSelector(
    (state) => state.posts
  );

  const { id } = useParams();

  //Get Mock Data to immediately render the current post
  const [tempPost, setTempPost] = useState(
    posts.find((post) => post._id === id)
  );
  const recommendedPosts = searchedPosts?.filter(
    ({ _id }) => _id !== tempPost?._id
  );

  console.log(id);

  const openPost = (_id) => {
    console.log(_id);
    navigate(`/posts/${_id}`, { replace: true });
  };

  console.log(post);
  //change global post into current post
  useEffect(() => {
    async function loadData() {
      if (id) {
        dispatch(getPost(id));
      }
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   if (tempPost) {
  //     dispatch(
  //       getPostsBySearch({ search: "none", tags: tempPost?.tags.join(",") })
  //     );
  //   }
  // }, [tempPost]);

  // if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper className="card">
      <div className="cardPostDetails">
        <div className="section">
          <Typography variant="h3" component="h2">
            {tempPost?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {tempPost?.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {tempPost?.message}
          </Typography>
          <Typography variant="h6">Created by: {tempPost?.name}</Typography>
          <Typography variant="body1">
            {moment(tempPost?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <CommentSection post={tempPost} />
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="imageSection">
          <img
            src={tempPost?.selectedFile}
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
            alt={tempPost?.title}
          />
        </div>
      </div>
      {recommendedPosts?.length ? (
        <div className="section">
          <Typography variant="h5" gutterBottom>
            {" "}
            You might also like:
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts?.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      ) : null}
    </Paper>
  );
};

export default PostDetails;
