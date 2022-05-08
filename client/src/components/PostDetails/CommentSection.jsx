import { Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import "./commentSection.css";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleCLick = () => {
    const finalComment = `${user?.result.name}: ${comment}`;

    setComments((prevComments) => [...prevComments, finalComment]);
    setComment("");
    sendComment(finalComment);
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendComment = (finalComment) => {
    dispatch(commentPost(finalComment, post._id));
  };

  return (
    <div>
      <div className="commentsOuterContainer">
        <div className="commentsInnerContainer">
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} variant="subtitle1">
              <strong>{comment.split(":")[0]}:</strong> {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography variant="h6" gutterBottom>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              row={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleCLick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
