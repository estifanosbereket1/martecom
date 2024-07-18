// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { allOrders } from "../../redux/slice/orderSlice";
// import { useSelector } from "react-redux";

// const Processing = 1;
// const orderPlaced = 7;
// const orderShipped = 5;
// const Delivered = 8;

// export default function Chart() {
//   const orders = useSelector(allOrders);
//   const arr = [];
//   orders.map((order) => {
//     const { orderStatus } = order;
//     arr.push(orderStatus);
//   });

//   console.log(arr);

//   const getOrderCount = (n, arr) => {
//     return arr.filter((item) => item == n).length;
//   };

//   console.log(getOrderCount("Processing...", arr));

//   const data = [
//     {
//       name: "Processing",
//       OrderStatus: Processing,
//       amt: getOrderCount("Processing...", arr),
//     },
//     {
//       name: "Order Placed",
//       OrderStatus: orderPlaced,
//       amt: getOrderCount("Order placed...", arr),
//     },
//     {
//       name: "Shipped",
//       OrderStatus: orderShipped,
//       amt: getOrderCount("Shipped...", arr),
//     },
//     {
//       name: "Delivered",
//       OrderStatus: Delivered,
//       amt: getOrderCount("Delivered", arr),
//     },
//   ];

//   return (
//     <BarChart
//       width={500}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip shared={false} trigger="click" />
//       <Legend />

//       <Bar dataKey="OrderStatus" fill="#82ca9d" />
//     </BarChart>
//   );
// }

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { allOrders } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

export default function Chart() {
  const orders = useSelector(allOrders);
  const arr = orders.map((order) => order.orderStatus);

  console.log(arr);

  const getOrderCount = (status, arr) => {
    return arr.filter((item) => item === status).length;
  };

  console.log(getOrderCount("Processing...", arr));

  const data = [
    {
      name: "Processing",
      amt: getOrderCount("Processing...", arr),
    },
    {
      name: "Order Placed",
      amt: getOrderCount("Order Placed...", arr),
    },
    {
      name: "Shipped",
      amt: getOrderCount("Shipped...", arr),
    },
    {
      name: "Delivered",
      amt: getOrderCount("Delivered", arr),
    },
  ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amt" fill="#82ca9d" />
    </BarChart>
  );
}
