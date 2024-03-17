import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { clearCart, getCartTotal } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, selectUser } from "../../store/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  let { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const user = JSON.parse(localStorage.getItem("loggedIn") || "[]");

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("loggedIn");
  };

  useEffect(() => {
    dispatch(getCartTotal());
  });

  return (
    <>
      <nav>
        <button
          className="nav-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="nav-btn-wh">Home</span>
          <span className="nav-btn-wsh">Shop</span>
        </button>
        <h1>BUOTIQUE</h1>
        <div className="nav-user">
          <button className="nav-user-cart">
            <BsCart /> <p className="nav-user-amount">{totalItems}</p>
            <Link to="/cart">
              <span>Cart</span>
            </Link>
          </button>
          {!user.logged ? (
            <Link to="/login">
              <button type="button" className="nav-user-login">
                <CiUser /> Login
              </button>
            </Link>
          ) : (
            <button type="button" onClick={handleLogout}>
              <CiUser /> {user.name} Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
