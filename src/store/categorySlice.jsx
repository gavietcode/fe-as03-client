import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    catProductAll: [],
    catProductAllStatus: STATUS.IDLE,
    catProductSingle: [],
    catProductSingleStatus: STATUS.IDLE,
  },

  reducers: {
    setCategory(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategoryProductAll(state, action) {
      state.catProductAll.push(action.payload);
    },
    setCategoryStatusAll(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCategoryProductSingle(state, action) {
      state.catProductAll = action.payload;
    },
    setCategoryStatusSingle(state, action) {
      state.catProductSingleStatus = action.payload;
    },
  },
});

export const {
  setCategory,
  setStatus,
  setCategoryProductAll,
  setCategoryStatusAll,
  setCategoryProductSingle,
  setCategoryStatusSingle,
} = categorySlice.actions;

export default categorySlice.reducer;

export const fetchCategories = () => {
  // Get Category
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      // API support categories, we can use const response = await fetch(`${BASE_URL}`categories);
      const response = await fetch(`${BASE_URL}`);
      const data = await response.json();
      dispatch(setCategory(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

export const fetchProductsCategory = (categoryID, dataType) => {
  return async function fetchCategoryProductThunk(dispatch) {
    if (dataType === "all") dispatch(setCategoryProductAll(STATUS.LOADING));
    if (dataType === "single")
      dispatch(setCategoryStatusSingle(STATUS.LOADING));
    try {
      // API support for ID, we can use const response = await fetch(`${BASE_URL}`categories/$(categoryID)/products);
      const response = await fetch(`${BASE_URL}`);
      const data = await response.json();
      if (dataType === "all") {
        dispatch(setCategoryProductAll(data.slice(0, 8)));
        dispatch(setCategoryStatusAll(STATUS.IDLE));
      }
      if (dataType === "single") {
        dispatch(setCategoryProductSingle(data.slice(0, 8)));
        dispatch(setCategoryStatusSingle(STATUS.IDLE));
      }
    } catch (error) {
      if (dataType === "all") {
        dispatch(setCategoryStatusAll(STATUS.ERROR));
      }
      if (dataType === "single") {
        dispatch(setCategoryStatusSingle(STATUS.ERROR));
      }
    }
  };
};
