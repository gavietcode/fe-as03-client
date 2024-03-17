import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { fetchCategories } from "../../store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Trendings from "../Trending/Trendings";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <section className="banner">
        <img src="images/banner1.jpg" alt="banner" />
        <div className="banner-info">
          <p>NEW INSPIRATION 2020</p>
          <h2>
            20% OFF ON NEW <br /> SEASON
          </h2>
          <button
            onClick={() => {
              navigate("/shop");
            }}
          >
            Browse collections
          </button>
        </div>
      </section>
      <section className="categories">
        <p>CAREFULLY CREATED CONNECTION</p>
        <h2>BROWSE OUR CATEGORY</h2>
        <div className="categories-item">
          <Link to="/shop">
            <div className="img-wrapper">
              <img src="images/product_1.png" alt="" />
              <div className="content fade"></div>
            </div>
          </Link>
          <Link to="/shop">
            <div className="img-wrapper">
              <img src="images/product_2.png" alt="" />
              <div className="content fade"></div>
            </div>
          </Link>
        </div>
        <div className="categories-item">
          <Link to="/shop">
            <div className="img-wrapper">
              <img src="images/product_3.png" alt="" />
              <div className="content fade"></div>
            </div>
          </Link>
          <Link to="/shop">
            <div className="img-wrapper">
              <img src="images/product_4.png" alt="" />
              <div className="content fade"></div>
            </div>
          </Link>
          <Link to="/shop">
            <div className="img-wrapper">
              <img src="images/product_5.png" alt="" />
              <div className="content fade"></div>
            </div>
          </Link>
        </div>
      </section>
      <section className="trending">
        <p className="treding-para">MADE THE HARD WAY</p>
        <h1 className="trending-title">TOP TRENDING PRODUCTS</h1>
        <div className="trending-img">
          {categories.map((product) => {
            return (
              <Trendings
                key={product._id}
                {...product}
                status={categoryStatus}
              />
            );
          })}
        </div>
      </section>
      <section className="other">
        <div className="other-services">
          <div className="other-service">
            <h3>FREE SHIPPING</h3>
            <p>Free Shipping WorlWide</p>
          </div>
          <div className="other-service">
            <h3>24X7 SERVICE</h3>
            <p>Free Shipping WorlWide</p>
          </div>
          <div className="other-service">
            <h3>FESTIVAL OFFER</h3>
            <p>Free Shipping WorlWide</p>
          </div>
        </div>
        <div className="other-submits">
          <div className="other-submit">
            <h3>LET'S BE FRIENDS!</h3>
            <p>Nisi nisi tempor consiquat laboris nisi</p>
          </div>
          <div className="other-submit">
            <input type="email" placeholder="Enter your email address" />
            <button>SUBCRIBE</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
