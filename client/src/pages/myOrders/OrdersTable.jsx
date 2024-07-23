import { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ORDERS, allOrders } from "../../redux/slice/orderSlice";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "../../redux/slice/authSlice";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OrdersTable() {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const orders = useSelector(allOrders);
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  useEffect(() => {
    dispatch(ADD_ORDERS(data));
  }, [dispatch, data]);
  // console.log(orders);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userId == userId);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the order in your account including their date, order
            id, email and role.
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Status
                    </th>
                    {/* <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredOrders.length == 0 ? (
                    <td>No orders yet</td>
                  ) : (
                    <>
                      {filteredOrders.map((order, personIdx) => (
                        <tr
                          key={order.id}
                          onClick={() => handleClick(order.id)}
                        >
                          <td
                            className={classNames(
                              personIdx !== people.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                            )}
                          >
                            {order.orderDate}
                          </td>
                          <td
                            className={classNames(
                              personIdx !== people.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell"
                            )}
                          >
                            {order.id}
                          </td>
                          <td
                            className={classNames(
                              personIdx !== people.length - 1
                                ? "border-b border-gray-200"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell"
                            )}
                          >
                            ${order.orderAmount}
                          </td>
                          <td
                            className={classNames(
                              order.orderStatus == "Delivered"
                                ? "border-b border-gray-200 text-green-700"
                                : "",
                              "whitespace-nowrap px-3 py-4 text-sm text-red-500"
                            )}
                          >
                            {order.orderStatus}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
