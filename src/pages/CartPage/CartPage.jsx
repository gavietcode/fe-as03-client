import "./CartPage.css";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import { CiGift } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../../store/cartSlice";
import { useEffect } from "react";
import FormatPrice from "../../components/FormatPrice/FormatPrice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((state) => state.cart)]);

  if (cartProducts.length === 0) {
    return (
      <div>
        <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
          No Cart in Here
        </h3>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="cart-container">
          <div className="cart-pages">
            <p>Image</p>
            <p>Product</p>
            <p className="cart-hide">Price</p>
            <p>Quantity</p>
            <p className="cart-hide">Total</p>
            <p>Remove</p>
          </div>
          <div className="cart-total">
            <h3>CART TOTAL</h3>
            <div className="cart-item">
              <h3>SUBTOTAL</h3>
              <p>
                <FormatPrice price={totalAmount} />
              </p>
            </div>
            <div className="cart-item">
              <h3>TOLTAL</h3>
              <p>
                <FormatPrice price={totalAmount} />
              </p>
            </div>
            <div className="cart-coupon">
              <input
                type="text"
                name="cuopon"
                placeholder="Please input is 'Fun123'"
              />
              <button>
                <CiGift /> Apply Coupon
              </button>
            </div>
          </div>
        </div>

        <div className="cart-items">
          {cartProducts.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-clear-shop">
          <NavLink to="/shop">
            <button>Continue Shopping</button>
          </NavLink>
          <NavLink to="/checkout">
            <button>Check Out</button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default CartPage;
