// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// // import CheckoutForm from "./CheckoutForm";
// import { selectEmail } from "../../redux/slice/authSlice";
// import { getBilling, getShipping } from "../../redux/slice/checkoutSlice";
// import {
//   CALCULATE_TOTAL_PRICE,
//   CALCULATE_TOTAL_QUANTITY,
//   getCartItems,
//   getCartTotalPrice,
// } from "../../redux/slice/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import CheckOutForm from "./CheckOutForm";
// const stripePromise = loadStripe(process.env.STRIPE_PK);

// const CheckOut = () => {
//   const cartItems = useSelector(getCartItems);
//   const totalAmount = useSelector(getCartTotalPrice);
//   const customerEmail = useSelector(selectEmail);
//   const shippingAddress = useSelector(getShipping);
//   const billingAddress = useSelector(getBilling);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(CALCULATE_TOTAL_PRICE());
//     dispatch(CALCULATE_TOTAL_QUANTITY());
//   }, [dispatch, cartItems]);

//   const [message, setMessage] = useState("Initializing Checkout");
//   const [clientSecret, setClientSecret] = useState("");

//   const description = `Mark Mart payment: email: ${customerEmail}, Amount: ${totalAmount}`;

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_LINK1}/create-payment-intent`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               items: cartItems,
//               userEmail: customerEmail,
//               shipping: shippingAddress,
//               billing: billingAddress,
//               description,
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw errorData;
//         }

//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error(error);
//         setMessage("Failed to initialize checkout");
//         toast.error("Something went wrong");
//       }
//     };

//     createPaymentIntent();
//   }, [cartItems, customerEmail, shippingAddress, billingAddress, description]);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <>
//       <div>
//         <div>{!clientSecret && <h3>{message}</h3>}</div>
//       </div>
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckOutForm />
//         </Elements>
//       )}
//     </>
//   );
// };
// export default CheckOut;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CheckOutForm from "./CheckOutForm";
import { selectEmail } from "../../redux/slice/authSlice";
import { getBilling, getShipping } from "../../redux/slice/checkoutSlice";
import {
  CALCULATE_TOTAL_PRICE,
  CALCULATE_TOTAL_QUANTITY,
  getCartItems,
  getCartTotalPrice,
} from "../../redux/slice/cartSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckOut = () => {
  const cartItems = useSelector(getCartItems);
  const totalAmount = useSelector(getCartTotalPrice);
  const customerEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(getShipping);
  const billingAddress = useSelector(getBilling);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_PRICE());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const [message, setMessage] = useState("Initializing Checkout");
  const [clientSecret, setClientSecret] = useState("");

  const description = `Mark Mart payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LINK1}/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: cartItems,
              userEmail: customerEmail,
              shipping: shippingAddress,
              billing: billingAddress,
              description,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error(error);
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong");
      }
    };

    createPaymentIntent();
  }, [cartItems, customerEmail, shippingAddress, billingAddress, description]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div>
        <div>{!clientSecret && <h3>{message}</h3>}</div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </>
  );
};

export default CheckOut;
