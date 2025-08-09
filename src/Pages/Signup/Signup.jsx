import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import bg from "../../../src/assets/login-bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { HashLoader } from "react-spinners";

const Signup = () => {
  const { signUp, darkLight, gLogIn } = use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelSignup = (e) => {
    setLogin(true)
    const userInfo = e

      signUp(userInfo?.email, userInfo?.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: userInfo.name,
            photoURL: userInfo.photo,
          }).then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            setLogin(false)
            navigate(location?.state || "/");
          });
        })
        .catch((err) => {
          toast.error(err.message);
          setLogin(false)
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
      <div className="hidden md:flex w-[50%] h-screen bg-gray-100 relative">
        <div className="absolute h-full w-full bg-black/50"></div>
        <img
          src={bg}
          alt="Woman smiling"
          className="w-full h-full object-cover"
        />
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
      <div className="flex w-full bg-gradient-to-tr from-green-50 via-orange-100/70 to-blue-50 justify-center items-center p-8">
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
            <h2 className="text-2xl text-center font-bold">
              Create you account
            </h2>
            <p className="text-gray-500 text-center text-sm mt-1">
              Join us today and order your favorite food
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(handelSignup)}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

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
            <div className="relative">
              <div className="absolute top-[55%] cursor-pointer right-[5%]" onClick={() => setShow(!show)}>{show ? <FaEyeSlash size={20}></FaEyeSlash> : <FaEye size={20}></FaEye>}</div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter and one number",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={login}
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-lg font-medium transition"
            >
              {login ? <HashLoader color="#fff" size={17} /> : "Sign up"}
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
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 underline">
                login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
