import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import bg from "../../../src/assets/login-bg.jpg";
import { HashLoader } from "react-spinners";
import { useForm } from "react-hook-form";

const Login = () => {
  const { logIn, gLogIn, darkLight } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(false);
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelLogin = (e) => {
    setLogin(true);

    const email = e.email;
    const password = e.password;

    logIn(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setLogin(false);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
        setLogin(false);
      });
  };

  const handelGoogle = () => {
    gLogIn()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-[40%] h-screen bg-gray-100 relative">
        <div className="absolute h-full w-full bg-black/50"></div>
        <img
          src={bg}
          alt="Woman smiling"
          className="w-full h-full object-cover"
        />
        <div className=" absolute text-gray-300 top-10 left-10 text-6xl font-semibold ">
          <Link to={"/"}>
            <p>
              F<span className="text-orange-400">O</span>
              <span className="-ml-7 text-orange-400">O</span>DY
            </p>
          </Link>
        </div>
        <div className="absolute bottom-10 left-6 text-white p-5">
          <p className="text-3xl font-semibold w-full">
            “Delicious recipes and flavors, just a click away.”
          </p>
          <p className="text-lg font-bold mt-10 text-gray-200">
            Chef Arif Rahman
          </p>
          <p className="text-xs font-semibold opacity-80">
            Head Chef at Foodie's Paradise
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8">
        <div className="max-w-md w-full space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
            <div className="text-gray-600 top-10 left-10 text-4xl font-semibold ">
              <Link to={"/"}>
                <p>
                  F<span className="text-orange-400">O</span>
                  <span className="-ml-4 text-orange-400">O</span>DY
                </p>
              </Link>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-bold">Welcome back to Foody</h2>
            <p className="text-gray-500 text-sm mt-1">
              Discover mouthwatering dishes, order your favorites, and enjoy
              fresh flavors anytime.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(handelLogin)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="alex.jordan@gmail.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <Link className="text-sm mt-2 inline-block hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-lg font-medium transition"
            >
              {login ? <HashLoader color="#fff" size={17} /> : "Log in"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              onClick={handelGoogle}
              type="button"
              className="w-full flex cursor-pointer items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* Signup Link */}
            <p className="text-sm text-center text-gray-500">
              Don’t have an account?{" "}
              <Link className="text-blue-600 underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
