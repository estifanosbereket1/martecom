import { useEffect, useState } from "react";

// import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "../../utils/constants";
import SidebarFilters from "../../components/Home/SidebarFilters";
import ProductCard from "../../components/Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, SET_PRODUCTS } from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Search from "../../components/Home/Search";
import Loader from "../../components/Loader/Loader";
import {
  FILTERED_PRODUCTS,
  selectFilteredProducts,
  SORTED_PRODUCTS,
} from "../../redux/slice/filteredSlice";
import TestFilter from "../../components/Home/TestFilter";

const Collection = ({}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // console.log(sort);

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(
      SET_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTERED_PRODUCTS({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORTED_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={`nc-PageCollection2`}>
        <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
          <div className="space-y-10 lg:space-y-14">
            {/* HEADING */}
            <div className="w-full">
              <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                Man collection
              </h2>

              <div className="lg:flex  bg-red-400 px-5  lg:justify-between lg:items-center lg:w-full lg:gap-5 lg:mt-5 ">
                <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                  <span>{filteredProducts.length}</span> products found
                </p>
                <div className="w-[60%]">
                  <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="productCategory"
                      className="block text-sm font-medium dark:text-white text-gray-700"
                    >
                      Product Category
                    </label>
                    <div className="mt-1">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-700" />
            <main>
              {/* LOOP ITEMS */}
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 xl:w-1/4 pr-4">
                  {/* <SidebarFilters /> */}
                  <TestFilter />
                </div>
                <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
                <div className="flex-1 ">
                  <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                    {products.length == 0 ? (
                      <div>No Products found</div>
                    ) : (
                      <>
                        {filteredProducts.map((item, index) => (
                          <ProductCard data={item} key={index} />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* === SECTION 5 === */}
          {/* <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" /> */}

          {/* SUBCRIBES */}
          {/* <SectionPromo1 /> */}
        </div>
      </div>
    </>
  );
};

export default Collection;
