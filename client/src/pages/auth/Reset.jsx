import React, { FC, useState } from "react";
import facebookSvg from "../../assets/Facebook.svg";
import twitterSvg from "../../assets/Twitter.svg";
import googleSvg from "../../assets/Google.svg";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/Loader/Loader";

// import Image from "next/image";
// import Link from "next/link";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setIsLoading(false);
        toast.success("Check email for password reset");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={`nc-PageLogin `} data-nc-id="PageLogin">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Reset Password
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            {/* FORM */}
            <form
              className="grid grid-cols-1 gap-6"
              action="#"
              method="post"
              onSubmit={resetPassword}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>

                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-blue-200 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-500 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 mt-1 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center text-center  justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Reset Password
              </button>
              {/* <ButtonPrimary type="submit">Continue</ButtonPrimary> */}
            </form>
            {/* ==== */}
            <div className="flex justify-between ">
              <span className="block text-center text-neutral-700 dark:text-neutral-300">
                <a className="text-green-600" href="/login">
                  Login
                </a>
              </span>
              <span className="block text-center text-neutral-700 dark:text-neutral-300">
                <a className="text-green-600" href="/register">
                  Register
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
