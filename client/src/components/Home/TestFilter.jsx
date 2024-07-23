import { useEffect, useState } from "react";

import { Dialog, Disclosure, Menu } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  FILTER_BY_CAT,
  FILTER_BY_PRICE,
  FILTERED_PRODUCTS,
  selectFilteredProducts,
  SORTED_PRODUCTS,
} from "../../redux/slice/filteredSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
  SET_PRICES,
  SET_PRODUCTS,
} from "../../redux/slice/productSlice";
import ProductCard from "../Products/ProductCard";
import Loader from "../Loader/Loader";
import Search from "./Search";
import Slider from "rc-slider";
import ButtonPrimary from "../Button/ButtonPrimary";
import Pagination from "../Pagination/Pagination";

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TestFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const [price, setPrice] = useState(7000);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const indexOfLastProduct = productsPerPage * currentPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // console.log(filteredProducts);
  useEffect(() => {
    dispatch(
      SET_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(SET_PRICES({ products: data }));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, data, price]);

  useEffect(() => {
    dispatch(FILTERED_PRODUCTS({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORTED_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  const filtersMap = [
    "All",
    ...new Set(products.map((product) => product.productCategory)),
  ];

  const key = process.env.REACT_APP_LINK2;
  // console.log(key, "iiiiiiiiiiiiiiiiiiiiiiiiiiiii");

  const filterProductsByCat = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CAT({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setPrice(maxPrice);
  };

  // console.log(filtersMap, "ggggggggggggggggggggggggggggg");

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-white dark:bg-gray-900">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <Dialog.Backdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <Dialog.Panel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform dark:bg-gray-900 flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-500 ">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md dark:bg-gray-900 dark:text-white bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {filtersMap.map((cat, index) => (
                      <li
                        key={index}
                        className="dark:hover:text-gray-500 dark:text-white"
                      >
                        <button
                          type="button"
                          className={`${
                            category == cat
                              ? "bg-gray-400 px-5 py-3 rounded-3xl  "
                              : ""
                          } my-2`}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 px-2">
                    <h1>price</h1>
                    <p>{`$${price}`}</p>
                    <div>
                      <input
                        type="range"
                        name="productPrice"
                        id="productPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        max={maxPrice}
                        min={minPrice}
                      />
                    </div>
                  </div>

                  <div className=" mt-4 px-2">
                    <ButtonPrimary
                      onClick={clearFilters}
                      children="Clear filters"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>

          <main className="mx-auto dark:bg-gray-900 max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-4xl font-bold mt-5  tracking-tight text-gray-900 dark:text-white">
              New Arrivals
            </h1>
            <div className="md:flex md:items-center lg:flex lg:flex-row md:justify-between border-b border-gray-200 pb-6 pt-14 sm:flex sm:flex-col sm:gap-[10px] ">
              <h1 className="lg:text-xl sm:text-sm md:text-left  tracking-tight text-gray-900 dark:text-white">
                {filteredProducts.length} Products found
              </h1>

              <div className="lg:w-[60%] my-4 ">
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <select
                  id="sort"
                  name="sort"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                  className="block w-full rounded-md dark:bg-gray-900 dark:text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Sort by</option>
                  <option value="Latest">Latest</option>
                  <option value="HighestPrice">Highest Price</option>
                  <option value="LowestPrice">Lowest Price</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b dark:text-white  border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {filtersMap.map((cat, index) => (
                      <li key={index} className="dark:hover:text-gray-500">
                        <button
                          type="button"
                          className={`${
                            category == cat
                              ? "bg-gray-400 px-5 py-3 rounded-3xl  "
                              : ""
                          }`}
                          onClick={() => filterProductsByCat(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <h1>price</h1>
                    <p>{`$${price}`}</p>
                    <div>
                      <input
                        type="range"
                        name="productPrice"
                        id="productPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        max={maxPrice}
                        min={minPrice}
                      />
                    </div>
                  </div>

                  <div className=" mt-4">
                    <ButtonPrimary
                      onClick={clearFilters}
                      children="Clear filters"
                    />
                  </div>
                </form>

                <div className="lg:col-span-3">
                  <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
                  <div className="flex-1 ">
                    <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                      {products.length == 0 ? (
                        <div>No Products found</div>
                      ) : (
                        <>
                          {currentProducts.map((item, index) => (
                            <ProductCard data={item} key={index} />
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <div className="mb-10">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
          />
        </div>
      </div>
    </>
  );
}
