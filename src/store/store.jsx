import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import modal from "./modalSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import popupReudcer from "./popup";
import detailReducer from "./detailSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    modal,
    category: categoryReducer,
    detail: detailReducer,
    product: productReducer,
    cart: cartReducer,
    popup: popupReudcer,
    user: userReducer,
  },
});

export default store;
