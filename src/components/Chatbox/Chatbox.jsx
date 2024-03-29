import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { useEffect } from "react";
import { io } from "socket.io-client";

import "./Chatbox.css";

// import InputChat from "../InputChat/InputChat";
import Conversation from "../Conversation/Conversation";
import { userChats } from "../../api/ChatRequest";
import BoxChat from "../boxchat/BoxChat";

const Chatbox = (props) => {
  let user = useSelector(selectUser) || "[]";

  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const clickHideHandle = () => {
    props.clickHideHandle();
  };

  return (
    <section className="chatbox">
      <div className="chat_title">
        <h4>Support</h4>
        <div className="title_right">
          <button className="btn_show">Chat App</button>
          <button className="btn-chat" onClick={clickHideHandle}>
            x
          </button>
        </div>
      </div>

      <div className="chat_content">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, key) => (
              <div
                key={key}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chat_form">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
        <BoxChat
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </section>
  );
};

export default Chatbox;
