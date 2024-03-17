import "./CheckoutPage.css";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { NavLink } from "react-router-dom";
import { getCartTotal } from "../../store/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

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
              <label htmlFor="">FULL NAME</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Full Name"
              />
            </div>
            <div className="check-input">
              <label htmlFor="">EMAIL</label>
              <input type="email" name="email" placeholder="Enter Your Email" />
            </div>
            <div className="check-input">
              <label htmlFor="">PHONE NUMBER</label>
              <input
                type="number"
                name="phone"
                placeholder="Enter Your Phone"
              />
            </div>
            <div className="check-input">
              <label htmlFor="">FULL NAME</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address"
              />
            </div>
            <div className="check-input">
              <NavLink to="/">
                <button
                  onClick={() => {
                    return alert("Checkout success!, go back home!");
                  }}
                >
                  Place order
                </button>
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
