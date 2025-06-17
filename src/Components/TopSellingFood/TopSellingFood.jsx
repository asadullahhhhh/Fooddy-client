import React, { use, useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { Link } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";

const TopSellingFood = () => {
  const { darkLight } = use(AuthContext);

  const [topFood, setTopFood] = useState([]);

  useEffect(() => {
    fetch("https://assignment-11-server-mocha-zeta.vercel.app/all-foods")
      .then((res) => res.json())
      .then((data) => {
        const sortedFood = data.sort(
          (a, b) => b.purchaseCount - a.purchaseCount
        );
        const topSix = sortedFood.slice(0, 6);
        setTopFood(topSix);
      });
  }, []);

  if (topFood.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[50vh] dark:bg-gray-900">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <section
      className={`py-[70px] px-5 ${darkLight ? "dark" : ""} dark:bg-gray-900`}
    >
      <div className=" max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-700 dark:text-white uppercase">
          top selling foods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {topFood.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={"/all-foods"}>
            <button className="btn btn-warning text-white dark:bg-yellow-500 dark:hover:bg-yellow-400">
              See All Foods
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingFood;
