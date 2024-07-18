// import express from "express";
// import cors from "cors";
// import Stripe from "stripe";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// dotenv.config();

// const app = express();
// const stripe = new Stripe(process.env.STRIPE_SK);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

// app.use(cors());
// app.use(express.json());

// const calculateOrderAmount = (items) => {
//   return (
//     items.reduce(
//       (total, item) => total + item.productPrice * item.cartQuantity,
//       0
//     ) * 100
//   );
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items, shipping, description, customerEmail } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//       description,
//       shipping: {
//         address: {
//           line1: shipping.line1,
//           line2: shipping.line2,
//           city: shipping.city,
//           country: shipping.country,
//           postal_code: shipping.postalCode, // Use postal_code instead of postalCode
//         },
//         name: shipping.name,
//         phone: shipping.phone,
//       },
//       receipt_email: customerEmail,
//     });

//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// const port = process.env.PORT || 4242;
// app.listen(port, () => console.log(`Node server listening on port ${port}!`));

import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.REACT_APP_STRIPE_SK);

// const whitelist = ["http://localhost:5173", "https://mart-ec.vercel.app"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());

app.use(express.json());

const arr = [];

const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { productPrice, cartQuantity } = item;
    const cartItemAmount = productPrice * cartQuantity;
    return arr.push(cartItemAmount);
  });
  const totalAmount = arr.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  console.log("Received request body:", req.body); // Add this line
  const { items, shipping, description, customerEmail } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description,
      shipping: {
        address: {
          line1: shipping.line1,
          line2: shipping.line2,
          city: shipping.city,
          country: shipping.country,
          postal_code: shipping.postalCode,
        },
        name: shipping.name,
        phone: shipping.phone,
      },
      // receipt_email: customerEmail,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Node server listening on port ${port}!`));

// module.exports = app;
