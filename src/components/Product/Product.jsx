import "./Product.css";
import { Link } from "react-router-dom";
import FormatPrice from "../FormatPrice/FormatPrice";

const Product = (product) => {
  const { img1, name, price, _id } = product;

  return (
    <>
      <Link to={`/detail/${_id}`}>
        <div className="product-wrapper product-zoomout">
          <img src={img1} alt={name} />
          <div className="content fade"></div>
          <h3>{name}</h3>
          <FormatPrice className="product-wrapper-price" price={price} />
        </div>
      </Link>
    </>
  );
};

export default Product;
