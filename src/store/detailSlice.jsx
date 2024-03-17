import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    data: [],
    isDetail: false,
  },
  reducers: {
    setDetailData(state, action) {
      state.data = action.payload;
    },
    setIsDetail(state, action) {
      state.isDetail = action.payload;
    },
  },
});

export const { setDetailData, setIsDetail } = detailSlice.actions;
export default detailSlice.reducer;
