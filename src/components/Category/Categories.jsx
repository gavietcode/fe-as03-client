import { STATUS } from "../../utils/status";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { fetchCategories } from "../../store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../Product/Product";

const Categories = ({ category }) => {
  const dispatch = useDispatch();

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

  const prodCategory = (category) => {
    if (categories && category !== "all")
      return categories.filter((cat) => cat.category === category);
    if (categories && category === "all") return categories;
  };

  return (
    <>
      <div className="trending-img">
        {prodCategory(category) &&
          prodCategory(category).map((product) => (
            <div key={product._id} onClick={() => {}}>
              <Product {...product} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Categories;
