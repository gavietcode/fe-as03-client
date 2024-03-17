import "./CartItem.css";
import { FaRegTrashAlt } from "react-icons/fa";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { removeFromCart, toggleCartQty } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, name, img1, price, quantity, totalPrice }) => {
  const dispatch = useDispatch();

  return (
    <div className="item-container">
      <div className="cart-item">
        <div className="cart-image">
          <img src={img1} alt={name} />
        </div>
        <div className="cart-name">
          <p>{name}</p>
        </div>
        <div className="cart-hide">
          <p>
            <FormatPrice price={price} />
          </p>
        </div>
        {/* Quantity - Or + */}
        <div className="cart-amount">
          <button
            type="buttom"
            className="btn-click"
            onClick={() => dispatch(toggleCartQty({ id: id, type: "DEC" }))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="buttom"
            className="btn-click"
            onClick={() => dispatch(toggleCartQty({ id: id, type: "INC" }))}
          >
            +
          </button>
        </div>
        <div className="cart-hide">
          <p>
            <FormatPrice price={totalPrice} />
          </p>
        </div>
        <div className="cart-delete">
          <button onClick={() => dispatch(removeFromCart(id))}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <div className="cart-total">
        <p></p>
        <div className="total-detail"></div>
      </div>
    </div>
  );
};

export default CartItem;
