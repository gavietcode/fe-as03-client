import "./App.css";
import { Home, Cart } from "./pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./components/Layout/Layouts";
import { Provider } from "react-redux";
import store from "./store/store";
import Shop from "./pages/ShopPage/ShopPage";
import Detail from "./pages/DetailPage/DetailPage";
import Checkout from "./pages/CheckoutPage/CheckoutPage";
import Login from "./Users/LoginPage";
import Register from "./Users/RegisterPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
