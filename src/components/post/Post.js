import React from "react";
import Avatar from "@mui/material/Avatar";
import "./post.css";
import Comment from "../comments/Comment";
import Comments from "../comments/Comments";

function Post({ username, caption, imageUrl, user, postId }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="home ">
      <div className="post_div">
        <div>
          <div className="post_header">
            <div>
              <Avatar className="post_avatar" />
            </div>
            <p> {capitalizeFirstLetter(username)}</p>
          </div>
          {/* <div className="post_image"> */}
          <img src={imageUrl} className="post_image" />
          {/* </div> */}
        </div>
        <div
          style={{
            padding: "5px",
          }}
        >
          <div>
            <div>
              <strong style={{ fontSize: "18px" }}>
                {" "}
                {capitalizeFirstLetter(username)}:
              </strong>{" "}
              {caption}
            </div>
          </div>
          <br />
          <Comments username={username} postId={postId} />
          {user ? <Comment postId={postId} user={user} /> : <h3></h3>}
        </div>
      </div>
    </div>
  );
}

export default Post;
