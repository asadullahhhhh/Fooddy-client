import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Signup = () => {
  const { signUp, darkLight } = use(AuthContext);
  const [show, setShow] = useState(false);
  const [passErr, setPassErr] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const regex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const handelChange = (e) => {
    if (regex.test(e.target.value)) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
  };

  const handelSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userInfo = Object.fromEntries(formData.entries());
    console.log(userInfo);

    if (passErr) {
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
            navigate(location?.state || "/");
          });
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please check the password");
    }
  };

  return (
    <div
      className={`hero min-h-[calc(100vh-65px)] transition-colors duration-300 ${
        darkLight ? "bg-gray-900 dark" : "bg-base-200"
      }`}
    >
      <div className="hero-content w-full flex-col lg:flex-row-reverse">
        <div
          className={`card w-full max-w-sm shadow-2xl ${
            darkLight
              ? "bg-gray-800 text-gray-100"
              : "bg-base-100 text-gray-900"
          }`}
        >
          <div className="card-body">
            <h1 className="text-5xl font-bold text-center mb-5">Signup now!</h1>
            <form onSubmit={handelSignup} className="w-full">
              <div className="space-y-3">
                <div>
                  <label
                    className={`label ${
                      darkLight ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    className={`input focus:outline-none w-full ${
                      darkLight
                        ? "bg-gray-700 text-gray-100 border-gray-600"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label
                    className={`label ${
                      darkLight ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    required
                    className={`input focus:outline-none w-full ${
                      darkLight
                        ? "bg-gray-700 text-gray-100 border-gray-600"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder="Photo URL"
                  />
                </div>
                <div>
                  <label
                    className={`label ${
                      darkLight ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={`input focus:outline-none w-full ${
                      darkLight
                        ? "bg-gray-700 text-gray-100 border-gray-600"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder="Email"
                  />
                </div>
                <div className="relative">
                  <label
                    className={`label ${
                      darkLight ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    required
                    className={`input focus:outline-none w-full ${
                      darkLight
                        ? "bg-gray-700 text-gray-100 border-gray-600"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder="Password"
                    onChange={handelChange}
                  />
                  <div
                    onClick={() => setShow(!show)}
                    className="absolute z-20 px-2 py-1 rounded-lg bg-neutral-800 top-[50%] right-[4%] cursor-pointer"
                  >
                    {show ? (
                      <FaEyeSlash color="white" />
                    ) : (
                      <FaEye color="white" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                {!passErr && (
                  <p className="text-[12px] max-w-[320px] text-red-400">
                    Password must have an uppercase and lowercase letter, and be
                    at least 6 characters long.
                  </p>
                )}
              </div>
              <div
                className={`mt-1 ${
                  darkLight ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <p>
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-blue-400 underline font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className={`btn w-full btn-neutral mt-4 ${
                  darkLight ? "bg-blue-700 hover:bg-blue-800 text-white" : ""
                }`}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
