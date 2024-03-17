import "./Trending.css";
import { Link } from "react-router-dom";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import { STATUS } from "../../utils/status";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { openModal } from "../../store/modalSlice";

const Trendings = (product) => {
  const { img1, name, price, _id, status } = product;
  const dispatch = useDispatch();
  if (status === STATUS.ERROR) {
    return <Error />;
  }
  if (status === STATUS.LOADING) {
    return <Loader />;
  }

  return (
    <>
      <Modal />
      <Link to={`/${_id}`}>
        <div className="img-wrapper">
          <button onClick={() => dispatch(openModal())}>
            <img src={img1} alt={name} />
            <div className="content fade"></div>
            <h3>{name}</h3>
            <FormatPrice className="img-wrapper-price" price={price} />
          </button>
        </div>
      </Link>
    </>
  );
};

export default Trendings;
