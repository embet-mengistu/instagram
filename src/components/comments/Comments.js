import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";

function Comments({ username, postId }) {
  const [comments, setComments] = useState([]);
  const postComment = () => {};
  console.log(postId);

  // fetching the comments from the database
  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      // Clean up the listener when the component unmounts
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId]);

  //   console.log(comments);

  return (
    <div style={{ marginBottom: "5px" }}>
      {/* // mapping the posted comments from the database */}
      {comments.map((comment, index) => (
        <div key={index}>
          <strong>{comment.username}</strong>: {comment.text}
        </div>
      ))}
    </div>
  );
}

export default Comments;
