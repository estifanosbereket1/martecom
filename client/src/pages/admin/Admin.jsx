import { Route, Routes } from "react-router-dom";
import ClassicLayout from "../../components/admin/Layout/ClassicLayout";
import {
  AddProducts,
  Home,
  Orders,
  ViewProducts,
} from "../../components/admin/pages";
import AdminOrderDetails from "../../components/admin/pages/orders/AdminOrderDetails";

const Admin = () => {
  return (
    <div className="flex gap-6 z-50">
      <ClassicLayout />
      <div className="h-fit">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="addProduct/:id" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="allProducts" element={<ViewProducts />} />
          <Route path="order-details/:id" element={<AdminOrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};
export default Admin;
