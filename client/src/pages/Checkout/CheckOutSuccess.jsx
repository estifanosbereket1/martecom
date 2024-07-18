import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
const CheckOutSuccess = () => {
  return (
    <div className="my-60">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-3 justify-center">
          <MdVerified size={32} className="text-green-600" />
          <p className="text-4xl text-neutral-600 font-bold">
            Than you for your purchase
          </p>
        </div>
        <Link
          to="/order-history"
          className=" mt-3 px-5 py-2 bg-blue-900 text-white rounded-xl"
        >
          Order History
        </Link>
      </div>
    </div>
  );
};
export default CheckOutSuccess;
