import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { db, storage } from "../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT, selectProduct } from "../../redux/slice/productSlice";

//i will worry about it later

// if (quill) {
//   quill.setContents([]);
// }

export default function AddProductForm({ id }) {
  const initialState = {
    productName: "",
    productCategory: "",
    productPrice: 0,
    productDescription: "",
    productImage: "",
    size: "",
  };

  const detectForm = (id, f1, f2) => {
    if (id == "ADD") {
      return f1;
    }
    return f2;
  };

  const navigate = useNavigate();

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(
      id,
      { ...initialState },
      productEdit || initialState
    );
    return newState;
  });

  const { quill, quillRef } = useQuill();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          productDescription: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  // useEffect(() => {
  //   if (quill && product.productDescription) {
  //     quill.clipboard.dangerouslyPasteHTML(product.productDescription);
  //     quill.setSelection(quill.getLength());
  //   }
  // }, [quill, product.productDescription]);

  useEffect(() => {
    if (quill && product.productDescription) {
      const currentContent = quill.root.innerHTML;
      if (currentContent !== product.productDescription) {
        quill.clipboard.dangerouslyPasteHTML(product.productDescription);
        quill.setSelection(quill.getLength()); // Move the cursor to the end
      }
    }
  }, [quill, product.productDescription]);

  useEffect(() => {
    if (id === "ADD") {
      setProduct({ ...initialState });
    } else {
      dispatch(GET_PRODUCT(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== "ADD" && productEdit) {
      setProduct(productEdit);
    }
  }, [id, productEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const productCopy = { ...product };

    // Remove the size field if it is empty
    if (!productCopy.size) {
      delete productCopy.size;
    }

    try {
      addDoc(collection(db, "products"), {
        ...productCopy,
        productPrice: Number(productCopy.productPrice),
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product was Added Successfully");
      setProduct({ ...initialState });
      navigate("/admin/allProducts");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const productCopy = { ...product };

    // Remove the size field if it is empty
    if (!productCopy.size) {
      delete productCopy.size;
    }

    if (productCopy.productImage != productEdit.productImage) {
      const desertRef = ref(storage, `images/${productEdit.productImag}`);
      deleteObject(desertRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        ...productCopy,
        productPrice: Number(productCopy.productPrice),
        createdAt: productCopy.createdAt,
        updatedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product edited");
      navigate("/admin/allProducts");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setProduct({ ...initialState });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, productImage: downloadURL });
        });
        toast.success("Image uploaded successfully");
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        className="space-y-12 mx-20 my-8 divide-y divide-gray-200"
        onSubmit={detectForm(id, addProduct, editProduct)}
      >
        <div className="space-y-8  divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg dark:text-white font-medium leading-6 text-gray-900">
                {detectForm(id, "Add Product", "Edit Product")}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Fill the forms with the products available in the inventory
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm dark:text-white font-medium text-gray-700"
                >
                  Product Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    value={product.productName}
                    onChange={(e) => handleChange(e)}
                    className="block w-full dark:text-gray-700 min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6 w-[800px] ">
                <label
                  htmlFor="img"
                  className="block text-sm dark:text-white font-medium text-gray-700"
                >
                  Cover photo
                </label>
                <div className="mt-1 flex h-[300px] justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center ">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="productImage"
                        className="relative cursor-pointer text-center items-center  rounded-md dark:bg-gray-900 dark:text-white  bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="productImage"
                          name="productImage"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e)}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {product.productImage && (
                      <p className="mt-5">
                        Image found at :{" "}
                        <span>
                          <a href={product.productImage}></a>
                          {product.productImage}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productPrice"
                  className="block text-sm dark:text-white font-medium text-gray-700"
                >
                  Product Price
                </label>
                <div className="mt-1">
                  <input
                    id="productPrice"
                    name="productPrice"
                    value={product.productPrice}
                    onChange={(e) => handleChange(e)}
                    type="number"
                    className="block w-full rounded-md dark:bg-gray-900 dark:text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="productCategory"
                  className="block text-sm font-medium dark:text-white text-gray-700"
                >
                  Product Category
                </label>
                <div className="mt-1">
                  <select
                    id="productCategory"
                    name="productCategory"
                    onChange={(e) => handleChange(e)}
                    value={product.productCategory}
                    className="block w-full rounded-md dark:bg-gray-900 dark:text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Select Category</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Kitchen Appliance">Kitchen Appliance</option>
                  </select>
                </div>
              </div>

              {product.productCategory === "Clothing" && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Size
                  </label>
                  <div className="mt-1">
                    <select
                      id="size"
                      name="size"
                      value={product.size}
                      onChange={(e) => handleChange(e)}
                      className="block w-full rounded-md dark:bg-gray-900 dark:text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="sm:col-span-4">
                <label
                  htmlFor="productDescription"
                  className="block text-sm dark:text-white font-medium text-gray-700"
                >
                  Product Description
                </label>
                <div className="mt-1">
                  <div ref={quillRef} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {detectForm(id, "Add", "Edit")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
