import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/ContextProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Login = () => {

    const { logIn, gLogIn } = use(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const handelLogin = e => {
        e.preventDefault()

        const email = e.target.email.value 
        const password = e.target.password.value 

        logIn(email, password)
            .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(location?.state || "/")
            })
            .catch(err => {
                toast.error(err.message)
            })

    }

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
                navigate(location?.state || "/")
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
      <>
        <div
          className={`hero min-h-[calc(100vh-65px)] bg-base-200 transition-colors duration-300`}
        >
          <div className="hero-content w-full flex-col lg:flex-row-reverse">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <h1 className="text-5xl text-center font-bold mb-5">
                  Login now!
                </h1>
                <form onSubmit={handelLogin} className="w-full">
                  <div className="space-y-3">
                    <div>
                      <label className="label dark:text-white">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="input focus:outline-none w-full bg-white "
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label className="label dark:text-white">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="input focus:outline-none w-full bg-white"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="link link-hover">
                      Forgot password?
                    </p>
                  </div>
                  <div className="mt-1">
                    <p>
                      Don't have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="text-blue-400 underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                  <button className="btn w-full btn-neutral mt-4">Login</button>
                </form>

                {/* Google login */}
                <div className="py-5 mt-3 border-t border-gray-300">
                  <button onClick={handelGoogle}
                    className="btn w-full bg-white text-black border-[#e5e5e5]"
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Login;