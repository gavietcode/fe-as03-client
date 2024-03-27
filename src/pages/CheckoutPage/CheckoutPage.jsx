import "./CheckoutPage.css";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { NavLink } from "react-router-dom";
import { getCartTotal } from "../../store/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );
  const [info, setInfo] = useState({});

  let user = useSelector(selectUser) || "[]";

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token ? token : ""}`);

    const raw = JSON.stringify({
      user: user,
      products: cartProducts,
      totalPrice: totalAmount,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/orders/create", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    alert("Order placed successfully!");
    navigate("/");
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((state) => state.cart)]);
  return (
    <>
      <section>
        <header className="check-header">
          <h1>CHECKOUT</h1>
          <h3>HOME/CART/CHECKOUT </h3>
        </header>
        <h1>BILLING DETAILS</h1>
        <div className="check-detail">
          <div className="check-inputs">
            <div className="check-input">
              <label>FULL NAME</label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter Your Full Name"
                defaultValue={user?.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="check-input">
              <label>EMAIL</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                defaultValue={user?.email}
                onChange={handleChange}
              />
            </div>
            <div className="check-input">
              <label>PHONE NUMBER</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter Your Phone"
                defaultValue={user?.phone}
                onChange={handleChange}
              />
            </div>
            <div className="check-input">
              <label>Your Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter Your Address"
                defaultValue={user?.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="check-input">
              <NavLink to="/">
                {user.email === "" ||
                user.email === undefined ||
                user.email === null ? (
                  alert("You need to login!.")
                ) : (
                  <button onClick={handleClick}>Place order</button>
                )}
              </NavLink>
            </div>
          </div>
          <div className="check-order">
            <h1>YOUR ORDER</h1>
            {cartProducts.map((item) => {
              return (
                <div className="order-item" key={item.id}>
                  <h5>{item.name}</h5>
                  <p>
                    <FormatPrice price={item.price} />*{item.quantity}
                  </p>
                </div>
              );
            })}
            <div className="order-item">
              <h3>TOTAL</h3>
              <p>
                <FormatPrice price={totalAmount} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
