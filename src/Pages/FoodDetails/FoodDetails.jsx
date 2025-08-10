import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../Context/ContextProvider";

const FoodDetails = () => {
  const { id } = useParams(); // Get ID from route

  const [food, setFood] = useState(null);
  const { darkLight } = use(AuthContext);

  useEffect(() => {
    fetch(`https://assignment-11-server-mocha-zeta.vercel.app/food/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id]);

  if (!food) return <Loading />;

  return (
    <section
      className={`bg-gray-100 min-h-[calc(100vh-65px)] mt-[64px] lg:mt-[72px] dark:bg-gray-800 flex justify-center items-center ${
        darkLight ? "dark" : ""
      }`}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="max-w-6xl mx-auto px-4 py-10"
      >
        <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl dark:shadow-gray-700">
          <div className="flex-1">
            <img
              src={food.image}
              alt={food.name}
              className="w-full object-cover rounded-xl h-[400px] border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {food.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {food.description}
                  </p>
                </div>

                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Category:</strong> {food.category}
                  </p>
                  <p>
                    <strong>Origin:</strong> {food.origin}
                  </p>
                  <p>
                    <strong>Price:</strong> ৳{food.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p>
                    <strong>Purchase :</strong> {food.purchaseCount || 0}
                  </p>
                  <p>
                    <strong>Owner :</strong> {food.addedBy?.name}
                  </p>
                </div>
              </div>
              <Link to={`/purchase-food/${food?._id}`}>
                <button className="mt-5 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                  Purchase
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FoodDetails;
