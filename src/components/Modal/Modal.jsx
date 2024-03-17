import CloseSVG from "../../assets/close.svg";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";
import { NavLink, useParams } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { closeModal } from "../../store/modalSlice";
import FormatPrice from "../FormatPrice/FormatPrice";

const Modal = () => {
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );
  const modalState = useSelector((state) => state.modal);
  const closeModalhandle = () => dispatch(closeModal());
  const { id } = useParams();

  const singleProduct = categories.filter((product) => product._id === id);

  return (
    <>
      <div
        className={`modal-backDrop ${
          modalState.isOpen ? "modal-show" : "modal-hide"
        } `}
      ></div>
      <div
        className={`modal-container ${
          modalState.isOpen ? "modal-show" : "modal-hide"
        } `}
      >
        <div className="modal-close">
          <img
            src={CloseSVG}
            className="modal-close-img"
            alt="close-modal"
            onClick={closeModalhandle}
          />
        </div>
        <div className="modal-content">
          {singleProduct.map((product) => (
            <div key={product._id} className="modal-content-detail">
              <img src={product.img1} alt={product.name} />
              <div className="modal-content-desc">
                <h3>{product.name}</h3>
                <FormatPrice price={product.price} />
                <p>{product.long_desc}</p>
                <NavLink to="/shop">
                  <button onClick={closeModalhandle}>
                    <BsCart /> View Detail
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modal;
