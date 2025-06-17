import React from "react";
import { Link } from "react-router";
import err from "/error.png";

const Error = () => {
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center px-5">
        <div>
          <img className="w-[400px] -translate-y-16" src={err} alt="" />
        </div>
        <div>
          <div className="text-center">
            <Link to={"/"}>
              <button className="text-sm cursor-pointer border border-transparent active:bg-white active:text-green-500 active:border-green-500 hover:scale-105 duration-150 font-semibold bg-green-500 text-white px-5 py-2  rounded-lg">
                Go Back Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
