import React, { FC, useState } from "react";
import facebookSvg from "../../assets/Facebook.svg";
import twitterSvg from "../../assets/Twitter.svg";
import googleSvg from "../../assets/Google.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
// import Image from "next/image";
// import Link from "next/link";

const loginSocials = [
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== Cpassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        setIsLoading(false);
        toast.success("User created successfully");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
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
        navigate("/");
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
            Register
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
              {loginSocials.map((item, index) => (
                <div
                  onClick={signinWithGoogle}
                  key={index}
                  href={item.href}
                  className="flex cursor-pointer w-full bg-blue-100 rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
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
              onSubmit={handleRegister}
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
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
                <input
                  type="password"
                  required
                  value={Cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Confirm password"
                  className={` rounded-2xl h-11 px-4 py-3  text-sm font-normal block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-blue-100 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-500 mt-1 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 `}
                />
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex disabled:cursor-not-allowed disabled:opacity-50 items-center text-center  justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
              {/* <ButtonPrimary type="submit">Continue</ButtonPrimary> */}
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Have an account? {` `}
              <a className="text-green-600" href="/signup">
                Login to your account
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
