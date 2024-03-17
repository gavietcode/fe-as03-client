import { useRef, useState } from "react";
import { FcManager } from "react-icons/fc";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

import "./Chatbox.css";

const Chatbox = (props) => {
  const messInputRef = useRef();
  const [messArr, setMessArr] = useState([]);

  const addMess = () => {
    const enteredMess = messInputRef.current.value;

    if (enteredMess.trim() !== "") setMessArr((mess) => [...mess, enteredMess]);
    messInputRef.current.value = "";
  };

  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addMess();
    }
  });

  const sendMessHandler = (e) => {
    e.preventDefault();
    addMess();
  };

  const clickHideHandle = () => {
    props.clickHideHandle();
  };

  const clearMessHandler = () => {
    setMessArr([]);
  };

  return (
    <section className="chatbox">
      <div className="chat_title">
        <h4>Support</h4>
        <div className="title_right">
          <button className="btn_show" onClick={clearMessHandler}>
            Chat App
          </button>
          <button className="btn-chat" onClick={clickHideHandle}>
            x
          </button>
        </div>
      </div>
      <div className="chat_content">
        {messArr &&
          messArr.map((mes, index) => (
            <p key={mes[index]} className="chat_mess">
              {mes}
            </p>
          ))}
      </div>
      <div className="chat_tool">
        <span className="chat_manager">
          <FcManager />
        </span>
        <input
          type="text"
          placeholder="What's Up"
          ref={messInputRef}
          onSubmit={sendMessHandler}
        />
        <button className="btn" onClick={sendMessHandler}>
          <IoIosSend />
        </button>
        <span className="emotion">
          <GrAttachment />
        </span>
        <span className="emotion">
          <MdOutlineEmojiEmotions />
        </span>
      </div>
    </section>
  );
};

export default Chatbox;
