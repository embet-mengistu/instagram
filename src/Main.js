import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Post from "./components/post/Post";
import Message from "./components/message/Message";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import { db, auth } from "./firebase";
import Chats from "./components/message/Chats";

function Main() {
  // puting the fetched posts in z variables posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Reference to the 'posts' collection in Firestore

    db.collection("posts").onSnapshot((snapshot) => {
      // console.log(snapshot);
      // data give all the data or info in the posts collection
      // snapshot.docs: This property returns an array of document snapshots within the query result. Each document snapshot represents a document in the collection.so we only want so we map it
      // The doc.data() method retrieves the contents of the document as a plain JavaScript object.
      setPosts(
        snapshot.docs.map((doc) => ({
          // the id we made it auto generate in the firebase database
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          // mapping the fetched posts and passing the values we destructered and put it in variable post and id and pass it to post component
          element={posts?.map(({ post, id }) => (
            <Post
              // adding a key(unique identifer) makes it effiecent,will render only the new added doent refresh in everchange
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              user={user}
              postId={id}
            />
          ))}
        />
        {/* <Route path="/" element={<Post />}></Route> */}
        {/* {user ? (
          <Route path="/messages" element={<Message />} />
        ) : (
          <Navigate to="/" />
        )} */}
        {/* <Route path="/messages" element={<Message />}></Route>
        <Route path="/messages/chat" element={<Chats />}></Route> */}
      </Routes>

      <Footer user={user} />
    </div>
  );
}

export default Main;
