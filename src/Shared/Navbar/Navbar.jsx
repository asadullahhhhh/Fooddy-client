import React, { use, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { getElement, setElement } from "../../Utility/Utility";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import userDemo from '../../assets/user.png';

const Navbar = () => {
  const { isOpen, setIsOpen, user, logOut, setUser, darkLight, setDarkLight } =
    use(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handelClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handelLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Logout successful");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handelDarkMood = () => {
    setElement(!darkLight);
    const getData = getElement;
    setDarkLight(getData);
  };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-foods"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/menu`}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-gallery"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          Gallery
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/aboutus"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink
          to={"/my-food"}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold flex justify-center items-center gap-2"
              : "flex items-center justify-center gap-2 dark:text-white"
          }
        >
          <MdFastfood size={18} />
          My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/add-food"}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold flex justify-center items-center gap-2"
              : "flex items-center justify-center gap-2 dark:text-white"
          }
        >
          <FaPlusCircle size={18} />
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/my-orders`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold flex justify-center items-center gap-2"
              : "flex items-center gap-2 justify-center dark:text-white"
          }
        >
          <FaShoppingBag size={18} />
          My Orders
        </NavLink>
      </li>
      <li>
        <button onClick={handelLogOut} className="text-center w-full border rounded-2xl mt-2 py-1.5 font-semibold text-red-400 flex justify-center">
         <FiLogOut className="text-lg" /> Logout
        </button>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full backdrop-blur-md lg:h-[72px] border-b duration-500 z-50 transition-colors
    bg-white/60 border-white/30 shadow-sm lg:px-5 xl:px-0
    dark:bg-[#0f172a]/70 dark:border-gray-700 ${darkLight ? "dark" : ""}`}
    >
      <div className="navbar max-w-7xl mx-auto  dark:text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="text-gray-600 dark:text-gray-200 top-10 left-10 text-4xl font-semibold">
            <Link to={"/"}>
              <p>
                F<span className="text-orange-400">O</span>
                <span className="-ml-4 text-orange-400">O</span>DY
              </p>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-5">
          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 z-50 cursor-pointer"
            >
              <img src={user?.photoURL || userDemo} alt="" className="object-cover" />
              <div
                className={`overflow-hidden absolute top-12 lg:top-14 rounded-b-sm right-1 2xl:right-[15%] transition-all duration-200 ${
                  isOpen ? "scale-100" : "scale-0"
                }`}
              >
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white space-y-1 dark:bg-gray-700 w-[180px]  rounded-box z-1 mt-4 p-2"
                >
                  {userLinks}
                </ul>
              </div>
            </div>
          ) : (
            " "
          )}
          <div onClick={handelDarkMood}>
            {darkLight ? (
              <button className="py-2 cursor-pointer">
                <MdDarkMode color="#fff" size={25} />
              </button>
            ) : (
              <button className="py-2 cursor-pointer">
                <MdOutlineLightMode size={25} />
              </button>
            )}
          </div>
          {user ? "" : (
            <Link
              to={"/login"}
              className=" bg-blue-500 px-5 py-2 rounded-xl font-medium hover:bg-blue-600 text-white"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
