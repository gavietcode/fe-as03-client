import { useState } from "react";
import "./AddToCart.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product, stock }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = () => {
    setQty((preQty) => {
      let newQty = preQty + 1;
      return newQty;
    });
  };

  const decreaseQty = () => {
    setQty((preQty) => {
      let newQty = preQty - 1;
      if (newQty < 1) {
        return (newQty = 1);
      }
      return newQty;
    });
  };

  const addToCartHandler = () => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    navigate("/cart");
  };

  return (
    <>
      <button
        type="buttom"
        className="btn-click"
        onClick={() => decreaseQty(qty)}
      >
        -
      </button>
      <span>{qty}</span>
      <button
        type="buttom"
        className="btn-click"
        onClick={() => increaseQty(qty)}
      >
        +
      </button>
      <button
        className="click-cart btn"
        onClick={() => addToCartHandler(product)}
      >
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;
