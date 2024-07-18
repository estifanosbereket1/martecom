const stats = [
  { name: "Total Earnings", stat: "71,897" },
  { name: "Products", stat: "58.16%" },
  { name: "Orders", stat: "24.57%" },
];

const StatCart = ({ name, value }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </dd>
    </div>
  );
};

export default function InfoBox({ totalOrder, productsAmount, orders }) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Sales details
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))} */}
        <StatCart name="Total Earnings" value={totalOrder} />
        <StatCart name="All Orders" value={orders.length} />
        <StatCart name="Products" value={productsAmount} />
      </dl>
    </div>
  );
}
