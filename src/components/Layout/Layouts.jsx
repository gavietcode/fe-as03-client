import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookMessenger } from "react-icons/fa";
import { popupActions } from "../../store/popup";
import Chatbox from "../Chatbox/Chatbox";

const Layouts = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.popup.isShowChatbox);

  const clickShowHandle = () => {
    if (isShow === false) {
      dispatch(popupActions.showChatbox());
    } else {
      dispatch(popupActions.hideChatbox());
    }
  };

  const clickHideHandle = () => {
    dispatch(popupActions.hideChatbox());
  };

  return (
    <>
      <NavBar />
      <Outlet />
      <button
        style={{
          fontSize: "4rem",
          border: "none",
          backgroundColor: "none",
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          color: "rgb(83, 0, 160)",
        }}
        onClick={clickShowHandle}
      >
        <FaFacebookMessenger />
      </button>
      {isShow && <Chatbox clickHideHandle={clickHideHandle} />}
      <Footer />
    </>
  );
};

export default Layouts;
