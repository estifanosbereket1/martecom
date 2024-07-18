import React, { FC, useState } from "react";
import facebookSvg from "../../assets/Facebook.svg";
import twitterSvg from "../../assets/Twitter.svg";
import googleSvg from "../../assets/Google.svg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../firebase/config";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useSelector } from "react-redux";

const loginSocials = [
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const savedUrl = useSelector((state) => state.cart.previousURL);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setIsLoading(false);
        toast.success("Logged in successfully");
        if (savedUrl) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const provider = new GoogleAuthProvider();

  const signinWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsLoading(false);
        toast.success("Logging User .....");

        if (savedUrl) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorMessage);
        // ...
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={`nc-PageLogin `} data-nc-id="PageLogin">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Login
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
              {loginSocials.map((item, index) => (
                <div
                  key={index}
                  onClick={signinWithGoogle}
                  className="flex w-full cursor-pointer bg-blue-100 rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <img
                    className="flex-shrink-0"
                    src={item.icon}
                    alt={item.name}
                    sizes="40px"
                  />
                  <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
            {/* OR */}
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                OR
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            {/* FORM */}
            <form
              className="grid grid-cols-1 gap-6"
              action="#"
              method="post"
              onSubmit={handleLogin}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                {/* <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              /> */}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-blue-200 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-500 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 mt-1 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <a href="/reset" className="text-sm text-green-600">
                    Forgot password?
                  </a>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className={` rounded-2xl h-11 px-4 py-3  text-sm font-normal block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-blue-100 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-500 mt-1 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 `}
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center text-center  justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
              {/* <ButtonPrimary type="submit">Continue</ButtonPrimary> */}
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <a className="text-green-600" href="/register">
                Create an account
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
