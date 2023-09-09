import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

function Comment({ user, postId }) {
  const [comment, setComment] = useState("");

  // puttting the comments in the database
  const postComment = (e) => {
    e.preventDefault();
    if (user && user?.displayName) {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // put the targeted value empty
      setComment("");
    } else {
      // Handle the case where user or displayName is undefined
      console.error("User or displayName is undefined.");
    }
  };

  //   console.log(user?.displayName);
  return (
    <div>
      <div className="comment_section">
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Add comment..."
            className="comment_input"
            value={comment}
            style={{
              backgroundColor: "white",
            }}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="" className="post_button" onClick={postComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
