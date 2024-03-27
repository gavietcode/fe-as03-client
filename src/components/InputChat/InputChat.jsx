import axios from "axios";
import "./InputChat.css";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";

const InputChat = ({ chat, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  // Getdata from headers
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/message/${chat._id}`
        );
        console.log("Message", data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessage();
  }, [chat]);

  return (
    <>
      <div className="input-container">
        <div className="chat-header">
          <div className="follower">
            <CiUser />
            <div className="chat-body">
              {messages.map((message, key) => {
                <div
                  key={key}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>
                  {console.log(message.text)}
                  <span>{message.createdAt}</span>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputChat;
