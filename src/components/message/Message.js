import React from "react";
import "./message.css";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
function Message() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/messages/chat");
  };
  return (
    <div className="container" onClick={handleClick}>
      <div>
        <div className="message_title">Messages</div>
      </div>
      <div className="message_contanier">
        <div>
          <Avatar className="post_avatars" />
        </div>
        <div className="username_contanier">
          <div>username</div>
          <span style={{ fontSize: "10px" }}>time</span>
        </div>
      </div>
      <br />
      <hr />
      {/* /////// */}
      <div className="message_contanier">
        <div>
          <Avatar className="post_avatars" />
        </div>
        <div className="username_contanier">
          <div>username</div>
          <span style={{ fontSize: "10px" }}>time</span>
        </div>
      </div>
      <br />
      <hr />
      {/* /// */}
    </div>
  );
}

export default Message;
