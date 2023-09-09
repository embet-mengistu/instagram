import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import "./chat.css";
import { useNavigate } from "react-router-dom";

function Chats() {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/messages");
  };
  return (
    <div className="Chats_container">
      <div className="Chats">
        <div onClick={handleclick}>
          <ArrowBackIosIcon style={{ marginTop: "15px" }} />
        </div>

        <div className="message_contanier">
          <div>
            <Avatar className="post_avatars" />
          </div>
          <div className="username_contanier">
            <div>username</div>
          </div>
        </div>
      </div>
      <div className="message_container">
        <div>
          <Avatar className="post_avatars" />
        </div>
        <div className="message">
          <p>hiiiii</p>
        </div>
      </div>
      <br />
      <div className="usermessage">
        <p>hii how u been</p>
      </div>
    </div>
  );
}

export default Chats;
