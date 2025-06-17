import React, { use, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { getElement, setElement } from "../../Utility/Utility";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

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
          to={"/all-gallery"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-white"
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink
          to={"my-food"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-black"
          }
        >
          My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/add-food"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-black"
          }
        >
          Add food
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/my-orders`}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "dark:text-black"
          }
        >
          My Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`bg-base-100 shadow-sm border-b border-b-gray-100 sticky top-0 right-0 z-50 ${
        darkLight ? "dark" : ""
      }`}
    >
      <div className="navbar max-w-7xl mx-auto dark:bg-gray-900 dark:text-white">
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
          <Link to={"/"} className="text-2xl font-semibold dark:text-white">
            Food<span className="text-yellow-500">dy</span>
          </Link>
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
              <img src={user?.photoURL} alt="" className="object-cover" />
              <div
                className={`overflow-hidden absolute top-14 rounded-b-sm transition-all duration-200 bg-white dark:bg-gray-700 ${
                  isOpen ? "scale-100" : "scale-0"
                }`}
              >
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-gray-700 rounded-box z-1 mt-3 p-2"
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
              <button className="btn btn-sm md:btn-md dark:bg-[#333] dark:border-gray-600">
                <MdDarkMode color="#fff" />
              </button>
            ) : (
              <button className="btn">
                <MdOutlineLightMode />
              </button>
            )}
          </div>
          {user ? (
            <button
              onClick={handelLogOut}
              className="btn dark:bg-gray-700 dark:text-white"
            >
              Log out
            </button>
          ) : (
            <Link
              to={"/login"}
              className="btn dark:bg-gray-700 dark:text-white"
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
