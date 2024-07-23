import React, { FC, useState } from "react";
// import LikeButton from "./LikeButton";
import Prices from "./Prices";

import { StarIcon } from "@heroicons/react/24/solid";

import BagIcon from "./BagIcon";
import toast from "react-hot-toast";

import ProductStatus from "./ProductStatus";

import { PRODUCTS } from "../../utils/constants";
import { Transition } from "@headlessui/react";
import NcImage from "./NcImage";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/slice/cartSlice";
import NcInputNumber from "../Input/NcInputNumber";

const ProductCard = ({ className = "", data, isLiked }) => {
  const {
    productName,
    productPrice,
    productDescription,
    sizes,
    // variants,
    // variantType,
    // status,
    productImage,
    rating = 4,
    id,
    numberOfReviews = 34,
    status = "Available",
  } = data;

  // const [variantActive, setVariantActive] = useState(0);

  const notifyAddTocart = ({ size }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            Added to cart!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ size })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(id) || "product-detail",
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ size }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            width={80}
            height={96}
            src={productImage}
            alt={productName}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{size || "XL"}</span>
                </p>
              </div>
              <Prices price={productPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                // onClick={(e) => {
                //   e.preventDefault();
                //   router.push("/cart");
                // }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const dispatch = useDispatch();

  const AddToCart = (data) => {
    // console.log(data, "vvvvvvvvvvvvvvvvvvvvvv");
    dispatch(ADD_TO_CART(data));
  };

  // console.log(data, "paccc niga");

  const renderGroupButtons = (data) => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => AddToCart(data)}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to Cart</span>
        </ButtonPrimary>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              onClick={() => notifyAddTocart({ size })}
            >
              {size}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <a href={`/product-detail/${id}`} className="absolute inset-0"></a>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <a href={`/product-detail/${id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-15"
              src={productImage}
              className="object-cover w-full h-full drop-shadow-xl"
              //   fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </a>
          <ProductStatus status={status} />
          {/* <LikeButton liked={isLiked} className="absolute top-3 end-3 z-10" /> */}
          {renderGroupButtons(data)}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {/* {renderVariants()} */}

          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {productName}
            </h2>
            <div
              className="text-sm text-slate-500 dark:text-slate-400 mt-1"
              dangerouslySetInnerHTML={{ __html: productDescription }}
            />
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={productPrice} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
    </>
  );
};

export default ProductCard;
