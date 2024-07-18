import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const OrderDetails = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);
  const [order, setOrder] = useState(null);

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

  return (
    <div>
      <div className="flex-col ml-6 inline-flex  gap-8 justify-center items-start shadow-2xl mt-10 mx-6 w-auto px-6">
        <Link to="/order-history" className="flex ">
          <IoMdArrowBack size={34} className="text-black" />
          <p className="text-neutral-500"> return to order history</p>
        </Link>
        <div className="flex flex-col gap-4 my-3">
          <p className="text-neutral-500">Order Id: {order.id}</p>
          <p className="text-neutral-500">Order Amount: {order.orderAmount}</p>
          <p className="text-neutral-500">Order Status {order.orderStatus}</p>
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
              <Link
                to={`/review-products/${item.id}`}
                className="bg-blue-800 text-white rounded-xl mx-4 my-2 px-5 py-3 hover:bg-blue-600 hover:cursor-pointer"
              >
                Review Product
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default OrderDetails;
