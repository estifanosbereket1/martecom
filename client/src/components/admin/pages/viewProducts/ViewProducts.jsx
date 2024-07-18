import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import { toast } from "react-toastify";
import Table from "./Table";
import Loader from "../../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  SET_PRODUCTS,
} from "../../../../redux/slice/productSlice";
import useFetchCollection from "../../../../customHooks/useFetchCollection";

const ViewProducts = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(
      SET_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Table products={products} />
      </div>
    </>
  );
};
export default ViewProducts;
