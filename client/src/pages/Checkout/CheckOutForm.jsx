// import React, { Fragment, useEffect, useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CLEAR_CART,
//   getCartItems,
//   getCartTotalPrice,
//   getCartTotalQuantity,
// } from "../../redux/slice/cartSlice";
// import { Popover, Transition } from "@headlessui/react";
// import { ChevronUpIcon } from "@heroicons/react/24/solid";
// import { selectEmail, selectUserId } from "../../redux/slice/authSlice";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { getShipping } from "../../redux/slice/checkoutSlice";

// export default function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const cartItems = useSelector(getCartItems);
//   const cartTotalPrice = useSelector(getCartTotalPrice);
//   const cartTotalAmount = useSelector(getCartTotalQuantity);
//   const userId = useSelector(selectUserId);
//   const userEmail = useSelector(selectEmail);
//   const shippingAddress = useSelector(getShipping);
//   const dispatch = useDispatch();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }
//   }, [stripe]);

//   const saveOrder = async () => {
//     const date = new Date();
//     const orderDate = date.toDateString();
//     const orderTime = date.toLocaleTimeString();
//     const orderConfig = {
//       userId,
//       userEmail,
//       orderDate,
//       orderTime,
//       orderAmount: cartTotalAmount,
//       orderStatus: "Order Placed...",
//       cartItems,
//       shippingAddress,
//       createdAt: Timestamp.now().toDate(),
//     };

//     try {
//       await addDoc(collection(db, "orders"), orderConfig);
//       dispatch(CLEAR_CART());
//       toast.success("Order Saved");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setMessage(null);

//   //   if (!stripe || !elements) {
//   //     return;
//   //   }

//   //   setIsLoading(true);

//   //   const confirmPayment = await stripe
//   //     .confirmPayment({
//   //       elements,
//   //       confirmParams: {
//   //         // Make sure to change this to your payment completion page
//   //         return_url: "http://localhost:5173/checkout-success",
//   //       },
//   //       redirect: "if_required",
//   //     })
//   //     .then((result) => {
//   //       if (result.error) {
//   //         toast.error(result.error.message);
//   //         setMessage(result.error.message);
//   //         return;
//   //       }
//   //       if (result.paymentIntent) {
//   //         if (result.paymentIntent.status === "succeeded") {
//   //           setIsLoading(false);
//   //           toast.success("Payment successful");
//   //           saveOrder();
//   //         }
//   //       }
//   //     });

//   //   setIsLoading(false);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const confirmPayment = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: "http://localhost:3000/checkout-success",
//       },
//       redirect: "if_required",
//     });

//     if (confirmPayment.error) {
//       toast.error(confirmPayment.error.message);
//       setMessage(confirmPayment.error.message);
//       setIsLoading(false);
//       return;
//     }

//     if (confirmPayment.paymentIntent) {
//       if (confirmPayment.paymentIntent.status === "succeeded") {
//         setIsLoading(false);
//         toast.success("Payment successful");
//         saveOrder();
//         window.location.href = "http://localhost:5173/checkout-success";
//       } else {
//         setMessage("Payment status: " + confirmPayment.paymentIntent.status);
//       }
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     // <div>
//     //   <div></div>
//     //   <div>
//     //     <form id="payment-form" onSubmit={handleSubmit}>
//     //       <PaymentElement
//     //         id="payment-element"
//     //         options={paymentElementOptions}
//     //       />
//     //       <button disabled={isLoading || !stripe || !elements} id="submit">
//     //         <span id="button-text">
//     //           {isLoading ? (
//     //             <div className="spinner" id="spinner"></div>
//     //           ) : (
//     //             "Pay now"
//     //           )}
//     //         </span>
//     //       </button>
//     //       {/* Show any error or success messages */}
//     //       {message && <div id="payment-message">{message}</div>}
//     //     </form>
//     //   </div>
//     // </div>
//     <div className="bg-white">
//       {/* Background color split screen for large screens */}
//       <div
//         className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
//         aria-hidden="true"
//       />
//       <div
//         className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
//         aria-hidden="true"
//       />

//       <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
//         <h1 className="sr-only">Order information</h1>

//         <section
//           aria-labelledby="summary-heading"
//           className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
//         >
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <h2
//               id="summary-heading"
//               className="text-lg font-medium text-gray-900"
//             >
//               Order summary
//             </h2>

//             <ul
//               role="list"
//               className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
//             >
//               {/* {cartItems.map((product) => (
//                 <li
//                   key={product.id}
//                   className="flex items-start space-x-4 py-6"
//                 >
//                   <img
//                     src={product.productImage}
//                     alt={product.productName}
//                     className="h-20 w-20 flex-none rounded-md object-cover object-center"
//                   />
//                   <div className="flex-auto space-y-1">
//                     <h3>{product.productName}</h3>
//                     <p className="text-gray-500">
//                       Amount: {product.cartQuantity}
//                     </p>
//                     <p className="text-gray-500">
//                       Unit Price: $ {product.productPrice}
//                     </p>
//                   </div>
//                   <p className="flex-none text-base font-medium">
//                     TotalPrice: ${product.productPrice * product.cartQuantity}
//                   </p>
//                 </li>
//               ))} */}
//             </ul>

//             <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
//               <div className="flex items-center justify-between">
//                 <dt className="text-gray-600">Subtotal</dt>
//                 <dd>${cartTotalPrice}</dd>
//               </div>

//               <div className="flex items-center justify-between">
//                 <dt className="text-gray-600">Shipping</dt>
//                 <dd>$15.00</dd>
//               </div>

//               <div className="flex items-center justify-between">
//                 <dt className="text-gray-600">Taxes</dt>
//                 <dd>$26.80</dd>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-6">
//                 <dt className="text-base">Total</dt>
//                 <dd className="text-base">$361.80</dd>
//               </div>
//             </dl>

//             <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
//               <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
//                 <div className="mx-auto max-w-lg">
//                   <Popover.Button className="flex w-full items-center py-6 font-medium">
//                     <span className="mr-auto text-base">Total</span>
//                     <span className="mr-2 text-base">$361.80</span>
//                     <ChevronUpIcon
//                       className="h-5 w-5 text-gray-500"
//                       aria-hidden="true"
//                     />
//                   </Popover.Button>
//                 </div>
//               </div>

//               <Transition.Root as={Fragment}>
//                 <div>
//                   <Transition.Child
//                     as={Fragment}
//                     enter="transition-opacity ease-linear duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="transition-opacity ease-linear duration-300"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                   >
//                     <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
//                   </Transition.Child>

//                   <Transition.Child
//                     as={Fragment}
//                     enter="transition ease-in-out duration-300 transform"
//                     enterFrom="translate-y-full"
//                     enterTo="translate-y-0"
//                     leave="transition ease-in-out duration-300 transform"
//                     leaveFrom="translate-y-0"
//                     leaveTo="translate-y-full"
//                   >
//                     <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
//                       <dl className="mx-auto max-w-lg space-y-6">
//                         <div className="flex items-center justify-between">
//                           <dt className="text-gray-600">Subtotal</dt>
//                           <dd>${cartTotalPrice}</dd>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <dt className="text-gray-600">Shipping</dt>
//                           <dd>$15.00</dd>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <dt className="text-gray-600">Taxes</dt>
//                           <dd>$26.80</dd>
//                         </div>
//                       </dl>
//                     </Popover.Panel>
//                   </Transition.Child>
//                 </div>
//               </Transition.Root>
//             </Popover>
//           </div>
//         </section>

//         <div className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
//           <div className="mx-auto max-w-lg lg:max-w-none">
//             <form id="payment-form" onSubmit={handleSubmit}>
//               <PaymentElement
//                 id="payment-element"
//                 options={paymentElementOptions}
//               />
//               <button
//                 disabled={isLoading || !stripe || !elements}
//                 id="submit"
//                 className="mt-3 bg-blue-800 text-white px-4 py-2 rounded-xl"
//               >
//                 <span id="button-text">
//                   {isLoading ? (
//                     <div className="spinner" id="spinner"></div>
//                   ) : (
//                     "Pay now"
//                   )}
//                 </span>
//               </button>
//               {/* Show any error or success messages */}
//               {message && <div id="payment-message">{message}</div>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { Fragment, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  getCartItems,
  getCartTotalPrice,
  getCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { selectEmail, selectUserId } from "../../redux/slice/authSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getShipping } from "../../redux/slice/checkoutSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const cartItems = useSelector(getCartItems);
  const cartTotalPrice = useSelector(getCartTotalPrice);

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(getShipping);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = async () => {
    const date = new Date();
    const orderDate = date.toDateString();
    const orderTime = date.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      orderDate,
      orderTime,
      orderAmount: cartTotalPrice,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order Saved");
    } catch (error) {
      console.error("Error saving order: ", error);
      toast.error("Failed to save order: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_LINK3}/checkout-success`,
      },
      redirect: "if_required",
    });

    if (confirmPayment.error) {
      toast.error(confirmPayment.error.message);
      setMessage(confirmPayment.error.message);
      setIsLoading(false);
      return;
    }

    if (confirmPayment.paymentIntent) {
      if (confirmPayment.paymentIntent.status === "succeeded") {
        toast.success("Payment successful");
        await saveOrder();
        window.location.href = `${process.env.REACT_APP_LINK2}/checkout-success`;
      } else {
        setMessage("Payment status: " + confirmPayment.paymentIntent.status);
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="bg-white">
      <div
        className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            ></ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>${cartTotalPrice}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>$15.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>${parseInt(cartTotalPrice * 0.15)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  ${parseInt(cartTotalPrice * 0.15) + cartTotalPrice + 15}
                </dd>
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">
                      ${parseInt(cartTotalPrice * 0.15) + cartTotalPrice + 15}
                    </span>
                    <ChevronUpIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="mx-auto max-w-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>${cartTotalPrice}</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>${parseInt(cartTotalPrice * 0.15)}</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        <div className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <form id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="mt-3 bg-blue-800 text-white px-4 py-2 rounded-xl"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
