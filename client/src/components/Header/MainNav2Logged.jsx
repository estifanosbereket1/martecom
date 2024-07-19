import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar/MenuBar";
import Navigation from "./Navigation";
import { FaCartShopping } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, selectIsLoggedIn } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import AdminOnlyRoute from "../AdminOnlyRoute/AdminOnlyRoute";
import { AdminOnlyLink } from "../AdminOnlyRoute/AdminOnlyRoute";
import martecomlogo from "../../assets/mylogo.png";

import {
  CALCULATE_TOTAL_QUANTITY,
  getCartItems,
  getCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const MainNav2Logged = () => {
  const [dark, setDark] = useState(true);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const totalItems = useSelector(getCartTotalQuantity);
  const cartItems = useSelector(getCartItems);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.displayName == null) {
          const un = user.email.substring(0, user.email.indexOf("@"));
          const userName = un.charAt(0).toUpperCase() + un.slice(1);
          setName(userName);
          console.log(name);
        } else {
          setName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : name,
            userId: user.uid,
          })
        );
      } else {
        setName("");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  const toggleDark = () => {
    if (dark == true) {
      setDark(false);
      const root = document.querySelector("html");
      if (!root) return;
      !root.classList.contains("dark") && root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      setDark(true);
      const root = document.querySelector("html");
      if (!root) return;
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logging out...");
        localStorage.removeItem("cartItems");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.errorMessage);
      });
  };
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <a
          href="/"
          className="lg:flex-1 flex items-center pl-6 gap-2  dark:text-white text-black font-bold text-2xl hover:cursor-pointer"
        >
          <img src={martecomlogo} className="h-16 w-16" alt="logo" />
          <p className="hidden md:block">Mark Mart</p>
        </a>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center gap-2 justify-end text-slate-700 dark:text-slate-100">
          <div className="lg:flex hidden">
            {!name && (
              <div className="lg:flex hidden">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
                      : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
                      : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </div>
            )}
            {name && (
              <div className="flex ">
                <AdminOnlyLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
                        : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
                    }
                    to="/admin/home"
                  >
                    Admin
                  </NavLink>
                </AdminOnlyLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
                      : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
                  }
                  to="/order-history"
                >
                  My Orders
                </NavLink>
                <button
                  className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
                : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
            }
          >
            <div className="relative py-3 px-3">
              <FaCartShopping className="w-8 h-8" />
              <p className="absolute top-0 text-orange-600 font-semibold right-0">
                {totalItems}
              </p>
            </div>
          </NavLink>
          <div className="flex gap-3">
            <RxAvatar className="w-8 h-8" />
            <p>{name}</p>
          </div>
          <div onClick={toggleDark}>
            {dark ? (
              <MdDarkMode className="w-8 h-8" />
            ) : (
              <CiLight className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
        <div className="container ">{renderContent()}</div>
      </div>
    </>
  );
};

export default MainNav2Logged;
