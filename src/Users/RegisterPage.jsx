import { useRef } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty, checkEmail, correctPassword } from "./validate";
import axios from "axios";

const backImg = "images/banner1.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();

  const useArr = JSON.parse(localStorage.getItem("useArr"))
    ? JSON.parse(localStorage.getItem("useArr"))
    : [];

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredPhone = phoneRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const emailIsValid =
      checkEmail(enteredEmail, useArr).length === 0 && !isEmpty(enteredEmail);
    const passwordIsValid = correctPassword(enteredPassword);
    const phoneIsValid = !isEmpty(enteredPhone);

    const IsValid =
      nameIsValid && emailIsValid && passwordIsValid && phoneIsValid;

    if (!IsValid) {
      return alert("Check your mail, password");
    } else {
      try {
        // Add User
        useArr.push({
          fullname: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          phone: enteredPhone,
          address: "",
          logged: true,
        });
        const newUser = {
          ...useArr,
        };
        console.log("newUser", newUser);
        await axios.post("/auth/register", newUser);
      } catch (err) {
        console.log(err);
      }
      // Lưu vào Local Storage
      localStorage.setItem("useArr", JSON.stringify(useArr));
      alert("You have successfully registered. Please login and enjoy!!");
      navigate("/login");
      window.location.reload();
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
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            required
            placeholder="Full Name"
          />
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
          <label htmlFor="">Phone</label>
          <input
            type="number"
            name="phone"
            ref={phoneRef}
            required
            placeholder="Phone"
          />
          <div className="login-btn">
            <button type="submit">SIGN UP</button>
          </div>
          <div className="login-link">
            <span>Login? </span>
            <Link to="/login"> Click</Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegisterPage;
