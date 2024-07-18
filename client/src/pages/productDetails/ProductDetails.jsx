import React, { FC, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import detail1JPG from "../../assets/products/detail1.jpg";
import detail2JPG from "../../assets/products/detail2.jpg";
import detail3JPG from "../../assets/products/detail3.jpg";
import Policy from "./Policy";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import BagIcon from "../../components/Products/BagIcon";
// import LikeButton from "../../components/LikeButton";
import NcInputNumber from "../../components/Input/NcInputNumber";
import { PRODUCTS } from "../../utils/constants";
import IconDiscount from "../../components/Products/IconDiscout";
import Prices from "../../components/Products/Prices";
import ButtonSecondary from "../../components/Button/ButtonSecondary";
import AccordionInfo from "./AccordionInfo";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, getCartItems } from "../../redux/slice/cartSlice";
import ReviewsSection from "./ReviewsSection";
import useFetchCollection from "../../customHooks/useFetchCollection";
import useFetchDocument from "../../customHooks/useFetchDocument";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log("Product ID from URL:", id); // Log the ID to ensure it's correctly extracted
  const [product, setProduct] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);

  const { document } = useFetchDocument("products", id);

  const getProduct = async () => {
    try {
      console.log("Fetching product..."); // Log to confirm function call
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()); // Log document data
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setProduct(obj);
      } else {
        console.log("No such document!"); // Log if no document found
      }
    } catch (error) {
      console.error("Error fetching document:", error); // Log errors
    }
  };

  const dispatch = useDispatch();

  const cartItems = useSelector(getCartItems);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const renderVariants = () => {
    if (!product?.variants || !product.variants.length) {
      return null;
    }

    return (
      <div>
        <label htmlFor="">
          <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
              {product.variants[variantActive].name}
            </span>
          </span>
        </label>
        <div className="flex mt-3">
          {product.variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                variantActive === index
                  ? "border-primary-6000 dark:border-primary-500"
                  : "border-transparent"
              }`}
            >
              <div
                className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover"
                style={{
                  backgroundImage: `url(${
                    typeof variant.thumbnail?.src === "string"
                      ? variant.thumbnail?.src
                      : typeof variant.thumbnail === "string"
                      ? variant.thumbnail
                      : ""
                  })`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!product?.allOfSizes || !product?.sizes || !product?.sizes.length) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size:
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="##"
            className="text-primary-6000 hover:text-primary-500"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {product.allOfSizes.map((size, index) => {
            const isActive = size === sizeSelected;
            const sizeOutStock = !product.sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  sizeOutStock
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  if (sizeOutStock) {
                    return;
                  }
                  setSizeSelected(size);
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!product?.status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (product.status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{product.status}</span>
        </div>
      );
    }
    if (product.status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{product.status}</span>
        </div>
      );
    }
    if (product.status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{product.status}</span>
        </div>
      );
    }
    if (product.status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{product.status}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    const addToCart = (product) => {
      if (!product) {
        console.error("Product is undefined");
        return;
      }
      dispatch(ADD_TO_CART(product));
    };
    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div className="space-y-7 2xl:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {product.productName}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={product.productPrice}
            />
            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>
            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{product.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">{renderVariants()}</div>
        <div className="">{renderSizeList()}</div>
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            {/* <NcInputNumber
              val={cartForRange.cartQuantity}
              cart={cartForRange}
              className="relative z-10"
            /> */}
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={() => addToCart(product)}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>
        <hr className="2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        <AccordionInfo />
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    if (!product) {
      return <div>Loading...</div>;
    }
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <div
            dangerouslySetInnerHTML={{ __html: product.productDescription }}
          />
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4.87 · 142 Reviews</span>
        </h2>
        <div className="mt-10">
          <ReviewsSection id={id} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      <main className="container mt-5 lg:mt-11 mx-12">
        <div className="lg:flex">
          <div className="w-full lg:w-[55%] ">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                <img
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src={product?.productImage}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail"
                />
              </div>
              {renderStatus()}
              {/* <LikeButton className="absolute right-3 top-3 " /> */}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <img
                      sizes="(max-width: 640px) 100vw, 33vw"
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>
          {renderDetailSection()}
          <hr className="border-slate-200 dark:border-slate-700" />
          {renderReviews()}
          <hr className="border-slate-200 dark:border-slate-700" />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
