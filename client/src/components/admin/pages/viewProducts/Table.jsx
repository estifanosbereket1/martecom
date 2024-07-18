import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import DeleteModal from "./DeleteModal";
import Search from "../../../Home/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTERED_PRODUCTS,
  selectFilteredProducts,
} from "../../../../redux/slice/filteredSlice";
import Pagination from "../../../Pagination/Pagination";

const deleteProduct = async (id, productImage) => {
  try {
    await deleteDoc(doc(db, "products", id));
    const desertRef = ref(storage, `images/${productImage}`);
    await deleteObject(desertRef);
    toast.success("Product deleted");
  } catch (error) {
    toast.error(error.message);
  }
};

export default function Table({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchedProducts = useSelector(selectFilteredProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const indexOfLastProduct = productsPerPage * currentPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSelectedProduct = (product) => {
    setIsOpen(true);
    setSelectedProduct(product);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    dispatch(FILTERED_PRODUCTS({ products, search }));
  }, [dispatch, products, search]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              All Products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the products in your inventory including their name,
              price, category and actions.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/admin/addProducts"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add product
            </Link>
          </div>
        </div>
        <div className="lg:w-[60%] my-4">
          <p className="text-neutral-500 my-2">
            {searchedProducts.length} products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-[900px] divide-y   divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Product Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 gap-10 bg-white">
                    {currentProducts.map((product) => (
                      <tr key={product.productName}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-44 w-44 flex-shrink-0">
                              <img
                                className="h-44 w-44 "
                                src={product.productImage}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {product.productName}
                              </div>
                              {/* <div className="text-gray-500">{person.email}</div> */}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {product.productPrice}
                          </div>
                          {/* <div className="text-gray-500">{person.department}</div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {product.productCategory}
                          </span>
                        </td>
                        <td className="whitespace-nowrap flex gap-10 px-3 items-center my-[50%]  py-4 text-sm ">
                          <button
                            className="text-red-500 hover:text-red-900"
                            onClick={() => handleSelectedProduct(product)}
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/addProduct/${product.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-10">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage}
                totalProducts={searchedProducts.length}
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          deleteProduct={deleteProduct}
          selectedProduct={selectedProduct}
          onClose={onClose}
        />
      )}
    </>
  );
}
