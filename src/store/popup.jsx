import { createSlice } from "@reduxjs/toolkit";

const initialPopupState = {
  isShowPopup: false,
  isShowChatbox: false,
};
const popupSlice = createSlice({
  name: "showPopup",
  initialState: initialPopupState,
  reducers: {
    showPopup(state) {
      state.isShowPopup = true;
    },
    hidePopup(state) {
      state.isShowPopup = false;
    },
    showChatbox(state) {
      state.isShowChatbox = true;
    },
    hideChatbox(state) {
      state.isShowChatbox = false;
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;
