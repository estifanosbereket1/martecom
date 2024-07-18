import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { Admin, Cart, Contact, Home, MyOrders, NotFound } from "./pages/index";
import { Login, Register, Reset } from "./pages/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/productDetails/ProductDetails";

import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import CheckOutDetails from "./components/CheckOut/CheckOutDetails";
import CheckOut from "./pages/Checkout/CheckOut";
import CheckOutSuccess from "./pages/Checkout/CheckOutSuccess";
import OrderDetails from "./pages/myOrders/OrderDetails";
import ReviewProducts from "./pages/ReviewProducts/ReviewProducts";
function App() {
  // console.log(import.meta.env.API_KEY);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-detail/:id" element={<ProductDetails />} />
          <Route path="/checkout-details" element={<CheckOutDetails />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout-success" element={<CheckOutSuccess />} />
          <Route path="/order-history" element={<MyOrders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-products/:id" element={<ReviewProducts />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
