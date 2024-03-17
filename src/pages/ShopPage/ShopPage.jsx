import Categories from "../../components/Category/Categories";
import "./ShopPage.css";
import { useState } from "react";

const ShopPage = () => {
  const [category, setCategory] = useState("all");

  const clickHandler = (e) => {
    setCategory(e.target.textContent.toLowerCase());
  };

  return (
    <>
      <section>
        <div className="container">
          <div>
            <h3>CATEGORIES</h3>
            <ul>APPLE</ul>
            <li onClick={clickHandler}>All</li>
            <h3>IPHONE & MAC</h3>
            <li onClick={clickHandler}>IPhone</li>
            <li onClick={clickHandler}>Ipad</li>
            <li onClick={clickHandler}>Macbook</li>
            <h3>WIRELESS</h3>
            <li onClick={clickHandler}>Airpod</li>
            <li onClick={clickHandler}>Watch</li>
            <h3>OTHERS</h3>
            <li onClick={clickHandler}>Mouse</li>
            <li onClick={clickHandler}>Keyboard</li>
            <li onClick={clickHandler}>Other</li>
          </div>
          <div className="product-view-sort">
            <div className="main-product">
              <div className="categories">
                <Categories category={category} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
