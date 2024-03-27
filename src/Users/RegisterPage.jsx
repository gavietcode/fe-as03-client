import { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

const backImg = "./images/banner1.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ ...info });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/auth/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("You are  registered successfully!");
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <section className="login-container">
        <div className="login-pages">
          <div className="back-img">
            <img src={backImg} alt="backImg" />
          </div>
        </div>
        <form className="login-form">
          <p>SIGN UP</p>
          <label>Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
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
          <label>Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />
          <div className="login-btn">
            <button onClick={handleSubmit}>SIGN UP</button>
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
