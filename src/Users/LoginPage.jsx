import { useRef } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkEmail, isEmpty } from "./validate";
import { login } from "../store/userSlice";

login;

const backImg = "images/banner1.jpg";

let allUsers = JSON.parse(localStorage.getItem("useArr"));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const userEmail = checkEmail(enteredEmail, allUsers);

    if (userEmail) {
      if (!isEmpty(enteredEmail)) {
        if (userEmail.length === 0) {
          alert("You don't have a count. Please Register");
          navigate("/register");
        } else if (userEmail[0].password !== enteredPassword) {
          passwordRef.current.value = "";
        } else {
          dispatch(login(userEmail[0]));
          localStorage.setItem("loggedIn", JSON.stringify(userEmail[0]));
          navigate("/", { state: true });
        }
      } else {
        alert("Please input valid email!");
      }
    }
  };

  return (
    <>
      <section className="login-container">
        <div className="login-pages">
          <div className="back-img">
            <img src={backImg} alt="backImg" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <p>SIGN UP</p>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            required
            placeholder="Email"
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />

          <div className="login-btn">
            <button type="submit">SIGN IN</button>
          </div>
          <div className="login-link">
            <span>Create an account? </span>
            <Link to="/register"> Click</Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginPage;
