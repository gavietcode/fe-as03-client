import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="ft-col">
          <h3>CUSTOMER SERVICE</h3>
          <div className="ft-link">
            <Link to="#">
              <p>Help & Contact Us</p>
            </Link>
            <Link to="#">
              <p>Returns & ReFunds </p>
            </Link>
            <Link to="#">
              <p>Online Stores</p>
            </Link>
            <Link to="#">
              <p>Terms & Conditions</p>
            </Link>
          </div>
        </div>
        <div className="ft-col">
          <h3>COMPANY</h3>
          <div className="ft-link">
            <Link to="#">
              <p>What We Do</p>
            </Link>
            <Link to="#">
              <p>Available Sevices</p>
            </Link>
            <Link to="#">
              <p>Latest Posts</p>
            </Link>
            <Link to="#">
              <p>FAQs</p>
            </Link>
          </div>
        </div>
        <div className="ft-col">
          <h3>SOCIAL MEDIA</h3>
          <div className="ft-link">
            <Link to="#">
              <p>Twister</p>
            </Link>
            <Link to="#">
              <p>Facebook </p>
            </Link>
            <Link to="#">
              <p>Instagram</p>
            </Link>
            <Link to="#">
              <p>Pinterest</p>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
