import React, { use, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";

const Navbar = () => {

    const { isOpen, setIsOpen, user, logOut, setUser } = use(AuthContext);
    // console.log(user);
    const dropdownRef = useRef(null)
    console.log(dropdownRef);

    // dropdown click outside funtionality
    useEffect(()=>{
      const handelClickOutside = e => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handelClickOutside);
      return ()=> {
        document.removeEventListener("mousedown", handelClickOutside)
      }
    }, [isOpen, setIsOpen])

    // Logout related funtionality here
    const handelLogOut = () => {
        logOut()
            .then(() => {
                setUser(null)
                toast.success("Logout successful")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

  const links = (
    <>
      <li>
        <NavLink
        to={'/'}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
        to={'/all-foods'}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
        to={'/gallery'}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
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
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
        >
          My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-groups"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
        >
          Add food
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/gallery"}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
        >
          My Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 right-0 z-50">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-2xl font-semibold">
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
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 z-50"
            >
              <img src={user?.photoURL} alt="" className="object-cover"/>
              <div
                className={`overflow-hidden absolute top-14 rounded-b-sm transition-all duration-200 ${
                  isOpen ? "scale-100" : "scale-0"
                }`}
              >
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2"
                >
                  {userLinks}
                </ul>
              </div>
            </div>
          ) : (
            " "
          )}
          {user ? (
            <button onClick={handelLogOut} className="btn">Log out</button>
          ) : (
            <Link to={"/login"} className="btn">
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
