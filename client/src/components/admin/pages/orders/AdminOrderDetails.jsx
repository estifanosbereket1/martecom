import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import useFetchDocument from "../../../../customHooks/useFetchDocument";
import Loader from "../../../Loader/Loader";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { toast } from "react-toastify";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { document } = useFetchDocument("orders", id);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(document, "ppppppp");

  useEffect(() => {
    if (document) {
      setOrder(document);
    }
  }, [document]);
  console.log(order);

  if (!order) {
    return <div>Loading...</div>; // Render a loading state while the document is being fetched
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: Timestamp.now().toDate(),
    };

    try {
      await setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order Saved");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving order: ", error);
      toast.error("Failed to save order: " + error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <div className="flex-col ml-6 inline-flex  gap-8 justify-center items-start shadow-2xl mt-10 mx-6 w-auto px-6">
          <Link to="/order-history" className="flex ">
            <IoMdArrowBack size={34} className="text-black" />
            <p className="text-neutral-500"> return to order history</p>
          </Link>
          <div className="flex flex-col gap-4 my-3">
            <p className="text-neutral-500">Order Id: {order.id}</p>
            <p className="text-neutral-500">
              Order Amount: {order.orderAmount}
            </p>
            <p className="text-neutral-500">Order Status {order.orderStatus}</p>
            <p className="text-neutral-500">
              Address: {order.shippingAddress.line1} ,{" "}
              {order.shippingAddress.line2},{order.shippingAddress.city}
            </p>
            <p className="text-neutral-500">
              State: {order.shippingAddress.state}
            </p>
            <p className="text-neutral-500">
              Country: {order.shippingAddress.country}
            </p>
          </div>
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
        >
          <div className="mx-6 my-3 px-6">
            {order.cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-center space-x-4 py-6"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="h-20 w-20 flex-none rounded-md object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                  <h3>{item.productName}</h3>
                  <p className="text-gray-500">Amount: {item.cartQuantity}</p>
                  <p className="text-gray-500">
                    Unit Price: $ {item.productPrice}
                  </p>
                </div>
                <p className="flex-none text-base font-medium">
                  Total Price: ${item.productPrice * item.cartQuantity}
                </p>
              </li>
            ))}
            <div className="flex items-center">
              <form onSubmit={(e) => handleSubmit(e)}>
                <select
                  id="status"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className="block w-full rounded-md dark:bg-gray-900 dark:text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option disabled>Update Status</option>
                  <option value="Order placed...">Order Placed</option>
                  <option value="Processing...">Processing</option>
                  <option value="Shipped...">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-800 text-white rounded-xl mx-4 my-2 px-5 py-3 hover:bg-blue-600 hover:cursor-pointer"
                >
                  Update Status
                </button>
              </form>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default AdminOrderDetails;
