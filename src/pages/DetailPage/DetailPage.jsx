import "./DetailPage.css";
import { Link, useParams } from "react-router-dom";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { fetchCategories } from "../../store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { STATUS } from "../../utils/status";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import AddToCart from "../../components/AddToCart/AddToCart";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const stock = 300;

  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoryStatus === STATUS.ERROR) {
    return <Error />;
  }
  if (categoryStatus === STATUS.LOADING) {
    return <Loader />;
  }
  const productOld = categories.find((product) => product._id === id);
  const relatedProduct = categories.filter(
    (product) => product.category === product.category
  );

  let idProduct = productOld._id;

  const product = {
    id: idProduct,
    category: productOld.category,
    img1: productOld.img1,
    img2: productOld.img2,
    img3: productOld.img3,
    img4: productOld.img4,
    long_desc: productOld.long_desc,
    name: productOld.name,
    short_desc: productOld.short_desc,
    price: productOld.price,
  };

  return (
    <>
      <section>
        {product && (
          <div className="detail-page" key={product.id}>
            <div className="detail-product">
              <div className="detail-small-img">
                <img src={product.img1} alt={product.name} />
                <img src={product.img2} alt={product.name} />
                <img src={product.img3} alt={product.name} />
                <img src={product.img4} alt={product.name} />
              </div>
              <div className="detail-big-img">
                <img src={product.img1} alt={product.name} />
              </div>
              <div className="detail-long-desc">
                <div className="detail-title">
                  <h3>{product.name}</h3>
                  <FormatPrice price={product.price} />
                </div>
                <p className="detail-desc">{product.short_desc}</p>
                <h3>CATEGORY: {product.category}</h3>
                <div className="cart-btn">
                  {stock > 0 && <AddToCart product={product} stock={stock} />}
                </div>
              </div>
            </div>
            <div className="short-desc">
              <button className="detail-btn btn">DESCRIPTION</button>
              <h2>PRODUCT DESCTIPTION</h2>
              <p>ĐẶC ĐIỂM NỔI BẬT</p>
              <p>{product.long_desc}</p>
            </div>
            <div className="related-img">
              {relatedProduct.map((related) => {
                return (
                  <div className="related-wrapper" key={related._id}>
                    <Link to="/shop">
                      <img src={related.img1} alt={related.name} />
                      <div className="content fade"></div>
                      <h3>{related.name}</h3>
                      <FormatPrice
                        className="related-wrapper-price"
                        price={related.price}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DetailPage;
