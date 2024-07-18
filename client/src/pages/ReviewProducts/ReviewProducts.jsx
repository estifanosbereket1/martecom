import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserId, selectUserName } from "../../redux/slice/authSlice";
import { useEffect, useState } from "react";
import {
  GET_PRODUCT,
  selectProduct,
  selectProducts,
} from "../../redux/slice/productSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const ReviewProducts = () => {
  const { id } = useParams();
  console.log(id, "hhhhhhhhhhhhhh");
  const { document } = useFetchDocument("products", id);

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const products = useSelector(selectProducts);

  const product = products.find((item) => item.id === id);
  console.log(product, "pooooooooooooooooooo");

  console.log(document, "mmmmmmmmm");

  const submitReview = async (e) => {
    e.preventDefault();
    const date = new Date();
    const reviewDate = date.toDateString();

    const reviewConfig = {
      productId: id,
      userId,
      userName,
      rate,
      review,
      reviewDate,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      await addDoc(collection(db, "reviews"), reviewConfig);
      setRate(0);
      setReview("");
      toast.success("Review submitted");
    } catch (error) {
      console.error("Error saving order: ", error);
      toast.error("Failed to save order: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Review Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            You can provide your reviews about the specified product and leave a
            star rating, and also write an honest review about how you feel
            about the product.
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {document && (
          <>
            <p className="text-lg font-medium text-gray-800">
              Product Name: {document.productName}
            </p>
            <img
              src={document.productImage}
              alt={document.productName}
              className="w-80 h-80 mt-4 mb-6 object-cover rounded-lg"
            />
          </>
        )}
        <form onSubmit={submitReview} className="space-y-4">
          <div>
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700"
            >
              Rate:
            </label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Review
            </label>
            <textarea
              name="review"
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              rows="5"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewProducts;
