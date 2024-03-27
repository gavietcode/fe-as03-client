import { useRef, useState } from "react";
import "./LoginPage.css";
import { Link, json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkEmail, isEmpty } from "./validate";
import { login } from "../store/userSlice";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const backImg = "./images/banner1.jpg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { data } = useFetch("http://localhost:5000/api/users");

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      ...credentials,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { userId, token, role } = result;
        JSON.stringify(localStorage.setItem("token", token));
        const findUser = data.filter((item) => {
          if (item._id === userId) {
            return item;
          }
        });

        dispatch(login(findUser[0]));
        alert(role + " logged in!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
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
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
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
