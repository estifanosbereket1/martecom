import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../../../InformationBox/InfoBox";
import {
  ADD_ORDERS,
  allOrders,
  CALC_TOTAL_ORDERS,
  totalOrders,
} from "../../../../redux/slice/orderSlice";
import {
  selectProducts,
  SET_PRODUCTS,
} from "../../../../redux/slice/productSlice";
import useFetchCollection from "../../../../customHooks/useFetchCollection";
import { useEffect } from "react";
import Chart from "../../../Chart/Chart";

const Home = () => {
  const totalOrder = useSelector(totalOrders);
  const products = useSelector(selectProducts);
  const orders = useSelector(allOrders);
  const productsAmount = products.length;
  const dispatch = useDispatch();
  const { data } = useFetchCollection("products");
  const fData = useFetchCollection("orders");

  useEffect(() => {
    dispatch(
      SET_PRODUCTS({
        products: data,
      })
    );
    dispatch(ADD_ORDERS(fData.data));
    dispatch(CALC_TOTAL_ORDERS());
  }, [dispatch, data, fData]);

  return (
    <div>
      <div>
        <InfoBox
          totalOrder={totalOrder}
          productsAmount={productsAmount}
          orders={orders}
        />
      </div>
      <div className="mt-10 flex flex-col gap-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Order Status Chart
        </h3>
        <Chart />
      </div>
    </div>
  );
};
export default Home;
